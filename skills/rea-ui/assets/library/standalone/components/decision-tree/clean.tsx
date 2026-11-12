"use client";

import "./DecisionTree.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type Ref,
  type CSSProperties,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
interface DecisionNote {
  text: string;
  note?: string;
  source?: string;
  [field: string]: unknown;
}
type DecisionEffect = string | Array<string | DecisionNote>;
interface DecisionOption {
  id?: string;
  name?: string;
  label?: string;
  pick?: boolean;
  icon?: ReactNode;
  apps?: ReactNode[];
  effects?: DecisionEffect[];
  next?: {
    question?: string;
    options: DecisionOption[];
    [field: string]: unknown;
  };
  [field: string]: unknown;
}
interface Decision {
  id?: string;
  question?: string;
  context?: string;
  agent?: string;
  model?: string;
  icon?: ReactNode;
  risk?: "high" | "medium" | "low";
  options?: DecisionOption[];
  [field: string]: unknown;
}
type DecisionChoice =
  | {
      other: string;
    }
  | {
      index: number;
      option: DecisionOption;
      then?: {
        index: number;
        option: DecisionOption;
      };
    };
interface DecisionTreeHandle {
  hover(index: number | null): void;
  choose(index: number): void;
  setOther(text: string): void;
  send(): void;
  next(): void;
  previous(): void;
  peek(index: number | null): void;
}
interface DecisionTreeProps {
  decisions: Decision[];
  onChoose?: (
    decision: Decision,
    choice: DecisionChoice,
  ) => string | void | Promise<string | void>;
  allowOther?: boolean;
  title?: string;
  ref?: Ref<DecisionTreeHandle>;
  className?: string;
}
type DecisionStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};
interface DecisionResult {
  id?: string;
  optionIndex: number;
  nextIndex?: number;
  other?: string;
  answer?: string;
  leaving?: boolean;
}
interface DecisionLink {
  id: string;
  branch: number;
  sub?: number;
  kind: "branch" | "leaf" | "sub" | "out";
  path: string;
}
interface NodeBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  height: number;
}
type DecisionTreeController = ReturnType<typeof useDecisionTree>;
function DecisionTree(props: DecisionTreeProps) {
  return <DecisionTreeView {...props} clean />;
}
function CheckIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M5 14L8.5 17.5L19 6.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
    </svg>
  );
}
function RiskIcon() {
  return (
    <svg
      width={`14`}
      height={`14`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
      <path
        d={`M12 9V13`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
      <path
        d={`M12 16.8V17`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2.4`}
      />
    </svg>
  );
}
function BranchIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 16 16`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <circle cx={`3.5`} cy={`8`} r={`2`} stroke={`currentColor`} strokeWidth={`1.4`} />
      <circle
        cx={`12.5`}
        cy={`3.5`}
        r={`2`}
        stroke={`currentColor`}
        strokeWidth={`1.4`}
      />
      <circle
        cx={`12.5`}
        cy={`12.5`}
        r={`2`}
        stroke={`currentColor`}
        strokeWidth={`1.4`}
      />
      <path
        d={`M5.5 8H7.5C8.3 8 8.5 7.6 8.5 6.8V5C8.5 4 9 3.5 10 3.5H10.5M8.5 8.2V11C8.5 12 9 12.5 10 12.5H10.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeWidth={`1.4`}
      />
    </svg>
  );
}
function CompleteIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z`}
        stroke={`currentColor`}
        strokeWidth={`1.6`}
      />
      <path
        d={`M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.6`}
      />
    </svg>
  );
}
function initial(name: string = ""): string {
  return (name.match(/[\p{L}\p{N}]/u)?.[0] ?? "").toUpperCase() || "AI";
}
function effectParts(effect: DecisionEffect | undefined): Array<string | DecisionNote> {
  return effect === undefined ? [] : typeof effect === "string" ? [effect] : effect;
}
function decisionKeys(decisions: Decision[]): Map<Decision, string | undefined> {
  const keys = new Map<Decision, string | undefined>(),
    counts = new Map<string | undefined, number>();
  for (const decision of decisions) {
    const count = counts.get(decision.id) ?? 0;
    counts.set(decision.id, count + 1);
    keys.set(decision, count ? `${decision.id}#${count}` : decision.id);
  }
  return keys;
}
function decisionNotes(decision: Decision | undefined, clean: boolean): DecisionNote[] {
  if (!decision) return [];
  const effects = (decision.options ?? []).flatMap((option) =>
    clean && option.next
      ? option.next.options.flatMap((child) => child.effects ?? [])
      : (option.effects ?? []),
  );
  return effects
    .flatMap(effectParts)
    .filter((part): part is DecisionNote => typeof part !== "string");
}
function horizontalLink(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): string {
  const delta = endY - startY;
  if (Math.abs(delta) < 2) return `M${startX} ${startY}H${endX}`;
  const bend = Math.round(startX + (endX - startX) / 2),
    radius = Math.min(8, Math.abs(delta) / 2, (endX - startX) / 2),
    direction = Math.sign(delta);
  return `M${startX} ${startY}H${bend - radius}Q${bend} ${startY} ${bend} ${startY + direction * radius}V${endY - direction * radius}Q${bend} ${endY} ${bend + radius} ${endY}H${endX}`;
}
function verticalLink(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): string {
  if (endX - startX < 2) return `M${startX} ${startY}V${endY}`;
  const radius = Math.min(8, (endY - startY) / 2, (endX - startX) / 2);
  return `M${startX} ${startY}V${endY - radius}Q${startX} ${endY} ${startX + radius} ${endY}H${endX}`;
}
function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function useDecisionTree(
  { decisions, onChoose, allowOther = true, ref }: DecisionTreeProps,
  clean: boolean,
) {
  const tooltipId = `${useId()}-tip`,
    rootRef = useRef<HTMLDivElement>(null),
    bodyRef = useRef<HTMLDivElement>(null),
    treeRef = useRef<HTMLDivElement>(null),
    tooltipRef = useRef<HTMLDivElement>(null),
    inputRef = useRef<HTMLTextAreaElement>(null),
    growRef = useRef<HTMLDivElement>(null),
    mirrorRef = useRef<HTMLSpanElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLElement>()),
    noteRefs = useRef(new Map<number, HTMLElement>()),
    timers = useRef<number[]>([]);
  function schedule(callback: () => void, delay: number) {
    timers.current.push(window.setTimeout(callback, delay));
  }
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  const registerNode = (key: string) => (element: HTMLElement | null) => {
    if (element) nodeRefs.current.set(key, element);
    else nodeRefs.current.delete(key);
  };
  const [answered, setAnswered] = useState<Record<string, boolean>>({}),
    [selectedKey, setSelectedKey] = useState<string | null | undefined>(null),
    [hoveredIndex, setHoveredIndex] = useState<number | null>(null),
    [result, setResult] = useState<DecisionResult | null>(null),
    [otherOpen, setOtherOpen] = useState(false),
    [draft, setDraft] = useState(""),
    [focusedNote, setFocusedNote] = useState<number | null>(null),
    [hoveredNote, setHoveredNote] = useState<number | null>(null),
    [pressedKey, setPressedKey] = useState<string | null>(null),
    [announcement, setAnnouncement] = useState(""),
    [narrow, setNarrow] = useState(false);
  const keys = decisionKeys(decisions),
    getKey = (decision: Decision) => keys.get(decision) ?? decision.id;
  const pending = decisions.filter((decision) => !answered[String(getKey(decision))]),
    lastIndex = useRef(0),
    foundIndex = pending.findIndex((decision) => getKey(decision) === selectedKey),
    activeIndex =
      foundIndex >= 0 ? foundIndex : Math.min(lastIndex.current, pending.length - 1),
    active = activeIndex >= 0 ? pending[activeIndex] : undefined;
  useLayoutEffect(() => {
    lastIndex.current = Math.max(0, activeIndex);
    if (active && getKey(active) !== selectedKey) setSelectedKey(getKey(active));
  });
  useLayoutEffect(() => {
    setHoveredIndex(null);
    setResult(null);
    setOtherOpen(false);
    setDraft("");
    setFocusedNote(null);
    setHoveredNote(null);
  }, [active && getKey(active)]);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    setNarrow(root.clientWidth < 640);
    const observer = new ResizeObserver(() => setNarrow(root.clientWidth < 640));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  function press(key: string) {
    setPressedKey(key);
    schedule(() => setPressedKey((current) => (current === key ? null : current)), 220);
  }
  function finish(decision: Decision, delay: number) {
    const transition = reducedMotion() ? 0 : 280;
    schedule(
      () =>
        setResult((current) =>
          current && current.id === getKey(decision)
            ? { ...current, leaving: true }
            : current,
        ),
      delay,
    );
    schedule(() => {
      setAnswered((current) => ({
        ...current,
        [String(getKey(decision))]: true,
      }));
      if (rootRef.current?.contains(document.activeElement))
        requestAnimationFrame(() => rootRef.current?.focus({ preventScroll: true }));
    }, delay + transition);
  }
  const nextQuestion =
    clean &&
    active &&
    result &&
    result.id === getKey(active) &&
    result.other === undefined &&
    result.nextIndex === undefined
      ? active.options?.[result.optionIndex]?.next
      : undefined;
  function choose(index: number) {
    if (!active) return;
    const decision = active,
      options = decision.options ?? [],
      agent = decision.agent?.trim() ?? "";
    if (nextQuestion && result) {
      const option = nextQuestion.options[index];
      if (!option) return;
      press(`sopt:${result.optionIndex}:${index}`);
      setHoveredIndex(null);
      setFocusedNote(null);
      setResult({ ...result, nextIndex: index });
      setAnnouncement(`${option.label} – picked. ${agent || "The agent"} goes ahead.`);
      onChoose?.(decision, {
        index: result.optionIndex,
        option: options[result.optionIndex],
        then: { index, option },
      });
      finish(decision, 1500);
      return;
    }
    if (result) return;
    if (allowOther && index === options.length) {
      press("other");
      setOtherOpen(true);
      setHoveredIndex(index);
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
      return;
    }
    const option = options[index];
    if (!option) return;
    press(`opt:${index}`);
    setHoveredIndex(null);
    setFocusedNote(null);
    setResult({ id: getKey(decision), optionIndex: index });
    if (clean && option.next) {
      setAnnouncement(`${option.label} – picked. Next: ${option.next.question}`);
      return;
    }
    setAnnouncement(`${option.label} – picked. ${agent || "The agent"} goes ahead.`);
    onChoose?.(decision, { index, option });
    finish(decision, 1500);
  }
  function send() {
    const text = draft.trim();
    if (!active || !text || result) return;
    const decision = active,
      agent = decision.agent?.trim() ?? "";
    press("send");
    setResult({
      id: getKey(decision),
      optionIndex: decision.options?.length ?? 0,
      other: text,
    });
    setAnnouncement(`Sent to the ${(agent || "Agent").toLowerCase()}: ${text}`);
    Promise.resolve(onChoose?.(decision, { other: text })).then((response) => {
      schedule(() => {
        const answer = response || "Got it – I'll take it from here.";
        setResult((current) =>
          current && current.id === getKey(decision) ? { ...current, answer } : current,
        );
        setAnnouncement(`${agent || "Agent"}: ${answer}`);
      }, 700);
      finish(decision, 2600);
    });
  }
  function changePage(direction: number) {
    if (pending.length < 2 || !active || result) return;
    setSelectedKey(
      getKey(pending[(activeIndex + direction + pending.length) % pending.length]),
    );
  }
  const notes = decisionNotes(active, clean);
  function cycleNote() {
    if (notes.length)
      setFocusedNote((current) =>
        current === null ? 0 : current + 1 >= notes.length ? null : current + 1,
      );
  }
  useImperativeHandle(ref, () => ({
    hover(index) {
      if (!result || nextQuestion) setHoveredIndex(index);
    },
    choose,
    setOther(text) {
      if (!otherOpen) setOtherOpen(true);
      setDraft(text);
    },
    send,
    next() {
      changePage(1);
    },
    previous() {
      changePage(-1);
    },
    peek: setFocusedNote,
  }));
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      !active ||
      (event.target instanceof Element && event.target.closest("textarea, input")) ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    )
      return;
    const number = Number(event.key),
      count = nextQuestion
        ? nextQuestion.options.length
        : (active.options?.length ?? 0) + Number(Boolean(allowOther));
    if (number >= 1 && number <= count) {
      event.preventDefault();
      choose(number - 1);
      return;
    }
    switch (event.key.toLowerCase()) {
      case "arrowright":
      case "j":
        changePage(1);
        break;
      case "arrowleft":
      case "k":
        changePage(-1);
        break;
      case "f":
        cycleNote();
        break;
      case "escape":
        if (focusedNote === null) setOtherOpen(false);
        else setFocusedNote(null);
        break;
      default:
        return;
    }
    event.preventDefault();
  }
  const noteIndex = hoveredNote ?? focusedNote,
    notesEnabled = !result || Boolean(nextQuestion),
    note = noteIndex !== null && notesEnabled ? notes[noteIndex] : undefined;
  return {
    tooltipId,
    rootRef,
    bodyRef,
    treeRef,
    tooltipRef,
    inputRef,
    growRef,
    mirrorRef,
    nodeRefs,
    noteRefs,
    registerNode,
    answered,
    pending,
    activeIndex,
    active,
    getKey,
    hoveredIndex,
    setHoveredIndex,
    result,
    otherOpen,
    setOtherOpen,
    draft,
    setDraft,
    focusedNote,
    setFocusedNote,
    hoveredNote,
    setHoveredNote,
    pressedKey,
    announcement,
    narrow,
    nextQuestion,
    choose,
    send,
    onKeyDown,
    noteIndex,
    notesEnabled,
    note,
    allowOther,
    clean,
  };
}
function renderDecisionEffect(
  effect: DecisionEffect,
  controller: DecisionTreeController,
  prefix: string,
  counter: {
    index: number;
  },
) {
  const { noteIndex, notesEnabled, noteRefs, tooltipId, setHoveredNote, setFocusedNote } =
    controller;
  return effectParts(effect).map((part, key) => {
    if (typeof part === "string") return <span key={key}>{part}</span>;
    const index = counter.index++,
      active = noteIndex === index && notesEnabled;
    return (
      <mark
        ref={(element) => {
          if (element) noteRefs.current.set(index, element);
          else noteRefs.current.delete(index);
        }}
        className={`${prefix}__flag`}
        data-on={active ? "" : undefined}
        tabIndex={0}
        aria-label={`${part.text} – the agent is unsure`}
        aria-describedby={active ? tooltipId : undefined}
        onMouseEnter={() => setHoveredNote(index)}
        onMouseLeave={() =>
          setHoveredNote((current) => (current === index ? null : current))
        }
        onFocus={() => setFocusedNote(index)}
        onBlur={() => setFocusedNote((current) => (current === index ? null : current))}
        key={key}
      >
        {part.text}
      </mark>
    );
  });
}
function DecisionApps({
  apps,
  prefix,
}: {
  apps: ReactNode[] | undefined;
  prefix: string;
}) {
  return (
    Boolean(apps?.length) && (
      <span className={`${prefix}__apps`} aria-hidden="true">
        {apps?.map((app, index) => (
          <span className={`${prefix}__app`} key={index}>
            {app}
          </span>
        ))}
      </span>
    )
  );
}
function OptionLabel({
  option,
  prefix,
  clean,
}: {
  option: DecisionOption;
  prefix: string;
  clean: boolean;
}) {
  return clean ? (
    <span className={`${prefix}__label`}>
      {option.icon && (
        <span className={`${prefix}__icon`} aria-hidden="true">
          {option.icon}
        </span>
      )}
      <span className={`${prefix}__label-text`} dir="auto">
        {option.label}
      </span>
    </span>
  ) : (
    <span className={`${prefix}__label`} dir="auto">
      {option.label}
    </span>
  );
}
function DecisionBranches({
  controller,
  prefix,
}: {
  controller: DecisionTreeController;
  prefix: string;
}) {
  const {
    active,
    registerNode,
    result,
    hoveredIndex,
    setHoveredIndex,
    otherOpen,
    setOtherOpen,
    draft,
    setDraft,
    pressedKey,
    choose,
    send,
    allowOther,
    clean,
    rootRef,
    growRef,
    mirrorRef,
    inputRef,
    nextQuestion,
  } = controller;
  if (!active) return null;
  const options = active.options ?? [],
    counter = { index: 0 };
  const dim = (index: number) =>
    result
      ? result.optionIndex !== index
      : hoveredIndex !== null && hoveredIndex !== index;
  const hot = (index: number) =>
    result ? result.optionIndex === index : hoveredIndex === index;
  const live = (index: number) =>
    Boolean(result) && result?.optionIndex === index && result.other === undefined;
  const soft = (index: number, sub: number) =>
    live(index) &&
    (result?.nextIndex === undefined
      ? hoveredIndex !== null && hoveredIndex !== sub
      : result.nextIndex !== sub);
  const subHot = (index: number, sub: number) =>
    live(index) &&
    (result?.nextIndex === undefined ? hoveredIndex === sub : result.nextIndex === sub);
  return (
    <div
      className={`${prefix}__branches`}
      role="group"
      aria-label="How should the agent go on?"
    >
      {options.map((option, index) => {
        const style: DecisionStyle = { "--i": index };
        return (
          <div
            className={`${prefix}__row`}
            data-dim={dim(index) ? "" : undefined}
            style={style}
            onMouseEnter={() => {
              if (!result) setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              if (!result && !otherOpen) setHoveredIndex(null);
            }}
            key={index}
          >
            <button
              ref={registerNode(`opt:${index}`)}
              type="button"
              className={`${prefix}__opt`}
              data-pick={option.pick ? "" : undefined}
              data-hot={hot(index) ? "" : undefined}
              data-pressed={pressedKey === `opt:${index}` ? "" : undefined}
              disabled={Boolean(result)}
              aria-keyshortcuts={index < 9 ? String(index + 1) : undefined}
              aria-label={`${option.label}${option.pick ? " – the agent's pick" : ""}`}
              onClick={() => choose(index)}
            >
              <kbd className={`${prefix}__kbd`} data-off={index > 8 ? "" : undefined}>
                {index + 1}
              </kbd>
              <OptionLabel option={option} prefix={prefix} clean={clean} />
              {option.pick && <span className={`${prefix}__pick`}>Agent's pick</span>}
            </button>
            {clean && option.next ? (
              <div
                className={`${prefix}__sub`}
                data-live={live(index) ? "" : undefined}
                data-asking={live(index) && nextQuestion ? "" : undefined}
              >
                <div
                  ref={registerNode(`subq:${index}`)}
                  className={`${prefix}__subq`}
                  dir="auto"
                >
                  {option.next.question}
                  <span className={`${prefix}__more`}>
                    {option.next.options.length}
                    {" options"}
                  </span>
                </div>
                <div
                  className={`${prefix}__subopts`}
                  role="group"
                  aria-label={option.next.question}
                >
                  {option.next.options.map((sub, subIndex) => {
                    const enabled = live(index) && Boolean(nextQuestion),
                      style: DecisionStyle = { "--j": subIndex };
                    return (
                      <button
                        ref={registerNode(`sopt:${index}:${subIndex}`)}
                        type="button"
                        className={`${prefix}__sopt`}
                        data-pick={option.pick && sub.pick ? "" : undefined}
                        data-hot={subHot(index, subIndex) ? "" : undefined}
                        data-soft={soft(index, subIndex) ? "" : undefined}
                        data-pressed={
                          pressedKey === `sopt:${index}:${subIndex}` ? "" : undefined
                        }
                        style={style}
                        disabled={!enabled}
                        tabIndex={enabled ? undefined : -1}
                        aria-keyshortcuts={enabled ? String(subIndex + 1) : undefined}
                        aria-label={`${sub.label}${option.pick && sub.pick ? " – the agent's pick" : ""}`}
                        onMouseEnter={() => {
                          if (enabled) setHoveredIndex(subIndex);
                        }}
                        onMouseLeave={() => {
                          if (enabled) setHoveredIndex(null);
                        }}
                        onClick={() => choose(subIndex)}
                        key={subIndex}
                      >
                        <span className={`${prefix}__sopt-top`}>
                          {enabled && (
                            <kbd className={`${prefix}__kbd`}>{subIndex + 1}</kbd>
                          )}
                          <OptionLabel option={sub} prefix={prefix} clean />
                          {option.pick && sub.pick && (
                            <span className={`${prefix}__pick`}>Agent's pick</span>
                          )}
                        </span>
                        {(Boolean(sub.effects?.length) || Boolean(sub.apps?.length)) && (
                          <span className={`${prefix}__sopt-effects`}>
                            <span className={`${prefix}__lines`}>
                              {(sub.effects ?? []).map((effect, effectIndex) => (
                                <span
                                  className={`${prefix}__effect`}
                                  dir="auto"
                                  key={effectIndex}
                                >
                                  {renderDecisionEffect(
                                    effect,
                                    controller,
                                    prefix,
                                    counter,
                                  )}
                                </span>
                              ))}
                            </span>
                            <DecisionApps apps={sub.apps} prefix={prefix} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              (Boolean(option.effects?.length) ||
                (clean && Boolean(option.apps?.length))) && (
                <div ref={registerNode(`leaf:${index}`)} className={`${prefix}__leaf`}>
                  {clean ? (
                    <>
                      <span className={`${prefix}__lines`}>
                        {(option.effects ?? []).map((effect, effectIndex) => (
                          <span
                            className={`${prefix}__effect`}
                            dir="auto"
                            key={effectIndex}
                          >
                            {renderDecisionEffect(effect, controller, prefix, counter)}
                          </span>
                        ))}
                      </span>
                      <DecisionApps apps={option.apps} prefix={prefix} />
                    </>
                  ) : (
                    (option.effects ?? []).map((effect, effectIndex) => (
                      <span className={`${prefix}__effect`} dir="auto" key={effectIndex}>
                        {renderDecisionEffect(effect, controller, prefix, counter)}
                      </span>
                    ))
                  )}
                </div>
              )
            )}
          </div>
        );
      })}
      {allowOther && (
        <div
          className={`${prefix}__row`}
          data-dim={dim(options.length) ? "" : undefined}
          style={{ "--i": options.length } as DecisionStyle}
          onMouseEnter={() => {
            if (!result) setHoveredIndex(options.length);
          }}
          onMouseLeave={() => {
            if (!result && !otherOpen) setHoveredIndex(null);
          }}
        >
          <div
            ref={registerNode(`opt:${options.length}`)}
            className={`${prefix}__opt`}
            data-other=""
            data-open={otherOpen || result?.other ? "" : undefined}
            data-hot={hot(options.length) ? "" : undefined}
          >
            {result?.other ? (
              <span className={`${prefix}__said`} dir="auto">
                {result.other}
              </span>
            ) : otherOpen ? (
              <div ref={growRef} className={`${prefix}__grow`}>
                <span ref={mirrorRef} className={`${prefix}__mirror`} aria-hidden="true">
                  {draft || "Tell the agent what to do instead…"}
                  {"​"}
                </span>
                <textarea
                  ref={inputRef}
                  className={`${prefix}__input`}
                  value={draft}
                  rows={2}
                  placeholder="Tell the agent what to do instead…"
                  aria-label={`Your own instruction for the ${(active.agent?.trim() || "Agent").toLowerCase()} – Enter sends, Shift+Enter for a new line`}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.stopPropagation();
                      setOtherOpen(false);
                      setHoveredIndex(null);
                      rootRef.current?.focus({ preventScroll: true });
                      return;
                    }
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      send();
                    }
                  }}
                />
              </div>
            ) : (
              <button
                type="button"
                className={`${prefix}__other`}
                data-pressed={pressedKey === "other" ? "" : undefined}
                disabled={Boolean(result)}
                aria-keyshortcuts={
                  options.length < 9 ? String(options.length + 1) : undefined
                }
                onClick={() => choose(options.length)}
              >
                <kbd
                  className={`${prefix}__kbd`}
                  data-off={options.length > 8 ? "" : undefined}
                >
                  {options.length + 1}
                </kbd>
                <span className={`${prefix}__label`}>Other…</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
function DecisionDiagram({
  controller,
  prefix,
  links,
  size,
}: {
  controller: DecisionTreeController;
  prefix: string;
  links: DecisionLink[];
  size: {
    width: number;
    height: number;
  };
}) {
  const { active, treeRef, result, hoveredIndex, registerNode, clean, nextQuestion } =
    controller;
  if (!active) return null;
  const options = active.options ?? [],
    final = Boolean(result) && !nextQuestion;
  const dim = (index: number) =>
    result
      ? result.optionIndex !== index
      : hoveredIndex !== null && hoveredIndex !== index;
  const hot = (index: number) =>
    result ? result.optionIndex === index : hoveredIndex === index;
  const live = (index: number) =>
    Boolean(result) && result?.optionIndex === index && result.other === undefined;
  const soft = (index: number, sub: number) =>
    live(index) &&
    (result?.nextIndex === undefined
      ? hoveredIndex !== null && hoveredIndex !== sub
      : result.nextIndex !== sub);
  const subHot = (index: number, sub: number) =>
    live(index) &&
    (result?.nextIndex === undefined ? hoveredIndex === sub : result.nextIndex === sub);
  const risk = (active.risk === "high" || active.risk === "medium") && (
    <span className={`${prefix}__risk`} data-risk={active.risk}>
      {riskLabels[active.risk]}
    </span>
  );
  const agent = (
    <span className={`${prefix}__agent`} dir="auto" title={active.agent}>
      {active.agent}
    </span>
  );
  return (
    <div
      ref={treeRef}
      className={`${prefix}__tree`}
      data-picked={result ? "" : undefined}
      data-final={clean && final ? "" : undefined}
      data-leaving={result?.leaving ? "" : undefined}
    >
      <svg
        className={`${prefix}__links`}
        width={size.width}
        height={size.height}
        aria-hidden="true"
      >
        {links.map((link) => {
          const option = options[link.branch],
            sub = link.sub === undefined ? undefined : option?.next?.options[link.sub],
            pick = link.sub === undefined ? option?.pick : option?.pick && sub?.pick,
            style: DecisionStyle = {
              "--i": link.branch,
              ...(clean ? { "--j": link.sub ?? 0 } : {}),
            };
          return (
            <path
              pathLength={1}
              d={link.path}
              className={`${prefix}__link`}
              data-kind={link.kind}
              data-pick={pick ? "" : undefined}
              data-hot={
                (
                  link.sub === undefined
                    ? hot(link.branch)
                    : subHot(link.branch, link.sub)
                )
                  ? ""
                  : undefined
              }
              data-dim={dim(link.branch) ? "" : undefined}
              data-soft={
                clean && link.sub !== undefined && soft(link.branch, link.sub)
                  ? ""
                  : undefined
              }
              data-live={
                clean && link.sub !== undefined && live(link.branch) ? "" : undefined
              }
              style={style}
              key={link.id}
            />
          );
        })}
      </svg>
      <div ref={registerNode("root")} className={`${prefix}__root`}>
        {clean && risk}
        <div className={`${prefix}__who`}>
          <span className={`${prefix}__avatar`} aria-hidden="true">
            {active.icon ?? initial(active.agent)}
          </span>
          <span className={`${prefix}__meta`}>
            {clean ? (
              agent
            ) : (
              <span className={`${prefix}__name`}>
                {agent}
                {risk}
              </span>
            )}
            {active.model && (
              <span className={`${prefix}__model`} title={active.model}>
                {active.model}
              </span>
            )}
          </span>
        </div>
        <h3 className={`${prefix}__q`} dir="auto">
          {active.question}
        </h3>
        {active.context && (
          <p className={`${prefix}__context`} dir="auto">
            {active.context}
          </p>
        )}
      </div>
      <DecisionBranches controller={controller} prefix={prefix} />
      {result && (!clean || final) && (
        <div
          ref={registerNode("out")}
          className={`${prefix}__out`}
          data-kind={result.other === undefined ? "approved" : "replied"}
        >
          {result.other === undefined ? (
            <span className={`${prefix}__out-head`}>
              <CheckIcon />
              {"Approved "}
              <span className={`${prefix}__running`}>· running</span>
            </span>
          ) : (
            <>
              <span className={`${prefix}__out-head`}>
                <CheckIcon />
                {"Sent to the "}
                {(active.agent?.trim() || "Agent").toLowerCase()}
              </span>
              {result.answer ? (
                <span className={`${prefix}__answer`}>{result.answer}</span>
              ) : (
                <span
                  className={`${prefix}__typing`}
                  aria-label={`${active.agent} is typing`}
                >
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
function offset(element: HTMLElement) {
  let left = 0,
    top = 0;
  for (
    let current: HTMLElement | null = element;
    current;
    current = current.offsetParent as HTMLElement | null
  ) {
    left += current.offsetLeft;
    top += current.offsetTop;
  }
  return { left, top };
}
function useDecisionLayout(controller: DecisionTreeController) {
  const {
    treeRef,
    nodeRefs,
    active,
    allowOther,
    narrow,
    result,
    clean,
    growRef,
    mirrorRef,
    inputRef,
    tooltipRef,
    bodyRef,
    noteRefs,
    noteIndex,
  } = controller;
  const [links, setLinks] = useState<DecisionLink[]>([]),
    [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const tree = treeRef.current;
    if (!tree || !active) return;
    function measure() {
      const origin = offset(tree!);
      function bounds(key: string): NodeBounds | null {
        const node = nodeRefs.current.get(key);
        if (!node || (clean && !node.offsetParent)) return null;
        const position = offset(node),
          left = position.left - origin.left,
          top = position.top - origin.top;
        return {
          left,
          top,
          right: left + node.offsetWidth,
          bottom: top + node.offsetHeight,
          height: node.offsetHeight,
        };
      }
      const root = bounds("root");
      if (!root) return;
      const nextLinks: DecisionLink[] = [],
        options = active!.options ?? [],
        count = options.length + Number(Boolean(allowOther));
      for (let index = 0; index < count; index++) {
        const option = bounds(`opt:${index}`);
        if (!option) continue;
        const centerY =
          index === options.length ? option.top + 18 : option.top + option.height / 2;
        nextLinks.push({
          id: `b${index}`,
          branch: index,
          kind: "branch",
          path: narrow
            ? verticalLink(
                root.left + 18,
                root.bottom,
                option.left,
                option.top + Math.min(18, option.height / 2),
              )
            : horizontalLink(
                root.right,
                root.top + root.height / 2,
                option.left,
                centerY,
              ),
        });
        const leaf = bounds(`leaf:${index}`) ?? (clean ? bounds(`subq:${index}`) : null);
        if (leaf)
          nextLinks.push({
            id: `l${index}`,
            branch: index,
            kind: "leaf",
            path: narrow
              ? verticalLink(
                  option.left + 16,
                  option.bottom,
                  leaf.left,
                  leaf.top + Math.min(14, leaf.height / 2),
                )
              : horizontalLink(
                  option.right,
                  option.top + option.height / 2,
                  leaf.left,
                  leaf.top + leaf.height / 2,
                ),
          });
        if (clean) {
          const question = bounds(`subq:${index}`);
          if (question)
            (options[index]?.next?.options ?? []).forEach((_, subIndex) => {
              const sub = bounds(`sopt:${index}:${subIndex}`);
              if (sub)
                nextLinks.push({
                  id: `s${index}-${subIndex}`,
                  branch: index,
                  sub: subIndex,
                  kind: "sub",
                  path: verticalLink(
                    question.left + 14,
                    question.bottom,
                    sub.left,
                    sub.top + Math.min(16, sub.height / 2),
                  ),
                });
            });
        }
      }
      const output = nodeRefs.current.get("out");
      if (output && result) {
        const source =
          (clean && result.nextIndex !== undefined
            ? bounds(`sopt:${result.optionIndex}:${result.nextIndex}`)
            : null) ??
          bounds(`leaf:${result.optionIndex}`) ??
          bounds(`opt:${result.optionIndex}`);
        if (source) {
          const side = clean && result.other !== undefined && !narrow,
            left = side ? source.right + 24 : source.left + 24;
          output.style.left = `${left}px`;
          output.style.maxWidth = `${Math.max(120, Math.min(280, tree!.clientWidth - left))}px`;
          output.style.top = `${side ? source.top : source.bottom + 14}px`;
          const target = bounds("out");
          if (target)
            nextLinks.push({
              id: "o",
              branch: result.optionIndex,
              kind: "out",
              path: side
                ? horizontalLink(
                    source.right,
                    source.top + 18,
                    target.left,
                    target.top + 18,
                  )
                : verticalLink(
                    source.left + 12,
                    source.bottom,
                    target.left,
                    target.top + Math.min(16, target.height / 2),
                  ),
            });
        }
      }
      const serialized = JSON.stringify(nextLinks);
      setLinks((previous) =>
        JSON.stringify(previous) === serialized ? previous : nextLinks,
      );
      setSize((previous) =>
        previous.width === tree!.scrollWidth && previous.height === tree!.scrollHeight
          ? previous
          : { width: tree!.scrollWidth, height: tree!.scrollHeight },
      );
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(tree);
    for (const node of nodeRefs.current.values()) observer.observe(node);
    return () => observer.disconnect();
  });
  useLayoutEffect(() => {
    const grow = growRef.current,
      mirror = mirrorRef.current,
      input = inputRef.current;
    if (!grow || !mirror || !input) return;
    const height = Math.min(Math.max(mirror.offsetHeight, 52), 72);
    if (!grow.style.height) grow.style.height = "32px";
    requestAnimationFrame(() => {
      grow.style.height = `${height}px`;
    });
    const overflow = mirror.offsetHeight > 72;
    input.style.overflowY = overflow ? "auto" : "hidden";
    if (overflow) input.scrollTop = input.scrollHeight;
  });
  useLayoutEffect(() => {
    const tooltip = tooltipRef.current,
      body = bodyRef.current,
      mark = noteIndex === null ? undefined : noteRefs.current.get(noteIndex);
    if (!tooltip || !body || !mark) return;
    const bodyBounds = body.getBoundingClientRect(),
      scale = body.offsetWidth ? bodyBounds.width / body.offsetWidth : 1,
      rects = mark.getClientRects(),
      first = rects[0] ?? mark.getBoundingClientRect(),
      last = rects[rects.length - 1] ?? first,
      width = tooltip.offsetWidth,
      height = tooltip.offsetHeight,
      top = (first.top - bodyBounds.top) / scale,
      bottom = (last.bottom - bodyBounds.top) / scale,
      center = (first.left + first.width / 2 - bodyBounds.left) / scale,
      above = bottom + 8 + height > body.offsetHeight - 4 && top - height - 8 >= 4,
      left = Math.max(10, Math.min(center - width / 2, body.offsetWidth - width - 10));
    tooltip.style.top = `${above ? top - height - 8 : bottom + 8}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.setProperty("--x", `${center - left}px`);
    tooltip.dataset.side = above ? "above" : "below";
  });
  return { links, size };
}
function DecisionTreeView({
  clean = false,
  ...props
}: DecisionTreeProps & {
  clean?: boolean;
}) {
  const { title = "Decisions", className, decisions } = props,
    prefix = clean ? "ui-dctc" : "ui-dct";
  const controller = useDecisionTree(props, clean),
    layout = useDecisionLayout(controller);
  const {
    rootRef,
    bodyRef,
    tooltipRef,
    tooltipId,
    onKeyDown,
    pending,
    answered,
    active,
    activeIndex,
    getKey,
    narrow,
    note,
    noteIndex,
    announcement,
    result,
    nextQuestion,
    allowOther,
  } = controller;
  const dotStart = Math.max(0, Math.min(activeIndex - 3, pending.length - 8));
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onMouseDown={(event) => {
        if (
          !(
            event.target instanceof Element &&
            event.target.closest("button, a, input, textarea, mark")
          )
        )
          requestAnimationFrame(() => rootRef.current?.focus({ preventScroll: true }));
      }}
    >
      <header className={`${prefix}__head`}>
        <span className={`${prefix}__mark`}>
          <BranchIcon />
        </span>
        <span className={`${prefix}__heading`} title={title}>
          {title}
        </span>
        <span className={`${prefix}__count`}>
          {pending.length
            ? `${countFormat.format(pending.length)} waiting for you`
            : `${countFormat.format(Object.keys(answered).length)} of ${countFormat.format(decisions.length)} decided`}
        </span>
        {active && pending.length > 1 && (
          <span
            className={`${prefix}__pager`}
            aria-label={`Decision ${countFormat.format(activeIndex + 1)} of ${countFormat.format(pending.length)}`}
          >
            <span className={`${prefix}__dots`} aria-hidden="true">
              {pending.slice(dotStart, dotStart + 8).map((decision, index) => (
                <span
                  data-on={dotStart + index === activeIndex ? "" : undefined}
                  key={getKey(decision)}
                />
              ))}
            </span>
            <span className={`${prefix}__of`}>
              {countFormat.format(activeIndex + 1)}
              {" of "}
              {countFormat.format(pending.length)}
            </span>
          </span>
        )}
      </header>
      <div
        ref={bodyRef}
        className={`${prefix}__body`}
        data-narrow={narrow ? "" : undefined}
      >
        {active ? (
          <DecisionDiagram
            controller={controller}
            prefix={prefix}
            {...layout}
            key={getKey(active)}
          />
        ) : (
          <div className={`${prefix}__empty`}>
            <span className={`${prefix}__empty-mark`}>
              <CompleteIcon size={22} />
            </span>
            <b>All decided</b>
            <span>New decisions from your agents show up here.</span>
          </div>
        )}
        {note && (
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={`${prefix}__tip`}
            key={noteIndex}
          >
            <span className={`${prefix}__tip-head`}>
              <RiskIcon />
              {"Agent's note"}
            </span>
            <p>{note.note}</p>
            {note.source && (
              <span className={`${prefix}__tip-source`}>{note.source}</span>
            )}
          </div>
        )}
        {active && clean && nextQuestion && (
          <p className={`${prefix}__hint`} aria-hidden="true" key="then">
            {"Then "}
            <kbd className={`${prefix}__kbd`}>1</kbd>
            {"–"}
            <kbd className={`${prefix}__kbd`}>
              {Math.min(9, nextQuestion.options.length)}
            </kbd>
          </p>
        )}
        {active && !result && (
          <p className={`${prefix}__hint`} aria-hidden="true">
            {"Pick a branch "}
            <kbd className={`${prefix}__kbd`}>1</kbd>
            {"–"}
            <kbd className={`${prefix}__kbd`}>
              {Math.min(9, (active.options?.length ?? 0) + Number(Boolean(allowOther)))}
            </kbd>
            {pending.length > 1 && (
              <>
                <span>·</span>
                {" next "}
                <kbd className={`${prefix}__kbd`}>→</kbd>
              </>
            )}
          </p>
        )}
      </div>
      <div className={`${prefix}__sr`} aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </div>
  );
}
const riskLabels = {
  high: "High risk",
  medium: "Medium risk",
  low: "Low risk",
};
const countFormat = new Intl.NumberFormat("en-US");
export { DecisionTree };
export type { DecisionNote };
export type { DecisionEffect };
export type { DecisionOption };
export type { Decision };
export type { DecisionChoice };
export type { DecisionTreeHandle };
export type { DecisionTreeProps };
