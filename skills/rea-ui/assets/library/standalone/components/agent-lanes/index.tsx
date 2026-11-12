"use client";

import "./AgentLanes.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useEffect,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
interface LaneAgent {
  id?: string;
  name?: string;
  model?: string;
  avatar?: ReactNode;
  [field: string]: unknown;
}
interface LaneTask {
  id?: string;
  agentId?: string;
  tools?: ReactNode[];
  title?: string;
  status?: string;
  start?: number | Date;
  end?: number | Date;
  handoffTo?: string;
  summary?: string[];
  ask?: string;
  [field: string]: unknown;
}
interface AgentLanesProps {
  agents: LaneAgent[];
  tasks: LaneTask[];
  span?: number;
  now?: number;
  onApprove?: (task: LaneTask) => void;
  onReject?: (task: LaneTask) => void;
  onOpen?: (task: LaneTask) => void;
  title?: string;
  highlight?: string;
  className?: string;
}
interface LayoutSnapshot {
  height: number;
  rows: Map<string | undefined, number>;
}
function AgentLanes(props: AgentLanesProps) {
  return <AgentLanesView {...props} clean={false} />;
}
function AgentsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z"
        fill="currentColor"
      />
      <circle cx="11.6" cy="11.4" r="1.1" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
function WaitingIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M6 1.8 10.8 10H1.2L6 1.8Z" fill="currentColor" />
    </svg>
  );
}
function timestamp(value: number | Date | undefined): number {
  return typeof value === "number" ? value : (value?.getTime() ?? NaN);
}
function formatDuration(milliseconds: number): string {
  const minutes = Math.max(0, Math.round(milliseconds / MINUTE));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return minutes % 60 ? `${hours}h ${minutes % 60}m` : `${hours}h`;
  return hours % 24
    ? `${Math.floor(hours / 24)}d ${hours % 24}h`
    : `${Math.floor(hours / 24)}d`;
}
function agentInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => Array.from(part).find((character) => /[\p{L}\p{N}]/u.test(character)))
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
function timelineTicks(span: number) {
  const step =
    (tickMinutes.find((minutes) => span / (minutes * MINUTE) <= 6) ??
      Math.ceil(span / (8640 * MINUTE)) * 1440) * MINUTE;
  const ago: number[] = [];
  for (let time = span - step; time > 0; time -= step) ago.push(time);
  return { step, ago };
}
function handoffPaths(
  visibleTasks: LaneTask[],
  allTasks: LaneTask[],
  agents: LaneAgent[],
  now: number,
  position: (time: number) => number,
) {
  return visibleTasks.flatMap((task) => {
    const next = task.handoffTo
      ? allTasks.find((candidate) => candidate.id === task.handoffTo)
      : undefined;
    if (!next) return [];
    const startX = position(task.end === undefined ? now : timestamp(task.end)) * 10;
    const endX = position(timestamp(next.start)) * 10;
    const startY =
      agents.findIndex((agent) => agent.id === task.agentId) * ROW_HEIGHT +
      ROW_HEIGHT / 2;
    const endY =
      agents.findIndex((agent) => agent.id === next.agentId) * ROW_HEIGHT +
      ROW_HEIGHT / 2;
    if (startY < 0 || endY < 0) return [];
    const curve = Math.max(24, Math.abs(endX - startX) / 2);
    return [
      {
        id: `${task.id}>${next.id}`,
        path: `M ${startX} ${startY} C ${startX + curve} ${startY}, ${endX - curve} ${endY}, ${endX} ${endY}`,
        live: next.status === "running",
      },
    ];
  });
}
function TaskPopover({
  task,
  agents,
  now,
  position,
  id,
  prefix,
  onDecide,
  onOpen,
}: {
  task: LaneTask;
  agents: LaneAgent[];
  now: number;
  position: (time: number) => number;
  id: string;
  prefix: string;
  onDecide: (task: LaneTask, approve: boolean) => void;
  onOpen?: (task: LaneTask) => void;
}) {
  const row = agents.findIndex((agent) => agent.id === task.agentId);
  const opensUp = row >= agents.length / 2;
  const endTime = task.end === undefined ? now : timestamp(task.end);
  const agent = agents[row];
  const top = opensUp ? row * ROW_HEIGHT + 6 : (row + 1) * ROW_HEIGHT - 6;
  if (task.status === "waiting")
    return (
      <div
        className={`${prefix}__pop ${prefix}__ask`}
        id={`${id}-${task.id}`}
        role="dialog"
        aria-label={`Decide: ${task.title}`}
        data-up={opensUp ? "" : undefined}
        style={{ top, right: `${100 - position(endTime)}%` }}
      >
        <span className={`${prefix}__ask-title`} dir="auto">
          {task.title}
        </span>
        {task.ask && (
          <span className={`${prefix}__ask-text`} dir="auto">
            {task.ask}
          </span>
        )}
        <span className={`${prefix}__ask-actions`}>
          <button
            type="button"
            className={`${prefix}__btn`}
            onClick={() => onDecide(task, false)}
          >
            Reject
          </button>
          <button
            type="button"
            className={`${prefix}__btn ${prefix}__btn--primary`}
            autoFocus
            onClick={() => onDecide(task, true)}
          >
            Approve
          </button>
        </span>
      </div>
    );
  const center = (Math.max(0, position(timestamp(task.start))) + position(endTime)) / 2;
  return (
    <div
      className={`${prefix}__pop ${prefix}__tip`}
      id={`${id}-${task.id}`}
      role="tooltip"
      data-up={opensUp ? "" : undefined}
      style={{ top, left: `${Math.max(14, Math.min(86, center))}%` }}
    >
      <span className={`${prefix}__tip-head`}>
        <span className={`${prefix}__tip-name`} dir="auto">
          {agent?.name}
        </span>
        <span>
          {"· "}
          {taskStatusLabels[task.status ?? ""]}
          {" · "}
          {formatDuration(endTime - timestamp(task.start))}
        </span>
      </span>
      {task.summary?.length ? (
        <ul className={`${prefix}__tip-list`}>
          {task.summary.map((summary) => (
            <li dir="auto" children={summary} key={summary} />
          ))}
        </ul>
      ) : (
        <span className={`${prefix}__tip-title`} dir="auto">
          {task.title}
        </span>
      )}
      {onOpen && (
        <button
          type="button"
          className={`${prefix}__tip-open`}
          onClick={() => onOpen(task)}
        >
          Open
        </button>
      )}
    </div>
  );
}
function useLaneMotion(agents: LaneAgent[]) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const rowElements = useRef(new Map<string | undefined, Set<HTMLElement>>());
  const previousLayout = useRef<LayoutSnapshot | null>(null);
  function registerRow(id: string | undefined) {
    return (element: HTMLElement | null) => {
      if (!element) return;
      const elements = rowElements.current.get(id) ?? new Set<HTMLElement>();
      elements.add(element);
      rowElements.current.set(id, elements);
    };
  }
  const order = agents.map((agent) => agent.id).join("\n");
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    for (const [id, elements] of rowElements.current) {
      for (const element of elements) {
        if (element.isConnected) continue;
        elements.delete(element);
        if (!elements.size) rowElements.current.delete(id);
      }
    }
    const rows = new Map(agents.map((agent, index) => [agent.id, index * ROW_HEIGHT]));
    const height = body.offsetHeight;
    const previous = previousLayout.current;
    previousLayout.current = { height, rows };
    if (!previous || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const timing = {
      duration: TRANSITION_DURATION,
      easing: "cubic-bezier(0.32, 0.72, 0.24, 1)",
    };
    if (previous.height !== height) {
      body.style.overflow = "hidden";
      body
        .animate([{ height: `${previous.height}px` }, { height: `${height}px` }], timing)
        .finished.then(
          () => {
            body.style.overflow = "";
          },
          () => undefined,
        );
    }
    for (const [id, top] of rows) {
      const oldTop = previous.rows.get(id);
      for (const element of rowElements.current.get(id) ?? []) {
        if (oldTop === undefined)
          element.animate([{ opacity: 0 }, { opacity: 1 }], {
            ...timing,
            delay: TRANSITION_DURATION / 3,
          });
        else if (oldTop !== top)
          element.animate(
            [{ transform: `translateY(${oldTop - top}px)` }, { transform: "none" }],
            timing,
          );
      }
    }
  }, [order]);
  return { bodyRef, registerRow };
}
function useAgentLanes(
  { agents, tasks, span = 30 * MINUTE, now, onApprove, onReject }: AgentLanesProps,
  prefix: string,
) {
  const id = useId();
  const [clock, setClock] = useState(() => Date.now());
  const [selectedId, setSelectedId] = useState<string | null | undefined>(null);
  const [overrides, setOverrides] = useState<Record<string, Partial<LaneTask>>>({});
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (now !== undefined) return;
    const timer = window.setInterval(() => setClock(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [now]);
  const currentTime = now ?? clock;
  const windowStart = currentTime - span;
  const { bodyRef, registerRow } = useLaneMotion(agents);
  const resolvedTasks = tasks.map((task) =>
    overrides[String(task.id)] ? { ...task, ...overrides[String(task.id)] } : task,
  );
  function decide(task: LaneTask, approve: boolean) {
    setSelectedId(null);
    const callback = approve ? onApprove : onReject;
    if (callback) {
      callback(task);
      return;
    }
    setOverrides((previous) => ({
      ...previous,
      [String(task.id)]: approve
        ? { status: "running" }
        : { status: "failed", end: currentTime },
    }));
  }
  const screenPosition = (time: number) =>
    Math.min(100, ((time - windowStart) / span) * 100);
  const anchorTime = useRef(currentTime).current;
  const layerPosition = (time: number) => ((time - anchorTime) / span) * 100 + 100;
  const scrollOffset = ((currentTime - anchorTime) / span) * 100;
  const visibleTasks = resolvedTasks.filter(
    (task) => (task.end === undefined ? currentTime : timestamp(task.end)) > windowStart,
  );
  const ticks = useMemo(() => timelineTicks(span), [span]);
  const handoffs = handoffPaths(
    visibleTasks,
    resolvedTasks,
    agents,
    currentTime,
    layerPosition,
  );
  useEffect(() => {
    if (!selectedId) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest(`[data-task="${selectedId}"], .${prefix}__pop`)
      )
        setSelectedId(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [selectedId]);
  const selectedTask = visibleTasks.find((task) => task.id === selectedId);
  const previousStatus = useRef<Record<string, string>>({});
  for (const agent of agents) {
    const active = resolvedTasks.find(
      (task) =>
        task.agentId === agent.id &&
        (task.status === "running" || task.status === "waiting"),
    );
    if (active?.status === "waiting")
      previousStatus.current[String(agent.id)] = "Needs you";
    else if (!active) previousStatus.current[String(agent.id)] = "Idle";
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !selectedId) return;
    event.stopPropagation();
    rootRef.current
      ?.querySelector<HTMLButtonElement>(`[data-task="${selectedId}"]`)
      ?.focus();
    setSelectedId(null);
  }
  return {
    id,
    rootRef,
    bodyRef,
    registerRow,
    currentTime,
    windowStart,
    resolvedTasks,
    selectedId,
    setSelectedId,
    decide,
    screenPosition,
    layerPosition,
    scrollOffset,
    visibleTasks,
    ticks,
    handoffs,
    selectedTask,
    previousStatus: previousStatus.current,
    onKeyDown,
    waitingCount: resolvedTasks.filter((task) => task.status === "waiting").length,
    runningCount: resolvedTasks.filter((task) => task.status === "running").length,
  };
}
function AgentLanesView({
  clean = false,
  ...props
}: AgentLanesProps & {
  clean?: boolean;
}) {
  const {
    agents,
    span = 30 * MINUTE,
    onOpen,
    title = "Agents",
    highlight,
    className,
  } = props;
  const prefix = clean ? "ui-alc" : "ui-al";
  const {
    id,
    rootRef,
    bodyRef,
    registerRow,
    currentTime,
    windowStart,
    resolvedTasks,
    selectedId,
    setSelectedId,
    decide,
    screenPosition,
    layerPosition,
    scrollOffset,
    visibleTasks,
    ticks,
    handoffs,
    selectedTask,
    previousStatus,
    onKeyDown,
    waitingCount,
    runningCount,
  } = useAgentLanes(props, prefix);
  const bodyStyle: CSSProperties & {
    "--rows": number;
  } = {
    "--rows": agents.length,
  };
  const header = (
    <header className={`${prefix}__bar`}>
      <span className={`${prefix}__spark`}>
        <AgentsIcon />
      </span>
      <span className={`${prefix}__title`} title={title}>
        {title}
      </span>
      <span className={`${prefix}__summary`}>
        <span data-kind="running">
          {runningCount}
          {" running"}
        </span>
        {waitingCount > 0 && (
          <span data-kind="needs">
            {waitingCount} {waitingCount === 1 ? "needs" : "need"}
            {" you"}
          </span>
        )}
      </span>
      <span className={`${prefix}__window`}>
        {"Last "}
        {formatDuration(span)}
      </span>
    </header>
  );
  const body = (
    <div ref={bodyRef} className={`${prefix}__body`} style={bodyStyle}>
      <ul className={`${prefix}__agents`}>
        {agents.map((agent) => {
          const activeTask = resolvedTasks.find(
            (task) =>
              task.agentId === agent.id &&
              (task.status === "running" || task.status === "waiting"),
          );
          return (
            <li
              ref={registerRow(agent.id)}
              className={`${prefix}__agent`}
              data-faded={highlight && agent.id !== highlight ? "" : undefined}
              key={agent.id}
            >
              <span
                className={`${prefix}__avatar`}
                data-logo={agent.avatar ? "" : undefined}
              >
                {agent.avatar ?? agentInitials(agent.name ?? "")}
              </span>
              <span
                className={`${prefix}__who`}
                data-state={activeTask?.status ?? "idle"}
              >
                <span className={`${prefix}__name-line`}>
                  <span className={`${prefix}__name`} dir="auto" title={agent.name}>
                    {agent.name}
                  </span>
                  <span
                    className={`${prefix}__state`}
                    data-show={activeTask?.status === "running" ? undefined : ""}
                    aria-hidden={activeTask?.status === "running"}
                  >
                    <span>
                      {activeTask?.status === "waiting"
                        ? "Needs you"
                        : activeTask
                          ? (previousStatus[String(agent.id)] ?? "Idle")
                          : "Idle"}
                    </span>
                  </span>
                </span>
                <span className={`${prefix}__model`}>
                  {agent.model && (
                    <span className={`${prefix}__model-name`} title={agent.model}>
                      {agent.model}
                    </span>
                  )}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className={`${prefix}__track`}>
        <div className={`${prefix}__grid`} aria-hidden="true">
          {ticks.ago.map((ago) => (
            <span
              className={`${prefix}__tick`}
              style={{ left: `${100 - (ago / span) * 100}%` }}
              children={
                <span>
                  {"−"}
                  {formatDuration(ago)}
                </span>
              }
              key={ago}
            />
          ))}
        </div>
        <div className={`${prefix}__clip`}>
          <div
            className={`${prefix}__layer`}
            style={{ transform: `translateX(${-scrollOffset}%)` }}
          >
            <svg
              className={`${prefix}__curves`}
              viewBox={`0 0 1000 ${agents.length * ROW_HEIGHT}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {handoffs.map((handoff) => (
                <path
                  d={handoff.path}
                  data-live={handoff.live ? "" : undefined}
                  vectorEffect="non-scaling-stroke"
                  key={handoff.id}
                />
              ))}
            </svg>
            {agents.map((agent, index) => (
              <ul
                ref={registerRow(agent.id)}
                className={`${prefix}__lane`}
                data-faded={highlight && agent.id !== highlight ? "" : undefined}
                style={{ top: index * ROW_HEIGHT }}
                aria-label={`${agent.name}'s tasks`}
                key={agent.id}
              >
                {visibleTasks
                  .filter((task) => task.agentId === agent.id)
                  .map((task) => {
                    const endTime =
                      task.end === undefined ? currentTime : timestamp(task.end);
                    const startTime = timestamp(task.start);
                    const width = ((endTime - startTime) / span) * 100;
                    const duration = formatDuration(endTime - startTime);
                    const open = selectedId === task.id;
                    const clippedFraction =
                      task.end === undefined && startTime < windowStart
                        ? (windowStart - startTime) / (endTime - startTime)
                        : 0;
                    return (
                      <li
                        className={`${prefix}__slot`}
                        data-status={task.status}
                        style={{
                          left: `${layerPosition(startTime)}%`,
                          width: `${width}%`,
                        }}
                        key={task.id}
                      >
                        <button
                          type="button"
                          data-task={task.id}
                          className={`${prefix}__block`}
                          data-status={task.status}
                          title={task.title}
                          style={
                            clippedFraction
                              ? {
                                  paddingLeft: `calc(${clippedFraction * 100}% + 40px)`,
                                }
                              : undefined
                          }
                          data-open={open ? "" : undefined}
                          aria-expanded={open}
                          aria-controls={`${id}-${task.id}`}
                          aria-label={`${agent.name}: ${task.title} – ${taskStatusLabels[task.status ?? ""]}${task.status === "done" ? `, took ${duration}` : `, ${duration}`}`}
                          onClick={() => setSelectedId(open ? null : task.id)}
                        >
                          {task.tools && task.tools.length > 0 && (
                            <span className={`${prefix}__tools`} aria-hidden="true">
                              {task.tools.slice(0, 3).map((tool, index) => (
                                <span
                                  className={`${prefix}__tool`}
                                  children={tool}
                                  key={index}
                                />
                              ))}
                            </span>
                          )}
                          <span className={`${prefix}__label`} dir="auto">
                            {task.title}
                          </span>
                        </button>
                        {task.status === "waiting" && (
                          <span className={`${prefix}__flag`} aria-hidden="true">
                            <WaitingIcon />
                            Needs you
                          </span>
                        )}
                      </li>
                    );
                  })}
              </ul>
            ))}
          </div>
        </div>
        {selectedTask && (
          <TaskPopover
            task={selectedTask}
            agents={agents}
            now={currentTime}
            position={screenPosition}
            id={id}
            prefix={prefix}
            onDecide={decide}
            onOpen={onOpen}
          />
        )}
        <span className={`${prefix}__now`} aria-hidden="true">
          <span>now</span>
        </span>
      </div>
    </div>
  );
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      onKeyDown={onKeyDown}
    >
      {clean ? (
        <div className={`${prefix}__card`}>
          {header}
          {body}
        </div>
      ) : (
        <>
          {header}
          <div className={`${prefix}__card`}>{body}</div>
        </>
      )}
      <span className={`${prefix}__sr`} aria-live="polite">
        {waitingCount > 0
          ? `${waitingCount} task${waitingCount === 1 ? "" : "s"} need you`
          : `${runningCount} running`}
      </span>
    </div>
  );
}
const MINUTE = 60000;
const ROW_HEIGHT = 48;
const taskStatusLabels: Record<string, string> = {
  done: "Done",
  running: "Running",
  waiting: "Needs you",
  failed: "Failed",
};
const tickMinutes = [1, 5, 10, 15, 30, 60, 120, 180, 360, 720, 1440];
const TRANSITION_DURATION = 420;
export { AgentLanes };
export type { AgentLanesProps };
export type { LaneAgent };
export type { LaneTask };
