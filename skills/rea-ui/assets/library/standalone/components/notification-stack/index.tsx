"use client";

import "./NotificationStack.css";
import { useLayoutEffect, useRef, useState } from "react";
/*
 * Notification Stack – notices stacked behind each other, in component logic and public types.
 * Only the front card can be read; the others peek out below it. Dismissing the front card slides it away and
 * the next one moves up – one notice at a time.
 * Styles are provided by the sibling CSS import.
 */
export type NoticePattern = "orbit" | "grid" | "rays";
export type Notice = {
  id: string;
  /** Small label in the pill, e.g. "Notice" */
  badge?: string;
  title: string;
  text: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    external?: boolean;
  };
  /** Line art in the top-right corner */
  pattern?: NoticePattern;
};
export type NotificationStackProps = {
  notices: Notice[];
  /** Called after a notice was dismissed */
  onDismiss?: (notice: Notice) => void;
  className?: string;
};
const PEEK = 12; // how far each card behind peeks out below the one in front, in px
export function NotificationStack({
  notices,
  onDismiss,
  className,
}: NotificationStackProps) {
  const [items, setItems] = useState(notices);
  const [leaving, setLeaving] = useState<Set<string>>(new Set());
  // New notices from the parent join the stack; dismissed ones stay gone
  const removed = useRef(new Set<string>());
  const [given, setGiven] = useState(notices);
  if (notices !== given) {
    setGiven(notices);
    setItems(notices.filter((n) => !removed.current.has(n.id)));
  }
  const [heights, setHeights] = useState<Record<string, number>>({});
  const refs = useRef(new Map<string, HTMLElement>());
  const visible = items.filter((n) => !leaving.has(n.id));
  const behind = Math.min(visible.length - 1, 2);
  // The front card's height sets the height of the stack
  useLayoutEffect(() => {
    const measure = () => {
      const next: Record<string, number> = {};
      // The full height, also for a card behind that is cut to the front card's height
      refs.current.forEach(
        (el, id) => (next[id] = el.scrollHeight + el.offsetHeight - el.clientHeight),
      );
      setHeights(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    refs.current.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [items]);
  const dismiss = (notice: Notice) => {
    setLeaving((s) => new Set(s).add(notice.id));
    onDismiss?.(notice);
    window.setTimeout(() => {
      removed.current.add(notice.id);
      setItems((list) => list.filter((n) => n.id !== notice.id));
      setLeaving((s) => {
        const next = new Set(s);
        next.delete(notice.id);
        return next;
      });
    }, 320);
  };
  const front = visible[0] ? (heights[visible[0].id] ?? 0) : 0;
  return (
    <>
      <section
        className={["ui-ns", className].filter(Boolean).join(" ")}
        aria-label="Notifications"
        style={{ height: visible.length ? front + behind * PEEK : 0 }}
      >
        {items.map((notice) => {
          const i = visible.findIndex((n) => n.id === notice.id);
          const gone = i === -1;
          const depth = Math.max(0, i);
          // Only the cards that can show are rendered – a long list stays light
          if (!gone && depth > 3) return null;
          const isBehind = !gone && depth > 0;
          // Cards behind are lined up on the front card's bottom edge, a little lower and smaller each
          // A card behind that is taller than the front one is cut to its height, so it never peeks out above
          const y =
            gone || depth === 0
              ? 0
              : front -
                Math.min(heights[notice.id] ?? front, front) +
                Math.min(depth, 2) * PEEK;
          const scale = gone ? 1 : 1 - Math.min(depth, 2) * 0.05;
          return (
            <article
              key={notice.id}
              ref={(el) => {
                if (el) refs.current.set(notice.id, el);
                else refs.current.delete(notice.id);
              }}
              className="ui-ns__card"
              data-depth={gone ? undefined : depth}
              data-leaving={gone || undefined}
              aria-labelledby={`${notice.id}-title`}
              aria-hidden={isBehind || undefined}
              inert={isBehind || gone}
              style={{
                zIndex: gone ? 10 : 10 - depth,
                transform: gone ? undefined : `translateY(${y}px) scale(${scale})`,
                opacity: depth > 2 ? 0 : undefined,
                maxHeight: isBehind && front ? front : undefined,
              }}
            >
              <Pattern kind={notice.pattern ?? "orbit"} />
              <div className="ui-ns__body">
                <div className="ui-ns__top">
                  {notice.badge ? (
                    <span className="ui-ns__badge" dir="auto" title={notice.badge}>
                      {notice.badge}
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    className="ui-ns__close"
                    aria-label={`Dismiss ${notice.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      dismiss(notice);
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <h3 id={`${notice.id}-title`} className="ui-ns__title" dir="auto">
                  {notice.title}
                </h3>
                <p className="ui-ns__text" dir="auto">
                  {notice.text}
                </p>
                {notice.action &&
                  (notice.action.href ? (
                    <a
                      className="ui-ns__btn"
                      dir="auto"
                      href={notice.action.href}
                      onClick={notice.action.onClick}
                      {...(notice.action.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {notice.action.label}
                      {notice.action.external && <ArrowIcon />}
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="ui-ns__btn"
                      dir="auto"
                      onClick={notice.action.onClick}
                    >
                      {notice.action.label}
                    </button>
                  ))}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
/** Quiet line art for the top-right corner – fades out towards the text */
function Pattern({ kind }: { kind: NoticePattern }) {
  return (
    <svg className="ui-ns__pattern" viewBox="0 0 220 160" fill="none" aria-hidden="true">
      {kind === "orbit" && (
        <>
          <circle cx="190" cy="10" r="46" />
          <circle cx="190" cy="10" r="86" />
          <circle cx="190" cy="10" r="128" />
          <path d="M60 160 220 0M0 58h220M150 0v160" />
          <circle cx="150" cy="58" r="3.5" className="ui-ns__dot" />
        </>
      )}
      {kind === "grid" && (
        <>
          {[30, 60, 90, 120, 150, 180, 210].map((x) => (
            <path key={`x${x}`} d={`M${x} 0v160`} />
          ))}
          {[20, 50, 80, 110, 140].map((y) => (
            <path key={`y${y}`} d={`M0 ${y}h220`} />
          ))}
          <rect x="150" y="50" width="30" height="30" className="ui-ns__fill" />
          <circle cx="180" cy="50" r="3.5" className="ui-ns__dot" />
        </>
      )}
      {kind === "rays" && (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <path
              key={i}
              d={`M210 6 L${210 - Math.cos((i * Math.PI) / 16) * 230} ${6 + Math.sin((i * Math.PI) / 16) * 230}`}
            />
          ))}
          <path d="M120 6a90 90 0 0 0 90 90" />
          <circle cx="146" cy="70" r="3.5" className="ui-ns__dot" />
        </>
      )}
    </svg>
  );
}
const CloseIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
);
const ArrowIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 11 11 5M6 5h5v5" />
  </svg>
);
