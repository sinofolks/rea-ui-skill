"use client";

import "./ToolAccessMap.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
type AgentStatus = "queued" | "running" | "waiting" | "done" | "failed";
interface MapAgent {
  id?: string;
  name?: string;
  model?: string;
  avatar?: ReactNode;
  status?: AgentStatus;
  task?: string;
  tools?: AccessTool[];
  [field: string]: unknown;
}
interface AccessTool {
  id?: string;
  name?: string;
  label?: string;
  icon?: ReactNode;
  description?: string;
  calls?: ToolCall[];
  [field: string]: unknown;
}
interface ToolCall {
  id?: string;
  name?: string;
  label?: string;
  status?: "running" | "done" | "failed";
  at?: number;
  duration?: number;
  input?: unknown;
  output?: unknown;
  error?: string;
  replay?: boolean;
  [field: string]: unknown;
}
interface ToolAccessMapProps {
  agents: MapAgent[];
  tools?: AccessTool[];
  agent?: string;
  defaultAgent?: string;
  onAgentChange?: (id: string) => void;
  onReplay?: (call: ToolCall, input: unknown, tool: AccessTool, agent: MapAgent) => void;
  formatTime?: (ms: number) => string;
  title?: string;
  className?: string;
}
type AccessStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};
type ToolState = "running" | "idle" | "failed" | "used" | "blocked";
interface ToolAccess {
  tool: AccessTool;
  calls: ToolCall[];
  state: ToolState;
}
interface PositionedTool extends ToolAccess {
  left: boolean;
  index: number;
  top: number;
  x: number;
  path: string;
}
type ToolAccessController = ReturnType<typeof useToolAccess>;
function ToolAccessMap(props: ToolAccessMapProps) {
  return <ToolAccessMapView {...props} />;
}
function ToolsIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 16 16`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M5.6 8H2.8M10.4 8h2.8M8 5.6V3M8 10.4V13`}
        stroke={`currentColor`}
        strokeWidth={`1.5`}
        strokeLinecap={`round`}
        opacity={`0.45`}
      />
      <rect
        x={`5.2`}
        y={`5.2`}
        width={`5.6`}
        height={`5.6`}
        rx={`1.6`}
        fill={`currentColor`}
      />
      <circle cx={`2.2`} cy={`8`} r={`1.4`} fill={`currentColor`} />
      <circle cx={`13.8`} cy={`8`} r={`1.4`} fill={`currentColor`} />
    </svg>
  );
}
function SpinnerIcon({ prefix }: { prefix: string }) {
  return (
    <svg
      className={`${prefix}__spin`}
      width={`10`}
      height={`10`}
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
        strokeWidth={`3`}
      />
      <path
        d={`M12 3.5A8.5 8.5 0 0 1 20.5 12`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeWidth={`3`}
      />
    </svg>
  );
}
function CheckIcon() {
  return (
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
  );
}
function ErrorIcon() {
  return (
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
  );
}
function BackIcon() {
  return (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M15 6C15 6 9 10.4189 9 12C9 13.5812 15 18 15 18`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
    </svg>
  );
}
function ReplayIcon() {
  return (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M2.6 3.6A4 4 0 1 1 2 6.4`}
        stroke={`currentColor`}
        strokeWidth={`1.4`}
        strokeLinecap={`round`}
      />
      <path
        d={`M2.2 1.6v2.4h2.4`}
        stroke={`currentColor`}
        strokeWidth={`1.4`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
    </svg>
  );
}
function CallIcon({ status, prefix }: { status?: string; prefix: string }) {
  return (
    <span className={`${prefix}__call-icon`} data-status={status}>
      {status === "running" ? (
        <SpinnerIcon prefix={prefix} />
      ) : status === "failed" ? (
        <ErrorIcon />
      ) : (
        <CheckIcon />
      )}
    </span>
  );
}
function formatTime_access_model(milliseconds: number): string {
  const seconds = Math.max(0, Math.round(milliseconds / 1000));
  return seconds >= 3600
    ? `${Math.floor(seconds / 3600)}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`
    : `${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;
}
function formatDuration(milliseconds: number): string {
  if (milliseconds < 1000) return `${Math.max(0, Math.round(milliseconds))}ms`;
  if (milliseconds < 10000) return `${(milliseconds / 1000).toFixed(1)}s`;
  const seconds = Math.round(milliseconds / 1000);
  return seconds < 60
    ? `${seconds}s`
    : `${Math.floor(seconds / 60)}m ${pad(seconds % 60)}s`;
}
function plural(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}
function finiteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function initials(name: string = ""): string {
  return name
    .split(/\s+/)
    .map((part) => Array.from(part.replace(/^[^\p{L}\p{N}]+/u, ""))[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
function formatValue(value: unknown): string {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return String(value);
  }
}
function summarizeInput(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && !Array.isArray(value))
    return Object.entries(value)
      .map(
        ([key, entry]) =>
          `${key}: ${typeof entry === "string" ? JSON.stringify(entry) : (JSON.stringify(entry) ?? String(entry))}`,
      )
      .join(", ");
  return formatValue(value).replace(/\s+/g, " ");
}
function callState(calls: ToolCall[]): ToolState {
  return calls.some((call) => call.status === "running")
    ? "running"
    : calls.length === 0
      ? "idle"
      : calls.at(-1)?.status === "failed"
        ? "failed"
        : "used";
}
function resolveTools(
  agents: MapAgent[],
  selected: MapAgent | undefined,
  explicit: AccessTool[] | undefined,
): ToolAccess[] {
  const catalog = explicit ?? [];
  if (!explicit) {
    const tools = new Map<string | undefined, AccessTool>();
    for (const agent of agents)
      for (const { calls, ...tool } of agent.tools ?? []) {
        const existing = tools.get(tool.id);
        tools.set(tool.id, {
          ...tool,
          ...existing,
          name: existing?.name ?? tool.name ?? tool.id,
        });
      }
    catalog.push(...tools.values());
  }
  return catalog.map((tool) => {
    const allowed = selected?.tools?.find((candidate) => candidate.id === tool.id);
    const calls = (allowed?.calls ?? []).map((call) => ({
      ...call,
      at: finiteNumber(call.at),
      duration: finiteNumber(call.duration),
    }));
    return {
      tool: {
        ...tool,
        ...allowed,
        name: allowed?.name ?? tool.name,
        calls: allowed?.calls,
      },
      calls,
      state: allowed ? callState(calls) : "blocked",
    };
  });
}
function layoutTools(access: ToolAccess[], measuredWidth: number) {
  const leftCount = Math.ceil(access.length / 2),
    largestColumn = Math.max(leftCount, access.length - leftCount);
  const height = Math.max(
    largestColumn * 46 + Math.max(0, largestColumn - 1) * 12 + 28,
    148,
  );
  const width = measuredWidth || 680,
    centerX = width / 2,
    centerY = height / 2;
  const tools: PositionedTool[] = access.map((entry, index) => {
    const left = index < leftCount,
      columnIndex = left ? index : index - leftCount,
      columnSize = left ? leftCount : access.length - leftCount;
    const top =
      (height - (columnSize * 46 + (columnSize - 1) * 12)) / 2 + columnIndex * 58;
    const startX = left ? 130 : width - 130,
      endX = left ? centerX - 100 : centerX + 100,
      startY = top + 23;
    const bendX = Math.round((startX + endX) / 2),
      directionX = Math.sign(endX - startX),
      deltaY = centerY - startY,
      directionY = Math.sign(deltaY),
      radius = Math.min(8, Math.abs(deltaY) / 2, Math.abs(bendX - startX));
    const path =
      Math.abs(deltaY) < 1
        ? `M${startX} ${startY}H${endX}`
        : `M${startX} ${startY}H${bendX - directionX * radius}Q${bendX} ${startY} ${bendX} ${startY + directionY * radius}V${centerY - directionY * radius}Q${bendX} ${centerY} ${bendX + directionX * radius} ${centerY}H${endX}`;
    return {
      ...entry,
      left,
      index: columnIndex,
      top,
      x: left ? 0 : width - 130,
      path,
    };
  });
  return { tools, leftCount, height, width, centerX, centerY };
}
function validDraft(draft: string | null, call: ToolCall | undefined): boolean {
  if (draft === null || !call || typeof call.input === "string") return true;
  try {
    JSON.parse(draft);
    return true;
  } catch {
    return false;
  }
}
function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function tileFrame(panel: HTMLElement, tile: HTMLElement, clean: boolean): Keyframe {
  const parent = panel.offsetParent;
  let left = 0,
    top = 0;
  for (
    let element: HTMLElement | null = tile;
    element && element !== parent;
    element = element.offsetParent as HTMLElement | null
  ) {
    left += element.offsetLeft;
    top += element.offsetTop;
  }
  return {
    top: `${top}px`,
    right: `${(parent?.clientWidth ?? 0) - left - tile.offsetWidth}px`,
    bottom: `${(parent?.clientHeight ?? 0) - top - tile.offsetHeight}px`,
    left: `${left}px`,
    borderRadius: clean ? "9px" : "10px",
  };
}
function useToolAccess(
  { agents, tools, agent, defaultAgent, onAgentChange, onReplay }: ToolAccessMapProps,
  clean: boolean,
) {
  const [localAgent, setLocalAgent] = useState(defaultAgent ?? agents[0]?.id);
  const selectedAgent =
    agents.find((candidate) => candidate.id === (agent ?? localAgent)) ?? agents[0];
  const [openToolId, setOpenToolId] = useState<string | null | undefined>(null);
  const [selectedCallId, setSelectedCallId] = useState<string | null | undefined>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const backRef = useRef<HTMLButtonElement>(null),
    stageRef = useRef<HTMLDivElement>(null),
    panelRef = useRef<HTMLElement>(null);
  const restoreFocusId = useRef<string | null | undefined>(null),
    closingRef = useRef(false);
  const [closing, setClosing] = useState(false),
    [stageWidth, setStageWidth] = useState(0);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    setStageWidth(stage.clientWidth);
    const observer = new ResizeObserver(() => setStageWidth(stage.clientWidth));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  const narrow = stageWidth > 0 && stageWidth < 540;
  const tabsRef = useRef<HTMLDivElement>(null);
  const [moreTabs, setMoreTabs] = useState(false);
  function updateTabOverflow() {
    const tabs = tabsRef.current;
    setMoreTabs(
      Boolean(tabs && tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 1),
    );
  }
  useLayoutEffect(updateTabOverflow, [agents.length, stageWidth]);
  function changeAgent(id: string | undefined) {
    if (id !== selectedAgent?.id) {
      setLocalAgent(id);
      onAgentChange?.(id!);
      setOpenToolId(null);
      setDraft(null);
    }
  }
  const access = resolveTools(agents, selectedAgent, tools);
  const selectedTool = access.find(
    (entry) => entry.tool.id === openToolId && entry.state !== "blocked",
  );
  const allowedCount = access.filter((entry) => entry.state !== "blocked").length;
  const callCount = access.reduce((count, entry) => count + entry.calls.length, 0);
  const runningCount = access.filter((entry) => entry.state === "running").length;
  const lastRunningCount = useRef(1);
  useEffect(() => {
    if (runningCount > 0) lastRunningCount.current = runningCount;
  }, [runningCount]);
  useEffect(() => {
    if (openToolId && !selectedTool) setOpenToolId(null);
  }, [openToolId, selectedTool]);
  function findTile(id: string | null | undefined) {
    return id
      ? stageRef.current?.querySelector<HTMLButtonElement>(
          `[data-tool="${CSS.escape(id)}"]`,
        )
      : null;
  }
  useEffect(() => {
    if (openToolId) backRef.current?.focus();
    else if (restoreFocusId.current) {
      findTile(restoreFocusId.current)?.focus();
      restoreFocusId.current = null;
    }
  }, [openToolId]);
  useLayoutEffect(() => {
    const panel = panelRef.current,
      tile = findTile(openToolId);
    if (openToolId && panel && tile && !reducedMotion()) {
      closingRef.current = false;
      panel.animate([tileFrame(panel, tile, clean), panelFrame], {
        duration: 340,
        easing: "cubic-bezier(0.32, 0.72, 0.24, 1)",
      });
    }
  }, [openToolId, clean]);
  function closePanel() {
    if (closingRef.current) return;
    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      closingRef.current = false;
      setClosing(false);
      restoreFocusId.current = openToolId;
      setOpenToolId(null);
      setDraft(null);
    }
    const panel = panelRef.current,
      tile = findTile(openToolId);
    if (!panel || !tile || reducedMotion()) {
      finish();
      return;
    }
    closingRef.current = true;
    setClosing(true);
    for (const child of panel.children)
      child.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 120,
        fill: "forwards",
      });
    const animation = panel.animate([panelFrame, tileFrame(panel, tile, clean)], {
      duration: 340 * 0.85,
      easing: "cubic-bezier(0.32, 0.72, 0.24, 1)",
      fill: "forwards",
    });
    const timer = setTimeout(finish, 420);
    animation.onfinish = () => {
      clearTimeout(timer);
      finish();
    };
  }
  const layout = layoutTools(access, stageWidth);
  const calls = selectedTool?.calls ?? [];
  const selectedCall = calls.find((call) => call.id === selectedCallId) ?? calls.at(-1);
  const draftValid = validDraft(draft, selectedCall);
  function replay() {
    if (
      !onReplay ||
      !selectedCall ||
      !selectedTool ||
      !selectedAgent ||
      !draftValid ||
      selectedCall.status === "running"
    )
      return;
    const input =
      draft === null
        ? selectedCall.input
        : typeof selectedCall.input === "string"
          ? draft
          : JSON.parse(draft);
    onReplay(selectedCall, input, selectedTool.tool, selectedAgent);
    setDraft(null);
    setSelectedCallId(null);
  }
  function openTool(id: string | undefined) {
    setOpenToolId(id);
    setSelectedCallId(null);
    setDraft(null);
  }
  function selectCall(id: string | undefined) {
    setSelectedCallId(id);
    setDraft(null);
  }
  function onAgentKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === "ArrowRight"
        ? index + 1
        : event.key === "ArrowLeft"
          ? index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? agents.length - 1
              : -1;
    if (next < 0 || next >= agents.length) return;
    event.preventDefault();
    changeAgent(agents[next].id);
    (
      event.currentTarget.parentElement?.children[next] as HTMLElement | undefined
    )?.focus();
  }
  function onCallsKeyDown(event: KeyboardEvent<HTMLOListElement>) {
    const reversed = [...calls].reverse(),
      index = reversed.findIndex((call) => call === selectedCall),
      next =
        event.key === "ArrowDown"
          ? index + 1
          : event.key === "ArrowUp"
            ? index - 1
            : event.key === "Home"
              ? 0
              : event.key === "End"
                ? reversed.length - 1
                : -1;
    if (next < 0 || next >= reversed.length) return;
    event.preventDefault();
    selectCall(reversed[next].id);
    event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }
  return {
    selectedAgent,
    openToolId,
    selectedCall,
    draft,
    setDraft,
    backRef,
    stageRef,
    panelRef,
    closing,
    stageWidth,
    narrow,
    tabsRef,
    moreTabs,
    updateTabOverflow,
    changeAgent,
    access,
    selectedTool,
    allowedCount,
    callCount,
    runningCount,
    lastRunningCount,
    closePanel,
    layout,
    calls,
    draftValid,
    replay,
    openTool,
    selectCall,
    onAgentKeyDown,
    onCallsKeyDown,
    panelHeight: narrow ? 460 : Math.max(layout.height, 320),
  };
}
function AccessDiagram({
  controller,
  prefix,
}: {
  controller: ToolAccessController;
  prefix: string;
}) {
  const {
    selectedAgent,
    openToolId,
    closing,
    narrow,
    stageWidth,
    layout,
    openTool,
    access,
  } = controller;
  const { tools, width, height, centerX, centerY, leftCount } = layout;
  if (!selectedAgent) return <p className={`${prefix}__empty`}>No agents yet</p>;
  return (
    <div
      className={`${prefix}__map`}
      inert={openToolId ? true : undefined}
      aria-hidden={openToolId && !closing ? true : undefined}
    >
      {!narrow && stageWidth > 0 && (
        <svg
          className={`${prefix}__lines`}
          width={width}
          height={height}
          aria-hidden="true"
        >
          <g>
            {tools.map((entry) => (
              <path
                className={`${prefix}__base`}
                d={entry.path}
                pathLength={1}
                key={entry.tool.id}
              />
            ))}
          </g>
          <g key={`${selectedAgent.id}:fill`}>
            {tools
              .filter((entry) => entry.state !== "blocked")
              .map((entry) => {
                const style: AccessStyle = { [`--${prefix}-k`]: entry.index };
                return (
                  <path
                    className={`${prefix}__line`}
                    d={entry.path}
                    pathLength={1}
                    style={style}
                    key={entry.tool.id}
                  />
                );
              })}
            {tools
              .filter((entry) => entry.state === "running")
              .map((entry) => {
                const style: AccessStyle = { [`--${prefix}-k`]: entry.index };
                return (
                  <g data-state={entry.state} style={style} key={entry.tool.id}>
                    <path
                      className={`${prefix}__line ${prefix}__line--top`}
                      d={entry.path}
                      pathLength={1}
                    />
                    {entry.state === "running" &&
                      glints.map(([length, opacity]) => {
                        const glintStyle: AccessStyle = {
                          [`--${prefix}-l`]: length,
                          opacity,
                        };
                        return (
                          <path
                            className={`${prefix}__glint`}
                            d={entry.path}
                            pathLength={1}
                            style={glintStyle}
                            key={length}
                          />
                        );
                      })}
                  </g>
                );
              })}
          </g>
          {leftCount > 0 && (
            <circle
              className={`${prefix}__joint`}
              data-on={
                tools.some((entry) => entry.left && entry.state !== "blocked")
                  ? ""
                  : undefined
              }
              cx={centerX - 100}
              cy={centerY}
              r="3"
            />
          )}
          {access.length > leftCount && (
            <circle
              className={`${prefix}__joint`}
              data-on={
                tools.some((entry) => !entry.left && entry.state !== "blocked")
                  ? ""
                  : undefined
              }
              cx={centerX + 100}
              cy={centerY}
              r="3"
            />
          )}
        </svg>
      )}
      <div
        className={`${prefix}__card`}
        data-status={selectedAgent.status}
        style={narrow ? undefined : { left: centerX - 100, top: centerY }}
      >
        <div className={`${prefix}__card-body`} key={selectedAgent.id}>
          <div className={`${prefix}__card-top`}>
            <span
              className={`${prefix}__avatar`}
              data-logo={selectedAgent.avatar ? "" : undefined}
            >
              {selectedAgent.avatar ?? initials(selectedAgent.name)}
            </span>
            <span className={`${prefix}__who`}>
              <span className={`${prefix}__name`} dir="auto" title={selectedAgent.name}>
                {selectedAgent.name}
              </span>
              {selectedAgent.model && (
                <span className={`${prefix}__model`} title={selectedAgent.model}>
                  {selectedAgent.model}
                </span>
              )}
            </span>
            <span className={`${prefix}__status`} data-status={selectedAgent.status}>
              {selectedAgent.status === "running" && <SpinnerIcon prefix={prefix} />}
              {statusLabels[selectedAgent.status ?? ""]}
            </span>
          </div>
          {selectedAgent.task && (
            <p className={`${prefix}__task`} dir="auto" title={selectedAgent.task}>
              {selectedAgent.task}
            </p>
          )}
        </div>
      </div>
      {access.length === 0 && <p className={`${prefix}__none`}>No tools</p>}
      <div className={`${prefix}__tools`}>
        {tools.map((entry, index) => {
          const lastCall = entry.calls.at(-1),
            blocked = entry.state === "blocked";
          const style: AccessStyle = {
            [`--${prefix}-k`]: narrow ? index : entry.index,
            [`--${prefix}-from`]: entry.left ? "-14px 0" : "14px 0",
            ...(narrow ? null : { left: entry.x, top: entry.top }),
          };
          const label = blocked
            ? `${entry.tool.name}, no access`
            : `${entry.tool.name}, ${entry.state === "idle" ? "not used yet" : entry.state === "used" ? "used" : entry.state}, ${plural(entry.calls.length, "call")} – open its calls`;
          return (
            <button
              type="button"
              className={`${prefix}__tool`}
              data-tool={entry.tool.id}
              data-state={entry.state}
              style={style}
              aria-disabled={blocked ? true : undefined}
              tabIndex={blocked ? -1 : undefined}
              aria-label={label}
              onClick={() => {
                if (!blocked) openTool(entry.tool.id);
              }}
              key={entry.tool.id}
            >
              <span className={`${prefix}__tool-top`}>
                <span className={`${prefix}__tile`}>
                  {entry.tool.icon ?? initials(entry.tool.name).slice(0, 1)}
                </span>
                <span
                  className={`${prefix}__tool-name`}
                  dir="auto"
                  title={entry.tool.name}
                >
                  {entry.tool.name}
                </span>
                {entry.calls.length > 0 && (
                  <span className={`${prefix}__count`}>
                    {entry.calls.length}
                    {"×"}
                  </span>
                )}
              </span>
              <span className={`${prefix}__tool-meta`}>
                {entry.state === "running" ? (
                  <span className={`${prefix}__badge`} data-kind="running">
                    Running
                  </span>
                ) : entry.state === "failed" ? (
                  <span className={`${prefix}__badge`} data-kind="failed">
                    Failed
                  </span>
                ) : entry.state === "used" ? (
                  `Last call ${lastCall?.duration === undefined ? "done" : formatDuration(lastCall.duration)}`
                ) : blocked ? (
                  "No access"
                ) : (
                  "Not used yet"
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
function ToolCallPanel({
  controller,
  prefix,
  formatTime,
  canReplay,
}: {
  controller: ToolAccessController;
  prefix: string;
  formatTime: (ms: number) => string;
  canReplay: boolean;
}) {
  const {
    selectedTool,
    selectedAgent,
    panelRef,
    backRef,
    closePanel,
    calls,
    onCallsKeyDown,
    selectedCall,
    selectCall,
    draft,
    draftValid,
    setDraft,
    replay,
  } = controller;
  if (!selectedTool || !selectedAgent) return null;
  const tool = selectedTool.tool;
  return (
    <section
      ref={panelRef}
      className={`${prefix}__panel`}
      aria-label={`Calls to ${tool.name}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closePanel();
        }
      }}
    >
      <div className={`${prefix}__panel-head`}>
        <button
          ref={backRef}
          type="button"
          className={`${prefix}__back`}
          onClick={closePanel}
          aria-label="Back to the map"
        >
          <BackIcon />
        </button>
        <span className={`${prefix}__tile`}>
          {tool.icon ?? initials(tool.name).slice(0, 1)}
        </span>
        <span className={`${prefix}__panel-name`} dir="auto">
          {tool.name}
        </span>
        {tool.description && (
          <span className={`${prefix}__panel-desc`} dir="auto" title={tool.description}>
            {tool.description}
          </span>
        )}
        <span className={`${prefix}__panel-sum`}>{plural(calls.length, "call")}</span>
      </div>
      {calls.length === 0 ? (
        <p className={`${prefix}__empty`}>
          {selectedAgent.name}
          {" hasn't called it yet"}
        </p>
      ) : (
        <div className={`${prefix}__panel-body`}>
          <ol
            className={`${prefix}__calls`}
            aria-label="Calls"
            onKeyDown={onCallsKeyDown}
          >
            {[...calls].reverse().map((call) => (
              <li key={call.id}>
                <button
                  type="button"
                  className={`${prefix}__call`}
                  aria-pressed={call === selectedCall}
                  tabIndex={call === selectedCall ? 0 : -1}
                  onClick={() => selectCall(call.id)}
                >
                  <CallIcon status={call.status} prefix={prefix} />
                  <span
                    className={`${prefix}__call-text`}
                    title={summarizeInput(call.input)}
                  >
                    {summarizeInput(call.input)}
                  </span>
                  {call.replay && <span className={`${prefix}__chip`}>Replay</span>}
                  <span className={`${prefix}__call-time`}>
                    {call.status === "running"
                      ? "…"
                      : call.duration === undefined
                        ? call.at === undefined
                          ? ""
                          : formatTime(call.at)
                        : formatDuration(call.duration)}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          {selectedCall && (
            <div className={`${prefix}__detail`} key={selectedCall.id}>
              <div className={`${prefix}__label`}>
                {"Input"}
                {selectedCall.at !== undefined && (
                  <span className={`${prefix}__label-meta`}>
                    {formatTime(selectedCall.at)}
                  </span>
                )}
              </div>
              {draft === null ? (
                <pre className={`${prefix}__code`}>{formatValue(selectedCall.input)}</pre>
              ) : (
                <textarea
                  className={`${prefix}__code ${prefix}__edit`}
                  value={draft}
                  spellCheck={false}
                  aria-label="Input to replay with"
                  aria-invalid={!draftValid}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                      event.preventDefault();
                      replay();
                    }
                    if (event.key === "Escape") {
                      event.preventDefault();
                      event.stopPropagation();
                      setDraft(null);
                    }
                  }}
                  autoFocus
                />
              )}
              <div className={`${prefix}__label`}>
                {selectedCall.status === "failed" ? "Error" : "Output"}
                {selectedCall.duration !== undefined && (
                  <span className={`${prefix}__label-meta`}>
                    {formatDuration(selectedCall.duration)}
                  </span>
                )}
              </div>
              {selectedCall.status === "running" ? (
                <p className={`${prefix}__code ${prefix}__waiting`}>
                  Waiting for the result
                </p>
              ) : (
                <pre
                  className={`${prefix}__code`}
                  data-error={selectedCall.status === "failed" ? "" : undefined}
                >
                  {selectedCall.status === "failed"
                    ? (selectedCall.error ?? formatValue(selectedCall.output) ?? "Failed")
                    : formatValue(selectedCall.output) || "No output"}
                </pre>
              )}
              {canReplay && (
                <div className={`${prefix}__actions`}>
                  {draft !== null && !draftValid && (
                    <span className={`${prefix}__invalid`}>Not valid JSON</span>
                  )}
                  {draft === null ? (
                    <button
                      type="button"
                      className={`${prefix}__btn`}
                      onClick={() => setDraft(formatValue(selectedCall.input))}
                      disabled={selectedCall.status === "running"}
                    >
                      Edit input
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`${prefix}__btn`}
                      onClick={() => setDraft(null)}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    className={`${prefix}__btn ${prefix}__btn--primary`}
                    onClick={replay}
                    disabled={!draftValid || selectedCall.status === "running"}
                  >
                    <ReplayIcon />
                    {draft === null ? "Replay" : "Run"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
function ToolAccessMapView({
  clean = false,
  ...props
}: ToolAccessMapProps & {
  clean?: boolean;
}) {
  const {
    agents,
    formatTime = formatTime_access_model,
    title = "Tool access",
    className,
    onReplay,
  } = props;
  const prefix = clean ? "ui-tamc" : "ui-tam";
  const controller = useToolAccess(props, clean);
  const {
    selectedAgent,
    narrow,
    runningCount,
    lastRunningCount,
    allowedCount,
    access,
    callCount,
    tabsRef,
    moreTabs,
    updateTabOverflow,
    changeAgent,
    onAgentKeyDown,
    stageRef,
    openToolId,
    panelHeight,
    layout,
  } = controller;
  const stageStyle: AccessStyle = {
    [`--${prefix}-map-h`]: `${openToolId ? panelHeight : layout.height}px`,
  };
  const body = (
    <>
      {agents.length > 1 && (
        <div
          className={`${prefix}__agents`}
          role="tablist"
          aria-label="Agents"
          ref={tabsRef}
          data-more={moreTabs ? "" : undefined}
          onScroll={updateTabOverflow}
        >
          {agents.map((agent, index) => {
            const selected = agent.id === selectedAgent?.id;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                className={`${prefix}__agent-tab`}
                onClick={() => changeAgent(agent.id)}
                onKeyDown={(event) => onAgentKeyDown(event, index)}
                key={agent.id}
              >
                <span
                  className={`${prefix}__tab-avatar`}
                  data-logo={agent.avatar ? "" : undefined}
                >
                  {agent.avatar ?? initials(agent.name)}
                </span>
                <span className={`${prefix}__tab-name`} dir="auto" title={agent.name}>
                  {agent.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div
        ref={stageRef}
        className={`${prefix}__stage`}
        role="tabpanel"
        aria-label={selectedAgent ? `Tools of ${selectedAgent.name}` : undefined}
        style={stageStyle}
      >
        <AccessDiagram controller={controller} prefix={prefix} />
        <ToolCallPanel
          controller={controller}
          prefix={prefix}
          formatTime={formatTime}
          canReplay={Boolean(onReplay)}
        />
      </div>
    </>
  );
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      data-narrow={narrow ? "" : undefined}
    >
      <header className={`${prefix}__head`}>
        <span className={`${prefix}__mark`}>
          <ToolsIcon />
        </span>
        <span className={`${prefix}__title`} dir="auto">
          {title}
        </span>
        <span
          className={`${prefix}__live`}
          data-on={runningCount > 0 ? "" : undefined}
          aria-hidden={runningCount > 0 ? undefined : true}
        >
          <SpinnerIcon prefix={prefix} />
          {Math.max(runningCount, lastRunningCount.current)}
          <span className={`${prefix}__live-word`}>{" running"}</span>
        </span>
        <span className={`${prefix}__sum`} aria-live="polite">
          <span className={`${prefix}__sum-tools`}>
            {allowedCount}
            {"/"}
            {plural(access.length, "tool")}
          </span>
          <span className={`${prefix}__sum-calls`}>
            <span className={`${prefix}__sum-dot`}>{"· "}</span>
            {plural(callCount, "call")}
          </span>
        </span>
      </header>
      {clean ? body : <div className={`${prefix}__body`}>{body}</div>}
    </div>
  );
}
const statusLabels: Record<string, string> = {
  queued: "Queued",
  running: "Running",
  waiting: "Needs you",
  done: "Done",
  failed: "Failed",
};
const glints = [
  [0.28, 0.25],
  [0.16, 0.5],
  [0.07, 1],
] as const;
const pad = (value: number) => String(value).padStart(2, "0");
const panelFrame: Keyframe = {
  top: "8px",
  right: "0px",
  bottom: "0px",
  left: "0px",
  borderRadius: "12px",
};
export { ToolAccessMap };
export type { AgentStatus };
export type { MapAgent };
export type { AccessTool };
export type { ToolCall };
export type { ToolAccessMapProps };
