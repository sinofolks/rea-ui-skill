"use client";

import "./TipsPanel.css";
import { useState, type ReactNode } from "react";
/*
 * Tips Panel – a panel of short tips, each with one action, in a gray tray with a white card, in component logic and public types.
 * Taking an action marks the tip as done; the list scrolls inside the white card, framed by the gray tray.
 * Styles are provided by the sibling CSS import.
 */
export type Tip = {
  id: string;
  title: string;
  /** Short explanation – may contain a <Kbd> */
  description: ReactNode;
  /** Button text */
  action: string;
  /** Text after the action was taken, e.g. "Enabled" */
  doneLabel?: string;
  /** Shows the action as the dark button – use once for the most important tip */
  primary?: boolean;
  onAction?: () => void;
};
export type TipsPanelProps = {
  title?: string;
  tips: Tip[];
  /** Shows the Close button in the footer */
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
};
export function TipsPanel({
  title = "Tips",
  tips,
  onClose,
  closeLabel = "Close",
  className,
}: TipsPanelProps) {
  const [done, setDone] = useState<Set<string>>(new Set());
  // Tips that share an id still get their own key, so marking one never marks the other
  const seen = new Map<string, number>();
  const keyed = tips.map((tip) => {
    const n = seen.get(tip.id) ?? 0;
    seen.set(tip.id, n + 1);
    return { tip, key: n ? `${tip.id}#${n}` : tip.id };
  });
  // Only tips that are still in the list count
  const doneCount = keyed.filter((k) => done.has(k.key)).length;
  return (
    <>
      <section
        className={["ui-tp", className].filter(Boolean).join(" ")}
        aria-label={title}
      >
        <header className="ui-tp__head">
          <h3 className="ui-tp__title" dir="auto">
            {title}
          </h3>
          <span className="ui-tp__count" aria-live="polite">
            {count.format(doneCount)}/{count.format(tips.length)} done
          </span>
        </header>

        <div className="ui-tp__card">
          <ul className="ui-tp__grid">
            {keyed.map(({ tip, key }, i) => {
              const isDone = done.has(key);
              return (
                <li
                  key={key}
                  className="ui-tp__tip"
                  data-done={isDone || undefined}
                  style={{ animationDelay: `${80 + Math.min(i, 12) * 50}ms` }}
                >
                  <p className="ui-tp__tip-title" dir="auto">
                    {tip.title}
                  </p>
                  <p className="ui-tp__tip-text" dir="auto">
                    {tip.description}
                  </p>
                  {isDone ? (
                    <span className="ui-tp__done" role="status">
                      <CheckIcon />
                      {tip.doneLabel ?? "Done"}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className={["ui-tp__btn", tip.primary && "ui-tp__btn--primary"]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        setDone((d) => new Set(d).add(key));
                        tip.onAction?.();
                      }}
                    >
                      {tip.action}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {onClose && (
          <footer className="ui-tp__foot">
            <button type="button" className="ui-tp__btn" onClick={onClose}>
              {closeLabel}
            </button>
          </footer>
        )}
      </section>
    </>
  );
}
const count = new Intl.NumberFormat("en");
/** Keyboard key for tip descriptions, e.g. <Kbd>⌘K</Kbd> */
export const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="ui-tp__kbd">{children}</kbd>
);
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="currentColor" />
    <path
      d="m5 8.2 2 2 4-4.2"
      fill="none"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
