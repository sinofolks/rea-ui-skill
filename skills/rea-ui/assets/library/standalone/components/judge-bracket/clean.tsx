"use client";

import "./JudgeBracket.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
interface Contender {
  id?: string;
  name?: string;
  icon?: ReactNode;
  meta?: string;
  output?: string;
  [field: string]: unknown;
}
interface JudgeVerdict {
  winner?: string;
  reason?: string;
  scores?: number[];
}
interface JudgeBracketProps {
  contenders: Contender[];
  verdicts?: Record<string, JudgeVerdict>;
  judging?: string;
  judge?: string;
  task?: string;
  onPick?: (winner: Contender) => void;
  title?: string;
  className?: string;
}
type MatchSide = (typeof matchSides)[number];
interface BracketMatch {
  key: string;
  round: number;
  index: number;
  a?: Contender;
  b?: Contender;
  verdict?: JudgeVerdict;
  winner?: Contender;
  ya: number;
  yb: number;
}
type BracketStyle = CSSProperties & {
  [key: `--ui-${string}`]: string | number;
};
function JudgeBracket(props: JudgeBracketProps) {
  return <JudgeBracketView {...props} clean={true} />;
}
function roundLabel(index: number, count: number): string {
  if (index === count - 1) return "Final";
  if (index === count - 2) return "Semifinal";
  if (index === count - 3) return "Quarterfinal";
  return `Round ${index + 1}`;
}
function buildBracket(contenders: Contender[], verdicts: Record<string, JudgeVerdict>) {
  const contendersById = new Map(
    contenders.map((contender) => [contender.id, contender]),
  );
  const roundCount = Math.max(1, Math.round(Math.log2(Math.max(2, contenders.length))));
  const rounds: BracketMatch[][] = [];
  let entrants: Array<Contender | undefined> = Array.from(
    { length: 2 ** roundCount },
    (_, index) => contenders[index],
  );
  let centers = entrants.map(
    (_, index) => Math.floor(index / 2) * 100 + (index % 2) * 44 + SLOT_HEIGHT / 2,
  );
  for (let round = 0; round < roundCount; round++) {
    const matches: BracketMatch[] = [];
    const winners: Array<Contender | undefined> = [];
    const nextCenters: number[] = [];
    for (let index = 0; index < entrants.length / 2; index++) {
      const key = `${round}:${index}`;
      const first = entrants[2 * index];
      const second = entrants[2 * index + 1];
      const verdict = first && second ? verdicts[key] : undefined;
      // Only the first round can advance a contender with no opponent.
      const bye = round === 0 && Boolean(first) !== Boolean(second);
      const winner = bye
        ? (first ?? second)
        : verdict && (verdict.winner === first?.id || verdict.winner === second?.id)
          ? contendersById.get(verdict.winner)
          : undefined;
      const firstCenter = centers[2 * index];
      const secondCenter = centers[2 * index + 1];
      matches.push({
        key,
        round,
        index,
        a: first,
        b: second,
        verdict,
        winner,
        ya: firstCenter,
        yb: secondCenter,
      });
      winners.push(winner);
      nextCenters.push((firstCenter + secondCenter) / 2);
    }
    rounds.push(matches);
    entrants = winners;
    centers = nextCenters;
  }
  const finalMatch = rounds[roundCount - 1][0];
  const firstRoundMatches = 2 ** (roundCount - 1);
  return {
    rounds,
    champion: finalMatch.winner,
    height: firstRoundMatches * 84 + (firstRoundMatches - 1) * MATCH_GAP,
  };
}
function connectorPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): string {
  const middleX = (startX + endX) / 2;
  if (Math.abs(startY - endY) < 1) return `M${startX} ${startY}H${endX}`;
  const direction = Math.sign(endY - startY);
  const radius = Math.min(
    CORNER_RADIUS,
    Math.abs(endY - startY) / 2,
    (endX - startX) / 2,
  );
  return `M${startX} ${startY}H${middleX - radius}Q${middleX} ${startY} ${middleX} ${startY + direction * radius}V${endY - direction * radius}Q${middleX} ${endY} ${middleX + radius} ${endY}H${endX}`;
}
function matchLabel(
  match: BracketMatch,
  rounds: BracketMatch[][],
  judging?: BracketMatch,
): string {
  const name = `${roundLabel(match.round, rounds.length)}${rounds[match.round].length > 1 ? ` ${match.index + 1}` : ""}`;
  if (match.round === 0 && Boolean(match.a) !== Boolean(match.b))
    return `${name}: ${(match.a ?? match.b)?.name} moves on without an opponent`;
  return `${name}: ${match.a?.name ?? "to be decided"} against ${match.b?.name ?? "to be decided"}${match.winner ? `, ${match.winner.name} won` : match === judging ? ", being judged" : ""}`;
}
function BracketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 3.5h3.5v9H2M5.5 8h3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      <rect x="9.5" y="5.6" width="5" height="4.8" rx="1.4" fill="currentColor" />
    </svg>
  );
}
function WonIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.06 8.83 19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}
function JudgingIcon({ prefix }: { prefix: string }) {
  return (
    <svg
      className={`${prefix}__spin`}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M12 3.5A8.5 8.5 0 0 1 20.5 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" fill="currentColor" />
      <path
        d="M7 6H4.5v1.5A3.5 3.5 0 0 0 8 11M17 6h2.5v1.5A3.5 3.5 0 0 1 16 11M12 14v4M8.5 20h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function BracketSlot({
  match,
  side,
  roundCount,
  narrow,
  prefix,
}: {
  match: BracketMatch;
  side: MatchSide;
  roundCount: number;
  narrow: boolean;
  prefix: string;
}) {
  const contender = match[side];
  const won = Boolean(contender) && match.winner?.id === contender?.id;
  const lost = Boolean(contender && match.winner && !won);
  const score = match.verdict?.scores?.[side === "a" ? 0 : 1];
  const champion = won && match.round === roundCount - 1;
  const style: BracketStyle | undefined = champion
    ? { [`--${prefix}-rounds`]: roundCount }
    : undefined;
  return (
    <span
      className={`${prefix}__slot`}
      data-side={side}
      data-won={won ? "" : undefined}
      data-lost={lost ? "" : undefined}
      data-champ={champion ? "" : undefined}
      data-empty={contender ? undefined : ""}
      style={style}
    >
      {contender ? (
        <span
          className={`${prefix}__slot-in`}
          data-arrive={match.round > 0 ? "" : undefined}
          key={contender.id}
        >
          {contender.icon && <span className={`${prefix}__tile`}>{contender.icon}</span>}
          <span className={`${prefix}__name`} dir="auto" title={contender.name}>
            {contender.name}
          </span>
          {champion && (
            <span className={`${prefix}__cup`} aria-label="Winner">
              <TrophyIcon />
            </span>
          )}
          {score !== undefined && !narrow ? (
            <span className={`${prefix}__score`}>{score.toFixed(1)}</span>
          ) : won && !champion && !narrow ? (
            <span className={`${prefix}__won`}>
              <WonIcon />
            </span>
          ) : null}
        </span>
      ) : match.round === 0 && match.winner ? (
        <span className={`${prefix}__bye`}>No opponent</span>
      ) : null}
    </span>
  );
}
function useJudgeBracket({ contenders, verdicts = {}, judging }: JudgeBracketProps) {
  const bracketRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const bracket = bracketRef.current;
    if (!bracket) return;
    setWidth(bracket.clientWidth);
    const observer = new ResizeObserver(() => setWidth(bracket.clientWidth));
    observer.observe(bracket);
    return () => observer.disconnect();
  }, []);
  const { rounds, champion, height } = buildBracket(contenders, verdicts);
  const roundCount = rounds.length;
  const columnWidth = width
    ? Math.floor((width - (roundCount - 1) * ROUND_GAP) / roundCount)
    : 0;
  const narrow = width > 0 && columnWidth < MIN_ROUND_WIDTH;
  const columnLeft = (round: number) => round * (columnWidth + ROUND_GAP);
  const matches = rounds.flat();
  const completedCount = matches.filter((match) => match.winner).length;
  const judgingMatch = matches.find(
    (match) => match.key === judging && match.a && match.b && !match.winner,
  );
  const pendingRound = rounds.findIndex((round) => round.some((match) => !match.winner));
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selectedMatch =
    matches.find((match) => match.key === selectedKey) ??
    judgingMatch ??
    (champion
      ? rounds[roundCount - 1][0]
      : (matches.filter((match) => match.winner).pop() ?? matches[0]));
  function focusMatch(key: string) {
    bracketRef.current?.querySelector<HTMLButtonElement>(`[data-key="${key}"]`)?.focus();
  }
  function onMatchKeyDown(event: KeyboardEvent<HTMLButtonElement>, match: BracketMatch) {
    let nextKey: string | undefined;
    if (event.key === "ArrowDown") nextKey = rounds[match.round][match.index + 1]?.key;
    else if (event.key === "ArrowUp") nextKey = rounds[match.round][match.index - 1]?.key;
    else if (event.key === "ArrowRight")
      nextKey = rounds[match.round + 1]?.[Math.floor(match.index / 2)]?.key;
    else if (event.key === "ArrowLeft")
      nextKey = rounds[match.round - 1]?.[match.index * 2]?.key;
    else if (event.key === "Escape" && selectedKey) {
      event.preventDefault();
      setSelectedKey(null);
      return;
    }
    if (nextKey) {
      event.preventDefault();
      focusMatch(nextKey);
    }
  }
  function onListKeyDown(event: KeyboardEvent<HTMLButtonElement>, match: BracketMatch) {
    const index = matches.indexOf(match);
    const nextMatch =
      event.key === "ArrowDown"
        ? matches[index + 1]
        : event.key === "ArrowUp"
          ? matches[index - 1]
          : undefined;
    if (event.key === "Escape" && selectedKey) {
      event.preventDefault();
      setSelectedKey(null);
    } else if (nextMatch) {
      event.preventDefault();
      focusMatch(nextMatch.key);
    }
  }
  function toggleMatch(match: BracketMatch) {
    setSelectedKey(selectedKey === match.key ? null : match.key);
  }
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState<number>();
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    setPanelHeight(panel.offsetHeight);
    const observer = new ResizeObserver(() => setPanelHeight(panel.offsetHeight));
    observer.observe(panel);
    return () => observer.disconnect();
  }, [selectedMatch?.key]);
  return {
    bracketRef,
    width,
    rounds,
    champion,
    height,
    roundCount,
    columnWidth,
    narrow,
    columnLeft,
    matches,
    completedCount,
    judgingMatch,
    pendingRound,
    selectedKey,
    selectedMatch,
    onMatchKeyDown,
    onListKeyDown,
    toggleMatch,
    panelRef,
    panelHeight,
  };
}
function JudgeBracketView({
  clean = false,
  ...props
}: JudgeBracketProps & {
  clean?: boolean;
}) {
  const { contenders, judge, task, onPick, title = "Judge", className } = props;
  const prefix = clean ? "ui-jbc" : "ui-jb";
  const {
    bracketRef,
    width,
    rounds,
    champion,
    height,
    roundCount,
    columnWidth,
    narrow,
    columnLeft,
    matches,
    completedCount,
    judgingMatch,
    pendingRound,
    selectedKey,
    selectedMatch,
    onMatchKeyDown,
    onListKeyDown,
    toggleMatch,
    panelRef,
    panelHeight,
  } = useJudgeBracket(props);
  const slotProps = { roundCount, narrow, prefix };
  return (
    <div
      className={[prefix, className].filter(Boolean).join(" ")}
      data-narrow={narrow ? "" : undefined}
      data-picking={selectedKey ? "" : undefined}
    >
      <header className={`${prefix}__head`}>
        <span className={`${prefix}__mark`}>
          <BracketIcon />
        </span>
        <span className={`${prefix}__title`}>{title}</span>
        {task && (
          <span className={`${prefix}__task`} dir="auto" title={task}>
            {task}
          </span>
        )}
        <span
          className={`${prefix}__live`}
          data-on={judgingMatch ? "" : undefined}
          aria-hidden={!judgingMatch || undefined}
        >
          <JudgingIcon prefix={prefix} />
          Judging
        </span>
        <span className={`${prefix}__sum`} aria-live="polite">
          {champion
            ? `${champion.name} wins`
            : pendingRound >= 0
              ? `${roundLabel(pendingRound, roundCount)} · ${completedCount}/${matches.length}`
              : `${completedCount}/${matches.length}`}
        </span>
      </header>
      <div
        ref={bracketRef}
        className={`${prefix}__bracket`}
        role="group"
        aria-label={`${contenders.length} attempts${judge ? `, judged by ${judge}` : ""}`}
        style={narrow ? undefined : { height }}
      >
        {!narrow && width > 0 && (
          <>
            <div className={`${prefix}__rounds`} aria-hidden="true">
              {rounds
                .map((_, index) => roundLabel(index, roundCount))
                .map((label, index) => (
                  <span
                    style={{ left: columnLeft(index), width: columnWidth }}
                    data-on={index === pendingRound ? "" : undefined}
                    children={label}
                    key={label + index}
                  />
                ))}
            </div>
            <svg
              className={`${prefix}__lines`}
              width={width}
              height={height}
              aria-hidden="true"
            >
              {matches
                .filter((match) => match.round < roundCount - 1)
                .map((match) => {
                  const startX = columnLeft(match.round) + columnWidth;
                  const endX = columnLeft(match.round + 1);
                  const endY = (match.ya + match.yb) / 2;
                  return matchSides.map((side) => {
                    const contender = match[side];
                    const state = match.winner
                      ? match.winner.id === contender?.id
                        ? "won"
                        : "lost"
                      : "open";
                    return (
                      <path
                        className={`${prefix}__line`}
                        data-state={state}
                        d={connectorPath(
                          startX,
                          side === "a" ? match.ya : match.yb,
                          endX,
                          endY,
                        )}
                        key={`${match.key}${side}`}
                      />
                    );
                  });
                })}
              {champion &&
                matches
                  .filter(
                    (match) =>
                      match.winner?.id === champion.id && match.round < roundCount - 1,
                  )
                  .map((match) => {
                    const side = match.a?.id === champion.id ? "a" : "b";
                    const style: BracketStyle = {
                      [`--${prefix}-step`]: match.round,
                    };
                    return (
                      <path
                        className={`${prefix}__line ${prefix}__line--path`}
                        d={connectorPath(
                          columnLeft(match.round) + columnWidth,
                          side === "a" ? match.ya : match.yb,
                          columnLeft(match.round + 1),
                          (match.ya + match.yb) / 2,
                        )}
                        pathLength={1}
                        style={style}
                        key={`${match.key}:path`}
                      />
                    );
                  })}
            </svg>
            {matches.map((match) => {
              const style: BracketStyle = {
                left: columnLeft(match.round),
                top: match.ya - SLOT_HEIGHT / 2,
                width: columnWidth,
                height: match.yb - match.ya + SLOT_HEIGHT,
                [`--${prefix}-gap`]: `${match.yb - match.ya - SLOT_HEIGHT}px`,
              };
              return (
                <button
                  type="button"
                  className={`${prefix}__match`}
                  data-key={match.key}
                  data-live={match === judgingMatch ? "" : undefined}
                  data-dim={selectedKey && selectedKey !== match.key ? "" : undefined}
                  aria-pressed={selectedMatch === match}
                  aria-label={matchLabel(match, rounds, judgingMatch)}
                  disabled={!match.a && !match.b}
                  style={style}
                  onClick={() => toggleMatch(match)}
                  onKeyDown={(event) => onMatchKeyDown(event, match)}
                  key={match.key}
                >
                  <BracketSlot match={match} side="a" {...slotProps} />
                  <BracketSlot match={match} side="b" {...slotProps} />
                </button>
              );
            })}
          </>
        )}
        {narrow &&
          rounds.map((round, index) => (
            <div
              className={`${prefix}__list`}
              data-on={index === pendingRound ? "" : undefined}
              key={index}
            >
              <span className={`${prefix}__list-name`}>
                {roundLabel(index, roundCount)}
              </span>
              {round.map((match) => (
                <button
                  type="button"
                  className={`${prefix}__match ${prefix}__match--row`}
                  data-key={match.key}
                  data-live={match === judgingMatch ? "" : undefined}
                  data-dim={selectedKey && selectedKey !== match.key ? "" : undefined}
                  aria-pressed={selectedMatch === match}
                  aria-label={matchLabel(match, rounds, judgingMatch)}
                  disabled={!match.a && !match.b}
                  onClick={() => toggleMatch(match)}
                  onKeyDown={(event) => onListKeyDown(event, match)}
                  key={match.key}
                >
                  <BracketSlot match={match} side="a" {...slotProps} />
                  <BracketSlot match={match} side="b" {...slotProps} />
                </button>
              ))}
            </div>
          ))}
      </div>
      {selectedMatch && (
        <section
          className={`${prefix}__panel`}
          aria-label="Match"
          aria-live="polite"
          style={{ height: panelHeight }}
        >
          <div className={`${prefix}__panel-in`} ref={panelRef} key={selectedMatch.key}>
            <div className={`${prefix}__panel-head`}>
              <span className={`${prefix}__panel-name`}>
                {roundLabel(selectedMatch.round, roundCount)}
                {rounds[selectedMatch.round].length > 1
                  ? ` ${selectedMatch.index + 1}`
                  : ""}
              </span>
              <span className={`${prefix}__panel-meta`}>
                {selectedMatch === judgingMatch
                  ? `${judge ?? "The judge"} is comparing…`
                  : selectedMatch.winner
                    ? judge
                      ? `Judged by ${judge}`
                      : "Judged"
                    : "Not judged yet"}
              </span>
            </div>
            <div className={`${prefix}__versus`}>
              {matchSides.map((side) => {
                const contender = selectedMatch[side];
                const won =
                  Boolean(contender) && selectedMatch.winner?.id === contender?.id;
                const score = selectedMatch.verdict?.scores?.[side === "a" ? 0 : 1];
                return (
                  <div
                    className={`${prefix}__answer`}
                    data-won={won ? "" : undefined}
                    data-lost={contender && selectedMatch.winner && !won ? "" : undefined}
                    key={side}
                  >
                    <div className={`${prefix}__answer-head`}>
                      {contender?.icon && (
                        <span className={`${prefix}__tile`}>{contender.icon}</span>
                      )}
                      <span className={`${prefix}__answer-name`} dir="auto">
                        {contender?.name ?? "To be decided"}
                      </span>
                      {won && <span className={`${prefix}__badge`}>Winner</span>}
                      {score !== undefined && (
                        <span className={`${prefix}__score`}>{score.toFixed(1)}</span>
                      )}
                    </div>
                    {contender?.meta && (
                      <span className={`${prefix}__answer-meta`}>{contender.meta}</span>
                    )}
                    <p
                      className={`${prefix}__output`}
                      dir="auto"
                      tabIndex={contender?.output ? 0 : undefined}
                      aria-label={
                        contender?.output ? `Answer of ${contender.name}` : undefined
                      }
                    >
                      {contender?.output ??
                        (contender
                          ? "No output given."
                          : contenders.length
                            ? "Waits for the round before."
                            : "No attempts yet.")}
                    </p>
                  </div>
                );
              })}
            </div>
            {selectedMatch.verdict?.reason && (
              <p className={`${prefix}__reason`} dir="auto">
                {selectedMatch.verdict.reason}
              </p>
            )}
            {onPick && champion && selectedMatch === rounds[roundCount - 1][0] && (
              <div className={`${prefix}__actions`}>
                <button
                  type="button"
                  className={`${prefix}__btn`}
                  onClick={() => onPick(champion)}
                >
                  {"Use "}
                  {champion.name}
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
const SLOT_HEIGHT = 40;
const ROUND_GAP = 28;
const MIN_ROUND_WIDTH = 176;
const MATCH_GAP = 16;
const CORNER_RADIUS = 6;
const matchSides = ["a", "b"] as const;
export { JudgeBracket };
export type { JudgeBracketProps };
export type { Contender };
export type { JudgeVerdict };
