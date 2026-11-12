"use client";

import "./CommentThread.clean.css";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
/*
 * Comment Thread (Clean) – one comment with its replies, including an assistant that reports what it did, in a single
 * self-contained file. Clean style: no tray – one white card with hairline shadows: the heading on top, the
 * conversation in the middle and the reply field lying right in the card as its last row.
 * Assistant replies can fold open to show the details; replying shows a shimmering thinking state
 * while an async answer comes back. Styles are provided by the sibling CSS import.
 */
export type ThreadAuthor = {
  name: string;
  avatar?: ReactNode | string;
  assistant?: boolean;
};
export type ThreadMessage = {
  id: string;
  author: ThreadAuthor;
  createdAt: Date | number;
  text: string;
  /** Assistant replies: a short status line that folds open to show these details */
  status?: string;
  details?: string[];
};
export type CommentThreadProps = {
  title?: string;
  messages: ThreadMessage[];
  currentUser: ThreadAuthor;
  /** The assistant that answers – used for the thinking state */
  assistant?: ThreadAuthor;
  /**
   * Called with every new reply. Return a message (or a promise of one) to let the assistant answer;
   * return nothing to just post the reply.
   */
  onReply?: (text: string) => ThreadMessage | Promise<ThreadMessage | void> | void;
  onClose?: () => void;
  className?: string;
};
function ago(time: number, now: number) {
  const s = Math.max(0, Math.round((now - time) / 1000));
  if (s < 45) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m}min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d}d ago`;
  return d < 365 ? `${Math.round(d / 30)}mo ago` : `${Math.round(d / 365)}y ago`;
}
// 1284 → "1,284"
const count = new Intl.NumberFormat("en");
/** Two initials from whole letters – skips emoji and stray spaces, so "🦊 Fox" gives "F" */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => Array.from(w).find((c) => /[\p{L}\p{N}]/u.test(c)))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
export function CommentThread({
  title = "Comment",
  messages: initial,
  currentUser,
  assistant,
  onReply,
  onClose,
  className,
}: CommentThreadProps) {
  const [messages, setMessages] = useState(initial);
  // Assistant replies that are there from the start come in a beat after the comment above them
  const [firstIds] = useState(
    () => new Set(initial.filter((m) => m.author.assistant).map((m) => m.id)),
  );
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const listRef = useRef<HTMLDivElement>(null);
  const morphRef = useSmoothHeight(listRef);
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(t);
  }, []);
  // Follow the conversation as it grows
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, thinking]);
  const send = async () => {
    const text = draft.trim();
    if (!text || thinking) return;
    setDraft("");
    setNow(Date.now());
    lockHeight(true);
    setMessages((m) => [
      ...m,
      { id: `m-${Date.now()}`, author: currentUser, createdAt: Date.now(), text },
    ]);
    const answer = onReply?.(text);
    if (!answer) return;
    setThinking(true);
    try {
      const reply = await answer;
      if (reply) setMessages((m) => [...m, { ...reply, createdAt: Date.now() }]);
    } finally {
      setThinking(false);
      setNow(Date.now());
    }
  };
  // New messages keep the card at its height and the conversation scrolls up; folding details lets it grow again
  const lockHeight = (on: boolean) => {
    const list = listRef.current;
    if (list) list.style.maxHeight = on ? `${list.offsetHeight}px` : "";
  };
  const toggle = (id: string) => {
    lockHeight(false);
    setOpen((o) => {
      const next = new Set(o);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return (
    <>
      <section
        className={["ui-ctc", className].filter(Boolean).join(" ")}
        aria-label={title}
      >
        <header className="ui-ctc__head">
          <h3 className="ui-ctc__title" title={title} dir="auto">
            {title}
          </h3>
          <span className="ui-ctc__count">
            {count.format(messages.length)}{" "}
            {messages.length === 1 ? "message" : "messages"}
          </span>
          {onClose && (
            <button
              type="button"
              className="ui-ctc__icon-btn"
              aria-label="Close comment"
              onClick={onClose}
            >
              <Icon d="m4.5 4.5 7 7M11.5 4.5l-7 7" />
            </button>
          )}
        </header>

        {/* Only the conversation glides to its new height – the reply row below always stays in view */}
        <div className="ui-ctc__morph" ref={morphRef}>
          <div className="ui-ctc__scroll" ref={listRef} aria-live="polite">
            {messages.map((m) => {
              const isOpen = open.has(m.id);
              const command = /^\/edit\b/i.test(m.text.trim());
              return (
                <article
                  key={m.id}
                  className="ui-ctc__msg"
                  data-delayed={firstIds.has(m.id) || undefined}
                >
                  <div className="ui-ctc__meta">
                    <Avatar author={m.author} />
                    <span className="ui-ctc__name" title={m.author.name} dir="auto">
                      {m.author.name}
                    </span>
                    <time
                      className="ui-ctc__time"
                      dateTime={new Date(m.createdAt).toISOString()}
                    >
                      {ago(+m.createdAt, now)}
                    </time>
                  </div>
                  {m.text && (
                    <p className="ui-ctc__text" dir="auto">
                      {command ? (
                        <>
                          <span className="ui-ctc__command">/edit</span>{" "}
                          {m.text.trim().replace(/^\/edit\s*/i, "")}
                        </>
                      ) : (
                        m.text
                      )}
                    </p>
                  )}
                  {m.status && (
                    <div className="ui-ctc__status">
                      <button
                        type="button"
                        className="ui-ctc__status-btn"
                        aria-expanded={isOpen}
                        disabled={!m.details?.length}
                        onClick={() => toggle(m.id)}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="ui-ctc__check"
                          aria-hidden="true"
                        >
                          <path d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Zm8.9-1.2a.5.5 0 0 0-.8-.6L7.44 9.23 6.35 8.15a.5.5 0 1 0-.7.7l1.5 1.5a.5.5 0 0 0 .76-.06l2.5-3.5Z" />
                        </svg>
                        <span className="ui-ctc__status-text" title={m.status} dir="auto">
                          {m.status}
                        </span>
                        {!!m.details?.length && (
                          <span className="ui-ctc__chevron">
                            <Icon d="m5 6.5 3 3 3-3" />
                          </span>
                        )}
                      </button>
                      {!!m.details?.length && (
                        <div
                          className="ui-ctc__details"
                          data-open={isOpen || undefined}
                          inert={!isOpen}
                        >
                          <ul>
                            {m.details.map((d, i) => (
                              <li
                                key={i}
                                dir="auto"
                                style={{ "--i": i } as CSSProperties}
                              >
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
            {thinking && assistant && (
              <article
                className="ui-ctc__msg"
                aria-label={`${assistant.name} is thinking`}
              >
                <div className="ui-ctc__meta">
                  <Avatar author={assistant} />
                  <span className="ui-ctc__name">{assistant.name}</span>
                </div>
                <p className="ui-ctc__text">
                  <span className="ui-ctc__thinking" data-text="Thinking…">
                    Thinking…
                  </span>
                </p>
              </article>
            )}
          </div>
        </div>

        {/* The reply row lies right in the card – no own fill, no line above */}
        <form
          className="ui-ctc__composer"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            className="ui-ctc__input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={assistant ? `Reply, or ask @${assistant.name}…` : "Add comment…"}
            aria-label="Reply"
          />
          <button
            type="submit"
            className="ui-ctc__send"
            aria-label="Send reply"
            disabled={!draft.trim() || thinking}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 12.5v-9M4.25 7.25 8 3.5l3.75 3.75" />
            </svg>
          </button>
        </form>
      </section>
    </>
  );
}
function Avatar({ author }: { author: ThreadAuthor }) {
  // A picture that fails to load falls back to the initials
  const [failed, setFailed] = useState(false);
  if (author.avatar && typeof author.avatar !== "string")
    return <span className="ui-ctc__avatar">{author.avatar}</span>;
  if (typeof author.avatar === "string" && !failed) {
    return (
      <img
        className="ui-ctc__avatar"
        src={author.avatar}
        alt=""
        width={20}
        height={20}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className="ui-ctc__avatar ui-ctc__avatar--initials" aria-hidden="true">
      {initials(author.name)}
    </span>
  );
}
/** A simple assistant mark: a full circle with a blue-to-violet gradient – pass your own logo as `avatar` instead */
export function AssistantMark() {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <defs>
        <linearGradient
          id={`${id}-fill`}
          x1="3"
          y1="3"
          x2="21"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5b9dff" />
          <stop offset="0.5" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill={`url(#${id}-fill)`} />
    </svg>
  );
}
/** 16px icons with thin, round lines */
const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 16 16" className="ui-ctc__glyph" aria-hidden="true">
    <path d={d} />
  </svg>
);
/**
 * Lets a box glide to the height of its content instead of jumping: the outer box follows the inner one
 * with a height transition whenever the content grows or shrinks.
 */
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
    // Transitions switch on after the first measurement, so the first render doesn't animate
    const frame = requestAnimationFrame(() => o.setAttribute("data-smooth", ""));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [inner]);
  return outer;
}
