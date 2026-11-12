"use client";

import "./KpiBoard.clean.css";
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
var n_demo_clean_CThrR6ii: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_clean_CThrR6ii: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_clean_CThrR6ii: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + (Number.isFinite(t) ? t : 0),
      0,
    ),
  a_demo_clean_CThrR6ii: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Number.isFinite(e)
      ? new Intl.NumberFormat(`en-US`, {
          maximumFractionDigits: 0,
        }).format(Math.round(e))
      : `—`,
  o_demo_clean_CThrR6ii: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    `${e < 0 ? `−` : ``}$${new Intl.NumberFormat(`en-US`, {
      minimumFractionDigits: Math.abs(e) < 1e4 ? 2 : 0,
      maximumFractionDigits: Math.abs(e) < 1e4 ? 2 : 0,
    }).format(Math.abs(e))}`,
  s_demo_clean_CThrR6ii: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => (t > 0 ? Math.round(e * (t - 1)) : null),
  c_demo_clean_CThrR6ii: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.map((e?: RecoveredValue): RecoveredValue => (Number.isFinite(e) ? e : 0)),
  l_demo_clean_CThrR6ii: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue =>
    new Intl.NumberFormat(`en-US`, {
      minimumFractionDigits: t,
      maximumFractionDigits: t,
    }).format(Math.abs(e)),
  u_demo_clean_CThrR6ii: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => (e < 0 ? e * (2 - t) : e * t),
  d_demo_clean_CThrR6ii: RecoveredValue =
    (e?: RecoveredValue): RecoveredValue =>
    (t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = t?.parentElement;
      if (!t || !n) return;
      let r: RecoveredValue = n.clientWidth,
        i: RecoveredValue = t.offsetWidth,
        a: RecoveredValue = (parseFloat(t.style.left) / 100) * r,
        o: RecoveredValue = Math.max(-a, Math.min(r - a - i, -i / 2)),
        s: RecoveredValue =
          e === 0 ? o : a + e + i <= r ? e : a - e - i >= 0 ? -e - i : o;
      t.style.setProperty(`--ui-kbc-dx`, `${s}px`);
    },
  f_demo_clean_CThrR6ii: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    1 - (1 - e) ** 4,
  p_demo_clean_CThrR6ii: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue => e + (t - e) * n,
  m_demo_clean_CThrR6ii: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function ee_demo_clean_CThrR6ii(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
  return !e || e.length === 0
    ? Array(t).fill(0)
    : e.length === 1
      ? Array(t).fill(e[0])
      : (Array.from(
          {
            length: t,
          },
          (n?: RecoveredValue, r?: RecoveredValue): RecoveredValue => {
            let i: RecoveredValue = (r / (t - 1)) * (e.length - 1),
              a: RecoveredValue = Math.floor(i),
              o: RecoveredValue = Math.min(e.length - 1, a + 1);
            return p_demo_clean_CThrR6ii(e[a], e[o], i - a);
          },
        ) as RecoveredValue[]);
}
function h(
  e?: RecoveredValue,
  t?: RecoveredValue,
  n?: RecoveredValue,
  r: RecoveredValue = 6,
  i: RecoveredValue = 94,
): RecoveredValue {
  let a: RecoveredValue = n - t || 1,
    o: RecoveredValue = e.map(
      (n?: RecoveredValue, o?: RecoveredValue): RecoveredValue => [
        (o / Math.max(1, e.length - 1)) * 100,
        i - ((n - t) / a) * (i - r),
      ],
    ),
    s: RecoveredValue = o
      .map(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          `${t ? `L` : `M`}${e[0].toFixed(2)},${e[1].toFixed(2)}`,
      )
      .join(``);
  return {
    pts: o,
    line: s,
    area: `${s}L100,100L0,100Z`,
  };
}
var g: RecoveredValue = (
  e?: RecoveredValue,
  t?: RecoveredValue,
  n?: RecoveredValue,
): RecoveredValue => e[Math.round((t / Math.max(1, n - 1)) * (e.length - 1))];
function te(
  e?: RecoveredValue,
  t?: RecoveredValue,
  r: RecoveredValue = 760,
): RecoveredValue {
  let i: RecoveredValue = (0, n_demo_clean_CThrR6ii.useRef)(null),
    a: RecoveredValue = (0, n_demo_clean_CThrR6ii.useRef)(e),
    o: RecoveredValue = (0, n_demo_clean_CThrR6ii.useRef)(null),
    [s, c]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)({
      key: null,
      t: 0,
    });
  return (
    o.current !== t && (o.current !== null && (i.current = a.current), (o.current = t)),
    (a.current = e),
    (0, n_demo_clean_CThrR6ii.useEffect)((): RecoveredValue => {
      if (m_demo_clean_CThrR6ii())
        return c({
          key: t,
          t: 1,
        });
      let e: RecoveredValue = performance.now(),
        n: RecoveredValue = 0,
        i: RecoveredValue = (a?: RecoveredValue): RecoveredValue => {
          let o: RecoveredValue = Math.min(1, (a - e) / r);
          (c({
            key: t,
            t: f_demo_clean_CThrR6ii(o),
          }),
            o < 1 && (n = requestAnimationFrame(i)));
        };
      return (
        (n = requestAnimationFrame(i)),
        (): RecoveredValue => cancelAnimationFrame(n)
      );
    }, [t, r]),
    {
      from: i.current,
      t: s.key === t ? s.t : 0,
    }
  );
}
var ne: RecoveredValue = {
    stats: [],
    overview: {
      title: ``,
      labels: [],
      current: [],
      previous: [],
    },
    focus: {
      title: ``,
      metric: ``,
      labels: [],
      values: [],
      previous: 0,
    },
  },
  ComponentRe: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`10`}
      height={`10`}
      viewBox={`0 0 10 10`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`m2.5 3.8 2.5 2.5 2.5-2.5`}
        stroke={`currentColor`}
        strokeWidth={`1.4`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
    </svg>
  ),
  Component_: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`m2.6 6.3 2.2 2.2 4.6-5`}
        stroke={`currentColor`}
        strokeWidth={`1.5`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
    </svg>
  ),
  ComponentIe: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`13`}
      height={`13`}
      viewBox={`0 0 14 14`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M2 4.2h5.2M10.2 4.2H12M2 9.8h1.8M6.8 9.8H12`}
        stroke={`currentColor`}
        strokeWidth={`1.3`}
        strokeLinecap={`round`}
      />
      <circle
        cx={`8.7`}
        cy={`4.2`}
        r={`1.5`}
        stroke={`currentColor`}
        strokeWidth={`1.3`}
      />
      <circle
        cx={`5.3`}
        cy={`9.8`}
        r={`1.5`}
        stroke={`currentColor`}
        strokeWidth={`1.3`}
      />
    </svg>
  ),
  ComponentAe: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 16 16`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M8 1.9 13.3 4.8v6.4L8 14.1 2.7 11.2V4.8L8 1.9Z`}
        stroke={`currentColor`}
        strokeWidth={`1.3`}
        strokeLinejoin={`round`}
      />
      <path
        d={`M2.9 4.9 8 7.7l5.1-2.8M8 7.7V14`}
        stroke={`currentColor`}
        strokeWidth={`1.3`}
        strokeLinejoin={`round`}
      />
    </svg>
  ),
  ComponentOe: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`14`}
      height={`14`}
      viewBox={`0 0 14 14`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <rect
        x={`2`}
        y={`2.8`}
        width={`10`}
        height={`9.2`}
        rx={`2`}
        stroke={`currentColor`}
        strokeWidth={`1.2`}
      />
      <path
        d={`M2 5.8h10M4.8 1.6v2.2M9.2 1.6v2.2`}
        stroke={`currentColor`}
        strokeWidth={`1.2`}
        strokeLinecap={`round`}
      />
    </svg>
  ),
  ComponentSe: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`14`}
      height={`14`}
      viewBox={`0 0 14 14`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M2.2 3.5h9.6M3.9 7h6.2M5.6 10.5h2.8`}
        stroke={`currentColor`}
        strokeWidth={`1.2`}
        strokeLinecap={`round`}
      />
    </svg>
  );
