"use client";

import "./FilterMenu.css";
import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
/*
 * Filter Menu – grouped filters with chips, in component logic and public types.
 * Active filters sit on top as removable chips; below, collapsible groups list their options as checkboxes
 * with a count of what's picked. Arrow keys move through groups and options, Enter or Space picks,
 * ← and → fold a group. Heights glide when groups open or chips come and go.
 * Styles are provided by the sibling CSS import.
 */
export type FilterOption = {
  id: string;
  label: string;
};
export type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
  /** Put in front of the option on its chip, e.g. "Score: " → "Score: 80–90" */
  chipPrefix?: string;
};
/** Picked option ids per group id */
export type FilterValue = Record<string, string[]>;
export type FilterMenuProps = {
  groups: FilterGroup[];
  /** Controlled value */
  value?: FilterValue;
  /** Starting value when uncontrolled */
  defaultValue?: FilterValue;
  onChange?: (value: FilterValue) => void;
  /** Groups that start open – by default the first one */
  defaultOpen?: string[];
  title?: string;
  /** Show the keyboard hints at the bottom */
  hints?: boolean;
  className?: string;
};
type Row =
  | {
      kind: "group";
      group: FilterGroup;
      gi: number;
    }
  | {
      kind: "option";
      group: FilterGroup;
      option: FilterOption;
      gi: number;
      oi: number;
    };
