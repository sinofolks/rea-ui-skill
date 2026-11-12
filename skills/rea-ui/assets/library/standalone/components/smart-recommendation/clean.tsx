"use client";

import "./SmartRecommendation.clean.css";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
/*
 * Smart Recommendation (Clean) – a suggestion card with a confidence signal, alternatives and one-click accept, in a
 * single self-contained file.
 * Clean style: no tray – one white card with hairline shadows and quiet gray type; the signal and the actions sit in
 * the last row of the card. Fold it away, pick an alternative instead, accept and undo.
 * Styles are provided by the sibling CSS import.
 */
export type Recommendation = {
  id: string;
  /** Short name, used in the accept button, e.g. "Incremental sync" */
  label: string;
  /** One sentence why – shown in the card */
  reason: ReactNode;
  /** 0 = no signal, 1 = weak, 2 = good, 3 = strong */
  signal: 0 | 1 | 2 | 3;
};
export type SmartRecommendationProps = {
  title?: string;
  /** First entry is the recommendation, the rest are offered as alternatives */
  options: Recommendation[];
  onAccept?: (option: Recommendation) => void;
  onUndo?: (option: Recommendation) => void;
  defaultOpen?: boolean;
  className?: string;
};
const signalText = ["No signal", "Weak signal", "Good signal", "Strong signal"];
/** Any signal outside 0–3 (NaN, "3", 7, -1) is read as the nearest valid level, NaN as no signal */
const level = (s: unknown): 0 | 1 | 2 | 3 => {
  const n = Math.round(Number(s));
  return (Number.isFinite(n) ? Math.min(3, Math.max(0, n)) : 0) as 0 | 1 | 2 | 3;
};
/** "Incremental sync" → "incremental sync", but "AWS backup" and "S3 sync" keep their capitals */
const lowerFirst = (s: string) =>
  /^\p{Lu}\p{Ll}/u.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
