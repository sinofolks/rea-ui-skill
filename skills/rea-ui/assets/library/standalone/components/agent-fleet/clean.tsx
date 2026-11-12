"use client";

import "./AgentFleet.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  Fragment,
  type CSSProperties,
} from "react";
type FleetStatus = "queued" | "running" | "waiting" | "done" | "failed" | "stopped";
interface FleetStep {
  title?: string;
  status?: FleetStatus;
  tool?: ReactNode;
  took?: number;
  [field: string]: unknown;
}
interface FleetAgent {
  id?: string;
  name?: string;
  label?: string;
  model?: string;
  status?: FleetStatus;
  avatar?: ReactNode;
  tools?: ReactNode[];
  task?: string;
  ask?: string;
  error?: string;
  cost?: number;
  started?: number;
  ended?: number;
  steps?: FleetStep[];
  children?: FleetAgent[];
  [field: string]: unknown;
}
interface AgentFleetProps {
  agents: FleetAgent[];
  open?: string | null;
  defaultOpen?: string | null;
  onOpenChange?: (id: string | null) => void;
  onSelect?: (agent: FleetAgent) => void;
  onResolve?: (
    agent: FleetAgent,
    action: "approve" | "reject" | "retry" | "dismiss",
  ) => void;
  now?: number;
  formatCost?: (amount: number) => string;
  title?: string;
  highlight?: string;
  className?: string;
}
type AgentId = FleetAgent["id"];
interface FleetLink {
  id: AgentId;
  path: string;
  muted: boolean;
}
interface FleetDot {
  id: AgentId;
  at: [number, number];
  muted: boolean;
}
interface FleetGeometry {
  key: AgentId | null;
  links: FleetLink[];
  dots: FleetDot[];
  width: number;
  height: number;
}
type FleetController = ReturnType<typeof useAgentFleet>;
interface AgentParts {
  agent: FleetAgent;
  prefix: string;
}
interface CardProps extends AgentParts {
  fleet: FleetController;
  clean: boolean;
  formatCost: (amount: number) => string;
  now?: number;
  onSelect?: AgentFleetProps["onSelect"];
  onResolve?: AgentFleetProps["onResolve"];
}
interface ViewProps extends AgentFleetProps {
  variant: "default" | "clean";
}
function AgentFleet(props: AgentFleetProps) {
  return <AgentFleetView {...props} variant="clean" />;
}
function defaultFormatCost(amount: number): string {
  if (amount < 0) return `-${defaultFormatCost(-amount)}`;
  if (amount > 0 && amount < 0.005) return "<$0.01";
  return `$${amount < 10 ? amount.toFixed(2) : Math.round(amount).toLocaleString("en-US")}`;
}
function formatElapsed(milliseconds: number) {
  const seconds = Math.max(0, Math.round(milliseconds / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? `${hours}h ${String(minutes % 60).padStart(2, "0")}m`
    : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function relativeBounds(element: HTMLElement, ancestor: HTMLElement) {
  let x = 0,
    y = 0,
    current: HTMLElement | null = element;
  while (current && current !== ancestor) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return { x, y, width: element.offsetWidth, height: element.offsetHeight };
}
function descendantSummary(agent: FleetAgent): {
  text: string;
  kind?: "waiting" | "failed" | "running";
} {
  const descendants = flattenAgents(agent).slice(1);
  if (!descendants.length) return { text: "No sub-agents" };
  const count = (status: FleetStatus) =>
    descendants.filter((agent) => agent.status === status).length;
  if (count("waiting"))
    return {
      text: `${numberFormatter.format(count("waiting"))} needs you`,
      kind: "waiting",
    };
  if (count("failed"))
    return {
      text: `${numberFormatter.format(count("failed"))} failed`,
      kind: "failed",
    };
  if (count("running"))
    return {
      text: `${numberFormatter.format(count("running"))}/${numberFormatter.format(descendants.length)} running`,
      kind: "running",
    };
  if (count("done") === descendants.length)
    return {
      text:
        descendants.length === 1
          ? "Done"
          : `All ${numberFormatter.format(descendants.length)} done`,
    };
  return {
    text:
      descendants.length === 1
        ? "1 sub-agent"
        : `${numberFormatter.format(descendants.length)} sub-agents`,
  };
}
function depthOf(agent: FleetAgent, id: AgentId, depth = 0): number {
  if (agent.id === id) return depth;
  for (const child of agent.children ?? []) {
    const result = depthOf(child, id, depth + 1);
    if (result >= 0) return result;
  }
  return -1;
}
function pathTo(agent: FleetAgent, id: string): AgentId[] | null {
  if (agent.id === id) return [agent.id];
  for (const child of agent.children ?? []) {
    const path = pathTo(child, id);
    if (path) return [agent.id, ...path];
  }
  return null;
}
/** Draw the first generation horizontally on wide layouts, then descend vertically. */
function measureLinks(
  root: FleetAgent,
  rootElement: HTMLElement,
  container: HTMLElement,
  elements: Map<AgentId, HTMLElement>,
  wide: boolean,
  anchorOffset: number,
) {
  const links: FleetLink[] = [],
    dots: FleetDot[] = [];
  function visit(agent: FleetAgent, element: HTMLElement, horizontal: boolean) {
    const children = agent.children ?? [];
    if (!children.length) return;
    const parent = relativeBounds(element, container);
    let activeChild = false;
    for (const child of children) {
      const childElement = elements.get(child.id);
      if (!childElement) continue;
      const bounds = relativeBounds(childElement, container);
      if (!isMuted(child.status)) activeChild = true;
      let path: string;
      if (horizontal) {
        const startX = parent.x + parent.width,
          startY = parent.y + parent.height / 2,
          endX = bounds.x,
          endY = bounds.y + anchorOffset;
        const middle = Math.round(startX + (endX - startX) / 2),
          vertical = endY - startY,
          radius = Math.max(0, Math.min(8, Math.abs(vertical) / 2, (endX - startX) / 4)),
          direction = Math.sign(vertical);
        path =
          Math.abs(vertical) < 1
            ? `M${startX} ${startY}H${endX}`
            : `M${startX} ${startY}H${middle - radius}Q${middle} ${startY} ${middle} ${startY + direction * radius}V${endY - direction * radius}Q${middle} ${endY} ${middle + radius} ${endY}H${endX}`;
      } else {
        const startX = parent.x + anchorOffset,
          startY = parent.y + parent.height,
          endX = bounds.x,
          endY = bounds.y + anchorOffset;
        const radius = Math.max(0, Math.min(8, (endX - startX) / 2, (endY - startY) / 2));
        path =
          endX - startX < 2
            ? `M${startX} ${startY}V${bounds.y}`
            : `M${startX} ${startY}V${endY - radius}Q${startX} ${endY} ${startX + radius} ${endY}H${endX}`;
      }
      links.push({ id: child.id, path, muted: isMuted(child.status) });
      visit(child, childElement, false);
    }
    dots.push({
      id: agent.id,
      at: horizontal
        ? [parent.x + parent.width, parent.y + parent.height / 2]
        : [parent.x + anchorOffset, parent.y + parent.height],
      muted: !activeChild,
    });
  }
  visit(root, rootElement, wide);
  return { links, dots };
}
function useAgentFleet(
  { agents, open, defaultOpen, onOpenChange, highlight }: AgentFleetProps,
  prefix: string,
  clean: boolean,
) {
  const id = useId(),
    [localOpen, setLocalOpen] = useState<AgentId | null>(() =>
      defaultOpen === undefined ? (agents[0]?.id ?? null) : defaultOpen,
    );
  const highlightedRoot = highlight
    ? agents.find((agent) => flattenAgents(agent).some((agent) => agent.id === highlight))
    : undefined;
  const highlightedPath = new Set(
    highlightedRoot && highlight ? (pathTo(highlightedRoot, highlight) ?? []) : [],
  );
  const faded = (id: AgentId) =>
    highlightedRoot && !highlightedPath.has(id) ? "" : undefined;
  const openId = highlightedRoot
    ? highlightedRoot.id
    : open === undefined
      ? localOpen
      : open;
  function toggleOpen(id: AgentId) {
    const next = openId === id ? null : id;
    setLocalOpen(next);
    onOpenChange?.(next!);
  }
  const [displayedId, setDisplayedId] = useState(openId),
    [leaving, setLeaving] = useState(false);
  const displayedAgent = agents.find((agent) => agent.id === displayedId) ?? null,
    descendants = displayedAgent ? flattenAgents(displayedAgent).slice(1) : [];
  const branchExitDuration =
    exitDuration +
    Math.min(Math.max(0, descendants.length - 1), maxStagger) * staggerDelay;
  const exitTimer = useRef(0);
  useEffect(() => {
    window.clearTimeout(exitTimer.current);
    if (openId === displayedId) {
      setLeaving(false);
      return;
    }
    if (!descendants.length || prefersReducedMotion()) {
      setDisplayedId(openId);
      setLeaving(false);
      return;
    }
    setLeaving(true);
    exitTimer.current = window.setTimeout(() => {
      setDisplayedId(openId);
      setLeaving(false);
    }, branchExitDuration + 40);
  }, [openId, displayedId]);
  useEffect(() => () => window.clearTimeout(exitTimer.current), []);
  const entrySequence = useRef<{
    key: AgentId | null;
    delays: Map<AgentId, number>;
    settled: boolean;
  }>({ key: null, delays: new Map(), settled: false });
  if (entrySequence.current.key !== displayedId)
    entrySequence.current = {
      key: displayedId,
      delays: new Map(),
      settled: false,
    };
  let staggerIndex = 0;
  for (const agent of descendants)
    if (!entrySequence.current.delays.has(agent.id))
      entrySequence.current.delays.set(
        agent.id,
        entrySequence.current.settled
          ? 0
          : Math.min(staggerIndex++, maxStagger) * staggerDelay,
      );
  const entryDelay = (id: AgentId) => entrySequence.current.delays.get(id) ?? 0;
  const exitDelays = new Map(
    descendants.map((agent, index) => [
      agent.id,
      Math.min(descendants.length - 1 - index, maxStagger) * staggerDelay,
    ]),
  );
  const [popoverId, setPopoverId] = useState<AgentId | null>(null),
    focusPopover = useRef(false),
    [focusedId, setFocusedId] = useState<AgentId | null>(null);
  const rootRef = useRef<HTMLDivElement>(null),
    bodyRef = useRef<HTMLDivElement>(null),
    listRef = useRef<HTMLDivElement>(null),
    branchRef = useRef<HTMLDivElement>(null),
    agentRefs = useRef(new Map<AgentId, HTMLElement>());
  const trackAgent = (id: AgentId) => (element: HTMLElement | null) => {
    if (element) agentRefs.current.set(id, element);
    else agentRefs.current.delete(id);
  };
  useEffect(() => setPopoverId(null), [openId, displayedId]);
  useEffect(() => {
    if (!popoverId) return;
    const outside = (event: globalThis.PointerEvent) => {
      if (!agentRefs.current.get(popoverId)?.contains(event.target as Node))
        setPopoverId(null);
    };
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        agentRefs.current.get(popoverId)?.focus();
        setPopoverId(null);
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [popoverId]);
  const [wide, setWide] = useState(true);
  const depth = Math.max(
    1,
    ...agents.map((agent) =>
      Math.max(
        0,
        ...flattenAgents(agent).map((descendant) => depthOf(agent, descendant.id)),
      ),
    ),
  );
  const [geometry, setGeometry] = useState<FleetGeometry>({
      key: null,
      links: [],
      dots: [],
      width: 0,
      height: 0,
    }),
    geometrySignature = useRef("");
  function measure() {
    const body = bodyRef.current,
      list = listRef.current;
    if (!body || !list) return;
    const branch = branchRef.current,
      selected = displayedId ? agentRefs.current.get(displayedId) : undefined;
    if (wide && branch && selected) {
      const centered =
        selected.offsetTop + selected.offsetHeight / 2 - branch.offsetHeight / 2;
      const margin = `${Math.round(Math.max(0, Math.min(centered, list.offsetHeight - branch.offsetHeight)))}px`;
      if (branch.style.marginTop !== margin) {
        const animate = branch.style.marginTop !== "" && !prefersReducedMotion();
        branch.style.transition = animate
          ? `margin-top ${layoutDuration}ms ${layoutEasing}`
          : "none";
        branch.style.marginTop = margin;
        if (animate) measureDuring(460);
      }
    }
    const drawing =
      displayedAgent && selected
        ? measureLinks(
            displayedAgent,
            selected,
            body,
            agentRefs.current,
            wide,
            clean ? 21 : 26,
          )
        : { links: [], dots: [] };
    const next = {
        key: displayedId,
        ...drawing,
        width: body.offsetWidth,
        height: body.offsetHeight,
      },
      signature = JSON.stringify(next);
    if (signature !== geometrySignature.current) {
      geometrySignature.current = signature;
      setGeometry(next);
    }
  }
  const measureRef = useRef(measure);
  measureRef.current = measure;
  const measureUntil = useRef(0),
    measureFrame = useRef(0);
  function measureDuring(milliseconds: number) {
    measureUntil.current = Math.max(
      measureUntil.current,
      performance.now() + milliseconds,
    );
    if (measureFrame.current) return;
    const tick = () => {
      measureRef.current();
      measureFrame.current =
        performance.now() < measureUntil.current ? requestAnimationFrame(tick) : 0;
    };
    measureFrame.current = requestAnimationFrame(tick);
  }
  useEffect(
    () => () => {
      cancelAnimationFrame(measureFrame.current);
      measureFrame.current = 0;
    },
    [],
  );
  useLayoutEffect(() => {
    measure();
    entrySequence.current.settled = true;
  });
  useLayoutEffect(() => {
    if (!wide) measureDuring(480);
  }, [displayedId, wide]);
  useLayoutEffect(() => {
    const root = rootRef.current,
      body = bodyRef.current;
    if (!root || !body) return;
    const resize = () => {
      const style = getComputedStyle(root),
        dimension = (name: string, fallback: number) =>
          parseFloat(style.getPropertyValue(name)) || fallback;
      setWide(
        root.offsetWidth >=
          dimension(`--${prefix}-main-w`, 288) +
            dimension(`--${prefix}-gap`, 56) +
            dimension(`--${prefix}-card-w`, 240) +
            dimension(`--${prefix}-indent`, 32) * (depth - 1),
      );
      measureRef.current();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    observer.observe(body);
    return () => observer.disconnect();
  }, [depth]);
  function handleRootKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const target =
      event.key === "ArrowDown"
        ? index + 1
        : event.key === "ArrowUp"
          ? index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? agents.length - 1
              : -1;
    if (target < 0 || target >= agents.length || target === index) return;
    event.preventDefault();
    agentRefs.current.get(agents[target].id)?.focus();
  }
  const tabStop = agents.some((agent) => agent.id === focusedId)
    ? focusedId
    : openId && agents.some((agent) => agent.id === openId)
      ? openId
      : agents[0]?.id;
  const delayForCard = (id: AgentId) =>
    leaving ? (exitDelays.get(id) ?? 0) : entryDelay(id) + cardEnterDelay;
  return {
    id,
    openId,
    toggleOpen,
    displayedId,
    displayedAgent,
    leaving,
    branchExitDuration,
    entryDelay,
    exitDelays,
    popoverId,
    setPopoverId,
    focusPopover,
    setFocusedId,
    rootRef,
    bodyRef,
    listRef,
    branchRef,
    trackAgent,
    wide,
    depth,
    geometry,
    faded,
    handleRootKeyDown,
    tabStop,
    delayForCard,
  };
}
function ElapsedTime({
  since,
  until,
  now,
}: {
  since: number;
  until?: number;
  now?: number;
}) {
  const [clock, setClock] = useState(() => Date.now()),
    running = until === undefined && now === undefined;
  useEffect(() => {
    if (!running) return;
    const update = () => setClock(Date.now());
    update();
    subscribers.add(update);
    timer ||= window.setInterval(() => subscribers.forEach((notify) => notify()), 1000);
    return () => {
      subscribers.delete(update);
      if (!subscribers.size) {
        window.clearInterval(timer);
        timer = 0;
      }
    };
  }, [running]);
  return <>{formatElapsed((until ?? now ?? clock) - since)}</>;
}
function AgentHeading({ agent, prefix }: AgentParts) {
  return (
    <span className={`${prefix}__top`}>
      <span className={`${prefix}__avatar`} data-logo={agent.avatar ? "" : undefined}>
        {agent.avatar ?? initials(agent.name)}
      </span>
      <span className={`${prefix}__who`}>
        <span className={`${prefix}__name`} dir="auto" title={agent.name}>
          {agent.name}
        </span>
        {agent.model && (
          <span className={`${prefix}__model`} title={agent.model}>
            {agent.model}
          </span>
        )}
      </span>
      <span className={`${prefix}__status`} data-status={agent.status}>
        <StatusIcon status={agent.status} prefix={prefix} />
        {agent.status && statusLabels[agent.status]}
      </span>
    </span>
  );
}
function AgentTask({ agent, prefix }: AgentParts) {
  return (
    <span className={`${prefix}__task`} title={agent.task}>
      {agent.tools && agent.tools.length > 0 && (
        <span className={`${prefix}__tools`} aria-hidden="true">
          {(agent.tools.length > 4 ? agent.tools.slice(0, 3) : agent.tools).map(
            (tool, index) => (
              <span className={`${prefix}__tool`} key={index}>
                {tool}
              </span>
            ),
          )}
          {agent.tools.length > 4 && (
            <span className={`${prefix}__tool ${prefix}__tool--more`}>
              +{agent.tools.length - 3}
            </span>
          )}
        </span>
      )}
      <span className={`${prefix}__task-text`} dir="auto">
        {agent.task}
      </span>
    </span>
  );
}
function AgentCost({
  agent,
  prefix,
  formatCost,
  now,
}: AgentParts & Pick<CardProps, "formatCost" | "now">) {
  const until =
    agent.ended ??
    (agent.status === "running" || agent.status === "waiting"
      ? undefined
      : agent.started);
  return (
    <span
      className={`${prefix}__cost`}
      title={agent.children?.length ? "With its sub-agents" : undefined}
    >
      <span
        className={`${prefix}__amount`}
        data-live={
          flattenAgents(agent).some((agent) => agent.status === "running")
            ? ""
            : undefined
        }
      >
        {formatCost(totalAgentCost(agent))}
      </span>
      {agent.started ? (
        <span className={`${prefix}__time`}>
          {" "}
          · <ElapsedTime since={agent.started} until={until} now={now} />
        </span>
      ) : null}
    </span>
  );
}
function AgentBody({
  agent,
  prefix,
  clean,
}: AgentParts & {
  clean: boolean;
}) {
  const content = (
    <>
      <AgentHeading agent={agent} prefix={prefix} />
      <AgentTask agent={agent} prefix={prefix} />
    </>
  );
  return clean ? content : <span className={`${prefix}__card`}>{content}</span>;
}
function RootAgentCard({
  index,
  ...props
}: CardProps & {
  index: number;
}) {
  const { agent, prefix, fleet } = props,
    summary = descendantSummary(agent),
    descendants = flattenAgents(agent).slice(1);
  const completed = descendants.filter(
    (agent) =>
      agent.status === "done" || agent.status === "failed" || agent.status === "stopped",
  ).length;
  return (
    <button
      type="button"
      className={`${prefix}__main`}
      data-status={agent.status}
      data-faded={fleet.faded(agent.id)}
      data-open={agent.id === fleet.openId ? "" : undefined}
      aria-expanded={agent.id === fleet.openId}
      aria-controls={agent.id === fleet.displayedId ? `${fleet.id}-tree` : undefined}
      ref={fleet.trackAgent(agent.id)}
      onClick={() => fleet.toggleOpen(agent.id)}
      onKeyDown={(event) => fleet.handleRootKeyDown(event, index)}
      onFocus={() => fleet.setFocusedId(agent.id)}
      tabIndex={agent.id === fleet.tabStop ? 0 : -1}
    >
      <AgentBody {...props} />
      <span className={`${prefix}__foot`}>
        <span className={`${prefix}__say`} data-kind={summary.kind}>
          {descendants.length > 0 && (
            <svg
              className={`${prefix}__ring`}
              width="10"
              height="10"
              viewBox="0 0 12 12"
              aria-hidden="true"
            >
              <circle cx="6" cy="6" r="5.25" className={`${prefix}__ring-edge`} />
              <circle
                cx="6"
                cy="6"
                r="1.75"
                pathLength={1}
                className={`${prefix}__ring-pie`}
                style={{ strokeDashoffset: 1 - completed / descendants.length }}
              />
            </svg>
          )}
          <span className={`${prefix}__say-text`}>{summary.text}</span>
        </span>
        <AgentCost {...props} />
      </span>
    </button>
  );
}
function AgentDetails({
  agent,
  prefix,
  fleet,
  onResolve,
}: Pick<CardProps, "agent" | "prefix" | "fleet" | "onResolve">) {
  const steps = agent.steps ?? [],
    resolvable = !!onResolve && (agent.status === "waiting" || agent.status === "failed"),
    waiting = agent.status === "waiting",
    completed = steps.filter((step) => (step.status ?? "done") === "done").length;
  return (
    <div
      className={`${prefix}__pop`}
      role="dialog"
      aria-label={
        resolvable
          ? `${agent.name}: ${agent.status && statusLabels[agent.status]}`
          : `Tasks of ${agent.name}`
      }
      onClick={(event) => event.stopPropagation()}
    >
      {resolvable && (
        <div className={`${prefix}__ask`}>
          <span className={`${prefix}__ask-label`}>
            {waiting ? "Needs your answer" : "Failed"}
          </span>
          <p className={`${prefix}__ask-text`} dir="auto">
            {(waiting ? agent.ask : agent.error) ??
              (waiting ? "It waits for your go-ahead." : "It stopped with an error.")}
          </p>
          <span className={`${prefix}__ask-actions`}>
            <button
              type="button"
              className={`${prefix}__btn`}
              onClick={() => onResolve?.(agent, waiting ? "reject" : "dismiss")}
            >
              {waiting ? "Reject" : "Dismiss"}
            </button>
            <button
              type="button"
              className={`${prefix}__btn ${prefix}__btn--primary`}
              autoFocus={fleet.focusPopover.current}
              onClick={() => onResolve?.(agent, waiting ? "approve" : "retry")}
            >
              {waiting ? "Approve" : "Retry"}
            </button>
          </span>
        </div>
      )}
      {steps.length > 0 && (
        <>
          <div className={`${prefix}__pop-head`}>
            <span>Tasks</span>
            <span>
              {numberFormatter.format(completed)}/{numberFormatter.format(steps.length)}{" "}
              done
            </span>
          </div>
          <ol className={`${prefix}__steps`}>
            {steps.map((step, index) => {
              const status = step.status ?? "done";
              return (
                <li
                  className={`${prefix}__step`}
                  data-status={status}
                  style={{
                    animationDelay: `${60 + Math.min(index, maxStagger) * 30}ms`,
                  }}
                  key={index}
                >
                  {step.tool && (
                    <span className={`${prefix}__tool`} aria-hidden="true">
                      {step.tool}
                    </span>
                  )}
                  <span className={`${prefix}__step-title`} dir="auto" title={step.title}>
                    {step.title}
                  </span>
                  <span className={`${prefix}__step-end`}>
                    {status === "done" ? (
                      <>
                        <span className={`${prefix}__sr`}>Done, </span>
                        {step.took === undefined ? "Done" : formatElapsed(step.took)}
                      </>
                    ) : status === "running" ? (
                      <span className={`${prefix}__amount`} data-live="">
                        Running
                      </span>
                    ) : status === "stopped" ? (
                      "Skipped"
                    ) : (
                      statusLabels[status]
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
}
function ChildAgentCard(props: CardProps) {
  const { agent, prefix, fleet, clean, onSelect, onResolve } = props,
    steps = agent.steps ?? [],
    resolvable = !!onResolve && (agent.status === "waiting" || agent.status === "failed");
  const hasDetails = steps.length > 0 || resolvable,
    popped = fleet.popoverId === agent.id && !fleet.leaving,
    clickable = !fleet.leaving && (!!onSelect || hasDetails);
  function select(keyboard = false) {
    fleet.focusPopover.current = keyboard;
    onSelect?.(agent);
    if (hasDetails)
      fleet.setPopoverId((previous) => (previous === agent.id ? null : agent.id));
  }
  const body = (
    <>
      <AgentHeading agent={agent} prefix={prefix} />
      <AgentTask agent={agent} prefix={prefix} />
    </>
  );
  return (
    <div
      className={`${prefix}__sub`}
      role={clickable ? "button" : undefined}
      data-status={agent.status}
      data-faded={fleet.faded(agent.id)}
      data-leaving={fleet.leaving ? "" : undefined}
      data-popped={popped ? "" : undefined}
      style={{ animationDelay: `${fleet.delayForCard(agent.id)}ms` }}
      ref={fleet.trackAgent(agent.id)}
      onClick={clickable ? () => select() : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-haspopup={hasDetails ? "dialog" : undefined}
      aria-expanded={hasDetails ? popped : undefined}
      onKeyDown={
        clickable
          ? (event) => {
              if (
                event.target === event.currentTarget &&
                (event.key === "Enter" || event.key === " ")
              ) {
                event.preventDefault();
                select(true);
              }
            }
          : undefined
      }
      data-clickable={clickable ? "" : undefined}
    >
      {clean ? body : <div className={`${prefix}__card`}>{body}</div>}
      <div className={`${prefix}__meta`}>
        <AgentCost {...props} />
        {resolvable ? (
          <span
            className={`${prefix}__review`}
            aria-hidden="true"
            onClick={(event) => {
              event.stopPropagation();
              fleet.focusPopover.current = false;
              fleet.setPopoverId(agent.id);
            }}
          >
            {agent.status === "waiting" ? "Answer" : "Resolve"}
          </span>
        ) : (
          steps.length > 0 && (
            <span className={`${prefix}__count`}>
              {steps.length === 1
                ? "1 task"
                : `${numberFormatter.format(steps.length)} tasks`}
            </span>
          )
        )}
      </div>
      {popped && <AgentDetails {...props} />}
    </div>
  );
}
function AgentBranchItem(props: CardProps) {
  const { agent, prefix } = props;
  return (
    <div
      className={`${prefix}__hang`}
      role="treeitem"
      aria-expanded={agent.children?.length ? true : undefined}
      aria-label={`${agent.name}: ${agent.status && statusLabels[agent.status]}`}
    >
      <ChildAgentCard {...props} />
      {agent.children && agent.children.length > 0 && (
        <div className={`${prefix}__below`} role="group">
          {agent.children.map((child) => (
            <AgentBranchItem {...props} agent={child} key={child.id} />
          ))}
        </div>
      )}
    </div>
  );
}
function Branch(props: CardProps) {
  const { agent, prefix, fleet } = props;
  return (
    <div
      ref={fleet.branchRef}
      id={`${fleet.id}-tree`}
      className={`${prefix}__branch`}
      role="tree"
      aria-label={`Sub-agents of ${agent.name}`}
      data-leaving={fleet.leaving ? "" : undefined}
      style={
        {
          [`--${prefix}-exit`]: `${fleet.branchExitDuration}ms`,
        } as CSSProperties
      }
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && !fleet.leaving)
          event.currentTarget.dataset.settled = "";
      }}
    >
      <div className={`${prefix}__branch-in`}>
        {agent.children?.length ? (
          agent.children.map((child) => (
            <AgentBranchItem {...props} agent={child} key={child.id} />
          ))
        ) : (
          <p className={`${prefix}__empty`}>No sub-agents yet</p>
        )}
      </div>
    </div>
  );
}
function AgentFleetView({ variant, ...props }: ViewProps) {
  const {
      agents,
      title = "Agents",
      formatCost = defaultFormatCost,
      now,
      onSelect,
      onResolve,
      className,
    } = props,
    clean = variant === "clean",
    prefix = clean ? "ui-agfc" : "ui-agf",
    fleet = useAgentFleet(props, prefix, clean);
  const allAgents = agents.flatMap(flattenAgents),
    running = allAgents.filter((agent) => agent.status === "running").length,
    waiting = allAgents.filter((agent) => agent.status === "waiting").length,
    subagentCount = allAgents.length - agents.length,
    totalCost = agents.reduce((sum, agent) => sum + totalAgentCost(agent), 0);
  const cardProps = {
    prefix,
    fleet,
    clean,
    formatCost,
    now,
    onSelect,
    onResolve,
  };
  return (
    <div
      ref={fleet.rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-wide={fleet.wide ? "" : undefined}
      style={{ [`--${prefix}-depth`]: fleet.depth } as CSSProperties}
    >
      <header className={`${prefix}__bar`}>
        <span className={`${prefix}__spark`}>
          <AssistantIcon />
        </span>
        <span className={`${prefix}__title`} dir="auto" title={title}>
          {title}
        </span>
        <span className={`${prefix}__sum`} aria-live="polite">
          <span>
            {agents.length === 1
              ? "1 agent"
              : `${numberFormatter.format(agents.length)} agents`}
            {subagentCount > 0 &&
              (subagentCount === 1
                ? " / 1 sub-agent"
                : ` / ${numberFormatter.format(subagentCount)} sub-agents`)}
          </span>
          {running > 0 && <span>{numberFormatter.format(running)} running</span>}
          {waiting > 0 && <span>{numberFormatter.format(waiting)} needs you</span>}
          <span className={`${prefix}__sum-cost`}>
            <span
              className={`${prefix}__amount`}
              data-live={running > 0 ? "" : undefined}
            >
              {formatCost(totalCost)}
            </span>
          </span>
        </span>
      </header>
      <div
        ref={fleet.bodyRef}
        className={`${prefix}__body`}
        data-pop={fleet.popoverId ? "" : undefined}
      >
        <svg
          className={`${prefix}__links`}
          width={fleet.geometry.width}
          height={fleet.geometry.height}
          aria-hidden="true"
        >
          {fleet.geometry.key === fleet.displayedId &&
            fleet.geometry.links.map((link) => (
              <path
                key={`${fleet.geometry.key}:${link.id}`}
                d={link.path}
                pathLength={1}
                className={`${prefix}__link`}
                data-muted={link.muted ? "" : undefined}
                data-leaving={fleet.leaving ? "" : undefined}
                style={{
                  animationDelay: `${fleet.leaving ? (fleet.exitDelays.get(link.id) ?? 0) : fleet.entryDelay(link.id)}ms`,
                }}
              />
            ))}
        </svg>
        <div
          ref={fleet.listRef}
          className={`${prefix}__list`}
          data-picked={fleet.openId ? "" : undefined}
        >
          {agents.length === 0 && <p className={`${prefix}__none`}>No agents at work</p>}
          {agents.map((agent, index) => (
            <Fragment key={agent.id}>
              <RootAgentCard {...cardProps} agent={agent} index={index} />
              {!fleet.wide && agent.id === fleet.displayedId && (
                <Branch {...cardProps} agent={agent} key={agent.id} />
              )}
            </Fragment>
          ))}
        </div>
        {fleet.wide && (
          <div className={`${prefix}__side`}>
            {fleet.displayedAgent && (
              <Branch
                {...cardProps}
                agent={fleet.displayedAgent}
                key={fleet.displayedAgent.id}
              />
            )}
          </div>
        )}
        <svg
          className={`${prefix}__links ${prefix}__dots`}
          width={fleet.geometry.width}
          height={fleet.geometry.height}
          aria-hidden="true"
        >
          {fleet.geometry.key === fleet.displayedId &&
            fleet.geometry.dots.map((dot) => (
              <circle
                key={`${fleet.geometry.key}:${dot.id}`}
                cx={dot.at[0]}
                cy={dot.at[1]}
                r={3.25}
                className={`${prefix}__dot`}
                data-muted={dot.muted ? "" : undefined}
                data-leaving={fleet.leaving ? "" : undefined}
                style={
                  fleet.leaving
                    ? {
                        animationDelay: `${fleet.branchExitDuration - exitDuration}ms`,
                      }
                    : undefined
                }
              />
            ))}
        </svg>
      </div>
    </div>
  );
}
const statusLabels = {
  queued: "Queued",
  running: "Running",
  waiting: "Needs you",
  done: "Done",
  failed: "Failed",
  stopped: "Stopped",
};
const numberFormatter = new Intl.NumberFormat("en-US");
const exitDuration = 220,
  layoutDuration = 420,
  staggerDelay = 50,
  maxStagger = 8,
  cardEnterDelay = 90;
const layoutEasing = "cubic-bezier(0.32, 0.72, 0.24, 1)";
const initials = (name: string = "") =>
  name
    .split(/\s+/)
    .map((word) => Array.from(word.replace(/^[^\p{L}\p{N}]+/u, ""))[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
const flattenAgents = (agent: FleetAgent): FleetAgent[] => [
  agent,
  ...(agent.children ?? []).flatMap(flattenAgents),
];
const totalAgentCost = (agent: FleetAgent): number =>
  (agent.cost ?? 0) +
  (agent.children ?? []).reduce((sum, child) => sum + totalAgentCost(child), 0);
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMuted = (status: FleetStatus | undefined) =>
  status === "queued" || status === "stopped";
const AssistantIcon = () => (
  <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <path
      d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
      fill={`currentColor`}
    />
    <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
  </svg>
);
const StatusIcon = ({ status, prefix }: { status?: FleetStatus; prefix: string }) =>
  status === `running` ? (
    <svg
      className={`${prefix}__spin`}
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <circle
        cx={`12`}
        cy={`12`}
        r={`8.5`}
        stroke={`currentColor`}
        strokeOpacity={`0.25`}
        strokeWidth={`2.5`}
      />
      <path
        d={`M12 3.5A8.5 8.5 0 0 1 20.5 12`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeWidth={`2.5`}
      />
    </svg>
  ) : status === `done` ? (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M5 14L8.5 17.5L19 6.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2.4`}
      />
    </svg>
  ) : status === `failed` ? (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
      <path
        d={`M12 9V13`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2.2`}
      />
      <path
        d={`M12 16.8V17`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2.6`}
      />
    </svg>
  ) : status === `waiting` ? (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z`}
        stroke={`currentColor`}
        strokeWidth={`2`}
      />
      <path
        d={`M12 7.5V12L14.5 14.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
    </svg>
  ) : status === `stopped` ? (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <rect
        x={`6`}
        y={`6`}
        width={`12`}
        height={`12`}
        rx={`2.5`}
        stroke={`currentColor`}
        strokeWidth={`2.2`}
      />
    </svg>
  ) : (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <circle cx={`12`} cy={`12`} r={`3.5`} fill={`currentColor`} />
    </svg>
  );
const subscribers = new Set<() => void>();
let timer = 0;
export { AgentFleet };
export type { FleetAgent };
export type { AgentFleetProps };
