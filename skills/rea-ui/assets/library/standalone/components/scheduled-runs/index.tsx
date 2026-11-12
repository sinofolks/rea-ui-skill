"use client";

import "./ScheduledRuns.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  Fragment,
  type CSSProperties,
} from "react";
interface ScheduledTask {
  id?: string;
  title?: string;
  agent?: string;
  detail?: string;
  usage?: number;
  logo?: ReactNode;
  stats?: Array<{
    icon?: string;
    value?: number;
    label?: string;
    [field: string]: unknown;
  }>;
  at?: {
    day?: number;
    session?: number;
    [field: string]: unknown;
  };
  [field: string]: unknown;
}
/** A scheduled share of an original task; splitting retains the original task object. */
interface ScheduledPart {
  task: ScheduledTask;
  day: number;
  session: number;
  usage: number;
  part: number;
  parts: number;
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
}
interface ScheduledRunsProps {
  tasks: ScheduledTask[];
  days?: (
    | string
    | {
        name: ReactNode;
        date?: ReactNode;
      }
  )[];
  sessions?: string[];
  now?: {
    day: string | number;
    session: string | number;
  };
  limit?: number;
  minPiece?: number;
  agents?: {
    name: string;
    logo?: ReactNode;
  }[];
  defaultMode?: "auto" | "manual";
  autoRun?: boolean | number;
  loop?: boolean;
  title?: string;
  note?: string;
  onScheduled?: (parts: ScheduledPart[]) => void;
  onPlace?: (task: ScheduledTask, parts: ScheduledPart[]) => void;
  onMove?: (
    part: ScheduledPart,
    to: {
      day: string | number;
      session: string | number;
    },
  ) => void;
  className?: string;
}
interface SessionCapacity {
  used: number[];
  count: number[];
}
interface Allocation {
  cell: number;
  usage: number;
}
interface ScheduleEntry {
  key: string;
  task: ScheduledTask;
  cell: number;
  usage: number;
  part: number;
  parts: number;
  booked?: boolean;
  manual?: boolean;
}
type DragSource =
  | {
      kind: "task";
      id: ScheduledTask["id"];
    }
  | {
      kind: "card";
      key: string;
      from: number;
      usage: number;
    };
