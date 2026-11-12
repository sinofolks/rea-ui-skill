"use client";

import "./LiveSession.css";
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
var n_component_CJmfeIbq: RecoveredValue = t_react_BkAXpnfr(),
  r_component_CJmfeIbq: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_CJmfeIbq: RecoveredValue = `you`,
  a_component_CJmfeIbq: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  o_component_CJmfeIbq: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Array.isArray(e) ? e : [e],
  s_component_CJmfeIbq: RecoveredValue = [0, 120, 240, 120, 240, 360, 240, 360, 480],
  c_component_CJmfeIbq: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = 0;
    for (let n of e) t = (t * 31 + n.charCodeAt(0)) >>> 0;
    for (let e: RecoveredValue = 0; e < 64; e++) {
      let n: RecoveredValue = (t >> e % 26) & 63,
        r: RecoveredValue = [0, 1, 2].flatMap((e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = (n >> (e * 2)) & 1;
          return [t, (n >> (e * 2 + 1)) & 1, t];
        });
      if (r.filter(Boolean).length >= 5) return r;
      t = (t * 1103515245 + 12345) >>> 0;
    }
    return [1, 0, 1, 0, 1, 0, 1, 0, 1];
  },
  l_component_CJmfeIbq: RecoveredValue = [1, 1, 1, 1, 1, 1, 1, 1, 1],
  u_component_CJmfeIbq: RecoveredValue = 3,
  ee: RecoveredValue = (e?: RecoveredValue, t: RecoveredValue = 40): RecoveredValue => {
    if (e.length <= t) return e;
    let n: RecoveredValue = Math.min(16, Math.floor(t / 2.5));
    return `${e.slice(0, t - n - 1).trimEnd()}…${e.slice(-n)}`;
  },
  d_component_CJmfeIbq: RecoveredValue = [
    `rgba(0, 96, 226, 0.78)`,
    `rgba(166, 81, 240, 0.85)`,
    `rgba(20, 179, 240, 0.8)`,
    `rgba(242, 138, 46, 0.82)`,
    `rgba(95, 200, 138, 0.8)`,
    `rgba(238, 62, 158, 0.78)`,
  ],
  f_component_CJmfeIbq: RecoveredValue = (): RecoveredValue => (
    <svg
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
  p_component_CJmfeIbq: RecoveredValue = (): RecoveredValue => (
    <svg
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
  m: RecoveredValue = (): RecoveredValue => (
    <svg
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
  te: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M5.2 7.6 4.4 8.4a1.9 1.9 0 0 1-2.7-2.7l1.6-1.6a1.9 1.9 0 0 1 2.7 0`}
        stroke={`currentColor`}
        strokeWidth={`1.3`}
        strokeLinecap={`round`}
        opacity={`0.5`}
      />
      <path
        d={`M6.8 4.4l.8-.8a1.9 1.9 0 0 1 2.7 2.7L8.7 7.9a1.9 1.9 0 0 1-2.7 0`}
        stroke={`currentColor`}
        strokeWidth={`1.3`}
        strokeLinecap={`round`}
      />
    </svg>
  ),
  h_component_CJmfeIbq: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M3.8 3.6 1.6 6l2.2 2.4M8.2 3.6 10.4 6 8.2 8.4`}
        stroke={`currentColor`}
        strokeWidth={`1.3`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      />
      <path
        d={`M6.9 2.8 5.1 9.2`}
        stroke={`currentColor`}
        strokeWidth={`1.3`}
        strokeLinecap={`round`}
        opacity={`0.5`}
      />
    </svg>
  );
function ComponentNe({ a: e }: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = g_component_CJmfeIbq(e);
  if (!e.preview)
    return (
      <p className={`ui-crs__window-empty`}>
        {`No preview for `}
        {e.label}
      </p>
    );
  if (t === `table`) {
    let [t, ...n]: RecoveredValue = e.preview
      .trim()
      .split(
        `
`,
      )
      .map((e?: RecoveredValue): RecoveredValue => e.split(`,`));
    return (
      <table className={`ui-crs__sheet`}>
        <thead>
          <tr>
            {t.map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <th children={e} key={t} />
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {n.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <tr
                children={e.map(
                  (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                    <td children={e} key={t} />
                  ),
                )}
                key={t}
              />
            ),
          )}
        </tbody>
      </table>
    );
  }
  return t === `folder` ? (
    <ul className={`ui-crs__tree`}>
      {e.preview
        .trim()
        .split(
          `
`,
        )
        .map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
          let ComponentN: RecoveredValue = /\/$/.test(e)
            ? f_component_CJmfeIbq
            : p_component_CJmfeIbq;
          return (
            <li key={t}>
              <ComponentN />
              {e}
            </li>
          );
        })}
    </ul>
  ) : /\.md$/i.test(e.label) ? (
    <div className={`ui-crs__doc`}>
      {e.preview
        .trim()
        .split(
          `
`,
        )
        .filter(
          (e?: RecoveredValue, t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
            e || !/^#/.test(n[t - 1] ?? ``),
        )
        .map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
          let n: RecoveredValue = /^#{1,3}\s+(.*)$/.exec(e);
          return n ? (
            <p className={`ui-crs__doc-h`} children={n[1]} key={t} />
          ) : (
            <p children={e || `\xA0`} key={t} />
          );
        })}
    </div>
  ) : (
    <pre
      className={`ui-crs__doc`}
      data-code={
        /\.(tsx?|jsx?|json|css|py)$/i.test(e.label) || t === `tool` ? `` : void 0
      }
    >
      {e.preview.trim()}
    </pre>
  );
}
var g_component_CJmfeIbq: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e.kind ??
    (/\/$/.test(e.label)
      ? `folder`
      : /\.(csv|tsv|xlsx?)$/i.test(e.label)
        ? `table`
        : `file`),
  re: RecoveredValue = {
    file: p_component_CJmfeIbq,
    folder: f_component_CJmfeIbq,
    table: m,
    tool: h_component_CJmfeIbq,
    link: te,
  };
