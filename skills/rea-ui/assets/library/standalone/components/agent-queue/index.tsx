"use client";

import "./AgentQueue.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
  useId,
  useState,
  type KeyboardEvent,
} from "react";
type QueueKind = "llm" | "tool" | "agent" | "human";
type QueueStatus = "queued" | "running" | "done" | "failed";
type QueuePriority = "high" | "normal" | "low";
interface QueueJob {
  id: string;
  name: string;
  kind: QueueKind;
  status: QueueStatus;
  enqueuedAt: number;
  label?: string;
  detail?: string;
  worker?: string;
  startedAt?: number;
  endedAt?: number;
  estimate?: number;
  progress?: number;
  priority?: QueuePriority;
  attempt?: number;
  maxAttempts?: number;
  icon?: ReactNode;
  error?: string;
  [field: string]: unknown;
}
interface QueueWorker {
  id: string;
  name: string;
  label?: string;
  icon?: ReactNode;
  [field: string]: unknown;
}
interface QueueRateLimit {
  from: number;
  until: number;
  label?: string;
}
interface AgentQueueProps {
  jobs: QueueJob[];
  workers: QueueWorker[];
  now?: number;
  rateLimits?: QueueRateLimit[];
  paused?: boolean;
  onPausedChange?: (paused: boolean) => void;
  onConcurrencyChange?: (workers: number) => void;
  minConcurrency?: number;
  maxConcurrency?: number;
  backpressure?: number;
  window?: number;
  totals?: {
    done?: number;
    failed?: number;
  };
  openId?: string | null;
  defaultOpenId?: string | null;
  onOpenChange?: (id: string | null, job?: QueueJob) => void;
  onPromote?: (job: QueueJob) => void;
  onCancel?: (job: QueueJob) => void;
  title?: string;
  name?: string;
  className?: string;
}
interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface QueueLayout {
  narrow: boolean;
  height: number;
  pad: number;
  heads: {
    queue: Box;
    workers: Box;
  };
  chips: Box[];
  well: Box;
  grid: {
    x: number;
    y: number;
    cols: number;
    rows: number;
    step: number;
  };
  slots: Box[];
  rail: Box;
  done: Box;
  failed: Box;
}
interface JobTile {
  job: QueueJob;
  shape: "bar" | "chip" | "square" | "gone";
  box: Box;
  flash: boolean;
  index?: number;
  p?: number;
}
interface SeenJob {
  status: QueueStatus;
  attempt: number;
  first: number;
  fresh: boolean;
  worker?: string;
}
interface QueueHistory {
  seen: Map<string, SeenJob>;
  gone: Map<string, number>;
  flash: Map<string, number>;
  limited: boolean;
  over: boolean;
  msg: string;
  msgAt: number;
  mounted: boolean;
}
type Point = [number, number];
interface NumberSlot {
  el: HTMLSpanElement | null;
  shown: number;
  target: number;
  format: (value: number) => string;
}
function AgentQueue(props: AgentQueueProps) {
  return <AgentQueueView {...props} />;
}
function duration(milliseconds: number) {
  const value = Math.max(0, milliseconds);
  if (value < 10000) return `${(value / 1000).toFixed(1)}s`;
  const seconds = Math.round(value / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? `${hours}h ${String(minutes % 60).padStart(2, "0")}m`
    : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function percentile(values: number[], fraction: number) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(fraction * sorted.length))];
}
function initials(name: string) {
  const letters = name
    .trim()
    .split(/\s+/)
    .filter((word) => /^[\p{L}\p{N}]/u.test(word))
    .slice(0, 2)
    .map((word) => Array.from(word)[0]);
  return (
    letters.length ? letters.join("") : (Array.from(name.trim())[0] ?? "")
  ).toUpperCase();
}
function jobProgress(job: QueueJob, now: number) {
  return job.status === "done" || job.status === "failed"
    ? 1
    : job.status === "running"
      ? clamp(
          job.progress ??
            (job.startedAt !== undefined && job.estimate
              ? (now - job.startedAt) / job.estimate
              : 0.5),
          0.015,
          1,
        )
      : 0;
}
function jobLabel(tile: JobTile, now: number, limited: boolean, waiting: number) {
  const job = tile.job,
    parts = [job.name, kindLabels[job.kind]];
  if (job.status === "queued")
    parts.push(
      `waiting ${duration(now - job.enqueuedAt)}`,
      `position ${formatCount((tile.index ?? 0) + 1)} of ${formatCount(waiting)}`,
    );
  if (job.status === "running")
    parts.push(
      limited
        ? "paused by the rate limit"
        : `running ${duration(now - (job.startedAt ?? now))}, ${Math.round(jobProgress(job, now) * 100)}%`,
    );
  if (job.priority === "high") parts.push("high priority");
  if (job.priority === "low") parts.push("low priority");
  if ((job.attempt ?? 1) > 1)
    parts.push(
      `attempt ${job.attempt}${job.maxAttempts ? ` of ${job.maxAttempts}` : ""}`,
    );
  return parts.join(", ");
}
function grid(box: Box, rows: number) {
  const cols = Math.max(2, Math.floor((box.w - 20 + gridPitch - squareSize) / gridPitch)),
    height = rows * gridPitch - 4;
  return {
    x: box.x + 10,
    y: box.y + (box.h - height) / 2,
    cols,
    rows,
    step: (box.w - 20 - squareSize) / (cols - 1),
  };
}
function queueLayout(width: number, workers: number): QueueLayout {
  const narrow = width < 600,
    workerHeight = Math.max(1, workers) * 40 + (Math.max(1, workers) - 1) * 6;
  if (!narrow) {
    const queueWidth = clamp(Math.round(width * 0.26), 188, 236),
      height = Math.max(workerHeight, 178),
      workerX = 16 + queueWidth + 24,
      workerWidth = width - 32 - queueWidth - 92 - 48,
      binX = width - 16 - 92;
    const chips = [0, 1, 2].map((index) => ({
        x: 16,
        y: 40 + index * 32,
        w: queueWidth,
        h: 28,
      })),
      rows = Math.max(
        1,
        Math.floor((40 + height - 138 - 20 + gridPitch - squareSize) / gridPitch),
      ),
      well = { x: 16, y: 138, w: queueWidth, h: 40 + height - 138 },
      railX = clamp(Math.round(workerWidth * 0.4), 112, 164),
      binHeight = (height - 8) / 2;
    return {
      narrow,
      height: 40 + height + 18,
      pad: 16,
      heads: {
        queue: { x: 16, y: 14, w: queueWidth, h: 16 },
        workers: { x: workerX, y: 14, w: workerWidth, h: 16 },
      },
      chips,
      well,
      grid: grid(well, rows),
      slots: Array.from({ length: workers }, (_, index) => ({
        x: workerX,
        y: 40 + index * 46,
        w: workerWidth,
        h: 40,
      })),
      rail: { x: railX, y: 6, w: workerWidth - railX - 6, h: 28 },
      done: { x: binX, y: 40, w: 92, h: binHeight },
      failed: { x: binX, y: 40 + binHeight + 8, w: 92, h: binHeight },
    };
  }
  const innerWidth = width - 24,
    queueHead = { x: 12, y: 12, w: innerWidth, h: 16 },
    chips = [0, 1].map((index) => ({
      x: 12,
      y: 36 + index * 32,
      w: innerWidth,
      h: 28,
    })),
    well = { x: 12, y: 102, w: innerWidth, h: 48 },
    workerHead = { x: 12, y: 168, w: innerWidth, h: 16 },
    binY = 192 + workerHeight + 12,
    binWidth = (innerWidth - 8) / 2;
  return {
    narrow,
    height: binY + 52,
    pad: 12,
    heads: { queue: queueHead, workers: workerHead },
    chips,
    well,
    grid: grid(well, 2),
    slots: Array.from({ length: workers }, (_, index) => ({
      x: 12,
      y: 192 + index * 46,
      w: innerWidth,
      h: 40,
    })),
    rail: { x: 40, y: 6, w: innerWidth - 46, h: 28 },
    done: { x: 12, y: binY, w: binWidth, h: 40 },
    failed: { x: 20 + binWidth, y: binY, w: binWidth, h: 40 },
  };
}
/** Monotone cubic interpolation keeps the depth curve between adjacent samples. */
function smoothPath(points: Point[]): string {
  if (points.length < 2) return "";
  const widths: number[] = [],
    slopes: number[] = [];
  for (let index = 0; index < points.length - 1; index++) {
    widths[index] = points[index + 1][0] - points[index][0] || 1e-6;
    slopes[index] = (points[index + 1][1] - points[index][1]) / widths[index];
  }
  const tangents = [slopes[0]];
  for (let index = 1; index < points.length - 1; index++)
    tangents[index] =
      slopes[index - 1] * slopes[index] <= 0
        ? 0
        : (3 * (widths[index - 1] + widths[index])) /
          ((2 * widths[index] + widths[index - 1]) / slopes[index - 1] +
            (widths[index] + 2 * widths[index - 1]) / slopes[index]);
  tangents[points.length - 1] = slopes[points.length - 2];
  let path = `M${round(points[0][0])},${round(points[0][1])}`;
  for (let index = 0; index < points.length - 1; index++) {
    const third = widths[index] / 3;
    path += `C${round(points[index][0] + third)},${round(points[index][1] + tangents[index] * third)} ${round(points[index + 1][0] - third)},${round(points[index + 1][1] - tangents[index + 1] * third)} ${round(points[index + 1][0])},${round(points[index + 1][1])}`;
  }
  return path;
}
function queueChart(
  jobs: QueueJob[],
  now: number,
  window: number,
  waiting: number,
  failed: number,
  rateLimits: QueueRateLimit[],
  backpressure: number | undefined,
  width: number,
  layout: QueueLayout,
) {
  const start = now - window,
    interval = window / 96;
  const arrivals = jobs.map((job) => job.enqueuedAt).sort((a, b) => a - b),
    departures = jobs
      .map((job) =>
        Math.max(
          job.enqueuedAt,
          job.status === "queued" ? Infinity : (job.startedAt ?? job.endedAt ?? Infinity),
        ),
      )
      .sort((a, b) => a - b);
  let arrivalIndex = 0,
    departureIndex = 0;
  function depth(at: number) {
    while (arrivalIndex < arrivals.length && arrivals[arrivalIndex] <= at) arrivalIndex++;
    while (departureIndex < departures.length && departures[departureIndex] <= at)
      departureIndex++;
    return arrivalIndex - departureIndex;
  }
  const samples: Point[] = [[start, depth(start)]];
  for (
    let at = Math.ceil(start / interval) * interval;
    at < now - interval * 0.25;
    at += interval
  )
    samples.push([at, depth(at)]);
  samples.push([now, waiting]);
  const peak = Math.max(0, ...samples.map((point) => point[1])),
    ceiling = Math.max(peak * 1.15, (backpressure ?? 0) * 1.2, 4),
    ymax = axisSteps.find((step) => step >= ceiling) ?? Math.ceil(ceiling / 500) * 500;
  const gutter = Math.max(26, 10 + formatCount(ymax).length * 7),
    plotWidth = Math.max(40, width - 2 * layout.pad - gutter),
    height = layout.narrow ? 88 : 112,
    scale = (at: number) => ((at - start) / window) * plotWidth;
  const line = smoothPath(samples.map(([at, value]) => [scale(at), value])),
    area = line ? `${line}L${round(plotWidth)},0L0,0Z` : "";
  const average = samples.reduce((sum, point) => sum + point[1], 0) / samples.length,
    bands = rateLimits
      .filter((limit) => limit.until > start && limit.from < now)
      .map((limit) => ({
        limit,
        x1: scale(Math.max(limit.from, start)),
        x2: scale(Math.min(limit.until, now)),
      }));
  const minutes = window / minute,
    label =
      minutes >= 2880
        ? `${+(minutes / 1440).toFixed(1)} days`
        : minutes >= 120
          ? `${+(minutes / 60).toFixed(1)} h`
          : minutes >= 2
            ? `${+minutes.toFixed(1)} min`
            : `${Math.round(window / 1000)}s`;
  const description = `Queue depth over the last ${label}: ${waiting} waiting now, peak ${peak}, average ${average.toFixed(1)}${backpressure === undefined ? "" : `, backpressure line at ${backpressure}`}${bands.length ? `, rate limited ${bands.length === 1 ? "once" : `${bands.length} times`}` : ""}${failed ? `, ${failed} failed in all` : ""}.`;
  return {
    ymax,
    gutter,
    width: plotWidth,
    height,
    line,
    area,
    bands,
    label,
    description,
  };
}
function updateHistory(
  history: QueueHistory,
  jobs: QueueJob[],
  queued: QueueJob[],
  limit: QueueRateLimit | undefined,
  now: number,
  clock: number,
  backpressure: number | undefined,
) {
  const announce = (message: string) => {
    history.msg = message;
    history.msgAt = clock;
  };
  for (const job of jobs) {
    const attempt = job.attempt ?? 1,
      previous = history.seen.get(job.id);
    if (!previous) {
      history.seen.set(job.id, {
        status: job.status,
        attempt,
        first: clock,
        fresh: history.mounted,
        worker: job.worker,
      });
      continue;
    }
    if (job.status === "running" && job.worker) previous.worker = job.worker;
    if (previous.status === job.status && previous.attempt === attempt) continue;
    const active = previous.status === "running" || previous.status === "queued";
    if ((job.status === "done" || job.status === "failed") && active)
      history.gone.set(job.id, clock);
    if (job.status === "failed" && active)
      announce(`${job.name} failed${job.error ? `: ${job.error}` : ""}`);
    if (job.status === "queued" && previous.status === "running") {
      history.flash.set(job.id, clock);
      if (attempt > previous.attempt)
        announce(
          `${job.name} failed – retrying, attempt ${attempt}${job.maxAttempts ? ` of ${job.maxAttempts}` : ""}`,
        );
    }
    previous.status = job.status;
    previous.attempt = attempt;
  }
  const limited = !!limit;
  if (limited !== history.limited) {
    if (history.mounted)
      announce(
        limit
          ? `Rate limited – workers paused for ${Math.ceil((limit.until - now) / 1000)} seconds`
          : "Rate limit lifted – workers resumed",
      );
    history.limited = limited;
  }
  const over = backpressure !== undefined && queued.length > backpressure;
  if (over !== history.over) {
    if (over && history.mounted)
      announce(
        `${formatCount(queued.length)} jobs waiting – above the backpressure line of ${backpressure}`,
      );
    history.over = over;
  }
  for (const [id, at] of history.gone)
    if (clock - at > completionLifetime) history.gone.delete(id);
  for (const [id, at] of history.flash)
    if (clock - at > retryLifetime) history.flash.delete(id);
  if (history.seen.size > jobs.length + 64) {
    const ids = new Set(jobs.map((job) => job.id));
    for (const id of history.seen.keys()) if (!ids.has(id)) history.seen.delete(id);
  }
}
function queueTiles(
  jobs: QueueJob[],
  queued: QueueJob[],
  running: QueueJob[],
  workers: QueueWorker[],
  layout: QueueLayout,
  history: QueueHistory,
  clock: number,
) {
  const rank = (job: QueueJob) => {
    const value = priorityRank[job.priority ?? "normal"],
      seen = history.seen.get(job.id);
    return value === 0 && seen?.fresh && clock - seen.first < priorityDelay ? 1 : value;
  };
  const sorted = [...queued].sort(
    (a, b) => rank(a) - rank(b) || a.enqueuedAt - b.enqueuedAt || (a.id < b.id ? -1 : 1),
  );
  const chipCount = layout.chips.length,
    gridCapacity = layout.grid.cols * layout.grid.rows,
    overflow = sorted.length > chipCount + gridCapacity,
    squareCount = overflow ? gridCapacity - 3 : gridCapacity,
    hiddenCount = Math.max(0, sorted.length - chipCount - squareCount);
  const workerIndices = new Map(workers.map((worker, index) => [worker.id, index])),
    tiles: JobTile[] = [];
  const railBox = (slot: Box): Box => ({
    x: slot.x + layout.rail.x,
    y: slot.y + layout.rail.y,
    w: layout.rail.w,
    h: layout.rail.h,
  });
  function previousSlot(job: QueueJob, at: number | undefined, lifetime: number) {
    if (at === undefined || clock - at >= lifetime) return;
    const worker = history.seen.get(job.id)?.worker ?? job.worker,
      index = worker === undefined ? undefined : workerIndices.get(worker);
    return index === undefined ? undefined : layout.slots[index];
  }
  let visibleIndex = 0;
  for (const job of sorted) {
    const flash = history.flash.has(job.id),
      previous = previousSlot(job, history.flash.get(job.id), retryHold);
    if (previous) {
      tiles.push({
        job,
        shape: "bar",
        box: railBox(previous),
        flash: true,
        p: 1,
      });
      continue;
    }
    const index = visibleIndex++;
    if (index < chipCount)
      tiles.push({
        job,
        shape: "chip",
        box: layout.chips[index],
        index,
        flash,
      });
    else if (index < chipCount + squareCount) {
      const offset = index - chipCount;
      tiles.push({
        job,
        shape: "square",
        box: {
          x: layout.grid.x + (offset % layout.grid.cols) * layout.grid.step,
          y: layout.grid.y + Math.floor(offset / layout.grid.cols) * gridPitch,
          w: squareSize,
          h: squareSize,
        },
        index,
        flash,
      });
    }
  }
  for (const job of running) {
    const index = job.worker === undefined ? undefined : workerIndices.get(job.worker);
    if (index !== undefined)
      tiles.push({
        job,
        shape: "bar",
        box: railBox(layout.slots[index]),
        flash: false,
      });
  }
  for (const job of jobs) {
    if (!history.gone.has(job.id) || (job.status !== "done" && job.status !== "failed"))
      continue;
    const previous = previousSlot(
      job,
      history.gone.get(job.id),
      job.status === "done" ? successHold : retryHold,
    );
    if (previous) {
      tiles.push({
        job,
        shape: "bar",
        box: railBox(previous),
        flash: false,
        p: 1,
      });
      continue;
    }
    const bin = job.status === "done" ? layout.done : layout.failed;
    tiles.push({
      job,
      shape: "gone",
      box: {
        x: bin.x + 17,
        y: bin.y + (layout.narrow ? 15 : 17),
        w: 10,
        h: 10,
      },
      flash: false,
    });
  }
  tiles.sort((a, b) => (a.job.id < b.job.id ? -1 : 1));
  return {
    sorted,
    chipCount,
    gridCapacity,
    overflow,
    squareCount,
    hiddenCount,
    workerIndices,
    tiles,
  };
}
/** Animate values without rerendering every metric; pause while the queue is off screen. */
function useQueueNumbers(
  rootRef: RefObject<HTMLDivElement | null>,
  prefix: string,
  needClock: boolean,
  ymax: number,
  setClock: (now: number) => void,
) {
  const numbers = useRef(new Map<string, NumberSlot>()),
    options = useRef({ needClock, ymax }),
    wake = useRef(() => {});
  options.current = { needClock, ymax };
  function number(key: string, value: number, format: (value: number) => string) {
    let slot = numbers.current.get(key);
    if (!slot) {
      slot = { el: null, shown: value, target: value, format };
      numbers.current.set(key, slot);
    }
    slot.target = value;
    slot.format = format;
    const record = slot;
    return (
      <span
        className={`${prefix}__num`}
        ref={(element) => {
          record.el = element;
          if (element && !element.textContent)
            element.textContent = record.format(record.shown);
        }}
      />
    );
  }
  useEffect(() => {
    let frame = 0,
      visible = true,
      last = performance.now(),
      lastClock = 0,
      scale = options.current.ymax;
    rootRef.current?.style.setProperty(`--${prefix}-ymax`, String(scale));
    function tick(now: number) {
      frame = 0;
      const elapsed = Math.min(64, now - last);
      last = now;
      const immediate = reducedMotion(),
        factor = 1 - Math.exp(-elapsed / 110);
      let active = false;
      for (const slot of numbers.current.values()) {
        if (slot.shown === slot.target) continue;
        const delta = slot.target - slot.shown;
        slot.shown =
          immediate ||
          Math.abs(delta) < 0.02 * Math.max(1, Math.abs(slot.target)) * 0.05 + 0.004
            ? slot.target
            : slot.shown + delta * factor;
        if (slot.el) slot.el.textContent = slot.format(slot.shown);
        active = true;
      }
      const target = options.current.ymax;
      if (scale !== target) {
        const delta = target - scale;
        scale =
          immediate || Math.abs(delta) < 0.01
            ? target
            : scale + delta * (1 - Math.exp(-elapsed / 160));
        rootRef.current?.style.setProperty(`--${prefix}-ymax`, String(scale));
        active = true;
      }
      if (options.current.needClock) {
        active = true;
        if (now - lastClock > 33) {
          lastClock = now;
          setClock(Date.now());
        }
      }
      if (active && visible && !document.hidden) frame = requestAnimationFrame(tick);
    }
    const resume = () => {
      if (!frame && visible && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    wake.current = resume;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resume();
    });
    if (rootRef.current) observer.observe(rootRef.current);
    document.addEventListener("visibilitychange", resume);
    resume();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);
  useEffect(() => wake.current());
  useLayoutEffect(() => {
    rootRef.current?.style.setProperty(`--${prefix}-ymax`, String(options.current.ymax));
  }, []);
  return number;
}
function useAgentQueue(props: AgentQueueProps, prefix: string) {
  const {
    jobs,
    workers,
    now: providedNow,
    rateLimits = [],
    paused = false,
    backpressure,
    window: windowSize = 2 * minute,
    totals,
    openId,
    defaultOpenId = null,
    onOpenChange,
  } = props;
  const rootRef = useRef<HTMLDivElement>(null),
    cardRef = useRef<HTMLDivElement>(null),
    popoverRef = useRef<HTMLDivElement>(null),
    buttons = useRef(new Map<string, HTMLButtonElement>()),
    gradientId = prefix + "-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [measuredWidth, setWidth] = useState(0);
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    setWidth(card.clientWidth);
    const observer = new ResizeObserver(() => setWidth(card.clientWidth));
    observer.observe(card);
    return () => observer.disconnect();
  }, []);
  const width = measuredWidth || 812,
    [clock, setClock] = useState(() => Date.now()),
    now = providedNow ?? clock,
    rateLimit = rateLimits.find((limit) => limit.from <= now && now < limit.until),
    limited = !!rateLimit,
    queued = jobs.filter((job) => job.status === "queued"),
    running = jobs.filter((job) => job.status === "running");
  const needClock =
      providedNow === undefined && (queued.length > 0 || running.length > 0 || limited),
    history = useRef<QueueHistory>({
      seen: new Map(),
      gone: new Map(),
      flash: new Map(),
      limited: false,
      over: false,
      msg: "",
      msgAt: 0,
      mounted: false,
    }),
    animationClock = typeof performance !== "undefined" ? performance.now() : 0;
  updateHistory(
    history.current,
    jobs,
    queued,
    rateLimit,
    now,
    animationClock,
    backpressure,
  );
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    history.current.mounted = true;
    if (history.current.msg && history.current.msg !== announcement)
      setAnnouncement(history.current.msg);
  });
  const layout = queueLayout(width, workers.length),
    placement = queueTiles(
      jobs,
      queued,
      running,
      workers,
      layout,
      history.current,
      animationClock,
    );
  const done = totals?.done ?? jobs.filter((job) => job.status === "done").length,
    failed = totals?.failed ?? jobs.filter((job) => job.status === "failed").length;
  const throughput = jobs.filter(
    (job) =>
      job.status === "done" &&
      job.endedAt !== undefined &&
      job.endedAt > now - minute &&
      job.endedAt <= now,
  ).length;
  const waitP95 = percentile(
    [
      ...jobs
        .filter(
          (job) =>
            job.startedAt !== undefined &&
            job.status !== "queued" &&
            job.startedAt > now - minute,
        )
        .map((job) => job.startedAt! - job.enqueuedAt),
      ...queued.map((job) => now - job.enqueuedAt),
    ],
    0.95,
  );
  const over = backpressure !== undefined && queued.length > backpressure,
    state = limited
      ? "limited"
      : paused
        ? "paused"
        : queued.length || running.length
          ? "live"
          : "idle";
  const chart = queueChart(
      jobs,
      now,
      windowSize,
      queued.length,
      failed,
      rateLimits,
      backpressure,
      width,
      layout,
    ),
    number = useQueueNumbers(rootRef, prefix, needClock, chart.ymax, setClock);
  const [, refresh] = useState(0),
    transient =
      history.current.gone.size > 0 ||
      history.current.flash.size > 0 ||
      queued.some(
        (job) =>
          job.priority === "high" &&
          animationClock - (history.current.seen.get(job.id)?.first ?? 0) < priorityDelay,
      );
  useEffect(() => {
    if (!transient) return;
    const timer = window.setTimeout(() => refresh((value) => value + 1), 120);
    return () => window.clearTimeout(timer);
  });
  const [localOpen, setLocalOpen] = useState(defaultOpenId),
    open = openId === undefined ? localOpen : openId;
  function changeOpen(id: string | null) {
    setLocalOpen(id);
    onOpenChange?.(id, id ? jobs.find((job) => job.id === id) : undefined);
  }
  const [hovered, setHovered] = useState<string | null>(null),
    visible = placement.tiles.filter((tile) => tile.shape !== "gone"),
    pinned = open ? visible.find((tile) => tile.job.id === open) : undefined,
    hoveredTile =
      !pinned && hovered ? visible.find((tile) => tile.job.id === hovered) : undefined,
    popover = pinned ?? hoveredTile;
  useEffect(() => {
    if (open && !pinned) changeOpen(null);
  });
  useEffect(() => {
    if (!pinned) return;
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !popoverRef.current?.contains(event.target) &&
        ![...buttons.current.values()].some((button) =>
          button.contains(event.target as Node),
        )
      )
        changeOpen(null);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  });
  const [popoverHeight, setPopoverHeight] = useState(120);
  useLayoutEffect(() => {
    const height = popoverRef.current?.offsetHeight;
    if (height && Math.abs(height - popoverHeight) > 1) setPopoverHeight(height);
  });
  const runningWithWorkers = running.filter(
      (job) => job.worker !== undefined && placement.workerIndices.has(job.worker),
    ),
    navigation = [
      ...runningWithWorkers.sort(
        (a, b) =>
          placement.workerIndices.get(a.worker!)! -
          placement.workerIndices.get(b.worker!)!,
      ),
      ...placement.sorted.slice(0, placement.chipCount + placement.squareCount),
    ];
  const [focused, setFocused] = useState<string | null>(null),
    tabStop =
      focused && navigation.some((job) => job.id === focused)
        ? focused
        : navigation[0]?.id;
  function focus(job: QueueJob | undefined) {
    if (job) {
      setFocused(job.id);
      buttons.current.get(job.id)?.focus();
    }
  }
  function onJobKeyDown(event: KeyboardEvent<HTMLButtonElement>, job: QueueJob) {
    const index = navigation.findIndex((item) => item.id === job.id),
      actions: Record<string, () => void> = {
        ArrowDown: () => focus(navigation[index + 1]),
        ArrowRight: () => focus(navigation[index + 1]),
        ArrowUp: () => focus(navigation[index - 1]),
        ArrowLeft: () => focus(navigation[index - 1]),
        Home: () => focus(navigation[0]),
        End: () => focus(navigation[navigation.length - 1]),
        Escape: () => {
          if (open) changeOpen(null);
        },
      };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }
  return {
    rootRef,
    cardRef,
    popoverRef,
    buttons,
    gradientId,
    width,
    now,
    rateLimit,
    limited,
    queued,
    running,
    history,
    announcement,
    layout,
    placement,
    done,
    failed,
    throughput,
    waitP95,
    over,
    state,
    chart,
    number,
    open,
    changeOpen,
    setHovered,
    pinned,
    popover,
    popoverHeight,
    setFocused,
    tabStop,
    onJobKeyDown,
    busy: runningWithWorkers.length,
  };
}
function JobButton({
  tile,
  queue,
  prefix,
}: {
  tile: JobTile;
  queue: ReturnType<typeof useAgentQueue>;
  prefix: string;
}) {
  const { job, shape, box, flash } = tile,
    gone = shape === "gone",
    attempt = job.attempt ?? 1,
    halted = job.status === "running" && queue.limited;
  const meta =
    job.status === "queued"
      ? duration(queue.now - job.enqueuedAt)
      : job.status === "running"
        ? halted
          ? "Paused"
          : duration(queue.now - (job.startedAt ?? queue.now))
        : job.status === "done"
          ? "Done"
          : "Failed";
  const seen = queue.history.current.seen.get(job.id),
    delay = seen && !seen.fresh ? Math.min(420, (tile.index ?? 0) * 22) : 0;
  return (
    <button
      ref={(element) => {
        if (element) queue.buttons.current.set(job.id, element);
        else queue.buttons.current.delete(job.id);
      }}
      type="button"
      className={`${prefix}__job`}
      data-shape={shape}
      data-kind={job.kind}
      data-status={job.status}
      data-flash={flash ? "" : undefined}
      data-halted={halted ? "" : undefined}
      data-priority={job.priority && job.priority !== "normal" ? job.priority : undefined}
      data-open={queue.open === job.id ? "" : undefined}
      tabIndex={!gone && queue.tabStop === job.id ? 0 : -1}
      aria-hidden={gone || undefined}
      aria-label={jobLabel(tile, queue.now, queue.limited, queue.placement.sorted.length)}
      aria-haspopup="dialog"
      aria-expanded={queue.open === job.id}
      style={
        {
          translate: `${box.x}px ${box.y}px`,
          width: box.w,
          height: box.h,
          "--p": tile.p ?? jobProgress(job, queue.now),
          animationDelay: `${delay}ms`,
        } as CSSProperties
      }
      onPointerEnter={() => {
        if (!gone) queue.setHovered(job.id);
      }}
      onPointerLeave={() =>
        queue.setHovered((previous) => (previous === job.id ? null : previous))
      }
      onFocus={() => queue.setFocused(job.id)}
      onClick={() => {
        if (!gone) {
          queue.setFocused(job.id);
          queue.changeOpen(queue.open === job.id ? null : job.id);
        }
      }}
      onKeyDown={(event) => queue.onJobKeyDown(event, job)}
    >
      <span className={`${prefix}__fill`} aria-hidden="true" />
      <span className={`${prefix}__job-in`} aria-hidden="true">
        <span className={`${prefix}__job-icon`} data-logo={job.icon ? "" : undefined}>
          {job.icon ?? <KindIcon kind={job.kind} />}
        </span>
        <span className={`${prefix}__job-name`} dir="auto">
          {job.name}
        </span>
        {job.priority === "high" && (
          <span className={`${prefix}__badge`} data-kind="high" title="High priority">
            <PromoteIcon />
          </span>
        )}
        {attempt > 1 && (
          <span
            className={`${prefix}__badge`}
            data-kind="retry"
            title={`Attempt ${attempt}`}
          >
            <RetryIcon />
            {attempt}
          </span>
        )}
        <span className={`${prefix}__job-meta`}>{meta}</span>
      </span>
    </button>
  );
}
function JobDetails({
  tile,
  queue,
  prefix,
  workers,
  onPromote,
  onCancel,
}: {
  tile: JobTile;
  queue: ReturnType<typeof useAgentQueue>;
  prefix: string;
} & Pick<AgentQueueProps, "workers" | "onPromote" | "onCancel">) {
  const job = tile.job,
    pinned = !!queue.pinned,
    attempt = job.attempt ?? 1,
    worker = job.worker ? workers.find((worker) => worker.id === job.worker) : undefined;
  const stats: [string, string][] = [
    job.status === "queued"
      ? ["Waiting", duration(queue.now - job.enqueuedAt)]
      : ["Waited", duration((job.startedAt ?? queue.now) - job.enqueuedAt)],
  ];
  if (job.status === "running")
    stats.push(["Running", duration(queue.now - (job.startedAt ?? queue.now))]);
  if (job.status === "queued")
    stats.push([
      "Position",
      `${formatCount((tile.index ?? 0) + 1)} of ${formatCount(queue.placement.sorted.length)}`,
    ]);
  if (job.status === "running" && worker) stats.push(["Worker", worker.name]);
  stats.push(
    [
      "Priority",
      job.priority === "high" ? "High" : job.priority === "low" ? "Low" : "Normal",
    ],
    ["Attempt", `${attempt}${job.maxAttempts ? ` of ${job.maxAttempts}` : ""}`],
  );
  const width = Math.min(
      queue.layout.narrow ? queue.width - 2 * queue.layout.pad : 280,
      queue.width - 16,
    ),
    below = tile.box.y + tile.box.h + 6,
    top =
      below + queue.popoverHeight > queue.layout.height + 120 &&
      tile.box.y - queue.popoverHeight - 6 > 0
        ? tile.box.y - queue.popoverHeight - 6
        : below,
    left = clamp(tile.box.x, 8, queue.width - width - 8),
    halted = job.status === "running" && queue.limited;
  function close() {
    queue.changeOpen(null);
    queue.buttons.current.get(job.id)?.focus();
  }
  return (
    <div
      ref={queue.popoverRef}
      className={`${prefix}__pop`}
      role={pinned ? "dialog" : "tooltip"}
      aria-label={`${job.name} details`}
      data-pinned={pinned ? "" : undefined}
      data-kind={job.kind}
      data-status={halted ? "halted" : job.status}
      style={{ translate: `${left}px ${top}px`, width }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          close();
        }
      }}
    >
      <div className={`${prefix}__pop-head`}>
        <span className={`${prefix}__pop-icon`} data-logo={job.icon ? "" : undefined}>
          {job.icon ?? <KindIcon kind={job.kind} />}
        </span>
        <span className={`${prefix}__pop-who`}>
          <span className={`${prefix}__pop-name`} dir="auto">
            {job.name}
          </span>
          <span className={`${prefix}__pop-kind`} dir="auto">
            {kindLabels[job.kind]}
            {job.detail ? ` · ${job.detail}` : ""}
          </span>
        </span>
        <span className={`${prefix}__pill`} data-status={halted ? "halted" : job.status}>
          {halted ? "Paused" : statusLabels[job.status]}
        </span>
        {pinned && (
          <button
            type="button"
            className={`${prefix}__close`}
            aria-label="Close details"
            onClick={close}
          >
            <CloseIcon size={14} w={1.8} />
          </button>
        )}
      </div>
      <dl className={`${prefix}__pop-stats`}>
        {stats.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {job.error && (
        <p className={`${prefix}__pop-error`}>
          <WarningIcon />
          <span dir="auto">{job.error}</span>
        </p>
      )}
      {pinned &&
        (onPromote || onCancel) &&
        (job.status === "queued" || job.status === "running") && (
          <div className={`${prefix}__pop-actions`}>
            {onPromote && job.status === "queued" && (tile.index ?? 0) > 0 && (
              <button
                type="button"
                className={`${prefix}__btn`}
                onClick={() => onPromote(job)}
              >
                <PromoteIcon />
                Move to front
              </button>
            )}
            {onCancel && (
              <button
                type="button"
                className={`${prefix}__btn`}
                data-kind="danger"
                onClick={() => {
                  onCancel(job);
                  queue.changeOpen(null);
                }}
              >
                <CloseIcon size={10} />
                Cancel
              </button>
            )}
          </div>
        )}
    </div>
  );
}
function QueueFlow({
  queue,
  prefix,
  workers,
  paused,
  onPromote,
  onCancel,
}: {
  queue: ReturnType<typeof useAgentQueue>;
  prefix: string;
} & Pick<AgentQueueProps, "workers" | "paused" | "onPromote" | "onCancel">) {
  const { layout, placement, number } = queue;
  return (
    <div
      className={`${prefix}__flow`}
      style={{ height: layout.height }}
      data-narrow={layout.narrow ? "" : undefined}
    >
      <span className={`${prefix}__col-head`} style={boxStyle(layout.heads.queue)}>
        <span>Queue</span>
        <b>{number("depth", queue.queued.length, formatCount)}</b>
        {placement.hiddenCount > 0 && layout.narrow && (
          <span className={`${prefix}__col-more`}>
            {"+"}
            {formatCount(placement.hiddenCount)}
            {" more"}
          </span>
        )}
      </span>
      <span className={`${prefix}__col-head`} style={boxStyle(layout.heads.workers)}>
        <span>Workers</span>
        <b>
          {queue.busy}
          {"/"}
          {workers.length}
        </b>
      </span>
      <span
        className={`${prefix}__well`}
        aria-hidden="true"
        data-empty={placement.sorted.length <= placement.chipCount ? "" : undefined}
        style={boxStyle(layout.well)}
      />
      {placement.sorted.length === 0 && (
        <span
          className={`${prefix}__empty`}
          style={boxStyle({
            x: layout.chips[0].x,
            y: layout.chips[0].y,
            w: layout.chips[0].w,
            h: layout.well.y + layout.well.h - layout.chips[0].y,
          })}
        >
          Nothing waiting
        </span>
      )}
      {placement.overflow && (
        <span
          className={`${prefix}__more`}
          aria-hidden="true"
          style={boxStyle({
            x:
              layout.grid.x +
              ((placement.gridCapacity - 3) % layout.grid.cols) * layout.grid.step,
            y:
              layout.grid.y +
              Math.floor((placement.gridCapacity - 3) / layout.grid.cols) * gridPitch,
            w: 2 * layout.grid.step + squareSize,
            h: squareSize,
          })}
        >
          {"+"}
          {compactCount(placement.hiddenCount)}
        </span>
      )}
      {workers.map((worker, index) => {
        const slot = layout.slots[index],
          busy = queue.running.some((job) => job.worker === worker.id);
        return (
          <div
            className={`${prefix}__slot`}
            data-busy={busy ? "" : undefined}
            data-limited={queue.limited ? "" : undefined}
            style={boxStyle(slot)}
            key={worker.id}
          >
            <span className={`${prefix}__who`} style={{ width: layout.rail.x - 16 }}>
              <span
                className={`${prefix}__logo`}
                data-logo={worker.icon ? "" : undefined}
              >
                {worker.icon ?? initials(worker.name)}
              </span>
              <span className={`${prefix}__who-text`}>
                <span className={`${prefix}__who-name`}>{worker.name}</span>
              </span>
            </span>
            <span
              className={`${prefix}__rail`}
              style={{
                left: layout.rail.x,
                top: layout.rail.y,
                width: layout.rail.w,
                height: layout.rail.h,
              }}
            >
              {!busy && <span>{queue.limited || paused ? "Paused" : "Idle"}</span>}
            </span>
          </div>
        );
      })}
      {(["done", "failed"] as const).map((status) => {
        const value = status === "done" ? queue.done : queue.failed;
        return (
          <div
            className={`${prefix}__bin`}
            data-kind={status}
            style={boxStyle(status === "done" ? layout.done : layout.failed)}
            key={status}
          >
            <span className={`${prefix}__bin-icon`}>
              {status === "done" ? <DoneIcon /> : <CloseIcon />}
            </span>
            <span className={`${prefix}__bin-label`}>
              {status === "done" ? "Done" : "Failed"}
            </span>
            <span className={`${prefix}__bin-count`} title={formatCount(value)}>
              {number(`bin-${status}`, value, compactCount)}
            </span>
            <span className={`${prefix}__bin-hit`} aria-hidden="true" key={value} />
          </div>
        );
      })}
      <div
        className={`${prefix}__jobs`}
        role="group"
        aria-label={`Jobs: ${queue.busy} running, ${placement.sorted.length} waiting`}
      >
        {placement.tiles.map((tile) => (
          <JobButton tile={tile} queue={queue} prefix={prefix} key={tile.job.id} />
        ))}
      </div>
      {queue.popover && (
        <JobDetails
          tile={queue.popover}
          queue={queue}
          prefix={prefix}
          workers={workers}
          onPromote={onPromote}
          onCancel={onCancel}
          key={queue.popover.job.id}
        />
      )}
    </div>
  );
}
function QueueChart({
  queue,
  prefix,
  backpressure,
}: {
  queue: ReturnType<typeof useAgentQueue>;
  prefix: string;
  backpressure?: number;
}) {
  const { chart, gradientId } = queue;
  return (
    <div
      className={`${prefix}__chart`}
      style={{ [`--${prefix}-gutter`]: `${chart.gutter}px` } as CSSProperties}
    >
      <div className={`${prefix}__chart-head`}>
        <span className={`${prefix}__chart-title`}>Queue depth</span>
      </div>
      <div
        className={`${prefix}__plot`}
        role="img"
        aria-label={chart.description}
        style={{ height: chart.height }}
      >
        {[0, chart.ymax].map((value) => (
          <span
            className={`${prefix}__grid`}
            data-zero={value === 0 ? "" : undefined}
            style={{ "--v": value } as CSSProperties}
            aria-hidden="true"
            key={value}
          >
            {(backpressure === undefined ||
              Math.abs(value - backpressure) > chart.ymax * 0.1) && (
              <span>{formatCount(value)}</span>
            )}
          </span>
        ))}
        <svg
          className={`${prefix}__svg`}
          width={chart.width}
          height={chart.height}
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" className={`${prefix}__stop`} data-at="top" />
              <stop offset="1" className={`${prefix}__stop`} data-at="bottom" />
            </linearGradient>
          </defs>
          {chart.bands.map(({ limit, x1, x2 }) => (
            <g className={`${prefix}__band`} key={limit.from}>
              <rect x={x1} y={0} width={Math.max(1, x2 - x1)} height={chart.height} />
            </g>
          ))}
          <g
            className={`${prefix}__scaled`}
            style={{ "--h": chart.height } as CSSProperties}
          >
            <path
              className={`${prefix}__area`}
              d={chart.area}
              fill={`url(#${gradientId})`}
            />
            <path className={`${prefix}__line`} d={chart.line} />
            {backpressure !== undefined && (
              <line
                className={`${prefix}__bp`}
                x1={0}
                x2={chart.width}
                y1={backpressure}
                y2={backpressure}
              />
            )}
          </g>
        </svg>
        {backpressure !== undefined && (
          <span
            className={`${prefix}__bp-label`}
            style={{ "--v": backpressure } as CSSProperties}
            aria-hidden="true"
          >
            {backpressure}
          </span>
        )}
        <span
          className={`${prefix}__dot`}
          style={{ "--v": queue.queued.length } as CSSProperties}
          aria-hidden="true"
        />
      </div>
      <div className={`${prefix}__axis`} aria-hidden="true">
        <span>
          {chart.label}
          {" ago"}
        </span>
        <span>now</span>
      </div>
    </div>
  );
}
function AgentQueueView(
  props: AgentQueueProps & {
    clean?: boolean;
  },
) {
  const {
    workers,
    paused = false,
    onPausedChange,
    onConcurrencyChange,
    minConcurrency = 1,
    maxConcurrency = 8,
    backpressure,
    onPromote,
    onCancel,
    title = "Queue",
    name,
    className,
    clean = false,
  } = props;
  const prefix = clean ? "ui-agqc" : "ui-agq",
    queue = useAgentQueue(props, prefix),
    { number } = queue;
  const stats = [
    {
      label: "Waiting",
      value: number("waiting", queue.queued.length, formatCount),
      kind: queue.over ? "warn" : undefined,
    },
    {
      label: "Running",
      value: (
        <>
          {number("running", queue.busy, formatCount)}
          <span className={`${prefix}__of`}>
            {"/"}
            {workers.length}
          </span>
        </>
      ),
    },
    {
      label: "Throughput",
      value: (
        <>
          {number("rate", queue.throughput, formatCount)}
          <span className={`${prefix}__of`}>/min</span>
        </>
      ),
    },
    { label: "Wait p95", value: number("p95", queue.waitP95, duration) },
  ];
  const limitSeconds = queue.rateLimit
      ? Math.max(0, Math.ceil((queue.rateLimit.until - queue.now) / 1000))
      : 0,
    less = workers.length > minConcurrency,
    more = workers.length < maxConcurrency;
  return (
    <div
      ref={queue.rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-state={queue.state}
    >
      <header className={`${prefix}__head`}>
        <span className={`${prefix}__mark`}>
          <QueueIcon />
        </span>
        <span className={`${prefix}__title`} title={title}>
          {title}
        </span>
        {name && <span className={`${prefix}__name`}>{name}</span>}
        <span
          className={`${prefix}__pill`}
          data-status={queue.state}
          role={queue.state === "limited" ? "status" : undefined}
          title={queue.state === "limited" ? queue.rateLimit?.label : undefined}
        >
          {(queue.state === "live" || queue.state === "limited") && (
            <span className={`${prefix}__pulse`} aria-hidden="true" />
          )}
          {queue.state === "limited" ? (
            <>
              {"Rate limited · "}
              <span className={`${prefix}__num`}>
                {limitSeconds < 100 ? `${limitSeconds}s` : duration(limitSeconds * 1000)}
              </span>
            </>
          ) : queue.state === "paused" ? (
            "Paused"
          ) : queue.state === "live" ? (
            "Live"
          ) : (
            "Idle"
          )}
        </span>
        <span className={`${prefix}__tools`}>
          {onPausedChange && (
            <button
              type="button"
              className={`${prefix}__btn`}
              aria-pressed={paused}
              aria-label={paused ? "Resume the queue" : "Pause the queue"}
              onClick={() => onPausedChange(!paused)}
            >
              {paused ? <ResumeIcon /> : <PauseIcon />}
              <span className={`${prefix}__btn-text`}>{paused ? "Resume" : "Pause"}</span>
            </button>
          )}
          {onConcurrencyChange && (
            <span className={`${prefix}__stepper`} role="group" aria-label="Workers">
              <button
                type="button"
                aria-label="One worker less"
                disabled={!less}
                onClick={() => {
                  if (less) onConcurrencyChange(workers.length - 1);
                }}
              >
                <MinusIcon />
              </button>
              <output
                className={`${prefix}__stepper-value`}
                aria-live="polite"
                aria-label={`${workers.length} workers`}
              >
                {workers.length}
              </output>
              <button
                type="button"
                aria-label="One worker more"
                disabled={!more}
                onClick={() => {
                  if (more) onConcurrencyChange(workers.length + 1);
                }}
              >
                <PlusIcon />
              </button>
            </span>
          )}
        </span>
      </header>
      <div ref={queue.cardRef} className={`${prefix}__card`}>
        <dl className={`${prefix}__stats`}>
          {stats.map((stat) => (
            <div className={`${prefix}__stat`} data-kind={stat.kind} key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <QueueFlow
          queue={queue}
          prefix={prefix}
          workers={workers}
          paused={paused}
          onPromote={onPromote}
          onCancel={onCancel}
        />
        <QueueChart queue={queue} prefix={prefix} backpressure={backpressure} />
      </div>
      <div className={`${prefix}__sr`} aria-live="polite">
        {queue.announcement}
      </div>
    </div>
  );
}
const kindLabels: Record<QueueKind, string> = {
  llm: "LLM call",
  tool: "Tool call",
  agent: "Sub-agent",
  human: "Human review",
};
const statusLabels: Record<QueueStatus, string> = {
  queued: "Waiting",
  running: "Running",
  done: "Done",
  failed: "Failed",
};
const priorityRank = { high: 0, normal: 1, low: 2 };
const minute = 60000,
  completionLifetime = 1100,
  retryLifetime = 1500,
  priorityDelay = 520,
  successHold = 200,
  retryHold = 520;
const squareSize = 12,
  gridPitch = 16;
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
const round = (value: number) => Math.round(value * 100) / 100;
const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const formatCount = (value: number) => Math.round(value).toLocaleString("en-US");
const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const compactCount = (value: number) =>
  Math.round(value) < 100000 ? formatCount(value) : compact.format(Math.round(value));
const boxStyle = (box: Box): CSSProperties => ({
  translate: `${box.x}px ${box.y}px`,
  width: box.w,
  height: box.h,
});
const axisSteps = [
  4, 6, 8, 10, 12, 16, 20, 24, 30, 40, 50, 60, 80, 100, 120, 160, 200, 300, 400, 500, 600,
  800, 1000, 1500, 2000,
];
const Icon = ({ size, children }: { size?: number; children: ReactNode }) => (
  <svg
    width={size ?? 14}
    height={size ?? 14}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    {children}
  </svg>
);
const QueueIcon = () => (
  <Icon size={16}>
    <path
      d={`M18 18H6C5.05719 18 4.58579 18 4.29289 17.7071C4 17.4142 4 16.9428 4 16C4 15.0572 4 14.5858 4.29289 14.2929C4.58579 14 5.05719 14 6 14H18C18.9428 14 19.4142 14 19.7071 14.2929C20 14.5858 20 15.0572 20 16C20 16.9428 20 17.4142 19.7071 17.7071C19.4142 18 18.9428 18 18 18Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
    <path
      d={`M4 10H20`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
    <path
      d={`M4 6H20`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
  </Icon>
);
const PauseIcon = () => (
  <Icon>
    <path
      d={`M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
    />
    <path
      d={`M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
    />
  </Icon>
);
const ResumeIcon = () => (
  <Icon>
    <path
      d={`M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z`}
      stroke={`currentColor`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
  </Icon>
);
const PlusIcon = () => (
  <Icon>
    <path
      d={`M12 4V20M20 12H4`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
  </Icon>
);
const MinusIcon = () => (
  <Icon>
    <path
      d={`M20 12L4 12`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
  </Icon>
);
const DoneIcon = () => (
  <Icon size={12}>
    <path
      d={`M5 14L8.5 17.5L19 6.5`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`2.4`}
    />
  </Icon>
);
const CloseIcon = ({
  size = 12,
  w: strokeWidth = 2.4,
}: {
  size?: number;
  w?: number;
}) => (
  <Icon size={size}>
    <path
      d={`M18 6L6.00081 17.9992M17.9992 18L6 6.00085`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={strokeWidth}
    />
  </Icon>
);
const WarningIcon = () => (
  <Icon size={12}>
    <path
      d={`M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`2`}
    />
    <path
      d={`M12 9V13`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`2.2`}
    />
    <path
      d={`M12 16.8V17`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`2.6`}
    />
  </Icon>
);
const RetryIcon = () => (
  <Icon size={10}>
    <path
      d={`M20.4879 15C19.2524 18.4956 15.9187 21 12 21C7.02943 21 3 16.9706 3 12C3 7.02943 7.02943 3 12 3C15.7292 3 18.9286 5.26806 20.2941 8.5`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`2.6`}
    />
    <path
      d={`M15 9H18C19.4142 9 20.1213 9 20.5607 8.56066C21 8.12132 21 7.41421 21 6V3`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`2.6`}
    />
  </Icon>
);
const PromoteIcon = () => (
  <Icon size={10}>
    <path
      d={`M12 5.5V19`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`2.8`}
    />
    <path
      d={`M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`2.8`}
    />
  </Icon>
);
const KindIcon = ({ kind }: { kind: QueueKind }) =>
  kind === `llm` ? (
    <Icon size={12}>
      <path
        d={`M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z`}
        stroke={`currentColor`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
      <path
        d={`M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z`}
        stroke={`currentColor`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
    </Icon>
  ) : kind === `tool` ? (
    <Icon size={12}>
      <path
        d={`M20.3584 13.3567C19.1689 14.546 16.9308 14.4998 13.4992 14.4998C11.2914 14.4998 9.50138 12.7071 9.50024 10.4993C9.50024 7.07001 9.454 4.83065 10.6435 3.64138C11.8329 2.45212 12.3583 2.50027 17.6274 2.50027C18.1366 2.49809 18.3929 3.11389 18.0329 3.47394L15.3199 6.18714C14.6313 6.87582 14.6294 7.99233 15.3181 8.68092C16.0068 9.36952 17.1234 9.36959 17.8122 8.68109L20.5259 5.96855C20.886 5.60859 21.5019 5.86483 21.4997 6.37395C21.4997 11.6422 21.5479 12.1675 20.3584 13.3567Z`}
        stroke={`currentColor`}
        strokeWidth={`2`}
      />
      <path
        d={`M13.5 14.5L7.32842 20.6716C6.22386 21.7761 4.433 21.7761 3.32843 20.6716C2.22386 19.567 2.22386 17.7761 3.32843 16.6716L9.5 10.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeWidth={`2`}
      />
    </Icon>
  ) : kind === `agent` ? (
    <Icon size={12}>
      <path
        d={`M13 7H11C8.19108 7 6.78661 7 5.77772 7.67412C5.34096 7.96596 4.96596 8.34096 4.67412 8.77772C4 9.78661 4 11.1911 4 14C4 16.8089 4 18.2134 4.67412 19.2223C4.96596 19.659 5.34096 20.034 5.77772 20.3259C6.78661 21 8.19108 21 11 21H13C15.8089 21 17.2134 21 18.2223 20.3259C18.659 20.034 19.034 19.659 19.3259 19.2223C20 18.2134 20 16.8089 20 14C20 11.1911 20 9.78661 19.3259 8.77772C19.034 8.34096 18.659 7.96596 18.2223 7.67412C17.2134 7 15.8089 7 13 7Z`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
      <path
        d={`M15 11V13M9 11V13M10 17H14`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
      <path
        d={`M12 7C12 5.11438 12 4.17157 11.4142 3.58579C10.8284 3 9.88562 3 8 3`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
    </Icon>
  ) : (
    <Icon size={12}>
      <path
        d={`M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
      <circle
        cx={`12`}
        cy={`6.99988`}
        r={`4`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
    </Icon>
  );
export { AgentQueue };
export type { QueueJob };
export type { QueueWorker };
export type { QueueKind };
export type { QueueStatus };
export type { QueuePriority };
export type { QueueRateLimit };
export type { AgentQueueProps };
