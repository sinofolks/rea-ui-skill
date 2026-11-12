"use client";

import "./ThinkingState.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ThinkingStep = {
  kind?: string;
  label?: string;
  activeLabel?: string;
  sources?: Array<{
    label?: string;
    icon?: ReactNode;
    tooltip?: string;
    href?: string;
    [field: string]: unknown;
  }>;
  moreSources?: Array<{
    label?: string;
    icon?: ReactNode;
    tooltip?: string;
    href?: string;
    [field: string]: unknown;
  }>;
  [field: string]: unknown;
};
interface ThinkingStateProps {
  steps: ThinkingStep[];
  doneLabel?: string;
  stepMs?: number;
  loop?: boolean;
  onDone?: (seconds: number) => void;
  className?: string;
  /** Clean style only. */ collapseOnDone?: boolean;
}
interface Source {
  label: string;
  href?: string;
  icon?: ReactNode;
  tooltip?: string;
}
type Step =
  | {
      kind: "step";
      label: string;
    }
  | {
      kind: "search";
      label: string;
      activeLabel?: string;
      sources: Source[];
      moreSources: Source[];
    };
function ThinkingState(props: ThinkingStateProps) {
  return <ThinkingStateView {...props} clean={false} />;
}
function normalizeSources(sources: ThinkingStep["sources"]): Source[] {
  if (!Array.isArray(sources)) return [];
  return sources
    .filter((source) => source && typeof source === "object")
    .map((source) => ({
      label: String(source.label ?? ""),
      href: source.href,
      icon: source.icon,
      tooltip: typeof source.tooltip === "string" ? source.tooltip : undefined,
    }));
}
function normalizeSteps(steps: ThinkingStep[]): Step[] {
  if (!Array.isArray(steps)) return [];
  return steps
    .filter((step) => step && typeof step === "object")
    .map((step) =>
      step.kind === "search"
        ? {
            kind: "search",
            label: String(step.label ?? ""),
            activeLabel: step.activeLabel,
            sources: normalizeSources(step.sources),
            moreSources: normalizeSources(step.moreSources),
          }
        : { kind: "step", label: String(step.label ?? "") },
    );
}
function formatThinkingDuration(seconds: number): string {
  const wholeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  if (wholeSeconds < 60) return `${wholeSeconds}s`;
  const minutes = Math.floor(wholeSeconds / 60);
  if (minutes < 60) return `${minutes}m ${String(wholeSeconds % 60).padStart(2, "0")}s`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? `${hours}h ${String(minutes % 60).padStart(2, "0")}m`
    : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function ElapsedTime({ since }: { since: number }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, []);
  return <>{formatThinkingDuration((now - since) / 1000)}</>;
}
function SourceChip({
  source,
  delay,
  prefix,
}: {
  source: Source;
  delay: number;
  prefix: string;
}) {
  const tooltip = source.tooltip ?? source.href?.replace(/^https?:\/\//, "");
  const content = (
    <>
      {source.icon && (
        <span
          className={`${prefix}__favicon`}
          onErrorCapture={(event) => {
            event.currentTarget.style.display = "none";
          }}
        >
          {source.icon}
        </span>
      )}
      <span
        className={`${prefix}__source-label`}
        dir="auto"
        title={tooltip ? undefined : source.label}
      >
        {source.label}
      </span>
      {tooltip && (
        <span className={`${prefix}__tip`} aria-hidden="true">
          {tooltip}
        </span>
      )}
    </>
  );
  const props = {
    className: `${prefix}__source`,
    "data-count": !source.icon || undefined,
    style: { animationDelay: `${delay}ms` },
  };
  return source.href ? (
    <a {...props} href={source.href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <span {...props}>{content}</span>
  );
}
function SearchIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M22 12A10 10 0 1 0 12 22" />
      <path d="M20 5.7c-.93.07-2.13.43-2.96 1.5-1.5 1.94-3 2.1-4 1.46-1.5-.97-.24-2.54-2-3.4-1.15-.56-1.31-2.07-.67-3.26" />
      <path d="M2 11c.76.66 1.83 1.27 3.09 1.27 2.6 0 3.12.5 3.12 2.48s0 1.99.52 3.48c.34.97.46 1.94-.22 2.77" />
      <path d="m19.9 19.93 2.1 2.07m-.89-4.95a4.05 4.05 0 1 1-8.11 0 4.05 4.05 0 0 1 8.11 0Z" />
    </svg>
  );
}
/** The two skins share the same timed sequence and source-expansion behavior. */
function ThinkingStateView({
  steps,
  doneLabel = "Finished thinking",
  stepMs = 1300,
  loop = false,
  collapseOnDone = false,
  onDone,
  className,
  clean,
}: ThinkingStateProps & {
  clean: boolean;
}) {
  const normalizedSteps = useMemo(() => normalizeSteps(steps), [steps]);
  const duration = Number.isFinite(stepMs) && stepMs >= 0 ? stepMs : 1300;
  const [iteration, setIteration] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    clean ? Math.min(1, normalizedSteps.length) : 0,
  );
  const [done, setDone] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [expanded, setExpanded] = useState(true);
  const [expandedSources, setExpandedSources] = useState(() => new Set<number>());
  const startTimeRef = useRef(0);
  const userExpandedSources = useRef(false);
  useEffect(() => {
    startTimeRef.current = Date.now();
    setStartedAt(startTimeRef.current);
    setVisibleCount(clean ? Math.min(1, normalizedSteps.length) : 0);
    setDone(false);
    setElapsedSeconds(0);
    setExpanded(true);
    setExpandedSources(new Set());
    const timers: number[] = [];
    let nextStepAt = clean ? 0 : 700;
    normalizedSteps.forEach((step, index) => {
      if (!clean || index > 0)
        timers.push(window.setTimeout(() => setVisibleCount(index + 1), nextStepAt));
      nextStepAt +=
        duration +
        (step.kind === "search"
          ? (Math.min(step.sources.length, MAX_STAGGERED_SOURCES) + 1) * SOURCE_REVEAL_MS
          : 0);
    });
    timers.push(
      window.setTimeout(() => {
        const seconds = Math.max(
          1,
          Math.round((Date.now() - startTimeRef.current) / 1000),
        );
        setElapsedSeconds(seconds);
        setDone(true);
        if (clean && collapseOnDone) setExpanded(false);
        onDone?.(seconds);
      }, nextStepAt),
    );
    if (loop)
      timers.push(
        window.setTimeout(() => {
          if (!userExpandedSources.current) setIteration((value) => value + 1);
        }, nextStepAt + 4000),
      );
    return () => timers.forEach(clearTimeout);
    // Callback and collapse policy are sampled when this sequence starts.
  }, [iteration, normalizedSteps, duration, loop, clean]);
  const prefix = clean ? "ui-thinkc" : "ui-think";
  const activeIndex = done ? -1 : visibleCount - 1;
  const list = (
    <ol className={`${prefix}__list`} aria-live="polite">
      {normalizedSteps.slice(0, visibleCount).map((step, index) => {
        const active = index === activeIndex;
        const label =
          step.kind === "search" && active
            ? (step.activeLabel ?? "Searching")
            : step.label;
        return (
          <li
            className={`${prefix}__item`}
            data-kind={step.kind}
            data-active={active || undefined}
            key={index}
          >
            <span className={`${prefix}__node`} aria-hidden="true">
              {step.kind === "search" ? (
                <SearchIcon className={`${prefix}__globe`} />
              ) : (
                <span className={`${prefix}__dot`} />
              )}
            </span>
            <div className={`${prefix}__content`}>
              <span
                className={
                  active ? `${prefix}__label ${prefix}__shimmer` : `${prefix}__label`
                }
                data-text={label}
                dir="auto"
              >
                {label}
              </span>
              {step.kind === "search" && (
                <div className={`${prefix}__sources`}>
                  {[
                    ...step.sources,
                    ...(expandedSources.has(index) ? step.moreSources : []),
                  ].map((source, sourceIndex) => (
                    <SourceChip
                      source={source}
                      prefix={prefix}
                      delay={
                        sourceIndex < step.sources.length
                          ? 120 +
                            Math.min(sourceIndex, MAX_STAGGERED_SOURCES) *
                              SOURCE_REVEAL_MS
                          : Math.min(
                              sourceIndex - step.sources.length,
                              MAX_STAGGERED_SOURCES,
                            ) * 70
                      }
                      key={source.label + sourceIndex}
                    />
                  ))}
                  {step.moreSources.length ? (
                    <button
                      type="button"
                      className={`${prefix}__source ${prefix}__more`}
                      aria-expanded={expandedSources.has(index)}
                      style={{
                        animationDelay: `${120 + Math.min(step.sources.length, MAX_STAGGERED_SOURCES) * SOURCE_REVEAL_MS}ms`,
                      }}
                      onClick={() => {
                        userExpandedSources.current = true;
                        setExpandedSources((previous) => {
                          const next = new Set(previous);
                          if (next.has(index)) next.delete(index);
                          else next.add(index);
                          return next;
                        });
                      }}
                    >
                      {expandedSources.has(index)
                        ? "Show less"
                        : `+${step.moreSources.length.toLocaleString("en-US")} more`}
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </li>
        );
      })}
      {done && (
        <li className={`${prefix}__item`} data-kind="done">
          <span className={`${prefix}__node`} aria-hidden="true">
            {clean ? (
              <svg viewBox="0 0 16 16" className={`${prefix}__check`}>
                <circle cx="8" cy="8" r="6.5" />
                <path d="M5.4 8.3l1.75 1.75L10.7 6.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className={`${prefix}__check`}>
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12.5l2.5 2.5L16 9" />
              </svg>
            )}
          </span>
          <div className={`${prefix}__content`}>
            <span className={`${prefix}__label`} dir="auto">
              {doneLabel}
            </span>
          </div>
        </li>
      )}
    </ol>
  );
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      data-done={done || undefined}
      key={iteration}
    >
      <button
        type="button"
        className={`${prefix}__head`}
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {clean ? (
          <span className={`${prefix}__mark`} aria-hidden="true">
            {PIXEL_DELAYS.map((delay, index) => (
              <i style={{ animationDelay: `${delay}ms` }} key={index} />
            ))}
          </span>
        ) : (
          <span className={`${prefix}__chevron`} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M18 9s-4.419 6-6 6c-1.581 0-6-6-6-6" />
            </svg>
          </span>
        )}
        <span className={`${prefix}__title`} key={done ? "done" : "busy"}>
          {done ? (
            `Worked for ${formatThinkingDuration(elapsedSeconds)}`
          ) : (
            <Fragment>
              <span className={`${prefix}__shimmer`} data-text="Thinking">
                Thinking
              </span>
              <span className={`${prefix}__time`}>
                <ElapsedTime since={startedAt} />
              </span>
            </Fragment>
          )}
        </span>
        {clean && (
          <span className={`${prefix}__chevron`} aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M4.5 6.25 8 9.75l3.5-3.5" />
            </svg>
          </span>
        )}
      </button>
      <div className={`${prefix}__body`} data-open={expanded}>
        {clean ? <div className={`${prefix}__clip`}>{list}</div> : list}
      </div>
    </div>
  );
}
const SOURCE_REVEAL_MS = 160;
const MAX_STAGGERED_SOURCES = 12;
const PIXEL_DELAYS = [0, 120, 240, 120, 240, 360, 240, 360, 480];
export { ThinkingState };
export type { ThinkingStep };
export type { ThinkingStateProps };