function ComponentN_component_CJmfeIbq({
  agents,
  messages,
  task,
  live = !1,
  selected,
  onSelectedChange,
  focusAgent,
  onFocusAgentChange,
  maxHeight = 520,
  logos,
  onSend,
  placeholder = `Message the agents – @ to name one`,
  title = `Agent chat`,
  className,
}: RecoveredValue): RecoveredValue {
  let b: RecoveredValue = new Map([
      ...agents.map((e?: RecoveredValue): RecoveredValue => [e.id, e]),
      [
        i_component_CJmfeIbq,
        {
          id: i_component_CJmfeIbq,
          name: `You`,
        },
      ],
    ]),
    x: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e === `all` ? `everyone` : (b.get(e)?.name ?? e),
    S: RecoveredValue = ({ id, busy }: RecoveredValue): RecoveredValue => {
      let a: RecoveredValue = b.get(id);
      if (a?.avatar)
        return (
          <span
            className={`ui-crs__logo`}
            data-busy={busy ? `` : void 0}
            aria-hidden={`true`}
          >
            {a.avatar}
          </span>
        );
      let o: RecoveredValue =
          id === i_component_CJmfeIbq ? l_component_CJmfeIbq : c_component_CJmfeIbq(id),
        u: RecoveredValue = agents.findIndex(
          (e?: RecoveredValue): RecoveredValue => e.id === id,
        );
      return (
        <span
          className={`ui-crs__mark`}
          data-busy={busy ? `` : void 0}
          data-you={id === i_component_CJmfeIbq ? `` : void 0}
          style={
            {
              "--ui-crs-c":
                u < 0 ? void 0 : d_component_CJmfeIbq[u % d_component_CJmfeIbq.length],
            } as RecoveredValue
          }
          aria-hidden={`true`}
        >
          {o.map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
              <i
                data-on={e ? `` : void 0}
                style={
                  {
                    animationDelay: `${s_component_CJmfeIbq[t]}ms`,
                  } as RecoveredValue
                }
                key={t}
              />
            ),
          )}
        </span>
      );
    },
    le: RecoveredValue = Object.keys(logos ?? {}).sort(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => t.length - e.length,
    ),
    ue: RecoveredValue = le.length
      ? RegExp(
          `\\b(${le.map((e?: RecoveredValue): RecoveredValue => e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`)).join(`|`)})\\b`,
          `g`,
        )
      : null,
    de: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      !ue || !logos
        ? e
        : e.split(ue).map(
            (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
              t % 2 ? (
                <span className={`ui-crs__co`} key={t}>
                  <span className={`ui-crs__co-logo`} aria-hidden={`true`}>
                    {logos[e]}
                  </span>
                  {e}
                </span>
              ) : (
                e
              ),
          ),
    [fe, pe]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(null),
    C: RecoveredValue = selected === void 0 ? fe : selected,
    w: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (pe(e), onSelectedChange?.(e));
    },
    [me, he]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(null),
    T: RecoveredValue = focusAgent === void 0 ? me : focusAgent,
    E: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (he(e), onFocusAgentChange?.(e));
    },
    D: RecoveredValue = new Map(
      messages.map((e?: RecoveredValue): RecoveredValue => [e.id, e]),
    ),
    O: RecoveredValue = C && D.has(C) ? C : null,
    ge: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      e.from === t ||
      o_component_CJmfeIbq(e.to).includes(t) ||
      (o_component_CJmfeIbq(e.to).includes(`all`) && e.from !== t),
    _e: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      O ? e.id === O : !T || ge(e, T),
    k: RecoveredValue = !!O || !!T,
    A: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(null),
    [ve, ye]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(!0),
    [be, j]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(0),
    xe: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(messages.length);
  (0, n_component_CJmfeIbq.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = A.current,
      n: RecoveredValue = messages.length - xe.current;
    ((xe.current = messages.length),
      e &&
        (ve
          ? e.scrollTo({
              top: e.scrollHeight,
              behavior: a_component_CJmfeIbq() || n <= 0 ? `auto` : `smooth`,
            })
          : n > 0 && j((e?: RecoveredValue): RecoveredValue => e + n)));
  }, [messages.length, messages.at(-1)?.typing]);
  let Se: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = A.current;
      if (!e) return;
      let t: RecoveredValue = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
      (ye(t), t && j(0));
    },
    Ce: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = A.current;
      (e?.scrollTo({
        top: e.scrollHeight,
        behavior: a_component_CJmfeIbq() ? `auto` : `smooth`,
      }),
        j(0));
    },
    M: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(new Map()),
    [N, P]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(null),
    F: RecoveredValue = N && D.has(N) ? N : messages.at(-1)?.id,
    we: RecoveredValue = (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
      let r: RecoveredValue =
        e.key === `ArrowDown`
          ? n + 1
          : e.key === `ArrowUp`
            ? n - 1
            : e.key === `Home`
              ? 0
              : e.key === `End`
                ? messages.length - 1
                : -2;
      if (r !== -2) {
        e.preventDefault();
        let n: RecoveredValue = messages[Math.max(0, Math.min(messages.length - 1, r))];
        (P(n.id), M.current.get(n.id)?.focus());
        return;
      }
      if (e.key === `Enter` || e.key === ` `) {
        e.preventDefault();
        let r: RecoveredValue = messages[n].id;
        (E(null), w(C === r ? null : r));
      }
      e.key === `Escape` && k && (e.preventDefault(), w(null), E(null));
    },
    [Te, Ee]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(null),
    De: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = M.current.get(e);
      t &&
        (t.scrollIntoView({
          block: `nearest`,
          behavior: a_component_CJmfeIbq() ? `auto` : `smooth`,
        }),
        P(e),
        Ee(e),
        window.setTimeout(
          (): RecoveredValue =>
            Ee((t?: RecoveredValue): RecoveredValue => (t === e ? null : t)),
          1400,
        ));
    },
    Oe: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(new Set()),
    ke: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(!1),
    Ae: RecoveredValue = new Set(
      ke.current
        ? messages
            .filter((e?: RecoveredValue): RecoveredValue => !Oe.current.has(e.id))
            .map((e?: RecoveredValue): RecoveredValue => e.id)
        : [],
    );
  (0, n_component_CJmfeIbq.useLayoutEffect)((): RecoveredValue => {
    ke.current = !0;
    for (let e of messages) Oe.current.add(e.id);
  });
  let I: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(null),
    L: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(null),
    je: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(null),
    [R, Me]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(null),
    Ne: RecoveredValue = (
      e?: RecoveredValue,
      t?: RecoveredValue,
      n?: RecoveredValue,
    ): RecoveredValue => {
      ((je.current = n),
        Me({
          a: e,
          m: t,
        }));
    },
    z: RecoveredValue = (): RecoveredValue => {
      (Me(null),
        je.current?.focus({
          preventScroll: !0,
        }));
    };
  ((0, n_component_CJmfeIbq.useEffect)((): RecoveredValue => {
    R &&
      L.current?.querySelector(`.ui-crs__preview-close`)?.focus({
        preventScroll: !0,
      });
  }, [R]),
    (0, n_component_CJmfeIbq.useEffect)((): RecoveredValue => {
      if (!k) return;
      let e: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        let t: RecoveredValue = e.target;
        L.current?.contains(t) ||
          (O && !M.current.get(O)?.contains(t) && w(null),
          I.current && !I.current.contains(t) && E(null));
      };
      return (
        document.addEventListener(`pointerdown`, e),
        (): RecoveredValue => document.removeEventListener(`pointerdown`, e)
      );
    }));
  let B: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(null),
    [Pe, Fe]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(null),
    [Ie, Le]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(``),
    V: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = B.current;
      if (!e) return;
      let t: RecoveredValue = e.scrollLeft > 1,
        n: RecoveredValue = e.scrollLeft + e.clientWidth < e.scrollWidth - 1;
      Le(t && n ? `both` : t ? `start` : n ? `end` : ``);
    };
  (0, n_component_CJmfeIbq.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = B.current;
    if (!e) return;
    V();
    let t: RecoveredValue = new ResizeObserver(V);
    return (t.observe(e), (): RecoveredValue => t.disconnect());
  });
  let Re: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = [...(B.current?.querySelectorAll(`.ui-crs__tab`) ?? [])],
        n: RecoveredValue = t.indexOf(document.activeElement as HTMLElement),
        r: RecoveredValue = B.current && getComputedStyle(B.current).direction === `rtl`,
        i: RecoveredValue =
          e.key === `Home`
            ? 0
            : e.key === `End`
              ? t.length - 1
              : e.key === (r ? `ArrowLeft` : `ArrowRight`)
                ? n + 1
                : e.key === (r ? `ArrowRight` : `ArrowLeft`)
                  ? n - 1
                  : null;
      if (i === null || n < 0) return;
      e.preventDefault();
      let a: RecoveredValue = t[Math.max(0, Math.min(t.length - 1, i))];
      (a.focus(),
        a.scrollIntoView({
          block: `nearest`,
          inline: `nearest`,
        }));
    },
    ze: RecoveredValue = new Set(
      messages
        .filter(
          (e?: RecoveredValue): RecoveredValue =>
            e.from === i_component_CJmfeIbq && e.replyTo,
        )
        .map((e?: RecoveredValue): RecoveredValue => e.replyTo),
    ),
    Be: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      e.kind === `question` &&
      !e.typing &&
      o_component_CJmfeIbq(e.to).includes(i_component_CJmfeIbq) &&
      !ze.has(e.id),
    H: RecoveredValue = (0, n_component_CJmfeIbq.useRef)(null),
    [U, W]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(``),
    [G, K]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(null),
    [q, J]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(null),
    [Y, X]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(!1),
    [Ve, Z]: RecoveredValue = (0, n_component_CJmfeIbq.useState)(0),
    He: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (K(e), w(null), requestAnimationFrame((): RecoveredValue => H.current?.focus()));
    },
    Ue: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = e.value.slice(0, e.selectionStart ?? e.value.length),
        n: RecoveredValue = /(?:^|\s)@([^\s@]*)$/.exec(t);
      (J(n ? n[1] : null), Z(0));
    },
    Q: RecoveredValue = Y
      ? agents.slice(0, 6)
      : q === null
        ? []
        : agents
            .filter(
              (e?: RecoveredValue): RecoveredValue =>
                e.name.toLowerCase().includes(q.toLowerCase()),
            )
            .slice(0, 6),
    We: RecoveredValue = (Y || q !== null) && Q.length > 0,
    Ge: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = H.current;
      if (!t) return;
      let n: RecoveredValue = t.selectionStart ?? U.length,
        r: RecoveredValue = U.slice(0, n),
        i: RecoveredValue = Y
          ? `${r}${r && !/\s$/.test(r) ? ` ` : ``}@${e.name} `
          : r.replace(/@([^\s@]*)$/, `@${e.name} `),
        a: RecoveredValue = i + U.slice(n);
      (W(a),
        J(null),
        X(!1),
        requestAnimationFrame((): RecoveredValue => {
          (t.focus(), t.setSelectionRange(i.length, i.length));
        }));
    },
    Ke: RecoveredValue = [...agents]
      .sort(
        (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          t.name.length - e.name.length,
      )
      .filter(
        (e?: RecoveredValue): RecoveredValue =>
          U.toLowerCase().includes(`@${e.name.toLowerCase()}`),
      ),
    $: RecoveredValue = [
      ...new Set([
        ...(G ? [G.from] : []),
        ...agents
          .filter((e?: RecoveredValue): RecoveredValue => Ke.includes(e))
          .map((e?: RecoveredValue): RecoveredValue => e.id),
      ]),
    ].filter((e?: RecoveredValue): RecoveredValue => e !== i_component_CJmfeIbq),
    qe: RecoveredValue = (): RecoveredValue => {
      let e: RecoveredValue = U.trim();
      e &&
        onSend &&
        (onSend({
          text: e,
          to: $.length ? $ : [`all`],
          replyTo: G?.id,
        }),
        W(``),
        K(null),
        J(null),
        X(!1));
    },
    Je: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (We) {
        if (e.key === `ArrowDown` || e.key === `ArrowUp`) {
          (e.preventDefault(),
            Z(
              (t?: RecoveredValue): RecoveredValue =>
                (t + (e.key === `ArrowDown` ? 1 : Q.length - 1)) % Q.length,
            ));
          return;
        }
        if (e.key === `Enter` || e.key === `Tab`) {
          (e.preventDefault(), Ge(Q[Ve]));
          return;
        }
        if (e.key === `Escape`) {
          (e.preventDefault(), J(null), X(!1));
          return;
        }
      }
      if (e.key === `Escape` && G) {
        (e.preventDefault(), K(null));
        return;
      }
      e.key === `Enter` && !e.shiftKey && (e.preventDefault(), qe());
    },
    Ye: RecoveredValue = [];
  for (let e of messages)
    e.kind !== `spawn` && b.has(e.from) && !Ye.includes(e.from) && Ye.push(e.from);
  return (
    <div
      ref={I as RecoveredValue}
      className={[`ui-crs`, className].filter(Boolean).join(` `)}
      data-picking={k ? `` : void 0}
    >
      <div className={`ui-crs__top`}>
        <div
          ref={B as RecoveredValue}
          className={`ui-crs__tabs`}
          role={`toolbar`}
          aria-label={
            task ? `${title}: ${task} – show messages of` : `${title} – show messages of`
          }
          data-more={Ie || void 0}
          onScroll={V}
          onKeyDown={Re}
        >
          <button
            type={`button`}
            className={`ui-crs__tab`}
            aria-pressed={!T}
            tabIndex={Pe === null ? 0 : -1}
            onFocus={(): RecoveredValue => Fe(null)}
            onClick={(): RecoveredValue => (E(null), w(null))}
          >{`Everyone`}</button>
          {Ye.map(
            (e?: RecoveredValue): RecoveredValue => (
              <button
                type={`button`}
                className={`ui-crs__tab`}
                aria-pressed={T === e}
                tabIndex={Pe === e ? 0 : -1}
                onFocus={(): RecoveredValue => Fe(e)}
                title={b.get(e)?.model ? `${x(e)} · ${b.get(e)?.model}` : x(e)}
                onClick={(): RecoveredValue => {
                  (w(null), E(T === e ? null : e));
                }}
                key={e}
              >
                <S id={e} />
                <span className={`ui-crs__tab-name`} dir={`auto`}>
                  {x(e)}
                </span>
              </button>
            ),
          )}
        </div>
        {live && (
          <span className={`ui-crs__live`}>
            <span className={`ui-crs__pulse`} aria-hidden={`true`} />
            {`Live`}
          </span>
        )}
      </div>
      <div className={`ui-crs__panel`}>
        <div
          ref={A as RecoveredValue}
          className={`ui-crs__scroll`}
          style={
            (onSend
              ? {
                  height: maxHeight,
                }
              : {
                  maxHeight: maxHeight,
                }) as RecoveredValue
          }
          onScroll={Se}
        >
          {messages.length === 0 ? (
            <p className={`ui-crs__empty`}>
              {live ? `Waiting for the first message…` : `No messages in this run`}
            </p>
          ) : (
            <div
              className={`ui-crs__stream`}
              role={`log`}
              aria-label={title}
              aria-live={live ? `polite` : void 0}
            >
              {messages.map((e?: RecoveredValue, n?: RecoveredValue): RecoveredValue => {
                let s: RecoveredValue = o_component_CJmfeIbq(e.to),
                  c: RecoveredValue = s.includes(`all`)
                    ? `everyone`
                    : s.map(x).join(`, `),
                  l: RecoveredValue = messages[n - 1],
                  d: RecoveredValue =
                    !!l &&
                    l.kind !== `spawn` &&
                    e.kind !== `spawn` &&
                    l.from === e.from &&
                    o_component_CJmfeIbq(l.to).join() === s.join() &&
                    !l.typing,
                  f: RecoveredValue = {
                    ref: (t?: RecoveredValue): RecoveredValue => {
                      t ? M.current.set(e.id, t) : M.current.delete(e.id);
                    },
                    tabIndex: F === e.id ? 0 : -1,
                    "data-fresh": Ae.has(e.id) ? `` : void 0,
                    "data-kept": k && _e(e) ? `` : void 0,
                    onFocus: (t?: RecoveredValue): RecoveredValue =>
                      t.target === t.currentTarget && P(e.id),
                    onKeyDown: (e?: RecoveredValue): RecoveredValue => we(e, n),
                    onClick: (): RecoveredValue => {
                      (P(e.id), E(null));
                      let t: RecoveredValue = C !== e.id;
                      (w(t ? e.id : null),
                        t &&
                          e.details &&
                          window.setTimeout(
                            (): RecoveredValue =>
                              M.current
                                .get(e.id)
                                ?.querySelector(`.ui-crs__more`)
                                ?.scrollIntoView({
                                  block: `nearest`,
                                  behavior: a_component_CJmfeIbq() ? `auto` : `smooth`,
                                }),
                            340,
                          ));
                    },
                  };
                if (e.kind === `spawn`)
                  return ((
                    _Component?: RecoveredValue,
                    _props?: RecoveredValue,
                    _key?: RecoveredValue,
                  ): RecoveredValue => <_Component key={_key} {..._props} />)(
                    `div`,
                    {
                      ...f,
                      className: `ui-crs__system`,
                      "aria-label": `${x(e.from)} started ${c}: ${e.text}`,
                      children: (
                        <span
                          className={`ui-crs__system-text`}
                          dir={`auto`}
                          title={e.text}
                        >
                          {x(e.from)}
                          {` started `}
                          <span className={`ui-crs__system-name`}>{c}</span>
                        </span>
                      ),
                    },
                    e.id,
                  );
                let p: RecoveredValue =
                  e.replyTo && e.replyTo !== l?.id ? D.get(e.replyTo) : void 0;
                return ((
                  _Component2?: RecoveredValue,
                  _props2?: RecoveredValue,
                  _key2?: RecoveredValue,
                ): RecoveredValue => <_Component2 key={_key2} {..._props2} />)(
                  `div`,
                  {
                    ...f,
                    className: `ui-crs__msg`,
                    "data-you": e.from === i_component_CJmfeIbq ? `` : void 0,
                    "data-flash": Te === e.id ? `` : void 0,
                    "data-same": d ? `` : void 0,
                    "data-typing": e.typing ? `` : void 0,
                    "data-selected": C === e.id ? `` : void 0,
                    "aria-current": C === e.id ? `true` : void 0,
                    "aria-label": `${x(e.from)} to ${c}${e.at ? `, ${e.at}` : ``}: ${e.typing ? `writing…` : e.text}`,
                    children: [
                      <span className={`ui-crs__side`}>
                        {!d && <S id={e.from} busy={e.typing} />}
                      </span>,
                      <div className={`ui-crs__body`}>
                        {!d && (
                          <div className={`ui-crs__head`}>
                            <span className={`ui-crs__from`} dir={`auto`}>
                              {x(e.from)}
                            </span>
                            {e.kind === `handoff` && (
                              <span className={`ui-crs__tag`}>{`Handoff`}</span>
                            )}
                            {Be(e) && (
                              <span className={`ui-crs__needs`}>{`Needs you`}</span>
                            )}
                            {Be(e) && onSend && (
                              <button
                                type={`button`}
                                className={`ui-crs__reply`}
                                tabIndex={F === e.id ? 0 : -1}
                                aria-label={`Reply to ${x(e.from)}`}
                                onPointerDown={(e?: RecoveredValue): RecoveredValue =>
                                  e.stopPropagation()
                                }
                                onClick={(t?: RecoveredValue): RecoveredValue => {
                                  (t.stopPropagation(), He(e));
                                }}
                              >{`Reply`}</button>
                            )}
                            {e.at && !e.typing && (
                              <span className={`ui-crs__at`}>{e.at}</span>
                            )}
                          </div>
                        )}
                        {p && (
                          <button
                            type={`button`}
                            className={`ui-crs__quote`}
                            tabIndex={-1}
                            aria-label={`Replying to ${x(p.from)}: ${p.text} – show it`}
                            onClick={(e?: RecoveredValue): RecoveredValue => {
                              (e.stopPropagation(), De(p.id));
                            }}
                          >
                            <span className={`ui-crs__quote-name`} dir={`auto`}>
                              {s.includes(p.from) && (
                                <span className={`ui-crs__quote-to`}>{`to`}</span>
                              )}
                              <S id={p.from} />
                              {x(p.from)}
                            </span>
                            <span className={`ui-crs__quote-text`} dir={`auto`}>
                              {p.text}
                            </span>
                          </button>
                        )}
                        {!p && !d && (
                          <span className={`ui-crs__quote`} data-only={``}>
                            <span className={`ui-crs__quote-name`} dir={`auto`}>
                              <span className={`ui-crs__quote-to`}>{`to`}</span>
                              {s.includes(`all`)
                                ? `Everyone`
                                : s
                                    .slice(
                                      0,
                                      s.length > u_component_CJmfeIbq
                                        ? 2
                                        : u_component_CJmfeIbq,
                                    )
                                    .map(
                                      (e?: RecoveredValue): RecoveredValue => (
                                        <span className={`ui-crs__quote-who`} key={e}>
                                          <S id={e} />
                                          {x(e)}
                                        </span>
                                      ),
                                    )}
                              {!s.includes(`all`) && s.length > u_component_CJmfeIbq && (
                                <span
                                  className={`ui-crs__quote-more`}
                                  title={s.map(x).join(`, `)}
                                >
                                  {`+`}
                                  {s.length - u_component_CJmfeIbq + 1}
                                </span>
                              )}
                            </span>
                          </span>
                        )}
                        {e.typing ? (
                          <span
                            className={`ui-crs__shimmer`}
                            data-text={`Writing…`}
                          >{`Writing…`}</span>
                        ) : (
                          e.text && (
                            <p className={`ui-crs__text`} dir={`auto`}>
                              {de(e.text)}
                            </p>
                          )
                        )}
                        {!e.typing && e.attachments && e.attachments.length > 0 && (
                          <div className={`ui-crs__files`} dir={`auto`}>
                            {e.attachments.map(
                              (
                                t?: RecoveredValue,
                                n?: RecoveredValue,
                              ): RecoveredValue => {
                                let ComponentI: RecoveredValue =
                                  re[g_component_CJmfeIbq(t)];
                                return (
                                  <button
                                    type={`button`}
                                    className={`ui-crs__file`}
                                    title={t.label}
                                    aria-label={`Open ${t.label}`}
                                    aria-haspopup={`dialog`}
                                    tabIndex={F === e.id ? 0 : -1}
                                    onKeyDown={(e?: RecoveredValue): RecoveredValue =>
                                      e.stopPropagation()
                                    }
                                    onClick={(n?: RecoveredValue): RecoveredValue => {
                                      (n.stopPropagation(), Ne(t, e, n.currentTarget));
                                    }}
                                    key={n}
                                  >
                                    <ComponentI />
                                    <span className={`ui-crs__file-name`} dir={`auto`}>
                                      {g_component_CJmfeIbq(t) === `link` ||
                                      g_component_CJmfeIbq(t) === `tool`
                                        ? t.label
                                        : ee(t.label)}
                                    </span>
                                  </button>
                                );
                              },
                            )}
                          </div>
                        )}
                      </div>,
                      e.details && (
                        <div
                          className={`ui-crs__more`}
                          data-open={C === e.id ? `` : void 0}
                          inert={C !== e.id || void 0}
                        >
                          <div
                            className={`ui-crs__card`}
                            onClick={(e?: RecoveredValue): RecoveredValue =>
                              e.stopPropagation()
                            }
                          >
                            {e.details.facts && e.details.facts.length > 0 && (
                              <dl className={`ui-crs__facts`}>
                                {e.details.facts.map(
                                  (
                                    e?: RecoveredValue,
                                    t?: RecoveredValue,
                                  ): RecoveredValue => (
                                    <div key={t}>
                                      <dt>{e.label}</dt>
                                      <dd>{e.value}</dd>
                                    </div>
                                  ),
                                )}
                              </dl>
                            )}
                            {e.details.items && e.details.items.length > 0 && (
                              <ul className={`ui-crs__items`}>
                                {e.details.items.map(
                                  (
                                    e?: RecoveredValue,
                                    t?: RecoveredValue,
                                  ): RecoveredValue => (
                                    <li className={`ui-crs__item`} key={t}>
                                      <span
                                        className={`ui-crs__tile`}
                                        aria-hidden={`true`}
                                      >
                                        {e.icon ?? (
                                          <span className={`ui-crs__tile-dot`} />
                                        )}
                                      </span>
                                      <span
                                        className={`ui-crs__item-label`}
                                        dir={`auto`}
                                        title={e.label}
                                      >
                                        {e.label}
                                      </span>
                                      {e.detail && (
                                        <span
                                          className={`ui-crs__item-detail`}
                                          dir={`auto`}
                                          title={e.detail}
                                        >
                                          {e.detail}
                                        </span>
                                      )}
                                    </li>
                                  ),
                                )}
                              </ul>
                            )}
                          </div>
                        </div>
                      ),
                    ],
                  },
                  e.id,
                );
              })}
            </div>
          )}
        </div>
        {be > 0 && (
          <button type={`button`} className={`ui-crs__new`} onClick={Ce}>
            {be}
            {` new ↓`}
          </button>
        )}
      </div>
      {onSend && (
        <div className={`ui-crs__composer`}>
          {We && (
            <ul className={`ui-crs__menu`} role={`listbox`} aria-label={`Agents`}>
              {Q.map(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                  <li
                    role={`option`}
                    aria-selected={t === Ve}
                    className={`ui-crs__option`}
                    onPointerDown={(t?: RecoveredValue): RecoveredValue => {
                      (t.preventDefault(), Ge(e));
                    }}
                    onPointerEnter={(): RecoveredValue => Z(t)}
                    key={e.id}
                  >
                    <S id={e.id} />
                    <span dir={`auto`}>{e.name}</span>
                    {e.model && <span className={`ui-crs__option-model`}>{e.model}</span>}
                  </li>
                ),
              )}
            </ul>
          )}
          <div
            className={`ui-crs__write`}
            onClick={(): RecoveredValue => H.current?.focus()}
          >
            {G && (
              <div className={`ui-crs__quote ui-crs__quote--draft`}>
                <span className={`ui-crs__quote-name`} dir={`auto`}>
                  <span className={`ui-crs__quote-to`}>{`to`}</span>
                  <S id={G.from} />
                  {x(G.from)}
                  <button
                    type={`button`}
                    className={`ui-crs__unreply`}
                    aria-label={`Don't reply to this message`}
                    onClick={(): RecoveredValue => K(null)}
                  >{`×`}</button>
                </span>
                <span className={`ui-crs__quote-text`} dir={`auto`}>
                  {G.text}
                </span>
              </div>
            )}
            <textarea
              ref={H as RecoveredValue}
              className={`ui-crs__field`}
              rows={1}
              value={U}
              placeholder={G ? `Answer ${x(G.from)}…` : placeholder}
              aria-label={`Message the agents`}
              aria-autocomplete={`list`}
              aria-expanded={We}
              onChange={(e?: RecoveredValue): RecoveredValue => {
                (W(e.target.value), X(!1), Ue(e.target));
              }}
              onBlur={(): RecoveredValue => X(!1)}
              onSelect={(e?: RecoveredValue): RecoveredValue => Ue(e.currentTarget)}
              onKeyDown={Je}
            />
            <div className={`ui-crs__tools`}>
              <button
                type={`button`}
                className={`ui-crs__at-btn`}
                aria-label={`Name an agent`}
                aria-expanded={Y}
                onPointerDown={(e?: RecoveredValue): RecoveredValue => e.preventDefault()}
                onClick={(): RecoveredValue => {
                  (H.current?.focus(),
                    J(null),
                    Z(0),
                    X((e?: RecoveredValue): RecoveredValue => !e));
                }}
              >{`@`}</button>
              <span className={`ui-crs__for`}>
                {$.length ? (
                  <r_component_CJmfeIbq.Fragment>
                    {`to`}
                    {` `}
                    {$.slice(
                      0,
                      $.length > u_component_CJmfeIbq ? 2 : u_component_CJmfeIbq,
                    ).map(
                      (e?: RecoveredValue): RecoveredValue => (
                        <span className={`ui-crs__for-who`} key={e}>
                          <S id={e} />
                          {x(e)}
                        </span>
                      ),
                    )}
                    {$.length > u_component_CJmfeIbq && (
                      <span className={`ui-crs__for-more`} title={$.map(x).join(`, `)}>
                        {`+`}
                        {$.length - u_component_CJmfeIbq + 1}
                      </span>
                    )}
                  </r_component_CJmfeIbq.Fragment>
                ) : (
                  `to everyone`
                )}
              </span>
              <button
                type={`button`}
                className={`ui-crs__send`}
                aria-label={`Send`}
                disabled={!U.trim()}
                onClick={qe}
              >
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
              </button>
            </div>
          </div>
        </div>
      )}
      {R && (
        <div
          className={`ui-crs__preview`}
          onPointerDown={(e?: RecoveredValue): RecoveredValue => {
            e.target === e.currentTarget && z();
          }}
        >
          <div
            ref={L as RecoveredValue}
            className={`ui-crs__window`}
            role={`dialog`}
            aria-modal={`true`}
            aria-label={R.a.label}
            onKeyDown={(e?: RecoveredValue): RecoveredValue => {
              if (e.key === `Escape`) (e.preventDefault(), e.stopPropagation(), z());
              else if (e.key === `Tab`) {
                let t: RecoveredValue = [
                    ...(L.current?.querySelectorAll(`button, [tabindex='0']`) ?? []),
                  ],
                  n: RecoveredValue = t.indexOf(document.activeElement as HTMLElement);
                (e.shiftKey ? n <= 0 : n === t.length - 1) &&
                  (e.preventDefault(), t[e.shiftKey ? t.length - 1 : 0]?.focus());
              }
            }}
          >
            <div className={`ui-crs__window-head`}>
              <span className={`ui-crs__window-icon`}>
                {((): RecoveredValue => {
                  let ComponentE: RecoveredValue = re[g_component_CJmfeIbq(R.a)];
                  return <ComponentE />;
                })()}
              </span>
              <span className={`ui-crs__window-title`}>
                <span className={`ui-crs__window-name`} dir={`auto`}>
                  {R.a.label}
                </span>
                <span className={`ui-crs__window-meta`}>
                  <S id={R.m.from} />
                  {x(R.m.from)}
                  {R.m.at && (
                    <r_component_CJmfeIbq.Fragment>
                      {` · `}
                      {R.m.at}
                    </r_component_CJmfeIbq.Fragment>
                  )}
                  {R.a.meta && (
                    <r_component_CJmfeIbq.Fragment>
                      {` · `}
                      {R.a.meta}
                    </r_component_CJmfeIbq.Fragment>
                  )}
                </span>
              </span>
              <button
                type={`button`}
                className={`ui-crs__preview-close`}
                aria-label={`Close preview`}
                onClick={z}
              >
                <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
                  <path
                    d={`M18 6L6 18M6 6L18 18`}
                    stroke={`currentColor`}
                    strokeWidth={`1.8`}
                    strokeLinecap={`round`}
                  />
                </svg>
              </button>
            </div>
            <div className={`ui-crs__window-body`} tabIndex={0}>
              <ComponentNe a={R.a} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
var n_component_S1IOPgGb: RecoveredValue = t_react_BkAXpnfr(),
  r_component_S1IOPgGb: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_S1IOPgGb: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    typeof e == `number` ? e : e.getTime(),
  a_component_S1IOPgGb: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    String(e).padStart(2, `0`),
  o_component_S1IOPgGb: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = Number.isFinite(e) ? Math.max(0, Math.floor(e / 1e3)) : 0;
    if (t < 60) return `${t}s`;
    let n: RecoveredValue = Math.floor(t / 60);
    if (n < 60) return `${n}m ${a_component_S1IOPgGb(t % 60)}s`;
    let r: RecoveredValue = Math.floor(n / 60);
    return r < 24
      ? `${r}h ${a_component_S1IOPgGb(n % 60)}m`
      : `${Math.floor(r / 24)}d ${r % 24}h`;
  },
  s_component_S1IOPgGb: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Number.isFinite(e)
      ? e < 6e4
        ? `${(Math.max(0, e) / 1e3).toFixed(1)}s`
        : o_component_S1IOPgGb(e)
      : ``,
  c_component_S1IOPgGb: RecoveredValue = new Intl.NumberFormat(`en`),
  l_component_S1IOPgGb: RecoveredValue = {
    subs: new Set(),
    id: 0,
  },
  u_component_S1IOPgGb: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let [t, r]: RecoveredValue = (0, n_component_S1IOPgGb.useState)(
      (): RecoveredValue => Date.now(),
    );
    return (
      (0, n_component_S1IOPgGb.useEffect)((): RecoveredValue => {
        if (!e) return;
        let t: RecoveredValue = (): RecoveredValue => r(Date.now());
        return (
          t(),
          l_component_S1IOPgGb.subs.add(t),
          (l_component_S1IOPgGb.id ||= window.setInterval(
            (): RecoveredValue =>
              l_component_S1IOPgGb.subs.forEach(
                (e?: RecoveredValue): RecoveredValue => e(),
              ),
            100,
          )),
          (): RecoveredValue => {
            (l_component_S1IOPgGb.subs.delete(t),
              l_component_S1IOPgGb.subs.size ||
                (window.clearInterval(l_component_S1IOPgGb.id),
                (l_component_S1IOPgGb.id = 0)));
          }
        );
      }, [e]),
      t
    );
  },
  ComponentD: RecoveredValue = ({
    from,
    live,
    format,
  }: RecoveredValue): RecoveredValue => {
    let i: RecoveredValue = u_component_S1IOPgGb(live);
    return (
      <r_component_S1IOPgGb.Fragment>{format(i - from)}</r_component_S1IOPgGb.Fragment>
    );
  },
  f_component_S1IOPgGb: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  ee_component_S1IOPgGb: RecoveredValue = (): RecoveredValue =>
    typeof navigator < `u` &&
    /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
  p_component_S1IOPgGb: RecoveredValue = `cubic-bezier(0.32, 0.72, 0.24, 1)`,
  m_component_S1IOPgGb: RecoveredValue = {
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 1.4,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
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
  ComponentNe_component_S1IOPgGb: RecoveredValue = ({
    status,
  }: RecoveredValue): RecoveredValue => (
    <span className={`ui-st__step-icon`} data-status={status} aria-hidden={`true`}>
      {status === `done` && (
        <svg width={`16`} height={`16`} viewBox={`0 0 16 16`}>
          <circle cx={`8`} cy={`8`} r={`6.5`} fill={`currentColor`} />
          <path
            d={`m5.4 8.2 1.8 1.8 3.4-3.7`}
            fill={`none`}
            stroke={`#fff`}
            strokeWidth={`1.5`}
            strokeLinecap={`round`}
            strokeLinejoin={`round`}
          />
        </svg>
      )}
      {status === `active` && (
        <svg width={`16`} height={`16`} viewBox={`0 0 16 16`}>
          <circle
            cx={`8`}
            cy={`8`}
            r={`5.8`}
            fill={`none`}
            stroke={`currentColor`}
            strokeOpacity={`0.2`}
            strokeWidth={`1.6`}
          />
          <path
            d={`M8 2.2a5.8 5.8 0 0 1 5.8 5.8`}
            fill={`none`}
            stroke={`currentColor`}
            strokeWidth={`1.6`}
            strokeLinecap={`round`}
          />
        </svg>
      )}
      {status === `pending` && (
        <svg width={`16`} height={`16`} viewBox={`0 0 16 16`}>
          <circle
            cx={`8`}
            cy={`8`}
            r={`5.8`}
            fill={`none`}
            stroke={`currentColor`}
            strokeWidth={`1.2`}
            strokeDasharray={`2 2.2`}
          />
        </svg>
      )}
    </span>
  ),
  ComponentRe: RecoveredValue = (): RecoveredValue => (
    <svg width={`16`} height={`16`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
      <rect
        x={`4.2`}
        y={`3.4`}
        width={`2.6`}
        height={`9.2`}
        rx={`0.9`}
        fill={`currentColor`}
      />
      <rect
        x={`9.2`}
        y={`3.4`}
        width={`2.6`}
        height={`9.2`}
        rx={`0.9`}
        fill={`currentColor`}
      />
    </svg>
  ),
  ComponentIe: RecoveredValue = (): RecoveredValue => (
    <svg width={`16`} height={`16`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
      <path
        d={`M5 3.6v8.8c0 .6.6.9 1.1.6l6.6-4.4a.7.7 0 0 0 0-1.2L6.1 3c-.5-.3-1.1 0-1.1.6Z`}
        fill={`currentColor`}
      />
    </svg>
  ),
  ComponentAe: RecoveredValue = (): RecoveredValue => (
    <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
      <path d={`M6.9 1 2.6 6.6h3l-.5 4.4 4.3-5.6h-3L6.9 1Z`} fill={`currentColor`} />
    </svg>
  ),
  ComponentOe: RecoveredValue = (): RecoveredValue => (
    <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
      <path d={`m3.4 3.4 5.2 5.2M8.6 3.4 3.4 8.6`} {...m_component_S1IOPgGb} />
    </svg>
  ),
  ComponentH: RecoveredValue = (): RecoveredValue => (
    <svg width={`16`} height={`16`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
      <path
        d={`M8 12.6V3.6M4.2 7.2 8 3.4l3.8 3.8`}
        {...m_component_S1IOPgGb}
        strokeWidth={1.6}
      />
    </svg>
  ),
  ComponentG: RecoveredValue = (): RecoveredValue => (
    <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
      <path d={`m2.8 6.2 2 2 4.4-4.6`} {...m_component_S1IOPgGb} strokeWidth={1.5} />
    </svg>
  ),
  Component_: RecoveredValue = (): RecoveredValue => (
    <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
      <path
        d={`M3 2.4v3.4c0 .9.7 1.6 1.6 1.6h4.6M7.6 5.6l1.8 1.8-1.8 1.8`}
        {...m_component_S1IOPgGb}
        strokeWidth={1.2}
      />
    </svg>
  );
function ComponentR({
  title,
  agent,
  steps,
  queue,
  status = `running`,
  startedAt,
  onQueue,
  onInterrupt,
  onRemove,
  draft,
  onDraftChange,
  onPause,
  onResume,
  placeholder = `Steer the agent…`,
  highlight,
  compose = !0,
  className,
}: RecoveredValue): RecoveredValue {
  let D: RecoveredValue = (0, n_component_S1IOPgGb.useId)(),
    O: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(null),
    ue: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(null),
    k: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(null),
    [A, j]: RecoveredValue = (0, n_component_S1IOPgGb.useState)(``),
    M: RecoveredValue = draft ?? A,
    N: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (j(e), onDraftChange?.(e));
    },
    [P, F]: RecoveredValue = (0, n_component_S1IOPgGb.useState)(``),
    I: RecoveredValue = ee_component_S1IOPgGb() ? `⌘` : `Ctrl`,
    L: RecoveredValue = status === `running`,
    R: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(Date.now()),
    z: RecoveredValue =
      startedAt === void 0 ? R.current : i_component_S1IOPgGb(startedAt),
    B: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(new Map()),
    V: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      if (e.startedAt !== void 0) return i_component_S1IOPgGb(e.startedAt);
      let t: RecoveredValue = B.current.get(e.id);
      return (t === void 0 && B.current.set(e.id, (t = Date.now())), t);
    },
    H: RecoveredValue = steps.filter(
      (e?: RecoveredValue): RecoveredValue => e.status === `done`,
    ).length,
    U: RecoveredValue = status !== `done`,
    W: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(new Map()),
    G: RecoveredValue =
      (e?: RecoveredValue): RecoveredValue =>
      (t?: RecoveredValue): RecoveredValue => {
        t ? W.current.set(e, t) : W.current.delete(e);
      },
    K: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(new Map()),
    q: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(0),
    J: RecoveredValue = JSON.stringify([
      steps.map(
        (e?: RecoveredValue): RecoveredValue => [
          e.id,
          e.status,
          e.title,
          (e.notes ?? []).map((e?: RecoveredValue): RecoveredValue => e.id),
        ],
      ),
      queue.map((e?: RecoveredValue): RecoveredValue => e.id),
    ]),
    Y: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(J);
  (O.current &&
    J !== Y.current &&
    ((K.current = new Map(
      [...W.current].map(
        ([e, t]: RecoveredValue): RecoveredValue => [e, t.getBoundingClientRect()],
      ),
    )),
    (q.current = O.current?.offsetHeight ?? 0)),
    (0, n_component_S1IOPgGb.useLayoutEffect)((): RecoveredValue => {
      if (Y.current === J || ((Y.current = J), f_component_S1IOPgGb())) return;
      let e: RecoveredValue = O.current;
      e &&
        q.current &&
        Math.abs(e.offsetHeight - q.current) > 1 &&
        e.animate(
          [
            {
              height: `${q.current}px`,
            },
            {
              height: `${e.offsetHeight}px`,
            },
          ],
          {
            duration: 480,
            easing: p_component_S1IOPgGb,
          },
        );
      for (let [e, t] of W.current) {
        let n: RecoveredValue = e.slice(e.indexOf(`:`) + 1),
          r: RecoveredValue =
            K.current.get(e) ??
            (e.startsWith(`note:`) ? K.current.get(`queued:${n}`) : void 0),
          i: RecoveredValue = t.getBoundingClientRect();
        if (!r) {
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
              duration: 360,
              easing: p_component_S1IOPgGb,
            },
          );
          continue;
        }
        let a: RecoveredValue = r.left - i.left,
          o: RecoveredValue = r.top - i.top;
        if (Math.abs(a) < 1 && Math.abs(o) < 1) continue;
        let s: RecoveredValue = !K.current.has(e);
        (t.animate(
          [
            {
              transform: `translate(${a}px, ${o}px)`,
              zIndex: 2,
            },
            {
              transform: `none`,
              zIndex: 2,
            },
          ],
          {
            duration: s ? 620 : 480,
            easing: p_component_S1IOPgGb,
          },
        ),
          s && t.setAttribute(`data-landed`, ``));
      }
    }, [J]));
  let X: RecoveredValue = steps
      .flatMap(
        (e?: RecoveredValue): RecoveredValue =>
          (e.notes ?? [])
            .filter((e?: RecoveredValue): RecoveredValue => e.picked)
            .map((e?: RecoveredValue): RecoveredValue => e.id),
      )
      .join(`|`),
    Z: RecoveredValue = (0, n_component_S1IOPgGb.useRef)(
      new Set(X.split(`|`).filter(Boolean)),
    );
  (0, n_component_S1IOPgGb.useEffect)((): RecoveredValue => {
    for (let e of steps)
      for (let n of e.notes ?? [])
        n.picked &&
          !Z.current.has(n.id) &&
          (Z.current.add(n.id), F(`${agent ?? `The agent`} picked up: ${n.text}`));
  }, [X]);
  let Q: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      let t: RecoveredValue = M.trim();
      t &&
        U &&
        (e ? onInterrupt?.(t) : onQueue?.(t),
        F(e ? `Interrupting: ${t}` : `Queued for the next step: ${t}`),
        N(``));
    },
    de: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      e.key === `Enter` && !e.shiftKey && !e.nativeEvent.isComposing
        ? (e.preventDefault(), Q(e.metaKey || e.ctrlKey))
        : e.key === `Escape` && M && (e.stopPropagation(), N(``));
    };
  (0, n_component_S1IOPgGb.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = k.current;
    e &&
      ((e.style.height = `0px`), (e.style.height = `${Math.min(e.scrollHeight, 60)}px`));
  }, [M]);
  let $: RecoveredValue = <ComponentD from={z} live={L} format={o_component_S1IOPgGb} />,
    fe: RecoveredValue =
      status === `done` ? (
        <r_component_S1IOPgGb.Fragment>
          {`Done in `}
          {$}
        </r_component_S1IOPgGb.Fragment>
      ) : status === `paused` ? (
        `Paused`
      ) : (
        <r_component_S1IOPgGb.Fragment>
          {`Running · `}
          {$}
        </r_component_S1IOPgGb.Fragment>
      );
  return (
    <div
      ref={O as RecoveredValue}
      className={[`ui-st`, className].filter(Boolean).join(` `)}
      data-status={status}
    >
      <div ref={ue as RecoveredValue} className={`ui-st__card`}>
        <header className={`ui-st__head`}>
          <span className={`ui-st__spark`}>
            <ComponentTe />
          </span>
          <div className={`ui-st__heading`}>
            <span className={`ui-st__title`} dir={`auto`} title={title}>
              {title}
            </span>
            <span className={`ui-st__sub`}>
              {agent && (
                <r_component_S1IOPgGb.Fragment>
                  <span className={`ui-st__agent`} title={agent}>
                    {agent}
                  </span>
                  {steps.length > 0 && (
                    <span className={`ui-st__dot`} aria-hidden={`true`}>{`·`}</span>
                  )}
                </r_component_S1IOPgGb.Fragment>
              )}
              {steps.length > 0 && (
                <span className={`ui-st__count`}>
                  {status === `done`
                    ? `${c_component_S1IOPgGb.format(steps.length)} ${steps.length === 1 ? `step` : `steps`}`
                    : `Step ${c_component_S1IOPgGb.format(Math.min(H + 1, steps.length))} of ${c_component_S1IOPgGb.format(steps.length)}`}
                </span>
              )}
            </span>
          </div>
          <span className={`ui-st__state`} data-status={status}>
            <span className={`ui-st__pulse`} aria-hidden={`true`} />
            {fe}
          </span>
          {status === `running` && onPause && (
            <button
              type={`button`}
              className={`ui-st__icon-btn`}
              aria-label={`Pause the run`}
              title={`Pause`}
              onClick={onPause}
            >
              <ComponentRe />
            </button>
          )}
          {status === `paused` && onResume && (
            <button
              type={`button`}
              className={`ui-st__icon-btn`}
              aria-label={`Resume the run`}
              title={`Resume`}
              onClick={onResume}
            >
              <ComponentIe />
            </button>
          )}
        </header>
        {steps.length > 0 && (
          <ol className={`ui-st__plan`} aria-label={`Plan`}>
            {steps.map((e?: RecoveredValue): RecoveredValue => {
              let t: RecoveredValue = e.status ?? `pending`;
              return (
                <li
                  ref={G(`step:${e.id}`) as RecoveredValue}
                  className={`ui-st__step`}
                  data-status={t}
                  data-faded={highlight && !highlight.includes(e.id) ? `` : void 0}
                  aria-current={t === `active` ? `step` : void 0}
                  key={e.id}
                >
                  <div className={`ui-st__step-row`}>
                    <ComponentNe_component_S1IOPgGb status={t} />
                    <span className={`ui-st__step-title`} dir={`auto`} title={e.title}>
                      {e.title}
                    </span>
                    <span className={`ui-st__step-time`}>
                      {t === `done` && e.duration !== void 0 ? (
                        s_component_S1IOPgGb(e.duration)
                      ) : t === `active` && status === `running` ? (
                        <ComponentD from={V(e)} live={!0} format={s_component_S1IOPgGb} />
                      ) : (
                        ``
                      )}
                    </span>
                  </div>
                  {(e.notes ?? []).map(
                    (e?: RecoveredValue): RecoveredValue => (
                      <div
                        ref={G(`note:${e.id}`) as RecoveredValue}
                        className={`ui-st__note`}
                        data-picked={e.picked ?? void 0}
                        key={e.id}
                      >
                        <Component_ />
                        <span className={`ui-st__note-text`} dir={`auto`}>
                          {e.text}
                        </span>
                        {e.picked && (
                          <span className={`ui-st__note-tag`}>
                            <ComponentG />
                            {e.picked === `now` ? `Interrupted` : `Picked up`}
                          </span>
                        )}
                      </div>
                    ),
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
      {queue.length > 0 && (
        <div className={`ui-st__queue`} ref={G(`queue:box`) as RecoveredValue}>
          <div className={`ui-st__label`}>
            {`Queued for the next step `}
            <span>{c_component_S1IOPgGb.format(queue.length)}</span>
          </div>
          <ul className={`ui-st__queued`}>
            {queue.map(
              (e?: RecoveredValue): RecoveredValue => (
                <li
                  ref={G(`queued:${e.id}`) as RecoveredValue}
                  className={`ui-st__chip`}
                  key={e.id}
                >
                  <span className={`ui-st__chip-text`} dir={`auto`}>
                    {e.text}
                  </span>
                  {onInterrupt && U && (
                    <button
                      type={`button`}
                      className={`ui-st__chip-btn`}
                      title={`Apply now (${I}↵)`}
                      onClick={(): RecoveredValue => onInterrupt(e.text, e.id)}
                    >
                      <ComponentAe />
                      {`Now`}
                    </button>
                  )}
                  {onRemove && (
                    <button
                      type={`button`}
                      className={`ui-st__chip-x`}
                      aria-label={`Remove “${e.text}”`}
                      onClick={(): RecoveredValue => onRemove(e.id)}
                    >
                      <ComponentOe />
                    </button>
                  )}
                </li>
              ),
            )}
          </ul>
        </div>
      )}
      {compose && (
        <div
          className={`ui-st__compose`}
          ref={G(`compose:box`) as RecoveredValue}
          data-disabled={U ? void 0 : ``}
        >
          <div
            className={`ui-st__field`}
            onClick={(e?: RecoveredValue): RecoveredValue =>
              !e.target.closest(`button`) &&
              k.current?.focus({
                preventScroll: !0,
              })
            }
          >
            <textarea
              ref={k as RecoveredValue}
              id={`${D}-field`}
              rows={1}
              value={M}
              disabled={!U}
              placeholder={U ? placeholder : `The run has finished`}
              aria-label={`Steer the agent`}
              dir={`auto`}
              aria-describedby={`${D}-hint`}
              onChange={(e?: RecoveredValue): RecoveredValue => N(e.target.value)}
              onKeyDown={de}
            />
            <button
              type={`button`}
              className={`ui-st__send`}
              aria-label={`Queue for the next step`}
              disabled={!M.trim() || !U}
              onClick={(): RecoveredValue => Q(!1)}
            >
              <ComponentH />
            </button>
          </div>
          <div className={`ui-st__hint`} id={`${D}-hint`}>
            {U ? (
              <r_component_S1IOPgGb.Fragment>
                <span>
                  <kbd>{`↵`}</kbd>
                  {` next step`}
                </span>
                {onInterrupt && (
                  <span>
                    <kbd>{I}</kbd>
                    <kbd>{`↵`}</kbd>
                    {` interrupt now`}
                  </span>
                )}
              </r_component_S1IOPgGb.Fragment>
            ) : (
              <span>{`Notes still in the queue were not used`}</span>
            )}
          </div>
        </div>
      )}
      <span className={`ui-st__sr`} aria-live={`polite`}>
        {P}
      </span>
    </div>
  );
}
var n_component_Bl_0n7rb: RecoveredValue = t_react_BkAXpnfr(),
  r_component_Bl_0n7rb: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_component_Bl_0n7rb: RecoveredValue = [
    `var(--ui-cw-c1)`,
    `var(--ui-cw-c2)`,
    `var(--ui-cw-c3)`,
    `var(--ui-cw-c4)`,
    `var(--ui-cw-c5)`,
    `var(--ui-cw-c6)`,
  ],
  a_component_Bl_0n7rb: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    typeof e == `number` && Number.isFinite(e) ? Math.max(0, e) : 0,
  o_component_Bl_0n7rb: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    let t: RecoveredValue = a_component_Bl_0n7rb(e);
    return t >= 99995e4
      ? `${(t / 1e9).toFixed(1)}B`
      : t >= 999950
        ? `${(t / 1e6).toFixed(1)}M`
        : t >= 1e3
          ? `${(t / 1e3).toFixed(1)}K`
          : `${Math.round(t)}`;
  },
  s_component_Bl_0n7rb: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    o_component_Bl_0n7rb(e).replace(/\.0(?=[KMB]$)/, ``),
  c_component_Bl_0n7rb: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    Math.round(a_component_Bl_0n7rb(e)).toLocaleString(`en-US`),
  l_component_Bl_0n7rb: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    1 - (1 - e) ** 4,
  u_component_Bl_0n7rb: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  d_component_Bl_0n7rb: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    new Promise((t?: RecoveredValue): RecoveredValue => window.setTimeout(t, e));
function f_component_Bl_0n7rb(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
  let [r, i]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)(e),
    a: RecoveredValue = (0, n_component_Bl_0n7rb.useRef)(e),
    o: RecoveredValue = JSON.stringify(e);
  return (
    (0, n_component_Bl_0n7rb.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = JSON.parse(o),
        n: RecoveredValue = {
          ...a.current,
        };
      if (
        u_component_Bl_0n7rb() ||
        Object.keys(e).every((t?: RecoveredValue): RecoveredValue => n[t] === e[t])
      ) {
        ((a.current = e), i(e));
        return;
      }
      let r: RecoveredValue = performance.now(),
        s: RecoveredValue = 0,
        c: RecoveredValue = (o?: RecoveredValue): RecoveredValue => {
          let u: RecoveredValue = Math.min(1, (o - r) / t),
            d: RecoveredValue = l_component_Bl_0n7rb(u),
            f: RecoveredValue = {};
          for (let t in e) f[t] = (n[t] ?? e[t]) + (e[t] - (n[t] ?? e[t])) * d;
          ((a.current = f), i(f), u < 1 && (s = requestAnimationFrame(c)));
        };
      return (
        (s = requestAnimationFrame(c)),
        (): RecoveredValue => cancelAnimationFrame(s)
      );
    }, [o, t]),
    r
  );
}
function ComponentP({ id, tone, children }: RecoveredValue): RecoveredValue {
  let a: RecoveredValue = (0, n_component_Bl_0n7rb.useRef)({
      id: id,
      tone: tone,
      node: children,
    }),
    [o, s]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)(id),
    [c, l]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)(null);
  return (
    o !== id && (s(id), l(a.current)),
    (a.current = {
      id: id,
      tone: tone,
      node: children,
    }),
    (0, n_component_Bl_0n7rb.useEffect)((): RecoveredValue => {
      if (!c) return;
      let e: RecoveredValue = window.setTimeout((): RecoveredValue => l(null), 260);
      return (): RecoveredValue => window.clearTimeout(e);
    }, [c]),
    (
      <span className={`ui-cw__swap`}>
        {c && (
          <span
            className={`ui-cw__swap-item`}
            data-out={``}
            data-tone={c.tone}
            aria-hidden={`true`}
            children={c.node}
            key={`out-${c.id}`}
          />
        )}
        <span
          className={`ui-cw__swap-item`}
          data-tone={tone}
          children={children}
          key={id}
        />
      </span>
    )
  );
}
var m_component_Bl_0n7rb: RecoveredValue = {
    stroke: `currentColor`,
    strokeWidth: 1.4,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  ComponentEe: RecoveredValue = (): RecoveredValue => (
    <svg
      className={`ui-cw__chevron`}
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path d={`m3 4.5 3 3 3-3`} {...m_component_Bl_0n7rb} />
    </svg>
  ),
  ComponentH_component_Bl_0n7rb: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`10`}
      height={`10`}
      viewBox={`0 0 10 10`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path d={`m2.5 2.5 5 5m0-5-5 5`} {...m_component_Bl_0n7rb} />
    </svg>
  ),
  ComponentTe_component_Bl_0n7rb: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path d={`m2.6 6.3 2.2 2.2 4.6-5`} {...m_component_Bl_0n7rb} strokeWidth={1.6} />
    </svg>
  ),
  ComponentNe_component_Bl_0n7rb: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M6 1.5v3m0 0L4.6 3.1M6 4.5l1.4-1.4M6 10.5v-3m0 0L4.6 8.9M6 7.5l1.4 1.4M2 6h8`}
        {...m_component_Bl_0n7rb}
      />
    </svg>
  ),
  ComponentRe_component_Bl_0n7rb: RecoveredValue = (): RecoveredValue => (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 12 12`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path d={`M2.5 6h7M6.5 3l3 3-3 3`} {...m_component_Bl_0n7rb} />
    </svg>
  ),
  ComponentIe_component_Bl_0n7rb: RecoveredValue = (0, n_component_Bl_0n7rb.memo)(
    function ({ partId, items, leaving, onRemove }: RecoveredValue): RecoveredValue {
      return (
        <ul className={`ui-cw__items`}>
          {items.length === 0 && <li className={`ui-cw__empty`}>{`Nothing attached`}</li>}
          {items.map(
            (t?: RecoveredValue): RecoveredValue => (
              <li
                className={`ui-cw__fold ui-cw__fold--item`}
                data-open={leaving[`${partId}/${t.id}`] ? void 0 : ``}
                children={
                  <div className={`ui-cw__clip`}>
                    <div className={`ui-cw__item`}>
                      <span className={`ui-cw__item-label`} title={t.label} dir={`auto`}>
                        {t.label}
                      </span>
                      <span
                        className={`ui-cw__item-value`}
                        title={`${c_component_Bl_0n7rb(t.tokens)} tokens`}
                      >
                        {o_component_Bl_0n7rb(t.tokens)}
                      </span>
                      <button
                        type={`button`}
                        className={`ui-cw__remove`}
                        aria-label={`Remove ${t.label}`}
                        onClick={(): RecoveredValue => onRemove(partId, t.id)}
                      >
                        <ComponentH_component_Bl_0n7rb />
                      </button>
                    </div>
                  </div>
                }
                key={t.id}
              />
            ),
          )}
        </ul>
      );
    },
  );
