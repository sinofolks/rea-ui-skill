"use client";

import "./ProjectCard.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type CSSProperties,
  type SVGProps,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ProjectTask = {
  id?: string;
  label?: string;
  done?: boolean;
  assignee?: string;
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ProjectOption = {
  tone?: string;
  icon?: ReactNode;
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type ProjectMember = {
  name?: string;
  avatar?: string;
  [field: string]: unknown;
};
interface ProjectCardProps {
  title?: string;
  tasks: ProjectTask[];
  onTasksChange?: (tasks: ProjectTask[]) => void;
  statuses?: ProjectOption[];
  status?: string;
  onStatusChange?: (id: string) => void;
  due?: string;
  members?: ProjectMember[];
  action?: {
    label: string;
    onClick: () => void;
  };
  hint?: ReactNode;
  trigger?: "hover" | "click";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
type Tone = (typeof TONES)[number];
interface StatusOption {
  id: string;
  label: string | undefined;
  tone: Tone;
  icon: ReactNode;
}
interface Member {
  name: string;
  avatar: string | undefined;
}
interface Task extends ProjectTask {
  key: string;
  done: boolean;
}
function ProjectCard(props: ProjectCardProps) {
  return <ProjectCardView {...props} clean />;
}
function normalizeTone(value: unknown): Tone {
  return typeof value === "string" && TONES.includes(value as Tone)
    ? (value as Tone)
    : "gray";
}
function memberInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.match(/[\p{L}\p{N}]/u)?.[0] ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
function memberHue(name: string): number {
  return [...name].reduce(
    (hue, character) => (hue * 31 + character.charCodeAt(0)) % 360,
    7,
  );
}
function arcPath(from: number, to: number, radius: number, center: number): string {
  const point = (fraction: number) => {
    const angle = fraction * Math.PI * 2 - Math.PI / 2;
    return `${(center + radius * Math.cos(angle)).toFixed(2)} ${(center + radius * Math.sin(angle)).toFixed(2)}`;
  };
  return `M ${point(from)} A ${radius} ${radius} 0 ${Number(to - from > 0.5)} 1 ${point(to)}`;
}
function normalizeMember(member: ProjectMember): Member {
  return {
    name: member.name ?? "",
    avatar: typeof member.avatar === "string" ? member.avatar : undefined,
  };
}
function normalizeStatus(status: ProjectOption): StatusOption {
  return {
    id: status.id ?? "",
    label: status.label,
    tone: normalizeTone(status.tone),
    icon: status.icon,
  };
}
function useProject(props: ProjectCardProps, prefix: string) {
  const {
    tasks: inputTasks,
    onTasksChange,
    status,
    onStatusChange,
    hint,
    trigger = "hover",
    open,
    defaultOpen = false,
    onOpenChange,
  } = props;
  const statuses = (props.statuses ?? DEFAULT_STATUSES).map(normalizeStatus);
  const members = (props.members ?? []).map(normalizeMember);
  const componentId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const expanded = open ?? internalOpen;
  const [completionOverrides, setCompletionOverrides] = useState<Record<string, boolean>>(
    {},
  );
  const [internalStatus, setInternalStatus] = useState<string>();
  const occurrences: Record<string, number> = {};
  // Duplicate public IDs still get independent completion state and React keys.
  const tasks: Task[] = inputTasks.map((task) => {
    const id = task.id ?? "";
    const occurrence = (occurrences[id] = (occurrences[id] ?? -1) + 1);
    const key = occurrence ? `${id}#${occurrence}` : id;
    return {
      ...task,
      key,
      done: onTasksChange ? !!task.done : (completionOverrides[key] ?? !!task.done),
    };
  });
  const completed = tasks.filter((task) => task.done).length;
  const selectedStatus =
    statuses.find(
      (option) => option.id === (onStatusChange ? status : (internalStatus ?? status)),
    ) ?? statuses[0];
  const [hoveredTaskKey, setHoveredTaskKey] = useState<string | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [pinnedMember, setPinnedMember] = useState<string | null>(null);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const activeMember = hoveredMember ?? pinnedMember;
  const matchesMember = (task: Task) => !activeMember || task.assignee === activeMember;
  const rootRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef(0);
  function setExpanded(next: boolean) {
    window.clearTimeout(openTimer.current);
    if (next === expanded) return;
    if (!next) {
      setStatusMenuOpen(false);
      setHoveredTaskKey(null);
      setHoveredMember(null);
    }
    setInternalOpen(next);
    onOpenChange?.(next);
  }
  function scheduleExpanded(next: boolean, delay: number) {
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setExpanded(next), delay);
  }
  useEffect(() => () => window.clearTimeout(openTimer.current), []);
  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (trigger === "hover" && event.pointerType === "mouse") scheduleExpanded(true, 90);
  }
  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    if (trigger === "hover" && event.pointerType === "mouse")
      scheduleExpanded(false, 220);
  }
  useEffect(() => {
    if (!expanded) return;
    function closeOutside(event: globalThis.PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node | null)) setExpanded(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  });
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !expanded) return;
    event.stopPropagation();
    if (statusMenuOpen) {
      setStatusMenuOpen(false);
      return;
    }
    setExpanded(false);
    rootRef.current
      ?.querySelector<HTMLButtonElement>(`.${prefix}__toggle`)
      ?.focus({ preventScroll: true });
  }
  function toggleTask(key: string) {
    const next = tasks.map((task) =>
      task.key === key ? { ...task, done: !task.done } : task,
    );
    setCompletionOverrides(Object.fromEntries(next.map((task) => [task.key, task.done])));
    onTasksChange?.(
      next.map(({ id, label, done, assignee }) => ({
        id,
        label,
        done,
        assignee,
      })),
    );
  }
  function selectStatus(id: string) {
    setInternalStatus(id);
    onStatusChange?.(id);
    setStatusMenuOpen(false);
  }
  const hoveredTask = tasks.find((task) => task.key === hoveredTaskKey);
  const remaining = tasks.length - completed;
  let caption: ReactNode =
    hint ?? (remaining === 0 ? "All done" : `${countFormatter.format(remaining)} left`);
  let captionKey = "rest";
  if (hoveredTask) {
    caption = hoveredTask.assignee ? (
      <>
        {hoveredTask.done ? "Done by" : "Assigned to"} <b>{hoveredTask.assignee}</b>
      </>
    ) : hoveredTask.done ? (
      "Done"
    ) : (
      "Nobody on it yet"
    );
    captionKey = `task-${hoveredTask.key}`;
  } else if (activeMember) {
    const assigned = tasks.filter((task) => task.assignee === activeMember);
    caption = (
      <>
        <b>{activeMember}</b>
        {" · "}
        {countFormatter.format(assigned.filter((task) => task.done).length)}
        {" of "}
        {countFormatter.format(assigned.length)} {"done"}
      </>
    );
    captionKey = `person-${activeMember}`;
  }
  const segmentGap = tasks.length > 1 ? Math.min(0.055, (1 / tasks.length) * 0.35) : 0;
  const segmentSize = 1 / Math.max(tasks.length, 1);
  return {
    componentId,
    tasks,
    statuses,
    members,
    expanded,
    completed,
    selectedStatus,
    hoveredTaskKey,
    setHoveredTaskKey,
    hoveredMember,
    setHoveredMember,
    pinnedMember,
    setPinnedMember,
    statusMenuOpen,
    setStatusMenuOpen,
    activeMember,
    matchesMember,
    rootRef,
    setExpanded,
    handlePointerEnter,
    handlePointerLeave,
    handleKeyDown,
    toggleTask,
    selectStatus,
    caption,
    captionKey,
    segmentGap,
    segmentSize,
  };
}
function StatusIcon({ tone, clean }: { tone: Tone; clean: boolean }) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: clean ? 1.2 : 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } satisfies SVGProps<SVGElement>;
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      {(tone === "gray" || tone === "violet") && (
        <circle cx="6" cy="6" r="4.25" {...stroke} strokeDasharray="2.2 2.25" />
      )}
      {tone === "amber" && (
        <>
          <circle cx="6" cy="6" r="4.25" {...stroke} />
          <path d="M6 3.4a2.6 2.6 0 0 1 0 5.2V3.4Z" fill="currentColor" />
        </>
      )}
      {tone === "blue" && (
        <>
          <path
            d="M1.2 6S3 2.7 6 2.7 10.8 6 10.8 6 9 9.3 6 9.3 1.2 6 1.2 6Z"
            {...stroke}
          />
          <circle cx="6" cy="6" r="1.4" fill="currentColor" />
        </>
      )}
      {tone === "green" && (
        <>
          <circle cx="6" cy="6" r="4.25" {...stroke} />
          <path d="m4.1 6.1 1.3 1.3 2.5-2.7" {...stroke} />
        </>
      )}
      {tone === "red" && (
        <>
          <circle cx="6" cy="6" r="4.25" {...stroke} />
          <path d="M6 3.8v2.6M6 8.2v.01" {...stroke} />
        </>
      )}
    </svg>
  );
}
function ActionIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 6h7M6.5 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CompletionIcon({ prefix }: { prefix: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle className={`${prefix}__ring`} cx="8" cy="8" r="6.3" />
      <circle className={`${prefix}__disc`} cx="8" cy="8" r="7" />
      <path className={`${prefix}__tick`} d="m5.2 8.2 1.9 1.9 3.7-4" />
    </svg>
  );
}
function Avatar({ member, prefix }: { member: Member; prefix: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  const style = {
    [`--${prefix}-hue`]: memberHue(member.name),
  } as CSSProperties & Record<`--${string}`, number>;
  return (
    <span className={`${prefix}__avatar`} style={style}>
      {member.avatar && !imageFailed ? (
        <img src={member.avatar} alt="" onError={() => setImageFailed(true)} />
      ) : (
        memberInitials(member.name)
      )}
    </span>
  );
}
function ProjectCardView(
  props: ProjectCardProps & {
    clean: boolean;
  },
) {
  const { title, due, action, className, clean } = props;
  const prefix = clean ? "ui-pcc" : "ui-pc";
  const {
    componentId,
    tasks,
    statuses,
    members,
    expanded,
    completed,
    selectedStatus,
    hoveredTaskKey,
    setHoveredTaskKey,
    setHoveredMember,
    pinnedMember,
    setPinnedMember,
    statusMenuOpen,
    setStatusMenuOpen,
    activeMember,
    matchesMember,
    rootRef,
    setExpanded,
    handlePointerEnter,
    handlePointerLeave,
    handleKeyDown,
    toggleTask,
    selectStatus,
    caption,
    captionKey,
    segmentGap,
    segmentSize,
  } = useProject(props, prefix);
  const footer = (
    <div className={`${prefix}__fold`} inert={!expanded}>
      <div className={`${prefix}__clip`}>
        <div className={`${prefix}__foot`}>
          <span className={`${prefix}__caption`} aria-live="polite">
            <span dir="auto" key={captionKey}>
              {caption}
            </span>
          </span>
          {action && (
            <button
              type="button"
              className={`${prefix}__action`}
              title={action.label}
              onClick={action.onClick}
            >
              <span className={`${prefix}__action-text`}>{action.label}</span>
              <ActionIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-open={expanded ? "" : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
    >
      <div className={`${prefix}__card`}>
        <div className={`${prefix}__head`}>
          <button
            type="button"
            className={`${prefix}__toggle`}
            aria-expanded={expanded}
            aria-controls={`${componentId}-body`}
            aria-label={`${title}: ${countFormatter.format(completed)} of ${countFormatter.format(tasks.length)} done, ${selectedStatus?.label ?? ""}${due ? `, due ${due}` : ""}`}
            onClick={() => setExpanded(!expanded)}
          />
          <span className={`${prefix}__progress`} data-live={expanded ? "" : undefined}>
            <svg
              width={32}
              height={32}
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              onPointerLeave={() => setHoveredTaskKey(null)}
            >
              {tasks.length === 1 ? (
                <circle
                  className={`${prefix}__seg`}
                  cx={16}
                  cy={16}
                  r={RING_RADIUS}
                  data-done={tasks[0].done ? "" : undefined}
                  data-hot={hoveredTaskKey === tasks[0].key ? "" : undefined}
                  onPointerEnter={() => setHoveredTaskKey(tasks[0].key)}
                  onClick={() => toggleTask(tasks[0].key)}
                />
              ) : (
                tasks.map((task, index) => (
                  <path
                    className={`${prefix}__seg`}
                    d={arcPath(
                      index * segmentSize + segmentGap / 2,
                      (index + 1) * segmentSize - segmentGap / 2,
                      RING_RADIUS,
                      16,
                    )}
                    data-done={task.done ? "" : undefined}
                    data-hot={hoveredTaskKey === task.key ? "" : undefined}
                    data-dim={matchesMember(task) ? undefined : ""}
                    onPointerEnter={() => setHoveredTaskKey(task.key)}
                    onClick={() => toggleTask(task.key)}
                    key={task.key}
                  />
                ))
              )}
            </svg>
            <span className={`${prefix}__num`} key={completed}>
              {completed}
            </span>
          </span>
          <span className={`${prefix}__titles`}>
            <span className={`${prefix}__name`} dir="auto" title={title}>
              {title}
            </span>
            <span className={`${prefix}__sub`}>
              {selectedStatus && (
                <button
                  type="button"
                  className={`${prefix}__status`}
                  data-tone={selectedStatus.tone}
                  title={selectedStatus.label}
                  aria-expanded={statusMenuOpen}
                  aria-controls={`${componentId}-status`}
                  tabIndex={expanded ? 0 : -1}
                  onClick={() => setStatusMenuOpen((previous) => !previous)}
                >
                  {selectedStatus.icon ?? (
                    <StatusIcon tone={selectedStatus.tone} clean={clean} />
                  )}
                  <span className={`${prefix}__status-text`} dir="auto">
                    {selectedStatus.label}
                  </span>
                </button>
              )}
              {due && (
                <span className={`${prefix}__due`} dir="auto" title={due}>
                  <span className={`${prefix}__due-word`}>{"Due "}</span>
                  {due}
                </span>
              )}
            </span>
          </span>
          {members.length > 0 && (
            <span
              className={`${prefix}__people`}
              onPointerLeave={() => setHoveredMember(null)}
            >
              {members.slice(0, MAX_AVATARS).map((member, index) => (
                <button
                  title={member.name}
                  type="button"
                  className={`${prefix}__member`}
                  aria-label={`Only ${member.name}'s subtasks`}
                  aria-pressed={pinnedMember === member.name}
                  data-on={activeMember === member.name ? "" : undefined}
                  data-off={activeMember && activeMember !== member.name ? "" : undefined}
                  tabIndex={expanded ? 0 : -1}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setHoveredMember(member.name);
                  }}
                  onFocus={() => setHoveredMember(member.name)}
                  onBlur={() => setHoveredMember(null)}
                  onClick={() =>
                    setPinnedMember((previous) =>
                      previous === member.name ? null : member.name,
                    )
                  }
                  key={`${member.name}#${index}`}
                >
                  <Avatar member={member} prefix={prefix} />
                </button>
              ))}
              {members.length > MAX_AVATARS && (
                <span
                  className={`${prefix}__avatar ${prefix}__more`}
                  title={members
                    .slice(MAX_AVATARS)
                    .map((member) => member.name)
                    .join(", ")}
                >
                  {"+"}
                  {countFormatter.format(members.length - MAX_AVATARS)}
                </span>
              )}
            </span>
          )}
        </div>
        <div id={`${componentId}-body`} className={`${prefix}__fold`} inert={!expanded}>
          <div className={`${prefix}__body`}>
            <div
              id={`${componentId}-status`}
              className={`${prefix}__fold ${prefix}__fold--status`}
              data-open={statusMenuOpen ? "" : undefined}
              inert={!statusMenuOpen}
            >
              <div className={`${prefix}__clip`}>
                <div
                  className={`${prefix}__options`}
                  role="radiogroup"
                  aria-label="Status"
                >
                  {statuses.map((status, index) => (
                    <button
                      title={status.label}
                      type="button"
                      role="radio"
                      aria-checked={status.id === selectedStatus?.id}
                      className={`${prefix}__option`}
                      data-tone={status.tone}
                      onClick={() => selectStatus(status.id)}
                      key={`${status.id}#${index}`}
                    >
                      {status.icon ??
                        (clean ? (
                          <span className={`${prefix}__dot`} aria-hidden="true" />
                        ) : (
                          <StatusIcon tone={status.tone} clean={false} />
                        ))}
                      <span className={`${prefix}__option-text`} dir="auto">
                        {status.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {tasks.length > 0 && (
              <ul
                className={`${prefix}__tasks`}
                onPointerLeave={() => setHoveredTaskKey(null)}
              >
                {tasks.map((task) => {
                  const assignee = members.find(
                    (member) => member.name === task.assignee,
                  );
                  return (
                    <li key={task.key}>
                      <button
                        type="button"
                        className={`${prefix}__task`}
                        role="checkbox"
                        aria-checked={task.done}
                        data-hot={hoveredTaskKey === task.key ? "" : undefined}
                        data-dim={matchesMember(task) ? undefined : ""}
                        onPointerEnter={(event) => {
                          if (event.pointerType === "mouse") setHoveredTaskKey(task.key);
                        }}
                        onFocus={() => setHoveredTaskKey(task.key)}
                        onBlur={() => setHoveredTaskKey(null)}
                        onClick={() => toggleTask(task.key)}
                      >
                        <CompletionIcon prefix={prefix} />
                        <span
                          className={`${prefix}__label`}
                          dir="auto"
                          title={task.label}
                        >
                          {task.label}
                        </span>
                        {assignee && <Avatar member={assignee} prefix={prefix} />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        {clean && footer}
      </div>
      {!clean && footer}
    </div>
  );
}
const TONES = ["red", "amber", "green", "blue", "violet", "gray"] as const;
const MAX_AVATARS = 4;
const countFormatter = new Intl.NumberFormat("en");
const DEFAULT_STATUSES: ProjectOption[] = [
  { id: "todo", label: "To do", tone: "violet" },
  { id: "progress", label: "In progress", tone: "amber" },
  { id: "review", label: "In review", tone: "blue" },
  { id: "done", label: "Done", tone: "green" },
];
const RING_RADIUS = 12.5;
export { ProjectCard };
export type { ProjectCardProps };
export type { ProjectTask };
export type { ProjectMember };
export type { ProjectOption };
