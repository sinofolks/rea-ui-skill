"use client";

import "./CoverFlow.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import {
  type ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Cover Flow – browse covers in 3D, in component logic and public types.
 * The cover in front faces you; the others turn away and stack up on both sides, with a soft reflection
 * on the floor. Drag, flick, scrub with the trackpad, use the arrow keys or click a cover – a spring
 * carries the row along and settles on the nearest cover. The caption below rolls to the new title.
 * Everything moves on the GPU (transforms only) and React re-renders only when the front cover changes.
 * Styles are provided by the sibling CSS import.
 */
type CoverFlowItem = {
  id: string | number;
  title?: string;
  subtitle?: string;
  /** Image URL – or pass your own cover with `cover` */
  image?: string;
  alt?: string;
  /** Any content instead of an image: artwork, a video, a product card */
  cover?: ReactNode;
};
type CoverFlowProps = {
  items: CoverFlowItem[];
  /** Controlled front cover */
  index?: number;
  /** Starting cover when uncontrolled – defaults to the middle one */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Clicking (or pressing Enter on) the cover in front */
  onSelect?: (item: CoverFlowItem, index: number) => void;
  /** Cover size in px – scales down on narrow containers */
  itemWidth?: number;
  itemHeight?: number;
  /** How far the side covers turn away, in degrees */
  angle?: number;
  /** Mirror the covers on the floor */
  reflection?: boolean;
  /** Title and subtitle of the front cover */
  caption?: boolean;
  /** Replaces the default caption (title and subtitle) */
  renderCaption?: (item: CoverFlowItem, index: number) => ReactNode;
  /** Previous / next buttons next to the caption */
  controls?: boolean;
  /** A row of small position ticks under the caption */
  ticks?: boolean;
  /** A soft click each time a new cover reaches the front */
  sound?: boolean;
  "aria-label"?: string;
  className?: string;
};
const VISIBLE = 7; // covers drawn on each side
const DRAG_PX = 110; // drag distance per cover, before scaling
function CoverFlow({
  items,
  index,
  defaultIndex,
  onIndexChange,
  onSelect,
  itemWidth = 280,
  itemHeight = 280,
  angle = 50,
  reflection = true,
  caption = true,
  renderCaption,
  controls = true,
  ticks = true,
  sound = false,
  "aria-label": ariaLabel = "Cover flow",
  className,
}: CoverFlowProps) {
  const count = items.length;
  const last = Math.max(count - 1, 0);
  const clamp = (v: number) => Math.min(Math.max(v, 0), last);
  const start = clamp(index ?? defaultIndex ?? Math.floor(last / 2));
  const [active, setActive] = useState(start);
  const [dir, setDir] = useState(1); // direction of travel, for the caption
  const [scale, setScale] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  // Motion state lives outside React: pos follows target on a spring, painted every frame
  const m = useRef({ pos: start, target: start, vel: 0, raf: 0, last: 0, active: start });
  const opts = useRef({ angle, scale, itemWidth, onIndexChange, sound, count });
  opts.current = { angle, scale, itemWidth, onIndexChange, sound, count };
  const reduced = useRef(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = q.matches;
    const on = () => (reduced.current = q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  // A short, soft tick – made with Web Audio, no sound file
  const audio = useRef<AudioContext | null>(null);
  const tick = () => {
    const ctx = audio.current;
    if (!ctx || ctx.state !== "running") return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(2200, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.03);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  };
  const wakeAudio = () => {
    if (!opts.current.sound) return;
    const Ctx =
      window.AudioContext ??
      (
        window as unknown as {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (!audio.current && Ctx) audio.current = new Ctx();
    if (audio.current?.state === "suspended") void audio.current.resume();
  };
  useEffect(() => () => void audio.current?.close(), []);
  // Place every cover for the current (fractional) position
  const paint = useCallback(() => {
    const { pos } = m.current;
    const { angle: a, scale: s, itemWidth: w } = opts.current;
    const gap = w * 0.78 * s; // center cover to the first side cover
    const step = w * 0.27 * s; // between side covers
    const depth = w * 0.7 * s;
    cards.current.forEach((el, i) => {
      if (!el) return;
      const d = i - pos;
      const ad = Math.abs(d);
      if (ad > VISIBLE + 1) {
        el.style.visibility = "hidden";
        return;
      }
      const t = Math.min(ad, 1); // 0 in front, 1 once fully turned
      const dir = Math.sign(d);
      const x = dir * (t * gap + Math.max(ad - 1, 0) * step);
      el.style.visibility = "";
      const k = 1 - t * 0.08 - Math.min(Math.max(ad - 1, 0), 4) * 0.015; // recede a little more with distance
      el.style.transform = `translate3d(${x}px, 0, ${-t * depth}px) rotateY(${-dir * t * a}deg) scale(${k.toFixed(4)})`;
      el.style.zIndex = String(1000 - Math.round(ad * 10));
      el.style.setProperty("--ui-cf-t", t.toFixed(3));
      el.style.setProperty("--ui-cf-d", Math.min(Math.max(d, -1.5), 1.5).toFixed(3)); // drives the image drift
      el.dataset.side = d < 0 ? "left" : "right";
    });
    const now = Math.round(Math.min(Math.max(pos, 0), opts.current.count - 1));
    if (now !== m.current.active) {
      setDir(now > m.current.active ? 1 : -1);
      m.current.active = now;
      setActive(now);
      opts.current.onIndexChange?.(now);
      tick();
    }
  }, []);
  // Spring toward the target; stops itself once settled
  const run = useCallback(() => {
    const s = m.current;
    if (s.raf) return;
    s.last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - s.last, 32) / 1000;
      s.last = now;
      const k = 190;
      const c = 2 * Math.sqrt(k) * 0.92; // a hair under critical: settles with the faintest give
      s.vel += (k * (s.target - s.pos) - c * s.vel) * dt;
      s.pos += s.vel * dt;
      if (Math.abs(s.target - s.pos) < 0.0006 && Math.abs(s.vel) < 0.002) {
        s.pos = s.target;
        s.vel = 0;
        s.raf = 0;
        paint();
        return;
      }
      paint();
      s.raf = requestAnimationFrame(frame);
    };
    s.raf = requestAnimationFrame(frame);
  }, [paint]);
  const goTo = useCallback(
    (i: number) => {
      const s = m.current;
      s.target = Math.min(Math.max(Math.round(i), 0), opts.current.count - 1);
      if (reduced.current) {
        s.pos = s.target;
        s.vel = 0;
        paint();
      } else run();
    },
    [paint, run],
  );
  useEffect(() => () => cancelAnimationFrame(m.current.raf), []);
  // Controlled index
  useEffect(() => {
    if (index !== undefined && index !== Math.round(m.current.target)) goTo(index);
  }, [index, goTo]);
  // Keep the position valid when items are added or removed
  useEffect(() => {
    if (m.current.target > last) goTo(last);
    else paint();
  }, [last, goTo, paint]);
  // Scale covers down when the container is narrow
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const fit = () =>
      setScale(Math.min(1, Math.max(0.5, el.clientWidth / (itemWidth * 3.2))));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [itemWidth]);
  // After every render: items may have been reordered or resized (cheap – React renders only on a new front cover)
  useLayoutEffect(paint);
  // Trackpad / horizontal wheel scrubs; vertical scrolling stays with the page
  const snapTimer = useRef(0);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
      if (Math.abs(dx) <= Math.abs(e.deltaY) && !e.shiftKey) return;
      e.preventDefault();
      wakeAudio();
      const s = m.current;
      const unit = DRAG_PX * opts.current.scale * 1.4;
      s.target = Math.min(
        Math.max(s.target + dx / unit, -0.35),
        opts.current.count - 1 + 0.35,
      );
      run();
      window.clearTimeout(snapTimer.current);
      // Settle with the swipe's momentum: lean toward the direction it was going
      snapTimer.current = window.setTimeout(
        () => goTo(s.target + Math.sign(dx) * 0.3),
        110,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(snapTimer.current);
    };
  }, [run, goTo]);
  // Drag and flick: the row follows the finger 1:1, a flick carries on, then it settles on a cover
  const drag = useRef<{
    id: number;
    x: number;
    from: number;
    moved: boolean;
    hit: number | null;
    samples: {
      x: number;
      t: number;
    }[];
  } | null>(null);
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    wakeAudio();
    const hit = (e.target as HTMLElement).closest<HTMLElement>("[data-cf-index]");
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      from: m.current.pos,
      moved: false,
      hit: hit ? Number(hit.dataset.cfIndex) : null,
      samples: [{ x: e.clientX, t: performance.now() }],
    };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.dataset.dragging = "";
    }
    const s = m.current;
    cancelAnimationFrame(s.raf);
    s.raf = 0;
    let p = d.from - dx / (DRAG_PX * opts.current.scale);
    const max = opts.current.count - 1;
    if (p < 0) p = p * 0.3; // rubber band past the ends
    if (p > max) p = max + (p - max) * 0.3;
    s.pos = s.target = p;
    s.vel = 0;
    d.samples.push({ x: e.clientX, t: performance.now() });
    if (d.samples.length > 6) d.samples.shift();
    paint();
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    delete e.currentTarget.dataset.dragging;
    if (!d.moved) {
      // A click: bring that cover to the front, or select it if it is already there
      if (d.hit === null) return;
      if (d.hit === Math.round(m.current.target)) onSelect?.(items[d.hit], d.hit);
      else goTo(d.hit);
      return;
    }
    const first = d.samples[0];
    const lastS = d.samples[d.samples.length - 1];
    const dt = Math.max(lastS.t - first.t, 1);
    const v = (-((lastS.x - first.x) / dt) * 1000) / (DRAG_PX * opts.current.scale); // covers per second
    const s = m.current;
    s.vel = reduced.current ? 0 : v;
    let to = Math.round(s.pos + v * 0.18);
    // A quick flick always moves at least one cover
    if (Math.abs(v) > 0.8 && to === Math.round(d.from)) to += Math.sign(v);
    goTo(to);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const cur = Math.round(m.current.target);
    const keys: Record<string, number> = {
      ArrowLeft: cur - 1,
      ArrowRight: cur + 1,
      Home: 0,
      End: last,
    };
    if (e.key in keys) {
      e.preventDefault();
      wakeAudio();
      goTo(keys[e.key]);
    } else if (
      (e.key === "Enter" || e.key === " ") &&
      onSelect &&
      e.target === e.currentTarget
    ) {
      e.preventDefault();
      onSelect(items[cur], cur);
    }
  };
  const current = items[active];
  const w = Math.round(itemWidth * scale);
  const h = Math.round(itemHeight * scale);
  const face = (item: CoverFlowItem, decorative = false) => (
    <div className="ui-cf__media">
      {item.cover ??
        (item.image ? (
          <img
            src={item.image}
            alt={decorative ? "" : (item.alt ?? item.title ?? "")}
            draggable={false}
            loading="lazy"
            decoding="async"
            // A picture that doesn't load leaves the plain cover instead of a broken image and its alt text
            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
          />
        ) : null)}
    </div>
  );
  return (
    <div
      className={["ui-cf", className].filter(Boolean).join(" ")}
      style={{ "--ui-cf-w": `${w}px`, "--ui-cf-h": `${h}px` } as React.CSSProperties}
      data-reflection={reflection || undefined}
    >
      {/* React 19 hoists this into <head> once, no matter how many cover flows render */}

      <div
        ref={root}
        className="ui-cf__viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        data-selectable={onSelect ? "" : undefined}
      >
        <div
          className="ui-cf__stage"
          style={{ perspective: `${Math.round(1000 * scale)}px` }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="ui-cf__item"
              data-cf-index={i}
              data-active={i === active || undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}${item.title ? `: ${item.title}` : ""}`}
              aria-hidden={i !== active || undefined}
            >
              <div className="ui-cf__ground" aria-hidden="true" />
              <div className="ui-cf__card">{face(item)}</div>
              {reflection && (
                <div className="ui-cf__reflection" aria-hidden="true" inert>
                  <div className="ui-cf__card">{face(item, true)}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {(caption || controls || ticks) && (
        <div className="ui-cf__footer">
          <div className="ui-cf__row">
            {controls && (
              <button
                type="button"
                className="ui-cf__nav"
                aria-label="Previous"
                disabled={active === 0}
                onClick={() => goTo(Math.round(m.current.target) - 1)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3.5 5.5 8l4.5 4.5" />
                </svg>
              </button>
            )}
            {caption && (
              <div className="ui-cf__caption" aria-live="polite">
                <div
                  key={current?.id}
                  className="ui-cf__caption-in"
                  data-dir={dir > 0 ? "next" : "prev"}
                >
                  {current &&
                    (renderCaption ? (
                      renderCaption(current, active)
                    ) : (
                      <>
                        {current.title && (
                          <div className="ui-cf__title">{current.title}</div>
                        )}
                        {current.subtitle && (
                          <div className="ui-cf__subtitle">{current.subtitle}</div>
                        )}
                      </>
                    ))}
                </div>
              </div>
            )}
            {controls && (
              <button
                type="button"
                className="ui-cf__nav"
                aria-label="Next"
                disabled={active === last}
                onClick={() => goTo(Math.round(m.current.target) + 1)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3.5 10.5 8 6 12.5" />
                </svg>
              </button>
            )}
          </div>
          {/* Up to 15 covers a tick each – beyond that a quiet count, ticks would run past the edge */}
          {ticks && count > 15 && (
            <div className="ui-cf__counter" aria-hidden="true">
              {active + 1} / {count}
            </div>
          )}
          {ticks && count > 1 && count <= 15 && (
            <div className="ui-cf__ticks">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  tabIndex={-1}
                  className="ui-cf__tick"
                  aria-label={`Show ${item.title ?? `cover ${i + 1}`}`}
                  aria-current={i === active || undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
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
var n_demo_DUDAZG_X: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_DUDAZG_X: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_DUDAZG_X: RecoveredValue = 110;
function ComponentA({
  items,
  index,
  defaultIndex,
  onIndexChange,
  onSelect,
  itemWidth = 280,
  itemHeight = 280,
  angle = 50,
  reflection = !0,
  caption = !0,
  renderCaption,
  controls = !0,
  ticks = !0,
  sound = !1,
  "aria-label": v = `Cover flow`,
  className,
}: RecoveredValue): RecoveredValue {
  let b: RecoveredValue = items.length,
    x: RecoveredValue = Math.max(b - 1, 0),
    S: RecoveredValue = ((e?: RecoveredValue): RecoveredValue =>
      Math.min(Math.max(e, 0), x))(index ?? defaultIndex ?? Math.floor(x / 2)),
    [C, w]: RecoveredValue = (0, n_demo_DUDAZG_X.useState)(S),
    [T, E]: RecoveredValue = (0, n_demo_DUDAZG_X.useState)(1),
    [D, O]: RecoveredValue = (0, n_demo_DUDAZG_X.useState)(1),
    k: RecoveredValue = (0, n_demo_DUDAZG_X.useRef)(null),
    A: RecoveredValue = (0, n_demo_DUDAZG_X.useRef)([]),
    j: RecoveredValue = (0, n_demo_DUDAZG_X.useRef)({
      pos: S,
      target: S,
      vel: 0,
      raf: 0,
      last: 0,
      active: S,
    }),
    M: RecoveredValue = (0, n_demo_DUDAZG_X.useRef)({
      angle: angle,
      scale: D,
      itemWidth: itemWidth,
      onIndexChange: onIndexChange,
      sound: sound,
      count: b,
    });
  M.current = {
    angle: angle,
    scale: D,
    itemWidth: itemWidth,
    onIndexChange: onIndexChange,
    sound: sound,
    count: b,
  };
  let N: RecoveredValue = (0, n_demo_DUDAZG_X.useRef)(!1);
  (0, n_demo_DUDAZG_X.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = window.matchMedia(`(prefers-reduced-motion: reduce)`);
    N.current = e.matches;
    let t: RecoveredValue = (): RecoveredValue => (N.current = e.matches);
    return (
      e.addEventListener(`change`, t),
      (): RecoveredValue => e.removeEventListener(`change`, t)
    );
  }, []);
  let P: RecoveredValue = (0, n_demo_DUDAZG_X.useRef)(null),
    F: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = P.current;
      if (!e || e.state !== `running`) return;
      let t: RecoveredValue = e.currentTime,
        n: RecoveredValue = e.createOscillator(),
        r: RecoveredValue = e.createGain();
      ((n.type = `triangle`),
        n.frequency.setValueAtTime(2200, t),
        n.frequency.exponentialRampToValueAtTime(900, t + 0.03),
        r.gain.setValueAtTime(1e-4, t),
        r.gain.exponentialRampToValueAtTime(0.05, t + 0.004),
        r.gain.exponentialRampToValueAtTime(1e-4, t + 0.045),
        n.connect(r).connect(e.destination),
        n.start(t),
        n.stop(t + 0.05));
    },
    I: RecoveredValue = (): RecoveredValue => {
      if (!M.current.sound) return;
      let e: RecoveredValue =
        window.AudioContext ?? (window as RecoveredValue).webkitAudioContext;
      (!P.current && e && (P.current = new e()),
        P.current?.state === `suspended` && P.current.resume());
    };
  (0, n_demo_DUDAZG_X.useEffect)(
    (): RecoveredValue => (): RecoveredValue => void P.current?.close(),
    [],
  );
  let L: RecoveredValue = (0, n_demo_DUDAZG_X.useCallback)((): RecoveredValue => {
      let { pos: e }: RecoveredValue = j.current,
        { angle: t, scale: n, itemWidth: r }: RecoveredValue = M.current,
        i: RecoveredValue = r * 0.78 * n,
        a: RecoveredValue = r * 0.27 * n,
        o: RecoveredValue = r * 0.7 * n;
      A.current.forEach((n?: RecoveredValue, r?: RecoveredValue): RecoveredValue => {
        if (!n) return;
        let s: RecoveredValue = r - e,
          c: RecoveredValue = Math.abs(s);
        if (c > 8) {
          n.style.visibility = `hidden`;
          return;
        }
        let l: RecoveredValue = Math.min(c, 1),
          u: RecoveredValue = Math.sign(s),
          d: RecoveredValue = u * (l * i + Math.max(c - 1, 0) * a);
        n.style.visibility = ``;
        let f: RecoveredValue = 1 - l * 0.08 - Math.min(Math.max(c - 1, 0), 4) * 0.015;
        ((n.style.transform = `translate3d(${d}px, 0, ${-l * o}px) rotateY(${-u * l * t}deg) scale(${f.toFixed(4)})`),
          (n.style.zIndex = String(1e3 - Math.round(c * 10))),
          n.style.setProperty(`--ui-cf-t`, l.toFixed(3)),
          n.style.setProperty(`--ui-cf-d`, Math.min(Math.max(s, -1.5), 1.5).toFixed(3)),
          (n.dataset.side = s < 0 ? `left` : `right`));
      });
      let s: RecoveredValue = Math.round(Math.min(Math.max(e, 0), M.current.count - 1));
      s !== j.current.active &&
        (E(s > j.current.active ? 1 : -1),
        (j.current.active = s),
        w(s),
        M.current.onIndexChange?.(s),
        F());
    }, []),
    R: RecoveredValue = (0, n_demo_DUDAZG_X.useCallback)((): RecoveredValue => {
      let e: RecoveredValue = j.current;
      if (e.raf) return;
      e.last = performance.now();
      let t: RecoveredValue = (n?: RecoveredValue): RecoveredValue => {
        let r: RecoveredValue = Math.min(n - e.last, 32) / 1e3;
        e.last = n;
        let i: RecoveredValue = 2 * Math.sqrt(190) * 0.92;
        if (
          ((e.vel += (190 * (e.target - e.pos) - i * e.vel) * r),
          (e.pos += e.vel * r),
          Math.abs(e.target - e.pos) < 6e-4 && Math.abs(e.vel) < 0.002)
        ) {
          ((e.pos = e.target), (e.vel = 0), (e.raf = 0), L());
          return;
        }
        (L(), (e.raf = requestAnimationFrame(t)));
      };
      e.raf = requestAnimationFrame(t);
    }, [L]),
    z: RecoveredValue = (0, n_demo_DUDAZG_X.useCallback)(
      (e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = j.current;
        ((t.target = Math.min(Math.max(Math.round(e), 0), M.current.count - 1)),
          N.current ? ((t.pos = t.target), (t.vel = 0), L()) : R());
      },
      [L, R],
    );
  ((0, n_demo_DUDAZG_X.useEffect)(
    (): RecoveredValue => (): RecoveredValue => cancelAnimationFrame(j.current.raf),
    [],
  ),
    (0, n_demo_DUDAZG_X.useEffect)((): RecoveredValue => {
      index !== void 0 && index !== Math.round(j.current.target) && z(index);
    }, [index, z]),
    (0, n_demo_DUDAZG_X.useEffect)((): RecoveredValue => {
      j.current.target > x ? z(x) : L();
    }, [x, z, L]),
    (0, n_demo_DUDAZG_X.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = k.current;
      if (!e) return;
      let t: RecoveredValue = (): RecoveredValue =>
        O(Math.min(1, Math.max(0.5, e.clientWidth / (itemWidth * 3.2))));
      t();
      let n: RecoveredValue = new ResizeObserver(t);
      return (n.observe(e), (): RecoveredValue => n.disconnect());
    }, [itemWidth]),
    (0, n_demo_DUDAZG_X.useLayoutEffect)(L));
  let B: RecoveredValue = (0, n_demo_DUDAZG_X.useRef)(0);
  (0, n_demo_DUDAZG_X.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = k.current;
    if (!e) return;
    let t: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
      if (Math.abs(t) <= Math.abs(e.deltaY) && !e.shiftKey) return;
      (e.preventDefault(), I());
      let n: RecoveredValue = j.current,
        r: RecoveredValue = i_demo_DUDAZG_X * M.current.scale * 1.4;
      ((n.target = Math.min(
        Math.max(n.target + t / r, -0.35),
        M.current.count - 1 + 0.35,
      )),
        R(),
        window.clearTimeout(B.current),
        (B.current = window.setTimeout(
          (): RecoveredValue => z(n.target + Math.sign(t) * 0.3),
          110,
        )));
    };
    return (
      e.addEventListener(`wheel`, t, {
        passive: !1,
      }),
      (): RecoveredValue => {
        (e.removeEventListener(`wheel`, t), window.clearTimeout(B.current));
      }
    );
  }, [R, z]);
  let V: RecoveredValue = (0, n_demo_DUDAZG_X.useRef)(null),
    H: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.button !== 0) return;
      I();
      let t: RecoveredValue = e.target.closest(`[data-cf-index]`);
      V.current = {
        id: e.pointerId,
        x: e.clientX,
        from: j.current.pos,
        moved: !1,
        hit: t ? Number(t.dataset.cfIndex) : null,
        samples: [
          {
            x: e.clientX,
            t: performance.now(),
          },
        ],
      };
    },
    U: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = V.current;
      if (!t || t.id !== e.pointerId) return;
      let n: RecoveredValue = e.clientX - t.x;
      if (!t.moved) {
        if (Math.abs(n) < 6) return;
        ((t.moved = !0),
          e.currentTarget.setPointerCapture(e.pointerId),
          (e.currentTarget.dataset.dragging = ``));
      }
      let r: RecoveredValue = j.current;
      (cancelAnimationFrame(r.raf), (r.raf = 0));
      let a: RecoveredValue = t.from - n / (i_demo_DUDAZG_X * M.current.scale),
        o: RecoveredValue = M.current.count - 1;
      (a < 0 && (a *= 0.3),
        a > o && (a = o + (a - o) * 0.3),
        (r.pos = r.target = a),
        (r.vel = 0),
        t.samples.push({
          x: e.clientX,
          t: performance.now(),
        }),
        t.samples.length > 6 && t.samples.shift(),
        L());
    },
    W: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = V.current;
      if (!n || n.id !== t.pointerId) return;
      if (((V.current = null), delete t.currentTarget.dataset.dragging, !n.moved)) {
        if (n.hit === null) return;
        n.hit === Math.round(j.current.target)
          ? onSelect?.(items[n.hit], n.hit)
          : z(n.hit);
        return;
      }
      let r: RecoveredValue = n.samples[0],
        a: RecoveredValue = n.samples[n.samples.length - 1],
        o: RecoveredValue = Math.max(a.t - r.t, 1),
        s: RecoveredValue =
          (-((a.x - r.x) / o) * 1e3) / (i_demo_DUDAZG_X * M.current.scale),
        l: RecoveredValue = j.current;
      l.vel = N.current ? 0 : s;
      let u: RecoveredValue = Math.round(l.pos + s * 0.18);
      (Math.abs(s) > 0.8 && u === Math.round(n.from) && (u += Math.sign(s)), z(u));
    },
    G: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = Math.round(j.current.target),
        r: RecoveredValue = {
          ArrowLeft: n - 1,
          ArrowRight: n + 1,
          Home: 0,
          End: x,
        };
      t.key in r
        ? (t.preventDefault(), I(), z(r[t.key]))
        : (t.key === `Enter` || t.key === ` `) &&
          onSelect &&
          t.target === t.currentTarget &&
          (t.preventDefault(), onSelect(items[n], n));
    },
    K: RecoveredValue = items[C],
    q: RecoveredValue = Math.round(itemWidth * D),
    J: RecoveredValue = Math.round(itemHeight * D),
    Y: RecoveredValue = (e?: RecoveredValue, t: RecoveredValue = !1): RecoveredValue => (
      <div className={`ui-cf__media`}>
        {e.cover ??
          (e.image ? (
            <img
              src={e.image}
              alt={t ? `` : (e.alt ?? e.title ?? ``)}
              draggable={!1}
              loading={`lazy`}
              decoding={`async`}
              onError={(e?: RecoveredValue): RecoveredValue =>
                (e.currentTarget.style.visibility = `hidden`)
              }
            />
          ) : null)}
      </div>
    );
  return (
    <div
      className={[`ui-cf`, className].filter(Boolean).join(` `)}
      style={
        {
          "--ui-cf-w": `${q}px`,
          "--ui-cf-h": `${J}px`,
        } as RecoveredValue
      }
      data-reflection={reflection || void 0}
    >
      <div
        ref={k as RecoveredValue}
        className={`ui-cf__viewport`}
        role={`region`}
        aria-roledescription={`carousel`}
        aria-label={v}
        tabIndex={0}
        onKeyDown={G}
        onPointerDown={H}
        onPointerMove={U}
        onPointerUp={W}
        onPointerCancel={W}
        data-selectable={onSelect ? `` : void 0}
      >
        <div
          className={`ui-cf__stage`}
          style={
            {
              perspective: `${Math.round(1e3 * D)}px`,
            } as RecoveredValue
          }
        >
          {items.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <div
                ref={
                  ((e?: RecoveredValue): RecoveredValue => {
                    A.current[t] = e;
                  }) as RecoveredValue
                }
                className={`ui-cf__item`}
                data-cf-index={t}
                data-active={t === C || void 0}
                role={`group`}
                aria-roledescription={`slide`}
                aria-label={`${t + 1} of ${b}${e.title ? `: ${e.title}` : ``}`}
                aria-hidden={t !== C || void 0}
                key={e.id}
              >
                <div className={`ui-cf__ground`} aria-hidden={`true`} />
                <div className={`ui-cf__card`}>{Y(e)}</div>
                {reflection && (
                  <div className={`ui-cf__reflection`} aria-hidden={`true`} inert={!0}>
                    <div className={`ui-cf__card`}>{Y(e, !0)}</div>
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      </div>
      {(caption || controls || ticks) && (
        <div className={`ui-cf__footer`}>
          <div className={`ui-cf__row`}>
            {controls && (
              <button
                type={`button`}
                className={`ui-cf__nav`}
                aria-label={`Previous`}
                disabled={C === 0}
                onClick={(): RecoveredValue => z(Math.round(j.current.target) - 1)}
              >
                <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M10 3.5 5.5 8l4.5 4.5`} />
                </svg>
              </button>
            )}
            {caption && (
              <div className={`ui-cf__caption`} aria-live={`polite`}>
                <div
                  className={`ui-cf__caption-in`}
                  data-dir={T > 0 ? `next` : `prev`}
                  children={
                    K &&
                    (renderCaption ? (
                      renderCaption(K, C)
                    ) : (
                      <r_demo_DUDAZG_X.Fragment>
                        {K.title && <div className={`ui-cf__title`}>{K.title}</div>}
                        {K.subtitle && (
                          <div className={`ui-cf__subtitle`}>{K.subtitle}</div>
                        )}
                      </r_demo_DUDAZG_X.Fragment>
                    ))
                  }
                  key={K?.id}
                />
              </div>
            )}
            {controls && (
              <button
                type={`button`}
                className={`ui-cf__nav`}
                aria-label={`Next`}
                disabled={C === x}
                onClick={(): RecoveredValue => z(Math.round(j.current.target) + 1)}
              >
                <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M6 3.5 10.5 8 6 12.5`} />
                </svg>
              </button>
            )}
          </div>
          {ticks && b > 15 && (
            <div className={`ui-cf__counter`} aria-hidden={`true`}>
              {C + 1}
              {` / `}
              {b}
            </div>
          )}
          {ticks && b > 1 && b <= 15 && (
            <div className={`ui-cf__ticks`}>
              {items.map(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <button
                    type={`button`}
                    tabIndex={-1}
                    className={`ui-cf__tick`}
                    aria-label={`Show ${e.title ?? `cover ${t + 1}`}`}
                    aria-current={t === C || void 0}
                    onClick={(): RecoveredValue => z(t)}
                    key={e.id}
                  />
                ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
var s_demo_DUDAZG_X: RecoveredValue = [
  [`Stone`, `#f4f4f5`, `#d4d4d8`],
  [`Mint`, `#f0fbf7`, `#b6e4d3`],
  [`Sky`, `#eff6ff`, `#bcd6fb`],
  [`Sage`, `#f0f7f2`, `#bfdcc8`],
  [`Blush`, `#fdf2f8`, `#f5b5d6`],
  [`Sand`, `#fdfaf3`, `#ead9b8`],
  [`Lilac`, `#f5f3ff`, `#cdc3f5`],
  [`Ice`, `#f0faff`, `#b8e0f0`],
  [`Peach`, `#fff7ed`, `#f6c9a4`],
  [`Mist`, `#f8fafc`, `#cbd5e1`],
].map(
  ([e, t, n]: RecoveredValue): RecoveredValue => ({
    id: e,
    title: e,
    subtitle: `${t} → ${n}`.toUpperCase(),
    cover: (
      <div
        className={`cf-demo__gradient`}
        style={
          {
            background: `linear-gradient(160deg, ${t}, ${n})`,
          } as RecoveredValue
        }
      />
    ),
  }),
);
function Runtime(): RecoveredValue {
  return (
    <div className={`cf-demo`}>
      <ComponentA
        items={s_demo_DUDAZG_X}
        defaultIndex={4}
        itemWidth={240}
        itemHeight={320}
        aria-label={`Gradient collection`}
      />
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
export { CoverFlow };
export type { CoverFlowItem };
export type { CoverFlowProps };
