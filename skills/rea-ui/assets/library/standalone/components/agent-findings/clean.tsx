"use client";

import "./AgentFindings.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
  type CSSProperties,
} from "react";
interface FindingAgent {
  id?: string | number;
  name?: string;
  model?: string;
  avatar?: ReactNode;
  total?: number;
  done?: number;
  step?: string;
  status?: "running" | "done" | "failed";
  [field: string]: unknown;
}
interface Finding {
  id?: string | number;
  agentId?: string | number;
  title?: string;
  severity?: string;
  at?: number | string | Date;
  location?: string;
  [field: string]: unknown;
}
interface AgentFindingsProps {
  agents: FindingAgent[];
  findings: Finding[];
  title?: string;
  rows?: number;
  now?: number;
  onOpen?: (finding: Finding) => void;
  className?: string;
}
type Severity = "critical" | "warning" | "note";
type FindingStyle = CSSProperties & Record<`--${string}`, number | string>;
function AgentFindings(props: AgentFindingsProps) {
  return <AgentFindingsView {...props} clean />;
}
function timestamp(value: unknown): number {
  return value instanceof Date
    ? value.getTime()
    : typeof value === "number"
      ? value
      : typeof value === "string"
        ? Date.parse(value)
        : NaN;
}
function relativeAge(at: number, now: number): string {
  if (!Number.isFinite(at) || !Number.isFinite(now)) return "";
  const seconds = Math.max(0, Math.round((now - at) / 1000));
  if (seconds < 5) return "now";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}
function initials(name: string): string {
  const graphemes = (text: string) =>
    typeof Intl.Segmenter === "function"
      ? Array.from(new Intl.Segmenter().segment(text), (part) => part.segment)
      : Array.from(text);
  const words = name.trim().split(/\s+/).filter(Boolean);
  const nameWords = words.filter((word) => /^[\p{L}\p{N}]/u.test(word));
  if (nameWords.length)
    return (
      nameWords.length > 1 ? [nameWords[0], nameWords[nameWords.length - 1]] : nameWords
    )
      .map((word) => graphemes(word)[0])
      .join("")
      .toUpperCase();
  return words.length ? graphemes(words[0])[0] : "";
}
/** Duplicate IDs retain separate stable keys while filters use the public ID. */
function keyedRecords<
  T extends {
    id?: string | number;
  },
