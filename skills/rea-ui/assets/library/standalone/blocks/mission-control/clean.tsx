"use client";

import "./MissionControl.clean.css";
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
var n_component_clean_BiWEZ0TY: RecoveredValue = t_react_BkAXpnfr(),
  r_component_clean_BiWEZ0TY: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_clean_BiWEZ0TY: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e instanceof Date ? e.getTime() : typeof e == `number` ? e : new Date(e).getTime(),
  a_component_clean_BiWEZ0TY: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    let n: RecoveredValue = Math.max(0, Math.round((t - e) / 6e4)),
      r: RecoveredValue = Math.floor(n / 60);
    return r ? `${r}h ${n % 60 ? `${n % 60}m` : ``}`.trim() : `${n}m`;
  },
  o_component_clean_BiWEZ0TY: RecoveredValue = {
    needs: `Nothing needs you`,
    failed: `Nothing failed`,
    done: `Nothing done yet`,
  },
  s_component_clean_BiWEZ0TY: RecoveredValue = [
    {
      kind: `needs`,
      label: `Needs you`,
    },
    {
      kind: `failed`,
      label: `Failed`,
    },
    {
      kind: `done`,
      label: `Done`,
    },
  ],
  c_component_clean_BiWEZ0TY: RecoveredValue = 1e3,
  l_component_clean_BiWEZ0TY: RecoveredValue = 100,
  u_component_clean_BiWEZ0TY: RecoveredValue = 120,
  d_component_clean_BiWEZ0TY: RecoveredValue = 0.022,
  f_component_clean_BiWEZ0TY: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.kind === `done` ? 0.7 + Math.log10((e.count ?? 1) + 1) * 0.45 : 1.05;
