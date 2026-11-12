"use client";

import "./AIAnswer.clean.css";
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
      className={[`ui-ansc`, className].filter(Boolean).join(` `)}
      data-phase={phase}
      data-framed={framed || undefined}
      onMouseLeave={() => setHoveredSourceIds(null)}
    >
      <div className={`ui-ansc__card`}>
        <div ref={cardRef} className={`ui-ansc__body`}>
          <div ref={contentRef} className={`ui-ansc__inner`}>
            {question && (
              <h3 className={`ui-ansc__question`} dir={`auto`}>
                {question}
              </h3>
            )}
            {sources.length > 0 && (
              <div
                className={`ui-ansc__sources`}
                aria-label={`Sources`}
                role={`list`}
                data-more={sources.length > VISIBLE_SOURCE_COUNT || undefined}
                data-more-narrow={sources.length > 2 || undefined}
                key={`s${answerVersion}`}
              >
                {sources.slice(0, VISIBLE_SOURCE_COUNT).map((source, sourceIndex) => {
                  let sourceContent = (
                      <Fragment>
                        <span className={`ui-ansc__site`}>
                          {source.icon && (
                            <span
                              className={`ui-ansc__favicon`}
                              onErrorCapture={hideBrokenSourceIcon}
                            >
                              {source.icon}
                            </span>
                          )}
                          <span className={`ui-ansc__site-name`} title={source.name}>
                            {source.name}
                          </span>
                          <span className={`ui-ansc__num`}>{sourceIndex + 1}</span>
                        </span>
                        <span
                          className={`ui-ansc__title`}
                          dir={`auto`}
                          title={source.title}
                        >
                          {source.title}
                        </span>
                      </Fragment>
                    ),
                    sourceProps = {
                      className: `ui-ansc__source`,
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
                      className={`ui-ansc__source-wrap`}
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
                    className={`ui-ansc__source-wrap ui-ansc__rest-wrap`}
                  >
                    <div
                      className={`ui-ansc__source ui-ansc__rest`}
                      data-lit={hasHiddenActiveSource || undefined}
                      data-lit-narrow={hasNarrowHiddenActiveSource || undefined}
                      style={{
                        animationDelay: skipAnimation ? `0ms` : `390ms`,
                      }}
                      onMouseEnter={(event) =>
                        setHoveredSourceIds(
                          getHiddenSourceIds(
                            event.currentTarget,
                            sources.length,
                            "--ui-ansc-shown",
                          ),
                        )
                      }
                      onMouseLeave={() => setHoveredSourceIds(null)}
                    >
                      <span className={`ui-ansc__rest-count`}>
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
                      <span className={`ui-ansc__rest-label`}>{`more`}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className={`ui-ansc__label`}>
              <AssistantMark />
              <span
                className={
                  isFinished
                    ? `ui-ansc__label-text`
                    : `ui-ansc__label-text ui-ansc__shimmer`
                }
                data-text={phaseLabel}
                children={phaseLabel}
                key={phaseLabel}
              />
            </div>
            <div className={`ui-ansc__answer`} aria-busy={!isFinished}>
              {phase === `writing` && shownTokens === 0 && (
                <p>
                  <span className={`ui-ansc__caret`} aria-hidden={`true`} />
                </p>
              )}
              {phase === `stopped` && shownTokens === 0 && (
                <p className={`ui-ansc__empty`}>{`Stopped before answering.`}</p>
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
                    variant="clean"
                  />
                );
              })}
            </div>
            {phase === `done` && followUps.length > 0 && (
              <div className={`ui-ansc__follow`}>
                <span className={`ui-ansc__follow-label`}>{`Related`}</span>
                {followUps.map((followUp, followUpIndex) => (
                  <button
                    type={`button`}
                    className={`ui-ansc__follow-item`}
                    style={{
                      animationDelay: `${skipAnimation ? 0 : 80 + followUpIndex * 60}ms`,
                    }}
                    onClick={() => onFollowUp?.(followUp)}
                    key={followUpIndex}
                  >
                    <span dir={`auto`}>{followUp}</span>
                    <AnswerIcon d={iconPaths.chevron} solid={true} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={`ui-ansc__foot`}>
          {isFinished ? (
            <div className={`ui-ansc__actions`} key={`actions`}>
              <button
                type={`button`}
                className={`ui-ansc__action`}
                aria-label={copied ? `Copied` : `Copy answer`}
                onClick={copyAnswer}
              >
                <AnswerIcon
                  d={copied ? iconPaths.check : iconPaths.copy}
                  solid={true}
                  className={copied ? `ui-ansc__ok` : undefined}
                />
              </button>
              <button
                type={`button`}
                className={`ui-ansc__action ui-ansc__redo`}
                aria-label={`Regenerate`}
                onClick={regenerateAnswer}
              >
                <AnswerIcon d={iconPaths.redo} />
              </button>
              <button
                type={`button`}
                className={`ui-ansc__action`}
                aria-label={`Good answer`}
                aria-pressed={feedback === `up`}
                onClick={() => toggleFeedback(`up`)}
              >
                <AnswerIcon d={iconPaths.thumb} solid={true} />
              </button>
              <button
                type={`button`}
                className={`ui-ansc__action ui-ansc__down`}
                aria-label={`Bad answer`}
                aria-pressed={feedback === `down`}
                onClick={() => toggleFeedback(`down`)}
              >
                <AnswerIcon d={iconPaths.thumb} solid={true} />
              </button>
            </div>
          ) : (
            <button
              type={`button`}
              className={`ui-ansc__stop`}
              onClick={stopAnswer}
              key={`stop`}
            >
              <span className={`ui-ansc__stop-icon`} aria-hidden={`true`} />
              {`Stop`}
            </button>
          )}
          {isFinished && (
            <span
              className={`ui-ansc__status`}
              aria-live={`polite`}
              title={statusText}
              children={
                statusText.startsWith(`Answered in `) ? (
                  <Fragment>
                    <span className={`ui-ansc__status-lead`}>{`Answered in `}</span>
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
          className={`ui-ansc__reasons`}
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
      </div>
      {popover && (
        <div
          id={popoverId}
          role={`tooltip`}
          className={`ui-ansc__pop`}
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
                className={`ui-ansc__pop-item`}
                href={source.href}
                target={`_blank`}
                rel={`noreferrer`}
                tabIndex={-1}
                key={sourceIndex}
              >
                <span className={`ui-ansc__site`}>
                  {source.icon && (
                    <span
                      className={`ui-ansc__favicon`}
                      onErrorCapture={hideBrokenSourceIcon}
                    >
                      {source.icon}
                    </span>
                  )}
                  <span className={`ui-ansc__site-name`}>
                    {source.href
                      ? source.href.replace(/^https?:\/\/(www\.)?/, ``).split(`/`)[0]
                      : source.name}
                  </span>
                  <span className={`ui-ansc__num`}>{sourceIndex + 1}</span>
                </span>
                <span className={`ui-ansc__pop-title`} dir={`auto`}>
                  {source.title}
                </span>
                {source.snippet && popover.ids.length === 1 && (
                  <span className={`ui-ansc__snippet`} dir={`auto`}>
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
  return (
    <svg viewBox={`0 0 16 16`} className={`ui-ansc__mark`} aria-hidden={`true`}>
      <path
        className={`ui-ansc__mark-big`}
        d={`M6.5 2.2c.2 0 .36.14.4.33.53 2.6 1.4 3.48 4 4.02a.4.4 0 0 1 0 .79c-2.6.53-3.47 1.4-4 4a.4.4 0 0 1-.8 0c-.53-2.6-1.4-3.47-4-4a.4.4 0 0 1 0-.79c2.6-.54 3.47-1.42 4-4.02a.4.4 0 0 1 .4-.33Z`}
      />
      <path
        className={`ui-ansc__mark-small`}
        d={`M12 9.6c.12 0 .22.08.25.2.28 1.3.72 1.75 2.03 2.03a.25.25 0 0 1 0 .49c-1.31.28-1.75.72-2.03 2.03a.25.25 0 0 1-.5 0c-.28-1.31-.72-1.75-2.03-2.03a.25.25 0 0 1 0-.49c1.31-.28 1.75-.73 2.03-2.03a.25.25 0 0 1 .25-.2Z`}
      />
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
  solid,
  className,
}: {
  d: string;
  solid?: boolean;
  className?: string;
}) => (
  <svg
    viewBox={`0 0 16 16`}
    className={[`ui-ansc__glyph`, className].filter(Boolean).join(` `)}
    data-solid={solid || void 0}
    aria-hidden={`true`}
  >
    <path d={path} />
  </svg>
);
const iconPaths = {
  copy: `M5.5 2A1.5 1.5 0 0 0 4 3.5V4h5A3 3 0 0 1 12 7v5h.5a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 2h-7ZM3.5 5A1.5 1.5 0 0 0 2 6.5v6A1.5 1.5 0 0 0 3.5 14H9a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 9 5H3.5Z`,
  check: `M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Zm8.9-1.2a.5.5 0 0 0-.8-.6L7.44 9.23 6.35 8.15a.5.5 0 1 0-.7.7l1.5 1.5a.5.5 0 0 0 .76-.06l2.5-3.5Z`,
  redo: `M13 8a5 5 0 1 1-1.46-3.54M13 2.5v2.5h-2.5`,
  thumb: `M4.5 7v6.5H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1.5Zm1 6.5h5.95a1.5 1.5 0 0 0 1.47-1.2l.86-4.3A1.5 1.5 0 0 0 12.31 6.2H9.5l.42-2.08A1.4 1.4 0 0 0 7.3 3.1L5.5 6.8v6.7Z`,
  chevron: `M10.85 7.65a.5.5 0 0 1 0 .7L7.2 12a.5.5 0 0 1-.7-.7L9.79 8 6.5 4.7a.5.5 0 1 1 .7-.7l3.65 3.65Z`,
};
export { AIAnswer };
export type { AIAnswerProps };
export type { AnswerSource };
