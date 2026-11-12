"use client";

import "./InlineDiff.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import type * as React from "react";
import {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
type DiffSegment =
  | {
      type: "equal";
      text: string;
    }
  | {
      type: "change";
      remove?: string;
      insert?: string;
    };
interface InlineDiffHandle {
  /** Highlight a zero-based change index; null clears the highlight. */
  highlight: (index: number | null) => void;
  accept: (index: number) => void;
  reject: (index: number) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  undo: () => void;
  reset: () => void;
}
interface InlineDiffProps {
  original?: string;
  suggested?: string;
  /** Explicit segments take precedence over original/suggested. */
  changes?: DiffSegment[];
  onChange?: (text: string) => void;
  onDone?: (text: string) => void;
  label?: string;
  /** React 19 ref-as-prop API. */
  ref?: React.Ref<InlineDiffHandle>;
  className?: string;
}
type NormalizedSegment =
  | {
      type: "equal";
      text: string;
    }
  | {
      type: "change";
      remove: string;
      insert: string;
    };
type Decision = "accepted" | "rejected";
type Decisions = Partial<Record<number, Decision>>;
interface Change {
  segmentIndex: number;
  remove: string;
  insert: string;
}
type TokenOperation = {
  kind: "equal" | "remove" | "insert";
  text: string;
};
interface PopoverPosition {
  left: number;
  top: number;
  snap: boolean;
  below: boolean;
}
type InlineDiffController = ReturnType<typeof useInlineDiff>;
interface ViewProps extends InlineDiffProps {
  variant: "default" | "clean";
}
interface PartProps {
  prefix: string;
  review: InlineDiffController;
}
function InlineDiff(props: InlineDiffProps) {
  return <InlineDiffView {...props} variant="default" />;
}
/** Myers' shortest edit path avoids allocating a quadratic table for large inputs. */
function diffLargeTokenLists(
  original: string[],
  suggested: string[],
  maxDistance = 1500,
): TokenOperation[] | null {
  const oldLength = original.length,
    newLength = suggested.length;
  const offset = oldLength + newLength + 1;
  const frontier = new Int32Array(2 * offset + 1);
  const traces: Int32Array[] = [];
  let distance = -1;
  for (
    let step = 0;
    step <= Math.min(maxDistance, oldLength + newLength) && distance < 0;
    step++
  ) {
    traces.push(frontier.slice(offset - step - 1, offset + step + 2));
    for (let diagonal = -step; diagonal <= step; diagonal += 2) {
      let oldIndex =
        diagonal === -step ||
        (diagonal !== step &&
          frontier[offset + diagonal - 1] < frontier[offset + diagonal + 1])
          ? frontier[offset + diagonal + 1]
          : frontier[offset + diagonal - 1] + 1;
      let newIndex = oldIndex - diagonal;
      while (
        oldIndex < oldLength &&
        newIndex < newLength &&
        original[oldIndex] === suggested[newIndex]
      ) {
        oldIndex++;
        newIndex++;
      }
      frontier[offset + diagonal] = oldIndex;
      if (oldIndex >= oldLength && newIndex >= newLength) {
        distance = step;
        break;
      }
    }
  }
  if (distance < 0) return null;
  const operations: TokenOperation[] = [];
  let oldIndex = oldLength,
    newIndex = newLength;
  for (let step = distance; step > 0; step--) {
    const trace = traces[step];
    const previousPosition = (diagonal: number) => trace[diagonal + step + 1];
    const diagonal = oldIndex - newIndex;
    const inserted =
      diagonal === -step ||
      (diagonal !== step &&
        previousPosition(diagonal - 1) < previousPosition(diagonal + 1));
    const previousDiagonal = inserted ? diagonal + 1 : diagonal - 1;
    const previousOld = previousPosition(previousDiagonal),
      previousNew = previousOld - previousDiagonal;
    while (oldIndex > previousOld && newIndex > previousNew) {
      operations.push({ kind: "equal", text: original[--oldIndex] });
      newIndex--;
    }
    operations.push(
      inserted
        ? { kind: "insert", text: suggested[--newIndex] }
        : { kind: "remove", text: original[--oldIndex] },
    );
  }
  while (oldIndex > 0 && newIndex > 0) {
    operations.push({ kind: "equal", text: original[--oldIndex] });
    newIndex--;
  }
  return operations.reverse();
}
function diffSmallTokenLists(original: string[], suggested: string[]): TokenOperation[] {
  const oldLength = original.length,
    newLength = suggested.length,
    stride = newLength + 1;
  const commonLengths = new Uint16Array((oldLength + 1) * stride);
  for (let oldIndex = oldLength - 1; oldIndex >= 0; oldIndex--) {
    for (let newIndex = newLength - 1; newIndex >= 0; newIndex--) {
      commonLengths[oldIndex * stride + newIndex] =
        original[oldIndex] === suggested[newIndex]
          ? commonLengths[(oldIndex + 1) * stride + newIndex + 1] + 1
          : Math.max(
              commonLengths[(oldIndex + 1) * stride + newIndex],
              commonLengths[oldIndex * stride + newIndex + 1],
            );
    }
  }
  const operations: TokenOperation[] = [];
  let oldIndex = 0,
    newIndex = 0;
  while (oldIndex < oldLength && newIndex < newLength) {
    if (original[oldIndex] === suggested[newIndex]) {
      operations.push({ kind: "equal", text: original[oldIndex++] });
      newIndex++;
    } else if (
      commonLengths[(oldIndex + 1) * stride + newIndex] >=
      commonLengths[oldIndex * stride + newIndex + 1]
    )
      operations.push({ kind: "remove", text: original[oldIndex++] });
    else operations.push({ kind: "insert", text: suggested[newIndex++] });
  }
  while (oldIndex < oldLength)
    operations.push({ kind: "remove", text: original[oldIndex++] });
  while (newIndex < newLength)
    operations.push({ kind: "insert", text: suggested[newIndex++] });
  return operations;
}
function alignWhitespace(operations: TokenOperation[]) {
  for (let start = 0; start < operations.length; start++) {
    if (
      operations[start].kind === "equal" ||
      (start > 0 && operations[start - 1].kind !== "equal")
    )
      continue;
    const kind = operations[start].kind;
    let end = start;
    while (end < operations.length && operations[end].kind === kind) end++;
    if (end < operations.length && operations[end].kind !== "equal") continue;
    while (
      end < operations.length &&
      operations[end].kind === "equal" &&
      operations[end].text === operations[start].text &&
      isWhitespace(operations[start].text)
    ) {
      operations[end] = { kind, text: operations[end].text };
      operations[start] = { kind: "equal", text: operations[start].text };
      start++;
      end++;
    }
    start = end - 1;
  }
}
function groupOperations(operations: TokenOperation[]): NormalizedSegment[] {
  const grouped: NormalizedSegment[] = [];
  for (const operation of operations) {
    const previous = grouped[grouped.length - 1];
    if (operation.kind === "equal") {
      if (previous?.type === "equal") previous.text += operation.text;
      else grouped.push({ type: "equal", text: operation.text });
    } else {
      const change =
        previous?.type === "change"
          ? previous
          : { type: "change" as const, remove: "", insert: "" };
      if (change !== previous) grouped.push(change);
      change[operation.kind] += operation.text;
    }
  }
  const merged: NormalizedSegment[] = [];
  for (let index = 0; index < grouped.length; index++) {
    const segment = grouped[index],
      previous = merged[merged.length - 1],
      next = grouped[index + 1];
    if (
      segment.type === "equal" &&
      isWhitespace(segment.text) &&
      previous?.type === "change" &&
      next?.type === "change"
    ) {
      previous.remove += segment.text + next.remove;
      previous.insert += segment.text + next.insert;
      index++;
    } else merged.push({ ...segment });
  }
  const segments: NormalizedSegment[] = [];
  const appendEqual = (text: string) => {
    if (!text) return;
    const previous = segments[segments.length - 1];
    if (previous?.type === "equal") previous.text += text;
    else segments.push({ type: "equal", text });
  };
  for (const segment of merged) {
    if (segment.type === "equal") {
      appendEqual(segment.text);
      continue;
    }
    let { remove, insert } = segment;
    let prefix = "",
      suffix = "";
    if (remove && insert) {
      const leading = remove.match(/^\s+/)?.[0] ?? "";
      if (
        leading &&
        insert.startsWith(leading) &&
        leading.length < remove.length &&
        leading.length < insert.length
      ) {
        prefix = leading;
        remove = remove.slice(leading.length);
        insert = insert.slice(leading.length);
      }
      const trailing = remove.match(/\s+$/)?.[0] ?? "";
      if (
        trailing &&
        insert.endsWith(trailing) &&
        trailing.length < remove.length &&
        trailing.length < insert.length
      ) {
        suffix = trailing;
        remove = remove.slice(0, -trailing.length);
        insert = insert.slice(0, -trailing.length);
      }
    }
    appendEqual(prefix);
    segments.push({ type: "change", remove, insert });
    appendEqual(suffix);
  }
  return segments;
}
function createDiff(original: string, suggested: string): NormalizedSegment[] {
  const oldTokens = original.match(tokenPattern) ?? [],
    newTokens = suggested.match(tokenPattern) ?? [];
  let prefixLength = 0;
  while (
    prefixLength < oldTokens.length &&
    prefixLength < newTokens.length &&
    oldTokens[prefixLength] === newTokens[prefixLength]
  )
    prefixLength++;
  let suffixLength = 0;
  while (
    suffixLength < oldTokens.length - prefixLength &&
    suffixLength < newTokens.length - prefixLength &&
    oldTokens[oldTokens.length - 1 - suffixLength] ===
      newTokens[newTokens.length - 1 - suffixLength]
  )
    suffixLength++;
  const oldMiddle = oldTokens.slice(prefixLength, oldTokens.length - suffixLength),
    newMiddle = newTokens.slice(prefixLength, newTokens.length - suffixLength);
  const equal = (text: string): TokenOperation => ({ kind: "equal", text });
  const operations = oldTokens.slice(0, prefixLength).map(equal);
  const middle =
    oldMiddle.length * newMiddle.length > 4e6
      ? diffLargeTokenLists(oldMiddle, newMiddle)
      : diffSmallTokenLists(oldMiddle, newMiddle);
  if (middle) operations.push(...middle);
  else {
    operations.push(
      ...oldMiddle.map((text): TokenOperation => ({ kind: "remove", text })),
    );
    operations.push(
      ...newMiddle.map((text): TokenOperation => ({ kind: "insert", text })),
    );
  }
  operations.push(...oldTokens.slice(oldTokens.length - suffixLength).map(equal));
  alignWhitespace(operations);
  return groupOperations(operations);
}
function normalizeSegments(changes: DiffSegment[]): NormalizedSegment[] {
  const normalized: NormalizedSegment[] = [];
  for (const segment of Array.isArray(changes) ? changes : []) {
    if (segment?.type === "equal") {
      const text = toText(segment.text);
      if (text) normalized.push({ type: "equal", text });
    } else if (segment?.type === "change") {
      const remove = toText(segment.remove),
        insert = toText(segment.insert);
      if (remove || insert) normalized.push({ type: "change", remove, insert });
    }
  }
  return normalized;
}
function describeChange(change: Pick<Change, "remove" | "insert">) {
  if (change.remove.trim() && change.insert.trim())
    return `replace ${quote(change.remove)} with ${quote(change.insert)}`;
  if (change.insert.trim()) return `add ${quote(change.insert)}`;
  return `remove ${quote(change.remove)}`;
}
function applyDecisions(segments: NormalizedSegment[], decisions: Decisions) {
  let changeIndex = -1;
  return segments
    .map((segment) =>
      segment.type === "equal"
        ? segment.text
        : decisions[++changeIndex] === "accepted"
          ? segment.insert
          : segment.remove,
    )
    .join("");
}
function useInlineDiff({
  original = "",
  suggested = "",
  changes,
  onChange,
  onDone,
  ref,
}: InlineDiffProps) {
  const segments = useMemo(
    () =>
      changes
        ? normalizeSegments(changes)
        : createDiff(String(original ?? ""), String(suggested ?? "")),
    [changes, original, suggested],
  );
  const signature = useMemo(() => JSON.stringify(segments), [segments]);
  const changeList = useMemo(() => {
    const list: Change[] = [];
    segments.forEach((segment, segmentIndex) => {
      if (segment.type === "change")
        list.push({
          segmentIndex,
          remove: segment.remove,
          insert: segment.insert,
        });
    });
    return list;
  }, [segments]);
  const [decisions, setDecisions] = useState<Decisions>({});
  const [history, setHistory] = useState<number[][]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [previousSignature, setPreviousSignature] = useState(signature);
  // Reset review state in the same render when a new document arrives.
  if (previousSignature !== signature) {
    setPreviousSignature(signature);
    setDecisions({});
    setHistory([]);
    setHoveredIndex(null);
    setFocusedIndex(null);
    setHighlightedIndex(null);
  }
  const rootRef = useRef<HTMLDivElement>(null),
    cardRef = useRef<HTMLDivElement>(null),
    popoverRef = useRef<HTMLDivElement>(null),
    undoButtonRef = useRef<HTMLButtonElement>(null);
  const changeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hoverTimer = useRef(0);
  const pendingFocus = useRef<number | "undo" | null>(null);
  const lastActiveIndex = useRef<number | null>(null);
  const callbacks = useRef({ onChange, onDone });
  callbacks.current = { onChange, onDone };
  const pendingIndexes = changeList
    .map((_, index) => index)
    .filter((index) => !decisions[index]);
  const allReviewed = changeList.length > 0 && pendingIndexes.length === 0;
  const snapshot = useRef({ decisions, history, changeList, pendingIndexes });
  snapshot.current = { decisions, history, changeList, pendingIndexes };
  function decide(indexes: number[], decision: Decision, moveFocus = false) {
    const { decisions: currentDecisions, changeList: list } = snapshot.current;
    const validIndexes = indexes.filter(
      (index) => index >= 0 && index < list.length && !currentDecisions[index],
    );
    if (!validIndexes.length) return;
    const nextDecisions = { ...currentDecisions };
    validIndexes.forEach((index) => (nextDecisions[index] = decision));
    const remaining = list.length - Object.keys(nextDecisions).length;
    setDecisions(nextDecisions);
    setHistory((previous) => [...previous, validIndexes]);
    setHighlightedIndex(null);
    lastActiveIndex.current = Math.max(...validIndexes);
    const action = decision === "accepted" ? "Accepted" : "Rejected";
    const description =
      validIndexes.length === 1
        ? describeChange(list[validIndexes[0]]).replace(/^./, (letter) =>
            letter.toUpperCase(),
          )
        : `${formatCount(validIndexes.length)} suggestions`;
    setAnnouncement(
      `${action}: ${description}. ${remaining ? `${suggestionCount(remaining)} left.` : "All changes reviewed."}`,
    );
    if (moveFocus) {
      const lastIndex = Math.max(...validIndexes),
        pending = list.map((_, index) => index).filter((index) => !nextDecisions[index]);
      pendingFocus.current = remaining
        ? (pending.find((index) => index > lastIndex) ?? pending[0])
        : "undo";
    }
    const text = applyDecisions(segments, nextDecisions);
    callbacks.current.onChange?.(text);
    if (!remaining) callbacks.current.onDone?.(text);
  }
  function undo(moveFocus = false) {
    const { decisions: currentDecisions, history: currentHistory } = snapshot.current;
    const lastBatch = currentHistory[currentHistory.length - 1];
    if (!lastBatch) return;
    const nextDecisions = { ...currentDecisions };
    lastBatch.forEach((index) => delete nextDecisions[index]);
    setDecisions(nextDecisions);
    setHistory(currentHistory.slice(0, -1));
    setAnnouncement(
      `Undone. ${suggestionCount(snapshot.current.changeList.length - Object.keys(nextDecisions).length)} left.`,
    );
    if (moveFocus) pendingFocus.current = Math.min(...lastBatch);
    callbacks.current.onChange?.(applyDecisions(segments, nextDecisions));
  }
  function reset() {
    setDecisions({});
    setHistory([]);
    setHighlightedIndex(null);
    setHoveredIndex(null);
    setAnnouncement("");
    lastActiveIndex.current = null;
  }
  useImperativeHandle(ref, () => ({
    highlight: setHighlightedIndex,
    accept: (index) => decide([index], "accepted"),
    reject: (index) => decide([index], "rejected"),
    acceptAll: () => decide(snapshot.current.pendingIndexes, "accepted"),
    rejectAll: () => decide(snapshot.current.pendingIndexes, "rejected"),
    undo: () => undo(),
    reset,
  }));
  useLayoutEffect(() => {
    const target = pendingFocus.current;
    if (target === null) return;
    pendingFocus.current = null;
    if (target === "undo") undoButtonRef.current?.focus();
    else changeRefs.current[target]?.focus();
  }, [decisions]);
  const activeIndex =
    [hoveredIndex, focusedIndex, highlightedIndex].find(
      (index) => index !== null && !decisions[index] && index < changeList.length,
    ) ?? null;
  useEffect(() => {
    if (activeIndex !== null) lastActiveIndex.current = activeIndex;
  }, [activeIndex]);
  function navigate(direction: 1 | -1) {
    const pending = snapshot.current.pendingIndexes;
    if (!pending.length) return;
    const current =
      activeIndex ?? lastActiveIndex.current ?? (direction === 1 ? -1 : Infinity);
    const next =
      direction === 1
        ? (pending.find((index) => index > current) ?? pending[0])
        : ([...pending].reverse().find((index) => index < current) ??
          pending[pending.length - 1]);
    window.clearTimeout(hoverTimer.current);
    setHoveredIndex(null);
    setHighlightedIndex(next);
    lastActiveIndex.current = next;
    const element = changeRefs.current[next];
    if (!element) return;
    if (focusedIndex !== null) element.focus({ preventScroll: true });
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }
  useEffect(() => {
    if (highlightedIndex === null) return;
    const clearOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setHighlightedIndex(null);
    };
    document.addEventListener("pointerdown", clearOutside);
    return () => document.removeEventListener("pointerdown", clearOutside);
  }, [highlightedIndex]);
  const [popoverPosition, setPopoverPosition] = useState<PopoverPosition | null>(null);
  const positioned = useRef(false);
  useLayoutEffect(() => {
    if (activeIndex === null) {
      positioned.current = false;
      return;
    }
    const positionPopover = () => {
      const card = cardRef.current,
        popover = popoverRef.current,
        change = changeRefs.current[activeIndex];
      if (!card || !popover || !change) return;
      const bounds = card.getBoundingClientRect(),
        scale = bounds.width ? card.offsetWidth / bounds.width : 1;
      const changeBounds = change.getClientRects()[0] ?? change.getBoundingClientRect();
      const width = popover.offsetWidth,
        height = popover.offsetHeight;
      const center = (changeBounds.left - bounds.left + changeBounds.width / 2) * scale;
      const left = Math.min(
        Math.max(center - width / 2, 8),
        Math.max(8, card.offsetWidth - width - 8),
      );
      const above = (changeBounds.top - bounds.top) * scale - height - 6,
        below = above < 4;
      const top = below ? (changeBounds.bottom - bounds.top) * scale + 6 : above;
      setPopoverPosition({ left, top, snap: !positioned.current, below });
      positioned.current = true;
    };
    positionPopover();
    const observer = new ResizeObserver(positionPopover);
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [activeIndex, decisions]);
  function hover(index: number) {
    window.clearTimeout(hoverTimer.current);
    setHoveredIndex(index);
  }
  function leave() {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setHoveredIndex(null), 140);
  }
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);
  function handleChangeKeyDown(event: KeyboardEvent<HTMLSpanElement>, index: number) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === "y" || key === "enter") {
      event.preventDefault();
      decide([index], "accepted", true);
    } else if (key === "n" || key === "backspace" || key === "delete") {
      event.preventDefault();
      decide([index], "rejected", true);
    } else if (key === "escape") event.currentTarget.blur();
  }
  return {
    segments,
    changeList,
    decisions,
    history,
    focusedIndex,
    setFocusedIndex,
    highlightedIndex,
    setHighlightedIndex,
    announcement,
    pendingIndexes,
    allReviewed,
    activeIndex,
    popoverPosition,
    rootRef,
    cardRef,
    popoverRef,
    undoButtonRef,
    changeRefs,
    decide,
    undo,
    navigate,
    hover,
    leave,
    handleChangeKeyDown,
  };
}
function DiffLabel({ prefix, label }: { prefix: string; label?: string }) {
  return label ? (
    <div className={`${prefix}__label`}>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 1.75c.3 2.9 1.35 3.95 4.25 4.25-2.9.3-3.95 1.35-4.25 4.25C7.7 7.35 6.65 6.3 3.75 6 6.65 5.7 7.7 4.65 8 1.75Z" />
        <path d="M12.5 10.25c.15 1.25.6 1.7 1.75 1.75-1.15.15-1.6.6-1.75 1.75-.15-1.15-.6-1.6-1.75-1.75 1.15-.05 1.6-.5 1.75-1.75Z" />
      </svg>
      <span dir="auto" title={label}>
        {label}
      </span>
    </div>
  ) : null;
}
function ReviewToolbar({ prefix, review }: PartProps) {
  const { allReviewed, pendingIndexes, history, undoButtonRef, decide, undo, navigate } =
    review;
  return (
    <div className={`${prefix}__bar`}>
      <div
        className={`${prefix}__layer`}
        data-show={!allReviewed || undefined}
        inert={allReviewed}
        aria-hidden={allReviewed || undefined}
      >
        <span className={`${prefix}__count`}>
          <span className={`${prefix}__num`}>{formatCount(pendingIndexes.length)}</span>
          <span className={`${prefix}__word`}>
            {pendingIndexes.length === 1 ? "suggestion" : "suggestions"}
          </span>
        </span>
        <span className={`${prefix}__actions`}>
          <span
            className={`${prefix}__nav`}
            onMouseDown={(event) => event.preventDefault()}
          >
            <button
              type="button"
              className={`${prefix}__icon`}
              onClick={() => navigate(-1)}
              disabled={!pendingIndexes.length}
              aria-label="Previous suggestion"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M10 12.5 5.5 8 10 3.5" />
              </svg>
            </button>
            <button
              type="button"
              className={`${prefix}__icon`}
              onClick={() => navigate(1)}
              disabled={!pendingIndexes.length}
              aria-label="Next suggestion"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M6 3.5 10.5 8 6 12.5" />
              </svg>
            </button>
          </span>
          <button
            type="button"
            className={`${prefix}__btn`}
            onClick={() => decide(pendingIndexes, "rejected")}
            disabled={!pendingIndexes.length}
          >
            Reject all
          </button>
          <button
            type="button"
            className={`${prefix}__btn ${prefix}__btn--primary`}
            onClick={() => decide(pendingIndexes, "accepted")}
            disabled={!pendingIndexes.length}
          >
            Accept all
          </button>
        </span>
      </div>
      <div
        className={`${prefix}__layer`}
        data-show={allReviewed || undefined}
        inert={!allReviewed}
        aria-hidden={!allReviewed || undefined}
      >
        <span className={`${prefix}__count ${prefix}__count--done`}>
          <svg className={`${prefix}__ok`} viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.75 8.4 6.6 11.1 12.25 5" pathLength={1} />
          </svg>
          All changes reviewed
        </span>
        <button
          ref={undoButtonRef}
          type="button"
          className={`${prefix}__btn`}
          onClick={() => undo(true)}
          disabled={!history.length}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5.5 4 2.75 6.75 5.5 9.5" />
            <path d="M3 6.75h6.5a3.75 3.75 0 0 1 0 7.5H7.5" />
          </svg>
          Undo
        </button>
      </div>
    </div>
  );
}
function DiffText({ prefix, review }: PartProps) {
  let changeIndex = -1;
  return (
    <p className={`${prefix}__text`} dir="auto">
      {review.segments.map((segment, segmentIndex) => {
        if (segment.type === "equal")
          return <span key={segmentIndex}>{segment.text}</span>;
        const index = ++changeIndex,
          state = review.decisions[index] ?? "pending",
          pending = state === "pending";
        return (
          <span
            key={segmentIndex}
            ref={(element) => {
              review.changeRefs.current[index] = element;
            }}
            className={`${prefix}__chg`}
            data-state={state}
            data-active={review.activeIndex === index || undefined}
            tabIndex={pending ? 0 : undefined}
            role={pending ? "button" : undefined}
            aria-label={
              pending
                ? `Suggestion ${formatCount(index + 1)} of ${formatCount(review.changeList.length)}: ${describeChange(segment)}. Press Y to accept, N to reject`
                : undefined
            }
            onKeyDown={
              pending ? (event) => review.handleChangeKeyDown(event, index) : undefined
            }
            onFocus={() => review.setFocusedIndex(index)}
            onBlur={() =>
              review.setFocusedIndex((previous) => (previous === index ? null : previous))
            }
            onMouseEnter={() => review.hover(index)}
            onMouseLeave={review.leave}
          >
            {segment.remove && (
              <del
                className={`${prefix}__del`}
                aria-hidden={state === "accepted" || undefined}
              >
                {segment.remove}
              </del>
            )}
            {segment.insert && (
              <ins
                className={`${prefix}__ins`}
                aria-hidden={state === "rejected" || undefined}
              >
                {segment.insert}
              </ins>
            )}
          </span>
        );
      })}
    </p>
  );
}
function InlineDiffView({ variant, ...props }: ViewProps) {
  const review = useInlineDiff(props),
    prefix = variant === "clean" ? "ui-dfc" : "ui-df",
    clean = variant === "clean";
  const { activeIndex, popoverPosition } = review;
  return (
    <div
      ref={review.rootRef}
      className={[prefix, props.className].filter(Boolean).join(" ")}
      data-done={review.allReviewed || undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape" && review.highlightedIndex !== null)
          review.setHighlightedIndex(null);
      }}
    >
      {!clean && <DiffLabel prefix={prefix} label={props.label} />}
      <div ref={review.cardRef} className={`${prefix}__card`}>
        {!clean && (
          <div className={`${prefix}__head`}>
            <ReviewToolbar prefix={prefix} review={review} />
          </div>
        )}
        <div className={`${prefix}__body`}>
          {clean && <DiffLabel prefix={prefix} label={props.label} />}
          <DiffText prefix={prefix} review={review} />
        </div>
        {clean && (
          <div className={`${prefix}__foot`}>
            <ReviewToolbar prefix={prefix} review={review} />
          </div>
        )}
        <div
          ref={review.popoverRef}
          className={`${prefix}__pop`}
          data-open={activeIndex !== null || undefined}
          data-snap={popoverPosition?.snap || undefined}
          data-below={popoverPosition?.below || undefined}
          style={
            popoverPosition
              ? { left: popoverPosition.left, top: popoverPosition.top }
              : undefined
          }
          role="group"
          aria-label="Review suggestion"
          aria-hidden={activeIndex === null || undefined}
          onMouseEnter={() => {
            if (activeIndex !== null) review.hover(activeIndex);
          }}
          onMouseLeave={review.leave}
          onMouseDown={(event) => event.preventDefault()}
        >
          <button
            type="button"
            tabIndex={-1}
            className={`${prefix}__pbtn${clean ? ` ${prefix}__pbtn--primary` : ""}`}
            aria-label="Accept suggestion"
            onClick={() => {
              if (activeIndex !== null)
                review.decide(
                  [activeIndex],
                  "accepted",
                  review.focusedIndex === activeIndex,
                );
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.75 8.4 6.6 11.1 12.25 5" />
            </svg>
            Accept<kbd>Y</kbd>
          </button>
          {!clean && <span className={`${prefix}__sep`} aria-hidden="true" />}
          <button
            type="button"
            tabIndex={-1}
            className={`${prefix}__pbtn`}
            aria-label="Reject suggestion"
            onClick={() => {
              if (activeIndex !== null)
                review.decide(
                  [activeIndex],
                  "rejected",
                  review.focusedIndex === activeIndex,
                );
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
            </svg>
            Reject<kbd>N</kbd>
          </button>
        </div>
      </div>
      <span className={`${prefix}__sr`} role="status" aria-live="polite">
        {review.announcement}
      </span>
    </div>
  );
}
// Keep words, combining marks, emoji sequences and flags intact when diffing.
const tokenPattern =
  /\s+|[\p{L}\p{M}\p{N}_'’]+|\p{Extended_Pictographic}[\u{1F3FB}-\u{1F3FF}\uFE0F\u20E3]*(?:\u200D\p{Extended_Pictographic}[\u{1F3FB}-\u{1F3FF}\uFE0F]*)*|\p{Regional_Indicator}{2}|[^\s\p{L}\p{N}_]\p{M}*/gu;
const isWhitespace = (text: string) => /^\s+$/.test(text);
const toText = (value: unknown) =>
  typeof value === "string" ? value : value == null ? "" : String(value);
const formatCount = (count: number) => count.toLocaleString("en-US");
const suggestionCount = (count: number) =>
  `${formatCount(count)} suggestion${count === 1 ? "" : "s"}`;
const quote = (text: string) => `“${text.trim()}”`;
export { InlineDiff };
export type { DiffSegment };
export type { InlineDiffHandle };
export type { InlineDiffProps };
