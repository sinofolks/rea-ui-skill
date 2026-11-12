"use client";

import "./TabOverload.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import { type ReactElement, useId } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Tab Overload – a small card illustration, in component logic and public types.
 * Three overlapping browser windows; the front one is active with colored dots, an outline and a glow.
 * Hover a window behind it and the highlight moves over to that one.
 * The artwork is drawn on a 360 × 240 viewBox and fades out towards the right and bottom edge.
 */
type TabOverloadProps = {
  className?: string;
  /** Accessible description of the scene */
  label?: string;
};
/** Offsets of the three windows (top-left corner of each frame) */
const windows = [
  { n: 1, x: 30, y: 68 },
  { n: 2, x: 125, y: 56 },
  { n: 3, x: 220, y: 44 },
] as const;
function TabOverload({
  className,
  label = "Three overlapping browser windows full of placeholder content",
}: TabOverloadProps) {
  const id = "ui-to" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <div
      className={["ui-to", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={label}
    >
      {/* React 19 hoists this into <head> once, no matter how many instances render */}

      <svg className="ui-to-art" viewBox="0 0 360 240" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-blob-h`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFB89E" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#C8A8E5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#A8B5FF" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`${id}-blob-v`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF6B5C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFB89E" stopOpacity="0.3" />
          </linearGradient>
          <filter id={`${id}-blur`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <linearGradient id={`${id}-stroke`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B5C0FF" />
            <stop offset="40%" stopColor="#D5BBEF" />
            <stop offset="75%" stopColor="#FFC5AB" />
            <stop offset="100%" stopColor="#FFB5BC" />
          </linearGradient>
        </defs>

        {/* Each window: glow → frame → content; the next window covers any overflow */}
        {windows.map(({ n, x, y }) => (
          <g key={n}>
            <g className={`ui-to-blobs ui-to-blobs-${n}`}>
              <ellipse
                cx={x + 70}
                cy={y + 8}
                rx="90"
                ry="14"
                fill={`url(#${id}-blob-h)`}
                filter={`url(#${id}-blur)`}
              />
              <ellipse
                cx={x + 8}
                cy={y + 96}
                rx="14"
                ry="90"
                fill={`url(#${id}-blob-v)`}
                filter={`url(#${id}-blur)`}
              />
            </g>
            <g className={`ui-to-tab ui-to-tab-${n}`} transform={`translate(${x} ${y})`}>
              {/* Outer gray frame, reaching well past the edges */}
              <rect
                className="ui-to-frame"
                width="380"
                height="300"
                rx="6"
                fill="#F4F5F7"
                stroke="#E4E7EC"
                strokeWidth="0.7"
              />
              <circle className="ui-to-dot" cx="14" cy="14" r="3" fill="#CCCCCC" />
              <circle className="ui-to-dot" cx="24" cy="14" r="3" fill="#CCCCCC" />
              <circle className="ui-to-dot" cx="34" cy="14" r="3" fill="#CCCCCC" />
              <rect
                className="ui-to-page"
                x="4"
                y="24"
                width="372"
                height="272"
                rx="5"
                fill="#FFFFFF"
                stroke="#E4E7EC"
                strokeWidth="0.7"
              />
            </g>
            <g
              className={`ui-to-content ui-to-content-${n}`}
              transform={`translate(${x} ${y})`}
            >
              <rect
                className="ui-to-bar"
                x="12"
                y="36"
                width="30"
                height="30"
                rx="4"
                fill="#EFF1F4"
              />
              <rect
                className="ui-to-bar"
                x="52"
                y="38"
                width="100"
                height="6"
                rx="2"
                fill="#EFF1F4"
              />
              <rect
                className="ui-to-bar"
                x="52"
                y="46"
                width="100"
                height="6"
                rx="2"
                fill="#EFF1F4"
              />
              <rect
                className="ui-to-bar"
                x="52"
                y="54"
                width="35"
                height="6"
                rx="2"
                fill="#EFF1F4"
              />
              <rect
                className="ui-to-bar"
                x="12"
                y="72"
                width="140"
                height="6"
                rx="2"
                fill="#EFF1F4"
              />
              <rect
                className="ui-to-bar"
                x="12"
                y="80"
                width="140"
                height="6"
                rx="2"
                fill="#EFF1F4"
              />
              <rect
                className="ui-to-bar"
                x="12"
                y="88"
                width="55"
                height="6"
                rx="2"
                fill="#EFF1F4"
              />
            </g>
          </g>
        ))}

        {/* Active-window decoration (colored dots + outline), shown on one window at a time */}
        {windows.map(({ n, x, y }) => (
          <g key={n} className={`ui-to-front ui-to-front-${n}`}>
            <circle cx={x + 14} cy={y + 14} r="3" fill="#FF6B5C" />
            <circle cx={x + 24} cy={y + 14} r="3" fill="#FFB89E" />
            <circle cx={x + 34} cy={y + 14} r="3" fill="#A8B5FF" />
            <path
              d={`M ${x} 240 L ${x} ${y + 6} A 6 6 0 0 1 ${x + 6} ${y} L ${n === 3 ? 360 : x + 95} ${y}`}
              fill="none"
              stroke={`url(#${id}-stroke)`}
              strokeWidth="0.8"
            />
          </g>
        ))}
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
const t: RecoveredValue = (): RecoveredValue => React;
const t_jsx_runtime_CTsRTJUX: RecoveredValue = (): RecoveredValue =>
  React_jsx_runtime_CTsRTJUX;
var n_demo_CVKU8Uzh: RecoveredValue = t(),
  r: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i: RecoveredValue = [
    {
      n: 1,
      x: 30,
      y: 68,
    },
    {
      n: 2,
      x: 125,
      y: 56,
    },
    {
      n: 3,
      x: 220,
      y: 44,
    },
  ];
function ComponentA({
  className,
  label = `Three overlapping browser windows full of placeholder content`,
}: RecoveredValue): RecoveredValue {
  let a: RecoveredValue =
    `ui-to` + (0, n_demo_CVKU8Uzh.useId)().replace(/[^a-zA-Z0-9_-]/g, ``);
  return (
    <div
      className={[`ui-to`, className].filter(Boolean).join(` `)}
      role={`img`}
      aria-label={label}
    >
      <svg className={`ui-to-art`} viewBox={`0 0 360 240`} aria-hidden={`true`}>
        <defs>
          <linearGradient id={`${a}-blob-h`} x1={`0%`} y1={`0%`} x2={`100%`} y2={`0%`}>
            <stop offset={`0%`} stopColor={`#FFB89E`} stopOpacity={`0.3`} />
            <stop offset={`50%`} stopColor={`#C8A8E5`} stopOpacity={`0.3`} />
            <stop offset={`100%`} stopColor={`#A8B5FF`} stopOpacity={`0.3`} />
          </linearGradient>
          <linearGradient id={`${a}-blob-v`} x1={`0%`} y1={`100%`} x2={`0%`} y2={`0%`}>
            <stop offset={`0%`} stopColor={`#FF6B5C`} stopOpacity={`0.3`} />
            <stop offset={`100%`} stopColor={`#FFB89E`} stopOpacity={`0.3`} />
          </linearGradient>
          <filter id={`${a}-blur`} x={`-200%`} y={`-200%`} width={`500%`} height={`500%`}>
            <feGaussianBlur stdDeviation={`12`} />
          </filter>
          <linearGradient id={`${a}-stroke`} x1={`100%`} y1={`0%`} x2={`0%`} y2={`100%`}>
            <stop offset={`0%`} stopColor={`#B5C0FF`} />
            <stop offset={`40%`} stopColor={`#D5BBEF`} />
            <stop offset={`75%`} stopColor={`#FFC5AB`} />
            <stop offset={`100%`} stopColor={`#FFB5BC`} />
          </linearGradient>
        </defs>
        {i.map(
          ({ n: e, x, y }: RecoveredValue): RecoveredValue => (
            <g key={e}>
              <g className={`ui-to-blobs ui-to-blobs-${e}`}>
                <ellipse
                  cx={x + 70}
                  cy={y + 8}
                  rx={`90`}
                  ry={`14`}
                  fill={`url(#${a}-blob-h)`}
                  filter={`url(#${a}-blur)`}
                />
                <ellipse
                  cx={x + 8}
                  cy={y + 96}
                  rx={`14`}
                  ry={`90`}
                  fill={`url(#${a}-blob-v)`}
                  filter={`url(#${a}-blur)`}
                />
              </g>
              <g
                className={`ui-to-tab ui-to-tab-${e}`}
                transform={`translate(${x} ${y})`}
              >
                <rect
                  className={`ui-to-frame`}
                  width={`380`}
                  height={`300`}
                  rx={`6`}
                  fill={`#F4F5F7`}
                  stroke={`#E4E7EC`}
                  strokeWidth={`0.7`}
                />
                <circle
                  className={`ui-to-dot`}
                  cx={`14`}
                  cy={`14`}
                  r={`3`}
                  fill={`#CCCCCC`}
                />
                <circle
                  className={`ui-to-dot`}
                  cx={`24`}
                  cy={`14`}
                  r={`3`}
                  fill={`#CCCCCC`}
                />
                <circle
                  className={`ui-to-dot`}
                  cx={`34`}
                  cy={`14`}
                  r={`3`}
                  fill={`#CCCCCC`}
                />
                <rect
                  className={`ui-to-page`}
                  x={`4`}
                  y={`24`}
                  width={`372`}
                  height={`272`}
                  rx={`5`}
                  fill={`#FFFFFF`}
                  stroke={`#E4E7EC`}
                  strokeWidth={`0.7`}
                />
              </g>
              <g
                className={`ui-to-content ui-to-content-${e}`}
                transform={`translate(${x} ${y})`}
              >
                <rect
                  className={`ui-to-bar`}
                  x={`12`}
                  y={`36`}
                  width={`30`}
                  height={`30`}
                  rx={`4`}
                  fill={`#EFF1F4`}
                />
                <rect
                  className={`ui-to-bar`}
                  x={`52`}
                  y={`38`}
                  width={`100`}
                  height={`6`}
                  rx={`2`}
                  fill={`#EFF1F4`}
                />
                <rect
                  className={`ui-to-bar`}
                  x={`52`}
                  y={`46`}
                  width={`100`}
                  height={`6`}
                  rx={`2`}
                  fill={`#EFF1F4`}
                />
                <rect
                  className={`ui-to-bar`}
                  x={`52`}
                  y={`54`}
                  width={`35`}
                  height={`6`}
                  rx={`2`}
                  fill={`#EFF1F4`}
                />
                <rect
                  className={`ui-to-bar`}
                  x={`12`}
                  y={`72`}
                  width={`140`}
                  height={`6`}
                  rx={`2`}
                  fill={`#EFF1F4`}
                />
                <rect
                  className={`ui-to-bar`}
                  x={`12`}
                  y={`80`}
                  width={`140`}
                  height={`6`}
                  rx={`2`}
                  fill={`#EFF1F4`}
                />
                <rect
                  className={`ui-to-bar`}
                  x={`12`}
                  y={`88`}
                  width={`55`}
                  height={`6`}
                  rx={`2`}
                  fill={`#EFF1F4`}
                />
              </g>
            </g>
          ),
        )}
        {i.map(
          ({ n: e, x, y }: RecoveredValue): RecoveredValue => (
            <g className={`ui-to-front ui-to-front-${e}`} key={e}>
              <circle cx={x + 14} cy={y + 14} r={`3`} fill={`#FF6B5C`} />
              <circle cx={x + 24} cy={y + 14} r={`3`} fill={`#FFB89E`} />
              <circle cx={x + 34} cy={y + 14} r={`3`} fill={`#A8B5FF`} />
              <path
                d={`M ${x} 240 L ${x} ${y + 6} A 6 6 0 0 1 ${x + 6} ${y} L ${e === 3 ? 360 : x + 95} ${y}`}
                fill={`none`}
                stroke={`url(#${a}-stroke)`}
                strokeWidth={`0.8`}
              />
            </g>
          ),
        )}
      </svg>
    </div>
  );
}
function Runtime(): RecoveredValue {
  return (
    <div className={`tab-overload-demo`}>
      <ComponentA />
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
export { TabOverload };
export type { TabOverloadProps };
