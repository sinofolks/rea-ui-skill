"use client";

import "./ShimmerLoader.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import type { ReactElement, CSSProperties, ReactNode } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Shimmer Loader – loading states with a soft light sweep, in component logic and public types.
 * Skeleton draws placeholder blocks; the highlight is pinned to the viewport (background-attachment: fixed),
 * so every skeleton on the page shares one sweep that travels across them together. ShimmerText runs a
 * highlight band through the letters of a label, like an AI "Thinking…" state. The styles are injected below.
 */
type SkeletonProps = {
  /** Width – a number is px, a string any CSS length; defaults to 100% */
  width?: number | string;
  /** Height – a number is px, a string any CSS length; defaults to 12px */
  height?: number | string;
  /** Corner radius; defaults to 6px */
  radius?: number | string;
  /** Round shape, e.g. for avatars – uses width for both sides */
  circle?: boolean;
  className?: string;
  style?: CSSProperties;
};
type ShimmerTextProps = {
  children: ReactNode;
  /** Seconds for one pass of the highlight */
  duration?: number;
  className?: string;
};
const len = (v: number | string | undefined) => (typeof v === "number" ? `${v}px` : v);
const Style = () => null;
function Skeleton({ width, height, radius, circle, className, style }: SkeletonProps) {
  const w = len(width);
  return (
    <>
      <Style />
      <span
        className={["ui-shm", className].filter(Boolean).join(" ")}
        aria-hidden="true"
        style={{
          flexShrink: circle || typeof width === "number" ? 0 : undefined,
          width: w,
          height: circle ? (w ?? len(height)) : len(height),
          borderRadius: circle ? "50%" : len(radius),
          ...style,
        }}
      />
    </>
  );
}
function ShimmerText({ children, duration = 2, className }: ShimmerTextProps) {
  return (
    <>
      <Style />
      <span
        className={["ui-shm-text", className].filter(Boolean).join(" ")}
        style={{ "--ui-shm-text-dur": `${duration}s` } as CSSProperties}
      >
        {children}
      </span>
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
var n_demo_BH465McH: RecoveredValue = t_react_BkAXpnfr(),
  r: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_BH465McH: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    typeof e == `number` ? `${e}px` : e,
  ComponentA: RecoveredValue = (): RecoveredValue => null;
function ComponentO({
  width,
  height,
  radius,
  circle,
  className,
  style,
}: RecoveredValue): RecoveredValue {
  let l: RecoveredValue = i_demo_BH465McH(width);
  return (
    <r.Fragment>
      <ComponentA />
      <span
        className={[`ui-shm`, className].filter(Boolean).join(` `)}
        aria-hidden={`true`}
        style={
          {
            flexShrink: circle || typeof width == `number` ? 0 : void 0,
            width: l,
            height: circle ? (l ?? i_demo_BH465McH(height)) : i_demo_BH465McH(height),
            borderRadius: circle ? `50%` : i_demo_BH465McH(radius),
            ...style,
          } as RecoveredValue
        }
      />
    </r.Fragment>
  );
}
function ComponentS({
  children,
  duration = 2,
  className,
}: RecoveredValue): RecoveredValue {
  return (
    <r.Fragment>
      <ComponentA />
      <span
        className={[`ui-shm-text`, className].filter(Boolean).join(` `)}
        style={
          {
            "--ui-shm-text-dur": `${duration}s`,
          } as RecoveredValue
        }
      >
        {children}
      </span>
    </r.Fragment>
  );
}
var l_demo_BH465McH: RecoveredValue = [
  `#ffd6a8, #ff9f6b`,
  `#c7d7ff, #8aa7ff`,
  `#cdeccf, #7fcf9a`,
];
function Runtime(): RecoveredValue {
  let [e, t]: RecoveredValue = (0, n_demo_BH465McH.useState)(!0),
    [i, a]: RecoveredValue = (0, n_demo_BH465McH.useState)(0);
  return (
    (0, n_demo_BH465McH.useEffect)((): RecoveredValue => {
      let n: RecoveredValue = setTimeout(
        (): RecoveredValue => t((e?: RecoveredValue): RecoveredValue => !e),
        e ? 2500 : 3200,
      );
      return (): RecoveredValue => clearTimeout(n);
    }, [e, i]),
    (
      <div className={`shimmer-loader-demo`}>
        <div className={`shd-top`}>
          <ComponentS className={`shd-label`}>{`Generating summary…`}</ComponentS>
          <button
            type={`button`}
            className={`shd-btn`}
            onClick={(): RecoveredValue => {
              (t(!0), a((e?: RecoveredValue): RecoveredValue => e + 1));
            }}
          >{`Reload`}</button>
        </div>
        <div className={`shd-card`} aria-busy={e}>
          {e ? (
            <r.Fragment>
              <div className={`shd-row`}>
                <ComponentO circle={!0} width={36} />
                <div className={`shd-meta`}>
                  <ComponentO width={96} height={10} radius={5} />
                  <ComponentO width={64} height={8} radius={4} />
                </div>
              </div>
              <div className={`shd-lines`}>
                <ComponentO height={10} radius={5} />
                <ComponentO width={`72%`} height={10} radius={5} />
              </div>
              <div className={`shd-tiles`}>
                {l_demo_BH465McH.map(
                  (e?: RecoveredValue): RecoveredValue => (
                    <ComponentO height={56} radius={10} key={e} />
                  ),
                )}
              </div>
            </r.Fragment>
          ) : (
            <div className={`shd-loaded`}>
              <div className={`shd-row`}>
                <span className={`shd-avatar`}>{`MC`}</span>
                <div className={`shd-meta`}>
                  <span className={`shd-name`}>{`Maya Chen`}</span>
                  <span className={`shd-sub`}>{`Product design · 2h`}</span>
                </div>
              </div>
              <p
                className={`shd-text`}
              >{`New onboarding flow is live – activation is up 18% in the first week.`}</p>
              <div className={`shd-tiles`}>
                {l_demo_BH465McH.map(
                  (e?: RecoveredValue): RecoveredValue => (
                    <span
                      className={`shd-tile`}
                      style={
                        {
                          background: `linear-gradient(135deg, ${e})`,
                        } as RecoveredValue
                      }
                      key={e}
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
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
export { Skeleton };
export { ShimmerText };
export type { SkeletonProps };
export type { ShimmerTextProps };
