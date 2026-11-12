"use client";

import "./CommentsPanel.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import {
  type ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
interface CommentAuthor {
  name?: string;
  avatar?: string;
  [field: string]: unknown;
}
interface PanelComment {
  id?: string;
  author?: CommentAuthor;
  createdAt?: string | number | Date;
  text?: string;
  [field: string]: unknown;
}
interface CommentsPanelProps {
  comments: PanelComment[];
  currentUser?: CommentAuthor;
  title?: string;
  onRunEdit?: (comment: PanelComment) => Promise<void> | void;
  onAdd?: (comment: PanelComment) => void;
  onClose?: () => void;
  className?: string;
}
interface Author extends CommentAuthor {
  name: string;
}
interface Comment extends PanelComment {
  id: string;
  author: Author;
  text: string;
  createdAt: string | number | Date;
}
type Filter = "all" | "questions" | "edits";
type EditStatus = "idle" | "running" | "done";
function Avatar({ author }: { author?: CommentAuthor }) {
  const [failed, setFailed] = React.useState(false);
  const person = normalizeAuthor(author);
  const initials = person.name
    .trim()
    .split(/\s+/)
    .map((word) => word.match(/[\p{L}\p{N}]/u)?.[0] ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return person.avatar && !failed ? (
    <img
      className="ui-cpc__avatar"
      src={person.avatar}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <span className="ui-cpc__avatar ui-cpc__avatar--initials" aria-hidden="true">
      {initials}
    </span>
  );
}
function Glyph({
  d,
  solid,
  className,
}: {
  d: string;
  solid?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={["ui-cpc__glyph", className].filter(Boolean).join(" ")}
      data-solid={solid || undefined}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
function CommentsPanel(props: CommentsPanelProps) {
  const { title = "Comments", onClose, currentUser, className } = props;
  const {
    filter,
    setFilter,
    newestFirst,
    setNewestFirst,
    sortOpen,
    setSortOpen,
    editStates,
    setEditStates,
    resolvedIds,
    setResolvedIds,
    draft,
    setDraft,
    now,
    sortRef,
    listRef,
    morphRef,
    counts,
    visibleComments,
    runEdit,
    addComment,
  } = useComments(props);
  return (
    <React.Fragment>
      <section
        className={[`ui-cpc`, className].filter(Boolean).join(` `)}
        aria-label={title}
      >
        <header className="ui-cpc__head">
          <h3 className="ui-cpc__title" title={title} dir="auto">
            {title}
          </h3>
          {onClose && (
            <button
              type="button"
              className="ui-cpc__icon-btn"
              aria-label={`Close ${title.toLowerCase()}`}
              onClick={onClose}
            >
              <Glyph d={iconPaths.close} />
            </button>
          )}
        </header>
        <div className="ui-cpc__bar">
          <div className="ui-cpc__tabs" role="tablist" aria-label="Filter comments">
            {FILTERS.map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={filter === tab}
                className="ui-cpc__tab"
                onClick={() => setFilter(tab)}
                key={tab}
              >
                {
                  {
                    all: `All`,
                    questions: `Questions`,
                    edits: `Edits`,
                  }[tab]
                }
                {tab === `edits` && counts.edits > 0 && (
                  <span
                    className="ui-cpc__count"
                    children={commentCount.format(counts.edits)}
                    key={counts.edits}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="ui-cpc__sort" ref={sortRef}>
            <button
              type="button"
              className="ui-cpc__icon-btn"
              aria-label="Sort comments"
              aria-haspopup="menu"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((previousOpen) => !previousOpen)}
            >
              <Glyph d={iconPaths.sort} />
            </button>
            {sortOpen && (
              <div className="ui-cpc__menu" role="menu">
                {[
                  {
                    label: `Newest first`,
                    value: true,
                  },
                  {
                    label: `Oldest first`,
                    value: false,
                  },
                ].map((sortOption) => (
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={newestFirst === sortOption.value}
                    className="ui-cpc__menu-item"
                    onClick={() => {
                      setNewestFirst(sortOption.value);
                      setSortOpen(false);
                    }}
                    key={sortOption.label}
                  >
                    {sortOption.label}
                    {newestFirst === sortOption.value && (
                      <Glyph d={iconPaths.check} className="ui-cpc__menu-check" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="ui-cpc__morph" ref={morphRef}>
          <ul className="ui-cpc__list" ref={listRef} aria-live="polite">
            {visibleComments.length === 0 && (
              <li className="ui-cpc__empty">
                {filter === `questions`
                  ? `No open questions.`
                  : filter === `edits`
                    ? `No edits to run.`
                    : `No comments yet.`}
              </li>
            )}
            {visibleComments.map((comment) => {
              let editCommand = isEditCommand(comment),
                editStatus = editStates[comment.id] ?? `idle`,
                resolved = resolvedIds.has(comment.id);
              return (
                <li
                  className="ui-cpc__item"
                  data-resolved={resolved || undefined}
                  key={comment.id}
                >
                  <div className="ui-cpc__meta">
                    <Avatar author={comment.author} />
                    <span className="ui-cpc__name" title={comment.author.name} dir="auto">
                      {comment.author.name}
                    </span>
                    <time
                      className="ui-cpc__time"
                      dateTime={commentDate(comment.createdAt).toISOString()}
                    >
                      {relativeCommentTime(Number(comment.createdAt), now)}
                    </time>
                    <button
                      type="button"
                      className="ui-cpc__resolve"
                      aria-pressed={resolved}
                      aria-label={resolved ? `Reopen comment` : `Resolve comment`}
                      title={resolved ? `Reopen` : `Resolve`}
                      onClick={() =>
                        setResolvedIds((previousIds) => {
                          const nextIds = new Set(previousIds);
                          if (nextIds.has(comment.id)) nextIds.delete(comment.id);
                          else nextIds.add(comment.id);
                          return nextIds;
                        })
                      }
                    >
                      <Glyph d={iconPaths.resolve} />
                    </button>
                  </div>
                  <p className="ui-cpc__text" dir="auto">
                    {editCommand ? (
                      <React.Fragment>
                        <span className="ui-cpc__command">{`/Edit`}</span>
                        {` `}
                        {comment.text.trim().replace(/^\/edit\s*/i, ``)}
                      </React.Fragment>
                    ) : (
                      comment.text
                    )}
                  </p>
                  {editCommand && !resolved && (
                    <div className="ui-cpc__actions">
                      {editStatus === `done` ? (
                        <React.Fragment>
                          <span className="ui-cpc__done" role="status">
                            <Glyph d={iconPaths.checkSolid} solid={true} />
                            {`Edit applied`}
                          </span>
                          <button
                            type="button"
                            className="ui-cpc__link"
                            onClick={() =>
                              setEditStates((previousStates) => ({
                                ...previousStates,
                                [comment.id]: `idle`,
                              }))
                            }
                          >{`Undo`}</button>
                        </React.Fragment>
                      ) : (
                        <button
                          type="button"
                          className="ui-cpc__btn"
                          disabled={editStatus === `running`}
                          onClick={() => runEdit(comment)}
                        >
                          {editStatus === `running` ? (
                            <React.Fragment>
                              <span className="ui-cpc__spinner" aria-hidden="true" />
                              <span
                                className="ui-cpc__shimmer"
                                data-text="Running…"
                              >{`Running…`}</span>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <Glyph d={iconPaths.play} solid={true} />
                              {`Run edit`}
                            </React.Fragment>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <form
          className="ui-cpc__composer"
          onSubmit={(event) => {
            event.preventDefault();
            addComment();
          }}
        >
          <Avatar author={currentUser} />
          <input
            className="ui-cpc__input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add a comment or /edit…"
            aria-label="Add a comment"
          />
          <button
            type="submit"
            className="ui-cpc__send"
            aria-label="Send comment"
            disabled={!draft.trim()}
          >
            <Glyph d={iconPaths.up} />
          </button>
        </form>
      </section>
    </React.Fragment>
  );
}
function relativeCommentTime(createdAt: number, now: number): string {
  const seconds = Math.max(0, Math.round((now - createdAt) / 1000));
  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days < 30
    ? `${days}d ago`
    : days < 365
      ? `${Math.round(days / 30)}mo ago`
      : `${Math.round(days / 365)}y ago`;
}
function normalizeAuthor(author: CommentAuthor | undefined): Author {
  return { ...author, name: author?.name ?? "" };
}
function normalizeComment(comment: PanelComment): Comment {
  const createdAt = comment.createdAt;
  return {
    ...comment,
    id: comment.id ?? "",
    author: normalizeAuthor(comment.author),
    text: comment.text ?? "",
    createdAt:
      typeof createdAt === "number" ||
      typeof createdAt === "string" ||
      createdAt instanceof Date
        ? createdAt
        : 0,
  };
}
function useListHeight(listRef: RefObject<HTMLUListElement | null>) {
  const morphRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const container = morphRef.current;
    const list = listRef.current;
    if (!container || !list) return;
    const measure = () => {
      container.style.height = `${list.offsetHeight}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    const frame = requestAnimationFrame(() => container.setAttribute("data-smooth", ""));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [listRef]);
  return morphRef;
}
function useComments({ comments, currentUser, onRunEdit, onAdd }: CommentsPanelProps) {
  const [entries, setEntries] = useState(() => comments.map(normalizeComment));
  const [filter, setFilter] = useState<Filter>("all");
  const [newestFirst, setNewestFirst] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [editStates, setEditStates] = useState<Record<string, EditStatus>>({});
  const [resolvedIds, setResolvedIds] = useState(new Set<string>());
  const [draft, setDraft] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const sortRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const morphRef = useListHeight(listRef);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!sortOpen) return;
    function closeOutside(event: PointerEvent) {
      if (!sortRef.current?.contains(event.target as Node | null)) setSortOpen(false);
    }
    window.addEventListener("pointerdown", closeOutside);
    return () => window.removeEventListener("pointerdown", closeOutside);
  }, [sortOpen]);
  const unresolved = entries.filter((comment) => !resolvedIds.has(comment.id));
  const counts = {
    all: unresolved.length,
    questions: unresolved.filter(isQuestion).length,
    edits: unresolved.filter(
      (comment) => isEditCommand(comment) && editStates[comment.id] !== "done",
    ).length,
  };
  const visibleComments = useMemo(
    () =>
      entries
        .filter(
          (comment) =>
            filter === "all" ||
            (filter === "questions" ? isQuestion(comment) : isEditCommand(comment)),
        )
        .sort(
          (before, after) =>
            (Number(after.createdAt) - Number(before.createdAt)) * (newestFirst ? 1 : -1),
        ),
    [entries, filter, newestFirst],
  );
  async function runEdit(comment: Comment) {
    setEditStates((previous) => ({ ...previous, [comment.id]: "running" }));
    try {
      await (onRunEdit
        ? onRunEdit(comment)
        : new Promise<void>((resolve) => setTimeout(resolve, 1100)));
      setEditStates((previous) => ({ ...previous, [comment.id]: "done" }));
    } catch {
      setEditStates((previous) => ({ ...previous, [comment.id]: "idle" }));
    }
  }
  function addComment() {
    const text = draft.trim();
    if (!text) return;
    const comment: Comment = {
      id: `c-${Date.now()}`,
      author: normalizeAuthor(currentUser),
      createdAt: Date.now(),
      text,
    };
    setEntries((previous) => [comment, ...previous]);
    setDraft("");
    setFilter("all");
    setNewestFirst(true);
    setNow(Date.now());
    onAdd?.(comment);
    requestAnimationFrame(() =>
      listRef.current?.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }
  return {
    filter,
    setFilter,
    newestFirst,
    setNewestFirst,
    sortOpen,
    setSortOpen,
    editStates,
    setEditStates,
    resolvedIds,
    setResolvedIds,
    draft,
    setDraft,
    now,
    sortRef,
    listRef,
    morphRef,
    counts,
    visibleComments,
    runEdit,
    addComment,
  };
}
const commentCount = new Intl.NumberFormat("en");
const isEditCommand = (comment: Comment) => /^\/edit\b\s*\S/i.test(comment.text.trim());
const isQuestion = (comment: Comment) =>
  !isEditCommand(comment) && comment.text.trim().endsWith("?");
const commentDate = (value: Comment["createdAt"]) =>
  new Date(value instanceof Date ? value.getTime() : value);
const FILTERS = ["all", "questions", "edits"] as const;
const iconPaths = {
  close: `M4.5 4.5l7 7M11.5 4.5l-7 7`,
  sort: `M2.5 4.5h11M4.5 8h7M6.5 11.5h3`,
  check: `m3.5 8.5 3 3 6-7`,
  resolve: `M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM5.5 8.2l1.7 1.7 3.3-3.8`,
  checkSolid: `M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Zm8.9-1.2a.5.5 0 0 0-.8-.6L7.44 9.23 6.35 8.15a.5.5 0 1 0-.7.7l1.5 1.5a.5.5 0 0 0 .76-.06l2.5-3.5Z`,
  play: `M5 3.6a.8.8 0 0 1 1.2-.7l6.3 3.9a1.4 1.4 0 0 1 0 2.4l-6.3 3.9a.8.8 0 0 1-1.2-.7V3.6Z`,
  up: `M8 12.5v-9M4 7.5l4-4 4 4`,
};
export { CommentsPanel };
export type { PanelComment };
export type { CommentAuthor };
export type { CommentsPanelProps };
