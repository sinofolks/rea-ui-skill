"use client";

import "./GridBackground.css";
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
 * Grid Background – a fine line grid behind your content, in component logic and public types.
 * The grid drifts slowly by one cell per loop and fades out towards the edges through a radial mask.
 * On first view it can be uncovered by a circle that grows from the center.
 * Reduced motion: the grid stays still and appears without the reveal.
 */
type GridDirection = "up" | "down" | "left" | "right" | "diagonal";
type GridBackgroundProps = {
  /** Content rendered above the grid */
  children?: ReactNode;
  /** Cell size in px */
  size?: number;
  /** Line color – defaults to a faint black, or a faint white in dark mode */
  color?: string;
  /** Seconds per cell; 0 keeps the grid still */
  speed?: number;
  /** Drift direction; "diagonal" runs from top right to bottom left */
  direction?: GridDirection;
  /** Uncover the grid with a growing circle when it first comes into view */
  reveal?: boolean;
  /** Radius of the edge fade, in % of the distance to the corners */
  fade?: number;
  className?: string;
};
const offsets: Record<GridDirection, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
  diagonal: [-1, 1],
};
function GridBackground({
  children,
  size = 48,
  color,
  speed = 3,
  direction = "diagonal",
  reveal = true,
  fade = 70,
  className,
}: GridBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(!reveal);
  // Reveal once the grid scrolls into view (right away with reduced motion or without IntersectionObserver)
  useEffect(() => {
    if (!reveal) return setShown(true);
    const el = ref.current;
    if (
      !el ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reveal]);
  const [dx, dy] = offsets[direction] ?? offsets.diagonal;
  const style = {
    "--ui-gb-size": `${size}px`,
    "--ui-gb-dx": `${dx * size}px`,
    "--ui-gb-dy": `${dy * size}px`,
    "--ui-gb-speed": `${Math.max(speed, 0)}s`,
    "--ui-gb-fade": `${fade}%`,
    ...(color ? { "--ui-gb-line": color } : {}),
  } as CSSProperties;
  return (
    <div
      ref={ref}
      className={["ui-gb", className].filter(Boolean).join(" ")}
      style={style}
      data-reveal={reveal ? "" : undefined}
      data-shown={shown ? "" : undefined}
      data-static={speed > 0 ? undefined : ""}
    >
      {/* React 19 hoists this into <head> once, no matter how many instances render */}

      <div className="ui-gb-grid" aria-hidden="true">
        <div className="ui-gb-reveal">
          <div className="ui-gb-lines" />
        </div>
      </div>
      <div className="ui-gb-content">{children}</div>
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
  i: RecoveredValue = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
    diagonal: [-1, 1],
  };
function ComponentA({
  children,
  size = 48,
  color,
  speed = 3,
  direction = `diagonal`,
  reveal = !0,
  fade = 70,
  className,
}: RecoveredValue): RecoveredValue {
  let f: RecoveredValue = (0, n.useRef)(null),
    [p, m]: RecoveredValue = (0, n.useState)(!reveal);
  (0, n.useEffect)((): RecoveredValue => {
    if (!reveal) return m(!0);
    let e: RecoveredValue = f.current;
    if (
      !e ||
      typeof IntersectionObserver > `u` ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
    ) {
      m(!0);
      return;
    }
    let t: RecoveredValue = new IntersectionObserver(
      (e?: RecoveredValue): RecoveredValue => {
        e.some((e?: RecoveredValue): RecoveredValue => e.isIntersecting) &&
          (m(!0), t.disconnect());
      },
      {
        threshold: 0.2,
      },
    );
    return (t.observe(e), (): RecoveredValue => t.disconnect());
  }, [reveal]);
  let [h, g]: RecoveredValue = i[direction] ?? i.diagonal,
    _: RecoveredValue = {
      "--ui-gb-size": `${size}px`,
      "--ui-gb-dx": `${h * size}px`,
      "--ui-gb-dy": `${g * size}px`,
      "--ui-gb-speed": `${Math.max(speed, 0)}s`,
      "--ui-gb-fade": `${fade}%`,
      ...(color
        ? {
            "--ui-gb-line": color,
          }
        : {}),
    };
  return (
    <div
      ref={f as RecoveredValue}
      className={[`ui-gb`, className].filter(Boolean).join(` `)}
      style={_ as RecoveredValue}
      data-reveal={reveal ? `` : void 0}
      data-shown={p ? `` : void 0}
      data-static={speed > 0 ? void 0 : ``}
    >
      <div className={`ui-gb-grid`} aria-hidden={`true`}>
        <div className={`ui-gb-reveal`}>
          <div className={`ui-gb-lines`} />
        </div>
      </div>
      <div className={`ui-gb-content`}>{children}</div>
    </div>
  );
}
function Runtime(): RecoveredValue {
  return (
    <div className={`grid-background-demo`}>
      <ComponentA className={`grid-background-demo__panel`}>
        <div className={`grid-background-demo__inner`}>
          <span className={`grid-background-demo__pill`}>{`New`}</span>
          <h3 className={`grid-background-demo__title`}>{`Build on a steady grid`}</h3>
          <p
            className={`grid-background-demo__sub`}
          >{`A quiet backdrop that keeps moving, so your hero never feels static.`}</p>
        </div>
      </ComponentA>
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
export { GridBackground };
export type { GridDirection };
export type { GridBackgroundProps };
