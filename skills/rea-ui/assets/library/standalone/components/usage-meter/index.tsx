"use client";

import "./UsageMeter.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type CSSProperties,
  useEffect,
  useRef,
  useState,
  useId,
  useLayoutEffect,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
interface UsageCategory {
  label: string;
  value: number;
  color?: string;
}
interface UsageLimit {
  label: string;
  used: number;
  total?: number | null;
  unit?: string;
  decimals?: number;
}
interface UsagePeriod {
  id: string;
  label: string;
}
interface DailyUsage {
  label: string;
  value: number | null;
}
interface UsageMeterProps {
  total?: number;
  used: UsageCategory[];
  limits?: UsageLimit[];
  periods?: UsagePeriod[];
  period?: string;
  defaultPeriod?: string;
  onPeriodChange?: (id: string) => void;
  resetAt?: Date | string | number;
  daily?: DailyUsage[];
  onUpgrade?: (state: "ok" | "warn" | "limit") => void;
  title?: string;
  plan?: string;
  unit?: string;
  warnAt?: number;
  upgradeLabel?: string;
  topUpLabel?: string;
  className?: string;
}
type UsageState = "ok" | "warn" | "limit";
interface RetainedCategory extends UsageCategory {
  color: string;
  leaving?: boolean;
}
interface UsageSegment extends RetainedCategory {
  left: number;
  width: number;
}
type UsageStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};
function UsageMeter(props: UsageMeterProps) {
  return <UsageMeterView {...props} clean={false} />;
}
function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
function withUnit(value: string, unit?: string): string {
  return unit ? `${value} ${unit}` : value;
}
function finiteValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
function formatCategoryValue(actual: number, animated: number): string {
  return actual > 0 && actual < 1 ? "<1" : formatNumber(animated);
}
function resetLabel(date: Date): string {
  const days = Math.ceil((date.getTime() - Date.now()) / 86400000);
  if (days <= 0) return "Resets today";
  if (days === 1) return "Resets tomorrow";
  return days > 60 ? `Resets ${fullDateFormat.format(date)}` : `Resets in ${days} days`;
}
function usageState(ratio: number, warnAt: number): UsageState {
  return ratio >= 1 ? "limit" : ratio >= warnAt ? "warn" : "ok";
}
function retainLeavingCategories(
  previous: RetainedCategory[],
  current: RetainedCategory[],
): RetainedCategory[] {
  const retained = [...current];
  previous.forEach((item, index) => {
    if (!current.some((candidate) => candidate.label === item.label))
      retained.splice(Math.min(index, retained.length), 0, {
        ...item,
        value: 0,
        leaving: true,
      });
  });
  return retained;
}
function describeLimit(limit: UsageLimit, warnAt: number) {
  const unlimited = limit.total == null || !isFinite(limit.total);
  const decimals =
    limit.decimals ??
    (Number.isInteger(finiteValue(limit.used)) &&
    (unlimited || Number.isInteger(limit.total))
      ? 0
      : 1);
  const used = finiteValue(limit.used);
  const ratio = unlimited ? 0 : used / Math.max(limit.total!, 1e-9);
  const state = unlimited ? "ok" : usageState(ratio, warnAt);
  const maximumLabel = unlimited
    ? "∞"
    : formatNumber(limit.total!, Number.isInteger(limit.total) ? 0 : decimals);
  return { unlimited, decimals, used, state, maximumLabel };
}
function positionPill(container: HTMLElement | null, pill: HTMLElement | null) {
  if (!container || !pill) return;
  const selected = container.querySelector<HTMLElement>('[aria-checked="true"]');
  if (!selected || !selected.offsetWidth) {
    pill.style.opacity = "0";
    return;
  }
  const first = !pill.dataset.ready;
  if (first) pill.style.transition = "none";
  pill.style.opacity = "1";
  pill.style.width = `${selected.offsetWidth}px`;
  pill.style.height = `${selected.offsetHeight}px`;
  pill.style.transform = `translate(${selected.offsetLeft}px, ${selected.offsetTop}px)`;
  if (first) {
    pill.dataset.ready = "1";
    void pill.offsetWidth;
    pill.style.transition = "";
  }
}
function UsageLimits({
  limits,
  warnAt,
  prefix,
  animatedValue,
}: {
  limits: UsageLimit[];
  warnAt: number;
  prefix: string;
  animatedValue: (key: string) => number;
}) {
  const style: UsageStyle = { "--n": Math.min(3, limits.length) };
  return (
    <ul className={`${prefix}__limits`} aria-label="Plan limits" style={style}>
      {limits.map((limit) => {
        const { unlimited, decimals, used, state, maximumLabel } = describeLimit(
          limit,
          warnAt,
        );
        const animated = animatedValue(`l:${limit.label}`);
        return (
          <li className={`${prefix}__limit`} data-state={state} key={limit.label}>
            <span className={`${prefix}__limit-label`}>
              <span className={`${prefix}__limit-name`} title={limit.label} dir="auto">
                {limit.label}
              </span>
              {state !== "ok" && (
                <span
                  className={`${prefix}__dot`}
                  role="img"
                  aria-label={state === "limit" ? "At the limit" : "Close to the limit"}
                />
              )}
            </span>
            <span className={`${prefix}__limit-value`}>
              {formatNumber(animated, decimals)}
              <span className={`${prefix}__muted`}>
                {" of "}
                {withUnit(maximumLabel, unlimited ? undefined : limit.unit)}
              </span>
            </span>
            {unlimited ? (
              <span
                className={`${prefix}__thin`}
                data-unlimited=""
                aria-label={`${limit.label}: ${formatNumber(used, decimals)}, unlimited`}
                role="img"
              />
            ) : (
              <span
                className={`${prefix}__thin`}
                role="meter"
                aria-label={limit.label}
                aria-valuemin={0}
                aria-valuemax={limit.total!}
                aria-valuenow={Math.min(used, limit.total!)}
                aria-valuetext={`${formatNumber(used, decimals)} of ${withUnit(maximumLabel, limit.unit)}`}
              >
                <span
                  style={{
                    width: `${Math.min(100, (animated / Math.max(limit.total!, 1e-9)) * 100)}%`,
                  }}
                />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
/** Keep the initial reveal duration until there is a nonzero value to reveal. */
function useUsageAnimation(target: Record<string, number>) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(Object.keys(target).map((key) => [key, 0])),
  );
  const currentValues = useRef(values);
  const hasAnimated = useRef(false);
  const serializedTarget = JSON.stringify(target);
  useEffect(() => {
    const nextValues = JSON.parse(serializedTarget) as Record<string, number>;
    const startValues = { ...currentValues.current };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      currentValues.current = nextValues;
      setValues(nextValues);
      return;
    }
    const hasNonzero = Object.values(nextValues).some((value) => value !== 0);
    const duration = hasNonzero && !hasAnimated.current ? 1200 : 650;
    if (hasNonzero) hasAnimated.current = true;
    const startedAt = performance.now();
    let frameId = 0;
    function animate(time: number) {
      const progress = Math.min(1, (time - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 4;
      const frame: Record<string, number> = {};
      for (const key in nextValues)
        frame[key] =
          (startValues[key] ?? 0) + (nextValues[key] - (startValues[key] ?? 0)) * eased;
      currentValues.current = frame;
      setValues(frame);
      if (progress < 1) frameId = requestAnimationFrame(animate);
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [serializedTarget]);
  return (key: string) => values[key] ?? 0;
}
function useUsageMeter(
  {
    total,
    used,
    limits = [],
    periods,
    period,
    defaultPeriod,
    onPeriodChange,
    resetAt,
    daily,
    title = "Usage",
    unit = "credits",
    warnAt = 0.8,
  }: UsageMeterProps,
  prefix: string,
) {
  const id = useId();
  const rootRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const periodsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const actionInnerRef = useRef<HTMLSpanElement>(null);
  const [localPeriod, setLocalPeriod] = useState(defaultPeriod ?? periods?.[0]?.id);
  const selectedPeriod = period ?? localPeriod;
  const [visible, setVisible] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [lastActiveLabel, setLastActiveLabel] = useState<string | null>(null);
  const [dayIndex, setDayIndex] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const colors = useRef(new Map<string, string>());
  const coloredCategories = used.map((category) => {
    if (!category.color && !colors.current.has(category.label))
      colors.current.set(
        category.label,
        `var(--${prefix}-c${(colors.current.size % 5) + 1})`,
      );
    return {
      ...category,
      color: category.color || colors.current.get(category.label)!,
    };
  });
  const [retainedCategories, setRetainedCategories] =
    useState<RetainedCategory[]>(coloredCategories);
  const categorySignature = used
    .map((category) => `${category.label}:${category.value}:${category.color ?? ""}`)
    .join("|");
  const initialRender = useRef(true);
  useLayoutEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    setRetainedCategories((previous) =>
      retainLeavingCategories(
        previous.filter((category) => !category.leaving),
        coloredCategories,
      ),
    );
    const timer = window.setTimeout(
      () =>
        setRetainedCategories((previous) =>
          previous.filter((category) => !category.leaving),
        ),
      460,
    );
    return () => clearTimeout(timer);
  }, [categorySignature]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  const totalCapacity = Math.max(0, finiteValue(total));
  const totalUsed = used.reduce(
    (sum, category) => sum + Math.max(0, finiteValue(category.value)),
    0,
  );
  const usedRatio =
    totalCapacity > 0 ? totalUsed / totalCapacity : totalUsed > 0 ? Infinity : 0;
  const state = usageState(usedRatio, warnAt);
  const segmentScale = Math.max(totalCapacity, totalUsed) || 1;
  const targets: Record<string, number> = {
    used: totalUsed,
    left: Math.max(0, totalCapacity - totalUsed),
    pct: Math.min(usedRatio * 100, 1000),
  };
  retainedCategories.forEach((category) => {
    targets[`r:${category.label}`] = category.leaving
      ? 0
      : Math.max(0, finiteValue(category.value));
  });
  limits.forEach((limit) => {
    targets[`l:${limit.label}`] = finiteValue(limit.used);
  });
  daily?.forEach((day, index) => {
    targets[`d:${index}`] = finiteValue(day.value);
  });
  if (!visible) for (const key in targets) targets[key] = 0;
  const animatedValue = useUsageAnimation(targets);
  let segmentLeft = 0;
  const segments: UsageSegment[] = retainedCategories.map((category) => {
    const width = (animatedValue(`r:${category.label}`) / segmentScale) * 100;
    const segment = { ...category, left: segmentLeft, width };
    segmentLeft += width;
    return segment;
  });
  const activeCategory = retainedCategories.find(
    (category) => category.label === activeLabel && !category.leaving,
  );
  const tooltipCategory = retainedCategories.find(
    (category) => category.label === lastActiveLabel,
  );
  const tooltipSegment = segments.find((segment) => segment.label === lastActiveLabel);
  const tooltipLeft = tooltipSegment
    ? Math.min(100, Math.max(0, tooltipSegment.left + tooltipSegment.width / 2))
    : 50;
  function selectCategory(label: string | null) {
    setActiveLabel(label);
    if (label) setLastActiveLabel(label);
  }
  function categoryAtPointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const percent = ((event.clientX - bounds.left) / bounds.width) * 100;
    return (
      segments.find(
        (segment) =>
          !segment.leaving &&
          segment.width > 0 &&
          percent >= segment.left &&
          percent <= segment.left + segment.width,
      )?.label ?? null
    );
  }
  function onCategoryKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const candidates = retainedCategories.filter(
      (category) => !category.leaving && category.value > 0,
    );
    if (!candidates.length) return;
    const index = candidates.findIndex((category) => category.label === activeLabel);
    if (event.key === "ArrowRight")
      selectCategory(candidates[(index + 1) % candidates.length].label);
    else if (event.key === "ArrowLeft")
      selectCategory(
        candidates[(index - 1 + candidates.length) % candidates.length].label,
      );
    else if (event.key === "Escape") selectCategory(null);
    else return;
    event.preventDefault();
  }
  const days = daily ?? [];
  const maxDailyValue = Math.max(1, ...days.map((day) => finiteValue(day.value)));
  const recordedDays = days.filter((day) => day.value !== null);
  const dailyAverage = recordedDays.length
    ? recordedDays.reduce((sum, day) => sum + finiteValue(day.value), 0) /
      recordedDays.length
    : 0;
  function dayAtPointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    return Math.min(
      days.length - 1,
      Math.max(
        0,
        Math.floor(((event.clientX - bounds.left) / bounds.width) * days.length),
      ),
    );
  }
  function onDayKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!days.length) return;
    if (event.key === "ArrowRight")
      setDayIndex((index) => Math.min(days.length - 1, index === null ? 0 : index + 1));
    else if (event.key === "ArrowLeft")
      setDayIndex((index) => Math.max(0, index === null ? days.length - 1 : index - 1));
    else if (event.key === "Escape") setDayIndex(null);
    else return;
    event.preventDefault();
  }
  const selectedDay = dayIndex === null ? undefined : days[dayIndex];
  const previousDayCount = useRef(days.length);
  const regrow = useRef(false);
  if (previousDayCount.current !== days.length) {
    previousDayCount.current = days.length;
    regrow.current = true;
  }
  function selectPeriod(nextPeriod: string) {
    if (nextPeriod === selectedPeriod) return;
    if (period === undefined) setLocalPeriod(nextPeriod);
    onPeriodChange?.(nextPeriod);
    setActiveLabel(null);
    setDayIndex(null);
  }
  function onPeriodKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!periods?.length) return;
    const index = periods.findIndex((candidate) => candidate.id === selectedPeriod);
    let nextIndex = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      nextIndex = (index + 1) % periods.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      nextIndex = (index - 1 + periods.length) % periods.length;
    if (nextIndex < 0) return;
    event.preventDefault();
    selectPeriod(periods[nextIndex].id);
    periodsRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      [nextIndex]?.focus();
  }
  useLayoutEffect(() => {
    positionPill(periodsRef.current, pillRef.current);
  });
  useLayoutEffect(() => {
    const container = periodsRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => positionPill(container, pillRef.current));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    const card = cardRef.current,
      inner = innerRef.current;
    if (!card || !inner) return;
    const update = () => {
      card.style.height = `${inner.offsetHeight}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    const action = actionRef.current,
      inner = actionInnerRef.current;
    if (!action || !inner) return;
    const update = () => {
      action.style.width = `${inner.offsetWidth}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);
  const previousState = useRef(state);
  useEffect(() => {
    if (previousState.current === state) return;
    previousState.current = state;
    setAnnouncement(
      state === "limit"
        ? `${title}: limit reached, ${formatNumber(totalUsed)} of ${formatNumber(totalCapacity)} ${unit} used`
        : state === "warn"
          ? `${title}: running low, ${Math.round(usedRatio * 100)}% of ${unit} used`
          : `${title}: ${formatNumber(totalUsed)} of ${formatNumber(totalCapacity)} ${unit} used`,
    );
  }, [state]);
  const reset =
    resetAt === undefined
      ? null
      : new Date(resetAt instanceof Date ? resetAt.getTime() : resetAt);
  const resetDate = reset && !Number.isNaN(reset.getTime()) ? reset : null;
  return {
    id,
    rootRef,
    cardRef,
    innerRef,
    periodsRef,
    pillRef,
    actionRef,
    actionInnerRef,
    selectedPeriod,
    selectPeriod,
    onPeriodKeyDown,
    announcement,
    totalCapacity,
    totalUsed,
    state,
    animatedValue,
    activeLabel,
    selectCategory,
    activeCategory,
    categoryAtPointer,
    onCategoryKeyDown,
    segments,
    tooltipCategory,
    tooltipLeft,
    retainedCategories,
    days,
    dayIndex,
    setDayIndex,
    maxDailyValue,
    dailyAverage,
    dayAtPointer,
    onDayKeyDown,
    selectedDay,
    regrow: regrow.current,
    resetDate,
  };
}
function UsageMeterView({
  clean = false,
  ...props
}: UsageMeterProps & {
  clean?: boolean;
}) {
  const {
    limits = [],
    periods,
    onUpgrade,
    title = "Usage",
    plan,
    unit = "credits",
    warnAt = 0.8,
    upgradeLabel = "Upgrade",
    topUpLabel = "Add credits",
    className,
  } = props;
  const prefix = clean ? "ui-umc" : "ui-um";
  const {
    id,
    rootRef,
    cardRef,
    innerRef,
    periodsRef,
    pillRef,
    actionRef,
    actionInnerRef,
    selectedPeriod,
    selectPeriod,
    onPeriodKeyDown,
    announcement,
    totalCapacity,
    totalUsed,
    state,
    animatedValue,
    activeLabel,
    selectCategory,
    activeCategory,
    categoryAtPointer,
    onCategoryKeyDown,
    segments,
    tooltipCategory,
    tooltipLeft,
    retainedCategories,
    days,
    dayIndex,
    setDayIndex,
    maxDailyValue,
    dailyAverage,
    dayAtPointer,
    onDayKeyDown,
    selectedDay,
    regrow,
    resetDate,
  } = useUsageMeter(props, prefix);
  const needsAttention = state !== "ok";
  const percentage = animatedValue("pct");
  const tooltipStyle: UsageStyle = {
    left: `${tooltipLeft}%`,
    [`--${prefix}-tip-x`]: `${-tooltipLeft}%`,
  };
  return (
    <section
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      aria-labelledby={`${id}-title`}
      data-state={state}
    >
      <div ref={cardRef} className={`${prefix}__card`}>
        <div ref={innerRef} className={`${prefix}__inner`}>
          <header className={`${prefix}__head`}>
            <div className={`${prefix}__heading`}>
              <h3
                id={`${id}-title`}
                className={`${prefix}__title`}
                title={title}
                dir="auto"
              >
                {title}
              </h3>
              {(plan || resetDate) && (
                <p
                  className={`${prefix}__sub`}
                  title={[plan, resetDate && resetLabel(resetDate)]
                    .filter(Boolean)
                    .join(" · ")}
                >
                  {plan}
                  {plan && resetDate && <span className={`${prefix}__sep`}>·</span>}
                  {resetDate && (
                    <time
                      dateTime={resetDate.toISOString()}
                      title={`Resets on ${resetDateFormat.format(resetDate)}`}
                    >
                      {resetLabel(resetDate)}
                    </time>
                  )}
                </p>
              )}
            </div>
            {periods && periods.length > 1 && (
              <div
                ref={periodsRef}
                className={`${prefix}__switch`}
                role="radiogroup"
                aria-label="Period"
                onKeyDown={onPeriodKeyDown}
              >
                <span ref={pillRef} className={`${prefix}__pill`} aria-hidden="true" />
                {periods.map((period) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={period.id === selectedPeriod}
                    tabIndex={period.id === selectedPeriod ? 0 : -1}
                    className={`${prefix}__option`}
                    title={period.label}
                    onClick={() => selectPeriod(period.id)}
                    children={period.label}
                    key={period.id}
                  />
                ))}
              </div>
            )}
          </header>
          <div className={`${prefix}__figure`}>
            <p className={`${prefix}__amount`}>
              <span className={`${prefix}__big`}>
                {formatNumber(animatedValue("used"))}
              </span>
              <span className={`${prefix}__of`}>
                {"of "}
                {withUnit(formatNumber(totalCapacity), unit)}
              </span>
            </p>
            <span className={`${prefix}__pct`} data-state={state}>
              {needsAttention && <span className={`${prefix}__dot`} aria-hidden="true" />}
              {percentage > 999 ? ">999" : formatNumber(percentage)}
              {"%"}
            </span>
          </div>
          <div
            className={`${prefix}__bar`}
            tabIndex={0}
            role="group"
            aria-label={`${formatNumber(totalUsed)} of ${formatNumber(totalCapacity)} ${unit} used – arrow keys read each category`}
            data-active={activeCategory ? "" : undefined}
            onPointerMove={(event) => {
              if (event.pointerType === "mouse") selectCategory(categoryAtPointer(event));
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") selectCategory(null);
            }}
            onPointerUp={(event) => {
              if (event.pointerType === "mouse") return;
              const label = categoryAtPointer(event);
              selectCategory(label === activeLabel ? null : label);
            }}
            onKeyDown={onCategoryKeyDown}
            onBlur={() => selectCategory(null)}
          >
            <div
              className={`${prefix}__track`}
              role="meter"
              aria-labelledby={`${id}-title`}
              aria-valuemin={0}
              aria-valuemax={totalCapacity}
              aria-valuenow={Math.min(totalUsed, totalCapacity)}
              aria-valuetext={`${formatNumber(totalUsed)} of ${formatNumber(totalCapacity)} ${unit}`}
            >
              {segments.map((segment) => (
                <span
                  className={`${prefix}__seg`}
                  data-active={segment.label === activeLabel || undefined}
                  style={{
                    width: `${segment.width}%`,
                    background: segment.color,
                  }}
                  key={segment.label}
                />
              ))}
            </div>
            <div
              className={`${prefix}__tip`}
              data-open={activeCategory ? "" : undefined}
              style={tooltipStyle}
              aria-live="polite"
            >
              {tooltipCategory && (
                <>
                  <span className={`${prefix}__tip-label`}>
                    <span
                      className={`${prefix}__swatch`}
                      style={{ background: tooltipCategory.color }}
                    />
                    <span className={`${prefix}__tip-name`} dir="auto">
                      {tooltipCategory.label}
                    </span>
                  </span>
                  <span className={`${prefix}__tip-value`}>
                    {withUnit(
                      formatCategoryValue(
                        finiteValue(tooltipCategory.value),
                        finiteValue(tooltipCategory.value),
                      ),
                      unit,
                    )}
                    <span className={`${prefix}__muted`}>
                      {" · "}
                      {formatNumber(
                        totalUsed
                          ? (finiteValue(tooltipCategory.value) / totalUsed) * 100
                          : 0,
                      )}
                      {"%"}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
          <ul
            className={`${prefix}__legend`}
            aria-label="By category"
            data-active={activeCategory ? "" : undefined}
          >
            {retainedCategories.map((category) => {
              const animated = animatedValue(`r:${category.label}`);
              return (
                <li
                  className={`${prefix}__row`}
                  data-leaving={category.leaving || undefined}
                  key={category.label}
                >
                  <div
                    className={`${prefix}__item`}
                    data-active={category.label === activeLabel || undefined}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse" && !category.leaving)
                        selectCategory(category.label);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") selectCategory(null);
                    }}
                    onPointerUp={(event) => {
                      if (event.pointerType !== "mouse" && !category.leaving)
                        selectCategory(
                          category.label === activeLabel ? null : category.label,
                        );
                    }}
                  >
                    <span
                      className={`${prefix}__swatch`}
                      style={{ background: category.color }}
                    />
                    <span
                      className={`${prefix}__label`}
                      title={category.label}
                      dir="auto"
                    >
                      {category.label}
                    </span>
                    <span className={`${prefix}__value`}>
                      {formatCategoryValue(finiteValue(category.value), animated)}
                    </span>
                    <span className={`${prefix}__share`}>
                      {formatNumber(
                        animatedValue("used")
                          ? (animated / animatedValue("used")) * 100
                          : 0,
                      )}
                      {"%"}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          {days.length > 0 && (
            <div className={`${prefix}__daily`}>
              <div className={`${prefix}__daily-head`}>
                <span>Per day</span>
                <span
                  className={`${prefix}__daily-read`}
                  children={
                    selectedDay ? (
                      <>
                        {selectedDay.label}
                        {" · "}
                        <b>
                          {selectedDay.value === null
                            ? "–"
                            : withUnit(formatNumber(selectedDay.value), unit)}
                        </b>
                      </>
                    ) : (
                      <>
                        {"Avg "}
                        <b>{formatNumber(dailyAverage)}</b>
                        {" / day"}
                      </>
                    )
                  }
                  key={selectedDay ? `d${dayIndex}` : "avg"}
                />
              </div>
              <div
                className={`${prefix}__spark`}
                tabIndex={0}
                role="img"
                aria-label={`${title} per day, ${formatNumber(dailyAverage)} ${unit} on average – arrow keys read each day`}
                data-hover={dayIndex !== null || undefined}
                data-regrow={regrow || undefined}
                data-few={days.length <= 14 || undefined}
                data-many={
                  days.length > 45 ? (days.length > 120 ? "dense" : "") : undefined
                }
                onPointerMove={(event) => setDayIndex(dayAtPointer(event))}
                onPointerDown={(event) => setDayIndex(dayAtPointer(event))}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") setDayIndex(null);
                }}
                onKeyDown={onDayKeyDown}
                onBlur={() => setDayIndex(null)}
                key={days.length}
              >
                {days.map((day, index) => {
                  const style: UsageStyle = { "--i": index };
                  return (
                    <span
                      className={`${prefix}__day`}
                      data-future={day.value === null || undefined}
                      data-active={index === dayIndex || undefined}
                      style={style}
                      key={index}
                    >
                      <span
                        style={{
                          height:
                            day.value === null
                              ? undefined
                              : `${Math.max(4, (animatedValue(`d:${index}`) / maxDailyValue) * 100)}%`,
                        }}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {limits.length > 0 && (
            <UsageLimits
              limits={limits}
              warnAt={warnAt}
              prefix={prefix}
              animatedValue={animatedValue}
            />
          )}
        </div>
      </div>
      <div className={`${prefix}__foot`}>
        <span className={`${prefix}__status`} key={state}>
          {needsAttention && <span className={`${prefix}__dot`} aria-hidden="true" />}
          {state === "limit" ? (
            <>
              <b>Limit reached</b>
              {totalUsed > totalCapacity && (
                <span className={`${prefix}__muted`}>
                  {withUnit(formatNumber(totalUsed - totalCapacity), "over")}
                </span>
              )}
            </>
          ) : (
            <>
              {state === "warn" && <b>Running low</b>}
              <span className={state === "warn" ? `${prefix}__muted` : undefined}>
                {withUnit(formatNumber(animatedValue("left")), unit)}
                {" left"}
              </span>
            </>
          )}
        </span>
        <button
          ref={actionRef}
          type="button"
          className={`${prefix}__action`}
          data-strong={needsAttention || undefined}
          onClick={() => onUpgrade?.(state)}
        >
          <span ref={actionInnerRef} className={`${prefix}__action-inner`}>
            <span
              className={`${prefix}__action-text`}
              children={needsAttention ? topUpLabel : upgradeLabel}
              key={needsAttention ? "top-up" : "upgrade"}
            />
          </span>
        </button>
      </div>
      <span className={`${prefix}__live`} aria-live="polite">
        {announcement}
      </span>
    </section>
  );
}
const resetDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});
const fullDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
export { UsageMeter };
export type { UsageMeterProps };
export type { UsageCategory };
export type { UsageLimit };
export type { UsagePeriod };
export type { DailyUsage };