function ComponentV({ up, good, children }: RecoveredValue): RecoveredValue {
  return (
    <span className={`ui-kbc__change`} data-good={good ? `` : void 0}>
      <svg
        width={`8`}
        height={`8`}
        viewBox={`0 0 8 8`}
        aria-hidden={`true`}
        style={
          (up
            ? void 0
            : {
                transform: `scaleY(-1)`,
              }) as RecoveredValue
        }
      >
        <path d={`M4 1.2 7.2 6.4H.8L4 1.2Z`} fill={`currentColor`} />
      </svg>
      {children}
    </span>
  );
}
function ComponentCe({
  label,
  value,
  options,
  icon,
  onChange,
}: RecoveredValue): RecoveredValue {
  let s: RecoveredValue = (0, n_demo_clean_CThrR6ii.useId)(),
    c: RecoveredValue = (0, n_demo_clean_CThrR6ii.useRef)(null),
    [l, u]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)(!1),
    [d, f]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)(0),
    p: RecoveredValue = Math.max(
      0,
      options.findIndex((e?: RecoveredValue): RecoveredValue => e.id === value),
    );
  (0, n_demo_clean_CThrR6ii.useEffect)((): RecoveredValue => {
    if (!l) return;
    let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      c.current?.contains(e.target) || u(!1);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      (): RecoveredValue => document.removeEventListener(`pointerdown`, e)
    );
  }, [l]);
  let m: RecoveredValue = (): RecoveredValue => {
      (f(p), u(!0));
    },
    ee: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (u(!1),
        options[e] && options[e].id !== value && onChange(options[e].id),
        c.current?.querySelector(`button`)?.focus({
          preventScroll: !0,
        }));
    };
  return (
    <div
      ref={c as RecoveredValue}
      className={`ui-kbc__pick`}
      data-open={l ? `` : void 0}
      onKeyDown={(e?: RecoveredValue): RecoveredValue => {
        if (!l) {
          (e.key === `ArrowDown` ||
            e.key === `ArrowUp` ||
            e.key === `Enter` ||
            e.key === ` `) &&
            (e.preventDefault(), m());
          return;
        }
        e.key === `Escape`
          ? (e.preventDefault(), e.stopPropagation(), u(!1))
          : e.key === `ArrowDown` || e.key === `ArrowUp`
            ? (e.preventDefault(),
              f(
                (t?: RecoveredValue): RecoveredValue =>
                  (t + (e.key === `ArrowDown` ? 1 : -1) + options.length) %
                  options.length,
              ))
            : e.key === `Home` || e.key === `End`
              ? (e.preventDefault(), f(e.key === `Home` ? 0 : options.length - 1))
              : e.key === `Enter` || e.key === ` `
                ? (e.preventDefault(), ee(d))
                : e.key === `Tab` && u(!1);
      }}
    >
      <button
        type={`button`}
        className={`ui-kbc__pick-button`}
        role={`combobox`}
        aria-label={label}
        aria-haspopup={`listbox`}
        aria-expanded={l}
        aria-controls={`${s}-list`}
        aria-activedescendant={l ? `${s}-${d}` : void 0}
        onClick={(): RecoveredValue => (l ? u(!1) : m())}
        onKeyUp={(e?: RecoveredValue): RecoveredValue =>
          e.key === ` ` && e.preventDefault()
        }
      >
        <span className={`ui-kbc__pick-icon`}>{icon}</span>
        <span title={options[p]?.label}>{options[p]?.label}</span>
        <ComponentRe />
      </button>
      {l && (
        <ul
          id={`${s}-list`}
          className={`ui-kbc__menu`}
          role={`listbox`}
          aria-label={label}
        >
          {options.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <li
                id={`${s}-${t}`}
                role={`option`}
                aria-selected={t === p}
                className={`ui-kbc__option`}
                data-active={t === d ? `` : void 0}
                onPointerEnter={(): RecoveredValue => f(t)}
                onClick={(): RecoveredValue => ee(t)}
                key={e.id}
              >
                <span className={`ui-kbc__pick-icon`}>{icon}</span>
                <span title={e.label}>{e.label}</span>
                {t === p && <Component_ />}
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
var le: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  e && /[^s]s$/i.test(e) && !/(us|is)$/i.test(e) ? e.slice(0, -1) : e;
function ComponentUe({
  data,
  ranges,
  range,
  defaultRange,
  onRangeChange,
  segments,
  segment,
  defaultSegment,
  onSegmentChange,
  compareLabel = `vs. last period`,
  currentLabel = `This period`,
  previousLabel = `Last period`,
  formatMoney = o_demo_clean_CThrR6ii,
  icon,
  title,
  setup,
  action,
  className,
}: RecoveredValue): RecoveredValue {
  let D: RecoveredValue = (0, n_demo_clean_CThrR6ii.useId)().replace(/:/g, ``),
    [he, ge]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)(
      defaultRange ?? ranges[0]?.id,
    ),
    O: RecoveredValue = range ?? he ?? ranges[0]?.id,
    [_e, ve]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)(
      defaultSegment ?? segments?.[0]?.id,
    ),
    k: RecoveredValue = segment ?? _e,
    A: RecoveredValue = data[O] ?? Object.values(data)[0] ?? ne,
    { from: ye, t: be }: RecoveredValue = te(A, O),
    j: RecoveredValue = (k && A.overview.segments?.[k]) || A.overview,
    xe: RecoveredValue = `${O}/${k ?? ``}`,
    Se: RecoveredValue = te(i_demo_clean_CThrR6ii(j.current), xe),
    M: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      p_demo_clean_CThrR6ii(ye ? e(ye) : 0, e(A), be),
    N: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = c_demo_clean_CThrR6ii(e(A) ?? []);
      return n.length >= 2 && n.length <= t ? n : ee_demo_clean_CThrR6ii(n, t);
    },
    Ce: RecoveredValue = O,
    P: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      t === void 0 || !Number.isFinite(t)
        ? `—`
        : e === `count`
          ? a_demo_clean_CThrR6ii(t)
          : formatMoney(t),
    [F, I]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)(null),
    [L, R]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)(null),
    [z, B]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)(null),
    V: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
          let n: RecoveredValue = t.currentTarget.getBoundingClientRect();
          e(Math.min(1, Math.max(0, (t.clientX - n.left) / n.width)));
        },
        n: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
          t.pointerType !== `mouse` && e(null);
        };
      return {
        onPointerDown: t,
        onPointerMove: t,
        onPointerUp: n,
        onPointerCancel: n,
        onPointerLeave: (): RecoveredValue => e(null),
      };
    },
    H: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
      r?: RecoveredValue,
      i?: RecoveredValue,
    ): RecoveredValue => {
      let a: RecoveredValue = t === null ? null : s_demo_clean_CThrR6ii(t, e),
        o: RecoveredValue = a ?? Math.max(0, e - 1);
      return {
        tabIndex: e > 0 ? 0 : -1,
        role: `slider`,
        "aria-label": r,
        "aria-valuemin": 0,
        "aria-valuemax": Math.max(0, e - 1),
        "aria-valuenow": o,
        "aria-valuetext": e > 0 ? i(o) : `No data`,
        onKeyDown: (t?: RecoveredValue): RecoveredValue => {
          if (e === 0) return;
          let r: RecoveredValue;
          if (t.key === `ArrowRight` || t.key === `ArrowUp`)
            r = a === null ? e - 1 : a + 1;
          else if (t.key === `ArrowLeft` || t.key === `ArrowDown`)
            r = a === null ? e - 1 : a - 1;
          else if (t.key === `Home`) r = 0;
          else if (t.key === `End`) r = e - 1;
          else if (t.key === `Escape` && a !== null) {
            (t.preventDefault(), n(null));
            return;
          } else return;
          (t.preventDefault(),
            (r = Math.max(0, Math.min(e - 1, r))),
            n(e > 1 ? r / (e - 1) : 0));
        },
        onBlur: (): RecoveredValue => n(null),
      };
    },
    we: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (ge(e), I(null), R(null), B(null), onRangeChange?.(e));
    },
    Te: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (ve(e), R(null), onSegmentChange?.(e));
    },
    U: RecoveredValue = N((): RecoveredValue => j.current, 72),
    W: RecoveredValue = N((): RecoveredValue => j.previous, 72),
    Ee: RecoveredValue = Math.max(...U, ...W, 1) * 1.06,
    De: RecoveredValue = u_demo_clean_CThrR6ii(Math.min(...U, ...W), 0.82),
    G: RecoveredValue = h(U, De, Ee),
    Oe: RecoveredValue = h(W, De, Ee),
    ke: RecoveredValue = p_demo_clean_CThrR6ii(
      Se.from ?? 0,
      i_demo_clean_CThrR6ii(j.current),
      Se.t,
    ),
    K: RecoveredValue = i_demo_clean_CThrR6ii(j.previous)
      ? ((i_demo_clean_CThrR6ii(j.current) - i_demo_clean_CThrR6ii(j.previous)) /
          i_demo_clean_CThrR6ii(j.previous)) *
        100
      : null,
    q: RecoveredValue = L === null ? null : s_demo_clean_CThrR6ii(L, j.current.length),
    J: RecoveredValue = q === null ? null : g(G.pts, q, j.current.length),
    Y: RecoveredValue = q === null ? null : g(Oe.pts, q, j.current.length),
    X: RecoveredValue = N((e?: RecoveredValue): RecoveredValue => e.focus.values, 48),
    Ae: RecoveredValue = Math.max(...X, 1) * 1.05,
    je: RecoveredValue = h(X, u_demo_clean_CThrR6ii(Math.min(...X), 0.8), Ae, 8, 92),
    Me: RecoveredValue = M(
      (e?: RecoveredValue): RecoveredValue => i_demo_clean_CThrR6ii(e.focus.values),
    ),
    Z: RecoveredValue = A.focus.previous
      ? ((i_demo_clean_CThrR6ii(A.focus.values) - A.focus.previous) / A.focus.previous) *
        100
      : null,
    Q: RecoveredValue =
      z === null ? null : s_demo_clean_CThrR6ii(z, A.focus.values.length),
    Ne: RecoveredValue = Q === null ? Me : A.focus.values[Q],
    Pe: RecoveredValue =
      Math.round(Ne) === 1 ? (A.focus.unitOne ?? le(A.focus.unit)) : A.focus.unit,
    $: RecoveredValue = Q === null ? null : g(je.pts, Q, A.focus.values.length);
  return (
    <div className={[`ui-kbc`, className].filter(Boolean).join(` `)}>
      <div className={`ui-kbc__bar`}>
        {title && (
          <h2 className={`ui-kbc__heading`} title={title}>
            {title}
          </h2>
        )}
        {ranges.length > 0 && (
          <ComponentCe
            label={`Date range`}
            value={O}
            options={ranges}
            icon={<ComponentOe />}
            onChange={we}
          />
        )}
      </div>
      {A.stats.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = N(
            (e?: RecoveredValue): RecoveredValue => e.stats[t]?.values,
            48,
          ),
          a: RecoveredValue = Math.max(...n, 1) * 1.08,
          o: RecoveredValue = h(
            n,
            u_demo_clean_CThrR6ii(Math.min(...n), 0.75),
            a,
            10,
            92,
          ),
          c: RecoveredValue = M(
            (e?: RecoveredValue): RecoveredValue =>
              i_demo_clean_CThrR6ii(e.stats[t]?.values ?? []),
          ),
          l: RecoveredValue =
            e.previous === void 0 ? null : i_demo_clean_CThrR6ii(e.values) - e.previous,
          f: RecoveredValue =
            F?.id === e.id ? s_demo_clean_CThrR6ii(F.at, e.values.length) : null,
          p: RecoveredValue = f === null ? null : g(o.pts, f, e.values.length);
        return (
          <section
            className={`ui-kbc__card ui-kbc__stat`}
            aria-label={e.label}
            style={
              {
                "--n": t,
              } as RecoveredValue
            }
            key={e.id}
          >
            <header className={`ui-kbc__row`}>
              <span className={`ui-kbc__pair`}>
                <b>{P(e.kind, c)}</b>
                <span title={e.label}>{e.label}</span>
              </span>
              {l !== null && (
                <span className={`ui-kbc__pair ui-kbc__pair--end`}>
                  {l === 0 ? (
                    <b>{`0`}</b>
                  ) : (
                    <ComponentV up={l > 0} good={e.lowerIsBetter ? l < 0 : l > 0}>
                      {P(e.kind, Math.abs(l))}
                    </ComponentV>
                  )}
                  <span title={compareLabel}>{compareLabel}</span>
                </span>
              )}
            </header>
            <div
              className={`ui-kbc__plot ui-kbc__plot--small`}
              {...V(
                (t?: RecoveredValue): RecoveredValue =>
                  I(
                    t === null
                      ? null
                      : {
                          id: e.id,
                          at: t,
                        },
                  ),
              )}
              {...H(
                e.values.length,
                F?.id === e.id ? F.at : null,
                (t?: RecoveredValue): RecoveredValue =>
                  I(
                    t === null
                      ? null
                      : {
                          id: e.id,
                          at: t,
                        },
                  ),
                `${e.label}, by day`,
                (t?: RecoveredValue): RecoveredValue =>
                  `${e.labels[t] ?? ``}: ${P(e.kind, e.values[t])}`,
              )}
            >
              <svg
                viewBox={`0 0 100 100`}
                preserveAspectRatio={`none`}
                aria-hidden={`true`}
                key={Ce}
              >
                <path className={`ui-kbc__fill`} d={o.area} fill={`url(#${D}-fade)`} />
                <path className={`ui-kbc__line`} d={o.line} />
              </svg>
              {p && f !== null && (
                <r_demo_clean_CThrR6ii.Fragment>
                  <span
                    className={`ui-kbc__rule`}
                    style={
                      {
                        left: `${p[0]}%`,
                        top: `${p[1]}%`,
                      } as RecoveredValue
                    }
                  />
                  <span
                    className={`ui-kbc__dot`}
                    style={
                      {
                        left: `${p[0]}%`,
                        top: `${p[1]}%`,
                      } as RecoveredValue
                    }
                  />
                  <span
                    ref={d_demo_clean_CThrR6ii(10) as RecoveredValue}
                    className={`ui-kbc__tag`}
                    data-side={p[0] > 62 ? `left` : `right`}
                    style={
                      {
                        left: `${p[0]}%`,
                        top: `${p[1]}%`,
                      } as RecoveredValue
                    }
                  >
                    <span>{e.labels[f]}</span>
                    <b>{P(e.kind, e.values[f])}</b>
                  </span>
                </r_demo_clean_CThrR6ii.Fragment>
              )}
            </div>
            <div className={`ui-kbc__axis`} aria-hidden={`true`}>
              <span>{e.labels[0]}</span>
              {e.labels.length > 1 && <span>{e.labels[e.labels.length - 1]}</span>}
              {p && f !== null && (
                <span
                  ref={d_demo_clean_CThrR6ii(0) as RecoveredValue}
                  className={`ui-kbc__axis-tag`}
                  style={
                    {
                      left: `${Math.min(88, Math.max(12, p[0]))}%`,
                    } as RecoveredValue
                  }
                >
                  {e.labels[f]}
                </span>
              )}
            </div>
          </section>
        );
      })}
      <section
        className={`ui-kbc__card ui-kbc__overview`}
        aria-label={A.overview.title}
        style={
          {
            "--n": 3,
          } as RecoveredValue
        }
      >
        <header className={`ui-kbc__row ui-kbc__row--top`}>
          <div className={`ui-kbc__head`}>
            <div className={`ui-kbc__label`} title={A.overview.title}>
              {A.overview.title}
            </div>
            <div className={`ui-kbc__figure`}>
              <b>{P(`money`, ke)}</b>
              {K !== null && (
                <span className={`ui-kbc__vs`}>
                  <ComponentV up={K >= 0} good={K >= 0}>
                    {l_demo_clean_CThrR6ii(K, 1)}
                    {`%`}
                  </ComponentV>
                  {` `}
                  <span className={`ui-kbc__vs-text`} title={compareLabel}>
                    {compareLabel}
                  </span>
                </span>
              )}
            </div>
          </div>
          {segments && segments.length > 0 && k && (
            <ComponentCe
              label={`Segment`}
              value={k}
              options={segments}
              icon={<ComponentSe />}
              onChange={Te}
            />
          )}
        </header>
        <div
          className={`ui-kbc__plot ui-kbc__plot--large`}
          {...V(R)}
          {...H(
            j.current.length,
            L,
            R,
            `${A.overview.title || `Overview`}, ${currentLabel} against ${previousLabel}`,
            (e?: RecoveredValue): RecoveredValue =>
              `${A.overview.labels[e] ?? ``}: ${currentLabel} ${P(`money`, j.current[e])}, ${previousLabel} ${P(`money`, j.previous[e] ?? 0)}`,
          )}
        >
          <svg
            viewBox={`0 0 100 100`}
            preserveAspectRatio={`none`}
            aria-hidden={`true`}
            key={xe}
          >
            <defs>
              <linearGradient id={`${D}-fade`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
                <stop
                  offset={`0`}
                  stopColor={`var(--ui-kbc-accent)`}
                  stopOpacity={`0.1`}
                />
                <stop offset={`1`} stopColor={`var(--ui-kbc-accent)`} stopOpacity={`0`} />
              </linearGradient>
            </defs>
            {[25, 50, 75].map(
              (e?: RecoveredValue): RecoveredValue => (
                <path className={`ui-kbc__grid`} d={`M0,${e}H100`} key={e} />
              ),
            )}
            <path d={G.area} fill={`url(#${D}-fade)`} />
            <path className={`ui-kbc__line ui-kbc__line--soft`} d={Oe.line} />
            <path className={`ui-kbc__line`} d={G.line} />
          </svg>
          {J && Y && q !== null && (
            <r_demo_clean_CThrR6ii.Fragment>
              <span
                className={`ui-kbc__rule`}
                style={
                  {
                    left: `${J[0]}%`,
                    top: 0,
                  } as RecoveredValue
                }
              />
              <span
                className={`ui-kbc__dot ui-kbc__dot--soft`}
                style={
                  {
                    left: `${Y[0]}%`,
                    top: `${Y[1]}%`,
                  } as RecoveredValue
                }
              />
              <span
                className={`ui-kbc__dot`}
                style={
                  {
                    left: `${J[0]}%`,
                    top: `${J[1]}%`,
                  } as RecoveredValue
                }
              />
              <div
                ref={d_demo_clean_CThrR6ii(14) as RecoveredValue}
                className={`ui-kbc__tip`}
                data-side={J[0] > 58 ? `left` : `right`}
                style={
                  {
                    left: `${J[0]}%`,
                    top: `${Math.min(J[1], Y[1])}%`,
                  } as RecoveredValue
                }
              >
                <div className={`ui-kbc__tip-head`}>
                  <span>{A.overview.labels[q]}</span>
                  <b>{P(`money`, j.current[q] + (j.previous[q] ?? 0))}</b>
                </div>
                <div className={`ui-kbc__tip-row`}>
                  <i />
                  <span>{currentLabel}</span>
                  <b>{P(`money`, j.current[q])}</b>
                </div>
                <div className={`ui-kbc__tip-row`} data-soft={``}>
                  <i />
                  <span>{previousLabel}</span>
                  <b>{P(`money`, j.previous[q] ?? 0)}</b>
                </div>
              </div>
            </r_demo_clean_CThrR6ii.Fragment>
          )}
        </div>
        <div className={`ui-kbc__axis`} aria-hidden={`true`}>
          <span>{A.overview.labels[0]}</span>
          {A.overview.labels.length > 1 && (
            <span>{A.overview.labels[A.overview.labels.length - 1]}</span>
          )}
        </div>
      </section>
      <section
        className={`ui-kbc__card ui-kbc__focus`}
        aria-label={A.focus.title}
        style={
          {
            "--n": 4,
          } as RecoveredValue
        }
      >
        <header className={`ui-kbc__row ui-kbc__row--top`}>
          <div className={`ui-kbc__product`}>
            <span className={`ui-kbc__icon`}>{icon ?? <ComponentAe />}</span>
            <span className={`ui-kbc__pair`}>
              <b title={A.focus.title}>{A.focus.title}</b>
              {A.focus.note && <span title={A.focus.note}>{A.focus.note}</span>}
            </span>
          </div>
          {setup && (
            <button type={`button`} className={`ui-kbc__setup`} onClick={setup.onClick}>
              <ComponentIe />
              <span title={setup.label}>{setup.label}</span>
            </button>
          )}
        </header>
        <div className={`ui-kbc__label`} title={A.focus.metric}>
          {A.focus.metric}
        </div>
        <div className={`ui-kbc__figure ui-kbc__figure--small`}>
          <b>
            {a_demo_clean_CThrR6ii(Ne)}
            {Pe ? ` ${Pe}` : ``}
          </b>
          {Q === null ? (
            Z !== null && (
              <span className={`ui-kbc__vs`}>
                <ComponentV up={Z >= 0} good={Z >= 0}>
                  {l_demo_clean_CThrR6ii(Z, 0)}
                  {`%`}
                </ComponentV>
                {` `}
                <span className={`ui-kbc__vs-text`} title={compareLabel}>
                  {compareLabel}
                </span>
              </span>
            )
          ) : (
            <span className={`ui-kbc__vs`}>{A.focus.labels[Q]}</span>
          )}
        </div>
        <div
          className={`ui-kbc__plot ui-kbc__plot--small`}
          {...V(B)}
          {...H(
            A.focus.values.length,
            z,
            B,
            `${A.focus.metric || A.focus.title}, by day`,
            (e?: RecoveredValue): RecoveredValue =>
              `${A.focus.labels[e] ?? ``}: ${a_demo_clean_CThrR6ii(A.focus.values[e])}${A.focus.unit ? ` ${Math.round(A.focus.values[e]) === 1 ? (A.focus.unitOne ?? le(A.focus.unit)) : A.focus.unit}` : ``}`,
          )}
        >
          <svg
            viewBox={`0 0 100 100`}
            preserveAspectRatio={`none`}
            aria-hidden={`true`}
            key={Ce}
          >
            <path className={`ui-kbc__fill`} d={je.area} fill={`url(#${D}-fade)`} />
            <path className={`ui-kbc__line`} d={je.line} />
          </svg>
          {$ && (
            <r_demo_clean_CThrR6ii.Fragment>
              <span
                className={`ui-kbc__rule`}
                style={
                  {
                    left: `${$[0]}%`,
                    top: `${$[1]}%`,
                  } as RecoveredValue
                }
              />
              <span
                className={`ui-kbc__dot`}
                style={
                  {
                    left: `${$[0]}%`,
                    top: `${$[1]}%`,
                  } as RecoveredValue
                }
              />
            </r_demo_clean_CThrR6ii.Fragment>
          )}
        </div>
        <div className={`ui-kbc__legend`}>
          <span>{previousLabel}</span>
          <b data-soft={``}>
            {a_demo_clean_CThrR6ii(
              M((e?: RecoveredValue): RecoveredValue => e.focus.previous),
            )}
          </b>
          <span>{currentLabel}</span>
          <b>{a_demo_clean_CThrR6ii(Me)}</b>
        </div>
        {action && (
          <button type={`button`} className={`ui-kbc__action`} onClick={action.onClick}>
            <span title={action.label}>{action.label}</span>
          </button>
        )}
      </section>
    </div>
  );
}
var y: RecoveredValue = 960,
  b: RecoveredValue = [
    {
      id: `7d`,
      label: `Last 7 days`,
    },
    {
      id: `30d`,
      label: `Last 30 days`,
    },
    {
      id: `90d`,
      label: `Last 90 days`,
    },
  ],
  x: RecoveredValue = [
    {
      id: `all`,
      label: `All items`,
    },
    {
      id: `pro`,
      label: `Pro`,
    },
    {
      id: `team`,
      label: `Team`,
    },
  ],
  S: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e;
    return (): RecoveredValue => ((t = (t * 9301 + 49297) % 233280), t / 233280);
  },
  C: RecoveredValue = [
    `Jan`,
    `Feb`,
    `Mar`,
    `Apr`,
    `May`,
    `Jun`,
    `Jul`,
    `Aug`,
    `Sep`,
    `Oct`,
    `Nov`,
    `Dec`,
  ],
  fe: RecoveredValue = new Date(2026, 9, 12),
  pe: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    Array.from(
      {
        length: e,
      },
      (n?: RecoveredValue, r?: RecoveredValue): RecoveredValue => {
        if (r === e - 1) return `Today`;
        let i: RecoveredValue = new Date(fe.getTime() - (e - 1 - r) * t * 864e5);
        return `${i.getDate()} ${C[i.getMonth()]}`;
      },
    ) as RecoveredValue[],
  w: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
    r?: RecoveredValue,
    i?: RecoveredValue,
  ): RecoveredValue => {
    let a: RecoveredValue = S(i),
      o: RecoveredValue = 0;
    return Array.from(
      {
        length: e,
      },
      (i?: RecoveredValue, s?: RecoveredValue): RecoveredValue => {
        let c: RecoveredValue = a();
        c > 0.22 && (o = o * 0.45 + (a() - 0.5) * r * 0.5);
        let l: RecoveredValue = c > 0.92 ? r * 0.22 : c < 0.06 ? -r * 0.18 : 0;
        return Math.max(0, Math.round(t * (1 + (n * s) / e + o + l)));
      },
    ) as RecoveredValue[];
  };
