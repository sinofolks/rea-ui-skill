"use client";

import "./AgentMonitor.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
  isValidElement,
  useEffect,
  useId,
  type KeyboardEvent,
  Fragment,
  type CSSProperties,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type AgentRunStep = {
  state?: string;
  kind?: string;
  icon?: ReactNode;
  tool?: string;
  since?: number;
  took?: number;
  detail?: string;
  output?: string;
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
};
interface AgentMonitorProps {
  state?: "idle" | "running" | "waiting" | "paused" | "finished" | "failed" | "cancelled";
  agent?: {
    name: string;
    role?: string;
    mark?: ReactNode;
  };
  steps?: AgentRunStep[];
  current?: {
    label: string;
    kind?: string;
    icon?: ReactNode;
  };
  since?: number;
  until?: number;
  pausedFor?: number;
  cost?: number;
  ask?: {
    title: string;
    command?: string;
    icon?: ReactNode;
  };
  outcome?: {
    added?: number;
    removed?: number;
    files?: number;
    note?: ReactNode;
  };
  error?: string;
  defaultFolded?: boolean;
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
  onAllow?: () => void;
  onDecline?: () => void;
  onRetry?: () => void;
  onOpenLog?: () => void;
  className?: string;
}
interface ContentProps {
  prefix: string;
  id: string;
  className?: string;
  children: ReactNode;
  morph?: boolean;
}
type ToolKind = keyof typeof TOOL_LABELS;
type RunState = keyof typeof STATE_LABELS;
interface RunStep {
  id: string;
  label: string;
  state: string;
  kind?: ToolKind;
  icon?: ReactNode;
  tool?: string;
  since?: number;
  took?: number;
  detail?: string;
  output?: string;
}
interface CurrentTask {
  label: string;
  kind?: ToolKind;
  icon?: ReactNode;
}
interface PinnedStep {
  id: string;
  from: "row" | "bar";
}
interface ToolEntry {
  id: string;
  icon: ReactNode;
  live?: "run" | "ask";
  tip: {
    title: string;
    sub: string;
  };
}
interface ViewProps extends AgentMonitorProps {
  clean: boolean;
}
type StepListStyle = CSSProperties & {
  [key: `--${string}-shown`]: number;
};
function AgentMonitor(props: AgentMonitorProps) {
  return <AgentMonitorView {...props} clean={false} />;
}
function AnimatedContent({
  prefix,
  id,
  className,
  children,
  morph = false,
}: ContentProps) {
  const previous = useRef({ id, node: children });
  const [outgoing, setOutgoing] = useState<typeof previous.current | null>(null);
  if (previous.current.id !== id && outgoing?.id !== previous.current.id)
    setOutgoing(previous.current);
  useLayoutEffect(() => {
    previous.current = { id, node: children };
  });
  const contentRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();
  useLayoutEffect(() => {
    if (!morph) return;
    const measuredWidth = contentRef.current?.offsetWidth;
    if (measuredWidth != null && measuredWidth !== width) setWidth(measuredWidth);
  });
  const kind = morph ? "morph" : "roll";
  return (
    <span
      className={[`${prefix}__${kind}`, className].filter(Boolean).join(" ")}
      style={morph ? { width } : undefined}
    >
      {outgoing && (
        <span
          className={`${prefix}__${kind}-layer`}
          data-leaving=""
          aria-hidden="true"
          inert={morph ? true : undefined}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setOutgoing(null);
          }}
          key={`out-${outgoing.id}`}
        >
          {outgoing.node}
        </span>
      )}
      <span
        ref={morph ? contentRef : undefined}
        className={`${prefix}__${kind}-layer`}
        data-coming={outgoing ? "" : undefined}
        key={id}
      >
        {children}
      </span>
    </span>
  );
}
function toolKind(value: unknown): ToolKind | undefined {
  return typeof value === "string" && value in TOOL_LABELS
    ? (value as ToolKind)
    : undefined;
}
function renderContent(value: unknown): ReactNode {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "boolean" ||
    value == null ||
    isValidElement(value)
  )
    return value;
  if (Array.isArray(value)) return value.map(renderContent);
  return null;
}
function normalizeStep(step: AgentRunStep, index: number): RunStep {
  const text = (value: unknown) => (typeof value === "string" ? value : undefined);
  const number = (value: unknown) => (typeof value === "number" ? value : undefined);
  return {
    id: step.id ?? `step-${index}`,
    label: step.label ?? "",
    state: text(step.state) ?? "queued",
    kind: toolKind(step.kind),
    icon: renderContent(step.icon),
    tool: text(step.tool),
    since: number(step.since),
    took: number(step.took),
    detail: text(step.detail),
    output: text(step.output),
  };
}
function formatClock(milliseconds: number) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const pad = (value: number) => String(value).padStart(2, "0");
  return hours
    ? `${hours}:${pad(minutes)}:${pad(seconds % 60)}`
    : `${minutes}:${pad(seconds % 60)}`;
}
function formatElapsed(milliseconds: number) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  return seconds < 60
    ? `${seconds}s`
    : `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}
function IconFrame({ children, size }: { children: ReactNode; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
function taskIcon(task?: { icon?: ReactNode; kind?: ToolKind }) {
  return (
    task?.icon ?? <IconFrame size={12}>{TOOL_PATHS[task?.kind ?? "think"]}</IconFrame>
  );
}
function MonitorIcon({ kind }: { kind: keyof typeof CONTROL_PATHS }) {
  return (
    <IconFrame size={kind === "fold" || kind === "log" || kind === "retry" ? 12 : 11}>
      {CONTROL_PATHS[kind]}
    </IconFrame>
  );
}
function useAgentMonitor(
  {
    state = "idle",
    agent = { name: "Agent" },
    steps: sourceSteps = [],
    current,
    since,
    until,
    pausedFor = 0,
    ask,
    defaultFolded = false,
    onAllow,
    onDecline,
  }: AgentMonitorProps,
  prefix: string,
) {
  const steps = sourceSteps.map(normalizeStep);
  const panelId = useId();
  const [folded, setFolded] = useState(defaultFolded);
  const compactButtonRef = useRef<HTMLButtonElement>(null);
  const foldButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFoldFocus = useRef(false);
  useEffect(() => {
    if (restoreFoldFocus.current) {
      restoreFoldFocus.current = false;
      (folded ? compactButtonRef : foldButtonRef).current?.focus();
    }
  }, [folded]);
  const changeFolded = (next: boolean) => {
    restoreFoldFocus.current = true;
    setFolded(next);
  };
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<PinnedStep | null>(null);
  const highlighted = hovered ?? pinned?.id ?? null;
  const panelRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const toggleDetails = (id: string, from: PinnedStep["from"]) =>
    setPinned((previous) => (previous?.id === id ? null : { id, from }));
  const closeDetails = (restoreFocus: boolean) => {
    const id = pinned?.id;
    setPinned(null);
    if (restoreFocus && id)
      panelRef.current
        ?.querySelector<HTMLButtonElement>(
          `[data-id="${CSS.escape(id)}"] .${prefix}__step-hit`,
        )
        ?.focus();
  };
  useEffect(() => {
    if (!pinned) return;
    detailsRef.current
      ?.querySelector<HTMLButtonElement>(`.${prefix}__info-close`)
      ?.focus({ preventScroll: true });
    const dismissOutside = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Element &&
        !detailsRef.current?.contains(target) &&
        !target.closest(`.${prefix}__step, .${prefix}__strip .${prefix}__seg`)
      )
        setPinned(null);
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [pinned?.id]);
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const details = detailsRef.current;
    if (!pinned || !panel || !details) return;
    const anchor =
      pinned.from === "row"
        ? panel.querySelector(`[data-id="${CSS.escape(pinned.id)}"]`)
        : panel.querySelector(`.${prefix}__strip-wrap`);
    if (anchor)
      details.style.top = `${anchor.getBoundingClientRect().bottom - panel.getBoundingClientRect().top + 6}px`;
  });
  const stepsRef = useRef<HTMLOListElement>(null);
  const hoverTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);
  const hoverHandlers = (id: string, scrollRow = false) => ({
    onPointerEnter: () => {
      window.clearTimeout(hoverTimer.current);
      setHovered(id);
      const list = stepsRef.current;
      const row = scrollRow
        ? list?.querySelector<HTMLElement>(`[data-id="${CSS.escape(id)}"]`)
        : null;
      if (
        list &&
        row &&
        (row.offsetTop < list.scrollTop ||
          row.offsetTop + row.offsetHeight > list.scrollTop + list.clientHeight)
      )
        list.scrollTo({
          top: row.offsetTop - list.clientHeight / 2 + row.offsetHeight / 2,
          behavior: "smooth",
        });
    },
    onPointerLeave: () => {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = window.setTimeout(
        () => setHovered((previous) => (previous === id ? null : previous)),
        70,
      );
    },
  });
  const [scrollFade, setScrollFade] = useState({ top: false, bottom: false });
  const updateScrollFade = () => {
    const list = stepsRef.current;
    if (!list) return;
    const next = {
      top: list.scrollTop > 2,
      bottom: list.scrollTop + list.clientHeight < list.scrollHeight - 2,
    };
    setScrollFade((previous) =>
      previous.top === next.top && previous.bottom === next.bottom ? previous : next,
    );
  };
  const ticking = state === "running" || state === "waiting";
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!ticking) return;
    const timer = window.setInterval(() => setNow(Date.now()), 100);
    return () => window.clearInterval(timer);
  }, [ticking]);
  const frozenTime = useRef(now);
  if (ticking) frozenTime.current = now;
  const effectiveNow = ticking ? now : frozenTime.current;
  const elapsed = since ? Math.max(0, (until ?? effectiveNow) - since - pausedFor) : 0;
  const onPanelKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (state !== "waiting" || event.target !== event.currentTarget) return;
    if (event.key === "Enter" && onAllow) {
      event.preventDefault();
      onAllow();
    } else if (event.key === "Escape" && onDecline) {
      event.preventDefault();
      onDecline();
    }
  };
  const runningStep = steps.find((step) => step.state === "running");
  const startedCount = Math.min(
    steps.length,
    steps.filter((step) => step.state !== "queued").length,
  );
  const currentTask: CurrentTask | undefined = current
    ? { ...current, kind: toolKind(current.kind) }
    : runningStep
      ? {
          label: runningStep.label,
          kind: runningStep.kind,
          icon: runningStep.icon,
        }
      : undefined;
  const durationFor = (step: RunStep) =>
    step.state === "running"
      ? step.since
        ? Math.max(0, effectiveNow - step.since)
        : 0
      : (step.took ?? 0);
  const accessibleLabel = `${agent.name}: ${STATE_LABELS[state]}${state === "running" && currentTask ? ` – ${currentTask.label}` : ""}${state === "waiting" && ask ? ` – ${ask.title}` : ""}`;
  const startedSteps = steps.filter((step) => step.state !== "queued");
  const totalDuration = startedSteps.reduce(
    (total, step) => total + Math.max(durationFor(step), 1),
    0,
  );
  const finishedSteps = startedSteps.filter((step) => step.state !== "running").reverse();
  const detailStep = pinned
    ? startedSteps.find((step) => step.id === pinned.id)
    : undefined;
  const detailStartOffset = detailStep
    ? detailStep.since != null && since != null
      ? Math.max(0, detailStep.since - since)
      : startedSteps
          .slice(0, startedSteps.indexOf(detailStep))
          .reduce((total, step) => total + durationFor(step), 0)
    : 0;
  useEffect(() => {
    if (pinned && !detailStep) setPinned(null);
  }, [pinned, detailStep]);
  useEffect(updateScrollFade, [finishedSteps.length, folded]);
  const tools: ToolEntry[] = [];
  const iconPositions = new Map<unknown, number>();
  const addTool = (
    id: string,
    task: {
      icon?: ReactNode;
      kind?: CurrentTask["kind"];
    },
    tip: ToolEntry["tip"],
    live?: ToolEntry["live"],
  ) => {
    const key = isValidElement(task.icon)
      ? task.icon.type
      : (task.icon ?? `kind-${task.kind ?? "think"}`);
    const previousIndex = iconPositions.get(key);
    if (previousIndex != null) {
      tools[previousIndex] = {
        ...tools[previousIndex],
        live: live ?? tools[previousIndex].live,
        tip,
      };
      return;
    }
    iconPositions.set(key, tools.length);
    tools.push({ id, icon: taskIcon(task), live, tip });
  };
  for (const step of startedSteps)
    addTool(
      step.id,
      step,
      {
        title: step.label,
        sub: [
          step.tool ?? TOOL_LABELS[step.kind ?? "think"],
          step.state === "failed" ? "Failed" : formatStepTime(durationFor(step)),
        ].join(" · "),
      },
      step.state === "running" && state === "running" ? "run" : undefined,
    );
  if (state === "waiting" && ask?.icon)
    addTool(
      "ask",
      { icon: ask.icon },
      { title: ask.title, sub: "Waiting on you" },
      "ask",
    );
  const visibleTools = tools.slice(-4);
  const agentMark = agent.mark ?? agent.name.trim().slice(0, 1).toUpperCase();
  const showClock =
    since != null &&
    (state === "running" ||
      state === "paused" ||
      state === "waiting" ||
      state === "failed");
  return {
    steps,
    panelId,
    folded,
    compactButtonRef,
    foldButtonRef,
    changeFolded,
    pinned,
    highlighted,
    panelRef,
    detailsRef,
    toggleDetails,
    closeDetails,
    stepsRef,
    hoverHandlers,
    scrollFade,
    updateScrollFade,
    ticking,
    elapsed,
    onPanelKeyDown,
    startedCount,
    currentTask,
    durationFor,
    accessibleLabel,
    startedSteps,
    totalDuration,
    finishedSteps,
    detailStep,
    detailStartOffset,
    tools,
    visibleTools,
    agentMark,
    showClock,
  };
}
function AgentMonitorView(props: ViewProps) {
  const {
    state = "idle",
    agent = { name: "Agent" },
    cost,
    ask,
    outcome,
    error,
    onPause,
    onResume,
    onCancel,
    onAllow,
    onDecline,
    onRetry,
    onOpenLog,
    className,
    clean,
  } = props;
  const prefix = clean ? "ui-agmc" : "ui-agm";
  const monitor = useAgentMonitor(props, prefix);
  const task = monitor.currentTask;
  const hasDiff = outcome && (outcome.added != null || outcome.removed != null);
  let activity: {
    id: string;
    node: ReactNode;
  };
  if (state === "running" && task)
    activity = {
      id: `r-${task.label}`,
      node: (
        <>
          <span className={`${prefix}__tile`}>{taskIcon(task)}</span>
          <span className={`${prefix}__task ${prefix}__shine`}>{task.label}</span>
        </>
      ),
    };
  else if (state === "waiting")
    activity = {
      id: `w-${ask?.title ?? ""}-${ask?.command ?? ""}`,
      node: (
        <>
          {ask?.icon && <span className={`${prefix}__tile`}>{ask.icon}</span>}
          <span className={`${prefix}__task`}>{ask?.title ?? "Waiting on you"}</span>
          {ask?.command && (
            <code className={`${prefix}__code`} title={ask.command}>
              {ask.command}
            </code>
          )}
        </>
      ),
    };
  else if (state === "paused")
    activity = {
      id: "p",
      node: (
        <span className={`${prefix}__task ${prefix}__task--quiet`}>
          {"Paused"}
          {task ? ` · ${task.label}` : ""}
        </span>
      ),
    };
  else if (state === "finished")
    activity = {
      id: "f",
      node: (
        <>
          <span className={`${prefix}__task`}>
            {"Finished in "}
            {formatElapsed(monitor.elapsed)}
          </span>
          {hasDiff && (
            <span className={`${prefix}__diff`}>
              <span className={`${prefix}__add`}>
                {"+"}
                {countFormat.format(Number(outcome.added ?? 0))}
              </span>
              <span className={`${prefix}__del`}>
                {"−"}
                {countFormat.format(Number(outcome.removed ?? 0))}
              </span>
            </span>
          )}
          {outcome?.files != null && (
            <span className={`${prefix}__note`}>
              {outcome.files === 1 ? "1 file" : `${outcome.files} files`}
            </span>
          )}
          {!!outcome?.note && (
            <span className={`${prefix}__note`}>{renderContent(outcome.note)}</span>
          )}
        </>
      ),
    };
  else if (state === "failed")
    activity = {
      id: `x-${error ?? ""}`,
      node: (
        <>
          <span className={`${prefix}__flag`} aria-hidden="true" />
          <span className={`${prefix}__task`}>{error ?? "Something went wrong"}</span>
        </>
      ),
    };
  else if (state === "cancelled")
    activity = {
      id: "c",
      node: (
        <span className={`${prefix}__task ${prefix}__task--quiet`}>
          {"Cancelled after "}
          {formatElapsed(monitor.elapsed)}
        </span>
      ),
    };
  else
    activity = {
      id: "i",
      node: <span className={`${prefix}__task ${prefix}__task--quiet`}>No task yet</span>,
    };
  const face = (
    <span className={`${prefix}__face`} aria-hidden="true">
      {monitor.agentMark}
    </span>
  );
  const compactIdentity = (
    <>
      {face}
      <span className={`${prefix}__icon-name`}>{agent.name}</span>
    </>
  );
  const details = monitor.detailStep;
  const content = (
    <Fragment>
      <div className={`${prefix}__top`}>
        {face}
        <span className={`${prefix}__who`}>
          <span className={`${prefix}__name`}>{agent.name}</span>
          {agent.role && <span className={`${prefix}__role`}>{agent.role}</span>}
        </span>
        {cost != null && state !== "idle" && (
          <span
            className={`${prefix}__cost`}
            data-live={monitor.ticking ? "" : undefined}
            aria-label={`Cost so far ${formatCost(cost)}`}
          >
            {formatCost(cost)}
          </span>
        )}
        <span className={`${prefix}__state`} data-status={state}>
          <span className={`${prefix}__dot`} />
          <AnimatedContent prefix={prefix} id={state}>
            {STATE_LABELS[state]}
          </AnimatedContent>
        </span>
        <button
          ref={monitor.foldButtonRef}
          type="button"
          className={`${prefix}__fold`}
          aria-label="Fold away"
          title="Fold away"
          aria-expanded={true}
          aria-controls={monitor.panelId}
          onClick={() => monitor.changeFolded(true)}
        >
          <MonitorIcon kind="fold" />
        </button>
      </div>
      <div className={`${prefix}__well`} data-status={state}>
        <AnimatedContent
          prefix={prefix}
          id={activity.id}
          className={`${prefix}__well-line`}
        >
          {activity.node}
        </AnimatedContent>
        {monitor.showClock && (
          <span
            className={`${prefix}__clock`}
            aria-label={`Running for ${formatElapsed(monitor.elapsed)}`}
          >
            {formatClock(monitor.elapsed)}
          </span>
        )}
      </div>
      {monitor.startedSteps.length > 0 && (
        <div
          className={`${prefix}__strip-wrap`}
          role="img"
          aria-label={monitor.startedSteps
            .map((step) => `${step.label}, ${formatStepTime(monitor.durationFor(step))}`)
            .join("; ")}
        >
          <span className={`${prefix}__strip`} aria-hidden="true">
            {monitor.startedSteps.map((step) => (
              <span
                className={`${prefix}__seg`}
                data-state={step.state}
                data-hot={monitor.highlighted === step.id ? "" : undefined}
                style={{
                  flexGrow:
                    Math.max(monitor.durationFor(step), 1) / monitor.totalDuration,
                }}
                title={`${step.label} · ${formatStepTime(monitor.durationFor(step))}`}
                {...monitor.hoverHandlers(step.id, true)}
                onClick={() => monitor.toggleDetails(step.id, "bar")}
                key={step.id}
              />
            ))}
            {state === "waiting" && (
              <span className={`${prefix}__seg`} data-state="waiting" />
            )}
          </span>
        </div>
      )}
      {monitor.finishedSteps.length > 0 && (
        <ol
          ref={monitor.stepsRef}
          className={`${prefix}__steps`}
          style={
            {
              [`--${prefix}-shown`]: Math.min(monitor.finishedSteps.length, 3),
            } as StepListStyle
          }
          data-fade-top={monitor.scrollFade.top ? "" : undefined}
          data-fade-bottom={monitor.scrollFade.bottom ? "" : undefined}
          tabIndex={monitor.finishedSteps.length > 3 ? 0 : undefined}
          aria-label={monitor.finishedSteps.length > 3 ? "Finished steps" : undefined}
          onScroll={monitor.updateScrollFade}
        >
          {monitor.finishedSteps.map((step) => (
            <li
              className={`${prefix}__step`}
              data-id={step.id}
              data-state={step.state}
              data-hot={monitor.highlighted === step.id ? "" : undefined}
              {...monitor.hoverHandlers(step.id)}
              key={step.id}
            >
              <button
                type="button"
                className={`${prefix}__step-hit`}
                aria-label={`${step.label} – details`}
                aria-expanded={monitor.pinned?.id === step.id}
                onClick={() => monitor.toggleDetails(step.id, "row")}
              />
              <span className={`${prefix}__step-icon`}>{taskIcon(step)}</span>
              <span className={`${prefix}__step-label`} title={step.label}>
                {step.label}
              </span>
              <span className={`${prefix}__step-time`}>
                {step.state === "failed"
                  ? "Failed"
                  : formatStepTime(monitor.durationFor(step))}
              </span>
            </li>
          ))}
        </ol>
      )}
    </Fragment>
  );
  const detailPanel = details && (
    <div
      ref={monitor.detailsRef}
      className={`${prefix}__info`}
      role="dialog"
      aria-label={details.label}
      data-state={details.state}
      key={details.id}
    >
      <div className={`${prefix}__info-head`}>
        <span className={`${prefix}__tile`}>{taskIcon(details)}</span>
        <span className={`${prefix}__info-title`}>
          <span className={`${prefix}__info-label`}>{details.label}</span>
          <span className={`${prefix}__info-sub`}>
            {details.tool ?? TOOL_LABELS[details.kind ?? "think"]}
          </span>
        </span>
        <button
          type="button"
          className={`${prefix}__info-close`}
          aria-label="Close"
          onClick={() => monitor.closeDetails(true)}
        >
          <MonitorIcon kind="close" />
        </button>
      </div>
      <dl className={`${prefix}__info-facts`}>
        <div>
          <dt>Started</dt>
          <dd>
            {"+"}
            {formatClock(monitor.detailStartOffset)}
          </dd>
        </div>
        <div>
          <dt>Took</dt>
          <dd>{formatStepTime(monitor.durationFor(details))}</dd>
        </div>
        <div>
          <dt>Share</dt>
          <dd>
            {Math.max(
              1,
              Math.round(
                (Math.max(monitor.durationFor(details), 1) / monitor.totalDuration) * 100,
              ),
            )}
            {"%"}
          </dd>
        </div>
        <div>
          <dt>State</dt>
          <dd data-state={details.state}>
            {details.state === "running"
              ? "Running"
              : details.state === "failed"
                ? "Failed"
                : "Done"}
          </dd>
        </div>
      </dl>
      {details.detail && <p className={`${prefix}__info-detail`}>{details.detail}</p>}
      {details.output && (
        <code className={`${prefix}__info-output`} title={details.output}>
          {details.output}
        </code>
      )}
    </div>
  );
  const footer = (
    <div className={`${prefix}__foot`}>
      <AnimatedContent
        prefix={prefix}
        morph
        id={
          state === "waiting"
            ? "answer"
            : state === "failed" && onRetry
              ? "retry"
              : state === "running" || state === "paused"
                ? "steer"
                : "none"
        }
        className={`${prefix}__controls`}
      >
        {state === "waiting" ? (
          <>
            {onDecline && (
              <button type="button" className={`${prefix}__btn`} onClick={onDecline}>
                {"Decline "}
                <kbd>Esc</kbd>
              </button>
            )}
            {onAllow && (
              <button
                type="button"
                className={`${prefix}__btn ${prefix}__btn--go`}
                onClick={onAllow}
              >
                {"Allow "}
                <kbd>⏎</kbd>
              </button>
            )}
          </>
        ) : state === "failed" && onRetry ? (
          <button
            type="button"
            className={`${prefix}__btn ${prefix}__btn--go`}
            onClick={onRetry}
          >
            <MonitorIcon kind="retry" />
            {" Try again"}
          </button>
        ) : (
          (state === "running" || state === "paused") &&
          (onPause || onResume || onCancel) && (
            <span className={`${prefix}__group`}>
              {(state === "running" ? onPause : onResume) && (
                <button
                  type="button"
                  className={`${prefix}__seg-btn`}
                  onClick={state === "running" ? onPause : onResume}
                >
                  <AnimatedContent
                    prefix={prefix}
                    morph
                    id={state}
                    className={`${prefix}__seg-label`}
                  >
                    <MonitorIcon kind={state === "running" ? "pause" : "resume"} />
                    {state === "running" ? "Pause" : "Resume"}
                  </AnimatedContent>
                </button>
              )}
              {onCancel && (
                <button type="button" className={`${prefix}__seg-btn`} onClick={onCancel}>
                  <MonitorIcon kind="close" />
                  {" Cancel"}
                </button>
              )}
            </span>
          )
        )}
      </AnimatedContent>
      <span className={`${prefix}__where`}>
        {monitor.steps.length > 0 && state !== "idle"
          ? `${monitor.startedCount}/${monitor.steps.length}`
          : ""}
      </span>
      {onOpenLog && (
        <button
          type="button"
          className={`${prefix}__btn ${prefix}__btn--quiet`}
          onClick={onOpenLog}
        >
          {"Log "}
          <MonitorIcon kind="log" />
        </button>
      )}
    </div>
  );
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      data-status={state}
      data-folded={monitor.folded ? "" : undefined}
      data-pointing={monitor.highlighted ? "" : undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape" && monitor.pinned) {
          event.stopPropagation();
          monitor.closeDetails(true);
        }
      }}
    >
      {monitor.folded ? (
        <button
          ref={monitor.compactButtonRef}
          type="button"
          className={`${prefix}__icon`}
          title={monitor.accessibleLabel}
          aria-label={`${monitor.accessibleLabel} – open`}
          aria-expanded={false}
          aria-controls={monitor.panelId}
          onClick={() => monitor.changeFolded(false)}
        >
          {clean ? (
            compactIdentity
          ) : (
            <span className={`${prefix}__icon-who`}>{compactIdentity}</span>
          )}
          {monitor.visibleTools.length > 0 && (
            <span className={`${prefix}__tools`} aria-hidden="true">
              {monitor.tools.length > monitor.visibleTools.length && (
                <span className={`${prefix}__tools-more`}>
                  {"+"}
                  {monitor.tools.length - monitor.visibleTools.length}
                </span>
              )}
              {monitor.visibleTools.map((tool) => (
                <span className={`${prefix}__tool`} data-live={tool.live} key={tool.id}>
                  {tool.icon}
                  <span className={`${prefix}__tip`}>
                    <span className={`${prefix}__tip-title`}>{tool.tip.title}</span>
                    {tool.tip.sub && (
                      <span className={`${prefix}__tip-sub`}>{tool.tip.sub}</span>
                    )}
                  </span>
                </span>
              ))}
            </span>
          )}
          <AnimatedContent
            prefix={prefix}
            morph
            id={state === "running" || state === "paused" ? "clock" : state}
            className={`${prefix}__icon-end`}
          >
            {state === "finished" ? (
              <span className={`${prefix}__done-tag`} data-tone="done">
                <MonitorIcon kind="check" />
                {formatElapsed(monitor.elapsed)}
              </span>
            ) : state === "waiting" ? (
              <span className={`${prefix}__done-tag`} data-tone="ask">
                <MonitorIcon kind="warning" />
                {STATE_LABELS[state]}
              </span>
            ) : state === "failed" ? (
              <span className={`${prefix}__done-tag`} data-tone="fail">
                <MonitorIcon kind="close" />
                {STATE_LABELS[state]}
              </span>
            ) : (
              <span
                className={[
                  `${prefix}__icon-meta`,
                  state === "running" ? `${prefix}__shine` : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-status={state}
              >
                {state === "running" || state === "paused"
                  ? formatClock(monitor.elapsed)
                  : STATE_LABELS[state]}
              </span>
            )}
          </AnimatedContent>
        </button>
      ) : (
        <section
          ref={monitor.panelRef}
          id={monitor.panelId}
          className={`${prefix}__${clean ? "card" : "panel"}`}
          aria-label={monitor.accessibleLabel}
          tabIndex={state === "waiting" ? 0 : undefined}
          onKeyDown={monitor.onPanelKeyDown}
        >
          {clean ? content : <div className={`${prefix}__card`}>{content}</div>}
          {detailPanel}
          {footer}
        </section>
      )}
    </div>
  );
}
const TOOL_LABELS = {
  read: "Read",
  search: "Search",
  edit: "Edit",
  run: "Terminal",
  think: "Thinking",
  web: "Web",
};
const STATE_LABELS = {
  idle: "Idle",
  running: "Running",
  waiting: "Needs you",
  paused: "Paused",
  finished: "Finished",
  failed: "Failed",
  cancelled: "Cancelled",
};
const formatStepTime = (milliseconds: number) =>
  milliseconds < 10000
    ? `${(Math.max(0, milliseconds) / 1000).toFixed(1)}s`
    : formatElapsed(milliseconds);
const formatCost = (cost: number) =>
  cost > 0 && cost < 0.001
    ? "<$0.001"
    : cost < 1
      ? `$${cost.toFixed(3)}`
      : `$${cost.toFixed(2)}`;
const countFormat = new Intl.NumberFormat("en-US");
const TOOL_PATHS: Record<ToolKind, ReactNode> = {
  read: (
    <>
      <path d="M4 1.75h5.25L12 4.5v9.75H4z" />
      <path d="M9 1.75V4.75h3M6.25 8h3.5M6.25 10.5h3.5" />
    </>
  ),
  search: (
    <>
      <circle cx="7.25" cy="7.25" r="4.25" />
      <path d="m10.5 10.5 3.25 3.25" />
    </>
  ),
  edit: (
    <>
      <path d="M10.75 2.75 13.25 5.25 6 12.5H3.5V10z" />
      <path d="m9.25 4.25 2.5 2.5" />
    </>
  ),
  run: (
    <>
      <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="2" />
      <path d="m4.75 6.25 2 1.75-2 1.75M8.5 10h2.75" />
    </>
  ),
  think: (
    <path d="M8 1.75c.4 3.1 1.6 4.4 4.75 4.75-3.15.35-4.35 1.65-4.75 4.75-.4-3.1-1.6-4.4-4.75-4.75C6.4 6.15 7.6 4.85 8 1.75z" />
  ),
  web: (
    <>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M1.75 8h12.5M8 1.75c1.75 1.9 2.6 4 2.6 6.25S9.75 12.35 8 14.25C6.25 12.35 5.4 10.25 5.4 8S6.25 3.65 8 1.75z" />
    </>
  ),
};
const CONTROL_PATHS = {
  fold: <path d="m5 3 3 3 3-3M5 13l3-3 3 3" />,
  pause: <path d="M6 4v8M10 4v8" />,
  resume: <path d="M5.5 3.75v8.5L12 8z" />,
  close: <path d="m5 5 6 6M11 5l-6 6" />,
  check: <path d="m3.75 8.25 2.75 2.75 5.75-6" />,
  warning: (
    <>
      <path d="M7.13 2.5a1 1 0 0 1 1.74 0l5.5 9.75a1 1 0 0 1-.87 1.5H2.5a1 1 0 0 1-.87-1.5z" />
      <path d="M8 6.25v3M8 11.5v.25" />
    </>
  ),
  log: <path d="M5.5 10.5 10.75 5.25M6 5h4.75v4.75" />,
  retry: <path d="M3.25 8a4.75 4.75 0 1 0 1.4-3.35M3.25 2.75v2.5h2.5" />,
};
export { AgentMonitor };
export type { AgentRunStep };
export type { AgentMonitorProps };