interface Flight {
  id: ScheduledTask["id"];
  key: string;
  rest: ScheduleEntry[];
}
interface ScheduleDragAPI {
  over: number | null;
  fits: (cell: number, source: DragSource) => boolean;
  drop: (cell: number, source: DragSource) => void;
}
interface KeyboardDrag {
  source: DragSource;
  cell: number;
  origin: HTMLElement;
}
interface TileContext {
  prefix: string;
  schedule: ReturnType<typeof useSchedule>;
  drag: ReturnType<typeof useScheduleDrag>;
}
function ScheduledRuns(props: ScheduledRunsProps) {
  return <ScheduledRunsView {...props} />;
}
function usageShare(usage: number | undefined, limit: number): string {
  return typeof usage === "number" && Number.isFinite(usage)
    ? percentage((Math.max(1, usage) / limit) * 100)
    : "–";
}
function statValue(value: number | undefined): string {
  return typeof value === "number" && value >= 10000
    ? new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(value)
    : String(value);
}
/** Reserve whole small tasks; split larger tasks only into useful pieces. */
function allocateTask(
  task: ScheduledTask,
  start: number,
  capacity: SessionCapacity,
  limit: number,
  minPiece: number,
  mode?: "booked" | "drop",
  earliest = start,
): Allocation[] | null {
  let remaining = taskUsage(task);
  if (remaining <= 0) return null;
  const whole = remaining <= limit && mode !== "drop",
    allocations: Allocation[] = [];
  const candidates = Array.from(
    { length: capacity.used.length },
    (_, index) => index,
  ).filter((index) => index >= start);
  if (mode === "drop")
    for (let cell = earliest; cell < start; cell++) candidates.push(cell);
  for (const cell of candidates) {
    if (remaining <= 0) break;
    const available = limit - capacity.used[cell];
    let usage = 0;
    if (mode === "booked" && cell === start)
      usage = whole ? remaining : Math.min(remaining, Math.max(available, minPiece));
    else if (capacity.count[cell] < tasksPerSession && available > 0)
      usage = whole
        ? available >= remaining
          ? remaining
          : 0
        : available >= Math.min(minPiece, remaining)
          ? Math.min(available, remaining)
          : 0;
    if (usage === 0) {
      if (mode === "drop" && cell === start) return null;
      continue;
    }
    allocations.push({ cell, usage });
    remaining -= usage;
  }
  return remaining > 0 && mode !== "booked" ? null : allocations;
}
function sessionCapacity(
  entries: ScheduleEntry[],
  count: number,
  exceptKey?: string,
): SessionCapacity {
  const capacity = {
    used: Array<number>(count).fill(0),
    count: Array<number>(count).fill(0),
  };
  for (const entry of entries)
    if (entry.key !== exceptKey) {
      capacity.used[entry.cell] += entry.usage;
      capacity.count[entry.cell]++;
    }
  return capacity;
}
function makeEntries(task: ScheduledTask, allocations: Allocation[]): ScheduleEntry[] {
  return allocations.map((allocation, index) => ({
    key: `${task.id}#${index + 1}`,
    task,
    ...allocation,
    part: index + 1,
    parts: allocations.length,
  }));
}
function publicPart(entry: ScheduleEntry, sessionCount: number): ScheduledPart {
  return {
    task: entry.task,
    day: Math.floor(entry.cell / sessionCount),
    session: entry.cell % sessionCount,
    usage: entry.usage,
    part: entry.part,
    parts: entry.parts,
  };
}
function bookedEntries(
  tasks: ScheduledTask[],
  dayCount: number,
  sessionCount: number,
  limit: number,
  minPiece: number,
): ScheduleEntry[] {
  const result: ScheduleEntry[] = [];
  const capacity = sessionCapacity([], dayCount * sessionCount);
  for (const task of tasks) {
    if (!task.at) continue;
    const cell = Number(task.at.day) * sessionCount + Number(task.at.session);
    if (cell < 0 || cell >= capacity.used.length) continue;
    const allocations =
      allocateTask(task, cell, capacity, limit, minPiece, "booked") ?? [];
    allocations.forEach((allocation) => {
      capacity.used[allocation.cell] += allocation.usage;
      capacity.count[allocation.cell]++;
    });
    result.push(...makeEntries(task, allocations));
  }
  return result.map((entry, index) => ({
    ...entry,
    key: `booked-${index}`,
    booked: true,
  }));
}
/** Moving a split task may join shares in one session; renumber its resulting pieces. */
function mergeTaskEntries(
  entries: ScheduleEntry[],
  task: ScheduledTask,
): {
  list: ScheduleEntry[];
  made: ScheduleEntry[];
} {
  const byCell = new Map<number, ScheduleEntry>();
  for (const entry of entries.filter((entry) => entry.task.id === task.id)) {
    const previous = byCell.get(entry.cell);
    byCell.set(
      entry.cell,
      previous
        ? {
            ...previous,
            usage: previous.usage + entry.usage,
            booked: previous.booked || entry.booked,
          }
        : entry,
    );
  }
  const sorted = [...byCell.values()].sort((left, right) => left.cell - right.cell),
    made = sorted.map((entry, index) => ({
      ...entry,
      key: `${task.id}@${entry.cell}`,
      part: index + 1,
      parts: sorted.length,
      manual: true,
    }));
  return {
    list: [...entries.filter((entry) => entry.task.id !== task.id), ...made],
    made,
  };
}
function sameDragSource(left: DragSource, right: DragSource): boolean {
  return left.kind === "card" && right.kind === "card"
    ? left.key === right.key
    : left.kind === "task" && right.kind === "task" && left.id === right.id;
}
function dayLabel(days: NonNullable<ScheduledRunsProps["days"]>, index: number): string {
  const day = days[index];
  return typeof day === "string"
    ? day
    : [day?.name, day?.date].filter((value) => value !== undefined).join(" ");
}
function useSchedule(props: ScheduledRunsProps, prefix: string, clean: boolean) {
  const {
    tasks,
    days = defaultDays,
    sessions = defaultSessions,
    now = { day: 0, session: 0 },
    limit = 100,
    minPiece = 15,
    agents,
    defaultMode = "auto",
    autoRun = false,
    loop = false,
    onScheduled,
    onPlace,
    onMove,
  } = props;
  const sessionCount = sessions.length,
    cellCount = days.length * sessionCount,
    currentCell = Number(now.day) * sessionCount + Number(now.session);
  const booked = useMemo(
    () => bookedEntries(tasks, days.length, sessionCount, limit, minPiece),
    [tasks, days.length, sessionCount, limit, minPiece],
  );
  const unscheduled = useMemo(() => tasks.filter((task) => !task.at), [tasks]);
  const [entries, setEntries] = useState(booked),
    [blockedIds, setBlockedIds] = useState<ScheduledTask["id"][]>([]),
    [flight, setFlight] = useState<Flight | null>(null),
    [running, setRunning] = useState(false),
    [freshKeys, setFreshKeys] = useState<string[]>([]);
  const [dragging, setDragging] = useState<DragSource | null>(null),
    [over, setOver] = useState<number | null>(null),
    [interacted, setInteracted] = useState(false),
    [mode, setMode] = useState(defaultMode),
    [hovered, setHovered] = useState(false),
    [agentFilter, setAgentFilter] = useState<string | null>(null),
    [detail, setDetail] = useState<{
      of: DragSource;
      left: number;
      top: number;
    } | null>(null),
    [announcement, announce] = useState("");
  const rootRef = useRef<HTMLDivElement>(null),
    stopped = useRef(false),
    timers = useRef<number[]>([]);
  const helpId = useId();
  function defer(action: () => void, delay: number) {
    timers.current.push(window.setTimeout(action, delay));
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const scheduledIds = new Set(entries.map((entry) => entry.task.id)),
    queue = unscheduled.filter(
      (task) => !scheduledIds.has(task.id) && !blockedIds.includes(task.id),
    ),
    remainingCount = unscheduled.filter((task) => !scheduledIds.has(task.id)).length;
  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(false);
    setFlight(null);
    setEntries(booked);
    setBlockedIds([]);
    setFreshKeys([]);
    setInteracted(false);
    stopped.current = false;
  }, [booked]);
  useEffect(() => reset(), [reset]);
  const advance = useRef<() => void>(() => {});
  advance.current = () => {
    if (stopped.current) {
      setRunning(false);
      return;
    }
    const failed: ScheduledTask["id"][] = [];
    for (const task of unscheduled) {
      if (scheduledIds.has(task.id) || blockedIds.includes(task.id)) continue;
      const allocations = allocateTask(
        task,
        Math.max(0, currentCell),
        sessionCapacity(entries, cellCount),
        limit,
        minPiece,
      );
      if (!allocations) {
        failed.push(task.id);
        continue;
      }
      const made = makeEntries(task, allocations);
      if (failed.length) setBlockedIds((previous) => [...previous, ...failed]);
      setEntries((previous) => [...previous, made[0]]);
      setFlight({ id: task.id, key: made[0].key, rest: made.slice(1) });
      return;
    }
    if (failed.length) setBlockedIds((previous) => [...previous, ...failed]);
    setRunning(false);
    onScheduled?.(entries.map((entry) => publicPart(entry, sessionCount)));
    announce("Auto-schedule is done");
  };
  const hasPlaced = unscheduled.some((task) => scheduledIds.has(task.id));
  useEffect(() => {
    if (mode !== "auto" || autoRun === false || running || hasPlaced || interacted)
      return;
    const timer = window.setTimeout(
      () => {
        setRunning(true);
        advance.current();
      },
      autoRun === true ? 800 : autoRun,
    );
    return () => window.clearTimeout(timer);
  }, [mode, autoRun, running, hasPlaced, interacted]);
  useEffect(() => {
    if (
      !loop ||
      mode !== "auto" ||
      running ||
      interacted ||
      hovered ||
      queue.length > 0 ||
      !hasPlaced
    )
      return;
    const timer = window.setTimeout(reset, 3200);
    return () => window.clearTimeout(timer);
  }, [loop, mode, running, interacted, hovered, queue.length, hasPlaced, reset]);
  function changeMode(next: "auto" | "manual") {
    if (next === mode) return;
    setMode(next);
    setInteracted(true);
    if (next === "auto") {
      stopped.current = false;
      if (!running && queue.length > 0) {
        setRunning(true);
        advance.current();
      }
      return;
    }
    stopped.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(false);
    setFlight(null);
    setBlockedIds([]);
    setFreshKeys([]);
    setEntries((previous) => {
      const manualTasks = new Set(
        previous.filter((entry) => entry.manual).map((entry) => entry.task.id),
      );
      return previous.filter((entry) => entry.booked || manualTasks.has(entry.task.id));
    });
  }
  const crew = useMemo<NonNullable<ScheduledRunsProps["agents"]>>(
    () =>
      agents ??
      [
        ...new Set(
          tasks.map((task) => task.agent).filter((name): name is string => !!name),
        ),
      ].map((name) => ({ name })),
    [agents, tasks],
  );
  function filterAgent(name: string) {
    setInteracted(true);
    setAgentFilter((previous) => (previous === name ? null : name));
  }
  const dimmed = (task: ScheduledTask) =>
    agentFilter !== null && task.agent !== agentFilter;
  const filteredCount = agentFilter
    ? tasks.filter((task) => task.agent === agentFilter).length
    : tasks.length;
  useLayoutEffect(() => {
    if (!flight) return;
    const root = rootRef.current,
      card = root?.querySelector<HTMLElement>(
        `[data-card="${CSS.escape(flight.id ?? "")}"]`,
      ),
      chip = root?.querySelector<HTMLElement>(`[data-chip="${CSS.escape(flight.key)}"]`);
    const finish = () => {
      setEntries((previous) => [...previous, ...flight.rest]);
      setFreshKeys(flight.rest.map((entry) => entry.key));
      setFlight(null);
      defer(() => advance.current(), 160);
    };
    if (
      !root ||
      !card ||
      !chip ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      defer(finish, 120);
      return;
    }
    const bounds = root.getBoundingClientRect(),
      from = card.getBoundingClientRect(),
      to = chip.getBoundingClientRect(),
      flier = document.createElement("div");
    flier.className = `${prefix}__tile ${prefix}__flier`;
    flier.innerHTML = card.innerHTML;
    root.append(flier);
    const coordinates = (rect: DOMRect) => ({
      left: `${rect.left - bounds.left}px`,
      top: `${rect.top - bounds.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
    const borderRadius = clean ? "7px" : "10px";
    const animation = flier.animate(
      [
        {
          ...coordinates(from),
          borderRadius,
          boxShadow:
            "0 12px 28px -10px rgba(16,16,24,0.28), 0 0 0 1px rgba(16,16,24,0.06)",
        },
        {
          offset: 0.55,
          borderRadius,
          boxShadow:
            "0 16px 32px -12px rgba(16,16,24,0.3), 0 0 0 1px rgba(16,16,24,0.06)",
        },
        {
          ...coordinates(to),
          borderRadius,
          boxShadow: "0 0 0 0.5px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.05)",
        },
      ],
      {
        duration: 640,
        easing: "cubic-bezier(0.32, 0.72, 0.24, 1)",
        fill: "forwards",
      },
    );
    let finished = false;
    const complete = () => {
      if (!finished) {
        finished = true;
        finish();
      }
    };
    animation.onfinish = complete;
    defer(complete, 1040);
    return () => {
      animation.cancel();
      flier.remove();
    };
  }, [flight]);
  const cells = useMemo(() => {
    const grouped = Array.from({ length: cellCount }, () => [] as ScheduleEntry[]);
    for (const entry of entries) grouped[entry.cell]?.push(entry);
    return grouped;
  }, [entries, cellCount]);
  const fill = (cell: number) =>
    Math.min(
      100,
      (cells[cell].reduce(
        (sum, entry) => sum + (entry.key === flight?.key ? 0 : entry.usage),
        0,
      ) /
        limit) *
        100,
    );
  function allocationFor(cell: number, source: DragSource) {
    if (cell < currentCell) return null;
    if (source.kind === "card") {
      const entry = entries.find((entry) => entry.key === source.key);
      return !entry || cell === source.from
        ? null
        : allocateTask(
            { ...entry.task, usage: entry.usage },
            cell,
            sessionCapacity(entries, cellCount, source.key),
            limit,
            minPiece,
            "drop",
            currentCell,
          );
    }
    const task = unscheduled.find((task) => task.id === source.id);
    return task
      ? allocateTask(
          task,
          cell,
          sessionCapacity(entries, cellCount),
          limit,
          minPiece,
          "drop",
          currentCell,
        )
      : null;
  }
  const fits = (cell: number, source: DragSource) => allocationFor(cell, source) !== null;
  function drop(cell: number, source: DragSource) {
    const allocations = allocationFor(cell, source);
    if (!allocations) return;
    if (source.kind === "card") {
      const previous = entries.find((entry) => entry.key === source.key);
      if (!previous) return;
      const moved = allocations.map((allocation, index) => ({
        ...previous,
        key: `${previous.key}~${index}`,
        ...allocation,
      }));
      const { list, made } = mergeTaskEntries(
        [...entries.filter((entry) => entry.key !== source.key), ...moved],
        previous.task,
      );
      setEntries(list);
      setFreshKeys(
        made
          .filter((entry) =>
            allocations.some((allocation) => allocation.cell === entry.cell),
          )
          .map((entry) => entry.key),
      );
      onMove?.(publicPart(previous, sessionCount), {
        day: Math.floor(cell / sessionCount),
        session: cell % sessionCount,
      });
    } else {
      const task = unscheduled.find((task) => task.id === source.id);
      if (!task || entries.some((entry) => entry.task.id === task.id)) return;
      const { list, made } = mergeTaskEntries(
        [...entries, ...makeEntries(task, allocations)],
        task,
      );
      setEntries(list);
      setFreshKeys(made.map((entry) => entry.key));
      onPlace?.(
        task,
        made.map((entry) => publicPart(entry, sessionCount)),
      );
    }
  }
  const dragAPI = useRef<ScheduleDragAPI>({ over, fits, drop });
  dragAPI.current = { over, fits, drop };
  function showDetails(element: HTMLElement, source: DragSource) {
    const root = rootRef.current;
    if (!root) return;
    if (detail && sameDragSource(detail.of, source)) {
      setDetail(null);
      return;
    }
    setInteracted(true);
    const bounds = root.getBoundingClientRect(),
      rect = element.getBoundingClientRect();
    setDetail({
      of: source,
      left: Math.max(0, Math.min(rect.left - bounds.left, bounds.width - detailWidth)),
      top: rect.bottom - bounds.top + 6,
    });
  }
  useEffect(() => {
    if (!detail) return;
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest(`.${prefix}__tile`))
        setDetail(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetail(null);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [detail, prefix]);
  const runningRef = useRef(running);
  runningRef.current = running;
  const resume = useRef<() => void>(() => {});
  resume.current = () => {
    if (stopped.current && mode === "auto") {
      stopped.current = false;
      if (!running && queue.length > 0) {
        setRunning(true);
        advance.current();
      }
    }
  };
  const sessionLabel = (cell: number) =>
    `${dayLabel(days, Math.floor(cell / sessionCount))}, ${sessions[cell % sessionCount]}`;
  const blockedReason = (cell: number, source: DragSource) =>
    source.kind === "card" && cell === source.from
      ? "it's already here"
      : cell < currentCell
        ? "that session is over"
        : cells[cell].filter(
              (entry) => source.kind !== "card" || entry.key !== source.key,
            ).length >= tasksPerSession
          ? "it's full"
          : "not enough of its limit left";
  const taskFor = (source: DragSource) =>
    source.kind === "card"
      ? entries.find((entry) => entry.key === source.key)?.task
      : unscheduled.find((task) => task.id === source.id);
  return {
    days,
    sessions,
    now,
    limit,
    sessionCount,
    cellCount,
    currentCell,
    entries,
    unscheduled,
    blockedIds,
    flight,
    running,
    freshKeys,
    dragging,
    setDragging,
    over,
    setOver,
    mode,
    setMode,
    setInteracted,
    setHovered,
    agentFilter,
    detail,
    setDetail,
    announcement,
    announce,
    rootRef,
    stopped,
    helpId,
    scheduledIds,
    remainingCount,
    changeMode,
    crew,
    filterAgent,
    dimmed,
    filteredCount,
    cells,
    fill,
    fits,
    dragAPI,
    showDetails,
    runningRef,
    resume,
    sessionLabel,
    blockedReason,
    taskFor,
  };
}
function useScheduleDrag(schedule: ReturnType<typeof useSchedule>, prefix: string) {
  const {
    rootRef,
    dragging,
    setDragging,
    setOver,
    setDetail,
    setMode,
    setInteracted,
    stopped,
    runningRef,
    resume,
    dragAPI,
    showDetails,
    helpId,
    cellCount,
    sessionCount,
    currentCell,
    sessionLabel,
    blockedReason,
    taskFor,
    announce,
  } = schedule;
  const cancelPointer = useRef<((commit: boolean) => void) | null>(null),
    keyboard = useRef<KeyboardDrag | null>(null),
    pendingFocus = useRef<string | null>(null);
  useEffect(() => () => cancelPointer.current?.(false), []);
  function onPointerDown(
    event: ReactPointerEvent<HTMLElement>,
    source: DragSource,
    movable: boolean,
  ) {
    if (event.button !== 0) return;
    cancelPointer.current?.(false);
    const root = rootRef.current,
      tile = event.currentTarget;
    if (!root) return;
    event.preventDefault();
    const pausedAuto = source.kind === "task" && runningRef.current && !stopped.current;
    if (pausedAuto) stopped.current = true;
    const from = tile.getBoundingClientRect(),
      start = {
        x: event.clientX,
        y: event.clientY,
        offsetX: event.clientX - from.left,
        offsetY: event.clientY - from.top,
      };
    let ghost: HTMLElement | null = null;
    const move = (event: PointerEvent) => {
      if (!ghost) {
        if (!movable || Math.hypot(event.clientX - start.x, event.clientY - start.y) < 4)
          return;
        setDetail(null);
        if (runningRef.current || pausedAuto) {
          stopped.current = true;
          setMode("manual");
        }
        ghost = tile.cloneNode(true) as HTMLElement;
        ghost.removeAttribute("data-chip");
        ghost.removeAttribute("data-card");
        ghost.classList.add(`${prefix}__ghost`);
        ghost.style.width = `${from.width}px`;
        root.append(ghost);
        setDragging(source);
        setInteracted(true);
      }
      event.preventDefault();
      const bounds = root.getBoundingClientRect();
      ghost.style.transform = `translate(${event.clientX - bounds.left - start.offsetX}px, ${event.clientY - bounds.top - start.offsetY}px) rotate(-1.5deg)`;
      const cell = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-cell]");
      setOver(cell && root.contains(cell) ? Number(cell.dataset.cell) : null);
    };
    const finish = (commit: boolean) => {
      cancelPointer.current = null;
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", cancel);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("blur", cancel);
      if (!ghost) {
        if (pausedAuto) resume.current();
        if (commit) showDetails(tile, source);
        return;
      }
      const target = dragAPI.current.over;
      if (commit && target !== null && dragAPI.current.fits(target, source)) {
        ghost.remove();
        dragAPI.current.drop(target, source);
      } else {
        const bounds = root.getBoundingClientRect(),
          target = tile.getBoundingClientRect(),
          returning = ghost;
        returning.animate(
          [
            { transform: returning.style.transform },
            {
              transform: `translate(${target.left - bounds.left}px, ${target.top - bounds.top}px)`,
            },
          ],
          {
            duration: 260,
            easing: "cubic-bezier(0.32, 0.72, 0.24, 1)",
            fill: "forwards",
          },
        ).onfinish = () => returning.remove();
        window.setTimeout(() => returning.remove(), 400);
      }
      setDragging(null);
      setOver(null);
    };
    const up = () => finish(true),
      cancel = () => finish(false),
      escape = (event: KeyboardEvent) => {
        if (event.key === "Escape") finish(false);
      };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", cancel);
    document.addEventListener("keydown", escape);
    window.addEventListener("blur", cancel);
    cancelPointer.current = finish;
  }
  useEffect(() => {
    const key = pendingFocus.current,
      tile =
        key &&
        rootRef.current?.querySelector<HTMLElement>(`[data-chip="${CSS.escape(key)}"]`);
    if (tile) {
      pendingFocus.current = null;
      tile.focus();
    }
  });
  function stopKeyboard() {
    keyboard.current = null;
    setDragging(null);
    setOver(null);
  }
  function pickUp(source: DragSource, origin: HTMLElement) {
    if (runningRef.current) {
      stopped.current = true;
      setMode("manual");
    }
    setDetail(null);
    const first = Array.from({ length: cellCount }, (_, index) => index).find((cell) =>
      dragAPI.current.fits(cell, source),
    );
    const cell =
      source.kind === "card" ? source.from : (first ?? Math.max(0, currentCell));
    keyboard.current = { source, cell, origin };
    setDragging(source);
    setOver(cell);
    setInteracted(true);
    announce(
      `Picked up ${taskFor(source)?.title ?? "the task"}. Arrow keys choose a session, Space drops it, Escape cancels. ${sessionLabel(cell)}.`,
    );
  }
  useEffect(() => {
    if (!dragging || !keyboard.current) return;
    const keydown = (event: KeyboardEvent) => {
      const current = keyboard.current;
      if (!current) return;
      const delta =
        event.key === "ArrowRight"
          ? sessionCount
          : event.key === "ArrowLeft"
            ? -sessionCount
            : event.key === "ArrowDown"
              ? 1
              : event.key === "ArrowUp"
                ? -1
                : 0;
      if (delta) {
        const next = current.cell + delta;
        if (next >= 0 && next < cellCount) {
          current.cell = next;
          setOver(next);
          announce(
            `${sessionLabel(next)} – ${dragAPI.current.fits(next, current.source) ? "room to drop" : `can't drop, ${blockedReason(next, current.source)}`}`,
          );
        }
      } else if (event.key === " " || event.key === "Enter") {
        if (dragAPI.current.fits(current.cell, current.source)) {
          const task = taskFor(current.source);
          dragAPI.current.drop(current.cell, current.source);
          if (task) pendingFocus.current = `${task.id}@${current.cell}`;
          announce(`Moved to ${sessionLabel(current.cell)}`);
          stopKeyboard();
        } else
          announce(`Can't drop here – ${blockedReason(current.cell, current.source)}`);
      } else if (event.key === "Escape" || event.key === "Tab") {
        if (event.key === "Escape") current.origin.focus();
        announce("Cancelled – it's back where it was");
        stopKeyboard();
        if (event.key === "Tab") return;
      } else return;
      event.preventDefault();
      event.stopPropagation();
    };
    document.addEventListener("keydown", keydown, true);
    return () => document.removeEventListener("keydown", keydown, true);
  }, [dragging]);
  function onKeyDown(
    event: ReactKeyboardEvent<HTMLElement>,
    source: DragSource,
    movable: boolean,
  ) {
    if (event.target !== event.currentTarget || keyboard.current) return;
    if (event.key === "Enter") {
      event.preventDefault();
      showDetails(event.currentTarget, source);
    } else if (event.key === " " && movable) {
      event.preventDefault();
      pickUp(source, event.currentTarget);
    }
  }
  return { onPointerDown, onKeyDown, helpId };
}
function TaskLogo({
  logo,
  title,
  prefix,
}: {
  logo?: ReactNode;
  title?: string;
  prefix: string;
}) {
  return (
    <span className={`${prefix}__mark`} aria-hidden="true">
      {logo ?? Array.from(title?.trim() ?? "")[0]?.toUpperCase()}
    </span>
  );
}
function StatIcon({ icon }: { icon?: string }) {
  const shapes: Record<string, ReactNode> = {
    files: (
      <>
        <path d="M4 2.5h5l3 3v8H4z" />
        <path d="M9 2.5v3h3" />
      </>
    ),
    pr: (
      <>
        <circle cx="4.5" cy="3.75" r="1.5" />
        <circle cx="4.5" cy="12.25" r="1.5" />
        <circle cx="11.5" cy="12.25" r="1.5" />
        <path d="M4.5 5.25v5.5M11.5 10.75V8a2 2 0 0 0-2-2H7.5" />
      </>
    ),
    tests: (
      <>
        <circle cx="8" cy="8" r="5.5" />
        <path d="m5.75 8.25 1.5 1.5 3-3.25" />
      </>
    ),
    messages: <path d="M3 3.5h10v7.5H7.5L4.5 13.5V11H3z" />,
    issues: (
      <>
        <circle cx="8" cy="8" r="5.5" />
        <circle cx="8" cy="8" r="1" fill="currentColor" />
      </>
    ),
    links: (
      <path d="m6.5 9.5 3-3M5.75 7.25l-1 1a2.12 2.12 0 0 0 3 3l1-1M10.25 8.75l1-1a2.12 2.12 0 0 0-3-3l-1 1" />
    ),
  };
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes[icon ?? ""]}
    </svg>
  );
}
function TaskStats({
  task,
  share,
  prefix,
}: {
  task: ScheduledTask;
  share: string;
  prefix: string;
}) {
  return (
    <span className={`${prefix}__tile-stats`}>
      {(task.stats ?? []).slice(0, 2).map((stat, index) => (
        <span
          className={`${prefix}__stat`}
          aria-label={`${stat.value} ${stat.label ?? stat.icon}`}
          key={index}
        >
          <StatIcon icon={stat.icon} />
          {statValue(stat.value)}
        </span>
      ))}
      <span className={`${prefix}__tag`}>{share}</span>
    </span>
  );
}
function AutoScheduleIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1.75c.3 2.9 1.35 3.95 4.25 4.25C9.35 6.3 8.3 7.35 8 10.25 7.7 7.35 6.65 6.3 3.75 6 6.65 5.7 7.7 4.65 8 1.75Z"
        fill="currentColor"
      />
      <path
        d="M12.25 9.5c.15 1.3.6 1.75 1.9 1.9-1.3.15-1.75.6-1.9 1.9-.15-1.3-.6-1.75-1.9-1.9 1.3-.15 1.75-.6 1.9-1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}
