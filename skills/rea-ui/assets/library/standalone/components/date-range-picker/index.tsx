"use client";

import "./DateRangePicker.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
interface DateRange {
  start: Date;
  end: Date;
}
type DateRangeCompare = "off" | "previous" | "year";
interface DateRangePreset {
  id: string;
  label: string;
  range: (today: Date) => DateRange;
}
interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (
    range: DateRange,
    comparison: DateRange | null,
    mode: DateRangeCompare,
  ) => void;
  presets?: DateRangePreset[];
  compare?: boolean;
  defaultCompare?: DateRangeCompare;
  weekStartsOn?: 0 | 1;
  min?: Date;
  max?: Date;
  defaultOpen?: boolean;
  today?: Date;
  className?: string;
}
interface DraftRange {
  start: Date;
  end: Date | null;
}
interface ViewProps extends DateRangePickerProps {
  clean: boolean;
}
function DateRangePicker(props: DateRangePickerProps) {
  return <DateRangePickerView {...props} clean={false} />;
}
function formatRange({ start, end }: DateRange) {
  if (!validDate(start) || !validDate(end)) return "–";
  if (sameDay(start, end)) return dateFormat.format(start);
  return `${(start.getFullYear() === end.getFullYear() ? shortDateFormat : dateFormat).format(start)} – ${dateFormat.format(end)}`;
}
function comparisonRange(range: DateRange, mode: DateRangeCompare): DateRange | null {
  if (mode === "previous") {
    const length = inclusiveDays(range.start, range.end);
    return {
      start: addDays(range.start, -length),
      end: addDays(range.start, -1),
    };
  }
  if (mode === "year") {
    const previousYear = (date: Date) =>
      new Date(
        date.getFullYear() - 1,
        date.getMonth(),
        Math.min(
          date.getDate(),
          endOfMonth(new Date(date.getFullYear() - 1, date.getMonth(), 1)).getDate(),
        ),
      );
    return { start: previousYear(range.start), end: previousYear(range.end) };
  }
  return null;
}
function monthWeeks(month: Date, weekStartsOn: 0 | 1): (Date | null)[][] {
  const leading = (startOfMonth(month).getDay() - weekStartsOn + 7) % 7;
  const days = endOfMonth(month).getDate();
  const cells: (Date | null)[] = Array(leading).fill(null);
  for (let day = 1; day <= days; day++)
    cells.push(new Date(month.getFullYear(), month.getMonth(), day));
  while (cells.length % 7) cells.push(null);
  const weeks: (Date | null)[][] = [];
  for (let index = 0; index < cells.length; index += 7)
    weeks.push(cells.slice(index, index + 7));
  return weeks;
}
function positionIndicator(
  root: HTMLElement | null,
  indicator: HTMLElement | null,
  selector: string,
) {
  if (!root || !indicator) return;
  const active = root.querySelector<HTMLElement>(selector);
  if (!active || !active.offsetWidth) {
    indicator.style.opacity = "0";
    return;
  }
  const initial = !indicator.dataset.ready;
  if (initial) indicator.style.transition = "none";
  indicator.style.opacity = "1";
  indicator.style.width = `${active.offsetWidth}px`;
  indicator.style.height = `${active.offsetHeight}px`;
  indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
  if (initial) {
    indicator.dataset.ready = "1";
    void indicator.offsetWidth;
    indicator.style.transition = "";
  }
}
function useDateRange(
  {
    value,
    defaultValue,
    onChange,
    presets = DEFAULT_PRESETS,
    compare = true,
    defaultCompare = "previous",
    weekStartsOn = 1,
    max,
    min,
    defaultOpen = false,
    today,
  }: DateRangePickerProps,
  clean: boolean,
) {
  const firstWeekday: 0 | 1 = weekStartsOn === 0 ? 0 : 1;
  const currentDay = useMemo(
    () => startOfDay(validDate(today) ? today : new Date()),
    [today?.getTime()],
  );
  const maximum = validDate(max) ? startOfDay(max) : currentDay;
  const minimum =
    validDate(min) && startOfDay(min) <= maximum ? startOfDay(min) : undefined;
  const [localRange, setLocalRange] = useState(() => {
    const end = clampDay(currentDay, minimum, maximum);
    return normalizeRange(defaultValue, {
      start: clampDay(addDays(end, -29), minimum, maximum),
      end,
    });
  });
  const selectedRange = value ? normalizeRange(value, localRange) : localRange;
  const [selectedCompare, setSelectedCompare] = useState<DateRangeCompare>(
    compare && COMPARISONS.some((option) => option.id === defaultCompare)
      ? defaultCompare
      : "off",
  );
  const selectedComparison =
    compare && selectedCompare !== "off"
      ? comparisonRange(selectedRange, selectedCompare)
      : null;
  const [open, setOpen] = useState(defaultOpen);
  const [draft, setDraft] = useState<DraftRange>(selectedRange);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const [draftCompare, setDraftCompare] = useState(selectedCompare);
  const [firstMonth, setFirstMonth] = useState(() => addMonths(selectedRange.end, -1));
  const [direction, setDirection] = useState(1);
  const [focusedDay, setFocusedDay] = useState(() =>
    clampDay(selectedRange.end, minimum, maximum),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const monthsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const keyboardFocus = useRef(false);
  const idBase = useId();
  const measuredContentRef = useRef<HTMLDivElement>(null);
  const triggerInnerRef = useRef<HTMLSpanElement>(null);
  const presetsRef = useRef<HTMLDivElement>(null);
  const presetIndicatorRef = useRef<HTMLSpanElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const compareIndicatorRef = useRef<HTMLSpanElement>(null);
  const previousComparison = useRef<DateRange | null>(null);
  const openPicker = () => {
    setDraft(selectedRange);
    setDraftCompare(selectedCompare);
    setFirstMonth(addMonths(selectedRange.end, -1));
    setFocusedDay(clampDay(selectedRange.end, minimum, maximum));
    setHoveredDay(null);
    setOpen(true);
  };
  const closePicker = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  useLayoutEffect(() => {
    if (open && keyboardFocus.current)
      monthsRef.current
        ?.querySelector<HTMLButtonElement>(`[data-day="${focusedDay.getTime()}"]`)
        ?.focus();
  }, [focusedDay, firstMonth, open]);
  const previewRange = draft.end
    ? orderedRange(draft.start, draft.end)
    : hoveredDay
      ? orderedRange(draft.start, hoveredDay)
      : null;
  const displayedRange = previewRange ?? {
    start: draft.start,
    end: draft.start,
  };
  const draftComparison =
    compare && previewRange ? comparisonRange(previewRange, draftCompare) : null;
  const selectedPreset = draft.end
    ? presets.findIndex((preset) => {
        const range = preset.range(currentDay);
        return (
          validDate(range?.start) &&
          validDate(range?.end) &&
          sameDay(startOfDay(range.start), displayedRange.start) &&
          sameDay(startOfDay(range.end), displayedRange.end)
        );
      })
    : -1;
  const pickDay = (date: Date) => {
    setDraft(draft.end ? { start: date, end: null } : orderedRange(draft.start, date));
    setHoveredDay(null);
    setFocusedDay(date);
  };
  const pickPreset = (preset: DateRangePreset) => {
    const range = preset.range(currentDay);
    if (!validDate(range?.start) || !validDate(range?.end)) return;
    const next = {
      start: clampDay(startOfDay(range.start), minimum, maximum),
      end: clampDay(startOfDay(range.end), minimum, maximum),
    };
    setDraft(next);
    setHoveredDay(null);
    setFocusedDay(next.end);
    const month = addMonths(next.end, -1);
    if (month.getTime() !== firstMonth.getTime()) {
      setDirection(month > firstMonth ? 1 : -1);
      setFirstMonth(month);
    }
  };
  const moveMonth = (offset: number) => {
    setDirection(offset > 0 ? 1 : -1);
    setFirstMonth((previous) => addMonths(previous, offset));
  };
  const apply = () => {
    const range = draft.end
      ? orderedRange(draft.start, draft.end)
      : { start: draft.start, end: draft.start };
    if (!value) setLocalRange(range);
    setSelectedCompare(draftCompare);
    onChange?.(
      range,
      compare ? comparisonRange(range, draftCompare) : null,
      draftCompare,
    );
    closePicker();
  };
  const isDisabled = (day: Date) => day > maximum || (!!minimum && day < minimum);
  const onCalendarKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: Date;
    switch (event.key) {
      case "ArrowLeft":
        next = addDays(focusedDay, -1);
        break;
      case "ArrowRight":
        next = addDays(focusedDay, 1);
        break;
      case "ArrowUp":
        next = addDays(focusedDay, -7);
        break;
      case "ArrowDown":
        next = addDays(focusedDay, 7);
        break;
      case "PageUp":
        next = new Date(
          focusedDay.getFullYear(),
          focusedDay.getMonth() - 1,
          Math.min(focusedDay.getDate(), 28),
        );
        break;
      case "PageDown":
        next = new Date(
          focusedDay.getFullYear(),
          focusedDay.getMonth() + 1,
          Math.min(focusedDay.getDate(), 28),
        );
        break;
      case "Home":
        next = addDays(focusedDay, -((focusedDay.getDay() - firstWeekday + 7) % 7));
        break;
      case "End":
        next = addDays(focusedDay, 6 - ((focusedDay.getDay() - firstWeekday + 7) % 7));
        break;
      default:
        return;
    }
    event.preventDefault();
    keyboardFocus.current = true;
    next = clampDay(next, minimum, maximum);
    setFocusedDay(next);
    if (!draft.end) setHoveredDay(next);
    const lastMonthEnd = endOfMonth(addMonths(firstMonth, 1));
    if (next < firstMonth) moveMonth(-1);
    else if (next > lastMonthEnd) moveMonth(1);
  };
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat("en-US", { weekday: "short" })
      .format(new Date(2026, 0, 4 + firstWeekday + index))
      .slice(0, 2),
  );
  const months = [firstMonth, addMonths(firstMonth, 1)];
  const weekCount = Math.max(
    ...months.map((month) => monthWeeks(month, firstWeekday).length),
  );
  const dayCount = inclusiveDays(displayedRange.start, displayedRange.end);
  if (draftComparison) previousComparison.current = draftComparison;
  useLayoutEffect(() => {
    if (clean) return;
    positionIndicator(
      presetsRef.current,
      presetIndicatorRef.current,
      '[aria-selected="true"], [data-active]',
    );
    positionIndicator(
      compareRef.current,
      compareIndicatorRef.current,
      '[aria-checked="true"]',
    );
  });
  const hasScrolledPresets = useRef(false);
  useEffect(() => {
    if (!open) {
      hasScrolledPresets.current = false;
      return;
    }
    const presetsList = presetsRef.current;
    const active = presetsList?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!presetsList || !active || presetsList.scrollWidth <= presetsList.clientWidth)
      return;
    const left = Math.max(
      0,
      active.offsetLeft - (presetsList.clientWidth - active.offsetWidth) / 2,
    );
    presetsList.scrollTo({
      left,
      behavior: hasScrolledPresets.current ? "smooth" : "auto",
    });
    hasScrolledPresets.current = true;
  }, [open, selectedPreset]);
  useLayoutEffect(() => {
    const panel = rootRef.current?.querySelector<HTMLDivElement>('[role="dialog"]');
    if (!open || !panel) return;
    panel.style.left = "";
    const bounds = panel.getBoundingClientRect();
    const overflow = bounds.right - (document.documentElement.clientWidth - 8);
    if (overflow > 0)
      panel.style.left = `${-Math.max(0, Math.min(overflow, bounds.left - 8))}px`;
  }, [open]);
  useLayoutEffect(() => {
    const clip = clipRef.current;
    const content = measuredContentRef.current;
    if (!open || !clip || !content) return;
    const measure = () => {
      clip.style.height = `${content.offsetHeight + (clean ? 0 : 8)}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [open]);
  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    const inner = triggerInnerRef.current;
    if (!trigger || !inner) return;
    const measure = () => {
      trigger.style.width = `${inner.offsetWidth + (clean ? 16 : 20)}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);
  return {
    firstWeekday,
    currentDay,
    selectedRange,
    selectedCompare,
    selectedComparison,
    open,
    draft,
    hoveredDay,
    setHoveredDay,
    draftCompare,
    setDraftCompare,
    firstMonth,
    direction,
    focusedDay,
    setFocusedDay,
    rootRef,
    clipRef,
    monthsRef,
    triggerRef,
    keyboardFocus,
    idBase,
    measuredContentRef,
    triggerInnerRef,
    presetsRef,
    presetIndicatorRef,
    compareRef,
    compareIndicatorRef,
    previousComparison,
    openPicker,
    closePicker,
    previewRange,
    displayedRange,
    draftComparison,
    selectedPreset,
    pickDay,
    pickPreset,
    moveMonth,
    apply,
    isDisabled,
    onCalendarKeyDown,
    weekdays,
    months,
    weekCount,
    dayCount,
  };
}
function CalendarGlyph({
  prefix,
  kind,
  className,
}: {
  prefix: string;
  kind: keyof typeof GLYPHS;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={[`${prefix}__glyph`, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <path d={GLYPHS[kind]} />
    </svg>
  );
}
function DateRangePickerView(props: ViewProps) {
  const { presets = DEFAULT_PRESETS, compare = true, className, clean } = props;
  const prefix = clean ? "ui-drpc" : "ui-drp";
  const state = useDateRange(props, clean);
  const body = (
    <div ref={clean ? state.measuredContentRef : undefined} className={`${prefix}__body`}>
      <div
        ref={state.presetsRef}
        className={`${prefix}__presets`}
        role="listbox"
        aria-label="Presets"
      >
        {!clean && (
          <span
            ref={state.presetIndicatorRef}
            className={`${prefix}__pill`}
            aria-hidden="true"
          />
        )}
        {presets.map((preset, index) => (
          <button
            type="button"
            role="option"
            title={preset.label}
            dir="auto"
            aria-selected={state.selectedPreset === index}
            className={`${prefix}__preset`}
            onClick={() => state.pickPreset(preset)}
            key={`${preset.id}-${index}`}
          >
            <span className={`${prefix}__preset-label`}>{preset.label}</span>
          </button>
        ))}
        <span
          className={`${prefix}__preset ${prefix}__preset-custom`}
          aria-hidden={!!presets[state.selectedPreset]}
          data-active={!presets[state.selectedPreset] || undefined}
        >
          Custom
        </span>
      </div>
      <div className={`${prefix}__cal`}>
        <div className={`${prefix}__nav`}>
          <button
            type="button"
            className={`${prefix}__icon-btn`}
            aria-label="Previous month"
            onClick={() => state.moveMonth(-1)}
          >
            <CalendarGlyph prefix={prefix} kind="left" />
          </button>
          <button
            type="button"
            className={`${prefix}__icon-btn`}
            aria-label="Next month"
            onClick={() => state.moveMonth(1)}
          >
            <CalendarGlyph prefix={prefix} kind="right" />
          </button>
        </div>
        <div
          ref={state.monthsRef}
          className={`${prefix}__months`}
          data-dir={state.direction}
          onKeyDown={state.onCalendarKeyDown}
          onPointerLeave={() => {
            if (!state.draft.end) state.setHoveredDay(null);
          }}
          onPointerDown={() => {
            state.keyboardFocus.current = false;
          }}
          key={state.firstMonth.getTime()}
        >
          {state.months.map((month, monthIndex) => {
            const weeks = monthWeeks(month, state.firstWeekday);
            return (
              <div
                className={`${prefix}__month`}
                data-second={monthIndex === 1 || undefined}
                key={month.getTime()}
              >
                <div
                  className={`${prefix}__month-name`}
                  aria-live={monthIndex === 0 ? "polite" : undefined}
                >
                  {monthFormat.format(month)}
                </div>
                <div
                  role="grid"
                  aria-label={monthFormat.format(month)}
                  className={`${prefix}__grid`}
                >
                  <div role="row" className={`${prefix}__weekdays`}>
                    {state.weekdays.map((weekday) => (
                      <span
                        role="columnheader"
                        className={`${prefix}__weekday`}
                        key={weekday}
                      >
                        {weekday}
                      </span>
                    ))}
                  </div>
                  {Array.from(
                    { length: state.weekCount },
                    (_, weekIndex) =>
                      weeks[weekIndex] ?? Array<Date | null>(7).fill(null),
                  ).map((week, weekIndex) => (
                    <div role="row" className={`${prefix}__week`} key={weekIndex}>
                      {week.map((day, column) => {
                        if (!day)
                          return (
                            <span
                              className={`${prefix}__day ${prefix}__day-empty`}
                              role="gridcell"
                              key={column}
                            />
                          );
                        const isStart = sameDay(day, state.displayedRange.start);
                        const isEnd = sameDay(day, state.displayedRange.end);
                        const selected = inRange(day, state.previewRange);
                        const compared = !selected && inRange(day, state.draftComparison);
                        return (
                          <span
                            role="gridcell"
                            aria-selected={selected || isStart || undefined}
                            className={`${prefix}__day`}
                            data-range={selected || undefined}
                            data-start={isStart || undefined}
                            data-end={isEnd || undefined}
                            data-preview={(!state.draft.end && selected) || undefined}
                            data-compare={compared || undefined}
                            data-compare-start={
                              (state.draftComparison &&
                                sameDay(day, state.draftComparison.start)) ||
                              undefined
                            }
                            data-compare-end={
                              (state.draftComparison &&
                                sameDay(day, state.draftComparison.end)) ||
                              undefined
                            }
                            data-row-start={
                              column === 0 || day.getDate() === 1 || undefined
                            }
                            data-row-end={
                              column === 6 || sameDay(day, endOfMonth(day)) || undefined
                            }
                            key={column}
                          >
                            <button
                              type="button"
                              data-day={day.getTime()}
                              tabIndex={sameDay(day, state.focusedDay) ? 0 : -1}
                              disabled={state.isDisabled(day)}
                              aria-label={dayLabelFormat.format(day)}
                              aria-current={
                                sameDay(day, state.currentDay) ? "date" : undefined
                              }
                              onClick={() => state.pickDay(day)}
                              onPointerEnter={() => {
                                if (!state.draft.end) state.setHoveredDay(day);
                              }}
                              onFocus={() => state.setFocusedDay(day)}
                            >
                              {day.getDate()}
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  const footer = (
    <div className={`${prefix}__foot`}>
      <div className={`${prefix}__summary`}>
        <div className={`${prefix}__summary-range`}>
          <span
            key={`${state.displayedRange.start.getTime()}-${state.displayedRange.end.getTime()}`}
          >
            {state.draft.end || state.hoveredDay
              ? formatRange(state.displayedRange)
              : `${dateFormat.format(state.draft.start)} – pick an end`}
          </span>
          <span className={`${prefix}__count`} key={state.dayCount}>
            {countFormat.format(state.dayCount)} {state.dayCount === 1 ? "day" : "days"}
          </span>
        </div>
        {compare && (
          <div className={`${prefix}__compare`}>
            <span className={`${prefix}__compare-label`}>Compare</span>
            <div
              ref={clean ? undefined : state.compareRef}
              className={`${prefix}__segments`}
              role="radiogroup"
              aria-label="Compare to"
            >
              {!clean && (
                <span
                  ref={state.compareIndicatorRef}
                  className={`${prefix}__pill`}
                  aria-hidden="true"
                />
              )}
              {COMPARISONS.map((option) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={state.draftCompare === option.id}
                  className={`${prefix}__segment`}
                  onClick={() => state.setDraftCompare(option.id)}
                  key={option.id}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {compare && (
          <div
            className={`${prefix}__fold`}
            data-open={!!state.draftComparison || undefined}
          >
            <div>
              {state.previousComparison.current && (
                <div
                  className={`${prefix}__compare-range`}
                  key={`${state.previousComparison.current.start.getTime()}-${state.previousComparison.current.end.getTime()}`}
                >
                  {"vs. "}
                  {formatRange(state.previousComparison.current)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={`${prefix}__buttons`}>
        <button
          type="button"
          className={`${prefix}__btn`}
          onClick={() => state.closePicker()}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${prefix}__btn ${prefix}__btn-primary`}
          disabled={!state.draft.end}
          onClick={state.apply}
        >
          Apply
        </button>
      </div>
    </div>
  );
  return (
    <div
      ref={state.rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-open={state.open || undefined}
    >
      <button
        ref={state.triggerRef}
        type="button"
        className={`${prefix}__trigger`}
        aria-haspopup="dialog"
        aria-expanded={state.open}
        aria-controls={`${state.idBase}-panel`}
        onClick={() => (state.open ? state.closePicker() : state.openPicker())}
      >
        <span ref={state.triggerInnerRef} className={`${prefix}__trigger-inner`}>
          <CalendarGlyph prefix={prefix} kind="calendar" />
          <span
            className={`${prefix}__trigger-text`}
            key={`${formatRange(state.selectedRange)}-${state.selectedCompare}`}
          >
            <span className={`${prefix}__trigger-range`}>
              {formatRange(state.selectedRange)}
            </span>
            {state.selectedComparison && (
              <span className={`${prefix}__trigger-compare`}>
                {"vs. "}
                {formatRange(state.selectedComparison)}
              </span>
            )}
          </span>
          <CalendarGlyph
            prefix={prefix}
            kind="chevron"
            className={`${prefix}__chevron`}
          />
        </span>
      </button>
      {state.open && (
        <div
          ref={clean ? undefined : state.clipRef}
          id={`${state.idBase}-panel`}
          role="dialog"
          aria-label="Choose a date range"
          className={`${prefix}__panel`}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              state.closePicker();
            }
          }}
        >
          {clean ? (
            <>
              <div ref={state.clipRef} className={`${prefix}__clip`}>
                {body}
              </div>
              {footer}
            </>
          ) : (
            <div ref={state.measuredContentRef} className={`${prefix}__panel-inner`}>
              {body}
              {footer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
const addDays = (date: Date, count: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + count);
const addMonths = (date: Date, count: number) =>
  new Date(date.getFullYear(), date.getMonth() + count, 1);
const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
const sameDay = (left: Date | null | undefined, right: Date | null | undefined) =>
  !!left && !!right && left.getTime() === right.getTime();
const validDate = (value: unknown): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime());
const utcDay = (date: Date) =>
  Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
const inclusiveDays = (start: Date, end: Date) =>
  Math.round((utcDay(end) - utcDay(start)) / 86400000) + 1;
const clampDay = (date: Date, min: Date | undefined, max: Date) =>
  min && date < min ? min : date > max ? max : date;
const orderedRange = (start: Date, end: Date): DateRange =>
  start <= end ? { start, end } : { start: end, end: start };
const normalizeRange = (range: DateRange | undefined, fallback: DateRange) =>
  range && validDate(range.start) && validDate(range.end)
    ? orderedRange(startOfDay(range.start), startOfDay(range.end))
    : fallback;
const inRange = (date: Date, range: DateRange | null) =>
  !!range && date >= range.start && date <= range.end;
const countFormat = new Intl.NumberFormat("en-US");
const shortDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});
const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const dayLabelFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
const DEFAULT_PRESETS: DateRangePreset[] = [
  {
    id: "today",
    label: "Today",
    range: (today) => ({ start: today, end: today }),
  },
  {
    id: "yesterday",
    label: "Yesterday",
    range: (today) => ({ start: addDays(today, -1), end: addDays(today, -1) }),
  },
  {
    id: "7d",
    label: "Last 7 days",
    range: (today) => ({ start: addDays(today, -6), end: today }),
  },
  {
    id: "30d",
    label: "Last 30 days",
    range: (today) => ({ start: addDays(today, -29), end: today }),
  },
  {
    id: "90d",
    label: "Last 90 days",
    range: (today) => ({ start: addDays(today, -89), end: today }),
  },
  {
    id: "month",
    label: "This month",
    range: (today) => ({ start: startOfMonth(today), end: today }),
  },
  {
    id: "last-month",
    label: "Last month",
    range: (today) => ({
      start: addMonths(today, -1),
      end: endOfMonth(addMonths(today, -1)),
    }),
  },
  {
    id: "quarter",
    label: "This quarter",
    range: (today) => ({
      start: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1),
      end: today,
    }),
  },
  {
    id: "ytd",
    label: "Year to date",
    range: (today) => ({
      start: new Date(today.getFullYear(), 0, 1),
      end: today,
    }),
  },
];
const COMPARISONS = [
  { id: "off", label: "Off" },
  { id: "previous", label: "Previous period" },
  { id: "year", label: "Previous year" },
] as const;
const GLYPHS = {
  calendar:
    "M7 3v3M17 3v3M4.5 9.5h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
  chevron: "M8 10l4 4 4-4",
  left: "M14.5 6l-6 6 6 6",
  right: "M9.5 6l6 6-6 6",
};
export { DateRangePicker };
export type { DateRange };
export type { DateRangeCompare };
export type { DateRangePreset };
export type { DateRangePickerProps };
