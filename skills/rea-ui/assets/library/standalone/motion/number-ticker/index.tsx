"use client";

import "./NumberTicker.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import { type ReactElement, useEffect, useMemo, useRef, useState } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Number Ticker – animated numbers like an odometer, in component logic and public types.
 * Every digit is a small vertical column that rolls to its new value: up when the number grows, down when it
 * shrinks. On first view it counts in from zero. Formatting comes from Intl.NumberFormat, so currency signs,
 * separators and percent signs stay put while only the digits move. The styles are injected below.
 */
type NumberTickerProps = {
  /** The number to show */
  value: number;
  /** Intl.NumberFormat options, e.g. { style: "currency", currency: "USD" } */
  format?: Intl.NumberFormatOptions;
  /** Locale for formatting, e.g. "en-US" – defaults to the browser's */
  locale?: string;
  /** Length of a roll in ms */
  duration?: number;
  /** Wait before the first count-in, in ms */
  delay?: number;
  className?: string;
};
type Part =
  | {
      key: string;
      digit: number;
    }
  | {
      key: string;
      char: string;
    };
/** "$48,240" → parts keyed from the right, so the ones column keeps its identity when the number grows */
function split(text: string): Part[] {
  const chars = Array.from(text);
  const parts: Part[] = [];
  let d = 0;
  let s = 0;
  for (let i = chars.length - 1; i >= 0; i--) {
    const c = chars[i];
    if (c >= "0" && c <= "9")
      parts.unshift({ key: `d${d++}`, digit: c.charCodeAt(0) - 48 });
    else parts.unshift({ key: `s${s++}`, char: c });
  }
  return parts;
}
const mod10 = (n: number) => ((n % 10) + 10) % 10;
const ease = (t: number) => 1 - Math.pow(1 - t, 4);
/** Position → transform; the stack holds 0–9 plus a trailing 0, so 9 → 0 rolls seamlessly */
const place = (el: HTMLElement, pos: number) => {
  el.style.transform = `translateY(${(-mod10(pos) / 11) * 100}%)`;
};
type Roll = {
  pos: number;
  from: number;
  to: number;
};
function NumberTicker({
  value,
  format,
  locale,
  duration = 900,
  delay = 0,
  className,
}: NumberTickerProps) {
  const fmtKey = JSON.stringify(format ?? {});
  const text = useMemo(
    // NaN or ∞ (no data yet, a division by zero) shows a dash instead of the raw word
    () =>
      Number.isFinite(value) ? new Intl.NumberFormat(locale, format).format(value) : "–",
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, locale, fmtKey],
  );
  const parts = useMemo(() => split(text), [text]);
  const root = useRef<HTMLSpanElement>(null);
  const rolls = useRef(new Map<string, Roll>());
  const stacks = useRef(new Map<string, HTMLElement>());
  const prev = useRef(0);
  const up = useRef(true);
  const mounted = useRef(false);
  const entering = useRef(new Set<string>());
  const seen = useRef(new Set<string>());
  const [started, setStarted] = useState(false);
  // Columns that show up after the first render slide in (e.g. 9,999 → 10,000)
  const keysNow = new Set(parts.filter((p) => "digit" in p).map((p) => p.key));
  for (const k of keysNow)
    if (mounted.current && !seen.current.has(k)) entering.current.add(k);
  for (const k of entering.current) if (!keysNow.has(k)) entering.current.delete(k);
  seen.current = keysNow;
  // Start once the number scrolls into view
  useEffect(() => {
    mounted.current = true;
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => setStarted(true), delay);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Roll every digit column to its new value
  useEffect(() => {
    if (!started) return;
    // Same value again (e.g. a format change) keeps the last direction
    if (value !== prev.current) up.current = value > prev.current;
    prev.current = value;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const keys = new Set<string>();
    for (const p of parts) {
      if (!("digit" in p)) continue;
      keys.add(p.key);
      const r = rolls.current.get(p.key) ?? { pos: 0, from: 0, to: 0 };
      const delta = up.current ? mod10(p.digit - r.pos) : -mod10(r.pos - p.digit);
      r.from = r.pos;
      r.to = r.pos + delta;
      if (reduce) r.pos = r.from = r.to;
      rolls.current.set(p.key, r);
    }
    for (const k of rolls.current.keys()) if (!keys.has(k)) rolls.current.delete(k);
    const apply = () => {
      for (const [k, r] of rolls.current) {
        const el = stacks.current.get(k);
        if (el) place(el, r.pos);
      }
    };
    if (reduce) return apply();
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const e = ease(t);
      for (const r of rolls.current.values()) r.pos = r.from + (r.to - r.from) * e;
      apply();
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [parts, started, value, duration]);
  return (
    <>
      <span
        ref={root}
        className={["ui-nt", className].filter(Boolean).join(" ")}
        aria-live="polite"
      >
        <span className="ui-nt__sr">{text}</span>
        <span className="ui-nt__track" aria-hidden="true">
          {parts.map((p) =>
            "digit" in p ? (
              <span
                key={p.key}
                className="ui-nt__col"
                data-enter={entering.current.has(p.key) || undefined}
              >
                <span
                  className="ui-nt__stack"
                  ref={(el) => {
                    if (!el) return;
                    stacks.current.set(p.key, el);
                    place(el, rolls.current.get(p.key)?.pos ?? 0);
                    return () => {
                      if (stacks.current.get(p.key) === el) stacks.current.delete(p.key);
                    };
                  }}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n, i) => (
                    <span key={i} className="ui-nt__cell">
                      {n}
                    </span>
                  ))}
                </span>
              </span>
            ) : (
              <span key={p.key} className="ui-nt__static">
                {p.char}
              </span>
            ),
          )}
        </span>
      </span>
    </>
  );
}
/** Explicit migration boundary for values whose original types were erased.
 * Keep this alias private. Replace usages with concrete types as internals are refactored.
 * Public component contracts never expose this type. See docs/type-migration.md.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecoveredValue = any;
const t_react_BkAXpnfr: RecoveredValue = (): RecoveredValue => React;
const t_jsx_runtime_CTsRTJUX: RecoveredValue = (): RecoveredValue =>
  React_jsx_runtime_CTsRTJUX;
var n_demo_DVKJvdEh: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_DVKJvdEh: RecoveredValue = t_jsx_runtime_CTsRTJUX();
function i_demo_DVKJvdEh(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = Array.from(e) as RecoveredValue[],
    n: RecoveredValue = [],
    r: RecoveredValue = 0,
    i: RecoveredValue = 0;
  for (let e: RecoveredValue = t.length - 1; e >= 0; e--) {
    let a: RecoveredValue = t[e];
    a >= `0` && a <= `9`
      ? n.unshift({
          key: `d${r++}`,
          digit: a.charCodeAt(0) - 48,
        })
      : n.unshift({
          key: `s${i++}`,
          char: a,
        });
  }
  return n;
}
var a_demo_DVKJvdEh: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    ((e % 10) + 10) % 10,
  o_demo_DVKJvdEh: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    1 - (1 - e) ** 4,
  s_demo_DVKJvdEh: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    e.style.transform = `translateY(${(-a_demo_DVKJvdEh(t) / 11) * 100}%)`;
  };
function ComponentC({
  value,
  format,
  locale,
  duration = 900,
  delay = 0,
  className,
}: RecoveredValue): RecoveredValue {
  let p: RecoveredValue = JSON.stringify(format ?? {}),
    m: RecoveredValue = (0, n_demo_DVKJvdEh.useMemo)(
      (): RecoveredValue =>
        Number.isFinite(value)
          ? new Intl.NumberFormat(locale, format).format(value)
          : `–`,
      [value, locale, p],
    ),
    h: RecoveredValue = (0, n_demo_DVKJvdEh.useMemo)(
      (): RecoveredValue => i_demo_DVKJvdEh(m),
      [m],
    ),
    g: RecoveredValue = (0, n_demo_DVKJvdEh.useRef)(null),
    _: RecoveredValue = (0, n_demo_DVKJvdEh.useRef)(new Map()),
    v: RecoveredValue = (0, n_demo_DVKJvdEh.useRef)(new Map()),
    y: RecoveredValue = (0, n_demo_DVKJvdEh.useRef)(0),
    b: RecoveredValue = (0, n_demo_DVKJvdEh.useRef)(!0),
    x: RecoveredValue = (0, n_demo_DVKJvdEh.useRef)(!1),
    S: RecoveredValue = (0, n_demo_DVKJvdEh.useRef)(new Set()),
    C: RecoveredValue = (0, n_demo_DVKJvdEh.useRef)(new Set()),
    [w, T]: RecoveredValue = (0, n_demo_DVKJvdEh.useState)(!1),
    E: RecoveredValue = new Set(
      h
        .filter((e?: RecoveredValue): RecoveredValue => `digit` in e)
        .map((e?: RecoveredValue): RecoveredValue => e.key),
    );
  for (let e of E) x.current && !C.current.has(e) && S.current.add(e);
  for (let e of S.current) E.has(e) || S.current.delete(e);
  return (
    (C.current = E),
    (0, n_demo_DVKJvdEh.useEffect)((): RecoveredValue => {
      x.current = !0;
      let e: RecoveredValue = g.current;
      if (!e || typeof IntersectionObserver > `u`) {
        T(!0);
        return;
      }
      let t: RecoveredValue = 0,
        n: RecoveredValue = new IntersectionObserver(
          ([e]: RecoveredValue): RecoveredValue => {
            e.isIntersecting &&
              (n.disconnect(),
              (t = window.setTimeout((): RecoveredValue => T(!0), delay)));
          },
          {
            threshold: 0.3,
          },
        );
      return (
        n.observe(e),
        (): RecoveredValue => {
          (n.disconnect(), clearTimeout(t));
        }
      );
    }, []),
    (0, n_demo_DVKJvdEh.useEffect)((): RecoveredValue => {
      if (!w) return;
      (value !== y.current && (b.current = value > y.current), (y.current = value));
      let t: RecoveredValue = window.matchMedia(
          `(prefers-reduced-motion: reduce)`,
        ).matches,
        n: RecoveredValue = new Set();
      for (let e of h) {
        if (!(`digit` in e)) continue;
        n.add(e.key);
        let r: RecoveredValue = _.current.get(e.key) ?? {
            pos: 0,
            from: 0,
            to: 0,
          },
          i: RecoveredValue = b.current
            ? a_demo_DVKJvdEh(e.digit - r.pos)
            : -a_demo_DVKJvdEh(r.pos - e.digit);
        ((r.from = r.pos),
          (r.to = r.pos + i),
          t && (r.pos = r.from = r.to),
          _.current.set(e.key, r));
      }
      for (let e of _.current.keys()) n.has(e) || _.current.delete(e);
      let r: RecoveredValue = (): RecoveredValue => {
        for (let [e, t] of _.current) {
          let n: RecoveredValue = v.current.get(e);
          n && s_demo_DVKJvdEh(n, t.pos);
        }
      };
      if (t) return r();
      let i: RecoveredValue = 0,
        c: RecoveredValue = performance.now(),
        l: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = Math.min(1, (e - c) / duration),
            n: RecoveredValue = o_demo_DVKJvdEh(t);
          for (let e of _.current.values()) e.pos = e.from + (e.to - e.from) * n;
          (r(), t < 1 && (i = requestAnimationFrame(l)));
        };
      return (
        (i = requestAnimationFrame(l)),
        (): RecoveredValue => cancelAnimationFrame(i)
      );
    }, [h, w, value, duration]),
    (
      <r_demo_DVKJvdEh.Fragment>
        <span
          ref={g as RecoveredValue}
          className={[`ui-nt`, className].filter(Boolean).join(` `)}
          aria-live={`polite`}
        >
          <span className={`ui-nt__sr`}>{m}</span>
          <span className={`ui-nt__track`} aria-hidden={`true`}>
            {h.map(
              (e?: RecoveredValue): RecoveredValue =>
                `digit` in e ? (
                  <span
                    className={`ui-nt__col`}
                    data-enter={S.current.has(e.key) || void 0}
                    children={
                      <span
                        className={`ui-nt__stack`}
                        ref={
                          ((t?: RecoveredValue): RecoveredValue => {
                            if (t)
                              return (
                                v.current.set(e.key, t),
                                s_demo_DVKJvdEh(t, _.current.get(e.key)?.pos ?? 0),
                                (): RecoveredValue => {
                                  v.current.get(e.key) === t && v.current.delete(e.key);
                                }
                              );
                          }) as RecoveredValue
                        }
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(
                          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                            <span className={`ui-nt__cell`} children={e} key={t} />
                          ),
                        )}
                      </span>
                    }
                    key={e.key}
                  />
                ) : (
                  <span className={`ui-nt__static`} children={e.char} key={e.key} />
                ),
            )}
          </span>
        </span>
      </r_demo_DVKJvdEh.Fragment>
    )
  );
}
var u: RecoveredValue = {
    style: `currency`,
    currency: `USD`,
    maximumFractionDigits: 0,
  },
  d_demo_DVKJvdEh: RecoveredValue = {
    style: `percent`,
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: `exceptZero`,
  },
  f: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    Math.round(e + Math.random() * (t - e));
function Runtime(): RecoveredValue {
  let [e, t]: RecoveredValue = (0, n_demo_DVKJvdEh.useState)(48240),
    [i, a]: RecoveredValue = (0, n_demo_DVKJvdEh.useState)(0.124),
    o: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (t((t?: RecoveredValue): RecoveredValue => Math.max(0, t + e * f(600, 6400))),
        a(
          (t?: RecoveredValue): RecoveredValue =>
            Math.round((t + (e * f(8, 46)) / 1e3) * 1e3) / 1e3,
        ));
    };
  return (
    <div className={`number-ticker-demo`}>
      <div className={`ntd-card`}>
        <div className={`ntd-head`}>
          <span className={`ntd-label`}>{`Revenue`}</span>
          <span className={`ntd-period`}>{`This month`}</span>
        </div>
        <div className={`ntd-value`}>
          <ComponentC value={e} format={u} locale={`en-US`} />
        </div>
        <div className={`ntd-meta`}>
          <span className={`ntd-delta`} data-down={i < 0 || void 0}>
            <svg viewBox={`0 0 12 12`} width={`10`} height={`10`} aria-hidden={`true`}>
              <path
                d={`M6 2.5v7M2.75 5.75 6 2.5l3.25 3.25`}
                fill={`none`}
                stroke={`currentColor`}
                strokeWidth={`1.6`}
                strokeLinecap={`round`}
                strokeLinejoin={`round`}
              />
            </svg>
            <ComponentC
              value={i}
              format={d_demo_DVKJvdEh}
              locale={`en-US`}
              duration={700}
              delay={150}
            />
          </span>
          <span className={`ntd-vs`}>{`vs last month`}</span>
        </div>
        <div className={`ntd-actions`}>
          <button
            type={`button`}
            className={`ntd-btn`}
            aria-label={`Decrease revenue`}
            onClick={(): RecoveredValue => o(-1)}
          >{`−`}</button>
          <button
            type={`button`}
            className={`ntd-btn`}
            aria-label={`Increase revenue`}
            onClick={(): RecoveredValue => o(1)}
          >{`+`}</button>
        </div>
      </div>
    </div>
  );
}
function Preview(): ReactElement {
  return (
    <>
      <Runtime />
    </>
  );
}
export { Preview };
export default Preview;
export { NumberTicker };
export type { NumberTickerProps };
