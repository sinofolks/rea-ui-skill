"use client";

import "./ReviewCenter.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type Ref,
  type CSSProperties,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  memo,
  Fragment,
} from "react";
interface ReviewFlag {
  text?: string;
  note?: string;
  source?: string;
  [field: string]: unknown;
}
/** A flagged fragment supplies the note shown when the reviewer inspects it. */
type ReviewText =
  | string
  | Array<string | ReviewFlag>
  | {
      before?: string;
      after?: string;
      original?: string;
      suggested?: string;
      [field: string]: unknown;
    };
interface ReviewField {
  label?: string;
  value?: ReviewText;
  [field: string]: unknown;
}
interface ReviewFile {
  id?: string;
  name?: string;
  label?: string;
  path?: string;
  diff?: ReviewText;
  start?: number;
  added?: number;
  removed?: number;
  [field: string]: unknown;
}
interface ReviewStep {
  id?: string;
  name?: string;
  label?: string;
  title?: ReviewText;
  detail?: ReviewText;
  tool?: string;
  icon?: ReactNode;
  [field: string]: unknown;
}
interface ReviewSource {
  label?: string;
  icon?: ReactNode;
  href?: string;
  [field: string]: unknown;
}
interface ReviewItem {
  id?: string;
  title?: string;
  agent?: string;
  model?: string;
  icon?: ReactNode;
  type?: string;
  risk?: "high" | "medium" | "low";
  confidence?: number;
  createdAt?: unknown;
  reasoning?: string;
  files?: ReviewFile[];
  sources?: ReviewSource[];
  body?: ReviewText;
  bodyLabel?: string;
  format?: string;
  steps?: ReviewStep[];
  fields?: ReviewField[] | ReviewText;
  [field: string]: unknown;
}
interface ReviewResult {
  decision: "approved" | "rejected";
  reason?: string;
  text?: string;
  fields?: Record<string, string>;
}
type ReviewFilter = "all" | "high" | "unsure";
interface ReviewCenterHandle {
  approve(): void;
  reject(reason?: string): void;
  edit(): void;
  setDraft(value: string, fieldId?: string): void;
  save(): void;
  cancel(): void;
  skip(): void;
  next(): void;
  previous(): void;
  undo(): void;
  peek(index: number | null): void;
  select(id: string): void;
}
interface ReviewCenterProps {
  items: ReviewItem[];
  onDecide?: (item: ReviewItem, result: ReviewResult) => void;
  onUndo?: (item: ReviewItem, result: ReviewResult) => void;
  onSkip?: (item: ReviewItem) => void;
  reviewed?: number;
  total?: number;
  sla?: number;
  now?: number;
  lowConfidence?: number;
  reasons?: string[];
  order?: "risk" | "oldest" | "given";
  filter?: ReviewFilter;
  defaultFilter?: ReviewFilter;
  onFilterChange?: (filter: ReviewFilter) => void;
  title?: string;
  ref?: Ref<ReviewCenterHandle>;
  className?: string;
  /** Clean style only. */ onCurrentChange?: (item: ReviewItem | undefined) => void;
}
type ReviewId = string | undefined;
type ReviewParts = Array<string | ReviewFlag>;
type ReviewDraft = Record<string, string>;
type ReviewStyle = CSSProperties & {
  [property: `--${string}`]: string | number;
};
interface ReviewedEntry {
  item: ReviewItem;
  result: ReviewResult;
  delay: number;
}
interface QueueGhost {
  item: ReviewItem;
  result?: ReviewResult;
  delay: number;
  index: number;
  key: number;
}
interface DetailGhost extends ReviewedEntry {
  draft: ReviewDraft;
  key: number;
  dir: ReviewResult["decision"];
}
interface QueueEntrance {
  kind: "first" | "new" | "in";
  delay: number;
}
type DetailEntrance = "first" | "down" | "up" | "decide" | "fade";
interface Toast {
  text: string;
  decision: ReviewResult["decision"];
  key: number;
}
type ReviewController = ReturnType<typeof useReviewCenter>;
interface ReviewQueueRowProps {
  item: ReviewItem;
  ghost?: QueueGhost;
  current: boolean;
  focusable: boolean;
  enter?: QueueEntrance;
  wait: string;
  sla?: string;
  skipped: boolean;
  onPick: (id: ReviewId) => void;
  setElement: (id: ReviewId, element: HTMLButtonElement | null) => void;
  prefix: string;
}
interface FlagCounter {
  index: number;
}
interface ActionProps {
  action: string;
  label: string;
  icon: ReactNode;
  shortcut: string;
  onClick: () => void;
  primary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  pressed: string | null;
  prefix: string;
}
function ReviewCenter(props: ReviewCenterProps) {
  return <ReviewCenterView {...props} clean />;
}
function timestamp(value: unknown): number {
  const result =
    typeof value === "number"
      ? value
      : value instanceof Date
        ? value.getTime()
        : Infinity;
  return Number.isFinite(result) ? result : Infinity;
}
function ageLabel(milliseconds: number): string {
  if (!Number.isFinite(milliseconds)) return "";
  const minutes = Math.floor(Math.max(0, milliseconds) / 60000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? minutes % 60
      ? `${hours}h ${minutes % 60}m`
      : `${hours}h`
    : `${Math.floor(hours / 24)}d`;
}
function textParts(value: unknown): ReviewParts {
  if (value === undefined) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value))
    return value.filter(
      (part): part is string | ReviewFlag =>
        typeof part === "string" || (!!part && typeof part === "object"),
    );
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>,
      text = record.suggested ?? record.after ?? record.original ?? record.before;
    return typeof text === "string" ? [text] : [];
  }
  return [];
}
function plainText(value: unknown): string {
  return textParts(value)
    .map((part) => (typeof part === "string" ? part : part.text))
    .join("");
}
function flagCount(value: unknown): number {
  return textParts(value).filter((part) => typeof part !== "string").length;
}
function confidenceLabel(value: number | undefined): string {
  return typeof value === "number" && Number.isFinite(value)
    ? `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`
    : "unknown";
}
function initial(name: string | undefined): string {
  return (name?.match(/[\p{L}\p{N}]/u)?.[0] ?? "?").toUpperCase();
}
function insertedText(before: string, after: string): [string, string, string] {
  let prefix = 0;
  while (
    prefix < before.length &&
    prefix < after.length &&
    before[prefix] === after[prefix]
  )
    prefix++;
  let suffix = 0;
  while (
    suffix < before.length - prefix &&
    suffix < after.length - prefix &&
    before[before.length - 1 - suffix] === after[after.length - 1 - suffix]
  )
    suffix++;
  return [
    after.slice(0, prefix),
    after.slice(prefix, after.length - suffix),
    after.slice(after.length - suffix),
  ];
}
function splitLines(parts: ReviewParts): ReviewParts[] {
  const lines: ReviewParts[] = [[]];
  for (const part of parts) {
    if (typeof part !== "string") {
      lines[lines.length - 1].push(part);
      continue;
    }
    part.split("\n").forEach((line, index) => {
      if (index) lines.push([]);
      if (line) lines[lines.length - 1].push(line);
    });
  }
  return lines;
}
function reviewFields(item: ReviewItem) {
  if (!Array.isArray(item.fields)) return [];
  return item.fields.filter(
    (field): field is ReviewField => !!field && typeof field === "object",
  );
}
function itemTexts(item: ReviewItem): unknown[] {
  return [
    ...reviewFields(item).map((field) => field.value),
    item.body,
    ...(item.files ?? []).map((file) => file.diff),
    ...(item.steps ?? []).flatMap((step) => [step.title, step.detail]),
  ];
}
function itemFlags(item: ReviewItem): ReviewFlag[] {
  return itemTexts(item)
    .flatMap(textParts)
    .filter((part): part is ReviewFlag => typeof part !== "string");
}
function draftFor(item: ReviewItem): ReviewDraft {
  const draft: ReviewDraft = {};
  for (const field of reviewFields(item))
    draft[`field:${field.label}`] = plainText(field.value);
  if (item.body !== undefined) draft.body = plainText(item.body);
  return draft;
}
function editedResult(item: ReviewItem, draft: ReviewDraft): ReviewResult {
  const original = draftFor(item),
    result: ReviewResult = { decision: "approved" };
  if (draft.body !== undefined && draft.body !== original.body) result.text = draft.body;
  const fields: Record<string, string> = {};
  for (const field of reviewFields(item)) {
    const key = `field:${field.label}`;
    if (draft[key] !== undefined && draft[key] !== original[key])
      fields[String(field.label)] = draft[key];
  }
  if (Object.keys(fields).length) result.fields = fields;
  return result;
}
function matchesFilter(
  item: ReviewItem,
  filter: ReviewFilter,
  threshold: number,
): boolean {
  return (
    filter === "all" ||
    (filter === "high" ? item.risk === "high" : (item.confidence ?? NaN) < threshold)
  );
}
function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function useReviewCenter(
  {
    items,
    onDecide,
    onUndo,
    onSkip,
    reviewed = 0,
    total,
    sla = 1800000,
    now,
    lowConfidence = 0.7,
    reasons = defaultReasons,
    order = "risk",
    filter,
    defaultFilter = "all",
    onFilterChange,
    onCurrentChange,
    ref,
  }: ReviewCenterProps,
  clean: boolean,
) {
  const id = useId(),
    rootRef = useRef<HTMLDivElement>(null),
    stageRef = useRef<HTMLDivElement>(null),
    detailRef = useRef<HTMLDivElement>(null),
    ghostDetailRef = useRef<HTMLDivElement>(null),
    tooltipRef = useRef<HTMLDivElement>(null),
    queueRef = useRef<HTMLUListElement>(null),
    editorRef = useRef<HTMLTextAreaElement>(null),
    rowElements = useRef(new Map<ReviewId, HTMLButtonElement>()),
    flagElements = useRef(new Map<number, HTMLElement>()),
    timers = useRef<number[]>([]);
  function later(callback: () => void, delay: number) {
    timers.current.push(window.setTimeout(callback, delay));
  }
  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );
  const [clock, setClock] = useState(() => Date.now());
  useEffect(() => {
    if (now !== undefined) return;
    const timer = window.setInterval(() => setClock(Date.now()), 10000);
    return () => window.clearInterval(timer);
  }, [now]);
  const currentTime = now ?? clock;
  function slaState(item: ReviewItem) {
    const elapsed = currentTime - timestamp(item.createdAt);
    return elapsed >= sla ? "over" : elapsed >= sla * 0.75 ? "near" : undefined;
  }
  const [localFilter, setLocalFilter] = useState(defaultFilter),
    activeFilter = filter ?? localFilter,
    [decisions, setDecisions] = useState<Record<string, ReviewedEntry>>({}),
    [history, setHistory] = useState<ReviewId[][]>([]),
    [skipped, setSkipped] = useState<Record<string, boolean>>({}),
    [selectedId, setSelectedId] = useState<ReviewId | null>(null),
    [mode, setMode] = useState<"view" | "edit" | "reject">("view"),
    [draft, setDraft] = useState<ReviewDraft>({}),
    [pinnedFlag, setPinnedFlag] = useState<number | null>(null),
    [hoveredFlag, setHoveredFlag] = useState<number | null>(null),
    [detailGhost, setDetailGhost] = useState<DetailGhost | null>(null),
    [pressed, setPressed] = useState<string | null>(null),
    [toast, setToast] = useState<Toast | null>(null),
    [announcement, announce] = useState("");
  const pending = (
      order === "given"
        ? items
        : [...items].sort(
            (first, second) =>
              (order === "risk"
                ? risks[first.risk ?? "low"].rank - risks[second.risk ?? "low"].rank
                : 0) || timestamp(first.createdAt) - timestamp(second.createdAt),
          )
    ).filter((item) => !decisions[String(item.id)]),
    visible = pending.filter((item) => matchesFilter(item, activeFilter, lowConfidence)),
    visibleIds = new Set(visible.map((item) => item.id));
  const counts = {
      all: pending.length,
      high: pending.filter((item) => matchesFilter(item, "high", lowConfidence)).length,
      unsure: pending.filter((item) => matchesFilter(item, "unsure", lowConfidence))
        .length,
    },
    reviewedCount = reviewed + Object.keys(decisions).length,
    totalCount = Math.max(total ?? reviewedCount + pending.length, reviewedCount),
    oldest = pending.reduce<ReviewItem | undefined>(
      (oldest, item) =>
        !oldest || timestamp(item.createdAt) < timestamp(oldest.createdAt)
          ? item
          : oldest,
      undefined,
    );
  const previousIndex = useRef(0),
    selectedIndex = visible.findIndex((item) => item.id === selectedId),
    currentIndex =
      selectedIndex >= 0
        ? selectedIndex
        : Math.min(previousIndex.current, visible.length - 1),
    current = currentIndex >= 0 ? visible[currentIndex] : undefined,
    flags = current ? itemFlags(current) : [],
    nextEntrance = useRef<DetailEntrance | null>("first"),
    entrance = useRef<{
      id?: string;
      mode: DetailEntrance;
    }>({ mode: "first" });
  if (current?.id !== entrance.current.id) {
    entrance.current = {
      id: current?.id,
      mode: nextEntrance.current ?? "down",
    };
    nextEntrance.current = null;
  }
  useLayoutEffect(() => {
    previousIndex.current = Math.max(0, currentIndex);
    if (current && current.id !== selectedId) setSelectedId(current.id);
  });
  const currentChange = useRef(onCurrentChange);
  currentChange.current = onCurrentChange;
  useEffect(() => {
    if (clean) currentChange.current?.(current);
  }, [current?.id]);
  useLayoutEffect(() => {
    setMode("view");
    setPinnedFlag(null);
    setHoveredFlag(null);
    setDraft({});
    if (stageRef.current) stageRef.current.scrollTop = 0;
  }, [current?.id]);
  const [queueGhosts, setQueueGhosts] = useState<QueueGhost[]>([]),
    previousVisible = useRef<ReviewItem[]>([]);
  useLayoutEffect(() => {
    const previous = previousVisible.current;
    previousVisible.current = visible;
    const removed = previous
      .map((item, index) => ({ item, index }))
      .filter((entry) => !visibleIds.has(entry.item.id));
    if (!removed.length || reducedMotion()) return;
    const key = performance.now(),
      ghosts: QueueGhost[] = removed.map((entry) => ({
        ...entry,
        result: decisions[String(entry.item.id)]?.result,
        delay: decisions[String(entry.item.id)]?.delay ?? 0,
        key,
      }));
    setQueueGhosts((previous) => [
      ...previous.filter(
        (entry) => !ghosts.some((ghost) => ghost.item.id === entry.item.id),
      ),
      ...ghosts,
    ]);
    const duration = Math.max(
      ...ghosts.map((ghost) => ghost.delay + (ghost.result ? 180 : 0) + 300),
    );
    later(
      () => setQueueGhosts((previous) => previous.filter((ghost) => ghost.key !== key)),
      duration + 80,
    );
  });
  const rows: Array<{
    item: ReviewItem;
    ghost?: QueueGhost;
  }> = visible.map((item) => ({ item }));
  for (const ghost of [...queueGhosts]
    .filter((ghost) => !visibleIds.has(ghost.item.id))
    .sort((first, second) => first.index - second.index))
    rows.splice(Math.min(ghost.index, rows.length), 0, {
      item: ghost.item,
      ghost,
    });
  const seenIds = useRef(new Set<ReviewId>()),
    mounted = useRef(false),
    rowEntrances = useRef(new Map<ReviewId, QueueEntrance>());
  let arrivalIndex = 0;
  for (const item of visible) {
    if (rowEntrances.current.has(item.id)) continue;
    const kind = mounted.current
      ? seenIds.current.has(item.id)
        ? "in"
        : "new"
      : "first";
    rowEntrances.current.set(item.id, {
      kind,
      delay: Math.min(
        420,
        kind === "first" ? 80 + arrivalIndex++ * 50 : arrivalIndex++ * 30,
      ),
    });
  }
  useLayoutEffect(() => {
    mounted.current = true;
    for (const item of items) seenIds.current.add(item.id);
    for (const id of rowEntrances.current.keys())
      if (!visibleIds.has(id)) rowEntrances.current.delete(id);
  });
  const restoreFocusTo = useRef<"row" | "root" | null>(null);
  function rememberFocus() {
    const element = document.activeElement;
    restoreFocusTo.current = queueRef.current?.contains(element)
      ? "row"
      : rootRef.current?.contains(element)
        ? "root"
        : null;
  }
  useLayoutEffect(() => {
    const target = restoreFocusTo.current;
    if (!target) return;
    restoreFocusTo.current = null;
    const root = rootRef.current,
      active = document.activeElement;
    if (target === "row" && current)
      rowElements.current.get(current.id)?.focus({ preventScroll: true });
    else if (!root?.contains(active) || active === document.body)
      root?.focus({ preventScroll: true });
  });
  useLayoutEffect(() => {
    const queue = queueRef.current,
      row = current ? rowElements.current.get(current.id)?.parentElement : undefined;
    if (!queue || !row || queue.scrollHeight <= queue.clientHeight) return;
    const top = row.offsetTop - 6,
      bottom = row.offsetTop + row.offsetHeight + 6;
    if (top < queue.scrollTop)
      queue.scrollTo({ top, behavior: reducedMotion() ? "auto" : "smooth" });
    else if (bottom > queue.scrollTop + queue.clientHeight)
      queue.scrollTo({
        top: bottom - queue.clientHeight,
        behavior: reducedMotion() ? "auto" : "smooth",
      });
  }, [current?.id]);
  function flash(action: string) {
    setPressed(action);
    later(() => setPressed((previous) => (previous === action ? null : previous)), 220);
  }
  function decide(targets: ReviewItem[], result: ReviewResult) {
    if (!targets.length) return;
    rememberFocus();
    const entries: Record<string, ReviewedEntry> = {};
    for (const item of targets) entries[String(item.id)] = { item, result, delay: 0 };
    setDecisions((previous) => ({ ...previous, ...entries }));
    setHistory((previous) => [...previous.slice(-19), targets.map((item) => item.id)]);
    if (current && entries[String(current.id)]) {
      if (!reducedMotion()) {
        const key = performance.now(),
          delay = entries[String(current.id)].delay;
        nextEntrance.current = "decide";
        setDetailGhost({
          item: current,
          result,
          draft: { ...draft },
          delay,
          key,
          dir: result.decision,
        });
        later(
          () => setDetailGhost((previous) => (previous?.key === key ? null : previous)),
          delay + 180 + 300 + 100,
        );
      } else nextEntrance.current = "fade";
    }
    setMode("view");
    setPinnedFlag(null);
    const action = result.decision === "approved" ? "Approved" : "Rejected",
      edited = result.text !== undefined || result.fields !== undefined,
      text =
        targets.length > 1
          ? `${targets.length} approved`
          : `${action}${edited ? " with edits" : result.reason ? ` · ${result.reason}` : ""}`,
      key = performance.now();
    setToast({ text, decision: result.decision, key });
    later(() => setToast((previous) => (previous?.key === key ? null : previous)), 6000);
    announce(
      `${targets.length > 1 ? `${targets.length} items approved` : `${action}: ${targets[0].title}${result.reason ? `, ${result.reason}` : ""}`}. ${reviewedCount + targets.length} of ${totalCount} reviewed.`,
    );
    for (const item of targets) onDecide?.(item, result);
  }
  function approve() {
    if (!current) return;
    if (mode === "edit") return save();
    flash("approve");
    decide([current], { decision: "approved" });
  }
  function toggleReject() {
    if (current) {
      flash("reject");
      setMode(mode === "reject" ? "view" : "reject");
    }
  }
  function reject(reason: string) {
    if (current) {
      flash(`reason:${reason}`);
      decide([current], { decision: "rejected", reason });
    }
  }
  function edit(focus = true) {
    if (!current) return;
    flash("edit");
    if (mode === "edit") return;
    setDraft(draftFor(current));
    setMode("edit");
    setPinnedFlag(null);
    if (focus)
      requestAnimationFrame(() => {
        (
          editorRef.current ??
          rootRef.current?.querySelector<HTMLInputElement>(
            clean ? ".ui-rvcc__input" : ".ui-rvc__input",
          )
        )?.focus({ preventScroll: true });
      });
  }
  function save() {
    if (!current || mode !== "edit") return;
    flash("save");
    decide([current], editedResult(current, draft));
  }
  function cancel() {
    if (mode !== "view") {
      rememberFocus();
      setMode("view");
      setDraft({});
    }
  }
  function move(delta: number) {
    if (visible.length < 2 || !current) return;
    rememberFocus();
    const index = (currentIndex + delta + visible.length) % visible.length;
    nextEntrance.current = delta > 0 ? "down" : "up";
    setSelectedId(visible[index].id);
  }
  function skip() {
    if (!current) return;
    flash("skip");
    setSkipped((previous) => ({ ...previous, [String(current.id)]: true }));
    onSkip?.(current);
    announce(`Skipped: ${current.title}`);
    move(1);
  }
  function changeFilter(next: ReviewFilter) {
    nextEntrance.current = "fade";
    setLocalFilter(next);
    onFilterChange?.(next);
  }
  function undo() {
    const ids = history.at(-1);
    if (!ids) return;
    rememberFocus();
    flash("undo");
    const entries = ids.map((id) => decisions[String(id)]).filter(Boolean);
    setDecisions((previous) => {
      const next = { ...previous };
      for (const id of ids) delete next[String(id)];
      return next;
    });
    setHistory((previous) => previous.slice(0, -1));
    setToast(null);
    if (entries[0]) {
      nextEntrance.current = "up";
      setSelectedId(entries[0].item.id);
      if (!matchesFilter(entries[0].item, activeFilter, lowConfidence))
        changeFilter("all");
    }
    announce(
      `Undone – ${entries.length > 1 ? `${entries.length} items are` : `${entries[0]?.item.title} is`} back in the queue.`,
    );
    for (const entry of entries) onUndo?.(entry.item, entry.result);
  }
  function cycleFlags() {
    if (flags.length)
      setPinnedFlag((previous) =>
        previous === null ? 0 : previous + 1 >= flags.length ? null : previous + 1,
      );
  }
  function select(id: ReviewId) {
    const index = visible.findIndex((item) => item.id === id);
    if (index < 0 || index === currentIndex) return;
    nextEntrance.current = index > currentIndex ? "down" : "up";
    setSelectedId(id);
  }
  const latestSelect = useRef(select);
  latestSelect.current = select;
  const pick = useCallback((id: ReviewId) => latestSelect.current(id), []),
    registerRow = useCallback((id: ReviewId, element: HTMLButtonElement | null) => {
      if (element) rowElements.current.set(id, element);
      else rowElements.current.delete(id);
    }, []);
  useImperativeHandle(ref, () => ({
    approve,
    reject: (reason) => (reason ? reject(reason) : toggleReject()),
    edit: () => edit(false),
    setDraft: (value, fieldId) =>
      setDraft((previous) => ({
        ...previous,
        [fieldId ? `field:${fieldId}` : "body"]: value,
      })),
    save,
    cancel,
    skip,
    next: () => move(1),
    previous: () => move(-1),
    undo,
    peek: setPinnedFlag,
    select,
  }));
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.nativeEvent.isComposing) return;
    const target = event.target,
      editing =
        target instanceof Element &&
        target.closest("textarea, input, select, [contenteditable='true']"),
      command = event.metaKey || event.ctrlKey;
    function run(action: () => void) {
      event.preventDefault();
      action();
    }
    if (mode === "edit" && command && event.key === "Enter") return run(save);
    if (event.key === "Escape") {
      if (mode !== "view") return run(cancel);
      if (pinnedFlag !== null) return run(() => setPinnedFlag(null));
      return;
    }
    if (editing || event.altKey) return;
    if (command) {
      if (event.key.toLowerCase() === "z" && !event.shiftKey) run(undo);
      return;
    }
    if (mode === "reject") {
      const index = Number(event.key);
      if (index >= 1 && index <= reasons.length)
        return run(() => reject(reasons[index - 1]));
    }
    const shortcuts: Record<string, () => void> = {
      a: approve,
      e: () => edit(),
      r: toggleReject,
      s: skip,
      j: () => move(1),
      arrowdown: () => move(1),
      k: () => move(-1),
      arrowup: () => move(-1),
      f: cycleFlags,
      z: undo,
      u: undo,
    };
    const action = shortcuts[event.key.toLowerCase()];
    if (action) run(action);
  }
  const activeFlag = hoveredFlag ?? pinnedFlag,
    flag = activeFlag === null ? undefined : flags[activeFlag],
    tooltipId = `${id}-tip`;
  return {
    rootRef,
    stageRef,
    detailRef,
    ghostDetailRef,
    tooltipRef,
    queueRef,
    editorRef,
    flagElements,
    currentTime,
    slaState,
    activeFilter,
    counts,
    reviewedCount,
    totalCount,
    oldest,
    pending,
    visible,
    current,
    currentIndex,
    rows,
    rowEntrances: rowEntrances.current,
    skipped,
    mode,
    draft,
    setDraft,
    pinnedFlag,
    setPinnedFlag,
    hoveredFlag,
    setHoveredFlag,
    detailGhost,
    pressed,
    toast,
    announcement,
    entrance: entrance.current.mode,
    activeFlag,
    flag,
    tooltipId,
    reasons,
    pick,
    registerRow,
    approve,
    toggleReject,
    reject,
    edit,
    save,
    cancel,
    skip,
    undo,
    changeFilter,
    onKeyDown,
  };
}
function useReviewLayout(review: ReviewController) {
  const {
    tooltipRef,
    stageRef,
    activeFlag,
    flagElements,
    rootRef,
    detailRef,
    ghostDetailRef,
    detailGhost,
  } = review;
  useLayoutEffect(() => {
    const tooltip = tooltipRef.current,
      stage = stageRef.current,
      mark = activeFlag === null ? undefined : flagElements.current.get(activeFlag);
    if (!tooltip || !stage || !mark) return;
    const bounds = stage.getBoundingClientRect(),
      scale = stage.offsetWidth ? bounds.width / stage.offsetWidth : 1,
      rects = mark.getClientRects(),
      first = rects[0] ?? mark.getBoundingClientRect(),
      last = rects[rects.length - 1] ?? first,
      tipWidth = tooltip.offsetWidth,
      tipHeight = tooltip.offsetHeight,
      top = (first.top - bounds.top) / scale + stage.scrollTop,
      bottom = (last.bottom - bounds.top) / scale + stage.scrollTop,
      center = (first.left + first.width / 2 - bounds.left) / scale,
      above =
        !(bottom + 8 + tipHeight <= stage.scrollTop + stage.clientHeight - 4) &&
        top - tipHeight - 8 >= stage.scrollTop + 4,
      left = Math.max(
        10,
        Math.min(center - tipWidth / 2, stage.offsetWidth - tipWidth - 10),
      );
    tooltip.style.top = `${above ? top - tipHeight - 8 : bottom + 8}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.setProperty("--x", `${center - left}px`);
    tooltip.dataset.side = above ? "above" : "below";
  });
  const [narrow, setNarrow] = useState(false);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!narrow) {
      stage.style.height = "";
      return;
    }
    const measure = () => {
      const height = detailRef.current?.offsetHeight ?? 0,
        leavingHeight =
          detailGhost && performance.now() - detailGhost.key < detailGhost.delay + 180
            ? (ghostDetailRef.current?.offsetHeight ?? 0)
            : 0;
      stage.style.height = `${Math.max(height, leavingHeight)}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (detailRef.current) observer.observe(detailRef.current);
    const timer = detailGhost
      ? window.setTimeout(
          measure,
          Math.max(0, detailGhost.key + detailGhost.delay + 180 - performance.now()) + 10,
        )
      : 0;
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  });
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => setNarrow(root.clientWidth - 8 < 640));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  return narrow;
}
function ApproveIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M5 14L8.5 17.5L19 6.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M18 6L6.00081 17.9992M17.9992 18L6 6.00085`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506`}
        stroke={`currentColor`}
        strokeLinejoin={`round`}
        strokeWidth={`1.6`}
      />
      <path
        d={`M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.6`}
      />
    </svg>
  );
}
function SkipIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
    </svg>
  );
}
function WarningIcon() {
  return (
    <svg
      width={`14`}
      height={`14`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
      <path
        d={`M12 9V13`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
      <path
        d={`M12 16.8V17`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2.4`}
      />
    </svg>
  );
}
function UndoIcon() {
  return (
    <svg
      width={`14`}
      height={`14`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.79275 3 5.97733 4.67765 4.38341 7.20327M3.29339 3.00076L3.46556 5.05452C3.58958 6.53384 3.65159 7.27349 4.13359 7.68914C4.61559 8.10479 5.32673 8.03185 6.74899 7.88595L8.79339 7.67625`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeWidth={`2`}
      />
      <path
        d={`M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeWidth={`2`}
      />
    </svg>
  );
}
function ReviewIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z`}
        stroke={`currentColor`}
        strokeWidth={`1.6`}
      />
      <path
        d={`M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.6`}
      />
    </svg>
  );
}
function ReviewAvatar({ item, prefix }: { item: ReviewItem; prefix: string }) {
  return (
    <span
      className={`${prefix}__avatar`}
      data-logo={item.icon ? "" : undefined}
      aria-hidden="true"
    >
      {item.icon ?? initial(item.agent)}
    </span>
  );
}
function highlightCode(text: string) {
  return text.split(tokenPattern).map((token, index) => {
    if (index % 2 === 0 || !token) return token;
    const kind = /^(\/\/|--)/.test(token)
      ? "com"
      : /^["'`]/.test(token)
        ? "str"
        : keywordPattern.test(token)
          ? "kw"
          : /^[A-Z]/.test(token)
            ? "type"
            : "fn";
    return (
      <span data-tok={kind} key={index}>
        {token}
      </span>
    );
  });
}
function InsertedText({
  before,
  after,
  prefix,
}: {
  before: string;
  after: string;
  prefix: string;
}) {
  const [leading, inserted, trailing] = insertedText(before, after);
  return (
    <Fragment>
      {leading}
      {inserted && <ins className={`${prefix}__ins`}>{inserted}</ins>}
      {trailing}
    </Fragment>
  );
}
/** Called during the detail render so flags keep one continuous index across fields, files and steps. */
function renderReviewText(
  value: unknown,
  interactive: boolean,
  counter: FlagCounter,
  review: ReviewController,
  prefix: string,
  format?: "code",
  start = 1,
) {
  const parts = textParts(value);
  function flag(part: ReviewFlag, key: number) {
    const index = counter.index++,
      active = interactive && review.activeFlag === index;
    return (
      <mark
        ref={
          interactive
            ? (element) => {
                if (element) review.flagElements.current.set(index, element);
                else review.flagElements.current.delete(index);
              }
            : undefined
        }
        className={`${prefix}__flag`}
        data-on={active ? "" : undefined}
        tabIndex={interactive ? 0 : -1}
        aria-describedby={active ? review.tooltipId : undefined}
        aria-label={`${part.text} – the agent is unsure`}
        onMouseEnter={interactive ? () => review.setHoveredFlag(index) : undefined}
        onMouseLeave={
          interactive
            ? () =>
                review.setHoveredFlag((previous) =>
                  previous === index ? null : previous,
                )
            : undefined
        }
        onFocus={interactive ? () => review.setPinnedFlag(index) : undefined}
        onBlur={
          interactive
            ? () =>
                review.setPinnedFlag((previous) => (previous === index ? null : previous))
            : undefined
        }
        key={key}
      >
        {part.text}
      </mark>
    );
  }
  function content(parts: ReviewParts, code = false) {
    return parts.map((part, index) =>
      typeof part === "string" ? (
        <span key={index}>{code ? highlightCode(part) : part}</span>
      ) : (
        flag(part, index)
      ),
    );
  }
  if (format !== "code") return content(parts);
  let oldLine = start,
    newLine = start;
  return splitLines(parts).map((line, index) => {
    const first = line[0],
      text = typeof first === "string" ? first : "";
    if (text.startsWith("@@")) {
      const numbers = /-(\d+)(?:,\d+)? \+(\d+)/.exec(text);
      if (numbers) {
        oldLine = Number(numbers[1]);
        newLine = Number(numbers[2]);
      }
      return (
        <span className={`${prefix}__hunk`} key={index}>
          {text}
        </span>
      );
    }
    const change = text.startsWith("+") ? "add" : text.startsWith("-") ? "del" : "ctx",
      source = typeof first === "string" ? [first.slice(1), ...line.slice(1)] : line,
      lineNumber =
        change === "add"
          ? newLine++
          : change === "del"
            ? oldLine++
            : (oldLine++, newLine++);
    return (
      <span className={`${prefix}__line`} data-diff={change} key={index}>
        <span className={`${prefix}__ln`}>
          {change !== "ctx" && (
            <span className={`${prefix}__sign`}>{change === "add" ? "+" : "−"}</span>
          )}
          {lineNumber}
        </span>
        <span className={`${prefix}__src`}>
          {source.length ? content(source, true) : "​"}
        </span>
      </span>
    );
  });
}
function ReviewDetail({
  item,
  ghost,
  review,
  prefix,
}: {
  item: ReviewItem;
  ghost?: DetailGhost;
  review: ReviewController;
  prefix: string;
}) {
  const interactive = !ghost,
    counter = { index: 0 },
    editing = interactive && review.mode === "edit",
    saved = ghost?.draft ?? {},
    original = ghost ? draftFor(item) : {},
    decision = ghost?.result.decision,
    fields = reviewFields(item);
  const text = (value: unknown, format?: "code", start?: number) =>
    renderReviewText(value, interactive, counter, review, prefix, format, start);
  const changed = (before: string, after: string) => (
    <InsertedText before={before} after={after} prefix={prefix} />
  );
  return (
    <div
      ref={ghost ? review.ghostDetailRef : review.detailRef}
      className={`${prefix}__detail`}
      data-ghost={ghost ? "" : undefined}
      data-decision={decision}
      data-enter={ghost ? undefined : review.entrance}
      aria-hidden={ghost ? true : undefined}
      style={
        {
          "--d": `${ghost?.delay ?? review.detailGhost?.delay ?? 0}ms`,
        } as ReviewStyle
      }
    >
      <div className={`${prefix}__who`}>
        <ReviewAvatar item={item} prefix={prefix} />
        <div className={`${prefix}__meta`}>
          <span className={`${prefix}__name`}>
            <span className={`${prefix}__agent`} dir="auto" title={item.agent}>
              {item.agent}
            </span>
            {item.risk !== "low" && (
              <span className={`${prefix}__risk`} data-risk={item.risk}>
                {risks[item.risk ?? "low"].label}
              </span>
            )}
          </span>
          {item.model && (
            <span className={`${prefix}__model`} title={item.model}>
              {item.model}
            </span>
          )}
        </div>
      </div>
      <div className={`${prefix}__ask`}>
        <h3 className={`${prefix}__title`} dir="auto">
          {item.title}
        </h3>
      </div>
      {item.reasoning && (
        <p className={`${prefix}__why`} dir="auto">
          <b>{"Why "}</b>
          {item.reasoning}
        </p>
      )}
      <section
        className={`${prefix}__proposal`}
        data-editing={editing ? "" : undefined}
        aria-label={`Proposal: ${item.type}`}
      >
        {!!fields.length && (
          <dl className={`${prefix}__fields`}>
            {fields.map((field, index) => {
              const key = `field:${field.label}`;
              return (
                <div key={`${field.label}-${index}`}>
                  <dt>{field.label}</dt>
                  <dd dir="auto" title={editing ? undefined : plainText(field.value)}>
                    {editing ? (
                      <input
                        className={`${prefix}__input`}
                        value={review.draft[key] ?? ""}
                        aria-label={field.label}
                        onChange={(event) => {
                          const value = event.target.value;
                          review.setDraft((previous) => ({
                            ...previous,
                            [key]: value,
                          }));
                        }}
                      />
                    ) : ghost &&
                      saved[key] !== undefined &&
                      saved[key] !== original[key] ? (
                      changed(original[key], saved[key])
                    ) : (
                      text(field.value)
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
        {item.body !== undefined && (
          <div className={`${prefix}__body`} data-format={item.format}>
            {item.bodyLabel && (
              <span className={`${prefix}__body-label`}>{item.bodyLabel}</span>
            )}
            {editing ? (
              <div className={`${prefix}__editor`}>
                <div className={`${prefix}__mirror`} aria-hidden="true">
                  {changed(plainText(item.body), review.draft.body ?? "")}
                  {"​"}
                </div>
                <textarea
                  ref={review.editorRef}
                  value={review.draft.body ?? ""}
                  aria-label={item.bodyLabel ?? "Proposal"}
                  spellCheck={false}
                  onChange={(event) => {
                    const body = event.target.value;
                    review.setDraft((previous) => ({ ...previous, body }));
                  }}
                />
              </div>
            ) : item.format === "code" &&
              !(ghost && saved.body !== undefined && saved.body !== original.body) ? (
              <div className={`${prefix}__code`}>
                <div className={`${prefix}__diff`}>{text(item.body, "code")}</div>
              </div>
            ) : (
              <p className={`${prefix}__text`} dir="auto">
                {ghost && saved.body !== undefined && saved.body !== original.body
                  ? changed(original.body, saved.body)
                  : text(item.body)}
              </p>
            )}
          </div>
        )}
        {!!item.files?.length && (
          <div className={`${prefix}__code`}>
            {item.files.map((file, index) => {
              const path = file.path ?? "";
              return (
                <div className={`${prefix}__file`} key={`${file.path}-${index}`}>
                  <div className={`${prefix}__file-head`}>
                    <span className={`${prefix}__path`} title={file.path}>
                      {path.includes("/") && (
                        <span className={`${prefix}__dir`}>
                          {path.slice(0, path.lastIndexOf("/") + 1)}
                        </span>
                      )}
                      {path.slice(path.lastIndexOf("/") + 1)}
                    </span>
                    {file.added !== undefined && (
                      <span className={`${prefix}__count-add`}>
                        {"+"}
                        {numberFormat.format(file.added)}
                      </span>
                    )}
                    {file.removed !== undefined && (
                      <span className={`${prefix}__count-del`}>
                        {"−"}
                        {numberFormat.format(file.removed)}
                      </span>
                    )}
                  </div>
                  {file.diff !== undefined && (
                    <div className={`${prefix}__diff`}>
                      {text(file.diff, "code", file.start ?? 1)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {!!item.steps?.length && (
          <ol className={`${prefix}__steps`}>
            {item.steps.map((step, index) => (
              <li
                className={`${prefix}__step`}
                data-flagged={
                  flagCount(step.title) + flagCount(step.detail) ? "" : undefined
                }
                key={index}
              >
                <span className={`${prefix}__step-n`} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={`${prefix}__step-main`}>
                  <span className={`${prefix}__step-title`} dir="auto">
                    {text(step.title)}
                  </span>
                  {step.tool && (
                    <span className={`${prefix}__step-tool`} title={step.tool}>
                      {step.icon && (
                        <span className={`${prefix}__source-icon`}>{step.icon}</span>
                      )}
                      <span className={`${prefix}__source-label`}>{step.tool}</span>
                    </span>
                  )}
                  {step.detail !== undefined && (
                    <span className={`${prefix}__step-detail`} dir="auto">
                      {text(step.detail)}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>
      {!!item.sources?.length && (
        <div className={`${prefix}__foot`}>
          <ul className={`${prefix}__sources`} aria-label="Sources">
            {item.sources.map((source, index) => {
              const content = (
                <Fragment>
                  <span className={`${prefix}__source-icon`}>
                    {source.icon ?? <LinkIcon />}
                  </span>
                  <span className={`${prefix}__source-label`} dir="auto">
                    {source.label}
                  </span>
                </Fragment>
              );
              return (
                <li title={source.label} key={`${source.label}-${index}`}>
                  {source.href && interactive ? (
                    <a
                      className={`${prefix}__source`}
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {content}
                    </a>
                  ) : (
                    <span className={`${prefix}__source`}>{content}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
function ReviewAction({
  action,
  label,
  icon,
  shortcut,
  onClick,
  primary,
  danger,
  disabled,
  pressed,
  prefix,
}: ActionProps) {
  return (
    <button
      type="button"
      className={`${prefix}__btn`}
      data-primary={primary ? "" : undefined}
      data-danger={danger ? "" : undefined}
      data-pressed={pressed === action ? "" : undefined}
      data-tone={danger ? "rejected" : primary ? "approved" : undefined}
      disabled={disabled}
      aria-keyshortcuts={shortcut.length === 1 ? shortcut.toUpperCase() : undefined}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      <kbd className={`${prefix}__kbd`}>{shortcut}</kbd>
    </button>
  );
}
function ReviewActions({ review, prefix }: { review: ReviewController; prefix: string }) {
  const {
      mode,
      current,
      visible,
      pressed,
      reasons,
      approve,
      edit,
      toggleReject,
      reject,
      skip,
      cancel,
      save,
    } = review,
    disabled = !current;
  return (
    <div className={`${prefix}__actions`} data-mode={mode}>
      {mode === "view" && (
        <div className={`${prefix}__btns`} key="view">
          <ReviewAction
            action="approve"
            label="Approve"
            icon={<ApproveIcon />}
            shortcut="A"
            onClick={approve}
            primary
            disabled={disabled}
            pressed={pressed}
            prefix={prefix}
          />
          <ReviewAction
            action="edit"
            label="Edit"
            icon={<EditIcon />}
            shortcut="E"
            onClick={() => edit()}
            disabled={disabled || (!current?.body && !reviewFields(current).length)}
            pressed={pressed}
            prefix={prefix}
          />
          <ReviewAction
            action="reject"
            label="Reject"
            icon={<CloseIcon />}
            shortcut="R"
            onClick={toggleReject}
            disabled={disabled}
            danger
            pressed={pressed}
            prefix={prefix}
          />
          <ReviewAction
            action="skip"
            label="Skip"
            icon={<SkipIcon />}
            shortcut="S"
            onClick={skip}
            disabled={visible.length < 2}
            pressed={pressed}
            prefix={prefix}
          />
        </div>
      )}
      {mode === "reject" && (
        <div
          className={`${prefix}__btns`}
          role="group"
          aria-label="Why reject it?"
          key="reject"
        >
          <span className={`${prefix}__why-label`}>{"Why?"}</span>
          {reasons.map((reason, index) => (
            <button
              type="button"
              className={`${prefix}__reason`}
              data-pressed={pressed === `reason:${reason}` ? "" : undefined}
              onClick={() => reject(reason)}
              aria-keyshortcuts={String(index + 1)}
              key={reason}
            >
              <kbd className={`${prefix}__kbd`}>{index + 1}</kbd>
              {reason}
            </button>
          ))}
          <button
            type="button"
            className={`${prefix}__cancel`}
            onClick={cancel}
            aria-label="Cancel"
          >
            {"Esc"}
          </button>
        </div>
      )}
      {mode === "edit" && (
        <div className={`${prefix}__btns`} key="edit">
          <ReviewAction
            action="save"
            label="Approve with edits"
            icon={<ApproveIcon />}
            shortcut="⌘↵"
            onClick={save}
            primary
            pressed={pressed}
            prefix={prefix}
          />
          <ReviewAction
            action="cancel"
            label="Cancel"
            icon={<CloseIcon />}
            shortcut="Esc"
            onClick={cancel}
            pressed={pressed}
            prefix={prefix}
          />
        </div>
      )}
    </div>
  );
}
function ReviewCenterView({
  clean = false,
  ...props
}: ReviewCenterProps & {
  clean?: boolean;
}) {
  const { title = "Review center", className } = props,
    review = useReviewCenter(props, clean),
    narrow = useReviewLayout(review),
    prefix = clean ? "ui-rvcc" : "ui-rvc";
  const {
      rootRef,
      onKeyDown,
      reviewedCount,
      totalCount,
      oldest,
      currentTime,
      slaState,
      pending,
      toast,
      pressed,
      undo,
      activeFilter,
      changeFilter,
      counts,
      queueRef,
      rows,
      current,
      visible,
      rowEntrances,
      skipped,
      pick,
      registerRow,
      stageRef,
      detailGhost,
      detailRef,
      flag,
      mode,
      tooltipRef,
      tooltipId,
      activeFlag,
      announcement,
    } = review,
    progress = totalCount ? reviewedCount / totalCount : 0;
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onMouseDown={(event) => {
        const target = event.target;
        if (
          !(target instanceof Element) ||
          !target.closest("button, a, input, textarea, mark")
        )
          requestAnimationFrame(() => rootRef.current?.focus({ preventScroll: true }));
      }}
    >
      <header className={`${prefix}__head`}>
        <span className={`${prefix}__mark`}>
          <ReviewIcon />
        </span>
        <span className={`${prefix}__heading`} title={title}>
          {title}
        </span>
        <span className={`${prefix}__progress`}>
          <span
            className={`${prefix}__track`}
            data-live={pending.length ? "" : undefined}
            aria-hidden="true"
          >
            <span className={`${prefix}__fill`} style={{ width: `${progress * 100}%` }} />
          </span>
          <span className={`${prefix}__count`}>
            <b key={reviewedCount}>{numberFormat.format(reviewedCount)}</b>
            {" of "}
            {numberFormat.format(totalCount)}
            {" reviewed"}
          </span>
        </span>
        {oldest && (
          <span className={`${prefix}__oldest`}>
            {"oldest "}
            <b data-sla={slaState(oldest)}>
              {ageLabel(currentTime - timestamp(oldest.createdAt))}
            </b>
          </span>
        )}
        {toast && (
          <div
            className={`${prefix}__undo`}
            data-decision={toast.decision}
            key={toast.key}
          >
            <span className={`${prefix}__undo-text`}>
              {toast.decision === "rejected" ? <CloseIcon /> : <ApproveIcon />}
              {toast.text}
            </span>
            <button
              type="button"
              className={`${prefix}__undo-btn`}
              data-pressed={pressed === "undo" ? "" : undefined}
              onClick={undo}
              aria-keyshortcuts="Z"
            >
              <UndoIcon />
              {"Undo"}
              <kbd className={`${prefix}__kbd`}>{"Z"}</kbd>
            </button>
          </div>
        )}
      </header>
      <div className={`${prefix}__card`} data-narrow={narrow ? "" : undefined}>
        <div className={`${prefix}__queue`}>
          <div className={`${prefix}__queue-head`}>
            <div
              className={`${prefix}__filters`}
              role="group"
              aria-label="Filter the queue"
            >
              {filters.map((filter) => (
                <button
                  type="button"
                  className={`${prefix}__filter`}
                  aria-pressed={activeFilter === filter.id}
                  onClick={() => changeFilter(filter.id)}
                  key={filter.id}
                >
                  {filter.label}
                  <span className={`${prefix}__filter-count`}>
                    {numberFormat.format(counts[filter.id])}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <ul ref={queueRef} className={`${prefix}__list`} aria-label="Queue">
            {rows.map(({ item, ghost }) => (
              <ReviewQueueRow_ReviewQueueRow
                item={item}
                ghost={ghost}
                current={!ghost && current?.id === item.id}
                focusable={
                  !ghost && (current?.id === item.id || (!current && item === visible[0]))
                }
                enter={ghost ? undefined : rowEntrances.get(item.id)}
                wait={ageLabel(currentTime - timestamp(item.createdAt))}
                sla={slaState(item)}
                skipped={!!skipped[String(item.id)]}
                onPick={pick}
                setElement={registerRow}
                prefix={prefix}
                key={ghost ? `${item.id}~out` : item.id}
              />
            ))}
            {!rows.length && (
              <li className={`${prefix}__none`}>
                {pending.length ? "Nothing matches this filter" : "Nothing waiting"}
              </li>
            )}
          </ul>
        </div>
        <div className={`${prefix}__main`}>
          <div ref={stageRef} className={`${prefix}__stage`}>
            {detailGhost && (
              <ReviewDetail
                item={detailGhost.item}
                ghost={detailGhost}
                review={review}
                prefix={prefix}
                key={`out-${detailGhost.key}`}
              />
            )}
            {current ? (
              <ReviewDetail
                item={current}
                review={review}
                prefix={prefix}
                key={current.id}
              />
            ) : (
              <div
                ref={detailRef}
                className={`${prefix}__empty`}
                data-after={detailGhost ? "" : undefined}
                style={{ "--d": `${detailGhost?.delay ?? 0}ms` } as ReviewStyle}
              >
                <span className={`${prefix}__empty-mark`}>
                  <ReviewIcon size={22} />
                </span>
                <b>{pending.length ? "Nothing matches this filter" : "All caught up"}</b>
                <span>
                  {pending.length
                    ? `${numberFormat.format(pending.length)} more in the queue under All`
                    : `${numberFormat.format(reviewedCount)} of ${numberFormat.format(totalCount)} reviewed – new items from your agents show up here`}
                </span>
              </div>
            )}
            {!!flag && mode !== "edit" && (
              <div
                ref={tooltipRef}
                id={tooltipId}
                role="tooltip"
                className={`${prefix}__tip`}
                key={activeFlag}
              >
                <span className={`${prefix}__tip-head`}>
                  <WarningIcon />
                  {"Agent's note"}
                </span>
                <p>{flag.note}</p>
                {flag.source && (
                  <span className={`${prefix}__tip-source`}>{flag.source}</span>
                )}
              </div>
            )}
          </div>
          <ReviewActions review={review} prefix={prefix} />
        </div>
      </div>
      <div className={`${prefix}__sr`} aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </div>
  );
}
const risks = {
  high: { label: "High risk", rank: 0 },
  medium: { label: "Medium risk", rank: 1 },
  low: { label: "Low risk", rank: 2 },
};
const defaultReasons = ["Wrong info", "Tone", "Not allowed", "Other"];
const numberFormat = new Intl.NumberFormat("en");
const ReviewQueueRow_ReviewQueueRow = memo(function ReviewQueueRow({
  item,
  ghost,
  current,
  focusable,
  enter,
  wait,
  sla,
  skipped,
  onPick,
  setElement,
  prefix,
}: ReviewQueueRowProps) {
  const decision = ghost?.result?.decision;
  return (
    <li
      className={`${prefix}__item`}
      data-enter={enter?.kind}
      data-leaving={ghost ? "" : undefined}
      data-decision={decision}
      style={
        {
          "--d": `${ghost ? ghost.delay : (enter?.delay ?? 0)}ms`,
        } as ReviewStyle
      }
    >
      <button
        ref={ghost ? undefined : (element) => setElement(item.id, element)}
        type="button"
        className={`${prefix}__row`}
        data-risk={item.risk}
        aria-current={current ? "true" : undefined}
        aria-label={`${item.title}. ${item.type}, ${risks[item.risk ?? "low"].label.toLowerCase()}, ${confidenceLabel(item.confidence)} confidence${wait ? (wait === "now" ? ", just in" : `, waiting ${wait}`) : ""}${skipped ? ", skipped" : ""}`}
        tabIndex={focusable ? 0 : -1}
        onClick={() => {
          if (!ghost) onPick(item.id);
        }}
      >
        <ReviewAvatar item={item} prefix={prefix} />
        <span className={`${prefix}__row-main`}>
          <span className={`${prefix}__row-top`}>
            <span className={`${prefix}__row-title`} dir="auto" title={item.title}>
              {item.title}
            </span>
            {decision ? (
              <span
                className={`${prefix}__row-done`}
                data-decision={decision}
                aria-hidden="true"
              >
                {decision === "rejected" ? <CloseIcon /> : <ApproveIcon />}
              </span>
            ) : (
              <span className={`${prefix}__wait`} data-sla={sla}>
                {wait}
              </span>
            )}
          </span>
          <span className={`${prefix}__row-meta`}>
            <span className={`${prefix}__tag`} dir="auto" title={item.type}>
              {item.type}
            </span>
            {skipped && <span className={`${prefix}__skipped`}>{"· skipped"}</span>}
          </span>
        </span>
      </button>
    </li>
  );
});
const tokenPattern =
  /(\/\/.*|--\s.*|"[^"]*"|'[^']*'|`[^`]*`|\b(?:const|let|var|return|if|else|await|async|function|export|import|from|new|throw|for|of|in|try|catch|null|undefined|true|false|SELECT|FROM|WHERE|UPDATE|SET|ALTER|TABLE|ADD|DROP|COLUMN|CREATE|INDEX|ON|NOT|NULL|DEFAULT|BEGIN|COMMIT|AND|IS)\b|\b[a-z_]\w*(?=\()|\b[A-Z][A-Za-z]+\b)/;
const keywordPattern =
  /^(?:const|let|var|return|if|else|await|async|function|export|import|from|new|throw|for|of|in|try|catch|null|undefined|true|false|[A-Z]{2,})$/;
const filters: Array<{
  id: ReviewFilter;
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "high", label: "High risk" },
  { id: "unsure", label: "Unsure" },
];
export { ReviewCenter };
export type { ReviewFlag };
export type { ReviewText };
export type { ReviewField };
export type { ReviewFile };
export type { ReviewStep };
export type { ReviewSource };
export type { ReviewItem };
export type { ReviewResult };
export type { ReviewFilter };
export type { ReviewCenterHandle };
export type { ReviewCenterProps };
