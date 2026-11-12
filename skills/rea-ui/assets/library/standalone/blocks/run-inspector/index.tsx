"use client";

import "./RunInspector.css";
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
var n_component_DR5s13JD: RecoveredValue = t_react_BkAXpnfr(),
  r_component_DR5s13JD: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_DR5s13JD: RecoveredValue = {
    queued: `Queued`,
    running: `Running`,
    waiting: `Needs you`,
    done: `Done`,
    failed: `Failed`,
    stopped: `Stopped`,
  },
  a_component_DR5s13JD: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e > 0 && e < 0.005
      ? `<$0.01`
      : `$${e < 10 ? e.toFixed(2) : Math.round(e).toLocaleString(`en-US`)}`,
  o_component_DR5s13JD: RecoveredValue = new Intl.NumberFormat(`en-US`),
  s_component_DR5s13JD: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = Math.max(0, Math.round(e / 1e3));
    if (t < 60) return `${t}s`;
    let n: RecoveredValue = Math.floor(t / 60);
    if (n < 60) return `${n}m ${String(t % 60).padStart(2, `0`)}s`;
    let r: RecoveredValue = Math.floor(n / 60);
    return r < 24
      ? `${r}h ${String(n % 60).padStart(2, `0`)}m`
      : `${Math.floor(r / 24)}d ${r % 24}h`;
  },
  c_component_DR5s13JD: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e
      .split(/\s+/)
      .map(
        (e?: RecoveredValue): RecoveredValue =>
          (Array.from(e.replace(/^[^\p{L}\p{N}]+/u, ``)) as RecoveredValue[])[0],
      )
      .filter(Boolean)
      .slice(0, 2)
      .join(``)
      .toUpperCase(),
  l_component_DR5s13JD: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
    e,
    ...(e.children ?? []).flatMap(l_component_DR5s13JD),
  ],
  u_component_DR5s13JD: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    (e.cost ?? 0) +
    (e.children ?? []).reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + u_component_DR5s13JD(t),
      0,
    ),
  d_component_DR5s13JD: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  f_component_DR5s13JD: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    let n: RecoveredValue = 0,
      r: RecoveredValue = 0,
      i: RecoveredValue = e;
    for (; i && i !== t; )
      ((n += i.offsetLeft), (r += i.offsetTop), (i = i.offsetParent));
    return {
      x: n,
      y: r,
      w: e.offsetWidth,
      h: e.offsetHeight,
    };
  },
  ComponentP: RecoveredValue = (): RecoveredValue => (
    <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
      <path
        d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
        fill={`currentColor`}
      />
      <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
    </svg>
  ),
  ComponentM: RecoveredValue = ({ status }: RecoveredValue): RecoveredValue =>
    status === `running` ? (
      <svg
        className={`ui-agt__spin`}
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
    ),
  ComponentH: RecoveredValue = (): RecoveredValue => (
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
  ),
  g_component_DR5s13JD: RecoveredValue = 280,
  __component_DR5s13JD: RecoveredValue = 420,
  v_component_DR5s13JD: RecoveredValue = 60,
  y_component_DR5s13JD: RecoveredValue = `cubic-bezier(0.32, 0.72, 0.24, 1)`,
  b_component_DR5s13JD: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
    e,
    ...e.kids.flatMap(b_component_DR5s13JD),
  ],
  x_component_DR5s13JD: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Math.max(
      0,
      ...e.kids.map((e?: RecoveredValue): RecoveredValue => x_component_DR5s13JD(e) + 1),
    ),
  S_component_DR5s13JD: RecoveredValue = {
    subs: new Set(),
    id: 0,
  },
  ee: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let [t, r]: RecoveredValue = (0, n_component_DR5s13JD.useState)(
      (): RecoveredValue => Date.now(),
    );
    return (
      (0, n_component_DR5s13JD.useEffect)((): RecoveredValue => {
        if (!e) return;
        let t: RecoveredValue = (): RecoveredValue => r(Date.now());
        return (
          t(),
          S_component_DR5s13JD.subs.add(t),
          (S_component_DR5s13JD.id ||= window.setInterval(
            (): RecoveredValue =>
              S_component_DR5s13JD.subs.forEach(
                (e?: RecoveredValue): RecoveredValue => e(),
              ),
            1e3,
          )),
          (): RecoveredValue => {
            (S_component_DR5s13JD.subs.delete(t),
              S_component_DR5s13JD.subs.size ||
                (window.clearInterval(S_component_DR5s13JD.id),
                (S_component_DR5s13JD.id = 0)));
          }
        );
      }, [e]),
      t
    );
  },
  ComponentTe: RecoveredValue = ({
    since,
    until,
    now,
  }: RecoveredValue): RecoveredValue => {
    let i: RecoveredValue = ee(until === void 0 && now === void 0);
    return (
      <r_component_DR5s13JD.Fragment>
        {s_component_DR5s13JD((until ?? now ?? i) - since)}
      </r_component_DR5s13JD.Fragment>
    );
  };
