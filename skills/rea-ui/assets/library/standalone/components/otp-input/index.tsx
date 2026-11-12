"use client";

import "./OtpInput.css";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
/*
 * OTP Input – the verification code field, in component logic and public types.
 * One real input sits under the boxes, so typing, Backspace, paste and the SMS autofill of
 * iOS and Android all work natively; the boxes only draw what it holds.
 * The focus ring glides from box to box with a soft blinking caret, digits pop in, a pasted code
 * fills the boxes one after another. Verifying shimmers, a wrong code shakes and clears for retyping,
 * a right one folds the boxes into a single "Verified" pill. A resend link counts down below.
 * Styles are provided by the sibling CSS import.
 */
export type OtpStatus = "idle" | "verifying" | "error" | "success";
export type OtpInputProps = {
  /** Number of boxes */
  length?: number;
  /** A small dash between the boxes – `true` puts it in the middle, a number after that many boxes */
  separator?: boolean | number;
  /** Digits only (numeric keyboard on phones); `false` allows letters too, shown in capitals */
  numeric?: boolean;
  /** The code – makes it controlled */
  value?: string;
  /** Starting code when uncontrolled */
  defaultValue?: string;
  onChange?: (code: string) => void;
  /** Called once the last box is filled – typed, pasted or autofilled */
  onComplete?: (code: string) => void;
  status?: OtpStatus;
  /** Shown below the boxes while `status` is "error" */
  errorMessage?: ReactNode;
  /** Clears the boxes shortly after an error, ready for the next try */
  clearOnError?: boolean;
  /** Text in the pill after a successful check */
  successLabel?: string;
  /** Shows "Resend code" below the boxes once the countdown is over */
  onResend?: () => void;
  /** Seconds until the code can be resent */
  resendIn?: number;
  /** Center the boxes and the lines below them */
  align?: "start" | "center";
  disabled?: boolean;
  autoFocus?: boolean;
  /** Accessible name of the field */
  label?: string;
  className?: string;
};
/* ---------- Helpers ---------- */
const pad = (n: number) => String(n).padStart(2, "0");
/** "0:24", "1:05:00", "3d 1h" */
const clock = (s: number) => {
  if (s >= 86400) return `${Math.floor(s / 86400)}d ${Math.floor((s % 86400) / 3600)}h`;
  if (s >= 3600)
    return `${Math.floor(s / 3600)}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  return `${Math.floor(s / 60)}:${pad(s % 60)}`;
};
/** Longest code the boxes are drawn for – past that the cells get too small to read */
const MAX_LENGTH = 24;
/** Full-width (１２３) and Arabic-Indic digits (٤٨٢) count as the digits they are */
const normalize = (text: string) =>
  text
    .normalize("NFKC")
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x660))
    .replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x6f0));
const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const icons = {
  check: "M5.5 12.5l4 4L18.5 8",
  alert: "M12 8v4.5M12 16h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
};
export function OtpInput({
  length: lengthProp = 6,
  separator = false,
  numeric = true,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  status = "idle",
  errorMessage = "That code didn't work. Try again.",
  clearOnError = true,
  successLabel = "Verified",
  onResend,
  resendIn: resendInProp = 30,
  align = "start",
  disabled = false,
  autoFocus = false,
  label = "Verification code",
  className,
}: OtpInputProps) {
  // A NaN or fractional length and a NaN countdown fall back instead of breaking the field
  const length = Number.isFinite(lengthProp)
    ? Math.min(MAX_LENGTH, Math.max(1, Math.floor(lengthProp)))
    : 6;
  const resendIn =
    Number.isFinite(resendInProp) && resendInProp > 0 ? Math.floor(resendInProp) : 0;
  /** Keeps allowed characters only – spaces and dashes of a pasted "482 913" fall away */
  const clean = (text: string) => {
    let out = "";
    for (const ch of normalize(String(text ?? ""))) {
      const c = numeric
        ? /[0-9]/.test(ch)
          ? ch
          : ""
        : /[a-z0-9]/i.test(ch)
          ? ch.toUpperCase()
          : "";
      if (c && out.length < length) out += c;
    }
    return out;
  };
  const [inner, setInner] = useState(() => clean(defaultValue));
  const code = clean(value ?? inner);
  const [idx, setIdx] = useState(Math.min(code.length, length - 1));
  const [focused, setFocused] = useState(false);
  const [errorShown, setErrorShown] = useState(false);
  const [clearing, setClearing] = useState(false); // the wrong code fades out
  const [locked, setLocked] = useState(false); // no typing between the shake and the clearing
  const [left, setLeft] = useState(resendIn);
  const [announce, setAnnounce] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const slots = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const pillInner = useRef<HTMLSpanElement>(null);
  const boxes = useRef<(HTMLSpanElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  const id = useId();
  // Every character remembers when it arrived, so it pops in once; pasted codes arrive one after another
  const prevCode = useRef(code);
  const stamps = useRef<number[]>([]);
  const delays = useRef<number[]>([]);
  const counter = useRef(0);
  if (prevCode.current !== code) {
    const before = prevCode.current;
    const changed = [...code].map((c, i) => c !== before[i]);
    const first = changed.indexOf(true);
    const bulk = changed.filter(Boolean).length > 1;
    changed.forEach((ch, i) => {
      if (!ch) return;
      stamps.current[i] = ++counter.current;
      delays.current[i] = bulk ? (i - first) * 45 : 0;
    });
    prevCode.current = code;
  }
  // An outside change of the value (or a shorter code) keeps the active box in reach
  const active = Math.min(idx, code.length, length - 1);
  const sepAt =
    separator === true
      ? Math.floor(length / 2)
      : typeof separator === "number"
        ? separator
        : 0;
  const busy = status === "verifying" || status === "success";
  const readOnly = busy || locked || disabled;
  const showError = status === "error" && errorShown;
  // The ring shows where the next character goes: while focused, or mid-way through a code
  const showRing =
    !busy && !disabled && (focused || (code.length > 0 && code.length < length));
  const commit = (next: string, nextIdx: number, user = true) => {
    if (value === undefined) setInner(next);
    if (next !== code) onChange?.(next);
    setIdx(Math.max(0, Math.min(nextIdx, next.length, length - 1)));
    if (!user) return;
    if (errorShown && next.length) setErrorShown(false);
    if (next.length === length && next !== code) onComplete?.(next);
  };
  /* ---------- Native input ---------- */
  const onInput = (el: HTMLInputElement) => {
    if (readOnly) return;
    const raw = el.value;
    const caretRaw = el.selectionStart ?? raw.length;
    const next = clean(raw);
    // The caret counts the kept characters in front of it
    const caret = clean(raw.slice(0, caretRaw)).length;
    if (next === code) {
      el.value = code;
      syncSelection();
      return;
    }
    commit(next, caret);
  };
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (readOnly) return;
    const text = clean(e.clipboardData.getData("text"));
    if (!text) return;
    // A whole code replaces everything; a part is written from the active box on
    if (text.length >= length) return commit(text.slice(0, length), length - 1);
    const next = (code.slice(0, active) + text + code.slice(active + text.length)).slice(
      0,
      length,
    );
    commit(next, active + text.length);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const last = Math.min(code.length, length - 1);
    const moves: Record<string, number> = {
      ArrowLeft: active - 1,
      ArrowRight: active + 1,
      Home: 0,
      End: last,
      ArrowUp: 0,
      ArrowDown: last,
    };
    if (e.key in moves && !e.shiftKey && !e.metaKey) {
      e.preventDefault();
      setIdx(Math.max(0, Math.min(moves[e.key], last)));
    }
  };
  /** A tap or click picks the box under the pointer – never beyond the first empty one */
  const pick = (x: number) => {
    let i = boxes.current.findIndex((b) => b && x < b.getBoundingClientRect().right + 4);
    if (i < 0) i = length - 1;
    setIdx(Math.min(i, code.length, length - 1));
    requestAnimationFrame(syncSelection);
  };
  // The real input selects the active character, so typing replaces it and Backspace removes it
  const syncSelection = () => {
    const el = input.current;
    if (!el || document.activeElement !== el) return;
    const i = Math.min(idx, code.length, length - 1);
    if (i < code.length) el.setSelectionRange(i, i + 1);
    else el.setSelectionRange(i, i);
  };
  useLayoutEffect(syncSelection);
  useEffect(() => {
    if (autoFocus) input.current?.focus({ preventScroll: true });
  }, [autoFocus]);
  /* ---------- The gliding ring and the success pill ---------- */
  useLayoutEffect(() => {
    const r = ring.current;
    const box = boxes.current[active];
    if (r && box) {
      const first = !r.dataset.ready;
      if (first) r.style.transition = "none";
      r.style.width = `${box.offsetWidth}px`;
      r.style.height = `${box.offsetHeight}px`;
      r.style.transform = `translate(${box.offsetLeft}px, ${box.offsetTop}px)`;
      if (first) {
        r.dataset.ready = "1";
        void r.offsetWidth;
        r.style.transition = "";
      }
    }
    // The pill starts as wide as all the boxes and morphs down to its label
    const p = pill.current;
    const s = slots.current;
    if (p && s && pillInner.current) {
      const w = status === "success" ? pillInner.current.offsetWidth : s.offsetWidth;
      p.style.width = `${w}px`;
      // A label wider than the boxes slides back inside the field instead of hanging over its edge
      const root = s.parentElement?.parentElement;
      let shift = 0;
      if (root && w > s.offsetWidth) {
        const box = root.getBoundingClientRect();
        const own = s.getBoundingClientRect();
        const left = own.left + own.width / 2 - w / 2;
        shift = Math.min(Math.max(left, box.left), box.right - w) - left;
      }
      p.style.marginLeft = shift ? `${shift}px` : "";
    }
  });
  // Phones turning, containers resizing: ring and pill follow
  useEffect(() => {
    const s = slots.current;
    if (!s) return;
    const ro = new ResizeObserver(() => {
      const r = ring.current;
      const box = boxes.current[active];
      if (r && box) {
        r.style.width = `${box.offsetWidth}px`;
        r.style.height = `${box.offsetHeight}px`;
        r.style.transform = `translate(${box.offsetLeft}px, ${box.offsetTop}px)`;
      }
      if (pill.current && status !== "success")
        pill.current.style.width = `${s.offsetWidth}px`;
    });
    ro.observe(s);
    return () => ro.disconnect();
  }, [active, status]);
  /* ---------- Status ---------- */
  const prevStatus = useRef(status);
  useEffect(() => {
    const before = prevStatus.current;
    prevStatus.current = status;
    if (status === before) return;
    if (status === "verifying") setAnnounce("Verifying code");
    if (status === "success") setAnnounce(successLabel);
    if (status !== "error") {
      setErrorShown(false);
      return;
    }
    setErrorShown(true);
    setAnnounce(
      typeof errorMessage === "string" ? errorMessage : "That code didn't work",
    );
    // A calm shake, then the wrong code fades out so the next try starts fresh
    if (!reduced()) {
      slots.current?.animate(
        [
          { transform: "none" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(5px)" },
          { transform: "translateX(-3px)" },
          { transform: "translateX(2px)" },
          { transform: "none" },
        ],
        { duration: 420, easing: "ease-out" },
      );
    }
    if (!clearOnError) return;
    setLocked(true);
    timers.current.push(
      window.setTimeout(() => setClearing(true), 700),
      window.setTimeout(() => {
        setClearing(false);
        setLocked(false);
        commit("", 0, false);
      }, 980),
    );
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  /* ---------- Resend countdown ---------- */
  useEffect(() => {
    if (left <= 0) {
      if (onResend && resendIn > 0) setAnnounce("You can resend the code now");
      return;
    }
    const t = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]); // eslint-disable-line react-hooks/exhaustive-deps
  const resend = () => {
    onResend?.();
    setLeft(resendIn);
    setAnnounce("A new code is on its way");
  };
  /* ---------- Render ---------- */
  const cells: ReactNode[] = [];
  for (let i = 0; i < length; i++) {
    if (sepAt > 0 && sepAt < length && i === sepAt)
      cells.push(<span key="sep" className="ui-otp__sep" />);
    const ch = code[i];
    cells.push(
      <span
        key={i}
        ref={(el) => {
          boxes.current[i] = el;
        }}
        className="ui-otp__box"
        data-filled={ch ? "" : undefined}
        style={{ "--i": i } as CSSProperties}
      >
        {ch && (
          <span
            key={stamps.current[i]}
            className="ui-otp__char"
            style={{ animationDelay: `${delays.current[i] ?? 0}ms` }}
          >
            {ch}
          </span>
        )}
      </span>,
    );
  }
  return (
    <div
      className={["ui-otp", className].filter(Boolean).join(" ")}
      data-status={status}
      data-error={showError || undefined}
      data-align={align}
      data-disabled={disabled || undefined}
    >
      {/* React 19 hoists this into <head> once, no matter how many fields render */}

      <div className="ui-otp__field">
        <div
          ref={slots}
          className="ui-otp__slots"
          dir="ltr"
          data-clearing={clearing || undefined}
          style={
            {
              "--n": length,
              "--sep-w":
                sepAt > 0 && sepAt < length ? "calc(var(--ui-otp-gap) + 10px)" : "0px",
            } as CSSProperties
          }
        >
          {cells}
          <span
            ref={ring}
            className="ui-otp__ring"
            data-show={showRing || undefined}
            aria-hidden="true"
          >
            <span
              className="ui-otp__caret"
              data-show={(focused && !code[active] && !readOnly) || undefined}
            />
          </span>
          <span ref={pill} className="ui-otp__pill" aria-hidden="true">
            <span ref={pillInner} className="ui-otp__pill-inner">
              <svg viewBox="0 0 24 24" className="ui-otp__check" aria-hidden="true">
                <path d={icons.check} pathLength={1} />
              </svg>
              <span className="ui-otp__pill-text" title={successLabel}>
                {successLabel}
              </span>
            </span>
          </span>
          <input
            ref={input}
            className="ui-otp__input"
            type="text"
            value={code}
            inputMode={numeric ? "numeric" : "text"}
            pattern={numeric ? "[0-9]*" : undefined}
            autoComplete="one-time-code"
            autoCapitalize={numeric ? "off" : "characters"}
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="done"
            aria-label={`${label}, ${length} ${numeric ? (length === 1 ? "digit" : "digits") : length === 1 ? "character" : "characters"}`}
            aria-invalid={showError || undefined}
            aria-describedby={showError ? `${id}-msg` : undefined}
            disabled={disabled}
            readOnly={busy || locked}
            onChange={(e) => onInput(e.currentTarget)}
            onPaste={onPaste}
            onKeyDown={onKeyDown}
            onFocus={() => {
              setFocused(true);
              requestAnimationFrame(syncSelection);
            }}
            onBlur={() => setFocused(false)}
            onPointerUp={(e) => pick(e.clientX)}
            onSelect={(e) => {
              // A native caret move (long press, mouse drag) snaps back to a single box
              const el = e.currentTarget;
              const want = active < code.length ? [active, active + 1] : [active, active];
              if (el.selectionStart !== want[0] || el.selectionEnd !== want[1])
                syncSelection();
            }}
          />
        </div>
      </div>

      {/* The error message slides in below and folds away once retyping starts */}
      <div className="ui-otp__msg" data-show={showError || undefined}>
        <div className="ui-otp__msg-inner">
          <p id={`${id}-msg`} className="ui-otp__msg-text">
            <svg viewBox="0 0 24 24" className="ui-otp__alert" aria-hidden="true">
              <path d={icons.alert} />
            </svg>
            <span>{errorMessage}</span>
          </p>
        </div>
      </div>

      {onResend && (
        <div className="ui-otp__resend" data-hidden={status === "success" || undefined}>
          <span className="ui-otp__resend-q">Didn't get a code?</span>{" "}
          {left > 0 ? (
            <span key="wait" className="ui-otp__swap ui-otp__wait">
              Resend in{"\u00a0"}
              <span className="ui-otp__time">{clock(left)}</span>
            </span>
          ) : (
            <button
              key="go"
              type="button"
              className="ui-otp__swap ui-otp__resend-btn"
              onClick={resend}
              disabled={disabled || busy}
            >
              Resend code
            </button>
          )}
        </div>
      )}

      <span className="ui-otp__live" aria-live="polite">
        {announce}
      </span>
    </div>
  );
}
