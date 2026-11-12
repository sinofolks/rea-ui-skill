"use client";

import "./FanoutGrid.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  memo,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type FanoutTask = {
  id?: string | number;
  label?: ReactNode;
  worker?: string | number;
  start?: number;
  cost?: number;
  status?: "queued" | "running" | "retrying" | "done" | "failed";
  attempts?: number;
  error?: ReactNode;
  end?: number;
  result?: ReactNode;
  [field: string]: unknown;
};
interface FanoutGridProps {
  tasks: FanoutTask[];
  job?: string;
  workers?: number;
  now?: number;
  onRetry?: (ids: string[]) => void;
  onSelect?: (task: FanoutTask | null) => void;
  formatCost?: (amount: number) => string;
  title?: string;
  icon?: ReactNode;
  className?: string;
}
type TaskStatus = NonNullable<FanoutTask["status"]>;
interface Task {
  source: FanoutTask;
  id: string;
  label: ReactNode;
  worker: string;
  status: TaskStatus | undefined;
  start: number | undefined;
  end: number | undefined;
  cost: number | undefined;
  attempts: number | undefined;
  error: ReactNode;
  result: ReactNode;
}
type CustomStyle = CSSProperties & Record<`--${string}`, number | string>;
interface TaskCellProps {
  index: number;
  prefix: string;
  status: TaskStatus | undefined;
  dimmed: boolean;
  active: boolean;
  pinned: boolean;
  setCellRef: (index: number, element: HTMLSpanElement | null) => void;
  onEnter: (index: number) => void;
  onPick: (index: number) => void;
}
interface FanoutGridViewProps extends FanoutGridProps {
  clean: boolean;
}
function FanoutGrid(props: FanoutGridProps) {
  return <FanoutGridView {...props} clean={false} />;
}
function finiteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
/** Keep the public task for selection callbacks; narrow extensible display data here. */
function normalizeTask(source: FanoutTask): Task {
  return {
    source,
    id:
      typeof source.id === "string" || typeof source.id === "number"
        ? String(source.id)
        : "",
    label: source.label,
    worker: source.worker == null ? "" : String(source.worker),
    status: source.status,
    start: finiteNumber(source.start),
    end: finiteNumber(source.end),
    cost: finiteNumber(source.cost),
    attempts: finiteNumber(source.attempts),
    error: source.error,
    result: source.result,
  };
}
function formatCost_task_summary(amount: number): string {
  if (amount === 0) return "$0";
  if (amount < 0.001) return "<$0.001";
  if (amount < 0.01) return `$${amount.toFixed(3)}`;
  if (amount < 100) return `$${amount.toFixed(2)}`;
  return `$${Math.round(amount).toLocaleString("en-US")}`;
}
function formatDuration(milliseconds: number): string {
  const duration = Number.isFinite(milliseconds) ? Math.max(0, milliseconds) : 0;
  if (duration < 1000) return `${Math.round(duration)}ms`;
  if (duration < 10000) return `${(duration / 1000).toFixed(1)}s`;
  const seconds = Math.round(duration / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${String(minutes % 60).padStart(2, "0")}m`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function formatCount(count: number): string {
  return count.toLocaleString("en-US");
}
function summarizeTasks(tasks: Task[], workers: number | undefined, now: number) {
  const counts: Record<TaskStatus, number> = {
    done: 0,
    running: 0,
    retrying: 0,
    failed: 0,
    queued: 0,
  };
  for (const task of tasks) if (task.status) counts[task.status]++;
  const total = tasks.length;
  const completed = counts.done + counts.failed;
  const cost = tasks.reduce((sum, task) => sum + (task.cost ?? 0), 0);
  const finished = total > 0 && completed === total;
  const completedDurations = tasks.flatMap((task) =>
    task.status === "done" && task.start !== undefined && task.end !== undefined
      ? [task.end - task.start]
      : [],
  );
  const averageDuration = completedDurations.length
    ? completedDurations.reduce((sum, duration) => sum + duration, 0) /
      completedDurations.length
    : 0;
  const remaining = total - completed;
  const workerCount = Math.max(
    1,
    finiteNumber(workers) ?? counts.running + counts.retrying,
  );
  const estimatedRemaining =
    completedDurations.length >= 3 && remaining > 0
      ? (averageDuration * remaining) / workerCount
      : null;
  const elapsed = finished
    ? tasks.reduce((latest, task) => Math.max(latest, task.end ?? 0), 0)
    : (finiteNumber(now) ?? 0);
  return {
    counts,
    total,
    completed,
    cost,
    finished,
    estimatedRemaining,
    elapsed,
  };
}
function taskMetadata(
  task: Task,
  now: number,
  costFormatter: (amount: number) => string,
): string {
  const duration =
    task.start === undefined
      ? undefined
      : formatDuration(
          (task.end ?? Math.max(finiteNumber(now) ?? 0, task.start)) - task.start,
        );
  const attempts =
    (task.attempts ?? 1) > 1 ? `${formatCount(task.attempts!)} attempts` : undefined;
  return (
    [task.worker, duration, task.cost ? costFormatter(task.cost) : undefined, attempts]
      .filter(Boolean)
      .join(" · ") || "Waiting for a worker"
  );
}
function FanoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="3" cy="8" r="1.9" fill="currentColor" />
      <rect
        x="10.2"
        y="1.6"
        width="3.6"
        height="3.6"
        rx="1"
        fill="currentColor"
        opacity="0.9"
      />
      <rect
        x="10.2"
        y="6.2"
        width="3.6"
        height="3.6"
        rx="1"
        fill="currentColor"
        opacity="0.6"
      />
      <rect
        x="10.2"
        y="10.8"
        width="3.6"
        height="3.6"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M4.9 8H7c.6 0 .9-.3 1-.9l.4-2.4c.1-.6.4-.9 1-.9h.6M4.9 8h5.1M4.9 8H7c.6 0 .9.3 1 .9l.4 2.4c.1.6.4.9 1 .9h.6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
function RetryIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
function FanoutGridView({
  tasks: inputTasks,
  job,
  workers,
  now = 0,
  onRetry,
  onSelect,
  formatCost = formatCost_task_summary,
  title = "Fan-out",
  icon,
  className,
  clean,
}: FanoutGridViewProps) {
  const prefix = clean ? "ui-fogc" : "ui-fog";
  const tasks = inputTasks.map(normalizeTask);
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tooltipId = `${useId()}-tip`;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pinnedTaskId, setPinnedTaskId] = useState<string | null>(null);
  const [keyboardIndex, setKeyboardIndex] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | null>(null);
  const { counts, total, completed, cost, finished, estimatedRemaining, elapsed } =
    summarizeTasks(tasks, workers, now);
  const pinnedIndex = pinnedTaskId
    ? tasks.findIndex((task) => task.id === pinnedTaskId)
    : -1;
  const activeIndex = pinnedIndex >= 0 ? pinnedIndex : (hoveredIndex ?? keyboardIndex);
  const activeTask =
    activeIndex !== null && activeIndex >= 0 ? tasks[activeIndex] : undefined;
  function togglePin(index: number | null) {
    const task = index === null ? undefined : tasks[index];
    const nextId = task && task.id !== pinnedTaskId ? task.id : null;
    setPinnedTaskId(nextId);
    onSelect?.(nextId && task ? task.source : null);
  }
  // Cells keep stable event props while the selection handler sees current task data.
  const togglePinRef = useRef(togglePin);
  togglePinRef.current = togglePin;
  const handlePick = useCallback((index: number) => togglePinRef.current(index), []);
  const setCellRef = useCallback((index: number, element: HTMLSpanElement | null) => {
    cellRefs.current[index] = element;
  }, []);
  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    const panel = panelRef.current;
    const cell = activeIndex === null ? null : cellRefs.current[activeIndex];
    if (!tooltip || !panel || !cell) return;
    const panelRect = panel.getBoundingClientRect();
    const scale = panel.offsetWidth ? panelRect.width / panel.offsetWidth : 1;
    const cellRect = cell.getBoundingClientRect();
    const center = (cellRect.left + cellRect.width / 2 - panelRect.left) / scale;
    const cellTop = (cellRect.top - panelRect.top) / scale;
    const cellBottom = (cellRect.bottom - panelRect.top) / scale;
    const below = cellTop - tooltip.offsetHeight - 10 < 4;
    const left = Math.max(
      8,
      Math.min(
        center - tooltip.offsetWidth / 2,
        panel.offsetWidth - tooltip.offsetWidth - 8,
      ),
    );
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${below ? cellBottom + 10 : cellTop - tooltip.offsetHeight - 10}px`;
    tooltip.style.setProperty("--x", `${center - left}px`);
    tooltip.dataset.side = below ? "below" : "above";
  });
  function columnCount(): number {
    const first = cellRefs.current[0];
    if (!first || !gridRef.current) return 1;
    let columns = 0;
    for (const cell of cellRefs.current) {
      if (!cell || cell.offsetTop !== first.offsetTop) break;
      columns++;
    }
    return Math.max(1, columns);
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!total) return;
    const columns = columnCount();
    const current = keyboardIndex ?? 0;
    const moves: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: columns,
      ArrowUp: -columns,
      Home: -current,
      End: total - 1 - current,
    };
    if (event.key in moves) {
      event.preventDefault();
      setPinnedTaskId(null);
      setKeyboardIndex(
        Math.max(
          0,
          Math.min(total - 1, keyboardIndex === null ? 0 : current + moves[event.key]),
        ),
      );
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePin(current);
    } else if (event.key === "Escape") {
      setPinnedTaskId(null);
      setKeyboardIndex(null);
      onSelect?.(null);
    }
  }
  const announcementStep = total ? Math.floor((completed / total) * 10) : 0;
  const announcement = finished
    ? `Finished: ${formatCount(counts.done)} done, ${formatCount(counts.failed)} failed, ${formatCost(cost)}.`
    : `${formatCount(counts.done)} of ${formatCount(total)} done${counts.failed ? `, ${formatCount(counts.failed)} failed` : ""}.`;
  const footer = (
    <div className={`${prefix}__foot`}>
      <div className={`${prefix}__legend`} role="group" aria-label="Show only">
        {LEGEND_STATUSES.map((status) => (
          <button
            type="button"
            className={`${prefix}__key`}
            data-status={status}
            aria-pressed={statusFilter === status}
            data-off={statusFilter && statusFilter !== status ? "" : undefined}
            data-zero={counts[status] === 0 && status !== "done" ? "" : undefined}
            onClick={() =>
              setStatusFilter((current) => (current === status ? null : status))
            }
            key={status}
          >
            <span className={`${prefix}__swatch`} aria-hidden="true" />
            <span className={`${prefix}__n`}>{formatCount(counts[status])}</span>{" "}
            {STATUS_LABELS[status].toLowerCase()}
          </button>
        ))}
      </div>
      {onRetry && counts.failed > 0 && (
        <button
          type="button"
          className={`${prefix}__retry`}
          onClick={() =>
            onRetry(
              tasks.filter((task) => task.status === "failed").map((task) => task.id),
            )
          }
        >
          <RetryIcon />
          {"Retry failed"}
        </button>
      )}
    </div>
  );
  return (
    <div className={[prefix, className].filter(Boolean).join(" ")}>
      <header className={`${prefix}__bar`}>
        <span className={`${prefix}__mark`}>{icon ?? <FanoutIcon />}</span>
        <span className={`${prefix}__title`} title={title}>
          {title}
        </span>
        {job && (
          <span className={`${prefix}__job`} dir="auto" title={job}>
            {job}
          </span>
        )}
        <span className={`${prefix}__sum`}>
          <span>
            <b>{formatCount(counts.done)}</b>
            {" / "}
            {formatCount(total)}
          </span>
          <span>
            <b>{formatCost(cost)}</b>
          </span>
          <span className={`${prefix}__time`} data-done={finished ? "" : undefined}>
            {finished
              ? `Finished in ${formatDuration(elapsed)}`
              : estimatedRemaining === null
                ? `${formatDuration(elapsed)} so far`
                : `~${formatDuration(estimatedRemaining)} left`}
          </span>
        </span>
      </header>
      <div ref={panelRef} className={`${prefix}__panel`}>
        <div
          ref={gridRef}
          className={`${prefix}__grid`}
          role="group"
          aria-label={`${formatCount(total)} tasks – arrow keys move, Enter keeps the details`}
          aria-describedby={activeTask ? tooltipId : undefined}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseLeave={() => setHoveredIndex(null)}
          onBlur={() => setKeyboardIndex(null)}
        >
          {tasks.map((task, index) => (
            <TaskCell_fan_out_grid
              index={index}
              prefix={prefix}
              status={task.status}
              dimmed={!!statusFilter && statusFilter !== task.status}
              active={activeIndex === index}
              pinned={pinnedTaskId === task.id}
              setCellRef={setCellRef}
              onEnter={setHoveredIndex}
              onPick={handlePick}
              key={task.id}
            />
          ))}
        </div>
        {clean && footer}
        {activeTask && (
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={`${prefix}__tip`}
            data-status={activeTask.status}
            key={activeTask.id}
          >
            <span className={`${prefix}__tip-head`}>
              <span className={`${prefix}__tip-label`} dir="auto">
                {activeTask.label}
              </span>
              <span className={`${prefix}__pill`} data-status={activeTask.status}>
                {activeTask.status ? STATUS_LABELS[activeTask.status] : undefined}
              </span>
            </span>
            <span className={`${prefix}__tip-meta`}>
              {taskMetadata(activeTask, now, formatCost)}
            </span>
            {activeTask.error &&
              (activeTask.status === "failed" || activeTask.status === "retrying") && (
                <span className={`${prefix}__tip-error`} dir="auto">
                  {activeTask.error}
                </span>
              )}
            {activeTask.result && activeTask.status === "done" && (
              <span className={`${prefix}__tip-result`} dir="auto">
                {activeTask.result}
              </span>
            )}
          </div>
        )}
      </div>
      {!clean && footer}
      <div
        className={`${prefix}__sr`}
        aria-live="polite"
        aria-atomic="true"
        data-step={announcementStep}
      >
        {announcement}
      </div>
    </div>
  );
}
const LEGEND_STATUSES = ["done", "running", "retrying", "failed"] as const;
const STATUS_LABELS: Record<TaskStatus, string> = {
  queued: "Queued",
  running: "Running",
  retrying: "Retrying",
  done: "Done",
  failed: "Failed",
};
const TaskCell_fan_out_grid = memo(function TaskCell({
  index,
  prefix,
  status,
  dimmed,
  active,
  pinned,
  setCellRef,
  onEnter,
  onPick,
}: TaskCellProps) {
  return (
    <span
      ref={(element) => setCellRef(index, element)}
      className={`${prefix}__cell`}
      data-status={status}
      data-dim={dimmed ? "" : undefined}
      data-on={active ? "" : undefined}
      data-pinned={pinned ? "" : undefined}
      style={{ "--i": index, "--d": Math.min(index, 240) } as CustomStyle}
      onMouseEnter={() => onEnter(index)}
      onClick={() => onPick(index)}
    />
  );
});
export { FanoutGrid };
export type { FanoutTask };
export type { FanoutGridProps };