function TaskDetails({
  schedule,
  prefix,
}: {
  schedule: ReturnType<typeof useSchedule>;
  prefix: string;
}) {
  const {
    detail,
    entries,
    unscheduled,
    currentCell,
    days,
    sessions,
    sessionCount,
    limit,
    blockedIds,
  } = schedule;
  if (!detail) return null;
  const source = detail.of;
  const entry =
    source.kind === "card"
      ? entries.find((entry) => entry.key === source.key)
      : undefined;
  const task =
    entry?.task ??
    (source.kind === "task"
      ? unscheduled.find((task) => task.id === source.id)
      : undefined);
  if (!task) return null;
  const session = entry
    ? `${dayLabel(days, Math.floor(entry.cell / sessionCount))} · ${sessions[entry.cell % sessionCount]}`
    : "Not scheduled yet";
  const bookedShare = entry
    ? `${entry.parts > 1 ? `Part ${entry.part} of ${entry.parts} · ` : ""}${percentage((entry.usage / limit) * 100)} of the session`
    : null;
  const ratio = taskUsage(task) / limit;
  const hint =
    entry && entry.cell < currentCell
      ? "This session is over"
      : entry
        ? "Drag it to another session to move it"
        : blockedIds.includes(task.id)
          ? "No session has room for it this week"
          : "Drag it into a session to book it";
  return (
    <div
      className={`${prefix}__info`}
      role="dialog"
      aria-label={task.title}
      style={{ left: detail.left, top: detail.top, width: detailWidth }}
    >
      <div className={`${prefix}__info-head`}>
        <TaskLogo logo={task.logo} title={task.title} prefix={prefix} />
        <span className={`${prefix}__info-title`}>{task.title}</span>
      </div>
      {task.detail && <p className={`${prefix}__info-text`}>{task.detail}</p>}
      <dl className={`${prefix}__info-rows`}>
        {task.agent && (
          <>
            <dt>Agent</dt>
            <dd>{task.agent}</dd>
          </>
        )}
        <dt>Session</dt>
        <dd>{session}</dd>
        {(task.stats ?? []).slice(0, 2).map((stat, index) => {
          const label = stat.label || stat.icon || "";
          return (
            <Fragment key={index}>
              <dt>{label.charAt(0).toUpperCase() + label.slice(1)}</dt>
              <dd>{stat.value}</dd>
            </Fragment>
          );
        })}
        <dt>Needs</dt>
        <dd>
          {bookedShare ??
            (ratio > 1
              ? `${percentage(ratio * 100)} · split over ${Math.ceil(ratio)} sessions`
              : `${percentage(ratio * 100)} of a session`)}
        </dd>
      </dl>
      <p className={`${prefix}__info-hint`}>{hint}</p>
    </div>
  );
}
function UnscheduledTile({
  task,
  prefix,
  schedule,
  drag,
}: TileContext & {
  task: ScheduledTask;
}) {
  const { scheduledIds, flight, blockedIds, dimmed, dragging, detail, helpId, limit } =
    schedule;
  const gone = scheduledIds.has(task.id) || flight?.id === task.id;
  const blocked = blockedIds.includes(task.id);
  const source: DragSource = { kind: "task", id: task.id };
  const open = detail?.of.kind === "task" && detail.of.id === task.id;
  return (
    <li className={`${prefix}__slot`} data-gone={gone || undefined}>
      <div
        className={`${prefix}__tile ${prefix}__card`}
        data-card={task.id}
        data-dim={dimmed(task) || undefined}
        data-flying={flight?.id === task.id || undefined}
        data-held={(dragging?.kind === "task" && dragging.id === task.id) || undefined}
        data-movable={!gone || undefined}
        data-open={open || undefined}
        onPointerDown={(event) => {
          if (!gone) drag.onPointerDown(event, source, true);
        }}
        tabIndex={gone ? -1 : 0}
        role="button"
        aria-describedby={`${helpId}-help`}
        aria-expanded={open}
        onKeyDown={(event) => {
          if (!gone) drag.onKeyDown(event, source, true);
        }}
      >
        <span className={`${prefix}__tile-top`}>
          <TaskLogo logo={task.logo} title={task.title} prefix={prefix} />
          <span className={`${prefix}__tile-title`} title={task.title}>
            {task.title}
          </span>
        </span>
        <span className={`${prefix}__tile-meta`} data-nope={blocked || undefined}>
          {blocked
            ? Number.isFinite(task.usage)
              ? "No room this week"
              : "No usage set – can't schedule"
            : [task.agent, task.detail].filter(Boolean).join(" · ")}
        </span>
        <TaskStats task={task} share={usageShare(task.usage, limit)} prefix={prefix} />
      </div>
    </li>
  );
}
function ScheduledTile({
  entry,
  prefix,
  schedule,
  drag,
}: TileContext & {
  entry: ScheduleEntry;
}) {
  const { dimmed, flight, freshKeys, dragging, detail, currentCell, helpId, limit } =
    schedule;
  const { task, cell, key, usage, part, parts } = entry;
  const movable = cell >= currentCell,
    open = detail?.of.kind === "card" && detail.of.key === key;
  const source: DragSource = { kind: "card", key, from: cell, usage };
  return (
    <li
      className={`${prefix}__tile ${prefix}__chip`}
      data-chip={key}
      data-dim={dimmed(task) || undefined}
      data-landing={key === flight?.key || undefined}
      data-fresh={freshKeys.includes(key) || undefined}
      data-held={(dragging?.kind === "card" && dragging.key === key) || undefined}
      data-movable={movable || undefined}
      data-open={open || undefined}
      onPointerDown={(event) => drag.onPointerDown(event, source, movable)}
      tabIndex={key === flight?.key ? -1 : 0}
      role="button"
      aria-describedby={`${helpId}-${movable ? "help" : "help-past"}`}
      aria-expanded={open}
      onKeyDown={(event) => drag.onKeyDown(event, source, movable)}
      title={`${task.title}${parts > 1 ? ` – part ${part} of ${parts}` : ""} · ${percentage((usage / limit) * 100)}`}
    >
      <span className={`${prefix}__tile-top`}>
        <TaskLogo logo={task.logo} title={task.title} prefix={prefix} />
        <span className={`${prefix}__tile-title`}>{task.title}</span>
        {parts > 1 && (
          <span className={`${prefix}__tile-part`}>
            {part}
            {"/"}
            {parts}
          </span>
        )}
      </span>
      <span className={`${prefix}__tile-meta`} title={task.detail}>
        {[task.agent, task.detail].filter(Boolean).join(" · ")}
      </span>
      <TaskStats task={task} share={percentage((usage / limit) * 100)} prefix={prefix} />
    </li>
  );
}
function ScheduledRunsView(
  props: ScheduledRunsProps & {
    clean?: boolean;
  },
) {
  const { className, title = "This week", note, clean = false } = props;
  const prefix = clean ? "ui-srn" : "ui-sch";
  const schedule = useSchedule(props, prefix, clean),
    drag = useScheduleDrag(schedule, prefix);
  const {
    rootRef,
    dragging,
    setHovered,
    days,
    sessions,
    now,
    announcement,
    helpId,
    crew,
    agentFilter,
    filterAgent,
    filteredCount,
    mode,
    changeMode,
    unscheduled,
    remainingCount,
    sessionCount,
    cells,
    fill,
    currentCell,
    fits,
    over,
  } = schedule;
  const context = { prefix, schedule, drag };
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-dragging={dragging ? "" : undefined}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{ [`--${prefix}-days`]: days.length } as CSSProperties}
    >
      <p className={`${prefix}__sr`} aria-live="polite">
        {announcement}
      </p>
      <p id={`${helpId}-help`} hidden>
        Enter shows the details. Space picks it up to move it.
      </p>
      <p id={`${helpId}-help-past`} hidden>
        Enter shows the details. This session is over, so it can't be moved.
      </p>

      <div className={`${prefix}__bar`}>
        <div className={`${prefix}__heading`}>
          <span className={`${prefix}__title`}>{title}</span>
          {note && <span className={`${prefix}__note`}>{note}</span>}
        </div>
        <div className={`${prefix}__tools`}>
          {crew.length > 0 && (
            <div
              className={`${prefix}__crew`}
              data-open={agentFilter !== null || undefined}
              role="group"
              aria-label="Show one agent's tasks"
            >
              {crew.map((agent, index) => (
                <button
                  type="button"
                  className={`${prefix}__agent`}
                  data-on={agentFilter === agent.name || undefined}
                  aria-pressed={agentFilter === agent.name}
                  aria-label={agent.name}
                  title={agentFilter === agent.name ? undefined : agent.name}
                  style={{ zIndex: crew.length - index }}
                  onClick={() => filterAgent(agent.name)}
                  key={agent.name}
                >
                  <span className={`${prefix}__agent-logo`} aria-hidden="true">
                    {agent.logo ?? Array.from(agent.name.trim())[0]?.toUpperCase()}
                  </span>
                  <span className={`${prefix}__agent-name`} aria-hidden="true">
                    {agent.name}
                  </span>
                </button>
              ))}
            </div>
          )}
          <span className={`${prefix}__total`}>
            {filteredCount} {filteredCount === 1 ? "task" : "tasks"}
          </span>
          <div
            className={`${prefix}__modes`}
            role="radiogroup"
            aria-label="Scheduling"
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
              )
                return;
              event.preventDefault();
              const next = mode === "auto" ? "manual" : "auto";
              changeMode(next);
              event.currentTarget
                .querySelector<HTMLElement>(`[data-mode="${next}"]`)
                ?.focus();
            }}
          >
            {(["auto", "manual"] as const).map((next) => (
              <button
                type="button"
                role="radio"
                data-mode={next}
                aria-checked={mode === next}
                tabIndex={mode === next ? 0 : -1}
                onClick={() => changeMode(next)}
                key={next}
              >
                {next === "auto" && <AutoScheduleIcon />}
                {next === "auto" ? "Auto" : "Manual"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={`${prefix}__body`}>
        <section className={`${prefix}__stack`} aria-label="To schedule">
          <header className={`${prefix}__stack-head`}>
            <span>To schedule</span>
            <span className={`${prefix}__count`}>{remainingCount}</span>
          </header>
          <ul className={`${prefix}__cards`}>
            {unscheduled.map((task, index) => (
              <UnscheduledTile {...context} task={task} key={`${task.id}:${index}`} />
            ))}
          </ul>
          <p
            className={`${prefix}__empty`}
            data-show={remainingCount === 0 || undefined}
            aria-hidden={remainingCount > 0}
          >
            Everything's scheduled
          </p>
        </section>
        <div className={`${prefix}__scroll`}>
          <div className={`${prefix}__week`} role="grid" aria-label={title}>
            <div role="row" className={`${prefix}__row ${prefix}__row--head`}>
              <span aria-hidden="true" />
              {days.map((day, index) => (
                <span
                  role="columnheader"
                  className={`${prefix}__day`}
                  data-today={index === now.day || undefined}
                  key={index}
                >
                  {typeof day === "string" ? day : day.name}
                  {typeof day !== "string" && day.date !== undefined && <b>{day.date}</b>}
                </span>
              ))}
            </div>
            {sessions.map((session, sessionIndex) => (
              <div role="row" className={`${prefix}__row`} key={sessionIndex}>
                <span role="rowheader" className={`${prefix}__time`}>
                  {session}
                </span>
                {days.map((_, dayIndex) => {
                  const cell = dayIndex * sessionCount + sessionIndex,
                    entries = cells[cell],
                    used = fill(cell),
                    overflow = entries.length - tasksPerSession;
                  const targeting =
                      dragging !== null &&
                      (dragging.kind !== "card" || dragging.from !== cell),
                    allowed = targeting && fits(cell, dragging);
                  const remaining = Math.max(0, 100 - used),
                    reason =
                      !targeting || allowed
                        ? null
                        : cell < currentCell
                          ? "Over"
                          : entries.length >= tasksPerSession || remaining < 1
                            ? "Full"
                            : `Only ${percentage(remaining)} left`;
                  return (
                    <div
                      role="gridcell"
                      className={`${prefix}__cell`}
                      data-cell={cell}
                      data-past={cell < currentCell || undefined}
                      data-blocked={(targeting && !allowed) || undefined}
                      data-over={(allowed && over === cell) || undefined}
                      title={`${percentage(used)} of the session limit booked`}
                      key={dayIndex}
                    >
                      <ul
                        className={`${prefix}__chips`}
                        role="group"
                        aria-label="Scheduled tasks"
                      >
                        {entries
                          .slice(0, overflow > 0 ? 1 : tasksPerSession)
                          .map((entry, index) => (
                            <ScheduledTile
                              {...context}
                              entry={entry}
                              key={`${entry.key}:${index}`}
                            />
                          ))}
                        {overflow > 0 && (
                          <li className={`${prefix}__more`}>
                            {"+"}
                            {overflow + 1}
                            {" more"}
                          </li>
                        )}
                      </ul>
                      {reason && (
                        <span className={`${prefix}__why`} aria-hidden="true">
                          {reason}
                        </span>
                      )}
                      {cell === currentCell && (
                        <span className={`${prefix}__now`} aria-hidden="true" />
                      )}
                      <span className={`${prefix}__use`} aria-hidden="true">
                        <i style={{ width: `${used}%` }} />
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <TaskDetails schedule={schedule} prefix={prefix} />
    </div>
  );
}
const defaultDays = ["Mon", "Tue", "Wed"];
const defaultSessions = ["07:00", "12:00", "17:00"];
const tasksPerSession = 2;
const detailWidth = 264;
const taskUsage = (task: ScheduledTask) =>
  typeof task.usage === "number" && Number.isFinite(task.usage)
    ? Math.max(1, task.usage)
    : 0;
const percentage = (value: number) => `${Math.round(value)}%`;
export { ScheduledRuns };
export type { ScheduledTask };
export type { ScheduledPart };
export type { ScheduledRunsProps };