function p_component_clean_BiWEZ0TY(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = (t?: RecoveredValue): RecoveredValue =>
      e.reduce(
        (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
          e +
          n.w *
            Math.exp(
              -((t - n.t) ** 2) /
                (2 * d_component_clean_BiWEZ0TY * d_component_clean_BiWEZ0TY),
            ),
        0,
      ) + 0.04,
    n: RecoveredValue = Array.from(
      {
        length: 121,
      },
      (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
        t(n / u_component_clean_BiWEZ0TY),
    ) as RecoveredValue[],
    r: RecoveredValue = Math.max(...n, 0.2),
    i: RecoveredValue = (e?: RecoveredValue): RecoveredValue => 98 - (e / r) * 84,
    a: RecoveredValue = n.map(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => [
        (t / u_component_clean_BiWEZ0TY) * c_component_clean_BiWEZ0TY,
        i(e),
      ],
    ),
    o: RecoveredValue = `M ${a[0][0]} ${a[0][1]}`;
  for (let e: RecoveredValue = 0; e < a.length - 1; e++) {
    let t: RecoveredValue = a[Math.max(0, e - 1)],
      [n, r]: RecoveredValue = a[e],
      [i, s]: RecoveredValue = a[e + 1],
      c: RecoveredValue = a[Math.min(a.length - 1, e + 2)];
    o += ` C ${n + (i - t[0]) / 6} ${r + (s - t[1]) / 6}, ${i - (c[0] - n) / 6} ${s - (c[1] - r) / 6}, ${i} ${s}`;
  }
  return {
    line: o,
    area: `${o} L ${c_component_clean_BiWEZ0TY} ${l_component_clean_BiWEZ0TY} L 0 ${l_component_clean_BiWEZ0TY} Z`,
    yAt: (e?: RecoveredValue): RecoveredValue => i(t(e)) / l_component_clean_BiWEZ0TY,
  };
}
function ComponentN({
  events,
  since,
  until,
  title = `While you were away`,
  onAction,
  onUndo,
  onRedo,
  limit = 3,
  board = !0,
  replay = 1800,
  locale,
  onHover,
  className,
}: RecoveredValue): RecoveredValue {
  let w: RecoveredValue =
      `ui-rcp` + (0, n_component_clean_BiWEZ0TY.useId)().replace(/[^a-zA-Z0-9_-]/g, ``),
    T: RecoveredValue = i_component_clean_BiWEZ0TY(since),
    [E]: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useState)(
      (): RecoveredValue => Date.now(),
    ),
    D: RecoveredValue = until === void 0 ? E : i_component_clean_BiWEZ0TY(until),
    O: RecoveredValue = Math.max(1, D - T),
    k: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useMemo)(
      (): RecoveredValue =>
        new Intl.DateTimeFormat(locale, {
          hour: `numeric`,
          minute: `2-digit`,
        }),
      [locale],
    ),
    A: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useMemo)(
      (): RecoveredValue =>
        events
          .filter(
            (e?: RecoveredValue): RecoveredValue =>
              Number.isFinite(i_component_clean_BiWEZ0TY(e.at)),
          )
          .map(
            (e?: RecoveredValue): RecoveredValue => ({
              e,
              t: Math.min(1, Math.max(0, (i_component_clean_BiWEZ0TY(e.at) - T) / O)),
            }),
          )
          .sort((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e.t - t.t),
      [events, T, O],
    ),
    j: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useMemo)(
      (): RecoveredValue =>
        p_component_clean_BiWEZ0TY(
          A.map(
            ({ e, t }: RecoveredValue): RecoveredValue => ({
              t,
              w: f_component_clean_BiWEZ0TY(e),
            }),
          ),
        ),
      [A],
    ),
    [M, N]: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useState)(replay > 0 ? 0 : 1);
  (0, n_component_clean_BiWEZ0TY.useEffect)((): RecoveredValue => {
    if (replay <= 0 || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)
      return N(1);
    let e: RecoveredValue = 0,
      t: RecoveredValue = performance.now(),
      n: RecoveredValue = (r?: RecoveredValue): RecoveredValue => {
        let i: RecoveredValue = Math.min(1, (r - t) / replay);
        (N(1 - (1 - i) ** 3), i < 1 && (e = requestAnimationFrame(n)));
      };
    e = requestAnimationFrame(n);
    let r: RecoveredValue = window.setTimeout((): RecoveredValue => N(1), replay + 150);
    return (): RecoveredValue => {
      (cancelAnimationFrame(e), window.clearTimeout(r));
    };
  }, [replay]);
  let [P, ne]: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useState)({}),
    [F, I]: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useState)(null),
    L: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useRef)(onHover);
  ((L.current = onHover),
    (0, n_component_clean_BiWEZ0TY.useEffect)((): RecoveredValue => {
      L.current?.(
        F
          ? (events.find((e?: RecoveredValue): RecoveredValue => e.id === F) ?? null)
          : null,
      );
    }, [F]));
  let [R, z]: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useState)(null),
    B: RecoveredValue = (e?: RecoveredValue): RecoveredValue => P[e] ?? `open`,
    V: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      ne(
        (n?: RecoveredValue): RecoveredValue => ({
          ...n,
          [e]: t,
        }),
      ),
    H: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useRef)(null),
    U: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useRef)(null),
    [re, W]: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useState)(``),
    G: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
      r?: RecoveredValue,
    ): RecoveredValue => {
      ((U.current = {
        id: e.id,
        to: n,
      }),
        V(e.id, t),
        W(r));
    };
  (0, n_component_clean_BiWEZ0TY.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = U.current,
      t: RecoveredValue = H.current;
    if (!e || !t) return;
    let n: RecoveredValue = t.querySelector(
      `[data-card-id="${CSS.escape(e.id)}"] [data-focus="${e.to}"]`,
    );
    if (!n) return;
    U.current = null;
    let r: RecoveredValue = document.activeElement as HTMLElement;
    (!r || r === document.body || t.contains(r)) && n.focus();
  });
  let K: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e.kind === `failed` ? `Retry` : (e.action ?? `Approve`),
    q: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e.kind === `failed` ? `Fixed` : (e.doneLabel ?? `Done`),
    J: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      if (t === `review`) return void onAction?.(e, `review`);
      let n: RecoveredValue = onAction?.(e, `primary`);
      n && typeof n.then == `function`
        ? ((U.current = null),
          V(e.id, `working`),
          W(`${e.kind === `failed` ? `Retrying` : `Working on`}: ${e.title}`),
          n.then(
            (): RecoveredValue => G(e, `resolved`, `undo`, `${q(e)}: ${e.title}`),
            (): RecoveredValue => G(e, `open`, `main`, `Didn't work: ${e.title}`),
          ))
        : G(e, `resolved`, `undo`, `${q(e)}: ${e.title}`);
    },
    Y: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (G(
        e,
        e.kind === `done` ? `undone` : `open`,
        e.kind === `done` ? `redo` : `main`,
        `Undone: ${e.title}`,
      ),
        onUndo?.(e));
    },
    ie: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (G(e, `open`, `undo`, `Redone: ${e.title}`), onRedo?.(e));
    },
    X: RecoveredValue = (e?: RecoveredValue): RecoveredValue => e <= M + 1e-4,
    Z: RecoveredValue = A.filter((e?: RecoveredValue): RecoveredValue => X(e.t)),
    Q: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      Z.filter(
        (t?: RecoveredValue): RecoveredValue =>
          t.e.kind === e && B(t.e.id) !== `resolved`,
      ).length,
    ae: RecoveredValue = {
      done: Z.filter(
        (e?: RecoveredValue): RecoveredValue =>
          (e.e.kind === `done` && B(e.e.id) !== `undone`) || B(e.e.id) === `resolved`,
      ).length,
      needs: Q(`needs`),
      failed: Q(`failed`),
    },
    $: RecoveredValue = F
      ? A.find((e?: RecoveredValue): RecoveredValue => e.e.id === F)
      : void 0,
    oe: RecoveredValue = (0, n_component_clean_BiWEZ0TY.useMemo)((): RecoveredValue => {
      let e: RecoveredValue = [],
        t: RecoveredValue = new Date(T);
      for (
        t.setMinutes(0, 0, 0), t.setHours(t.getHours() + 1);
        t.getTime() < D;
        t.setHours(t.getHours() + 1)
      )
        e.push((t.getTime() - T) / O);
      return e;
    }, [T, D, O]);
  return (
    <section
      ref={H as RecoveredValue}
      className={[`ui-rcp`, className].filter(Boolean).join(` `)}
      style={
        {
          "--ui-rcp-limit": limit,
        } as RecoveredValue
      }
      aria-label={title}
    >
      <p className={`ui-rcp__sr`} aria-live={`polite`}>
        {re}
      </p>
      <header className={`ui-rcp__head`}>
        <div>
          <h2 className={`ui-rcp__title`}>{title}</h2>
          <p className={`ui-rcp__since`}>
            {`Since `}
            {k.format(T)}
            <span className={`ui-rcp__pill`}>{a_component_clean_BiWEZ0TY(T, D)}</span>
          </p>
        </div>
        <ul className={`ui-rcp__counts`} aria-label={`Summary`}>
          {[`done`, `needs`, `failed`].map(
            (e?: RecoveredValue): RecoveredValue => (
              <li data-kind={e} key={e}>
                <ComponentH kind={e} />
                <b>{ae[e]}</b>
                {` `}
                {e === `needs` ? `need you` : e}
              </li>
            ),
          )}
        </ul>
      </header>
      <div
        className={`ui-rcp__chart`}
        aria-hidden={`true`}
        onPointerMove={(e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = e.currentTarget.getBoundingClientRect(),
            n: RecoveredValue = Math.min(1, Math.max(0, (e.clientX - t.left) / t.width)),
            r: RecoveredValue = A.reduce(
              (e: RecoveredValue, { e: t, t: r }: RecoveredValue): RecoveredValue =>
                Math.abs(r - n) < 0.025 && (!e || Math.abs(r - n) < Math.abs(e.t - n))
                  ? {
                      id: t.id,
                      t: r,
                    }
                  : e,
              null,
            );
          (z(r ? r.t : n), I(r ? r.id : null));
        }}
        onPointerLeave={(): RecoveredValue => {
          (z(null), I(null));
        }}
      >
        <svg
          viewBox={`0 0 ${c_component_clean_BiWEZ0TY} ${l_component_clean_BiWEZ0TY}`}
          preserveAspectRatio={`none`}
        >
          <defs>
            <linearGradient id={`${w}-fade`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
              <stop offset={`0`} stopColor={`var(--ui-rcp-area)`} stopOpacity={`1`} />
              <stop offset={`1`} stopColor={`var(--ui-rcp-area)`} stopOpacity={`0`} />
            </linearGradient>
            <clipPath id={`${w}-clip`}>
              <rect
                x={`0`}
                y={`0`}
                width={M * c_component_clean_BiWEZ0TY}
                height={l_component_clean_BiWEZ0TY}
              />
            </clipPath>
          </defs>
          <g className={`ui-rcp__grid`}>
            {[0.25, 0.5, 0.75].map(
              (e?: RecoveredValue): RecoveredValue => (
                <line
                  x1={`0`}
                  x2={c_component_clean_BiWEZ0TY}
                  y1={e * l_component_clean_BiWEZ0TY}
                  y2={e * l_component_clean_BiWEZ0TY}
                  vectorEffect={`non-scaling-stroke`}
                  key={e}
                />
              ),
            )}
            {oe.map(
              (e?: RecoveredValue): RecoveredValue => (
                <line
                  x1={e * c_component_clean_BiWEZ0TY}
                  x2={e * c_component_clean_BiWEZ0TY}
                  y1={`0`}
                  y2={l_component_clean_BiWEZ0TY}
                  vectorEffect={`non-scaling-stroke`}
                  key={e}
                />
              ),
            )}
          </g>
          <g clipPath={`url(#${w}-clip)`}>
            <path className={`ui-rcp__area`} d={j.area} fill={`url(#${w}-fade)`} />
            <path
              className={`ui-rcp__line`}
              d={j.line}
              vectorEffect={`non-scaling-stroke`}
            />
          </g>
        </svg>
        <span className={`ui-rcp__frame`} />
        {R !== null && (
          <span
            className={`ui-rcp__cursor`}
            style={
              {
                left: `${R * 100}%`,
              } as RecoveredValue
            }
          />
        )}
        {A.map(
          ({ e, t }: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
            <span
              className={`ui-rcp__dot`}
              data-kind={B(e.id) === `resolved` ? `done` : e.kind}
              data-on={X(t) || void 0}
              data-hot={F === e.id || void 0}
              style={
                {
                  left: `${t * 100}%`,
                  top: `${j.yAt(t) * 100}%`,
                } as RecoveredValue
              }
              onPointerEnter={(): RecoveredValue => I(e.id)}
              onPointerLeave={(): RecoveredValue => I(null)}
              key={`${e.id}:${n}`}
            />
          ),
        )}
        {$ && (
          <span
            className={`ui-rcp__tip`}
            style={
              {
                left: `${$.t * 100}%`,
                top: `${j.yAt($.t) * 100}%`,
              } as RecoveredValue
            }
            data-edge={$.t < 0.15 ? `start` : $.t > 0.85 ? `end` : void 0}
          >
            {k.format(i_component_clean_BiWEZ0TY($.e.at))}
            {` · `}
            {$.e.title}
          </span>
        )}
      </div>
      <div className={`ui-rcp__ends`} aria-hidden={`true`}>
        <span>{k.format(T)}</span>
        <span>{k.format(D)}</span>
      </div>
      {board && (
        <div className={`ui-rcp__board`}>
          {s_component_clean_BiWEZ0TY.map(
            ({ kind, label }: RecoveredValue): RecoveredValue => {
              let n: RecoveredValue = A.filter(
                  (t?: RecoveredValue): RecoveredValue => t.e.kind === kind,
                ),
                a: RecoveredValue = n.slice(0, limit),
                s: RecoveredValue = n.filter(
                  (e?: RecoveredValue): RecoveredValue =>
                    ![`resolved`, `undone`].includes(B(e.e.id)),
                ).length;
              return (
                <div className={`ui-rcp__lane`} data-kind={kind} key={kind}>
                  <h3 className={`ui-rcp__lane-head`}>
                    <span>
                      <ComponentH kind={kind} />
                      {label}
                    </span>
                    <span
                      className={`ui-rcp__lane-n`}
                      title={
                        n.length > a.length
                          ? `Showing ${a.length} of ${n.length}`
                          : void 0
                      }
                    >
                      {s}
                    </span>
                  </h3>
                  <ul className={`ui-rcp__cards`}>
                    {a.length === 0 && (
                      <li className={`ui-rcp__empty`}>
                        {o_component_clean_BiWEZ0TY[kind]}
                      </li>
                    )}
                    {a.map(
                      (
                        { e: t, t: n }: RecoveredValue,
                        a?: RecoveredValue,
                      ): RecoveredValue => {
                        let o: RecoveredValue = B(t.id);
                        return (
                          <li
                            className={`ui-rcp__card`}
                            data-card-id={t.id}
                            onFocus={(): RecoveredValue => I(t.id)}
                            onBlur={(e?: RecoveredValue): RecoveredValue =>
                              !e.currentTarget.contains(e.relatedTarget) && I(null)
                            }
                            data-kind={kind}
                            data-state={o}
                            data-seen={X(n) || void 0}
                            data-hot={F === t.id || void 0}
                            onPointerEnter={(): RecoveredValue => I(t.id)}
                            onPointerLeave={(): RecoveredValue => I(null)}
                            key={`${t.id}:${a}`}
                          >
                            <span className={`ui-rcp__card-top`}>
                              <span className={`ui-rcp__mark`} aria-hidden={`true`}>
                                {o === `resolved` ? (
                                  <ComponentEe />
                                ) : (
                                  (t.logo ??
                                  (
                                    Array.from(t.title.trim()) as RecoveredValue[]
                                  )[0]?.toUpperCase())
                                )}
                              </span>
                              <span className={`ui-rcp__card-title`} title={t.title}>
                                {t.title}
                              </span>
                            </span>
                            <span className={`ui-rcp__card-meta`}>
                              <span className={`ui-rcp__detail`} title={t.detail}>
                                {t.detail}
                              </span>
                              {kind === `done` && t.count !== void 0 && (
                                <span
                                  className={`ui-rcp__tag`}
                                  title={
                                    t.count >= 1e4
                                      ? t.count.toLocaleString(locale)
                                      : void 0
                                  }
                                >
                                  {new Intl.NumberFormat(
                                    locale,
                                    t.count >= 1e4
                                      ? {
                                          notation: `compact`,
                                          maximumFractionDigits: 1,
                                        }
                                      : {},
                                  ).format(t.count)}
                                </span>
                              )}
                              <time
                                className={`ui-rcp__time`}
                                dateTime={new Date(
                                  i_component_clean_BiWEZ0TY(t.at),
                                ).toISOString()}
                              >
                                {k.format(i_component_clean_BiWEZ0TY(t.at))}
                              </time>
                            </span>
                            {kind === `done` ? (
                              <span className={`ui-rcp__card-foot`}>
                                <span className={`ui-rcp__status`}>
                                  <span
                                    className={`ui-rcp__state`}
                                    data-off={o === `undone` || void 0}
                                  >
                                    {o === `undone` ? `Undone` : `Done`}
                                  </span>
                                </span>
                                <button
                                  type={`button`}
                                  className={`ui-rcp__btn`}
                                  data-focus={o === `undone` ? `redo` : `undo`}
                                  aria-label={`${o === `undone` ? `Redo` : `Undo`}: ${t.title}`}
                                  onClick={(): RecoveredValue =>
                                    o === `undone` ? ie(t) : Y(t)
                                  }
                                >
                                  {o === `undone` ? `Redo` : `Undo`}
                                </button>
                              </span>
                            ) : (
                              <span className={`ui-rcp__card-foot`}>
                                {o === `resolved` ? (
                                  <r_component_clean_BiWEZ0TY.Fragment>
                                    <span className={`ui-rcp__status`}>
                                      <span className={`ui-rcp__state`}>{q(t)}</span>
                                    </span>
                                    <button
                                      type={`button`}
                                      className={`ui-rcp__btn`}
                                      data-focus={`undo`}
                                      aria-label={`Undo: ${t.title}`}
                                      onClick={(): RecoveredValue => Y(t)}
                                    >{`Undo`}</button>
                                  </r_component_clean_BiWEZ0TY.Fragment>
                                ) : (
                                  <r_component_clean_BiWEZ0TY.Fragment>
                                    <span
                                      className={`ui-rcp__status`}
                                      data-working={o === `working` || void 0}
                                    >
                                      {o === `working`
                                        ? kind === `failed`
                                          ? `Retrying…`
                                          : `Working…`
                                        : ``}
                                    </span>
                                    {kind === `needs` && (
                                      <button
                                        type={`button`}
                                        className={`ui-rcp__btn`}
                                        disabled={o === `working`}
                                        aria-label={`Review: ${t.title}`}
                                        onClick={(): RecoveredValue => J(t, `review`)}
                                      >{`Review`}</button>
                                    )}
                                    <button
                                      type={`button`}
                                      className={`ui-rcp__btn ui-rcp__btn--main`}
                                      data-focus={`main`}
                                      disabled={o === `working`}
                                      aria-label={`${K(t)}: ${t.title}`}
                                      onClick={(): RecoveredValue => J(t, `primary`)}
                                    >
                                      {o === `working` && (
                                        <span
                                          className={`ui-rcp__spin`}
                                          aria-hidden={`true`}
                                        />
                                      )}
                                      <span className={`ui-rcp__btn-label`}>{K(t)}</span>
                                    </button>
                                  </r_component_clean_BiWEZ0TY.Fragment>
                                )}
                              </span>
                            )}
                          </li>
                        );
                      },
                    )}
                  </ul>
                </div>
              );
            },
          )}
        </div>
      )}
    </section>
  );
}
function ComponentH({ kind }: RecoveredValue): RecoveredValue {
  return (
    <svg
      className={`ui-rcp__kind`}
      data-kind={kind}
      viewBox={`0 0 16 16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.4`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      {kind === `needs` && (
        <r_component_clean_BiWEZ0TY.Fragment>
          <circle cx={`8`} cy={`5.25`} r={`2.5`} />
          <path d={`M3.25 13.25c.6-2.35 2.45-3.75 4.75-3.75s4.15 1.4 4.75 3.75`} />
        </r_component_clean_BiWEZ0TY.Fragment>
      )}
      {kind === `failed` && (
        <r_component_clean_BiWEZ0TY.Fragment>
          <path
            d={`M7.13 2.75a1 1 0 0 1 1.74 0l5.2 9.25a1 1 0 0 1-.87 1.5H2.8a1 1 0 0 1-.87-1.5z`}
          />
          <path d={`M8 6.5v2.75M8 11.25v.01`} />
        </r_component_clean_BiWEZ0TY.Fragment>
      )}
      {kind === `done` && (
        <r_component_clean_BiWEZ0TY.Fragment>
          <circle cx={`8`} cy={`8`} r={`5.75`} />
          <path d={`m5.6 8.2 1.6 1.6 3.2-3.4`} />
        </r_component_clean_BiWEZ0TY.Fragment>
      )}
    </svg>
  );
}
function ComponentEe(): RecoveredValue {
  return (
    <svg
      viewBox={`0 0 16 16`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path d={`m4 8.25 2.75 2.75L12 5.5`} />
    </svg>
  );
}
var n_component_clean_B8Gpajnz: RecoveredValue = t_react_BkAXpnfr(),
  r_component_clean_B8Gpajnz: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_clean_B8Gpajnz: RecoveredValue = {
    queued: `Queued`,
    running: `Running`,
    waiting: `Needs you`,
    done: `Done`,
    failed: `Failed`,
    stopped: `Stopped`,
  },
  a_component_clean_B8Gpajnz: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e < 0
      ? `-${a_component_clean_B8Gpajnz(-e)}`
      : e > 0 && e < 0.005
        ? `<$0.01`
        : `$${e < 10 ? e.toFixed(2) : Math.round(e).toLocaleString(`en-US`)}`,
  o_component_clean_B8Gpajnz: RecoveredValue = new Intl.NumberFormat(`en-US`),
  s_component_clean_B8Gpajnz: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = Math.max(0, Math.round(e / 1e3));
    if (t < 60) return `${t}s`;
    let n: RecoveredValue = Math.floor(t / 60);
    if (n < 60) return `${n}m ${String(t % 60).padStart(2, `0`)}s`;
    let r: RecoveredValue = Math.floor(n / 60);
    return r < 24
      ? `${r}h ${String(n % 60).padStart(2, `0`)}m`
      : `${Math.floor(r / 24)}d ${r % 24}h`;
  },
  c_component_clean_B8Gpajnz: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
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
  l_component_clean_B8Gpajnz: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
    e,
    ...(e.children ?? []).flatMap(l_component_clean_B8Gpajnz),
  ],
  u_component_clean_B8Gpajnz: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    (e.cost ?? 0) +
    (e.children ?? []).reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + u_component_clean_B8Gpajnz(t),
      0,
    ),
  d_component_clean_B8Gpajnz: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  f_component_clean_B8Gpajnz: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e === `queued` || e === `stopped`,
  p_component_clean_B8Gpajnz: RecoveredValue = (
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
  ee: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = l_component_clean_B8Gpajnz(e).slice(1);
    if (!t.length)
      return {
        text: `No sub-agents`,
      };
    let n: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      t.filter((t?: RecoveredValue): RecoveredValue => t.status === e).length;
    return n(`waiting`)
      ? {
          text: `${o_component_clean_B8Gpajnz.format(n(`waiting`))} needs you`,
          kind: `waiting`,
        }
      : n(`failed`)
        ? {
            text: `${o_component_clean_B8Gpajnz.format(n(`failed`))} failed`,
            kind: `failed`,
          }
        : n(`running`)
          ? {
              text: `${o_component_clean_B8Gpajnz.format(n(`running`))}/${o_component_clean_B8Gpajnz.format(t.length)} running`,
              kind: `running`,
            }
          : n(`done`) === t.length
            ? {
                text:
                  t.length === 1
                    ? `Done`
                    : `All ${o_component_clean_B8Gpajnz.format(t.length)} done`,
              }
            : {
                text:
                  t.length === 1
                    ? `1 sub-agent`
                    : `${o_component_clean_B8Gpajnz.format(t.length)} sub-agents`,
              };
  },
  ComponentTe: RecoveredValue = (): RecoveredValue => (
    <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
      <path
        d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
        fill={`currentColor`}
      />
      <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
    </svg>
  ),
  ComponentNe: RecoveredValue = ({ status }: RecoveredValue): RecoveredValue =>
    status === `running` ? (
      <svg
        className={`ui-agfc__spin`}
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
  m: RecoveredValue = 220,
  re_component_clean_B8Gpajnz: RecoveredValue = 420,
  h: RecoveredValue = 50,
  g_component_clean_B8Gpajnz: RecoveredValue = `cubic-bezier(0.32, 0.72, 0.24, 1)`,
  _: RecoveredValue = 8,
  ie_component_clean_B8Gpajnz: RecoveredValue = 90,
  v_component_clean_B8Gpajnz: RecoveredValue = {
    subs: new Set(),
    id: 0,
  },
  ae_component_clean_B8Gpajnz: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let [t, r]: RecoveredValue = (0, n_component_clean_B8Gpajnz.useState)(
      (): RecoveredValue => Date.now(),
    );
    return (
      (0, n_component_clean_B8Gpajnz.useEffect)((): RecoveredValue => {
        if (!e) return;
        let t: RecoveredValue = (): RecoveredValue => r(Date.now());
        return (
          t(),
          v_component_clean_B8Gpajnz.subs.add(t),
          (v_component_clean_B8Gpajnz.id ||= window.setInterval(
            (): RecoveredValue =>
              v_component_clean_B8Gpajnz.subs.forEach(
                (e?: RecoveredValue): RecoveredValue => e(),
              ),
            1e3,
          )),
          (): RecoveredValue => {
            (v_component_clean_B8Gpajnz.subs.delete(t),
              v_component_clean_B8Gpajnz.subs.size ||
                (window.clearInterval(v_component_clean_B8Gpajnz.id),
                (v_component_clean_B8Gpajnz.id = 0)));
          }
        );
      }, [e]),
      t
    );
  },
  ComponentOe: RecoveredValue = ({
    since,
    until,
    now,
  }: RecoveredValue): RecoveredValue => {
    let i: RecoveredValue = ae_component_clean_B8Gpajnz(
      until === void 0 && now === void 0,
    );
    return (
      <r_component_clean_B8Gpajnz.Fragment>
        {s_component_clean_B8Gpajnz((until ?? now ?? i) - since)}
      </r_component_clean_B8Gpajnz.Fragment>
    );
  };
