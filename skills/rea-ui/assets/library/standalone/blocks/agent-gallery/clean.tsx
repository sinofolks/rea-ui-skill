"use client";

import "./AgentGallery.clean.css";
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
var n_demo_clean_BWTbb_SH: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_clean_BWTbb_SH: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_clean_BWTbb_SH: RecoveredValue = [
    {
      id: `triage`,
      name: `Support triage`,
      description: `Sorts new tickets by urgency and routes them to the right team.`,
      colors: [`#a651f0`, `#e9dafa`],
      trigger: `Ticket created`,
      steps: [
        `Read the ticket and detect the product area.`,
        `Set priority from customer plan and sentiment.`,
        `Assign the team and post a summary in the thread.`,
      ],
      skills: [`Classify ticket`, `Summarize thread`],
      guardrail: `Cannot close tickets`,
    },
    {
      id: `enrich`,
      name: `Lead enrichment`,
      description: `Fills in company data for every new lead before sales picks it up.`,
      colors: [`#4fb0fe`, `#c7e6ff`],
      trigger: `Lead added`,
      steps: [
        `Look up the company by email domain.`,
        `Add size, industry and location to the record.`,
        `Score the lead and notify the owner above 80.`,
      ],
      skills: [`Find company`, `Score lead`],
      guardrail: `Cannot change lead owner`,
    },
    {
      id: `recap`,
      name: `Meeting recap`,
      description: `Turns call transcripts into notes, decisions and next steps.`,
      colors: [`#ee3e9e`, `#fad0e7`],
      trigger: `Call ended`,
      steps: [
        `Pull the transcript from the recording.`,
        `Write a short recap with decisions and owners.`,
        `Create follow-up tasks and share the notes.`,
      ],
      skills: [`Write recap`, `Create tasks`],
      guardrail: `Cannot email external guests`,
    },
    {
      id: `churn`,
      name: `Churn watch`,
      description: `Spots accounts that go quiet and suggests a save play.`,
      colors: [`#f28a2e`, `#fed7aa`],
      trigger: `Usage drops 30%`,
      steps: [
        `Compare weekly usage against the last quarter.`,
        `Check open tickets and recent NPS answers.`,
        `Draft a check-in for the account manager.`,
      ],
      skills: [`Read usage`, `Draft check-in`],
      guardrail: `Cannot offer discounts`,
    },
    {
      id: `onboard`,
      name: `Onboarding coach`,
      description: `Guides new customers through setup and nudges when they get stuck.`,
      colors: [`#13b3a0`, `#d6f1ee`],
      trigger: `Workspace created`,
      steps: [
        `Send a welcome note with the first three steps.`,
        `Watch for steps that stay open for two days.`,
        `Offer a short call when setup stalls.`,
      ],
      skills: [`Send nudge`, `Book call`],
      guardrail: `Cannot change billing`,
    },
    {
      id: `review`,
      name: `Content review`,
      description: `Checks drafts for tone, claims and brand terms before they ship.`,
      colors: [`#4fb0fe`, `#e0f1ff`],
      trigger: `Draft submitted`,
      steps: [
        `Check tone against the brand guide.`,
        `Flag claims that need a source.`,
        `Suggest fixes inline and tag the author.`,
      ],
      skills: [`Check tone`, `Flag claims`],
      guardrail: `Cannot publish`,
    },
    {
      id: `release`,
      name: `Release notes`,
      description: `Writes customer-facing notes from merged pull requests.`,
      colors: [`#a651f0`, `#e6d4fa`],
      trigger: `Release tagged`,
      steps: [
        `Collect merged pull requests since the last tag.`,
        `Group them into features, fixes and changes.`,
        `Draft notes in plain language for review.`,
      ],
      skills: [`Group changes`, `Write notes`],
      guardrail: `Cannot post without review`,
    },
  ];
