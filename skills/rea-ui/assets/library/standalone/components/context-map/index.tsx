"use client";

import "./ContextMap.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  isValidElement,
  Fragment,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
  useId,
  useLayoutEffect,
  type CSSProperties,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ContextBlock = {
  kind?: string;
  tokens?: number;
  icon?: ReactNode;
  detail?: string;
  items?: Array<{
    label?: string;
    icon?: ReactNode;
    [field: string]: unknown;
  }>;
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ContextAgent = {
  id?: string;
  name?: string;
  model?: string;
  icon?: ReactNode;
  limit?: number;
  parts?: Array<{
    id?: string;
    label?: string;
    kind?: "system" | "tools" | "memory" | "file" | "chat" | "result" | "summary";
    from?: number;
    size?: number;
    detail?: string;
    items?: Array<{
      label?: string;
      icon?: ReactNode;
      [field: string]: unknown;
    }>;
    until?: number;
    icon?: ReactNode;
    drop?: boolean;
    [field: string]: unknown;
  }>;
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ContextCompaction = {
  before?: ContextBlock[];
  summarized?: string[];
  dropped?: string[];
  summary?: string;
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
};
interface ContextMapProps {
  blocks: ContextBlock[];
  limit?: number;
  model?: string;
  modelIcon?: ReactNode;
  agents: ContextAgent[];
  agent?: string;
  onAgentChange?: (id: string) => void;
  compaction?: ContextCompaction | null;
  view?: "before" | "after";
  onViewChange?: (view: "before" | "after") => void;
  status?: string;
  onSelect?: (block: ContextBlock | null) => void;
  title?: string;
  className?: string;
}
type BlockKind = keyof typeof KIND_LABELS;
type BlockFate = "kept" | "summarized" | "dropped";
type BlockItem = NonNullable<ContextBlock["items"]>[number];
interface MapBlock extends ContextBlock {
  id: string;
  kind: BlockKind;
  label: string;
  tokens: number;
  icon?: ReactNode;
  detail?: string;
  items?: BlockItem[];
}
interface Compaction {
  before: MapBlock[];
  summarized: string[];
  dropped: string[];
  summary?: string;
}
interface TileValue {
  id: string;
  value: number;
}
interface TileRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface ViewProps extends ContextMapProps {
  clean: boolean;
}
type TileStyle = CSSProperties & Record<"--x" | "--y" | "--w" | "--h", string>;
function ContextMap(props: ContextMapProps) {
  return <ContextMapView {...props} clean={false} />;
}
function positiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}
function formatTokens(value: unknown) {
  const tokens =
    typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
  if (tokens >= 999500)
    return `${(tokens / 1e6).toFixed(tokens >= 9950000 ? 0 : 1).replace(/\.0$/, "")}M`;
  if (tokens >= 100000) return `${Math.round(tokens / 1000)}k`;
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(Math.round(tokens));
}
function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}
function content(value: unknown): ReactNode {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint" ||
    value == null ||
    isValidElement(value)
  )
    return value;
  if (Array.isArray(value)) return value.map(content);
  return null;
}
function normalizeBlocks(value: unknown): MapBlock[] {
  const occurrences = new Map<string, number>();
  if (!Array.isArray(value)) return [];
  return value.filter(Boolean).flatMap((entry) => {
    const source = record(entry);
    if (!source) return [];
    const baseId = String(source.id);
    const occurrence = (occurrences.get(baseId) ?? 0) + 1;
    occurrences.set(baseId, occurrence);
    const kind =
      typeof source.kind === "string" && source.kind in KIND_LABELS
        ? (source.kind as BlockKind)
        : "file";
    const block: MapBlock = {
      ...source,
      id: occurrence > 1 ? `${baseId}#${occurrence}` : baseId,
      kind,
      label: String(source.label ?? "").trim() || KIND_LABELS[kind],
      tokens:
        typeof source.tokens === "number" && Number.isFinite(source.tokens)
          ? Math.max(0, source.tokens)
          : 0,
    };
    if ("icon" in source) block.icon = content(source.icon);
    if ("detail" in source)
      block.detail = typeof source.detail === "string" ? source.detail : undefined;
    if (Array.isArray(source.items))
      block.items = source.items.map((sourceItem) => {
        const data = record(sourceItem);
        const item: BlockItem = { ...(data ?? {}) };
        if (data && "label" in data)
          item.label = typeof data.label === "string" ? data.label : undefined;
        if (data && "icon" in data) item.icon = content(data.icon);
        return item;
      });
    return [block];
  });
}
function normalizeCompaction(
  value: ContextCompaction | null | undefined,
): Compaction | null {
  if (!value) return null;
  const ids = (field: unknown) =>
    Array.isArray(field)
      ? field.filter((id): id is string => typeof id === "string")
      : [];
  return {
    before: normalizeBlocks(value.before),
    summarized: ids(value.summarized),
    dropped: ids(value.dropped),
    summary: typeof value.summary === "string" ? value.summary : undefined,
  };
}
function blockFate(id: string, compaction: Compaction | null): BlockFate {
  return compaction?.summarized.includes(id)
    ? "summarized"
    : compaction?.dropped.includes(id)
      ? "dropped"
      : "kept";
}
function clippingBounds(element: HTMLElement) {
  let parent = element.parentElement;
  while (
    parent &&
    parent !== document.body &&
    getComputedStyle(parent).overflow === "visible"
  )
    parent = parent.parentElement;
  return parent && parent !== document.body
    ? parent.getBoundingClientRect()
    : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
}
/** Split near equal token totals along the longest side, retaining input order. */
function layoutTiles(
  values: TileValue[],
  bounds: TileRect,
  result: Map<string, TileRect>,
) {
  if (!values.length) return;
  if (values.length === 1) {
    result.set(values[0].id, bounds);
    return;
  }
  const total = values.reduce((sum, tile) => sum + tile.value, 0) || 1;
  let firstTotal = 0;
  let split = 1;
  for (let index = 0; index < values.length - 1; index++) {
    firstTotal += values[index].value;
    split = index + 1;
    if (firstTotal >= total / 2) break;
  }
  const fraction =
    values.slice(0, split).reduce((sum, tile) => sum + tile.value, 0) / total;
  if (bounds.width >= bounds.height) {
    const width = bounds.width * fraction;
    layoutTiles(values.slice(0, split), { ...bounds, width }, result);
    layoutTiles(
      values.slice(split),
      { ...bounds, x: bounds.x + width, width: bounds.width - width },
      result,
    );
  } else {
    const height = bounds.height * fraction;
    layoutTiles(values.slice(0, split), { ...bounds, height }, result);
    layoutTiles(
      values.slice(split),
      { ...bounds, y: bounds.y + height, height: bounds.height - height },
      result,
    );
  }
}
function hideFailedIcon(event: SyntheticEvent<HTMLSpanElement>) {
  event.currentTarget.style.display = "none";
}
function FateIcon({ fate }: { fate: BlockFate | "summary" }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      {fate === "kept" ? (
        <path
          d="m2.5 6.3 2.3 2.2 4.7-5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : fate === "dropped" ? (
        <path
          d="m3.2 3.2 5.6 5.6M8.8 3.2 3.2 8.8"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M6 1.5v3.2M4.4 3.3 6 4.9l1.6-1.6M6 10.5V7.3M4.4 8.7 6 7.1l1.6 1.6M2 6h8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
function MapSpinner({ prefix }: { prefix: string }) {
  return (
    <svg className={`${prefix}__spin`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <line
          x1="8"
          y1="1.75"
          x2="8"
          y2="4.75"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={1 - index * 0.11}
          transform={`rotate(${-index * 45} 8 8)`}
          key={index}
        />
      ))}
    </svg>
  );
}
function MapMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.8" y="1.8" width="7" height="12.4" rx="1.6" fill="currentColor" />
      <rect
        x="10"
        y="1.8"
        width="4.2"
        height="6"
        rx="1.4"
        fill="currentColor"
        opacity="0.6"
      />
      <rect
        x="10"
        y="9"
        width="4.2"
        height="5.2"
        rx="1.4"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}
