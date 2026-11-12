"use client";

import "./ProgressTracker.clean.css";
import { useEffect, useRef, useState, type ReactNode } from "react";
/*
 * Progress Tracker – a checklist with a progress bar, in component logic and public types.
 * Styles are provided by the sibling CSS import.
 * Clean style: one white card with hairline shadows, quiet gray type, a thin blue bar
 * and blue checks.
 */
export type ProgressStep = {
  id: string;
  label: string;
  done?: boolean;
  /** Small icon on the right, e.g. the app the step belongs to */
  icon?: ReactNode;
};
export type ProgressTrackerProps = {
  title?: string;
  steps: ProgressStep[];
  /** Ticks the open steps one after another, then starts over – stops as soon as someone interacts */
  autoPlay?: boolean;
  /** Pause between two automatic steps, in ms */
  interval?: number;
  onChange?: (steps: ProgressStep[]) => void;
  className?: string;
};
export function ProgressTracker({
  title = "Getting started",
  steps: initial,
  autoPlay = false,
  interval = 2200,
  onChange,
  className,
}: ProgressTrackerProps) {
  const [done, setDone] = useState(
    () => new Set(initial.filter((s) => s.done).map((s) => s.id)),
  );
  const [playing, setPlaying] = useState(autoPlay);
  // Steps added later bring their own done state; steps that go away no longer count
  const seen = useRef(new Set(initial.map((s) => s.id)));
  const ids = initial.map((s) => s.id).join("|");
  useEffect(() => {
    const fresh = initial.filter((s) => !seen.current.has(s.id));
    fresh.forEach((s) => seen.current.add(s.id));
    if (fresh.some((s) => s.done))
      setDone(
        (prev) => new Set([...prev, ...fresh.filter((s) => s.done).map((s) => s.id)]),
      );
  }, [ids]); // eslint-disable-line react-hooks/exhaustive-deps
  const total = initial.length;
  const count = initial.filter((s) => done.has(s.id)).length;
  const progress = total ? count / total : 0;
  const toggle = (id: string) => {
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setDone(next);
    onChange?.(initial.map((s) => ({ ...s, done: next.has(s.id) })));
  };
  // Auto play: tick the next open step; when all are done, start over
  useEffect(() => {
    if (!playing) return;
    const open = initial.find((s) => !done.has(s.id));
    const t = window.setTimeout(
      () => {
        if (open) toggle(open.id);
        else setDone(new Set(initial.filter((s) => s.done).map((s) => s.id)));
      },
      open ? interval : interval * 2,
    );
    return () => clearTimeout(t);
  }, [playing, done]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      className={["ui-progressc", className].filter(Boolean).join(" ")}
      data-complete={count === total || undefined}
      onPointerDown={() => setPlaying(false)}
      onKeyDown={() => setPlaying(false)}
    >
      {/* React 19 hoists this into <head> once, no matter how many trackers render */}

      <div className="ui-progressc__head">
        <h3 className="ui-progressc__title" dir="auto" title={title}>
          {title}
        </h3>
        <span className="ui-progressc__count" aria-hidden="true">
          <span className="ui-progressc__digit" key={count}>
            {num.format(count)}
          </span>
          /{num.format(total)}
        </span>
      </div>

      <div
        className="ui-progressc__bar"
        role="progressbar"
        aria-label={title}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={count}
        aria-valuetext={`${num.format(count)} of ${num.format(total)} done`}
      >
        <span className="ui-progressc__fill" style={{ transform: `scaleX(${progress})` }}>
          {/* A new key replays the shine each time progress grows */}
          <span className="ui-progressc__shine" key={count} />
        </span>
      </div>

      <ul className="ui-progressc__list">
        {initial.map((step, index) => {
          const checked = done.has(step.id);
          return (
            <li
              key={step.id}
              style={{ animationDelay: `${180 + Math.min(index, 12) * 90}ms` }}
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                className="ui-progressc__step"
                onClick={() => toggle(step.id)}
              >
                <span className="ui-progressc__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6.5 12.5l3.5 3.5 7.5-8" pathLength={1} />
                  </svg>
                </span>
                <span className="ui-progressc__label" title={step.label || undefined}>
                  {/* An empty label keeps the row's height */}
                  <span dir="auto">{step.label || "\u00a0"}</span>
                </span>
                {step.icon && (
                  <span className="ui-progressc__icon" aria-hidden="true">
                    {step.icon}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
// 1284 → "1,284"
const num = new Intl.NumberFormat("en");
