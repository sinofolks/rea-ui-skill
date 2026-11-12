"use client";

import "./ReactionBar.css";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
/*
 * Reaction Bar – like, comment, repost and share in one pill, in component logic and public types.
 * Tapping an action colors its icon with a small pop, and its count rolls in digit by digit while the pill
 * glides to its new width. Styles are provided by the sibling CSS import.
 */
export type ReactionKey = "like" | "comment" | "repost" | "share";
export type ReactionState = {
  count: number;
  active?: boolean;
};
export type ReactionBarProps = {
  /** Starting counts and whether each action is already taken */
  reactions?: Partial<Record<ReactionKey, ReactionState>>;
  /** Called after an action was toggled, with its new state */
  onReact?: (key: ReactionKey, state: Required<ReactionState>) => void;
  /** Hide actions you don't need */
  actions?: ReactionKey[];
  className?: string;
};
const labels: Record<ReactionKey, [string, string]> = {
  like: ["Like", "likes"],
  comment: ["Comment", "comments"],
  repost: ["Repost", "reposts"],
  share: ["Share", "shares"],
};
/** 1234 → "1.2K", like social apps – rounded so 999,950 reads "1M", not "1000K" */
const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const exact = new Intl.NumberFormat("en");
const short = (n: number) =>
  n >= 10000 && n < 1000000
    ? compact.format(Math.round(n / 1000) * 1000)
    : compact.format(n);
/** Counts are whole, never negative – NaN, Infinity and the like count as 0 */
const clean = (n: unknown) =>
  typeof n === "number" && Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
export function ReactionBar({
  reactions = {},
  onReact,
  actions: actionsProp = ["like", "comment", "repost", "share"],
  className,
}: ReactionBarProps) {
  // Only known actions, each once
  const actions = (Array.isArray(actionsProp) ? actionsProp : []).filter(
    (k, i, all) => k in labels && all.indexOf(k) === i,
  );
  const [state, setState] = useState(
    () =>
      Object.fromEntries(
        (Object.keys(labels) as ReactionKey[]).map((k) => [
          k,
          {
            count: clean(reactions?.[k]?.count),
            active: reactions?.[k]?.active === true,
          },
        ]),
      ) as Record<ReactionKey, Required<ReactionState>>,
  );
  const [popped, setPopped] = useState<Record<string, number>>({});
  const toggle = (key: ReactionKey) => {
    const cur = state[key];
    const next = {
      active: !cur.active,
      count: Math.max(0, cur.count + (cur.active ? -1 : 1)),
    };
    setState((s) => ({ ...s, [key]: next }));
    // A new key restarts the pop animation on every tap
    setPopped((p) => ({ ...p, [key]: (p[key] ?? 0) + 1 }));
    onReact?.(key, next);
  };
  if (!actions.length) return null;
  return (
    <>
      <div
        className={["ui-rb", className].filter(Boolean).join(" ")}
        role="group"
        aria-label="Reactions"
      >
        {actions.map((key) => {
          const { count, active } = state[key];
          const [verb, noun] = labels[key];
          return (
            <button
              key={key}
              type="button"
              className="ui-rb__btn"
              data-kind={key}
              aria-pressed={active}
              aria-label={`${verb}${count ? `, ${exact.format(count)} ${count === 1 ? noun.slice(0, -1) : noun}` : ""}`}
              title={count >= 1000 ? `${exact.format(count)} ${noun}` : undefined}
              onClick={() => toggle(key)}
            >
              <span
                className="ui-rb__icon"
                key={popped[key] ?? 0}
                data-pop={popped[key] ? true : undefined}
              >
                {icons[key]}
              </span>
              <Count value={count} />
            </button>
          );
        })}
      </div>
    </>
  );
}
/** The count glides to its new width; each changed digit rolls in from below */
function Count({ value }: { value: number }) {
  const text = value > 0 ? short(value) : "";
  const outer = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    o.style.width = `${i.offsetWidth}px`;
    if (first.current) {
      first.current = false;
      requestAnimationFrame(() => o.setAttribute("data-smooth", ""));
    }
  }, [text]);
  return (
    <span className="ui-rb__count" ref={outer} aria-hidden="true">
      <span className="ui-rb__digits" ref={inner}>
        {text.split("").map((d, i) => (
          <span key={`${text.length - i}-${d}`} className="ui-rb__digit">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}
/* ---------- Icons (stroke, rounded) ---------- */
const Svg = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const icons: Record<ReactionKey, ReactNode> = {
  like: (
    <Svg>
      <path
        className="ui-rb__fill"
        d="M19.46 4c-2.68-1.65-5.02-.99-6.43.07-.57.43-.86.65-1.03.65s-.46-.22-1.03-.65C9.56 3.01 7.22 2.35 4.54 4 1.02 6.15.22 13.27 8.34 19.28 9.89 20.43 10.66 21 12 21s2.11-.57 3.66-1.72C23.78 13.27 22.98 6.15 19.46 4Z"
      />
    </Svg>
  ),
  comment: (
    <Svg>
      <path
        className="ui-rb__fill"
        d="M12 21.5c5.52 0 10-4.25 10-9.5S17.52 2.5 12 2.5 2 6.75 2 12c0 1.36.3 2.65.84 3.82.15.31.2.66.1 1l-.6 2.23a1.08 1.08 0 0 0 1.6 1.59l2.22-.6c.34-.09.69-.04 1 .1 1.17.55 2.46.86 4.84.86Z"
      />
    </Svg>
  ),
  repost: (
    <Svg>
      <path d="M16.5 3.5 19 6l-2.5 2.5" />
      <path d="M19 6H8a4 4 0 0 0-4 4v1" />
      <path d="M7.5 20.5 5 18l2.5-2.5" />
      <path d="M5 18h11a4 4 0 0 0 4-4v-1" />
    </Svg>
  ),
  share: (
    <Svg>
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3 14.6 20.6a.5.5 0 0 1-.93.05L10.5 13.5 3.35 10.33a.5.5 0 0 1 .05-.93Z" />
    </Svg>
  ),
};