function RollingText({
  prefix,
  transitionKey,
  children,
}: {
  prefix: string;
  transitionKey: string;
  children: ReactNode;
}) {
  const previous = useRef({ key: transitionKey, node: children });
  const [outgoing, setOutgoing] = useState<typeof previous.current | null>(null);
  if (previous.current.key !== transitionKey) {
    const outgoingValue = previous.current;
    previous.current = { key: transitionKey, node: children };
    setOutgoing(outgoingValue);
  } else previous.current.node = children;
  useEffect(() => {
    if (!outgoing) return;
    const timer = window.setTimeout(() => setOutgoing(null), 360);
    return () => clearTimeout(timer);
  }, [outgoing]);
  return (
    <span className={`${prefix}__roll`}>
      {outgoing && (
        <span
          className={`${prefix}__roll-out`}
          aria-hidden="true"
          key={`out-${outgoing.key}`}
        >
          {outgoing.node}
        </span>
      )}
      <span
        className={`${prefix}__roll-in`}
        data-rolling={outgoing ? "" : undefined}
        key={transitionKey}
      >
        {children}
      </span>
    </span>
  );
}
function CompactionSummary({
  prefix,
  compaction,
  after,
}: {
  prefix: string;
  compaction: Compaction | null;
  after: MapBlock[];
}) {
  if (!compaction)
    return (
      <div className={`${prefix}__fates-row`}>
        <RollingText prefix={prefix} transitionKey="none">
          <p className={`${prefix}__fates ${prefix}__fates--none`}>
            Not compacted yet – once it is, compare before and after here.
          </p>
        </RollingText>
      </div>
    );
  const total = (blocks: MapBlock[]) =>
    blocks.reduce((sum, block) => sum + Math.max(0, block.tokens), 0);
  const kept = compaction.before.filter(
    (block) => blockFate(block.id, compaction) === "kept",
  );
  const summarized = compaction.before.filter(
    (block) => blockFate(block.id, compaction) === "summarized",
  );
  const dropped = compaction.before.filter(
    (block) => blockFate(block.id, compaction) === "dropped",
  );
  const summary = after.find((block) => block.id === compaction.summary);
  return (
    <div className={`${prefix}__fates-row`}>
      <RollingText prefix={prefix} transitionKey="done">
        <p className={`${prefix}__fates`}>
          <b>
            {formatTokens(total(compaction.before))}
            {" → "}
            {formatTokens(total(after))}
          </b>
          <span className={`${prefix}__fate`} data-fate="kept">
            {kept.length}
            {" kept · "}
            {formatTokens(total(kept))}
          </span>
          {summarized.length > 0 && (
            <span className={`${prefix}__fate`} data-fate="summarized">
              {summarized.length}
              {" summarized · "}
              {formatTokens(total(summarized))}
              {summary && (
                <Fragment>
                  {" into "}
                  {formatTokens(summary.tokens)}
                </Fragment>
              )}
            </span>
          )}
          {dropped.length > 0 && (
            <span className={`${prefix}__fate`} data-fate="dropped">
              {dropped.length}
              {" dropped · "}
              {formatTokens(total(dropped))}
            </span>
          )}
        </p>
      </RollingText>
    </div>
  );
}
function BlockTooltipContent({
  prefix,
  block,
  capacity,
  compaction,
  view,
}: {
  prefix: string;
  block: MapBlock;
  capacity: number;
  compaction: Compaction | null;
  view: "before" | "after";
}) {
  const fate = blockFate(block.id, compaction);
  const summarized =
    compaction?.before.filter((item) => compaction.summarized.includes(item.id)) ?? [];
  return (
    <Fragment>
      <span className={`${prefix}__tip-head`}>
        {block.icon ? (
          <span
            className={`${prefix}__logo`}
            aria-hidden="true"
            onErrorCapture={hideFailedIcon}
          >
            {block.icon}
          </span>
        ) : (
          <span
            className={`${prefix}__swatch`}
            data-kind={block.kind}
            aria-hidden="true"
          />
        )}
        <span className={`${prefix}__tip-name`}>{block.label}</span>
      </span>
      <span className={`${prefix}__tip-meta`}>
        {KIND_LABELS[block.kind]}
        {" · "}
        {formatTokens(block.tokens)}
        {" tokens · "}
        {(Math.round((block.tokens / capacity) * 1000) / 10).toLocaleString("en-US")}
        {"%"}
      </span>
      {block.detail && <span className={`${prefix}__tip-detail`}>{block.detail}</span>}
      {compaction &&
        view === "before" &&
        compaction.before.some((item) => item.id === block.id) && (
          <span className={`${prefix}__tip-fate`} data-fate={fate}>
            <FateIcon fate={fate} />
            {fate === "summarized"
              ? "Folded into the summary"
              : fate === "dropped"
                ? "Dropped when it compacted"
                : "Kept as it was"}
          </span>
        )}
      {compaction && view === "after" && block.id === compaction.summary && (
        <span className={`${prefix}__tip-fate`} data-fate="summary">
          <FateIcon fate="summary" />
          {`From ${summarized.length.toLocaleString("en-US")} ${summarized.length === 1 ? "block" : "blocks"}, ${formatTokens(summarized.reduce((sum, item) => sum + item.tokens, 0))} before`}
        </span>
      )}
      {Array.isArray(block.items) && block.items.length > 0 && (
        <ul className={`${prefix}__tip-items`}>
          {block.items
            .slice(0, block.items.length > ITEM_LIMIT ? 11 : ITEM_LIMIT)
            .map((item, index) => (
              <li key={index}>
                {item?.icon && (
                  <span
                    className={`${prefix}__logo`}
                    aria-hidden="true"
                    onErrorCapture={hideFailedIcon}
                  >
                    {item.icon}
                  </span>
                )}
                <span className={`${prefix}__tip-item`}>{item?.label}</span>
              </li>
            ))}
          {block.items.length > ITEM_LIMIT && (
            <li className={`${prefix}__tip-more`}>
              {"+"}
              {(block.items.length - ITEM_LIMIT + 1).toLocaleString("en-US")}
              {" more"}
            </li>
          )}
        </ul>
      )}
    </Fragment>
  );
}
function useContextMap({
  blocks,
  limit,
  agents,
  agent,
  compaction: sourceCompaction,
  view,
  onViewChange,
}: ContextMapProps) {
  const titleId = useId();
  const uniqueAgents =
    agents?.filter(
      (entry, index, all) =>
        entry && all.findIndex((candidate) => candidate?.id === entry.id) === index,
    ) ?? [];
  const activeAgent = uniqueAgents.find((entry) => entry.id === agent) ?? uniqueAgents[0];
  const after = normalizeBlocks(blocks);
  const compaction = normalizeCompaction(sourceCompaction);
  const before = compaction?.before ?? [];
  const [menuOpen, setMenuOpen] = useState(false);
  const pickerRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menuOpen || !menu?.parentElement) return;
    menu.style.left = "0px";
    const overflow =
      menu.parentElement.getBoundingClientRect().left +
      menu.offsetWidth -
      (clippingBounds(menu).right - 8);
    if (overflow > 0) menu.style.left = `${-overflow}px`;
  }, [menuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const dismissOutside = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || !pickerRef.current?.contains(event.target))
        setMenuOpen(false);
    };
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissEscape);
    };
  }, [menuOpen]);
  const areaRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  useEffect(() => {
    if (!pinned) return;
    const clearPin = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPinned(null);
    };
    document.addEventListener("keydown", clearPin);
    return () => document.removeEventListener("keydown", clearPin);
  }, [pinned]);
  const [localView, setLocalView] = useState<"before" | "after">("after");
  const currentView = compaction ? (view ?? localView) : "after";
  const changeView = (next: "before" | "after") => {
    setLocalView(next);
    onViewChange?.(next);
  };
  useEffect(() => setLocalView("after"), [sourceCompaction]);
  const visibleBlocks = currentView === "before" && compaction ? before : after;
  const tooltipRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const observer = new ResizeObserver(() =>
      setDimensions({ width: area.clientWidth, height: area.clientHeight }),
    );
    observer.observe(area);
    return () => observer.disconnect();
  }, []);
  const used = visibleBlocks.reduce((sum, block) => sum + block.tokens, 0);
  const requestedLimit = activeAgent?.limit ?? limit;
  const capacity = positiveNumber(requestedLimit) ? requestedLimit : Math.max(1, used);
  const free = Math.max(0, capacity - used);
  const ratio = used / capacity;
  const level = ratio >= 0.95 ? "full" : ratio >= 0.8 ? "high" : undefined;
  const blockCache = useRef(new Map<string, MapBlock>());
  for (const block of visibleBlocks) blockCache.current.set(block.id, block);
  const stableOrder = useRef<string[]>([]);
  const currentIds = visibleBlocks
    .filter((block) => block.tokens > 0)
    .map((block) => block.id);
  const nextOrder = [...stableOrder.current];
  currentIds.forEach((id, index) => {
    if (nextOrder.includes(id)) return;
    const previousId = currentIds
      .slice(0, index)
      .reverse()
      .find((candidate) => nextOrder.includes(candidate));
    nextOrder.splice(previousId ? nextOrder.indexOf(previousId) + 1 : 0, 0, id);
  });
  stableOrder.current = nextOrder;
  const targetValues = new Map<string, number>([
    ...stableOrder.current.map(
      (id) =>
        [
          id,
          Math.max(0, visibleBlocks.find((block) => block.id === id)?.tokens ?? 0),
        ] as const,
    ),
    [FREE_TILE, free],
  ]);
  const animatedValues = useRef(new Map<string, number>());
  const [, redraw] = useState(0);
  const lastFrame = useRef(0);
  useEffect(() => {
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = lastFrame.current
        ? Math.min(64, Math.max(0, now - lastFrame.current))
        : 16;
      lastFrame.current = now;
      const progress = 1 - Math.exp(-elapsed / 110);
      let pending = false;
      let changed = false;
      for (const [id, target] of targetValues) {
        const previous = animatedValues.current.get(id) ?? 0;
        const next =
          Math.abs(target - previous) < 1
            ? target
            : previous + (target - previous) * progress;
        if (next !== target) pending = true;
        if (next !== previous) changed = true;
        animatedValues.current.set(id, next);
      }
      for (const id of [...animatedValues.current.keys()]) {
        if (!targetValues.has(id)) {
          animatedValues.current.delete(id);
          changed = true;
        } else if (
          id !== FREE_TILE &&
          (targetValues.get(id) ?? 0) === 0 &&
          (animatedValues.current.get(id) ?? 0) === 0 &&
          stableOrder.current.includes(id)
        ) {
          stableOrder.current = stableOrder.current.filter(
            (candidate) => candidate !== id,
          );
          changed = true;
        }
      }
      if (changed) redraw((previous) => previous + 1);
      if (pending) frame = requestAnimationFrame(tick);
      else lastFrame.current = 0;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });
  const tiles = [...stableOrder.current, FREE_TILE]
    .map((id) => ({ id, value: animatedValues.current.get(id) ?? 0 }))
    .filter((tile) => tile.value > 0.5);
  const rectangles = new Map<string, TileRect>();
  if (dimensions.width && dimensions.height)
    layoutTiles(
      tiles,
      {
        x: 3,
        y: 3,
        width: dimensions.width - 6,
        height: dimensions.height - 6,
      },
      rectangles,
    );
  if (pinned && !stableOrder.current.includes(pinned)) setPinned(null);
  const tooltipId = hovered && hovered !== FREE_TILE ? hovered : pinned;
  const tooltipBlock = tooltipId ? (blockCache.current.get(tooltipId) ?? null) : null;
  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    const area = areaRef.current;
    const tile = tooltipId ? rectangles.get(tooltipId) : undefined;
    if (!tooltip || !area || !tile) return;
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const origin = area.getBoundingClientRect();
    const clip = clippingBounds(area);
    const bounds = {
      left: clip.left - origin.left + 8,
      top: clip.top - origin.top + 8,
      right: clip.right - origin.left - 8,
      bottom: clip.bottom - origin.top - 8,
    };
    const left = Math.max(
      bounds.left,
      Math.min(tile.x + tile.width / 2 - width / 2, bounds.right - width),
    );
    const above = tile.y - height - 8;
    const below = tile.y + tile.height + 8;
    const top =
      above >= bounds.top
        ? above
        : below + height <= bounds.bottom
          ? below
          : Math.max(bounds.top, Math.min(tile.y + 8, bounds.bottom - height));
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  });
  return {
    titleId,
    uniqueAgents,
    activeAgent,
    after,
    compaction,
    before,
    menuOpen,
    setMenuOpen,
    pickerRef,
    menuRef,
    areaRef,
    hovered,
    setHovered,
    pinned,
    setPinned,
    currentView,
    changeView,
    tooltipRef,
    used,
    requestedLimit,
    capacity,
    ratio,
    level,
    blockCache,
    targetValues,
    tiles,
    rectangles,
    tooltipBlock,
    fateFor: (id: string) => blockFate(id, compaction),
  };
}
function ContextMapView(props: ViewProps) {
  const {
    model,
    modelIcon,
    onAgentChange,
    compaction: sourceCompaction,
    status,
    onSelect,
    title = "Context",
    className,
    clean,
  } = props;
  const prefix = clean ? "ui-cmpc" : "ui-cmp";
  const state = useContextMap(props);
  const selectedAgent = state.activeAgent;
  return (
    <div className={[prefix, className].filter(Boolean).join(" ")}>
      <header className={`${prefix}__bar`}>
        <span className={`${prefix}__mark`}>
          <MapMark />
        </span>
        <span className={`${prefix}__title`} id={state.titleId} title={title}>
          {title}
        </span>
        {selectedAgent ? (
          <span className={`${prefix}__pick`} ref={state.pickerRef}>
            <button
              type="button"
              className={`${prefix}__who ${prefix}__agent`}
              aria-haspopup="menu"
              aria-expanded={state.menuOpen}
              title={selectedAgent.name}
              onClick={() => state.setMenuOpen((previous) => !previous)}
            >
              {selectedAgent.icon && (
                <span
                  className={`${prefix}__logo`}
                  aria-hidden="true"
                  onErrorCapture={hideFailedIcon}
                >
                  {selectedAgent.icon}
                </span>
              )}
              <span className={`${prefix}__model`}>{selectedAgent.name}</span>
              {positiveNumber(selectedAgent.limit) && (
                <span className={`${prefix}__limit`}>{formatTokens(state.capacity)}</span>
              )}
              <svg
                className={`${prefix}__chev`}
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m3.5 4.75 2.5 2.5 2.5-2.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {state.menuOpen && (
              <span ref={state.menuRef} className={`${prefix}__menu`} role="menu">
                {state.uniqueAgents.map((agent) => (
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={agent.id === selectedAgent.id}
                    className={`${prefix}__option`}
                    onClick={() => {
                      state.setMenuOpen(false);
                      if (agent.id !== selectedAgent.id)
                        onAgentChange?.(String(agent.id));
                    }}
                    key={agent.id}
                  >
                    <span
                      className={`${prefix}__logo`}
                      aria-hidden="true"
                      onErrorCapture={hideFailedIcon}
                    >
                      {agent.icon}
                    </span>
                    <span
                      className={`${prefix}__option-text`}
                      title={[agent.name, agent.model].filter(Boolean).join(" · ")}
                    >
                      <span className={`${prefix}__option-name`}>{agent.name}</span>
                      {agent.model && (
                        <span className={`${prefix}__option-model`}>{agent.model}</span>
                      )}
                    </span>
                    {positiveNumber(agent.limit) && (
                      <span className={`${prefix}__limit`}>
                        {formatTokens(agent.limit)}
                      </span>
                    )}
                  </button>
                ))}
              </span>
            )}
          </span>
        ) : (
          (model || modelIcon) && (
            <span className={`${prefix}__who`} title={model}>
              {modelIcon && (
                <span
                  className={`${prefix}__logo`}
                  aria-hidden="true"
                  onErrorCapture={hideFailedIcon}
                >
                  {modelIcon}
                </span>
              )}
              {model && <span className={`${prefix}__model`}>{model}</span>}
              {positiveNumber(state.requestedLimit) && (
                <span className={`${prefix}__limit`}>{formatTokens(state.capacity)}</span>
              )}
            </span>
          )
        )}
        {status && (
          <span className={`${prefix}__status`} title={status} key={status}>
            <MapSpinner prefix={prefix} />
            <span className={`${prefix}__status-text`}>{status}</span>
          </span>
        )}
        <span className={`${prefix}__sum`}>
          {state.compaction && (
            <span className={`${prefix}__compare`} role="group" aria-label="Compaction">
              {(["before", "after"] as const).map((view) => (
                <button
                  type="button"
                  aria-pressed={state.currentView === view}
                  onClick={() => state.changeView(view)}
                  key={view}
                >
                  {view === "before" ? "Before" : "After"}
                </button>
              ))}
            </span>
          )}
          <span>
            <b className={`${prefix}__used`}>{formatTokens(state.used)}</b>
            {" / "}
            {formatTokens(state.capacity)}
          </span>
          <span className={`${prefix}__pct`} data-level={state.level}>
            {Math.round(state.ratio * 100)}
            {"%"}
          </span>
        </span>
      </header>
      <div
        ref={state.areaRef}
        className={`${prefix}__area`}
        role="list"
        aria-labelledby={state.titleId}
        onMouseLeave={() => state.setHovered(null)}
      >
        {state.tiles.map((tile) => {
          const bounds = state.rectangles.get(tile.id);
          if (!bounds) return null;
          const block = state.blockCache.current.get(tile.id);
          const isFree = tile.id === FREE_TILE;
          const showName = bounds.width >= 54 && bounds.height >= 28;
          const showTokens = showName && bounds.height >= 44;
          const showKind = showTokens && bounds.width >= 120;
          const wasBefore = state.before.some((item) => item.id === tile.id);
          const fate = state.fateFor(tile.id);
          const style: TileStyle = {
            "--x": `${bounds.x}px`,
            "--y": `${bounds.y}px`,
            "--w": `${bounds.width}px`,
            "--h": `${bounds.height}px`,
          };
          return (
            <div
              role="listitem"
              className={`${prefix}__tile`}
              data-kind={isFree ? "free" : block?.kind}
              data-fate={
                isFree || !state.compaction
                  ? undefined
                  : state.currentView === "before"
                    ? wasBefore
                      ? fate
                      : undefined
                    : tile.id === state.compaction.summary
                      ? "summary"
                      : undefined
              }
              data-dim={state.hovered && state.hovered !== tile.id ? "" : undefined}
              style={style}
              aria-label={
                isFree
                  ? `Free – ${formatTokens(tile.value)} tokens`
                  : `${block?.label}, ${block ? KIND_LABELS[block.kind] : undefined} – ${formatTokens(tile.value)} tokens`
              }
              onMouseEnter={() => state.setHovered(tile.id)}
              data-pinned={state.pinned === tile.id ? "" : undefined}
              onClick={() => {
                if (isFree) {
                  onSelect?.(null);
                  return;
                }
                state.setPinned((previous) => (previous === tile.id ? null : tile.id));
                onSelect?.(block ?? null);
              }}
              key={tile.id}
            >
              {state.currentView === "before" &&
                wasBefore &&
                fate === "summarized" &&
                bounds.width >= 40 &&
                bounds.height >= 28 && (
                  <span
                    className={`${prefix}__badge`}
                    title="Summarized – click for more"
                    aria-hidden="true"
                  >
                    <FateIcon fate="summarized" />
                  </span>
                )}
              <span className={`${prefix}__label`} aria-hidden="true">
                <span className={`${prefix}__name`} data-show={showName ? "" : undefined}>
                  {block?.icon && !isFree && (
                    <span className={`${prefix}__icon`} onErrorCapture={hideFailedIcon}>
                      {block.icon}
                    </span>
                  )}
                  {isFree ? "Free" : block?.label}
                </span>
                <span
                  className={`${prefix}__tokens`}
                  data-show={showTokens ? "" : undefined}
                >
                  {formatTokens(state.targetValues.get(tile.id) || tile.value)}
                  {!isFree && block && (
                    <span
                      className={`${prefix}__kind`}
                      data-show={showKind ? "" : undefined}
                    >
                      {" "}
                      {state.currentView === "before" && wasBefore ? (
                        <RollingText prefix={prefix} transitionKey={fate}>
                          <span data-fate={fate}>{FATE_LABELS[fate]}</span>
                        </RollingText>
                      ) : (
                        <RollingText prefix={prefix} transitionKey="kind">
                          {"· "}
                          {KIND_LABELS[block.kind]}
                        </RollingText>
                      )}
                    </span>
                  )}
                </span>
              </span>
            </div>
          );
        })}
        {state.tooltipBlock && (
          <div
            ref={state.tooltipRef}
            className={`${prefix}__tip`}
            role="tooltip"
            key={state.tooltipBlock.id}
          >
            <BlockTooltipContent
              prefix={prefix}
              block={state.tooltipBlock}
              capacity={state.capacity}
              compaction={state.compaction}
              view={state.currentView}
            />
          </div>
        )}
      </div>
      {sourceCompaction !== undefined && (
        <CompactionSummary
          prefix={prefix}
          compaction={state.compaction}
          after={state.after}
        />
      )}
    </div>
  );
}
const FREE_TILE = "__free";
const ITEM_LIMIT = 12;
const KIND_LABELS = {
  system: "System prompt",
  tools: "Tools",
  memory: "Memory",
  file: "File",
  chat: "Chat",
  result: "Tool result",
  summary: "Summary",
};
const FATE_LABELS: Record<BlockFate, string> = {
  kept: "· kept",
  summarized: "· summarized",
  dropped: "· dropped",
};
export { ContextMap };
export type { ContextBlock };
export type { ContextAgent };
export type { ContextCompaction };
export type { ContextMapProps };
