"use client";

import "./EmptyCalendar.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import { type ReactElement, useId } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Empty Calendar – a small card illustration, in component logic and public types.
 * Three stacked calendar cards with an "Empty" badge and a disabled "Join meeting" button.
 * Hover the front card to lift it, hover a back card to slide it further out.
 * The artwork is drawn on a 320 × 240 viewBox inside a 3 : 2 frame.
 */
type EmptyCalendarProps = {
  className?: string;
  /** Accessible description of the scene */
  label?: string;
};
function EmptyCalendar({
  className,
  label = "Stacked calendar cards marked empty, with a disabled join meeting button",
}: EmptyCalendarProps) {
  const id = "ui-ec" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <div
      className={["ui-ec", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={label}
    >
      {/* React 19 hoists this into <head> once, no matter how many instances render */}

      <svg className="ui-ec-art" viewBox="0 0 320 240" aria-hidden="true">
        <defs>
          <filter id={`${id}-blur`} x="-30%" y="-100%" width="160%" height="300%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              className="ui-ec-drop"
              dx="0"
              dy="3"
              stdDeviation="4"
              floodColor="#000000"
              floodOpacity="0.06"
            />
          </filter>
          <linearGradient id={`${id}-blob`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFA0AB" stopOpacity="0.25" />
            <stop offset="33%" stopColor="#FFB89E" stopOpacity="0.25" />
            <stop offset="66%" stopColor="#C8A8E5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#A8B5FF" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id={`${id}-stroke`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop className="ui-ec-edge" offset="0%" stopColor="#E4E7EC" />
            <stop offset="18%" stopColor="#FFB5BC" />
            <stop offset="40%" stopColor="#FFC5AB" />
            <stop offset="60%" stopColor="#D5BBEF" />
            <stop offset="82%" stopColor="#B5C0FF" />
            <stop className="ui-ec-edge" offset="100%" stopColor="#E4E7EC" />
          </linearGradient>
        </defs>

        <g transform="translate(30 47) scale(0.814)">
          {/* Back cards – hover to slide them out further */}
          <g className="ui-ec-back ui-ec-back-left">
            <CalendarCard shadow={`url(#${id}-shadow)`} />
          </g>
          <g className="ui-ec-back ui-ec-back-right">
            <CalendarCard shadow={`url(#${id}-shadow)`} />
          </g>

          {/* Front card with a soft colored glow underneath */}
          <g className="ui-ec-front">
            <ellipse
              className="ui-ec-blob"
              cx="160"
              cy="152"
              rx="125"
              ry="35"
              fill={`url(#${id}-blob)`}
              filter={`url(#${id}-blur)`}
            />
            <CalendarCard shadow={`url(#${id}-shadow)`} />
            {/* Colored bottom edge, matching the glow */}
            <path
              d="M40 150 A 10 10 0 0 0 50 160 L270 160 A 10 10 0 0 0 280 150"
              fill="none"
              stroke={`url(#${id}-stroke)`}
              strokeWidth="0.5"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
/** One calendar card: title, "Empty" badge, placeholder lines and a disabled button */
function CalendarCard({ shadow }: { shadow: string }) {
  return (
    <>
      <rect
        className="ui-ec-card"
        x="40"
        y="20"
        width="240"
        height="140"
        rx="10"
        fill="#FFFFFF"
        stroke="#E4E7EC"
        strokeWidth="0.5"
        filter={shadow}
      />
      <text
        className="ui-ec-title"
        x="56"
        y="48"
        fontSize="13"
        fontWeight="500"
        fill="#8A8A8A"
      >
        Calendar
      </text>
      <g transform="translate(218 34)">
        <rect className="ui-ec-badge" width="46" height="18" rx="5" fill="#FEF8EF" />
        <text
          x="23"
          y="12"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.06em"
          fill="#FAB082"
        >
          EMPTY
        </text>
      </g>
      <rect
        className="ui-ec-bar"
        x="56"
        y="64"
        width="208"
        height="7"
        rx="2"
        fill="#EFF1F4"
      />
      <rect
        className="ui-ec-bar"
        x="56"
        y="74"
        width="208"
        height="7"
        rx="2"
        fill="#EFF1F4"
      />
      <rect
        className="ui-ec-bar"
        x="56"
        y="84"
        width="168"
        height="7"
        rx="2"
        fill="#EFF1F4"
      />
      <g transform="translate(56 104)">
        <rect
          className="ui-ec-btn"
          width="208"
          height="40"
          rx="8"
          fill="#F4F4F6"
          stroke="#E4E7EC"
          strokeWidth="0.5"
        />
        {/* "Not available" icon + label, centered together */}
        <g
          className="ui-ec-btn-ink"
          transform="translate(64 14)"
          fill="none"
          stroke="#9A9AA3"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6" cy="6" r="5" />
          <line x1="2.5" y1="9.5" x2="9.5" y2="2.5" />
        </g>
        <text
          className="ui-ec-btn-label"
          x="84"
          y="24"
          fontSize="10"
          fontWeight="500"
          fill="#9A9AA3"
        >
          Join meeting
        </text>
      </g>
    </>
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
var n: RecoveredValue = t(),
  r: RecoveredValue = t_jsx_runtime_CTsRTJUX();
function ComponentI({
  className,
  label = `Stacked calendar cards marked empty, with a disabled join meeting button`,
}: RecoveredValue): RecoveredValue {
  let i: RecoveredValue = `ui-ec` + (0, n.useId)().replace(/[^a-zA-Z0-9_-]/g, ``);
  return (
    <div
      className={[`ui-ec`, className].filter(Boolean).join(` `)}
      role={`img`}
      aria-label={label}
    >
      <svg className={`ui-ec-art`} viewBox={`0 0 320 240`} aria-hidden={`true`}>
        <defs>
          <filter id={`${i}-blur`} x={`-30%`} y={`-100%`} width={`160%`} height={`300%`}>
            <feGaussianBlur stdDeviation={`14`} />
          </filter>
          <filter id={`${i}-shadow`} x={`-20%`} y={`-20%`} width={`140%`} height={`140%`}>
            <feDropShadow
              className={`ui-ec-drop`}
              dx={`0`}
              dy={`3`}
              stdDeviation={`4`}
              floodColor={`#000000`}
              floodOpacity={`0.06`}
            />
          </filter>
          <linearGradient id={`${i}-blob`} x1={`0%`} y1={`0%`} x2={`100%`} y2={`0%`}>
            <stop offset={`0%`} stopColor={`#FFA0AB`} stopOpacity={`0.25`} />
            <stop offset={`33%`} stopColor={`#FFB89E`} stopOpacity={`0.25`} />
            <stop offset={`66%`} stopColor={`#C8A8E5`} stopOpacity={`0.25`} />
            <stop offset={`100%`} stopColor={`#A8B5FF`} stopOpacity={`0.25`} />
          </linearGradient>
          <linearGradient id={`${i}-stroke`} x1={`0%`} y1={`0%`} x2={`100%`} y2={`0%`}>
            <stop className={`ui-ec-edge`} offset={`0%`} stopColor={`#E4E7EC`} />
            <stop offset={`18%`} stopColor={`#FFB5BC`} />
            <stop offset={`40%`} stopColor={`#FFC5AB`} />
            <stop offset={`60%`} stopColor={`#D5BBEF`} />
            <stop offset={`82%`} stopColor={`#B5C0FF`} />
            <stop className={`ui-ec-edge`} offset={`100%`} stopColor={`#E4E7EC`} />
          </linearGradient>
        </defs>
        <g transform={`translate(30 47) scale(0.814)`}>
          <g className={`ui-ec-back ui-ec-back-left`}>
            <ComponentA shadow={`url(#${i}-shadow)`} />
          </g>
          <g className={`ui-ec-back ui-ec-back-right`}>
            <ComponentA shadow={`url(#${i}-shadow)`} />
          </g>
          <g className={`ui-ec-front`}>
            <ellipse
              className={`ui-ec-blob`}
              cx={`160`}
              cy={`152`}
              rx={`125`}
              ry={`35`}
              fill={`url(#${i}-blob)`}
              filter={`url(#${i}-blur)`}
            />
            <ComponentA shadow={`url(#${i}-shadow)`} />
            <path
              d={`M40 150 A 10 10 0 0 0 50 160 L270 160 A 10 10 0 0 0 280 150`}
              fill={`none`}
              stroke={`url(#${i}-stroke)`}
              strokeWidth={`0.5`}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
function ComponentA({ shadow }: RecoveredValue): RecoveredValue {
  return (
    <r.Fragment>
      <rect
        className={`ui-ec-card`}
        x={`40`}
        y={`20`}
        width={`240`}
        height={`140`}
        rx={`10`}
        fill={`#FFFFFF`}
        stroke={`#E4E7EC`}
        strokeWidth={`0.5`}
        filter={shadow}
      />
      <text
        className={`ui-ec-title`}
        x={`56`}
        y={`48`}
        fontSize={`13`}
        fontWeight={`500`}
        fill={`#8A8A8A`}
      >{`Calendar`}</text>
      <g transform={`translate(218 34)`}>
        <rect
          className={`ui-ec-badge`}
          width={`46`}
          height={`18`}
          rx={`5`}
          fill={`#FEF8EF`}
        />
        <text
          x={`23`}
          y={`12`}
          textAnchor={`middle`}
          fontSize={`9`}
          fontWeight={`600`}
          letterSpacing={`0.06em`}
          fill={`#FAB082`}
        >{`EMPTY`}</text>
      </g>
      <rect
        className={`ui-ec-bar`}
        x={`56`}
        y={`64`}
        width={`208`}
        height={`7`}
        rx={`2`}
        fill={`#EFF1F4`}
      />
      <rect
        className={`ui-ec-bar`}
        x={`56`}
        y={`74`}
        width={`208`}
        height={`7`}
        rx={`2`}
        fill={`#EFF1F4`}
      />
      <rect
        className={`ui-ec-bar`}
        x={`56`}
        y={`84`}
        width={`168`}
        height={`7`}
        rx={`2`}
        fill={`#EFF1F4`}
      />
      <g transform={`translate(56 104)`}>
        <rect
          className={`ui-ec-btn`}
          width={`208`}
          height={`40`}
          rx={`8`}
          fill={`#F4F4F6`}
          stroke={`#E4E7EC`}
          strokeWidth={`0.5`}
        />
        <g
          className={`ui-ec-btn-ink`}
          transform={`translate(64 14)`}
          fill={`none`}
          stroke={`#9A9AA3`}
          strokeWidth={`1.3`}
          strokeLinecap={`round`}
          strokeLinejoin={`round`}
        >
          <circle cx={`6`} cy={`6`} r={`5`} />
          <line x1={`2.5`} y1={`9.5`} x2={`9.5`} y2={`2.5`} />
        </g>
        <text
          className={`ui-ec-btn-label`}
          x={`84`}
          y={`24`}
          fontSize={`10`}
          fontWeight={`500`}
          fill={`#9A9AA3`}
        >{`Join meeting`}</text>
      </g>
    </r.Fragment>
  );
}
function Runtime(): RecoveredValue {
  return (
    <div className={`empty-calendar-demo`}>
      <ComponentI />
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
export { EmptyCalendar };
export type { EmptyCalendarProps };