>(records: T[]) {
  const occurrences = new Map<string, number>();
  return (Array.isArray(records) ? records : [])
    .filter((record) => Boolean(record) && typeof record === "object")
    .map((record) => {
      const id = String(record.id ?? "");
      const occurrence = occurrences.get(id) ?? 0;
      occurrences.set(id, occurrence + 1);
      return { record, id, key: occurrence ? `${id}#${occurrence}` : id };
    });
}
function SeverityMark({ severity, prefix }: { severity: Severity; prefix: string }) {
  const opacities =
    severity === "critical"
      ? [1, 1, 1, 0.6]
      : severity === "warning"
        ? [1, 0.6, 0.6, 0.3]
        : [0.6, 0.3, 0.3, 0.3];
  return (
    <svg
      className={`${prefix}__mark`}
      data-severity={severity}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
    >
      {[
        [0, 0],
        [5.5, 0],
        [0, 5.5],
        [5.5, 5.5],
      ].map(([x, y], index) => (
        <rect
          x={x}
          y={y}
          width="4.5"
          height="4.5"
          rx="1"
          fill="currentColor"
          opacity={opacities[index]}
          key={index}
        />
      ))}
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z"
        fill="currentColor"
      />
      <circle cx="11.6" cy="11.4" r="1.1" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
function AgentAvatar({
  avatar,
  name,
  prefix,
}: {
  avatar?: ReactNode;
  name: string;
  prefix: string;
}) {
  const [failed, setFailed] = useState(false);
  const showAvatar = avatar != null && avatar !== false && !failed;
  return (
    <span
      className={`${prefix}__avatar`}
      data-logo={showAvatar ? "" : undefined}
      onErrorCapture={() => setFailed(true)}
    >
      {showAvatar ? avatar : initials(name)}
    </span>
  );
}
function AgentFindingsView({
  agents,
  findings,
  title = "Verification",
  rows = 4,
  now,
  onOpen,
  className,
  clean = false,
}: AgentFindingsProps & {
  clean?: boolean;
}) {
  const prefix = clean ? "ui-afc" : "ui-af";
  const [clock, setClock] = useState(() => Date.now());
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  useEffect(() => {
    if (now !== undefined) return;
    const timer = window.setInterval(() => setClock(Date.now()), 5000);
    return () => window.clearInterval(timer);
  }, [now]);
  const currentTime = now ?? clock;
  const visibleRowCount =
    typeof rows === "number" && Number.isFinite(rows) && rows >= 1 ? Math.floor(rows) : 4;
  const normalizedAgents = keyedRecords(agents).map(({ record, id, key }) => {
    const total = nonnegativeInteger(record.total);
    const status =
      record.status === "running" ||
      record.status === "done" ||
      record.status === "failed"
        ? record.status
        : undefined;
    return {
      ...record,
      id,
      key,
      name: String(record.name ?? "").trim() || id || "Agent",
      total,
      done: Math.min(nonnegativeInteger(record.done), total),
      status,
    };
  });
  const normalizedFindings = keyedRecords(findings).map(({ record, id, key }) => ({
    ...record,
    id,
    key,
    source: record,
    agentId: String(record.agentId ?? ""),
    title: String(record.title ?? ""),
    severity: normalizeSeverity(record.severity),
    at: timestamp(record.at),
  }));
  const checksDone = normalizedAgents.reduce((count, agent) => count + agent.done, 0);
  const totalChecks = normalizedAgents.reduce((count, agent) => count + agent.total, 0);
  const countFindings = (severity: Severity, agentId?: string) =>
    normalizedFindings.filter(
      (finding) =>
        finding.severity === severity && (!agentId || finding.agentId === agentId),
    ).length;
  const criticalCount = countFindings("critical");
  const warningCount = countFindings("warning");
  const countWidth = Math.max(
    0,
    ...normalizedAgents.map(
      (agent) =>
        `${countFormatter.format(agent.done)}/${countFormatter.format(agent.total)}`
          .length,
    ),
  );
  const findingsWidth = Math.max(
    1,
    ...normalizedAgents.map((agent) =>
      Math.max(
        compactCount(countFindings("critical", agent.id)).length,
        compactCount(countFindings("warning", agent.id)).length,
      ),
    ),
  );
  const findAgent = (id: string) => normalizedAgents.find((agent) => agent.id === id);
  const selectedAgent = selectedAgentId ? findAgent(selectedAgentId) : undefined;
  const filterId = selectedAgent ? selectedAgentId : null;
  const sortedTimestamp = (finding: { at: number }) =>
    Number.isFinite(finding.at) ? finding.at : -Infinity;
  const visibleFindings = normalizedFindings
    .filter((finding) => !filterId || finding.agentId === filterId)
    .sort((left, right) =>
      sortedTimestamp(left) === sortedTimestamp(right)
        ? 0
        : sortedTimestamp(right) > sortedTimestamp(left)
          ? 1
          : -1,
    )
    .slice(0, visibleRowCount + 1);
  const rootStyle: FindingStyle = {
    [`--${prefix}-rows`]: visibleRowCount,
    [`--${prefix}-count-w`]: `${countWidth}ch`,
    [`--${prefix}-found-w`]: `calc(38px + ${findingsWidth * 2}ch)`,
  };
  const feedStyle: FindingStyle = {
    [`--${prefix}-shown`]: Math.max(1, Math.min(visibleFindings.length, visibleRowCount)),
  };
  const header = (
    <header className={`${prefix}__bar`}>
      <span className={`${prefix}__spark`}>
        <SparkIcon />
      </span>
      <span className={`${prefix}__title`} title={title}>
        {title}
      </span>
      <span className={`${prefix}__progress`}>
        {totalChecks > 0 &&
          `${countFormatter.format(checksDone)} of ${countFormatter.format(totalChecks)} ${totalChecks === 1 ? "check" : "checks"}`}
      </span>
      <span
        className={`${prefix}__totals`}
        aria-label={`${countFormatter.format(criticalCount)} critical, ${countFormatter.format(warningCount)} ${warningCount === 1 ? "warning" : "warnings"}`}
      >
        <span data-severity="critical" data-zero={criticalCount === 0 || undefined}>
          <b key={criticalCount}>{countFormatter.format(criticalCount)}</b>
          {" critical"}
        </span>
        <span data-severity="warning" data-zero={warningCount === 0 || undefined}>
          <b key={warningCount}>{countFormatter.format(warningCount)}</b>{" "}
          {warningCount === 1 ? "warning" : "warnings"}
        </span>
      </span>
    </header>
  );
  const agentList = (
    <ul className={`${prefix}__agents`} aria-label="Agents">
      {normalizedAgents.length === 0 && (
        <li className={`${prefix}__none`}>No agents yet</li>
      )}
      {normalizedAgents.map((agent) => {
        const status = agent.status ?? (agent.done >= agent.total ? "done" : "running");
        const progress = agent.total
          ? Math.min(100, (agent.done / agent.total) * 100)
          : 0;
        const critical = countFindings("critical", agent.id);
        const warnings = countFindings("warning", agent.id);
        const selected = filterId === agent.id;
        const step =
          status === "done"
            ? "All checks done"
            : status === "failed"
              ? "Stopped"
              : agent.step;
        return (
          <li key={agent.key}>
            <button
              type="button"
              className={`${prefix}__agent`}
              data-status={status}
              aria-pressed={selected}
              data-dim={filterId && !selected ? "" : undefined}
              title={agent.model ? `${agent.name} · ${agent.model}` : agent.name}
              onClick={() => setSelectedAgentId(selected ? null : agent.id)}
            >
              <AgentAvatar avatar={agent.avatar} name={agent.name} prefix={prefix} />
              <span className={`${prefix}__who`}>
                <span className={`${prefix}__name`} dir="auto">
                  {agent.name}
                </span>
                <span className={`${prefix}__step`} dir="auto" title={step} key={step}>
                  {step}
                </span>
              </span>
              <span className={`${prefix}__track`} aria-hidden="true">
                <span className={`${prefix}__fill`} style={{ width: `${progress}%` }} />
              </span>
              <span className={`${prefix}__count`}>
                {countFormatter.format(agent.done)}
                {"/"}
                {countFormatter.format(agent.total)}
              </span>
              <span
                className={`${prefix}__found`}
                aria-label={`${countFormatter.format(critical)} critical, ${countFormatter.format(warnings)} ${warnings === 1 ? "warning" : "warnings"}`}
              >
                <span data-severity="critical" data-zero={critical === 0 || undefined}>
                  <SeverityMark severity="critical" prefix={prefix} />
                  <b key={critical}>{compactCount(critical)}</b>
                </span>
                <span data-severity="warning" data-zero={warnings === 0 || undefined}>
                  <SeverityMark severity="warning" prefix={prefix} />
                  <b key={warnings}>{compactCount(warnings)}</b>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
  const feedHeading = (
    <div className={`${prefix}__feed-head`}>
      <span className={`${prefix}__label`}>Latest findings</span>
      {selectedAgent && (
        <button
          type="button"
          className={`${prefix}__chip`}
          onClick={() => setSelectedAgentId(null)}
          aria-label={`Show all agents (now only ${selectedAgent.name})`}
          title={selectedAgent.name}
        >
          <span className={`${prefix}__chip-name`}>{selectedAgent.name}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path
              d="M2.5 2.5l5 5M7.5 2.5l-5 5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
  const findingList = (
    <ol className={`${prefix}__feed`} aria-live="polite" style={feedStyle}>
      {visibleFindings.length === 0 && (
        <li className={`${prefix}__empty`}>Nothing found yet</li>
      )}
      {visibleFindings.map((finding, index) => {
        const agentName = findAgent(finding.agentId)?.name;
        const location = finding.location ? String(finding.location) : "";
        return (
          <li
            className={`${prefix}__slot`}
            style={{ transform: `translateY(${index * 40}px)` }}
            data-out={index >= visibleRowCount || undefined}
            aria-hidden={index >= visibleRowCount || undefined}
            key={finding.key}
          >
            <button
              type="button"
              className={`${prefix}__finding`}
              tabIndex={index >= visibleRowCount ? -1 : 0}
              onClick={() => onOpen?.(finding.source)}
            >
              <span className={`${prefix}__in`}>
                <SeverityMark severity={finding.severity} prefix={prefix} />
                <span className={`${prefix}__sr`}>
                  {severityLabels[finding.severity]}
                  {": "}
                </span>
                <span className={`${prefix}__ftitle`} dir="auto" title={finding.title}>
                  {finding.title}
                </span>
                <span
                  className={`${prefix}__meta`}
                  title={[agentName, location].filter(Boolean).join(" · ") || undefined}
                >
                  {agentName && (
                    <span className={`${prefix}__who-name`}>{agentName}</span>
                  )}
                  {agentName && location && <span className={`${prefix}__dot`}>·</span>}
                  {location && <code>{location}</code>}
                </span>
                <span className={`${prefix}__time`}>
                  {relativeAge(finding.at, currentTime)}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
  return (
    <div className={[prefix, className].filter(Boolean).join(" ")} style={rootStyle}>
      {clean ? (
        <div className={`${prefix}__card`}>
          {header}
          {agentList}
          {feedHeading}
          {findingList}
        </div>
      ) : (
        <>
          {header}
          <div className={`${prefix}__card`}>{agentList}</div>
          {feedHeading}
          <div className={`${prefix}__card`}>{findingList}</div>
        </>
      )}
    </div>
  );
}
const severityLabels: Record<Severity, string> = {
  critical: "Critical",
  warning: "Warning",
  note: "Note",
};
const countFormatter = new Intl.NumberFormat("en");
const compactCount = (count: number) =>
  count > 999 ? "999+" : countFormatter.format(count);
const normalizeSeverity = (severity: unknown): Severity =>
  severity === "critical" || severity === "warning" ? severity : "note";
const nonnegativeInteger = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.floor(value))
    : 0;
export { AgentFindings };
export type { Finding };
export type { FindingAgent };
export type { AgentFindingsProps };
