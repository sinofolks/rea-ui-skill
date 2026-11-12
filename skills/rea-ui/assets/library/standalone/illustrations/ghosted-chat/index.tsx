"use client";

import "./GhostedChat.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import { type ReactElement, useEffect, useRef, useState } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Ghosted Chat – a small card illustration, in component logic and public types.
 * Three unanswered outgoing messages, the last one with a red shine and a soft glow, marked "Read".
 * On hover a thumbs-down reply pops in.
 * The scene is laid out on a 360 × 240 artboard and scaled to the width of its container.
 */
const W = 360;
type GhostedChatProps = {
  className?: string;
  /** Accessible description of the scene */
  label?: string;
};
function GhostedChat({
  className,
  label = "A chat with three unanswered messages marked as read",
}: GhostedChatProps) {
  const root = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  // The messages arrive one by one once the scene scrolls into view
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  // Scale the artboard to the container width
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / W);
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={root}
      className={["ui-gc", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={label}
    >
      {/* React 19 hoists this into <head> once, no matter how many instances render */}

      <div
        className="ui-gc-stage"
        aria-hidden="true"
        data-play={play || undefined}
        style={{
          transform: `scale(${scale})`,
          visibility: scale > 0 ? "visible" : "hidden",
        }}
      >
        <div className="ui-gc-content">
          <span className="ui-gc-status">No new messages</span>
          <div className="ui-gc-bubbles">
            <div className="ui-gc-bubble">
              <span>Hi team!</span>
            </div>
            <div className="ui-gc-bubble">
              <span>Are you by any chance looking for a recruiter?</span>
            </div>
            <div className="ui-gc-bubble ui-gc-bubble-last">
              <span className="ui-gc-alert">Hello?</span>
            </div>
            <span className="ui-gc-read">Read</span>
          </div>
          <div className="ui-gc-bubble ui-gc-reply">
            <span>👎</span>
          </div>
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
var n_demo_Cm2FVMWj: RecoveredValue = t_react_BkAXpnfr(),
  r: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i: RecoveredValue = 360;
function ComponentA({
  className,
  label = `A chat with three unanswered messages marked as read`,
}: RecoveredValue): RecoveredValue {
  let a: RecoveredValue = (0, n_demo_Cm2FVMWj.useRef)(null),
    [s, c]: RecoveredValue = (0, n_demo_Cm2FVMWj.useState)(0),
    [l, u]: RecoveredValue = (0, n_demo_Cm2FVMWj.useState)(!1);
  return (
    (0, n_demo_Cm2FVMWj.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = a.current;
      if (!e) return;
      let t: RecoveredValue = new IntersectionObserver(
        ([e]: RecoveredValue): RecoveredValue => {
          e.isIntersecting && (u(!0), t.disconnect());
        },
        {
          threshold: 0.35,
        },
      );
      return (t.observe(e), (): RecoveredValue => t.disconnect());
    }, []),
    (0, n_demo_Cm2FVMWj.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = a.current;
      if (!e) return;
      let t: RecoveredValue = (): RecoveredValue => c(e.clientWidth / i);
      t();
      let n: RecoveredValue = new ResizeObserver(t);
      return (n.observe(e), (): RecoveredValue => n.disconnect());
    }, []),
    (
      <div
        ref={a as RecoveredValue}
        className={[`ui-gc`, className].filter(Boolean).join(` `)}
        role={`img`}
        aria-label={label}
      >
        <div
          className={`ui-gc-stage`}
          aria-hidden={`true`}
          data-play={l || void 0}
          style={
            {
              transform: `scale(${s})`,
              visibility: s > 0 ? `visible` : `hidden`,
            } as RecoveredValue
          }
        >
          <div className={`ui-gc-content`}>
            <span className={`ui-gc-status`}>{`No new messages`}</span>
            <div className={`ui-gc-bubbles`}>
              <div className={`ui-gc-bubble`}>
                <span>{`Hi team!`}</span>
              </div>
              <div className={`ui-gc-bubble`}>
                <span>{`Are you by any chance looking for a recruiter?`}</span>
              </div>
              <div className={`ui-gc-bubble ui-gc-bubble-last`}>
                <span className={`ui-gc-alert`}>{`Hello?`}</span>
              </div>
              <span className={`ui-gc-read`}>{`Read`}</span>
            </div>
            <div className={`ui-gc-bubble ui-gc-reply`}>
              <span>{`👎`}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
function Runtime(): RecoveredValue {
  return (
    <div className={`ghosted-chat-demo`}>
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
export { GhostedChat };
export type { GhostedChatProps };
