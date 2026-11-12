"use client";

import "./GradientText.css";
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
var n_demo_Dcdtba_V: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_Dcdtba_V: RecoveredValue = t_jsx_runtime_CTsRTJUX();
function ComponentI({
  children,
  colors,
  speed = 8,
  sweep = !0,
  as: ComponentAs = `span`,
  className,
}: RecoveredValue): RecoveredValue {
  let l: RecoveredValue = (0, n_demo_Dcdtba_V.useRef)(null),
    [u, d]: RecoveredValue = (0, n_demo_Dcdtba_V.useState)(sweep ? `idle` : `in`);
  (0, n_demo_Dcdtba_V.useEffect)((): RecoveredValue => {
    if (!sweep) return d(`in`);
    let e: RecoveredValue = l.current;
    if (!e || typeof IntersectionObserver > `u`) return d(`in`);
    let t: RecoveredValue = new IntersectionObserver(
      (e?: RecoveredValue): RecoveredValue => {
        e.some((e?: RecoveredValue): RecoveredValue => e.isIntersecting) &&
          (d(`in`), t.disconnect());
      },
      {
        threshold: 0.6,
      },
    );
    return (t.observe(e), (): RecoveredValue => t.disconnect());
  }, [sweep]);
  let f: RecoveredValue = {
    "--ui-gt-speed": `${speed}s`,
  };
  if (colors?.length) {
    let [e, n = e, r = e, i = n]: RecoveredValue = colors;
    Object.assign(f, {
      "--ui-gt-c1": e,
      "--ui-gt-c2": n,
      "--ui-gt-c3": r,
      "--ui-gt-c4": i,
    });
  }
  return (
    <ComponentAs
      ref={l as RecoveredValue}
      className={[`ui-gt`, className].filter(Boolean).join(` `)}
      data-state={u}
      data-sweep={sweep ? `` : void 0}
      style={f as RecoveredValue}
    >
      <span className={`ui-gt__base`}>{children}</span>
      <span className={`ui-gt__fill`} aria-hidden={`true`}>
        {children}
      </span>
    </ComponentAs>
  );
}
function Runtime(): RecoveredValue {
  let [e, t]: RecoveredValue = (0, n_demo_Dcdtba_V.useState)(0);
  return (
    <div className={`gradient-text-demo`}>
      <h2 className={`gradient-text-demo__title`}>
        {`Interfaces people actually`}
        {` `}
        <ComponentI children={`feel.`} key={e} />
      </h2>
      <button
        type={`button`}
        className={`gradient-text-demo__replay`}
        onClick={(): RecoveredValue => t((e?: RecoveredValue): RecoveredValue => e + 1)}
      >{`Replay`}</button>
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
