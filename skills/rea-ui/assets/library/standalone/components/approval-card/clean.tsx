"use client";

import "./ApprovalCard.clean.css";
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
} from "react";
type ApprovalStatus = "pending" | "approved" | "denied";
type DenialReason = "user" | "timeout";
interface ApprovalCardProps {
  title?: string;
  description?: ReactNode;
  risk?: "low" | "medium" | "high";
  icon?: ReactNode;
  details: {
    label: string;
    value: ReactNode;
  }[];
  preview?: ReactNode;
  children?: ReactNode;
  status?: ApprovalStatus;
  defaultStatus?: ApprovalStatus;
  onApprove?: (value: { always: boolean }) => void | Promise<void>;
  onDeny?: (value: { reason: DenialReason }) => void;
  onEdit?: () => void;
  expiresIn?: number;
  onExpire?: () => void;
  allowAlways?: boolean;
  alwaysLabel?: string;
  approveLabel?: string;
  denyLabel?: string;
  editLabel?: string;
  shortcuts?: boolean;
  label?: ReactNode;
  actions?: "tray" | "card";
  className?: string;
}
function ApprovalCard(props: ApprovalCardProps) {
  return <ApprovalView {...props} clean />;
}
function formatCountdown(seconds: number): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  if (seconds < 3600) return `${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;
  return `${Math.floor(seconds / 3600)}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`;
}
function describeCountdown(seconds: number): string {
  const [amount, unit] =
    seconds < 120
      ? [seconds, "second"]
      : seconds < 7200
        ? [Math.round(seconds / 60), "minute"]
        : [Math.round(seconds / 3600), "hour"];
  return `${amount} ${unit}${amount === 1 ? "" : "s"}`;
}
function formatResolvedTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} h ago`;
  return `${Math.floor(seconds / 86400)} d ago`;
}
function useApproval({
  title,
  status,
  defaultStatus = "pending",
  onApprove,
  onDeny,
  expiresIn,
  onExpire,
}: ApprovalCardProps) {
  const id = useId();
  const [localStatus, setLocalStatus] = useState<ApprovalStatus>(defaultStatus);
  const currentStatus = status ?? localStatus;
  const resolved = currentStatus !== "pending";
  const [always, setAlways] = useState(false);
  const [busy, setBusy] = useState(false);
  const [denialReason, setDenialReason] = useState<DenialReason>("user");
  const [resolvedAt, setResolvedAt] = useState<number | null>(() =>
    resolved ? Date.now() : null,
  );
  const [announcement, setAnnouncement] = useState("");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [modifier, setModifier] = useState("⌘");
  const [previousStatus, setPreviousStatus] = useState(currentStatus);
  const [leaving, setLeaving] = useState(false);
  const [entering, setEntering] = useState(false);
  // A controlled status change starts the same transition as a local decision.
  if (previousStatus !== currentStatus) {
    setPreviousStatus(currentStatus);
    if (currentStatus === "pending") {
      setLeaving(false);
      setEntering(true);
      setAlways(false);
      setBusy(false);
      setDenialReason("user");
      setResolvedAt(null);
      setAnnouncement("");
    } else {
      setLeaving(previousStatus === "pending");
      setEntering(false);
      setResolvedAt(Date.now());
      const decision =
        currentStatus === "approved"
          ? "Approved"
          : denialReason === "timeout"
            ? "Expired"
            : "Denied";
      setAnnouncement(`${decision}: ${title}`);
    }
  }
  const rootRef = useRef<HTMLDivElement>(null);
  const resolvedRef = useRef<HTMLDivElement>(null);
  const approveRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(false);
  useEffect(() => {
    const platform =
      (
        navigator as Navigator & {
          userAgentData?: {
            platform?: string;
          };
        }
      ).userAgentData?.platform ??
      navigator.platform ??
      "";
    if (!/mac|iphone|ipad|ipod/i.test(platform || navigator.userAgent))
      setModifier("Ctrl");
  }, []);
  async function approve() {
    if (resolved || busy) return;
    const result = onApprove?.({ always });
    if (result && typeof result.then === "function") {
      setBusy(true);
      try {
        await result;
      } catch {
        setBusy(false);
        return;
      }
      setBusy(false);
    }
    if (status === undefined) setLocalStatus("approved");
  }
  function deny(reason: DenialReason = "user") {
    if (resolved || (busy && reason === "user")) return;
    setDenialReason(reason);
    if (reason === "timeout") onExpire?.();
    onDeny?.({ reason });
    if (status === undefined) setLocalStatus("denied");
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (resolved || busy || event.defaultPrevented) return;
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      void approve();
    } else if (event.key === "Escape") {
      event.preventDefault();
      deny();
    }
  }
  const duration =
    typeof expiresIn === "number" && Number.isFinite(expiresIn) && expiresIn > 0
      ? expiresIn * 1000
      : 0;
  const remainingRef = useRef(duration);
  const [secondsRemaining, setSecondsRemaining] = useState(Math.ceil(duration / 1000));
  const expireRef = useRef(() => {});
  useLayoutEffect(() => {
    expireRef.current = () => deny("timeout");
  });
  useEffect(() => {
    if (currentStatus !== "pending") return;
    remainingRef.current = duration;
    setSecondsRemaining(Math.ceil(duration / 1000));
  }, [currentStatus, duration]);
  const paused = hovered || focused || busy;
  useEffect(() => {
    if (!duration || resolved || paused) return;
    let previousTime = performance.now();
    let frame = 0;
    function tick(time: number) {
      remainingRef.current -= time - previousTime;
      previousTime = time;
      setSecondsRemaining(Math.max(0, Math.ceil(remainingRef.current / 1000)));
      if (remainingRef.current <= 0) {
        expireRef.current();
        return;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, resolved, paused]);
  const previousHeightRef = useRef(0);
  const resizingRef = useRef(false);
  const measuredRef = useRef(false);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      if (!resizingRef.current) previousHeightRef.current = root.offsetHeight;
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!measuredRef.current) {
      measuredRef.current = true;
      previousHeightRef.current = root.offsetHeight;
      return;
    }
    if (resolved && root.contains(document.activeElement))
      resolvedRef.current?.focus({ preventScroll: true });
    if (!resolved && restoreFocusRef.current)
      approveRef.current?.focus({ preventScroll: true });
    restoreFocusRef.current = false;
    const oldHeight = previousHeightRef.current;
    root.style.height = "";
    const nextHeight = root.offsetHeight;
    if (!oldHeight || oldHeight === nextHeight) return;
    resizingRef.current = true;
    root.style.height = `${oldHeight}px`;
    void root.offsetHeight;
    root.style.height = `${nextHeight}px`;
    const timeout = window.setTimeout(() => {
      root.style.height = "";
      resizingRef.current = false;
      previousHeightRef.current = root.offsetHeight;
    }, 560);
    return () => {
      window.clearTimeout(timeout);
      root.style.height = "";
      resizingRef.current = false;
    };
  }, [resolved]);
  const [, refreshTime] = useState(0);
  useEffect(() => {
    if (!resolved) return;
    const interval = window.setInterval(() => refreshTime((time) => time + 1), 30000);
    return () => window.clearInterval(interval);
  }, [resolved]);
  return {
    id,
    currentStatus,
    resolved,
    always,
    setAlways,
    busy,
    denialReason,
    resolvedAt,
    announcement,
    setHovered,
    setFocused,
    modifier,
    leaving,
    setLeaving,
    entering,
    setEntering,
    rootRef,
    resolvedRef,
    approveRef,
    restoreFocusRef,
    approve,
    deny,
    handleKeyDown,
    duration,
    secondsRemaining,
    paused,
  };
}
function ApprovalView({
  clean = false,
  ...props
}: ApprovalCardProps & {
  clean?: boolean;
}) {
  const {
    title,
    description,
    risk,
    icon,
    details,
    preview,
    children,
    onEdit,
    allowAlways = true,
    alwaysLabel = "Always allow this action",
    approveLabel = "Approve",
    denyLabel = "Deny",
    editLabel = "Edit",
    shortcuts = true,
    label,
    actions = clean ? "card" : "tray",
    className,
  } = props;
  const approval = useApproval(props);
  const {
    id,
    currentStatus,
    resolved,
    always,
    setAlways,
    busy,
    denialReason,
    resolvedAt,
    announcement,
    setHovered,
    setFocused,
    modifier,
    leaving,
    setLeaving,
    entering,
    setEntering,
    rootRef,
    resolvedRef,
    approveRef,
    restoreFocusRef,
    approve,
    deny,
    handleKeyDown,
    duration,
    secondsRemaining,
    paused,
  } = approval;
  const prefix = clean ? "ui-apc" : "ui-ap";
  const titleId = `${id}-title`;
  const rowId = `${id}-row`;
  const descriptionId = `${id}-desc`;
  const timerId = `${id}-timer`;
  const content = preview ?? children;
  const decision =
    currentStatus === "approved"
      ? "Approved"
      : denialReason === "timeout"
        ? "Expired"
        : "Denied";
  const describedBy = [
    description ? descriptionId : null,
    duration && !resolved ? timerId : null,
  ]
    .filter(Boolean)
    .join(" ");
  const alwaysOption = allowAlways && (
    <label className={`${prefix}__always`}>
      <span className={`${prefix}__box`}>
        <input
          type="checkbox"
          checked={always}
          disabled={busy}
          onChange={(event) => setAlways(event.target.checked)}
        />
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 8.3 6.8 11 12 5.2" />
        </svg>
      </span>
      <span className={`${prefix}__always-label`}>{alwaysLabel}</span>
    </label>
  );
  const footer = (
    <div className={`${prefix}__foot`}>
      {clean && actions === "card" && alwaysOption}
      {duration > 0 && (
        <span
          className={`${prefix}__expires`}
          data-paused={paused || undefined}
          data-low={secondsRemaining <= 10 || undefined}
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6" />
            <path d="M8 5v3.2l2 1.3" />
          </svg>
          {"Expires in "}
          {formatCountdown(secondsRemaining)}
        </span>
      )}
      <div className={`${prefix}__actions`}>
        {onEdit && (
          <button
            type="button"
            className={`${prefix}__btn ${prefix}__btn--ghost`}
            aria-disabled={busy || undefined}
            onClick={() => {
              if (!busy) onEdit();
            }}
          >
            {editLabel}
          </button>
        )}
        <button
          type="button"
          className={`${prefix}__btn ${prefix}__btn--quiet ${prefix}__deny`}
          aria-keyshortcuts="Escape"
          aria-disabled={busy || undefined}
          onClick={() => deny()}
        >
          {denyLabel}
          {shortcuts && (
            <kbd className={`${prefix}__kbd`} aria-hidden="true">
              Esc
            </kbd>
          )}
        </button>
        <button
          ref={approveRef}
          type="button"
          className={`${prefix}__btn ${prefix}__btn--primary ${prefix}__approve`}
          aria-keyshortcuts="Meta+Enter Control+Enter"
          aria-disabled={busy || undefined}
          onClick={() => void approve()}
        >
          {approveLabel}
          {busy ? (
            <svg className={`${prefix}__spinner`} viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="6" />
            </svg>
          ) : (
            shortcuts && (
              <kbd className={`${prefix}__kbd`} aria-hidden="true">
                {modifier === "⌘" ? "⌘↵" : "Ctrl ↵"}
              </kbd>
            )
          )}
        </button>
      </div>
    </div>
  );
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      role="group"
      aria-labelledby={resolved ? rowId : titleId}
      aria-describedby={describedBy || undefined}
      aria-busy={busy || undefined}
      data-status={currentStatus}
      data-busy={busy || undefined}
      data-label={label ? "" : undefined}
      data-actions={actions}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {label && (
        <div
          className={`${prefix}__label`}
          title={typeof label === "string" ? label : undefined}
        >
          {label}
        </div>
      )}
      {(!resolved || leaving) && (
        <div
          className={`${prefix}__pending`}
          data-leaving={leaving || undefined}
          data-entering={entering || undefined}
          inert={leaving}
          aria-hidden={leaving || undefined}
          onAnimationEnd={(event) => {
            if (event.target !== event.currentTarget) return;
            if (leaving) setLeaving(false);
            if (entering) setEntering(false);
          }}
        >
          <div className={`${prefix}__card`}>
            <div className={`${prefix}__head`}>
              <span className={`${prefix}__icon`} aria-hidden="true">
                {icon ?? (
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3 5 5.8v5.4c0 4.3 2.9 8.2 7 9.8 4.1-1.6 7-5.5 7-9.8V5.8L12 3Z" />
                    <path d="m9.2 12.2 2 2 3.8-4" />
                  </svg>
                )}
              </span>
              <div className={`${prefix}__titles`}>
                <h3
                  className={`${prefix}__title`}
                  dir="auto"
                  title={title}
                  id={leaving ? undefined : titleId}
                >
                  {title}
                </h3>
                {description && (
                  <p
                    className={`${prefix}__desc`}
                    dir="auto"
                    title={typeof description === "string" ? description : undefined}
                    id={leaving ? undefined : descriptionId}
                  >
                    {description}
                  </p>
                )}
              </div>
              {risk && (
                <span className={`${prefix}__risk`} data-risk={risk}>
                  <span className={`${prefix}__risk-dot`} aria-hidden="true" />
                  {riskLabels[risk]}
                  <span className={`${prefix}__risk-word`}>{" risk"}</span>
                </span>
              )}
            </div>
            {(content || details?.length) && (
              <div className={`${prefix}__preview`}>
                {content && <div className={`${prefix}__custom`}>{content}</div>}
                {details?.length ? (
                  <dl className={`${prefix}__details`}>
                    {details.map((detail, index) => (
                      <div className={`${prefix}__detail`} key={detail.label + index}>
                        <dt dir="auto" title={detail.label}>
                          {detail.label}
                        </dt>
                        <dd dir="auto">{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            )}
            {(!clean || actions === "tray") && alwaysOption}
            {actions === "card" && footer}
          </div>
          {actions === "tray" && footer}
          {duration > 0 && (
            <span
              className={`${prefix}__sr`}
              id={leaving ? undefined : timerId}
            >{`Expires in ${describeCountdown(secondsRemaining)} unless approved. The timer pauses while the card is hovered or focused.`}</span>
          )}
        </div>
      )}
      {resolved && (
        <div
          ref={resolvedRef}
          className={`${prefix}__card ${prefix}__resolved`}
          tabIndex={-1}
          data-status={currentStatus}
          onFocus={() => {
            restoreFocusRef.current = true;
          }}
          onBlur={(event) => {
            if (event.relatedTarget || event.currentTarget.isConnected)
              restoreFocusRef.current = false;
          }}
        >
          <span className={`${prefix}__mark`} aria-hidden="true">
            <svg viewBox="0 0 16 16">
              {currentStatus === "approved" ? (
                <path d="M4.2 8.4 6.9 11 11.8 5.6" pathLength={1} />
              ) : (
                <path d="M5.2 5.2 10.8 10.8M10.8 5.2 5.2 10.8" pathLength={1} />
              )}
            </svg>
          </span>
          <span className={`${prefix}__row-title`} dir="auto" title={title} id={rowId}>
            {title}
          </span>
          <span className={`${prefix}__row-status`}>
            {decision}
            {currentStatus === "approved" && always && (
              <span className={`${prefix}__row-extra`}>{" · Always"}</span>
            )}
            {resolvedAt !== null && (
              <span className={`${prefix}__row-time`}>
                {" · "}
                {formatResolvedTime(resolvedAt)}
              </span>
            )}
          </span>
        </div>
      )}
      <span className={`${prefix}__sr`} role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
const riskLabels = { low: "Low", medium: "Medium", high: "High" };
export { ApprovalCard };
export type { ApprovalCardProps };
