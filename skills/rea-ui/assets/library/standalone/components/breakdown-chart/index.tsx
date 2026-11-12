"use client";

import "./BreakdownChart.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type KeyboardEvent,
} from "react";
interface BreakdownRecord {
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
}
interface Dimension {
  key?: string;
  label?: string;
  values?: string[];
  icons?: Record<string, ReactNode>;
  colors?: Record<string, string>;
  [field: string]: unknown;
}
interface Measure {
  key?: string;
  label?: string;
  unit?: string;
  field?: string;
  [field: string]: unknown;
}
interface BreakdownChartProps {
  records: BreakdownRecord[];
  dimensions: Dimension[];
  measures: Measure[];
  title?: string;
  defaultMeasure?: string;
  defaultSlice?: string;
  defaultSegment?: string;
  className?: string;
}
interface ChartDimension extends Dimension {
  key: string;
  label: string;
  values: string[];
}
interface ChartMeasure extends Measure {
  key: string;
  label: string;
}
interface ChartRow {
  value: string;
  cells: Record<string, number>;
  total: number;
}
interface ChartSelectProps {
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
  clean: boolean;
}
interface BreakdownViewProps extends BreakdownChartProps {
  clean?: boolean;
}
function BreakdownChart(props: BreakdownChartProps) {
  return <BreakdownView {...props} clean={false} />;
}
function axisMaximum(value: number): number {
  if (value <= 0) return 5;
  const approximateStep = value / 5;
  const magnitude = 10 ** Math.floor(Math.log10(approximateStep));
  const step =
    [1, 2, 2.5, 5, 10].find((candidate) => candidate * magnitude >= approximateStep) ??
    10;
  return step * magnitude * 5;
}
function aggregateRows(
  records: BreakdownRecord[],
  slice: ChartDimension | undefined,
  segment: ChartDimension | null,
  measure: ChartMeasure | undefined,
  segments: string[],
  hidden: Set<string>,
): ChartRow[] {
  if (!slice || !measure) return [];
  return slice.values.map((value) => {
    const cells: Record<string, number> = Object.fromEntries(
      segments.map((segment) => [segment, 0]),
    );
    for (const record of records) {
      if (String(record[slice.key]) !== value) continue;
      const segmentValue = segment ? String(record[segment.key]) : "All";
      if (!Object.hasOwn(cells, segmentValue)) continue;
      const amount = measure.field ? Number(record[measure.field]) : 1;
      cells[segmentValue] += Number.isFinite(amount) ? amount : 0;
    }
    return {
      value,
      cells,
      total: segments.reduce(
        (total, segmentValue) =>
          total + (hidden.has(segmentValue) ? 0 : cells[segmentValue]!),
        0,
      ),
    };
  });
}
function useBreakdown(
  {
    records,
    dimensions,
    measures,
    defaultMeasure,
    defaultSlice,
    defaultSegment,
  }: BreakdownChartProps,
  clean: boolean,
) {
  const [measureKey, setMeasureKey] = useState(defaultMeasure ?? measures[0]?.key ?? "");
  const [sliceKey, setSliceKey] = useState(defaultSlice ?? dimensions[0]?.key ?? "");
  const [segmentKey, setSegmentKey] = useState(
    defaultSegment ?? dimensions[1]?.key ?? "none",
  );
  const [hiddenSegments, setHiddenSegments] = useState(new Set<string>());
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const normalizedDimensions = useMemo<ChartDimension[]>(
    () =>
      dimensions.map((dimension) => ({
        ...dimension,
        key: dimension.key ?? "",
        label: dimension.label ?? "",
        values: dimension.values ?? [],
      })),
    [dimensions],
  );
  const normalizedMeasures = useMemo<ChartMeasure[]>(
    () =>
      measures.map((measure) => ({
        ...measure,
        key: measure.key ?? "",
        label: measure.label ?? "",
      })),
    [measures],
  );
  const measure =
    normalizedMeasures.find((candidate) => candidate.key === measureKey) ??
    normalizedMeasures[0];
  const slice =
    normalizedDimensions.find((candidate) => candidate.key === sliceKey) ??
    normalizedDimensions[0];
  const segment =
    segmentKey === "none"
      ? null
      : (normalizedDimensions.find(
          (candidate) => candidate.key === segmentKey && candidate.key !== slice?.key,
        ) ?? null);
  const segments = segment ? segment.values : ["All"];
  const palette = clean ? CLEAN_COLORS : DEFAULT_COLORS;
  const segmentColor = (value: string, index: number) =>
    segment?.colors?.[value] ?? palette[segment ? index % palette.length : 0]!;
  useEffect(() => setHiddenSegments(new Set()), [segmentKey]);
  const rows = useMemo(
    () => aggregateRows(records, slice, segment, measure, segments, hiddenSegments),
    [records, slice, segment, measure, segments, hiddenSegments],
  );
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  const maximum = axisMaximum(Math.max(0, ...rows.map((row) => row.total)));
  const ticks = [5, 4, 3, 2, 1, 0].map((index) => (maximum / 5) * index);
  const activeRow = rows.find((row) => row.value === activeValue) ?? null;
  const activeIndex = activeRow ? rows.indexOf(activeRow) : -1;
  useLayoutEffect(() => {
    const wrapper = morphRef.current;
    const table = tableRef.current;
    if (!wrapper || !table) return;
    const updateHeight = () => {
      wrapper.style.height = `${table.offsetHeight}px`;
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(table);
    const frame = requestAnimationFrame(() => wrapper.setAttribute("data-smooth", ""));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  useLayoutEffect(() => {
    const plot = plotRef.current;
    if (!plot || activeIndex < 0) return;
    const container = clean
      ? plot.closest("section")
      : (plot.closest(".ui-bc__card") ?? plot.closest("section"));
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const plotRect = plot.getBoundingClientRect();
    const barCenter = ((activeIndex + 0.5) / rows.length) * plotRect.width;
    const tooltip = tooltipRef.current;
    if (tooltip) {
      const width = tooltip.offsetWidth;
      const gap = clean ? 18 : 22;
      const left =
        (activeIndex + 0.5) / rows.length > 0.5
          ? barCenter - gap - width
          : barCenter + gap;
      tooltip.style.left = `${Math.max(containerRect.left - plotRect.left + 4, Math.min(left, containerRect.right - plotRect.left - 4 - width))}px`;
    }
    const prefix = clean ? "ui-bcc" : "ui-bc";
    const label = plot.parentElement?.querySelector<HTMLElement>(
      `.${prefix}__xlabel[data-active] .${prefix}__pill`,
    );
    if (label) {
      const halfWidth = label.offsetWidth / 2;
      const screenCenter = plotRect.left + barCenter;
      label.style.marginLeft = `${Math.max(containerRect.left + 4 + halfWidth - screenCenter, Math.min(0, containerRect.right - 4 - halfWidth - screenCenter))}px`;
    }
  });
  function toggleSegment(value: string) {
    setHiddenSegments((previous) => {
      const next = new Set(previous);
      if (next.has(value)) next.delete(value);
      else if (next.size < segments.length - 1) next.add(value);
      return next;
    });
  }
  function changeSlice(value: string) {
    setSliceKey(value);
    if (value === segmentKey) setSegmentKey("none");
  }
  const dimensionOptions = normalizedDimensions.map((dimension) => ({
    value: dimension.key,
    label: dimension.label,
  }));
  return {
    measure,
    slice,
    segment,
    segments,
    segmentColor,
    rows,
    total,
    maximum,
    ticks,
    activeRow,
    activeIndex,
    activeValue,
    setActiveValue,
    hiddenSegments,
    setHiddenSegments,
    toggleSegment,
    setMeasureKey,
    changeSlice,
    setSegmentKey,
    sliceKey,
    dimensionOptions,
    measureOptions: normalizedMeasures.map((measure) => ({
      value: measure.key,
      label: measure.label,
    })),
    tableRef,
    morphRef,
    plotRef,
    tooltipRef,
  };
}
function ChartSelect({ label, value, options, onChange, clean }: ChartSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const prefix = clean ? "ui-bcc" : "ui-bc";
  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target))
        setOpen(false);
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", closeOnOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeOnOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  const selectedLabel = options.find((option) => option.value === value)?.label ?? value;
  function handleOptionKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const buttons = [
      ...(event.currentTarget.parentElement?.querySelectorAll("button") ?? []),
    ];
    const index = buttons.indexOf(event.currentTarget);
    if (event.key === "ArrowDown")
      buttons[Math.min(buttons.length - 1, index + 1)]?.focus();
    if (event.key === "ArrowUp") buttons[Math.max(0, index - 1)]?.focus();
    if (event.key.startsWith("Arrow")) event.preventDefault();
  }
  return (
    <div className={`${prefix}__select`} ref={rootRef}>
      <span className={`${prefix}__select-label`} id={labelId}>
        {label}
      </span>
      <button
        type="button"
        className={`${prefix}__select-btn`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        title={selectedLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <span dir="auto">{selectedLabel}</span>
        {clean ? <CleanChevronIcon /> : <ChevronIcon />}
      </button>
      {open && (
        <div className={`${prefix}__menu`} role="listbox" aria-labelledby={labelId}>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={`${prefix}__option`}
              autoFocus={option.value === value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              onKeyDown={handleOptionKeyDown}
              key={option.value}
            >
              <span dir="auto" title={option.label}>
                {option.label}
              </span>
              {option.value === value && (clean ? <CleanCheckIcon /> : <CheckIcon />)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
function BreakdownView({
  clean = false,
  title = "Workload",
  className,
  ...props
}: BreakdownViewProps) {
  const {
    measure,
    slice,
    segment,
    segments,
    segmentColor,
    rows,
    total,
    maximum,
    ticks,
    activeRow,
    activeIndex,
    activeValue,
    setActiveValue,
    hiddenSegments,
    setHiddenSegments,
    toggleSegment,
    setMeasureKey,
    changeSlice,
    setSegmentKey,
    sliceKey,
    dimensionOptions,
    measureOptions,
    tableRef,
    morphRef,
    plotRef,
    tooltipRef,
  } = useBreakdown(props, clean);
  if (!measure || !slice) return null;
  const prefix = clean ? "ui-bcc" : "ui-bc";
  const columns = `repeat(${rows.length}, minmax(0, 1fr))`;
  const tooltipSegments = activeRow
    ? segments
        .map((value, index) => ({
          value,
          index,
          amount: activeRow.cells[value]!,
        }))
        .filter((item) => item.amount && !hiddenSegments.has(item.value))
        .sort((first, second) => second.amount - first.amount)
    : [];
  const content = (
    <>
      <div className={`${prefix}__controls`}>
        <ChartSelect
          clean={clean}
          label="Measure"
          value={measure.key}
          onChange={setMeasureKey}
          options={measureOptions}
        />
        <ChartSelect
          clean={clean}
          label="Slice"
          value={slice.key}
          onChange={changeSlice}
          options={dimensionOptions}
        />
        <ChartSelect
          clean={clean}
          label="Segment"
          value={segment?.key ?? "none"}
          onChange={setSegmentKey}
          options={[
            { value: "none", label: "None" },
            ...dimensionOptions.filter((option) => option.value !== sliceKey),
          ]}
        />
      </div>
      <div className={`${prefix}__chart`} onPointerLeave={() => setActiveValue(null)}>
        <div className={`${prefix}__plot`} ref={plotRef}>
          {ticks.map((tick) => (
            <span
              className={`${prefix}__grid`}
              style={{ bottom: `${(tick / maximum) * 100}%` }}
              data-zero={tick === 0 || undefined}
              key={tick}
            >
              <span className={`${prefix}__tick`}>{formatTick(tick)}</span>
            </span>
          ))}
          <div className={`${prefix}__bars`} style={{ gridTemplateColumns: columns }}>
            {rows.map((row, index) => (
              <button
                type="button"
                className={`${prefix}__col`}
                data-dim={(activeValue && activeValue !== row.value) || undefined}
                data-active={activeValue === row.value || undefined}
                aria-label={`${row.value}: ${formatValue(row.total)} ${measure.unit ?? ""}`}
                onPointerEnter={() => setActiveValue(row.value)}
                onFocus={() => setActiveValue(row.value)}
                onBlur={() => setActiveValue(null)}
                key={index}
              >
                <span
                  className={`${prefix}__rest`}
                  style={{
                    bottom: `${(Math.max(0, row.total) / maximum) * 100}%`,
                  }}
                />
                <span
                  className={`${prefix}__bar`}
                  style={{
                    height: `${(Math.max(0, row.total) / maximum) * 100}%`,
                  }}
                >
                  {segments.map((value, index) =>
                    hiddenSegments.has(value) || !(row.cells[value]! > 0) ? null : (
                      <span
                        className={`${prefix}__seg`}
                        style={{
                          flexGrow: row.cells[value],
                          background: segmentColor(value, index),
                        }}
                        key={index}
                      />
                    ),
                  )}
                </span>
              </button>
            ))}
          </div>
          {activeRow && (
            <div
              ref={tooltipRef}
              className={`${prefix}__tooltip`}
              role="status"
              data-side={(activeIndex + 0.5) / rows.length > 0.5 ? "left" : "right"}
            >
              <p className={`${prefix}__tip-head`}>
                <span className={`${prefix}__tip-label`}>
                  {slice.icons?.[activeRow.value]}
                  <span dir="auto">{activeRow.value}</span>
                </span>
                <strong>{formatValue(activeRow.total)}</strong>
              </p>
              {segment && (
                <ul>
                  {tooltipSegments.map((item) => (
                    <li key={item.index}>
                      <span
                        className={`${prefix}__swatch`}
                        style={{
                          background: segmentColor(item.value, item.index),
                        }}
                      />
                      <span className={`${prefix}__tip-seg`} dir="auto">
                        {item.value}
                      </span>
                      <span className={clean ? `${prefix}__tip-num` : undefined}>
                        {formatValue(item.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className={`${prefix}__xaxis`} style={{ gridTemplateColumns: columns }}>
          {rows.map((row, index) => (
            <span
              className={`${prefix}__xlabel`}
              data-active={activeValue === row.value || undefined}
              title={row.value}
              key={index}
            >
              {activeValue === row.value ? (
                <span className={`${prefix}__pill`}>
                  {slice.icons?.[row.value]}
                  <span dir="auto">{row.value}</span>
                </span>
              ) : (
                (slice.icons?.[row.value] ?? (
                  <span className={`${prefix}__xtext`} dir="auto">
                    {row.value}
                  </span>
                ))
              )}
            </span>
          ))}
        </div>
      </div>
      <div className={`${prefix}__morph`} ref={morphRef}>
        <div
          className={`${prefix}__table-wrap`}
          ref={tableRef}
          tabIndex={0}
          role="region"
          aria-label="Breakdown table"
        >
          <table className={`${prefix}__table`}>
            <thead>
              <tr>
                <th scope="col">{slice.label}</th>
                <th scope="col" data-num={true}>
                  {measure.label}
                </th>
                {segment &&
                  segments.map((value, index) => (
                    <th
                      scope="col"
                      data-num={true}
                      data-hidden={hiddenSegments.has(value) || undefined}
                      key={index}
                    >
                      <span className={`${prefix}__th-seg`} title={value}>
                        <span
                          className={`${prefix}__swatch`}
                          style={{ background: segmentColor(value, index) }}
                        />
                        <span dir="auto">{value}</span>
                      </span>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  data-active={activeValue === row.value || undefined}
                  onPointerEnter={() => setActiveValue(row.value)}
                  onPointerLeave={() => setActiveValue(null)}
                  key={index}
                >
                  <th scope="row">
                    <span className={`${prefix}__row-label`} title={row.value}>
                      {slice.icons?.[row.value]}
                      <span dir="auto">{row.value}</span>
                    </span>
                  </th>
                  <td data-num={true} data-total={clean || undefined}>
                    {formatValue(row.total)}
                  </td>
                  {segment &&
                    segments.map((value, index) => (
                      <td
                        data-num={true}
                        data-hidden={hiddenSegments.has(value) || undefined}
                        key={index}
                      >
                        {formatValue(row.cells[value]!)}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
  return (
    <>
      <section
        className={[prefix, className].filter(Boolean).join(" ")}
        aria-label={title}
      >
        <header className={`${prefix}__head`}>
          <span className={`${prefix}__title`} dir="auto" title={title}>
            {title}
          </span>
          <span className={`${prefix}__total`}>
            <strong>{formatValue(total)}</strong> {measure.unit}
          </span>
        </header>
        {clean ? content : <div className={`${prefix}__card`}>{content}</div>}
        <footer className={`${prefix}__foot`}>
          {segment ? (
            <div
              className={`${prefix}__legend`}
              role="group"
              aria-label={`${segment.label} – click to show or hide`}
            >
              {segments.map((value, index) => (
                <button
                  type="button"
                  className={`${prefix}__chip`}
                  aria-pressed={!hiddenSegments.has(value)}
                  title={value}
                  onClick={() => toggleSegment(value)}
                  key={index}
                >
                  <span
                    className={`${prefix}__swatch`}
                    style={{ background: segmentColor(value, index) }}
                  />
                  <span dir="auto">{value}</span>
                </button>
              ))}
            </div>
          ) : (
            <span className={`${prefix}__hint`}>Pick a segment to split the bars</span>
          )}
          {hiddenSegments.size > 0 && (
            <button
              type="button"
              className={`${prefix}__reset`}
              onClick={() => setHiddenSegments(new Set())}
            >
              Show all
            </button>
          )}
        </footer>
      </section>
    </>
  );
}
const DEFAULT_COLORS = [
  "#2f6bff",
  "#8b5cf6",
  "#ec4899",
  "#7aa2ff",
  "#c4b5fd",
  "#a3a3a3",
  "#f9a8d4",
];
const CLEAN_COLORS = [
  "#3c85e9",
  "#5b5bd6",
  "#80b0f1",
  "#1a9a52",
  "#e8a20c",
  "#e5484d",
  "#b3cff6",
];
const valueFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});
const tickFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const formatValue = (value: number) =>
  value > 0 && value < 0.05 ? "<0.1" : valueFormatter.format(value);
const formatTick = (value: number) => tickFormatter.format(value);
const ChevronIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    width={`14`}
    height={`14`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`m4.5 6.25 3.5 3.5 3.5-3.5`} />
  </svg>
);
const CheckIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    width={`14`}
    height={`14`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`m3.5 8.5 3 3 6-7`} />
  </svg>
);
const CleanChevronIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    width={`16`}
    height={`16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.1`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`m4.5 6.25 3.5 3.5 3.5-3.5`} />
  </svg>
);
const CleanCheckIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    width={`16`}
    height={`16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.3`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`m3.5 8.5 3 3 6-7`} />
  </svg>
);
export { BreakdownChart };
export type { BreakdownRecord };
export type { Dimension };
export type { Measure };
export type { BreakdownChartProps };