export function SmartRecommendation({
  title = "Smart recommendation",
  options,
  onAccept,
  onUndo,
  defaultOpen = true,
  className,
}: SmartRecommendationProps) {
  // By position, so two options with the same id stay apart
  const [chosen, setChosen] = useState(0);
  const [accepted, setAccepted] = useState<number | null>(null);
  const [open, setOpen] = useState(defaultOpen);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  // When the button sits at the start of its row (long labels push the actions onto their own row), the menu opens
  // to the right instead of past the card's left edge
  const [flip, setFlip] = useState(false);
  useLayoutEffect(() => {
    const alt = menuRef.current;
    const pop = alt?.querySelector<HTMLElement>(".ui-src__menu");
    const card = alt?.closest<HTMLElement>(".ui-src");
    if (!menu || !alt || !pop || !card || getComputedStyle(alt).position === "static")
      return setFlip(false);
    // Some slack: a menu that only grazes the edge (as in the demo) keeps opening to the left
    setFlip(
      alt.getBoundingClientRect().right - pop.offsetWidth <
        card.getBoundingClientRect().left - 24,
    );
  }, [menu]);
  useEffect(() => {
    if (!menu) return;
    const away = (e: PointerEvent) =>
      !menuRef.current?.contains(e.target as Node) && setMenu(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("pointerdown", away);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("pointerdown", away);
      window.removeEventListener("keydown", esc);
    };
  }, [menu]);
  const at = chosen < options.length ? chosen : 0;
  const current = options[at];
  // Nothing to recommend – render nothing rather than crash
  if (!current) return null;
  const isRecommended = at === 0;
  const done = accepted === at;
  const signal = level(current.signal);
  const acceptText = `Accept ${lowerFirst(String(current.label))}`;
  return (
    <>
      <section
        className={["ui-src", className].filter(Boolean).join(" ")}
        aria-label={title}
        data-accepted={done || undefined}
      >
        <button
          type="button"
          className="ui-src__head"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <SparkMark />
          <span className="ui-src__title" dir="auto" title={title}>
            {title}
          </span>
          {!isRecommended && <span className="ui-src__pill">Alternative</span>}
          <span className="ui-src__chevron">
            <Icon d="m4.5 6.25 3.5 3.5 3.5-3.5" />
          </span>
        </button>
        <div className="ui-src__body" data-open={open || undefined} inert={!open}>
          <p className="ui-src__reason" key={at} dir="auto">
            {current.reason}
          </p>
        </div>

        <footer className="ui-src__foot">
          <span className="ui-src__signal" data-level={signal} title={signalText[signal]}>
            <span className="ui-src__bars" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span key={n} data-on={signal >= n || undefined} />
              ))}
            </span>
            {signalText[signal]}
          </span>

          <div className="ui-src__actions">
            {options.length > 1 && !done && (
              <div className="ui-src__alt" ref={menuRef}>
                <button
                  type="button"
                  className="ui-src__btn ui-src__btn--icon"
                  aria-haspopup="menu"
                  aria-expanded={menu}
                  onClick={() => setMenu((m) => !m)}
                >
                  <Icon d="M5 12.5v-9M2.75 5.75 5 3.5l2.25 2.25M11 3.5v9M8.75 10.25 11 12.5l2.25-2.25" />
                  Alternatives
                </button>
                {menu && (
                  <div className="ui-src__menu" role="menu" data-flip={flip || undefined}>
                    {options.map((o, i) => (
                      <button
                        key={`${o.id}-${i}`}
                        type="button"
                        role="menuitemradio"
                        aria-checked={i === at}
                        className="ui-src__option"
                        onClick={() => {
                          setChosen(i);
                          setMenu(false);
                          setOpen(true);
                        }}
                      >
                        <span className="ui-src__option-label">
                          <span
                            className="ui-src__option-name"
                            dir="auto"
                            title={o.label}
                          >
                            {o.label}
                          </span>
                          {i === 0 && <span className="ui-src__tag">Recommended</span>}
                        </span>
                        <span
                          className="ui-src__mini"
                          data-level={level(o.signal)}
                          aria-label={signalText[level(o.signal)]}
                        >
                          {[1, 2, 3].map((n) => (
                            <span key={n} data-on={level(o.signal) >= n || undefined} />
                          ))}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {done ? (
              <>
                <span className="ui-src__done" role="status">
                  <Icon d="m3.5 8.5 3 3 6-7" />
                  <span className="ui-src__done-text" title={`${current.label} accepted`}>
                    <bdi>{current.label}</bdi> accepted
                  </span>
                </span>
                <button
                  type="button"
                  className="ui-src__btn ui-src__btn--icon"
                  onClick={() => {
                    setAccepted(null);
                    onUndo?.(current);
                  }}
                >
                  <Icon d="M3.5 6.5h6.25a2.75 2.75 0 0 1 0 5.5H8M5.75 4.25 3.5 6.5l2.25 2.25" />
                  Undo
                </button>
              </>
            ) : (
              <button
                type="button"
                className="ui-src__btn ui-src__btn--primary"
                title={acceptText}
                onClick={() => {
                  setAccepted(at);
                  setMenu(false);
                  onAccept?.(current);
                }}
              >
                <span className="ui-src__btn-text">{acceptText}</span>
              </button>
            )}
          </div>
        </footer>
      </section>
    </>
  );
}
/** The assistant mark: a solid blue sparkle with a small one beside it */
const SparkMark = () => (
  <svg viewBox="0 0 16 16" className="ui-src__mark" aria-hidden="true">
    <path d="M6.5 2.2c.2 0 .36.14.4.33.53 2.6 1.4 3.48 4 4.02a.4.4 0 0 1 0 .79c-2.6.53-3.47 1.4-4 4a.4.4 0 0 1-.8 0c-.53-2.6-1.4-3.47-4-4a.4.4 0 0 1 0-.79c2.6-.54 3.47-1.42 4-4.02a.4.4 0 0 1 .4-.33Z" />
    <path d="M12 9.6c.12 0 .22.08.25.2.28 1.3.72 1.75 2.03 2.03a.25.25 0 0 1 0 .49c-1.31.28-1.75.72-2.03 2.03a.25.25 0 0 1-.5 0c-.28-1.31-.72-1.75-2.03-2.03a.25.25 0 0 1 0-.49c1.31-.28 1.75-.73 2.03-2.03a.25.25 0 0 1 .25-.2Z" />
  </svg>
);
const Icon = ({ d }: { d: string }) => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);
