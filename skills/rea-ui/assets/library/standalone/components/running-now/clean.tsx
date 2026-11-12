"use client";

import "./RunningNow.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
interface RunningTask {
  id?: string;
  title?: string;
  state?: "running" | "needs-you" | "paused" | "done" | (string & {});
  step?: string;
  done?: number;
  total?: number;
  tasks?: RunningTask[];
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onOpen?: (id: string) => void;
  [field: string]: unknown;
}
interface RunningNowLabels {
  title?: string;
  running?: string;
  needsYou?: string;
  needsYouOne?: string;
  needsYouBadge?: string;
  paused?: string;
  pausedCount?: string;
  done?: string;
  pause?: string;
  resume?: string;
  open?: string;
  openAll?: string;
  empty?: string;
  idle?: string;
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
}
interface RunningNowProps {
  tasks: RunningTask[];
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onOpen?: (id: string) => void;
  onOpenAll?: () => void;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end";
  labels?: Partial<RunningNowLabels>;
  className?: string;
}
type TaskLabels = typeof defaultLabels;
type IdentifiedTask = RunningTask & {
  id: string;
};
interface TextLayer {
  key: number;
  value: string | undefined;
  fresh?: boolean;
  outgoing?: boolean;
}
function RunningNow(props: RunningNowProps) {
  return <RunningNowView {...props} clean />;
}
function resolveLabels(labels?: RunningNowLabels): TaskLabels {
  const resolved = { ...defaultLabels };
  if (labels?.needsYou && !labels.needsYouOne) resolved.needsYouOne = labels.needsYou;
  for (const key of Object.keys(defaultLabels) as (keyof TaskLabels)[]) {
    if (labels?.[key] !== undefined) resolved[key] = labels[key];
  }
  return resolved;
}
function finiteNumber(value: number | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
function taskProgress(task: RunningTask): number {
  if (task.state === "done") return 1;
  const total = Math.max(0, finiteNumber(task.total));
  return total > 0 ? Math.min(1, Math.max(0, finiteNumber(task.done) / total)) : 0;
}
function progressColor(task: RunningTask, progress: number, prefix: string): string {
  const color =
    task.state === "done"
      ? "blue"
      : task.state === "paused"
        ? "muted"
        : progress <= 0.25
          ? "orange"
          : progress <= 0.5
            ? "amber"
            : "teal";
  return `var(--${prefix}-${color})`;
}
function useRunningNow(
  {
    tasks,
    defaultOpen = false,
    open,
    onOpenChange,
    align = "end",
    labels,
  }: RunningNowProps,
  prefix: string,
) {
  const text = resolveLabels(labels);
  const visibleTasks = (Array.isArray(tasks) ? tasks : []).filter(
    (task): task is IdentifiedTask => !!task && typeof task === "object" && !!task.id,
  );
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const isOpen = open ?? localOpen;
  function setOpen(next: boolean) {
    if (open === undefined) setLocalOpen(next);
    onOpenChange?.(next);
  }
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const runningCount = visibleTasks.filter((task) => task.state === "running").length;
  const needsYouCount = visibleTasks.filter((task) => task.state === "needs-you").length;
  const needsYouLabel = needsYouCount === 1 ? text.needsYouOne : text.needsYou;
  const pausedCount = visibleTasks.filter((task) => task.state === "paused").length;
  useEffect(() => {
    if (!isOpen) return;
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target))
        setOpen(false);
    }
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  });
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  useLayoutEffect(() => {
    if (!isOpen) return;
    function positionPanel() {
      const panel = panelRef.current;
      const root = rootRef.current;
      if (!panel || !root) return;
      const bounds = root.getBoundingClientRect();
      const width = panel.offsetWidth;
      const rtl = getComputedStyle(root).direction === "rtl";
      const left = (align === "start") === rtl ? bounds.right - width : bounds.left;
      const viewportWidth = document.documentElement.clientWidth;
      const offset =
        left < 16
          ? 16 - left
          : left + width > viewportWidth - 16
            ? Math.max(16 - left, viewportWidth - 16 - left - width)
            : 0;
      setHorizontalOffset(Math.round(offset));
    }
    positionPanel();
    window.addEventListener("resize", positionPanel);
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(positionPanel);
    if (rootRef.current) observer?.observe(rootRef.current);
    return () => {
      window.removeEventListener("resize", positionPanel);
      observer?.disconnect();
    };
  }, [isOpen, align]);
  const [announcement, setAnnouncement] = useState("");
  const previousStatesRef = useRef<Map<string, RunningTask["state"]> | null>(null);
  useEffect(() => {
    const previousStates = previousStatesRef.current;
    previousStatesRef.current = new Map(
      visibleTasks.map((task) => [task.id, task.state]),
    );
    if (!previousStates) return;
    const updates: string[] = [];
    for (const task of visibleTasks) {
      const previousState = previousStates.get(task.id);
      if (previousState === task.state || previousState === undefined) continue;
      if (task.state === "needs-you")
        updates.push(`${task.title} ${text.needsYouBadge.toLowerCase()}`);
      if (task.state === "done")
        updates.push(`${task.title}: ${text.done.toLowerCase()}`);
    }
    if (updates.length) setAnnouncement(updates.join(". "));
  });
  function taskButtons() {
    return [
      ...(listRef.current?.querySelectorAll<HTMLButtonElement>(`.${prefix}__main`) ?? []),
    ];
  }
  function focusTask(last = false) {
    requestAnimationFrame(() => {
      const buttons = taskButtons();
      (
        buttons[last ? buttons.length - 1 : 0] ??
        panelRef.current?.querySelector<HTMLButtonElement>("button") ??
        panelRef.current
      )?.focus();
    });
  }
  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    if (!isOpen) setOpen(true);
    focusTask(event.key === "ArrowUp");
  }
  function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    const buttons = taskButtons();
    const row =
      event.target instanceof Element ? event.target.closest(`.${prefix}__row`) : null;
    const currentIndex = buttons.findIndex((button) => button.parentElement === row);
    if (currentIndex < 0) return;
    const nextIndex =
      event.key === "ArrowDown"
        ? Math.min(buttons.length - 1, currentIndex + 1)
        : event.key === "ArrowUp"
          ? Math.max(0, currentIndex - 1)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? buttons.length - 1
              : null;
    if (nextIndex !== null) {
      event.preventDefault();
      buttons[nextIndex]?.focus();
    }
  }
  const focusedRowRef = useRef<{
    element: HTMLElement;
    id?: string;
    index: number;
  } | null>(null);
  function handlePanelFocus(event: FocusEvent<HTMLDivElement>) {
    const row = event.target.closest<HTMLElement>(`.${prefix}__row`);
    focusedRowRef.current = {
      element: event.target,
      id: row?.dataset.id,
      index: row ? taskButtons().findIndex((button) => button.parentElement === row) : -1,
    };
  }
  useLayoutEffect(() => {
    const focusedRow = focusedRowRef.current;
    if (!isOpen || !focusedRow || focusedRow.element.isConnected) return;
    focusedRowRef.current = null;
    const activeElement = document.activeElement;
    if (
      activeElement &&
      activeElement !== document.body &&
      activeElement !== focusedRow.element
    )
      return;
    const buttons = taskButtons();
    (
      buttons.find((button) => button.parentElement?.dataset.id === focusedRow.id) ??
      buttons[Math.min(focusedRow.index, buttons.length - 1)] ??
      panelRef.current?.querySelector<HTMLButtonElement>("button") ??
      panelRef.current
    )?.focus();
  });
  const summary =
    runningCount || needsYouCount
      ? [
          runningCount ? `${numberFormat.format(runningCount)} ${text.running}` : "",
          needsYouCount ? `${numberFormat.format(needsYouCount)} ${needsYouLabel}` : "",
        ]
          .filter(Boolean)
          .join(", ")
      : pausedCount
        ? `${numberFormat.format(pausedCount)} ${text.pausedCount}`
        : text.idle;
  return {
    text,
    visibleTasks,
    isOpen,
    setOpen,
    rootRef,
    triggerRef,
    listRef,
    panelRef,
    panelId,
    runningCount,
    needsYouCount,
    needsYouLabel,
    pausedCount,
    horizontalOffset,
    announcement,
    summary,
    focusTask,
    handleTriggerKeyDown,
    handlePanelKeyDown,
    handlePanelFocus,
  };
}
function SwappingText({
  value,
  className,
  prefix,
}: {
  value: string | undefined;
  className: string;
  prefix: string;
}) {
  const [layers, setLayers] = useState<TextLayer[]>([{ key: 0, value }]);
  const previousValueRef = useRef(value);
  const nextKeyRef = useRef(0);
  useEffect(() => {
    if (value === previousValueRef.current) return;
    previousValueRef.current = value;
    const key = ++nextKeyRef.current;
    setLayers((previous) => [
      { key, value, fresh: true },
      ...previous
        .filter((layer) => !layer.outgoing)
        .slice(0, 1)
        .map((layer) => ({ ...layer, outgoing: true, fresh: false })),
    ]);
    const timeout = setTimeout(
      () => setLayers((current) => current.filter((layer) => !layer.outgoing)),
      360,
    );
    return () => clearTimeout(timeout);
  }, [value]);
  return (
    <span className={[`${prefix}__swap`, className].filter(Boolean).join(" ")}>
      {layers.map((layer) => (
        <span
          data-out={layer.outgoing || undefined}
          data-fresh={layer.fresh || undefined}
          aria-hidden={layer.outgoing || undefined}
          dir="auto"
          title={layer.outgoing ? undefined : layer.value}
          key={layer.key}
        >
          {layer.value}
        </span>
      ))}
    </span>
  );
}
function ProgressMark({
  value,
  color,
  prefix,
}: {
  value: number;
  color: string;
  prefix: string;
}) {
  const circumference = 2 * Math.PI * 2;
  return (
    <svg
      className={`${prefix}__mark`}
      viewBox="0 0 14 14"
      width="14"
      height="14"
      aria-hidden="true"
      style={{ color }}
    >
      <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle
        className={`${prefix}__pie`}
        cx="7"
        cy="7"
        r={2}
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        style={{ strokeDasharray: `${circumference * value} ${circumference}` }}
        transform="rotate(-90 7 7)"
      />
    </svg>
  );
}
function TaskRow({
  task,
  labels,
  onPause,
  onResume,
  onOpen,
  prefix,
}: Pick<RunningNowProps, "onPause" | "onResume" | "onOpen"> & {
  task: IdentifiedTask;
  labels: TaskLabels;
  prefix: string;
}) {
  const progress = taskProgress(task);
  const total = Math.max(0, finiteNumber(task.total));
  const completed =
    task.state === "done" ? total : Math.min(total, Math.max(0, finiteNumber(task.done)));
  const step =
    task.state === "done"
      ? labels.done
      : task.state === "paused"
        ? `${labels.paused} · ${task.step}`
        : task.step;
  const statusLabel =
    task.state === "needs-you"
      ? labels.needsYouBadge
      : task.state === "paused"
        ? labels.paused
        : task.state === "done"
          ? labels.done
          : labels.running;
  const accessibleLabel = `${task.title} – ${statusLabel}. ${task.state === "done" || !task.step ? "" : `${task.step}. `}${numberFormat.format(completed)} of ${numberFormat.format(total)} steps`;
  return (
    <li className={`${prefix}__row`} data-state={task.state} data-id={task.id}>
      <button
        type="button"
        className={`${prefix}__main`}
        aria-label={accessibleLabel}
        onClick={() => onOpen?.(task.id)}
      >
        <ProgressMark
          value={progress}
          color={progressColor(task, progress, prefix)}
          prefix={prefix}
        />
        <span className={`${prefix}__text`}>
          <span className={`${prefix}__title`} dir="auto" title={task.title}>
            {task.title}
          </span>
          <SwappingText className={`${prefix}__step`} value={step} prefix={prefix} />
        </span>
        {task.state === "needs-you" ? (
          <span className={`${prefix}__badge`}>{labels.needsYouBadge}</span>
        ) : (
          <span className={`${prefix}__steps`}>
            {numberFormat.format(completed)}
            {"/"}
            {numberFormat.format(total)}
          </span>
        )}
      </button>
      <span className={`${prefix}__act`}>
        {task.state === "needs-you" ? (
          <button
            type="button"
            className={`${prefix}__btn ${prefix}__btn--text`}
            aria-label={`${labels.open} ${task.title} – ${labels.needsYouBadge.toLowerCase()}`}
            onClick={() => onOpen?.(task.id)}
          >
            {labels.open}
          </button>
        ) : task.state === "running" ? (
          <button
            type="button"
            className={`${prefix}__btn`}
            aria-label={`${labels.pause} ${task.title}`}
            title={labels.pause}
            onClick={() => onPause?.(task.id)}
          >
            <PauseIcon />
          </button>
        ) : task.state === "paused" ? (
          <button
            type="button"
            className={`${prefix}__btn`}
            aria-label={`${labels.resume} ${task.title}`}
            title={labels.resume}
            onClick={() => onResume?.(task.id)}
          >
            <PlayIcon />
          </button>
        ) : (
          <span className={`${prefix}__btn`} aria-hidden="true">
            <CheckIcon />
          </span>
        )}
      </span>
    </li>
  );
}
function RunningNowView({
  clean = false,
  ...props
}: RunningNowProps & {
  clean?: boolean;
}) {
  const { align = "end", className, onPause, onResume, onOpen, onOpenAll } = props;
  const prefix = clean ? "ui-rnc" : "ui-rn";
  const {
    text,
    visibleTasks,
    isOpen,
    setOpen,
    rootRef,
    triggerRef,
    listRef,
    panelRef,
    panelId,
    runningCount,
    needsYouCount,
    needsYouLabel,
    pausedCount,
    horizontalOffset,
    announcement,
    summary,
    focusTask,
    handleTriggerKeyDown,
    handlePanelKeyDown,
    handlePanelFocus,
  } = useRunningNow(props, prefix);
  return (
    <>
      <div
        ref={rootRef}
        className={[prefix, className].filter(Boolean).join(" ")}
        data-open={isOpen || undefined}
        data-align={align}
        data-both={(runningCount > 0 && needsYouCount > 0) || undefined}
        data-long={
          numberFormat.format(runningCount).length +
            numberFormat.format(needsYouCount).length >
            4 || undefined
        }
        onKeyDown={(event) => {
          if (event.key === "Escape" && isOpen && event.target === triggerRef.current)
            setOpen(false);
        }}
        onBlur={(event) => {
          if (
            isOpen &&
            event.relatedTarget &&
            !rootRef.current?.contains(event.relatedTarget)
          )
            setOpen(false);
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          className={`${prefix}__trigger`}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${text.title}: ${summary}`}
          onClick={(event) => {
            setOpen(!isOpen);
            if (!isOpen && event.detail === 0) focusTask();
          }}
          onKeyDown={handleTriggerKeyDown}
        >
          {runningCount || needsYouCount ? (
            <>
              {runningCount > 0 && (
                <span className={`${prefix}__part`}>
                  <span className={`${prefix}__ring`} aria-hidden="true" />
                  <SwappingText
                    className={`${prefix}__n`}
                    value={numberFormat.format(runningCount)}
                    prefix={prefix}
                  />
                  <span className={`${prefix}__word`}>{text.running}</span>
                </span>
              )}
              {runningCount > 0 && needsYouCount > 0 && (
                <span className={`${prefix}__sep`} aria-hidden="true">
                  ·
                </span>
              )}
              {needsYouCount > 0 && (
                <span className={`${prefix}__part`}>
                  <span className={`${prefix}__dot`} aria-hidden="true" />
                  <SwappingText
                    className={`${prefix}__n`}
                    value={numberFormat.format(needsYouCount)}
                    prefix={prefix}
                  />
                  <span className={`${prefix}__word`}>{needsYouLabel}</span>
                </span>
              )}
            </>
          ) : pausedCount > 0 ? (
            <span className={`${prefix}__part`}>
              <span className={`${prefix}__ring`} data-idle="" aria-hidden="true" />
              <SwappingText
                className={`${prefix}__n`}
                value={numberFormat.format(pausedCount)}
                prefix={prefix}
              />
              <span className={`${prefix}__word`}>{text.pausedCount}</span>
            </span>
          ) : (
            <span className={`${prefix}__part`}>
              <span className={`${prefix}__ring`} data-idle="" aria-hidden="true" />
              <span className={`${prefix}__word`}>{text.idle}</span>
            </span>
          )}
          <ChevronIcon prefix={prefix} />
        </button>
        <div
          ref={panelRef}
          id={panelId}
          className={`${prefix}__panel`}
          style={horizontalOffset ? { translate: `${horizontalOffset}px 0` } : undefined}
          role="dialog"
          aria-label={text.title}
          tabIndex={-1}
          hidden={!isOpen}
          onKeyDown={handlePanelKeyDown}
          onFocus={handlePanelFocus}
        >
          <div className={`${prefix}__head`}>
            <span className={`${prefix}__label`}>{text.title}</span>
            <span className={`${prefix}__count`}>
              {numberFormat.format(visibleTasks.length)}
            </span>
          </div>
          <div className={`${prefix}__body`}>
            {visibleTasks.length ? (
              <ul ref={listRef} className={`${prefix}__list`}>
                {visibleTasks.map((task) => (
                  <TaskRow
                    task={task}
                    labels={text}
                    onPause={onPause}
                    onResume={onResume}
                    onOpen={onOpen}
                    prefix={prefix}
                    key={task.id}
                  />
                ))}
              </ul>
            ) : (
              <p className={`${prefix}__empty`}>{text.empty}</p>
            )}
          </div>
          {onOpenAll && (
            <div className={`${prefix}__foot`}>
              <button type="button" className={`${prefix}__all`} onClick={onOpenAll}>
                <TasksIcon />
                <span>{text.openAll}</span>
                <ArrowIcon prefix={prefix} />
              </button>
            </div>
          )}
        </div>
        <span className={`${prefix}__sr`} role="status" aria-live="polite">
          {announcement}
        </span>
      </div>
    </>
  );
}
const defaultLabels = {
  title: "Background tasks",
  running: "running",
  needsYou: "need you",
  needsYouOne: "needs you",
  needsYouBadge: "Needs you",
  paused: "Paused",
  pausedCount: "paused",
  done: "Done",
  pause: "Pause",
  resume: "Resume",
  open: "Open",
  openAll: "Open Tasks",
  empty: "Nothing running right now",
  idle: "No tasks running",
};
const numberFormat = new Intl.NumberFormat("en-US");
const StrokeIcon = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox={`0 0 24 24`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    {children}
  </svg>
);
const PauseIcon = () => (
  <StrokeIcon>
    <path
      d={`M4 7C4 5.59 4 4.88 4.44 4.44C4.88 4 5.59 4 7 4C8.41 4 9.12 4 9.56 4.44C10 4.88 10 5.59 10 7V17C10 18.41 10 19.12 9.56 19.56C9.12 20 8.41 20 7 20C5.59 20 4.88 20 4.44 19.56C4 19.12 4 18.41 4 17V7Z`}
    />
    <path
      d={`M14 7C14 5.59 14 4.88 14.44 4.44C14.88 4 15.59 4 17 4C18.41 4 19.12 4 19.56 4.44C20 4.88 20 5.59 20 7V17C20 18.41 20 19.12 19.56 19.56C19.12 20 18.41 20 17 20C15.59 20 14.88 20 14.44 19.56C14 19.12 14 18.41 14 17V7Z`}
    />
  </StrokeIcon>
);
const PlayIcon = () => (
  <StrokeIcon>
    <path
      d={`M18.89 12.85C18.54 14.19 16.87 15.14 13.53 17.04C10.3 18.87 8.68 19.79 7.38 19.42C6.84 19.27 6.35 18.98 5.96 18.58C5 17.61 5 15.74 5 12C5 8.26 5 6.39 5.96 5.42C6.35 5.02 6.84 4.73 7.38 4.58C8.68 4.21 10.3 5.13 13.53 6.96C16.87 8.86 18.54 9.81 18.89 11.15C19.04 11.71 19.04 12.29 18.89 12.85Z`}
    />
  </StrokeIcon>
);
const CheckIcon = () => (
  <StrokeIcon>
    <path d={`M5 14L8.5 17.5L19 6.5`} />
  </StrokeIcon>
);
const TasksIcon = () => (
  <StrokeIcon>
    <path
      d={`M13.5 2H8.5C7.67 2 7 2.67 7 3.5C7 4.33 7.67 5 8.5 5H13.5C14.33 5 15 4.33 15 3.5C15 2.67 14.33 2 13.5 2Z`}
    />
    <path d={`M7 15H10.43M7 11H15`} />
    <path
      d={`M19 13.5V9.48C19 6.65 19 5.24 18.12 4.36C17.48 3.72 16.55 3.55 15 3.5M12 22L9 22C6.17 22 4.76 22 3.88 21.12C3 20.24 3 18.83 3 16L3 9.48C3 6.65 3 5.24 3.88 4.36C4.52 3.72 5.44 3.55 7 3.5`}
    />
    <path d={`M14 20C14 20 15 20 16 22C16 22 18.17 17 21 16`} />
  </StrokeIcon>
);
const ChevronIcon = ({ prefix }: { prefix: string }) => (
  <svg
    className={`${prefix}__chev`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M18 9C18 9 13.58 15 12 15C10.42 15 6 9 6 9`} />
  </svg>
);
const ArrowIcon = ({ prefix }: { prefix: string }) => (
  <svg
    className={`${prefix}__chev`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M9 6C9 6 15 10.42 15 12C15 13.58 9 18 9 18`} />
  </svg>
);
export { RunningNow };
export type { RunningNowProps };
export type { RunningNowLabels };
export type { RunningTask };