function ComponentN({
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
  formatCost = a_component_DR5s13JD,
  title = `Agents`,
  className,
}: RecoveredValue): RecoveredValue {
  let E: RecoveredValue = (0, n_component_DR5s13JD.useRef)(null),
    [ce, le]: RecoveredValue = (0, n_component_DR5s13JD.useState)(defaultCollapsed),
    D: RecoveredValue = collapsed ?? ce,
    ue: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = D.includes(e)
        ? D.filter((t?: RecoveredValue): RecoveredValue => t !== e)
        : [...D, e];
      (le(t), onCollapsedChange?.(t));
    },
    [O, k]: RecoveredValue = (0, n_component_DR5s13JD.useState)(null),
    de: RecoveredValue = (0, n_component_DR5s13JD.useRef)(null);
  (0, n_component_DR5s13JD.useEffect)((): RecoveredValue => {
    if (!O) return;
    let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      de.current?.contains(e.target) || k(null);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      (): RecoveredValue => document.removeEventListener(`pointerdown`, e)
    );
  }, [O]);
  let A: RecoveredValue = [
      ...l_component_DR5s13JD(root),
      ...(beside ? l_component_DR5s13JD(beside) : []),
    ],
    fe: RecoveredValue =
      selected && selected !== root.id
        ? A.find((e?: RecoveredValue): RecoveredValue => e.id === selected)
        : void 0,
    pe: RecoveredValue = fe
      ? new Set(
          l_component_DR5s13JD(fe).map((e?: RecoveredValue): RecoveredValue => e.id),
        )
      : null,
    [j, me]: RecoveredValue = (0, n_component_DR5s13JD.useState)(null),
    he: RecoveredValue = (e?: RecoveredValue): RecoveredValue => ({
      agent: e,
      kids: D.includes(e.id) ? [] : (e.children ?? []).map(he),
    }),
    M: RecoveredValue = he(root),
    N: RecoveredValue = new Set(
      b_component_DR5s13JD(M).map((e?: RecoveredValue): RecoveredValue => e.agent.id),
    ),
    [ge, _e]: RecoveredValue = (0, n_component_DR5s13JD.useState)([]),
    ve: RecoveredValue = ge.filter(
      (e?: RecoveredValue): RecoveredValue => !N.has(e.shown.agent.id),
    ),
    ye: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.kids.map(ye);
      return (
        ve
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
    P: RecoveredValue = ye(M),
    F: RecoveredValue = b_component_DR5s13JD(P),
    I: RecoveredValue =
      !j ||
      j.w >=
        Math.max(
          560,
          P.kids.reduce(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
              e + j.card + j.indent * Math.max(1, x_component_DR5s13JD(t)),
            0,
          ) +
            Math.max(0, P.kids.length - 1) * 8,
        ),
    L: RecoveredValue = (0, n_component_DR5s13JD.useRef)(new Map()),
    R: RecoveredValue = (0, n_component_DR5s13JD.useRef)(!1),
    be: RecoveredValue = 0;
  for (let e of F)
    e.leaving !== void 0 ||
      L.current.has(e.agent.id) ||
      L.current.set(
        e.agent.id,
        e === P ? 0 : (R.current ? 160 : 200) + Math.min(be++, 12) * v_component_DR5s13JD,
      );
  let z: RecoveredValue = (0, n_component_DR5s13JD.useRef)(new Map()),
    [B, xe]: RecoveredValue = (0, n_component_DR5s13JD.useState)([]),
    [V, Se]: RecoveredValue = (0, n_component_DR5s13JD.useState)({
      w: 0,
      h: 0,
    }),
    H: RecoveredValue = (0, n_component_DR5s13JD.useRef)({
      links: ``,
      w: 0,
      h: 0,
    }),
    U: RecoveredValue = (0, n_component_DR5s13JD.useRef)(new Map()),
    Ce: RecoveredValue = JSON.stringify([
      I,
      D,
      F.map(
        (e?: RecoveredValue): RecoveredValue => [
          e.agent.id,
          e.agent.status,
          e.leaving ?? ``,
          e.kids.map((e?: RecoveredValue): RecoveredValue => e.agent.id),
        ],
      ),
      beside ? [beside.id, beside.status] : null,
    ]),
    W: RecoveredValue = (): RecoveredValue => {
      let n: RecoveredValue = E.current;
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
        s: RecoveredValue = n.querySelector(`:scope > .ui-agt__level`),
        c: RecoveredValue = s ? a(s).y : null,
        l: RecoveredValue = beside ? z.current.get(beside.id) : void 0,
        u: RecoveredValue = l ? a(l).y + a(l).h : 0,
        d: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
          let n: RecoveredValue = z.current.get(e.agent.id);
          for (let r of e.kids) {
            let i: RecoveredValue = z.current.get(r.agent.id);
            if (n && i) {
              let s: RecoveredValue = a(n),
                l: RecoveredValue = a(i),
                d: RecoveredValue =
                  r.agent.status === `queued` || r.agent.status === `stopped`,
                f: RecoveredValue = {
                  id: `${e.agent.id}>${r.agent.id}`,
                  muted: d,
                  leaving: r.leaving,
                  enter: L.current.get(r.agent.id) ?? 0,
                };
              if (I && t === 0) {
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
      d(P, 0);
      let f: RecoveredValue = z.current.get(root.id),
        p: RecoveredValue = beside ? z.current.get(beside.id) : void 0;
      if (f && p) {
        let e: RecoveredValue = a(f),
          n: RecoveredValue = a(p),
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
      for (let e of [...U.current.keys()])
        o.some((t?: RecoveredValue): RecoveredValue => t.id === e) || U.current.delete(e);
      let m: RecoveredValue = JSON.stringify(o);
      m !== H.current.links && ((H.current.links = m), xe(o));
      let h: RecoveredValue = [...z.current.values()].map(a),
        g: RecoveredValue = Math.ceil(
          Math.max(
            n.clientWidth,
            ...h.map((e?: RecoveredValue): RecoveredValue => e.x + e.w),
          ),
        ),
        _: RecoveredValue = Math.ceil(
          Math.max(
            n.clientHeight,
            ...h.map((e?: RecoveredValue): RecoveredValue => e.y + e.h),
          ),
        );
      (g !== H.current.w || _ !== H.current.h) &&
        ((H.current.w = g),
        (H.current.h = _),
        Se({
          w: g,
          h: _,
        }));
    },
    G: RecoveredValue = (0, n_component_DR5s13JD.useRef)(W);
  G.current = W;
  let K: RecoveredValue = (0, n_component_DR5s13JD.useRef)(0),
    q: RecoveredValue = (0, n_component_DR5s13JD.useRef)(0),
    J: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (((K.current = Math.max(K.current, performance.now() + e)), q.current)) return;
      let t: RecoveredValue = (): RecoveredValue => {
        (G.current(),
          (q.current = performance.now() < K.current ? requestAnimationFrame(t) : 0));
      };
      q.current = requestAnimationFrame(t);
    };
  (0, n_component_DR5s13JD.useEffect)(
    (): RecoveredValue => (): RecoveredValue => {
      (cancelAnimationFrame(q.current), (q.current = 0));
    },
    [],
  );
  let we: RecoveredValue = (0, n_component_DR5s13JD.useRef)(0),
    Y: RecoveredValue = (0, n_component_DR5s13JD.useRef)(new WeakMap()),
    X: RecoveredValue = (0, n_component_DR5s13JD.useRef)(new Set()),
    Z: RecoveredValue = (0, n_component_DR5s13JD.useRef)(null),
    Te: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.parentElement,
        n: RecoveredValue = e.offsetHeight,
        r: RecoveredValue = Y.current.get(e);
      if (
        (Y.current.set(e, n),
        !t || r === void 0 || Math.abs(r - n) < 0.5 || d_component_DR5s13JD())
      )
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
          duration: __component_DR5s13JD,
          easing: y_component_DR5s13JD,
        },
      ),
        (we.current = performance.now() + __component_DR5s13JD),
        J(460));
    },
    Ee: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      e &&
        (R.current && Q.current.has(t) && !Y.current.has(e) && Y.current.set(e, 0),
        X.current.add(e),
        typeof ResizeObserver < `u` &&
          ((Z.current ??= new ResizeObserver(
            (e?: RecoveredValue): RecoveredValue =>
              e.forEach((e?: RecoveredValue): RecoveredValue => Te(e.target)),
          )),
          Z.current.observe(e)));
    };
  ((0, n_component_DR5s13JD.useLayoutEffect)((): RecoveredValue => {
    for (let e of X.current)
      e.isConnected ? Te(e) : (X.current.delete(e), Z.current?.unobserve(e));
  }),
    (0, n_component_DR5s13JD.useEffect)(
      (): RecoveredValue => (): RecoveredValue => Z.current?.disconnect(),
      [],
    ));
  let Q: RecoveredValue = (0, n_component_DR5s13JD.useRef)(new Map());
  (0, n_component_DR5s13JD.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = E.current;
    if (!e) return;
    let t: RecoveredValue = !1;
    for (let [n, r] of z.current) {
      let i: RecoveredValue = f_component_DR5s13JD(r, e),
        a: RecoveredValue = Q.current.get(n),
        o: RecoveredValue = a ? Math.max(Math.abs(a.x - i.x), Math.abs(a.y - i.y)) : 0;
      (a &&
        o > 0.5 &&
        !(performance.now() < we.current && o < 40) &&
        !d_component_DR5s13JD() &&
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
            duration: __component_DR5s13JD,
            easing: y_component_DR5s13JD,
          },
        ),
        (t = !0)),
        Q.current.set(n, i));
    }
    for (let e of [...Q.current.keys()]) z.current.has(e) || Q.current.delete(e);
    t && J(460);
  });
  let De: RecoveredValue = (0, n_component_DR5s13JD.useRef)(null);
  ((0, n_component_DR5s13JD.useLayoutEffect)((): RecoveredValue => {
    let t: RecoveredValue = De.current;
    ((De.current = M), (R.current = !0));
    for (let e of [...L.current.keys()])
      F.some(
        (t?: RecoveredValue): RecoveredValue => t.agent.id === e && t.leaving === void 0,
      ) || L.current.delete(e);
    if (!t || d_component_DR5s13JD()) return;
    let n: RecoveredValue = [],
      r: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        e.kids.forEach((t?: RecoveredValue, i?: RecoveredValue): RecoveredValue => {
          N.has(t.agent.id)
            ? r(t)
            : n.push({
                shown: t,
                parent: e.agent.id,
                index: i,
              });
        });
    if ((r(t), !n.length)) return;
    let i: RecoveredValue = n
        .flatMap((e?: RecoveredValue): RecoveredValue => b_component_DR5s13JD(e.shown))
        .reverse(),
      a: RecoveredValue = new Map(
        i.map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => [
            e.agent.id,
            t * v_component_DR5s13JD,
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
          (t?: RecoveredValue): RecoveredValue => N.has(t.parent) || t.parent === root.id,
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
    _e(
      (e?: RecoveredValue): RecoveredValue => [
        ...e.filter((e?: RecoveredValue): RecoveredValue => !c.has(e.shown.agent.id)),
        ...s,
      ],
    );
    let l: RecoveredValue = g_component_DR5s13JD + (i.length - 1) * v_component_DR5s13JD;
    (window.setTimeout(
      (): RecoveredValue =>
        _e(
          (e?: RecoveredValue): RecoveredValue =>
            e.filter((e?: RecoveredValue): RecoveredValue => !c.has(e.shown.agent.id)),
        ),
      l + 30,
    ),
      J(l + __component_DR5s13JD + 60));
  }),
    (0, n_component_DR5s13JD.useLayoutEffect)((): RecoveredValue => {
      (W(), J(900 + Math.min(be, 12) * v_component_DR5s13JD));
    }, [Ce]),
    (0, n_component_DR5s13JD.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = E.current;
      if (!e) return;
      let t: RecoveredValue = new ResizeObserver((): RecoveredValue => {
        let t: RecoveredValue = getComputedStyle(e);
        (me({
          w: e.offsetWidth,
          card: parseFloat(t.getPropertyValue(`--ui-agt-card-w`)) || 216,
          indent: parseFloat(t.getPropertyValue(`--ui-agt-indent`)) || 32,
        }),
          G.current());
      });
      return (t.observe(e), (): RecoveredValue => t.disconnect());
    }, []));
  let Oe: RecoveredValue = Date.now();
  for (let e of B) U.current.has(e.id) || U.current.set(e.id, Oe);
  let ke: RecoveredValue = new Set(
      B.filter(
        (e?: RecoveredValue): RecoveredValue => Oe - U.current.get(e.id) < 700 + e.enter,
      ).map((e?: RecoveredValue): RecoveredValue => e.id),
    ),
    Ae: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = e.agent,
        a: RecoveredValue = n.children ?? [],
        o: RecoveredValue = D.includes(n.id),
        s: RecoveredValue = a.length ? u_component_DR5s13JD(n) : (n.cost ?? 0),
        d: RecoveredValue =
          n.ended ??
          (n.status === `running` || n.status === `waiting` ? void 0 : n.started),
        f: RecoveredValue = o ? l_component_DR5s13JD(n).length - 1 : 0,
        p: RecoveredValue = e.leaving !== void 0;
      return (
        <div
          className={`ui-agt__node`}
          data-status={n.status}
          data-depth={t}
          data-leaving={p ? `` : void 0}
          aria-hidden={p || void 0}
          style={
            {
              animationDelay: `${p ? e.leaving : (L.current.get(n.id) ?? 0)}ms`,
            } as RecoveredValue
          }
          ref={
            ((e?: RecoveredValue): RecoveredValue => {
              e ? z.current.set(n.id, e) : z.current.delete(n.id);
            }) as RecoveredValue
          }
          onClick={onSelect && !p ? (): RecoveredValue => onSelect(n) : void 0}
          tabIndex={onSelect && !p ? 0 : void 0}
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
          data-kept={pe?.has(n.id) ? `` : void 0}
          aria-current={selected === n.id ? `true` : void 0}
        >
          <div className={`ui-agt__card`}>
            <div className={`ui-agt__top`}>
              <span className={`ui-agt__avatar`} data-logo={n.avatar ? `` : void 0}>
                {n.avatar ?? c_component_DR5s13JD(n.name)}
              </span>
              <span className={`ui-agt__who`}>
                <span className={`ui-agt__name`} dir={`auto`} title={n.name}>
                  {n.name}
                </span>
                {n.model && (
                  <span className={`ui-agt__model`} title={n.model}>
                    {n.model}
                  </span>
                )}
              </span>
              <span className={`ui-agt__status`} data-status={n.status}>
                <ComponentM status={n.status} />
                {i_component_DR5s13JD[n.status]}
              </span>
            </div>
            {n.task || n.tools?.length ? (
              <p className={`ui-agt__task`} dir={`auto`} title={n.task}>
                {n.tools && n.tools.length > 0 && (
                  <span className={`ui-agt__tools`} aria-hidden={`true`}>
                    {(n.tools.length > 4 ? n.tools.slice(0, 3) : n.tools).map(
                      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                        <span className={`ui-agt__tool`} children={e} key={t} />
                      ),
                    )}
                    {n.tools.length > 4 && (
                      <span className={`ui-agt__tool ui-agt__tool--more`}>
                        {`+`}
                        {n.tools.length - 3}
                      </span>
                    )}
                  </span>
                )}
                {n.task}
              </p>
            ) : null}
          </div>
          {n.extra && (
            <div className={`ui-agt__extra`}>
              <div
                className={`ui-agt__extra-in`}
                ref={
                  ((e?: RecoveredValue): RecoveredValue => Ee(e, n.id)) as RecoveredValue
                }
              >
                {n.extra}
              </div>
            </div>
          )}
          <div className={`ui-agt__meta`}>
            <span
              className={`ui-agt__cost`}
              title={a.length ? `This branch, with its sub-agents` : void 0}
            >
              <span
                className={`ui-agt__amount`}
                data-live={
                  l_component_DR5s13JD(n).some(
                    (e?: RecoveredValue): RecoveredValue => e.status === `running`,
                  )
                    ? ``
                    : void 0
                }
              >
                {formatCost(s)}
              </span>
              {n.started ? (
                <span className={`ui-agt__time`}>
                  {` · `}
                  <ComponentTe since={n.started} until={d} now={now} />
                </span>
              ) : null}
            </span>
            {a.length > 0 && (
              <button
                type={`button`}
                className={`ui-agt__fold`}
                aria-expanded={!o}
                aria-label={
                  o
                    ? `Show ${f} sub-agents of ${n.name}`
                    : `Fold the sub-agents of ${n.name}`
                }
                tabIndex={p ? -1 : void 0}
                onClick={(e?: RecoveredValue): RecoveredValue => {
                  (e.stopPropagation(), ue(n.id));
                }}
              >
                {o ? `+${f}` : a.length}
                <ComponentH />
              </button>
            )}
          </div>
        </div>
      );
    },
    je: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
      <div
        className={`ui-agt__hang`}
        style={
          (t === 1
            ? {
                "--ui-agt-col": Math.max(1, x_component_DR5s13JD(e)),
              }
            : void 0) as RecoveredValue
        }
        role={`treeitem`}
        aria-expanded={e.agent.children?.length ? !D.includes(e.agent.id) : void 0}
        aria-label={`${e.agent.name}: ${i_component_DR5s13JD[e.agent.status]}`}
        key={e.agent.id}
      >
        {Ae(e, t)}
        {e.kids.length > 0 && (
          <div className={`ui-agt__below`} role={`group`}>
            {e.kids.map((e?: RecoveredValue): RecoveredValue => je(e, t + 1))}
          </div>
        )}
      </div>
    ),
    Me: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      Math.max(t, ...e.kids.map((e?: RecoveredValue): RecoveredValue => Me(e, t + 1))),
    Ne: RecoveredValue = Me(P, 0),
    Pe: RecoveredValue = u_component_DR5s13JD(root),
    Fe: RecoveredValue = A.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `running`,
    ).length,
    Ie: RecoveredValue = A.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `waiting`,
    ).length,
    Le: RecoveredValue = A.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `failed`,
    ).length,
    Re: RecoveredValue = O
      ? A.filter((e?: RecoveredValue): RecoveredValue => e.status === O)
      : [],
    ze: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      (onResolve?.(e, t), Re.length <= 1 && k(null));
    },
    $: RecoveredValue = new Map();
  for (let e of B) {
    let t: RecoveredValue = e.dot.join(`,`),
      n: RecoveredValue = $.get(t),
      r: RecoveredValue = e.leaving;
    n
      ? $.set(t, {
          at: n.at,
          muted: n.muted && e.muted,
          leaving: n.leaving === void 0 || r === void 0 ? void 0 : Math.max(n.leaving, r),
        })
      : $.set(t, {
          at: e.dot,
          muted: e.muted,
          leaving: r,
        });
  }
  return (
    <div
      className={[`ui-agt`, className].filter(Boolean).join(` `)}
      data-wide={I ? `` : void 0}
      data-picking={pe ? `` : void 0}
    >
      <header ref={de as RecoveredValue} className={`ui-agt__bar`}>
        <span className={`ui-agt__spark`}>
          <ComponentP />
        </span>
        <span className={`ui-agt__title`} dir={`auto`} title={title}>
          {title}
        </span>
        <span className={`ui-agt__sum`} aria-live={`polite`}>
          <span>
            {A.length === 1
              ? `1 agent`
              : `${o_component_DR5s13JD.format(A.length)} agents`}
          </span>
          {Fe > 0 && (
            <span className={`ui-agt__sum-run`}>
              {o_component_DR5s13JD.format(Fe)}
              {` running`}
            </span>
          )}
          {Ie > 0 && (
            <button
              type={`button`}
              className={`ui-agt__sum-btn`}
              data-kind={`waiting`}
              aria-expanded={O === `waiting`}
              aria-haspopup={`dialog`}
              onClick={(): RecoveredValue =>
                k(
                  (e?: RecoveredValue): RecoveredValue =>
                    e === `waiting` ? null : `waiting`,
                )
              }
            >
              {o_component_DR5s13JD.format(Ie)}
              {` needs you`}
              <ComponentH />
            </button>
          )}
          {Le > 0 && (
            <button
              type={`button`}
              className={`ui-agt__sum-btn`}
              data-kind={`failed`}
              aria-expanded={O === `failed`}
              aria-haspopup={`dialog`}
              onClick={(): RecoveredValue =>
                k(
                  (e?: RecoveredValue): RecoveredValue =>
                    e === `failed` ? null : `failed`,
                )
              }
            >
              {o_component_DR5s13JD.format(Le)}
              {` failed`}
              <ComponentH />
            </button>
          )}
          <span className={`ui-agt__sum-cost`}>
            <span className={`ui-agt__amount`} data-live={Fe > 0 ? `` : void 0}>
              {formatCost(Pe)}
            </span>
          </span>
        </span>
        {O && Re.length > 0 && (
          <div
            className={`ui-agt__pop`}
            role={`dialog`}
            aria-label={O === `waiting` ? `Agents that need you` : `Agents that failed`}
            onKeyDown={(e?: RecoveredValue): RecoveredValue =>
              e.key === `Escape` && k(null)
            }
          >
            {Re.map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <div className={`ui-agt__pop-item`} key={e.id}>
                  <span className={`ui-agt__pop-head`}>
                    <span className={`ui-agt__status`} data-status={e.status}>
                      <ComponentM status={e.status} />
                    </span>
                    <span className={`ui-agt__pop-name`} dir={`auto`}>
                      {e.name}
                    </span>
                    <span className={`ui-agt__pop-task`} dir={`auto`}>
                      {e.task}
                    </span>
                  </span>
                  {(O === `waiting` ? e.ask : e.error) && (
                    <span className={`ui-agt__pop-text`} dir={`auto`}>
                      {O === `waiting` ? e.ask : e.error}
                    </span>
                  )}
                  <span className={`ui-agt__pop-actions`}>
                    <button
                      type={`button`}
                      className={`ui-agt__btn`}
                      onClick={(): RecoveredValue =>
                        ze(e, O === `waiting` ? `reject` : `dismiss`)
                      }
                    >
                      {O === `waiting` ? `Reject` : `Dismiss`}
                    </button>
                    <button
                      type={`button`}
                      className={`ui-agt__btn ui-agt__btn--primary`}
                      autoFocus={t === 0}
                      onClick={(): RecoveredValue =>
                        ze(e, O === `waiting` ? `approve` : `retry`)
                      }
                    >
                      {O === `waiting` ? `Approve` : `Retry`}
                    </button>
                  </span>
                </div>
              ),
            )}
          </div>
        )}
      </header>
      {top && <div className={`ui-agt__lead`}>{top}</div>}
      <div
        ref={E as RecoveredValue}
        className={`ui-agt__tree`}
        role={`tree`}
        aria-label={title}
        style={
          {
            "--ui-agt-depth": Ne,
          } as RecoveredValue
        }
      >
        <svg className={`ui-agt__links`} width={V.w} height={V.h} aria-hidden={`true`}>
          {B.map(
            (e?: RecoveredValue): RecoveredValue => (
              <g
                data-dashed={e.dashed ? `` : void 0}
                data-muted={e.muted ? `` : void 0}
                data-fresh={
                  ke.has(e.id) && e.leaving === void 0 && !d_component_DR5s13JD()
                    ? ``
                    : void 0
                }
                data-leaving={e.leaving === void 0 ? void 0 : ``}
                children={
                  <path
                    d={e.d}
                    pathLength={e.dashed ? void 0 : 1}
                    className={`ui-agt__link`}
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
          className={`ui-agt__root`}
          data-beside={beside ? `` : void 0}
          role={`treeitem`}
          aria-expanded={root.children?.length ? !D.includes(root.id) : void 0}
          aria-label={`${root.name}: ${i_component_DR5s13JD[root.status]}`}
        >
          {Ae(P, 0)}
          {beside && (
            <div
              className={`ui-agt__beside`}
              role={`treeitem`}
              aria-label={`${beside.name}: ${i_component_DR5s13JD[beside.status]}, beside ${root.name}`}
            >
              {Ae(
                {
                  agent: beside,
                  kids: [],
                },
                0,
              )}
            </div>
          )}
        </div>
        {P.kids.length > 0 && (
          <div className={`ui-agt__level`} role={`group`}>
            {P.kids.map((e?: RecoveredValue): RecoveredValue => je(e, 1))}
          </div>
        )}
        <svg
          className={`ui-agt__links ui-agt__dots`}
          width={V.w}
          height={V.h}
          aria-hidden={`true`}
        >
          {[...$].map(
            ([e, t]: RecoveredValue): RecoveredValue => (
              <circle
                cx={t.at[0]}
                cy={t.at[1]}
                r={3.25}
                className={`ui-agt__dot`}
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
var r_demo_DGwUulJc: RecoveredValue = t_react_BkAXpnfr(),
  i_demo_DGwUulJc: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  a_demo_DGwUulJc: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
    e,
    ...(e.children ?? []).flatMap(a_demo_DGwUulJc),
  ],
  o_demo_DGwUulJc: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    (e.children ?? [])
      .filter((e?: RecoveredValue): RecoveredValue => e.kind !== `agent`)
      .sort(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e.start - t.start,
      ),
  s_demo_DGwUulJc: RecoveredValue = new Intl.NumberFormat(`en-US`, {
    style: `currency`,
    currency: `USD`,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  c_demo_DGwUulJc: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e === 0 ? `$0` : e < 0.01 ? `$${e.toFixed(3)}` : s_demo_DGwUulJc.format(e),
  l_demo_DGwUulJc: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    if (e < 1e4) return `${(e / 1e3).toFixed(1)}s`;
    let t: RecoveredValue = Math.round(e / 1e3);
    return t < 60
      ? `${t}s`
      : t < 600
        ? `${Math.floor(t / 60)}m ${String(t % 60).padStart(2, `0`)}s`
        : t < 3600
          ? `${Math.floor(t / 60)}m`
          : `${Math.floor(t / 3600)}h ${String(Math.floor(t / 60) % 60).padStart(2, `0`)}m`;
  },
  u_demo_DGwUulJc: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e >= 1e6
      ? `${(e / 1e6).toFixed(e >= 1e7 ? 0 : 1)}M`
      : e >= 1e3
        ? `${(e / 1e3).toFixed(e >= 1e4 ? 0 : 1)}k`
        : String(e),
  d_demo_DGwUulJc: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e == null || e === ``
      ? void 0
      : typeof e == `string`
        ? e
        : JSON.stringify(e)
            .replace(/"([^"]+)":/g, `$1: `)
            .replace(/,/g, `, `),
  f_demo_DGwUulJc: RecoveredValue = 5;
function ComponentP_demo_DGwUulJc({
  run,
  supervisor,
  now,
  startedAt,
  selected,
  onSelectedChange,
  call,
  onCallChange,
  formatCost = c_demo_DGwUulJc,
  className,
}: RecoveredValue): RecoveredValue {
  let x: RecoveredValue = (0, r_demo_DGwUulJc.useRef)(
    startedAt ?? Date.now() - (now ?? 0),
  );
  startedAt !== void 0 && (x.current = startedAt);
  let S: RecoveredValue = (0, r_demo_DGwUulJc.useMemo)(
      (): RecoveredValue => [
        ...a_demo_DGwUulJc(run),
        ...(supervisor ? a_demo_DGwUulJc(supervisor) : []),
      ],
      [run, supervisor],
    ),
    C: RecoveredValue = S.some(
      (e?: RecoveredValue): RecoveredValue =>
        e.status === `running` || e.status === `waiting`,
    ),
    [w, T]: RecoveredValue = (0, r_demo_DGwUulJc.useState)(
      (): RecoveredValue => Date.now(),
    );
  (0, r_demo_DGwUulJc.useEffect)((): RecoveredValue => {
    if (now !== void 0 || !C) return;
    let e: RecoveredValue = window.setInterval((): RecoveredValue => T(Date.now()), 1e3);
    return (): RecoveredValue => window.clearInterval(e);
  }, [now, C]);
  let E: RecoveredValue = now ?? w - x.current,
    D: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e.end ?? (e.status === `queued` ? e.start : Math.max(E, e.start)),
    [O, k]: RecoveredValue = (0, r_demo_DGwUulJc.useState)(null),
    A: RecoveredValue = selected === void 0 ? O : selected,
    j: RecoveredValue =
      (A &&
        S.find(
          (e?: RecoveredValue): RecoveredValue => e.id === A && e.kind === `agent`,
        )) ||
      run,
    M: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = t === run.id || t === A ? null : t;
      (k(n), onSelectedChange?.(n));
    },
    [N, P]: RecoveredValue = (0, r_demo_DGwUulJc.useState)(null),
    F: RecoveredValue = call === void 0 ? N : call,
    I: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (P(e), onCallChange?.(e));
    },
    [L, R]: RecoveredValue = (0, r_demo_DGwUulJc.useState)([]),
    z: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = o_demo_DGwUulJc(e);
      if (!t.length) return;
      let n: RecoveredValue = e.start,
        r: RecoveredValue = Math.max(1, D(e) - n),
        a: RecoveredValue = L.includes(e.id),
        s: RecoveredValue = a || t.length <= f_demo_DGwUulJc ? t : t.slice(0, 4);
      return (
        <div className={`ui-rin__trace`} role={`list`} aria-label={`Calls of ${e.name}`}>
          {s.map((e?: RecoveredValue): RecoveredValue => {
            let t: RecoveredValue = ((e.start - n) / r) * 100,
              a: RecoveredValue = Math.max(2.5, ((D(e) - e.start) / r) * 100),
              o: RecoveredValue = F === e.id;
            return (
              <div role={`listitem`} className={`ui-rin__item`} key={e.id}>
                <button
                  type={`button`}
                  className={`ui-rin__row`}
                  data-kind={e.kind}
                  data-status={e.status}
                  aria-expanded={o}
                  aria-controls={o ? `${e.id}-detail` : void 0}
                  aria-label={`${e.name}, ${e.status === `running` ? `running` : l_demo_DGwUulJc(D(e) - e.start)}${e.status === `failed` ? `, failed` : ``}`}
                  onClick={(t?: RecoveredValue): RecoveredValue => {
                    (t.stopPropagation(), I(F === e.id ? null : e.id));
                  }}
                  onKeyDown={(e?: RecoveredValue): RecoveredValue => {
                    (e.stopPropagation(), e.key === `Escape` && o && I(null));
                  }}
                >
                  <span className={`ui-rin__icon`}>{e.icon}</span>
                  <span className={`ui-rin__name`} dir={`auto`} title={e.name}>
                    {e.name}
                  </span>
                  <span className={`ui-rin__track`} aria-hidden={`true`}>
                    <span
                      className={`ui-rin__bar`}
                      style={
                        {
                          left: `${Math.min(t, 100 - a)}%`,
                          width: `${a}%`,
                        } as RecoveredValue
                      }
                    />
                  </span>
                  <span className={`ui-rin__took`}>
                    {e.status === `running` ? `…` : l_demo_DGwUulJc(D(e) - e.start)}
                  </span>
                </button>
                {o && (
                  <div
                    id={`${e.id}-detail`}
                    className={`ui-rin__detail`}
                    data-status={e.status}
                  >
                    <p className={`ui-rin__detail-what`}>
                      <span>
                        {e.kind === `tool`
                          ? (e.tool ?? e.detail ?? `Tool`)
                          : (e.model ?? `Model`)}
                      </span>
                      <span data-state={``}>
                        {e.status === `failed`
                          ? `Failed`
                          : e.status === `running`
                            ? `Running…`
                            : e.status === `done`
                              ? `Done`
                              : `Queued`}
                      </span>
                    </p>
                    {e.error ? (
                      <p className={`ui-rin__detail-error`} dir={`auto`}>
                        {e.error}
                      </p>
                    ) : (
                      <p className={`ui-rin__detail-out`} dir={`auto`}>
                        {d_demo_DGwUulJc(e.result ?? e.output) ??
                          (e.status === `running` ? `Still running…` : `No output`)}
                      </p>
                    )}
                    {d_demo_DGwUulJc(e.args ?? e.input) && (
                      <p className={`ui-rin__detail-in`} dir={`auto`}>
                        <span>{e.kind === `tool` ? `Called with` : `Prompt`}</span>
                        {` `}
                        {d_demo_DGwUulJc(e.args ?? e.input)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {t.length > f_demo_DGwUulJc && (
            <button
              type={`button`}
              className={`ui-rin__more`}
              onClick={(t?: RecoveredValue): RecoveredValue => {
                (t.stopPropagation(),
                  R(
                    (t?: RecoveredValue): RecoveredValue =>
                      a
                        ? t.filter((t?: RecoveredValue): RecoveredValue => t !== e.id)
                        : [...t, e.id],
                  ));
              }}
              onKeyDown={(e?: RecoveredValue): RecoveredValue => e.stopPropagation()}
            >
              {a ? `Show less` : `+${t.length - f_demo_DGwUulJc + 1} more`}
            </button>
          )}
        </div>
      );
    },
    B: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = o_demo_DGwUulJc(e);
      return {
        id: e.id,
        name: e.name,
        task: e.task ?? e.input ?? ``,
        model: e.model,
        avatar: e.icon,
        status: e.status,
        cost:
          (e.cost ?? 0) +
            t.reduce(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
                e + (t.cost ?? 0),
              0,
            ) || void 0,
        ask: e.ask,
        error: e.error,
        started: x.current + e.start,
        ended: e.end === void 0 ? void 0 : x.current + e.end,
        extra: z(e),
        children: (e.children ?? [])
          .filter((e?: RecoveredValue): RecoveredValue => e.kind === `agent`)
          .map(B),
      };
    },
    V: RecoveredValue = a_demo_DGwUulJc(j),
    H: RecoveredValue = V.filter(
      (e?: RecoveredValue): RecoveredValue => e.kind !== `agent`,
    ),
    U: RecoveredValue = [
      [`Duration`, l_demo_DGwUulJc(D(j) - j.start)],
      [
        `Cost`,
        formatCost(
          V.reduce(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + (t.cost ?? 0),
            0,
          ),
        ),
      ],
      [
        `Tokens`,
        u_demo_DGwUulJc(
          V.reduce(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
              e + (t.tokensIn ?? 0) + (t.tokensOut ?? 0),
            0,
          ),
        ),
      ],
      [
        `Model calls`,
        String(H.filter((e?: RecoveredValue): RecoveredValue => e.kind === `llm`).length),
      ],
      [
        `Tool calls`,
        String(
          H.filter((e?: RecoveredValue): RecoveredValue => e.kind === `tool`).length,
        ),
      ],
      [
        `Errors`,
        String(
          V.filter((e?: RecoveredValue): RecoveredValue => e.status === `failed`).length,
        ),
        V.some((e?: RecoveredValue): RecoveredValue => e.status === `failed`),
      ],
    ];
  return (
    <section
      className={[`ui-rin`, className].filter(Boolean).join(` `)}
      aria-label={`Run: ${run.task ?? run.name}`}
    >
      <ComponentN
        root={B(run)}
        beside={supervisor ? B(supervisor) : void 0}
        now={x.current + E}
        selected={j.id === run.id ? null : j.id}
        onSelect={(e?: RecoveredValue): RecoveredValue => M(e.id)}
        formatCost={formatCost}
        title={run.task ?? `Agents`}
        top={
          <section
            className={`ui-rin__card`}
            aria-label={j.id === run.id ? `Whole run` : j.name}
          >
            <div className={`ui-rin__card-head`}>
              <dl className={`ui-rin__facts`}>
                {U.map(
                  ([e, t, n]: RecoveredValue): RecoveredValue => (
                    <div key={e}>
                      <dt>{e}</dt>
                      <dd data-bad={n ? `` : void 0}>{t}</dd>
                    </div>
                  ),
                )}
              </dl>
            </div>
          </section>
        }
      />
    </section>
  );
}
var ComponentH_demo_DGwUulJc: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 1200 1200`} aria-hidden={`true`}>
      <path
        fill={`#D97757`}
        d={`M 233.959793 800.214905 L 468.644287 668.536987 L 472.590637 657.100647 L 468.644287 650.738403 L 457.208069 650.738403 L 417.986633 648.322144 L 283.892639 644.69812 L 167.597321 639.865845 L 54.926208 633.825623 L 26.577238 627.785339 L 3.3e-05 592.751709 L 2.73832 575.27533 L 26.577238 559.248352 L 60.724873 562.228149 L 136.187973 567.382629 L 249.422867 575.194763 L 331.570496 580.026978 L 453.261841 592.671082 L 472.590637 592.671082 L 475.328857 584.859009 L 468.724915 580.026978 L 463.570557 575.194763 L 346.389313 495.785217 L 219.543671 411.865906 L 153.100723 363.543762 L 117.181267 339.060425 L 99.060455 316.107361 L 91.248367 266.01355 L 123.865784 230.093994 L 167.677887 233.073853 L 178.872513 236.053772 L 223.248367 270.201477 L 318.040283 343.570496 L 441.825592 434.738342 L 459.946411 449.798706 L 467.194672 444.64447 L 468.080597 441.020203 L 459.946411 427.409485 L 392.617493 305.718323 L 320.778564 181.932983 L 288.80542 130.630859 L 280.348999 99.865845 C 277.369171 87.221436 275.194641 76.590698 275.194641 63.624268 L 312.322174 13.20813 L 332.8591 6.604126 L 382.389313 13.20813 L 403.248352 31.328979 L 434.013519 101.71814 L 483.865753 212.537048 L 561.181274 363.221497 L 583.812134 407.919434 L 595.892639 449.315491 L 600.40271 461.959839 L 608.214783 461.959839 L 608.214783 454.711609 L 614.577271 369.825623 L 626.335632 265.61084 L 637.771851 131.516846 L 641.718201 93.745117 L 660.402832 48.483276 L 697.530334 24.000122 L 726.52356 37.852417 L 750.362549 72 L 747.060486 94.067139 L 732.886047 186.201416 L 705.100708 330.52356 L 686.979919 427.167847 L 697.530334 427.167847 L 709.61084 415.087341 L 758.496704 350.174561 L 840.644348 247.490051 L 876.885925 206.738342 L 919.167847 161.71814 L 946.308838 140.29541 L 997.61084 140.29541 L 1035.38269 196.429626 L 1018.469849 254.416199 L 965.637634 321.422852 L 921.825562 378.201538 L 859.006714 462.765259 L 819.785278 530.41626 L 823.409424 535.812073 L 832.75177 534.92627 L 974.657776 504.724915 L 1051.328979 490.872559 L 1142.818848 475.167786 L 1184.214844 494.496582 L 1188.724854 514.147644 L 1172.456421 554.335693 L 1074.604126 578.496765 L 959.838989 601.449829 L 788.939636 641.879272 L 786.845764 643.409485 L 789.261841 646.389343 L 866.255127 653.637634 L 899.194702 655.409424 L 979.812134 655.409424 L 1129.932861 666.604187 L 1169.154419 692.537109 L 1192.671265 724.268677 L 1188.724854 748.429688 L 1128.322144 779.194641 L 1046.818848 759.865845 L 856.590759 714.604126 L 791.355774 698.335754 L 782.335693 698.335754 L 782.335693 703.731567 L 836.69812 756.885986 L 936.322205 846.845581 L 1061.073975 962.81897 L 1067.436279 991.490112 L 1051.409424 1014.120911 L 1034.496704 1011.704712 L 924.885986 929.234924 L 882.604126 892.107544 L 786.845764 811.48999 L 780.483276 811.48999 L 780.483276 819.946289 L 802.550415 852.241699 L 919.087341 1027.409424 L 925.127625 1081.127686 L 916.671204 1098.604126 L 886.469849 1109.154419 L 853.288696 1103.114136 L 785.073914 1007.355835 L 714.684631 899.516785 L 657.906067 802.872498 L 650.979858 806.81897 L 617.476624 1167.704834 L 601.771851 1186.147705 L 565.530212 1200 L 535.328857 1177.046997 L 519.302124 1139.919556 L 535.328857 1066.550537 L 554.657776 970.792053 L 570.362488 894.68457 L 584.536926 800.134277 L 592.993347 768.724976 L 592.429626 766.630859 L 585.503479 767.516968 L 514.22821 865.369263 L 405.825531 1011.865906 L 320.053711 1103.677979 L 299.516815 1111.812256 L 263.919525 1093.369263 L 267.221497 1060.429688 L 287.114136 1031.114136 L 405.825531 880.107361 L 477.422913 786.52356 L 523.651062 732.483276 L 523.328918 724.671265 L 520.590698 724.671265 L 205.288605 929.395935 L 149.154434 936.644409 L 124.993355 914.01355 L 127.973183 876.885986 L 139.409409 864.80542 L 234.201385 799.570435 L 233.879227 799.8927 Z`}
      />
    </svg>
  ),
  ComponentG: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 24 24`}
      fill={`currentColor`}
      aria-hidden={`true`}
      style={
        {
          color: `var(--ui-rinc-ink, var(--ui-rin-ink, #000))`,
        } as RecoveredValue
      }
    >
      <path
        d={`M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z`}
      />
    </svg>
  ),
  Component_: RecoveredValue = (): RecoveredValue => {
    let e: RecoveredValue =
      `gm` + (0, r_demo_DGwUulJc.useId)().replace(/[^a-zA-Z0-9_-]/g, ``);
    return (
      <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
        <defs>
          <linearGradient
            id={e}
            x1={`0`}
            y1={`24`}
            x2={`24`}
            y2={`0`}
            gradientUnits={`userSpaceOnUse`}
          >
            <stop stopColor={`#1C7DFF`} />
            <stop offset={`0.52`} stopColor={`#1C69FF`} />
            <stop offset={`1`} stopColor={`#B04DFF`} />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${e})`}
          d={`M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81`}
        />
      </svg>
    );
  },
  ComponentV: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 24 24`}
      fill={`currentColor`}
      aria-hidden={`true`}
      style={
        {
          color: `var(--ui-rinc-ink, var(--ui-rin-ink, #000))`,
        } as RecoveredValue
      }
    >
      <path
        d={`M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z`}
      />
    </svg>
  ),
  ComponentY: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 24 24`}
      fill={`currentColor`}
      aria-hidden={`true`}
      style={
        {
          color: `var(--ui-rinc-ink, var(--ui-rin-ink, #181717))`,
        } as RecoveredValue
      }
    >
      <path
        d={`M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12`}
      />
    </svg>
  ),
  ComponentB: RecoveredValue = (): RecoveredValue => (
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
  ComponentX: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 38 57`} aria-hidden={`true`}>
      <path d={`M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z`} fill={`#1ABCFE`} />
      <path
        d={`M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z`}
        fill={`#0ACF83`}
      />
      <path d={`M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z`} fill={`#FF7262`} />
      <path
        d={`M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z`}
        fill={`#F24E1E`}
      />
      <path
        d={`M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z`}
        fill={`#A259FF`}
      />
    </svg>
  ),
  S_demo_DGwUulJc: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} fill={`#FF7A59`} aria-hidden={`true`}>
      <path
        d={`M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`}
      />
    </svg>
  ),
  C_demo_DGwUulJc: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
      <rect width={`24`} height={`24`} rx={`6`} fill={`#635BFF`} />
      <path
        fill={`#fff`}
        transform={`translate(5 5) scale(0.5833)`}
        d={`M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z`}
      />
    </svg>
  ),
  ComponentW: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
      style={
        {
          color: `#13b3a0`,
        } as RecoveredValue
      }
    >
      <circle cx={`11`} cy={`11`} r={`6.5`} stroke={`currentColor`} strokeWidth={`2.2`} />
      <path
        d={`M16 16L20 20`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeWidth={`2.2`}
      />
    </svg>
  ),
  T_demo_DGwUulJc: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
      style={
        {
          color: `#0070d6`,
        } as RecoveredValue
      }
    >
      <ellipse
        cx={`12`}
        cy={`6`}
        rx={`7.5`}
        ry={`3`}
        stroke={`currentColor`}
        strokeWidth={`2`}
      />
      <path
        d={`M4.5 6V18C4.5 19.66 7.86 21 12 21C16.14 21 19.5 19.66 19.5 18V6`}
        stroke={`currentColor`}
        strokeWidth={`2`}
      />
      <path
        d={`M4.5 12C4.5 13.66 7.86 15 12 15C16.14 15 19.5 13.66 19.5 12`}
        stroke={`currentColor`}
        strokeWidth={`2`}
      />
    </svg>
  ),
  E_demo_DGwUulJc: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
      style={
        {
          color: `#4fb0fe`,
        } as RecoveredValue
      }
    >
      <circle cx={`12`} cy={`12`} r={`8.5`} stroke={`currentColor`} strokeWidth={`2`} />
      <path
        d={`M3.5 12H20.5M12 3.5C14.2 6 15.3 8.9 15.3 12C15.3 15.1 14.2 18 12 20.5C9.8 18 8.7 15.1 8.7 12C8.7 8.9 9.8 6 12 3.5Z`}
        stroke={`currentColor`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
    </svg>
  ),
  D_demo_DGwUulJc: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
      style={
        {
          color: `#a651f0`,
        } as RecoveredValue
      }
    >
      <path
        d={`M12 3L19 6V11.5C19 15.6 16.1 19.3 12 20.5C7.9 19.3 5 15.6 5 11.5V6L12 3Z`}
        stroke={`currentColor`}
        strokeWidth={`2`}
        strokeLinejoin={`round`}
      />
      <path
        d={`M9 12L11 14L15 10`}
        stroke={`currentColor`}
        strokeWidth={`2`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
    </svg>
  ),
  O_demo_DGwUulJc: RecoveredValue = [
    {
      id: `root`,
      name: `Orchestrator`,
      kind: `agent`,
      model: `Opus 5.5`,
      detail: `Opus 5.5`,
      icon: <ComponentH_demo_DGwUulJc />,
      at: 0,
      end: 13.6,
      task: `Launch the new pricing page by Friday`,
      output: `Pricing page is live behind a flag – PR #482 open, copy in Notion, plans in HubSpot, #launch told`,
    },
    {
      id: `plan`,
      parent: `root`,
      name: `Plan the launch`,
      kind: `llm`,
      detail: `Opus 5.5`,
      model: `Opus 5.5`,
      icon: <ComponentH_demo_DGwUulJc />,
      at: 0.15,
      end: 1.3,
      tin: 3240,
      tout: 880,
      cost: 0.115,
      input: `Split “launch the new pricing page” into research, copy and build`,
      output: `3 sub-agents: Researcher, Writer, Coder – Slack and HubSpot at the end`,
    },
    {
      id: `research`,
      parent: `root`,
      name: `Researcher`,
      kind: `agent`,
      detail: `Sonnet 5.5`,
      model: `Sonnet 5.5`,
      icon: <ComponentH_demo_DGwUulJc />,
      at: 1.35,
      end: 6.3,
      task: `Compare the pricing of five competitors`,
      output: `Most charge per seat; two have a free tier – summary in Notion`,
    },
    {
      id: `s1`,
      parent: `research`,
      name: `Search Linear pricing`,
      kind: `tool`,
      tool: `web_search`,
      detail: `Web`,
      icon: <ComponentW />,
      at: 1.5,
      end: 2.4,
      cost: 0.005,
      args: {
        query: `linear.app pricing per seat 2026`,
        limit: 8,
      },
      result: {
        results: 8,
        top: `linear.app/pricing`,
      },
    },
    {
      id: `s2`,
      parent: `research`,
      name: `Search Notion pricing`,
      kind: `tool`,
      tool: `web_search`,
      detail: `Web`,
      icon: <ComponentW />,
      at: 1.55,
      end: 2.75,
      cost: 0.005,
      args: {
        query: `notion pricing plans business`,
        limit: 10,
      },
      result: {
        results: 10,
        top: `notion.com/pricing`,
      },
    },
    {
      id: `db`,
      parent: `research`,
      name: `Query plan usage`,
      kind: `tool`,
      tool: `sql_query`,
      detail: `Postgres`,
      icon: <T_demo_DGwUulJc />,
      at: 1.62,
      end: 2.2,
      args: {
        sql: `select plan, count(*) from workspaces group by plan`,
      },
      result: [
        {
          plan: `Free`,
          count: 8412,
        },
        {
          plan: `Pro`,
          count: 1906,
        },
        {
          plan: `Team`,
          count: 311,
        },
      ],
    },
    {
      id: `g2`,
      parent: `research`,
      name: `Read G2 reviews`,
      kind: `tool`,
      tool: `fetch_pages`,
      detail: `120 pages`,
      icon: <E_demo_DGwUulJc />,
      at: 2.5,
      end: 4.6,
      cost: 0.02,
      args: {
        site: `g2.com`,
        filter: `mentions price`,
        since: `12 months`,
      },
      result: {
        read: 120,
        perSeat: 38,
      },
    },
    {
      id: `sum`,
      parent: `research`,
      name: `Summarize findings`,
      kind: `llm`,
      detail: `Gemini 3.8 Flash`,
      model: `Gemini 3.8 Flash`,
      icon: <Component_ />,
      at: 4.65,
      end: 6.2,
      tin: 41200,
      tout: 1350,
      cost: 0.018,
      input: `5 pricing pages, 120 reviews, our plan usage`,
      output: `Per seat wins; keep a free tier; Team at $12 undercuts Linear`,
    },
    {
      id: `writer`,
      parent: `root`,
      name: `Writer`,
      kind: `agent`,
      detail: `Sonnet 5.5`,
      model: `Sonnet 5.5`,
      icon: <ComponentH_demo_DGwUulJc />,
      at: 1.9,
      end: 8.1,
      task: `Write the copy for the three plans`,
      output: `Copy for Free, Pro and Team – saved in Notion`,
    },
    {
      id: `voice`,
      parent: `writer`,
      name: `Read brand voice`,
      kind: `tool`,
      tool: `notion.get_page`,
      detail: `Notion`,
      icon: <ComponentV />,
      at: 2,
      end: 2.6,
      args: {
        page: `Brand / Voice and tone`,
      },
      result: {
        pages: 2,
        words: 1840,
      },
    },
    {
      id: `frames`,
      parent: `writer`,
      name: `Read pricing frames`,
      kind: `tool`,
      tool: `figma.get_frames`,
      detail: `Figma`,
      icon: <ComponentX />,
      at: 2.05,
      end: 2.9,
      args: {
        frames: [`Pricing / Desktop`, `Pricing / Mobile`],
      },
      result: {
        frames: 3,
        slotsPerPlan: 6,
      },
    },
    {
      id: `draft`,
      parent: `writer`,
      name: `Draft plan copy`,
      kind: `llm`,
      detail: `Sonnet 5.5`,
      model: `Sonnet 5.5`,
      icon: <ComponentH_demo_DGwUulJc />,
      at: 3,
      end: 6.9,
      tin: 9800,
      tout: 4100,
      cost: 0.091,
      input: `Voice guide, research summary, 3 frames with 6 slots each`,
      output: `Free: “Start for free” · Pro: “For growing teams” · Team: “Everything, together”`,
    },
    {
      id: `save`,
      parent: `writer`,
      name: `Save draft`,
      kind: `tool`,
      tool: `notion.update_page`,
      detail: `Notion`,
      icon: <ComponentV />,
      at: 7,
      end: 7.6,
      args: {
        page: `Launch / Pricing copy v1`,
        sections: 3,
      },
      result: `Page updated – 3 sections`,
    },
    {
      id: `coder`,
      parent: `root`,
      name: `Coder`,
      kind: `agent`,
      detail: `GPT-6 Sol`,
      model: `GPT-6 Sol`,
      icon: <ComponentG />,
      at: 2.6,
      end: 12.4,
      task: `Build the page and wire up checkout`,
      output: `PR #482 – pricing page, Stripe prices, checkout tests green`,
    },
    {
      id: `branch`,
      parent: `coder`,
      name: `Create branch`,
      kind: `tool`,
      tool: `git.create_branch`,
      detail: `GitHub`,
      icon: <ComponentY />,
      at: 2.7,
      end: 3.05,
      args: {
        name: `feat/pricing-page`,
        from: `main`,
      },
      result: `Branch created`,
    },
    {
      id: `code`,
      parent: `coder`,
      name: `Write pricing page`,
      kind: `llm`,
      detail: `GPT-6 Sol`,
      model: `GPT-6 Sol`,
      icon: <ComponentG />,
      at: 3.1,
      end: 6.4,
      tin: 18400,
      tout: 6200,
      cost: 0.162,
      input: `Figma frames, plan copy, the existing /pricing route`,
      output: `pricing/page.tsx, PlanCard.tsx, 3 more files – 412 lines`,
    },
    {
      id: `prices`,
      parent: `coder`,
      name: `Create prices`,
      kind: `tool`,
      tool: `stripe.create_price`,
      detail: `Stripe`,
      icon: <C_demo_DGwUulJc />,
      at: 6.5,
      end: 7,
      args: [
        {
          plan: `Pro`,
          unit_amount: 800,
          per: `seat / month`,
        },
        {
          plan: `Team`,
          unit_amount: 1200,
          per: `seat / month`,
        },
      ],
      result: {
        created: 2,
        mode: `test`,
      },
    },
    {
      id: `tests`,
      parent: `coder`,
      name: `Run checkout tests`,
      kind: `tool`,
      tool: `run_tests`,
      detail: `GitHub`,
      icon: <ComponentY />,
      at: 7.1,
      end: 8.5,
      fails: !0,
      args: {
        command: `pnpm test checkout`,
      },
      error: `2 of 14 checkout tests fail – coupon codes aren't applied to seat prices`,
    },
    {
      id: `fix`,
      parent: `coder`,
      name: `Fix coupon handling`,
      kind: `llm`,
      detail: `GPT-6 Sol`,
      model: `GPT-6 Sol`,
      icon: <ComponentG />,
      at: 8.6,
      end: 9.9,
      tin: 12600,
      tout: 1900,
      cost: 0.072,
      input: `The two failing tests and checkout/coupon.ts`,
      output: `Apply the coupon per seat, not to the total – 1 file changed`,
    },
    {
      id: `retest`,
      parent: `coder`,
      name: `Run checkout tests`,
      kind: `tool`,
      tool: `run_tests`,
      detail: `retry`,
      icon: <ComponentY />,
      at: 10,
      end: 11.2,
      args: {
        command: `pnpm test checkout`,
      },
      result: {
        passed: 14,
        failed: 0,
      },
    },
    {
      id: `pr`,
      parent: `coder`,
      name: `Open pull request`,
      kind: `tool`,
      tool: `git.open_pr`,
      detail: `#482`,
      icon: <ComponentY />,
      at: 11.3,
      end: 12.2,
      args: {
        head: `feat/pricing-page`,
        base: `main`,
        reviewers: 2,
      },
      result: {
        pr: 482,
        url: `github.com/acme/web/pull/482`,
      },
    },
    {
      id: `crm`,
      parent: `root`,
      name: `Update plans`,
      kind: `tool`,
      tool: `hubspot.update_products`,
      detail: `HubSpot`,
      icon: <S_demo_DGwUulJc />,
      at: 12.45,
      end: 13,
      args: {
        products: [`Free`, `Pro`, `Team`],
      },
      result: {
        updated: 3,
      },
    },
    {
      id: `notify`,
      parent: `root`,
      name: `Post to #launch`,
      kind: `tool`,
      tool: `slack.post_message`,
      detail: `Slack`,
      icon: <ComponentB />,
      at: 12.5,
      end: 13.3,
      args: {
        channel: `#launch`,
        text: `Pricing page is ready for review – PR #482`,
      },
      result: {
        ok: !0,
        reactions: 3,
      },
    },
  ],
  k_demo_DGwUulJc: RecoveredValue = [
    {
      id: `inspector`,
      name: `Inspector`,
      kind: `agent`,
      model: `Haiku 5.5`,
      detail: `Haiku 5.5`,
      icon: <ComponentH_demo_DGwUulJc />,
      at: 0.1,
      end: 13.4,
      task: `Watches cost, errors and what reaches main`,
      output: `No issues left – the run stayed within budget`,
    },
    {
      id: `budget`,
      parent: `inspector`,
      name: `Check budget`,
      kind: `tool`,
      tool: `budget.check`,
      detail: `Budget`,
      icon: <D_demo_DGwUulJc />,
      at: 1,
      end: 1.4,
      args: {
        limit: `$2.00`,
        spent: `$0.12`,
      },
      result: `Within budget – 6% used`,
    },
    {
      id: `secrets`,
      parent: `inspector`,
      name: `Scan for secrets`,
      kind: `tool`,
      tool: `scan_secrets`,
      detail: `GitHub`,
      icon: <ComponentY />,
      at: 6.6,
      end: 7,
      args: {
        branch: `feat/pricing-page`,
      },
      result: `No secrets found in 5 files`,
    },
    {
      id: `review`,
      parent: `inspector`,
      name: `Review failed tests`,
      kind: `llm`,
      detail: `Haiku 5.5`,
      model: `Haiku 5.5`,
      icon: <ComponentH_demo_DGwUulJc />,
      at: 8.55,
      end: 9.3,
      tin: 4200,
      tout: 310,
      cost: 0.004,
      input: `2 failing checkout tests and the coder's plan to fix them`,
      output: `Retry allowed – the fix only touches checkout/coupon.ts`,
    },
    {
      id: `diff`,
      parent: `inspector`,
      name: `Check PR diff`,
      kind: `tool`,
      tool: `review_diff`,
      detail: `#482`,
      icon: <D_demo_DGwUulJc />,
      at: 12.25,
      end: 12.7,
      args: {
        pr: 482,
      },
      result: `412 lines, no risky files`,
    },
  ],
  A_demo_DGwUulJc: RecoveredValue = [...O_demo_DGwUulJc, ...k_demo_DGwUulJc],
  j_demo_DGwUulJc: RecoveredValue = 13.6,
  M_demo_DGwUulJc: RecoveredValue = 17.6,
  N_demo_DGwUulJc: RecoveredValue = 6,
  P_demo_DGwUulJc: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Math.round(e * 1e3 * N_demo_DGwUulJc),
  F_demo_DGwUulJc: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    let n: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
      let r: RecoveredValue = e >= t.end,
        i: RecoveredValue = r ? 1 : Math.max(0, (e - t.at) / (t.end - t.at));
      return {
        id: t.id,
        name: t.name,
        kind: t.kind,
        detail: t.detail,
        icon: t.icon,
        model: t.model,
        task: t.task,
        tool: t.tool,
        args: t.args,
        result: r ? t.result : void 0,
        status: r ? (t.fails ? `failed` : `done`) : `running`,
        start: P_demo_DGwUulJc(t.at),
        end: r ? P_demo_DGwUulJc(t.end) : void 0,
        tokensIn: t.tin,
        tokensOut: t.tout === void 0 ? void 0 : Math.round(t.tout * i),
        cost:
          t.cost === void 0
            ? void 0
            : t.kind === `llm`
              ? t.cost * (0.25 + 0.75 * i)
              : r
                ? t.cost
                : void 0,
        input: t.input,
        output: r ? t.output : void 0,
        error: r ? t.error : void 0,
        children: A_demo_DGwUulJc.filter(
          (n?: RecoveredValue): RecoveredValue => n.parent === t.id && e >= n.at,
        ).map(n),
      };
    };
    return n(t);
  },
  I_demo_DGwUulJc: RecoveredValue = 1100,
  L_demo_DGwUulJc: RecoveredValue = 640;
function Runtime(): RecoveredValue {
  let [e, t]: RecoveredValue = (0, r_demo_DGwUulJc.useState)(0),
    [n, a]: RecoveredValue = (0, r_demo_DGwUulJc.useState)(0),
    [o, s]: RecoveredValue = (0, r_demo_DGwUulJc.useState)(null),
    [c, l]: RecoveredValue = (0, r_demo_DGwUulJc.useState)(null),
    [u, d]: RecoveredValue = (0, r_demo_DGwUulJc.useState)(!1),
    f: RecoveredValue = (0, r_demo_DGwUulJc.useId)();
  (0, r_demo_DGwUulJc.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = performance.now(),
      n: RecoveredValue = 0,
      r: RecoveredValue = window.setInterval((): RecoveredValue => {
        let r: RecoveredValue = ((performance.now() - e) / 1e3) % M_demo_DGwUulJc;
        (r < n && a((e?: RecoveredValue): RecoveredValue => e + 1), (n = r), t(r));
      }, 60);
    return (): RecoveredValue => window.clearInterval(r);
  }, []);
  let m: RecoveredValue = (0, r_demo_DGwUulJc.useRef)(null),
    h: RecoveredValue = (0, r_demo_DGwUulJc.useRef)(null),
    [g, _]: RecoveredValue = (0, r_demo_DGwUulJc.useState)({
      scale: 0,
      h: 0,
      w: 0,
    });
  (0, r_demo_DGwUulJc.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = m.current,
      t: RecoveredValue = h.current;
    if (!e || !t) return;
    let n: RecoveredValue = !!e.closest(`.card__preview`),
      r: RecoveredValue = (): RecoveredValue => {
        let r: RecoveredValue = n
          ? Math.max(e.clientWidth, L_demo_DGwUulJc)
          : e.clientWidth;
        _({
          scale:
            r < L_demo_DGwUulJc ? 1 : Math.min(1.25, e.clientWidth / I_demo_DGwUulJc),
          h: t.offsetHeight,
          w: r,
        });
      };
    r();
    let i: RecoveredValue = new ResizeObserver(r);
    return (i.observe(e), i.observe(t), (): RecoveredValue => i.disconnect());
  }, []);
  let v: RecoveredValue = e >= 8.6 && e < 12.6,
    y: RecoveredValue = g.w > 0 && g.w < L_demo_DGwUulJc,
    b: RecoveredValue = (0, r_demo_DGwUulJc.useRef)({
      narrow: y,
      h: 720,
    });
  (b.current.narrow !== y &&
    (b.current = {
      narrow: y,
      h: y ? 0 : 720,
    }),
    (b.current.h = Math.max(b.current.h, g.h)));
  let x: RecoveredValue = b.current.h,
    S: RecoveredValue = Math.min(e, j_demo_DGwUulJc);
  return (
    <div className={`ri-demo`}>
      <div
        ref={m as RecoveredValue}
        className={`ri-demo__frame`}
        style={
          {
            height: x * g.scale || void 0,
          } as RecoveredValue
        }
      >
        <div
          ref={h as RecoveredValue}
          className={`ri-demo__canvas`}
          style={
            {
              width: y ? g.w : I_demo_DGwUulJc,
              transform: `scale(${g.scale || 1})`,
              visibility: g.scale ? void 0 : `hidden`,
            } as RecoveredValue
          }
        >
          <ComponentP_demo_DGwUulJc
            run={F_demo_DGwUulJc(S, O_demo_DGwUulJc[0])}
            supervisor={F_demo_DGwUulJc(S, k_demo_DGwUulJc[0])}
            now={P_demo_DGwUulJc(S)}
            startedAt={179388e7}
            selected={u ? o : v ? `coder` : null}
            onSelectedChange={(e?: RecoveredValue): RecoveredValue => {
              (d(!0), s(e));
            }}
            call={u ? c : v ? `tests` : null}
            onCallChange={(e?: RecoveredValue): RecoveredValue => {
              (d(!0), l(e));
            }}
            key={`${f}-${n}`}
          />
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
