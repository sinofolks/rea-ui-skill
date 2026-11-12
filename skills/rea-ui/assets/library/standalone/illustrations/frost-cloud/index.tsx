"use client";

import "./FrostCloud.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import { type ReactElement, useEffect, useId, useRef } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Frost Cloud – a little cloud with eyes on a colored sky, in component logic and public types.
 * Frosted white and a little see-through, the sky shining through softly towards the bottom, eyes cut out of it.
 * It floats and breathes, turns a little to look left and right, blinks now and then,
 * follows the pointer with its eyes and gives a squishy bounce and a wink when clicked.
 * Everything moves on soft springs; it runs only while on screen and keeps still with prefers-reduced-motion.
 */
type FrostCloudProps = {
  /** Fill the whole illustration with the sky gradient; false leaves the cloud on a transparent background */
  background?: boolean;
  /** "blue": a blue-to-cyan sky · "orange": a red-to-orange sky */
  color?: "blue" | "orange";
  /** The eyes follow the pointer while it's over the illustration */
  followPointer?: boolean;
  className?: string;
  /** Accessible description of the illustration */
  label?: string;
};
/* The cloud: puffs that melt into one shape through a soft "goo" filter */
const PUFFS = [
  { cx: 115, cy: 93, r: 43 }, // the big puff on top
  { cx: 163, cy: 111, r: 39 }, // right
  { cx: 156, cy: 155, r: 31 }, // bottom right
  { cx: 107, cy: 155, r: 35 }, // bottom
  { cx: 72, cy: 126, r: 34 }, // left
];
/** Fills the middle between the puffs */
const CORE = { x: 80, y: 100, width: 80, height: 65 };
/** Two wide pills, close together, a little below the middle */
const EYES = { y: 106, w: 18, h: 31, left: 96.5, right: 127.5 };
const CX = 120;
const CY = 120;
const BOTTOM = 180;
/** Idle glances: straight, left, right, up and to the side, down and to the side */
const GLANCES = [
  { x: 0, y: 0 },
  { x: -1, y: 0.05 },
  { x: 1, y: -0.05 },
  { x: 0, y: 0 },
  { x: 0.65, y: -0.55 },
  { x: -0.7, y: 0.35 },
];
const about = (x: number, y: number, t: string) =>
  `translate(${x} ${y}) ${t} translate(${-x} ${-y})`;
