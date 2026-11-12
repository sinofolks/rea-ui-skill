"use client";

import "./GlassFolder.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React_react_BkAXpnfr from "react";
import type { ReactElement } from "react";
import * as React from "react/jsx-runtime";
import * as ReactDOM from "react-dom";
/** Explicit migration boundary for values whose original types were erased.
 * Keep this alias private. Replace usages with concrete types as internals are refactored.
 * Public component contracts never expose this type. See docs/type-migration.md.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecoveredValue = any;
const t_jsx_runtime_CTsRTJUX: RecoveredValue = (): RecoveredValue => React;
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
const t_react_BkAXpnfr: RecoveredValue = (): RecoveredValue => React_react_BkAXpnfr;
const ne_index_BzMVbDoG = () => ReactDOM;
let uc = "";
var D_index_BzMVbDoG: RecoveredValue = t_react_BkAXpnfr();
var z: RecoveredValue = t_jsx_runtime_CTsRTJUX();
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
function zd({ children }: RecoveredValue): RecoveredValue {
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
function ComponentT({
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
  return <z.Fragment>{Mp((until ?? now ?? r) - since)}</z.Fragment>;
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
            <z.Fragment>
              <span>{`How should actions be approved?`}</span>
              <button
                type={`button`}
                className={`ui-ccc__menu-link`}
                onClick={onLearnMore}
              >{`Learn more`}</button>
            </z.Fragment>
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
var n_demo_C2ERQ1RL: RecoveredValue = t_jsx_runtime_CTsRTJUX();
function Runtime(): RecoveredValue {
  return (
    <div className={`glass-folder-demo`}>
      <ComponentT />
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
