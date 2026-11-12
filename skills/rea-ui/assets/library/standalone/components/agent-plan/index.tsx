"use client";

import "./AgentPlan.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
type PlanStepStatus = "pending" | "active" | "done" | "failed" | "skipped";
interface PlanStep {
  id?: string;
  title?: string;
  detail?: string;
  tool?: string;
  status?: PlanStepStatus;
  duration?: number;
  error?: string;
  [field: string]: unknown;
}
interface AgentPlanProps {
  steps?: PlanStep[];
  defaultSteps?: PlanStep[];
  status?: "draft" | "running" | "done";
  onChange?: (steps: PlanStep[]) => void;
  onRun?: (steps: PlanStep[]) => void;
  onCancel?: () => void;
  onRetry?: (stepId: string) => void;
  title?: string;
  estimate?: string;
  className?: string;
}
type StepId = PlanStep["id"];
interface EditDraft {
  id: StepId;
  value: string | undefined;
}
interface DragState {
  id: StepId;
  pointer: number;
  ids: StepId[];
  from: number;
  to: number;
  startY: number;
  scale: number;
  dy: number;
  tops: number[];
  heights: number[];
}
interface ViewProps extends AgentPlanProps {
  createStepId: () => string;
}
function AgentPlan(props: AgentPlanProps) {
  return <DefaultPlanView {...props} createStepId={createStepId_index} />;
}
function reorder<T>(items: T[], from: number, to: number) {
  const reordered = items.slice();
  const [item] = reordered.splice(from, 1);
  reordered.splice(to, 0, item);
  return reordered;
}
function translatedY(element: HTMLElement) {
  const transform = getComputedStyle(element).transform;
  if (!transform || transform === "none") return 0;
  try {
    return new DOMMatrixReadOnly(transform).m42;
  } catch {
    return 0;
  }
}
function formatLongDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${pad(seconds % 60)}s`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? `${hours}h ${pad(minutes % 60)}m`
    : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function formatStepDuration(milliseconds: unknown) {
  const seconds = Math.max(0, finiteNumber(milliseconds) ?? 0) / 1000;
  return seconds < 10
    ? `${seconds.toFixed(1)}s`
    : seconds < 60
      ? `${Math.round(seconds)}s`
      : formatLongDuration(Math.round(seconds));
}
function formatPlanDuration(milliseconds: unknown) {
  const seconds = Math.max(1, Math.round((finiteNumber(milliseconds) ?? 0) / 1000));
  return seconds < 60 ? `${seconds}s` : formatLongDuration(seconds);
}
function createStepIdFactory() {
  let sequence = 0;
  return () => `step-${Date.now().toString(36)}-${(sequence++).toString(36)}`;
}
function useAgentPlan(
  { steps, defaultSteps = [], status = "draft", onChange }: AgentPlanProps,
  createStepId: () => string,
) {
  const [localSteps, setLocalSteps] = useState(defaultSteps),
    planSteps = steps ?? localSteps,
    isDraft = status === "draft";
  const stepsRef = useRef(planSteps);
  stepsRef.current = planSteps;
  const [editing, setEditing] = useState<EditDraft | null>(null),
    editRef = useRef(editing);
  editRef.current = editing;
  const [newTitle, setNewTitle] = useState(""),
    [removingIds, setRemovingIds] = useState<StepId[]>([]),
    [draggingId, setDraggingId] = useState<StepId | null>(null),
    [announcement, setAnnouncement] = useState(""),
    [totalDuration, setTotalDuration] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null),
    addInputRef = useRef<HTMLInputElement>(null);
  const rowRefs = useRef(new Map<StepId, HTMLLIElement>()),
    rowTops = useRef(new Map<StepId, number>()),
    dragRef = useRef<DragState | null>(null),
    pendingFocus = useRef<StepId | null>(null);
  const enteringIds = useRef(new Set<StepId>()),
    timers = useRef(new Set<number>()),
    activeSince = useRef(new Map<StepId, number>()),
    durations = useRef(new Map<StepId, number>()),
    planStartedAt = useRef<number | null>(null),
    previousStepStatuses = useRef(new Map<StepId, ReturnType<typeof stepStatus>>());
  const instructionsId = useId();
  function schedule(callback: () => void, delay: number) {
    const timer = window.setTimeout(() => {
      timers.current.delete(timer);
      callback();
    }, delay);
    timers.current.add(timer);
  }
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);
  function updateSteps(next: PlanStep[]) {
    if (steps === undefined) setLocalSteps(next);
    onChange?.(next);
  }
  function announce(message: string) {
    setAnnouncement((previous) => (previous === message ? `${message} ` : message));
  }
  const order = planSteps.map((step) => step.id).join("\n"),
    previousOrder = useRef(order);
  useLayoutEffect(() => {
    const orderChanged = previousOrder.current !== order;
    previousOrder.current = order;
    const nextTops = new Map<StepId, number>(),
      animate = orderChanged && !prefersReducedMotion();
    rowRefs.current.forEach((row, id) => {
      const top = row.offsetTop;
      nextTops.set(id, top);
      if (!orderChanged) return;
      const previousTop = rowTops.current.get(id);
      if (animate && previousTop !== undefined && previousTop !== top) {
        row.style.transition = "none";
        row.style.transform = `translateY(${previousTop - top}px)`;
        row.getBoundingClientRect();
      }
      row.style.transition = "";
      row.style.transform = "";
    });
    rowTops.current = nextTops;
    if (pendingFocus.current) {
      const row = rowRefs.current.get(pendingFocus.current);
      pendingFocus.current = null;
      if (row && document.activeElement !== row) row.focus();
    }
  });
  const previousStatus = useRef(status);
  useLayoutEffect(() => {
    const previous = previousStatus.current;
    previousStatus.current = status;
    if (status === "running" && (planStartedAt.current === null || previous === "done"))
      planStartedAt.current = Date.now();
    if (status === "draft") {
      planStartedAt.current = null;
      setTotalDuration(null);
    }
    if (status === "done") {
      const summed = stepsRef.current.reduce(
        (sum, step) =>
          sum + (finiteNumber(step.duration) ?? durations.current.get(step.id) ?? 0),
        0,
      );
      setTotalDuration(
        planStartedAt.current === null ? summed : Date.now() - planStartedAt.current,
      );
    }
  }, [status]);
  useLayoutEffect(() => {
    planSteps.forEach((step) => {
      const state = stepStatus(step);
      if (state === "active") {
        if (!activeSince.current.has(step.id))
          activeSince.current.set(step.id, Date.now());
      } else if (activeSince.current.has(step.id)) {
        if (state === "done")
          durations.current.set(step.id, Date.now() - activeSince.current.get(step.id)!);
        activeSince.current.delete(step.id);
      }
      if (state === "pending") durations.current.delete(step.id);
    });
  });
  useEffect(() => {
    const messages: string[] = [];
    planSteps.forEach((step, index) => {
      const state = stepStatus(step),
        previous = previousStepStatuses.current.get(step.id);
      if (!isDraft && previous !== undefined && previous !== state) {
        if (state === "done") messages.push(`Step ${index + 1} done: ${step.title}`);
        if (state === "failed")
          messages.push(
            `Step ${index + 1} failed: ${step.title}${step.error ? `. ${step.error}` : ""}`,
          );
        if (state === "skipped") messages.push(`Step ${index + 1} skipped`);
      }
      previousStepStatuses.current.set(step.id, state);
    });
    if (messages.length) announce(messages.join(". "));
  });
  useEffect(() => {
    if (status === "running") announce("Running plan");
    if (status === "done" && totalDuration !== null)
      announce(`Plan done in ${formatPlanDuration(totalDuration)}`);
  }, [status, totalDuration]);
  useEffect(() => {
    if (!isDraft) {
      setEditing(null);
      setNewTitle("");
    }
  }, [isDraft]);
  function focusRow(id: StepId) {
    if (id) rowRefs.current.get(id)?.focus();
    else addInputRef.current?.focus();
  }
  function moveStep(id: StepId, direction: number) {
    const current = stepsRef.current,
      from = current.findIndex((step) => step.id === id),
      to = from + direction;
    if (from < 0 || to < 0 || to >= current.length) return;
    pendingFocus.current = id;
    updateSteps(reorder(current, from, to));
    announce(`Moved “${current[from].title}” to position ${to + 1} of ${current.length}`);
  }
  function removeStep(id: StepId) {
    if (!isDraft || removingIds.includes(id)) return;
    const current = stepsRef.current,
      index = current.findIndex((step) => step.id === id);
    if (index < 0) return;
    const row = rowRefs.current.get(id);
    if (row?.contains(document.activeElement))
      focusRow((current[index + 1] ?? current[index - 1])?.id);
    announce(`Removed “${current[index].title}”`);
    if (!row || prefersReducedMotion()) {
      updateSteps(current.filter((step) => step.id !== id));
      return;
    }
    row.style.height = `${row.offsetHeight}px`;
    row.getBoundingClientRect();
    setRemovingIds((previous) => [...previous, id]);
    schedule(() => {
      row.style.height = "";
      setRemovingIds((previous) => previous.filter((value) => value !== id));
      updateSteps(stepsRef.current.filter((step) => step.id !== id));
    }, 260);
  }
  function beginRename(id: StepId) {
    if (!isDraft) return;
    const step = stepsRef.current.find((step) => step.id === id);
    if (step) setEditing({ id, value: step.title });
  }
  function finishRename(save: boolean, restoreFocus = false) {
    const edit = editRef.current;
    if (!edit) return;
    editRef.current = null;
    setEditing(null);
    if (restoreFocus) pendingFocus.current = edit.id;
    const value = edit.value?.trim() ?? "",
      step = stepsRef.current.find((step) => step.id === edit.id);
    if (save && step && value && value !== step.title) {
      updateSteps(
        stepsRef.current.map((step) =>
          step.id === edit.id ? { ...step, title: value } : step,
        ),
      );
      announce(`Renamed to “${value}”`);
    }
  }
  function addStep() {
    const title = newTitle.trim();
    if (!title) return;
    const id = createStepId();
    enteringIds.current.add(id);
    updateSteps([...stepsRef.current, { id, title }]);
    setNewTitle("");
    announce(`Added “${title}” as step ${stepsRef.current.length + 1}`);
  }
  function handleRowKeyDown(event: KeyboardEvent<HTMLLIElement>, id: StepId) {
    if (!isDraft || event.target !== event.currentTarget) return;
    const current = stepsRef.current,
      index = current.findIndex((step) => step.id === id);
    if (event.altKey && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      event.preventDefault();
      moveStep(id, event.key === "ArrowUp" ? -1 : 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = current[index + (event.key === "ArrowUp" ? -1 : 1)];
      if (next) focusRow(next.id);
      else if (event.key === "ArrowDown") addInputRef.current?.focus();
    } else if (event.key === "Enter" || event.key === "F2") {
      event.preventDefault();
      beginRename(id);
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      removeStep(id);
    }
  }
  function startDrag(event: PointerEvent<HTMLSpanElement>, id: StepId) {
    if (!isDraft || event.button !== 0 || editRef.current || removingIds.length) return;
    const ids = stepsRef.current.map((step) => step.id),
      rows = ids.map((id) => rowRefs.current.get(id));
    if (rows.some((row) => !row)) return;
    const elements = rows as HTMLLIElement[],
      from = ids.indexOf(id),
      row = elements[from],
      scale = row.offsetHeight
        ? row.getBoundingClientRect().height / row.offsetHeight
        : 1;
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {}
    dragRef.current = {
      id,
      pointer: event.pointerId,
      ids,
      from,
      to: from,
      startY: event.clientY,
      scale: scale || 1,
      dy: 0,
      tops: elements.map((row) => row.offsetTop),
      heights: elements.map((row) => row.offsetHeight),
    };
    setDraggingId(id);
  }
  function moveDrag(event: PointerEvent<HTMLSpanElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const last = drag.ids.length - 1,
      min = drag.tops[0] - drag.tops[drag.from],
      max =
        drag.tops[last] +
        drag.heights[last] -
        (drag.tops[drag.from] + drag.heights[drag.from]);
    drag.dy = Math.min(max, Math.max(min, (event.clientY - drag.startY) / drag.scale));
    rowRefs.current
      .get(drag.id)
      ?.style.setProperty("transform", `translateY(${drag.dy}px)`);
    const center = drag.tops[drag.from] + drag.dy + drag.heights[drag.from] / 2;
    let destination = 0;
    drag.ids.forEach((_, index) => {
      if (index !== drag.from && drag.tops[index] + drag.heights[index] / 2 < center)
        destination++;
    });
    if (destination === drag.to) return;
    drag.to = destination;
    drag.ids.forEach((id, index) => {
      if (index === drag.from) return;
      const shift =
        drag.from < destination && index > drag.from && index <= destination
          ? -drag.heights[drag.from]
          : destination < drag.from && index >= destination && index < drag.from
            ? drag.heights[drag.from]
            : 0;
      const row = rowRefs.current.get(id);
      if (row) row.style.transform = shift ? `translateY(${shift}px)` : "";
    });
  }
  function finishDrag(event: PointerEvent<HTMLSpanElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    dragRef.current = null;
    setDraggingId(null);
    if (drag.to === drag.from) {
      const row = rowRefs.current.get(drag.id);
      if (row) row.style.transform = "";
      return;
    }
    rowRefs.current.forEach((row, id) => {
      rowTops.current.set(id, row.offsetTop + translatedY(row));
      row.style.transition = "none";
      row.style.transform = "";
    });
    const current = stepsRef.current,
      step = current.find((step) => step.id === drag.id);
    updateSteps(reorder(current, drag.from, drag.to));
    requestAnimationFrame(() =>
      rowRefs.current.forEach((row) => (row.style.transition = "")),
    );
    if (step)
      announce(`Moved “${step.title}” to position ${drag.to + 1} of ${current.length}`);
  }
  const total = planSteps.length,
    activeIndex = planSteps.findIndex((step) => stepStatus(step) === "active"),
    failedIndex = planSteps.findIndex((step) => stepStatus(step) === "failed"),
    completed = planSteps.filter(
      (step) => stepStatus(step) === "done" || stepStatus(step) === "skipped",
    ).length;
  let phase: "draft" | "running" | "failed" | "done" = "draft",
    statusText = "";
  if (status === "done") {
    phase = "done";
    statusText = `Done in ${formatPlanDuration(totalDuration ?? 0)}`;
  } else if (status === "running") {
    if (failedIndex >= 0 && activeIndex < 0) {
      phase = "failed";
      statusText = `Stopped · step ${numberFormatter.format(failedIndex + 1)} failed`;
    } else {
      phase = "running";
      statusText = `Running · ${numberFormatter.format(activeIndex >= 0 ? activeIndex + 1 : Math.min(completed + 1, total))} of ${numberFormatter.format(total)}`;
    }
  }
  return {
    planSteps,
    isDraft,
    stepsRef,
    editing,
    setEditing,
    newTitle,
    setNewTitle,
    removingIds,
    draggingId,
    announcement,
    rootRef,
    addInputRef,
    rowRefs,
    enteringIds,
    activeSince,
    durations,
    planStartedAt,
    instructionsId,
    focusRow,
    removeStep,
    beginRename,
    finishRename,
    addStep,
    handleRowKeyDown,
    startDrag,
    moveDrag,
    finishDrag,
    total,
    phase,
    statusText,
  };
}
function ElapsedTime({ since, whole = false }: { since?: number; whole?: boolean }) {
  const [now, setNow] = useState(() => Date.now());
  const enabled = since !== undefined;
  useEffect(() => {
    if (!enabled) return;
    const update = () => setNow(Date.now());
    update();
    subscribers.add(update);
    timer_ElapsedTime ||= window.setInterval(
      () => subscribers.forEach((notify) => notify()),
      100,
    );
    return () => {
      subscribers.delete(update);
      if (!subscribers.size) {
        window.clearInterval(timer_ElapsedTime);
        timer_ElapsedTime = 0;
      }
    };
  }, [enabled]);
  const elapsed = since === undefined ? 0 : now - since;
  return <>{whole ? formatPlanDuration(elapsed) : formatStepDuration(elapsed)}</>;
}
function PlanSpinner({ prefix }: { prefix: string }) {
  return (
    <svg className={`${prefix}__spinner`} viewBox="0 0 16 16">
      {Array.from({ length: 8 }, (_, index) => (
        <line
          key={index}
          x1="8"
          y1="1.75"
          x2="8"
          y2="4.75"
          transform={`rotate(${index * 45} 8 8)`}
          style={{ animationDelay: `${(index - 8) * 100}ms` }}
        />
      ))}
    </svg>
  );
}
function DefaultPlanView({ createStepId, ...props }: ViewProps) {
  const {
    title,
    estimate,
    className,
    onRetry,
    onRun,
    onCancel,
    status = "draft",
  } = props;
  const {
    planSteps,
    isDraft,
    stepsRef,
    editing,
    setEditing,
    newTitle,
    setNewTitle,
    removingIds,
    draggingId,
    announcement,
    rootRef,
    addInputRef,
    rowRefs,
    enteringIds,
    activeSince,
    durations,
    planStartedAt,
    instructionsId,
    focusRow,
    removeStep,
    beginRename,
    finishRename,
    addStep,
    handleRowKeyDown,
    startDrag,
    moveDrag,
    finishDrag,
    total,
    phase,
    statusText,
  } = useAgentPlan(props, createStepId);
  return (
    <div
      ref={rootRef}
      className={[`ui-pl`, className].filter(Boolean).join(` `)}
      data-status={status}
      data-dragging={draggingId ? `` : undefined}
    >
      <div className={`ui-pl__card`}>
        <div className={`ui-pl__head`}>
          <div className={`ui-pl__meta`}>
            <span className={`ui-pl__state`}>
              <span className={`ui-pl__state-icon`} aria-hidden={`true`}>
                <svg viewBox={`0 0 16 16`}>
                  <path d={`M6.5 4.5h7M6.5 8h7M6.5 11.5h7`} />
                  <circle cx={`3.25`} cy={`4.5`} r={`.6`} />
                  <circle cx={`3.25`} cy={`8`} r={`.6`} />
                  <circle cx={`3.25`} cy={`11.5`} r={`.6`} />
                </svg>
              </span>
              <span className={`ui-pl__state-label`}>
                {`Plan · `}
                {numberFormatter.format(total)}
                {` `}
                {total === 1 ? `step` : `steps`}
              </span>
            </span>
            {isDraft && estimate ? (
              <span className={`ui-pl__estimate`} title={estimate}>
                <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <circle cx={`8`} cy={`8`} r={`6`} />
                  <path d={`M8 5v3.2l2 1.3`} />
                </svg>
                <span>
                  <span className={`ui-pl__sr`}>{`Estimated time `}</span>
                  {estimate}
                </span>
              </span>
            ) : null}
          </div>
          {title && (
            <h3 className={`ui-pl__title`} dir={`auto`}>
              {title}
            </h3>
          )}
        </div>
        <p
          id={instructionsId}
          className={`ui-pl__sr`}
        >{`Press Enter to rename, Alt plus arrow keys to move, Delete to remove.`}</p>
        <ol className={`ui-pl__list`} aria-label={title ? `Plan: ${title}` : `Plan`}>
          {planSteps.map((step, index) => {
            const stepState = stepStatus(step),
              isEditing = isDraft && editing?.id === step.id,
              duration = finiteNumber(step.duration) ?? durations.current.get(step.id),
              since = activeSince.current.get(step.id);
            return (
              <li
                ref={(element) => {
                  if (element) rowRefs.current.set(step.id, element);
                  return () => {
                    rowRefs.current.delete(step.id);
                  };
                }}
                className={`ui-pl__step`}
                data-step={isDraft ? undefined : stepState}
                data-dragging={draggingId === step.id ? `` : undefined}
                data-removing={removingIds.includes(step.id) ? `` : undefined}
                data-enter={enteringIds.current.has(step.id) ? `` : undefined}
                onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget)
                    enteringIds.current.delete(step.id);
                }}
                tabIndex={isDraft && !isEditing ? 0 : undefined}
                aria-describedby={isDraft ? instructionsId : undefined}
                aria-current={stepState === `active` && !isDraft ? `step` : undefined}
                onKeyDown={(event) => handleRowKeyDown(event, step.id)}
                key={step.id}
              >
                {isDraft && (
                  <span
                    className={`ui-pl__grip`}
                    aria-hidden={`true`}
                    title={`Drag to reorder`}
                    onPointerDown={(event) => startDrag(event, step.id)}
                    onPointerMove={moveDrag}
                    onPointerUp={finishDrag}
                    onPointerCancel={finishDrag}
                  >
                    <svg viewBox={`0 0 16 16`}>
                      <circle cx={`6`} cy={`4`} r={`1.1`} />
                      <circle cx={`10`} cy={`4`} r={`1.1`} />
                      <circle cx={`6`} cy={`8`} r={`1.1`} />
                      <circle cx={`10`} cy={`8`} r={`1.1`} />
                      <circle cx={`6`} cy={`12`} r={`1.1`} />
                      <circle cx={`10`} cy={`12`} r={`1.1`} />
                    </svg>
                  </span>
                )}
                <span className={`ui-pl__marker`} aria-hidden={`true`}>
                  {isDraft || stepState === `pending` ? (
                    <span className={`ui-pl__num`}>{index + 1}</span>
                  ) : stepState === `active` ? (
                    <PlanSpinner prefix="ui-pl" />
                  ) : stepState === `done` ? (
                    <svg viewBox={`0 0 16 16`} className={`ui-pl__mark`}>
                      <path
                        d={`M4.2 8.4 6.8 11l5-5.6`}
                        pathLength={1}
                        className={`ui-pl__draw`}
                      />
                    </svg>
                  ) : stepState === `failed` ? (
                    <svg viewBox={`0 0 16 16`} className={`ui-pl__mark`}>
                      <path d={`M8 4.2v4.4M8 11.6h.01`} />
                    </svg>
                  ) : (
                    <svg viewBox={`0 0 16 16`} className={`ui-pl__mark`}>
                      <path d={`M5 8h6`} />
                    </svg>
                  )}
                </span>
                <div className={`ui-pl__main`}>
                  {isEditing ? (
                    <input
                      className={`ui-pl__edit`}
                      dir={`auto`}
                      value={editing?.value}
                      aria-label={`Rename step ${index + 1}`}
                      autoFocus={true}
                      onFocus={(event) => event.currentTarget.select()}
                      onChange={(event) =>
                        setEditing({
                          id: step.id,
                          value: event.target.value,
                        })
                      }
                      onBlur={() => finishRename(true)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          finishRename(true, true);
                        } else if (event.key === "Escape") {
                          event.preventDefault();
                          event.stopPropagation();
                          finishRename(false, true);
                        }
                      }}
                    />
                  ) : (
                    <span
                      className={`ui-pl__name`}
                      dir={`auto`}
                      onDoubleClick={() => beginRename(step.id)}
                    >
                      {step.title}
                    </span>
                  )}
                  {(step.detail || step.tool) && (
                    <span className={`ui-pl__sub`}>
                      {step.detail && (
                        <span className={`ui-pl__detail`} dir={`auto`}>
                          {step.detail}
                        </span>
                      )}
                      {step.tool && (
                        <code className={`ui-pl__tool`} title={step.tool}>
                          {step.tool}
                        </code>
                      )}
                    </span>
                  )}
                  {!isDraft && (
                    <span className={`ui-pl__sr`}>
                      {`, `}
                      {statusLabels[stepState]}
                    </span>
                  )}
                  {!isDraft && stepState === `failed` && (
                    <span className={`ui-pl__fail`}>
                      <span className={`ui-pl__error`} dir={`auto`}>
                        {step.error ?? `This step failed`}
                      </span>
                      {onRetry && (
                        <button
                          type={`button`}
                          className={`ui-pl__retry`}
                          onClick={() => onRetry(step.id!)}
                        >
                          <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                            <path d={`M13 8a5 5 0 1 1-1.6-3.7`} />
                            <path d={`M13 3v2.6h-2.6`} />
                          </svg>
                          {`Retry from here`}
                        </button>
                      )}
                    </span>
                  )}
                </div>
                <span className={`ui-pl__aside`}>
                  {isDraft ? (
                    <button
                      type={`button`}
                      className={`ui-pl__remove`}
                      aria-label={`Remove step ${index + 1}: ${step.title}`}
                      onClick={() => removeStep(step.id)}
                    >
                      <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                        <path d={`M4.5 4.5l7 7M11.5 4.5l-7 7`} />
                      </svg>
                    </button>
                  ) : stepState === `active` ? (
                    <span className={`ui-pl__time`} aria-hidden={`true`}>
                      <ElapsedTime since={since} />
                    </span>
                  ) : stepState === `done` && duration !== undefined ? (
                    <span className={`ui-pl__time ui-pl__time--done`}>
                      <span className={`ui-pl__sr`}>{`took `}</span>
                      {formatStepDuration(duration)}
                    </span>
                  ) : stepState === `skipped` ? (
                    <span
                      className={`ui-pl__time`}
                      aria-hidden={`true`}
                    >{`Skipped`}</span>
                  ) : null}
                </span>
                {index < total - 1 && (
                  <span className={`ui-pl__rail`} aria-hidden={`true`} />
                )}
              </li>
            );
          })}
        </ol>
        <div className={`ui-pl__tail`} inert={!isDraft}>
          <div className={`ui-pl__tail-inner`}>
            <label className={`ui-pl__add`}>
              <span className={`ui-pl__add-icon`} aria-hidden={`true`}>
                <svg viewBox={`0 0 16 16`}>
                  <path d={`M8 4.5v7M4.5 8h7`} />
                </svg>
              </span>
              <input
                ref={addInputRef}
                value={newTitle}
                placeholder={`Add step`}
                aria-label={`Add a step at the end`}
                enterKeyHint={`done`}
                onChange={(event) => setNewTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addStep();
                  } else if (event.key === `Escape`) setNewTitle(``);
                  else if (event.key === `ArrowUp` && !newTitle) {
                    const lastStep = stepsRef.current[stepsRef.current.length - 1];
                    if (lastStep) {
                      event.preventDefault();
                      focusRow(lastStep.id);
                    }
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div
        className={`ui-pl__foot`}
        data-phase={phase}
        children={
          phase === `draft` ? (
            <>
              <span
                className={`ui-pl__hint`}
                aria-hidden={`true`}
              >{`Drag to reorder · double-click to rename`}</span>
              <span className={`ui-pl__actions`}>
                {onCancel && (
                  <button
                    type={`button`}
                    className={`ui-pl__btn ui-pl__btn--quiet`}
                    onClick={onCancel}
                  >{`Cancel`}</button>
                )}
                <button
                  type={`button`}
                  className={`ui-pl__btn ui-pl__btn--primary ui-pl__run`}
                  disabled={!total}
                  onClick={() => onRun?.(stepsRef.current)}
                >
                  {`Run plan`}
                  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                    <path d={`M5.5 3.8v8.4L12 8z`} />
                  </svg>
                </button>
              </span>
            </>
          ) : (
            <>
              <span className={`ui-pl__status`}>
                <span className={`ui-pl__status-icon`} aria-hidden={`true`}>
                  {phase === `running` ? (
                    <PlanSpinner prefix="ui-pl" />
                  ) : phase === `done` ? (
                    <svg viewBox={`0 0 16 16`}>
                      <circle cx={`8`} cy={`8`} r={`6.5`} />
                      <path
                        d={`M5.4 8.2 7.2 10l3.4-3.8`}
                        pathLength={1}
                        className={`ui-pl__draw`}
                      />
                    </svg>
                  ) : (
                    <svg viewBox={`0 0 16 16`}>
                      <circle cx={`8`} cy={`8`} r={`6.5`} />
                      <path d={`M8 4.9v3.6M8 11h.01`} />
                    </svg>
                  )}
                </span>
                <span className={`ui-pl__status-label`}>{statusText}</span>
              </span>
              {phase === `running` ? (
                <span className={`ui-pl__elapsed`} aria-hidden={`true`}>
                  <ElapsedTime since={planStartedAt.current ?? undefined} whole={true} />
                </span>
              ) : phase === `done` && onRun ? (
                <span className={`ui-pl__actions`}>
                  <button
                    type={`button`}
                    className={`ui-pl__btn ui-pl__btn--quiet ui-pl__again`}
                    onClick={() => onRun(stepsRef.current)}
                  >
                    <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                      <path d={`M13 8a5 5 0 1 1-1.6-3.7`} />
                      <path d={`M13 3v2.6h-2.6`} />
                    </svg>
                    {`Run again`}
                  </button>
                </span>
              ) : null}
            </>
          )
        }
        key={phase}
      />
      <p className={`ui-pl__sr`} role={`status`} aria-live={`polite`}>
        {announcement}
      </p>
    </div>
  );
}
const numberFormatter = new Intl.NumberFormat("en");
const statusLabels = {
  pending: "Pending",
  active: "In progress",
  done: "Done",
  failed: "Failed",
  skipped: "Skipped",
};
const stepStatus = (step: PlanStep) => step.status ?? "pending";
const finiteNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const pad = (value: number) => String(value).padStart(2, "0");
const subscribers = new Set<() => void>();
let timer_ElapsedTime = 0;
const createStepId_index = createStepIdFactory();
export { AgentPlan };
export type { AgentPlanProps };
export type { PlanStep };
