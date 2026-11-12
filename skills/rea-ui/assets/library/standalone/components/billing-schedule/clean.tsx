"use client";

import "./BillingSchedule.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  useLayoutEffect,
  type RefObject,
  Fragment,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type CatalogItem = {
  price?: number;
  repeat?: string;
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ScheduleLine = {
  kind?: string;
  repeat?: string;
  timing?: string;
  price?: number;
  percent?: number;
  amount?: number;
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
};
interface BillingScheduleValue {
  phase: string;
  start: string;
  duration: "milestone" | "1m" | "3m" | "6m" | "12m";
  lines: ScheduleLine[];
}
interface BillingScheduleProps {
  title?: string;
  phase?: string;
  currency?: string;
  catalog?: CatalogItem[];
  defaultLines?: ScheduleLine[];
  defaultStart?: string;
  onChange?: (schedule: BillingScheduleValue) => void;
  className?: string;
}
interface NumberInputProps {
  classPrefix: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  max?: number;
  label: string;
}
interface MenuProps {
  classPrefix: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: ReactNode;
  labelledBy?: string;
  button?: boolean;
  up?: boolean;
  children: ReactNode;
}
type DurationId = (typeof DURATIONS)[number]["id"];
type OpenMenu = "duration" | "product" | null;
interface BillingLine {
  id?: string;
  name?: string;
  kind?: string;
  repeat?: string;
  timing?: string;
  price: number;
  percent: number;
  amount: number;
}
interface ViewProps extends BillingScheduleProps {
  clean: boolean;
}
function BillingSchedule(props: BillingScheduleProps) {
  return <BillingScheduleView {...props} clean />;
}
function BillingIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
function NumberInput({
  classPrefix,
  value,
  onChange,
  prefix,
  suffix,
  max,
  label,
}: NumberInputProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const boundedValue = Math.min(max ?? Infinity, Number.isFinite(value) ? value : 0);
  const showNegative = draft === null && boundedValue < 0;
  const displayValue =
    draft ??
    Math.abs(boundedValue).toLocaleString("en-US", {
      minimumFractionDigits: suffix ? 0 : 2,
      maximumFractionDigits: 2,
    });
  const commit = () => {
    onChange(Math.max(0, Math.min(max ?? Infinity, parseFloat(draft ?? "") || 0)));
    setDraft(null);
  };
  return (
    <span className={`${classPrefix}__num`}>
      {showNegative && "-"}
      {prefix}
      <input
        value={displayValue}
        inputMode="decimal"
        aria-label={label}
        size={Math.max(2, displayValue.length)}
        onFocus={() => setDraft(String(boundedValue))}
        onChange={(event) => setDraft(event.target.value.replace(/[^\d.]/g, ""))}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
        }}
      />
      {suffix}
    </span>
  );
}
function BillingMenu({
  classPrefix,
  open,
  onOpenChange,
  label,
  labelledBy,
  button,
  up,
  children,
}: MenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || !rootRef.current?.contains(event.target))
        onOpenChange(false);
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open, onOpenChange]);
  return (
    <div className={`${classPrefix}__dd`} ref={rootRef}>
      <button
        type="button"
        className={`${classPrefix}__${button ? "btn" : "select"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelledBy}
        onClick={() => onOpenChange(!open)}
      >
        <span className={`${classPrefix}__select-label`}>{label}</span>
        {!button && <BillingIcon d="m7 10 5 5 5-5" />}
      </button>
      {open && (
        <div
          className={`${classPrefix}__menu`}
          role="listbox"
          data-up={up ? "" : undefined}
        >
          {children}
        </div>
      )}
    </div>
  );
}
function finiteNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
function optionalString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}
function normalizeLine(line: ScheduleLine): BillingLine {
  return {
    id: line.id,
    name: line.name,
    kind: optionalString(line.kind),
    repeat: optionalString(line.repeat),
    timing: optionalString(line.timing),
    price: finiteNumber(line.price),
    percent: finiteNumber(line.percent),
    amount: finiteNumber(line.amount),
  };
}
function repeatOption(id: unknown) {
  return REPEATS.find((option) => option.id === id) ?? REPEATS[0];
}
function formatMoney(value: unknown, currency: string) {
  const amount = finiteNumber(value);
  const sign = amount < 0 ? "-" : "";
  if (amount !== 0 && Math.abs(amount) < 0.005) return `${sign}<${currency}0.01`;
  return `${sign}${currency}${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function formatDate(date: Date) {
  return Number.isNaN(date.getTime())
    ? "–"
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}
function useRowsHeight(contentRef: RefObject<HTMLDivElement | null>) {
  const outerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const content = contentRef.current;
    if (!outer || !content) return;
    const measure = () => {
      outer.style.height = `${content.offsetHeight}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    const frame = requestAnimationFrame(() => outer.setAttribute("data-smooth", ""));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [contentRef]);
  return outerRef;
}
function useBillingSchedule(
  {
    phase = "Build-out phase",
    defaultStart = "2026-01-01",
    defaultLines = DEFAULT_LINES,
    onChange,
  }: BillingScheduleProps,
  clean: boolean,
) {
  const [phaseName, setPhaseName] = useState(phase);
  const [startDate, setStartDate] = useState(defaultStart);
  const [durationId, setDurationId] = useState<DurationId>("milestone");
  const [sourceLines, setLines] = useState(defaultLines);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const outerRef = useRowsHeight(contentRef);
  useEffect(() => {
    onChange?.({
      phase: phaseName,
      start: startDate,
      duration: durationId,
      lines: sourceLines,
    });
  }, [phaseName, startDate, durationId, sourceLines, onChange]);
  const lines = sourceLines.map(normalizeLine);
  const duration = DURATIONS.find((option) => option.id === durationId)!;
  const startLabel = formatDate(new Date(`${startDate}T12:00:00`));
  let endLabel = "Milestone";
  if (duration.months) {
    const endDate = new Date(`${startDate}T12:00:00`);
    endDate.setMonth(endDate.getMonth() + duration.months);
    endDate.setDate(endDate.getDate() - 1);
    endLabel = formatDate(endDate);
  }
  const nextId = () => `l${++lineCounters[clean ? "clean" : "default"]}`;
  const updateLine = (id: string | undefined, patch: Partial<BillingLine>) =>
    setLines((previous) =>
      previous.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  const removeLine = (id: string | undefined) =>
    setLines((previous) => previous.filter((line) => line.id !== id));
  const addProduct = (product: CatalogItem) => {
    const id = nextId();
    setLines((previous) => [
      ...previous.filter((line) => line.kind === "product"),
      { id, kind: "product", ...product, timing: "advance" },
      ...previous.filter((line) => line.kind !== "product"),
    ]);
    setOpenMenu(null);
  };
  const addDiscount = () => {
    const id = nextId();
    setLines((previous) => [
      ...previous,
      { id, kind: "discount", name: "Discount", percent: 10 },
    ]);
  };
  const addMinimum = () => {
    const id = nextId();
    setLines((previous) => [
      ...previous,
      { id, kind: "minimum", name: "Minimum commitment", amount: 10000 },
    ]);
  };
  const products = lines.filter((line) => line.kind === "product");
  const discount = lines.find((line) => line.kind === "discount");
  const minimum = lines.find((line) => line.kind === "minimum");
  const discountMultiplier = 1 - Math.min(100, Math.max(0, discount?.percent ?? 0)) / 100;
  const firstInvoice =
    products
      .filter((line) => line.timing === "advance")
      .reduce((total, line) => total + line.price, 0) * discountMultiplier;
  const months = duration.months || 1;
  const scheduledTotal =
    products.reduce((total, line) => {
      const perYear = repeatOption(line.repeat).perYear;
      return (
        total +
        line.price * (perYear ? Math.max(1, Math.round((perYear * months) / 12)) : 1)
      );
    }, 0) * discountMultiplier;
  const minimumAmount = minimum?.amount ?? 0;
  const phaseTotal = Math.max(scheduledTotal, minimumAmount);
  return {
    phaseName,
    setPhaseName,
    startDate,
    setStartDate,
    durationId,
    setDurationId,
    duration,
    startLabel,
    endLabel,
    lines,
    contentRef,
    outerRef,
    openMenu,
    setOpenMenu,
    updateLine,
    removeLine,
    addProduct,
    addDiscount,
    addMinimum,
    hasDiscount: !!discount,
    hasMinimum: !!minimum,
    firstInvoice,
    phaseTotal,
    minimumApplies:
      !!minimum && phaseTotal === minimumAmount && scheduledTotal < minimumAmount,
  };
}
function BillingScheduleView(props: ViewProps) {
  const {
    title = "Create a billing schedule",
    currency = "$",
    catalog = DEFAULT_CATALOG,
    className,
    clean,
  } = props;
  const state = useBillingSchedule(props, clean);
  const prefix = clean ? "ui-bsc" : "ui-bs";
  const money = (amount: unknown) => formatMoney(amount, currency);
  const summary = (
    <div className={`${prefix}__summary`}>
      <input
        className={`${prefix}__phase`}
        value={state.phaseName}
        onChange={(event) => state.setPhaseName(event.target.value)}
        aria-label="Phase name"
        title={state.phaseName}
        dir="auto"
        size={Math.max(6, Math.min(40, state.phaseName.length))}
      />
      {clean && (
        <span className={`${prefix}__dot`} aria-hidden="true">
          ·
        </span>
      )}
      <span className={clean ? `${prefix}__date` : undefined}>{state.startLabel}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14m0 0-5-5m5 5-5 5" />
      </svg>
      <span className={`${prefix}__end`} key={state.endLabel}>
        {state.endLabel}
      </span>
    </div>
  );
  const fields = (
    <div className={`${prefix}__fields`}>
      <label className={`${prefix}__field`}>
        <span className={clean ? `${prefix}__label` : undefined}>Start date</span>
        <span className={`${prefix}__input`}>
          <input
            type="date"
            value={state.startDate}
            onChange={(event) => state.setStartDate(event.target.value)}
          />
          <BillingIcon d="M7 4v3M17 4v3M4.5 9.5h15M6 6h12a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 18 20H6a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 6 6Z" />
        </span>
      </label>
      <div className={`${prefix}__field`}>
        <span
          className={clean ? `${prefix}__label` : undefined}
          id={`${prefix}-duration`}
        >
          Duration
        </span>
        <BillingMenu
          classPrefix={prefix}
          open={state.openMenu === "duration"}
          onOpenChange={(open) => state.setOpenMenu(open ? "duration" : null)}
          label={state.duration.label}
          labelledBy={`${prefix}-duration`}
        >
          {DURATIONS.map((duration) => (
            <button
              type="button"
              role="option"
              aria-selected={duration.id === state.durationId}
              onClick={() => {
                state.setDurationId(duration.id);
                state.setOpenMenu(null);
              }}
              key={duration.id}
            >
              {duration.label}
              {duration.id === state.durationId && <BillingIcon d="m6 12.5 4 4 8-9" />}
            </button>
          ))}
        </BillingMenu>
      </div>
    </div>
  );
  const table = (
    <div className={`${prefix}__table`} role="table" aria-label="Billing lines">
      <div className={`${prefix}__row ${prefix}__row--head`} role="row">
        <span role="columnheader">Name</span>
        <span role="columnheader">Repeats</span>
        <span role="columnheader" className={`${prefix}__right`}>
          Price
        </span>
      </div>
      <div className={`${prefix}__rows-outer`} ref={state.outerRef}>
        <div ref={state.contentRef}>
          {state.lines.length === 0 && (
            <p className={`${prefix}__empty`}>No products yet – add one below.</p>
          )}
          {state.lines.map((line) => (
            <div
              className={`${prefix}__row`}
              role="row"
              data-kind={line.kind}
              key={line.id}
            >
              <span role="cell" className={`${prefix}__name`}>
                {line.kind !== "product" && (
                  <span className={`${prefix}__tag`} aria-hidden="true">
                    <BillingIcon
                      d={line.kind === "discount" ? DISCOUNT_ICON : MINIMUM_ICON}
                    />
                  </span>
                )}
                <span className={`${prefix}__name-text`} dir="auto" title={line.name}>
                  {line.name}
                </span>
              </span>
              <span role="cell">
                {line.kind === "product" ? (
                  <label className={`${prefix}__repeat`}>
                    <BillingIcon d={REPEAT_ICON} />
                    <select
                      value={repeatOption(line.repeat).id}
                      onChange={(event) =>
                        state.updateLine(line.id, {
                          repeat: event.target.value,
                        })
                      }
                      aria-label={`${line.name} repeats`}
                    >
                      {REPEATS.map((repeat) => (
                        <option value={repeat.id} key={repeat.id}>
                          {repeat.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <span className={`${prefix}__muted`}>
                    {line.kind === "discount" ? "Whole phase" : "Per phase"}
                  </span>
                )}
              </span>
              <span role="cell" className={`${prefix}__price`}>
                <span className={`${prefix}__price-main`}>
                  {line.kind === "product" && (
                    <Fragment>
                      <NumberInput
                        classPrefix={prefix}
                        value={line.price}
                        prefix={currency}
                        onChange={(price) => state.updateLine(line.id, { price })}
                        label={`${line.name} price`}
                      />
                      <span className={`${prefix}__muted`}>
                        {"/ "}
                        {repeatOption(line.repeat).id === "once"
                          ? "once"
                          : repeatOption(line.repeat)
                              .label.toLowerCase()
                              .replace("ly", "")}
                      </span>
                    </Fragment>
                  )}
                  {line.kind === "discount" && (
                    <Fragment>
                      <NumberInput
                        classPrefix={prefix}
                        value={line.percent}
                        suffix="%"
                        max={100}
                        onChange={(percent) => state.updateLine(line.id, { percent })}
                        label="Discount percent"
                      />
                      <span className={`${prefix}__muted`}>off</span>
                    </Fragment>
                  )}
                  {line.kind === "minimum" && (
                    <Fragment>
                      <NumberInput
                        classPrefix={prefix}
                        value={line.amount}
                        prefix={currency}
                        onChange={(amount) => state.updateLine(line.id, { amount })}
                        label="Minimum commitment"
                      />
                      <span className={`${prefix}__muted`}>minimum</span>
                    </Fragment>
                  )}
                  <button
                    type="button"
                    className={`${prefix}__remove`}
                    aria-label={`Remove ${line.name}`}
                    onClick={() => state.removeLine(line.id)}
                  >
                    <BillingIcon d="M7 7l10 10M17 7 7 17" />
                  </button>
                </span>
                {line.kind === "product" && (
                  <select
                    className={`${prefix}__timing`}
                    value={line.timing}
                    onChange={(event) =>
                      state.updateLine(line.id, { timing: event.target.value })
                    }
                    aria-label={`${line.name} billed`}
                  >
                    <option value="advance">Billed in advance</option>
                    <option value="arrears">Billed in arrears</option>
                  </select>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const actions = (
    <div className={`${prefix}__actions`}>
      <BillingMenu
        classPrefix={prefix}
        open={state.openMenu === "product"}
        onOpenChange={(open) => state.setOpenMenu(open ? "product" : null)}
        label={
          <Fragment>
            <BillingIcon d="M12 5.5v13M5.5 12h13" />
            Add product
          </Fragment>
        }
        button
        up
      >
        {catalog.length === 0 && (
          <p className={`${prefix}__menu-empty`}>No products to add</p>
        )}
        {catalog.map((product, index) => (
          <button
            type="button"
            role="option"
            aria-selected={false}
            onClick={() => state.addProduct(product)}
            key={`${product.name}-${index}`}
          >
            <span>
              {product.name}
              <small>
                {money(product.price)}
                {" · "}
                {repeatOption(product.repeat).label.toLowerCase()}
              </small>
            </span>
          </button>
        ))}
      </BillingMenu>
      <span className={`${prefix}__spacer`} />
      <button
        type="button"
        className={`${prefix}__btn`}
        disabled={state.hasDiscount}
        onClick={state.addDiscount}
      >
        <BillingIcon d={DISCOUNT_ICON} />
        Add discount
      </button>
      <button
        type="button"
        className={`${prefix}__btn`}
        disabled={state.hasMinimum}
        onClick={state.addMinimum}
      >
        <BillingIcon d={MINIMUM_ICON} />
        Add minimum
      </button>
    </div>
  );
  const phaseTotalLabel = state.duration.months
    ? `Phase total (${state.duration.label})`
    : "Phase total";
  const totals = (
    <div className={`${prefix}__totals`} aria-live="polite">
      {clean ? (
        <Fragment>
          <span className={`${prefix}__total`}>
            <span className={`${prefix}__total-label`}>First invoice</span>
            <b>{money(state.firstInvoice)}</b>
          </span>
          <span className={`${prefix}__total ${prefix}__total--phase`}>
            {state.minimumApplies && <em>Minimum applies</em>}
            <span className={`${prefix}__total-label`}>{phaseTotalLabel}</span>
            <b>{money(state.phaseTotal)}</b>
          </span>
        </Fragment>
      ) : (
        <Fragment>
          <span>
            {"First invoice "}
            <b>{money(state.firstInvoice)}</b>
          </span>
          <span>
            {phaseTotalLabel} <b>{money(state.phaseTotal)}</b>
            {state.minimumApplies && <em>minimum applies</em>}
          </span>
        </Fragment>
      )}
    </div>
  );
  const heading = (
    <p className={`${prefix}__title`} dir="auto">
      {title}
    </p>
  );
  return (
    <div className={[prefix, className].filter(Boolean).join(" ")}>
      {clean ? (
        <Fragment>
          <div className={`${prefix}__head`}>
            {heading}
            {summary}
          </div>
          {fields}
          {table}
          {actions}
          {totals}
        </Fragment>
      ) : (
        <Fragment>
          {heading}
          <div className={`${prefix}__card`}>
            {summary}
            {fields}
            {table}
            {actions}
          </div>
          {totals}
        </Fragment>
      )}
    </div>
  );
}
const REPEAT_ICON =
  "M17 3.5 19.5 6 17 8.5M19.5 6H9a5 5 0 0 0-5 5M7 20.5 4.5 18 7 15.5M4.5 18H15a5 5 0 0 0 5-5";
const DISCOUNT_ICON =
  "M9 15 15 9M9.5 9.5h.01M14.5 14.5h.01M12 3l2.1 1.6 2.6-.2.9 2.5 2.3 1.2-.4 2.6L21 12.6l-1.5 2.1.4 2.6-2.3 1.2-.9 2.5-2.6-.2L12 21.4l-2.1-1.6-2.6.2-.9-2.5L4.1 16.3l.4-2.6L3 12l1.5-2.1-.4-2.6 2.3-1.2.9-2.5 2.6.2Z";
const MINIMUM_ICON = "M5 19.5h14M7 15.5h10M9 11.5h6M10 7.5h4M12 4v1";
const DURATIONS = [
  { id: "milestone", label: "Milestone", months: 0 },
  { id: "1m", label: "1 month", months: 1 },
  { id: "3m", label: "3 months", months: 3 },
  { id: "6m", label: "6 months", months: 6 },
  { id: "12m", label: "12 months", months: 12 },
] as const;
const REPEATS = [
  { id: "once", label: "Once", perYear: 0 },
  { id: "monthly", label: "Monthly", perYear: 12 },
  { id: "quarterly", label: "Quarterly", perYear: 4 },
  { id: "yearly", label: "Yearly", perYear: 1 },
] as const;
const DEFAULT_CATALOG: CatalogItem[] = [
  { name: "Set-up fee", repeat: "once", price: 4999 },
  { name: "Platform licence", repeat: "monthly", price: 1200 },
  { name: "Premium support", repeat: "monthly", price: 350 },
  { name: "Extra seats (10)", repeat: "monthly", price: 240 },
  { name: "Onboarding workshop", repeat: "once", price: 1500 },
];
const DEFAULT_LINES: ScheduleLine[] = [
  {
    id: "seed-1",
    kind: "product",
    name: "Set-up fee",
    repeat: "once",
    price: 4999,
    timing: "advance",
  },
];
// Each visual variant has its own counter, as each original entry point did.
const lineCounters = { default: 0, clean: 0 };
export { BillingSchedule };
export type { BillingScheduleValue };
export type { CatalogItem };
export type { ScheduleLine };
export type { BillingScheduleProps };