function T(
  e?: RecoveredValue,
  t?: RecoveredValue,
  n?: RecoveredValue,
  r?: RecoveredValue,
): RecoveredValue {
  let i: RecoveredValue = pe(e, t),
    a: RecoveredValue = w(e, 156 * t * n, 0.5, 0.5, r),
    o: RecoveredValue = w(e, 24 * t * n, 0.45, 0.5, r + 4);
  return {
    stats: [
      {
        id: `revenue`,
        label: `Total revenue`,
        kind: `money`,
        labels: i,
        values: a,
        previous: Math.round(
          a.reduce((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + t, 0) *
            0.83,
        ),
      },
      {
        id: `emails`,
        label: `Emails sent`,
        kind: `count`,
        labels: i,
        values: w(e, 1620 * t * n, 0.1, 0.7, r + 2),
        previous: Math.round(1540 * t * e * n),
      },
      {
        id: `refunds`,
        label: `Refunds`,
        kind: `count`,
        labels: i,
        values: w(e, Math.max(3, 4 * t) * n, -0.3, 1.5, r + 3),
        previous: Math.round(Math.max(3, 4 * t) * 1.2 * e * n),
        lowerIsBetter: !0,
      },
    ],
    overview: {
      title: `Sales overview`,
      labels: i,
      current: w(e, 122 * t * n, 0.9, 0.42, r + 1),
      previous: w(e, 98 * t * n, 0.45, 0.3, r + 7),
    },
    focus: {
      title: `Pro license`,
      note: `One-time`,
      metric: `Licenses sold`,
      unit: `licenses`,
      labels: i,
      values: o,
      previous: Math.round(
        o.reduce((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + t, 0) *
          0.89,
      ),
    },
  };
}
function E(e?: RecoveredValue, t?: RecoveredValue, n?: RecoveredValue): RecoveredValue {
  let r: RecoveredValue = T(e, t, 1, n),
    i: RecoveredValue = T(e, t, 0.64, n + 1).overview,
    a: RecoveredValue = T(e, t, 0.36, n + 2).overview;
  return {
    ...r,
    overview: {
      ...r.overview,
      segments: {
        pro: {
          current: i.current,
          previous: i.previous,
        },
        team: {
          current: a.current,
          previous: a.previous,
        },
      },
    },
  };
}
var me: RecoveredValue = {
  "7d": E(21, 1 / 3, 11),
  "30d": E(30, 1, 23),
  "90d": E(45, 2, 37),
};
function Runtime(): RecoveredValue {
  let e: RecoveredValue = (0, n_demo_clean_CThrR6ii.useRef)(null),
    [t, i]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)(null),
    [a, o]: RecoveredValue = (0, n_demo_clean_CThrR6ii.useState)(`30d`),
    s: RecoveredValue = (0, n_demo_clean_CThrR6ii.useRef)(!1);
  ((0, n_demo_clean_CThrR6ii.useLayoutEffect)((): RecoveredValue => {
    let t: RecoveredValue = e.current,
      n: RecoveredValue = t?.closest(`.card__preview`),
      r: RecoveredValue = n ?? t?.closest(`.stage`);
    if (!t || !r) return;
    let a: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = r.clientWidth;
      if (n)
        return i({
          scale: (e - 48) / y,
          card: !0,
        });
      if (e < 760) return i(null);
      i({
        scale: Math.min(0.82, (e - 168) / y),
        card: !1,
      });
    };
    a();
    let o: RecoveredValue = new ResizeObserver(a);
    return (o.observe(r), (): RecoveredValue => o.disconnect());
  }, []),
    (0, n_demo_clean_CThrR6ii.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = window.setInterval((): RecoveredValue => {
        s.current ||
          o(
            (e?: RecoveredValue): RecoveredValue =>
              b[
                (b.findIndex((t?: RecoveredValue): RecoveredValue => t.id === e) + 1) %
                  b.length
              ].id,
          );
      }, 3600);
      return (): RecoveredValue => window.clearInterval(e);
    }, []));
  let c: RecoveredValue = (): RecoveredValue => (s.current = !0);
  return (
    <div
      ref={e as RecoveredValue}
      className={`kb-demo`}
      data-fit={t ? (t.card ? `card` : `stage`) : void 0}
      onPointerEnter={c}
      onPointerDownCapture={c}
      onKeyDownCapture={c}
      onFocusCapture={c}
    >
      <div
        className={`kb-demo__frame`}
        style={
          (t
            ? t.card
              ? {
                  width: y,
                  transform: `scale(${t.scale})`,
                }
              : {
                  width: y,
                  zoom: t.scale,
                }
            : void 0) as RecoveredValue
        }
      >
        <ComponentUe
          data={me}
          ranges={b}
          range={a}
          onRangeChange={o}
          segments={x}
          compareLabel={`vs. last period`}
          title={`Dashboard`}
          setup={{
            label: `Set up`,
            onClick: (): RecoveredValue => {},
          }}
          action={{
            label: `See full analytics`,
            onClick: (): RecoveredValue => {},
          }}
        />
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
