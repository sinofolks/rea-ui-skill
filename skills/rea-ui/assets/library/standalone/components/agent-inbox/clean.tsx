"use client";

import "./AgentInbox.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useEffect,
  useState,
  useId,
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
} from "react";
interface AgentTask {
  id?: string;
  title?: string;
  description?: string;
  agent?: string;
  status?: string;
  startedAt?: unknown;
  tools?: number;
  sources?: number;
  steps?: {
    label?: string;
    time?: string;
    [field: string]: unknown;
  }[];
  elapsed?: number;
  [field: string]: unknown;
}
type AgentInboxView = "board" | "list";
interface AgentInboxProps {
  tasks: AgentTask[];
  onApprove?: (task: AgentTask) => void;
  onReject?: (task: AgentTask) => void;
  onRetry?: (task: AgentTask) => void;
  onOpen?: (task: AgentTask) => void;
  title?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  view?: AgentInboxView;
  defaultView?: AgentInboxView;
  onViewChange?: (view: AgentInboxView) => void;
  lanes?: readonly string[];
  highlight?: string;
  className?: string;
}
type InboxLane = (typeof inboxLanes)[number]["id"];
type InboxStatus = "waiting" | "running" | "done" | "failed";
interface NormalizedTask extends AgentTask {
  key: string;
  src: AgentTask;
  title: string;
  status: InboxStatus;
  steps: {
    label: string;
    time?: string;
  }[];
}
type TaskOverrides = Record<string, Partial<AgentTask>>;
type InboxState = ReturnType<typeof useAgentInbox>;
interface InboxTaskCardProps
  extends Pick<
    AgentInboxProps,
    "onApprove" | "onReject" | "onRetry" | "onOpen" | "highlight"
  > {
  task: NormalizedTask;
  inbox: InboxState;
  prefix: string;
}
function AgentInbox(props: AgentInboxProps) {
  return <InboxView {...props} clean />;
}
function laneForStatus(status: InboxStatus): InboxLane {
  return status === "waiting" || status === "failed"
    ? "needs"
    : status === "running"
      ? "running"
      : "done";
}
function isLiveStatus(status: InboxStatus): boolean {
  return status === "running" || status === "waiting";
}
function normalizeStatus(status: string | undefined): InboxStatus {
  return status === "waiting" || status === "done" || status === "failed"
    ? status
    : "running";
}
function readTimestamp(value: unknown): number {
  return value instanceof Date
    ? value.getTime()
    : typeof value === "number"
      ? value
      : typeof value === "string"
        ? Date.parse(value)
        : NaN;
}
function nonnegativeNumber(value: number | undefined): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : undefined;
}
function formatElapsed(milliseconds: number): string {
  if (!Number.isFinite(milliseconds)) return "—";
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const pad = (value: number) => String(value).padStart(2, "0");
  if (minutes < 60) return `${minutes}m ${pad(seconds % 60)}s`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? `${hours}h ${pad(minutes % 60)}m`
    : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function normalizeTasks(tasks: AgentTask[], overrides: TaskOverrides): NormalizedTask[] {
  const occurrences = new Map<string, number>();
  return (Array.isArray(tasks) ? tasks : [])
    .filter((task) => !!task && typeof task === "object")
    .map((source) => {
      const id = String(source.id ?? "");
      const duplicate = occurrences.get(id) ?? 0;
      occurrences.set(id, duplicate + 1);
      const key = duplicate ? `${id}#${duplicate}` : id;
      const task = overrides[key] ? { ...source, ...overrides[key] } : source;
      const steps = (Array.isArray(task.steps) ? task.steps : [])
        .filter(
          (step) =>
            !!step && typeof step === "object" && String(step.label ?? "").trim() !== "",
        )
        .map((step) => ({
          label: String(step.label),
          time: step.time ? String(step.time) : undefined,
        }));
      return {
        ...task,
        key,
        src: source,
        status: normalizeStatus(task.status),
        title: String(task.title ?? "").trim() || "Untitled task",
        steps,
      };
    });
}
function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function useClock(active: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const update = () => setNow(Date.now());
    update();
    listeners.add(update);
    if (!interval)
      interval = window.setInterval(
        () => listeners.forEach((listener) => listener()),
        1000,
      );
    return () => {
      listeners.delete(update);
      if (!listeners.size) {
        window.clearInterval(interval);
        interval = 0;
      }
    };
  }, [active]);
  return now;
}
function ElapsedTime({ since, fixed }: { since: number | undefined; fixed: number }) {
  const now = useClock(since !== undefined);
  return <>{formatElapsed(since === undefined ? fixed : now - since)}</>;
}
function useAgentInbox(
  { tasks, view, defaultView = "board", onViewChange }: AgentInboxProps,
  prefix: string,
) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [localView, setLocalView] = useState(defaultView);
  const currentView = view ?? localView;
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<TaskOverrides>({});
  const normalizedTasks = normalizeTasks(tasks, overrides);
  const firstSeenRef = useRef<Record<string, number>>({});
  for (const task of normalizedTasks) firstSeenRef.current[task.key] ??= Date.now();
  function startedAt(task: NormalizedTask) {
    if (!isLiveStatus(task.status)) return undefined;
    const timestamp = readTimestamp(task.startedAt);
    return Number.isFinite(timestamp)
      ? timestamp
      : firstSeenRef.current[task.key] - (nonnegativeNumber(task.elapsed) ?? 0);
  }
  const [taskLanes, setTaskLanes] = useState<Record<string, InboxLane>>(() =>
    Object.fromEntries(
      normalizedTasks.map((task) => [task.key, laneForStatus(task.status)]),
    ),
  );
  const laneSignature = normalizedTasks
    .map((task) => `${task.key}:${laneForStatus(task.status)}`)
    .join("|");
  useEffect(() => {
    if (
      !normalizedTasks.some((task) => taskLanes[task.key] !== laneForStatus(task.status))
    )
      return;
    const timeout = window.setTimeout(
      () =>
        setTaskLanes(
          Object.fromEntries(
            normalizedTasks.map((task) => [task.key, laneForStatus(task.status)]),
          ),
        ),
      reducedMotion() ? 0 : 900,
    );
    return () => window.clearTimeout(timeout);
  }, [laneSignature]);
  function laneForTask(task: NormalizedTask) {
    return taskLanes[task.key] ?? laneForStatus(task.status);
  }
  const cardRefs = useRef(new Map<string, HTMLLIElement>());
  const oldBoundsRef = useRef(new Map<string, DOMRect>());
  const layoutSignature = JSON.stringify(taskLanes) + currentView;
  const previousLayoutRef = useRef(layoutSignature);
  if (rootRef.current && previousLayoutRef.current !== layoutSignature) {
    oldBoundsRef.current = new Map(
      [...cardRefs.current].map(([key, card]) => [key, card.getBoundingClientRect()]),
    );
  }
  useLayoutEffect(() => {
    if (previousLayoutRef.current === layoutSignature) return;
    previousLayoutRef.current = layoutSignature;
    if (reducedMotion()) return;
    for (const [key, card] of cardRefs.current) {
      const oldBounds = oldBoundsRef.current.get(key);
      if (!oldBounds) {
        card.animate(
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 380, easing: "cubic-bezier(0.32, 0.72, 0.24, 1)" },
        );
        continue;
      }
      const newBounds = card.getBoundingClientRect();
      const x = oldBounds.left - newBounds.left;
      const y = oldBounds.top - newBounds.top;
      if (Math.abs(x) < 1 && Math.abs(y) < 1) continue;
      card.animate(
        [
          { transform: `translate(${x}px, ${y}px)`, zIndex: 2 },
          { transform: "none", zIndex: 2 },
        ],
        { duration: 560, easing: "cubic-bezier(0.32, 0.72, 0.24, 1)" },
      );
    }
  }, [layoutSignature]);
  function transitionTask(
    task: NormalizedTask,
    status: InboxStatus,
    label: string,
    callback?: (task: AgentTask) => void,
  ) {
    if (callback) {
      callback(task.src);
      return;
    }
    setOverrides((previous) => ({
      ...previous,
      [task.key]: {
        status,
        startedAt: Date.now(),
        steps: [...task.steps, { label, time: "now" }],
      },
    }));
  }
  function toggleTask(key: string) {
    setExpandedKey((current) => (current === key ? null : key));
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !expandedKey) return;
    event.stopPropagation();
    cardRefs.current
      .get(expandedKey)
      ?.querySelector<HTMLButtonElement>(`.${prefix}__card-main`)
      ?.focus({ preventScroll: true });
    setExpandedKey(null);
  }
  function changeView(next: AgentInboxView) {
    setLocalView(next);
    onViewChange?.(next);
  }
  const counts = Object.fromEntries(
    inboxLanes.map((lane) => [
      lane.id,
      normalizedTasks.filter((task) => laneForTask(task) === lane.id).length,
    ]),
  ) as Record<InboxLane, number>;
  const needsCount = normalizedTasks.filter(
    (task) => task.status === "waiting" || task.status === "failed",
  ).length;
  const runningCount = normalizedTasks.filter((task) => task.status === "running").length;
  const announcement = `${needsCount} ${needsCount === 1 ? "needs" : "need"} you, ${runningCount} running`;
  return {
    id,
    rootRef,
    currentView,
    expandedKey,
    normalizedTasks,
    startedAt,
    laneForTask,
    cardRefs,
    transitionTask,
    toggleTask,
    handleKeyDown,
    changeView,
    counts,
    announcement,
  };
}
function InboxTaskCard({
  task,
  inbox,
  prefix,
  onApprove,
  onReject,
  onRetry,
  onOpen,
  highlight,
}: InboxTaskCardProps) {
  const expanded = inbox.expandedKey === task.key;
  const recentSteps = task.steps.slice(-4);
  const elapsed = nonnegativeNumber(task.elapsed);
  const showTime =
    task.status !== "failed" && (task.status !== "done" || elapsed !== undefined);
  const sources = nonnegativeNumber(task.sources);
  const tools = nonnegativeNumber(task.tools);
  const description = typeof task.description === "string" ? task.description.trim() : "";
  const agent = String(task.agent ?? "").trim();
  const detailsId = `${inbox.id}-${encodeURIComponent(task.key)}`;
  const statusLabel =
    task.status === "done"
      ? showTime
        ? "Done in"
        : statusLabels.done
      : task.status === "failed"
        ? statusLabels.failed
        : `${statusLabels[task.status]} ·`;
  return (
    <li
      data-id={task.id}
      className={`${prefix}__card`}
      data-faded={highlight && task.id !== highlight ? "" : undefined}
      data-status={task.status}
      data-open={expanded ? "" : undefined}
      ref={(element) => {
        if (element) inbox.cardRefs.current.set(task.key, element);
        else inbox.cardRefs.current.delete(task.key);
      }}
    >
      <button
        type="button"
        className={`${prefix}__card-main`}
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={() => inbox.toggleTask(task.key)}
      >
        <span className={`${prefix}__title-row`}>
          <span className={`${prefix}__spark`}>
            <SparkIcon />
          </span>
          <span className={`${prefix}__title`} dir="auto" title={task.title}>
            {task.title}
          </span>
        </span>
        {description && (
          <span className={`${prefix}__desc`} dir="auto">
            {description}
          </span>
        )}
        <span className={`${prefix}__foot`}>
          <span
            className={`${prefix}__state`}
            data-status={task.status}
            data-bare={showTime ? undefined : ""}
          >
            <StatusIcon status={task.status} prefix={prefix} />
            <span className={`${prefix}__state-word`}>{statusLabel}</span>
            {showTime && (
              <span className={`${prefix}__time`}>
                <ElapsedTime since={inbox.startedAt(task)} fixed={elapsed ?? 0} />
              </span>
            )}
          </span>
          <span className={`${prefix}__meta`}>
            {sources !== undefined && (
              <span title={`Sources read: ${numberFormat.format(sources)}`}>
                <SearchIcon />
                {compactFormat.format(sources)}
              </span>
            )}
            {tools !== undefined && (
              <span title={`Tool calls: ${numberFormat.format(tools)}`}>
                <ToolIcon />
                {compactFormat.format(tools)}
              </span>
            )}
          </span>
        </span>
      </button>
      <div
        id={detailsId}
        className={`${prefix}__fold`}
        data-open={expanded ? "" : undefined}
        inert={!expanded}
      >
        <div className={`${prefix}__clip`}>
          <div className={`${prefix}__more`}>
            {agent && (
              <div className={`${prefix}__agent`} dir="auto">
                {agent}
              </div>
            )}
            {recentSteps.length > 0 && (
              <ol className={`${prefix}__steps`}>
                {recentSteps.map((step, index) => (
                  <li
                    data-last={index === recentSteps.length - 1 ? "" : undefined}
                    key={index}
                  >
                    <span dir="auto">{step.label}</span>
                    {step.time && <time dir="auto">{step.time}</time>}
                  </li>
                ))}
              </ol>
            )}
            <div className={`${prefix}__actions`}>
              {task.status === "waiting" && (
                <>
                  <button
                    type="button"
                    className={`${prefix}__btn`}
                    onClick={() =>
                      inbox.transitionTask(
                        task,
                        "failed",
                        "You rejected the request",
                        onReject,
                      )
                    }
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className={`${prefix}__btn ${prefix}__btn--primary`}
                    onClick={() =>
                      inbox.transitionTask(
                        task,
                        "running",
                        "You approved – continuing",
                        onApprove,
                      )
                    }
                  >
                    Approve
                  </button>
                </>
              )}
              {task.status === "failed" && (
                <button
                  type="button"
                  className={`${prefix}__btn ${prefix}__btn--primary`}
                  onClick={() =>
                    inbox.transitionTask(task, "running", "Retrying", onRetry)
                  }
                >
                  Retry
                </button>
              )}
              {(task.status === "running" || task.status === "done") && onOpen && (
                <button
                  type="button"
                  className={`${prefix}__btn`}
                  onClick={() => onOpen(task)}
                >
                  Open
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
function InboxView({
  clean = false,
  ...props
}: AgentInboxProps & {
  clean?: boolean;
}) {
  const {
    title = "Agent inbox",
    action,
    view,
    onViewChange,
    lanes,
    className,
    highlight,
    onApprove,
    onReject,
    onRetry,
    onOpen,
  } = props;
  const prefix = clean ? "ui-aic" : "ui-ai";
  const inbox = useAgentInbox(props, prefix);
  const viewControls = (view === undefined || onViewChange) && (
    <div className={`${prefix}__views`} role="radiogroup" aria-label="Layout">
      {(["board", "list"] as const).map((layout) => (
        <button
          type="button"
          role="radio"
          aria-checked={inbox.currentView === layout}
          className={`${prefix}__view`}
          onClick={() => inbox.changeView(layout)}
          key={layout}
        >
          {layout === "board" ? <BoardIcon /> : <ListIcon />}
          {layout === "board" ? "Board" : "List"}
        </button>
      ))}
    </div>
  );
  return (
    <div
      ref={inbox.rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-view={inbox.currentView}
      onKeyDown={inbox.handleKeyDown}
    >
      <div className={`${prefix}__bar`}>
        <span className={`${prefix}__heading`}>
          <span className={`${prefix}__crumb`}>Agents</span>
          <span className={`${prefix}__slash`} aria-hidden="true">
            /
          </span>
          <span className={`${prefix}__heading-title`} title={title}>
            {title}
          </span>
        </span>
        {clean ? (
          viewControls
        ) : (
          <div className={`${prefix}__tools`}>
            {action && (
              <button
                type="button"
                className={`${prefix}__action`}
                aria-label={action.label}
                title={action.label}
                onClick={action.onClick}
              >
                <PlusIcon />
                <span className={`${prefix}__action-label`}>{action.label}</span>
              </button>
            )}
            {viewControls}
          </div>
        )}
      </div>
      <div className={`${prefix}__lanes`}>
        {inboxLanes
          .filter((lane) => !lanes || lanes.includes(lane.id))
          .map((lane) => (
            <section className={`${prefix}__lane`} aria-label={lane.label} key={lane.id}>
              <header className={`${prefix}__lane-head`}>
                <span className={`${prefix}__lane-spark`} aria-hidden="true">
                  <SparkIcon />
                </span>
                <span className={`${prefix}__lane-name`}>{lane.label}</span>
                <span
                  className={`${prefix}__count`}
                  title={
                    inbox.counts[lane.id] > 999
                      ? numberFormat.format(inbox.counts[lane.id])
                      : undefined
                  }
                >
                  {inbox.counts[lane.id] > 999 ? "999+" : String(inbox.counts[lane.id])}
                </span>
              </header>
              <ul className={`${prefix}__cards`}>
                {inbox.normalizedTasks
                  .filter((task) => inbox.laneForTask(task) === lane.id)
                  .map((task) => (
                    <InboxTaskCard
                      task={task}
                      inbox={inbox}
                      prefix={prefix}
                      highlight={highlight}
                      onApprove={onApprove}
                      onReject={onReject}
                      onRetry={onRetry}
                      onOpen={onOpen}
                      key={task.key}
                    />
                  ))}
                {inbox.counts[lane.id] === 0 && (
                  <li className={`${prefix}__empty`}>Nothing here</li>
                )}
              </ul>
            </section>
          ))}
      </div>
      <span className={`${prefix}__sr`} aria-live="polite">
        {inbox.announcement}
      </span>
    </div>
  );
}
const inboxLanes = [
  { id: "needs", label: "Needs you" },
  { id: "running", label: "Running" },
  { id: "done", label: "Done" },
] as const;
const statusLabels = {
  waiting: "Waiting for you",
  running: "Running",
  done: "Done",
  failed: "Failed",
};
const compactFormat = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const numberFormat = new Intl.NumberFormat("en");
const strokeProps = {
  fill: `none`,
  stroke: `currentColor`,
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const SparkIcon = () => (
  <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <path
      d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
      fill={`currentColor`}
    />
    <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
  </svg>
);
const StatusIcon = ({ status, prefix }: { status: InboxStatus; prefix: string }) => (
  <span className={`${prefix}__state-icon`} data-status={status} aria-hidden={`true`}>
    {status === `running` && (
      <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
        <circle
          cx={`6`}
          cy={`6`}
          r={`4.6`}
          fill={`none`}
          stroke={`currentColor`}
          strokeOpacity={`0.25`}
          strokeWidth={`1.6`}
        />
        <path
          d={`M6 1.4a4.6 4.6 0 0 1 4.6 4.6`}
          fill={`none`}
          stroke={`currentColor`}
          strokeWidth={`1.6`}
          strokeLinecap={`round`}
        />
      </svg>
    )}
    {status === `waiting` && (
      <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
        <path d={`M6 1.6 11 10.2H1L6 1.6Z`} fill={`currentColor`} />
      </svg>
    )}
    {status === `done` && (
      <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
        <circle cx={`6`} cy={`6`} r={`3.4`} fill={`currentColor`} />
      </svg>
    )}
    {status === `failed` && (
      <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
        <circle cx={`6`} cy={`6`} r={`4.8`} fill={`currentColor`} />
        <path
          d={`M6 3.6v2.8M6 8.3v.1`}
          stroke={`#fff`}
          strokeWidth={`1.5`}
          strokeLinecap={`round`}
        />
      </svg>
    )}
  </span>
);
const ToolIcon = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
    <path
      d={`M7.6 1.6a2.6 2.6 0 0 0-2.4 3.5L1.7 8.6a1.1 1.1 0 0 0 1.6 1.6l3.5-3.5a2.6 2.6 0 0 0 3.5-2.4l-1.5 1.1-1.5-.4-.4-1.5 1.1-1.5c-.1 0-.3-.4-.4-.4Z`}
      {...strokeProps}
      strokeWidth={1.2}
    />
  </svg>
);
const SearchIcon = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
    <circle cx={`5.2`} cy={`5.2`} r={`3.3`} {...strokeProps} strokeWidth={1.2} />
    <path d={`m7.7 7.7 2.6 2.6`} {...strokeProps} strokeWidth={1.2} />
  </svg>
);
const BoardIcon = () => (
  <svg width={`13`} height={`13`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <rect
      x={`1.8`}
      y={`2.2`}
      width={`3.2`}
      height={`9.6`}
      rx={`1`}
      {...strokeProps}
      strokeWidth={1.2}
    />
    <rect
      x={`8.9`}
      y={`2.2`}
      width={`3.2`}
      height={`6.4`}
      rx={`1`}
      {...strokeProps}
      strokeWidth={1.2}
    />
  </svg>
);
const ListIcon = () => (
  <svg width={`13`} height={`13`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <path d={`M2.2 3.6h9.6M2.2 7h9.6M2.2 10.4h9.6`} {...strokeProps} strokeWidth={1.2} />
  </svg>
);
const PlusIcon = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
    <path d={`M6 2.2v7.6M2.2 6h7.6`} {...strokeProps} strokeWidth={1.5} />
  </svg>
);
const listeners = new Set<() => void>();
let interval = 0;
export { AgentInbox };
export type { AgentInboxProps };
export type { AgentInboxView };
export type { AgentTask };
