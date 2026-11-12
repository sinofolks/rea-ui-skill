"use client";

import "./CollaborationStream.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type CSSProperties,
  type FocusEvent,
} from "react";
interface StreamAgent {
  id?: string;
  name?: string;
  model?: string;
  avatar?: ReactNode;
  [field: string]: unknown;
}
interface StreamAttachment {
  label: string;
  kind?: "file" | "folder" | "table" | "tool" | "link";
  preview?: string;
  meta?: string;
  [field: string]: unknown;
}
interface StreamMessage {
  id?: string;
  name?: string;
  label?: string;
  from?: string;
  to?: string | string[];
  kind?: "spawn" | "question" | "handoff" | string;
  text?: string;
  at?: string;
  typing?: boolean;
  replyTo?: string;
  attachments?: StreamAttachment[];
  details?: {
    facts?: {
      label?: ReactNode;
      value?: ReactNode;
    }[];
    items?: {
      label?: string;
      detail?: string;
      icon?: ReactNode;
    }[];
  };
  [field: string]: unknown;
}
interface CollaborationStreamProps {
  agents: StreamAgent[];
  messages: StreamMessage[];
  task?: string;
  live?: boolean;
  selected?: string | null;
  onSelectedChange?: (id: string | null) => void;
  focusAgent?: string | null;
  onFocusAgentChange?: (id: string | null) => void;
  maxHeight?: number;
  logos?: Record<string, ReactNode>;
  onSend?: (value: { text: string; to: string[]; replyTo?: string }) => void;
  placeholder?: string;
  title?: string;
  className?: string;
}
type StreamId = string | undefined;
interface Preview {
  attachment: StreamAttachment;
  message: StreamMessage;
}
type StreamController = ReturnType<typeof useCollaborationStream>;
interface RowProps {
  message: StreamMessage;
  index: number;
  messages: StreamMessage[];
  agents: StreamAgent[];
  prefix: string;
  stream: StreamController;
  canSend: boolean;
  logos?: Record<string, ReactNode>;
}
interface ViewProps extends CollaborationStreamProps {
  variant: "default" | "clean";
}
function CollaborationStream(props: CollaborationStreamProps) {
  return <CollaborationStreamView {...props} variant="default" />;
}
function avatarPattern(id: string = "") {
  let seed = 0;
  for (const character of id) seed = (seed * 31 + character.charCodeAt(0)) >>> 0;
  for (let attempt = 0; attempt < 64; attempt++) {
    const bits = (seed >> attempt % 26) & 63;
    const pattern = [0, 1, 2].flatMap((row) => {
      const edge = (bits >> (row * 2)) & 1;
      return [edge, (bits >> (row * 2 + 1)) & 1, edge];
    });
    if (pattern.filter(Boolean).length >= 5) return pattern;
    seed = (seed * 1103515245 + 12345) >>> 0;
  }
  return [1, 0, 1, 0, 1, 0, 1, 0, 1];
}
function truncateFilename(name: string, limit = 40) {
  if (name.length <= limit) return name;
  const tail = Math.min(16, Math.floor(limit / 2.5));
  return `${name.slice(0, limit - tail - 1).trimEnd()}…${name.slice(-tail)}`;
}
function includesAgent(message: StreamMessage, id: StreamId) {
  const to = recipients(message.to);
  return (
    message.from === id || to.includes(id) || (to.includes("all") && message.from !== id)
  );
}
function useCollaborationStream(
  {
    agents,
    messages,
    selected,
    onSelectedChange,
    focusAgent,
    onFocusAgentChange,
    onSend,
  }: CollaborationStreamProps,
  prefix: string,
) {
  const agentMap = new Map<StreamId, StreamAgent>([
    ...agents.map((agent): [StreamId, StreamAgent] => [agent.id, agent]),
    [currentUserId, { id: currentUserId, name: "You" }],
  ]);
  const agentName = (id: StreamId) =>
    id === "all" ? "everyone" : (agentMap.get(id)?.name ?? id);
  const [localSelected, setLocalSelected] = useState<StreamId | null>(null),
    selectedId = selected === undefined ? localSelected : selected;
  function selectMessage(id: StreamId | null) {
    setLocalSelected(id);
    onSelectedChange?.(id!);
  }
  const [localFocus, setLocalFocus] = useState<StreamId | null>(null),
    focusedAgent = focusAgent === undefined ? localFocus : focusAgent;
  function focus(id: StreamId | null) {
    setLocalFocus(id);
    onFocusAgentChange?.(id!);
  }
  const messageMap = new Map(messages.map((message) => [message.id, message]));
  const activeMessage = selectedId && messageMap.has(selectedId) ? selectedId : null;
  const kept = (message: StreamMessage) =>
    activeMessage
      ? message.id === activeMessage
      : !focusedAgent || includesAgent(message, focusedAgent);
  const picking = !!activeMessage || !!focusedAgent;
  const scrollRef = useRef<HTMLDivElement>(null),
    [following, setFollowing] = useState(true),
    [unread, setUnread] = useState(0),
    previousCount = useRef(messages.length);
  useLayoutEffect(() => {
    const scroll = scrollRef.current,
      added = messages.length - previousCount.current;
    previousCount.current = messages.length;
    if (!scroll) return;
    if (following)
      scroll.scrollTo({
        top: scroll.scrollHeight,
        behavior: prefersReducedMotion() || added <= 0 ? "auto" : "smooth",
      });
    else if (added > 0) setUnread((previous) => previous + added);
  }, [messages.length, messages.at(-1)?.typing]);
  function onScroll() {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const atEnd = scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 24;
    setFollowing(atEnd);
    if (atEnd) setUnread(0);
  }
  function jumpToLatest() {
    const scroll = scrollRef.current;
    scroll?.scrollTo({
      top: scroll.scrollHeight,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    setUnread(0);
  }
  const messageRefs = useRef(new Map<StreamId, HTMLDivElement>()),
    [focusedMessage, setFocusedMessage] = useState<StreamId | null>(null);
  const tabStop =
    focusedMessage && messageMap.has(focusedMessage)
      ? focusedMessage
      : messages.at(-1)?.id;
  function messageKeyDown(event: KeyboardEvent<HTMLDivElement>, index: number) {
    const target =
      event.key === "ArrowDown"
        ? index + 1
        : event.key === "ArrowUp"
          ? index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? messages.length - 1
              : -2;
    if (target !== -2) {
      event.preventDefault();
      const message = messages[Math.max(0, Math.min(messages.length - 1, target))];
      setFocusedMessage(message.id);
      messageRefs.current.get(message.id)?.focus();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const id = messages[index].id;
      focus(null);
      selectMessage(selectedId === id ? null : id);
    }
    if (event.key === "Escape" && picking) {
      event.preventDefault();
      selectMessage(null);
      focus(null);
    }
  }
  const [flashedId, setFlashedId] = useState<StreamId | null>(null),
    timers = useRef(new Set<number>());
  function schedule(callback: () => void, delay: number) {
    const timer = window.setTimeout(() => {
      timers.current.delete(timer);
      callback();
    }, delay);
    timers.current.add(timer);
  }
  useEffect(() => {
    const active = timers.current;
    return () => active.forEach((timer) => window.clearTimeout(timer));
  }, []);
  function showMessage(id: StreamId) {
    const element = messageRefs.current.get(id);
    if (!element) return;
    element.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    setFocusedMessage(id);
    setFlashedId(id);
    schedule(() => setFlashedId((previous) => (previous === id ? null : previous)), 1400);
  }
  function clickMessage(message: StreamMessage) {
    setFocusedMessage(message.id);
    focus(null);
    const opening = selectedId !== message.id;
    selectMessage(opening ? message.id : null);
    if (opening && message.details)
      schedule(
        () =>
          messageRefs.current
            .get(message.id)
            ?.querySelector(`.${prefix}__more`)
            ?.scrollIntoView({
              block: "nearest",
              behavior: prefersReducedMotion() ? "auto" : "smooth",
            }),
        340,
      );
  }
  const seenMessages = useRef(new Set<StreamId>()),
    mounted = useRef(false);
  const freshIds = new Set(
    mounted.current
      ? messages
          .filter((message) => !seenMessages.current.has(message.id))
          .map((message) => message.id)
      : [],
  );
  useLayoutEffect(() => {
    mounted.current = true;
    for (const message of messages) seenMessages.current.add(message.id);
  });
  const rootRef = useRef<HTMLDivElement>(null),
    previewRef = useRef<HTMLDivElement>(null),
    previewTrigger = useRef<HTMLElement | null>(null),
    [preview, setPreview] = useState<Preview | null>(null);
  function openPreview(
    attachment: StreamAttachment,
    message: StreamMessage,
    trigger: HTMLElement,
  ) {
    previewTrigger.current = trigger;
    setPreview({ attachment, message });
  }
  function closePreview() {
    setPreview(null);
    previewTrigger.current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    if (preview)
      previewRef.current
        ?.querySelector<HTMLElement>(`.${prefix}__preview-close`)
        ?.focus({ preventScroll: true });
  }, [preview]);
  useEffect(() => {
    if (!picking) return;
    const outside = (event: globalThis.PointerEvent) => {
      const target = event.target as Node;
      if (previewRef.current?.contains(target)) return;
      if (activeMessage && !messageRefs.current.get(activeMessage)?.contains(target))
        selectMessage(null);
      if (rootRef.current && !rootRef.current.contains(target)) focus(null);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  });
  function previewKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closePreview();
    } else if (event.key === "Tab") {
      const targets = [
          ...(previewRef.current?.querySelectorAll<HTMLElement>(
            "button, [tabindex='0']",
          ) ?? []),
        ],
        index = targets.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey ? index <= 0 : index === targets.length - 1) {
        event.preventDefault();
        targets[event.shiftKey ? targets.length - 1 : 0]?.focus();
      }
    }
  }
  const tabsRef = useRef<HTMLDivElement>(null),
    [focusedTab, setFocusedTab] = useState<StreamId | null>(null),
    [overflow, setOverflow] = useState("");
  function measureTabs() {
    const tabs = tabsRef.current;
    if (!tabs) return;
    const start = tabs.scrollLeft > 1,
      end = tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 1;
    setOverflow(start && end ? "both" : start ? "start" : end ? "end" : "");
  }
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;
    measureTabs();
    const observer = new ResizeObserver(measureTabs);
    observer.observe(tabs);
    return () => observer.disconnect();
  });
  function tabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const tabs = [
        ...(tabsRef.current?.querySelectorAll<HTMLElement>(`.${prefix}__tab`) ?? []),
      ],
      index = tabs.indexOf(document.activeElement as HTMLElement),
      rtl = tabsRef.current && getComputedStyle(tabsRef.current).direction === "rtl";
    const target =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : event.key === (rtl ? "ArrowLeft" : "ArrowRight")
            ? index + 1
            : event.key === (rtl ? "ArrowRight" : "ArrowLeft")
              ? index - 1
              : null;
    if (target === null || index < 0) return;
    event.preventDefault();
    const tab = tabs[Math.max(0, Math.min(tabs.length - 1, target))];
    tab.focus();
    tab.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  const answered = new Set(
    messages
      .filter((message) => message.from === currentUserId && message.replyTo)
      .map((message) => message.replyTo),
  );
  const needsAnswer = (message: StreamMessage) =>
    message.kind === "question" &&
    !message.typing &&
    recipients(message.to).includes(currentUserId) &&
    !answered.has(message.id);
  const inputRef = useRef<HTMLTextAreaElement>(null),
    [draft, setDraft] = useState(""),
    [reply, setReply] = useState<StreamMessage | null>(null),
    [mentionQuery, setMentionQuery] = useState<string | null>(null),
    [mentionPicker, setMentionPicker] = useState(false),
    [mentionIndex, setMentionIndex] = useState(0);
  function startReply(message: StreamMessage) {
    setReply(message);
    selectMessage(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  }
  function readMention(input: HTMLTextAreaElement) {
    const before = input.value.slice(0, input.selectionStart ?? input.value.length),
      match = /(?:^|\s)@([^\s@]*)$/.exec(before);
    setMentionQuery(match ? match[1] : null);
    setMentionIndex(0);
  }
  const mentionOptions = mentionPicker
    ? agents.slice(0, 6)
    : mentionQuery === null
      ? []
      : agents
          .filter((agent) =>
            (agent.name ?? "").toLowerCase().includes(mentionQuery.toLowerCase()),
          )
          .slice(0, 6);
  const mentionOpen =
    (mentionPicker || mentionQuery !== null) && mentionOptions.length > 0;
  function insertMention(agent: StreamAgent) {
    const input = inputRef.current;
    if (!input) return;
    const caret = input.selectionStart ?? draft.length,
      before = draft.slice(0, caret);
    const inserted = mentionPicker
      ? `${before}${before && !/\s$/.test(before) ? " " : ""}@${agent.name} `
      : before.replace(/@([^\s@]*)$/, `@${agent.name} `);
    setDraft(inserted + draft.slice(caret));
    setMentionQuery(null);
    setMentionPicker(false);
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(inserted.length, inserted.length);
    });
  }
  const mentioned = [...agents]
    .sort((left, right) => (right.name ?? "").length - (left.name ?? "").length)
    .filter((agent) =>
      draft.toLowerCase().includes(`@${(agent.name ?? "").toLowerCase()}`),
    );
  const sendTo = [
    ...new Set([
      ...(reply ? [reply.from] : []),
      ...agents.filter((agent) => mentioned.includes(agent)).map((agent) => agent.id),
    ]),
  ].filter((id) => id !== currentUserId);
  function send() {
    const text = draft.trim();
    if (!text || !onSend) return;
    onSend({
      text,
      to: sendTo.length ? (sendTo as string[]) : ["all"],
      replyTo: reply?.id,
    });
    setDraft("");
    setReply(null);
    setMentionQuery(null);
    setMentionPicker(false);
  }
  function composerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (mentionOpen) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setMentionIndex(
          (index) =>
            (index + (event.key === "ArrowDown" ? 1 : mentionOptions.length - 1)) %
            mentionOptions.length,
        );
        return;
      }
      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        insertMention(mentionOptions[mentionIndex]);
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setMentionQuery(null);
        setMentionPicker(false);
        return;
      }
    }
    if (event.key === "Escape" && reply) {
      event.preventDefault();
      setReply(null);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  }
  function toggleMentionPicker() {
    inputRef.current?.focus();
    setMentionQuery(null);
    setMentionIndex(0);
    setMentionPicker((previous) => !previous);
  }
  const speakers: StreamId[] = [];
  for (const message of messages)
    if (
      message.kind !== "spawn" &&
      agentMap.has(message.from) &&
      !speakers.includes(message.from)
    )
      speakers.push(message.from);
  return {
    agentMap,
    agentName,
    selectedId,
    selectMessage,
    focusedAgent,
    focus,
    messageMap,
    kept,
    picking,
    scrollRef,
    unread,
    onScroll,
    jumpToLatest,
    messageRefs,
    setFocusedMessage,
    tabStop,
    messageKeyDown,
    flashedId,
    showMessage,
    clickMessage,
    freshIds,
    rootRef,
    previewRef,
    preview,
    openPreview,
    closePreview,
    previewKeyDown,
    tabsRef,
    focusedTab,
    setFocusedTab,
    overflow,
    measureTabs,
    tabsKeyDown,
    needsAnswer,
    inputRef,
    draft,
    setDraft,
    reply,
    setReply,
    mentionPicker,
    setMentionPicker,
    mentionIndex,
    setMentionIndex,
    readMention,
    mentionOptions,
    mentionOpen,
    insertMention,
    sendTo,
    send,
    composerKeyDown,
    toggleMentionPicker,
    speakers,
    startReply,
  };
}
function StreamAvatar({
  id,
  busy,
  prefix,
  agents,
  agentMap,
}: {
  id: StreamId;
  busy?: boolean;
  prefix: string;
  agents: StreamAgent[];
  agentMap: Map<StreamId, StreamAgent>;
}) {
  const agent = agentMap.get(id);
  if (agent?.avatar)
    return (
      <span
        className={`${prefix}__logo`}
        data-busy={busy ? "" : undefined}
        aria-hidden="true"
      >
        {agent.avatar}
      </span>
    );
  const pattern =
      id === currentUserId ? Array.from({ length: 9 }, () => 1) : avatarPattern(id),
    index = agents.findIndex((agent) => agent.id === id);
  return (
    <span
      className={`${prefix}__mark`}
      data-busy={busy ? "" : undefined}
      data-you={id === currentUserId ? "" : undefined}
      style={
        {
          [`--${prefix}-c`]:
            index < 0 ? undefined : agentColors[index % agentColors.length],
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {pattern.map((lit, index) => (
        <i
          key={index}
          data-on={lit ? "" : undefined}
          style={{ animationDelay: `${pixelDelays[index]}ms` }}
        />
      ))}
    </span>
  );
}
function AttachmentIcon({ attachment }: { attachment: StreamAttachment }) {
  const Icon = attachmentIcons[attachmentKind(attachment)];
  return <Icon />;
}
function AttachmentPreview({
  attachment,
  prefix,
}: {
  attachment: StreamAttachment;
  prefix: string;
}) {
  const kind = attachmentKind(attachment);
  if (!attachment.preview)
    return <p className={`${prefix}__window-empty`}>No preview for {attachment.label}</p>;
  if (kind === "table") {
    const [header, ...rows] = attachment.preview
      .trim()
      .split("\n")
      .map((line) => line.split(","));
    return (
      <table className={`${prefix}__sheet`}>
        <thead>
          <tr>
            {header.map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (kind === "folder")
    return (
      <ul className={`${prefix}__tree`}>
        {attachment.preview
          .trim()
          .split("\n")
          .map((line, index) => {
            const Icon = /\/$/.test(line) ? FolderIcon : FileIcon;
            return (
              <li key={index}>
                <Icon />
                {line}
              </li>
            );
          })}
      </ul>
    );
  if (/\.md$/i.test(attachment.label))
    return (
      <div className={`${prefix}__doc`}>
        {attachment.preview
          .trim()
          .split("\n")
          .filter((line, index, lines) => line || !/^#/.test(lines[index - 1] ?? ""))
          .map((line, index) => {
            const heading = /^#{1,3}\s+(.*)$/.exec(line);
            return heading ? (
              <p className={`${prefix}__doc-h`} key={index}>
                {heading[1]}
              </p>
            ) : (
              <p key={index}>{line || "\u00a0"}</p>
            );
          })}
      </div>
    );
  return (
    <pre
      className={`${prefix}__doc`}
      data-code={
        /\.(tsx?|jsx?|json|css|py)$/i.test(attachment.label) || kind === "tool"
          ? ""
          : undefined
      }
    >
      {attachment.preview.trim()}
    </pre>
  );
}
function MessageText({
  text,
  logos,
  prefix,
}: {
  text: string;
  logos?: Record<string, ReactNode>;
  prefix: string;
}) {
  const names = Object.keys(logos ?? {}).sort(
    (left, right) => right.length - left.length,
  );
  if (!names.length || !logos) return <>{text}</>;
  const pattern = RegExp(
    `\\b(${names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
    "g",
  );
  return (
    <>
      {text.split(pattern).map((part, index) =>
        index % 2 ? (
          <span className={`${prefix}__co`} key={index}>
            <span className={`${prefix}__co-logo`} aria-hidden="true">
              {logos[part]}
            </span>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
function MessageRow({
  message,
  index,
  messages,
  agents,
  prefix,
  stream,
  canSend,
  logos,
}: RowProps) {
  const to = recipients(message.to),
    recipientNames = to.includes("all")
      ? "everyone"
      : to.map(stream.agentName).join(", "),
    previous = messages[index - 1];
  const grouped =
    !!previous &&
    previous.kind !== "spawn" &&
    message.kind !== "spawn" &&
    previous.from === message.from &&
    recipients(previous.to).join() === to.join() &&
    !previous.typing;
  const common = {
    ref: (element: HTMLDivElement | null) => {
      if (element) stream.messageRefs.current.set(message.id, element);
      else stream.messageRefs.current.delete(message.id);
    },
    tabIndex: stream.tabStop === message.id ? 0 : -1,
    "data-fresh": stream.freshIds.has(message.id) ? "" : undefined,
    "data-kept": stream.picking && stream.kept(message) ? "" : undefined,
    onFocus: (event: FocusEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) stream.setFocusedMessage(message.id);
    },
    onKeyDown: (event: import("react").KeyboardEvent<HTMLDivElement>) =>
      stream.messageKeyDown(event, index),
    onClick: () => stream.clickMessage(message),
  };
  if (message.kind === "spawn")
    return (
      <div
        {...common}
        className={`${prefix}__system`}
        aria-label={`${stream.agentName(message.from)} started ${recipientNames}: ${message.text}`}
      >
        <span className={`${prefix}__system-text`} dir="auto" title={message.text}>
          {stream.agentName(message.from)} started{" "}
          <span className={`${prefix}__system-name`}>{recipientNames}</span>
        </span>
      </div>
    );
  const quoted =
    message.replyTo && message.replyTo !== previous?.id
      ? stream.messageMap.get(message.replyTo)
      : undefined;
  const avatar = (id: StreamId, busy?: boolean) => (
    <StreamAvatar
      id={id}
      busy={busy}
      prefix={prefix}
      agents={agents}
      agentMap={stream.agentMap}
    />
  );
  return (
    <div
      {...common}
      className={`${prefix}__msg`}
      data-you={message.from === currentUserId ? "" : undefined}
      data-flash={stream.flashedId === message.id ? "" : undefined}
      data-same={grouped ? "" : undefined}
      data-typing={message.typing ? "" : undefined}
      data-selected={stream.selectedId === message.id ? "" : undefined}
      aria-current={stream.selectedId === message.id ? "true" : undefined}
      aria-label={`${stream.agentName(message.from)} to ${recipientNames}${message.at ? `, ${message.at}` : ""}: ${message.typing ? "writing…" : message.text}`}
    >
      <span className={`${prefix}__side`}>
        {!grouped && avatar(message.from, message.typing)}
      </span>
      <div className={`${prefix}__body`}>
        {!grouped && (
          <div className={`${prefix}__head`}>
            <span className={`${prefix}__from`} dir="auto">
              {stream.agentName(message.from)}
            </span>
            {message.kind === "handoff" && (
              <span className={`${prefix}__tag`}>Handoff</span>
            )}
            {stream.needsAnswer(message) && (
              <span className={`${prefix}__needs`}>Needs you</span>
            )}
            {stream.needsAnswer(message) && canSend && (
              <button
                type="button"
                className={`${prefix}__reply`}
                tabIndex={stream.tabStop === message.id ? 0 : -1}
                aria-label={`Reply to ${stream.agentName(message.from)}`}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  stream.startReply(message);
                }}
              >
                Reply
              </button>
            )}
            {message.at && !message.typing && (
              <span className={`${prefix}__at`}>{message.at}</span>
            )}
          </div>
        )}
        {quoted && (
          <button
            type="button"
            className={`${prefix}__quote`}
            tabIndex={-1}
            aria-label={`Replying to ${stream.agentName(quoted.from)}: ${quoted.text} – show it`}
            onClick={(event) => {
              event.stopPropagation();
              stream.showMessage(quoted.id);
            }}
          >
            <span className={`${prefix}__quote-name`} dir="auto">
              {to.includes(quoted.from) && (
                <span className={`${prefix}__quote-to`}>to</span>
              )}
              {avatar(quoted.from)}
              {stream.agentName(quoted.from)}
            </span>
            <span className={`${prefix}__quote-text`} dir="auto">
              {quoted.text}
            </span>
          </button>
        )}
        {!quoted && !grouped && (
          <span className={`${prefix}__quote`} data-only="">
            <span className={`${prefix}__quote-name`} dir="auto">
              <span className={`${prefix}__quote-to`}>to</span>
              {to.includes("all")
                ? "Everyone"
                : to
                    .slice(0, to.length > recipientLimit ? 2 : recipientLimit)
                    .map((id) => (
                      <span className={`${prefix}__quote-who`} key={id}>
                        {avatar(id)}
                        {stream.agentName(id)}
                      </span>
                    ))}
              {!to.includes("all") && to.length > recipientLimit && (
                <span
                  className={`${prefix}__quote-more`}
                  title={to.map(stream.agentName).join(", ")}
                >
                  +{to.length - recipientLimit + 1}
                </span>
              )}
            </span>
          </span>
        )}
        {message.typing ? (
          <span className={`${prefix}__shimmer`} data-text="Writing…">
            Writing…
          </span>
        ) : (
          message.text && (
            <p className={`${prefix}__text`} dir="auto">
              <MessageText text={message.text} logos={logos} prefix={prefix} />
            </p>
          )
        )}
        {!message.typing && message.attachments && message.attachments.length > 0 && (
          <div className={`${prefix}__files`} dir="auto">
            {message.attachments.map((attachment, index) => (
              <button
                type="button"
                className={`${prefix}__file`}
                title={attachment.label}
                aria-label={`Open ${attachment.label}`}
                aria-haspopup="dialog"
                tabIndex={stream.tabStop === message.id ? 0 : -1}
                onKeyDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  stream.openPreview(attachment, message, event.currentTarget);
                }}
                key={index}
              >
                <AttachmentIcon attachment={attachment} />
                <span className={`${prefix}__file-name`} dir="auto">
                  {attachmentKind(attachment) === "link" ||
                  attachmentKind(attachment) === "tool"
                    ? attachment.label
                    : truncateFilename(attachment.label)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      {message.details && (
        <div
          className={`${prefix}__more`}
          data-open={stream.selectedId === message.id ? "" : undefined}
          inert={stream.selectedId !== message.id || undefined}
        >
          <div className={`${prefix}__card`} onClick={(event) => event.stopPropagation()}>
            {message.details.facts && message.details.facts.length > 0 && (
              <dl className={`${prefix}__facts`}>
                {message.details.facts.map((fact, index) => (
                  <div key={index}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {message.details.items && message.details.items.length > 0 && (
              <ul className={`${prefix}__items`}>
                {message.details.items.map((item, index) => (
                  <li className={`${prefix}__item`} key={index}>
                    <span className={`${prefix}__tile`} aria-hidden="true">
                      {item.icon ?? <span className={`${prefix}__tile-dot`} />}
                    </span>
                    <span
                      className={`${prefix}__item-label`}
                      dir="auto"
                      title={item.label}
                    >
                      {item.label}
                    </span>
                    {item.detail && (
                      <span
                        className={`${prefix}__item-detail`}
                        dir="auto"
                        title={item.detail}
                      >
                        {item.detail}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
function StreamComposer({
  prefix,
  stream,
  agents,
  placeholder,
}: {
  prefix: string;
  stream: StreamController;
  agents: StreamAgent[];
  placeholder: string;
}) {
  const avatar = (id: StreamId) => (
    <StreamAvatar id={id} prefix={prefix} agents={agents} agentMap={stream.agentMap} />
  );
  return (
    <div className={`${prefix}__composer`}>
      {stream.mentionOpen && (
        <ul className={`${prefix}__menu`} role="listbox" aria-label="Agents">
          {stream.mentionOptions.map((agent, index) => (
            <li
              role="option"
              aria-selected={index === stream.mentionIndex}
              className={`${prefix}__option`}
              onPointerDown={(event) => {
                event.preventDefault();
                stream.insertMention(agent);
              }}
              onPointerEnter={() => stream.setMentionIndex(index)}
              key={agent.id}
            >
              {avatar(agent.id)}
              <span dir="auto">{agent.name}</span>
              {agent.model && (
                <span className={`${prefix}__option-model`}>{agent.model}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      <div
        className={`${prefix}__write`}
        onClick={() => stream.inputRef.current?.focus()}
      >
        {stream.reply && (
          <div className={`${prefix}__quote ${prefix}__quote--draft`}>
            <span className={`${prefix}__quote-name`} dir="auto">
              <span className={`${prefix}__quote-to`}>to</span>
              {avatar(stream.reply.from)}
              {stream.agentName(stream.reply.from)}
              <button
                type="button"
                className={`${prefix}__unreply`}
                aria-label="Don't reply to this message"
                onClick={() => stream.setReply(null)}
              >
                ×
              </button>
            </span>
            <span className={`${prefix}__quote-text`} dir="auto">
              {stream.reply.text}
            </span>
          </div>
        )}
        <textarea
          ref={stream.inputRef}
          className={`${prefix}__field`}
          rows={1}
          value={stream.draft}
          placeholder={
            stream.reply ? `Answer ${stream.agentName(stream.reply.from)}…` : placeholder
          }
          aria-label="Message the agents"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          onChange={(event) => {
            stream.setDraft(event.target.value);
            stream.setMentionPicker(false);
            stream.readMention(event.target);
          }}
          onBlur={() => stream.setMentionPicker(false)}
          onSelect={(event) => stream.readMention(event.currentTarget)}
          onKeyDown={stream.composerKeyDown}
        />
        <div className={`${prefix}__tools`}>
          <button
            type="button"
            className={`${prefix}__at-btn`}
            aria-label="Name an agent"
            aria-expanded={stream.mentionPicker}
            onPointerDown={(event) => event.preventDefault()}
            onClick={stream.toggleMentionPicker}
          >
            @
          </button>
          <span className={`${prefix}__for`}>
            {stream.sendTo.length ? (
              <>
                to{" "}
                {stream.sendTo
                  .slice(0, stream.sendTo.length > recipientLimit ? 2 : recipientLimit)
                  .map((id) => (
                    <span className={`${prefix}__for-who`} key={id}>
                      {avatar(id)}
                      {stream.agentName(id)}
                    </span>
                  ))}
                {stream.sendTo.length > recipientLimit && (
                  <span
                    className={`${prefix}__for-more`}
                    title={stream.sendTo.map(stream.agentName).join(", ")}
                  >
                    +{stream.sendTo.length - recipientLimit + 1}
                  </span>
                )}
              </>
            ) : (
              "to everyone"
            )}
          </span>
          <button
            type="button"
            className={`${prefix}__send`}
            aria-label="Send"
            disabled={!stream.draft.trim()}
            onClick={stream.send}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 5.5V19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
function CollaborationStreamView({ variant, ...props }: ViewProps) {
  const {
      agents,
      messages,
      task,
      live = false,
      maxHeight = 520,
      logos,
      onSend,
      placeholder = "Message the agents – @ to name one",
      title = "Agent chat",
      className,
    } = props,
    prefix = variant === "clean" ? "ui-crsc" : "ui-crs",
    stream = useCollaborationStream(props, prefix);
  return (
    <div
      ref={stream.rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-picking={stream.picking ? "" : undefined}
    >
      <div className={`${prefix}__top`}>
        <div
          ref={stream.tabsRef}
          className={`${prefix}__tabs`}
          role="toolbar"
          aria-label={
            task ? `${title}: ${task} – show messages of` : `${title} – show messages of`
          }
          data-more={stream.overflow || undefined}
          onScroll={stream.measureTabs}
          onKeyDown={stream.tabsKeyDown}
        >
          <button
            type="button"
            className={`${prefix}__tab`}
            aria-pressed={!stream.focusedAgent}
            tabIndex={stream.focusedTab === null ? 0 : -1}
            onFocus={() => stream.setFocusedTab(null)}
            onClick={() => {
              stream.focus(null);
              stream.selectMessage(null);
            }}
          >
            Everyone
          </button>
          {stream.speakers.map((id) => (
            <button
              type="button"
              className={`${prefix}__tab`}
              aria-pressed={stream.focusedAgent === id}
              tabIndex={stream.focusedTab === id ? 0 : -1}
              onFocus={() => stream.setFocusedTab(id)}
              title={
                stream.agentMap.get(id)?.model
                  ? `${stream.agentName(id)} · ${stream.agentMap.get(id)?.model}`
                  : stream.agentName(id)
              }
              onClick={() => {
                stream.selectMessage(null);
                stream.focus(stream.focusedAgent === id ? null : id);
              }}
              key={id}
            >
              <StreamAvatar
                id={id}
                prefix={prefix}
                agents={agents}
                agentMap={stream.agentMap}
              />
              <span className={`${prefix}__tab-name`} dir="auto">
                {stream.agentName(id)}
              </span>
            </button>
          ))}
        </div>
        {live && (
          <span className={`${prefix}__live`}>
            <span className={`${prefix}__pulse`} aria-hidden="true" />
            Live
          </span>
        )}
      </div>
      <div className={`${prefix}__panel`}>
        <div
          ref={stream.scrollRef}
          className={`${prefix}__scroll`}
          style={onSend ? { height: maxHeight } : { maxHeight }}
          onScroll={stream.onScroll}
        >
          {messages.length === 0 ? (
            <p className={`${prefix}__empty`}>
              {live ? "Waiting for the first message…" : "No messages in this run"}
            </p>
          ) : (
            <div
              className={`${prefix}__stream`}
              role="log"
              aria-label={title}
              aria-live={live ? "polite" : undefined}
            >
              {messages.map((message, index) => (
                <MessageRow
                  key={message.id}
                  message={message}
                  index={index}
                  messages={messages}
                  agents={agents}
                  prefix={prefix}
                  stream={stream}
                  canSend={!!onSend}
                  logos={logos}
                />
              ))}
            </div>
          )}
        </div>
        {stream.unread > 0 && (
          <button
            type="button"
            className={`${prefix}__new`}
            onClick={stream.jumpToLatest}
          >
            {stream.unread} new ↓
          </button>
        )}
      </div>
      {onSend && (
        <StreamComposer
          prefix={prefix}
          stream={stream}
          agents={agents}
          placeholder={placeholder}
        />
      )}
      {stream.preview && (
        <div
          className={`${prefix}__preview`}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) stream.closePreview();
          }}
        >
          <div
            ref={stream.previewRef}
            className={`${prefix}__window`}
            role="dialog"
            aria-modal="true"
            aria-label={stream.preview.attachment.label}
            onKeyDown={stream.previewKeyDown}
          >
            <div className={`${prefix}__window-head`}>
              <span className={`${prefix}__window-icon`}>
                <AttachmentIcon attachment={stream.preview.attachment} />
              </span>
              <span className={`${prefix}__window-title`}>
                <span className={`${prefix}__window-name`} dir="auto">
                  {stream.preview.attachment.label}
                </span>
                <span className={`${prefix}__window-meta`}>
                  <StreamAvatar
                    id={stream.preview.message.from}
                    prefix={prefix}
                    agents={agents}
                    agentMap={stream.agentMap}
                  />
                  {stream.agentName(stream.preview.message.from)}
                  {stream.preview.message.at && <> · {stream.preview.message.at}</>}
                  {stream.preview.attachment.meta && (
                    <> · {stream.preview.attachment.meta}</>
                  )}
                </span>
              </span>
              <button
                type="button"
                className={`${prefix}__preview-close`}
                aria-label="Close preview"
                onClick={stream.closePreview}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className={`${prefix}__window-body`} tabIndex={0}>
              <AttachmentPreview attachment={stream.preview.attachment} prefix={prefix} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const currentUserId = "you",
  recipientLimit = 3;
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const recipients = (value: StreamMessage["to"]): StreamId[] =>
  Array.isArray(value) ? value : [value];
const pixelDelays = [0, 120, 240, 120, 240, 360, 240, 360, 480];
const agentColors = [
  "rgba(0, 96, 226, 0.78)",
  "rgba(91, 91, 214, 0.85)",
  "rgba(0, 123, 172, 0.8)",
  "rgba(201, 110, 20, 0.82)",
  "rgba(28, 140, 84, 0.8)",
  "rgba(190, 70, 130, 0.78)",
];
const attachmentKind = (attachment: StreamAttachment) =>
  attachment.kind ??
  (/\/$/.test(attachment.label)
    ? "folder"
    : /\.(csv|tsv|xlsx?)$/i.test(attachment.label)
      ? "table"
      : "file");
const FolderIcon = () => (
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
);
const FileIcon = () => (
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
);
const TableIcon = () => (
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
);
const LinkIcon = () => (
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
);
const ToolIcon = () => (
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
const attachmentIcons = {
  file: FileIcon,
  folder: FolderIcon,
  link: LinkIcon,
  table: TableIcon,
  tool: ToolIcon,
};
export { CollaborationStream };
export type { StreamAgent };
export type { StreamMessage };
export type { CollaborationStreamProps };
