"use client";

import "./ThinkingLoader.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
/*
 * Thinking Loader – a small "the model is working" pill, in component logic and public types.
 * A spinner of eight rays and a label with a light sweeping over it. The label walks through
 * phases (Thinking → Searching the web → …): the old one rolls up and blurs out, the new one
 * rolls in, and the pill glides to its new width. When done, the spinner turns into a check
 * and the label settles on "Thought for 6s".
 * Styles are provided by the sibling CSS import.
 */
export type ThinkingLoaderProps = {
  /** Labels to walk through, one after another */
  phases?: string[];
  /** Time per phase, in ms */
  interval?: number;
  /** Show a specific phase instead of advancing on a timer – e.g. from your stream events */
  phase?: number;
  /** Start over after the last phase instead of holding it */
  loop?: boolean;
  /** Finished: the spinner turns into a check and the label into doneLabel */
  done?: boolean;
  /** Label once done – a string, or a function that gets the seconds since the loader started */
  doneLabel?: string | ((seconds: number) => string);
  size?: "sm" | "md";
  /** "pill" = bordered capsule, "plain" = just the spinner and the label, e.g. inside a chat bubble */
  variant?: "pill" | "plain";
  className?: string;
};
const DEFAULT_PHASES = [
  "Thinking",
  "Searching the web",
  "Reading sources",
  "Writing response",
];
const RAYS = Array.from({ length: 8 }, (_, i) => i);
// 75s reads "1m 15s", a long run "2h 05m" or "3d 4h"
const took = (s: number) => {
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  const h = Math.floor(m / 60);
  return h < 24
    ? `${h}h ${String(m % 60).padStart(2, "0")}m`
    : `${Math.floor(h / 24)}d ${h % 24}h`;
};
export function ThinkingLoader({
  phases: phasesProp = DEFAULT_PHASES,
  interval: intervalProp = 2200,
  phase,
  loop = false,
  done = false,
  doneLabel = (s) => `Thought for ${took(s)}`,
  size = "md",
  variant = "pill",
  className,
}: ThinkingLoaderProps) {
  // An empty or missing list still says something; 0 or NaN never spins the timer every frame
  const given = Array.isArray(phasesProp) ? phasesProp.map((p) => String(p ?? "")) : [];
  const phases = given.length ? given : DEFAULT_PHASES.slice(0, 1);
  const interval =
    Number.isFinite(intervalProp) && intervalProp > 0
      ? Math.max(intervalProp, 200)
      : 2200;
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(() => Date.now());
  const [seconds, setSeconds] = useState<number | null>(null);
  // Read the clock in the same render that turns done on – and restart it when work starts again
  const elapsed = seconds ?? Math.max(1, Math.round((Date.now() - started) / 1000));
  if (done && seconds === null) setSeconds(elapsed);
  if (!done && seconds !== null) {
    setSeconds(null);
    setStarted(Date.now());
    setStep(0);
  }
  // Advance through the phases on a timer – unless the phase is controlled
  useEffect(() => {
    if (done || (phase !== undefined && Number.isFinite(phase)) || phases.length < 2)
      return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1 < phases.length ? s + 1 : loop ? 0 : s));
    }, interval);
    return () => window.clearInterval(id);
  }, [done, phase, phases.length, interval, loop]);
  const wanted = phase !== undefined && Number.isFinite(phase) ? Math.floor(phase) : step;
  const index = Math.min(Math.max(wanted, 0), Math.max(phases.length - 1, 0));
  const label = String(
    (done
      ? typeof doneLabel === "function"
        ? doneLabel(elapsed)
        : doneLabel
      : phases[index]) ?? "",
  );
  // The label on screen and the one rolling out – swapped during render so both animate in the same frame
  const [shown, setShown] = useState({ key: 0, text: label });
  const [leaving, setLeaving] = useState<{
    key: number;
    text: string;
  } | null>(null);
  if (label !== shown.text) {
    setLeaving(shown);
    setShown({ key: shown.key + 1, text: label });
  }
  // The text box takes the width of the incoming label, so the pill glides to its new size
  const root = useRef<HTMLSpanElement>(null);
  const box = useRef<HTMLSpanElement>(null);
  const current = useRef<HTMLSpanElement>(null);
  const measured = useRef(false);
  // Width of the label, capped by the room next to the spinner – a label that doesn't fit ends in "…"
  const fit = useRef(() => {});
  fit.current = () => {
    const r = root.current;
    const b = box.current;
    const c = current.current;
    if (!r || !b || !c) return;
    // Layout pixels (offset/scroll/client), so it stays right inside a CSS zoom or transform (+1 covers rounding)
    const full = c.scrollWidth + 1;
    const parent = r.parentElement;
    // Measured with the box at the label's full width – a parent that wraps around the pill grows with it, so only a
    // container that's really too narrow cuts the label. Without a transition, so the pill still glides from where it was.
    const was = { width: b.style.width, transition: b.style.transition };
    b.style.transition = "none";
    b.style.width = `${full}px`;
    const pad = parent ? getComputedStyle(parent) : null;
    const inner =
      parent && pad
        ? parent.clientWidth - parseFloat(pad.paddingLeft) - parseFloat(pad.paddingRight)
        : 0;
    const room = parent ? Math.floor(inner - (r.offsetWidth - b.offsetWidth)) : full;
    b.style.width = was.width;
    b.getBoundingClientRect();
    b.style.transition = was.transition;
    const cut = room > 0 && full > room;
    r.toggleAttribute("data-cut", cut);
    b.style.width = `${cut ? room : full}px`;
  };
  useLayoutEffect(() => {
    const b = box.current;
    if (!b) return;
    if (!measured.current) b.style.transition = "none";
    fit.current();
    if (!measured.current) {
      b.getBoundingClientRect();
      b.style.transition = "";
      measured.current = true;
    }
  }, [shown.key]);
  // A container that narrows or widens gets the label fitted again
  useEffect(() => {
    const parent = root.current?.parentElement;
    if (!parent || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => fit.current());
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);
  return (
    <span
      ref={root}
      className={["ui-tl", className].filter(Boolean).join(" ")}
      data-size={size}
      data-variant={variant}
      data-done={done || undefined}
      role="status"
      aria-live="polite"
    >
      {/* React 19 hoists this into <head> once, no matter how many loaders render */}

      <span className="ui-tl__icon" aria-hidden="true">
        <svg className="ui-tl__spinner" viewBox="0 0 16 16">
          {RAYS.map((i) => (
            <line
              key={i}
              x1="8"
              y1="1.75"
              x2="8"
              y2="4.75"
              transform={`rotate(${i * 45} 8 8)`}
              style={{ animationDelay: `${(i - 8) * 100}ms` }}
            />
          ))}
        </svg>
        <svg className="ui-tl__check" viewBox="0 0 16 16">
          <path d="M3.5 8.4 6.6 11.3 12.5 4.9" pathLength={1} />
        </svg>
      </span>

      <span ref={box} className="ui-tl__text">
        {leaving && (
          <span
            key={leaving.key}
            className="ui-tl__label ui-tl__label--out"
            aria-hidden="true"
            dir="auto"
            onAnimationEnd={() => setLeaving(null)}
          >
            {leaving.text}
          </span>
        )}
        <span
          key={shown.key}
          ref={current}
          className={[
            "ui-tl__label",
            shown.key > 0 && "ui-tl__label--in",
            !done && "ui-tl__shine",
          ]
            .filter(Boolean)
            .join(" ")}
          data-text={shown.text}
          title={shown.text}
          dir="auto"
        >
          {shown.text}
        </span>
      </span>
    </span>
  );
}
