"use client";

import "./AgentSteering.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type SVGProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
  Fragment,
  useId,
  type KeyboardEvent,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type SteerStep = {
  id?: string;
  title?: string;
  status?: string;
  duration?: number;
  startedAt?: number | Date;
  notes?: SteerNote[];
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type SteerNote = {
  id?: string;
  name?: string;
  label?: string;
  text?: string;
  picked?: string | boolean;
  [field: string]: unknown;
};
interface AgentSteeringProps {
  title?: string;
  agent?: string;
  steps: SteerStep[];
  queue: SteerNote[];
  status?: "running" | "paused" | "done";
  startedAt?: number | Date;
  onQueue?: (text: string) => void;
  onInterrupt?: (text: string, queuedId?: string) => void;
  onRemove?: (id: string) => void;
  draft?: string;
  onDraftChange?: (text: string) => void;
  onPause?: () => void;
  onResume?: () => void;
  placeholder?: string;
  highlight?: string;
  compose?: boolean;
  className?: string;
}
interface Note {
  id: string;
  text: string;
  picked: string | boolean | undefined;
}
interface Step {
  id: string;
  title: string | undefined;
  status: "done" | "active" | "pending";
  duration: number | undefined;
  startedAt: number | undefined;
  notes: Note[];
}
function AgentSteering(props: AgentSteeringProps) {
  return <AgentSteeringView {...props} clean />;
}
function timestamp(value: unknown): number | undefined {
  return typeof value === "number"
    ? value
    : value instanceof Date
      ? value.getTime()
      : undefined;
}
function normalizeNote(note: SteerNote): Note {
  return {
    id: note.id ?? "",
    text: typeof note.text === "string" ? note.text : "",
    picked:
      typeof note.picked === "string" || typeof note.picked === "boolean"
        ? note.picked
        : undefined,
  };
}
function normalizeStep(step: SteerStep): Step {
  const notes = Array.isArray(step.notes)
    ? step.notes.filter(
        (note): note is SteerNote => note !== null && typeof note === "object",
      )
    : [];
  return {
    id: step.id ?? "",
    title: step.title,
    status: step.status === "done" || step.status === "active" ? step.status : "pending",
    duration: typeof step.duration === "number" ? step.duration : undefined,
    startedAt: timestamp(step.startedAt),
    notes: notes.map(normalizeNote),
  };
}
function formatElapsed(milliseconds: number): string {
  const seconds = Number.isFinite(milliseconds)
    ? Math.max(0, Math.floor(milliseconds / 1000))
    : 0;
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${String(minutes % 60).padStart(2, "0")}m`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function formatStepDuration(milliseconds: number): string {
  if (!Number.isFinite(milliseconds)) return "";
  return milliseconds < 60000
    ? `${(Math.max(0, milliseconds) / 1000).toFixed(1)}s`
    : formatElapsed(milliseconds);
}
/** A single 100ms timer updates every visible live duration. */
function useSharedClock(live: boolean): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!live) return;
    const update = () => setNow(Date.now());
    update();
    clockSubscribers.add(update);
    if (!clockInterval)
      clockInterval = window.setInterval(
        () => clockSubscribers.forEach((notify) => notify()),
        100,
      );
    return () => {
      clockSubscribers.delete(update);
      if (!clockSubscribers.size) {
        window.clearInterval(clockInterval);
        clockInterval = 0;
      }
    };
  }, [live]);
  return now;
}
/** Capture positions before a list change, then move notes from their queue location. */
function useSteeringMotion(
  rootRef: RefObject<HTMLDivElement | null>,
  heightRef: RefObject<HTMLDivElement | null>,
  steps: Step[],
  queue: Note[],
) {
  const elements = useRef(new Map<string, HTMLElement>());
  const previousRects = useRef(new Map<string, DOMRect>());
  const previousHeight = useRef(0);
  const layoutKey = JSON.stringify([
    steps.map((step) => [
      step.id,
      step.status,
      step.title,
      step.notes.map((note) => note.id),
    ]),
    queue.map((note) => note.id),
  ]);
  const previousKey = useRef(layoutKey);
  if (rootRef.current && layoutKey !== previousKey.current) {
    previousRects.current = new Map(
      [...elements.current].map(([id, element]) => [id, element.getBoundingClientRect()]),
    );
    previousHeight.current = heightRef.current?.offsetHeight ?? 0;
  }
  useLayoutEffect(() => {
    if (previousKey.current === layoutKey) return;
    previousKey.current = layoutKey;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = heightRef.current;
    if (
      container &&
      previousHeight.current &&
      Math.abs(container.offsetHeight - previousHeight.current) > 1
    ) {
      container.animate(
        [
          { height: `${previousHeight.current}px` },
          { height: `${container.offsetHeight}px` },
        ],
        { duration: 480, easing: MOTION_EASING },
      );
    }
    for (const [id, element] of elements.current) {
      const noteId = id.slice(id.indexOf(":") + 1);
      const before =
        previousRects.current.get(id) ??
        (id.startsWith("note:")
          ? previousRects.current.get(`queued:${noteId}`)
          : undefined);
      const after = element.getBoundingClientRect();
      if (!before) {
        element.animate(
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 360, easing: MOTION_EASING },
        );
        continue;
      }
      const deltaX = before.left - after.left;
      const deltaY = before.top - after.top;
      if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) continue;
      const movedFromQueue = !previousRects.current.has(id);
      element.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)`, zIndex: 2 },
          { transform: "none", zIndex: 2 },
        ],
        { duration: movedFromQueue ? 620 : 480, easing: MOTION_EASING },
      );
      if (movedFromQueue) element.setAttribute("data-landed", "");
    }
  }, [layoutKey]);
  return (id: string) => (element: HTMLElement | null) => {
    if (element) elements.current.set(id, element);
    else elements.current.delete(id);
  };
}
function ElapsedTime({
  from,
  live,
  format,
}: {
  from: number;
  live: boolean;
  format: (milliseconds: number) => string;
}) {
  const now = useSharedClock(live);
  return <>{format(now - from)}</>;
}
function AgentSteeringView({
  title,
  agent,
  steps: inputSteps,
  queue: inputQueue,
  status = "running",
  startedAt,
  onQueue,
  onInterrupt,
  onRemove,
  draft,
  onDraftChange,
  onPause,
  onResume,
  placeholder = "Steer the agent…",
  highlight,
  compose = true,
  className,
  clean,
}: AgentSteeringProps & {
  clean: boolean;
}) {
  const prefix = clean ? "ui-stc" : "ui-st";
  const steps = inputSteps.map(normalizeStep);
  const queue = inputQueue.map(normalizeNote);
  const fieldId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [internalDraft, setInternalDraft] = useState("");
  const draftText = draft ?? internalDraft;
  const [announcement, setAnnouncement] = useState("");
  const modifierKey =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
      ? "⌘"
      : "Ctrl";
  const running = status === "running";
  const mountedAt = useRef(Date.now());
  const runStart =
    startedAt === undefined
      ? mountedAt.current
      : typeof startedAt === "number"
        ? startedAt
        : startedAt.getTime();
  const stepStarts = useRef(new Map<string, number>());
  const completedSteps = steps.filter((step) => step.status === "done").length;
  const canCompose = status !== "done";
  const trackElement = useSteeringMotion(
    rootRef,
    clean ? cardRef : rootRef,
    steps,
    queue,
  );
  function updateDraft(text: string) {
    setInternalDraft(text);
    onDraftChange?.(text);
  }
  function stepStart(step: Step): number {
    if (step.startedAt !== undefined) return step.startedAt;
    const existing = stepStarts.current.get(step.id);
    if (existing !== undefined) return existing;
    const now = Date.now();
    stepStarts.current.set(step.id, now);
    return now;
  }
  const pickedIds = steps
    .flatMap((step) => step.notes.filter((note) => note.picked).map((note) => note.id))
    .join("|");
  const announcedIds = useRef(new Set(pickedIds.split("|").filter(Boolean)));
  useEffect(() => {
    for (const step of steps)
      for (const note of step.notes) {
        if (note.picked && !announcedIds.current.has(note.id)) {
          announcedIds.current.add(note.id);
          setAnnouncement(`${agent ?? "The agent"} picked up: ${note.text}`);
        }
      }
  }, [pickedIds]);
  function sendDraft(interrupt: boolean) {
    const text = draftText.trim();
    if (!text || !canCompose) return;
    if (interrupt) onInterrupt?.(text);
    else onQueue?.(text);
    setAnnouncement(
      interrupt ? `Interrupting: ${text}` : `Queued for the next step: ${text}`,
    );
    updateDraft("");
  }
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      sendDraft(event.metaKey || event.ctrlKey);
    } else if (event.key === "Escape" && draftText) {
      event.stopPropagation();
      updateDraft("");
    }
  }
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.style.height = "0px";
      input.style.height = `${Math.min(input.scrollHeight, 60)}px`;
    }
  }, [draftText]);
  const elapsed = <ElapsedTime from={runStart} live={running} format={formatElapsed} />;
  const statusText =
    status === "done" ? (
      <>Done in {elapsed}</>
    ) : status === "paused" ? (
      "Paused"
    ) : (
      <>Running · {elapsed}</>
    );
  const controls = (
    <>
      {queue.length > 0 && (
        <div className={`${prefix}__queue`} ref={trackElement("queue:box")}>
          <div className={`${prefix}__label`}>
            {"Queued for the next step "}
            <span>{formatCount.format(queue.length)}</span>
          </div>
          <ul className={`${prefix}__queued`}>
            {queue.map((note) => (
              <li
                ref={trackElement(`queued:${note.id}`)}
                className={`${prefix}__chip`}
                key={note.id}
              >
                <span className={`${prefix}__chip-text`} dir="auto">
                  {note.text}
                </span>
                {onInterrupt && canCompose && (
                  <button
                    type="button"
                    className={`${prefix}__chip-btn`}
                    title={`Apply now (${modifierKey}↵)`}
                    onClick={() => onInterrupt(note.text, note.id)}
                  >
                    <InterruptIcon />
                    Now
                  </button>
                )}
                {onRemove && (
                  <button
                    type="button"
                    className={`${prefix}__chip-x`}
                    aria-label={`Remove “${note.text}”`}
                    onClick={() => onRemove(note.id)}
                  >
                    <RemoveIcon />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {compose && (
        <div
          className={`${prefix}__compose`}
          ref={trackElement("compose:box")}
          data-disabled={canCompose ? undefined : ""}
        >
          <div
            className={`${prefix}__field`}
            onClick={(event) => {
              if (!(event.target instanceof Element) || !event.target.closest("button"))
                inputRef.current?.focus({ preventScroll: true });
            }}
          >
            <textarea
              ref={inputRef}
              id={`${fieldId}-field`}
              rows={1}
              value={draftText}
              disabled={!canCompose}
              placeholder={canCompose ? placeholder : "The run has finished"}
              aria-label="Steer the agent"
              dir="auto"
              aria-describedby={`${fieldId}-hint`}
              onChange={(event) => updateDraft(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className={`${prefix}__send`}
              aria-label="Queue for the next step"
              disabled={!draftText.trim() || !canCompose}
              onClick={() => sendDraft(false)}
            >
              <SendIcon />
            </button>
          </div>
          <div className={`${prefix}__hint`} id={`${fieldId}-hint`}>
            {canCompose ? (
              <Fragment>
                <span>
                  <kbd>↵</kbd>
                  {" next step"}
                </span>
                {onInterrupt && (
                  <span>
                    <kbd>{modifierKey}</kbd>
                    <kbd>↵</kbd>
                    {" interrupt now"}
                  </span>
                )}
              </Fragment>
            ) : (
              <span>Notes still in the queue were not used</span>
            )}
          </div>
        </div>
      )}
    </>
  );
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-status={status}
    >
      <div ref={cardRef} className={`${prefix}__card`}>
        <header className={`${prefix}__head`}>
          <span className={`${prefix}__spark`}>
            <SparkIcon />
          </span>
          <div className={`${prefix}__heading`}>
            <span className={`${prefix}__title`} dir="auto" title={title}>
              {title}
            </span>
            <span className={`${prefix}__sub`}>
              {agent && (
                <Fragment>
                  <span className={`${prefix}__agent`} title={agent}>
                    {agent}
                  </span>
                  {steps.length > 0 && (
                    <span className={`${prefix}__dot`} aria-hidden="true">
                      ·
                    </span>
                  )}
                </Fragment>
              )}
              {steps.length > 0 && (
                <span className={`${prefix}__count`}>
                  {status === "done"
                    ? `${formatCount.format(steps.length)} ${steps.length === 1 ? "step" : "steps"}`
                    : `Step ${formatCount.format(Math.min(completedSteps + 1, steps.length))} of ${formatCount.format(steps.length)}`}
                </span>
              )}
            </span>
          </div>
          <span className={`${prefix}__state`} data-status={status}>
            <span className={`${prefix}__pulse`} aria-hidden="true" />
            {statusText}
          </span>
          {running && onPause && (
            <button
              type="button"
              className={`${prefix}__icon-btn`}
              aria-label="Pause the run"
              title="Pause"
              onClick={onPause}
            >
              <PauseIcon />
            </button>
          )}
          {status === "paused" && onResume && (
            <button
              type="button"
              className={`${prefix}__icon-btn`}
              aria-label="Resume the run"
              title="Resume"
              onClick={onResume}
            >
              <ResumeIcon />
            </button>
          )}
        </header>
        {steps.length > 0 && (
          <ol className={`${prefix}__plan`} aria-label="Plan">
            {steps.map((step) => (
              <li
                ref={trackElement(`step:${step.id}`)}
                className={`${prefix}__step`}
                data-status={step.status}
                data-faded={highlight && !highlight.includes(step.id) ? "" : undefined}
                aria-current={step.status === "active" ? "step" : undefined}
                key={step.id}
              >
                <div className={`${prefix}__step-row`}>
                  <StepIcon prefix={prefix} status={step.status} />
                  <span className={`${prefix}__step-title`} dir="auto" title={step.title}>
                    {step.title}
                  </span>
                  <span className={`${prefix}__step-time`}>
                    {step.status === "done" && step.duration !== undefined ? (
                      formatStepDuration(step.duration)
                    ) : step.status === "active" && running ? (
                      <ElapsedTime
                        from={stepStart(step)}
                        live
                        format={formatStepDuration}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                {step.notes.map((note) => (
                  <div
                    ref={trackElement(`note:${note.id}`)}
                    className={`${prefix}__note`}
                    data-picked={note.picked ?? undefined}
                    key={note.id}
                  >
                    <NoteIcon />
                    <span className={`${prefix}__note-text`} dir="auto">
                      {note.text}
                    </span>
                    {note.picked && (
                      <span className={`${prefix}__note-tag`}>
                        <CheckIcon />
                        {note.picked === "now" ? "Interrupted" : "Picked up"}
                      </span>
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ol>
        )}
        {clean && controls}
      </div>
      {!clean && controls}
      <span className={`${prefix}__sr`} aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
const strokeProps: SVGProps<SVGPathElement> = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const SparkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path
      d="M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z"
      fill="currentColor"
    />
    <circle cx="11.6" cy="11.4" r="1.1" fill="currentColor" opacity="0.55" />
  </svg>
);
const StepIcon = ({
  status,
  prefix,
}: {
  status: "done" | "active" | "pending";
  prefix: string;
}) => (
  <span className={`${prefix}__step-icon`} data-status={status} aria-hidden="true">
    {status === `done` && (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6.5" fill="currentColor" />
        <path
          d="m5.4 8.2 1.8 1.8 3.4-3.7"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
    {status === `active` && (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle
          cx="8"
          cy="8"
          r="5.8"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.6"
        />
        <path
          d="M8 2.2a5.8 5.8 0 0 1 5.8 5.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    )}
    {status === `pending` && (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle
          cx="8"
          cy="8"
          r="5.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 2.2"
        />
      </svg>
    )}
  </span>
);
const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <rect x="4.2" y="3.4" width="2.6" height="9.2" rx="0.9" fill="currentColor" />
    <rect x="9.2" y="3.4" width="2.6" height="9.2" rx="0.9" fill="currentColor" />
  </svg>
);
const ResumeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M5 3.6v8.8c0 .6.6.9 1.1.6l6.6-4.4a.7.7 0 0 0 0-1.2L6.1 3c-.5-.3-1.1 0-1.1.6Z"
      fill="currentColor"
    />
  </svg>
);
const InterruptIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6.9 1 2.6 6.6h3l-.5 4.4 4.3-5.6h-3L6.9 1Z" fill="currentColor" />
  </svg>
);
const RemoveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="m3.4 3.4 5.2 5.2M8.6 3.4 3.4 8.6" {...strokeProps} />
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 12.6V3.6M4.2 7.2 8 3.4l3.8 3.8" {...strokeProps} strokeWidth={1.6} />
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="m2.8 6.2 2 2 4.4-4.6" {...strokeProps} strokeWidth={1.5} />
  </svg>
);
const NoteIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path
      d="M3 2.4v3.4c0 .9.7 1.6 1.6 1.6h4.6M7.6 5.6l1.8 1.8-1.8 1.8"
      {...strokeProps}
      strokeWidth={1.2}
    />
  </svg>
);
const formatCount = new Intl.NumberFormat("en");
const clockSubscribers = new Set<() => void>();
let clockInterval = 0;
const MOTION_EASING = "cubic-bezier(0.32, 0.72, 0.24, 1)";
export { AgentSteering };
export type { AgentSteeringProps };
export type { SteerStep };
export type { SteerNote };
