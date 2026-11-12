"use client";

import "./ConflictRadar.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useState,
  type CSSProperties,
  Fragment,
  useEffect,
  useRef,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type RadarAgent = {
  id?: string | number;
  name?: string;
  model?: ReactNode;
  avatar?: ReactNode;
  status?: string;
  [field: string]: unknown;
};
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type RadarFile = {
  path?: string;
  edits?: Array<{
    agentId?: string | number;
    lines?: number[];
    active?: boolean;
    summary?: string;
    [field: string]: unknown;
  }>;
  [field: string]: unknown;
};
interface ConflictRadarProps {
  agents: RadarAgent[];
  files: RadarFile[];
  title?: string;
  resolved?: Record<string, string>;
  onResolve?: (path: string, agentId: string) => void;
  onMerge?: () => void;
  className?: string;
}
type LineSpan = [from: number, to: number];
interface Agent {
  id: string;
  name: string;
  avatar: ReactNode;
  status: string | undefined;
  model: ReactNode;
}
interface Edit {
  agentId: string;
  span: LineSpan | null;
  active: boolean;
  summary: string | undefined;
}
interface File {
  path: string;
  edits: Edit[];
}
interface Conflict {
  agents: string[];
  from: number;
  to: number;
}
interface FileRow {
  file: File;
  conflict: Conflict | null;
  pick: string | undefined;
  state: "settled" | "conflict" | "clean";
}
type RadarStyle = CSSProperties & Record<`--${string}`, number | string>;
function ConflictRadar(props: ConflictRadarProps) {
  return <ConflictRadarView {...props} clean />;
}
function normalizeSpan(value: unknown): LineSpan | null {
  const [first, second] = Array.isArray(value) ? value.map(Number) : [];
  const from = Number.isFinite(first) ? first : second;
  const to = Number.isFinite(second) ? second : first;
  return Number.isFinite(from) && Number.isFinite(to)
    ? [Math.min(from, to), Math.max(from, to)]
    : null;
}
function normalizeAgents(agents: RadarAgent[]): Agent[] {
  const result: Agent[] = [];
  for (const agent of agents ?? []) {
    if (!agent) continue;
    const id = String(agent.id);
    if (result.some((previous) => previous.id === id)) continue;
    result.push({
      id,
      name: String(agent.name ?? "").trim() || id,
      avatar: agent.avatar,
      status: agent.status,
      model: agent.model,
    });
  }
  return result;
}
function normalizeFiles(files: RadarFile[], agents: Agent[]): File[] {
  const result: File[] = [];
  for (const file of files ?? []) {
    if (!file) continue;
    const edits = (file.edits ?? [])
      .filter((edit) => edit && agents.some((agent) => agent.id === String(edit.agentId)))
      .map((edit) => ({
        agentId: String(edit.agentId),
        span: normalizeSpan(edit.lines),
        active: Boolean(edit.active),
        summary: typeof edit.summary === "string" ? edit.summary : undefined,
      }));
    const path = String(file.path ?? "");
    const previous = result.find((existing) => existing.path === path);
    if (previous) previous.edits.push(...edits);
    else result.push({ path, edits });
  }
  return result;
}
/** Only edits by different agents whose inclusive line spans overlap are conflicts. */
function detectConflict(file: File): Conflict | null {
  const agents = new Set<string>();
  let from = Infinity;
  let to = -Infinity;
  for (let index = 0; index < file.edits.length; index++) {
    const first = file.edits[index];
    for (const second of file.edits.slice(index + 1)) {
      if (
        !first.span ||
        !second.span ||
        first.agentId === second.agentId ||
        first.span[0] > second.span[1] ||
        second.span[0] > first.span[1]
      )
        continue;
      agents.add(first.agentId).add(second.agentId);
      from = Math.min(from, first.span[0], second.span[0]);
      to = Math.max(to, first.span[1], second.span[1]);
    }
  }
  return agents.size ? { agents: [...agents], from, to } : null;
}
function fileRows(files: File[], resolved: Record<string, string>): FileRow[] {
  return files.map((file) => {
    const conflict = detectConflict(file);
    const pick = conflict?.agents.includes(resolved[file.path])
      ? resolved[file.path]
      : undefined;
    return {
      file,
      conflict,
      pick,
      state: conflict ? (pick ? "settled" : "conflict") : "clean",
    };
  });
}
function graphemes(text: string): string[] {
  return typeof Intl !== "undefined" && "Segmenter" in Intl
    ? Array.from(new Intl.Segmenter().segment(text), (part) => part.segment)
    : Array.from(text);
}
function initials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => /^\p{L}/u.test(word) && !/^(jr|sr|ii|iii|iv)\.?$/i.test(word));
  const ends = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return (
    ends
      .map((word) => graphemes(word)[0])
      .join("")
      .toUpperCase() ||
    graphemes(name.trim())[0] ||
    "?"
  );
}
function splitPath(path: string): [directory: string, filename: string] {
  const splitAt = path.lastIndexOf("/") + 1;
  return [path.slice(0, splitAt), path.slice(splitAt)];
}
function RadarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle
        cx="8"
        cy="8"
        r="6.4"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.45"
      />
      <circle
        cx="8"
        cy="8"
        r="3.3"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.7"
      />
      <path
        d="M8 8 12.6 3.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="11.2" cy="10.6" r="1.3" fill="currentColor" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="m2.8 6.3 2.1 2.1 4.3-4.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Legend({ prefix, place }: { prefix: string; place: "head" | "foot" }) {
  return (
    <span className={`${prefix}__legend`} data-place={place} aria-hidden="true">
      {(["edit", "conflict", "kept"] as const).map((role) => (
        <span key={role}>
          <span className={`${prefix}__bar-s`} data-role={role} data-key="" />
          {ROLE_LABELS[role]}
        </span>
      ))}
    </span>
  );
}
function Avatar({ prefix, agent }: { prefix: string; agent: Agent | undefined }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showAvatar = agent?.avatar && !imageFailed;
  return (
    <span
      className={`${prefix}__avatar`}
      data-logo={showAvatar ? "" : undefined}
      onErrorCapture={() => setImageFailed(true)}
    >
      {showAvatar ? agent?.avatar : initials(agent?.name ?? "?")}
    </span>
  );
}
function AgentHeader({
  prefix,
  agent,
  last,
  rows,
}: {
  prefix: string;
  agent: Agent;
  last: boolean;
  rows: FileRow[];
}) {
  const working = agent.status !== "done";
  const editedRows = rows.filter((row) =>
    row.file.edits.some((edit) => edit.agentId === agent.id),
  );
  const metrics = [
    { id: "files", count: editedRows.length, labels: ["File", "Files"] },
    {
      id: "conflicts",
      count: editedRows.filter(
        (row) => row.state === "conflict" && row.conflict?.agents.includes(agent.id),
      ).length,
      labels: ["Conflict", "Conflicts"],
    },
    {
      id: "kept",
      count: editedRows.filter((row) => row.pick === agent.id).length,
      labels: ["Kept", "Kept"],
    },
  ];
  return (
    <span
      className={`${prefix}__head`}
      role="columnheader"
      data-status={working ? "running" : "done"}
      data-last={last || undefined}
    >
      <Avatar prefix={prefix} agent={agent} />
      <span className={`${prefix}__hname`} title={agent.name}>
        {agent.name}
      </span>
      <span className={`${prefix}__sr`}>{working ? ", working" : ", done"}</span>
      <span className={`${prefix}__kpi`} aria-hidden="true">
        <span className={`${prefix}__kpitop`}>
          <Avatar prefix={prefix} agent={agent} />
          <b>{agent.name}</b>
          <span className={`${prefix}__kpistate`}>{working ? "Working" : "Done"}</span>
        </span>
        {agent.model && <span className={`${prefix}__kpimodel`}>{agent.model}</span>}
        <span className={`${prefix}__kpis`}>
          {metrics.map((metric) => (
            <span
              data-kpi={metric.id}
              data-zero={metric.count === 0 || undefined}
              key={metric.id}
            >
              <b>{formatCount(metric.count)}</b>
              {metric.labels[metric.count === 1 ? 0 : 1]}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
function FileCells({
  prefix,
  row,
  agents,
}: {
  prefix: string;
  row: FileRow;
  agents: Agent[];
}) {
  const { file, conflict, pick, state } = row;
  const [directory, filename] = splitPath(file.path);
  const overlappingColumns = conflict
    ? conflict.agents
        .map((id) => agents.findIndex((agent) => agent.id === id))
        .filter((index) => index >= 0)
    : [];
  return (
    <>
      <span className={`${prefix}__file`} role="cell">
        <span className={`${prefix}__dot`} data-state={state} aria-hidden="true" />
        <span className={`${prefix}__sr`}>
          {state === "conflict" ? "Conflict: " : state === "settled" ? "Settled: " : ""}
        </span>
        <span className={`${prefix}__path`} title={file.path}>
          <span className={`${prefix}__dir`}>{directory}</span>
          <span className={`${prefix}__fname`}>{filename}</span>
        </span>
      </span>
      <span className={`${prefix}__cells`}>
        {overlappingColumns.length > 1 && (
          <span
            className={`${prefix}__link`}
            style={
              {
                "--a": Math.min(...overlappingColumns),
                "--b": Math.max(...overlappingColumns),
              } as RadarStyle
            }
            aria-hidden="true"
            key={conflict?.agents.join()}
          />
        )}
        {agents.map((agent, index) => {
          const edit = file.edits.find((edit) => edit.agentId === agent.id);
          const overlaps = conflict?.agents.includes(agent.id);
          const role = !edit
            ? "none"
            : pick && overlaps
              ? pick === agent.id
                ? "kept"
                : "lost"
              : overlaps
                ? "conflict"
                : "edit";
          const writing = edit?.active && !pick;
          const otherAgents =
            overlaps && !pick
              ? conflict!.agents
                  .filter((id) => id !== agent.id)
                  .map((id) => agents.find((agent) => agent.id === id)?.name ?? id)
              : [];
          return (
            <span
              className={`${prefix}__cell`}
              role="cell"
              data-last={index === agents.length - 1 || undefined}
              key={agent.id}
            >
              <span
                className={`${prefix}__bar-s`}
                data-role={role}
                data-active={writing || undefined}
              />
              {edit && (
                <span className={`${prefix}__tip`} data-role={role}>
                  <span className={`${prefix}__tiptop`}>
                    <b>{agent.name}</b>
                    <span className={`${prefix}__tipstate`}>
                      {writing ? "Writing…" : ROLE_LABELS[role]}
                    </span>
                  </span>
                  {(edit.span || otherAgents.length > 0) && (
                    <span className={`${prefix}__tipmeta`}>
                      {[
                        edit.span && formatLines(edit.span).replace(/^l/, "L"),
                        otherAgents.length > 0 && `overlaps ${otherAgents.join(", ")}`,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  )}
                </span>
              )}
            </span>
          );
        })}
      </span>
    </>
  );
}
function ConflictRadarView({
  agents: inputAgents,
  files: inputFiles,
  title = "Parallel work",
  resolved,
  onResolve,
  onMerge,
  className,
  clean,
}: ConflictRadarProps & {
  clean: boolean;
}) {
  const prefix = clean ? "ui-crc" : "ui-cr";
  const agents = normalizeAgents(inputAgents);
  const files = normalizeFiles(inputFiles, agents);
  const [internalResolved, setInternalResolved] = useState<Record<string, string>>({});
  const resolutions = resolved ?? internalResolved;
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const selectionTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(selectionTimer.current), []);
  const rows = fileRows(files, resolutions);
  const unsettledRows = rows.filter((row) => row.state === "conflict");
  const conflictingRows = rows.filter((row) => row.conflict);
  const selected =
    rows.find((row) => row.conflict && row.file.path === selectedPath) ??
    unsettledRows[0] ??
    conflictingRows[conflictingRows.length - 1];
  const workingAgents = agents.filter((agent) => agent.status !== "done").length;
  const changedBranches = agents.filter((agent) =>
    files.some((file) => file.edits.some((edit) => edit.agentId === agent.id)),
  ).length;
  const canMerge =
    unsettledRows.length === 0 && workingAgents === 0 && changedBranches > 0;
  function resolve(path: string, agentId: string) {
    if (resolved === undefined)
      setInternalResolved((previous) => ({ ...previous, [path]: agentId }));
    onResolve?.(path, agentId);
    setSelectedPath(path);
    window.clearTimeout(selectionTimer.current);
    selectionTimer.current = window.setTimeout(() => setSelectedPath(null), 700);
  }
  const header = (
    <header className={`${prefix}__bar`}>
      <span className={`${prefix}__radar`}>
        <RadarIcon />
      </span>
      <span className={`${prefix}__title`} title={title}>
        {title}
      </span>
      <button
        type="button"
        className={`${prefix}__merge`}
        data-ready={canMerge || undefined}
        disabled={!canMerge}
        onClick={onMerge}
      >
        <span
          key={
            canMerge
              ? "ready"
              : unsettledRows.length
                ? `open${unsettledRows.length}`
                : "wait"
          }
        >
          {unsettledRows.length
            ? `${plural(unsettledRows.length, "conflict")} to settle`
            : workingAgents
              ? `Waiting for ${plural(workingAgents, "agent")}`
              : changedBranches
                ? `Merge ${plural(changedBranches, "branch", "branches")}`
                : "Nothing to merge"}
        </span>
      </button>
    </header>
  );
  const grid = (
    <div className={`${prefix}__grid`} role="table" aria-label="Files by agent">
      <div className={`${prefix}__row`} data-head="" role="row">
        <span className={`${prefix}__file`} role="columnheader">
          <span className={`${prefix}__sr`}>File</span>
          <Legend prefix={prefix} place="head" />
        </span>
        <span className={`${prefix}__cells`}>
          {agents.map((agent, index) => (
            <AgentHeader
              prefix={prefix}
              agent={agent}
              last={index === agents.length - 1}
              rows={rows}
              key={agent.id}
            />
          ))}
        </span>
      </div>
      {rows.map((row, index) =>
        row.conflict ? (
          <button
            type="button"
            role="row"
            className={`${prefix}__row`}
            data-state={row.state}
            data-alt={index % 2 === 1 || undefined}
            aria-pressed={selected?.file.path === row.file.path}
            onClick={() => setSelectedPath(row.file.path)}
            key={row.file.path}
          >
            <FileCells prefix={prefix} row={row} agents={agents} />
          </button>
        ) : (
          <div
            role="row"
            className={`${prefix}__row`}
            data-state={row.state}
            data-alt={index % 2 === 1 || undefined}
            key={row.file.path}
          >
            <FileCells prefix={prefix} row={row} agents={agents} />
          </div>
        ),
      )}
      <Legend prefix={prefix} place="foot" />
    </div>
  );
  const choices = (
    <section className={`${prefix}__pick`} aria-live="polite">
      {selected?.conflict ? (
        <Fragment>
          <div className={`${prefix}__phead`} key={selected.file.path}>
            <span className={`${prefix}__ptitle`}>
              {selected.state === "settled" ? "Settled" : "Pick a way"}
            </span>
            <span
              className={`${prefix}__where`}
              title={`${selected.file.path} · ${formatLines([selected.conflict.from, selected.conflict.to])}`}
            >
              {splitPath(selected.file.path)[1]}
              {" · "}
              {formatLines([selected.conflict.from, selected.conflict.to])}
            </span>
          </div>
          <div
            className={`${prefix}__ways`}
            role="radiogroup"
            aria-label={`Ways to settle ${selected.file.path}`}
            key={`${selected.file.path}-ways`}
          >
            {selected.conflict.agents.map((agentId) => {
              const agent = agents.find((agent) => agent.id === agentId);
              const edit = selected.file.edits.find((edit) => edit.agentId === agentId);
              const kept = selected.pick === agentId;
              return (
                <button
                  type="button"
                  role="radio"
                  aria-checked={kept}
                  className={`${prefix}__way`}
                  data-lost={(selected.pick && !kept) || undefined}
                  onClick={() => resolve(selected.file.path, agentId)}
                  key={agentId}
                >
                  <span className={`${prefix}__wtop`}>
                    <Avatar prefix={prefix} agent={agent} />
                    <span className={`${prefix}__wname`} title={agent?.name ?? agentId}>
                      {agent?.name ?? agentId}
                    </span>
                    {kept && (
                      <span className={`${prefix}__kept`}>
                        <CheckIcon />
                        {" Kept"}
                      </span>
                    )}
                  </span>
                  <span className={`${prefix}__summary`} title={edit?.summary}>
                    {edit?.summary ||
                      (edit?.span
                        ? `Changes ${formatLines(edit.span)}`
                        : "Changes this file")}
                  </span>
                </button>
              );
            })}
          </div>
        </Fragment>
      ) : (
        <div className={`${prefix}__calm`}>
          {workingAgents
            ? `Watching ${plural(workingAgents, "agent")} for overlaps`
            : changedBranches > 1
              ? "No overlaps – the branches merge cleanly"
              : changedBranches
                ? "No overlaps – the branch merges cleanly"
                : "No changes yet"}
        </div>
      )}
    </section>
  );
  const columnStyle = { [`--${prefix}-n`]: agents.length } as RadarStyle;
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      style={clean ? undefined : columnStyle}
    >
      {clean ? (
        <div className={`${prefix}__card`} style={columnStyle}>
          {header}
          {grid}
          {choices}
        </div>
      ) : (
        <Fragment>
          {header}
          <div className={`${prefix}__card`}>{grid}</div>
          <div className={`${prefix}__card`}>{choices}</div>
        </Fragment>
      )}
    </div>
  );
}
const ROLE_LABELS = {
  edit: "Changed",
  conflict: "Conflict",
  kept: "Kept",
  lost: "Left out",
  none: "",
};
const formatCount = (count: number) => count.toLocaleString("en-US");
const plural = (count: number, singular: string, multiple = `${singular}s`) =>
  `${formatCount(count)} ${count === 1 ? singular : multiple}`;
const formatLines = ([from, to]: LineSpan) =>
  from === to
    ? `line ${formatCount(from)}`
    : `lines ${formatCount(from)}–${formatCount(to)}`;
export { ConflictRadar };
export type { ConflictRadarProps };
export type { RadarAgent };
export type { RadarFile };
