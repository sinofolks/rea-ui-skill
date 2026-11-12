"use client";

import "./FallbackChain.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useState,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
type FallbackAttempt = {
  status?: string;
  model?: string;
  provider?: string;
  region?: string;
  logo?: ReactNode;
  providerLogo?: ReactNode;
  startedAt?: number | Date;
  duration?: number;
  cost?: number;
  timeout?: number;
  reason?: string;
  note?: string;
  details?: Array<{
    label?: ReactNode;
    value?: ReactNode;
  }>;
  id?: string;
  name?: string;
  label?: string;
  [field: string]: unknown;
};
type ChainEnd = {
  id: string;
  name: string;
  icon?: ReactNode;
  meta?: string;
  output?: ReactNode;
  logo?: ReactNode;
  text?: ReactNode;
  details?: Array<{
    label: ReactNode;
    value: ReactNode;
  }>;
};
interface FallbackChainProps {
  attempts: FallbackAttempt[];
  title?: string;
  route?: string;
  request?: ChainEnd;
  response?: ChainEnd;
  now?: number;
  onRetry?: () => void;
  className?: string;
}
type AttemptStatus = keyof typeof STATUS_LABELS;
interface Detail {
  label: ReactNode;
  value: ReactNode;
}
interface Attempt {
  status: AttemptStatus;
  model: string | undefined;
  provider: string | undefined;
  region: string | undefined;
  logo: ReactNode;
  providerLogo: ReactNode;
  startedAt: number;
  duration: number;
  cost: number;
  timeout: number;
  reason: string | undefined;
  note: string | undefined;
  details: Detail[];
}
interface Endpoint {
  name: string | undefined;
  logo: ReactNode;
  text: ReactNode;
  details: Detail[];
}
interface TooltipProps {
  id: string;
  prefix: string;
  logo?: ReactNode;
  title?: string;
  sub?: string;
  badge?: string;
  tone?: AttemptStatus;
  quote?: ReactNode;
  rows: Detail[];
  place: "start" | "end" | "above" | "below";
}
function FallbackChain(props: FallbackChainProps) {
  return <FallbackChainView {...props} clean />;
}
function normalizeDetails(value: unknown): Detail[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (detail): detail is Record<string, unknown> =>
        detail !== null && typeof detail === "object",
    )
    .map((detail) => ({
      label: detail.label as ReactNode,
      value: detail.value as ReactNode,
    }));
}
function normalizeAttempt(attempt: FallbackAttempt): Attempt {
  const status =
    typeof attempt.status === "string" && Object.hasOwn(STATUS_LABELS, attempt.status)
      ? (attempt.status as AttemptStatus)
      : "waiting";
  return {
    status,
    model: optionalText(attempt.model),
    provider: optionalText(attempt.provider),
    region: optionalText(attempt.region),
    logo: attempt.logo,
    providerLogo: attempt.providerLogo,
    startedAt: timestamp(attempt.startedAt),
    duration: Number(attempt.duration),
    cost:
      typeof attempt.cost === "number" && Number.isFinite(attempt.cost)
        ? Math.max(0, attempt.cost)
        : 0,
    timeout:
      typeof attempt.timeout === "number" &&
      Number.isFinite(attempt.timeout) &&
      attempt.timeout > 0
        ? attempt.timeout
        : 10000,
    reason: optionalText(attempt.reason),
    note: optionalText(attempt.note),
    details: normalizeDetails(attempt.details),
  };
}
function normalizeEndpoint(endpoint: ChainEnd | undefined): Endpoint {
  return {
    name: endpoint?.name,
    logo: endpoint?.logo,
    text: endpoint?.text,
    details: normalizeDetails(endpoint?.details),
  };
}
function elapsed(attempt: Attempt, now: number): number {
  const duration =
    attempt.status === "trying"
      ? now - attempt.startedAt
      : attempt.status === "failed" || attempt.status === "answered"
        ? attempt.duration
        : 0;
  return Number.isFinite(duration) ? Math.max(0, duration) : 0;
}
function formatDuration(milliseconds: number): string {
  const duration = Number.isFinite(milliseconds) ? Math.max(0, milliseconds) : 0;
  if (duration < 1000) return `${Math.round(duration / 10) * 10}ms`;
  if (duration < 60000) return `${(duration / 1000).toFixed(1)}s`;
  const seconds = Math.round(duration / 1000);
  if (seconds < 3600)
    return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
  const minutes = Math.round(seconds / 60);
  return `${Math.floor(minutes / 60).toLocaleString("en-US")}h ${String(minutes % 60).padStart(2, "0")}m`;
}
function formatCost(value: number): string {
  const cost = Math.max(0, Number.isFinite(value) ? value : 0);
  if (cost === 0) return "$0";
  if (cost < 0.0001) return "<$0.0001";
  if (cost < 0.01) return `$${cost.toFixed(4)}`;
  if (cost < 1) return `$${cost.toFixed(3)}`;
  return `$${cost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function modelInitials(model: string | undefined): string {
  const words = (model ?? "").trim().split(/\s+/).filter(Boolean);
  const names = words.filter((word) => /^\p{L}/u.test(word));
  const graphemes = (text: string) =>
    typeof Intl !== "undefined" && "Segmenter" in Intl
      ? Array.from(new Intl.Segmenter().segment(text), (part) => part.segment)
      : Array.from(text);
  return (names.length ? names : words)
    .slice(0, 2)
    .map((word) => graphemes(word)[0])
    .join("")
    .toUpperCase();
}
function statusText(
  attempt: Attempt,
  index: number,
  startedCount: number,
  overall: AttemptStatus,
): string {
  switch (attempt.status) {
    case "trying":
      return "Trying…";
    case "failed":
      return attempt.reason || "Failed";
    case "answered":
      return attempt.note ? `Answered · ${attempt.note}` : "Answered";
    case "skipped":
      return "Not needed";
    default:
      return index === startedCount && overall === "trying" ? "Up next" : "Waiting";
  }
}
function ModelMark({
  logo,
  model,
  prefix,
}: {
  logo: ReactNode;
  model: string | undefined;
  prefix: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showLogo = logo && !imageFailed;
  return (
    <span
      className={`${prefix}__mark`}
      data-logo={showLogo ? "" : undefined}
      onErrorCapture={() => setImageFailed(true)}
    >
      {showLogo ? logo : modelInitials(model)}
    </span>
  );
}
function RequestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="3.5" cy="3.5" r="1.75" fill="currentColor" opacity="0.45" />
      <circle cx="12.5" cy="8" r="1.75" fill="currentColor" opacity="0.45" />
      <circle cx="3.5" cy="12.5" r="2.25" fill="currentColor" />
      <path
        d="M5.2 3.5h4.3a3 3 0 0 1 0 6H6.3a1.5 1.5 0 0 0 0 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
function ResponseIcon({ filled, prefix }: { filled: boolean; prefix: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v5a1.5 1.5 0 0 1-1.5 1.5H8l-3 2.5V11h-.5A1.5 1.5 0 0 1 3 9.5v-5Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M5.75 6.25h4.5M5.75 8.25h2.75"
        stroke={filled ? `var(--${prefix}-card)` : "currentColor"}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
function Tooltip({
  id,
  prefix,
  logo,
  title,
  sub,
  badge,
  tone,
  quote,
  rows,
  place,
}: TooltipProps) {
  return (
    <span className={`${prefix}__pop`} id={id} role="tooltip" data-place={place}>
      <span className={`${prefix}__pop-head`}>
        {logo && (
          <span
            className={`${prefix}__pop-logo`}
            onErrorCapture={(event) => {
              event.currentTarget.style.display = "none";
            }}
          >
            {logo}
          </span>
        )}
        <span className={`${prefix}__pop-who`}>
          <span className={`${prefix}__pop-title`}>{title}</span>
          {sub && <span className={`${prefix}__pop-sub`}>{sub}</span>}
        </span>
        {badge && (
          <span className={`${prefix}__pop-badge`} data-tone={tone}>
            {badge}
          </span>
        )}
      </span>
      {quote && (
        <span className={`${prefix}__pop-quote`}>
          <span>{quote}</span>
        </span>
      )}
      {rows.length > 0 && (
        <span className={`${prefix}__pop-rows`}>
          {rows.map((row, index) => (
            <span className={`${prefix}__pop-row`} key={`${row.label}-${index}`}>
              <span className={`${prefix}__pop-label`}>{row.label}</span>
              <span className={`${prefix}__pop-value`}>{row.value}</span>
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
function FlowLight({
  id,
  path,
  size,
  vertical = false,
  prefix,
}: {
  id: string;
  path: string;
  size: number;
  vertical?: boolean;
  prefix: string;
}) {
  const length = Math.min(size * 0.7, 120);
  const coordinates = vertical
    ? { x1: 0, y1: 0, x2: 0, y2: length }
    : { x1: 0, y1: 0, x2: length, y2: 0 };
  const from = vertical ? `0 ${-length}` : `${-length} 0`;
  const to = vertical ? `0 ${size}` : `${size} 0`;
  return (
    <>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" {...coordinates}>
          <stop
            offset="0"
            style={{ stopColor: `var(--${prefix}-accent)`, stopOpacity: 0 }}
          />
          <stop
            offset="0.5"
            style={{ stopColor: `var(--${prefix}-accent)`, stopOpacity: 1 }}
          />
          <stop
            offset="1"
            style={{ stopColor: `var(--${prefix}-accent)`, stopOpacity: 0 }}
          />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from={from}
            to={to}
            dur="1.4s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.45 0 0.55 1"
          />
        </linearGradient>
      </defs>
      <path className={`${prefix}__light`} d={path} stroke={`url(#${id})`} />
    </>
  );
}
function FallbackChainView({
  attempts: inputAttempts,
  title = "Request",
  route,
  request: inputRequest,
  response: inputResponse,
  now,
  onRetry,
  className,
  clean,
}: FallbackChainProps & {
  clean: boolean;
}) {
  const prefix = clean ? "ui-fbkc" : "ui-fbk";
  const componentId = (clean ? "fcc" : "fc") + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const attempts = (Array.isArray(inputAttempts) ? inputAttempts : [])
    .filter(Boolean)
    .map(normalizeAttempt);
  const request = normalizeEndpoint(inputRequest);
  const response = normalizeEndpoint(inputResponse);
  const live = attempts.some(
    (attempt) => attempt.status === "trying" && Number.isFinite(attempt.startedAt),
  );
  const listRef = useRef<HTMLOListElement>(null);
  const [blockCount, setBlockCount] = useState(30);
  useLayoutEffect(() => {
    const blocks = listRef.current?.querySelector<HTMLElement>(`.${prefix}__blocks`);
    if (!blocks) return;
    const measure = () =>
      setBlockCount(
        Math.max(
          8,
          Math.floor((blocks.clientWidth + BLOCK_GAP) / (BLOCK_SIZE + BLOCK_GAP)),
        ),
      );
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(blocks);
    return () => observer.disconnect();
  }, [attempts.length]);
  const [clock, setClock] = useState(() => Date.now());
  useEffect(() => {
    if (now !== undefined || !live) return;
    const timer = window.setInterval(() => setClock(Date.now()), 100);
    return () => window.clearInterval(timer);
  }, [now, live]);
  const currentTime = now ?? clock;
  const tryingIndex = attempts.findIndex((attempt) => attempt.status === "trying");
  const answeredIndex = attempts.findIndex((attempt) => attempt.status === "answered");
  const startedAttempts = attempts.filter(hasStarted);
  const allFailed =
    attempts.length > 0 &&
    attempts.every(
      (attempt) => attempt.status === "failed" || attempt.status === "skipped",
    ) &&
    attempts.some((attempt) => attempt.status === "failed");
  const totalDuration = startedAttempts.reduce(
    (total, attempt) => total + elapsed(attempt, currentTime),
    0,
  );
  const totalCost = startedAttempts.reduce((total, attempt) => total + attempt.cost, 0);
  const answered = answeredIndex >= 0 ? attempts[answeredIndex] : undefined;
  const state: AttemptStatus = answered
    ? "answered"
    : allFailed
      ? "failed"
      : tryingIndex >= 0
        ? "trying"
        : "waiting";
  const rowCount = Math.max(1, attempts.length);
  const flowHeight = rowCount * ROW_HEIGHT + (rowCount - 1) * ROW_GAP;
  const center = flowHeight / 2;
  const responseSummary =
    state === "answered"
      ? answered?.note || answered?.model
      : state === "failed"
        ? `${attempts.filter((attempt) => attempt.status === "failed").length.toLocaleString("en-US")} failed`
        : "Waiting…";
  function incomingLinks(
    pathForRow: (center: number) => string,
    size: number,
    vertical = false,
  ) {
    return attempts.map((attempt, index) => {
      const path = pathForRow(rowCenter(index));
      return (
        <g key={index}>
          <path
            className={`${prefix}__link`}
            data-status={attempt.status}
            d={path}
            pathLength={1}
            key={attempt.status}
          />
          {attempt.status === "trying" && (
            <FlowLight
              id={`${componentId}-${vertical ? "t" : "w"}${index}`}
              path={path}
              size={size}
              vertical={vertical}
              prefix={prefix}
            />
          )}
        </g>
      );
    });
  }
  return (
    <div className={[prefix, className].filter(Boolean).join(" ")}>
      <header className={`${prefix}__bar`}>
        <span className={`${prefix}__title`} title={title}>
          {title}
        </span>
        <span className={`${prefix}__summary`} data-state={state} role="status">
          <span className={`${prefix}__state`} key={state}>
            {state === "answered" ? (
              "Answered"
            ) : state === "failed" ? (
              "No model answered"
            ) : state === "trying" ? (
              <>
                {"Attempt "}
                <b key={tryingIndex}>{tryingIndex + 1}</b>
                {" of "}
                {attempts.length}
              </>
            ) : (
              "Waiting"
            )}
          </span>
          <span className={`${prefix}__total`} aria-label="Time so far">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="6" cy="6" r="4.6" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M6 3.6V6l1.6 1"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            {formatDuration(totalDuration)}
          </span>
          <span className={`${prefix}__total`} aria-label="Cost so far">
            {formatCost(totalCost)}
          </span>
        </span>
        {state === "failed" && onRetry && (
          <button type="button" className={`${prefix}__btn`} onClick={onRetry}>
            Retry
          </button>
        )}
      </header>
      <div className={`${prefix}__card`}>
        <div className={`${prefix}__flow`}>
          <div
            className={`${prefix}__node ${prefix}__node--from ${prefix}__hov`}
            tabIndex={0}
            aria-describedby={`${componentId}-req`}
          >
            <span className={`${prefix}__node-icon`}>
              <RequestIcon />
            </span>
            <span className={`${prefix}__node-text`}>
              <span className={`${prefix}__node-title`}>Request</span>
              {route && (
                <span className={`${prefix}__node-sub`} title={route}>
                  {route}
                </span>
              )}
            </span>
            <Tooltip
              prefix={prefix}
              id={`${componentId}-req`}
              place="start"
              logo={request.logo ?? <RequestIcon />}
              title={request.name ?? "Request"}
              sub={route}
              quote={request.text}
              rows={[
                ...request.details,
                {
                  label: "Tried so far",
                  value: `${startedAttempts.length.toLocaleString("en-US")} of ${attempts.length.toLocaleString("en-US")}`,
                },
              ]}
            />
          </div>
          <svg
            className={`${prefix}__links ${prefix}__links--wide`}
            width={LINK_WIDTH}
            height={flowHeight}
            viewBox={`0 0 ${LINK_WIDTH} ${flowHeight}`}
            aria-hidden="true"
          >
            {incomingLinks((row) => curvePath(center, row, LINK_WIDTH), LINK_WIDTH)}
          </svg>
          <svg
            className={`${prefix}__links ${prefix}__links--tree`}
            width="44"
            height={flowHeight}
            viewBox={`0 0 44 ${flowHeight}`}
            aria-hidden="true"
          >
            {incomingLinks((row) => treePath(row, 20), flowHeight, true)}
          </svg>
          <ol
            ref={listRef}
            className={`${prefix}__models`}
            aria-label="Models, in the order they're tried"
          >
            {attempts.length === 0 && (
              <li className={`${prefix}__empty`}>No models in this chain</li>
            )}
            {attempts.map((attempt, index) => {
              const duration = elapsed(attempt, currentTime);
              const activeBlocks = Math.round(
                Math.min(1, duration / attempt.timeout) * blockCount,
              );
              const started = hasStarted(attempt);
              return (
                <li
                  className={`${prefix}__model ${prefix}__hov`}
                  data-status={attempt.status}
                  tabIndex={0}
                  aria-describedby={`${componentId}-m${index}`}
                  key={index}
                >
                  <span className={`${prefix}__logo`}>
                    <ModelMark
                      logo={attempt.logo}
                      model={attempt.model}
                      prefix={prefix}
                    />
                    <span className={`${prefix}__n`}>{index + 1}</span>
                  </span>
                  <span className={`${prefix}__who`}>
                    <span className={`${prefix}__top`}>
                      <span className={`${prefix}__name`} title={attempt.model}>
                        {attempt.model}
                      </span>
                      {attempt.provider && (
                        <span className={`${prefix}__provider`}>{attempt.provider}</span>
                      )}
                    </span>
                    <span
                      className={`${prefix}__status`}
                      title={statusText(attempt, index, startedAttempts.length, state)}
                      key={attempt.status}
                    >
                      {statusText(attempt, index, startedAttempts.length, state)}
                    </span>
                  </span>
                  <span className={`${prefix}__meta`}>
                    <span>{started ? formatDuration(duration) : "–"}</span>
                    <span>{started ? formatCost(attempt.cost) : ""}</span>
                  </span>
                  <span className={`${prefix}__blocks`} aria-hidden="true">
                    {Array.from({ length: blockCount }, (_, block) => (
                      <i
                        data-on={block < activeBlocks || undefined}
                        data-head={
                          (attempt.status === "trying" && block === activeBlocks - 1) ||
                          undefined
                        }
                        key={block}
                      />
                    ))}
                  </span>
                  <Tooltip
                    prefix={prefix}
                    id={`${componentId}-m${index}`}
                    place={index < rowCount / 2 ? "below" : "above"}
                    logo={attempt.providerLogo ?? attempt.logo}
                    title={attempt.provider ?? attempt.model}
                    sub={attempt.region}
                    badge={STATUS_LABELS[attempt.status]}
                    tone={attempt.status}
                    rows={[
                      { label: "Model", value: attempt.model },
                      {
                        label: "Time",
                        value: started
                          ? `${formatDuration(duration)} of ${formatDuration(attempt.timeout)}`
                          : `up to ${formatDuration(attempt.timeout)}`,
                      },
                      ...(started
                        ? [{ label: "Cost", value: formatCost(attempt.cost) }]
                        : []),
                      ...attempt.details,
                      ...(attempt.status === "failed"
                        ? [
                            {
                              label: "Why",
                              value: (
                                <span className={`${prefix}__pop-err`}>
                                  {attempt.reason || "Failed"}
                                </span>
                              ),
                            },
                          ]
                        : []),
                    ]}
                  />
                </li>
              );
            })}
          </ol>
          <svg
            className={`${prefix}__links ${prefix}__links--wide`}
            width={LINK_WIDTH}
            height={flowHeight}
            viewBox={`0 0 ${LINK_WIDTH} ${flowHeight}`}
            aria-hidden="true"
          >
            {attempts.map((attempt, index) => (
              <path
                className={`${prefix}__link ${prefix}__link--out`}
                data-status={index === answeredIndex ? "answered" : "idle"}
                d={curvePath(rowCenter(index), center, LINK_WIDTH)}
                pathLength={1}
                key={`${index}-${index === answeredIndex}`}
              />
            ))}
          </svg>
          <div
            className={`${prefix}__node ${prefix}__node--to ${prefix}__hov`}
            data-state={state}
            tabIndex={0}
            aria-describedby={`${componentId}-res`}
          >
            <span className={`${prefix}__node-icon`}>
              <ResponseIcon filled={state === "answered"} prefix={prefix} />
            </span>
            <span className={`${prefix}__node-text`}>
              <span className={`${prefix}__node-title`}>
                {state === "failed" ? "No answer" : "Response"}
              </span>
              <span className={`${prefix}__node-sub`} title={responseSummary} key={state}>
                {responseSummary}
              </span>
            </span>
            <Tooltip
              prefix={prefix}
              id={`${componentId}-res`}
              place="end"
              logo={
                response.logo ?? (
                  <ResponseIcon filled={state === "answered"} prefix={prefix} />
                )
              }
              title={response.name ?? "Response"}
              sub={
                state === "answered"
                  ? `from ${answered?.model}`
                  : state === "failed"
                    ? "No model answered"
                    : "Waiting for an answer"
              }
              badge={
                state === "answered"
                  ? "Delivered"
                  : state === "failed"
                    ? "Failed"
                    : "Pending"
              }
              tone={
                state === "answered"
                  ? "answered"
                  : state === "failed"
                    ? "failed"
                    : "waiting"
              }
              quote={state === "answered" ? response.text : undefined}
              rows={[
                { label: "Total time", value: formatDuration(totalDuration) },
                { label: "Total cost", value: formatCost(totalCost) },
                {
                  label: "Attempts",
                  value: `${startedAttempts.length.toLocaleString("en-US")} of ${attempts.length.toLocaleString("en-US")}`,
                },
                ...(state === "answered" ? response.details : []),
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const ROW_HEIGHT = 60;
const ROW_GAP = 10;
const LINK_WIDTH = 48;
const BLOCK_SIZE = 5;
const BLOCK_GAP = 2;
const STATUS_LABELS = {
  waiting: "Waiting",
  trying: "Trying",
  failed: "Failed",
  answered: "Answered",
  skipped: "Not needed",
};
const timestamp = (value: unknown): number =>
  typeof value === "number" ? value : value instanceof Date ? value.getTime() : NaN;
const optionalText = (value: unknown) => (typeof value === "string" ? value : undefined);
const hasStarted = (attempt: Attempt) =>
  attempt.status === "trying" ||
  attempt.status === "failed" ||
  attempt.status === "answered";
const rowCenter = (index: number) => index * (ROW_HEIGHT + ROW_GAP) + ROW_HEIGHT / 2;
const curvePath = (from: number, to: number, width: number) =>
  `M0 ${from}C${width * 0.55} ${from} ${width * 0.45} ${to} ${width} ${to}`;
const treePath = (to: number, left: number) =>
  `M${left} 0V${Math.max(0, to - 10)}Q${left} ${to} ${left + 10} ${to}H${left + 22}`;
export { FallbackChain };
export type { FallbackChainProps };
export type { FallbackAttempt };
export type { ChainEnd };
