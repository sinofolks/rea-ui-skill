"use client";

import "./PlanVsActual.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  useEffect,
  useRef,
  useState,
  memo,
  type Dispatch,
  type SetStateAction,
  useId,
  useLayoutEffect,
} from "react";
/** A step's times and budget use milliseconds and USD respectively. */
interface PlanStep {
  id?: string;
  title?: string;
  icon?: ReactNode;
  deps?: string[];
  plan?: number;
  start?: number;
  end?: number;
  cost?: number;
  planCost?: number;
  [field: string]: unknown;
}
interface PlanVsActualProps {
  steps: PlanStep[];
  now?: number;
  task?: string;
  formatTime?: (milliseconds: number) => string;
  formatCost?: (amount: number) => string;
  title?: string;
  className?: string;
}
interface ScheduledStep extends PlanStep {
  plan: number;
  cost?: number;
  planCost?: number;
}
interface TimelineRow_schedule {
  step: ScheduledStep;
  index: number;
  status: "waiting" | "running" | "done";
  plannedStart: number;
  plannedEnd: number;
  actualStart: number;
  actualEnd: number;
}
type TimelineStyle = CSSProperties & Record<`--${string}`, number | string>;
interface RowProps {
  row: TimelineRow_schedule;
  now: number;
  wait: number;
  range: number;
  trackWidth: number;
  focused: boolean;
  highlighted: boolean;
  formatTime: (milliseconds: number) => string;
  formatCost: (amount: number) => string;
  setFocus: Dispatch<SetStateAction<string | null | undefined>>;
}
function finiteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function normalizeStep(step: PlanStep): ScheduledStep {
  return {
    ...step,
    plan: Math.max(0, finiteNumber(step.plan) ?? 0),
    start: finiteNumber(step.start),
    end: finiteNumber(step.end),
    cost: finiteNumber(step.cost),
    planCost: finiteNumber(step.planCost),
  };
}
/** Forecast dependent steps recursively; ignore cycles when traversing prerequisites. */
function buildSchedule(steps: ScheduledStep[], now: number): TimelineRow_schedule[] {
  const byId = new Map(steps.map((step) => [step.id, step]));
  const indices = new Map(steps.map((step, index) => [step, index]));
  const resolved = new Map<string | undefined, TimelineRow_schedule>();
  const visiting = new Set<string | undefined>();
  function resolve(step: ScheduledStep, index: number): TimelineRow_schedule {
    const cached = resolved.get(step.id);
    if (cached) return cached;
    visiting.add(step.id);
    const dependencies = (step.deps ?? [])
      .map((id) => byId.get(id))
      .filter(
        (dependency): dependency is ScheduledStep =>
          !!dependency && !visiting.has(dependency.id),
      )
      .map((dependency) => resolve(dependency, indices.get(dependency)!));
    visiting.delete(step.id);
    const plannedStart = Math.max(0, ...dependencies.map((row) => row.plannedEnd));
    const plannedEnd = plannedStart + step.plan;
    const status =
      step.end === undefined
        ? step.start === undefined
          ? "waiting"
          : "running"
        : "done";
    let actualStart: number;
    let actualEnd: number;
    if (status === "done") {
      actualStart = step.start ?? step.end! - step.plan;
      actualEnd = step.end!;
    } else if (status === "running") {
      actualStart = step.start!;
      actualEnd = Math.max(now, actualStart + step.plan);
    } else {
      actualStart = Math.max(now, ...dependencies.map((row) => row.actualEnd));
      actualEnd = actualStart + step.plan;
    }
    const row: TimelineRow_schedule = {
      step,
      index,
      status,
      plannedStart,
      plannedEnd,
      actualStart,
      actualEnd,
    };
    resolved.set(step.id, row);
    return row;
  }
  return steps.map((step, index) => resolve(step, index));
}
function formatSeconds(seconds: number): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  if (seconds >= 86400)
    return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
  if (seconds >= 3600)
    return `${Math.floor(seconds / 3600)}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;
  return `${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;
}
function formatDuration(milliseconds: number): string {
  return formatSeconds(Math.max(0, Math.round(milliseconds / 1000)));
}
function formatDifference(milliseconds: number): string {
  const seconds = Math.round(Math.abs(milliseconds) / 1000);
  return `${milliseconds < 0 ? "−" : "+"}${seconds < 60 ? `${seconds}s` : formatSeconds(seconds)}`;
}
function formatMoney(amount: number): string {
  return amount !== 0 && Math.abs(amount) < 0.005
    ? `${amount < 0 ? "-" : ""}<$0.01`
    : currency.format(amount);
}
function barStyle(start: number, end: number): TimelineStyle {
  return { "--s": start, "--d": Math.max(0, end - start) };
}
/** Smooth large forecast changes while leaving clock updates and small deltas immediate. */
function useForecastMotion(
  targets: Record<string, number>,
  threshold: number,
): Record<string, number> {
  const previousValues = useRef<Record<string, number>>({});
  const animatingKeys = useRef(new Set<string>());
  const previousFrameTime = useRef(0);
  const [, requestRender] = useState(0);
  const frameTime = typeof performance === "undefined" ? 0 : performance.now();
  const elapsed = previousFrameTime.current
    ? Math.min(64, frameTime - previousFrameTime.current)
    : 0;
  previousFrameTime.current = frameTime;
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const values: Record<string, number> = {};
  for (const key in targets) {
    const target = targets[key]!;
    const previous = previousValues.current[key];
    const distance = previous === undefined ? 0 : Math.abs(target - previous);
    if (distance > threshold) animatingKeys.current.add(key);
    if (
      reduceMotion ||
      previous === undefined ||
      !animatingKeys.current.has(key) ||
      distance < threshold * 0.04
    ) {
      animatingKeys.current.delete(key);
      values[key] = target;
    } else values[key] = previous + (target - previous) * (1 - Math.exp(-elapsed / 110));
  }
  previousValues.current = values;
  const animating = animatingKeys.current.size > 0;
  useEffect(() => {
    if (!animating) return;
    const frame = requestAnimationFrame(() => requestRender((value) => value + 1));
    return () => cancelAnimationFrame(frame);
  });
  return values;
}
function StatusIcon({ status }: { status: TimelineRow_schedule["status"] }) {
  if (status === "done")
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M3 7.4 5.7 10 11 4.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (status === "running")
    return (
      <svg
        className="ui-pvac__spin"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="7"
          cy="7"
          r="5"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        <path
          d="M7 2a5 5 0 0 1 5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle
        cx="7"
        cy="7"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />
    </svg>
  );
}
function PlanVsActual_index({
  steps,
  now,
  task,
  formatTime = formatDuration,
  formatCost = formatMoney,
  title = "Plan vs actual",
  className,
}: PlanVsActualProps) {
  const titleId = useId();
  const [focusedId, setFocusedId] = useState<string | undefined | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const currentTime = finiteNumber(now) ?? 0;
  const normalizedSteps = steps.map(normalizeStep);
  const schedule = buildSchedule(normalizedSteps, currentTime);
  const plannedFinish = Math.max(0, ...schedule.map((row) => row.plannedEnd));
  const actualFinish = Math.max(0, ...schedule.map((row) => row.actualEnd));
  const finished =
    schedule.filter((row) => row.status === "done").length === schedule.length;
  const paddedRange = Math.max(plannedFinish, actualFinish, currentTime) * 1.22;
  let tickInterval = Math.max(plannedFinish, actualFinish) > 240000 ? 60000 : 30000;
  for (const interval of TICK_INTERVALS)
    if (interval > tickInterval && paddedRange / tickInterval > 10)
      tickInterval = interval;
  const range = Math.ceil(paddedRange / tickInterval) * tickInterval || tickInterval;
  const ticks = Array.from(
    { length: Math.floor(range / tickInterval) },
    (_, index) => (index + 1) * tickInterval,
  ).filter((tick) => tick < range);
  const [trackWidth, setTrackWidth] = useState(0);
  useLayoutEffect(() => {
    const track = bodyRef.current?.querySelector(".ui-pvac__track");
    if (!track) return;
    const measure = () => setTrackWidth(track.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [normalizedSteps.length > 0]);
  const targets: Record<string, number> = { eta: actualFinish };
  for (const row of schedule) {
    targets[`${row.step.id}:s`] = row.actualStart;
    targets[`${row.step.id}:e`] = row.actualEnd;
  }
  const motion = useForecastMotion(targets, range * 0.012);
  const rows = schedule.map((row) =>
    row.status === "waiting"
      ? {
          ...row,
          actualStart: motion[`${row.step.id}:s`]!,
          actualEnd: motion[`${row.step.id}:e`]!,
        }
      : row,
  );
  const rowsById = new Map(rows.map((row) => [row.step.id, row]));
  const animatedFinish = motion.eta!;
  const difference = actualFinish - plannedFinish;
  const hasCost = normalizedSteps.some(
    (step) => step.cost !== undefined || step.planCost !== undefined,
  );
  const totalCost = normalizedSteps.reduce((total, step) => total + (step.cost ?? 0), 0);
  const plannedCost = normalizedSteps.reduce(
    (total, step) => total + (step.planCost ?? 0),
    0,
  );
  const focusedRow = focusedId ? rowsById.get(focusedId) : undefined;
  const links: [TimelineRow_schedule, TimelineRow_schedule][] = focusedRow
    ? [
        ...(focusedRow.step.deps ?? []).flatMap((id) => {
          const dependency = rowsById.get(id);
          return dependency
            ? [[dependency, focusedRow] as [TimelineRow_schedule, TimelineRow_schedule]]
            : [];
        }),
        ...rows
          .filter((row) => row.step.deps?.includes(focusedRow.step.id!))
          .map(
            (row) => [focusedRow, row] as [TimelineRow_schedule, TimelineRow_schedule],
          ),
      ]
    : [];
  const connectedIds = new Set(links.flatMap(([from, to]) => [from.step.id, to.step.id]));
  const verdict =
    Math.abs(difference) < SIGNIFICANT_DELAY_MS
      ? "on"
      : difference > 0
        ? "late"
        : "early";
  const verdictLabel =
    Math.abs(difference) < SIGNIFICANT_DELAY_MS
      ? "On plan"
      : difference > 0
        ? `${formatDifference(difference)} ${finished ? "late" : "behind"}`
        : `${formatDifference(difference).slice(1)} ${finished ? "early" : "ahead"}`;
  return (
    <div
      className={["ui-pvac", className].filter(Boolean).join(" ")}
      style={
        {
          "--ui-pvac-range": range,
          "--ui-pvac-rows": rows.length,
        } as TimelineStyle
      }
    >
      <header className="ui-pvac__head">
        <span className="ui-pvac__mark">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1.5" y="2.5" width="7" height="3" rx="1.5" fill="currentColor" />
            <rect
              x="5"
              y="6.5"
              width="8"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.6"
            />
            <rect
              x="8.5"
              y="10.5"
              width="6"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.32"
            />
          </svg>
        </span>
        <span className="ui-pvac__title" id={titleId} dir="auto" title={title}>
          {title}
        </span>
        {task && (
          <span className="ui-pvac__task" dir="auto" title={task}>
            {task}
          </span>
        )}
        <dl className="ui-pvac__stats">
          <div
            className="ui-pvac__stat"
            data-over={!finished && currentTime > plannedFinish ? "" : undefined}
          >
            <dt>Time</dt>
            <dd>
              <b className="ui-pvac__live" data-live={finished ? undefined : ""}>
                {formatTime(finished ? actualFinish : currentTime)}
              </b>
              <span> / {formatTime(plannedFinish)}</span>
            </dd>
          </div>
          {hasCost && (
            <div
              className="ui-pvac__stat"
              data-over={plannedCost > 0 && totalCost > plannedCost ? "" : undefined}
            >
              <dt>Cost</dt>
              <dd>
                <b className="ui-pvac__live" data-live={finished ? undefined : ""}>
                  {formatCost(totalCost)}
                </b>
                {plannedCost > 0 && <span> / {formatCost(plannedCost)}</span>}
              </dd>
            </div>
          )}
        </dl>
        <span className="ui-pvac__verdict" data-state={verdict}>
          {verdictLabel}
        </span>
      </header>
      <div
        ref={bodyRef}
        className="ui-pvac__body"
        role="list"
        aria-labelledby={titleId}
        data-focus={focusedId ? "" : undefined}
      >
        <div className="ui-pvac__layer" aria-hidden="true">
          {ticks.map((tick) => (
            <span
              className="ui-pvac__tick"
              data-flip={
                trackWidth > 0 &&
                (tick / range) * trackWidth + 6 + formatTime(tick).length * 7 > trackWidth
                  ? ""
                  : undefined
              }
              style={{ "--v": tick } as TimelineStyle}
              key={tick}
            >
              <span>{formatTime(tick)}</span>
            </span>
          ))}
          {Math.abs(difference) >= SIGNIFICANT_DELAY_MS && (
            <span
              className="ui-pvac__gap"
              data-state={difference > 0 ? "late" : "early"}
              style={barStyle(
                Math.min(plannedFinish, animatedFinish),
                Math.max(plannedFinish, animatedFinish),
              )}
            />
          )}
          <span
            className="ui-pvac__finish"
            data-kind="plan"
            data-side={difference < 0 ? "right" : "left"}
            style={{ "--v": plannedFinish } as TimelineStyle}
          >
            <span>Plan {formatTime(plannedFinish)}</span>
          </span>
          <span
            className="ui-pvac__finish"
            data-kind="eta"
            data-side={difference < 0 ? "left" : "right"}
            data-state={verdict}
            data-hidden={Math.abs(difference) < SIGNIFICANT_DELAY_MS ? "" : undefined}
            style={{ "--v": animatedFinish } as TimelineStyle}
          >
            <span>
              {finished ? "Done" : "ETA"} {formatTime(actualFinish)}
            </span>
          </span>
          {!finished && (
            <span
              className="ui-pvac__now"
              style={{ "--v": currentTime } as TimelineStyle}
            />
          )}
        </div>
        <div className="ui-pvac__axis" aria-hidden="true">
          Step
        </div>
        {rows.map((row) => (
          <TimelineRow_TimelineRow
            row={row}
            now={row.status === "running" ? currentTime : 0}
            wait={
              row.status === "waiting"
                ? Math.max(0, Math.round((row.actualStart - currentTime) / 1000))
                : 0
            }
            range={range}
            trackWidth={trackWidth}
            focused={focusedId === row.step.id}
            highlighted={focusedId === row.step.id || connectedIds.has(row.step.id)}
            formatTime={formatTime}
            formatCost={formatCost}
            setFocus={setFocusedId}
            key={row.step.id}
          />
        ))}
        <div className="ui-pvac__links" aria-hidden="true">
          {links.map(([from, to]) => (
            <span
              className="ui-pvac__link"
              style={
                {
                  "--a0": from.actualStart,
                  "--a1": from.actualEnd,
                  "--b0": Math.max(from.actualEnd, to.actualStart),
                  "--from": from.index,
                  "--to": to.index,
                } as TimelineStyle
              }
              key={`${from.step.id}-${to.step.id}`}
            />
          ))}
        </div>
        <div className="ui-pvac__foot" aria-hidden="true">
          <span className="ui-pvac__key" data-kind="plan">
            Plan
          </span>
          <span className="ui-pvac__key" data-kind="actual">
            Actual
          </span>
          <span className="ui-pvac__key" data-kind="over">
            Over plan
          </span>
        </div>
      </div>
    </div>
  );
}
const SIGNIFICANT_DELAY_MS = 1500;
const TICK_INTERVALS = [
  30000, 60000, 120000, 300000, 600000, 900000, 1800000, 3600000, 7200000, 10800000,
  21600000, 43200000, 86400000, 172800000, 604800000,
];
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const TimelineRow_TimelineRow = memo(
  function TimelineRow({
    row,
    now,
    wait,
    range,
    trackWidth,
    focused,
    highlighted,
    formatTime,
    formatCost,
    setFocus,
  }: RowProps) {
    const { step, status } = row;
    const plannedDuration = step.plan;
    const elapsed =
      status === "done"
        ? row.actualEnd - row.actualStart
        : status === "running"
          ? now - row.actualStart
          : 0;
    const overdue =
      status !== "waiting" && elapsed - plannedDuration >= SIGNIFICANT_DELAY_MS;
    const difference = status === "done" || overdue ? elapsed - plannedDuration : 0;
    const actualEnd = status === "running" ? now : row.actualEnd;
    const showDifference =
      (status === "done" || overdue) && Math.abs(difference) >= SIGNIFICANT_DELAY_MS;
    const showCost = step.cost !== undefined && focused;
    const labelWidth =
      (status === "waiting"
        ? formatTime(plannedDuration)
        : formatTime(elapsed) +
          (showDifference ? formatDifference(difference) : "") +
          (showCost ? formatCost(step.cost!) : "")
      ).length *
        7 +
      8 +
      (showDifference ? 13 : 0) +
      (showCost ? 10 : 0);
    const firstStart = Math.min(row.actualStart, row.plannedStart);
    const lastEnd = Math.max(row.actualEnd, row.plannedEnd);
    let labelSide = lastEnd / range > 0.8 ? "before" : "after";
    if (trackWidth > 0) {
      const afterSpace = trackWidth - (lastEnd / range) * trackWidth - 3;
      const beforeSpace = (firstStart / range) * trackWidth - 3;
      if (labelSide === "after" && labelWidth > afterSpace && beforeSpace > afterSpace)
        labelSide = "before";
      else if (
        labelSide === "before" &&
        labelWidth > beforeSpace &&
        afterSpace > beforeSpace
      )
        labelSide = "after";
    }
    const focus = () => setFocus(() => step.id);
    const blur = () => setFocus((current) => (current === step.id ? null : current));
    return (
      <div
        className="ui-pvac__row"
        role="listitem"
        tabIndex={0}
        data-status={status}
        data-lit={highlighted ? "" : undefined}
        data-focus={focused ? "" : undefined}
        onPointerEnter={focus}
        onPointerLeave={blur}
        onFocus={focus}
        onBlur={blur}
        aria-label={`${step.title}: ${status === "done" ? `took ${formatTime(elapsed)}, planned ${formatTime(plannedDuration)}` : status === "running" ? `running for ${formatTime(elapsed)} of ${formatTime(plannedDuration)} planned` : `starts in about ${formatTime(wait * 1000)}`}${step.cost === undefined ? "" : `, ${formatCost(step.cost)}`}`}
      >
        <span className="ui-pvac__name">
          <span className="ui-pvac__state" data-status={status}>
            <StatusIcon status={status} />
          </span>
          {step.icon && <span className="ui-pvac__icon">{step.icon}</span>}
          <span className="ui-pvac__label" dir="auto" title={step.title}>
            {step.title}
          </span>
        </span>
        <span className="ui-pvac__track">
          {status === "waiting" ? (
            <span
              className="ui-pvac__bar"
              data-kind="forecast"
              style={barStyle(row.actualStart, row.actualEnd)}
            />
          ) : (
            <>
              {status === "running" && !overdue && (
                <span
                  className="ui-pvac__bar"
                  data-kind="forecast"
                  data-rest=""
                  style={barStyle(now, row.actualEnd)}
                />
              )}
              <span
                className="ui-pvac__bar"
                data-kind="actual"
                data-status={status}
                data-over={overdue ? "" : undefined}
                style={barStyle(row.actualStart, actualEnd)}
              />
              {overdue && (
                <span
                  className="ui-pvac__bar"
                  data-kind="over"
                  data-status={status}
                  style={barStyle(row.actualStart + plannedDuration, actualEnd)}
                />
              )}
            </>
          )}
          <span
            className="ui-pvac__ghost"
            style={barStyle(row.plannedStart, row.plannedEnd)}
          />
          <span
            className="ui-pvac__tag"
            data-side={labelSide}
            data-status={status}
            style={
              {
                "--s": labelSide === "after" ? lastEnd : firstStart,
                "--tw": labelWidth,
              } as TimelineStyle
            }
          >
            {status === "waiting" ? (
              formatTime(plannedDuration)
            ) : (
              <>
                <span className="ui-pvac__took">{formatTime(elapsed)}</span>
                {showDifference && (
                  <span
                    className="ui-pvac__diff"
                    data-late={difference > 0 ? "" : undefined}
                  >
                    {formatDifference(difference)}
                  </span>
                )}
              </>
            )}
            {showCost && <span className="ui-pvac__cost">{formatCost(step.cost!)}</span>}
          </span>
        </span>
      </div>
    );
  },
  (before, after) => {
    const previous = before.row;
    const next = after.row;
    return (
      before.now === after.now &&
      before.wait === after.wait &&
      before.range === after.range &&
      before.trackWidth === after.trackWidth &&
      before.focused === after.focused &&
      before.highlighted === after.highlighted &&
      before.formatTime === after.formatTime &&
      before.formatCost === after.formatCost &&
      previous.status === next.status &&
      previous.actualStart === next.actualStart &&
      previous.actualEnd === next.actualEnd &&
      previous.plannedStart === next.plannedStart &&
      previous.plannedEnd === next.plannedEnd &&
      previous.step.id === next.step.id &&
      previous.step.title === next.step.title &&
      previous.step.icon === next.step.icon &&
      previous.step.cost === next.step.cost &&
      previous.step.plan === next.step.plan
    );
  },
);
export { PlanVsActual_index as PlanVsActual };
export type { PlanStep };
export type { PlanVsActualProps };
