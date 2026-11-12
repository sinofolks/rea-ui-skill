"use client";

import "./DecisionInbox.css";
import { useState } from "react";
/*
 * Decision Inbox – open decisions with two quick actions each, in a gray tray with a white card, in component logic and public types.
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
        className={["ui-di", className].filter(Boolean).join(" ")}
        data-clear={open === 0 || undefined}
      >
        <header className="ui-di__head" aria-live="polite">
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

        <div className="ui-di__card">
          {decisions.map((d) => {
            const s = state[d.id] ?? { open: true };
            return (
              <div
                key={d.id}
                className="ui-di__row"
                data-gone={s.gone || undefined}
                inert={s.gone}
              >
                <div className="ui-di__row-inner">
                  <div
                    className="ui-di__item"
                    data-open={s.open || undefined}
                    data-answered={s.answered ? true : undefined}
                  >
                    {s.open ? (
                      <p className="ui-di__title" dir="auto">
                        {d.title}
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="ui-di__title ui-di__title--folded"
                        dir="auto"
                        title={d.title}
                        onClick={() => patch(d.id, { open: true })}
                      >
                        {d.title}
                      </button>
                    )}
                    <div className="ui-di__body" data-open={s.open || undefined}>
                      <div className="ui-di__body-inner">
                        {d.detail && (
                          <p className="ui-di__detail" dir="auto">
                            {d.detail}
                          </p>
                        )}
                        <div className="ui-di__actions">
                          {s.answered ? (
                            <span className="ui-di__done" role="status">
                              <DoneIcon />
                              <span dir="auto">{s.answered}</span>
                            </span>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="ui-di__btn ui-di__btn--primary"
                                dir="auto"
                                onClick={() => decide(d, "primary")}
                              >
                                {d.primary}
                              </button>
                              <button
                                type="button"
                                className="ui-di__btn"
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
          <p className="ui-di__empty">
            Nothing waiting on you – new decisions show up here.
          </p>
        </div>
      </section>
    </>
  );
}
/* ---------- Icons ---------- */
const AlertIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path
      d="M6.7 2.3a1.5 1.5 0 0 1 2.6 0l5.4 9.4A1.5 1.5 0 0 1 13.4 14H2.6a1.5 1.5 0 0 1-1.3-2.3Z"
      fill="currentColor"
    />
    <path d="M8 5.6v3.6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11.4" r="0.85" fill="#fff" />
  </svg>
);
const DoneIcon = () => (
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
