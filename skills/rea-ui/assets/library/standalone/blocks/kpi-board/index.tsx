"use client";

import "./KpiBoard.css";
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
var n_demo_DjaPW4ei: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_DjaPW4ei: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_DjaPW4ei: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + (Number.isFinite(t) ? t : 0),
      0,
    ),
  a_demo_DjaPW4ei: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Number.isFinite(e)
      ? new Intl.NumberFormat(`en-US`, {
          maximumFractionDigits: 0,
        }).format(Math.round(e))
      : `—`,
  o_demo_DjaPW4ei: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    `${e < 0 ? `−` : ``}$${new Intl.NumberFormat(`en-US`, {
      minimumFractionDigits: Math.abs(e) < 1e4 ? 2 : 0,
      maximumFractionDigits: Math.abs(e) < 1e4 ? 2 : 0,
    }).format(Math.abs(e))}`,
  s_demo_DjaPW4ei: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => (t > 0 ? Math.round(e * (t - 1)) : null),
  c_demo_DjaPW4ei: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.map((e?: RecoveredValue): RecoveredValue => (Number.isFinite(e) ? e : 0)),
  l_demo_DjaPW4ei: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue =>
    new Intl.NumberFormat(`en-US`, {
      minimumFractionDigits: t,
      maximumFractionDigits: t,
    }).format(Math.abs(e)),
  u_demo_DjaPW4ei: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => (e < 0 ? e * (2 - t) : e * t),
  d_demo_DjaPW4ei: RecoveredValue =
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
      t.style.setProperty(`--ui-kb-dx`, `${s}px`);
    },
  f_demo_DjaPW4ei: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    1 - (1 - e) ** 4,
  p_demo_DjaPW4ei: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
  ): RecoveredValue => e + (t - e) * n,
  m_demo_DjaPW4ei: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function ee(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
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
            return p_demo_DjaPW4ei(e[a], e[o], i - a);
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
  let i: RecoveredValue = (0, n_demo_DjaPW4ei.useRef)(null),
    a: RecoveredValue = (0, n_demo_DjaPW4ei.useRef)(e),
    o: RecoveredValue = (0, n_demo_DjaPW4ei.useRef)(null),
    [s, c]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)({
      key: null,
      t: 0,
    });
  return (
    o.current !== t && (o.current !== null && (i.current = a.current), (o.current = t)),
    (a.current = e),
    (0, n_demo_DjaPW4ei.useEffect)((): RecoveredValue => {
      if (m_demo_DjaPW4ei())
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
            t: f_demo_DjaPW4ei(o),
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
  );
function ComponentOe({ up, good, children }: RecoveredValue): RecoveredValue {
  return (
    <span className={`ui-kb__change`} data-good={good ? `` : void 0}>
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
function ComponentSe({
  label,
  value,
  options,
  onChange,
}: RecoveredValue): RecoveredValue {
  let o: RecoveredValue = (0, n_demo_DjaPW4ei.useId)(),
    s: RecoveredValue = (0, n_demo_DjaPW4ei.useRef)(null),
    [c, l]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)(!1),
    [u, d]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)(0),
    f: RecoveredValue = Math.max(
      0,
      options.findIndex((e?: RecoveredValue): RecoveredValue => e.id === value),
    );
  (0, n_demo_DjaPW4ei.useEffect)((): RecoveredValue => {
    if (!c) return;
    let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      s.current?.contains(e.target) || l(!1);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      (): RecoveredValue => document.removeEventListener(`pointerdown`, e)
    );
  }, [c]);
  let p: RecoveredValue = (): RecoveredValue => {
      (d(f), l(!0));
    },
    m: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (l(!1),
        options[e] && options[e].id !== value && onChange(options[e].id),
        s.current?.querySelector(`button`)?.focus({
          preventScroll: !0,
        }));
    };
  return (
    <div
      ref={s as RecoveredValue}
      className={`ui-kb__pick`}
      data-open={c ? `` : void 0}
      onKeyDown={(e?: RecoveredValue): RecoveredValue => {
        if (!c) {
          (e.key === `ArrowDown` ||
            e.key === `ArrowUp` ||
            e.key === `Enter` ||
            e.key === ` `) &&
            (e.preventDefault(), p());
          return;
        }
        e.key === `Escape`
          ? (e.preventDefault(), e.stopPropagation(), l(!1))
          : e.key === `ArrowDown` || e.key === `ArrowUp`
            ? (e.preventDefault(),
              d(
                (t?: RecoveredValue): RecoveredValue =>
                  (t + (e.key === `ArrowDown` ? 1 : -1) + options.length) %
                  options.length,
              ))
            : e.key === `Home` || e.key === `End`
              ? (e.preventDefault(), d(e.key === `Home` ? 0 : options.length - 1))
              : e.key === `Enter` || e.key === ` `
                ? (e.preventDefault(), m(u))
                : e.key === `Tab` && l(!1);
      }}
    >
      <button
        type={`button`}
        className={`ui-kb__pick-button`}
        role={`combobox`}
        aria-label={label}
        aria-haspopup={`listbox`}
        aria-expanded={c}
        aria-controls={`${o}-list`}
        aria-activedescendant={c ? `${o}-${u}` : void 0}
        onClick={(): RecoveredValue => (c ? l(!1) : p())}
        onKeyUp={(e?: RecoveredValue): RecoveredValue =>
          e.key === ` ` && e.preventDefault()
        }
      >
        <span title={options[f]?.label}>{options[f]?.label}</span>
        <ComponentRe />
      </button>
      {c && (
        <ul
          id={`${o}-list`}
          className={`ui-kb__menu`}
          role={`listbox`}
          aria-label={label}
        >
          {options.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <li
                id={`${o}-${t}`}
                role={`option`}
                aria-selected={t === f}
                className={`ui-kb__option`}
                data-active={t === u ? `` : void 0}
                onPointerEnter={(): RecoveredValue => d(t)}
                onClick={(): RecoveredValue => m(t)}
                key={e.id}
              >
                <span title={e.label}>{e.label}</span>
                {t === f && <Component_ />}
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
var ce: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  e && /[^s]s$/i.test(e) && !/(us|is)$/i.test(e) ? e.slice(0, -1) : e;
function ComponentLe({
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
  formatMoney = o_demo_DjaPW4ei,
  icon,
  title,
  setup,
  action,
  className,
}: RecoveredValue): RecoveredValue {
  let E: RecoveredValue = (0, n_demo_DjaPW4ei.useId)().replace(/:/g, ``),
    [me, he]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)(
      defaultRange ?? ranges[0]?.id,
    ),
    D: RecoveredValue = range ?? me ?? ranges[0]?.id,
    [ge, _e]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)(
      defaultSegment ?? segments?.[0]?.id,
    ),
    O: RecoveredValue = segment ?? ge,
    k: RecoveredValue = data[D] ?? Object.values(data)[0] ?? ne,
    { from: ve, t: ye }: RecoveredValue = te(k, D),
    A: RecoveredValue = (O && k.overview.segments?.[O]) || k.overview,
    be: RecoveredValue = `${D}/${O ?? ``}`,
    xe: RecoveredValue = te(i_demo_DjaPW4ei(A.current), be),
    j: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      p_demo_DjaPW4ei(ve ? e(ve) : 0, e(k), ye),
    M: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = c_demo_DjaPW4ei(e(k) ?? []);
      return n.length >= 2 && n.length <= t ? n : ee(n, t);
    },
    Se: RecoveredValue = D,
    N: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      t === void 0 || !Number.isFinite(t)
        ? `—`
        : e === `count`
          ? a_demo_DjaPW4ei(t)
          : formatMoney(t),
    [P, F]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)(null),
    [I, L]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)(null),
    [R, z]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)(null),
    B: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
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
    V: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
      r?: RecoveredValue,
      i?: RecoveredValue,
    ): RecoveredValue => {
      let a: RecoveredValue = t === null ? null : s_demo_DjaPW4ei(t, e),
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
    Ce: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (he(e), F(null), L(null), z(null), onRangeChange?.(e));
    },
    we: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (_e(e), L(null), onSegmentChange?.(e));
    },
    H: RecoveredValue = M((): RecoveredValue => A.current, 72),
    U: RecoveredValue = M((): RecoveredValue => A.previous, 72),
    Te: RecoveredValue = Math.max(...H, ...U, 1) * 1.06,
    Ee: RecoveredValue = u_demo_DjaPW4ei(Math.min(...H, ...U), 0.82),
    W: RecoveredValue = h(H, Ee, Te),
    De: RecoveredValue = h(U, Ee, Te),
    Oe: RecoveredValue = p_demo_DjaPW4ei(xe.from ?? 0, i_demo_DjaPW4ei(A.current), xe.t),
    G: RecoveredValue = i_demo_DjaPW4ei(A.previous)
      ? ((i_demo_DjaPW4ei(A.current) - i_demo_DjaPW4ei(A.previous)) /
          i_demo_DjaPW4ei(A.previous)) *
        100
      : null,
    K: RecoveredValue = I === null ? null : s_demo_DjaPW4ei(I, A.current.length),
    q: RecoveredValue = K === null ? null : g(W.pts, K, A.current.length),
    J: RecoveredValue = K === null ? null : g(De.pts, K, A.current.length),
    Y: RecoveredValue = M((e?: RecoveredValue): RecoveredValue => e.focus.values, 48),
    ke: RecoveredValue = Math.max(...Y, 1) * 1.05,
    X: RecoveredValue = h(Y, u_demo_DjaPW4ei(Math.min(...Y), 0.8), ke, 8, 92),
    Ae: RecoveredValue = j(
      (e?: RecoveredValue): RecoveredValue => i_demo_DjaPW4ei(e.focus.values),
    ),
    Z: RecoveredValue = k.focus.previous
      ? ((i_demo_DjaPW4ei(k.focus.values) - k.focus.previous) / k.focus.previous) * 100
      : null,
    Q: RecoveredValue = R === null ? null : s_demo_DjaPW4ei(R, k.focus.values.length),
    je: RecoveredValue = Q === null ? Ae : k.focus.values[Q],
    Me: RecoveredValue =
      Math.round(je) === 1 ? (k.focus.unitOne ?? ce(k.focus.unit)) : k.focus.unit,
    $: RecoveredValue = Q === null ? null : g(X.pts, Q, k.focus.values.length);
  return (
    <div className={[`ui-kb`, className].filter(Boolean).join(` `)}>
      <div className={`ui-kb__bar`}>
        {title && (
          <h2 className={`ui-kb__heading`} title={title}>
            {title}
          </h2>
        )}
        {ranges.length > 0 && (
          <ComponentSe label={`Date range`} value={D} options={ranges} onChange={Ce} />
        )}
      </div>
      {k.stats.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = M(
            (e?: RecoveredValue): RecoveredValue => e.stats[t]?.values,
            48,
          ),
          a: RecoveredValue = Math.max(...n, 1) * 1.08,
          o: RecoveredValue = h(n, u_demo_DjaPW4ei(Math.min(...n), 0.75), a, 10, 92),
          c: RecoveredValue = j(
            (e?: RecoveredValue): RecoveredValue =>
              i_demo_DjaPW4ei(e.stats[t]?.values ?? []),
          ),
          l: RecoveredValue =
            e.previous === void 0 ? null : i_demo_DjaPW4ei(e.values) - e.previous,
          f: RecoveredValue =
            P?.id === e.id ? s_demo_DjaPW4ei(P.at, e.values.length) : null,
          p: RecoveredValue = f === null ? null : g(o.pts, f, e.values.length);
        return (
          <section
            className={`ui-kb__card ui-kb__stat`}
            aria-label={e.label}
            style={
              {
                "--n": t,
              } as RecoveredValue
            }
            key={e.id}
          >
            <header className={`ui-kb__row`}>
              <span className={`ui-kb__pair`}>
                <b>{N(e.kind, c)}</b>
                <span title={e.label}>{e.label}</span>
              </span>
              {l !== null && (
                <span className={`ui-kb__pair ui-kb__pair--end`}>
                  {l === 0 ? (
                    <b>{`0`}</b>
                  ) : (
                    <ComponentOe up={l > 0} good={e.lowerIsBetter ? l < 0 : l > 0}>
                      {N(e.kind, Math.abs(l))}
                    </ComponentOe>
                  )}
                  <span title={compareLabel}>{compareLabel}</span>
                </span>
              )}
            </header>
            <div
              className={`ui-kb__plot ui-kb__plot--small`}
              {...B(
                (t?: RecoveredValue): RecoveredValue =>
                  F(
                    t === null
                      ? null
                      : {
                          id: e.id,
                          at: t,
                        },
                  ),
              )}
              {...V(
                e.values.length,
                P?.id === e.id ? P.at : null,
                (t?: RecoveredValue): RecoveredValue =>
                  F(
                    t === null
                      ? null
                      : {
                          id: e.id,
                          at: t,
                        },
                  ),
                `${e.label}, by day`,
                (t?: RecoveredValue): RecoveredValue =>
                  `${e.labels[t] ?? ``}: ${N(e.kind, e.values[t])}`,
              )}
            >
              <svg
                viewBox={`0 0 100 100`}
                preserveAspectRatio={`none`}
                aria-hidden={`true`}
                key={Se}
              >
                <path className={`ui-kb__fill`} d={o.area} />
                <path className={`ui-kb__line`} d={o.line} />
              </svg>
              {p && f !== null && (
                <r_demo_DjaPW4ei.Fragment>
                  <span
                    className={`ui-kb__rule`}
                    style={
                      {
                        left: `${p[0]}%`,
                        top: `${p[1]}%`,
                      } as RecoveredValue
                    }
                  />
                  <span
                    className={`ui-kb__dot`}
                    style={
                      {
                        left: `${p[0]}%`,
                        top: `${p[1]}%`,
                      } as RecoveredValue
                    }
                  />
                  <span
                    ref={d_demo_DjaPW4ei(10) as RecoveredValue}
                    className={`ui-kb__tag`}
                    data-side={p[0] > 62 ? `left` : `right`}
                    style={
                      {
                        left: `${p[0]}%`,
                        top: `${p[1]}%`,
                      } as RecoveredValue
                    }
                  >
                    <span>{e.labels[f]}</span>
                    <b>{N(e.kind, e.values[f])}</b>
                  </span>
                </r_demo_DjaPW4ei.Fragment>
              )}
            </div>
            <div className={`ui-kb__axis`} aria-hidden={`true`}>
              <span>{e.labels[0]}</span>
              {e.labels.length > 1 && <span>{e.labels[e.labels.length - 1]}</span>}
              {p && f !== null && (
                <span
                  ref={d_demo_DjaPW4ei(0) as RecoveredValue}
                  className={`ui-kb__axis-tag`}
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
        className={`ui-kb__card ui-kb__overview`}
        aria-label={k.overview.title}
        style={
          {
            "--n": 3,
          } as RecoveredValue
        }
      >
        <header className={`ui-kb__row ui-kb__row--top`}>
          <div className={`ui-kb__head`}>
            <div className={`ui-kb__label`} title={k.overview.title}>
              {k.overview.title}
            </div>
            <div className={`ui-kb__figure`}>
              <b>{N(`money`, Oe)}</b>
              {G !== null && (
                <span className={`ui-kb__vs`}>
                  <i data-good={G >= 0 ? `` : void 0}>
                    {G >= 0 ? `+` : `−`}
                    {l_demo_DjaPW4ei(G, 1)}
                    {`%`}
                  </i>
                  {` `}
                  <span className={`ui-kb__vs-text`} title={compareLabel}>
                    {compareLabel}
                  </span>
                </span>
              )}
            </div>
          </div>
          {segments && segments.length > 0 && O && (
            <ComponentSe label={`Segment`} value={O} options={segments} onChange={we} />
          )}
        </header>
        <div
          className={`ui-kb__plot ui-kb__plot--large`}
          {...B(L)}
          {...V(
            A.current.length,
            I,
            L,
            `${k.overview.title || `Overview`}, ${currentLabel} against ${previousLabel}`,
            (e?: RecoveredValue): RecoveredValue =>
              `${k.overview.labels[e] ?? ``}: ${currentLabel} ${N(`money`, A.current[e])}, ${previousLabel} ${N(`money`, A.previous[e] ?? 0)}`,
          )}
        >
          <svg
            viewBox={`0 0 100 100`}
            preserveAspectRatio={`none`}
            aria-hidden={`true`}
            key={be}
          >
            <defs>
              <linearGradient id={`${E}-fade`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
                <stop
                  offset={`0`}
                  stopColor={`var(--ui-kb-accent)`}
                  stopOpacity={`0.14`}
                />
                <stop offset={`1`} stopColor={`var(--ui-kb-accent)`} stopOpacity={`0`} />
              </linearGradient>
            </defs>
            {
              Array.from(
                {
                  length: 19,
                },
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <path
                    className={`ui-kb__grid`}
                    d={`M${((t / 18) * 100).toFixed(2)},0V100`}
                    key={t}
                  />
                ),
              ) as RecoveredValue[]
            }
            <path d={W.area} fill={`url(#${E}-fade)`} />
            <path className={`ui-kb__line ui-kb__line--soft`} d={De.line} />
            <path className={`ui-kb__line`} d={W.line} />
          </svg>
          {q && J && K !== null && (
            <r_demo_DjaPW4ei.Fragment>
              <span
                className={`ui-kb__rule`}
                style={
                  {
                    left: `${q[0]}%`,
                    top: 0,
                  } as RecoveredValue
                }
              />
              <span
                className={`ui-kb__dot ui-kb__dot--soft`}
                style={
                  {
                    left: `${J[0]}%`,
                    top: `${J[1]}%`,
                  } as RecoveredValue
                }
              />
              <span
                className={`ui-kb__dot`}
                style={
                  {
                    left: `${q[0]}%`,
                    top: `${q[1]}%`,
                  } as RecoveredValue
                }
              />
              <div
                ref={d_demo_DjaPW4ei(14) as RecoveredValue}
                className={`ui-kb__tip`}
                data-side={q[0] > 58 ? `left` : `right`}
                style={
                  {
                    left: `${q[0]}%`,
                    top: `${Math.min(q[1], J[1])}%`,
                  } as RecoveredValue
                }
              >
                <div className={`ui-kb__tip-head`}>
                  <span>{k.overview.labels[K]}</span>
                  <b>{N(`money`, A.current[K] + (A.previous[K] ?? 0))}</b>
                </div>
                <div className={`ui-kb__tip-row`}>
                  <i />
                  <span>{currentLabel}</span>
                  <b>{N(`money`, A.current[K])}</b>
                </div>
                <div className={`ui-kb__tip-row`} data-soft={``}>
                  <i />
                  <span>{previousLabel}</span>
                  <b>{N(`money`, A.previous[K] ?? 0)}</b>
                </div>
              </div>
            </r_demo_DjaPW4ei.Fragment>
          )}
        </div>
        <div className={`ui-kb__axis`} aria-hidden={`true`}>
          <span>{k.overview.labels[0]}</span>
          {k.overview.labels.length > 1 && (
            <span>{k.overview.labels[k.overview.labels.length - 1]}</span>
          )}
        </div>
      </section>
      <section
        className={`ui-kb__card ui-kb__focus`}
        aria-label={k.focus.title}
        style={
          {
            "--n": 4,
          } as RecoveredValue
        }
      >
        <header className={`ui-kb__row ui-kb__row--top`}>
          <div className={`ui-kb__product`}>
            <span className={`ui-kb__icon`}>{icon ?? <ComponentAe />}</span>
            <span className={`ui-kb__pair`}>
              <b title={k.focus.title}>{k.focus.title}</b>
              {k.focus.note && <span title={k.focus.note}>{k.focus.note}</span>}
            </span>
          </div>
          {setup && (
            <button type={`button`} className={`ui-kb__setup`} onClick={setup.onClick}>
              <ComponentIe />
              <span title={setup.label}>{setup.label}</span>
            </button>
          )}
        </header>
        <div className={`ui-kb__label`} title={k.focus.metric}>
          {k.focus.metric}
        </div>
        <div className={`ui-kb__figure ui-kb__figure--small`}>
          <b>
            {a_demo_DjaPW4ei(je)}
            {Me ? ` ${Me}` : ``}
          </b>
          {Q === null ? (
            Z !== null && (
              <span className={`ui-kb__vs`}>
                <ComponentOe up={Z >= 0} good={Z >= 0}>
                  {l_demo_DjaPW4ei(Z, 0)}
                  {`%`}
                </ComponentOe>
                {` `}
                <span className={`ui-kb__vs-text`} title={compareLabel}>
                  {compareLabel}
                </span>
              </span>
            )
          ) : (
            <span className={`ui-kb__vs`}>{k.focus.labels[Q]}</span>
          )}
        </div>
        <div
          className={`ui-kb__plot ui-kb__plot--small`}
          {...B(z)}
          {...V(
            k.focus.values.length,
            R,
            z,
            `${k.focus.metric || k.focus.title}, by day`,
            (e?: RecoveredValue): RecoveredValue =>
              `${k.focus.labels[e] ?? ``}: ${a_demo_DjaPW4ei(k.focus.values[e])}${k.focus.unit ? ` ${Math.round(k.focus.values[e]) === 1 ? (k.focus.unitOne ?? ce(k.focus.unit)) : k.focus.unit}` : ``}`,
          )}
        >
          <svg
            viewBox={`0 0 100 100`}
            preserveAspectRatio={`none`}
            aria-hidden={`true`}
            key={Se}
          >
            <path className={`ui-kb__fill`} d={X.area} />
            <path className={`ui-kb__line`} d={X.line} />
          </svg>
          {$ && (
            <r_demo_DjaPW4ei.Fragment>
              <span
                className={`ui-kb__rule`}
                style={
                  {
                    left: `${$[0]}%`,
                    top: `${$[1]}%`,
                  } as RecoveredValue
                }
              />
              <span
                className={`ui-kb__dot`}
                style={
                  {
                    left: `${$[0]}%`,
                    top: `${$[1]}%`,
                  } as RecoveredValue
                }
              />
            </r_demo_DjaPW4ei.Fragment>
          )}
        </div>
        <div className={`ui-kb__legend`}>
          <span>{previousLabel}</span>
          <b data-soft={``}>
            {a_demo_DjaPW4ei(j((e?: RecoveredValue): RecoveredValue => e.focus.previous))}
          </b>
          <span>{currentLabel}</span>
          <b>{a_demo_DjaPW4ei(Ae)}</b>
        </div>
        {action && (
          <button type={`button`} className={`ui-kb__action`} onClick={action.onClick}>
            <span title={action.label}>{action.label}</span>
          </button>
        )}
      </section>
    </div>
  );
}
var v: RecoveredValue = 960,
  y: RecoveredValue = [
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
  b: RecoveredValue = [
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
  x: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e;
    return (): RecoveredValue => ((t = (t * 9301 + 49297) % 233280), t / 233280);
  },
  S: RecoveredValue = [
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
  de: RecoveredValue = new Date(2026, 9, 12),
  fe: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
    Array.from(
      {
        length: e,
      },
      (n?: RecoveredValue, r?: RecoveredValue): RecoveredValue => {
        if (r === e - 1) return `Today`;
        let i: RecoveredValue = new Date(de.getTime() - (e - 1 - r) * t * 864e5);
        return `${i.getDate()} ${S[i.getMonth()]}`;
      },
    ) as RecoveredValue[],
  C: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
    n?: RecoveredValue,
    r?: RecoveredValue,
    i?: RecoveredValue,
  ): RecoveredValue => {
    let a: RecoveredValue = x(i),
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
function w(
  e?: RecoveredValue,
  t?: RecoveredValue,
  n?: RecoveredValue,
  r?: RecoveredValue,
): RecoveredValue {
  let i: RecoveredValue = fe(e, t),
    a: RecoveredValue = C(e, 156 * t * n, 0.5, 0.5, r),
    o: RecoveredValue = C(e, 24 * t * n, 0.45, 0.5, r + 4);
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
        values: C(e, 1620 * t * n, 0.1, 0.7, r + 2),
        previous: Math.round(1540 * t * e * n),
      },
      {
        id: `refunds`,
        label: `Refunds`,
        kind: `count`,
        labels: i,
        values: C(e, Math.max(3, 4 * t) * n, -0.3, 1.5, r + 3),
        previous: Math.round(Math.max(3, 4 * t) * 1.2 * e * n),
        lowerIsBetter: !0,
      },
    ],
    overview: {
      title: `Sales overview`,
      labels: i,
      current: C(e, 122 * t * n, 0.9, 0.42, r + 1),
      previous: C(e, 98 * t * n, 0.45, 0.3, r + 7),
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
function T(e?: RecoveredValue, t?: RecoveredValue, n?: RecoveredValue): RecoveredValue {
  let r: RecoveredValue = w(e, t, 1, n),
    i: RecoveredValue = w(e, t, 0.64, n + 1).overview,
    a: RecoveredValue = w(e, t, 0.36, n + 2).overview;
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
var pe: RecoveredValue = {
  "7d": T(21, 1 / 3, 11),
  "30d": T(30, 1, 23),
  "90d": T(45, 2, 37),
};
function Runtime(): RecoveredValue {
  let e: RecoveredValue = (0, n_demo_DjaPW4ei.useRef)(null),
    [t, i]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)(null),
    [a, o]: RecoveredValue = (0, n_demo_DjaPW4ei.useState)(`30d`),
    s: RecoveredValue = (0, n_demo_DjaPW4ei.useRef)(!1);
  ((0, n_demo_DjaPW4ei.useLayoutEffect)((): RecoveredValue => {
    let t: RecoveredValue = e.current,
      n: RecoveredValue = t?.closest(`.card__preview`),
      r: RecoveredValue = n ?? t?.closest(`.stage`);
    if (!t || !r) return;
    let a: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = r.clientWidth;
      if (n)
        return i({
          scale: (e - 48) / v,
          card: !0,
        });
      if (e < 760) return i(null);
      i({
        scale: Math.min(0.82, (e - 168) / v),
        card: !1,
      });
    };
    a();
    let o: RecoveredValue = new ResizeObserver(a);
    return (o.observe(r), (): RecoveredValue => o.disconnect());
  }, []),
    (0, n_demo_DjaPW4ei.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = window.setInterval((): RecoveredValue => {
        s.current ||
          o(
            (e?: RecoveredValue): RecoveredValue =>
              y[
                (y.findIndex((t?: RecoveredValue): RecoveredValue => t.id === e) + 1) %
                  y.length
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
                  width: v,
                  transform: `scale(${t.scale})`,
                }
              : {
                  width: v,
                  zoom: t.scale,
                }
            : void 0) as RecoveredValue
        }
      >
        <ComponentLe
          data={pe}
          ranges={y}
          range={a}
          onRangeChange={o}
          segments={b}
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