function ComponentR({
  agents,
  open,
  defaultOpen,
  onOpenChange,
  onSelect,
  onResolve,
  now,
  formatCost = a_component_clean_B8Gpajnz,
  title = `Agents`,
  highlight,
  className,
}: RecoveredValue): RecoveredValue {
  let w: RecoveredValue = (0, n_component_clean_B8Gpajnz.useId)(),
    [de, fe]: RecoveredValue = (0, n_component_clean_B8Gpajnz.useState)(
      (): RecoveredValue =>
        defaultOpen === void 0 ? (agents[0]?.id ?? null) : defaultOpen,
    ),
    T: RecoveredValue = highlight
      ? agents.find(
          (e?: RecoveredValue): RecoveredValue =>
            l_component_clean_B8Gpajnz(e).some(
              (e?: RecoveredValue): RecoveredValue => e.id === highlight,
            ),
        )
      : void 0,
    E: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e.id === highlight
        ? [e.id]
        : (e.children ?? []).reduce(
            (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
              t ?? (E(n) ? [e.id, ...E(n)] : null),
            null,
          ),
    pe: RecoveredValue = new Set(T ? (E(T) ?? []) : []),
    me: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      T && !pe.has(e) ? `` : void 0,
    D: RecoveredValue = T ? T.id : open === void 0 ? de : open,
    he: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = D === e ? null : e;
      (fe(t), onOpenChange?.(t));
    },
    [O, ge]: RecoveredValue = (0, n_component_clean_B8Gpajnz.useState)(D),
    [k, A]: RecoveredValue = (0, n_component_clean_B8Gpajnz.useState)(!1),
    j: RecoveredValue =
      agents.find((e?: RecoveredValue): RecoveredValue => e.id === O) ?? null,
    M: RecoveredValue = j ? l_component_clean_B8Gpajnz(j).slice(1) : [],
    N: RecoveredValue = m + Math.min(Math.max(0, M.length - 1), _) * h,
    P: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(0);
  ((0, n_component_clean_B8Gpajnz.useEffect)((): RecoveredValue => {
    if ((window.clearTimeout(P.current), D === O)) {
      A(!1);
      return;
    }
    if (!M.length || d_component_clean_B8Gpajnz()) {
      (ge(D), A(!1));
      return;
    }
    (A(!0),
      (P.current = window.setTimeout((): RecoveredValue => {
        (ge(D), A(!1));
      }, N + 40)));
  }, [D, O]),
    (0, n_component_clean_B8Gpajnz.useEffect)(
      (): RecoveredValue => (): RecoveredValue => window.clearTimeout(P.current),
      [],
    ));
  let F: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)({
    key: null,
    delays: new Map(),
    settled: !1,
  });
  F.current.key !== O &&
    (F.current = {
      key: O,
      delays: new Map(),
      settled: !1,
    });
  let _e: RecoveredValue = 0;
  for (let e of M)
    F.current.delays.has(e.id) ||
      F.current.delays.set(e.id, F.current.settled ? 0 : Math.min(_e++, _) * h);
  let I: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      F.current.delays.get(e) ?? 0,
    L: RecoveredValue = new Map(
      M.map(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => [
          e.id,
          Math.min(M.length - 1 - t, _) * h,
        ],
      ),
    ),
    [R, z]: RecoveredValue = (0, n_component_clean_B8Gpajnz.useState)(null),
    B: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(!1),
    [V, ve]: RecoveredValue = (0, n_component_clean_B8Gpajnz.useState)(null);
  ((0, n_component_clean_B8Gpajnz.useEffect)((): RecoveredValue => z(null), [D, O]),
    (0, n_component_clean_B8Gpajnz.useEffect)((): RecoveredValue => {
      if (!R) return;
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          U.current.get(R)?.contains(e.target) || z(null);
        },
        t: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          e.key === `Escape` && (U.current.get(R)?.focus(), z(null));
        };
      return (
        document.addEventListener(`pointerdown`, e),
        document.addEventListener(`keydown`, t),
        (): RecoveredValue => {
          (document.removeEventListener(`pointerdown`, e),
            document.removeEventListener(`keydown`, t));
        }
      );
    }, [R]));
  let ye: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(null),
    H: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(null),
    be: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(null),
    xe: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(null),
    U: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(new Map()),
    Se: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        t ? U.current.set(e, t) : U.current.delete(e);
      },
    [W, Ce]: RecoveredValue = (0, n_component_clean_B8Gpajnz.useState)(!0),
    G: RecoveredValue = Math.max(
      1,
      ...agents.map(
        (e?: RecoveredValue): RecoveredValue =>
          Math.max(
            0,
            ...l_component_clean_B8Gpajnz(e).map(
              (t?: RecoveredValue): RecoveredValue =>
                se_component_clean_B8Gpajnz(e, t.id),
            ),
          ),
      ),
    ),
    [K, we]: RecoveredValue = (0, n_component_clean_B8Gpajnz.useState)({
      key: null,
      links: [],
      dots: [],
      w: 0,
      h: 0,
    }),
    Te: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(``),
    q: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = H.current,
        t: RecoveredValue = be.current;
      if (!e || !t) return;
      let n: RecoveredValue = xe.current,
        r: RecoveredValue = O ? U.current.get(O) : void 0;
      if (W && n && r) {
        let e: RecoveredValue = r.offsetTop + r.offsetHeight / 2 - n.offsetHeight / 2,
          i: RecoveredValue = `${Math.round(Math.max(0, Math.min(e, t.offsetHeight - n.offsetHeight)))}px`;
        if (n.style.marginTop !== i) {
          let e: RecoveredValue =
            n.style.marginTop !== `` && !d_component_clean_B8Gpajnz();
          ((n.style.transition = e
            ? `margin-top ${re_component_clean_B8Gpajnz}ms ${g_component_clean_B8Gpajnz}`
            : `none`),
            (n.style.marginTop = i),
            e && Ee(460));
        }
      }
      let i: RecoveredValue = [],
        a: RecoveredValue = [],
        o: RecoveredValue = (
          t?: RecoveredValue,
          n?: RecoveredValue,
          r?: RecoveredValue,
        ): RecoveredValue => {
          let s: RecoveredValue = t.children ?? [];
          if (!s.length) return;
          let c: RecoveredValue = p_component_clean_B8Gpajnz(n, e),
            l: RecoveredValue = !1;
          for (let t of s) {
            let n: RecoveredValue = U.current.get(t.id);
            if (!n) continue;
            let a: RecoveredValue = p_component_clean_B8Gpajnz(n, e);
            f_component_clean_B8Gpajnz(t.status) || (l = !0);
            let s: RecoveredValue;
            if (r) {
              let e: RecoveredValue = c.x + c.w,
                t: RecoveredValue = c.y + c.h / 2,
                n: RecoveredValue = a.x,
                r: RecoveredValue = a.y + 21,
                i: RecoveredValue = Math.round(e + (n - e) / 2),
                o: RecoveredValue = r - t,
                l: RecoveredValue = Math.max(
                  0,
                  Math.min(8, Math.abs(o) / 2, (n - e) / 4),
                ),
                u: RecoveredValue = Math.sign(o);
              s =
                Math.abs(o) < 1
                  ? `M${e} ${t}H${n}`
                  : `M${e} ${t}H${i - l}Q${i} ${t} ${i} ${t + u * l}V${r - u * l}Q${i} ${r} ${i + l} ${r}H${n}`;
            } else {
              let e: RecoveredValue = c.x + 21,
                t: RecoveredValue = c.y + c.h,
                n: RecoveredValue = a.x,
                r: RecoveredValue = a.y + 21,
                i: RecoveredValue = Math.max(0, Math.min(8, (n - e) / 2, (r - t) / 2));
              s =
                n - e < 2
                  ? `M${e} ${t}V${a.y}`
                  : `M${e} ${t}V${r - i}Q${e} ${r} ${e + i} ${r}H${n}`;
            }
            (i.push({
              id: t.id,
              d: s,
              muted: f_component_clean_B8Gpajnz(t.status),
            }),
              o(t, n, !1));
          }
          a.push({
            id: t.id,
            at: r ? [c.x + c.w, c.y + c.h / 2] : [c.x + 21, c.y + c.h],
            muted: !l,
          });
        };
      j && r && o(j, r, W);
      let s: RecoveredValue = {
          key: O,
          links: i,
          dots: a,
          w: e.offsetWidth,
          h: e.offsetHeight,
        },
        c: RecoveredValue = JSON.stringify(s);
      c !== Te.current && ((Te.current = c), we(s));
    },
    J: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(q);
  J.current = q;
  let Y: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(0),
    X: RecoveredValue = (0, n_component_clean_B8Gpajnz.useRef)(0),
    Ee: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (((Y.current = Math.max(Y.current, performance.now() + e)), X.current)) return;
      let t: RecoveredValue = (): RecoveredValue => {
        (J.current(),
          (X.current = performance.now() < Y.current ? requestAnimationFrame(t) : 0));
      };
      X.current = requestAnimationFrame(t);
    };
  ((0, n_component_clean_B8Gpajnz.useEffect)(
    (): RecoveredValue => (): RecoveredValue => {
      (cancelAnimationFrame(X.current), (X.current = 0));
    },
    [],
  ),
    (0, n_component_clean_B8Gpajnz.useLayoutEffect)((): RecoveredValue => {
      (q(), (F.current.settled = !0));
    }),
    (0, n_component_clean_B8Gpajnz.useLayoutEffect)((): RecoveredValue => {
      W || Ee(480);
    }, [O, W]),
    (0, n_component_clean_B8Gpajnz.useLayoutEffect)((): RecoveredValue => {
      let e: RecoveredValue = ye.current,
        t: RecoveredValue = H.current;
      if (!e || !t) return;
      let n: RecoveredValue = (): RecoveredValue => {
        let t: RecoveredValue = getComputedStyle(e),
          n: RecoveredValue = (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
            parseFloat(t.getPropertyValue(e)) || n;
        (Ce(
          e.offsetWidth >=
            n(`--ui-agfc-main-w`, 288) +
              n(`--ui-agfc-gap`, 56) +
              n(`--ui-agfc-card-w`, 240) +
              n(`--ui-agfc-indent`, 32) * (G - 1),
        ),
          J.current());
      };
      n();
      let r: RecoveredValue = new ResizeObserver(n);
      return (r.observe(e), r.observe(t), (): RecoveredValue => r.disconnect());
    }, [G]));
  let De: RecoveredValue = (e?: RecoveredValue): RecoveredValue => (
      <span className={`ui-agfc__task`} title={e.task}>
        {e.tools && e.tools.length > 0 && (
          <span className={`ui-agfc__tools`} aria-hidden={`true`}>
            {(e.tools.length > 4 ? e.tools.slice(0, 3) : e.tools).map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <span className={`ui-agfc__tool`} children={e} key={t} />
              ),
            )}
            {e.tools.length > 4 && (
              <span className={`ui-agfc__tool ui-agfc__tool--more`}>
                {`+`}
                {e.tools.length - 3}
              </span>
            )}
          </span>
        )}
        <span className={`ui-agfc__task-text`} dir={`auto`}>
          {e.task}
        </span>
      </span>
    ),
    Oe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => (
      <span className={`ui-agfc__top`}>
        <span className={`ui-agfc__avatar`} data-logo={e.avatar ? `` : void 0}>
          {e.avatar ?? c_component_clean_B8Gpajnz(e.name)}
        </span>
        <span className={`ui-agfc__who`}>
          <span className={`ui-agfc__name`} dir={`auto`} title={e.name}>
            {e.name}
          </span>
          {e.model && (
            <span className={`ui-agfc__model`} title={e.model}>
              {e.model}
            </span>
          )}
        </span>
        <span className={`ui-agfc__status`} data-status={e.status}>
          <ComponentNe status={e.status} />
          {i_component_clean_B8Gpajnz[e.status]}
        </span>
      </span>
    ),
    ke: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue =
        e.ended ??
        (e.status === `running` || e.status === `waiting` ? void 0 : e.started);
      return (
        <span
          className={`ui-agfc__cost`}
          title={e.children?.length ? `With its sub-agents` : void 0}
        >
          <span
            className={`ui-agfc__amount`}
            data-live={
              l_component_clean_B8Gpajnz(e).some(
                (e?: RecoveredValue): RecoveredValue => e.status === `running`,
              )
                ? ``
                : void 0
            }
          >
            {formatCost(u_component_clean_B8Gpajnz(e))}
          </span>
          {e.started ? (
            <span className={`ui-agfc__time`}>
              {` · `}
              <ComponentOe since={e.started} until={t} now={now} />
            </span>
          ) : null}
        </span>
      );
    },
    Ae: RecoveredValue = (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
      let r: RecoveredValue =
        t.key === `ArrowDown`
          ? n + 1
          : t.key === `ArrowUp`
            ? n - 1
            : t.key === `Home`
              ? 0
              : t.key === `End`
                ? agents.length - 1
                : -1;
      r < 0 ||
        r >= agents.length ||
        r === n ||
        (t.preventDefault(), U.current.get(agents[r].id)?.focus());
    },
    je: RecoveredValue = (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
      let i: RecoveredValue = ee(t),
        a: RecoveredValue = l_component_clean_B8Gpajnz(t).slice(1);
      return (
        <button
          type={`button`}
          className={`ui-agfc__main`}
          data-status={t.status}
          data-faded={me(t.id)}
          data-open={t.id === D ? `` : void 0}
          aria-expanded={t.id === D}
          aria-controls={t.id === O ? `${w}-tree` : void 0}
          ref={Se(t.id) as RecoveredValue}
          onClick={(): RecoveredValue => he(t.id)}
          onKeyDown={(e?: RecoveredValue): RecoveredValue => Ae(e, n)}
          onFocus={(): RecoveredValue => ve(t.id)}
          tabIndex={
            t.id ===
            (agents.some((e?: RecoveredValue): RecoveredValue => e.id === V)
              ? V
              : D && agents.some((e?: RecoveredValue): RecoveredValue => e.id === D)
                ? D
                : agents[0]?.id)
              ? 0
              : -1
          }
        >
          {Oe(t)}
          {De(t)}
          <span className={`ui-agfc__foot`}>
            <span className={`ui-agfc__say`} data-kind={i.kind}>
              {a.length > 0 && (
                <svg
                  className={`ui-agfc__ring`}
                  width={`10`}
                  height={`10`}
                  viewBox={`0 0 12 12`}
                  aria-hidden={`true`}
                >
                  <circle cx={`6`} cy={`6`} r={`5.25`} className={`ui-agfc__ring-edge`} />
                  <circle
                    cx={`6`}
                    cy={`6`}
                    r={`1.75`}
                    pathLength={1}
                    className={`ui-agfc__ring-pie`}
                    style={
                      {
                        strokeDashoffset:
                          1 -
                          a.filter(
                            (e?: RecoveredValue): RecoveredValue =>
                              e.status === `done` ||
                              e.status === `failed` ||
                              e.status === `stopped`,
                          ).length /
                            a.length,
                      } as RecoveredValue
                    }
                  />
                </svg>
              )}
              <span className={`ui-agfc__say-text`}>{i.text}</span>
            </span>
            {ke(t)}
          </span>
        </button>
      );
    },
    Me: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = k,
        n: RecoveredValue = e.steps ?? [],
        a: RecoveredValue =
          !!onResolve && (e.status === `waiting` || e.status === `failed`),
        c: RecoveredValue = e.status === `waiting`,
        l: RecoveredValue = n.length > 0 || a,
        u: RecoveredValue = R === e.id && !t,
        d: RecoveredValue = !t && (!!onSelect || l),
        f: RecoveredValue = (t: RecoveredValue = !1): RecoveredValue => {
          ((B.current = t),
            onSelect?.(e),
            l && z((t?: RecoveredValue): RecoveredValue => (t === e.id ? null : e.id)));
        },
        p: RecoveredValue = n.filter(
          (e?: RecoveredValue): RecoveredValue => (e.status ?? `done`) === `done`,
        ).length;
      return (
        <div
          className={`ui-agfc__sub`}
          data-status={e.status}
          data-faded={me(e.id)}
          data-leaving={t ? `` : void 0}
          data-popped={u ? `` : void 0}
          style={
            {
              animationDelay: `${t ? (L.get(e.id) ?? 0) : I(e.id) + ie_component_clean_B8Gpajnz}ms`,
            } as RecoveredValue
          }
          ref={Se(e.id) as RecoveredValue}
          onClick={d ? (): RecoveredValue => f() : void 0}
          tabIndex={d ? 0 : void 0}
          aria-haspopup={l ? `dialog` : void 0}
          aria-expanded={l ? u : void 0}
          onKeyDown={
            d
              ? (e?: RecoveredValue): RecoveredValue => {
                  e.target === e.currentTarget &&
                    (e.key === `Enter` || e.key === ` `) &&
                    (e.preventDefault(), f(!0));
                }
              : void 0
          }
          data-clickable={d ? `` : void 0}
        >
          {Oe(e)}
          {De(e)}
          <div className={`ui-agfc__meta`}>
            {ke(e)}
            {a ? (
              <button
                type={`button`}
                className={`ui-agfc__review`}
                tabIndex={-1}
                aria-hidden={`true`}
                onClick={(t?: RecoveredValue): RecoveredValue => {
                  (t.stopPropagation(), (B.current = !1), z(e.id));
                }}
              >
                {c ? `Answer` : `Resolve`}
              </button>
            ) : (
              n.length > 0 && (
                <span className={`ui-agfc__count`}>
                  {n.length === 1
                    ? `1 task`
                    : `${o_component_clean_B8Gpajnz.format(n.length)} tasks`}
                </span>
              )
            )}
          </div>
          {u && (
            <div
              className={`ui-agfc__pop`}
              role={`dialog`}
              aria-label={
                a
                  ? `${e.name}: ${i_component_clean_B8Gpajnz[e.status]}`
                  : `Tasks of ${e.name}`
              }
              onClick={(e?: RecoveredValue): RecoveredValue => e.stopPropagation()}
            >
              {a && (
                <div className={`ui-agfc__ask`}>
                  <span className={`ui-agfc__ask-label`}>
                    {c ? `Needs your answer` : `Failed`}
                  </span>
                  <p className={`ui-agfc__ask-text`} dir={`auto`}>
                    {(c ? e.ask : e.error) ??
                      (c ? `It waits for your go-ahead.` : `It stopped with an error.`)}
                  </p>
                  <span className={`ui-agfc__ask-actions`}>
                    <button
                      type={`button`}
                      className={`ui-agfc__btn`}
                      onClick={(): RecoveredValue =>
                        onResolve(e, c ? `reject` : `dismiss`)
                      }
                    >
                      {c ? `Reject` : `Dismiss`}
                    </button>
                    <button
                      type={`button`}
                      className={`ui-agfc__btn ui-agfc__btn--primary`}
                      autoFocus={B.current}
                      onClick={(): RecoveredValue =>
                        onResolve(e, c ? `approve` : `retry`)
                      }
                    >
                      {c ? `Approve` : `Retry`}
                    </button>
                  </span>
                </div>
              )}
              {n.length > 0 && (
                <r_component_clean_B8Gpajnz.Fragment>
                  <div className={`ui-agfc__pop-head`}>
                    <span>{`Tasks`}</span>
                    <span>
                      {o_component_clean_B8Gpajnz.format(p)}
                      {`/`}
                      {o_component_clean_B8Gpajnz.format(n.length)}
                      {` done`}
                    </span>
                  </div>
                  <ol className={`ui-agfc__steps`}>
                    {n.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
                      let n: RecoveredValue = e.status ?? `done`;
                      return (
                        <li
                          className={`ui-agfc__step`}
                          data-status={n}
                          style={
                            {
                              animationDelay: `${60 + Math.min(t, _) * 30}ms`,
                            } as RecoveredValue
                          }
                          key={t}
                        >
                          {e.tool && (
                            <span className={`ui-agfc__tool`} aria-hidden={`true`}>
                              {e.tool}
                            </span>
                          )}
                          <span
                            className={`ui-agfc__step-title`}
                            dir={`auto`}
                            title={e.title}
                          >
                            {e.title}
                          </span>
                          <span className={`ui-agfc__step-end`}>
                            {n === `done` ? (
                              <r_component_clean_B8Gpajnz.Fragment>
                                <span className={`ui-agfc__sr`}>{`Done, `}</span>
                                {e.took === void 0
                                  ? `Done`
                                  : s_component_clean_B8Gpajnz(e.took)}
                              </r_component_clean_B8Gpajnz.Fragment>
                            ) : n === `running` ? (
                              <span
                                className={`ui-agfc__amount`}
                                data-live={``}
                              >{`Running`}</span>
                            ) : n === `stopped` ? (
                              `Skipped`
                            ) : (
                              i_component_clean_B8Gpajnz[n]
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </r_component_clean_B8Gpajnz.Fragment>
              )}
            </div>
          )}
        </div>
      );
    },
    Ne: RecoveredValue = (e?: RecoveredValue): RecoveredValue => (
      <div
        className={`ui-agfc__hang`}
        role={`treeitem`}
        aria-expanded={e.children?.length ? !0 : void 0}
        aria-label={`${e.name}: ${i_component_clean_B8Gpajnz[e.status]}`}
        key={e.id}
      >
        {Me(e)}
        {e.children && e.children.length > 0 && (
          <div className={`ui-agfc__below`} role={`group`}>
            {e.children.map(Ne)}
          </div>
        )}
      </div>
    ),
    Pe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => (
      <div
        ref={xe as RecoveredValue}
        id={`${w}-tree`}
        className={`ui-agfc__branch`}
        role={`tree`}
        aria-label={`Sub-agents of ${e.name}`}
        data-leaving={k ? `` : void 0}
        style={
          {
            "--ui-agfc-exit": `${N}ms`,
          } as RecoveredValue
        }
        onAnimationEnd={(e?: RecoveredValue): RecoveredValue => {
          e.target === e.currentTarget && !k && (e.currentTarget.dataset.settled = ``);
        }}
        children={
          <div className={`ui-agfc__branch-in`}>
            {e.children?.length ? (
              e.children.map(Ne)
            ) : (
              <p className={`ui-agfc__empty`}>{`No sub-agents yet`}</p>
            )}
          </div>
        }
        key={e.id}
      />
    ),
    Z: RecoveredValue = agents.flatMap(l_component_clean_B8Gpajnz),
    Q: RecoveredValue = Z.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `running`,
    ).length,
    Fe: RecoveredValue = Z.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `waiting`,
    ).length,
    Ie: RecoveredValue = agents.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + u_component_clean_B8Gpajnz(t),
      0,
    ),
    $: RecoveredValue = Z.length - agents.length;
  return (
    <div
      ref={ye as RecoveredValue}
      className={[`ui-agfc`, className].filter(Boolean).join(` `)}
      data-wide={W ? `` : void 0}
      style={
        {
          "--ui-agfc-depth": G,
        } as RecoveredValue
      }
    >
      <header className={`ui-agfc__bar`}>
        <span className={`ui-agfc__spark`}>
          <ComponentTe />
        </span>
        <span className={`ui-agfc__title`} dir={`auto`} title={title}>
          {title}
        </span>
        <span className={`ui-agfc__sum`} aria-live={`polite`}>
          <span>
            {agents.length === 1
              ? `1 agent`
              : `${o_component_clean_B8Gpajnz.format(agents.length)} agents`}
            {$ > 0 &&
              ($ === 1
                ? ` / 1 sub-agent`
                : ` / ${o_component_clean_B8Gpajnz.format($)} sub-agents`)}
          </span>
          {Q > 0 && (
            <span>
              {o_component_clean_B8Gpajnz.format(Q)}
              {` running`}
            </span>
          )}
          {Fe > 0 && (
            <span>
              {o_component_clean_B8Gpajnz.format(Fe)}
              {` needs you`}
            </span>
          )}
          <span className={`ui-agfc__sum-cost`}>
            <span className={`ui-agfc__amount`} data-live={Q > 0 ? `` : void 0}>
              {formatCost(Ie)}
            </span>
          </span>
        </span>
      </header>
      <div
        ref={H as RecoveredValue}
        className={`ui-agfc__body`}
        data-pop={R ? `` : void 0}
      >
        <svg className={`ui-agfc__links`} width={K.w} height={K.h} aria-hidden={`true`}>
          {K.key === O &&
            K.links.map(
              (e?: RecoveredValue): RecoveredValue => (
                <path
                  d={e.d}
                  pathLength={1}
                  className={`ui-agfc__link`}
                  data-muted={e.muted ? `` : void 0}
                  data-leaving={k ? `` : void 0}
                  style={
                    {
                      animationDelay: `${k ? (L.get(e.id) ?? 0) : I(e.id)}ms`,
                    } as RecoveredValue
                  }
                  key={`${K.key}:${e.id}`}
                />
              ),
            )}
        </svg>
        <div
          ref={be as RecoveredValue}
          className={`ui-agfc__list`}
          data-picked={D ? `` : void 0}
        >
          {agents.length === 0 && (
            <p className={`ui-agfc__none`}>{`No agents at work`}</p>
          )}
          {agents.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <n_component_clean_B8Gpajnz.Fragment key={e.id}>
                {je(e, t)}
                {!W && e.id === O && Pe(e)}
              </n_component_clean_B8Gpajnz.Fragment>
            ),
          )}
        </div>
        {W && <div className={`ui-agfc__side`}>{j && Pe(j)}</div>}
        <svg
          className={`ui-agfc__links ui-agfc__dots`}
          width={K.w}
          height={K.h}
          aria-hidden={`true`}
        >
          {K.key === O &&
            K.dots.map(
              (e?: RecoveredValue): RecoveredValue => (
                <circle
                  cx={e.at[0]}
                  cy={e.at[1]}
                  r={3.25}
                  className={`ui-agfc__dot`}
                  data-muted={e.muted ? `` : void 0}
                  data-leaving={k ? `` : void 0}
                  style={
                    (k
                      ? {
                          animationDelay: `${N - m}ms`,
                        }
                      : void 0) as RecoveredValue
                  }
                  key={`${K.key}:${e.id}`}
                />
              ),
            )}
        </svg>
      </div>
    </div>
  );
}
var se_component_clean_B8Gpajnz: RecoveredValue = (
  e?: RecoveredValue,
  t?: RecoveredValue,
  n: RecoveredValue = 0,
): RecoveredValue => {
  if (e.id === t) return n;
  for (let r of e.children ?? []) {
    let e: RecoveredValue = se_component_clean_B8Gpajnz(r, t, n + 1);
    if (e >= 0) return e;
  }
  return -1;
};
var n_component_clean_BXBQJTQe: RecoveredValue = t_react_BkAXpnfr(),
  r_component_clean_BXBQJTQe: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_clean_BXBQJTQe: RecoveredValue = [
    {
      id: `needs`,
      label: `Needs you`,
    },
    {
      id: `running`,
      label: `Running`,
    },
    {
      id: `done`,
      label: `Done`,
    },
  ],
  a_component_clean_BXBQJTQe: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e === `waiting` || e === `failed` ? `needs` : e === `running` ? `running` : `done`,
  o_component_clean_BXBQJTQe: RecoveredValue = {
    waiting: `Waiting for you`,
    running: `Running`,
    done: `Done`,
    failed: `Failed`,
  },
  s_component_clean_BXBQJTQe: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e === `running` || e === `waiting`,
  c_component_clean_BXBQJTQe: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e === `waiting` || e === `done` || e === `failed` ? e : `running`,
  l_component_clean_BXBQJTQe: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e instanceof Date
      ? e.getTime()
      : typeof e == `number`
        ? e
        : typeof e == `string`
          ? Date.parse(e)
          : NaN,
  u_component_clean_BXBQJTQe: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    typeof e == `number` && Number.isFinite(e) && e >= 0 ? e : void 0,
  d_component_clean_BXBQJTQe: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    String(e).padStart(2, `0`),
  f_component_clean_BXBQJTQe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    if (!Number.isFinite(e)) return `—`;
    let t: RecoveredValue = Math.max(0, Math.floor(e / 1e3));
    if (t < 60) return `${t}s`;
    let n: RecoveredValue = Math.floor(t / 60);
    if (n < 60) return `${n}m ${d_component_clean_BXBQJTQe(t % 60)}s`;
    let r: RecoveredValue = Math.floor(n / 60);
    return r < 24
      ? `${r}h ${d_component_clean_BXBQJTQe(n % 60)}m`
      : `${Math.floor(r / 24)}d ${r % 24}h`;
  },
  p_component_clean_BXBQJTQe: RecoveredValue = new Intl.NumberFormat(`en`, {
    notation: `compact`,
    maximumFractionDigits: 1,
  }),
  m_component_clean_BXBQJTQe: RecoveredValue = new Intl.NumberFormat(`en`),
  h_component_clean_BXBQJTQe: RecoveredValue = {
    subs: new Set(),
    id: 0,
  },
  g_component_clean_BXBQJTQe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let [t, r]: RecoveredValue = (0, n_component_clean_BXBQJTQe.useState)(
      (): RecoveredValue => Date.now(),
    );
    return (
      (0, n_component_clean_BXBQJTQe.useEffect)((): RecoveredValue => {
        if (!e) return;
        let t: RecoveredValue = (): RecoveredValue => r(Date.now());
        return (
          t(),
          h_component_clean_BXBQJTQe.subs.add(t),
          (h_component_clean_BXBQJTQe.id ||= window.setInterval(
            (): RecoveredValue =>
              h_component_clean_BXBQJTQe.subs.forEach(
                (e?: RecoveredValue): RecoveredValue => e(),
              ),
            1e3,
          )),
          (): RecoveredValue => {
            (h_component_clean_BXBQJTQe.subs.delete(t),
              h_component_clean_BXBQJTQe.subs.size ||
                (window.clearInterval(h_component_clean_BXBQJTQe.id),
                (h_component_clean_BXBQJTQe.id = 0)));
          }
        );
      }, [e]),
      t
    );
  },
  Component_: RecoveredValue = ({ since, fixed }: RecoveredValue): RecoveredValue => {
    let n: RecoveredValue = g_component_clean_BXBQJTQe(since !== void 0);
    return (
      <r_component_clean_BXBQJTQe.Fragment>
        {f_component_clean_BXBQJTQe(since === void 0 ? fixed : n - since)}
      </r_component_clean_BXBQJTQe.Fragment>
    );
  },
  v_component_clean_BXBQJTQe: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  y_component_clean_BXBQJTQe: RecoveredValue = `cubic-bezier(0.32, 0.72, 0.24, 1)`,
  b_component_clean_BXBQJTQe: RecoveredValue = {
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 1.4,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  ComponentX: RecoveredValue = (): RecoveredValue => (
    <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
      <path
        d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
        fill={`currentColor`}
      />
      <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
    </svg>
  ),
  S: RecoveredValue = ({ status }: RecoveredValue): RecoveredValue => (
    <span className={`ui-aic__state-icon`} data-status={status} aria-hidden={`true`}>
      {status === `running` && (
        <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
          <circle
            cx={`6`}
            cy={`6`}
            r={`4.6`}
            fill={`none`}
            stroke={`currentColor`}
            strokeOpacity={`0.25`}
            strokeWidth={`1.6`}
          />
          <path
            d={`M6 1.4a4.6 4.6 0 0 1 4.6 4.6`}
            fill={`none`}
            stroke={`currentColor`}
            strokeWidth={`1.6`}
            strokeLinecap={`round`}
          />
        </svg>
      )}
      {status === `waiting` && (
        <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
          <path d={`M6 1.6 11 10.2H1L6 1.6Z`} fill={`currentColor`} />
        </svg>
      )}
      {status === `done` && (
        <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
          <circle cx={`6`} cy={`6`} r={`3.4`} fill={`currentColor`} />
        </svg>
      )}
      {status === `failed` && (
        <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
          <circle cx={`6`} cy={`6`} r={`4.8`} fill={`currentColor`} />
          <path
            d={`M6 3.6v2.8M6 8.3v.1`}
            stroke={`#fff`}
            strokeWidth={`1.5`}
            strokeLinecap={`round`}
          />
        </svg>
      )}
    </span>
  ),
  C: RecoveredValue = (): RecoveredValue => (
    <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
      <path
        d={`M7.6 1.6a2.6 2.6 0 0 0-2.4 3.5L1.7 8.6a1.1 1.1 0 0 0 1.6 1.6l3.5-3.5a2.6 2.6 0 0 0 3.5-2.4l-1.5 1.1-1.5-.4-.4-1.5 1.1-1.5c-.1 0-.3-.4-.4-.4Z`}
        {...b_component_clean_BXBQJTQe}
        strokeWidth={1.2}
      />
    </svg>
  ),
  ComponentW: RecoveredValue = (): RecoveredValue => (
    <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
      <circle
        cx={`5.2`}
        cy={`5.2`}
        r={`3.3`}
        {...b_component_clean_BXBQJTQe}
        strokeWidth={1.2}
      />
      <path d={`m7.7 7.7 2.6 2.6`} {...b_component_clean_BXBQJTQe} strokeWidth={1.2} />
    </svg>
  ),
  T_component_clean_BXBQJTQe: RecoveredValue = (): RecoveredValue => (
    <svg width={`13`} height={`13`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
      <rect
        x={`1.8`}
        y={`2.2`}
        width={`3.2`}
        height={`9.6`}
        rx={`1`}
        {...b_component_clean_BXBQJTQe}
        strokeWidth={1.2}
      />
      <rect
        x={`8.9`}
        y={`2.2`}
        width={`3.2`}
        height={`6.4`}
        rx={`1`}
        {...b_component_clean_BXBQJTQe}
        strokeWidth={1.2}
      />
    </svg>
  ),
  ComponentEe_component_clean_BXBQJTQe: RecoveredValue = (): RecoveredValue => (
    <svg width={`13`} height={`13`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
      <path
        d={`M2.2 3.6h9.6M2.2 7h9.6M2.2 10.4h9.6`}
        {...b_component_clean_BXBQJTQe}
        strokeWidth={1.2}
      />
    </svg>
  );
function ComponentI({
  tasks,
  onApprove,
  onReject,
  onRetry,
  onOpen,
  title = `Agent inbox`,
  view,
  defaultView = `board`,
  onViewChange,
  lanes,
  highlight,
  className,
}: RecoveredValue): RecoveredValue {
  let ne: RecoveredValue = (0, n_component_clean_BXBQJTQe.useId)(),
    j: RecoveredValue = (0, n_component_clean_BXBQJTQe.useRef)(null),
    [M, N]: RecoveredValue = (0, n_component_clean_BXBQJTQe.useState)(defaultView),
    P: RecoveredValue = view ?? M,
    [F, I]: RecoveredValue = (0, n_component_clean_BXBQJTQe.useState)(null),
    [L, re]: RecoveredValue = (0, n_component_clean_BXBQJTQe.useState)({}),
    R: RecoveredValue = new Map(),
    z: RecoveredValue = (Array.isArray(tasks) ? tasks : [])
      .filter((e?: RecoveredValue): RecoveredValue => !!e && typeof e == `object`)
      .map((e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = String(e.id ?? ``),
          n: RecoveredValue = R.get(t) ?? 0;
        R.set(t, n + 1);
        let r: RecoveredValue = n ? `${t}#${n}` : t,
          i: RecoveredValue = L[r]
            ? {
                ...e,
                ...L[r],
              }
            : e,
          a: RecoveredValue = (Array.isArray(i.steps) ? i.steps : [])
            .filter(
              (e?: RecoveredValue): RecoveredValue =>
                !!e && typeof e == `object` && String(e.label ?? ``).trim() !== ``,
            )
            .map(
              (e?: RecoveredValue): RecoveredValue => ({
                label: String(e.label),
                time: e.time ? String(e.time) : void 0,
              }),
            );
        return {
          ...i,
          key: r,
          src: e,
          status: c_component_clean_BXBQJTQe(i.status),
          title: String(i.title ?? ``).trim() || `Untitled task`,
          steps: a,
        };
      }),
    B: RecoveredValue = (0, n_component_clean_BXBQJTQe.useRef)({});
  for (let e of z) B.current[e.key] ??= Date.now();
  let V: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (!s_component_clean_BXBQJTQe(e.status)) return;
      let t: RecoveredValue = l_component_clean_BXBQJTQe(e.startedAt);
      return Number.isFinite(t)
        ? t
        : B.current[e.key] - (u_component_clean_BXBQJTQe(e.elapsed) ?? 0);
    },
    [H, U]: RecoveredValue = (0, n_component_clean_BXBQJTQe.useState)(
      (): RecoveredValue =>
        Object.fromEntries(
          z.map(
            (e?: RecoveredValue): RecoveredValue => [
              e.key,
              a_component_clean_BXBQJTQe(e.status),
            ],
          ),
        ),
    ),
    W: RecoveredValue = z
      .map(
        (e?: RecoveredValue): RecoveredValue =>
          `${e.key}:${a_component_clean_BXBQJTQe(e.status)}`,
      )
      .join(`|`);
  (0, n_component_clean_BXBQJTQe.useEffect)((): RecoveredValue => {
    if (
      !z.some(
        (e?: RecoveredValue): RecoveredValue =>
          H[e.key] !== a_component_clean_BXBQJTQe(e.status),
      )
    )
      return;
    let e: RecoveredValue = window.setTimeout(
      (): RecoveredValue =>
        U(
          Object.fromEntries(
            z.map(
              (e?: RecoveredValue): RecoveredValue => [
                e.key,
                a_component_clean_BXBQJTQe(e.status),
              ],
            ),
          ),
        ),
      v_component_clean_BXBQJTQe() ? 0 : 900,
    );
    return (): RecoveredValue => window.clearTimeout(e);
  }, [W]);
  let G: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      H[e.key] ?? a_component_clean_BXBQJTQe(e.status),
    K: RecoveredValue = (0, n_component_clean_BXBQJTQe.useRef)(new Map()),
    q: RecoveredValue = (0, n_component_clean_BXBQJTQe.useRef)(new Map()),
    J: RecoveredValue = JSON.stringify(H) + P,
    Y: RecoveredValue = (0, n_component_clean_BXBQJTQe.useRef)(J);
  (j.current &&
    Y.current !== J &&
    (q.current = new Map(
      [...K.current].map(
        ([e, t]: RecoveredValue): RecoveredValue => [e, t.getBoundingClientRect()],
      ),
    )),
    (0, n_component_clean_BXBQJTQe.useLayoutEffect)((): RecoveredValue => {
      if (Y.current !== J && ((Y.current = J), !v_component_clean_BXBQJTQe()))
        for (let [e, t] of K.current) {
          let n: RecoveredValue = q.current.get(e);
          if (!n) {
            t.animate(
              [
                {
                  opacity: 0,
                  transform: `translateY(6px)`,
                },
                {
                  opacity: 1,
                  transform: `none`,
                },
              ],
              {
                duration: 380,
                easing: y_component_clean_BXBQJTQe,
              },
            );
            continue;
          }
          let r: RecoveredValue = t.getBoundingClientRect(),
            i: RecoveredValue = n.left - r.left,
            a: RecoveredValue = n.top - r.top;
          (Math.abs(i) < 1 && Math.abs(a) < 1) ||
            t.animate(
              [
                {
                  transform: `translate(${i}px, ${a}px)`,
                  zIndex: 2,
                },
                {
                  transform: `none`,
                  zIndex: 2,
                },
              ],
              {
                duration: 560,
                easing: y_component_clean_BXBQJTQe,
              },
            );
        }
    }, [J]));
  let X: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
      r?: RecoveredValue,
    ): RecoveredValue => {
      if (r) return r(e.src);
      re(
        (r?: RecoveredValue): RecoveredValue => ({
          ...r,
          [e.key]: {
            status: t,
            startedAt: Date.now(),
            steps: [
              ...(e.steps ?? []),
              {
                label: n,
                time: `now`,
              },
            ],
          },
        }),
      );
    },
    ie: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      I((t?: RecoveredValue): RecoveredValue => (t === e ? null : e)),
    Z: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      e.key === `Escape` &&
        F &&
        (e.stopPropagation(),
        K.current.get(F)?.querySelector(`.ui-aic__card-main`)?.focus({
          preventScroll: !0,
        }),
        I(null));
    },
    ae: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (N(e), onViewChange?.(e));
    },
    oe: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = F === e.key,
        i: RecoveredValue = (e.steps ?? []).slice(-4),
        a: RecoveredValue = u_component_clean_BXBQJTQe(e.elapsed),
        s: RecoveredValue =
          e.status !== `failed` && (e.status !== `done` || a !== void 0),
        c: RecoveredValue = u_component_clean_BXBQJTQe(e.sources),
        l: RecoveredValue = u_component_clean_BXBQJTQe(e.tools),
        g: RecoveredValue = typeof e.description == `string` ? e.description.trim() : ``,
        v: RecoveredValue = String(e.agent ?? ``).trim(),
        y: RecoveredValue = `${ne}-${encodeURIComponent(e.key)}`,
        b: RecoveredValue =
          e.status === `done`
            ? s
              ? `Done in`
              : o_component_clean_BXBQJTQe.done
            : e.status === `failed`
              ? o_component_clean_BXBQJTQe.failed
              : `${o_component_clean_BXBQJTQe[e.status]} ·`;
      return (
        <li
          data-id={e.id}
          className={`ui-aic__card`}
          data-faded={highlight && e.id !== highlight ? `` : void 0}
          data-status={e.status}
          data-open={n ? `` : void 0}
          ref={
            ((t?: RecoveredValue): RecoveredValue => {
              t ? K.current.set(e.key, t) : K.current.delete(e.key);
            }) as RecoveredValue
          }
          key={e.key}
        >
          <button
            type={`button`}
            className={`ui-aic__card-main`}
            aria-expanded={n}
            aria-controls={y}
            onClick={(): RecoveredValue => ie(e.key)}
          >
            <span className={`ui-aic__title-row`}>
              <span className={`ui-aic__spark`}>
                <ComponentX />
              </span>
              <span className={`ui-aic__title`} dir={`auto`} title={e.title}>
                {e.title}
              </span>
            </span>
            {g && (
              <span className={`ui-aic__desc`} dir={`auto`}>
                {g}
              </span>
            )}
            <span className={`ui-aic__foot`}>
              <span
                className={`ui-aic__state`}
                data-status={e.status}
                data-bare={s ? void 0 : ``}
              >
                <S status={e.status} />
                <span className={`ui-aic__state-word`}>{b}</span>
                {s && (
                  <span className={`ui-aic__time`}>
                    <Component_ since={V(e)} fixed={a ?? 0} />
                  </span>
                )}
              </span>
              <span className={`ui-aic__meta`}>
                {c !== void 0 && (
                  <span title={`Sources read: ${m_component_clean_BXBQJTQe.format(c)}`}>
                    <ComponentW />
                    {p_component_clean_BXBQJTQe.format(c)}
                  </span>
                )}
                {l !== void 0 && (
                  <span title={`Tool calls: ${m_component_clean_BXBQJTQe.format(l)}`}>
                    <C />
                    {p_component_clean_BXBQJTQe.format(l)}
                  </span>
                )}
              </span>
            </span>
          </button>
          <div id={y} className={`ui-aic__fold`} data-open={n ? `` : void 0} inert={!n}>
            <div className={`ui-aic__clip`}>
              <div className={`ui-aic__more`}>
                {v && (
                  <div className={`ui-aic__agent`} dir={`auto`}>
                    {v}
                  </div>
                )}
                {i.length > 0 && (
                  <ol className={`ui-aic__steps`}>
                    {i.map(
                      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                        <li data-last={t === i.length - 1 ? `` : void 0} key={t}>
                          <span dir={`auto`}>{e.label}</span>
                          {e.time && <time dir={`auto`}>{e.time}</time>}
                        </li>
                      ),
                    )}
                  </ol>
                )}
                <div className={`ui-aic__actions`}>
                  {e.status === `waiting` && (
                    <r_component_clean_BXBQJTQe.Fragment>
                      <button
                        type={`button`}
                        className={`ui-aic__btn`}
                        onClick={(): RecoveredValue =>
                          X(e, `failed`, `You rejected the request`, onReject)
                        }
                      >{`Reject`}</button>
                      <button
                        type={`button`}
                        className={`ui-aic__btn ui-aic__btn--primary`}
                        onClick={(): RecoveredValue =>
                          X(e, `running`, `You approved – continuing`, onApprove)
                        }
                      >{`Approve`}</button>
                    </r_component_clean_BXBQJTQe.Fragment>
                  )}
                  {e.status === `failed` && (
                    <button
                      type={`button`}
                      className={`ui-aic__btn ui-aic__btn--primary`}
                      onClick={(): RecoveredValue => X(e, `running`, `Retrying`, onRetry)}
                    >{`Retry`}</button>
                  )}
                  {(e.status === `running` || e.status === `done`) && onOpen && (
                    <button
                      type={`button`}
                      className={`ui-aic__btn`}
                      onClick={(): RecoveredValue => onOpen(e)}
                    >{`Open`}</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    },
    se: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e > 999 ? `999+` : String(e),
    Q: RecoveredValue = Object.fromEntries(
      i_component_clean_BXBQJTQe.map(
        (e?: RecoveredValue): RecoveredValue => [
          e.id,
          z.filter((t?: RecoveredValue): RecoveredValue => G(t) === e.id).length,
        ],
      ),
    ),
    $: RecoveredValue = z.filter(
      (e?: RecoveredValue): RecoveredValue =>
        e.status === `waiting` || e.status === `failed`,
    ).length,
    ce: RecoveredValue = `${$} ${$ === 1 ? `needs` : `need`} you, ${z.filter((e?: RecoveredValue): RecoveredValue => e.status === `running`).length} running`;
  return (
    <div
      ref={j as RecoveredValue}
      className={[`ui-aic`, className].filter(Boolean).join(` `)}
      data-view={P}
      onKeyDown={Z}
    >
      <div className={`ui-aic__bar`}>
        <span className={`ui-aic__heading`}>
          <span className={`ui-aic__crumb`}>{`Agents`}</span>
          <span className={`ui-aic__slash`} aria-hidden={`true`}>{`/`}</span>
          <span className={`ui-aic__heading-title`} title={title}>
            {title}
          </span>
        </span>
        {(view === void 0 || onViewChange) && (
          <div className={`ui-aic__views`} role={`radiogroup`} aria-label={`Layout`}>
            {[`board`, `list`].map(
              (e?: RecoveredValue): RecoveredValue => (
                <button
                  type={`button`}
                  role={`radio`}
                  aria-checked={P === e}
                  className={`ui-aic__view`}
                  onClick={(): RecoveredValue => ae(e)}
                  key={e}
                >
                  {e === `board` ? (
                    <T_component_clean_BXBQJTQe />
                  ) : (
                    <ComponentEe_component_clean_BXBQJTQe />
                  )}
                  {e === `board` ? `Board` : `List`}
                </button>
              ),
            )}
          </div>
        )}
      </div>
      <div className={`ui-aic__lanes`}>
        {i_component_clean_BXBQJTQe
          .filter((e?: RecoveredValue): RecoveredValue => !lanes || lanes.includes(e.id))
          .map(
            (e?: RecoveredValue): RecoveredValue => (
              <section className={`ui-aic__lane`} aria-label={e.label} key={e.id}>
                <header className={`ui-aic__lane-head`}>
                  <span className={`ui-aic__lane-spark`} aria-hidden={`true`}>
                    <ComponentX />
                  </span>
                  <span className={`ui-aic__lane-name`}>{e.label}</span>
                  <span
                    className={`ui-aic__count`}
                    title={
                      Q[e.id] > 999 ? m_component_clean_BXBQJTQe.format(Q[e.id]) : void 0
                    }
                  >
                    {se(Q[e.id])}
                  </span>
                </header>
                <ul className={`ui-aic__cards`}>
                  {z
                    .filter((t?: RecoveredValue): RecoveredValue => G(t) === e.id)
                    .map(oe)}
                  {Q[e.id] === 0 && <li className={`ui-aic__empty`}>{`Nothing here`}</li>}
                </ul>
              </section>
            ),
          )}
      </div>
      <span className={`ui-aic__sr`} aria-live={`polite`}>
        {ce}
      </span>
    </div>
  );
}
var a_demo_clean_GS1OgCKi: RecoveredValue = t_react_BkAXpnfr(),
  o_demo_clean_GS1OgCKi: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  s_demo_clean_GS1OgCKi: RecoveredValue = [
    {
      id: `all`,
      label: `All`,
    },
    {
      id: `running`,
      label: `Running`,
    },
    {
      id: `waiting`,
      label: `Needs you`,
    },
    {
      id: `failed`,
      label: `Failed`,
    },
  ],
  c_demo_clean_GS1OgCKi: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue =>
    t === `all` || e.status === t || (t === `waiting` && e.status === `failed`),
  l_demo_clean_GS1OgCKi: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
    e,
    ...(e.children ?? []).flatMap(l_demo_clean_GS1OgCKi),
  ],
  u_demo_clean_GS1OgCKi: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    let n: RecoveredValue = (e.children ?? [])
      .map((e?: RecoveredValue): RecoveredValue => u_demo_clean_GS1OgCKi(e, t))
      .filter((e?: RecoveredValue): RecoveredValue => !!e);
    return c_demo_clean_GS1OgCKi(e, t) || n.length
      ? {
          ...e,
          children: n,
        }
      : null;
  },
  d_demo_clean_GS1OgCKi: RecoveredValue = {
    approve: `running`,
    reject: `failed`,
    retry: `running`,
    dismiss: `done`,
  };