function ComponentA({
  title = `Agents that run your playbook`,
  subtitle = `Give each agent its steps, tools and limits – then let it work inside the tools your team already uses.`,
  items = i_demo_clean_BWTbb_SH,
  defaultIndex,
  className,
}: RecoveredValue): RecoveredValue {
  let c: RecoveredValue = items.length,
    l: RecoveredValue = Math.floor(
      defaultIndex !== void 0 && defaultIndex >= 0 && defaultIndex < c
        ? defaultIndex
        : c / 2,
    ),
    [u, d]: RecoveredValue = (0, n_demo_clean_BWTbb_SH.useState)(c + l),
    [m, h]: RecoveredValue = (0, n_demo_clean_BWTbb_SH.useState)(!1),
    g: RecoveredValue = c ? ((u % c) + c) % c : 0,
    _: RecoveredValue = items[g],
    v: RecoveredValue = [...items, ...items, ...items];
  ((0, n_demo_clean_BWTbb_SH.useEffect)((): RecoveredValue => {
    if (!c || (u >= c && u < 2 * c)) return;
    let e: RecoveredValue = window.setTimeout((): RecoveredValue => {
      (h(!0), d((e?: RecoveredValue): RecoveredValue => (e < c ? e + c : e - c)));
    }, 660);
    return (): RecoveredValue => window.clearTimeout(e);
  }, [u, c]),
    (0, n_demo_clean_BWTbb_SH.useEffect)((): RecoveredValue => {
      if (!m) return;
      let e: RecoveredValue = requestAnimationFrame(
        (): RecoveredValue => (e = requestAnimationFrame((): RecoveredValue => h(!1))),
      );
      return (): RecoveredValue => cancelAnimationFrame(e);
    }, [m]));
  let y: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    d(Math.max(0, Math.min(3 * c - 1, e)));
  return _ ? (
    <section
      className={[`ui-agc`, className].filter(Boolean).join(` `)}
      aria-roledescription={`carousel`}
      aria-label={title}
    >
      <header className={`ui-agc__head`}>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </header>
      <div
        className={`ui-agc__viewport`}
        role={`group`}
        aria-label={`Agents, ${g + 1} of ${c} – use the arrow keys to switch`}
        tabIndex={c > 1 ? 0 : void 0}
        onKeyDown={
          c > 1
            ? (e?: RecoveredValue): RecoveredValue => {
                e.key === `ArrowRight`
                  ? (e.preventDefault(), y(u + 1))
                  : e.key === `ArrowLeft`
                    ? (e.preventDefault(), y(u - 1))
                    : e.key === `Home`
                      ? (e.preventDefault(), y(u - g))
                      : e.key === `End` && (e.preventDefault(), y(u - g + c - 1));
              }
            : void 0
        }
      >
        <div
          className={`ui-agc__track`}
          data-snap={m ? `` : void 0}
          style={
            {
              "--pos": u,
            } as RecoveredValue
          }
        >
          {v.map((e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => {
            let n: RecoveredValue = t === u,
              i: RecoveredValue = Math.abs(t - u);
            return (
              <div
                className={`ui-agc__panel`}
                data-open={n ? `` : void 0}
                data-far={i >= 2 ? `` : void 0}
                style={
                  {
                    "--a": e.colors[0],
                    "--b": e.colors[1],
                  } as RecoveredValue
                }
                aria-hidden={i > 3 || void 0}
                key={t}
              >
                <span className={`ui-agc__art`} aria-hidden={`true`} />
                {i <= 3 && <ComponentF item={e} hidden={!n} />}
                {!n && (
                  <button
                    type={`button`}
                    className={`ui-agc__pick`}
                    aria-label={`Show ${e.name}`}
                    title={e.name}
                    tabIndex={-1}
                    onClick={(): RecoveredValue => y(t)}
                  >
                    <span className={`ui-agc__label`}>{e.name}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={`ui-agc__foot`}>
        <p
          className={`ui-agc__caption`}
          aria-live={`polite`}
          title={`${_.name}. ${_.description}`}
          key={`${g}-${_.id}`}
        >
          <b>
            {_.name}
            {`.`}
          </b>
          {` `}
          {_.description}
        </p>
        <div className={`ui-agc__arrows`} hidden={c < 2}>
          <button
            type={`button`}
            aria-label={`Previous agent`}
            onClick={(): RecoveredValue => y(u - 1)}
          >
            <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
              <path d={`M15 6s-6 4.42-6 6 6 6 6 6`} />
            </svg>
          </button>
          <button
            type={`button`}
            aria-label={`Next agent`}
            onClick={(): RecoveredValue => y(u + 1)}
          >
            <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
              <path d={`M9 6s6 4.42 6 6-6 6-6 6`} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  ) : (
    <section
      className={[`ui-agc`, className].filter(Boolean).join(` `)}
      aria-label={title}
    >
      <header className={`ui-agc__head`}>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </header>
      <p className={`ui-agc__empty`}>{`No agents yet.`}</p>
    </section>
  );
}
var o_demo_clean_BWTbb_SH: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
  [...e].reduce(
    (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
      (e * 31 + t.charCodeAt(0)) % 997,
    7,
  );
function ComponentS({ n: e }: RecoveredValue): RecoveredValue {
  let t: RecoveredValue = Array.from(
      {
        length: 10,
      },
      (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => [
        n * 8,
        15 - ((e * (n + 5) * 7 + n * 3) % 13),
      ],
    ) as RecoveredValue[],
    n: RecoveredValue = t
      .map(
        ([e, t]: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
          `${n ? `L` : `M`}${e} ${t}`,
      )
      .join(` `),
    [i, a]: RecoveredValue = t[t.length - 1];
  return (
    <svg className={`ui-agc__spark`} viewBox={`-2 -2 78 20`} aria-hidden={`true`}>
      <path d={n} />
      <circle cx={i} cy={a} r={`2.2`} />
    </svg>
  );
}
var c_demo_clean_BWTbb_SH: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    e
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(
        (e?: RecoveredValue): RecoveredValue =>
          (Array.from(e) as RecoveredValue[])[0] ?? ``,
      )
      .join(``)
      .toUpperCase(),
  ComponentL: RecoveredValue = ({ name }: RecoveredValue): RecoveredValue => (
    <span className={`ui-agc__avatar`} aria-hidden={`true`}>
      {c_demo_clean_BWTbb_SH(name)}
    </span>
  ),
  ComponentU: RecoveredValue = ({ d: e }: RecoveredValue): RecoveredValue => (
    <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
      <path d={e} />
    </svg>
  ),
  d_demo_clean_BWTbb_SH: RecoveredValue = {
    note: `M5 6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4 3v-3h-.5A.5.5 0 0 1 5 15.5Z`,
    chart: `M6 18V11M10 18V7M14 18v-5M18 18V9`,
    file: `M8 3.5h6l4 4v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1ZM14 3.5v4h4`,
    plug: `M9 4v4M15 4v4M7 8h10v3a5 5 0 0 1-10 0V8ZM12 16v4`,
    search: `M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM20 20l-4.5-4.5`,
    clip: `m15.5 7.5-6.4 6.4a1.8 1.8 0 0 0 2.5 2.5l6.7-6.7a3.5 3.5 0 0 0-5-5l-6.9 6.9a5.2 5.2 0 0 0 7.4 7.4l6-6`,
    sync: `M19 12a7 7 0 0 1-12.3 4.6M5 12a7 7 0 0 1 12.3-4.6M17.5 4v3.5H14M6.5 20v-3.5H10`,
    filter: `M5 7h14M8 12h8M11 17h2`,
    plus: `M12 5v14M5 12h14`,
  };
function ComponentF({ item, hidden }: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = o_demo_clean_BWTbb_SH(item.id),
    i: RecoveredValue = (item.steps ?? []).filter(Boolean),
    a: RecoveredValue = [
      [`Runs`, `${40 + (n % 160)}`],
      [`Success`, `${94 + (n % 6)}%`],
      [`Time saved`, `${(2 + (n % 70) / 10).toFixed(1)}h`],
      [`Escalated`, `${1 + (n % 7)}`],
    ];
  return (
    <div
      className={`ui-agc__screen`}
      aria-label={`${item.name} workspace`}
      aria-hidden={hidden || void 0}
      inert={hidden || void 0}
    >
      <div className={`ui-agc__bar`}>
        <span className={`ui-agc__brand`} aria-hidden={`true`} />
        <span className={`ui-agc__switch`}>
          <span className={`ui-agc__mark`} aria-hidden={`true`} />
          <span className={`ui-agc__switch-name`} title={item.name}>
            {item.name}
          </span>
          <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
            <path d={`m8 10 4-4 4 4M8 14l4 4 4-4`} />
          </svg>
        </span>
        <span className={`ui-agc__new`}>
          <ComponentU d={d_demo_clean_BWTbb_SH.plus} />
          {`New agent`}
        </span>
        <ComponentL name={`Lena Hart`} />
      </div>
      <div className={`ui-agc__page`}>
        <div className={`ui-agc__hero`}>
          <span className={`ui-agc__logo`} aria-hidden={`true`} />
          <span className={`ui-agc__sync`}>
            {`3m ago`}
            <ComponentU d={d_demo_clean_BWTbb_SH.sync} />
          </span>
        </div>
        <h3>{item.name}</h3>
        <p
          className={`ui-agc__sub`}
          title={item.trigger ? `Triggered by “${item.trigger}”` : void 0}
        >
          {item.trigger ? (
            <r_demo_clean_BWTbb_SH.Fragment>
              {`Triggered by “`}
              {item.trigger}
              {`” · `}
            </r_demo_clean_BWTbb_SH.Fragment>
          ) : null}
          {`Owner Lena Hart`}
        </p>
        <div className={`ui-agc__kpis`}>
          {a.map(
            ([e, t]: RecoveredValue, i?: RecoveredValue): RecoveredValue => (
              <div key={e}>
                <span>{e}</span>
                <b>{t}</b>
                <ComponentS n={n + i * 13} />
              </div>
            ),
          )}
        </div>
        <div className={`ui-agc__tabs`}>
          <span>{`Runs`}</span>
          <span>{`Tools`}</span>
          <span data-active={``}>{`Context`}</span>
          <span>{`Settings`}</span>
        </div>
        <h4>{`Agent context`}</h4>
        <p
          className={`ui-agc__hint`}
        >{`Goals, files and rules the agent uses on every run.`}</p>
        <div className={`ui-agc__toolbar`}>
          <span className={`ui-agc__search`}>
            <ComponentU d={d_demo_clean_BWTbb_SH.search} />
            {`Search context…`}
          </span>
          <span className={`ui-agc__filter`}>
            <ComponentU d={d_demo_clean_BWTbb_SH.filter} />
            {`All`}
          </span>
        </div>
        <ol className={`ui-agc__feed`}>
          <li className={`ui-agc__compose`}>
            <ComponentL name={`Lena Hart`} />
            <div className={`ui-agc__box`}>
              <span
                title={item.guardrail ? `Add context, e.g. “${item.guardrail}”` : void 0}
              >
                {item.guardrail ? (
                  <r_demo_clean_BWTbb_SH.Fragment>
                    {`Add context, e.g. “`}
                    {item.guardrail}
                    {`”`}
                  </r_demo_clean_BWTbb_SH.Fragment>
                ) : (
                  `Add context…`
                )}
              </span>
              <span className={`ui-agc__box-foot`}>
                <ComponentU d={d_demo_clean_BWTbb_SH.clip} />
                <b>{`Add context`}</b>
              </span>
            </div>
          </li>
          {i[0] && (
            <li>
              <span className={`ui-agc__dot`}>
                <ComponentU d={d_demo_clean_BWTbb_SH.note} />
              </span>
              <div>
                <p className={`ui-agc__line`}>
                  <ComponentL name={`Jonas Weber`} />
                  <b>{`Jonas Weber`}</b>
                  {` added context · today`}
                </p>
                <p className={`ui-agc__card`}>{i[0]}</p>
              </div>
            </li>
          )}
          <li>
            <span className={`ui-agc__dot`}>
              <ComponentU d={d_demo_clean_BWTbb_SH.chart} />
            </span>
            <p className={`ui-agc__line`}>
              <ComponentL name={`Mara Lindqvist`} />
              <b>{`Mara Lindqvist`}</b>
              {` generated a `}
              <u>{`Weekly summary`}</u>
              {` · 1d ago`}
            </p>
          </li>
          <li>
            <span className={`ui-agc__dot`}>
              <ComponentU d={d_demo_clean_BWTbb_SH.file} />
            </span>
            <p className={`ui-agc__line`}>
              <ComponentL name={`Mara Lindqvist`} />
              <b>{`Mara Lindqvist`}</b>
              {` added `}
              <u>{`playbook.pdf`}</u>
              <i className={`ui-agc__ext`} data-kind={`pdf`}>{`PDF`}</i>
              {` and `}
              <u>{`accounts.csv`}</u>
              <i className={`ui-agc__ext`} data-kind={`csv`}>{`CSV`}</i>
              {` · 2d ago`}
            </p>
          </li>
          {i.length > 1 && (
            <li>
              <span className={`ui-agc__dot`}>
                <ComponentU d={d_demo_clean_BWTbb_SH.note} />
              </span>
              <div>
                <p className={`ui-agc__line`}>
                  <ComponentL name={`Jonas Weber`} />
                  <b>{`Jonas Weber`}</b>
                  {` added context · 2d ago`}
                </p>
                <p className={`ui-agc__card`}>{i.slice(1).join(` `)}</p>
              </div>
            </li>
          )}
          <li>
            <span className={`ui-agc__dot ui-agc__dot--app`}>
              <ComponentU d={d_demo_clean_BWTbb_SH.plug} />
            </span>
            <p className={`ui-agc__line`}>
              {`Connected `}
              <u>{`Slack`}</u>
              {` and `}
              <u>{`HubSpot`}</u>
              {` · 3d ago`}
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}
var m_demo_clean_BWTbb_SH: RecoveredValue = 1200;
function Runtime(): RecoveredValue {
  let e: RecoveredValue = (0, n_demo_clean_BWTbb_SH.useRef)(null),
    [t, i]: RecoveredValue = (0, n_demo_clean_BWTbb_SH.useState)(null);
  return (
    (0, n_demo_clean_BWTbb_SH.useLayoutEffect)((): RecoveredValue => {
      let t: RecoveredValue = e.current,
        n: RecoveredValue = t?.closest(`.card__preview`),
        r: RecoveredValue = n ?? t?.closest(`.stage`);
      if (!t || !r) return;
      let a: RecoveredValue = (): RecoveredValue => {
        let e: RecoveredValue = r.clientWidth;
        if (n)
          return i({
            scale: e / m_demo_clean_BWTbb_SH,
            card: !0,
          });
        if (e < 760) return i(null);
        i({
          scale: e / m_demo_clean_BWTbb_SH,
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
        className={`gallery-demo`}
        data-fit={t ? (t.card ? `card` : `stage`) : void 0}
      >
        <div
          className={`gallery-demo__frame`}
          style={
            (t
              ? t.card
                ? {
                    width: m_demo_clean_BWTbb_SH,
                    transform: `scale(${t.scale})`,
                  }
                : {
                    width: m_demo_clean_BWTbb_SH,
                    zoom: t.scale,
                  }
              : void 0) as RecoveredValue
          }
        >
          <ComponentA />
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
