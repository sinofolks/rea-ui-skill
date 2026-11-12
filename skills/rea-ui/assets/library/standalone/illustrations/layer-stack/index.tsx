"use client";

import "./LayerStack.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import {
  type ReactElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Layer Stack – an interactive card illustration, in component logic and public types.
 * An isometric stack of five layers next to a list of five entries. The chosen entry lifts its layer
 * out of the stack in blue, with a soft glow underneath; the others settle back to glassy gray.
 * It steps through the entries on its own and pauses while you hover; click or focus an entry to pick it.
 * The artwork is laid out on a 600 × 400 grid inside a 3 : 2 frame and scales with its container.
 */
type LayerStackItem = {
  /** Main line of the entry */
  title: string;
  /** Short muted hint on the right */
  hint?: string;
  /** Icon drawn onto the layer: one of the built-in names */
  icon?: LayerIcon;
};
type LayerIcon = "bolt" | "database" | "plug" | "spark" | "pulse";
type LayerStackProps = {
  /** Up to five entries, top layer first */
  items?: LayerStackItem[];
  /** Entry to start on */
  defaultIndex?: number;
  /** Time per entry while it plays on its own, in ms */
  interval?: number;
  /** Called when an entry is picked by the user */
  onChange?: (index: number) => void;
  className?: string;
};
const defaultItems: LayerStackItem[] = [
  { title: "Triggered by events", hint: "Webhooks", icon: "bolt" },
  { title: "Grounded in your data", hint: "Context", icon: "database" },
  { title: "Connected to your apps", hint: "APIs", icon: "plug" },
  { title: "Works with any model", hint: "Routing", icon: "spark" },
  { title: "Traced at every step", hint: "Logs", icon: "pulse" },
];
/* Layer geometry on the 600 × 400 grid */
const SIZE = 104; // side of a layer before the isometric projection (rhombus 208 × 104)
const STEP = 26; // vertical distance between resting layers
const GAP = 34; // the chosen layer lifts off the ones below it
const ABOVE = 24; // and the layers above it lift a little further, so it shows
const THICK = 9; // layer thickness
const CX = 168; // stack centre
const TOP = 109; // y of the top layer's back corner when nothing is lifted
function LayerStack({
  items = defaultItems,
  defaultIndex = 0,
  interval = 2600,
  onChange,
  className,
}: LayerStackProps) {
  const id = "ui-lyr" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  // No items: the defaults rather than an empty highlighted row
  const list = (items.length ? items : defaultItems).slice(0, 5);
  const [active, setActive] = useState(Math.min(defaultIndex, list.length - 1));
  const [paused, setPaused] = useState(false);
  const touched = useRef(false);
  // Step through the entries on its own until someone interacts; never with reduced motion
  useEffect(() => {
    if (paused || touched.current || list.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % list.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [paused, interval, list.length]);
  const pick = (i: number) => {
    touched.current = true;
    setActive(i);
    onChange?.(i);
  };
  // Resting y of each layer: gaps open below and above the chosen one. The bottom layer has nothing
  // below it, so when it's chosen it stays put and only the layers above it rise
  const last = list.length - 1;
  const yOf = (i: number) =>
    TOP + i * STEP - (i < active ? GAP + ABOVE : i === active && active < last ? GAP : 0);
  return (
    <div
      className={["ui-lyr", className].filter(Boolean).join(" ")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* React 19 hoists this into <head> once, no matter how many instances render */}

      <svg className="ui-lyr-stack" viewBox="0 0 600 400" aria-hidden="true">
        <defs>
          <filter id={`${id}-glow`} x="-60%" y="-120%" width="220%" height="340%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* Bottom layer first, so the upper ones overlap it */}
        {list
          .map((item, i) => (
            <g
              key={i}
              className="ui-lyr-layer"
              data-active={i === active ? "" : undefined}
              data-above={i < active ? "" : undefined}
              style={{ transform: `translate(${CX}px, ${yOf(i)}px)` }}
            >
              {/* Glow just beneath this layer – fades in while it's the chosen one, same strength on every layer */}
              <ellipse
                className="ui-lyr-glow"
                cx={0}
                cy={SIZE / 2 + THICK + 18}
                rx={70}
                ry={24}
                filter={`url(#${id}-glow)`}
              />
              {/* Thickness: the same rhombus, shifted down, peeks out below the top face */}
              <g transform={`translate(0 ${THICK}) matrix(1 0.5 -1 0.5 0 0)`}>
                <rect className="ui-lyr-side" width={SIZE} height={SIZE} rx={9} />
                <rect className="ui-lyr-side-on" width={SIZE} height={SIZE} rx={9} />
              </g>
              <g transform="matrix(1 0.5 -1 0.5 0 0)">
                <rect className="ui-lyr-face" width={SIZE} height={SIZE} rx={9} />
                <rect className="ui-lyr-face-on" width={SIZE} height={SIZE} rx={9} />
                <g
                  className="ui-lyr-icon"
                  transform={`translate(${SIZE / 2 - 18} ${SIZE / 2 - 18}) scale(1.5)`}
                >
                  {icons[item.icon ?? "bolt"]}
                </g>
              </g>
            </g>
          ))
          .reverse()}
      </svg>

      <div
        className="ui-lyr-menu"
        role="tablist"
        aria-label="Layers"
        aria-orientation="vertical"
      >
        <span
          className="ui-lyr-pill"
          aria-hidden="true"
          style={{ transform: `translateY(calc(${active} * var(--ui-lyr-row)))` }}
        />
        {list.map((item, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className="ui-lyr-row"
            onClick={() => pick(i)}
            onKeyDown={(e) => {
              const next =
                e.key === "ArrowDown" ? i + 1 : e.key === "ArrowUp" ? i - 1 : null;
              if (next === null) return;
              e.preventDefault();
              const n = (next + list.length) % list.length;
              pick(n);
              (
                e.currentTarget.parentElement?.children[n + 1] as HTMLElement | undefined
              )?.focus();
            }}
          >
            <span className="ui-lyr-title">{item.title}</span>
            {item.hint && <span className="ui-lyr-hint">{item.hint}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
/* ---------- Icons, drawn on a 24 grid and laid onto the layer ---------- */
const icons: Record<LayerIcon, ReactNode> = {
  bolt: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  plug: <path d="M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 0 1-11 0V8ZM12 16.5V21" />,
  spark: (
    <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7ZM18.5 15.5c.2 1.5.8 2.1 2.3 2.3-1.5.2-2.1.8-2.3 2.3-.2-1.5-.8-2.1-2.3-2.3 1.5-.2 2.1-.8 2.3-2.3Z" />
  ),
  pulse: <path d="M3 12h4l2.5-6 5 12 2.5-6h4" />,
};
/** Explicit migration boundary for values whose original types were erased.
 * Keep this alias private. Replace usages with concrete types as internals are refactored.
 * Public component contracts never expose this type. See docs/type-migration.md.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecoveredValue = any;
const t_react_BkAXpnfr: RecoveredValue = (): RecoveredValue => React;
const t_jsx_runtime_CTsRTJUX: RecoveredValue = (): RecoveredValue =>
  React_jsx_runtime_CTsRTJUX;
var n_demo_fCatWsFs: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_fCatWsFs: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_fCatWsFs: RecoveredValue = [
    {
      title: `Triggered by events`,
      hint: `Webhooks`,
      icon: `bolt`,
    },
    {
      title: `Grounded in your data`,
      hint: `Context`,
      icon: `database`,
    },
    {
      title: `Connected to your apps`,
      hint: `APIs`,
      icon: `plug`,
    },
    {
      title: `Works with any model`,
      hint: `Routing`,
      icon: `spark`,
    },
    {
      title: `Traced at every step`,
      hint: `Logs`,
      icon: `pulse`,
    },
  ],
  a: RecoveredValue = 104,
  o: RecoveredValue = 26,
  s: RecoveredValue = 34,
  c: RecoveredValue = 9,
  l: RecoveredValue = 168,
  u: RecoveredValue = 109;
function ComponentD({
  items = i_demo_fCatWsFs,
  defaultIndex = 0,
  interval = 2600,
  onChange,
  className,
}: RecoveredValue): RecoveredValue {
  let g: RecoveredValue =
      `ui-lyr` + (0, n_demo_fCatWsFs.useId)().replace(/[^a-zA-Z0-9_-]/g, ``),
    _: RecoveredValue = (items.length ? items : i_demo_fCatWsFs).slice(0, 5),
    [v, y]: RecoveredValue = (0, n_demo_fCatWsFs.useState)(
      Math.min(defaultIndex, _.length - 1),
    ),
    [b, x]: RecoveredValue = (0, n_demo_fCatWsFs.useState)(!1),
    S: RecoveredValue = (0, n_demo_fCatWsFs.useRef)(!1);
  (0, n_demo_fCatWsFs.useEffect)((): RecoveredValue => {
    if (
      b ||
      S.current ||
      _.length < 2 ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
    )
      return;
    let e: RecoveredValue = window.setInterval(
      (): RecoveredValue => y((e?: RecoveredValue): RecoveredValue => (e + 1) % _.length),
      interval,
    );
    return (): RecoveredValue => window.clearInterval(e);
  }, [b, interval, _.length]);
  let C: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
      ((S.current = !0), y(e), onChange?.(e));
    },
    w: RecoveredValue = _.length - 1,
    T: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
      u + e * o - (e < v ? 58 : e === v && v < w ? s : 0);
  return (
    <div
      className={[`ui-lyr`, className].filter(Boolean).join(` `)}
      onMouseEnter={(): RecoveredValue => x(!0)}
      onMouseLeave={(): RecoveredValue => x(!1)}
      onFocus={(): RecoveredValue => x(!0)}
      onBlur={(): RecoveredValue => x(!1)}
    >
      <svg className={`ui-lyr-stack`} viewBox={`0 0 600 400`} aria-hidden={`true`}>
        <defs>
          <filter id={`${g}-glow`} x={`-60%`} y={`-120%`} width={`220%`} height={`340%`}>
            <feGaussianBlur stdDeviation={`14`} />
          </filter>
        </defs>
        {_.map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
            <g
              className={`ui-lyr-layer`}
              data-active={t === v ? `` : void 0}
              data-above={t < v ? `` : void 0}
              style={
                {
                  transform: `translate(${l}px, ${T(t)}px)`,
                } as RecoveredValue
              }
              key={t}
            >
              <ellipse
                className={`ui-lyr-glow`}
                cx={0}
                cy={79}
                rx={70}
                ry={24}
                filter={`url(#${g}-glow)`}
              />
              <g transform={`translate(0 ${c}) matrix(1 0.5 -1 0.5 0 0)`}>
                <rect className={`ui-lyr-side`} width={a} height={a} rx={9} />
                <rect className={`ui-lyr-side-on`} width={a} height={a} rx={9} />
              </g>
              <g transform={`matrix(1 0.5 -1 0.5 0 0)`}>
                <rect className={`ui-lyr-face`} width={a} height={a} rx={9} />
                <rect className={`ui-lyr-face-on`} width={a} height={a} rx={9} />
                <g
                  className={`ui-lyr-icon`}
                  transform={`translate(${a / 2 - 18} ${a / 2 - 18}) scale(1.5)`}
                >
                  {f[e.icon ?? `bolt`]}
                </g>
              </g>
            </g>
          ),
        ).reverse()}
      </svg>
      <div
        className={`ui-lyr-menu`}
        role={`tablist`}
        aria-label={`Layers`}
        aria-orientation={`vertical`}
      >
        <span
          className={`ui-lyr-pill`}
          aria-hidden={`true`}
          style={
            {
              transform: `translateY(calc(${v} * var(--ui-lyr-row)))`,
            } as RecoveredValue
          }
        />
        {_.map(
          (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
            <button
              type={`button`}
              role={`tab`}
              aria-selected={t === v}
              tabIndex={t === v ? 0 : -1}
              className={`ui-lyr-row`}
              onClick={(): RecoveredValue => C(t)}
              onKeyDown={(e?: RecoveredValue): RecoveredValue => {
                let n: RecoveredValue =
                  e.key === `ArrowDown` ? t + 1 : e.key === `ArrowUp` ? t - 1 : null;
                if (n === null) return;
                e.preventDefault();
                let r: RecoveredValue = (n + _.length) % _.length;
                (C(r), e.currentTarget.parentElement?.children[r + 1]?.focus());
              }}
              key={t}
            >
              <span className={`ui-lyr-title`}>{e.title}</span>
              {e.hint && <span className={`ui-lyr-hint`}>{e.hint}</span>}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
var f: RecoveredValue = {
  bolt: <path d={`M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z`} />,
  database: (
    <r_demo_fCatWsFs.Fragment>
      <ellipse cx={`12`} cy={`6`} rx={`7`} ry={`3`} />
      <path d={`M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3`} />
    </r_demo_fCatWsFs.Fragment>
  ),
  plug: <path d={`M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 0 1-11 0V8ZM12 16.5V21`} />,
  spark: (
    <path
      d={`M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7ZM18.5 15.5c.2 1.5.8 2.1 2.3 2.3-1.5.2-2.1.8-2.3 2.3-.2-1.5-.8-2.1-2.3-2.3 1.5-.2 2.1-.8 2.3-2.3Z`}
    />
  ),
  pulse: <path d={`M3 12h4l2.5-6 5 12 2.5-6h4`} />,
};
function Runtime(): RecoveredValue {
  return (
    <div className={`layer-stack-demo`}>
      <ComponentD />
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
export { LayerStack };
export type { LayerStackItem };
export type { LayerIcon };
export type { LayerStackProps };
