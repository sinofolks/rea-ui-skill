"use client";

import "./AIAnswer.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  Fragment,
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type SyntheticEvent,
  memo,
} from "react";
/** Reconstructed from the public component API and runtime. */
interface AnswerSource {
  title: string;
  name: string;
  href?: string;
  icon?: ReactNode;
  snippet?: string;
}
interface AIAnswerProps {
  question: string;
  sources: AnswerSource[];
  answer: string;
  streaming?: boolean;
  animate?: boolean;
  speed?: number;
  followUps?: string[];
  onFollowUp?: (question: string) => void;
  onRegenerate?: () => void;
  onStop?: () => void;
  onFeedback?: (value: "up" | "down", reason?: string) => void;
  feedbackReasons?: string[];
  onCopy?: (text: string) => void;
  framed?: boolean;
  className?: string;
}
function AIAnswer({
  question,
  sources,
  answer,
  streaming = false,
  animate = true,
  speed = 38,
  followUps = [],
  onFollowUp,
  onRegenerate,
  onStop,
  onFeedback,
  feedbackReasons = [`Not accurate`, `Wrong source`, `Too long`, `Out of date`],
  onCopy,
  framed = false,
  className,
}: AIAnswerProps): ReactElement {
  const {
    blocks,
    answerVersion,
    phase,
    shownTokens,
    elapsedSeconds,
    feedback,
    feedbackReason,
    copied,
    popover,
    rootRef,
    cardRef,
    contentRef,
    popoverId,
    isFinished,
    skipAnimation,
    setHoveredSourceIds,
    setFeedbackReason,
    hasHiddenActiveSource,
    hasNarrowHiddenActiveSource,
    copyAnswer,
    stopAnswer,
    regenerateAnswer,
    toggleFeedback,
    statusText,
    phaseLabel,
    citationActions,
    highlightedSourceKey,
    activeSourceIds,
    closePopover,
    keepPopoverOpen,
  } = useAnswer({
    question,
    sources,
    answer,
    streaming,
    animate,
    speed,
    onCopy,
    onStop,
    onRegenerate,
    onFeedback,
  });
  return (
    <div
      ref={rootRef}
      className={[`ui-ans`, className].filter(Boolean).join(` `)}
      data-phase={phase}
      data-framed={framed || undefined}
      onMouseLeave={() => setHoveredSourceIds(null)}
    >
      <div ref={cardRef} className={`ui-ans__card`}>
        <div ref={contentRef} className={`ui-ans__inner`}>
          {question && (
            <h3 className={`ui-ans__question`} dir={`auto`}>
              {question}
            </h3>
          )}
          {sources.length > 0 && (
            <div
              className={`ui-ans__sources`}
              aria-label={`Sources`}
              role={`list`}
              data-more={sources.length > VISIBLE_SOURCE_COUNT || undefined}
              data-more-narrow={sources.length > 2 || undefined}
              key={`s${answerVersion}`}
            >
              {sources.slice(0, VISIBLE_SOURCE_COUNT).map((source, sourceIndex) => {
                let sourceContent = (
                    <Fragment>
                      <span className={`ui-ans__site`}>
                        {source.icon && (
                          <span
                            className={`ui-ans__favicon`}
                            onErrorCapture={hideBrokenSourceIcon}
                          >
                            {source.icon}
                          </span>
                        )}
                        <span className={`ui-ans__site-name`} title={source.name}>
                          {source.name}
                        </span>
                        <span className={`ui-ans__num`}>{sourceIndex + 1}</span>
                      </span>
                      <span className={`ui-ans__title`} dir={`auto`} title={source.title}>
                        {source.title}
                      </span>
                    </Fragment>
                  ),
                  sourceProps = {
                    className: `ui-ans__source`,
                    "data-lit": activeSourceIds.has(sourceIndex) || undefined,
                    style: {
                      animationDelay: skipAnimation
                        ? `0ms`
                        : `${120 + sourceIndex * SOURCE_REVEAL_INTERVAL_MS}ms`,
                    },
                    onMouseEnter: () => setHoveredSourceIds([sourceIndex]),
                    onMouseLeave: () => setHoveredSourceIds(null),
                  };
                return (
                  <div
                    role={`listitem`}
                    className={`ui-ans__source-wrap`}
                    children={
                      source.href ? (
                        <a
                          {...sourceProps}
                          href={source.href}
                          target={`_blank`}
                          rel={`noreferrer`}
                        >
                          {sourceContent}
                        </a>
                      ) : (
                        <div {...sourceProps}>{sourceContent}</div>
                      )
                    }
                    key={sourceIndex}
                  />
                );
              })}
              {sources.length > 2 && (
                <div
                  role={`listitem`}
                  className={`ui-ans__source-wrap ui-ans__rest-wrap`}
                >
                  <div
                    className={`ui-ans__source ui-ans__rest`}
                    data-lit={hasHiddenActiveSource || undefined}
                    data-lit-narrow={hasNarrowHiddenActiveSource || undefined}
                    style={{
                      animationDelay: skipAnimation ? `0ms` : `390ms`,
                    }}
                    onMouseEnter={(event) =>
                      setHoveredSourceIds(
                        getHiddenSourceIds(event.currentTarget, sources.length),
                      )
                    }
                    onMouseLeave={() => setHoveredSourceIds(null)}
                  >
                    <span className={`ui-ans__rest-count`}>
                      <span data-wide={true}>
                        {`+`}
                        {sourceNumberFormatter.format(
                          sources.length - VISIBLE_SOURCE_COUNT,
                        )}
                      </span>
                      <span data-narrow={true}>
                        {`+`}
                        {sourceNumberFormatter.format(
                          sources.length - VISIBLE_SOURCE_COUNT + 1,
                        )}
                      </span>
                    </span>
                    <span className={`ui-ans__rest-label`}>{`more`}</span>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className={`ui-ans__label`}>
            <AssistantMark />
            <span
              className={
                isFinished ? `ui-ans__label-text` : `ui-ans__label-text ui-ans__shimmer`
              }
              data-text={phaseLabel}
              children={phaseLabel}
              key={phaseLabel}
            />
          </div>
          <div className={`ui-ans__answer`} aria-busy={!isFinished}>
            {phase === `writing` && shownTokens === 0 && (
              <p>
                <span className={`ui-ans__caret`} aria-hidden={`true`} />
              </p>
            )}
            {phase === `stopped` && shownTokens === 0 && (
              <p className={`ui-ans__empty`}>{`Stopped before answering.`}</p>
            )}
            {blocks.map((block, blockIndex) => {
              let [firstTokenIndex, endTokenIndex] = getBlockRange(block);
              return firstTokenIndex >= shownTokens ? null : (
                <AnswerBlock_AnswerBlock
                  block={block}
                  visibleTokenCount={Math.min(shownTokens, endTokenIndex)}
                  showCaret={phase === `writing` && shownTokens <= endTokenIndex}
                  highlightedSourceKey={highlightedSourceKey}
                  openSourceIds={popover?.ids ?? null}
                  tooltipId={popoverId}
                  sources={sources}
                  citationActions={citationActions}
                  key={`${answerVersion}-${blockIndex}`}
                  variant="default"
                />
              );
            })}
          </div>
          {phase === `done` && followUps.length > 0 && (
            <div className={`ui-ans__follow`}>
              <span className={`ui-ans__follow-label`}>{`Related`}</span>
              {followUps.map((followUp, followUpIndex) => (
                <button
                  type={`button`}
                  className={`ui-ans__follow-item`}
                  style={{
                    animationDelay: `${skipAnimation ? 0 : 80 + followUpIndex * 60}ms`,
                  }}
                  onClick={() => onFollowUp?.(followUp)}
                  key={followUpIndex}
                >
                  <span dir={`auto`}>{followUp}</span>
                  <AnswerIcon d={iconPaths.arrow} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={`ui-ans__foot`}>
        {isFinished ? (
          <div className={`ui-ans__actions`} key={`actions`}>
            <button
              type={`button`}
              className={`ui-ans__action`}
              aria-label={copied ? `Copied` : `Copy answer`}
              onClick={copyAnswer}
            >
              <AnswerIcon
                d={copied ? iconPaths.check : iconPaths.copy}
                className={copied ? `ui-ans__ok` : undefined}
              />
            </button>
            <button
              type={`button`}
              className={`ui-ans__action ui-ans__redo`}
              aria-label={`Regenerate`}
              onClick={regenerateAnswer}
            >
              <AnswerIcon d={iconPaths.redo} />
            </button>
            <button
              type={`button`}
              className={`ui-ans__action`}
              aria-label={`Good answer`}
              aria-pressed={feedback === `up`}
              onClick={() => toggleFeedback(`up`)}
            >
              <AnswerIcon d={iconPaths.thumb} />
            </button>
            <button
              type={`button`}
              className={`ui-ans__action ui-ans__down`}
              aria-label={`Bad answer`}
              aria-pressed={feedback === `down`}
              onClick={() => toggleFeedback(`down`)}
            >
              <AnswerIcon d={iconPaths.thumb} />
            </button>
          </div>
        ) : (
          <button
            type={`button`}
            className={`ui-ans__stop`}
            onClick={stopAnswer}
            key={`stop`}
          >
            <span className={`ui-ans__stop-icon`} aria-hidden={`true`} />
            {`Stop`}
          </button>
        )}
        {isFinished && (
          <span
            className={`ui-ans__status`}
            aria-live={`polite`}
            title={statusText}
            children={
              statusText.startsWith(`Answered in `) ? (
                <Fragment>
                  <span className={`ui-ans__status-lead`}>{`Answered in `}</span>
                  {statusText.slice(12)}
                </Fragment>
              ) : (
                statusText
              )
            }
            key={statusText}
          />
        )}
      </div>
      <div
        className={`ui-ans__reasons`}
        data-open={feedback === `down` && !feedbackReason}
      >
        <div>
          {feedbackReasons.map((reason, reasonIndex) => (
            <button
              dir={`auto`}
              type={`button`}
              tabIndex={feedback === `down` && !feedbackReason ? 0 : -1}
              onClick={() => {
                setFeedbackReason(reason);
                onFeedback?.(`down`, reason);
              }}
              children={reason}
              key={reasonIndex}
            />
          ))}
        </div>
      </div>
      {popover && (
        <div
          id={popoverId}
          role={`tooltip`}
          className={`ui-ans__pop`}
          style={{
            left: popover.left,
            top: popover.top,
            width: popover.width,
          }}
          onMouseEnter={keepPopoverOpen}
          onMouseLeave={closePopover}
        >
          {popover.ids.map((sourceIndex) => {
            let source = sources[sourceIndex];
            return (
              <a
                className={`ui-ans__pop-item`}
                href={source.href}
                target={`_blank`}
                rel={`noreferrer`}
                tabIndex={-1}
                key={sourceIndex}
              >
                <span className={`ui-ans__site`}>
                  {source.icon && (
                    <span
                      className={`ui-ans__favicon`}
                      onErrorCapture={hideBrokenSourceIcon}
                    >
                      {source.icon}
                    </span>
                  )}
                  <span className={`ui-ans__site-name`}>
                    {source.href
                      ? source.href.replace(/^https?:\/\/(www\.)?/, ``).split(`/`)[0]
                      : source.name}
                  </span>
                  <span className={`ui-ans__num`}>{sourceIndex + 1}</span>
                </span>
                <span className={`ui-ans__pop-title`} dir={`auto`}>
                  {source.title}
                </span>
                {source.snippet && popover.ids.length === 1 && (
                  <span className={`ui-ans__snippet`} dir={`auto`}>
                    {source.snippet}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
interface WordToken {
  kind: "word";
  index: number;
  text: string;
  bold: boolean;
}
interface CitationToken {
  kind: "citation";
  index: number;
  sourceIds: number[];
}
type AnswerToken = WordToken | CitationToken;
type AnswerTextBlock =
  | {
      kind: "paragraph";
      tokens: AnswerToken[];
    }
  | {
      kind: "list";
      items: AnswerToken[][];
    };
interface ParsedAnswer {
  blocks: AnswerTextBlock[];
  total: number;
}
type AnswerPhase = "reading" | "writing" | "done" | "stopped";
interface CitationPopover {
  ids: number[];
  left: number;
  top: number;
  width: number;
}
interface CitationActions {
  open(ids: number[], trigger: HTMLElement): void;
  close(): void;
  toggle(ids: number[], trigger: HTMLElement): void;
  dismiss(): void;
}
interface AnswerBlockProps {
  block: AnswerTextBlock;
  visibleTokenCount: number;
  showCaret: boolean;
  highlightedSourceKey: string;
  openSourceIds: number[] | null;
  tooltipId: string;
  sources: AnswerSource[];
  citationActions: CitationActions;
  variant: "default" | "clean";
}
/** Parse the supported answer syntax: paragraphs, bullet lists, bold text and [1, 2] citations.
 * Token indices are global so animation can reveal a single continuous stream across blocks.
 */
function parseAnswer(answer: string, sourceCount: number): ParsedAnswer {
  let nextTokenIndex = 0;
  function tokenize(text: string): AnswerToken[] {
    const tokens: AnswerToken[] = [];
    for (const segment of text.split(/(\*\*[^*]+\*\*|\[\d+(?:\s*,\s*\d+)*\])/)) {
      if (!segment) continue;
      const citation = segment.match(/^\[([\d,\s]+)\]$/);
      if (citation) {
        const sourceIds = citation[1]
          .split(",")
          .map((value) => Number(value) - 1)
          .filter((index) => index >= 0 && index < sourceCount);
        if (!sourceIds.length) continue;
        const previousToken = tokens.at(-1);
        if (previousToken?.kind === "citation") {
          previousToken.sourceIds = [
            ...new Set([...previousToken.sourceIds, ...sourceIds]),
          ];
        } else tokens.push({ kind: "citation", index: nextTokenIndex++, sourceIds });
        continue;
      }
      const bold = segment.startsWith("**");
      const content = bold ? segment.slice(2, -2) : segment;
      for (const word of content.match(/\S+\s*|\s+/g) ?? []) {
        if (!word.trim()) {
          const previousToken = tokens.at(-1);
          if (previousToken?.kind === "word") previousToken.text += word;
        } else
          tokens.push({
            kind: "word",
            index: nextTokenIndex++,
            text: word,
            bold,
          });
      }
    }
    return tokens;
  }
  const blocks: AnswerTextBlock[] = [];
  for (const paragraph of answer.split(/\n\s*\n/)) {
    const lines = paragraph.split("\n").filter((line) => line.trim());
    if (!lines.length) continue;
    if (lines.every((line) => /^\s*[-*]\s/.test(line))) {
      blocks.push({
        kind: "list",
        items: lines.map((line) => tokenize(line.replace(/^\s*[-*]\s/, ""))),
      });
    } else blocks.push({ kind: "paragraph", tokens: tokenize(lines.join(" ")) });
  }
  return { blocks, total: nextTokenIndex };
}
/** Return a half-open global token range for a paragraph or complete list. */
function getBlockRange(block: AnswerTextBlock): [number, number] {
  const tokens = block.kind === "paragraph" ? block.tokens : block.items.flat();
  return tokens.length
    ? [tokens[0].index, tokens[tokens.length - 1].index + 1]
    : [Infinity, Infinity];
}
function formatCopiedAnswer(answer: string, sources: AnswerSource[]): string {
  const text = answer
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(
      /\s*\[(\d+(?:\s*,\s*\d+)*)\]/g,
      (_, ids: string) => ` [${ids.replace(/\s/g, "")}]`,
    )
    .trim();
  if (!sources.length) return text;
  const references = sources.map(
    (source, index) =>
      `[${index + 1}] ${source.title}${source.href ? ` – ${source.href}` : ""}`,
  );
  return `${text}\n\nSources:\n${references.join("\n")}`;
}
function formatElapsedTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const rounded = Math.round(seconds);
  if (rounded < 3600)
    return `${Math.floor(rounded / 60)}m ${String(rounded % 60).padStart(2, "0")}s`;
  return `${Math.floor(rounded / 3600)}h ${String(Math.floor((rounded % 3600) / 60)).padStart(2, "0")}m`;
}
function getHiddenSourceIds(
  element: HTMLElement,
  totalSources: number,
  cssProperty = "--ui-ans-shown",
): number[] {
  const visibleCount =
    Number(getComputedStyle(element).getPropertyValue(cssProperty)) ||
    VISIBLE_SOURCE_COUNT;
  return Array.from(
    { length: Math.max(0, totalSources - visibleCount) },
    (_, index) => visibleCount + index,
  );
}
function hideBrokenSourceIcon(event: SyntheticEvent<HTMLSpanElement>): void {
  event.currentTarget.hidden = true;
}
/** Shared behavior for Default and Clean; presentation stays in their respective TSX files. */
function useAnswer({
  answer,
  sources,
  streaming = false,
  animate = true,
  speed = DEFAULT_WORDS_PER_SECOND,
  onCopy,
  onStop,
  onRegenerate,
  onFeedback,
}: AIAnswerProps) {
  const { blocks, total: tokenCount } = useMemo(
    () => parseAnswer(answer, sources.length),
    [answer, sources.length],
  );
  const [answerVersion, setAnswerVersion] = useState(0);
  const [phase, setPhase] = useState<AnswerPhase>("reading");
  const [shownTokens, setShownTokens] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [feedbackReason, setFeedbackReason] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [popover, setPopover] = useState<CitationPopover | null>(null);
  const [hoveredSourceIds, setHoveredSourceIds] = useState<number[] | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const revealedTokenProgress = useRef(0);
  const startedAt = useRef(0);
  const previousAnswer = useRef(answer);
  const popoverCloseTimer = useRef<number | undefined>(undefined);
  const popoverId = useId();
  const isFinished = phase === "done" || phase === "stopped";
  const skipAnimation =
    !animate ||
    (typeof window !== "undefined" &&
      Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches));
  const wordsPerSecond =
    Number.isFinite(speed) && speed > 0 ? speed : DEFAULT_WORDS_PER_SECOND;
  useEffect(() => {
    // Appending text is streaming; replacing text starts a new answer run.
    if (!answer.startsWith(previousAnswer.current))
      setAnswerVersion((version) => version + 1);
    previousAnswer.current = answer;
  }, [answer]);
  useEffect(() => {
    startedAt.current = performance.now();
    revealedTokenProgress.current = 0;
    setShownTokens(0);
    setFeedback(null);
    setFeedbackReason(null);
    setCopied(false);
    setPopover(null);
    if (skipAnimation) {
      revealedTokenProgress.current = Infinity;
      setPhase("writing");
      return;
    }
    setPhase("reading");
    const delay = sources.length
      ? SOURCE_READING_DELAY_MS + Math.min(sources.length, 4) * SOURCE_REVEAL_INTERVAL_MS
      : 0;
    const timer = window.setTimeout(() => setPhase("writing"), delay);
    return () => window.clearTimeout(timer);
    // Settings are sampled when a run starts. Stream appends must not restart it.
  }, [answerVersion]);
  useEffect(() => {
    if (phase !== "writing") return;
    let animationFrame = 0;
    let lastFrameAt = performance.now();
    function advanceFrame(now: number) {
      revealedTokenProgress.current = Math.min(
        tokenCount,
        revealedTokenProgress.current + ((now - lastFrameAt) / 1000) * wordsPerSecond,
      );
      lastFrameAt = now;
      setShownTokens(Math.floor(revealedTokenProgress.current));
      if (revealedTokenProgress.current >= tokenCount && !streaming) {
        setElapsedSeconds(
          Math.max(0.1, Math.round((performance.now() - startedAt.current) / 100) / 10),
        );
        setPhase("done");
        return;
      }
      animationFrame = requestAnimationFrame(advanceFrame);
    }
    animationFrame = requestAnimationFrame(advanceFrame);
    return () => cancelAnimationFrame(animationFrame);
  }, [phase, tokenCount, streaming, wordsPerSecond]);
  useLayoutEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;
    const syncHeight = () => {
      card.style.height = `${content.offsetHeight}px`;
    };
    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), COPY_CONFIRMATION_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);
  useEffect(() => () => window.clearTimeout(popoverCloseTimer.current), []);
  function openPopover(ids: number[], trigger: HTMLElement) {
    window.clearTimeout(popoverCloseTimer.current);
    const root = rootRef.current;
    if (!root) return;
    const rootBounds = root.getBoundingClientRect();
    const triggerBounds = trigger.getBoundingClientRect();
    const width = Math.min(300, rootBounds.width - 16);
    const left = Math.max(
      8,
      Math.min(
        rootBounds.width - width - 8,
        triggerBounds.left - rootBounds.left + triggerBounds.width / 2 - width / 2,
      ),
    );
    setPopover({
      ids,
      left,
      top: triggerBounds.bottom - rootBounds.top + 6,
      width,
    });
  }
  function closePopover() {
    window.clearTimeout(popoverCloseTimer.current);
    popoverCloseTimer.current = window.setTimeout(
      () => setPopover(null),
      POPOVER_CLOSE_DELAY_MS,
    );
  }
  function keepPopoverOpen() {
    window.clearTimeout(popoverCloseTimer.current);
  }
  function copyAnswer() {
    const text = formatCopiedAnswer(answer, sources);
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    onCopy?.(text);
  }
  function stopAnswer() {
    setElapsedSeconds(
      Math.max(0.1, Math.round((performance.now() - startedAt.current) / 100) / 10),
    );
    setPhase("stopped");
    onStop?.();
  }
  function regenerateAnswer() {
    setAnswerVersion((version) => version + 1);
    onRegenerate?.();
  }
  function toggleFeedback(value: "up" | "down") {
    const next = feedback === value ? null : value;
    setFeedback(next);
    setFeedbackReason(null);
    if (next === "up") onFeedback?.("up");
  }
  const activeSourceIds = new Set(popover ? popover.ids : (hoveredSourceIds ?? []));
  const hasHiddenActiveSource = [...activeSourceIds].some(
    (index) => index >= VISIBLE_SOURCE_COUNT,
  );
  const hasNarrowHiddenActiveSource = [...activeSourceIds].some((index) => index >= 2);
  const statusText = copied
    ? "Copied"
    : feedback === "up" || feedbackReason
      ? "Thanks for the feedback"
      : feedback === "down"
        ? "What went wrong?"
        : phase === "stopped"
          ? "Stopped"
          : `Answered in ${formatElapsedTime(elapsedSeconds)}`;
  const phaseLabel =
    phase === "reading"
      ? `Reading ${sourceNumberFormatter.format(sources.length)} ${sources.length === 1 ? "source" : "sources"}`
      : phase === "writing"
        ? "Writing"
        : "Answer";
  // Stable handlers let completed text blocks stay memoized while the stream advances.
  const latestPopover = useRef({ openPopover, closePopover, popover });
  latestPopover.current = { openPopover, closePopover, popover };
  const citationActions = useMemo<CitationActions>(
    () => ({
      open: (ids, trigger) => latestPopover.current.openPopover(ids, trigger),
      close: () => latestPopover.current.closePopover(),
      toggle: (ids, trigger) =>
        latestPopover.current.popover?.ids === ids
          ? setPopover(null)
          : latestPopover.current.openPopover(ids, trigger),
      dismiss: () => setPopover(null),
    }),
    [],
  );
  const highlightedSourceKey = [...activeSourceIds]
    .sort((left, right) => left - right)
    .join(",");
  return {
    blocks,
    answerVersion,
    phase,
    shownTokens,
    elapsedSeconds,
    feedback,
    feedbackReason,
    copied,
    popover,
    rootRef,
    cardRef,
    contentRef,
    popoverId,
    isFinished,
    skipAnimation,
    activeSourceIds,
    hasHiddenActiveSource,
    hasNarrowHiddenActiveSource,
    statusText,
    phaseLabel,
    citationActions,
    highlightedSourceKey,
    setHoveredSourceIds,
    setFeedbackReason,
    openPopover,
    closePopover,
    keepPopoverOpen,
    copyAnswer,
    stopAnswer,
    regenerateAnswer,
    toggleFeedback,
  };
}
function AssistantMark() {
  let instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, ``),
    svgId = (suffix: string) => `ans${instanceId}-${suffix}`,
    cloudShape = (
      <Fragment>
        {cloudCircles.map((circle, index) => (
          <circle {...circle} key={index} />
        ))}
        <rect {...cloudBody} />
      </Fragment>
    ),
    renderEye = (left: number, isRight = false) => (
      <g className={isRight ? `ui-ans__eye ui-ans__eye-r` : `ui-ans__eye`}>
        <rect
          x={left}
          y={`106`}
          width={`18`}
          height={`31`}
          rx={`9`}
          fill={`url(#${svgId(`eye`)})`}
        />
        <rect
          x={left}
          y={`108.5`}
          width={`18`}
          height={`31`}
          rx={`9`}
          fill={`none`}
          className={`ui-ans__mark-eye-shade`}
          strokeWidth={`5`}
          filter={`url(#${svgId(`blur-s`)})`}
          clipPath={`url(#${svgId(isRight ? `clip-r` : `clip-l`)})`}
        />
      </g>
    );
  return (
    <svg viewBox={`30 40 180 160`} className={`ui-ans__mark`} aria-hidden={`true`}>
      <defs>
        <filter
          id={svgId(`goo`)}
          x={`0`}
          y={`0`}
          width={`240`}
          height={`240`}
          filterUnits={`userSpaceOnUse`}
        >
          <feGaussianBlur stdDeviation={`3.5`} />
          <feColorMatrix values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12`} />
        </filter>
        <filter
          id={svgId(`inner`)}
          x={`0`}
          y={`0`}
          width={`240`}
          height={`240`}
          filterUnits={`userSpaceOnUse`}
        >
          <feGaussianBlur in={`SourceAlpha`} stdDeviation={`15`} result={`soft`} />
          <feComposite in={`SourceAlpha`} in2={`soft`} operator={`out`} result={`rim`} />
          <feFlood
            style={{
              floodColor: `var(--ui-ans-mark-glow)`,
            }}
          />
          <feComposite in2={`rim`} operator={`in`} />
        </filter>
        <filter
          id={svgId(`blur-s`)}
          x={`0`}
          y={`0`}
          width={`240`}
          height={`240`}
          filterUnits={`userSpaceOnUse`}
        >
          <feGaussianBlur stdDeviation={`2`} />
        </filter>
        <filter
          id={svgId(`outline`)}
          x={`0`}
          y={`0`}
          width={`240`}
          height={`240`}
          filterUnits={`userSpaceOnUse`}
        >
          <feMorphology operator={`dilate`} radius={`6`} />
          <feGaussianBlur stdDeviation={`0.8`} />
        </filter>
        <g id={svgId(`shape`)} filter={`url(#${svgId(`goo`)})`}>
          {cloudShape}
        </g>
        <mask
          id={svgId(`mask`)}
          maskUnits={`userSpaceOnUse`}
          x={`0`}
          y={`0`}
          width={`240`}
          height={`240`}
        >
          <use href={`#${svgId(`shape`)}`} fill={`#fff`} />
        </mask>
        <linearGradient
          id={svgId(`body`)}
          x1={`0`}
          y1={`50`}
          x2={`0`}
          y2={`192`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop
            offset={`0`}
            style={{
              stopColor: `var(--ui-ans-mark-top)`,
            }}
          />
          <stop
            offset={`1`}
            style={{
              stopColor: `var(--ui-ans-mark-bottom)`,
            }}
          />
        </linearGradient>
        <linearGradient id={svgId(`eye`)} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
          <stop
            offset={`0`}
            style={{
              stopColor: `var(--ui-ans-mark-eye-top)`,
            }}
          />
          <stop
            offset={`1`}
            style={{
              stopColor: `var(--ui-ans-mark-eye-bottom)`,
            }}
          />
        </linearGradient>
        <clipPath id={svgId(`clip-l`)}>
          <rect x={`96.5`} y={`106`} width={`18`} height={`31`} rx={`9`} />
        </clipPath>
        <clipPath id={svgId(`clip-r`)}>
          <rect x={`127.5`} y={`106`} width={`18`} height={`31`} rx={`9`} />
        </clipPath>
      </defs>
      <use
        href={`#${svgId(`shape`)}`}
        className={`ui-ans__mark-edge`}
        filter={`url(#${svgId(`outline`)})`}
      />
      <g mask={`url(#${svgId(`mask`)})`}>
        <rect
          x={`0`}
          y={`0`}
          width={`240`}
          height={`240`}
          fill={`url(#${svgId(`body`)})`}
        />
        <use href={`#${svgId(`shape`)}`} filter={`url(#${svgId(`inner`)})`} />
      </g>
      <g className={`ui-ans__eyes`}>
        {renderEye(96.5)}
        {renderEye(127.5, !0)}
      </g>
    </svg>
  );
}
const VISIBLE_SOURCE_COUNT = 3;
const SOURCE_REVEAL_INTERVAL_MS = 90;
const sourceNumberFormatter = new Intl.NumberFormat("en");
const SOURCE_READING_DELAY_MS = 700;
const DEFAULT_WORDS_PER_SECOND = 38;
const POPOVER_CLOSE_DELAY_MS = 140;
const COPY_CONFIRMATION_MS = 1800;
/** Completed blocks keep their DOM while newly received tokens animate below them. */
const AnswerBlock_AnswerBlock = memo(function AnswerBlock({
  block,
  visibleTokenCount,
  showCaret,
  highlightedSourceKey,
  openSourceIds,
  tooltipId,
  sources,
  citationActions,
  variant,
}: AnswerBlockProps) {
  const prefix = variant === "clean" ? "ui-ansc" : "ui-ans";
  const highlightedSources = new Set(
    highlightedSourceKey ? highlightedSourceKey.split(",").map(Number) : [],
  );
  function renderTokens(tokens: AnswerToken[]) {
    return tokens.map((token) => {
      if (token.index >= visibleTokenCount) return null;
      const caret =
        showCaret && token.index === visibleTokenCount - 1 ? (
          <span className={`${prefix}__caret`} aria-hidden="true" />
        ) : null;
      if (token.kind === "word")
        return (
          <span
            className={`${prefix}__w`}
            data-bold={token.bold || undefined}
            key={token.index}
          >
            {token.text}
            {caret}
          </span>
        );
      const firstSource = sources[token.sourceIds[0]];
      const sourceTitles = token.sourceIds
        .map((index) => sources[index].title)
        .join(", ");
      return (
        <span className={`${prefix}__w`} key={token.index}>
          <button
            type="button"
            className={`${prefix}__cite`}
            title={sourceTitles}
            data-lit={
              token.sourceIds.some((index) => highlightedSources.has(index)) || undefined
            }
            aria-label={`Source: ${sourceTitles}`}
            aria-describedby={openSourceIds === token.sourceIds ? tooltipId : undefined}
            onMouseEnter={(event) =>
              citationActions.open(token.sourceIds, event.currentTarget)
            }
            onMouseLeave={citationActions.close}
            onFocus={(event) =>
              citationActions.open(token.sourceIds, event.currentTarget)
            }
            onBlur={citationActions.close}
            onClick={(event) =>
              citationActions.toggle(token.sourceIds, event.currentTarget)
            }
            onKeyDown={(event) => {
              if (event.key === "Escape") citationActions.dismiss();
            }}
          >
            <span className={`${prefix}__cite-name`}>{firstSource.name}</span>
            {token.sourceIds.length > 1 && (
              <span className={`${prefix}__more`}>+{token.sourceIds.length - 1}</span>
            )}
          </button>
          {caret}
        </span>
      );
    });
  }
  if (block.kind === "paragraph") return <p dir="auto">{renderTokens(block.tokens)}</p>;
  return (
    <ul>
      {block.items.map((tokens, index) =>
        tokens[0] && tokens[0].index < visibleTokenCount ? (
          <li dir="auto" key={index}>
            {renderTokens(tokens)}
          </li>
        ) : null,
      )}
    </ul>
  );
});
const AnswerIcon = ({
  d: path,
  className,
}: {
  d: string;
  solid?: boolean;
  className?: string;
}) => (
  <svg
    viewBox={`0 0 24 24`}
    className={[`ui-ans__glyph`, className].filter(Boolean).join(` `)}
    aria-hidden={`true`}
  >
    <path d={path} />
  </svg>
);
const iconPaths = {
  copy: `M9 9.5A1.5 1.5 0 0 1 10.5 8h8A1.5 1.5 0 0 1 20 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 9 18.5zM15 8V5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H9`,
  check: `M5 12.5l4.5 4.5L19 7.5`,
  redo: `M20 12a8 8 0 1 1-2.34-5.66L20 8.5M20 4v4.5h-4.5`,
  thumb: `M7 10v10M7 10l3.6-6.3a1.9 1.9 0 0 1 3.5 1.3L13.3 9H18a2 2 0 0 1 2 2.4l-1.4 7A2 2 0 0 1 16.6 20H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z`,
  arrow: `M5 12h14M13 6l6 6-6 6`,
};
const cloudCircles = [
  {
    cx: 115,
    cy: 93,
    r: 43,
  },
  {
    cx: 163,
    cy: 111,
    r: 39,
  },
  {
    cx: 156,
    cy: 155,
    r: 31,
  },
  {
    cx: 107,
    cy: 155,
    r: 35,
  },
  {
    cx: 72,
    cy: 126,
    r: 34,
  },
];
const cloudBody = {
  x: 80,
  y: 100,
  width: 80,
  height: 65,
};
export { AIAnswer };
export type { AIAnswerProps };
export type { AnswerSource };
