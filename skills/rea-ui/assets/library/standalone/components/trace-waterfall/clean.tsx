"use client";

import "./TraceWaterfall.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  memo,
  type RefObject,
} from "react";
interface TraceSpan {
  id?: string;
  name?: string;
  kind?: "agent" | "subagent" | "llm" | "tool";
  detail?: string;
  icon?: ReactNode;
  model?: string;
  status?: "running" | "done" | "failed";
  start?: number;
  end?: number;
  tokensIn?: number;
  tokensOut?: number;
  cost?: number;
  input?: string;
  output?: string;
  error?: string;
  children?: TraceSpan[];
  [field: string]: unknown;
}
interface TraceWaterfallProps {
  root: TraceSpan;
  now?: number;
  startedAt?: number;
  collapsed?: string[];
  defaultCollapsed?: string[];
  onCollapsedChange?: (collapsed: string[]) => void;
  openId?: string | null;
  defaultOpenId?: string | null;
  onOpenChange?: (id: string | null, span?: TraceSpan) => void;
  markSlowest?: boolean;
  minRange?: number;
  formatCost?: (amount: number) => string;
  title?: string;
  className?: string;
}
type TraceStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};
interface TraceRow {
  span: TraceSpan;
  depth: number;
  parentId?: string;
  hidden: boolean;
  leaving?: number;
}
interface LeavingRow {
  row: TraceRow;
  index: number;
}
interface TraceHandlers {
  click(id: string | undefined): void;
  fold(id: string | undefined): void;
  focus(id: string | undefined): void;
  key(event: KeyboardEvent<HTMLDivElement>, id: string | undefined): void;
  element(id: string | undefined, element: HTMLDivElement | null): void;
}
type TraceController = ReturnType<typeof useTraceWaterfall>;
interface TraceSpanRowProps {
  span: TraceSpan;
  depth: number;
  hidden: boolean;
  leaving?: number;
  folded: boolean;
  open: boolean;
  focusable: boolean;
  slowest: boolean;
  now?: number;
  range: number;
  trackWidth: number;
  delay: number;
  formatCost: (amount: number) => string;
  handlers: RefObject<TraceHandlers | null>;
  prefix: string;
}
function TraceWaterfall(props: TraceWaterfallProps) {
  return <TraceWaterfallView {...props} clean />;
}
function SparkIcon() {
  return (
    <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
      <path
        d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
        fill={`currentColor`}
      />
      <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
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
    </svg>
  );
}
function SpinnerIcon({ prefix }: { prefix: string }) {
  return (
    <svg
      className={`${prefix}__spin`}
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <circle
        cx={`12`}
        cy={`12`}
        r={`8.5`}
        stroke={`currentColor`}
        strokeOpacity={`0.25`}
        strokeWidth={`2.5`}
      />
      <path
        d={`M12 3.5A8.5 8.5 0 0 1 20.5 12`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeWidth={`2.5`}
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg
      width={`14`}
      height={`14`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M19 5L5 19M5 5L19 19`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
    </svg>
  );
}
function formatCost_trace_model(amount: number): string {
  return amount === 0
    ? "$0"
    : amount < 0.001
      ? "<$0.001"
      : amount < 0.01
        ? `$${amount.toFixed(3)}`
        : amount < 10
          ? `$${amount.toFixed(2)}`
          : `$${Math.round(amount).toLocaleString("en-US")}`;
}
function formatDuration(milliseconds: number): string {
  if (milliseconds < 1000) return `${Math.max(0, Math.round(milliseconds))}ms`;
  if (milliseconds < 10000) return `${(milliseconds / 1000).toFixed(1)}s`;
  const seconds = Math.round(milliseconds / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? `${hours}h ${String(minutes % 60).padStart(2, "0")}m`
    : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function formatTick(milliseconds: number): string {
  const seconds = Math.round(milliseconds / 1000);
  return seconds < 60
    ? `${seconds}s`
    : seconds >= 3600
      ? seconds % 3600
        ? `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
        : `${seconds / 3600}h`
      : seconds % 60
        ? `${Math.floor(seconds / 60)}m ${seconds % 60}s`
        : `${seconds / 60}m`;
}
function formatTokens(value: number): string {
  return value < 1000
    ? String(Math.round(value))
    : value < 100000
      ? `${(value / 1000).toFixed(1)}k`
      : value < 999500
        ? `${Math.round(value / 1000)}k`
        : `${(value / 1000000).toFixed(1)}M`;
}
function formatCount(count: number): string {
  return count.toLocaleString("en-US");
}
function flattenSpans(span: TraceSpan): TraceSpan[] {
  return [span, ...(span.children ?? []).flatMap(flattenSpans)];
}
function sumCost(span: TraceSpan): number {
  return (
    (span.cost ?? 0) +
    (span.children ?? []).reduce((total, child) => total + sumCost(child), 0)
  );
}
function sumTokens(span: TraceSpan): [number, number] {
  return (span.children ?? []).reduce<[number, number]>(
    (total, child) => {
      const [input, output] = sumTokens(child);
      return [total[0] + input, total[1] + output];
    },
    [span.tokensIn ?? 0, span.tokensOut ?? 0],
  );
}
function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function easeInOutCubic(progress: number): number {
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
}
function spanStart(span: TraceSpan): number {
  return span.start ?? NaN;
}
function spanEnd(span: TraceSpan, now: number | undefined): number {
  const start = spanStart(span);
  return span.end ?? (span.status === "running" ? Math.max(now ?? start, start) : start);
}
function spanDuration(span: TraceSpan, now: number | undefined): number {
  return Math.max(0, spanEnd(span, now) - spanStart(span));
}
function traceScale(
  spans: TraceSpan[],
  now: number,
  running: boolean,
  minRange: number,
  width: number,
) {
  const end = Math.max(running ? now : 0, ...spans.map((span) => spanEnd(span, now))),
    minimum = Math.max(minRange, end * 1.2);
  const range =
    ranges.find((value) => value >= minimum) ?? Math.ceil(minimum / 3600000) * 3600000;
  const count = Math.min(8, Math.max(3, Math.round((width || 600) / 96))),
    interval = intervals.find((value) => range / value <= count) ?? range / count;
  const ticks: number[] = [];
  for (let tick = 0; tick < range - 1; tick += interval) ticks.push(tick);
  return { range, ticks };
}
function traceRows(root: TraceSpan, collapsed: string[]): TraceRow[] {
  const rows: TraceRow[] = [];
  function visit(
    span: TraceSpan,
    depth: number,
    parentId: string | undefined,
    hidden: boolean,
  ) {
    rows.push({ span, depth, parentId, hidden });
    const hideChildren = hidden || collapsed.includes(span.id!);
    for (const child of span.children ?? [])
      visit(child, depth + 1, span.id, hideChildren);
  }
  visit(root, 0, undefined, false);
  return rows;
}
function mergeLeavingRows(rows: TraceRow[], leaving: LeavingRow[]): TraceRow[] {
  const ids = new Set(rows.map((row) => row.span.id));
  const result = [...rows],
    removed = leaving
      .filter((entry) => !ids.has(entry.row.span.id))
      .sort((first, second) => first.index - second.index),
    rootLeaving = removed.some((entry) => entry.row.depth === 0);
  for (const entry of removed) {
    if (rootLeaving) result.push(entry.row);
    else result.splice(Math.min(entry.index, result.length), 0, entry.row);
  }
  return result;
}
function runningAncestors(root: TraceSpan): Set<string | undefined> {
  const ids = new Set<string | undefined>();
  function visit(span: TraceSpan): boolean {
    let running = span.status === "running";
    for (const child of span.children ?? []) if (visit(child)) running = true;
    if (running) ids.add(span.id);
    return running;
  }
  visit(root);
  return ids;
}
function useTraceWaterfall(
  {
    root,
    now,
    startedAt,
    collapsed,
    defaultCollapsed = [],
    onCollapsedChange,
    openId,
    defaultOpenId = null,
    onOpenChange,
    markSlowest = true,
    minRange = 10000,
    formatCost = formatCost_trace_model,
  }: TraceWaterfallProps,
  prefix: string,
) {
  const rootRef = useRef<HTMLDivElement>(null),
    bodyRef = useRef<HTMLDivElement>(null),
    scaleRef = useRef<HTMLDivElement>(null),
    rowsRef = useRef<HTMLDivElement>(null),
    popoverRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string | undefined, HTMLDivElement>());
  const [localCollapsed, setLocalCollapsed] = useState(defaultCollapsed),
    collapsedIds = collapsed ?? localCollapsed;
  function toggleCollapsed(id: string | undefined) {
    const next = collapsedIds.includes(id!)
      ? collapsedIds.filter((candidate) => candidate !== id)
      : [...collapsedIds, id!];
    setLocalCollapsed(next);
    onCollapsedChange?.(next);
  }
  const [localOpen, setLocalOpen] = useState<string | null | undefined>(defaultOpenId),
    spans = flattenSpans(root),
    selectedId = openId === undefined ? localOpen : openId;
  const selectedSpan = selectedId
    ? spans.find((span) => span.id === selectedId)
    : undefined;
  function selectSpan(id: string | null | undefined) {
    setLocalOpen(id);
    onOpenChange?.(id!, id ? spans.find((span) => span.id === id) : undefined);
  }
  const running = spans.some((span) => span.status === "running");
  const [clock, setClock] = useState(() => Date.now());
  useEffect(() => {
    if (now !== undefined || startedAt === undefined || !running) return;
    const timer = window.setInterval(() => setClock(Date.now()), 100);
    return () => window.clearInterval(timer);
  }, [running, now, startedAt]);
  const lastEnd = Math.max(0, ...spans.map((span) => span.end ?? spanStart(span)));
  const elapsed =
    now ?? (startedAt !== undefined && running ? clock - startedAt : lastEnd);
  const [trackWidth, setTrackWidth] = useState(0);
  const { range, ticks } = traceScale(spans, elapsed, running, minRange, trackWidth);
  const previousTicks = useRef<number[]>([]),
    [leavingTicks, setLeavingTicks] = useState<number[]>([]),
    tickKey = ticks.join(",");
  useLayoutEffect(() => {
    const removed = previousTicks.current.filter((tick) => !ticks.includes(tick));
    previousTicks.current = ticks;
    if (removed.length && !reducedMotion()) {
      setLeavingTicks((previous) => [
        ...previous.filter((tick) => !ticks.includes(tick) && !removed.includes(tick)),
        ...removed,
      ]);
      window.setTimeout(
        () =>
          setLeavingTicks((previous) =>
            previous.filter(
              (tick) => !removed.includes(tick) || previousTicks.current.includes(tick),
            ),
          ),
        520,
      );
    }
  }, [tickKey]);
  const animatedRange = useRef(range),
    frame = useRef(0),
    initialRange = useRef(true);
  useLayoutEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) return;
    function update(value: number) {
      animatedRange.current = value;
      rootElement!.style.setProperty(`--${prefix}-range`, String(value));
    }
    cancelAnimationFrame(frame.current);
    if (initialRange.current || reducedMotion()) {
      initialRange.current = false;
      update(range);
      return;
    }
    const from = animatedRange.current;
    if (from === range) return;
    const start = performance.now();
    function animate() {
      const progress = Math.min(1, (performance.now() - start) / 720);
      update(from + (range - from) * easeInOutCubic(progress));
      if (progress < 1) frame.current = requestAnimationFrame(animate);
    }
    frame.current = requestAnimationFrame(animate);
  }, [range, prefix]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  useLayoutEffect(() => {
    const layer = scaleRef.current;
    if (!layer) return;
    const observer = new ResizeObserver(() => setTrackWidth(layer.offsetWidth));
    observer.observe(layer);
    return () => observer.disconnect();
  }, []);
  const currentRows = traceRows(root, collapsedIds),
    currentIds = new Set(currentRows.map((row) => row.span.id));
  const [leavingRows, setLeavingRows] = useState<LeavingRow[]>([]),
    previousRows = useRef<TraceRow[]>([]);
  useLayoutEffect(() => {
    const previous = previousRows.current;
    previousRows.current = currentRows;
    if (reducedMotion()) return;
    const removed = previous.filter((row) => !currentIds.has(row.span.id));
    if (!removed.length) return;
    const leaving = removed.map((row, index) => ({
      row: {
        ...row,
        leaving: Math.min(240, (removed.length - 1 - index) * 22),
      },
      index: previous.indexOf(row),
    }));
    const removedIds = new Set(leaving.map((entry) => entry.row.span.id));
    setLeavingRows((existing) => [
      ...existing.filter((entry) => !removedIds.has(entry.row.span.id)),
      ...leaving,
    ]);
    window.setTimeout(
      () =>
        setLeavingRows((existing) =>
          existing.filter((entry) => !removedIds.has(entry.row.span.id)),
        ),
      580,
    );
  });
  const rows = mergeLeavingRows(currentRows, leavingRows),
    visibleRows = rows.filter((row) => !row.hidden && row.leaving === undefined);
  const delays = useRef(new Map<string | undefined, number>()),
    rowsMounted = useRef(false);
  let addedIndex = 0;
  for (const row of rows)
    if (row.leaving === undefined && !delays.current.has(row.span.id))
      delays.current.set(
        row.span.id,
        Math.min(400, (rowsMounted.current ? 0 : 60) + addedIndex++ * 36),
      );
  useLayoutEffect(() => {
    rowsMounted.current = true;
    const ids = new Set(
      rows.filter((row) => row.leaving === undefined).map((row) => row.span.id),
    );
    for (const id of delays.current.keys()) if (!ids.has(id)) delays.current.delete(id);
  });
  const [focusedId, setFocusedId] = useState(root.id),
    findRow = (id: string | undefined) => rows.find((row) => row.span.id === id);
  let tabbableId = focusedId;
  for (
    let row = findRow(tabbableId);
    row && (row.hidden || row.leaving !== undefined);
    row = findRow(row.parentId)
  )
    tabbableId = row.parentId ?? root.id;
  if (!visibleRows.some((row) => row.span.id === tabbableId))
    tabbableId = visibleRows[0]?.span.id ?? root.id;
  function focusRow(row: TraceRow | undefined) {
    if (row) {
      setFocusedId(row.span.id);
      rowRefs.current.get(row.span.id)?.focus();
    }
  }
  function onRowKeyDown(event: KeyboardEvent<HTMLDivElement>, row: TraceRow) {
    if (event.target !== event.currentTarget) return;
    const index = visibleRows.findIndex((candidate) => candidate.span.id === row.span.id),
      hasChildren = Boolean(row.span.children?.length),
      folded = collapsedIds.includes(row.span.id!);
    switch (event.key) {
      case "ArrowDown":
        focusRow(visibleRows[index + 1]);
        break;
      case "ArrowUp":
        focusRow(visibleRows[index - 1]);
        break;
      case "Home":
        focusRow(visibleRows[0]);
        break;
      case "End":
        focusRow(visibleRows.at(-1));
        break;
      case "ArrowRight":
        if (hasChildren && folded) toggleCollapsed(row.span.id);
        else if (hasChildren) focusRow(visibleRows[index + 1]);
        break;
      case "ArrowLeft":
        if (hasChildren && !folded) toggleCollapsed(row.span.id);
        else focusRow(findRow(row.parentId));
        break;
      case "Enter":
      case " ":
        selectSpan(selectedId === row.span.id ? null : row.span.id);
        break;
      case "Escape":
        if (selectedId) selectSpan(null);
        break;
      default:
        return;
    }
    event.preventDefault();
  }
  const [closingSpan, setClosingSpan] = useState<TraceSpan | null>(null),
    previousSelected = useRef<TraceSpan | undefined>(undefined);
  useLayoutEffect(() => {
    const previous = previousSelected.current;
    previousSelected.current = selectedSpan;
    if (previous && !selectedSpan && !reducedMotion()) {
      setClosingSpan(previous);
      const timer = window.setTimeout(() => setClosingSpan(null), 170);
      return () => window.clearTimeout(timer);
    }
    if (selectedSpan) setClosingSpan(null);
  }, [selectedSpan?.id]);
  const detailSpan = selectedSpan ?? closingSpan ?? undefined;
  useEffect(() => {
    if (!selectedSpan) return;
    function outside(event: PointerEvent) {
      const target = event.target;
      if (
        target instanceof Node &&
        !popoverRef.current?.contains(target) &&
        !rowsRef.current?.contains(target)
      )
        selectSpan(null);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  });
  useLayoutEffect(() => {
    const popover = popoverRef.current,
      body = bodyRef.current,
      row = detailSpan ? rowRefs.current.get(detailSpan.id) : undefined;
    if (!popover || !body || !row) return;
    const bodyBounds = body.getBoundingClientRect(),
      scale = body.offsetWidth ? bodyBounds.width / body.offsetWidth : 1,
      rowBounds = row.getBoundingClientRect(),
      barBounds = row.querySelector("[data-bar]")?.getBoundingClientRect(),
      width = popover.offsetWidth,
      height = popover.offsetHeight,
      rowTop = (rowBounds.top - bodyBounds.top) / scale,
      below = (rowBounds.bottom - bodyBounds.top) / scale + 6,
      rowHeight = row.offsetHeight || 1,
      rowsTop = rowsRef.current
        ? (rowsRef.current.getBoundingClientRect().top - bodyBounds.top) / scale + 4
        : 0,
      above = rowTop - height - 6,
      alignedAbove = rowsTop + Math.floor((above - rowsTop) / rowHeight) * rowHeight,
      abovePosition = alignedAbove >= rowsTop ? alignedAbove : above,
      top =
        below + height > body.offsetHeight + 24 && abovePosition > 0
          ? abovePosition
          : below,
      left = barBounds ? (barBounds.left - bodyBounds.left) / scale : 8;
    popover.style.left = `${Math.max(8, Math.min(left, body.offsetWidth - width - 8))}px`;
    popover.style.top = `${top}px`;
    popover.dataset.side = top === abovePosition ? "above" : "below";
  });
  const calls = spans.filter((span) => span.kind === "llm" || span.kind === "tool"),
    [tokensIn, tokensOut] = sumTokens(root),
    errors = spans.filter((span) => span.status === "failed").length,
    finishedCalls = calls.filter(
      (span) => span.status !== "running" && span.end !== undefined,
    );
  const slowest =
    markSlowest && finishedCalls.length > 1
      ? finishedCalls.reduce((longest, span) =>
          spanDuration(span, elapsed) > spanDuration(longest, elapsed) ? span : longest,
        )
      : undefined;
  const runStatus =
    root.status === "running" || running
      ? "running"
      : root.status === "failed"
        ? "failed"
        : "done";
  const liveAncestors = runningAncestors(root),
    handlers = useRef<TraceHandlers | null>(null);
  handlers.current = {
    click(id) {
      setFocusedId(id);
      selectSpan(selectedId === id ? null : id);
    },
    fold(id) {
      setFocusedId(id);
      toggleCollapsed(id);
    },
    focus: setFocusedId,
    key(event, id) {
      const row = findRow(id);
      if (row && row.leaving === undefined) onRowKeyDown(event, row);
    },
    element(id, element) {
      if (element) rowRefs.current.set(id, element);
      else rowRefs.current.delete(id);
    },
  };
  const stats = [
    {
      label: "Duration",
      value: formatDuration(spanDuration(root, elapsed)),
      live: runStatus === "running",
    },
    {
      label: "Cost",
      value: formatCost(sumCost(root)),
      live: runStatus === "running",
    },
    {
      label: "Tokens",
      value: formatTokens(tokensIn + tokensOut),
      live: runStatus === "running",
    },
    {
      label: "LLM calls",
      value: formatCount(spans.filter((span) => span.kind === "llm").length),
    },
    {
      label: "Tool calls",
      value: formatCount(spans.filter((span) => span.kind === "tool").length),
    },
    {
      label: "Errors",
      value: formatCount(errors),
      kind: errors ? "failed" : undefined,
    },
  ];
  const renderedTicks = [
    ...ticks.map((value) => ({ value, leaving: false })),
    ...leavingTicks
      .filter((value) => !ticks.includes(value))
      .map((value) => ({ value, leaving: true })),
  ];
  return {
    rootRef,
    bodyRef,
    scaleRef,
    rowsRef,
    popoverRef,
    rowRefs,
    collapsedIds,
    selectedId,
    selectedSpan,
    selectSpan,
    elapsed,
    range,
    trackWidth,
    rows,
    tabbableId,
    delays,
    detailSpan,
    slowest,
    runStatus,
    liveAncestors,
    handlers,
    stats,
    renderedTicks,
    formatCost,
  };
}
function TracePopover({
  controller,
  prefix,
}: {
  controller: TraceController;
  prefix: string;
}) {
  const {
    detailSpan: span,
    popoverRef,
    selectedSpan,
    selectSpan,
    rowRefs,
    elapsed,
    formatCost,
  } = controller;
  if (!span) return null;
  const hasChildren = Boolean(span.children?.length),
    [tokensIn, tokensOut] = sumTokens(span),
    cost = hasChildren ? sumCost(span) : span.cost;
  const stats = [
    ["Duration", formatDuration(spanDuration(span, elapsed))],
    ["Started", `+${formatDuration(spanStart(span))}`],
    ...(cost !== undefined && cost > 0 ? [["Cost", formatCost(cost)]] : []),
    ...(tokensIn > 0 ? [["Tokens in", formatTokens(tokensIn)]] : []),
    ...(tokensOut > 0 ? [["Tokens out", formatTokens(tokensOut)]] : []),
    ...(hasChildren ? [["Spans", formatCount(flattenSpans(span).length - 1)]] : []),
  ];
  function close() {
    selectSpan(null);
    rowRefs.current.get(span!.id)?.focus();
  }
  return (
    <div
      ref={popoverRef}
      className={`${prefix}__pop`}
      role="dialog"
      aria-label={`${span.name} details`}
      data-closing={selectedSpan ? undefined : ""}
      data-kind={span.kind}
      data-status={span.status}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          close();
        }
      }}
    >
      <div className={`${prefix}__pop-head`}>
        <span className={`${prefix}__icon`} data-logo={span.icon ? "" : undefined}>
          {span.icon ?? <span className={`${prefix}__swatch`} />}
        </span>
        <span className={`${prefix}__pop-who`}>
          <span className={`${prefix}__pop-name`} dir="auto">
            {span.name}
          </span>
          <span className={`${prefix}__pop-kind`}>
            {kindLabels[span.kind ?? ""]}
            {span.model ? ` · ${span.model}` : span.detail ? ` · ${span.detail}` : ""}
          </span>
        </span>
        <span className={`${prefix}__pill`} data-status={span.status}>
          {statusLabels[span.status ?? ""]}
        </span>
        <button
          type="button"
          className={`${prefix}__close`}
          aria-label="Close details"
          onClick={close}
        >
          <CloseIcon />
        </button>
      </div>
      <dl className={`${prefix}__pop-stats`}>
        {stats.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {span.error && (
        <p className={`${prefix}__pop-error`}>
          <ErrorIcon />
          <span className={`${prefix}__pop-error-text`} dir="auto">
            {span.error}
          </span>
        </p>
      )}
      {span.input && (
        <div className={`${prefix}__pop-io`}>
          <span>Input</span>
          <p dir="auto">{span.input}</p>
        </div>
      )}
      {span.output && (
        <div className={`${prefix}__pop-io`}>
          <span>Output</span>
          <p dir="auto">{span.output}</p>
        </div>
      )}
    </div>
  );
}
function TraceWaterfallView({
  clean = false,
  ...props
}: TraceWaterfallProps & {
  clean?: boolean;
}) {
  const { root, title = "Trace", className } = props,
    prefix = clean ? "ui-trwc" : "ui-trw";
  const controller = useTraceWaterfall(props, prefix);
  const {
    rootRef,
    bodyRef,
    scaleRef,
    rowsRef,
    collapsedIds,
    selectedId,
    elapsed,
    range,
    trackWidth,
    rows,
    tabbableId,
    delays,
    slowest,
    runStatus,
    liveAncestors,
    handlers,
    stats,
    renderedTicks,
    formatCost,
  } = controller;
  const rootStyle: TraceStyle = { [`--${prefix}-at`]: elapsed };
  const body = (
    <>
      <dl className={`${prefix}__stats`}>
        {stats.map((stat) => (
          <div className={`${prefix}__stat`} data-kind={stat.kind} key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>
              <span
                className={`${prefix}__amount`}
                data-live={stat.live ? "" : undefined}
              >
                {stat.value}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <div ref={bodyRef} className={`${prefix}__body`}>
        <div ref={scaleRef} className={`${prefix}__layer`} aria-hidden="true">
          {renderedTicks.map(({ value, leaving }) => {
            const style: TraceStyle = { "--v": value };
            return (
              <span
                className={`${prefix}__tick`}
                data-zero={value === 0 ? "" : undefined}
                data-leaving={leaving ? "" : undefined}
                style={style}
                key={value}
              >
                <span>{formatTick(value)}</span>
              </span>
            );
          })}
          {runStatus === "running" && <span className={`${prefix}__now`} />}
        </div>
        <div className={`${prefix}__axis`} aria-hidden="true">
          <span>Span</span>
        </div>
        <div ref={rowsRef} className={`${prefix}__rows`} role="tree" aria-label={title}>
          {rows.map((row) => (
            <TraceSpanRow_TraceSpanRow
              span={row.span}
              depth={row.depth}
              hidden={row.hidden}
              leaving={row.leaving}
              folded={
                Boolean(row.span.children?.length) && collapsedIds.includes(row.span.id!)
              }
              open={selectedId === row.span.id}
              focusable={
                !row.hidden && row.leaving === undefined && tabbableId === row.span.id
              }
              slowest={slowest?.id === row.span.id}
              now={liveAncestors.has(row.span.id) ? elapsed : undefined}
              range={range}
              trackWidth={trackWidth}
              delay={delays.current.get(row.span.id) ?? 0}
              formatCost={formatCost}
              handlers={handlers}
              prefix={prefix}
              key={row.leaving === undefined ? row.span.id : `${row.span.id}~out`}
            />
          ))}
        </div>
        <TracePopover controller={controller} prefix={prefix} />
      </div>
    </>
  );
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-live={runStatus === "running" ? "" : undefined}
      style={rootStyle}
    >
      <header className={`${prefix}__bar-head`}>
        <span className={`${prefix}__spark`}>
          <SparkIcon />
        </span>
        <span className={`${prefix}__heading`} title={title}>
          {title}
        </span>
        <span className={`${prefix}__task`} dir="auto">
          {root.input ?? root.name}
        </span>
        <span className={`${prefix}__pill`} data-status={runStatus} aria-live="polite">
          {runStatus === "running" && (
            <span className={`${prefix}__pulse`} aria-hidden="true" />
          )}
          {runStatus === "running" ? "Live" : statusLabels[runStatus]}
        </span>
      </header>
      <div className={`${prefix}__card`}>{body}</div>
    </div>
  );
}
const kindLabels: Record<string, string> = {
  agent: "Agent run",
  subagent: "Sub-agent",
  llm: "LLM call",
  tool: "Tool call",
};
const statusLabels: Record<string, string> = {
  running: "Running",
  done: "Done",
  failed: "Failed",
};
const ranges = [
  5, 10, 15, 20, 30, 45, 60, 90, 120, 180, 300, 450, 600, 900, 1200, 1800, 2700, 3600,
  5400, 7200,
].map((seconds) => seconds * 1000);
const intervals = [1, 2, 3, 5, 10, 15, 20, 30, 60, 120, 300, 600, 900, 1800, 3600].map(
  (seconds) => seconds * 1000,
);
const SpanMark_TraceSpanRow = memo(function SpanMark({
  kind,
  status,
  start,
  duration,
  prefix,
}: {
  kind: TraceSpan["kind"];
  status: TraceSpan["status"];
  start: number;
  duration: number;
  prefix: string;
}) {
  const style: TraceStyle = { "--s": start, "--d": duration };
  return (
    <span
      className={`${prefix}__mark`}
      data-kind={kind}
      data-status={status}
      style={style}
      aria-hidden="true"
    />
  );
});
const TraceSpanRow_TraceSpanRow = memo(function TraceSpanRow({
  span,
  depth,
  hidden,
  leaving,
  folded,
  open,
  focusable,
  slowest,
  now,
  range,
  trackWidth,
  delay,
  formatCost,
  handlers,
  prefix,
}: TraceSpanRowProps) {
  const children = span.children ?? [],
    isLeaving = leaving !== undefined,
    duration = spanDuration(span, now),
    cost = children.length ? sumCost(span) : span.cost;
  const showCost =
    cost !== undefined && cost > 0 && (span.kind !== "tool" || span.cost !== undefined);
  const durationLabel = `${formatDuration(duration)}${showCost ? ` · ${formatCost(cost)}` : ""}`;
  const pixels = (value: number) => (value / range) * trackWidth,
    labelWidth = durationLabel.length * 6.4 + (slowest ? 58 : 0) + 8;
  const labelSide =
    !trackWidth || pixels(spanStart(span) + duration) + 6 + labelWidth <= trackWidth
      ? "after"
      : pixels(duration) >= labelWidth + 10
        ? "inside"
        : pixels(spanStart(span)) >= labelWidth + 6
          ? "before"
          : "inside";
  const hiddenCount = folded ? flattenSpans(span).length - 1 : 0,
    marks =
      folded || children.length
        ? flattenSpans(span)
            .slice(1)
            .filter((child) => child.kind === "llm" || child.kind === "tool")
        : [];
  const position: TraceStyle = { "--s": spanStart(span), "--d": duration };
  return (
    <div
      ref={
        isLeaving ? undefined : (element) => handlers.current?.element(span.id, element)
      }
      className={`${prefix}__row`}
      role="treeitem"
      aria-level={depth + 1}
      aria-expanded={children.length ? !folded : undefined}
      aria-selected={open}
      aria-hidden={hidden || isLeaving || undefined}
      aria-label={`${span.name}, ${kindLabels[span.kind ?? ""]}, ${statusLabels[span.status ?? ""]}, ${durationLabel}`}
      tabIndex={focusable ? 0 : -1}
      data-kind={span.kind}
      data-status={span.status}
      data-parent={children.length ? "" : undefined}
      data-hidden={hidden ? "" : undefined}
      data-folded={folded ? "" : undefined}
      data-leaving={isLeaving ? "" : undefined}
      data-open={open ? "" : undefined}
      style={{ animationDelay: `${isLeaving ? leaving : delay}ms` }}
      onClick={() => {
        if (!isLeaving) handlers.current?.click(span.id);
      }}
      onFocus={(event) => {
        if (event.target === event.currentTarget) handlers.current?.focus(span.id);
      }}
      onKeyDown={(event) => handlers.current?.key(event, span.id)}
    >
      <div className={`${prefix}__name`}>
        {depth > 0 && (
          <span
            className={`${prefix}__guides`}
            style={{
              width: `calc(min(${depth}, var(--${prefix}-depth)) * var(--${prefix}-indent))`,
            }}
            aria-hidden="true"
          />
        )}
        <span
          className={`${prefix}__chev`}
          data-leaf={children.length ? undefined : ""}
          aria-hidden="true"
          onClick={(event) => {
            if (children.length && !isLeaving) {
              event.stopPropagation();
              handlers.current?.fold(span.id);
            }
          }}
        >
          {children.length > 0 && <ChevronIcon />}
        </span>
        <span className={`${prefix}__icon`} data-logo={span.icon ? "" : undefined}>
          {span.icon ?? <span className={`${prefix}__swatch`} />}
        </span>
        <span className={`${prefix}__label`}>
          <span className={`${prefix}__title`} dir="auto">
            {span.name}
          </span>
          {span.detail && (
            <span className={`${prefix}__detail`} dir="auto">
              {span.detail}
            </span>
          )}
        </span>
        {hiddenCount > 0 && (
          <span className={`${prefix}__more`}>
            {"+"}
            {formatCount(hiddenCount)}
          </span>
        )}
        {span.status === "running" && !children.length && (
          <span className={`${prefix}__state`} data-status="running">
            <SpinnerIcon prefix={prefix} />
          </span>
        )}
        {span.status === "failed" && (
          <span className={`${prefix}__state`} data-status="failed">
            <ErrorIcon />
          </span>
        )}
        <span className={`${prefix}__meta`}>
          {slowest && (
            <span className={`${prefix}__slow`} title="Slowest">
              Slowest
            </span>
          )}
          <span
            className={`${prefix}__amount`}
            data-live={span.status === "running" ? "" : undefined}
          >
            {formatDuration(duration)}
            {showCost && (
              <span className={`${prefix}__meta-cost`}>
                {" · "}
                {formatCost(cost)}
              </span>
            )}
          </span>
        </span>
      </div>
      <div className={`${prefix}__track`}>
        <span
          className={`${prefix}__bar`}
          data-bar=""
          data-kind={span.kind}
          data-status={span.status}
          style={{ ...position, animationDelay: `${delay + 60}ms` }}
        />
        {marks.map((child) => (
          <SpanMark_TraceSpanRow
            kind={child.kind}
            status={child.status}
            start={spanStart(child)}
            duration={spanDuration(child, now)}
            prefix={prefix}
            key={child.id}
          />
        ))}
        <span className={`${prefix}__tag`} data-side={labelSide} style={position}>
          <span
            className={`${prefix}__amount`}
            data-live={span.status === "running" ? "" : undefined}
          >
            {durationLabel}
          </span>
          {slowest && <span className={`${prefix}__slow`}>Slowest</span>}
        </span>
      </div>
    </div>
  );
});
export { TraceWaterfall };
export type { TraceSpan };
export type { TraceWaterfallProps };
