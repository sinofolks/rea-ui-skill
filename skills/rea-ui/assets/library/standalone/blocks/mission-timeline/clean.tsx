"use client";

import "./MissionTimeline.clean.css";
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
  f: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
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
              w: f(e),
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
  m: RecoveredValue = new Intl.NumberFormat(`en`),
  h: RecoveredValue = {
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
          h.subs.add(t),
          (h.id ||= window.setInterval(
            (): RecoveredValue =>
              h.subs.forEach((e?: RecoveredValue): RecoveredValue => e()),
            1e3,
          )),
          (): RecoveredValue => {
            (h.subs.delete(t), h.subs.size || (window.clearInterval(h.id), (h.id = 0)));
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
  C_component_clean_BXBQJTQe: RecoveredValue = (): RecoveredValue => (
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
function ComponentR({
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
                  <span title={`Sources read: ${m.format(c)}`}>
                    <ComponentW />
                    {p_component_clean_BXBQJTQe.format(c)}
                  </span>
                )}
                {l !== void 0 && (
                  <span title={`Tool calls: ${m.format(l)}`}>
                    <C_component_clean_BXBQJTQe />
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
                    title={Q[e.id] > 999 ? m.format(Q[e.id]) : void 0}
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
var n_component_clean_HB_NkCs9: RecoveredValue = t_react_BkAXpnfr(),
  r_component_clean_HB_NkCs9: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_clean_HB_NkCs9: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    typeof e == `number` ? e : e.getTime(),
  a_component_clean_HB_NkCs9: RecoveredValue = 6e4,
  o_component_clean_HB_NkCs9: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = Math.max(0, Math.round(e / a_component_clean_HB_NkCs9));
    if (t < 60) return `${t}m`;
    let n: RecoveredValue = Math.floor(t / 60);
    return n < 24
      ? t % 60
        ? `${n}h ${t % 60}m`
        : `${n}h`
      : n % 24
        ? `${Math.floor(n / 24)}d ${n % 24}h`
        : `${Math.floor(n / 24)}d`;
  },
  s_component_clean_HB_NkCs9: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e
      .split(/\s+/)
      .map(
        (e?: RecoveredValue): RecoveredValue =>
          (Array.from(e) as RecoveredValue[]).find(
            (e?: RecoveredValue): RecoveredValue => /[\p{L}\p{N}]/u.test(e),
          ),
      )
      .filter(Boolean)
      .join(``)
      .slice(0, 2)
      .toUpperCase(),
  c_component_clean_HB_NkCs9: RecoveredValue = [
    1, 5, 10, 15, 30, 60, 120, 180, 360, 720, 1440,
  ],
  l_component_clean_HB_NkCs9: RecoveredValue = {
    done: `Done`,
    running: `Running`,
    waiting: `Needs you`,
    failed: `Failed`,
  },
  u_component_clean_HB_NkCs9: RecoveredValue = 48,
  d_component_clean_HB_NkCs9: RecoveredValue = 420,
  ComponentF: RecoveredValue = (): RecoveredValue => (
    <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
      <path
        d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
        fill={`currentColor`}
      />
      <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
    </svg>
  ),
  ComponentP: RecoveredValue = (): RecoveredValue => (
    <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
      <path d={`M6 1.8 10.8 10H1.2L6 1.8Z`} fill={`currentColor`} />
    </svg>
  );
function ComponentI({
  agents,
  tasks,
  span = 30 * a_component_clean_HB_NkCs9,
  now,
  onApprove,
  onReject,
  onOpen,
  title = `Agents`,
  highlight,
  className,
}: RecoveredValue): RecoveredValue {
  let C: RecoveredValue = (0, n_component_clean_HB_NkCs9.useId)(),
    [w, T]: RecoveredValue = (0, n_component_clean_HB_NkCs9.useState)(
      (): RecoveredValue => Date.now(),
    ),
    [E, D]: RecoveredValue = (0, n_component_clean_HB_NkCs9.useState)(null),
    [O, k]: RecoveredValue = (0, n_component_clean_HB_NkCs9.useState)({}),
    A: RecoveredValue = (0, n_component_clean_HB_NkCs9.useRef)(null);
  (0, n_component_clean_HB_NkCs9.useEffect)((): RecoveredValue => {
    if (now !== void 0) return;
    let e: RecoveredValue = window.setInterval((): RecoveredValue => T(Date.now()), 250);
    return (): RecoveredValue => window.clearInterval(e);
  }, [now]);
  let j: RecoveredValue = now ?? w,
    M: RecoveredValue = j - span,
    N: RecoveredValue = (0, n_component_clean_HB_NkCs9.useRef)(null),
    P: RecoveredValue = (0, n_component_clean_HB_NkCs9.useRef)(new Map()),
    F: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        if (!t) return;
        let n: RecoveredValue = P.current.get(e) ?? new Set();
        (n.add(t), P.current.set(e, n));
      },
    I: RecoveredValue = (0, n_component_clean_HB_NkCs9.useRef)(null),
    L: RecoveredValue = agents.map((e?: RecoveredValue): RecoveredValue => e.id).join(`
`);
  (0, n_component_clean_HB_NkCs9.useLayoutEffect)((): RecoveredValue => {
    let t: RecoveredValue = N.current;
    if (!t) return;
    for (let [e, t] of P.current)
      for (let n of t) n.isConnected || (t.delete(n), t.size || P.current.delete(e));
    let n: RecoveredValue = new Map(
        agents.map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => [
            e.id,
            t * u_component_clean_HB_NkCs9,
          ],
        ),
      ),
      r: RecoveredValue = t.offsetHeight,
      i: RecoveredValue = I.current;
    if (
      ((I.current = {
        h: r,
        rows: n,
      }),
      !i || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)
    )
      return;
    let a: RecoveredValue = {
      duration: d_component_clean_HB_NkCs9,
      easing: `cubic-bezier(0.32, 0.72, 0.24, 1)`,
    };
    i.h !== r &&
      ((t.style.overflow = `hidden`),
      t
        .animate(
          [
            {
              height: `${i.h}px`,
            },
            {
              height: `${r}px`,
            },
          ],
          a,
        )
        .finished.then(
          (): RecoveredValue => (t.style.overflow = ``),
          (): RecoveredValue => void 0,
        ));
    for (let [e, t] of n) {
      let n: RecoveredValue = i.rows.get(e);
      for (let r of P.current.get(e) ?? [])
        n === void 0
          ? r.animate(
              [
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                },
              ],
              {
                ...a,
                delay: d_component_clean_HB_NkCs9 / 3,
              },
            )
          : n !== t &&
            r.animate(
              [
                {
                  transform: `translateY(${n - t}px)`,
                },
                {
                  transform: `none`,
                },
              ],
              a,
            );
    }
  }, [L]);
  let R: RecoveredValue = tasks.map(
      (e?: RecoveredValue): RecoveredValue =>
        O[e.id]
          ? {
              ...e,
              ...O[e.id],
            }
          : e,
    ),
    z: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      D(null);
      let n: RecoveredValue = t ? onApprove : onReject;
      if (n) return n(e);
      k(
        (n?: RecoveredValue): RecoveredValue => ({
          ...n,
          [e.id]: t
            ? {
                status: `running`,
              }
            : {
                status: `failed`,
                end: j,
              },
        }),
      );
    },
    B: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      Math.min(100, ((e - M) / span) * 100),
    V: RecoveredValue = (0, n_component_clean_HB_NkCs9.useRef)(j).current,
    H: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      ((e - V) / span) * 100 + 100,
    U: RecoveredValue = ((j - V) / span) * 100,
    W: RecoveredValue = R.filter(
      (e?: RecoveredValue): RecoveredValue =>
        (e.end === void 0 ? j : i_component_clean_HB_NkCs9(e.end)) > M,
    ),
    G: RecoveredValue = (0, n_component_clean_HB_NkCs9.useMemo)((): RecoveredValue => {
      let e: RecoveredValue =
          (c_component_clean_HB_NkCs9.find(
            (e?: RecoveredValue): RecoveredValue =>
              span / (e * a_component_clean_HB_NkCs9) <= 6,
          ) ?? Math.ceil(span / (8640 * a_component_clean_HB_NkCs9)) * 1440) *
          a_component_clean_HB_NkCs9,
        t: RecoveredValue = [];
      for (let n: RecoveredValue = span - e; n > 0; n -= e) t.push(n);
      return {
        step: e,
        ago: t,
      };
    }, [span]),
    K: RecoveredValue = (t?: RecoveredValue): RecoveredValue =>
      agents.findIndex((e?: RecoveredValue): RecoveredValue => e.id === t),
    q: RecoveredValue = W.flatMap((e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.handoffTo
        ? R.find((t?: RecoveredValue): RecoveredValue => t.id === e.handoffTo)
        : void 0;
      if (!t) return [];
      let n: RecoveredValue =
          H(e.end === void 0 ? j : i_component_clean_HB_NkCs9(e.end)) * 10,
        r: RecoveredValue = H(i_component_clean_HB_NkCs9(t.start)) * 10,
        a: RecoveredValue =
          K(e.agentId) * u_component_clean_HB_NkCs9 + u_component_clean_HB_NkCs9 / 2,
        o: RecoveredValue =
          K(t.agentId) * u_component_clean_HB_NkCs9 + u_component_clean_HB_NkCs9 / 2;
      if (a < 0 || o < 0) return [];
      let s: RecoveredValue = Math.max(24, Math.abs(r - n) / 2);
      return [
        {
          id: `${e.id}>${t.id}`,
          d: `M ${n} ${a} C ${n + s} ${a}, ${r - s} ${o}, ${r} ${o}`,
          live: t.status === `running`,
        },
      ];
    });
  (0, n_component_clean_HB_NkCs9.useEffect)((): RecoveredValue => {
    if (!E) return;
    let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      e.target.closest?.(`[data-task="${E}"], .ui-alc__pop`) || D(null);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      (): RecoveredValue => document.removeEventListener(`pointerdown`, e)
    );
  }, [E]);
  let J: RecoveredValue = W.find((e?: RecoveredValue): RecoveredValue => e.id === E),
    Y: RecoveredValue = (0, n_component_clean_HB_NkCs9.useRef)({});
  for (let t of agents) {
    let e: RecoveredValue = R.find(
      (e?: RecoveredValue): RecoveredValue =>
        e.agentId === t.id && (e.status === `running` || e.status === `waiting`),
    );
    e?.status === `waiting`
      ? (Y.current[t.id] = `Needs you`)
      : e || (Y.current[t.id] = `Idle`);
  }
  let X: RecoveredValue = R.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `waiting`,
    ).length,
    Z: RecoveredValue = R.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `running`,
    ).length;
  return (
    <div
      ref={A as RecoveredValue}
      className={[`ui-alc`, className].filter(Boolean).join(` `)}
      onKeyDown={(e?: RecoveredValue): RecoveredValue => {
        e.key === `Escape` &&
          E &&
          (e.stopPropagation(),
          A.current?.querySelector(`[data-task="${E}"]`)?.focus(),
          D(null));
      }}
    >
      <div className={`ui-alc__card`}>
        <header className={`ui-alc__bar`}>
          <span className={`ui-alc__spark`}>
            <ComponentF />
          </span>
          <span className={`ui-alc__title`} title={title}>
            {title}
          </span>
          <span className={`ui-alc__summary`}>
            <span data-kind={`running`}>
              {Z}
              {` running`}
            </span>
            {X > 0 && (
              <span data-kind={`needs`}>
                {X}
                {` `}
                {X === 1 ? `needs` : `need`}
                {` you`}
              </span>
            )}
          </span>
          <span className={`ui-alc__window`}>
            {`Last `}
            {o_component_clean_HB_NkCs9(span)}
          </span>
        </header>
        <div
          ref={N as RecoveredValue}
          className={`ui-alc__body`}
          style={
            {
              "--rows": agents.length,
            } as RecoveredValue
          }
        >
          <ul className={`ui-alc__agents`}>
            {agents.map((e?: RecoveredValue): RecoveredValue => {
              let t: RecoveredValue = R.find(
                (t?: RecoveredValue): RecoveredValue =>
                  t.agentId === e.id &&
                  (t.status === `running` || t.status === `waiting`),
              );
              return (
                <li
                  ref={F(e.id) as RecoveredValue}
                  className={`ui-alc__agent`}
                  data-faded={highlight && e.id !== highlight ? `` : void 0}
                  key={e.id}
                >
                  <span className={`ui-alc__avatar`} data-logo={e.avatar ? `` : void 0}>
                    {e.avatar ?? s_component_clean_HB_NkCs9(e.name)}
                  </span>
                  <span className={`ui-alc__who`} data-state={t?.status ?? `idle`}>
                    <span className={`ui-alc__name-line`}>
                      <span className={`ui-alc__name`} dir={`auto`} title={e.name}>
                        {e.name}
                      </span>
                      <span
                        className={`ui-alc__state`}
                        data-show={t?.status === `running` ? void 0 : ``}
                        aria-hidden={t?.status === `running`}
                      >
                        <span>
                          {t?.status === `waiting`
                            ? `Needs you`
                            : t
                              ? (Y.current[e.id] ?? `Idle`)
                              : `Idle`}
                        </span>
                      </span>
                    </span>
                    <span className={`ui-alc__model`}>
                      {e.model && (
                        <span className={`ui-alc__model-name`} title={e.model}>
                          {e.model}
                        </span>
                      )}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className={`ui-alc__track`}>
            <div className={`ui-alc__grid`} aria-hidden={`true`}>
              {G.ago.map(
                (e?: RecoveredValue): RecoveredValue => (
                  <span
                    className={`ui-alc__tick`}
                    style={
                      {
                        left: `${100 - (e / span) * 100}%`,
                      } as RecoveredValue
                    }
                    children={
                      <span>
                        {`−`}
                        {o_component_clean_HB_NkCs9(e)}
                      </span>
                    }
                    key={e}
                  />
                ),
              )}
            </div>
            <div className={`ui-alc__clip`}>
              <div
                className={`ui-alc__layer`}
                style={
                  {
                    transform: `translateX(${-U}%)`,
                  } as RecoveredValue
                }
              >
                <svg
                  className={`ui-alc__curves`}
                  viewBox={`0 0 1000 ${agents.length * u_component_clean_HB_NkCs9}`}
                  preserveAspectRatio={`none`}
                  aria-hidden={`true`}
                >
                  {q.map(
                    (e?: RecoveredValue): RecoveredValue => (
                      <path
                        d={e.d}
                        data-live={e.live ? `` : void 0}
                        vectorEffect={`non-scaling-stroke`}
                        key={e.id}
                      />
                    ),
                  )}
                </svg>
                {agents.map(
                  (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                    <ul
                      ref={F(e.id) as RecoveredValue}
                      className={`ui-alc__lane`}
                      data-faded={highlight && e.id !== highlight ? `` : void 0}
                      style={
                        {
                          top: t * u_component_clean_HB_NkCs9,
                        } as RecoveredValue
                      }
                      aria-label={`${e.name}'s tasks`}
                      children={W.filter(
                        (t?: RecoveredValue): RecoveredValue => t.agentId === e.id,
                      ).map((t?: RecoveredValue): RecoveredValue => {
                        let n: RecoveredValue =
                            t.end === void 0 ? j : i_component_clean_HB_NkCs9(t.end),
                          a: RecoveredValue =
                            ((n - i_component_clean_HB_NkCs9(t.start)) / span) * 100,
                          s: RecoveredValue = o_component_clean_HB_NkCs9(
                            n - i_component_clean_HB_NkCs9(t.start),
                          ),
                          c: RecoveredValue = E === t.id,
                          u: RecoveredValue =
                            t.end === void 0 && i_component_clean_HB_NkCs9(t.start) < M
                              ? (M - i_component_clean_HB_NkCs9(t.start)) /
                                (n - i_component_clean_HB_NkCs9(t.start))
                              : 0;
                        return (
                          <li
                            className={`ui-alc__slot`}
                            data-status={t.status}
                            style={
                              {
                                left: `${H(i_component_clean_HB_NkCs9(t.start))}%`,
                                width: `${a}%`,
                              } as RecoveredValue
                            }
                            key={t.id}
                          >
                            <button
                              type={`button`}
                              data-task={t.id}
                              className={`ui-alc__block`}
                              data-status={t.status}
                              title={t.title}
                              style={
                                (u
                                  ? {
                                      paddingLeft: `calc(${u * 100}% + 40px)`,
                                    }
                                  : void 0) as RecoveredValue
                              }
                              data-open={c ? `` : void 0}
                              aria-expanded={c}
                              aria-controls={`${C}-${t.id}`}
                              aria-label={`${e.name}: ${t.title} – ${l_component_clean_HB_NkCs9[t.status]}${t.status === `done` ? `, took ${s}` : `, ${s}`}`}
                              onClick={(): RecoveredValue => D(c ? null : t.id)}
                            >
                              {t.tools && t.tools.length > 0 && (
                                <span className={`ui-alc__tools`} aria-hidden={`true`}>
                                  {t.tools.slice(0, 3).map(
                                    (
                                      e?: RecoveredValue,
                                      t?: RecoveredValue,
                                    ): RecoveredValue => (
                                      <span
                                        className={`ui-alc__tool`}
                                        children={e}
                                        key={t}
                                      />
                                    ),
                                  )}
                                </span>
                              )}
                              <span className={`ui-alc__label`} dir={`auto`}>
                                {t.title}
                              </span>
                            </button>
                            {t.status === `waiting` && (
                              <span className={`ui-alc__flag`} aria-hidden={`true`}>
                                <ComponentP />
                                {`Needs you`}
                              </span>
                            )}
                          </li>
                        );
                      })}
                      key={e.id}
                    />
                  ),
                )}
              </div>
            </div>
            {J &&
              ((): RecoveredValue => {
                let t: RecoveredValue = K(J.agentId),
                  n: RecoveredValue = t >= agents.length / 2,
                  a: RecoveredValue =
                    J.end === void 0 ? j : i_component_clean_HB_NkCs9(J.end),
                  s: RecoveredValue = agents[t];
                if (J.status === `waiting`)
                  return (
                    <div
                      className={`ui-alc__pop ui-alc__ask`}
                      id={`${C}-${J.id}`}
                      role={`dialog`}
                      aria-label={`Decide: ${J.title}`}
                      data-up={n ? `` : void 0}
                      style={
                        {
                          top: n
                            ? t * u_component_clean_HB_NkCs9 + 6
                            : (t + 1) * u_component_clean_HB_NkCs9 - 6,
                          right: `${100 - B(a)}%`,
                        } as RecoveredValue
                      }
                    >
                      <span className={`ui-alc__ask-title`} dir={`auto`}>
                        {J.title}
                      </span>
                      {J.ask && (
                        <span className={`ui-alc__ask-text`} dir={`auto`}>
                          {J.ask}
                        </span>
                      )}
                      <span className={`ui-alc__ask-actions`}>
                        <button
                          type={`button`}
                          className={`ui-alc__btn`}
                          onClick={(): RecoveredValue => z(J, !1)}
                        >{`Reject`}</button>
                        <button
                          type={`button`}
                          className={`ui-alc__btn ui-alc__btn--primary`}
                          autoFocus={!0}
                          onClick={(): RecoveredValue => z(J, !0)}
                        >{`Approve`}</button>
                      </span>
                    </div>
                  );
                let c: RecoveredValue =
                  (Math.max(0, B(i_component_clean_HB_NkCs9(J.start))) + B(a)) / 2;
                return (
                  <div
                    className={`ui-alc__pop ui-alc__tip`}
                    id={`${C}-${J.id}`}
                    role={`tooltip`}
                    data-up={n ? `` : void 0}
                    style={
                      {
                        top: n
                          ? t * u_component_clean_HB_NkCs9 + 6
                          : (t + 1) * u_component_clean_HB_NkCs9 - 6,
                        left: `${Math.max(14, Math.min(86, c))}%`,
                      } as RecoveredValue
                    }
                  >
                    <span className={`ui-alc__tip-head`}>
                      <span className={`ui-alc__tip-name`} dir={`auto`}>
                        {s?.name}
                      </span>
                      <span>
                        {`· `}
                        {l_component_clean_HB_NkCs9[J.status]}
                        {` · `}
                        {o_component_clean_HB_NkCs9(
                          a - i_component_clean_HB_NkCs9(J.start),
                        )}
                      </span>
                    </span>
                    {J.summary?.length ? (
                      <ul className={`ui-alc__tip-list`}>
                        {J.summary.map(
                          (e?: RecoveredValue): RecoveredValue => (
                            <li dir={`auto`} children={e} key={e} />
                          ),
                        )}
                      </ul>
                    ) : (
                      <span className={`ui-alc__tip-title`} dir={`auto`}>
                        {J.title}
                      </span>
                    )}
                    {onOpen && (
                      <button
                        type={`button`}
                        className={`ui-alc__tip-open`}
                        onClick={(): RecoveredValue => onOpen(J)}
                      >{`Open`}</button>
                    )}
                  </div>
                );
              })()}
            <span className={`ui-alc__now`} aria-hidden={`true`}>
              <span>{`now`}</span>
            </span>
          </div>
        </div>
      </div>
      <span className={`ui-alc__sr`} aria-live={`polite`}>
        {X > 0 ? `${X} task${X === 1 ? `` : `s`} need you` : `${Z} running`}
      </span>
    </div>
  );
}
var a_demo_clean_D8wNs_pl: RecoveredValue = t_react_BkAXpnfr(),
  o_demo_clean_D8wNs_pl: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  s_demo_clean_D8wNs_pl: RecoveredValue = [
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
  c_demo_clean_D8wNs_pl: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue =>
    t === `all` || e.status === t || (t === `waiting` && e.status === `failed`),
  l_demo_clean_D8wNs_pl: RecoveredValue = (e?: RecoveredValue): RecoveredValue => [
    e,
    ...(e.children ?? []).flatMap(l_demo_clean_D8wNs_pl),
  ],
  u_demo_clean_D8wNs_pl: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue => {
    let n: RecoveredValue = (e.children ?? [])
      .map((e?: RecoveredValue): RecoveredValue => u_demo_clean_D8wNs_pl(e, t))
      .filter((e?: RecoveredValue): RecoveredValue => !!e);
    return c_demo_clean_D8wNs_pl(e, t) || n.length
      ? {
          ...e,
          children: n,
        }
      : null;
  },
  d_demo_clean_D8wNs_pl: RecoveredValue = {
    approve: `running`,
    reject: `failed`,
    retry: `running`,
    dismiss: `done`,
  };
function ComponentF_demo_clean_D8wNs_pl({
  agents,
  events = [],
  since,
  now,
  span,
  filter,
  defaultFilter = `all`,
  onFilterChange,
  onApprove,
  onReject,
  onRetry,
  onDismiss,
  title = `Mission timeline`,
  className,
}: RecoveredValue): RecoveredValue {
  let [T, E]: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useState)(defaultFilter),
    D: RecoveredValue = filter ?? T,
    O: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (E(e), onFilterChange?.(e));
    },
    k: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useRef)(null),
    [A, j]: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useState)(0);
  (0, a_demo_clean_D8wNs_pl.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = k.current;
    if (!e || typeof ResizeObserver > `u`) return;
    let t: RecoveredValue = new ResizeObserver(
      (): RecoveredValue =>
        j((t?: RecoveredValue): RecoveredValue => Math.max(t, e.offsetHeight)),
    );
    return (t.observe(e), (): RecoveredValue => t.disconnect());
  }, []);
  let [M, N]: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useState)(null),
    [P, F]: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useState)({}),
    I: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = P[e.id],
        n: RecoveredValue = t && t.from === e.status ? t.to : e.status,
        r: RecoveredValue = n !== e.status;
      return {
        ...e,
        status: n,
        ask: n === `waiting` ? e.ask : void 0,
        error: n === `failed` ? (r ? `You rejected the request` : e.error) : void 0,
        tasks: r
          ? e.tasks?.map(
              (e?: RecoveredValue): RecoveredValue =>
                e.status === `waiting` || e.status === `failed`
                  ? {
                      ...e,
                      status:
                        n === `done` ? `done` : n === `failed` ? `failed` : `running`,
                      end: n === `running` ? void 0 : e.end,
                    }
                  : e,
            )
          : e.tasks,
        children: e.children?.map(I),
      };
    },
    L: RecoveredValue = agents.map(I),
    R: RecoveredValue = new Map(
      agents
        .flatMap(l_demo_clean_D8wNs_pl)
        .map((e?: RecoveredValue): RecoveredValue => [e.id, e]),
    ),
    z: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = R.get(e);
      n &&
        (F(
          (r?: RecoveredValue): RecoveredValue => ({
            ...r,
            [e]: {
              from: n.status,
              to: d_demo_clean_D8wNs_pl[t],
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
    B: RecoveredValue = new Set(
      Object.keys(P).filter(
        (e?: RecoveredValue): RecoveredValue =>
          L.flatMap(l_demo_clean_D8wNs_pl).some(
            (t?: RecoveredValue): RecoveredValue =>
              t.id === e && t.status !== `waiting` && t.status !== `failed`,
          ),
      ),
    ),
    V: RecoveredValue = events.map(
      (e?: RecoveredValue): RecoveredValue =>
        B.has(e.agent) && (e.kind === `needs` || e.kind === `failed`)
          ? {
              ...e,
              kind: `done`,
            }
          : e,
    ),
    H: RecoveredValue = L.flatMap(l_demo_clean_D8wNs_pl),
    U: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      H.filter((t?: RecoveredValue): RecoveredValue => c_demo_clean_D8wNs_pl(t, e))
        .length,
    W: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useRef)(null),
    G: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = s_demo_clean_D8wNs_pl.filter(
          (e?: RecoveredValue): RecoveredValue => e.id === `all` || U(e.id) > 0,
        ),
        n: RecoveredValue = t.findIndex(
          (e?: RecoveredValue): RecoveredValue => e.id === D,
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
      (O(i.id), W.current?.querySelector(`[data-kind="${i.id}"]`)?.focus());
    },
    K: RecoveredValue = L.map(
      (e?: RecoveredValue): RecoveredValue => u_demo_clean_D8wNs_pl(e, D),
    ).filter((e?: RecoveredValue): RecoveredValue => !!e),
    q: RecoveredValue = new Set(
      K.flatMap(l_demo_clean_D8wNs_pl)
        .filter((e?: RecoveredValue): RecoveredValue => c_demo_clean_D8wNs_pl(e, D))
        .map((e?: RecoveredValue): RecoveredValue => e.id),
    ),
    J: RecoveredValue = new Map(H.map((e?: RecoveredValue): RecoveredValue => [e.id, e])),
    Y: RecoveredValue = K.flatMap(l_demo_clean_D8wNs_pl).filter(
      (e?: RecoveredValue): RecoveredValue => q.has(e.id),
    ),
    X: RecoveredValue = Y.flatMap(
      (e?: RecoveredValue): RecoveredValue =>
        (e.tasks ?? []).map(
          (t?: RecoveredValue): RecoveredValue => ({
            id: t.id,
            agentId: e.id,
            title: t.title,
            status: t.status,
            start: t.start,
            end: t.end,
            tools: t.tools,
            ask: t.status === `waiting` ? e.ask : void 0,
          }),
        ),
    ),
    Z: RecoveredValue = H.filter(
      (e?: RecoveredValue): RecoveredValue =>
        q.has(e.id) && (e.status === `waiting` || e.status === `failed`),
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
    Q: RecoveredValue = (e?: RecoveredValue): RecoveredValue => J.get(e.id);
  return (
    <section
      className={[`ui-mtc`, className].filter(Boolean).join(` `)}
      aria-label={title}
    >
      <header className={`ui-mtc__bar`}>
        <h2 className={`ui-mtc__title`}>{title}</h2>
        <div
          ref={W as RecoveredValue}
          className={`ui-mtc__filter`}
          role={`radiogroup`}
          aria-label={`Show agents`}
          onKeyDown={G}
        >
          {s_demo_clean_D8wNs_pl.map((e?: RecoveredValue): RecoveredValue => {
            let t: RecoveredValue = U(e.id);
            return (
              <button
                type={`button`}
                role={`radio`}
                aria-checked={D === e.id}
                tabIndex={D === e.id ? 0 : -1}
                className={`ui-mtc__chip`}
                data-kind={e.id}
                disabled={t === 0 && e.id !== `all`}
                onClick={(): RecoveredValue => O(e.id)}
                key={e.id}
              >
                {e.label}
                <span className={`ui-mtc__n`}>{t}</span>
              </button>
            );
          })}
        </div>
      </header>
      <ComponentN
        events={V.filter((e?: RecoveredValue): RecoveredValue => q.has(e.agent))}
        since={since}
        until={now}
        board={!1}
        title={`Since you looked`}
        replay={0}
        onHover={(e?: RecoveredValue): RecoveredValue => N(e ? e.agent : null)}
      />
      <div
        className={`ui-mtc__grid`}
        style={
          (A
            ? {
                minHeight: A,
              }
            : void 0) as RecoveredValue
        }
      >
        <div ref={k as RecoveredValue} className={`ui-mtc__main`}>
          <ComponentI
            agents={Y.map(
              (e?: RecoveredValue): RecoveredValue => ({
                id: e.id,
                name: e.name,
                model: e.model,
                avatar: e.avatar,
              }),
            )}
            tasks={X}
            span={span}
            now={now}
            title={`Agents`}
            highlight={M}
            onApprove={(e?: RecoveredValue): RecoveredValue => z(e.agentId, `approve`)}
            onReject={(e?: RecoveredValue): RecoveredValue => z(e.agentId, `reject`)}
          />
        </div>
        <aside className={`ui-mtc__side`}>
          <ComponentR
            tasks={Z}
            view={`list`}
            lanes={[`needs`]}
            highlight={
              M && Z.some((e?: RecoveredValue): RecoveredValue => e.id === M) ? M : null
            }
            title={`Inbox`}
            onApprove={(e?: RecoveredValue): RecoveredValue => z(Q(e).id, `approve`)}
            onReject={(e?: RecoveredValue): RecoveredValue => z(Q(e).id, `reject`)}
            onRetry={(e?: RecoveredValue): RecoveredValue => z(Q(e).id, `retry`)}
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
  ComponentH_demo_clean_D8wNs_pl: RecoveredValue = (): RecoveredValue => (
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
      `gm` + (0, a_demo_clean_D8wNs_pl.useId)().replace(/[^a-zA-Z0-9_-]/g, ``);
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
  Component__demo_clean_D8wNs_pl: RecoveredValue = (): RecoveredValue => (
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
  ComponentX_demo_clean_D8wNs_pl: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} fill={`#FF7A59`} aria-hidden={`true`}>
      <path
        d={`M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`}
      />
    </svg>
  ),
  S_demo_clean_D8wNs_pl: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
      <rect width={`24`} height={`24`} rx={`6`} fill={`#635BFF`} />
      <path
        fill={`#fff`}
        transform={`translate(5 5) scale(0.5833)`}
        d={`M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z`}
      />
    </svg>
  ),
  C_demo_clean_D8wNs_pl: RecoveredValue = 6e4,
  w_demo_clean_D8wNs_pl: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = (t?: RecoveredValue): RecoveredValue =>
      e - t * C_demo_clean_D8wNs_pl;
    return {
      agents: [
        {
          id: `launch`,
          name: `Launch lead`,
          model: `Opus 5.5`,
          avatar: <ComponentM />,
          tools: [<ComponentY key={`s`} />, <Component__demo_clean_D8wNs_pl key={`n`} />],
          status: `running`,
          task: `Launch the new pricing page by Friday`,
          cost: 1.42,
          started: t(26),
          tasks: [
            {
              id: `plan`,
              title: `Plan the launch`,
              status: `done`,
              start: t(26),
              end: t(19),
              tools: [<Component__demo_clean_D8wNs_pl key={`n`} />],
            },
            {
              id: `steer`,
              title: `Coordinate the team`,
              status: `running`,
              start: t(18),
              tools: [<ComponentY key={`s`} />],
            },
          ],
          children: [
            {
              id: `research`,
              name: `Researcher`,
              model: `Sonnet 5.5`,
              avatar: <ComponentM />,
              tools: [<Component__demo_clean_D8wNs_pl key={`n`} />],
              status: `done`,
              task: `Compare the pricing of five competitors`,
              cost: 0.18,
              started: t(24),
              ended: t(9),
              tasks: [
                {
                  id: `compare`,
                  title: `Competitor pricing`,
                  status: `done`,
                  start: t(24),
                  end: t(9),
                  tools: [<Component__demo_clean_D8wNs_pl key={`n`} />],
                },
              ],
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
              tasks: [
                {
                  id: `copy`,
                  title: `Draft plan copy`,
                  status: `running`,
                  start: t(18),
                  tools: [
                    <ComponentB key={`f`} />,
                    <Component__demo_clean_D8wNs_pl key={`n`} />,
                  ],
                },
              ],
            },
            {
              id: `release`,
              name: `Release`,
              model: `GPT-6 Sol`,
              avatar: <ComponentH_demo_clean_D8wNs_pl />,
              tools: [<ComponentV key={`g`} />],
              status: `waiting`,
              task: `Merge the checkout fix`,
              ask: `All 212 tests are green – merge to main?`,
              cost: 0.34,
              started: t(14),
              tasks: [
                {
                  id: `merge`,
                  title: `Merge the checkout fix`,
                  status: `waiting`,
                  start: t(14),
                  tools: [<ComponentV key={`g`} />],
                },
              ],
            },
          ],
        },
        {
          id: `support`,
          name: `Support lead`,
          model: `Sonnet 5.5`,
          avatar: <ComponentM />,
          tools: [<ComponentX_demo_clean_D8wNs_pl key={`h`} />, <ComponentY key={`s`} />],
          status: `running`,
          task: `Answer the open tickets in the queue`,
          cost: 0.96,
          started: t(29),
          tasks: [
            {
              id: `queue`,
              title: `Answer 38 tickets`,
              status: `running`,
              start: t(29),
              tools: [<ComponentX_demo_clean_D8wNs_pl key={`h`} />],
            },
          ],
          children: [
            {
              id: `billing`,
              name: `Billing`,
              model: `Sonnet 5.5`,
              avatar: <ComponentM />,
              tools: [<S_demo_clean_D8wNs_pl key={`s`} />],
              status: `failed`,
              task: `Refund $240 to Acme Corp`,
              error: `Stripe declined the refund – the card on file expired`,
              cost: 0.06,
              started: t(21),
              ended: t(17),
              tasks: [
                {
                  id: `refund`,
                  title: `Refund Acme Corp`,
                  status: `failed`,
                  start: t(21),
                  end: t(17),
                  tools: [<S_demo_clean_D8wNs_pl key={`s`} />],
                },
              ],
            },
          ],
        },
        {
          id: `ops`,
          name: `Ops`,
          model: `Gemini 3.8 Flash`,
          avatar: <ComponentG />,
          tools: [<S_demo_clean_D8wNs_pl key={`s`} />, <ComponentV key={`g`} />],
          status: `waiting`,
          task: `Rotate the API keys`,
          ask: `Rotate the Stripe keys in production now?`,
          cost: 0.05,
          started: t(11),
          tasks: [
            {
              id: `crm`,
              title: `Sync CRM`,
              status: `done`,
              start: t(28),
              end: t(23),
              tools: [<ComponentX_demo_clean_D8wNs_pl key={`h`} />],
            },
            {
              id: `keys`,
              title: `Rotate API keys`,
              status: `waiting`,
              start: t(11),
              tools: [<S_demo_clean_D8wNs_pl key={`s`} />, <ComponentV key={`g`} />],
            },
          ],
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
          logo: <Component__demo_clean_D8wNs_pl />,
        },
        {
          id: `e3`,
          agent: `ops`,
          at: t(23),
          kind: `done`,
          title: `Synced the CRM`,
          count: 1312,
          logo: <ComponentX_demo_clean_D8wNs_pl />,
        },
        {
          id: `e4`,
          agent: `billing`,
          at: t(17),
          kind: `failed`,
          title: `Refund to Acme Corp`,
          detail: `card on file expired`,
          logo: <S_demo_clean_D8wNs_pl />,
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
          logo: <S_demo_clean_D8wNs_pl />,
        },
      ],
    };
  },
  T_demo_clean_D8wNs_pl: RecoveredValue = 10,
  E_demo_clean_D8wNs_pl: RecoveredValue = 45 * C_demo_clean_D8wNs_pl,
  D_demo_clean_D8wNs_pl: RecoveredValue = 2 * C_demo_clean_D8wNs_pl,
  O_demo_clean_D8wNs_pl: RecoveredValue = [
    {
      agent: `support`,
      title: `Answered support tickets`,
      count: 6,
      logo: <ComponentY />,
      next: `Answer the next tickets`,
      tools: [<ComponentX_demo_clean_D8wNs_pl key={`h`} />],
    },
    {
      agent: `writer`,
      title: `Drafted the plan copy`,
      detail: `three plans`,
      logo: <ComponentB />,
      next: `Tighten the FAQ`,
      tools: [<ComponentB key={`f`} />, <Component__demo_clean_D8wNs_pl key={`n`} />],
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
  k_demo_clean_D8wNs_pl: RecoveredValue = (
    e?: RecoveredValue,
    t?: RecoveredValue,
  ): RecoveredValue =>
    e.map((e?: RecoveredValue): RecoveredValue => {
      let n: RecoveredValue = t(e);
      return n.children
        ? {
            ...n,
            children: k_demo_clean_D8wNs_pl(n.children, t),
          }
        : n;
    }),
  A_demo_clean_D8wNs_pl: RecoveredValue = (
    { agents, events }: RecoveredValue,
    n?: RecoveredValue,
    r?: RecoveredValue,
  ): RecoveredValue => {
    let i: RecoveredValue = O_demo_clean_D8wNs_pl[n % O_demo_clean_D8wNs_pl.length],
      a: RecoveredValue = !1,
      o: RecoveredValue = k_demo_clean_D8wNs_pl(
        agents,
        (e?: RecoveredValue): RecoveredValue => {
          if (e.id !== i.agent || e.status !== `running`) return e;
          a = !0;
          let t: RecoveredValue = (e.tasks ?? [])
            .filter(
              (e?: RecoveredValue): RecoveredValue =>
                e.end === void 0 || e.end > r - 40 * C_demo_clean_D8wNs_pl,
            )
            .map(
              (e?: RecoveredValue): RecoveredValue =>
                e.status === `running`
                  ? {
                      ...e,
                      status: `done`,
                      end: r,
                    }
                  : e,
            );
          return {
            ...e,
            cost: (e.cost ?? 0) + 0.04,
            tasks: [
              ...t,
              {
                id: `${i.agent}-${n}`,
                title: i.next,
                status: `running`,
                start: r,
                tools: i.tools,
              },
            ],
          };
        },
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
            +new Date(e.at) > r - E_demo_clean_D8wNs_pl - C_demo_clean_D8wNs_pl,
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
  j_demo_clean_D8wNs_pl: RecoveredValue = 1100,
  M_demo_clean_D8wNs_pl: RecoveredValue = 640;
function Runtime(): RecoveredValue {
  let [e]: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useState)(
      (): RecoveredValue => Date.now(),
    ),
    [t, n]: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useState)(e),
    [r, i]: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useState)(
      (): RecoveredValue => w_demo_clean_D8wNs_pl(e),
    ),
    s: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useRef)(0);
  (0, a_demo_clean_D8wNs_pl.useEffect)((): RecoveredValue => {
    let t: RecoveredValue = window.setInterval(
      (): RecoveredValue => {
        let t: RecoveredValue = e + (Date.now() - e) * T_demo_clean_D8wNs_pl,
          r: RecoveredValue = Math.floor((t - e) / D_demo_clean_D8wNs_pl),
          o: RecoveredValue = s.current;
        ((s.current = Math.max(o, r)),
          (0, a_demo_clean_D8wNs_pl.startTransition)((): RecoveredValue => {
            (r > o &&
              i((t?: RecoveredValue): RecoveredValue => {
                let n: RecoveredValue = t;
                for (let t: RecoveredValue = o; t < r; t++)
                  n = A_demo_clean_D8wNs_pl(n, t, e + (t + 1) * D_demo_clean_D8wNs_pl);
                return n;
              }),
              n(t));
          }));
      },
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches ? 1e3 : 125,
    );
    return (): RecoveredValue => window.clearInterval(t);
  }, [e]);
  let c: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useRef)(null),
    l: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useRef)(null),
    [u, d]: RecoveredValue = (0, a_demo_clean_D8wNs_pl.useState)({
      scale: 0,
      h: 0,
      w: 0,
    });
  (0, a_demo_clean_D8wNs_pl.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = c.current,
      t: RecoveredValue = l.current;
    if (!e || !t) return;
    let n: RecoveredValue = !!e.closest(`.card__preview`),
      r: RecoveredValue = (): RecoveredValue => {
        let r: RecoveredValue = n
          ? Math.max(e.clientWidth, M_demo_clean_D8wNs_pl)
          : e.clientWidth;
        d({
          scale:
            r < M_demo_clean_D8wNs_pl
              ? 1
              : Math.min(1.25, e.clientWidth / j_demo_clean_D8wNs_pl),
          h: t.offsetHeight,
          w: r,
        });
      };
    r();
    let i: RecoveredValue = new ResizeObserver(r);
    return (i.observe(e), i.observe(t), (): RecoveredValue => i.disconnect());
  }, []);
  let p: RecoveredValue = u.w > 0 && u.w < M_demo_clean_D8wNs_pl;
  return (
    <div className={`mt-demo`}>
      <div
        ref={c as RecoveredValue}
        className={`mt-demo__frame`}
        style={
          {
            height: u.h * u.scale || void 0,
          } as RecoveredValue
        }
      >
        <div
          ref={l as RecoveredValue}
          className={`mt-demo__canvas`}
          style={
            {
              width: p ? u.w : j_demo_clean_D8wNs_pl,
              transform: `scale(${u.scale || 1})`,
              visibility: u.scale ? void 0 : `hidden`,
            } as RecoveredValue
          }
        >
          <ComponentF_demo_clean_D8wNs_pl
            agents={r.agents}
            events={r.events.filter(
              (e?: RecoveredValue): RecoveredValue =>
                +new Date(e.at) >= t - E_demo_clean_D8wNs_pl,
            )}
            since={t - E_demo_clean_D8wNs_pl}
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
