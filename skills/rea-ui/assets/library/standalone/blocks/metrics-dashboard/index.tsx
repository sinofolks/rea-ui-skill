"use client";

import "./MetricsDashboard.css";
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
var n_demo_nN0NLgnO: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_nN0NLgnO: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_nN0NLgnO: RecoveredValue = [
    {
      key: `7d`,
      label: `Week`,
      days: 7,
    },
    {
      key: `30d`,
      label: `Month`,
      days: 30,
    },
    {
      key: `90d`,
      label: `Quarter`,
      days: 90,
    },
  ],
  a_demo_nN0NLgnO: RecoveredValue = [
    {
      key: `revenue`,
      label: `Revenue`,
      kind: `money`,
      zoom: !1,
      goodWhen: `up`,
    },
    {
      key: `orders`,
      label: `Orders`,
      kind: `count`,
      zoom: !1,
      goodWhen: `up`,
    },
    {
      key: `aov`,
      label: `Avg. order`,
      kind: `money`,
      zoom: !0,
      goodWhen: `up`,
    },
    {
      key: `refunds`,
      label: `Refund rate`,
      kind: `rate`,
      zoom: !0,
      goodWhen: `down`,
    },
  ],
  o_demo_nN0NLgnO: RecoveredValue = [
    {
      name: `Linen overshirt`,
      share: 0.22,
    },
    {
      name: `Everyday tote`,
      share: 0.16,
    },
    {
      name: `Merino crew`,
      share: 0.13,
    },
    {
      name: `Canvas sneaker`,
      share: 0.09,
    },
    {
      name: `Wool beanie`,
      share: 0.06,
    },
  ],
  s_demo_nN0NLgnO: RecoveredValue = [
    {
      name: `Online store`,
      share: 0.46,
    },
    {
      name: `Instagram`,
      share: 0.21,
    },
    {
      name: `Marketplace`,
      share: 0.14,
    },
    {
      name: `Wholesale`,
      share: 0.11,
    },
    {
      name: `Pop-up`,
      share: 0.05,
    },
  ];
function c_demo_nN0NLgnO(): RecoveredValue {
  let e: RecoveredValue = 7,
    t: RecoveredValue = (): RecoveredValue => (
      (e = (e * 16807) % 2147483647),
      (e - 1) / 2147483646
    ),
    n: RecoveredValue = new Date();
  return (
    n.setHours(12, 0, 0, 0),
    Array.from(
      {
        length: 180,
      },
      (e?: RecoveredValue, r?: RecoveredValue): RecoveredValue => {
        let i: RecoveredValue = new Date(n);
        i.setDate(n.getDate() - (179 - r));
        let a: RecoveredValue = 92 + r * 0.32,
          o: RecoveredValue = [1.22, 0.82, 0.86, 0.9, 0.96, 1.1, 1.3][i.getDay()],
          s: RecoveredValue = Math.round(a * o * (0.88 + t() * 0.24)),
          c: RecoveredValue = 61 + r * 0.03 + (t() - 0.5) * 8;
        return {
          date: i,
          revenue: Math.round(s * c),
          orders: s,
          refunded: Math.round(s * (0.026 - r * 3e-5 + (t() - 0.5) * 0.012)),
        };
      },
    ) as RecoveredValue[]
  );
}
var l_demo_nN0NLgnO: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  Number.isFinite(e) ? e : 0;
function u_demo_nN0NLgnO(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = e.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + l_demo_nN0NLgnO(t.revenue),
      0,
    ),
    r: RecoveredValue = e.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + l_demo_nN0NLgnO(t.orders),
      0,
    ),
    i: RecoveredValue = e.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + l_demo_nN0NLgnO(t.refunded),
      0,
    );
  return t === `revenue`
    ? n
    : t === `orders`
      ? r
      : t === `aov`
        ? r
          ? n / r
          : 0
        : r
          ? (i / r) * 100
          : 0;
}
var d_demo_nN0NLgnO: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  e.toLocaleDateString(`en-US`, {
    month: `short`,
    day: `numeric`,
  });
