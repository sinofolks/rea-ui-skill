"use client";

import "./DecisionCard.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useLayoutEffect,
} from "react";
interface DecisionBlock {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  r?: number;
  tone?: string;
  [field: string]: unknown;
}
interface DecisionOption {
  id?: string;
  title?: string;
  summary?: string;
  recommended?: boolean;
  blocks?: DecisionBlock[];
  preview?: ReactNode;
  [field: string]: unknown;
}
interface Decision {
  id?: string;
  kind?: string;
  task?: string;
  question?: string;
  options?: DecisionOption[];
  facts?: {
    label?: string;
    value?: ReactNode;
    [field: string]: unknown;
  }[];
  [field: string]: unknown;
}
type DecisionAnswer =
  | "approve"
  | "decline"
  | {
      option?: string;
      text?: string;
      [field: string]: unknown;
    };
interface DecisionCardLabels {
  needsYou: string;
  later: string;
  show: string;
  recommended: string;
  approve: string;
  decline: string;
  own: string;
  send: string;
  answered: string;
  previous: string;
  next: string;
  allDone: string;
  waiting: (count: number) => string;
  of: (index: number, count: number) => string;
  [field: string]: unknown;
}
interface DecisionCardProps {
  decisions: Decision[];
  onDecide?: (id: string, answer: DecisionAnswer) => void;
  onLater?: (id: string) => void;
  defaultFolded?: boolean;
  reveal?: number;
  labels?: Partial<DecisionCardLabels>;
  className?: string;
}
interface AnswerOption extends DecisionOption {
  answer: DecisionAnswer;
}
interface DecisionPanelProps {
  decision: Decision;
  labels: DecisionCardLabels;
  count: number;
  index: number;
  pulse: boolean;
  draft: string;
  prefix: string;
  onDraft: (value: string) => void;
  onAnswer: (answer: DecisionAnswer) => void;
  onLater: () => void;
  onPage: (direction: number) => void;
}
type FocusTarget = "show" | "row" | "prev" | "next";
function DecisionCard(props: DecisionCardProps) {
  return <DecisionCardView {...props} clean={true} />;
}
function answerOptions(decision: Decision, labels: DecisionCardLabels): AnswerOption[] {
  if (decision.kind === "approval")
    return [
      { id: "approve", title: labels.approve, answer: "approve" },
      { id: "decline", title: labels.decline, answer: "decline" },
    ];
  return (decision.options ?? [])
    .slice(0, 5)
    .map((option) => ({ ...option, answer: { option: option.id } }));
}
function answerLabel(
  decision: Decision,
  answer: DecisionAnswer,
  labels: DecisionCardLabels,
): string {
  if (answer === "approve") return labels.approve;
  if (answer === "decline") return labels.decline;
  return answer.option
    ? (decision.options?.find((option) => option.id === answer.option)?.title ??
        answer.option)
    : (answer.text ?? "");
}
function PreviousIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 6C15 6 9 10.42 9 12C9 13.58 15 18 15 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
function NextIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6C9 6 15 10.42 15 12C15 13.58 9 18 9 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5.5V19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M18 11C18 11 13.58 5 12 5C10.42 5 6 11 6 11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}
function WirePreview({ blocks, prefix }: { blocks: DecisionBlock[]; prefix: string }) {
  return (
    <svg
      className={`${prefix}__wire`}
      viewBox="0 0 120 80"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect
        className={`${prefix}__wire-page`}
        x="0.5"
        y="0.5"
        width="119"
        height="79"
        rx="6"
      />
      {blocks.map((block, index) => (
        <rect
          data-tone={block.tone ?? "soft"}
          x={block.x}
          y={block.y}
          width={block.w}
          height={block.h}
          rx={block.r ?? 2}
          key={index}
        />
      ))}
    </svg>
  );
}
function DecisionPanel({
  decision,
  labels,
  count,
  index,
  pulse,
  draft,
  prefix,
  onDraft,
  onAnswer,
  onLater,
  onPage,
}: DecisionPanelProps) {
  const questionId = `${prefix}-q-${useId().replace(/:/g, "")}`;
  const options = answerOptions(decision, labels);
  const isPick = decision.kind === "pick";
  const [focusedIndex, setFocusedIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((option) => option.recommended),
    ),
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  function focusOption(nextIndex: number) {
    setFocusedIndex(nextIndex);
    panelRef.current
      ?.querySelector<HTMLButtonElement>(`[data-row="${nextIndex}"]`)
      ?.focus();
  }
  function submitDraft() {
    const text = draft.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }
    onAnswer({ text });
  }
  function onPanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.nativeEvent.isComposing)
      return;
    if (event.key === "Escape") {
      event.preventDefault();
      onLater();
      return;
    }
    if (
      !(event.target instanceof Element) ||
      event.target.getAttribute("role") !== "option"
    )
      return;
    const shortcut = Number(event.key);
    if (shortcut >= 1 && shortcut <= options.length) {
      event.preventDefault();
      onAnswer(options[shortcut - 1].answer);
      return;
    }
    if (
      shortcut === options.length + 1 ||
      (event.key === "ArrowDown" && focusedIndex === options.length - 1)
    ) {
      event.preventDefault();
      inputRef.current?.focus();
      return;
    }
    const forwardKeys = isPick ? ["ArrowRight", "ArrowDown"] : ["ArrowDown"];
    const backwardKeys = isPick ? ["ArrowLeft", "ArrowUp"] : ["ArrowUp"];
    if (forwardKeys.includes(event.key)) {
      event.preventDefault();
      focusOption(Math.min(options.length - 1, focusedIndex + 1));
    } else if (backwardKeys.includes(event.key)) {
      event.preventDefault();
      focusOption(Math.max(0, focusedIndex - 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      focusOption(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusOption(options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onAnswer(options[focusedIndex].answer);
    }
  }
  const gridStyle: CSSProperties & {
    "--ui-dc-cols"?: number;
    "--ui-dcc-cols"?: number;
  } = { [`--${prefix}-cols`]: Math.max(3, options.length) };
  return (
    <div
      ref={panelRef}
      className={`${prefix}__box`}
      role="group"
      aria-labelledby={questionId}
      data-pulse={pulse || undefined}
      onKeyDown={onPanelKeyDown}
    >
      <div className={`${prefix}__head`}>
        <span className={`${prefix}__badge`}>{labels.needsYou}</span>
        <span className={`${prefix}__task`} dir="auto">
          {decision.task}
        </span>
        <span className={`${prefix}__tools`}>
          {count > 1 && (
            <span className={`${prefix}__pager`}>
              <button
                type="button"
                className={`${prefix}__page`}
                data-step="prev"
                aria-label={labels.previous}
                onClick={() => onPage(-1)}
              >
                <PreviousIcon />
              </button>
              <span
                className={`${prefix}__num ${prefix}__count`}
                style={{ minWidth: `${labels.of(count, count).length}ch` }}
              >
                {labels.of(index + 1, count)}
              </span>
              <button
                type="button"
                className={`${prefix}__page`}
                data-step="next"
                aria-label={labels.next}
                onClick={() => onPage(1)}
              >
                <NextIcon />
              </button>
            </span>
          )}
          <button
            type="button"
            className={`${prefix}__link`}
            aria-keyshortcuts="Escape"
            onClick={onLater}
          >
            {labels.later}
          </button>
        </span>
      </div>
      <div className={`${prefix}__body`}>
        <p id={questionId} className={`${prefix}__q`} dir="auto">
          {decision.question}
        </p>
        {decision.facts && decision.facts.length > 0 && (
          <dl className={`${prefix}__facts`}>
            {decision.facts.slice(0, 3).map((fact, factIndex) => (
              <div key={factIndex}>
                <dt title={fact.label}>{fact.label}</dt>
                <dd dir="auto">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div
          className={isPick ? `${prefix}__tiles` : `${prefix}__rows`}
          role="listbox"
          aria-labelledby={questionId}
          aria-orientation={isPick ? "horizontal" : "vertical"}
          data-many={isPick && options.length > 3 ? "" : undefined}
          style={isPick ? gridStyle : undefined}
        >
          {options.map((option, optionIndex) => (
            <button
              type="button"
              role="option"
              className={isPick ? `${prefix}__tile` : `${prefix}__opt`}
              data-row={optionIndex}
              aria-selected={optionIndex === focusedIndex}
              aria-keyshortcuts={String(optionIndex + 1)}
              tabIndex={optionIndex === focusedIndex ? 0 : -1}
              onFocus={() => setFocusedIndex(optionIndex)}
              onClick={() => onAnswer(option.answer)}
              key={option.id}
            >
              {isPick && (
                <span className={`${prefix}__frame`} aria-hidden="true">
                  {option.preview ??
                    (option.blocks ? (
                      <WirePreview blocks={option.blocks} prefix={prefix} />
                    ) : null)}
                </span>
              )}
              {isPick && option.recommended && (
                <span className={`${prefix}__tag ${prefix}__tag--tile`}>
                  {labels.recommended}
                </span>
              )}
              <span className={`${prefix}__row`}>
                <span className={`${prefix}__key ${prefix}__num`} aria-hidden="true">
                  {optionIndex + 1}
                </span>
                <span className={`${prefix}__text`}>
                  <span className={`${prefix}__title`} dir="auto">
                    {option.title}
                  </span>
                  {!isPick && option.summary && (
                    <span className={`${prefix}__summary`} dir="auto">
                      {option.summary}
                    </span>
                  )}
                </span>
                {option.recommended && (
                  <span className={`${prefix}__tag ${prefix}__tag--row`}>
                    {labels.recommended}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
        <div
          className={`${prefix}__own`}
          onClick={(event) => {
            if (event.target === event.currentTarget) inputRef.current?.focus();
          }}
        >
          <span className={`${prefix}__key ${prefix}__num`} aria-hidden="true">
            {options.length + 1}
          </span>
          <input
            ref={inputRef}
            className={`${prefix}__input`}
            value={draft}
            placeholder={labels.own}
            aria-label={`${labels.own.replace(/…$/, "")}: ${decision.question}`}
            aria-keyshortcuts={String(options.length + 1)}
            dir="auto"
            onChange={(event) => onDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing) return;
              if (event.key === "Enter") {
                event.preventDefault();
                submitDraft();
              } else if (event.key === "ArrowUp" && !draft) {
                event.preventDefault();
                focusOption(options.length - 1);
              }
            }}
          />
          <button
            type="button"
            className={`${prefix}__send`}
            aria-label={labels.send}
            title={labels.send}
            aria-disabled={!draft.trim() || undefined}
            data-shown={draft.trim() ? "" : undefined}
            tabIndex={draft.trim() ? 0 : -1}
            onClick={submitDraft}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
function useDecisionQueue(
  {
    decisions,
    labels,
    defaultFolded = false,
    reveal,
    onDecide,
    onLater,
  }: DecisionCardProps,
  prefix: string,
) {
  const text = { ...defaultLabels, ...labels };
  const [answeredIds, setAnsweredIds] = useState(() => new Set<string | undefined>());
  useEffect(() => {
    setAnsweredIds((previous) => {
      if (!previous.size) return previous;
      const currentIds = new Set(decisions.map((decision) => decision.id));
      const retainedIds = new Set([...previous].filter((id) => currentIds.has(id)));
      return retainedIds.size === previous.size ? previous : retainedIds;
    });
  }, [decisions]);
  const pending = decisions.filter((decision) => !answeredIds.has(decision.id));
  const [selectedId, setSelectedId] = useState<string | undefined | null>(null);
  const [folded, setFolded] = useState(defaultFolded);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [pulse, setPulse] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const selectedIndex = Math.max(
    0,
    pending.findIndex((decision) => decision.id === selectedId),
  );
  const activeDecision = pending[selectedIndex] ?? null;
  const lastDecision = useRef(activeDecision);
  if (activeDecision) lastDecision.current = activeDecision;
  const displayedDecision = activeDecision ?? lastDecision.current;
  const mode = activeDecision ? (folded ? "min" : "full") : "none";
  const rootRef = useRef<HTMLDivElement>(null);
  const nextFocus = useRef<FocusTarget | null>(null);
  const containedFocus = useRef(false);
  containedFocus.current =
    typeof document !== "undefined" &&
    Boolean(rootRef.current?.contains(document.activeElement));
  function announce(message: string) {
    // Alter repeated announcements so the live region announces them again.
    setAnnouncement((previous) => (previous === message ? `${message} ` : message));
  }
  useLayoutEffect(() => {
    const restoreFocus =
      containedFocus.current &&
      mode !== "none" &&
      (!document.activeElement || document.activeElement === document.body);
    const target =
      nextFocus.current ?? (restoreFocus ? (mode === "min" ? "show" : "row") : null);
    nextFocus.current = null;
    if (!target) return;
    const root = rootRef.current;
    const showButton =
      target === "show" ? root?.querySelector<HTMLElement>(`.${prefix}__show`) : null;
    const pageButton =
      target === "prev" || target === "next"
        ? root?.querySelector<HTMLElement>(`.${prefix}__page[data-step="${target}"]`)
        : null;
    const answer = root?.querySelector<HTMLElement>(
      `[role="option"][tabindex="0"], .${prefix}__input`,
    );
    (showButton || pageButton || answer)?.focus({ preventScroll: true });
  });
  const previousReveal = useRef(reveal);
  useEffect(() => {
    if (reveal === previousReveal.current) return;
    previousReveal.current = reveal;
    setFolded(false);
    nextFocus.current = "row";
    setPulse(true);
    const timer = window.setTimeout(() => setPulse(false), 700);
    return () => window.clearTimeout(timer);
  }, [reveal]);
  function decide(decision: Decision, answer: DecisionAnswer) {
    const remainingCount = pending.length - 1;
    const nextDecision = pending[selectedIndex + 1] ?? pending[selectedIndex - 1] ?? null;
    setAnsweredIds((previous) => new Set(previous).add(decision.id));
    setSelectedId(nextDecision?.id ?? null);
    setDrafts((previous) => {
      const nextDrafts = { ...previous };
      delete nextDrafts[String(decision.id)];
      return nextDrafts;
    });
    announce(
      `${text.answered}: ${answerLabel(decision, answer, text)}. ${remainingCount ? text.waiting(remainingCount) : text.allDone}`,
    );
    onDecide?.(decision.id!, answer);
  }
  function show() {
    setFolded(false);
    nextFocus.current = "row";
  }
  function postpone() {
    if (!activeDecision) return;
    setFolded(true);
    nextFocus.current = "show";
    announce(`${text.later} – ${text.waiting(pending.length)}`);
    onLater?.(activeDecision.id!);
  }
  function changePage(direction: number) {
    if (pending.length < 2) return;
    if (rootRef.current?.contains(document.activeElement))
      nextFocus.current = direction < 0 ? "prev" : "next";
    setSelectedId(
      pending[(selectedIndex + direction + pending.length) % pending.length].id,
    );
  }
  function updateDraft(value: string) {
    if (displayedDecision)
      setDrafts((previous) => ({
        ...previous,
        [String(displayedDecision.id)]: value,
      }));
  }
  return {
    text,
    pending,
    displayedDecision,
    selectedIndex,
    pulse,
    announcement,
    mode,
    rootRef,
    show,
    postpone,
    changePage,
    decide,
    updateDraft,
    draft: displayedDecision ? (drafts[String(displayedDecision.id)] ?? "") : "",
  };
}
function DecisionCardView({
  clean = false,
  ...props
}: DecisionCardProps & {
  clean?: boolean;
}) {
  const prefix = clean ? "ui-dcc" : "ui-dc";
  const {
    text,
    pending,
    displayedDecision,
    selectedIndex,
    pulse,
    announcement,
    mode,
    rootRef,
    show,
    postpone,
    changePage,
    decide,
    updateDraft,
    draft,
  } = useDecisionQueue(props, prefix);
  return (
    <div
      ref={rootRef}
      className={[prefix, props.className].filter(Boolean).join(" ")}
      data-mode={mode}
    >
      <span className={`${prefix}__sr`} role="status" aria-live="polite">
        {announcement}
      </span>
      <div className={`${prefix}__wrap`} inert={mode === "none"}>
        <div className={`${prefix}__inner`}>
          {mode === "min" ? (
            <div className={`${prefix}__box ${prefix}__box--min`}>
              <div className={`${prefix}__head`}>
                <span className={`${prefix}__badge`}>{text.needsYou}</span>
                <span className={`${prefix}__task ${prefix}__num`}>
                  {text.waiting(pending.length)}
                </span>
                <span className={`${prefix}__tools`}>
                  <button
                    type="button"
                    className={`${prefix}__link ${prefix}__show`}
                    onClick={show}
                  >
                    {text.show}
                  </button>
                </span>
              </div>
            </div>
          ) : displayedDecision ? (
            <DecisionPanel
              decision={displayedDecision}
              labels={text}
              count={pending.length}
              index={selectedIndex}
              pulse={pulse}
              draft={draft}
              prefix={prefix}
              onDraft={updateDraft}
              onAnswer={(answer) => decide(displayedDecision, answer)}
              onLater={postpone}
              onPage={changePage}
              key={displayedDecision.id}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
const defaultLabels: DecisionCardLabels = {
  needsYou: "Needs you",
  later: "Later",
  show: "Show",
  recommended: "Recommended",
  approve: "Approve",
  decline: "Decline",
  own: "Something else…",
  send: "Send",
  answered: "Answered",
  previous: "Previous decision",
  next: "Next decision",
  allDone: "Nothing else waits",
  waiting: (count) =>
    count === 1
      ? "1 decision waiting"
      : `${count.toLocaleString("en-US")} decisions waiting`,
  of: (index, count) => `${index} of ${count}`,
};
export { DecisionCard };
export type { DecisionCardProps };
export type { Decision };
export type { DecisionAnswer };
export type { DecisionCardLabels };
export type { DecisionOption };
export type { DecisionBlock };
