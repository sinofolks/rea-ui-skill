"use client";

import "./KpiChart.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  Fragment,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
/** A named line in the chart. Null values leave gaps in the line. */
interface KpiSeries {
  id?: string;
  name?: string;
  label?: string;
  color?: string;
  values?: (number | null | undefined)[];
  [field: string]: unknown;
}
interface KpiChartProps {
  title?: string;
  value?: string;
  delta?: number;
  labels?: string[];
  tooltipLabels?: string[];
  series?: KpiSeries[];
  format?: (value: number) => string;
  footer?: string;
  defaultIndex?: number;
  emptyText?: string;
  className?: string;
}
type TooltipStyle = CSSProperties & {
  "--ui-kpi-nudge"?: string;
  "--ui-kpic-nudge"?: string;
};
function KpiChart(props: KpiChartProps) {
  return <KpiChartView {...props} clean />;
}
/** Invalid samples create a gap, rather than an invalid SVG coordinate. */
function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
/** Detect whether a formatter expects percentages as fractions or whole numbers. */
function getPercentageScale(format: (value: number) => string): number {
  try {
    const one = String(format(1));
    if (!/%\s*$/.test(one) || !/%\s*$/.test(String(format(50)))) return 0;
    return Math.abs(parseFloat(one.replace(/[^\d.]/g, "")) - 100) < 1e-6 ? 1 : 100;
  } catch {
    return 0;
  }
}
function formatCompactNumber(value: number): string {
  const magnitude = Math.abs(value);
  if (magnitude >= 1e9) return `${+(value / 1e9).toFixed(magnitude >= 1e10 ? 0 : 1)}B`;
  if (magnitude >= 1e6) return `${+(value / 1e6).toFixed(magnitude >= 1e7 ? 0 : 1)}M`;
  if (magnitude >= 1e3) return `${+(value / 1e3).toFixed(magnitude >= 1e4 ? 0 : 1)}k`;
  if (magnitude > 0 && magnitude < 1) return `${+value.toPrecision(2)}`;
  return `${Math.round(value)}`;
}
/** Round an axis limit to a readable two-interval scale. */
function getAxisLimit(value: number): number {
  const validValue = isFiniteNumber(value) && value >= 0 ? value : 0;
  const halfRange = validValue / 2 || 1;
  const magnitude = 10 ** Math.floor(Math.log10(halfRange));
  const step =
    [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(
      (candidate) => candidate * magnitude >= halfRange,
    ) ?? 10;
  return step * magnitude * 2;
}
function KpiChartView({
  title,
  value,
  delta,
  labels = [],
  tooltipLabels,
  series = [],
  format = formatCompactNumber,
  footer,
  defaultIndex,
  emptyText = "No data yet",
  className,
  clean = false,
}: KpiChartProps & {
  clean?: boolean;
}) {
  const prefix = clean ? "ui-kpic" : "ui-kpi";
  const labelCount = labels.length;
  const clampIndex = (index: number | null | undefined): number | null => {
    if (!isFiniteNumber(index) || labelCount === 0) return null;
    return Math.min(labelCount - 1, Math.max(0, Math.round(index)));
  };
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sampleValues = useMemo(
    () =>
      series.map((line) =>
        (line.values ?? [])
          .slice(0, labelCount)
          .map((sample) => (isFiniteNumber(sample) ? sample : null)),
      ),
    [series, labelCount],
  );
  const finiteValues = sampleValues.flat().filter(isFiniteNumber);
  const percentageScale = getPercentageScale(format);
  const empty =
    finiteValues.length === 0 ||
    (!percentageScale && finiteValues.every((sample) => sample === 0));
  const activeIndex = empty ? null : (hoveredIndex ?? clampIndex(defaultIndex));
  // Keep the last coordinates while the tooltip fades out.
  const [lastActiveIndex, setLastActiveIndex] = useState(activeIndex ?? 0);
  if (activeIndex !== null && activeIndex !== lastActiveIndex)
    setLastActiveIndex(activeIndex);
  const markerIndex = Math.min(lastActiveIndex, Math.max(0, labelCount - 1));
  const maximumValue = Math.max(0, ...finiteValues);
  const maximum = percentageScale
    ? maximumValue === 0
      ? percentageScale
      : getAxisLimit(Math.max(maximumValue, percentageScale / 10))
    : getAxisLimit(maximumValue);
  const minimumValue = Math.min(0, ...finiteValues);
  const minimum = minimumValue < 0 ? -getAxisLimit(-minimumValue) : 0;
  const xPosition = (index: number) =>
    labelCount > 1 ? (index / (labelCount - 1)) * 100 : 50;
  const yPosition = (sample: number) => ((maximum - sample) / (maximum - minimum)) * 100;
  const paths = useMemo(
    () =>
      sampleValues.map((samples) => {
        let path = "";
        samples.forEach((sample, index) => {
          if (sample !== null)
            path += `${path && samples[index - 1] !== null ? "L" : "M"}${xPosition(index)},${yPosition(sample)}`;
        });
        return path;
      }),
    [sampleValues, maximum, minimum, labelCount],
  );
  const isolatedPoints = sampleValues.flatMap((samples, seriesIndex) =>
    samples.flatMap((sample, index) =>
      sample !== null &&
      (samples[index - 1] ?? null) === null &&
      (samples[index + 1] ?? null) === null
        ? [{ seriesIndex, index, value: sample }]
        : [],
    ),
  );
  const indexAtPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const fraction = Math.min(
      1,
      Math.max(0, (event.clientX - bounds.left) / bounds.width),
    );
    return clampIndex(fraction * (labelCount - 1));
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (labelCount === 0 || empty) return;
    const currentIndex = activeIndex ?? (event.key === "ArrowLeft" ? labelCount : -1);
    if (event.key === "ArrowRight")
      setHoveredIndex(Math.min(labelCount - 1, currentIndex + 1));
    else if (event.key === "ArrowLeft") setHoveredIndex(Math.max(0, currentIndex - 1));
    else if (event.key === "Escape") setHoveredIndex(null);
    else return;
    event.preventDefault();
  };
  const tooltipRows = series
    .map((line, index) => ({
      ...line,
      key: index,
      value: sampleValues[index][markerIndex] ?? null,
    }))
    .sort((left, right) => (right.value ?? -Infinity) - (left.value ?? -Infinity));
  const tooltipOnLeft = xPosition(markerIndex) > 50;
  const rootRef = useRef<HTMLElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipOffset, setTooltipOffset] = useState(0);
  useLayoutEffect(() => {
    const root = rootRef.current;
    const plot = plotRef.current;
    const tooltip = tooltipRef.current;
    if (!root || !plot || !tooltip) return;
    const rootBounds = root.getBoundingClientRect();
    const plotBounds = plot.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const markerLeft =
      plotBounds.left + (xPosition(markerIndex) / 100) * plotBounds.width;
    const desiredLeft = tooltipOnLeft ? markerLeft - 14 - tooltipWidth : markerLeft + 14;
    const leftLimit = rootBounds.left + 8;
    const rightLimit = rootBounds.right - 8 - tooltipWidth;
    setTooltipOffset(
      Math.round(
        desiredLeft < leftLimit
          ? leftLimit - desiredLeft
          : desiredLeft > rightLimit
            ? Math.max(leftLimit, rightLimit) - desiredLeft
            : 0,
      ),
    );
  });
  const axisIndices = [0, Math.round(labelCount / 2 - 0.5), labelCount - 1].filter(
    (index, position, indices) => indices.indexOf(index) === position,
  );
  const tooltipStyle: TooltipStyle = {
    left: `${xPosition(markerIndex)}%`,
    [clean ? "--ui-kpic-nudge" : "--ui-kpi-nudge"]: `${tooltipOffset}px`,
  };
  const body = (
    <>
      <h3 className={`${prefix}__title`} title={title} dir="auto">
        {title}
      </h3>
      <p className={`${prefix}__value`}>
        <span className={`${prefix}__amount`}>{value}</span>
        {isFiniteNumber(delta) && delta !== 0 && (
          <span className={`${prefix}__delta`} data-trend={delta > 0 ? "up" : "down"}>
            {delta > 0 ? "+" : "−"}
            {format(Math.abs(delta))}
          </span>
        )}
      </p>
      <div className={`${prefix}__chart`}>
        <div className={`${prefix}__yaxis`} aria-hidden="true">
          {!empty && (
            <>
              <span>{format(maximum)}</span>
              <span>{format((maximum + minimum) / 2)}</span>
              <span>{format(minimum)}</span>
            </>
          )}
        </div>
        <div
          className={`${prefix}__plot`}
          tabIndex={empty ? undefined : 0}
          role="group"
          aria-label={
            empty
              ? `${title} chart – ${emptyText}`
              : `${title} chart – use the arrow keys to read the values per day`
          }
          data-empty={empty || undefined}
          ref={plotRef}
          onPointerMove={(event) => setHoveredIndex(indexAtPointer(event))}
          onPointerDown={(event) => setHoveredIndex(indexAtPointer(event))}
          onPointerLeave={() => setHoveredIndex(null)}
          onBlur={() => setHoveredIndex(null)}
          onKeyDown={handleKeyDown}
        >
          <span className={`${prefix}__grid`} style={{ top: "0%" }} />
          <span className={`${prefix}__grid`} style={{ top: "50%" }} />
          <span className={`${prefix}__grid`} style={{ top: "100%" }} />
          {empty && (
            <p className={`${prefix}__empty`} title={emptyText}>
              {emptyText}
            </p>
          )}
          <svg
            className={`${prefix}__lines`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {series.map((line, index) => (
              <path
                d={paths[index]}
                stroke={line.color}
                vectorEffect="non-scaling-stroke"
                key={index}
              />
            ))}
          </svg>
          {isolatedPoints.map((point) => (
            <span
              className={`${prefix}__point`}
              style={{
                left: `${xPosition(point.index)}%`,
                top: `${yPosition(point.value)}%`,
                background: series[point.seriesIndex].color,
              }}
              aria-hidden="true"
              key={`${point.seriesIndex}-${point.index}`}
            />
          ))}
          <div
            className={`${prefix}__marker`}
            data-open={activeIndex !== null || undefined}
            aria-hidden="true"
          >
            <span
              className={`${prefix}__guide`}
              style={{ left: `${xPosition(markerIndex)}%` }}
            />
            {series.map((line, index) =>
              sampleValues[index][markerIndex] === null ? null : (
                <span
                  className={`${prefix}__dot`}
                  style={{
                    left: `${xPosition(markerIndex)}%`,
                    top: `${yPosition(sampleValues[index][markerIndex] ?? 0)}%`,
                    background: line.color,
                  }}
                  key={index}
                />
              ),
            )}
          </div>
          <div
            className={`${prefix}__tooltip`}
            data-open={activeIndex !== null || undefined}
            data-side={tooltipOnLeft ? "left" : "right"}
            ref={tooltipRef}
            style={tooltipStyle}
            role="status"
            aria-live="polite"
          >
            <p className={`${prefix}__date`}>{(tooltipLabels ?? labels)[markerIndex]}</p>
            <ul>
              {tooltipRows.map((line) => (
                <li key={line.key}>
                  <span
                    className={`${prefix}__swatch`}
                    style={{ background: line.color }}
                  />
                  <span className={`${prefix}__label`} dir="auto">
                    {line.label}
                  </span>
                  <span className={`${prefix}__num`}>
                    {line.value === null ? "—" : format(line.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${prefix}__xaxis`} aria-hidden="true">
          {axisIndices.map((index) => (
            <span
              style={{ left: `${xPosition(index)}%` }}
              data-edge={
                index === 0 ? "start" : index === labelCount - 1 ? "end" : undefined
              }
              key={index}
            >
              {labels[index]}
            </span>
          ))}
        </div>
      </div>
    </>
  );
  return (
    <Fragment>
      <section className={[prefix, className].filter(Boolean).join(" ")} ref={rootRef}>
        {clean ? <div className={`${prefix}__body`}>{body}</div> : body}
        {footer && (
          <p className={`${prefix}__footer`} dir="auto">
            {footer}
          </p>
        )}
      </section>
    </Fragment>
  );
}
export { KpiChart };
export type { KpiChartProps };
export type { KpiSeries };
