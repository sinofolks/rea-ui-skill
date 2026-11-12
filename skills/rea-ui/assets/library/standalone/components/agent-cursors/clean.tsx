"use client";

import "./AgentCursors.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import type * as React from "react";
import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
interface CursorAgent {
  id: string;
  name: string;
  avatar?: React.ReactNode;
  color?: string;
  tint?: string;
  cost?: number;
}
interface DocBlock {
  id: string;
  kind?: "paragraph" | "title" | "heading" | "item" | "code" | "image" | "table";
  text?: string;
  /** Image fields. Width is a fraction of the document width. */
  src?: string;
  alt?: string;
  loading?: boolean;
  width?: number;
  ratio?: number;
  float?: "left" | "right";
  /** A table's first row is its header; cells are addressable document blocks. */
  rows?: DocBlock[][];
  addRow?: boolean;
  tone?: string;
}
interface AgentCursor {
  block: string;
  /** UTF-16 character offset within the addressed block or insertion. */
  at?: number;
  /** Suggestion id when pointing inside a pending insertion. */
  in?: string;
  /** Number of characters to select from at. */
  select?: number;
  point?: "corner" | "center";
  press?: boolean;
  typing?: boolean;
  doing?: string;
}
interface DocSuggestion {
  id: string;
  agent: string;
  block: string;
  at: number;
  /** Number of existing characters removed from the block. */
  remove?: number;
  insert?: string;
  note?: string;
}
interface DocComment {
  id: string;
  agent: string;
  block: string;
  text: string;
  at?: number;
  /** Horizontal fraction used when no character anchor is provided. */
  x?: number;
  /** Vertical pixel offset from the anchor. */
  y?: number;
  open?: boolean;
}
interface AgentCursorsTab {
  id: string;
  label: string;
}
interface AgentCursorsProps {
  agents: CursorAgent[];
  blocks: DocBlock[];
  cursors: Record<string, AgentCursor | null>;
  suggestions?: DocSuggestion[];
  comments?: DocComment[];
  onResolveComment?: (comment: DocComment) => void;
  onReply?: (comment: DocComment, text: string) => void;
  onAccept?: (suggestion: DocSuggestion) => void;
  onReject?: (suggestion: DocSuggestion) => void;
  onAcceptAll?: () => void;
  following?: string | null;
  onFollowingChange?: (agentId: string | null) => void;
  height?: number;
  tabs?: AgentCursorsTab[];
  tab?: string;
  onTabChange?: (tabId: string) => void;
  formatCost?: (amount: number) => string;
  title?: string;
  className?: string;
}
interface AcceptedSuggestionResult {
  blocks: DocBlock[];
  suggestions: DocSuggestion[];
}
interface DocumentBox {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface CursorPosition {
  x: number;
  y: number;
  h: number;
  free?: boolean;
}
interface CommentPosition {
  x: number;
  y: number;
}
interface FigureSize {
  w: number;
  h: number;
}
type DocumentStyle = CSSProperties & {
  [variable: `--${string}`]: string | number | undefined;
};
type TextAnchor = [node: Text, offset: number];
interface ContentProps {
  props: AgentCursorsProps;
  prefix: string;
  measurements: ReturnType<typeof useDocumentMeasurements>;
  interaction: ReturnType<typeof useCursorInteractions>;
}
/** Live agent cursors, suggestions and comments anchored to document content. */
function AgentCursors(props: AgentCursorsProps) {
  return <AgentCursorsView {...props} clean={true} />;
}
function formatCursorCost(amount: number): string {
  return amount !== 0 && Math.abs(amount) < 0.005
    ? `${amount < 0 ? "-" : ""}<$0.01`
    : dollars.format(amount);
}
function finiteValue(value: number | undefined): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function agentInitial(name: string): string {
  return (name.match(/[\p{L}\p{N}]/u)?.[0] ?? "?").toUpperCase();
}
/** Apply one edit recursively, including table cells, then rebase later suggestions. */
function acceptSuggestion_document_model(
  blocks: DocBlock[],
  suggestions: DocSuggestion[],
  id: string,
): AcceptedSuggestionResult {
  const accepted = suggestions.find((suggestion) => suggestion.id === id);
  if (!accepted) return { blocks, suggestions };
  const { block: targetBlock, at: offset } = accepted;
  const removed = accepted.remove ?? 0,
    inserted = accepted.insert ?? "",
    shift = inserted.length - removed;
  function update(block: DocBlock): DocBlock {
    if (block.id === targetBlock)
      return {
        ...block,
        text:
          (block.text ?? "").slice(0, offset) +
          inserted +
          (block.text ?? "").slice(offset + removed),
      };
    return block.rows
      ? { ...block, rows: block.rows.map((row) => row.map(update)) }
      : block;
  }
  return {
    blocks: blocks.map(update),
    suggestions: suggestions
      .filter((suggestion) => suggestion.id !== id)
      .map((suggestion) =>
        suggestion.block === accepted.block && suggestion.at >= accepted.at + removed
          ? { ...suggestion, at: suggestion.at + shift }
          : suggestion,
      ),
  };
}
function firstText(element: Element | null | undefined): Text | null {
  const node = element?.firstChild;
  return node?.nodeType === Node.TEXT_NODE ? (node as Text) : null;
}
/** Resolve document offsets through the original text and pending insertion spans. */
function findTextAnchor(
  block: Element,
  offset: number,
  insertionId?: string,
): TextAnchor | null {
  if (insertionId) {
    const insertion = block.querySelector(`[data-ins="${CSS.escape(insertionId)}"]`);
    if (insertion) {
      const insertedText = firstText(insertion);
      if (insertedText)
        return [insertedText, Math.max(0, Math.min(offset, insertedText.length))];
      let previous = insertion.previousElementSibling;
      if (previous?.tagName === "WBR") previous = previous.previousElementSibling;
      const before = firstText(previous);
      if (before) return [before, before.length];
      const after = firstText(insertion.nextElementSibling);
      if (after) return [after, 0];
    }
  }
  let anchor: TextAnchor | null = null;
  for (const span of block.querySelectorAll<HTMLElement>("[data-from]")) {
    const text = firstText(span);
    if (!text) continue;
    const start = Number(span.dataset.from);
    if (offset >= start && offset <= start + text.length) {
      anchor = [text, offset - start];
      if (offset < start + text.length) break;
    }
  }
  return anchor;
}
function caretBounds(text: Text, offset: number): DOMRect | null {
  const range = document.createRange();
  if (!text.length) return null;
  if (offset < text.length) {
    range.setStart(text, offset);
    range.setEnd(text, offset + 1);
    return range.getClientRects()[0] ?? null;
  }
  range.setStart(text, offset - 1);
  range.setEnd(text, offset);
  const rectangles = range.getClientRects(),
    last = rectangles[rectangles.length - 1];
  return last ? new DOMRect(last.right, last.top, 0, last.height) : null;
}
function unchanged<T>(previous: T, next: T): T {
  return JSON.stringify(previous) === JSON.stringify(next) ? previous : next;
}
/** All overlays share stage-relative coordinates, even inside a scaled preview. */
function useDocumentMeasurements(
  { agents, cursors, comments = [] }: AgentCursorsProps,
  prefix: string,
) {
  const stageRef = useRef<HTMLDivElement>(null),
    sheetRef = useRef<HTMLDivElement>(null),
    flagRefs = useRef(new Map<string, HTMLSpanElement>());
  const [positions, setPositions] = useState<Record<string, CursorPosition>>({}),
    [selections, setSelections] = useState<Record<string, DocumentBox[]>>({}),
    [commentPositions, setCommentPositions] = useState<Record<string, CommentPosition>>(
      {},
    ),
    [commentHeights, setCommentHeights] = useState<Record<string, number>>({}),
    [figures, setFigures] = useState<Record<string, FigureSize>>({});
  const [stageWidth, setStageWidth] = useState(0),
    [sheetWidth, setSheetWidth] = useState(0),
    [stageHeight, setStageHeight] = useState(0),
    [rightBoundary, setRightBoundary] = useState(Infinity),
    [flagWidths, setFlagWidths] = useState<Record<string, number>>({});
  function measure() {
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect(),
      scale = stage.offsetWidth ? bounds.width / stage.offsetWidth : 1;
    const relative = (rect: DOMRect): DocumentBox => ({
      x: (rect.left - bounds.left) / scale,
      y: (rect.top - bounds.top) / scale,
      w: rect.width / scale,
      h: rect.height / scale,
    });
    const tenth = (value: number) => Math.round(value * 10) / 10;
    const nextPositions: Record<string, CursorPosition> = {},
      nextSelections: Record<string, DocumentBox[]> = {};
    for (const agent of agents) {
      const cursor = cursors[agent.id];
      if (!cursor) continue;
      const block = stage.querySelector<HTMLElement>(
        `[data-block="${CSS.escape(cursor.block)}"]`,
      );
      if (!block) continue;
      const image =
        block.dataset.kind === "image" ? block.querySelector(`.${prefix}__img`) : null;
      if (image) {
        const rect = relative(image.getBoundingClientRect());
        const position: CursorPosition =
          cursor.point === "corner"
            ? {
                x: tenth(rect.x + rect.w),
                y: tenth(rect.y + rect.h),
                h: 0,
                free: true,
              }
            : {
                x: tenth(rect.x + rect.w * 0.55),
                y: tenth(rect.y + rect.h * 0.5),
                h: 0,
                free: true,
              };
        nextPositions[agent.id] = position;
        if (cursor.point === "corner" && cursor.select) {
          const overlay = stage.querySelector<HTMLElement>(
            `[data-agent="${CSS.escape(agent.id)}"]`,
          );
          if (overlay)
            overlay.style.transform = `translate(${position.x}px, ${position.y}px)`;
        }
        continue;
      }
      const anchor = findTextAnchor(block, cursor.at ?? 0, cursor.in),
        caret = anchor ? caretBounds(...anchor) : null;
      if (caret) {
        const rect = relative(caret);
        nextPositions[agent.id] = {
          x: tenth(rect.x),
          y: tenth(rect.y),
          h: tenth(rect.h),
        };
      }
      if (cursor.select && !cursor.in) {
        const start = findTextAnchor(block, cursor.at ?? 0),
          end = findTextAnchor(block, (cursor.at ?? 0) + cursor.select);
        if (start && end) {
          const range = document.createRange();
          range.setStart(...start);
          range.setEnd(...end);
          const lines: DocumentBox[] = [];
          for (const rectangle of range.getClientRects()) {
            if (rectangle.width < 0.5) continue;
            const rect = relative(rectangle),
              line = lines.find((line) => Math.abs(line.y - rect.y) < 3);
            if (line) {
              const right = Math.max(line.x + line.w, rect.x + rect.w);
              line.x = Math.min(line.x, rect.x);
              line.w = right - line.x;
            } else lines.push(rect);
          }
          nextSelections[agent.id] = lines.map((rect) => ({
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            w: Math.round(rect.w),
            h: Math.round(rect.h),
          }));
        }
      }
    }
    const sheet = sheetRef.current
      ? relative(sheetRef.current.getBoundingClientRect())
      : { x: 0, w: stage.offsetWidth };
    const nextComments: Record<string, CommentPosition> = {};
    for (const comment of comments) {
      const block = stage.querySelector(`[data-block="${CSS.escape(comment.block)}"]`);
      if (!block) continue;
      const anchor = comment.at === undefined ? null : findTextAnchor(block, comment.at),
        caret = anchor ? caretBounds(...anchor) : null;
      if (caret) {
        const rect = relative(caret);
        nextComments[comment.id] = {
          x: Math.round(rect.x),
          y: Math.round(rect.y + 3 + (comment.y ?? 0)),
        };
        continue;
      }
      const rect = relative(block.getBoundingClientRect());
      nextComments[comment.id] = {
        x: Math.round(sheet.x + sheet.w * Math.max(0, Math.min(1, comment.x ?? 0.9))),
        y: Math.round(rect.y + (comment.y ?? 0)),
      };
    }
    const nextFigures: Record<string, FigureSize> = {};
    for (const figure of stage.querySelectorAll<HTMLElement>("figure[data-fit]")) {
      if (getComputedStyle(figure).float === "none") continue;
      const next = figure.nextElementSibling;
      if (next instanceof HTMLElement) {
        const range = document.createRange();
        range.selectNodeContents(next);
        const line = range.getClientRects()[0];
        if (line && line.top >= figure.getBoundingClientRect().bottom - 1) continue;
        if (figure.dataset.block)
          nextFigures[figure.dataset.block] = {
            w: Math.round(figure.offsetWidth),
            h: Math.max(48, Math.round(next.offsetHeight)),
          };
      }
    }
    const nextCommentHeights: Record<string, number> = {};
    for (const comment of comments) {
      const body = stage.querySelector<HTMLElement>(
        `[data-comment="${CSS.escape(comment.id)}"] .${prefix}__pin-body`,
      );
      if (body) nextCommentHeights[comment.id] = body.offsetHeight;
    }
    setPositions((previous) => unchanged(previous, nextPositions));
    setSelections((previous) => unchanged(previous, nextSelections));
    setCommentPositions((previous) => unchanged(previous, nextComments));
    setCommentHeights((previous) => unchanged(previous, nextCommentHeights));
    setFigures((previous) => unchanged(previous, nextFigures));
    setStageWidth(stage.offsetWidth);
    setSheetWidth(sheetRef.current?.offsetWidth ?? stage.offsetWidth);
    setStageHeight(stage.offsetHeight);
    let clippingParent = stage.parentElement;
    while (
      clippingParent &&
      clippingParent !== document.body &&
      getComputedStyle(clippingParent).overflowX === "visible"
    )
      clippingParent = clippingParent.parentElement;
    const right =
      clippingParent && clippingParent !== document.body
        ? clippingParent.getBoundingClientRect().right
        : window.innerWidth;
    setRightBoundary(Math.round((right - bounds.left) / scale));
    const nextFlagWidths: Record<string, number> = {};
    for (const [id, flag] of flagRefs.current) nextFlagWidths[id] = flag.offsetWidth;
    setFlagWidths((previous) => unchanged(previous, nextFlagWidths));
  }
  const latestMeasure = useRef(measure);
  latestMeasure.current = measure;
  useLayoutEffect(() => {
    for (const card of stageRef.current?.querySelectorAll<HTMLElement>(
      `.${prefix}__table-card`,
    ) ?? []) {
      const table = card.firstElementChild;
      if (!(table instanceof HTMLElement)) continue;
      const height = `${table.offsetHeight}px`;
      if (card.style.height !== height) {
        if (card.style.height) card.style.height = height;
        else {
          card.style.transition = "none";
          card.style.height = height;
          void card.offsetHeight;
          card.style.transition = "";
        }
      }
    }
  });
  useLayoutEffect(() => latestMeasure.current());
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let active = true;
    const observer = new ResizeObserver(() => latestMeasure.current());
    observer.observe(stage);
    void document.fonts?.ready.then(() => {
      if (active) latestMeasure.current();
    });
    let frame = 0,
      until = 0;
    const tick = () => {
      latestMeasure.current();
      frame = performance.now() < until ? requestAnimationFrame(tick) : 0;
    };
    const onTransition = (event: TransitionEvent) => {
      if (
        event.target instanceof Element &&
        (event.target.classList.contains(`${prefix}__figure`) ||
          event.target.classList.contains(`${prefix}__table-card`))
      ) {
        until = performance.now() + 900;
        frame ||= requestAnimationFrame(tick);
      }
    };
    stage.addEventListener("transitionrun", onTransition);
    return () => {
      active = false;
      observer.disconnect();
      cancelAnimationFrame(frame);
      stage.removeEventListener("transitionrun", onTransition);
    };
  }, [prefix]);
  return {
    stageRef,
    sheetRef,
    flagRefs,
    positions,
    selections,
    commentPositions,
    commentHeights,
    figures,
    stageWidth,
    sheetWidth,
    stageHeight,
    rightBoundary,
    flagWidths,
  };
}
function useCursorInteractions(
  props: AgentCursorsProps,
  measurements: ReturnType<typeof useDocumentMeasurements>,
) {
  const {
    agents,
    cursors,
    suggestions = [],
    comments = [],
    following,
    onFollowingChange,
  } = props;
  const { stageRef, positions } = measurements;
  const [openComment, setOpenComment] = useState<string | null>(null),
    [reply, setReply] = useState(""),
    [localFollowing, setLocalFollowing] = useState<string | null>(null),
    [popover, setPopover] = useState<{
      id: string;
      box: DocumentBox;
    } | null>(null),
    [announcement, setAnnouncement] = useState("");
  const commentTimer = useRef(0),
    popoverTimer = useRef(0);
  const followed = following === undefined ? localFollowing : following;
  function follow(id: string | null) {
    if (following === undefined) setLocalFollowing(id);
    onFollowingChange?.(id);
  }
  const visibleAgents = agents
    .filter((agent) => cursors[agent.id] && positions[agent.id])
    .map((agent) => agent.id);
  const arrived = useRef(new Set<string>());
  const [, refresh] = useState(0);
  const arriving = visibleAgents.filter((id) => !arrived.current.has(id));
  useEffect(() => {
    if (!arriving.length) {
      for (const id of [...arrived.current])
        if (!visibleAgents.includes(id)) arrived.current.delete(id);
      return;
    }
    const timer = window.setTimeout(() => {
      arriving.forEach((id) => arrived.current.add(id));
      refresh((version) => version + 1);
    }, 40);
    return () => window.clearTimeout(timer);
  });
  const previousPositions = useRef<Record<string, CursorPosition>>({});
  Object.assign(previousPositions.current, positions);
  const previousAnnotations = useRef<Set<string> | null>(null);
  useEffect(() => {
    const ids = new Set([
      ...suggestions.map((suggestion) => suggestion.id),
      ...comments.map((comment) => comment.id),
    ]);
    const previous = previousAnnotations.current;
    if (previous) {
      const suggestion = suggestions.find((item) => !previous.has(item.id)),
        comment = comments.find((item) => !previous.has(item.id));
      const name = (id: string) => agents.find((agent) => agent.id === id)?.name;
      if (suggestion && name(suggestion.agent))
        setAnnouncement(
          `${name(suggestion.agent)} suggests a change${suggestion.note ? `: ${suggestion.note}` : ""}`,
        );
      else if (comment && name(comment.agent))
        setAnnouncement(`${name(comment.agent)} is writing a comment`);
    }
    previousAnnotations.current = ids;
  }, [suggestions, comments, agents]);
  function showSuggestion(id: string, element: HTMLElement) {
    window.clearTimeout(popoverTimer.current);
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect(),
      scale = stage.offsetWidth ? bounds.width / stage.offsetWidth : 1;
    const rectangles = element.getClientRects(),
      last = rectangles[rectangles.length - 1] ?? element.getBoundingClientRect();
    setPopover({
      id,
      box: {
        x: (last.left - bounds.left) / scale,
        y: (last.top - bounds.top) / scale,
        w: last.width / scale,
        h: last.height / scale,
      },
    });
  }
  function deferHideSuggestion() {
    window.clearTimeout(popoverTimer.current);
    popoverTimer.current = window.setTimeout(() => setPopover(null), 140);
  }
  function keepSuggestion() {
    window.clearTimeout(popoverTimer.current);
  }
  function keepComment() {
    window.clearTimeout(commentTimer.current);
  }
  function deferHideComment(id: string) {
    window.clearTimeout(commentTimer.current);
    commentTimer.current = window.setTimeout(
      () => setOpenComment((current) => (current === id ? null : current)),
      160,
    );
  }
  useEffect(() => {
    if (!popover) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPopover(null);
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [popover]);
  useEffect(
    () => () => {
      window.clearTimeout(commentTimer.current);
      window.clearTimeout(popoverTimer.current);
    },
    [],
  );
  return {
    openComment,
    setOpenComment,
    reply,
    setReply,
    followed,
    follow,
    arriving,
    previousPositions,
    announcement,
    popover,
    setPopover,
    showSuggestion,
    deferHideSuggestion,
    keepSuggestion,
    keepComment,
    deferHideComment,
  };
}
function DocumentContent({ props, prefix, measurements, interaction }: ContentProps) {
  const { agents, blocks, cursors, suggestions = [], tab } = props;
  const { figures } = measurements;
  const { popover, showSuggestion, deferHideSuggestion } = interaction;
  const agentName = (id: string) =>
    agents.find((agent) => agent.id === id)?.name ?? "Agent";
  function text(block: DocBlock): ReactNode[] {
    const content = block.text ?? "",
      edits = suggestions
        .filter((suggestion) => suggestion.block === block.id)
        .sort((left, right) => left.at - right.at);
    const fragments: ReactNode[] = [];
    let offset = 0;
    for (const edit of edits) {
      const start = Math.max(offset, Math.min(edit.at, content.length));
      if (start > offset)
        fragments.push(
          <span key={`t${offset}`} data-from={offset}>
            {content.slice(offset, start)}
          </span>,
        );
      const removed = Math.min(edit.remove ?? 0, content.length - start);
      const style: DocumentStyle = {
        [`--${prefix}-c`]: agents.find((agent) => agent.id === edit.agent)?.color,
      };
      const events: HTMLAttributes<HTMLElement> = {
        tabIndex: 0,
        onMouseEnter: (event) => showSuggestion(edit.id, event.currentTarget),
        onMouseLeave: deferHideSuggestion,
        onFocus: (event) => showSuggestion(edit.id, event.currentTarget),
        onBlur: deferHideSuggestion,
      };
      if (removed)
        fragments.push(
          <del
            key={`d${edit.id}`}
            className={`${prefix}__del`}
            data-from={start}
            data-sug={edit.id}
            style={style}
            {...events}
            data-open={popover?.id === edit.id ? "" : undefined}
            aria-label={`${agentName(edit.agent)} suggests removing: ${content.slice(start, start + removed)}`}
          >
            {content.slice(start, start + removed)}
          </del>,
        );
      if (removed && edit.insert !== undefined)
        fragments.push(<wbr key={`b${edit.id}`} />);
      if (edit.insert !== undefined)
        fragments.push(
          <ins
            key={`i${edit.id}`}
            className={`${prefix}__ins`}
            data-ins={edit.id}
            data-sug={edit.id}
            style={style}
            {...events}
            data-open={popover?.id === edit.id ? "" : undefined}
            aria-label={`${agentName(edit.agent)} suggests adding: ${edit.insert}`}
          >
            {edit.insert}
          </ins>,
        );
      offset = start + removed;
    }
    if (offset < content.length || !fragments.length)
      fragments.push(
        <span key={`t${offset}`} data-from={offset}>
          {content.slice(offset) || emptyText}
        </span>,
      );
    return fragments;
  }
  function renderBlock(block: DocBlock): ReactNode {
    const kind = block.kind ?? "paragraph";
    if (kind === "image") {
      const width = Math.max(0.2, Math.min(1, finiteValue(block.width) ?? 1)),
        specifiedRatio = finiteValue(block.ratio),
        ratio = specifiedRatio && specifiedRatio > 0 ? specifiedRatio : 16 / 9,
        fit = !!block.float && !(specifiedRatio && specifiedRatio > 0),
        size = fit ? figures[block.id] : undefined,
        agent = agents.find(
          (agent) => cursors[agent.id]?.block === block.id && cursors[agent.id]?.select,
        );
      const style: DocumentStyle = {
        ...(fit && size ? { height: size.h } : { aspectRatio: String(ratio) }),
        [`--${prefix}-c`]: agent?.color,
      };
      return (
        <figure
          key={block.id}
          className={`${prefix}__figure`}
          data-block={block.id}
          data-kind="image"
          data-float={block.float}
          data-fit={fit ? "" : undefined}
          style={{ width: `${width * 100}%` }}
        >
          <div
            className={`${prefix}__img`}
            data-loading={block.loading ? "" : undefined}
            data-held={agent ? "" : undefined}
            style={style}
            role="img"
            aria-label={
              block.loading ? "Image loading" : block.alt || block.text || "Image"
            }
          >
            {block.loading || !block.src ? (
              <span className={`${prefix}__shimmer`} aria-hidden="true" />
            ) : (
              <img src={block.src} alt="" draggable={false} />
            )}
            {agent && (
              <>
                {["tl", "tr", "bl", "br"].map((corner) => (
                  <span
                    key={corner}
                    className={`${prefix}__handle`}
                    data-at={corner}
                    aria-hidden="true"
                  />
                ))}
                <span className={`${prefix}__size`} aria-hidden="true">
                  {size
                    ? `${size.w * 2} × ${size.h * 2}`
                    : `${Math.round(1200 * width)} × ${Math.round((1200 * width) / ratio)}`}
                </span>
              </>
            )}
          </div>
          {block.text && (
            <figcaption className={`${prefix}__caption`} dir="auto">
              {block.text}
            </figcaption>
          )}
        </figure>
      );
    }
    if (kind === "table") {
      const [header, ...rows] = block.rows ?? [];
      const cell = (cell: DocBlock) =>
        cell.tone ? (
          <span className={`${prefix}__pill`} data-tone={cell.tone} data-block={cell.id}>
            {text(cell)}
          </span>
        ) : (
          <span className={`${prefix}__cell`} data-block={cell.id}>
            {text(cell)}
          </span>
        );
      return (
        <div key={block.id} className={`${prefix}__table-card`}>
          <table className={`${prefix}__table`}>
            {header && (
              <thead>
                <tr>
                  {header.map((item) => (
                    <th key={item.id} title={item.text || undefined}>
                      {cell(item)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, index) => (
                <tr key={row[0]?.id ?? index}>
                  {row.map((item) => (
                    <td key={item.id} title={item.text || undefined}>
                      {cell(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {block.addRow && (
              <tfoot>
                <tr>
                  <td colSpan={header?.length ?? 1}>
                    <span
                      className={`${prefix}__add`}
                      data-block={`${block.id}:add`}
                      data-hover={
                        agents.some(
                          (agent) => cursors[agent.id]?.block === `${block.id}:add`,
                        )
                          ? ""
                          : undefined
                      }
                      data-pressed={
                        agents.some(
                          (agent) =>
                            cursors[agent.id]?.block === `${block.id}:add` &&
                            cursors[agent.id]?.press,
                        )
                          ? ""
                          : undefined
                      }
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      <span data-from={0}>Add row</span>
                    </span>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      );
    }
    if (kind === "code")
      return (
        <pre key={block.id} className={`${prefix}__code`} data-block={block.id}>
          <code>{text(block)}</code>
        </pre>
      );
    const Tag =
      kind === "title" ? "h2" : kind === "heading" ? "h3" : kind === "item" ? "li" : "p";
    return (
      <Tag
        key={block.id}
        className={`${prefix}__block ${prefix}__block--${kind}`}
        data-block={block.id}
        dir="auto"
      >
        {text(block)}
      </Tag>
    );
  }
  const content: ReactNode[] = [];
  for (let index = 0; index < blocks.length; index++) {
    if (blocks[index].kind !== "item") {
      content.push(renderBlock(blocks[index]));
      continue;
    }
    const items: DocBlock[] = [];
    while (index < blocks.length && blocks[index].kind === "item")
      items.push(blocks[index++]);
    index--;
    content.push(
      <ul key={`l${items[0].id}`} className={`${prefix}__list`}>
        {items.map(renderBlock)}
      </ul>,
    );
  }
  return (
    <div key={tab} className={`${prefix}__text`}>
      {content}
    </div>
  );
}
function AgentAvatar({
  agent,
  prefix,
}: {
  agent: CursorAgent | undefined;
  prefix: string;
}) {
  return (
    agent?.avatar ?? (
      <span className={`${prefix}__face-initial`}>
        {agentInitial(agent?.name ?? "?")}
      </span>
    )
  );
}
function CommentPins({
  props,
  prefix,
  measurements,
  interaction,
}: {
  props: AgentCursorsProps;
  prefix: string;
  measurements: ReturnType<typeof useDocumentMeasurements>;
  interaction: ReturnType<typeof useCursorInteractions>;
}) {
  const { agents, comments = [], onReply, onResolveComment } = props;
  const { commentPositions, commentHeights, stageWidth, stageHeight } = measurements;
  const { openComment, setOpenComment, reply, setReply, keepComment, deferHideComment } =
    interaction;
  return (
    <div className={`${prefix}__notes`}>
      {comments.map((comment) => {
        const agent = agents.find((agent) => agent.id === comment.agent),
          position = commentPositions[comment.id];
        if (!position) return null;
        const open = !!comment.open || openComment === comment.id,
          width = Math.min(248, Math.max(160, stageWidth - 16)),
          shift = open
            ? Math.max(8 - position.x, Math.min(0, stageWidth - 8 - (position.x + width)))
            : 0,
          up = stageHeight > 0 && position.y + 190 > stageHeight;
        const style: DocumentStyle = {
          left: position.x,
          top: position.y,
          [`--${prefix}-c`]: agent?.color,
          [`--${prefix}-pin-h`]: `${commentHeights[comment.id] ?? 120}px`,
          [`--${prefix}-pin-w`]: `${width}px`,
          [`--${prefix}-pin-x`]: `${shift}px`,
        };
        const show = () => {
          keepComment();
          setOpenComment(comment.id);
        };
        const hide = () => deferHideComment(comment.id);
        return (
          <div
            key={comment.id}
            className={`${prefix}__pin`}
            data-comment={comment.id}
            data-open={open ? "" : undefined}
            data-up={up ? "" : undefined}
            style={style}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) hide();
            }}
          >
            <div className={`${prefix}__pin-box`}>
              <span className={`${prefix}__pin-mark`}>
                <AgentAvatar agent={agent} prefix={prefix} />
              </span>
              <button
                type="button"
                className={`${prefix}__pin-hit`}
                aria-expanded={open}
                aria-label={`Comment from ${agent?.name ?? "an agent"}: ${comment.text}`}
                tabIndex={open ? -1 : 0}
              />
              <div
                className={`${prefix}__pin-body`}
                role="group"
                aria-label={`Comment from ${agent?.name ?? "an agent"}`}
                aria-hidden={!open}
              >
                <div className={`${prefix}__note-head`}>
                  <b title={agent?.name}>{agent?.name}</b>
                  <span>now</span>
                </div>
                <p className={`${prefix}__note-text`} data-block={comment.id} dir="auto">
                  <span data-from={0}>{comment.text || emptyText}</span>
                </p>
                {(onReply || onResolveComment) && (
                  <div className={`${prefix}__pin-actions`}>
                    {onReply ? (
                      <input
                        className={`${prefix}__reply`}
                        value={openComment === comment.id ? reply : ""}
                        placeholder="Reply"
                        aria-label={`Reply to ${agent?.name ?? "the agent"}`}
                        tabIndex={open ? 0 : -1}
                        onChange={(event) => setReply(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && reply.trim()) {
                            onReply(comment, reply.trim());
                            setReply("");
                          }
                          if (event.key === "Escape") setOpenComment(null);
                        }}
                      />
                    ) : (
                      <span className={`${prefix}__reply`} aria-hidden="true" />
                    )}
                    {onResolveComment && (
                      <button
                        type="button"
                        className={`${prefix}__resolve`}
                        aria-label="Resolve"
                        title="Resolve"
                        tabIndex={open ? 0 : -1}
                        onClick={() => {
                          setOpenComment(null);
                          onResolveComment(comment);
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function CursorOverlays({
  props,
  prefix,
  measurements,
  interaction,
}: {
  props: AgentCursorsProps;
  prefix: string;
  measurements: ReturnType<typeof useDocumentMeasurements>;
  interaction: ReturnType<typeof useCursorInteractions>;
}) {
  const { agents, cursors, comments = [], height, formatCost = formatCursorCost } = props;
  const { positions, rightBoundary, flagWidths, flagRefs } = measurements;
  const { previousPositions, arriving, followed } = interaction;
  const commentIds = new Set(comments.map((comment) => comment.id));
  return (
    <div className={`${prefix}__cursors`} aria-hidden="true">
      {agents.map((agent) => {
        const cursor = cursors[agent.id],
          position =
            (cursor && positions[agent.id]) || previousPositions.current[agent.id];
        if (!position) return null;
        const gone = !cursor || !positions[agent.id],
          cost = finiteValue(agent.cost),
          tags = cost === undefined ? [] : [formatCost(cost)],
          shift = Math.max(
            Math.min(0, 8 - (position.x + 16)),
            Math.min(
              0,
              rightBoundary - 8 - (position.x + 16 + (flagWidths[agent.id] ?? 0)),
            ),
          ),
          opacity = height
            ? Math.max(0, Math.min(1, (height * 0.97 - position.y) / (height * 0.47)))
            : 1;
        const style: DocumentStyle = {
          transform: `translate(${position.x}px, ${position.y}px)`,
          [`--${prefix}-c`]: agent.color,
          [`--${prefix}-h`]: `${position.h}px`,
          [`--${prefix}-shift`]: `${shift}px`,
        };
        return (
          <div
            key={agent.id}
            className={`${prefix}__cursor`}
            data-agent={agent.id}
            data-gone={gone ? "" : undefined}
            data-arrive={!gone && arriving.includes(agent.id) ? "" : undefined}
            data-typing={cursor?.typing ? "" : undefined}
            data-free={position.free ? "" : undefined}
            data-in-note={cursor && commentIds.has(cursor.block) ? "" : undefined}
            data-press={cursor?.press ? "" : undefined}
            data-drag={cursor?.point === "corner" && cursor.select ? "" : undefined}
            data-dim={followed && followed !== agent.id ? "" : undefined}
            style={style}
          >
            <div
              className={`${prefix}__cursor-in`}
              style={opacity < 1 ? { opacity } : undefined}
            >
              <span className={`${prefix}__caret`} />
              <svg className={`${prefix}__arrow`} viewBox="-2.186 -0.256 18.514 22.277">
                <path transform="rotate(21.37)" d={arrowPath} />
              </svg>
              <span
                className={`${prefix}__flag`}
                ref={(element) => {
                  if (element) flagRefs.current.set(agent.id, element);
                  else flagRefs.current.delete(agent.id);
                }}
              >
                <span className={`${prefix}__flag-row`}>
                  <span className={`${prefix}__flag-name`} dir="auto">
                    {agent.name}
                  </span>
                  {tags.length > 0 && (
                    <span className={`${prefix}__flag-tags`}>
                      {tags.map((tag, index) => (
                        <span key={index} className={`${prefix}__flag-tag`}>
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
                <span
                  className={`${prefix}__flag-doing`}
                  data-on={cursor?.doing ? "" : undefined}
                >
                  <span>{cursor?.doing ?? ""}</span>
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function SuggestionPopover({
  props,
  prefix,
  interaction,
  sheetWidth,
}: {
  props: AgentCursorsProps;
  prefix: string;
  interaction: ReturnType<typeof useCursorInteractions>;
  sheetWidth: number;
}) {
  const { agents, suggestions = [], onAccept, onReject } = props;
  const { popover, setPopover, keepSuggestion, deferHideSuggestion } = interaction;
  const suggestion = popover
    ? suggestions.find((suggestion) => suggestion.id === popover.id)
    : undefined;
  if (!popover || !suggestion) return null;
  const agent = agents.find((agent) => agent.id === suggestion.agent),
    name = agent?.name ?? "Agent",
    width = sheetWidth > 0 ? Math.min(260, sheetWidth) : 260;
  const style: DocumentStyle = {
    left: Math.max(0, Math.min(popover.box.x, sheetWidth - width)),
    top: popover.box.y + popover.box.h + 6,
    width,
    [`--${prefix}-c`]: agent?.color,
  };
  return (
    <div
      className={`${prefix}__pop`}
      role="dialog"
      aria-label={`Suggestion from ${name}`}
      style={style}
      onMouseEnter={keepSuggestion}
      onMouseLeave={deferHideSuggestion}
      onFocus={keepSuggestion}
      onBlur={deferHideSuggestion}
    >
      <div className={`${prefix}__pop-head`}>
        <span className={`${prefix}__pop-mark`}>
          <AgentAvatar agent={agent} prefix={prefix} />
        </span>
        <b title={name}>{name}</b>
        <span>
          {suggestion.remove && suggestion.insert
            ? "suggests a rewrite"
            : suggestion.remove
              ? "suggests removing"
              : "suggests adding"}
        </span>
      </div>
      {suggestion.note && (
        <p className={`${prefix}__pop-note`} dir="auto">
          {suggestion.note}
        </p>
      )}
      <div className={`${prefix}__pop-actions`}>
        {onReject && (
          <button
            type="button"
            className={`${prefix}__btn`}
            onClick={() => {
              setPopover(null);
              onReject(suggestion);
            }}
          >
            Reject
          </button>
        )}
        {onAccept && (
          <button
            type="button"
            className={`${prefix}__btn ${prefix}__btn--primary`}
            onClick={() => {
              setPopover(null);
              onAccept(suggestion);
            }}
          >
            Accept
          </button>
        )}
      </div>
    </div>
  );
}
function AgentCursorsView(
  props: AgentCursorsProps & {
    clean: boolean;
  },
) {
  const {
    agents,
    cursors,
    suggestions = [],
    onAcceptAll,
    height,
    tabs,
    tab,
    onTabChange,
    formatCost = formatCursorCost,
    title = "Untitled",
    className,
    clean,
  } = props;
  const prefix = clean ? "ui-acuc" : "ui-acu";
  const measurements = useDocumentMeasurements(props, prefix),
    interaction = useCursorInteractions(props, measurements);
  const { stageRef, sheetRef, selections, stageWidth, sheetWidth } = measurements;
  const { followed, follow, announcement } = interaction;
  const present = agents.filter((agent) => cursors[agent.id]),
    cost = agents.some((agent) => finiteValue(agent.cost) !== undefined)
      ? agents.reduce((total, agent) => total + (finiteValue(agent.cost) ?? 0), 0)
      : null;
  const faceLimit = stageWidth > 0 && stageWidth < 480 ? 3 : 6,
    firstFaces = agents.slice(0, faceLimit - 1);
  const visibleFaces =
    agents.length <= faceLimit
      ? agents
      : followed && !firstFaces.some((agent) => agent.id === followed)
        ? [...firstFaces.slice(0, -1), ...agents.filter((agent) => agent.id === followed)]
        : firstFaces;
  const overflow = agents.filter((agent) => !visibleFaces.includes(agent));
  const typing = present.filter((agent) => cursors[agent.id]?.typing).length;
  const style: DocumentStyle | undefined = height
    ? { [`--${prefix}-height`]: `${height}px` }
    : undefined;
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      data-following={followed ?? undefined}
      data-fade={height ? "" : undefined}
      style={style}
    >
      {tabs && tabs.length > 0 && (
        <div className={`${prefix}__tabs`} role="tablist" aria-label="Views">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`${prefix}__tab`}
              aria-selected={item.id === (tab ?? tabs[0].id)}
              onClick={() => onTabChange?.(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      <div className={`${prefix}__stage`} ref={stageRef}>
        <div className={`${prefix}__shade`} aria-hidden="true">
          <span />
        </div>
        <div className={`${prefix}__sheet`} ref={sheetRef}>
          <header className={`${prefix}__bar`}>
            <span className={`${prefix}__doc`} aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2.5H7.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7z" />
                <path d="M14 2.5V7h4.5M9 12.5h6M9 16h4" />
              </svg>
            </span>
            <span className={`${prefix}__title`} title={title}>
              {title}
            </span>
            <div
              className={`${prefix}__people`}
              role="group"
              aria-label="Agents in this document"
            >
              {visibleFaces.map((agent) => {
                const cursor = cursors[agent.id],
                  selected = followed === agent.id,
                  style: DocumentStyle = {
                    [`--${prefix}-c`]: agent.color,
                    [`--${prefix}-tint`]: agent.tint,
                  };
                return (
                  <button
                    key={agent.id}
                    type="button"
                    className={`${prefix}__face`}
                    data-here={cursor ? "" : undefined}
                    data-typing={cursor?.typing ? "" : undefined}
                    aria-pressed={selected}
                    aria-label={`${selected ? "Stop following" : "Follow"} ${agent.name}${cursor?.doing ? ` – ${cursor.doing}` : cursor ? "" : " (not in the document)"}`}
                    style={style}
                    onClick={() => follow(selected ? null : agent.id)}
                  >
                    <span className={`${prefix}__face-mark`}>
                      <AgentAvatar agent={agent} prefix={prefix} />
                    </span>
                    <span className={`${prefix}__face-tip`} aria-hidden="true">
                      <b>{agent.name}</b>
                      <span>
                        {cursor?.doing ?? (cursor ? "In the document" : "Away")}
                      </span>
                    </span>
                  </button>
                );
              })}
              {overflow.length > 0 && (
                <span
                  className={`${prefix}__face ${prefix}__face-more`}
                  title={overflow.map((agent) => agent.name).join(", ")}
                  aria-label={`${overflow.length} more: ${overflow.map((agent) => agent.name).join(", ")}`}
                >
                  +{overflow.length.toLocaleString("en-US")}
                </span>
              )}
            </div>
            <span className={`${prefix}__sum`}>
              {suggestions.length > 0
                ? `${suggestions.length.toLocaleString("en-US")} suggestion${suggestions.length === 1 ? "" : "s"}`
                : typing
                  ? `${typing.toLocaleString("en-US")} typing`
                  : `${present.length.toLocaleString("en-US")} here`}
              {cost !== null && (
                <b className={`${prefix}__spent`} data-zero={cost === 0 ? "" : undefined}>
                  {formatCost(cost)}
                </b>
              )}
            </span>
            {onAcceptAll && (
              <button
                type="button"
                className={`${prefix}__all`}
                disabled={suggestions.length === 0}
                onClick={onAcceptAll}
              >
                Accept all
              </button>
            )}
          </header>
          <div className={`${prefix}__paper`} aria-hidden="true" />
          <div className={`${prefix}__marks`} aria-hidden="true">
            {agents.map((agent) =>
              (selections[agent.id] ?? []).map((box, index) => {
                const style: DocumentStyle = {
                  left: box.x - 1,
                  top: box.y,
                  width: box.w + 2,
                  height: box.h,
                  [`--${prefix}-c`]: agent.color,
                };
                return (
                  <span
                    key={`${agent.id}-${index}`}
                    className={`${prefix}__mark`}
                    data-dim={followed && followed !== agent.id ? "" : undefined}
                    style={style}
                  />
                );
              }),
            )}
          </div>
          <DocumentContent
            props={props}
            prefix={prefix}
            measurements={measurements}
            interaction={interaction}
          />
        </div>
        <CommentPins
          props={props}
          prefix={prefix}
          measurements={measurements}
          interaction={interaction}
        />
        <CursorOverlays
          props={props}
          prefix={prefix}
          measurements={measurements}
          interaction={interaction}
        />
        <SuggestionPopover
          props={props}
          prefix={prefix}
          interaction={interaction}
          sheetWidth={sheetWidth}
        />
      </div>
      <span className={`${prefix}__live`} role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
const emptyText = "\u200b";
const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const arrowPath =
  "M13.92 4.07c1.69.66 3.03 1.18 3.94 1.68.46.25.87.53 1.16.86.31.35.51.79.48 1.29-.03.51-.27.92-.62 1.23-.33.3-.77.53-1.25.74-.96.4-2.36.78-4.12 1.26-.56.15-.98.27-1.26.37-.26.1-.38.18-.47.27-.09.09-.17.21-.27.47-.1.28-.22.7-.37 1.26-.48 1.76-.86 3.16-1.26 4.12-.2.49-.44.93-.74 1.25-.32.35-.72.6-1.23.62-.51.03-.94-.17-1.29-.48-.33-.29-.61-.7-.86-1.16-.5-.91-1.02-2.25-1.68-3.94L1.66 7.76C.96 5.99.41 4.59.16 3.51-.09 2.44-.12 1.39.63.63 1.39-.12 2.44-.09 3.51.16c1.08.25 2.48.8 4.25 1.5l6.16 2.41Z";
export { AgentCursors };
export { acceptSuggestion_document_model as acceptSuggestion };
export type { CursorAgent };
export type { DocBlock };
export type { AgentCursor };
export type { DocSuggestion };
export type { DocComment };
export type { AgentCursorsTab };
export type { AgentCursorsProps };
export type { AcceptedSuggestionResult };