/** A gradient stop whose color comes from a CSS variable, so the palette can change */
const Stop = ({
  offset,
  color,
  opacity,
}: {
  offset: number;
  color: string;
  opacity?: number;
}) => (
  <stop
    offset={offset}
    style={{ stopColor: `var(--ui-fc-${color})`, stopOpacity: opacity }}
  />
);
function FrostCloud({
  background = true,
  color = "blue",
  followPointer = true,
  className,
  label = "A frosted white cloud with eyes that floats, looks around and blinks",
}: FrostCloudProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (name: string) => `fc${uid}-${name}`;
  const root = useRef<HTMLDivElement>(null);
  const floatRef = useRef<SVGGElement>(null);
  const turnRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const leftEye = useRef<SVGGElement>(null);
  const rightEye = useRef<SVGGElement>(null);
  const shineRef = useRef<SVGEllipseElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const look = { x: 0, y: 0, vx: 0, vy: 0 };
    const target = { x: 0, y: 0 };
    const squish = { p: 0, v: 0 }; // click bounce
    let pointer = false;
    let nextGlance = 1.2;
    let nextBlink = 1.8;
    let blinkAt = -1;
    let blinkTwice = false;
    let winkAt = -1;
    let frame = 0;
    let last = 0;
    let time = 0;
    const blinkScale = (since: number, length = 0.16) =>
      since < 0 || since > length ? 1 : 1 - 0.9 * Math.sin((since / length) * Math.PI);
    const draw = () => {
      const float = still ? 0 : Math.sin(time * 1.1) * 5;
      const breathe = still ? 0 : Math.sin(time * 1.1 + Math.PI / 2) * 0.012;
      const sy = 1 + breathe - squish.p * 0.12;
      const sx = 1 - breathe + squish.p * 0.1;
      floatRef.current?.setAttribute(
        "transform",
        `translate(0 ${float.toFixed(2)}) ${about(CX, BOTTOM, `scale(${sx.toFixed(4)} ${sy.toFixed(4)})`)}`,
      );
      // Turning: the body shifts and tilts a little, the eyes move further, the shine slides the other way
      turnRef.current?.setAttribute(
        "transform",
        `translate(${(look.x * 4).toFixed(2)} ${(look.y * 2).toFixed(2)}) ${about(CX, CY, `rotate(${(look.x * 2.5).toFixed(2)}) scale(${(1 - Math.abs(look.x) * 0.025).toFixed(4)} 1)`)}`,
      );
      eyesRef.current?.setAttribute(
        "transform",
        `translate(${(look.x * 12).toFixed(2)} ${(look.y * 7).toFixed(2)})`,
      );
      shineRef.current?.setAttribute(
        "transform",
        `translate(${(-look.x * 7).toFixed(2)} ${(-look.y * 3).toFixed(2)})`,
      );
      const both =
        blinkAt < 0
          ? 1
          : Math.min(
              blinkScale(time - blinkAt),
              blinkTwice ? blinkScale(time - blinkAt - 0.26) : 1,
            );
      const wink = blinkScale(time - winkAt, 0.34);
      const eyeY = EYES.y + EYES.h / 2;
      leftEye.current?.setAttribute(
        "transform",
        about(EYES.left + EYES.w / 2, eyeY, `scale(1 ${both.toFixed(3)})`),
      );
      rightEye.current?.setAttribute(
        "transform",
        about(
          EYES.right + EYES.w / 2,
          eyeY,
          `scale(1 ${Math.min(both, wink).toFixed(3)})`,
        ),
      );
      // The shadow shrinks and fades as the cloud rises
      const lift = (float + 5) / 10;
      shadowRef.current?.setAttribute(
        "transform",
        about(CX, 210, `scale(${(1 - lift * 0.12).toFixed(3)} 1)`),
      );
      shadowRef.current?.setAttribute("opacity", (0.34 - lift * 0.1).toFixed(3));
    };
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      time += dt;
      if (!pointer && time > nextGlance) {
        const g = GLANCES[Math.floor(Math.random() * GLANCES.length)];
        target.x = g.x;
        target.y = g.y;
        nextGlance = time + 1.4 + Math.random() * 2.2;
      }
      if (time > nextBlink) {
        blinkAt = time;
        blinkTwice = Math.random() < 0.25;
        nextBlink = time + 2.4 + Math.random() * 3;
      }
      // Springs: the gaze settles softly, the bounce wobbles out
      look.vx += ((target.x - look.x) * 70 - look.vx * 13) * dt;
      look.vy += ((target.y - look.y) * 70 - look.vy * 13) * dt;
      look.x += look.vx * dt;
      look.y += look.vy * dt;
      squish.v += (-squish.p * 220 - squish.v * 9) * dt;
      squish.p += squish.v * dt;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (frame || still) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      if (!followPointer) return;
      const r = el.getBoundingClientRect();
      pointer = true;
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2.4));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2.4));
    };
    const onLeave = () => {
      pointer = false;
      target.x = 0;
      target.y = 0;
      nextGlance = time + 1.2;
    };
    const onDown = () => {
      squish.p = 0.9;
      squish.v = 0;
      winkAt = time + 0.12;
      if (still) {
        start();
        window.setTimeout(stop, 1200);
      }
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    draw();
    return () => {
      stop();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
    };
  }, [followPointer]);
  const puffs = PUFFS.map((p, i) => <circle key={i} {...p} />);
  const eye = (x: number, ref: typeof leftEye, side: string) => {
    const pill = { x, y: EYES.y, width: EYES.w, height: EYES.h, rx: EYES.w / 2 };
    return (
      <g ref={ref}>
        {/* A soft shade around the hole, then the sky color inside with a slightly darker inner edge at the top */}
        <rect
          {...pill}
          x={x - 1.5}
          y={EYES.y - 1}
          width={EYES.w + 3}
          height={EYES.h + 3}
          rx={EYES.w / 2 + 1.5}
          className="ui-fc__eye-drop"
          filter={`url(#${id("edge")})`}
        />
        <rect {...pill} fill={`url(#${id("hole")})`} />
        <clipPath id={id(`clip-${side}`)}>
          <rect {...pill} />
        </clipPath>
        <rect
          {...pill}
          y={EYES.y + 2.5}
          className="ui-fc__eye-shade"
          fill="none"
          strokeWidth="5"
          filter={`url(#${id("edge")})`}
          clipPath={`url(#${id(`clip-${side}`)})`}
        />
      </g>
    );
  };
  return (
    <div
      ref={root}
      className={["ui-fc", className].filter(Boolean).join(" ")}
      data-bg={background || undefined}
      data-color={color}
      role="img"
      aria-label={label}
    >
      {/* React 19 hoists this into <head> once, no matter how many clouds render */}

      <svg viewBox="0 0 240 240" aria-hidden="true">
        <defs>
          {/* Blur, then sharpen the edge again: the puffs melt into one soft cloud */}
          <filter
            id={id("goo")}
            x="0"
            y="0"
            width="240"
            height="240"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="3.5" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12" />
          </filter>
          <filter
            id={id("soft")}
            x="0"
            y="0"
            width="240"
            height="240"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter
            id={id("halo")}
            x="0"
            y="0"
            width="240"
            height="240"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter
            id={id("edge")}
            x="0"
            y="0"
            width="240"
            height="240"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter
            id={id("shade")}
            x="0"
            y="0"
            width="240"
            height="240"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <g id={id("shape")} filter={`url(#${id("goo")})`}>
            {puffs}
            <rect {...CORE} />
          </g>
          <mask
            id={id("mask")}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="240"
            height="240"
          >
            <use href={`#${id("shape")}`} fill="#fff" />
          </mask>
          <linearGradient
            id={id("frost")}
            x1="0"
            y1="50"
            x2="0"
            y2="192"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0} color="white" />
            <Stop offset={1} color="frost" opacity={0.97} />
          </linearGradient>
          <linearGradient id={id("hole")} x1="0" y1="0" x2="0" y2="1">
            <Stop offset={0} color="hole-1" />
            <Stop offset={1} color="hole-2" />
          </linearGradient>
        </defs>

        <ellipse
          ref={shadowRef}
          className="ui-fc__shadow"
          cx={CX}
          cy="210"
          rx="54"
          ry="7"
          filter={`url(#${id("shade")})`}
        />

        <g ref={floatRef}>
          <g ref={turnRef}>
            {/* A soft halo around the cloud, and a fine edge right around it that keeps it crisp on white */}
            <use
              href={`#${id("shape")}`}
              className="ui-fc__halo"
              filter={`url(#${id("halo")})`}
            />
            <use
              href={`#${id("shape")}`}
              className="ui-fc__edge"
              filter={`url(#${id("edge")})`}
            />
            <g mask={`url(#${id("mask")})`}>
              <rect width="240" height="240" fill={`url(#${id("frost")})`} />
              {/* The sky shines through softly towards the bottom left; the edge stays bright white all around */}
              <g
                filter={`url(#${id("soft")})`}
                className="ui-fc__tint"
                transform={`translate(-6 18) ${about(CX, CY, "scale(0.84 0.78)")}`}
              >
                {puffs}
                <rect {...CORE} />
              </g>
              <ellipse
                ref={shineRef}
                cx="108"
                cy="78"
                rx="34"
                ry="14"
                fill="#fff"
                opacity="0.75"
                filter={`url(#${id("shade")})`}
              />
            </g>
            <g ref={eyesRef}>
              {eye(EYES.left, leftEye, "l")}
              {eye(EYES.right, rightEye, "r")}
            </g>
          </g>
        </g>
      </svg>
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
var n_demo_CGdNq_NO: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_CGdNq_NO: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_CGdNq_NO: RecoveredValue = [
    {
      cx: 115,
      cy: 93,
      r: 43,
    },
    {
      cx: 163,
      cy: 111,
      r: 39,
    },
    {
      cx: 156,
      cy: 155,
      r: 31,
    },
    {
      cx: 107,
      cy: 155,
      r: 35,
    },
    {
      cx: 72,
      cy: 126,
      r: 34,
    },
  ],
  a_demo_CGdNq_NO: RecoveredValue = {
    x: 80,
    y: 100,
    width: 80,
    height: 65,
  },
  o: RecoveredValue = {
    y: 106,
    w: 18,
    h: 31,
    left: 96.5,
    right: 127.5,
  },
  s: RecoveredValue = 120,
  c: RecoveredValue = 120,
  l: RecoveredValue = 180,
  u_demo_CGdNq_NO: RecoveredValue = [
    {
      x: 0,
      y: 0,
    },
    {
      x: -1,
      y: 0.05,
    },
    {
      x: 1,
      y: -0.05,
    },
    {
      x: 0,
      y: 0,
    },
    {
      x: 0.65,
      y: -0.55,
    },
    {
      x: -0.7,
      y: 0.35,
    },
  ],
  d: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue => `translate(${e} ${t}) ${n} translate(${-e} ${-t})`,
  ComponentF: RecoveredValue = ({
    offset,
    color,
    opacity,
  }: RecoveredValue): RecoveredValue => (
    <stop
      offset={offset}
      style={
        {
          stopColor: `var(--ui-fc-${color})`,
          stopOpacity: opacity,
        } as RecoveredValue
      }
    />
  );
