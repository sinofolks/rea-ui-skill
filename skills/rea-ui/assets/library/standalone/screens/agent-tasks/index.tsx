"use client";

import "./AgentTasks.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import type { ReactElement } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
import * as ReactDOM from "react-dom";
/** Explicit migration boundary for values whose original types were erased.
 * Keep this alias private. Replace usages with concrete types as internals are refactored.
 * Public component contracts never expose this type. See docs/type-migration.md.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecoveredValue = any;
var e_rolldown_runtime_BpQH8Ho1: RecoveredValue = Object.defineProperty,
  t_rolldown_runtime_BpQH8Ho1: RecoveredValue =
    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    (): RecoveredValue => (
      t ||
        (e(
          (t = {
            exports: {},
          }).exports,
          t,
        ),
        (e = null)),
      t.exports
    ),
  n_rolldown_runtime_BpQH8Ho1: RecoveredValue = (
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue => {
    let r: RecoveredValue = {};
    for (var i in t)
      e_rolldown_runtime_BpQH8Ho1(r, i, {
        get: t[i],
        enumerable: !0,
      });
    return (
      n ||
        e_rolldown_runtime_BpQH8Ho1(r, Symbol.toStringTag, {
          value: `Module`,
        }),
      r
    );
  };
const t_react_BkAXpnfr: RecoveredValue = (): RecoveredValue => React;
const t_jsx_runtime_CTsRTJUX: RecoveredValue = (): RecoveredValue =>
  React_jsx_runtime_CTsRTJUX;
const ne_index_BzMVbDoG = () => ReactDOM;
let uc = "";
var D_index_BzMVbDoG: RecoveredValue = t_react_BkAXpnfr();
var z_index_BzMVbDoG: RecoveredValue = t_jsx_runtime_CTsRTJUX();
var rc: RecoveredValue = new Set();
var ic: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  e.match(/^\/(new|components|screens|blocks|illustrations|motion)\/?$/)?.[1];
function ac(): RecoveredValue {
  let e: RecoveredValue = document.querySelector(`.panel`) as RecoveredValue;
  return e && getComputedStyle(e).overflowY === `auto` ? e : null;
}
var oc: RecoveredValue = (): RecoveredValue => ac()?.scrollTop ?? window.scrollY;
var sc: RecoveredValue = !1;
function lc(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = sc;
  sc = !1;
  let r: RecoveredValue =
      e === `new` || (e === `components` && !document.getElementById(`new`)),
    i: RecoveredValue = (): RecoveredValue =>
      r
        ? n
          ? document.getElementById(e)
          : null
        : ((document.querySelector(`#${e} .library__title`) as RecoveredValue) ??
          document.getElementById(e)),
    a: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = i();
      t
        ? t.scrollIntoView({
            block: `start`,
            behavior: e,
          })
        : (ac() ?? window).scrollTo({
            top: 0,
            behavior: e,
          });
    },
    o: RecoveredValue = !1,
    s: RecoveredValue = (): RecoveredValue => (o = !0),
    c: RecoveredValue = [`wheel`, `touchstart`, `keydown`, `pointerdown`];
  (c.forEach(
    (e?: RecoveredValue): RecoveredValue =>
      window.addEventListener(e, s, {
        passive: !0,
        once: !0,
      }),
  ),
    a(t ? `smooth` : `auto`),
    [t ? 900 : 200, 1300, 2200].forEach(
      (e?: RecoveredValue, t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
        window.setTimeout((): RecoveredValue => {
          let e: RecoveredValue = i(),
            r: RecoveredValue = e
              ? Math.abs(
                  e.getBoundingClientRect().top -
                    parseFloat(getComputedStyle(e).scrollMarginTop || `0`),
                )
              : oc();
          (!o && r > 4 && a(`auto`),
            t === n.length - 1 &&
              c.forEach(
                (e?: RecoveredValue): RecoveredValue => window.removeEventListener(e, s),
              ));
        }, e),
    ));
}
function dc(e?: RecoveredValue, t: RecoveredValue = !1): RecoveredValue {
  let n: RecoveredValue = window.location.pathname;
  if ((!t && e.split(`?`)[0] !== n && (uc = n), e === n + window.location.search)) {
    let t: RecoveredValue = ic(e);
    t && lc(t, !1);
    return;
  }
  (window.history[t ? `replaceState` : `pushState`](null, ``, e),
    rc.forEach((e?: RecoveredValue): RecoveredValue => e()),
    !(ic(n) && ic(e)) &&
      ((document.querySelector(`.panel`) as RecoveredValue)?.scrollTo({
        top: 0,
      }),
      window.scrollTo({
        top: 0,
      })));
}
var Id: RecoveredValue = (0, D_index_BzMVbDoG.createContext)(!1);
var Ld: RecoveredValue = 1440;
var Rd: RecoveredValue = (0, D_index_BzMVbDoG.createContext)(900);
function ComponentN({ children }: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = (0, D_index_BzMVbDoG.useContext)(Id),
    n: RecoveredValue = (0, D_index_BzMVbDoG.useContext)(Rd),
    r: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    [i, a]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(0);
  return (
    (0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = r.current;
      if (!e || t) return;
      let n: RecoveredValue = (): RecoveredValue => a(e.clientWidth / Ld);
      n();
      let i: RecoveredValue = new ResizeObserver(n);
      return (i.observe(e), (): RecoveredValue => i.disconnect());
    }, [t]),
    t ? (
      <div className={`screen-full`}>{children}</div>
    ) : (
      <div
        ref={r as RecoveredValue}
        className={`screen-stage`}
        style={
          {
            aspectRatio: `${Ld} / ${n}`,
          } as RecoveredValue
        }
      >
        {i > 0 && (
          <div
            className={`screen-stage__canvas`}
            style={
              {
                width: Ld,
                height: n,
                transform: `scale(${i})`,
              } as RecoveredValue
            }
          >
            {children}
          </div>
        )}
      </div>
    )
  );
}
var Bd: RecoveredValue = [`Q3 Campaign`, `Brand assets`, `Hiring`, `Research`];
var Vd: RecoveredValue = {
  "New chat": `assistant-home`,
  Folders: `files`,
  Integrations: `integrations`,
  Board: `kanban`,
  Chat: `agent-chat`,
  Companies: `crm`,
  Revenue: `analytics`,
  Analytics: `analytics`,
  Runs: `agent-run`,
  Evals: `evals`,
  Thread: `agent-thread`,
  Tasks: `agent-tasks`,
  Memory: `agent-memory`,
  Permissions: `agent-permissions`,
  Usage: `agent-usage`,
  Activity: `agent-activity`,
  Schedules: `agent-schedules`,
  "Agent Inbox": `inbox`,
  "Agent Orchestration": `agent-orchestration`,
  Settings: `settings-profile`,
  Profile: `settings-profile`,
  General: `settings-general`,
  Security: `settings-security`,
  Models: `settings-models`,
  Notifications: `settings-notifications`,
  Privacy: `settings-privacy`,
  Preferences: `settings-preferences`,
  Members: `settings-members`,
  Billing: `settings-subscription`,
  "Back to app": `assistant-home`,
};
function Hd(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = /\/full\/?$/.test(window.location.pathname),
    r: RecoveredValue = Bd.includes(e),
    i: RecoveredValue = Vd[e] ?? (r ? `folder` : null);
  if (!i) return;
  let a: RecoveredValue = new URLSearchParams({
      ...(r
        ? {
            folder: e,
          }
        : {}),
      ...t,
    }).toString(),
    o: RecoveredValue = a ? `?${a}` : ``;
  (dc(`/screens/${i}${n ? `/full` : ``}${o}`),
    window.dispatchEvent(new Event(`screen-query`)));
}
function Ud(): RecoveredValue {
  let e: RecoveredValue = (): RecoveredValue =>
      new URLSearchParams(
        typeof window === "undefined" ? "" : window.location.search,
      ).get(`folder`) ?? void 0,
    [t, n]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(e);
  return (
    (0, D_index_BzMVbDoG.useEffect)((): RecoveredValue => {
      let t: RecoveredValue = (): RecoveredValue => n(e());
      return (
        window.addEventListener(`screen-query`, t),
        window.addEventListener(`popstate`, t),
        (): RecoveredValue => {
          (window.removeEventListener(`screen-query`, t),
            window.removeEventListener(`popstate`, t));
        }
      );
    }, []),
    t
  );
}
var ip: RecoveredValue = `M38 0H176Q196 0 204 14L218 30Q224 38 246 38H562Q600 38 600 76V462Q600 500 562 500H38Q0 500 0 462V38Q0 0 38 0Z`;
var ap: RecoveredValue = [78, 180, 140, 175, 126, 168, 110];
function op({
  className,
  label = `Blue folder holding three documents behind a frosted front pocket`,
}: RecoveredValue): RecoveredValue {
  let n: RecoveredValue =
    `ui-fd` + (0, D_index_BzMVbDoG.useId)().replace(/[^a-zA-Z0-9_-]/g, ``);
  return (
    <div
      className={[`ui-fd`, className].filter(Boolean).join(` `)}
      role={`img`}
      aria-label={label}
    >
      <div className={`ui-fd-icon`} aria-hidden={`true`}>
        <svg className={`ui-fd-layer ui-fd-back`} viewBox={`0 0 600 500`}>
          <defs>
            <filter id={`${n}-hl`} x={`-10%`} y={`-10%`} width={`120%`} height={`120%`}>
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
          <path className={`ui-fd-back-fill`} d={ip} fill={`#5bb7ea`} />
          <path d={ip} fill={`#000`} filter={`url(#${n}-hl)`} />
        </svg>
        <svg className={`ui-fd-layer`} viewBox={`0 0 600 500`}>
          <defs>
            <linearGradient id={`${n}-paper`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
              <stop className={`ui-fd-paper-top`} offset={`0%`} stopColor={`#fff`} />
              <stop
                className={`ui-fd-paper-bottom`}
                offset={`100%`}
                stopColor={`#eaf2f8`}
              />
            </linearGradient>
            <symbol id={`${n}-doc`} overflow={`visible`}>
              <rect
                className={`ui-fd-paper`}
                x={`0.6`}
                y={`0.6`}
                width={`278.8`}
                height={`348.8`}
                rx={`19.4`}
                fill={`url(#${n}-paper)`}
                stroke={`rgba(0,0,0,0.12)`}
                strokeWidth={`1.2`}
              />
              {ap.map(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <rect
                    className={`ui-fd-line`}
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
          <use className={`ui-fd-doc ui-fd-doc--left`} href={`#${n}-doc`} />
          <use className={`ui-fd-doc ui-fd-doc--right`} href={`#${n}-doc`} />
          <use className={`ui-fd-doc ui-fd-doc--middle`} href={`#${n}-doc`} />
        </svg>
        <div className={`ui-fd-front`} />
      </div>
    </div>
  );
}
var kp: RecoveredValue = {
  queued: `Queued`,
  running: `Running`,
  waiting: `Needs you`,
  done: `Done`,
  failed: `Failed`,
  stopped: `Stopped`,
};
var Ap: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  e > 0 && e < 0.005
    ? `<$0.01`
    : `$${e < 10 ? e.toFixed(2) : Math.round(e).toLocaleString(`en-US`)}`;
var jp: RecoveredValue = new Intl.NumberFormat(`en-US`);
var Mp: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
  let t: RecoveredValue = Math.max(0, Math.round(e / 1e3));
  if (t < 60) return `${t}s`;
  let n: RecoveredValue = Math.floor(t / 60);
  if (n < 60) return `${n}m ${String(t % 60).padStart(2, `0`)}s`;
  let r: RecoveredValue = Math.floor(n / 60);
  return r < 24
    ? `${r}h ${String(n % 60).padStart(2, `0`)}m`
    : `${Math.floor(r / 24)}d ${r % 24}h`;
};
var Np: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  e
    .split(/\s+/)
    .map(
      (e?: RecoveredValue): RecoveredValue =>
        (Array.from(e.replace(/^[^\p{L}\p{N}]+/u, ``)) as RecoveredValue[])[0],
    )
    .filter(Boolean)
    .slice(0, 2)
    .join(``)
    .toUpperCase();
var Pp: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
  e,
  ...(e.children ?? []).flatMap(Pp),
];
var Fp: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  (e.cost ?? 0) +
  (e.children ?? []).reduce(
    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + Fp(t),
    0,
  );
var Ip: RecoveredValue = (): RecoveredValue =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
var Lp: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
  let n: RecoveredValue = 0,
    r: RecoveredValue = 0,
    i: RecoveredValue = e;
  for (; i && i !== t; ) ((n += i.offsetLeft), (r += i.offsetTop), (i = i.offsetParent));
  return {
    x: n,
    y: r,
    w: e.offsetWidth,
    h: e.offsetHeight,
  };
};
var Rp: RecoveredValue = (): RecoveredValue => (
  <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <path
      d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
      fill={`currentColor`}
    />
    <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
  </svg>
);
var ComponentZp: RecoveredValue = ({ status }: RecoveredValue): RecoveredValue =>
  status === `running` ? (
    <svg
      className={`ui-agtc__spin`}
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <circle
        cx={`12`}
        cy={`12`}
        r={`8.5`}
        stroke={`currentColor`}
        strokeOpacity={`0.25`}
        strokeWidth={`2.5`}
      />
      <path
        d={`M12 3.5A8.5 8.5 0 0 1 20.5 12`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeWidth={`2.5`}
      />
    </svg>
  ) : status === `done` ? (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M5 14L8.5 17.5L19 6.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2.4`}
      />
    </svg>
  ) : status === `failed` ? (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
      <path
        d={`M12 9V13`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2.2`}
      />
      <path
        d={`M12 16.8V17`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2.6`}
      />
    </svg>
  ) : status === `waiting` ? (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z`}
        stroke={`currentColor`}
        strokeWidth={`2`}
      />
      <path
        d={`M12 7.5V12L14.5 14.5`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
    </svg>
  ) : status === `stopped` ? (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <rect
        x={`6`}
        y={`6`}
        width={`12`}
        height={`12`}
        rx={`2.5`}
        stroke={`currentColor`}
        strokeWidth={`2.2`}
      />
    </svg>
  ) : (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <circle cx={`12`} cy={`12`} r={`3.5`} fill={`currentColor`} />
    </svg>
  );
var Bp: RecoveredValue = (): RecoveredValue => (
  <svg
    width={`12`}
    height={`12`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path
      d={`M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
  </svg>
);
var Vp: RecoveredValue = 280;
var Hp: RecoveredValue = 420;
var Up: RecoveredValue = 60;
var Wp: RecoveredValue = `cubic-bezier(0.32, 0.72, 0.24, 1)`;
var Gp: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
  e,
  ...e.kids.flatMap(Gp),
];
var Kp: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  Math.max(0, ...e.kids.map((e?: RecoveredValue): RecoveredValue => Kp(e) + 1));
var qp: RecoveredValue = {
  subs: new Set(),
  id: 0,
};
var Jp: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
  let [t, n]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(
    (): RecoveredValue => Date.now(),
  );
  return (
    (0, D_index_BzMVbDoG.useEffect)((): RecoveredValue => {
      if (!e) return;
      let t: RecoveredValue = (): RecoveredValue => n(Date.now());
      return (
        t(),
        qp.subs.add(t),
        (qp.id ||= window.setInterval(
          (): RecoveredValue =>
            qp.subs.forEach((e?: RecoveredValue): RecoveredValue => e()),
          1e3,
        )),
        (): RecoveredValue => {
          (qp.subs.delete(t), qp.subs.size || (window.clearInterval(qp.id), (qp.id = 0)));
        }
      );
    }, [e]),
    t
  );
};
var Yp: RecoveredValue = ({ since, until, now }: RecoveredValue): RecoveredValue => {
  let r: RecoveredValue = Jp(until === void 0 && now === void 0);
  return (
    <z_index_BzMVbDoG.Fragment>
      {Mp((until ?? now ?? r) - since)}
    </z_index_BzMVbDoG.Fragment>
  );
};
function Xp({
  root,
  beside,
  top,
  collapsed,
  defaultCollapsed = [],
  onCollapsedChange,
  onSelect,
  selected,
  onResolve,
  now,
  formatCost = Ap,
  title = `Agents`,
  className,
}: RecoveredValue): RecoveredValue {
  let p: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    [m, h]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(defaultCollapsed),
    g: RecoveredValue = collapsed ?? m,
    _: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = g.includes(e)
        ? g.filter((t?: RecoveredValue): RecoveredValue => t !== e)
        : [...g, e];
      (h(t), onCollapsedChange?.(t));
    },
    [v, y]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(null),
    b: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null);
  (0, D_index_BzMVbDoG.useEffect)((): RecoveredValue => {
    if (!v) return;
    let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      b.current?.contains(e.target) || y(null);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      (): RecoveredValue => document.removeEventListener(`pointerdown`, e)
    );
  }, [v]);
  let x: RecoveredValue = [...Pp(root), ...(beside ? Pp(beside) : [])],
    S: RecoveredValue =
      selected && selected !== root.id
        ? x.find((e?: RecoveredValue): RecoveredValue => e.id === selected)
        : void 0,
    C: RecoveredValue = S
      ? new Set(Pp(S).map((e?: RecoveredValue): RecoveredValue => e.id))
      : null,
    [w, T]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(null),
    ee: RecoveredValue = (e?: RecoveredValue): RecoveredValue => ({
      agent: e,
      kids: g.includes(e.id) ? [] : (e.children ?? []).map(ee),
    }),
    te: RecoveredValue = ee(root),
    ne: RecoveredValue = new Set(
      Gp(te).map((e?: RecoveredValue): RecoveredValue => e.agent.id),
    ),
    [E, re]: RecoveredValue = (0, D_index_BzMVbDoG.useState)([]),
    ie: RecoveredValue = E.filter(
      (e?: RecoveredValue): RecoveredValue => !ne.has(e.shown.agent.id),
    ),
    ae: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.kids.map(ae);
      return (
        ie
          .filter((t?: RecoveredValue): RecoveredValue => t.parent === e.agent.id)
          .sort(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e.index - t.index,
          )
          .forEach(
            (e?: RecoveredValue): RecoveredValue =>
              t.splice(Math.min(e.index, t.length), 0, e.shown),
          ),
        {
          ...e,
          kids: t,
        }
      );
    },
    O: RecoveredValue = ae(te),
    k: RecoveredValue = Gp(O),
    oe: RecoveredValue =
      !w ||
      w.w >=
        Math.max(
          560,
          O.kids.reduce(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
              e + w.card + w.indent * Math.max(1, Kp(t)),
            0,
          ) +
            Math.max(0, O.kids.length - 1) * 8,
        ),
    se: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(new Map()),
    ce: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(!1),
    A: RecoveredValue = 0;
  for (let e of k)
    e.leaving !== void 0 ||
      se.current.has(e.agent.id) ||
      se.current.set(
        e.agent.id,
        e === O ? 0 : (ce.current ? 160 : 200) + Math.min(A++, 12) * Up,
      );
  let le: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(new Map()),
    [ue, de]: RecoveredValue = (0, D_index_BzMVbDoG.useState)([]),
    [fe, pe]: RecoveredValue = (0, D_index_BzMVbDoG.useState)({
      w: 0,
      h: 0,
    }),
    me: RecoveredValue = (0, D_index_BzMVbDoG.useRef)({
      links: ``,
      w: 0,
      h: 0,
    }),
    he: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(new Map()),
    ge: RecoveredValue = JSON.stringify([
      oe,
      g,
      k.map(
        (e?: RecoveredValue): RecoveredValue => [
          e.agent.id,
          e.agent.status,
          e.leaving ?? ``,
          e.kids.map((e?: RecoveredValue): RecoveredValue => e.agent.id),
        ],
      ),
      beside ? [beside.id, beside.status] : null,
    ]),
    _e: RecoveredValue = (): RecoveredValue => {
      let n: RecoveredValue = p.current;
      if (!n) return;
      let r: RecoveredValue = n.getBoundingClientRect(),
        i: RecoveredValue = n.offsetWidth ? r.width / n.offsetWidth : 1,
        a: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = e.getBoundingClientRect();
          return {
            x: (t.left - r.left) / i,
            y: (t.top - r.top) / i,
            w: t.width / i,
            h: t.height / i,
          };
        },
        o: RecoveredValue = [],
        s: RecoveredValue = n.querySelector(`:scope > .ui-agtc__level`),
        c: RecoveredValue = s ? a(s).y : null,
        l: RecoveredValue = beside ? le.current.get(beside.id) : void 0,
        u: RecoveredValue = l ? a(l).y + a(l).h : 0,
        d: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
          let n: RecoveredValue = le.current.get(e.agent.id);
          for (let r of e.kids) {
            let i: RecoveredValue = le.current.get(r.agent.id);
            if (n && i) {
              let s: RecoveredValue = a(n),
                l: RecoveredValue = a(i),
                d: RecoveredValue =
                  r.agent.status === `queued` || r.agent.status === `stopped`,
                f: RecoveredValue = {
                  id: `${e.agent.id}>${r.agent.id}`,
                  muted: d,
                  leaving: r.leaving,
                  enter: se.current.get(r.agent.id) ?? 0,
                };
              if (oe && t === 0) {
                let t: RecoveredValue = s.x + s.w / 2,
                  n: RecoveredValue = s.y + s.h,
                  i: RecoveredValue = l.x + l.w / 2,
                  a: RecoveredValue = l.y,
                  p: RecoveredValue = Math.max(n, u),
                  m: RecoveredValue = Math.round(p + ((c ?? a) - p) / 2),
                  h: RecoveredValue = i - t,
                  g: RecoveredValue = Math.max(
                    0,
                    Math.min(8, Math.abs(h) / 2, (a - m) / 2),
                  ),
                  _: RecoveredValue = Math.sign(h),
                  v: RecoveredValue = Math.max(
                    0,
                    Math.min(8, Math.abs(h) / 2 - g, (m - n) / 2),
                  ),
                  y: RecoveredValue = d
                    ? `M${t + _ * v} ${m}`
                    : `M${t} ${n}V${m - v}Q${t} ${m} ${t + _ * v} ${m}`,
                  b: RecoveredValue =
                    Math.abs(h) < 12
                      ? `${d ? `M${t} ${m}` : `M${t} ${n}V${m}`}V${a}`
                      : `${y}H${i - _ * g}Q${i} ${m} ${i} ${m + g}V${a}`;
                o.push({
                  ...f,
                  d: b,
                  dot: [t, n],
                });
                let x: RecoveredValue = `${e.agent.id}>stem`,
                  S: RecoveredValue = o.find(
                    (e?: RecoveredValue): RecoveredValue => e.id === x,
                  );
                S
                  ? ((S.muted = S.muted && d),
                    (S.leaving =
                      S.leaving === void 0 || r.leaving === void 0
                        ? void 0
                        : Math.max(S.leaving, r.leaving)),
                    (S.enter = Math.min(S.enter, f.enter)))
                  : o.push({
                      id: x,
                      d: `M${t} ${n}V${m}`,
                      dot: [t, n],
                      muted: d,
                      leaving: r.leaving,
                      enter: f.enter,
                    });
              } else {
                let e: RecoveredValue = s.x + 21,
                  t: RecoveredValue = s.y + s.h,
                  n: RecoveredValue = l.x,
                  r: RecoveredValue = l.y + 20,
                  i: RecoveredValue = Math.max(0, Math.min(8, (n - e) / 2, (r - t) / 2)),
                  a: RecoveredValue =
                    n - e < 2
                      ? `M${e} ${t}V${l.y}`
                      : `M${e} ${t}V${r - i}Q${e} ${r} ${e + i} ${r}H${n}`;
                o.push({
                  ...f,
                  d: a,
                  dot: [e, t],
                });
              }
            }
            d(r, t + 1);
          }
        };
      d(O, 0);
      let f: RecoveredValue = le.current.get(root.id),
        m: RecoveredValue = beside ? le.current.get(beside.id) : void 0;
      if (f && m) {
        let e: RecoveredValue = a(f),
          n: RecoveredValue = a(m),
          r: RecoveredValue = beside.status === `queued` || beside.status === `stopped`;
        if (n.x > e.x + e.w) {
          let t: RecoveredValue = Math.round(e.y + Math.min(e.h, n.h) / 2);
          o.push({
            id: `beside`,
            d: `M${e.x + e.w} ${t}H${n.x}`,
            dot: [e.x + e.w, t],
            muted: r,
            enter: 0,
            dashed: !0,
          });
        } else {
          let t: RecoveredValue = e.x + 21,
            i: RecoveredValue = e.y + e.h,
            a: RecoveredValue = n.y + 20,
            s: RecoveredValue = Math.max(0, Math.min(8, (n.x - t) / 2, (a - i) / 2));
          o.push({
            id: `beside`,
            d: `M${t} ${i}V${a - s}Q${t} ${a} ${t + s} ${a}H${n.x}`,
            dot: [t, i],
            muted: r,
            enter: 0,
            dashed: !0,
          });
        }
      }
      for (let e of [...he.current.keys()])
        o.some((t?: RecoveredValue): RecoveredValue => t.id === e) ||
          he.current.delete(e);
      let h: RecoveredValue = JSON.stringify(o);
      h !== me.current.links && ((me.current.links = h), de(o));
      let g: RecoveredValue = [...le.current.values()].map(a),
        _: RecoveredValue = Math.ceil(
          Math.max(
            n.clientWidth,
            ...g.map((e?: RecoveredValue): RecoveredValue => e.x + e.w),
          ),
        ),
        v: RecoveredValue = Math.ceil(
          Math.max(
            n.clientHeight,
            ...g.map((e?: RecoveredValue): RecoveredValue => e.y + e.h),
          ),
        );
      (_ !== me.current.w || v !== me.current.h) &&
        ((me.current.w = _),
        (me.current.h = v),
        pe({
          w: _,
          h: v,
        }));
    },
    ve: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(_e);
  ve.current = _e;
  let ye: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(0),
    j: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(0),
    M: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (((ye.current = Math.max(ye.current, performance.now() + e)), j.current)) return;
      let t: RecoveredValue = (): RecoveredValue => {
        (ve.current(),
          (j.current = performance.now() < ye.current ? requestAnimationFrame(t) : 0));
      };
      j.current = requestAnimationFrame(t);
    };
  (0, D_index_BzMVbDoG.useEffect)(
    (): RecoveredValue => (): RecoveredValue => {
      (cancelAnimationFrame(j.current), (j.current = 0));
    },
    [],
  );
  let be: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(0),
    xe: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(new WeakMap()),
    Se: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(new Set()),
    Ce: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    we: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.parentElement,
        n: RecoveredValue = e.offsetHeight,
        r: RecoveredValue = xe.current.get(e);
      if ((xe.current.set(e, n), !t || r === void 0 || Math.abs(r - n) < 0.5 || Ip()))
        return;
      let i: RecoveredValue = t.getAnimations(),
        a: RecoveredValue = i.length ? t.offsetHeight : r;
      i.forEach((e?: RecoveredValue): RecoveredValue => e.cancel());
      let o: RecoveredValue = `inset(-12px -12px 0 -12px)`;
      (t.animate(
        [
          {
            height: `${a}px`,
            clipPath: o,
          },
          {
            height: `${n}px`,
            clipPath: o,
          },
        ],
        {
          duration: Hp,
          easing: Wp,
        },
      ),
        (be.current = performance.now() + Hp),
        M(460));
    },
    N: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      e &&
        (ce.current && Te.current.has(t) && !xe.current.has(e) && xe.current.set(e, 0),
        Se.current.add(e),
        typeof ResizeObserver < `u` &&
          ((Ce.current ??= new ResizeObserver(
            (e?: RecoveredValue): RecoveredValue =>
              e.forEach((e?: RecoveredValue): RecoveredValue => we(e.target)),
          )),
          Ce.current.observe(e)));
    };
  ((0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
    for (let e of Se.current)
      e.isConnected ? we(e) : (Se.current.delete(e), Ce.current?.unobserve(e));
  }),
    (0, D_index_BzMVbDoG.useEffect)(
      (): RecoveredValue => (): RecoveredValue => Ce.current?.disconnect(),
      [],
    ));
  let Te: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(new Map());
  (0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = p.current;
    if (!e) return;
    let t: RecoveredValue = !1;
    for (let [n, r] of le.current) {
      let i: RecoveredValue = Lp(r, e),
        a: RecoveredValue = Te.current.get(n),
        o: RecoveredValue = a ? Math.max(Math.abs(a.x - i.x), Math.abs(a.y - i.y)) : 0;
      (a &&
        o > 0.5 &&
        !(performance.now() < be.current && o < 40) &&
        !Ip() &&
        (r.animate(
          [
            {
              translate: `${a.x - i.x}px ${a.y - i.y}px`,
            },
            {
              translate: `0px 0px`,
            },
          ],
          {
            duration: Hp,
            easing: Wp,
          },
        ),
        (t = !0)),
        Te.current.set(n, i));
    }
    for (let e of [...Te.current.keys()]) le.current.has(e) || Te.current.delete(e);
    t && M(460);
  });
  let Ee: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null);
  ((0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
    let t: RecoveredValue = Ee.current;
    ((Ee.current = te), (ce.current = !0));
    for (let e of [...se.current.keys()])
      k.some(
        (t?: RecoveredValue): RecoveredValue => t.agent.id === e && t.leaving === void 0,
      ) || se.current.delete(e);
    if (!t || Ip()) return;
    let n: RecoveredValue = [],
      r: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        e.kids.forEach((t?: RecoveredValue, i?: RecoveredValue): RecoveredValue => {
          ne.has(t.agent.id)
            ? r(t)
            : n.push({
                shown: t,
                parent: e.agent.id,
                index: i,
              });
        });
    if ((r(t), !n.length)) return;
    let i: RecoveredValue = n
        .flatMap((e?: RecoveredValue): RecoveredValue => Gp(e.shown))
        .reverse(),
      a: RecoveredValue = new Map(
        i.map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => [
            e.agent.id,
            t * Up,
          ],
        ),
      ),
      o: RecoveredValue = (e?: RecoveredValue): RecoveredValue => ({
        ...e,
        leaving: a.get(e.agent.id) ?? 0,
        kids: e.kids.map(o),
      }),
      s: RecoveredValue = n
        .filter(
          (t?: RecoveredValue): RecoveredValue =>
            ne.has(t.parent) || t.parent === root.id,
        )
        .map(
          (e?: RecoveredValue): RecoveredValue => ({
            ...e,
            shown: o(e.shown),
          }),
        ),
      c: RecoveredValue = new Set(
        s.map((e?: RecoveredValue): RecoveredValue => e.shown.agent.id),
      );
    re(
      (e?: RecoveredValue): RecoveredValue => [
        ...e.filter((e?: RecoveredValue): RecoveredValue => !c.has(e.shown.agent.id)),
        ...s,
      ],
    );
    let l: RecoveredValue = Vp + (i.length - 1) * Up;
    (window.setTimeout(
      (): RecoveredValue =>
        re(
          (e?: RecoveredValue): RecoveredValue =>
            e.filter((e?: RecoveredValue): RecoveredValue => !c.has(e.shown.agent.id)),
        ),
      l + 30,
    ),
      M(l + Hp + 60));
  }),
    (0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
      (_e(), M(900 + Math.min(A, 12) * Up));
    }, [ge]),
    (0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = p.current;
      if (!e) return;
      let t: RecoveredValue = new ResizeObserver((): RecoveredValue => {
        let t: RecoveredValue = getComputedStyle(e);
        (T({
          w: e.offsetWidth,
          card: parseFloat(t.getPropertyValue(`--ui-agtc-card-w`)) || 216,
          indent: parseFloat(t.getPropertyValue(`--ui-agtc-indent`)) || 32,
        }),
          ve.current());
      });
      return (t.observe(e), (): RecoveredValue => t.disconnect());
    }, []));
  let De: RecoveredValue = Date.now();
  for (let e of ue) he.current.has(e.id) || he.current.set(e.id, De);
  let Oe: RecoveredValue = new Set(
      ue
        .filter(
          (e?: RecoveredValue): RecoveredValue =>
            De - he.current.get(e.id) < 700 + e.enter,
        )
        .map((e?: RecoveredValue): RecoveredValue => e.id),
    ),
    ke: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = e.agent,
        r: RecoveredValue = n.children ?? [],
        i: RecoveredValue = g.includes(n.id),
        a: RecoveredValue = r.length ? Fp(n) : (n.cost ?? 0),
        c: RecoveredValue =
          n.ended ??
          (n.status === `running` || n.status === `waiting` ? void 0 : n.started),
        d: RecoveredValue = i ? Pp(n).length - 1 : 0,
        f: RecoveredValue = e.leaving !== void 0;
      return (
        <div
          className={`ui-agtc__node`}
          data-status={n.status}
          data-depth={t}
          data-leaving={f ? `` : void 0}
          aria-hidden={f || void 0}
          style={
            {
              animationDelay: `${f ? e.leaving : (se.current.get(n.id) ?? 0)}ms`,
            } as RecoveredValue
          }
          ref={
            ((e?: RecoveredValue): RecoveredValue => {
              e ? le.current.set(n.id, e) : le.current.delete(n.id);
            }) as RecoveredValue
          }
          onClick={onSelect && !f ? (): RecoveredValue => onSelect(n) : void 0}
          tabIndex={onSelect && !f ? 0 : void 0}
          onKeyDown={
            onSelect
              ? (e?: RecoveredValue): RecoveredValue => {
                  e.target === e.currentTarget &&
                    (e.key === `Enter` || e.key === ` `) &&
                    (e.preventDefault(), onSelect(n));
                }
              : void 0
          }
          data-clickable={onSelect ? `` : void 0}
          data-kept={C?.has(n.id) ? `` : void 0}
          aria-current={selected === n.id ? `true` : void 0}
        >
          <div className={`ui-agtc__top`}>
            <span className={`ui-agtc__avatar`} data-logo={n.avatar ? `` : void 0}>
              {n.avatar ?? Np(n.name)}
            </span>
            <span className={`ui-agtc__who`}>
              <span className={`ui-agtc__name`} dir={`auto`} title={n.name}>
                {n.name}
              </span>
              {n.model && (
                <span className={`ui-agtc__model`} title={n.model}>
                  {n.model}
                </span>
              )}
            </span>
            <span className={`ui-agtc__status`} data-status={n.status}>
              <ComponentZp status={n.status} />
              {kp[n.status]}
            </span>
          </div>
          {n.task || n.tools?.length ? (
            <p className={`ui-agtc__task`} dir={`auto`} title={n.task}>
              {n.tools && n.tools.length > 0 && (
                <span className={`ui-agtc__tools`} aria-hidden={`true`}>
                  {(n.tools.length > 4 ? n.tools.slice(0, 3) : n.tools).map(
                    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                      <span className={`ui-agtc__tool`} children={e} key={t} />
                    ),
                  )}
                  {n.tools.length > 4 && (
                    <span className={`ui-agtc__tool ui-agtc__tool--more`}>
                      {`+`}
                      {n.tools.length - 3}
                    </span>
                  )}
                </span>
              )}
              {n.task}
            </p>
          ) : null}
          {n.extra && (
            <div className={`ui-agtc__extra`}>
              <div
                className={`ui-agtc__extra-in`}
                ref={
                  ((e?: RecoveredValue): RecoveredValue => N(e, n.id)) as RecoveredValue
                }
              >
                {n.extra}
              </div>
            </div>
          )}
          <div className={`ui-agtc__meta`}>
            <span
              className={`ui-agtc__cost`}
              title={r.length ? `This branch, with its sub-agents` : void 0}
            >
              <span
                className={`ui-agtc__amount`}
                data-live={
                  Pp(n).some(
                    (e?: RecoveredValue): RecoveredValue => e.status === `running`,
                  )
                    ? ``
                    : void 0
                }
              >
                {formatCost(a)}
              </span>
              {n.started ? (
                <span className={`ui-agtc__time`}>
                  {` · `}
                  <Yp since={n.started} until={c} now={now} />
                </span>
              ) : null}
            </span>
            {r.length > 0 && (
              <button
                type={`button`}
                className={`ui-agtc__fold`}
                aria-expanded={!i}
                aria-label={
                  i
                    ? `Show ${d} sub-agents of ${n.name}`
                    : `Fold the sub-agents of ${n.name}`
                }
                tabIndex={f ? -1 : void 0}
                onClick={(e?: RecoveredValue): RecoveredValue => {
                  (e.stopPropagation(), _(n.id));
                }}
              >
                {i ? `+${d}` : r.length}
                <Bp />
              </button>
            )}
          </div>
        </div>
      );
    },
    Ae: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
      <div
        className={`ui-agtc__hang`}
        style={
          (t === 1
            ? {
                "--ui-agtc-col": Math.max(1, Kp(e)),
              }
            : void 0) as RecoveredValue
        }
        role={`treeitem`}
        aria-expanded={e.agent.children?.length ? !g.includes(e.agent.id) : void 0}
        aria-label={`${e.agent.name}: ${kp[e.agent.status]}`}
        key={e.agent.id}
      >
        {ke(e, t)}
        {e.kids.length > 0 && (
          <div className={`ui-agtc__below`} role={`group`}>
            {e.kids.map((e?: RecoveredValue): RecoveredValue => Ae(e, t + 1))}
          </div>
        )}
      </div>
    ),
    je: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      Math.max(t, ...e.kids.map((e?: RecoveredValue): RecoveredValue => je(e, t + 1))),
    Me: RecoveredValue = je(O, 0),
    Ne: RecoveredValue = Fp(root),
    Pe: RecoveredValue = x.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `running`,
    ).length,
    Fe: RecoveredValue = x.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `waiting`,
    ).length,
    Ie: RecoveredValue = x.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `failed`,
    ).length,
    Le: RecoveredValue = v
      ? x.filter((e?: RecoveredValue): RecoveredValue => e.status === v)
      : [],
    Re: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      (onResolve?.(e, t), Le.length <= 1 && y(null));
    },
    ze: RecoveredValue = new Map();
  for (let e of ue) {
    let t: RecoveredValue = e.dot.join(`,`),
      n: RecoveredValue = ze.get(t),
      r: RecoveredValue = e.leaving;
    n
      ? ze.set(t, {
          at: n.at,
          muted: n.muted && e.muted,
          leaving: n.leaving === void 0 || r === void 0 ? void 0 : Math.max(n.leaving, r),
        })
      : ze.set(t, {
          at: e.dot,
          muted: e.muted,
          leaving: r,
        });
  }
  return (
    <div
      className={[`ui-agtc`, className].filter(Boolean).join(` `)}
      data-wide={oe ? `` : void 0}
      data-picking={C ? `` : void 0}
    >
      <header ref={b as RecoveredValue} className={`ui-agtc__bar`}>
        <span className={`ui-agtc__spark`}>
          <Rp />
        </span>
        <span className={`ui-agtc__title`} dir={`auto`} title={title}>
          {title}
        </span>
        <span className={`ui-agtc__sum`} aria-live={`polite`}>
          <span>{x.length === 1 ? `1 agent` : `${jp.format(x.length)} agents`}</span>
          {Pe > 0 && (
            <span className={`ui-agtc__sum-run`}>
              {jp.format(Pe)}
              {` running`}
            </span>
          )}
          {Fe > 0 && (
            <button
              type={`button`}
              className={`ui-agtc__sum-btn`}
              data-kind={`waiting`}
              aria-expanded={v === `waiting`}
              aria-haspopup={`dialog`}
              onClick={(): RecoveredValue =>
                y(
                  (e?: RecoveredValue): RecoveredValue =>
                    e === `waiting` ? null : `waiting`,
                )
              }
            >
              {jp.format(Fe)}
              {` needs you`}
              <Bp />
            </button>
          )}
          {Ie > 0 && (
            <button
              type={`button`}
              className={`ui-agtc__sum-btn`}
              data-kind={`failed`}
              aria-expanded={v === `failed`}
              aria-haspopup={`dialog`}
              onClick={(): RecoveredValue =>
                y(
                  (e?: RecoveredValue): RecoveredValue =>
                    e === `failed` ? null : `failed`,
                )
              }
            >
              {jp.format(Ie)}
              {` failed`}
              <Bp />
            </button>
          )}
          <span className={`ui-agtc__sum-cost`}>
            <span className={`ui-agtc__amount`} data-live={Pe > 0 ? `` : void 0}>
              {formatCost(Ne)}
            </span>
          </span>
        </span>
        {v && Le.length > 0 && (
          <div
            className={`ui-agtc__pop`}
            role={`dialog`}
            aria-label={v === `waiting` ? `Agents that need you` : `Agents that failed`}
            onKeyDown={(e?: RecoveredValue): RecoveredValue =>
              e.key === `Escape` && y(null)
            }
          >
            {Le.map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <div className={`ui-agtc__pop-item`} key={e.id}>
                  <span className={`ui-agtc__pop-head`}>
                    <span className={`ui-agtc__status`} data-status={e.status}>
                      <ComponentZp status={e.status} />
                    </span>
                    <span className={`ui-agtc__pop-name`} dir={`auto`}>
                      {e.name}
                    </span>
                    <span className={`ui-agtc__pop-task`} dir={`auto`}>
                      {e.task}
                    </span>
                  </span>
                  {(v === `waiting` ? e.ask : e.error) && (
                    <span className={`ui-agtc__pop-text`} dir={`auto`}>
                      {v === `waiting` ? e.ask : e.error}
                    </span>
                  )}
                  <span className={`ui-agtc__pop-actions`}>
                    <button
                      type={`button`}
                      className={`ui-agtc__btn`}
                      onClick={(): RecoveredValue =>
                        Re(e, v === `waiting` ? `reject` : `dismiss`)
                      }
                    >
                      {v === `waiting` ? `Reject` : `Dismiss`}
                    </button>
                    <button
                      type={`button`}
                      className={`ui-agtc__btn ui-agtc__btn--primary`}
                      autoFocus={t === 0}
                      onClick={(): RecoveredValue =>
                        Re(e, v === `waiting` ? `approve` : `retry`)
                      }
                    >
                      {v === `waiting` ? `Approve` : `Retry`}
                    </button>
                  </span>
                </div>
              ),
            )}
          </div>
        )}
      </header>
      {top && <div className={`ui-agtc__lead`}>{top}</div>}
      <div
        ref={p as RecoveredValue}
        className={`ui-agtc__tree`}
        role={`tree`}
        aria-label={title}
        style={
          {
            "--ui-agtc-depth": Me,
          } as RecoveredValue
        }
      >
        <svg className={`ui-agtc__links`} width={fe.w} height={fe.h} aria-hidden={`true`}>
          {ue.map(
            (e?: RecoveredValue): RecoveredValue => (
              <g
                data-dashed={e.dashed ? `` : void 0}
                data-muted={e.muted ? `` : void 0}
                data-fresh={Oe.has(e.id) && e.leaving === void 0 && !Ip() ? `` : void 0}
                data-leaving={e.leaving === void 0 ? void 0 : ``}
                children={
                  <path
                    d={e.d}
                    pathLength={e.dashed ? void 0 : 1}
                    className={`ui-agtc__link`}
                    style={
                      {
                        animationDelay: `${e.leaving === void 0 ? Math.max(0, e.enter - 160) : e.leaving}ms`,
                      } as RecoveredValue
                    }
                  />
                }
                key={e.id}
              />
            ),
          )}
        </svg>
        <div
          className={`ui-agtc__root`}
          data-beside={beside ? `` : void 0}
          role={`treeitem`}
          aria-expanded={root.children?.length ? !g.includes(root.id) : void 0}
          aria-label={`${root.name}: ${kp[root.status]}`}
        >
          {ke(O, 0)}
          {beside && (
            <div
              className={`ui-agtc__beside`}
              role={`treeitem`}
              aria-label={`${beside.name}: ${kp[beside.status]}, beside ${root.name}`}
            >
              {ke(
                {
                  agent: beside,
                  kids: [],
                },
                0,
              )}
            </div>
          )}
        </div>
        {O.kids.length > 0 && (
          <div className={`ui-agtc__level`} role={`group`}>
            {O.kids.map((e?: RecoveredValue): RecoveredValue => Ae(e, 1))}
          </div>
        )}
        <svg
          className={`ui-agtc__links ui-agtc__dots`}
          width={fe.w}
          height={fe.h}
          aria-hidden={`true`}
        >
          {[...ze].map(
            ([e, t]: RecoveredValue): RecoveredValue => (
              <circle
                cx={t.at[0]}
                cy={t.at[1]}
                r={3.25}
                className={`ui-agtc__dot`}
                data-muted={t.muted ? `` : void 0}
                data-leaving={t.leaving === void 0 ? void 0 : ``}
                style={
                  (t.leaving === void 0
                    ? void 0
                    : {
                        animationDelay: `${t.leaving}ms`,
                      }) as RecoveredValue
                }
                key={e}
              />
            ),
          )}
        </svg>
      </div>
    </div>
  );
}
var Qp: RecoveredValue = [`Q3 Campaign`, `Brand assets`, `Hiring`, `Research`];
var $p: RecoveredValue = [
  {
    id: `gmail`,
    name: `Gmail`,
    Logo: (): RecoveredValue => <Em />,
  },
  {
    id: `slack`,
    name: `Slack`,
    Logo: (): RecoveredValue => <Dm />,
  },
  {
    id: `clickup`,
    name: `ClickUp`,
    Logo: (): RecoveredValue => <Om />,
  },
];
var em: RecoveredValue = [
  {
    id: `auto`,
    name: `Auto`,
    Logo: (): RecoveredValue => <Am />,
  },
  {
    id: `claude-fable-5-1`,
    name: `Claude Fable 5.1`,
    Logo: (): RecoveredValue => <Nm />,
  },
  {
    id: `claude-opus-5-5`,
    name: `Claude Opus 5.5`,
    Logo: (): RecoveredValue => <Nm />,
  },
  {
    id: `claude-sonnet-5-5`,
    name: `Claude Sonnet 5.5`,
    Logo: (): RecoveredValue => <Nm />,
  },
  {
    id: `claude-haiku-5-5`,
    name: `Claude Haiku 5.5`,
    Logo: (): RecoveredValue => <Nm />,
  },
  {
    id: `gpt-5`,
    name: `GPT-5`,
    Logo: (): RecoveredValue => <Pm />,
  },
  {
    id: `gpt-5-mini`,
    name: `GPT-5 mini`,
    Logo: (): RecoveredValue => <Pm />,
  },
];
var tm: RecoveredValue = [
  {
    id: `ask`,
    label: `Request approval`,
    description: `Always ask before editing outside files or using the internet`,
    Icon: (): RecoveredValue => <ComponentYm />,
  },
  {
    id: `auto`,
    label: `Approve for me`,
    description: `Only ask for potentially unsafe actions`,
    Icon: (): RecoveredValue => <ComponentDm />,
  },
  {
    id: `full`,
    label: `Full access`,
    description: `Unrestricted access to the internet and all files on your computer`,
    Icon: (): RecoveredValue => <ComponentBm />,
    tone: `alert`,
  },
];
var nm: RecoveredValue = [
  {
    title: `Add`,
    rows: [
      {
        id: `files`,
        label: `Files and folders`,
        Icon: (): RecoveredValue => <ComponentFm />,
      },
      {
        id: `claude`,
        label: `Attach Claude`,
        Icon: (): RecoveredValue => <Nm />,
      },
      {
        id: `folder`,
        label: `Work in a folder`,
        description: `Choose a folder for this chat`,
        Icon: (): RecoveredValue => <ComponentPm />,
      },
      {
        id: `goal`,
        label: `Goal`,
        description: `Set a goal to keep working toward`,
        Icon: (): RecoveredValue => <ComponentMm />,
      },
      {
        id: `plan`,
        label: `Plan mode`,
        description: `Turn on plan mode`,
        Icon: (): RecoveredValue => <ComponentHm />,
      },
      {
        id: `skill`,
        label: `Record a skill`,
        Icon: (): RecoveredValue => <ComponentGm />,
      },
      {
        id: `draw`,
        label: `Draw`,
        description: `Sketch a drawing`,
        Icon: (): RecoveredValue => <Component_m />,
      },
    ],
  },
  {
    title: `Plugins`,
    rows: [
      {
        id: `documents`,
        label: `Documents`,
        description: `Create and edit documents`,
        Icon: (): RecoveredValue => <ComponentVm color={`#3e7bfa`} />,
      },
      {
        id: `pdf`,
        label: `PDF`,
        description: `Read, create and verify PDFs`,
        Icon: (): RecoveredValue => <ComponentVm color={`#e5484d`} />,
      },
    ],
  },
];
var rm: RecoveredValue = 16;
var im: RecoveredValue = (): RecoveredValue =>
  Array.from(
    {
      length: rm,
    },
    (): RecoveredValue => 0,
  ) as RecoveredValue[];
var am: RecoveredValue = 2;
var om: RecoveredValue = 4;
function sm({
  placeholder = `Start by typing...`,
  models = em,
  dictation = `Draft a short update for the team about this week's progress`,
  onSend,
  onModelChange,
  onAttach,
  approval = `ask`,
  onApprovalChange,
  onLearnMore,
  folders = Qp,
  folder,
  onFolderChange,
  apps = $p,
  connectedApps = [`gmail`],
  onAppsChange,
  foot,
  tray = !0,
}: RecoveredValue): RecoveredValue {
  let [_, v]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(approval),
    [y, b]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(!1),
    [x, S]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(!1),
    [C, w]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(``),
    [T, ee]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(folder ?? null),
    [te, ne]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(connectedApps),
    [E, re]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(models[0]),
    [ie, ae]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(null),
    O: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      ae((t?: RecoveredValue): RecoveredValue => (t === e ? null : e)),
    k: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        (t.key === `ArrowDown` || t.key === `ArrowUp`) && (t.preventDefault(), ae(e));
      },
    [oe, se]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(!1),
    [ce, A]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(``),
    [le, ue]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(im),
    [de, fe]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(``),
    pe: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    me: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    he: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    [ge, _e]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(am);
  (0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = me.current;
    if (!e) return;
    let t: RecoveredValue = e.style.height;
    e.style.height = `0px`;
    let n: RecoveredValue = Math.max(
      e.scrollHeight,
      ce ? (he.current?.scrollHeight ?? 0) : 0,
    );
    e.style.height = t;
    let r: RecoveredValue = parseFloat(getComputedStyle(e).lineHeight) || 1;
    _e(Math.min(om, Math.max(am, Math.round(n / r))));
  }, [C, ce]);
  let ve: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    ye: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    j: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    M: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    be: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    xe: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(0),
    [Se, Ce]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(!1),
    we: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = T === e ? null : e;
      (ee(t),
        ae(null),
        fe(t ? `Working in ${t}.` : `No folder selected.`),
        onFolderChange?.(t),
        M.current?.focus());
    },
    N: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = !te.includes(e),
        n: RecoveredValue = t
          ? [...te, e]
          : te.filter((t?: RecoveredValue): RecoveredValue => t !== e);
      (ne(n),
        ae(null),
        fe(
          `${apps.find((t?: RecoveredValue): RecoveredValue => t.id === e)?.name} ${t ? `connected` : `disconnected`}.`,
        ),
        onAppsChange?.(n),
        (tray ? be : j).current?.focus());
    },
    Te: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (e !== _ && b(!0),
        v(e),
        ae(null),
        fe(
          `${tm.find((t?: RecoveredValue): RecoveredValue => t.id === e)?.label} selected.`,
        ),
        onApprovalChange?.(e),
        ye.current?.focus());
    },
    Ee: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e === `apps`) return ae(`apps`);
      if (
        (ae(null),
        e === `plan` && (fe(x ? `Plan mode off.` : `Plan mode on.`), S(!x)),
        onAttach?.(e),
        e === `folder` && folders.length > 0 && !foot)
      )
        return ae(`folder`);
      j.current?.focus();
    },
    De: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (e.id !== E?.id && Ce(!0),
        re(e),
        ae(null),
        fe(`${e.name} selected.`),
        onModelChange?.(e),
        ve.current?.focus());
    };
  ((0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = ve.current;
    if (!e) return;
    let t: RecoveredValue = e.offsetWidth,
      n: RecoveredValue = xe.current;
    ((xe.current = t),
      !(!Se || !n || Math.abs(n - t) < 0.5) &&
        (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches ||
          e.animate(
            [
              {
                width: `${n}px`,
              },
              {
                width: `${t}px`,
              },
            ],
            {
              duration: 460,
              easing: `cubic-bezier(0.25, 1, 0.5, 1)`,
            },
          )));
  }, [E?.id]),
    (0, D_index_BzMVbDoG.useEffect)((): RecoveredValue => {
      if (!oe) return;
      let e: RecoveredValue = dictation.split(/\s+/).filter(Boolean),
        t: RecoveredValue = 0,
        r: RecoveredValue = window.setInterval((): RecoveredValue => {
          ((t = Math.min(e.length, t + 1)), A(e.slice(0, t).join(` `)));
        }, 320),
        i: RecoveredValue = window.setInterval((): RecoveredValue => {
          let n: RecoveredValue =
            t < e.length && Math.random() > 0.3 ? 0.3 + Math.random() * 0.7 : 0;
          ue((e?: RecoveredValue): RecoveredValue => [...e.slice(1), n]);
        }, 120);
      return (): RecoveredValue => {
        (clearInterval(r), clearInterval(i));
      };
    }, [oe, dictation]));
  let Oe: RecoveredValue = (): RecoveredValue => {
      (ae(null), A(``), ue(im()), se(!0), fe(`Recording. Press Escape to discard.`));
    },
    ke: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (se(!1),
        e && ce
          ? (w(
              (e?: RecoveredValue): RecoveredValue =>
                e.trim() ? `${e.trimEnd()} ${ce}` : ce,
            ),
            fe(`Recording added to your message.`))
          : fe(`Recording discarded.`),
        A(``),
        me.current?.focus());
    },
    Ae: RecoveredValue = C.trim().length > 0,
    je: RecoveredValue = (): RecoveredValue => {
      Ae &&
        (onSend?.(C.trim(), {
          model: E?.id ?? ``,
        }),
        w(``),
        fe(`Message sent.`),
        me.current?.focus());
    },
    Me: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      e.key === `Enter` &&
        !e.shiftKey &&
        !e.nativeEvent.isComposing &&
        (e.preventDefault(), je());
    },
    Ne: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      e.key === `Escape` && oe && (e.preventDefault(), ke(!1));
    },
    Pe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      e.target.closest(`button, textarea, input`) ||
        (e.preventDefault(), me.current?.focus());
    },
    Fe: RecoveredValue =
      tm.find((e?: RecoveredValue): RecoveredValue => e.id === _) ?? tm[0],
    Ie: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        (ae(null), t && e.current?.focus());
      };
  return (
    <div className={`ui-ccc`} data-tray={tray ? void 0 : `off`}>
      <section
        ref={pe as RecoveredValue}
        className={`ui-ccc__body`}
        data-recording={oe}
        style={
          {
            "--ui-ccc-lines": ge,
          } as RecoveredValue
        }
        aria-label={`Message composer`}
        onKeyDown={Ne}
      >
        <div className={`ui-ccc__write`} onPointerDown={Pe}>
          <div className={`ui-ccc__field`}>
            <textarea
              ref={me as RecoveredValue}
              className={`ui-ccc__message`}
              value={C}
              onChange={(e?: RecoveredValue): RecoveredValue => w(e.target.value)}
              onKeyDown={Me}
              placeholder={placeholder}
              aria-label={`Message`}
              spellCheck={!1}
              readOnly={oe}
              dir={`auto`}
            />
            <div
              ref={he as RecoveredValue}
              className={`ui-ccc__draft`}
              aria-hidden={`true`}
              dir={`auto`}
            >
              {C}
              {C && ce && !/\s$/.test(C) ? ` ` : ``}
              <span className={`ui-ccc__heard`}>{ce}</span>
            </div>
          </div>
          <div className={`ui-ccc__tools`}>
            <div className={`ui-ccc__group`}>
              <button
                ref={j as RecoveredValue}
                type={`button`}
                className={`ui-ccc__icon-btn`}
                aria-label={`Add`}
                aria-haspopup={`menu`}
                aria-expanded={ie === `add`}
                onClick={(): RecoveredValue => O(`add`)}
                onKeyDown={k(`add`)}
              >
                <ComponentUm />
              </button>
              <button
                ref={ye as RecoveredValue}
                type={`button`}
                className={`ui-ccc__approval`}
                data-tone={Fe.tone}
                aria-haspopup={`listbox`}
                aria-expanded={ie === `approval`}
                onClick={(): RecoveredValue => O(`approval`)}
                onKeyDown={k(`approval`)}
              >
                <span
                  className={`ui-ccc__approval-face`}
                  data-morph={y || void 0}
                  key={Fe.id}
                >
                  <span className={`ui-ccc__approval-icon`} aria-hidden={`true`}>
                    <Fe.Icon />
                  </span>
                  <span className={`ui-ccc__approval-text`}>{Fe.label}</span>
                </span>
              </button>
            </div>
            <div className={`ui-ccc__swap`}>
              <div className={`ui-ccc__group ui-ccc__group--end`} inert={oe}>
                {E && (
                  <button
                    ref={ve as RecoveredValue}
                    type={`button`}
                    className={`ui-ccc__model`}
                    aria-haspopup={`listbox`}
                    aria-expanded={ie === `model`}
                    onClick={(): RecoveredValue => O(`model`)}
                    onKeyDown={k(`model`)}
                  >
                    <span
                      className={`ui-ccc__model-face`}
                      data-morph={Se || void 0}
                      key={E.id}
                    >
                      {E.Logo && E.id !== `auto` && (
                        <span className={`ui-ccc__model-logo`} aria-hidden={`true`}>
                          <E.Logo />
                        </span>
                      )}
                      <span className={`ui-ccc__model-name`} title={E.name} dir={`auto`}>
                        {E.name}
                      </span>
                    </span>
                    <span className={`ui-ccc__chevron`} aria-hidden={`true`}>
                      <Sm />
                    </span>
                  </button>
                )}
                <button
                  type={`button`}
                  className={`ui-ccc__icon-btn`}
                  aria-label={`Voice input`}
                  onClick={Oe}
                >
                  <ComponentXm />
                </button>
                <button
                  type={`button`}
                  className={`ui-ccc__send`}
                  aria-label={`Send message`}
                  disabled={!Ae}
                  onClick={je}
                >
                  <Cm />
                </button>
              </div>
              <div
                className={`ui-ccc__group ui-ccc__group--end ui-ccc__group--voice`}
                inert={!oe}
              >
                <span className={`ui-ccc__trace`} aria-hidden={`true`}>
                  {le.map(
                    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                      <span
                        style={
                          {
                            height: Math.max(2, e * 16),
                          } as RecoveredValue
                        }
                        key={t}
                      />
                    ),
                  )}
                </span>
                <button
                  type={`button`}
                  className={`ui-ccc__button`}
                  aria-label={`Discard recording`}
                  onClick={(): RecoveredValue => ke(!1)}
                >
                  <Mm />
                </button>
                <button
                  type={`button`}
                  className={`ui-ccc__send`}
                  aria-label={`Use recording`}
                  onClick={(): RecoveredValue => ke(!0)}
                >
                  <ComponentJm />
                </button>
              </div>
            </div>
          </div>
        </div>
        {tray ? (
          foot ? (
            <div className={`ui-ccc__foot`} data-custom={``}>
              {foot}
            </div>
          ) : (
            <div className={`ui-ccc__foot`}>
              {folders.length > 0 && (
                <button
                  ref={M as RecoveredValue}
                  type={`button`}
                  className={`ui-ccc__row ui-ccc__row--folder`}
                  aria-haspopup={`listbox`}
                  aria-expanded={ie === `folder`}
                  onClick={(): RecoveredValue => O(`folder`)}
                  onKeyDown={k(`folder`)}
                >
                  <span className={`ui-ccc__folder`} aria-hidden={`true`}>
                    <ComponentWm />
                  </span>
                  <span className={`ui-ccc__row-label`} title={T ?? void 0} dir={`auto`}>
                    {T ?? `Work in a folder`}
                  </span>
                </button>
              )}
              {apps.length > 0 && (
                <button
                  ref={be as RecoveredValue}
                  type={`button`}
                  className={`ui-ccc__row ui-ccc__row--apps`}
                  aria-haspopup={`menu`}
                  aria-expanded={ie === `apps`}
                  onClick={(): RecoveredValue => O(`apps`)}
                  onKeyDown={k(`apps`)}
                >
                  {`Connect apps`}
                  <span className={`ui-ccc__logos`} aria-hidden={`true`}>
                    {apps.slice(0, 3).map(
                      (e?: RecoveredValue): RecoveredValue => (
                        <span
                          className={`ui-ccc__logo`}
                          children={<e.Logo />}
                          key={e.id}
                        />
                      ),
                    )}
                  </span>
                </button>
              )}
            </div>
          )
        ) : null}
        <ComponentLm
          open={ie === `add`}
          role={`menu`}
          label={`Add to the chat`}
          inline={!0}
          wide={!0}
          sections={[
            ...nm.map(
              (e?: RecoveredValue): RecoveredValue => ({
                title: e.title,
                rows: e.rows.flatMap((e?: RecoveredValue): RecoveredValue => {
                  if (!tray && e.id === `folder`) {
                    if (!apps.length) return [];
                    let ComponentE: RecoveredValue = apps[0].Logo;
                    return [
                      {
                        id: `apps`,
                        label: `Connect apps`,
                        description: te.length ? `${te.length} connected` : void 0,
                        icon: <ComponentE />,
                      },
                    ];
                  }
                  return [
                    {
                      id: e.id,
                      label: e.label,
                      description:
                        e.id === `plan` && x ? `Turn off plan mode` : e.description,
                      icon: <e.Icon />,
                      checked: e.id === `plan` ? x : void 0,
                    },
                  ];
                }),
              }),
            ),
          ]}
          anchor={j}
          container={pe}
          onPick={Ee}
          onClose={Ie(j)}
        />
        <ComponentLm
          open={ie === `approval`}
          label={`How should actions be approved?`}
          head={
            <z_index_BzMVbDoG.Fragment>
              <span>{`How should actions be approved?`}</span>
              <button
                type={`button`}
                className={`ui-ccc__menu-link`}
                onClick={onLearnMore}
              >{`Learn more`}</button>
            </z_index_BzMVbDoG.Fragment>
          }
          width={468}
          align={`start`}
          sections={[
            {
              rows: tm.map(
                (e?: RecoveredValue): RecoveredValue => ({
                  id: e.id,
                  label: e.label,
                  description: e.description,
                  icon: <e.Icon />,
                  tone: e.tone,
                  checked: e.id === _,
                }),
              ),
            },
          ]}
          anchor={ye}
          container={pe}
          onPick={(e?: RecoveredValue): RecoveredValue => Te(e)}
          onClose={Ie(ye)}
        />
        {E && (
          <ComponentLm
            open={ie === `model`}
            label={`Select a model`}
            sections={[
              {
                rows: models.map(
                  (e?: RecoveredValue): RecoveredValue => ({
                    id: e.id,
                    label: e.name,
                    description: e.description,
                    icon: e.Logo && <e.Logo />,
                    checked: e.id === E.id,
                  }),
                ),
              },
            ]}
            anchor={ve}
            container={pe}
            onPick={(e?: RecoveredValue): RecoveredValue =>
              De(models.find((t?: RecoveredValue): RecoveredValue => t.id === e) ?? E)
            }
            onClose={Ie(ve)}
          />
        )}
        {tray && !foot && folders.length > 0 && (
          <ComponentLm
            open={ie === `folder`}
            label={`Work in a folder`}
            align={`start`}
            sections={[
              {
                title: `Work in a folder`,
                rows: folders.map(
                  (e?: RecoveredValue): RecoveredValue => ({
                    id: e,
                    label: e,
                    icon: <ComponentPm />,
                    checked: e === T,
                  }),
                ),
              },
            ]}
            anchor={M}
            container={pe}
            onPick={we}
            onClose={Ie(M)}
          />
        )}
        {(!tray || !foot) && apps.length > 0 && (
          <ComponentLm
            open={ie === `apps`}
            role={`menu`}
            label={`Apps`}
            align={tray ? void 0 : `start`}
            sections={[
              {
                title: `Apps`,
                rows: apps.map(
                  (e?: RecoveredValue): RecoveredValue => ({
                    id: e.id,
                    label: e.name,
                    icon: <e.Logo />,
                    checked: te.includes(e.id),
                  }),
                ),
              },
            ]}
            anchor={tray ? be : j}
            container={pe}
            onPick={N}
            onClose={Ie(tray ? be : j)}
          />
        )}
      </section>
      <p className={`ui-ccc__sr-only`} aria-live={`polite`}>
        {de}
      </p>
    </div>
  );
}
function cm(e?: RecoveredValue): RecoveredValue {
  for (
    let t: RecoveredValue = e.parentElement;
    t && t !== document.body;
    t = t.parentElement
  ) {
    let { overflowX: e, overflowY: n }: RecoveredValue = getComputedStyle(t);
    if (e !== `visible` || n !== `visible`) {
      let e: RecoveredValue = t.getBoundingClientRect();
      return {
        top: Math.max(e.top, 0),
        left: Math.max(e.left, 0),
        right: Math.min(e.right, window.innerWidth),
        bottom: Math.min(e.bottom, window.innerHeight),
      };
    }
  }
  return {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };
}
function ComponentLm({
  open,
  role = `listbox`,
  label,
  head,
  sections,
  anchor,
  container,
  align = `end`,
  width = 260,
  wide = !1,
  inline = !1,
  onPick,
  onClose,
}: RecoveredValue): RecoveredValue {
  let p: RecoveredValue = (0, D_index_BzMVbDoG.useId)(),
    m: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(null),
    h: RecoveredValue = (0, D_index_BzMVbDoG.useRef)([]),
    g: RecoveredValue = sections.flatMap((e?: RecoveredValue): RecoveredValue => e.rows),
    [_, v]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(0),
    [y, b]: RecoveredValue = (0, D_index_BzMVbDoG.useState)({
      top: 0,
      left: 0,
      width: width,
      up: !0,
      fromTop: 0,
      fromLeft: 0,
      fromRadius: 0,
    }),
    [x, S]: RecoveredValue = (0, D_index_BzMVbDoG.useState)({
      y: 0,
      h: 0,
      glide: !1,
    }),
    [C, w]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(!1),
    T: RecoveredValue = (0, D_index_BzMVbDoG.useRef)(!1),
    [ee, te]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(!1),
    [ne, E]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(!1),
    [re, ie]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(!1),
    ae: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = m.current;
      e && ie(e.scrollTop + e.clientHeight < e.scrollHeight - 2);
    },
    [O, k]: RecoveredValue = (0, D_index_BzMVbDoG.useState)(!0);
  ((0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
    if (!open) {
      te(!1);
      let e: RecoveredValue = window.setTimeout((): RecoveredValue => k(!0), 320);
      return (): RecoveredValue => clearTimeout(e);
    }
    if (O) {
      k(!1);
      return;
    }
    if (!anchor.current || !container.current || !m.current) return;
    let t: RecoveredValue = anchor.current.getBoundingClientRect(),
      n: RecoveredValue = container.current.getBoundingClientRect(),
      r: RecoveredValue = cm(container.current),
      i: RecoveredValue = n.width / (container.current.offsetWidth || n.width) || 1,
      u: RecoveredValue = Math.min(
        wide ? container.current.offsetWidth : width,
        (r.right - r.left) / i - 16,
      );
    ((m.current.style.width = `${u}px`), (m.current.style.maxHeight = ``));
    let d: RecoveredValue = u * i,
      f: RecoveredValue = m.current.offsetHeight * i,
      p: RecoveredValue = 8 * i,
      h: RecoveredValue = wide ? -6 * i : 0,
      _: RecoveredValue = 8 * i,
      y: RecoveredValue = wide ? n : t,
      x: RecoveredValue = y.top + h - (r.top + _),
      S: RecoveredValue = r.bottom - _ - (y.bottom + p),
      C: RecoveredValue = wide ? x >= Math.min(f, 160 * i) || x >= S : x >= f || x >= S,
      T: RecoveredValue = Math.min(f, Math.max(0, C ? x : S)),
      ee: RecoveredValue = (
        e?: RecoveredValue,
        t?: RecoveredValue,
        n?: RecoveredValue,
      ): RecoveredValue => Math.max(t, Math.min(e, n)),
      ne: RecoveredValue = ee(
        C ? y.top + h - T : y.bottom + p,
        r.top + _,
        r.bottom - _ - T,
      ),
      re: RecoveredValue = ee(
        wide ? n.left : align === `start` ? t.left : t.right - d,
        r.left + _,
        r.right - _ - d,
      ),
      D: RecoveredValue = ee(t.left - re, 0, d - 1) / i,
      ie: RecoveredValue = (C ? ee(T - t.height, 0, T - 1) : 0) / i;
    ((m.current.style.maxHeight = `${T / i}px`),
      b({
        top: (ne - n.top) / i,
        left: (re - n.left) / i,
        width: u,
        up: C,
        fromTop: ie,
        fromLeft: D,
        fromRadius: 6,
      }),
      v(
        Math.max(
          0,
          g.findIndex((e?: RecoveredValue): RecoveredValue => e.checked),
        ),
      ),
      w(!1),
      E(!0));
  }, [open, O]),
    (0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
      open && !ee && m.current && (getComputedStyle(m.current).clipPath, E(!1), te(!0));
    }, [y]),
    (0, D_index_BzMVbDoG.useEffect)((): RecoveredValue => {
      (ee &&
        (m.current?.focus({
          preventScroll: !0,
        }),
        m.current?.matches(`:focus-visible`) && w(!0)),
        ae());
    }, [ee]),
    (0, D_index_BzMVbDoG.useLayoutEffect)((): RecoveredValue => {
      let t: RecoveredValue = h.current[_];
      t &&
        S({
          y: t.offsetTop,
          h: t.offsetHeight,
          glide: T.current && C,
        });
      let n: RecoveredValue = m.current;
      (t &&
        n &&
        open &&
        (t.offsetTop < n.scrollTop
          ? (n.scrollTop = t.offsetTop - 4)
          : t.offsetTop + t.offsetHeight > n.scrollTop + n.clientHeight &&
            (n.scrollTop = t.offsetTop + t.offsetHeight - n.clientHeight + 4)),
        (T.current = C));
    }, [_, open, C]),
    (0, D_index_BzMVbDoG.useEffect)((): RecoveredValue => {
      if (!open) return;
      let t: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = e.target;
        m.current?.contains(t) || anchor.current?.contains(t) || onClose(!1);
      };
      return (
        document.addEventListener(`pointerdown`, t),
        (): RecoveredValue => document.removeEventListener(`pointerdown`, t)
      );
    }, [open, onClose, anchor]));
  let oe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.target === m.current,
        n: RecoveredValue = m.current?.querySelector(`.ui-ccc__menu-head :is(a, button)`);
      if (e.key === `Tab` && n && t !== e.shiftKey) {
        (e.preventDefault(),
          (t ? n : m.current)?.focus({
            preventScroll: !0,
          }));
        return;
      }
      if (!t && e.key !== `Tab` && e.key !== `Escape`) return;
      let r: RecoveredValue = g.length - 1,
        i: RecoveredValue = {
          ArrowDown: Math.min(r, _ + 1),
          ArrowUp: Math.max(0, _ - 1),
          Home: 0,
          End: r,
        };
      e.key in i
        ? (e.preventDefault(), v(i[e.key]), w(!0))
        : e.key === `Enter` || e.key === ` `
          ? (e.preventDefault(), onPick(g[_].id))
          : e.key === `Escape`
            ? (e.preventDefault(), e.stopPropagation(), onClose(!0))
            : e.key === `Tab` &&
              (anchor.current?.focus({
                preventScroll: !0,
              }),
              onClose(!1));
    },
    se: RecoveredValue = -1;
  return (
    <div
      className={`ui-ccc__menu`}
      data-open={ee}
      data-placing={ne}
      data-up={y.up}
      data-inline={inline || void 0}
      data-above={(wide && y.up) || void 0}
      style={
        {
          display: O ? `none` : void 0,
          top: y.top,
          left: y.left,
          width: y.width,
          "--from-top": `${y.fromTop}px`,
          "--from-left": `${y.fromLeft}px`,
          "--from-bottom": y.up ? `0px` : `calc(100% - ${y.fromRadius * 2}px)`,
          "--from-radius": `${y.fromRadius}px`,
        } as RecoveredValue
      }
      inert={!ee}
    >
      <div
        ref={m as RecoveredValue}
        className={`ui-ccc__menu-panel`}
        role={role}
        tabIndex={-1}
        aria-label={label}
        aria-activedescendant={`${p}-${_}`}
        onKeyDown={oe}
        onPointerLeave={(): RecoveredValue => w(!1)}
        onScroll={ae}
        data-more={re || void 0}
      >
        <span
          className={`ui-ccc__menu-fill`}
          aria-hidden={`true`}
          data-glide={x.glide}
          style={
            {
              transform: `translateY(${x.y}px)`,
              height: x.h,
              opacity: +!!C,
            } as RecoveredValue
          }
        />
        {head && <div className={`ui-ccc__menu-head`}>{head}</div>}
        {sections.map(
          (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
            <div
              className={`ui-ccc__menu-section`}
              role={`group`}
              aria-label={e.title}
              key={n}
            >
              {e.title && (
                <div className={`ui-ccc__menu-title`} aria-hidden={`true`}>
                  {e.title}
                </div>
              )}
              {e.rows.map((e?: RecoveredValue): RecoveredValue => {
                let n: RecoveredValue = ++se;
                return (
                  <div
                    ref={
                      ((e?: RecoveredValue): RecoveredValue => {
                        h.current[n] = e;
                      }) as RecoveredValue
                    }
                    id={`${p}-${n}`}
                    role={
                      role === `listbox`
                        ? `option`
                        : e.checked === void 0
                          ? `menuitem`
                          : `menuitemcheckbox`
                    }
                    aria-selected={role === `listbox` ? !!e.checked : void 0}
                    aria-checked={
                      role === `menu` && e.checked !== void 0 ? e.checked : void 0
                    }
                    data-checked={e.checked || void 0}
                    data-tone={e.tone}
                    className={`ui-ccc__option`}
                    onPointerEnter={(): RecoveredValue => {
                      (v(n), w(!0));
                    }}
                    onClick={(): RecoveredValue => onPick(e.id)}
                    key={e.id}
                  >
                    <span className={`ui-ccc__option-logo`} aria-hidden={`true`}>
                      {e.icon}
                    </span>
                    <span className={`ui-ccc__option-text`}>
                      <span
                        className={`ui-ccc__option-name`}
                        title={e.label}
                        dir={`auto`}
                      >
                        {e.label}
                      </span>
                      {e.description && (
                        <span className={`ui-ccc__option-desc`} dir={`auto`}>
                          {e.description}
                        </span>
                      )}
                    </span>
                    <span className={`ui-ccc__option-check`} aria-hidden={`true`}>
                      <ComponentJm />
                    </span>
                  </div>
                );
              })}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
var ComponentUm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
    <path
      d={`M8 2.5c.28 0 .5.22.5.5v4.5H13a.5.5 0 0 1 0 1H8.5V13a.5.5 0 0 1-1 0V8.5H3a.5.5 0 0 1 0-1h4.5V3c0-.28.22-.5.5-.5Z`}
    />
  </svg>
);
var ComponentDm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} {...km} aria-hidden={`true`}>
    <circle cx={`12`} cy={`12`} r={`9`} />
    <path d={`M8.5 12.5L10.8 14.8L15.5 9.8`} />
  </svg>
);
var ComponentFm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} {...km} aria-hidden={`true`}>
    <path
      d={`M19.5 12.5L12.6 19.4C10.6 21.4 7.4 21.4 5.4 19.4C3.4 17.4 3.4 14.2 5.4 12.2L12.8 4.8C14.1 3.5 16.2 3.5 17.6 4.8C18.9 6.2 18.9 8.3 17.6 9.6L10.4 16.8C9.7 17.5 8.6 17.5 7.9 16.8C7.2 16.1 7.2 15 7.9 14.3L14.5 7.7`}
    />
  </svg>
);
var ComponentPm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} {...km} aria-hidden={`true`}>
    <path
      d={`M3 7.5C3 6.1 4.1 5 5.5 5H9.2C9.9 5 10.5 5.3 11 5.8L12.2 7H18.5C19.9 7 21 8.1 21 9.5V16.5C21 17.9 19.9 19 18.5 19H5.5C4.1 19 3 17.9 3 16.5V7.5Z`}
    />
    <path d={`M3 10H21`} />
  </svg>
);
var ComponentMm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} {...km} aria-hidden={`true`}>
    <path d={`M21 12A9 9 0 1 1 12 3`} />
    <path d={`M17 12A5 5 0 1 1 12 7`} />
    <path d={`M12 12L19 5M16 4.5V8H19.5`} />
  </svg>
);
var ComponentHm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} {...km} aria-hidden={`true`}>
    <path
      d={`M9 18H15M10 21H14M12 3C8.7 3 6 5.6 6 8.9C6 11.1 7.2 12.6 8.4 13.8C9 14.4 9.4 15.2 9.4 16V16.5H14.6V16C14.6 15.2 15 14.4 15.6 13.8C16.8 12.6 18 11.1 18 8.9C18 5.6 15.3 3 12 3Z`}
    />
  </svg>
);
var ComponentGm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <circle
      cx={`12`}
      cy={`12`}
      r={`8.2`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
    />
    <circle cx={`12`} cy={`12`} r={`4.6`} fill={`currentColor`} />
  </svg>
);
var Component_m: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} {...km} stroke={`#14b8a6`} aria-hidden={`true`}>
    <path
      d={`M4 15C6 10 8.5 6 10 6.5C12 7.2 6 15 8 16C10 17 13.5 9 15.5 10C17.3 10.9 13 16 14.8 16.8C16 17.3 18 15 20 13`}
    />
    <path d={`M4 20H12`} />
  </svg>
);
var ComponentVm: RecoveredValue = ({ color }: RecoveredValue): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <path
      d={`M6.5 2.5H14L19.5 8V19.5C19.5 20.6 18.6 21.5 17.5 21.5H6.5C5.4 21.5 4.5 20.6 4.5 19.5V4.5C4.5 3.4 5.4 2.5 6.5 2.5Z`}
      fill={color}
    />
    <path
      d={`M14 2.5V6.5C14 7.3 14.7 8 15.5 8H19.5`}
      fill={`#fff`}
      fillOpacity={`0.45`}
    />
    <path
      d={`M8 13H16M8 16.5H13.5`}
      stroke={`#fff`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
    />
  </svg>
);
var ComponentYm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 68.155 68.155`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M52.5305 32.6557V24.8463C52.5305 22.1016 54.7555 19.8766 57.5001 19.8766C60.2448 19.8766 62.4698 22.1016 62.4698 24.8463V42.027C62.4698 53.3194 53.3154 62.4735 42.0233 62.4735H34.2388M22.7127 39.7552L15.94 31.8537C14.8314 30.5602 13.2129 29.8159 11.5094 29.8159H11.1235C8.11379 29.8159 5.67395 32.2558 5.67395 35.2655C5.67395 36.3412 5.99241 37.393 6.58919 38.2881L16.4118 53.0221C20.3482 58.9269 26.9753 62.4735 34.0719 62.4735`}
      stroke={`currentColor`}
      strokeWidth={`4.7`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M52.534 24.1378V16.3284C52.534 13.5837 50.3091 11.3588 47.5644 11.3588C44.8197 11.3588 42.5948 13.5837 42.5948 16.3284V29.8174`}
      stroke={`currentColor`}
      strokeWidth={`4.7`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M42.5958 29.8198V10.6513C42.5958 7.90661 40.3708 5.68163 37.6262 5.68163C34.8815 5.68163 32.6565 7.90661 32.6565 10.6513V28.4`}
      stroke={`currentColor`}
      strokeWidth={`4.7`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M32.6576 28.3975V16.3284C32.6576 13.5837 30.4326 11.3588 27.6879 11.3588C24.9433 11.3588 22.7183 13.5837 22.7183 16.3284V39.7567`}
      stroke={`currentColor`}
      strokeWidth={`4.7`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var ComponentBm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 66.543 66.543`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M33.2482 22.1795V33.27`}
      stroke={`currentColor`}
      strokeWidth={`4.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M33.5966 43.67H33.2501M33.9432 43.67C33.9432 44.0529 33.633 44.3631 33.2501 44.3631C32.8672 44.3631 32.5569 44.0529 32.5569 43.67C32.5569 43.2871 32.8672 42.9768 33.2501 42.9768C33.633 42.9768 33.9432 43.2871 33.9432 43.67Z`}
      stroke={`currentColor`}
      strokeWidth={`4.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M58.202 31.0087V22.9595C58.202 18.4124 58.202 16.1389 57.0816 14.6555C55.9612 13.1722 53.4278 12.452 48.3612 11.0118C44.8995 10.0278 41.848 8.84228 39.41 7.76002C36.0859 6.28445 34.4237 5.54666 33.2484 5.54666C32.0728 5.54666 30.4109 6.28445 27.0868 7.76002C24.6487 8.84228 21.5973 10.0278 18.1357 11.0118C13.069 12.452 10.5356 13.1722 9.4152 14.6555C8.29475 16.1389 8.29475 18.4124 8.29475 22.9595V31.0087C8.29475 46.605 22.3319 55.9626 29.3498 59.6666C31.0331 60.5549 31.8748 60.9991 33.2484 60.9991C34.622 60.9991 35.4635 60.5549 37.1467 59.6666C44.1648 55.9626 58.202 46.605 58.202 31.0087Z`}
      stroke={`currentColor`}
      strokeWidth={`4.6`}
      strokeLinecap={`round`}
    />
  </svg>
);
var ComponentXm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var Sm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var Cm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M12 5.5V19`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var ComponentWm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 67 67`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M11.17 15.35v15.36h44.67v-6.98c0-3.86-3.13-6.98-6.98-6.98H33.5l-3.93-5.89a5.58 5.58 0 0 0-4.64-2.49h-6.78c-3.86 0-6.98 3.13-6.98 6.98Z`}
      fill={`#00A1FF`}
    />
    <path
      d={`M33.5 16.75l-3.93-5.89a5.58 5.58 0 0 0-4.64-2.49h-6.78c-3.86 0-6.98 3.13-6.98 6.98v15.36h44.67v-6.98c0-3.86-3.13-6.98-6.98-6.98H33.5Zm0 0h-9.77`}
      stroke={`#00A1FF`}
      strokeWidth={`4.19`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M6.59 42.38c-1.05-5.26-1.57-7.89-.08-9.67l.31-.34c1.66-1.66 4.59-1.66 10.45-1.66h32.46c5.86 0 8.79 0 10.45 1.66l.31.34c1.49 1.78.97 4.41-.08 9.67-1.51 7.56-2.26 11.34-5.1 13.66l-.6.46c-3.01 2.13-7.23 2.13-15.66 2.13h-11.1c-8.43 0-12.64 0-15.66-2.13l-.6-.46c-2.84-2.32-3.6-6.1-5.1-13.66Z`}
      fill={`#3CC7FF`}
      stroke={`#3CC7FF`}
      strokeWidth={`4.19`}
    />
  </svg>
);
var Tm: RecoveredValue = (): RecoveredValue =>
  `ui-ccc` + (0, D_index_BzMVbDoG.useId)().replace(/[^a-zA-Z0-9_-]/g, ``);
var Em: RecoveredValue = (): RecoveredValue => {
  let e: RecoveredValue = Tm();
  return (
    <svg viewBox={`0 0 56.4108 44.8722`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M44.2255 5.76727H56.4051V41.0239C56.4051 43.148 54.683 44.8701 52.5589 44.8701H46.1486C45.8961 44.8701 45.646 44.8204 45.4127 44.7237C45.1794 44.6271 44.9674 44.4854 44.7888 44.3069C44.6102 44.1283 44.4686 43.9163 44.3719 43.683C44.2753 43.4497 44.2255 43.1996 44.2255 42.947V5.76727Z`}
        fill={`url(#${e}-0)`}
      />
      <path
        d={`M12.1796 5.76727H0V41.0239C0 43.148 1.72213 44.8701 3.84618 44.8701H10.2565C10.509 44.8701 10.7591 44.8204 10.9924 44.7237C11.2257 44.6271 11.4377 44.4854 11.6163 44.3069C11.7949 44.1283 11.9365 43.9163 12.0332 43.683C12.1298 43.4497 12.1796 43.1996 12.1796 42.947V5.76727Z`}
        fill={`#FC413D`}
      />
      <path
        d={`M10.0085 1.42778C7.43377 -0.736342 3.5924 -0.403647 1.42828 2.17105C-0.735843 4.74543 -0.403148 8.58681 2.17155 10.7512L26.5557 31.2479C27.0178 31.6362 27.602 31.8492 28.2056 31.8492C28.8091 31.8492 29.3934 31.6362 29.8554 31.2479L54.2396 10.7509C56.814 8.58681 57.1467 4.74543 54.9825 2.17073C52.8184 -0.403648 48.977 -0.736342 46.4027 1.42778L28.2054 16.724L10.0085 1.42778Z`}
        fill={`url(#${e}-1)`}
      />
      <defs>
        <linearGradient
          id={`${e}-0`}
          x1={`50.3153`}
          y1={`5.76727`}
          x2={`50.3153`}
          y2={`44.8701`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#60D673`} />
          <stop offset={`0.17`} stopColor={`#42C868`} />
          <stop offset={`0.39`} stopColor={`#0EBC5F`} />
          <stop offset={`0.62`} stopColor={`#00A9BB`} />
          <stop offset={`0.86`} stopColor={`#3C90FF`} />
          <stop offset={`1`} stopColor={`#3186FF`} />
        </linearGradient>
        <linearGradient
          id={`${e}-1`}
          x1={`6.04194e-05`}
          y1={`6.45153`}
          x2={`56.4107`}
          y2={`6.45153`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop offset={`0.08`} stopColor={`#FF63A0`} />
          <stop offset={`0.3`} stopColor={`#FC413D`} />
          <stop offset={`0.5`} stopColor={`#FC413D`} />
          <stop offset={`0.65`} stopColor={`#FC413D`} />
          <stop offset={`0.72`} stopColor={`#FC5C30`} />
          <stop offset={`0.86`} stopColor={`#FEB10C`} />
          <stop offset={`0.91`} stopColor={`#FEC700`} />
          <stop offset={`0.96`} stopColor={`#FFDB0F`} />
        </linearGradient>
      </defs>
    </svg>
  );
};
var Dm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 49.883 49.877`} fill={`none`} aria-hidden={`true`}>
    <g transform={`translate(0 0)`}>
      <path
        d={`M18.3549 10.4784C15.4713 10.4784 13.1157 8.12279 13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V10.4784H18.3549Z`}
        fill={`#36C5F0`}
      />
      <path
        d={`M18.3575 13.12C21.2411 13.12 23.5967 15.4756 23.5967 18.3592C23.5967 21.2428 21.2411 23.5984 18.3575 23.5984H5.2392C2.35561 23.5984 0 21.2428 0 18.3592C0 15.4756 2.35561 13.12 5.2392 13.12H18.3575Z`}
        fill={`#36C5F0`}
      />
    </g>
    <g transform={`translate(26.28 0)`}>
      <path
        d={`M13.1244 18.3592C13.1244 15.4756 15.48 13.12 18.3636 13.12C21.2472 13.12 23.6028 15.4756 23.6028 18.3592C23.6028 21.2428 21.2472 23.5984 18.3636 23.5984H13.1244V18.3592Z`}
        fill={`#2EB67D`}
      />
      <path
        d={`M10.4785 18.3575C10.4785 21.2411 8.12286 23.5967 5.23927 23.5967C2.35568 23.5967 7.4362e-05 21.2411 7.4362e-05 18.3575V5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0C8.12286 0 10.4785 2.35561 10.4785 5.2392V18.3575Z`}
        fill={`#2EB67D`}
      />
    </g>
    <g transform={`translate(0 26.28)`}>
      <path
        d={`M10.4784 5.2392C10.4784 8.12279 8.12279 10.4784 5.2392 10.4784C2.35561 10.4784 0 8.12279 0 5.2392C0 2.35561 2.35561 0 5.2392 0H10.4784V5.2392Z`}
        fill={`#E01E5A`}
      />
      <path
        d={`M13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V18.3575C23.5941 21.2411 21.2385 23.5967 18.3549 23.5967C15.4713 23.5967 13.1157 21.2411 13.1157 18.3575V5.2392Z`}
        fill={`#E01E5A`}
      />
    </g>
    <g transform={`translate(26.28 26.28)`}>
      <path
        d={`M5.23927 13.1157C8.12286 13.1157 10.4785 15.4713 10.4785 18.3549C10.4785 21.2385 8.12286 23.5941 5.23927 23.5941C2.35568 23.5941 7.4362e-05 21.2385 7.4362e-05 18.3549V13.1157H5.23927Z`}
        fill={`#ECB22E`}
      />
      <path
        d={`M5.23927 10.4784C2.35568 10.4784 7.4362e-05 8.12279 7.4362e-05 5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0H18.3576C21.2412 0 23.5968 2.35561 23.5968 5.2392C23.5968 8.12279 21.2412 10.4784 18.3576 10.4784H5.23927Z`}
        fill={`#ECB22E`}
      />
    </g>
  </svg>
);
var Om: RecoveredValue = (): RecoveredValue => {
  let e: RecoveredValue = Tm();
  return (
    <svg viewBox={`0 0 49.7096 59.6884`} fill={`none`} aria-hidden={`true`}>
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M0 45.9002L9.1618 38.8247C14.0602 45.1745 19.2307 48.1679 24.9455 48.1679C30.6603 48.1679 35.7401 45.2652 40.3663 38.9154L49.7096 45.8094C42.997 54.8805 34.6516 59.6882 24.9455 59.6882C15.3301 59.6882 6.89403 54.8805 0 45.9002Z`}
        fill={`url(#${e}-0)`}
      />
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M24.9535 15.3301L8.62558 29.3903L1.09657 20.5914L25.0442 0L48.8105 20.5914L41.1908 29.2996L24.9535 15.3301Z`}
        fill={`url(#${e}-1)`}
      />
      <defs>
        <linearGradient
          id={`${e}-0`}
          x1={`0`}
          y1={`49.2666`}
          x2={`49.75`}
          y2={`49.2666`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#8930FD`} />
          <stop offset={`1`} stopColor={`#49CCF9`} />
        </linearGradient>
        <linearGradient
          id={`${e}-1`}
          x1={`1.09231`}
          y1={`14.6901`}
          x2={`48.7603`}
          y2={`14.6901`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#FF02F0`} />
          <stop offset={`1`} stopColor={`#FFC800`} />
        </linearGradient>
      </defs>
    </svg>
  );
};
var km: RecoveredValue = {
  fill: `none`,
  stroke: `currentColor`,
  strokeWidth: 1.6,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var Am: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} {...km} aria-hidden={`true`}>
    <path
      d={`M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z`}
    />
    <path
      d={`M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z`}
    />
  </svg>
);
var ComponentJm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} {...km} strokeWidth={2} aria-hidden={`true`}>
    <path d={`M5 14L8.5 17.5L19 6.5`} />
  </svg>
);
var Mm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 24 24`} {...km} aria-hidden={`true`}>
    <path d={`M18 6L6.00081 17.9992M17.9992 18L6 6.00085`} />
  </svg>
);
var Nm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 1200 1200`} aria-hidden={`true`}>
    <path
      fill={`#D97757`}
      d={`M 233.959793 800.214905 L 468.644287 668.536987 L 472.590637 657.100647 L 468.644287 650.738403 L 457.208069 650.738403 L 417.986633 648.322144 L 283.892639 644.69812 L 167.597321 639.865845 L 54.926208 633.825623 L 26.577238 627.785339 L 3.3e-05 592.751709 L 2.73832 575.27533 L 26.577238 559.248352 L 60.724873 562.228149 L 136.187973 567.382629 L 249.422867 575.194763 L 331.570496 580.026978 L 453.261841 592.671082 L 472.590637 592.671082 L 475.328857 584.859009 L 468.724915 580.026978 L 463.570557 575.194763 L 346.389313 495.785217 L 219.543671 411.865906 L 153.100723 363.543762 L 117.181267 339.060425 L 99.060455 316.107361 L 91.248367 266.01355 L 123.865784 230.093994 L 167.677887 233.073853 L 178.872513 236.053772 L 223.248367 270.201477 L 318.040283 343.570496 L 441.825592 434.738342 L 459.946411 449.798706 L 467.194672 444.64447 L 468.080597 441.020203 L 459.946411 427.409485 L 392.617493 305.718323 L 320.778564 181.932983 L 288.80542 130.630859 L 280.348999 99.865845 C 277.369171 87.221436 275.194641 76.590698 275.194641 63.624268 L 312.322174 13.20813 L 332.8591 6.604126 L 382.389313 13.20813 L 403.248352 31.328979 L 434.013519 101.71814 L 483.865753 212.537048 L 561.181274 363.221497 L 583.812134 407.919434 L 595.892639 449.315491 L 600.40271 461.959839 L 608.214783 461.959839 L 608.214783 454.711609 L 614.577271 369.825623 L 626.335632 265.61084 L 637.771851 131.516846 L 641.718201 93.745117 L 660.402832 48.483276 L 697.530334 24.000122 L 726.52356 37.852417 L 750.362549 72 L 747.060486 94.067139 L 732.886047 186.201416 L 705.100708 330.52356 L 686.979919 427.167847 L 697.530334 427.167847 L 709.61084 415.087341 L 758.496704 350.174561 L 840.644348 247.490051 L 876.885925 206.738342 L 919.167847 161.71814 L 946.308838 140.29541 L 997.61084 140.29541 L 1035.38269 196.429626 L 1018.469849 254.416199 L 965.637634 321.422852 L 921.825562 378.201538 L 859.006714 462.765259 L 819.785278 530.41626 L 823.409424 535.812073 L 832.75177 534.92627 L 974.657776 504.724915 L 1051.328979 490.872559 L 1142.818848 475.167786 L 1184.214844 494.496582 L 1188.724854 514.147644 L 1172.456421 554.335693 L 1074.604126 578.496765 L 959.838989 601.449829 L 788.939636 641.879272 L 786.845764 643.409485 L 789.261841 646.389343 L 866.255127 653.637634 L 899.194702 655.409424 L 979.812134 655.409424 L 1129.932861 666.604187 L 1169.154419 692.537109 L 1192.671265 724.268677 L 1188.724854 748.429688 L 1128.322144 779.194641 L 1046.818848 759.865845 L 856.590759 714.604126 L 791.355774 698.335754 L 782.335693 698.335754 L 782.335693 703.731567 L 836.69812 756.885986 L 936.322205 846.845581 L 1061.073975 962.81897 L 1067.436279 991.490112 L 1051.409424 1014.120911 L 1034.496704 1011.704712 L 924.885986 929.234924 L 882.604126 892.107544 L 786.845764 811.48999 L 780.483276 811.48999 L 780.483276 819.946289 L 802.550415 852.241699 L 919.087341 1027.409424 L 925.127625 1081.127686 L 916.671204 1098.604126 L 886.469849 1109.154419 L 853.288696 1103.114136 L 785.073914 1007.355835 L 714.684631 899.516785 L 657.906067 802.872498 L 650.979858 806.81897 L 617.476624 1167.704834 L 601.771851 1186.147705 L 565.530212 1200 L 535.328857 1177.046997 L 519.302124 1139.919556 L 535.328857 1066.550537 L 554.657776 970.792053 L 570.362488 894.68457 L 584.536926 800.134277 L 592.993347 768.724976 L 592.429626 766.630859 L 585.503479 767.516968 L 514.22821 865.369263 L 405.825531 1011.865906 L 320.053711 1103.677979 L 299.516815 1111.812256 L 263.919525 1093.369263 L 267.221497 1060.429688 L 287.114136 1031.114136 L 405.825531 880.107361 L 477.422913 786.52356 L 523.651062 732.483276 L 523.328918 724.671265 L 520.590698 724.671265 L 205.288605 929.395935 L 149.154434 936.644409 L 124.993355 914.01355 L 127.973183 876.885986 L 139.409409 864.80542 L 234.201385 799.570435 L 233.879227 799.8927 Z`}
    />
  </svg>
);
var Pm: RecoveredValue = (): RecoveredValue => (
  <svg viewBox={`0 0 68.614 68.002`} aria-hidden={`true`}>
    <path
      fill={`currentColor`}
      d={`M26.3166 24.7525V18.2923C26.3166 17.7482 26.5208 17.3401 26.9966 17.0684L39.9853 9.5882C41.7533 8.56821 43.8615 8.09244 46.0372 8.09244C54.1973 8.09244 59.3658 14.4167 59.3658 21.1486C59.3658 21.6245 59.3658 22.1686 59.2976 22.7127L45.8331 14.8243C45.0172 14.3486 44.2009 14.3486 43.385 14.8243L26.3166 24.7525ZM56.6454 49.9134V34.4766C56.6454 33.5244 56.2371 32.8444 55.4213 32.3685L38.3529 22.4403L43.9291 19.244C44.405 18.9723 44.8131 18.9723 45.289 19.244L58.2776 26.7242C62.018 28.9005 64.5338 33.5244 64.5338 38.0122C64.5338 43.1802 61.4739 47.9406 56.6454 49.9128V49.9134ZM22.3045 36.3131L16.7284 33.0492C16.2526 32.7775 16.0484 32.3692 16.0484 31.8251V16.8649C16.0484 9.58891 21.6245 4.08038 29.1729 4.08038C32.0293 4.08038 34.6809 5.03262 36.9255 6.7326L23.5292 14.485C22.7134 14.9608 22.3052 15.6408 22.3052 16.5932V36.3137L22.3045 36.3131ZM34.307 43.2491L26.3166 38.7611V29.2412L34.307 24.7532L42.2968 29.2412V38.7611L34.307 43.2491ZM39.4411 63.9219C36.5848 63.9219 33.9333 62.9697 31.6886 61.2699L45.0848 53.5173C45.9007 53.0415 46.3089 52.3615 46.3089 51.4091V31.6886L51.9533 34.9525C52.4291 35.2242 52.6333 35.6324 52.6333 36.1766V51.1369C52.6333 58.4128 46.9889 63.9214 39.4411 63.9214V63.9219ZM23.3245 48.7576L10.3358 41.2775C6.59541 39.1011 4.07967 34.4773 4.07967 29.9894C4.07967 24.7532 7.2078 20.0612 12.0356 18.0889V33.5933C12.0356 34.5455 12.4439 35.2255 13.2597 35.7014L30.2605 45.5613L24.6844 48.7576C24.2086 49.0293 23.8003 49.0293 23.3245 48.7576ZM22.5769 59.9099C14.8926 59.9099 9.24834 54.1297 9.24834 46.9895C9.24834 46.4454 9.31651 45.9013 9.38411 45.3572L22.7804 53.1097C23.5962 53.5856 24.4127 53.5856 25.2284 53.1097L42.2968 43.2498V49.71C42.2968 50.2541 42.0927 50.6622 41.6168 50.9339L28.6283 58.4141C26.8601 59.4341 24.752 59.9099 22.5762 59.9099H22.5769ZM39.4411 68.0017C47.6694 68.0017 54.5372 62.1538 56.1019 54.4013C63.718 52.4291 68.6141 45.2889 68.6141 38.0129C68.6141 33.2526 66.5743 28.6288 62.9021 25.2966C63.2421 23.8685 63.4462 22.4403 63.4462 21.0129C63.4462 11.2887 55.5578 4.01207 46.4454 4.01207C44.6098 4.01207 42.8416 4.28375 41.0735 4.89614C38.0129 1.90392 33.7968 0 29.1729 0C20.9447 0 14.0769 5.84782 12.5122 13.6003C4.89614 15.5725 0 22.7127 0 29.9887C0 34.749 2.03983 39.3728 5.71204 42.705C5.37205 44.1331 5.16797 45.5613 5.16797 46.9889C5.16797 56.713 13.0563 63.9895 22.1686 63.9895C24.0044 63.9895 25.7725 63.7179 27.5407 63.1055C30.6005 66.0977 34.8166 68.0017 39.4411 68.0017Z`}
    />
  </svg>
);
var t_HugeiconsIcon_C2cDExRS: RecoveredValue = t_react_BkAXpnfr(),
  n_HugeiconsIcon_C2cDExRS: RecoveredValue = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
  },
  ComponentN_HugeiconsIcon_C2cDExRS: RecoveredValue = (0,
  t_HugeiconsIcon_C2cDExRS.forwardRef)(
    (
      {
        color = `currentColor`,
        size = 24,
        strokeWidth,
        absoluteStrokeWidth = !1,
        className = ``,
        altIcon,
        showAlt = !1,
        icon,
        primaryColor,
        secondaryColor,
        disableSecondaryOpacity = !1,
        ...p
      }: RecoveredValue,
      m?: RecoveredValue,
    ): RecoveredValue => {
      let h: RecoveredValue =
          strokeWidth === void 0
            ? void 0
            : absoluteStrokeWidth
              ? (Number(strokeWidth) * 24) / Number(size)
              : strokeWidth,
        g: RecoveredValue =
          h === void 0
            ? {}
            : {
                strokeWidth: h,
                stroke: `currentColor`,
              },
        _: RecoveredValue = {
          ref: m,
          ...n_HugeiconsIcon_C2cDExRS,
          width: size,
          height: size,
          color: primaryColor || color,
          className: className,
          ...g,
          ...p,
        },
        v: RecoveredValue = [...(showAlt && altIcon ? altIcon : icon)]
          .sort(([, e]: RecoveredValue, [, t]: RecoveredValue): RecoveredValue => {
            let n: RecoveredValue = e.opacity !== void 0;
            return t.opacity === void 0 ? (n ? -1 : 0) : 1;
          })
          .map(([n, r]: RecoveredValue): RecoveredValue => {
            let i: RecoveredValue = r.opacity !== void 0,
              a: RecoveredValue = i && !disableSecondaryOpacity ? r.opacity : void 0,
              o: RecoveredValue = secondaryColor
                ? {
                    ...(r.stroke === void 0
                      ? {
                          fill: i ? secondaryColor : primaryColor || color,
                        }
                      : {
                          stroke: i ? secondaryColor : primaryColor || color,
                        }),
                  }
                : {};
            return (0, t_HugeiconsIcon_C2cDExRS.createElement)(n, {
              ...r,
              ...g,
              ...o,
              opacity: a,
              key: r.key,
            });
          });
      return (0, t_HugeiconsIcon_C2cDExRS.createElement)(`svg`, _, v);
    },
  );
ComponentN_HugeiconsIcon_C2cDExRS.displayName = `HugeiconsIcon`;
var n_component_clean_CMpdFqie: RecoveredValue = t_react_BkAXpnfr(),
  r_component_clean_CMpdFqie: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  ComponentI: RecoveredValue = ({ d: e }: RecoveredValue): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} className={`ui-cmc__glyph`} aria-hidden={`true`}>
      <path d={e} />
    </svg>
  ),
  a_component_clean_CMpdFqie: RecoveredValue = {
    doc: `M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4`,
    person: `M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0M19 8v4M17 10h4`,
    inbox: `M4 13l2.5-8h11L20 13v6H4zM4 13h4.5a3.5 3.5 0 0 0 7 0H20`,
    home: `M4 11l8-7 8 7v9h-5v-6H9v6H4z`,
    gear: `M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13.5l1.6 1.2-2 3.4-1.9-.7a7 7 0 0 1-1.7 1L15 20.5h-4l-.4-2.1a7 7 0 0 1-1.7-1l-1.9.7-2-3.4 1.6-1.2a7 7 0 0 1 0-3l-1.6-1.2 2-3.4 1.9.7a7 7 0 0 1 1.7-1L11 3.5h4l.4 2.1a7 7 0 0 1 1.7 1l1.9-.7 2 3.4-1.6 1.2a7 7 0 0 1 0 3z`,
    moon: `M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z`,
    help: `M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01`,
    upload: `M12 16V4M7 9l5-5 5 5M5 20h14`,
    chart: `M5 20V10M12 20V4M19 20v-7`,
  },
  ComponentO: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
      <defs>
        <linearGradient id={`ui-cmc-spark`} x1={`0`} y1={`0`} x2={`1`} y2={`1`}>
          <stop stopColor={`#7C5CFF`} />
          <stop offset={`1`} stopColor={`#2F9BFF`} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#ui-cmc-spark)`}
        d={`M12 2.5c.6 3.9 2.1 6.4 4.4 7.6 1.1.6 2.4.9 4.1 1.1v1.6c-4.6.6-7.3 3-8.5 8.7h-1.6c-.6-3.9-2.1-6.4-4.4-7.6-1.1-.6-2.4-.9-4.1-1.1v-1.6c4.6-.6 7.3-3 8.5-8.7z`}
      />
    </svg>
  ),
  s_component_clean_CMpdFqie: RecoveredValue = (): RecoveredValue =>
    `lg` + (0, n_component_clean_CMpdFqie.useId)().replace(/[^a-zA-Z0-9_-]/g, ``),
  c_component_clean_CMpdFqie: RecoveredValue = [
    {
      id: `suggestions`,
      label: `Suggestions`,
      commands: [
        {
          id: `email`,
          label: `Write an email`,
          hint: `Gmail`,
          logo: ((_Component?: RecoveredValue): RecoveredValue => <_Component />)(
            (): RecoveredValue => {
              let e: RecoveredValue = s_component_clean_CMpdFqie();
              return (
                <svg viewBox={`0 0 56.4108 44.8722`} fill={`none`} aria-hidden={`true`}>
                  <path
                    d={`M44.2255 5.76727H56.4051V41.0239C56.4051 43.148 54.683 44.8701 52.5589 44.8701H46.1486C45.8961 44.8701 45.646 44.8204 45.4127 44.7237C45.1794 44.6271 44.9674 44.4854 44.7888 44.3069C44.6102 44.1283 44.4686 43.9163 44.3719 43.683C44.2753 43.4497 44.2255 43.1996 44.2255 42.947V5.76727Z`}
                    fill={`url(#${e}-0)`}
                  />
                  <path
                    d={`M12.1796 5.76727H0V41.0239C0 43.148 1.72213 44.8701 3.84618 44.8701H10.2565C10.509 44.8701 10.7591 44.8204 10.9924 44.7237C11.2257 44.6271 11.4377 44.4854 11.6163 44.3069C11.7949 44.1283 11.9365 43.9163 12.0332 43.683C12.1298 43.4497 12.1796 43.1996 12.1796 42.947V5.76727Z`}
                    fill={`#FC413D`}
                  />
                  <path
                    d={`M10.0085 1.42778C7.43377 -0.736342 3.5924 -0.403647 1.42828 2.17105C-0.735843 4.74543 -0.403148 8.58681 2.17155 10.7512L26.5557 31.2479C27.0178 31.6362 27.602 31.8492 28.2056 31.8492C28.8091 31.8492 29.3934 31.6362 29.8554 31.2479L54.2396 10.7509C56.814 8.58681 57.1467 4.74543 54.9825 2.17073C52.8184 -0.403648 48.977 -0.736342 46.4027 1.42778L28.2054 16.724L10.0085 1.42778Z`}
                    fill={`url(#${e}-1)`}
                  />
                  <defs>
                    <linearGradient
                      id={`${e}-0`}
                      x1={`50.3153`}
                      y1={`5.76727`}
                      x2={`50.3153`}
                      y2={`44.8701`}
                      gradientUnits={`userSpaceOnUse`}
                    >
                      <stop stopColor={`#60D673`} />
                      <stop offset={`0.17`} stopColor={`#42C868`} />
                      <stop offset={`0.39`} stopColor={`#0EBC5F`} />
                      <stop offset={`0.62`} stopColor={`#00A9BB`} />
                      <stop offset={`0.86`} stopColor={`#3C90FF`} />
                      <stop offset={`1`} stopColor={`#3186FF`} />
                    </linearGradient>
                    <linearGradient
                      id={`${e}-1`}
                      x1={`6.04194e-05`}
                      y1={`6.45153`}
                      x2={`56.4107`}
                      y2={`6.45153`}
                      gradientUnits={`userSpaceOnUse`}
                    >
                      <stop offset={`0.08`} stopColor={`#FF63A0`} />
                      <stop offset={`0.3`} stopColor={`#FC413D`} />
                      <stop offset={`0.5`} stopColor={`#FC413D`} />
                      <stop offset={`0.65`} stopColor={`#FC413D`} />
                      <stop offset={`0.72`} stopColor={`#FC5C30`} />
                      <stop offset={`0.86`} stopColor={`#FEB10C`} />
                      <stop offset={`0.91`} stopColor={`#FEC700`} />
                      <stop offset={`0.96`} stopColor={`#FFDB0F`} />
                    </linearGradient>
                  </defs>
                </svg>
              );
            },
          ),
          keywords: `mail send compose`,
        },
        {
          id: `ask`,
          label: `Ask assistant`,
          hint: `Summaries, drafts, answers`,
          logo: <ComponentO />,
          keywords: `ai chat question`,
        },
        {
          id: `task`,
          label: `Create a task`,
          hint: `ClickUp`,
          logo: ((_Component2?: RecoveredValue): RecoveredValue => <_Component2 />)(
            (): RecoveredValue => {
              let e: RecoveredValue = s_component_clean_CMpdFqie();
              return (
                <svg viewBox={`0 0 49.7096 59.6884`} fill={`none`} aria-hidden={`true`}>
                  <path
                    fillRule={`evenodd`}
                    clipRule={`evenodd`}
                    d={`M0 45.9002L9.1618 38.8247C14.0602 45.1745 19.2307 48.1679 24.9455 48.1679C30.6603 48.1679 35.7401 45.2652 40.3663 38.9154L49.7096 45.8094C42.997 54.8805 34.6516 59.6882 24.9455 59.6882C15.3301 59.6882 6.89403 54.8805 0 45.9002Z`}
                    fill={`url(#${e}-0)`}
                  />
                  <path
                    fillRule={`evenodd`}
                    clipRule={`evenodd`}
                    d={`M24.9535 15.3301L8.62558 29.3903L1.09657 20.5914L25.0442 0L48.8105 20.5914L41.1908 29.2996L24.9535 15.3301Z`}
                    fill={`url(#${e}-1)`}
                  />
                  <defs>
                    <linearGradient
                      id={`${e}-0`}
                      x1={`0`}
                      y1={`49.2666`}
                      x2={`49.75`}
                      y2={`49.2666`}
                      gradientUnits={`userSpaceOnUse`}
                    >
                      <stop stopColor={`#8930FD`} />
                      <stop offset={`1`} stopColor={`#49CCF9`} />
                    </linearGradient>
                    <linearGradient
                      id={`${e}-1`}
                      x1={`1.09231`}
                      y1={`14.6901`}
                      x2={`48.7603`}
                      y2={`14.6901`}
                      gradientUnits={`userSpaceOnUse`}
                    >
                      <stop stopColor={`#FF02F0`} />
                      <stop offset={`1`} stopColor={`#FFC800`} />
                    </linearGradient>
                  </defs>
                </svg>
              );
            },
          ),
          keywords: `todo issue`,
        },
        {
          id: `crm`,
          label: `Add contact to CRM`,
          hint: `HubSpot`,
          logo: ((_Component3?: RecoveredValue): RecoveredValue => <_Component3 />)(
            (): RecoveredValue => (
              <svg viewBox={`0 0 24 24`} fill={`#FF7A59`} aria-hidden={`true`}>
                <path
                  d={`M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`}
                />
              </svg>
            ),
          ),
          keywords: `lead deal company`,
        },
        {
          id: `meet`,
          label: `Schedule a meeting`,
          hint: `Google Calendar`,
          logo: ((_Component4?: RecoveredValue): RecoveredValue => <_Component4 />)(
            (): RecoveredValue => (
              <svg viewBox={`0 0 24 24`} fill={`#4285F4`} aria-hidden={`true`}>
                <path
                  d={`M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zm-7.207 6.25v-.065c.272-.144.5-.349.687-.617s.279-.595.279-.982c0-.379-.099-.72-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.703 2.703 0 0 0-1.197-.257c-.6 0-1.094.156-1.481.467-.386.311-.65.671-.793 1.078l1.085.452c.086-.249.224-.461.413-.633.189-.172.445-.257.767-.257.33 0 .602.088.816.264a.86.86 0 0 1 .322.703c0 .33-.12.589-.36.778-.24.19-.535.284-.886.284h-.567v1.085h.633c.407 0 .748.109 1.02.327.272.218.407.499.407.843 0 .336-.129.614-.387.832s-.565.327-.924.327c-.351 0-.651-.103-.897-.311-.248-.208-.422-.502-.521-.881l-1.096.452c.178.616.505 1.082.977 1.401.472.319.984.478 1.538.477a2.84 2.84 0 0 0 1.293-.291c.382-.193.684-.458.902-.794.218-.336.327-.72.327-1.149 0-.429-.115-.797-.344-1.105a2.067 2.067 0 0 0-.881-.689zm2.093-1.931l.602.913L15 10.045v5.744h1.187V8.446h-.827l-2.158 1.557zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z`}
                />
              </svg>
            ),
          ),
          keywords: `call invite event`,
        },
      ],
    },
    {
      id: `share`,
      label: `Share`,
      commands: [
        {
          id: `slack`,
          label: `Post an update`,
          hint: `#team-updates`,
          logo: ((_Component5?: RecoveredValue): RecoveredValue => <_Component5 />)(
            (): RecoveredValue => (
              <svg viewBox={`0 0 49.883 49.877`} fill={`none`} aria-hidden={`true`}>
                <g transform={`translate(0 0)`}>
                  <path
                    d={`M18.3549 10.4784C15.4713 10.4784 13.1157 8.12279 13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V10.4784H18.3549Z`}
                    fill={`#36C5F0`}
                  />
                  <path
                    d={`M18.3575 13.12C21.2411 13.12 23.5967 15.4756 23.5967 18.3592C23.5967 21.2428 21.2411 23.5984 18.3575 23.5984H5.2392C2.35561 23.5984 0 21.2428 0 18.3592C0 15.4756 2.35561 13.12 5.2392 13.12H18.3575Z`}
                    fill={`#36C5F0`}
                  />
                </g>
                <g transform={`translate(26.28 0)`}>
                  <path
                    d={`M13.1244 18.3592C13.1244 15.4756 15.48 13.12 18.3636 13.12C21.2472 13.12 23.6028 15.4756 23.6028 18.3592C23.6028 21.2428 21.2472 23.5984 18.3636 23.5984H13.1244V18.3592Z`}
                    fill={`#2EB67D`}
                  />
                  <path
                    d={`M10.4785 18.3575C10.4785 21.2411 8.12286 23.5967 5.23927 23.5967C2.35568 23.5967 7.4362e-05 21.2411 7.4362e-05 18.3575V5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0C8.12286 0 10.4785 2.35561 10.4785 5.2392V18.3575Z`}
                    fill={`#2EB67D`}
                  />
                </g>
                <g transform={`translate(0 26.28)`}>
                  <path
                    d={`M10.4784 5.2392C10.4784 8.12279 8.12279 10.4784 5.2392 10.4784C2.35561 10.4784 0 8.12279 0 5.2392C0 2.35561 2.35561 0 5.2392 0H10.4784V5.2392Z`}
                    fill={`#E01E5A`}
                  />
                  <path
                    d={`M13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V18.3575C23.5941 21.2411 21.2385 23.5967 18.3549 23.5967C15.4713 23.5967 13.1157 21.2411 13.1157 18.3575V5.2392Z`}
                    fill={`#E01E5A`}
                  />
                </g>
                <g transform={`translate(26.28 26.28)`}>
                  <path
                    d={`M5.23927 13.1157C8.12286 13.1157 10.4785 15.4713 10.4785 18.3549C10.4785 21.2385 8.12286 23.5941 5.23927 23.5941C2.35568 23.5941 7.4362e-05 21.2385 7.4362e-05 18.3549V13.1157H5.23927Z`}
                    fill={`#ECB22E`}
                  />
                  <path
                    d={`M5.23927 10.4784C2.35568 10.4784 7.4362e-05 8.12279 7.4362e-05 5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0H18.3576C21.2412 0 23.5968 2.35561 23.5968 5.2392C23.5968 8.12279 21.2412 10.4784 18.3576 10.4784H5.23927Z`}
                    fill={`#ECB22E`}
                  />
                </g>
              </svg>
            ),
          ),
          keywords: `message channel`,
        },
        {
          id: `notion`,
          label: `Save as page`,
          hint: `Notion · Meeting notes`,
          logo: ((_Component6?: RecoveredValue): RecoveredValue => <_Component6 />)(
            (): RecoveredValue => (
              <svg viewBox={`0 0 24 24`} fill={`currentColor`} aria-hidden={`true`}>
                <path
                  d={`M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z`}
                />
              </svg>
            ),
          ),
          keywords: `doc wiki`,
        },
      ],
    },
    {
      id: `general`,
      label: `General`,
      commands: [
        {
          id: `new-doc`,
          label: `New document`,
          icon: <ComponentI d={a_component_clean_CMpdFqie.doc} />,
          keys: [`N`],
        },
        {
          id: `invite`,
          label: `Invite teammates`,
          icon: <ComponentI d={a_component_clean_CMpdFqie.person} />,
          keys: [`I`],
        },
        {
          id: `upload`,
          label: `Upload files`,
          icon: <ComponentI d={a_component_clean_CMpdFqie.upload} />,
          keys: [`U`],
        },
        {
          id: `theme`,
          label: `Switch to dark mode`,
          icon: <ComponentI d={a_component_clean_CMpdFqie.moon} />,
          keywords: `theme appearance light`,
          keys: [`⇧`, `D`],
        },
      ],
    },
    {
      id: `go`,
      label: `Go to`,
      commands: [
        {
          id: `home`,
          label: `Home`,
          icon: <ComponentI d={a_component_clean_CMpdFqie.home} />,
          keys: [`G`, `H`],
        },
        {
          id: `inbox`,
          label: `Inbox`,
          icon: <ComponentI d={a_component_clean_CMpdFqie.inbox} />,
          keys: [`G`, `I`],
        },
        {
          id: `reports`,
          label: `Reports`,
          icon: <ComponentI d={a_component_clean_CMpdFqie.chart} />,
          keys: [`G`, `R`],
        },
        {
          id: `settings`,
          label: `Settings`,
          icon: <ComponentI d={a_component_clean_CMpdFqie.gear} />,
          keys: [`G`, `S`],
        },
        {
          id: `help`,
          label: `Help & feedback`,
          icon: <ComponentI d={a_component_clean_CMpdFqie.help} />,
          keys: [`?`],
        },
      ],
    },
  ],
  l_component_clean_CMpdFqie: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.normalize(`NFD`).replace(/\p{M}/gu, ``).toLowerCase(),
  u_component_clean_CMpdFqie: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    (e.match(/[\p{L}\p{N}]/u)?.[0] ?? ``).toUpperCase();
function ComponentD({ text, query }: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = l_component_clean_CMpdFqie(text),
    i: RecoveredValue = l_component_clean_CMpdFqie(query),
    a: RecoveredValue = i && n.length === text.length ? n.indexOf(i) : -1;
  return a < 0 ? (
    <r_component_clean_CMpdFqie.Fragment>{text}</r_component_clean_CMpdFqie.Fragment>
  ) : (
    <r_component_clean_CMpdFqie.Fragment>
      {text.slice(0, a)}
      <mark>{text.slice(a, a + i.length)}</mark>
      {text.slice(a + i.length)}
    </r_component_clean_CMpdFqie.Fragment>
  );
}
var f_component_clean_CMpdFqie: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    e.currentTarget.dataset.broken = ``;
  },
  ComponentP: RecoveredValue = (0, n_component_clean_CMpdFqie.memo)(function ({
    cmd,
    domId,
    selected,
    ran,
    mod,
    q,
    on,
  }: RecoveredValue): RecoveredValue {
    let c: RecoveredValue = cmd.n ? [mod, String(cmd.n)] : cmd.keys;
    return (
      <button
        id={domId}
        data-key={cmd.key}
        type={`button`}
        role={`option`}
        aria-selected={selected}
        data-ran={ran || void 0}
        className={`ui-cmc__item`}
        tabIndex={-1}
        onMouseMove={(): RecoveredValue => on.current.move(cmd)}
        onClick={(): RecoveredValue => on.current.run(cmd)}
      >
        {cmd.logo ? (
          <span
            className={`ui-cmc__logo`}
            data-letter={u_component_clean_CMpdFqie(cmd.label)}
            onErrorCapture={f_component_clean_CMpdFqie}
          >
            {cmd.logo}
          </span>
        ) : (
          <span
            className={`ui-cmc__icon`}
            data-letter={u_component_clean_CMpdFqie(cmd.label)}
            onErrorCapture={f_component_clean_CMpdFqie}
          >
            {cmd.icon}
          </span>
        )}
        <span className={`ui-cmc__text`}>
          <span className={`ui-cmc__name`} dir={`auto`} title={cmd.label}>
            <ComponentD text={cmd.label} query={q} />
          </span>
          {cmd.hint && (
            <span className={`ui-cmc__hint`} dir={`auto`} title={cmd.hint}>
              <ComponentD text={cmd.hint} query={q} />
            </span>
          )}
        </span>
        {c && (
          <span className={`ui-cmc__keys`} aria-hidden={`true`}>
            {c.map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <kbd children={e} key={t} />
              ),
            )}
          </span>
        )}
      </button>
    );
  }),
  m_component_clean_CMpdFqie: RecoveredValue = (): RecoveredValue =>
    typeof navigator < `u` && /Mac|iPhone|iPad/.test(navigator.platform);
function ComponentA({
  groups = c_component_clean_CMpdFqie,
  placeholder = `Type a command or search…`,
  onRun,
  onClose,
  autoFocus,
  className,
}: RecoveredValue): RecoveredValue {
  let d: RecoveredValue =
      `ui-cmc` + (0, n_component_clean_CMpdFqie.useId)().replace(/[^a-zA-Z0-9_-]/g, ``),
    f: RecoveredValue = (0, n_component_clean_CMpdFqie.useRef)(null),
    h: RecoveredValue = (0, n_component_clean_CMpdFqie.useRef)(null),
    _: RecoveredValue = (0, n_component_clean_CMpdFqie.useRef)(null),
    [v, y]: RecoveredValue = (0, n_component_clean_CMpdFqie.useState)(0),
    [b, x]: RecoveredValue = (0, n_component_clean_CMpdFqie.useState)(``),
    [S, C]: RecoveredValue = (0, n_component_clean_CMpdFqie.useState)(null),
    [w, T]: RecoveredValue = (0, n_component_clean_CMpdFqie.useState)(null),
    [E, D]: RecoveredValue = (0, n_component_clean_CMpdFqie.useState)(null),
    [O, k]: RecoveredValue = (0, n_component_clean_CMpdFqie.useState)(!0),
    A: RecoveredValue = m_component_clean_CMpdFqie() ? `⌘` : `Ctrl`,
    j: RecoveredValue = (0, n_component_clean_CMpdFqie.useMemo)(
      (): RecoveredValue =>
        (groups ?? []).filter(Boolean).map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => ({
            key: `g${t}`,
            id: e.id,
            label: String(e.label ?? ``),
            commands: (Array.isArray(e.commands) ? e.commands : [])
              .filter(Boolean)
              .map((e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
                let r: RecoveredValue = String(e.label ?? ``),
                  i: RecoveredValue =
                    e.hint == null || e.hint === `` ? void 0 : String(e.hint);
                return {
                  row: {
                    ...e,
                    label: r,
                    hint: i,
                    key: `${t}-${n}`,
                    n: 0,
                  },
                  text: l_component_clean_CMpdFqie(`${r} ${i ?? ``} ${e.keywords ?? ``}`),
                };
              }),
          }),
        ),
      [groups],
    ),
    M: RecoveredValue = b.trim(),
    N: RecoveredValue = (0, n_component_clean_CMpdFqie.useMemo)((): RecoveredValue => {
      let e: RecoveredValue = l_component_clean_CMpdFqie(M),
        t: RecoveredValue = j
          .map(
            (t?: RecoveredValue): RecoveredValue => ({
              ...t,
              commands: t.commands
                .filter((t?: RecoveredValue): RecoveredValue => !e || t.text.includes(e))
                .map(
                  (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
                    t.id === `suggestions` && n < 5
                      ? {
                          ...e.row,
                          n: n + 1,
                        }
                      : e.row,
                ),
            }),
          )
          .filter((e?: RecoveredValue): RecoveredValue => e.commands.length);
      return (
        e &&
          t.unshift({
            key: `ask`,
            id: `ask-about`,
            label: `Assistant`,
            commands: [
              {
                key: `ask`,
                n: 0,
                id: `ask-about`,
                label: `Ask assistant about “${M}”`,
                logo: <ComponentO />,
              },
            ],
          }),
        t
      );
    }, [j, M]),
    P: RecoveredValue = (0, n_component_clean_CMpdFqie.useMemo)(
      (): RecoveredValue => N.flatMap((e?: RecoveredValue): RecoveredValue => e.commands),
      [N],
    ),
    F: RecoveredValue = P.filter((e?: RecoveredValue): RecoveredValue => e.n),
    I: RecoveredValue =
      P.find((e?: RecoveredValue): RecoveredValue => e.key === S) ?? P[0],
    L: RecoveredValue = (0, n_component_clean_CMpdFqie.useRef)(!1);
  ((0, n_component_clean_CMpdFqie.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = h.current,
      t: RecoveredValue = e?.querySelector(`[data-key="${I?.key}"]`);
    if (!e || !t) return D(null);
    if (
      (D({
        y: t.offsetTop,
        h: t.offsetHeight,
      }),
      !L.current)
    )
      return;
    L.current = !1;
    let n: RecoveredValue = t.previousElementSibling?.classList.contains(`ui-cmc__label`)
        ? t.previousElementSibling.offsetHeight
        : 0,
      r: RecoveredValue = t.offsetTop - 8 - n,
      i: RecoveredValue = t.offsetTop + t.offsetHeight + 8;
    r < e.scrollTop
      ? (e.scrollTop = r)
      : i > e.scrollTop + e.clientHeight && (e.scrollTop = i - e.clientHeight);
  }, [I?.key, P.length]),
    (0, n_component_clean_CMpdFqie.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = h.current,
        t: RecoveredValue = _.current;
      if (!e || !t) return;
      let n: RecoveredValue = (): RecoveredValue => {
        let n: RecoveredValue = getComputedStyle(e),
          r: RecoveredValue = parseFloat(n.paddingTop) + parseFloat(n.paddingBottom),
          i: RecoveredValue = parseFloat(n.maxHeight) || 1 / 0;
        y(Math.min(t.offsetHeight + r, i));
      };
      n();
      let r: RecoveredValue = new ResizeObserver(n);
      return (r.observe(t), (): RecoveredValue => r.disconnect());
    }, []),
    (0, n_component_clean_CMpdFqie.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        (e.metaKey || e.ctrlKey) &&
          e.key.toLowerCase() === `k` &&
          (e.preventDefault(), f.current?.focus(), f.current?.select());
      };
      return (
        window.addEventListener(`keydown`, e),
        (): RecoveredValue => window.removeEventListener(`keydown`, e)
      );
    }, []),
    (0, n_component_clean_CMpdFqie.useEffect)((): RecoveredValue => {
      autoFocus && f.current?.focus();
    }, [autoFocus]),
    (0, n_component_clean_CMpdFqie.useEffect)((): RecoveredValue => {
      if (!w) return;
      let e: RecoveredValue = window.setTimeout((): RecoveredValue => T(null), 1800);
      return (): RecoveredValue => window.clearTimeout(e);
    }, [w]));
  let R: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (C(e.key),
        T({
          id: e.key,
          label: e.key === `ask` ? `Asked the assistant about “${M}”` : e.label,
        }),
        e.key === `ask` ? onRun?.(`ask`, M) : onRun?.(e.id));
    },
    z: RecoveredValue = (0, n_component_clean_CMpdFqie.useRef)({
      move: (e?: RecoveredValue): RecoveredValue => {},
      run: (e?: RecoveredValue): RecoveredValue => {},
    });
  z.current = {
    move: (e?: RecoveredValue): RecoveredValue => {
      (k(!0), e.key !== I?.key && C(e.key));
    },
    run: (e?: RecoveredValue): RecoveredValue => {
      (R(e),
        f.current?.focus({
          preventScroll: !0,
        }));
    },
  };
  let B: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    if (!P.length || !I) return;
    ((L.current = !0), k(!0));
    let t: RecoveredValue = P.findIndex(
      (e?: RecoveredValue): RecoveredValue => e.key === I.key,
    );
    C(P[(t + e + P.length) % P.length].key);
  };
  return (
    <div className={[`ui-cmc`, className].filter(Boolean).join(` `)}>
      <div className={`ui-cmc__card`}>
        <label className={`ui-cmc__search`}>
          <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
            <circle cx={`7.25`} cy={`7.25`} r={`4.75`} />
            <path d={`m13.5 13.5-2.9-2.9`} />
          </svg>
          <input
            ref={f as RecoveredValue}
            value={b}
            dir={`auto`}
            placeholder={placeholder}
            aria-label={`Command`}
            role={`combobox`}
            aria-expanded={`true`}
            aria-controls={`${d}-list`}
            aria-activedescendant={I ? `${d}-${I.key}` : void 0}
            onChange={(e?: RecoveredValue): RecoveredValue => {
              (x(e.target.value), C(null));
            }}
            onKeyDown={(e?: RecoveredValue): RecoveredValue => {
              if (e.key === `ArrowDown` || e.key === `ArrowUp`)
                (e.preventDefault(), B(e.key === `ArrowDown` ? 1 : -1));
              else if (e.key === `Enter` && I) (e.preventDefault(), R(I));
              else if (e.key === `Tab` && N.length > 1) {
                e.preventDefault();
                let t: RecoveredValue = N.findIndex(
                    (e?: RecoveredValue): RecoveredValue =>
                      e.commands.some(
                        (e?: RecoveredValue): RecoveredValue => e.key === I?.key,
                      ),
                  ),
                  n: RecoveredValue = e.shiftKey
                    ? t <= 0
                      ? N.length - 1
                      : t - 1
                    : (t + 1) % N.length;
                ((L.current = !0), k(!0), C(N[n].commands[0].key));
              } else if (e.key === `Escape`) b ? x(``) : onClose?.();
              else if ((e.metaKey || e.ctrlKey) && /^[1-5]$/.test(e.key)) {
                let t: RecoveredValue = F[Number(e.key) - 1];
                t && (e.preventDefault(), R(t));
              }
            }}
          />
          <kbd className={`ui-cmc__enter`} aria-hidden={`true`}>
            <svg viewBox={`0 0 16 16`}>
              <path d={`M12.5 4v3a2 2 0 0 1-2 2h-7M6 6.5 3.5 9 6 11.5`} />
            </svg>
          </kbd>
        </label>
        <div
          ref={h as RecoveredValue}
          id={`${d}-list`}
          className={`ui-cmc__list`}
          role={`listbox`}
          aria-label={`Commands`}
          style={
            (v
              ? {
                  height: v,
                }
              : void 0) as RecoveredValue
          }
          onMouseLeave={(): RecoveredValue => k(!1)}
        >
          {E && (
            <span
              className={`ui-cmc__pill`}
              data-lit={O || void 0}
              style={
                {
                  transform: `translateY(${E.y}px)`,
                  height: E.h,
                } as RecoveredValue
              }
              aria-hidden={`true`}
            />
          )}
          <div ref={_ as RecoveredValue} className={`ui-cmc__inner`}>
            {N.map(
              (e?: RecoveredValue): RecoveredValue => (
                <div
                  role={`group`}
                  aria-label={e.label}
                  className={`ui-cmc__group`}
                  key={e.key}
                >
                  {e.key !== `ask` && e.label && (
                    <span className={`ui-cmc__label`} dir={`auto`}>
                      {e.label}
                    </span>
                  )}
                  {e.commands.map(
                    (e?: RecoveredValue): RecoveredValue => (
                      <ComponentP
                        cmd={e}
                        domId={`${d}-${e.key}`}
                        selected={e.key === I?.key}
                        ran={w?.id === e.key}
                        mod={A}
                        q={M}
                        on={z}
                        key={e.key}
                      />
                    ),
                  )}
                </div>
              ),
            )}
          </div>
        </div>
        <footer className={`ui-cmc__foot`} aria-live={`polite`}>
          {w ? (
            <span className={`ui-cmc__done`} key={w.label}>
              <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                <path d={`m3.5 8.5 3 3 6-7`} />
              </svg>
              <span className={`ui-cmc__done-text`}>{w.label}</span>
            </span>
          ) : (
            <span className={`ui-cmc__tip`}>
              <kbd>{`Tab`}</kbd>
              {` to jump between sections`}
            </span>
          )}
          <span className={`ui-cmc__foot-right`}>
            <span className={`ui-cmc__keys`}>
              <kbd>{A}</kbd>
              <kbd>{`K`}</kbd>
            </span>
            {`to open`}
          </span>
        </footer>
      </div>
    </div>
  );
}
var n_component_clean_CuHV807w: RecoveredValue = t_react_BkAXpnfr(),
  r_component_clean_CuHV807w: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_clean_CuHV807w: RecoveredValue = 4;
function ComponentO_component_clean_CuHV807w({
  groups,
  value,
  defaultValue = {},
  onChange,
  defaultOpen,
  title = `Filters`,
  hints = !0,
  className,
}: RecoveredValue): RecoveredValue {
  let p: RecoveredValue = (Array.isArray(groups) ? groups : [])
      .filter((e?: RecoveredValue): RecoveredValue => !!e && typeof e == `object`)
      .map(
        (e?: RecoveredValue): RecoveredValue => ({
          ...e,
          label: String(e.label ?? ``),
          options: (Array.isArray(e.options) ? e.options : [])
            .filter((e?: RecoveredValue): RecoveredValue => !!e && typeof e == `object`)
            .map(
              (e?: RecoveredValue): RecoveredValue => ({
                ...e,
                label: String(e.label ?? ``),
              }),
            ),
        }),
      ),
    m: RecoveredValue = (0, n_component_clean_CuHV807w.useId)(),
    [h, g]: RecoveredValue = (0, n_component_clean_CuHV807w.useState)(defaultValue),
    _: RecoveredValue = value ?? h,
    [v, y]: RecoveredValue = (0, n_component_clean_CuHV807w.useState)(
      (): RecoveredValue =>
        new Set(
          defaultOpen ?? p.slice(0, 1).map((e?: RecoveredValue): RecoveredValue => e.id),
        ),
    ),
    [b, x]: RecoveredValue = (0, n_component_clean_CuHV807w.useState)(null),
    S: RecoveredValue = (0, n_component_clean_CuHV807w.useRef)(null),
    C: RecoveredValue = (0, n_component_clean_CuHV807w.useRef)(null),
    w: RecoveredValue = o_component_clean_CuHV807w(C),
    T: RecoveredValue = (0, n_component_clean_CuHV807w.useRef)(null),
    [E, D]: RecoveredValue = (0, n_component_clean_CuHV807w.useState)(1 / 0),
    O: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (value === void 0 && g(e), onChange?.(e));
    },
    k: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      Array.isArray(_[e]) ? _[e] : [],
    A: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      k(e).includes(t),
    j: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = k(e);
      O({
        ..._,
        [e]: n.includes(t)
          ? n.filter((e?: RecoveredValue): RecoveredValue => e !== t)
          : [...n, t],
      });
    },
    M: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      y((t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = new Set(t);
        return (n.has(e) ? n.delete(e) : n.add(e), n);
      }),
    N: RecoveredValue = new Set(),
    P: RecoveredValue = p.flatMap(
      (e?: RecoveredValue): RecoveredValue =>
        e.options
          .filter(
            (t?: RecoveredValue): RecoveredValue =>
              A(e.id, t.id) &&
              !N.has(`${e.id}\u0000${t.id}`) &&
              !!N.add(`${e.id}\u0000${t.id}`),
          )
          .map(
            (t?: RecoveredValue): RecoveredValue => ({
              group: e,
              option: t,
              label: `${e.chipPrefix ?? ``}${t.label}`,
            }),
          ),
    ),
    F: RecoveredValue = P.map(
      (e?: RecoveredValue): RecoveredValue => `${e.group.id}:${e.option.id}:${e.label}`,
    ).join(`|`);
  (0, n_component_clean_CuHV807w.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = C.current,
      t: RecoveredValue = T.current;
    if (!e || !t) return;
    let n: RecoveredValue = (): RecoveredValue => {
      let n: RecoveredValue = [...t.children].map(
          (e?: RecoveredValue): RecoveredValue =>
            e.offsetWidth + i_component_clean_CuHV807w,
        ),
        r: RecoveredValue = n.pop() ?? 0,
        a: RecoveredValue = getComputedStyle(e),
        o: RecoveredValue =
          e.clientWidth -
          parseFloat(a.paddingLeft) -
          parseFloat(a.paddingRight) +
          i_component_clean_CuHV807w,
        s: RecoveredValue = 0,
        c: RecoveredValue = 0;
      for (; c < n.length; c++) {
        let e: RecoveredValue = c + 1 < n.length ? r : 0;
        if (s + n[c] + e > o) break;
        s += n[c];
      }
      D(c);
    };
    n();
    let r: RecoveredValue = new ResizeObserver(n);
    return (r.observe(e), (): RecoveredValue => r.disconnect());
  }, [F]);
  let I: RecoveredValue = P.slice(0, E),
    L: RecoveredValue = P.slice(E),
    R: RecoveredValue = p.flatMap(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => [
        {
          kind: `group`,
          group: e,
          gi: t,
        },
        ...(v.has(e.id)
          ? e.options.map(
              (n?: RecoveredValue, r?: RecoveredValue): RecoveredValue => ({
                kind: `option`,
                group: e,
                option: n,
                gi: t,
                oi: r,
              }),
            )
          : []),
      ],
    ),
    z: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e.kind === `group` ? `g:${e.gi}` : `o:${e.gi}:${e.oi}`,
    B: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (x(e), S.current?.querySelector(`[data-key="${CSS.escape(e)}"]`)?.focus());
    };
  return (
    <div className={[`ui-fmc`, className].filter(Boolean).join(` `)}>
      <div className={`ui-fmc__head`}>
        <span className={`ui-fmc__title`} dir={`auto`} title={title}>
          {title}
        </span>
        <button
          type={`button`}
          className={`ui-fmc__clear`}
          disabled={P.length === 0}
          onClick={(): RecoveredValue => O({})}
        >{`Clear all`}</button>
      </div>
      <div className={`ui-fmc__chips-outer`} ref={w as RecoveredValue}>
        <div
          className={`ui-fmc__chips`}
          ref={C as RecoveredValue}
          data-empty={P.length === 0 || void 0}
          aria-live={`polite`}
        >
          <div
            className={`ui-fmc__measure`}
            ref={T as RecoveredValue}
            aria-hidden={`true`}
          >
            {P.map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <span className={`ui-fmc__chip`} key={t}>
                  <span className={`ui-fmc__chip-label`}>{e.label}</span>
                  <span className={`ui-fmc__chip-x`} />
                </span>
              ),
            )}
            <span className={`ui-fmc__chip ui-fmc__more`}>{`+99`}</span>
          </div>
          {I.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <span className={`ui-fmc__chip`} key={t}>
                <span className={`ui-fmc__chip-label`} dir={`auto`} title={e.label}>
                  {e.label}
                </span>
                <button
                  type={`button`}
                  className={`ui-fmc__chip-x`}
                  aria-label={`Remove ${e.label}`}
                  onClick={(): RecoveredValue => j(e.group.id, e.option.id)}
                >
                  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                    <path d={`M4.5 4.5l7 7M11.5 4.5l-7 7`} />
                  </svg>
                </button>
              </span>
            ),
          )}
          {L.length > 0 && (
            <span
              className={`ui-fmc__chip ui-fmc__more`}
              title={L.map((e?: RecoveredValue): RecoveredValue => e.label).join(`, `)}
              aria-label={`${L.length} more: ${L.map((e?: RecoveredValue): RecoveredValue => e.label).join(`, `)}`}
            >
              <span className={`ui-fmc__roll`} key={L.length}>
                {`+`}
                {L.length}
              </span>
            </span>
          )}
        </div>
      </div>
      <div
        className={`ui-fmc__groups`}
        ref={S as RecoveredValue}
        onKeyDown={(e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = R.findIndex(
              (e?: RecoveredValue): RecoveredValue => z(e) === b,
            ),
            n: RecoveredValue = R[t];
          if (e.key === `ArrowDown` || e.key === `ArrowUp`) {
            e.preventDefault();
            let n: RecoveredValue =
              R[
                Math.max(0, Math.min(R.length - 1, t + (e.key === `ArrowDown` ? 1 : -1)))
              ] ?? R[0];
            B(z(n));
          } else if (e.key === `Home` || e.key === `End`)
            (e.preventDefault(), B(z(R[e.key === `Home` ? 0 : R.length - 1])));
          else if (n && (e.key === `ArrowRight` || e.key === `ArrowLeft`)) {
            e.preventDefault();
            let t: RecoveredValue = n.group.id;
            (e.key === `ArrowRight` && !v.has(t) && M(t),
              e.key === `ArrowLeft` && (v.has(t) && M(t), B(`g:${n.gi}`)));
          } else
            n &&
              (e.key === `Enter` || e.key === ` `) &&
              (e.preventDefault(),
              n.kind === `group` ? M(n.group.id) : j(n.group.id, n.option.id));
        }}
      >
        {p.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
          let n: RecoveredValue = v.has(e.id),
            i: RecoveredValue = new Set(
              k(e.id).filter(
                (t?: RecoveredValue): RecoveredValue =>
                  e.options.some((e?: RecoveredValue): RecoveredValue => e.id === t),
              ),
            ).size,
            a: RecoveredValue = `g:${t}`;
          return (
            <section
              className={`ui-fmc__group`}
              data-open={n ? `` : void 0}
              key={`${e.id}#${t}`}
            >
              <button
                type={`button`}
                className={`ui-fmc__group-head`}
                data-key={a}
                tabIndex={b === a || (b === null && t === 0) ? 0 : -1}
                aria-expanded={n}
                aria-controls={`${m}-${t}`}
                onFocus={(): RecoveredValue => x(a)}
                onClick={(): RecoveredValue => M(e.id)}
              >
                <svg
                  className={`ui-fmc__chevron`}
                  viewBox={`0 0 16 16`}
                  aria-hidden={`true`}
                >
                  <path d={`M4.5 6.25 8 9.75l3.5-3.5`} />
                </svg>
                <span className={`ui-fmc__group-label`} dir={`auto`} title={e.label}>
                  {e.label}
                </span>
                <span className={`ui-fmc__group-count`}>
                  {e.options.length.toLocaleString(`en-US`)}
                </span>
                <span className={`ui-fmc__group-picked`} aria-live={`polite`}>
                  {i > 0 && (
                    <span
                      className={`ui-fmc__roll`}
                      children={`${i} filter${i === 1 ? `` : `s`}`}
                      key={i}
                    />
                  )}
                </span>
              </button>
              <div
                className={`ui-fmc__panel`}
                id={`${m}-${t}`}
                role={`group`}
                aria-label={e.label}
              >
                <div className={`ui-fmc__panel-inner`}>
                  {e.options.map(
                    (i?: RecoveredValue, a?: RecoveredValue): RecoveredValue => {
                      let o: RecoveredValue = `o:${t}:${a}`,
                        s: RecoveredValue = A(e.id, i.id);
                      return (
                        <button
                          type={`button`}
                          role={`checkbox`}
                          aria-checked={s}
                          className={`ui-fmc__option`}
                          data-key={o}
                          tabIndex={n && b === o ? 0 : -1}
                          onFocus={(): RecoveredValue => x(o)}
                          onClick={(): RecoveredValue => j(e.id, i.id)}
                          key={`${i.id}#${a}`}
                        >
                          <span className={`ui-fmc__box`} aria-hidden={`true`}>
                            <svg viewBox={`0 0 16 16`}>
                              <path d={`m4.25 8.25 2.5 2.5 5-5.5`} />
                            </svg>
                          </span>
                          <span
                            className={`ui-fmc__option-label`}
                            dir={`auto`}
                            title={i.label}
                          >
                            {i.label}
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
      {hints && (
        <div className={`ui-fmc__hints`} aria-hidden={`true`}>
          <span className={`ui-fmc__hint`}>
            <kbd>{`↑`}</kbd>
            <kbd>{`↓`}</kbd>
            <span>{`to navigate`}</span>
          </span>
          <span className={`ui-fmc__hint`}>
            <kbd>{`↵`}</kbd>
            <span>{`to select`}</span>
          </span>
        </div>
      )}
    </div>
  );
}
function o_component_clean_CuHV807w(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = (0, n_component_clean_CuHV807w.useRef)(null);
  return (
    (0, n_component_clean_CuHV807w.useLayoutEffect)((): RecoveredValue => {
      let n: RecoveredValue = t.current,
        r: RecoveredValue = e.current;
      if (!n || !r) return;
      let i: RecoveredValue = (): RecoveredValue => {
        n.style.height = `${r.offsetHeight}px`;
      };
      i();
      let a: RecoveredValue = new ResizeObserver(i);
      a.observe(r);
      let o: RecoveredValue = requestAnimationFrame(
        (): RecoveredValue => n.setAttribute(`data-smooth`, ``),
      );
      return (): RecoveredValue => {
        (a.disconnect(), cancelAnimationFrame(o));
      };
    }, [e]),
    t
  );
}
var n_component_clean_C3l6rUST: RecoveredValue = t_react_BkAXpnfr(),
  r_component_clean_C3l6rUST: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_clean_C3l6rUST: RecoveredValue = new Intl.NumberFormat(`en`);
function ComponentS({
  title = `Setup guide`,
  groups,
  onEdit,
  onClose,
  onChange,
  className,
}: RecoveredValue): RecoveredValue {
  let [g, _]: RecoveredValue = (0, n_component_clean_C3l6rUST.useState)(
      (): RecoveredValue =>
        new Set(
          groups.flatMap(
            (e?: RecoveredValue): RecoveredValue =>
              e.tasks
                .filter((e?: RecoveredValue): RecoveredValue => e.done)
                .map((e?: RecoveredValue): RecoveredValue => e.id),
          ),
        ),
    ),
    v: RecoveredValue = groups.find(
      (e?: RecoveredValue): RecoveredValue =>
        e.tasks.some((e?: RecoveredValue): RecoveredValue => !g.has(e.id)),
    ),
    [y, b]: RecoveredValue = (0, n_component_clean_C3l6rUST.useState)(v?.id ?? null),
    [x, S]: RecoveredValue = (0, n_component_clean_C3l6rUST.useState)(!1),
    C: RecoveredValue = groups.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + t.tasks.length,
      0,
    ),
    w: RecoveredValue = groups.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + t.tasks.filter((e?: RecoveredValue): RecoveredValue => g.has(e.id)).length,
      0,
    ),
    T: RecoveredValue = C ? Math.min(1, w / C) : 0,
    E: RecoveredValue = (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
      let r: RecoveredValue = new Set(g);
      if (
        (r.has(n) ? r.delete(n) : r.add(n),
        _(r),
        onChange?.([...r]),
        e.tasks.every((e?: RecoveredValue): RecoveredValue => r.has(e.id)))
      ) {
        let e: RecoveredValue = groups.find(
          (e?: RecoveredValue): RecoveredValue =>
            e.tasks.some((e?: RecoveredValue): RecoveredValue => !r.has(e.id)),
        );
        window.setTimeout((): RecoveredValue => b(e?.id ?? null), 420);
      }
    };
  return (
    <r_component_clean_C3l6rUST.Fragment>
      <section
        className={[`ui-sgdc`, className].filter(Boolean).join(` `)}
        aria-label={title}
      >
        <header className={`ui-sgdc__head`}>
          <h3 className={`ui-sgdc__title`} title={title} dir={`auto`}>
            {title}
          </h3>
          <div className={`ui-sgdc__actions`}>
            {onEdit && (
              <button
                type={`button`}
                className={`ui-sgdc__edit`}
                onClick={onEdit}
              >{`Edit`}</button>
            )}
            <button
              type={`button`}
              className={`ui-sgdc__icon-btn`}
              aria-label={x ? `Expand setup guide` : `Minimize setup guide`}
              aria-expanded={!x}
              onClick={(): RecoveredValue =>
                S((e?: RecoveredValue): RecoveredValue => !e)
              }
            >
              {x ? <ComponentC /> : <ComponentS_component_clean_C3l6rUST />}
            </button>
            {onClose && (
              <button
                type={`button`}
                className={`ui-sgdc__icon-btn`}
                aria-label={`Close setup guide`}
                onClick={onClose}
              >
                <ComponentL />
              </button>
            )}
          </div>
        </header>
        <div className={`ui-sgdc__progress`}>
          <span
            className={`ui-sgdc__track`}
            role={`progressbar`}
            aria-label={`${title} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(T * 100)}
          >
            <span
              className={`ui-sgdc__fill`}
              style={
                {
                  transform: `scaleX(${T})`,
                } as RecoveredValue
              }
            />
          </span>
          <span className={`ui-sgdc__count`} aria-hidden={`true`}>
            {i_component_clean_C3l6rUST.format(w)}
            {`/`}
            {i_component_clean_C3l6rUST.format(C)}
          </span>
        </div>
        <div className={`ui-sgdc__body`} data-hidden={x || void 0}>
          <div className={`ui-sgdc__groups`}>
            {groups.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
              let n: RecoveredValue = y === e.id,
                i: RecoveredValue = e.tasks.every(
                  (e?: RecoveredValue): RecoveredValue => g.has(e.id),
                ),
                a: RecoveredValue = e.tasks.find(
                  (e?: RecoveredValue): RecoveredValue => !g.has(e.id),
                )?.id,
                s: RecoveredValue = e.tasks.findIndex(
                  (e?: RecoveredValue): RecoveredValue => e.id === a,
                ),
                c: RecoveredValue = `ui-sgdc-${e.id}`;
              return (
                <div
                  className={`ui-sgdc__group`}
                  data-open={n || void 0}
                  key={`${t}-${e.id}`}
                >
                  <button
                    type={`button`}
                    className={`ui-sgdc__group-head`}
                    aria-expanded={n}
                    aria-controls={c}
                    onClick={(): RecoveredValue => b(n ? null : e.id)}
                  >
                    <span
                      className={`ui-sgdc__group-title`}
                      data-done={i || void 0}
                      dir={`auto`}
                    >
                      {e.title}
                    </span>
                    <ComponentO_component_clean_C3l6rUST />
                  </button>
                  <div className={`ui-sgdc__panel`} id={c} inert={!n}>
                    <ul className={`ui-sgdc__tasks`}>
                      {e.tasks.map(
                        (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
                          let i: RecoveredValue = g.has(t.id),
                            a: RecoveredValue = !i && s !== -1 && n > s,
                            o: RecoveredValue = i ? `done` : a ? `locked` : `current`;
                          return (
                            <li
                              children={
                                <button
                                  type={`button`}
                                  className={`ui-sgdc__task`}
                                  data-state={o}
                                  disabled={a}
                                  aria-pressed={i}
                                  onClick={(): RecoveredValue => E(e, t.id)}
                                >
                                  <span className={`ui-sgdc__mark`} aria-hidden={`true`}>
                                    {o === `done` ? (
                                      <ComponentU />
                                    ) : o === `locked` ? (
                                      <ComponentD_component_clean_C3l6rUST />
                                    ) : null}
                                  </span>
                                  <span className={`ui-sgdc__task-label`} dir={`auto`}>
                                    {t.label}
                                  </span>
                                </button>
                              }
                              key={`${n}-${t.id}`}
                            />
                          );
                        },
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </r_component_clean_C3l6rUST.Fragment>
  );
}
var ComponentO_component_clean_C3l6rUST: RecoveredValue = (): RecoveredValue => (
    <svg
      className={`ui-sgdc__chevron`}
      viewBox={`0 0 16 16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.3`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path d={`m4.5 6.25 3.5 3.5 3.5-3.5`} />
    </svg>
  ),
  ComponentS_component_clean_C3l6rUST: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 16 16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.2`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path d={`M9.5 2.5v4h4M9.5 6.5l4.5-4.5M6.5 13.5v-4h-4M6.5 9.5 2 14`} />
    </svg>
  ),
  ComponentC: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 16 16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.2`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path d={`M10 2h4v4M14 2 9.5 6.5M6 14H2v-4M2 14l4.5-4.5`} />
    </svg>
  ),
  ComponentL: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 16 16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.2`}
      strokeLinecap={`round`}
      aria-hidden={`true`}
    >
      <path d={`m4 4 8 8M12 4l-8 8`} />
    </svg>
  ),
  ComponentU: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
      <circle cx={`8`} cy={`8`} r={`7`} fill={`currentColor`} />
      <path
        d={`m5.2 8.2 1.9 1.9 3.7-3.9`}
        fill={`none`}
        stroke={`var(--ui-sgdc-on-accent)`}
        strokeWidth={`1.4`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
    </svg>
  ),
  ComponentD_component_clean_C3l6rUST: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 16 16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.1`}
      aria-hidden={`true`}
    >
      <circle cx={`8`} cy={`8`} r={`6.5`} strokeDasharray={`2 2`} />
    </svg>
  );
var n_component_clean_CnZCLpPh: RecoveredValue = t_react_BkAXpnfr(),
  r_component_clean_CnZCLpPh: RecoveredValue = t_jsx_runtime_CTsRTJUX();
function ComponentC_component_clean_CnZCLpPh({
  label,
  hint,
  error,
  prefix,
  suffix,
  size = `md`,
  optional = !1,
  clearable = !1,
  copyable = !1,
  counter = !1,
  onClear,
  onKeyDown,
  className,
  inputClassName,
  id,
  type = `text`,
  value,
  defaultValue,
  onChange,
  disabled,
  readOnly,
  maxLength,
  ref,
  "aria-describedby": M,
  ...N
}: RecoveredValue): RecoveredValue {
  let P: RecoveredValue = (0, n_component_clean_CnZCLpPh.useId)(),
    F: RecoveredValue = id ?? `${P}-input`,
    I: RecoveredValue = `${P}-message`,
    L: RecoveredValue = `${P}-count`,
    R: RecoveredValue = (0, n_component_clean_CnZCLpPh.useRef)(null),
    [z, B]: RecoveredValue = (0, n_component_clean_CnZCLpPh.useState)(
      String(defaultValue ?? ``),
    ),
    V: RecoveredValue = value == null ? z : String(value),
    H: RecoveredValue = type === `password`,
    [U, W]: RecoveredValue = (0, n_component_clean_CnZCLpPh.useState)(!1),
    [G, K]: RecoveredValue = (0, n_component_clean_CnZCLpPh.useState)(!1),
    q: RecoveredValue = (0, n_component_clean_CnZCLpPh.useRef)(0);
  (0, n_component_clean_CnZCLpPh.useEffect)(
    (): RecoveredValue => (): RecoveredValue => window.clearTimeout(q.current),
    [],
  );
  let J: RecoveredValue =
      !!error || N[`aria-invalid`] === !0 || N[`aria-invalid`] === `true`,
    Y: RecoveredValue = o_component_clean_CnZCLpPh(error)
      ? error
      : o_component_clean_CnZCLpPh(hint)
        ? hint
        : null,
    X: RecoveredValue = counter && typeof maxLength == `number`,
    Z: RecoveredValue =
      label == null &&
      !N[`aria-label`] &&
      !N[`aria-labelledby`] &&
      typeof N.placeholder == `string`
        ? N.placeholder
        : void 0;
  (0, n_component_clean_CnZCLpPh.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = R.current?.form;
    if (!e || value !== void 0) return;
    let t: RecoveredValue = (): RecoveredValue =>
      window.setTimeout((): RecoveredValue => B(R.current?.value ?? ``));
    return (
      e.addEventListener(`reset`, t),
      (): RecoveredValue => e.removeEventListener(`reset`, t)
    );
  }, [value]);
  let Q: RecoveredValue = clearable && !disabled && !readOnly && V.length > 0,
    te: RecoveredValue = a_component_clean_CnZCLpPh.includes(size) ? size : `md`,
    $: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = R.current;
      e &&
        (Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, `value`)?.set?.call(
          e,
          ``,
        ),
        e.dispatchEvent(
          new Event(`input`, {
            bubbles: !0,
          }),
        ),
        e.focus(),
        onClear?.());
    },
    ne: RecoveredValue = async (): Promise<RecoveredValue> => {
      try {
        await navigator.clipboard.writeText(V);
      } catch {
        R.current?.select();
        return;
      }
      (K(!0),
        window.clearTimeout(q.current),
        (q.current = window.setTimeout((): RecoveredValue => K(!1), 1600)));
    };
  return (
    <div
      className={[`ui-tfc`, className].filter(Boolean).join(` `)}
      data-size={te}
      data-invalid={J || void 0}
      data-disabled={disabled || void 0}
      data-readonly={readOnly || void 0}
    >
      {label != null && (
        <div className={`ui-tfc__head`}>
          <label className={`ui-tfc__label`} htmlFor={F}>
            {label}
          </label>
          {optional && <span className={`ui-tfc__optional`}>{`Optional`}</span>}
        </div>
      )}
      <div
        className={`ui-tfc__box`}
        onPointerDown={(e?: RecoveredValue): RecoveredValue => {
          e.target === R.current ||
            e.target.closest(`button`) ||
            (e.preventDefault(), R.current?.focus());
        }}
      >
        {prefix != null && (
          <span className={`ui-tfc__affix`} data-side={`start`}>
            {typeof prefix == `string` ? (
              <span className={`ui-tfc__affix-text`}>{prefix}</span>
            ) : (
              prefix
            )}
          </span>
        )}
        <input
          {...N}
          ref={
            ((e?: RecoveredValue): RecoveredValue => {
              ((R.current = e),
                typeof ref == `function` ? ref(e) : ref && (ref.current = e));
            }) as RecoveredValue
          }
          id={F}
          className={[`ui-tfc__input`, inputClassName].filter(Boolean).join(` `)}
          type={H && U ? `text` : type}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          aria-label={N[`aria-label`] ?? Z}
          aria-invalid={J || void 0}
          aria-describedby={
            [M, Y ? I : null, X ? L : null].filter(Boolean).join(` `) || void 0
          }
          dir={N.dir ?? `auto`}
          data-revealed={H ? (U ? `true` : `false`) : void 0}
          onKeyDown={(e?: RecoveredValue): RecoveredValue => {
            (e.key === `Escape` && Q && (e.preventDefault(), $()), onKeyDown?.(e));
          }}
          onChange={(e?: RecoveredValue): RecoveredValue => {
            (value === void 0 && B(e.target.value), onChange?.(e));
          }}
        />
        {suffix != null && (
          <span className={`ui-tfc__affix`} data-side={`end`}>
            {suffix}
          </span>
        )}
        {Q && (
          <button
            type={`button`}
            className={`ui-tfc__action`}
            aria-label={`Clear`}
            tabIndex={-1}
            onClick={$}
          >
            <ComponentEe />
          </button>
        )}
        {H && !disabled && (
          <button
            type={`button`}
            className={`ui-tfc__action`}
            aria-label={U ? `Hide password` : `Show password`}
            aria-pressed={U}
            onClick={(): RecoveredValue => W((e?: RecoveredValue): RecoveredValue => !e)}
          >
            <span
              className={`ui-tfc__swap`}
              children={
                U ? (
                  <ComponentC_component_clean_CnZCLpPh_2 />
                ) : (
                  <ComponentS_component_clean_CnZCLpPh />
                )
              }
              key={U ? `hide` : `show`}
            />
          </button>
        )}
        {copyable && (
          <button
            type={`button`}
            className={`ui-tfc__action`}
            data-copied={G || void 0}
            aria-label={G ? `Copied` : `Copy`}
            onClick={ne}
            disabled={disabled || !V}
          >
            <span
              className={`ui-tfc__swap`}
              children={
                G ? (
                  <ComponentU_component_clean_CnZCLpPh />
                ) : (
                  <ComponentL_component_clean_CnZCLpPh />
                )
              }
              key={G ? `done` : `copy`}
            />
          </button>
        )}
        {copyable && (
          <span className={`ui-tfc__sr`} role={`status`}>
            {G ? `Copied` : ``}
          </span>
        )}
      </div>
      {(Y || X) && (
        <div className={`ui-tfc__foot`}>
          <p
            className={`ui-tfc__message`}
            id={I}
            dir={`auto`}
            aria-live={o_component_clean_CnZCLpPh(error) ? `polite` : void 0}
            children={Y}
            key={o_component_clean_CnZCLpPh(error) ? `error` : `hint`}
          />
          {X && (
            <span
              className={`ui-tfc__count`}
              id={L}
              data-full={V.length === maxLength || void 0}
              data-over={V.length > maxLength || void 0}
            >
              {V.length}
              {`/`}
              {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
var a_component_clean_CnZCLpPh: RecoveredValue = [`sm`, `md`, `lg`],
  o_component_clean_CnZCLpPh: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e != null && typeof e != `boolean` && e !== ``;
function ComponentEe(): RecoveredValue {
  return (
    <svg
      viewBox={`0 0 24 24`}
      width={`16`}
      height={`16`}
      fill={`currentColor`}
      aria-hidden={`true`}
    >
      <path
        d={`M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3.53 12.22a.75.75 0 1 1-1.06 1.06L12 13.06l-2.47 2.47a.75.75 0 0 1-1.06-1.06L10.94 12 8.47 9.53a.75.75 0 0 1 1.06-1.06L12 10.94l2.47-2.47a.75.75 0 1 1 1.06 1.06L13.06 12l2.47 2.47Z`}
      />
    </svg>
  );
}
function ComponentS_component_clean_CnZCLpPh(): RecoveredValue {
  return (
    <svg
      viewBox={`0 0 24 24`}
      width={`16`}
      height={`16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path
        d={`M21.544 11.045C21.848 11.471 22 11.685 22 12c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045Z`}
      />
      <path d={`M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z`} />
    </svg>
  );
}
function ComponentC_component_clean_CnZCLpPh_2(): RecoveredValue {
  return (
    <svg
      viewBox={`0 0 24 24`}
      width={`16`}
      height={`16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path
        d={`M19.439 15.439c.996-.91 1.719-1.82 2.105-2.36.304-.426.456-.64.456-.955 0-.316-.152-.529-.456-.955C20.178 9.253 16.689 5.124 12 5.124c-.908 0-1.77.155-2.582.418M6.74 6.869c-2.09 1.267-3.6 3.083-4.284 4.04-.304.426-.456.64-.456.955 0 .316.152.529.456.955C3.822 14.735 7.311 18.864 12 18.864c2.008 0 3.786-.757 5.26-1.746`}
      />
      <path d={`M9.858 10a2.98 2.98 0 0 0-.858 2.124 3 3 0 0 0 5.124 2.12M3 3l18 18`} />
    </svg>
  );
}
function ComponentL_component_clean_CnZCLpPh(): RecoveredValue {
  return (
    <svg
      viewBox={`0 0 24 24`}
      width={`16`}
      height={`16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path
        d={`M9 15c0-2.828 0-4.243.879-5.121C10.757 9 12.172 9 15 9h1c2.828 0 4.243 0 5.121.879C22 10.757 22 12.172 22 15v1c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1c-2.828 0-4.243 0-5.121-.879C9 20.243 9 18.828 9 16v-1Z`}
      />
      <path
        d={`M17 9c-.003-2.957-.047-4.489-.908-5.538a4 4 0 0 0-.554-.554C14.43 2 12.788 2 9.5 2c-3.287 0-4.931 0-6.038.908a4 4 0 0 0-.554.554C2 4.57 2 6.212 2 9.5c0 3.287 0 4.931.908 6.038a4 4 0 0 0 .554.554c1.05.86 2.58.906 5.538.908`}
      />
    </svg>
  );
}
function ComponentU_component_clean_CnZCLpPh(): RecoveredValue {
  return (
    <svg
      viewBox={`0 0 24 24`}
      width={`16`}
      height={`16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path className={`ui-tfc__check`} d={`M5 12.5 9.5 17 19 7`} pathLength={1} />
    </svg>
  );
}
var l_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M7 14L9.79289 11.2071C10.1834 10.8166 10.8166 10.8166 11.2071 11.2071L12.7929 12.7929C13.1834 13.1834 13.8166 13.1834 14.2071 12.7929L17 10`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  u_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M7 17L7 13`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12 17L12 7`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M17 17L17 11`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  d_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  f_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  p_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  m_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M19.9999 17L3.99994 17`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M17 14C17 14 19.9999 16.2095 19.9999 17C19.9999 17.7906 16.9999 20 16.9999 20`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M4.99994 7L19.9999 7`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M6.99992 4C6.99992 4 3.99995 6.20947 3.99994 7.00002C3.99993 7.79058 6.99994 10 6.99994 10`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  h_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  g_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  __component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M7 4V20`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M17 19L17 4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M10 6.99998C10 6.99998 7.79053 4.00001 6.99998 4C6.20942 3.99999 4 7 4 7`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M20 17C20 17 17.7905 20 17 20C16.2094 20 14 17 14 17`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  v_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  y_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M15.5 7H8.5M12.499 11H8.49902`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M20 22H6C4.89543 22 4 21.1046 4 20M4 20C4 18.8954 4.89543 18 6 18H20V6C20 4.11438 20 3.17157 19.4142 2.58579C18.8284 2 17.8856 2 16 2H10C7.17157 2 5.75736 2 4.87868 2.87868C4 3.75736 4 5.17157 4 8V20Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M19.5 18C19.5 18 18.5 18.7628 18.5 20C18.5 21.2372 19.5 22 19.5 22`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  b_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C10.3719 21.5 8.8394 21.0904 7.5 20.3687C5.63177 19.362 4.37462 20.2979 3.26592 20.4658C3.09774 20.4913 2.93024 20.4302 2.80997 20.31C2.62741 20.1274 2.59266 19.8451 2.6935 19.6074C3.12865 18.5818 3.5282 16.6382 2.98341 15C2.6698 14.057 2.5 13.0483 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12.1257 12H12.0007M8.125 12H8M16.125 12H16M12.2507 12C12.2507 12.1381 12.1388 12.25 12.0007 12.25C11.8627 12.25 11.7507 12.1381 11.7507 12C11.7507 11.8619 11.8627 11.75 12.0007 11.75C12.1388 11.75 12.2507 11.8619 12.2507 12ZM8.25 12C8.25 12.1381 8.13807 12.25 8 12.25C7.86193 12.25 7.75 12.1381 7.75 12C7.75 11.8619 7.86193 11.75 8 11.75C8.13807 11.75 8.25 11.8619 8.25 12ZM16.25 12C16.25 12.1381 16.1381 12.25 16 12.25C15.8619 12.25 15.75 12.1381 15.75 12C15.75 11.8619 15.8619 11.75 16 11.75C16.1381 11.75 16.25 11.8619 16.25 12Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  x_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M16 2V6M8 2V6`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M3 10H21`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  S_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M18 6L6.00081 17.9992M17.9992 18L6 6.00085`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  C_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M11 6L21 6`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M11 12L21 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M11 18L21 18`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
    [
      `path`,
      {
        d: `M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `4`,
      },
    ],
  ],
  w_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.247 11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M16.8538 7.43306C16.8538 8.24714 16.1901 8.90709 15.3714 8.90709C14.5527 8.90709 13.889 8.24714 13.889 7.43306C13.889 6.61898 14.5527 5.95904 15.3714 5.95904C16.1901 5.95904 16.8538 6.61898 16.8538 7.43306Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  T_component_BUnqa8Km: RecoveredValue = [
    [
      `circle`,
      {
        cx: `12`,
        cy: `12`,
        r: `10`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12 8V12L14 14`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  ee_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M5.5 3C6.90446 3 7.60669 3 8.11114 3.37919C8.32952 3.54335 8.51702 3.75429 8.66294 3.99997C9 4.56747 9 5.35748 9 6.9375L9 17.0625C9 18.6425 9 19.4325 8.66294 20C8.51702 20.2457 8.32952 20.4566 8.11114 20.6208C7.60669 21 6.90446 21 5.5 21C4.09554 21 3.39331 21 2.88886 20.6208C2.67048 20.4566 2.48298 20.2457 2.33706 20C2 19.4325 2 18.6425 2 17.0625L2 6.9375C2 5.35748 2 4.56747 2.33706 3.99997C2.48298 3.75429 2.67048 3.54335 2.88886 3.37919C3.39331 3 4.09554 3 5.5 3Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M20 11.9375L20 17.0625C20 18.6425 20 19.4325 19.6629 20C19.517 20.2457 19.3295 20.4566 19.1111 20.6208C18.6067 21 17.9045 21 16.5 21C15.0955 21 14.3933 21 13.8889 20.6208C13.6705 20.4566 13.483 20.2457 13.3371 20C13 19.4325 13 18.6425 13 17.0625L13 6.9375C13 5.35748 13 4.56747 13.3371 3.99997`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M22 8.99936L16 3M22 3.00064L16 9`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  E_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M14 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M7 9L8.83981 10.5858C9.61327 11.2525 10 11.5858 10 12C10 12.4142 9.61327 12.7475 8.83981 13.4142L7 15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M13 16H17`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  D_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M14 21H16M14 21C13.1716 21 12.5 20.3284 12.5 19.5V17L12 17M14 21H10M10 21H8M10 21C10.8284 21 11.5 20.3284 11.5 19.5V17L12 17M12 17V21`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M16 3H8C5.17157 3 3.75736 3 2.87868 3.87868C2 4.75736 2 6.17157 2 9V11C2 13.8284 2 15.2426 2.87868 16.1213C3.75736 17 5.17157 17 8 17H16C18.8284 17 20.2426 17 21.1213 16.1213C22 15.2426 22 13.8284 22 11V9C22 6.17157 22 4.75736 21.1213 3.87868C20.2426 3 18.8284 3 16 3Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  te_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  O_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  k_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M10 16H11.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M14.5 16L18 16`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M2 9H22`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  ne_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M13 17L11.0714 12.5M3 17L4.92857 12.5M4.92857 12.5L7.02295 7.61311C7.21207 7.17183 7.54728 7 8 7C8.45272 7 8.78793 7.17183 8.97705 7.61311L11.0714 12.5M4.92857 12.5H11.0714`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M16 3.00008C16.8333 2.99261 18 3.50003 18.5 4.50003M18.5 4.50003C19 3.50003 20.1667 3.00005 21 3.00008M18.5 4.50003L18.5 19.5M21 21C20.1667 21.0074 19 20.5 18.5 19.5M18.5 19.5C18 20.5 16.8333 21 16 21M20 12H17`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  A_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M10.5 8.75V6.75C10.5 5.10626 10.5 4.28439 10.046 3.73121C9.96291 3.62995 9.87005 3.53709 9.76879 3.45398C9.21561 3 8.39374 3 6.75 3C5.10626 3 4.28439 3 3.73121 3.45398C3.62995 3.53709 3.53709 3.62995 3.45398 3.73121C3 4.28439 3 5.10626 3 6.75V8.75C3 10.3937 3 11.2156 3.45398 11.7688C3.53709 11.8701 3.62995 11.9629 3.73121 12.046C4.28439 12.5 5.10626 12.5 6.75 12.5C8.39374 12.5 9.21561 12.5 9.76879 12.046C9.87005 11.9629 9.96291 11.8701 10.046 11.7688C10.5 11.2156 10.5 10.3937 10.5 8.75Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M7.75 15.5H5.75C5.05222 15.5 4.70333 15.5 4.41943 15.5861C3.78023 15.78 3.28002 16.2802 3.08612 16.9194C3 17.2033 3 17.5522 3 18.25C3 18.9478 3 19.2967 3.08612 19.5806C3.28002 20.2198 3.78023 20.72 4.41943 20.9139C4.70333 21 5.05222 21 5.75 21H7.75C8.44778 21 8.79667 21 9.08057 20.9139C9.71977 20.72 10.22 20.2198 10.4139 19.5806C10.5 19.2967 10.5 18.9478 10.5 18.25C10.5 17.5522 10.5 17.2033 10.4139 16.9194C10.22 16.2802 9.71977 15.78 9.08057 15.5861C8.79667 15.5 8.44778 15.5 7.75 15.5Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M21 17.25V15.25C21 13.6063 21 12.7844 20.546 12.2312C20.4629 12.1299 20.3701 12.0371 20.2688 11.954C19.7156 11.5 18.8937 11.5 17.25 11.5C15.6063 11.5 14.7844 11.5 14.2312 11.954C14.1299 12.0371 14.0371 12.1299 13.954 12.2312C13.5 12.7844 13.5 13.6063 13.5 15.25V17.25C13.5 18.8937 13.5 19.7156 13.954 20.2688C14.0371 20.3701 14.1299 20.4629 14.2312 20.546C14.7844 21 15.6063 21 17.25 21C18.8937 21 19.7156 21 20.2688 20.546C20.3701 20.4629 20.4629 20.3701 20.546 20.2688C21 19.7156 21 18.8937 21 17.25Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M18.25 3H16.25C15.5522 3 15.2033 3 14.9194 3.08612C14.2802 3.28002 13.78 3.78023 13.5861 4.41943C13.5 4.70333 13.5 5.05222 13.5 5.75C13.5 6.44778 13.5 6.79667 13.5861 7.08057C13.78 7.71977 14.2802 8.21998 14.9194 8.41388C15.2033 8.5 15.5522 8.5 16.25 8.5H18.25C18.9478 8.5 19.2967 8.5 19.5806 8.41388C20.2198 8.21998 20.72 7.71977 20.9139 7.08057C21 6.79667 21 6.44778 21 5.75C21 5.05222 21 4.70333 20.9139 4.41943C20.72 3.78023 20.2198 3.28002 19.5806 3.08612C19.2967 3 18.9478 3 18.25 3Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  re_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M9.5 16.5L9.5 10.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M14.5 16.5L14.5 10.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  j_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M17.9583 8.38889C17.9583 6.24111 15.2907 4.5 12 4.5C8.7093 4.5 6.04167 6.24111 6.04167 8.38889C6.04167 10.5367 7.66667 11.7222 12 11.7222C16.3333 11.7222 18.5 12.8333 18.5 15.6111C18.5 18.3889 15.5899 19.5 12 19.5C8.41015 19.5 5.5 17.7589 5.5 15.6111`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12.5 2.5V4.21M12.5 21.5V19.79`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  M_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M5.00006 21H19.0001`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  ie_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M8.73792 7.78021L4.84693 11.7574C3.67722 12.953 3.09236 13.5508 3.01263 14.2802C2.99579 14.4343 2.99579 14.5899 3.01263 14.744C3.09236 15.4733 3.67722 16.0711 4.84693 17.2668L4.99601 17.4191C5.62049 18.0575 5.93274 18.3766 6.30638 18.5911C6.5236 18.7157 6.75482 18.8134 6.99505 18.882C7.40827 19 7.85149 19 8.73792 19C9.62436 19 10.0676 19 10.4808 18.882C10.721 18.8134 10.9522 18.7157 11.1695 18.5911C11.5431 18.3766 11.8554 18.0575 12.4798 17.4191L15.3239 14.5121M8.73792 7.78021L12.3199 4.12313C13.7065 2.70754 14.3997 1.99974 15.2627 2C16.1256 2.00026 16.8185 2.70846 18.2042 4.12487L18.9473 4.8845C20.3159 6.28342 21.0002 6.98288 21 7.85008C20.9997 8.71728 20.315 9.41633 18.9456 10.8144L15.3239 14.5121M8.73792 7.78021L15.3239 14.5121`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M10 22L21 22`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  N_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M8 7L16 7`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M8 11L12 11`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  P_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M8 17H16`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M8 13H12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  F_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M10 18C10 18 7.50004 16.1588 7.50003 15.5C7.50003 14.8412 10 13 10 13`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M14 18C14 18 16.5 16.1588 16.5 15.5C16.5 14.8412 14 13 14 13`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  ae_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  oe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  se_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M13 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M18 13V21M22 17H14`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  ce_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M2.5 20V8.87695C2.5 7.58945 2.5 6.9457 2.78533 6.47048C2.9541 6.18939 3.18939 5.9541 3.47048 5.78533C3.9457 5.5 4.59449 5.5 5.89206 5.5C6.52339 5.5 6.83906 5.5 7.12612 5.58819C7.31759 5.64702 7.49914 5.73428 7.66469 5.84705C7.91289 6.01611 8.10859 6.26074 8.5 6.75C8.89141 7.23926 9.08711 7.48389 9.33531 7.65295C9.50086 7.76572 9.68241 7.85298 9.87388 7.91181C10.1609 8 10.4742 8 11.1008 8H15C16.4045 8 17.1067 8 17.6111 8.33706C17.8295 8.48298 18.017 8.67048 18.1629 8.88886C18.5 9.39331 18.5 10.0955 18.5 11.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M4.42028 14.0144L3.63368 16.0144C2.65618 18.4998 2.16743 19.7425 2.7524 20.6213C3.33737 21.5 4.65337 21.5 7.28537 21.5H15.1903C16.4249 21.5 17.0422 21.5 17.5295 21.1795C18.0169 20.859 18.2702 20.2865 18.7769 19.1415L19.6618 17.1415C20.7866 14.5992 21.349 13.3281 20.7679 12.4141C20.1868 11.5 18.8163 11.5 16.0752 11.5H8.07196C6.78232 11.5 6.1375 11.5 5.63811 11.8439C5.13872 12.1877 4.89924 12.7966 4.42028 14.0144Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M11.5 4.51456C12.4151 3.28409 13.6662 2.55594 15.5125 2.50161C16.1155 2.48386 16.7152 2.61395 17.2682 2.85544C18.5748 3.42601 19.4185 4.15644 20 5.5L21.5 3`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  I_component_BUnqa8Km: RecoveredValue = [
    [
      `circle`,
      {
        cx: `12`,
        cy: `12`,
        r: `10`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M21 15H3`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M21 9H3`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  le_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M13 3H11C7.22876 3 5.34315 3 4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13V11C21 7.22876 21 5.34315 19.8284 4.17157C18.6569 3 16.7712 3 13 3Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M9 3V21`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M15 3V21`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M21.0001 9L3.00014 9`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
    [
      `path`,
      {
        d: `M21.0001 15L3.00014 15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `4`,
      },
    ],
  ],
  ue_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  de_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M20.7104 8.70122L21.9186 12.7288C21.9578 12.8592 21.9773 12.9244 21.9879 12.9914L21.9908 13.0118C22 13.079 22 13.147 22 13.2831C22 16.7797 22 18.528 20.9812 19.6669C20.8824 19.7774 20.7774 19.8824 20.6669 19.9812C19.528 21 17.7797 21 14.2831 21H9.71685C6.22026 21 4.47197 21 3.33311 19.9812C3.22259 19.8824 3.11765 19.7774 3.01877 19.6669C2 18.528 2 16.7797 2 13.2831C2 13.147 2 13.079 2.00915 13.0118L2.01215 12.9914C2.02269 12.9244 2.04225 12.8592 2.08136 12.7288L3.28963 8.70122C4.11355 5.95484 4.5255 4.58166 5.5884 3.79083C6.6513 3 8.08495 3 10.9522 3H13.0478C15.9151 3 17.3487 3 18.4116 3.79083C19.4745 4.58166 19.8865 5.95484 20.7104 8.70122Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M2 13H22`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M18.125 17H18M14.125 17H14M18.25 17C18.25 17.1381 18.1381 17.25 18 17.25C17.8619 17.25 17.75 17.1381 17.75 17C17.75 16.8619 17.8619 16.75 18 16.75C18.1381 16.75 18.25 16.8619 18.25 17ZM14.25 17C14.25 17.1381 14.1381 17.25 14 17.25C13.8619 17.25 13.75 17.1381 13.75 17C13.75 16.8619 13.8619 16.75 14 16.75C14.1381 16.75 14.25 16.8619 14.25 17Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  fe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M4 5V19`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M14 5V19`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M17 19H18.5M20 19H18.5M18.5 19V11L17 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M4 12L14 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  pe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M3.5 5V19`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M13.5 5V19`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M20.5 19H16.5V18.6907C16.5 18.2521 16.5 18.0327 16.5865 17.8385C16.673 17.6443 16.836 17.4976 17.1621 17.2041L19.7671 14.8596C20.2336 14.4397 20.5 13.8416 20.5 13.214V13C20.5 11.8954 19.6046 11 18.5 11C17.3954 11 16.5 11.8954 16.5 13V13.4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M3.5 12L13.5 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  L_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M3.5 5V19`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M13.5 5V19`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M16.5 17C16.5 18.1046 17.3954 19 18.5 19C19.6046 19 20.5 18.1046 20.5 17C20.5 15.8954 19.6046 15 18.5 15C19.6046 15 20.5 14.1046 20.5 13C20.5 11.8954 19.6046 11 18.5 11C17.3954 11 16.5 11.8954 16.5 13`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M3.5 12L13.5 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  me_component_BUnqa8Km: RecoveredValue = [
    [
      `circle`,
      {
        cx: `12`,
        cy: `12`,
        r: `10`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  R_component_BUnqa8Km: RecoveredValue = [
    [
      `circle`,
      {
        cx: `7.5`,
        cy: `7.5`,
        r: `1.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  z_component_BUnqa8Km: RecoveredValue = [
    [
      `circle`,
      {
        cx: `12`,
        cy: `12`,
        r: `10`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12 16V12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M12.125 8.25H12M12.25 8.25C12.25 8.11193 12.1381 8 12 8C11.8619 8 11.75 8.11193 11.75 8.25C11.75 8.38807 11.8619 8.5 12 8.5C12.1381 8.5 12.25 8.38807 12.25 8.25Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  he_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M2.8125 18C3.01415 18.8888 3.34564 19.5638 3.89059 20.1088C5.28184 21.5 7.52101 21.5 11.9994 21.5C16.4777 21.5 18.7169 21.5 20.1081 20.1088C21.4993 18.7175 21.4993 16.4783 21.4993 12C21.4993 7.52166 21.4993 5.28249 20.1081 3.89124C18.7169 2.5 16.4777 2.5 11.9994 2.5C7.52101 2.5 5.28184 2.5 3.89059 3.89124C3.34564 4.4362 3.01415 5.11125 2.8125 6.00001`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M5.5 9L2.5 12L5.5 15M3.5 12L10.5 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M15 2.49805L15 21.498`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M21.5 8.49805H15M21.5 15.498H15`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  ge_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M21.1868 18C20.9852 18.8888 20.6537 19.5638 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C20.6537 4.4362 20.9852 5.11125 21.1868 6.00001`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M18.5 9L21.5 12L18.5 15M20.5 12L13.5 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M9 2.49805V21.498`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M2.49805 8.49805H8.99805M2.49805 15.498H8.99805`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  _e_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M18 21.1868C18.8888 20.9852 19.5638 20.6537 20.1088 20.1088C21.5 18.7175 21.5 16.4783 21.5 12C21.5 7.52166 21.5 5.28249 20.1088 3.89124C18.7175 2.5 16.4783 2.5 12 2.5C7.52166 2.5 5.28249 2.5 3.89124 3.89124C2.5 5.28249 2.5 7.52166 2.5 12C2.5 16.4783 2.5 18.7175 3.89124 20.1088C4.4362 20.6537 5.11125 20.9852 6.00001 21.1868`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12 13.5V20.5M9 18.5L12 21.5L15 18.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M2.5 9L21.5 9`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M8.5 2.5L8.5 9M15.5 2.5L15.5 9`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  ve_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M18 2.8125C18.8888 3.01415 19.5638 3.34564 20.1088 3.89059C21.5 5.28184 21.5 7.52101 21.5 11.9994C21.5 16.4777 21.5 18.7169 20.1088 20.1081C18.7175 21.4993 16.4783 21.4993 12 21.4993C7.52166 21.4993 5.28249 21.4993 3.89124 20.1081C2.5 18.7169 2.5 16.4777 2.5 11.9993C2.5 7.52101 2.5 5.28184 3.89124 3.89059C4.4362 3.34564 5.11125 3.01415 6.00001 2.8125`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M9 5.5L12 2.5L15 5.5M12 3.5V10.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M2.5 15H21.5`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M8.5 21.5L8.5 15M15.5 21.5L15.5 15`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  ye_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M8 5.5L20 5.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M8 12.5L20 12.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M8 19.5L20 19.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M4.375 5.5H4.25M4.5 5.5C4.5 5.63807 4.38807 5.75 4.25 5.75C4.11193 5.75 4 5.63807 4 5.5C4 5.36193 4.11193 5.25 4.25 5.25C4.38807 5.25 4.5 5.36193 4.5 5.5Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
    [
      `path`,
      {
        d: `M4.375 12.5H4.25M4.5 12.5C4.5 12.6381 4.38807 12.75 4.25 12.75C4.11193 12.75 4 12.6381 4 12.5C4 12.3619 4.11193 12.25 4.25 12.25C4.38807 12.25 4.5 12.3619 4.5 12.5Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `4`,
      },
    ],
    [
      `path`,
      {
        d: `M4.375 19.5H4.25M4.5 19.5C4.5 19.6381 4.38807 19.75 4.25 19.75C4.11193 19.75 4 19.6381 4 19.5C4 19.3619 4.11193 19.25 4.25 19.25C4.38807 19.25 4.5 19.3619 4.5 19.5Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `5`,
      },
    ],
  ],
  be_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M11 6L21 6`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M11 12L21 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M11 18L21 18`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M3 15H4.5C4.77879 15 4.91819 15 5.03411 15.0231C5.51014 15.1177 5.88225 15.4899 5.97694 15.9659C6 16.0818 6 16.2212 6 16.5C6 16.7788 6 16.9182 5.97694 17.0341C5.88225 17.5101 5.51014 17.8823 5.03411 17.9769C4.91819 18 4.77879 18 4.5 18C4.22121 18 4.08181 18 3.96589 18.0231C3.48986 18.1177 3.11775 18.4899 3.02306 18.9659C3 19.0818 3 19.2212 3 19.5V20.4C3 20.6828 3 20.8243 3.08787 20.9121C3.17574 21 3.31716 21 3.6 21H6`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
    [
      `path`,
      {
        d: `M3 3H4.2C4.36569 3 4.5 3.13431 4.5 3.3V9M4.5 9H3M4.5 9H6`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `4`,
      },
    ],
  ],
  B_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  xe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M2 11.4C2 10.2417 2.24173 10 3.4 10H20.6C21.7583 10 22 10.2417 22 11.4V12.6C22 13.7583 21.7583 14 20.6 14H3.4C2.24173 14 2 13.7583 2 12.6V11.4Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M2 3.4C2 2.24173 2.24173 2 3.4 2H20.6C21.7583 2 22 2.24173 22 3.4V4.6C22 5.75827 21.7583 6 20.6 6H3.4C2.24173 6 2 5.75827 2 4.6V3.4Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M2 19.4C2 18.2417 2.24173 18 3.4 18H20.6C21.7583 18 22 18.2417 22 19.4V20.6C22 21.7583 21.7583 22 20.6 22H3.4C2.24173 22 2 21.7583 2 20.6V19.4Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  Se_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M15.5 8.04045C15.4588 6.87972 15.3216 6.15451 14.8645 5.58671C14.2114 4.77536 13.0944 4.52064 10.8605 4.01121L9.85915 3.78286C6.4649 3.00882 4.76777 2.6218 3.63388 3.51317C2.5 4.40454 2.5 6.1257 2.5 9.56803V14.432C2.5 17.8743 2.5 19.5955 3.63388 20.4868C4.76777 21.3782 6.4649 20.9912 9.85915 20.2171L10.8605 19.9888C13.0944 19.4794 14.2114 19.2246 14.8645 18.4133C15.3216 17.8455 15.4588 17.1203 15.5 15.9595`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M18.5 9.01172C18.5 9.01172 21.5 11.2212 21.5 12.0117C21.5 12.8023 18.5 15.0117 18.5 15.0117M21 12.0117H8.49998`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  V_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  Ce_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  we_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M15.5 2V5M6.5 2V5M11 2V5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M19 12V10.5C19 7.20017 19 5.55025 17.9749 4.52512C16.9497 3.5 15.2998 3.5 12 3.5H10C6.70017 3.5 5.05025 3.5 4.02513 4.52513C3 5.55025 3 7.20017 3 10.5V15C3 18.2998 3 19.9497 4.02513 20.9749C5.05025 22 6.70017 22 10 22H11`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M7 15H11M7 11H15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M15.7367 21.6527L14 22L14.3473 20.2633C14.4179 19.9106 14.5913 19.5866 14.8456 19.3323L18.9111 15.2668C19.2668 14.9111 19.8437 14.9111 20.1995 15.2668L20.7332 15.8005C21.0889 16.1563 21.0889 16.7332 20.7332 17.0889L16.6677 21.1544C16.4134 21.4087 16.0894 21.5821 15.7367 21.6527Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  Te_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.8417 22 14 22.1163 14 21C14 20.391 13.6832 19.9212 13.3686 19.4544C12.9082 18.7715 12.4523 18.0953 13 17C13.6667 15.6667 14.7778 15.6667 16.4815 15.6667C17.3334 15.6667 18.3334 15.6667 19.5 15.5C21.601 15.1999 22 13.9084 22 12Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `circle`,
      {
        cx: `9.5`,
        cy: `8.5`,
        r: `1.5`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `circle`,
      {
        cx: `16.5`,
        cy: `9.5`,
        r: `1.5`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M7.125 15H7M7.25 15C7.25 15.1381 7.13807 15.25 7 15.25C6.86193 15.25 6.75 15.1381 6.75 15C6.75 14.8619 6.86193 14.75 7 14.75C7.13807 14.75 7.25 14.8619 7.25 15Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  H_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M11 20H17`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  Ee_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  De_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M4 20L20 4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M8.26777 4.73223C9.24408 5.70854 9.24408 7.29146 8.26777 8.26777C7.29146 9.24408 5.70854 9.24408 4.73223 8.26777C3.75592 7.29146 3.75592 5.70854 4.73223 4.73223C5.70854 3.75592 7.29146 3.75592 8.26777 4.73223Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M19.2678 15.7322C20.2441 16.7085 20.2441 18.2915 19.2678 19.2678C18.2915 20.2441 16.7085 20.2441 15.7322 19.2678C14.7559 18.2915 14.7559 16.7085 15.7322 15.7322C16.7085 14.7559 18.2915 14.7559 19.2678 15.7322Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  Oe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M7.5 8C6.95863 8.1281 6.49932 8.14239 5.99268 8.45891C5.07234 9.03388 4.85108 9.71674 5.08821 10.7612C5.94028 14.5139 9.48599 18.0596 13.2388 18.9117C14.2834 19.1489 14.9661 18.928 15.5416 18.0077C15.8411 17.5288 15.8716 17.0081 16 16.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12 7.79915C12.1776 7.77794 12.3182 7.74034 12.4295 7.68235C13.3997 7.17686 13.9291 5.53361 14.4498 4.60009C14.9311 3.73715 15.1718 3.30567 15.7379 3.10227C16.3041 2.89888 16.6448 3.02205 17.3262 3.26839C18.9197 3.8445 20.1555 5.08032 20.7316 6.6738C20.9779 7.35521 21.1011 7.69591 20.8977 8.26204C20.6943 8.82817 20.2628 9.06884 19.3999 9.55018C18.4608 10.074 16.7954 10.6108 16.2905 11.5898C16.2345 11.6983 16.1978 11.8327 16.1769 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M3 21L8 16`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M3 3L21 21`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  U_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M3 21L8 16`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M13.2585 18.8714C9.51516 18.0215 5.97844 14.4848 5.12853 10.7415C4.99399 10.1489 4.92672 9.85266 5.12161 9.37197C5.3165 8.89129 5.55457 8.74255 6.03071 8.44509C7.10705 7.77265 8.27254 7.55888 9.48209 7.66586C11.1793 7.81598 12.0279 7.89104 12.4512 7.67048C12.8746 7.44991 13.1622 6.93417 13.7376 5.90269L14.4664 4.59604C14.9465 3.73528 15.1866 3.3049 15.7513 3.10202C16.316 2.89913 16.6558 3.02199 17.3355 3.26771C18.9249 3.84236 20.1576 5.07505 20.7323 6.66449C20.978 7.34417 21.1009 7.68401 20.898 8.2487C20.6951 8.8134 20.2647 9.05346 19.4039 9.53358L18.0672 10.2792C17.0376 10.8534 16.5229 11.1406 16.3024 11.568C16.0819 11.9955 16.162 12.8256 16.3221 14.4859C16.4399 15.7068 16.2369 16.88 15.5555 17.9697C15.2577 18.4458 15.1088 18.6839 14.6283 18.8786C14.1477 19.0733 13.8513 19.006 13.2585 18.8714Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  ke_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M15.5 2V6M8.5 6V2`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M6.00446 7.61331C5.93719 6.74273 6.63957 6 7.53014 6H16.4699C17.3604 6 18.0628 6.74273 17.9955 7.61331L17.8117 9.99197C17.6796 11.7019 17.1011 13.3498 16.132 14.7773L15.5312 15.6622C14.9638 16.4979 14.0077 17 12.9838 17H11.0162C9.99228 17 9.03617 16.4979 8.46881 15.6622L7.86803 14.7773C6.89885 13.3498 6.32041 11.7019 6.18827 9.99197L6.00446 7.61331Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M12 17V22`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M11 9H13`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  Ae_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M12 4V20M20 12H4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  je_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M10 8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8C2 6.11438 2 5.17157 2.58579 4.58579C3.17157 4 4.11438 4 6 4C7.88562 4 8.82843 4 9.41421 4.58579C10 5.17157 10 6.11438 10 8Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M10 7L10 11.4821C10 15.4547 7.48429 18.8237 4 20`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M22 8C22 9.88562 22 10.8284 21.4142 11.4142C20.8284 12 19.8856 12 18 12C16.1144 12 15.1716 12 14.5858 11.4142C14 10.8284 14 9.88562 14 8C14 6.11438 14 5.17157 14.5858 4.58579C15.1716 4 16.1144 4 18 4C19.8856 4 20.8284 4 21.4142 4.58579C22 5.17157 22 6.11438 22 8Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M22 7L22 11.4821C22 15.4547 19.4843 18.8237 16 20`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  Me_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3313 3 18.2398 4.80989 19.796 7.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M20.9991 3V4.27816C20.9991 6.47004 20.9991 7.56599 20.2918 8.16512C19.5846 8.76425 18.5036 8.58408 16.3415 8.22373L14.9991 8`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  W_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M3.99219 6.5L4.23786 5.88583C4.6032 4.97248 4.78587 4.5158 5.16679 4.2579C5.54772 4 6.03976 4 7.02385 4C10.8174 4 13.6161 4 17.2987 4C17.7227 4 17.9348 4 18.0894 4.03298C18.877 4.2009 19.3915 4.96078 19.2549 5.75442C19.2281 5.91026 19.1495 6.10684 18.9922 6.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M4.49219 20H10.4922`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M12.4922 4L7.49219 20`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M14.9922 15L19.9922 20M14.9922 20L19.9922 15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  Ne_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M21 18.5C21 19.9045 21 20.6067 20.6208 21.1111C20.4567 21.3295 20.2457 21.517 20 21.6629C19.4325 22 18.6425 22 17.0625 22L6.9375 22C5.35748 22 4.56747 22 3.99997 21.6629C3.75429 21.517 3.54335 21.3295 3.37919 21.1111C3 20.6067 3 19.9045 3 18.5C3 17.0955 3 16.3933 3.37919 15.8889C3.54335 15.6705 3.75429 15.483 3.99997 15.3371C4.56747 15 5.35748 15 6.9375 15L17.0625 15C18.6425 15 19.4325 15 20 15.3371C20.2457 15.483 20.4567 15.6705 20.6208 15.8889C21 16.3933 21 17.0955 21 18.5Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12.0625 4L6.9375 4C5.35748 4 4.56747 4 3.99997 4.33706C3.75429 4.48298 3.54335 4.67048 3.37919 4.88886C3 5.39331 3 6.09554 3 7.5C3 8.90446 3 9.60669 3.37919 10.1111C3.54335 10.3295 3.75429 10.517 3.99997 10.6629C4.56747 11 5.35748 11 6.9375 11L17.0625 11C18.6425 11 19.4325 11 20 10.6629`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M21 7.99936L15 2M21 2.00064L15 8`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  Pe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M13.4368 9.55807L10.6 12M10.6 12L7 15M10.6 12L13.4949 14.3865M10.6 12L7 9M16 8.5C16 9.32843 15.3284 10 14.5 10C13.6716 10 13 9.32843 13 8.5C13 7.67157 13.6716 7 14.5 7C15.3284 7 16 7.67157 16 8.5ZM16 15.5C16 16.3284 15.3284 17 14.5 17C13.6716 17 13 16.3284 13 15.5C13 14.6716 13.6716 14 14.5 14C15.3284 14 16 14.6716 16 15.5Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  Fe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M17 17L21 21`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  Ie_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  Le_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  G_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M9.5 3L9.5 21`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M5 7H6M5 10H6`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  Re_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M2 12C2 8.3109 2 6.46633 2.81382 5.1588C3.1149 4.67505 3.48891 4.2543 3.91891 3.91557C5.08116 3.00003 6.72077 3.00003 10 3.00003H14C17.2792 3.00003 18.9188 3.00003 20.0811 3.91557C20.5111 4.2543 20.8851 4.67505 21.1862 5.1588C22 6.46633 22 8.3109 22 12C22 15.6892 22 17.5337 21.1862 18.8413C20.8851 19.325 20.5111 19.7458 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7458 3.1149 19.325 2.81382 18.8413C2 17.5337 2 15.6892 2 12Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M14.5 3.00003L14.5 21`,
        stroke: `currentColor`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M18 7.00006H19M18 10.0001H19`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  ze_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M15 16.3265L16.409 17.8131C17.159 18.6044 17.534 19 18 19C18.466 19 18.841 18.6044 19.591 17.8131L21 16.3265M18 18.9128L18 14.5377C18 12.3042 18 11.1875 17.5532 10.2028C17.1063 9.21804 16.2659 8.48266 14.585 7.01192L14 6.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M3 6.5C3 5.27489 3 4.66233 3.23842 4.1944C3.44815 3.78279 3.78279 3.44815 4.1944 3.23842C4.66233 3 5.27489 3 6.5 3C7.72511 3 8.33767 3 8.8056 3.23842C9.21721 3.44815 9.55185 3.78279 9.76158 4.1944C10 4.66233 10 5.27489 10 6.5C10 7.72511 10 8.33767 9.76158 8.8056C9.55185 9.21721 9.21721 9.55185 8.8056 9.76158C8.33767 10 7.72511 10 6.5 10C5.27489 10 4.66233 10 4.1944 9.76158C3.78279 9.55185 3.44815 9.21721 3.23842 8.8056C3 8.33767 3 7.72511 3 6.5Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M3 17.5C3 16.2749 3 15.6623 3.23842 15.1944C3.44815 14.7828 3.78279 14.4481 4.1944 14.2384C4.66233 14 5.27489 14 6.5 14C7.72511 14 8.33767 14 8.8056 14.2384C9.21721 14.4481 9.55185 14.7828 9.76158 15.1944C10 15.6623 10 16.2749 10 17.5C10 18.7251 10 19.3377 9.76158 19.8056C9.55185 20.2172 9.21721 20.5519 8.8056 20.7616C8.33767 21 7.72511 21 6.5 21C5.27489 21 4.66233 21 4.1944 20.7616C3.78279 20.5519 3.44815 20.2172 3.23842 19.8056C3 19.3377 3 18.7251 3 17.5Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  Be_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M14.9998 7.67356L16.4088 6.187C17.1588 5.39573 17.5338 5.00009 17.9998 5.00009C18.4658 5.00009 18.8408 5.39573 19.5908 6.18701L20.9998 7.67356M17.9998 5.08732L17.9998 9.46241C17.9998 11.6959 17.9998 12.8126 17.553 13.7973C17.1061 14.7821 16.2657 15.5174 14.5849 16.9882L13.9998 17.5001`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M3 6.5C3 5.27489 3 4.66233 3.23842 4.1944C3.44815 3.78279 3.78279 3.44815 4.1944 3.23842C4.66233 3 5.27489 3 6.5 3C7.72511 3 8.33767 3 8.8056 3.23842C9.21721 3.44815 9.55185 3.78279 9.76158 4.1944C10 4.66233 10 5.27489 10 6.5C10 7.72511 10 8.33767 9.76158 8.8056C9.55185 9.21721 9.21721 9.55185 8.8056 9.76158C8.33767 10 7.72511 10 6.5 10C5.27489 10 4.66233 10 4.1944 9.76158C3.78279 9.55185 3.44815 9.21721 3.23842 8.8056C3 8.33767 3 7.72511 3 6.5Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M3 17.5C3 16.2749 3 15.6623 3.23842 15.1944C3.44815 14.7828 3.78279 14.4481 4.1944 14.2384C4.66233 14 5.27489 14 6.5 14C7.72511 14 8.33767 14 8.8056 14.2384C9.21721 14.4481 9.55185 14.7828 9.76158 15.1944C10 15.6623 10 16.2749 10 17.5C10 18.7251 10 19.3377 9.76158 19.8056C9.55185 20.2172 9.21721 20.5519 8.8056 20.7616C8.33767 21 7.72511 21 6.5 21C5.27489 21 4.66233 21 4.1944 20.7616C3.78279 20.5519 3.44815 20.2172 3.23842 19.8056C3 19.3377 3 18.7251 3 17.5Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  Ve_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M11 10L18 10`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M11 14H16`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M11 18H14`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M11 6H21`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
    [
      `path`,
      {
        d: `M7 18.8125C6.60678 19.255 5.56018 21 5 21M3 18.8125C3.39322 19.255 4.43982 21 5 21M5 21L5 15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `4`,
      },
    ],
    [
      `path`,
      {
        d: `M3 5.1875C3.39322 4.74501 4.43982 3 5 3M7 5.1875C6.60678 4.74501 5.56018 3 5 3M5 3L5 9`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `5`,
      },
    ],
  ],
  He_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M15.9367 2L16.417 2.45852C16.8461 2.8682 17.0606 3.07305 16.9851 3.2471C16.9096 3.42115 16.6062 3.42115 15.9993 3.42115H8.56617C5.49108 3.42115 2.88649 5.34451 2 8`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M8.02139 22L7.58291 21.5792C7.15391 21.1674 6.93942 20.9616 7.01491 20.7866C7.0904 20.6117 7.39375 20.6117 8.00043 20.6117H15.432C18.5102 20.6117 21.1169 18.6739 22 16`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M15 9.5H17.9474C18.5675 9.5 18.8775 9.5 18.9601 9.70009C19.0427 9.90019 18.8317 10.1402 18.4098 10.6203L15.9846 13.3797C15.5627 13.8598 15.3517 14.0998 15.4343 14.2999C15.5169 14.5 15.8269 14.5 16.447 14.5H19`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M3 14.5L4.75464 10.5877C5.07987 9.86258 5.24249 9.5 5.5 9.5C5.75751 9.5 5.92013 9.86258 6.24536 10.5877L8 14.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
    [
      `path`,
      {
        d: `M11 12H12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `4`,
      },
    ],
  ],
  Ue_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M4 3H8.42109C9.35119 3 9.81624 3 9.94012 3.28013C10.064 3.56026 9.74755 3.89632 9.11466 4.56842L5.47691 8.43158C4.84402 9.10368 4.52757 9.43974 4.65145 9.71987C4.77533 10 5.24038 10 6.17048 10H10`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M4 21L6.10557 16.3053C6.49585 15.4351 6.69098 15 7 15C7.30902 15 7.50415 15.4351 7.89443 16.3053L10 21`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M17.5 20V3.99999M17.5 20C16.7998 20 15.4915 18.0057 15 17.5M17.5 20C18.2002 20 19.5085 18.0057 20 17.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  K_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M17 8L18.8398 9.85008C19.6133 10.6279 20 11.0168 20 11.5C20 11.9832 19.6133 12.3721 18.8398 13.1499L17 15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M7 8L5.16019 9.85008C4.38673 10.6279 4 11.0168 4 11.5C4 11.9832 4.38673 12.3721 5.16019 13.1499L7 15`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M14.5 4L9.5 20`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  We_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M20.302 4.25276C21.5 5.6554 21.5 7.77027 21.5 12C21.5 16.2297 21.5 18.3446 20.302 19.7472C20.1319 19.9464 19.9464 20.1319 19.7472 20.302C18.3446 21.5 16.2297 21.5 12 21.5C7.77027 21.5 5.6554 21.5 4.25276 20.302C4.05358 20.1319 3.86808 19.9464 3.69797 19.7472C2.5 18.3446 2.5 16.2297 2.5 12C2.5 7.77027 2.5 5.6554 3.69797 4.25276C3.86808 4.05358 4.05358 3.86808 4.25276 3.69797C5.6554 2.5 7.77027 2.5 12 2.5C16.2297 2.5 18.3446 2.5 19.7472 3.69797C19.9464 3.86808 20.1319 4.05358 20.302 4.25276Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M15 9L8 16`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M10 8.11274C10 8.11274 14.8288 7.70569 15.5615 8.43847C16.2943 9.17125 15.8872 14 15.8872 14`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  Ge_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  Ke_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M20 10C20 10 22.375 11.8222 21.375 14.6667C20.375 17.5111 21.375 19.4074 22 20M20 10H4M20 10V4M4 10C4 10 1.625 11.8222 2.625 14.6667C3.625 17.5111 2.625 19.4074 2 20M4 10V4M22 4H20.75H20M2 4H3.25H4M4 4H20`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M11 7H13`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  qe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M5 6C5 4.58579 5 3.87868 5.43934 3.43934C5.87868 3 6.58579 3 8 3H12.5789C15.0206 3 17 5.01472 17 7.5C17 9.98528 15.0206 12 12.5789 12H5V6Z`,
        stroke: `currentColor`,
        fillRule: `evenodd`,
        clipRule: `evenodd`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12.4286 12H13.6667C16.0599 12 18 14.0147 18 16.5C18 18.9853 16.0599 21 13.6667 21H8C6.58579 21 5.87868 21 5.43934 20.5607C5 20.1213 5 19.4142 5 18V12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  Je_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M14 19L11.1069 10.7479C9.76348 6.91597 9.09177 5 8 5C6.90823 5 6.23652 6.91597 4.89309 10.7479L2 19M4.5 12H11.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M21.9692 13.9392V18.4392M21.9692 13.9392C22.0164 13.1161 22.0182 12.4891 21.9194 11.9773C21.6864 10.7709 20.4258 10.0439 19.206 9.89599C18.0385 9.75447 17.1015 10.055 16.1535 11.4363M21.9692 13.9392L19.1256 13.9392C18.6887 13.9392 18.2481 13.9603 17.8272 14.0773C15.2545 14.7925 15.4431 18.4003 18.0233 18.845C18.3099 18.8944 18.6025 18.9156 18.8927 18.9026C19.5703 18.8724 20.1955 18.545 20.7321 18.1301C21.3605 17.644 21.9692 16.9655 21.9692 15.9392V13.9392Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  q_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M12 4H19`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M8 20L16 4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M5 20H12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  Ye_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M2 20V7.02172C2 5.10465 2 4.00007 2.4389 4.00007C2.95995 4.00007 3.33531 4.66033 4.25033 6.27292L10.7497 17.7271C11.6647 19.3397 12.0233 20 12.5611 20C13 20 13 18.8954 13 16.9784V4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M16 13L22 13`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M16.5806 4.58081C17.3546 3.80672 20.6454 3.80672 21.4194 4.58081C22.1935 5.35489 22.1935 8.6456 21.4194 9.41968C20.6454 10.1938 17.3546 10.1938 16.5806 9.41968C15.8065 8.6456 15.8065 5.35489 16.5806 4.58081Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  Xe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M2.99792 3.02212C5.19555 2.97 6.26962 2.90514 6.99792 4.51533M6.99792 4.51533C7.55517 3.2634 8.38712 2.90727 10.9979 3.02212M6.99792 4.51533V18.9497M6.99792 18.9497C7.22891 20.6878 8.13357 21.1034 10.9979 20.9406M6.99792 18.9497C6.6944 20.7313 5.77226 21.1738 2.99792 20.9406M3.99792 11.9814H9.99792`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M20.9698 15.9631V20.4428M20.9698 15.9631C21.017 15.1437 21.0187 14.5196 20.92 14.0101C20.6874 12.8091 19.4287 12.0854 18.2108 11.9382C17.0451 11.7973 16.1094 12.0965 15.1629 13.4715M20.9698 15.9631L18.1305 15.9631C17.6943 15.9631 17.2543 15.9841 16.834 16.1006C14.2653 16.8125 14.4536 20.404 17.0299 20.8467C17.316 20.8959 17.6082 20.9169 17.8979 20.904C18.5745 20.8739 19.1988 20.5481 19.7345 20.135C20.3621 19.6511 20.9698 18.9757 20.9698 17.9541V15.9631Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  Ze_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M4 12H20`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M17.5 7.66667C17.5 5.08934 15.0376 3 12 3C8.96243 3 6.5 5.08934 6.5 7.66667C6.5 8.15279 6.55336 8.59783 6.6668 9M6 16.3333C6 18.9107 8.68629 21 12 21C15.3137 21 18 19.6667 18 16.3333C18 13.9404 16.9693 12.5782 14.9079 12`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  Qe_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M15 21.001H9`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M12 3.00001V21.0008M12 3.00001C13.3874 3.00001 15.1695 3.03055 16.5884 3.17649C17.1885 3.2382 17.4886 3.26906 17.7541 3.37791C18.3066 3.60429 18.7518 4.10063 18.9194 4.67681C19 4.95382 19 5.26992 19 5.90215M12 3.00001C10.6126 3.00001 8.83047 3.03055 7.41161 3.17649C6.8115 3.2382 6.51144 3.26906 6.24586 3.37791C5.69344 3.60429 5.24816 4.10063 5.08057 4.67681C5 4.95382 5 5.26992 5 5.90215`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  $e_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M5.5 3V11.5C5.5 15.0899 8.41015 18 12 18C15.5899 18 18.5 15.0899 18.5 11.5V3`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M3 21H21`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  et_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M5 14L8.5 17.5L19 6.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
  ],
  tt_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M5 5.82759H7.7M11 5.82759H9.5M7.7 5.82759H9.5M7.7 5.82759V5M9.5 5.82759C9.18351 6.95937 8.52075 8.02923 7.76429 8.96946M5.83571 11C6.44723 10.4377 7.13788 9.74802 7.76429 8.96946M7.76429 8.96946C7.37857 8.51724 6.83857 7.78558 6.68429 7.45455M7.76429 8.96946L8.92143 10.1724`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M13.5 19L14.3333 17M18.5 19L17.6667 17M14.3333 17L16 13L17.6667 17M14.3333 17H17.6667`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M14 10V8C14 5.17157 14 3.75736 13.1213 2.87868C12.2426 2 10.8284 2 8 2C5.17157 2 3.75736 2 2.87868 2.87868C2 3.75736 2 5.17157 2 8C2 10.8284 2 12.2426 2.87868 13.1213C3.75736 14 5.17157 14 8 14H10`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M10 16C10 13.1716 10 11.7574 10.8787 10.8787C11.7574 10 13.1716 10 16 10C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22C13.1716 22 11.7574 22 10.8787 21.1213C10 20.2426 10 18.8284 10 16Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
    [
      `path`,
      {
        d: `M4 16.5C4 17.9045 4 18.6067 4.33706 19.1111C4.48298 19.3295 4.67048 19.517 4.88886 19.6629C5.39331 20 6.09554 20 7.5 20`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `4`,
      },
    ],
    [
      `path`,
      {
        d: `M20 7.5C20 6.09554 20 5.39331 19.6629 4.88886C19.517 4.67048 19.3295 4.48298 19.1111 4.33706C18.6067 4 17.9045 4 16.5 4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `5`,
      },
    ],
  ],
  nt_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.66873 3 5.76018 4.80989 4.20404 7.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M3 3V4.27816C3 6.47004 3 7.56599 3.70725 8.16512C4.4145 8.76425 5.49553 8.58408 7.6576 8.22373L9 8`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  rt_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M18 15.5V21.5M21 18.5L15 18.5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `circle`,
      {
        cx: `11`,
        cy: `6.5`,
        r: `4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
  ],
  it_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M18.5 7C18.5 9.20914 16.7091 11 14.5 11C12.2909 11 10.5 9.20914 10.5 7C10.5 4.79086 12.2909 3 14.5 3C16.7091 3 18.5 4.79086 18.5 7Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
    [
      `path`,
      {
        d: `M14.5 14C9.8125 14 7 16.5 7 19C7 20.1046 7.83947 21 8.875 21H20.125C21.1605 21 22 20.1046 22 19C22 16.5 19.1875 14 14.5 14Z`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `2`,
      },
    ],
    [
      `path`,
      {
        d: `M4 19.9992H3.5C2.67157 19.9992 2 19.2317 2 18.2849C2 16.673 3.27307 15.0612 5.5 14.3613`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `3`,
      },
    ],
  ],
  at_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `circle`,
      {
        cx: `12`,
        cy: `6.99988`,
        r: `4`,
        stroke: `currentColor`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  ot_component_BUnqa8Km: RecoveredValue = [
    [
      `path`,
      {
        d: `M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `0`,
      },
    ],
    [
      `path`,
      {
        d: `M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        key: `1`,
      },
    ],
  ],
  st_component_BUnqa8Km: RecoveredValue = ne_index_BzMVbDoG(),
  J_component_BUnqa8Km: RecoveredValue = t_react_BkAXpnfr(),
  Y_component_BUnqa8Km: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  ComponentP_component_BUnqa8Km: RecoveredValue = ({
    icon,
    size = 16,
    stroke = 1.9,
    color = `currentColor`,
  }: RecoveredValue): RecoveredValue => (
    <ComponentN_HugeiconsIcon_C2cDExRS
      icon={icon}
      size={size}
      strokeWidth={stroke}
      color={color}
      aria-hidden={!0}
    />
  ),
  ct: RecoveredValue = [
    {
      label: `English`,
      flag: `gb`,
    },
    {
      label: `Deutsch`,
      flag: `de`,
    },
    {
      label: `Français`,
      flag: `fr`,
    },
    {
      label: `Español`,
      flag: `es`,
    },
  ],
  ComponentLt: RecoveredValue = ({ code }: RecoveredValue): RecoveredValue => (
    <svg className={`ui-as-flag`} viewBox={`0 0 20 14`} aria-hidden={`true`}>
      {code === `de` && (
        <Y_component_BUnqa8Km.Fragment>
          <rect width={`20`} height={`4.67`} fill={`#1f1f1f`} />
          <rect y={`4.67`} width={`20`} height={`4.67`} fill={`#dd0000`} />
          <rect y={`9.33`} width={`20`} height={`4.67`} fill={`#ffce00`} />
        </Y_component_BUnqa8Km.Fragment>
      )}
      {code === `fr` && (
        <Y_component_BUnqa8Km.Fragment>
          <rect width={`6.67`} height={`14`} fill={`#002395`} />
          <rect x={`6.67`} width={`6.67`} height={`14`} fill={`#ffffff`} />
          <rect x={`13.33`} width={`6.67`} height={`14`} fill={`#ed2939`} />
        </Y_component_BUnqa8Km.Fragment>
      )}
      {code === `es` && (
        <Y_component_BUnqa8Km.Fragment>
          <rect width={`20`} height={`14`} fill={`#aa151b`} />
          <rect y={`3.5`} width={`20`} height={`7`} fill={`#f1bf00`} />
        </Y_component_BUnqa8Km.Fragment>
      )}
      {code === `gb` && (
        <Y_component_BUnqa8Km.Fragment>
          <rect width={`20`} height={`14`} fill={`#012169`} />
          <path d={`M0 0 20 14M20 0 0 14`} stroke={`#ffffff`} strokeWidth={`2.8`} />
          <path d={`M0 0 20 14M20 0 0 14`} stroke={`#c8102e`} strokeWidth={`1`} />
          <path d={`M10 0v14M0 7h20`} stroke={`#ffffff`} strokeWidth={`4.2`} />
          <path d={`M10 0v14M0 7h20`} stroke={`#c8102e`} strokeWidth={`2.4`} />
        </Y_component_BUnqa8Km.Fragment>
      )}
    </svg>
  ),
  ut: RecoveredValue = [
    {
      label: `New chat`,
      icon: Ee_component_BUnqa8Km,
    },
    {
      label: `Folders`,
      icon: oe_component_BUnqa8Km,
    },
    {
      label: `Integrations`,
      icon: A_component_BUnqa8Km,
    },
  ],
  dt: RecoveredValue = [`Q3 Campaign`, `Brand assets`, `Hiring`, `Research`],
  ft: RecoveredValue = [
    {
      id: `workspace`,
      title: `Set up your workspace`,
      tasks: [
        {
          id: `name`,
          label: `Name your workspace`,
          done: !0,
        },
        {
          id: `invite`,
          label: `Invite your teammates`,
        },
        {
          id: `connect`,
          label: `Connect your first app`,
        },
      ],
    },
    {
      id: `work`,
      title: `Start working`,
      tasks: [
        {
          id: `folder`,
          label: `Create a folder`,
        },
        {
          id: `chat`,
          label: `Start your first chat`,
        },
        {
          id: `upload`,
          label: `Upload a file`,
        },
      ],
    },
    {
      id: `profile`,
      title: `Make it yours`,
      tasks: [
        {
          id: `avatar`,
          label: `Add a profile picture`,
        },
        {
          id: `notify`,
          label: `Choose your notifications`,
        },
      ],
    },
  ],
  pt: RecoveredValue = 900,
  mt: RecoveredValue = 1440,
  Z_component_BUnqa8Km: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue => Math.min(n, Math.max(t, e)),
  ht: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e.trim();
    if (!t) return ``;
    let n: RecoveredValue = Intl.Segmenter;
    if (n) for (let e of new n().segment(t)) return e.segment;
    return (Array.from(t) as RecoveredValue[])[0];
  },
  gt: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Number.isFinite(e) ? (e > 999 ? `999+` : String(Math.max(0, Math.round(e)))) : ``,
  _t: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e >= 100
      ? `All done!`
      : e >= 60
        ? `Almost there!`
        : e > 0
          ? `Great start!`
          : `Let's go!`;
function Component_({
  children,
  active,
  onNavigate,
  workspace = `Acme`,
  workspaceMeta = `Pro · 8 members`,
  user = {
    name: `Alex Morgan`,
  },
  nav = ut,
  projects = dt,
  groups,
  chats,
  onOpenChat,
  setup = ft,
  sidebarWidth,
  workArea,
  panel,
  panelTitle = `Workspace`,
  panelHeading,
  back,
  defaultPanelOpen = !0,
  panelWidth,
  header,
  sideCards = !0,
  className,
  layout,
  rail,
}: RecoveredValue): RecoveredValue {
  let [F, ae]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(2),
    [oe, I]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1),
    le: RecoveredValue = {
      default: 272,
      min: 220,
      max: 380,
      ...sidebarWidth,
    },
    de: RecoveredValue = {
      default: 360,
      min: 280,
      max: 560,
      ...panelWidth,
    },
    [fe, pe]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(le.default),
    [L, R]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(0),
    he: RecoveredValue = Math.max(1, L / mt),
    ge: RecoveredValue = {
      min: de.min,
      default: Math.round(de.default * he),
      max: Math.round(de.max * he),
    },
    [_e, ve]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    ye: RecoveredValue = Math.min(ge.max, Math.max(ge.min, _e ?? ge.default)),
    be: RecoveredValue = (e?: RecoveredValue): RecoveredValue => ve(e),
    [B, xe]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(defaultPanelOpen),
    Ce: RecoveredValue = Xt(workArea) ? workArea : null,
    we: RecoveredValue = Zt(
      Ce
        ? void 0
        : (workArea ?? {
            tabs: [
              {
                id: `panel`,
                title: panelTitle,
                label: panelHeading,
                content: panel,
              },
            ],
          }),
    ),
    H: RecoveredValue = Ce ?? (workArea || panel ? we : null),
    Ee: RecoveredValue = H?.state.tabs.length ?? 0,
    De: RecoveredValue = H?.state.reveal ?? 0,
    [Oe, U]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1),
    je: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    Me: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [W, Ne]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1),
    Pe: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(!1),
    [Le, ze]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1);
  (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = je.current;
    if (!e) return;
    let t: RecoveredValue = (): RecoveredValue => {
      R(e.offsetWidth);
      let t: RecoveredValue = e.offsetWidth <= pt;
      t !== Pe.current &&
        ((Pe.current = t), Ne(t), t || ze(!1), xe(!t && defaultPanelOpen));
    };
    t();
    let n: RecoveredValue = new ResizeObserver(t);
    return (n.observe(e), (): RecoveredValue => n.disconnect());
  }, []);
  let Be: RecoveredValue = oe && !W && !rail,
    Ve: RecoveredValue = W ? !Le : !1,
    [He, Ue]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    K: RecoveredValue = W ? (Le ? `side` : H && B ? `panel` : null) : null,
    We: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null);
  ((0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = je.current,
      t: RecoveredValue = We.current;
    if (((We.current = K), e && t !== K)) {
      if (K) {
        let t: RecoveredValue = e.querySelector(
          K === `side` ? `:scope > .ui-as-side` : `:scope > .ui-as-panel`,
        );
        t &&
          Nt(t)?.focus({
            preventScroll: !0,
          });
      } else if (t) {
        let n: RecoveredValue = e.querySelector(
            t === `side` ? `:scope > .ui-as-side` : `:scope > .ui-as-panel`,
          ),
          r: RecoveredValue = document.activeElement as HTMLElement;
        (!r || r === document.body || n?.contains(r)) &&
          e
            .querySelector(
              t === `side` ? `:scope > .ui-as-side-open` : `:scope > .ui-as-panel-open`,
            )
            ?.focus({
              preventScroll: !0,
            });
      }
    }
  }, [K]),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      De && xe(!0);
    }, [De]));
  let Ke: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(Ee),
    qe: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(!1);
  ((0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = Ke.current;
    ((Ke.current = Ee), !(!H || e === 0 || Ee > 0) && ((qe.current = !0), xe(!1)));
  }, [Ee]),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      !B &&
        qe.current &&
        ((qe.current = !1),
        je.current?.querySelector(`:scope > .ui-as-panel-open`)?.focus({
          preventScroll: !0,
        }));
    }, [B]));
  let Je: RecoveredValue = (): RecoveredValue => {
      (H && H.state.tabs.length === 0 && H.state.reset(), xe(!0));
    },
    q: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (ze(!1), onNavigate?.(e));
    },
    [Ye, Xe]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1),
    Ze: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    Qe: RecoveredValue = (): RecoveredValue => {
      (Xe(!1),
        Ze.current?.focus({
          preventScroll: !0,
        }));
    },
    $e: RecoveredValue = {
      id: `go`,
      label: `Go to`,
      commands: [
        ...(groups
          ? groups.flatMap((e?: RecoveredValue): RecoveredValue => e.items)
          : nav),
        ...(groups
          ? []
          : projects.map(
              (e?: RecoveredValue): RecoveredValue => ({
                label: e,
                icon: ce_component_BUnqa8Km,
              }),
            )),
      ].map(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => ({
          id: `go:${t}:${e.label}`,
          label: e.label,
          icon: <ComponentP_component_BUnqa8Km icon={e.icon} size={16} />,
        }),
      ),
    },
    et: RecoveredValue = c_component_clean_CMpdFqie.map(
      (e?: RecoveredValue): RecoveredValue => (e.id === `go` ? $e : e),
    ),
    [nt, ot]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(`closed`),
    st: RecoveredValue = nt === `open`,
    Z: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = document.activeElement as HTMLElement;
      if (((bt.current = !!t && (t === document.body || !!vt.current?.contains(t))), e))
        return ot(`open`);
      ot((e?: RecoveredValue): RecoveredValue => (e === `open` ? `closing` : e));
    };
  (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    if (nt !== `closing`) return;
    let e: RecoveredValue = window.setTimeout((): RecoveredValue => ot(`closed`), 420);
    return (): RecoveredValue => window.clearTimeout(e);
  }, [nt]);
  let vt: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    bt: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(!1);
  (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = vt.current;
    e &&
      (nt === `open` &&
        bt.current &&
        Nt(e)?.focus({
          preventScroll: !0,
        }),
      nt === `closed` &&
        bt.current &&
        e.querySelector(`.ui-as-steps`)?.focus({
          preventScroll: !0,
        }),
      nt !== `closing` && (bt.current = !1));
  }, [nt]);
  let [xt, St]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(0),
    [Ct, wt]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(0);
  ((0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = vt.current;
    e && (St(e.offsetHeight), nt === `closed` && wt(e.offsetHeight));
  }, [nt]),
    (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = vt.current;
      if (!e) return;
      let t: RecoveredValue = (): RecoveredValue => St(e.offsetHeight);
      t();
      let n: RecoveredValue = new ResizeObserver(t);
      return (n.observe(e), (): RecoveredValue => n.disconnect());
    }, []),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      if (!st) return;
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        e.key === `Escape` && Z(!1);
      return (
        document.addEventListener(`keydown`, e),
        (): RecoveredValue => document.removeEventListener(`keydown`, e)
      );
    }, [st]),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      if (!Le || nt !== `closed`) return;
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        e.key === `Escape` && ze(!1);
      return (
        document.addEventListener(`keydown`, e),
        (): RecoveredValue => document.removeEventListener(`keydown`, e)
      );
    }, [Le, nt]),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      if (!W || !B) return;
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        e.key === `Escape` && xe(!1);
      return (
        document.addEventListener(`keydown`, e),
        (): RecoveredValue => document.removeEventListener(`keydown`, e)
      );
    }, [W, B]));
  let [Tt, Et]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(
      (): RecoveredValue =>
        setup.flatMap(
          (e?: RecoveredValue): RecoveredValue =>
            e.tasks
              .filter((e?: RecoveredValue): RecoveredValue => e.done)
              .map((e?: RecoveredValue): RecoveredValue => e.id),
        ),
    ),
    Dt: RecoveredValue = setup.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + t.tasks.length,
      0,
    ),
    Ot: RecoveredValue = Dt ? Math.round((Tt.length / Dt) * 100) : 0,
    kt: RecoveredValue = workspace.trim() || `Workspace`,
    At: RecoveredValue = user.name.trim(),
    jt: RecoveredValue = At.split(/\s+/).filter(
      (e?: RecoveredValue, t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
        e && !(t > 0 && t === n.length - 1 && /^(jr\.?|sr\.?|i{2,3}|iv|v)$/i.test(e)),
    ),
    Mt: RecoveredValue = jt.length
      ? (ht(jt[0]) + (jt.length > 1 ? ht(jt[jt.length - 1]) : ``)).toUpperCase()
      : ``,
    [Ft, It]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    Rt: RecoveredValue = user.avatar && Ft !== user.avatar,
    zt: RecoveredValue =
      user.email ??
      `${(jt[0] ?? `you`).toLowerCase().replace(/[^a-z0-9]/g, ``) || `you`}@${kt.toLowerCase().replace(/[^a-z0-9]/g, ``) || `example`}.com`,
    [Bt, Vt]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(`English`),
    [Ht, Wt]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(`System`),
    Gt: RecoveredValue = back && (
      <button
        className={`ui-as-side__back`}
        type={`button`}
        aria-label={back.label ?? `Back to app`}
        onClick={(): RecoveredValue => q(back.label ?? `Back to app`)}
      >
        <ComponentP_component_BUnqa8Km icon={p_component_BUnqa8Km} size={15} />
        <span>{back.title}</span>
      </button>
    ),
    Kt: RecoveredValue = [
      {
        label: `Invite people`,
        icon: rt_component_BUnqa8Km,
        onSelect: (): RecoveredValue => q(`Members`),
      },
      {
        label: `Workspace settings`,
        icon: Ie_component_BUnqa8Km,
        divider: !0,
        onSelect: (): RecoveredValue => q(`Members`),
      },
      {
        label: `Analytics`,
        icon: u_component_BUnqa8Km,
        onSelect: (): RecoveredValue => q(`Analytics`),
      },
      {
        label: `Billing`,
        icon: k_component_BUnqa8Km,
        onSelect: (): RecoveredValue => q(`Billing`),
      },
      {
        label: `Usage & limits`,
        icon: l_component_BUnqa8Km,
        onSelect: (): RecoveredValue => q(`Billing`),
      },
      {
        label: `Members`,
        icon: it_component_BUnqa8Km,
        onSelect: (): RecoveredValue => q(`Members`),
      },
      {
        label: `Learn more`,
        icon: z_component_BUnqa8Km,
        divider: !0,
        submenu: [
          {
            label: `Documentation`,
            icon: y_component_BUnqa8Km,
          },
          {
            label: `Changelog`,
            icon: T_component_BUnqa8Km,
          },
          {
            label: `Help & feedback`,
            icon: me_component_BUnqa8Km,
          },
        ],
      },
      {
        label: `Switch workspace`,
        icon: m_component_BUnqa8Km,
        divider: !0,
        submenu: [
          {
            label: kt,
            description: workspaceMeta,
            checked: !0,
          },
          {
            label: `Personal`,
            description: `Free`,
            checked: !1,
          },
          {
            label: `Create workspace`,
            icon: Ae_component_BUnqa8Km,
            divider: !0,
          },
        ],
      },
    ],
    qt: RecoveredValue = Gt || (
      <ComponentD_component_BUnqa8Km
        className={`ui-as-ws-menu`}
        items={Kt}
        trigger={({ open, toggle }: RecoveredValue): RecoveredValue => (
          <button
            className={`ui-as-side__workspace`}
            type={`button`}
            aria-haspopup={`menu`}
            aria-expanded={open}
            onClick={toggle}
          >
            <span className={`ui-as-side__logo`}>{ht(kt).toUpperCase()}</span>
            <span className={`ui-as-side__name`} title={kt}>
              {kt}
            </span>
            <ComponentP_component_BUnqa8Km icon={f_component_BUnqa8Km} size={13} />
          </button>
        )}
      />
    ),
    Jt: RecoveredValue = (
      <ComponentD_component_BUnqa8Km
        side={`top`}
        className={rail ? `ui-as-user-menu ui-as-rail__account` : `ui-as-user-menu`}
        header={
          <span className={`ui-as-account`}>
            {Rt ? (
              <img src={user.avatar} alt={``} width={30} height={30} />
            ) : (
              <span className={`ui-as-user__initials`}>
                {Mt || (
                  <ComponentP_component_BUnqa8Km icon={at_component_BUnqa8Km} size={14} />
                )}
              </span>
            )}
            <span className={`ui-as-account__text`}>
              <b>{At || `Account`}</b>
              <small>{zt}</small>
            </span>
          </span>
        }
        items={[
          {
            label: `Language`,
            icon: tt_component_BUnqa8Km,
            submenu: ct.map(
              ({ label, flag }: RecoveredValue): RecoveredValue => ({
                label: label,
                logo: <ComponentLt code={flag} />,
                checked: label === Bt,
                onSelect: (): RecoveredValue => Vt(label),
              }),
            ),
          },
          {
            label: `Appearance`,
            icon: Te_component_BUnqa8Km,
            submenu: [
              [`System`, D_component_BUnqa8Km],
              [`Light`, Ge_component_BUnqa8Km],
              [`Dark`, V_component_BUnqa8Km],
            ].map(
              ([e, t]: RecoveredValue): RecoveredValue => ({
                label: e,
                icon: t,
                checked: e === Ht,
                onSelect: (): RecoveredValue => Wt(e),
              }),
            ),
          },
          {
            label: `Integrations`,
            icon: ke_component_BUnqa8Km,
            onSelect: (): RecoveredValue => q(`Integrations`),
          },
          {
            label: `Settings`,
            icon: Ie_component_BUnqa8Km,
            onSelect: (): RecoveredValue => q(`Profile`),
          },
          {
            label: `Download apps`,
            icon: M_component_BUnqa8Km,
            divider: !0,
          },
          {
            label: `Changelog`,
            icon: T_component_BUnqa8Km,
            divider: !0,
          },
          {
            label: `Learn more`,
            icon: z_component_BUnqa8Km,
            submenu: [
              {
                label: `Documentation`,
                icon: y_component_BUnqa8Km,
              },
              {
                label: `Help & feedback`,
                icon: me_component_BUnqa8Km,
              },
            ],
          },
          {
            label: `Log out`,
            icon: Se_component_BUnqa8Km,
            divider: !0,
          },
        ]}
        trigger={({ open, toggle }: RecoveredValue): RecoveredValue => (
          <button
            type={`button`}
            className={`ui-as-user`}
            aria-haspopup={`menu`}
            aria-expanded={open}
            aria-label={rail ? At || `Account` : void 0}
            title={Be || rail ? At || `Account` : void 0}
            onClick={toggle}
          >
            {Rt ? (
              <img
                src={user.avatar}
                alt={``}
                width={21}
                height={21}
                onError={(): RecoveredValue => It(user.avatar ?? null)}
              />
            ) : (
              <span className={`ui-as-user__initials`}>
                {Mt || (
                  <ComponentP_component_BUnqa8Km icon={at_component_BUnqa8Km} size={12} />
                )}
              </span>
            )}
            <span className={`ui-as-user__name`} title={At || void 0}>
              {At || `Account`}
            </span>
            <ComponentP_component_BUnqa8Km icon={f_component_BUnqa8Km} size={13} />
          </button>
        )}
      />
    ),
    Yt: RecoveredValue = [
      {
        label: `All projects`,
        icon: ue_component_BUnqa8Km,
        checked: !He,
        onSelect: (): RecoveredValue => Ue(null),
      },
      ...projects.map(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => ({
          label: e,
          icon: ce_component_BUnqa8Km,
          checked: He === e,
          divider: t === 0,
          onSelect: (): RecoveredValue => Ue(e),
        }),
      ),
      {
        label: `New project`,
        icon: se_component_BUnqa8Km,
        divider: !0,
        onSelect: (): RecoveredValue => q(`New project`),
      },
    ],
    $t: RecoveredValue = rail && (
      <header className={`ui-as-side__head`}>
        <ComponentD_component_BUnqa8Km
          className={`ui-as-project-menu`}
          title={`Projects`}
          items={Yt}
          trigger={({ open, toggle }: RecoveredValue): RecoveredValue => (
            <button
              className={`ui-as-side__workspace`}
              type={`button`}
              aria-haspopup={`menu`}
              aria-expanded={open}
              onClick={toggle}
            >
              <span className={`ui-as-side__name`} title={He ?? `All projects`}>
                {He ?? `All projects`}
              </span>
              <ComponentP_component_BUnqa8Km icon={f_component_BUnqa8Km} size={13} />
            </button>
          )}
        />
        <span className={`ui-as-side__tools`}>
          <button
            ref={Ze as RecoveredValue}
            className={`ui-as-icon-btn`}
            type={`button`}
            aria-label={`Search`}
            aria-keyshortcuts={`Meta+K`}
            aria-haspopup={`dialog`}
            aria-expanded={Ye}
            title={`Search ⌘K`}
            onClick={(): RecoveredValue => Xe(!0)}
          >
            <ComponentP_component_BUnqa8Km icon={Fe_component_BUnqa8Km} size={16} />
          </button>
          {W && (
            <button
              className={`ui-as-icon-btn`}
              type={`button`}
              aria-label={`Close sidebar`}
              onClick={(): RecoveredValue => ze(!1)}
            >
              <ComponentP_component_BUnqa8Km icon={G_component_BUnqa8Km} size={16} />
            </button>
          )}
        </span>
      </header>
    ),
    en: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
      <button
        type={`button`}
        className={`ui-as-rail__item`}
        aria-label={e.label}
        title={e.label}
        aria-current={rail?.active === e.label ? `page` : void 0}
        onClick={(): RecoveredValue => q(e.label)}
        key={`${t}-${e.label}`}
      >
        <ComponentP_component_BUnqa8Km icon={e.icon} size={18} />
        {!!e.count && e.count > 0 && (
          <span className={`ui-as-rail__dot`} aria-hidden={`true`} />
        )}
      </button>
    ),
    rn: RecoveredValue = rail && (
      <nav className={`ui-as-rail`} aria-label={`Apps`}>
        <ComponentD_component_BUnqa8Km
          className={`ui-as-rail__ws`}
          items={Kt}
          trigger={({ open, toggle }: RecoveredValue): RecoveredValue => (
            <button
              className={`ui-as-rail__logo`}
              type={`button`}
              aria-haspopup={`menu`}
              aria-expanded={open}
              aria-label={kt}
              title={kt}
              onClick={toggle}
            >
              {ht(kt).toUpperCase()}
            </button>
          )}
        />
        <span className={`ui-as-rail__line`} aria-hidden={`true`} />
        {rail.items.map(en)}
        <span className={`ui-as-rail__spacer`} />
        {rail.bottom?.map(en)}
        {Jt}
      </nav>
    ),
    an: RecoveredValue = (
      <Y_component_BUnqa8Km.Fragment>
        {rail ? (
          $t
        ) : (
          <Y_component_BUnqa8Km.Fragment>
            <header className={`ui-as-side__head`}>
              {qt}
              <span className={`ui-as-side__tools`}>
                <button
                  className={`ui-as-icon-btn`}
                  type={`button`}
                  aria-label={
                    W ? `Close sidebar` : Be ? `Expand sidebar` : `Collapse sidebar`
                  }
                  title={Be ? `Expand sidebar` : void 0}
                  onClick={(): RecoveredValue =>
                    W ? ze(!1) : I((e?: RecoveredValue): RecoveredValue => !e)
                  }
                >
                  <ComponentP_component_BUnqa8Km icon={G_component_BUnqa8Km} size={16} />
                </button>
              </span>
            </header>
            <button
              ref={Ze as RecoveredValue}
              className={`ui-as-side__search`}
              type={`button`}
              title={Be ? `Search ⌘K` : void 0}
              aria-keyshortcuts={`Meta+K`}
              aria-haspopup={`dialog`}
              aria-expanded={Ye}
              onClick={(): RecoveredValue => Xe(!0)}
            >
              <ComponentP_component_BUnqa8Km icon={Fe_component_BUnqa8Km} size={15} />
              <span>{`Search…`}</span>
              <kbd>{`⌘K`}</kbd>
            </button>
          </Y_component_BUnqa8Km.Fragment>
        )}
        <nav className={`ui-as-side__nav`} aria-label={`Main menu`}>
          <div className={`ui-as-side__group`}>
            {nav.map(
              (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
                <button
                  type={`button`}
                  className={`ui-as-side__item`}
                  aria-current={active === e.label ? `page` : void 0}
                  title={Be ? e.label : void 0}
                  onClick={(): RecoveredValue => q(e.label)}
                  key={`${n}-${e.label}`}
                >
                  <ComponentP_component_BUnqa8Km icon={e.icon} size={16} />
                  <span className={`ui-as-side__text`} title={e.label}>
                    {e.label}
                  </span>
                  {!!e.count && e.count > 0 && (
                    <span
                      className={`ui-as-side__count`}
                      title={e.count.toLocaleString()}
                    >
                      {gt(e.count)}
                    </span>
                  )}
                </button>
              ),
            )}
          </div>
          {groups ? (
            groups.map(
              (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
                <div className={`ui-as-side__group`} key={`${n}-${e.label}`}>
                  <span className={`ui-as-side__label`}>{e.label}</span>
                  {e.items.length === 0 && e.empty && (
                    <span className={`ui-as-side__empty`}>{e.empty}</span>
                  )}
                  {e.items.map(
                    (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
                      <button
                        type={`button`}
                        className={`ui-as-side__item`}
                        aria-current={active === e.label ? `page` : void 0}
                        title={Be ? e.label : void 0}
                        onClick={(): RecoveredValue => q(e.label)}
                        key={`${n}-${e.label}`}
                      >
                        <ComponentP_component_BUnqa8Km icon={e.icon} size={16} />
                        <span className={`ui-as-side__text`} title={e.label}>
                          {e.label}
                        </span>
                        {!!e.count && e.count > 0 && (
                          <span
                            className={`ui-as-side__count`}
                            title={e.count.toLocaleString()}
                          >
                            {gt(e.count)}
                          </span>
                        )}
                      </button>
                    ),
                  )}
                </div>
              ),
            )
          ) : chats ? null : (
            <Y_component_BUnqa8Km.Fragment>
              <span className={`ui-as-side__label`}>{`Projects`}</span>
              {projects.length === 0 && (
                <span className={`ui-as-side__empty`}>{`No projects yet`}</span>
              )}
              {projects.map(
                (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
                  <button
                    type={`button`}
                    className={`ui-as-side__item`}
                    aria-current={active === e ? `page` : void 0}
                    title={Be ? e : void 0}
                    onClick={(): RecoveredValue => q(e)}
                    key={`${n}-${e}`}
                  >
                    <ComponentP_component_BUnqa8Km
                      icon={ce_component_BUnqa8Km}
                      size={16}
                    />
                    <span className={`ui-as-side__text`} title={e}>
                      {e}
                    </span>
                  </button>
                ),
              )}
            </Y_component_BUnqa8Km.Fragment>
          )}
          {chats && (
            <Ut
              chats={
                He
                  ? chats.filter((e?: RecoveredValue): RecoveredValue => e.folder === He)
                  : chats
              }
              projects={He ? [He] : projects}
              loose={!He}
              rail={Be}
              active={active}
              side={Me}
              app={je}
              onOpen={(e?: RecoveredValue): RecoveredValue =>
                onOpenChat ? onOpenChat(e) : q(e.title)
              }
              onOpenFolder={q}
              key={He ?? `all`}
            />
          )}
        </nav>
        <div className={`ui-as-side__foot`}>
          {!back && sideCards && F > 0 && (
            <div className={`ui-as-news`} data-count={F}>
              <div
                className={`ui-as-news__card ui-as-news__card--back`}
                aria-hidden={`true`}
              >
                <span className={`ui-as-news__kicker`}>
                  {`New in `}
                  {kt}
                </span>
                <ComponentP_component_BUnqa8Km icon={S_component_BUnqa8Km} size={13} />
              </div>
              <div className={`ui-as-news__card`}>
                <div className={`ui-as-news__top`}>
                  <span className={`ui-as-news__kicker`}>
                    {`New in `}
                    {kt}
                  </span>
                  <button
                    type={`button`}
                    className={`ui-as-news__close`}
                    aria-label={`Dismiss`}
                    onClick={(): RecoveredValue => {
                      (F === 1 &&
                        Pt(je.current?.querySelector(`.ui-as-steps, .ui-as-user`)),
                        ae((e?: RecoveredValue): RecoveredValue => e - 1));
                    }}
                  >
                    <ComponentP_component_BUnqa8Km
                      icon={S_component_BUnqa8Km}
                      size={13}
                    />
                  </button>
                </div>
                <b className={`ui-as-news__title`}>
                  {F > 1 ? `Shared folders` : `Scheduled chats`}
                </b>
                <button type={`button`} className={`ui-as-news__more`}>
                  {`Full changelog`}
                  <ComponentP_component_BUnqa8Km icon={h_component_BUnqa8Km} size={13} />
                </button>
              </div>
            </div>
          )}
          {!back && sideCards && Dt > 0 && (
            <div
              className={`ui-as-guide-slot`}
              style={
                (Ct
                  ? {
                      height: Ct,
                    }
                  : void 0) as RecoveredValue
              }
            >
              <div
                className={`ui-as-guide`}
                data-open={nt !== `closed` || void 0}
                data-state={nt}
                style={
                  {
                    height: (nt === `open` ? xt : Ct) || void 0,
                  } as RecoveredValue
                }
              >
                <div ref={vt as RecoveredValue} className={`ui-as-guide__inner`}>
                  {nt === `closed` ? (
                    <button
                      type={`button`}
                      className={`ui-as-steps ui-as-guide__content`}
                      aria-expanded={!1}
                      onClick={(): RecoveredValue => Z(!0)}
                      key={`summary`}
                    >
                      <span className={`ui-as-steps__title`}>
                        {`Getting started`}
                        <ComponentP_component_BUnqa8Km
                          icon={h_component_BUnqa8Km}
                          size={13}
                        />
                      </span>
                      <span className={`ui-as-steps__sub`}>
                        {Ot}
                        {`% done · `}
                        <span className={`ui-as-steps__cheer`}>{_t(Ot)}</span>
                      </span>
                      <span className={`ui-as-steps__bar`}>
                        <i
                          style={
                            {
                              width: `${Math.max(Ot, 4)}%`,
                            } as RecoveredValue
                          }
                        />
                      </span>
                    </button>
                  ) : (
                    <div
                      className={`ui-as-guide__content`}
                      children={
                        <ComponentS
                          title={`Getting started`}
                          groups={setup.map(
                            (e?: RecoveredValue): RecoveredValue => ({
                              ...e,
                              tasks: e.tasks.map(
                                (e?: RecoveredValue): RecoveredValue => ({
                                  ...e,
                                  done: Tt.includes(e.id),
                                }),
                              ),
                            }),
                          )}
                          onChange={Et}
                          onClose={(): RecoveredValue => Z(!1)}
                        />
                      }
                      key={`guide`}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {!rail && Jt}
        </div>
      </Y_component_BUnqa8Km.Fragment>
    );
  return (
    <Qt.Provider value={H}>
      <div
        ref={je as RecoveredValue}
        className={[`ui-as`, `ui-as-app`, className].filter(Boolean).join(` `)}
        style={
          {
            "--side-w": `${fe}px`,
            "--panel-w": `${ye}px`,
          } as RecoveredValue
        }
        data-collapsed={Be || void 0}
        data-rail={rail ? `` : void 0}
        data-drawer={(W && Le) || void 0}
        data-panel={H ? (B ? `open` : `closed`) : void 0}
        data-resizing={Oe || void 0}
        data-header={header ? `` : void 0}
        data-layout={layout}
        onKeyDown={(e?: RecoveredValue): RecoveredValue => {
          (e.metaKey || e.ctrlKey) &&
            e.key.toLowerCase() === `k` &&
            !Ye &&
            (e.preventDefault(), e.stopPropagation(), Xe(!0));
        }}
      >
        {Ye && (
          <div
            className={`ui-as-cmd`}
            role={`dialog`}
            aria-modal={`true`}
            aria-label={`Search`}
            onPointerDown={(e?: RecoveredValue): RecoveredValue =>
              e.target === e.currentTarget && Qe()
            }
          >
            <ComponentA
              groups={et}
              autoFocus={!0}
              onClose={Qe}
              onRun={(e?: RecoveredValue): RecoveredValue => {
                (Qe(), e.startsWith(`go:`) && q(e.split(`:`).slice(2).join(`:`)));
              }}
            />
          </div>
        )}
        <button
          className={`ui-as-icon-btn ui-as-side-open`}
          type={`button`}
          aria-label={`Open sidebar`}
          tabIndex={Ve ? 0 : -1}
          inert={!!K}
          onClick={(): RecoveredValue => (W ? ze(!0) : I(!1))}
        >
          <ComponentP_component_BUnqa8Km icon={G_component_BUnqa8Km} size={16} />
        </button>
        {H && (
          <button
            className={`ui-as-icon-btn ui-as-panel-open`}
            type={`button`}
            aria-label={`Open ${panelTitle.toLowerCase()}`}
            tabIndex={B ? -1 : 0}
            inert={!!K}
            onClick={Je}
          >
            <ComponentP_component_BUnqa8Km icon={Re_component_BUnqa8Km} size={16} />
          </button>
        )}
        <div
          className={`ui-as-scrim`}
          aria-hidden={`true`}
          onClick={(): RecoveredValue => {
            (ze(!1), W && xe(!1));
          }}
        />
        {header && (
          <Y_component_BUnqa8Km.Fragment>
            <div className={`ui-as-bar ui-as-bar--side`} inert={Ve}>
              {qt}
              <button
                className={`ui-as-icon-btn`}
                type={`button`}
                aria-label={Be ? `Expand sidebar` : `Collapse sidebar`}
                title={Be ? `Expand sidebar` : void 0}
                onClick={(): RecoveredValue =>
                  I((e?: RecoveredValue): RecoveredValue => !e)
                }
              >
                <ComponentP_component_BUnqa8Km icon={G_component_BUnqa8Km} size={16} />
              </button>
            </div>
            <div className={`ui-as-bar ui-as-bar--main`} inert={!!K}>
              <div className={`ui-as-bar__title`}>{header.title}</div>
              {header.actions && (
                <div className={`ui-as-bar__actions`}>{header.actions}</div>
              )}
            </div>
          </Y_component_BUnqa8Km.Fragment>
        )}
        <aside
          ref={Me as RecoveredValue}
          className={`ui-as-side`}
          inert={Ve || K === `panel`}
        >
          {rail ? (
            <Y_component_BUnqa8Km.Fragment>
              {rn}
              <div className={`ui-as-side__col`}>{an}</div>
            </Y_component_BUnqa8Km.Fragment>
          ) : (
            an
          )}
        </aside>
        {!Ve && !W && !Be && (
          <ComponentYt
            edge={`left`}
            label={`Resize sidebar`}
            value={fe}
            {...le}
            onChange={pe}
            onDrag={U}
            root={je}
          />
        )}
        <main className={`ui-as-main`} inert={!!K}>
          {children}
        </main>
        {H && B && !W && (
          <ComponentYt
            edge={`right`}
            label={`Resize ${panelTitle.toLowerCase()}`}
            value={ye}
            {...ge}
            onChange={be}
            onDrag={U}
            root={je}
          />
        )}
        {H && (
          <aside
            className={`ui-as-panel`}
            aria-label={panelTitle}
            data-ws={``}
            inert={!B || K === `side`}
          >
            <header className={`ui-as-panel__head`}>
              <ComponentTn ws={H} label={panelTitle} />
              <button
                className={`ui-as-icon-btn`}
                type={`button`}
                aria-label={`Close ${panelTitle.toLowerCase()}`}
                onClick={(): RecoveredValue => xe(!1)}
              >
                <ComponentP_component_BUnqa8Km icon={Re_component_BUnqa8Km} size={16} />
              </button>
            </header>
            <div className={`ui-as-panel__body`}>
              <ComponentNn ws={H} />
            </div>
          </aside>
        )}
      </div>
    </Qt.Provider>
  );
}
function ComponentYt({
  edge,
  label,
  value,
  default: r,
  min,
  max,
  onChange,
  onDrag,
  root,
}: RecoveredValue): RecoveredValue {
  let l: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [u, d]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1),
    f: RecoveredValue = edge === `left` ? 1 : -1,
    p: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.button !== 0) return;
      let t: RecoveredValue = root.current,
        r: RecoveredValue =
          t && t.offsetWidth ? t.getBoundingClientRect().width / t.offsetWidth : 1;
      ((l.current = {
        x: e.clientX,
        width: value,
        scale: r || 1,
      }),
        e.currentTarget.setPointerCapture(e.pointerId),
        e.preventDefault(),
        d(!0),
        onDrag(!0));
    },
    m: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = l.current;
      t &&
        onChange(
          Z_component_BUnqa8Km(
            Math.round(t.width + ((e.clientX - t.x) / t.scale) * f),
            min,
            max,
          ),
        );
    },
    h: RecoveredValue = (): RecoveredValue => {
      l.current && ((l.current = null), d(!1), onDrag(!1));
    };
  return (
    <div
      className={`ui-as-resizer`}
      data-edge={edge}
      role={`separator`}
      aria-orientation={`vertical`}
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
      data-dragging={u || void 0}
      onPointerDown={p}
      onPointerMove={m}
      onPointerUp={h}
      onPointerCancel={h}
      onLostPointerCapture={h}
      onDoubleClick={(): RecoveredValue => onChange(r)}
      onKeyDown={(e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = e.shiftKey ? 48 : 16;
        ((e.key === `ArrowLeft` || e.key === `ArrowRight`) &&
          (e.preventDefault(),
          onChange(
            Z_component_BUnqa8Km(value + (e.key === `ArrowRight` ? t : -t) * f, min, max),
          )),
          e.key === `Home` && onChange(min),
          e.key === `End` && onChange(max));
      }}
    />
  );
}
function bt_component_BUnqa8Km(
  e?: RecoveredValue,
  t?: RecoveredValue,
  n?: RecoveredValue,
): RecoveredValue {
  let [r, i]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(t);
  return [e ?? r, (e?: RecoveredValue): RecoveredValue => (i(e), n?.(e))];
}
function xt_component_BUnqa8Km(
  e?: RecoveredValue,
  t?: RecoveredValue,
  n?: RecoveredValue,
  r?: RecoveredValue,
): RecoveredValue {
  let i: RecoveredValue = (
      {
        ArrowRight: 1,
        ArrowDown: 1,
        ArrowLeft: -1,
        ArrowUp: -1,
      } as Record<string, RecoveredValue>
    )[e.key],
    a: RecoveredValue = t.indexOf(n),
    o: RecoveredValue = i
      ? t[(a + i + t.length) % t.length]
      : e.key === `Home`
        ? t[0]
        : e.key === `End`
          ? t[t.length - 1]
          : void 0;
  o !== void 0 &&
    (e.preventDefault(),
    r(o),
    [...e.currentTarget.querySelectorAll(`[role="tab"], [role="radio"]`)][
      t.indexOf(o)
    ]?.focus());
}
function St_component_BUnqa8Km({
  items,
  value,
  defaultValue,
  onChange,
  controls,
}: RecoveredValue): RecoveredValue {
  let [a, o]: RecoveredValue = bt_component_BUnqa8Km(
      value,
      defaultValue ?? items[0],
      onChange,
    ),
    s: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [c, l]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null);
  return (
    (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = s.current?.querySelector(`[aria-selected="true"]`);
      e &&
        l({
          x: e.offsetLeft,
          w: e.offsetWidth,
        });
    }, [a, items.join(`|`)]),
    (
      <div
        ref={s as RecoveredValue}
        className={`ui-as-tabs`}
        role={`tablist`}
        onKeyDown={(t?: RecoveredValue): RecoveredValue =>
          xt_component_BUnqa8Km(t, items, a, o)
        }
      >
        {c && (
          <span
            className={`ui-as-tabs__pill`}
            style={
              {
                transform: `translateX(${c.x}px)`,
                width: c.w,
              } as RecoveredValue
            }
            aria-hidden={`true`}
          />
        )}
        {items.map(
          (t?: RecoveredValue): RecoveredValue => (
            <button
              type={`button`}
              role={`tab`}
              aria-selected={a === t}
              aria-controls={controls?.(t)}
              tabIndex={a === t || !items.includes(a) ? 0 : -1}
              className={`ui-as-tabs__tab`}
              onClick={(): RecoveredValue => o(t)}
              children={t}
              key={t}
            />
          ),
        )}
      </div>
    )
  );
}
function Ct_component_BUnqa8Km({ children, onClick }: RecoveredValue): RecoveredValue {
  return (
    <button
      type={`button`}
      className={`ui-as-bar__pick`}
      title={typeof children == `string` ? children : void 0}
      onClick={onClick}
    >
      <span>{children}</span>
      <ComponentP_component_BUnqa8Km icon={f_component_BUnqa8Km} size={13} />
    </button>
  );
}
function wt_component_BUnqa8Km({ value, onChange }: RecoveredValue): RecoveredValue {
  let [n, r]: RecoveredValue = bt_component_BUnqa8Km(value, `asc`, onChange);
  return (
    <button
      type={`button`}
      className={`ui-as-tool ui-as-sort`}
      data-dir={n}
      aria-label={
        n === `asc` ? `Sorted A to Z – sort Z to A` : `Sorted Z to A – sort A to Z`
      }
      title={n === `asc` ? `A–Z` : `Z–A`}
      onClick={(): RecoveredValue => r(n === `asc` ? `desc` : `asc`)}
    >
      <ComponentP_component_BUnqa8Km icon={__component_BUnqa8Km} size={15} />
    </button>
  );
}
function Tt_component_BUnqa8Km({ value, onChange }: RecoveredValue): RecoveredValue {
  let [n, r]: RecoveredValue = bt_component_BUnqa8Km(value, `grid`, onChange);
  return (
    <div
      className={`ui-as-view`}
      role={`radiogroup`}
      aria-label={`View`}
      data-view={n}
      onKeyDown={(e?: RecoveredValue): RecoveredValue =>
        xt_component_BUnqa8Km(e, [`grid`, `list`], n, r)
      }
    >
      <span className={`ui-as-view__pill`} aria-hidden={`true`} />
      {[
        [`grid`, ue_component_BUnqa8Km, `Grid`],
        [`list`, ye_component_BUnqa8Km, `List`],
      ].map(
        ([e, t, i]: RecoveredValue): RecoveredValue => (
          <button
            type={`button`}
            role={`radio`}
            aria-checked={n === e}
            tabIndex={n === e ? 0 : -1}
            aria-label={i}
            className={`ui-as-view__btn`}
            onClick={(): RecoveredValue => r(e)}
            children={<ComponentP_component_BUnqa8Km icon={t} size={15} />}
            key={e}
          />
        ),
      )}
    </div>
  );
}
function Et_component_BUnqa8Km({
  placeholder,
  width = 175,
  value,
  onChange,
}: RecoveredValue): RecoveredValue {
  let [i, a]: RecoveredValue = bt_component_BUnqa8Km(value, ``, onChange);
  return (
    <span
      className={`ui-as-search`}
      style={
        {
          width: width,
        } as RecoveredValue
      }
    >
      <ComponentC_component_clean_CnZCLpPh
        type={`search`}
        size={`sm`}
        prefix={<ComponentP_component_BUnqa8Km icon={Fe_component_BUnqa8Km} size={15} />}
        placeholder={placeholder}
        aria-label={placeholder}
        value={i}
        onChange={(e?: RecoveredValue): RecoveredValue => a(e.target.value)}
        clearable={!0}
        onClear={(): RecoveredValue => a(``)}
      />
    </span>
  );
}
function Dt_component_BUnqa8Km(e?: RecoveredValue): RecoveredValue {
  for (let t: RecoveredValue = e.parentElement; t; t = t.parentElement) {
    let e: RecoveredValue = getComputedStyle(t);
    if (
      /(auto|scroll|hidden|clip)/.test(e.overflow + e.overflowY + e.overflowX) ||
      t.classList.contains(`ui-as`)
    )
      return t.getBoundingClientRect();
  }
  return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
}
function Ot_component_BUnqa8Km({
  open,
  onClose,
  children,
  align = `start`,
  side = `bottom`,
  className,
}: RecoveredValue): RecoveredValue {
  let o: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [s, c]: RecoveredValue = (0, J_component_BUnqa8Km.useState)({
      side: side,
      align: align,
    });
  return (
    (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
      let t: RecoveredValue = o.current;
      if (!open || !t) return;
      let n: RecoveredValue = {
        side: side,
        align: align,
      };
      ((t.dataset.side = side), (t.dataset.align = align));
      let a: RecoveredValue = Dt_component_BUnqa8Km(t),
        s: RecoveredValue = t.getBoundingClientRect();
      (side === `bottom` &&
        s.bottom > a.bottom - 6 &&
        (n = {
          ...n,
          side: `top`,
        }),
        side === `top` &&
          s.top < a.top + 6 &&
          (n = {
            ...n,
            side: `bottom`,
          }),
        align === `start` &&
          s.right > a.right - 6 &&
          (n = {
            ...n,
            align: `end`,
          }),
        align === `end` &&
          s.left < a.left + 6 &&
          (n = {
            ...n,
            align: `start`,
          }),
        (t.dataset.side = n.side),
        (t.dataset.align = n.align),
        (t.style.translate = ``));
      let l: RecoveredValue = t.getBoundingClientRect(),
        u: RecoveredValue = l.width / t.offsetWidth || 1,
        d: RecoveredValue = 0;
      (l.right > a.right - 6 && (d = a.right - 6 - l.right),
        l.left + d < a.left + 6 && (d = a.left + 6 - l.left),
        d && (t.style.translate = `${d / u}px 0`),
        c(n));
    }, [open, side, align]),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      let t: RecoveredValue = o.current;
      if (!open || !t) return;
      At_component_BUnqa8Km(t.querySelector(`[role="menu"]`));
      let n: RecoveredValue = t.parentElement,
        r: RecoveredValue = t.contains(document.activeElement as HTMLElement),
        i: RecoveredValue = (): RecoveredValue => (r = !0),
        a: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
          (r = !!e.relatedTarget && t.contains(e.relatedTarget));
      return (
        t.addEventListener(`focusin`, i),
        t.addEventListener(`focusout`, a),
        (): RecoveredValue => {
          (t.removeEventListener(`focusin`, i),
            t.removeEventListener(`focusout`, a),
            r && Pt(Ft_component_BUnqa8Km(n)));
        }
      );
    }, [open]),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      if (!open) return;
      let n: RecoveredValue = o.current?.parentElement,
        r: RecoveredValue = (): RecoveredValue => Ft_component_BUnqa8Km(n ?? null),
        i: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          n && !n.contains(e.target) && onClose();
        },
        a: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          if (e.key !== `Escape`) return;
          (e.preventDefault(), e.stopPropagation());
          let i: RecoveredValue = n?.contains(document.activeElement as HTMLElement);
          (onClose(),
            i &&
              r()?.focus({
                preventScroll: !0,
              }));
        },
        s: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let r: RecoveredValue = e.relatedTarget;
          r && n && !n.contains(r) && onClose();
        };
      return (
        document.addEventListener(`pointerdown`, i),
        window.addEventListener(`keydown`, a, !0),
        n?.addEventListener(`focusout`, s),
        (): RecoveredValue => {
          (document.removeEventListener(`pointerdown`, i),
            window.removeEventListener(`keydown`, a, !0),
            n?.removeEventListener(`focusout`, s));
        }
      );
    }, [open, onClose]),
    open ? (
      <div
        ref={o as RecoveredValue}
        className={[`ui-as-popover`, className].filter(Boolean).join(` `)}
        data-align={s.align}
        data-side={s.side}
        role={`dialog`}
      >
        {children}
      </div>
    ) : null
  );
}
var kt_component_BUnqa8Km: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  e
    ? [
        ...e.querySelectorAll(
          `:scope > [role^="menuitem"], :scope > .ui-as-menu__sub > [role^="menuitem"]`,
        ),
      ]
    : [];
function At_component_BUnqa8Km(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = kt_component_BUnqa8Km(e);
  (
    t.find(
      (e?: RecoveredValue): RecoveredValue => e.getAttribute(`aria-checked`) === `true`,
    ) ?? t[0]
  )?.focus({
    preventScroll: !0,
  });
}
function jt_component_BUnqa8Km(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = e.currentTarget,
    n: RecoveredValue = kt_component_BUnqa8Km(t),
    r: RecoveredValue = n.indexOf(document.activeElement as HTMLElement),
    i: RecoveredValue = (document.activeElement as HTMLElement)?.closest(
      `.ui-as-menu__sub`,
    ),
    a: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
      (e.preventDefault(), e.stopPropagation(), n[(t + n.length) % n.length]?.focus());
    };
  e.key === `ArrowDown`
    ? a(r + 1)
    : e.key === `ArrowUp`
      ? a(r < 0 ? -1 : r - 1)
      : e.key === `Home`
        ? a(0)
        : e.key === `End`
          ? a(-1)
          : r >= 0 &&
              i?.parentElement === t &&
              [`ArrowRight`, `Enter`, ` `].includes(e.key)
            ? (e.preventDefault(),
              e.stopPropagation(),
              At_component_BUnqa8Km(i.querySelector(`[role="menu"]`)))
            : e.key === `ArrowLeft` &&
              t.parentElement?.classList.contains(`ui-as-menu__subpanel`) &&
              (e.preventDefault(),
              e.stopPropagation(),
              t
                .closest(`.ui-as-menu__sub`)
                ?.querySelector(`:scope > [role^="menuitem"]`)
                ?.focus());
}
function Mt_component_BUnqa8Km({ items, onPick }: RecoveredValue): RecoveredValue {
  return (
    <div role={`menu`} className={`ui-as-menu__list`} onKeyDown={jt_component_BUnqa8Km}>
      {items.length === 0 && (
        <span className={`ui-as-menu__empty`}>{`Nothing here yet`}</span>
      )}
      {items.map((e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
        let r: RecoveredValue = (
          <Y_component_BUnqa8Km.Fragment>
            {e.logo ? (
              <span className={`ui-as-menu__logo`} aria-hidden={`true`}>
                {e.logo}
              </span>
            ) : (
              e.icon && <ComponentP_component_BUnqa8Km icon={e.icon} size={15} />
            )}
            <span className={`ui-as-menu__label`} title={e.label}>
              <span className={`ui-as-menu__text`}>{e.label}</span>
              {e.description && <small>{e.description}</small>}
            </span>
            {e.shortcut && <kbd className={`ui-as-menu__kbd`}>{e.shortcut}</kbd>}
            {e.submenu && (
              <ComponentP_component_BUnqa8Km icon={h_component_BUnqa8Km} size={14} />
            )}
            {e.checked && (
              <ComponentP_component_BUnqa8Km icon={et_component_BUnqa8Km} size={14} />
            )}
          </Y_component_BUnqa8Km.Fragment>
        );
        return (
          <J_component_BUnqa8Km.Fragment key={`${n}-${e.label}`}>
            {e.divider && <span className={`ui-as-menu__sep`} role={`separator`} />}
            {e.submenu ? (
              <span className={`ui-as-menu__sub`}>
                <button
                  type={`button`}
                  role={`menuitem`}
                  aria-haspopup={`menu`}
                  tabIndex={-1}
                  className={`ui-as-menu__item`}
                  onClick={(e?: RecoveredValue): RecoveredValue => {
                    let t: RecoveredValue = e.currentTarget.parentElement;
                    (t?.parentElement
                      ?.querySelectorAll(`:scope > .ui-as-menu__sub[data-open]`)
                      .forEach(
                        (e?: RecoveredValue): RecoveredValue =>
                          e !== t && e.removeAttribute(`data-open`),
                      ),
                      t?.toggleAttribute(`data-open`));
                  }}
                >
                  {r}
                </button>
                <span className={`ui-as-menu ui-as-menu__subpanel`}>
                  <Mt_component_BUnqa8Km items={e.submenu} onPick={onPick} />
                </span>
              </span>
            ) : (
              <button
                type={`button`}
                role={e.checked === void 0 ? `menuitem` : `menuitemradio`}
                aria-checked={e.checked}
                tabIndex={-1}
                className={`ui-as-menu__item`}
                data-danger={e.danger || void 0}
                data-rich={e.description ? !0 : void 0}
                onClick={(): RecoveredValue => {
                  (e.onSelect?.(), onPick());
                }}
              >
                {r}
              </button>
            )}
          </J_component_BUnqa8Km.Fragment>
        );
      })}
    </div>
  );
}
var Nt: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    [...e.querySelectorAll(`button, [href], input, select, textarea, [tabindex]`)].find(
      (e?: RecoveredValue): RecoveredValue =>
        e.tabIndex >= 0 &&
        !e.disabled &&
        e.getClientRects().length > 0 &&
        getComputedStyle(e).visibility !== `hidden`,
    ),
  Pt: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    window.setTimeout((): RecoveredValue => {
      let t: RecoveredValue = document.activeElement as HTMLElement;
      e?.isConnected &&
        (!t || t === document.body) &&
        e.focus({
          preventScroll: !0,
        });
    }),
  Ft_component_BUnqa8Km: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e?.querySelector(`:scope > :is(button, [href], [tabindex])`) ??
    e?.querySelector(`button`) ??
    null,
  It_component_BUnqa8Km: RecoveredValue =
    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    (n?: RecoveredValue): RecoveredValue => {
      e ||
        (n.key !== `ArrowDown` && n.key !== `ArrowUp`) ||
        n.target.closest(`.ui-as-popover`) ||
        (n.preventDefault(), t(!0));
    };
function ComponentD_component_BUnqa8Km({
  trigger,
  items,
  align = `start`,
  side = `bottom`,
  title,
  header,
  className,
}: RecoveredValue): RecoveredValue {
  let [s, c]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1),
    l: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null);
  return (
    <span
      ref={l as RecoveredValue}
      className={[`ui-as-anchor`, className].filter(Boolean).join(` `)}
      onKeyDown={It_component_BUnqa8Km(s, c)}
    >
      {trigger({
        open: s,
        toggle: (): RecoveredValue => c((e?: RecoveredValue): RecoveredValue => !e),
      })}
      <Ot_component_BUnqa8Km
        open={s}
        onClose={(): RecoveredValue => c(!1)}
        align={align}
        side={side}
        className={`ui-as-menu`}
      >
        {header}
        {title && <span className={`ui-as-menu__title`}>{title}</span>}
        <Mt_component_BUnqa8Km
          items={items}
          onPick={(): RecoveredValue => {
            (c(!1), Pt(Ft_component_BUnqa8Km(l.current)));
          }}
        />
      </Ot_component_BUnqa8Km>
    </span>
  );
}
function Rt_component_BUnqa8Km({
  label,
  groups,
  value,
  onChange,
  align = `end`,
}: RecoveredValue): RecoveredValue {
  let [a, s]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1),
    c: RecoveredValue = Object.values(value).reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + t.length,
      0,
    );
  return (
    <span className={`ui-as-anchor`}>
      <button
        type={`button`}
        className={`ui-as-tool ui-as-tool--label`}
        aria-expanded={a}
        data-active={c > 0 || void 0}
        onClick={(): RecoveredValue => s((e?: RecoveredValue): RecoveredValue => !e)}
      >
        <ComponentP_component_BUnqa8Km icon={ae_component_BUnqa8Km} size={15} />
        {label}
        {c > 0 ? (
          <span className={`ui-as-tool__count`}>{c}</span>
        ) : (
          <ComponentP_component_BUnqa8Km icon={f_component_BUnqa8Km} size={13} />
        )}
      </button>
      <Ot_component_BUnqa8Km
        open={a}
        onClose={(): RecoveredValue => s(!1)}
        align={align}
        className={`ui-as-popover--filter`}
      >
        <ComponentO_component_clean_CuHV807w
          groups={groups}
          value={value}
          onChange={onChange}
          defaultOpen={groups.map((e?: RecoveredValue): RecoveredValue => e.id)}
          hints={!1}
          title={label}
        />
      </Ot_component_BUnqa8Km>
    </span>
  );
}
function zt_component_BUnqa8Km({
  value,
  options,
  onChange,
  icon,
  align = `end`,
  className,
}: RecoveredValue): RecoveredValue {
  let [o, s]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1),
    c: RecoveredValue = options.find(
      (t?: RecoveredValue): RecoveredValue => t.value === value,
    ),
    l: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null);
  return (
    <span
      ref={l as RecoveredValue}
      className={`ui-as-anchor`}
      onKeyDown={It_component_BUnqa8Km(o, s)}
    >
      <button
        type={`button`}
        className={[`ui-as-tool ui-as-tool--label`, className].filter(Boolean).join(` `)}
        aria-expanded={o}
        aria-haspopup={`menu`}
        onClick={(): RecoveredValue => s((e?: RecoveredValue): RecoveredValue => !e)}
      >
        {icon && <ComponentP_component_BUnqa8Km icon={icon} size={15} />}
        {c?.label}
        <ComponentP_component_BUnqa8Km icon={f_component_BUnqa8Km} size={13} />
      </button>
      <Ot_component_BUnqa8Km
        open={o}
        onClose={(): RecoveredValue => s(!1)}
        align={align}
        className={`ui-as-menu`}
      >
        <Mt_component_BUnqa8Km
          items={options.map(
            (t?: RecoveredValue): RecoveredValue => ({
              label: t.label,
              checked: t.value === value,
              onSelect: (): RecoveredValue => onChange(t.value),
            }),
          )}
          onPick={(): RecoveredValue => {
            (s(!1), Pt(Ft_component_BUnqa8Km(l.current)));
          }}
        />
      </Ot_component_BUnqa8Km>
    </span>
  );
}
function Bt_component_BUnqa8Km(): RecoveredValue {
  let [e, t]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null);
  return (
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      if (!e) return;
      let n: RecoveredValue = window.setTimeout((): RecoveredValue => t(null), 2200);
      return (): RecoveredValue => window.clearTimeout(n);
    }, [e]),
    [
      e ? (
        <div className={`ui-as-toast`} role={`status`} key={e.id}>
          <ComponentP_component_BUnqa8Km icon={et_component_BUnqa8Km} size={14} />
          <span className={`ui-as-toast__text`}>{e.text}</span>
        </div>
      ) : null,
      (e?: RecoveredValue): RecoveredValue =>
        t({
          id: Date.now(),
          text: e,
        }),
    ]
  );
}
function Vt_component_BUnqa8Km({
  title,
  count,
  left,
  right,
}: RecoveredValue): RecoveredValue {
  return (
    <div className={`ui-as-section-head`} data-inline={!left || void 0}>
      <h2 className={`ui-as-section-head__title`}>
        {title}
        {count != null && <span className={`ui-as-section-head__count`}>{count}</span>}
      </h2>
      {(left || right) && (
        <div className={`ui-as-toolbar`}>
          <div className={`ui-as-toolbar__left`}>{left}</div>
          <div className={`ui-as-toolbar__right`}>{right}</div>
        </div>
      )}
    </div>
  );
}
function ComponentC_component_BUnqa8Km({
  title,
  text,
  action,
  tall,
  bare,
}: RecoveredValue): RecoveredValue {
  return (
    <div className={`ui-as-empty`} data-tall={tall || void 0} data-bare={bare || void 0}>
      <span className={`ui-as-empty__icon`}>
        <ComponentP_component_BUnqa8Km icon={P_component_BUnqa8Km} size={18} />
      </span>
      <b className={`ui-as-empty__title`}>{title}</b>
      <p className={`ui-as-empty__text`}>{text}</p>
      {action}
    </div>
  );
}
function Ut({
  chats,
  projects,
  rail,
  active,
  side,
  app,
  onOpen,
  onOpenFolder,
  loose = !0,
}: RecoveredValue): RecoveredValue {
  let [l, u]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(chats),
    [f, p]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    [m, g]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    [_, v]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    y: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      v(
        e === null
          ? null
          : {
              kind: `chat`,
              id: e,
            },
      ),
    [x, C]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    [w, T]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(
      (): RecoveredValue =>
        projects.map(
          (e?: RecoveredValue): RecoveredValue => ({
            name: e,
            pinned: !1,
          }),
        ),
    ),
    [ee, E]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(
      (): RecoveredValue => new Set(projects.slice(0, 1)),
    ),
    [D, O]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    [k, ne]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    A: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      E((n?: RecoveredValue): RecoveredValue => {
        let r: RecoveredValue = new Set(n);
        return ((t ?? !r.has(e)) ? r.add(e) : r.delete(e), r);
      }),
    re: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [j, M]: RecoveredValue = Bt_component_BUnqa8Km(),
    ie: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      u(
        (n?: RecoveredValue): RecoveredValue =>
          n.map(
            (n?: RecoveredValue): RecoveredValue =>
              n.id === e
                ? {
                    ...n,
                    ...t,
                  }
                : n,
          ),
      ),
    N: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      u((t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = t.filter(
            (t?: RecoveredValue): RecoveredValue => t.id !== e.id,
          ),
          r: RecoveredValue = {
            ...e,
            pinned: !e.pinned,
          },
          i: RecoveredValue = r.pinned
            ? n.filter((e?: RecoveredValue): RecoveredValue => e.pinned).length
            : n.findIndex((e?: RecoveredValue): RecoveredValue => !e.pinned);
        return (n.splice(i < 0 ? n.length : i, 0, r), n);
      });
    },
    F: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (u(
        (t?: RecoveredValue): RecoveredValue =>
          t.filter((t?: RecoveredValue): RecoveredValue => t.id !== e.id),
      ),
        M(`“${e.title}” archived`));
    },
    ae: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      (navigator.clipboard?.writeText(e).catch((): RecoveredValue => {}), M(t));
    },
    se: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      if (_?.kind !== `chat` || _.id === e) return;
      let n: RecoveredValue = _.id;
      u((r?: RecoveredValue): RecoveredValue => {
        let i: RecoveredValue = r.find(
            (e?: RecoveredValue): RecoveredValue => e.id === n,
          ),
          a: RecoveredValue = r.find((t?: RecoveredValue): RecoveredValue => t.id === e);
        if (!i || !a) return r;
        let o: RecoveredValue = r.filter(
            (e?: RecoveredValue): RecoveredValue => e.id !== n,
          ),
          s: RecoveredValue =
            o.findIndex((t?: RecoveredValue): RecoveredValue => t.id === e) + +!!t;
        return (
          o.splice(s, 0, {
            ...i,
            pinned: a.pinned,
            folder: a.pinned ? i.folder : a.folder,
          }),
          o
        );
      });
    },
    I: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (_?.kind !== `chat`) return;
      let t: RecoveredValue = _.id;
      (u((n?: RecoveredValue): RecoveredValue => {
        let r: RecoveredValue = n.find(
          (e?: RecoveredValue): RecoveredValue => e.id === t,
        );
        return r
          ? [
              ...n.filter((e?: RecoveredValue): RecoveredValue => e.id !== t),
              {
                ...r,
                folder: e,
                pinned: !1,
              },
            ]
          : n;
      }),
        A(e, !0));
    },
    le: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
    ): RecoveredValue => {
      e !== t &&
        T((r?: RecoveredValue): RecoveredValue => {
          let i: RecoveredValue = r.find(
              (t?: RecoveredValue): RecoveredValue => t.name === e,
            ),
            a: RecoveredValue = r.find(
              (e?: RecoveredValue): RecoveredValue => e.name === t,
            );
          if (!i || !a) return r;
          let o: RecoveredValue = r.filter(
            (t?: RecoveredValue): RecoveredValue => t.name !== e,
          );
          return (
            o.splice(
              o.findIndex((e?: RecoveredValue): RecoveredValue => e.name === t) + +!!n,
              0,
              {
                ...i,
                pinned: a.pinned,
              },
            ),
            o
          );
        });
    },
    ue: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      T((t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = t.find(
          (t?: RecoveredValue): RecoveredValue => t.name === e,
        );
        if (!n) return t;
        let r: RecoveredValue = t.filter(
            (t?: RecoveredValue): RecoveredValue => t.name !== e,
          ),
          i: RecoveredValue = {
            ...n,
            pinned: !n.pinned,
          },
          a: RecoveredValue = i.pinned
            ? r.filter((e?: RecoveredValue): RecoveredValue => e.pinned).length
            : r.findIndex((e?: RecoveredValue): RecoveredValue => !e.pinned);
        return (r.splice(a < 0 ? r.length : a, 0, i), r);
      }),
    de: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = t.trim();
      (ne(null),
        n &&
          n !== e &&
          !w.some((e?: RecoveredValue): RecoveredValue => e.name === n) &&
          (T(
            (t?: RecoveredValue): RecoveredValue =>
              t.map(
                (t?: RecoveredValue): RecoveredValue =>
                  t.name === e
                    ? {
                        ...t,
                        name: n,
                      }
                    : t,
              ),
          ),
          u(
            (t?: RecoveredValue): RecoveredValue =>
              t.map(
                (t?: RecoveredValue): RecoveredValue =>
                  t.folder === e
                    ? {
                        ...t,
                        folder: n,
                      }
                    : t,
              ),
          ),
          E(
            (t?: RecoveredValue): RecoveredValue =>
              new Set(
                [...t].map((t?: RecoveredValue): RecoveredValue => (t === e ? n : t)),
              ),
          )));
    },
    fe: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = l.filter(
        (t?: RecoveredValue): RecoveredValue => t.folder === e,
      );
      return [
        {
          label: t ? `Unpin` : `Pin`,
          icon: t ? Oe_component_BUnqa8Km : U_component_BUnqa8Km,
          onSelect: (): RecoveredValue => ue(e),
        },
        {
          label: `Rename`,
          icon: Ee_component_BUnqa8Km,
          onSelect: (): RecoveredValue => ne(e),
        },
        {
          label: `Section`,
          icon: xe_component_BUnqa8Km,
          divider: !0,
          submenu: [
            {
              label: `Pinned`,
              icon: U_component_BUnqa8Km,
              checked: t,
              onSelect: (): RecoveredValue => !t && ue(e),
            },
            {
              label: `Projects`,
              icon: oe_component_BUnqa8Km,
              checked: !t,
              onSelect: (): RecoveredValue => t && ue(e),
            },
          ],
        },
        {
          label: `Open project page`,
          icon: ce_component_BUnqa8Km,
          onSelect: (): RecoveredValue => onOpenFolder(e),
        },
        {
          label: `Archive chats`,
          icon: d_component_BUnqa8Km,
          divider: !0,
          onSelect: (): RecoveredValue => {
            (u(
              (t?: RecoveredValue): RecoveredValue =>
                t.filter((t?: RecoveredValue): RecoveredValue => t.folder !== e),
            ),
              M(
                n.length
                  ? `${n.length} ${n.length === 1 ? `chat` : `chats`} archived`
                  : `No chats to archive`,
              ));
          },
        },
        {
          label: `Remove project`,
          icon: S_component_BUnqa8Km,
          divider: !0,
          onSelect: (): RecoveredValue => {
            (T(
              (t?: RecoveredValue): RecoveredValue =>
                t.filter((t?: RecoveredValue): RecoveredValue => t.name !== e),
            ),
              u(
                (t?: RecoveredValue): RecoveredValue =>
                  t.map(
                    (t?: RecoveredValue): RecoveredValue =>
                      t.folder === e
                        ? {
                            ...t,
                            folder: void 0,
                          }
                        : t,
                  ),
              ),
              M(`“${e}” removed`));
          },
        },
      ];
    },
    pe: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
    ): RecoveredValue => {
      let r: RecoveredValue = e.currentTarget,
        i: RecoveredValue = r.querySelector(`.ui-as-side__item`) ?? r,
        a: RecoveredValue = getComputedStyle(i),
        o: RecoveredValue = getComputedStyle(r),
        s: RecoveredValue = i.cloneNode(!0);
      (s.querySelector(`.ui-as-chat-folder__arrow`)?.remove(),
        Object.assign(s.style, {
          position: `fixed`,
          top: `-1000px`,
          left: `0`,
          width: `${i.offsetWidth}px`,
          height: `${i.offsetHeight}px`,
          display: `flex`,
          alignItems: `center`,
          gap: a.gap,
          padding: a.padding,
          boxSizing: `border-box`,
          borderRadius: `8px`,
          background: o.getPropertyValue(`--card`).trim() || `#ffffff`,
          border: `0`,
          outline: `0`,
          boxShadow: `none`,
          font: a.font,
          color: a.color,
          whiteSpace: `nowrap`,
          overflow: `hidden`,
          pointerEvents: `none`,
        }),
        s
          .querySelectorAll(`svg`)
          .forEach((e?: RecoveredValue): RecoveredValue => (e.style.flex = `none`)),
        document.body.appendChild(s));
      let c: RecoveredValue = r.getBoundingClientRect();
      (e.dataTransfer.setDragImage(
        s,
        Math.min(e.clientX - c.left, i.offsetWidth),
        e.clientY - c.top,
      ),
        (e.dataTransfer.effectAllowed = `move`),
        e.dataTransfer.setData(`text/plain`, t),
        g(null),
        window.setTimeout((): RecoveredValue => {
          (s.remove(), n());
        }));
    },
    L: RecoveredValue = (): RecoveredValue => {
      (v(null), C(null), O(null));
    },
    me: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = side.current?.getBoundingClientRect();
      if (!n || !side.current) return;
      let r: RecoveredValue = t.getBoundingClientRect(),
        a: RecoveredValue = n.width / side.current.offsetWidth || 1;
      g(
        (t?: RecoveredValue): RecoveredValue =>
          t?.id === e
            ? null
            : {
                id: e,
                left: (r.left - n.left) / a,
                below: (r.bottom - n.top) / a + 4,
                above: (r.top - n.top) / a - 4,
              },
      );
    };
  (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = re.current;
    if (!m || !e || !side.current) return;
    let t: RecoveredValue = side.current.offsetHeight - 8;
    ((e.style.top = `${m.below + e.offsetHeight > t ? Math.max(8, m.above - e.offsetHeight) : m.below}px`),
      (e.style.left = `${Math.max(8, Math.min(m.left, side.current.offsetWidth - e.offsetWidth - 8))}px`));
  }, [m, side]);
  let R: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      side.current?.querySelector(`[data-chat-menu="${CSS.escape(e)}"]`),
    z: RecoveredValue = m?.id;
  ((0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    z && At_component_BUnqa8Km(re.current?.querySelector(`[role="menu"]`) ?? null);
  }, [z]),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      if (!m) return;
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = e.target;
          !re.current?.contains(t) &&
            !t.closest?.(`[data-chat-menu="${CSS.escape(m.id)}"]`) &&
            g(null);
        },
        t: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          e.key === `Escape` &&
            (e.preventDefault(),
            e.stopPropagation(),
            re.current?.contains(document.activeElement as HTMLElement) &&
              R(m.id)?.focus({
                preventScroll: !0,
              }),
            g(null));
        },
        n: RecoveredValue = (): RecoveredValue => g(null),
        r: RecoveredValue = side.current?.querySelector(`.ui-as-side__nav`);
      return (
        document.addEventListener(`pointerdown`, e),
        window.addEventListener(`keydown`, t, !0),
        r?.addEventListener(`scroll`, n),
        (): RecoveredValue => {
          (document.removeEventListener(`pointerdown`, e),
            window.removeEventListener(`keydown`, t, !0),
            r?.removeEventListener(`scroll`, n));
        }
      );
    }, [m, side]));
  let he: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
      {
        label: `Rename`,
        icon: Ee_component_BUnqa8Km,
        shortcut: `⌥⌘R`,
        onSelect: (): RecoveredValue => p(e.id),
      },
      {
        label: e.pinned ? `Unpin` : `Pin`,
        icon: e.pinned ? Oe_component_BUnqa8Km : U_component_BUnqa8Km,
        shortcut: `⌥⌘P`,
        onSelect: (): RecoveredValue => N(e),
      },
      {
        label: e.unread ? `Mark as read` : `Mark as unread`,
        icon: ot_component_BUnqa8Km,
        shortcut: `⇧⌘U`,
        onSelect: (): RecoveredValue =>
          ie(e.id, {
            unread: !e.unread,
          }),
      },
      {
        label: `Project`,
        icon: oe_component_BUnqa8Km,
        submenu: [
          ...w.map(
            ({ name }: RecoveredValue): RecoveredValue => ({
              label: name,
              icon: ce_component_BUnqa8Km,
              checked: e.folder === name,
              onSelect: (): RecoveredValue => {
                (ie(e.id, {
                  folder: name,
                }),
                  e.pinned || A(name, !0));
              },
            }),
          ),
          {
            label: `No project`,
            divider: !0,
            checked: !e.folder,
            onSelect: (): RecoveredValue =>
              ie(e.id, {
                folder: void 0,
              }),
          },
        ],
      },
      {
        label: `Section`,
        icon: xe_component_BUnqa8Km,
        submenu: [
          {
            label: `Pinned`,
            icon: U_component_BUnqa8Km,
            checked: !!e.pinned,
            onSelect: (): RecoveredValue => !e.pinned && N(e),
          },
          {
            label: `Chats`,
            icon: b_component_BUnqa8Km,
            checked: !e.pinned,
            onSelect: (): RecoveredValue => e.pinned && N(e),
          },
        ],
      },
      {
        label: `Share`,
        icon: Le_component_BUnqa8Km,
        divider: !0,
        onSelect: (): RecoveredValue =>
          ae(`${location.origin}/chat/${e.id}`, `Share link copied`),
      },
      {
        label: `Copy`,
        icon: te_component_BUnqa8Km,
        submenu: [
          {
            label: `Copy link`,
            icon: B_component_BUnqa8Km,
            onSelect: (): RecoveredValue =>
              ae(`${location.origin}/chat/${e.id}`, `Link copied`),
          },
          {
            label: `Copy as Markdown`,
            icon: P_component_BUnqa8Km,
            onSelect: (): RecoveredValue => ae(`# ${e.title}`, `Chat copied as Markdown`),
          },
          {
            label: `Copy chat ID`,
            icon: te_component_BUnqa8Km,
            onSelect: (): RecoveredValue => ae(e.id, `Chat ID copied`),
          },
        ],
      },
      {
        label: `Open in new window`,
        icon: We_component_BUnqa8Km,
        divider: !0,
        onSelect: (): RecoveredValue => M(`Opening in a new window`),
      },
      {
        label: `Archive`,
        icon: d_component_BUnqa8Km,
        shortcut: `⇧⌘A`,
        divider: !0,
        onSelect: (): RecoveredValue => F(e),
      },
    ],
    ge: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        if (!t.metaKey || f) return;
        let n: RecoveredValue = t.altKey
          ? (
              {
                KeyR: (): RecoveredValue => p(e.id),
                KeyP: (): RecoveredValue => N(e),
              } as Record<string, RecoveredValue>
            )[t.code]
          : t.shiftKey
            ? (
                {
                  KeyU: (): RecoveredValue =>
                    ie(e.id, {
                      unread: !e.unread,
                    }),
                  KeyA: (): RecoveredValue => F(e),
                } as Record<string, RecoveredValue>
              )[t.code]
            : void 0;
        n && (t.preventDefault(), n());
      },
    _e: RecoveredValue = w.map((e?: RecoveredValue): RecoveredValue => e.name),
    ve: RecoveredValue = (e?: RecoveredValue, t: RecoveredValue = !1): RecoveredValue => (
      <div
        className={`ui-as-chat-row`}
        data-indent={t || void 0}
        draggable={f !== e.id}
        data-dragging={_?.id === e.id || void 0}
        data-drop={
          x?.id === e.id && _?.kind === `chat` && _.id !== e.id
            ? x.after
              ? `after`
              : `before`
            : void 0
        }
        data-menu={m?.id === e.id || void 0}
        data-pinned={e.pinned || void 0}
        onKeyDown={ge(e)}
        onDragStart={(t?: RecoveredValue): RecoveredValue =>
          pe(t, e.title, (): RecoveredValue => y(e.id))
        }
        onDragOver={(t?: RecoveredValue): RecoveredValue => {
          if (_?.kind !== `chat`) return;
          t.preventDefault();
          let n: RecoveredValue = t.currentTarget.getBoundingClientRect(),
            r: RecoveredValue = t.clientY > n.top + n.height / 2;
          (x?.id !== e.id || x.after !== r) &&
            C({
              id: e.id,
              after: r,
            });
        }}
        onDrop={(e?: RecoveredValue): RecoveredValue => {
          (e.preventDefault(), x && se(x.id, x.after), L());
        }}
        onDragEnd={L}
        key={e.id}
      >
        {f === e.id ? (
          <input
            className={`ui-as-chat-row__rename`}
            defaultValue={e.title}
            aria-label={`Chat name`}
            autoFocus={!0}
            onFocus={(e?: RecoveredValue): RecoveredValue => e.currentTarget.select()}
            onBlur={(t?: RecoveredValue): RecoveredValue => {
              let n: RecoveredValue = t.currentTarget.value.trim();
              (n &&
                ie(e.id, {
                  title: n,
                }),
                p(null));
            }}
            onKeyDown={(t?: RecoveredValue): RecoveredValue => {
              (t.key === `Enter` && t.currentTarget.blur(),
                t.key === `Escape` &&
                  ((t.currentTarget.value = e.title), t.currentTarget.blur()));
            }}
          />
        ) : (
          <button
            type={`button`}
            className={`ui-as-side__item ui-as-chat-row__link`}
            aria-current={active === e.title ? `page` : void 0}
            onClick={(): RecoveredValue => {
              (e.unread &&
                ie(e.id, {
                  unread: !1,
                }),
                onOpen(e));
            }}
          >
            <span className={`ui-as-side__text`} title={e.title} dir={`auto`}>
              {e.title}
            </span>
            {e.unread && <span className={`ui-as-chat-row__dot`} aria-label={`Unread`} />}
          </button>
        )}
        <span className={`ui-as-chat-row__tools`}>
          <button
            type={`button`}
            className={`ui-as-chat-row__tool`}
            aria-label={`Options for ${e.title}`}
            aria-haspopup={`menu`}
            aria-expanded={m?.id === e.id}
            data-chat-menu={e.id}
            onClick={(t?: RecoveredValue): RecoveredValue => me(e.id, t.currentTarget)}
          >
            <ComponentP_component_BUnqa8Km icon={Ce_component_BUnqa8Km} size={15} />
          </button>
          <button
            type={`button`}
            className={`ui-as-chat-row__tool ui-as-chat-row__pin`}
            aria-label={e.pinned ? `Unpin ${e.title}` : `Pin ${e.title}`}
            aria-pressed={!!e.pinned}
            tabIndex={-1}
            onClick={(): RecoveredValue => N(e)}
          >
            <ComponentP_component_BUnqa8Km
              icon={e.pinned ? Oe_component_BUnqa8Km : U_component_BUnqa8Km}
              size={14}
            />
          </button>
        </span>
      </div>
    ),
    ye: RecoveredValue = ({ name, pinned }: RecoveredValue): RecoveredValue => {
      let r: RecoveredValue = l.filter(
          (t?: RecoveredValue): RecoveredValue => !t.pinned && t.folder === name,
        ),
        i: RecoveredValue = ee.has(name),
        a: RecoveredValue =
          x?.id === `folder:${name}` && _?.kind === `folder` && _.id !== name;
      return (
        <J_component_BUnqa8Km.Fragment key={name}>
          <div
            className={`ui-as-chat-folder-row`}
            draggable={k !== name}
            data-menu={m?.id === `folder:${name}` || void 0}
            data-dragging={(_?.kind === `folder` && _.id === name) || void 0}
            data-drop={a ? (x.after ? `after` : `before`) : void 0}
            onDragStart={(t?: RecoveredValue): RecoveredValue =>
              pe(
                t,
                name,
                (): RecoveredValue =>
                  v({
                    kind: `folder`,
                    id: name,
                  }),
              )
            }
            onDragOver={(t?: RecoveredValue): RecoveredValue => {
              if (!_) return;
              if ((t.preventDefault(), _.kind === `chat`)) {
                (O(name), C(null));
                return;
              }
              let n: RecoveredValue = t.currentTarget.getBoundingClientRect(),
                r: RecoveredValue = t.clientY > n.top + n.height / 2;
              (x?.id !== `folder:${name}` || x.after !== r) &&
                C({
                  id: `folder:${name}`,
                  after: r,
                });
            }}
            onDragLeave={(): RecoveredValue =>
              O((t?: RecoveredValue): RecoveredValue => (t === name ? null : t))
            }
            onDrop={(t?: RecoveredValue): RecoveredValue => {
              (t.preventDefault(),
                _?.kind === `chat`
                  ? I(name)
                  : _?.kind === `folder` && x && le(_.id, name, x.after),
                L());
            }}
            onDragEnd={L}
          >
            {k === name ? (
              <input
                className={`ui-as-chat-row__rename ui-as-chat-folder__rename`}
                defaultValue={name}
                aria-label={`Project name`}
                autoFocus={!0}
                onFocus={(e?: RecoveredValue): RecoveredValue => e.currentTarget.select()}
                onBlur={(t?: RecoveredValue): RecoveredValue =>
                  de(name, t.currentTarget.value)
                }
                onKeyDown={(t?: RecoveredValue): RecoveredValue => {
                  (t.key === `Enter` && t.currentTarget.blur(),
                    t.key === `Escape` &&
                      ((t.currentTarget.value = name), t.currentTarget.blur()));
                }}
              />
            ) : (
              <button
                type={`button`}
                className={`ui-as-side__item ui-as-chat-folder`}
                aria-expanded={i}
                title={rail ? name : void 0}
                data-drop={D === name || void 0}
                onClick={(): RecoveredValue => A(name)}
              >
                <ComponentP_component_BUnqa8Km
                  icon={i ? ce_component_BUnqa8Km : oe_component_BUnqa8Km}
                  size={16}
                />
                <span className={`ui-as-side__text`} title={name}>
                  {name}
                </span>
                <span className={`ui-as-chat-folder__arrow`} aria-hidden={`true`}>
                  <ComponentP_component_BUnqa8Km icon={h_component_BUnqa8Km} size={13} />
                </span>
              </button>
            )}
            <span className={`ui-as-chat-row__tools`}>
              <button
                type={`button`}
                className={`ui-as-chat-row__tool`}
                aria-label={`Options for ${name}`}
                aria-haspopup={`menu`}
                aria-expanded={m?.id === `folder:${name}`}
                data-chat-menu={`folder:${name}`}
                onClick={(t?: RecoveredValue): RecoveredValue =>
                  me(`folder:${name}`, t.currentTarget)
                }
              >
                <ComponentP_component_BUnqa8Km icon={Ce_component_BUnqa8Km} size={15} />
              </button>
              <button
                type={`button`}
                className={`ui-as-chat-row__tool ui-as-chat-row__pin`}
                aria-label={pinned ? `Unpin ${name}` : `Pin ${name}`}
                aria-pressed={pinned}
                tabIndex={-1}
                onClick={(): RecoveredValue => ue(name)}
              >
                <ComponentP_component_BUnqa8Km
                  icon={pinned ? Oe_component_BUnqa8Km : U_component_BUnqa8Km}
                  size={14}
                />
              </button>
            </span>
          </div>
          {i && (
            <div className={`ui-as-chat-folder__chats`}>
              {r.length === 0 ? (
                <span
                  className={`ui-as-side__empty ui-as-chat-folder__empty`}
                >{`No chats yet`}</span>
              ) : (
                r.map((e?: RecoveredValue): RecoveredValue => ve(e, !0))
              )}
            </div>
          )}
        </J_component_BUnqa8Km.Fragment>
      );
    },
    be: RecoveredValue = l.filter((e?: RecoveredValue): RecoveredValue => e.pinned),
    Se: RecoveredValue = w.filter((e?: RecoveredValue): RecoveredValue => e.pinned),
    V: RecoveredValue = w.filter((e?: RecoveredValue): RecoveredValue => !e.pinned),
    we: RecoveredValue = l.filter(
      (e?: RecoveredValue): RecoveredValue =>
        !e.pinned && !(e.folder && _e.includes(e.folder)),
    ),
    Te: RecoveredValue =
      m && l.find((e?: RecoveredValue): RecoveredValue => e.id === m.id),
    H: RecoveredValue = m?.id.startsWith(`folder:`)
      ? w.find((e?: RecoveredValue): RecoveredValue => `folder:${e.name}` === m.id)
      : void 0;
  return (
    <Y_component_BUnqa8Km.Fragment>
      {(Se.length > 0 || be.length > 0) && (
        <div
          className={`ui-as-side__group ui-as-chat-pinned`}
          role={`group`}
          aria-label={`Pinned`}
        >
          <span className={`ui-as-side__label`}>{`Pinned`}</span>
          {Se.map(ye)}
          {be.map((e?: RecoveredValue): RecoveredValue => ve(e))}
        </div>
      )}
      <div
        className={`ui-as-side__group ui-as-chat-folders`}
        role={`group`}
        aria-label={`Projects`}
      >
        <span className={`ui-as-side__label`}>{`Projects`}</span>
        {V.length === 0 && (
          <span className={`ui-as-side__empty`}>{`No projects yet`}</span>
        )}
        {V.map(ye)}
      </div>
      {loose && (
        <div
          className={`ui-as-side__group ui-as-chats`}
          role={`group`}
          aria-label={`Chats`}
        >
          <span className={`ui-as-side__label`}>{`Chats`}</span>
          {we.length === 0 && (
            <span className={`ui-as-side__empty`}>{`No chats yet`}</span>
          )}
          {we.map((e?: RecoveredValue): RecoveredValue => ve(e))}
        </div>
      )}
      {m &&
        (Te || H) &&
        side.current &&
        (0, st_component_BUnqa8Km.createPortal)(
          <div
            ref={re as RecoveredValue}
            className={`ui-as-menu ui-as-chat-menu`}
            style={
              {
                left: m.left,
              } as RecoveredValue
            }
            role={`dialog`}
            aria-label={`Options for ${Te ? Te.title : H?.name}`}
            onKeyDown={(e?: RecoveredValue): RecoveredValue => {
              e.key === `Tab` &&
                (R(m.id)?.focus({
                  preventScroll: !0,
                }),
                g(null));
            }}
          >
            <Mt_component_BUnqa8Km
              items={Te ? he(Te) : H ? fe(H.name, H.pinned) : []}
              onPick={(): RecoveredValue => {
                let e: RecoveredValue = R(m.id);
                (g(null), Pt(e));
              }}
            />
          </div>,
          side.current,
        )}
      {j && app.current && (0, st_component_BUnqa8Km.createPortal)(j, app.current)}
    </Y_component_BUnqa8Km.Fragment>
  );
}
var Wt_component_BUnqa8Km: RecoveredValue = {
    DOC: `blue`,
    PDF: `rose`,
    XLS: `emerald`,
  },
  Gt_component_BUnqa8Km: RecoveredValue = {
    DOC: `Document`,
    PDF: `PDF`,
    XLS: `Spreadsheet`,
  };
function Kt_component_BUnqa8Km({ file, meta, onOpen }: RecoveredValue): RecoveredValue {
  return (
    <button
      type={`button`}
      className={`ui-as-template`}
      title={file.name}
      onClick={onOpen && ((): RecoveredValue => onOpen(file))}
    >
      <span className={`ui-as-template__preview`}>
        <Jt_component_BUnqa8Km
          type={file.type}
          color={Wt_component_BUnqa8Km[file.type]}
        />
      </span>
      <b className={`ui-as-template__name`}>{file.name}</b>
      <span className={`ui-as-meta`}>{meta}</span>
    </button>
  );
}
var qt_component_BUnqa8Km: RecoveredValue = {
  DOC: [[100], [31, 31, 31], [48, 48], [31, 31, 31], [24, 48, 24], [31, 31]],
  PDF: [[100], [48, 48], [31, 62]],
  XLS: [
    [31, 31, 31],
    [31, 31, 31],
    [31, 31, 31],
    [31, 31, 31],
    [31, 31, 31],
  ],
};
function Jt_component_BUnqa8Km({ type, color }: RecoveredValue): RecoveredValue {
  return (
    <span className={`ui-as-doc`} data-color={color} aria-hidden={`true`}>
      <span className={`ui-as-doc__art`}>
        <span className={`ui-as-doc__page`} data-type={type}>
          {type === `PDF` && <span className={`ui-as-doc__image`} />}
          <span className={`ui-as-doc__rows`}>
            {qt_component_BUnqa8Km[type].map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <span
                  className={`ui-as-doc__row`}
                  children={e.map(
                    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                      <i
                        style={
                          {
                            width: `${e}%`,
                          } as RecoveredValue
                        }
                        key={t}
                      />
                    ),
                  )}
                  key={t}
                />
              ),
            )}
          </span>
        </span>
        <span className={`ui-as-doc__type`}>{type}</span>
      </span>
    </span>
  );
}
var Yt_component_BUnqa8Km: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.artifact === void 0 ? e.id : (e.id ?? e.artifact),
  Xt: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    !!e && typeof e == `object` && `state` in e && `open` in e;
function Zt(e: RecoveredValue = {}): RecoveredValue {
  let {
      tabs: t = [],
      defaultTabs: n,
      initialTabs: r,
      artifacts: i = {},
      onOpenArtifact: a,
      onArtifactChange: o,
      newTab: s = {},
    }: RecoveredValue = e,
    c: RecoveredValue = (0, J_component_BUnqa8Km.useId)().replace(/:/g, ``),
    l: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(0),
    u: RecoveredValue = (e: RecoveredValue = !1): RecoveredValue =>
      (
        (e ? r : void 0) ??
        n ??
        (t.length ? t.map(Yt_component_BUnqa8Km) : [`new`])
      ).flatMap((e?: RecoveredValue): RecoveredValue => {
        if (e === `new`)
          return s === !1
            ? []
            : [
                {
                  key: `n:${++l.current}`,
                },
              ];
        let n: RecoveredValue = t.find(
          (t?: RecoveredValue): RecoveredValue => Yt_component_BUnqa8Km(t) === e,
        );
        return n
          ? n.artifact === void 0
            ? [
                {
                  key: `p:${n.id}`,
                  page: n.id,
                },
              ]
            : [
                {
                  key: `a:${n.artifact}`,
                  artifact: n.artifact,
                  from: n.from,
                },
              ]
          : [];
      }),
    [d, f]: RecoveredValue = (0, J_component_BUnqa8Km.useState)((): RecoveredValue => {
      let e: RecoveredValue = u(!0);
      return {
        tabs: e,
        active: e[0]?.key ?? null,
      };
    }),
    [p, m]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(0),
    [h, g]: RecoveredValue = (0, J_component_BUnqa8Km.useState)({}),
    [_, v]: RecoveredValue = (0, J_component_BUnqa8Km.useState)({}),
    [y, b]: RecoveredValue = (0, J_component_BUnqa8Km.useState)({}),
    x: RecoveredValue = (e?: RecoveredValue): RecoveredValue => h[e] ?? y[e] ?? i[e],
    S: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      a?.(e, t);
      let n: RecoveredValue = `a:${e}`;
      (f((r?: RecoveredValue): RecoveredValue => {
        let i: RecoveredValue = r.tabs.length ? r.tabs : u();
        return {
          tabs: i.some((e?: RecoveredValue): RecoveredValue => e.key === n)
            ? i
            : [
                ...i,
                {
                  key: n,
                  artifact: e,
                  from: t,
                },
              ],
          active: n,
        };
      }),
        m((e?: RecoveredValue): RecoveredValue => e + 1));
    },
    C: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = `p:${e}`;
      (f(
        (n?: RecoveredValue): RecoveredValue => ({
          tabs: n.tabs.some((e?: RecoveredValue): RecoveredValue => e.key === t)
            ? n.tabs
            : [
                ...n.tabs,
                {
                  key: t,
                  page: e,
                },
              ],
          active: t,
        }),
      ),
        m((e?: RecoveredValue): RecoveredValue => e + 1));
    },
    w: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = `n:${++l.current}`;
      return (
        f(
          (t?: RecoveredValue): RecoveredValue => ({
            tabs: [
              ...t.tabs,
              {
                key: e,
              },
            ],
            active: e,
          }),
        ),
        m((e?: RecoveredValue): RecoveredValue => e + 1),
        e
      );
    };
  return {
    open: S,
    show: C,
    openNew: (): RecoveredValue => void w(),
    artifact: x,
    state: {
      uid: c,
      tabs: d.tabs,
      active: d.tabs.some((e?: RecoveredValue): RecoveredValue => e.key === d.active)
        ? d.active
        : (d.tabs[0]?.key ?? null),
      reveal: p,
      page: (e?: RecoveredValue): RecoveredValue =>
        t.find(
          (t?: RecoveredValue): RecoveredValue => t.artifact === void 0 && t.id === e,
        ),
      newTab: s,
      select: (e?: RecoveredValue): RecoveredValue =>
        f(
          (t?: RecoveredValue): RecoveredValue => ({
            ...t,
            active: e,
          }),
        ),
      close: (e?: RecoveredValue): RecoveredValue =>
        f((t?: RecoveredValue): RecoveredValue => {
          let n: RecoveredValue = t.tabs.findIndex(
            (t?: RecoveredValue): RecoveredValue => t.key === e,
          );
          if (n < 0) return t;
          let r: RecoveredValue = t.tabs.filter(
            (t?: RecoveredValue): RecoveredValue => t.key !== e,
          );
          return {
            tabs: r,
            active:
              t.active === e ? (r[Math.min(n, r.length - 1)]?.key ?? null) : t.active,
          };
        }),
      reset: (): RecoveredValue =>
        f((): RecoveredValue => {
          let e: RecoveredValue = u();
          return {
            tabs: e,
            active: e[0]?.key ?? null,
          };
        }),
      openNew: w,
      openIn: (
        e?: RecoveredValue,
        t?: RecoveredValue,
        n?: RecoveredValue,
      ): RecoveredValue => {
        a?.(t, n);
        let r: RecoveredValue = `a:${t}`;
        f(
          (i?: RecoveredValue): RecoveredValue =>
            i.tabs.some((e?: RecoveredValue): RecoveredValue => e.key === r)
              ? {
                  tabs: i.tabs.filter(
                    (t?: RecoveredValue): RecoveredValue => t.key !== e,
                  ),
                  active: r,
                }
              : {
                  tabs: i.tabs.map(
                    (i?: RecoveredValue): RecoveredValue =>
                      i.key === e
                        ? {
                            key: r,
                            artifact: t,
                            from: n,
                          }
                        : i,
                  ),
                  active: r,
                },
        );
      },
      edited: (e?: RecoveredValue): RecoveredValue => e in h,
      memo: (e?: RecoveredValue): RecoveredValue => _[e],
      setMemo: (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        v(
          (n?: RecoveredValue): RecoveredValue => ({
            ...n,
            [e]: t,
          }),
        ),
      change: (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
        (g(
          (n?: RecoveredValue): RecoveredValue => ({
            ...n,
            [e]: t,
          }),
        ),
          o?.(e, t));
      },
      seed: (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        b(
          (n?: RecoveredValue): RecoveredValue =>
            n[e] || h[e] || i[e]
              ? n
              : {
                  ...n,
                  [e]: t,
                },
        ),
    },
  };
}
var Qt: RecoveredValue = (0, J_component_BUnqa8Km.createContext)(null),
  $t_component_BUnqa8Km: RecoveredValue = (): RecoveredValue =>
    (0, J_component_BUnqa8Km.useContext)(Qt),
  en_component_BUnqa8Km: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    if (t.artifact !== void 0)
      return {
        title: t.artifact,
        glyph: <ComponentP_component_BUnqa8Km icon={dn(t.artifact)} size={14} />,
      };
    if (t.page !== void 0) {
      let n: RecoveredValue = e.page(t.page);
      return {
        title: n?.title ?? t.page,
        label: n?.label,
        glyph: (
          <ComponentP_component_BUnqa8Km
            icon={n?.icon ?? A_component_BUnqa8Km}
            size={14}
          />
        ),
        count: n?.count,
      };
    }
    return {
      title: `New tab`,
      glyph: <ComponentP_component_BUnqa8Km icon={I_component_BUnqa8Km} size={14} />,
    };
  };
function ComponentTn({ ws, label }: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = ws.state,
    r: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    i: RecoveredValue = n.tabs.map((e?: RecoveredValue): RecoveredValue => e.key),
    a: RecoveredValue = n.active ?? ``,
    o: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      window.setTimeout(
        (): RecoveredValue =>
          r.current?.querySelector(`[data-tab="${CSS.escape(e)}"]`)?.focus({
            preventScroll: !0,
          }),
      ),
    s: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let r: RecoveredValue = i.indexOf(e),
        s: RecoveredValue = i.filter((t?: RecoveredValue): RecoveredValue => t !== e),
        c: RecoveredValue = e === a ? s[Math.min(r, s.length - 1)] : a;
      (n.close(e), t && c && o(c));
    };
  (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = r.current,
      t: RecoveredValue = e?.querySelector(`[data-tab="${CSS.escape(a)}"]`);
    if (!e || !t) return;
    let n: RecoveredValue = (t.closest(`.ui-asw-ptab-wrap`) ?? t).getBoundingClientRect(),
      i: RecoveredValue = e.getBoundingClientRect();
    n.left < i.left
      ? (e.scrollLeft -= i.left - n.left + 8)
      : n.right > i.right - 16 && (e.scrollLeft += n.right - i.right + 24);
  }, [a, i.length]);
  let [c, l]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1);
  return (
    (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = r.current;
      if (!e) return;
      let t: RecoveredValue = (): RecoveredValue =>
        l(e.scrollWidth - e.clientWidth - e.scrollLeft > 1);
      t();
      let n: RecoveredValue = new ResizeObserver(t);
      return (
        n.observe(e),
        e.addEventListener(`scroll`, t, {
          passive: !0,
        }),
        (): RecoveredValue => {
          (n.disconnect(), e.removeEventListener(`scroll`, t));
        }
      );
    }, [i.length]),
    (
      <div className={`ui-asw-bar`}>
        <div
          ref={r as RecoveredValue}
          className={`ui-asw-ptabs`}
          role={`tablist`}
          aria-label={label}
          data-more={c || void 0}
          onKeyDown={(e?: RecoveredValue): RecoveredValue => {
            let t: RecoveredValue =
              (document.activeElement as HTMLElement)?.dataset.tab ?? a;
            if (e.key === `Delete` || e.key === `Backspace`)
              return (e.preventDefault(), s(t, !0));
            xt_component_BUnqa8Km(e, i, t, (e?: RecoveredValue): RecoveredValue => {
              (n.select(e), o(e));
            });
          }}
        >
          {n.tabs.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
            let r: RecoveredValue = en_component_BUnqa8Km(n, e),
              i: RecoveredValue = e.key === a;
            return (
              <span className={`ui-asw-ptab-wrap`} data-on={i || void 0} key={e.key}>
                <button
                  type={`button`}
                  role={`tab`}
                  id={`${n.uid}-tab-${t}`}
                  aria-controls={i ? `${n.uid}-pane-${t}` : void 0}
                  className={`ui-asw-ptab`}
                  data-tab={e.key}
                  aria-selected={i}
                  aria-keyshortcuts={`Delete`}
                  tabIndex={i ? 0 : -1}
                  title={r.title}
                  onClick={(): RecoveredValue => n.select(e.key)}
                >
                  {r.glyph}
                  <span className={`ui-asw-ptab__name`} dir={`auto`}>
                    {r.label ?? r.title}
                  </span>
                  {!!r.count && (
                    <span className={`ui-asw-ptab__count`}>{gt(r.count)}</span>
                  )}
                </button>
                <button
                  type={`button`}
                  className={`ui-asw-ptab__close`}
                  tabIndex={-1}
                  aria-label={`Close ${r.title}`}
                  onClick={(): RecoveredValue => s(e.key, !1)}
                >
                  <ComponentP_component_BUnqa8Km
                    icon={S_component_BUnqa8Km}
                    size={10}
                    stroke={2.2}
                  />
                </button>
              </span>
            );
          })}
        </div>
        {n.newTab !== !1 && (
          <button
            type={`button`}
            className={`ui-asw-ptab-new`}
            aria-label={`New tab`}
            title={`New tab`}
            onClick={(e?: RecoveredValue): RecoveredValue => {
              let t: RecoveredValue = n.openNew();
              e.detail === 0 && o(t);
            }}
          >
            <ComponentP_component_BUnqa8Km icon={Ae_component_BUnqa8Km} size={14} />
          </button>
        )}
      </div>
    )
  );
}
function ComponentNn({ ws }: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = ws.state,
    n: RecoveredValue = t.newTab || {};
  return (
    <Y_component_BUnqa8Km.Fragment>
      {t.tabs.map((r?: RecoveredValue, i?: RecoveredValue): RecoveredValue => {
        let a: RecoveredValue = r.key === t.active;
        return r.page === void 0 && !a ? null : (
          <div
            className={`ui-asw-pane`}
            role={`tabpanel`}
            id={`${t.uid}-pane-${i}`}
            aria-labelledby={`${t.uid}-tab-${i}`}
            hidden={!a}
            children={
              r.page === void 0 ? (
                r.artifact === void 0 ? (
                  <Pr
                    tools={n.tools}
                    sources={n.sources}
                    onOpen={(e?: RecoveredValue): RecoveredValue => {
                      let i: RecoveredValue = (n.sources ?? jr).find(
                        (t?: RecoveredValue): RecoveredValue => t.id === e,
                      );
                      (i?.artifact && t.openIn(r.key, i.artifact, i.source),
                        n.onOpen?.(e));
                    }}
                  />
                ) : (
                  <ComponentRn
                    file={{
                      name: r.artifact,
                      from: r.from,
                    }}
                    artifact={ws.artifact(r.artifact)}
                    edited={t.edited(r.artifact)}
                    lookup={ws.artifact}
                    memo={t.memo(r.artifact)}
                    onMemo={(e?: RecoveredValue): RecoveredValue =>
                      t.setMemo(r.artifact, e)
                    }
                    onChange={(e?: RecoveredValue): RecoveredValue =>
                      t.change(r.artifact, e)
                    }
                    onSeed={t.seed}
                    onOpen={(t?: RecoveredValue): RecoveredValue => ws.open(t, r.from)}
                    key={r.artifact}
                  />
                )
              ) : (
                t.page(r.page)?.content
              )
            }
            key={r.key}
          />
        );
      })}
    </Y_component_BUnqa8Km.Fragment>
  );
}
function ComponentRn({
  file,
  artifact,
  edited,
  lookup,
  memo,
  onMemo,
  onChange,
  onOpen,
  onSeed,
}: RecoveredValue): RecoveredValue {
  let l: RecoveredValue = artifact ?? {},
    u: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    d: RecoveredValue = mn(u),
    f: RecoveredValue = [file.from, l.updated].filter(Boolean);
  return (
    <div ref={u as RecoveredValue} className={`ui-asw-art`}>
      <header className={`ui-asw-art__head`}>
        <span className={`ui-asw-art__glyph`} aria-hidden={`true`}>
          {fn(file.name)}
        </span>
        <span className={`ui-asw-art__title`}>
          <b dir={`auto`} title={file.name}>
            {file.name}
          </b>
          {f.length > 0 && (
            <span>
              {f.map(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <J_component_BUnqa8Km.Fragment key={t}>
                    {t > 0 && <i aria-hidden={`true`}>{` · `}</i>}
                    {e}
                  </J_component_BUnqa8Km.Fragment>
                ),
              )}
            </span>
          )}
        </span>
      </header>
      {l.preview ??
        (l.doc ? (
          <Fn
            name={file.name}
            doc={l.doc}
            edited={edited}
            width={d}
            onChange={(e?: RecoveredValue): RecoveredValue =>
              onChange({
                ...l,
                doc: {
                  ...l.doc,
                  html: e,
                },
              })
            }
          />
        ) : l.table ? (
          <ComponentHr
            name={file.name}
            table={l.table}
            meta={l.sheet}
            width={d}
            memo={memo}
            onMemo={onMemo}
            onChange={(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
              onChange({
                ...l,
                table: e,
                sheet: t,
              })
            }
          />
        ) : l.code ? (
          <ComponentKn kind={`code`} code={l.code} name={file.name} />
        ) : l.image ? (
          <ComponentKn kind={`image`} image={l.image} name={file.name} />
        ) : l.files ? (
          <Or
            name={file.name}
            entries={l.files}
            lookup={lookup}
            width={d}
            memo={memo}
            onMemo={onMemo}
            onOpen={onOpen}
            onSeed={onSeed}
            onChange={(e?: RecoveredValue): RecoveredValue =>
              onChange({
                ...l,
                files: e,
                updated: e.length === 1 ? `1 item` : `${e.length} items`,
              })
            }
          />
        ) : (
          <p className={`ui-asw-art__none`}>{`No preview for this file yet.`}</p>
        ))}
    </div>
  );
}
function ComponentM({ names, onOpen }: RecoveredValue): RecoveredValue {
  return (
    <div className={`ui-asw-files`}>
      {names.map(
        (e?: RecoveredValue): RecoveredValue => (
          <button
            type={`button`}
            className={`ui-asw-file`}
            title={e}
            onClick={(): RecoveredValue => onOpen(e)}
            key={e}
          >
            {fn(e)}
            <span className={`ui-asw-file__name`}>{sn(e)}</span>
          </button>
        ),
      )}
    </div>
  );
}
var on_component_BUnqa8Km: RecoveredValue = new Intl.NumberFormat(`en`),
  sn: RecoveredValue = (e?: RecoveredValue, t: RecoveredValue = 30): RecoveredValue => {
    if (e.length <= t) return e;
    let n: RecoveredValue = Math.min(12, Math.floor(t / 2.5));
    return `${e.slice(0, t - n - 1).trimEnd()}…${e.slice(-n)}`;
  },
  ComponentCn: RecoveredValue = ({ type = `doc` }: RecoveredValue): RecoveredValue => (
    <svg
      className={`ui-asw-glyph`}
      data-type={type}
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M3.3 1h3.9L10 3.8v6.4c0 .72-.58 1.3-1.3 1.3H3.3c-.72 0-1.3-.58-1.3-1.3V2.3C2 1.58 2.58 1 3.3 1Z`}
        fill={`currentColor`}
        opacity={`0.45`}
      />
      <path d={`M7.2 1v1.8c0 .55.45 1 1 1H10Z`} fill={`currentColor`} />
      <path
        d={`M4 6.6h4M4 8.6h2.6`}
        stroke={`currentColor`}
        strokeWidth={`1.1`}
        strokeLinecap={`round`}
      />
    </svg>
  ),
  ComponentLn: RecoveredValue = (): RecoveredValue => (
    <svg
      className={`ui-asw-glyph`}
      data-type={`sheet`}
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M3.3 1h3.9L10 3.8v6.4c0 .72-.58 1.3-1.3 1.3H3.3c-.72 0-1.3-.58-1.3-1.3V2.3C2 1.58 2.58 1 3.3 1Z`}
        fill={`currentColor`}
        opacity={`0.45`}
      />
      <path d={`M7.2 1v1.8c0 .55.45 1 1 1H10Z`} fill={`currentColor`} />
      <rect
        x={`3.4`}
        y={`5.6`}
        width={`2.3`}
        height={`1.6`}
        rx={`0.4`}
        fill={`currentColor`}
      />
      <rect
        x={`6.3`}
        y={`5.6`}
        width={`2.3`}
        height={`1.6`}
        rx={`0.4`}
        fill={`currentColor`}
      />
      <rect
        x={`3.4`}
        y={`7.8`}
        width={`2.3`}
        height={`1.6`}
        rx={`0.4`}
        fill={`currentColor`}
      />
      <rect
        x={`6.3`}
        y={`7.8`}
        width={`2.3`}
        height={`1.6`}
        rx={`0.4`}
        fill={`currentColor`}
      />
    </svg>
  ),
  ComponentUn: RecoveredValue = (): RecoveredValue => (
    <svg
      className={`ui-asw-glyph`}
      data-type={`folder`}
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M1.4 3.1c0-.72.58-1.3 1.3-1.3h1.72c.38 0 .73.19.94.5l.6.9h3.34c.72 0 1.3.58 1.3 1.3V6H1.4Z`}
        fill={`currentColor`}
      />
      <path
        d={`M1 6.95C.86 6.3 1.36 5.7 2.02 5.7h7.96c.66 0 1.16.6 1.02 1.25l-.5 2.4a1.3 1.3 0 0 1-1.27 1.05H2.77A1.3 1.3 0 0 1 1.5 9.35Z`}
        fill={`currentColor`}
        opacity={`0.45`}
      />
    </svg>
  ),
  dn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e.includes(`.`)
      ? e.slice(e.lastIndexOf(`.`) + 1).toLowerCase()
      : ``;
    return t
      ? [`csv`, `xls`, `xlsx`, `ods`, `tsv`].includes(t)
        ? Ke_component_BUnqa8Km
        : [`png`, `jpg`, `jpeg`, `gif`, `webp`, `svg`, `avif`].includes(t)
          ? R_component_BUnqa8Km
          : [
                `json`,
                `yaml`,
                `yml`,
                `js`,
                `ts`,
                `tsx`,
                `jsx`,
                `py`,
                `sh`,
                `toml`,
                `sql`,
                `css`,
                `html`,
              ].includes(t)
            ? F_component_BUnqa8Km
            : N_component_BUnqa8Km
      : oe_component_BUnqa8Km;
  },
  fn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e.includes(`.`)
      ? e.slice(e.lastIndexOf(`.`) + 1).toLowerCase()
      : ``;
    return t ? (
      [`csv`, `xls`, `xlsx`, `ods`, `tsv`].includes(t) ? (
        <ComponentLn />
      ) : [`png`, `jpg`, `jpeg`, `gif`, `webp`, `svg`, `avif`].includes(t) ? (
        <ComponentCn type={`image`} />
      ) : [
          `json`,
          `yaml`,
          `yml`,
          `js`,
          `ts`,
          `tsx`,
          `jsx`,
          `py`,
          `sh`,
          `toml`,
          `sql`,
          `css`,
          `html`,
        ].includes(t) ? (
        <ComponentCn type={`code`} />
      ) : (
        <ComponentCn />
      )
    ) : (
      <ComponentUn />
    );
  };
function ComponentPn({ blocks }: RecoveredValue): RecoveredValue {
  return (
    <svg
      className={`ui-asw-wire`}
      viewBox={`0 0 120 80`}
      aria-hidden={`true`}
      preserveAspectRatio={`xMidYMid meet`}
    >
      <rect
        className={`ui-asw-wire__frame`}
        x={`0.5`}
        y={`0.5`}
        width={`119`}
        height={`79`}
        rx={`6`}
      />
      {blocks.map(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
          <rect
            className={`ui-asw-wire__block`}
            data-tone={e.tone ?? `soft`}
            x={e.x}
            y={e.y}
            width={e.w}
            height={e.h}
            rx={e.r ?? 2}
            key={t}
          />
        ),
      )}
    </svg>
  );
}
function mn(e?: RecoveredValue): RecoveredValue {
  let [t, n]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(0);
  return (
    (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
      let t: RecoveredValue = e.current;
      if (!t) return;
      let r: RecoveredValue = (): RecoveredValue => n(t.clientWidth);
      r();
      let i: RecoveredValue = new ResizeObserver(r);
      return (i.observe(t), (): RecoveredValue => i.disconnect());
    }, [e]),
    t
  );
}
var hn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    for (let t: RecoveredValue = e?.parentElement; t; t = t.parentElement)
      if (/(auto|scroll)/.test(getComputedStyle(t).overflowY)) return t;
    return null;
  },
  gn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = hn(e);
    if (!e || !t) return;
    let n: RecoveredValue = t.getBoundingClientRect(),
      r: RecoveredValue = e.getBoundingClientRect();
    r.top < n.top + 4
      ? (t.scrollTop -= n.top + 4 - r.top)
      : r.bottom > n.bottom - 4 && (t.scrollTop += r.bottom - n.bottom + 4);
  },
  _n: RecoveredValue =
    typeof navigator < `u` &&
    /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
  Q_component_BUnqa8Km: RecoveredValue = _n ? `⌘` : `Ctrl+`,
  vn: RecoveredValue = _n ? `⇧` : `Shift+`,
  yn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => e.preventDefault(),
  bn: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    [...e.querySelectorAll(`[data-tool]`)].filter(
      (e?: RecoveredValue): RecoveredValue =>
        !e.closest(`.ui-as-popover`) && e.getClientRects().length > 0,
    );
function ComponentXn({ label, className, children }: RecoveredValue): RecoveredValue {
  let r: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    i: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(0),
    a: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    o: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(0),
    [s, c]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    l: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = r.current;
      if (!e) return;
      let t: RecoveredValue = bn(e);
      ((i.current = Z_component_BUnqa8Km(i.current, 0, Math.max(0, t.length - 1))),
        e
          .querySelectorAll(`[data-tool]`)
          .forEach((e?: RecoveredValue): RecoveredValue => (e.tabIndex = -1)),
        t[i.current] && (t[i.current].tabIndex = 0));
    };
  ((0, J_component_BUnqa8Km.useLayoutEffect)(l),
    (0, J_component_BUnqa8Km.useEffect)(
      (): RecoveredValue => (): RecoveredValue => window.clearTimeout(o.current),
      [],
    ),
    (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = a.current,
        t: RecoveredValue = r.current;
      e &&
        t &&
        s &&
        (e.style.left = `${Z_component_BUnqa8Km(s.x - e.offsetWidth / 2, 4, t.clientWidth - e.offsetWidth - 4)}px`);
    }, [s]));
  let u: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = r.current;
      if (!t || !e.dataset.tip || e.getAttribute(`aria-expanded`) === `true`)
        return c(null);
      let n: RecoveredValue = e.getBoundingClientRect(),
        i: RecoveredValue = t.getBoundingClientRect();
      c({
        text: e.dataset.tip,
        keys: e.dataset.keys,
        x: n.left - i.left + n.width / 2,
        y: n.bottom - i.top + 6,
      });
    },
    d: RecoveredValue = (): RecoveredValue => {
      (window.clearTimeout(o.current), c(null));
    };
  return (
    <div
      ref={r as RecoveredValue}
      role={`toolbar`}
      aria-label={label}
      className={[`ui-asw-tb`, className].filter(Boolean).join(` `)}
      onKeyDown={(e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = e.target;
        if (t.closest(`.ui-as-popover`)) return;
        if (e.key === `Escape`) return d();
        let n: RecoveredValue = bn(r.current),
          a: RecoveredValue = n.indexOf(t),
          o: RecoveredValue = e.key === `ArrowRight` ? 1 : e.key === `ArrowLeft` ? -1 : 0,
          s: RecoveredValue = o
            ? (a + o + n.length) % n.length
            : e.key === `Home`
              ? 0
              : e.key === `End`
                ? n.length - 1
                : -1;
        a < 0 || s < 0 || (e.preventDefault(), (i.current = s), l(), n[s].focus());
      }}
      onFocus={(e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = e.target,
          n: RecoveredValue = bn(r.current).indexOf(t);
        (n >= 0 && ((i.current = n), l()),
          n >= 0 && t.matches(`:focus-visible`) ? u(t) : d());
      }}
      onBlur={d}
      onPointerOver={(e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = e.target.closest(`[data-tip]`);
        t &&
          !t.closest(`.ui-as-popover`) &&
          (window.clearTimeout(o.current),
          (o.current = window.setTimeout((): RecoveredValue => u(t), s ? 0 : 480)));
      }}
      onPointerLeave={d}
      onPointerDown={d}
    >
      {children}
      {s && (
        <span
          ref={a as RecoveredValue}
          className={`ui-asw-tip`}
          aria-hidden={`true`}
          style={
            {
              top: s.y,
            } as RecoveredValue
          }
        >
          {s.text}
          {s.keys && <kbd>{s.keys}</kbd>}
        </span>
      )}
    </div>
  );
}
function Component$({
  icon,
  label,
  keys,
  pressed,
  disabled,
  onClick,
}: RecoveredValue): RecoveredValue {
  return (
    <button
      type={`button`}
      className={`ui-asw-tool`}
      data-tool={!0}
      data-tip={label}
      data-keys={keys}
      aria-label={label}
      aria-pressed={pressed}
      aria-disabled={disabled || void 0}
      onMouseDown={yn}
      onClick={(): RecoveredValue => !disabled && onClick()}
    >
      <ComponentP_component_BUnqa8Km icon={icon} size={16} />
    </button>
  );
}
function Sn({
  icon,
  label,
  text,
  items,
  align = `start`,
}: RecoveredValue): RecoveredValue {
  return (
    <ComponentD_component_BUnqa8Km
      align={align}
      items={items}
      className={`ui-asw-tool-anchor`}
      trigger={({ open, toggle }: RecoveredValue): RecoveredValue => (
        <button
          type={`button`}
          className={`ui-asw-tool ui-asw-tool--menu`}
          data-tool={!0}
          data-tip={label}
          aria-label={text ? `${label}: ${text}` : label}
          aria-haspopup={`menu`}
          aria-expanded={open}
          onMouseDown={yn}
          onClick={toggle}
        >
          <ComponentP_component_BUnqa8Km icon={icon} size={16} />
          {text && <span className={`ui-asw-tool__text`}>{text}</span>}
          <ComponentP_component_BUnqa8Km icon={f_component_BUnqa8Km} size={12} />
        </button>
      )}
    />
  );
}
var Cn: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  e.key === `ContextMenu` || (e.shiftKey && e.key === `F10`);
function wn(): RecoveredValue {
  let [e, t]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    n: RecoveredValue = (
      e?: RecoveredValue,
      n?: RecoveredValue,
      r?: RecoveredValue,
      i?: RecoveredValue,
    ): RecoveredValue =>
      t({
        x: e,
        y: n,
        kind: r,
        back: i ?? (document.activeElement as HTMLElement),
      });
  return {
    open: n,
    openOn: (
      e?: RecoveredValue,
      t?: RecoveredValue,
      r?: RecoveredValue,
    ): RecoveredValue => {
      let i: RecoveredValue = e?.getBoundingClientRect();
      i && n(i.left + Math.min(12, i.width / 2), i.top + Math.min(i.height, 26), t, r);
    },
    render: (n?: RecoveredValue): RecoveredValue => {
      if (!e) return null;
      let { label: r, items: i }: RecoveredValue = n(e.kind);
      return (
        <Tn
          x={e.x}
          y={e.y}
          label={r}
          items={i}
          back={e.back}
          onClose={(n?: RecoveredValue): RecoveredValue => {
            (t(null),
              n &&
                e.back?.isConnected &&
                e.back.focus({
                  preventScroll: !0,
                }));
          }}
          key={`${e.x}:${e.y}:${e.kind}`}
        />
      );
    },
    isOpen: !!e,
  };
}
function Tn({ x: e, y: t, label, items, back, onClose }: RecoveredValue): RecoveredValue {
  let o: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    s: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(onClose);
  s.current = onClose;
  let c: RecoveredValue = back?.closest(`.ui-as`) ?? document.body;
  return (
    (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
      let n: RecoveredValue = o.current;
      if (!n) return;
      ((n.style.left = `${e}px`), (n.style.top = `${t}px`));
      let r: RecoveredValue = n.getBoundingClientRect(),
        i: RecoveredValue = r.left - e,
        a: RecoveredValue = r.top - t,
        s: RecoveredValue =
          e + r.width > window.innerWidth - 6 ? Math.max(6, e - r.width) : e,
        c: RecoveredValue =
          t + r.height > window.innerHeight - 6 ? Math.max(6, t - r.height) : t;
      ((n.style.left = `${s - i}px`), (n.style.top = `${c - a}px`));
    }, [e, t]),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
          !!e && !!o.current?.contains(e),
        t: RecoveredValue = (t?: RecoveredValue): RecoveredValue =>
          !e(t.target) && s.current(!1),
        n: RecoveredValue = (t?: RecoveredValue): RecoveredValue =>
          !e(t.target) && s.current(!1),
        r: RecoveredValue = (): RecoveredValue => s.current(!1);
      return (
        document.addEventListener(`pointerdown`, t, !0),
        window.addEventListener(`scroll`, n, !0),
        window.addEventListener(`resize`, r),
        window.addEventListener(`blur`, r),
        (): RecoveredValue => {
          (document.removeEventListener(`pointerdown`, t, !0),
            window.removeEventListener(`scroll`, n, !0),
            window.removeEventListener(`resize`, r),
            window.removeEventListener(`blur`, r));
        }
      );
    }, []),
    (0, st_component_BUnqa8Km.createPortal)(
      <div
        ref={o as RecoveredValue}
        className={`ui-as-menu ui-asw-ctx`}
        onContextMenu={(e?: RecoveredValue): RecoveredValue => {
          (e.preventDefault(), e.stopPropagation());
        }}
        onPointerDown={(e?: RecoveredValue): RecoveredValue => e.stopPropagation()}
        onClick={(e?: RecoveredValue): RecoveredValue => e.stopPropagation()}
        onDoubleClick={(e?: RecoveredValue): RecoveredValue => e.stopPropagation()}
      >
        <En
          items={items}
          label={label}
          close={(e?: RecoveredValue): RecoveredValue => s.current(e)}
          focusFirst={!0}
        />
      </div>,
      c,
    )
  );
}
function En({ items, label, close, onBack, focusFirst }: RecoveredValue): RecoveredValue {
  let a: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [o, s]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    c: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(0),
    l: RecoveredValue = (): RecoveredValue => [
      ...(a.current?.querySelectorAll(`:scope > .ui-asw-ctx__row > [role^='menuitem']`) ??
        []),
    ];
  (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = a.current?.parentElement;
    if (e?.classList.contains(`ui-asw-ctx__sub`)) {
      let t: RecoveredValue = e.getBoundingClientRect();
      (t.right > window.innerWidth - 6 && (e.dataset.flip = ``),
        t.bottom > window.innerHeight - 6 &&
          (e.style.top = `${window.innerHeight - 6 - t.bottom - 4}px`));
    }
    return (
      focusFirst &&
        (
          l().find(
            (e?: RecoveredValue): RecoveredValue => !e.hasAttribute(`aria-disabled`),
          ) ?? l()[0]
        )?.focus({
          preventScroll: !0,
        }),
      (): RecoveredValue => window.clearTimeout(c.current)
    );
  }, []);
  let u: RecoveredValue = (t?: RecoveredValue, r?: RecoveredValue): RecoveredValue => {
    let i: RecoveredValue = items[t];
    if (i && !i.disabled) {
      if (i.submenu)
        return s({
          at: t,
          key: r,
        });
      (close(!0), i.onSelect?.());
    }
  };
  return (
    <div
      ref={a as RecoveredValue}
      role={`menu`}
      aria-label={label}
      className={`ui-as-menu__list`}
      onKeyDown={(t?: RecoveredValue): RecoveredValue => {
        t.stopPropagation();
        let i: RecoveredValue = l(),
          a: RecoveredValue = i.indexOf(document.activeElement as HTMLElement),
          o: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
            (t.preventDefault(),
              s(null),
              i[(e + i.length) % i.length]?.focus({
                preventScroll: !0,
              }));
          };
        t.key === `ArrowDown`
          ? o(a + 1)
          : t.key === `ArrowUp`
            ? o(a < 0 ? -1 : a - 1)
            : t.key === `Home`
              ? o(0)
              : t.key === `End`
                ? o(-1)
                : (t.key === `ArrowRight` && items[a]?.submenu) ||
                    ((t.key === `Enter` || t.key === ` `) && a >= 0)
                  ? (t.preventDefault(), u(a, !0))
                  : t.key === `ArrowLeft` && onBack
                    ? (t.preventDefault(), onBack())
                    : t.key === `Escape`
                      ? (t.preventDefault(), onBack ? onBack() : close(!0))
                      : t.key === `Tab` && (t.preventDefault(), close(!0));
      }}
    >
      {items.map(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
          <J_component_BUnqa8Km.Fragment key={`${t}-${e.label}`}>
            {e.divider && t > 0 && (
              <span className={`ui-as-menu__sep`} role={`separator`} />
            )}
            <span className={`ui-asw-ctx__row`}>
              <button
                type={`button`}
                role={e.checked === void 0 ? `menuitem` : `menuitemcheckbox`}
                aria-checked={e.checked}
                aria-disabled={e.disabled || void 0}
                aria-haspopup={e.submenu ? `menu` : void 0}
                aria-expanded={e.submenu ? o?.at === t : void 0}
                tabIndex={-1}
                className={`ui-as-menu__item`}
                data-danger={e.danger || void 0}
                data-open={(e.submenu && o?.at === t) || void 0}
                onPointerEnter={(n?: RecoveredValue): RecoveredValue => {
                  (n.pointerType === `mouse` &&
                    n.currentTarget.focus({
                      preventScroll: !0,
                    }),
                    window.clearTimeout(c.current),
                    (c.current = window.setTimeout(
                      (): RecoveredValue =>
                        s(
                          e.submenu && !e.disabled
                            ? {
                                at: t,
                                key: !1,
                              }
                            : null,
                        ),
                      e.submenu ? 90 : 180,
                    )));
                }}
                onClick={(): RecoveredValue => u(t, !1)}
              >
                <ComponentP_component_BUnqa8Km icon={e.icon} size={15} />
                <span className={`ui-as-menu__label`}>
                  <span className={`ui-as-menu__text`}>{e.label}</span>
                </span>
                {e.keys && <kbd className={`ui-as-menu__kbd`}>{e.keys}</kbd>}
                {e.checked && (
                  <ComponentP_component_BUnqa8Km icon={et_component_BUnqa8Km} size={14} />
                )}
                {e.submenu && (
                  <ComponentP_component_BUnqa8Km icon={h_component_BUnqa8Km} size={14} />
                )}
              </button>
              {e.submenu && o?.at === t && (
                <span className={`ui-as-menu ui-asw-ctx__sub`}>
                  <En
                    items={e.submenu}
                    label={e.label}
                    close={close}
                    focusFirst={o.key}
                    onBack={(): RecoveredValue => {
                      (s(null),
                        l()[t]?.focus({
                          preventScroll: !0,
                        }));
                    }}
                  />
                </span>
              )}
            </span>
          </J_component_BUnqa8Km.Fragment>
        ),
      )}
    </div>
  );
}
var Dn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    try {
      navigator.clipboard?.writeText(e).catch((): RecoveredValue => {});
    } catch {}
  },
  On: RecoveredValue = async (): Promise<RecoveredValue> => {
    try {
      return await navigator.clipboard.readText();
    } catch {
      return null;
    }
  };
function ComponentKn({ kind, code, image, name }: RecoveredValue): RecoveredValue {
  let i: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    a: RecoveredValue = wn(),
    [o, s]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(``),
    c: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = i.current,
        t: RecoveredValue = window.getSelection();
      if (!e || !t) return;
      let n: RecoveredValue = document.createRange();
      (n.selectNodeContents(e), t.removeAllRanges(), t.addRange(n));
    },
    l: RecoveredValue = (): RecoveredValue => {
      let n: RecoveredValue = window.getSelection(),
        r: RecoveredValue =
          n && !n.isCollapsed && i.current?.contains(n.anchorNode) ? n.toString() : ``;
      (Dn(
        kind === `code`
          ? r || code || ``
          : (i.current?.querySelector(`svg`)?.outerHTML ?? ``),
      ),
        s(``),
        window.setTimeout(
          (): RecoveredValue =>
            s(
              r
                ? `Copied the selection`
                : kind === `code`
                  ? `Copied the code`
                  : `Copied the image`,
            ),
          30,
        ));
    },
    u: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (e.preventDefault(), a.open(e.clientX, e.clientY, `still`, i.current));
    },
    d: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      Cn(e) && (e.preventDefault(), a.openOn(i.current, `still`, i.current));
    };
  return (
    <Y_component_BUnqa8Km.Fragment>
      {kind === `code` ? (
        <pre
          ref={i as RecoveredValue}
          className={`ui-asw-art__code`}
          tabIndex={0}
          aria-label={`${name}, code`}
          onContextMenu={u}
          onKeyDown={d}
        >
          {code}
        </pre>
      ) : (
        <div
          ref={i as RecoveredValue}
          className={`ui-asw-art__image`}
          tabIndex={0}
          role={`img`}
          aria-label={`${name}, image`}
          onContextMenu={u}
          onKeyDown={d}
        >
          <ComponentPn blocks={image ?? []} />
        </div>
      )}
      {a.render(
        (): RecoveredValue => ({
          label: name,
          items: [
            {
              label: kind === `code` ? `Copy` : `Copy image`,
              icon: te_component_BUnqa8Km,
              keys: `${Q_component_BUnqa8Km}C`,
              onSelect: l,
            },
            ...(kind === `code`
              ? [
                  {
                    label: `Select all`,
                    icon: ne_component_BUnqa8Km,
                    keys: `${Q_component_BUnqa8Km}A`,
                    onSelect: c,
                  },
                ]
              : []),
          ],
        }),
      )}
      <span className={`ui-asw-sr`} role={`status`} aria-live={`polite`}>
        {o}
      </span>
    </Y_component_BUnqa8Km.Fragment>
  );
}
var An: RecoveredValue = [
    {
      id: `p`,
      label: `Text`,
      icon: Qe_component_BUnqa8Km,
    },
    {
      id: `h1`,
      label: `Heading 1`,
      icon: fe_component_BUnqa8Km,
    },
    {
      id: `h2`,
      label: `Heading 2`,
      icon: pe_component_BUnqa8Km,
    },
    {
      id: `h3`,
      label: `Heading 3`,
      icon: L_component_BUnqa8Km,
    },
    {
      id: `blockquote`,
      label: `Quote`,
      icon: je_component_BUnqa8Km,
    },
  ],
  jn: RecoveredValue = {
    block: `p`,
    bold: !1,
    italic: !1,
    underline: !1,
    strike: !1,
    code: !1,
    link: !1,
    ul: !1,
    ol: !1,
    check: !1,
  },
  Mn: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.replace(
      /[&<>"]/g,
      (e?: RecoveredValue): RecoveredValue =>
        (
          ({
            "&": `&amp;`,
            "<": `&lt;`,
            ">": `&gt;`,
            '"': `&quot;`,
          }) as Record<string, RecoveredValue>
        )[e],
    ),
  Nn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    if (e.html !== void 0) return e.html;
    let t: RecoveredValue = e.bullets ?? [],
      n: RecoveredValue =
        t.length > 0 &&
        t.every((e?: RecoveredValue): RecoveredValue => /^\[( |x)\] /i.test(e)),
      r: RecoveredValue = t.length
        ? n
          ? `<ul data-check>${t.map((e?: RecoveredValue): RecoveredValue => `<li${/^\[x\]/i.test(e) ? ` data-done` : ``}>${Mn(e.slice(4))}</li>`).join(``)}</ul>`
          : `<ul>${t.map((e?: RecoveredValue): RecoveredValue => `<li>${Mn(e)}</li>`).join(``)}</ul>`
        : ``;
    return [
      `<h1>${Mn(e.title)}</h1>`,
      ...(e.paragraphs ?? []).map(
        (e?: RecoveredValue): RecoveredValue => `<p>${Mn(e)}</p>`,
      ),
      r,
    ].join(``);
  },
  Pn: RecoveredValue = {
    "#": `h1`,
    "##": `h2`,
    "###": `h3`,
    ">": `blockquote`,
    "-": `ul`,
    "*": `ul`,
    "1.": `ol`,
    "[ ]": `check`,
    "[]": `check`,
  };
function Fn({ name, doc, edited, width, onChange }: RecoveredValue): RecoveredValue {
  let a: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    o: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [s, c]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(jn),
    [l, u]: RecoveredValue = (0, J_component_BUnqa8Km.useState)({
      words: 0,
      chars: 0,
    }),
    [d, f]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    [p, m]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(``),
    h: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(onChange);
  h.current = onChange;
  let g: RecoveredValue = (): RecoveredValue => {
    let e: RecoveredValue = a.current?.innerText ?? ``;
    u({
      words: (e.match(/\S+/g) ?? []).length,
      chars: e.replace(/\n/g, ``).length,
    });
  };
  (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
    a.current && ((a.current.innerHTML = Nn(doc)), g());
  }, []);
  let _: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = a.current,
      n: RecoveredValue = window.getSelection()?.anchorNode,
      r: RecoveredValue = (n instanceof Element ? n : n?.parentElement)?.closest(e);
    return t && r && t.contains(r) && r !== t ? r : null;
  };
  (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = a.current,
        t: RecoveredValue = window.getSelection();
      if (!e || !t?.rangeCount || !e.contains(t.anchorNode)) return;
      o.current = t.getRangeAt(0).cloneRange();
      let n: RecoveredValue = _(`h1, h2, h3, blockquote`),
        r: RecoveredValue = _(`ul, ol`);
      c({
        block: n?.tagName.toLowerCase() ?? `p`,
        bold: document.queryCommandState(`bold`),
        italic: document.queryCommandState(`italic`),
        underline: document.queryCommandState(`underline`),
        strike: document.queryCommandState(`strikeThrough`),
        code: !!_(`code`),
        link: !!_(`a`),
        ul: r?.tagName === `UL` && !r.hasAttribute(`data-check`),
        ol: r?.tagName === `OL`,
        check: !!r?.hasAttribute(`data-check`),
      });
    };
    return (
      document.addEventListener(`selectionchange`, e),
      (): RecoveredValue => document.removeEventListener(`selectionchange`, e)
    );
  }, []);
  let v: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (m(``), window.setTimeout((): RecoveredValue => m(e), 30));
    },
    y: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = a.current;
      if (!e) return;
      let t: RecoveredValue = window.getSelection();
      if (
        (document.activeElement as HTMLElement) === e &&
        t?.rangeCount &&
        e.contains(t.anchorNode)
      )
        return;
      e.focus({
        preventScroll: !0,
      });
      let n: RecoveredValue = o.current;
      n && e.contains(n.startContainer) && t && (t.removeAllRanges(), t.addRange(n));
    },
    b: RecoveredValue = (): RecoveredValue => {
      a.current &&
        (g(),
        h.current(a.current.innerHTML),
        document.dispatchEvent(new Event(`selectionchange`)));
    },
    x: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      (y(), document.execCommand(e, !1, t), b());
    },
    S: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (y(),
        _(`li`) &&
          e !== `p` &&
          document.execCommand(_(`ol`) ? `insertOrderedList` : `insertUnorderedList`),
        document.execCommand(
          `formatBlock`,
          !1,
          `<${e === s.block && e !== `p` ? `p` : e}>`,
        ),
        b());
    },
    T: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      y();
      let t: RecoveredValue = _(`ul, ol`),
        n: RecoveredValue = !!t?.hasAttribute(`data-check`);
      (e === `check`
        ? n
          ? document.execCommand(`insertUnorderedList`)
          : (t?.tagName !== `UL` && document.execCommand(`insertUnorderedList`),
            _(`ul`)?.setAttribute(`data-check`, ``))
        : e === `ul` && n && t
          ? (t.removeAttribute(`data-check`),
            t
              .querySelectorAll(`:scope > li[data-done]`)
              .forEach(
                (e?: RecoveredValue): RecoveredValue => e.removeAttribute(`data-done`),
              ))
          : (document.execCommand(
              e === `ul` ? `insertUnorderedList` : `insertOrderedList`,
            ),
            _(`ol`)?.removeAttribute(`data-check`)),
        b());
    },
    ee: RecoveredValue = (): RecoveredValue => {
      y();
      let e: RecoveredValue = _(`code`),
        t: RecoveredValue = window.getSelection();
      if (t) {
        if (e) {
          let n: RecoveredValue = document.createRange();
          (n.selectNode(e),
            t.removeAllRanges(),
            t.addRange(n),
            document.execCommand(`insertText`, !1, e.textContent ?? ``));
        } else if (!t.isCollapsed)
          document.execCommand(`insertHTML`, !1, `<code>${Mn(t.toString())}</code>`);
        else return v(`Select some text first`);
        b();
      }
    },
    E: RecoveredValue = (): RecoveredValue => {
      y();
      let e: RecoveredValue = window.getSelection();
      (document.execCommand(`removeFormat`), document.execCommand(`unlink`));
      let t: RecoveredValue = e?.rangeCount ? e.getRangeAt(0) : null;
      (a.current
        ?.querySelectorAll(`code`)
        .forEach((e?: RecoveredValue): RecoveredValue => {
          t &&
            (t.intersectsNode(e) || e.contains(t.startContainer)) &&
            e.replaceWith(document.createTextNode(e.textContent ?? ``));
        }),
        b(),
        v(`Formatting cleared`));
    },
    D: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = !e.hasAttribute(`data-done`);
      (e.toggleAttribute(`data-done`, t), b(), v(t ? `Checked` : `Unchecked`));
    },
    O: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      e || y();
      let t: RecoveredValue = _(`a`);
      f({
        url: t?.getAttribute(`href`) ?? ``,
        had: !!t,
        fromKey: e,
      });
    },
    k: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.trim();
      (f(null), y());
      let n: RecoveredValue = window.getSelection(),
        r: RecoveredValue = _(`a`);
      if (r && n) {
        let e: RecoveredValue = document.createRange();
        (e.selectNodeContents(r), n.removeAllRanges(), n.addRange(e));
      }
      if (!t) document.execCommand(`unlink`);
      else {
        let e: RecoveredValue = /^([a-z][a-z0-9+.-]*:|\/|#)/i.test(t)
          ? t
          : `https://${t}`;
        n?.isCollapsed
          ? document.execCommand(`insertHTML`, !1, `<a href="${Mn(e)}">${Mn(t)}</a>`)
          : document.execCommand(`createLink`, !1, e);
      }
      b();
    },
    A: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = a.current,
        t: RecoveredValue = window.getSelection();
      if (!e || !t?.isCollapsed || !t.anchorNode || _(`li`)) return;
      let n: RecoveredValue = t.anchorNode;
      for (; n.parentNode && n.parentNode !== e; ) n = n.parentNode;
      let r: RecoveredValue = _(`p, div, h1, h2, h3, blockquote`),
        i: RecoveredValue = document.createRange();
      (r ? i.setStart(r, 0) : i.setStartBefore(n),
        i.setEnd(t.anchorNode, t.anchorOffset));
      let o: RecoveredValue = i.toString().replace(/ /g, ` `),
        s: RecoveredValue = o.endsWith(` `) ? Pn[o.slice(0, -1)] : void 0;
      s &&
        (t.removeAllRanges(),
        t.addRange(i),
        document.execCommand(`delete`),
        s === `ul` || s === `ol` || s === `check`
          ? T(s)
          : document.execCommand(`formatBlock`, !1, `<${s}>`));
    },
    re: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.metaKey || e.ctrlKey;
      if (Cn(e)) {
        e.preventDefault();
        let t: RecoveredValue = window.getSelection(),
          n: RecoveredValue = t?.rangeCount
            ? t.getRangeAt(0).getBoundingClientRect()
            : null;
        n && (n.width || n.height)
          ? j.open(n.left, n.bottom + 4, `doc`, a.current)
          : j.openOn(a.current, `doc`, a.current);
        return;
      }
      if (t && !e.altKey) {
        let t: RecoveredValue = e.key.toLowerCase(),
          n: RecoveredValue = e.shiftKey
            ? (
                {
                  Digit7: (): RecoveredValue => T(`ol`),
                  Digit8: (): RecoveredValue => T(`ul`),
                  Digit9: (): RecoveredValue => T(`check`),
                  KeyX: (): RecoveredValue => x(`strikeThrough`),
                } as Record<string, RecoveredValue>
              )[e.code]
            : (
                {
                  b: (): RecoveredValue => x(`bold`),
                  i: (): RecoveredValue => x(`italic`),
                  u: (): RecoveredValue => x(`underline`),
                  k: (): RecoveredValue => O(!0),
                  e: ee,
                } as Record<string, RecoveredValue>
              )[t];
        if (n) return (e.preventDefault(), e.stopPropagation(), n());
        if (e.key === `Enter`) {
          let t: RecoveredValue = _(`ul[data-check] > li`);
          t && (e.preventDefault(), D(t));
        }
        return;
      }
      if (e.key === `Tab` && _(`li`)) {
        e.preventDefault();
        let t: RecoveredValue = !!_(`ul[data-check]`);
        (document.execCommand(e.shiftKey ? `outdent` : `indent`),
          t && _(`ul`)?.setAttribute(`data-check`, ``),
          b());
      }
    },
    j: RecoveredValue = wn(),
    M: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = window.getSelection();
      if (
        !n ||
        (!n.isCollapsed &&
          n.rangeCount > 0 &&
          [...n.getRangeAt(0).getClientRects()].some(
            (n?: RecoveredValue): RecoveredValue =>
              e >= n.left && e <= n.right && t >= n.top && t <= n.bottom,
          ))
      )
        return;
      let r: RecoveredValue = document.caretRangeFromPoint?.(e, t);
      r &&
        a.current?.contains(r.startContainer) &&
        (n.removeAllRanges(),
        n.addRange(r),
        (/\S/.test(r.startContainer.textContent?.[r.startOffset] ?? ``) ||
          /\S/.test(r.startContainer.textContent?.[r.startOffset - 1] ?? ``)) &&
          (n.modify(`move`, `forward`, `character`),
          n.modify(`move`, `backward`, `word`),
          n.modify(`extend`, `forward`, `word`)));
    },
    ie: RecoveredValue = async (): Promise<RecoveredValue> => {
      let e: RecoveredValue = await On();
      if (e === null)
        return v(
          `Press ${Q_component_BUnqa8Km}V to paste – the browser keeps the clipboard to itself here`,
        );
      (y(), document.execCommand(`insertText`, !1, e), b());
    },
    N: RecoveredValue = (): RecoveredValue => {
      s.ul || s.ol || s.check ? T(s.check ? `check` : s.ol ? `ol` : `ul`) : S(`p`);
    },
    P: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = window.getSelection(),
        t: RecoveredValue = !!e && !e.isCollapsed && !!a.current?.contains(e.anchorNode),
        n: RecoveredValue = s.ul || s.ol || s.check;
      return [
        {
          label: `Cut`,
          icon: Pe_component_BUnqa8Km,
          keys: `${Q_component_BUnqa8Km}X`,
          disabled: !t,
          onSelect: (): RecoveredValue => x(`cut`),
        },
        {
          label: `Copy`,
          icon: te_component_BUnqa8Km,
          keys: `${Q_component_BUnqa8Km}C`,
          disabled: !t,
          onSelect: (): RecoveredValue => x(`copy`),
        },
        {
          label: `Paste`,
          icon: w_component_BUnqa8Km,
          keys: `${Q_component_BUnqa8Km}V`,
          onSelect: ie,
        },
        {
          label: `Format`,
          icon: Je_component_BUnqa8Km,
          divider: !0,
          submenu: [
            {
              label: `Bold`,
              icon: qe_component_BUnqa8Km,
              keys: `${Q_component_BUnqa8Km}B`,
              checked: s.bold,
              onSelect: (): RecoveredValue => x(`bold`),
            },
            {
              label: `Italic`,
              icon: q_component_BUnqa8Km,
              keys: `${Q_component_BUnqa8Km}I`,
              checked: s.italic,
              onSelect: (): RecoveredValue => x(`italic`),
            },
            {
              label: `Underline`,
              icon: $e_component_BUnqa8Km,
              keys: `${Q_component_BUnqa8Km}U`,
              checked: s.underline,
              onSelect: (): RecoveredValue => x(`underline`),
            },
          ],
        },
        {
          label: `Turn into`,
          icon: Xe_component_BUnqa8Km,
          submenu: [
            ...An.map(
              (e?: RecoveredValue): RecoveredValue => ({
                label: e.label,
                icon: e.icon,
                checked: !n && s.block === e.id,
                onSelect: (): RecoveredValue => (e.id === `p` ? N() : S(e.id)),
              }),
            ),
            {
              label: `Bulleted list`,
              icon: ye_component_BUnqa8Km,
              keys: `${vn}${Q_component_BUnqa8Km}8`,
              checked: s.ul,
              divider: !0,
              onSelect: (): RecoveredValue => !s.ul && T(`ul`),
            },
            {
              label: `Numbered list`,
              icon: be_component_BUnqa8Km,
              keys: `${vn}${Q_component_BUnqa8Km}7`,
              checked: s.ol,
              onSelect: (): RecoveredValue => !s.ol && T(`ol`),
            },
            {
              label: `Checklist`,
              icon: C_component_BUnqa8Km,
              keys: `${vn}${Q_component_BUnqa8Km}9`,
              checked: s.check,
              onSelect: (): RecoveredValue => !s.check && T(`check`),
            },
          ],
        },
        {
          label: `Link…`,
          icon: B_component_BUnqa8Km,
          keys: `${Q_component_BUnqa8Km}K`,
          divider: !0,
          onSelect: (): RecoveredValue => O(!0),
        },
        {
          label: `Select all`,
          icon: ne_component_BUnqa8Km,
          keys: `${Q_component_BUnqa8Km}A`,
          onSelect: (): RecoveredValue => x(`selectAll`),
        },
      ];
    },
    F: RecoveredValue = width >= 470,
    ae: RecoveredValue = width >= 330,
    oe: RecoveredValue =
      An.find((e?: RecoveredValue): RecoveredValue => e.id === s.block) ?? An[0],
    se: RecoveredValue = [
      ...(F
        ? []
        : [
            {
              label: `Bulleted list`,
              icon: ye_component_BUnqa8Km,
              shortcut: `${vn}${Q_component_BUnqa8Km}8`,
              onSelect: (): RecoveredValue => T(`ul`),
            },
            {
              label: `Numbered list`,
              icon: be_component_BUnqa8Km,
              shortcut: `${vn}${Q_component_BUnqa8Km}7`,
              onSelect: (): RecoveredValue => T(`ol`),
            },
            {
              label: `Checklist`,
              icon: C_component_BUnqa8Km,
              shortcut: `${vn}${Q_component_BUnqa8Km}9`,
              onSelect: (): RecoveredValue => T(`check`),
            },
          ]),
      {
        label: `Strikethrough`,
        icon: Ze_component_BUnqa8Km,
        shortcut: `${vn}${Q_component_BUnqa8Km}X`,
        divider: !F,
        onSelect: (): RecoveredValue => x(`strikeThrough`),
      },
      {
        label: `Inline code`,
        icon: K_component_BUnqa8Km,
        shortcut: `${Q_component_BUnqa8Km}E`,
        onSelect: ee,
      },
      {
        label: `Clear formatting`,
        icon: W_component_BUnqa8Km,
        divider: !0,
        onSelect: E,
      },
    ],
    ce: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      `${on_component_BUnqa8Km.format(e)} ${t}${e === 1 ? `` : `s`}`;
  return (
    <div className={`ui-asw-dc`}>
      <ComponentXn label={`Formatting`} className={`ui-asw-dc__tools`}>
        <span className={`ui-asw-tb__group`}>
          <Component$
            icon={nt_component_BUnqa8Km}
            label={`Undo`}
            keys={`${Q_component_BUnqa8Km}Z`}
            onClick={(): RecoveredValue => x(`undo`)}
          />
          <Component$
            icon={Me_component_BUnqa8Km}
            label={`Redo`}
            keys={`${vn}${Q_component_BUnqa8Km}Z`}
            onClick={(): RecoveredValue => x(`redo`)}
          />
        </span>
        <span className={`ui-asw-tb__group`}>
          <Sn
            icon={oe.icon}
            label={`Block style`}
            text={ae ? oe.label : void 0}
            items={An.map(
              (e?: RecoveredValue): RecoveredValue => ({
                label: e.label,
                icon: e.icon,
                checked: e.id === s.block,
                onSelect: (): RecoveredValue => S(e.id),
              }),
            )}
          />
        </span>
        <span className={`ui-asw-tb__group`}>
          <Component$
            icon={qe_component_BUnqa8Km}
            label={`Bold`}
            keys={`${Q_component_BUnqa8Km}B`}
            pressed={s.bold}
            onClick={(): RecoveredValue => x(`bold`)}
          />
          <Component$
            icon={q_component_BUnqa8Km}
            label={`Italic`}
            keys={`${Q_component_BUnqa8Km}I`}
            pressed={s.italic}
            onClick={(): RecoveredValue => x(`italic`)}
          />
          <Component$
            icon={$e_component_BUnqa8Km}
            label={`Underline`}
            keys={`${Q_component_BUnqa8Km}U`}
            pressed={s.underline}
            onClick={(): RecoveredValue => x(`underline`)}
          />
          <span className={`ui-as-anchor`}>
            <Component$
              icon={B_component_BUnqa8Km}
              label={`Link`}
              keys={`${Q_component_BUnqa8Km}K`}
              pressed={s.link}
              onClick={(): RecoveredValue => (d ? f(null) : O(!1))}
            />
            <Ot_component_BUnqa8Km
              open={!!d}
              onClose={(): RecoveredValue => {
                let e: RecoveredValue = d?.fromKey;
                (f(null), e && window.setTimeout(y));
              }}
              className={`ui-asw-linkpop`}
            >
              {d && (
                <form
                  onSubmit={(e?: RecoveredValue): RecoveredValue => {
                    (e.preventDefault(),
                      k(new FormData(e.currentTarget).get(`url`)?.toString() ?? ``));
                  }}
                >
                  <input
                    name={`url`}
                    type={`text`}
                    inputMode={`url`}
                    autoFocus={!0}
                    defaultValue={d.url}
                    placeholder={`Paste or type a link`}
                    aria-label={`Link address`}
                    spellCheck={!1}
                  />
                  {d.had && (
                    <button
                      type={`button`}
                      className={`ui-asw-btn ui-asw-btn--quiet`}
                      onClick={(): RecoveredValue => k(``)}
                    >{`Remove`}</button>
                  )}
                  <button type={`submit`} className={`ui-asw-btn`}>{`Apply`}</button>
                </form>
              )}
            </Ot_component_BUnqa8Km>
          </span>
          {F && (
            <Y_component_BUnqa8Km.Fragment>
              <Component$
                icon={Ze_component_BUnqa8Km}
                label={`Strikethrough`}
                keys={`${vn}${Q_component_BUnqa8Km}X`}
                pressed={s.strike}
                onClick={(): RecoveredValue => x(`strikeThrough`)}
              />
              <Component$
                icon={K_component_BUnqa8Km}
                label={`Inline code`}
                keys={`${Q_component_BUnqa8Km}E`}
                pressed={s.code}
                onClick={ee}
              />
            </Y_component_BUnqa8Km.Fragment>
          )}
        </span>
        {F && (
          <span className={`ui-asw-tb__group`}>
            <Component$
              icon={ye_component_BUnqa8Km}
              label={`Bulleted list`}
              keys={`${vn}${Q_component_BUnqa8Km}8`}
              pressed={s.ul}
              onClick={(): RecoveredValue => T(`ul`)}
            />
            <Component$
              icon={be_component_BUnqa8Km}
              label={`Numbered list`}
              keys={`${vn}${Q_component_BUnqa8Km}7`}
              pressed={s.ol}
              onClick={(): RecoveredValue => T(`ol`)}
            />
            <Component$
              icon={C_component_BUnqa8Km}
              label={`Checklist`}
              keys={`${vn}${Q_component_BUnqa8Km}9`}
              pressed={s.check}
              onClick={(): RecoveredValue => T(`check`)}
            />
          </span>
        )}
        <span className={`ui-asw-tb__group`}>
          {F ? (
            <Component$
              icon={W_component_BUnqa8Km}
              label={`Clear formatting`}
              onClick={E}
            />
          ) : (
            <Sn
              icon={Ce_component_BUnqa8Km}
              label={`More formatting`}
              items={se}
              align={`end`}
            />
          )}
        </span>
      </ComponentXn>
      <div
        ref={a as RecoveredValue}
        className={`ui-asw-doc`}
        contentEditable={!0}
        suppressContentEditableWarning={!0}
        role={`textbox`}
        aria-multiline={`true`}
        aria-label={`${name}, document`}
        spellCheck={!0}
        onFocus={(): RecoveredValue =>
          document.execCommand(`defaultParagraphSeparator`, !1, `p`)
        }
        onKeyDown={re}
        onInput={(e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = e.nativeEvent;
          (t.inputType === `insertText` && t.data === ` ` && A(),
            t.inputType === `insertParagraph` &&
              _(`ul[data-check] > li`)?.removeAttribute(`data-done`),
            b());
        }}
        onPaste={(e?: RecoveredValue): RecoveredValue => {
          (e.preventDefault(),
            document.execCommand(
              `insertText`,
              !1,
              e.clipboardData.getData(`text/plain`),
            ));
        }}
        onContextMenu={(e?: RecoveredValue): RecoveredValue => {
          (e.preventDefault(),
            M(e.clientX, e.clientY),
            j.open(e.clientX, e.clientY, `doc`, a.current));
        }}
        onPointerDown={(e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = e.target.closest(`ul[data-check] > li`);
          if (!t) return;
          let n: RecoveredValue = t.getBoundingClientRect();
          e.clientX - n.left < 22 && e.clientY - n.top < 22 && (e.preventDefault(), D(t));
        }}
      />
      {j.render(
        (): RecoveredValue => ({
          label: `Edit`,
          items: P(),
        }),
      )}
      <p className={`ui-asw-dc__foot ui-asw-num`}>
        {ce(l.words, `word`)}
        <i aria-hidden={`true`}>{` · `}</i>
        {ce(l.chars, `character`)}
        {edited && (
          <Y_component_BUnqa8Km.Fragment>
            <i aria-hidden={`true`}>{` · `}</i>
            {`Edited`}
          </Y_component_BUnqa8Km.Fragment>
        )}
      </p>
      <span className={`ui-asw-sr`} role={`status`} aria-live={`polite`}>
        {p}
      </span>
    </div>
  );
}
var In: RecoveredValue = 26,
  Ln: RecoveredValue = 22,
  Rn: RecoveredValue = 30,
  zn: RecoveredValue = 76,
  Bn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = ``;
    for (let n: RecoveredValue = e + 1; n > 0; n = Math.floor((n - 1) / 26))
      t = String.fromCharCode(65 + ((n - 1) % 26)) + t;
    return t;
  },
  Vn: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    [...e.toUpperCase()].reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e * 26 + t.charCodeAt(0) - 64,
      0,
    ) - 1,
  Hn: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    `${Bn(t)}${e + 1}`,
  Un: RecoveredValue = (e?: RecoveredValue): RecoveredValue => ({
    r1: Math.min(e.r, e.r2),
    r2: Math.max(e.r, e.r2),
    c1: Math.min(e.c, e.c2),
    c2: Math.max(e.c, e.c2),
  }),
  Wn: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    typeof e == `object` && !!e && `err` in e,
  Gn: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    !!e && (e.bold !== void 0 || (!!e.format && e.format !== `general`)),
  Kn: RecoveredValue =
    /^\s*([+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?|[+-]?\.\d+)\s*(%?)\s*([A-Za-zµ/]{0,4})\s*$/,
  qn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = Kn.exec(e);
    if (!t) return null;
    let n: RecoveredValue = parseFloat(t[1].replace(/,/g, ``));
    return t[2] ? n / 100 : n;
  },
  Jn: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = Kn.exec(e);
    return !!t && !t[3];
  };
function Yn(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = [],
    n: RecoveredValue = 0;
  for (; n < e.length; ) {
    let r: RecoveredValue = e.slice(n),
      i: RecoveredValue;
    if (!(i = /^\s+/.exec(r))) {
      if ((i = /^#REF!/i.exec(r)))
        t.push({
          t: `referr`,
        });
      else if ((i = /^"((?:[^"]|"")*)"/.exec(r)))
        t.push({
          t: `str`,
          v: i[1].replace(/""/g, `"`),
        });
      else if ((i = /^\$?([A-Za-z]{1,3})\$?(\d+)(?![A-Za-z0-9_(])/.exec(r)))
        t.push({
          t: `ref`,
          r: i[2] - 1,
          c: Vn(i[1]),
        });
      else if ((i = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(r)))
        t.push({
          t: `num`,
          v: parseFloat(i[0]),
        });
      else if ((i = /^[A-Za-z_][A-Za-z0-9_.]*/.exec(r)))
        t.push({
          t: `id`,
          v: i[0].toUpperCase(),
        });
      else if ((i = /^(?:<=|>=|<>|[-+*/^&=<>%(),:])/.exec(r)))
        t.push({
          t: i[0],
        });
      else
        throw {
          err: `#NAME?`,
        };
    }
    n += i[0].length;
  }
  return t;
}
var Xn: RecoveredValue = [`=`, `<>`, `<`, `>`, `<=`, `>=`];
function Zn(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = Yn(e),
    n: RecoveredValue = 0,
    r: RecoveredValue = (e?: RecoveredValue): RecoveredValue => t[n]?.t === e,
    i: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (!r(e))
        throw {
          err: `#NAME?`,
        };
      return t[n++];
    },
    a: RecoveredValue =
      (e?: RecoveredValue, r?: RecoveredValue): RecoveredValue =>
      (): RecoveredValue => {
        let i: RecoveredValue = e();
        for (; t[n] && r.includes(t[n].t); )
          i = {
            k: `bin`,
            op: t[n++].t,
            a: i,
            b: e(),
          };
        return i;
      },
    o: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = t[n++];
      if (!e)
        throw {
          err: `#NAME?`,
        };
      if (e.t === `num` || e.t === `str`)
        return {
          k: `lit`,
          v: e.v,
        };
      if (e.t === `referr`)
        return {
          k: `lit`,
          v: {
            err: `#REF!`,
          },
        };
      if (e.t === `ref`) {
        if (!r(`:`))
          return {
            k: `ref`,
            r: e.r,
            c: e.c,
          };
        n++;
        let t: RecoveredValue = i(`ref`);
        return {
          k: `range`,
          r1: Math.min(e.r, t.r),
          c1: Math.min(e.c, t.c),
          r2: Math.max(e.r, t.r),
          c2: Math.max(e.c, t.c),
        };
      }
      if (e.t === `id`) {
        if (r(`(`)) {
          n++;
          let t: RecoveredValue = [];
          if (!r(`)`)) for (t.push(l()); r(`,`); ) (n++, t.push(l()));
          return (
            i(`)`),
            {
              k: `fn`,
              name: e.v,
              args: t,
            }
          );
        }
        return e.v === `TRUE` || e.v === `FALSE`
          ? {
              k: `lit`,
              v: e.v === `TRUE`,
            }
          : {
              k: `lit`,
              v: {
                err: `#NAME?`,
              },
            };
      }
      if (e.t === `(`) {
        let e: RecoveredValue = l();
        return (i(`)`), e);
      }
      throw {
        err: `#NAME?`,
      };
    },
    s: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = o();
      for (; r(`%`); )
        (n++,
          (e = {
            k: `bin`,
            op: `/`,
            a: e,
            b: {
              k: `lit`,
              v: 100,
            },
          }));
      return e;
    },
    c: RecoveredValue = (): RecoveredValue =>
      r(`-`) || r(`+`)
        ? {
            k: `un`,
            op: t[n++].t,
            a: c(),
          }
        : s(),
    l: RecoveredValue = a(a(a(a(a(c, [`^`]), [`*`, `/`]), [`+`, `-`]), [`&`]), Xn),
    u: RecoveredValue = l();
  if (n < t.length)
    throw {
      err: `#NAME?`,
    };
  return u;
}
function Qn(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = new Map(),
    n: RecoveredValue = new Set(),
    r: RecoveredValue = (r?: RecoveredValue, i?: RecoveredValue): RecoveredValue => {
      if (r < 0 || i < 0 || i > 16383)
        return {
          err: `#REF!`,
        };
      let a: RecoveredValue = r * 16384 + i,
        o: RecoveredValue = t.get(a);
      if (o !== void 0) return o;
      if (n.has(a))
        return {
          err: `#REF!`,
        };
      let s: RecoveredValue = e(r, i),
        c: RecoveredValue;
      return (
        s.startsWith(`=`) && s.length > 1
          ? (n.add(a), (c = p(s.slice(1))), n.delete(a))
          : (c = s.trim() ? (qn(s) ?? s) : null),
        t.set(a, c),
        c
      );
    },
    i: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (Array.isArray(e))
        throw {
          err: `#VALUE!`,
        };
      return e;
    },
    a: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = i(e);
      if (t === null) return 0;
      if (typeof t == `number`) return t;
      if (typeof t == `boolean`) return +!!t;
      if (Wn(t)) throw t;
      let n: RecoveredValue = qn(t);
      if (n === null)
        throw {
          err: `#VALUE!`,
        };
      return n;
    },
    o: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = i(e);
      if (Wn(t)) throw t;
      return t === null ? `` : typeof t == `boolean` ? (t ? `TRUE` : `FALSE`) : String(t);
    },
    s: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      typeof e == `number` ? 1 : typeof e == `string` ? 2 : 3,
    c: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      if (Wn(e)) throw e;
      if (Wn(t)) throw t;
      let n: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
          typeof e == `string` ? `` : typeof e != `boolean` && 0,
        r: RecoveredValue = e === null ? n(t) : e,
        i: RecoveredValue = t === null ? n(e) : t;
      return s(r) === s(i)
        ? typeof r == `string`
          ? r.toLowerCase().localeCompare(String(i).toLowerCase())
          : Number(r) - Number(i)
        : s(r) - s(i);
    },
    l: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = [];
      for (let n of e) {
        let e: RecoveredValue = f(n);
        if (Array.isArray(e))
          for (let n of e) {
            if (Wn(n)) throw n;
            typeof n == `number` && t.push(n);
          }
        else n.k === `ref` ? typeof e == `number` && t.push(e) : t.push(a(e));
      }
      return t;
    },
    u: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = 0;
      for (let r of e) {
        let e: RecoveredValue;
        try {
          e = f(r);
        } catch {
          continue;
        }
        for (let r of Array.isArray(e) ? e : [e])
          (t ? r !== null && r !== `` : typeof r == `number`) && n++;
      }
      return n;
    },
    d: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        e.reduce((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + t, 0);
      switch (e) {
        case `SUM`:
          return n(l(t));
        case `AVERAGE`: {
          let e: RecoveredValue = l(t);
          if (!e.length)
            throw {
              err: `#DIV/0!`,
            };
          return n(e) / e.length;
        }
        case `MIN`:
        case `MAX`: {
          let n: RecoveredValue = l(t);
          return n.length ? (e === `MIN` ? Math.min(...n) : Math.max(...n)) : 0;
        }
        case `COUNT`:
          return u(t, !1);
        case `COUNTA`:
          return u(t, !0);
        case `ABS`:
          if (t.length !== 1)
            throw {
              err: `#VALUE!`,
            };
          return Math.abs(a(f(t[0])));
        case `ROUND`: {
          if (t.length < 1 || t.length > 2)
            throw {
              err: `#VALUE!`,
            };
          let e: RecoveredValue = a(f(t[0])),
            n: RecoveredValue = 10 ** Math.trunc(t[1] ? a(f(t[1])) : 0);
          return (Math.sign(e) * Math.round(Math.abs(e) * n * (1 + 2 ** -52))) / n;
        }
        case `IF`: {
          if (t.length < 2 || t.length > 3)
            throw {
              err: `#VALUE!`,
            };
          let e: RecoveredValue = i(f(t[0]));
          if (Wn(e)) throw e;
          if (typeof e == `string`)
            throw {
              err: `#VALUE!`,
            };
          let n: RecoveredValue = typeof e == `boolean` ? e : !!e,
            r: RecoveredValue = n ? t[1] : t[2];
          if (!r) return n ? 0 : !1;
          let a: RecoveredValue = i(f(r));
          return a === null ? 0 : a;
        }
        default:
          throw {
            err: `#NAME?`,
          };
      }
    },
    f: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      switch (e.k) {
        case `lit`:
          if (Wn(e.v)) throw e.v;
          return e.v;
        case `ref`: {
          let t: RecoveredValue = r(e.r, e.c);
          if (Wn(t)) throw t;
          return t;
        }
        case `range`: {
          if (e.r1 < 0 || e.c1 < 0)
            throw {
              err: `#REF!`,
            };
          let t: RecoveredValue = [];
          for (let n: RecoveredValue = e.r1; n <= e.r2; n++)
            for (let i: RecoveredValue = e.c1; i <= e.c2; i++) t.push(r(n, i));
          return t;
        }
        case `un`: {
          let t: RecoveredValue = a(f(e.a));
          return e.op === `-` ? -t : t;
        }
        case `fn`:
          return d(e.name, e.args);
        case `bin`: {
          if (e.op === `&`) return o(f(e.a)) + o(f(e.b));
          if (Xn.includes(e.op)) {
            let t: RecoveredValue = c(i(f(e.a)), i(f(e.b)));
            return (
              {
                "=": t === 0,
                "<>": t !== 0,
                "<": t < 0,
                ">": t > 0,
                "<=": t <= 0,
                ">=": t >= 0,
              } as Record<string, RecoveredValue>
            )[e.op];
          }
          let t: RecoveredValue = a(f(e.a)),
            n: RecoveredValue = a(f(e.b));
          if (e.op === `+`) return t + n;
          if (e.op === `-`) return t - n;
          if (e.op === `*`) return t * n;
          if (e.op === `^`) return t ** n;
          if (n === 0)
            throw {
              err: `#DIV/0!`,
            };
          return t / n;
        }
      }
    },
    p: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      try {
        let t: RecoveredValue = i(f(Zn(e)));
        return typeof t == `number` && !Number.isFinite(t)
          ? {
              err: `#NUM!`,
            }
          : t === null
            ? 0
            : t;
      } catch (e: RecoveredValue) {
        return Wn(e)
          ? {
              err: e.err,
            }
          : {
              err: `#NAME?`,
            };
      }
    };
  return r;
}
var $n: RecoveredValue = {
    general: {
      label: `General`,
      icon: Je_component_BUnqa8Km,
      f: new Intl.NumberFormat(`en`, {
        maximumFractionDigits: 10,
      }),
    },
    number: {
      label: `Number`,
      icon: Ye_component_BUnqa8Km,
      f: new Intl.NumberFormat(`en`, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    },
    percent: {
      label: `Percent`,
      icon: De_component_BUnqa8Km,
      f: new Intl.NumberFormat(`en`, {
        style: `percent`,
        maximumFractionDigits: 2,
      }),
    },
    currency: {
      label: `Currency`,
      icon: j_component_BUnqa8Km,
      f: new Intl.NumberFormat(`en`, {
        style: `currency`,
        currency: `USD`,
      }),
    },
  },
  er: RecoveredValue = new Intl.NumberFormat(`en`, {
    maximumFractionDigits: 4,
  }),
  tr: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n: RecoveredValue = `general`,
  ): RecoveredValue =>
    Wn(t)
      ? t.err
      : typeof t == `boolean`
        ? t
          ? `TRUE`
          : `FALSE`
        : t === null
          ? ``
          : typeof t == `number`
            ? !e.startsWith(`=`) && (n === `general` || !Jn(e))
              ? e
              : $n[n].f.format(t)
            : t,
  nr: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Array.from(
      {
        length: e,
      },
      (): RecoveredValue => ``,
    ) as RecoveredValue[],
  rr: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
    let n: RecoveredValue = Math.max(
        1,
        ...e.map((e?: RecoveredValue): RecoveredValue => e.length),
      ),
      r: RecoveredValue = e.map(
        (e?: RecoveredValue): RecoveredValue =>
          Array.from(
            {
              length: n,
            },
            (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => e[n] ?? ``,
          ) as RecoveredValue[],
      );
    return {
      data: r,
      style: r.map(
        (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
          e.map(
            (e?: RecoveredValue, r?: RecoveredValue): RecoveredValue =>
              t?.styles?.[`${n}:${r}`],
          ),
      ),
      widths: t?.widths ?? [],
    };
  },
  ir: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = 0,
      n: RecoveredValue = 0;
    e.data.forEach(
      (r?: RecoveredValue, i?: RecoveredValue): RecoveredValue =>
        r.forEach((r?: RecoveredValue, a?: RecoveredValue): RecoveredValue => {
          (r !== `` || Gn(e.style[i]?.[a])) &&
            ((t = Math.max(t, i + 1)), (n = Math.max(n, a + 1)));
        }),
    );
    let r: RecoveredValue = {};
    return (
      e.style.forEach(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          e?.forEach(
            (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
              Gn(e) && (r[`${t}:${n}`] = e),
          ),
      ),
      {
        table: t
          ? e.data.slice(0, t).map((e?: RecoveredValue): RecoveredValue => e.slice(0, n))
          : [[``]],
        sheet: {
          widths: e.widths,
          styles: r,
        },
      }
    );
  },
  ar: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
    let n: RecoveredValue = Math.max(
        e.data[0]?.length ?? 0,
        ...t.map((e?: RecoveredValue): RecoveredValue => e.c + 1),
      ),
      r: RecoveredValue = Math.max(
        e.data.length,
        ...t.map((e?: RecoveredValue): RecoveredValue => e.r + 1),
      ),
      i: RecoveredValue = Array.from(
        {
          length: r,
        },
        (t?: RecoveredValue, r?: RecoveredValue): RecoveredValue => {
          let i: RecoveredValue = e.data[r] ?? [];
          return i.length < n ? [...i, ...nr(n - i.length)] : i;
        },
      ) as RecoveredValue[],
      a: RecoveredValue = Array.from(
        {
          length: r,
        },
        (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => e.style[n] ?? [],
      ) as RecoveredValue[],
      o: RecoveredValue = new Set();
    for (let e of t)
      (o.has(e.r) || ((i[e.r] = [...i[e.r]]), (a[e.r] = [...a[e.r]]), o.add(e.r)),
        e.v !== void 0 && (i[e.r][e.c] = e.v),
        e.s !== void 0 && (a[e.r][e.c] = e.s));
    return {
      ...e,
      data: i,
      style: a,
    };
  },
  or: RecoveredValue =
    /(?<![A-Za-z0-9_$.])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?::(\$?)([A-Za-z]{1,3})(\$?)(\d+))?(?![A-Za-z0-9_(])/g,
  sr: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    e
      .split(/("(?:[^"]|"")*")/)
      .map(
        (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
          n % 2
            ? e
            : e.replace(
                or,
                (
                  e?: RecoveredValue,
                  n?: RecoveredValue,
                  r?: RecoveredValue,
                  i?: RecoveredValue,
                  a?: RecoveredValue,
                  o?: RecoveredValue,
                  s?: RecoveredValue,
                  c?: RecoveredValue,
                  l?: RecoveredValue,
                ): RecoveredValue => {
                  let u: RecoveredValue = t(
                    a - 1,
                    Vn(r),
                    s === void 0 ? `one` : `start`,
                    !!i,
                    !!n,
                  );
                  if (s === void 0) return u ? `${n}${Bn(u[1])}${i}${u[0] + 1}` : `#REF!`;
                  let d: RecoveredValue = t(l - 1, Vn(s), `end`, !!c, !!o);
                  return !u || !d || u[0] > d[0] || u[1] > d[1]
                    ? `#REF!`
                    : `${n}${Bn(u[1])}${i}${u[0] + 1}:${o}${Bn(d[1])}${c}${d[0] + 1}`;
                },
              ),
      )
      .join(``),
  cr: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    e.map(
      (e?: RecoveredValue): RecoveredValue =>
        e.some((e?: RecoveredValue): RecoveredValue => e.startsWith(`=`))
          ? e.map(
              (e?: RecoveredValue): RecoveredValue => (e.startsWith(`=`) ? sr(e, t) : e),
            )
          : e,
    ),
  lr: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue =>
    e.startsWith(`=`)
      ? sr(
          e,
          (
            e?: RecoveredValue,
            r?: RecoveredValue,
            i?: RecoveredValue,
            a?: RecoveredValue,
            o?: RecoveredValue,
          ): RecoveredValue =>
            (a ? e : e + t) < 0 || (o ? r : r + n) < 0
              ? null
              : [a ? e : e + t, o ? r : r + n],
        )
      : e,
  ur: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue => {
    let r: RecoveredValue = e.data[0]?.length ?? 1,
      i: RecoveredValue = Array.from(
        {
          length: e.data.length,
        },
        (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => [
          ...(e.style[n] ?? []),
        ],
      ) as RecoveredValue[];
    if (t === `row`) {
      let t: RecoveredValue = [...e.data];
      for (; t.length < n; ) (t.push(nr(r)), i.push([]));
      return (
        t.splice(n, 0, nr(r)),
        i.splice(n, 0, []),
        {
          ...e,
          data: cr(
            t,
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => [
              e >= n ? e + 1 : e,
              t,
            ],
          ),
          style: i,
        }
      );
    }
    let a: RecoveredValue = e.data.map((e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.length < n ? [...e, ...nr(n - e.length)] : [...e];
      return (t.splice(n, 0, ``), t);
    });
    i.forEach(
      (e?: RecoveredValue): RecoveredValue => e.length >= n && e.splice(n, 0, void 0),
    );
    let o: RecoveredValue = [...e.widths];
    return (
      o.length >= n && o.splice(n, 0, zn),
      {
        data: cr(
          a,
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => [
            e,
            t >= n ? t + 1 : t,
          ],
        ),
        style: i,
        widths: o,
      }
    );
  },
  dr: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
    r?: RecoveredValue,
  ): RecoveredValue => {
    let i: RecoveredValue = r - n + 1,
      a: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e < n ? e : e > r ? e - i : t === `start` ? n : t === `end` ? n - 1 : null;
    if (t === `row`) {
      let t: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          t < n || t > r,
        i: RecoveredValue = (
          e?: RecoveredValue,
          t?: RecoveredValue,
          n?: RecoveredValue,
        ): RecoveredValue => {
          let r: RecoveredValue = a(e, n);
          return r === null || r < 0 ? null : [r, t];
        };
      return {
        ...e,
        data: cr(e.data.filter(t), i),
        style: (
          Array.from(
            {
              length: e.data.length,
            },
            (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => e.style[n] ?? [],
          ) as RecoveredValue[]
        ).filter(t),
      };
    }
    let o: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        t < n || t > r,
      s: RecoveredValue = (
        e?: RecoveredValue,
        t?: RecoveredValue,
        n?: RecoveredValue,
      ): RecoveredValue => {
        let r: RecoveredValue = a(t, n);
        return r === null || r < 0 ? null : [e, r];
      },
      c: RecoveredValue = e.data.map((e?: RecoveredValue): RecoveredValue => e.filter(o));
    return {
      data: cr(c[0]?.length ? c : c.map((): RecoveredValue => [``]), s),
      style: e.style.map((e?: RecoveredValue): RecoveredValue => (e ?? []).filter(o)),
      widths: e.widths.filter(o),
    };
  },
  fr: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
    r?: RecoveredValue,
  ): RecoveredValue => {
    let i: RecoveredValue = e.data.findIndex(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          t > 0 && e.every((e?: RecoveredValue): RecoveredValue => e === ``),
      ),
      a: RecoveredValue = i < 0 ? e.data.length : i;
    if (a < 3) return e;
    let o: RecoveredValue = Array.from(
        {
          length: e.data.length,
        },
        (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => e.style[n] ?? [],
      ) as RecoveredValue[],
      s: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = r(e, t);
        return n === null || n === `` ? null : n;
      },
      c: RecoveredValue = (
        Array.from(
          {
            length: a - 1,
          },
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => t + 1,
        ) as RecoveredValue[]
      ).sort((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
        let r: RecoveredValue = s(e),
          i: RecoveredValue = s(t);
        if (r === null || i === null) return r === i ? e - t : r === null ? 1 : -1;
        if (typeof r == `number` && typeof i == `number`) return (r - i) * n || e - t;
        if ((typeof r == `number`) != (typeof i == `number`))
          return (typeof r == `number` ? -1 : 1) * n;
        let a: RecoveredValue = Wn(r) ? r.err : String(r),
          o: RecoveredValue = Wn(i) ? i.err : String(i);
        return (
          a.localeCompare(o, `en`, {
            numeric: !0,
            sensitivity: `base`,
          }) * n || e - t
        );
      });
    return {
      ...e,
      data: [
        e.data[0],
        ...c.map((t?: RecoveredValue): RecoveredValue => e.data[t]),
        ...e.data.slice(a),
      ],
      style: [
        o[0],
        ...c.map((e?: RecoveredValue): RecoveredValue => o[e]),
        ...o.slice(a),
      ],
    };
  },
  pr: RecoveredValue = null,
  mr: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n: RecoveredValue = 40,
  ): RecoveredValue => {
    pr ??= document.createElement(`canvas`).getContext(`2d`);
    let r: RecoveredValue = (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
      pr
        ? ((pr.font = `${n ? 500 : 400} 12px ${t}`), pr.measureText(e).width)
        : e.length * 7;
    return Math.round(
      Z_component_BUnqa8Km(
        Math.max(0, ...e.map((e?: RecoveredValue): RecoveredValue => r(e.text, e.bold))) +
          20,
        n,
        320,
      ),
    );
  };
function ComponentHr({
  name,
  table,
  meta,
  width,
  memo,
  onMemo,
  onChange,
}: RecoveredValue): RecoveredValue {
  let s: RecoveredValue = (0, J_component_BUnqa8Km.useId)().replace(/:/g, ``),
    c: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    l: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    u: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    d: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [f, p]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(
      (): RecoveredValue => rr(table, meta),
    ),
    m: RecoveredValue = (0, J_component_BUnqa8Km.useRef)({
      past: [],
      future: [],
    }),
    [h, g]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(
      memo?.sel ?? {
        r: 1,
        c: 0,
        r2: 1,
        c2: 0,
      },
    ),
    [_, v]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    y: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(_);
  y.current = _;
  let [b, x]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    [S, C]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    T: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(S);
  T.current = S;
  let E: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    D: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    O: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(!1),
    [k, ne]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(``),
    A: RecoveredValue = f.data.length + 4,
    j: RecoveredValue = (f.data[0]?.length ?? 1) + 2,
    M: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      f.data[e]?.[t] ?? ``,
    N: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      f.style[e]?.[t],
    P: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      N(e, t)?.bold ?? e === 0,
    F: RecoveredValue = (0, J_component_BUnqa8Km.useMemo)(
      (): RecoveredValue =>
        Qn(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
            f.data[e]?.[t] ?? ``,
        ),
      [f.data],
    ),
    ae: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      tr(M(e, t), F(e, t), N(e, t)?.format),
    oe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => f.widths[e] ?? zn,
    se: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = Rn;
      for (let n: RecoveredValue = 0; n < e; n++) t += oe(n);
      return t;
    },
    ce: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      `${s}-${e}-${t}`,
    I: RecoveredValue = Un(h),
    ue: RecoveredValue = (): RecoveredValue =>
      c.current ? getComputedStyle(c.current).fontFamily : `Inter, system-ui, sans-serif`,
    de: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n: RecoveredValue = 40,
    ): RecoveredValue => {
      let r: RecoveredValue = Qn(
        (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => e.data[t]?.[n] ?? ``,
      );
      return mr(
        e.data.map(
          (n?: RecoveredValue, i?: RecoveredValue): RecoveredValue => ({
            text: tr(n[t] ?? ``, r(i, t), e.style[i]?.[t]?.format),
            bold: e.style[i]?.[t]?.bold ?? i === 0,
          }),
        ),
        ue(),
        n,
      );
    };
  (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
    meta?.widths?.length ||
      p(
        (e?: RecoveredValue): RecoveredValue => ({
          ...e,
          widths: (e.data[0] ?? []).map(
            (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
              Math.max(zn, de(e, n)),
          ),
        }),
      );
  }, []);
  let fe: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(h);
  fe.current = h;
  let pe: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(onMemo);
  ((pe.current = onMemo),
    (0, J_component_BUnqa8Km.useEffect)(
      (): RecoveredValue => (): RecoveredValue =>
        pe.current({
          sel: fe.current,
        }),
      [],
    ));
  let L: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (ne(``), window.setTimeout((): RecoveredValue => ne(e), 30));
    },
    me: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = ir(e);
      onChange(t.table, t.sheet);
    },
    R: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      (m.current.past.push(f),
        m.current.past.length > 100 && m.current.past.shift(),
        (m.current.future = []),
        p(e),
        me(e),
        t && L(t));
    },
    z: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = m.current.past.pop();
      if (!e) return L(`Nothing to undo`);
      (m.current.future.push(f), p(e), me(e), L(`Undone`));
    },
    ye: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = m.current.future.pop();
      if (!e) return L(`Nothing to redo`);
      (m.current.past.push(f), p(e), me(e), L(`Redone`));
    },
    be: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = Z_component_BUnqa8Km(e, 0, A - 1),
        r: RecoveredValue = Z_component_BUnqa8Km(t, 0, j - 1);
      g({
        r: n,
        c: r,
        r2: n,
        c2: r,
      });
    },
    B: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      g(
        (n?: RecoveredValue): RecoveredValue => ({
          ...n,
          r2: Z_component_BUnqa8Km(e, 0, A - 1),
          c2: Z_component_BUnqa8Km(t, 0, j - 1),
        }),
      ),
    xe: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
      r?: RecoveredValue,
    ): RecoveredValue => {
      let i: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          e >= 0 && e < A && t >= 0 && t < j,
        a: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          M(e, t) !== ``,
        o: RecoveredValue = e + n,
        s: RecoveredValue = t + r;
      if (!i(o, s)) return [e, t];
      if (a(e, t) && a(o, s)) {
        for (; i(o + n, s + r) && a(o + n, s + r); ) ((o += n), (s += r));
        return [o, s];
      }
      for (; i(o, s) && !a(o, s); ) ((o += n), (s += r));
      return i(o, s)
        ? [o, s]
        : [Z_component_BUnqa8Km(o, 0, A - 1), Z_component_BUnqa8Km(s, 0, j - 1)];
    };
  (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = l.current;
    if (!e) return;
    let t: RecoveredValue = se(h.c2) - Rn,
      n: RecoveredValue = se(h.c2) + oe(h.c2);
    (t < e.scrollLeft
      ? (e.scrollLeft = t)
      : n > e.scrollLeft + e.clientWidth && (e.scrollLeft = n - e.clientWidth),
      c.current?.contains(document.activeElement as HTMLElement) &&
        gn(document.getElementById(ce(h.r2, h.c2))));
  }, [h]);
  let Se: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    v({
      r: h.r,
      c: h.c,
      text: t ?? M(h.r, h.c),
      mode: e,
      from: `cell`,
    });
  (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
    if (_?.from !== `cell`) return;
    let e: RecoveredValue = u.current;
    e &&
      (document.activeElement as HTMLElement) !== e &&
      (e.focus({
        preventScroll: !0,
      }),
      e.setSelectionRange(e.value.length, e.value.length));
  }, [_?.from, _?.r, _?.c]);
  let V: RecoveredValue = (
      e: RecoveredValue = 0,
      t: RecoveredValue = 0,
      n: RecoveredValue = !0,
    ): RecoveredValue => {
      let r: RecoveredValue = y.current;
      r &&
        ((y.current = null),
        v(null),
        r.text !== M(r.r, r.c) &&
          R(
            ar(f, [
              {
                r: r.r,
                c: r.c,
                v: r.text,
              },
            ]),
            r.text.startsWith(`=`)
              ? `${Hn(r.r, r.c)}: ${tr(r.text, Qn((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (e === r.r && t === r.c ? r.text : M(e, t)))(r.r, r.c))}`
              : void 0,
          ),
        (e || t) && be(r.r + e, r.c + t),
        n &&
          c.current?.focus({
            preventScroll: !0,
          }));
    },
    Ce: RecoveredValue = (): RecoveredValue => {
      ((y.current = null),
        v(null),
        c.current?.focus({
          preventScroll: !0,
        }));
    },
    we: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      e.stopPropagation();
      let t: RecoveredValue = e.key;
      t === `Enter`
        ? (e.preventDefault(), V(e.shiftKey ? -1 : 1, 0))
        : t === `Tab`
          ? (e.preventDefault(), V(0, e.shiftKey ? -1 : 1))
          : t === `Escape`
            ? (e.preventDefault(), Ce())
            : y.current?.mode === `enter` &&
              y.current.from === `cell` &&
              t.startsWith(`Arrow`) &&
              (e.preventDefault(),
              V(
                t === `ArrowDown` ? 1 : t === `ArrowUp` ? -1 : 0,
                t === `ArrowRight` ? 1 : t === `ArrowLeft` ? -1 : 0,
              ));
    },
    Te: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = [];
      for (let t: RecoveredValue = I.r1; t <= Math.min(I.r2, f.data.length - 1); t++)
        for (let n: RecoveredValue = I.c1; n <= I.c2; n++)
          M(t, n) !== `` &&
            e.push({
              r: t,
              c: n,
              v: ``,
            });
      e.length && R(ar(f, e), `Cleared`);
    },
    H: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = [];
      for (let t: RecoveredValue = I.r1; t <= Math.min(I.r2, A - 5); t++)
        for (let r: RecoveredValue = I.c1; r <= Math.min(I.c2, j - 3); r++)
          n.push({
            r: t,
            c: r,
            s: e(N(t, r), t, r),
          });
      n.length && R(ar(f, n), t);
    },
    Ee: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = !P(h.r, h.c);
      H(
        (t?: RecoveredValue): RecoveredValue => ({
          ...t,
          bold: e,
        }),
        e ? `Bold` : `Not bold`,
      );
    },
    De: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      H(
        (t?: RecoveredValue): RecoveredValue => ({
          ...t,
          format: e,
        }),
        `${$n[e].label} format`,
      ),
    Oe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      R(
        fr(f, h.c, e, F),
        `Sorted by column ${Bn(h.c)}, ${e === 1 ? `A to Z` : `Z to A`}`,
      );
    },
    U: RecoveredValue = (e?: RecoveredValue, t: RecoveredValue = !1): RecoveredValue => {
      let n: RecoveredValue = e === `row` ? (t ? I.r2 + 1 : I.r1) : t ? I.c2 + 1 : I.c1;
      (R(
        ur(f, e, n),
        e === `row`
          ? `Row inserted ${t ? `below` : `above`} ${(t ? I.r2 : I.r1) + 1}`
          : `Column inserted ${t ? `right` : `left`} of ${Bn(t ? I.c2 : I.c1)}`,
      ),
        t ||
          g(
            (t?: RecoveredValue): RecoveredValue =>
              e === `row`
                ? {
                    ...t,
                    r: t.r + 1,
                    r2: t.r2 + 1,
                  }
                : {
                    ...t,
                    c: t.c + 1,
                    c2: t.c2 + 1,
                  },
          ));
    },
    ke: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let [t, n]: RecoveredValue = e === `row` ? [I.r1, I.r2] : [I.c1, I.c2];
      if (!(e === `row` ? t < f.data.length : t < (f.data[0]?.length ?? 0)))
        return L(`Nothing to delete there`);
      let r: RecoveredValue = dr(f, e, t, n);
      (R(
        r,
        e === `row`
          ? t === n
            ? `Row ${t + 1} deleted`
            : `Rows ${t + 1} to ${n + 1} deleted`
          : t === n
            ? `Column ${Bn(t)} deleted`
            : `Columns ${Bn(t)} to ${Bn(n)} deleted`,
      ),
        be(e === `row` ? t : h.r, e === `row` ? h.c : t));
    },
    je: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = [],
        n: RecoveredValue = [],
        r: RecoveredValue = [];
      for (let e: RecoveredValue = I.r1; e <= I.r2; e++) {
        (t.push([]), n.push([]));
        let i: RecoveredValue = [];
        for (let r: RecoveredValue = I.c1; r <= I.c2; r++)
          (t[t.length - 1].push(M(e, r)),
            n[n.length - 1].push(N(e, r)),
            i.push(ae(e, r)));
        r.push(i.join(`	`));
      }
      let i: RecoveredValue = r.join(`
`);
      D.current = {
        text: i,
        raw: t,
        style: n,
        r: I.r1,
        c: I.c1,
        cut: e,
      };
      let a: RecoveredValue = (I.r2 - I.r1 + 1) * (I.c2 - I.c1 + 1);
      return (
        L(
          `${e ? `Cut` : `Copied`} ${a === 1 ? Hn(I.r1, I.c1) : `${on_component_BUnqa8Km.format(a)} cells`}`,
        ),
        i
      );
    },
    W: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e
          .replace(
            /\r\n?/g,
            `
`,
          )
          .replace(/\n$/, ``),
        n: RecoveredValue = D.current && D.current.text === t ? D.current : null,
        r: RecoveredValue = n
          ? n.raw
          : t
              .split(
                `
`,
              )
              .map((e?: RecoveredValue): RecoveredValue => e.split(`	`));
      if (!r.length || (!t && !n)) return;
      let i: RecoveredValue = f;
      if (n?.cut) {
        let e: RecoveredValue = [];
        for (let t: RecoveredValue = 0; t < n.raw.length; t++)
          for (let r: RecoveredValue = 0; r < n.raw[t].length; r++)
            e.push({
              r: n.r + t,
              c: n.c + r,
              v: ``,
              s: void 0,
            });
        i = ar(i, e);
      }
      let a: RecoveredValue = [];
      for (let e: RecoveredValue = 0; e < r.length; e++)
        for (let t: RecoveredValue = 0; t < r[e].length; t++)
          a.push({
            r: I.r1 + e,
            c: I.c1 + t,
            v: n && !n.cut ? lr(r[e][t], I.r1 - n.r, I.c1 - n.c) : r[e][t],
            ...(n
              ? {
                  s: n.style[e]?.[t],
                }
              : {}),
          });
      let o: RecoveredValue = Math.max(
        ...r.map((e?: RecoveredValue): RecoveredValue => e.length),
      );
      (R(
        ar(i, a),
        `Pasted ${a.length === 1 ? `1 cell` : `${on_component_BUnqa8Km.format(a.length)} cells`}`,
      ),
        g({
          r: I.r1,
          c: I.c1,
          r2: I.r1 + r.length - 1,
          c2: I.c1 + o - 1,
        }),
        n?.cut && (D.current = null));
    },
    Fe: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = T.current;
      if ((C(null), !e)) return;
      let t: RecoveredValue = Math.max(e.r - I.r2, I.r1 - e.r, 0),
        n: RecoveredValue = Math.max(e.c - I.c2, I.c1 - e.c, 0);
      if (!t && !n) return;
      let r: RecoveredValue = I.r2 - I.r1 + 1,
        i: RecoveredValue = I.c2 - I.c1 + 1,
        a: RecoveredValue =
          t >= n
            ? {
                r1: Math.min(I.r1, e.r),
                r2: Math.max(I.r2, e.r),
                c1: I.c1,
                c2: I.c2,
              }
            : {
                r1: I.r1,
                r2: I.r2,
                c1: Math.min(I.c1, e.c),
                c2: Math.max(I.c2, e.c),
              },
        o: RecoveredValue = [];
      for (let e: RecoveredValue = a.r1; e <= a.r2; e++)
        for (let t: RecoveredValue = a.c1; t <= a.c2; t++) {
          if (e >= I.r1 && e <= I.r2 && t >= I.c1 && t <= I.c2) continue;
          let n: RecoveredValue = I.r1 + ((((e - I.r1) % r) + r) % r),
            a: RecoveredValue = I.c1 + ((((t - I.c1) % i) + i) % i);
          o.push({
            r: e,
            c: t,
            v: lr(M(n, a), e - n, t - a),
            s: N(n, a),
          });
        }
      (R(ar(f, o), `Filled ${on_component_BUnqa8Km.format(o.length)} cells`),
        g({
          r: I.r1,
          c: I.c1,
          r2: a.r1 < I.r1 ? a.r1 : a.r2,
          c2: a.c1 < I.c1 ? a.c1 : a.c2,
        }));
    };
  (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = (): RecoveredValue => {
      (E.current === `fill` && Fe(), (E.current = null));
    };
    return (
      window.addEventListener(`pointerup`, e),
      (): RecoveredValue => window.removeEventListener(`pointerup`, e)
    );
  });
  let Ie: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        (t.preventDefault(), t.stopPropagation());
        let n: RecoveredValue = f,
          r: RecoveredValue = t.clientX,
          i: RecoveredValue = oe(e),
          a: RecoveredValue = t.currentTarget,
          o: RecoveredValue =
            (l.current &&
              l.current.offsetWidth &&
              l.current.getBoundingClientRect().width / l.current.offsetWidth) ||
            1;
        a.setPointerCapture(t.pointerId);
        let s: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
            let r: RecoveredValue = [...n.widths];
            for (; r.length <= e; ) r.push(zn);
            return ((r[e] = Math.round(Z_component_BUnqa8Km(t, 32, 480))), r);
          },
          c: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
            p(
              (t?: RecoveredValue): RecoveredValue => ({
                ...t,
                widths: s(i + (e.clientX - r) / o),
              }),
            ),
          u: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
            if (
              (a.removeEventListener(`pointermove`, c),
              a.removeEventListener(`pointerup`, u),
              t.clientX === r)
            )
              return p(n);
            let l: RecoveredValue = {
              ...n,
              widths: s(i + (t.clientX - r) / o),
            };
            (m.current.past.push(n),
              (m.current.future = []),
              p(l),
              me(l),
              L(`Column ${Bn(e)} ${l.widths[e]} pixels wide`));
          };
        (a.addEventListener(`pointermove`, c), a.addEventListener(`pointerup`, u));
      },
    Le: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = [...f.widths];
      for (; t.length <= e; ) t.push(zn);
      ((t[e] = de(f, e)),
        R(
          {
            ...f,
            widths: t,
          },
          `Column ${Bn(e)} fitted`,
        ));
    },
    G: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.target !== c.current) return;
      let t: RecoveredValue = e.metaKey || e.ctrlKey;
      if (Cn(e))
        return (
          e.preventDefault(),
          it.openOn(document.getElementById(ce(h.r, h.c)), `cells`, c.current)
        );
      let n: RecoveredValue = e.key,
        r: RecoveredValue = (
          {
            ArrowUp: [-1, 0],
            ArrowDown: [1, 0],
            ArrowLeft: [0, -1],
            ArrowRight: [0, 1],
          } as Record<string, RecoveredValue>
        )[n];
      if (r) {
        e.preventDefault();
        let [n, i]: RecoveredValue = r;
        if (e.shiftKey) {
          let [e, r]: RecoveredValue = t ? xe(h.r2, h.c2, n, i) : [h.r2 + n, h.c2 + i];
          return B(e, r);
        }
        let [a, o]: RecoveredValue = t ? xe(h.r, h.c, n, i) : [h.r + n, h.c + i];
        return be(a, o);
      }
      if (n === `Tab`) {
        let t: RecoveredValue = h.c + (e.shiftKey ? -1 : 1);
        return t < 0 || t >= j ? void 0 : (e.preventDefault(), be(h.r, t));
      }
      if (n === `Enter`)
        return (e.preventDefault(), be(h.r + (e.shiftKey ? -1 : 1), h.c));
      if (n === `F2`) return (e.preventDefault(), Se(`edit`));
      if (n === `Delete` || n === `Backspace`) return (e.preventDefault(), Te());
      if (n === `Home`) return (e.preventDefault(), be(t ? 0 : h.r, 0));
      if (n === `End` && t)
        return (e.preventDefault(), be(f.data.length - 1, (f.data[0]?.length ?? 1) - 1));
      if (t && !e.altKey) {
        let t: RecoveredValue = n.toLowerCase();
        if (t === `a`)
          (e.preventDefault(),
            g({
              r: 0,
              c: 0,
              r2: f.data.length - 1,
              c2: (f.data[0]?.length ?? 1) - 1,
            }),
            L(`All cells selected`));
        else if (t === `z`) (e.preventDefault(), e.shiftKey ? ye() : z());
        else if (t === `y`) (e.preventDefault(), ye());
        else if (t === `b`) (e.preventDefault(), Ee());
        else if (t === `c` || t === `x`) {
          let e: RecoveredValue = je(t === `x`);
          ((O.current = !1),
            window.setTimeout(
              (): RecoveredValue =>
                !O.current &&
                navigator.clipboard?.writeText(e).catch((): RecoveredValue => {}),
            ));
        } else
          t === `v` &&
            ((O.current = !1),
            window.setTimeout(async (): Promise<RecoveredValue> => {
              if (O.current) return;
              let e: RecoveredValue;
              try {
                e = await navigator.clipboard.readText();
              } catch {
                e = void 0;
              }
              W(e ?? D.current?.text ?? ``);
            }));
        return;
      }
      n.length === 1 && !e.altKey && (e.preventDefault(), Se(`enter`, n));
    },
    Re: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
    ): RecoveredValue => {
      let r: RecoveredValue = y.current;
      if (
        r &&
        r.text.startsWith(`=`) &&
        /[=(+\-*/,:<>&^]$/.test(r.text) &&
        (r.r !== e || r.c !== t)
      ) {
        (n.preventDefault(),
          v({
            ...r,
            text: r.text + Hn(e, t),
          }),
          (r.from === `bar` ? d : u).current?.focus());
        return;
      }
      n.button === 0 &&
        (r && (r.r !== e || r.c !== t) && V(0, 0, !1),
        !(r && r.r === e && r.c === t) &&
          (n.shiftKey
            ? B(e, t)
            : (g({
                r: e,
                c: t,
                r2: e,
                c2: t,
              }),
              (E.current = `cells`))));
    },
    ze: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      t.button === 0 &&
        (V(0, 0, !1),
        t.shiftKey
          ? g(
              (t?: RecoveredValue): RecoveredValue => ({
                ...t,
                r: 0,
                r2: A - 1,
                c2: e,
              }),
            )
          : g({
              r: 0,
              c: e,
              r2: A - 1,
              c2: e,
            }),
        (E.current = `cols`));
    },
    Be: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      t.button === 0 &&
        (V(0, 0, !1),
        t.shiftKey
          ? g(
              (t?: RecoveredValue): RecoveredValue => ({
                ...t,
                c: 0,
                c2: j - 1,
                r2: e,
              }),
            )
          : g({
              r: e,
              c: 0,
              r2: e,
              c2: j - 1,
            }),
        (E.current = `rows`));
    },
    Ve: RecoveredValue = I.r1 !== I.r2 || I.c1 !== I.c2,
    K: RecoveredValue = (0, J_component_BUnqa8Km.useMemo)((): RecoveredValue => {
      if (!Ve) return null;
      let e: RecoveredValue = [];
      for (let t: RecoveredValue = I.r1; t <= Math.min(I.r2, f.data.length - 1); t++)
        for (let n: RecoveredValue = I.c1; n <= I.c2; n++) {
          let r: RecoveredValue = F(t, n);
          typeof r == `number` && e.push(r);
        }
      if (!e.length) return null;
      let t: RecoveredValue = e.reduce(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + t,
        0,
      );
      return {
        sum: t,
        avg: t / e.length,
        n: e.length,
      };
    }, [Ve, I.r1, I.r2, I.c1, I.c2, F, f.data.length]),
    We: RecoveredValue = Ve ? `${Hn(I.r1, I.c1)}:${Hn(I.r2, I.c2)}` : Hn(h.r, h.c),
    Ge: RecoveredValue = N(h.r, h.c)?.format ?? `general`,
    Ke: RecoveredValue = se(j),
    q: RecoveredValue = {
      left: se(I.c1),
      top: Ln + I.r1 * In,
      width: se(I.c2 + 1) - se(I.c1),
      height: (I.r2 - I.r1 + 1) * In,
    },
    [Ye, Xe]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null);
  (0, J_component_BUnqa8Km.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = l.current;
    if (!e) return;
    let t: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        document.getElementById(ce(e, t))?.getBoundingClientRect(),
      n: RecoveredValue = t(I.r1, I.c1),
      r: RecoveredValue = t(I.r2, I.c2),
      i: RecoveredValue = t(h.r, h.c);
    if (!n || !r || !i)
      return Xe((e?: RecoveredValue): RecoveredValue => (e === null ? e : null));
    let a: RecoveredValue = e.getBoundingClientRect(),
      o: RecoveredValue = (e.offsetWidth && a.width / e.offsetWidth) || 1,
      s: RecoveredValue = (t?: RecoveredValue): RecoveredValue =>
        (t - a.left) / o + e.scrollLeft,
      c: RecoveredValue = (t?: RecoveredValue): RecoveredValue =>
        (t - a.top) / o + e.scrollTop,
      u: RecoveredValue = {
        range: {
          left: s(n.left),
          top: c(n.top),
          width: (r.right - n.left) / o,
          height: (r.bottom - n.top) / o,
        },
        cell: {
          left: s(i.left),
          top: c(i.top),
          width: i.width / o,
          height: i.height / o,
        },
      };
    Xe(
      (e?: RecoveredValue): RecoveredValue =>
        e && JSON.stringify(e) === JSON.stringify(u) ? e : u,
    );
  });
  let Ze: RecoveredValue = Ye?.range ?? q,
    Qe: RecoveredValue = S
      ? ((): RecoveredValue => {
          let e: RecoveredValue =
              Math.max(S.r - I.r2, I.r1 - S.r, 0) >= Math.max(S.c - I.c2, I.c1 - S.c, 0),
            t: RecoveredValue = e ? Math.min(I.r1, S.r) : I.r1,
            n: RecoveredValue = e ? Math.max(I.r2, S.r) : I.r2,
            r: RecoveredValue = e ? I.c1 : Math.min(I.c1, S.c),
            i: RecoveredValue = e ? I.c2 : Math.max(I.c2, S.c);
          return {
            left: se(r),
            top: Ln + t * In,
            width: se(i + 1) - se(r),
            height: (n - t + 1) * In,
          };
        })()
      : null,
    $e: RecoveredValue = Bn(h.c),
    et: RecoveredValue = width >= 360,
    tt: RecoveredValue = [
      {
        label: `Insert row above`,
        icon: ve_component_BUnqa8Km,
        onSelect: (): RecoveredValue => U(`row`),
      },
      {
        label: `Insert column left`,
        icon: he_component_BUnqa8Km,
        onSelect: (): RecoveredValue => U(`col`),
      },
      {
        label: I.r1 === I.r2 ? `Delete row` : `Delete rows`,
        icon: Ne_component_BUnqa8Km,
        divider: !et,
        onSelect: (): RecoveredValue => ke(`row`),
      },
      {
        label: I.c1 === I.c2 ? `Delete column` : `Delete columns`,
        icon: ee_component_BUnqa8Km,
        onSelect: (): RecoveredValue => ke(`col`),
      },
    ],
    rt: RecoveredValue = (): RecoveredValue =>
      window.setTimeout(
        (): RecoveredValue =>
          c.current?.focus({
            preventScroll: !0,
          }),
      ),
    it: RecoveredValue = wn(),
    at: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      e >= I.r1 && e <= I.r2 && t >= I.c1 && t <= I.c2,
    ot: RecoveredValue = (): RecoveredValue => [
      {
        label: `Cut`,
        icon: Pe_component_BUnqa8Km,
        keys: `${Q_component_BUnqa8Km}X`,
        onSelect: (): RecoveredValue => Dn(je(!0)),
      },
      {
        label: `Copy`,
        icon: te_component_BUnqa8Km,
        keys: `${Q_component_BUnqa8Km}C`,
        onSelect: (): RecoveredValue => Dn(je(!1)),
      },
      {
        label: `Paste`,
        icon: w_component_BUnqa8Km,
        keys: `${Q_component_BUnqa8Km}V`,
        onSelect: async (): Promise<RecoveredValue> => {
          let e: RecoveredValue = await On();
          if (e === null && !D.current)
            return L(
              `Press ${Q_component_BUnqa8Km}V to paste – the browser keeps the clipboard to itself here`,
            );
          W(e ?? D.current?.text ?? ``);
        },
      },
      {
        label: `Insert`,
        icon: Ae_component_BUnqa8Km,
        divider: !0,
        submenu: [
          {
            label: `Row above`,
            icon: ve_component_BUnqa8Km,
            onSelect: (): RecoveredValue => U(`row`),
          },
          {
            label: `Row below`,
            icon: _e_component_BUnqa8Km,
            onSelect: (): RecoveredValue => U(`row`, !0),
          },
          {
            label: `Column left`,
            icon: he_component_BUnqa8Km,
            divider: !0,
            onSelect: (): RecoveredValue => U(`col`),
          },
          {
            label: `Column right`,
            icon: ge_component_BUnqa8Km,
            onSelect: (): RecoveredValue => U(`col`, !0),
          },
        ],
      },
      {
        label: `Delete`,
        icon: re_component_BUnqa8Km,
        submenu: [
          {
            label: `Clear contents`,
            icon: ie_component_BUnqa8Km,
            keys: `⌫`,
            onSelect: Te,
          },
          {
            label: I.r1 === I.r2 ? `Delete row` : `Delete rows`,
            icon: Ne_component_BUnqa8Km,
            divider: !0,
            onSelect: (): RecoveredValue => ke(`row`),
          },
          {
            label: I.c1 === I.c2 ? `Delete column` : `Delete columns`,
            icon: ee_component_BUnqa8Km,
            onSelect: (): RecoveredValue => ke(`col`),
          },
        ],
      },
      {
        label: `Sort`,
        icon: He_component_BUnqa8Km,
        submenu: [
          {
            label: `A to Z by ${$e}`,
            icon: He_component_BUnqa8Km,
            onSelect: (): RecoveredValue => Oe(1),
          },
          {
            label: `Z to A by ${$e}`,
            icon: Ue_component_BUnqa8Km,
            onSelect: (): RecoveredValue => Oe(-1),
          },
        ],
      },
      {
        label: `Format`,
        icon: Je_component_BUnqa8Km,
        submenu: [
          {
            label: `Bold`,
            icon: qe_component_BUnqa8Km,
            keys: `${Q_component_BUnqa8Km}B`,
            checked: P(h.r, h.c),
            onSelect: Ee,
          },
          ...Object.keys($n).map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => ({
              label: $n[e].label,
              icon: $n[e].icon,
              checked: e === Ge,
              divider: t === 0,
              onSelect: (): RecoveredValue => De(e),
            }),
          ),
        ],
      },
    ],
    st: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e.map(
        (e?: RecoveredValue): RecoveredValue => ({
          ...e,
          onSelect: (): RecoveredValue => (e.onSelect?.(), rt()),
        }),
      );
  return (
    <div className={`ui-asw-sh`}>
      <ComponentXn label={`Sheet`} className={`ui-asw-sh__tools`}>
        <span className={`ui-asw-tb__group`}>
          <Component$
            icon={nt_component_BUnqa8Km}
            label={`Undo`}
            keys={`${Q_component_BUnqa8Km}Z`}
            disabled={!m.current.past.length}
            onClick={z}
          />
          <Component$
            icon={Me_component_BUnqa8Km}
            label={`Redo`}
            keys={`${vn}${Q_component_BUnqa8Km}Z`}
            disabled={!m.current.future.length}
            onClick={ye}
          />
        </span>
        <span className={`ui-asw-tb__group`}>
          <Component$
            icon={qe_component_BUnqa8Km}
            label={`Bold`}
            keys={`${Q_component_BUnqa8Km}B`}
            pressed={P(h.r, h.c)}
            onClick={Ee}
          />
          <Sn
            icon={$n[Ge].icon}
            label={`Number format`}
            text={width >= 400 ? $n[Ge].label : void 0}
            items={st(
              Object.keys($n).map(
                (e?: RecoveredValue): RecoveredValue => ({
                  label: $n[e].label,
                  icon: $n[e].icon,
                  checked: e === Ge,
                  onSelect: (): RecoveredValue => De(e),
                }),
              ),
            )}
          />
        </span>
        <span className={`ui-asw-tb__group`}>
          <Component$
            icon={He_component_BUnqa8Km}
            label={`Sort A to Z by ${$e}`}
            onClick={(): RecoveredValue => Oe(1)}
          />
          <Component$
            icon={Ue_component_BUnqa8Km}
            label={`Sort Z to A by ${$e}`}
            onClick={(): RecoveredValue => Oe(-1)}
          />
        </span>
        <span className={`ui-asw-tb__group`}>
          {et ? (
            <Y_component_BUnqa8Km.Fragment>
              <Component$
                icon={ve_component_BUnqa8Km}
                label={`Insert row above`}
                onClick={(): RecoveredValue => U(`row`)}
              />
              <Component$
                icon={he_component_BUnqa8Km}
                label={`Insert column left`}
                onClick={(): RecoveredValue => U(`col`)}
              />
              <Sn
                icon={re_component_BUnqa8Km}
                label={`Delete`}
                items={st(tt.slice(2))}
                align={`end`}
              />
            </Y_component_BUnqa8Km.Fragment>
          ) : (
            <Sn
              icon={le_component_BUnqa8Km}
              label={`Rows and columns`}
              items={st(tt)}
              align={`end`}
            />
          )}
        </span>
      </ComponentXn>
      <div className={`ui-asw-sh__bar`}>
        <input
          className={`ui-asw-sh__ref ui-asw-num`}
          aria-label={`Cell reference – type one to go there`}
          value={b ?? We}
          spellCheck={!1}
          onFocus={(e?: RecoveredValue): RecoveredValue => {
            (x(We), e.currentTarget.select());
          }}
          onChange={(e?: RecoveredValue): RecoveredValue => x(e.target.value)}
          onBlur={(): RecoveredValue => x(null)}
          onKeyDown={(e?: RecoveredValue): RecoveredValue => {
            if (
              (e.stopPropagation(),
              e.key === `Escape` && (e.preventDefault(), c.current?.focus()),
              e.key !== `Enter`)
            )
              return;
            e.preventDefault();
            let t: RecoveredValue =
              /^\s*([A-Za-z]{1,3})(\d+)(?::([A-Za-z]{1,3})(\d+))?\s*$/.exec(b ?? ``);
            if (!t) return L(`Not a cell reference`);
            let n: RecoveredValue = t[2] - 1,
              r: RecoveredValue = Vn(t[1]);
            (g({
              r: Z_component_BUnqa8Km(n, 0, A - 1),
              c: Z_component_BUnqa8Km(r, 0, j - 1),
              r2: Z_component_BUnqa8Km(t[4] ? t[4] - 1 : n, 0, A - 1),
              c2: Z_component_BUnqa8Km(t[3] ? Vn(t[3]) : r, 0, j - 1),
            }),
              c.current?.focus());
          }}
        />
        <span className={`ui-asw-sh__fx`} aria-hidden={`true`}>{`fx`}</span>
        <input
          ref={d as RecoveredValue}
          className={`ui-asw-sh__formula`}
          aria-label={`Contents of ${Hn(h.r, h.c)}`}
          value={_ ? _.text : M(h.r, h.c)}
          spellCheck={!1}
          onFocus={(): RecoveredValue =>
            !y.current &&
            v({
              r: h.r,
              c: h.c,
              text: M(h.r, h.c),
              mode: `edit`,
              from: `bar`,
            })
          }
          onChange={(e?: RecoveredValue): RecoveredValue =>
            v(
              (t?: RecoveredValue): RecoveredValue => ({
                ...(t ?? {
                  r: h.r,
                  c: h.c,
                  mode: `edit`,
                }),
                from: `bar`,
                text: e.target.value,
              }),
            )
          }
          onKeyDown={we}
          onBlur={(): RecoveredValue => V(0, 0, !1)}
        />
      </div>
      <div ref={l as RecoveredValue} className={`ui-asw-sh__wrap`}>
        <table
          ref={c as RecoveredValue}
          className={`ui-asw-sh__grid`}
          role={`grid`}
          tabIndex={0}
          aria-label={`${name}, sheet`}
          aria-multiselectable={`true`}
          aria-rowcount={A + 1}
          aria-colcount={j + 1}
          aria-activedescendant={ce(h.r, h.c)}
          style={
            {
              width: `max(100%, ${Ke}px)`,
            } as RecoveredValue
          }
          onKeyDown={G}
          onContextMenu={(e?: RecoveredValue): RecoveredValue => {
            e.target.closest(`input`) ||
              (e.preventDefault(),
              V(0, 0, !1),
              c.current?.focus({
                preventScroll: !0,
              }),
              it.open(e.clientX, e.clientY, `cells`, c.current));
          }}
          onCopy={(e?: RecoveredValue): RecoveredValue => {
            if (e.target === c.current) {
              (e.preventDefault(), (O.current = !0));
              try {
                e.clipboardData.setData(`text/plain`, D.current?.text ?? je(!1));
              } catch {}
            }
          }}
          onCut={(e?: RecoveredValue): RecoveredValue => {
            if (e.target === c.current) {
              (e.preventDefault(), (O.current = !0));
              try {
                e.clipboardData.setData(`text/plain`, D.current?.text ?? je(!0));
              } catch {}
            }
          }}
          onPaste={(e?: RecoveredValue): RecoveredValue => {
            if (e.target !== c.current) return;
            (e.preventDefault(), (O.current = !0));
            let t: RecoveredValue = ``;
            try {
              t = e.clipboardData.getData(`text/plain`);
            } catch {
              t = D.current?.text ?? ``;
            }
            W(t || D.current?.text || ``);
          }}
        >
          <colgroup>
            <col
              style={
                {
                  width: Rn,
                } as RecoveredValue
              }
            />
            {
              Array.from(
                {
                  length: j,
                },
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <col
                    style={
                      {
                        width: oe(t),
                      } as RecoveredValue
                    }
                    key={t}
                  />
                ),
              ) as RecoveredValue[]
            }
            <col />
          </colgroup>
          <thead>
            <tr role={`row`} aria-rowindex={1}>
              <th
                className={`ui-asw-sh__corner`}
                role={`columnheader`}
                aria-label={`Select all`}
                onPointerDown={(e?: RecoveredValue): RecoveredValue => {
                  e.button === 0 &&
                    (V(0, 0, !1),
                    g({
                      r: 0,
                      c: 0,
                      r2: A - 1,
                      c2: j - 1,
                    }));
                }}
              />
              {
                Array.from(
                  {
                    length: j,
                  },
                  (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                    <th
                      className={`ui-asw-sh__col`}
                      role={`columnheader`}
                      aria-label={`Column ${Bn(t)}`}
                      data-on={(t >= I.c1 && t <= I.c2) || void 0}
                      onPointerDown={(e?: RecoveredValue): RecoveredValue => ze(t, e)}
                      onContextMenu={(): RecoveredValue =>
                        !at(0, t) || I.r1 !== 0 || I.r2 !== A - 1
                          ? g({
                              r: 0,
                              c: t,
                              r2: A - 1,
                              c2: t,
                            })
                          : void 0
                      }
                      onPointerEnter={(): RecoveredValue =>
                        E.current === `cols` &&
                        g(
                          (e?: RecoveredValue): RecoveredValue => ({
                            ...e,
                            c2: t,
                          }),
                        )
                      }
                      key={t}
                    >
                      {Bn(t)}
                      <span
                        className={`ui-asw-sh__resize`}
                        aria-hidden={`true`}
                        onPointerDown={Ie(t)}
                        onDoubleClick={(): RecoveredValue => Le(t)}
                      />
                    </th>
                  ),
                ) as RecoveredValue[]
              }
              <th className={`ui-asw-sh__pad`} aria-hidden={`true`} />
            </tr>
          </thead>
          <tbody>
            {
              Array.from(
                {
                  length: A,
                },
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <tr role={`row`} aria-rowindex={t + 2} key={t}>
                    <th
                      className={`ui-asw-sh__row ui-asw-num`}
                      role={`rowheader`}
                      aria-label={`Row ${t + 1}`}
                      data-on={(t >= I.r1 && t <= I.r2) || void 0}
                      onPointerDown={(e?: RecoveredValue): RecoveredValue => Be(t, e)}
                      onContextMenu={(): RecoveredValue =>
                        !at(t, 0) || I.c1 !== 0 || I.c2 !== j - 1
                          ? g({
                              r: t,
                              c: 0,
                              r2: t,
                              c2: j - 1,
                            })
                          : void 0
                      }
                      onPointerEnter={(): RecoveredValue =>
                        E.current === `rows` &&
                        g(
                          (e?: RecoveredValue): RecoveredValue => ({
                            ...e,
                            r2: t,
                          }),
                        )
                      }
                    >
                      {t + 1}
                    </th>
                    {
                      Array.from(
                        {
                          length: j,
                        },
                        (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
                          let r: RecoveredValue = F(t, n),
                            i: RecoveredValue = tr(M(t, n), r, N(t, n)?.format),
                            a: RecoveredValue =
                              t >= I.r1 && t <= I.r2 && n >= I.c1 && n <= I.c2,
                            o: RecoveredValue = _ && _.r === t && _.c === n;
                          return (
                            <td
                              id={ce(t, n)}
                              role={`gridcell`}
                              className={`ui-asw-sh__cell`}
                              aria-selected={a}
                              aria-label={`${i || `Empty`}, ${Hn(t, n)}`}
                              data-num={typeof r == `number` || void 0}
                              data-err={Wn(r) || void 0}
                              data-bold={P(t, n) || void 0}
                              data-sel={(a && Ve && (t !== h.r || n !== h.c)) || void 0}
                              onPointerDown={(e?: RecoveredValue): RecoveredValue =>
                                Re(t, n, e)
                              }
                              onContextMenu={(): RecoveredValue =>
                                !at(t, n) &&
                                g({
                                  r: t,
                                  c: n,
                                  r2: t,
                                  c2: n,
                                })
                              }
                              onPointerEnter={(): RecoveredValue => {
                                E.current === `cells`
                                  ? B(t, n)
                                  : E.current === `fill` &&
                                    C({
                                      r: t,
                                      c: n,
                                    });
                              }}
                              onDoubleClick={(): RecoveredValue => {
                                (g({
                                  r: t,
                                  c: n,
                                  r2: t,
                                  c2: n,
                                }),
                                  v({
                                    r: t,
                                    c: n,
                                    text: M(t, n),
                                    mode: `edit`,
                                    from: `cell`,
                                  }));
                              }}
                              children={
                                o && _.from === `cell` ? (
                                  <input
                                    ref={u as RecoveredValue}
                                    className={`ui-asw-sh__input`}
                                    aria-label={`Edit ${Hn(t, n)}`}
                                    value={_.text}
                                    spellCheck={!1}
                                    style={
                                      {
                                        minWidth: oe(n),
                                      } as RecoveredValue
                                    }
                                    size={Math.max(1, _.text.length + 2)}
                                    onChange={(e?: RecoveredValue): RecoveredValue =>
                                      v(
                                        (t?: RecoveredValue): RecoveredValue =>
                                          t && {
                                            ...t,
                                            text: e.target.value,
                                          },
                                      )
                                    }
                                    onKeyDown={we}
                                    onBlur={(e?: RecoveredValue): RecoveredValue => {
                                      e.relatedTarget === d.current
                                        ? v(
                                            (e?: RecoveredValue): RecoveredValue =>
                                              e && {
                                                ...e,
                                                from: `bar`,
                                              },
                                          )
                                        : V(0, 0, !1);
                                    }}
                                  />
                                ) : o ? (
                                  _.text
                                ) : (
                                  i
                                )
                              }
                              key={n}
                            />
                          );
                        },
                      ) as RecoveredValue[]
                    }
                    <td className={`ui-asw-sh__pad`} aria-hidden={`true`} />
                  </tr>
                ),
              ) as RecoveredValue[]
            }
          </tbody>
        </table>
        {Ve && (
          <div
            className={`ui-asw-sh__ring ui-asw-sh__ring--cell`}
            style={Ye?.cell as RecoveredValue}
            aria-hidden={`true`}
          />
        )}
        <div
          className={`ui-asw-sh__ring`}
          data-range={Ve || void 0}
          style={Ze as RecoveredValue}
          aria-hidden={`true`}
        >
          <span
            className={`ui-asw-sh__handle`}
            onPointerDown={(e?: RecoveredValue): RecoveredValue => {
              e.button === 0 &&
                (e.preventDefault(),
                e.stopPropagation(),
                V(0, 0, !1),
                (E.current = `fill`),
                c.current?.focus({
                  preventScroll: !0,
                }));
            }}
          />
        </div>
        {Qe && (
          <div
            className={`ui-asw-sh__fill`}
            style={Qe as RecoveredValue}
            aria-hidden={`true`}
          />
        )}
      </div>
      {it.render(
        (): RecoveredValue => ({
          label: `${We}`,
          items: ot(),
        }),
      )}
      <div className={`ui-asw-sh__status ui-asw-num`} aria-hidden={!K || void 0}>
        {K && (
          <Y_component_BUnqa8Km.Fragment>
            <span>
              {`Sum `}
              <b>{er.format(K.sum)}</b>
            </span>
            <span>
              {`Average `}
              <b>{er.format(K.avg)}</b>
            </span>
            <span>
              {`Count `}
              <b>{on_component_BUnqa8Km.format(K.n)}</b>
            </span>
          </Y_component_BUnqa8Km.Fragment>
        )}
      </div>
      <span className={`ui-asw-sr`} role={`status`} aria-live={`polite`}>
        {k}
      </span>
    </div>
  );
}
var gr: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    typeof e == `string`
      ? {
          name: e,
        }
      : e,
  _r: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.includes(`.`) ? e.slice(e.lastIndexOf(`.`) + 1).toLowerCase() : ``,
  vr: RecoveredValue = {
    md: `Markdown`,
    csv: `CSV`,
    tsv: `TSV`,
    xlsx: `Spreadsheet`,
    json: `JSON`,
    yaml: `YAML`,
    yml: `YAML`,
    env: `Environment`,
    png: `PNG image`,
    jpg: `JPEG image`,
    svg: `SVG image`,
    pdf: `PDF`,
    ts: `TypeScript`,
    js: `JavaScript`,
    txt: `Plain text`,
  },
  yr: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.kind === `Folder` || !!e.files || !_r(e.name),
  br: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.kind ?? (yr(e) ? `Folder` : (vr[_r(e.name)] ?? `${_r(e.name).toUpperCase()} file`)),
  xr: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    typeof e == `number`
      ? e
      : typeof e == `string`
        ? (qn(e) ?? 0) *
          ((
            {
              k: 1e3,
              m: 1e6,
              g: 1e9,
            } as Record<string, RecoveredValue>
          )[/([kmg])b/i.exec(e)?.[1].toLowerCase() ?? ``] ?? 1)
        : -1,
  Sr: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
    if (yr(e))
      return t === void 0
        ? `--`
        : t === 1
          ? `1 item`
          : `${on_component_BUnqa8Km.format(t)} items`;
    if (typeof e.size == `string`) return e.size;
    if (typeof e.size != `number`) return `--`;
    if (e.size < 1e3) return `${e.size} bytes`;
    let [n, r]: RecoveredValue =
      e.size < 1e6
        ? [e.size / 1e3, `KB`]
        : e.size < 1e9
          ? [e.size / 1e6, `MB`]
          : [e.size / 1e9, `GB`];
    return `${n < 10 ? n.toFixed(1).replace(/\.0$/, ``) : Math.round(n)} ${r}`;
  },
  Cr: RecoveredValue = new Intl.DateTimeFormat(`en`, {
    hour: `2-digit`,
    minute: `2-digit`,
    hourCycle: `h23`,
  }),
  wr: RecoveredValue = new Intl.DateTimeFormat(`en`, {
    month: `short`,
    day: `numeric`,
  }),
  Tr: RecoveredValue = new Intl.DateTimeFormat(`en`, {
    month: `short`,
    day: `numeric`,
    year: `numeric`,
  }),
  Er: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n: RecoveredValue = !1,
  ): RecoveredValue => {
    if (e === void 0) return `--`;
    let r: RecoveredValue = new Date(e);
    if (Number.isNaN(+r)) return String(e);
    let i: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime(),
      a: RecoveredValue = Math.round((i(new Date(t)) - i(r)) / 864e5);
    return a === 0
      ? n
        ? Cr.format(r)
        : `Today, ${Cr.format(r)}`
      : a === 1
        ? n
          ? `Yesterday`
          : `Yesterday, ${Cr.format(r)}`
        : r.getFullYear() === new Date(t).getFullYear()
          ? wr.format(r)
          : Tr.format(r);
  },
  Dr: RecoveredValue = [
    {
      key: `name`,
      label: `Name`,
      icon: Je_component_BUnqa8Km,
    },
    {
      key: `kind`,
      label: `Kind`,
      icon: N_component_BUnqa8Km,
    },
    {
      key: `size`,
      label: `Size`,
      icon: de_component_BUnqa8Km,
    },
    {
      key: `modified`,
      label: `Date modified`,
      icon: x_component_BUnqa8Km,
    },
  ];
function Or({
  name,
  entries,
  lookup,
  width,
  memo,
  onMemo,
  onOpen,
  onSeed,
  onChange,
}: RecoveredValue): RecoveredValue {
  let l: RecoveredValue = (0, J_component_BUnqa8Km.useId)().replace(/:/g, ``),
    u: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    d: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [m, _]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(memo?.path ?? []),
    [y, b]: RecoveredValue = (0, J_component_BUnqa8Km.useState)({
      back: [],
      fwd: [],
    }),
    [x, S]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(memo?.view ?? `list`),
    [C, w]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(
      memo?.sort ?? {
        key: `name`,
        dir: 1,
      },
    ),
    [T, ee]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(``),
    [E, D]: RecoveredValue = (0, J_component_BUnqa8Km.useState)([]),
    [k, A]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    j: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    [M, ie]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(!1),
    [N, P]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(null),
    [F, ae]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(``),
    oe: RecoveredValue = (0, J_component_BUnqa8Km.useRef)({
      text: ``,
      at: 0,
    }),
    I: RecoveredValue = Date.now(),
    le: RecoveredValue = (0, J_component_BUnqa8Km.useRef)({
      path: m,
      view: x,
      sort: C,
    });
  le.current = {
    path: m,
    view: x,
    sort: C,
  };
  let de: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(onMemo);
  ((de.current = onMemo),
    (0, J_component_BUnqa8Km.useEffect)(
      (): RecoveredValue => (): RecoveredValue => de.current(le.current),
      [],
    ));
  let fe: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      (e.files ?? lookup(e.name)?.files)?.map(gr),
    pe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = entries.map(gr);
      for (let t of e) {
        let e: RecoveredValue = n.find(
            (e?: RecoveredValue): RecoveredValue => e.name === t,
          ),
          r: RecoveredValue = e && fe(e);
        if (!r) return null;
        n = r;
      }
      return n;
    },
    L: RecoveredValue = pe(m) ?? entries.map(gr),
    me: RecoveredValue = ((): RecoveredValue => {
      let e: RecoveredValue = T.trim().toLowerCase(),
        t: RecoveredValue = e
          ? L.filter(
              (t?: RecoveredValue): RecoveredValue => t.name.toLowerCase().includes(e),
            )
          : [...L],
        n: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
          let n: RecoveredValue = e.name.localeCompare(t.name, `en`, {
            numeric: !0,
            sensitivity: `base`,
          });
          return C.key === `kind`
            ? br(e).localeCompare(br(t)) || n
            : C.key === `size`
              ? xr(e.size) - xr(t.size) || n
              : (C.key === `modified` &&
                  (new Date(e.modified ?? 0).getTime() || 0) -
                    (new Date(t.modified ?? 0).getTime() || 0)) ||
                n;
        };
      return t.sort(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          Number(yr(t)) - Number(yr(e)) || n(e, t) * C.dir,
      );
    })(),
    R: RecoveredValue = me.map((e?: RecoveredValue): RecoveredValue => e.name),
    z: RecoveredValue =
      me.find((e?: RecoveredValue): RecoveredValue => e.name === k) ?? null,
    he: RecoveredValue = (e?: RecoveredValue): RecoveredValue => `${l}-${R.indexOf(e)}`,
    ge: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (ae(``), window.setTimeout((): RecoveredValue => ae(e), 30));
    },
    _e: RecoveredValue = (
      t?: RecoveredValue,
      n: RecoveredValue = `push`,
      r?: RecoveredValue,
    ): RecoveredValue => {
      if (!pe(t)) return;
      (b(
        (e?: RecoveredValue): RecoveredValue =>
          n === `push`
            ? {
                back: [...e.back, m],
                fwd: [],
              }
            : n === `back`
              ? {
                  back: e.back.slice(0, -1),
                  fwd: [...e.fwd, m],
                }
              : {
                  back: [...e.back, m],
                  fwd: e.fwd.slice(0, -1),
                },
      ),
        _(t),
        ee(``),
        ie(!1),
        D(r ? [r] : []),
        A(r ?? null),
        (j.current = r ?? null));
      let i: RecoveredValue = pe(t).length;
      ge(`${t.at(-1) ?? name}, ${i === 1 ? `1 item` : `${i} items`}`);
    },
    ve: RecoveredValue = (): RecoveredValue =>
      y.back.length &&
      _e(
        y.back[y.back.length - 1],
        `back`,
        m.length > y.back[y.back.length - 1].length
          ? m[y.back[y.back.length - 1].length]
          : void 0,
      ),
    ye: RecoveredValue = (): RecoveredValue =>
      y.fwd.length && _e(y.fwd[y.fwd.length - 1], `fwd`),
    be: RecoveredValue = (): RecoveredValue =>
      m.length && _e(m.slice(0, -1), `push`, m[m.length - 1]),
    B: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      yr(e) ? (fe(e) ? _e([...m, e.name]) : ge(`${e.name} is empty`)) : onOpen(e.name),
    Se: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (yr(e)) {
        let t: RecoveredValue = fe(e) ?? [];
        onSeed(e.name, {
          updated: t.length === 1 ? `1 item` : `${t.length} items`,
          files: t,
        });
      }
      onOpen(e.name);
    },
    V: RecoveredValue = (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
      let r: RecoveredValue = (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
        n.length
          ? t.map(
              (e?: RecoveredValue): RecoveredValue =>
                e.name === n[0]
                  ? {
                      ...e,
                      files: r(fe(e) ?? [], n.slice(1)),
                    }
                  : e,
            )
          : e(t);
      (onChange(r(entries.map(gr), m)), ge(n));
    },
    Ce: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = new Set(
        L.map((e?: RecoveredValue): RecoveredValue => e.name.toLowerCase()),
      );
      if (!t.has(e.toLowerCase())) return e;
      let n: RecoveredValue = e.lastIndexOf(`.`) > 0 ? e.lastIndexOf(`.`) : e.length;
      for (let r: RecoveredValue = 2; ; r++) {
        let i: RecoveredValue = `${e.slice(0, n)} ${r}${e.slice(n)}`;
        if (!t.has(i.toLowerCase())) return i;
      }
    },
    we: RecoveredValue = (): RecoveredValue => (E.length ? E : k ? [k] : []),
    Te: RecoveredValue = (0, J_component_BUnqa8Km.useRef)(null),
    Ee: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      if (Te.current !== e) return;
      ((Te.current = null), P(null));
      let r: RecoveredValue = t.trim();
      if (
        (window.setTimeout(
          (): RecoveredValue =>
            u.current?.focus({
              preventScroll: !0,
            }),
        ),
        !r || r === e)
      )
        return;
      if (
        L.some(
          (t?: RecoveredValue): RecoveredValue =>
            t.name.toLowerCase() === r.toLowerCase() && t.name !== e,
        )
      )
        return ge(`“${r}” is already taken`);
      let i: RecoveredValue = lookup(e);
      (i && onSeed(r, i),
        V(
          (t?: RecoveredValue): RecoveredValue =>
            t.map(
              (t?: RecoveredValue): RecoveredValue =>
                t.name === e
                  ? {
                      ...t,
                      name: r,
                      modified: Date.now(),
                    }
                  : t,
            ),
          `Renamed to ${r}`,
        ),
        D([r]),
        A(r),
        (j.current = r));
    },
    De: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = we();
      if (!e.length) return;
      let t: RecoveredValue = [];
      (V(
        (r?: RecoveredValue): RecoveredValue => {
          let i: RecoveredValue = [...r];
          for (let a of e) {
            let e: RecoveredValue = r.find(
              (e?: RecoveredValue): RecoveredValue => e.name === a,
            );
            if (!e) continue;
            let o: RecoveredValue =
                a.lastIndexOf(`.`) > 0 && !yr(e) ? a.lastIndexOf(`.`) : a.length,
              c: RecoveredValue = Ce(`${a.slice(0, o)} copy${a.slice(o)}`),
              l: RecoveredValue = lookup(a);
            (l && onSeed(c, l),
              i.push({
                ...e,
                name: c,
                modified: Date.now(),
              }),
              t.push(c));
          }
          return i;
        },
        e.length === 1 ? `Duplicated ${e[0]}` : `Duplicated ${e.length} items`,
      ),
        D(t),
        A(t[t.length - 1] ?? null));
    },
    Oe: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = we();
      if (!e.length) return;
      let t: RecoveredValue = R.indexOf(e[0]),
        n: RecoveredValue = R.filter(
          (t?: RecoveredValue): RecoveredValue => !e.includes(t),
        );
      V(
        (t?: RecoveredValue): RecoveredValue =>
          t.filter((t?: RecoveredValue): RecoveredValue => !e.includes(t.name)),
        e.length === 1
          ? `Moved ${e[0]} to the trash`
          : `Moved ${e.length} items to the trash`,
      );
      let r: RecoveredValue = n[Math.min(t, n.length - 1)] ?? null;
      (D(r ? [r] : []), A(r), ie(!1));
    },
    U: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = Ce(`untitled folder`);
      (V(
        (t?: RecoveredValue): RecoveredValue => [
          ...t,
          {
            name: e,
            kind: `Folder`,
            files: [],
            modified: Date.now(),
          },
        ],
        `New folder ${e}`,
      ),
        ee(``),
        D([e]),
        A(e),
        (j.current = e),
        P(e));
    },
    ke: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = we();
      e.length &&
        (Dn(
          e.join(`
`),
        ),
        ge(e.length === 1 ? `Copied “${e[0]}”` : `Copied ${e.length} names`));
    },
    Ae: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      if (t.metaKey || t.ctrlKey)
        (D(
          (t?: RecoveredValue): RecoveredValue =>
            t.includes(e)
              ? t.filter((t?: RecoveredValue): RecoveredValue => t !== e)
              : [...t, e],
        ),
          (j.current = e));
      else if (t.shiftKey && j.current && R.includes(j.current)) {
        let t: RecoveredValue = R.indexOf(j.current),
          n: RecoveredValue = R.indexOf(e);
        D(R.slice(Math.min(t, n), Math.max(t, n) + 1));
      } else (D([e]), (j.current = e));
      A(e);
    },
    je: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      if (!R.length) return;
      let n: RecoveredValue = k ? R.indexOf(k) : -1,
        r: RecoveredValue =
          R[
            Z_component_BUnqa8Km(
              n < 0 ? (e > 0 ? 0 : R.length - 1) : n + e,
              0,
              R.length - 1,
            )
          ];
      (Ae(r, {
        shiftKey: t,
      }),
        t || (j.current = r));
    },
    Me: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = [...(u.current?.children ?? [])],
        t: RecoveredValue = e[0]?.offsetTop,
        n: RecoveredValue = e.findIndex(
          (e?: RecoveredValue): RecoveredValue => e.offsetTop !== t,
        );
      return n < 0 ? e.length || 1 : n;
    };
  ((0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
    k &&
      document.getElementById(he(k))?.scrollIntoView({
        block: `nearest`,
        inline: `nearest`,
      });
  }, [k]),
    (0, J_component_BUnqa8Km.useEffect)((): RecoveredValue => {
      if (!M) return;
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = e.target;
        !t.closest(`.ui-asw-ql`) && !t.closest(`#${CSS.escape(l)}-list`) && ie(!1);
      };
      return (
        document.addEventListener(`pointerdown`, e),
        (): RecoveredValue => document.removeEventListener(`pointerdown`, e)
      );
    }, [M, l]));
  let W: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.target.closest(`input`)) return;
      let t: RecoveredValue = e.metaKey || e.ctrlKey,
        n: RecoveredValue = e.key;
      if (Cn(e)) {
        e.preventDefault();
        let t: RecoveredValue = k ? document.getElementById(he(k)) : null;
        return He.openOn(t ?? u.current, t ? `item` : `space`, u.current);
      }
      if (n === `F2` && z) return (e.preventDefault(), P(z.name));
      if (t && !e.shiftKey && n.toLowerCase() === `d`) return (e.preventDefault(), De());
      if (t && n === `Backspace`) return (e.preventDefault(), Oe());
      if (t && !e.shiftKey && n.toLowerCase() === `c`) return (e.preventDefault(), ke());
      if (t && e.shiftKey && n.toLowerCase() === `n`) return (e.preventDefault(), U());
      if (t && (n === `1` || n === `2`))
        return (e.preventDefault(), S(n === `1` ? `list` : `icons`));
      if (n === ` `)
        return (
          e.preventDefault(),
          z
            ? (ie((e?: RecoveredValue): RecoveredValue => !e),
              ge(M ? `Quick Look closed` : `Quick Look: ${z.name}`))
            : void 0
        );
      if (n === `Escape` && M)
        return (e.preventDefault(), e.stopPropagation(), ie(!1), ge(`Quick Look closed`));
      if (n === `Enter` || (t && n === `ArrowDown`) || (t && n.toLowerCase() === `o`)) {
        (e.preventDefault(), z && B(z));
        return;
      }
      if (t && n === `ArrowUp`) return (e.preventDefault(), be());
      if (t && (n === `[` || n === `]`))
        return (e.preventDefault(), n === `[` ? ve() : ye());
      if (t && n.toLowerCase() === `a`)
        return (e.preventDefault(), D(R), ge(`${R.length} selected`));
      if (t && n.toLowerCase() === `f`) return (e.preventDefault(), d.current?.focus());
      let r: RecoveredValue = x === `icons`,
        i: RecoveredValue = (
          {
            ArrowDown: r ? Me() : 1,
            ArrowUp: r ? -Me() : -1,
            ...(r
              ? {
                  ArrowRight: 1,
                  ArrowLeft: -1,
                }
              : {}),
          } as Record<string, RecoveredValue>
        )[n];
      if (i) return (e.preventDefault(), je(i, e.shiftKey));
      if (n === `Home` || n === `End`)
        return (e.preventDefault(), je(n === `Home` ? -R.length : R.length, e.shiftKey));
      if (n.length === 1 && !t && !e.altKey && n !== ` `) {
        let e: RecoveredValue =
          Date.now() - oe.current.at > 700 ? n : oe.current.text + n;
        oe.current = {
          text: e,
          at: Date.now(),
        };
        let t: RecoveredValue = R.find(
          (t?: RecoveredValue): RecoveredValue =>
            t.toLowerCase().startsWith(e.toLowerCase()),
        );
        t && Ae(t, {});
      }
    },
    Ne: RecoveredValue = width >= 260,
    Pe: RecoveredValue = width < 420,
    Ie: RecoveredValue = [
      ...Dr.map(
        (e?: RecoveredValue): RecoveredValue => ({
          label: e.label,
          icon: e.icon,
          checked: C.key === e.key,
          onSelect: (): RecoveredValue =>
            w(
              (t?: RecoveredValue): RecoveredValue => ({
                ...t,
                key: e.key,
              }),
            ),
        }),
      ),
      {
        label: `Ascending`,
        icon: Be_component_BUnqa8Km,
        checked: C.dir === 1,
        divider: !0,
        onSelect: (): RecoveredValue =>
          w(
            (e?: RecoveredValue): RecoveredValue => ({
              ...e,
              dir: 1,
            }),
          ),
      },
      {
        label: `Descending`,
        icon: ze_component_BUnqa8Km,
        checked: C.dir === -1,
        onSelect: (): RecoveredValue =>
          w(
            (e?: RecoveredValue): RecoveredValue => ({
              ...e,
              dir: -1,
            }),
          ),
      },
    ],
    Le: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
      <button
        type={`button`}
        className={`ui-asw-fd__sort`}
        data-on={C.key === e || void 0}
        aria-label={`${t}${C.key === e ? `, sorted ${C.dir === 1 ? `ascending` : `descending`}` : ``} – sort by ${t.toLowerCase()}`}
        onClick={(): RecoveredValue =>
          w(
            (t?: RecoveredValue): RecoveredValue =>
              t.key === e
                ? {
                    key: e,
                    dir: t.dir === 1 ? -1 : 1,
                  }
                : {
                    key: e,
                    dir: 1,
                  },
          )
        }
      >
        {t}
        {C.key === e && (
          <ComponentP_component_BUnqa8Km
            icon={C.dir === 1 ? g_component_BUnqa8Km : f_component_BUnqa8Km}
            size={12}
          />
        )}
      </button>
    ),
    G: RecoveredValue = [name, ...m],
    Re: RecoveredValue = me.length,
    He: RecoveredValue = wn(),
    Ue: RecoveredValue = Ie.map(
      (e?: RecoveredValue): RecoveredValue => ({
        label: e.label,
        icon: e.icon,
        checked: e.checked,
        divider: e.divider,
        onSelect: e.onSelect,
      }),
    );
  return (
    <div className={`ui-asw-fd`}>
      <ComponentXn label={`Folder`} className={`ui-asw-fd__tools`}>
        <span className={`ui-asw-tb__group`}>
          <Component$
            icon={p_component_BUnqa8Km}
            label={`Back`}
            keys={`${Q_component_BUnqa8Km}[`}
            disabled={!y.back.length}
            onClick={ve}
          />
          <Component$
            icon={h_component_BUnqa8Km}
            label={`Forward`}
            keys={`${Q_component_BUnqa8Km}]`}
            disabled={!y.fwd.length}
            onClick={ye}
          />
        </span>
        <span className={`ui-asw-fd__crumbs`}>
          {G.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <J_component_BUnqa8Km.Fragment key={`${t}-${e}`}>
                {t > 0 && (
                  <span className={`ui-asw-fd__sep`} aria-hidden={`true`}>
                    <ComponentP_component_BUnqa8Km
                      icon={h_component_BUnqa8Km}
                      size={12}
                    />
                  </span>
                )}
                <button
                  type={`button`}
                  className={`ui-asw-fd__crumb`}
                  data-tool={!0}
                  data-tip={t === G.length - 1 ? void 0 : `Go to ${e}`}
                  aria-current={t === G.length - 1 ? `location` : void 0}
                  title={e}
                  onMouseDown={yn}
                  onClick={(): RecoveredValue =>
                    t < G.length - 1 && _e(m.slice(0, t), `push`, m[t])
                  }
                >
                  {e}
                </button>
              </J_component_BUnqa8Km.Fragment>
            ),
          )}
        </span>
        <span className={`ui-asw-tb__group`}>
          <Component$
            icon={xe_component_BUnqa8Km}
            label={`As list`}
            pressed={x === `list`}
            onClick={(): RecoveredValue => S(`list`)}
          />
          <Component$
            icon={ue_component_BUnqa8Km}
            label={`As icons`}
            pressed={x === `icons`}
            onClick={(): RecoveredValue => S(`icons`)}
          />
          <Sn icon={Ve_component_BUnqa8Km} label={`Sort by`} items={Ie} align={`end`} />
        </span>
      </ComponentXn>
      <label className={`ui-asw-fd__search`}>
        <ComponentP_component_BUnqa8Km icon={Fe_component_BUnqa8Km} size={14} />
        <input
          ref={d as RecoveredValue}
          type={`search`}
          value={T}
          placeholder={`Search ${G[G.length - 1]}`}
          aria-label={`Search ${G[G.length - 1]}`}
          aria-controls={`${l}-list`}
          spellCheck={!1}
          onChange={(e?: RecoveredValue): RecoveredValue => ee(e.target.value)}
          onKeyDown={(e?: RecoveredValue): RecoveredValue => {
            e.key === `Escape` && T
              ? (e.preventDefault(), e.stopPropagation(), ee(``))
              : (e.key === `ArrowDown` || e.key === `Enter`) &&
                (e.preventDefault(), !k && R[0] && Ae(R[0], {}), u.current?.focus());
          }}
        />
      </label>
      {x === `list` && (
        <div className={`ui-asw-fd__head`} data-date={Ne || void 0}>
          {Le(`name`, `Name`)}
          {Le(`size`, `Size`)}
          {Ne && Le(`modified`, `Modified`)}
        </div>
      )}
      <div
        className={`ui-asw-fd__body`}
        onPointerDown={(e?: RecoveredValue): RecoveredValue => {
          e.target === e.currentTarget && (D([]), A(null));
        }}
        onContextMenu={(e?: RecoveredValue): RecoveredValue => {
          if (
            e.target.closest(`input`) ||
            (e.preventDefault(), e.target.closest(`.ui-asw-ql`))
          )
            return;
          let t: RecoveredValue = e.target.closest(`[role='option']`),
            n: RecoveredValue = t ? R[Number(t.id.split(`-`).pop())] : void 0;
          (n && !E.includes(n) && (D([n]), (j.current = n)),
            n ? A(n) : (D([]), A(null)),
            u.current?.focus({
              preventScroll: !0,
            }),
            He.open(e.clientX, e.clientY, n ? `item` : `space`, u.current));
        }}
      >
        <div
          ref={u as RecoveredValue}
          id={`${l}-list`}
          className={x === `list` ? `ui-asw-fd__list` : `ui-asw-fd__grid`}
          role={`listbox`}
          tabIndex={0}
          aria-label={`${G[G.length - 1]}, ${Re === 1 ? `1 item` : `${Re} items`}`}
          aria-multiselectable={`true`}
          aria-orientation={x === `icons` ? `horizontal` : `vertical`}
          aria-activedescendant={k && R.includes(k) ? he(k) : void 0}
          onKeyDown={W}
          onFocus={(): RecoveredValue => !k && R[0] && A(R[0])}
          onPointerDown={(e?: RecoveredValue): RecoveredValue => {
            e.target === e.currentTarget && (D([]), A(null));
          }}
        >
          {me.map((e?: RecoveredValue): RecoveredValue => {
            let t: RecoveredValue = yr(e),
              n: RecoveredValue = t ? fe(e) : void 0;
            return (
              <div
                id={he(e.name)}
                role={`option`}
                aria-selected={E.includes(e.name)}
                aria-label={`${e.name}, ${br(e)}${t ? `` : `, ${Sr(e)}`}`}
                className={x === `list` ? `ui-asw-fd__row` : `ui-asw-fd__tile`}
                data-cur={k === e.name || void 0}
                data-date={Ne || void 0}
                onPointerDown={(t?: RecoveredValue): RecoveredValue => {
                  t.button === 0 && Ae(e.name, t);
                }}
                onDoubleClick={(): RecoveredValue => B(e)}
                key={e.name}
              >
                <span className={`ui-asw-fd__name`}>
                  {fn(t ? `` : e.name)}
                  {N === e.name ? (
                    <input
                      className={`ui-asw-fd__rename`}
                      defaultValue={e.name}
                      aria-label={`Rename ${e.name}`}
                      spellCheck={!1}
                      autoFocus={!0}
                      onFocus={(n?: RecoveredValue): RecoveredValue =>
                        (Te.current = e.name) &&
                        n.currentTarget.setSelectionRange(
                          0,
                          t || e.name.lastIndexOf(`.`) <= 0
                            ? e.name.length
                            : e.name.lastIndexOf(`.`),
                        )
                      }
                      onPointerDown={(e?: RecoveredValue): RecoveredValue =>
                        e.stopPropagation()
                      }
                      onDoubleClick={(e?: RecoveredValue): RecoveredValue =>
                        e.stopPropagation()
                      }
                      onKeyDown={(t?: RecoveredValue): RecoveredValue => {
                        (t.stopPropagation(),
                          t.key === `Enter`
                            ? (t.preventDefault(), Ee(e.name, t.currentTarget.value))
                            : t.key === `Escape` &&
                              (t.preventDefault(),
                              (Te.current = null),
                              P(null),
                              u.current?.focus({
                                preventScroll: !0,
                              })));
                      }}
                      onBlur={(t?: RecoveredValue): RecoveredValue =>
                        N === e.name && Ee(e.name, t.currentTarget.value)
                      }
                    />
                  ) : (
                    <span dir={`auto`} title={e.name}>
                      {e.name}
                    </span>
                  )}
                </span>
                {x === `list` && (
                  <span className={`ui-asw-fd__meta`}>{Sr(e, n?.length)}</span>
                )}
                {x === `list` && Ne && (
                  <span className={`ui-asw-fd__meta`}>{Er(e.modified, I, Pe)}</span>
                )}
              </div>
            );
          })}
        </div>
        {He.render((e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = we(),
            n: RecoveredValue =
              t.length === 1
                ? me.find((e?: RecoveredValue): RecoveredValue => e.name === t[0])
                : void 0;
          return e === `item` && t.length
            ? {
                label: n?.name ?? `${t.length} items`,
                items: [
                  {
                    label: `Open`,
                    icon: ce_component_BUnqa8Km,
                    keys: `↵`,
                    disabled: !n,
                    onSelect: (): RecoveredValue => n && B(n),
                  },
                  {
                    label: `Open in new tab`,
                    icon: v_component_BUnqa8Km,
                    disabled: !n,
                    onSelect: (): RecoveredValue => n && Se(n),
                  },
                  {
                    label: `Quick Look`,
                    icon: ot_component_BUnqa8Km,
                    keys: `Space`,
                    disabled: !n,
                    onSelect: (): RecoveredValue => n && (A(n.name), ie(!0)),
                  },
                  {
                    label: t.length === 1 ? `Copy name` : `Copy names`,
                    icon: te_component_BUnqa8Km,
                    keys: `${Q_component_BUnqa8Km}C`,
                    divider: !0,
                    onSelect: ke,
                  },
                  {
                    label: `Rename`,
                    icon: H_component_BUnqa8Km,
                    keys: `F2`,
                    disabled: !n,
                    onSelect: (): RecoveredValue => n && P(n.name),
                  },
                  {
                    label: `Duplicate`,
                    icon: O_component_BUnqa8Km,
                    keys: `${Q_component_BUnqa8Km}D`,
                    onSelect: De,
                  },
                  {
                    label: `Move to trash`,
                    icon: re_component_BUnqa8Km,
                    keys: `${Q_component_BUnqa8Km}⌫`,
                    danger: !0,
                    divider: !0,
                    onSelect: Oe,
                  },
                ],
              }
            : {
                label: G[G.length - 1],
                items: [
                  {
                    label: `New folder`,
                    icon: se_component_BUnqa8Km,
                    keys: `${vn}${Q_component_BUnqa8Km}N`,
                    onSelect: U,
                  },
                  {
                    label: `View as list`,
                    icon: xe_component_BUnqa8Km,
                    keys: `${Q_component_BUnqa8Km}1`,
                    checked: x === `list`,
                    divider: !0,
                    onSelect: (): RecoveredValue => S(`list`),
                  },
                  {
                    label: `View as icons`,
                    icon: ue_component_BUnqa8Km,
                    keys: `${Q_component_BUnqa8Km}2`,
                    checked: x === `icons`,
                    onSelect: (): RecoveredValue => S(`icons`),
                  },
                  {
                    label: `Sort by`,
                    icon: Ve_component_BUnqa8Km,
                    submenu: Ue,
                  },
                  {
                    label: `Select all`,
                    icon: ne_component_BUnqa8Km,
                    keys: `${Q_component_BUnqa8Km}A`,
                    divider: !0,
                    disabled: !R.length,
                    onSelect: (): RecoveredValue => (D(R), ge(`${R.length} selected`)),
                  },
                ],
              };
        })}
        {Re === 0 && (
          <p className={`ui-asw-fd__empty`}>
            {T ? `Nothing in ${G[G.length - 1]} matches “${T}”` : `This folder is empty`}
          </p>
        )}
        {M && z && (
          <ComponentKr
            entry={z}
            artifact={yr(z) ? void 0 : lookup(z.name)}
            inside={yr(z) ? fe(z) : void 0}
            onClose={(): RecoveredValue => {
              (ie(!1), u.current?.focus());
            }}
          />
        )}
      </div>
      <p className={`ui-asw-fd__foot ui-asw-num`}>
        {Re === 1 ? `1 item` : `${on_component_BUnqa8Km.format(Re)} items`}
        {E.length > 0 && `, ${on_component_BUnqa8Km.format(E.length)} selected`}
      </p>
      <span className={`ui-asw-sr`} role={`status`} aria-live={`polite`}>
        {F}
      </span>
    </div>
  );
}
function ComponentKr({
  entry,
  artifact,
  inside,
  onClose,
}: RecoveredValue): RecoveredValue {
  let i: RecoveredValue = artifact,
    a: RecoveredValue = i?.table,
    o: RecoveredValue = (0, J_component_BUnqa8Km.useMemo)(
      (): RecoveredValue =>
        a
          ? Qn(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => a[e]?.[t] ?? ``,
            )
          : null,
      [a],
    );
  return (
    <div className={`ui-asw-ql`} role={`dialog`} aria-label={`Quick Look: ${entry.name}`}>
      <header className={`ui-asw-ql__head`}>
        <span className={`ui-asw-art__glyph`} aria-hidden={`true`}>
          {fn(yr(entry) ? `` : entry.name)}
        </span>
        <span className={`ui-asw-art__title`}>
          <b dir={`auto`} title={entry.name}>
            {entry.name}
          </b>
          <span>
            {br(entry)}
            <i aria-hidden={`true`}>{` · `}</i>
            {Sr(entry, inside?.length)}
          </span>
        </span>
        <button
          type={`button`}
          className={`ui-asw-ql__close`}
          aria-label={`Close Quick Look`}
          onClick={onClose}
        >
          <ComponentP_component_BUnqa8Km
            icon={S_component_BUnqa8Km}
            size={12}
            stroke={2.2}
          />
        </button>
      </header>
      <div className={`ui-asw-ql__body`}>
        {inside ? (
          <ul className={`ui-asw-art__files`}>
            {inside.map(
              (e?: RecoveredValue): RecoveredValue => (
                <li key={e.name}>
                  {fn(yr(e) ? `` : e.name)}
                  <span dir={`auto`}>{e.name}</span>
                </li>
              ),
            )}
          </ul>
        ) : i?.preview ? (
          i.preview
        ) : i?.doc ? (
          <div
            className={`ui-asw-doc ui-asw-doc--still`}
            dangerouslySetInnerHTML={{
              __html: Nn(i.doc),
            }}
          />
        ) : a && o ? (
          <div className={`ui-asw-ql__sheet`}>
            <table>
              <tbody>
                {a.slice(0, 8).map(
                  (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                    <tr
                      data-head={t === 0 || void 0}
                      children={e.slice(0, 6).map(
                        (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
                          <td
                            data-num={typeof o(t, n) == `number` || void 0}
                            children={tr(
                              e,
                              o(t, n),
                              i.sheet?.styles?.[`${t}:${n}`]?.format,
                            )}
                            key={n}
                          />
                        ),
                      )}
                      key={t}
                    />
                  ),
                )}
              </tbody>
            </table>
          </div>
        ) : i?.code ? (
          <pre className={`ui-asw-art__code`}>{i.code}</pre>
        ) : i?.image ? (
          <ComponentPn blocks={i.image} />
        ) : (
          <p className={`ui-asw-ql__none`}>{`No preview`}</p>
        )}
      </div>
    </div>
  );
}
var Ar: RecoveredValue = [
    {
      id: `terminal`,
      label: `Terminal`,
      icon: E_component_BUnqa8Km,
      shortcut: "⌃`",
    },
    {
      id: `browser`,
      label: `Browser`,
      icon: I_component_BUnqa8Km,
      shortcut: `⌘⇧B`,
    },
    {
      id: `notes`,
      label: `Notes`,
      icon: we_component_BUnqa8Km,
      shortcut: `⌘⇧N`,
    },
  ],
  jr: RecoveredValue = [
    {
      id: `geo`,
      title: `GEO: Generative Engine Optimization`,
      source: `arxiv.org`,
      mark: `A`,
    },
    {
      id: `tokens`,
      title: `Design tokens – naming guide`,
      source: `notion.so`,
      mark: `N`,
    },
    {
      id: `q3`,
      title: `Q3 launch checklist`,
      source: `linear.app`,
      mark: `L`,
    },
  ],
  Mr: RecoveredValue = {
    "q3-launch-checklist.md": {
      updated: `Updated 2h ago`,
      doc: {
        title: `Q3 launch checklist`,
        paragraphs: [
          `Everything that has to be true before the launch on Sep 30. Tick it off as it lands.`,
        ],
        bullets: [
          `[x] Pricing page copy final`,
          `[x] Changelog drafted`,
          `[ ] Onboarding emails scheduled`,
          `[ ] Support macros updated`,
          `[ ] Launch post reviewed`,
        ],
      },
    },
    "q3-launch-budget.csv": {
      updated: `Updated yesterday`,
      table: [
        [`Channel`, `Weekly`, `Weeks`, `Total`],
        [`Search`, `1,200`, `6`, `=B2*C2`],
        [`Social`, `800`, `6`, `=B3*C3`],
        [`Newsletter`, `300`, `4`, `=B4*C4`],
        [`Events`, `2,500`, `1`, `=B5*C5`],
        [`Total`, `=SUM(B2:B5)`, ``, `=SUM(D2:D5)`],
      ],
      sheet: {
        styles: {
          "5:0": {
            bold: !0,
          },
          "1:3": {
            format: `currency`,
          },
          "2:3": {
            format: `currency`,
          },
          "3:3": {
            format: `currency`,
          },
          "4:3": {
            format: `currency`,
          },
          "5:3": {
            format: `currency`,
            bold: !0,
          },
        },
      },
    },
    "design-tokens-naming.md": {
      updated: `Updated Mon`,
      doc: {
        title: `Design tokens – naming guide`,
        paragraphs: [
          `Tokens are named for what they do, not for how they look: color-text-muted, not gray-500. A name reads from the general to the specific.`,
        ],
        bullets: [
          `Category first: color, space, radius, shadow`,
          `Then the role: text, surface, line`,
          `State last: hover, pressed, disabled`,
        ],
      },
    },
  },
  Nr: RecoveredValue = [
    jr[0],
    {
      ...jr[1],
      artifact: `design-tokens-naming.md`,
    },
    {
      ...jr[2],
      artifact: `q3-launch-checklist.md`,
    },
    {
      id: `budget`,
      title: `Q3 launch budget`,
      source: `sheets.google.com`,
      mark: `S`,
      artifact: `q3-launch-budget.csv`,
    },
  ];
function Pr({ tools = Ar, sources = jr, onOpen }: RecoveredValue): RecoveredValue {
  let [r, i]: RecoveredValue = (0, J_component_BUnqa8Km.useState)(``);
  return (
    <div className={`ui-asw`}>
      <label className={`ui-asw__address`}>
        <ComponentP_component_BUnqa8Km icon={Fe_component_BUnqa8Km} size={14} />
        <input
          value={r}
          onChange={(e?: RecoveredValue): RecoveredValue => i(e.target.value)}
          placeholder={`Search or enter URL`}
          aria-label={`Search or enter URL`}
        />
      </label>
      <section className={`ui-asw__section`} aria-label={`Tools`}>
        <h3 className={`ui-asw__label`}>{`Tools`}</h3>
        {tools.length === 0 && (
          <p className={`ui-asw__empty`}>{`No tools connected yet`}</p>
        )}
        {tools.length > 0 && (
          <div className={`ui-asw__list`}>
            {tools.map(
              (e?: RecoveredValue): RecoveredValue => (
                <div className={`ui-asw__row`} key={e.id}>
                  <button
                    type={`button`}
                    className={`ui-asw__open`}
                    onClick={(): RecoveredValue => onOpen?.(e.id)}
                  >
                    <span className={`ui-asw__tile`}>
                      <ComponentP_component_BUnqa8Km icon={e.icon} size={15} />
                    </span>
                    <span className={`ui-asw__name`} title={e.label}>
                      {e.label}
                    </span>
                    {e.shortcut && <kbd className={`ui-asw__kbd`}>{e.shortcut}</kbd>}
                  </button>
                  <button
                    type={`button`}
                    className={`ui-asw__more`}
                    aria-label={`More for ${e.label}`}
                  >
                    <ComponentP_component_BUnqa8Km
                      icon={Ce_component_BUnqa8Km}
                      size={15}
                    />
                  </button>
                </div>
              ),
            )}
          </div>
        )}
      </section>
      <section className={`ui-asw__section`} aria-label={`Suggested`}>
        <h3 className={`ui-asw__label`}>{`Suggested`}</h3>
        {sources.length === 0 && (
          <p className={`ui-asw__empty`}>{`Nothing suggested right now`}</p>
        )}
        {sources.length > 0 && (
          <div className={`ui-asw__list`}>
            {sources.map(
              (e?: RecoveredValue): RecoveredValue => (
                <button
                  type={`button`}
                  className={`ui-asw__row ui-asw__open ui-asw__source`}
                  onClick={(): RecoveredValue => onOpen?.(e.id)}
                  key={e.id}
                >
                  <span className={`ui-asw__tile ui-asw__tile--mark`}>
                    {e.mark ?? ht(e.title).toUpperCase()}
                  </span>
                  <span className={`ui-asw__text`}>
                    <span className={`ui-asw__name`} title={e.title}>
                      {e.title}
                    </span>
                    <span className={`ui-asw__meta`} title={e.source}>
                      {e.source}
                    </span>
                  </span>
                  <span className={`ui-asw__go`}>
                    <ComponentP_component_BUnqa8Km
                      icon={v_component_BUnqa8Km}
                      size={14}
                    />
                  </span>
                </button>
              ),
            )}
          </div>
        )}
      </section>
    </div>
  );
}
var e_Add01Icon_CdIdvCVr: RecoveredValue = [
  [
    `path`,
    {
      d: `M12.001 5.00003V19.002`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M19.002 12.002L4.99998 12.002`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var e_Alert02Icon_Cb_Wz6Pv: RecoveredValue = [
  [
    `path`,
    {
      d: `M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M12 9V13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var e_Brain02Icon_exdxazs8: RecoveredValue = [
  [
    `path`,
    {
      d: `M4.22222 21.9948V18.4451C4.22222 17.1737 3.88927 16.5128 3.23482 15.4078C2.4503 14.0833 2 12.5375 2 10.8866C2 5.97866 5.97969 2 10.8889 2C15.7981 2 19.7778 5.97866 19.7778 10.8866C19.7778 11.4663 19.7778 11.7562 19.802 11.9187C19.8598 12.3072 20.0411 12.6414 20.2194 12.9873L22 16.4407L20.6006 17.1402C20.195 17.3429 19.9923 17.4443 19.851 17.6314C19.7097 17.8184 19.67 18.0296 19.5904 18.4519L19.5826 18.4931C19.4004 19.4606 19.1993 20.5286 18.6329 21.2024C18.4329 21.4403 18.1853 21.6336 17.9059 21.7699C17.4447 21.9948 16.8777 21.9948 15.7437 21.9948C15.219 21.9948 14.6928 22.0069 14.1682 21.9942C12.9247 21.9639 12 20.9184 12 19.7044`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M14.388 10.5315C13.9617 10.5315 13.5729 10.3702 13.2784 10.1048M14.388 10.5315C14.388 11.6774 13.7241 12.7658 12.4461 12.7658C11.1681 12.7658 10.5043 13.8541 10.5043 15M14.388 10.5315C16.5373 10.5315 16.5373 7.18017 14.388 7.18017C14.1927 7.18017 14.0053 7.21403 13.8312 7.27624C13.9362 4.77819 10.3349 4.1 9.51923 6.44018M10.5043 8.29729C10.5043 7.52323 10.1133 6.8411 9.51923 6.44018M9.51923 6.44018C7.66742 5.19034 5.19883 7.4331 6.37324 9.43277C4.40226 9.72827 4.61299 12.7658 6.6205 12.7658C7.18344 12.7658 7.68111 12.4844 7.98234 12.0538`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var e_InboxIcon_D_iyndaC: RecoveredValue = [
  [
    `path`,
    {
      d: `M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var e_Message01Icon_FiGHuXZQ: RecoveredValue = [
  [
    `path`,
    {
      d: `M8.5 14.5H15.5M8.5 9.5H12`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var x_demo_Cgk5A601: RecoveredValue = t_react_BkAXpnfr(),
  S_demo_Cgk5A601: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  C_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Date.now() - e * 6e4,
  ie_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
    {
      label: `Thread`,
      icon: e_Message01Icon_FiGHuXZQ,
    },
    {
      label: `Inbox`,
      icon: e_InboxIcon_D_iyndaC,
      count: e || void 0,
    },
    {
      label: `Tasks`,
      icon: C_component_BUnqa8Km,
    },
    {
      label: `Memory`,
      icon: e_Brain02Icon_exdxazs8,
    },
  ],
  ae_demo_Cgk5A601: RecoveredValue = [
    {
      label: `Workspace`,
      items: [
        {
          label: `Settings`,
          icon: Ie_component_BUnqa8Km,
        },
      ],
    },
  ],
  oe_demo_Cgk5A601: RecoveredValue = [
    {
      id: `ingest`,
      title: `Ingest pipeline`,
      project: `Northwind`,
      status: `running`,
      statusText: `Picking a queue`,
      asks: [
        {
          id: `queue`,
          kind: `decision`,
          question: `Which queue should the ingest service use?`,
        },
      ],
      updatedAt: C_demo_Cgk5A601(4),
      goal: `Take in Northwind's order events and keep a day of them to replay after a bad deploy.`,
      started: `Mon, Nov 3`,
      steps: [
        {
          label: `Draft the event schema`,
          done: !0,
        },
        {
          label: `Load test at 20k a minute`,
          done: !0,
        },
        {
          label: `Pick a queue`,
        },
        {
          label: `Deploy to staging`,
        },
      ],
      artifacts: [
        `ingest-design.md`,
        `load-test-results.csv`,
        `event-schema.json`,
        `staging`,
      ],
      history: [
        `Asked you which queue to use`,
        `Load test passed at 20k events a minute`,
        `Wrote the design doc and the event schema`,
      ],
      decided: [
        {
          question: `Which format for the events?`,
          answer: `JSON with a version field`,
          at: C_demo_Cgk5A601(4200),
        },
      ],
    },
    {
      id: `dashboard`,
      title: `Client dashboard`,
      project: `Northwind`,
      status: `running`,
      statusText: `Choosing an empty state`,
      asks: [
        {
          id: `empty-state`,
          kind: `pick`,
          question: `Which empty state for the dashboard?`,
        },
      ],
      updatedAt: C_demo_Cgk5A601(18),
      goal: `A usage dashboard Northwind's team opens every morning.`,
      started: `Tue, Oct 28`,
      steps: [
        {
          label: `Usage page`,
          done: !0,
        },
        {
          label: `Empty state`,
        },
        {
          label: `Alerts page`,
        },
      ],
      artifacts: [`dashboard-spec.md`, `usage-sample.csv`, `usage-page.png`],
      history: [
        `Drew three empty states for you to pick from`,
        `Usage page shipped with daily bars`,
        `Northwind opened it 31 times this week`,
      ],
      decided: [
        {
          question: `Which chart for the usage page?`,
          answer: `Bars`,
          at: C_demo_Cgk5A601(2940),
        },
      ],
    },
    {
      id: `weekly`,
      title: `Weekly update`,
      project: `Northwind`,
      status: `running`,
      statusText: `Ready to send`,
      asks: [
        {
          id: `weekly`,
          kind: `approval`,
          question: `Send the weekly update to Northwind?`,
        },
      ],
      updatedAt: C_demo_Cgk5A601(42),
      goal: `Tell Northwind what shipped this week and what needs their answer.`,
      started: `Today`,
      steps: [
        {
          label: `Collect merged work`,
          done: !0,
        },
        {
          label: `Draft the email`,
          done: !0,
        },
        {
          label: `Send it`,
        },
      ],
      artifacts: [`weekly-update-week-45.md`],
      history: [
        `Drafted the email for you to approve`,
        `Collected 14 merged changes from this week`,
      ],
    },
    {
      id: `onboarding`,
      title: `Onboarding emails`,
      project: `Northwind`,
      status: `running`,
      statusText: `Writing the draft`,
      updatedAt: C_demo_Cgk5A601(12),
      goal: `Three short emails that walk a new Northwind account to its first sync.`,
      started: `Thu, Nov 5`,
      steps: [
        {
          label: `Outline the three emails`,
          done: !0,
        },
        {
          label: `Write the drafts`,
        },
        {
          label: `Test with two accounts`,
        },
      ],
      artifacts: [`onboarding-outline.md`],
      history: [
        `Writing the second email`,
        `First email drafted`,
        `Outline agreed in the thread`,
      ],
    },
    {
      id: `webhooks`,
      title: `Billing webhooks`,
      project: `Platform`,
      status: `running`,
      statusText: `Deploying to staging`,
      updatedAt: C_demo_Cgk5A601(6),
      goal: `Retry failed billing webhooks and tell the client when one gives up.`,
      started: `Wed, Nov 4`,
      steps: [
        {
          label: `Retry with backoff`,
          done: !0,
        },
        {
          label: `Dead letter and alert`,
          done: !0,
        },
        {
          label: `Tests`,
          done: !0,
        },
        {
          label: `Deploy to staging`,
        },
      ],
      artifacts: [`webhooks-plan.md`, `deploy.yaml`],
      history: [
        `Deploying to staging`,
        `All 48 tests pass`,
        `Added a dead letter queue and an alert`,
      ],
    },
    {
      id: `api`,
      title: `API migration`,
      project: `Platform`,
      status: `running`,
      statusText: `Deciding the v1 end date`,
      asks: [
        {
          id: `api-v1`,
          kind: `decision`,
          question: `Keep the old API until March or drop it now?`,
        },
      ],
      updatedAt: C_demo_Cgk5A601(190),
      goal: `Move every client from the v1 API to v2 without breaking a running integration.`,
      started: `Mon, Oct 20`,
      steps: [
        {
          label: `Ship v2`,
          done: !0,
        },
        {
          label: `Move our own apps`,
          done: !0,
        },
        {
          label: `Decide on the v1 end date`,
        },
        {
          label: `Write to the clients`,
        },
      ],
      artifacts: [`migration-plan.md`, `v1-traffic.csv`],
      history: [
        `Asked you whether to keep v1 until March`,
        `Two clients still call v1 – about 4% of traffic`,
        `Our own apps run on v2`,
      ],
    },
    {
      id: `triage`,
      title: `Support triage`,
      project: `Platform`,
      status: `running`,
      statusText: `Rolling out to all queues`,
      updatedAt: C_demo_Cgk5A601(25),
      goal: `Sort and summarise incoming support tickets before anyone reads them.`,
      started: `Thu, Oct 30`,
      steps: [
        {
          label: `Pick a model`,
          done: !0,
        },
        {
          label: `Weekly eval`,
          done: !0,
        },
        {
          label: `Roll out to all queues`,
        },
      ],
      artifacts: [`triage-eval.csv`, `prompts`],
      history: [
        `Runs on 2 of 5 support queues`,
        `First weekly eval: 94% match a human summary`,
      ],
      decided: [
        {
          question: `Which model should summarise support tickets?`,
          answer: `The small model`,
          at: C_demo_Cgk5A601(1500),
        },
      ],
    },
    {
      id: `launch`,
      title: `Launch post`,
      project: `Evalkit`,
      status: `running`,
      statusText: `Picking the tone`,
      asks: [
        {
          id: `tone`,
          kind: `question`,
          question: `What tone should the launch post have?`,
        },
      ],
      updatedAt: C_demo_Cgk5A601(64),
      goal: `Announce the open-source release of the eval kit.`,
      started: `Wed, Nov 5`,
      steps: [
        {
          label: `Outline`,
          done: !0,
        },
        {
          label: `Pick the tone`,
        },
        {
          label: `First draft`,
        },
        {
          label: `Schedule`,
        },
      ],
      artifacts: [`launch-outline.md`, `benchmarks.csv`],
      history: [
        `Asked you which tone the post should have`,
        `Outline ready, with the benchmark numbers`,
      ],
    },
    {
      id: `bench`,
      title: `Benchmark suite`,
      project: `Evalkit`,
      status: `running`,
      statusText: `Running the evals`,
      updatedAt: C_demo_Cgk5A601(2),
      goal: `Run the kit against five open models so the launch post has real numbers.`,
      started: `Tue, Nov 4`,
      steps: [
        {
          label: `Pick the models`,
          done: !0,
        },
        {
          label: `Prepare the datasets`,
          done: !0,
        },
        {
          label: `Run the evals`,
          done: !0,
        },
        {
          label: `Check the outliers`,
        },
        {
          label: `Write up`,
        },
      ],
      artifacts: [`benchmarks.csv`],
      history: [
        `Running the last two models`,
        `Three of five models done`,
        `Datasets prepared – 2,400 cases`,
      ],
    },
    {
      id: `auth`,
      title: `Auth refactor`,
      project: `Platform`,
      done: !0,
      updatedAt: C_demo_Cgk5A601(1740),
      goal: `One sign-in flow for web and mobile before the demo.`,
      started: `Fri, Oct 24`,
      steps: [
        {
          label: `Refactor`,
          done: !0,
        },
        {
          label: `Merge`,
          done: !0,
        },
      ],
      artifacts: [`auth-refactor.md`],
      history: [
        `Deployed to staging before the demo`,
        `Merged into main – 41 files, all checks green`,
      ],
      decided: [
        {
          question: `Merge the auth refactor before the demo?`,
          answer: `Approved`,
          at: C_demo_Cgk5A601(1740),
        },
      ],
    },
    {
      id: `usage`,
      title: `Usage page`,
      project: `Northwind`,
      done: !0,
      updatedAt: C_demo_Cgk5A601(2940),
      goal: `Show Northwind their daily usage, one bar per day.`,
      started: `Tue, Oct 28`,
      steps: [
        {
          label: `Query`,
          done: !0,
        },
        {
          label: `Chart`,
          done: !0,
        },
        {
          label: `Ship`,
          done: !0,
        },
      ],
      artifacts: [`usage-page.png`],
      history: [`Shipped to Northwind`, `Daily bars, as you picked`],
      decided: [
        {
          question: `Which chart for the usage page?`,
          answer: `Bars`,
          at: C_demo_Cgk5A601(2940),
        },
      ],
    },
    {
      id: `docs`,
      title: `Docs site`,
      project: `Evalkit`,
      done: !0,
      updatedAt: C_demo_Cgk5A601(4440),
      goal: `A docs site for the eval kit, ready before the launch.`,
      started: `Mon, Nov 2`,
      steps: [
        {
          label: `Structure`,
          done: !0,
        },
        {
          label: `Guides`,
          done: !0,
        },
        {
          label: `Publish`,
          done: !0,
        },
      ],
      artifacts: [`docs-outline.md`],
      history: [`Published with four guides`, `Structure agreed in the thread`],
    },
    {
      id: `limits`,
      title: `Rate limits`,
      project: `Platform`,
      done: !0,
      updatedAt: C_demo_Cgk5A601(5880),
      goal: `Per-client rate limits on the public API.`,
      started: `Thu, Oct 29`,
      steps: [
        {
          label: `Limits per plan`,
          done: !0,
        },
        {
          label: `Headers and docs`,
          done: !0,
        },
      ],
      artifacts: [`rate-limits.md`],
      history: [`Live for every client`, `Limits per plan agreed`],
    },
  ],
  se_demo_Cgk5A601: RecoveredValue = {
    "ingest-design.md": {
      updated: `Updated 2h ago`,
      doc: {
        title: `Ingest service – design`,
        paragraphs: [
          `Order events come in from three shops. The service takes them in, checks them against the schema and hands them to the pipeline.`,
        ],
        bullets: [
          `Bursts up to 20k events a minute`,
          `Retries with backoff, then a dead letter`,
          `A day of events kept for replays`,
        ],
      },
    },
    "load-test-results.csv": {
      updated: `Updated yesterday`,
      table: [
        [`Events / min`, `p50`, `p95`, `p99`, `Errors`, `CPU`],
        [`5,000`, `21 ms`, `38 ms`, `61 ms`, `0`, `18%`],
        [`10,000`, `27 ms`, `52 ms`, `88 ms`, `0`, `31%`],
        [`20,000`, `41 ms`, `96 ms`, `180 ms`, `0.02%`, `58%`],
        [`30,000`, `160 ms`, `410 ms`, `1,240 ms`, `1.8%`, `94%`],
      ],
    },
    "event-schema.json": {
      updated: `Updated Mon`,
      code: `{
  "id": "evt_…",
  "type": "order.created",
  "shop": "northwind-eu",
  "at": "2026-11-06T09:41:00Z",
  "total": { "amount": 129.0, "currency": "EUR" }
}`,
    },
    staging: {
      updated: `4 items`,
      files: [
        {
          name: `deploy.yaml`,
          size: 1284,
          modified: C_demo_Cgk5A601(64),
        },
        {
          name: `smoke-test.md`,
          size: 2918,
          modified: C_demo_Cgk5A601(71),
        },
        {
          name: `canary-metrics.csv`,
          size: 8960,
          modified: C_demo_Cgk5A601(120),
        },
        {
          name: `rollout-plan.md`,
          size: 4120,
          modified: C_demo_Cgk5A601(3e3),
        },
      ],
    },
    "deploy.yaml": {
      updated: `Updated 1h ago`,
      code: `service: ingest
image: northwind/ingest:1.8.2
replicas: 3
rollout:
  strategy: canary
  steps: [10, 50, 100]
  pause: 10m`,
    },
    "smoke-test.md": {
      updated: `Updated 1h ago`,
      doc: {
        title: `Smoke test – staging`,
        paragraphs: [
          `Run after every deploy to staging, before the canary takes real traffic.`,
        ],
        bullets: [
          `[x] Health check answers 200`,
          `[x] One order event goes through end to end`,
          `[ ] A malformed event lands in the dead letter`,
        ],
      },
    },
    "canary-metrics.csv": {
      updated: `Updated 2h ago`,
      table: [
        [`Step`, `Traffic`, `p95`, `Errors`],
        [`1`, `10%`, `44 ms`, `0.01%`],
        [`2`, `50%`, `61 ms`, `0.03%`],
        [`3`, `100%`, `92 ms`, `0.04%`],
      ],
    },
    "rollout-plan.md": {
      updated: `Updated 2 days ago`,
      doc: {
        title: `Rollout plan`,
        paragraphs: [
          `Staging first, then 10% of production for an hour, then half, then everything.`,
        ],
        bullets: [`Roll back with one command`, `Tell Northwind before the 50% step`],
      },
    },
    "dashboard-spec.md": {
      updated: `Updated Oct 30`,
      doc: {
        title: `Client dashboard`,
        paragraphs: [
          `One page Northwind's team opens every morning: yesterday's usage, what changed, and anything that needs a look.`,
        ],
        bullets: [
          `Usage by day`,
          `An empty state for new accounts`,
          `Alerts in one list`,
        ],
      },
    },
    "usage-sample.csv": {
      updated: `Updated Oct 31`,
      table: [
        [`Day`, `Events`, `Users`],
        [`Mon`, `182,400`, `41`],
        [`Tue`, `201,950`, `44`],
        [`Wed`, `176,300`, `39`],
        [`Total`, `=SUM(B2:B4)`, `=MAX(C2:C4)`],
      ],
    },
    "usage-page.png": {
      updated: `2 days ago`,
      image: [
        {
          x: 14,
          y: 40,
          w: 12,
          h: 28,
          tone: `mid`,
        },
        {
          x: 34,
          y: 28,
          w: 12,
          h: 40,
          tone: `mid`,
        },
        {
          x: 54,
          y: 46,
          w: 12,
          h: 22,
          tone: `mid`,
        },
        {
          x: 74,
          y: 20,
          w: 12,
          h: 48,
          tone: `ink`,
        },
        {
          x: 94,
          y: 34,
          w: 12,
          h: 34,
          tone: `mid`,
        },
      ],
    },
    "weekly-update-week-45.md": {
      updated: `Drafted 42m ago`,
      doc: {
        title: `Week 45`,
        paragraphs: [
          `Hi Dana – ingest is live on staging and took the load test at 20k events a minute.`,
        ],
        bullets: [`Dashboard: usage page shipped`, `Needs your answer: the v1 end date`],
      },
    },
    "onboarding-outline.md": {
      updated: `Updated 12m ago`,
      doc: {
        title: `Onboarding emails`,
        paragraphs: [`Three emails, each with one thing to do.`],
        bullets: [
          `Day 0: connect your first shop`,
          `Day 1: your first sync is in`,
          `Day 3: invite your team`,
        ],
      },
    },
    "webhooks-plan.md": {
      updated: `Updated Wed`,
      doc: {
        title: `Billing webhooks`,
        paragraphs: [
          `A failed webhook is retried five times over an hour, then moves to a dead letter and the client gets one email.`,
        ],
        bullets: [
          `[x] Retry with backoff`,
          `[x] Dead letter and alert`,
          `[ ] Staging for a day`,
        ],
      },
    },
    "migration-plan.md": {
      updated: `Updated Oct 22`,
      doc: {
        title: `v1 → v2`,
        paragraphs: [
          `Every client moves to v2; v1 answers until the end date, then returns 410.`,
        ],
        bullets: [
          `Our own apps first`,
          `A guide for the two clients left`,
          `The end date – your call`,
        ],
      },
    },
    "v1-traffic.csv": {
      updated: `Updated 3h ago`,
      table: [
        [`Client`, `Calls / day`, `Share`],
        [`Harbor & Co`, `18,200`, `2.9%`],
        [`Linden`, `6,900`, `1.1%`],
      ],
    },
    "triage-eval.csv": {
      updated: `Updated yesterday`,
      table: [
        [`Queue`, `Tickets`, `Match`],
        [`Billing`, `412`, `96%`],
        [`Accounts`, `288`, `93%`],
        [`Bugs`, `175`, `91%`],
      ],
    },
    prompts: {
      updated: `2 items`,
      files: [
        {
          name: `summarise.md`,
          size: 1420,
          modified: C_demo_Cgk5A601(1800),
        },
        {
          name: `route.md`,
          size: 980,
          modified: C_demo_Cgk5A601(1860),
        },
      ],
    },
    "launch-outline.md": {
      updated: `Updated Wed`,
      doc: {
        title: `Launch post – outline`,
        paragraphs: [`Why we built it, what it measures, the numbers, how to start.`],
        bullets: [
          `The problem with vibe evals`,
          `Five models, 2,400 cases`,
          `pip install evalkit`,
        ],
      },
    },
    "benchmarks.csv": {
      updated: `Updated 2m ago`,
      table: [
        [`Model`, `Cases`, `Pass`],
        [`Model A`, `2,400`, `81%`],
        [`Model B`, `2,400`, `77%`],
        [`Model C`, `2,400`, `72%`],
      ],
    },
    "auth-refactor.md": {
      updated: `Updated yesterday`,
      doc: {
        title: `Auth refactor`,
        paragraphs: [
          `Web and mobile now sign in through one flow, with the same session rules.`,
        ],
        bullets: [`41 files changed`, `All checks green`, `Deployed before the demo`],
      },
    },
  },
  w_demo_Cgk5A601: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => ({
    id: e,
    title: e,
    source: t,
    mark: fn(e),
    artifact: e,
  }),
  ce_demo_Cgk5A601: RecoveredValue = [
    w_demo_Cgk5A601(`staging`, `Ingest pipeline`),
    w_demo_Cgk5A601(`benchmarks.csv`, `Benchmark suite`),
    w_demo_Cgk5A601(`migration-plan.md`, `API migration`),
  ],
  le_demo_Cgk5A601: RecoveredValue = {
    tasks: `Tasks`,
    active: `Active`,
    done: `Done`,
    newTask: `New task`,
    create: `Create`,
    placeholder: `Describe what you want done…`,
    needsYou: `Needs you`,
    showAgents: `Show agents`,
    steps: `Steps`,
    happened: `What happened so far`,
    artifacts: `Artifacts`,
    decided: `Decided`,
    planning: `Planning`,
    running: `Running`,
    paused: `Paused`,
    waiting: `Waiting on you`,
    noTasks: `No tasks`,
    emptyActive: `No active tasks`,
    emptyActiveText: `Say what you want done – New task starts one.`,
    emptyDone: `Nothing done yet`,
    emptyDoneText: `Finished tasks land here, with what they produced.`,
    noTask: `No task open`,
    noTaskText: `Open a task to see where it is.`,
    created: `Task created`,
    writeFirst: `Say what you want done first`,
    decide: `Decide`,
    decisionOne: `1 decision waiting`,
    decisionMany: `{n} decisions waiting`,
  },
  T_demo_Cgk5A601: RecoveredValue = new Intl.NumberFormat(`en`),
  E_demo_Cgk5A601: RecoveredValue = new Intl.RelativeTimeFormat(`en`, {
    numeric: `auto`,
  }),
  ue_demo_Cgk5A601: RecoveredValue = new Intl.DateTimeFormat(`en`, {
    weekday: `short`,
  }),
  D_demo_Cgk5A601: RecoveredValue = new Intl.DateTimeFormat(`en`, {
    month: `short`,
    day: `numeric`,
  }),
  O_demo_Cgk5A601: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    let n: RecoveredValue = Math.max(0, Math.round((t - e) / 6e4));
    if (n < 1) return `now`;
    if (n < 60) return `${n}m`;
    let r: RecoveredValue = Math.round(n / 60);
    return r < 24 ? `${r}h` : `${Math.round(r / 24)}d`;
  },
  k_demo_Cgk5A601: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    let n: RecoveredValue = Math.max(0, Math.round((t - e) / 6e4));
    if (n < 1) return `just now`;
    if (n < 60) return E_demo_Cgk5A601.format(-n, `minute`);
    let r: RecoveredValue = Math.round(n / 60);
    return r < 24
      ? E_demo_Cgk5A601.format(-r, `hour`)
      : E_demo_Cgk5A601.format(-Math.round(r / 24), `day`);
  },
  A_demo_Cgk5A601: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    let n: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        new Date(e).setHours(0, 0, 0, 0),
      r: RecoveredValue = Math.round((n(t) - n(e)) / 864e5);
    return r <= 0
      ? `Today`
      : r === 1
        ? `Yesterday`
        : r < 7
          ? ue_demo_Cgk5A601.format(e)
          : D_demo_Cgk5A601.format(e);
  },
  j_demo_Cgk5A601: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue =>
    e.done
      ? `${n.done} · ${A_demo_Cgk5A601(e.updatedAt, t)}`
      : e.statusText
        ? e.statusText
        : M_demo_Cgk5A601(e) > 0
          ? n.waiting
          : e.status === `planning`
            ? n.planning
            : e.status === `paused`
              ? n.paused
              : n.running,
  M_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.done ? 0 : e.asks ? e.asks.length : (e.needs ?? 0),
  de_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.done ? [] : (e.asks ?? []),
  N_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e.steps ?? [];
    return t.length
      ? t.filter((e?: RecoveredValue): RecoveredValue => e.done).length / t.length
      : 0;
  },
  fe_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    !!e &&
    (e instanceof HTMLInputElement ||
      e instanceof HTMLTextAreaElement ||
      e.isContentEditable),
  pe_demo_Cgk5A601: RecoveredValue = (
    e?: RecoveredValue,
    t: RecoveredValue = !0,
  ): RecoveredValue => {
    e &&
      (t &&
        (e.setAttribute(`data-quiet`, ``),
        e.addEventListener(
          `blur`,
          (): RecoveredValue => e.removeAttribute(`data-quiet`),
          {
            once: !0,
          },
        )),
      e.focus({
        preventScroll: !0,
      }));
  },
  P_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue => `g:${e}`,
  F_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue => `t:${e}`,
  I_demo_Cgk5A601: RecoveredValue = 420;
function L_demo_Cgk5A601({
  workspace = `Fieldwork`,
  tasks = oe_demo_Cgk5A601,
  projects,
  artifacts = se_demo_Cgk5A601,
  defaultTab = `active`,
  defaultSelected = `ingest`,
  onSelect,
  onCreate,
  onOpenInbox,
  onOpenArtifact,
  onArtifactChange,
  suggested,
  labels = {},
  onNavigate,
  ...re
}: RecoveredValue): RecoveredValue {
  let y: RecoveredValue = {
      ...le_demo_Cgk5A601,
      ...labels,
    },
    [b, C]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(tasks);
  (0, x_demo_Cgk5A601.useEffect)((): RecoveredValue => C(tasks), [tasks]);
  let [E, ue]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(defaultTab),
    [D, O]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(defaultSelected),
    [k, A]: RecoveredValue = (0, x_demo_Cgk5A601.useState)([]),
    [j, N]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(null),
    [I, L]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(!1),
    [R, z]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(``),
    [B, V]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(null),
    [H, U]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(null),
    [be, xe]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(
      (): RecoveredValue => Date.now(),
    ),
    [Se, Ce]: RecoveredValue = (0, x_demo_Cgk5A601.useState)(``),
    [we, Te]: RecoveredValue = Bt_component_BUnqa8Km(),
    W: RecoveredValue = (0, x_demo_Cgk5A601.useRef)(null),
    Ee: RecoveredValue = (0, x_demo_Cgk5A601.useRef)(null),
    G: RecoveredValue = (0, x_demo_Cgk5A601.useRef)(null),
    De: RecoveredValue = (0, x_demo_Cgk5A601.useRef)(null),
    Oe: RecoveredValue = (0, x_demo_Cgk5A601.useRef)(null);
  ((0, x_demo_Cgk5A601.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        ([
          `Tab`,
          `ArrowUp`,
          `ArrowDown`,
          `ArrowLeft`,
          `ArrowRight`,
          `Home`,
          `End`,
        ].includes(t) ||
          ((t === `j` || t === `k`) &&
            !fe_demo_Cgk5A601(document.activeElement as HTMLElement))) &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.altKey &&
          W.current?.setAttribute(`data-kb`, ``);
      },
      t: RecoveredValue = (): RecoveredValue => {
        W.current?.removeAttribute(`data-kb`);
      };
    return (
      window.addEventListener(`keydown`, e, !0),
      window.addEventListener(`pointerdown`, t, !0),
      (): RecoveredValue => {
        (window.removeEventListener(`keydown`, e, !0),
          window.removeEventListener(`pointerdown`, t, !0));
      }
    );
  }, []),
    (0, x_demo_Cgk5A601.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = window.setInterval(
        (): RecoveredValue => xe(Date.now()),
        3e4,
      );
      return (): RecoveredValue => window.clearInterval(e);
    }, []),
    (0, x_demo_Cgk5A601.useEffect)((): RecoveredValue => {
      if (!H) return;
      let e: RecoveredValue = window.setTimeout((): RecoveredValue => U(null), 500);
      return (): RecoveredValue => window.clearTimeout(e);
    }, [H]));
  let K: RecoveredValue = (0, x_demo_Cgk5A601.useMemo)((): RecoveredValue => {
      let e: RecoveredValue = [...(projects ?? [])];
      for (let t of b) e.includes(t.project) || e.push(t.project);
      return e;
    }, [projects, b]),
    ke: RecoveredValue = (0, x_demo_Cgk5A601.useMemo)((): RecoveredValue => {
      let e: RecoveredValue = b.filter(
        (e?: RecoveredValue): RecoveredValue => (E === `done` ? e.done : !e.done),
      );
      return E === `done`
        ? [...e].sort(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
              t.updatedAt - e.updatedAt,
          )
        : e;
    }, [b, E]),
    Ae: RecoveredValue = K.map(
      (e?: RecoveredValue): RecoveredValue => ({
        project: e,
        tasks: ke.filter((t?: RecoveredValue): RecoveredValue => t.project === e),
      }),
    ),
    q: RecoveredValue = Ae.flatMap(
      (e?: RecoveredValue): RecoveredValue => [
        P_demo_Cgk5A601(e.project),
        ...(k.includes(e.project)
          ? []
          : e.tasks.map((e?: RecoveredValue): RecoveredValue => F_demo_Cgk5A601(e.id))),
      ],
    ),
    J: RecoveredValue =
      j && q.includes(j)
        ? j
        : D && q.includes(F_demo_Cgk5A601(D))
          ? F_demo_Cgk5A601(D)
          : (q[0] ?? null),
    Y: RecoveredValue =
      b.find((e?: RecoveredValue): RecoveredValue => e.id === D) ?? null,
    je: RecoveredValue = b.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + M_demo_Cgk5A601(t),
      0,
    ),
    Me: RecoveredValue = b.filter((e?: RecoveredValue): RecoveredValue => !e.done).length,
    Ne: RecoveredValue = b.length - Me,
    Pe: RecoveredValue = Zt({
      tabs: [
        {
          id: `task`,
          title: Y?.title ?? y.tasks,
          icon: C_component_BUnqa8Km,
          content: Y ? (
            <ComponentVe
              task={Y}
              now={be}
              labels={y}
              onOpenArtifact={(e?: RecoveredValue): RecoveredValue => Pe.open(e, Y.title)}
              onInbox={(): RecoveredValue => Ie(Y.id)}
              onAgents={(): RecoveredValue => onNavigate?.(`Agent Orchestration`)}
              key={Y.id}
            />
          ) : (
            <div className={`ui-at-task ui-at-task--empty`}>
              <ComponentC_component_BUnqa8Km
                bare={!0}
                title={y.noTask}
                text={y.noTaskText}
              />
            </div>
          ),
        },
      ],
      defaultTabs: [`task`],
      artifacts: artifacts,
      onOpenArtifact: (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        onOpenArtifact?.(t ?? Y?.title ?? ``, e),
      onArtifactChange: onArtifactChange,
      newTab: {
        sources:
          suggested ??
          (artifacts === se_demo_Cgk5A601
            ? ce_demo_Cgk5A601
            : Object.keys(artifacts)
                .slice(0, 3)
                .map(
                  (e?: RecoveredValue): RecoveredValue => w_demo_Cgk5A601(e, `Artifact`),
                )),
      },
    });
  (0, x_demo_Cgk5A601.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = Oe.current;
    e &&
      ((Oe.current = null),
      Ee.current?.querySelector(`[data-key="${CSS.escape(e)}"]`)?.focus({
        preventScroll: !1,
      }));
  });
  let Fe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (Ce(``), window.setTimeout((): RecoveredValue => Ce(e), 30));
    },
    X: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (N(e), (Oe.current = e));
    },
    Ie: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = b.find((t?: RecoveredValue): RecoveredValue => t.id === e),
        n: RecoveredValue = t ? de_demo_Cgk5A601(t)[0]?.id : void 0;
      onOpenInbox ? onOpenInbox(e, n) : onNavigate?.(`Inbox`);
    },
    Z: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (!q.length) return;
      let t: RecoveredValue = J ? q.indexOf(J) : -1,
        n: RecoveredValue = q[Math.min(q.length - 1, Math.max(0, t + e))];
      n && X(n);
    },
    Le: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (O(e), N(F_demo_Cgk5A601(e)), Pe.show(`task`), onSelect?.(e));
    },
    Q: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      (A(
        (n?: RecoveredValue): RecoveredValue =>
          t
            ? n.includes(e)
              ? n
              : [...n, e]
            : n.filter((t?: RecoveredValue): RecoveredValue => t !== e),
      ),
        t &&
          J?.startsWith(`t:`) &&
          b.find((e?: RecoveredValue): RecoveredValue => F_demo_Cgk5A601(e.id) === J)
            ?.project === e &&
          X(P_demo_Cgk5A601(e)));
    },
    Re: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (ue(e), N(null));
    },
    $: RecoveredValue = (): RecoveredValue => {
      (E !== `active` && Re(`active`),
        B || V(Y?.project ?? K[0] ?? null),
        L(!0),
        window.requestAnimationFrame((): RecoveredValue => G.current?.focus()));
    },
    ze: RecoveredValue = (e: RecoveredValue = !0): RecoveredValue => {
      (L(!1),
        z(``),
        e &&
          window.requestAnimationFrame(
            (): RecoveredValue => pe_demo_Cgk5A601(De.current),
          ));
    },
    Be: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = R.trim();
      if (!e) {
        (Te(y.writeFirst), Fe(y.writeFirst), G.current?.focus());
        return;
      }
      let t: RecoveredValue = B ?? K[0] ?? `Tasks`,
        n: RecoveredValue = {
          id: `task-${Date.now().toString(36)}`,
          title: ge_demo_Cgk5A601(e),
          project: t,
          status: `planning`,
          statusText: y.planning,
          updatedAt: Date.now(),
          goal: e,
          started: `Today`,
          history: [`You asked for it – the orchestrator is planning the steps`],
        };
      (C((e?: RecoveredValue): RecoveredValue => {
        let r: RecoveredValue = e.findIndex(
          (e?: RecoveredValue): RecoveredValue => e.project === t,
        );
        return r < 0 ? [...e, n] : [...e.slice(0, r), n, ...e.slice(r)];
      }),
        A(
          (e?: RecoveredValue): RecoveredValue =>
            e.filter((e?: RecoveredValue): RecoveredValue => e !== t),
        ),
        U(n.id),
        O(n.id),
        N(F_demo_Cgk5A601(n.id)),
        z(``),
        G.current && ((G.current.style.height = ``), G.current.focus()),
        onCreate?.(n),
        onSelect?.(n.id),
        Fe(`${y.created} in ${t}`));
    },
    Ve: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.isComposing)
        return;
      let t: RecoveredValue = document.activeElement as HTMLElement;
      if (
        (t && t !== document.body && !W.current?.contains(t)) ||
        fe_demo_Cgk5A601(t) ||
        t?.closest(`.ui-as-popover`)
      )
        return;
      let n: RecoveredValue = e.key.length === 1 ? e.key.toLowerCase() : e.key,
        r: RecoveredValue = !!Ee.current?.contains(t);
      if (n === `Escape` && I) return (e.preventDefault(), ze());
      if (n === `c` || n === `n`) return (e.preventDefault(), $());
      if (
        n === `j` ||
        n === `k` ||
        ((n === `ArrowDown` || n === `ArrowUp`) && (!t || t === document.body))
      )
        return (
          e.preventDefault(),
          !r && J ? X(J) : Z(n === `j` || n === `ArrowDown` ? 1 : -1)
        );
    },
    He: RecoveredValue = (0, x_demo_Cgk5A601.useRef)(Ve);
  ((He.current = Ve),
    (0, x_demo_Cgk5A601.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => He.current(e);
      return (
        window.addEventListener(`keydown`, e),
        (): RecoveredValue => window.removeEventListener(`keydown`, e)
      );
    }, []));
  let Ue: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      let t: RecoveredValue = e.target.closest(`[data-key]`)?.dataset.key;
      if (!t) return;
      let n: RecoveredValue = t.startsWith(`g:`),
        r: RecoveredValue = t.slice(2),
        i: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
          (e.preventDefault(), t());
        };
      switch (e.key) {
        case `ArrowDown`:
          return i((): RecoveredValue => Z(1));
        case `ArrowUp`:
          return i((): RecoveredValue => Z(-1));
        case `Home`:
          return i((): RecoveredValue => q[0] && X(q[0]));
        case `End`:
          return i((): RecoveredValue => q.length && X(q[q.length - 1]));
        case `ArrowRight`:
          return n ? i((): RecoveredValue => (k.includes(r) ? Q(r, !1) : Z(1))) : void 0;
        case `ArrowLeft`:
          return i(
            n
              ? (): RecoveredValue => Q(r, !0)
              : (): RecoveredValue => {
                  let e: RecoveredValue = b.find(
                    (e?: RecoveredValue): RecoveredValue => e.id === r,
                  )?.project;
                  e && X(P_demo_Cgk5A601(e));
                },
          );
        case `Enter`:
        case ` `:
          return i((): RecoveredValue => (n ? Q(r, !k.includes(r)) : Le(r)));
      }
    },
    We: RecoveredValue = [`active`, `done`],
    Ge: RecoveredValue = ke.length === 0;
  return (
    <Component_
      active={`Tasks`}
      nav={ie_demo_Cgk5A601(je)}
      groups={ae_demo_Cgk5A601}
      workspace={workspace}
      workspaceMeta={`Pro · Personal`}
      sideCards={!1}
      workArea={Pe}
      panelTitle={`Task`}
      panelWidth={{
        default: 380,
        min: 300,
        max: 520,
      }}
      onNavigate={onNavigate}
      {...re}
    >
      <div ref={W as RecoveredValue} className={`ui-at`}>
        <header className={`ui-at-head`}>
          <h1 className={`ui-at-title`}>
            {y.tasks}
            <span
              className={`ui-at-num ui-at-title__count`}
              aria-label={`${T_demo_Cgk5A601.format(E === `active` ? Me : Ne)} ${E === `active` ? y.active : y.done}`.toLowerCase()}
            >
              {T_demo_Cgk5A601.format(E === `active` ? Me : Ne)}
            </span>
          </h1>
          <div
            className={`ui-at-seg`}
            role={`tablist`}
            aria-label={`Show`}
            onKeyDown={(e?: RecoveredValue): RecoveredValue =>
              xt_component_BUnqa8Km(e, We, E, Re)
            }
          >
            {We.map(
              (e?: RecoveredValue): RecoveredValue => (
                <button
                  type={`button`}
                  role={`tab`}
                  id={`ui-at-tab-${e}`}
                  aria-selected={E === e}
                  aria-controls={`ui-at-list`}
                  tabIndex={E === e ? 0 : -1}
                  onClick={(): RecoveredValue => Re(e)}
                  children={e === `active` ? y.active : y.done}
                  key={e}
                />
              ),
            )}
          </div>
          <button
            ref={De as RecoveredValue}
            type={`button`}
            className={`ui-at-btn ui-at-head__new`}
            aria-label={y.newTask}
            aria-keyshortcuts={`C N`}
            aria-expanded={I}
            onClick={(): RecoveredValue => (I ? G.current?.focus() : $())}
          >
            <ComponentP_component_BUnqa8Km icon={e_Add01Icon_CdIdvCVr} size={14} />
            <span>{y.newTask}</span>
            <kbd className={`ui-at-kbd`}>{`C`}</kbd>
          </button>
        </header>
        {I && (
          <Component_e
            inputRef={G}
            value={R}
            project={B ?? K[0] ?? ``}
            projects={K}
            labels={y}
            onChange={z}
            onProject={(e?: RecoveredValue): RecoveredValue => {
              (V(e), window.setTimeout((): RecoveredValue => G.current?.focus(), 0));
            }}
            onCreate={Be}
            onClose={(): RecoveredValue => ze()}
          />
        )}
        <div className={`ui-at-scroll`}>
          {Ge ? (
            <div
              id={`ui-at-list`}
              className={`ui-at-center`}
              role={`tabpanel`}
              aria-labelledby={`ui-at-tab-${E}`}
            >
              <ComponentC_component_BUnqa8Km
                bare={!0}
                title={E === `active` ? y.emptyActive : y.emptyDone}
                text={E === `active` ? y.emptyActiveText : y.emptyDoneText}
                action={
                  E === `active` ? (
                    <button type={`button`} className={`ui-at-btn`} onClick={$}>
                      <ComponentP_component_BUnqa8Km
                        icon={e_Add01Icon_CdIdvCVr}
                        size={14}
                      />
                      <span>{y.newTask}</span>
                    </button>
                  ) : (
                    void 0
                  )
                }
              />
            </div>
          ) : (
            <div
              ref={Ee as RecoveredValue}
              id={`ui-at-list`}
              className={`ui-at-tree`}
              role={`tree`}
              aria-labelledby={`ui-at-tab-${E}`}
              onKeyDown={Ue}
            >
              {Ae.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
                let n: RecoveredValue = !k.includes(e.project);
                return (
                  <div className={`ui-at-group`} role={`none`} key={e.project}>
                    <ComponentMe
                      project={e.project}
                      count={e.tasks.length}
                      open={n}
                      tabStop={J === P_demo_Cgk5A601(e.project)}
                      pos={t + 1}
                      size={Ae.length}
                      onToggle={(): RecoveredValue => {
                        (N(P_demo_Cgk5A601(e.project)), Q(e.project, n));
                      }}
                      onFocus={(): RecoveredValue => N(P_demo_Cgk5A601(e.project))}
                    />
                    {n &&
                      (e.tasks.length ? (
                        e.tasks.map(
                          (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
                            <ComponentHe
                              task={t}
                              now={be}
                              labels={y}
                              selected={t.id === D}
                              tabStop={J === F_demo_Cgk5A601(t.id)}
                              fresh={t.id === H}
                              pos={n + 1}
                              size={e.tasks.length}
                              onOpen={(): RecoveredValue => Le(t.id)}
                              onNeeds={(): RecoveredValue => Ie(t.id)}
                              onFocus={(): RecoveredValue => N(F_demo_Cgk5A601(t.id))}
                              key={t.id}
                            />
                          ),
                        )
                      ) : (
                        <p className={`ui-at-group__empty`} aria-hidden={`true`}>
                          {y.noTasks}
                        </p>
                      ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <p className={`ui-at-sr`} role={`status`} aria-live={`polite`}>
          {Se}
        </p>
        {we}
      </div>
    </Component_>
  );
}
function ComponentMe({
  project,
  count,
  open,
  tabStop,
  pos,
  size,
  onToggle,
  onFocus,
}: RecoveredValue): RecoveredValue {
  return (
    <div
      role={`treeitem`}
      className={`ui-at-ghead`}
      data-key={P_demo_Cgk5A601(project)}
      aria-level={1}
      aria-expanded={open}
      aria-posinset={pos}
      aria-setsize={size}
      aria-label={`${project}, ${count === 1 ? `1 task` : `${T_demo_Cgk5A601.format(count)} tasks`}`}
      tabIndex={tabStop ? 0 : -1}
      onClick={onToggle}
      onFocus={onFocus}
    >
      <span className={`ui-at-ghead__chev`} aria-hidden={`true`}>
        <ComponentP_component_BUnqa8Km icon={f_component_BUnqa8Km} size={14} />
      </span>
      <span className={`ui-at-ghead__icon`} aria-hidden={`true`}>
        <ComponentP_component_BUnqa8Km icon={oe_component_BUnqa8Km} size={14} />
      </span>
      <span className={`ui-at-ghead__name`} dir={`auto`} title={project}>
        {project}
      </span>
      <span className={`ui-at-num ui-at-ghead__count`} aria-hidden={`true`}>
        {T_demo_Cgk5A601.format(count)}
      </span>
    </div>
  );
}
function ComponentHe({
  task,
  now,
  labels,
  selected,
  tabStop,
  fresh,
  pos,
  size,
  onOpen,
  onNeeds,
  onFocus,
}: RecoveredValue): RecoveredValue {
  let d: RecoveredValue = j_demo_Cgk5A601(task, now, labels),
    f: RecoveredValue = task.steps ?? [],
    m: RecoveredValue = f.filter((e?: RecoveredValue): RecoveredValue => e.done).length,
    g: RecoveredValue = task.artifacts?.length ?? 0,
    _: RecoveredValue = M_demo_Cgk5A601(task),
    ee: RecoveredValue = [
      task.title,
      d,
      _ ? `${labels.needsYou}${_ > 1 ? `, ${_}` : ``}` : ``,
      f.length ? `${m} of ${f.length} steps` : ``,
      g ? `${g} ${g === 1 ? `artifact` : `artifacts`}` : ``,
      task.done ? `` : `updated ${k_demo_Cgk5A601(task.updatedAt, now)}`,
    ]
      .filter(Boolean)
      .join(`, `);
  return (
    <div
      role={`treeitem`}
      className={`ui-at-row`}
      data-key={F_demo_Cgk5A601(task.id)}
      data-done={task.done || void 0}
      data-fresh={fresh || void 0}
      aria-level={2}
      aria-posinset={pos}
      aria-setsize={size}
      aria-selected={selected}
      aria-label={ee}
      tabIndex={tabStop ? 0 : -1}
      onClick={onOpen}
      onFocus={onFocus}
    >
      <ComponentZ task={task} />
      <span className={`ui-at-row__main`}>
        <span className={`ui-at-row__title`} dir={`auto`} title={task.title}>
          {task.title}
        </span>
        <span className={`ui-at-row__status`} dir={`auto`}>
          {d}
        </span>
      </span>
      {_ > 0 && (
        <span
          className={`ui-at-badge ui-at-row__needs`}
          aria-hidden={`true`}
          onClick={(e?: RecoveredValue): RecoveredValue => {
            (e.stopPropagation(), onNeeds());
          }}
        >
          {labels.needsYou}
          {_ > 1 && (
            <span className={`ui-at-num`}>
              {` · `}
              {T_demo_Cgk5A601.format(_)}
            </span>
          )}
        </span>
      )}
      <span className={`ui-at-num ui-at-row__steps`} aria-hidden={`true`}>
        {f.length ? `${m}/${f.length}` : ``}
      </span>
      <span className={`ui-at-num ui-at-row__files`} aria-hidden={`true`}>
        {g > 0 && (
          <S_demo_Cgk5A601.Fragment>
            <ComponentP_component_BUnqa8Km icon={P_component_BUnqa8Km} size={13} />
            {T_demo_Cgk5A601.format(g)}
          </S_demo_Cgk5A601.Fragment>
        )}
      </span>
      <span className={`ui-at-num ui-at-row__time`} aria-hidden={`true`}>
        {O_demo_Cgk5A601(task.updatedAt, now)}
      </span>
    </div>
  );
}
var R_demo_Cgk5A601: RecoveredValue = (
  e?: RecoveredValue,
  t?: RecoveredValue,
): RecoveredValue =>
  t || e >= 1
    ? `var(--at-c-blue)`
    : e <= 0.25
      ? `var(--at-c-orange)`
      : e <= 0.5
        ? `var(--at-c-amber)`
        : `var(--at-c-teal)`;
function ComponentZ({ task }: RecoveredValue): RecoveredValue {
  let t: RecoveredValue =
      !task.done && task.status === `planning` && !(task.steps?.length ?? 0),
    n: RecoveredValue = task.done ? 1 : N_demo_Cgk5A601(task),
    r: RecoveredValue = 2 * Math.PI * 2;
  return (
    <svg
      className={`ui-at-mark`}
      data-done={task.done ? `` : void 0}
      viewBox={`0 0 14 14`}
      width={`14`}
      height={`14`}
      aria-hidden={`true`}
      style={
        {
          color: t ? `var(--muted)` : R_demo_Cgk5A601(n, !!task.done),
        } as RecoveredValue
      }
    >
      <circle
        cx={`7`}
        cy={`7`}
        r={`6`}
        fill={`none`}
        stroke={`currentColor`}
        strokeWidth={`1.5`}
        strokeDasharray={t ? `2 1.77` : void 0}
        opacity={t ? 0.7 : void 0}
      />
      {!t && n > 0 && (
        <circle
          cx={`7`}
          cy={`7`}
          r={2}
          fill={`none`}
          stroke={`currentColor`}
          strokeWidth={4}
          strokeDasharray={`${r * n} ${r}`}
          transform={`rotate(-90 7 7)`}
        />
      )}
    </svg>
  );
}
var B_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    ((e.style.height = `auto`), (e.style.height = `${Math.min(e.scrollHeight, 168)}px`));
  },
  ge_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue =
      e
        .split(
          `
`,
        )
        .find((e?: RecoveredValue): RecoveredValue => e.trim())
        ?.trim() ?? e;
    return t.length > 72 ? `${t.slice(0, 71).trimEnd()}…` : t;
  };
function Component_e({
  inputRef,
  value,
  project,
  projects,
  labels,
  onChange,
  onProject,
  onCreate,
  onClose,
}: RecoveredValue): RecoveredValue {
  return (
    <div className={`ui-at-new`} role={`group`} aria-label={labels.newTask}>
      <svg
        className={`ui-at-mark`}
        viewBox={`0 0 14 14`}
        width={`14`}
        height={`14`}
        aria-hidden={`true`}
      >
        <circle
          cx={`7`}
          cy={`7`}
          r={`6`}
          fill={`none`}
          stroke={`currentColor`}
          strokeWidth={`1.5`}
          strokeDasharray={`2 1.77`}
          opacity={`0.7`}
        />
      </svg>
      <textarea
        ref={inputRef as RecoveredValue}
        className={`ui-at-new__input`}
        rows={1}
        value={value}
        placeholder={labels.placeholder}
        aria-label={labels.placeholder}
        aria-describedby={`ui-at-new-hint`}
        dir={`auto`}
        onChange={(e?: RecoveredValue): RecoveredValue => {
          (onChange(e.target.value), B_demo_Cgk5A601(e.currentTarget));
        }}
        onKeyDown={(e?: RecoveredValue): RecoveredValue => {
          e.nativeEvent.isComposing ||
            (e.key === `Enter` && !e.shiftKey
              ? (e.preventDefault(), onCreate())
              : e.key === `Escape` && (e.preventDefault(), onClose()));
        }}
      />
      <span
        id={`ui-at-new-hint`}
        className={`ui-at-sr`}
      >{`Enter creates the task, Shift+Enter starts a new line`}</span>
      <ComponentD_component_BUnqa8Km
        align={`end`}
        title={`Project`}
        className={`ui-at-new__project`}
        trigger={({ open, toggle }: RecoveredValue): RecoveredValue => (
          <button
            type={`button`}
            className={`ui-at-btn ui-at-btn--quiet`}
            aria-haspopup={`menu`}
            aria-expanded={open}
            aria-label={`Project: ${project}`}
            onClick={toggle}
          >
            <ComponentP_component_BUnqa8Km icon={oe_component_BUnqa8Km} size={14} />
            <span className={`ui-at-new__name`}>{project}</span>
            <ComponentP_component_BUnqa8Km icon={f_component_BUnqa8Km} size={12} />
          </button>
        )}
        items={projects.map(
          (e?: RecoveredValue): RecoveredValue => ({
            label: e,
            icon: oe_component_BUnqa8Km,
            checked: e === project,
            onSelect: (): RecoveredValue => onProject(e),
          }),
        )}
      />
      <button
        type={`button`}
        className={`ui-at-btn ui-at-btn--dark`}
        aria-disabled={!value.trim() || void 0}
        onClick={onCreate}
      >
        {labels.create}
      </button>
    </div>
  );
}
function ComponentVe({
  task,
  now,
  labels,
  onOpenArtifact,
  onInbox,
  onAgents,
}: RecoveredValue): RecoveredValue {
  let o: RecoveredValue = task.steps ?? [],
    s: RecoveredValue = o.filter((e?: RecoveredValue): RecoveredValue => e.done).length,
    c: RecoveredValue = o.findIndex((e?: RecoveredValue): RecoveredValue => !e.done),
    u: RecoveredValue = M_demo_Cgk5A601(task),
    d: RecoveredValue = de_demo_Cgk5A601(task)[0],
    h: RecoveredValue = (task.history ?? []).slice(0, 4),
    g: RecoveredValue = task.artifacts ?? [],
    _: RecoveredValue = [...(task.decided ?? [])]
      .sort((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => t.at - e.at)
      .slice(0, 3),
    ee: RecoveredValue =
      u === 1
        ? labels.decisionOne
        : labels.decisionMany.replace(`{n}`, T_demo_Cgk5A601.format(u));
  return (
    <div className={`ui-at-task`} aria-label={`Task: ${task.title}`}>
      {task.goal && (
        <p className={`ui-at-task__goal`} dir={`auto`}>
          {task.goal}
        </p>
      )}
      {u > 0 && (
        <div className={`ui-at-needs`}>
          <span className={`ui-at-needs__text`}>
            <span className={`ui-at-needs__head`}>
              <span className={`ui-at-badge`}>{labels.needsYou}</span>
              <span className={`ui-at-needs__count`}>{ee}</span>
            </span>
            {d && (
              <span className={`ui-at-needs__q`} dir={`auto`} title={d.question}>
                {d.question}
              </span>
            )}
          </span>
          <button
            type={`button`}
            className={`ui-at-btn ui-at-btn--dark`}
            aria-label={`${labels.decide} in Inbox${d ? `: ${d.question}` : ``}`}
            onClick={onInbox}
          >
            {labels.decide}
          </button>
        </div>
      )}
      <dl className={`ui-at-task__props`}>
        <div>
          <dt>{`Status`}</dt>
          <dd>
            <ComponentZ task={task} />
            <span>{j_demo_Cgk5A601(task, now, labels)}</span>
            {o.length > 0 && (
              <span className={`ui-at-num ui-at-task__faint`}>
                {s}
                {`/`}
                {o.length}
              </span>
            )}
          </dd>
        </div>
        <div>
          <dt>{`Project`}</dt>
          <dd>
            <span dir={`auto`} title={task.project}>
              {task.project}
            </span>
          </dd>
        </div>
        {task.started && (
          <div>
            <dt>{`Started`}</dt>
            <dd>
              <span>{task.started}</span>
            </dd>
          </div>
        )}
      </dl>
      {o.length > 0 && (
        <section className={`ui-at-task__section`} aria-label={labels.steps}>
          <h3 className={`ui-at-task__label`}>{labels.steps}</h3>
          <ol className={`ui-at-steps`}>
            {o.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
              let r: RecoveredValue = e.done
                ? `done`
                : t === c
                  ? u > 0
                    ? `you`
                    : `now`
                  : `later`;
              return (
                <li className={`ui-at-step`} data-state={r} key={e.label}>
                  <span className={`ui-at-step__mark`} aria-hidden={`true`}>
                    {e.done && (
                      <ComponentP_component_BUnqa8Km
                        icon={et_component_BUnqa8Km}
                        size={10}
                        stroke={2.6}
                      />
                    )}
                  </span>
                  <span className={`ui-at-step__label`} dir={`auto`} title={e.label}>
                    {e.label}
                  </span>
                  {r === `you` && (
                    <span
                      className={`ui-at-badge ui-at-step__note`}
                      role={`img`}
                      aria-label={labels.needsYou}
                      title={labels.needsYou}
                    >
                      <ComponentP_component_BUnqa8Km
                        icon={e_Alert02Icon_Cb_Wz6Pv}
                        size={12}
                        stroke={2}
                      />
                    </span>
                  )}
                  <span className={`ui-at-sr`}>
                    {r === `done`
                      ? `, done`
                      : r === `you`
                        ? `, waiting on you`
                        : r === `now`
                          ? `, in progress`
                          : ``}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      )}
      {h.length > 0 && (
        <section className={`ui-at-task__section`} aria-label={labels.happened}>
          <h3 className={`ui-at-task__label`}>{labels.happened}</h3>
          <ul className={`ui-at-history`}>
            {h.map(
              (e?: RecoveredValue): RecoveredValue => (
                <li dir={`auto`} children={e} key={e} />
              ),
            )}
          </ul>
        </section>
      )}
      {g.length > 0 && (
        <section className={`ui-at-task__section`} aria-label={labels.artifacts}>
          <h3 className={`ui-at-task__label`}>
            {labels.artifacts}
            {` `}
            <span className={`ui-at-num ui-at-task__faint`}>{g.length}</span>
          </h3>
          <ComponentM names={g} onOpen={onOpenArtifact} />
        </section>
      )}
      {_.length > 0 && (
        <section className={`ui-at-task__section`} aria-label={labels.decided}>
          <h3 className={`ui-at-task__label`}>{labels.decided}</h3>
          <ul className={`ui-at-decided`}>
            {_.map(
              (e?: RecoveredValue): RecoveredValue => (
                <li key={e.question + e.at}>
                  <ComponentP_component_BUnqa8Km icon={et_component_BUnqa8Km} size={14} />
                  <span className={`ui-at-decided__text`}>
                    <span className={`ui-at-decided__q`} dir={`auto`} title={e.question}>
                      {e.question}
                    </span>
                    <span className={`ui-at-decided__a`} dir={`auto`}>
                      {e.answer}
                      {` · `}
                      {k_demo_Cgk5A601(e.at, now)}
                    </span>
                  </span>
                </li>
              ),
            )}
          </ul>
        </section>
      )}
      <div className={`ui-at-task__links`}>
        <button type={`button`} className={`ui-at-link`} onClick={onAgents}>
          <span>{labels.showAgents}</span>
          <ComponentP_component_BUnqa8Km icon={h_component_BUnqa8Km} size={12} />
        </button>
      </div>
    </div>
  );
}
var V_demo_Cgk5A601: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Hd(e === `Inbox` ? `Agent Inbox` : e),
  H_demo_Cgk5A601: RecoveredValue = (): RecoveredValue =>
    typeof window > `u`
      ? void 0
      : (new URLSearchParams(window.location.search).get(`task`) ?? void 0);
function Runtime(): RecoveredValue {
  let e: RecoveredValue = H_demo_Cgk5A601();
  return (
    <ComponentN>
      <L_demo_Cgk5A601
        defaultSelected={e}
        onNavigate={V_demo_Cgk5A601}
        onOpenInbox={(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          Hd(
            `Agent Inbox`,
            t
              ? {
                  item: t,
                }
              : void 0,
          )
        }
        key={e}
      />
    </ComponentN>
  );
}
const styles = "";
function Preview(): ReactElement {
  return (
    <>
      <Id.Provider value={true}>
        <Runtime />
      </Id.Provider>
    </>
  );
}
export { Preview };
export default Preview;
