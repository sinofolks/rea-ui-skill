"use client";

import "./TestimonialWall.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import {
  type ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Testimonial Wall – the landing-page wall of quotes, in component logic and public types.
 * Quotes are dealt into columns (3 on wide containers, 2 on tablets, 1 on phones – measured on the wall itself,
 * not the window) that scroll vertically and endlessly, alternating up and down at slightly different speeds.
 * Every column repeats a measured set of cards and wraps by exactly its height, so the loop has no gap and no
 * jump; the top and bottom edges fade out with a mask. One requestAnimationFrame loop owns a velocity per column:
 * hovering or keyboard-focusing a column eases it to a stop, leaving winds it back up, and dragging it with the
 * mouse scrubs it with inertia. On touch the page keeps scrolling natively – pressing and holding a column pauses
 * it to read. It only runs while on screen, and prefers-reduced-motion shows a static grid instead.
 * The styles are injected below.
 */
type Testimonial = {
  /** The quote itself – mix short and long ones, the masonry looks more natural */
  quote: string;
  name: string;
  /** e.g. "Design Engineer" */
  role?: string;
  /** e.g. "Fieldnote" – shown after the role */
  company?: string;
  /** Photo URL; without one the initials sit on a soft gray circle */
  avatar?: string;
  /** 1–5 – a small, calm gray star row above the quote */
  rating?: number;
  /** A small gray check beside the name */
  verified?: boolean;
};
type TestimonialWallProps = {
  items: Testimonial[];
  /** Most columns on a wide container – narrower containers use fewer (2 below 740px, 1 below 480px) */
  columns?: 1 | 2 | 3;
  /** Pixels per second of the first column; the others run a little slower and faster */
  speed?: number;
  /** Ease a column to a stop while the pointer is over it or a card in it has keyboard focus */
  pauseOnHover?: boolean;
  /** Accessible name of the wall */
  label?: string;
  /** Extra class on the wrapper – set the height with --ui-tw-height (600px by default) */
  className?: string;
};
/** Motion state of one column, kept outside React so the loop never re-renders */
type ColState = {
  /** Offset into the loop in px – the real set starts at -x */
  y: number;
  v: number;
  /** Height of one set, including its trailing gap – the wrap distance */
  h: number;
  drag: null | {
    id: number;
    lastY: number;
    lastT: number;
    moved: number;
    captured: boolean;
  };
  /** Pending nudge (px) to bring a focused card into view */
  seek: number;
};
/** Run direction and pace of each column: up, down, up – never quite in step */
const PACE = [1, -0.84, 1.12];
/** Where each column starts in its loop, so the rows of cards don't line up */
const START = [0, 0.42, 0.18];
const mod = (n: number, m: number) => (m > 0 ? ((n % m) + m) % m : 0);
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
/** First character of a word as a whole grapheme, so an emoji like 👩🏽‍💻 or an accent never splits */
const firstChar = (word: string) =>
  (typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter().segment(word)[Symbol.iterator]().next().value?.segment
    : Array.from(word)[0]) ?? "";
/** Suffixes that are not a family name – "Christopher Montgomery III" reads "CM", not "CI" */
const SUFFIX = /^(jr|sr|i{1,3}|iv|v|vi|phd|md|esq)\.?,?$/i;
/** First and last word, so "María José de la Cruz y Fernández" reads "MF" */
const initials = (name: string) => {
  const words = name.split(/\s+/).filter(Boolean);
  // Words that start with a letter win, so "🦊 Fox" reads "F"
  const named = words.filter((w) => /^\p{L}/u.test(w));
  const list = named.length ? named : words;
  const core = list.length > 1 ? list.filter((w, i) => i === 0 || !SUFFIX.test(w)) : list;
  const picked = core.length > 1 ? [core[0], core[core.length - 1]] : core;
  return picked.map((p) => firstChar(p).toUpperCase()).join("") || "?";
};
/** Shows the full text as a tooltip, but only when it is cut off */
const showFull = (e: React.PointerEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const cut =
    el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
  el.title = cut ? (el.textContent ?? "") : "";
};
/** Photo, or the initials when there is none or it fails to load */
function Avatar({ src, name }: { src?: string; name: string }) {
  const [broken, setBroken] = useState<string | null>(null);
  return src && broken !== src ? (
    <img
      className="ui-tw__avatar"
      src={src}
      alt=""
      width={36}
      height={36}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setBroken(src)}
    />
  ) : (
    <span className="ui-tw__avatar ui-tw__avatar--initials" aria-hidden="true">
      {initials(name)}
    </span>
  );
}
/** Container width → column count; matches the container queries in the styles */
const fit = (width: number, max: number) =>
  Math.min(max, width >= 740 ? 3 : width >= 480 ? 2 : 1);