export function FilterMenu({
  groups: rawGroups,
  value,
  defaultValue = {},
  onChange,
  defaultOpen,
  title = "Filters",
  hints = true,
  className,
}: FilterMenuProps) {
  // Gaps, groups without an options list and options without a label are skipped; ids stay as given
  const groups = (Array.isArray(rawGroups) ? rawGroups : [])
    .filter((g): g is FilterGroup => !!g && typeof g === "object")
    .map((g) => ({
      ...g,
      label: String(g.label ?? ""),
      options: (Array.isArray(g.options) ? g.options : [])
        .filter((o): o is FilterOption => !!o && typeof o === "object")
        .map((o) => ({ ...o, label: String(o.label ?? "") })),
    }));
  const uid = useId();
  const [inner, setInner] = useState<FilterValue>(defaultValue);
  const picked = value ?? inner;
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(defaultOpen ?? groups.slice(0, 1).map((g) => g.id)),
  );
  const [focus, setFocus] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const chipsInner = useRef<HTMLDivElement>(null);
  const chipsOuter = useSmoothHeight(chipsInner);
  const commit = (next: FilterValue) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  // Only lists count – a string or a stray value in `value` picks nothing
  const pickedIn = (g: string) => (Array.isArray(picked[g]) ? picked[g] : []);
  const isOn = (g: string, o: string) => pickedIn(g).includes(o);
  const toggle = (g: string, o: string) => {
    const cur = pickedIn(g);
    commit({
      ...picked,
      [g]: cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o],
    });
  };
  const toggleGroup = (g: string) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  // Chips in the order of the groups and their options – one per picked id, even if an id repeats
  const seen = new Set<string>();
  const chips = groups.flatMap((g) =>
    g.options
      .filter(
        (o) =>
          isOn(g.id, o.id) &&
          !seen.has(`${g.id}\u0000${o.id}`) &&
          !!seen.add(`${g.id}\u0000${o.id}`),
      )
      .map((o) => ({ group: g, option: o, label: `${g.chipPrefix ?? ""}${o.label}` })),
  );
  // Everything the arrow keys can reach, top to bottom
  // Keys come from positions, so groups or options that share an id stay reachable
  const rows: Row[] = groups.flatMap((g, gi) => [
    { kind: "group", group: g, gi } as Row,
    ...(open.has(g.id)
      ? g.options.map((o, oi) => ({ kind: "option", group: g, option: o, gi, oi }) as Row)
      : []),
  ]);
  const keyOf = (r: Row) => (r.kind === "group" ? `g:${r.gi}` : `o:${r.gi}:${r.oi}`);
  const moveTo = (key: string) => {
    setFocus(key);
    listRef.current
      ?.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`)
      ?.focus();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = rows.findIndex((r) => keyOf(r) === focus);
    const row = rows[i];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next =
        rows[
          Math.max(0, Math.min(rows.length - 1, i + (e.key === "ArrowDown" ? 1 : -1)))
        ] ?? rows[0];
      moveTo(keyOf(next));
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      moveTo(keyOf(rows[e.key === "Home" ? 0 : rows.length - 1]));
    } else if (row && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      e.preventDefault();
      const g = row.group.id;
      if (e.key === "ArrowRight" && !open.has(g)) toggleGroup(g);
      if (e.key === "ArrowLeft") {
        if (open.has(g)) toggleGroup(g);
        moveTo(`g:${row.gi}`);
      }
    } else if (row && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      if (row.kind === "group") toggleGroup(row.group.id);
      else toggle(row.group.id, row.option.id);
    }
  };
  return (
    <div className={["ui-fm", className].filter(Boolean).join(" ")}>
      <div className="ui-fm__card">
        <div className="ui-fm__head">
          <span className="ui-fm__title" dir="auto" title={title}>
            {title}
          </span>
          <button
            type="button"
            className="ui-fm__clear"
            disabled={chips.length === 0}
            onClick={() => commit({})}
          >
            Clear all
          </button>
        </div>

        {/* Active filters – the box glides to its new height as chips come and go */}
        <div className="ui-fm__chips-outer" ref={chipsOuter}>
          <div className="ui-fm__chips" ref={chipsInner} aria-live="polite">
            {chips.map((c, i) => (
              <span key={i} className="ui-fm__chip">
                <span className="ui-fm__chip-label" dir="auto" title={c.label}>
                  {c.label}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${c.label}`}
                  onClick={() => toggle(c.group.id, c.option.id)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="ui-fm__groups" ref={listRef} onKeyDown={onKeyDown}>
          {groups.map((g, gi) => {
            const isOpen = open.has(g.id);
            const count = new Set(
              pickedIn(g.id).filter((id) => g.options.some((o) => o.id === id)),
            ).size;
            const gKey = `g:${gi}`;
            return (
              <section
                key={`${g.id}#${gi}`}
                className="ui-fm__group"
                data-open={isOpen ? "" : undefined}
              >
                <button
                  type="button"
                  className="ui-fm__group-head"
                  data-key={gKey}
                  tabIndex={focus === gKey || (focus === null && gi === 0) ? 0 : -1}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-${gi}`}
                  onFocus={() => setFocus(gKey)}
                  onClick={() => toggleGroup(g.id)}
                >
                  <svg className="ui-fm__chevron" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.5 9.5 12 15l5.5-5.5" />
                  </svg>
                  <span className="ui-fm__group-label" dir="auto" title={g.label}>
                    {g.label}
                  </span>
                  <span className="ui-fm__group-count">
                    {g.options.length.toLocaleString("en-US")}
                  </span>
                  <span className="ui-fm__group-picked" aria-live="polite">
                    {count > 0 ? `${count} filter${count === 1 ? "" : "s"}` : ""}
                  </span>
                </button>
                {/* Opens and closes by animating its grid row from 0 to the content height */}
                <div
                  className="ui-fm__panel"
                  id={`${uid}-${gi}`}
                  role="group"
                  aria-label={g.label}
                >
                  <div className="ui-fm__panel-inner">
                    {g.options.map((o, oi) => {
                      const key = `o:${gi}:${oi}`;
                      const on = isOn(g.id, o.id);
                      return (
                        <button
                          key={`${o.id}#${oi}`}
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          className="ui-fm__option"
                          data-key={key}
                          tabIndex={isOpen && focus === key ? 0 : -1}
                          onFocus={() => setFocus(key)}
                          onClick={() => toggle(g.id, o.id)}
                        >
                          <span className="ui-fm__box" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                              <path d="m6 12.5 4 4 8-9" />
                            </svg>
                          </span>
                          <span
                            className="ui-fm__option-label"
                            dir="auto"
                            title={o.label}
                          >
                            {o.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {hints && (
        <div className="ui-fm__hints" aria-hidden="true">
          <span className="ui-fm__hint">
            <kbd>
              <svg viewBox="0 0 24 24">
                <path d="M12 5v14m0 0-5-5m5 5 5-5" />
              </svg>
            </kbd>
            <kbd>
              <svg viewBox="0 0 24 24">
                <path d="M12 19V5m0 0-5 5m5-5 5 5" />
              </svg>
            </kbd>
            To navigate
          </span>
          <span className="ui-fm__hint">
            <kbd>
              <svg viewBox="0 0 24 24">
                <path d="M18 6v6.5a2 2 0 0 1-2 2H7m0 0 3.5-3.5M7 14.5 10.5 18" />
              </svg>
            </kbd>
            To select
          </span>
        </div>
      )}
    </div>
  );
}
/** The outer box follows the inner box's height, with a transition after the first frame */
function useSmoothHeight(inner: RefObject<HTMLElement | null>) {
  const outer = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const sync = () => {
      o.style.height = `${i.offsetHeight}px`;
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(i);
    const frame = requestAnimationFrame(() => o.setAttribute("data-smooth", ""));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [inner]);
  return outer;
}
