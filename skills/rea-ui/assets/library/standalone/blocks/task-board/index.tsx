"use client";

import "./TaskBoard.css";
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
var n_component_CiAeKKGl: RecoveredValue = t_react_BkAXpnfr(),
  r_component_CiAeKKGl: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_CiAeKKGl: RecoveredValue = [
    `#4fb0fe`,
    `#a651f0`,
    `#ee3e9e`,
    `#7bc4fe`,
    `#d7bcf6`,
    `#a3a3a3`,
    `#f6abd4`,
  ];
function a_component_CiAeKKGl(e?: RecoveredValue): RecoveredValue {
  if (e <= 0) return 5;
  let t: RecoveredValue = e / 5,
    n: RecoveredValue = 10 ** Math.floor(Math.log10(t));
  return (
    [1, 2, 2.5, 5, 10].find((e?: RecoveredValue): RecoveredValue => e * n >= t)! * n * 5
  );
}
var o_component_CiAeKKGl: RecoveredValue = new Intl.NumberFormat(`en-US`, {
    maximumFractionDigits: 1,
  }),
  s_component_CiAeKKGl: RecoveredValue = new Intl.NumberFormat(`en-US`, {
    notation: `compact`,
    maximumFractionDigits: 1,
  }),
  c_component_CiAeKKGl: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e > 0 && e < 0.05 ? `<0.1` : o_component_CiAeKKGl.format(e),
  l_component_CiAeKKGl: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    s_component_CiAeKKGl.format(e),
  u_component_CiAeKKGl: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = Number(e);
    return Number.isFinite(t) ? t : 0;
  };
