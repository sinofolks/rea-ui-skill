"use client";

import "./AgentGraph.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
type GraphStatus = "idle" | "working" | "waiting" | "error" | "done";
interface GraphNode {
  id?: string;
  name?: string;
  label?: string;
  kind?: "agent" | "tool" | "user";
  status?: GraphStatus;
  lead?: boolean;
  short?: string;
  detail?: string;
  doing?: string;
  icon?: ReactNode;
  cost?: number;
  [field: string]: unknown;
}
interface GraphCall {
  id?: string;
  name?: string;
  label?: string;
  from?: string;
  to?: string;
  at?: number;
  status?: "pending" | "ok" | "error";
  ms?: number;
  [field: string]: unknown;
}
interface AgentGraphProps {
  nodes: GraphNode[];
  calls?: GraphCall[];
  edges?: [string, string][];
  now?: number;
  heatWindow?: number;
  onSelect?: (node: GraphNode | null) => void;
  height?: number;
  formatCost?: (amount: number) => string;
  title?: string;
  className?: string;
}
type GraphId = string | undefined;
type GraphStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};
type GraphEdge = [key: string, nodes: [GraphId, GraphId]];
type ValidGraphCall = GraphCall & {
  at: number;
};
interface EdgeHeat {
  count: number;
  last: number;
}
interface Point {
  x: number;
  y: number;
}
interface GraphSpot extends Point {
  ring: number;
}
interface GraphLayout {
  width: number;
  height: number;
  narrow: boolean;
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  innerX: number;
  innerY: number;
  lead?: string;
  spots: Map<GraphId, GraphSpot>;
  sizes: Map<GraphId, number | undefined>;
  popDelays: Map<GraphId, number>;
  drawDelays: Map<GraphId, number>;
}
interface GraphRoute {
  path: string;
  at(progress: number): Point;
}
type Turn = "v" | "h" | "vh" | "hv";
interface RoutePlan {
  key: string;
  start: GraphSpot;
  end: GraphSpot;
  turn: Turn;
  startOffset: number;
  endOffset: number;
}
interface PortEntry {
  plan: RoutePlan;
  end: "start" | "end";
  order: number;
}
type PulseKind = "req" | "ask" | "res" | "askres" | "err";
interface Pulse {
  call: GraphId;
  from: GraphId;
  to: GraphId;
  kind: PulseKind;
  start: number;
  duration: number;
  then?: GraphCall["status"];
  element?: SVGGElement;
  live?: boolean;
}
interface Ripple {
  node: GraphId;
  kind: PulseKind;
  start: number;
  element?: SVGRectElement;
}
interface Flash {
  element: Element;
  attribute: string;
  until: number;
}
interface Body {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}
type AgentGraphController = ReturnType<typeof useAgentGraph>;
function AgentGraph(props: AgentGraphProps) {
  return <AgentGraphView {...props} />;
}
function finiteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function formatCost_graph_model(value: number): string {
  const absolute = Math.abs(value),
    label =
      absolute > 0 && absolute < 0.005
        ? "<$0.01"
        : `$${absolute < 10 ? absolute.toFixed(2) : Math.round(absolute).toLocaleString("en-US")}`;
  return value < 0 && label !== "$0.00" ? `-${label}` : label;
}
function formatDuration(milliseconds: number): string {
  if (milliseconds < 1000) return `${Math.round(milliseconds)}ms`;
  if (milliseconds < 60000) return `${(milliseconds / 1000).toFixed(1)}s`;
  const minutes = Math.floor(milliseconds / 60000);
  if (minutes < 60) return `${minutes}m ${pad(Math.floor(milliseconds / 1000) % 60)}s`;
  const hours = Math.floor(minutes / 60);
  return hours < 24
    ? `${hours}h ${pad(minutes % 60)}m`
    : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function initials(name: string = ""): string {
  return name
    .split(/\s+/)
    .map((part) => part.match(/[\p{L}\p{N}]/u)?.[0] ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
function edgeKey(first: GraphId, second: GraphId): string {
  return first! < second! ? `${first}|${second}` : `${second}|${first}`;
}
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
function roundCoordinate(value: number): number {
  return Math.round(value * 10) / 10;
}
function graphConnections(
  nodes: Map<GraphId, GraphNode>,
  edges: [string, string][],
  calls: GraphCall[],
): GraphEdge[] {
  const pairs = new Map<string, [GraphId, GraphId]>();
  function add(first: GraphId, second: GraphId) {
    if (first === second || !nodes.has(first) || !nodes.has(second)) return;
    const key = edgeKey(first, second);
    if (!pairs.has(key))
      pairs.set(key, first! < second! ? [first, second] : [second, first]);
  }
  for (const [first, second] of edges) add(first, second);
  for (const call of calls) if (Number.isFinite(call.at)) add(call.from, call.to);
  return [...pairs];
}
function graphActivity(
  nodes: Map<GraphId, GraphNode>,
  calls: GraphCall[],
  now: number,
  heatWindow: number,
) {
  const validCalls = calls.filter(
    (call): call is ValidGraphCall =>
      call.from !== call.to &&
      nodes.has(call.from) &&
      nodes.has(call.to) &&
      Number.isFinite(call.at),
  );
  const heat = new Map<string, EdgeHeat>(),
    latest = new Map<GraphId, ValidGraphCall[]>(),
    counts = new Map<GraphId, number>(),
    outgoing = new Map<GraphId, Map<GraphId, number>>();
  let perMinute = 0;
  for (const call of validCalls) {
    if (call.at > now) continue;
    for (const id of [call.from, call.to]) {
      const recent = latest.get(id) ?? [];
      recent.push(call);
      if (recent.length > 4) recent.shift();
      latest.set(id, recent);
      if (call.at > now - 60000) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    if (call.at > now - 60000) {
      const targets = outgoing.get(call.from) ?? new Map<GraphId, number>();
      targets.set(call.to, (targets.get(call.to) ?? 0) + 1);
      outgoing.set(call.from, targets);
      perMinute++;
    }
    const key = edgeKey(call.from, call.to),
      value = heat.get(key) ?? { count: 0, last: 0 };
    if (call.at > now - heatWindow) value.count++;
    value.last = Math.max(value.last, call.at);
    heat.set(key, value);
  }
  return {
    validCalls,
    heat,
    latest,
    counts,
    outgoing,
    perMinute,
    maxHeat: Math.max(1, ...[...heat.values()].map((value) => value.count)),
  };
}
function GraphIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 16 16`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M8 8.4 3.2 4M8 8.4l5-4.2M8 8.4l4.4 4`}
        stroke={`currentColor`}
        strokeWidth={`1.2`}
        strokeLinecap={`round`}
        opacity={`0.5`}
      />
      <circle cx={`8`} cy={`8.4`} r={`2.4`} fill={`currentColor`} />
      <circle cx={`3.2`} cy={`4`} r={`1.6`} fill={`currentColor`} />
      <circle cx={`13`} cy={`4.2`} r={`1.6`} fill={`currentColor`} />
      <circle cx={`12.4`} cy={`12.4`} r={`1.6`} fill={`currentColor`} />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z`}
        stroke={`currentColor`}
        strokeWidth={`1.8`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
      <path
        d={`M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z`}
        stroke={`currentColor`}
        strokeWidth={`1.8`}
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg
      width={`14`}
      height={`14`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M19 5L5 19M5 5L19 19`}
        stroke={`currentColor`}
        strokeWidth={`1.8`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
    </svg>
  );
}
function OutgoingIcon() {
  return (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M20 12L4 12`}
        stroke={`currentColor`}
        strokeWidth={`2`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
      <path
        d={`M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7`}
        stroke={`currentColor`}
        strokeWidth={`2`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
    </svg>
  );
}
function IncomingIcon() {
  return (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M4 12L20 12`}
        stroke={`currentColor`}
        strokeWidth={`2`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
      <path
        d={`M9 17C9 17 4 13.3176 4 12C4 10.6824 9 7 9 7`}
        stroke={`currentColor`}
        strokeWidth={`2`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M5 14L8.5 17.5L19 6.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`3`}
      />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M12 7V13`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`3`}
      />
      <path
        d={`M12 17.5V17.6`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`3.4`}
      />
    </svg>
  );
}
function WaitingIcon() {
  return (
    <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M12 6.5V12L15 14.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2.8`}
      />
    </svg>
  );
}
function SpinnerIcon({ prefix }: { prefix: string }) {
  return (
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
  );
}
function circularMean(turns: number[]): number {
  let sine = 0,
    cosine = 0;
  for (const turn of turns) {
    sine += Math.sin(turn * fullTurn);
    cosine += Math.cos(turn * fullTurn);
  }
  return (((Math.atan2(sine, cosine) / fullTurn) % 1) + 1) % 1;
}
function ellipseSampler(
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
): (turn: number) => Point {
  const lengths = [0];
  let previousX = centerX,
    previousY = centerY - radiusY;
  for (let index = 1; index <= 240; index++) {
    const angle = -Math.PI / 2 + (index / 240) * fullTurn,
      x = centerX + radiusX * Math.cos(angle),
      y = centerY + radiusY * Math.sin(angle);
    lengths.push(lengths[index - 1] + Math.hypot(x - previousX, y - previousY));
    previousX = x;
    previousY = y;
  }
  const total = lengths[240] || 1;
  return (turn) => {
    const distance = (((turn % 1) + 1) % 1) * total;
    let segment = 1;
    while (segment < 240 && lengths[segment] < distance) segment++;
    const fraction =
        (distance - lengths[segment - 1]) /
        (lengths[segment] - lengths[segment - 1] || 1),
      angle = -Math.PI / 2 + ((segment - 1 + fraction) / 240) * fullTurn;
    return {
      x: centerX + radiusX * Math.cos(angle),
      y: centerY + radiusY * Math.sin(angle),
    };
  };
}
function layoutGraph(
  nodes: GraphNode[],
  edges: [GraphId, GraphId][],
  width: number,
  height: number,
): GraphLayout {
  const narrow = width < 520,
    diameters = narrow ? sizes_graph_layout.narrow : sizes_graph_layout.wide,
    sidePadding = diameters.tool / 2 + (narrow ? 28 : 48),
    topPadding = diameters.tool / 2 + (narrow ? 40 : 46),
    bottomPadding = topPadding,
    centerX = width / 2,
    radiusX = Math.max(40, width / 2 - sidePadding),
    radiusY = Math.max(40, (height - topPadding - bottomPadding) / 2),
    centerY = topPadding + radiusY,
    innerX = 0.5,
    innerY = narrow ? 0.64 : 0.5;
  const outer = ellipseSampler(centerX, centerY, radiusX, radiusY),
    inner = ellipseSampler(centerX, centerY, radiusX * innerX, radiusY * innerY),
    agents = nodes.filter((node) => node.kind === "agent"),
    lead = (agents.find((node) => node.lead) ?? agents[0])?.id,
    others = agents.filter((node) => node.id !== lead),
    peripheral = nodes.filter((node) => node.kind !== "agent");
  const spots = new Map<GraphId, GraphSpot>(),
    nodeSizes = new Map<GraphId, number | undefined>(),
    popDelays = new Map<GraphId, number>(),
    drawDelays = new Map<GraphId, number>();
  if (lead) {
    spots.set(lead, { x: centerX, y: centerY, ring: 0 });
    popDelays.set(lead, 0);
    drawDelays.set(lead, -1);
  }
  const agentTurns = new Map<GraphId, number>();
  others.forEach((node, index) => {
    const turn = others.length === 1 ? 0.5 : (index + 0.5) / others.length;
    agentTurns.set(node.id, turn);
    spots.set(node.id, { ...inner(turn), ring: 1 });
    drawDelays.set(node.id, 140 + index * 90);
    popDelays.set(node.id, 140 + index * 90 + 260);
  });
  const neighbors = new Map<GraphId, GraphId[]>();
  for (const [first, second] of edges) {
    neighbors.set(first, [...(neighbors.get(first) ?? []), second]);
    neighbors.set(second, [...(neighbors.get(second) ?? []), first]);
  }
  const ordered = peripheral
    .map((node, index) => {
      const turns = (neighbors.get(node.id) ?? [])
        .map((id) => agentTurns.get(id))
        .filter((turn): turn is number => turn !== undefined);
      return {
        id: node.id,
        preferred: turns.length
          ? circularMean(turns)
          : node.kind === "user"
            ? 0
            : (index + 0.5) / Math.max(1, peripheral.length),
        index,
      };
    })
    .sort(
      (first, second) => first.preferred - second.preferred || first.index - second.index,
    );
  if (ordered.length) {
    const count = ordered.length,
      offset = circularMean(
        ordered.map((entry, index) => entry.preferred - index / count),
      );
    ordered.forEach((entry, index) =>
      spots.set(entry.id, { ...outer(offset + index / count), ring: 2 }),
    );
    [...ordered]
      .sort(
        (first, second) =>
          ((offset + ordered.indexOf(first) / count) % 1) -
          ((offset + ordered.indexOf(second) / count) % 1),
      )
      .forEach((entry, index) => {
        drawDelays.set(entry.id, 620 + index * 70);
        popDelays.set(entry.id, 620 + index * 70 + 260);
      });
  }
  for (const node of nodes)
    nodeSizes.set(
      node.id,
      node.id === lead ? diameters.lead : node.kind ? diameters[node.kind] : undefined,
    );
  const snapDistance = Math.min(96, width * 0.12),
    spacing = narrow ? { x: 64, y: 76 } : { x: 96, y: 84 };
  const hasRoom = (id: GraphId, position: Point, factor: number) =>
    [...spots].every(
      ([otherId, other]) =>
        otherId === id ||
        Math.abs(other.x - position.x) > spacing.x * factor ||
        Math.abs(other.y - position.y) > spacing.y * factor,
    );
  for (const node of peripheral) {
    const spot = spots.get(node.id);
    if (!spot || hasRoom(node.id, spot, 0.8)) continue;
    const angle = Math.atan2(spot.y - centerY, spot.x - centerX);
    search: for (let distance = 8; distance <= 120; distance += 8)
      for (const turn of [0, 0.5, -0.5, 1, -1, 1.6, -1.6]) {
        const candidate = {
          x: spot.x + Math.cos(angle + turn) * distance,
          y: spot.y + Math.sin(angle + turn) * distance,
        };
        if (
          candidate.x < sidePadding ||
          candidate.x > width - sidePadding ||
          candidate.y < topPadding ||
          candidate.y > height - bottomPadding ||
          !hasRoom(node.id, candidate, 0.8)
        )
          continue;
        spot.x = candidate.x;
        spot.y = candidate.y;
        break search;
      }
  }
  for (const node of peripheral) {
    const spot = spots.get(node.id),
      adjacent = (neighbors.get(node.id) ?? []).map((id) => spots.get(id)),
      anchor =
        adjacent.find((spot) => spot?.ring === 1) ??
        adjacent.find((spot) => spot?.ring === 0);
    if (!spot || !anchor) continue;
    const deltaX = Math.abs(spot.x - anchor.x),
      deltaY = Math.abs(spot.y - anchor.y);
    if (
      deltaX < 8 ||
      (deltaX < snapDistance && hasRoom(node.id, { x: anchor.x, y: spot.y }, 1))
    )
      spot.x = anchor.x;
    else if (
      deltaY < 8 ||
      (deltaY < snapDistance && hasRoom(node.id, { x: spot.x, y: anchor.y }, 1))
    )
      spot.y = anchor.y;
  }
  return {
    width,
    height,
    narrow,
    centerX,
    centerY,
    radiusX,
    radiusY,
    innerX,
    innerY,
    lead,
    spots,
    sizes: nodeSizes,
    popDelays,
    drawDelays,
  };
}
function roundedRoute(start: Point, end: Point, turn: "vh" | "hv"): GraphRoute {
  const deltaX = end.x - start.x,
    deltaY = end.y - start.y,
    radius = Math.min(8, Math.abs(deltaX), Math.abs(deltaY)),
    round = roundCoordinate;
  if (Math.abs(deltaX) < 1 || Math.abs(deltaY) < 1 || radius < 0.5)
    return {
      path: `M${round(start.x)} ${round(start.y)}L${round(end.x)} ${round(end.y)}`,
      at: (progress) => ({
        x: start.x + deltaX * progress,
        y: start.y + deltaY * progress,
      }),
    };
  const directionX = Math.sign(deltaX),
    directionY = Math.sign(deltaY),
    corner = turn === "vh" ? { x: start.x, y: end.y } : { x: end.x, y: start.y },
    before =
      turn === "vh"
        ? { x: corner.x, y: corner.y - directionY * radius }
        : { x: corner.x - directionX * radius, y: corner.y },
    after =
      turn === "vh"
        ? { x: corner.x + directionX * radius, y: corner.y }
        : { x: corner.x, y: corner.y + directionY * radius };
  const path = `M${round(start.x)} ${round(start.y)}L${round(before.x)} ${round(before.y)}Q${round(corner.x)} ${round(corner.y)} ${round(after.x)} ${round(after.y)}L${round(end.x)} ${round(end.y)}`,
    points = [start, before];
  for (let index = 1; index <= 6; index++) {
    const progress = index / 6,
      inverse = 1 - progress;
    points.push({
      x:
        inverse * inverse * before.x +
        2 * inverse * progress * corner.x +
        progress * progress * after.x,
      y:
        inverse * inverse * before.y +
        2 * inverse * progress * corner.y +
        progress * progress * after.y,
    });
  }
  points.push(end);
  const lengths = [0];
  for (let index = 1; index < points.length; index++)
    lengths.push(
      lengths[index - 1] +
        Math.hypot(
          points[index].x - points[index - 1].x,
          points[index].y - points[index - 1].y,
        ),
    );
  const total = lengths.at(-1) || 1;
  return {
    path,
    at(progress) {
      const distance = clamp(progress, 0, 1) * total;
      let segment = 1;
      while (segment < points.length - 1 && lengths[segment] < distance) segment++;
      const fraction =
        (distance - lengths[segment - 1]) /
        (lengths[segment] - lengths[segment - 1] || 1);
      return {
        x: points[segment - 1].x + (points[segment].x - points[segment - 1].x) * fraction,
        y: points[segment - 1].y + (points[segment].y - points[segment - 1].y) * fraction,
      };
    },
  };
}
function routeGraph(
  keys: string[],
  spots: Map<GraphId, GraphSpot>,
  sizes: Map<GraphId, number | undefined>,
  center: Point,
  portSpacing: number,
): Map<string, GraphRoute> {
  const plans: RoutePlan[] = [],
    ports = new Map<string, PortEntry[]>();
  function intersections(points: Point[], exclude: GraphId[]) {
    let count = 0;
    for (const [id, spot] of spots) {
      if (exclude.includes(id)) continue;
      const padding = (sizes.get(id) ?? 34) / 2 + 6;
      for (let index = 1; index < points.length; index++) {
        const start = points[index - 1],
          end = points[index];
        if (
          Math.min(start.x, end.x) - padding < spot.x &&
          spot.x < Math.max(start.x, end.x) + padding &&
          Math.min(start.y, end.y) - padding < spot.y &&
          spot.y < Math.max(start.y, end.y) + padding
        )
          count++;
      }
    }
    return count;
  }
  function port(id: GraphId, side: string, entry: PortEntry) {
    const key = `${id}:${side}`;
    ports.set(key, [...(ports.get(key) ?? []), entry]);
  }
  for (const key of keys) {
    const [first, second] = key.split("|"),
      firstSpot = spots.get(first),
      secondSpot = spots.get(second);
    if (!firstSpot || !secondSpot) continue;
    const forward =
        firstSpot.ring < secondSpot.ring ||
        (firstSpot.ring === secondSpot.ring && first < second),
      [startId, endId] = forward ? [first, second] : [second, first],
      start = forward ? firstSpot : secondSpot,
      end = forward ? secondSpot : firstSpot;
    let turn: Turn;
    if (Math.abs(end.x - start.x) < 1) turn = "v";
    else if (Math.abs(end.y - start.y) < 1) turn = "h";
    else {
      const outward =
          Math.sign(end.x - start.x) === Math.sign(start.x - center.x) ||
          Math.abs(start.x - center.x) < 1,
        preferred =
          start.ring === 0 ? "vh" : start.ring === end.ring || outward ? "hv" : "vh",
        alternate = preferred === "vh" ? "hv" : "vh",
        points = (shape: "vh" | "hv") => [
          start,
          shape === "vh" ? { x: start.x, y: end.y } : { x: end.x, y: start.y },
          end,
        ];
      turn =
        intersections(points(preferred), [startId, endId]) >
        intersections(points(alternate), [startId, endId])
          ? alternate
          : preferred;
    }
    const plan: RoutePlan = {
      key,
      start,
      end,
      turn,
      startOffset: 0,
      endOffset: 0,
    };
    plans.push(plan);
    const startsVertical = turn === "v" || turn === "vh",
      endsVertical = turn === "v" || turn === "hv",
      firstLength = Math.abs(startsVertical ? end.y - start.y : end.x - start.x),
      secondLength = Math.abs(startsVertical ? end.x - start.x : end.y - start.y),
      startDirection =
        turn === "v" || turn === "h"
          ? 0
          : Math.sign(startsVertical ? end.x - start.x : end.y - start.y),
      endDirection =
        turn === "v" || turn === "h"
          ? 0
          : Math.sign(endsVertical ? start.x - end.x : start.y - end.y);
    port(
      startId,
      startsVertical
        ? end.y > start.y
          ? "bottom"
          : "top"
        : end.x > start.x
          ? "right"
          : "left",
      { plan, end: "start", order: startDirection * (100000 - firstLength) },
    );
    port(
      endId,
      endsVertical
        ? start.y > end.y
          ? "bottom"
          : "top"
        : start.x > end.x
          ? "right"
          : "left",
      { plan, end: "end", order: endDirection * (100000 - secondLength) },
    );
  }
  for (const [key, entries] of ports) {
    if (entries.length < 2) continue;
    const diameter = sizes.get(key.slice(0, key.lastIndexOf(":"))) ?? 34,
      spacing = Math.min(portSpacing, (diameter * 0.6) / (entries.length - 1));
    entries.sort((first, second) => first.order - second.order);
    entries.forEach((entry, index) => {
      const offset = (index - (entries.length - 1) / 2) * spacing;
      if (entry.end === "start") entry.plan.startOffset = offset;
      else entry.plan.endOffset = offset;
    });
  }
  const routes = new Map<string, GraphRoute>();
  for (const { key, start, end, turn, startOffset, endOffset } of plans) {
    if (turn === "v") {
      const x = start.x + (startOffset || endOffset);
      routes.set(key, roundedRoute({ x, y: start.y }, { x, y: end.y }, "vh"));
    } else if (turn === "h") {
      const y = start.y + (startOffset || endOffset);
      routes.set(key, roundedRoute({ x: start.x, y }, { x: end.x, y }, "hv"));
    } else if (turn === "vh")
      routes.set(
        key,
        roundedRoute(
          { x: start.x + startOffset, y: start.y },
          { x: end.x, y: end.y + endOffset },
          "vh",
        ),
      );
    else
      routes.set(
        key,
        roundedRoute(
          { x: start.x, y: start.y + startOffset },
          { x: end.x + endOffset, y: end.y },
          "hv",
        ),
      );
  }
  return routes;
}
function svg<Tag extends keyof SVGElementTagNameMap>(
  tag: Tag,
  attributes: Record<string, string> = {},
) {
  const element = document.createElementNS(svgNamespace, tag);
  for (const [name, value] of Object.entries(attributes))
    element.setAttribute(name, value);
  return element;
}
function useAgentGraph(
  {
    nodes,
    calls = [],
    edges = [],
    now,
    heatWindow = 20000,
    onSelect,
    height,
  }: AgentGraphProps,
  clean: boolean,
) {
  const stageRef = useRef<HTMLDivElement>(null),
    cardRef = useRef<HTMLDivElement>(null),
    id = useId();
  const [width, setWidth] = useState(0),
    [reduced, setReduced] = useState(false),
    [clock, setClock] = useState(() => Date.now());
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    setWidth(stage.offsetWidth);
    const observer = new ResizeObserver(() => setWidth(stage.offsetWidth));
    observer.observe(stage);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)"),
      update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    if (now !== undefined) return;
    const timer = window.setInterval(() => setClock(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [now]);
  const currentTime = now ?? clock,
    previousNodes = useRef(new Map<GraphId, GraphNode>()),
    [leaving, setLeaving] = useState<GraphNode[]>([]),
    currentIds = new Set(nodes.map((node) => node.id)),
    retained = leaving.filter((node) => !currentIds.has(node.id)),
    leavingIds = new Set(retained.map((node) => node.id));
  useLayoutEffect(() => {
    const removed = [...previousNodes.current.values()].filter(
      (node) => !currentIds.has(node.id),
    );
    previousNodes.current = new Map(nodes.map((node) => [node.id, node]));
    if (!removed.length) return;
    const removedIds = new Set(removed.map((node) => node.id));
    setLeaving((previous) => [
      ...previous.filter((node) => !removedIds.has(node.id)),
      ...removed,
    ]);
    window.setTimeout(
      () => setLeaving((previous) => previous.filter((node) => !removedIds.has(node.id))),
      460,
    );
  });
  const renderedNodes = [...nodes, ...retained],
    nodeMap = new Map(renderedNodes.map((node) => [node.id, node])),
    connections = graphConnections(nodeMap, edges, calls);
  const stageHeight =
      height ??
      Math.round(
        width < 520 ? clamp(width * 1.7, 380, 640) : clamp(width * 0.6, 360, 520),
      ) + 32,
    currentConnections = connections.filter(
      ([, [first, second]]) => currentIds.has(first) && currentIds.has(second),
    );
  const layoutKey = JSON.stringify([
    width,
    stageHeight,
    nodes.map((node) => [node.id, node.kind, +!!node.lead]),
    currentConnections.map(([key]) => key),
  ]);
  const layout = useMemo(
    () =>
      layoutGraph(
        nodes,
        currentConnections.map(([, pair]) => pair),
        width,
        stageHeight,
      ),
    [layoutKey],
  );
  const activity = graphActivity(nodeMap, calls, currentTime, heatWindow),
    [hoveredId, setHoveredId] = useState<GraphId | null>(null),
    [selectedId, setSelectedId] = useState<GraphId | null>(null),
    selectedNode = selectedId ? nodeMap.get(selectedId) : undefined,
    focusId = hoveredId ?? (selectedNode ? selectedId : null),
    nearby = new Set<GraphId>();
  if (focusId) {
    nearby.add(focusId);
    for (const [, [first, second]] of connections) {
      if (first === focusId) nearby.add(second);
      if (second === focusId) nearby.add(first);
    }
  }
  function select(next: GraphId | null) {
    setSelectedId(next);
    onSelect?.(next ? (nodeMap.get(next) ?? null) : null);
  }
  useEffect(() => {
    if (!selectedId) return;
    const closeOutside = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && cardRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest("[data-agg-node]")) return;
      select(null);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  });
  useEffect(() => {
    if (selectedId && !nodeMap.has(selectedId)) setSelectedId(null);
  });
  const [animation] = useState(
    () => new GraphAnimation(clean ? "ui-aggc" : "ui-agg", clean, id, layout),
  );
  animation.updateContext(layout, connections, reduced, nodeMap);
  useEffect(() => {
    if (reduced) return;
    let frame = 0,
      lastTime = performance.now(),
      visible = true;
    const step = (time: number) => {
      const delta = Math.min(0.05, Math.max(0, (time - lastTime) / 1000));
      lastTime = time;
      animation.step(time, delta);
      frame = visible && !document.hidden ? requestAnimationFrame(step) : 0;
    };
    const resume = () => {
      if (!frame && visible && !document.hidden) {
        lastTime = performance.now();
        frame = requestAnimationFrame(step);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    if (stageRef.current) observer.observe(stageRef.current);
    document.addEventListener("visibilitychange", resume);
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", resume);
    };
  }, [reduced, animation]);
  useLayoutEffect(() => {
    animation.step(performance.now(), 0);
  });
  useLayoutEffect(() => {
    animation.updateCalls(calls, activity.validCalls, currentTime);
  }, [calls]);
  useLayoutEffect(() => {
    const card = cardRef.current,
      spot = selectedId ? layout.spots.get(selectedId) : undefined;
    if (!card || !spot || layout.narrow) return;
    const half = (layout.sizes.get(selectedId ?? undefined) ?? 40) / 2,
      cardWidth = card.offsetWidth,
      cardHeight = card.offsetHeight,
      right = spot.x < layout.width / 2;
    card.style.left = `${clamp(right ? spot.x + half + 18 : spot.x - half - 18 - cardWidth, 8, layout.width - cardWidth - 8)}px`;
    card.style.top = `${clamp(spot.y - cardHeight / 2, 8, layout.height - cardHeight - 8)}px`;
  });
  const delays = useRef(new Map<GraphId, number>()),
    mounted = useRef(false);
  if (width > 0) {
    for (const node of renderedNodes)
      if (!delays.current.has(node.id))
        delays.current.set(
          node.id,
          mounted.current ? 0 : (layout.popDelays.get(node.id) ?? 0),
        );
    for (const [key, [first, second]] of connections)
      if (!delays.current.has(key))
        delays.current.set(
          key,
          mounted.current
            ? 0
            : Math.max(
                layout.drawDelays.get(first) ?? 0,
                layout.drawDelays.get(second) ?? 0,
              ),
        );
    const edgeKeys = new Set(connections.map(([key]) => key));
    for (const key of delays.current.keys())
      if (!nodeMap.has(key) && !edgeKeys.has(key ?? "")) delays.current.delete(key);
  }
  useEffect(() => {
    if (width) mounted.current = true;
  }, [width]);
  return {
    stageRef,
    cardRef,
    id,
    width,
    stageHeight,
    layout,
    animation,
    activity,
    currentTime,
    renderedNodes,
    nodeMap,
    connections,
    leavingIds,
    selectedId,
    selectedNode,
    hoveredId,
    setHoveredId,
    focusId,
    nearby,
    select,
    delays: delays.current,
    agents: nodes.filter((node) => node.kind === "agent"),
    tools: nodes.filter((node) => node.kind === "tool"),
    cost: nodes.reduce((total, node) => total + (finiteNumber(node.cost) ?? 0), 0),
    waiting: nodes.filter((node) => node.status === "waiting"),
    errors: nodes.filter((node) => node.status === "error"),
  };
}
function GraphNodeView({
  node,
  graph,
  prefix,
  clean,
}: {
  node: GraphNode;
  graph: AgentGraphController;
  prefix: string;
  clean: boolean;
}) {
  const {
    layout,
    leavingIds,
    focusId,
    nearby,
    selectedId,
    hoveredId,
    setHoveredId,
    select,
    animation,
    delays,
    id,
    activity,
  } = graph;
  const diameter = layout.sizes.get(node.id) ?? 34,
    leaving = leavingIds.has(node.id),
    lead = node.id === layout.lead,
    label = layout.narrow ? (node.short ?? node.name) : node.name,
    status = node.status ?? "idle",
    detail =
      node.kind !== "agent" || layout.narrow
        ? undefined
        : status === "waiting" || status === "error"
          ? statusLabels[status]
          : node.detail,
    count = activity.counts.get(node.id) ?? 0,
    spot = layout.spots.get(node.id),
    above =
      !!spot &&
      (node.kind === "agent"
        ? layout.narrow && spot.ring === 1 && spot.y < layout.centerY
        : spot.y < layout.centerY - layout.radiusY * 0.45);
  const clearHover = () =>
    setHoveredId((previous) => (previous === node.id ? null : previous));
  return (
    <div
      className={`${prefix}__node`}
      data-kind={node.kind}
      data-lead={lead ? "" : undefined}
      data-status={status}
      data-leaving={leaving ? "" : undefined}
      data-dim={focusId && !nearby.has(node.id) ? "" : undefined}
      data-open={selectedId === node.id ? "" : undefined}
      style={
        {
          "--d": `${diameter}px`,
          zIndex: selectedId === node.id || hoveredId === node.id ? 3 : lead ? 2 : 1,
        } as GraphStyle
      }
      ref={(element) => {
        if (element) animation.nodeElements.set(node.id, element);
        else animation.nodeElements.delete(node.id);
      }}
    >
      <div
        className={`${prefix}__body`}
        style={{ animationDelay: `${delays.get(node.id) ?? 0}ms` }}
      >
        <span className={`${prefix}__ring`} aria-hidden="true" />
        <button
          type="button"
          className={`${prefix}__disc`}
          data-agg-node=""
          data-logo={node.icon ? "" : undefined}
          title={[node.name, node.detail].filter(Boolean).join(" · ") || undefined}
          tabIndex={leaving ? -1 : undefined}
          aria-label={`${node.name}, ${kindLabels[node.kind ?? ""]}${node.status ? `, ${statusLabels[status].toLowerCase()}` : ""}${node.doing ? `: ${node.doing}` : ""}. ${count} ${count === 1 ? "call" : "calls"} in the last minute`}
          aria-haspopup="dialog"
          aria-expanded={selectedId === node.id}
          aria-controls={selectedId === node.id ? id : undefined}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setHoveredId(node.id);
          }}
          onPointerLeave={clearHover}
          onFocus={() => setHoveredId(node.id)}
          onBlur={clearHover}
          onClick={() => select(selectedId === node.id ? null : node.id)}
        >
          {node.icon ??
            (node.kind === "user" ? (
              <UserIcon />
            ) : (
              <span className={`${prefix}__initials`}>{initials(node.name)}</span>
            ))}
        </button>
        {clean && <span className={`${prefix}__stroke`} aria-hidden="true" />}
        {(status === "waiting" || status === "error" || status === "done") &&
          node.kind === "agent" && (
            <span className={`${prefix}__badge`} data-status={status} aria-hidden="true">
              {status === "waiting" ? (
                <WaitingIcon />
              ) : status === "error" ? (
                <ErrorIcon />
              ) : (
                <CheckIcon />
              )}
            </span>
          )}
        {(label || detail) && (
          <span
            className={`${prefix}__label`}
            data-above={above ? "" : undefined}
            aria-hidden="true"
          >
            {label && (
              <span className={`${prefix}__name`} dir="auto">
                {label}
              </span>
            )}
            {detail && (
              <span
                className={`${prefix}__line`}
                dir="auto"
                data-status={
                  status === "waiting" || status === "error" ? status : undefined
                }
              >
                {detail}
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
function GraphDetails({
  graph,
  prefix,
  formatCost,
}: {
  graph: AgentGraphController;
  prefix: string;
  formatCost: (amount: number) => string;
}) {
  const {
    selectedNode: node,
    nodeMap,
    activity,
    connections,
    select,
    cardRef,
    id,
    animation,
  } = graph;
  if (!node) return null;
  const status = node.status ?? "idle",
    calls = [...(activity.latest.get(node.id) ?? [])].reverse(),
    count = activity.counts.get(node.id) ?? 0,
    neighbors = connections
      .filter(([, [first, second]]) => first === node.id || second === node.id)
      .map(([, [first, second]]) => nodeMap.get(first === node.id ? second : first)),
    cost = finiteNumber(node.cost);
  return (
    <div
      ref={cardRef}
      id={id}
      className={`${prefix}__card`}
      role="dialog"
      aria-label={node.name}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        select(null);
        animation.nodeElements.get(node.id)?.querySelector("button")?.focus();
      }}
    >
      <div className={`${prefix}__card-head`}>
        <span className={`${prefix}__card-icon`} data-kind={node.kind}>
          {node.icon ?? (node.kind === "user" ? <UserIcon /> : initials(node.name))}
        </span>
        <span className={`${prefix}__card-who`}>
          <span className={`${prefix}__card-name`} dir="auto" title={node.name}>
            {node.name}
          </span>
          {node.detail && (
            <span className={`${prefix}__card-detail`} title={node.detail}>
              {node.detail}
            </span>
          )}
        </span>
        {node.status && (
          <span className={`${prefix}__pill`} data-status={status}>
            {statusLabels[status]}
          </span>
        )}
        <button
          type="button"
          className={`${prefix}__close`}
          aria-label="Close"
          autoFocus
          onClick={() => select(null)}
        >
          <CloseIcon />
        </button>
      </div>
      {node.doing ? (
        <p className={`${prefix}__doing`} dir="auto">
          {node.doing}
        </p>
      ) : (
        neighbors.length > 0 && (
          <p className={`${prefix}__doing`}>
            {node.kind === "agent" ? "Works with " : "Used by "}
            {neighbors.map((neighbor) => neighbor?.name).join(", ")}
          </p>
        )
      )}
      {calls.length > 0 && (
        <ul className={`${prefix}__calls`} aria-label="Latest calls">
          {calls.map((call) => {
            const outgoing = call.from === node.id,
              peer = nodeMap.get(outgoing ? call.to : call.from),
              callStatus = call.status ?? "ok",
              duration = finiteNumber(call.ms);
            return (
              <li className={`${prefix}__call`} data-status={callStatus} key={call.id}>
                <span className={`${prefix}__call-dir`}>
                  {outgoing ? <OutgoingIcon /> : <IncomingIcon />}
                  <span className={`${prefix}__sr`}>{outgoing ? "To" : "From"}</span>
                </span>
                <span className={`${prefix}__call-icon`} aria-hidden="true">
                  {peer?.icon ??
                    (peer?.kind === "user" ? <UserIcon /> : initials(peer?.name ?? ""))}
                </span>
                <span
                  className={`${prefix}__call-text`}
                  dir="auto"
                  title={`${peer?.name ?? ""}${call.label ? ` · ${call.label}` : ""}`}
                >
                  <span className={`${prefix}__call-who`}>
                    {peer?.name ?? (outgoing ? call.to : call.from)}
                  </span>
                  {call.label && (
                    <span className={`${prefix}__call-label`}>
                      {" · "}
                      {call.label}
                    </span>
                  )}
                </span>
                <span className={`${prefix}__call-end`}>
                  {callStatus === "pending" ? (
                    <SpinnerIcon prefix={prefix} />
                  ) : callStatus === "error" ? (
                    "Failed"
                  ) : duration === undefined ? (
                    "OK"
                  ) : (
                    formatDuration(Math.max(0, duration))
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <div className={`${prefix}__card-foot`}>
        {cost !== undefined && (
          <span className={`${prefix}__card-cost`}>{formatCost(cost)}</span>
        )}
        <span>
          {count} {count === 1 ? "call" : "calls"}
          {" in the last minute"}
        </span>
      </div>
    </div>
  );
}
function GraphLegend({
  prefix,
  clean,
  id,
}: {
  prefix: string;
  clean: boolean;
  id: string;
}) {
  return (
    <div className={`${prefix}__legend`} aria-hidden="true">
      {clean ? (
        (
          [
            ["call", "Call"],
            ["answer", "Answer"],
            ["ask", "Needs you"],
            ["error", "Failed"],
          ] as const
        ).map(([kind, label]) => {
          const gradient = `${id.replace(/:/g, "")}-lg-${kind}`;
          return (
            <span key={kind}>
              <svg width="20" height="8" viewBox="0 0 20 8">
                <defs>
                  <linearGradient
                    id={gradient}
                    gradientUnits="userSpaceOnUse"
                    x1="2"
                    y1="4"
                    x2="18"
                    y2="4"
                  >
                    <stop
                      offset="0"
                      stopOpacity="0"
                      className={`${prefix}__legend-stop`}
                      data-kind={kind}
                    />
                    <stop
                      offset="1"
                      className={`${prefix}__legend-stop`}
                      data-kind={kind}
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M2 4H18"
                  className={`${prefix}__legend-streak`}
                  stroke={`url(#${gradient})`}
                />
              </svg>
              {label}
            </span>
          );
        })
      ) : (
        <>
          <span>
            <svg width="22" height="8" viewBox="0 0 22 8">
              <circle
                cx="4"
                cy="4"
                r="1.1"
                className={`${prefix}__legend-tail`}
                opacity="0.2"
              />
              <circle
                cx="9"
                cy="4"
                r="1.8"
                className={`${prefix}__legend-tail`}
                opacity="0.4"
              />
              <circle cx="16" cy="4" r="3.2" className={`${prefix}__legend-call`} />
            </svg>
            {"Call"}
          </span>
          <span>
            <svg width="12" height="8" viewBox="0 0 12 8">
              <circle cx="6" cy="4" r="3" className={`${prefix}__legend-reply`} />
            </svg>
            {"Answer"}
          </span>
          <span>
            <svg width="22" height="8" viewBox="0 0 22 8">
              <path d="M1 4H21" className={`${prefix}__legend-line`} strokeWidth="3.5" />
            </svg>
            {"Busier link"}
          </span>
          <span>
            <svg width="10" height="8" viewBox="0 0 10 8">
              <circle cx="5" cy="4" r="3.5" className={`${prefix}__legend-wait`} />
            </svg>
            {"Needs you"}
          </span>
        </>
      )}
    </div>
  );
}
function AgentGraphView({
  clean = false,
  ...props
}: AgentGraphProps & {
  clean?: boolean;
}) {
  const {
      nodes,
      title = "Agent graph",
      className,
      formatCost = formatCost_graph_model,
    } = props,
    graph = useAgentGraph(props, clean),
    prefix = clean ? "ui-aggc" : "ui-agg";
  const {
    layout,
    waiting,
    errors,
    agents,
    tools,
    cost,
    activity,
    focusId,
    select,
    width,
    stageHeight,
    stageRef,
    id,
    connections,
    nodeMap,
    leavingIds,
    nearby,
    delays,
    animation,
    currentTime,
    renderedNodes,
  } = graph;
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      data-narrow={layout.narrow ? "" : undefined}
      data-focus={focusId ? "" : undefined}
    >
      <header className={`${prefix}__bar`}>
        <span className={`${prefix}__mark`}>
          <GraphIcon />
        </span>
        <span className={`${prefix}__title`} title={title}>
          {title}
        </span>
        {(waiting.length > 0 || errors.length > 0) && (
          <div className={`${prefix}__alerts`} aria-live="polite">
            {(layout.narrow ? waiting.slice(0, 1) : waiting).map((node) => (
              <button
                type="button"
                className={`${prefix}__chip`}
                data-kind="waiting"
                onClick={() => select(node.id)}
                key={node.id}
              >
                <WaitingIcon />
                {layout.narrow
                  ? waiting.length > 1
                    ? `${waiting.length} need you`
                    : "Needs you"
                  : `${node.short ?? node.name} needs you`}
              </button>
            ))}
            {(layout.narrow ? errors.slice(0, 1) : errors).map((node) => (
              <button
                type="button"
                className={`${prefix}__chip`}
                data-kind="error"
                onClick={() => select(node.id)}
                key={node.id}
              >
                <ErrorIcon />
                {layout.narrow ? "Failed" : `${node.short ?? node.name} failed`}
              </button>
            ))}
          </div>
        )}
        <span className={`${prefix}__sum`}>
          <span>
            <b>{agents.length}</b> {agents.length === 1 ? "agent" : "agents"}
          </span>
          <span>
            <b>{tools.length}</b> {tools.length === 1 ? "tool" : "tools"}
          </span>
          <span>
            <b>{activity.perMinute.toLocaleString("en-US")}</b>
            {" calls/min"}
          </span>
          <span className={`${prefix}__sum-cost`}>{formatCost(cost)}</span>
        </span>
      </header>
      <div className={`${prefix}__panel`}>
        <div
          ref={stageRef}
          className={`${prefix}__stage`}
          style={{ height: width > 0 ? stageHeight : undefined }}
          role="group"
          aria-label={`${title}: ${agents.length} agents and ${tools.length} tools`}
        >
          {width > 0 && (
            <svg
              className={`${prefix}__svg`}
              width={layout.width}
              height={layout.height}
              aria-hidden="true"
            >
              <defs>
                <radialGradient id={`${id}-glow`}>
                  <stop offset="0" style={{ stopColor: `var(--${prefix}-glow)` }} />
                  <stop
                    offset="1"
                    style={{
                      stopColor: `var(--${prefix}-glow)`,
                      stopOpacity: 0,
                    }}
                  />
                </radialGradient>
                {clean && (
                  <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.5" />
                  </filter>
                )}
              </defs>
              <ellipse
                className={`${prefix}__halo`}
                cx={layout.centerX}
                cy={layout.centerY}
                rx={layout.radiusX * layout.innerX * 0.9}
                ry={layout.radiusY * layout.innerY * 0.9}
                fill={`url(#${id}-glow)`}
              />
              <g>
                {connections.map(([key, [first, second]]) => {
                  const heat = activity.heat.get(key),
                    strokeWidth = heat?.count
                      ? 1.25 + 2.75 * Math.sqrt(heat.count / activity.maxHeat)
                      : 1.25,
                    idle = !heat || currentTime - heat.last > 6000,
                    firstNode = nodeMap.get(first),
                    secondNode = nodeMap.get(second),
                    asking =
                      (firstNode?.status === "waiting" && secondNode?.kind === "user") ||
                      (secondNode?.status === "waiting" && firstNode?.kind === "user"),
                    leaving = leavingIds.has(first) || leavingIds.has(second);
                  return (
                    <path
                      ref={(element) => animation.registerEdge(key, element)}
                      className={`${prefix}__edge`}
                      pathLength={1}
                      data-idle={!clean && idle ? "" : undefined}
                      data-ask={asking ? "" : undefined}
                      data-leaving={leaving ? "" : undefined}
                      data-near={
                        focusId &&
                        nearby.has(first) &&
                        nearby.has(second) &&
                        (first === focusId || second === focusId)
                          ? ""
                          : undefined
                      }
                      style={{
                        strokeWidth: clean ? undefined : strokeWidth,
                        animationDelay: `${delays.get(key) ?? 0}ms`,
                      }}
                      key={key}
                    />
                  );
                })}
              </g>
              <g
                ref={(element) => {
                  animation.pulseLayer = element;
                }}
              />
            </svg>
          )}
          {width > 0 && (
            <div className={`${prefix}__nodes`}>
              {renderedNodes.map((node) => (
                <GraphNodeView
                  key={node.id}
                  node={node}
                  graph={graph}
                  prefix={prefix}
                  clean={clean}
                />
              ))}
            </div>
          )}
          <GraphDetails graph={graph} prefix={prefix} formatCost={formatCost} />
        </div>
        <GraphLegend prefix={prefix} clean={clean} id={id} />
      </div>
      <ul className={`${prefix}__sr`}>
        {nodes.map((node) => {
          const outgoing = activity.outgoing.get(node.id),
            nodeCost = finiteNumber(node.cost);
          return (
            <li key={node.id}>
              {node.name}
              {" ("}
              {kindLabels[node.kind ?? ""]}
              {node.status ? `, ${statusLabels[node.status].toLowerCase()}` : ""}
              {")"}
              {node.doing ? `: ${node.doing}` : ""}
              {"."}
              {outgoing &&
                outgoing.size > 0 &&
                ` Calls in the last minute: ${[...outgoing].map(([target, count]) => `${nodeMap.get(target)?.name ?? target} ${count}`).join(", ")}.`}
              {nodeCost !== undefined && ` Cost ${formatCost(nodeCost)}.`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
const statusLabels = {
  idle: "Idle",
  working: "Working",
  waiting: "Needs you",
  error: "Error",
  done: "Done",
};
const kindLabels: Record<string, string> = {
  agent: "agent",
  tool: "tool",
  user: "you",
};
const pad = (value: number) => String(value).padStart(2, "0");
const fullTurn = Math.PI * 2;
const sizes_graph_layout = {
  wide: { lead: 56, agent: 46, tool: 34, user: 34 },
  narrow: { lead: 42, agent: 34, tool: 28, user: 28 },
};
const svgNamespace = "http://www.w3.org/2000/svg";
class GraphAnimation {
  readonly nodeElements = new Map<GraphId, HTMLDivElement>();
  readonly edgeElements = new Map<string, SVGPathElement>();
  pulseLayer: SVGGElement | null = null;
  private bodies = new Map<GraphId, Body>();
  private drawn = new Map<GraphId, GraphSpot>();
  private rings = new Map<GraphId, number>();
  private pulses: Pulse[] = [];
  private ripples: Ripple[] = [];
  private flashes: Flash[] = [];
  private arrived = new Set<GraphId>();
  private liveEdges = new Map<string, number>();
  private readyAt = 0;
  private routes = new Map<string, GraphRoute>();
  private routeSignature = "";
  private sequence = 0;
  private seenCalls: Map<GraphId, GraphCall["status"]> | null = null;
  private layout: GraphLayout;
  private edges: GraphEdge[] = [];
  private reduced = false;
  private nodes = new Map<GraphId, GraphNode>();
  constructor(
    private prefix: string,
    private clean: boolean,
    private id: string,
    layout: GraphLayout,
  ) {
    this.layout = layout;
  }
  updateContext(
    layout: GraphLayout,
    edges: GraphEdge[],
    reduced: boolean,
    nodes: Map<GraphId, GraphNode>,
  ) {
    this.layout = layout;
    this.edges = edges;
    this.reduced = reduced;
    this.nodes = nodes;
    for (const [id, spot] of layout.spots) this.rings.set(id, spot.ring);
  }
  registerEdge(key: string, element: SVGPathElement | null) {
    if (element) {
      if (!this.edgeElements.has(key)) this.routeSignature = "";
      this.edgeElements.set(key, element);
    } else this.edgeElements.delete(key);
  }
  private endLiveEdge(key: string) {
    const count = (this.liveEdges.get(key) ?? 1) - 1;
    if (count > 0) this.liveEdges.set(key, count);
    else {
      this.liveEdges.delete(key);
      this.edgeElements.get(key)?.removeAttribute("data-live");
    }
  }
  private flash(element: Element | undefined, attribute: string, until: number) {
    if (!element) return;
    element.setAttribute(attribute, "");
    this.flashes.push({ element, attribute, until });
  }
  private response(
    call: GraphId,
    from: GraphId,
    to: GraphId,
    status: GraphCall["status"],
    start: number,
  ) {
    const user = this.nodes.get(from)?.kind === "user";
    this.pulses.push({
      call,
      from,
      to,
      kind: status === "error" ? "err" : user ? "askres" : "res",
      start,
      duration: 0,
    });
  }
  private arrive(pulse: Pulse, time: number) {
    this.ripples.push({ node: pulse.to, kind: pulse.kind, start: time });
    if (pulse.kind === "err") {
      this.flash(
        this.edgeElements.get(edgeKey(pulse.from, pulse.to)),
        "data-error",
        time + 1500,
      );
      if (!this.clean)
        this.flash(this.nodeElements.get(pulse.to), "data-flash", time + 1500);
    }
    if (pulse.kind === "req" || pulse.kind === "ask") {
      if (pulse.then)
        this.response(pulse.call, pulse.to, pulse.from, pulse.then, time + 90);
      else {
        this.arrived.add(pulse.call);
        if (this.arrived.size > 400)
          this.arrived.delete(this.arrived.values().next().value);
      }
    }
  }
  private createPulse(pulse: Pulse): SVGGElement {
    const group = svg("g", {
      class: `${this.prefix}__pulse`,
      "data-kind": pulse.kind,
    });
    if (this.clean) {
      const gradient = svg("linearGradient", {
        id: `${this.id.replace(/:/g, "")}-s${++this.sequence}`,
        gradientUnits: "userSpaceOnUse",
      });
      for (const [offset, opacity] of [
        ["0", "0"],
        ["1", "1"],
      ])
        gradient.appendChild(
          svg("stop", {
            offset,
            "stop-opacity": opacity,
            class: `${this.prefix}__stop`,
          }),
        );
      const glow = svg("path", {
          class: `${this.prefix}__streak-glow`,
          stroke: `url(#${gradient.id})`,
          filter: `url(#${this.id}-blur)`,
        }),
        streak = svg("path", {
          class: `${this.prefix}__streak`,
          stroke: `url(#${gradient.id})`,
        });
      group.append(gradient, glow, streak);
    } else {
      const response =
        pulse.kind === "res" || pulse.kind === "askres" || pulse.kind === "err";
      group.appendChild(svg("circle", { r: "8", class: `${this.prefix}__glow` }));
      (response ? [1.7, 1.3, 0.9] : [3, 2.4, 1.8, 1.2]).forEach((radius, index) => {
        const tail = svg("circle", {
          r: String(radius),
          class: `${this.prefix}__tail`,
        });
        tail.style.opacity = String(
          (response ? [0.45, 0.28, 0.14] : [0.5, 0.34, 0.2, 0.1])[index],
        );
        group.appendChild(tail);
      });
      group.appendChild(
        svg("circle", {
          r: response ? "3.4" : "3.8",
          class: `${this.prefix}__head`,
        }),
      );
    }
    this.pulseLayer?.appendChild(group);
    return group;
  }
  step(time: number, deltaSeconds: number) {
    const layout = this.layout;
    if (!layout.width) return;
    this.readyAt ||= time;
    for (const [id, element] of this.nodeElements) {
      const target = layout.spots.get(id);
      let body = this.bodies.get(id);
      if (!body) {
        let origin = target;
        if (time - this.readyAt > 200 && !this.reduced)
          for (const [, [first, second]] of this.edges) {
            const neighbor = first === id ? second : second === id ? first : null,
              drawn = neighbor ? this.drawn.get(neighbor) : undefined;
            if (drawn) {
              origin = drawn;
              break;
            }
          }
        if (!origin) continue;
        body = { x: origin.x, y: origin.y, velocityX: 0, velocityY: 0 };
        this.bodies.set(id, body);
      }
      if (target) {
        if (this.reduced) {
          body.x = target.x;
          body.y = target.y;
          body.velocityX = body.velocityY = 0;
        } else if (deltaSeconds > 0) {
          body.velocityX +=
            (49 * (target.x - body.x) - 14 * body.velocityX) * deltaSeconds;
          body.velocityY +=
            (49 * (target.y - body.y) - 14 * body.velocityY) * deltaSeconds;
          body.x += body.velocityX * deltaSeconds;
          body.y += body.velocityY * deltaSeconds;
        }
      }
      this.drawn.set(id, {
        x: body.x,
        y: body.y,
        ring: this.rings.get(id) ?? 2,
      });
      element.style.transform = `translate3d(${roundCoordinate(body.x)}px, ${roundCoordinate(body.y)}px, 0)`;
    }
    for (const id of this.bodies.keys())
      if (!this.nodeElements.has(id)) {
        this.bodies.delete(id);
        this.drawn.delete(id);
      }
    const keys = [...this.edgeElements.keys()];
    let signature = `${layout.width}:${layout.height}:${keys.join(",")}`;
    for (const [id, point] of this.drawn)
      signature += `|${id}:${roundCoordinate(point.x)},${roundCoordinate(point.y)}`;
    if (signature !== this.routeSignature) {
      this.routeSignature = signature;
      this.routes = routeGraph(
        keys,
        this.drawn,
        layout.sizes,
        { x: layout.centerX, y: layout.centerY },
        layout.narrow ? 6 : 8,
      );
      for (const [key, element] of this.edgeElements) {
        const route = this.routes.get(key);
        if (route) element.setAttribute("d", route.path);
      }
    }
    const active: Pulse[] = [];
    for (const pulse of this.pulses) {
      const from = this.drawn.get(pulse.from),
        to = this.drawn.get(pulse.to),
        key = edgeKey(pulse.from, pulse.to),
        edge = this.edgeElements.get(key);
      if (!from || !to || !this.pulseLayer || !edge) {
        pulse.element?.remove();
        if (pulse.live) this.endLiveEdge(key);
        continue;
      }
      pulse.duration ||= clamp(
        (Math.hypot(to.x - from.x, to.y - from.y) * 1.15) / 0.3,
        520,
        1200,
      );
      const progress = (time - pulse.start) / pulse.duration;
      if (progress < 0) {
        active.push(pulse);
        continue;
      }
      if (!pulse.element) {
        pulse.element = this.createPulse(pulse);
        pulse.live = true;
        this.liveEdges.set(key, (this.liveEdges.get(key) ?? 0) + 1);
        edge.setAttribute("data-live", "");
      }
      if (progress >= 1) {
        pulse.element.remove();
        this.endLiveEdge(key);
        this.arrive(pulse, time);
        continue;
      }
      const route = this.routes.get(key);
      if (!route) continue;
      const forward =
          from.ring < to.ring || (from.ring === to.ring && pulse.from! < pulse.to!),
        eased = -(Math.cos(Math.PI * progress) - 1) / 2;
      if (this.clean) {
        const length = Math.min(
            0.3,
            36 / (Math.hypot(to.x - from.x, to.y - from.y) * 1.15 || 1),
          ),
          head = eased * (1 + length),
          tail = Math.max(0, head - length),
          end = Math.min(1, head),
          points = [];
        for (let index = 0; index <= 16; index++) {
          const at = tail + ((end - tail) * index) / 16;
          points.push(route.at(forward ? at : 1 - at));
        }
        const [gradient, glow, streak] = pulse.element.children,
          path =
            "M" +
            points
              .map((point) => `${roundCoordinate(point.x)} ${roundCoordinate(point.y)}`)
              .join("L");
        streak.setAttribute("d", path);
        glow.setAttribute("d", path);
        gradient.setAttribute("x1", String(roundCoordinate(points[0].x)));
        gradient.setAttribute("y1", String(roundCoordinate(points[0].y)));
        gradient.setAttribute("x2", String(roundCoordinate(points[16].x)));
        gradient.setAttribute("y2", String(roundCoordinate(points[16].y)));
        pulse.element.style.opacity = String(
          Math.min(1, progress * 7, (1 - progress) * 4),
        );
      } else {
        const children = pulse.element.children,
          last = children.length - 1;
        for (let index = 0; index <= last; index++) {
          const at = clamp(
              eased - (index === last || index === 0 ? 0 : index * 0.03),
              0,
              1,
            ),
            point = route.at(forward ? at : 1 - at);
          children[index].setAttribute("cx", String(roundCoordinate(point.x)));
          children[index].setAttribute("cy", String(roundCoordinate(point.y)));
        }
        pulse.element.style.opacity = String(
          Math.min(1, progress * 7, (1 - progress) * 7),
        );
      }
      active.push(pulse);
    }
    this.pulses = active;
    const ripples: Ripple[] = [];
    for (const ripple of this.ripples) {
      const point = this.drawn.get(ripple.node),
        progress = (time - ripple.start) / 720;
      if (!point || progress >= 1 || !this.pulseLayer) {
        ripple.element?.remove();
        continue;
      }
      if (!ripple.element) {
        ripple.element = svg("rect", {
          class: `${this.prefix}__ripple`,
          "data-kind": ripple.kind,
        });
        this.pulseLayer.appendChild(ripple.element);
      }
      const half = (layout.sizes.get(ripple.node) ?? 34) / 2,
        eased = 1 - (1 - progress) ** 3,
        radius = half + 1 + eased * (layout.narrow ? 9 : 13),
        element = ripple.element;
      for (const [name, value] of Object.entries({
        cx: point.x,
        cy: point.y,
        r: radius,
        x: point.x - radius,
        y: point.y - radius,
        width: radius * 2,
        height: radius * 2,
        rx: half * 0.5 + 1 + eased * 4,
      }))
        element.setAttribute(name, String(roundCoordinate(value)));
      element.style.opacity = String(0.55 * (1 - eased));
      ripples.push(ripple);
    }
    this.ripples = ripples;
    this.flashes = this.flashes.filter((flash) => {
      if (time < flash.until) return true;
      flash.element.removeAttribute(flash.attribute);
      return false;
    });
  }
  updateCalls(calls: GraphCall[], validCalls: ValidGraphCall[], now: number) {
    const initial = this.seenCalls === null;
    if (initial) this.seenCalls = new Map();
    const seen = this.seenCalls!,
      time = performance.now();
    for (const call of validCalls) {
      const status = call.status ?? "ok",
        previous = seen.get(call.id);
      if (previous === status || (!initial && call.at > now + 1)) continue;
      seen.set(call.id, status);
      if (initial || (previous === undefined && call.at < now - 4000)) continue;
      const key = edgeKey(call.from, call.to);
      if (this.reduced) {
        const edge = this.edgeElements.get(key);
        this.flash(edge, "data-live", time + 900);
        if (status === "error") this.flash(edge, "data-error", time + 1500);
        window.setTimeout(() => this.step(performance.now(), 0), 1600);
        continue;
      }
      if (previous === undefined) {
        const user = this.nodes.get(call.to)?.kind === "user";
        this.pulses.push({
          call: call.id,
          from: call.from,
          to: call.to,
          kind: user ? "ask" : "req",
          start: time,
          duration: 0,
          then: status === "pending" ? undefined : status,
        });
      } else {
        const request = this.pulses.find(
          (pulse) =>
            pulse.call === call.id && (pulse.kind === "req" || pulse.kind === "ask"),
        );
        if (request) request.then = status;
        else this.response(call.id, call.to, call.from, status, time);
      }
    }
    if (seen.size > calls.length * 2 + 100) {
      const ids = new Set(calls.map((call) => call.id));
      for (const id of seen.keys()) if (!ids.has(id)) seen.delete(id);
    }
  }
}
export { AgentGraph };
export type { GraphStatus };
export type { GraphNode };
export type { GraphCall };
export type { AgentGraphProps };
