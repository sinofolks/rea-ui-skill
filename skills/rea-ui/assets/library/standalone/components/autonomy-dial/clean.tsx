"use client";

import "./AutonomyDial.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
} from "react";
interface AgentAction {
  id?: string;
  label?: string;
  risk?: string;
  icon?: ReactNode;
  detail?: ReactNode;
  [field: string]: unknown;
}
type AutonomyLevel = 0 | 1 | 2;
interface AutonomyDialProps {
  actions: AgentAction[];
  level?: AutonomyLevel;
  defaultLevel?: AutonomyLevel;
  onLevelChange?: (level: AutonomyLevel) => void;
  pinned?: string[];
  defaultPinned?: string[];
  onPinnedChange?: (pinned: string[]) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}
type ActionRisk = "safe" | "risky" | "destructive";
interface NormalizedAction extends AgentAction {
  id: string;
  key: string;
  label: string;
  risk: ActionRisk;
}
type SelectionStyle = CSSProperties & {
  "--x": string;
  "--w": string;
};
interface AutonomyViewProps extends AutonomyDialProps {
  clean?: boolean;
}
function AutonomyDial(props: AutonomyDialProps) {
  return <AutonomyView {...props} clean={true} />;
}
function clampLevel(value: number): AutonomyLevel {
  return Math.max(0, Math.min(2, Math.round(value))) as AutonomyLevel;
}
function resolveLevel(value: unknown, fallback: AutonomyLevel = 1): AutonomyLevel {
  return typeof value === "number" && Number.isFinite(value)
    ? clampLevel(value)
    : fallback;
}
function requiresApproval(
  action: NormalizedAction,
  level: AutonomyLevel,
  pinned: string[],
): boolean {
  return (
    pinned.includes(action.id) || level === 0 || (level === 1 && action.risk !== "safe")
  );
}
function normalizeActions(actions: AgentAction[]): NormalizedAction[] {
  const occurrences = new Map<string, number>();
  return (Array.isArray(actions) ? actions : [])
    .filter((action) => !!action && typeof action === "object")
    .map((action) => {
      const id = String(action.id ?? "");
      const duplicateIndex = occurrences.get(id) ?? 0;
      occurrences.set(id, duplicateIndex + 1);
      return {
        ...action,
        id,
        label: String(action.label ?? ""),
        risk:
          action.risk === "safe" || action.risk === "destructive" ? action.risk : "risky",
        key: duplicateIndex ? `${id}#${duplicateIndex}` : id,
      };
    });
}
function useAutonomy(
  {
    actions,
    level,
    defaultLevel = 1,
    onLevelChange,
    pinned,
    defaultPinned = [],
    onPinnedChange,
  }: AutonomyDialProps,
  clean: boolean,
) {
  const instanceId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [localLevel, setLocalLevel] = useState(() => resolveLevel(defaultLevel));
  const [localPinned, setLocalPinned] = useState<string[]>(() =>
    Array.isArray(defaultPinned) ? defaultPinned : [],
  );
  const selectedLevel = level == null ? localLevel : resolveLevel(level, localLevel);
  const pinnedIds = Array.isArray(pinned) ? pinned : localPinned;
  function changeLevel(nextLevel: AutonomyLevel) {
    if (nextLevel === selectedLevel) return;
    setLocalLevel(nextLevel);
    onLevelChange?.(nextLevel);
  }
  function togglePinned(id: string) {
    const nextPinned = pinnedIds.includes(id)
      ? pinnedIds.filter((pinnedId) => pinnedId !== id)
      : [...pinnedIds, id];
    setLocalPinned(nextPinned);
    onPinnedChange?.(nextPinned);
  }
  const normalizedActions = normalizeActions(actions);
  const automaticActions = normalizedActions.filter(
    (action) => !requiresApproval(action, selectedLevel, pinnedIds),
  );
  const approvalActions = normalizedActions.filter((action) =>
    requiresApproval(action, selectedLevel, pinnedIds),
  );
  const levelsRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<{
    x: number;
    width: number;
  } | null>(null);
  useLayoutEffect(() => {
    if (clean) return;
    const button = levelsRef.current?.querySelector<HTMLButtonElement>(
      `[data-level="${selectedLevel}"]`,
    );
    if (button) setSelection({ x: button.offsetLeft, width: button.offsetWidth });
  }, [selectedLevel, clean]);
  function handleLevelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const direction =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!direction) return;
    event.preventDefault();
    const nextLevel = clampLevel(selectedLevel + direction);
    changeLevel(nextLevel);
    levelsRef.current
      ?.querySelector<HTMLButtonElement>(`[data-level="${nextLevel}"]`)
      ?.focus();
  }
  const rowElements = useRef(new Map<string, HTMLLIElement>());
  const previousRects = useRef(new Map<string, DOMRect>());
  const cardRef = useRef<HTMLDivElement>(null);
  const previousHeight = useRef(0);
  const layoutKey = `${automaticActions.map((action) => action.key).join(",")}|${approvalActions.map((action) => action.key).join(",")}`;
  const previousLayoutKey = useRef(layoutKey);
  // Capture the old layout while the DOM still reflects the previous grouping.
  if (rootRef.current && layoutKey !== previousLayoutKey.current) {
    previousRects.current = new Map(
      [...rowElements.current].map(([key, element]) => [
        key,
        element.getBoundingClientRect(),
      ]),
    );
    previousHeight.current =
      (clean ? cardRef.current : rootRef.current)?.offsetHeight ?? 0;
  }
  useLayoutEffect(() => {
    if (previousLayoutKey.current === layoutKey) return;
    previousLayoutKey.current = layoutKey;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = clean ? cardRef.current : rootRef.current;
    if (
      container &&
      previousHeight.current &&
      Math.abs(container.offsetHeight - previousHeight.current) > 1
    ) {
      container.animate(
        [
          { height: `${previousHeight.current}px` },
          { height: `${container.offsetHeight}px` },
        ],
        { duration: 420, easing: REORDER_EASING },
      );
    }
    let staggerIndex = 0;
    for (const [key, element] of rowElements.current) {
      const previous = previousRects.current.get(key);
      if (!previous) continue;
      const offsetY = previous.top - element.getBoundingClientRect().top;
      if (Math.abs(offsetY) < 1) continue;
      element.animate(
        [
          { transform: `translateY(${offsetY}px)`, zIndex: 2 },
          { transform: "none", zIndex: 2 },
        ],
        {
          duration: 420,
          delay: staggerIndex++ * 20,
          easing: REORDER_EASING,
          fill: "backwards",
        },
      );
    }
  }, [layoutKey, clean]);
  const selectionStyle: SelectionStyle | undefined =
    !clean && selection
      ? { "--x": `${selection.x}px`, "--w": `${selection.width}px` }
      : undefined;
  return {
    instanceId,
    rootRef,
    cardRef,
    levelsRef,
    selectedLevel,
    selectedOption: AUTONOMY_LEVELS[selectedLevel]!,
    pinnedIds,
    automaticActions,
    approvalActions,
    rowElements,
    changeLevel,
    togglePinned,
    handleLevelKeyDown,
    selectionStyle,
  };
}
function RollingCount({ value, className }: { value: number; className: string }) {
  const [shownValue, setShownValue] = useState(value);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  useEffect(() => {
    if (value === shownValue) return;
    setDirection(value > shownValue ? "up" : "down");
    setShownValue(value);
  }, [value]);
  return (
    <span className={className} data-dir={direction ?? undefined} key={shownValue}>
      {formatter.format(shownValue)}
    </span>
  );
}
function AutonomyView({
  clean = false,
  title = "Agent permissions",
  subtitle = "What it may do without asking you",
  className,
  ...props
}: AutonomyViewProps) {
  const {
    instanceId,
    rootRef,
    cardRef,
    levelsRef,
    selectedLevel,
    selectedOption,
    pinnedIds,
    automaticActions,
    approvalActions,
    rowElements,
    changeLevel,
    togglePinned,
    handleLevelKeyDown,
    selectionStyle,
  } = useAutonomy(props, clean);
  const prefix = clean ? "ui-adlc" : "ui-adl";
  function renderAction(action: NormalizedAction, asksFirst: boolean) {
    const pinned = pinnedIds.includes(action.id);
    return (
      <li
        className={`${prefix}__row`}
        data-asks={asksFirst ? "" : undefined}
        ref={(element) => {
          if (element) rowElements.current.set(action.key, element);
          else rowElements.current.delete(action.key);
        }}
        key={action.key}
      >
        <span className={`${prefix}__icon`}>{action.icon ?? <ActionIcon />}</span>
        <span className={`${prefix}__name`}>
          <span className={`${prefix}__line`}>
            <span className={`${prefix}__label`} dir="auto" title={action.label}>
              {action.label}
            </span>
            {action.risk !== "safe" && (
              <span className={`${prefix}__risk`} data-risk={action.risk}>
                {action.risk === "risky" ? <RiskIcon /> : <DestructiveIcon />}
                {RISK_LABELS[action.risk]}
              </span>
            )}
          </span>
          {action.detail && (
            <span
              className={`${prefix}__detail`}
              dir="auto"
              title={String(action.detail)}
            >
              {action.detail}
            </span>
          )}
        </span>
        <button
          type="button"
          className={`${prefix}__pin`}
          aria-pressed={pinned}
          aria-label={
            pinned
              ? `${action.label}: always asks – unlock`
              : `Always ask before: ${action.label}`
          }
          title={
            pinned
              ? "Always asks – click to follow the dial again"
              : "Always ask, whatever the dial says"
          }
          onClick={() => togglePinned(action.id)}
        >
          {pinned ? <LockedIcon /> : <UnlockedIcon />}
        </button>
      </li>
    );
  }
  const groups = (
    <div className={`${prefix}__groups`}>
      <section className={`${prefix}__group`} aria-labelledby={`${instanceId}-own`}>
        <h4 className={`${prefix}__group-head`} id={`${instanceId}-own`}>
          Runs on its own
          <span className={`${prefix}__count`}>
            <RollingCount value={automaticActions.length} className={`${prefix}__roll`} />
          </span>
        </h4>
        <ul className={`${prefix}__list`}>
          {automaticActions.map((action) => renderAction(action, false))}
          {automaticActions.length === 0 && (
            <li className={`${prefix}__empty`}>Every action waits for you</li>
          )}
        </ul>
      </section>
      <section className={`${prefix}__group`} aria-labelledby={`${instanceId}-ask`}>
        <h4 className={`${prefix}__group-head`} id={`${instanceId}-ask`}>
          Asks you first
          <span className={`${prefix}__count`}>
            <RollingCount value={approvalActions.length} className={`${prefix}__roll`} />
          </span>
        </h4>
        <ul className={`${prefix}__list`}>
          {approvalActions.map((action) => renderAction(action, true))}
          {approvalActions.length === 0 && (
            <li className={`${prefix}__empty`}>The agent runs everything itself</li>
          )}
        </ul>
      </section>
    </div>
  );
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-level={selectedLevel}
    >
      <div ref={cardRef} className={`${prefix}__card`}>
        <header className={`${prefix}__head`}>
          <span className={`${prefix}__spark`}>
            <SparkIcon />
          </span>
          <span className={`${prefix}__heading`}>
            <span className={`${prefix}__title`} dir="auto" title={title}>
              {title}
            </span>
            {subtitle && (
              <span className={`${prefix}__sub`} dir="auto" title={subtitle}>
                {subtitle}
              </span>
            )}
          </span>
        </header>
        <div className={`${prefix}__levels`}>
          <div
            ref={levelsRef}
            className={`${prefix}__segmented`}
            role="radiogroup"
            aria-label="Autonomy"
            aria-describedby={`${instanceId}-hint`}
            style={selectionStyle}
            onKeyDown={handleLevelKeyDown}
          >
            {!clean && <span className={`${prefix}__pill`} aria-hidden="true" />}
            {AUTONOMY_LEVELS.map((option) => (
              <button
                type="button"
                role="radio"
                aria-checked={option.id === selectedLevel}
                tabIndex={option.id === selectedLevel ? 0 : -1}
                data-level={option.id}
                className={`${prefix}__level`}
                onClick={() => changeLevel(option.id)}
                key={option.id}
              >
                {option.label}
              </button>
            ))}
          </div>
          <span className={`${prefix}__sr`} id={`${instanceId}-hint`}>
            {selectedOption.hint}
          </span>
        </div>
        {clean && groups}
      </div>
      {!clean && groups}
      <span
        className={`${prefix}__sr`}
        aria-live="polite"
      >{`${selectedOption.label}: ${automaticActions.length} on its own, ${approvalActions.length} ask first`}</span>
    </div>
  );
}
const AUTONOMY_LEVELS: readonly {
  id: AutonomyLevel;
  label: string;
  hint: string;
}[] = [
  { id: 0, label: "Always ask", hint: "Nothing happens without your OK" },
  {
    id: 1,
    label: "If risky",
    hint: "Safe actions run, risky ones wait for you",
  },
  {
    id: 2,
    label: "Full auto",
    hint: "Everything runs, except what you locked",
  },
];
const RISK_LABELS: Record<ActionRisk, string> = {
  safe: "",
  risky: "Risky",
  destructive: "Destructive",
};
const REORDER_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
const formatter = new Intl.NumberFormat("en");
const RiskIcon = () => (
  <svg
    width={`16`}
    height={`16`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path
      d={`M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
    <path
      d={`M12 9V13`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
    <path
      d={`M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
  </svg>
);
const DestructiveIcon = () => (
  <svg
    width={`16`}
    height={`16`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path
      d={`M5.92089 5.92089C8.15836 3.68342 9.2771 2.56468 10.5857 2.19562C11.5105 1.93479 12.4895 1.93479 13.4143 2.19562C14.7229 2.56468 15.8416 3.68342 18.0791 5.92089C20.3166 8.15836 21.4353 9.2771 21.8044 10.5857C22.0652 11.5105 22.0652 12.4895 21.8044 13.4143C21.4353 14.7229 20.3166 15.8416 18.0791 18.0791C15.8416 20.3166 14.7229 21.4353 13.4143 21.8044C12.4895 22.0652 11.5105 22.0652 10.5857 21.8044C9.2771 21.4353 8.15836 20.3166 5.92089 18.0791C3.68342 15.8416 2.56468 14.7229 2.19562 13.4143C1.93479 12.4895 1.93479 11.5105 2.19562 10.5857C2.56468 9.2771 3.68342 8.15836 5.92089 5.92089Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
    <path
      d={`M12 8V12`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
    <path
      d={`M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
  </svg>
);
const LockedIcon = () => (
  <svg
    width={`16`}
    height={`16`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path
      d={`M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
    <path
      d={`M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
    <path
      d={`M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
  </svg>
);
const UnlockedIcon = () => (
  <svg
    width={`16`}
    height={`16`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path
      d={`M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
    <path
      d={`M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C13.9593 2 15.8664 3.25221 16.5 5`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
    <path
      d={`M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.5`}
    />
  </svg>
);
const SparkIcon = () => (
  <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <path
      d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
      fill={`currentColor`}
    />
    <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
  </svg>
);
const ActionIcon = () => (
  <svg width={`16`} height={`16`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
    <circle cx={`8`} cy={`8`} r={`2.4`} fill={`currentColor`} />
  </svg>
);
export { AutonomyDial };
export type { AgentAction };
export type { AutonomyLevel };
export type { AutonomyDialProps };
