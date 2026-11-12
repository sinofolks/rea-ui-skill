"use client";

import "./LogoMarquee.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import {
  type ReactElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Logo Marquee (clean) – the endless "Trusted by" strip for landing pages, in component logic and public types.
 * A calm white section: smaller marks in a quiet gray, generous even spacing instead of any lines, and long, soft
 * edge fades. Every row repeats its logos as often as the width needs and slides by a measured set width, so the
 * wrap has no gap and no jump. Speed is in px per second, the same on a phone and on a wide screen. One
 * requestAnimationFrame loop owns a velocity per row: hovering or focusing the strip eases it down to a stop,
 * leaving speeds it back up, and dragging or swiping scrubs it with inertia before it settles back into its own
 * pace. Only the logo under the pointer lifts to its brand colour. It only runs while on screen, and
 * prefers-reduced-motion shows a static, wrapping row instead. The styles are injected below.
 */
type MarqueeLogo = {
  /** Brand name – the accessible name, and the visible label when `labels` is on */
  name: string;
  /** The mark, ideally an <svg> with fill="currentColor" so it follows the muted colour */
  svg?: ReactNode;
  /** An image instead of `svg` (shown grayscale until hovered when `grayscale` is on) */
  src?: string;
  /** Brand colour the mark lifts to on hover, e.g. "#635BFF" – leave out for black marks like Vercel or GitHub */
  color?: string;
  /** Optical size correction, e.g. 0.9 for a heavy round mark – 1 by default */
  scale?: number;
  /** Turns the logo into a link */
  href?: string;
};
type LogoMarqueeProps = {
  logos: MarqueeLogo[];
  /** Pixels per second, independent of the strip's width */
  speed?: number;
  /** Which way the first row runs; a second row runs the other way */
  direction?: "left" | "right";
  /** 1, or 2 for a second row in the opposite direction (the logos are split between the rows) */
  rows?: 1 | 2;
  /** Space between logos in px (smaller on narrow containers) */
  gap?: number;
  /** Ease to a stop while the pointer is over the strip or it has keyboard focus */
  pauseOnHover?: boolean;
  /** Muted, colourless logos that lift to full colour on hover */
  grayscale?: boolean;
  /** Show the brand name under each mark or beside it, like a wordmark */
  labels?: "none" | "below" | "beside";
  /** Accessible name of the strip */
  label?: string;
  className?: string;
};
type Row = {
  logos: MarqueeLogo[];
  /** Run direction: 1 = content moves left, -1 = right */
  dir: 1 | -1;
};
/** Motion state of one row, kept outside React so the loop never re-renders */
type RowState = {
  x: number;
  v: number;
  /** Width of one set, including its trailing gap – the wrap distance */
  w: number;
  drag: null | {
    id: number;
    lastX: number;
    lastT: number;
    moved: number;
    captured: boolean;
  };
  /** Pending nudge (px) to bring a focused logo into view */
  seek: number;
};
/** First letter of a name as a whole grapheme, so "🦊 Fox" gives 🦊 and "Ølafur" gives Ø */
function initial(name: string) {
  const text = name.trim();
  if (!text) return "?";
  const first =
    typeof Intl !== "undefined" && "Segmenter" in Intl
      ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
          .segment(text)
          [Symbol.iterator]()
          .next().value?.segment
      : Array.from(text)[0];
  return (first ?? "?").toLocaleUpperCase();
}
/**
 * The mark: the svg, else the image, else – when there is no visible name next to it – a letter tile, so a logo
 * without artwork (or with an image that fails to load) never leaves an empty gap in the strip.
 */
