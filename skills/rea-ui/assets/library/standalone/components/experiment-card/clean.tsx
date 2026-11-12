"use client";

import "./ExperimentCard.clean.css";
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
  type PointerEvent,
  type SVGProps,
  Fragment,
  type CSSProperties,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ExperimentVariant = {
  id?: string;
  key?: string;
  name?: string;
  control?: boolean;
  visitors?: number;
  values?: {
    conversion?: number;
    revenue?: number;
    bounce?: number;
    [field: string]: unknown;
  };
  confidence?: {
    conversion?: number;
    revenue?: number;
    bounce?: number;
    [field: string]: unknown;
  };
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ExperimentMetric = {
  id?: string;
  label?: string;
  format?: string | ((value: number) => string);
  lowerIsBetter?: boolean;
  [field: string]: unknown;
};
type ExperimentTone = "red" | "amber" | "green" | "blue" | "violet" | "gray";
interface ExperimentCardProps {
  title?: string;
  variants: ExperimentVariant[];
  metrics: ExperimentMetric[];
  metric?: string;
  defaultMetric?: string;
  onMetricChange?: (id: string) => void;
  winner?: string | null;
  defaultWinner?: string | null;
  onWinnerChange?: (id: string | null) => void;
  status?: {
    label: string;
    tone?: ExperimentTone;
  };
  note?: string;
  action?: {
    label: string | ((variant: ExperimentVariant) => string);
    onClick: (variant: ExperimentVariant) => void;
  };
  hint?: ReactNode;
  trigger?: "hover" | "click";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
interface Variant {
  source: ExperimentVariant;
  id: string;
  key: string | undefined;
  name: string | undefined;
  control: boolean | undefined;
  visitors: number | undefined;
  values: Record<string, unknown>;
  confidence: Record<string, unknown>;
  color: string | undefined;
}
interface Metric {
  id: string;
  label: string | undefined;
  format: (value: number) => string;
  lowerIsBetter: boolean;
}
type ChartStyle = CSSProperties & Record<`--${string}`, string | number>;
function ExperimentCard(props: ExperimentCardProps) {
  return <ExperimentCardView {...props} clean />;
}
function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
function normalizeVariant(source: ExperimentVariant): Variant {
  return {
    source,
    id: source.id ?? "",
    key: source.key,
    name: source.name,
    control: source.control,
    visitors: source.visitors,
    values: source.values ?? {},
    confidence: source.confidence ?? {},
    color: typeof source.color === "string" ? source.color : undefined,
  };
}
function normalizeMetric(metric: ExperimentMetric): Metric {
  return {
    id: metric.id ?? "",
    label: metric.label,
    format: typeof metric.format === "function" ? metric.format : valueFormatter.format,
    lowerIsBetter: !!metric.lowerIsBetter,
  };
}
function formatLift(percent: number): string {
  const rounded = Math.round(percent * 10) / 10;
  return `${rounded >= 0 ? "+" : "−"}${percentFormatter.format(Math.abs(rounded))}%`;
}
/** Interpolate values when the chosen metric changes; newly added variants start at their value. */
function useAnimatedValues(target: Record<string, number>, duration: number) {
  const [displayed, setDisplayed] = useState(target);
  const current = useRef(target);
  const targetKey = JSON.stringify(target);
  useEffect(() => {
    const next: Record<string, number> = JSON.parse(targetKey);
    const previous = { ...current.current };
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      Object.keys(next).every((id) => previous[id] === next[id])
    ) {
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
function useExperiment(props: ExperimentCardProps, prefix: string) {
  const {
    metric,
    defaultMetric,
    onMetricChange,
    winner,
    defaultWinner = null,
    onWinnerChange,
    hint,
    action,
    trigger = "hover",
    open,
    defaultOpen = false,
    onOpenChange,
  } = props;
  const variants = props.variants.map(normalizeVariant);
  const metrics = props.metrics.map(normalizeMetric);
  const componentId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const expanded = open ?? internalOpen;
  const [internalMetric, setInternalMetric] = useState(defaultMetric ?? metrics[0]?.id);
  const selectedMetric =
    metrics.find((option) => option.id === (metric ?? internalMetric)) ?? metrics[0];
  const [internalWinner, setInternalWinner] = useState(defaultWinner);
  const winnerId = winner === undefined ? internalWinner : winner;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const formatValue = selectedMetric?.format ?? valueFormatter.format;
  const metricId = selectedMetric?.id ?? "";
  const hasValue = (variant: Variant) => isFiniteNumber(variant.values[metricId]);
  const variantValue = (variant: Variant): number => {
    const value = variant.values[metricId];
    return isFiniteNumber(value) ? value : 0;
  };
  const control = variants.find((variant) => variant.control) ?? variants[0];
  const baseline = control && hasValue(control) ? variantValue(control) : 0;
  const rawLift = (variant: Variant): number | null =>
    hasValue(variant) && baseline
      ? ((variantValue(variant) - baseline) / Math.abs(baseline)) * 100
      : null;
  const performanceLift = (variant: Variant): number | null => {
    const lift = rawLift(variant);
    return lift === null ? null : lift * (selectedMetric?.lowerIsBetter ? -1 : 1);
  };
  const best = variants.reduce<Variant | undefined>(
    (best, variant) =>
      !best ||
      (performanceLift(variant) ?? -Infinity) > (performanceLift(best) ?? -Infinity)
        ? variant
        : best,
    undefined,
  );
  const values = variants.filter(hasValue).map(variantValue);
  const maximum = Math.max(...values, 0.0001);
  const minimum = values.length ? Math.min(...values) : 0;
  const columnHeight = (variant: Variant) =>
    hasValue(variant)
      ? maximum > minimum
        ? 0.38 + 0.62 * ((variantValue(variant) - minimum) / (maximum - minimum))
        : 0.7
      : 0.1;
  const variantColor = (variant: Variant) =>
    variant.color ??
    (variant === control
      ? `var(--${prefix}-c0)`
      : `var(--${prefix}-c${(variants.filter((option) => option !== control).indexOf(variant) % 4) + 1})`);
  const animatedValues = useAnimatedValues(
    Object.fromEntries(variants.map((variant) => [variant.id, variantValue(variant)])),
    620,
  );
  const openTimer = useRef(0);
  function setExpanded(next: boolean) {
    window.clearTimeout(openTimer.current);
    if (next === expanded) return;
    if (!next) setHoveredId(null);
    setInternalOpen(next);
    onOpenChange?.(next);
  }
  function scheduleExpanded(next: boolean, delay: number) {
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setExpanded(next), delay);
  }
  useEffect(() => () => window.clearTimeout(openTimer.current), []);
  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (trigger === "hover" && event.pointerType === "mouse") scheduleExpanded(true, 90);
  }
  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    if (trigger === "hover" && event.pointerType === "mouse")
      scheduleExpanded(false, 220);
  }
  useEffect(() => {
    if (!expanded) return;
    function closeOutside(event: globalThis.PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node | null)) setExpanded(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  });
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && expanded) {
      event.stopPropagation();
      setExpanded(false);
      rootRef.current
        ?.querySelector<HTMLButtonElement>(`.${prefix}__toggle`)
        ?.focus({ preventScroll: true });
    }
  }
  const switchRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{
    left: number;
    width: number;
  } | null>(null);
  useLayoutEffect(() => {
    const group = switchRef.current;
    const selected = group?.querySelector<HTMLButtonElement>('[aria-checked="true"]');
    if (!group || !selected) return;
    setThumb({ left: selected.offsetLeft, width: selected.offsetWidth });
    if (selected.offsetLeft < group.scrollLeft) group.scrollLeft = selected.offsetLeft;
    else if (
      selected.offsetLeft + selected.offsetWidth >
      group.scrollLeft + group.clientWidth
    )
      group.scrollLeft = selected.offsetLeft + selected.offsetWidth - group.clientWidth;
  }, [selectedMetric?.id, metrics.length, expanded]);
  function selectMetric(id: string) {
    setInternalMetric(id);
    onMetricChange?.(id);
  }
  function handleMetricKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = metrics.findIndex((metric) => metric.id === selectedMetric?.id);
    const next =
      event.key === "ArrowRight"
        ? current + 1
        : event.key === "ArrowLeft"
          ? current - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? metrics.length - 1
              : null;
    if (next === null || !metrics.length) return;
    event.preventDefault();
    selectMetric(metrics[(next + metrics.length) % metrics.length].id);
    requestAnimationFrame(() =>
      switchRef.current
        ?.querySelector<HTMLButtonElement>('[aria-checked="true"]')
        ?.focus(),
    );
  }
  function selectWinner(id: string) {
    const next = winnerId === id ? null : id;
    setInternalWinner(next);
    onWinnerChange?.(next);
  }
  const leader =
    best && best !== control && (performanceLift(best) ?? 0) > 0 ? best : null;
  const leaderLift = leader ? (rawLift(leader) ?? 0) : 0;
  const picked = variants.find((variant) => variant.id === winnerId) ?? null;
  const hovered = variants.find((variant) => variant.id === hoveredId) ?? null;
  let caption: ReactNode = hint ?? (picked ? null : "Pick a winner");
  let captionKey = "rest";
  if (hovered) {
    const confidence = hovered.confidence[metricId];
    caption = (
      <>
        <b>{hovered.key}</b>
        {isFiniteNumber(hovered.visitors) && (
          <>
            {" "}
            {"· "}
            {integerFormatter.format(hovered.visitors)}{" "}
            {hovered.visitors === 1 ? "visitor" : "visitors"}
          </>
        )}
        {hovered === control ? (
          <>{" · baseline"}</>
        ) : (
          isFiniteNumber(confidence) && (
            <>
              {" · "}
              {integerFormatter.format(confidence)}
              {"% confidence"}
            </>
          )
        )}
      </>
    );
    captionKey = `hot-${hovered.id}-${selectedMetric?.id}`;
  } else if (picked) {
    caption = (
      <>
        <b>{picked.name}</b>
        {" picked"}
      </>
    );
    captionKey = `picked-${picked.id}`;
  }
  const actionLabel =
    picked && action
      ? typeof action.label === "function"
        ? action.label(picked.source)
        : action.label
      : null;
  return {
    componentId,
    variants,
    metrics,
    expanded,
    selectedMetric,
    winnerId,
    hoveredId,
    setHoveredId,
    rootRef,
    formatValue,
    hasValue,
    variantValue,
    control,
    rawLift,
    performanceLift,
    maximum,
    columnHeight,
    variantColor,
    animatedValues,
    setExpanded,
    handlePointerEnter,
    handlePointerLeave,
    handleKeyDown,
    switchRef,
    thumb,
    selectMetric,
    handleMetricKeyDown,
    selectWinner,
    leader,
    leaderLift,
    picked,
    caption,
    captionKey,
    actionLabel,
  };
}
function ExperimentCardView(
  props: ExperimentCardProps & {
    clean: boolean;
  },
) {
  const { title, status, note, action, className, clean } = props;
  const prefix = clean ? "ui-xcc" : "ui-xc";
  const CheckIcon = clean ? CheckIcon_clean_icons : CheckIcon_default_icons;
  const ActionIcon = clean ? ActionIcon_clean_icons : ActionIcon_default_icons;
  const TrendIcon = clean ? TrendIcon_clean_icons : TrendIcon_default_icons;
  const StatusIcon = clean ? StatusIcon_clean_icons : StatusIcon_default_icons;
  const {
    variants,
    metrics,
    componentId,
    expanded,
    rootRef,
    handlePointerEnter,
    handlePointerLeave,
    handleKeyDown,
    setExpanded,
    leader,
    leaderLift,
    hoveredId,
    setHoveredId,
    winnerId,
    variantColor,
    columnHeight,
    selectWinner,
    control,
    hasValue,
    formatValue,
    variantValue,
    animatedValues,
    maximum,
    switchRef,
    handleMetricKeyDown,
    thumb,
    selectedMetric,
    selectMetric,
    performanceLift,
    rawLift,
    picked,
    caption,
    captionKey,
    actionLabel,
  } = useExperiment(props, prefix);
  const footer = (
    <div className={`${prefix}__fold`} inert={!expanded}>
      <div className={`${prefix}__clip`}>
        <div className={`${prefix}__foot`}>
          <span className={`${prefix}__caption`} aria-live="polite">
            <span children={caption} key={captionKey} />
          </span>
          {picked && action && (
            <button
              type="button"
              className={`${prefix}__action`}
              title={actionLabel ?? undefined}
              onClick={() => action.onClick(picked.source)}
              key={picked.id}
            >
              <span className={`${prefix}__action-text`}>{actionLabel}</span>
              <ActionIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-open={expanded ? "" : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
    >
      <div className={`${prefix}__card`}>
        <div className={`${prefix}__head`}>
          <button
            type="button"
            className={`${prefix}__toggle`}
            aria-expanded={expanded}
            aria-controls={`${componentId}-body`}
            aria-label={`${title}${status ? `, ${status.label}` : ""}${leader ? `, ${leader.name} is ahead by ${percentFormatter.format(Math.abs(leaderLift))} percent` : ""}`}
            onClick={() => setExpanded(!expanded)}
          />
          <span
            className={`${prefix}__chart`}
            aria-hidden="true"
            data-many={variants.length > 5 ? "" : undefined}
            onPointerLeave={() => setHoveredId(null)}
          >
            {variants.map((variant) => (
              <span
                className={`${prefix}__col`}
                data-hot={hoveredId === variant.id ? "" : undefined}
                data-dim={hoveredId && hoveredId !== variant.id ? "" : undefined}
                data-picked={winnerId === variant.id ? "" : undefined}
                data-passed={winnerId && winnerId !== variant.id ? "" : undefined}
                style={
                  {
                    [`--${prefix}-color`]: variantColor(variant),
                    [`--${prefix}-size`]: columnHeight(variant),
                  } as ChartStyle
                }
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setHoveredId(variant.id);
                }}
                onClick={() => selectWinner(variant.id)}
                key={variant.id}
              />
            ))}
          </span>
          <span className={`${prefix}__titles`}>
            <span className={`${prefix}__name`} dir="auto" title={title}>
              {title}
            </span>
            <span className={`${prefix}__sub`}>
              {status && (
                <span
                  className={`${prefix}__tag`}
                  data-tone={status.tone ?? "gray"}
                  title={status.label}
                >
                  <StatusIcon />
                  <span className={`${prefix}__tag-text`}>{status.label}</span>
                </span>
              )}
              {note && (
                <span className={`${prefix}__note`} dir="auto" title={note}>
                  {note}
                </span>
              )}
            </span>
          </span>
          {leader ? (
            <span
              className={`${prefix}__lead`}
              data-tone="green"
              key={`${leader.id}-${selectedMetric?.id}`}
            >
              <b>{leader.key}</b>
              <TrendIcon down={leaderLift < 0} />
              {formatLift(leaderLift)}
            </span>
          ) : (
            <span
              className={`${prefix}__lead`}
              data-tone="gray"
              children="No lift yet"
              key={`none-${selectedMetric?.id}`}
            />
          )}
        </div>
        <div id={`${componentId}-body`} className={`${prefix}__fold`} inert={!expanded}>
          <div className={`${prefix}__clip`}>
            <div className={`${prefix}__body`}>
              {metrics.length > 1 && (
                <div
                  ref={switchRef}
                  className={`${prefix}__switch`}
                  role="radiogroup"
                  aria-label="Metric"
                  onKeyDown={handleMetricKeyDown}
                >
                  {thumb && (
                    <span
                      className={`${prefix}__thumb`}
                      style={{
                        transform: `translateX(${thumb.left}px)`,
                        width: thumb.width,
                      }}
                    />
                  )}
                  {metrics.map((metricOption) => (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={metricOption.id === selectedMetric?.id}
                      tabIndex={metricOption.id === selectedMetric?.id ? 0 : -1}
                      className={`${prefix}__metric`}
                      onClick={() => selectMetric(metricOption.id)}
                      children={metricOption.label}
                      key={metricOption.id}
                    />
                  ))}
                </div>
              )}
              <div
                className={`${prefix}__rows`}
                role="radiogroup"
                aria-label="Winner"
                onPointerLeave={() => setHoveredId(null)}
              >
                {variants.map((variant) => {
                  let lift = performanceLift(variant),
                    delta = rawLift(variant),
                    isControl = variant === control;
                  return (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={winnerId === variant.id}
                      aria-label={`${variant.name}: ${hasValue(variant) ? formatValue(variantValue(variant)) : "no value"}${isControl ? ", baseline" : delta === null ? "" : `, ${delta >= 0 ? "up" : "down"} ${percentFormatter.format(Math.abs(delta))} percent`}`}
                      className={`${prefix}__row`}
                      data-hot={hoveredId === variant.id ? "" : undefined}
                      data-dim={hoveredId && hoveredId !== variant.id ? "" : undefined}
                      style={
                        {
                          [`--${prefix}-color`]: variantColor(variant),
                        } as ChartStyle
                      }
                      onPointerEnter={(event) => {
                        if (event.pointerType === "mouse") setHoveredId(variant.id);
                      }}
                      onFocus={() => setHoveredId(variant.id)}
                      onBlur={() => setHoveredId(null)}
                      onClick={() => selectWinner(variant.id)}
                      key={variant.id}
                    >
                      <span className={`${prefix}__badge`}>
                        <span title={variant.key}>{variant.key}</span>
                        <CheckIcon />
                      </span>
                      <span
                        className={`${prefix}__label`}
                        dir="auto"
                        title={variant.name}
                      >
                        {variant.name}
                      </span>
                      <span className={`${prefix}__value`}>
                        {hasValue(variant)
                          ? formatValue(
                              animatedValues[variant.id] ?? variantValue(variant),
                            )
                          : "—"}
                      </span>
                      {isControl ? (
                        <span className={`${prefix}__lift`} data-tone="gray">
                          {"Base"}
                        </span>
                      ) : (
                        <span
                          className={`${prefix}__lift`}
                          data-tone={
                            lift === null
                              ? "gray"
                              : lift > 0.05
                                ? "green"
                                : lift < -0.05
                                  ? "red"
                                  : "gray"
                          }
                        >
                          {delta === null ? "—" : formatLift(delta)}
                        </span>
                      )}
                      <span className={`${prefix}__track`}>
                        <span
                          className={`${prefix}__bar`}
                          style={{
                            transform: `scaleX(${hasValue(variant) ? Math.max(0.02, variantValue(variant) / maximum) : 0.02})`,
                          }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {clean && footer}
      </div>
      {!clean && footer}
    </div>
  );
}
const valueFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});
const integerFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});
const percentFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} satisfies SVGProps<SVGElement>;
const CheckIcon_default_icons = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="m2.2 5.2 1.9 1.9 3.7-4.1" {...strokeProps} strokeWidth={1.7} />
  </svg>
);
const ActionIcon_default_icons = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 6h7M6.5 3l3 3-3 3" {...strokeProps} strokeWidth={1.4} />
  </svg>
);
const TrendIcon_default_icons = ({ down }: { down: boolean }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    aria-hidden="true"
    style={
      down
        ? {
            transform: "scaleY(-1)",
          }
        : undefined
    }
  >
    <path
      d="M1.5 7 4 4.5l1.6 1.6L8.5 3M6.2 3h2.3v2.3"
      {...strokeProps}
      strokeWidth={1.4}
    />
  </svg>
);
const StatusIcon_default_icons = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.25" {...strokeProps} />
    <circle cx="6" cy="6" r="1.5" fill="currentColor" />
  </svg>
);
const strokeProps_clean_icons = {
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} satisfies SVGProps<SVGElement>;
const CheckIcon_clean_icons = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="m3 6.2 2 2 4-4.4" {...strokeProps_clean_icons} strokeWidth={1.5} />
  </svg>
);
const ActionIcon_clean_icons = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
      {...strokeProps_clean_icons}
      strokeWidth={1.2}
    />
  </svg>
);
const TrendIcon_clean_icons = ({ down }: { down: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    style={
      down
        ? {
            transform: "scaleY(-1)",
          }
        : undefined
    }
  >
    <path
      d="M1.5 8.5 4.5 5.5l2 2 4-4M8 3.5h2.5V6"
      {...strokeProps_clean_icons}
      strokeWidth={1.2}
    />
  </svg>
);
const StatusIcon_clean_icons = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <circle cx="5" cy="5" r="4.5" fill="currentColor" opacity="0.22" />
    <circle cx="5" cy="5" r="2.25" fill="currentColor" />
  </svg>
);
export { ExperimentCard };
export type { ExperimentCardProps };
export type { ExperimentVariant };
export type { ExperimentMetric };
export type { ExperimentTone };
