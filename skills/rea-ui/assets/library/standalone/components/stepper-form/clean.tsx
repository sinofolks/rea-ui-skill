"use client";

import "./StepperForm.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import type * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
  Fragment,
  type CSSProperties,
} from "react";
type StepperErrors<V extends object> = Partial<
  Record<Extract<keyof V, string>, string | undefined>
> &
  Record<string, string | undefined>;
interface StepperContext<V extends object> {
  values: V;
  /** Shallow-merge a partial update into the current form values. */
  setValues: (patch: Partial<V>) => void;
  errors: StepperErrors<V>;
  goTo: (stepId: string) => void;
  next: () => void;
}
interface Step<V extends object = Record<string, unknown>> {
  id: string;
  title: React.ReactNode;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  render: (context: StepperContext<V>) => React.ReactNode;
  validate?: (values: V) => StepperErrors<V> | null | undefined;
}
interface StepperFormProps<V extends object = Record<string, unknown>> {
  steps: Step<V>[];
  initialValues: V;
  onComplete?: (values: V) => void | Promise<void>;
  initialStep?: number;
  step?: number;
  onStepChange?: (step: number) => void;
  submitLabel?: string;
  submittingLabel?: string;
  success?: (values: V, reset: () => void) => React.ReactNode;
  className?: string;
}
interface StepperFieldProps {
  name: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  optional?: boolean;
  children: React.ReactNode;
}
interface StepperInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  ref?: React.Ref<HTMLInputElement>;
}
interface StepperTagsProps {
  value: string[];
  onChange: (tags: string[]) => void;
  validate?: (tag: string, currentTags: string[]) => string | null | undefined;
  max?: number;
  placeholder?: string;
}
interface StepperChoice<T extends string | number = string> {
  value: T;
  title: React.ReactNode;
  description?: React.ReactNode;
  aside?: React.ReactNode;
  badge?: string;
}
interface StepperChoicesProps<T extends string | number = string> {
  value: T;
  onChange: (value: T) => void;
  options: StepperChoice<T>[];
  label: string;
}
interface StepperReviewRow {
  label: React.ReactNode;
  value: React.ReactNode;
  step?: string;
}
interface StepperReviewProps {
  rows: StepperReviewRow[];
  onEdit?: (stepId: string) => void;
}
type Variant = "default" | "clean";
type FieldErrors = Record<string, string | undefined>;
type FieldError = string | null | undefined;
interface ValidationContext {
  errors: FieldErrors;
  shake: number;
  report: (name: string, error: FieldError) => void;
}
interface FieldContext {
  id: string;
  invalid: boolean;
  describedBy?: string;
  flag: (error: FieldError) => void;
}
type Skin = {
  variant: Variant;
};
interface PaneTransition {
  index: number;
  from: number | null;
  direction: 1 | -1;
}
function StepperForm<V extends object>(props: StepperFormProps<V>) {
  return <StepperFormView {...props} variant="clean" />;
}
function StepperField(props: StepperFieldProps) {
  return <Field {...props} variant="clean" />;
}
function StepperInput(props: StepperInputProps) {
  return <Input {...props} variant="clean" />;
}
function StepperTags(props: StepperTagsProps) {
  return <Tags {...props} variant="clean" />;
}
function StepperChoices<T extends string | number = string>(
  props: StepperChoicesProps<T>,
) {
  return <Choices {...props} variant="clean" />;
}
function StepperReview(props: StepperReviewProps) {
  return <Review {...props} variant="clean" />;
}
// The two exports have independent providers, just as two separately installed forms do.
function createFormContexts() {
  return {
    validation: createContext<ValidationContext>({
      errors: {},
      shake: 0,
      report: () => {},
    }),
    field: createContext<FieldContext | null>(null),
  };
}
function classPrefix(variant: Variant) {
  return variant === "clean" ? "ui-stpc" : "ui-stp";
}
function textValue(value: unknown): string {
  return value == null ? "" : String(value);
}
function sentenceCase(value: string): string {
  return value.replace(/\p{Lu}\p{Ll}+/gu, (word) => word.toLowerCase());
}
function hasErrors(errors: FieldErrors | null | undefined): boolean {
  return !!errors && Object.values(errors).some(Boolean);
}
function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function shakeControl(element: HTMLElement | null): void {
  if (!element || reducedMotion() || !element.animate) return;
  element.animate(
    [
      { transform: "none" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(4px)" },
      { transform: "translateX(-2px)" },
      { transform: "none" },
    ],
    { duration: 340, easing: "ease-out" },
  );
}
function FormIcon({
  variant,
  name,
}: Skin & {
  name: keyof typeof iconPaths;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${classPrefix(variant)}__glyph`}
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}
function DrawnCheck({ variant }: Skin) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${classPrefix(variant)}__draw`}
      aria-hidden="true"
    >
      <path d={iconPaths.check} pathLength={1} />
    </svg>
  );
}
function Field({
  variant,
  name,
  label,
  hint,
  optional,
  children,
}: StepperFieldProps & Skin) {
  const prefix = classPrefix(variant);
  const { errors, shake, report } = useContext(formContexts[variant].validation);
  const FieldProvider = formContexts[variant].field.Provider;
  const [localError, setLocalError] = useState<FieldError>(null);
  const [localAttempt, setLocalAttempt] = useState(0);
  const inputId = useId();
  const controlRef = useRef<HTMLDivElement>(null);
  const error = errors[name] ?? localError ?? "";
  const lastError = useRef(error);
  if (error) lastError.current = error;
  const invalid = !!error;
  useEffect(() => {
    if (shake && (errors[name] || localError)) shakeControl(controlRef.current);
  }, [shake]);
  useEffect(() => {
    if (localAttempt) shakeControl(controlRef.current);
  }, [localAttempt]);
  const flag = useCallback(
    (message: FieldError) => {
      setLocalError(message);
      report(name, message);
      if (message) setLocalAttempt((previous) => previous + 1);
    },
    [name, report],
  );
  return (
    <div className={`${prefix}__field`} data-invalid={invalid || undefined}>
      <label className={`${prefix}__label`} htmlFor={inputId} dir="auto">
        <span className={`${prefix}__label-text`}>{label}</span>
        {optional && <span className={`${prefix}__optional`}>Optional</span>}
      </label>
      <div ref={controlRef} className={`${prefix}__control`}>
        <FieldProvider
          value={{
            id: inputId,
            invalid,
            describedBy: invalid
              ? `${inputId}-msg`
              : hint
                ? `${inputId}-hint`
                : undefined,
            flag,
          }}
        >
          {children}
        </FieldProvider>
      </div>
      <div className={`${prefix}__fold`} data-open={invalid || undefined}>
        <div>
          <p
            className={`${prefix}__msg`}
            id={`${inputId}-msg`}
            dir="auto"
            key={lastError.current}
          >
            {lastError.current}
          </p>
        </div>
      </div>
      {hint && (
        <div className={`${prefix}__fold`} data-open={!invalid || undefined}>
          <div>
            <p className={`${prefix}__hint`} id={`${inputId}-hint`} dir="auto">
              {hint}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
function Input({
  variant,
  prefix: inputPrefix,
  className,
  ...inputProps
}: StepperInputProps & Skin) {
  const prefix = classPrefix(variant);
  const field = useContext(formContexts[variant].field);
  return (
    <div
      className={[`${prefix}__input`, className].filter(Boolean).join(" ")}
      data-invalid={field?.invalid || undefined}
    >
      {inputPrefix && (
        <span className={`${prefix}__prefix`} aria-hidden="true" title={inputPrefix}>
          {inputPrefix}
        </span>
      )}
      <input
        id={field?.id}
        aria-invalid={field?.invalid || undefined}
        aria-describedby={field?.describedBy}
        autoComplete="off"
        spellCheck={false}
        {...inputProps}
      />
    </div>
  );
}
function validateEmail(value: string, current: string[]): FieldError {
  if (!emailPattern.test(value)) return "That doesn't look like an email address";
  return current.includes(value) ? "Already on the list" : null;
}
function Tags({
  variant,
  value,
  onChange,
  placeholder = "name@company.com",
  validate = validateEmail,
  max,
}: StepperTagsProps & Skin) {
  const prefix = classPrefix(variant);
  const field = useContext(formContexts[variant].field);
  const [draft, setDraft] = useState("");
  const [removing, setRemoving] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chipsRef = useRef<HTMLUListElement>(null);
  const valueRef = useRef(value);
  valueRef.current = value;
  const containerRef = useRef<HTMLDivElement>(null);
  const previousCount = useRef(value.length);
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (variant === "clean" && container && value.length > previousCount.current) {
      container.scrollTo({
        left: container.scrollWidth,
        behavior: reducedMotion() ? "auto" : "smooth",
      });
    }
    previousCount.current = value.length;
  }, [value.length]);
  function addTags(text: string): boolean {
    const entries = text
      .split(/[\s,;]+/)
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean);
    if (!entries.length) return true;
    const next = [...valueRef.current];
    const rejected: string[] = [];
    let firstError: FieldError = null;
    for (const entry of entries) {
      const error =
        max !== undefined && next.length >= max ? `Up to ${max}` : validate(entry, next);
      if (error) {
        firstError ??= error;
        rejected.push(entry);
      } else next.push(entry);
    }
    if (next.length !== valueRef.current.length) {
      valueRef.current = next;
      onChange(next);
    }
    setDraft(rejected.join(", "));
    field?.flag(firstError);
    return !firstError;
  }
  function removeTag(entry: string): void {
    if (removing.includes(entry)) return;
    setRemoving((previous) => [...previous, entry]);
    const chip = chipsRef.current?.querySelector<HTMLElement>(
      `[data-entry="${CSS.escape(entry)}"]`,
    );
    const finish = () => {
      setRemoving((previous) => previous.filter((item) => item !== entry));
      onChange(valueRef.current.filter((item) => item !== entry));
    };
    if (chip && chip.animate && !reducedMotion()) {
      chip.animate(
        [
          {
            width: `${chip.offsetWidth}px`,
            marginRight: "0px",
            opacity: 1,
            transform: "none",
          },
          {
            width: "0px",
            marginRight: "-6px",
            opacity: 0,
            transform: "scale(0.85)",
          },
        ],
        {
          duration: 240,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      ).onfinish = finish;
    } else finish();
  }
  return (
    <div
      ref={variant === "clean" ? containerRef : undefined}
      className={`${prefix}__tags`}
      data-invalid={field?.invalid || undefined}
      onClick={(event) => {
        if (event.target === event.currentTarget) inputRef.current?.focus();
      }}
    >
      {value.length > 0 && (
        <ul ref={chipsRef} className={`${prefix}__chips`} aria-label="Added">
          {value.map((entry) => (
            <li
              className={`${prefix}__chip`}
              data-entry={entry}
              data-leaving={removing.includes(entry) || undefined}
              key={entry}
            >
              <span className={`${prefix}__chip-text`} title={entry}>
                {entry}
              </span>
              <button
                type="button"
                className={`${prefix}__chip-x`}
                aria-label={`Remove ${entry}`}
                onClick={() => removeTag(entry)}
              >
                <FormIcon variant={variant} name="close" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        ref={inputRef}
        id={field?.id}
        type="email"
        inputMode="email"
        autoComplete="off"
        spellCheck={false}
        className={`${prefix}__tags-input`}
        placeholder={value.length ? "Add another" : placeholder}
        value={draft}
        aria-invalid={field?.invalid || undefined}
        aria-describedby={field?.describedBy}
        onChange={(event) => {
          setDraft(event.target.value);
          field?.flag(null);
        }}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" && draft.trim()) ||
            event.key === "," ||
            event.key === ";"
          ) {
            event.preventDefault();
            addTags(draft);
          } else if (event.key === "Backspace" && !draft && value.length) {
            event.preventDefault();
            removeTag(value[value.length - 1]);
          }
        }}
        onPaste={(event) => {
          const text = event.clipboardData.getData("text");
          if (/[\s,;]/.test(text.trim())) {
            event.preventDefault();
            addTags(`${draft} ${text}`);
          }
        }}
        onBlur={() => {
          if (draft.trim()) addTags(draft);
        }}
      />
    </div>
  );
}
function positionChoiceRing(
  container: HTMLDivElement | null,
  ring: HTMLSpanElement | null,
): void {
  if (!container || !ring) return;
  const selected = container.querySelector<HTMLElement>('[aria-checked="true"]');
  if (!selected?.offsetWidth) {
    ring.style.opacity = "0";
    return;
  }
  const firstMeasurement = !ring.dataset.ready;
  if (firstMeasurement) ring.style.transition = "none";
  ring.style.opacity = "1";
  ring.style.width = `${selected.offsetWidth}px`;
  ring.style.height = `${selected.offsetHeight}px`;
  ring.style.transform = `translate(${selected.offsetLeft}px, ${selected.offsetTop}px)`;
  if (firstMeasurement) {
    ring.dataset.ready = "1";
    void ring.offsetWidth;
    ring.style.transition = "";
  }
}
function Choices<T extends string | number>({
  variant,
  value,
  onChange,
  options,
  label,
}: StepperChoicesProps<T> & Skin) {
  const prefix = classPrefix(variant);
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => positionChoiceRing(containerRef.current, ringRef.current));
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() =>
      positionChoiceRing(container, ringRef.current),
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  const selectedIndex = options.findIndex((option) => option.value === value);
  return (
    <div
      ref={containerRef}
      className={`${prefix}__choices`}
      role="radiogroup"
      aria-label={label}
      onKeyDown={(event) => {
        if (!options.length) return;
        const direction =
          event.key === "ArrowRight" || event.key === "ArrowDown"
            ? 1
            : event.key === "ArrowLeft" || event.key === "ArrowUp"
              ? -1
              : 0;
        if (direction) {
          event.preventDefault();
          const index = (selectedIndex + direction + options.length) % options.length;
          onChange(options[index].value);
          containerRef.current
            ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
            ?.focus();
        } else if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.closest("form")?.requestSubmit();
        }
      }}
    >
      <span ref={ringRef} className={`${prefix}__ring`} aria-hidden="true" />
      {options.map((option, index) => {
        const selected = index === selectedIndex;
        return (
          <button
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            data-value={option.value}
            data-index={index}
            className={`${prefix}__choice`}
            onClick={() => onChange(option.value)}
            key={`${option.value}#${index}`}
          >
            <span className={`${prefix}__choice-top`}>
              <span
                className={`${prefix}__choice-title`}
                dir="auto"
                title={textValue(option.title)}
              >
                {option.title}
              </span>
              {option.badge && (
                <span className={`${prefix}__badge`} title={option.badge}>
                  {option.badge}
                </span>
              )}
              <span className={`${prefix}__radio`} aria-hidden="true" />
            </span>
            {option.aside && (
              <span className={`${prefix}__choice-aside`}>{option.aside}</span>
            )}
            {option.description && (
              <span className={`${prefix}__choice-desc`} dir="auto">
                {option.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
function Review({ variant, rows, onEdit }: StepperReviewProps & Skin) {
  const prefix = classPrefix(variant);
  return (
    <dl className={`${prefix}__review`}>
      {rows.map((row, index) => (
        <div className={`${prefix}__review-row`} key={`${textValue(row.label)}#${index}`}>
          <dt dir="auto">{row.label}</dt>
          <dd dir="auto">{row.value}</dd>
          {row.step && onEdit && (
            <button
              type="button"
              className={`${prefix}__edit`}
              aria-label={`Edit ${sentenceCase(textValue(row.label))}`}
              onClick={() => onEdit(row.step!)}
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </dl>
  );
}
function Success({
  variant,
  title,
  description,
  children,
}: Skin & {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  const prefix = classPrefix(variant);
  return (
    <div className={`${prefix}__success`}>
      <span className={`${prefix}__success-check`}>
        <DrawnCheck variant={variant} />
      </span>
      <h2 className={`${prefix}__heading`} tabIndex={-1}>
        {title}
      </h2>
      {description && <p className={`${prefix}__desc`}>{description}</p>}
      {children && <div className={`${prefix}__success-actions`}>{children}</div>}
    </div>
  );
}
function clampStep(index: number, count: number): number {
  return Number.isFinite(index)
    ? Math.max(0, Math.min(Math.max(count - 1, 0), Math.trunc(index)))
    : 0;
}
function useStepper<V extends object>(
  {
    steps,
    initialValues,
    onComplete,
    initialStep = 0,
    step,
    onStepChange,
    submitLabel = "Finish",
    submittingLabel = "Creating…",
  }: StepperFormProps<V>,
  variant: Variant,
) {
  const count = steps.length;
  const prefix = classPrefix(variant);
  const [localStep, setLocalStep] = useState(initialStep);
  const currentIndex = clampStep(step ?? localStep, count);
  const [values, setFormValues] = useState(initialValues);
  const valuesRef = useRef(values);
  const [furthestVisited, setFurthestVisited] = useState(currentIndex);
  const reachableIndex = Math.max(furthestVisited, currentIndex);
  const [validatedSteps, setValidatedSteps] = useState<Record<number, boolean>>({});
  const [validationAttempt, setValidationAttempt] = useState(0);
  const [returnTo, setReturnTo] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const buttonContentRef = useRef<HTMLSpanElement>(null);
  const focusNextPane = useRef(false);
  const hasNavigated = useRef(false);
  const fieldErrors = useRef<FieldErrors>({});
  const headingId = useId();
  const visibleIndex = completed ? count : currentIndex;
  const [transition, setTransition] = useState<PaneTransition>({
    index: visibleIndex,
    from: null,
    direction: 1,
  });
  if (transition.index !== visibleIndex) {
    setTransition({
      index: visibleIndex,
      from: transition.index,
      direction: visibleIndex > transition.index ? 1 : -1,
    });
  }
  useEffect(() => {
    if (transition.from === null) return;
    const timer = window.setTimeout(
      () => setTransition((previous) => ({ ...previous, from: null })),
      420,
    );
    return () => clearTimeout(timer);
  }, [transition.index, transition.from]);
  const reportFieldError = useCallback((name: string, error: FieldError) => {
    fieldErrors.current = {
      ...fieldErrors.current,
      [name]: error ?? undefined,
    };
  }, []);
  const setValues = useCallback((patch: Partial<V>) => {
    valuesRef.current = { ...valuesRef.current, ...patch };
    setFormValues(valuesRef.current);
  }, []);
  function moveTo(index: number): void {
    const destination = Math.max(0, Math.min(count - 1, index));
    if (destination === currentIndex) return;
    focusNextPane.current = true;
    hasNavigated.current = true;
    fieldErrors.current = {};
    if (step === undefined) setLocalStep(destination);
    onStepChange?.(destination);
    setFurthestVisited((previous) => Math.max(previous, destination));
    setSubmitError("");
    setAnnouncement(
      `Step ${formatNumber(destination + 1)} of ${formatNumber(count)}: ${textValue(steps[destination].title)}`,
    );
  }
  function validateCurrent(): boolean {
    const errors = {
      ...fieldErrors.current,
      ...steps[currentIndex].validate?.(valuesRef.current),
    };
    if (hasErrors(errors)) {
      setValidatedSteps((previous) => ({ ...previous, [currentIndex]: true }));
      setValidationAttempt((previous) => previous + 1);
      setAnnouncement(Object.values(errors).find(Boolean) ?? "Check this step");
      return false;
    }
    setValidatedSteps((previous) => ({ ...previous, [currentIndex]: false }));
    return true;
  }
  async function submit(event?: FormEvent<HTMLFormElement>): Promise<void> {
    event?.preventDefault();
    if (submitting || completed || !validateCurrent()) return;
    if (currentIndex < count - 1) {
      if (returnTo !== null && returnTo > currentIndex) {
        setReturnTo(null);
        moveTo(returnTo);
      } else moveTo(currentIndex + 1);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      await onComplete?.(valuesRef.current);
      focusNextPane.current = true;
      hasNavigated.current = true;
      setCompleted(true);
      setAnnouncement("All done");
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong – try again";
      setSubmitError(message);
      setAnnouncement(message);
    } finally {
      setSubmitting(false);
    }
  }
  function back(): void {
    setReturnTo(null);
    moveTo(currentIndex - 1);
  }
  function navigate(index: number): void {
    if (index < 0 || index >= count || index === currentIndex) return;
    if (index > currentIndex && !validateCurrent()) return;
    setReturnTo(index < currentIndex ? currentIndex : null);
    moveTo(index);
  }
  function goTo(stepId: string): void {
    navigate(steps.findIndex((candidate) => candidate.id === stepId));
  }
  function reset(): void {
    valuesRef.current = initialValues;
    setFormValues(initialValues);
    setValidatedSteps({});
    setReturnTo(null);
    setFurthestVisited(clampStep(initialStep, count));
    setCompleted(false);
    setSubmitError("");
    focusNextPane.current = true;
    hasNavigated.current = true;
    fieldErrors.current = {};
    const destination = clampStep(initialStep, count);
    if (step === undefined) setLocalStep(destination);
    onStepChange?.(destination);
  }
  useEffect(() => {
    if (!focusNextPane.current) return;
    focusNextPane.current = false;
    const pane = viewportRef.current?.querySelector<HTMLElement>('[data-pane="current"]');
    const focusTarget =
      pane?.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not(:disabled), textarea, select',
      ) ?? pane?.querySelector<HTMLElement>(`.${prefix}__heading`);
    focusTarget?.focus({ preventScroll: true });
  }, [visibleIndex]);
  useEffect(() => {
    if (validationAttempt)
      viewportRef.current
        ?.querySelector<HTMLElement>('[data-pane="current"] [aria-invalid="true"]')
        ?.focus({ preventScroll: true });
  }, [validationAttempt]);
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const pane = viewport?.querySelector<HTMLElement>('[data-pane="current"]');
    if (!viewport || !pane) return;
    const firstMeasurement = !viewport.dataset.ready;
    const measure = () => {
      viewport.style.height = `${pane.offsetHeight}px`;
    };
    if (firstMeasurement) viewport.style.transition = "none";
    measure();
    if (firstMeasurement) {
      viewport.dataset.ready = "1";
      void viewport.offsetWidth;
      viewport.style.transition = "";
    }
    const observer = new ResizeObserver(measure);
    observer.observe(pane);
    return () => observer.disconnect();
  }, [visibleIndex]);
  useLayoutEffect(() => {
    const button = submitButtonRef.current;
    const content = buttonContentRef.current;
    if (!button || !content) return;
    const measure = () => {
      button.style.width = `${content.offsetWidth}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);
  const currentStep = steps[currentIndex];
  const errors: StepperErrors<V> = validatedSteps[currentIndex]
    ? (currentStep?.validate?.(values) ?? {})
    : {};
  const valid = !hasErrors(currentStep?.validate?.(values));
  const buttonLabel = submitting
    ? submittingLabel
    : currentIndex === count - 1
      ? submitLabel
      : returnTo !== null && returnTo > currentIndex
        ? `Back to ${sentenceCase(textValue(steps[returnTo].title))}`
        : "Continue";
  const context: StepperContext<V> = {
    values,
    setValues,
    errors,
    goTo,
    next: () => formRef.current?.requestSubmit(),
  };
  const panes =
    transition.from !== null && transition.from !== transition.index
      ? [transition.from, transition.index]
      : [transition.index];
  return {
    prefix,
    count,
    currentIndex,
    currentStep,
    values,
    reachableIndex,
    errors,
    validationAttempt,
    submitting,
    submitError,
    completed,
    announcement,
    headingId,
    transition,
    hasNavigated,
    context,
    panes,
    valid,
    buttonLabel,
    formRef,
    viewportRef,
    submitButtonRef,
    buttonContentRef,
    reportFieldError,
    submit,
    back,
    navigate,
    reset,
  };
}
function StepperFormView<V extends object>(
  props: StepperFormProps<V> & {
    variant: Variant;
  },
) {
  const { steps, success, className, variant } = props;
  const form = useStepper(props, variant);
  const { prefix, count, currentIndex, completed, submitting, transition } = form;
  const ValidationProvider = formContexts[variant].validation.Provider;
  if (!count) return null;
  function renderPane(index: number) {
    if (index >= count)
      return success ? (
        success(form.values, form.reset)
      ) : (
        <Success
          variant={variant}
          title="All set"
          description="Everything is saved. You can change it any time."
        />
      );
    const paneStep = steps[index];
    const context =
      index === currentIndex ? form.context : { ...form.context, errors: {} };
    return (
      <Fragment>
        <h2
          className={`${prefix}__heading`}
          tabIndex={-1}
          id={`${form.headingId}-h${index}`}
          dir="auto"
        >
          {paneStep.heading ?? paneStep.title}
        </h2>
        {paneStep.description && (
          <p className={`${prefix}__desc`} dir="auto">
            {paneStep.description}
          </p>
        )}
        <div className={`${prefix}__body`}>{paneStep.render(context)}</div>
      </Fragment>
    );
  }
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      style={{ [`--${prefix}-n`]: count } as CSSProperties}
    >
      <div className={`${prefix}__head`}>
        <div className={`${prefix}__steps`}>
          <ol className={`${prefix}__list`} aria-label="Progress">
            {steps.map((step, index) => {
              const state =
                completed || (index < form.reachableIndex && index !== currentIndex)
                  ? "done"
                  : index === currentIndex
                    ? "current"
                    : "upcoming";
              const navigable =
                !completed &&
                !submitting &&
                index !== currentIndex &&
                index <= form.reachableIndex;
              const label = (
                <Fragment>
                  {variant === "clean" && (
                    <span className={`${prefix}__bar`} aria-hidden="true" />
                  )}
                  <span className={`${prefix}__mark`}>
                    {state === "done" ? (
                      <DrawnCheck variant={variant} key="check" />
                    ) : (
                      <span key="num">
                        {index + 1}
                        {variant === "default" && "."}
                      </span>
                    )}
                  </span>
                  <span className={`${prefix}__step-label`} dir="auto">
                    {step.title}
                  </span>
                  <span className={`${prefix}__sr`}>
                    {state === "done"
                      ? " (done)"
                      : state === "current"
                        ? " (current)"
                        : ""}
                  </span>
                </Fragment>
              );
              return (
                <li
                  className={`${prefix}__step`}
                  data-state={state}
                  aria-current={!completed && index === currentIndex ? "step" : undefined}
                  key={`${step.id}#${index}`}
                >
                  {navigable ? (
                    <button
                      type="button"
                      className={`${prefix}__step-btn`}
                      title={textValue(step.title) || undefined}
                      onClick={() => form.navigate(index)}
                    >
                      {label}
                    </button>
                  ) : (
                    <span
                      className={`${prefix}__step-btn`}
                      title={textValue(step.title) || undefined}
                    >
                      {label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <div className={`${prefix}__compact`} aria-hidden="true">
          <span
            className={`${prefix}__compact-text`}
            key={completed ? "done" : currentIndex}
          >
            {completed ? (
              <Fragment>
                {"All "}
                {count.toLocaleString("en-US")}
                {" steps done"}
              </Fragment>
            ) : (
              <Fragment>
                {"Step "}
                {(currentIndex + 1).toLocaleString("en-US")}
                {" of "}
                {count.toLocaleString("en-US")}
                <span className={`${prefix}__compact-dot`}>·</span>
                <span className={`${prefix}__compact-title`} dir="auto">
                  {form.currentStep.title}
                </span>
              </Fragment>
            )}
          </span>
        </div>
      </div>
      <form
        ref={form.formRef}
        className={`${prefix}__card`}
        noValidate
        onSubmit={form.submit}
        aria-labelledby={completed ? undefined : `${form.headingId}-h${currentIndex}`}
      >
        <div ref={form.viewportRef} className={`${prefix}__viewport`}>
          {form.panes.map((index) => {
            const current = index === transition.index;
            return (
              <div
                className={`${prefix}__pane`}
                data-pane={current ? "current" : "leaving"}
                data-dir={transition.direction}
                data-first={!form.hasNavigated.current || undefined}
                inert={!current}
                aria-hidden={!current || undefined}
                key={index}
              >
                <ValidationProvider
                  value={{
                    errors: current && index === currentIndex ? form.errors : {},
                    shake: current ? form.validationAttempt : 0,
                    report: form.reportFieldError,
                  }}
                >
                  {renderPane(index)}
                </ValidationProvider>
              </div>
            );
          })}
        </div>
        <div className={`${prefix}__foot-fold`} data-hidden={completed || undefined}>
          <div className={`${prefix}__foot`} inert={completed}>
            <button
              type="button"
              className={`${prefix}__btn ${prefix}__btn-ghost`}
              data-hidden={currentIndex === 0 || undefined}
              disabled={currentIndex === 0 || submitting}
              onClick={form.back}
            >
              <FormIcon variant={variant} name="back" />
              Back
            </button>
            {form.submitError && (
              <span className={`${prefix}__submit-error`} role="alert" dir="auto">
                {form.submitError}
              </span>
            )}
            <button
              ref={form.submitButtonRef}
              type="submit"
              className={`${prefix}__btn ${prefix}__btn-primary`}
              aria-disabled={!form.valid || submitting || undefined}
              data-busy={submitting || undefined}
            >
              <span ref={form.buttonContentRef} className={`${prefix}__btn-inner`}>
                {submitting && (
                  <span className={`${prefix}__spinner`} aria-hidden="true" />
                )}
                <span
                  className={`${prefix}__btn-label`}
                  title={form.buttonLabel}
                  key={form.buttonLabel}
                >
                  {form.buttonLabel}
                </span>
              </span>
            </button>
          </div>
        </div>
      </form>
      <span className={`${prefix}__sr`} aria-live="polite">
        {form.announcement}
      </span>
    </div>
  );
}
const formContexts = {
  default: createFormContexts(),
  clean: createFormContexts(),
};
const iconPaths = {
  check: "M5.5 12.5l4 4L18.5 8",
  close: "M7 7l10 10M17 7 7 17",
  back: "M14.5 6l-6 6 6 6",
};
const emailPattern = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;
const formatNumber = (value: number) => value.toLocaleString("en-US");
export { StepperForm };
export { StepperField };
export { StepperInput };
export { StepperTags };
export { StepperChoices };
export { StepperReview };
export type { StepperErrors };
export type { StepperContext };
export type { Step };
export type { StepperFormProps };
export type { StepperFieldProps };
export type { StepperInputProps };
export type { StepperTagsProps };
export type { StepperChoice };
export type { StepperChoicesProps };
export type { StepperReviewRow };
export type { StepperReviewProps };