function Mark({ logo, named }: { logo: MarqueeLogo; named: boolean }) {
  const [failed, setFailed] = useState(false);
  const mark =
    logo.svg ??
    (logo.src && !failed ? (
      <img src={logo.src} alt="" draggable={false} onError={() => setFailed(true)} />
    ) : null);
  if (!mark && named) return null;
  return (
    <span className="ui-lmc__mark" aria-hidden="true">
      {mark ?? <span className="ui-lmc__tile">{initial(logo.name)}</span>}
    </span>
  );
}
const mod = (n: number, m: number) => (m > 0 ? ((n % m) + m) % m : 0);
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
function LogoMarquee({
  logos,
  speed = 40,
  direction = "left",
  rows = 1,
  gap = 56,
  pauseOnHover = true,
  grayscale = true,
  labels = "none",
  label = "Logos of companies using the product",
  className,
}: LogoMarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const tracks = useRef<(HTMLDivElement | null)[]>([]);
  const sets = useRef<(HTMLUListElement | null)[]>([]);
  const views = useRef<(HTMLDivElement | null)[]>([]);
  const state = useRef<RowState[]>([]);
  const hover = useRef(false);
  const focus = useRef(false);
  const [copies, setCopies] = useState<number[]>([]);
  const [reduced, setReduced] = useState(false);
  // Two rows split the logos alternately, so each row shows different brands
  const split: Row[] =
    rows === 2 && logos.length > 1
      ? [
          {
            logos: logos.filter((_, i) => i % 2 === 0),
            dir: direction === "left" ? 1 : -1,
          },
          {
            logos: logos.filter((_, i) => i % 2 === 1),
            dir: direction === "left" ? -1 : 1,
          },
        ]
      : [{ logos, dir: direction === "left" ? 1 : -1 }];
  // Latest props for the loop without restarting it
  const live = useRef({ speed, pauseOnHover, split });
  live.current = { speed, pauseOnHover, split };
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  // Measure every row: one set's width and how many copies cover the viewport plus one wrap
  useEffect(() => {
    if (reduced) return;
    const measure = () => {
      const next = split.map((_, i) => {
        const set = sets.current[i];
        const view = views.current[i];
        if (!set || !view) return 2;
        const w = set.getBoundingClientRect().width;
        const s = (state.current[i] ??= { x: i * w * 0.5, v: 0, w, drag: null, seek: 0 });
        // Keep the same spot within the set when the width changes (container query, font load)
        if (s.w > 0 && w > 0 && s.w !== w) s.x = (s.x / s.w) * w;
        s.w = w;
        return w > 0 ? Math.ceil(view.clientWidth / w) + 1 : 2;
      });
      setCopies((prev) =>
        prev.length === next.length && prev.every((c, i) => c === next[i]) ? prev : next,
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    for (const el of [...sets.current, ...views.current]) if (el) ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, split.length, logos, gap, labels]);
  // The loop: one velocity per row that eases toward its target, so stops and starts are never abrupt
  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;
    let raf = 0;
    let last = 0;
    let visible = false;
    const frame = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const { speed, pauseOnHover, split } = live.current;
      const stopped = pauseOnHover && (hover.current || focus.current);
      split.forEach((row, i) => {
        const s = state.current[i];
        const track = tracks.current[i];
        if (!s || !track || s.w <= 0) return;
        if (!s.drag) {
          const target = stopped ? 0 : speed * row.dir;
          // A fling coasts out; slowing down for hover is a little quicker than winding back up
          const fling = Math.abs(s.v - target) > Math.max(120, speed * 2);
          const tau = fling ? 0.55 : stopped ? 0.32 : 0.7;
          s.v += (target - s.v) * (1 - Math.exp(-dt / tau));
          s.x += s.v * dt;
          if (s.seek) {
            const step = s.seek * (1 - Math.exp(-dt / 0.12));
            s.x += step;
            s.seek = Math.abs(s.seek - step) < 0.5 ? 0 : s.seek - step;
          }
        }
        s.x = mod(s.x, s.w);
        track.style.transform = `translate3d(${-s.x}px, 0, 0)`;
      });
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
  /* ---------- Drag / swipe ---------- */
  const onPointerDown = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current[i];
    if (!s || (e.pointerType === "mouse" && e.button !== 0)) return;
    s.drag = {
      id: e.pointerId,
      lastX: e.clientX,
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
    const dx = e.clientX - d.lastX;
    const dt = Math.max(1, e.timeStamp - d.lastT) / 1000;
    d.moved += Math.abs(dx);
    // Capture only once it is clearly a drag, so plain clicks on links still work
    if (!d.captured && d.moved > 4) {
      d.captured = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.setAttribute("data-dragging", "");
    }
    s.x -= dx;
    // Smoothed release velocity in px/s
    s.v = s.v * 0.6 + (-dx / dt) * 0.4;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };
  const onPointerUp = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current[i];
    const d = s?.drag;
    if (!s || !d || d.id !== e.pointerId) return;
    // A pause before letting go means no fling
    if (e.timeStamp - d.lastT > 80) s.v = 0;
    s.v = clamp(s.v, -2400, 2400);
    s.drag = null;
    e.currentTarget.removeAttribute("data-dragging");
    if (d.captured) {
      // Swallow the click that ends a drag, so a link under the pointer doesn't open
      const view = e.currentTarget;
      const stop = (ev: MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      view.addEventListener("click", stop, { capture: true, once: true });
      setTimeout(() => view.removeEventListener("click", stop, { capture: true }), 0);
    }
  };
  /* ---------- Keyboard: a focused logo is nudged into view ---------- */
  const onFocusItem = (i: number) => (e: React.FocusEvent<HTMLElement>) => {
    const s = state.current[i];
    const view = views.current[i];
    if (reduced || !s || !view) return;
    const v = view.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    const pad = Math.min(96, v.width * 0.15);
    if (r.left < v.left + pad) s.seek = r.left - (v.left + pad);
    else if (r.right > v.right - pad) s.seek = r.right - (v.right - pad);
  };
  const item = (logo: MarqueeLogo, i: number, interactive: boolean, index: number) => {
    const body = (
      <>
        <Mark logo={logo} named={labels !== "none"} />
        {labels !== "none" ? (
          <span className="ui-lmc__name" title={logo.name}>
            {logo.name}
          </span>
        ) : (
          <span className="ui-lmc__sr">{logo.name}</span>
        )}
      </>
    );
    return (
      <li
        // Index in the key too – two logos may share a name
        key={`${index}-${logo.name}`}
        className="ui-lmc__item"
        style={
          { "--ui-lmc-brand": logo.color, "--ui-lmc-scale": logo.scale } as CSSProperties
        }
      >
        {logo.href ? (
          <a
            className="ui-lmc__link"
            href={logo.href}
            draggable={false}
            tabIndex={interactive ? undefined : -1}
            onFocus={interactive ? onFocusItem(i) : undefined}
          >
            {body}
          </a>
        ) : (
          <span className="ui-lmc__link">{body}</span>
        )}
      </li>
    );
  };
  /* ---------- Keyboard: arrows step between linked logos, or scrub a strip without links ---------- */
  const hasLinks = logos.some((l) => l.href);
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const back = e.key === "ArrowLeft";
    if (e.target instanceof HTMLAnchorElement) {
      const list = Array.from(
        e.target.closest("ul")?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [],
      );
      const next = list[list.indexOf(e.target) + (back ? -1 : 1)];
      if (next) {
        e.preventDefault();
        next.focus();
      }
      return;
    }
    if (reduced || e.target !== e.currentTarget) return;
    e.preventDefault();
    for (const s of state.current) if (s) s.seek += back ? -160 : 160;
  };
  // Nothing to show – no empty, labelled region
  if (logos.length === 0) return null;
  const vars = { "--ui-lmc-gap": `${gap}px` } as CSSProperties;
  const cls = ["ui-lmc", className].filter(Boolean).join(" ");
  return (
    <>
      <div
        ref={root}
        className={cls}
        style={vars}
        role="region"
        aria-label={label}
        // Without links the strip itself is one tab stop: focus pauses it and the arrows scrub it
        tabIndex={!hasLinks && !reduced ? 0 : undefined}
        onKeyDown={onKeyDown}
        data-labels={labels}
        data-grayscale={grayscale || undefined}
        data-static={reduced || undefined}
        onPointerEnter={(e) => {
          if (e.pointerType !== "touch") hover.current = true;
        }}
        onPointerLeave={() => (hover.current = false)}
        // Keyboard focus stops the strip; a mouse click that focuses a link does not
        onFocus={(e) => (focus.current = e.target.matches(":focus-visible"))}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null))
            focus.current = false;
        }}
      >
        {reduced ? (
          // Reduced motion: one calm, wrapping row – nothing moves
          <ul className="ui-lmc__wrap">{logos.map((l, k) => item(l, 0, true, k))}</ul>
        ) : (
          split.map((row, i) => (
            <div
              key={i}
              ref={(n) => {
                views.current[i] = n;
              }}
              className="ui-lmc__row"
              onPointerDown={onPointerDown(i)}
              onPointerMove={onPointerMove(i)}
              onPointerUp={onPointerUp(i)}
              onPointerCancel={onPointerUp(i)}
            >
              <div
                ref={(n) => {
                  tracks.current[i] = n;
                }}
                className="ui-lmc__track"
              >
                {Array.from({ length: Math.max(2, copies[i] ?? 2) }, (_, c) => (
                  <ul
                    key={c}
                    ref={
                      c === 0
                        ? (n) => {
                            sets.current[i] = n;
                          }
                        : undefined
                    }
                    className="ui-lmc__set"
                    // Only the first set is read out and reachable by Tab; the copies are decoration
                    aria-hidden={c > 0 || undefined}
                    inert={c > 0 || undefined}
                  >
                    {row.logos.map((l, k) => item(l, i, c === 0, k))}
                  </ul>
                ))}
              </div>
            </div>
          ))
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
var n_demo_clean_DkL6KmVi: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_clean_DkL6KmVi: RecoveredValue = t_jsx_runtime_CTsRTJUX();
function i_demo_clean_DkL6KmVi(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = e.trim();
  return t
    ? (
        (typeof Intl < `u` && `Segmenter` in Intl
          ? new Intl.Segmenter(void 0, {
              granularity: `grapheme`,
            })
              .segment(t)
              [Symbol.iterator]()
              .next().value?.segment
          : (Array.from(t) as RecoveredValue[])[0]) ?? `?`
      ).toLocaleUpperCase()
    : `?`;
}
function ComponentA({ logo, named }: RecoveredValue): RecoveredValue {
  let [a, o]: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useState)(!1),
    s: RecoveredValue =
      logo.svg ??
      (logo.src && !a ? (
        <img
          src={logo.src}
          alt={``}
          draggable={!1}
          onError={(): RecoveredValue => o(!0)}
        />
      ) : null);
  return !s && named ? null : (
    <span className={`ui-lmc__mark`} aria-hidden={`true`}>
      {s ?? <span className={`ui-lmc__tile`}>{i_demo_clean_DkL6KmVi(logo.name)}</span>}
    </span>
  );
}
var o_demo_clean_DkL6KmVi: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => (t > 0 ? ((e % t) + t) % t : 0),
  s_demo_clean_DkL6KmVi: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue => Math.min(n, Math.max(t, e));
function ComponentC({
  logos,
  speed = 40,
  direction = `left`,
  rows = 1,
  gap = 56,
  pauseOnHover = !0,
  grayscale = !0,
  labels = `none`,
  label = `Logos of companies using the product`,
  className,
}: RecoveredValue): RecoveredValue {
  let g: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useRef)(null),
    _: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useRef)([]),
    v: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useRef)([]),
    y: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useRef)([]),
    b: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useRef)([]),
    x: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useRef)(!1),
    S: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useRef)(!1),
    [C, w]: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useState)([]),
    [T, E]: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useState)(!1),
    D: RecoveredValue =
      rows === 2 && logos.length > 1
        ? [
            {
              logos: logos.filter(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => t % 2 == 0,
              ),
              dir: direction === `left` ? 1 : -1,
            },
            {
              logos: logos.filter(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => t % 2 == 1,
              ),
              dir: direction === `left` ? -1 : 1,
            },
          ]
        : [
            {
              logos: logos,
              dir: direction === `left` ? 1 : -1,
            },
          ],
    O: RecoveredValue = (0, n_demo_clean_DkL6KmVi.useRef)({
      speed: speed,
      pauseOnHover: pauseOnHover,
      split: D,
    });
  ((O.current = {
    speed: speed,
    pauseOnHover: pauseOnHover,
    split: D,
  }),
    (0, n_demo_clean_DkL6KmVi.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = window.matchMedia(`(prefers-reduced-motion: reduce)`),
        t: RecoveredValue = (): RecoveredValue => E(e.matches);
      return (
        t(),
        e.addEventListener(`change`, t),
        (): RecoveredValue => e.removeEventListener(`change`, t)
      );
    }, []),
    (0, n_demo_clean_DkL6KmVi.useEffect)((): RecoveredValue => {
      if (T) return;
      let e: RecoveredValue = (): RecoveredValue => {
        let e: RecoveredValue = D.map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
            let n: RecoveredValue = v.current[t],
              r: RecoveredValue = y.current[t];
            if (!n || !r) return 2;
            let i: RecoveredValue = n.getBoundingClientRect().width,
              a: RecoveredValue = (b.current[t] ??= {
                x: t * i * 0.5,
                v: 0,
                w: i,
                drag: null,
                seek: 0,
              });
            return (
              a.w > 0 && i > 0 && a.w !== i && (a.x = (a.x / a.w) * i),
              (a.w = i),
              i > 0 ? Math.ceil(r.clientWidth / i) + 1 : 2
            );
          },
        );
        w(
          (t?: RecoveredValue): RecoveredValue =>
            t.length === e.length &&
            t.every(
              (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => t === e[n],
            )
              ? t
              : e,
        );
      };
      e();
      let t: RecoveredValue = new ResizeObserver(e);
      for (let e of [...v.current, ...y.current]) e && t.observe(e);
      return (): RecoveredValue => t.disconnect();
    }, [T, D.length, logos, gap, labels]),
    (0, n_demo_clean_DkL6KmVi.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = g.current;
      if (T || !e) return;
      let t: RecoveredValue = 0,
        n: RecoveredValue = 0,
        r: RecoveredValue = !1,
        i: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let a: RecoveredValue = n ? Math.min(0.05, (e - n) / 1e3) : 0;
          n = e;
          let { speed: s, pauseOnHover: c, split: l }: RecoveredValue = O.current,
            u: RecoveredValue = c && (x.current || S.current);
          (l.forEach((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
            let n: RecoveredValue = b.current[t],
              r: RecoveredValue = _.current[t];
            if (!(!n || !r || n.w <= 0)) {
              if (!n.drag) {
                let t: RecoveredValue = u ? 0 : s * e.dir,
                  r: RecoveredValue =
                    Math.abs(n.v - t) > Math.max(120, s * 2) ? 0.55 : u ? 0.32 : 0.7;
                if (
                  ((n.v += (t - n.v) * (1 - Math.exp(-a / r))), (n.x += n.v * a), n.seek)
                ) {
                  let e: RecoveredValue = n.seek * (1 - Math.exp(-a / 0.12));
                  ((n.x += e), (n.seek = Math.abs(n.seek - e) < 0.5 ? 0 : n.seek - e));
                }
              }
              ((n.x = o_demo_clean_DkL6KmVi(n.x, n.w)),
                (r.style.transform = `translate3d(${-n.x}px, 0, 0)`));
            }
          }),
            (t = r ? requestAnimationFrame(i) : 0));
        },
        a: RecoveredValue = new IntersectionObserver(
          ([e]: RecoveredValue): RecoveredValue => {
            ((r = e.isIntersecting),
              r && !t && ((n = 0), (t = requestAnimationFrame(i))));
          },
        );
      return (
        a.observe(e),
        (): RecoveredValue => {
          (a.disconnect(), cancelAnimationFrame(t));
        }
      );
    }, [T]));
  let k: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = b.current[e];
        !n ||
          (t.pointerType === `mouse` && t.button !== 0) ||
          ((n.drag = {
            id: t.pointerId,
            lastX: t.clientX,
            lastT: t.timeStamp,
            moved: 0,
            captured: !1,
          }),
          (n.v = 0));
      },
    A: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = b.current[e],
          r: RecoveredValue = n?.drag;
        if (!n || !r || r.id !== t.pointerId) return;
        let i: RecoveredValue = t.clientX - r.lastX,
          a: RecoveredValue = Math.max(1, t.timeStamp - r.lastT) / 1e3;
        ((r.moved += Math.abs(i)),
          !r.captured &&
            r.moved > 4 &&
            ((r.captured = !0),
            t.currentTarget.setPointerCapture(t.pointerId),
            t.currentTarget.setAttribute(`data-dragging`, ``)),
          (n.x -= i),
          (n.v = n.v * 0.6 + (-i / a) * 0.4),
          (r.lastX = t.clientX),
          (r.lastT = t.timeStamp));
      },
    j: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = b.current[e],
          r: RecoveredValue = n?.drag;
        if (
          n &&
          r &&
          r.id === t.pointerId &&
          (t.timeStamp - r.lastT > 80 && (n.v = 0),
          (n.v = s_demo_clean_DkL6KmVi(n.v, -2400, 2400)),
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
    M: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = b.current[e],
          r: RecoveredValue = y.current[e];
        if (T || !n || !r) return;
        let i: RecoveredValue = r.getBoundingClientRect(),
          a: RecoveredValue = t.currentTarget.getBoundingClientRect(),
          o: RecoveredValue = Math.min(96, i.width * 0.15);
        a.left < i.left + o
          ? (n.seek = a.left - (i.left + o))
          : a.right > i.right - o && (n.seek = a.right - (i.right - o));
      },
    N: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
      i?: RecoveredValue,
    ): RecoveredValue => {
      let o: RecoveredValue = (
        <r_demo_clean_DkL6KmVi.Fragment>
          <ComponentA logo={e} named={labels !== `none`} />
          {labels === `none` ? (
            <span className={`ui-lmc__sr`}>{e.name}</span>
          ) : (
            <span className={`ui-lmc__name`} title={e.name}>
              {e.name}
            </span>
          )}
        </r_demo_clean_DkL6KmVi.Fragment>
      );
      return (
        <li
          className={`ui-lmc__item`}
          style={
            {
              "--ui-lmc-brand": e.color,
              "--ui-lmc-scale": e.scale,
            } as RecoveredValue
          }
          children={
            e.href ? (
              <a
                className={`ui-lmc__link`}
                href={e.href}
                draggable={!1}
                tabIndex={n ? void 0 : -1}
                onFocus={n ? M(t) : void 0}
              >
                {o}
              </a>
            ) : (
              <span className={`ui-lmc__link`}>{o}</span>
            )
          }
          key={`${i}-${e.name}`}
        />
      );
    },
    P: RecoveredValue = logos.some((e?: RecoveredValue): RecoveredValue => e.href),
    F: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.key !== `ArrowLeft` && e.key !== `ArrowRight`) return;
      let t: RecoveredValue = e.key === `ArrowLeft`;
      if (e.target instanceof HTMLAnchorElement) {
        let n: RecoveredValue = Array.from(
            e.target.closest(`ul`)?.querySelectorAll(`a[href]`) ?? [],
          ) as RecoveredValue[],
          r: RecoveredValue = n[n.indexOf(e.target) + (t ? -1 : 1)];
        r && (e.preventDefault(), r.focus());
        return;
      }
      if (!(T || e.target !== e.currentTarget)) {
        e.preventDefault();
        for (let e of b.current) e && (e.seek += t ? -160 : 160);
      }
    };
  if (logos.length === 0) return null;
  let I: RecoveredValue = {
      "--ui-lmc-gap": `${gap}px`,
    },
    L: RecoveredValue = [`ui-lmc`, className].filter(Boolean).join(` `);
  return (
    <r_demo_clean_DkL6KmVi.Fragment>
      <div
        ref={g as RecoveredValue}
        className={L}
        style={I as RecoveredValue}
        role={`region`}
        aria-label={label}
        tabIndex={!P && !T ? 0 : void 0}
        onKeyDown={F}
        data-labels={labels}
        data-grayscale={grayscale || void 0}
        data-static={T || void 0}
        onPointerEnter={(e?: RecoveredValue): RecoveredValue => {
          e.pointerType !== `touch` && (x.current = !0);
        }}
        onPointerLeave={(): RecoveredValue => (x.current = !1)}
        onFocus={(e?: RecoveredValue): RecoveredValue =>
          (S.current = e.target.matches(`:focus-visible`))
        }
        onBlur={(e?: RecoveredValue): RecoveredValue => {
          e.currentTarget.contains(e.relatedTarget) || (S.current = !1);
        }}
      >
        {T ? (
          <ul className={`ui-lmc__wrap`}>
            {logos.map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => N(e, 0, !0, t),
            )}
          </ul>
        ) : (
          D.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <div
                ref={
                  ((e?: RecoveredValue): RecoveredValue => {
                    y.current[t] = e;
                  }) as RecoveredValue
                }
                className={`ui-lmc__row`}
                onPointerDown={k(t)}
                onPointerMove={A(t)}
                onPointerUp={j(t)}
                onPointerCancel={j(t)}
                children={
                  <div
                    ref={
                      ((e?: RecoveredValue): RecoveredValue => {
                        _.current[t] = e;
                      }) as RecoveredValue
                    }
                    className={`ui-lmc__track`}
                  >
                    {
                      Array.from(
                        {
                          length: Math.max(2, C[t] ?? 2),
                        },
                        (n?: RecoveredValue, i?: RecoveredValue): RecoveredValue => (
                          <ul
                            ref={
                              (i === 0
                                ? (e?: RecoveredValue): RecoveredValue => {
                                    v.current[t] = e;
                                  }
                                : void 0) as RecoveredValue
                            }
                            className={`ui-lmc__set`}
                            aria-hidden={i > 0 || void 0}
                            inert={i > 0 || void 0}
                            children={e.logos.map(
                              (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
                                N(e, t, i === 0, n),
                            )}
                            key={i}
                          />
                        ),
                      ) as RecoveredValue[]
                    }
                  </div>
                }
                key={t}
              />
            ),
          )
        )}
      </div>
    </r_demo_clean_DkL6KmVi.Fragment>
  );
}
var u_demo_clean_DkL6KmVi: RecoveredValue = [
  {
    name: `Vercel`,
    scale: 0.86,
    svg: (
      <svg viewBox={`0 0 24 24`} fill={`currentColor`}>
        <path d={`m12 1.608 12 20.784H0Z`} />
      </svg>
    ),
  },
  {
    name: `Linear`,
    color: `#5E6AD2`,
    svg: (
      <svg viewBox={`0 0 24 24`} fill={`currentColor`}>
        <path
          d={`M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z`}
        />
      </svg>
    ),
  },
  {
    name: `Notion`,
    svg: (
      <svg viewBox={`0 0 24 24`} fill={`currentColor`}>
        <path
          d={`M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z`}
        />
      </svg>
    ),
  },
  {
    name: `Stripe`,
    color: `#635BFF`,
    scale: 0.96,
    svg: (
      <svg viewBox={`0 0 24 24`} fill={`currentColor`}>
        <path
          d={`M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z`}
        />
      </svg>
    ),
  },
  {
    name: `Figma`,
    color: `#F24E1E`,
    svg: (
      <svg viewBox={`0 0 24 24`} fill={`currentColor`}>
        <path
          d={`M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z`}
        />
      </svg>
    ),
  },
  {
    name: `Slack`,
    color: `#E01E5A`,
    scale: 0.92,
    svg: (
      <svg
        viewBox={`0 0 2447.6 2452.5`}
        fill={`currentColor`}
        fillRule={`evenodd`}
        clipRule={`evenodd`}
      >
        <path
          d={`m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z`}
        />
        <path
          d={`m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z`}
        />
        <path
          d={`m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z`}
        />
        <path
          d={`m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0`}
        />
      </svg>
    ),
  },
  {
    name: `GitHub`,
    scale: 0.96,
    svg: (
      <svg viewBox={`0 0 24 24`} fill={`currentColor`}>
        <path
          d={`M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12`}
        />
      </svg>
    ),
  },
  {
    name: `Shopify`,
    color: `#1e8a4f`,
    svg: (
      <svg viewBox={`0 0 24 24`} fill={`currentColor`}>
        <path
          d={`M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z`}
        />
      </svg>
    ),
  },
  {
    name: `Spotify`,
    color: `#3fb670`,
    scale: 0.94,
    svg: (
      <svg viewBox={`0 0 24 24`} fill={`currentColor`}>
        <path
          d={`M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z`}
        />
      </svg>
    ),
  },
  {
    name: `Airbnb`,
    color: `#FF5A5F`,
    svg: (
      <svg viewBox={`0 0 1991.3 2143.2`} fill={`currentColor`}>
        <path
          d={`m1851.6 1735.6c-15 111.6-90.1 208.1-195.2 251-51.5 21.4-107.3 27.9-163.1 21.4-53.6-6.4-107.3-23.6-163-55.7-77.2-43-154.5-109.4-244.6-208.1 141.6-173.8 227.4-332.5 259.6-474.1 15-66.5 17.2-126.6 10.7-182.4-8.6-53.6-27.9-103-57.9-145.9-66.5-96.5-178.1-152.3-302.5-152.3s-236 57.9-302.5 152.3c-30 42.9-49.3 92.3-57.9 145.9-8.6 55.8-6.4 118 10.7 182.4 32.2 141.6 120.1 302.5 259.6 476.2-88 98.7-167.3 165.2-244.6 208.1-55.8 32.2-109.4 49.4-163 55.8-55.3 6.2-111.2-1.2-163-21.4-105.1-42.9-180.2-139.5-195.2-251-6.4-53.6-2.1-107.2 19.3-167.3 6.4-21.5 17.2-42.9 27.9-68.6 15-34.3 32.2-70.8 49.3-107.3l2.2-4.3c148-319.7 306.8-645.8 472-963.3l6.4-12.9c17.2-32.1 34.3-66.5 51.5-98.7 17.2-34.3 36.5-66.5 60.1-94.4 45.1-51.5 105.1-79.4 171.6-79.4s126.6 27.9 171.6 79.4c23.6 27.9 42.9 60.1 60.1 94.4 17.2 32.2 34.3 66.5 51.5 98.6l6.5 12.9c163 319.6 321.8 645.7 469.8 965.4v2.1c17.2 34.3 32.2 73 49.3 107.3 10.7 25.8 21.5 47.2 27.9 68.6 17.1 55.9 23.5 109.5 14.9 165.3zm-856-100.9c-115.8-145.9-190.9-283.2-216.7-399-10.7-49.4-12.9-92.3-6.4-130.9 4.3-34.3 17.2-64.4 34.3-90.1 40.8-57.9 109.4-94.4 188.8-94.4s150.2 34.4 188.8 94.4c17.2 25.8 30 55.8 34.3 90.1 6.4 38.6 4.3 83.7-6.4 130.9-25.7 113.7-100.8 251-216.7 399zm967.6-111.5c-10.7-25.7-21.5-53.6-32.2-77.2-17.2-38.6-34.3-75.1-49.4-109.4l-2.1-2.1c-148-321.8-306.8-647.9-474.1-969.7l-6.4-12.9c-17.2-32.2-34.3-66.5-51.5-100.8-21.5-38.6-42.9-79.4-77.2-118-68.7-85.9-167.4-133.1-272.5-133.1-107.3 0-203.8 47.2-274.7 128.7-32.2 38.6-55.8 79.4-77.2 118-17.2 34.3-34.3 68.6-51.5 100.8l-6.4 12.8c-165.2 321.8-326.1 647.9-474.1 969.7l-2.1 4.3c-15 34.3-32.2 70.8-49.4 109.4-11.5 25.4-22.2 51.2-32.2 77.2-27.9 79.4-36.5 154.5-25.8 231.7 23.6 160.9 130.9 296.1 278.9 356.1 55.8 23.6 113.7 34.3 173.8 34.3 17.2 0 38.6-2.1 55.8-4.3 70.8-8.6 143.7-32.1 214.5-72.9 88-49.3 171.6-120.1 266-223.1 94.4 103 180.2 173.8 266 223.1 70.8 40.8 143.7 64.3 214.5 72.9 17.2 2.2 38.6 4.3 55.8 4.3 60.1 0 120.1-10.7 173.8-34.3 150.2-60.1 255.3-197.4 278.9-356.1 17.2-75 8.6-150-19.2-229.4z`}
        />
      </svg>
    ),
  },
];
function Runtime(): RecoveredValue {
  return (
    <div className={`logo-marquee-demo logo-marquee-demo--clean`}>
      <p className={`logo-marquee-demo__caption`}>{`Trusted by teams at`}</p>
      <ComponentC
        logos={u_demo_clean_DkL6KmVi}
        rows={2}
        speed={36}
        labels={`beside`}
        label={`Companies that use the product`}
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
export { LogoMarquee };
export type { MarqueeLogo };
export type { LogoMarqueeProps };
