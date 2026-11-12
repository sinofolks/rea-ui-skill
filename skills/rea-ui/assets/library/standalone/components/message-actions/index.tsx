"use client";

import "./MessageActions.css";
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
 * Message Actions – the small bar under an AI chat message, in one self-contained file.
 *   · Copy: the icon turns into a check and the tooltip says "Copied"
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
    <span className={["ui-ma__swap", className].filter(Boolean).join(" ")}>
      {out && (
        <span
          key={`out-${out.id}`}
          className="ui-ma__swap-item"
          data-out=""
          aria-hidden="true"
        >
          {out.node}
        </span>
      )}
      <span key={id} className="ui-ma__swap-item">
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
      className={["ui-ma-text", className].filter(Boolean).join(" ")}
      style={{ height }}
    >
      <div ref={inner} className="ui-ma-text__inner" dir="auto">
        <Swap id={String(version)} className="ui-ma-text__swap">
          {children}
        </Swap>
      </div>
    </div>
  );
}
/* ---------- Icons ---------- */
const Glyph = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="ui-ma__glyph" aria-hidden="true">
    <path d={d} />
  </svg>
);
const icons = {
  copy: "M9 9.5A1.5 1.5 0 0 1 10.5 8h8A1.5 1.5 0 0 1 20 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 9 18.5zM15 8V5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H9",
  check: "M5.5 12.5l4.2 4.2L18.5 7.8",
  redo: "M19.5 12a7.5 7.5 0 1 1-2.2-5.3L19.5 9M19.5 4.5V9H15",
  thumb:
    "M7.5 10.5v9M7.5 10.5l3.3-6a1.8 1.8 0 0 1 3.3 1.2l-.6 3.8H18a2 2 0 0 1 2 2.3l-1.2 6.4a2 2 0 0 1-2 1.8H5a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1z",
  speaker:
    "M11 5.5 6.8 9H4v6h2.8l4.2 3.5zM15.2 9.2a4 4 0 0 1 0 5.6M17.9 6.6a7.8 7.8 0 0 1 0 10.8",
  prev: "m14.5 7-5 5 5 5",
  next: "m9.5 7 5 5-5 5",
  close: "m7.5 7.5 9 9m0-9-9 9",
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
    <span className="ui-ma__item" key={o.key} data-flash={o.flash ? "" : undefined}>
      <button
        ref={o.refEl}
        type="button"
        className={`ui-ma__btn ui-ma__btn--${o.key}`}
        aria-label={o.labelText}
        aria-pressed={o.pressed}
        aria-expanded={o.expanded}
        aria-controls={o.controls}
        onClick={o.onClick}
        {...o.extra}
      >
        {o.children}
      </button>
      <span className="ui-ma__tip" aria-hidden="true">
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
          <span className="ui-ma__icon ui-ma__morph">
            <span className="ui-ma__layer" data-on={copied ? undefined : ""}>
              <Glyph d={icons.copy} />
            </span>
            <span
              className="ui-ma__layer ui-ma__layer--check"
              data-on={copied ? "" : undefined}
            >
              <Glyph d={icons.check} />
            </span>
          </span>
        ),
      });
    if (key === "regenerate")
      return (
        <span className="ui-ma__regen" key="regenerate">
          {button({
            key: "regenerate",
            tip: regenerating ? "Writing…" : "Regenerate",
            labelText: "Regenerate response",
            onClick: regenerate,
            extra: { "data-busy": regenerating ? "" : undefined },
            children: (
              <span className="ui-ma__icon">
                <span
                  className="ui-ma__spin"
                  key={spin}
                  data-spin={spin ? "" : undefined}
                >
                  <Glyph d={icons.redo} />
                </span>
              </span>
            ),
          })}
          <span
            className="ui-ma__versions"
            data-open={count > 1 ? "" : undefined}
            inert={count < 2}
          >
            <span className="ui-ma__versions-clip" role="group" aria-label="Versions">
              <button
                type="button"
                className="ui-ma__step"
                data-dir="prev"
                aria-label="Previous version"
                disabled={index === 0}
                onClick={() => goTo(index - 1)}
              >
                <Glyph d={icons.prev} />
              </button>
              <span
                className="ui-ma__count"
                aria-label={`Version ${fmt(index + 1)} of ${fmt(count)}`}
              >
                <Swap id={String(index)} className="ui-ma__count-now">
                  {fmt(index + 1)}
                </Swap>
                <span aria-hidden="true">/</span>
                <Swap id={String(count)}>{fmt(count)}</Swap>
              </span>
              <button
                type="button"
                className="ui-ma__step"
                data-dir="next"
                aria-label="Next version"
                disabled={index >= count - 1}
                onClick={() => goTo(index + 1)}
              >
                <Glyph d={icons.next} />
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
              <span className="ui-ma__icon ui-ma__thumb">
                <Glyph d={icons.thumb} />
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
              <span className="ui-ma__icon ui-ma__thumb">
                <Glyph d={icons.thumb} />
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
        <span className="ui-ma__icon ui-ma__morph">
          <span className="ui-ma__layer" data-on={playing ? undefined : ""}>
            <Glyph d={icons.speaker} />
          </span>
          <span className="ui-ma__layer ui-ma__eq" data-on={playing ? "" : undefined}>
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
      className={["ui-ma", className].filter(Boolean).join(" ")}
      data-quiet={quiet ? "" : undefined}
      data-active={active ? "" : undefined}
    >
      <div className="ui-ma__bar" role="group" aria-label={label}>
        {parts}
      </div>

      {actions.includes("feedback") && (
        <div
          id={`${uid}-feedback`}
          className="ui-ma__fold"
          data-open={panel ? "" : undefined}
          inert={!panel}
        >
          <div className="ui-ma__clip">
            <div
              className="ui-ma__panel"
              role="group"
              aria-labelledby={`${uid}-ask`}
              onKeyDown={onPanelKey}
            >
              <div className="ui-ma__panel-head">
                <span id={`${uid}-ask`} className="ui-ma__ask">
                  What went wrong?
                </span>
                <button
                  type="button"
                  className="ui-ma__close"
                  aria-label="Close feedback"
                  onClick={closePanel}
                >
                  <Glyph d={icons.close} />
                </button>
              </div>
              <div className="ui-ma__chips">
                {(Array.isArray(reasons) ? reasons : []).map((r, i) => (
                  <button
                    key={`${r}-${i}`}
                    type="button"
                    className="ui-ma__chip"
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
                  className="ui-ma__send"
                  data-sent={sent ? "" : undefined}
                  disabled={!reason}
                  aria-disabled={sent || undefined}
                  onClick={send}
                >
                  <Swap id={sent ? "sent" : "send"}>
                    {sent ? (
                      <>
                        <Glyph d={icons.check} />
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
                  className="ui-ma__fold"
                  data-open={reason === "Other" && !sent ? "" : undefined}
                  inert={reason !== "Other" || sent}
                >
                  <div className="ui-ma__clip">
                    <input
                      className="ui-ma__input"
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

      <span className="ui-ma__sr" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
