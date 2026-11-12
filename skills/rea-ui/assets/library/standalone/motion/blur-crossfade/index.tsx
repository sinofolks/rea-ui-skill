"use client";

import "./BlurCrossfade.css";
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
var n_demo_Ye53Zfy1: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_Ye53Zfy1: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_Ye53Zfy1: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` &&
    window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;
function ComponentA({
  id,
  children,
  duration = 420,
  blur = 10,
  morph = `height`,
  as: ComponentAs = `div`,
  className,
  style,
}: RecoveredValue): RecoveredValue {
  let f: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)(null),
    p: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)(null),
    [m, h]: RecoveredValue = (0, n_demo_Ye53Zfy1.useState)(null),
    g: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)(id),
    _: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)(children),
    v: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)({
      w: 0,
      h: 0,
    }),
    y: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)(!1),
    b: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)(0),
    x: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)(0);
  ((0, n_demo_Ye53Zfy1.useLayoutEffect)((): RecoveredValue => {
    let n: RecoveredValue = f.current,
      r: RecoveredValue = p.current;
    if (id === g.current || !n || !r) {
      _.current = children;
      return;
    }
    g.current = id;
    let o: RecoveredValue = _.current;
    ((_.current = children), window.clearTimeout(b.current));
    let s: RecoveredValue = {
      w: r.offsetWidth,
      h: r.offsetHeight,
    };
    if (i_demo_Ye53Zfy1() || duration <= 0) {
      (h(null),
        (n.style.height = n.style.width = n.style.transition = ``),
        n.removeAttribute(`data-busy`),
        (y.current = !1),
        (v.current = s));
      return;
    }
    let l: RecoveredValue = n.getBoundingClientRect(),
      u: RecoveredValue = y.current
        ? {
            w: l.width,
            h: l.height,
          }
        : v.current;
    if (
      (h({
        id: g.current,
        node: o,
        n: ++x.current,
        w: v.current.w,
        h: v.current.h,
      }),
      (v.current = s),
      (y.current = !0),
      n.setAttribute(`data-busy`, ``),
      morph !== `none`)
    ) {
      ((n.style.transition = `none`),
        (n.style.height = `${u.h}px`),
        morph === `both` && (n.style.width = `${u.w}px`),
        n.offsetHeight);
      let e: RecoveredValue = `${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      ((n.style.transition =
        morph === `both` ? `height ${e}, width ${e}` : `height ${e}`),
        (n.style.height = `${s.h}px`),
        morph === `both` && (n.style.width = `${s.w}px`));
    }
    b.current = window.setTimeout((): RecoveredValue => {
      ((n.style.height = n.style.width = n.style.transition = ``),
        n.removeAttribute(`data-busy`),
        (y.current = !1),
        h(null));
    }, duration + 30);
  }),
    (0, n_demo_Ye53Zfy1.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = p.current;
      if (!e || typeof ResizeObserver > `u`) return;
      let t: RecoveredValue = new ResizeObserver((): RecoveredValue => {
        y.current ||
          (v.current = {
            w: e.offsetWidth,
            h: e.offsetHeight,
          });
      });
      return (
        t.observe(e),
        (v.current = {
          w: e.offsetWidth,
          h: e.offsetHeight,
        }),
        (): RecoveredValue => t.disconnect()
      );
    }, [id]),
    (0, n_demo_Ye53Zfy1.useEffect)(
      (): RecoveredValue => (): RecoveredValue => window.clearTimeout(b.current),
      [],
    ));
  let S: RecoveredValue = {
      "--ui-bx-duration": `${duration}ms`,
      "--ui-bx-blur": `${blur}px`,
      ...style,
    },
    C: RecoveredValue = ComponentAs;
  return (
    <r_demo_Ye53Zfy1.Fragment>
      <ComponentAs
        ref={f as RecoveredValue}
        className={[`ui-bx`, `ui-bx--${morph}`, className].filter(Boolean).join(` `)}
        style={S as RecoveredValue}
      >
        <C
          ref={p as RecoveredValue}
          className={`ui-bx__layer${m ? ` ui-bx__layer--in` : ``}`}
          children={children}
          key={`c-${id}`}
        />
        {m && (
          <C
            className={`ui-bx__layer ui-bx__layer--out`}
            aria-hidden={`true`}
            inert={!0}
            style={
              {
                width: m.w || void 0,
              } as RecoveredValue
            }
            children={m.node}
            key={`x-${m.id}-${m.n}`}
          />
        )}
      </ComponentAs>
    </r_demo_Ye53Zfy1.Fragment>
  );
}
var s_demo_Ye53Zfy1: RecoveredValue = [
  {
    tag: `Shipped`,
    text: `Dark mode is live for everyone.`,
  },
  {
    tag: `Improved`,
    text: `Search now looks through comments and attachments too, and results show up while you type – no more waiting for the full page.`,
  },
  {
    tag: `Fixed`,
    text: `Exports keep their column order, even with hidden fields in between.`,
  },
];
function Runtime(): RecoveredValue {
  let e: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)(null),
    [t, i]: RecoveredValue = (0, n_demo_Ye53Zfy1.useState)(`idle`),
    [o, c]: RecoveredValue = (0, n_demo_Ye53Zfy1.useState)(0),
    l: RecoveredValue = (0, n_demo_Ye53Zfy1.useRef)([]),
    u: RecoveredValue = (): RecoveredValue => {
      t === `idle` &&
        (i(`busy`),
        l.current.push(
          window.setTimeout((): RecoveredValue => i(`done`), 1500),
          window.setTimeout((): RecoveredValue => i(`idle`), 3600),
        ));
    },
    d: RecoveredValue = (): RecoveredValue =>
      c((e?: RecoveredValue): RecoveredValue => (e + 1) % s_demo_Ye53Zfy1.length);
  ((0, n_demo_Ye53Zfy1.useEffect)(
    (): RecoveredValue => (): RecoveredValue =>
      l.current.forEach((e?: RecoveredValue): RecoveredValue => window.clearTimeout(e)),
    [],
  ),
    (0, n_demo_Ye53Zfy1.useEffect)((): RecoveredValue => {
      if (!e.current?.closest(`.card__preview`)) return;
      let t: RecoveredValue = 0,
        n: RecoveredValue = window.setInterval((): RecoveredValue => {
          (t++,
            t % 2
              ? c(
                  (e?: RecoveredValue): RecoveredValue =>
                    (e + 1) % s_demo_Ye53Zfy1.length,
                )
              : i(
                  (e?: RecoveredValue): RecoveredValue =>
                    e === `idle` ? `busy` : e === `busy` ? `done` : `idle`,
                ));
        }, 1300);
      return (): RecoveredValue => window.clearInterval(n);
    }, []));
  let f: RecoveredValue = s_demo_Ye53Zfy1[o];
  return (
    <div className={`blur-crossfade-demo`} ref={e as RecoveredValue}>
      <div className={`bxd-card`}>
        <div className={`bxd-head`}>
          <div className={`bxd-meta`}>
            <span className={`bxd-title`}>{`Release 2.4`}</span>
            <span className={`bxd-sub`}>{`3 changes · draft`}</span>
          </div>
          <button
            type={`button`}
            className={`bxd-primary`}
            data-status={t}
            onClick={u}
            aria-live={`polite`}
          >
            <ComponentA id={t} morph={`both`} as={`span`} blur={6} duration={380}>
              {t === `idle` && <span className={`bxd-btn`}>{`Publish`}</span>}
              {t === `busy` && (
                <span className={`bxd-btn`}>
                  <span className={`bxd-spin`} aria-hidden={`true`} />
                  {`Publishing…`}
                </span>
              )}
              {t === `done` && (
                <span className={`bxd-btn`}>
                  <svg
                    viewBox={`0 0 16 16`}
                    width={`14`}
                    height={`14`}
                    fill={`none`}
                    stroke={`currentColor`}
                    strokeWidth={`1.8`}
                    strokeLinecap={`round`}
                    strokeLinejoin={`round`}
                    aria-hidden={`true`}
                  >
                    <path d={`M3.5 8.5l3 3 6-7`} />
                  </svg>
                  {`Published`}
                </span>
              )}
            </ComponentA>
          </button>
        </div>
        <div className={`bxd-panel`}>
          <ComponentA id={o}>
            <div className={`bxd-note`}>
              <span className={`bxd-tag`} data-kind={f.tag}>
                {f.tag}
              </span>
              <p>{f.text}</p>
            </div>
          </ComponentA>
        </div>
        <div className={`bxd-foot`}>
          <span className={`bxd-dots`} aria-hidden={`true`}>
            {s_demo_Ye53Zfy1.map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <i data-on={t === o || void 0} key={t} />
              ),
            )}
          </span>
          <button type={`button`} className={`bxd-chip`} onClick={d}>{`Next`}</button>
        </div>
      </div>
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
