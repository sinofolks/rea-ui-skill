"use client";

import "./AgentTrail.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  useEffect,
  useId,
} from "react";
type TrailState = "done" | "running" | "pending" | "waiting" | "failed";
interface TrailSubstep {
  id?: string;
  title?: unknown;
  state?: string;
  detail?: string;
  [field: string]: unknown;
}
interface TrailStep {
  id?: string;
  title?: unknown;
  state?: string;
  duration?: string | number;
  startedAt?: number;
  gate?: boolean;
  status?: string;
  substeps?: TrailSubstep[];
  [field: string]: unknown;
}
interface AgentTrailLabels {
  title: string;
  running: string;
  approval: string;
  waiting: string;
  failed: string;
  done: string;
  pending: string;
  empty: string;
  untitled: string;
  earlier: string;
  more: string;
  fewer: string;
  [field: string]: unknown;
}
interface AgentTrailProps {
  steps: TrailStep[];
  title?: string;
  expanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  labels?: Partial<AgentTrailLabels>;
  className?: string;
}
interface NormalizedTrailStep extends TrailStep {
  id: string;
  title: string;
  state: TrailState;
}
interface TrailGeometry {
  row: number;
  sub: number;
}
type SparkStyle = CSSProperties & {
  "--len"?: number;
  "--tail"?: number;
  "--k"?: number;
};
interface TrailRowProps {
  step: NormalizedTrailStep;
  substeps: TrailSubstep[];
  open: boolean;
  linkIn?: "on" | "off";
  linkOut?: "on" | "off";
  afterBranch: boolean;
  labels: AgentTrailLabels;
  now: number;
  geometry: TrailGeometry;
  panelId: string;
  onToggle: () => void;
  prefix: string;
}
function AgentTrail(props: AgentTrailProps) {
  return <AgentTrailView {...props} clean={false} />;
}
function formatDuration(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return "";
  const seconds = Math.round(value / 1000);
  if (seconds < 1) return "<1s";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return seconds % 60 ? `${minutes}m ${seconds % 60}s` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return minutes % 60 ? `${hours}h ${minutes % 60}m` : `${hours}h`;
  const days = Math.floor(hours / 24);
  return hours % 24 ? `${days}d ${hours % 24}h` : `${days}d`;
}
function truncateDetail(value: string, limit = 22): string {
  const characters = [...value];
  if (characters.length <= limit) return value;
  const tail = Math.ceil(limit * 0.62);
  return `${characters.slice(0, limit - tail - 1).join("")}…${characters.slice(-tail).join("")}`;
}
function normalizeSteps(steps: TrailStep[]): NormalizedTrailStep[] {
  return (Array.isArray(steps) ? steps : [])
    .filter((step) => Boolean(step) && typeof step === "object" && Boolean(step.id))
    .map((step) => ({
      ...step,
      id: step.id!,
      title: String(step.title ?? ""),
      state: states.includes(step.state ?? "") ? (step.state as TrailState) : "pending",
    }));
}
function getSubsteps(step: TrailStep): TrailSubstep[] {
  return Array.isArray(step.substeps)
    ? step.substeps.filter((substep) => Boolean(substep) && typeof substep === "object")
    : [];
}
function substepWindow(substeps: TrailSubstep[], running: boolean, showAll: boolean) {
  const runningIndex = running
    ? substeps.findIndex((substep) => substep.state === "running")
    : -1;
  const foldable = substeps.length > 6;
  const anchor = runningIndex >= 0 ? runningIndex : substeps.length - 1;
  const end =
    foldable && !showAll
      ? Math.max(Math.min(substeps.length, anchor + 2), 5)
      : substeps.length;
  const start = foldable && !showAll ? end - 5 : 0;
  const activeRow =
    runningIndex >= start && runningIndex < end
      ? runningIndex - start + Number(foldable)
      : -1;
  return {
    foldable,
    start,
    end,
    visible: substeps.slice(start, end),
    remaining: substeps.length - end,
    activeRow,
  };
}
function TrailSpark({
  index,
  geometry,
  prefix,
}: {
  index: number;
  geometry: TrailGeometry;
  prefix: string;
}) {
  const endY = geometry.row / 2 - 8 + 2 + geometry.sub / 2 + geometry.sub * index;
  const path = `M9 0 C9 8 21 6 21 14 L21 ${endY}`;
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(() => Math.round(19 + endY - 14));
  useLayoutEffect(() => {
    const measured = pathRef.current?.getTotalLength?.();
    if (measured && Number.isFinite(measured)) setLength(Math.ceil(measured));
  }, [path]);
  const style: SparkStyle = { "--len": length, "--tail": 28 };
  return (
    <svg
      className={`${prefix}__spark`}
      viewBox={`0 0 28 ${endY + 2}`}
      width="28"
      height={endY + 2}
      aria-hidden="true"
      style={style}
    >
      <path ref={pathRef} d={path} className={`${prefix}__probe`} />
      {Array.from({ length: 14 }, (_, slice) => {
        const style: SparkStyle = {
          "--k": (14 - slice) * 2,
          opacity: (slice + 1) / 14,
          strokeDasharray: "2 9999",
        };
        return <path d={path} className={`${prefix}__slice`} style={style} key={slice} />;
      })}
    </svg>
  );
}
function TrailMark({
  state,
  gated,
  prefix,
}: {
  state: TrailState;
  gated: boolean;
  prefix: string;
}) {
  if (state === "done")
    return (
      <span className={`${prefix}__mark`} data-kind="done" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M5 8.3L7 10.2L11 6" pathLength={1} />
        </svg>
      </span>
    );
  if (state === "failed")
    return (
      <span className={`${prefix}__mark`} data-kind="failed" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M6 6L10 10M10 6L6 10" />
        </svg>
      </span>
    );
  if (state === "running")
    return (
      <span className={`${prefix}__mark`} data-kind="running" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16">
          <circle className={`${prefix}__track`} cx="8" cy="8" r="6.25" />
          <circle className={`${prefix}__arc`} cx="8" cy="8" r="6.25" pathLength={40} />
        </svg>
      </span>
    );
  if (gated)
    return (
      <span
        className={`${prefix}__mark`}
        data-kind={state === "waiting" ? "waiting" : "gate"}
        aria-hidden="true"
      >
        <svg viewBox="0 0 16 16" width="16" height="16">
          <circle cx="8" cy="8" r="6.25" />
        </svg>
      </span>
    );
  return <span className={`${prefix}__mark`} data-kind={state} aria-hidden="true" />;
}
function TrailChevron({ prefix }: { prefix: string }) {
  return (
    <svg
      className={`${prefix}__chev`}
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 9C18 9 13.58 15 12 15C10.42 15 6 9 6 9" />
    </svg>
  );
}
function TrailRow({
  step,
  substeps,
  open,
  linkIn,
  linkOut,
  afterBranch,
  labels,
  now,
  geometry,
  panelId,
  onToggle,
  prefix,
}: TrailRowProps) {
  const duration = formatDuration(step.duration);
  const gated =
    Boolean(step.gate) && (step.state === "pending" || step.state === "waiting");
  const runningStatus = step.status || labels.running;
  const elapsed =
    step.state === "running" &&
    typeof step.startedAt === "number" &&
    Number.isFinite(step.startedAt)
      ? formatDuration(Math.max(0, now - step.startedAt))
      : "";
  const stateLabel =
    step.state === "running"
      ? runningStatus
      : step.state === "waiting"
        ? labels.waiting
        : step.state === "failed"
          ? labels.failed
          : step.state === "done"
            ? labels.done
            : gated
              ? labels.approval
              : labels.pending;
  const [showAll, setShowAll] = useState(false);
  const { foldable, start, visible, remaining, activeRow } = substepWindow(
    substeps,
    step.state === "running",
    showAll,
  );
  const title = step.title.trim() || labels.untitled;
  const rowRef = useRef<HTMLButtonElement | HTMLDivElement | null>(null);
  const wasFocused = useRef(false);
  const hasSubsteps = substeps.length > 0;
  useLayoutEffect(() => {
    if (
      wasFocused.current &&
      (document.activeElement === document.body || !document.activeElement)
    )
      rowRef.current?.focus();
  }, [hasSubsteps]);
  const focusHandlers = {
    onFocus: () => {
      wasFocused.current = true;
    },
    onBlur: () => {
      wasFocused.current = false;
    },
  };
  const metadata =
    step.state === "running" ? (
      <span className={`${prefix}__live`}>
        <span className={`${prefix}__status`} dir="auto" title={runningStatus}>
          {runningStatus}
        </span>
        {elapsed ? (
          <span className={`${prefix}__clock`} dir="auto">
            {elapsed}
          </span>
        ) : null}
      </span>
    ) : step.state === "waiting" ? (
      <span className={`${prefix}__badge`} dir="auto" title={labels.waiting}>
        {labels.waiting}
      </span>
    ) : gated ? (
      <span className={`${prefix}__badge`} dir="auto" title={labels.approval}>
        {labels.approval}
      </span>
    ) : step.state === "failed" ? (
      <span className={`${prefix}__fail`} dir="auto">
        {labels.failed}
      </span>
    ) : step.state === "done" && duration ? (
      <span className={`${prefix}__time`} dir="auto">
        {duration}
      </span>
    ) : null;
  const rowContents = (
    <>
      <TrailMark state={step.state} gated={gated} prefix={prefix} />
      <span
        className={`${prefix}__title`}
        dir="auto"
        title={title}
        data-untitled={step.title.trim() ? undefined : ""}
      >
        {title}
      </span>
      {substeps.length ? <TrailChevron prefix={prefix} /> : null}
      <span
        className={`${prefix}__meta`}
        children={metadata}
        key={`${step.state}-${gated}`}
      />
    </>
  );
  const accessibleLabel = `${title} – ${stateLabel}${step.state === "done" && duration ? `, ${duration}` : ""}`;
  return (
    <li
      className={`${prefix}__step`}
      data-state={step.state}
      data-gate={gated || undefined}
      data-open={open || undefined}
      data-in={linkIn}
      data-out={linkOut}
      data-after-branch={afterBranch || undefined}
      aria-current={step.state === "running" ? "step" : undefined}
    >
      {substeps.length ? (
        <button
          ref={(node) => {
            rowRef.current = node;
          }}
          type="button"
          className={`${prefix}__row`}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={accessibleLabel}
          onClick={onToggle}
          {...focusHandlers}
        >
          {rowContents}
        </button>
      ) : (
        <div
          ref={(node) => {
            rowRef.current = node;
          }}
          className={`${prefix}__row`}
          role="group"
          aria-label={accessibleLabel}
          tabIndex={-1}
          {...focusHandlers}
        >
          {rowContents}
        </div>
      )}
      {substeps.length ? (
        <>
          <span className={`${prefix}__wire`} aria-hidden="true">
            <svg className={`${prefix}__bend`} viewBox="0 0 28 14" width="28" height="14">
              <path d="M9 0 C9 8 21 6 21 14" />
            </svg>
            <span className={`${prefix}__spine`} />
            <svg
              className={`${prefix}__bend ${prefix}__bend--out`}
              viewBox="0 0 28 14"
              width="28"
              height="14"
            >
              <path d="M21 0 C21 8 9 6 9 14" />
            </svg>
          </span>
          {open && activeRow >= 0 ? (
            <TrailSpark index={activeRow} geometry={geometry} prefix={prefix} />
          ) : null}
          <div
            className={`${prefix}__subs`}
            id={panelId}
            data-open={open || undefined}
            inert={!open || undefined}
          >
            <ul className={`${prefix}__sublist`}>
              {foldable ? (
                <li className={`${prefix}__sub ${prefix}__sub--fold`}>
                  <button
                    type="button"
                    className={`${prefix}__fold`}
                    aria-expanded={showAll}
                    onClick={() => setShowAll((previous) => !previous)}
                  >
                    <span className={`${prefix}__dot`} aria-hidden="true" />
                    {showAll ? labels.fewer : `+${start} ${labels.earlier}`}
                  </button>
                </li>
              ) : null}
              {visible.map((substep, index) => {
                const absoluteIndex = start + index;
                const state = substep.state ?? "done";
                const title = String(substep.title ?? "")
                  .replace(/\s+/g, " ")
                  .trim();
                return (
                  <li
                    className={`${prefix}__sub`}
                    data-state={state}
                    aria-current={state === "running" ? "step" : undefined}
                    key={substep.id ?? `${absoluteIndex}-${substep.title}`}
                  >
                    <span className={`${prefix}__dot`} aria-hidden="true" />
                    <span
                      className={`${prefix}__subtitle`}
                      dir="auto"
                      title={title || labels.untitled}
                      data-untitled={title ? undefined : ""}
                    >
                      {title || labels.untitled}
                    </span>
                    {substep.detail ? (
                      <span
                        className={`${prefix}__detail`}
                        dir="auto"
                        title={substep.detail}
                      >
                        {truncateDetail(String(substep.detail))}
                      </span>
                    ) : null}
                  </li>
                );
              })}
              {foldable && remaining > 0 && !showAll ? (
                <li className={`${prefix}__sub ${prefix}__sub--fold`}>
                  <button
                    type="button"
                    className={`${prefix}__fold`}
                    aria-expanded={false}
                    onClick={() => setShowAll(true)}
                  >
                    <span className={`${prefix}__dot`} aria-hidden="true" />
                    {`+${remaining} ${labels.more}`}
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </>
      ) : null}
    </li>
  );
}
function useTrailClock(active: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [active]);
  return now;
}
function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setCoarse(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);
  return coarse;
}
function useAgentTrail({ steps, labels, expanded, onExpandedChange }: AgentTrailProps) {
  const text = { ...defaultLabels, ...labels };
  const normalizedSteps = normalizeSteps(steps);
  const id = useId();
  const now = useTrailClock(
    normalizedSteps.some(
      (step) => step.state === "running" && typeof step.startedAt === "number",
    ),
  );
  const coarse = useCoarsePointer();
  const geometry = { row: coarse ? 40 : 32, sub: coarse ? 28 : 24 };
  const [localExpanded, setLocalExpanded] = useState<Record<string, boolean>>({});
  function isExpanded(step: NormalizedTrailStep): boolean {
    if (!getSubsteps(step).length) return false;
    return expanded
      ? expanded.includes(step.id)
      : (localExpanded[step.id] ?? step.state === "running");
  }
  function toggleStep(step: NormalizedTrailStep) {
    const nextOpen = !isExpanded(step);
    if (!expanded) setLocalExpanded((previous) => ({ ...previous, [step.id]: nextOpen }));
    onExpandedChange?.(
      normalizedSteps
        .filter((candidate) =>
          candidate.id === step.id ? nextOpen : isExpanded(candidate),
        )
        .map((candidate) => candidate.id),
    );
  }
  const previousStates = useRef<Map<string, TrailState> | null>(null);
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    const previous = previousStates.current;
    previousStates.current = new Map(
      normalizedSteps.map((step) => [step.id, step.state]),
    );
    if (!previous) return;
    const messages: string[] = [];
    const changedRunningIds: string[] = [];
    for (const step of normalizedSteps) {
      const oldState = previous.get(step.id);
      if (oldState === undefined || oldState === step.state) continue;
      if (step.state === "running" || oldState === "running")
        changedRunningIds.push(step.id);
      if (step.state === "done")
        messages.push(`${step.title}: ${text.done.toLowerCase()}`);
      if (step.state === "waiting")
        messages.push(`${step.title}: ${text.waiting.toLowerCase()}`);
      if (step.state === "failed")
        messages.push(`${step.title}: ${text.failed.toLowerCase()}`);
    }
    if (changedRunningIds.some((stepId) => localExpanded[stepId] !== undefined)) {
      setLocalExpanded((previous) =>
        Object.fromEntries(
          Object.entries(previous).filter(
            ([stepId]) => !changedRunningIds.includes(stepId),
          ),
        ),
      );
    }
    if (messages.length) setAnnouncement(messages.join(". "));
  });
  return {
    text,
    normalizedSteps,
    id,
    now,
    geometry,
    isExpanded,
    toggleStep,
    announcement,
    doneCount: normalizedSteps.filter((step) => step.state === "done").length,
  };
}
function AgentTrailView({
  clean = false,
  ...props
}: AgentTrailProps & {
  clean?: boolean;
}) {
  const { title, className } = props;
  const prefix = clean ? "ui-atrc" : "ui-atr";
  const {
    text,
    normalizedSteps,
    id,
    now,
    geometry,
    isExpanded,
    toggleStep,
    announcement,
    doneCount,
  } = useAgentTrail(props);
  const contents = (
    <>
      {normalizedSteps.length ? null : <p className={`${prefix}__empty`}>{text.empty}</p>}
      <ol
        className={`${prefix}__list`}
        aria-label={title || text.title}
        hidden={!normalizedSteps.length}
      >
        {normalizedSteps.map((step, index) => {
          const previous = normalizedSteps[index - 1];
          const next = normalizedSteps[index + 1];
          const linkIn = previous
            ? previous.state === "done" && step.state !== "pending"
              ? "on"
              : "off"
            : undefined;
          const linkOut = next
            ? step.state === "done" && next.state !== "pending"
              ? "on"
              : "off"
            : undefined;
          return (
            <TrailRow
              step={step}
              substeps={getSubsteps(step)}
              open={isExpanded(step)}
              linkIn={linkIn}
              linkOut={linkOut}
              afterBranch={Boolean(previous) && isExpanded(previous)}
              labels={text}
              now={now}
              geometry={geometry}
              panelId={`${id}-${index}`}
              onToggle={() => toggleStep(step)}
              prefix={prefix}
              key={step.id}
            />
          );
        })}
      </ol>
    </>
  );
  return (
    <>
      <div className={[prefix, className].filter(Boolean).join(" ")}>
        {title ? (
          <div className={`${prefix}__head`}>
            <span className={`${prefix}__task`} dir="auto" title={title}>
              {title}
            </span>
            <span
              className={`${prefix}__count`}
              aria-label={`${doneCount} of ${normalizedSteps.length} steps done`}
            >
              {doneCount}
              {"/"}
              {normalizedSteps.length}
            </span>
          </div>
        ) : null}
        {clean ? contents : <div className={`${prefix}__card`}>{contents}</div>}
        <span className={`${prefix}__sr`} role="status" aria-live="polite">
          {announcement}
        </span>
      </div>
    </>
  );
}
const defaultLabels: AgentTrailLabels = {
  title: "Progress",
  running: "Working",
  approval: "Approval",
  waiting: "Needs you",
  failed: "Failed",
  done: "Done",
  pending: "Up next",
  empty: "No steps yet",
  untitled: "Untitled step",
  earlier: "earlier",
  more: "more",
  fewer: "Show fewer",
};
const states: readonly string[] = ["done", "running", "pending", "waiting", "failed"];
export { AgentTrail };
export type { AgentTrailProps };
export type { TrailStep };
export type { TrailSubstep };
export type { TrailState };
export type { AgentTrailLabels };