function ComponentF({
  agents,
  events = [],
  since,
  now,
  filter,
  defaultFilter = `all`,
  onFilterChange,
  onApprove,
  onReject,
  onRetry,
  onDismiss,
  title = `Mission control`,
  className,
}: RecoveredValue): RecoveredValue {
  let [w, T]: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useState)(defaultFilter),
    E: RecoveredValue = filter ?? w,
    D: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (T(e), onFilterChange?.(e));
    },
    O: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useRef)(null),
    [k, A]: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useState)(0);
  (0, a_demo_clean_GS1OgCKi.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = O.current;
    if (!e || typeof ResizeObserver > `u`) return;
    let t: RecoveredValue = new ResizeObserver(
      (): RecoveredValue =>
        A((t?: RecoveredValue): RecoveredValue => Math.max(t, e.offsetHeight)),
    );
    return (t.observe(e), (): RecoveredValue => t.disconnect());
  }, []);
  let [j, M]: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useState)(null),
    [N, P]: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useState)({}),
    F: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = N[e.id],
        n: RecoveredValue = t && t.from === e.status ? t.to : e.status,
        r: RecoveredValue = n !== e.status;
      return {
        ...e,
        status: n,
        ask: n === `waiting` ? e.ask : void 0,
        error: n === `failed` ? (r ? `You rejected the request` : e.error) : void 0,
        children: e.children?.map(F),
      };
    },
    I: RecoveredValue = agents.map(F),
    L: RecoveredValue = new Map(
      agents
        .flatMap(l_demo_clean_GS1OgCKi)
        .map((e?: RecoveredValue): RecoveredValue => [e.id, e]),
    ),
    R: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = L.get(e);
      n &&
        (P(
          (r?: RecoveredValue): RecoveredValue => ({
            ...r,
            [e]: {
              from: n.status,
              to: d_demo_clean_GS1OgCKi[t],
            },
          }),
        ),
        (
          {
            approve: onApprove,
            reject: onReject,
            retry: onRetry,
            dismiss: onDismiss,
          } as Record<string, RecoveredValue>
        )[t]?.(n));
    },
    z: RecoveredValue = new Set(
      Object.keys(N).filter(
        (e?: RecoveredValue): RecoveredValue =>
          I.flatMap(l_demo_clean_GS1OgCKi).some(
            (t?: RecoveredValue): RecoveredValue =>
              t.id === e && t.status !== `waiting` && t.status !== `failed`,
          ),
      ),
    ),
    B: RecoveredValue = events.map(
      (e?: RecoveredValue): RecoveredValue =>
        z.has(e.agent) && (e.kind === `needs` || e.kind === `failed`)
          ? {
              ...e,
              kind: `done`,
            }
          : e,
    ),
    V: RecoveredValue = I.flatMap(l_demo_clean_GS1OgCKi),
    H: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      V.filter((t?: RecoveredValue): RecoveredValue => c_demo_clean_GS1OgCKi(t, e))
        .length,
    U: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useRef)(null),
    W: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = s_demo_clean_GS1OgCKi.filter(
          (e?: RecoveredValue): RecoveredValue => e.id === `all` || H(e.id) > 0,
        ),
        n: RecoveredValue = t.findIndex(
          (e?: RecoveredValue): RecoveredValue => e.id === E,
        ),
        r: RecoveredValue =
          e.key === `ArrowRight` || e.key === `ArrowDown`
            ? n + 1
            : e.key === `ArrowLeft` || e.key === `ArrowUp`
              ? n - 1
              : e.key === `Home`
                ? 0
                : e.key === `End`
                  ? t.length - 1
                  : null;
      if (r === null) return;
      e.preventDefault();
      let i: RecoveredValue = t[(r + t.length) % t.length];
      (D(i.id), U.current?.querySelector(`[data-kind="${i.id}"]`)?.focus());
    },
    G: RecoveredValue = I.map(
      (e?: RecoveredValue): RecoveredValue => u_demo_clean_GS1OgCKi(e, E),
    ).filter((e?: RecoveredValue): RecoveredValue => !!e),
    K: RecoveredValue = new Set(
      G.flatMap(l_demo_clean_GS1OgCKi)
        .filter((e?: RecoveredValue): RecoveredValue => c_demo_clean_GS1OgCKi(e, E))
        .map((e?: RecoveredValue): RecoveredValue => e.id),
    ),
    q: RecoveredValue = new Map(V.map((e?: RecoveredValue): RecoveredValue => [e.id, e])),
    J: RecoveredValue = (e?: RecoveredValue): RecoveredValue => ({
      id: e.id,
      name: e.name,
      task: e.task,
      model: e.model,
      avatar: e.avatar,
      tools: e.tools,
      status: e.status,
      ask: e.ask,
      error: e.error,
      cost: e.cost,
      started: e.started,
      ended: e.ended,
      children: e.children?.map(J),
    }),
    Y: RecoveredValue = V.filter(
      (e?: RecoveredValue): RecoveredValue =>
        K.has(e.id) && (e.status === `waiting` || e.status === `failed`),
    ).map(
      (e?: RecoveredValue): RecoveredValue => ({
        id: e.id,
        title: e.task,
        description: e.ask ?? e.error,
        agent: e.status === `waiting` ? `Asked by ${e.name}` : `Stopped in ${e.name}`,
        status: e.status === `waiting` ? `waiting` : `failed`,
        startedAt: e.started,
      }),
    ),
    X: RecoveredValue = (e?: RecoveredValue): RecoveredValue => q.get(e.id);
  return (
    <section
      className={[`ui-mcc`, className].filter(Boolean).join(` `)}
      aria-label={title}
    >
      <header className={`ui-mcc__bar`}>
        <h2 className={`ui-mcc__title`}>{title}</h2>
        <div
          ref={U as RecoveredValue}
          className={`ui-mcc__filter`}
          role={`radiogroup`}
          aria-label={`Show agents`}
          onKeyDown={W}
        >
          {s_demo_clean_GS1OgCKi.map((e?: RecoveredValue): RecoveredValue => {
            let t: RecoveredValue = H(e.id);
            return (
              <button
                type={`button`}
                role={`radio`}
                aria-checked={E === e.id}
                tabIndex={E === e.id ? 0 : -1}
                className={`ui-mcc__chip`}
                data-kind={e.id}
                disabled={t === 0 && e.id !== `all`}
                onClick={(): RecoveredValue => D(e.id)}
                key={e.id}
              >
                {e.label}
                <span className={`ui-mcc__n`}>{t}</span>
              </button>
            );
          })}
        </div>
      </header>
      <ComponentN
        events={B.filter((e?: RecoveredValue): RecoveredValue => K.has(e.agent))}
        since={since}
        until={now}
        board={!1}
        title={`Since you looked`}
        replay={0}
        onHover={(e?: RecoveredValue): RecoveredValue => M(e ? e.agent : null)}
      />
      <div
        className={`ui-mcc__grid`}
        style={
          (k
            ? {
                minHeight: k,
              }
            : void 0) as RecoveredValue
        }
      >
        <div ref={O as RecoveredValue} className={`ui-mcc__main`}>
          <div className={`ui-mcc__panel`}>
            <ComponentR
              agents={G.map(J)}
              now={now}
              title={`Agents`}
              highlight={j}
              onResolve={(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
                R(e.id, t)
              }
              key={E}
            />
          </div>
        </div>
        <aside className={`ui-mcc__side`}>
          <ComponentI
            tasks={Y}
            view={`list`}
            lanes={[`needs`]}
            highlight={
              j && Y.some((e?: RecoveredValue): RecoveredValue => e.id === j) ? j : null
            }
            title={`Inbox`}
            onApprove={(e?: RecoveredValue): RecoveredValue => R(X(e).id, `approve`)}
            onReject={(e?: RecoveredValue): RecoveredValue => R(X(e).id, `reject`)}
            onRetry={(e?: RecoveredValue): RecoveredValue => R(X(e).id, `retry`)}
          />
        </aside>
      </div>
    </section>
  );
}
var ComponentM: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 1200 1200`} aria-hidden={`true`}>
      <path
        fill={`#D97757`}
        d={`M 233.959793 800.214905 L 468.644287 668.536987 L 472.590637 657.100647 L 468.644287 650.738403 L 457.208069 650.738403 L 417.986633 648.322144 L 283.892639 644.69812 L 167.597321 639.865845 L 54.926208 633.825623 L 26.577238 627.785339 L 3.3e-05 592.751709 L 2.73832 575.27533 L 26.577238 559.248352 L 60.724873 562.228149 L 136.187973 567.382629 L 249.422867 575.194763 L 331.570496 580.026978 L 453.261841 592.671082 L 472.590637 592.671082 L 475.328857 584.859009 L 468.724915 580.026978 L 463.570557 575.194763 L 346.389313 495.785217 L 219.543671 411.865906 L 153.100723 363.543762 L 117.181267 339.060425 L 99.060455 316.107361 L 91.248367 266.01355 L 123.865784 230.093994 L 167.677887 233.073853 L 178.872513 236.053772 L 223.248367 270.201477 L 318.040283 343.570496 L 441.825592 434.738342 L 459.946411 449.798706 L 467.194672 444.64447 L 468.080597 441.020203 L 459.946411 427.409485 L 392.617493 305.718323 L 320.778564 181.932983 L 288.80542 130.630859 L 280.348999 99.865845 C 277.369171 87.221436 275.194641 76.590698 275.194641 63.624268 L 312.322174 13.20813 L 332.8591 6.604126 L 382.389313 13.20813 L 403.248352 31.328979 L 434.013519 101.71814 L 483.865753 212.537048 L 561.181274 363.221497 L 583.812134 407.919434 L 595.892639 449.315491 L 600.40271 461.959839 L 608.214783 461.959839 L 608.214783 454.711609 L 614.577271 369.825623 L 626.335632 265.61084 L 637.771851 131.516846 L 641.718201 93.745117 L 660.402832 48.483276 L 697.530334 24.000122 L 726.52356 37.852417 L 750.362549 72 L 747.060486 94.067139 L 732.886047 186.201416 L 705.100708 330.52356 L 686.979919 427.167847 L 697.530334 427.167847 L 709.61084 415.087341 L 758.496704 350.174561 L 840.644348 247.490051 L 876.885925 206.738342 L 919.167847 161.71814 L 946.308838 140.29541 L 997.61084 140.29541 L 1035.38269 196.429626 L 1018.469849 254.416199 L 965.637634 321.422852 L 921.825562 378.201538 L 859.006714 462.765259 L 819.785278 530.41626 L 823.409424 535.812073 L 832.75177 534.92627 L 974.657776 504.724915 L 1051.328979 490.872559 L 1142.818848 475.167786 L 1184.214844 494.496582 L 1188.724854 514.147644 L 1172.456421 554.335693 L 1074.604126 578.496765 L 959.838989 601.449829 L 788.939636 641.879272 L 786.845764 643.409485 L 789.261841 646.389343 L 866.255127 653.637634 L 899.194702 655.409424 L 979.812134 655.409424 L 1129.932861 666.604187 L 1169.154419 692.537109 L 1192.671265 724.268677 L 1188.724854 748.429688 L 1128.322144 779.194641 L 1046.818848 759.865845 L 856.590759 714.604126 L 791.355774 698.335754 L 782.335693 698.335754 L 782.335693 703.731567 L 836.69812 756.885986 L 936.322205 846.845581 L 1061.073975 962.81897 L 1067.436279 991.490112 L 1051.409424 1014.120911 L 1034.496704 1011.704712 L 924.885986 929.234924 L 882.604126 892.107544 L 786.845764 811.48999 L 780.483276 811.48999 L 780.483276 819.946289 L 802.550415 852.241699 L 919.087341 1027.409424 L 925.127625 1081.127686 L 916.671204 1098.604126 L 886.469849 1109.154419 L 853.288696 1103.114136 L 785.073914 1007.355835 L 714.684631 899.516785 L 657.906067 802.872498 L 650.979858 806.81897 L 617.476624 1167.704834 L 601.771851 1186.147705 L 565.530212 1200 L 535.328857 1177.046997 L 519.302124 1139.919556 L 535.328857 1066.550537 L 554.657776 970.792053 L 570.362488 894.68457 L 584.536926 800.134277 L 592.993347 768.724976 L 592.429626 766.630859 L 585.503479 767.516968 L 514.22821 865.369263 L 405.825531 1011.865906 L 320.053711 1103.677979 L 299.516815 1111.812256 L 263.919525 1093.369263 L 267.221497 1060.429688 L 287.114136 1031.114136 L 405.825531 880.107361 L 477.422913 786.52356 L 523.651062 732.483276 L 523.328918 724.671265 L 520.590698 724.671265 L 205.288605 929.395935 L 149.154434 936.644409 L 124.993355 914.01355 L 127.973183 876.885986 L 139.409409 864.80542 L 234.201385 799.570435 L 233.879227 799.8927 Z`}
      />
    </svg>
  ),
  ComponentH_demo_clean_GS1OgCKi: RecoveredValue = (): RecoveredValue => (
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
  ComponentG: RecoveredValue = (): RecoveredValue => {
    let e: RecoveredValue =
      `gm` + (0, a_demo_clean_GS1OgCKi.useId)().replace(/[^a-zA-Z0-9_-]/g, ``);
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
  Component__demo_clean_GS1OgCKi: RecoveredValue = (): RecoveredValue => (
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
  ComponentV: RecoveredValue = (): RecoveredValue => (
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
  ComponentY: RecoveredValue = (): RecoveredValue => (
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
  ComponentB: RecoveredValue = (): RecoveredValue => (
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
  ComponentX_demo_clean_GS1OgCKi: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} fill={`#FF7A59`} aria-hidden={`true`}>
      <path
        d={`M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`}
      />
    </svg>
  ),
  S_demo_clean_GS1OgCKi: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
      <rect width={`24`} height={`24`} rx={`6`} fill={`#635BFF`} />
      <path
        fill={`#fff`}
        transform={`translate(5 5) scale(0.5833)`}
        d={`M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z`}
      />
    </svg>
  ),
  C_demo_clean_GS1OgCKi: RecoveredValue = 6e4,
  w_demo_clean_GS1OgCKi: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = (t?: RecoveredValue): RecoveredValue =>
      e - t * C_demo_clean_GS1OgCKi;
    return {
      agents: [
        {
          id: `launch`,
          name: `Launch lead`,
          model: `Opus 5.5`,
          avatar: <ComponentM />,
          tools: [<ComponentY key={`s`} />, <Component__demo_clean_GS1OgCKi key={`n`} />],
          status: `running`,
          task: `Launch the new pricing page by Friday`,
          cost: 1.42,
          started: t(26),
          children: [
            {
              id: `research`,
              name: `Researcher`,
              model: `Sonnet 5.5`,
              avatar: <ComponentM />,
              tools: [<Component__demo_clean_GS1OgCKi key={`n`} />],
              status: `done`,
              task: `Compare the pricing of five competitors`,
              cost: 0.18,
              started: t(24),
              ended: t(9),
            },
            {
              id: `writer`,
              name: `Writer`,
              model: `Sonnet 5.5`,
              avatar: <ComponentM />,
              tools: [<ComponentB key={`f`} />],
              status: `running`,
              task: `Write the copy for the three plans`,
              cost: 0.21,
              started: t(18),
            },
            {
              id: `release`,
              name: `Release`,
              model: `GPT-6 Sol`,
              avatar: <ComponentH_demo_clean_GS1OgCKi />,
              tools: [<ComponentV key={`g`} />],
              status: `waiting`,
              task: `Merge the checkout fix`,
              ask: `All 212 tests are green – merge to main?`,
              cost: 0.34,
              started: t(14),
            },
          ],
        },
        {
          id: `support`,
          name: `Support lead`,
          model: `Sonnet 5.5`,
          avatar: <ComponentM />,
          tools: [<ComponentX_demo_clean_GS1OgCKi key={`h`} />, <ComponentY key={`s`} />],
          status: `running`,
          task: `Answer the open tickets in the queue`,
          cost: 0.96,
          started: t(29),
          children: [
            {
              id: `billing`,
              name: `Billing`,
              model: `Sonnet 5.5`,
              avatar: <ComponentM />,
              tools: [<S_demo_clean_GS1OgCKi key={`s`} />],
              status: `failed`,
              task: `Refund $240 to Acme Corp`,
              error: `Stripe declined the refund – the card on file expired`,
              cost: 0.06,
              started: t(21),
              ended: t(17),
            },
          ],
        },
        {
          id: `ops`,
          name: `Ops`,
          model: `Gemini 3.8 Flash`,
          avatar: <ComponentG />,
          tools: [<S_demo_clean_GS1OgCKi key={`s`} />, <ComponentV key={`g`} />],
          status: `waiting`,
          task: `Rotate the API keys`,
          ask: `Rotate the Stripe keys in production now?`,
          cost: 0.05,
          started: t(11),
        },
      ],
      events: [
        {
          id: `e1`,
          agent: `support`,
          at: t(40),
          kind: `done`,
          title: `Answered support tickets`,
          detail: `first reply in 2 min`,
          count: 38,
          logo: <ComponentY />,
        },
        {
          id: `e2`,
          agent: `research`,
          at: t(9),
          kind: `done`,
          title: `Compared competitor pricing`,
          detail: `5 companies`,
          logo: <Component__demo_clean_GS1OgCKi />,
        },
        {
          id: `e3`,
          agent: `ops`,
          at: t(23),
          kind: `done`,
          title: `Synced the CRM`,
          count: 1312,
          logo: <ComponentX_demo_clean_GS1OgCKi />,
        },
        {
          id: `e4`,
          agent: `billing`,
          at: t(17),
          kind: `failed`,
          title: `Refund to Acme Corp`,
          detail: `card on file expired`,
          logo: <S_demo_clean_GS1OgCKi />,
        },
        {
          id: `e5`,
          agent: `release`,
          at: t(14),
          kind: `needs`,
          title: `Merge the checkout fix`,
          detail: `all 212 tests green`,
          logo: <ComponentV />,
        },
        {
          id: `e6`,
          agent: `writer`,
          at: t(36),
          kind: `done`,
          title: `Drafted the plan names`,
          count: 3,
          logo: <ComponentB />,
        },
        {
          id: `e7`,
          agent: `ops`,
          at: t(11),
          kind: `needs`,
          title: `Rotate the API keys`,
          detail: `production`,
          logo: <S_demo_clean_GS1OgCKi />,
        },
      ],
    };
  },
  T_demo_clean_GS1OgCKi: RecoveredValue = 10,
  E_demo_clean_GS1OgCKi: RecoveredValue = 45 * C_demo_clean_GS1OgCKi,
  D_demo_clean_GS1OgCKi: RecoveredValue = 2 * C_demo_clean_GS1OgCKi,
  O_demo_clean_GS1OgCKi: RecoveredValue = [
    {
      agent: `support`,
      title: `Answered support tickets`,
      count: 6,
      logo: <ComponentY />,
      next: `Answer the next tickets`,
      tools: [<ComponentX_demo_clean_GS1OgCKi key={`h`} />],
    },
    {
      agent: `writer`,
      title: `Drafted the plan copy`,
      detail: `three plans`,
      logo: <ComponentB />,
      next: `Tighten the FAQ`,
      tools: [<ComponentB key={`f`} />, <Component__demo_clean_GS1OgCKi key={`n`} />],
    },
    {
      agent: `launch`,
      title: `Shared the launch plan`,
      detail: `in #launch`,
      logo: <ComponentY />,
      next: `Coordinate the team`,
      tools: [<ComponentY key={`s`} />],
    },
  ],
  k_demo_clean_GS1OgCKi: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue =>
    e.map((e?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = t(e);
      return n.children
        ? {
            ...n,
            children: k_demo_clean_GS1OgCKi(n.children, t),
          }
        : n;
    }),
  A_demo_clean_GS1OgCKi: RecoveredValue = (
    { agents, events }: RecoveredValue,
    n?: RecoveredValue,
    r?: RecoveredValue,
  ): RecoveredValue => {
    let i: RecoveredValue = O_demo_clean_GS1OgCKi[n % O_demo_clean_GS1OgCKi.length],
      a: RecoveredValue = !1,
      o: RecoveredValue = k_demo_clean_GS1OgCKi(
        agents,
        (e?: RecoveredValue): RecoveredValue =>
          e.id !== i.agent || e.status !== `running`
            ? e
            : ((a = !0),
              {
                ...e,
                cost: (e.cost ?? 0) + 0.04,
              }),
      );
    if (!a)
      return {
        agents: agents,
        events: events,
      };
    let { next: s, tools: c, ...l }: RecoveredValue = i;
    return {
      agents: o,
      events: [
        ...events.filter(
          (e?: RecoveredValue): RecoveredValue =>
            +new Date(e.at) > r - E_demo_clean_GS1OgCKi - C_demo_clean_GS1OgCKi,
        ),
        {
          ...l,
          id: `live-${n}`,
          at: r,
          kind: `done`,
        },
      ],
    };
  },
  j_demo_clean_GS1OgCKi: RecoveredValue = 1100,
  M_demo_clean_GS1OgCKi: RecoveredValue = 640;
function Runtime(): RecoveredValue {
  let [e]: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useState)(
      (): RecoveredValue => Date.now(),
    ),
    [t, n]: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useState)(e),
    [r, i]: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useState)(
      (): RecoveredValue => w_demo_clean_GS1OgCKi(e),
    ),
    s: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useRef)(0);
  (0, a_demo_clean_GS1OgCKi.useEffect)((): RecoveredValue => {
    let t: RecoveredValue = window.setInterval(
      (): RecoveredValue => {
        let t: RecoveredValue = e + (Date.now() - e) * T_demo_clean_GS1OgCKi,
          r: RecoveredValue = Math.floor((t - e) / D_demo_clean_GS1OgCKi),
          o: RecoveredValue = s.current;
        ((s.current = Math.max(o, r)),
          (0, a_demo_clean_GS1OgCKi.startTransition)((): RecoveredValue => {
            (r > o &&
              i((t?: RecoveredValue): RecoveredValue => {
                let n: RecoveredValue = t;
                for (let t: RecoveredValue = o; t < r; t++)
                  n = A_demo_clean_GS1OgCKi(n, t, e + (t + 1) * D_demo_clean_GS1OgCKi);
                return n;
              }),
              n(t));
          }));
      },
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches ? 1e3 : 125,
    );
    return (): RecoveredValue => window.clearInterval(t);
  }, [e]);
  let c: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useRef)(null),
    l: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useRef)(null),
    [u, d]: RecoveredValue = (0, a_demo_clean_GS1OgCKi.useState)({
      scale: 0,
      h: 0,
      w: 0,
    });
  (0, a_demo_clean_GS1OgCKi.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = c.current,
      t: RecoveredValue = l.current;
    if (!e || !t) return;
    let n: RecoveredValue = !!e.closest(`.card__preview`),
      r: RecoveredValue = (): RecoveredValue => {
        let r: RecoveredValue = n
          ? Math.max(e.clientWidth, M_demo_clean_GS1OgCKi)
          : e.clientWidth;
        d({
          scale:
            r < M_demo_clean_GS1OgCKi
              ? 1
              : Math.min(1.25, e.clientWidth / j_demo_clean_GS1OgCKi),
          h: t.offsetHeight,
          w: r,
        });
      };
    r();
    let i: RecoveredValue = new ResizeObserver(r);
    return (i.observe(e), i.observe(t), (): RecoveredValue => i.disconnect());
  }, []);
  let p: RecoveredValue = u.w > 0 && u.w < M_demo_clean_GS1OgCKi;
  return (
    <div className={`mc-demo`}>
      <div
        ref={c as RecoveredValue}
        className={`mc-demo__frame`}
        style={
          {
            height: u.h * u.scale || void 0,
          } as RecoveredValue
        }
      >
        <div
          ref={l as RecoveredValue}
          className={`mc-demo__canvas`}
          style={
            {
              width: p ? u.w : j_demo_clean_GS1OgCKi,
              transform: `scale(${u.scale || 1})`,
              visibility: u.scale ? void 0 : `hidden`,
            } as RecoveredValue
          }
        >
          <ComponentF
            agents={r.agents}
            events={r.events.filter(
              (e?: RecoveredValue): RecoveredValue =>
                +new Date(e.at) >= t - E_demo_clean_GS1OgCKi,
            )}
            since={t - E_demo_clean_GS1OgCKi}
            now={t}
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
