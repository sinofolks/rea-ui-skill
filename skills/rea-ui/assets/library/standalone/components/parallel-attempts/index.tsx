"use client";

import "./ParallelAttempts.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useId,
  useState,
  type CSSProperties,
} from "react";
interface Attempt {
  id?: string;
  name?: string;
  icon?: ReactNode;
  model?: string;
  approach?: string;
  status?: "running" | "done" | "failed";
  progress?: number;
  step?: string;
  note?: string;
  /** Elapsed time in milliseconds. */
  took?: number;
  cost?: number;
  score?: number;
  [field: string]: unknown;
}
interface ParallelAttemptsProps {
  attempts: Attempt[];
  task?: string;
  picked?: string | null;
  onPick?: (attempt: Attempt) => void;
  formatCost?: (amount: number) => string;
  title?: string;
  className?: string;
}
type AttemptStyle = CSSProperties & {
  "--i": number;
  "--p": number;
};
function ParallelAttempts(props: ParallelAttemptsProps) {
  return <ParallelAttemptsView {...props} />;
}
function finiteValue(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function formatAttemptCost(value: number): string {
  if (value < 0) return `-${formatAttemptCost(-value)}`;
  if (value === 0) return "$0";
  if (value < 0.001) return "<$0.001";
  if (value < 0.01) return `$${value.toFixed(3)}`;
  if (value < 100) return `$${value.toFixed(2)}`;
  return `$${Math.round(value).toLocaleString("en-US")}`;
}
function formatAttemptDuration(milliseconds: number): string {
  const padded = (value: number) => String(value).padStart(2, "0");
  if (milliseconds < 1000) return `${Math.max(0, Math.round(milliseconds))}ms`;
  if (milliseconds < 10000) return `${(milliseconds / 1000).toFixed(1)}s`;
  const seconds = Math.round(milliseconds / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${padded(seconds % 60)}s`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? `${hours}h ${padded(minutes % 60)}m`
    : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function bestCompletedAttempt(attempts: Attempt[]): Attempt | undefined {
  return attempts
    .filter((attempt) => attempt.status === "done")
    .reduce<
      Attempt | undefined
    >((best, attempt) => (best === undefined || (finiteValue(attempt.score) ?? 0) > (finiteValue(best.score) ?? 0) ? attempt : best), undefined);
}
function AttemptsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="2.5" width="9" height="2.4" rx="1.2" fill="currentColor" />
      <rect
        x="1.5"
        y="6.8"
        width="12"
        height="2.4"
        rx="1.2"
        fill="currentColor"
        opacity="0.55"
      />
      <rect
        x="1.5"
        y="11.1"
        width="6"
        height="2.4"
        rx="1.2"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 14L8.5 17.5L19 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}
function ParallelAttemptsView({
  attempts,
  task,
  picked,
  onPick,
  formatCost = formatAttemptCost,
  title,
  className,
  clean = false,
}: ParallelAttemptsProps & {
  clean?: boolean;
}) {
  const prefix = clean ? "ui-pac" : "ui-pa";
  const [localPicked, setLocalPicked] = useState<string | null | undefined>(null);
  const titleId = useId();
  const finished = attempts.filter((attempt) => attempt.status !== "running");
  const best = bestCompletedAttempt(attempts);
  const allFinished = finished.length === attempts.length && attempts.length > 0;
  const pickedId =
    picked === undefined
      ? (localPicked ?? (allFinished ? (best?.id ?? null) : null))
      : picked;
  const totalCost = attempts.reduce(
    (total, attempt) => total + (finiteValue(attempt.cost) ?? 0),
    0,
  );
  function pickAttempt(attempt: Attempt) {
    setLocalPicked(attempt.id);
    onPick?.(attempt);
  }
  return (
    <div className={[prefix, className].filter(Boolean).join(" ")}>
      <header className={`${prefix}__bar`}>
        <span className={`${prefix}__mark`}>
          <AttemptsIcon />
        </span>
        <span className={`${prefix}__title`} id={titleId} dir="auto" title={title}>
          {title ?? `Best of ${countFormatter.format(attempts.length)}`}
        </span>
        {task && (
          <span className={`${prefix}__task`} dir="auto" title={task}>
            {task}
          </span>
        )}
        <span className={`${prefix}__sum`}>
          <span>
            <b>{countFormatter.format(finished.length)}</b>
            {" of "}
            {countFormatter.format(attempts.length)}
            {" done"}
          </span>
          <span>
            <b>{formatCost(totalCost)}</b>
          </span>
        </span>
      </header>
      <div className={`${prefix}__panel`} role="radiogroup" aria-labelledby={titleId}>
        {attempts.map((attempt, index) => {
          const isBest = allFinished && attempt.id === best?.id;
          const isPicked = attempt.id === pickedId;
          const statusText =
            attempt.status === "running"
              ? (attempt.step ?? "Working…")
              : (attempt.note ??
                (attempt.status ? statusLabels[attempt.status] : undefined));
          const progress =
            attempt.status === "done"
              ? 1
              : Math.max(0.03, Math.min(1, finiteValue(attempt.progress) ?? 0));
          const score = finiteValue(attempt.score);
          const elapsed = finiteValue(attempt.took);
          const cost = finiteValue(attempt.cost);
          const metadata = [
            elapsed === undefined ? undefined : formatAttemptDuration(elapsed),
            cost === undefined ? undefined : formatCost(cost),
          ]
            .filter(Boolean)
            .join(" · ");
          const rowStyle: AttemptStyle = { "--i": index, "--p": progress };
          return (
            <div
              className={`${prefix}__row`}
              data-status={attempt.status}
              data-best={isBest ? "" : undefined}
              data-picked={isPicked ? "" : undefined}
              data-quiet={allFinished && pickedId && !isPicked ? "" : undefined}
              style={rowStyle}
              key={attempt.id}
            >
              <span className={`${prefix}__icon`} aria-hidden="true">
                {attempt.icon ??
                  (attempt.name?.match(/[\p{L}\p{N}]/u)?.[0] ?? "").toUpperCase()}
              </span>
              <div className={`${prefix}__who`}>
                <span
                  className={`${prefix}__name`}
                  title={[attempt.name, attempt.model, attempt.approach]
                    .filter(Boolean)
                    .join(" · ")}
                >
                  <span className={`${prefix}__name-text`} dir="auto">
                    {attempt.name}
                  </span>
                  {attempt.model && (
                    <span className={`${prefix}__model`}>{attempt.model}</span>
                  )}
                  {attempt.approach && (
                    <span className={`${prefix}__approach`} dir="auto">
                      {attempt.approach}
                    </span>
                  )}
                </span>
                <span
                  className={`${prefix}__line`}
                  dir="auto"
                  title={statusText}
                  key={attempt.status}
                >
                  {statusText}
                </span>
              </div>
              <div className={`${prefix}__lane`} aria-hidden="true">
                <span className={`${prefix}__fill`} />
              </div>
              <div className={`${prefix}__end`}>
                <span className={`${prefix}__score`} key={attempt.status}>
                  {attempt.status === "running" ? (
                    <span className={`${prefix}__pct`}>
                      {Math.round(progress * 100)}
                      {"%"}
                    </span>
                  ) : attempt.status === "failed" ? (
                    <span className={`${prefix}__failed`}>Failed</span>
                  ) : (
                    <>
                      {isBest && <span className={`${prefix}__best`}>Best</span>}
                      {score === undefined ? statusLabels.done : Math.round(score)}
                    </>
                  )}
                </span>
                <span className={`${prefix}__meta-slot`}>
                  <span
                    className={`${prefix}__meta`}
                    data-hide={
                      attempt.status === "done" && (isPicked || allFinished)
                        ? ""
                        : undefined
                    }
                  >
                    {metadata}
                  </span>
                  {attempt.status === "done" && allFinished && (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={isPicked}
                      className={`${prefix}__use`}
                      data-on={isPicked ? "" : undefined}
                      onClick={() => pickAttempt(attempt)}
                      aria-label={`${isPicked ? "Using" : "Use"} ${attempt.name}${score === undefined ? "" : `, score ${Math.round(score)}`}`}
                    >
                      {isPicked ? (
                        <>
                          <CheckIcon />
                          {"In use"}
                        </>
                      ) : (
                        "Use this one"
                      )}
                    </button>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const countFormatter = new Intl.NumberFormat("en");
const statusLabels = { running: "Running", done: "Done", failed: "Failed" };
export { ParallelAttempts };
export type { Attempt };
export type { ParallelAttemptsProps };
