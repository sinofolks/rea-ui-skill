"use client";

import "./ContextWindow.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  memo,
  type SVGProps,
  useCallback,
  useId,
  useMemo,
  Fragment,
  type CSSProperties,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ContextPart = {
  id?: string;
  label?: string;
  tokens?: number;
  locked?: boolean;
  items?: Array<{
    id?: string;
    label?: string;
    tokens?: number;
    [field: string]: unknown;
  }>;
  compact?: number;
  color?: string;
  [field: string]: unknown;
};
interface ContextWindowProps {
  parts: ContextPart[];
  limit?: number;
  title?: string;
  model?: string;
  modelIcon?: ReactNode;
  onRemoveItem?: (partId: string, itemId: string) => void;
  onCompact?: (partId: string) => void | Promise<void>;
  action?: {
    label: string;
    onClick: () => void;
  };
  warnAt?: number;
  cells?: number;
  columns?: number;
  className?: string;
}
interface ContextItem {
  id: string;
  label: string | undefined;
  tokens: number;
}
interface Part {
  id: string;
  label: string | undefined;
  tokens: number;
  locked: boolean;
  items: ContextItem[] | undefined;
  compact: number | undefined;
  color: string;
}
interface SwapContent {
  id: string;
  tone: string | undefined;
  node: ReactNode;
}
type IconName = "chevron" | "remove" | "check" | "compact" | "action";
interface ItemListProps {
  partId: string;
  items: ContextItem[];
  leaving: Record<string, boolean>;
  onRemove: (partId: string, itemId: string) => void;
  prefix: string;
  clean: boolean;
}
interface Saving {
  id: number;
  amount: number;
}
interface CompactionNotice {
  id: string;
  leaving: boolean;
}
type CellStyle = CSSProperties & Record<`--${string}`, number | string>;
function ContextWindow(props: ContextWindowProps) {
  return <ContextWindowView {...props} clean={false} />;
}
function formatTokens(value: number): string {
  const tokens = nonnegative(value);
  if (tokens >= 999950000) return `${(tokens / 1000000000).toFixed(1)}B`;
  if (tokens >= 999950) return `${(tokens / 1000000).toFixed(1)}M`;
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}K`;
  return `${Math.round(tokens)}`;
}
function normalizeParts(parts: ContextPart[], prefix: string): Part[] {
  return parts.map((part, index) => ({
    id: part.id ?? "",
    label: part.label,
    tokens: nonnegative(part.tokens),
    locked: !!part.locked,
    items: part.items?.map((item) => ({
      id: item.id ?? "",
      label: item.label,
      tokens: nonnegative(item.tokens),
    })),
    compact: part.compact,
    color:
      typeof part.color === "string"
        ? part.color
        : `var(--${prefix}-c${(index % 6) + 1})`,
  }));
}
function allocateCells(
  parts: Part[],
  capacity: number,
  count: number,
): (number | null)[] {
  const cells: (number | null)[] = Array(count).fill(null);
  if (capacity <= 0) return cells;
  const tokensPerCell = capacity / count;
  let used = 0;
  let nextCell = 0;
  parts.forEach((part, index) => {
    used += part.tokens;
    const end = Math.min(
      count,
      Math.max(
        part.tokens > 0 ? nextCell + 1 : nextCell,
        Math.round(used / tokensPerCell),
      ),
    );
    for (let cell = nextCell; cell < end; cell++) cells[cell] = index;
    nextCell = end;
  });
  return cells;
}
function useAnimatedCounts(target: Record<string, number>, duration: number) {
  const [displayed, setDisplayed] = useState(target);
  const current = useRef(target);
  const targetKey = JSON.stringify(target);
  useEffect(() => {
    const next: Record<string, number> = JSON.parse(targetKey);
    const previous = { ...current.current };
    if (reducedMotion() || Object.keys(next).every((id) => previous[id] === next[id])) {
      current.current = next;
      setDisplayed(next);
      return;
    }
    const start = performance.now();
    let frame = 0;
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 4;
      const values: Record<string, number> = {};
      for (const id in next) {
        const from = previous[id] ?? next[id];
        values[id] = from + (next[id] - from) * eased;
      }
      current.current = values;
      setDisplayed(values);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [targetKey, duration]);
  return displayed;
}
function SwapText({
  id,
  tone,
  children,
  prefix,
}: {
  id: string;
  tone?: string;
  children: ReactNode;
  prefix: string;
}) {
  const previous = useRef<SwapContent>({ id, tone, node: children });
  const [currentId, setCurrentId] = useState(id);
  const [outgoing, setOutgoing] = useState<SwapContent | null>(null);
  if (currentId !== id) {
    setCurrentId(id);
    setOutgoing(previous.current);
  }
  previous.current = { id, tone, node: children };
  useEffect(() => {
    if (!outgoing) return;
    const timer = window.setTimeout(() => setOutgoing(null), 260);
    return () => window.clearTimeout(timer);
  }, [outgoing]);
  return (
    <span className={`${prefix}__swap`}>
      {outgoing && (
        <span
          className={`${prefix}__swap-item`}
          data-out=""
          data-tone={outgoing.tone}
          aria-hidden="true"
          key={`out-${outgoing.id}`}
        >
          {outgoing.node}
        </span>
      )}
      <span className={`${prefix}__swap-item`} data-tone={tone} key={id}>
        {children}
      </span>
    </span>
  );
}
function ContextIcon({
  name,
  clean,
  prefix,
}: {
  name: IconName;
  clean: boolean;
  prefix: string;
}) {
  const paths: Record<IconName, [defaultPath: string, cleanPath: string]> = {
    chevron: ["m3 4.5 3 3 3-3", "m5 6.75 3 3 3-3"],
    remove: ["m2.5 2.5 5 5m0-5-5 5", "m5 5 6 6m0-6-6 6"],
    check: ["m2.6 6.3 2.2 2.2 4.6-5", "m2.6 6.3 2.2 2.2 4.6-5"],
    compact: [
      "M6 1.5v3m0 0L4.6 3.1M6 4.5l1.4-1.4M6 10.5v-3m0 0L4.6 8.9M6 7.5l1.4 1.4M2 6h8",
      "M6 1.5v3m0 0L4.6 3.1M6 4.5l1.4-1.4M6 10.5v-3m0 0L4.6 8.9M6 7.5l1.4 1.4M2 6h8",
    ],
    action: ["M2.5 6h7M6.5 3l3 3-3 3", "M3.5 8h9M9 4.5 12.5 8 9 11.5"],
  };
  const size =
    clean && (name === "chevron" || name === "remove" || name === "action")
      ? 16
      : name === "remove"
        ? 10
        : 12;
  const stroke = {
    stroke: "currentColor",
    strokeWidth: clean ? 1.1 : 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } satisfies SVGProps<SVGPathElement>;
  return (
    <svg
      className={name === "chevron" ? `${prefix}__chevron` : undefined}
      width={String(size)}
      height={String(size)}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={paths[name][clean ? 1 : 0]}
        {...stroke}
        strokeWidth={name === "check" ? (clean ? 1.3 : 1.6) : stroke.strokeWidth}
      />
    </svg>
  );
}
function useContextWindow(props: ContextWindowProps, prefix: string, clean: boolean) {
  const {
    parts: inputParts,
    limit,
    onRemoveItem,
    onCompact,
    warnAt = 0.8,
    cells = 216,
  } = props;
  const sourceParts = useMemo(
    () => normalizeParts(inputParts, prefix),
    [inputParts, prefix],
  );
  const componentId = useId();
  const [removedItems, setRemovedItems] = useState<Record<string, boolean>>({});
  const [compactedSizes, setCompactedSizes] = useState<Record<string, number>>({});
  const [leavingItems, setLeavingItems] = useState<Record<string, boolean>>({});
  const [compactingId, setCompactingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [saving, setSaving] = useState<Saving | null>(null);
  const [compactedAt, setCompactedAt] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState<CompactionNotice | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const visibleItems = useMemo(
    () =>
      Object.fromEntries(
        sourceParts.map((part) => [
          part.id,
          part.items?.filter(
            (item) => onRemoveItem || !removedItems[`${part.id}/${item.id}`],
          ),
        ]),
      ),
    [sourceParts, removedItems, onRemoveItem],
  );
  const parts = sourceParts.map((part) => {
    const items = visibleItems[part.id];
    const tokens = items
      ? items.reduce((total, item) => total + item.tokens, 0)
      : part.tokens;
    return {
      ...part,
      items,
      tokens:
        compactedSizes[part.id] !== undefined && !onCompact
          ? Math.min(tokens, compactedSizes[part.id])
          : tokens,
    };
  });
  const used = parts.reduce((total, part) => total + part.tokens, 0);
  const capacity = nonnegative(limit);
  const fraction = capacity > 0 ? used / capacity : 0;
  const level = fraction >= 0.95 ? "full" : fraction >= warnAt ? "warn" : "ok";
  const hovered = parts.find((part) => part.id === hoveredId) ?? null;
  const countTargets: Record<string, number> = {
    "#used": used,
    "#figure": hovered ? hovered.tokens : used,
  };
  for (const part of parts) countTargets[part.id] = part.tokens;
  const animated = useAnimatedCounts(countTargets, 640);
  const cellParts = allocateCells(parts, capacity, cells);
  async function removeItem(partId: string, itemId: string) {
    const key = `${partId}/${itemId}`;
    setLeavingItems((previous) => ({ ...previous, [key]: true }));
    if (!reducedMotion()) await delay(240);
    if (!mounted.current) return;
    setLeavingItems((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
    if (onRemoveItem) onRemoveItem(partId, itemId);
    else setRemovedItems((previous) => ({ ...previous, [key]: true }));
  }
  const removeRef = useRef(removeItem);
  removeRef.current = removeItem;
  const handleRemove = useCallback(
    (partId: string, itemId: string) => removeRef.current(partId, itemId),
    [],
  );
  const pendingCompaction = useRef<{
    id: string;
    before: number;
  } | null>(null);
  async function compactPart(part: Part) {
    if (compactingId) return;
    setCompactingId(part.id);
    const before = part.tokens;
    await Promise.all([
      Promise.resolve(onCompact?.(part.id)).catch(() => {}),
      delay(reducedMotion() ? 0 : 1300),
    ]);
    if (!mounted.current) return;
    setCompactingId(null);
    setCompactedAt((previous) => ({ ...previous, [part.id]: before }));
    setNotice({ id: part.id, leaving: false });
    if (onCompact) pendingCompaction.current = { id: part.id, before };
    else {
      const ratio = typeof part.compact === "number" ? part.compact : 0.3;
      const after = Math.round(before * ratio);
      setCompactedSizes((previous) => ({ ...previous, [part.id]: after }));
      setCompactedAt((previous) => ({ ...previous, [part.id]: after }));
      setSaving({ id: Date.now(), amount: before - after });
    }
  }
  const pendingTokens = pendingCompaction.current
    ? (parts.find((part) => part.id === pendingCompaction.current?.id)?.tokens ?? 0)
    : 0;
  useEffect(() => {
    const pending = pendingCompaction.current;
    if (!pending || pendingTokens >= pending.before) return;
    pendingCompaction.current = null;
    setCompactedAt((previous) => ({
      ...previous,
      [pending.id]: pendingTokens,
    }));
    setSaving({ id: Date.now(), amount: pending.before - pendingTokens });
  }, [pendingTokens]);
  useEffect(() => {
    if (!saving) return;
    const timer = window.setTimeout(() => setSaving(null), 3200);
    return () => window.clearTimeout(timer);
  }, [saving]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(
      () => setNotice(notice.leaving ? null : { ...notice, leaving: true }),
      notice.leaving ? 420 : 1500,
    );
    return () => window.clearTimeout(timer);
  }, [notice]);
  const isCompacted = (part: Part) =>
    compactedAt[part.id] !== undefined && part.tokens <= compactedAt[part.id];
  const free = Math.max(0, capacity - used);
  let caption: ReactNode = (
    <>
      {compactTokens(free)}
      {" free"}
    </>
  );
  let captionKey = "rest";
  let captionTone: string | undefined;
  if (compactingId) {
    caption = "Compacting…";
    captionKey = "busy";
  } else if (hovered) {
    caption = (
      <span className={`${prefix}__hot`}>
        <b dir="auto">{hovered.label}</b>
        <span>
          {" "}
          {"·"}{" "}
          {capacity > 0
            ? ((hovered.tokens / capacity) * 100).toFixed(
                Number(hovered.tokens / capacity < 0.1),
              )
            : 0}
          {"% of the window"}
        </span>
      </span>
    );
    captionKey = `hot-${hovered.id}`;
  } else if (saving) {
    caption = (
      <>
        {"Saved "}
        <b>{compactTokens(saving.amount)}</b>
        {" tokens"}
      </>
    );
    captionKey = `saved-${saving.id}`;
    captionTone = "ok";
  } else if (level !== "ok") {
    caption =
      level === "full"
        ? used > capacity
          ? `${compactTokens(used - capacity)} over the limit`
          : "Window is full"
        : `${compactTokens(free)} left`;
    captionKey = level;
    if (clean) captionTone = level;
  }
  return {
    componentId,
    parts,
    used,
    capacity,
    fraction,
    level,
    hovered,
    hoveredId,
    setHoveredId,
    animated,
    cellParts,
    leavingItems,
    handleRemove,
    compactingId,
    compactPart,
    isCompacted,
    expandedId,
    setExpandedId,
    notice,
    caption,
    captionKey,
    captionTone,
  };
}
function ContextWindowView(
  props: ContextWindowProps & {
    clean: boolean;
  },
) {
  const {
    title = "Context window",
    model,
    modelIcon,
    action,
    columns = 36,
    className,
    clean,
  } = props;
  const prefix = clean ? "ui-cwc" : "ui-cw";
  const {
    componentId,
    parts,
    used,
    capacity,
    fraction,
    level,
    hovered,
    hoveredId,
    setHoveredId,
    animated,
    cellParts,
    leavingItems,
    handleRemove,
    compactingId,
    compactPart,
    isCompacted,
    expandedId,
    setExpandedId,
    notice,
    caption,
    captionKey,
    captionTone,
  } = useContextWindow(props, prefix, clean);
  function compactButton(part: Part) {
    const compacted = isCompacted(part);
    const busy = compactingId === part.id;
    return (
      <button
        type="button"
        className={`${prefix}__compact`}
        aria-label={compacted ? `${part.label} is compacted` : `Compact ${part.label}`}
        disabled={!!compactingId || part.tokens === 0 || compacted}
        data-busy={busy ? "" : undefined}
        data-done={compacted ? "" : undefined}
        data-leaving={notice?.id === part.id && notice.leaving ? "" : undefined}
        onClick={() => compactPart(part)}
        onFocus={() => setHoveredId(part.id)}
        onBlur={() => setHoveredId(null)}
      >
        <span
          className={`${prefix}__compact-icon`}
          key={busy ? "icon-busy" : compacted ? "icon-done" : "icon-idle"}
        >
          {busy ? (
            <span className={`${prefix}__spinner`} />
          ) : (
            <ContextIcon
              name={compacted ? "check" : "compact"}
              clean={clean}
              prefix={prefix}
            />
          )}
        </span>
        <span
          className={`${prefix}__compact-text`}
          key={compacted ? "text-done" : "text-idle"}
        >
          {compacted ? "Compacted" : "Compact"}
        </span>
      </button>
    );
  }
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      role="group"
      aria-labelledby={`${componentId}-title`}
      data-level={level}
      onPointerLeave={() => setHoveredId(null)}
    >
      <div className={`${prefix}__card`}>
        <div className={`${prefix}__head`}>
          <span
            id={`${componentId}-title`}
            className={`${prefix}__title`}
            title={title}
            dir="auto"
          >
            {title}
          </span>
          {model && (
            <span className={`${prefix}__model`} title={model}>
              {modelIcon && <span className={`${prefix}__model-icon`}>{modelIcon}</span>}
              <span>{model}</span>
            </span>
          )}
        </div>
        <div className={`${prefix}__figure`}>
          <span className={`${prefix}__big`} aria-hidden="true">
            {formatTokens(animated["#figure"] ?? used)}
          </span>
          <span className={`${prefix}__of`} aria-hidden="true">
            <SwapText id={hovered ? hovered.id : "total"} prefix={prefix}>
              {hovered ? hovered.label : `of ${compactTokens(capacity)} tokens`}
            </SwapText>
          </span>
          <span className={`${prefix}__pill`} aria-hidden="true">
            {capacity > 0
              ? Math.round(((animated["#used"] ?? used) / capacity) * 100)
              : 0}
            {"%"}
          </span>
          <span className={`${prefix}__sr`}>
            {compactTokens(used)}
            {" of "}
            {compactTokens(capacity)}
            {" tokens used,"} {Math.round(fraction * 100)}
            {" percent"}
          </span>
        </div>
        <div
          className={`${prefix}__field`}
          aria-hidden="true"
          data-hot={hovered ? "" : undefined}
          style={
            {
              [`--${prefix}-cols`]: columns,
              [`--${prefix}-cols-narrow`]: Math.max(8, Math.round((columns * 2) / 3)),
            } as CellStyle
          }
        >
          {cellParts.map((partIndex, index) => {
            const part = partIndex === null ? null : parts[partIndex];
            return (
              <span
                className={`${prefix}__cell`}
                data-on={part && hoveredId === part.id ? "" : undefined}
                data-busy={part && compactingId === part.id ? "" : undefined}
                data-free={part ? undefined : ""}
                style={
                  {
                    "--i": index,
                    ...(part ? { [`--${prefix}-color`]: part.color } : {}),
                  } as CellStyle
                }
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setHoveredId(part ? part.id : null);
                }}
                key={index}
              />
            );
          })}
        </div>
        <ul className={`${prefix}__parts`}>
          {parts.map((part) => {
            const expandable = !!part.items;
            const expanded = expandedId === part.id;
            const row = (
              <Fragment>
                <span
                  className={`${prefix}__swatch`}
                  style={{ background: part.color }}
                />
                <span className={`${prefix}__label`} title={part.label}>
                  <span className={`${prefix}__label-text`} dir="auto">
                    {part.label}
                  </span>
                  {expandable && (
                    <span
                      className={`${prefix}__open`}
                      data-open={expanded ? "" : undefined}
                    >
                      <ContextIcon name="chevron" clean={clean} prefix={prefix} />
                    </span>
                  )}
                </span>
                {part.compact &&
                  !part.locked &&
                  (!isCompacted(part) || notice?.id === part.id) &&
                  compactButton(part)}
                <span
                  className={`${prefix}__value`}
                  title={`${preciseTokens(part.tokens)} tokens`}
                >
                  {formatTokens(animated[part.id] ?? part.tokens)}
                </span>
              </Fragment>
            );
            return (
              <li
                className={`${prefix}__part`}
                data-hot={hoveredId === part.id ? "" : undefined}
                data-dim={hoveredId && hoveredId !== part.id ? "" : undefined}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setHoveredId(part.id);
                }}
                key={part.id}
              >
                <div className={`${prefix}__row`}>
                  {expandable ? (
                    <button
                      type="button"
                      className={`${prefix}__main`}
                      aria-expanded={expanded}
                      aria-controls={`${componentId}-${part.id}`}
                      onClick={() => setExpandedId(expanded ? null : part.id)}
                      onFocus={() => setHoveredId(part.id)}
                      onBlur={() => setHoveredId(null)}
                    >
                      {row}
                    </button>
                  ) : (
                    <div className={`${prefix}__main`}>{row}</div>
                  )}
                </div>
                {part.items && (
                  <div
                    id={`${componentId}-${part.id}`}
                    className={`${prefix}__fold`}
                    data-open={expanded ? "" : undefined}
                    inert={!expanded}
                  >
                    <div className={`${prefix}__clip`}>
                      <ItemList_context_parts
                        partId={part.id}
                        items={part.items}
                        leaving={leavingItems}
                        onRemove={handleRemove}
                        prefix={prefix}
                        clean={clean}
                      />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`${prefix}__foot`}>
        <span className={`${prefix}__caption`} aria-live="polite">
          <SwapText id={captionKey} tone={captionTone} prefix={prefix}>
            {caption}
          </SwapText>
        </span>
        {action && (
          <button
            type="button"
            className={`${prefix}__action`}
            onClick={action.onClick}
            title={action.label}
          >
            <span className={`${prefix}__action-label`}>{action.label}</span>
            <ContextIcon name="action" clean={clean} prefix={prefix} />
          </button>
        )}
      </div>
    </div>
  );
}
const nonnegative = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
const compactTokens = (tokens: number) =>
  formatTokens(tokens).replace(/\.0(?=[KMB]$)/, "");
const preciseTokens = (tokens: number) =>
  Math.round(nonnegative(tokens)).toLocaleString("en-US");
const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));
const ItemList_context_parts = memo(function ItemList({
  partId,
  items,
  leaving,
  onRemove,
  prefix,
  clean,
}: ItemListProps) {
  return (
    <ul className={`${prefix}__items`}>
      {items.length === 0 && <li className={`${prefix}__empty`}>Nothing attached</li>}
      {items.map((item) => (
        <li
          className={`${prefix}__fold ${prefix}__fold--item`}
          data-open={leaving[`${partId}/${item.id}`] ? undefined : ""}
          key={item.id}
        >
          <div className={`${prefix}__clip`}>
            <div className={`${prefix}__item`}>
              <span className={`${prefix}__item-label`} title={item.label} dir="auto">
                {item.label}
              </span>
              <span
                className={`${prefix}__item-value`}
                title={`${preciseTokens(item.tokens)} tokens`}
              >
                {formatTokens(item.tokens)}
              </span>
              <button
                type="button"
                className={`${prefix}__remove`}
                aria-label={`Remove ${item.label}`}
                onClick={() => onRemove(partId, item.id)}
              >
                <ContextIcon name="remove" clean={clean} prefix={prefix} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});
export { ContextWindow };
export type { ContextWindowProps };
export type { ContextPart };
