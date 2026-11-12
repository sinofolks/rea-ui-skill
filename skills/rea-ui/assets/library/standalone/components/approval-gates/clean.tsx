"use client";

import "./ApprovalGates.clean.css";
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
} from "react";
type GateDecision = "approved" | "edited" | "rejected";
type GateKind = "tool" | "file" | "agent" | "message";
interface ApprovalGate {
  id?: string;
  kind?: GateKind;
  status?: "open" | GateDecision;
  agent?: string;
  avatar?: ReactNode;
  action?: string;
  reason?: string;
  input?: string;
  note?: string;
  at?: string;
  context?: string[];
  files?: string[];
  holds?: string[];
  diff?: Array<{
    file: string;
    lines: Array<{
      type: "add" | "del" | "ctx";
      text: string;
    }>;
  }>;
  [field: string]: unknown;
}
interface ApprovalGatesProps {
  gates: ApprovalGate[];
  task?: string;
  live?: boolean;
  onDecide?: (id: string, decision: GateDecision, value?: string) => void;
  title?: string;
  className?: string;
}
interface LocalDecision {
  status: GateDecision;
  note?: string;
  order: number;
}
interface LeavingGate {
  gate: ApprovalGate;
  decision: GateDecision | undefined;
}
type ApprovalGateController = ReturnType<typeof useApprovalGates>;
type GateStyle = CSSProperties & {
  [key: `--ui-${string}`]: string | number;
};
function ApprovalGates(props: ApprovalGatesProps) {
  return <ApprovalGatesView {...props} clean={true} />;
}
function GatePreview({
  gate,
  full,
  prefix,
}: {
  gate: ApprovalGate;
  full: boolean;
  prefix: string;
}) {
  if (gate.diff)
    return (
      <div
        className={`${prefix}__diff`}
        data-full={full ? "" : undefined}
        tabIndex={0}
        aria-label="Changes"
      >
        {gate.diff.map((file) => (
          <div className={`${prefix}__file`} key={file.file}>
            <span className={`${prefix}__file-name`} dir="auto" title={file.file}>
              {file.file}
            </span>
            <pre>
              {file.lines.map((line, index) => (
                <span className={`${prefix}__dl`} data-type={line.type} key={index}>
                  <span aria-hidden="true">
                    {line.type === "add" ? "+" : line.type === "del" ? "−" : " "}
                  </span>
                  {line.type !== "ctx" && (
                    <span className={`${prefix}__sr`}>
                      {line.type === "add" ? "Added: " : "Removed: "}
                    </span>
                  )}
                  {line.text}
                  {"\n"}
                </span>
              ))}
            </pre>
          </div>
        ))}
      </div>
    );
  return gate.input ? (
    <pre
      className={`${prefix}__data`}
      data-full={full ? "" : undefined}
      data-mono={gate.kind === "tool" ? "" : undefined}
      dir="auto"
      tabIndex={0}
    >
      {gate.input}
    </pre>
  ) : null;
}
function GateContext({ gate, prefix }: { gate: ApprovalGate; prefix: string }) {
  return (
    <>
      {gate.context && gate.context.length > 0 && (
        <div className={`${prefix}__section`}>
          <span className={`${prefix}__label`}>Before this</span>
          <ol
            className={`${prefix}__context`}
            tabIndex={0}
            aria-label="Steps before this"
          >
            {gate.context.map((step, index) => (
              <li dir="auto" children={step} key={index} />
            ))}
          </ol>
        </div>
      )}
      {gate.files && gate.files.length > 0 && (
        <div className={`${prefix}__section`}>
          <span className={`${prefix}__label`}>Touches</span>
          <ul className={`${prefix}__files`}>
            {gate.files.map((file) => (
              <li dir="auto" title={file} children={file} key={file} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
function GatesIcon() {
  return (
    <svg
      width={`16`}
      height={`16`}
      viewBox={`0 0 16 16`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <rect
        x={`3.4`}
        y={`1.6`}
        width={`9.2`}
        height={`3`}
        rx={`1.2`}
        fill={`currentColor`}
        opacity={`0.3`}
      />
      <rect
        x={`2.2`}
        y={`3.6`}
        width={`11.6`}
        height={`3.4`}
        rx={`1.3`}
        fill={`currentColor`}
        opacity={`0.55`}
      />
      <rect
        x={`1`}
        y={`6.2`}
        width={`14`}
        height={`8.2`}
        rx={`2`}
        fill={`currentColor`}
      />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg
      width={`11`}
      height={`11`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M4.27 18.84C4.49 20.52 5.88 21.82 7.56 21.9C8.98 21.97 10.42 22 12 22C13.58 22 15.02 21.97 16.44 21.9C18.12 21.82 19.51 20.52 19.73 18.84C19.88 17.75 20 16.64 20 15.5C20 14.36 19.88 13.25 19.73 12.16C19.51 10.49 18.12 9.18 16.44 9.1C15.02 9.03 13.58 9 12 9C10.42 9 8.98 9.03 7.56 9.1C5.88 9.18 4.49 10.49 4.27 12.16C4.12 13.25 4 14.36 4 15.5C4 16.64 4.12 17.75 4.27 18.84Z`}
        stroke={`currentColor`}
        strokeWidth={`2`}
      />
      <path
        d={`M7.5 9V6.5C7.5 4.01 9.51 2 12 2C14.49 2 16.5 4.01 16.5 6.5V9`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`2`}
      />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      width={`10`}
      height={`10`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.06 8.83 19 7`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`3`}
      />
    </svg>
  );
}
function RejectIcon() {
  return (
    <svg
      width={`10`}
      height={`10`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M18 6L6 18M6 6L18 18`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`3`}
      />
    </svg>
  );
}
function ChevronIcon({ direction = "down" }: { direction?: "down" | "left" | "right" }) {
  return (
    <svg
      width={`12`}
      height={`12`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
      style={
        direction === `down`
          ? void 0
          : {
              transform: `rotate(${direction === `left` ? 90 : -90}deg)`,
            }
      }
    >
      <path
        d={`M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`}
        stroke={`currentColor`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
        strokeWidth={`1.8`}
      />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg
      width={`14`}
      height={`14`}
      viewBox={`0 0 24 24`}
      fill={`none`}
      aria-hidden={`true`}
    >
      <path
        d={`M14.07 3.89C14.82 3.08 15.19 2.67 15.59 2.44C16.54 1.87 17.72 1.85 18.69 2.39C19.09 2.62 19.48 3.01 20.25 3.79C21.01 4.58 21.4 4.97 21.62 5.38C22.14 6.37 22.13 7.57 21.57 8.55C21.34 8.96 20.94 9.34 20.15 10.1L10.75 19.15C9.25 20.6 8.5 21.32 7.57 21.68C6.63 22.05 5.6 22.02 3.55 21.97L3.27 21.96C2.64 21.94 2.33 21.94 2.14 21.73C1.96 21.52 1.99 21.2 2.04 20.57L2.06 20.22C2.2 18.42 2.27 17.53 2.62 16.72C2.97 15.91 3.58 15.26 4.79 13.94L14.07 3.89Z`}
        stroke={`currentColor`}
        strokeWidth={`1.8`}
        strokeLinejoin={`round`}
      />
      <path
        d={`M13 4L20 11`}
        stroke={`currentColor`}
        strokeWidth={`1.8`}
        strokeLinejoin={`round`}
      />
    </svg>
  );
}
function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
  return `${count.toLocaleString("en-US")} ${count === 1 ? singular : pluralForm}`;
}
function agentInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .map((part) => Array.from(part.replace(/^[^\p{L}\p{N}]+/u, ""))[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}
function resolveGates(gates: ApprovalGate[], decisions: Record<string, LocalDecision>) {
  const resolved = gates.map((gate) => {
    const decision = decisions[String(gate.id)];
    return decision && gate.status === "open"
      ? {
          ...gate,
          status: decision.status,
          note: decision.note ?? gate.note,
          at: "just now",
        }
      : gate;
  });
  const pending = resolved.filter((gate) => gate.status === "open");
  const history = resolved
    .filter((gate) => gate.status !== "open")
    .map((gate, index) => ({
      gate,
      rank: decisions[String(gate.id)] ? 10000 + decisions[String(gate.id)].order : index,
    }))
    .sort((first, second) => second.rank - first.rank)
    .map((entry) => entry.gate);
  return { resolved, pending, history };
}
function runSummary(
  resolved: ApprovalGate[],
  pending: ApprovalGate[],
  history: ApprovalGate[],
  live: boolean,
) {
  const rejected = history.find((gate) => gate.status === "rejected");
  const state: keyof typeof runLabels = rejected
    ? "stopped"
    : pending.length
      ? "waiting"
      : live
        ? "running"
        : "done";
  const heldSteps = pending.flatMap((gate) => gate.holds ?? []);
  const description = rejected
    ? `Stopped at “${rejected.action}”`
    : pending.length
      ? `Paused – ${heldSteps.length ? `${plural(heldSteps.length, "step")} ${heldSteps.length === 1 ? "waits" : "wait"}` : "the run waits"} on ${plural(pending.length, "gate")}`
      : live
        ? "Running – nothing waits"
        : resolved.length
          ? "Every gate is through"
          : "No approvals in this run";
  return { rejected, state, description };
}
function useApprovalGates({ gates, live = false, onDecide }: ApprovalGatesProps) {
  const [decisions, setDecisions] = useState<Record<string, LocalDecision>>({});
  const { resolved, pending, history } = resolveGates(gates, decisions);
  const [selectedId, setSelectedId] = useState<string | null | undefined>(null);
  const activeGate = pending.find((gate) => gate.id === selectedId) ?? pending[0];
  const activeIndex = activeGate ? pending.indexOf(activeGate) : -1;
  const stack = activeGate
    ? [...pending.slice(activeIndex), ...pending.slice(0, activeIndex)]
    : [];
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [fullContext, setFullContext] = useState(false);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null | undefined>(
    null,
  );
  const [announcement, setAnnouncement] = useState("");
  const cardRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const previousActiveId = useRef(activeGate?.id);
  if (previousActiveId.current !== activeGate?.id) {
    previousActiveId.current = activeGate?.id;
    if (editing) setEditing(false);
    if (fullContext) setFullContext(false);
  }
  const [leaving, setLeaving] = useState<LeavingGate | null>(null);
  useEffect(() => {
    if (!leaving) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setLeaving(null), reduced ? 0 : 360);
    return () => window.clearTimeout(timer);
  }, [leaving]);
  const previousGate = useRef<ApprovalGate | undefined>(undefined);
  useLayoutEffect(() => {
    const previous = previousGate.current;
    previousGate.current = activeGate;
    if (!previous || previous.id === activeGate?.id || decisions[String(previous.id)])
      return;
    const updated = resolved.find((gate) => gate.id === previous.id);
    if (updated && updated.status !== "open")
      setLeaving({ gate: previous, decision: updated.status });
  });
  const [frontHeight, setFrontHeight] = useState(0);
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new ResizeObserver(() => setFrontHeight(card.offsetHeight));
    observer.observe(card);
    setFrontHeight(card.offsetHeight);
    return () => observer.disconnect();
  }, [activeGate?.id]);
  const [minimumHeight, setMinimumHeight] = useState(0);
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (card) setMinimumHeight((previous) => Math.max(previous, card.offsetHeight));
  }, [activeGate?.id]);
  function decide(gate: ApprovalGate, decision: GateDecision, value?: string) {
    const note =
      decision === "edited"
        ? gate.kind === "file"
          ? `Asked for: ${value}`
          : `Changed to: ${value}`
        : undefined;
    setDecisions((previous) => ({
      ...previous,
      [String(gate.id)]: {
        status: decision,
        note,
        order: Object.keys(previous).length,
      },
    }));
    setLeaving({ gate, decision });
    setEditing(false);
    setSelectedId(null);
    onDecide?.(gate.id!, decision, value);
    const remaining = pending.length - 1;
    setAnnouncement(
      `${decisionLabels[decision]}: ${gate.action}. ${remaining ? `${plural(remaining, "request")} left` : "Nothing waits any more"}`,
    );
    requestAnimationFrame(() =>
      (
        stackRef.current?.querySelector<HTMLElement>("[data-approve]") ?? stackRef.current
      )?.focus({ preventScroll: true }),
    );
  }
  function cancelEdit() {
    setEditing(false);
    requestAnimationFrame(() =>
      stackRef.current
        ?.querySelector<HTMLElement>("[data-edit]")
        ?.focus({ preventScroll: true }),
    );
  }
  function changePage(direction: number) {
    if (pending.length < 2) return;
    const hasFocus = Boolean(stackRef.current?.contains(document.activeElement));
    setSelectedId(
      pending[(activeIndex + direction + pending.length) % pending.length].id,
    );
    if (hasFocus)
      requestAnimationFrame(() =>
        stackRef.current
          ?.querySelector<HTMLElement>("[data-approve]")
          ?.focus({ preventScroll: true }),
      );
  }
  function onStackKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target instanceof Element && event.target.closest("textarea")) return;
    if (event.key === "ArrowRight") changePage(1);
    else if (event.key === "ArrowLeft") changePage(-1);
    else return;
    event.preventDefault();
  }
  const { rejected, state, description } = runSummary(resolved, pending, history, live);
  const seenIds = useRef(new Set<string | undefined>());
  const mounted = useRef(false);
  const freshIds = new Set(
    mounted.current
      ? pending.filter((gate) => !seenIds.current.has(gate.id)).map((gate) => gate.id)
      : [],
  );
  useLayoutEffect(() => {
    mounted.current = true;
    for (const gate of resolved) seenIds.current.add(gate.id);
  });
  return {
    decisions,
    resolved,
    pending,
    history,
    activeGate,
    activeIndex,
    stack,
    editing,
    setEditing,
    draft,
    setDraft,
    fullContext,
    setFullContext,
    expandedHistoryId,
    setExpandedHistoryId,
    announcement,
    cardRef,
    stackRef,
    leaving,
    frontHeight,
    minimumHeight,
    decide,
    cancelEdit,
    changePage,
    onStackKeyDown,
    rejected,
    state,
    description,
    freshIds,
    setSelectedId,
  };
}
function ActiveGateCard({
  controller,
  prefix,
}: {
  controller: ApprovalGateController;
  prefix: string;
}) {
  const {
    activeGate: gate,
    cardRef,
    freshIds,
    editing,
    setEditing,
    draft,
    setDraft,
    fullContext,
    setFullContext,
    cancelEdit,
    decide,
  } = controller;
  if (!gate) return null;
  return (
    <section
      ref={cardRef}
      className={`${prefix}__card`}
      data-fresh={freshIds.has(gate.id) ? "" : undefined}
      aria-label={`${gate.action} – waiting for you`}
    >
      <div className={`${prefix}__card-top`}>
        <span className={`${prefix}__avatar`} data-logo={gate.avatar ? "" : undefined}>
          {gate.avatar ?? agentInitials(gate.agent ?? "")}
        </span>
        <span className={`${prefix}__card-who`} dir="auto">
          <span className={`${prefix}__card-agent`}>{gate.agent}</span>
          {" · "}
          {kindLabels[gate.kind ?? ""]}
          {gate.at ? ` · ${gate.at}` : ""}
        </span>
        <span className={`${prefix}__badge`} data-status="open">
          <LockIcon />
          Blocking
        </span>
      </div>
      <div className={`${prefix}__card-body`}>
        <h3 className={`${prefix}__card-action`} dir="auto">
          {gate.action}
        </h3>
        <p className={`${prefix}__card-why`} dir="auto">
          {gate.reason}
        </p>
        {(gate.input || gate.diff || editing) && (
          <div className={`${prefix}__section`}>
            <span className={`${prefix}__label`}>
              {editing && gate.kind === "file"
                ? "What should change?"
                : contentLabels[gate.kind ?? ""]}
            </span>
            {editing ? (
              <textarea
                className={`${prefix}__edit`}
                data-mono={gate.kind === "tool" ? "" : undefined}
                value={draft}
                rows={
                  gate.kind === "file"
                    ? 3
                    : Math.min(9, Math.max(3, draft.split("\n").length + 1))
                }
                spellCheck={gate.kind !== "tool"}
                placeholder={
                  gate.kind === "file"
                    ? "e.g. Keep the old price for existing customers"
                    : undefined
                }
                aria-label={
                  gate.kind === "file"
                    ? "What should change"
                    : `Edit ${contentLabels[gate.kind ?? ""]?.toLowerCase()}`
                }
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.stopPropagation();
                    cancelEdit();
                  }
                  if (
                    event.key === "Enter" &&
                    (event.metaKey || event.ctrlKey) &&
                    draft.trim()
                  ) {
                    event.preventDefault();
                    decide(gate, "edited", draft);
                  }
                }}
                autoFocus
              />
            ) : (
              <GatePreview gate={gate} full={fullContext} prefix={prefix} />
            )}
          </div>
        )}
        {(gate.context?.length || gate.files?.length) && (
          <div className={`${prefix}__extra`}>
            <button
              type="button"
              className={`${prefix}__more`}
              aria-expanded={fullContext}
              onClick={() => setFullContext((previous) => !previous)}
            >
              {fullContext ? "Less context" : "Full context"}
              <span
                className={`${prefix}__more-chev`}
                data-open={fullContext ? "" : undefined}
              >
                <ChevronIcon />
              </span>
            </button>
            <div
              className={`${prefix}__fold`}
              data-open={fullContext ? "" : undefined}
              inert={!fullContext || undefined}
            >
              <div className={`${prefix}__fold-in`}>
                <GateContext gate={gate} prefix={prefix} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${prefix}__actions`}>
        {editing ? (
          <>
            <button
              type="button"
              className={`${prefix}__btn`}
              data-quiet=""
              onClick={cancelEdit}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${prefix}__btn`}
              data-primary=""
              disabled={!draft.trim()}
              onClick={() => decide(gate, "edited", draft)}
            >
              Approve with changes
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`${prefix}__btn`}
              data-quiet=""
              data-edit=""
              onClick={() => {
                setDraft(gate.kind === "file" ? "" : (gate.input ?? ""));
                setEditing(true);
              }}
            >
              <EditIcon />
              {gate.kind === "file" ? "Ask for changes" : "Edit"}
            </button>
            <span className={`${prefix}__spacer`} />
            <button
              type="button"
              className={`${prefix}__btn`}
              onClick={() => decide(gate, "rejected")}
            >
              Reject
            </button>
            <button
              type="button"
              className={`${prefix}__btn`}
              data-primary=""
              data-approve=""
              onClick={() => decide(gate, "approved")}
            >
              Approve
            </button>
          </>
        )}
      </div>
    </section>
  );
}
function GateHistory({
  controller,
  prefix,
}: {
  controller: ApprovalGateController;
  prefix: string;
}) {
  const { history, decisions, expandedHistoryId, setExpandedHistoryId } = controller;
  return (
    <div className={`${prefix}__done`}>
      <span className={`${prefix}__label`}>Decided</span>
      <ol className={`${prefix}__rows`}>
        {history.map((gate) => {
          const open = expandedHistoryId === gate.id;
          return (
            <li
              className={`${prefix}__row`}
              data-status={gate.status}
              data-fresh={decisions[String(gate.id)] ? "" : undefined}
              data-open={open ? "" : undefined}
              key={gate.id}
            >
              <button
                type="button"
                className={`${prefix}__row-head`}
                aria-expanded={open}
                onClick={() => setExpandedHistoryId(open ? null : gate.id)}
              >
                <span
                  className={`${prefix}__row-mark`}
                  data-status={gate.status}
                  aria-hidden="true"
                >
                  {gate.status === "rejected" ? <RejectIcon /> : <CheckIcon />}
                </span>
                <span className={`${prefix}__row-action`} dir="auto" title={gate.action}>
                  {gate.action}
                </span>
                <span className={`${prefix}__row-who`} dir="auto">
                  {gate.agent}
                </span>
                <span className={`${prefix}__row-outcome`} data-status={gate.status}>
                  {gate.status === "rejected" ? (
                    <span className={`${prefix}__row-tag`}>Stopped the run</span>
                  ) : (
                    decisionLabels[gate.status ?? ""]
                  )}
                  {gate.at && (
                    <span className={`${prefix}__row-at`}>
                      {" · "}
                      {gate.at}
                    </span>
                  )}
                </span>
                <span className={`${prefix}__row-chev`} data-open={open ? "" : undefined}>
                  <ChevronIcon />
                </span>
              </button>
              <div
                className={`${prefix}__fold`}
                data-open={open ? "" : undefined}
                inert={!open || undefined}
              >
                <div className={`${prefix}__fold-in ${prefix}__row-body`}>
                  <p className={`${prefix}__card-why`} dir="auto">
                    {gate.reason}
                  </p>
                  {gate.note && (
                    <p className={`${prefix}__note`} data-status={gate.status} dir="auto">
                      {gate.note}
                    </p>
                  )}
                  {(gate.input || gate.diff) && (
                    <div className={`${prefix}__section`}>
                      <span className={`${prefix}__label`}>
                        {contentLabels[gate.kind ?? ""]}
                      </span>
                      <GatePreview gate={gate} full={false} prefix={prefix} />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
function ApprovalGatesView({
  clean = false,
  ...props
}: ApprovalGatesProps & {
  clean?: boolean;
}) {
  const { task, live = false, title = "Approvals", className } = props;
  const prefix = clean ? "ui-gatec" : "ui-gate";
  const controller = useApprovalGates(props);
  const {
    resolved,
    pending,
    history,
    activeGate,
    activeIndex,
    stack,
    announcement,
    stackRef,
    leaving,
    frontHeight,
    minimumHeight,
    changePage,
    onStackKeyDown,
    rejected,
    state,
    description,
    freshIds,
    setSelectedId,
  } = controller;
  const stackStyle: GateStyle = {
    [`--${prefix}-front-h`]: `${frontHeight}px`,
    [`--${prefix}-floor`]: `${minimumHeight}px`,
  };
  return (
    <div className={[prefix, className].filter(Boolean).join(" ")} data-state={state}>
      <div className={`${prefix}__summary`}>
        <header className={`${prefix}__bar`}>
          <span className={`${prefix}__mark`}>
            <GatesIcon />
          </span>
          <span className={`${prefix}__title`}>{title}</span>
          {task && (
            <span className={`${prefix}__task`} dir="auto" title={task}>
              {task}
            </span>
          )}
          <span className={`${prefix}__pill`} data-state={state}>
            {(state === "waiting" || state === "running") && (
              <span className={`${prefix}__pulse`} aria-hidden="true" />
            )}
            {runLabels[state]}
          </span>
        </header>
        <dl className={`${prefix}__stats`}>
          <div className={`${prefix}__stat`}>
            <dt>Waiting on you</dt>
            <dd>{pending.length.toLocaleString("en-US")}</dd>
          </div>
          <div className={`${prefix}__stat`}>
            <dt>Decided</dt>
            <dd>
              {history.length}
              {"/"}
              {resolved.length}
            </dd>
          </div>
          <div className={`${prefix}__stat`} data-wide="">
            <dt>Run</dt>
            <dd>
              <span className={`${prefix}__run`} dir="auto" title={description}>
                {description}
              </span>
            </dd>
          </div>
        </dl>
      </div>
      <div className={`${prefix}__body`}>
        <div
          ref={stackRef}
          className={`${prefix}__stack`}
          tabIndex={-1}
          role="group"
          aria-roledescription="stack"
          aria-label={
            pending.length
              ? `${plural(pending.length, "request")} waiting – ${activeGate ? `${activeIndex + 1} of ${pending.length}` : ""}`
              : "Nothing waits"
          }
          data-count={Math.min(stack.length, 3)}
          style={stackStyle}
          onKeyDown={onStackKeyDown}
        >
          <div className={`${prefix}__pile`}>
            {stack.slice(1, 3).map((gate, index) => {
              const style: GateStyle = { [`--${prefix}-k`]: index + 1 };
              return (
                <button
                  type="button"
                  className={`${prefix}__back`}
                  data-fresh={freshIds.has(gate.id) ? "" : undefined}
                  style={style}
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => setSelectedId(gate.id)}
                  children={
                    <span className={`${prefix}__back-text`} dir="auto">
                      {gate.action}
                    </span>
                  }
                  key={gate.id}
                />
              );
            })}
            {leaving && (
              <div
                className={`${prefix}__card ${prefix}__card--leaving`}
                data-decision={leaving.decision}
                aria-hidden="true"
                key={`${leaving.gate.id}~out`}
              >
                <div className={`${prefix}__card-top`}>
                  <span className={`${prefix}__avatar`}>
                    {leaving.gate.avatar ?? agentInitials(leaving.gate.agent ?? "")}
                  </span>
                  <span className={`${prefix}__card-who`}>{leaving.gate.agent}</span>
                  <span className={`${prefix}__badge`} data-status={leaving.decision}>
                    {decisionLabels[leaving.decision ?? ""]}
                  </span>
                </div>
                <div className={`${prefix}__card-body`}>
                  <p className={`${prefix}__card-action`}>{leaving.gate.action}</p>
                </div>
              </div>
            )}
            {activeGate ? (
              <ActiveGateCard
                controller={controller}
                prefix={prefix}
                key={activeGate.id}
              />
            ) : (
              <div className={`${prefix}__card ${prefix}__card--empty`} key="empty">
                <span
                  className={`${prefix}__empty-mark`}
                  data-state={state}
                  aria-hidden="true"
                >
                  {rejected ? <RejectIcon /> : <CheckIcon />}
                </span>
                <p className={`${prefix}__empty-title`}>
                  {rejected
                    ? "The run stopped"
                    : live
                      ? "Nothing waits for you"
                      : resolved.length
                        ? "Every gate is through"
                        : "No approvals in this run"}
                </p>
                <p className={`${prefix}__empty-sub`}>
                  {rejected
                    ? `“${rejected.action}” was rejected – nothing after it runs`
                    : live
                      ? "New requests show up here as the agents ask"
                      : "The run needed you for nothing else"}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={`${prefix}__after`}>
          <div
            className={`${prefix}__pager`}
            data-off={pending.length > 1 ? undefined : ""}
            inert={pending.length > 1 ? undefined : true}
          >
            <button
              type="button"
              className={`${prefix}__page`}
              aria-label="Previous request"
              onClick={() => changePage(-1)}
            >
              <ChevronIcon direction="left" />
            </button>
            <span className={`${prefix}__page-n`} aria-hidden="true">
              {activeIndex + 1}
              {" of "}
              {pending.length}
            </span>
            <button
              type="button"
              className={`${prefix}__page`}
              aria-label="Next request"
              onClick={() => changePage(1)}
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
          {activeGate?.holds?.length ? (
            <p
              className={`${prefix}__holds`}
              title={activeGate.holds.join(", ")}
              key={activeGate.id}
            >
              <LockIcon />
              <span>
                {"Holds "}
                {plural(activeGate.holds.length, "step")}
                {": "}
                <span className={`${prefix}__held`}>{activeGate.holds.join(", ")}</span>
              </span>
            </p>
          ) : null}
        </div>
        {history.length > 0 && <GateHistory controller={controller} prefix={prefix} />}
      </div>
      <span className={`${prefix}__sr`} role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
const kindLabels: Record<string, string> = {
  tool: "Tool call",
  file: "File change",
  agent: "Sub-agent",
  message: "Message",
};
const contentLabels: Record<string, string> = {
  tool: "Arguments",
  file: "Changes",
  agent: "Prompt",
  message: "Message",
};
const decisionLabels: Record<string, string> = {
  approved: "Approved",
  edited: "Approved with changes",
  rejected: "Rejected",
};
const runLabels = {
  stopped: "Stopped",
  waiting: "Waiting on you",
  running: "Running",
  done: "Done",
};
export { ApprovalGates };
export type { ApprovalGatesProps };
export type { ApprovalGate };
export type { GateDecision };
export type { GateKind };
