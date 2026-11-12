"use client";

import "./SmartRecommendation.css";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
/*
 * Smart Recommendation – a suggestion card with a confidence signal, alternatives and one-click accept, in a single
 * self-contained file. Fold it away, pick an alternative instead, accept and undo.
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
    const pop = alt?.querySelector<HTMLElement>(".ui-sr__menu");
    const card = alt?.closest<HTMLElement>(".ui-sr");
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
        className={["ui-sr", className].filter(Boolean).join(" ")}
        aria-label={title}
        data-accepted={done || undefined}
      >
        <div className="ui-sr__card">
          <button
            type="button"
            className="ui-sr__head"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <SparkIcon />
            <span className="ui-sr__title" dir="auto" title={title}>
              {title}
            </span>
            {!isRecommended && <span className="ui-sr__pill">Alternative</span>}
            <span className="ui-sr__chevron">
              <Icon d="m4.5 6.25 3.5 3.5 3.5-3.5" />
            </span>
          </button>
          <div className="ui-sr__body" data-open={open || undefined} inert={!open}>
            <p className="ui-sr__reason" key={at} dir="auto">
              {current.reason}
            </p>
          </div>
        </div>

        <footer className="ui-sr__foot">
          <span className="ui-sr__signal" data-level={signal} title={signalText[signal]}>
            <span className="ui-sr__bars" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span key={n} data-on={signal >= n || undefined} />
              ))}
            </span>
            {signalText[signal]}
          </span>

          <div className="ui-sr__actions">
            {options.length > 1 && !done && (
              <div className="ui-sr__alt" ref={menuRef}>
                <button
                  type="button"
                  className="ui-sr__btn"
                  aria-haspopup="menu"
                  aria-expanded={menu}
                  onClick={() => setMenu((m) => !m)}
                >
                  Alternatives
                </button>
                {menu && (
                  <div className="ui-sr__menu" role="menu" data-flip={flip || undefined}>
                    {options.map((o, i) => (
                      <button
                        key={`${o.id}-${i}`}
                        type="button"
                        role="menuitemradio"
                        aria-checked={i === at}
                        className="ui-sr__option"
                        onClick={() => {
                          setChosen(i);
                          setMenu(false);
                          setOpen(true);
                        }}
                      >
                        <span className="ui-sr__option-label">
                          <span className="ui-sr__option-name" dir="auto" title={o.label}>
                            {o.label}
                          </span>
                          {i === 0 && <span className="ui-sr__tag">Recommended</span>}
                        </span>
                        <span
                          className="ui-sr__mini"
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
                <span className="ui-sr__done" role="status">
                  <Icon d="m3.5 8.5 3 3 6-7" size={14} />
                  <span className="ui-sr__done-text" title={`${current.label} accepted`}>
                    <bdi>{current.label}</bdi> accepted
                  </span>
                </span>
                <button
                  type="button"
                  className="ui-sr__btn"
                  onClick={() => {
                    setAccepted(null);
                    onUndo?.(current);
                  }}
                >
                  Undo
                </button>
              </>
            ) : (
              <button
                type="button"
                className="ui-sr__btn ui-sr__btn--primary"
                title={acceptText}
                onClick={() => {
                  setAccepted(at);
                  setMenu(false);
                  onAccept?.(current);
                }}
              >
                <span className="ui-sr__btn-text">{acceptText}</span>
              </button>
            )}
          </div>
        </footer>
      </section>
    </>
  );
}
const SparkIcon = () => (
  <svg
    className="ui-sr__spark"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 3.5H4A1.5 1.5 0 0 0 2.5 5v7A1.5 1.5 0 0 0 4 13.5h7a1.5 1.5 0 0 0 1.5-1.5V8" />
    <path d="M12.5 1.5v4M10.5 3.5h4" />
  </svg>
);
const Icon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);
