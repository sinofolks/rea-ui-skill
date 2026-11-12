"use client";

import "./Checkbox.clean.css";
import {
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
/*
 * Checkbox – component logic and public types, clean style.
 * A real checkbox with a label and a quiet second line, a third "some of them" state, an error, and a card variant
 * where the whole row is the target. The box fills and its check draws itself. Focus shows a ring only from the
 * keyboard. Styles are provided by the sibling CSS import.
 */
export type CheckboxProps = Omit<ComponentPropsWithRef<"input">, "type" | "size"> & {
  /** Shown next to the box; clicking it toggles */
  label?: ReactNode;
  /** A quiet second line under the label */
  description?: ReactNode;
  /** "Some of them" – a dash instead of the check, e.g. for Select all */
  indeterminate?: boolean;
  /** Marks it invalid and shows this under it */
  error?: ReactNode;
  /** plain: the box and its text · card: a bordered row that is clickable as a whole and lights up when checked */
  variant?: "plain" | "card";
};
export function Checkbox({
  label,
  description,
  indeterminate = false,
  error,
  variant = "plain",
  className,
  id,
  disabled,
  ref,
  "aria-describedby": describedBy,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? `${autoId}-input`;
  const descId = `${autoId}-desc`;
  const errorId = `${autoId}-error`;
  const input = useRef<HTMLInputElement | null>(null);
  const showsError = error != null && typeof error !== "boolean" && error !== "";
  // Indeterminate is a property, not an attribute
  useEffect(() => {
    if (input.current) input.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <div
      className={["ui-chkc", className].filter(Boolean).join(" ")}
      data-variant={variant === "card" ? "card" : "plain"}
      data-invalid={error ? true : undefined}
      data-disabled={disabled || undefined}
    >
      {/* React 19 hoists this into <head> once, no matter how many checkboxes render */}

      <label className="ui-chkc__row" htmlFor={inputId}>
        <span className="ui-chkc__control">
          <input
            {...rest}
            ref={(el) => {
              input.current = el;
              if (el) el.indeterminate = indeterminate;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
            id={inputId}
            type="checkbox"
            className="ui-chkc__input"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              [describedBy, description ? descId : null, showsError ? errorId : null]
                .filter(Boolean)
                .join(" ") || undefined
            }
            data-indeterminate={indeterminate || undefined}
          />
          <span className="ui-chkc__box" aria-hidden="true">
            <svg className="ui-chkc__mark" viewBox="0 0 16 16" width="16" height="16">
              <path className="ui-chkc__tick" d="M4 8.5 6.75 11.25 12 5" pathLength={1} />
              <path className="ui-chkc__dash" d="M4.5 8h7" pathLength={1} />
            </svg>
          </span>
        </span>
        {(label != null || description != null) && (
          <span className="ui-chkc__text">
            {label != null && <span className="ui-chkc__label">{label}</span>}
            {description != null && (
              <span className="ui-chkc__desc" id={descId}>
                {description}
              </span>
            )}
          </span>
        )}
      </label>
      {showsError && (
        <p className="ui-chkc__error" id={errorId} aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