function f_demo_nN0NLgnO(
  e?: RecoveredValue,
  t?: RecoveredValue,
  n?: RecoveredValue,
): RecoveredValue {
  let r: RecoveredValue = e.slice(-t),
    i: RecoveredValue = e.slice(-t * 2, -t),
    a: RecoveredValue = t > 31 ? 7 : 1,
    o: RecoveredValue = [];
  for (let e: RecoveredValue = 0; e < r.length; e += a) {
    let t: RecoveredValue = r.slice(e, e + a),
      s: RecoveredValue = i.slice(e, e + a);
    o.push({
      label: d_demo_nN0NLgnO(t[0].date),
      value: u_demo_nN0NLgnO(t, n),
      previous: u_demo_nN0NLgnO(s, n),
    });
  }
  return o;
}
var p_demo_nN0NLgnO: RecoveredValue = new Map();
function m_demo_nN0NLgnO(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = p_demo_nN0NLgnO.get(e);
  if (!t) {
    let n: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
      try {
        return new Intl.NumberFormat(`en-US`, {
          style: `currency`,
          currency: e,
          ...t,
        });
      } catch {
        return new Intl.NumberFormat(`en-US`, {
          style: `currency`,
          currency: `USD`,
          ...t,
        });
      }
    };
    ((t = {
      money: n({
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      cents: n({
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      count: new Intl.NumberFormat(`en-US`, {
        maximumFractionDigits: 0,
      }),
      tick: new Intl.NumberFormat(`en-US`, {
        notation: `compact`,
        maximumFractionDigits: 1,
      }),
      moneyTick: n({
        notation: `compact`,
        maximumFractionDigits: 1,
        minimumFractionDigits: 0,
      }),
      short: new Intl.NumberFormat(`en-US`, {
        notation: `compact`,
        maximumFractionDigits: 2,
      }),
      moneyShort: n({
        notation: `compact`,
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      }),
    }),
      p_demo_nN0NLgnO.set(e, t));
  }
  return t;
}
var h: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n: RecoveredValue = `USD`,
  ): RecoveredValue => {
    if (!Number.isFinite(t)) return `—`;
    let r: RecoveredValue = m_demo_nN0NLgnO(n);
    return e === `refunds`
      ? `${t.toFixed(1)}%`
      : e === `aov`
        ? r.cents.format(t)
        : e === `revenue`
          ? r.money.format(Math.round(t))
          : r.count.format(Math.round(t));
  },
  g: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    e !== `refunds` && Math.abs(t) >= 1e6,
  _: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n: RecoveredValue = `USD`,
  ): RecoveredValue => {
    let r: RecoveredValue = m_demo_nN0NLgnO(n);
    return e === `orders` ? r.short.format(t) : r.moneyShort.format(t);
  },
  v: RecoveredValue = new Intl.NumberFormat(`en-US`, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
function y_demo_nN0NLgnO(
  e?: RecoveredValue,
  t?: RecoveredValue,
  n?: RecoveredValue,
  r?: RecoveredValue,
): RecoveredValue {
  let i: RecoveredValue = t.indexOf(n),
    a: RecoveredValue = t.length,
    o: RecoveredValue =
      e.key === `ArrowRight` || e.key === `ArrowDown`
        ? (i + 1) % a
        : e.key === `ArrowLeft` || e.key === `ArrowUp`
          ? (i - 1 + a) % a
          : e.key === `Home`
            ? 0
            : e.key === `End`
              ? a - 1
              : -1;
  o < 0 ||
    (e.preventDefault(),
    r(t[o]),
    e.currentTarget.querySelectorAll(`[role="radio"], [role="tab"]`)[o]?.focus());
}
var b_demo_nN0NLgnO: RecoveredValue =
    (e?: RecoveredValue): RecoveredValue =>
    (t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = t?.parentElement;
      if (!t || !n) return;
      let r: RecoveredValue = n.clientWidth,
        i: RecoveredValue = t.offsetWidth,
        a: RecoveredValue = (parseFloat(t.style.left) / 100) * r,
        o: RecoveredValue =
          a + e + i <= r
            ? e
            : a - e - i >= 0
              ? -e - i
              : Math.max(-a, Math.min(r - a - i, -i / 2));
      t.style.setProperty(`--ui-md-dx`, `${o}px`);
    },
  ee: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n: RecoveredValue = `USD`,
  ): RecoveredValue => {
    let r: RecoveredValue = m_demo_nN0NLgnO(n),
      i: RecoveredValue = Math.abs(t) < 10 ? Math.round(t * 10) / 10 : Math.round(t);
    return e === `refunds`
      ? `${r.tick.format(i)}%`
      : e === `revenue` || e === `aov`
        ? r.moneyTick.format(i)
        : r.tick.format(i);
  };
function te(e?: RecoveredValue): RecoveredValue {
  if (!(e > 0)) return 4;
  let t: RecoveredValue = 10 ** Math.floor(Math.log10(e / 4));
  return (
    ([1, 2, 2.5, 5, 10]
      .map((e?: RecoveredValue): RecoveredValue => e * t)
      .find((t?: RecoveredValue): RecoveredValue => t * 4 >= e * 1.08) ?? t * 10) * 4
  );
}
function ne(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = te(t - e) / 4;
  for (let r: RecoveredValue = 0; r < 4; r++) {
    let r: RecoveredValue = Math.floor(e / n) * n;
    if (r + n * 4 >= t) return [r, r + n * 4];
    n *= 2;
  }
  return [e, t];
}
function x(e?: RecoveredValue): RecoveredValue {
  if (e.length < 2) return ``;
  let t: RecoveredValue = e.length,
    n: RecoveredValue = [],
    r: RecoveredValue = [];
  for (let r: RecoveredValue = 0; r < t - 1; r++)
    n.push((e[r + 1][1] - e[r][1]) / (e[r + 1][0] - e[r][0]));
  r.push(n[0]);
  for (let e: RecoveredValue = 1; e < t - 1; e++)
    r.push(n[e - 1] * n[e] <= 0 ? 0 : (n[e - 1] + n[e]) / 2);
  r.push(n[t - 2]);
  for (let e: RecoveredValue = 0; e < t - 1; e++) {
    if (n[e] === 0) {
      r[e] = r[e + 1] = 0;
      continue;
    }
    let t: RecoveredValue = r[e] / n[e],
      i: RecoveredValue = r[e + 1] / n[e],
      a: RecoveredValue = t * t + i * i;
    if (a > 9) {
      let o: RecoveredValue = 3 / Math.sqrt(a);
      ((r[e] = o * t * n[e]), (r[e + 1] = o * i * n[e]));
    }
  }
  let i: RecoveredValue = `M${e[0][0]},${e[0][1]}`;
  for (let n: RecoveredValue = 0; n < t - 1; n++) {
    let [t, a]: RecoveredValue = e[n],
      [o, s]: RecoveredValue = e[n + 1],
      c: RecoveredValue = (o - t) / 3;
    i += `C${t + c},${a + r[n] * c} ${o - c},${s - r[n + 1] * c} ${o},${s}`;
  }
  return i;
}
function S(e?: RecoveredValue, t: RecoveredValue = 600): RecoveredValue {
  let [r, i]: RecoveredValue = (0, n_demo_nN0NLgnO.useState)(e),
    a: RecoveredValue = (0, n_demo_nN0NLgnO.useRef)(e);
  return (
    (0, n_demo_nN0NLgnO.useEffect)((): RecoveredValue => {
      if (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
        ((a.current = e), i(e));
        return;
      }
      let n: RecoveredValue = performance.now(),
        r: RecoveredValue = a.current,
        o: RecoveredValue = 0,
        s: RecoveredValue = (c?: RecoveredValue): RecoveredValue => {
          let l: RecoveredValue = Math.min(1, (c - n) / t),
            u: RecoveredValue = 1 - (1 - l) ** 3,
            d: RecoveredValue = r + (e - r) * u;
          ((a.current = d), i(d), l < 1 && (o = requestAnimationFrame(s)));
        };
      return (
        (o = requestAnimationFrame(s)),
        (): RecoveredValue => cancelAnimationFrame(o)
      );
    }, [e, t]),
    r
  );
}
var C: RecoveredValue = 600,
  w: RecoveredValue = 200;
function T_demo_nN0NLgnO({
  title = `Sales`,
  site = `Northwind Store`,
  defaultRange = `30d`,
  defaultMetric = `revenue`,
  onExport,
  data,
  products = o_demo_nN0NLgnO,
  channels = s_demo_nN0NLgnO,
  currency = `USD`,
  className,
}: RecoveredValue): RecoveredValue {
  let T: RecoveredValue =
      `ui-md` + (0, n_demo_nN0NLgnO.useId)().replace(/[^a-zA-Z0-9_-]/g, ``),
    D: RecoveredValue = (0, n_demo_nN0NLgnO.useMemo)(c_demo_nN0NLgnO, []),
    O: RecoveredValue = data ?? D,
    [k, A]: RecoveredValue = (0, n_demo_nN0NLgnO.useState)(defaultRange),
    [j, M]: RecoveredValue = (0, n_demo_nN0NLgnO.useState)(defaultMetric),
    [N, ae]: RecoveredValue = (0, n_demo_nN0NLgnO.useState)(!1),
    [P, F]: RecoveredValue = (0, n_demo_nN0NLgnO.useState)(`line`),
    [I, L]: RecoveredValue = (0, n_demo_nN0NLgnO.useState)(null),
    [R, oe]: RecoveredValue = (0, n_demo_nN0NLgnO.useState)(!1),
    z: RecoveredValue = (0, n_demo_nN0NLgnO.useRef)(null),
    B: RecoveredValue = i_demo_nN0NLgnO.find(
      (e?: RecoveredValue): RecoveredValue => e.key === k,
    ).days,
    V: RecoveredValue = O.slice(-B),
    H: RecoveredValue = O.slice(-B * 2, -B),
    U: RecoveredValue = (0, n_demo_nN0NLgnO.useMemo)(
      (): RecoveredValue => f_demo_nN0NLgnO(O, B, j),
      [O, B, j],
    ),
    W: RecoveredValue = a_demo_nN0NLgnO.find(
      (e?: RecoveredValue): RecoveredValue => e.key === j,
    ),
    G: RecoveredValue = U.flatMap(
      (e?: RecoveredValue): RecoveredValue => (N ? [e.value, e.previous] : [e.value]),
    ),
    [K, q]: RecoveredValue = ((): RecoveredValue => {
      if (G.length === 0) return [0, 4];
      let e: RecoveredValue = Math.min(0, ...G);
      if (e < 0) return ne(e, Math.max(0, ...G));
      if (!W.zoom || P === `bars`) return [0, te(Math.max(...G))];
      let t: RecoveredValue = Math.min(...G),
        n: RecoveredValue = Math.max(...G),
        r: RecoveredValue = Math.max((n - t) * 0.8, n * 0.02),
        i: RecoveredValue = (n + r - Math.max(0, t - r)) / 4,
        a: RecoveredValue = i >= 1 ? Math.ceil(i) : Math.ceil(i * 10) / 10,
        o: RecoveredValue = Math.max(0, Math.floor((t - r) / a) * a);
      return [o, o + a * 4];
    })(),
    J: RecoveredValue = (e?: RecoveredValue): RecoveredValue => (e - K) / (q - K),
    Y: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => [
      U.length > 1 ? (e / (U.length - 1)) * C : C / 2,
      w - J(t) * w,
    ],
    X: RecoveredValue = x(
      U.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => Y(t, e.value)),
    ),
    se: RecoveredValue = x(
      U.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => Y(t, e.previous)),
    ),
    ce: RecoveredValue = X ? `${X}L${C},${w}L0,${w}Z` : ``,
    le: RecoveredValue = (e?: RecoveredValue): RecoveredValue => ({
      height: `${Math.abs(J(e) - J(Math.max(K, 0))) * 100}%`,
      bottom: `${Math.max(0, J(Math.min(0, e))) * 100}%`,
    }),
    ue: RecoveredValue = [0, 1, 2, 3, 4].map(
      (e?: RecoveredValue): RecoveredValue => K + ((q - K) / 4) * e,
    ),
    de: RecoveredValue = Math.ceil(U.length / 6),
    Z: RecoveredValue = I !== null && I < U.length ? I : null,
    fe: RecoveredValue = u_demo_nN0NLgnO(V, `revenue`),
    Q: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      U.length > 1 ? (e / (U.length - 1)) * 100 : 50,
    pe: RecoveredValue = 100 / U.length,
    $: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      P === `bars` ? pe * (e + 0.5) : Q(e);
  (0, n_demo_nN0NLgnO.useEffect)((): RecoveredValue => L(null), [k, j, P]);
  let me: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = z.current;
      if (!t) return;
      let n: RecoveredValue = t.getBoundingClientRect(),
        r: RecoveredValue = (e - n.left) / n.width,
        i: RecoveredValue =
          P === `bars` ? Math.floor(r * U.length) : Math.round(r * (U.length - 1));
      L(Math.max(0, Math.min(U.length - 1, i)));
    },
    he: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = U.length - 1,
        n: RecoveredValue = I ?? t,
        r: RecoveredValue =
          e.key === `ArrowLeft`
            ? n - 1
            : e.key === `ArrowRight`
              ? n + 1
              : e.key === `Home`
                ? 0
                : e.key === `End`
                  ? t
                  : null;
      r !== null && (e.preventDefault(), L(Math.max(0, Math.min(t, r))));
    },
    ge: RecoveredValue = i_demo_nN0NLgnO.findIndex(
      (e?: RecoveredValue): RecoveredValue => e.key === k,
    );
  return (
    <div className={[`ui-md`, className].filter(Boolean).join(` `)}>
      <div className={`ui-md__bar`}>
        <div className={`ui-md__heading`}>
          <span className={`ui-md__title`} title={title}>
            {title}
          </span>
          <span
            className={`ui-md__site`}
            title={site ? `${site} · Last ${B} days` : void 0}
          >
            {site ? `${site} · ` : ``}
            {`Last `}
            {B}
            {` days`}
          </span>
        </div>
        <div className={`ui-md__actions`}>
          <div
            className={`ui-md__range`}
            role={`radiogroup`}
            aria-label={`Period`}
            onKeyDown={(e?: RecoveredValue): RecoveredValue =>
              y_demo_nN0NLgnO(
                e,
                i_demo_nN0NLgnO.map((e?: RecoveredValue): RecoveredValue => e.key),
                k,
                A,
              )
            }
          >
            <span
              className={`ui-md__range-thumb`}
              aria-hidden={`true`}
              style={
                {
                  transform: `translateX(${ge * 100}%)`,
                } as RecoveredValue
              }
            />
            {i_demo_nN0NLgnO.map(
              (e?: RecoveredValue): RecoveredValue => (
                <button
                  type={`button`}
                  role={`radio`}
                  aria-checked={k === e.key}
                  tabIndex={k === e.key ? 0 : -1}
                  onClick={(): RecoveredValue => A(e.key)}
                  children={e.label}
                  key={e.key}
                />
              ),
            )}
          </div>
          <button
            type={`button`}
            className={`ui-md__export`}
            onClick={(): RecoveredValue => {
              (onExport?.(k, j),
                oe(!0),
                window.setTimeout((): RecoveredValue => oe(!1), 1600));
            }}
          >
            <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
              {R ? (
                <path d={`m5 12.5 4.5 4.5L19 7.5`} />
              ) : (
                <path d={`M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14`} />
              )}
            </svg>
            <span aria-live={`polite`}>{R ? `Exported` : `Export`}</span>
          </button>
        </div>
      </div>
      <div
        className={`ui-md__kpis`}
        role={`tablist`}
        aria-label={`Metric`}
        onKeyDown={(e?: RecoveredValue): RecoveredValue =>
          y_demo_nN0NLgnO(
            e,
            a_demo_nN0NLgnO.map((e?: RecoveredValue): RecoveredValue => e.key),
            j,
            M,
          )
        }
      >
        {a_demo_nN0NLgnO.map(
          (e?: RecoveredValue): RecoveredValue => (
            <ComponentRe
              meta={e}
              id={`${T}-tab-${e.key}`}
              panel={`${T}-chart`}
              selected={j === e.key}
              value={u_demo_nN0NLgnO(V, e.key)}
              before={
                H.length && H.length === V.length ? u_demo_nN0NLgnO(H, e.key) : null
              }
              currency={currency}
              onSelect={(): RecoveredValue => M(e.key)}
              key={e.key}
            />
          ),
        )}
      </div>
      <div className={`ui-md__card`}>
        <div
          className={`ui-md__chart`}
          id={`${T}-chart`}
          role={`tabpanel`}
          aria-labelledby={`${T}-tab-${j}`}
        >
          <div className={`ui-md__chart-head`}>
            <span className={`ui-md__legend`}>
              <i aria-hidden={`true`} />
              {W.label}
            </span>
            <div className={`ui-md__chart-tools`}>
              <div
                className={`ui-md__kind`}
                role={`radiogroup`}
                aria-label={`Chart type`}
                onKeyDown={(e?: RecoveredValue): RecoveredValue =>
                  y_demo_nN0NLgnO(e, [`line`, `bars`], P, F)
                }
              >
                <span
                  className={`ui-md__kind-thumb`}
                  aria-hidden={`true`}
                  style={
                    {
                      transform: P === `bars` ? `translateX(100%)` : void 0,
                    } as RecoveredValue
                  }
                />
                <button
                  type={`button`}
                  role={`radio`}
                  aria-checked={P === `line`}
                  tabIndex={P === `line` ? 0 : -1}
                  aria-label={`Line chart`}
                  onClick={(): RecoveredValue => F(`line`)}
                >
                  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
                    <path d={`M3.5 16.5 9 11l4 3.5 7.5-8`} />
                    <circle cx={`9`} cy={`11`} r={`1.6`} />
                    <circle cx={`13`} cy={`14.5`} r={`1.6`} />
                  </svg>
                </button>
                <button
                  type={`button`}
                  role={`radio`}
                  aria-checked={P === `bars`}
                  tabIndex={P === `bars` ? 0 : -1}
                  aria-label={`Bar chart`}
                  onClick={(): RecoveredValue => F(`bars`)}
                >
                  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
                    <path d={`M5.5 19.5v-6M10 19.5V8M14.5 19.5v-9M19 19.5V5`} />
                  </svg>
                </button>
              </div>
              <label className={`ui-md__compare`}>
                <input
                  type={`checkbox`}
                  role={`switch`}
                  checked={N}
                  onChange={(e?: RecoveredValue): RecoveredValue => ae(e.target.checked)}
                />
                <span className={`ui-md__switch`} aria-hidden={`true`} />
                {`Compare to previous period`}
              </label>
            </div>
          </div>
          <div className={`ui-md__plot-wrap`}>
            <div className={`ui-md__axis`} aria-hidden={`true`}>
              {[...ue].reverse().map(
                (e?: RecoveredValue): RecoveredValue => (
                  <span children={ee(j, e, currency)} key={e} />
                ),
              )}
            </div>
            <div
              ref={z as RecoveredValue}
              className={`ui-md__plot`}
              tabIndex={0}
              role={`img`}
              aria-label={
                U.length
                  ? `${W.label} over the last ${B} days, from ${h(j, U[0].value, currency)} to ${h(j, U[U.length - 1].value, currency)}. Use the arrow keys to inspect points.`
                  : `${W.label}: no data for the last ${B} days`
              }
              onPointerMove={(e?: RecoveredValue): RecoveredValue =>
                e.pointerType === `mouse` && me(e.clientX)
              }
              onPointerDown={(e?: RecoveredValue): RecoveredValue => me(e.clientX)}
              onPointerLeave={(e?: RecoveredValue): RecoveredValue =>
                e.pointerType === `mouse` && L(null)
              }
              onKeyDown={he}
              onBlur={(): RecoveredValue => L(null)}
            >
              <svg
                viewBox={`0 0 ${C} ${w}`}
                preserveAspectRatio={`none`}
                aria-hidden={`true`}
              >
                <defs>
                  <linearGradient id={`${T}-area`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
                    <stop offset={`0%`} className={`ui-md__area-a`} />
                    <stop offset={`100%`} className={`ui-md__area-b`} />
                  </linearGradient>
                </defs>
                {ue.map(
                  (e?: RecoveredValue): RecoveredValue => (
                    <line
                      className={e === K ? `ui-md__base` : `ui-md__grid`}
                      x1={`0`}
                      x2={C}
                      y1={w - J(e) * w}
                      y2={w - J(e) * w}
                      key={e}
                    />
                  ),
                )}
                {P === `line` && (
                  <g className={`ui-md__series`} key={`${k}-${j}`}>
                    <path className={`ui-md__area`} d={ce} fill={`url(#${T}-area)`} />
                    {N && <path className={`ui-md__prev`} d={se} />}
                    <path className={`ui-md__line`} d={X} />
                  </g>
                )}
                {Z !== null && P === `line` && (
                  <line
                    className={`ui-md__guide`}
                    x1={Y(Z, 0)[0]}
                    x2={Y(Z, 0)[0]}
                    y1={`0`}
                    y2={w}
                  />
                )}
              </svg>
              {U.length === 0 && (
                <span className={`ui-md__nodata`}>{`No data for this period`}</span>
              )}
              {P === `line` && (
                <div
                  className={`ui-md__dots`}
                  aria-hidden={`true`}
                  children={U.map(
                    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                      <span
                        style={
                          {
                            left: `${Q(t)}%`,
                            top: `${(1 - J(e.value)) * 100}%`,
                            animationDelay: `${(t / U.length) * 700}ms`,
                          } as RecoveredValue
                        }
                        key={t}
                      />
                    ),
                  )}
                  key={`dots-${k}-${j}`}
                />
              )}
              {P === `bars` && (
                <div
                  className={`ui-md__bars`}
                  data-compare={N ? `` : void 0}
                  aria-hidden={`true`}
                  children={U.map(
                    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                      <div
                        className={`ui-md__bar-slot`}
                        data-active={Z === t ? `` : void 0}
                        style={
                          {
                            "--d": `${(t / U.length) * 400}ms`,
                          } as RecoveredValue
                        }
                        key={t}
                      >
                        {N && (
                          <span
                            className={`ui-md__col ui-md__col--prev`}
                            style={le(e.previous) as RecoveredValue}
                          />
                        )}
                        <span
                          className={`ui-md__col`}
                          style={le(e.value) as RecoveredValue}
                        />
                      </div>
                    ),
                  )}
                  key={`bars-${k}-${j}`}
                />
              )}
              {Z !== null && (
                <r_demo_nN0NLgnO.Fragment>
                  {P === `line` && N && (
                    <span
                      className={`ui-md__dot ui-md__dot--prev`}
                      style={
                        {
                          left: `${Q(Z)}%`,
                          top: `${(1 - J(U[Z].previous)) * 100}%`,
                        } as RecoveredValue
                      }
                    />
                  )}
                  {P === `line` && (
                    <span
                      className={`ui-md__dot`}
                      style={
                        {
                          left: `${Q(Z)}%`,
                          top: `${(1 - J(U[Z].value)) * 100}%`,
                        } as RecoveredValue
                      }
                    />
                  )}
                  <div
                    ref={b_demo_nN0NLgnO(14) as RecoveredValue}
                    className={`ui-md__tip`}
                    role={`status`}
                    data-side={Z > (U.length - 1) / 2 ? `left` : `right`}
                    style={
                      {
                        left: `${$(Z)}%`,
                      } as RecoveredValue
                    }
                  >
                    <span className={`ui-md__tip-date`}>
                      {B > 31 ? `Week of ${U[Z].label}` : U[Z].label}
                    </span>
                    <span className={`ui-md__tip-row`}>
                      <i aria-hidden={`true`} />
                      {W.label}
                      <b>{h(j, U[Z].value, currency)}</b>
                    </span>
                    {N && (
                      <span className={`ui-md__tip-row ui-md__tip-row--prev`}>
                        <i aria-hidden={`true`} />
                        {`Previous`}
                        <b>{h(j, U[Z].previous, currency)}</b>
                      </span>
                    )}
                  </div>
                </r_demo_nN0NLgnO.Fragment>
              )}
            </div>
            <div className={`ui-md__dates`} aria-hidden={`true`}>
              {U.map(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
                  t % de === 0 ? (
                    <span
                      data-start={P === `line` && t === 0 && U.length > 1 ? `` : void 0}
                      data-end={$(t) > 88 ? `` : void 0}
                      style={
                        {
                          left: `${$(t)}%`,
                        } as RecoveredValue
                      }
                      children={e.label}
                      key={t}
                    />
                  ) : null,
              )}
            </div>
          </div>
        </div>
        <div className={`ui-md__lists`}>
          <E
            title={`Top products`}
            rows={products}
            total={fe}
            currency={currency}
            empty={`No products yet`}
          />
          <E
            title={`Channels`}
            rows={channels}
            total={fe}
            currency={currency}
            empty={`No channels yet`}
          />
        </div>
      </div>
    </div>
  );
}
function ComponentRe({
  meta,
  id,
  panel,
  selected,
  value,
  before,
  currency,
  onSelect,
}: RecoveredValue): RecoveredValue {
  let l: RecoveredValue = S(value),
    u: RecoveredValue = meta.kind === `rate`,
    d: RecoveredValue = before !== null && (u || before !== 0),
    f: RecoveredValue = d ? (u ? value - before : ((value - before) / before) * 100) : 0,
    p: RecoveredValue = f >= 0,
    m: RecoveredValue = (p ? `up` : `down`) === meta.goodWhen,
    y: RecoveredValue = u ? `${v.format(Math.abs(f))} pts` : `${v.format(Math.abs(f))}%`,
    b: RecoveredValue = g(meta.key, value);
  return (
    <button
      type={`button`}
      role={`tab`}
      id={id}
      aria-selected={selected}
      aria-controls={panel}
      tabIndex={selected ? 0 : -1}
      className={`ui-md__kpi`}
      onClick={onSelect}
    >
      <span className={`ui-md__kpi-label`}>{meta.label}</span>
      <span
        className={`ui-md__kpi-value`}
        title={b ? h(meta.key, value, currency) : void 0}
      >
        {b ? _(meta.key, l, currency) : h(meta.key, l, currency)}
      </span>
      <span
        className={`ui-md__delta`}
        data-good={m ? `` : void 0}
        data-none={d ? void 0 : ``}
        aria-hidden={!d || void 0}
      >
        <svg
          viewBox={`0 0 24 24`}
          aria-hidden={`true`}
          style={
            {
              transform: p ? void 0 : `rotate(180deg)`,
            } as RecoveredValue
          }
        >
          <path d={`M7 14.5 12 9.5l5 5`} />
        </svg>
        {y}
        <span className={`ui-md__sr`}>
          {` `}
          {p ? `up` : `down`}
          {` versus the previous period`}
        </span>
      </span>
    </button>
  );
}
function E({ title, rows, total, currency, empty }: RecoveredValue): RecoveredValue {
  let o: RecoveredValue = Math.max(
    0,
    ...rows.map((e?: RecoveredValue): RecoveredValue => l_demo_nN0NLgnO(e.share)),
  );
  return (
    <div className={`ui-md__list`}>
      <div className={`ui-md__list-head`}>
        <span>{title}</span>
        <span>{`Revenue`}</span>
      </div>
      {rows.length === 0 ? (
        <p className={`ui-md__empty`}>{empty}</p>
      ) : (
        <ul>
          {rows.map(
            ({ name, share }: RecoveredValue, a?: RecoveredValue): RecoveredValue => (
              <D_demo_nN0NLgnO
                name={name}
                value={total * l_demo_nN0NLgnO(share)}
                width={
                  o > 0
                    ? Math.min(100, Math.max(0, (l_demo_nN0NLgnO(share) / o) * 100))
                    : 0
                }
                currency={currency}
                key={`${a}-${name}`}
              />
            ),
          )}
        </ul>
      )}
    </div>
  );
}
function D_demo_nN0NLgnO({
  name,
  value,
  width,
  currency,
}: RecoveredValue): RecoveredValue {
  let a: RecoveredValue = S(value);
  return (
    <li className={`ui-md__row`}>
      <span
        className={`ui-md__row-bar`}
        style={
          {
            width: `${width}%`,
          } as RecoveredValue
        }
        aria-hidden={`true`}
      />
      <span className={`ui-md__row-name`} title={name}>
        {name}
      </span>
      <span className={`ui-md__row-value`}>{h(`revenue`, a, currency)}</span>
    </li>
  );
}
var O_demo_nN0NLgnO: RecoveredValue = 880;
function Runtime(): RecoveredValue {
  let e: RecoveredValue = (0, n_demo_nN0NLgnO.useRef)(null),
    [t, i]: RecoveredValue = (0, n_demo_nN0NLgnO.useState)(null);
  return (
    (0, n_demo_nN0NLgnO.useLayoutEffect)((): RecoveredValue => {
      let t: RecoveredValue = e.current,
        n: RecoveredValue = t?.closest(`.card__preview`),
        r: RecoveredValue = n ?? t?.closest(`.stage`);
      if (!t || !r) return;
      let a: RecoveredValue = (): RecoveredValue => {
        let e: RecoveredValue = r.clientWidth;
        if (n)
          return i({
            scale: (e - 48) / O_demo_nN0NLgnO,
            card: !0,
          });
        if (e < 760) return i(null);
        i({
          scale: Math.min(0.82, (e - 140) / O_demo_nN0NLgnO),
          card: !1,
        });
      };
      a();
      let o: RecoveredValue = new ResizeObserver(a);
      return (o.observe(r), (): RecoveredValue => o.disconnect());
    }, []),
    (
      <div
        ref={e as RecoveredValue}
        className={`metrics-demo`}
        data-fit={t ? (t.card ? `card` : `stage`) : void 0}
      >
        <div
          className={`metrics-demo__frame`}
          style={
            (t
              ? t.card
                ? {
                    width: O_demo_nN0NLgnO,
                    transform: `scale(${t.scale})`,
                  }
                : {
                    width: O_demo_nN0NLgnO,
                    zoom: t.scale,
                  }
              : void 0) as RecoveredValue
          }
        >
          <T_demo_nN0NLgnO />
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
