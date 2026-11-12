"use client";

import "./TextArea.clean.css";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
/*
 * Text Area – component logic and public types, clean style.
 * The multi-line twin of the Text Field: a label, a hint the error takes the place of, a character count, a box that
 * grows with the text between minRows and maxRows (then scrolls), an optional button that gives it more room and
 * ⌘/Ctrl+Enter to send. White with a hairline shadow; focus only firms up the edge – no ring.
 * Styles are provided by the sibling CSS import.
 */
export type TextAreaProps = Omit<ComponentPropsWithRef<"textarea">, "rows"> & {
  /** Shown above the field and tied to it */
  label?: ReactNode;
  /** A quiet line under the field – the error takes its place while there is one */
  hint?: ReactNode;
  /** Marks the field invalid and shows this under it, in place of the hint */
  error?: ReactNode;
  /** "Optional" next to the label */
  optional?: boolean;
  /** Shows "120/2000" under the field; needs maxLength */
  counter?: boolean;
  /** Height when empty, in lines */
  minRows?: number;
  /** It grows with the text up to this many lines, then scrolls */
  maxRows?: number;
  /** A small button in the corner that gives the field more room (expandedRows) and back */
  expandable?: boolean;
  /** Lines while expanded */
  expandedRows?: number;
  /** Controls the expanded state from outside */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** ⌘/Ctrl+Enter – e.g. save or send without leaving the keyboard */
  onSubmitShortcut?: (value: string) => void;
  /** Extra class on the textarea itself; className goes on the wrapper */
  inputClassName?: string;
};
export function TextArea({
  label,
  hint,
  error,
  optional = false,
  counter = false,
  minRows = 3,
  maxRows = 10,
  expandable = false,
  expandedRows = 16,
  expanded: expandedProp,
  onExpandedChange,
  onSubmitShortcut,
  className,
  inputClassName,
  id,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  disabled,
  readOnly,
  maxLength,
  ref,
  "aria-describedby": describedBy,
  ...rest
}: TextAreaProps) {
  const autoId = useId();
  const inputId = id ?? `${autoId}-input`;
  const messageId = `${autoId}-message`;
  const counterId = `${autoId}-count`;
  const area = useRef<HTMLTextAreaElement | null>(null);
  // The current text, for the count and the height – follows value when controlled, the field itself otherwise
  const [own, setOwn] = useState(String(defaultValue ?? ""));
  const text = value !== undefined && value !== null ? String(value) : own;
  const [ownExpanded, setOwnExpanded] = useState(false);
  const expanded = expandable && (expandedProp ?? ownExpanded);
  // The height glides only when the room changes on purpose – never while typing
  const [gliding, setGliding] = useState(false);
  const glideTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(glideTimer.current), []);
  const invalid =
    Boolean(error) || rest["aria-invalid"] === true || rest["aria-invalid"] === "true";
  const message = shows(error) ? error : shows(hint) ? hint : null;
  const showCount = counter && typeof maxLength === "number";
  const fallbackName =
    label == null &&
    !rest["aria-label"] &&
    !rest["aria-labelledby"] &&
    typeof rest.placeholder === "string"
      ? rest.placeholder
      : undefined;
  // Fits the height to the text: at least minRows (expandedRows while expanded), at most maxRows, then it scrolls
  const fit = () => {
    const el = area.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const line = parseFloat(cs.lineHeight) || 20;
    const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const min = (expanded ? Math.max(expandedRows, minRows) : minRows) * line + pad;
    const max =
      (expanded ? Math.max(expandedRows, maxRows) : Math.max(maxRows, minRows)) * line +
      pad;
    const before = el.style.height;
    el.style.height = "auto";
    const needed = el.scrollHeight;
    const next = Math.min(Math.max(needed, min), max);
    // Back to the old height and a read, so a glide starts from there and not from "auto"
    el.style.height = before;
    void el.offsetHeight;
    el.style.height = `${next}px`;
    el.style.overflowY = needed > max + 1 ? "auto" : "hidden";
  };
  useLayoutEffect(fit, [text, expanded, minRows, maxRows, expandedRows]); // eslint-disable-line react-hooks/exhaustive-deps
  // A narrower or wider field wraps differently – measure again
  useEffect(() => {
    const el = area.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    let width = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth === width) return;
      width = el.clientWidth;
      fit();
    });
    // A new text size (a touch screen, a zoom) changes the line height too
    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", fit);
    ro.observe(el);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", fit);
    };
  }); // eslint-disable-line react-hooks/exhaustive-deps
  // An uncontrolled field follows form.reset(), so the count and the height don't keep the old text
  useEffect(() => {
    const form = area.current?.form;
    if (!form || value !== undefined) return;
    const onReset = () => window.setTimeout(() => setOwn(area.current?.value ?? ""));
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [value]);
  const toggle = () => {
    const next = !expanded;
    setGliding(true);
    window.clearTimeout(glideTimer.current);
    glideTimer.current = window.setTimeout(() => setGliding(false), 320);
    if (expandedProp === undefined) setOwnExpanded(next);
    onExpandedChange?.(next);
  };
  return (
    <div
      className={["ui-tac", className].filter(Boolean).join(" ")}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-expandable={expandable || undefined}
    >
      {/* React 19 hoists this into <head> once, no matter how many fields render */}

      {label != null && (
        <div className="ui-tac__head">
          <label className="ui-tac__label" htmlFor={inputId}>
            {label}
          </label>
          {optional && <span className="ui-tac__optional">Optional</span>}
        </div>
      )}
      <div className="ui-tac__box">
        <textarea
          {...rest}
          ref={(el) => {
            area.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          id={inputId}
          className={["ui-tac__input", inputClassName].filter(Boolean).join(" ")}
          rows={minRows}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          dir={rest.dir ?? "auto"}
          aria-label={rest["aria-label"] ?? fallbackName}
          aria-invalid={invalid || undefined}
          aria-describedby={
            [describedBy, message ? messageId : null, showCount ? counterId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-keyshortcuts={
            onSubmitShortcut ? "Meta+Enter Control+Enter" : rest["aria-keyshortcuts"]
          }
          data-gliding={gliding || undefined}
          onChange={(e) => {
            if (value === undefined) setOwn(e.target.value);
            onChange?.(e);
          }}
          onKeyDown={(e) => {
            if (
              onSubmitShortcut &&
              e.key === "Enter" &&
              (e.metaKey || e.ctrlKey) &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              onSubmitShortcut(e.currentTarget.value);
            }
            onKeyDown?.(e);
          }}
        />
        {expandable && !disabled && (
          <button
            type="button"
            className="ui-tac__expand"
            aria-label={expanded ? "Less room" : "More room"}
            aria-pressed={expanded}
            aria-controls={inputId}
            onClick={toggle}
          >
            <span className="ui-tac__swap" key={expanded ? "less" : "more"}>
              {expanded ? <CollapseIcon /> : <ExpandIcon />}
            </span>
          </button>
        )}
      </div>
      {(message || showCount) && (
        <div className="ui-tac__foot">
          {/* The error swaps in where the hint was, so the form below doesn't move */}
          <p
            className="ui-tac__message"
            id={messageId}
            key={shows(error) ? "error" : "hint"}
            dir="auto"
            aria-live={shows(error) ? "polite" : undefined}
          >
            {message}
          </p>
          {showCount && (
            <span
              className="ui-tac__count"
              id={counterId}
              data-full={text.length === maxLength || undefined}
              data-over={text.length > maxLength || undefined}
            >
              {text.length.toLocaleString()}/{maxLength.toLocaleString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
/** Text or an element – not true, false, null or an empty string */
const shows = (v: ReactNode) => v != null && typeof v !== "boolean" && v !== "";
/* Icons: Hugeicons Free (MIT), drawn at 16px */
function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16.5 3h4.5v4.5M21 3l-6 6M7.5 21H3v-4.5M3 21l6-6" />
    </svg>
  );
}
function CollapseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 5v4.5H19M14.5 9.5 20 4M9.5 19v-4.5H5M9.5 14.5 4 20" />
    </svg>
  );
}
