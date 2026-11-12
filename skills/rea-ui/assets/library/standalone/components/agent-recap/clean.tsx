"use client";

import "./AgentRecap.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type CSSProperties,
} from "react";
type RecapKind = "needs" | "failed" | "done";
interface RecapEvent {
  id?: string;
  kind?: RecapKind;
  at?: unknown;
  title?: string;
  detail?: string;
  logo?: ReactNode;
  action?: string;
  doneLabel?: string;
  count?: number;
  [field: string]: unknown;
}
interface AgentRecapProps {
  events: RecapEvent[];
  since?: Date | string | number;
  until?: Date | string | number;
  title?: string;
  onAction?: (event: RecapEvent, action: "primary" | "review") => void | Promise<void>;
  onUndo?: (event: RecapEvent) => void;
  onRedo?: (event: RecapEvent) => void;
  limit?: number;
  board?: boolean;
  replay?: number;
  locale?: string;
  onHover?: (event: RecapEvent | null) => void;
  className?: string;
}
interface TimedEvent {
  event: RecapEvent;
  position: number;
}
type EventState = "open" | "working" | "resolved" | "undone";
type FocusTarget = "main" | "undo" | "redo";
type RecapState = ReturnType<typeof useAgentRecap>;
type RecapState_RecapCard = ReturnType<typeof useAgentRecap>;
type RecapStyle = CSSProperties & {
  "--ui-rca-limit"?: number;
  "--ui-rcp-limit"?: number;
};
function AgentRecap(props: AgentRecapProps) {
  return <AgentRecapView {...props} clean />;
}
function timestamp(value: unknown): number {
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  if (typeof value === "string") return new Date(value).getTime();
  if (value === null) return 0;
  return NaN;
}
function formatWindow(since: number, until: number): string {
  const minutes = Math.max(0, Math.round((until - since) / 60000));
  const hours = Math.floor(minutes / 60);
  return hours
    ? `${hours}h ${minutes % 60 ? `${minutes % 60}m` : ""}`.trim()
    : `${minutes}m`;
}
function actionLabel(event: RecapEvent): string {
  return event.kind === "failed" ? "Retry" : (event.action ?? "Approve");
}
function resolvedLabel(event: RecapEvent): string {
  return event.kind === "failed" ? "Fixed" : (event.doneLabel ?? "Done");
}
function createActivityCurve(events: TimedEvent[]) {
  const peaks = events.map(({ event, position }) => ({
    position,
    weight:
      event.kind === "done" ? 0.7 + Math.log10((event.count ?? 1) + 1) * 0.45 : 1.05,
  }));
  function densityAt(position: number) {
    return (
      peaks.reduce(
        (total, peak) =>
          total +
          peak.weight *
            Math.exp(-((position - peak.position) ** 2) / (2 * spread * spread)),
        0,
      ) + 0.04
    );
  }
  const samples = Array.from({ length: sampleCount + 1 }, (_, index) =>
    densityAt(index / sampleCount),
  );
  const maximum = Math.max(...samples, 0.2);
  const heightAt = (density: number) => 98 - (density / maximum) * 84;
  const points = samples.map((density, index): [number, number] => [
    (index / sampleCount) * chartWidth,
    heightAt(density),
  ]);
  let line = `M ${points[0][0]} ${points[0][1]}`;
  for (let index = 0; index < points.length - 1; index++) {
    const before = points[Math.max(0, index - 1)];
    const [x, y] = points[index];
    const [nextX, nextY] = points[index + 1];
    const after = points[Math.min(points.length - 1, index + 2)];
    line += ` C ${x + (nextX - before[0]) / 6} ${y + (nextY - before[1]) / 6}, ${nextX - (after[0] - x) / 6} ${nextY - (after[1] - y) / 6}, ${nextX} ${nextY}`;
  }
  return {
    line,
    area: `${line} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`,
    yAt: (position: number) => heightAt(densityAt(position)) / chartHeight,
  };
}
function useAgentRecap(
  {
    events,
    since,
    until,
    replay = 1800,
    locale,
    onAction,
    onUndo,
    onRedo,
    onHover,
  }: AgentRecapProps,
  prefix: string,
) {
  const id = `${prefix}${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const start = timestamp(since);
  const [mountedAt] = useState(() => Date.now());
  const end = until === undefined ? mountedAt : timestamp(until);
  const duration = Math.max(1, end - start);
  const timeFormat = useMemo(
    () => new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }),
    [locale],
  );
  const timeline = useMemo(
    () =>
      events
        .filter((event) => Number.isFinite(timestamp(event.at)))
        .map((event) => ({
          event,
          position: Math.min(1, Math.max(0, (timestamp(event.at) - start) / duration)),
        }))
        .sort((left, right) => left.position - right.position),
    [events, start, duration],
  );
  const curve = useMemo(() => createActivityCurve(timeline), [timeline]);
  const [progress, setProgress] = useState(replay > 0 ? 0 : 1);
  useEffect(() => {
    if (replay <= 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const startedAt = performance.now();
    function tick(now: number) {
      const fraction = Math.min(1, Math.max(0, (now - startedAt) / replay));
      setProgress(1 - (1 - fraction) ** 3);
      if (fraction < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    const timeout = window.setTimeout(() => setProgress(1), replay + 150);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [replay]);
  const [states, setStates] = useState<Record<string, EventState>>({});
  const [hoveredId, setHoveredId] = useState<string | null | undefined>(null);
  const onHoverRef = useRef(onHover);
  onHoverRef.current = onHover;
  useEffect(() => {
    onHoverRef.current?.(
      hoveredId ? (events.find((event) => event.id === hoveredId) ?? null) : null,
    );
  }, [hoveredId]);
  const [cursor, setCursor] = useState<number | null>(null);
  function stateOf(eventId: string | undefined): EventState {
    return states[String(eventId)] ?? "open";
  }
  function setState(eventId: string | undefined, next: EventState) {
    setStates((previous) => ({ ...previous, [String(eventId)]: next }));
  }
  const rootRef = useRef<HTMLElement>(null);
  const pendingFocusRef = useRef<{
    id: string | undefined;
    target: FocusTarget;
  } | null>(null);
  const [announcement, setAnnouncement] = useState("");
  function transition(
    event: RecapEvent,
    state: EventState,
    target: FocusTarget,
    message: string,
  ) {
    pendingFocusRef.current = { id: event.id, target };
    setState(event.id, state);
    setAnnouncement(message);
  }
  useEffect(() => {
    const pending = pendingFocusRef.current;
    const root = rootRef.current;
    if (!pending || !root) return;
    const button = root.querySelector<HTMLButtonElement>(
      `[data-card-id="${CSS.escape(String(pending.id))}"] [data-focus="${pending.target}"]`,
    );
    if (!button) return;
    pendingFocusRef.current = null;
    const active = document.activeElement;
    if (!active || active === document.body || root.contains(active)) button.focus();
  });
  function act(event: RecapEvent, action: "primary" | "review") {
    if (action === "review") {
      void onAction?.(event, "review");
      return;
    }
    const result = onAction?.(event, "primary");
    if (result && typeof result.then === "function") {
      pendingFocusRef.current = null;
      setState(event.id, "working");
      setAnnouncement(
        `${event.kind === "failed" ? "Retrying" : "Working on"}: ${event.title}`,
      );
      result.then(
        () =>
          transition(
            event,
            "resolved",
            "undo",
            `${resolvedLabel(event)}: ${event.title}`,
          ),
        () => transition(event, "open", "main", `Didn't work: ${event.title}`),
      );
    } else
      transition(event, "resolved", "undo", `${resolvedLabel(event)}: ${event.title}`);
  }
  function undo(event: RecapEvent) {
    transition(
      event,
      event.kind === "done" ? "undone" : "open",
      event.kind === "done" ? "redo" : "main",
      `Undone: ${event.title}`,
    );
    onUndo?.(event);
  }
  function redo(event: RecapEvent) {
    transition(event, "open", "undo", `Redone: ${event.title}`);
    onRedo?.(event);
  }
  function isVisible(position: number): boolean {
    return position <= progress + 0.0001;
  }
  const visibleEvents = timeline.filter((item) => isVisible(item.position));
  const countUnresolved = (kind: RecapKind) =>
    visibleEvents.filter(
      ({ event }) => event.kind === kind && stateOf(event.id) !== "resolved",
    ).length;
  const counts = {
    done: visibleEvents.filter(
      ({ event }) =>
        (event.kind === "done" && stateOf(event.id) !== "undone") ||
        stateOf(event.id) === "resolved",
    ).length,
    needs: countUnresolved("needs"),
    failed: countUnresolved("failed"),
  };
  const hoveredEvent = hoveredId
    ? timeline.find((item) => item.event.id === hoveredId)
    : undefined;
  const hourTicks = useMemo(() => {
    const ticks: number[] = [];
    const time = new Date(start);
    time.setMinutes(0, 0, 0);
    for (
      time.setHours(time.getHours() + 1);
      time.getTime() < end;
      time.setHours(time.getHours() + 1)
    )
      ticks.push((time.getTime() - start) / duration);
    return ticks;
  }, [start, end, duration]);
  function handleChartPointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.min(
      1,
      Math.max(0, (event.clientX - bounds.left) / bounds.width),
    );
    const nearest = timeline.reduce<TimedEvent | null>(
      (best, item) =>
        Math.abs(item.position - position) < 0.025 &&
        (!best || Math.abs(item.position - position) < Math.abs(best.position - position))
          ? item
          : best,
      null,
    );
    setCursor(nearest ? nearest.position : position);
    setHoveredId(nearest ? nearest.event.id : null);
  }
  function clearChartHover() {
    setCursor(null);
    setHoveredId(null);
  }
  return {
    id,
    start,
    end,
    timeFormat,
    timeline,
    curve,
    progress,
    hoveredId,
    setHoveredId,
    cursor,
    stateOf,
    rootRef,
    announcement,
    act,
    undo,
    redo,
    isVisible,
    counts,
    hoveredEvent,
    hourTicks,
    handleChartPointer,
    clearChartHover,
  };
}
function KindIcon({ kind, prefix }: { kind: RecapKind; prefix: string }) {
  return (
    <svg
      className={`${prefix}__kind`}
      data-kind={kind}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "needs" && (
        <>
          <circle cx="8" cy="5.25" r="2.5" />
          <path d="M3.25 13.25c.6-2.35 2.45-3.75 4.75-3.75s4.15 1.4 4.75 3.75" />
        </>
      )}
      {kind === "failed" && (
        <>
          <path d="M7.13 2.75a1 1 0 0 1 1.74 0l5.2 9.25a1 1 0 0 1-.87 1.5H2.8a1 1 0 0 1-.87-1.5z" />
          <path d="M8 6.5v2.75M8 11.25v.01" />
        </>
      )}
      {kind === "done" && (
        <>
          <circle cx="8" cy="8" r="5.75" />
          <path d="m5.6 8.2 1.6 1.6 3.2-3.4" />
        </>
      )}
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 8.25 2.75 2.75L12 5.5" />
    </svg>
  );
}
function ActivityChart({ recap, prefix }: { recap: RecapState; prefix: string }) {
  const {
    id,
    curve,
    progress,
    cursor,
    timeline,
    stateOf,
    hoveredId,
    setHoveredId,
    isVisible,
    hoveredEvent,
    timeFormat,
    hourTicks,
    handleChartPointer,
    clearChartHover,
  } = recap;
  return (
    <div
      className={`${prefix}__chart`}
      aria-hidden="true"
      onPointerMove={handleChartPointer}
      onPointerLeave={clearChartHover}
    >
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={`var(--${prefix}-area)`} stopOpacity="1" />
            <stop offset="1" stopColor={`var(--${prefix}-area)`} stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${id}-clip`}>
            <rect
              x="0"
              y="0"
              width={Math.max(0, progress * chartWidth)}
              height={chartHeight}
            />
          </clipPath>
        </defs>
        <g className={`${prefix}__grid`}>
          {[0.25, 0.5, 0.75].map((position) => (
            <line
              x1="0"
              x2={chartWidth}
              y1={position * chartHeight}
              y2={position * chartHeight}
              vectorEffect="non-scaling-stroke"
              key={position}
            />
          ))}
          {hourTicks.map((position) => (
            <line
              x1={position * chartWidth}
              x2={position * chartWidth}
              y1="0"
              y2={chartHeight}
              vectorEffect="non-scaling-stroke"
              key={position}
            />
          ))}
        </g>
        <g clipPath={`url(#${id}-clip)`}>
          <path className={`${prefix}__area`} d={curve.area} fill={`url(#${id}-fade)`} />
          <path
            className={`${prefix}__line`}
            d={curve.line}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
      <span className={`${prefix}__frame`} />
      {cursor !== null && (
        <span className={`${prefix}__cursor`} style={{ left: `${cursor * 100}%` }} />
      )}
      {timeline.map(({ event, position }, index) => (
        <span
          className={`${prefix}__dot`}
          data-kind={stateOf(event.id) === "resolved" ? "done" : event.kind}
          data-on={isVisible(position) || undefined}
          data-hot={hoveredId === event.id || undefined}
          style={{
            left: `${position * 100}%`,
            top: `${curve.yAt(position) * 100}%`,
          }}
          onPointerEnter={() => setHoveredId(event.id)}
          onPointerLeave={() => setHoveredId(null)}
          key={`${event.id}:${index}`}
        />
      ))}
      {hoveredEvent && (
        <span
          className={`${prefix}__tip`}
          style={{
            left: `${hoveredEvent.position * 100}%`,
            top: `${curve.yAt(hoveredEvent.position) * 100}%`,
          }}
          data-edge={
            hoveredEvent.position < 0.15
              ? "start"
              : hoveredEvent.position > 0.85
                ? "end"
                : undefined
          }
        >
          {timeFormat.format(timestamp(hoveredEvent.event.at))}
          {" · "}
          {hoveredEvent.event.title}
        </span>
      )}
    </div>
  );
}
function RecapCard({
  item,
  kind,
  recap,
  prefix,
  locale,
}: {
  item: TimedEvent;
  kind: RecapKind;
  recap: RecapState_RecapCard;
  prefix: string;
  locale?: string;
}) {
  const { event, position } = item;
  const state = recap.stateOf(event.id);
  const working = state === "working";
  return (
    <li
      className={`${prefix}__card`}
      data-card-id={event.id}
      onFocus={() => recap.setHoveredId(event.id)}
      onBlur={(focusEvent) => {
        if (!focusEvent.currentTarget.contains(focusEvent.relatedTarget))
          recap.setHoveredId(null);
      }}
      data-kind={kind}
      data-state={state}
      data-seen={recap.isVisible(position) || undefined}
      data-hot={recap.hoveredId === event.id || undefined}
      onPointerEnter={() => recap.setHoveredId(event.id)}
      onPointerLeave={() => recap.setHoveredId(null)}
    >
      <span className={`${prefix}__card-top`}>
        <span className={`${prefix}__mark`} aria-hidden="true">
          {state === "resolved" ? (
            <CheckIcon />
          ) : (
            (event.logo ?? Array.from(event.title?.trim() ?? "")[0]?.toUpperCase())
          )}
        </span>
        <span className={`${prefix}__card-title`} title={event.title}>
          {event.title}
        </span>
      </span>
      <span className={`${prefix}__card-meta`}>
        <span className={`${prefix}__detail`} title={event.detail}>
          {event.detail}
        </span>
        {kind === "done" && event.count !== undefined && (
          <span
            className={`${prefix}__tag`}
            title={event.count >= 10000 ? event.count.toLocaleString(locale) : undefined}
          >
            {new Intl.NumberFormat(
              locale,
              event.count >= 10000
                ? { notation: "compact", maximumFractionDigits: 1 }
                : {},
            ).format(event.count)}
          </span>
        )}
        <time
          className={`${prefix}__time`}
          dateTime={new Date(timestamp(event.at)).toISOString()}
        >
          {recap.timeFormat.format(timestamp(event.at))}
        </time>
      </span>
      {kind === "done" ? (
        <span className={`${prefix}__card-foot`}>
          <span className={`${prefix}__status`}>
            <span
              className={`${prefix}__state`}
              data-off={state === "undone" || undefined}
            >
              {state === "undone" ? "Undone" : "Done"}
            </span>
          </span>
          <button
            type="button"
            className={`${prefix}__btn`}
            data-focus={state === "undone" ? "redo" : "undo"}
            aria-label={`${state === "undone" ? "Redo" : "Undo"}: ${event.title}`}
            onClick={() => (state === "undone" ? recap.redo(event) : recap.undo(event))}
          >
            {state === "undone" ? "Redo" : "Undo"}
          </button>
        </span>
      ) : (
        <span className={`${prefix}__card-foot`}>
          {state === "resolved" ? (
            <>
              <span className={`${prefix}__status`}>
                <span className={`${prefix}__state`}>{resolvedLabel(event)}</span>
              </span>
              <button
                type="button"
                className={`${prefix}__btn`}
                data-focus="undo"
                aria-label={`Undo: ${event.title}`}
                onClick={() => recap.undo(event)}
              >
                Undo
              </button>
            </>
          ) : (
            <>
              <span className={`${prefix}__status`} data-working={working || undefined}>
                {working ? (kind === "failed" ? "Retrying…" : "Working…") : ""}
              </span>
              {kind === "needs" && (
                <button
                  type="button"
                  className={`${prefix}__btn`}
                  disabled={working}
                  aria-label={`Review: ${event.title}`}
                  onClick={() => recap.act(event, "review")}
                >
                  Review
                </button>
              )}
              <button
                type="button"
                className={`${prefix}__btn ${prefix}__btn--main`}
                data-focus="main"
                disabled={working}
                aria-label={`${actionLabel(event)}: ${event.title}`}
                onClick={() => recap.act(event, "primary")}
              >
                {working && <span className={`${prefix}__spin`} aria-hidden="true" />}
                <span className={`${prefix}__btn-label`}>{actionLabel(event)}</span>
              </button>
            </>
          )}
        </span>
      )}
    </li>
  );
}
function AgentRecapView({
  clean = false,
  ...props
}: AgentRecapProps & {
  clean?: boolean;
}) {
  const {
    title = "While you were away",
    limit = 3,
    board = true,
    locale,
    className,
  } = props;
  const prefix = clean ? "ui-rcp" : "ui-rca";
  const recap = useAgentRecap(props, prefix);
  const style: RecapStyle = clean
    ? { "--ui-rcp-limit": limit }
    : { "--ui-rca-limit": limit };
  const panel = (
    <>
      <header className={`${prefix}__head`}>
        <div>
          <h2 className={`${prefix}__title`}>{title}</h2>
          <p className={`${prefix}__since`}>
            {"Since "}
            {recap.timeFormat.format(recap.start)}
            <span className={`${prefix}__pill`}>
              {formatWindow(recap.start, recap.end)}
            </span>
          </p>
        </div>
        <ul className={`${prefix}__counts`} aria-label="Summary">
          {(["done", "needs", "failed"] as const).map((kind) => (
            <li data-kind={kind} key={kind}>
              <KindIcon kind={kind} prefix={prefix} />
              <b>{recap.counts[kind]}</b> {kind === "needs" ? "need you" : kind}
            </li>
          ))}
        </ul>
      </header>
      <ActivityChart recap={recap} prefix={prefix} />
      <div className={`${prefix}__ends`} aria-hidden="true">
        <span>{recap.timeFormat.format(recap.start)}</span>
        <span>{recap.timeFormat.format(recap.end)}</span>
      </div>
    </>
  );
  return (
    <section
      ref={recap.rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      style={style}
      aria-label={title}
    >
      <p className={`${prefix}__sr`} aria-live="polite">
        {recap.announcement}
      </p>
      {clean ? panel : <div className={`${prefix}__panel`}>{panel}</div>}
      {board && (
        <div className={`${prefix}__board`}>
          {recapLanes.map(({ kind, label }) => {
            const laneEvents = recap.timeline.filter((item) => item.event.kind === kind);
            const shownEvents = laneEvents.slice(0, limit);
            const unresolved = laneEvents.filter(
              (item) => !["resolved", "undone"].includes(recap.stateOf(item.event.id)),
            ).length;
            return (
              <div className={`${prefix}__lane`} data-kind={kind} key={kind}>
                <h3 className={`${prefix}__lane-head`}>
                  <span>
                    <KindIcon kind={kind} prefix={prefix} />
                    {label}
                  </span>
                  <span
                    className={`${prefix}__lane-n`}
                    title={
                      laneEvents.length > shownEvents.length
                        ? `Showing ${shownEvents.length} of ${laneEvents.length}`
                        : undefined
                    }
                  >
                    {unresolved}
                  </span>
                </h3>
                <ul className={`${prefix}__cards`}>
                  {shownEvents.length === 0 && (
                    <li className={`${prefix}__empty`}>{emptyLabels[kind]}</li>
                  )}
                  {shownEvents.map((item, index) => (
                    <RecapCard
                      item={item}
                      kind={kind}
                      recap={recap}
                      prefix={prefix}
                      locale={locale}
                      key={`${item.event.id}:${index}`}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
const emptyLabels = {
  needs: "Nothing needs you",
  failed: "Nothing failed",
  done: "Nothing done yet",
};
const recapLanes = [
  { kind: "needs", label: "Needs you" },
  { kind: "failed", label: "Failed" },
  { kind: "done", label: "Done" },
] as const;
const chartWidth = 1000;
const chartHeight = 100;
const sampleCount = 120;
const spread = 0.022;
export { AgentRecap };
export type { AgentRecapProps };
export type { RecapEvent };
