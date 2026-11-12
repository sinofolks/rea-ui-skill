"use client";

import "./AgentTree.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  type CSSProperties,
} from "react";
type TreeStatus = "queued" | "running" | "waiting" | "done" | "failed" | "stopped";
interface TreeAgent {
  id?: string;
  name?: string;
  model?: string;
  avatar?: ReactNode;
  tools?: ReactNode[];
  task?: string;
  ask?: string;
  error?: string;
  status?: TreeStatus;
  cost?: number;
  started?: number;
  ended?: number;
  extra?: ReactNode;
  children?: TreeAgent[];
  [field: string]: unknown;
}
interface AgentTreeProps {
  root: TreeAgent;
  beside?: TreeAgent;
  top?: ReactNode;
  collapsed?: string[];
  defaultCollapsed?: string[];
  onCollapsedChange?: (collapsed: string[]) => void;
  onSelect?: (agent: TreeAgent) => void;
  selected?: string;
  onResolve?: (
    agent: TreeAgent,
    action: "approve" | "reject" | "retry" | "dismiss",
  ) => void;
  now?: number;
  formatCost?: (amount: number) => string;
  title?: string;
  className?: string;
}
type AgentId = TreeAgent["id"];
interface ShownBranch {
  agent: TreeAgent;
  kids: ShownBranch[];
  leaving?: number;
}
interface LeavingBranch {
  shown: ShownBranch;
  parent: AgentId;
  index: number;
}
interface Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface TreeLink {
  id: string;
  d: string;
  dot: [number, number];
  muted: boolean;
  leaving?: number;
  enter: number;
  dashed?: boolean;
}
interface LinkDot {
  at: [number, number];
  muted: boolean;
  leaving?: number;
}
interface CardContext {
  prefix: string;
  clean: boolean;
  state: ReturnType<typeof useAgentTree>;
  layout: ReturnType<typeof useTreeLayout>;
  onSelect: AgentTreeProps["onSelect"];
  selected?: string;
  now?: number;
  formatCost: (amount: number) => string;
}
function AgentTree(props: AgentTreeProps) {
  return <AgentTreeView {...props} />;
}
function formatElapsed(milliseconds: number): string {
  const seconds = Math.max(0, Math.round(milliseconds / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? `${hours}h ${String(minutes % 60).padStart(2, "0")}m`
    : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function withLeavingBranches(branch: ShownBranch, leaving: LeavingBranch[]): ShownBranch {
  const kids = branch.kids.map((child) => withLeavingBranches(child, leaving));
  leaving
    .filter((item) => item.parent === branch.agent.id)
    .sort((a, b) => a.index - b.index)
    .forEach((item) => kids.splice(Math.min(item.index, kids.length), 0, item.shown));
  return { ...branch, kids };
}
function offsetRectangle(element: HTMLElement, root: HTMLElement): Rectangle {
  let x = 0,
    y = 0,
    current: HTMLElement | null = element;
  while (current && current !== root) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return { x, y, w: element.offsetWidth, h: element.offsetHeight };
}
function linkDots(links: TreeLink[]): Map<string, LinkDot> {
  const dots = new Map<string, LinkDot>();
  for (const link of links) {
    const key = link.dot.join(","),
      previous = dots.get(key);
    dots.set(
      key,
      previous
        ? {
            at: previous.at,
            muted: previous.muted && link.muted,
            leaving:
              previous.leaving === undefined || link.leaving === undefined
                ? undefined
                : Math.max(previous.leaving, link.leaving),
          }
        : { at: link.dot, muted: link.muted, leaving: link.leaving },
    );
  }
  return dots;
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
function useAgentTree(props: AgentTreeProps) {
  const {
    root,
    beside,
    collapsed,
    defaultCollapsed = [],
    selected,
    onCollapsedChange,
    onResolve,
  } = props;
  const [localCollapsed, setLocalCollapsed] = useState(defaultCollapsed),
    collapsedIds = collapsed ?? localCollapsed;
  const [popover, setPopover] = useState<"waiting" | "failed" | null>(null),
    headerRef = useRef<HTMLElement>(null);
  function toggle(id: string | undefined) {
    if (id === undefined) return;
    const next = collapsedIds.includes(id)
      ? collapsedIds.filter((value) => value !== id)
      : [...collapsedIds, id];
    setLocalCollapsed(next);
    onCollapsedChange?.(next);
  }
  useEffect(() => {
    if (!popover) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target))
        setPopover(null);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [popover]);
  const all = [...flattenAgents(root), ...(beside ? flattenAgents(beside) : [])],
    picked =
      selected && selected !== root.id
        ? all.find((agent) => agent.id === selected)
        : undefined;
  const kept = picked ? new Set(flattenAgents(picked).map((agent) => agent.id)) : null;
  const needsAction = popover ? all.filter((agent) => agent.status === popover) : [];
  function resolve(agent: TreeAgent, action: "approve" | "reject" | "retry" | "dismiss") {
    onResolve?.(agent, action);
    if (needsAction.length <= 1) setPopover(null);
  }
  return {
    collapsedIds,
    toggle,
    popover,
    setPopover,
    headerRef,
    all,
    kept,
    needsAction,
    resolve,
  };
}
/** Route orthogonal branches through the shared first-level gutter, then down nested columns. */
function buildTreeLinks(
  tree: ShownBranch,
  beside: TreeAgent | undefined,
  wide: boolean,
  positions: Map<AgentId, Rectangle>,
  levelTop: number | null,
  entrances: Map<AgentId, number>,
): TreeLink[] {
  const links: TreeLink[] = [];
  const besideRect = beside ? positions.get(beside.id) : undefined,
    besideBottom = besideRect ? besideRect.y + besideRect.h : 0;
  function visit(branch: ShownBranch, depth: number) {
    const parent = positions.get(branch.agent.id);
    for (const child of branch.kids) {
      const target = positions.get(child.agent.id);
      if (parent && target) {
        const muted = child.agent.status === "queued" || child.agent.status === "stopped";
        const common = {
          id: `${branch.agent.id}>${child.agent.id}`,
          muted,
          leaving: child.leaving,
          enter: entrances.get(child.agent.id) ?? 0,
        };
        if (wide && depth === 0) {
          const startX = parent.x + parent.w / 2,
            startY = parent.y + parent.h,
            endX = target.x + target.w / 2,
            endY = target.y;
          const bottom = Math.max(startY, besideBottom),
            gutterY = Math.round(bottom + ((levelTop ?? endY) - bottom) / 2),
            distance = endX - startX;
          const endRadius = Math.max(
              0,
              Math.min(8, Math.abs(distance) / 2, (endY - gutterY) / 2),
            ),
            direction = Math.sign(distance);
          const startRadius = Math.max(
            0,
            Math.min(8, Math.abs(distance) / 2 - endRadius, (gutterY - startY) / 2),
          );
          const start = muted
            ? `M${startX + direction * startRadius} ${gutterY}`
            : `M${startX} ${startY}V${gutterY - startRadius}Q${startX} ${gutterY} ${startX + direction * startRadius} ${gutterY}`;
          const path =
            Math.abs(distance) < 12
              ? `${muted ? `M${startX} ${gutterY}` : `M${startX} ${startY}V${gutterY}`}V${endY}`
              : `${start}H${endX - direction * endRadius}Q${endX} ${gutterY} ${endX} ${gutterY + endRadius}V${endY}`;
          links.push({ ...common, d: path, dot: [startX, startY] });
          const stemId = `${branch.agent.id}>stem`,
            stem = links.find((link) => link.id === stemId);
          if (stem) {
            stem.muted = stem.muted && muted;
            stem.leaving =
              stem.leaving === undefined || child.leaving === undefined
                ? undefined
                : Math.max(stem.leaving, child.leaving);
            stem.enter = Math.min(stem.enter, common.enter);
          } else
            links.push({
              id: stemId,
              d: `M${startX} ${startY}V${gutterY}`,
              dot: [startX, startY],
              muted,
              leaving: child.leaving,
              enter: common.enter,
            });
        } else {
          const startX = parent.x + 21,
            startY = parent.y + parent.h,
            endX = target.x,
            endY = target.y + 20;
          const radius = Math.max(
            0,
            Math.min(8, (endX - startX) / 2, (endY - startY) / 2),
          );
          links.push({
            ...common,
            d:
              endX - startX < 2
                ? `M${startX} ${startY}V${target.y}`
                : `M${startX} ${startY}V${endY - radius}Q${startX} ${endY} ${startX + radius} ${endY}H${endX}`,
            dot: [startX, startY],
          });
        }
      }
      visit(child, depth + 1);
    }
  }
  visit(tree, 0);
  const root = positions.get(tree.agent.id);
  if (root && besideRect && beside) {
    const muted = beside.status === "queued" || beside.status === "stopped";
    if (besideRect.x > root.x + root.w) {
      const y = Math.round(root.y + Math.min(root.h, besideRect.h) / 2);
      links.push({
        id: "beside",
        d: `M${root.x + root.w} ${y}H${besideRect.x}`,
        dot: [root.x + root.w, y],
        muted,
        enter: 0,
        dashed: true,
      });
    } else {
      const x = root.x + 21,
        y = root.y + root.h,
        endY = besideRect.y + 20,
        radius = Math.max(0, Math.min(8, (besideRect.x - x) / 2, (endY - y) / 2));
      links.push({
        id: "beside",
        d: `M${x} ${y}V${endY - radius}Q${x} ${endY} ${x + radius} ${endY}H${besideRect.x}`,
        dot: [x, y],
        muted,
        enter: 0,
        dashed: true,
      });
    }
  }
  return links;
}
function useTreeLayout(
  root: TreeAgent,
  beside: TreeAgent | undefined,
  collapsed: string[],
  prefix: string,
) {
  const treeRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    w: number;
    card: number;
    indent: number;
  } | null>(null);
  const visible = shownBranch(root, collapsed),
    visibleIds = new Set(flattenBranches(visible).map((branch) => branch.agent.id));
  const [leaving, setLeaving] = useState<LeavingBranch[]>([]);
  const displayed = withLeavingBranches(
      visible,
      leaving.filter((item) => !visibleIds.has(item.shown.agent.id)),
    ),
    branches = flattenBranches(displayed);
  const wide =
    !dimensions ||
    dimensions.w >=
      Math.max(
        560,
        displayed.kids.reduce(
          (width, child) =>
            width + dimensions.card + dimensions.indent * Math.max(1, branchDepth(child)),
          0,
        ) +
          Math.max(0, displayed.kids.length - 1) * 8,
      );
  const entrances = useRef(new Map<AgentId, number>()),
    mounted = useRef(false);
  let entranceCount = 0;
  for (const branch of branches)
    if (branch.leaving === undefined && !entrances.current.has(branch.agent.id))
      entrances.current.set(
        branch.agent.id,
        branch === displayed
          ? 0
          : (mounted.current ? 160 : 200) + Math.min(entranceCount++, 12) * stagger,
      );
  const cards = useRef(new Map<AgentId, HTMLDivElement>());
  const [links, setLinks] = useState<TreeLink[]>([]),
    [canvas, setCanvas] = useState({ w: 0, h: 0 });
  const previousDrawing = useRef({ links: "", w: 0, h: 0 }),
    linkBirths = useRef(new Map<string, number>());
  const signature = JSON.stringify([
    wide,
    collapsed,
    branches.map((branch) => [
      branch.agent.id,
      branch.agent.status,
      branch.leaving ?? "",
      branch.kids.map((child) => child.agent.id),
    ]),
    beside ? [beside.id, beside.status] : null,
  ]);
  function measureLinks() {
    const element = treeRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect(),
      scale = element.offsetWidth ? bounds.width / element.offsetWidth : 1;
    const relative = (node: Element): Rectangle => {
      const rect = node.getBoundingClientRect();
      return {
        x: (rect.left - bounds.left) / scale,
        y: (rect.top - bounds.top) / scale,
        w: rect.width / scale,
        h: rect.height / scale,
      };
    };
    const level = element.querySelector(`:scope > .${prefix}__level`),
      positions = new Map([...cards.current].map(([id, node]) => [id, relative(node)]));
    const measured = buildTreeLinks(
      displayed,
      beside,
      wide,
      positions,
      level ? relative(level).y : null,
      entrances.current,
    );
    for (const id of linkBirths.current.keys())
      if (!measured.some((link) => link.id === id)) linkBirths.current.delete(id);
    const serialized = JSON.stringify(measured);
    if (serialized !== previousDrawing.current.links) {
      previousDrawing.current.links = serialized;
      setLinks(measured);
    }
    const rectangles = [...positions.values()],
      w = Math.ceil(
        Math.max(element.clientWidth, ...rectangles.map((rect) => rect.x + rect.w)),
      ),
      h = Math.ceil(
        Math.max(element.clientHeight, ...rectangles.map((rect) => rect.y + rect.h)),
      );
    if (w !== previousDrawing.current.w || h !== previousDrawing.current.h) {
      previousDrawing.current.w = w;
      previousDrawing.current.h = h;
      setCanvas({ w, h });
    }
  }
  const measureRef = useRef(measureLinks);
  measureRef.current = measureLinks;
  const trackUntil = useRef(0),
    frame = useRef(0);
  function trackMotion(duration: number) {
    trackUntil.current = Math.max(trackUntil.current, performance.now() + duration);
    if (frame.current) return;
    const tick = () => {
      measureRef.current();
      frame.current =
        performance.now() < trackUntil.current ? requestAnimationFrame(tick) : 0;
    };
    frame.current = requestAnimationFrame(tick);
  }
  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    },
    [],
  );
  const heightAnimationUntil = useRef(0),
    extraHeights = useRef(new WeakMap<HTMLElement, number>()),
    extraNodes = useRef(new Set<HTMLElement>()),
    extraObserver = useRef<ResizeObserver | null>(null),
    previousRects = useRef(new Map<AgentId, Rectangle>());
  function animateExtra(element: HTMLElement) {
    const parent = element.parentElement,
      height = element.offsetHeight,
      previous = extraHeights.current.get(element);
    extraHeights.current.set(element, height);
    if (
      !parent ||
      previous === undefined ||
      Math.abs(previous - height) < 0.5 ||
      reducedMotion()
    )
      return;
    const active = parent.getAnimations(),
      from = active.length ? parent.offsetHeight : previous;
    active.forEach((animation) => animation.cancel());
    const clipPath = "inset(-12px -12px 0 -12px)";
    parent.animate(
      [
        { height: `${from}px`, clipPath },
        { height: `${height}px`, clipPath },
      ],
      { duration: moveDuration, easing },
    );
    heightAnimationUntil.current = performance.now() + moveDuration;
    trackMotion(460);
  }
  function registerExtra(element: HTMLDivElement | null, id: AgentId) {
    if (!element) return;
    if (
      mounted.current &&
      previousRects.current.has(id) &&
      !extraHeights.current.has(element)
    )
      extraHeights.current.set(element, 0);
    extraNodes.current.add(element);
    if (typeof ResizeObserver !== "undefined") {
      extraObserver.current ??= new ResizeObserver((entries) =>
        entries.forEach((entry) => {
          if (entry.target instanceof HTMLElement) animateExtra(entry.target);
        }),
      );
      extraObserver.current.observe(element);
    }
  }
  useLayoutEffect(() => {
    for (const element of extraNodes.current)
      if (element.isConnected) animateExtra(element);
      else {
        extraNodes.current.delete(element);
        extraObserver.current?.unobserve(element);
      }
  });
  useEffect(() => () => extraObserver.current?.disconnect(), []);
  useLayoutEffect(() => {
    const element = treeRef.current;
    if (!element) return;
    let moved = false;
    for (const [id, node] of cards.current) {
      const current = offsetRectangle(node, element),
        previous = previousRects.current.get(id),
        distance = previous
          ? Math.max(Math.abs(previous.x - current.x), Math.abs(previous.y - current.y))
          : 0;
      if (
        previous &&
        distance > 0.5 &&
        !(performance.now() < heightAnimationUntil.current && distance < 40) &&
        !reducedMotion()
      ) {
        node.animate(
          [
            {
              translate: `${previous.x - current.x}px ${previous.y - current.y}px`,
            },
            { translate: "0px 0px" },
          ],
          { duration: moveDuration, easing },
        );
        moved = true;
      }
      previousRects.current.set(id, current);
    }
    for (const id of previousRects.current.keys())
      if (!cards.current.has(id)) previousRects.current.delete(id);
    if (moved) trackMotion(460);
  });
  const previousTree = useRef<ShownBranch | null>(null),
    exitTimers = useRef<number[]>([]);
  useEffect(() => () => exitTimers.current.forEach(clearTimeout), []);
  useLayoutEffect(() => {
    const previous = previousTree.current;
    previousTree.current = visible;
    mounted.current = true;
    for (const id of entrances.current.keys())
      if (
        !branches.some((branch) => branch.agent.id === id && branch.leaving === undefined)
      )
        entrances.current.delete(id);
    if (!previous || reducedMotion()) return;
    const removed: LeavingBranch[] = [];
    function findRemoved(branch: ShownBranch) {
      branch.kids.forEach((child, index) => {
        if (visibleIds.has(child.agent.id)) findRemoved(child);
        else removed.push({ shown: child, parent: branch.agent.id, index });
      });
    }
    findRemoved(previous);
    if (!removed.length) return;
    const reverse = removed.flatMap((item) => flattenBranches(item.shown)).reverse(),
      delays = new Map(
        reverse.map((branch, index) => [branch.agent.id, index * stagger]),
      );
    const markLeaving = (branch: ShownBranch): ShownBranch => ({
      ...branch,
      leaving: delays.get(branch.agent.id) ?? 0,
      kids: branch.kids.map(markLeaving),
    });
    const retained = removed
        .filter((item) => visibleIds.has(item.parent) || item.parent === root.id)
        .map((item) => ({ ...item, shown: markLeaving(item.shown) })),
      ids = new Set(retained.map((item) => item.shown.agent.id));
    setLeaving((previous) => [
      ...previous.filter((item) => !ids.has(item.shown.agent.id)),
      ...retained,
    ]);
    const duration = exitDuration + (reverse.length - 1) * stagger;
    exitTimers.current.push(
      window.setTimeout(
        () =>
          setLeaving((previous) =>
            previous.filter((item) => !ids.has(item.shown.agent.id)),
          ),
        duration + 30,
      ),
    );
    trackMotion(duration + moveDuration + 60);
  });
  useLayoutEffect(() => {
    measureLinks();
    trackMotion(900 + Math.min(entranceCount, 12) * stagger);
  }, [signature]);
  useLayoutEffect(() => {
    const element = treeRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const style = getComputedStyle(element);
      setDimensions({
        w: element.offsetWidth,
        card: parseFloat(style.getPropertyValue(`--${prefix}-card-w`)) || 216,
        indent: parseFloat(style.getPropertyValue(`--${prefix}-indent`)) || 32,
      });
      measureRef.current();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const time = Date.now();
  for (const link of links)
    if (!linkBirths.current.has(link.id)) linkBirths.current.set(link.id, time);
  const freshLinks = new Set(
    links
      .filter(
        (link) => time - (linkBirths.current.get(link.id) ?? time) < 700 + link.enter,
      )
      .map((link) => link.id),
  );
  function registerCard(element: HTMLDivElement | null, id: AgentId) {
    if (element) cards.current.set(id, element);
    else cards.current.delete(id);
  }
  return {
    treeRef,
    displayed,
    wide,
    entrances,
    links,
    canvas,
    freshLinks,
    registerCard,
    registerExtra,
  };
}
function TreeCard({
  branch,
  depth,
  prefix,
  clean,
  state,
  layout,
  onSelect,
  selected,
  now,
  formatCost,
}: CardContext & {
  branch: ShownBranch;
  depth: number;
}) {
  const agent = branch.agent,
    children = agent.children ?? [],
    collapsed = agent.id !== undefined && state.collapsedIds.includes(agent.id),
    cost = children.length ? branchCost(agent) : (agent.cost ?? 0);
  const until =
      agent.ended ??
      (agent.status === "running" || agent.status === "waiting"
        ? undefined
        : agent.started),
    hiddenCount = collapsed ? flattenAgents(agent).length - 1 : 0,
    leaving = branch.leaving !== undefined;
  const heading = (
    <>
      <div className={`${prefix}__top`}>
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
          {agent.status ? statusLabels[agent.status] : undefined}
        </span>
      </div>
      {agent.task || agent.tools?.length ? (
        <p className={`${prefix}__task`} dir="auto" title={agent.task}>
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
                  {"+"}
                  {agent.tools.length - 3}
                </span>
              )}
            </span>
          )}
          {agent.task}
        </p>
      ) : null}
    </>
  );
  return (
    <div
      className={`${prefix}__node`}
      data-status={agent.status}
      data-depth={depth}
      data-leaving={leaving ? "" : undefined}
      aria-hidden={leaving || undefined}
      style={{
        animationDelay: `${leaving ? branch.leaving : (layout.entrances.current.get(agent.id) ?? 0)}ms`,
      }}
      ref={(element) => layout.registerCard(element, agent.id)}
      onClick={onSelect && !leaving ? () => onSelect(agent) : undefined}
      tabIndex={onSelect && !leaving ? 0 : undefined}
      onKeyDown={
        onSelect
          ? (event) => {
              if (
                event.target === event.currentTarget &&
                (event.key === "Enter" || event.key === " ")
              ) {
                event.preventDefault();
                onSelect(agent);
              }
            }
          : undefined
      }
      data-clickable={onSelect ? "" : undefined}
      data-kept={state.kept?.has(agent.id) ? "" : undefined}
      aria-current={selected === agent.id ? "true" : undefined}
    >
      {clean ? heading : <div className={`${prefix}__card`}>{heading}</div>}
      {agent.extra && (
        <div className={`${prefix}__extra`}>
          <div
            className={`${prefix}__extra-in`}
            ref={(element) => layout.registerExtra(element, agent.id)}
          >
            {agent.extra}
          </div>
        </div>
      )}
      <div className={`${prefix}__meta`}>
        <span
          className={`${prefix}__cost`}
          title={children.length ? "This branch, with its sub-agents" : undefined}
        >
          <span
            className={`${prefix}__amount`}
            data-live={
              flattenAgents(agent).some((child) => child.status === "running")
                ? ""
                : undefined
            }
          >
            {formatCost(cost)}
          </span>
          {agent.started ? (
            <span className={`${prefix}__time`}>
              {" · "}
              <ElapsedTime since={agent.started} until={until} now={now} />
            </span>
          ) : null}
        </span>
        {children.length > 0 && (
          <button
            type="button"
            className={`${prefix}__fold`}
            aria-expanded={!collapsed}
            aria-label={
              collapsed
                ? `Show ${hiddenCount} sub-agents of ${agent.name}`
                : `Fold the sub-agents of ${agent.name}`
            }
            tabIndex={leaving ? -1 : undefined}
            onClick={(event) => {
              event.stopPropagation();
              state.toggle(agent.id);
            }}
          >
            {collapsed ? `+${hiddenCount}` : children.length}
            <ChevronIcon />
          </button>
        )}
      </div>
    </div>
  );
}
function TreeSummary({
  prefix,
  state,
  formatCost,
  root,
  title,
}: Pick<CardContext, "prefix" | "state" | "formatCost"> & {
  root: TreeAgent;
  title: string;
}) {
  const running = state.all.filter((agent) => agent.status === "running").length,
    waiting = state.all.filter((agent) => agent.status === "waiting").length,
    failed = state.all.filter((agent) => agent.status === "failed").length;
  return (
    <header ref={state.headerRef} className={`${prefix}__bar`}>
      <span className={`${prefix}__spark`}>
        <TreeSpark />
      </span>
      <span className={`${prefix}__title`} dir="auto" title={title}>
        {title}
      </span>
      <span className={`${prefix}__sum`} aria-live="polite">
        <span>
          {state.all.length === 1
            ? "1 agent"
            : `${formatCount.format(state.all.length)} agents`}
        </span>
        {running > 0 && (
          <span className={`${prefix}__sum-run`}>
            {formatCount.format(running)}
            {" running"}
          </span>
        )}
        {waiting > 0 && (
          <button
            type="button"
            className={`${prefix}__sum-btn`}
            data-kind="waiting"
            aria-expanded={state.popover === "waiting"}
            aria-haspopup="dialog"
            onClick={() =>
              state.setPopover((previous) => (previous === "waiting" ? null : "waiting"))
            }
          >
            {formatCount.format(waiting)}
            {" needs you"}
            <ChevronIcon />
          </button>
        )}
        {failed > 0 && (
          <button
            type="button"
            className={`${prefix}__sum-btn`}
            data-kind="failed"
            aria-expanded={state.popover === "failed"}
            aria-haspopup="dialog"
            onClick={() =>
              state.setPopover((previous) => (previous === "failed" ? null : "failed"))
            }
          >
            {formatCount.format(failed)}
            {" failed"}
            <ChevronIcon />
          </button>
        )}
        <span className={`${prefix}__sum-cost`}>
          <span className={`${prefix}__amount`} data-live={running > 0 ? "" : undefined}>
            {formatCost(branchCost(root))}
          </span>
        </span>
      </span>
      {state.popover && state.needsAction.length > 0 && (
        <div
          className={`${prefix}__pop`}
          role="dialog"
          aria-label={
            state.popover === "waiting" ? "Agents that need you" : "Agents that failed"
          }
          onKeyDown={(event) => {
            if (event.key === "Escape") state.setPopover(null);
          }}
        >
          {state.needsAction.map((agent, index) => (
            <div className={`${prefix}__pop-item`} key={agent.id}>
              <span className={`${prefix}__pop-head`}>
                <span className={`${prefix}__status`} data-status={agent.status}>
                  <StatusIcon status={agent.status} prefix={prefix} />
                </span>
                <span className={`${prefix}__pop-name`} dir="auto">
                  {agent.name}
                </span>
                <span className={`${prefix}__pop-task`} dir="auto">
                  {agent.task}
                </span>
              </span>
              {(state.popover === "waiting" ? agent.ask : agent.error) && (
                <span className={`${prefix}__pop-text`} dir="auto">
                  {state.popover === "waiting" ? agent.ask : agent.error}
                </span>
              )}
              <span className={`${prefix}__pop-actions`}>
                <button
                  type="button"
                  className={`${prefix}__btn`}
                  onClick={() =>
                    state.resolve(
                      agent,
                      state.popover === "waiting" ? "reject" : "dismiss",
                    )
                  }
                >
                  {state.popover === "waiting" ? "Reject" : "Dismiss"}
                </button>
                <button
                  type="button"
                  className={`${prefix}__btn ${prefix}__btn--primary`}
                  autoFocus={index === 0}
                  onClick={() =>
                    state.resolve(
                      agent,
                      state.popover === "waiting" ? "approve" : "retry",
                    )
                  }
                >
                  {state.popover === "waiting" ? "Approve" : "Retry"}
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
function TreeBranch({
  branch,
  depth,
  ...context
}: CardContext & {
  branch: ShownBranch;
  depth: number;
}) {
  const { prefix, state } = context;
  return (
    <div
      className={`${prefix}__hang`}
      style={
        depth === 1
          ? ({
              [`--${prefix}-col`]: Math.max(1, branchDepth(branch)),
            } as CSSProperties)
          : undefined
      }
      role="treeitem"
      aria-expanded={
        branch.agent.children?.length
          ? !(
              branch.agent.id !== undefined &&
              state.collapsedIds.includes(branch.agent.id)
            )
          : undefined
      }
      aria-label={`${branch.agent.name}: ${branch.agent.status ? statusLabels[branch.agent.status] : undefined}`}
    >
      <TreeCard {...context} branch={branch} depth={depth} />
      {branch.kids.length > 0 && (
        <div className={`${prefix}__below`} role="group">
          {branch.kids.map((child) => (
            <TreeBranch
              {...context}
              branch={child}
              depth={depth + 1}
              key={child.agent.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
function AgentTreeView(
  props: AgentTreeProps & {
    clean?: boolean;
  },
) {
  const {
    root,
    beside,
    top,
    onSelect,
    selected,
    now,
    formatCost = formatTreeCost,
    title = "Agents",
    className,
    clean = false,
  } = props;
  const prefix = clean ? "ui-agtc" : "ui-agt",
    state = useAgentTree(props),
    layout = useTreeLayout(root, beside, state.collapsedIds, prefix);
  const { displayed, links, canvas, freshLinks } = layout,
    context = {
      prefix,
      clean,
      state,
      layout,
      onSelect,
      selected,
      now,
      formatCost,
    };
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      data-wide={layout.wide ? "" : undefined}
      data-picking={state.kept ? "" : undefined}
    >
      <TreeSummary
        prefix={prefix}
        state={state}
        formatCost={formatCost}
        root={root}
        title={title}
      />
      {top && <div className={`${prefix}__lead`}>{top}</div>}
      <div
        ref={layout.treeRef}
        className={`${prefix}__tree`}
        role="tree"
        aria-label={title}
        style={{ [`--${prefix}-depth`]: branchDepth(displayed) } as CSSProperties}
      >
        <svg
          className={`${prefix}__links`}
          width={canvas.w}
          height={canvas.h}
          aria-hidden="true"
        >
          {links.map((link) => (
            <g
              data-dashed={link.dashed ? "" : undefined}
              data-muted={link.muted ? "" : undefined}
              data-fresh={
                freshLinks.has(link.id) && link.leaving === undefined && !reducedMotion()
                  ? ""
                  : undefined
              }
              data-leaving={link.leaving === undefined ? undefined : ""}
              key={link.id}
            >
              <path
                d={link.d}
                pathLength={link.dashed ? undefined : 1}
                className={`${prefix}__link`}
                style={{
                  animationDelay: `${link.leaving === undefined ? Math.max(0, link.enter - 160) : link.leaving}ms`,
                }}
              />
            </g>
          ))}
        </svg>
        <div
          className={`${prefix}__root`}
          data-beside={beside ? "" : undefined}
          role="treeitem"
          aria-expanded={
            root.children?.length
              ? !(root.id !== undefined && state.collapsedIds.includes(root.id))
              : undefined
          }
          aria-label={`${root.name}: ${root.status ? statusLabels[root.status] : undefined}`}
        >
          <TreeCard {...context} branch={displayed} depth={0} />
          {beside && (
            <div
              className={`${prefix}__beside`}
              role="treeitem"
              aria-label={`${beside.name}: ${beside.status ? statusLabels[beside.status] : undefined}, beside ${root.name}`}
            >
              <TreeCard {...context} branch={{ agent: beside, kids: [] }} depth={0} />
            </div>
          )}
        </div>
        {displayed.kids.length > 0 && (
          <div className={`${prefix}__level`} role="group">
            {displayed.kids.map((branch) => (
              <TreeBranch {...context} branch={branch} depth={1} key={branch.agent.id} />
            ))}
          </div>
        )}
        <svg
          className={`${prefix}__links ${prefix}__dots`}
          width={canvas.w}
          height={canvas.h}
          aria-hidden="true"
        >
          {[...linkDots(links)].map(([key, dot]) => (
            <circle
              cx={dot.at[0]}
              cy={dot.at[1]}
              r={3.25}
              className={`${prefix}__dot`}
              data-muted={dot.muted ? "" : undefined}
              data-leaving={dot.leaving === undefined ? undefined : ""}
              style={
                dot.leaving === undefined
                  ? undefined
                  : { animationDelay: `${dot.leaving}ms` }
              }
              key={key}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
const exitDuration = 280,
  moveDuration = 420,
  stagger = 60;
const easing = "cubic-bezier(0.32, 0.72, 0.24, 1)";
const statusLabels: Record<TreeStatus, string> = {
  queued: "Queued",
  running: "Running",
  waiting: "Needs you",
  done: "Done",
  failed: "Failed",
  stopped: "Stopped",
};
const formatTreeCost = (cost: number) =>
  cost > 0 && cost < 0.005
    ? "<$0.01"
    : `$${cost < 10 ? cost.toFixed(2) : Math.round(cost).toLocaleString("en-US")}`;
const formatCount = new Intl.NumberFormat("en-US");
const initials = (name = "") =>
  name
    .split(/\s+/)
    .map((word) => Array.from(word.replace(/^[^\p{L}\p{N}]+/u, ""))[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
const flattenAgents = (agent: TreeAgent): TreeAgent[] => [
  agent,
  ...(agent.children ?? []).flatMap(flattenAgents),
];
const branchCost = (agent: TreeAgent): number =>
  (agent.cost ?? 0) +
  (agent.children ?? []).reduce((sum, child) => sum + branchCost(child), 0);
const flattenBranches = (branch: ShownBranch): ShownBranch[] => [
  branch,
  ...branch.kids.flatMap(flattenBranches),
];
const branchDepth = (branch: ShownBranch): number =>
  Math.max(0, ...branch.kids.map((child) => branchDepth(child) + 1));
const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const shownBranch = (agent: TreeAgent, collapsed: string[]): ShownBranch => ({
  agent,
  kids:
    agent.id !== undefined && collapsed.includes(agent.id)
      ? []
      : (agent.children ?? []).map((child) => shownBranch(child, collapsed)),
});
const subscribers = new Set<() => void>();
let timer = 0;
const TreeSpark = () => (
  <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <path
      d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
      fill={`currentColor`}
    />
    <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
  </svg>
);
const StatusIcon = ({ status, prefix }: { status?: TreeStatus; prefix: string }) =>
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
const ChevronIcon = () => (
  <svg
    width={`12`}
    height={`12`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path
      d={`M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
  </svg>
);
export { AgentTree };
export type { TreeAgent };
export type { TreeStatus };
export type { AgentTreeProps };
