"use client";

import "./PermissionRequest.clean.css";
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
  type SyntheticEvent,
} from "react";
type PermissionScope = "once" | "timed" | "always";
type PermissionRisk = "safe" | "risky" | "destructive";
type PermissionDecision = {
  allow: boolean;
  scope: PermissionScope;
  at: number;
  until?: number;
};
interface PermissionAgent {
  name?: string;
  model?: string;
  avatar?: ReactNode;
}
interface PermissionPreview {
  id: string;
  label: string;
  meta?: ReactNode;
  icon?: ReactNode;
}
interface PermissionRequestProps {
  agent?: PermissionAgent;
  action?: string;
  target?: string;
  toolIcon?: ReactNode;
  risk?: PermissionRisk;
  reason?: string;
  preview?: PermissionPreview[];
  previewTitle?: string;
  previewLimit?: number;
  scopes?: PermissionScope[];
  scope?: PermissionScope;
  defaultScope?: PermissionScope;
  onScopeChange?: (value: PermissionScope) => void;
  duration?: number;
  decision?: PermissionDecision | null;
  defaultDecision?: PermissionDecision | null;
  onDecisionChange?: (decision: PermissionDecision | null) => void;
  now?: number;
  className?: string;
}
type ViewProps = PermissionRequestProps & {
  clean?: boolean;
};
function PermissionRequest(props: PermissionRequestProps) {
  return <PermissionRequestView {...props} clean={true} />;
}
function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
function formatTime(time: number, now = Date.now()): string {
  const date = new Date(time);
  const clock = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (date.toDateString() === new Date(now).toDateString()) return clock;
  const recent = Math.abs(time - now) < 6 * MINUTES_PER_DAY * MINUTE;
  return `${date.toLocaleDateString([], recent ? { weekday: "short" } : { month: "short", day: "numeric" })} ${clock}`;
}
function formatDuration(minutes: number): string {
  if (minutes >= MINUTES_PER_DAY && minutes % MINUTES_PER_DAY === 0)
    return `${minutes / MINUTES_PER_DAY} day${minutes === MINUTES_PER_DAY ? "" : "s"}`;
  if (minutes % 60 === 0) return `${minutes / 60} hour${minutes === 60 ? "" : "s"}`;
  return `${minutes} min`;
}
function formatRemaining(milliseconds: number): string {
  const minutes = Math.max(0, Math.ceil(milliseconds / MINUTE));
  if (minutes >= MINUTES_PER_DAY) {
    const hours = Math.floor((minutes % MINUTES_PER_DAY) / 60);
    return `${Math.floor(minutes / MINUTES_PER_DAY)} d ${hours ? `${hours} h ` : ""}left`;
  }
  if (minutes >= 60)
    return `${Math.floor(minutes / 60)} h ${minutes % 60 ? `${minutes % 60} min ` : ""}left`;
  return `${minutes} min left`;
}
function agentInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.match(/[\p{L}\p{N}]/u)?.[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
function describeDecision(decision: PermissionDecision, now: number, agentName: string) {
  const startedAt = isFiniteNumber(decision.at) ? decision.at : now;
  const expiresAt = isFiniteNumber(decision.until) ? decision.until : undefined;
  const duration = expiresAt === undefined ? 0 : expiresAt - startedAt;
  const remainingFraction =
    duration > 0 && expiresAt !== undefined
      ? Math.max(0, Math.min(1, (expiresAt - now) / duration))
      : 0;
  const expired = Boolean(decision.allow && expiresAt !== undefined && now >= expiresAt);
  const kind = expired ? "expired" : decision.allow ? "allowed" : "denied";
  let heading: string;
  let note: string;
  if (expired) {
    heading = "Access expired";
    note = `${agentName} will ask again`;
  } else if (!decision.allow) {
    heading = "Denied";
    note = `${agentName} was told and won't do it`;
  } else if (decision.scope === "timed") {
    heading =
      duration > 0
        ? `Allowed for ${formatDuration(Math.round(duration / MINUTE))}`
        : "Allowed";
    note =
      expiresAt === undefined
        ? "No end time given"
        : `${formatRemaining(expiresAt - now)} · until ${formatTime(expiresAt, now)}`;
  } else if (decision.scope === "once") {
    heading = "Allowed once";
    note = `At ${formatTime(startedAt, now)} · it won't carry over`;
  } else {
    heading = "Always allowed";
    note = `${agentName} won't ask for this again`;
  }
  return { kind, heading, note, expired, expiresAt, remainingFraction };
}
function usePermissionRequest({
  risk = "risky",
  scopes = permissionScopes,
  duration = 60,
  previewLimit = 3,
  preview = [],
  now,
  agent,
  defaultDecision = null,
  decision,
  defaultScope = "once",
  scope,
  onScopeChange,
  onDecisionChange,
}: PermissionRequestProps) {
  const id = useId();
  const normalizedRisk = permissionRisks.includes(risk) ? risk : "risky";
  const validScopes = scopes.filter((value) => permissionScopes.includes(value));
  const allowedScopes = validScopes.filter(
    (value) => value !== "always" || normalizedRisk !== "destructive",
  );
  const durationMinutes =
    isFiniteNumber(duration) && duration > 0 ? Math.max(1, Math.round(duration)) : 60;
  const collapsedLimit =
    isFiniteNumber(previewLimit) && previewLimit >= 0 ? Math.floor(previewLimit) : 3;
  const fixedNow = isFiniteNumber(now) ? now : undefined;
  const agentName = agent?.name?.trim() || "Agent";
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [localDecision, setLocalDecision] = useState(defaultDecision);
  const currentDecision = decision === undefined ? localDecision : decision;
  const [localScope, setLocalScope] = useState(defaultScope);
  const requestedScope = scope ?? localScope;
  const selectedScope = allowedScopes.includes(requestedScope)
    ? requestedScope
    : (allowedScopes[0] ?? "once");
  const [expanded, setExpanded] = useState(false);
  const [clock, setClock] = useState(() => Date.now());
  const trackExpiry =
    currentDecision?.allow &&
    currentDecision.scope === "timed" &&
    isFiniteNumber(currentDecision.until) &&
    fixedNow === undefined;
  useEffect(() => {
    if (!trackExpiry) return;
    const timer = window.setInterval(() => setClock(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [trackExpiry]);
  const currentTime = fixedNow ?? clock;
  function selectScope(nextScope: PermissionScope) {
    setLocalScope(nextScope);
    onScopeChange?.(nextScope);
  }
  function updateDecision(nextDecision: PermissionDecision | null) {
    setLocalDecision(nextDecision);
    onDecisionChange?.(nextDecision);
  }
  function allow() {
    const at = fixedNow ?? Date.now();
    updateDecision({
      allow: true,
      scope: selectedScope,
      at,
      until: selectedScope === "timed" ? at + durationMinutes * MINUTE : undefined,
    });
  }
  function deny() {
    updateDecision({
      allow: false,
      scope: selectedScope,
      at: fixedNow ?? Date.now(),
    });
  }
  function onDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (currentDecision) return;
    const tagName = event.target instanceof Element ? event.target.tagName : undefined;
    if (event.key === "Enter" && tagName !== "BUTTON") {
      event.preventDefault();
      allow();
    } else if (event.key === "Escape") {
      event.preventDefault();
      deny();
    }
  }
  function onScopeKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    const nextScope =
      allowedScopes[
        (allowedScopes.indexOf(selectedScope) + direction + allowedScopes.length) %
          allowedScopes.length
      ];
    selectScope(nextScope);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`[data-scope="${nextScope}"]`)
      ?.focus();
  }
  const result = currentDecision
    ? describeDecision(currentDecision, currentTime, agentName)
    : null;
  const panelState = result?.kind ?? `pending:${expanded}`;
  const cardRef = useRef<HTMLDivElement>(null);
  const previousHeight = useRef(0);
  const previousState = useRef(panelState);
  // Read the existing height before React commits the changed panel contents.
  if (cardRef.current && panelState !== previousState.current)
    previousHeight.current = cardRef.current.offsetHeight;
  useLayoutEffect(() => {
    if (previousState.current === panelState) return;
    previousState.current = panelState;
    const card = cardRef.current;
    if (
      !card ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !previousHeight.current
    )
      return;
    const height = card.offsetHeight;
    if (Math.abs(height - previousHeight.current) > 1) {
      card.animate(
        [{ height: `${previousHeight.current}px` }, { height: `${height}px` }],
        { duration: 380, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
      );
    }
  }, [panelState]);
  const allowLabel =
    selectedScope === "once"
      ? "Allow once"
      : selectedScope === "timed"
        ? `Allow for ${formatDuration(durationMinutes)}`
        : "Always allow";
  const scopeLabel = (value: PermissionScope) =>
    value === "once"
      ? "Just once"
      : value === "timed"
        ? formatDuration(durationMinutes)
        : "Always";
  const visiblePreview = expanded ? preview : preview.slice(0, collapsedLimit);
  return {
    id,
    normalizedRisk,
    validScopes,
    allowedScopes,
    collapsedLimit,
    agentName,
    avatarFailed,
    setAvatarFailed,
    currentDecision,
    selectedScope,
    expanded,
    setExpanded,
    selectScope,
    updateDecision,
    allow,
    deny,
    onDialogKeyDown,
    onScopeKeyDown,
    result,
    panelState,
    cardRef,
    allowLabel,
    scopeLabel,
    visiblePreview,
    hiddenCount: preview.length - visiblePreview.length,
  };
}
function RiskIcon() {
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
}
function DestructiveIcon() {
  return (
    <svg
      width={`12`}
      height={`12`}
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
}
function AllowedIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z`}
        stroke={`currentColor`}
        strokeWidth={`1.5`}
      />
      <path
        d={`M8 12.5L10.5 15L16 9`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.5`}
      />
    </svg>
  );
}
function DeniedIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z`}
        stroke={`currentColor`}
        strokeWidth={`1.5`}
      />
      <path
        d={`M14.9994 15L9 9M9.00064 15L15 9`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.5`}
      />
    </svg>
  );
}
function ExpiredIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z`}
        stroke={`currentColor`}
        strokeWidth={`1.5`}
      />
      <path
        d={`M12 8V12L14 14`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.5`}
      />
    </svg>
  );
}
function PreviewDot() {
  return (
    <svg width={`16`} height={`16`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
      <circle cx={`8`} cy={`8`} r={`2.4`} fill={`currentColor`} />
    </svg>
  );
}
function hideBrokenImage(event: SyntheticEvent) {
  if (event.target instanceof HTMLImageElement) event.target.style.visibility = "hidden";
}
function PermissionRequestView({ clean = false, ...props }: ViewProps) {
  const {
    agent = {},
    action,
    target,
    toolIcon,
    reason,
    preview = [],
    previewTitle = "What will happen",
    className,
  } = props;
  const {
    id,
    normalizedRisk,
    validScopes,
    allowedScopes,
    collapsedLimit,
    agentName,
    avatarFailed,
    setAvatarFailed,
    currentDecision,
    selectedScope,
    expanded,
    setExpanded,
    selectScope,
    updateDecision,
    allow,
    deny,
    onDialogKeyDown,
    onScopeKeyDown,
    result,
    panelState,
    cardRef,
    allowLabel,
    scopeLabel,
    visiblePreview,
    hiddenCount,
  } = usePermissionRequest(props);
  const prefix = clean ? "ui-prc" : "ui-pr";
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      data-risk={normalizedRisk}
      data-state={panelState.split(":")[0]}
    >
      <div
        ref={cardRef}
        className={`${prefix}__card`}
        role={currentDecision ? undefined : "dialog"}
        aria-labelledby={currentDecision ? undefined : `${id}-title`}
        aria-describedby={currentDecision || !reason ? undefined : `${id}-why`}
        onKeyDown={onDialogKeyDown}
      >
        {currentDecision && result ? (
          <div className={`${prefix}__result`} data-kind={result.kind} role="status">
            <span className={`${prefix}__result-icon`}>
              {result.kind === "allowed" ? (
                <AllowedIcon />
              ) : result.kind === "denied" ? (
                <DeniedIcon />
              ) : (
                <ExpiredIcon />
              )}
            </span>
            <span className={`${prefix}__result-text`}>
              <span
                className={`${prefix}__result-head`}
                title={`${result.heading} · ${action}`}
              >
                {result.heading}
                <span className={`${prefix}__result-action`}>
                  {" · "}
                  <span dir="auto">{action}</span>
                </span>
              </span>
              <span className={`${prefix}__result-note`} title={result.note}>
                {result.note}
              </span>
            </span>
            {currentDecision.allow &&
            !result.expired &&
            currentDecision.scope !== "once" ? (
              <button
                type="button"
                className={`${prefix}__ghost`}
                onClick={() => updateDecision(null)}
              >
                Revoke
              </button>
            ) : (
              <button
                type="button"
                className={`${prefix}__ghost`}
                onClick={() => updateDecision(null)}
              >
                {result.expired ? "Ask again" : "Change"}
              </button>
            )}
            {currentDecision.allow &&
              currentDecision.scope === "timed" &&
              result.expiresAt !== undefined &&
              !result.expired && (
                <span className={`${prefix}__drain`} aria-hidden="true">
                  <span style={{ transform: `scaleX(${result.remainingFraction})` }} />
                </span>
              )}
          </div>
        ) : (
          <div className={`${prefix}__ask`} key="ask">
            <div className={`${prefix}__body`}>
              <header className={`${prefix}__head`}>
                <span
                  className={`${prefix}__avatar`}
                  data-logo={agent.avatar && !avatarFailed ? "" : undefined}
                  onErrorCapture={() => setAvatarFailed(true)}
                >
                  {agent.avatar && !avatarFailed
                    ? agent.avatar
                    : agentInitials(agentName) || "AI"}
                </span>
                <span className={`${prefix}__heading`}>
                  <span className={`${prefix}__title`} id={`${id}-title`}>
                    <b dir="auto">{agentName}</b>
                    {" wants to "}
                    <b dir="auto">{action}</b>
                  </span>
                  {(target || agent.model) && (
                    <span className={`${prefix}__sub`} title={target ?? agent.model}>
                      {toolIcon && (
                        <span
                          className={`${prefix}__tool`}
                          onErrorCapture={hideBrokenImage}
                        >
                          {toolIcon}
                        </span>
                      )}
                      <span className={`${prefix}__sub-text`} dir="auto">
                        {target ?? agent.model}
                      </span>
                    </span>
                  )}
                </span>
                {normalizedRisk !== "safe" && (
                  <span className={`${prefix}__risk`} data-risk={normalizedRisk}>
                    {normalizedRisk === "risky" ? <RiskIcon /> : <DestructiveIcon />}
                    {riskLabels[normalizedRisk]}
                  </span>
                )}
              </header>
              {reason && (
                <p className={`${prefix}__why`} id={`${id}-why`} dir="auto">
                  {reason}
                </p>
              )}
              {preview.length > 0 && (
                <section
                  className={`${prefix}__preview`}
                  aria-labelledby={`${id}-what`}
                  data-open={expanded ? "" : undefined}
                >
                  <h4 className={`${prefix}__label`} id={`${id}-what`}>
                    <span className={`${prefix}__label-text`} dir="auto">
                      {previewTitle}
                    </span>
                    <span className={`${prefix}__count`}>
                      {countFormatter.format(preview.length)}
                    </span>
                  </h4>
                  <ul className={`${prefix}__list`}>
                    {visiblePreview.map((item, index) => (
                      <li
                        className={`${prefix}__item`}
                        style={{
                          animationDelay: `${Math.min(index, 12) * 40}ms`,
                        }}
                        key={`${item.id}#${index}`}
                      >
                        <span
                          className={`${prefix}__item-icon`}
                          onErrorCapture={hideBrokenImage}
                        >
                          {item.icon ?? <PreviewDot />}
                        </span>
                        <span
                          className={`${prefix}__item-label`}
                          dir="auto"
                          title={item.label}
                        >
                          {item.label}
                        </span>
                        {item.meta != null && (
                          <span className={`${prefix}__item-meta`}>{item.meta}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {(hiddenCount > 0 || expanded) && preview.length > collapsedLimit && (
                    <button
                      type="button"
                      className={`${prefix}__more`}
                      aria-expanded={expanded}
                      onClick={() => setExpanded((current) => !current)}
                    >
                      {expanded
                        ? "Show less"
                        : `${countFormatter.format(hiddenCount)} more`}
                    </button>
                  )}
                </section>
              )}
            </div>
            <div className={`${prefix}__answer`}>
              {allowedScopes.length > 1 && (
                <div
                  className={`${prefix}__scopes`}
                  role="radiogroup"
                  aria-label="How long"
                >
                  {allowedScopes.map((value) => (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={value === selectedScope}
                      className={`${prefix}__scope`}
                      onClick={() => selectScope(value)}
                      onKeyDown={onScopeKeyDown}
                      data-scope={value}
                      tabIndex={value === selectedScope ? 0 : -1}
                      children={scopeLabel(value)}
                      key={value}
                    />
                  ))}
                </div>
              )}
              {normalizedRisk === "destructive" && validScopes.includes("always") && (
                <span className={`${prefix}__hint`}>
                  {"Destructive actions can't be allowed for always"}
                </span>
              )}
              <div className={`${prefix}__buttons`}>
                <button type="button" className={`${prefix}__btn`} onClick={deny}>
                  Deny<kbd className={`${prefix}__kbd`}>Esc</kbd>
                </button>
                <button
                  type="button"
                  className={`${prefix}__btn ${prefix}__btn--primary`}
                  onClick={allow}
                >
                  <span
                    className={`${prefix}__btn-label`}
                    children={allowLabel}
                    key={allowLabel}
                  />
                  <kbd className={`${prefix}__kbd`}>↵</kbd>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const MINUTE = 60000;
const MINUTES_PER_DAY = 1440;
const riskLabels = {
  safe: "",
  risky: "Risky",
  destructive: "Destructive",
};
const countFormatter = new Intl.NumberFormat("en");
const permissionScopes: PermissionScope[] = ["once", "timed", "always"];
const permissionRisks: PermissionRisk[] = ["safe", "risky", "destructive"];
export { PermissionRequest };
export type { PermissionRequestProps };
export type { PermissionDecision };
export type { PermissionScope };
export type { PermissionAgent };
export type { PermissionPreview };
export type { PermissionRisk };
