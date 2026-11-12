"use client";

import "./SetupGuide.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import { type ReactElement, useEffect, useRef, useState } from "react";
interface SetupTask {
  id?: string;
  label?: string;
  done?: boolean;
  [field: string]: unknown;
}
interface SetupGroup {
  id?: string;
  title?: string;
  tasks?: SetupTask[];
  [field: string]: unknown;
}
interface SetupGuideProps {
  title?: string;
  groups: SetupGroup[];
  onEdit?: () => void;
  onClose?: () => void;
  onChange?: (done: string[]) => void;
  className?: string;
}
interface GuideTask extends SetupTask {
  id: string;
}
interface GuideGroup extends SetupGroup {
  id: string;
  tasks: GuideTask[];
}
function SetupGuide({
  title = "Setup guide",
  groups,
  onEdit,
  onClose,
  onChange,
  className,
}: SetupGuideProps) {
  const {
    guideGroups,
    completedIds,
    openGroupId,
    setOpenGroupId,
    minimized,
    setMinimized,
    progress,
    toggleTask,
  } = useSetupGuide({ groups, onChange });
  return (
    <>
      <section
        className={["ui-sgd", className].filter(Boolean).join(" ")}
        aria-label={title}
      >
        <header className="ui-sgd__head">
          <h3 className="ui-sgd__title" title={title} dir="auto">
            {title}
          </h3>
          <div className="ui-sgd__actions">
            {onEdit && (
              <button type="button" className="ui-sgd__edit" onClick={onEdit}>
                Edit
              </button>
            )}
            <button
              type="button"
              className="ui-sgd__icon-btn"
              aria-label={minimized ? "Expand setup guide" : "Minimize setup guide"}
              aria-expanded={!minimized}
              onClick={() => setMinimized((value) => !value)}
            >
              {minimized ? <ExpandIcon /> : <MinimizeIcon />}
            </button>
            {onClose && (
              <button
                type="button"
                className="ui-sgd__icon-btn"
                aria-label="Close setup guide"
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </header>
        <span
          className="ui-sgd__track"
          role="progressbar"
          aria-label={`${title} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span className="ui-sgd__fill" style={{ transform: `scaleX(${progress})` }} />
        </span>
        <div className="ui-sgd__body" data-hidden={minimized || undefined}>
          <div className="ui-sgd__groups">
            {guideGroups.map((group, groupIndex) => {
              const isOpen = openGroupId === group.id;
              const isComplete = group.tasks.every((task) => completedIds.has(task.id));
              const firstIncompleteId = group.tasks.find(
                (task) => !completedIds.has(task.id),
              )?.id;
              const currentTaskIndex = group.tasks.findIndex(
                (task) => task.id === firstIncompleteId,
              );
              const panelId = `ui-sgd-${group.id}`;
              return (
                <div
                  className="ui-sgd__group"
                  data-open={isOpen || undefined}
                  key={`${groupIndex}-${group.id}`}
                >
                  <button
                    type="button"
                    className="ui-sgd__group-head"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenGroupId(isOpen ? null : group.id)}
                  >
                    <span
                      className="ui-sgd__group-title"
                      data-done={isComplete || undefined}
                      dir="auto"
                    >
                      {group.title}
                    </span>
                    <ChevronIcon />
                  </button>
                  <div className="ui-sgd__panel" id={panelId} inert={!isOpen}>
                    <ul className="ui-sgd__tasks">
                      {group.tasks.map((task, taskIndex) => {
                        const isDone = completedIds.has(task.id);
                        const isLocked =
                          !isDone &&
                          currentTaskIndex !== -1 &&
                          taskIndex > currentTaskIndex;
                        const taskState = isDone
                          ? "done"
                          : isLocked
                            ? "locked"
                            : "current";
                        return (
                          <li key={`${taskIndex}-${task.id}`}>
                            <button
                              type="button"
                              className="ui-sgd__task"
                              data-state={taskState}
                              disabled={isLocked}
                              aria-pressed={isDone}
                              onClick={() => toggleTask(group, task.id)}
                            >
                              <span className="ui-sgd__mark" aria-hidden="true">
                                {isDone ? (
                                  <CompletedIcon />
                                ) : isLocked ? (
                                  <LockedIcon />
                                ) : null}
                              </span>
                              <span className="ui-sgd__task-label" dir="auto">
                                {task.label}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
/** Keep progress local; notify the application whenever the completed task set changes. */
function useSetupGuide({
  groups,
  onChange,
}: Pick<SetupGuideProps, "groups" | "onChange">) {
  const guideGroups: GuideGroup[] = groups.map((group, groupIndex) => ({
    ...group,
    id: group.id ?? `group-${groupIndex}`,
    tasks: (group.tasks ?? []).map((task, taskIndex) => ({
      ...task,
      id: task.id ?? `group-${groupIndex}-task-${taskIndex}`,
    })),
  }));
  const [completedIds, setCompletedIds] = useState(
    () =>
      new Set(
        guideGroups.flatMap((group) =>
          group.tasks.filter((task) => task.done).map((task) => task.id),
        ),
      ),
  );
  const firstIncompleteGroup = guideGroups.find((group) =>
    group.tasks.some((task) => !completedIds.has(task.id)),
  );
  const [openGroupId, setOpenGroupId] = useState<string | null>(
    firstIncompleteGroup?.id ?? null,
  );
  const [minimized, setMinimized] = useState(false);
  const advanceTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => advanceTimers.current.forEach(clearTimeout), []);
  const taskCount = guideGroups.reduce((total, group) => total + group.tasks.length, 0);
  const completedCount = guideGroups.reduce(
    (total, group) =>
      total + group.tasks.filter((task) => completedIds.has(task.id)).length,
    0,
  );
  const progress = taskCount ? Math.min(1, completedCount / taskCount) : 0;
  function toggleTask(group: GuideGroup, taskId: string) {
    const nextCompletedIds = new Set(completedIds);
    if (nextCompletedIds.has(taskId)) nextCompletedIds.delete(taskId);
    else nextCompletedIds.add(taskId);
    setCompletedIds(nextCompletedIds);
    onChange?.([...nextCompletedIds]);
    if (group.tasks.every((task) => nextCompletedIds.has(task.id))) {
      const nextGroup = guideGroups.find((candidate) =>
        candidate.tasks.some((task) => !nextCompletedIds.has(task.id)),
      );
      // Let the completion animation finish before opening the next group.
      advanceTimers.current.push(
        setTimeout(() => setOpenGroupId(nextGroup?.id ?? null), 420),
      );
    }
  }
  return {
    guideGroups,
    completedIds,
    openGroupId,
    setOpenGroupId,
    minimized,
    setMinimized,
    taskCount,
    completedCount,
    progress,
    toggleTask,
  };
}
const ChevronIcon = () => (
  <svg
    className={`ui-sgd__chevron`}
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.6`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`m4.5 6.25 3.5 3.5 3.5-3.5`} />
  </svg>
);
const MinimizeIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M9.5 2.5v4h4M9.5 6.5l4.5-4.5M6.5 13.5v-4h-4M6.5 9.5 2 14`} />
  </svg>
);
const ExpandIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M10 2h4v4M14 2 9.5 6.5M6 14H2v-4M2 14l4.5-4.5`} />
  </svg>
);
const CloseIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    aria-hidden={`true`}
  >
    <path d={`m3.5 3.5 9 9M12.5 3.5l-9 9`} />
  </svg>
);
const CompletedIcon = () => (
  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
    <circle cx={`8`} cy={`8`} r={`7`} fill={`currentColor`} />
    <path
      d={`m5 8.2 2 2 4-4.2`}
      fill={`none`}
      stroke={`#fff`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const LockedIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    aria-hidden={`true`}
  >
    <circle cx={`8`} cy={`8`} r={`6`} />
    <path d={`m4 12 8-8`} />
  </svg>
);
export { SetupGuide };
export type { SetupGuideProps };
export type { SetupGroup };
export type { SetupTask };