function d_component_CiAeKKGl({
  records,
  dimensions,
  measures,
  title = `Workload`,
  defaultMeasure,
  defaultSlice,
  defaultSegment,
  className,
}: RecoveredValue): RecoveredValue {
  let [v, y]: RecoveredValue = (0, n_component_CiAeKKGl.useState)(
      defaultMeasure ?? measures[0]?.key ?? ``,
    ),
    [b, x]: RecoveredValue = (0, n_component_CiAeKKGl.useState)(
      defaultSlice ?? dimensions[0]?.key ?? ``,
    ),
    [S, C]: RecoveredValue = (0, n_component_CiAeKKGl.useState)(
      defaultSegment ?? dimensions[1]?.key ?? `none`,
    ),
    [w, T]: RecoveredValue = (0, n_component_CiAeKKGl.useState)(new Set()),
    [E, D]: RecoveredValue = (0, n_component_CiAeKKGl.useState)(null),
    O: RecoveredValue = (0, n_component_CiAeKKGl.useRef)(null),
    k: RecoveredValue = g(O),
    A: RecoveredValue = (0, n_component_CiAeKKGl.useRef)(null),
    j: RecoveredValue = (0, n_component_CiAeKKGl.useRef)(null),
    M: RecoveredValue =
      measures.find((e?: RecoveredValue): RecoveredValue => e.key === v) ?? measures[0],
    N: RecoveredValue =
      dimensions.find((e?: RecoveredValue): RecoveredValue => e.key === b) ??
      dimensions[0],
    P: RecoveredValue =
      S === `none`
        ? null
        : (dimensions.find(
            (e?: RecoveredValue): RecoveredValue => e.key === S && e.key !== N?.key,
          ) ?? null),
    F: RecoveredValue = P ? P.values : [`All`],
    I: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      P?.colors?.[e] ??
      (P ? i_component_CiAeKKGl[t % i_component_CiAeKKGl.length] : `#4fb0fe`);
  (0, n_component_CiAeKKGl.useEffect)((): RecoveredValue => T(new Set()), [S]);
  let L: RecoveredValue = (0, n_component_CiAeKKGl.useMemo)(
      (): RecoveredValue =>
        !N || !M
          ? []
          : N.values.map((t?: RecoveredValue): RecoveredValue => {
              let n: RecoveredValue = {};
              for (let e of F) n[e] = 0;
              for (let r of records) {
                if (String(r[N.key]) !== t) continue;
                let e: RecoveredValue = P ? String(r[P.key]) : `All`;
                e in n && (n[e] += M.field ? u_component_CiAeKKGl(r[M.field]) : 1);
              }
              return {
                value: t,
                cells: n,
                total: F.reduce(
                  (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
                    e + (w.has(t) ? 0 : n[t]),
                  0,
                ),
              };
            }),
      [records, N, P, F, M, w],
    ),
    R: RecoveredValue = L.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + t.total,
      0,
    ),
    z: RecoveredValue = a_component_CiAeKKGl(
      Math.max(0, ...L.map((e?: RecoveredValue): RecoveredValue => e.total)),
    ),
    B: RecoveredValue = [5, 4, 3, 2, 1, 0].map(
      (e?: RecoveredValue): RecoveredValue => (z / 5) * e,
    ),
    V: RecoveredValue =
      L.find((e?: RecoveredValue): RecoveredValue => e.value === E) ?? null,
    H: RecoveredValue = V ? L.indexOf(V) : -1;
  (0, n_component_CiAeKKGl.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = A.current,
      t: RecoveredValue = j.current;
    if (!e || H < 0) return;
    let n: RecoveredValue = (
        e.closest(`.ui-bc__card`) ?? e.closest(`section`)
      ).getBoundingClientRect(),
      r: RecoveredValue = e.getBoundingClientRect(),
      i: RecoveredValue = ((H + 0.5) / L.length) * r.width;
    if (t) {
      let e: RecoveredValue = t.offsetWidth,
        a: RecoveredValue = (H + 0.5) / L.length > 0.5 ? i - 22 - e : i + 22;
      t.style.left = `${Math.max(n.left - r.left + 4, Math.min(a, n.right - r.left - 4 - e))}px`;
    }
    let a: RecoveredValue = e.parentElement?.querySelector(
      `.ui-bc__xlabel[data-active] .ui-bc__pill`,
    );
    if (a) {
      let e: RecoveredValue = a.offsetWidth / 2,
        t: RecoveredValue = r.left + i,
        o: RecoveredValue = Math.max(
          n.left + 4 + e - t,
          Math.min(0, n.right - 4 - e - t),
        );
      a.style.marginLeft = `${o}px`;
    }
  });
  let U: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      T((t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = new Set(t);
        return (n.has(e) ? n.delete(e) : n.size < F.length - 1 && n.add(e), n);
      }),
    W: RecoveredValue = dimensions.map(
      (e?: RecoveredValue): RecoveredValue => ({
        value: e.key,
        label: e.label,
      }),
    );
  return !M || !N ? null : (
    <r_component_CiAeKKGl.Fragment>
      <section
        className={[`ui-bc`, className].filter(Boolean).join(` `)}
        aria-label={title}
      >
        <header className={`ui-bc__head`}>
          <span className={`ui-bc__title`} dir={`auto`} title={title}>
            {title}
          </span>
          <span className={`ui-bc__total`}>
            <strong>{c_component_CiAeKKGl(R)}</strong>
            {` `}
            {M.unit}
          </span>
        </header>
        <div className={`ui-bc__card`}>
          <div className={`ui-bc__controls`}>
            <ComponentF
              label={`Measure`}
              value={M.key}
              onChange={y}
              options={measures.map(
                (e?: RecoveredValue): RecoveredValue => ({
                  value: e.key,
                  label: e.label,
                }),
              )}
            />
            <ComponentF
              label={`Slice`}
              value={N.key}
              onChange={(e?: RecoveredValue): RecoveredValue => {
                (x(e), e === S && C(`none`));
              }}
              options={W}
            />
            <ComponentF
              label={`Segment`}
              value={P?.key ?? `none`}
              onChange={C}
              options={[
                {
                  value: `none`,
                  label: `None`,
                },
                ...W.filter((e?: RecoveredValue): RecoveredValue => e.value !== b),
              ]}
            />
          </div>
          <div className={`ui-bc__chart`} onPointerLeave={(): RecoveredValue => D(null)}>
            <div className={`ui-bc__plot`} ref={A as RecoveredValue}>
              {B.map(
                (e?: RecoveredValue): RecoveredValue => (
                  <span
                    className={`ui-bc__grid`}
                    style={
                      {
                        bottom: `${(e / z) * 100}%`,
                      } as RecoveredValue
                    }
                    data-zero={e === 0 || void 0}
                    children={
                      <span className={`ui-bc__tick`}>{l_component_CiAeKKGl(e)}</span>
                    }
                    key={e}
                  />
                ),
              )}
              <div
                className={`ui-bc__bars`}
                style={
                  {
                    gridTemplateColumns: `repeat(${L.length}, minmax(0, 1fr))`,
                  } as RecoveredValue
                }
              >
                {L.map(
                  (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                    <button
                      type={`button`}
                      className={`ui-bc__col`}
                      data-dim={(E && E !== e.value) || void 0}
                      data-active={E === e.value || void 0}
                      aria-label={`${e.value}: ${c_component_CiAeKKGl(e.total)} ${M.unit}`}
                      onPointerEnter={(): RecoveredValue => D(e.value)}
                      onFocus={(): RecoveredValue => D(e.value)}
                      onBlur={(): RecoveredValue => D(null)}
                      key={t}
                    >
                      <span
                        className={`ui-bc__rest`}
                        style={
                          {
                            bottom: `${(Math.max(0, e.total) / z) * 100}%`,
                          } as RecoveredValue
                        }
                      />
                      <span
                        className={`ui-bc__bar`}
                        style={
                          {
                            height: `${(Math.max(0, e.total) / z) * 100}%`,
                          } as RecoveredValue
                        }
                      >
                        {F.map(
                          (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
                            w.has(t) || !(e.cells[t] > 0) ? null : (
                              <span
                                className={`ui-bc__seg`}
                                style={
                                  {
                                    flexGrow: e.cells[t],
                                    background: I(t, n),
                                  } as RecoveredValue
                                }
                                key={n}
                              />
                            ),
                        )}
                      </span>
                    </button>
                  ),
                )}
              </div>
              {V && (
                <div
                  ref={j as RecoveredValue}
                  className={`ui-bc__tooltip`}
                  role={`status`}
                  data-side={(H + 0.5) / L.length > 0.5 ? `left` : `right`}
                >
                  <p className={`ui-bc__tip-head`}>
                    <span className={`ui-bc__tip-label`}>
                      {N.icons?.[V.value]}
                      <span dir={`auto`}>{V.value}</span>
                    </span>
                    <strong>{c_component_CiAeKKGl(V.total)}</strong>
                  </p>
                  {P && (
                    <ul>
                      {F.map(
                        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => ({
                          seg: e,
                          i: t,
                          v: V.cells[e],
                        }),
                      )
                        .filter(
                          (e?: RecoveredValue): RecoveredValue => e.v && !w.has(e.seg),
                        )
                        .sort(
                          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
                            t.v - e.v,
                        )
                        .map(
                          (e?: RecoveredValue): RecoveredValue => (
                            <li key={e.i}>
                              <span
                                className={`ui-bc__swatch`}
                                style={
                                  {
                                    background: I(e.seg, e.i),
                                  } as RecoveredValue
                                }
                              />
                              <span className={`ui-bc__tip-seg`} dir={`auto`}>
                                {e.seg}
                              </span>
                              <span>{c_component_CiAeKKGl(e.v)}</span>
                            </li>
                          ),
                        )}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div
              className={`ui-bc__xaxis`}
              style={
                {
                  gridTemplateColumns: `repeat(${L.length}, minmax(0, 1fr))`,
                } as RecoveredValue
              }
            >
              {L.map(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <span
                    className={`ui-bc__xlabel`}
                    data-active={E === e.value || void 0}
                    title={e.value}
                    children={
                      E === e.value ? (
                        <span className={`ui-bc__pill`}>
                          {N.icons?.[e.value]}
                          <span dir={`auto`}>{e.value}</span>
                        </span>
                      ) : (
                        (N.icons?.[e.value] ?? (
                          <span className={`ui-bc__xtext`} dir={`auto`}>
                            {e.value}
                          </span>
                        ))
                      )
                    }
                    key={t}
                  />
                ),
              )}
            </div>
          </div>
          <div className={`ui-bc__morph`} ref={k as RecoveredValue}>
            <div className={`ui-bc__table-wrap`} ref={O as RecoveredValue}>
              <table className={`ui-bc__table`}>
                <thead>
                  <tr>
                    <th scope={`col`}>{N.label}</th>
                    <th scope={`col`} data-num={!0}>
                      {M.label}
                    </th>
                    {P &&
                      F.map(
                        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                          <th
                            scope={`col`}
                            data-num={!0}
                            data-hidden={w.has(e) || void 0}
                            children={
                              <span className={`ui-bc__th-seg`} title={e}>
                                <span
                                  className={`ui-bc__swatch`}
                                  style={
                                    {
                                      background: I(e, t),
                                    } as RecoveredValue
                                  }
                                />
                                <span dir={`auto`}>{e}</span>
                              </span>
                            }
                            key={t}
                          />
                        ),
                      )}
                  </tr>
                </thead>
                <tbody>
                  {L.map(
                    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                      <tr
                        data-active={E === e.value || void 0}
                        onPointerEnter={(): RecoveredValue => D(e.value)}
                        onPointerLeave={(): RecoveredValue => D(null)}
                        key={t}
                      >
                        <th scope={`row`}>
                          <span className={`ui-bc__row-label`} title={e.value}>
                            {N.icons?.[e.value]}
                            <span dir={`auto`}>{e.value}</span>
                          </span>
                        </th>
                        <td data-num={!0}>{c_component_CiAeKKGl(e.total)}</td>
                        {P &&
                          F.map(
                            (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
                              <td
                                data-num={!0}
                                data-hidden={w.has(t) || void 0}
                                children={c_component_CiAeKKGl(e.cells[t])}
                                key={n}
                              />
                            ),
                          )}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer className={`ui-bc__foot`}>
          {P ? (
            <div
              className={`ui-bc__legend`}
              role={`group`}
              aria-label={`${P.label} – click to show or hide`}
            >
              {F.map(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <button
                    type={`button`}
                    className={`ui-bc__chip`}
                    aria-pressed={!w.has(e)}
                    title={e}
                    onClick={(): RecoveredValue => U(e)}
                    key={t}
                  >
                    <span
                      className={`ui-bc__swatch`}
                      style={
                        {
                          background: I(e, t),
                        } as RecoveredValue
                      }
                    />
                    <span dir={`auto`}>{e}</span>
                  </button>
                ),
              )}
            </div>
          ) : (
            <span className={`ui-bc__hint`}>{`Pick a segment to split the bars`}</span>
          )}
          {w.size > 0 && (
            <button
              type={`button`}
              className={`ui-bc__reset`}
              onClick={(): RecoveredValue => T(new Set())}
            >{`Show all`}</button>
          )}
        </footer>
      </section>
    </r_component_CiAeKKGl.Fragment>
  );
}
function ComponentF({ label, value, options, onChange }: RecoveredValue): RecoveredValue {
  let [o, s]: RecoveredValue = (0, n_component_CiAeKKGl.useState)(!1),
    c: RecoveredValue = (0, n_component_CiAeKKGl.useRef)(null),
    l: RecoveredValue = (0, n_component_CiAeKKGl.useId)();
  (0, n_component_CiAeKKGl.useEffect)((): RecoveredValue => {
    if (!o) return;
    let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        !c.current?.contains(e.target) && s(!1),
      t: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
        e.key === `Escape` && s(!1);
    return (
      window.addEventListener(`pointerdown`, e),
      window.addEventListener(`keydown`, t),
      (): RecoveredValue => {
        (window.removeEventListener(`pointerdown`, e),
          window.removeEventListener(`keydown`, t));
      }
    );
  }, [o]);
  let u: RecoveredValue =
    options.find((e?: RecoveredValue): RecoveredValue => e.value === value)?.label ??
    value;
  return (
    <div className={`ui-bc__select`} ref={c as RecoveredValue}>
      <span className={`ui-bc__select-label`} id={l}>
        {label}
      </span>
      <button
        type={`button`}
        className={`ui-bc__select-btn`}
        aria-haspopup={`listbox`}
        aria-expanded={o}
        aria-labelledby={l}
        title={u}
        onClick={(): RecoveredValue => s((e?: RecoveredValue): RecoveredValue => !e)}
      >
        <span dir={`auto`}>{u}</span>
        <ComponentP />
      </button>
      {o && (
        <div className={`ui-bc__menu`} role={`listbox`} aria-labelledby={l}>
          {options.map(
            (e?: RecoveredValue): RecoveredValue => (
              <button
                type={`button`}
                role={`option`}
                aria-selected={e.value === value}
                className={`ui-bc__option`}
                autoFocus={e.value === value}
                onClick={(): RecoveredValue => {
                  (onChange(e.value), s(!1));
                }}
                onKeyDown={(e?: RecoveredValue): RecoveredValue => {
                  let t: RecoveredValue = [
                      ...(e.currentTarget.parentElement?.querySelectorAll(`button`) ??
                        []),
                    ],
                    n: RecoveredValue = t.indexOf(e.currentTarget);
                  (e.key === `ArrowDown` && t[Math.min(t.length - 1, n + 1)]?.focus(),
                    e.key === `ArrowUp` && t[Math.max(0, n - 1)]?.focus(),
                    e.key.startsWith(`Arrow`) && e.preventDefault());
                }}
                key={e.value}
              >
                <span dir={`auto`} title={e.label}>
                  {e.label}
                </span>
                {e.value === value && <ComponentM />}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
var ComponentP: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 16 16`}
      width={`14`}
      height={`14`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path d={`m4.5 6.25 3.5 3.5 3.5-3.5`} />
    </svg>
  ),
  ComponentM: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 16 16`}
      width={`14`}
      height={`14`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path d={`m3.5 8.5 3 3 6-7`} />
    </svg>
  ),
  ComponentN: RecoveredValue = ({
    kind,
    color = `currentColor`,
  }: RecoveredValue): RecoveredValue => (
    <svg
      viewBox={`0 0 16 16`}
      width={`15`}
      height={`15`}
      fill={`none`}
      stroke={color}
      strokeWidth={`1.4`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      {kind === `backlog` && (
        <path
          d={`M2.5 9.5 4 3.5h8l1.5 6M2.5 9.5v3h11v-3M2.5 9.5H6l.8 1.5h2.4l.8-1.5h3.5`}
        />
      )}
      {kind === `todo` && <rect x={`3`} y={`3`} width={`10`} height={`10`} rx={`2.5`} />}
      {kind === `progress` && (
        <r_component_CiAeKKGl.Fragment>
          <circle cx={`8`} cy={`8`} r={`5.5`} />
          <path d={`M8 5v3l2 1.5`} />
        </r_component_CiAeKKGl.Fragment>
      )}
      {kind === `review` && (
        <r_component_CiAeKKGl.Fragment>
          <path d={`M1.8 8S4 3.8 8 3.8 14.2 8 14.2 8 12 12.2 8 12.2 1.8 8 1.8 8Z`} />
          <circle cx={`8`} cy={`8`} r={`1.8`} />
        </r_component_CiAeKKGl.Fragment>
      )}
      {kind === `done` && (
        <r_component_CiAeKKGl.Fragment>
          <rect
            x={`2.5`}
            y={`2.5`}
            width={`11`}
            height={`11`}
            rx={`3`}
            fill={color}
            stroke={`none`}
          />
          <path d={`m5.5 8.2 1.8 1.8 3.3-3.6`} stroke={`#fff`} strokeWidth={`1.5`} />
        </r_component_CiAeKKGl.Fragment>
      )}
      {kind === `canceled` && (
        <r_component_CiAeKKGl.Fragment>
          <circle cx={`8`} cy={`8`} r={`5.5`} />
          <path d={`m4.2 11.8 7.6-7.6`} />
        </r_component_CiAeKKGl.Fragment>
      )}
    </svg>
  );
function g(e?: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = (0, n_component_CiAeKKGl.useRef)(null);
  return (
    (0, n_component_CiAeKKGl.useLayoutEffect)((): RecoveredValue => {
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
var r_demo_DmrZ5AK9: RecoveredValue = t_react_BkAXpnfr(),
  i_demo_DmrZ5AK9: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  a_demo_DmrZ5AK9: RecoveredValue = [`No priority`, `Low`, `Medium`, `High`, `Urgent`],
  o_demo_DmrZ5AK9: RecoveredValue = 3,
  s_demo_DmrZ5AK9: RecoveredValue = 50,
  c_demo_DmrZ5AK9: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    new Intl.NumberFormat(`en-US`).format(e),
  l_demo_DmrZ5AK9: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e > 999 ? `999+` : c_demo_DmrZ5AK9(e),
  u_demo_DmrZ5AK9: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e.currentTarget;
    t.title =
      t.scrollWidth > t.clientWidth + 1 || t.scrollHeight > t.clientHeight + 1
        ? (t.textContent ?? ``)
        : ``;
  },
  d_demo_DmrZ5AK9: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    if (
      ![`ArrowRight`, `ArrowDown`, `ArrowLeft`, `ArrowUp`, `Home`, `End`].includes(e.key)
    )
      return;
    let t: RecoveredValue = [...e.currentTarget.querySelectorAll(`[role="radio"]`)],
      n: RecoveredValue = t.length,
      r: RecoveredValue = t.indexOf(document.activeElement as HTMLElement),
      i: RecoveredValue =
        e.key === `Home`
          ? 0
          : e.key === `End`
            ? n - 1
            : e.key === `ArrowRight` || e.key === `ArrowDown`
              ? (r + 1) % n
              : (r - 1 + n) % n;
    (e.preventDefault(), t[i]?.focus(), t[i]?.click());
  },
  f_demo_DmrZ5AK9: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = [...e.currentTarget.querySelectorAll(`[role^="menuitem"]`)],
      n: RecoveredValue = t.length;
    if (!n) return !1;
    let r: RecoveredValue = t.indexOf(document.activeElement as HTMLElement),
      i: RecoveredValue =
        e.key === `ArrowDown`
          ? (r + 1) % n
          : e.key === `ArrowUp`
            ? (r - 1 + n) % n
            : e.key === `Home`
              ? 0
              : e.key === `End`
                ? n - 1
                : -1;
    return i < 0 ? !1 : (e.preventDefault(), t[i].focus(), !0);
  },
  p_demo_DmrZ5AK9: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    [
      ...e.querySelectorAll(`button, textarea, input, select, a[href], [tabindex]`),
    ].filter((e?: RecoveredValue): RecoveredValue => e.tabIndex >= 0 && !e.disabled),
  m_demo_DmrZ5AK9: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = e.trim().split(/\s+/).filter(Boolean),
      n: RecoveredValue =
        t.find((e?: RecoveredValue): RecoveredValue => /^\p{L}/u.test(e)) ?? t[0];
    return n
      ? (
          (typeof Intl.Segmenter == `function`
            ? new Intl.Segmenter().segment(n)[Symbol.iterator]().next().value?.segment
            : (Array.from(n) as RecoveredValue[])[0]) ?? `?`
        ).toUpperCase()
      : `?`;
  };
function ComponentH({
  tasks,
  statuses,
  labels,
  people,
  path = [`Northwind`, `Launch`, `Sprint 12`],
  onChange,
  className,
}: RecoveredValue): RecoveredValue {
  let [x, S]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(tasks),
    [C, w]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(``),
    [T, E]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(new Set()),
    [ie, ae]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(!1),
    [D, O]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(null),
    [k, oe]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(!1),
    [A, j]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(null),
    [M, N]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(null),
    [se, P]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(``),
    [F, I]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(null),
    L: RecoveredValue = (0, r_demo_DmrZ5AK9.useRef)(tasks.length + 300),
    R: RecoveredValue = (0, r_demo_DmrZ5AK9.useRef)(null),
    z: RecoveredValue = (0, r_demo_DmrZ5AK9.useRef)(null),
    B: RecoveredValue = (0, r_demo_DmrZ5AK9.useRef)(null),
    V: RecoveredValue = (0, r_demo_DmrZ5AK9.useRef)(null),
    H: RecoveredValue = (0, r_demo_DmrZ5AK9.useRef)(null),
    U: RecoveredValue = (0, r_demo_DmrZ5AK9.useRef)(null);
  (0, r_demo_DmrZ5AK9.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = U.current;
    if (!e) return;
    U.current = null;
    let t: RecoveredValue = e();
    t?.focus({
      preventScroll: !!t.closest(`.ui-tb__panel`),
    });
  });
  let W: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      B.current?.querySelector(e),
    G: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      W(`[data-card="${CSS.escape(e)}"]`),
    K: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      W(`[data-add="${CSS.escape(e)}"]`),
    q: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (S(e), onChange?.(e));
    },
    J: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      q(
        x.map(
          (n?: RecoveredValue): RecoveredValue =>
            n.id === e
              ? {
                  ...n,
                  ...t,
                }
              : n,
        ),
      );
  (0, r_demo_DmrZ5AK9.useEffect)((): RecoveredValue => {
    if (!D) return;
    let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      !R.current?.contains(e.target) && O(null);
    return (
      window.addEventListener(`pointerdown`, e),
      (): RecoveredValue => window.removeEventListener(`pointerdown`, e)
    );
  }, [D]);
  let ce: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (j(e), (U.current = (): RecoveredValue => V.current));
    },
    Y: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = A;
      (j(null),
        e && (U.current = (): RecoveredValue => G(e) ?? W(`[data-card]`) ?? W(`input`)));
    },
    le: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = G(e),
        n: RecoveredValue = t?.closest(`[data-column]`),
        r: RecoveredValue = n ? [...n.querySelectorAll(`[data-card]`)] : [],
        i: RecoveredValue = t ? r.indexOf(t) : -1,
        a: RecoveredValue = (r[i + 1] ?? r[i - 1])?.dataset.card,
        o: RecoveredValue = n?.dataset.column;
      (q(x.filter((t?: RecoveredValue): RecoveredValue => t.id !== e)),
        j(null),
        (U.current = (): RecoveredValue =>
          (a && G(a)) || (o && K(o)) || W(`[data-card]`)));
    },
    ue: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.key !== `Tab`) return;
      let t: RecoveredValue = p_demo_DmrZ5AK9(e.currentTarget);
      if (!t.length) return;
      let n: RecoveredValue = t[0],
        r: RecoveredValue = t[t.length - 1],
        i: RecoveredValue = document.activeElement as HTMLElement;
      e.shiftKey && (i === n || i === e.currentTarget)
        ? (e.preventDefault(), r.focus())
        : !e.shiftKey && i === r && (e.preventDefault(), n.focus());
    };
  (0, r_demo_DmrZ5AK9.useEffect)((): RecoveredValue => {
    if (!A) return;
    let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e.key === `Escape` && Y();
    return (
      window.addEventListener(`keydown`, e),
      (): RecoveredValue => window.removeEventListener(`keydown`, e)
    );
  });
  let de: RecoveredValue = (e: RecoveredValue = `first`): RecoveredValue => {
      (O(`filter`),
        (U.current = (): RecoveredValue => {
          let t: RecoveredValue = R.current?.querySelectorAll(`[role^="menuitem"]`);
          return t?.[e === `first` ? 0 : t.length - 1];
        }));
    },
    X: RecoveredValue = (e: RecoveredValue = !0): RecoveredValue => {
      (O(null), e && z.current?.focus());
    },
    [fe, pe]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)({}),
    Z: RecoveredValue = C.trim().toLowerCase(),
    Q: RecoveredValue = (0, r_demo_DmrZ5AK9.useMemo)(
      (): RecoveredValue =>
        x.filter(
          (e?: RecoveredValue): RecoveredValue =>
            (!Z || `${e.key} ${e.title}`.toLowerCase().includes(Z)) &&
            (T.size === 0 ||
              e.labels.some((e?: RecoveredValue): RecoveredValue => T.has(e))),
        ),
      [x, Z, T],
    ),
    me: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      people.find((t?: RecoveredValue): RecoveredValue => t.id === e),
    he: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      labels.find((t?: RecoveredValue): RecoveredValue => t.id === e),
    $: RecoveredValue =
      x.find((e?: RecoveredValue): RecoveredValue => e.id === A) ?? null,
    ge: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      if (!F) return;
      (e.preventDefault(), (e.dataTransfer.dropEffect = `move`));
      let n: RecoveredValue = [...e.currentTarget.querySelectorAll(`[data-card]`)].filter(
          (e?: RecoveredValue): RecoveredValue => e.dataset.card !== F.id,
        ),
        r: RecoveredValue = n.length;
      for (let t: RecoveredValue = 0; t < n.length; t++) {
        let i: RecoveredValue = n[t].getBoundingClientRect();
        if (e.clientY < i.top + i.height / 2) {
          r = t;
          break;
        }
      }
      (F.over !== t || F.index !== r) &&
        I({
          ...F,
          over: t,
          index: r,
        });
    },
    _e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (!F) return;
      let t: RecoveredValue = x.find(
        (e?: RecoveredValue): RecoveredValue => e.id === F.id,
      );
      if (!t) return I(null);
      let n: RecoveredValue = x.filter(
          (e?: RecoveredValue): RecoveredValue => e.id !== F.id,
        ),
        r: RecoveredValue = n.filter(
          (t?: RecoveredValue): RecoveredValue =>
            t.status === e &&
            Q.some((e?: RecoveredValue): RecoveredValue => e.id === t.id),
        ),
        i: RecoveredValue = r[F.index ?? r.length],
        a: RecoveredValue = {
          ...t,
          status: e,
        },
        o: RecoveredValue = i ? n.indexOf(i) : n.length;
      (q([...n.slice(0, o), a, ...n.slice(o)]), I(null));
    },
    ve: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      ((H.current = e), N(e), P(``));
    },
    ye: RecoveredValue = (e?: RecoveredValue, t: RecoveredValue = !1): RecoveredValue => {
      if (H.current !== e) return;
      H.current = null;
      let n: RecoveredValue = se.trim();
      if ((N(null), P(``), !n)) {
        t && (U.current = (): RecoveredValue => K(e));
        return;
      }
      L.current += 1;
      let r: RecoveredValue = {
        id: `t-${L.current}`,
        key: `NW-${L.current}`,
        title: n,
        status: e,
        priority: 0,
        labels: [],
        created: new Date().toLocaleDateString(`en-US`, {
          month: `short`,
          day: `numeric`,
        }),
      };
      (q([r, ...x]), t && (U.current = (): RecoveredValue => G(r.id)));
    },
    be: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      ((H.current = null), N(null), P(``), (U.current = (): RecoveredValue => K(e)));
    };
  return (
    <i_demo_DmrZ5AK9.Fragment>
      <section
        ref={B as RecoveredValue}
        className={[`ui-tb`, className].filter(Boolean).join(` `)}
        aria-label={path.join(` / `)}
        data-compact={ie || void 0}
      >
        <header className={`ui-tb__top`}>
          <nav className={`ui-tb__crumbs`} aria-label={`Breadcrumb`}>
            <span className={`ui-tb__logo`} aria-hidden={`true`}>
              <i />
              <i />
              <i />
            </span>
            {path.map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <span
                  className={`ui-tb__crumb`}
                  aria-current={t === path.length - 1 ? `page` : void 0}
                  key={t}
                >
                  {t > 0 && <ComponentTe />}
                  <span className={`ui-tb__clip`} onPointerEnter={u_demo_DmrZ5AK9}>
                    {e}
                  </span>
                </span>
              ),
            )}
            <button
              type={`button`}
              className={`ui-tb__icon`}
              aria-pressed={k}
              aria-label={k ? `Remove from favorites` : `Add to favorites`}
              onClick={(): RecoveredValue =>
                oe((e?: RecoveredValue): RecoveredValue => !e)
              }
            >
              <ComponentNe filled={k} />
            </button>
          </nav>
        </header>
        <div className={`ui-tb__bar`}>
          <span className={`ui-tb__count`} onPointerEnter={u_demo_DmrZ5AK9}>
            {c_demo_DmrZ5AK9(Q.length)}
            {` `}
            {Q.length === 1 ? `task` : `tasks`}
            {Q.length !== x.length && (
              <span>
                {` of `}
                {c_demo_DmrZ5AK9(x.length)}
              </span>
            )}
          </span>
          <div className={`ui-tb__tools`}>
            <label className={`ui-tb__search`}>
              <ComponentV
                d={`M7 12.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM11 11l3.5 3.5`}
                size={14}
              />
              <input
                type={`search`}
                value={C}
                onChange={(e?: RecoveredValue): RecoveredValue => w(e.target.value)}
                placeholder={`Search`}
                aria-label={`Search tasks`}
              />
            </label>
            <div className={`ui-tb__menu-wrap`} ref={R as RecoveredValue}>
              <button
                type={`button`}
                className={`ui-tb__icon`}
                aria-label={`Filter by label`}
                aria-haspopup={`menu`}
                aria-expanded={D === `filter`}
                data-active={T.size > 0 || void 0}
                ref={z as RecoveredValue}
                onClick={(): RecoveredValue => (D ? X() : de())}
                onKeyDown={(e?: RecoveredValue): RecoveredValue => {
                  (e.key === `ArrowDown` || e.key === `ArrowUp`) &&
                    (e.preventDefault(), de(e.key === `ArrowDown` ? `first` : `last`));
                }}
              >
                <ComponentV d={`M2.5 4.5h11M4.5 8h7M6.5 11.5h3`} />
                {T.size > 0 && <span className={`ui-tb__dot`} />}
              </button>
              {D === `filter` && (
                <div
                  className={`ui-tb__menu`}
                  role={`menu`}
                  aria-label={`Filter by label`}
                  onKeyDown={(e?: RecoveredValue): RecoveredValue => {
                    e.key === `Escape`
                      ? (e.preventDefault(), e.stopPropagation(), X())
                      : e.key === `Tab`
                        ? X(!1)
                        : f_demo_DmrZ5AK9(e);
                  }}
                >
                  <p className={`ui-tb__menu-title`} aria-hidden={`true`}>{`Labels`}</p>
                  {labels.length === 0 && (
                    <p className={`ui-tb__menu-none`}>{`No labels yet`}</p>
                  )}
                  {labels.map(
                    (e?: RecoveredValue): RecoveredValue => (
                      <button
                        type={`button`}
                        role={`menuitemcheckbox`}
                        tabIndex={-1}
                        aria-checked={T.has(e.id)}
                        className={`ui-tb__menu-item`}
                        onClick={(): RecoveredValue =>
                          E((t?: RecoveredValue): RecoveredValue => {
                            let n: RecoveredValue = new Set(t);
                            return (n.has(e.id) ? n.delete(e.id) : n.add(e.id), n);
                          })
                        }
                        key={e.id}
                      >
                        <span
                          className={`ui-tb__swatch`}
                          style={
                            {
                              background: e.color,
                            } as RecoveredValue
                          }
                        />
                        <span className={`ui-tb__clip`} onPointerEnter={u_demo_DmrZ5AK9}>
                          {e.label}
                        </span>
                        {T.has(e.id) && <ComponentV d={`m3.5 8.5 3 3 6-7`} size={14} />}
                      </button>
                    ),
                  )}
                  {T.size > 0 && (
                    <button
                      type={`button`}
                      role={`menuitem`}
                      tabIndex={-1}
                      className={`ui-tb__menu-item ui-tb__menu-clear`}
                      onClick={(): RecoveredValue => {
                        (E(new Set()),
                          (U.current = (): RecoveredValue =>
                            R.current?.querySelector(`[role^="menuitem"]`)));
                      }}
                    >{`Clear filter`}</button>
                  )}
                </div>
              )}
            </div>
            <button
              type={`button`}
              className={`ui-tb__icon`}
              aria-pressed={ie}
              aria-label={`Compact cards`}
              title={`Compact cards`}
              onClick={(): RecoveredValue =>
                ae((e?: RecoveredValue): RecoveredValue => !e)
              }
            >
              <ComponentV d={`M2.5 3.5h11v3h-11zM2.5 9.5h11v3h-11z`} />
            </button>
          </div>
        </div>
        {statuses.length === 0 && <p className={`ui-tb__none`}>{`No columns yet`}</p>}
        <div className={`ui-tb__columns`}>
          {statuses.map((e?: RecoveredValue): RecoveredValue => {
            let t: RecoveredValue = Q.filter(
                (t?: RecoveredValue): RecoveredValue => t.status === e.id,
              ),
              n: RecoveredValue = fe[e.id] ?? s_demo_DmrZ5AK9,
              r: RecoveredValue = t.length - n,
              d: RecoveredValue = F?.over === e.id;
            return (
              <div
                className={`ui-tb__column`}
                data-column={e.id}
                data-over={d || void 0}
                onDragOver={(t?: RecoveredValue): RecoveredValue => ge(t, e.id)}
                onDragLeave={(e?: RecoveredValue): RecoveredValue => {
                  !e.currentTarget.contains(e.relatedTarget) &&
                    F &&
                    I({
                      id: F.id,
                    });
                }}
                onDrop={(t?: RecoveredValue): RecoveredValue => {
                  (t.preventDefault(), _e(e.id));
                }}
                key={e.id}
              >
                <div className={`ui-tb__col-head`}>
                  <span className={`ui-tb__status`}>{e.icon}</span>
                  <span
                    className={`ui-tb__col-title ui-tb__clip`}
                    onPointerEnter={u_demo_DmrZ5AK9}
                  >
                    {e.label}
                  </span>
                  <span
                    className={`ui-tb__col-count`}
                    title={t.length > 999 ? c_demo_DmrZ5AK9(t.length) : void 0}
                  >
                    {l_demo_DmrZ5AK9(t.length)}
                  </span>
                  <button
                    type={`button`}
                    className={`ui-tb__icon ui-tb__add`}
                    aria-label={`Add task to ${e.label}`}
                    data-add={e.id}
                    onClick={(): RecoveredValue => ve(e.id)}
                  >
                    <ComponentV d={`M8 3v10M3 8h10`} size={14} />
                  </button>
                </div>
                <div className={`ui-tb__cards`}>
                  {M === e.id && (
                    <form
                      className={`ui-tb__new`}
                      onSubmit={(t?: RecoveredValue): RecoveredValue => {
                        (t.preventDefault(), ye(e.id, !0));
                      }}
                    >
                      <input
                        autoFocus={!0}
                        value={se}
                        onChange={(e?: RecoveredValue): RecoveredValue =>
                          P(e.target.value)
                        }
                        onBlur={(): RecoveredValue => ye(e.id)}
                        onKeyDown={(t?: RecoveredValue): RecoveredValue => {
                          t.key === `Escape` && (t.preventDefault(), be(e.id));
                        }}
                        placeholder={`Task title, then Enter`}
                        aria-label={`New task in ${e.label}`}
                      />
                    </form>
                  )}
                  {t
                    .slice(0, n)
                    .map((t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
                      let r: RecoveredValue = me(t.assignee),
                        s: RecoveredValue =
                          typeof t.dueIn == `number` && Number.isFinite(t.dueIn)
                            ? Math.round(t.dueIn)
                            : void 0,
                        [l = 0, f = 0]: RecoveredValue = t.subtasks ?? [],
                        p: RecoveredValue = t.labels
                          .map(he)
                          .filter((e?: RecoveredValue): RecoveredValue => !!e),
                        m: RecoveredValue = t.title.trim();
                      return (
                        <div className={`ui-tb__slot`} key={t.id}>
                          {d && F?.index === n && <span className={`ui-tb__drop`} />}
                          <article
                            className={`ui-tb__card`}
                            data-card={t.id}
                            data-dragging={F?.id === t.id || void 0}
                            draggable={!0}
                            tabIndex={0}
                            aria-label={`${t.key} ${m || `Untitled`}`}
                            onDragStart={(e?: RecoveredValue): RecoveredValue => {
                              (e.dataTransfer.setData(`text/plain`, t.id),
                                (e.dataTransfer.effectAllowed = `move`),
                                I({
                                  id: t.id,
                                }));
                            }}
                            onDragEnd={(): RecoveredValue => I(null)}
                            aria-haspopup={`dialog`}
                            onClick={(): RecoveredValue => ce(t.id)}
                            onKeyDown={(e?: RecoveredValue): RecoveredValue => {
                              e.target === e.currentTarget &&
                                (e.key === `Enter` || e.key === ` `) &&
                                (e.preventDefault(), ce(t.id));
                            }}
                          >
                            <div className={`ui-tb__card-top`}>
                              <span
                                className={`ui-tb__key ui-tb__clip`}
                                onPointerEnter={u_demo_DmrZ5AK9}
                              >
                                {t.key}
                              </span>
                              {r && <ComponentG person={r} size={18} />}
                            </div>
                            <p className={`ui-tb__card-title`}>
                              <span className={`ui-tb__status`}>{e.icon}</span>
                              <span
                                className={`ui-tb__title-text`}
                                data-untitled={!m || void 0}
                                onPointerEnter={u_demo_DmrZ5AK9}
                              >
                                {m || `Untitled`}
                              </span>
                            </p>
                            <div className={`ui-tb__props`}>
                              <span
                                className={`ui-tb__prop`}
                                title={a_demo_DmrZ5AK9[t.priority]}
                              >
                                <Component_ level={t.priority} />
                              </span>
                              {t.estimate && (
                                <span className={`ui-tb__prop`} title={`Estimate`}>
                                  <ComponentV d={`M8 2.5 13.5 12h-11Z`} size={12} />
                                  {t.estimate}
                                </span>
                              )}
                              {s !== void 0 && (
                                <span
                                  className={`ui-tb__prop`}
                                  data-tone={s < 0 ? `late` : s <= 2 ? `soon` : void 0}
                                >
                                  <ComponentV
                                    d={`M8 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM8 6v3l2 1.2M6.5 1.5h3`}
                                    size={12}
                                  />
                                  {s < 0
                                    ? `${c_demo_DmrZ5AK9(-s)}d late`
                                    : s === 0
                                      ? `Today`
                                      : `${c_demo_DmrZ5AK9(s)}d`}
                                </span>
                              )}
                              {f > 0 && (
                                <span className={`ui-tb__prop`}>
                                  <ComponentEe done={l} total={f} />
                                  {c_demo_DmrZ5AK9(Math.min(l, f))}
                                  {`/`}
                                  {c_demo_DmrZ5AK9(f)}
                                </span>
                              )}
                              {!!t.pullRequest && t.pullRequest > 0 && (
                                <span className={`ui-tb__prop`}>
                                  <ComponentV
                                    d={`M4.5 4v8M4.5 4a1.5 1.5 0 1 0 0-.01M11.5 12a1.5 1.5 0 1 0 0 .01M11.5 10.5V6.5a2 2 0 0 0-2-2H7.5M8.5 3.5l-1 1 1 1`}
                                    size={12}
                                  />
                                  {`#`}
                                  {t.pullRequest}
                                </span>
                              )}
                              {p
                                .slice(
                                  0,
                                  p.length > o_demo_DmrZ5AK9 ? 2 : o_demo_DmrZ5AK9,
                                )
                                .map(
                                  (e?: RecoveredValue): RecoveredValue => (
                                    <span className={`ui-tb__prop`} key={e.id}>
                                      <span
                                        className={`ui-tb__swatch ui-tb__swatch--dot`}
                                        style={
                                          {
                                            background: e.color,
                                          } as RecoveredValue
                                        }
                                      />
                                      <span
                                        className={`ui-tb__clip`}
                                        onPointerEnter={u_demo_DmrZ5AK9}
                                      >
                                        {e.label}
                                      </span>
                                    </span>
                                  ),
                                )}
                              {p.length > o_demo_DmrZ5AK9 && (
                                <span
                                  className={`ui-tb__prop`}
                                  title={p
                                    .slice(2)
                                    .map((e?: RecoveredValue): RecoveredValue => e.label)
                                    .join(`, `)}
                                >
                                  {`+`}
                                  {p.length - o_demo_DmrZ5AK9 + 1}
                                </span>
                              )}
                            </div>
                            {t.created && (
                              <p className={`ui-tb__created`}>
                                {`Created `}
                                {t.created}
                              </p>
                            )}
                          </article>
                        </div>
                      );
                    })}
                  {r > 0 && (
                    <button
                      type={`button`}
                      className={`ui-tb__more`}
                      onClick={(): RecoveredValue => {
                        (pe({
                          ...fe,
                          [e.id]: n + s_demo_DmrZ5AK9,
                        }),
                          (U.current = (): RecoveredValue =>
                            W(`[data-column="${CSS.escape(e.id)}"]`)?.querySelectorAll(
                              `[data-card]`,
                            )[n]));
                      }}
                    >
                      {`Show `}
                      {c_demo_DmrZ5AK9(Math.min(s_demo_DmrZ5AK9, r))}
                      {` more`}
                      <span>
                        {c_demo_DmrZ5AK9(r)}
                        {` left`}
                      </span>
                    </button>
                  )}
                  {d && F?.index === t.length && <span className={`ui-tb__drop`} />}
                  {t.length === 0 && M !== e.id && (
                    <p className={`ui-tb__empty`}>
                      {Z || T.size > 0 ? `No matching tasks` : `Drop tasks here`}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`ui-tb__scrim`}
          data-open={$ ? !0 : void 0}
          onClick={Y}
          aria-hidden={`true`}
        />
        <aside
          ref={V as RecoveredValue}
          className={`ui-tb__panel`}
          data-open={$ ? !0 : void 0}
          role={`dialog`}
          aria-modal={$ ? !0 : void 0}
          aria-label={$ ? `Task details: ${$.key}` : `Task details`}
          tabIndex={-1}
          inert={!$}
          onKeyDown={ue}
        >
          {$ && (
            <i_demo_DmrZ5AK9.Fragment>
              <div className={`ui-tb__panel-head`}>
                <span className={`ui-tb__key`}>{$.key}</span>
                <button
                  type={`button`}
                  className={`ui-tb__icon`}
                  aria-label={`Close details`}
                  onClick={Y}
                >
                  <ComponentV d={`m4 4 8 8M12 4l-8 8`} />
                </button>
              </div>
              <textarea
                className={`ui-tb__title-input`}
                value={$.title}
                rows={2}
                onChange={(e?: RecoveredValue): RecoveredValue =>
                  J($.id, {
                    title: e.target.value,
                  })
                }
                aria-label={`Title`}
              />
              <dl className={`ui-tb__fields`}>
                <dt>{`Status`}</dt>
                <dd>
                  <div
                    className={`ui-tb__choices`}
                    role={`radiogroup`}
                    aria-label={`Status`}
                    onKeyDown={d_demo_DmrZ5AK9}
                  >
                    {statuses.map(
                      (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
                        <button
                          type={`button`}
                          className={`ui-tb__choice`}
                          role={`radio`}
                          aria-checked={$.status === e.id}
                          tabIndex={
                            $.status === e.id ||
                            (n === 0 &&
                              !statuses.some(
                                (e?: RecoveredValue): RecoveredValue => e.id === $.status,
                              ))
                              ? 0
                              : -1
                          }
                          onClick={(): RecoveredValue =>
                            J($.id, {
                              status: e.id,
                            })
                          }
                          key={e.id}
                        >
                          <span className={`ui-tb__status`}>{e.icon}</span>
                          <span
                            className={`ui-tb__clip`}
                            onPointerEnter={u_demo_DmrZ5AK9}
                          >
                            {e.label}
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                </dd>
                <dt>{`Priority`}</dt>
                <dd>
                  <div
                    className={`ui-tb__choices`}
                    role={`radiogroup`}
                    aria-label={`Priority`}
                    onKeyDown={d_demo_DmrZ5AK9}
                  >
                    {[4, 3, 2, 1, 0].map(
                      (e?: RecoveredValue): RecoveredValue => (
                        <button
                          type={`button`}
                          className={`ui-tb__choice`}
                          role={`radio`}
                          aria-checked={$.priority === e}
                          tabIndex={$.priority === e ? 0 : -1}
                          onClick={(): RecoveredValue =>
                            J($.id, {
                              priority: e,
                            })
                          }
                          key={e}
                        >
                          <Component_ level={e} />
                          {a_demo_DmrZ5AK9[e]}
                        </button>
                      ),
                    )}
                  </div>
                </dd>
                {labels.length > 0 && <dt>{`Labels`}</dt>}
                {labels.length > 0 && (
                  <dd className={`ui-tb__choices`}>
                    {labels.map((e?: RecoveredValue): RecoveredValue => {
                      let t: RecoveredValue = $.labels.includes(e.id);
                      return (
                        <button
                          type={`button`}
                          className={`ui-tb__choice`}
                          aria-pressed={t}
                          onClick={(): RecoveredValue =>
                            J($.id, {
                              labels: t
                                ? $.labels.filter(
                                    (t?: RecoveredValue): RecoveredValue => t !== e.id,
                                  )
                                : [...$.labels, e.id],
                            })
                          }
                          key={e.id}
                        >
                          <span
                            className={`ui-tb__swatch ui-tb__swatch--dot`}
                            style={
                              {
                                background: e.color,
                              } as RecoveredValue
                            }
                          />
                          <span
                            className={`ui-tb__clip`}
                            onPointerEnter={u_demo_DmrZ5AK9}
                          >
                            {e.label}
                          </span>
                        </button>
                      );
                    })}
                  </dd>
                )}
                {people.length > 0 && <dt>{`Assignee`}</dt>}
                {people.length > 0 && (
                  <dd className={`ui-tb__choices`}>
                    {people.map(
                      (e?: RecoveredValue): RecoveredValue => (
                        <button
                          type={`button`}
                          className={`ui-tb__choice`}
                          aria-pressed={$.assignee === e.id}
                          onClick={(): RecoveredValue =>
                            J($.id, {
                              assignee: $.assignee === e.id ? void 0 : e.id,
                            })
                          }
                          key={e.id}
                        >
                          <ComponentG person={e} size={16} />
                          <span
                            className={`ui-tb__clip`}
                            onPointerEnter={u_demo_DmrZ5AK9}
                          >
                            {e.name.trim().split(/\s+/)[0] || `No name`}
                          </span>
                        </button>
                      ),
                    )}
                  </dd>
                )}
              </dl>
              <div className={`ui-tb__panel-foot`}>
                <span>{$.created && `Created ${$.created}`}</span>
                <button
                  type={`button`}
                  className={`ui-tb__delete`}
                  onClick={(): RecoveredValue => le($.id)}
                >{`Delete task`}</button>
              </div>
            </i_demo_DmrZ5AK9.Fragment>
          )}
        </aside>
      </section>
    </i_demo_DmrZ5AK9.Fragment>
  );
}
function ComponentG({ person, size }: RecoveredValue): RecoveredValue {
  let [n, a]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(null);
  return person.avatar && n !== person.avatar ? (
    <img
      className={`ui-tb__avatar`}
      src={person.avatar}
      alt={person.name}
      title={person.name}
      width={size}
      height={size}
      loading={`lazy`}
      onError={(): RecoveredValue => a(person.avatar ?? null)}
    />
  ) : (
    <span
      className={`ui-tb__avatar ui-tb__avatar--initials`}
      style={
        {
          width: size,
          height: size,
        } as RecoveredValue
      }
      title={person.name}
      role={`img`}
      aria-label={person.name}
    >
      {m_demo_DmrZ5AK9(person.name)}
    </span>
  );
}
function Component_({ level }: RecoveredValue): RecoveredValue {
  return level === 4 ? (
    <svg
      className={`ui-tb__prio`}
      viewBox={`0 0 14 14`}
      width={`14`}
      height={`14`}
      aria-hidden={`true`}
    >
      <rect x={`1`} y={`1`} width={`12`} height={`12`} rx={`3`} fill={`#ec4899`} />
      <path
        d={`M7 3.8v4M7 9.9v.3`}
        stroke={`#fff`}
        strokeWidth={`1.6`}
        strokeLinecap={`round`}
      />
    </svg>
  ) : (
    <svg
      className={`ui-tb__prio`}
      viewBox={`0 0 14 14`}
      width={`14`}
      height={`14`}
      aria-hidden={`true`}
    >
      {[0, 1, 2].map(
        (t?: RecoveredValue): RecoveredValue => (
          <rect
            x={2 + t * 4}
            y={9 - t * 3}
            width={`2.4`}
            height={3 + t * 3}
            rx={`0.8`}
            className={level > t ? `ui-tb__prio-on` : `ui-tb__prio-off`}
            key={t}
          />
        ),
      )}
    </svg>
  );
}
function ComponentEe({ done, total }: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = 2 * Math.PI * 5;
  return (
    <svg viewBox={`0 0 14 14`} width={`12`} height={`12`} aria-hidden={`true`}>
      <circle
        className={`ui-tb__ring-track`}
        cx={`7`}
        cy={`7`}
        r={`5`}
        fill={`none`}
        strokeWidth={`2`}
      />
      <circle
        cx={`7`}
        cy={`7`}
        r={`5`}
        fill={`none`}
        stroke={`#2f6bff`}
        strokeWidth={`2`}
        strokeDasharray={`${(Math.min(Math.max(0, done), total) / Math.max(1, total)) * n} ${n}`}
        transform={`rotate(-90 7 7)`}
      />
    </svg>
  );
}
var ComponentTe: RecoveredValue = (): RecoveredValue => (
    <ComponentV d={`m6 4 4 4-4 4`} size={12} />
  ),
  ComponentNe: RecoveredValue = ({ filled }: RecoveredValue): RecoveredValue => (
    <svg viewBox={`0 0 16 16`} width={`15`} height={`15`} aria-hidden={`true`}>
      <path
        d={`m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6Z`}
        fill={filled ? `#e8b000` : `none`}
        stroke={filled ? `#e8b000` : `currentColor`}
        strokeWidth={`1.3`}
        strokeLinejoin={`round`}
      />
    </svg>
  ),
  ComponentV: RecoveredValue = ({ d: e, size = 16 }: RecoveredValue): RecoveredValue => (
    <svg
      viewBox={`0 0 16 16`}
      width={size}
      height={size}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.4`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      aria-hidden={`true`}
    >
      <path d={e} />
    </svg>
  ),
  y_demo_DmrZ5AK9: RecoveredValue = [
    {
      id: `todo`,
      label: `Todo`,
      icon: <ComponentN kind={`todo`} color={`#8f8f8f`} />,
    },
    {
      id: `review`,
      label: `In review`,
      icon: <ComponentN kind={`review`} color={`#8b5cf6`} />,
    },
    {
      id: `progress`,
      label: `In progress`,
      icon: <ComponentN kind={`progress`} color={`#f59e0b`} />,
    },
    {
      id: `done`,
      label: `Done`,
      icon: <ComponentN kind={`done`} color={`#2f6bff`} />,
    },
  ],
  b_demo_DmrZ5AK9: RecoveredValue = [
    {
      id: `web`,
      label: `Website`,
      color: `#4fb0fe`,
    },
    {
      id: `billing`,
      label: `Billing`,
      color: `#a651f0`,
    },
    {
      id: `mobile`,
      label: `Mobile`,
      color: `#13b3a0`,
    },
    {
      id: `bug`,
      label: `Bug`,
      color: `#ee3e9e`,
    },
    {
      id: `feature`,
      label: `Feature`,
      color: `#a9d9ff`,
    },
  ],
  x_demo_DmrZ5AK9: RecoveredValue = [
    {
      id: `mara`,
      name: `Mara Lindqvist`,
      avatar: `data:image/jpeg;base64,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`,
    },
    {
      id: `jonas`,
      name: `Jonas Weber`,
      avatar: `data:image/jpeg;base64,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`,
    },
    {
      id: `lena`,
      name: `Lena Hart`,
      avatar: `data:image/jpeg;base64,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`,
    },
    {
      id: `theo`,
      name: `Theo Brandt`,
      avatar: `data:image/jpeg;base64,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`,
    },
    {
      id: `sofia`,
      name: `Sofia Marin`,
      avatar: `data:image/jpeg;base64,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`,
    },
  ],
  S_demo_DmrZ5AK9: RecoveredValue = [
    {
      id: `1`,
      key: `NW-214`,
      title: `Add the launch banner to the marketing site`,
      status: `todo`,
      priority: 2,
      estimate: `M`,
      labels: [`web`, `feature`],
      assignee: `mara`,
      created: `Oct 2`,
    },
    {
      id: `2`,
      key: `NW-209`,
      title: `Currency rounding in annual invoices`,
      status: `todo`,
      priority: 3,
      labels: [`billing`, `bug`],
      assignee: `theo`,
      dueIn: 2,
      created: `Sep 28`,
    },
    {
      id: `3`,
      key: `NW-197`,
      title: `Follow up with the beta customers about pricing`,
      status: `todo`,
      priority: 1,
      labels: [],
      assignee: `sofia`,
      subtasks: [2, 4],
      created: `Sep 24`,
    },
    {
      id: `4`,
      key: `NW-221`,
      title: `Review the onboarding copy for the new plans`,
      status: `review`,
      priority: 2,
      labels: [`web`],
      assignee: `lena`,
      dueIn: 1,
      created: `Oct 2`,
    },
    {
      id: `5`,
      key: `NW-205`,
      title: `Add usage limits to the plan comparison table`,
      status: `review`,
      priority: 3,
      estimate: `L`,
      labels: [`web`, `feature`],
      assignee: `jonas`,
      created: `Sep 27`,
    },
    {
      id: `6`,
      key: `NW-188`,
      title: `Push notification opt-in on iOS`,
      status: `review`,
      priority: 2,
      labels: [`mobile`],
      assignee: `mara`,
      pullRequest: 412,
      created: `Sep 21`,
    },
    {
      id: `10`,
      key: `NW-230`,
      title: `Export guide for the help center`,
      status: `progress`,
      priority: 2,
      labels: [`web`],
      assignee: `jonas`,
      created: `Sep 30`,
    },
    {
      id: `11`,
      key: `NW-201`,
      title: `Proration when teams add seats mid-month`,
      status: `progress`,
      priority: 3,
      labels: [`billing`],
      assignee: `theo`,
      dueIn: 4,
      created: `Sep 23`,
    },
    {
      id: `12`,
      key: `NW-176`,
      title: `Offline mode for the task list`,
      status: `progress`,
      priority: 2,
      estimate: `XL`,
      labels: [`mobile`, `feature`],
      assignee: `mara`,
      pullRequest: 398,
      created: `Sep 16`,
    },
    {
      id: `13`,
      key: `NW-160`,
      title: `Dark mode for the dashboard`,
      status: `done`,
      priority: 2,
      labels: [`web`, `feature`],
      assignee: `lena`,
      created: `Sep 12`,
    },
    {
      id: `14`,
      key: `NW-171`,
      title: `Fix crash when uploading large avatars`,
      status: `done`,
      priority: 3,
      labels: [`mobile`, `bug`],
      assignee: `jonas`,
      created: `Sep 15`,
    },
  ],
  C_demo_DmrZ5AK9: RecoveredValue = 1240;
function Runtime(): RecoveredValue {
  let e: RecoveredValue = (0, r_demo_DmrZ5AK9.useRef)(null),
    [t, n]: RecoveredValue = (0, r_demo_DmrZ5AK9.useState)(null);
  return (
    (0, r_demo_DmrZ5AK9.useLayoutEffect)((): RecoveredValue => {
      let t: RecoveredValue = e.current,
        r: RecoveredValue = t?.closest(`.card__preview`),
        i: RecoveredValue = r ?? t?.closest(`.stage`);
      if (!t || !i) return;
      let a: RecoveredValue = (): RecoveredValue => {
        let e: RecoveredValue = i.clientWidth;
        if (r)
          return n({
            scale: (e - 48) / C_demo_DmrZ5AK9,
            card: !0,
          });
        if (e < 760) return n(null);
        n({
          scale: Math.min(0.8, (e - 120) / C_demo_DmrZ5AK9),
          card: !1,
        });
      };
      a();
      let o: RecoveredValue = new ResizeObserver(a);
      return (o.observe(i), (): RecoveredValue => o.disconnect());
    }, []),
    (
      <div
        ref={e as RecoveredValue}
        className={`board-demo`}
        data-fit={t ? (t.card ? `card` : `stage`) : void 0}
      >
        <div
          className={`board-demo__frame`}
          style={
            (t
              ? t.card
                ? {
                    width: C_demo_DmrZ5AK9,
                    transform: `scale(${t.scale})`,
                  }
                : {
                    width: C_demo_DmrZ5AK9,
                    zoom: t.scale,
                  }
              : void 0) as RecoveredValue
          }
        >
          <ComponentH
            tasks={S_demo_DmrZ5AK9}
            statuses={y_demo_DmrZ5AK9}
            labels={b_demo_DmrZ5AK9}
            people={x_demo_DmrZ5AK9}
          />
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
