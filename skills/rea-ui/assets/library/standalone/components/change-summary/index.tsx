"use client";

import "./ChangeSummary.css";
import type { ReactNode } from "react";
/*
 * Change Summary – what moved since last time, one metric per row, in a gray tray with a white card, in component logic and public types.
 * Styles are provided by the sibling CSS import.
 */
export type MetricChange = {
  label: string;
  /** What happened, in words, e.g. "Up 6.1% to 18.2K" */
  change: string;
  /** good: green arrow · bad: red arrow · neutral: gray dash */
  tone?: "good" | "bad" | "neutral";
  /** Direction of the arrow – defaults to up for good, down for bad */
  direction?: "up" | "down";
};
export type ChangeSummaryProps = {
  title?: string;
  /** Small text on the right of the heading, e.g. "This week" */
  period?: string;
  icon?: ReactNode;
  changes: MetricChange[];
  className?: string;
};
export function ChangeSummary({
  title = "What's changed",
  period,
  icon,
  changes,
  className,
}: ChangeSummaryProps) {
  return (
    <>
      <section
        className={["ui-cs", className].filter(Boolean).join(" ")}
        aria-label={title}
      >
        <header className="ui-cs__head">
          <span className="ui-cs__title">
            <span className="ui-cs__icon">{icon ?? <ChangesIcon />}</span>
            <span className="ui-cs__title-text" dir="auto" title={title}>
              {title}
            </span>
          </span>
          {period && (
            <span className="ui-cs__period" dir="auto" title={period}>
              {period}
            </span>
          )}
        </header>
        {changes.length > 0 && (
          <dl className="ui-cs__card">
            {changes.map((c, i) => {
              // Anything but good or bad reads as neutral, so the mark always has its tint
              const tone = c.tone === "good" || c.tone === "bad" ? c.tone : "neutral";
              const direction = c.direction ?? (tone === "bad" ? "down" : "up");
              return (
                // The stagger stops after twelve rows, so a long list is all there at once
                <div
                  key={`${i}-${c.label}`}
                  className="ui-cs__row"
                  style={{ animationDelay: `${120 + Math.min(i, 12) * 70}ms` }}
                >
                  <dt className="ui-cs__label" dir="auto" title={c.label}>
                    {c.label}
                  </dt>
                  <dd className="ui-cs__change">
                    <span className="ui-cs__trend" data-tone={tone} aria-hidden="true">
                      {tone === "neutral" ? (
                        <DashIcon />
                      ) : (
                        <ArrowIcon down={direction === "down"} />
                      )}
                    </span>
                    <span className="ui-cs__text" dir="auto" title={c.change}>
                      {c.change}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </section>
    </>
  );
}
/* ---------- Icons ---------- */
const ChangesIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M2.5 4h4M2.5 8h8M6.5 12h7M9.5 4h1" />
  </svg>
);
const ArrowIcon = ({ down }: { down?: boolean }) => (
  <svg
    viewBox="0 0 12 12"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {down ? <path d="M6 2.5v7M3 6.5l3 3 3-3" /> : <path d="M6 9.5v-7M3 5.5l3-3 3 3" />}
  </svg>
);
const DashIcon = () => (
  <svg
    viewBox="0 0 12 12"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M3 6h6" />
  </svg>
);
