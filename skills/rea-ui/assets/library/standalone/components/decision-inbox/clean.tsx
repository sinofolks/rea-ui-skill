"use client";

import "./DecisionInbox.clean.css";
import { useState } from "react";
/*
 * Decision Inbox (clean style) – open decisions with two quick answers each, in one white card, in component logic and public types.
 * A heading row with the count sits at the top of the card; every decision is a row under a hairline.
 * Answering a decision confirms it briefly, then folds it away and the count goes down.
 * Styles are provided by the sibling CSS import.
 */
export type Decision = {
  id: string;
  title: string;
  /** Short context under the title */
  detail?: string;
  /** Main answer, shown as the dark button */
  primary: string;
  /** Other answer, shown as the light button */
  secondary: string;
  /** Starts folded to one muted line – click to open */
  collapsed?: boolean;
};
export type DecisionInboxProps = {
  decisions: Decision[];
  /** Called with the decision and the chosen answer */
  onDecide?: (decision: Decision, answer: "primary" | "secondary") => void;
  className?: string;
};
type State = {
  open: boolean;
  answered?: string;
  gone?: boolean;
};
export function DecisionInbox({ decisions, onDecide, className }: DecisionInboxProps) {
  const [state, setState] = useState<Record<string, State>>(() =>
    Object.fromEntries(decisions.map((d) => [d.id, { open: !d.collapsed }])),
  );
  const patch = (id: string, next: Partial<State>) =>
    setState((s) => ({ ...s, [id]: { ...s[id], ...next } }));
  const open = decisions.filter((d) => !state[d.id]?.answered).length;
  // 1284 → "1,284"
  const count = new Intl.NumberFormat("en").format(open);
  const decide = (d: Decision, answer: "primary" | "secondary") => {
    patch(d.id, { answered: answer === "primary" ? d.primary : d.secondary });
    onDecide?.(d, answer);
    // Show the confirmation for a moment, then fold the row away and open the next folded one
    window.setTimeout(() => {
      setState((s) => {
        const next = { ...s, [d.id]: { ...s[d.id], gone: true } };
        const folded = decisions.find(
          (x) => x.id !== d.id && !next[x.id]?.open && !next[x.id]?.answered,
        );
        if (folded) next[folded.id] = { ...next[folded.id], open: true };
        return next;
      });
    }, 1100);
  };
  return (
    <>
      <section
        className={["ui-dic", className].filter(Boolean).join(" ")}
        data-clear={open === 0 || undefined}
      >
        <header className="ui-dic__head" aria-live="polite">
          {open > 0 ? (
            <>
              <AlertIcon />
              <span>
                {count} {open === 1 ? "needs" : "need"} your input
              </span>
            </>
          ) : (
            <>
              <DoneIcon />
              <span>All caught up</span>
            </>
          )}
        </header>

        <div className="ui-dic__card">
          {decisions.map((d) => {
            const s = state[d.id] ?? { open: true };
            return (
              <div
                key={d.id}
                className="ui-dic__row"
                data-gone={s.gone || undefined}
                inert={s.gone}
              >
                <div className="ui-dic__row-inner">
                  <div
                    className="ui-dic__item"
                    data-open={s.open || undefined}
                    data-answered={s.answered ? true : undefined}
                  >
                    {s.open ? (
                      <p className="ui-dic__title" dir="auto">
                        {d.title}
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="ui-dic__title ui-dic__title--folded"
                        dir="auto"
                        title={d.title}
                        onClick={() => patch(d.id, { open: true })}
                      >
                        {d.title}
                      </button>
                    )}
                    <div className="ui-dic__body" data-open={s.open || undefined}>
                      <div className="ui-dic__body-inner">
                        {d.detail && (
                          <p className="ui-dic__detail" dir="auto">
                            {d.detail}
                          </p>
                        )}
                        <div className="ui-dic__actions">
                          {s.answered ? (
                            <span className="ui-dic__done" role="status">
                              <DoneIcon />
                              <span dir="auto">{s.answered}</span>
                            </span>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="ui-dic__btn ui-dic__btn--primary"
                                dir="auto"
                                onClick={() => decide(d, "primary")}
                              >
                                {d.primary}
                              </button>
                              <button
                                type="button"
                                className="ui-dic__btn"
                                dir="auto"
                                onClick={() => decide(d, "secondary")}
                              >
                                {d.secondary}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <p className="ui-dic__empty">
            Nothing waiting on you – new decisions show up here.
          </p>
        </div>
      </section>
    </>
  );
}
/* ---------- Icons ---------- */
// Solid glyphs – the cut-out mark takes the card color, so it works in dark mode too
const AlertIcon = () => (
  <svg
    className="ui-dic__glyph"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      d="M6.7 2.3a1.5 1.5 0 0 1 2.6 0l5.4 9.4A1.5 1.5 0 0 1 13.4 14H2.6a1.5 1.5 0 0 1-1.3-2.3Z"
      fill="currentColor"
    />
    <path
      className="ui-dic__cut"
      d="M8 5.8v3.2"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
    <circle className="ui-dic__cut-dot" cx="8" cy="11.3" r="0.8" />
  </svg>
);
const DoneIcon = () => (
  <svg
    className="ui-dic__glyph"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6.5" fill="currentColor" />
    <path
      className="ui-dic__cut"
      d="m5.3 8.2 1.8 1.8 3.6-3.8"
      fill="none"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