function TestimonialWall({
  items,
  columns = 3,
  speed = 28,
  pauseOnHover = true,
  label = "What customers say",
  className,
}: TestimonialWallProps) {
  const root = useRef<HTMLDivElement>(null);
  const cols = useRef<(HTMLDivElement | null)[]>([]);
  const tracks = useRef<(HTMLDivElement | null)[]>([]);
  const sets = useRef<(HTMLUListElement | null)[]>([]);
  const state = useRef<ColState[]>([]);
  const hover = useRef<boolean[]>([]);
  const hold = useRef<boolean[]>([]);
  const focus = useRef<boolean[]>([]);
  const [fitCount, setCount] = useState<number>(columns);
  // Never more columns than quotes, so one or two quotes don't leave empty lanes
  const count = Math.max(1, Math.min(fitCount, items.length));
  const [copies, setCopies] = useState<number[]>([]);
  const [reduced, setReduced] = useState(false);
  // Deal the quotes into columns: 1, 2, 3, 1, 2, 3 … so short and long ones mix in every column
  const dealt: Testimonial[][] = Array.from({ length: count }, (_, c) =>
    items.filter((_, i) => i % count === c),
  );
  // Latest props for the loop without restarting it
  const live = useRef({ speed, pauseOnHover, count });
  live.current = { speed, pauseOnHover, count };
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  // Column count follows the wall's own width (before paint, so it never flashes the wrong layout)
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const measure = () => setCount(fit(el.clientWidth, columns));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [columns]);
  // Measure every column: one set's height and how many copies cover the column plus one wrap
  useEffect(() => {
    if (reduced) return;
    const measure = () => {
      const next = dealt.map((_, i) => {
        const set = sets.current[i];
        const col = cols.current[i];
        if (!set || !col) return 2;
        // Layout px, not screen px – a CSS zoom or scale on an ancestor must not skew the wrap distance
        const scale = col.getBoundingClientRect().height / (col.offsetHeight || 1) || 1;
        const h = set.getBoundingClientRect().height / scale;
        const s = (state.current[i] ??= {
          y: h * (START[i] ?? 0),
          v: 0,
          h,
          drag: null,
          seek: 0,
        });
        // Keep the same spot within the set when its height changes (fewer columns, font load)
        if (s.h > 0 && h > 0 && s.h !== h) s.y = (s.y / s.h) * h;
        s.h = h;
        // Capped, as a guard against a column that isn't given a height
        return h > 0 ? Math.min(12, Math.ceil(col.clientHeight / h) + 1) : 2;
      });
      state.current.length = dealt.length;
      setCopies((prev) =>
        prev.length === next.length && prev.every((c, i) => c === next[i]) ? prev : next,
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    for (const el of [...sets.current.slice(0, count), ...cols.current.slice(0, count)])
      if (el) ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, count, items]);
  // The loop: one velocity per column that eases toward its target, so stops and starts are never abrupt
  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;
    let raf = 0;
    let last = 0;
    let visible = false;
    const frame = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const { speed, pauseOnHover, count } = live.current;
      for (let i = 0; i < count; i++) {
        const s = state.current[i];
        const track = tracks.current[i];
        if (!s || !track || s.h <= 0) continue;
        const pace = count === 1 ? 1 : PACE[i % 3]!;
        const stopped =
          hold.current[i] || focus.current[i] || (pauseOnHover && hover.current[i]);
        if (!s.drag) {
          const target = stopped ? 0 : speed * pace;
          // A fling coasts out; slowing down for hover is a little quicker than winding back up
          const fling = Math.abs(s.v - target) > Math.max(120, speed * 2);
          const tau = fling ? 0.55 : stopped ? 0.32 : 0.7;
          s.v += (target - s.v) * (1 - Math.exp(-dt / tau));
          s.y += s.v * dt;
          if (s.seek) {
            const step = s.seek * (1 - Math.exp(-dt / 0.12));
            s.y += step;
            s.seek = Math.abs(s.seek - step) < 0.5 ? 0 : s.seek - step;
          }
        }
        // While a card has keyboard focus the column may sit just outside one wrap (see onFocusCard);
        // otherwise the offset stays inside one set, where every copy looks the same
        s.y = focus.current[i] ? clamp(s.y, -s.h, s.h * 2) : mod(s.y, s.h);
        track.style.transform = `translate3d(0, ${-(s.h + s.y)}px, 0)`;
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    // Runs only while on screen
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);
  /* ---------- Drag (mouse, pen) and press-and-hold (touch) ---------- */
  const onPointerDown = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current[i];
    if (!s) return;
    // Touch: the page keeps scrolling natively, a finger resting on a column just holds it still
    if (e.pointerType === "touch") {
      hold.current[i] = true;
      return;
    }
    if (e.button !== 0) return;
    s.drag = {
      id: e.pointerId,
      lastY: e.clientY,
      lastT: e.timeStamp,
      moved: 0,
      captured: false,
    };
    s.v = 0;
  };
  const onPointerMove = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current[i];
    const d = s?.drag;
    if (!s || !d || d.id !== e.pointerId) return;
    const col = e.currentTarget;
    const scale = col.getBoundingClientRect().height / (col.offsetHeight || 1) || 1;
    const dy = (e.clientY - d.lastY) / scale;
    const dt = Math.max(1, e.timeStamp - d.lastT) / 1000;
    d.moved += Math.abs(dy);
    // Capture only once it is clearly a drag, so a plain click still focuses a card or follows a link
    if (!d.captured && d.moved > 4) {
      d.captured = true;
      col.setPointerCapture(e.pointerId);
      col.setAttribute("data-dragging", "");
    }
    s.y -= dy;
    // Smoothed release velocity in px/s
    s.v = s.v * 0.6 + (-dy / dt) * 0.4;
    d.lastY = e.clientY;
    d.lastT = e.timeStamp;
  };
  const onPointerUp = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    hold.current[i] = false;
    const s = state.current[i];
    const d = s?.drag;
    if (!s || !d || d.id !== e.pointerId) return;
    // A pause before letting go means no fling
    if (e.timeStamp - d.lastT > 80) s.v = 0;
    s.v = clamp(s.v, -2400, 2400);
    s.drag = null;
    e.currentTarget.removeAttribute("data-dragging");
    if (d.captured) {
      // Swallow the click that ends a drag, so a link inside a quote doesn't open
      const col = e.currentTarget;
      const stop = (ev: MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      col.addEventListener("click", stop, { capture: true, once: true });
      setTimeout(() => col.removeEventListener("click", stop, { capture: true }), 0);
    }
  };
  /* ---------- Keyboard: a focused card stops its column and is nudged into view ---------- */
  const onFocusCard = (i: number) => (e: React.FocusEvent<HTMLElement>) => {
    const s = state.current[i];
    const col = cols.current[i];
    if (reduced || !s || !col || s.h <= 0 || !e.currentTarget.matches(":focus-visible"))
      return;
    // Layout units: the card's place in its set, the column's height
    const li = e.currentTarget.parentElement as HTMLElement;
    const top = li.offsetTop;
    const h = e.currentTarget.offsetHeight;
    const viewH = col.clientHeight;
    const pad = Math.min(56, viewH * 0.12);
    // Only the real set is focusable; pick the wrap (one set up, here or one down) that is closest, so the
    // nudge is short – every copy looks the same, so the switch is invisible
    s.y = [s.y - s.h, s.y, s.y + s.h].reduce((best, y) =>
      Math.abs(top - y - viewH / 2) < Math.abs(top - best - viewH / 2) ? y : best,
    );
    const at = top - s.y;
    if (h > viewH - pad * 2 || at < pad) s.seek = at - pad;
    else if (at + h > viewH - pad) s.seek = at + h - (viewH - pad);
    else s.seek = 0;
  };
  const card = (t: Testimonial, i: number, interactive: boolean, key: string) => {
    // The dot stays with the role, so a wrap starts cleanly with the company
    const meta = [t.role?.trim(), t.company?.trim()].filter(Boolean).join("\u00a0· ");
    const stars = t.rating ? clamp(Math.round(t.rating), 1, 5) : 0;
    return (
      <li key={key} className="ui-tw__item">
        <figure
          className="ui-tw__card"
          tabIndex={interactive ? 0 : undefined}
          onFocus={interactive ? onFocusCard(i) : undefined}
        >
          {stars && Number.isFinite(stars) ? (
            <div
              className="ui-tw__stars"
              role="img"
              aria-label={`Rated ${stars} out of 5`}
            >
              {Array.from({ length: 5 }, (_, n) => (
                <svg
                  key={n}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  data-on={n < stars || undefined}
                >
                  <path d="M8 1.6l1.9 3.95 4.35.6-3.17 3.03.78 4.32L8 11.43 4.14 13.5l.78-4.32L1.75 6.15l4.35-.6L8 1.6z" />
                </svg>
              ))}
            </div>
          ) : null}
          {t.quote.trim() && (
            <blockquote className="ui-tw__quote">
              <p dir="auto" onPointerEnter={showFull}>
                {t.quote.trim()}
              </p>
            </blockquote>
          )}
          <figcaption className="ui-tw__who">
            <Avatar src={t.avatar} name={t.name} />
            <span className="ui-tw__id">
              <span className="ui-tw__name">
                <span className="ui-tw__name-text" dir="auto" onPointerEnter={showFull}>
                  {t.name.trim()}
                </span>
                {t.verified ? (
                  <svg
                    className="ui-tw__verified"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Verified customer"
                  >
                    <circle cx="8" cy="8" r="7" />
                    <path
                      d="M5.2 8.1l1.9 1.9 3.7-3.8"
                      fill="none"
                      stroke="var(--ui-tw-card)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
              {meta ? (
                <span className="ui-tw__meta" dir="auto" onPointerEnter={showFull}>
                  {meta}
                </span>
              ) : null}
            </span>
          </figcaption>
        </figure>
      </li>
    );
  };
  const cls = ["ui-tw", className].filter(Boolean).join(" ");
  return (
    <>
      <div
        ref={root}
        className={cls}
        role="region"
        aria-label={label}
        data-cols={count}
        data-static={reduced || undefined}
        style={{ "--ui-tw-cols": count } as CSSProperties}
        data-empty={items.length === 0 || undefined}
      >
        {items.length === 0 && <p className="ui-tw__empty">No quotes yet</p>}
        {items.length > 0 &&
          dealt.map((list, i) =>
            reduced ? (
              // Reduced motion: a calm, static masonry – every quote once, nothing moves
              <div key={i} className="ui-tw__col">
                <ul className="ui-tw__set">
                  {list.map((t, n) => card(t, i, true, String(n)))}
                </ul>
              </div>
            ) : (
              <div
                key={i}
                ref={(n) => {
                  cols.current[i] = n;
                }}
                className="ui-tw__col"
                onPointerEnter={(e) => {
                  if (e.pointerType !== "touch") hover.current[i] = true;
                }}
                onPointerLeave={() => (hover.current[i] = false)}
                onPointerDown={onPointerDown(i)}
                onPointerMove={onPointerMove(i)}
                onPointerUp={onPointerUp(i)}
                onPointerCancel={onPointerUp(i)}
                // Keyboard focus stops the column; a mouse click that focuses a card does not
                onFocus={(e) => (focus.current[i] = e.target.matches(":focus-visible"))}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null))
                    focus.current[i] = false;
                }}
              >
                <div
                  ref={(n) => {
                    tracks.current[i] = n;
                  }}
                  className="ui-tw__track"
                  style={{
                    transform: `translate3d(0, ${-((state.current[i]?.h ?? 0) + (state.current[i]?.y ?? 0))}px, 0)`,
                  }}
                >
                  {/* One copy above the real set and enough below it, so a nudge or a wrap never shows a gap */}
                  {Array.from({ length: 1 + Math.max(2, copies[i] ?? 2) }, (_, c) => {
                    const real = c === 1;
                    return (
                      <ul
                        key={real ? "real" : c}
                        ref={
                          real
                            ? (n) => {
                                sets.current[i] = n;
                              }
                            : undefined
                        }
                        className="ui-tw__set"
                        // Only the real set is read out and reachable by Tab; the copies are decoration
                        aria-hidden={!real || undefined}
                        inert={!real || undefined}
                      >
                        {list.map((t, n) => card(t, i, real, `${c}-${n}`))}
                      </ul>
                    );
                  })}
                </div>
              </div>
            ),
          )}
      </div>
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
var n_demo_Bkk9bPRV: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_Bkk9bPRV: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_Bkk9bPRV: RecoveredValue = [1, -0.84, 1.12],
  a_demo_Bkk9bPRV: RecoveredValue = [0, 0.42, 0.18],
  o_demo_Bkk9bPRV: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => (t > 0 ? ((e % t) + t) % t : 0),
  s_demo_Bkk9bPRV: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue => Math.min(n, Math.max(t, e)),
  c_demo_Bkk9bPRV: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    (typeof Intl.Segmenter == `function`
      ? new Intl.Segmenter().segment(e)[Symbol.iterator]().next().value?.segment
      : (Array.from(e) as RecoveredValue[])[0]) ?? ``,
  l_demo_Bkk9bPRV: RecoveredValue = /^(jr|sr|i{1,3}|iv|v|vi|phd|md|esq)\.?,?$/i,
  u_demo_Bkk9bPRV: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e.split(/\s+/).filter(Boolean),
      n: RecoveredValue = t.filter(
        (e?: RecoveredValue): RecoveredValue => /^\p{L}/u.test(e),
      ),
      r: RecoveredValue = n.length ? n : t,
      i: RecoveredValue =
        r.length > 1
          ? r.filter(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
                t === 0 || !l_demo_Bkk9bPRV.test(e),
            )
          : r;
    return (
      (i.length > 1 ? [i[0], i[i.length - 1]] : i)
        .map((e?: RecoveredValue): RecoveredValue => c_demo_Bkk9bPRV(e).toUpperCase())
        .join(``) || `?`
    );
  },
  d_demo_Bkk9bPRV: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e.currentTarget;
    t.title =
      t.scrollWidth > t.clientWidth + 1 || t.scrollHeight > t.clientHeight + 1
        ? (t.textContent ?? ``)
        : ``;
  };