function ComponentI_component_Bl_0n7rb({
  parts,
  limit,
  title = `Context window`,
  model,
  modelIcon,
  onRemoveItem,
  onCompact,
  action,
  warnAt = 0.8,
  cells = 216,
  columns = 36,
  className,
}: RecoveredValue): RecoveredValue {
  let x: RecoveredValue = (0, n_component_Bl_0n7rb.useId)(),
    [S, ce]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)({}),
    [C, le]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)({}),
    [ue, w]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)({}),
    [T, E]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)(null),
    [de, fe]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)(null),
    [D, O]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)(null),
    [k, A]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)(null),
    j: RecoveredValue = (0, n_component_Bl_0n7rb.useRef)(!0);
  (0, n_component_Bl_0n7rb.useEffect)(
    (): RecoveredValue => (
      (j.current = !0),
      (): RecoveredValue => {
        j.current = !1;
      }
    ),
    [],
  );
  let pe: RecoveredValue = (0, n_component_Bl_0n7rb.useMemo)(
      (): RecoveredValue =>
        Object.fromEntries(
          parts.map(
            (e?: RecoveredValue): RecoveredValue => [
              e.id,
              e.items?.filter(
                (t?: RecoveredValue): RecoveredValue =>
                  onRemoveItem || !S[`${e.id}/${t.id}`],
              ),
            ],
          ),
        ),
      [parts, S, onRemoveItem],
    ),
    M: RecoveredValue = parts.map(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = pe[e.id],
          r: RecoveredValue = n
            ? n.reduce(
                (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
                  e + a_component_Bl_0n7rb(t.tokens),
                0,
              )
            : a_component_Bl_0n7rb(e.tokens);
        return {
          ...e,
          items: n,
          tokens: C[e.id] !== void 0 && !onCompact ? Math.min(r, C[e.id]) : r,
          color: e.color ?? i_component_Bl_0n7rb[t % i_component_Bl_0n7rb.length],
        };
      },
    ),
    N: RecoveredValue = M.reduce(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => e + t.tokens,
      0,
    ),
    P: RecoveredValue = a_component_Bl_0n7rb(limit),
    F: RecoveredValue = P > 0 ? N / P : 0,
    I: RecoveredValue = F >= 0.95 ? `full` : F >= warnAt ? `warn` : `ok`,
    L: RecoveredValue =
      M.find((e?: RecoveredValue): RecoveredValue => e.id === D) ?? null,
    me: RecoveredValue = {
      "#used": N,
      "#figure": L ? L.tokens : N,
    };
  for (let e of M) me[e.id] = e.tokens;
  let R: RecoveredValue = f_component_Bl_0n7rb(me, 640),
    he: RecoveredValue = P / cells,
    z: RecoveredValue = Array(cells).fill(null),
    B: RecoveredValue = 0,
    V: RecoveredValue = 0;
  P > 0 &&
    M.forEach((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
      B += e.tokens;
      let n: RecoveredValue = Math.min(
        cells,
        Math.max(e.tokens > 0 ? V + 1 : V, Math.round(B / he)),
      );
      for (let e: RecoveredValue = V; e < n; e++) z[e] = t;
      V = n;
    });
  let H: RecoveredValue = async (
      e?: RecoveredValue,
      t?: RecoveredValue,
    ): Promise<RecoveredValue> => {
      let n: RecoveredValue = `${e}/${t}`;
      (w(
        (e?: RecoveredValue): RecoveredValue => ({
          ...e,
          [n]: !0,
        }),
      ),
        u_component_Bl_0n7rb() || (await d_component_Bl_0n7rb(240)),
        j.current &&
          (w(({ [n]: e, ...t }: RecoveredValue): RecoveredValue => t),
          onRemoveItem
            ? onRemoveItem(e, t)
            : ce(
                (e?: RecoveredValue): RecoveredValue => ({
                  ...e,
                  [n]: !0,
                }),
              )));
    },
    U: RecoveredValue = (0, n_component_Bl_0n7rb.useRef)(H);
  U.current = H;
  let ge: RecoveredValue = (0, n_component_Bl_0n7rb.useCallback)(
      (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => U.current(e, t),
      [],
    ),
    _e: RecoveredValue = async (e?: RecoveredValue): Promise<RecoveredValue> => {
      if (T) return;
      E(e.id);
      let t: RecoveredValue = e.tokens;
      if (
        (await Promise.all([
          Promise.resolve(onCompact?.(e.id)).catch((): RecoveredValue => {}),
          d_component_Bl_0n7rb(u_component_Bl_0n7rb() ? 0 : 1300),
        ]),
        j.current)
      ) {
        if (
          (E(null),
          X(
            (n?: RecoveredValue): RecoveredValue => ({
              ...n,
              [e.id]: t,
            }),
          ),
          $({
            id: e.id,
            leaving: !1,
          }),
          onCompact)
        )
          W.current = {
            id: e.id,
            before: t,
          };
        else {
          let n: RecoveredValue = typeof e.compact == `number` ? e.compact : 0.3,
            r: RecoveredValue = Math.round(t * n);
          (le(
            (t?: RecoveredValue): RecoveredValue => ({
              ...t,
              [e.id]: r,
            }),
          ),
            X(
              (t?: RecoveredValue): RecoveredValue => ({
                ...t,
                [e.id]: r,
              }),
            ),
            A({
              id: Date.now(),
              amount: t - r,
            }));
        }
      }
    },
    W: RecoveredValue = (0, n_component_Bl_0n7rb.useRef)(null),
    G: RecoveredValue = W.current
      ? (M.find((e?: RecoveredValue): RecoveredValue => e.id === W.current?.id)?.tokens ??
        0)
      : 0;
  ((0, n_component_Bl_0n7rb.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = W.current;
    !e ||
      G >= e.before ||
      ((W.current = null),
      X(
        (t?: RecoveredValue): RecoveredValue => ({
          ...t,
          [e.id]: G,
        }),
      ),
      A({
        id: Date.now(),
        amount: e.before - G,
      }));
  }, [G]),
    (0, n_component_Bl_0n7rb.useEffect)((): RecoveredValue => {
      if (!k) return;
      let e: RecoveredValue = window.setTimeout((): RecoveredValue => A(null), 3200);
      return (): RecoveredValue => window.clearTimeout(e);
    }, [k]));
  let K: RecoveredValue = Math.max(0, P - N),
    q: RecoveredValue = (
      <r_component_Bl_0n7rb.Fragment>
        {s_component_Bl_0n7rb(K)}
        {` free`}
      </r_component_Bl_0n7rb.Fragment>
    ),
    J: RecoveredValue = `rest`,
    Y: RecoveredValue;
  T
    ? ((q = `Compacting…`), (J = `busy`))
    : L
      ? ((q = (
          <span className={`ui-cw__hot`}>
            <b dir={`auto`}>{L.label}</b>
            <span>
              {` `}
              {`·`}
              {` `}
              {P > 0 ? ((L.tokens / P) * 100).toFixed(+(L.tokens / P < 0.1)) : 0}
              {`% of the window`}
            </span>
          </span>
        )),
        (J = `hot-${L.id}`))
      : k
        ? ((q = (
            <r_component_Bl_0n7rb.Fragment>
              {`Saved `}
              <b>{s_component_Bl_0n7rb(k.amount)}</b>
              {` tokens`}
            </r_component_Bl_0n7rb.Fragment>
          )),
          (J = `saved-${k.id}`),
          (Y = `ok`))
        : I !== `ok` &&
          ((q =
            I === `full`
              ? N > P
                ? `${s_component_Bl_0n7rb(N - P)} over the limit`
                : `Window is full`
              : `${s_component_Bl_0n7rb(K)} left`),
          (J = I));
  let [ve, X]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)({}),
    Z: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      ve[e.id] !== void 0 && e.tokens <= ve[e.id],
    [Q, $]: RecoveredValue = (0, n_component_Bl_0n7rb.useState)(null);
  (0, n_component_Bl_0n7rb.useEffect)((): RecoveredValue => {
    if (!Q) return;
    let e: RecoveredValue = window.setTimeout(
      (): RecoveredValue =>
        $(
          Q.leaving
            ? null
            : {
                ...Q,
                leaving: !0,
              },
        ),
      Q.leaving ? 420 : 1500,
    );
    return (): RecoveredValue => window.clearTimeout(e);
  }, [Q]);
  let ye: RecoveredValue = (e?: RecoveredValue): RecoveredValue => (
    <button
      type={`button`}
      className={`ui-cw__compact`}
      aria-label={Z(e) ? `${e.label} is compacted` : `Compact ${e.label}`}
      disabled={!!T || e.tokens === 0 || Z(e)}
      data-busy={T === e.id ? `` : void 0}
      data-done={Z(e) ? `` : void 0}
      data-leaving={Q?.id === e.id && Q.leaving ? `` : void 0}
      onClick={(): RecoveredValue => _e(e)}
      onFocus={(): RecoveredValue => O(e.id)}
      onBlur={(): RecoveredValue => O(null)}
    >
      <span
        className={`ui-cw__compact-icon`}
        children={
          T === e.id ? (
            <span className={`ui-cw__spinner`} />
          ) : Z(e) ? (
            <ComponentTe_component_Bl_0n7rb />
          ) : (
            <ComponentNe_component_Bl_0n7rb />
          )
        }
        key={T === e.id ? `icon-busy` : Z(e) ? `icon-done` : `icon-idle`}
      />
      <span
        className={`ui-cw__compact-text`}
        children={Z(e) ? `Compacted` : `Compact`}
        key={Z(e) ? `text-done` : `text-idle`}
      />
    </button>
  );
  return (
    <div
      className={[`ui-cw`, className].filter(Boolean).join(` `)}
      role={`group`}
      aria-labelledby={`${x}-title`}
      data-level={I}
      onPointerLeave={(): RecoveredValue => O(null)}
    >
      <div className={`ui-cw__card`}>
        <div className={`ui-cw__head`}>
          <span id={`${x}-title`} className={`ui-cw__title`} title={title} dir={`auto`}>
            {title}
          </span>
          {model && (
            <span className={`ui-cw__model`} title={model}>
              {modelIcon && <span className={`ui-cw__model-icon`}>{modelIcon}</span>}
              <span>{model}</span>
            </span>
          )}
        </div>
        <div className={`ui-cw__figure`}>
          <span className={`ui-cw__big`} aria-hidden={`true`}>
            {o_component_Bl_0n7rb(R[`#figure`] ?? N)}
          </span>
          <span className={`ui-cw__of`} aria-hidden={`true`}>
            <ComponentP id={L ? L.id : `total`}>
              {L ? L.label : `of ${s_component_Bl_0n7rb(P)} tokens`}
            </ComponentP>
          </span>
          <span className={`ui-cw__pill`} aria-hidden={`true`}>
            {P > 0 ? Math.round(((R[`#used`] ?? N) / P) * 100) : 0}
            {`%`}
          </span>
          <span className={`ui-cw__sr`}>
            {s_component_Bl_0n7rb(N)}
            {` of `}
            {s_component_Bl_0n7rb(P)}
            {` tokens used,`}
            {` `}
            {Math.round(F * 100)}
            {` percent`}
          </span>
        </div>
        <div
          className={`ui-cw__field`}
          aria-hidden={`true`}
          data-hot={L ? `` : void 0}
          style={
            {
              "--ui-cw-cols": columns,
              "--ui-cw-cols-narrow": Math.max(8, Math.round((columns * 2) / 3)),
            } as RecoveredValue
          }
        >
          {z.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
            let n: RecoveredValue = e === null ? null : M[e];
            return (
              <span
                className={`ui-cw__cell`}
                data-on={n && D === n.id ? `` : void 0}
                data-busy={n && T === n.id ? `` : void 0}
                data-free={n ? void 0 : ``}
                style={
                  {
                    "--i": t,
                    ...(n
                      ? {
                          "--ui-cw-color": n.color,
                        }
                      : {}),
                  } as RecoveredValue
                }
                onPointerEnter={(e?: RecoveredValue): RecoveredValue =>
                  e.pointerType === `mouse` && O(n ? n.id : null)
                }
                key={t}
              />
            );
          })}
        </div>
        <ul className={`ui-cw__parts`}>
          {M.map((e?: RecoveredValue): RecoveredValue => {
            let t: RecoveredValue = !!e.items,
              n: RecoveredValue = de === e.id,
              i: RecoveredValue = (
                <r_component_Bl_0n7rb.Fragment>
                  <span
                    className={`ui-cw__swatch`}
                    style={
                      {
                        background: e.color,
                      } as RecoveredValue
                    }
                  />
                  <span className={`ui-cw__label`} title={e.label}>
                    <span className={`ui-cw__label-text`} dir={`auto`}>
                      {e.label}
                    </span>
                    {t && (
                      <span className={`ui-cw__open`} data-open={n ? `` : void 0}>
                        <ComponentEe />
                      </span>
                    )}
                  </span>
                  {e.compact && !e.locked && (!Z(e) || Q?.id === e.id) && ye(e)}
                  <span
                    className={`ui-cw__value`}
                    title={`${c_component_Bl_0n7rb(e.tokens)} tokens`}
                  >
                    {o_component_Bl_0n7rb(R[e.id] ?? e.tokens)}
                  </span>
                </r_component_Bl_0n7rb.Fragment>
              );
            return (
              <li
                className={`ui-cw__part`}
                data-hot={D === e.id ? `` : void 0}
                data-dim={D && D !== e.id ? `` : void 0}
                onPointerEnter={(t?: RecoveredValue): RecoveredValue =>
                  t.pointerType === `mouse` && O(e.id)
                }
                key={e.id}
              >
                <div className={`ui-cw__row`}>
                  {t ? (
                    <button
                      type={`button`}
                      className={`ui-cw__main`}
                      aria-expanded={n}
                      aria-controls={`${x}-${e.id}`}
                      onClick={(): RecoveredValue => fe(n ? null : e.id)}
                      onFocus={(): RecoveredValue => O(e.id)}
                      onBlur={(): RecoveredValue => O(null)}
                    >
                      {i}
                    </button>
                  ) : (
                    <div className={`ui-cw__main`}>{i}</div>
                  )}
                </div>
                {e.items && (
                  <div
                    id={`${x}-${e.id}`}
                    className={`ui-cw__fold`}
                    data-open={n ? `` : void 0}
                    inert={!n}
                  >
                    <div className={`ui-cw__clip`}>
                      <ComponentIe_component_Bl_0n7rb
                        partId={e.id}
                        items={e.items}
                        leaving={ue}
                        onRemove={ge}
                      />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`ui-cw__foot`}>
        <span className={`ui-cw__caption`} aria-live={`polite`}>
          <ComponentP id={J} tone={Y}>
            {q}
          </ComponentP>
        </span>
        {action && (
          <button
            type={`button`}
            className={`ui-cw__action`}
            onClick={action.onClick}
            title={action.label}
          >
            <span className={`ui-cw__action-label`}>{action.label}</span>
            <ComponentRe_component_Bl_0n7rb />
          </button>
        )}
      </div>
    </div>
  );
}
var a_demo_BTIK37Rc: RecoveredValue = t_react_BkAXpnfr(),
  o_demo_BTIK37Rc: RecoveredValue = t_jsx_runtime_CTsRTJUX();
function ComponentS({
  agents,
  messages,
  task,
  steps,
  status = `running`,
  startedAt,
  context,
  live,
  logos,
  focusAgent,
  onFocusAgentChange,
  onSend,
  onPause,
  onResume,
  maxHeight = 560,
  className,
}: RecoveredValue): RecoveredValue {
  let [S, C]: RecoveredValue = (0, a_demo_BTIK37Rc.useState)(null),
    w: RecoveredValue = focusAgent === void 0 ? S : focusAgent,
    T: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      (C(e), onFocusAgentChange?.(e));
    },
    E: RecoveredValue = w
      ? steps
          .filter((e?: RecoveredValue): RecoveredValue => e.agent === w)
          .map((e?: RecoveredValue): RecoveredValue => e.id)
      : null,
    D: RecoveredValue = new Set(
      steps
        .filter((e?: RecoveredValue): RecoveredValue => e.agent && e.agent !== `you`)
        .map((e?: RecoveredValue): RecoveredValue => e.agent),
    ).size;
  return (
    <section
      className={[`ui-lss`, className].filter(Boolean).join(` `)}
      aria-label={task}
      style={
        {
          "--ui-lss-stream-h": `${maxHeight}px`,
        } as RecoveredValue
      }
    >
      <div className={`ui-lss__grid`}>
        <div className={`ui-lss__main`}>
          <ComponentN_component_CJmfeIbq
            agents={agents}
            messages={messages}
            task={task}
            live={live}
            focusAgent={w}
            onFocusAgentChange={T}
            maxHeight={maxHeight}
            logos={logos}
            onSend={onSend}
          />
        </div>
        <aside className={`ui-lss__side`}>
          <ComponentR
            title={`Team plan`}
            agent={D === 1 ? `1 agent` : `${D} agents`}
            steps={steps}
            queue={[]}
            compose={!1}
            status={status}
            startedAt={startedAt}
            highlight={E && E.length ? E : w ? [] : null}
            onPause={onPause}
            onResume={onResume}
          />
          {context && (
            <ComponentI_component_Bl_0n7rb
              parts={context.parts}
              limit={context.limit}
              model={context.model}
              modelIcon={context.modelIcon}
              title={`Shared context`}
              cells={120}
              columns={30}
            />
          )}
        </aside>
      </div>
    </section>
  );
}
var ComponentL: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 24 24`}
      fill={`currentColor`}
      aria-hidden={`true`}
      style={
        {
          color: `var(--ui-crsc-ink, var(--ui-crs-ink, #000))`,
        } as RecoveredValue
      }
    >
      <path
        d={`M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z`}
      />
    </svg>
  ),
  ComponentU: RecoveredValue = (): RecoveredValue => (
    <svg
      viewBox={`0 0 24 24`}
      fill={`currentColor`}
      aria-hidden={`true`}
      style={
        {
          color: `var(--ui-crsc-ink, var(--ui-crs-ink, #181717))`,
        } as RecoveredValue
      }
    >
      <path
        d={`M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12`}
      />
    </svg>
  ),
  ComponentD_demo_BTIK37Rc: RecoveredValue = (): RecoveredValue => (
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
  ComponentF: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} fill={`#FF7A59`} aria-hidden={`true`}>
      <path
        d={`M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`}
      />
    </svg>
  ),
  ComponentP_demo_BTIK37Rc: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
      <rect width={`24`} height={`24`} rx={`6`} fill={`#635BFF`} />
      <path
        fill={`#fff`}
        transform={`translate(5 5) scale(0.5833)`}
        d={`M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z`}
      />
    </svg>
  ),
  ComponentM: RecoveredValue = (): RecoveredValue => (
    <svg viewBox={`0 0 1200 1200`} aria-hidden={`true`}>
      <path
        fill={`#D97757`}
        d={`M 233.959793 800.214905 L 468.644287 668.536987 L 472.590637 657.100647 L 468.644287 650.738403 L 457.208069 650.738403 L 417.986633 648.322144 L 283.892639 644.69812 L 167.597321 639.865845 L 54.926208 633.825623 L 26.577238 627.785339 L 3.3e-05 592.751709 L 2.73832 575.27533 L 26.577238 559.248352 L 60.724873 562.228149 L 136.187973 567.382629 L 249.422867 575.194763 L 331.570496 580.026978 L 453.261841 592.671082 L 472.590637 592.671082 L 475.328857 584.859009 L 468.724915 580.026978 L 463.570557 575.194763 L 346.389313 495.785217 L 219.543671 411.865906 L 153.100723 363.543762 L 117.181267 339.060425 L 99.060455 316.107361 L 91.248367 266.01355 L 123.865784 230.093994 L 167.677887 233.073853 L 178.872513 236.053772 L 223.248367 270.201477 L 318.040283 343.570496 L 441.825592 434.738342 L 459.946411 449.798706 L 467.194672 444.64447 L 468.080597 441.020203 L 459.946411 427.409485 L 392.617493 305.718323 L 320.778564 181.932983 L 288.80542 130.630859 L 280.348999 99.865845 C 277.369171 87.221436 275.194641 76.590698 275.194641 63.624268 L 312.322174 13.20813 L 332.8591 6.604126 L 382.389313 13.20813 L 403.248352 31.328979 L 434.013519 101.71814 L 483.865753 212.537048 L 561.181274 363.221497 L 583.812134 407.919434 L 595.892639 449.315491 L 600.40271 461.959839 L 608.214783 461.959839 L 608.214783 454.711609 L 614.577271 369.825623 L 626.335632 265.61084 L 637.771851 131.516846 L 641.718201 93.745117 L 660.402832 48.483276 L 697.530334 24.000122 L 726.52356 37.852417 L 750.362549 72 L 747.060486 94.067139 L 732.886047 186.201416 L 705.100708 330.52356 L 686.979919 427.167847 L 697.530334 427.167847 L 709.61084 415.087341 L 758.496704 350.174561 L 840.644348 247.490051 L 876.885925 206.738342 L 919.167847 161.71814 L 946.308838 140.29541 L 997.61084 140.29541 L 1035.38269 196.429626 L 1018.469849 254.416199 L 965.637634 321.422852 L 921.825562 378.201538 L 859.006714 462.765259 L 819.785278 530.41626 L 823.409424 535.812073 L 832.75177 534.92627 L 974.657776 504.724915 L 1051.328979 490.872559 L 1142.818848 475.167786 L 1184.214844 494.496582 L 1188.724854 514.147644 L 1172.456421 554.335693 L 1074.604126 578.496765 L 959.838989 601.449829 L 788.939636 641.879272 L 786.845764 643.409485 L 789.261841 646.389343 L 866.255127 653.637634 L 899.194702 655.409424 L 979.812134 655.409424 L 1129.932861 666.604187 L 1169.154419 692.537109 L 1192.671265 724.268677 L 1188.724854 748.429688 L 1128.322144 779.194641 L 1046.818848 759.865845 L 856.590759 714.604126 L 791.355774 698.335754 L 782.335693 698.335754 L 782.335693 703.731567 L 836.69812 756.885986 L 936.322205 846.845581 L 1061.073975 962.81897 L 1067.436279 991.490112 L 1051.409424 1014.120911 L 1034.496704 1011.704712 L 924.885986 929.234924 L 882.604126 892.107544 L 786.845764 811.48999 L 780.483276 811.48999 L 780.483276 819.946289 L 802.550415 852.241699 L 919.087341 1027.409424 L 925.127625 1081.127686 L 916.671204 1098.604126 L 886.469849 1109.154419 L 853.288696 1103.114136 L 785.073914 1007.355835 L 714.684631 899.516785 L 657.906067 802.872498 L 650.979858 806.81897 L 617.476624 1167.704834 L 601.771851 1186.147705 L 565.530212 1200 L 535.328857 1177.046997 L 519.302124 1139.919556 L 535.328857 1066.550537 L 554.657776 970.792053 L 570.362488 894.68457 L 584.536926 800.134277 L 592.993347 768.724976 L 592.429626 766.630859 L 585.503479 767.516968 L 514.22821 865.369263 L 405.825531 1011.865906 L 320.053711 1103.677979 L 299.516815 1111.812256 L 263.919525 1093.369263 L 267.221497 1060.429688 L 287.114136 1031.114136 L 405.825531 880.107361 L 477.422913 786.52356 L 523.651062 732.483276 L 523.328918 724.671265 L 520.590698 724.671265 L 205.288605 929.395935 L 149.154434 936.644409 L 124.993355 914.01355 L 127.973183 876.885986 L 139.409409 864.80542 L 234.201385 799.570435 L 233.879227 799.8927 Z`}
      />
    </svg>
  ),
  ComponentH_demo_BTIK37Rc: RecoveredValue = (): RecoveredValue => (
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
  ComponentG_demo_BTIK37Rc: RecoveredValue = (): RecoveredValue => (
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
  _: RecoveredValue = [
    {
      id: `orch`,
      name: `Orchestrator`,
      model: `Gemini 3.8`,
    },
    {
      id: `research`,
      name: `Researcher`,
      model: `Gemini 3.8 Flash`,
    },
    {
      id: `writer`,
      name: `Writer`,
      model: `Sonnet 5.5`,
    },
    {
      id: `coder`,
      name: `Coder`,
      model: `Opus 5.5`,
    },
  ],
  v: RecoveredValue = {
    Notion: <ComponentL />,
    Figma: <ComponentD_demo_BTIK37Rc />,
    Stripe: <ComponentP_demo_BTIK37Rc />,
    HubSpot: <ComponentF />,
    GitHub: <ComponentU />,
  },
  y_demo_BTIK37Rc: RecoveredValue = {
    label: `pricing-table.csv`,
    meta: `4 rows`,
    preview: `Product,Free tier,Per seat,Annual
Linear,250 issues,$10,$8
Notion,10 guests,$12,$10
Figma,3 files,$15,$12
Ours,No seat limit,$12,$10`,
  },
  b_demo_BTIK37Rc: RecoveredValue = {
    label: `plans-copy.md`,
    meta: `1 KB`,
    preview: `# Plans

Free – Everything you need to start. No seat limit.
Pro – For people who ship every day. $12 per seat.
Team – Everything, together – for teams of 3 and more.

Footnote: prices per seat and month, billed yearly.`,
  },
  x_demo_BTIK37Rc: RecoveredValue = [
    {
      id: `m1`,
      from: `you`,
      to: `orch`,
      kind: `ask`,
      text: `Launch the new pricing page by Friday – per-seat plans, keep a free tier.`,
      at: `14:02`,
    },
    {
      id: `m2`,
      from: `orch`,
      to: `research`,
      kind: `spawn`,
      text: `Find out what Linear, Notion and Figma charge per seat, and what their free tiers allow.`,
      at: `14:02`,
      replyTo: `m1`,
    },
    {
      id: `m3`,
      from: `orch`,
      to: `writer`,
      kind: `spawn`,
      text: `Draft the copy for Free, Pro and Team – short, one line per plan.`,
      at: `14:02`,
      replyTo: `m1`,
    },
    {
      id: `m4`,
      from: `research`,
      to: `orch`,
      kind: `share`,
      text: `Linear $10, Notion $12, Figma $15 per seat. All three keep a free tier.`,
      at: `14:04`,
      replyTo: `m2`,
      attachments: [
        {
          label: `web_search ×6`,
          kind: `tool`,
          meta: `6 calls`,
          preview: `"linear pricing per seat 2026"
"notion plus plan price per member"
"figma professional seat price"
"linear free plan limits"
"notion free plan guest limit"
"figma starter plan files limit"`,
        },
        y_demo_BTIK37Rc,
      ],
      details: {
        facts: [
          {
            label: `Model`,
            value: `Gemini 3.8 Flash`,
          },
          {
            label: `Tokens`,
            value: `41.2k`,
          },
          {
            label: `Cost`,
            value: `$0.02`,
          },
          {
            label: `Took`,
            value: `1m 48s`,
          },
        ],
        items: [
          {
            label: `web_search`,
            detail: `6 searches – per-seat pricing 2026`,
            icon: <ComponentH_demo_BTIK37Rc />,
          },
          {
            label: `notion.com/pricing`,
            detail: `Plus $12 · Business $18 per seat`,
            icon: <ComponentL />,
          },
          {
            label: `figma.com/pricing`,
            detail: `Professional $15 per editor`,
            icon: <ComponentD_demo_BTIK37Rc />,
          },
          {
            label: `linear.app/pricing`,
            detail: `Basic $10 per user`,
            icon: <ComponentG_demo_BTIK37Rc />,
          },
        ],
      },
    },
    {
      id: `m5`,
      from: `writer`,
      to: `research`,
      kind: `ask`,
      text: `Do any of them cap seats on the free tier? I'd like to say ours doesn't.`,
      at: `14:04`,
      replyTo: `m3`,
    },
    {
      id: `m6`,
      from: `research`,
      to: `writer`,
      kind: `reply`,
      text: `None cap seats – Notion limits guests to 10, Linear caps issues at 250.`,
      at: `14:05`,
      replyTo: `m5`,
    },
    {
      id: `m7`,
      from: `writer`,
      to: `orch`,
      kind: `share`,
      text: `Copy for the three plans is ready in Notion – Free says “no seat limit”.`,
      at: `14:06`,
      replyTo: `m3`,
      attachments: [b_demo_BTIK37Rc],
    },
    {
      id: `m8`,
      from: `orch`,
      to: `coder`,
      kind: `spawn`,
      text: `Build /pricing from the copy and the competitor table.`,
      at: `14:06`,
      replyTo: `m1`,
    },
    {
      id: `m9`,
      from: `orch`,
      to: `coder`,
      kind: `handoff`,
      text: `Here's everything you need – copy, prices and the Figma frames.`,
      at: `14:06`,
      replyTo: `m8`,
      attachments: [
        {
          label: `src/billing/`,
          meta: `6 items`,
          preview: `plans/
checkout/
prices.ts
seats.ts
stripe.ts
README.md`,
        },
        b_demo_BTIK37Rc,
        y_demo_BTIK37Rc,
        {
          label: `Pricing / Desktop`,
          kind: `link`,
          meta: `Figma`,
          preview: `Pricing / Desktop – 1440 × 2200
Three plan cards, the comparison table and the FAQ.
Last edited by Writer at 14:05.`,
        },
      ],
      details: {
        facts: [
          {
            label: `From`,
            value: `Orchestrator`,
          },
          {
            label: `To`,
            value: `Coder`,
          },
          {
            label: `Context`,
            value: `18.4k tokens`,
          },
        ],
        items: [
          {
            label: `Pricing / Desktop`,
            detail: `Figma – 3 frames`,
            icon: <ComponentD_demo_BTIK37Rc />,
          },
          {
            label: `plans-copy.md`,
            detail: `Notion – Launch / Pricing copy`,
            icon: <ComponentL />,
          },
          {
            label: `feat/pricing-page`,
            detail: `GitHub – branch to build on`,
            icon: <ComponentU />,
          },
        ],
      },
    },
    {
      id: `m10`,
      from: `coder`,
      to: `writer`,
      kind: `ask`,
      text: `The Team line is two lines too long for its card – can you cut it?`,
      at: `14:09`,
      replyTo: `m9`,
    },
    {
      id: `m11`,
      from: `writer`,
      to: `coder`,
      kind: `reply`,
      text: `“Everything, together – for teams of 3 and more.”`,
      at: `14:09`,
      replyTo: `m10`,
    },
    {
      id: `m12`,
      from: `coder`,
      to: `you`,
      kind: `question`,
      text: `The brief says Team is $12, the table suggests $15. Which one do I ship? Both prices are ready in Stripe.`,
      at: `14:11`,
      replyTo: `m1`,
      details: {
        facts: [
          {
            label: `Model`,
            value: `Opus 5.5`,
          },
          {
            label: `Waiting`,
            value: `2m`,
          },
          {
            label: `Holds`,
            value: `Deploy`,
          },
        ],
        items: [
          {
            label: `price_team_12`,
            detail: `Stripe – $12 per seat, test mode`,
            icon: <ComponentP_demo_BTIK37Rc />,
          },
          {
            label: `price_team_15`,
            detail: `Stripe – $15 per seat, test mode`,
            icon: <ComponentP_demo_BTIK37Rc />,
          },
        ],
      },
    },
    {
      id: `m13`,
      from: `orch`,
      to: `all`,
      kind: `share`,
      text: `The pricing page is up for review on the preview deploy.`,
      at: `14:12`,
      attachments: [
        {
          label: `PR #482`,
          kind: `link`,
          meta: `+214 −38`,
          preview: `Pricing page with per-seat plans

– Plans, prices and copy from plans-copy.md
– Seat picker in checkout, priced through Stripe
– Free tier without a seat limit
Preview deploy ready for review.`,
        },
      ],
    },
  ],
  S_demo_BTIK37Rc: RecoveredValue = {
    orch: `Got it – I'll pass that on and keep everyone on it.`,
    research: `On it – I'll check that against the competitor pages.`,
    writer: `Sure – I'll rework the copy and send it to Coder.`,
    coder: `Done – switching it over and rebuilding the preview.`,
  },
  C_demo_BTIK37Rc: RecoveredValue = [
    {
      id: `prices`,
      title: `Compare per-seat prices`,
      agent: `research`,
      from: 1,
      to: 3,
    },
    {
      id: `copy`,
      title: `Draft the copy for the three plans`,
      agent: `writer`,
      from: 2,
      to: 6,
    },
    {
      id: `build`,
      title: `Build /pricing with the seat picker`,
      agent: `coder`,
      from: 7,
      to: 12,
    },
    {
      id: `price`,
      title: `Pick the Team price`,
      agent: `you`,
      from: 11,
      to: 12,
    },
    {
      id: `review`,
      title: `Review the preview deploy`,
      agent: `orch`,
      from: 12,
      to: 99,
    },
  ],
  w_demo_BTIK37Rc: RecoveredValue = 4,
  T_demo_BTIK37Rc: RecoveredValue = 1.5,
  E_demo_BTIK37Rc: RecoveredValue = 0.7,
  D_demo_BTIK37Rc: RecoveredValue =
    (x_demo_BTIK37Rc.length - w_demo_BTIK37Rc) * T_demo_BTIK37Rc + 4.5,
  O_demo_BTIK37Rc: RecoveredValue = 6e4,
  k_demo_BTIK37Rc: RecoveredValue = 1016,
  A_demo_BTIK37Rc: RecoveredValue = 640;
function Runtime(): RecoveredValue {
  let [e, t]: RecoveredValue = (0, a_demo_BTIK37Rc.useState)(0),
    [n, r]: RecoveredValue = (0, a_demo_BTIK37Rc.useState)(0),
    i: RecoveredValue = (0, a_demo_BTIK37Rc.useId)(),
    [c]: RecoveredValue = (0, a_demo_BTIK37Rc.useState)(
      (): RecoveredValue => Date.now() - 9 * O_demo_BTIK37Rc,
    ),
    [l, u]: RecoveredValue = (0, a_demo_BTIK37Rc.useState)([]),
    d: RecoveredValue = (0, a_demo_BTIK37Rc.useRef)(0),
    [f, p]: RecoveredValue = (0, a_demo_BTIK37Rc.useState)(!1),
    h: RecoveredValue = l.length > 0 || f;
  (0, a_demo_BTIK37Rc.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = performance.now();
    if (h) return;
    let n: RecoveredValue = window.setInterval((): RecoveredValue => {
      let n: RecoveredValue = (performance.now() - e) / 1e3;
      (n >= D_demo_BTIK37Rc &&
        ((e = performance.now()),
        (n = 0),
        r((e?: RecoveredValue): RecoveredValue => e + 1)),
        t(n));
    }, 100);
    return (): RecoveredValue => window.clearInterval(n);
  }, [h]);
  let g: RecoveredValue = w_demo_BTIK37Rc + Math.floor(e / T_demo_BTIK37Rc),
    y: RecoveredValue = x_demo_BTIK37Rc.slice(0, g + 1),
    b: RecoveredValue = [
      ...y.map(
        (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
          !h && n === g && n >= w_demo_BTIK37Rc && e % T_demo_BTIK37Rc < E_demo_BTIK37Rc
            ? {
                ...t,
                typing: !0,
              }
            : t,
      ),
      ...l,
    ],
    j: RecoveredValue = Math.min(g, x_demo_BTIK37Rc.length - 1),
    M: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      c + e * 0.7 * O_demo_BTIK37Rc,
    N: RecoveredValue = C_demo_BTIK37Rc.map(
      (e?: RecoveredValue): RecoveredValue => ({
        id: e.id,
        title: e.title,
        agent: e.agent,
        status: j >= e.to ? `done` : j >= e.from ? `active` : `pending`,
        startedAt: M(e.from),
        duration: j >= e.to ? (e.to - e.from) * 0.7 * O_demo_BTIK37Rc : void 0,
      }),
    ),
    P: RecoveredValue = y.flatMap(
      (e?: RecoveredValue): RecoveredValue => e.attachments ?? [],
    ).length,
    F: RecoveredValue = {
      limit: 2e5,
      model: `Opus 5.5`,
      modelIcon: <ComponentM />,
      parts: [
        {
          id: `system`,
          label: `System prompt`,
          tokens: 4200,
          locked: !0,
        },
        {
          id: `tools`,
          label: `Tools`,
          tokens: 12800,
        },
        {
          id: `files`,
          label: `Files`,
          tokens: 6400 * P,
        },
        {
          id: `talk`,
          label: `Conversation`,
          tokens: 3600 * b.length,
        },
        {
          id: `memory`,
          label: `Memory`,
          tokens: 3900,
          color: `var(--ls-demo-memory)`,
        },
      ],
    },
    I: RecoveredValue = ({ text, to, replyTo }: RecoveredValue): RecoveredValue => {
      let r: RecoveredValue = ++d.current,
        i: RecoveredValue = new Date().toTimeString().slice(0, 5),
        a: RecoveredValue = {
          id: `you-${r}`,
          from: `you`,
          to: to.length === 1 ? to[0] : to,
          kind: `reply`,
          text: text,
          at: i,
          replyTo: replyTo,
        },
        o: RecoveredValue = to[0] === `all` ? `orch` : to[0],
        s: RecoveredValue = {
          id: `re-${r}`,
          from: o,
          to: `you`,
          kind: `reply`,
          text: S_demo_BTIK37Rc[o] ?? `On it.`,
          at: i,
          replyTo: `you-${r}`,
        };
      (u(
        (e?: RecoveredValue): RecoveredValue => [
          ...e,
          a,
          {
            ...s,
            typing: !0,
          },
        ],
      ),
        window.setTimeout(
          (): RecoveredValue =>
            u(
              (e?: RecoveredValue): RecoveredValue =>
                e.map((e?: RecoveredValue): RecoveredValue => (e.id === s.id ? s : e)),
            ),
          1400,
        ));
    },
    L: RecoveredValue = (0, a_demo_BTIK37Rc.useRef)(null),
    R: RecoveredValue = (0, a_demo_BTIK37Rc.useRef)(null),
    [z, B]: RecoveredValue = (0, a_demo_BTIK37Rc.useState)({
      scale: 0,
      h: 0,
      w: 0,
    });
  (0, a_demo_BTIK37Rc.useLayoutEffect)((): RecoveredValue => {
    let e: RecoveredValue = L.current,
      t: RecoveredValue = R.current;
    if (!e || !t) return;
    let n: RecoveredValue = !!e.closest(`.card__preview`),
      r: RecoveredValue = (): RecoveredValue => {
        let r: RecoveredValue = n
          ? Math.max(e.clientWidth, A_demo_BTIK37Rc)
          : e.clientWidth;
        B({
          scale:
            r < A_demo_BTIK37Rc ? 1 : Math.min(1.25, e.clientWidth / k_demo_BTIK37Rc),
          h: t.offsetHeight,
          w: r,
        });
      };
    r();
    let i: RecoveredValue = new ResizeObserver(r);
    return (i.observe(e), i.observe(t), (): RecoveredValue => i.disconnect());
  }, []);
  let V: RecoveredValue = z.w > 0 && z.w < A_demo_BTIK37Rc;
  return (
    <div
      className={`ls-demo`}
      onFocus={(e?: RecoveredValue): RecoveredValue =>
        e.target instanceof HTMLTextAreaElement && p(!0)
      }
      onBlur={(e?: RecoveredValue): RecoveredValue =>
        e.target instanceof HTMLTextAreaElement && !e.target.value && p(!1)
      }
    >
      <div
        ref={L as RecoveredValue}
        className={`ls-demo__frame`}
        style={
          {
            height: z.h * z.scale || void 0,
          } as RecoveredValue
        }
      >
        <div
          ref={R as RecoveredValue}
          className={`ls-demo__canvas`}
          style={
            {
              width: V ? z.w : k_demo_BTIK37Rc,
              transform: `scale(${z.scale || 1})`,
              visibility: z.scale ? void 0 : `hidden`,
            } as RecoveredValue
          }
        >
          <ComponentS
            agents={_}
            messages={b}
            task={`Launch the new pricing page`}
            steps={N}
            startedAt={c}
            context={F}
            live={l.length > 0 || g < x_demo_BTIK37Rc.length}
            logos={v}
            onSend={I}
            key={`${i}-${n}`}
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
