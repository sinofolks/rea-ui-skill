"use client";

import "./AwaySummary.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useLayoutEffect,
  useRef,
  type FocusEvent,
  type RefObject,
  useEffect,
  useId,
  useState,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type AwayItem = {
  id?: string;
  /** "needs-you" and "failed" receive priority; other values render as "done". */
  kind?: string;
  title?: string;
  detail?: string;
  /** Override the action label, or set false to hide the action. */
  action?: string | false;
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
interface AwaySummaryLabels {
  id?: string;
  name?: string;
  label?: string;
  title?: string;
  since?: (time: string) => string;
  done?: (count: number) => string;
  needsYou?: (count: number) => string;
  failed?: (count: number) => string;
  action?: Partial<Record<"needs-you" | "failed" | "done", string>>;
  showMore?: (count: number) => string;
  showLess?: string;
  gotIt?: string;
  collapsed?: (time: string, count: number) => string;
  empty?: string;
  [field: string]: unknown;
}
interface AwaySummaryProps {
  since?: Date | number | string;
  items: AwayItem[];
  onAction?: (id: string, item: AwayItem) => void | Promise<void>;
  onDismiss?: () => void;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  limit?: number;
  timeStyle?: "duration" | "clock";
  now?: Date | number;
  locale?: string;
  labels?: Partial<AwaySummaryLabels>;
  className?: string;
}
type ItemKind = "needs-you" | "failed" | "done";
interface Item {
  source: AwayItem;
  id: string;
  kind: ItemKind;
  title: string;
  detail: string | undefined;
  action: string | false | undefined;
}
interface SummaryLabels {
  title: string;
  since: (time: string) => string;
  done: (count: number) => string;
  needsYou: (count: number) => string;
  failed: (count: number) => string;
  action: Record<ItemKind, string>;
  showMore: (count: number) => string;
  showLess: string;
  gotIt: string;
  collapsed: (time: string, count: number) => string;
  empty: string;
}
interface FocusedRow {
  element: HTMLElement;
  row: string | null;
}
function AwaySummary(props: AwaySummaryProps) {
  return <AwaySummaryView {...props} clean />;
}
function normalizeItem(source: AwayItem): Item {
  return {
    source,
    id: typeof source.id === "string" ? source.id : String(source.id ?? ""),
    kind: source.kind === "needs-you" || source.kind === "failed" ? source.kind : "done",
    title: typeof source.title === "string" ? source.title : "",
    detail: typeof source.detail === "string" ? source.detail : undefined,
    action:
      typeof source.action === "string" || source.action === false
        ? source.action
        : undefined,
  };
}
function resolveLabels(labels: AwaySummaryLabels | undefined): SummaryLabels {
  return {
    ...DEFAULT_LABELS,
    ...labels,
    action: { ...DEFAULT_LABELS.action, ...labels?.action },
  };
}
function timestamp(value: unknown): number {
  const parsed =
    value instanceof Date
      ? value.getTime()
      : typeof value === "number"
        ? value
        : typeof value === "string"
          ? new Date(value).getTime()
          : NaN;
  return Number.isFinite(parsed) ? parsed : Date.now();
}
function formatAwayDuration(milliseconds: number): string {
  const minutes = Math.max(0, Math.floor(milliseconds / 60000));
  if (minutes < 1) return "a moment";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return minutes % 60 ? `${hours}h ${minutes % 60}m` : `${hours}h`;
  const days = Math.floor(hours / 24);
  return hours % 24 ? `${days}d ${hours % 24}h` : `${days}d`;
}
function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function KindIcon({ kind, prefix }: { kind: ItemKind; prefix: string }) {
  if (kind === "done")
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="6" fill={`var(--${prefix}-done)`} />
        <path
          className={`${prefix}__tick`}
          d="M4.3 7.2 6.1 9 9.7 5.2"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
        />
      </svg>
    );
  if (kind === "failed")
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="6" fill={`var(--${prefix}-failed)`} />
        <path d="M7 4v3.4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7" cy="9.8" r="0.85" fill="#fff" />
      </svg>
    );
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle
        className={`${prefix}__halo`}
        cx="7"
        cy="7"
        r="5.25"
        fill={`var(--${prefix}-needs)`}
      />
      <circle
        cx="7"
        cy="7"
        r="5.25"
        fill="none"
        stroke={`var(--${prefix}-needs)`}
        strokeWidth="1.5"
      />
      <circle cx="7" cy="7" r="2.25" fill={`var(--${prefix}-needs)`} />
    </svg>
  );
}
function ChevronIcon({ up = false }: { up?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={up ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 14L8.5 17.5L19 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
/** Keep keyboard focus useful when a row disappears or the summary collapses. */
function useFocusRecovery(
  rootRef: RefObject<HTMLElement | null>,
  collapsed: boolean,
  prefix: string,
) {
  const focused = useRef<FocusedRow | null>(null);
  const previousRow = useRef<string | null>(null);
  function replacement(previous: FocusedRow): HTMLElement | null {
    const root = rootRef.current;
    if (!root) return null;
    const query = (selector: string) => root.querySelector<HTMLElement>(selector);
    if (collapsed) {
      previousRow.current = previous.element.classList.contains(`${prefix}__act`)
        ? previous.row
        : null;
      return query(`.${prefix}__divider-btn`);
    }
    const actions = [...root.querySelectorAll<HTMLElement>(`.${prefix}__act`)].filter(
      canFocus,
    );
    const rowId = previous.element.classList.contains(`${prefix}__divider-btn`)
      ? previousRow.current
      : previous.row;
    if (rowId !== null) {
      const row = [...root.querySelectorAll<HTMLElement>("[data-row]")].find(
        (element) => element.dataset.row === rowId,
      );
      if (canFocus(row)) {
        const following = actions.find(
          (action) =>
            row.compareDocumentPosition(action) & Node.DOCUMENT_POSITION_FOLLOWING,
        );
        const preceding = actions
          .filter(
            (action) =>
              row.compareDocumentPosition(action) & Node.DOCUMENT_POSITION_PRECEDING,
          )
          .pop();
        if (following || preceding) return following ?? preceding ?? null;
      } else if (canFocus(query(`.${prefix}__more`))) return query(`.${prefix}__more`);
    }
    return actions[0] ?? query(`.${prefix}__done-btn`);
  }
  function recoverFocus() {
    const previous = focused.current;
    const root = rootRef.current;
    if (!previous || !root || canFocus(previous.element)) return;
    const active = document.activeElement;
    if (active && active !== document.body && active !== previous.element) {
      if (!root.contains(active)) focused.current = null;
      return;
    }
    replacement(previous)?.focus({ preventScroll: true });
  }
  useLayoutEffect(() => {
    recoverFocus();
    const frame = requestAnimationFrame(recoverFocus);
    return () => cancelAnimationFrame(frame);
  });
  function handleFocus(event: FocusEvent<HTMLElement>) {
    const element = event.target;
    focused.current = {
      element,
      row: element.closest<HTMLElement>("[data-row]")?.dataset.row ?? null,
    };
  }
  function handleBlur(event: FocusEvent<HTMLElement>) {
    const previous = focused.current;
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
      focused.current = null;
    else if (!event.relatedTarget && previous && canFocus(previous.element))
      requestAnimationFrame(() => {
        if (focused.current === previous && document.activeElement === document.body)
          focused.current = null;
      });
  }
  return { handleFocus, handleBlur };
}
function useSummary(props: AwaySummaryProps, prefix: string) {
  const {
    since,
    items: inputItems,
    onAction,
    onDismiss,
    defaultCollapsed = false,
    collapsed,
    onCollapsedChange,
    limit = 5,
    timeStyle = "duration",
    now,
    locale,
  } = props;
  const labels = resolveLabels(props.labels);
  const items = inputItems.map(normalizeItem);
  const cardId = `${useId()}-card`;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = collapsed ?? internalCollapsed;
  const [settled, setSettled] = useState(true);
  const previousCollapsed = useRef(isCollapsed);
  if (previousCollapsed.current !== isCollapsed) {
    previousCollapsed.current = isCollapsed;
    if (settled) setSettled(false);
  }
  useEffect(() => {
    if (!settled && reducedMotion()) setSettled(true);
  }, [settled]);
  const rootRef = useRef<HTMLElement>(null);
  function setCollapsed(next: boolean) {
    if (collapsed === undefined) setInternalCollapsed(next);
    onCollapsedChange?.(next);
    if (next) onDismiss?.();
  }
  const [clock, setClock] = useState(() => Date.now());
  useEffect(() => {
    if (now !== undefined) return;
    const timer = window.setInterval(() => setClock(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, [now]);
  const currentTime = now === undefined ? clock : timestamp(now);
  const sinceTime = timestamp(since);
  const timeLabel =
    timeStyle === "clock"
      ? labels.since(
          new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            minute: "2-digit",
          }).format(sinceTime),
        )
      : formatAwayDuration(currentTime - sinceTime);
  // A kind change updates the badge without reordering a row under the pointer.
  const sortKeys = useRef(new Map<string, number>());
  const arrivalOrder = useRef(0);
  for (const item of items)
    if (!sortKeys.current.has(item.id))
      sortKeys.current.set(
        item.id,
        KIND_PRIORITY[item.kind] * 1000000 + arrivalOrder.current++,
      );
  const sorted = [...items].sort(
    (first, second) => sortKeys.current.get(first.id)! - sortKeys.current.get(second.id)!,
  );
  const [showAll, setShowAll] = useState(false);
  const visible = sorted.slice(0, limit);
  const extra = sorted.slice(limit);
  const hiddenCount = showAll ? 0 : extra.length;
  const counts: Record<ItemKind, number> = {
    "needs-you": 0,
    failed: 0,
    done: 0,
  };
  for (const item of items) counts[item.kind]++;
  const countLabels: [ItemKind, (count: number) => string][] = [
    ["needs-you", labels.needsYou],
    ["failed", labels.failed],
    ["done", labels.done],
  ];
  const summaries = countLabels.filter(([kind]) => counts[kind] > 0);
  const [pendingIds, setPendingIds] = useState(new Set<string>());
  function act(item: Item) {
    if (pendingIds.has(item.id)) return;
    const result = onAction?.(item.id, item.source);
    if (!result || typeof result.then !== "function") return;
    setPendingIds((previous) => new Set(previous).add(item.id));
    const clearPending = () =>
      setPendingIds((previous) => {
        const next = new Set(previous);
        next.delete(item.id);
        return next;
      });
    result.then(clearPending, clearPending);
  }
  const [announcement, setAnnouncement] = useState("");
  const previousKinds = useRef<Map<string, ItemKind> | null>(null);
  useEffect(() => {
    const previous = previousKinds.current;
    previousKinds.current = new Map(items.map((item) => [item.id, item.kind]));
    if (!previous) return;
    const changed = items.filter(
      (item) => previous.has(item.id) && previous.get(item.id) !== item.kind,
    );
    const added = items.filter((item) => !previous.has(item.id));
    if (!changed.length && !added.length) return;
    const updates = [...changed, ...added]
      .map((item) => `${item.title}: ${KIND_LABELS[item.kind]}`)
      .join(". ");
    setAnnouncement(
      `${updates}. ${counts["needs-you"] ? labels.needsYou(counts["needs-you"]) : "Nothing needs you"}`,
    );
  }, [inputItems]);
  const { handleFocus, handleBlur } = useFocusRecovery(rootRef, isCollapsed, prefix);
  const [animateUpdates, setAnimateUpdates] = useState(false);
  useEffect(() => setAnimateUpdates(!reducedMotion()), []);
  function toggleShowAll() {
    setShowAll(!showAll);
    if (!showAll)
      requestAnimationFrame(() =>
        rootRef.current
          ?.querySelector<HTMLButtonElement>(`.${prefix}__extra .${prefix}__act`)
          ?.focus(),
      );
  }
  return {
    labels,
    items,
    cardId,
    isCollapsed,
    settled,
    setSettled,
    rootRef,
    setCollapsed,
    timeLabel,
    sorted,
    showAll,
    visible,
    extra,
    hiddenCount,
    counts,
    summaries,
    pendingIds,
    act,
    announcement,
    handleFocus,
    handleBlur,
    animateUpdates,
    toggleShowAll,
    limit,
  };
}
function AwaySummaryView(
  props: AwaySummaryProps & {
    clean: boolean;
  },
) {
  const { className, clean } = props;
  const prefix = clean ? "ui-awc" : "ui-aw";
  const {
    labels,
    items,
    cardId,
    isCollapsed,
    settled,
    setSettled,
    rootRef,
    setCollapsed,
    timeLabel,
    sorted,
    showAll,
    visible,
    extra,
    hiddenCount,
    counts,
    summaries,
    pendingIds,
    act,
    announcement,
    handleFocus,
    handleBlur,
    animateUpdates,
    toggleShowAll,
    limit,
  } = useSummary(props, prefix);
  const summaryLabel = summaries.map(([kind, format]) => format(counts[kind])).join(", ");
  function renderItem(item: Item) {
    const action =
      item.action === false ? null : (item.action ?? labels.action[item.kind]);
    const pending = pendingIds.has(item.id);
    return (
      <li
        className={`${prefix}__row`}
        data-kind={item.kind}
        data-row={item.id}
        data-detail={item.detail ? "" : undefined}
        key={item.id}
      >
        <span
          className={`${prefix}__mark`}
          data-pop={animateUpdates ? "" : undefined}
          key={item.kind}
        >
          <KindIcon kind={item.kind} prefix={prefix} />
          <span className={`${prefix}__sr`}>
            {KIND_LABELS[item.kind]}
            {": "}
          </span>
        </span>
        <span className={`${prefix}__text`}>
          <span className={`${prefix}__name`} dir="auto" title={item.title}>
            {item.title}
          </span>
          {item.detail && (
            <span
              className={`${prefix}__detail`}
              dir="auto"
              title={item.detail}
              data-pop={animateUpdates ? "" : undefined}
              key={item.detail}
            >
              {item.detail}
            </span>
          )}
        </span>
        {action && (
          <button
            type="button"
            className={`${prefix}__act`}
            data-kind={item.kind}
            aria-label={`${action}: ${item.title}`}
            title={typeof item.action === "string" ? action : undefined}
            aria-busy={pending || undefined}
            aria-disabled={pending || undefined}
            onClick={() => act(item)}
          >
            <span className={`${prefix}__act-label`}>{action}</span>
            {pending && <span className={`${prefix}__spin`} aria-hidden="true" />}
          </button>
        )}
      </li>
    );
  }
  return (
    <section
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      aria-label={labels.title}
      data-collapsed={isCollapsed ? "" : undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span className={`${prefix}__sr`} role="status" aria-live="polite">
        {announcement}
      </span>
      <div className={`${prefix}__fold`} data-open={isCollapsed ? "" : undefined}>
        <div className={`${prefix}__fold-in`} inert={!isCollapsed}>
          <div className={`${prefix}__divider`}>
            <span className={`${prefix}__rule`} aria-hidden="true" />
            <button
              type="button"
              className={`${prefix}__divider-btn`}
              aria-expanded={false}
              aria-controls={cardId}
              onClick={() => setCollapsed(false)}
            >
              {counts["needs-you"] > 0 && (
                <span
                  className={`${prefix}__dot`}
                  data-kind="needs-you"
                  aria-hidden="true"
                />
              )}
              <span
                className={`${prefix}__divider-text`}
                title={labels.collapsed(timeLabel, items.length)}
              >
                {labels.collapsed(timeLabel, items.length)}
              </span>
              {counts["needs-you"] > 0 && (
                <span className={`${prefix}__sr`}>
                  {", "}
                  {labels.needsYou(counts["needs-you"])}
                </span>
              )}
              <ChevronIcon />
            </button>
            <span className={`${prefix}__rule`} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div
        className={`${prefix}__fold`}
        data-open={isCollapsed ? undefined : ""}
        data-settled={settled && !isCollapsed ? "" : undefined}
        onTransitionEnd={(event) => {
          if (
            event.target === event.currentTarget &&
            event.propertyName === "grid-template-rows"
          )
            setSettled(true);
        }}
      >
        <div className={`${prefix}__fold-in`} inert={isCollapsed}>
          <div
            id={cardId}
            className={`${prefix}__card`}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                setCollapsed(true);
              }
            }}
          >
            <header className={`${prefix}__head`}>
              <h3 className={`${prefix}__title`}>
                {labels.title}
                <span className={`${prefix}__when`}>
                  <span aria-hidden="true">{" · "}</span>
                  <span className={`${prefix}__sr`}>{", "}</span>
                  {timeLabel}
                </span>
              </h3>
              {summaries.length > 0 && (
                <p className={`${prefix}__counts`} role="group" aria-label={summaryLabel}>
                  {summaries.map(([kind, format], index) => (
                    <span className={`${prefix}__count`} aria-hidden="true" key={kind}>
                      {index > 0 && <span className={`${prefix}__sep`}>·</span>}
                      <span className={`${prefix}__dot`} data-kind={kind} />
                      <span className={`${prefix}__n`} key={counts[kind]}>
                        {format(counts[kind])}
                      </span>
                    </span>
                  ))}
                </p>
              )}
            </header>
            {items.length === 0 ? (
              <p className={`${prefix}__empty`}>{labels.empty}</p>
            ) : (
              <div className={`${prefix}__rows`}>
                <ul className={`${prefix}__list`}>{visible.map(renderItem)}</ul>
                {extra.length > 0 && (
                  <div
                    className={`${prefix}__extra`}
                    data-open={showAll ? "" : undefined}
                  >
                    <div className={`${prefix}__extra-in`} inert={!showAll}>
                      <ul className={`${prefix}__list`}>{extra.map(renderItem)}</ul>
                    </div>
                  </div>
                )}
              </div>
            )}
            <footer className={`${prefix}__foot`}>
              {(hiddenCount > 0 || showAll) && sorted.length > limit && (
                <button
                  type="button"
                  className={`${prefix}__more`}
                  aria-expanded={showAll}
                  onClick={toggleShowAll}
                >
                  {showAll ? labels.showLess : labels.showMore(hiddenCount)}
                  <ChevronIcon up={showAll} />
                </button>
              )}
              <button
                type="button"
                className={`${prefix}__done-btn`}
                aria-expanded={true}
                aria-controls={cardId}
                onClick={() => setCollapsed(true)}
              >
                <CheckIcon />
                {labels.gotIt}
              </button>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
const DEFAULT_LABELS: SummaryLabels = {
  title: "While you were away",
  since: (time) => `since ${time}`,
  done: (count) => `${count} done`,
  needsYou: (count) => `${count} need${count === 1 ? "s" : ""} you`,
  failed: (count) => `${count} failed`,
  action: { "needs-you": "Decide", done: "Open", failed: "Retry" },
  showMore: (count) => `Show ${count} more`,
  showLess: "Show less",
  gotIt: "Got it",
  collapsed: (time, count) =>
    `You were away ${time} · ${count} update${count === 1 ? "" : "s"}`,
  empty: "Nothing happened while you were away",
};
const KIND_PRIORITY: Record<ItemKind, number> = {
  "needs-you": 0,
  failed: 1,
  done: 2,
};
const KIND_LABELS: Record<ItemKind, string> = {
  "needs-you": "needs you",
  failed: "failed",
  done: "done",
};
const canFocus = (element: Element | null | undefined): element is HTMLElement =>
  element instanceof HTMLElement && element.isConnected && !element.closest("[inert]");
export { AwaySummary };
export type { AwaySummaryProps };
export type { AwayItem };
export type { AwaySummaryLabels };
