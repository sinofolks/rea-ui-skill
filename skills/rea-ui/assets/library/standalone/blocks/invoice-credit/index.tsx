"use client";

import "./InvoiceCredit.css";
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
var n_demo_By9FWyzm: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_By9FWyzm: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_By9FWyzm: RecoveredValue = [`invoice`, `credit`],
  a_demo_By9FWyzm: RecoveredValue = [
    {
      id: `plan`,
      name: `Growth plan`,
      qty: 1,
      rate: 1250,
      tax: 0.2,
    },
    {
      id: `seats`,
      name: `Extra seats`,
      qty: 12,
      rate: 40,
      tax: 0.2,
    },
    {
      id: `api`,
      name: `API calls (per 1k)`,
      qty: 18420,
      rate: 0.42,
      tax: 0.2,
      group: `Metered usage`,
    },
  ];
function ComponentO({
  seller = {
    name: `Lumen Labs, Inc.`,
    lines: [`48 Harbour Street`, `Bristol`, `BS1 4RN`, `United Kingdom`],
  },
  buyer = {
    name: `Northwind Logistics GmbH`,
    lines: [`Speicherstraße 12`, `Hamburg`, `20457`, `Germany`],
  },
  invoiceNo = `INV-2041`,
  creditNo = `CN-0117`,
  invoiceDate = `1 Oct 2026`,
  dueDate = `31 Oct 2026`,
  period = `1 Sep – 30 Sep 2026`,
  lines = a_demo_By9FWyzm,
  currency = `$`,
  onIssue,
  className,
}: RecoveredValue): RecoveredValue {
  let [k, A]: RecoveredValue = (0, n_demo_By9FWyzm.useState)(`invoice`),
    j: RecoveredValue = (0, n_demo_By9FWyzm.useId)(),
    M: RecoveredValue = (0, n_demo_By9FWyzm.useRef)([]),
    N: RecoveredValue = (0, n_demo_By9FWyzm.useRef)(null),
    P: RecoveredValue = (0, n_demo_By9FWyzm.useRef)(!1),
    F: RecoveredValue = (e?: RecoveredValue, t: RecoveredValue = !1): RecoveredValue => {
      (A(e), t && M.current[i_demo_By9FWyzm.indexOf(e)]?.focus());
    },
    I: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = i_demo_By9FWyzm.indexOf(k),
        n: RecoveredValue = i_demo_By9FWyzm.length,
        r: RecoveredValue =
          e.key === `ArrowRight` || e.key === `ArrowDown`
            ? (t + 1) % n
            : e.key === `ArrowLeft` || e.key === `ArrowUp`
              ? (t - 1 + n) % n
              : e.key === `Home`
                ? 0
                : e.key === `End`
                  ? n - 1
                  : -1;
      r < 0 || (e.preventDefault(), F(i_demo_By9FWyzm[r], !0));
    },
    [L, R]: RecoveredValue = (0, n_demo_By9FWyzm.useState)({}),
    [z, B]: RecoveredValue = (0, n_demo_By9FWyzm.useState)({}),
    [V, H]: RecoveredValue = (0, n_demo_By9FWyzm.useState)(!1),
    U: RecoveredValue = (e?: RecoveredValue): RecoveredValue => L[e.id] ?? !0,
    W: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      z[e.id] ?? l_demo_By9FWyzm(e),
    G: RecoveredValue = h(currency),
    K: RecoveredValue = (e?: RecoveredValue, t: RecoveredValue = !1): RecoveredValue =>
      Number.isFinite(e)
        ? `${(t ? e > 0 : e < 0) ? `-` : ``}${G.format(Math.abs(e))}`
        : `—`,
    q: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      Number.isFinite(e) ? `${e < 0 ? `-` : ``}${G.precise(Math.abs(e))}` : `—`,
    J: RecoveredValue = lines.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + l_demo_By9FWyzm(t),
      0,
    ),
    Y: RecoveredValue = lines.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + l_demo_By9FWyzm(t) * c(t.tax),
      0,
    ),
    X: RecoveredValue = J + Y,
    Z: RecoveredValue = lines.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + (U(t) ? W(t) : 0),
      0,
    ),
    Q: RecoveredValue = lines.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
        e + (U(t) ? W(t) * c(t.tax) : 0),
      0,
    ),
    $: RecoveredValue = Z + Q;
  (0, n_demo_By9FWyzm.useEffect)((): RecoveredValue => {
    P.current && ((P.current = !1), N.current?.querySelector(`button`)?.focus());
  }, [V]);
  let te: RecoveredValue = (): RecoveredValue => {
      ((P.current = !0),
        H(!0),
        onIssue?.(
          Object.fromEntries(
            lines.filter(U).map((e?: RecoveredValue): RecoveredValue => [e.id, W(e)]),
          ),
          s($),
        ));
    },
    ne: RecoveredValue = [
      ...new Set(lines.map((e?: RecoveredValue): RecoveredValue => e.group ?? ``)),
    ],
    re: RecoveredValue = lines.some(
      (e?: RecoveredValue): RecoveredValue =>
        q(e.rate).length + K(s(e.qty * e.rate)).length > 20,
    );
  return (
    <section className={[`ui-iv`, className].filter(Boolean).join(` `)} data-view={k}>
      <div className={`ui-iv__bar`}>
        <div
          className={`ui-iv__seg`}
          role={`tablist`}
          aria-label={`Document`}
          onKeyDown={I}
        >
          <span className={`ui-iv__seg-thumb`} aria-hidden={`true`} />
          <button
            ref={
              ((e?: RecoveredValue): RecoveredValue => {
                M.current[0] = e;
              }) as RecoveredValue
            }
            type={`button`}
            role={`tab`}
            id={`${j}-tab-invoice`}
            aria-selected={k === `invoice`}
            aria-controls={`${j}-invoice`}
            tabIndex={k === `invoice` ? 0 : -1}
            onClick={(): RecoveredValue => A(`invoice`)}
          >{`Invoice`}</button>
          <button
            ref={
              ((e?: RecoveredValue): RecoveredValue => {
                M.current[1] = e;
              }) as RecoveredValue
            }
            type={`button`}
            role={`tab`}
            id={`${j}-tab-credit`}
            aria-selected={k === `credit`}
            aria-controls={`${j}-credit`}
            tabIndex={k === `credit` ? 0 : -1}
            onClick={(): RecoveredValue => A(`credit`)}
          >{`Credit note`}</button>
        </div>
        <div className={`ui-iv__actions`}>
          <button
            type={`button`}
            className={`ui-iv__btn`}
            title={`Demo – connect your own PDF export`}
            aria-description={`Demo – connect your own PDF export`}
          >
            <ComponentG d={`M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14`} />
            {`PDF`}
          </button>
          {k === `invoice` && (
            <button
              type={`button`}
              className={`ui-iv__btn`}
              onClick={(): RecoveredValue => F(`credit`, !0)}
            >
              <ComponentG d={`M9 14 4.5 9.5 9 5M4.5 9.5h10a5 5 0 0 1 0 10H12`} />
              {`Credit invoice`}
            </button>
          )}
        </div>
      </div>
      <div className={`ui-iv__stack`}>
        <article
          className={`ui-iv__sheet`}
          data-doc={`invoice`}
          id={`${j}-invoice`}
          role={`tabpanel`}
          aria-labelledby={`${j}-tab-invoice`}
          aria-hidden={k !== `invoice`}
          inert={k !== `invoice` || void 0}
        >
          <header className={`ui-iv__head`}>
            <div>
              <p className={`ui-iv__big`}>{K(X)}</p>
              <p className={`ui-iv__due`}>
                {dueDate && (
                  <span>
                    {`Due `}
                    {dueDate}
                  </span>
                )}
                <a
                  href={`#pay`}
                  onClick={(e?: RecoveredValue): RecoveredValue => e.preventDefault()}
                >{`Pay online`}</a>
              </p>
            </div>
            <Component_ name={seller.name} />
          </header>
          {(u_demo_By9FWyzm(seller) || u_demo_By9FWyzm(buyer)) && (
            <div className={`ui-iv__parties`}>
              {u_demo_By9FWyzm(seller) && <ComponentV title={`From`} party={seller} />}
              {u_demo_By9FWyzm(buyer) && <ComponentV title={`To`} party={buyer} />}
            </div>
          )}
          <ComponentY
            rows={[
              [`Invoice no`, <span className={`ui-iv__ref`}>{invoiceNo}</span>],
              [`Invoice date`, invoiceDate],
              [`Due date`, dueDate],
              [`Billing period`, period],
            ]}
          />
          <table className={`ui-iv__table`} data-wide={re ? `` : void 0}>
            <thead>
              <tr>
                <th>{`Name`}</th>
                <th>{`Qty`}</th>
                <th className={`ui-iv__num`}>{`Rate`}</th>
                <th className={`ui-iv__num`}>{`Tax`}</th>
                <th className={`ui-iv__num`}>{`Price`}</th>
              </tr>
            </thead>
            <tbody>
              {ne.map(
                (e?: RecoveredValue): RecoveredValue => (
                  <ComponentB
                    title={e}
                    children={lines
                      .filter(
                        (t?: RecoveredValue): RecoveredValue => (t.group ?? ``) === e,
                      )
                      .map(
                        (t?: RecoveredValue): RecoveredValue => (
                          <tr data-indent={e ? `` : void 0} key={t.id}>
                            <td className={`ui-iv__name`}>{t.name}</td>
                            <td>
                              {Number.isFinite(t.qty)
                                ? d_demo_By9FWyzm.format(t.qty)
                                : `—`}
                            </td>
                            <td className={`ui-iv__num`}>{q(t.rate)}</td>
                            <td className={`ui-iv__num`}>
                              {Number.isFinite(t.tax) ? f.format(t.tax) : `—`}
                            </td>
                            <td className={`ui-iv__num`}>{K(s(t.qty * t.rate))}</td>
                          </tr>
                        ),
                      )}
                    key={e || `base`}
                  />
                ),
              )}
              {lines.length === 0 && (
                <tr className={`ui-iv__empty`}>
                  <td colSpan={5}>{`No lines on this invoice`}</td>
                </tr>
              )}
            </tbody>
          </table>
          <ComponentX
            rows={[
              [`Subtotal`, K(J)],
              [`Tax`, K(Y)],
            ]}
            total={[`Total`, K(X)]}
          />
        </article>
        <article
          className={`ui-iv__sheet`}
          data-doc={`credit`}
          id={`${j}-credit`}
          role={`tabpanel`}
          aria-labelledby={`${j}-tab-credit`}
          aria-hidden={k !== `credit`}
          inert={k !== `credit` || void 0}
        >
          <header className={`ui-iv__head`}>
            <div>
              <p className={`ui-iv__big`}>{`Credit note`}</p>
              <p className={`ui-iv__due`}>
                {K($)}
                {` credited`}
                {invoiceDate ? ` on ${invoiceDate}` : ``}
                {V && <span className={`ui-iv__badge`}>{`Issued`}</span>}
              </p>
            </div>
            <Component_ name={seller.name} />
          </header>
          <ComponentY
            rows={[
              [`Credit note no`, <span className={`ui-iv__ref`}>{creditNo}</span>],
              [
                `Related invoice`,
                <button
                  type={`button`}
                  className={`ui-iv__ref`}
                  onClick={(): RecoveredValue => F(`invoice`, !0)}
                >
                  {invoiceNo}
                </button>,
              ],
              [`Billing period`, period],
              [`Date of issue`, invoiceDate],
            ]}
          />
          <div className={`ui-iv__tray`}>
            <p className={`ui-iv__tray-title`}>{`Lines to credit`}</p>
            <div className={`ui-iv__card`}>
              <div className={`ui-iv__crow ui-iv__crow--head`}>
                <span />
                <span>{`Name`}</span>
                <span className={`ui-iv__num`}>{`Total`}</span>
                <span className={`ui-iv__num`}>{`Credit amount`}</span>
              </div>
              {lines.length === 0 && (
                <p className={`ui-iv__none`}>{`No lines to credit`}</p>
              )}
              {lines.map((e?: RecoveredValue): RecoveredValue => {
                let t: RecoveredValue = l_demo_By9FWyzm(e),
                  n: RecoveredValue = U(e);
                return (
                  <div className={`ui-iv__crow`} data-off={n ? void 0 : ``} key={e.id}>
                    <button
                      type={`button`}
                      role={`checkbox`}
                      aria-checked={n}
                      aria-label={`Credit ${e.name}`}
                      className={`ui-iv__check`}
                      disabled={V}
                      onClick={(): RecoveredValue =>
                        R(
                          (t?: RecoveredValue): RecoveredValue => ({
                            ...t,
                            [e.id]: !t[e.id],
                          }),
                        )
                      }
                    >
                      <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
                        <path d={`m6 12.5 4 4 8-9`} />
                      </svg>
                    </button>
                    <span className={`ui-iv__cname`} title={e.name}>
                      {e.name}
                    </span>
                    <span className={`ui-iv__num`}>{K(t)}</span>
                    <span className={`ui-iv__num`}>
                      <S
                        value={W(e)}
                        max={t}
                        symbol={G.symbol}
                        disabled={!n || V}
                        label={`Credit amount for ${e.name}`}
                        onChange={(t?: RecoveredValue): RecoveredValue =>
                          B(
                            (n?: RecoveredValue): RecoveredValue => ({
                              ...n,
                              [e.id]: t,
                            }),
                          )
                        }
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <ComponentX
            rows={[
              [`Subtotal`, K(Z)],
              [`Tax`, K(Q)],
            ]}
            total={[`Adjustment total`, K($, !0)]}
            note={[`Applied to invoice`, `${K($, !0)}${G.code ? ` ${G.code}` : ``}`]}
          />
          <div className={`ui-iv__issue`} ref={N as RecoveredValue}>
            {V ? (
              <button
                type={`button`}
                className={`ui-iv__btn`}
                onClick={(): RecoveredValue => {
                  ((P.current = !0), H(!1));
                }}
              >{`Edit credit note`}</button>
            ) : (
              <button
                type={`button`}
                className={`ui-iv__primary`}
                disabled={$ <= 0}
                onClick={te}
              >{`Issue credit note`}</button>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
var s: RecoveredValue = (e?: RecoveredValue): RecoveredValue => Math.round(e * 100) / 100,
  c: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Number.isFinite(e) ? e : 0,
  l_demo_By9FWyzm: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    c(s(e.qty * e.rate)),
  u_demo_By9FWyzm: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    !!(e.name || e.lines.length),
  d_demo_By9FWyzm: RecoveredValue = new Intl.NumberFormat(`en-US`, {
    maximumFractionDigits: 2,
  }),
  f: RecoveredValue = new Intl.NumberFormat(`en-US`, {
    style: `percent`,
    maximumFractionDigits: 2,
  }),
  p: RecoveredValue = new Intl.NumberFormat(`en-US`, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  m: RecoveredValue = new Intl.NumberFormat(`en-US`, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
function h(e?: RecoveredValue): RecoveredValue {
  if (/^[A-Z]{3}$/.test(e))
    try {
      let t: RecoveredValue = new Intl.NumberFormat(`en-US`, {
          style: `currency`,
          currency: e,
          currencyDisplay: `narrowSymbol`,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        n: RecoveredValue = new Intl.NumberFormat(`en-US`, {
          style: `currency`,
          currency: e,
          currencyDisplay: `narrowSymbol`,
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        });
      return {
        format: (e?: RecoveredValue): RecoveredValue => t.format(e),
        precise: (e?: RecoveredValue): RecoveredValue => n.format(e),
        symbol:
          t
            .formatToParts(0)
            .find((e?: RecoveredValue): RecoveredValue => e.type === `currency`)?.value ??
          e,
        code: e,
      };
    } catch {}
  return {
    format: (t?: RecoveredValue): RecoveredValue => `${e}${p.format(t)}`,
    precise: (t?: RecoveredValue): RecoveredValue => `${e}${m.format(t)}`,
    symbol: e,
    code: e === `$` ? `USD` : ``,
  };
}
var ComponentG: RecoveredValue = ({ d: e }: RecoveredValue): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
      <path d={e} />
    </svg>
  ),
  Component_: RecoveredValue = ({ name }: RecoveredValue): RecoveredValue => (
    <span className={`ui-iv__brand`} title={name || void 0}>
      <span className={`ui-iv__logo`} aria-hidden={`true`} />
      {name && <span className={`ui-iv__brand-name`}>{name}</span>}
    </span>
  ),
  ComponentV: RecoveredValue = ({ title, party }: RecoveredValue): RecoveredValue => (
    <div className={`ui-iv__party`}>
      <p className={`ui-iv__label`}>{title}</p>
      {party.name && <p>{party.name}</p>}
      {party.lines.map(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
          <p children={e} key={t} />
        ),
      )}
    </div>
  ),
  ComponentY: RecoveredValue = ({ rows }: RecoveredValue): RecoveredValue => (
    <div className={`ui-iv__terms`}>
      <p className={`ui-iv__label`}>{`Terms`}</p>
      <dl>
        {rows
          .filter(([, e]: RecoveredValue): RecoveredValue => e !== `` && e != null)
          .map(
            ([e, t]: RecoveredValue): RecoveredValue => (
              <div key={e}>
                <dt>{e}</dt>
                <dd>{t}</dd>
              </div>
            ),
          )}
      </dl>
    </div>
  ),
  ComponentB: RecoveredValue = ({ title, children }: RecoveredValue): RecoveredValue => (
    <r_demo_By9FWyzm.Fragment>
      {title && (
        <tr className={`ui-iv__group`}>
          <td colSpan={5}>{title}</td>
        </tr>
      )}
      {children}
    </r_demo_By9FWyzm.Fragment>
  ),
  ComponentX: RecoveredValue = ({
    rows,
    total,
    note,
  }: RecoveredValue): RecoveredValue => (
    <div className={`ui-iv__totals`}>
      {rows.map(
        ([e, t]: RecoveredValue): RecoveredValue => (
          <div key={e}>
            <span>{e}</span>
            <span>{t}</span>
          </div>
        ),
      )}
      <div className={`ui-iv__total`}>
        <span>{total[0]}</span>
        <b>{total[1]}</b>
      </div>
      {note && (
        <div className={`ui-iv__note`}>
          <span>{note[0]}</span>
          <span>{note[1]}</span>
        </div>
      )}
    </div>
  );
function S({
  value,
  max,
  symbol,
  disabled,
  label,
  onChange,
}: RecoveredValue): RecoveredValue {
  let [l, u]: RecoveredValue = (0, n_demo_By9FWyzm.useState)(null),
    d: RecoveredValue = l ?? p.format(value);
  return (
    <label
      className={`ui-iv__amount`}
      data-disabled={disabled ? `` : void 0}
      style={
        {
          "--ui-iv-chars": Math.max(4, d.length),
        } as RecoveredValue
      }
    >
      <span>{symbol}</span>
      <input
        inputMode={`decimal`}
        aria-label={label}
        disabled={disabled}
        value={d}
        onFocus={(): RecoveredValue => u(String(value))}
        onChange={(e?: RecoveredValue): RecoveredValue =>
          u(e.target.value.replace(/[^\d.-]/g, ``))
        }
        onBlur={(): RecoveredValue => {
          (onChange(
            Math.max(
              Math.min(0, max),
              Math.min(Math.max(0, max), s(parseFloat(l ?? ``) || 0)),
            ),
          ),
            u(null));
        }}
        onKeyDown={(t?: RecoveredValue): RecoveredValue => {
          (t.key === `Enter` && t.currentTarget.blur(),
            t.key === `Escape` &&
              l !== String(value) &&
              (t.preventDefault(), t.stopPropagation(), u(String(value))));
        }}
      />
    </label>
  );
}
var w: RecoveredValue = 760;
function Runtime(): RecoveredValue {
  let e: RecoveredValue = (0, n_demo_By9FWyzm.useRef)(null),
    [t, i]: RecoveredValue = (0, n_demo_By9FWyzm.useState)(null);
  return (
    (0, n_demo_By9FWyzm.useLayoutEffect)((): RecoveredValue => {
      let t: RecoveredValue = e.current,
        n: RecoveredValue = t?.closest(`.card__preview`),
        r: RecoveredValue = n ?? t?.closest(`.stage`);
      if (!t || !r) return;
      let a: RecoveredValue = (): RecoveredValue => {
        let e: RecoveredValue = r.clientWidth;
        if (n)
          return i({
            scale: (e - 48) / w,
            card: !0,
          });
        if (e < 760) return i(null);
        i({
          scale: Math.min(0.82, (e - 140) / w),
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
        className={`invoice-demo`}
        data-fit={t ? (t.card ? `card` : `stage`) : void 0}
      >
        <div
          className={`invoice-demo__frame`}
          style={
            (t
              ? t.card
                ? {
                    width: w,
                    transform: `scale(${t.scale})`,
                  }
                : {
                    width: w,
                    zoom: t.scale,
                  }
              : void 0) as RecoveredValue
          }
        >
          <ComponentO />
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
