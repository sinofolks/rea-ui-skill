"use client";

import "./GradientFloor.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import type { ReactElement } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/** Explicit migration boundary for values whose original types were erased.
 * Keep this alias private. Replace usages with concrete types as internals are refactored.
 * Public component contracts never expose this type. See docs/type-migration.md.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecoveredValue = any;
const t_react_BkAXpnfr: RecoveredValue = (): RecoveredValue => React;
const t_jsx_runtime_CTsRTJUX: RecoveredValue = (): RecoveredValue =>
  React_jsx_runtime_CTsRTJUX;
var n_demo_B_TgH1P_: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_B_TgH1P_: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i: RecoveredValue = {
    k: 1,
    v1: [926.8, 565.8],
    c: [302.1, 297.3],
    l: [291.3, 291.3],
    bottom: 1222.8,
    r: [3155.8, 361.3],
    v4: [2493.8, 565.8],
    v3: [2189.3, 565.8],
    m2: [1898.8, 428.8],
    m1: [1510.8, 428.8],
    v2: [1230.8, 565.8],
  },
  a: RecoveredValue = {
    k: 0.8427,
    v1: [781.039, 476.815],
    c: [254.588, 250.543],
    l: [245.486, 245.486],
    bottom: 1030.49,
    r: [2659.48, 304.477],
    v4: [2101.59, 476.815],
    v3: [1844.98, 476.815],
    m2: [1600.17, 361.361],
    m1: [1273.19, 361.361],
    v2: [1037.23, 476.815],
  },
  o: RecoveredValue = 110,
  s_demo_B_TgH1P_: RecoveredValue = 80;
function c(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = {
      l: o * Math.sin(t),
      m: -110 * Math.sin(t + 0.5),
      r: o * Math.sin(t + 1),
      vL: s_demo_B_TgH1P_ * Math.sin(t + Math.PI / 2 + 0.25),
      vR: s_demo_B_TgH1P_ * Math.sin(t - Math.PI / 2 + 0.75),
    },
    r: RecoveredValue = (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
      (t[1] + n * e.k).toFixed(1);
  return `M${e.v1[0]} ${r(e.v1, n.vL)}C${e.v1[0]} ${r(e.v1, n.vL)} ${e.c[0]} ${r(e.c, n.l)} ${e.l[0]} ${r(e.l, n.l)}V${e.bottom}H${e.r[0]}V${r(e.r, n.r)}L${e.v4[0]} ${r(e.v4, n.vR)}H${e.v3[0]}V${r(e.v3, n.vR)}L${e.m2[0]} ${r(e.m2, n.m)}H${e.m1[0]}V${r(e.m1, n.m)}L${e.v2[0]} ${r(e.v2, n.vL)}H${e.v1[0]}V${r(e.v1, n.vL)}Z`;
}
function ComponentL({
  children,
  colors = [`#FF7700`, `#FF0055`, `#0073FF`],
  speed = 3,
  className,
}: RecoveredValue): RecoveredValue {
  let l: RecoveredValue =
      `ui-gf` + (0, n_demo_B_TgH1P_.useId)().replace(/[^a-zA-Z0-9_-]/g, ``),
    u: RecoveredValue = (0, n_demo_B_TgH1P_.useRef)(null),
    f: RecoveredValue = (0, n_demo_B_TgH1P_.useRef)(null),
    p: RecoveredValue = (0, n_demo_B_TgH1P_.useRef)(null);
  return (
    (0, n_demo_B_TgH1P_.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = u.current;
      if (!e) return;
      let t: RecoveredValue =
          speed > 0 && !window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
        n: RecoveredValue = 0,
        r: RecoveredValue = 0,
        s: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          if (((n = requestAnimationFrame(s)), e - r < 32)) return;
          r = e;
          let t: RecoveredValue = (e / (speed * 1e3)) * Math.PI * 2;
          (f.current?.setAttribute(`d`, c(i, t)), p.current?.setAttribute(`d`, c(a, t)));
        };
      if (typeof IntersectionObserver > `u`)
        return (
          t && (n = requestAnimationFrame(s)),
          (): RecoveredValue => cancelAnimationFrame(n)
        );
      let l: RecoveredValue = new IntersectionObserver(
        ([r]: RecoveredValue): RecoveredValue => {
          (cancelAnimationFrame(n),
            e.toggleAttribute(`data-paused`, !r.isIntersecting),
            r.isIntersecting && t && (n = requestAnimationFrame(s)));
        },
      );
      return (
        l.observe(e),
        (): RecoveredValue => {
          (l.disconnect(), cancelAnimationFrame(n));
        }
      );
    }, [speed]),
    (
      <div
        ref={u as RecoveredValue}
        className={[`ui-gf`, className].filter(Boolean).join(` `)}
      >
        <div className={`ui-gf-layer ui-gf-layer--color`} aria-hidden={`true`}>
          <div className={`ui-gf-bleed`}>
            <svg viewBox={`0 0 3447.1 1514.1`} preserveAspectRatio={`none`}>
              <defs>
                <linearGradient
                  id={`${l}-fill`}
                  x1={`1723.8`}
                  y1={`423.3`}
                  x2={`1723.8`}
                  y2={`894.3`}
                  gradientUnits={`userSpaceOnUse`}
                >
                  <stop stopColor={colors[0]} />
                  <stop offset={`0.302885`} stopColor={colors[1]} />
                  <stop offset={`0.673077`} stopColor={colors[2]} />
                </linearGradient>
              </defs>
              <path ref={f as RecoveredValue} d={c(i, 0)} fill={`url(#${l}-fill)`} />
            </svg>
          </div>
        </div>
        <div className={`ui-gf-layer ui-gf-layer--light`} aria-hidden={`true`}>
          <div className={`ui-gf-bleed`}>
            <svg viewBox={`0 0 2904.96 1275.97`} preserveAspectRatio={`none`}>
              <path
                ref={p as RecoveredValue}
                d={c(a, 0)}
                fill={`#fff`}
                fillOpacity={`0.8`}
              />
            </svg>
          </div>
        </div>
        {children != null && <div className={`ui-gf-content`}>{children}</div>}
      </div>
    )
  );
}
var u_demo_B_TgH1P_: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  `calc(${e} * 100cqw / 2200)`;
function Runtime(): RecoveredValue {
  return (
    <div className={`gradient-floor-demo`}>
      <ComponentL className={`gradient-floor-demo__panel`} />
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
