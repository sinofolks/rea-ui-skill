"use client";

import "./RootCauseTree.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
type CauseStatus = "open" | "checking" | "ruled-out" | "confirmed";
interface Cause {
  id?: string;
  name?: string;
  label?: string;
  title?: string;
  status?: CauseStatus;
  icon?: ReactNode;
  children?: Cause[];
  gate?: "and" | "or";
  files?: string[];
  at?: number;
  verdict?: string;
  evidence?: {
    kind: string;
    source?: string;
    content?: string;
  };
  [field: string]: unknown;
}
interface RootCauseTreeProps {
  failure: Cause & {
    detail?: string;
  };
  onAction?: (cause: Cause, action: "fix" | "retry") => void;
  formatTime?: (ms: number) => string;
  title?: string;
  className?: string;
}
interface CauseNode {
  cause: Cause;
  depth: number;
  centerX: number;
  top: number;
  width: number;
  parent?: CauseNode;
  children: CauseNode[];
  onConfirmedPath: boolean;
}
type CauseStyle = CSSProperties & {
  [key: `--ui-${string}`]: string | number;
};
interface CauseCardProps {
  node: CauseNode;
  prefix: string;
  clean: boolean;
  narrow: boolean;
  offsetX: number;
  causeFound: boolean;
  investigating: boolean;
  detail?: string;
  selectedNode: CauseNode;
  focusedNode: CauseNode;
  selectedId: string | null | undefined;
  setFocusedId: (id: string | undefined) => void;
  toggleNode: (node: CauseNode) => void;
  formatTime: (time: number) => string;
}
function RootCauseTree(props: RootCauseTreeProps) {
  return <RootCauseTreeView {...props} clean={true} />;
}
function formatElapsed(milliseconds: number): string {
  const seconds = Math.max(0, Math.round(milliseconds / 1000));
  const pad = (value: number) => String(value).padStart(2, "0");
  return seconds >= 3600
    ? `${Math.floor(seconds / 3600)}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`
    : `${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;
}
function hypothesisCount(count: number): string {
  return `${count} ${count === 1 ? "hypothesis" : "hypotheses"}`;
}
function hypothesisSummary(total: number, ruledOut: number, narrow: boolean): string {
  if (!total) return "No hypotheses yet";
  return narrow
    ? `${ruledOut}/${total} ruled out`
    : `${hypothesisCount(total)} · ${ruledOut} ruled out`;
}
function measureTitle(title: string, root: boolean): number {
  const key = `${Number(root)}${title}`;
  const cached = measuredTitles.get(key);
  if (cached !== undefined) return cached;
  if (measurementContext === undefined)
    measurementContext =
      typeof document !== "undefined"
        ? document.createElement("canvas").getContext("2d")
        : null;
  let width = title.length * 7.4;
  if (measurementContext) {
    measurementContext.font =
      '500 13px Inter, InterVariable, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
    width = measurementContext.measureText(title).width;
  }
  measuredTitles.set(key, width);
  return width;
}
function countLeaves(cause: Cause): number {
  return cause.children?.length
    ? cause.children.reduce((count, child) => count + countLeaves(child), 0)
    : 1;
}
function causeStatus(node: CauseNode) {
  return node.cause.status ?? "open";
}
function isRootCause(node: CauseNode): boolean {
  return causeStatus(node) === "confirmed" && !node.children.length;
}
function layoutCauses(failure: Cause, availableWidth = 0) {
  const levelWidths: number[] = [];
  function measureLevel(cause: Cause, depth: number) {
    const width = Math.min(
      depth === 0 ? MAX_FAILURE_WIDTH : MAX_CAUSE_WIDTH,
      Math.ceil(
        measureTitle(cause.title ?? "", depth === 0) +
          (cause.icon ? ICON_TEXT_PADDING : 22),
      ),
    );
    levelWidths[depth] = Math.max(
      levelWidths[depth] ?? 0,
      width,
      depth === 0 ? MIN_FAILURE_WIDTH : MIN_CAUSE_WIDTH,
    );
    for (const child of cause.children ?? []) measureLevel(child, depth + 1);
  }
  measureLevel(failure, 0);
  const widestCause = Math.max(...levelWidths.slice(1));
  const causeWidth = availableWidth
    ? Math.max(
        MIN_CAUSE_WIDTH,
        Math.min(availableWidth, Math.max(DEFAULT_CAUSE_WIDTH, widestCause)),
      )
    : widestCause;
  for (let depth = 1; depth < levelWidths.length; depth++)
    levelWidths[depth] = causeWidth;
  const subtreeWidths = new Map<Cause, number>();
  function measureSubtree(cause: Cause, depth: number): number {
    const children = cause.children ?? [];
    const childrenWidth =
      children.reduce((sum, child) => sum + measureSubtree(child, depth + 1), 0) +
      Math.max(0, children.length - 1) * SIBLING_GAP;
    const width = Math.max(levelWidths[depth], childrenWidth);
    subtreeWidths.set(cause, width);
    return width;
  }
  const width = measureSubtree(failure, 0);
  const nodes: CauseNode[] = [];
  function placeNode(
    cause: Cause,
    depth: number,
    left: number,
    parent?: CauseNode,
  ): CauseNode {
    const subtreeWidth = subtreeWidths.get(cause)!;
    const node: CauseNode = {
      cause,
      depth,
      centerX: left + subtreeWidth / 2,
      top: depth * (CARD_HEIGHT + LEVEL_GAP),
      width: levelWidths[depth],
      parent,
      children: [],
      onConfirmedPath: false,
    };
    nodes.push(node);
    const children = cause.children ?? [];
    const childrenWidth =
      children.reduce((sum, child) => sum + subtreeWidths.get(child)!, 0) +
      Math.max(0, children.length - 1) * SIBLING_GAP;
    let childLeft = left + (subtreeWidth - childrenWidth) / 2;
    for (const child of children) {
      node.children.push(placeNode(child, depth + 1, childLeft, node));
      childLeft += subtreeWidths.get(child)! + SIBLING_GAP;
    }
    return node;
  }
  const root = placeNode(failure, 0, 0);
  for (const node of nodes) {
    if (causeStatus(node) === "confirmed" && node.depth !== 0) {
      for (
        let ancestor: CauseNode | undefined = node;
        ancestor;
        ancestor = ancestor.parent
      )
        ancestor.onConfirmedPath = true;
    }
  }
  return {
    nodes,
    root,
    width,
    height: levelWidths.length * (CARD_HEIGHT + LEVEL_GAP) - LEVEL_GAP,
  };
}
function causeConnector(node: CauseNode): string {
  const parent = node.parent!;
  const startX = node.centerX;
  const startY = node.top;
  const endX = parent.centerX;
  const endY = parent.top + CARD_HEIGHT;
  const junctionY = endY + LEVEL_GAP * 0.62;
  if (Math.abs(startX - endX) < 1) return `M${startX} ${startY}V${endY}`;
  const direction = Math.sign(endX - startX);
  const radius = Math.min(
    CORNER_RADIUS,
    Math.abs(endX - startX) / 2,
    startY - junctionY,
    junctionY - endY,
  );
  return `M${startX} ${startY}V${junctionY + radius}Q${startX} ${junctionY} ${startX + direction * radius} ${junctionY}H${endX - direction * radius}Q${endX} ${junctionY} ${endX} ${junctionY - radius}V${endY}`;
}
function TreeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 5.2v2.3M4 10.5V8.6h8v1.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      <rect x="5.4" y="1.6" width="5.2" height="3.6" rx="1.2" fill="currentColor" />
      <circle cx="4" cy="12.4" r="1.9" fill="currentColor" />
      <circle cx="12" cy="12.4" r="1.9" fill="currentColor" />
    </svg>
  );
}
function CheckingIcon({ prefix }: { prefix: string }) {
  return (
    <svg
      className={`${prefix}__spin`}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M12 3.5A8.5 8.5 0 0 1 20.5 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}
function StatusIcon({ status, prefix }: { status: CauseStatus; prefix: string }) {
  if (status === "checking") return <CheckingIcon prefix={prefix} />;
  if (status === "ruled-out")
    return (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    );
  if (status === "confirmed")
    return (
      <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" fill="currentColor" />
      </svg>
    );
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}
function FailureIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M12 9V13" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
      <path
        d="M12 16.8V17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.6"
      />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.4 1.9c0-.55.45-1 1-1h3.4l2.8 2.8v6.4c0 .55-.45 1-1 1H3.4c-.55 0-1-.45-1-1Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path d="M6.8.9v1.9c0 .5.4.9.9.9h1.9Z" fill="currentColor" />
    </svg>
  );
}
function FileSummary({ files, prefix }: { files: string[]; prefix: string }) {
  const filename = files[0].split("/").filter(Boolean).pop() ?? files[0];
  return (
    <>
      <span className={`${prefix}__file`} title={files.join("\n")}>
        <FileIcon />
        <span className={`${prefix}__file-name`}>{filename}</span>
      </span>
      {files.length > 1 && (
        <span className={`${prefix}__file-more`}>
          {"+"}
          {files.length - 1}
        </span>
      )}
    </>
  );
}
function CauseCard({
  node,
  prefix,
  clean,
  narrow,
  offsetX,
  causeFound,
  investigating,
  detail,
  selectedNode,
  focusedNode,
  selectedId,
  setFocusedId,
  toggleNode,
  formatTime,
}: CauseCardProps) {
  const status = causeStatus(node);
  const root = node.depth === 0;
  const label = root
    ? `${node.cause.title}, failed${causeFound ? ", root cause found" : investigating ? ", investigating" : ""}`
    : `${node.cause.title}, ${isRootCause(node) ? "root cause" : statusLabels[status].toLowerCase()}${node.children.length ? `, ${(node.cause.gate ?? "or") === "and" ? "all" : "any"} of ${node.children.length} below` : ""}`;
  const style: CauseStyle = narrow
    ? { [`--${prefix}-depth`]: node.depth }
    : {
        left: offsetX + node.centerX - node.width / 2,
        top: node.top,
        width: node.width,
      };
  const contents = (
    <>
      <span className={`${prefix}__card-top`}>
        {node.cause.icon && <span className={`${prefix}__tile`}>{node.cause.icon}</span>}
        <span className={`${prefix}__name`} dir="auto" title={node.cause.title}>
          {node.cause.title}
        </span>
        {narrow && node.children.length > 0 && (
          <span className={`${prefix}__gate ${prefix}__gate--inline`}>
            {(node.cause.gate ?? "or").toUpperCase()}
          </span>
        )}
      </span>
      <span className={`${prefix}__files`}>
        {node.cause.files?.length ? (
          <FileSummary files={node.cause.files} prefix={prefix} />
        ) : null}
      </span>
    </>
  );
  return (
    <div
      role="treeitem"
      aria-level={node.depth + 1}
      aria-setsize={node.parent ? node.parent.children.length : 1}
      aria-posinset={node.parent ? node.parent.children.indexOf(node) + 1 : 1}
      aria-selected={selectedNode === node}
      aria-label={label}
      tabIndex={focusedNode === node ? 0 : -1}
      data-id={node.cause.id}
      data-status={root ? "failed" : status}
      data-root={root ? "" : undefined}
      data-path={node.onConfirmedPath ? "" : undefined}
      data-dim={selectedId && selectedId !== node.cause.id ? "" : undefined}
      className={`${prefix}__card`}
      style={style}
      onFocus={() => setFocusedId(node.cause.id)}
      onClick={() => toggleNode(node)}
    >
      {clean ? contents : <span className={`${prefix}__card-in`}>{contents}</span>}
      <span className={`${prefix}__meta`}>
        <span className={`${prefix}__glyph`}>
          {root ? <FailureIcon /> : <StatusIcon status={status} prefix={prefix} />}
        </span>
        {root ? (
          <>
            <span className={`${prefix}__badge`} data-kind="failed">
              Failed
            </span>
            <span className={`${prefix}__detail`} dir="auto">
              {detail}
            </span>
            {causeFound ? (
              <span
                className={`${prefix}__badge`}
                data-kind="found"
                children="Cause found"
                key="found"
              />
            ) : investigating ? (
              <span className={`${prefix}__state ${prefix}__state--live`}>
                Investigating
              </span>
            ) : null}
          </>
        ) : isRootCause(node) ? (
          <span
            className={`${prefix}__badge`}
            data-kind="root"
            children="Root cause"
            key="root"
          />
        ) : (
          <span className={`${prefix}__state`} data-status={status}>
            {statusLabels[status]}
            {status !== "open" &&
              status !== "checking" &&
              node.cause.at !== undefined &&
              ` · ${formatTime(node.cause.at)}`}
          </span>
        )}
      </span>
    </div>
  );
}
function useCauseTree({ failure }: RootCauseTreeProps) {
  const treeRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useLayoutEffect(() => {
    const tree = treeRef.current;
    if (!tree) return;
    setContainerWidth(tree.clientWidth);
    const observer = new ResizeObserver(() => setContainerWidth(tree.clientWidth));
    observer.observe(tree);
    return () => observer.disconnect();
  }, []);
  const leafCount = Math.max(1, countLeaves(failure));
  const { nodes, root, width, height } = layoutCauses(
    failure,
    containerWidth
      ? Math.floor((containerWidth - (leafCount - 1) * SIBLING_GAP) / leafCount)
      : 0,
  );
  const narrow = containerWidth > 0 && containerWidth < width;
  const offsetX = Math.max(0, ((containerWidth || width) - width) / 2);
  const hypotheses = nodes.filter((node) => node.depth > 0);
  const ruledOutCount = hypotheses.filter(
    (node) => causeStatus(node) === "ruled-out",
  ).length;
  const investigating = hypotheses.some((node) => causeStatus(node) === "checking");
  const confirmedLeaves = hypotheses.filter(isRootCause);
  const causeFound = root.children.some((node) => causeStatus(node) === "confirmed");
  const [selectedId, setSelectedId] = useState<string | null | undefined>(null);
  const selectedNode =
    nodes.find((node) => node.cause.id === selectedId) ??
    hypotheses.find((node) => causeStatus(node) === "checking") ??
    confirmedLeaves[0] ??
    root;
  const [focusedId, setFocusedId] = useState<string | null | undefined>(null);
  const focusedNode = nodes.find((node) => node.cause.id === focusedId) ?? root;
  function focusNode(node: CauseNode) {
    setFocusedId(node.cause.id);
    treeRef.current
      ?.querySelector<HTMLElement>(`[data-id="${CSS.escape(String(node.cause.id))}"]`)
      ?.focus();
  }
  function toggleNode(node: CauseNode) {
    setSelectedId(selectedId === node.cause.id ? null : node.cause.id);
  }
  function onTreeKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = nodes.indexOf(focusedNode);
    const sameLevel = nodes
      .filter((node) => node.depth === focusedNode.depth)
      .sort((first, second) => first.centerX - second.centerX);
    const levelIndex = sameLevel.indexOf(focusedNode);
    let nextNode: CauseNode | undefined;
    if (event.key === "ArrowDown")
      nextNode = narrow ? nodes[index + 1] : focusedNode.children[0];
    else if (event.key === "ArrowUp")
      nextNode = narrow ? nodes[index - 1] : focusedNode.parent;
    else if (event.key === "ArrowRight")
      nextNode = narrow ? focusedNode.children[0] : sameLevel[levelIndex + 1];
    else if (event.key === "ArrowLeft")
      nextNode = narrow ? focusedNode.parent : sameLevel[levelIndex - 1];
    else if (event.key === "Home") nextNode = nodes[0];
    else if (event.key === "End") nextNode = nodes[nodes.length - 1];
    else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleNode(focusedNode);
      return;
    } else if (event.key === "Escape" && selectedId) {
      event.preventDefault();
      setSelectedId(null);
      return;
    }
    if (nextNode) {
      event.preventDefault();
      focusNode(nextNode);
    }
  }
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState<number>();
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    setPanelHeight(panel.offsetHeight);
    const observer = new ResizeObserver(() => setPanelHeight(panel.offsetHeight));
    observer.observe(panel);
    return () => observer.disconnect();
  }, [selectedNode.cause.id]);
  return {
    treeRef,
    containerWidth,
    nodes,
    root,
    width,
    height,
    narrow,
    offsetX,
    hypotheses,
    ruledOutCount,
    investigating,
    causeFound,
    selectedId,
    selectedNode,
    focusedNode,
    setFocusedId,
    toggleNode,
    onTreeKeyDown,
    panelRef,
    panelHeight,
  };
}
function RootCauseTreeView({
  clean = false,
  ...props
}: RootCauseTreeProps & {
  clean?: boolean;
}) {
  const {
    failure,
    onAction,
    formatTime = formatElapsed,
    title = "Root cause",
    className,
  } = props;
  const prefix = clean ? "ui-rctc" : "ui-rct";
  const {
    treeRef,
    containerWidth,
    nodes,
    root,
    height,
    narrow,
    offsetX,
    hypotheses,
    ruledOutCount,
    investigating,
    causeFound,
    selectedId,
    selectedNode,
    focusedNode,
    setFocusedId,
    toggleNode,
    onTreeKeyDown,
    panelRef,
    panelHeight,
  } = useCauseTree(props);
  const selectedStatus = causeStatus(selectedNode);
  const selectedCause = selectedNode.cause;
  const panelContents = (
    <>
      {selectedCause.verdict ? (
        <p className={`${prefix}__verdict`} dir="auto">
          {selectedCause.verdict}
        </p>
      ) : (
        <p className={`${prefix}__verdict ${prefix}__verdict--quiet`}>
          {selectedNode === root
            ? causeFound
              ? ""
              : hypotheses.length
                ? `${hypothesisCount(hypotheses.length)} to check.`
                : "No hypotheses yet."
            : selectedStatus === "checking"
              ? "Checking this now…"
              : "Not checked yet."}
        </p>
      )}
      {selectedCause.files?.length ? (
        <ul className={`${prefix}__panel-files`} aria-label="Files">
          {selectedCause.files.map((file, index) => (
            <li className={`${prefix}__file`} title={file} key={`${index}:${file}`}>
              <FileIcon />
              <span className={`${prefix}__file-name`} dir="auto">
                {file}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {selectedCause.evidence && (
        <div className={`${prefix}__evidence`}>
          <span className={`${prefix}__label`}>
            {selectedCause.evidence.kind}
            {selectedCause.evidence.source && (
              <span className={`${prefix}__source`}>{selectedCause.evidence.source}</span>
            )}
          </span>
          <pre
            className={`${prefix}__code`}
            tabIndex={0}
            aria-label={selectedCause.evidence.kind}
          >
            {selectedCause.evidence.content}
          </pre>
        </div>
      )}
    </>
  );
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      data-narrow={narrow ? "" : undefined}
    >
      <header className={`${prefix}__head`}>
        <span className={`${prefix}__mark`}>
          <TreeIcon />
        </span>
        <span className={`${prefix}__title`} dir="auto">
          {title}
        </span>
        <span
          className={`${prefix}__live`}
          data-on={investigating ? "" : undefined}
          aria-hidden={!investigating || undefined}
        >
          <CheckingIcon prefix={prefix} />
          Investigating
        </span>
        <span className={`${prefix}__sum`} aria-live="polite">
          {hypothesisSummary(hypotheses.length, ruledOutCount, narrow)}
        </span>
      </header>
      <div
        ref={treeRef}
        className={`${prefix}__tree`}
        role="tree"
        aria-label={`Why ${failure.title}`}
        style={narrow ? undefined : { height }}
        onKeyDown={onTreeKeyDown}
      >
        {!narrow && containerWidth > 0 && (
          <svg
            className={`${prefix}__lines`}
            width={containerWidth}
            height={height}
            aria-hidden="true"
          >
            {hypotheses.map((node) => (
              <path
                className={`${prefix}__line`}
                data-status={causeStatus(node)}
                d={causeConnector(node)}
                transform={`translate(${offsetX} 0)`}
                key={node.cause.id}
              />
            ))}
            {hypotheses
              .filter((node) => node.onConfirmedPath)
              .map((node) => {
                const style: CauseStyle = {
                  [`--${prefix}-step`]:
                    Math.max(...nodes.map((item) => item.depth)) - node.depth,
                };
                return (
                  <path
                    className={`${prefix}__line ${prefix}__line--path`}
                    d={causeConnector(node)}
                    pathLength={1}
                    transform={`translate(${offsetX} 0)`}
                    style={style}
                    key={`${node.cause.id}:path`}
                  />
                );
              })}
          </svg>
        )}
        {!narrow &&
          containerWidth > 0 &&
          nodes
            .filter((node) => node.children.length > 0)
            .map((node) => (
              <span
                className={`${prefix}__gate`}
                data-path={
                  node.children.some((child) => child.onConfirmedPath) ? "" : undefined
                }
                style={{
                  left: offsetX + node.centerX,
                  top: node.top + CARD_HEIGHT + LEVEL_GAP * 0.31,
                }}
                title={
                  (node.cause.gate ?? "or") === "and"
                    ? "All of these together"
                    : "Any one of these"
                }
                children={(node.cause.gate ?? "or").toUpperCase()}
                key={`${node.cause.id}:gate`}
              />
            ))}
        {(narrow || containerWidth > 0) &&
          nodes.map((node) => (
            <CauseCard
              node={node}
              prefix={prefix}
              clean={clean}
              narrow={narrow}
              offsetX={offsetX}
              causeFound={causeFound}
              investigating={investigating}
              detail={failure.detail}
              selectedNode={selectedNode}
              focusedNode={focusedNode}
              selectedId={selectedId}
              setFocusedId={setFocusedId}
              toggleNode={toggleNode}
              formatTime={formatTime}
              key={node.cause.id}
            />
          ))}
      </div>
      <section
        className={`${prefix}__panel`}
        aria-label="Evidence"
        aria-live="polite"
        data-status={selectedNode === root ? "failed" : selectedStatus}
        style={{ height: panelHeight }}
      >
        <div className={`${prefix}__panel-in`} ref={panelRef} key={selectedCause.id}>
          <div className={`${prefix}__panel-head`}>
            {selectedCause.icon ? (
              <span className={`${prefix}__tile`}>{selectedCause.icon}</span>
            ) : (
              <span className={`${prefix}__glyph`}>
                {selectedNode === root ? (
                  <FailureIcon />
                ) : (
                  <StatusIcon status={selectedStatus} prefix={prefix} />
                )}
              </span>
            )}
            <span className={`${prefix}__panel-name`} dir="auto">
              {selectedCause.title}
            </span>
            {selectedNode !== root && (
              <span className={`${prefix}__panel-meta`}>
                {isRootCause(selectedNode) ? "Root cause" : statusLabels[selectedStatus]}
                {selectedCause.at !== undefined &&
                  selectedStatus !== "open" &&
                  selectedStatus !== "checking" &&
                  ` · ${formatTime(selectedCause.at)}`}
              </span>
            )}
          </div>
          {clean ? (
            panelContents
          ) : (
            <div className={`${prefix}__panel-card`}>{panelContents}</div>
          )}
          {onAction && isRootCause(selectedNode) && (
            <div className={`${prefix}__actions`}>
              <button
                type="button"
                className={`${prefix}__btn`}
                onClick={() => onAction(selectedCause, "retry")}
              >
                Retry from here
              </button>
              <button
                type="button"
                className={`${prefix}__btn ${prefix}__btn--primary`}
                onClick={() => onAction(selectedCause, "fix")}
              >
                Fix it
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
const CARD_HEIGHT = 84;
const SIBLING_GAP = 12;
const LEVEL_GAP = 44;
const CORNER_RADIUS = 8;
const MIN_CAUSE_WIDTH = 150;
const DEFAULT_CAUSE_WIDTH = 184;
const MIN_FAILURE_WIDTH = 204;
const MAX_CAUSE_WIDTH = 232;
const MAX_FAILURE_WIDTH = 300;
const ICON_TEXT_PADDING = 47;
const statusLabels = {
  open: "Not checked",
  checking: "Checking",
  "ruled-out": "Ruled out",
  confirmed: "Confirmed",
};
const measuredTitles = new Map<string, number>();
let measurementContext: CanvasRenderingContext2D | null | undefined;
export { RootCauseTree };
export type { RootCauseTreeProps };
export type { Cause };
export type { CauseStatus };
