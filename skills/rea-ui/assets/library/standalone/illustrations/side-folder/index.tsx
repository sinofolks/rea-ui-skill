"use client";

import "./SideFolder.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import { type ReactElement, useId } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Side Folder – a glassy folder turned on its side, in component logic and public types.
 * Three documents peek out to the right from behind a frosted front pocket with a tab on its edge.
 * Hover the folder: the pocket swings forward and every document slides out on its own.
 * The artwork scales with its container and keeps a 3 : 2 frame.
 */
type SideFolderProps = {
  className?: string;
  /** Accessible description of the scene */
  label?: string;
};
/* Front pocket on a 380 × 520 grid: a narrow top part and a wider tab towards the bottom */
const FRONT =
  "M40 0H290Q330 0 330 40V318Q330 338 344 348L364 362Q380 372 380 396V480Q380 520 340 520H40Q0 520 0 480V40Q0 0 40 0Z";
const LINES = [78, 180, 140, 175, 126, 168, 110];
/* A mask (unlike clip-path: url()) also cuts the frosted blur to the pocket shape, and scales with the box */
const MASK = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 380 520' preserveAspectRatio='none'><path d='${FRONT}'/></svg>`)}") 0 0 / 100% 100% no-repeat`;
function SideFolder({
  className,
  label = "Blue folder on its side, with three documents peeking out behind a frosted front pocket",
}: SideFolderProps) {
  const id = "ui-sf" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <div
      className={["ui-sf", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={label}
    >
      {/* React 19 hoists this into <head> once, no matter how many instances render */}

      <div className="ui-sf-icon" aria-hidden="true">
        {/* Back of the folder */}
        <svg className="ui-sf-layer ui-sf-back" viewBox="0 0 440 520">
          <defs>
            <filter id={`${id}-hl`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feOffset in="blur" dy="3" result="offset" />
              <feComposite
                in="blur"
                in2="offset"
                operator="arithmetic"
                k2="1"
                k3="-1"
                result="diff"
              />
              <feFlood floodColor="#fff" floodOpacity="0.65" />
              <feComposite in2="diff" operator="in" result="light" />
              <feComposite in="light" in2="SourceAlpha" operator="in" />
            </filter>
          </defs>
          <rect x="0" y="18" width="440" height="486" rx="36" fill="#5bb7ea" />
          <rect
            x="0"
            y="18"
            width="440"
            height="486"
            rx="36"
            fill="#000"
            filter={`url(#${id}-hl)`}
          />
        </svg>

        {/* Documents – each one slides out on its own */}
        <svg className="ui-sf-layer" viewBox="0 0 440 520">
          <defs>
            <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#eaf2f8" />
            </linearGradient>
            <symbol id={`${id}-doc`} overflow="visible">
              <rect
                x="0.6"
                y="0.6"
                width="278.8"
                height="348.8"
                rx="19.4"
                fill={`url(#${id}-paper)`}
                stroke="rgba(0,0,0,0.12)"
                strokeWidth="1.2"
              />
              {LINES.map((w, i) => (
                <rect
                  key={i}
                  x="30"
                  y={87 + i * 28}
                  width={w}
                  height="9"
                  rx="4.5"
                  fill="rgba(0,0,0,0.12)"
                />
              ))}
            </symbol>
          </defs>
          <g transform="scale(1.15)">
            <use className="ui-sf-doc ui-sf-doc--top" href={`#${id}-doc`} />
            <use className="ui-sf-doc ui-sf-doc--bottom" href={`#${id}-doc`} />
            <use className="ui-sf-doc ui-sf-doc--middle" href={`#${id}-doc`} />
          </g>
        </svg>

        {/* Frosted front pocket */}
        <div className="ui-sf-front">
          <svg viewBox="0 0 380 520">
            <path d={FRONT} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
          </svg>
        </div>
      </div>
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
var n: RecoveredValue = t_react_BkAXpnfr(),
  r: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_ClUxDNiT: RecoveredValue = `M40 0H290Q330 0 330 40V318Q330 338 344 348L364 362Q380 372 380 396V480Q380 520 340 520H40Q0 520 0 480V40Q0 0 40 0Z`,
  a: RecoveredValue = [78, 180, 140, 175, 126, 168, 110],
  o_demo_ClUxDNiT: RecoveredValue = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 380 520' preserveAspectRatio='none'><path d='${i_demo_ClUxDNiT}'/></svg>`)}") 0 0 / 100% 100% no-repeat`;
function ComponentS({
  className,
  label = `Blue folder on its side, with three documents peeking out behind a frosted front pocket`,
}: RecoveredValue): RecoveredValue {
  let o: RecoveredValue = `ui-sf` + (0, n.useId)().replace(/[^a-zA-Z0-9_-]/g, ``);
  return (
    <div
      className={[`ui-sf`, className].filter(Boolean).join(` `)}
      role={`img`}
      aria-label={label}
    >
      <div className={`ui-sf-icon`} aria-hidden={`true`}>
        <svg className={`ui-sf-layer ui-sf-back`} viewBox={`0 0 440 520`}>
          <defs>
            <filter id={`${o}-hl`} x={`-10%`} y={`-10%`} width={`120%`} height={`120%`}>
              <feGaussianBlur in={`SourceAlpha`} stdDeviation={`4`} result={`blur`} />
              <feOffset in={`blur`} dy={`3`} result={`offset`} />
              <feComposite
                in={`blur`}
                in2={`offset`}
                operator={`arithmetic`}
                k2={`1`}
                k3={`-1`}
                result={`diff`}
              />
              <feFlood floodColor={`#fff`} floodOpacity={`0.65`} />
              <feComposite in2={`diff`} operator={`in`} result={`light`} />
              <feComposite in={`light`} in2={`SourceAlpha`} operator={`in`} />
            </filter>
          </defs>
          <rect
            x={`0`}
            y={`18`}
            width={`440`}
            height={`486`}
            rx={`36`}
            fill={`#5bb7ea`}
          />
          <rect
            x={`0`}
            y={`18`}
            width={`440`}
            height={`486`}
            rx={`36`}
            fill={`#000`}
            filter={`url(#${o}-hl)`}
          />
        </svg>
        <svg className={`ui-sf-layer`} viewBox={`0 0 440 520`}>
          <defs>
            <linearGradient id={`${o}-paper`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
              <stop offset={`0%`} stopColor={`#fff`} />
              <stop offset={`100%`} stopColor={`#eaf2f8`} />
            </linearGradient>
            <symbol id={`${o}-doc`} overflow={`visible`}>
              <rect
                x={`0.6`}
                y={`0.6`}
                width={`278.8`}
                height={`348.8`}
                rx={`19.4`}
                fill={`url(#${o}-paper)`}
                stroke={`rgba(0,0,0,0.12)`}
                strokeWidth={`1.2`}
              />
              {a.map(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <rect
                    x={`30`}
                    y={87 + t * 28}
                    width={e}
                    height={`9`}
                    rx={`4.5`}
                    fill={`rgba(0,0,0,0.12)`}
                    key={t}
                  />
                ),
              )}
            </symbol>
          </defs>
          <g transform={`scale(1.15)`}>
            <use className={`ui-sf-doc ui-sf-doc--top`} href={`#${o}-doc`} />
            <use className={`ui-sf-doc ui-sf-doc--bottom`} href={`#${o}-doc`} />
            <use className={`ui-sf-doc ui-sf-doc--middle`} href={`#${o}-doc`} />
          </g>
        </svg>
        <div className={`ui-sf-front`}>
          <svg viewBox={`0 0 380 520`}>
            <path
              d={i_demo_ClUxDNiT}
              fill={`none`}
              stroke={`rgba(255,255,255,0.3)`}
              strokeWidth={`4`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
function Runtime(): RecoveredValue {
  return (
    <div className={`side-folder-demo`}>
      <ComponentS />
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
export { SideFolder };
export type { SideFolderProps };
