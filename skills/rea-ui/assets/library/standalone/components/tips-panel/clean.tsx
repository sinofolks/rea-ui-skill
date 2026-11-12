"use client";

import "./TipsPanel.clean.css";
import { useState, type ReactNode } from "react";
/*
 * Tips Panel (clean style) – a panel of short tips, each with one action, in one white card, in component logic and public types.
 * Taking an action marks the tip as done; only the tip list scrolls – the heading and the Close row stay in place.
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
        className={["ui-tpc", className].filter(Boolean).join(" ")}
        aria-label={title}
      >
        <header className="ui-tpc__head">
          <h3 className="ui-tpc__title" dir="auto">
            {title}
          </h3>
          <span className="ui-tpc__count" aria-live="polite">
            {count.format(doneCount)}/{count.format(tips.length)} done
          </span>
        </header>

        <div className="ui-tpc__body">
          <ul className="ui-tpc__grid">
            {keyed.map(({ tip, key }, i) => {
              const isDone = done.has(key);
              return (
                <li
                  key={key}
                  className="ui-tpc__tip"
                  data-done={isDone || undefined}
                  style={{ animationDelay: `${80 + Math.min(i, 12) * 50}ms` }}
                >
                  <p className="ui-tpc__tip-title" dir="auto">
                    {tip.title}
                  </p>
                  <p className="ui-tpc__tip-text" dir="auto">
                    {tip.description}
                  </p>
                  {isDone ? (
                    <span className="ui-tpc__done" role="status">
                      <CheckIcon />
                      {tip.doneLabel ?? "Done"}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className={["ui-tpc__btn", tip.primary && "ui-tpc__btn--primary"]
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
          <footer className="ui-tpc__foot">
            <button type="button" className="ui-tpc__btn" onClick={onClose}>
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
  <kbd className="ui-tpc__kbd">{children}</kbd>
);
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" fill="currentColor" />
    <path
      d="m5.6 8.1 1.7 1.7 3.2-3.4"
      fill="none"
      stroke="#fff"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
