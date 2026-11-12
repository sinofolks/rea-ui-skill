"use client";

import "./Switch.css";
import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
/*
 * Switch – component logic and public types.
 * On or off for something that takes effect right away: a real checkbox with role="switch", a label and a quiet
 * second line, the switch at the start or at the end of the row (settings rows put it on the right). The thumb
 * slides and stretches while it's pressed. Focus shows a ring only from the keyboard.
 * Styles are provided by the sibling CSS import.
 */
export type SwitchProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "size" | "role"
> & {
  /** Shown next to the switch; clicking it toggles */
  label?: ReactNode;
  /** A quiet second line under the label */
  description?: ReactNode;
  /** start: the switch before the text · end: after it, across the row – the settings look */
  placement?: "start" | "end";
  /** sm 16 · md 20 high */
  size?: "sm" | "md";
};
export function Switch({
  label,
  description,
  placement = "start",
  size = "md",
  className,
  id,
  disabled,
  ref,
  "aria-describedby": describedBy,
  ...rest
}: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? `${autoId}-input`;
  const descId = `${autoId}-desc`;
  return (
    <div
      className={["ui-sw", className].filter(Boolean).join(" ")}
      data-placement={placement === "end" ? "end" : "start"}
      data-size={size === "sm" ? "sm" : "md"}
      data-disabled={disabled || undefined}
    >
      {/* React 19 hoists this into <head> once, no matter how many switches render */}

      <label className="ui-sw__row" htmlFor={inputId}>
        <span className="ui-sw__control">
          <input
            {...rest}
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            className="ui-sw__input"
            disabled={disabled}
            aria-describedby={
              [describedBy, description ? descId : null].filter(Boolean).join(" ") ||
              undefined
            }
          />
          <span className="ui-sw__track" aria-hidden="true">
            <span className="ui-sw__thumb" />
          </span>
        </span>
        {(label != null || description != null) && (
          <span className="ui-sw__text">
            {label != null && <span className="ui-sw__label">{label}</span>}
            {description != null && (
              <span className="ui-sw__desc" id={descId}>
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    </div>
  );
}
