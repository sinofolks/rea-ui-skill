"use client";

import "./CostWaterfall.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
type CostMode = "cost" | "tokens";
type CostStatus = "running" | "done" | "failed";
interface CostStep {
  id?: string;
  name?: string;
  kind?: "agent" | "llm" | "tool";
  status?: CostStatus;
  model?: string;
  detail?: string;
  icon?: ReactNode;
  tokensIn?: number;
  tokensOut?: number;
  cost?: number;
  duration?: number;
  input?: string;
  output?: string;
  error?: string;
  children?: CostStep[];
  [field: string]: unknown;
}
interface CostWaterfallProps {
  steps: CostStep[];
  task?: string;
  status?: CostStatus;
  mode?: CostMode;
  defaultMode?: CostMode;
  onModeChange?: (mode: CostMode) => void;
  collapsed?: string[];
  defaultCollapsed?: string[];
  onCollapsedChange?: (collapsed: string[]) => void;
  openId?: string | null;
  defaultOpenId?: string | null;
  onOpenChange?: (id: string | null, step?: CostStep) => void;
  formatCost?: (amount: number) => string;
  maxHeight?: number;
  title?: string;
  className?: string;
}
type CostStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};
interface CostRow {
  step: CostStep;
  depth: number;
  parentId?: string;
  hidden: boolean;
  start: number;
  size: number;
  split: number;
  credit: boolean;
}
type CostController = ReturnType<typeof useCostWaterfall>;
function CostWaterfall(props: CostWaterfallProps) {
  return <CostWaterfallView {...props} />;
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
function makeOverflowFocusable(element: HTMLElement | null) {
  if (!element) return;
  if (element.scrollHeight > element.clientHeight + 1) element.tabIndex = 0;
  else element.removeAttribute("tabindex");
}
function formatCost_cost_model(amount: number): string {
  if (amount < 0) return `−${formatCost_cost_model(-amount)}`;
  if (amount === 0) return "$0";
  if (amount < 0.001) return "<$0.001";
  if (amount < 0.01) return `$${amount.toFixed(3)}`;
  if (amount < 10) return `$${amount.toFixed(2)}`;
  return `$${Math.round(amount).toLocaleString("en-US")}`;
}
function formatTokens(value: number): string {
  if (value < 1000) return String(Math.round(value));
  if (value < 100000) return `${(value / 1000).toFixed(1)}k`;
  if (value < 999500) return `${Math.round(value / 1000)}k`;
  return `${(value / 1000000).toFixed(1)}M`;
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
function finiteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function flattenSteps(step: CostStep): CostStep[] {
  return [step, ...(step.children ?? []).flatMap(flattenSteps)];
}
function sumCost(step: CostStep): number {
  return (
    (finiteNumber(step.cost) ?? 0) +
    (step.children ?? []).reduce((total, child) => total + sumCost(child), 0)
  );
}
function sumTokens(step: CostStep): [number, number] {
  return (step.children ?? []).reduce<[number, number]>(
    (total, child) => {
      const [input, output] = sumTokens(child);
      return [total[0] + input, total[1] + output];
    },
    [
      Math.max(0, finiteNumber(step.tokensIn) ?? 0),
      Math.max(0, finiteNumber(step.tokensOut) ?? 0),
    ],
  );
}
function hasCost(step: CostStep): boolean {
  return finiteNumber(step.cost) !== undefined || (step.children ?? []).some(hasCost);
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
function roundScale(value: number, multiples: number[]): number {
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return (
    (multiples.find((multiple) => multiple * magnitude >= value - 1e-12) ?? 10) *
    magnitude
  );
}
function layoutCosts(steps: CostStep[], mode: CostMode, collapsed: string[]) {
  const rows: CostRow[] = [];
  let cursor = 0;
  let maximum = 0;
  function visit(
    step: CostStep,
    depth: number,
    parentId: string | undefined,
    hidden: boolean,
  ) {
    const row: CostRow = {
      step,
      depth,
      parentId,
      hidden,
      start: cursor,
      size: 0,
      split: 0,
      credit: false,
    };
    rows.push(row);
    cursor +=
      mode === "cost"
        ? (finiteNumber(step.cost) ?? 0)
        : Math.max(0, finiteNumber(step.tokensIn) ?? 0) +
          Math.max(0, finiteNumber(step.tokensOut) ?? 0);
    maximum = Math.max(maximum, cursor);
    const childrenHidden = hidden || collapsed.includes(step.id!);
    for (const child of step.children ?? [])
      visit(child, depth + 1, step.id, childrenHidden);
    row.credit = cursor < row.start;
    row.size = Math.abs(cursor - row.start);
    row.start = Math.max(0, Math.min(row.start, cursor));
    const [input, output] = sumTokens(step);
    row.split = mode === "tokens" && input + output > 0 ? output / (input + output) : 0;
  }
  for (const step of steps) visit(step, 0, undefined, false);
  return {
    rows,
    range: roundScale(
      Math.max(mode === "cost" ? 0.1 : 10000, maximum * 1.08),
      [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
    ),
  };
}
function costTicks(range: number, width: number): number[] {
  const count = Math.min(6, Math.max(2, Math.round((width || 400) / 90)));
  const interval = roundScale(range / count, [1, 2, 5, 10]);
  const ticks: number[] = [];
  for (let tick = 0; tick < range - interval * 0.01; tick += interval)
    ticks.push(Number(tick.toPrecision(6)));
  return ticks;
}
function useCostWaterfall(
  {
    steps,
    status,
    mode,
    defaultMode = "cost",
    onModeChange,
    collapsed,
    defaultCollapsed = [],
    onCollapsedChange,
    openId,
    defaultOpenId = null,
    onOpenChange,
    formatCost = formatCost_cost_model,
  }: CostWaterfallProps,
  prefix: string,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string | undefined, HTMLDivElement>());
  const [localMode, setLocalMode] = useState(defaultMode);
  const activeMode = mode ?? localMode;
  function changeMode(next: CostMode) {
    if (next !== activeMode) {
      setLocalMode(next);
      onModeChange?.(next);
    }
  }
  const [localCollapsed, setLocalCollapsed] = useState(defaultCollapsed);
  const collapsedIds = collapsed ?? localCollapsed;
  function changeCollapsed(next: string[]) {
    setLocalCollapsed(next);
    onCollapsedChange?.(next);
  }
  function toggleCollapsed(id: string | undefined) {
    changeCollapsed(
      collapsedIds.includes(id!)
        ? collapsedIds.filter((candidate) => candidate !== id)
        : [...collapsedIds, id!],
    );
  }
  const allSteps = steps.flatMap(flattenSteps);
  const [localOpenId, setLocalOpenId] = useState<string | null | undefined>(
    defaultOpenId,
  );
  const selectedId = openId === undefined ? localOpenId : openId;
  const selectedStep = selectedId
    ? allSteps.find((step) => step.id === selectedId)
    : undefined;
  function selectStep(id: string | null | undefined) {
    setLocalOpenId(id);
    onOpenChange?.(id!, id ? allSteps.find((step) => step.id === id) : undefined);
  }
  const { rows, range } = layoutCosts(steps, activeMode, collapsedIds);
  const visibleRows = rows.filter((row) => !row.hidden);
  const [scaleWidth, setScaleWidth] = useState(0);
  const ticks = costTicks(range, scaleWidth);
  useLayoutEffect(() => {
    const layer = scaleRef.current;
    if (!layer) return;
    const observer = new ResizeObserver(() => setScaleWidth(layer.offsetWidth));
    observer.observe(layer);
    return () => observer.disconnect();
  }, []);
  const [switching, setSwitching] = useState(false);
  const animatedRange = useRef(range);
  const frame = useRef(0);
  const previousMode = useRef(activeMode);
  const initialRange = useRef(true);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    function updateRange(value: number) {
      animatedRange.current = value;
      root!.style.setProperty(`--${prefix}-range`, String(value));
    }
    cancelAnimationFrame(frame.current);
    const modeChanged = previousMode.current !== activeMode;
    previousMode.current = activeMode;
    if (initialRange.current || modeChanged || reducedMotion()) {
      initialRange.current = false;
      updateRange(range);
      return;
    }
    const from = animatedRange.current;
    if (from === range) return;
    const start = performance.now();
    function animate() {
      const progress = Math.min(1, (performance.now() - start) / 720);
      updateRange(from + (range - from) * easeInOutCubic(progress));
      if (progress < 1) frame.current = requestAnimationFrame(animate);
    }
    frame.current = requestAnimationFrame(animate);
  }, [range, activeMode, prefix]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const initialMode = useRef(true);
  useLayoutEffect(() => {
    if (initialMode.current || reducedMotion()) {
      initialMode.current = false;
      return;
    }
    setSwitching(true);
    const timer = window.setTimeout(() => setSwitching(false), 600);
    return () => window.clearTimeout(timer);
  }, [activeMode]);
  const rowDelays = useRef(new Map<string | undefined, number>());
  const rowsMounted = useRef(false);
  let addedIndex = 0;
  for (const row of rows)
    if (!rowDelays.current.has(row.step.id))
      rowDelays.current.set(
        row.step.id,
        Math.min(400, (rowsMounted.current ? 0 : 60) + addedIndex++ * 36),
      );
  useLayoutEffect(() => {
    rowsMounted.current = true;
    const ids = new Set(rows.map((row) => row.step.id));
    for (const id of rowDelays.current.keys())
      if (!ids.has(id)) rowDelays.current.delete(id);
  });
  const [closingId, setClosingId] = useState<string | null>(null);
  const previousOpen = useRef<string | undefined>(undefined);
  useLayoutEffect(() => {
    const previous = previousOpen.current;
    previousOpen.current = selectedStep?.id;
    if (previous && previous !== selectedStep?.id && !reducedMotion()) {
      setClosingId(previous);
      const timer = window.setTimeout(() => setClosingId(null), 240);
      return () => window.clearTimeout(timer);
    }
  }, [selectedStep?.id]);
  const [focusedId, setFocusedId] = useState<string | undefined>(undefined);
  const pendingFocus = useRef<string | undefined | null>(null);
  useEffect(() => {
    const id = pendingFocus.current;
    if (!id) return;
    pendingFocus.current = null;
    rowRefs.current.get(id)?.focus({ preventScroll: true });
    rowRefs.current.get(id)?.scrollIntoView({
      block: "nearest",
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  });
  const findRow = (id: string | undefined) => rows.find((row) => row.step.id === id);
  let tabbableId = focusedId;
  for (let row = findRow(tabbableId); row?.hidden; row = findRow(row.parentId))
    tabbableId = row.parentId;
  if (!visibleRows.some((row) => row.step.id === tabbableId))
    tabbableId = visibleRows[0]?.step.id;
  function focusRow(row: CostRow | undefined) {
    if (row) {
      setFocusedId(row.step.id);
      rowRefs.current.get(row.step.id)?.focus();
    }
  }
  function onRowKeyDown(event: KeyboardEvent<HTMLDivElement>, row: CostRow) {
    if (event.target !== event.currentTarget) return;
    const index = visibleRows.indexOf(row),
      hasChildren = Boolean(row.step.children?.length),
      folded = collapsedIds.includes(row.step.id!);
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
        if (hasChildren && folded) toggleCollapsed(row.step.id);
        else if (hasChildren) focusRow(visibleRows[index + 1]);
        break;
      case "ArrowLeft":
        if (hasChildren && !folded) toggleCollapsed(row.step.id);
        else focusRow(findRow(row.parentId));
        break;
      case "Enter":
      case " ":
        selectStep(selectedId === row.step.id ? null : row.step.id);
        break;
      case "Escape":
        if (selectedId) selectStep(null);
        break;
      default:
        return;
    }
    event.preventDefault();
  }
  const running = allSteps.some((step) => step.status === "running");
  const runStatus =
    status ??
    (running
      ? "running"
      : allSteps.some((step) => step.status === "failed") &&
          steps.at(-1)?.status === "failed"
        ? "failed"
        : "done");
  const [tokensIn, tokensOut] = steps.reduce<[number, number]>(
    (total, step) => {
      const [input, output] = sumTokens(step);
      return [total[0] + input, total[1] + output];
    },
    [0, 0],
  );
  const chargedSteps = allSteps.filter(
    (step) => step.kind !== "agent" && (finiteNumber(step.cost) ?? 0) > 0,
  );
  const mostExpensive = chargedSteps.length
    ? chargedSteps.reduce((largest, step) =>
        (finiteNumber(step.cost) ?? 0) > (finiteNumber(largest.cost) ?? 0)
          ? step
          : largest,
      )
    : undefined;
  const showTop = chargedSteps.length > 1;
  const totalCost = steps.reduce((total, step) => total + sumCost(step), 0);
  function revealMostExpensive() {
    if (!mostExpensive) return;
    const ancestors: string[] = [];
    for (let row = findRow(mostExpensive.id); row?.parentId; row = findRow(row.parentId))
      ancestors.push(row.parentId);
    const hiddenAncestors = ancestors.filter((id) => collapsedIds.includes(id));
    if (hiddenAncestors.length)
      changeCollapsed(collapsedIds.filter((id) => !hiddenAncestors.includes(id)));
    setFocusedId(mostExpensive.id);
    selectStep(mostExpensive.id);
    pendingFocus.current = mostExpensive.id;
  }
  return {
    rootRef,
    scaleRef,
    rowRefs,
    activeMode,
    changeMode,
    collapsedIds,
    toggleCollapsed,
    selectedId,
    selectStep,
    rows,
    ticks,
    switching,
    rowDelays,
    closingId,
    setFocusedId,
    tabbableId,
    onRowKeyDown,
    running,
    runStatus,
    tokensIn,
    tokensOut,
    mostExpensive,
    showTop,
    totalCost,
    revealMostExpensive,
    formatCost,
  };
}
function CostDetails({
  step,
  closing,
  depth,
  prefix,
  controller,
}: {
  step: CostStep;
  closing: boolean;
  depth: number;
  prefix: string;
  controller: CostController;
}) {
  const [inputLabel, outputLabel] = ioLabels[step.kind ?? ""] ?? [undefined, undefined];
  const mono = step.kind === "tool";
  const style: CostStyle = { [`--${prefix}-level`]: depth };
  return (
    <div
      className={`${prefix}__detail`}
      data-closing={closing ? "" : undefined}
      role="region"
      aria-label={`${step.name} details`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          controller.selectStep(null);
          controller.rowRefs.current.get(step.id)?.focus();
        }
      }}
    >
      <div className={`${prefix}__detail-in`} style={style}>
        {depth > 0 && <span className={`${prefix}__guides`} aria-hidden="true" />}
        {step.error && (
          <p className={`${prefix}__error`}>
            <ErrorIcon />
            <span dir="auto">{step.error}</span>
          </p>
        )}
        <div className={`${prefix}__io`}>
          <div>
            <span>{inputLabel}</span>
            <p dir="auto" data-mono={mono ? "" : undefined} ref={makeOverflowFocusable}>
              {step.input ?? "–"}
            </p>
          </div>
          <div>
            <span>{outputLabel}</span>
            <p
              dir="auto"
              data-mono={mono ? "" : undefined}
              data-live={step.status === "running" ? "" : undefined}
              ref={makeOverflowFocusable}
            >
              {step.output ??
                (step.status === "running" ? pendingLabels[step.kind ?? ""] : "–")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function CostStepRow({
  row,
  prefix,
  controller,
}: {
  row: CostRow;
  prefix: string;
  controller: CostController;
}) {
  const {
    collapsedIds,
    selectedId,
    formatCost,
    showTop,
    mostExpensive,
    rowDelays,
    rowRefs,
    tabbableId,
    setFocusedId,
    selectStep,
    onRowKeyDown,
    toggleCollapsed,
    closingId,
  } = controller;
  const step = row.step;
  const hasChildren = Boolean(step.children?.length);
  const folded = hasChildren && collapsedIds.includes(step.id!);
  const selected = selectedId === step.id;
  const [tokensIn, tokensOut] = sumTokens(step);
  const cost = hasCost(step) ? sumCost(step) : undefined;
  const running = step.status === "running";
  const subtreeRunning = flattenSteps(step).some((child) => child.status === "running");
  const hiddenCount = folded ? flattenSteps(step).length - 1 : 0;
  const duration = finiteNumber(step.duration);
  const expensive = showTop && mostExpensive?.id === step.id;
  const label = [
    step.name,
    kindLabels[step.kind ?? ""],
    step.status ? statusLabels[step.status] : undefined,
    cost === undefined ? "" : formatCost(cost),
    tokensIn + tokensOut > 0 ? `${formatTokens(tokensIn + tokensOut)} tokens` : "",
    duration === undefined ? "" : formatDuration(duration),
    expensive ? "most expensive" : "",
  ]
    .filter(Boolean)
    .join(", ");
  const barStyle: CostStyle = {
    "--s": row.start,
    "--d": row.size,
    "--split": row.split,
  };
  const delayStyle: CostStyle = {
    [`--${prefix}-delay`]: `${rowDelays.current.get(step.id) ?? 0}ms`,
  };
  return (
    <div
      className={`${prefix}__item`}
      data-hidden={row.hidden ? "" : undefined}
      style={delayStyle}
    >
      <div className={`${prefix}__clip`}>
        <div
          ref={(element) => {
            if (element) rowRefs.current.set(step.id, element);
            else rowRefs.current.delete(step.id);
          }}
          className={`${prefix}__row`}
          role="treeitem"
          aria-level={row.depth + 1}
          aria-expanded={hasChildren ? !folded : undefined}
          aria-selected={selected}
          aria-hidden={row.hidden || undefined}
          aria-label={label}
          tabIndex={!row.hidden && tabbableId === step.id ? 0 : -1}
          data-kind={step.kind}
          data-status={step.status}
          data-parent={hasChildren ? "" : undefined}
          data-folded={folded ? "" : undefined}
          data-open={selected ? "" : undefined}
          style={barStyle}
          onClick={() => {
            setFocusedId(step.id);
            selectStep(selected ? null : step.id);
          }}
          onFocus={(event) => {
            if (event.target === event.currentTarget) setFocusedId(step.id);
          }}
          onKeyDown={(event) => onRowKeyDown(event, row)}
        >
          <div className={`${prefix}__name`}>
            {row.depth > 0 && (
              <span
                className={`${prefix}__guides`}
                style={{
                  width: `calc(min(${row.depth}, var(--${prefix}-depth)) * var(--${prefix}-indent))`,
                }}
                aria-hidden="true"
              />
            )}
            <span
              className={`${prefix}__chev`}
              data-leaf={hasChildren ? undefined : ""}
              aria-hidden="true"
              onClick={(event) => {
                if (hasChildren) {
                  event.stopPropagation();
                  setFocusedId(step.id);
                  toggleCollapsed(step.id);
                }
              }}
            >
              {hasChildren && <ChevronIcon />}
            </span>
            <span className={`${prefix}__icon`}>
              {step.icon ?? <span className={`${prefix}__swatch`} />}
            </span>
            <span
              className={`${prefix}__label`}
              title={`${step.name}${(step.model ?? step.detail) ? ` · ${step.model ?? step.detail}` : ""}`}
            >
              <span className={`${prefix}__title`} dir="auto">
                {step.name}
              </span>
              {(step.model ?? step.detail) && (
                <span className={`${prefix}__model`} dir="auto">
                  {step.model ?? step.detail}
                </span>
              )}
            </span>
            {hiddenCount > 0 && (
              <span className={`${prefix}__more`}>
                {"+"}
                {hiddenCount}
              </span>
            )}
            {expensive && <span className={`${prefix}__flag`}>Top</span>}
            {running && !hasChildren && (
              <span className={`${prefix}__state`} data-status="running">
                <SpinnerIcon prefix={prefix} />
              </span>
            )}
            {step.status === "failed" && (
              <span className={`${prefix}__state`} data-status="failed">
                <ErrorIcon />
              </span>
            )}
          </div>
          <div className={`${prefix}__track`}>
            <span
              className={`${prefix}__bar`}
              data-kind={step.kind}
              data-status={subtreeRunning ? "running" : step.status}
              data-credit={row.credit ? "" : undefined}
            >
              <span className={`${prefix}__out`} />
            </span>
          </div>
          <span className={`${prefix}__num`} data-col="in">
            <span
              className={`${prefix}__amount`}
              data-live={subtreeRunning && tokensIn > 0 ? "" : undefined}
            >
              {tokensIn > 0 ? formatTokens(tokensIn) : "–"}
            </span>
          </span>
          <span className={`${prefix}__num`} data-col="out">
            <span
              className={`${prefix}__amount`}
              data-live={subtreeRunning && tokensOut > 0 ? "" : undefined}
            >
              {tokensOut > 0 ? formatTokens(tokensOut) : "–"}
            </span>
          </span>
          <span className={`${prefix}__num`} data-col="cost">
            <span
              className={`${prefix}__amount`}
              data-live={subtreeRunning && cost !== undefined ? "" : undefined}
            >
              {cost === undefined ? "–" : formatCost(cost)}
            </span>
          </span>
          <span className={`${prefix}__num`} data-col="tok">
            <span
              className={`${prefix}__amount`}
              data-live={subtreeRunning && tokensIn + tokensOut > 0 ? "" : undefined}
            >
              {tokensIn + tokensOut > 0 ? formatTokens(tokensIn + tokensOut) : "–"}
            </span>
          </span>
          <span className={`${prefix}__num`} data-col="time">
            <span
              className={`${prefix}__amount`}
              data-live={subtreeRunning && duration !== undefined ? "" : undefined}
            >
              {duration === undefined ? "–" : formatDuration(duration)}
            </span>
          </span>
        </div>
        {!row.hidden && (selected || closingId === step.id) && (
          <CostDetails
            step={step}
            closing={!selected}
            depth={row.depth}
            prefix={prefix}
            controller={controller}
          />
        )}
      </div>
    </div>
  );
}
function CostWaterfallView({
  clean = false,
  ...props
}: CostWaterfallProps & {
  clean?: boolean;
}) {
  const { task, title = "Run cost", className, maxHeight } = props;
  const prefix = clean ? "ui-cwfc" : "ui-cwf";
  const controller = useCostWaterfall(props, prefix);
  const {
    rootRef,
    scaleRef,
    activeMode,
    changeMode,
    switching,
    runStatus,
    running,
    formatCost,
    totalCost,
    tokensIn,
    tokensOut,
    mostExpensive,
    revealMostExpensive,
    rows,
    ticks,
  } = controller;
  const body = (
    <>
      <dl className={`${prefix}__stats`}>
        <div className={`${prefix}__stat`}>
          <dt>Total cost</dt>
          <dd>
            <span className={`${prefix}__amount`} data-live={running ? "" : undefined}>
              {formatCost(totalCost)}
            </span>
          </dd>
        </div>
        <div className={`${prefix}__stat`}>
          <dt>Total tokens</dt>
          <dd>
            <span className={`${prefix}__amount`} data-live={running ? "" : undefined}>
              {formatTokens(tokensIn + tokensOut)}
            </span>
            <span className={`${prefix}__sub`}>
              {formatTokens(tokensIn)}
              {" in · "}
              {formatTokens(tokensOut)}
              {" out"}
            </span>
          </dd>
        </div>
        <div className={`${prefix}__stat`}>
          <dt>Most expensive</dt>
          <dd>
            {mostExpensive ? (
              <button
                type="button"
                className={`${prefix}__top`}
                onClick={revealMostExpensive}
              >
                <span
                  className={`${prefix}__top-name`}
                  dir="auto"
                  title={mostExpensive.name}
                >
                  {mostExpensive.name}
                </span>
                <span className={`${prefix}__sub`}>
                  {formatCost(finiteNumber(mostExpensive.cost) ?? 0)}
                </span>
              </button>
            ) : (
              <span className={`${prefix}__sub`}>–</span>
            )}
          </dd>
        </div>
      </dl>
      <div className={`${prefix}__body`}>
        <div ref={scaleRef} className={`${prefix}__layer`} aria-hidden="true">
          {ticks.map((tick) => {
            const style: CostStyle = { "--v": tick };
            return (
              <span
                className={`${prefix}__tick`}
                data-zero={tick === 0 ? "" : undefined}
                style={style}
                key={`${activeMode}:${tick}`}
              >
                <span>
                  {activeMode === "cost" ? formatCost(tick) : formatTokens(tick)}
                </span>
              </span>
            );
          })}
        </div>
        <div className={`${prefix}__cols`} aria-hidden="true">
          <span>Step</span>
          <span />
          <span data-col="in">In</span>
          <span data-col="out">Out</span>
          <span data-col="cost">Cost</span>
          <span data-col="tok">Tokens</span>
          <span data-col="time">Time</span>
        </div>
        {!rows.length && (
          <p className={`${prefix}__empty`}>
            {runStatus === "running"
              ? "Waiting for the first step…"
              : "No steps in this run"}
          </p>
        )}
        <div
          className={`${prefix}__rows`}
          role="tree"
          aria-label={title}
          hidden={!rows.length}
          data-scroll={maxHeight ? "" : undefined}
          style={maxHeight ? { maxHeight } : undefined}
        >
          {rows.map((row) => (
            <CostStepRow
              row={row}
              prefix={prefix}
              controller={controller}
              key={row.step.id}
            />
          ))}
        </div>
      </div>
    </>
  );
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-mode={activeMode}
      data-switching={switching ? "" : undefined}
    >
      <header className={`${prefix}__head`}>
        <span className={`${prefix}__spark`}>
          <SparkIcon />
        </span>
        <span className={`${prefix}__heading`}>{title}</span>
        {task && (
          <span className={`${prefix}__task`} dir="auto" title={task}>
            {task}
          </span>
        )}
        <span className={`${prefix}__switch`} role="group" aria-label="Measure by">
          {(["cost", "tokens"] as CostMode[]).map((mode) => (
            <button
              type="button"
              aria-pressed={activeMode === mode}
              onClick={() => changeMode(mode)}
              key={mode}
            >
              {mode === "cost" ? "Cost" : "Tokens"}
            </button>
          ))}
        </span>
        <span className={`${prefix}__pill`} data-status={runStatus} aria-live="polite">
          {runStatus === "running" && (
            <span className={`${prefix}__pulse`} aria-hidden="true" />
          )}
          {runStatus === "running" ? "Live" : statusLabels[runStatus]}
        </span>
      </header>
      {clean ? body : <div className={`${prefix}__card`}>{body}</div>}
    </div>
  );
}
const kindLabels: Record<string, string> = {
  agent: "Sub-agent",
  llm: "LLM call",
  tool: "Tool call",
};
const statusLabels = {
  running: "Running",
  done: "Done",
  failed: "Failed",
};
const ioLabels: Record<string, [string, string]> = {
  agent: ["Task", "Result"],
  llm: ["Prompt", "Response"],
  tool: ["Input", "Output"],
};
const pendingLabels: Record<string, string> = {
  agent: "Still working…",
  llm: "Waiting for the response…",
  tool: "Running…",
};
export { CostWaterfall };
export type { CostMode };
export type { CostStatus };
export type { CostStep };
export type { CostWaterfallProps };
