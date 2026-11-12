"use client";

import "./TiltCard.css";
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
var n_demo_BijqyLh8: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_BijqyLh8: RecoveredValue = t_jsx_runtime_CTsRTJUX();
function ComponentI({
  children,
  maxTilt = 10,
  glare = !0,
  scale = 1.02,
  perspective = 900,
  className,
}: RecoveredValue): RecoveredValue {
  let l: RecoveredValue = (0, n_demo_BijqyLh8.useRef)(null),
    u: RecoveredValue = (0, n_demo_BijqyLh8.useRef)(null),
    d: RecoveredValue = (0, n_demo_BijqyLh8.useRef)(0),
    f: RecoveredValue = (0, n_demo_BijqyLh8.useRef)(null),
    p: RecoveredValue = (0, n_demo_BijqyLh8.useRef)(!1);
  (0, n_demo_BijqyLh8.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = window.matchMedia(`(prefers-reduced-motion: reduce)`),
      t: RecoveredValue = (): RecoveredValue => (p.current = e.matches);
    return (
      t(),
      e.addEventListener(`change`, t),
      (): RecoveredValue => {
        (e.removeEventListener(`change`, t), cancelAnimationFrame(d.current));
      }
    );
  }, []);
  let m: RecoveredValue = (): RecoveredValue => {
      d.current = 0;
      let e: RecoveredValue = l.current,
        n: RecoveredValue = u.current,
        r: RecoveredValue = f.current;
      if (!e || !n || !r) return;
      let i: RecoveredValue = e.getBoundingClientRect(),
        a: RecoveredValue = Math.min(Math.max((r.x - i.left) / i.width, 0), 1),
        o: RecoveredValue = Math.min(Math.max((r.y - i.top) / i.height, 0), 1);
      (n.style.setProperty(`--rx`, `${((0.5 - o) * 2 * maxTilt).toFixed(2)}deg`),
        n.style.setProperty(`--ry`, `${((a - 0.5) * 2 * maxTilt).toFixed(2)}deg`),
        n.style.setProperty(`--gx`, `${(a * 100).toFixed(1)}%`),
        n.style.setProperty(`--gy`, `${(o * 100).toFixed(1)}%`));
    },
    h: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.pointerType === `touch`) return;
      let t: RecoveredValue = u.current;
      (t && !t.hasAttribute(`data-active`) && t.setAttribute(`data-active`, ``),
        !p.current &&
          ((f.current = {
            x: e.clientX,
            y: e.clientY,
          }),
          (d.current ||= requestAnimationFrame(m))));
    },
    g: RecoveredValue = (): RecoveredValue => {
      (cancelAnimationFrame(d.current), (d.current = 0), (f.current = null));
      let e: RecoveredValue = u.current;
      e &&
        (e.removeAttribute(`data-active`),
        e.style.setProperty(`--rx`, `0deg`),
        e.style.setProperty(`--ry`, `0deg`));
    },
    _: RecoveredValue = {
      "--ui-tc-perspective": `${perspective}px`,
      "--ui-tc-scale": scale,
    };
  return (
    <div
      ref={l as RecoveredValue}
      className={[`ui-tc`, className].filter(Boolean).join(` `)}
      style={_ as RecoveredValue}
      onPointerMove={h}
      onPointerLeave={g}
      onPointerCancel={g}
    >
      <div ref={u as RecoveredValue} className={`ui-tc-card`}>
        {children}
        {glare && <span className={`ui-tc-glare`} aria-hidden={`true`} />}
      </div>
    </div>
  );
}
function Runtime(): RecoveredValue {
  return (
    <div className={`tilt-card-demo`}>
      <ComponentI>
        <div className={`tilt-card-demo__card`}>
          <div className={`tilt-card-demo__top`}>
            <span className={`tilt-card-demo__brand`}>
              {`rea/ui `}
              <b>{`Pro`}</b>
            </span>
            <svg
              className={`tilt-card-demo__wave`}
              viewBox={`0 0 24 24`}
              aria-hidden={`true`}
            >
              <path
                d={`M8.5 7.5a7 7 0 0 1 0 9M12 5a10.5 10.5 0 0 1 0 14M15.5 2.5a14 14 0 0 1 0 19`}
              />
            </svg>
          </div>
          <span className={`tilt-card-demo__chip`} aria-hidden={`true`} />
          <div className={`tilt-card-demo__number`}>{`•••• •••• •••• 4821`}</div>
          <div className={`tilt-card-demo__bottom`}>
            <div>
              <span className={`tilt-card-demo__label`}>{`Member`}</span>
              <span className={`tilt-card-demo__value`}>{`Alex Morgan`}</span>
            </div>
            <div>
              <span className={`tilt-card-demo__label`}>{`Since`}</span>
              <span className={`tilt-card-demo__value`}>{`10/26`}</span>
            </div>
          </div>
        </div>
      </ComponentI>
      <p className={`tilt-card-demo__caption`}>{`Move your pointer over the card`}</p>
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