function ComponentF({ src, name }: RecoveredValue): RecoveredValue {
  let [i, a]: RecoveredValue = (0, n_demo_Bkk9bPRV.useState)(null);
  return src && i !== src ? (
    <img
      className={`ui-tw__avatar`}
      src={src}
      alt={``}
      width={36}
      height={36}
      loading={`lazy`}
      decoding={`async`}
      draggable={!1}
      onError={(): RecoveredValue => a(src)}
    />
  ) : (
    <span className={`ui-tw__avatar ui-tw__avatar--initials`} aria-hidden={`true`}>
      {u_demo_Bkk9bPRV(name)}
    </span>
  );
}
var p_demo_Bkk9bPRV: RecoveredValue = (
  e?: RecoveredValue,
  t?: RecoveredValue,
): RecoveredValue => Math.min(t, e >= 740 ? 3 : e >= 480 ? 2 : 1);
function ComponentM({
  items,
  columns = 3,
  speed = 28,
  pauseOnHover = !0,
  label = `What customers say`,
  className,
}: RecoveredValue): RecoveredValue {
  let g: RecoveredValue = (0, n_demo_Bkk9bPRV.useRef)(null),
    _: RecoveredValue = (0, n_demo_Bkk9bPRV.useRef)([]),
    v: RecoveredValue = (0, n_demo_Bkk9bPRV.useRef)([]),
    y: RecoveredValue = (0, n_demo_Bkk9bPRV.useRef)([]),
    b: RecoveredValue = (0, n_demo_Bkk9bPRV.useRef)([]),
    x: RecoveredValue = (0, n_demo_Bkk9bPRV.useRef)([]),
    S: RecoveredValue = (0, n_demo_Bkk9bPRV.useRef)([]),
    C: RecoveredValue = (0, n_demo_Bkk9bPRV.useRef)([]),
    [w, T]: RecoveredValue = (0, n_demo_Bkk9bPRV.useState)(columns),
    E: RecoveredValue = Math.max(1, Math.min(w, items.length)),
    [D, O]: RecoveredValue = (0, n_demo_Bkk9bPRV.useState)([]),
    [k, A]: RecoveredValue = (0, n_demo_Bkk9bPRV.useState)(!1),
    j: RecoveredValue = Array.from(
      {
        length: E,
      },
      (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
        items.filter(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => t % E === n,
        ),
    ) as RecoveredValue[],
    M: RecoveredValue = (0, n_demo_Bkk9bPRV.useRef)({
      speed: speed,
      pauseOnHover: pauseOnHover,
      count: E,
    });
  ((M.current = {
    speed: speed,
    pauseOnHover: pauseOnHover,
    count: E,
  }),
    (0, n_demo_Bkk9bPRV.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = window.matchMedia(`(prefers-reduced-motion: reduce)`),
        t: RecoveredValue = (): RecoveredValue => A(e.matches);
      return (
        t(),
        e.addEventListener(`change`, t),
        (): RecoveredValue => e.removeEventListener(`change`, t)
      );
    }, []),
    (0, n_demo_Bkk9bPRV.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = g.current;
      if (!e) return;
      let n: RecoveredValue = (): RecoveredValue =>
        T(p_demo_Bkk9bPRV(e.clientWidth, columns));
      n();
      let r: RecoveredValue = new ResizeObserver(n);
      return (r.observe(e), (): RecoveredValue => r.disconnect());
    }, [columns]),
    (0, n_demo_Bkk9bPRV.useEffect)((): RecoveredValue => {
      if (k) return;
      let e: RecoveredValue = (): RecoveredValue => {
        let e: RecoveredValue = j.map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
            let n: RecoveredValue = y.current[t],
              r: RecoveredValue = _.current[t];
            if (!n || !r) return 2;
            let i: RecoveredValue =
                r.getBoundingClientRect().height / (r.offsetHeight || 1) || 1,
              o: RecoveredValue = n.getBoundingClientRect().height / i,
              s: RecoveredValue = (b.current[t] ??= {
                y: o * (a_demo_Bkk9bPRV[t] ?? 0),
                v: 0,
                h: o,
                drag: null,
                seek: 0,
              });
            return (
              s.h > 0 && o > 0 && s.h !== o && (s.y = (s.y / s.h) * o),
              (s.h = o),
              o > 0 ? Math.min(12, Math.ceil(r.clientHeight / o) + 1) : 2
            );
          },
        );
        ((b.current.length = j.length),
          O(
            (t?: RecoveredValue): RecoveredValue =>
              t.length === e.length &&
              t.every(
                (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => t === e[n],
              )
                ? t
                : e,
          ));
      };
      e();
      let t: RecoveredValue = new ResizeObserver(e);
      for (let e of [...y.current.slice(0, E), ..._.current.slice(0, E)])
        e && t.observe(e);
      return (): RecoveredValue => t.disconnect();
    }, [k, E, items]),
    (0, n_demo_Bkk9bPRV.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = g.current;
      if (k || !e) return;
      let t: RecoveredValue = 0,
        n: RecoveredValue = 0,
        r: RecoveredValue = !1,
        a: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let c: RecoveredValue = n ? Math.min(0.05, (e - n) / 1e3) : 0;
          n = e;
          let { speed: l, pauseOnHover: u, count: d }: RecoveredValue = M.current;
          for (let e: RecoveredValue = 0; e < d; e++) {
            let t: RecoveredValue = b.current[e],
              n: RecoveredValue = v.current[e];
            if (!t || !n || t.h <= 0) continue;
            let r: RecoveredValue = d === 1 ? 1 : i_demo_Bkk9bPRV[e % 3],
              a: RecoveredValue = S.current[e] || C.current[e] || (u && x.current[e]);
            if (!t.drag) {
              let e: RecoveredValue = a ? 0 : l * r,
                n: RecoveredValue =
                  Math.abs(t.v - e) > Math.max(120, l * 2) ? 0.55 : a ? 0.32 : 0.7;
              if (
                ((t.v += (e - t.v) * (1 - Math.exp(-c / n))), (t.y += t.v * c), t.seek)
              ) {
                let e: RecoveredValue = t.seek * (1 - Math.exp(-c / 0.12));
                ((t.y += e), (t.seek = Math.abs(t.seek - e) < 0.5 ? 0 : t.seek - e));
              }
            }
            ((t.y = C.current[e]
              ? s_demo_Bkk9bPRV(t.y, -t.h, t.h * 2)
              : o_demo_Bkk9bPRV(t.y, t.h)),
              (n.style.transform = `translate3d(0, ${-(t.h + t.y)}px, 0)`));
          }
          t = r ? requestAnimationFrame(a) : 0;
        },
        c: RecoveredValue = new IntersectionObserver(
          ([e]: RecoveredValue): RecoveredValue => {
            ((r = e.isIntersecting),
              r && !t && ((n = 0), (t = requestAnimationFrame(a))));
          },
        );
      return (
        c.observe(e),
        (): RecoveredValue => {
          (c.disconnect(), cancelAnimationFrame(t));
        }
      );
    }, [k]));
  let N: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = b.current[e];
        if (n) {
          if (t.pointerType === `touch`) {
            S.current[e] = !0;
            return;
          }
          t.button === 0 &&
            ((n.drag = {
              id: t.pointerId,
              lastY: t.clientY,
              lastT: t.timeStamp,
              moved: 0,
              captured: !1,
            }),
            (n.v = 0));
        }
      },
    P: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = b.current[e],
          r: RecoveredValue = n?.drag;
        if (!n || !r || r.id !== t.pointerId) return;
        let i: RecoveredValue = t.currentTarget,
          a: RecoveredValue =
            i.getBoundingClientRect().height / (i.offsetHeight || 1) || 1,
          o: RecoveredValue = (t.clientY - r.lastY) / a,
          s: RecoveredValue = Math.max(1, t.timeStamp - r.lastT) / 1e3;
        ((r.moved += Math.abs(o)),
          !r.captured &&
            r.moved > 4 &&
            ((r.captured = !0),
            i.setPointerCapture(t.pointerId),
            i.setAttribute(`data-dragging`, ``)),
          (n.y -= o),
          (n.v = n.v * 0.6 + (-o / s) * 0.4),
          (r.lastY = t.clientY),
          (r.lastT = t.timeStamp));
      },
    F: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        S.current[e] = !1;
        let n: RecoveredValue = b.current[e],
          r: RecoveredValue = n?.drag;
        if (
          n &&
          r &&
          r.id === t.pointerId &&
          (t.timeStamp - r.lastT > 80 && (n.v = 0),
          (n.v = s_demo_Bkk9bPRV(n.v, -2400, 2400)),
          (n.drag = null),
          t.currentTarget.removeAttribute(`data-dragging`),
          r.captured)
        ) {
          let e: RecoveredValue = t.currentTarget,
            n: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
              (e.preventDefault(), e.stopPropagation());
            };
          (e.addEventListener(`click`, n, {
            capture: !0,
            once: !0,
          }),
            setTimeout(
              (): RecoveredValue =>
                e.removeEventListener(`click`, n, {
                  capture: !0,
                }),
              0,
            ));
        }
      },
    I: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = b.current[e],
          r: RecoveredValue = _.current[e];
        if (k || !n || !r || n.h <= 0 || !t.currentTarget.matches(`:focus-visible`))
          return;
        let i: RecoveredValue = t.currentTarget.parentElement.offsetTop,
          a: RecoveredValue = t.currentTarget.offsetHeight,
          o: RecoveredValue = r.clientHeight,
          s: RecoveredValue = Math.min(56, o * 0.12);
        n.y = [n.y - n.h, n.y, n.y + n.h].reduce(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
            Math.abs(i - t - o / 2) < Math.abs(i - e - o / 2) ? t : e,
        );
        let c: RecoveredValue = i - n.y;
        n.seek = a > o - s * 2 || c < s ? c - s : c + a > o - s ? c + a - (o - s) : 0;
      },
    L: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
      i?: RecoveredValue,
    ): RecoveredValue => {
      let a: RecoveredValue = [e.role?.trim(), e.company?.trim()]
          .filter(Boolean)
          .join(`\xA0· `),
        o: RecoveredValue = e.rating ? s_demo_Bkk9bPRV(Math.round(e.rating), 1, 5) : 0;
      return (
        <li
          className={`ui-tw__item`}
          children={
            <figure
              className={`ui-tw__card`}
              tabIndex={n ? 0 : void 0}
              onFocus={n ? I(t) : void 0}
            >
              {o && Number.isFinite(o) ? (
                <div
                  className={`ui-tw__stars`}
                  role={`img`}
                  aria-label={`Rated ${o} out of 5`}
                >
                  {
                    Array.from(
                      {
                        length: 5,
                      },
                      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                        <svg
                          viewBox={`0 0 16 16`}
                          aria-hidden={`true`}
                          data-on={t < o || void 0}
                          children={
                            <path
                              d={`M8 1.6l1.9 3.95 4.35.6-3.17 3.03.78 4.32L8 11.43 4.14 13.5l.78-4.32L1.75 6.15l4.35-.6L8 1.6z`}
                            />
                          }
                          key={t}
                        />
                      ),
                    ) as RecoveredValue[]
                  }
                </div>
              ) : null}
              {e.quote.trim() && (
                <blockquote className={`ui-tw__quote`}>
                  <p dir={`auto`} onPointerEnter={d_demo_Bkk9bPRV}>
                    {e.quote.trim()}
                  </p>
                </blockquote>
              )}
              <figcaption className={`ui-tw__who`}>
                <ComponentF src={e.avatar} name={e.name} />
                <span className={`ui-tw__id`}>
                  <span className={`ui-tw__name`}>
                    <span
                      className={`ui-tw__name-text`}
                      dir={`auto`}
                      onPointerEnter={d_demo_Bkk9bPRV}
                    >
                      {e.name.trim()}
                    </span>
                    {e.verified ? (
                      <svg
                        className={`ui-tw__verified`}
                        viewBox={`0 0 16 16`}
                        role={`img`}
                        aria-label={`Verified customer`}
                      >
                        <circle cx={`8`} cy={`8`} r={`7`} />
                        <path
                          d={`M5.2 8.1l1.9 1.9 3.7-3.8`}
                          fill={`none`}
                          stroke={`var(--ui-tw-card)`}
                          strokeWidth={`1.6`}
                          strokeLinecap={`round`}
                          strokeLinejoin={`round`}
                        />
                      </svg>
                    ) : null}
                  </span>
                  {a ? (
                    <span
                      className={`ui-tw__meta`}
                      dir={`auto`}
                      onPointerEnter={d_demo_Bkk9bPRV}
                    >
                      {a}
                    </span>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          }
          key={i}
        />
      );
    },
    R: RecoveredValue = [`ui-tw`, className].filter(Boolean).join(` `);
  return (
    <r_demo_Bkk9bPRV.Fragment>
      <div
        ref={g as RecoveredValue}
        className={R}
        role={`region`}
        aria-label={label}
        data-cols={E}
        data-static={k || void 0}
        style={
          {
            "--ui-tw-cols": E,
          } as RecoveredValue
        }
        data-empty={items.length === 0 || void 0}
      >
        {items.length === 0 && <p className={`ui-tw__empty`}>{`No quotes yet`}</p>}
        {items.length > 0 &&
          j.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
              k ? (
                <div
                  className={`ui-tw__col`}
                  children={
                    <ul className={`ui-tw__set`}>
                      {e.map(
                        (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
                          L(e, t, !0, String(n)),
                      )}
                    </ul>
                  }
                  key={t}
                />
              ) : (
                <div
                  ref={
                    ((e?: RecoveredValue): RecoveredValue => {
                      _.current[t] = e;
                    }) as RecoveredValue
                  }
                  className={`ui-tw__col`}
                  onPointerEnter={(e?: RecoveredValue): RecoveredValue => {
                    e.pointerType !== `touch` && (x.current[t] = !0);
                  }}
                  onPointerLeave={(): RecoveredValue => (x.current[t] = !1)}
                  onPointerDown={N(t)}
                  onPointerMove={P(t)}
                  onPointerUp={F(t)}
                  onPointerCancel={F(t)}
                  onFocus={(e?: RecoveredValue): RecoveredValue =>
                    (C.current[t] = e.target.matches(`:focus-visible`))
                  }
                  onBlur={(e?: RecoveredValue): RecoveredValue => {
                    e.currentTarget.contains(e.relatedTarget) || (C.current[t] = !1);
                  }}
                  children={
                    <div
                      ref={
                        ((e?: RecoveredValue): RecoveredValue => {
                          v.current[t] = e;
                        }) as RecoveredValue
                      }
                      className={`ui-tw__track`}
                      style={
                        {
                          transform: `translate3d(0, ${-((b.current[t]?.h ?? 0) + (b.current[t]?.y ?? 0))}px, 0)`,
                        } as RecoveredValue
                      }
                    >
                      {
                        Array.from(
                          {
                            length: 1 + Math.max(2, D[t] ?? 2),
                          },
                          (n?: RecoveredValue, i?: RecoveredValue): RecoveredValue => {
                            let a: RecoveredValue = i === 1;
                            return (
                              <ul
                                ref={
                                  (a
                                    ? (e?: RecoveredValue): RecoveredValue => {
                                        y.current[t] = e;
                                      }
                                    : void 0) as RecoveredValue
                                }
                                className={`ui-tw__set`}
                                aria-hidden={!a || void 0}
                                inert={!a || void 0}
                                children={e.map(
                                  (
                                    e?: RecoveredValue,
                                    n?: RecoveredValue,
                                  ): RecoveredValue => L(e, t, a, `${i}-${n}`),
                                )}
                                key={a ? `real` : i}
                              />
                            );
                          },
                        ) as RecoveredValue[]
                      }
                    </div>
                  }
                  key={t}
                />
              ),
          )}
      </div>
    </r_demo_Bkk9bPRV.Fragment>
  );
}
var g_demo_Bkk9bPRV: RecoveredValue = [
  {
    quote: `We replaced three half-finished internal kits with it in a sprint. Our product finally looks like one product.`,
    name: `Lena Hartmann`,
    role: `Design Lead`,
    company: `Fieldnote`,
    avatar: `data:image/jpeg;base64,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`,
    rating: 5,
  },
  {
    quote: `The motion is the part nobody notices – which is exactly the point.`,
    name: `Jonas Weber`,
    role: `Staff Engineer`,
    company: `Ledgerline`,
    avatar: `data:image/jpeg;base64,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`,
    verified: !0,
  },
  {
    quote: `I opened the date range picker expecting to fix the keyboard handling. There was nothing to fix. Focus, arrows, Escape, screen reader labels – all there, and it still felt light.`,
    name: `Priya Raman`,
    role: `Frontend Engineer`,
    company: `Tidepool Health`,
    verified: !0,
  },
  {
    quote: `Copy, paste, ship. Then actually read the code and learn something.`,
    name: `Mara Lindqvist`,
    role: `Product Designer`,
    company: `Kitewise`,
    avatar: `data:image/jpeg;base64,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`,
    rating: 5,
  },
  {
    quote: `Our designers stopped redlining spacing in reviews. The defaults are calm and consistent, and dark mode just works without a second pass.`,
    name: `Daniel Okafor`,
    role: `Head of Design`,
    company: `Northpeak`,
  },
  {
    quote: `Every component is one file with no dependencies. Our bundle audit took five minutes.`,
    name: `Noah Fischer`,
    role: `Tech Lead`,
    company: `Parcelwise`,
    avatar: `data:image/jpeg;base64,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`,
    verified: !0,
  },
  {
    quote: `It feels like it was built by people who care about the last 5%.`,
    name: `Camille Roux`,
    role: `Design Engineer`,
    company: `Sundial`,
    rating: 5,
  },
  {
    quote: `We shipped a new onboarding flow in two days. The dropzone and the command menu alone saved us a week of polish – the empty states and the little transitions were already better than what we had planned.`,
    name: `Sofia Marino`,
    role: `Product Manager`,
    company: `Brightloop`,
    avatar: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////2wCEAAIDAwMEAwQFBQQGBgYGBggIBwcICA0JCgkKCQ0TDA4MDA4MExEUEQ8RFBEeGBUVGB4jHRwdIyolJSo1MjVFRVwBAgMDAwQDBAUFBAYGBgYGCAgHBwgIDQkKCQoJDRMMDgwMDgwTERQRDxEUER4YFRUYHiMdHB0jKiUlKjUyNUVFXP/AABEIAGAAYAMBIgACEQEDEQH/xACOAAABBQEBAQEAAAAAAAAAAAAFAwQGBwgJAQACEAACAQMDAgUCBQIHAAAAAAABAgMABAUGERIHMRMhQVFxCGEUIkJioRWBFiMycoLB8AEAAQUBAQEAAAAAAAAAAAAABgIDBAUHAQAIEQABAwMDBAIDAQEAAAAAAAABAAIDBBESBSExBhMiQRRxUYGRB2H/2gAMAwEAAhEDEQA/AJqqU8VKWSOnqR1rPaC7mmgjpQR0REVKiKkdpdyQrw68KUX8Kq5z+tdI4JuGRy9vBJsT4RblJ5ftXc1HcwDlKyClRjpBo6pOHrb0xlmRBmGXl+p7eVFHyStXHaZjCXqg22Rtpge3CVW3pthicbB7SfteLl8Upu0dHGjpqyVNESbyQJo6ZslHmSmbJXjEuZqYpHRBI6VRKIJHVoWKNkmgjpYRU/EdJ3UsdtaTzudkijZ2P2Ub00WpQKxJ1r6nXmGK4XFTeFdyR87m5HmYIz2Vf3tXNG5geWY/57STSHkSWYt8k+pqT5jL3GX1Bd5GcM8l1O0ip3JJP5V/t2q99MaTjtXSa4QNOQrP7Bj57VG0+nn1BpZCPJ7wLn0CqXUaqOmeXyHxY0lVXj+nuYu7dJPBILAd/I0UyfT/AFFi7VbkRF1Q77A+Yrf2KhieJDtVm2uIiu08NlBDULdQU0tNIWmMXYPK/tF2iwQ1EAd3D5btI9LGHSHqXmEy9vh8rI01rcnw7aZ/NoZvRG/a1b/eKufnUfR501kUzFtHtFDKruB6Mp5Bq6G28iXNrBOh3WWNXB+zDepfT9YyqhkDS6zLEBxuRf0m6+nfTvAcRc+xwUIeOmDx1I3jpg6UZ9lVGamiJRBErxFogiU8WpF0kqVWvUq7ay6faknXuthMB8sONWyqVCtaWMF5pPLQTReJHJAQye4ph8TntLW8uBA+yu547/hcRdJWU17qi3URbhCW8+ygVsDcLM/GKSQIxDBF5faoppjS7Y3UeQlDBopFbwtvRd/IVLLnD5a9dhBevACpA4bDY+9E2j0s9BTP2vIx0lxsNwCAgusdFWyNJvhIIyDudrgq0dO5XHzyCDaSNx+mSMof5q4TlrLFqj3DuA3moRC5I+wFZtk/F2k1vF4rPxRNySSeSjZjufQ1oDU9rmchp2x/p8qwu0IBbbc9qAepGzfBoaidjGurJjHb0z/pWjaDUw/JrKaHJ3xI2uvt5ZelX3ULIY7K6PzO0Myo1qXQyxMnIxn03q8dKWklvpbCwuDyjsoFbf3CCqpstLZ+TFPa5C+NxbvbJGUYAnxCRyIrSpiVFCgeSgAfAod6OpQ2SvI4a8NVpr8hPxrixLSUDdKYOlH3SmDpWsiJBWalaLRBFpGMUQRagkKTdeqtfm4tkntpom7SIyn/AJDangWlwtIsQQQuXBWAZcTLjMm9tOhVxyA3/UB6j7U8tZQieHxHIMdj771oDqbjJ3xltewW/iSW9xGJdhuRC/5WI+N9zWdpD4bow7ij3T63vumc+NreGuHogjlBVTTilMbGPceXN/PPCDZKNoboGRWJPH8qjcnkdthWosPdxRY+OMxS7pFGxLIQuz9uJ7Hb1rM0N3dSXTSJbvKysCG8uP8ANaQ0/l8kIIlmsJAj7hXPHYfI37Vjn+kyj4FFAZHHtPDi7Aj+XWm9D0ru5W1QjAbMdhkCf3ZWTIkAiijRfN2Rj9vXal3SvraEli5/8TTx1qR0hTPbpnefe9Q8vF+ceAl9Q1DX12DeImhv75KCulDZFo660NkWtFDEIZKRoKIoKYJRJKHyrIpyBS4FJrQDP6jweAxkl9k72K1t07u57k9gB6k0g2suI3dBPws/Lt4bb/G1c4riZ0Y7glAfI+1EtV/UdjLvIPZY6JjjXj4vdkFXZvsh7JQXEZrEZBHCXcLc+2zijXQRD2qjN43xsL2O3tZr1HPKaqjEOVxn5Y3Yb+j/ABTPBfg5JlEnEg+prUeKs7IpGtqp/cxJIqstE2dtESDwNO+ofUax0vjUlhmhe68RBHbcgS43HL4G1fPPW9ZFNr9NTywgwCRub2jctC3vpmOWDQTKHWkLCQCdg5aFWJUQKOwps4qvNH9RNLarhc4+7BljA8WBxwkTf7HuKshxWz0bqd0EZhLTHYBuPFggGbuZuzvkTvdCnFC5BRhxQ2QVahRUWjNB87qfT+AsTdZTJQWkQ7NI4BY+yjuTWbusPVb/AAjjorSw4PlbtSYgw5LCnrI4/hRXIfL5XK5W/ku8heTXVy5PKWVuTfA9h9hQZJLiFZSzNYbWuV0W1n9U6jxbfTWN5eRAvbsFR8pFWAM9qfUGfuzc5XJXF3L6GR91X/ag2Vf7CofXtVpkydu5Vr5JHfX4ThZSor0uCe1Nya9FOmQgcpjdSC2u7lRsLqYD2EjAU7aUlye7Hue5qPxjaiCyUOVgY+9wCrmlLmgIzBd3NvIjwyvFIp3V0YqwPuCKvvCdd+ouICo1+l9GD/ouk5nb2DrsazjyphI1V9PLNC67Hln0bKwkxcNxddP9OfUvgLvgmXxk1i57yxHx4v8Apq1vjsxi8tYx3djdxXEEg/LJG24rgb2i3rX30/aoew1IcfJKRDkEYBSfLxk81PyQKLKDXp+/FHMQ5j3hmXBBPChPpm4kt2Ibey//2Q==`,
    verified: !0,
  },
  {
    quote: `Finally a library that doesn't look like every other AI-generated dashboard.`,
    name: `Elif Demir`,
    role: `Brand Designer`,
    company: `Harbor Studio`,
    rating: 5,
  },
  {
    quote: `The phone layouts are the real surprise. Everything holds up at 320 pixels, which I can't say about our own app.`,
    name: `Theo Brandt`,
    role: `Mobile Engineer`,
    company: `Copperleaf`,
    avatar: `data:image/jpeg;base64,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`,
  },
  {
    quote: `Accessible by default, without me having to argue for it in planning.`,
    name: `Marcus Lee`,
    role: `Accessibility Lead`,
    company: `Quillstack`,
    verified: !0,
  },
  {
    quote: `I use it as a reference as much as a library. When a junior asks how a height animation should feel, I just send them the source.`,
    name: `Hana Sato`,
    role: `Principal Designer`,
    company: `Plainview`,
    rating: 5,
  },
];
function Runtime(): RecoveredValue {
  return (
    <div className={`testimonial-wall-demo`}>
      <header className={`testimonial-wall-demo__head`}>
        <p className={`testimonial-wall-demo__eyebrow`}>{`Testimonials`}</p>
        <h2 className={`testimonial-wall-demo__title`}>{`Loved by product teams`}</h2>
      </header>
      <ComponentM items={g_demo_Bkk9bPRV} speed={26} label={`What product teams say`} />
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
export { TestimonialWall };
export type { Testimonial };
export type { TestimonialWallProps };
