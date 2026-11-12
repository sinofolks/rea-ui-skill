"use client";

import "./EmailDraft.clean.css";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
/*
 * Email Draft (Clean) – an agent-written email waiting for review, in component logic and public types.
 * Clean style: no tray – one white card with hairline shadows. The record it's about (reference, status, amount)
 * heads the card; below it the email: recipient you can switch, an attachment you can remove, tone variants,
 * inline editing. The last row holds who wrote it, its state, Discard and Send.
 * Sending or discarding folds the email into a one-line receipt with Undo; only the content glides to its new height.
 * Styles are provided by the sibling CSS import.
 */
export type DraftContact = {
  name: string;
  email: string;
};
export type DraftTone = {
  id: string;
  label: string;
  body: (contact: DraftContact) => string;
};
export type EmailDraftProps = {
  /** Reference of the record, e.g. a subscription or invoice number */
  reference?: string;
  /** Account or company under the reference */
  account?: string;
  /** Amount shown on the right */
  amount?: string;
  /** Status chip next to the reference */
  status?: string;
  /** Who wrote the draft */
  agent?: string;
  contacts?: DraftContact[];
  attachment?: string | null;
  /** Text variants to switch between – the first one is shown first */
  tones?: DraftTone[];
  /** Label and target of the link appended to the email */
  link?: {
    label: string;
    href: string;
  };
  onSend?: (email: { to: DraftContact; body: string; attachment: string | null }) => void;
  onDiscard?: () => void;
  className?: string;
};
const defaultContacts: DraftContact[] = [
  { name: "Jonas Weber", email: "jonas@northwind.io" },
  { name: "Lena Hart", email: "lena@northwind.io" },
  { name: "Finance team", email: "billing@northwind.io" },
];
const first = (c: DraftContact) => c.name.trim().split(/\s+/)[0] ?? "";
// Two capitals from whole letters – emoji and stray spaces are skipped
const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w.match(/[\p{L}\p{N}]/u)?.[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Without contacts there is no one to send to – the recipient button and Send step back
const NO_ONE: DraftContact = { name: "", email: "" };
const defaultTones: DraftTone[] = [
  {
    id: "friendly",
    label: "Friendly",
    body: (c) =>
      `Hi ${first(c)}, a heads-up that your Growth plan renews on October 9 for $8,900 a year. If you'd like to add seats or switch to monthly billing, you can review the quote here:`,
  },
  {
    id: "short",
    label: "Short",
    body: (c) =>
      `Hi ${first(c)}, your Growth plan renews on October 9 ($8,900/year). Quote for changes:`,
  },
  {
    id: "formal",
    label: "Formal",
    body: (c) =>
      `Dear ${c.name}, this is a reminder that your Growth subscription is scheduled to renew on October 9 at $8,900 per year. Should you wish to adjust seats or billing, please review the attached quote:`,
  },
];
type Phase = "draft" | "sending" | "sent" | "discarded";
export function EmailDraft({
  reference = "SUB-1182",
  account = "Northwind Logistics",
  amount = "$8,900",
  status = "Renews in 5 days",
  agent = "Renewal agent",
  contacts = defaultContacts,
  attachment = "Renewal-quote.pdf",
  tones = defaultTones,
  link = { label: "Review quote", href: "#" },
  onSend,
  onDiscard,
  className,
}: EmailDraftProps) {
  const [to, setTo] = useState<DraftContact>(contacts[0] ?? NO_ONE);
  const [file, setFile] = useState<string | null>(attachment);
  const [tone, setTone] = useState(tones[0]?.id ?? "");
  // Edited text wins over the generated variant until the tone or recipient changes
  const [edited, setEdited] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [menu, setMenu] = useState(false);
  const [phase, setPhase] = useState<Phase>("draft");
  const [toneKey, setToneKey] = useState(0);
  const inner = useRef<HTMLDivElement>(null);
  const outer = useSmoothHeight(inner);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const generated = tones.find((t) => t.id === tone)?.body(to) ?? "";
  const body = edited ?? generated;
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  // Close the recipient menu on outside click or Escape
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);
  // The edit field grows with its text
  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [editing, body]);
  const startEditing = () => {
    setEdited(body);
    setEditing(true);
    requestAnimationFrame(() => {
      const el = textRef.current;
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    });
  };
  const pickTone = (id: string) => {
    if (id === tone && edited === null) return;
    setTone(id);
    setEdited(null);
    setEditing(false);
    setToneKey((k) => k + 1);
  };
  const pickContact = (c: DraftContact) => {
    setTo(c);
    setMenu(false);
    // Keep manual edits, but follow the new name in the generated text – the full name first, then the first name alone
    const full = to.name.trim();
    const parts = [
      full && escape(full),
      first(to) && `\\b${escape(first(to))}\\b`,
    ].filter(Boolean);
    if (edited !== null && parts.length)
      setEdited(
        edited.replace(new RegExp(parts.join("|"), "g"), (m) =>
          m === full ? c.name.trim() : first(c),
        ),
      );
  };
  const send = () => {
    if (phase !== "draft" || !to.email) return;
    setEditing(false);
    setPhase("sending");
    timers.current.push(
      window.setTimeout(() => {
        setPhase("sent");
        onSend?.({ to, body: `${body} ${link.label}: ${link.href}`, attachment: file });
      }, 900),
    );
  };
  const discard = () => {
    setEditing(false);
    setPhase("discarded");
    onDiscard?.();
  };
  const undo = () => setPhase("draft");
  const open = phase === "draft" || phase === "sending";
  const badge =
    phase === "sent"
      ? { text: "Sent", tone: "ok" }
      : phase === "discarded"
        ? { text: "Discarded", tone: "muted" }
        : { text: "Ready for review", tone: "ok" };
  return (
    <div className={["ui-edc", className].filter(Boolean).join(" ")} data-phase={phase}>
      {/* The record the email is about */}
      <div className="ui-edc__record">
        <div className="ui-edc__ref">
          <span className="ui-edc__id" title={reference}>
            {reference}
          </span>
          {status && (
            <span className="ui-edc__status" dir="auto" title={status}>
              {status}
            </span>
          )}
          <span className="ui-edc__amount">{amount}</span>
        </div>
        <span className="ui-edc__account" dir="auto">
          {account}
        </span>
      </div>

      {/* Email ↔ receipt – only this part glides to its new height, the last row below always stays in view */}
      <div className="ui-edc__outer" ref={outer} data-menu={menu ? "" : undefined}>
        <div ref={inner}>
          {open ? (
            <div
              className="ui-edc__draft"
              data-sending={phase === "sending" ? "" : undefined}
            >
              <div className="ui-edc__meta">
                <div className="ui-edc__to" ref={menuRef}>
                  <span className="ui-edc__label">To</span>
                  {to.email ? (
                    <button
                      type="button"
                      className="ui-edc__recipient"
                      aria-haspopup="listbox"
                      aria-expanded={menu}
                      title={`${to.name} <${to.email}>`}
                      onClick={() => setMenu((m) => !m)}
                    >
                      <span className="ui-edc__name" dir="auto">
                        {to.name}
                      </span>
                      <span className="ui-edc__email">{to.email}</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m8 10 4 4 4-4" />
                      </svg>
                    </button>
                  ) : (
                    <span className="ui-edc__email">No recipient</span>
                  )}
                  {menu && (
                    <ul className="ui-edc__menu" role="listbox" aria-label="Recipient">
                      {contacts.map((c, i) => (
                        <li key={`${c.email}-${i}`}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={c.email === to.email}
                            onClick={() => pickContact(c)}
                          >
                            <span className="ui-edc__avatar" aria-hidden="true">
                              {initials(c.name)}
                            </span>
                            <span className="ui-edc__menu-text" dir="auto">
                              {c.name}
                              <small>{c.email}</small>
                            </span>
                            {c.email === to.email && (
                              <svg
                                className="ui-edc__tick"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="m6 12.5 4 4 8-9" />
                              </svg>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {file ? (
                  <span className="ui-edc__file">
                    <Icon>
                      <path d="m15.5 7.5-6.4 6.4a1.8 1.8 0 0 0 2.5 2.5l6.7-6.7a3.5 3.5 0 0 0-5-5l-6.9 6.9a5.2 5.2 0 0 0 7.4 7.4l6-6" />
                    </Icon>
                    <span className="ui-edc__file-name" title={file}>
                      {file}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${file}`}
                      onClick={() => setFile(null)}
                    >
                      <Icon>
                        <path d="M7 7l10 10M17 7 7 17" />
                      </Icon>
                    </button>
                  </span>
                ) : (
                  attachment && (
                    <button
                      type="button"
                      className="ui-edc__attach"
                      onClick={() => setFile(attachment)}
                    >
                      <Icon>
                        <path d="M12 6v12M6 12h12" />
                      </Icon>
                      <span className="ui-edc__file-name" title={attachment}>
                        Attach {attachment}
                      </span>
                    </button>
                  )
                )}
              </div>

              <div className="ui-edc__body">
                {editing ? (
                  <textarea
                    ref={textRef}
                    className="ui-edc__edit"
                    dir="auto"
                    value={edited ?? ""}
                    onChange={(e) => setEdited(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        send();
                      }
                      if (e.key === "Escape") setEditing(false);
                    }}
                    onBlur={() => setEditing(false)}
                    aria-label="Email text"
                  />
                ) : (
                  <p
                    key={toneKey}
                    className="ui-edc__text"
                    dir="auto"
                    onClick={startEditing}
                    title="Click to edit"
                  >
                    {body}{" "}
                    <a href={link.href} onClick={(e) => e.stopPropagation()}>
                      {link.label}
                    </a>
                  </p>
                )}
              </div>

              <div className="ui-edc__tune">
                <div className="ui-edc__tones" role="group" aria-label="Tone">
                  {tones.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={tone === t.id && edited === null}
                      onClick={() => pickTone(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="ui-edc__edit-btn"
                    aria-pressed={editing}
                    aria-label="Edit text"
                    onClick={startEditing}
                  >
                    <Icon>
                      <path d="M14.5 5.5 18.5 9.5M5 19l1-4L15.5 5.5l4 4L10 19l-5 0Z" />
                    </Icon>
                  </button>
                </div>
                <span className="ui-edc__hint">⌘ Enter to send</span>
              </div>
            </div>
          ) : (
            <div className="ui-edc__receipt" role="status">
              <span
                className="ui-edc__receipt-icon"
                data-tone={phase === "sent" ? "ok" : "muted"}
                aria-hidden="true"
              >
                <Icon>
                  {phase === "sent" ? (
                    <path d="m6 12.5 4 4 8-9" />
                  ) : (
                    <path d="M7 7l10 10M17 7 7 17" />
                  )}
                </Icon>
              </span>
              <span className="ui-edc__receipt-text">
                {phase === "sent" ? (
                  <>
                    Sent to <b dir="auto">{to.name}</b>
                    {file ? ` with ${file}` : ""}
                  </>
                ) : (
                  "Draft discarded"
                )}
              </span>
              <button type="button" className="ui-edc__undo" onClick={undo}>
                Undo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* The last row of the card: who wrote it, its state, and the decision */}
      <div className="ui-edc__foot">
        <span className="ui-edc__agent" title={agent}>
          {agent}
        </span>
        <span className="ui-edc__badge" data-tone={badge.tone} key={badge.text}>
          {badge.text}
        </span>
        {open && (
          <div className="ui-edc__buttons">
            <button
              type="button"
              className="ui-edc__secondary"
              onClick={discard}
              disabled={phase === "sending"}
            >
              Discard
            </button>
            <button
              type="button"
              className="ui-edc__primary"
              onClick={send}
              disabled={phase === "sending" || !to.email}
            >
              {phase === "sending" ? (
                <>
                  <span className="ui-edc__spinner" aria-hidden="true" />
                  Sending
                </>
              ) : (
                "Send email"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);
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
