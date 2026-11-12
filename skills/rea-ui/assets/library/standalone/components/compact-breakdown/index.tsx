"use client";

import "./CompactBreakdown.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useId,
  useLayoutEffect,
  type KeyboardEvent,
} from "react";
interface BreakdownItem {
  id?: string;
  name?: string;
  label?: string;
  value?: number;
  color?: string;
  [field: string]: unknown;
}
interface CompactBreakdownProps {
  title?: string;
  items: BreakdownItem[];
  periods: {
    id: string;
    label: string;
  }[];
  period?: string;
  defaultPeriod?: string;
  onPeriodChange?: (id: string) => void;
  delta?: number;
  format?: (value: number) => string;
  totalLabel?: string;
  footer?: ReactNode | null;
  className?: string;
}
interface RetainedItem {
  key: string;
  label?: string;
  color: string;
}
function CompactBreakdown(props: CompactBreakdownProps) {
  return <CompactBreakdownView {...props} />;
}
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
/** Animate all values together so segment shares and displayed totals stay aligned. */
function useAnimatedValues(
  target: Record<string, number>,
  enterDuration: number,
  updateDuration: number,
) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(Object.keys(target).map((key) => [key, 0])),
  );
  const currentValues = useRef(values);
  const hasAnimated = useRef(false);
  // The effect responds to values, rather than a new object created by each render.
  const serializedTarget = JSON.stringify(target);
  useEffect(() => {
    const nextValues = JSON.parse(serializedTarget) as Record<string, number>;
    const startValues = { ...currentValues.current };
    if (prefersReducedMotion()) {
      currentValues.current = nextValues;
      setValues(nextValues);
      return;
    }
    const duration = hasAnimated.current ? updateDuration : enterDuration;
    hasAnimated.current = true;
    const startedAt = performance.now();
    let frameId = 0;
    const update = (time: number) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      const easedProgress = 1 - (1 - progress) ** 4;
      const interpolated: Record<string, number> = {};
      for (const key in nextValues) {
        const start = startValues[key] ?? 0;
        interpolated[key] = start + (nextValues[key] - start) * easedProgress;
      }
      currentValues.current = interpolated;
      setValues(interpolated);
      if (progress < 1) frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [serializedTarget]);
  return values;
}
function CompactBreakdownView({
  title = "Breakdown",
  items,
  periods,
  period,
  defaultPeriod,
  onPeriodChange,
  delta,
  format = formatInteger,
  totalLabel = "Total",
  footer,
  className,
  clean = false,
}: CompactBreakdownProps & {
  clean?: boolean;
}) {
  const prefix = clean ? "ui-cbc" : "ui-cb";
  const instanceId = useId();
  const [localPeriod, setLocalPeriod] = useState(defaultPeriod ?? periods?.[0]?.id);
  const selectedPeriod = period ?? localPeriod;
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  // Retain removed entries while their values animate back to zero.
  const retainedItems = useRef<RetainedItem[]>([]);
  const keyCounts = new Map<string, number>();
  const keyedItems = items.map((item) => {
    const baseKey = String(item.id ?? item.label);
    const duplicates = keyCounts.get(baseKey) ?? 0;
    keyCounts.set(baseKey, duplicates + 1);
    return { item, key: duplicates ? `${baseKey}#${duplicates}` : baseKey };
  });
  for (const { item, key } of keyedItems) {
    const existing = retainedItems.current.find((entry) => entry.key === key);
    if (existing) {
      existing.label = item.label;
      if (item.color) existing.color = item.color;
    } else
      retainedItems.current.push({
        key,
        label: item.label,
        color:
          item.color ??
          `var(--${prefix}-c${Math.min(retainedItems.current.length + 1, 5)})`,
      });
  }
  const valuesByKey = new Map(
    keyedItems.map(({ item, key }) => [key, positiveValue(item.value)]),
  );
  const total = [...valuesByKey.values()].reduce((sum, value) => sum + value, 0);
  const activeKey =
    hoveredKey !== null && valuesByKey.has(hoveredKey) ? hoveredKey : null;
  const animationTargets: Record<string, number> = {
    "#total": total,
    "#figure": activeKey ? (valuesByKey.get(activeKey) ?? 0) : total,
  };
  for (const item of retainedItems.current)
    animationTargets[item.key] = valuesByKey.get(item.key) ?? 0;
  const animatedValues = useAnimatedValues(animationTargets, 900, 620);
  const animatedTotal = Math.max(animatedValues["#total"] ?? 0, 1e-4);
  const rows = retainedItems.current
    .map((item) => ({
      ...item,
      value: valuesByKey.get(item.key) ?? 0,
      leaving: !valuesByKey.has(item.key),
    }))
    .filter((item) => !item.leaving || (animatedValues[item.key] ?? 0) > 0.5)
    .sort(
      (left, right) =>
        Number(left.leaving) - Number(right.leaving) || right.value - left.value,
    );
  const rowOrder = rows.map((item) => item.key).join("|");
  const largestItem = rows.find((item) => !item.leaving && item.value > 0);
  const rowElements = useRef(new Map<string, HTMLLIElement>());
  const previousPositions = useRef(new Map<string, number>());
  useLayoutEffect(() => {
    const positions = new Map<string, number>();
    rowElements.current.forEach((element, key) => positions.set(key, element.offsetTop));
    if (!prefersReducedMotion())
      positions.forEach((top, key) => {
        const previousTop = previousPositions.current.get(key);
        const element = rowElements.current.get(key);
        if (element && previousTop !== undefined && previousTop !== top)
          element.animate(
            [{ transform: `translateY(${previousTop - top}px)` }, { transform: "none" }],
            { duration: 560, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );
      });
    previousPositions.current = positions;
  }, [rowOrder]);
  const periodSwitchRef = useRef<HTMLDivElement>(null);
  const periodPillRef = useRef<HTMLSpanElement>(null);
  const pillPositioned = useRef(false);
  useLayoutEffect(() => {
    const periodSwitch = periodSwitchRef.current;
    const pill = periodPillRef.current;
    const selected = periodSwitch?.querySelector<HTMLButtonElement>(
      '[aria-checked="true"]',
    );
    if (!periodSwitch || !pill || !selected) return;
    const updatePill = () => {
      if (!pillPositioned.current) pill.style.transition = "none";
      pill.style.width = `${selected.offsetWidth}px`;
      pill.style.height = `${selected.offsetHeight}px`;
      pill.style.transform = `translate(${selected.offsetLeft}px, ${selected.offsetTop}px)`;
      pill.style.opacity = "1";
      if (!pillPositioned.current) {
        // Flush the initial position before restoring the movement transition.
        void pill.offsetWidth;
        pill.style.transition = "";
        pillPositioned.current = true;
      }
    };
    updatePill();
    const observer = new ResizeObserver(updatePill);
    observer.observe(periodSwitch);
    return () => observer.disconnect();
  }, [selectedPeriod, periods?.length]);
  function selectPeriod(id: string) {
    if (period === undefined) setLocalPeriod(id);
    onPeriodChange?.(id);
  }
  function handlePeriodKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!periods?.length) return;
    const current = periods.findIndex((option) => option.id === selectedPeriod);
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? current + 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? current - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? periods.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    selectPeriod(periods[(next + periods.length) % periods.length].id);
    requestAnimationFrame(() =>
      periodSwitchRef.current
        ?.querySelector<HTMLButtonElement>('[aria-checked="true"]')
        ?.focus(),
    );
  }
  const activeItem = activeKey ? rows.find((item) => item.key === activeKey) : undefined;
  const shareOf = (key: string) => ((animatedValues[key] ?? 0) / animatedTotal) * 100;
  const hasDelta = delta !== undefined && Number.isFinite(delta);
  const deltaUp = (delta ?? 0) >= 0;
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      role="group"
      aria-labelledby={`${instanceId}-title`}
    >
      <div className={`${prefix}__${clean ? "body" : "card"}`}>
        <header className={`${prefix}__head`}>
          <h3
            id={`${instanceId}-title`}
            className={`${prefix}__title`}
            title={title}
            dir="auto"
          >
            {title}
          </h3>
          {periods && periods.length > 1 && (
            <div
              ref={periodSwitchRef}
              className={`${prefix}__switch`}
              role="radiogroup"
              aria-label="Period"
              onKeyDown={handlePeriodKeyDown}
            >
              <span
                ref={periodPillRef}
                className={`${prefix}__pill`}
                aria-hidden="true"
              />
              {periods.map((option) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={option.id === selectedPeriod}
                  tabIndex={option.id === selectedPeriod ? 0 : -1}
                  className={`${prefix}__option`}
                  title={option.label}
                  onClick={() => selectPeriod(option.id)}
                  key={option.id}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </header>
        <div className={`${prefix}__figure`}>
          <p className={`${prefix}__big`} aria-hidden="true">
            {format(animatedValues["#figure"] ?? 0)}
          </p>
          {hasDelta && !activeItem && (
            <span
              className={`${prefix}__delta`}
              data-up={deltaUp || undefined}
              key={`${selectedPeriod}-${delta}`}
            >
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d={
                    deltaUp
                      ? "M6 9.5v-7M2.8 5.6 6 2.4l3.2 3.2"
                      : "M6 2.5v7M2.8 6.4 6 9.6l3.2-3.2"
                  }
                />
              </svg>
              {Math.abs(delta ?? 0).toLocaleString("en-US", {
                maximumFractionDigits: 1,
              })}
              {"%"}
            </span>
          )}
        </div>
        <p className={`${prefix}__caption`} aria-hidden="true">
          <span className={`${prefix}__caption-in`} key={activeItem?.key ?? "#total"}>
            {activeItem ? (
              <>
                <i
                  className={`${prefix}__swatch`}
                  style={{ background: activeItem.color }}
                />
                <span className={`${prefix}__caption-label`} dir="auto">
                  {activeItem.label}
                </span>
                <span className={`${prefix}__caption-share`}>
                  {"· "}
                  {formatShare(shareOf(activeItem.key))}
                </span>
              </>
            ) : (
              totalLabel
            )}
          </span>
        </p>
        <p className={`${prefix}__sr`}>
          {totalLabel}
          {": "}
          {format(total)}
          {hasDelta
            ? `, ${deltaUp ? "up" : "down"} ${Math.abs(delta ?? 0).toLocaleString("en-US", { maximumFractionDigits: 1 })}% against the previous period`
            : ""}
        </p>
        <div
          className={`${prefix}__bar`}
          data-active={activeKey ? "" : undefined}
          aria-hidden="true"
          onPointerLeave={() => setHoveredKey(null)}
        >
          {retainedItems.current.map((item) => {
            const share = shareOf(item.key);
            return share > 0.05 ? (
              <span
                className={`${prefix}__seg`}
                data-active={item.key === activeKey || undefined}
                style={{ flexGrow: share, background: item.color }}
                onPointerEnter={() => {
                  if (valuesByKey.has(item.key)) setHoveredKey(item.key);
                }}
                key={item.key}
              />
            ) : null;
          })}
        </div>
        <ul
          className={`${prefix}__list`}
          data-active={activeKey ? "" : undefined}
          onPointerLeave={() => setHoveredKey(null)}
        >
          {rows.map((item) => (
            <li
              ref={(element) => {
                if (element) rowElements.current.set(item.key, element);
                else rowElements.current.delete(item.key);
              }}
              className={`${prefix}__row`}
              data-leaving={item.leaving || undefined}
              key={item.key}
            >
              <div
                className={`${prefix}__item`}
                tabIndex={item.leaving ? -1 : 0}
                data-active={item.key === activeKey || undefined}
                onPointerEnter={() => {
                  if (!item.leaving) setHoveredKey(item.key);
                }}
                onFocus={() => {
                  if (!item.leaving) setHoveredKey(item.key);
                }}
                onBlur={() => setHoveredKey(null)}
              >
                <i className={`${prefix}__swatch`} style={{ background: item.color }} />
                <span className={`${prefix}__label`} title={item.label} dir="auto">
                  {item.label}
                </span>
                <span className={`${prefix}__value`}>
                  {format(animatedValues[item.key] ?? 0)}
                </span>
                <span className={`${prefix}__share`}>
                  {formatShare(shareOf(item.key))}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {footer !== null && (
        <div className={`${prefix}__foot`}>
          {footer ??
            (largestItem && (
              <span className={`${prefix}__foot-in`} key={largestItem.key}>
                {"Largest: "}
                <b title={largestItem.label} dir="auto">
                  {largestItem.label}
                </b>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
const integerFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});
const formatInteger = (value: number) => integerFormatter.format(value);
const positiveValue = (value: number | undefined) =>
  typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
const formatShare = (share: number) =>
  share > 0 && share < 1
    ? "<1%"
    : share > 99 && share < 100
      ? ">99%"
      : `${Math.round(share)}%`;
export { CompactBreakdown };
export type { BreakdownItem };
export type { CompactBreakdownProps };
