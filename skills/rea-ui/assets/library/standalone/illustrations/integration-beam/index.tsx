"use client";

import "./IntegrationBeam.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import {
  type ReactElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Integration Beam – an animated product scene, in component logic and public types.
 * Your product sits in the middle, three tools on each side, joined by curved beams. In sync cycles,
 * soft light pulses travel from the tools on the left into the product and on out to the tools on the
 * right; every arrival makes the target glow. Hover a tool to bring its beam forward, click it to
 * pause it. The beams are measured from the real tile positions, so the scene reflows with its
 * container – on narrow widths the tools stack above and below and the curves morph into place.
 */
type BeamTool = {
  /** Shown in the tooltip and read to screen readers, e.g. "Slack" */
  name: string;
  /** Logo, drawn into a 28 × 28 box (an <svg> fills the box) */
  logo: ReactNode;
};
type BeamCenter = {
  /** Your product's name, used in the accessible description */
  name: string;
  /** Your mark, drawn into a 36 × 36 box on the dark tile – a neutral flower when left out */
  logo?: ReactNode;
};
type IntegrationBeamProps = {
  /** Tools that send data in (left, or above on narrow widths) – three look best */
  left?: BeamTool[];
  /** Tools that receive data (right, or below on narrow widths) – three look best */
  right?: BeamTool[];
  /** The product in the middle */
  center?: BeamCenter;
  className?: string;
  /** Accessible description of the scene */
  label?: string;
};
/* Choreography, in ms */
const TRAVEL = 1500; // one pulse, end to end
const STAGGER = 280; // between the pulses of one wave
const REST = 1500; // quiet time between two sync cycles
const MORPH = 460; // tiles and curves gliding to a new layout
const FLASH = 1400; // tooltip shown after a tap
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
/** Easing of the morph – the same curve as EASE (it's easeOutQuint), so curves and tiles move together */
const easeOut = (t: number) => 1 - (1 - t) ** 5;
/** Pulses glide in and out softly instead of shooting off */
const easeInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
// useLayoutEffect measures before the first paint; on the server it simply never runs
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
type Point = {
  x: number;
  y: number;
};
/** A cubic curve as 8 numbers: start, two control points, end – one shape, so any two can be blended */
type Curve = number[];
function IntegrationBeam({
  left = DEFAULT_LEFT,
  right = DEFAULT_RIGHT,
  center = DEFAULT_CENTER,
  className,
  label,
}: IntegrationBeamProps) {
  // No tools on either side: the defaults rather than a lone center tile
  if (!left.length && !right.length) {
    left = DEFAULT_LEFT;
    right = DEFAULT_RIGHT;
  }
  const uid = "ui-ibm" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const tools = [...left, ...right];
  const n = tools.length;
  const nLeft = left.length;
  const [off, setOff] = useState<ReadonlySet<number>>(() => new Set());
  const [focus, setFocus] = useState<number | null>(null);
  const [flash, setFlash] = useState<number | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [announce, setAnnounce] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const centerRingRef = useRef<HTMLSpanElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const chipInnerRef = useRef<HTMLSpanElement>(null);
  const toolRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ringRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulseRefs = useRef<(SVGGElement | null)[]>([]);
  const gradRefs = useRef<(SVGLinearGradientElement | null)[]>([]);
  const flashTimer = useRef(0);
  // The animation loop reads the paused tools without restarting
  const offRef = useRef(off);
  offRef.current = off;
  const connected = n - off.size;
  const status =
    connected === 0 ? "All paused" : syncing ? "Syncing…" : `${connected} connected`;
  /* ---------- Beams: measure, morph, pulses ---------- */
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    const svg = svgRef.current;
    const hub = centerRef.current;
    if (!root || !scene || !svg || !hub) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let shown: Curve[] = [];
    let from: Curve[] = [];
    let to: Curve[] = [];
    let morphStart = 0;
    let lastPos: Point[] | null = null;
    let lastStack: boolean | null = null;
    const lengths: number[] = [];
    // Tiles are positioned, the scene and groups are not – so offsets are relative to the root and ignore transforms
    const centerOf = (el: HTMLElement): Point => ({
      x: el.offsetLeft + el.offsetWidth / 2,
      y: el.offsetTop + el.offsetHeight / 2,
    });
    // Horizontal tangents side by side, vertical ones when stacked: the S-curve leaves and enters each tile straight
    const curve = (a: Point, b: Point, stack: boolean): Curve => {
      if (stack) {
        const my = (a.y + b.y) / 2;
        return [a.x, a.y, a.x, my, b.x, my, b.x, b.y];
      }
      const mx = (a.x + b.x) / 2;
      return [a.x, a.y, mx, a.y, mx, b.y, b.x, b.y];
    };
    const draw = (curves: Curve[]) => {
      shown = curves;
      curves.forEach((c, i) => {
        const d = `M${c[0]} ${c[1]}C${c[2]} ${c[3]} ${c[4]} ${c[5]} ${c[6]} ${c[7]}`;
        const line = lineRefs.current[i];
        if (!line) return;
        line.setAttribute("d", d);
        pulseRefs.current[i]
          ?.querySelectorAll("path")
          .forEach((p) => p.setAttribute("d", d));
        lengths[i] = line.getTotalLength();
      });
    };
    const measure = () => {
      svg.setAttribute("viewBox", `0 0 ${root.clientWidth} ${root.clientHeight}`);
      const stack =
        getComputedStyle(scene).getPropertyValue("--ui-ibm-stack").trim() === "1";
      const els = [...toolRefs.current.slice(0, n), hub];
      if (els.some((el) => !el)) return;
      const pos = els.map((el) => centerOf(el!));
      const c = pos[n];
      // Left tools send into the centre, the centre sends out to the right – paths run in the pulse's direction
      const target = pos
        .slice(0, n)
        .map((p, i) => (i < nLeft ? curve(p, c, stack) : curve(c, p, stack)));
      if (lastPos && lastStack !== null && stack !== lastStack && !reduce) {
        // The layout flipped: tiles glide from their old spots (FLIP), the curves blend along with them
        els.forEach((el, i) => {
          const dx = lastPos![i].x - pos[i].x;
          const dy = lastPos![i].y - pos[i].y;
          if (dx || dy)
            el!.animate(
              [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
              { duration: MORPH, easing: EASE },
            );
        });
        from = shown.length === n ? shown : target;
        to = target;
        morphStart = performance.now();
        kick();
      } else if (morphStart) {
        // Resizing while a morph runs: keep gliding, just towards the new spots
        to = target;
      } else {
        draw(target);
      }
      lastPos = pos;
      lastStack = stack;
    };
    /* Pulses: one per beam at a time, started from a schedule that's rebuilt every sync cycle */
    const pulseStart: (number | null)[] = Array(n).fill(null);
    let queue: {
      beam: number;
      at: number;
    }[] = [];
    let nextCycle = 0;
    let syncFrom = 0;
    let syncTo = 0;
    let wasSyncing = false;
    let visible = false;
    let raf = 0;
    const hide = (i: number) => {
      pulseStart[i] = null;
      const g = pulseRefs.current[i];
      if (g) g.style.opacity = "0";
    };
    const ring = (el: HTMLElement | null | undefined) =>
      el?.animate(
        [
          { opacity: 0, transform: "scale(0.96)" },
          { opacity: 1, transform: "scale(1)", offset: 0.3 },
          { opacity: 0, transform: "scale(1.14)" },
        ],
        { duration: 760, easing: "ease-out" },
      );
    const planCycle = (now: number) => {
      const ins = Array.from({ length: nLeft }, (_, i) => i).filter(
        (i) => !offRef.current.has(i),
      );
      const outs = Array.from({ length: n - nLeft }, (_, i) => nLeft + i).filter(
        (i) => !offRef.current.has(i),
      );
      if (!ins.length && !outs.length) {
        nextCycle = now + REST;
        return;
      }
      const t0 = now;
      // The outgoing wave leaves as the first incoming pulse lands
      const tOut = ins.length ? t0 + TRAVEL : t0;
      queue = [
        ...ins.map((beam, k) => ({ beam, at: t0 + k * STAGGER })),
        ...outs.map((beam, k) => ({ beam, at: tOut + k * STAGGER })),
      ];
      const end = Math.max(...queue.map((q) => q.at)) + TRAVEL;
      syncFrom = ins.length ? tOut : t0;
      syncTo = end;
      nextCycle = end + REST;
    };
    const paint = (i: number, t: number) => {
      const line = lineRefs.current[i];
      const g = pulseRefs.current[i];
      const grad = gradRefs.current[i];
      if (!line || !g || !grad) return;
      const L = lengths[i] || 0;
      const seg = Math.min(84, L * 0.42);
      const head = easeInOut(t) * (L + seg);
      // One dash, `seg` long, ending at the head
      g.querySelectorAll("path").forEach((p) => {
        p.style.strokeDasharray = `${seg} ${L + seg}`;
        p.style.strokeDashoffset = `${seg - head}`;
      });
      // The gradient runs from tail (clear) to head (bright) along the dash
      const a = line.getPointAtLength(Math.max(0, Math.min(L, head - seg)));
      const b = line.getPointAtLength(Math.max(0, Math.min(L, head)));
      grad.setAttribute("x1", `${a.x}`);
      grad.setAttribute("y1", `${a.y}`);
      grad.setAttribute("x2", `${b.x + (b.x === a.x && b.y === a.y ? 0.01 : 0)}`);
      grad.setAttribute("y2", `${b.y}`);
      g.style.opacity = "1";
    };
    const frame = (now: number) => {
      raf = 0;
      if (morphStart) {
        const t = Math.min(1, (now - morphStart) / MORPH);
        const e = easeOut(t);
        draw(
          to.map((c, i) =>
            c.map((v, k) => (from[i]?.[k] ?? v) + (v - (from[i]?.[k] ?? v)) * e),
          ),
        );
        if (t >= 1) morphStart = 0;
      }
      if (visible && !reduce) {
        if (now >= nextCycle) planCycle(now);
        queue = queue.filter((q) => {
          if (q.at > now) return true;
          if (!offRef.current.has(q.beam) && pulseStart[q.beam] === null)
            pulseStart[q.beam] = q.at;
          return false;
        });
        for (let i = 0; i < n; i++) {
          const start = pulseStart[i];
          if (start === null) continue;
          // Paused mid-flight: the pulse fades out where it is
          if (offRef.current.has(i)) {
            hide(i);
            continue;
          }
          const t = (now - start) / TRAVEL;
          if (t >= 1) {
            hide(i);
            ring(i < nLeft ? centerRingRef.current : ringRefs.current[i]);
            continue;
          }
          paint(i, t);
        }
        const isSyncing = now >= syncFrom && now < syncTo;
        if (isSyncing !== wasSyncing) {
          wasSyncing = isSyncing;
          setSyncing(isSyncing);
        }
      }
      if (morphStart || (visible && !reduce)) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    // Runs only while the scene is on screen
    const io =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (visible) {
              nextCycle = performance.now() + 400;
              kick();
            } else {
              queue = [];
              for (let i = 0; i < n; i++) hide(i);
              syncTo = 0;
              if (wasSyncing) setSyncing((wasSyncing = false));
            }
          });
    io?.observe(root);
    return () => {
      ro.disconnect();
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [n, nLeft]);
  /* The status chip glides to the width of its new text */
  useIsoLayoutEffect(() => {
    const chip = chipRef.current;
    const inner = chipInnerRef.current;
    if (chip && inner) chip.style.width = `${inner.offsetWidth}px`;
  }, [status]);
  useEffect(() => () => window.clearTimeout(flashTimer.current), []);
  const toggle = (i: number) => {
    const pausing = !off.has(i);
    const next = new Set(off);
    if (pausing) next.add(i);
    else next.delete(i);
    setOff(next);
    setAnnounce(
      `${tools[i].name} ${pausing ? "paused" : "connected"}. ${n - next.size} of ${n} connected.`,
    );
    // On touch there's no hover: show the tooltip for a moment so the tap says what it did
    setFlash(i);
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlash(null), FLASH);
  };
  const onEnter = (i: number) => (e: PointerEvent) => {
    if (e.pointerType === "mouse") setFocus(i);
  };
  const onFocus = (i: number) => (e: FocusEvent<HTMLButtonElement>) => {
    if (e.currentTarget.matches(":focus-visible")) setFocus(i);
  };
  const tile = (t: BeamTool, i: number) => (
    <button
      key={i}
      ref={(el) => {
        toolRefs.current[i] = el;
      }}
      type="button"
      className="ui-ibm__tool"
      aria-pressed={!off.has(i)}
      aria-label={`${t.name}, ${off.has(i) ? "paused" : "connected"}`}
      data-off={off.has(i) || undefined}
      data-tip={focus === i || flash === i || undefined}
      onClick={() => toggle(i)}
      onPointerEnter={onEnter(i)}
      onPointerLeave={() => setFocus(null)}
      onFocus={onFocus(i)}
      onBlur={() => setFocus(null)}
    >
      <span
        className="ui-ibm__ring"
        ref={(el) => {
          ringRefs.current[i] = el;
        }}
      />
      <span className="ui-ibm__logo" aria-hidden="true">
        {t.logo}
      </span>
      <span className="ui-ibm__tip" aria-hidden="true">
        {t.name}
        {off.has(i) && <span className="ui-ibm__tip-state"> · Paused</span>}
      </span>
    </button>
  );
  return (
    <div
      ref={rootRef}
      className={["ui-ibm", className].filter(Boolean).join(" ")}
      role="group"
      aria-label={
        label ?? `${center.name} connected to ${tools.map((t) => t.name).join(", ")}`
      }
      data-focus={focus !== null || undefined}
    >
      {/* React 19 hoists this into <head> once, no matter how many instances render */}

      <svg ref={svgRef} className="ui-ibm__beams" aria-hidden="true">
        <defs>
          {/* User-space region: a straight, flat beam has a zero-height box and would lose its glow otherwise */}
          <filter
            id={`${uid}-blur`}
            filterUnits="userSpaceOnUse"
            x="-100"
            y="-100"
            width="10000"
            height="10000"
          >
            <feGaussianBlur stdDeviation="3" />
          </filter>
          {tools.map((_, i) => (
            <linearGradient
              key={i}
              id={`${uid}-g${i}`}
              gradientUnits="userSpaceOnUse"
              ref={(el) => {
                gradRefs.current[i] = el;
              }}
            >
              <stop offset="0" className="ui-ibm__stop-tail" />
              <stop offset="0.6" className="ui-ibm__stop-mid" />
              <stop offset="1" className="ui-ibm__stop-head" />
            </linearGradient>
          ))}
        </defs>
        {tools.map((_, i) => (
          <path
            key={i}
            className="ui-ibm__line"
            data-off={off.has(i) || undefined}
            data-focus={focus === i || undefined}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
          />
        ))}
        {tools.map((_, i) => (
          <g
            key={i}
            className="ui-ibm__pulse"
            data-focus={focus === i || undefined}
            ref={(el) => {
              pulseRefs.current[i] = el;
            }}
          >
            <path
              className="ui-ibm__glow"
              stroke={`url(#${uid}-g${i})`}
              filter={`url(#${uid}-blur)`}
            />
            <path className="ui-ibm__core" stroke={`url(#${uid}-g${i})`} />
          </g>
        ))}
      </svg>

      <div ref={sceneRef} className="ui-ibm__scene">
        <div className="ui-ibm__group ui-ibm__group--in">
          {left.map((t, i) => tile(t, i))}
        </div>

        <div
          ref={centerRef}
          className="ui-ibm__center"
          data-syncing={(syncing && connected > 0) || undefined}
        >
          <span className="ui-ibm__ring ui-ibm__ring--center" ref={centerRingRef} />
          <span className="ui-ibm__mark" aria-hidden="true">
            {center.logo ?? <ProductMark />}
          </span>
          <span ref={chipRef} className="ui-ibm__chip">
            <span ref={chipInnerRef} className="ui-ibm__chip-inner">
              <span className="ui-ibm__dot" data-idle={connected === 0 || undefined} />
              <span className="ui-ibm__status" key={status}>
                {status}
              </span>
            </span>
          </span>
        </div>

        <div className="ui-ibm__group ui-ibm__group--out">
          {right.map((t, i) => tile(t, nLeft + i))}
        </div>
      </div>

      <span className="ui-ibm__sr" aria-live="polite">
        {announce}
      </span>
    </div>
  );
}
/* A neutral four-petal flower, with fainter diagonal petals */
function ProductMark() {
  const petal = "M24 24C17.6 19.6 16.4 9.4 24 3.5C31.6 9.4 30.4 19.6 24 24Z";
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g opacity="0.36">
        {[45, 135, 225, 315].map((r) => (
          <path key={r} d={petal} transform={`rotate(${r} 24 24)`} />
        ))}
      </g>
      {[0, 90, 180, 270].map((r) => (
        <path key={r} d={petal} transform={`rotate(${r} 24 24)`} />
      ))}
    </svg>
  );
}
/* ---------- Brand marks: the brands' own marks (svgl.app, Simple Icons – CC0) ---------- */
const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);
const DEFAULT_CENTER: BeamCenter = { name: "Acme" };
const DEFAULT_LEFT: BeamTool[] = [
  {
    name: "Slack",
    logo: (
      <Svg>
        <svg x="2" y="2" width="20" height="20" viewBox="0 0 2447.6 2452.5">
          <g clipRule="evenodd" fillRule="evenodd">
            <path
              d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
              fill="#36c5f0"
            />
            <path
              d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
              fill="#2eb67d"
            />
            <path
              d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
              fill="#ecb22e"
            />
            <path
              d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
              fill="#e01e5a"
            />
          </g>
        </svg>
      </Svg>
    ),
  },
  {
    name: "Notion",
    logo: (
      <Svg>
        <path
          fill="currentColor"
          d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"
        />
      </Svg>
    ),
  },
  {
    name: "Gmail",
    logo: (
      <Svg>
        <svg x="2" y="2" width="20" height="20" viewBox="0 49.4 512 399.42">
          <g fill="none" fillRule="evenodd">
            <g fillRule="nonzero">
              <path
                fill="#4285f4"
                d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
              />
              <path
                fill="#34a853"
                d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
              />
              <path
                fill="#fbbc04"
                d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
              />
            </g>
            <path
              fill="#ea4335"
              d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
            />
            <path
              fill="#c5221f"
              fillRule="nonzero"
              d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
            />
          </g>
        </svg>
      </Svg>
    ),
  },
];
const DEFAULT_RIGHT: BeamTool[] = [
  {
    name: "HubSpot",
    logo: (
      <Svg>
        <path
          fill="#FF7A59"
          d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z"
        />
      </Svg>
    ),
  },
  {
    name: "Linear",
    logo: (
      <Svg>
        <path
          fill="#5E6AD2"
          d="M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z"
        />
      </Svg>
    ),
  },
  {
    name: "Google Drive",
    logo: (
      <Svg>
        <svg x="1" y="2" width="22" height="20" viewBox="0 0 87.3 78">
          <path
            d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
            fill="#0066da"
          />
          <path
            d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
            fill="#00ac47"
          />
          <path
            d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
            fill="#ea4335"
          />
          <path
            d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
            fill="#00832d"
          />
          <path
            d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
            fill="#2684fc"
          />
          <path
            d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
            fill="#ffba00"
          />
        </svg>
      </Svg>
    ),
  },
];
/** Explicit migration boundary for values whose original types were erased.
 * Keep this alias private. Replace usages with concrete types as internals are refactored.
 * Public component contracts never expose this type. See docs/type-migration.md.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecoveredValue = any;
const t_react_BkAXpnfr: RecoveredValue = (): RecoveredValue => React;
const t_jsx_runtime_CTsRTJUX: RecoveredValue = (): RecoveredValue =>
  React_jsx_runtime_CTsRTJUX;
var n_demo_DYA_Dznp: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_DYA_Dznp: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_DYA_Dznp: RecoveredValue = 1500,
  a_demo_DYA_Dznp: RecoveredValue = 280,
  o_demo_DYA_Dznp: RecoveredValue = 1500,
  s_demo_DYA_Dznp: RecoveredValue = 460,
  c_demo_DYA_Dznp: RecoveredValue = 1400,
  l_demo_DYA_Dznp: RecoveredValue = `cubic-bezier(0.22, 1, 0.36, 1)`,
  u_demo_DYA_Dznp: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    1 - (1 - e) ** 5,
  d_demo_DYA_Dznp: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    -(Math.cos(Math.PI * e) - 1) / 2,
  f_demo_DYA_Dznp: RecoveredValue =
    typeof window > `u` ? n_demo_DYA_Dznp.useEffect : n_demo_DYA_Dznp.useLayoutEffect;
function ComponentP({
  left = __demo_DYA_Dznp,
  right = v_demo_DYA_Dznp,
  center = g_demo_DYA_Dznp,
  className,
  label,
}: RecoveredValue): RecoveredValue {
  !left.length && !right.length && ((left = __demo_DYA_Dznp), (right = v_demo_DYA_Dznp));
  let x: RecoveredValue =
      `ui-ibm` + (0, n_demo_DYA_Dznp.useId)().replace(/[^a-zA-Z0-9_-]/g, ``),
    S: RecoveredValue = [...left, ...right],
    C: RecoveredValue = S.length,
    w: RecoveredValue = left.length,
    [T, E]: RecoveredValue = (0, n_demo_DYA_Dznp.useState)(
      (): RecoveredValue => new Set(),
    ),
    [D, O]: RecoveredValue = (0, n_demo_DYA_Dznp.useState)(null),
    [k, A]: RecoveredValue = (0, n_demo_DYA_Dznp.useState)(null),
    [j, M]: RecoveredValue = (0, n_demo_DYA_Dznp.useState)(!1),
    [N, P]: RecoveredValue = (0, n_demo_DYA_Dznp.useState)(``),
    F: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)(null),
    I: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)(null),
    L: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)(null),
    R: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)(null),
    z: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)(null),
    B: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)(null),
    V: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)(null),
    H: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)([]),
    U: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)([]),
    W: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)([]),
    G: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)([]),
    K: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)([]),
    q: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)(0),
    J: RecoveredValue = (0, n_demo_DYA_Dznp.useRef)(T);
  J.current = T;
  let Y: RecoveredValue = C - T.size,
    X: RecoveredValue = Y === 0 ? `All paused` : j ? `Syncing…` : `${Y} connected`;
  (f_demo_DYA_Dznp((): RecoveredValue => {
    let e: RecoveredValue = F.current,
      t: RecoveredValue = I.current,
      n: RecoveredValue = L.current,
      r: RecoveredValue = R.current;
    if (!e || !t || !n || !r) return;
    let c: RecoveredValue = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
      f: RecoveredValue = [],
      p: RecoveredValue = [],
      m: RecoveredValue = [],
      h: RecoveredValue = 0,
      g: RecoveredValue = null,
      _: RecoveredValue = null,
      v: RecoveredValue = [],
      y: RecoveredValue = (e?: RecoveredValue): RecoveredValue => ({
        x: e.offsetLeft + e.offsetWidth / 2,
        y: e.offsetTop + e.offsetHeight / 2,
      }),
      b: RecoveredValue = (
        e?: RecoveredValue,
        t?: RecoveredValue,
        n?: RecoveredValue,
      ): RecoveredValue => {
        if (n) {
          let n: RecoveredValue = (e.y + t.y) / 2;
          return [e.x, e.y, e.x, n, t.x, n, t.x, t.y];
        }
        let r: RecoveredValue = (e.x + t.x) / 2;
        return [e.x, e.y, r, e.y, r, t.y, t.x, t.y];
      },
      x: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        ((f = e),
          e.forEach((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
            let n: RecoveredValue = `M${e[0]} ${e[1]}C${e[2]} ${e[3]} ${e[4]} ${e[5]} ${e[6]} ${e[7]}`,
              r: RecoveredValue = W.current[t];
            r &&
              (r.setAttribute(`d`, n),
              G.current[t]
                ?.querySelectorAll(`path`)
                .forEach((e?: RecoveredValue): RecoveredValue => e.setAttribute(`d`, n)),
              (v[t] = r.getTotalLength()));
          }));
      },
      S: RecoveredValue = (): RecoveredValue => {
        n.setAttribute(`viewBox`, `0 0 ${e.clientWidth} ${e.clientHeight}`);
        let i: RecoveredValue =
            getComputedStyle(t).getPropertyValue(`--ui-ibm-stack`).trim() === `1`,
          a: RecoveredValue = [...H.current.slice(0, C), r];
        if (a.some((e?: RecoveredValue): RecoveredValue => !e)) return;
        let o: RecoveredValue = a.map((e?: RecoveredValue): RecoveredValue => y(e)),
          u: RecoveredValue = o[C],
          d: RecoveredValue = o
            .slice(0, C)
            .map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
                t < w ? b(e, u, i) : b(u, e, i),
            );
        (g && _ !== null && i !== _ && !c
          ? (a.forEach((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
              let n: RecoveredValue = g[t].x - o[t].x,
                r: RecoveredValue = g[t].y - o[t].y;
              (n || r) &&
                e.animate(
                  [
                    {
                      transform: `translate(${n}px, ${r}px)`,
                    },
                    {
                      transform: `none`,
                    },
                  ],
                  {
                    duration: s_demo_DYA_Dznp,
                    easing: l_demo_DYA_Dznp,
                  },
                );
            }),
            (p = f.length === C ? f : d),
            (m = d),
            (h = performance.now()),
            X())
          : h
            ? (m = d)
            : x(d),
          (g = o),
          (_ = i));
      },
      T: RecoveredValue = Array(C).fill(null),
      E: RecoveredValue = [],
      D: RecoveredValue = 0,
      O: RecoveredValue = 0,
      k: RecoveredValue = 0,
      A: RecoveredValue = !1,
      j: RecoveredValue = !1,
      N: RecoveredValue = 0,
      P: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        T[e] = null;
        let t: RecoveredValue = G.current[e];
        t && (t.style.opacity = `0`);
      },
      B: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        e?.animate(
          [
            {
              opacity: 0,
              transform: `scale(0.96)`,
            },
            {
              opacity: 1,
              transform: `scale(1)`,
              offset: 0.3,
            },
            {
              opacity: 0,
              transform: `scale(1.14)`,
            },
          ],
          {
            duration: 760,
            easing: `ease-out`,
          },
        ),
      V: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = (
            Array.from(
              {
                length: w,
              },
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => t,
            ) as RecoveredValue[]
          ).filter((e?: RecoveredValue): RecoveredValue => !J.current.has(e)),
          n: RecoveredValue = (
            Array.from(
              {
                length: C - w,
              },
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => w + t,
            ) as RecoveredValue[]
          ).filter((e?: RecoveredValue): RecoveredValue => !J.current.has(e));
        if (!t.length && !n.length) {
          D = e + o_demo_DYA_Dznp;
          return;
        }
        let r: RecoveredValue = e,
          s: RecoveredValue = t.length ? r + i_demo_DYA_Dznp : r;
        E = [
          ...t.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => ({
              beam: e,
              at: r + t * a_demo_DYA_Dznp,
            }),
          ),
          ...n.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => ({
              beam: e,
              at: s + t * a_demo_DYA_Dznp,
            }),
          ),
        ];
        let c: RecoveredValue =
          Math.max(...E.map((e?: RecoveredValue): RecoveredValue => e.at)) +
          i_demo_DYA_Dznp;
        ((O = t.length ? s : r), (k = c), (D = c + o_demo_DYA_Dznp));
      },
      q: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = W.current[e],
          r: RecoveredValue = G.current[e],
          i: RecoveredValue = K.current[e];
        if (!n || !r || !i) return;
        let a: RecoveredValue = v[e] || 0,
          o: RecoveredValue = Math.min(84, a * 0.42),
          s: RecoveredValue = d_demo_DYA_Dznp(t) * (a + o);
        r.querySelectorAll(`path`).forEach((e?: RecoveredValue): RecoveredValue => {
          ((e.style.strokeDasharray = `${o} ${a + o}`),
            (e.style.strokeDashoffset = `${o - s}`));
        });
        let c: RecoveredValue = n.getPointAtLength(Math.max(0, Math.min(a, s - o))),
          l: RecoveredValue = n.getPointAtLength(Math.max(0, Math.min(a, s)));
        (i.setAttribute(`x1`, `${c.x}`),
          i.setAttribute(`y1`, `${c.y}`),
          i.setAttribute(`x2`, `${l.x + (l.x === c.x && l.y === c.y ? 0.01 : 0)}`),
          i.setAttribute(`y2`, `${l.y}`),
          (r.style.opacity = `1`));
      },
      Y: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        if (((N = 0), h)) {
          let t: RecoveredValue = Math.min(1, (e - h) / s_demo_DYA_Dznp),
            n: RecoveredValue = u_demo_DYA_Dznp(t);
          (x(
            m.map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
                e.map(
                  (e?: RecoveredValue, r?: RecoveredValue): RecoveredValue =>
                    (p[t]?.[r] ?? e) + (e - (p[t]?.[r] ?? e)) * n,
                ),
            ),
          ),
            t >= 1 && (h = 0));
        }
        if (j && !c) {
          (e >= D && V(e),
            (E = E.filter(
              (t?: RecoveredValue): RecoveredValue =>
                t.at > e ||
                (!J.current.has(t.beam) && T[t.beam] === null && (T[t.beam] = t.at), !1),
            )));
          for (let t: RecoveredValue = 0; t < C; t++) {
            let n: RecoveredValue = T[t];
            if (n === null) continue;
            if (J.current.has(t)) {
              P(t);
              continue;
            }
            let r: RecoveredValue = (e - n) / i_demo_DYA_Dznp;
            if (r >= 1) {
              (P(t), B(t < w ? z.current : U.current[t]));
              continue;
            }
            q(t, r);
          }
          let t: RecoveredValue = e >= O && e < k;
          t !== A && ((A = t), M(t));
        }
        (h || (j && !c)) && (N = requestAnimationFrame(Y));
      },
      X: RecoveredValue = (): RecoveredValue => {
        N ||= requestAnimationFrame(Y);
      };
    S();
    let Z: RecoveredValue = new ResizeObserver(S);
    Z.observe(e);
    let Q: RecoveredValue =
      typeof IntersectionObserver > `u`
        ? null
        : new IntersectionObserver(([e]: RecoveredValue): RecoveredValue => {
            if (((j = e.isIntersecting), j)) ((D = performance.now() + 400), X());
            else {
              E = [];
              for (let e: RecoveredValue = 0; e < C; e++) P(e);
              ((k = 0), A && M((A = !1)));
            }
          });
    return (
      Q?.observe(e),
      (): RecoveredValue => {
        (Z.disconnect(), Q?.disconnect(), cancelAnimationFrame(N));
      }
    );
  }, [C, w]),
    f_demo_DYA_Dznp((): RecoveredValue => {
      let e: RecoveredValue = B.current,
        t: RecoveredValue = V.current;
      e && t && (e.style.width = `${t.offsetWidth}px`);
    }, [X]),
    (0, n_demo_DYA_Dznp.useEffect)(
      (): RecoveredValue => (): RecoveredValue => window.clearTimeout(q.current),
      [],
    ));
  let Z: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = !T.has(e),
        n: RecoveredValue = new Set(T);
      (t ? n.add(e) : n.delete(e),
        E(n),
        P(`${S[e].name} ${t ? `paused` : `connected`}. ${C - n.size} of ${C} connected.`),
        A(e),
        window.clearTimeout(q.current),
        (q.current = window.setTimeout((): RecoveredValue => A(null), c_demo_DYA_Dznp)));
    },
    Q: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        t.pointerType === `mouse` && O(e);
      },
    ee: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        t.currentTarget.matches(`:focus-visible`) && O(e);
      },
    $: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
      <button
        ref={
          ((e?: RecoveredValue): RecoveredValue => {
            H.current[t] = e;
          }) as RecoveredValue
        }
        type={`button`}
        className={`ui-ibm__tool`}
        aria-pressed={!T.has(t)}
        aria-label={`${e.name}, ${T.has(t) ? `paused` : `connected`}`}
        data-off={T.has(t) || void 0}
        data-tip={D === t || k === t || void 0}
        onClick={(): RecoveredValue => Z(t)}
        onPointerEnter={Q(t)}
        onPointerLeave={(): RecoveredValue => O(null)}
        onFocus={ee(t)}
        onBlur={(): RecoveredValue => O(null)}
        key={t}
      >
        <span
          className={`ui-ibm__ring`}
          ref={
            ((e?: RecoveredValue): RecoveredValue => {
              U.current[t] = e;
            }) as RecoveredValue
          }
        />
        <span className={`ui-ibm__logo`} aria-hidden={`true`}>
          {e.logo}
        </span>
        <span className={`ui-ibm__tip`} aria-hidden={`true`}>
          {e.name}
          {T.has(t) && <span className={`ui-ibm__tip-state`}>{` · Paused`}</span>}
        </span>
      </button>
    );
  return (
    <div
      ref={F as RecoveredValue}
      className={[`ui-ibm`, className].filter(Boolean).join(` `)}
      role={`group`}
      aria-label={
        label ??
        `${center.name} connected to ${S.map((e?: RecoveredValue): RecoveredValue => e.name).join(`, `)}`
      }
      data-focus={D !== null || void 0}
    >
      <svg ref={L as RecoveredValue} className={`ui-ibm__beams`} aria-hidden={`true`}>
        <defs>
          <filter
            id={`${x}-blur`}
            filterUnits={`userSpaceOnUse`}
            x={`-100`}
            y={`-100`}
            width={`10000`}
            height={`10000`}
          >
            <feGaussianBlur stdDeviation={`3`} />
          </filter>
          {S.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <linearGradient
                id={`${x}-g${t}`}
                gradientUnits={`userSpaceOnUse`}
                ref={
                  ((e?: RecoveredValue): RecoveredValue => {
                    K.current[t] = e;
                  }) as RecoveredValue
                }
                key={t}
              >
                <stop offset={`0`} className={`ui-ibm__stop-tail`} />
                <stop offset={`0.6`} className={`ui-ibm__stop-mid`} />
                <stop offset={`1`} className={`ui-ibm__stop-head`} />
              </linearGradient>
            ),
          )}
        </defs>
        {S.map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
            <path
              className={`ui-ibm__line`}
              data-off={T.has(t) || void 0}
              data-focus={D === t || void 0}
              ref={
                ((e?: RecoveredValue): RecoveredValue => {
                  W.current[t] = e;
                }) as RecoveredValue
              }
              key={t}
            />
          ),
        )}
        {S.map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
            <g
              className={`ui-ibm__pulse`}
              data-focus={D === t || void 0}
              ref={
                ((e?: RecoveredValue): RecoveredValue => {
                  G.current[t] = e;
                }) as RecoveredValue
              }
              key={t}
            >
              <path
                className={`ui-ibm__glow`}
                stroke={`url(#${x}-g${t})`}
                filter={`url(#${x}-blur)`}
              />
              <path className={`ui-ibm__core`} stroke={`url(#${x}-g${t})`} />
            </g>
          ),
        )}
      </svg>
      <div ref={I as RecoveredValue} className={`ui-ibm__scene`}>
        <div className={`ui-ibm__group ui-ibm__group--in`}>
          {left.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => $(e, t))}
        </div>
        <div
          ref={R as RecoveredValue}
          className={`ui-ibm__center`}
          data-syncing={(j && Y > 0) || void 0}
        >
          <span
            className={`ui-ibm__ring ui-ibm__ring--center`}
            ref={z as RecoveredValue}
          />
          <span className={`ui-ibm__mark`} aria-hidden={`true`}>
            {center.logo ?? <ComponentM />}
          </span>
          <span ref={B as RecoveredValue} className={`ui-ibm__chip`}>
            <span ref={V as RecoveredValue} className={`ui-ibm__chip-inner`}>
              <span className={`ui-ibm__dot`} data-idle={Y === 0 || void 0} />
              <span className={`ui-ibm__status`} children={X} key={X} />
            </span>
          </span>
        </div>
        <div className={`ui-ibm__group ui-ibm__group--out`}>
          {right.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => $(e, w + t),
          )}
        </div>
      </div>
      <span className={`ui-ibm__sr`} aria-live={`polite`}>
        {N}
      </span>
    </div>
  );
}
function ComponentM(): RecoveredValue {
  let e: RecoveredValue = `M24 24C17.6 19.6 16.4 9.4 24 3.5C31.6 9.4 30.4 19.6 24 24Z`;
  return (
    <svg viewBox={`0 0 48 48`} aria-hidden={`true`}>
      <g opacity={`0.36`}>
        {[45, 135, 225, 315].map(
          (t?: RecoveredValue): RecoveredValue => (
            <path d={e} transform={`rotate(${t} 24 24)`} key={t} />
          ),
        )}
      </g>
      {[0, 90, 180, 270].map(
        (t?: RecoveredValue): RecoveredValue => (
          <path d={e} transform={`rotate(${t} 24 24)`} key={t} />
        ),
      )}
    </svg>
  );
}
var ComponentH: RecoveredValue = ({ children }: RecoveredValue): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
      {children}
    </svg>
  ),
  g_demo_DYA_Dznp: RecoveredValue = {
    name: `Acme`,
  },
  __demo_DYA_Dznp: RecoveredValue = [
    {
      name: `Slack`,
      logo: (
        <ComponentH>
          <svg x={`2`} y={`2`} width={`20`} height={`20`} viewBox={`0 0 2447.6 2452.5`}>
            <g clipRule={`evenodd`} fillRule={`evenodd`}>
              <path
                d={`m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z`}
                fill={`#36c5f0`}
              />
              <path
                d={`m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z`}
                fill={`#2eb67d`}
              />
              <path
                d={`m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z`}
                fill={`#ecb22e`}
              />
              <path
                d={`m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0`}
                fill={`#e01e5a`}
              />
            </g>
          </svg>
        </ComponentH>
      ),
    },
    {
      name: `Notion`,
      logo: (
        <ComponentH>
          <path
            fill={`currentColor`}
            d={`M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z`}
          />
        </ComponentH>
      ),
    },
    {
      name: `Gmail`,
      logo: (
        <ComponentH>
          <svg x={`2`} y={`2`} width={`20`} height={`20`} viewBox={`0 49.4 512 399.42`}>
            <g fill={`none`} fillRule={`evenodd`}>
              <g fillRule={`nonzero`}>
                <path
                  fill={`#4285f4`}
                  d={`M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z`}
                />
                <path
                  fill={`#34a853`}
                  d={`M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z`}
                />
                <path
                  fill={`#fbbc04`}
                  d={`M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z`}
                />
              </g>
              <path
                fill={`#ea4335`}
                d={`M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z`}
              />
              <path
                fill={`#c5221f`}
                fillRule={`nonzero`}
                d={`M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z`}
              />
            </g>
          </svg>
        </ComponentH>
      ),
    },
  ],
  v_demo_DYA_Dznp: RecoveredValue = [
    {
      name: `HubSpot`,
      logo: (
        <ComponentH>
          <path
            fill={`#FF7A59`}
            d={`M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`}
          />
        </ComponentH>
      ),
    },
    {
      name: `Linear`,
      logo: (
        <ComponentH>
          <path
            fill={`#5E6AD2`}
            d={`M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z`}
          />
        </ComponentH>
      ),
    },
    {
      name: `Google Drive`,
      logo: (
        <ComponentH>
          <svg x={`1`} y={`2`} width={`22`} height={`20`} viewBox={`0 0 87.3 78`}>
            <path
              d={`m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z`}
              fill={`#0066da`}
            />
            <path
              d={`m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z`}
              fill={`#00ac47`}
            />
            <path
              d={`m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z`}
              fill={`#ea4335`}
            />
            <path
              d={`m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z`}
              fill={`#00832d`}
            />
            <path
              d={`m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z`}
              fill={`#2684fc`}
            />
            <path
              d={`m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z`}
              fill={`#ffba00`}
            />
          </svg>
        </ComponentH>
      ),
    },
  ];
function Runtime(): RecoveredValue {
  return (
    <div className={`integration-beam-demo`}>
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
export { IntegrationBeam };
export type { BeamTool };
export type { BeamCenter };
export type { IntegrationBeamProps };
