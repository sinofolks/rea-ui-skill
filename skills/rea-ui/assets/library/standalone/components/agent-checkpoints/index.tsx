"use client";

import "./AgentCheckpoints.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type Checkpoint = {
  id?: string;
  parent?: string;
  icon?: ReactNode;
  title?: string;
  files?: number;
  cost?: number;
  at?: number;
  status?: "running" | "done" | "failed" | "stopped";
  /** Legacy metadata; presentation is determined by status. */
  fail?: unknown;
  [field: string]: unknown;
};
interface AgentCheckpointsProps {
  checkpoints: Checkpoint[];
  head?: string;
  onRewind?: (checkpoint: Checkpoint) => void;
  task?: string;
  formatTime?: (ms: number) => string;
  formatCost?: (amount: number) => string;
  title?: string;
  className?: string;
}
type NormalizedCheckpoint = Omit<Checkpoint, "at" | "files" | "cost" | "icon"> & {
  id?: string;
  parent?: string;
  title?: string;
  status?: Checkpoint["status"];
  at?: number;
  files?: number;
  cost?: number;
  icon?: ReactNode;
};
interface CheckpointRow {
  checkpoint: NormalizedCheckpoint;
  row: number;
  lane: number;
  parentRow?: number;
  parentLane?: number;
  attempt?: number;
}
type LayoutStyle = CSSProperties & Record<`--${string}`, number | string>;
function AgentCheckpoints(props: AgentCheckpointsProps) {
  return <AgentCheckpointsView {...props} clean={false} />;
}
function finiteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function normalizeCheckpoint(checkpoint: Checkpoint): NormalizedCheckpoint {
  return {
    ...checkpoint,
    icon: checkpoint.icon,
    at: finiteNumber(checkpoint.at),
    files: finiteNumber(checkpoint.files),
    cost: finiteNumber(checkpoint.cost),
  };
}
/** Assign graph lanes in display order, preserving the first occurrence of each id. */
function layoutCheckpoints(checkpoints: NormalizedCheckpoint[]): CheckpointRow[] {
  const firstIndex = new Map<string | undefined, number>();
  checkpoints.forEach((checkpoint, index) => {
    if (!firstIndex.has(checkpoint.id)) firstIndex.set(checkpoint.id, index);
  });
  const lastRowInLane: number[] = [];
  const parentsWithChild = new Set<string | undefined>();
  const rows: CheckpointRow[] = [];
  let attempt = 1;
  function availableLane(afterRow: number): number {
    let lane = 0;
    while ((lastRowInLane[lane] ?? -1) >= afterRow) lane++;
    return lane;
  }
  checkpoints.forEach((checkpoint, row) => {
    const parentIndex =
      checkpoint.parent === undefined ? undefined : firstIndex.get(checkpoint.parent);
    const parent =
      parentIndex !== undefined && parentIndex < row ? rows[parentIndex] : undefined;
    let lane: number;
    let branchAttempt: number | undefined;
    if (
      parent &&
      !parentsWithChild.has(parent.checkpoint.id) &&
      lastRowInLane[parent.lane] === parent.row
    ) {
      lane = parent.lane;
    } else {
      lane = availableLane(parent ? parent.row : row);
      if (row > 0) branchAttempt = ++attempt;
    }
    if (parent) parentsWithChild.add(parent.checkpoint.id);
    lastRowInLane[lane] = row;
    rows.push({
      checkpoint,
      row,
      lane,
      parentRow: parent?.row,
      parentLane: parent?.lane,
      attempt: branchAttempt,
    });
  });
  return rows;
}
function connectorPath(row: CheckpointRow, rowHeight: number): string {
  const fromX = laneCenter(row.parentLane!);
  const fromY = rowCenter(row.parentRow!, rowHeight);
  const toX = laneCenter(row.lane);
  const toY = rowCenter(row.row, rowHeight);
  if (fromX === toX) return `M${fromX} ${fromY}V${toY}`;
  const bendY = fromY + rowHeight * 0.85;
  return `M${fromX} ${fromY}C${fromX} ${fromY + rowHeight * 0.5} ${toX} ${bendY - rowHeight * 0.45} ${toX} ${bendY}V${toY}`;
}
function formatCheckpointTime(milliseconds: number): string {
  const seconds = Math.max(0, Math.round(milliseconds / 1000));
  const pad = (value: number) => String(value).padStart(2, "0");
  return seconds >= 3600
    ? `${Math.floor(seconds / 3600)}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`
    : `${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;
}
function formatCheckpointCost(amount: number): string {
  return amount !== 0 && Math.abs(amount) < 0.005
    ? `${amount < 0 ? "-" : ""}<$0.01`
    : currency.format(amount);
}
function CheckpointsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 2.5v11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M5 8c0 2 1.6 2.6 3.2 2.6H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="5" cy="5" r="2.25" fill="currentColor" />
      <circle cx="11.25" cy="10.6" r="2.25" fill="currentColor" />
    </svg>
  );
}
function FilesIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M1.4 3.1c0-.72.58-1.3 1.3-1.3h1.72c.38 0 .73.19.94.5l.6.9h3.34c.72 0 1.3.58 1.3 1.3V6H1.4Z"
        fill="currentColor"
      />
      <path
        d="M1 6.95C.86 6.3 1.36 5.7 2.02 5.7h7.96c.66 0 1.16.6 1.02 1.25l-.5 2.4a1.3 1.3 0 0 1-1.27 1.05H2.77A1.3 1.3 0 0 1 1.5 9.35Z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  );
}
function RewindIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.6 3.6A4 4 0 1 1 2 6.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M2.2 1.6v2.4h2.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function AgentCheckpointsView({
  checkpoints,
  head,
  onRewind,
  task,
  formatTime = formatCheckpointTime,
  formatCost = formatCheckpointCost,
  title = "Checkpoints",
  className,
  clean,
}: AgentCheckpointsProps & {
  clean: boolean;
}) {
  const prefix = clean ? "ui-ackc" : "ui-ack";
  const rowHeight = clean ? 30 : 32;
  const bottomPadding = clean ? 10 : 8;
  const titleId = useId();
  const graphId = `${prefix}-${titleId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const listRef = useRef<HTMLOListElement>(null);
  const [focusedId, setFocusedId] = useState<string | undefined | null>(null);
  const normalized = checkpoints.map(normalizeCheckpoint);
  const rows = layoutCheckpoints(normalized);
  const rowsById = new Map(rows.map((row) => [row.checkpoint.id, row]));
  const headRow =
    (head !== undefined ? rowsById.get(head) : undefined) || rows[rows.length - 1];
  const activeRows = new Set<number>();
  for (
    let row: CheckpointRow | undefined = headRow;
    row;
    row = row.parentRow === undefined ? undefined : rows[row.parentRow]
  )
    activeRows.add(row.row);
  const laneCount = Math.max(1, ...rows.map((row) => row.lane + 1));
  const attemptCount = 1 + rows.filter((row) => row.attempt).length;
  const hasCost = normalized.some((checkpoint) => checkpoint.cost !== undefined);
  const totalCost = normalized.reduce(
    (total, checkpoint) => total + (checkpoint.cost ?? 0),
    0,
  );
  const tabStopId =
    focusedId !== null && rowsById.has(focusedId) ? focusedId : headRow?.checkpoint.id;
  const [maxHeight, setMaxHeight] = useState(Infinity);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list) setMaxHeight(parseFloat(getComputedStyle(list).maxHeight) || Infinity);
  }, [rows.length > 0]);
  const totalHeight = rows.length * rowHeight + bottomPadding;
  const scrolls = totalHeight > maxHeight;
  useEffect(() => {
    const list = listRef.current;
    if (!list || !headRow || !scrolls) return;
    const viewportHeight = Math.min(totalHeight, maxHeight);
    const headTop = headRow.row * rowHeight;
    if (headTop < list.scrollTop) list.scrollTo({ top: headTop, behavior: "smooth" });
    else if (headTop + rowHeight > list.scrollTop + viewportHeight - bottomPadding)
      list.scrollTo({
        top: headTop + rowHeight - viewportHeight + bottomPadding,
        behavior: "smooth",
      });
  }, [headRow?.checkpoint.id, rows.length, scrolls]);
  function navigateRows(event: KeyboardEvent<HTMLOListElement>) {
    const currentIndex = rows.findIndex((row) => row.checkpoint.id === tabStopId);
    const nextIndex =
      event.key === "ArrowDown"
        ? currentIndex + 1
        : event.key === "ArrowUp"
          ? currentIndex - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? rows.length - 1
              : -1;
    if (
      nextIndex < 0 ||
      nextIndex >= rows.length ||
      (event.key !== "Home" && event.key !== "End" && currentIndex < 0)
    )
      return;
    event.preventDefault();
    setFocusedId(rows[nextIndex]!.checkpoint.id);
    listRef.current?.querySelectorAll<HTMLElement>(`.${prefix}__row`)[nextIndex]?.focus();
  }
  function rewind(row: CheckpointRow) {
    if (onRewind && row !== headRow) onRewind(row.checkpoint);
  }
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      style={
        {
          [`--${prefix}-gutter`]: `${LEFT_GUTTER + (laneCount - 1) * LANE_WIDTH + 16}px`,
        } as LayoutStyle
      }
    >
      <header className={`${prefix}__head`}>
        <span className={`${prefix}__mark`}>
          <CheckpointsIcon />
        </span>
        <span className={`${prefix}__title`} id={titleId} dir="auto" title={title}>
          {title}
        </span>
        {task && (
          <span className={`${prefix}__task`} dir="auto" title={task}>
            {task}
          </span>
        )}
        <span className={`${prefix}__sum`} aria-live="polite">
          {plural(rows.length, "checkpoint")}
          {attemptCount > 1 && <> · {plural(attemptCount, "attempt")}</>}
          {hasCost && <> · {formatCost(totalCost)}</>}
        </span>
      </header>
      {rows.length === 0 ? (
        <p className={`${prefix}__empty`}>No checkpoints yet</p>
      ) : (
        <ol
          ref={listRef}
          className={`${prefix}__list`}
          style={{ [`--${prefix}-rows`]: rows.length } as LayoutStyle}
          data-scrolls={scrolls ? "" : undefined}
          aria-labelledby={titleId}
          onKeyDown={navigateRows}
        >
          <svg
            className={`${prefix}__rail`}
            width={LEFT_GUTTER + laneCount * LANE_WIDTH}
            height={rows.length * rowHeight}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`${graphId}-glint`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {rows.map(
              (row) =>
                row.parentRow !== undefined && (
                  <path
                    className={`${prefix}__line`}
                    d={connectorPath(row, rowHeight)}
                    pathLength={1}
                    data-live={activeRows.has(row.row) ? "" : undefined}
                    data-fork={row.lane === row.parentLane ? undefined : ""}
                    key={`${row.checkpoint.id}:line`}
                  />
                ),
            )}
            {rows.map((row) => (
              <g
                className={`${prefix}__dot`}
                data-live={activeRows.has(row.row) ? "" : undefined}
                data-head={row === headRow ? "" : undefined}
                data-status={row.checkpoint.status ?? "done"}
                key={`${row.checkpoint.id}:dot`}
              >
                <circle
                  cx={laneCenter(row.lane)}
                  cy={rowCenter(row.row, rowHeight)}
                  r={row === headRow ? 4.5 : 3.5}
                />
                {row === headRow && (
                  <>
                    <clipPath id={`${graphId}-${row.row}`}>
                      <circle
                        cx={laneCenter(row.lane)}
                        cy={rowCenter(row.row, rowHeight)}
                        r={4.5}
                      />
                    </clipPath>
                    <g clipPath={`url(#${graphId}-${row.row})`}>
                      <rect
                        className={`${prefix}__glint`}
                        x={laneCenter(row.lane) - 4}
                        y={rowCenter(row.row, rowHeight) - 8}
                        width={8}
                        height={16}
                        fill={`url(#${graphId}-glint)`}
                      />
                    </g>
                  </>
                )}
              </g>
            ))}
          </svg>
          {rows.map((row) => {
            const checkpoint = row.checkpoint;
            const status = checkpoint.status ?? "done";
            const current = row === headRow;
            const canRewind = !!onRewind && !current;
            return (
              <li
                className={`${prefix}__row`}
                tabIndex={tabStopId === checkpoint.id ? 0 : -1}
                data-live={activeRows.has(row.row) ? "" : undefined}
                data-head={current ? "" : undefined}
                data-status={status}
                aria-current={current ? "step" : undefined}
                aria-label={`${checkpoint.title}${row.attempt ? `, attempt ${row.attempt}` : ""}${status === "done" ? "" : `, ${status}`}${current ? ", current" : activeRows.has(row.row) ? "" : ", left behind"}${canRewind ? " – press Enter to rewind here" : ""}`}
                onFocus={() => setFocusedId(checkpoint.id)}
                onKeyDown={(event) => {
                  if (
                    (event.key === "Enter" || event.key === " ") &&
                    event.target === event.currentTarget
                  ) {
                    event.preventDefault();
                    rewind(row);
                  }
                }}
                key={checkpoint.id}
              >
                {checkpoint.icon && (
                  <span className={`${prefix}__icon`}>{checkpoint.icon}</span>
                )}
                <span className={`${prefix}__name`} dir="auto" title={checkpoint.title}>
                  {checkpoint.title}
                </span>
                {row.attempt && (
                  <span className={`${prefix}__attempt`}>Attempt {row.attempt}</span>
                )}
                {status === "failed" && (
                  <span className={`${prefix}__badge`}>Failed</span>
                )}
                <span className={`${prefix}__meta`} aria-hidden="true">
                  {status === "stopped" && (
                    <span className={`${prefix}__stopped`}>Stopped</span>
                  )}
                  {checkpoint.files !== undefined && checkpoint.files > 0 && (
                    <span className={`${prefix}__files`}>
                      <FilesIcon />
                      {plural(checkpoint.files, "file")}
                    </span>
                  )}
                  {checkpoint.at !== undefined && (
                    <span className={`${prefix}__time`}>{formatTime(checkpoint.at)}</span>
                  )}
                </span>
                {canRewind && (
                  <button
                    type="button"
                    className={`${prefix}__rewind`}
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={() => rewind(row)}
                  >
                    <RewindIcon />
                    Rewind
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
const LANE_WIDTH = 14;
const LEFT_GUTTER = 22;
const laneCenter = (lane: number) => LEFT_GUTTER + lane * LANE_WIDTH;
const rowCenter = (row: number, rowHeight: number) => row * rowHeight + rowHeight / 2;
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const plural = (count: number, noun: string) =>
  `${count} ${noun}${count === 1 ? "" : "s"}`;
export { AgentCheckpoints };
export type { Checkpoint };
export type { AgentCheckpointsProps };
