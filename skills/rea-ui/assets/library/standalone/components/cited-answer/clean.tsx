"use client";

import "./CitedAnswer.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
  memo,
  type SVGProps,
} from "react";
/** A sentence or text fragment, optionally starting a new paragraph. */
interface CitedSegment {
  text?: string;
  cite?: string[];
  paragraph?: boolean;
  [field: string]: unknown;
}
/** A source's original data is passed unchanged to onOpenSource. */
interface CitedSource {
  id?: string;
  site?: string;
  title?: string;
  url?: string;
  date?: string;
  quote?: string;
  highlight?: string[];
  icon?: ReactNode;
  [field: string]: unknown;
}
interface CitedAnswerProps {
  segments: CitedSegment[];
  sources: CitedSource[];
  pagesRead?: number;
  defaultOpen?: string;
  onOpenSource?: (source: CitedSource) => void;
  onPreviewChange?: (id: string | null) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
interface SourceRecord extends CitedSource {
  id: string;
  site: string;
  title: string;
  original: CitedSource;
}
interface TextSegment extends CitedSegment {
  text: string;
}
interface CitationMark {
  id: string;
  number: number;
  label: string;
}
interface HighlightedSource {
  source: string;
  segment?: number;
}
interface CitationActions {
  setHot(value: HighlightedSource | null): void;
  toggle(id: string): void;
}
interface CitationSegmentProps {
  prefix: string;
  segment: TextSegment;
  index: number;
  marks: CitationMark[];
  state?: "hl" | "dim";
  lit?: string;
  openHere: string | null;
  previewId: string;
  actions: RefObject<CitationActions>;
}
interface CaptionFrame {
  id: string;
  tone?: string;
  node: ReactNode;
}
/** An answer with inline citations, source previews, and copyable quotations. */
function CitedAnswer(props: CitedAnswerProps) {
  return <CitedAnswerView {...props} clean={true} />;
}
function normalizeSource(source: CitedSource, index: number): SourceRecord {
  return {
    ...source,
    id: source.id ?? `source-${index}`,
    site: source.site ?? "",
    title: source.title ?? "",
    original: source,
  };
}
function sourceTone(site: string): (typeof sourceTones)[number] {
  const hash = [...site].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) % 997,
    7,
  );
  return sourceTones[hash % sourceTones.length];
}
function sourceInitial(...labels: string[]): string {
  for (const label of labels) {
    const initial = label.match(/[\p{L}\p{N}]/u);
    if (initial) return initial[0].toUpperCase();
  }
  return "";
}
function sourceDomain(url?: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function quoteHighlights(
  quote: string,
  explicit: string[] | undefined,
  citedText: string,
): {
  text: string;
  marked: boolean;
}[] {
  let pattern: RegExp | null = null;
  if (explicit?.length) {
    const phrases = explicit.filter((phrase) => phrase.trim()).map(escapeRegExp);
    if (phrases.length) pattern = new RegExp(`(${phrases.join("|")})`, "gi");
  } else {
    const words = [
      ...new Set(
        (citedText.toLowerCase().match(/[a-z0-9%]+/g) ?? []).filter(
          (word) => (word.length >= 5 || /\d/.test(word)) && !commonWords.has(word),
        ),
      ),
    ];
    if (words.length)
      pattern = new RegExp(`\\b(${words.map(escapeRegExp).join("|")})\\b`, "gi");
  }
  return pattern
    ? quote.split(pattern).map((text, index) => ({ text, marked: index % 2 === 1 }))
    : [{ text: quote, marked: false }];
}
function sourceQuote(source: SourceRecord): string {
  return `“${source.quote ?? source.title}” – ${source.title}, ${source.site}${source.url ? ` (${source.url})` : ""}`;
}
function groupParagraphs(segments: TextSegment[]): {
  segment: TextSegment;
  index: number;
}[][] {
  const paragraphs: {
    segment: TextSegment;
    index: number;
  }[][] = [];
  segments.forEach((segment, index) => {
    if (segment.paragraph || !paragraphs.length) paragraphs.push([]);
    paragraphs[paragraphs.length - 1].push({ segment, index });
  });
  return paragraphs;
}
function useCitations(
  {
    sources: sourceProps,
    segments: segmentProps,
    defaultOpen,
    onPreviewChange,
  }: CitedAnswerProps,
  clean: boolean,
) {
  const previewId = `${useId()}-preview`;
  const sources = useMemo(() => sourceProps.map(normalizeSource), [sourceProps]);
  const segments = useMemo(
    () => segmentProps.map((segment) => ({ ...segment, text: segment.text ?? "" })),
    [segmentProps],
  );
  const [hot, setHot] = useState<HighlightedSource | null>(null);
  const [openId, setOpenId] = useState<string | null>(() =>
    defaultOpen && sources.some((source) => source.id === defaultOpen)
      ? defaultOpen
      : null,
  );
  const lastOpenId = useRef(openId);
  if (openId) lastOpenId.current = openId;
  const [copied, setCopied] = useState<{
    id: number;
    source: string;
  } | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const visibleCount = useFittingSources(sources, chipsRef, rulerRef, clean);
  const displayedCount =
    !clean || showAll ? sources.length : Math.min(visibleCount, sources.length);
  const sourceIndex = useMemo(
    () => new Map(sources.map((source, index) => [source.id, index])),
    [sources],
  );
  const sourceById = (id: string | null) =>
    id !== null && sourceIndex.has(id) ? sources[sourceIndex.get(id)!] : null;
  const sourcePosition = (id: string) => (sourceIndex.get(id) ?? -1) + 1;
  const marks = useMemo(
    () =>
      segments.map((segment) =>
        [...new Set(segment.cite ?? [])]
          .filter((id) => sourceIndex.has(id))
          .map((id) => {
            const index = sourceIndex.get(id)!;
            const source = sources[index];
            return {
              id,
              number: index + 1,
              label: `${source.site} – ${source.title}`,
            };
          }),
      ),
    [segments, sources, sourceIndex],
  );
  const paragraphs = groupParagraphs(segments);
  const sentenceCount = segments.filter((segment) => segment.text.trim()).length;
  const citedCount = segments.filter(
    (segment) => segment.text.trim() && segment.cite?.some((id) => sourceIndex.has(id)),
  ).length;
  const citingSegments = (id: string) =>
    segments.filter((segment) => segment.cite?.includes(id));
  function toggle(id: string) {
    const next = openId === id ? null : id;
    setOpenId(next);
    onPreviewChange?.(next);
  }
  const actions = useRef<CitationActions>({ setHot, toggle });
  actions.current = { setHot, toggle };
  function close() {
    if (!openId) return;
    const previous = openId;
    setOpenId(null);
    onPreviewChange?.(null);
    chipsRef.current
      ?.querySelector<HTMLButtonElement>(`[data-source="${CSS.escape(previous)}"]`)
      ?.focus({ preventScroll: true });
  }
  function copy(source: SourceRecord) {
    void navigator.clipboard?.writeText(sourceQuote(source)).catch(() => {});
    setCopied({ id: Date.now(), source: source.id });
  }
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && openId) {
      event.stopPropagation();
      close();
    }
  }
  function moveChip(event: KeyboardEvent<HTMLButtonElement>, sourceNumber?: number) {
    const buttons = [
      ...(chipsRef.current?.querySelectorAll<HTMLButtonElement>(
        clean ? ".ui-cac__chip, .ui-cac__more" : ".ui-ca__chip",
      ) ?? []),
    ];
    const current = clean ? buttons.indexOf(event.currentTarget) : (sourceNumber ?? -1);
    const last = clean ? buttons.length - 1 : sources.length - 1;
    const target =
      event.key === "ArrowRight"
        ? Math.min(last, current + 1)
        : event.key === "ArrowLeft"
          ? Math.max(0, current - 1)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target !== null && current >= 0) {
      event.preventDefault();
      buttons[target]?.focus();
    }
  }
  function segmentState(segment: TextSegment, index: number): "hl" | "dim" | undefined {
    if (hot)
      return hot.segment === undefined
        ? segment.cite?.includes(hot.source)
          ? "hl"
          : "dim"
        : hot.segment === index
          ? "hl"
          : undefined;
    if (openId && segment.cite?.includes(openId)) return "hl";
    return undefined;
  }
  return {
    sources,
    segments,
    hot,
    setHot,
    openId,
    copied,
    chipsRef,
    rulerRef,
    showAll,
    setShowAll,
    displayedCount,
    marks,
    paragraphs,
    sentenceCount,
    citedCount,
    citingSegments,
    actions,
    close,
    copy,
    onKeyDown,
    moveChip,
    segmentState,
    sourcePosition,
    previewId,
    hotSource: sourceById(hot?.source ?? null),
    openSource: sourceById(openId),
    previewSource: sourceById(openId ?? lastOpenId.current),
  };
}
/** Measure the compact source row; the hidden ruler avoids guesswork about font widths. */
function useFittingSources(
  sources: SourceRecord[],
  chips: RefObject<HTMLDivElement | null>,
  ruler: RefObject<HTMLDivElement | null>,
  enabled: boolean,
): number {
  const [visible, setVisible] = useState(sources.length);
  useLayoutEffect(() => {
    const row = chips.current;
    const measuringRow = ruler.current;
    if (!enabled || !row || !measuringRow) return;
    let mounted = true;
    const measure = () => {
      if (!mounted) return;
      const widths = [...measuringRow.querySelectorAll<HTMLElement>("[data-chip]")].map(
        (chip) => chip.offsetWidth,
      );
      const moreWidth =
        measuringRow.querySelector<HTMLElement>("[data-more]")?.offsetWidth ?? 36;
      const available = row.clientWidth;
      const gap = 4;
      if (
        widths.reduce((total, width) => total + width, 0) +
          gap * Math.max(0, widths.length - 1) <=
        available + 0.5
      ) {
        setVisible(widths.length);
        return;
      }
      let occupied = 0;
      let count = 0;
      for (; count < widths.length; count++) {
        const next = occupied + (count ? gap : 0) + widths[count];
        if (next + gap + moreWidth > available) break;
        occupied = next;
      }
      setVisible(Math.max(1, count));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    void document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, [sources, enabled, chips, ruler]);
  return visible;
}
function SourceGlyph({ source, prefix }: { source: SourceRecord; prefix: string }) {
  const [brokenIcon, setBrokenIcon] = useState(false);
  return (
    <span
      className={`${prefix}__glyph`}
      data-tone={sourceTone(source.site)}
      aria-hidden="true"
      onErrorCapture={() => setBrokenIcon(true)}
    >
      {source.icon && !brokenIcon
        ? source.icon
        : sourceInitial(source.site, source.title)}
    </span>
  );
}
function SourceChips({
  citations,
  prefix,
  clean,
}: {
  citations: ReturnType<typeof useCitations>;
  prefix: string;
  clean: boolean;
}) {
  const {
    sources,
    displayedCount,
    chipsRef,
    rulerRef,
    showAll,
    setShowAll,
    hot,
    setHot,
    openId,
    previewId,
    actions,
    moveChip,
  } = citations;
  const hiddenCount = sources.length - displayedCount;
  return (
    <>
      <div
        className={`${prefix}__chips`}
        data-all={clean && showAll ? "" : undefined}
        ref={chipsRef}
        role="list"
        aria-label="Sources"
        onPointerLeave={() => setHot(null)}
      >
        {sources.slice(0, displayedCount).map((source, index) => {
          const lit = hot?.source === source.id;
          return (
            <span key={source.id} role="listitem" className={`${prefix}__chip-item`}>
              <button
                type="button"
                className={`${prefix}__chip`}
                data-source={source.id}
                data-lit={lit ? "" : undefined}
                data-dim={hot?.source && !lit ? "" : undefined}
                aria-expanded={openId === source.id}
                aria-controls={previewId}
                aria-label={`Source ${index + 1}: ${source.site} – ${source.title}`}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setHot({ source: source.id });
                }}
                onFocus={() => setHot({ source: source.id })}
                onBlur={() => setHot(null)}
                onKeyDown={(event) => moveChip(event, index)}
                onClick={() => actions.current.toggle(source.id)}
              >
                <SourceGlyph source={source} prefix={prefix} />
                <span className={`${prefix}__chip-name`} dir="auto" title={source.site}>
                  {source.site}
                </span>
                <span className={`${prefix}__chip-num`}>
                  {sourceNumber_citation_model.format(index + 1)}
                </span>
              </button>
            </span>
          );
        })}
        {hiddenCount > 0 && (
          <span role="listitem" className={`${prefix}__chip-item`}>
            <button
              type="button"
              className={`${prefix}__more`}
              aria-label={`Show ${hiddenCount} more ${hiddenCount === 1 ? "source" : "sources"}`}
              onKeyDown={(event) => moveChip(event)}
              onClick={() => setShowAll(true)}
            >
              +{hiddenCount}
            </button>
          </span>
        )}
      </div>
      {clean && (
        <div className={`${prefix}__ruler`} ref={rulerRef} aria-hidden="true">
          {sources.map((source, index) => (
            <span key={source.id} className={`${prefix}__chip`} data-chip="">
              <SourceGlyph source={source} prefix={prefix} />
              <span className={`${prefix}__chip-name`}>{source.site}</span>
              <span className={`${prefix}__chip-num`}>{index + 1}</span>
            </span>
          ))}
          <span className={`${prefix}__more`} data-more="">
            +{sources.length}
          </span>
        </div>
      )}
    </>
  );
}
function CitationIcon({
  name,
  clean,
}: {
  name: keyof typeof compactPaths;
  clean: boolean;
}) {
  if (clean)
    return (
      <svg viewBox="0 0 16 16" className="ui-cac__icon" aria-hidden="true">
        <path d={compactPaths[name]} />
      </svg>
    );
  const size = name === "close" ? 10 : 12;
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      {name === "copy" && (
        <rect x="4.2" y="4.2" width="5.8" height="5.8" rx="1.4" {...stroke} />
      )}
      <path
        d={standardPaths[name]}
        {...stroke}
        strokeWidth={name === "done" ? 1.6 : stroke.strokeWidth}
      />
    </svg>
  );
}
function SourcePreview({
  citations,
  prefix,
  clean,
  onOpenSource,
}: {
  citations: ReturnType<typeof useCitations>;
  prefix: string;
  clean: boolean;
  onOpenSource: CitedAnswerProps["onOpenSource"];
}) {
  const {
    previewId,
    openId,
    previewSource: source,
    sourcePosition,
    close,
    copied,
    copy,
    citingSegments,
  } = citations;
  const isCopied = copied?.source === source?.id;
  const openLabel = (
    <>
      {clean && <CitationIcon name="out" clean />}Open source
      {!clean && <CitationIcon name="out" clean={false} />}
    </>
  );
  return (
    <div
      id={previewId}
      className={`${prefix}__fold`}
      data-open={openId ? "" : undefined}
      inert={!openId}
      role="region"
      aria-label={
        source ? `Source ${sourcePosition(source.id)}: ${source.site}` : "Source"
      }
    >
      <div className={`${prefix}__clip`}>
        {source && (
          <div key={source.id} className={`${prefix}__preview`}>
            <div className={`${prefix}__pv-head`}>
              <SourceGlyph source={source} prefix={prefix} />
              <span className={`${prefix}__pv-meta`}>
                <span
                  className={`${prefix}__pv-domain`}
                  title={source.url || source.site}
                >
                  {sourceDomain(source.url) || source.site}
                </span>
                {source.date && (
                  <span className={`${prefix}__pv-date`}>
                    {clean ? <span className={`${prefix}__dot`}>{" · "}</span> : " · "}
                    {source.date}
                  </span>
                )}
              </span>
              <span className={`${prefix}__pv-num`}>
                {sourceNumber_citation_model.format(sourcePosition(source.id))}
              </span>
              <button
                type="button"
                className={`${prefix}__close`}
                aria-label="Close source"
                onClick={close}
              >
                <CitationIcon name="close" clean={clean} />
              </button>
            </div>
            <div className={`${prefix}__pv-title`} dir="auto" title={source.title}>
              {source.title}
            </div>
            {source.quote && (
              <blockquote className={`${prefix}__quote`} dir="auto">
                {quoteHighlights(
                  source.quote,
                  source.highlight,
                  citingSegments(source.id)
                    .map((segment) => segment.text)
                    .join(" "),
                ).map((part, index) =>
                  part.marked ? <mark key={index}>{part.text}</mark> : part.text,
                )}
              </blockquote>
            )}
            <div className={`${prefix}__pv-actions`}>
              {source.url ? (
                <a
                  className={`${prefix}__btn ${prefix}__btn--main`}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(event) => {
                    if (onOpenSource) {
                      event.preventDefault();
                      onOpenSource(source.original);
                    }
                  }}
                >
                  {openLabel}
                </a>
              ) : (
                onOpenSource && (
                  <button
                    type="button"
                    className={`${prefix}__btn ${prefix}__btn--main`}
                    onClick={() => onOpenSource(source.original)}
                  >
                    {openLabel}
                  </button>
                )
              )}
              {source.quote && (
                <button
                  type="button"
                  className={`${prefix}__btn`}
                  data-done={isCopied ? "" : undefined}
                  aria-label="Copy quote"
                  onClick={() => copy(source)}
                >
                  <span
                    key={isCopied ? "done" : "idle"}
                    className={`${prefix}__btn-icon`}
                  >
                    <CitationIcon name={isCopied ? "done" : "copy"} clean={clean} />
                  </span>
                  <span className={`${prefix}__btn-text`}>
                    {isCopied ? "Copied" : "Copy quote"}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
/** Retain the outgoing caption for its short crossfade when the meaning changes. */
function CitationCaption({
  citations,
  prefix,
  clean,
}: {
  citations: ReturnType<typeof useCitations>;
  prefix: string;
  clean: boolean;
}) {
  const {
    copied,
    hot,
    hotSource,
    openSource,
    citedCount,
    sentenceCount,
    citingSegments,
  } = citations;
  let id = "rest";
  let tone: string | undefined;
  let node: ReactNode = (
    <>
      <b>{sourceNumber_citation_model.format(citedCount)}</b>
      {" of "}
      {sourceNumber_citation_model.format(sentenceCount)}{" "}
      {sentenceCount === 1 ? "sentence" : "sentences"}
      {" backed by a source"}
    </>
  );
  const separator = clean ? (
    <>
      {" "}
      <span className={`${prefix}__dot`}>·</span>{" "}
    </>
  ) : (
    " · "
  );
  if (copied) {
    id = `copied-${copied.id}`;
    tone = "ok";
    node = "Quote copied";
  } else if (hotSource && hot?.segment !== undefined) {
    id = `mark-${hot.segment}-${hotSource.id}`;
    node = (
      <>
        <b>{hotSource.site}</b>
        {separator}
        {hotSource.title}
      </>
    );
  } else if (hotSource) {
    const count = citingSegments(hotSource.id).length;
    id = `src-${hotSource.id}`;
    node = (
      <>
        <b>{hotSource.site}</b>
        {separator}
        {count ? (
          <>
            cited in {sourceNumber_citation_model.format(count)}{" "}
            {count === 1 ? "sentence" : "sentences"}
          </>
        ) : (
          "read, not cited"
        )}
      </>
    );
  } else if (openSource) {
    id = `open-${openSource.id}`;
    node = (
      <>
        Quote from <b>{openSource.site}</b>
      </>
    );
  }
  return (
    <CaptionSwap prefix={prefix} id={id} tone={tone}>
      {node}
    </CaptionSwap>
  );
}
function CaptionSwap({
  prefix,
  id,
  tone,
  children,
}: {
  prefix: string;
  id: string;
  tone?: string;
  children: ReactNode;
}) {
  const lastFrame = useRef<CaptionFrame>({ id, tone, node: children });
  const [currentId, setCurrentId] = useState(id);
  const [outgoing, setOutgoing] = useState<CaptionFrame | null>(null);
  // Updating during this render makes both frames available before the browser paints.
  if (currentId !== id) {
    setCurrentId(id);
    setOutgoing(lastFrame.current);
  }
  lastFrame.current = { id, tone, node: children };
  useEffect(() => {
    if (!outgoing) return;
    const timer = window.setTimeout(() => setOutgoing(null), 260);
    return () => window.clearTimeout(timer);
  }, [outgoing]);
  return (
    <span className={`${prefix}__swap`}>
      {outgoing && (
        <span
          key={`out-${outgoing.id}`}
          className={`${prefix}__swap-item`}
          data-out=""
          data-tone={outgoing.tone}
          aria-hidden="true"
        >
          {outgoing.node}
        </span>
      )}
      <span key={id} className={`${prefix}__swap-item`} data-tone={tone}>
        {children}
      </span>
    </span>
  );
}
function CitedAnswerView(
  props: CitedAnswerProps & {
    clean: boolean;
  },
) {
  const { clean, className, pagesRead, action, onOpenSource } = props;
  const prefix = clean ? "ui-cac" : "ui-ca";
  const citations = useCitations(props, clean);
  const {
    sources,
    hot,
    openId,
    marks,
    paragraphs,
    previewId,
    actions,
    segmentState,
    setHot,
  } = citations;
  const metadata = [
    `${sourceNumber_citation_model.format(sources.length)} ${sources.length === 1 ? "source" : "sources"}`,
  ];
  if (pagesRead !== undefined && Number.isFinite(pagesRead))
    metadata.push(
      `${sourceNumber_citation_model.format(pagesRead)} ${pagesRead === 1 ? "page" : "pages"} read`,
    );
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      role="group"
      aria-label="Answer with sources"
      data-hot={hot ? (hot.segment === undefined ? "source" : "mark") : undefined}
      onKeyDown={citations.onKeyDown}
    >
      <div className={`${prefix}__${clean ? "body" : "card"}`}>
        <div className={`${prefix}__head`}>
          <span className={`${prefix}__stack`} aria-hidden="true">
            {sources.slice(0, 3).map((source) => (
              <SourceGlyph key={source.id} source={source} prefix={prefix} />
            ))}
          </span>
          <span className={`${prefix}__meta`}>
            {clean
              ? metadata.map((text, index) => (
                  <span key={text}>
                    {index > 0 && <span className={`${prefix}__dot`}>{" · "}</span>}
                    {text}
                  </span>
                ))
              : metadata.join(" · ")}
          </span>
        </div>
        <div className={`${prefix}__text`} onPointerLeave={() => setHot(null)}>
          {paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className={`${prefix}__p`} dir="auto">
              {paragraph.map(({ segment, index }) => {
                const segmentMarks = marks[index];
                const lit =
                  hot &&
                  (hot.segment === index ||
                    (hot.segment === undefined &&
                      segmentMarks.some((mark) => mark.id === hot.source)))
                    ? hot.source
                    : undefined;
                return (
                  <CitationSegment_CitationSegment
                    key={index}
                    prefix={prefix}
                    segment={segment}
                    index={index}
                    marks={segmentMarks}
                    state={segmentState(segment, index)}
                    lit={lit}
                    openHere={
                      openId && segmentMarks.some((mark) => mark.id === openId)
                        ? openId
                        : null
                    }
                    previewId={previewId}
                    actions={actions}
                  />
                );
              })}
            </p>
          ))}
        </div>
        {clean && <SourceChips citations={citations} prefix={prefix} clean />}
        <SourcePreview
          citations={citations}
          prefix={prefix}
          clean={clean}
          onOpenSource={onOpenSource}
        />
      </div>
      {!clean && <SourceChips citations={citations} prefix={prefix} clean={false} />}
      <div className={`${prefix}__foot`}>
        <span className={`${prefix}__caption`} aria-live="polite">
          <CitationCaption citations={citations} prefix={prefix} clean={clean} />
        </span>
        {action && (
          <button
            type="button"
            className={`${prefix}__action`}
            title={action.label}
            onClick={action.onClick}
          >
            <span className={`${prefix}__action-label`}>{action.label}</span>
            <CitationIcon name="arrow" clean={clean} />
          </button>
        )}
      </div>
    </div>
  );
}
const sourceNumber_citation_model = new Intl.NumberFormat("en");
const sourceTones = ["blue", "violet", "green", "amber", "gray"] as const;
const commonWords = new Set([
  "about",
  "after",
  "again",
  "their",
  "there",
  "these",
  "those",
  "which",
  "while",
  "would",
  "could",
  "should",
  "every",
  "other",
  "being",
  "still",
  "where",
  "until",
  "since",
  "under",
  "first",
  "people",
  "thing",
  "things",
]);
/** Keep the first marker beside the last word without preventing long words from wrapping. */
const CitationSegment_CitationSegment = memo(function CitationSegment({
  prefix,
  segment,
  index,
  marks,
  state,
  lit,
  openHere,
  previewId,
  actions,
}: CitationSegmentProps) {
  const [, leading, body, trailing] = segment.text.match(/^(\s*)([\s\S]*?)(\s*)$/) ?? [
    "",
    "",
    segment.text,
    "",
  ];
  const lastWordStart = marks.length ? Math.max(0, body.search(/\S+$/)) : body.length;
  const keepStart = body.length - lastWordStart > 24 ? body.length : lastWordStart;
  function marker(mark: CitationMark) {
    return (
      <button
        key={mark.id}
        type="button"
        className={`${prefix}__marker`}
        data-source={mark.id}
        data-lit={lit === mark.id ? "" : undefined}
        aria-expanded={openHere === mark.id}
        aria-controls={previewId}
        aria-label={`Source ${mark.number}: ${mark.label}`}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse")
            actions.current.setHot({ source: mark.id, segment: index });
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") actions.current.setHot(null);
        }}
        onFocus={() => actions.current.setHot({ source: mark.id, segment: index })}
        onBlur={() => actions.current.setHot(null)}
        onClick={() => actions.current.toggle(mark.id)}
      >
        {sourceNumber_citation_model.format(mark.number)}
      </button>
    );
  }
  return (
    <span>
      {leading}
      <span
        className={`${prefix}__seg`}
        data-hl={state === "hl" ? "" : undefined}
        data-dim={state === "dim" ? "" : undefined}
      >
        {body.slice(0, keepStart)}
        <span className={`${prefix}__keep`}>
          {body.slice(keepStart)}
          {marks.slice(0, 1).map(marker)}
        </span>
        {marks.slice(1).map(marker)}
      </span>
      {trailing}
    </span>
  );
});
const compactPaths = {
  close: "M4.75 4.75l6.5 6.5m0-6.5-6.5 6.5",
  out: "M6.5 4.5h5v5M11.25 4.75 4.5 11.5",
  copy: "M6.75 5.5h5c.69 0 1.25.56 1.25 1.25v5c0 .69-.56 1.25-1.25 1.25h-5c-.69 0-1.25-.56-1.25-1.25v-5c0-.69.56-1.25 1.25-1.25ZM10.5 3.5A1.25 1.25 0 0 0 9.25 3h-5C3.56 3 3 3.56 3 4.25v5c0 .54.34 1 .82 1.17",
  done: "M3.75 8.4 6.6 11.2 12.25 5",
  arrow: "M3.5 8h9M8.75 4.25 12.5 8l-3.75 3.75",
};
const standardPaths = {
  close: "m2.5 2.5 5 5m0-5-5 5",
  out: "M4.5 3h4.5v4.5M8.8 3.2 3 9",
  copy: "M7.8 2.6A1.2 1.2 0 0 0 6.6 2H3.2A1.2 1.2 0 0 0 2 3.2v3.4a1.2 1.2 0 0 0 .6 1",
  done: "m2.6 6.3 2.2 2.2 4.6-5",
  arrow: "M2.5 6h7M6.5 3l3 3-3 3",
};
const stroke: Pick<
  SVGProps<SVGPathElement>,
  "stroke" | "strokeWidth" | "strokeLinecap" | "strokeLinejoin"
> = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
export { CitedAnswer };
export type { CitedSegment };
export type { CitedSource };
export type { CitedAnswerProps };