function ComponentP({
  background = !0,
  color = `blue`,
  followPointer = !0,
  className,
  label = `A frosted white cloud with eyes that floats, looks around and blinks`,
}: RecoveredValue): RecoveredValue {
  let _: RecoveredValue = (0, n_demo_CGdNq_NO.useId)().replace(/[^a-zA-Z0-9_-]/g, ``),
    v: RecoveredValue = (e?: RecoveredValue): RecoveredValue => `fc${_}-${e}`,
    y: RecoveredValue = (0, n_demo_CGdNq_NO.useRef)(null),
    b: RecoveredValue = (0, n_demo_CGdNq_NO.useRef)(null),
    x: RecoveredValue = (0, n_demo_CGdNq_NO.useRef)(null),
    S: RecoveredValue = (0, n_demo_CGdNq_NO.useRef)(null),
    C: RecoveredValue = (0, n_demo_CGdNq_NO.useRef)(null),
    w: RecoveredValue = (0, n_demo_CGdNq_NO.useRef)(null),
    T: RecoveredValue = (0, n_demo_CGdNq_NO.useRef)(null),
    E: RecoveredValue = (0, n_demo_CGdNq_NO.useRef)(null);
  (0, n_demo_CGdNq_NO.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = y.current;
    if (!e) return;
    let t: RecoveredValue = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
      n: RecoveredValue = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      },
      r: RecoveredValue = {
        x: 0,
        y: 0,
      },
      i: RecoveredValue = {
        p: 0,
        v: 0,
      },
      a: RecoveredValue = !1,
      f: RecoveredValue = 1.2,
      m: RecoveredValue = 1.8,
      h: RecoveredValue = -1,
      g: RecoveredValue = !1,
      _: RecoveredValue = -1,
      v: RecoveredValue = 0,
      D: RecoveredValue = 0,
      O: RecoveredValue = 0,
      k: RecoveredValue = (
        e?: RecoveredValue,
        t: RecoveredValue = 0.16,
      ): RecoveredValue => (e < 0 || e > t ? 1 : 1 - 0.9 * Math.sin((e / t) * Math.PI)),
      A: RecoveredValue = (): RecoveredValue => {
        let e: RecoveredValue = t ? 0 : Math.sin(O * 1.1) * 5,
          r: RecoveredValue = t ? 0 : Math.sin(O * 1.1 + Math.PI / 2) * 0.012,
          a: RecoveredValue = 1 + r - i.p * 0.12,
          u: RecoveredValue = 1 - r + i.p * 0.1;
        (b.current?.setAttribute(
          `transform`,
          `translate(0 ${e.toFixed(2)}) ${d(s, l, `scale(${u.toFixed(4)} ${a.toFixed(4)})`)}`,
        ),
          x.current?.setAttribute(
            `transform`,
            `translate(${(n.x * 4).toFixed(2)} ${(n.y * 2).toFixed(2)}) ${d(s, c, `rotate(${(n.x * 2.5).toFixed(2)}) scale(${(1 - Math.abs(n.x) * 0.025).toFixed(4)} 1)`)}`,
          ),
          S.current?.setAttribute(
            `transform`,
            `translate(${(n.x * 12).toFixed(2)} ${(n.y * 7).toFixed(2)})`,
          ),
          T.current?.setAttribute(
            `transform`,
            `translate(${(-n.x * 7).toFixed(2)} ${(-n.y * 3).toFixed(2)})`,
          ));
        let f: RecoveredValue = h < 0 ? 1 : Math.min(k(O - h), g ? k(O - h - 0.26) : 1),
          p: RecoveredValue = k(O - _, 0.34),
          m: RecoveredValue = o.y + o.h / 2;
        (C.current?.setAttribute(
          `transform`,
          d(o.left + o.w / 2, m, `scale(1 ${f.toFixed(3)})`),
        ),
          w.current?.setAttribute(
            `transform`,
            d(o.right + o.w / 2, m, `scale(1 ${Math.min(f, p).toFixed(3)})`),
          ));
        let v: RecoveredValue = (e + 5) / 10;
        (E.current?.setAttribute(
          `transform`,
          d(s, 210, `scale(${(1 - v * 0.12).toFixed(3)} 1)`),
        ),
          E.current?.setAttribute(`opacity`, (0.34 - v * 0.1).toFixed(3)));
      },
      j: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = Math.min(0.05, (e - (D || e)) / 1e3);
        if (((D = e), (O += t), !a && O > f)) {
          let e: RecoveredValue =
            u_demo_CGdNq_NO[Math.floor(Math.random() * u_demo_CGdNq_NO.length)];
          ((r.x = e.x), (r.y = e.y), (f = O + 1.4 + Math.random() * 2.2));
        }
        (O > m &&
          ((h = O), (g = Math.random() < 0.25), (m = O + 2.4 + Math.random() * 3)),
          (n.vx += ((r.x - n.x) * 70 - n.vx * 13) * t),
          (n.vy += ((r.y - n.y) * 70 - n.vy * 13) * t),
          (n.x += n.vx * t),
          (n.y += n.vy * t),
          (i.v += (-i.p * 220 - i.v * 9) * t),
          (i.p += i.v * t),
          A(),
          (v = requestAnimationFrame(j)));
      },
      M: RecoveredValue = (): RecoveredValue => {
        v || t || ((D = 0), (v = requestAnimationFrame(j)));
      },
      N: RecoveredValue = (): RecoveredValue => {
        (cancelAnimationFrame(v), (v = 0));
      },
      P: RecoveredValue = new IntersectionObserver(
        ([e]: RecoveredValue): RecoveredValue => (e.isIntersecting ? M() : N()),
      );
    P.observe(e);
    let F: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
        if (!followPointer) return;
        let n: RecoveredValue = e.getBoundingClientRect();
        ((a = !0),
          (r.x = Math.max(-1, Math.min(1, ((t.clientX - n.left) / n.width - 0.5) * 2.4))),
          (r.y = Math.max(
            -1,
            Math.min(1, ((t.clientY - n.top) / n.height - 0.5) * 2.4),
          )));
      },
      I: RecoveredValue = (): RecoveredValue => {
        ((a = !1), (r.x = 0), (r.y = 0), (f = O + 1.2));
      },
      L: RecoveredValue = (): RecoveredValue => {
        ((i.p = 0.9), (i.v = 0), (_ = O + 0.12), t && (M(), window.setTimeout(N, 1200)));
      };
    return (
      e.addEventListener(`pointermove`, F),
      e.addEventListener(`pointerleave`, I),
      e.addEventListener(`pointerdown`, L),
      A(),
      (): RecoveredValue => {
        (N(),
          P.disconnect(),
          e.removeEventListener(`pointermove`, F),
          e.removeEventListener(`pointerleave`, I),
          e.removeEventListener(`pointerdown`, L));
      }
    );
  }, [followPointer]);
  let D: RecoveredValue = i_demo_CGdNq_NO.map(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        ((
          _Component?: RecoveredValue,
          _props?: RecoveredValue,
          _key?: RecoveredValue,
        ): RecoveredValue => <_Component key={_key} {..._props} />)(
          `circle`,
          {
            ...e,
          },
          t,
        ),
    ),
    O: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
    ): RecoveredValue => {
      let i: RecoveredValue = {
        x: e,
        y: o.y,
        width: o.w,
        height: o.h,
        rx: o.w / 2,
      };
      return (
        <g ref={t as RecoveredValue}>
          <rect
            {...i}
            x={e - 1.5}
            y={o.y - 1}
            width={o.w + 3}
            height={o.h + 3}
            rx={o.w / 2 + 1.5}
            className={`ui-fc__eye-drop`}
            filter={`url(#${v(`edge`)})`}
          />
          <rect {...i} fill={`url(#${v(`hole`)})`} />
          <clipPath id={v(`clip-${n}`)}>
            <rect {...i} />
          </clipPath>
          <rect
            {...i}
            y={o.y + 2.5}
            className={`ui-fc__eye-shade`}
            fill={`none`}
            strokeWidth={`5`}
            filter={`url(#${v(`edge`)})`}
            clipPath={`url(#${v(`clip-${n}`)})`}
          />
        </g>
      );
    };
  return (
    <div
      ref={y as RecoveredValue}
      className={[`ui-fc`, className].filter(Boolean).join(` `)}
      data-bg={background || void 0}
      data-color={color}
      role={`img`}
      aria-label={label}
    >
      <svg viewBox={`0 0 240 240`} aria-hidden={`true`}>
        <defs>
          <filter
            id={v(`goo`)}
            x={`0`}
            y={`0`}
            width={`240`}
            height={`240`}
            filterUnits={`userSpaceOnUse`}
          >
            <feGaussianBlur stdDeviation={`3.5`} />
            <feColorMatrix values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12`} />
          </filter>
          <filter
            id={v(`soft`)}
            x={`0`}
            y={`0`}
            width={`240`}
            height={`240`}
            filterUnits={`userSpaceOnUse`}
          >
            <feGaussianBlur stdDeviation={`12`} />
          </filter>
          <filter
            id={v(`halo`)}
            x={`0`}
            y={`0`}
            width={`240`}
            height={`240`}
            filterUnits={`userSpaceOnUse`}
          >
            <feGaussianBlur stdDeviation={`9`} />
          </filter>
          <filter
            id={v(`edge`)}
            x={`0`}
            y={`0`}
            width={`240`}
            height={`240`}
            filterUnits={`userSpaceOnUse`}
          >
            <feGaussianBlur stdDeviation={`1.6`} />
          </filter>
          <filter
            id={v(`shade`)}
            x={`0`}
            y={`0`}
            width={`240`}
            height={`240`}
            filterUnits={`userSpaceOnUse`}
          >
            <feGaussianBlur stdDeviation={`5`} />
          </filter>
          <g id={v(`shape`)} filter={`url(#${v(`goo`)})`}>
            {D}
            <rect {...a_demo_CGdNq_NO} />
          </g>
          <mask
            id={v(`mask`)}
            maskUnits={`userSpaceOnUse`}
            x={`0`}
            y={`0`}
            width={`240`}
            height={`240`}
          >
            <use href={`#${v(`shape`)}`} fill={`#fff`} />
          </mask>
          <linearGradient
            id={v(`frost`)}
            x1={`0`}
            y1={`50`}
            x2={`0`}
            y2={`192`}
            gradientUnits={`userSpaceOnUse`}
          >
            <ComponentF offset={0} color={`white`} />
            <ComponentF offset={1} color={`frost`} opacity={0.97} />
          </linearGradient>
          <linearGradient id={v(`hole`)} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
            <ComponentF offset={0} color={`hole-1`} />
            <ComponentF offset={1} color={`hole-2`} />
          </linearGradient>
        </defs>
        <ellipse
          ref={E as RecoveredValue}
          className={`ui-fc__shadow`}
          cx={s}
          cy={`210`}
          rx={`54`}
          ry={`7`}
          filter={`url(#${v(`shade`)})`}
        />
        <g ref={b as RecoveredValue}>
          <g ref={x as RecoveredValue}>
            <use
              href={`#${v(`shape`)}`}
              className={`ui-fc__halo`}
              filter={`url(#${v(`halo`)})`}
            />
            <use
              href={`#${v(`shape`)}`}
              className={`ui-fc__edge`}
              filter={`url(#${v(`edge`)})`}
            />
            <g mask={`url(#${v(`mask`)})`}>
              <rect width={`240`} height={`240`} fill={`url(#${v(`frost`)})`} />
              <g
                filter={`url(#${v(`soft`)})`}
                className={`ui-fc__tint`}
                transform={`translate(-6 18) ${d(s, c, `scale(0.84 0.78)`)}`}
              >
                {D}
                <rect {...a_demo_CGdNq_NO} />
              </g>
              <ellipse
                ref={T as RecoveredValue}
                cx={`108`}
                cy={`78`}
                rx={`34`}
                ry={`14`}
                fill={`#fff`}
                opacity={`0.75`}
                filter={`url(#${v(`shade`)})`}
              />
            </g>
            <g ref={S as RecoveredValue}>
              {O(o.left, C, `l`)}
              {O(o.right, w, `r`)}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
function Runtime(): RecoveredValue {
  return (
    <div className={`frost-cloud-demo`}>
      <ComponentP />
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
export { FrostCloud };
export type { FrostCloudProps };
