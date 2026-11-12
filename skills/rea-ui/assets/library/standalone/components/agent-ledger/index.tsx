"use client";

import "./AgentLedger.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  Fragment,
  type CSSProperties,
} from "react";
/** One action and the earlier actions it depends on. */
interface LedgerEntry {
  id?: string;
  at?: unknown;
  system?: string;
  icon?: ReactNode;
  action?: string;
  target?: string;
  detail?: string;
  change?: [string, string];
  reversible?: boolean;
  dependsOn?: string[];
  [field: string]: unknown;
}
interface AgentLedgerProps {
  entries: LedgerEntry[];
  agent?: string;
  now?: number;
  undone?: string[];
  defaultUndone?: string[];
  onUndo?: (ids: string[]) => void;
  onRedo?: (ids: string[]) => void;
  pointAt?: string | null;
  title?: string;
  className?: string;
}
interface NormalizedEntry extends LedgerEntry {
  id: string;
  at: number;
  system: string;
  action: string;
}
interface LedgerViewProps extends AgentLedgerProps {
  clean?: boolean;
}
type CascadeStyle = CSSProperties & {
  "--o": number;
};
function AgentLedger(props: AgentLedgerProps) {
  return <LedgerView {...props} clean={false} />;
}
function normalizeEntries(entries: LedgerEntry[]): NormalizedEntry[] {
  return entries.map((entry, index) => ({
    ...entry,
    id: entry.id ?? `entry-${index}`,
    at: typeof entry.at === "number" && Number.isFinite(entry.at) ? entry.at : 0,
    system: entry.system ?? "",
    action: entry.action ?? "",
  }));
}
function formatRelativeTime(elapsedMs: number): string {
  const seconds = Math.max(0, Math.round(elapsedMs / 1000));
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
}
function formatEntryTime(timestamp: number, now: number): string {
  const elapsedMs = now - timestamp;
  if (elapsedMs > -60000 && elapsedMs < 2592000000) return formatRelativeTime(elapsedMs);
  const sameYear = new Date(timestamp).getFullYear() === new Date(now).getFullYear();
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  }).format(timestamp);
}
function systemInitial(system: string): string {
  return (system.match(/[\p{L}\p{N}]/u)?.[0] ?? "·").toUpperCase();
}
function buildDependents(entries: NormalizedEntry[]): Map<string, NormalizedEntry[]> {
  const dependents = new Map<string, NormalizedEntry[]>();
  for (const entry of entries) {
    for (const dependencyId of entry.dependsOn ?? []) {
      dependents.set(dependencyId, [...(dependents.get(dependencyId) ?? []), entry]);
    }
  }
  return dependents;
}
/** Breadth-first traversal preserves the original cascade animation order and stops at cycles. */
function collectDependents(
  entryId: string,
  dependents: Map<string, NormalizedEntry[]>,
): NormalizedEntry[] {
  const result: NormalizedEntry[] = [];
  const visited = new Set([entryId]);
  const queue = [entryId];
  for (let index = 0; index < queue.length; index++) {
    for (const entry of dependents.get(queue[index]!) ?? []) {
      if (visited.has(entry.id)) continue;
      visited.add(entry.id);
      result.push(entry);
      queue.push(entry.id);
    }
  }
  return result;
}
function useLedger({
  entries,
  now,
  undone,
  defaultUndone = [],
  onUndo,
  onRedo,
  pointAt = null,
}: AgentLedgerProps) {
  const titleId = useId();
  const initialIds = useRef<Set<string> | null>(null);
  const normalizedEntries = useMemo(() => normalizeEntries(entries), [entries]);
  if (initialIds.current === null)
    initialIds.current = new Set(normalizedEntries.map((entry) => entry.id));
  const [localUndone, setLocalUndone] = useState(defaultUndone);
  const undoneIds = new Set(undone ?? localUndone);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cascadeOrder, setCascadeOrder] = useState<Record<string, number>>({});
  const previousUndone = useRef(undone ?? []);
  useEffect(() => {
    if (!undone) return;
    const newlyUndone = undone.filter((id) => !previousUndone.current.includes(id));
    previousUndone.current = undone;
    if (newlyUndone.length)
      setCascadeOrder(Object.fromEntries(newlyUndone.map((id, index) => [id, index])));
  }, [undone]);
  const [clock, setClock] = useState(() => Date.now());
  useEffect(() => {
    if (now !== undefined) return;
    const timer = window.setInterval(() => setClock(Date.now()), 15000);
    return () => window.clearInterval(timer);
  }, [now]);
  const currentTime = now ?? clock;
  const sortedEntries = [...normalizedEntries].sort(
    (first, second) => second.at - first.at,
  );
  const dependents = useMemo(
    () => buildDependents(normalizedEntries),
    [normalizedEntries],
  );
  const activeDependents = (id: string) =>
    collectDependents(id, dependents).filter((entry) => !undoneIds.has(entry.id));
  const previewId = hoveredId ?? pointAt;
  const previewEntries = previewId ? activeDependents(previewId) : [];
  const previewKinds = new Map(
    previewEntries.map((entry) => [
      entry.id,
      entry.reversible === false ? "kept" : "also",
    ]),
  );
  function undoEntry(entry: NormalizedEntry) {
    const ids = [
      entry.id,
      ...activeDependents(entry.id)
        .filter((dependent) => dependent.reversible !== false)
        .map((dependent) => dependent.id),
    ];
    setCascadeOrder(Object.fromEntries(ids.map((id, index) => [id, index])));
    setLocalUndone((previous) => [
      ...previous,
      ...ids.filter((id) => !previous.includes(id)),
    ]);
    setHoveredId(null);
    onUndo?.(ids);
  }
  function redoEntry(entry: NormalizedEntry) {
    const ids = [
      entry.id,
      ...collectDependents(entry.id, dependents)
        .filter((dependent) => undoneIds.has(dependent.id))
        .map((dependent) => dependent.id),
    ];
    setCascadeOrder({});
    setLocalUndone((previous) => previous.filter((id) => !ids.includes(id)));
    onRedo?.(ids);
  }
  return {
    titleId,
    initialIds,
    undoneIds,
    setHoveredId,
    cascadeOrder,
    currentTime,
    sortedEntries,
    activeDependents,
    previewId,
    previewKinds,
    undoEntry,
    redoEntry,
    entryCount: entries.length,
    undoneCount: normalizedEntries.filter((entry) => undoneIds.has(entry.id)).length,
  };
}
function LedgerView({
  clean = false,
  title = "Ledger",
  agent,
  className,
  ...props
}: LedgerViewProps) {
  const {
    titleId,
    initialIds,
    undoneIds,
    setHoveredId,
    cascadeOrder,
    currentTime,
    sortedEntries,
    activeDependents,
    previewId,
    previewKinds,
    undoEntry,
    redoEntry,
    entryCount,
    undoneCount,
  } = useLedger(props);
  const prefix = clean ? "ui-ldgc" : "ui-ldg";
  return (
    <div className={[prefix, className].filter(Boolean).join(" ")}>
      <header className={`${prefix}__bar`}>
        <span className={`${prefix}__mark`}>
          <LedgerIcon />
        </span>
        <span className={`${prefix}__title`} id={titleId}>
          {title}
        </span>
        {agent && <span className={`${prefix}__agent`}>{agent}</span>}
        <span className={`${prefix}__sum`}>
          <span>
            <b>{entryCount.toLocaleString("en-US")}</b>{" "}
            {entryCount === 1 ? "change" : "changes"}
          </span>
          {undoneCount > 0 && (
            <span className={`${prefix}__sum-undone`}>
              <b>{undoneCount.toLocaleString("en-US")}</b>
              {" undone"}
            </span>
          )}
        </span>
      </header>
      <ol className={`${prefix}__panel`} aria-labelledby={titleId}>
        {sortedEntries.map((entry) => {
          const isUndone = undoneIds.has(entry.id);
          const previewKind = previewKinds.get(entry.id);
          const irreversible = entry.reversible === false;
          const affectedCount =
            isUndone || irreversible ? 0 : activeDependents(entry.id).length;
          const change =
            entry.change && (entry.change[0].trim() || entry.change[1].trim())
              ? entry.change
              : undefined;
          const rowStyle: CascadeStyle = { "--o": cascadeOrder[entry.id] ?? 0 };
          const clearPreview = () =>
            setHoveredId((current) => (current === entry.id ? null : current));
          return (
            <li
              className={`${prefix}__row`}
              data-undone={isUndone ? "" : undefined}
              data-initial={initialIds.current?.has(entry.id) ? "" : undefined}
              data-preview={previewId === entry.id ? "" : undefined}
              data-chain={previewKind}
              style={rowStyle}
              key={entry.id}
            >
              <span className={`${prefix}__icon`} aria-hidden="true">
                {entry.icon ?? systemInitial(entry.system)}
              </span>
              <div className={`${prefix}__main`}>
                <span
                  className={`${prefix}__what`}
                  title={entry.target ? `${entry.action} ${entry.target}` : entry.action}
                >
                  <span className={`${prefix}__action`} dir="auto">
                    {entry.action}
                  </span>
                  {entry.target && (
                    <span className={`${prefix}__target`} dir="auto">
                      {entry.target}
                    </span>
                  )}
                  <span className={`${prefix}__strike`} aria-hidden="true" />
                </span>
                <span
                  className={`${prefix}__change`}
                  title={change ? `${change[0]} → ${change[1]}` : entry.detail}
                >
                  {change ? (
                    <Fragment>
                      <span className={`${prefix}__before`} dir="auto">
                        {change[0]}
                      </span>
                      <span className={`${prefix}__arrow`} aria-label="to">
                        →
                      </span>
                      <span className={`${prefix}__after`} dir="auto">
                        {change[1]}
                      </span>
                    </Fragment>
                  ) : (
                    <span className={`${prefix}__detail`} dir="auto">
                      {entry.detail}
                    </span>
                  )}
                </span>
              </div>
              <div className={`${prefix}__end`}>
                {previewKind ? (
                  <span className={`${prefix}__flag`} data-kind={previewKind}>
                    {previewKind === "also" ? (
                      "Also undone"
                    ) : (
                      <Fragment>
                        <LockIcon />
                        {"Can't undo"}
                      </Fragment>
                    )}
                  </span>
                ) : (
                  <Fragment>
                    <span
                      className={`${prefix}__time`}
                      data-hide={isUndone || !irreversible ? "" : undefined}
                    >
                      {isUndone ? (
                        "Undone"
                      ) : (
                        <Fragment>
                          {formatEntryTime(entry.at, currentTime)}
                          <span className={`${prefix}__sys`}>
                            {" · "}
                            {entry.system}
                          </span>
                        </Fragment>
                      )}
                    </span>
                    {isUndone ? (
                      <button
                        type="button"
                        className={`${prefix}__act`}
                        onClick={() => redoEntry(entry)}
                        aria-label={`Redo: ${entry.action}${entry.target ? ` ${entry.target}` : ""}`}
                      >
                        <RedoIcon />
                        <span className={`${prefix}__act-label`}>Redo</span>
                      </button>
                    ) : irreversible ? null : (
                      <button
                        type="button"
                        className={`${prefix}__act`}
                        onMouseEnter={() => setHoveredId(entry.id)}
                        onMouseLeave={clearPreview}
                        onFocus={() => setHoveredId(entry.id)}
                        onBlur={clearPreview}
                        onClick={() => undoEntry(entry)}
                        aria-label={`Undo: ${entry.action}${entry.target ? ` ${entry.target}` : ""}${affectedCount ? ` – and ${affectedCount} that build on it` : ""}`}
                      >
                        <UndoIcon />
                        <span className={`${prefix}__act-label`}>Undo</span>
                      </button>
                    )}
                  </Fragment>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
const LedgerIcon = () => (
  <svg
    width={`16`}
    height={`16`}
    viewBox={`0 0 16 16`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <rect
      x={`2`}
      y={`1.8`}
      width={`12`}
      height={`12.4`}
      rx={`2.6`}
      stroke={`currentColor`}
      strokeWidth={`1.3`}
    />
    <path
      d={`M5 5.4h6M5 8h6M5 10.6h3.6`}
      stroke={`currentColor`}
      strokeWidth={`1.3`}
      strokeLinecap={`round`}
    />
  </svg>
);
const UndoIcon = () => (
  <svg
    width={`13`}
    height={`13`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path
      d={`M4 7H15C18.3137 7 21 9.68629 21 13C21 16.3137 18.3137 19 15 19H8`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
    <path
      d={`M8 3L4 7L8 11`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
  </svg>
);
const RedoIcon = () => (
  <svg
    width={`13`}
    height={`13`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path
      d={`M20 7H9C5.68629 7 3 9.68629 3 13C3 16.3137 5.68629 19 9 19H16`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
    <path
      d={`M16 3L20 7L16 11`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
  </svg>
);
const LockIcon = () => (
  <svg
    width={`12`}
    height={`12`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path
      d={`M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
    />
    <path
      d={`M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9`}
      stroke={`currentColor`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      strokeWidth={`1.8`}
    />
  </svg>
);
export { AgentLedger };
export type { LedgerEntry };
export type { AgentLedgerProps };
