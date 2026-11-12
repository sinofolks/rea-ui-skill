"use client";

import "./AgentHandoff.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  useEffect,
  type PointerEvent as ReactPointerEvent,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type HandoffAgent = {
  id?: string;
  name?: string;
  model?: string;
  description?: string;
  /** An image URL or a custom React avatar. */
  avatar?: ReactNode;
  cost?: number;
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type Handoff = {
  id?: string;
  from?: string;
  to?: string;
  task?: string;
  items?: HandoffItem[];
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type HandoffTask = {
  id?: string;
  title?: string;
  description?: string;
  logo?: ReactNode;
  status?: string;
  agent?: string;
  note?: string;
  tools?: Array<{
    id?: string;
    name?: string;
    logo?: ReactNode;
    detail?: string;
    [field: string]: unknown;
  }>;
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type HandoffItem = {
  id?: string;
  name?: string;
  label?: string;
  /** Recognized icons: file, source, fact, decision, and note. */
  kind?: string;
  lost?: boolean;
  why?: string;
  [field: string]: unknown;
};
interface AgentHandoffProps {
  agents: HandoffAgent[];
  handoffs: Handoff[];
  tasks: HandoffTask[];
  onAssign?: (task: HandoffTask, agent: HandoffAgent) => void;
  onRestore?: (handoff: Handoff, item: HandoffItem) => void;
  className?: string;
}
type TaskStatus = "todo" | "working" | "done" | "warning";
interface Agent {
  id: string;
  key: string;
  name: string;
  model?: string;
  description?: string;
  avatar?: ReactNode;
  cost?: number;
  source: HandoffAgent;
}
interface Item {
  label?: string;
  kind?: string;
  lost: boolean;
  why?: string;
  source: HandoffItem;
}
interface Transfer {
  id: string;
  key: string;
  from: string;
  to: string;
  task: string;
  items: Item[];
  source: Handoff;
}
interface Task {
  id?: string;
  title: string;
  description?: string;
  logo?: ReactNode;
  status: TaskStatus;
  agent?: string;
  note?: string;
  tools: {
    name?: string;
    logo?: ReactNode;
    detail?: string;
  }[];
}
interface Connection {
  index: number;
  incoming: string;
  outgoing: string;
  incomingLength: number;
  outgoingLength: number;
  dots: [number, number][];
}
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
type GridStyle = CSSProperties & {
  "--c"?: number;
  "--n"?: number;
};
type StreakStyle = CSSProperties & Record<"--len" | "--shift" | "--o", string>;
interface HeldTask {
  handoffKey: string;
  taskId?: string;
  after: number;
}
interface DragOrigin extends HeldTask {
  title: string;
  logo?: ReactNode;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
  width: number;
}
interface DraggedTask extends DragOrigin {
  x: number;
  y: number;
}
interface ViewProps extends AgentHandoffProps {
  clean: boolean;
}
function AgentHandoff(props: AgentHandoffProps) {
  return <AgentHandoffView {...props} clean />;
}
function renderNode(value: unknown): ReactNode {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "boolean" ||
    value == null ||
    isValidElement(value)
  )
    return value;
  if (Array.isArray(value)) return value.map(renderNode);
  return null;
}
function keyed<
  T extends {
    [field: string]: unknown;
  },
>(sources: T[]) {
  const occurrences = new Map<string, number>();
  return (Array.isArray(sources) ? sources : [])
    .filter((source) => !!source && typeof source === "object")
    .map((source) => {
      const id = String(source.id ?? "");
      const occurrence = occurrences.get(id) ?? 0;
      occurrences.set(id, occurrence + 1);
      return { source, id, key: occurrence ? `${id}#${occurrence}` : id };
    });
}
function normalizeAgents(sources: HandoffAgent[]): Agent[] {
  return keyed(sources).map(({ source, id, key }) => ({
    id,
    key,
    source,
    name: String(source.name ?? "").trim() || id || "Agent",
    model: text(source.model),
    description: text(source.description),
    avatar: renderNode(source.avatar),
    cost: typeof source.cost === "number" ? source.cost : undefined,
  }));
}
function normalizeTransfers(sources: Handoff[]): Transfer[] {
  return keyed(sources).map(({ source, id, key }) => ({
    id,
    key,
    source,
    from: String(source.from ?? ""),
    to: String(source.to ?? ""),
    task: String(source.task ?? ""),
    items: (Array.isArray(source.items) ? source.items : [])
      .filter((item) => !!item && typeof item === "object")
      .map((item) => ({
        label: item.label,
        kind: text(item.kind),
        lost: !!item.lost,
        why: text(item.why),
        source: item,
      })),
  }));
}
function normalizeTasks(sources: HandoffTask[]): Task[] {
  return (Array.isArray(sources) ? sources : [])
    .filter((task) => !!task && typeof task === "object")
    .map((task) => ({
      id: task.id,
      title: String(task.title ?? ""),
      description: task.description,
      logo: task.logo,
      status:
        task.status === "working" || task.status === "done" || task.status === "warning"
          ? task.status
          : "todo",
      agent: task.agent,
      note: task.note,
      tools: (Array.isArray(task.tools) ? task.tools : []).filter(
        (tool) => !!tool && typeof tool === "object",
      ),
    }));
}
function formatCost(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null;
  if (value > 0 && value < 0.001) return "<$0.001";
  return value < 0.01
    ? preciseCurrency.format(value)
    : value >= 10000
      ? compactCurrency.format(value)
      : currencyFormat.format(value);
}
function initial(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words.find((word) => /^[\p{L}\p{N}]/u.test(word)) ?? words[0] ?? "";
  const characters =
    typeof Intl.Segmenter === "function"
      ? Array.from(new Intl.Segmenter().segment(first), (part) => part.segment)
      : Array.from(first);
  return (characters[0] ?? "").toUpperCase();
}
function connectionGeometry(
  index: number,
  from: Rect,
  to: Rect,
  column: Rect,
): Connection {
  const fromX = from.x + from.width / 2;
  const fromY = from.y + from.height;
  const toX = to.x + to.width / 2;
  const toY = to.y + to.height;
  const columnY = column.y;
  const middleY = Math.round(fromY + (columnY - fromY) / 2);
  const entryX = column.x + column.width / 2 - 14;
  const exitX = column.x + column.width / 2 + 14;
  const path = (startX: number, startY: number, endX: number, endY: number) => {
    const delta = endX - startX;
    if (Math.abs(delta) < 2) return `M${startX} ${startY}V${endY}`;
    const radius = Math.max(
      0,
      Math.min(
        10,
        Math.abs(delta) / 2,
        Math.abs(middleY - startY) - 1,
        Math.abs(endY - middleY) - 1,
      ),
    );
    const across = Math.sign(delta);
    const into = Math.sign(middleY - startY);
    const out = Math.sign(endY - middleY);
    return `M${startX} ${startY}V${middleY - into * radius}Q${startX} ${middleY} ${startX + across * radius} ${middleY}H${endX - across * radius}Q${endX} ${middleY} ${endX} ${middleY + out * radius}V${endY}`;
  };
  const length = (startX: number, startY: number, endX: number, endY: number) =>
    Math.abs(middleY - startY) + Math.abs(endX - startX) + Math.abs(endY - middleY);
  return {
    index,
    incoming: path(fromX, fromY, entryX, columnY),
    outgoing: path(exitX, columnY, toX, toY),
    incomingLength: length(fromX, fromY, entryX, columnY),
    outgoingLength: length(exitX, columnY, toX, toY),
    dots: [
      [fromX, fromY],
      [toX, toY],
      [entryX, columnY],
      [exitX, columnY],
    ],
  };
}
function HandoffIcon({ kind }: { kind: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "lost" ? (
        <>
          <circle cx="6" cy="6" r="4" />
          <path d="m3.2 8.8 5.6-5.6" />
        </>
      ) : (
        <path d={ITEM_PATHS[kind as keyof typeof ITEM_PATHS] ?? ITEM_PATHS.note} />
      )}
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z"
        fill="currentColor"
      />
      <circle cx="11.6" cy="11.4" r="1.1" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
function WorkingSpinner({ prefix }: { prefix: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className={`${prefix}__spin`}>
      <circle
        cx="6"
        cy="6"
        r="4.25"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <path
        d="M6 1.75A4.25 4.25 0 0 1 10.25 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function TaskStatusIcon({ prefix, status }: { prefix: string; status: TaskStatus }) {
  return (
    <span className={`${prefix}__state-icon`} data-status={status} aria-hidden="true">
      {status === "todo" && (
        <svg viewBox="0 0 12 12">
          <circle
            cx="6"
            cy="6"
            r="4.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M6 1.6a4.4 4.4 0 0 1 0 8.8Z" fill="currentColor" />
        </svg>
      )}
      {status === "working" && (
        <svg viewBox="0 0 12 12" className={`${prefix}__spin`}>
          <circle
            cx="6"
            cy="6"
            r="4.6"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1.6"
          />
          <path
            d="M6 1.4a4.6 4.6 0 0 1 4.6 4.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
      {status === "warning" && (
        <svg viewBox="0 0 12 12">
          <path d="M6 1.6 11 10.2H1L6 1.6Z" fill="currentColor" />
        </svg>
      )}
      {status === "done" && (
        <svg viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="3.4" fill="currentColor" />
        </svg>
      )}
    </span>
  );
}
function AgentAvatar({
  avatar,
  name,
  className,
}: {
  avatar?: ReactNode;
  name: string;
  className: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={className} aria-hidden="true" onErrorCapture={() => setFailed(true)}>
      {avatar != null && avatar !== false && !failed ? avatar : initial(name)}
    </span>
  );
}
function HandoffSwap({
  prefix,
  id,
  className,
  children,
}: {
  prefix: string;
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const previous = useRef({ id, node: children });
  const [outgoing, setOutgoing] = useState<typeof previous.current | null>(null);
  if (previous.current.id !== id && outgoing?.id !== previous.current.id)
    setOutgoing(previous.current);
  useLayoutEffect(() => {
    previous.current = { id, node: children };
  });
  return (
    <span className={[`${prefix}__swap`, className].filter(Boolean).join(" ")}>
      {outgoing && (
        <span
          className={`${prefix}__swap-layer`}
          data-leaving=""
          aria-hidden="true"
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setOutgoing(null);
          }}
          key={`out-${outgoing.id}`}
        >
          {outgoing.node}
        </span>
      )}
      <span
        className={`${prefix}__swap-layer`}
        data-coming={outgoing ? "" : undefined}
        key={id}
      >
        {children}
      </span>
    </span>
  );
}
function ConnectionStreaks({
  prefix,
  path,
  length,
  outgoing,
}: {
  prefix: string;
  path: string;
  length: number;
  outgoing?: boolean;
}) {
  return (
    <>
      {Array.from({ length: 16 }, (_, index) => (
        <path
          className={`${prefix}__streak`}
          data-on={outgoing ? "" : undefined}
          d={path}
          style={
            {
              "--len": `${length}px`,
              "--shift": `${index * 3}px`,
              "--o": Math.max(0.06, 1 - Math.abs((2 * index) / 15 - 1)).toFixed(2),
            } as StreakStyle
          }
          key={index}
        />
      ))}
    </>
  );
}
function useHandoff(
  {
    agents: sourceAgents,
    handoffs: sourceHandoffs,
    tasks: sourceTasks,
    onAssign,
  }: AgentHandoffProps,
  prefix: string,
) {
  const agents = normalizeAgents(sourceAgents);
  const transfers = normalizeTransfers(sourceHandoffs);
  const tasks = normalizeTasks(sourceTasks);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [held, setHeld] = useState<HeldTask | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const agentRefs = useRef(new Map<string, HTMLDivElement>());
  const columnRefs = useRef(new Map<number, HTMLElement>());
  const [connections, setConnections] = useState<Connection[]>([]);
  const seenTransfers = useRef(new Set(transfers.map((transfer) => transfer.key)));
  const [arriving, setArriving] = useState<string[]>([]);
  const unseen = transfers
    .filter((transfer) => !seenTransfers.current.has(transfer.key))
    .map((transfer) => transfer.key);
  const inTransit = new Set([...arriving, ...unseen]);
  useLayoutEffect(() => {
    if (!unseen.length) return;
    unseen.forEach((key) => seenTransfers.current.add(key));
    setArriving((previous) => [...previous, ...unseen]);
    window.setTimeout(
      () => setArriving((previous) => previous.filter((key) => !unseen.includes(key))),
      ARRIVAL_DELAY,
    );
  });
  const latestTransfers = agents
    .slice(0, -1)
    .map((agent, index) =>
      [...transfers]
        .reverse()
        .find(
          (transfer) =>
            transfer.from === agent.id && transfer.to === agents[index + 1].id,
        ),
    );
  const workingTask = (agent: Agent) =>
    tasks.find((task) => task.status === "working" && task.agent === agent.id);
  const taskByTitle = (title: string) => tasks.find((task) => task.title === title);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [peekAgent, setPeekAgent] = useState<string | null>(null);
  useEffect(() => {
    if (!peekAgent) return;
    const dismissOutside = (event: PointerEvent) => {
      if (
        !(event.target instanceof Node) ||
        !agentRefs.current.get(peekAgent)?.contains(event.target)
      )
        setPeekAgent(null);
    };
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPeekAgent(null);
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissEscape);
    };
  }, [peekAgent]);
  const cardRefs = useRef(new Map<string, HTMLLIElement>());
  const previousPositions = useRef(new Map<string, number>());
  const previousOrder = useRef("");
  useLayoutEffect(() => {
    const order = transfers
      .filter((transfer) => !inTransit.has(transfer.key))
      .map((transfer) => transfer.key)
      .join();
    const reordered = order !== previousOrder.current;
    previousOrder.current = order;
    const positions = new Map<string, number>();
    cardRefs.current.forEach((card, key) => {
      const top = card.offsetTop;
      positions.set(key, top);
      const previous = previousPositions.current.get(key);
      if (reordered && previous != null && previous !== top)
        card.animate(
          [{ transform: `translateY(${previous - top}px)` }, { transform: "none" }],
          { duration: 480, easing: "cubic-bezier(0.32, 0.72, 0.24, 1)" },
        );
    });
    previousPositions.current = positions;
  });
  const agentKey = agents.map((agent) => agent.key).join();
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const origin = root.getBoundingClientRect();
      const scale = origin.width / (root.offsetWidth || 1);
      const rect = (element: HTMLElement) => {
        const bounds = element.getBoundingClientRect();
        return {
          x: (bounds.left - origin.left) / scale,
          y: (bounds.top - origin.top) / scale,
          width: bounds.width / scale,
          height: bounds.height / scale,
        };
      };
      const next: Connection[] = [];
      for (let index = 0; index < agents.length - 1; index++) {
        const from = agentRefs.current.get(agents[index].key);
        const to = agentRefs.current.get(agents[index + 1].key);
        const column = columnRefs.current.get(index);
        if (from && to && column)
          next.push(connectionGeometry(index, rect(from), rect(to), rect(column)));
      }
      setConnections((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [agents.length, agentKey]);
  const [dragged, setDragged] = useState<DraggedTask | null>(null);
  const dragOrigin = useRef<DragOrigin | null>(null);
  const activeDrag = useRef<DraggedTask | null>(null);
  const suppressClick = useRef(false);
  const carried = dragged ?? held;
  const canReceive = (index: number) => !carried || index > carried.after;
  const assignTask = (taskId: string | undefined, agent: Agent, after: number) => {
    const task = (Array.isArray(sourceTasks) ? sourceTasks : []).find(
      (task) => task && task.id === taskId,
    );
    if (task && agents.findIndex((candidate) => candidate.key === agent.key) > after)
      onAssign?.(task, agent.source);
    setHeld(null);
    setDropTarget(null);
  };
  const startDrag = (
    event: ReactPointerEvent<HTMLButtonElement>,
    handoffKey: string,
    task: Task,
    after: number,
  ) => {
    if (event.button !== 0 || event.pointerType === "touch") return;
    suppressClick.current = false;
    const bounds = event.currentTarget.getBoundingClientRect();
    dragOrigin.current = {
      handoffKey,
      taskId: task.id,
      after,
      title: task.title,
      logo: task.logo,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
      width: bounds.width,
    };
  };
  const agentAt = (x: number, y: number, after: number) => {
    const element = document
      .elementFromPoint(x, y)
      ?.closest<HTMLElement>(`.${prefix}__agent`);
    const index =
      element && rootRef.current?.contains(element) ? Number(element.dataset.i) : -1;
    return index > after ? agents[index] : undefined;
  };
  useEffect(() => {
    const move = (event: PointerEvent) => {
      const origin = dragOrigin.current;
      if (
        !origin ||
        (!activeDrag.current &&
          Math.hypot(event.clientX - origin.startX, event.clientY - origin.startY) < 5)
      )
        return;
      const next = { ...origin, x: event.clientX, y: event.clientY };
      activeDrag.current = next;
      suppressClick.current = true;
      setDragged(next);
      setDropTarget(agentAt(event.clientX, event.clientY, origin.after)?.key ?? null);
    };
    const finish = (event: PointerEvent) => {
      const active = activeDrag.current;
      dragOrigin.current = null;
      activeDrag.current = null;
      if (!active) return;
      const target = agentAt(event.clientX, event.clientY, active.after);
      if (target) assignTask(active.taskId, target, active.after);
      setDragged(null);
      setDropTarget(null);
    };
    const cancel = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dragOrigin.current = null;
        activeDrag.current = null;
        setDragged(null);
        setDropTarget(null);
        setHeld(null);
      }
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", finish);
    document.addEventListener("pointercancel", finish);
    document.addEventListener("keydown", cancel);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", finish);
      document.removeEventListener("pointercancel", finish);
      document.removeEventListener("keydown", cancel);
    };
  });
  return {
    agents,
    transfers,
    tasks,
    expandedItem,
    setExpandedItem,
    held,
    setHeld,
    dropTarget,
    rootRef,
    agentRefs,
    columnRefs,
    connections,
    inTransit,
    latestTransfers,
    workingTask,
    taskByTitle,
    expandedCard,
    setExpandedCard,
    peekAgent,
    setPeekAgent,
    cardRefs,
    dragged,
    suppressClick,
    carried,
    canReceive,
    assignTask,
    startDrag,
  };
}
function AgentHandoffView(props: ViewProps) {
  const { onRestore, className, clean } = props;
  const prefix = clean ? "ui-ahc" : "ui-ah";
  const state = useHandoff(props, prefix);
  const drag = state.dragged;
  return (
    <div
      ref={state.rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      style={{ "--n": state.agents.length } as GridStyle}
      data-holding={state.held ? "" : undefined}
      data-carrying={drag ? "" : undefined}
    >
      {state.agents.length === 0 && <p className={`${prefix}__none`}>No agents yet</p>}
      {drag && state.rootRef.current && (
        <div
          className={`${prefix}__ghost`}
          aria-hidden="true"
          style={{
            left:
              drag.x - drag.offsetX - state.rootRef.current.getBoundingClientRect().left,
            top:
              drag.y - drag.offsetY - state.rootRef.current.getBoundingClientRect().top,
            width: drag.width,
          }}
        >
          <span className={`${prefix}__card-mark`}>{drag.logo ?? <SparkIcon />}</span>
          <span className={`${prefix}__card-title`}>{drag.title}</span>
        </div>
      )}
      <svg className={`${prefix}__lines`} aria-hidden="true">
        {state.connections.map((connection) => (
          <g
            data-passed={state.latestTransfers[connection.index] ? "" : undefined}
            key={connection.index}
          >
            <path className={`${prefix}__line`} d={connection.incoming} />
            <path className={`${prefix}__line`} d={connection.outgoing} />
            {state.latestTransfers[connection.index] && (
              <g
                className={`${prefix}__light`}
                key={state.latestTransfers[connection.index]!.key}
              >
                <ConnectionStreaks
                  prefix={prefix}
                  path={connection.incoming}
                  length={connection.incomingLength}
                />
                <ConnectionStreaks
                  prefix={prefix}
                  path={connection.outgoing}
                  length={connection.outgoingLength}
                  outgoing
                />
              </g>
            )}
          </g>
        ))}
      </svg>
      <div className={`${prefix}__flow`}>
        {state.agents.map((agent, index) => {
          const working = state.workingTask(agent);
          const status = working ? "working" : "idle";
          const nextTask =
            working ??
            (index === 0
              ? state.tasks.find((task) => task.status === "todo")
              : undefined);
          const peek = state.peekAgent === agent.key && !!nextTask;
          const cost = agent.cost == null ? null : formatCost(agent.cost);
          const queue =
            index === 0 ? state.tasks.filter((task) => task.status === "todo") : [];
          return (
            <div
              ref={(element) => {
                if (element) state.agentRefs.current.set(agent.key, element);
                else state.agentRefs.current.delete(agent.key);
              }}
              className={`${prefix}__agent`}
              style={{ "--c": index * 2 + 1 } as GridStyle}
              data-status={status}
              data-over={state.dropTarget === agent.key ? "" : undefined}
              data-i={index}
              data-blocked={state.carried && !state.canReceive(index) ? "" : undefined}
              data-peek={peek ? "" : undefined}
              role="button"
              tabIndex={0}
              aria-label={
                state.held
                  ? `Give the task to ${agent.name}`
                  : `${agent.name}${nextTask ? ` – ${nextTask.title}` : ""}`
              }
              aria-expanded={state.held ? undefined : peek}
              onClick={() => {
                if (state.held) {
                  if (state.canReceive(index))
                    state.assignTask(state.held.taskId, agent, state.held.after);
                } else if (nextTask) state.setPeekAgent(peek ? null : agent.key);
              }}
              onKeyDown={(event) => {
                if (
                  event.target === event.currentTarget &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  event.currentTarget.click();
                }
              }}
              key={agent.key}
            >
              <span className={`${prefix}__top`}>
                <AgentAvatar
                  className={`${prefix}__face`}
                  avatar={agent.avatar}
                  name={agent.name}
                />
                <span className={`${prefix}__who`}>
                  <span className={`${prefix}__name`} dir="auto" title={agent.name}>
                    {agent.name}
                  </span>
                  {agent.model && (
                    <span
                      className={`${prefix}__model`}
                      dir="auto"
                      title={String(agent.model)}
                    >
                      {agent.model}
                    </span>
                  )}
                </span>
                {cost && (
                  <span
                    className={`${prefix}__cost`}
                    data-live={working ? "" : undefined}
                    title={`Cost so far: ${currencyFormat.format(agent.cost!)}`}
                  >
                    {cost}
                  </span>
                )}
                <span className={`${prefix}__status`} data-status={status}>
                  {status === "working" && <WorkingSpinner prefix={prefix} />}
                  <HandoffSwap
                    prefix={prefix}
                    id={status}
                    className={`${prefix}__status-word`}
                  >
                    {status === "working" ? "Working" : "Idle"}
                  </HandoffSwap>
                </span>
              </span>
              {agent.description && (
                <span
                  className={`${prefix}__desc`}
                  dir="auto"
                  title={String(agent.description)}
                >
                  {agent.description}
                </span>
              )}
              <span className={`${prefix}__now`}>
                <HandoffSwap
                  prefix={prefix}
                  id={
                    working
                      ? `now-${working.id}`
                      : queue.length
                        ? `next-${queue[0].id}`
                        : "idle"
                  }
                >
                  {working ? (
                    <>
                      {working.logo && (
                        <span className={`${prefix}__logo`}>{working.logo}</span>
                      )}
                      <span
                        className={`${prefix}__now-task`}
                        dir="auto"
                        title={working.title}
                      >
                        {working.title}
                      </span>
                      {working.note && (
                        <span
                          className={`${prefix}__now-note ${prefix}__shine`}
                          dir="auto"
                          title={working.note}
                        >
                          {working.note}
                        </span>
                      )}
                    </>
                  ) : queue.length ? (
                    <>
                      <span className={`${prefix}__now-idle`}>Up next</span>
                      {queue[0].logo && (
                        <span className={`${prefix}__logo`}>{queue[0].logo}</span>
                      )}
                      <span
                        className={`${prefix}__now-task`}
                        dir="auto"
                        title={queue[0].title}
                      >
                        {queue[0].title}
                      </span>
                      {queue.length > 1 && (
                        <span
                          className={`${prefix}__now-more`}
                          title={`${countFormat.format(queue.length - 1)} more`}
                        >
                          {"+"}
                          {compactCount(queue.length - 1)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className={`${prefix}__now-idle`}>Ready for a task</span>
                  )}
                </HandoffSwap>
              </span>
              {peek && nextTask && (
                <div
                  className={`${prefix}__peek`}
                  role="dialog"
                  aria-label={nextTask.title}
                  onClick={(event) => event.stopPropagation()}
                >
                  <span className={`${prefix}__peek-head`}>
                    {nextTask.logo && (
                      <span className={`${prefix}__logo`}>{nextTask.logo}</span>
                    )}
                    <span
                      className={`${prefix}__peek-title`}
                      dir="auto"
                      title={nextTask.title}
                    >
                      {nextTask.title}
                    </span>
                    <button
                      type="button"
                      className={`${prefix}__peek-x`}
                      aria-label="Close"
                      onClick={() => state.setPeekAgent(null)}
                    >
                      <HandoffIcon kind="close" />
                    </button>
                  </span>
                  <span className={`${prefix}__peek-state`}>
                    {working ? (
                      <span className={`${prefix}__shine`}>
                        {working.note ?? "Working"}
                      </span>
                    ) : (
                      "Up next"
                    )}
                  </span>
                  <div className={`${prefix}__peek-body`}>
                    {nextTask.description && (
                      <p className={`${prefix}__peek-desc`}>{nextTask.description}</p>
                    )}
                    {!!nextTask.tools.length && (
                      <>
                        <span className={`${prefix}__peek-label`}>Tools</span>
                        <ul className={`${prefix}__tools`}>
                          {nextTask.tools.map((tool, toolIndex) => (
                            <li className={`${prefix}__tool`} key={toolIndex}>
                              <span className={`${prefix}__logo`}>
                                {tool.logo ?? <SparkIcon />}
                              </span>
                              <span
                                className={`${prefix}__tool-name`}
                                dir="auto"
                                title={tool.name}
                              >
                                {tool.name}
                              </span>
                              {tool.detail && (
                                <span
                                  className={`${prefix}__tool-detail`}
                                  title={String(tool.detail)}
                                >
                                  {tool.detail}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {state.agents.slice(0, -1).map((from, index) => {
          const to = state.agents[index + 1];
          const transfers = state.transfers
            .filter(
              (transfer) =>
                transfer.from === from.id &&
                transfer.to === to.id &&
                !state.inTransit.has(transfer.key),
            )
            .reverse();
          return (
            <section
              ref={(element) => {
                if (element) state.columnRefs.current.set(index, element);
                else state.columnRefs.current.delete(index);
              }}
              className={`${prefix}__col`}
              style={{ "--c": index * 2 + 2 } as GridStyle}
              aria-label={`Handed from ${from.name} to ${to.name}`}
              key={`p-${index}`}
            >
              <span className={`${prefix}__col-head`}>
                <span
                  className={`${prefix}__col-who`}
                  title={`${from.name} → ${to.name}`}
                >
                  <AgentAvatar
                    className={`${prefix}__col-face`}
                    avatar={from.avatar}
                    name={from.name}
                  />
                  <span className={`${prefix}__col-name`} dir="auto">
                    {from.name}
                  </span>
                  <span className={`${prefix}__col-arrow`}>
                    <HandoffIcon kind="arrow" />
                  </span>
                  <AgentAvatar
                    className={`${prefix}__col-face`}
                    avatar={to.avatar}
                    name={to.name}
                  />
                  <span className={`${prefix}__col-name`} dir="auto">
                    {to.name}
                  </span>
                </span>
                <span
                  className={`${prefix}__lane-n`}
                  title={
                    transfers.length > 999
                      ? countFormat.format(transfers.length)
                      : undefined
                  }
                >
                  {compactCount(transfers.length)}
                </span>
              </span>
              <ul className={`${prefix}__cards`}>
                {transfers.map((transfer) => {
                  const task = state.taskByTitle(transfer.task);
                  const kept = transfer.items.filter((item) => !item.lost);
                  const lost = transfer.items.filter((item) => item.lost);
                  const expanded = state.expandedCard === transfer.key;
                  const status = task?.status ?? "done";
                  const assignedAgent = state.agents.find(
                    (agent) => agent.id === task?.agent,
                  );
                  const held = state.held?.handoffKey === transfer.key;
                  return (
                    <li
                      ref={(element) => {
                        if (element) state.cardRefs.current.set(transfer.key, element);
                        else state.cardRefs.current.delete(transfer.key);
                      }}
                      className={`${prefix}__card`}
                      data-status={status}
                      data-open={expanded ? "" : undefined}
                      data-lost={lost.length ? "" : undefined}
                      key={transfer.key}
                    >
                      <button
                        type="button"
                        className={`${prefix}__card-main`}
                        data-movable={task ? "" : undefined}
                        data-carried={drag?.handoffKey === transfer.key ? "" : undefined}
                        aria-expanded={expanded}
                        aria-pressed={task ? held : undefined}
                        onPointerDown={(event) => {
                          if (task) state.startDrag(event, transfer.key, task, index);
                        }}
                        onClick={() => {
                          if (state.suppressClick.current) {
                            state.suppressClick.current = false;
                            return;
                          }
                          state.setExpandedCard(expanded ? null : transfer.key);
                        }}
                        onDoubleClick={() => {
                          if (task)
                            state.setHeld(
                              held
                                ? null
                                : {
                                    handoffKey: transfer.key,
                                    taskId: task.id,
                                    after: index,
                                  },
                            );
                        }}
                      >
                        <span className={`${prefix}__card-top`}>
                          <span className={`${prefix}__card-mark`}>
                            {task?.logo ?? <SparkIcon />}
                          </span>
                          <span
                            className={`${prefix}__card-title`}
                            dir="auto"
                            title={transfer.task}
                          >
                            {transfer.task}
                          </span>
                        </span>
                        {(kept.length > 0 || lost.length > 0) && (
                          <span
                            className={`${prefix}__card-desc`}
                            dir="auto"
                            title={
                              kept.length
                                ? kept.map((item) => item.label).join(", ")
                                : undefined
                            }
                          >
                            {kept.length
                              ? kept.map((item) => item.label).join(", ")
                              : "All lost"}
                          </span>
                        )}
                        <span className={`${prefix}__card-foot`}>
                          <HandoffSwap
                            prefix={prefix}
                            id={`${status}-${task?.agent}-${held}`}
                            className={`${prefix}__card-state`}
                          >
                            <TaskStatusIcon prefix={prefix} status={status} />
                            <span className={`${prefix}__card-word`} dir="auto">
                              {held
                                ? "Now tap an agent"
                                : status === "working"
                                  ? assignedAgent
                                    ? `With ${assignedAgent.name}`
                                    : "Handing on"
                                  : status === "todo"
                                    ? TASK_STATUS_LABELS.todo
                                    : (task?.note ?? TASK_STATUS_LABELS[status])}
                            </span>
                          </HandoffSwap>
                        </span>
                      </button>
                      <div
                        className={`${prefix}__fold`}
                        data-open={expanded ? "" : undefined}
                        inert={!expanded}
                      >
                        <div className={`${prefix}__clip`}>
                          <ul className={`${prefix}__items`}>
                            {[...kept, ...lost].map((item, itemIndex) => {
                              const key = `${transfer.key}-${itemIndex}`;
                              return (
                                <li className={`${prefix}__item-wrap`} key={key}>
                                  <button
                                    type="button"
                                    className={`${prefix}__item`}
                                    data-lost={item.lost ? "" : undefined}
                                    aria-expanded={
                                      item.lost ? state.expandedItem === key : undefined
                                    }
                                    onClick={() => {
                                      if (item.lost)
                                        state.setExpandedItem(
                                          state.expandedItem === key ? null : key,
                                        );
                                    }}
                                  >
                                    <span className={`${prefix}__kind`}>
                                      <HandoffIcon
                                        kind={item.lost ? "lost" : (item.kind ?? "note")}
                                      />
                                    </span>
                                    <span
                                      className={`${prefix}__label`}
                                      dir="auto"
                                      title={String(item.label ?? "")}
                                    >
                                      {item.label}
                                    </span>
                                  </button>
                                  {item.lost && state.expandedItem === key && (
                                    <span className={`${prefix}__why`}>
                                      <span>
                                        {item.why ??
                                          "It didn't make it to the next agent."}
                                      </span>
                                      {onRestore && (
                                        <button
                                          type="button"
                                          className={`${prefix}__restore`}
                                          onClick={() => {
                                            onRestore(transfer.source, item.source);
                                            state.setExpandedItem(null);
                                          }}
                                        >
                                          Add back
                                        </button>
                                      )}
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })}
                {transfers.length === 0 && (
                  <li className={`${prefix}__lane-empty`}>Nothing handed over yet</li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
      <svg className={`${prefix}__lines ${prefix}__top-layer`} aria-hidden="true">
        {state.connections.map((connection) =>
          connection.dots.map(([x, y], index) => (
            <circle
              cx={x}
              cy={y}
              r={3.25}
              className={`${prefix}__dot`}
              data-passed={state.latestTransfers[connection.index] ? "" : undefined}
              key={`${connection.index}-${index}`}
            />
          )),
        )}
      </svg>
    </div>
  );
}
const ARRIVAL_DELAY = 850;
const TASK_STATUS_LABELS = {
  todo: "Ready",
  done: "Done",
  warning: "Needs attention",
};
const text = (value: unknown) => (value == null ? undefined : String(value));
const currencyFormat = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});
const preciseCurrency = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});
const compactCurrency = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const countFormat = new Intl.NumberFormat("en");
const compactCount = (count: number) =>
  count > 999 ? "999+" : countFormat.format(count);
const ITEM_PATHS = {
  file: "M7 1.5H3.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4Zm0 0V4h2.5",
  source:
    "M5 7a1.8 1.8 0 0 0 2.6 0l1.4-1.4a1.8 1.8 0 0 0-2.6-2.6l-.4.4M7 5a1.8 1.8 0 0 0-2.6 0L3 6.4A1.8 1.8 0 0 0 5.6 9l.4-.4",
  fact: "M2.5 9.5v-3M5 9.5v-6M7.5 9.5V5M10 9.5V2.5",
  decision: "m3 6.2 2 2L9.2 4",
  note: "M2.5 3h7M2.5 6h7M2.5 9h4",
  arrow: "M2 6h7M7 3.5 9.5 6 7 8.5",
  close: "m3.5 3.5 5 5m0-5-5 5",
};
export { AgentHandoff };
export type { HandoffAgent };
export type { Handoff };
export type { HandoffTask };
export type { HandoffItem };
export type { AgentHandoffProps };
