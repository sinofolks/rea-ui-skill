"use client";

import "./MessageActions.clean.css";
import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from "react";
/*
 * Message Actions (Clean) – the small bar under an AI chat message, in one self-contained file.
 * Clean style: ghost icon buttons with thin or solid 16px glyphs, a pressed action takes the selected-tab look,
 * the feedback reasons are tab buttons and Send is the dark chip. Made to sit as the last row of a white card.
 *   · Copy: the icon turns into a green check and the tooltip says "Copied"
 *   · Regenerate: the arrow spins once; with more than one version a "‹ 2 / 3 ›" switcher unfolds next to it
 *   · Thumbs up / down fill with a little pop; thumbs down unfolds a short feedback row with reasons and a send button
 *   · Read aloud: the speaker becomes a tiny equalizer while it plays, a second press stops it
 * The bar stays quiet (faded) until the message is hovered or something inside it is focused.
 * MessageText (also exported) crossfades the message itself when the version changes.
 * Styles are provided by the sibling CSS import.
 */
export type MessageActionKey = "copy" | "regenerate" | "feedback" | "speak";
export type FeedbackKind = "up" | "down";
export type MessageActionsProps = {
  /** The message text – copied to the clipboard by Copy and used to time Read aloud */
  text?: string;
  /** Which actions to show, in this order */
  actions?: MessageActionKey[];
  /** All versions of the message, or just how many there are. From 2 on the version switcher shows */
  versions?: number | string[];
  /** Controlled version (0-based index) */
  version?: number;
  /** Starting version when uncontrolled – defaults to the newest */
  defaultVersion?: number;
  /** Called with the version index picked in the switcher */
  onVersionChange?: (index: number) => void;
  /** Called after Copy, with `text` */
  onCopy?: (text?: string) => void;
  /** Called when Regenerate is pressed – add a version and the switcher jumps to it */
  onRegenerate?: () => void;
  /** Keeps the regenerate arrow spinning while a new version is written */
  regenerating?: boolean;
  /** "up" or "down" when a thumb is pressed, null when it is taken back, and "down" with a reason when the feedback row is sent */
  onFeedback?: (kind: FeedbackKind | null, reason?: string) => void;
  /** Quick reasons in the feedback row. "Other" opens a small text field */
  reasons?: string[];
  /** Called with true when Read aloud starts and false when it stops */
  onSpeak?: (playing: boolean) => void;
  /** Controlled playing state, e.g. tied to your speech player */
  speaking?: boolean;
  /** How long an uncontrolled read aloud plays, in ms – defaults to an estimate from `text` */
  speakDuration?: number;
  /** Faded until the message is hovered (default true). Put data-ui-message on the message wrapper */
  quiet?: boolean;
  /** Accessible name of the bar */
  label?: string;
  className?: string;
};
/* ---------- Helpers ---------- */
const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
/** Text that changes without a jump: the old one fades out underneath while the new one fades in */
function Swap({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  type Line = {
    id: string;
    node: ReactNode;
  };
  const last = useRef<Line>({ id, node: children });
  const [shownId, setShownId] = useState(id);
  const [out, setOut] = useState<Line | null>(null);
  if (shownId !== id) {
    setShownId(id);
    setOut(last.current);
  }
  last.current = { id, node: children };
  useEffect(() => {
    if (!out) return;
    const timer = window.setTimeout(() => setOut(null), 300);
    return () => window.clearTimeout(timer);
  }, [out]);
  return (
    <span className={["ui-mac__swap", className].filter(Boolean).join(" ")}>
      {out && (
        <span
          key={`out-${out.id}`}
          className="ui-mac__swap-item"
          data-out=""
          aria-hidden="true"
        >
          {out.node}
        </span>
      )}
      <span key={id} className="ui-mac__swap-item">
        {children}
      </span>
    </span>
  );
}
/**
 * The message itself, crossfading when `version` changes: the old text fades out underneath while the new one fades in,
 * and the block eases to its new height.
 */
export function MessageText({
  version,
  children,
  className,
}: {
  version: string | number;
  children: ReactNode;
  className?: string;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  useEffect(() => {
    const el = inner.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      className={["ui-mac-text", className].filter(Boolean).join(" ")}
      style={{ height }}
    >
      <div ref={inner} className="ui-mac-text__inner" dir="auto">
        <Swap id={String(version)} className="ui-mac-text__swap">
          {children}
        </Swap>
      </div>
    </div>
  );
}
/* ---------- Icons ---------- */
const Glyph = ({ d, solid }: { d: string; solid?: boolean }) => (
  <svg
    viewBox="0 0 16 16"
    className="ui-mac__glyph"
    data-solid={solid || undefined}
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);
/** The speaker: a solid body with two thin sound waves */
const Speaker = () => (
  <svg viewBox="0 0 16 16" className="ui-mac__glyph" aria-hidden="true">
    <path
      className="ui-mac__fill"
      d="M7.4 3.2a.6.6 0 0 1 1 .46v8.68a.6.6 0 0 1-1 .46L4.6 10.5H3A1.5 1.5 0 0 1 1.5 9V7A1.5 1.5 0 0 1 3 5.5h1.6l2.8-2.3Z"
    />
    <path d="M10.6 6.2a2.6 2.6 0 0 1 0 3.6M12.4 4.4a5.2 5.2 0 0 1 0 7.2" />
  </svg>
);
const icons = {
  copy: "M5.5 2A1.5 1.5 0 0 0 4 3.5V4h5A3 3 0 0 1 12 7v5h.5a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 2h-7ZM3.5 5A1.5 1.5 0 0 0 2 6.5v6A1.5 1.5 0 0 0 3.5 14H9a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 9 5H3.5Z",
  check:
    "M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Zm8.9-1.2a.5.5 0 0 0-.8-.6L7.44 9.23 6.35 8.15a.5.5 0 1 0-.7.7l1.5 1.5a.5.5 0 0 0 .76-.06l2.5-3.5Z",
  tick: "M3.5 8.5 6.5 11.5 12.5 4.5",
  redo: "M13 8a5 5 0 1 1-1.46-3.54M13 2.5v2.5h-2.5",
  thumb:
    "M4.5 7v6.5H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1.5Zm1 6.5h5.95a1.5 1.5 0 0 0 1.47-1.2l.86-4.3A1.5 1.5 0 0 0 12.31 6.2H9.5l.42-2.08A1.4 1.4 0 0 0 7.3 3.1L5.5 6.8v6.7Z",
  next: "M10.85 7.65a.5.5 0 0 1 0 .7L7.2 12a.5.5 0 0 1-.7-.7L9.79 8 6.5 4.7a.5.5 0 1 1 .7-.7l3.65 3.65Z",
  close: "m4.5 4.5 7 7m0-7-7 7",
};
const DEFAULT_ACTIONS: MessageActionKey[] = ["copy", "regenerate", "feedback", "speak"];
/** Known actions only, each once – an unknown key or a repeat would render a stray or doubled button */
const cleanActions = (list: unknown): MessageActionKey[] =>
  Array.isArray(list)
    ? [...new Set(list)].filter((k): k is MessageActionKey => DEFAULT_ACTIONS.includes(k))
    : DEFAULT_ACTIONS;
/** A whole, finite number or the fallback */
const whole = (n: unknown, fallback: number) =>
  typeof n === "number" && Number.isFinite(n) ? Math.floor(n) : fallback;
const fmt = (n: number) => n.toLocaleString("en-US");
const DEFAULT_REASONS = [
  "Not accurate",
  "Too long",
  "Didn't follow instructions",
  "Other",
];
export function MessageActions({
  text,
  actions: actionsProp = DEFAULT_ACTIONS,
  versions,
  version,
  defaultVersion,
  onVersionChange,
  onCopy,
  onRegenerate,
  regenerating = false,
  onFeedback,
  reasons = DEFAULT_REASONS,
  onSpeak,
  speaking,
  speakDuration,
  quiet = true,
  label = "Message actions",
  className,
}: MessageActionsProps) {
  const uid = useId();
  const actions = cleanActions(actionsProp);
  const count = Math.max(
    1,
    whole(
      typeof versions === "number"
        ? versions
        : Array.isArray(versions)
          ? versions.length
          : 1,
      1,
    ),
  );
  /* ----- Versions ----- */
  const [inner, setInner] = useState(() =>
    Math.min(count - 1, Math.max(0, whole(defaultVersion, count - 1))),
  );
  const [seenCount, setSeenCount] = useState(count);
  const [vote, setVote] = useState<FeedbackKind | null>(null);
  const [panel, setPanel] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [other, setOther] = useState("");
  const [sent, setSent] = useState(false);
  if (seenCount !== count) {
    // A new version arrived: show it, and its vote starts fresh
    if (count > seenCount) {
      setInner(count - 1);
      setVote(null);
      setPanel(false);
    }
    setSeenCount(count);
  }
  const index = Math.min(count - 1, Math.max(0, whole(version, inner)));
  const goTo = (i: number) => {
    const next = Math.min(count - 1, Math.max(0, i));
    if (next === index) return;
    if (version === undefined) setInner(next);
    onVersionChange?.(next);
    announce(`Version ${fmt(next + 1)} of ${fmt(count)}`);
  };
  /* ----- Status line for screen readers ----- */
  const [status, setStatus] = useState("");
  const announce = (s: string) => setStatus((old) => (old === s ? `${s} ` : s));
  /* ----- Copy ----- */
  const [copied, setCopied] = useState(0);
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(0), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);
  const copy = () => {
    try {
      if (text !== undefined) navigator.clipboard?.writeText(text).catch(() => {});
    } catch {
      // No clipboard here (insecure page, old browser) – the check still confirms the press
    }
    onCopy?.(text);
    setCopied(Date.now());
    announce("Copied");
  };
  /* ----- Regenerate ----- */
  const [spin, setSpin] = useState(0);
  const regenerate = () => {
    setSpin((s) => s + 1);
    onRegenerate?.();
    announce("Regenerating");
  };
  /* ----- Feedback ----- */
  const thumbsUp = () => {
    if (vote === "up") {
      setVote(null);
      onFeedback?.(null);
      return;
    }
    setVote("up");
    setPanel(false);
    onFeedback?.("up");
    announce("Marked as good response");
  };
  const thumbsDown = () => {
    if (vote === "down") {
      setVote(null);
      setPanel(false);
      onFeedback?.(null);
      return;
    }
    setVote("down");
    setPanel(true);
    setSent(false);
    setReason(null);
    setOther("");
    onFeedback?.("down");
    announce("Marked as bad response. Tell us what went wrong below");
  };
  const send = () => {
    if (!reason || sent) return;
    onFeedback?.("down", reason === "Other" ? other.trim() || "Other" : reason);
    setSent(true);
    announce("Thanks for the feedback");
  };
  useEffect(() => {
    if (!sent) return;
    const t = window.setTimeout(() => setPanel(false), reduced() ? 1200 : 1500);
    return () => window.clearTimeout(t);
  }, [sent]);
  const downRef = useRef<HTMLButtonElement>(null);
  const closePanel = () => {
    setPanel(false);
    downRef.current?.focus();
  };
  /* ----- Read aloud ----- */
  const [innerSpeaking, setInnerSpeaking] = useState(false);
  const playing = speaking ?? innerSpeaking;
  const words = text ? text.trim().split(/\s+/).length : 0;
  const duration =
    typeof speakDuration === "number" && speakDuration > 0
      ? speakDuration
      : Math.max(2600, words * 380);
  useEffect(() => {
    if (speaking !== undefined || !innerSpeaking) return;
    const t = window.setTimeout(() => {
      setInnerSpeaking(false);
      onSpeak?.(false);
      announce("Finished reading");
    }, duration);
    return () => window.clearTimeout(t);
    // onSpeak is read when the timer ends – a new function each render must not restart it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerSpeaking, speaking, duration]);
  const speak = () => {
    const next = !playing;
    if (speaking === undefined) setInnerSpeaking(next);
    onSpeak?.(next);
    announce(next ? "Reading aloud" : "Stopped reading");
  };
  const active = Boolean(copied) || panel || playing || regenerating;
  /* ----- One button with its tooltip ----- */
  const button = (o: {
    key: string;
    tip: string;
    labelText: string;
    onClick: () => void;
    children: ReactNode;
    pressed?: boolean;
    flash?: boolean;
    extra?: Record<string, string | undefined>;
    expanded?: boolean;
    controls?: string;
    refEl?: Ref<HTMLButtonElement>;
  }) => (
    <span className="ui-mac__item" key={o.key} data-flash={o.flash ? "" : undefined}>
      <button
        ref={o.refEl}
        type="button"
        className={`ui-mac__btn ui-mac__btn--${o.key}`}
        aria-label={o.labelText}
        aria-pressed={o.pressed}
        aria-expanded={o.expanded}
        aria-controls={o.controls}
        onClick={o.onClick}
        {...o.extra}
      >
        {o.children}
      </button>
      <span className="ui-mac__tip" aria-hidden="true">
        <Swap id={o.tip}>{o.tip}</Swap>
      </span>
    </span>
  );
  const parts: ReactNode[] = actions.map((key) => {
    if (key === "copy")
      return button({
        key: "copy",
        tip: copied ? "Copied" : "Copy",
        labelText: copied ? "Copied" : "Copy message",
        onClick: copy,
        flash: Boolean(copied),
        extra: { "data-done": copied ? "" : undefined },
        children: (
          <span className="ui-mac__icon ui-mac__morph">
            <span className="ui-mac__layer" data-on={copied ? undefined : ""}>
              <Glyph d={icons.copy} solid />
            </span>
            <span
              className="ui-mac__layer ui-mac__layer--check"
              data-on={copied ? "" : undefined}
            >
              <Glyph d={icons.check} solid />
            </span>
          </span>
        ),
      });
    if (key === "regenerate")
      return (
        <span className="ui-mac__regen" key="regenerate">
          {button({
            key: "regenerate",
            tip: regenerating ? "Writing…" : "Regenerate",
            labelText: "Regenerate response",
            onClick: regenerate,
            extra: { "data-busy": regenerating ? "" : undefined },
            children: (
              <span className="ui-mac__icon">
                <span
                  className="ui-mac__spin"
                  key={spin}
                  data-spin={spin ? "" : undefined}
                >
                  <Glyph d={icons.redo} />
                </span>
              </span>
            ),
          })}
          <span
            className="ui-mac__versions"
            data-open={count > 1 ? "" : undefined}
            inert={count < 2}
          >
            <span className="ui-mac__versions-clip" role="group" aria-label="Versions">
              <button
                type="button"
                className="ui-mac__step"
                data-dir="prev"
                aria-label="Previous version"
                disabled={index === 0}
                onClick={() => goTo(index - 1)}
              >
                <Glyph d={icons.next} solid />
              </button>
              <span
                className="ui-mac__count"
                aria-label={`Version ${fmt(index + 1)} of ${fmt(count)}`}
              >
                <Swap id={String(index)} className="ui-mac__count-now">
                  {fmt(index + 1)}
                </Swap>
                <span aria-hidden="true">/</span>
                <Swap id={String(count)}>{fmt(count)}</Swap>
              </span>
              <button
                type="button"
                className="ui-mac__step"
                data-dir="next"
                aria-label="Next version"
                disabled={index >= count - 1}
                onClick={() => goTo(index + 1)}
              >
                <Glyph d={icons.next} solid />
              </button>
            </span>
          </span>
        </span>
      );
    if (key === "feedback")
      return (
        <Fragment key="feedback">
          {button({
            key: "up",
            tip: vote === "up" ? "Thanks!" : "Good response",
            labelText: "Good response",
            pressed: vote === "up",
            onClick: thumbsUp,
            children: (
              <span className="ui-mac__icon ui-mac__thumb">
                <Glyph d={icons.thumb} solid />
              </span>
            ),
          })}
          {button({
            key: "down",
            tip: "Bad response",
            labelText: "Bad response",
            pressed: vote === "down",
            expanded: panel,
            controls: `${uid}-feedback`,
            onClick: thumbsDown,
            refEl: downRef,
            children: (
              <span className="ui-mac__icon ui-mac__thumb">
                <Glyph d={icons.thumb} solid />
              </span>
            ),
          })}
        </Fragment>
      );
    return button({
      key: "speak",
      tip: playing ? "Stop" : "Read aloud",
      labelText: playing ? "Stop reading" : "Read aloud",
      pressed: playing,
      onClick: speak,
      children: (
        <span className="ui-mac__icon ui-mac__morph">
          <span className="ui-mac__layer" data-on={playing ? undefined : ""}>
            <Speaker />
          </span>
          <span className="ui-mac__layer ui-mac__eq" data-on={playing ? "" : undefined}>
            <i />
            <i />
            <i />
            <i />
          </span>
        </span>
      ),
    });
  });
  const onPanelKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closePanel();
    }
  };
  return (
    <div
      className={["ui-mac", className].filter(Boolean).join(" ")}
      data-quiet={quiet ? "" : undefined}
      data-active={active ? "" : undefined}
    >
      <div className="ui-mac__bar" role="group" aria-label={label}>
        {parts}
      </div>

      {actions.includes("feedback") && (
        <div
          id={`${uid}-feedback`}
          className="ui-mac__fold"
          data-open={panel ? "" : undefined}
          inert={!panel}
        >
          <div className="ui-mac__clip">
            <div
              className="ui-mac__panel"
              role="group"
              aria-labelledby={`${uid}-ask`}
              onKeyDown={onPanelKey}
            >
              <div className="ui-mac__panel-head">
                <span id={`${uid}-ask`} className="ui-mac__ask">
                  What went wrong?
                </span>
                <button
                  type="button"
                  className="ui-mac__close"
                  aria-label="Close feedback"
                  onClick={closePanel}
                >
                  <Glyph d={icons.close} />
                </button>
              </div>
              <div className="ui-mac__chips">
                {(Array.isArray(reasons) ? reasons : []).map((r, i) => (
                  <button
                    key={`${r}-${i}`}
                    type="button"
                    className="ui-mac__chip"
                    aria-pressed={reason === r}
                    disabled={sent}
                    onClick={() => setReason(reason === r ? null : r)}
                    title={r}
                    dir="auto"
                  >
                    {r}
                  </button>
                ))}
                <button
                  type="button"
                  className="ui-mac__send"
                  data-sent={sent ? "" : undefined}
                  disabled={!reason}
                  aria-disabled={sent || undefined}
                  onClick={send}
                >
                  <Swap id={sent ? "sent" : "send"}>
                    {sent ? (
                      <>
                        <Glyph d={icons.tick} />
                        Thanks!
                      </>
                    ) : (
                      "Send"
                    )}
                  </Swap>
                </button>
              </div>
              {Array.isArray(reasons) && reasons.includes("Other") && (
                <div
                  className="ui-mac__fold"
                  data-open={reason === "Other" && !sent ? "" : undefined}
                  inert={reason !== "Other" || sent}
                >
                  <div className="ui-mac__clip">
                    <input
                      className="ui-mac__input"
                      value={other}
                      placeholder="Tell us more (optional)"
                      dir="auto"
                      aria-label="What went wrong, in your words"
                      onChange={(e) => setOther(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") send();
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <span className="ui-mac__sr" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
