"use client";

import "./MemoryPanel.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useEffect,
  useRef,
  useState,
  type RefObject,
  useId,
  type KeyboardEvent,
  type SVGProps,
  memo,
  type ReactNode,
  type CSSProperties,
} from "react";
/** Additional application fields survive edits, pause changes, and undo. */
interface Memory {
  id?: string;
  text?: string;
  category?: string;
  source?: string;
  date?: string;
  paused?: boolean;
  [field: string]: unknown;
}
interface MemoryPanelProps {
  memories: Memory[];
  onChange?: (memories: Memory[]) => void;
  onAdd?: (memory: Memory) => void;
  onEdit?: (id: string, text: string) => void;
  onPause?: (id: string, paused: boolean) => void;
  onForget?: (id: string) => void;
  onRestore?: (memory: Memory) => void;
  enabled?: boolean;
  defaultEnabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  categories: string[];
  title?: string;
  maxHeight?: number;
  undoFor?: number;
  addedSource?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
interface MemoryRecord {
  id: string;
  text: string;
  category: string;
  source?: string;
  date?: string;
  paused?: boolean;
  original: Memory;
}
interface ForgottenMemory {
  memory: MemoryRecord;
  index: number;
  key: number;
}
interface MemoryCounts {
  total: number;
  paused: number;
}
interface MemoryActions {
  setHot(id: string | null): void;
  setDraft(text: string): void;
  startEdit(memory: MemoryRecord): void;
  saveEdit(): void;
  cancelEdit(): void;
  togglePause(memory: MemoryRecord): void;
  forget(memory: MemoryRecord): Promise<void>;
}
type MemoryIconName =
  | "edit"
  | "pause"
  | "play"
  | "forget"
  | "undo"
  | "add"
  | "search"
  | "close"
  | "info"
  | "arrow";
interface MemoryRowProps {
  memory: MemoryRecord;
  open: boolean;
  leaving: boolean;
  hot: boolean;
  editing: boolean;
  draft: string;
  actions: RefObject<MemoryActions>;
  prefix: string;
  clean: boolean;
}
interface CaptionFrame {
  id: string;
  node: ReactNode;
}
/** Manage remembered facts with category filters, inline editing, pause, and undo. */
function MemoryPanel(props: MemoryPanelProps) {
  return <MemoryPanelView {...props} clean={false} />;
}
function memoryRecord(memory: Memory): MemoryRecord {
  return {
    ...memory,
    id: memory.id ?? "",
    text: memory.text ?? "",
    category: memory.category ?? "",
    original: memory,
  };
}
function normalizeMemoryText(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}
function memoryCategories(memories: MemoryRecord[], configured: string[] = []): string[] {
  const categories = [...configured];
  for (const memory of memories)
    if (!categories.includes(memory.category)) categories.push(memory.category);
  return categories;
}
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function fitTextarea(element: HTMLTextAreaElement | null): void {
  if (element) {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }
}
function focusTextarea(
  element: HTMLTextAreaElement | null,
  open: boolean,
  selectEnd = false,
): void {
  fitTextarea(element);
  if (element && open && !element.dataset.focused) {
    element.dataset.focused = "1";
    element.focus({ preventScroll: true });
    if (selectEnd) element.setSelectionRange(element.value.length, element.value.length);
  }
  if (element && !open) delete element.dataset.focused;
}
function useMemoryCounts(total: number, paused: number): MemoryCounts {
  const [displayed, setDisplayed] = useState({ total, paused });
  const current = useRef(displayed);
  useEffect(() => {
    const target = { total, paused };
    const start = current.current;
    if (prefersReducedMotion() || (start.total === total && start.paused === paused)) {
      current.current = target;
      setDisplayed(target);
      return;
    }
    const startTime = performance.now();
    let frame = 0;
    function tick(now: number) {
      const progress = Math.min(1, (now - startTime) / 520);
      const eased = 1 - (1 - progress) ** 4;
      const next = {
        total: start.total + (total - start.total) * eased,
        paused: start.paused + (paused - start.paused) * eased,
      };
      current.current = next;
      setDisplayed(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [total, paused]);
  return displayed;
}
/** Compact category rows fade at the right edge only while more content can be scrolled into view. */
function useCategoryOverflow(
  ref: RefObject<HTMLDivElement | null>,
  enabled: boolean,
): boolean {
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;
    const measure = () =>
      setOverflow(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const mutation = new MutationObserver(measure);
    mutation.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    element.addEventListener("scroll", measure, { passive: true });
    return () => {
      resize.disconnect();
      mutation.disconnect();
      element.removeEventListener("scroll", measure);
    };
  }, [ref, enabled]);
  return overflow;
}
function useMemoryPanel(props: MemoryPanelProps, clean: boolean) {
  const {
    memories: supplied,
    onChange,
    onAdd,
    onEdit,
    onPause,
    onForget,
    onRestore,
    enabled: controlledEnabled,
    defaultEnabled = true,
    onEnabledChange,
    categories: configured,
    undoFor = 5000,
    addedSource = "You added",
  } = props;
  const prefix = clean ? "ui-mpc" : "ui-mp";
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null),
    listRef = useRef<HTMLDivElement>(null),
    chipsRef = useRef<HTMLDivElement>(null),
    categoriesRef = useRef<HTMLDivElement>(null);
  const chipsOverflow = useCategoryOverflow(chipsRef, clean),
    categoriesOverflow = useCategoryOverflow(categoriesRef, clean);
  const [localMemories, setLocalMemories] = useState(supplied);
  const rawMemories = onChange ? supplied : localMemories;
  const current = useRef(rawMemories);
  current.current = rawMemories;
  const memories = rawMemories.map(memoryRecord);
  function update(next: Memory[]) {
    current.current = next;
    if (!onChange) setLocalMemories(next);
    onChange?.(next);
  }
  const [localEnabled, setLocalEnabled] = useState(defaultEnabled);
  const enabled = controlledEnabled ?? localEnabled;
  function setEnabled(next: boolean) {
    setLocalEnabled(next);
    onEnabledChange?.(next);
  }
  const [leaving, setLeaving] = useState<Record<string, boolean>>({});
  const [entering, setEntering] = useState<Record<string, boolean>>({});
  const [category, setCategory] = useState<string | null>(null),
    [searching, setSearching] = useState(false),
    [query, setQuery] = useState(""),
    [hotId, setHot] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null),
    [draft, setDraft] = useState(""),
    [adding, setAdding] = useState(false),
    [newText, setNewText] = useState(""),
    [newCategory, setNewCategory] = useState<string | null>(null);
  const [forgotten, setForgotten] = useState<ForgottenMemory | null>(null);
  const pendingScroll = useRef<string | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (!Object.keys(entering).length) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setEntering({}));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [entering]);
  useEffect(() => {
    if (Object.keys(entering).length || !pendingScroll.current) return;
    const memoryId = pendingScroll.current;
    pendingScroll.current = null;
    const timer = window.setTimeout(() => {
      const list = listRef.current,
        item = list?.querySelector<HTMLElement>(
          `[data-memory="${CSS.escape(memoryId)}"]`,
        );
      if (!list || !item) return;
      const top = item.offsetTop - list.offsetTop;
      if (
        top < list.scrollTop ||
        top + item.offsetHeight > list.scrollTop + list.clientHeight
      )
        list.scrollTo({
          top: top - 8,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [entering]);
  useEffect(() => {
    if (!forgotten) return;
    const timer = window.setTimeout(() => setForgotten(null), undoFor);
    return () => window.clearTimeout(timer);
  }, [forgotten, undoFor]);
  const categories = memoryCategories(memories, configured);
  const active = memories.filter((memory) => !leaving[memory.id]);
  const pausedCount = active.filter((memory) => memory.paused).length;
  const search = query.trim().toLowerCase();
  const matches = (memory: MemoryRecord) =>
    (category === null || memory.category === category) &&
    (!search ||
      memory.text.toLowerCase().includes(search) ||
      memory.category.toLowerCase().includes(search));
  const isVisible = (memory: MemoryRecord) =>
    matches(memory) && !leaving[memory.id] && !entering[memory.id];
  const hasResults = memories.some((memory) => matches(memory) && !leaving[memory.id]);
  const hot = memories.find((memory) => memory.id === hotId) ?? null;
  const animated = useMemoryCounts(active.length, pausedCount);
  const total = Math.round(animated.total),
    paused = Math.round(animated.paused);
  function focus(selector: string) {
    window.requestAnimationFrame(() =>
      rootRef.current
        ?.querySelector<HTMLElement>(selector)
        ?.focus({ preventScroll: true }),
    );
  }
  function focusEdit(memoryId: string) {
    focus(`[data-memory="${CSS.escape(memoryId)}"] [data-act="edit"]`);
  }
  async function forget(memory: MemoryRecord) {
    if (leaving[memory.id]) return;
    if (editingId === memory.id) setEditingId(null);
    setHot(null);
    setLeaving((previous) => ({ ...previous, [memory.id]: true }));
    if (!prefersReducedMotion())
      await new Promise<void>((resolve) => window.setTimeout(resolve, 320));
    if (!mounted.current) return;
    const index = current.current.findIndex((item) => item.id === memory.id);
    update(current.current.filter((item) => item.id !== memory.id));
    onForget?.(memory.id);
    setLeaving((previous) => {
      const next = { ...previous };
      delete next[memory.id];
      return next;
    });
    setForgotten({ memory, index, key: Date.now() });
  }
  function restore() {
    if (!forgotten) return;
    const { memory, index } = forgotten;
    const next = [...current.current];
    next.splice(Math.max(0, Math.min(index, next.length)), 0, memory.original);
    setEntering({ [memory.id]: true });
    pendingScroll.current = memory.id;
    if (category !== null && category !== memory.category) setCategory(null);
    update(next);
    onRestore?.(memory.original);
    setForgotten(null);
  }
  function togglePause(memory: MemoryRecord) {
    update(
      current.current.map((item) =>
        item.id === memory.id ? { ...item, paused: !item.paused } : item,
      ),
    );
    onPause?.(memory.id, !memory.paused);
  }
  function startEdit(memory: MemoryRecord) {
    setAdding(false);
    setDraft(memory.text);
    setEditingId(memory.id);
  }
  function saveEdit() {
    const memoryId = editingId,
      text = normalizeMemoryText(draft);
    setEditingId(null);
    if (!memoryId) return;
    const previous = current.current.find((item) => item.id === memoryId);
    if (previous && text && text !== previous.text) {
      update(
        current.current.map((item) => (item.id === memoryId ? { ...item, text } : item)),
      );
      onEdit?.(memoryId, text);
      focusEdit(memoryId);
    }
  }
  function cancelEdit() {
    const memoryId = editingId;
    setEditingId(null);
    if (memoryId) focusEdit(memoryId);
  }
  const selectedNewCategory = newCategory ?? category ?? categories[0] ?? "General";
  function startAdd() {
    setEditingId(null);
    setNewText("");
    setNewCategory(category ?? categories[0] ?? "General");
    setAdding(true);
  }
  function cancelAdd() {
    setAdding(false);
    focus(`.${prefix}__add`);
  }
  function add() {
    const text = normalizeMemoryText(newText);
    if (!text) return;
    const memory: Memory = {
      id: `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      text,
      category: selectedNewCategory,
      source: addedSource,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
    const memoryId = memory.id!;
    setEntering({ [memoryId]: true });
    pendingScroll.current = memoryId;
    if (category !== null && category !== memory.category) setCategory(null);
    if (search) setQuery("");
    update([...current.current, memory]);
    onAdd?.(memory);
    setNewText("");
    cancelAdd();
  }
  function openSearch() {
    setCategory(null);
    setSearching(true);
  }
  function closeSearch() {
    setSearching(false);
    setQuery("");
    focus(`.${prefix}__search-open`);
  }
  const actions = useRef<MemoryActions>({
    setHot,
    setDraft,
    startEdit,
    saveEdit,
    cancelEdit,
    togglePause,
    forget,
  });
  actions.current = {
    setHot,
    setDraft,
    startEdit,
    saveEdit,
    cancelEdit,
    togglePause,
    forget,
  };
  const filters = [
    null,
    ...categories.filter((item) => memories.some((memory) => memory.category === item)),
  ];
  function moveFilter(event: KeyboardEvent<HTMLDivElement>) {
    if (
      !["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(
        event.key,
      )
    )
      return;
    event.preventDefault();
    const currentIndex = filters.indexOf(category);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? filters.length - 1
          : (currentIndex +
              (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) +
              filters.length) %
            filters.length;
    setCategory(filters[next]);
    const radio =
      event.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')[next];
    radio?.focus();
    radio?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  function moveNewCategory(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    const choices = categories.length ? categories : ["General"];
    const next =
      (choices.indexOf(selectedNewCategory) +
        (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) +
        choices.length) %
      choices.length;
    setNewCategory(choices[next]);
    event.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
  }
  return {
    id,
    prefix,
    rootRef,
    listRef,
    chipsRef,
    categoriesRef,
    chipsOverflow,
    categoriesOverflow,
    memories,
    active,
    enabled,
    setEnabled,
    leaving,
    category,
    setCategory,
    searching,
    query,
    setQuery,
    hotId,
    setHot,
    editingId,
    draft,
    adding,
    newText,
    setNewText,
    setNewCategory,
    forgotten,
    categories,
    pausedCount,
    search,
    matches,
    isVisible,
    hasResults,
    hot,
    total,
    paused,
    restore,
    selectedNewCategory,
    startAdd,
    cancelAdd,
    add,
    openSearch,
    closeSearch,
    actions,
    filters,
    moveFilter,
    moveNewCategory,
  };
}
function MemoryIcon({ name, clean }: { name: MemoryIconName; clean: boolean }) {
  if (clean)
    return (
      <svg
        viewBox="0 0 16 16"
        className="ui-mpc__glyph"
        data-solid={["pause", "play", "info"].includes(name) || undefined}
        aria-hidden="true"
      >
        <path d={cleanPaths[name]} fillRule="evenodd" />
      </svg>
    );
  const size = ["undo", "close", "arrow"].includes(name) ? 12 : 14;
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      {name === "search" && <circle cx="6.2" cy="6.2" r="3.6" {...stroke} />}
      {name === "info" && <circle cx="7" cy="7" r="5.2" {...stroke} />}
      <path
        d={defaultPaths[name]}
        {...stroke}
        strokeWidth={name === "pause" || name === "info" ? 1.6 : 1.4}
      />
    </svg>
  );
}
function MemoryFooter({
  panel,
  clean,
  action,
}: {
  panel: ReturnType<typeof useMemoryPanel>;
  clean: boolean;
  action: MemoryPanelProps["action"];
}) {
  const {
    prefix,
    total,
    paused,
    pausedCount,
    forgotten,
    editingId,
    adding,
    hot,
    enabled,
    restore,
  } = panel;
  let id = "rest";
  let caption: ReactNode = (
    <>
      <b>{memoryNumber.format(total)}</b> {total === 1 ? "memory" : "memories"}
      {(paused > 0 || pausedCount > 0) && (
        <>
          {" · "}
          {memoryNumber.format(paused)}
          {" paused"}
        </>
      )}
    </>
  );
  if (forgotten) {
    id = `forgot-${forgotten.key}`;
    caption = (
      <span className={`${prefix}__forgot`}>
        <span className={`${prefix}__flat`}>{"Forgot “"}</span>
        <b className={`${prefix}__quote`}>{forgotten.memory.text}</b>
        <span className={`${prefix}__flat`}>{"”"}</span>
      </span>
    );
  } else if (editingId) {
    id = "editing";
    caption = "Enter to save · Esc to cancel";
  } else if (adding) {
    id = "adding";
    caption = "Pick a category · Enter to save";
  } else if (hot) {
    id = `hot-${hot.id}-${+!!hot.paused}-${+!!enabled}`;
    caption = (
      <>
        <b>{hot.category || "Other"}</b>
        {" ·"}{" "}
        {enabled
          ? hot.paused
            ? "paused, not used in answers"
            : "used in answers"
          : "memory is off"}
      </>
    );
  } else if (!enabled) {
    id = "off";
    caption = "Memory is off";
  }
  return (
    <div className={`${prefix}__foot`}>
      <span className={`${prefix}__caption`} aria-live="polite">
        <MemoryCaption prefix={prefix} id={id}>
          {caption}
        </MemoryCaption>
      </span>
      {forgotten ? (
        <button
          key={`undo-${forgotten.key}`}
          type="button"
          className={`${prefix}__action ${prefix}__action--undo`}
          onClick={restore}
        >
          <MemoryIcon name="undo" clean={clean} />
          Undo
        </button>
      ) : (
        action && (
          <button
            key="action"
            type="button"
            className={`${prefix}__action`}
            title={action.label}
            onClick={action.onClick}
          >
            <span className={`${prefix}__action-label`}>{action.label}</span>
            <MemoryIcon name="arrow" clean={clean} />
          </button>
        )
      )}
    </div>
  );
}
function MemoryCaption({
  prefix,
  id,
  children,
}: {
  prefix: string;
  id: string;
  children: ReactNode;
}) {
  const previous = useRef<CaptionFrame>({ id, node: children });
  const [currentId, setCurrentId] = useState(id);
  const [outgoing, setOutgoing] = useState<CaptionFrame | null>(null);
  if (currentId !== id) {
    setCurrentId(id);
    setOutgoing(previous.current);
  }
  previous.current = { id, node: children };
  useEffect(() => {
    if (!outgoing) return;
    const timer = window.setTimeout(() => setOutgoing(null), 260);
    return () => window.clearTimeout(timer);
  }, [outgoing]);
  return (
    <span className={`${prefix}__swap`}>
      {outgoing && (
        <span
          key={`out-${outgoing.id}`}
          className={`${prefix}__swap-item`}
          data-out=""
          aria-hidden="true"
        >
          {outgoing.node}
        </span>
      )}
      <span key={id} className={`${prefix}__swap-item`}>
        {children}
      </span>
    </span>
  );
}
function MemoryPanelView(
  props: MemoryPanelProps & {
    clean: boolean;
  },
) {
  const { clean, title = "Memory", maxHeight = 360, action, className } = props;
  const panel = useMemoryPanel(props, clean);
  const {
    prefix,
    id,
    rootRef,
    listRef,
    chipsRef,
    categoriesRef,
    chipsOverflow,
    categoriesOverflow,
    memories,
    active,
    enabled,
    setEnabled,
    leaving,
    category,
    setCategory,
    searching,
    query,
    setQuery,
    hotId,
    setHot,
    editingId,
    draft,
    adding,
    newText,
    setNewText,
    setNewCategory,
    categories,
    search,
    matches,
    isVisible,
    hasResults,
    hot,
    total,
    selectedNewCategory,
    startAdd,
    cancelAdd,
    add,
    openSearch,
    closeSearch,
    actions,
    filters,
    moveFilter,
    moveNewCategory,
  } = panel;
  const footer = <MemoryFooter panel={panel} clean={clean} action={action} />;
  const style: CSSProperties & Record<string, string> = {
    [`${prefix === "ui-mpc" ? "--ui-mpc" : "--ui-mp"}-max`]: `${maxHeight}px`,
  };
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      role="group"
      aria-labelledby={`${id}-title`}
      data-off={enabled ? undefined : ""}
      style={style}
    >
      <div className={`${prefix}__card`}>
        <div className={`${prefix}__head`}>
          <span id={`${id}-title`} className={`${prefix}__title`} title={title}>
            {title}
          </span>
          <span className={`${prefix}__count`} aria-hidden="true">
            {memoryNumber.format(total)}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-controls={`${id}-note`}
            className={`${prefix}__switch`}
            onClick={() => setEnabled(!enabled)}
          >
            <span className={`${prefix}__switch-label`}>Use memory</span>
            <span className={`${prefix}__track`} aria-hidden="true">
              <span className={`${prefix}__knob`} />
            </span>
          </button>
        </div>
        <div
          id={`${id}-note`}
          className={`${prefix}__fold`}
          data-open={enabled ? undefined : ""}
          inert={enabled}
        >
          <div className={`${prefix}__clip`}>
            <p className={`${prefix}__note`}>
              <MemoryIcon name="info" clean={clean} />
              <span>
                {
                  "The assistant won't use or save memories in new chats. Nothing here is deleted."
                }
              </span>
            </p>
          </div>
        </div>
        <div className={`${prefix}__filters`} data-searching={searching ? "" : undefined}>
          <div
            ref={chipsRef}
            className={`${prefix}__chips`}
            data-more={clean && chipsOverflow ? "" : undefined}
            role="radiogroup"
            aria-label="Category"
            inert={searching}
            onKeyDown={moveFilter}
          >
            {filters.map((filter) => {
              const count = active.filter(
                (memory) => filter === null || memory.category === filter,
              ).length;
              const selected = category === filter;
              return (
                <button
                  key={filter ?? "#all"}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  className={`${prefix}__chip`}
                  data-linked={
                    filter !== null && hot?.category === filter ? "" : undefined
                  }
                  onClick={() => setCategory(filter)}
                >
                  {filter === null ? "All" : filter || "Other"}
                  <span className={`${prefix}__chip-count`}>
                    {memoryNumber.format(count)}
                  </span>
                </button>
              );
            })}
          </div>
          <div className={`${prefix}__search`} inert={!searching}>
            <MemoryIcon name="search" clean={clean} />
            <input
              className={`${prefix}__input`}
              type="text"
              value={query}
              placeholder="Search memories"
              aria-label="Search memories"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.stopPropagation();
                  closeSearch();
                }
              }}
              ref={(element) => {
                if (
                  element &&
                  searching &&
                  document.activeElement !== element &&
                  !element.dataset.focused
                ) {
                  element.dataset.focused = "1";
                  element.focus({ preventScroll: true });
                }
                if (element && !searching) delete element.dataset.focused;
              }}
            />
            <button
              type="button"
              className={`${prefix}__icon`}
              aria-label="Close search"
              onClick={closeSearch}
            >
              <MemoryIcon name="close" clean={clean} />
            </button>
          </div>
          <button
            type="button"
            className={`${prefix}__icon ${prefix}__search-open`}
            aria-label="Search memories"
            aria-expanded={searching}
            inert={searching}
            onClick={openSearch}
          >
            <MemoryIcon name="search" clean={clean} />
          </button>
        </div>
        <div
          ref={listRef}
          className={`${prefix}__list`}
          onPointerLeave={() => setHot(null)}
        >
          {categories.map((group) => {
            const items = memories.filter((memory) => memory.category === group);
            if (!items.length) return null;
            const visible = items.some(
              (memory) => matches(memory) && !leaving[memory.id],
            );
            return (
              <section
                key={group}
                className={`${prefix}__fold`}
                data-open={visible ? "" : undefined}
                inert={!visible}
                aria-label={group || "Other"}
              >
                <div className={`${prefix}__clip`}>
                  <h3 className={`${prefix}__group`} dir="auto">
                    {group || "Other"}
                  </h3>
                  <ul className={`${prefix}__items`}>
                    {items.map((memory) => (
                      <MemoryRow_MemoryRow
                        key={memory.id}
                        memory={memory}
                        open={isVisible(memory)}
                        leaving={!!leaving[memory.id]}
                        hot={hotId === memory.id}
                        editing={editingId === memory.id}
                        draft={editingId === memory.id ? draft : ""}
                        actions={actions}
                        prefix={prefix}
                        clean={clean}
                      />
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
          <div
            className={`${prefix}__fold`}
            data-open={hasResults ? undefined : ""}
            inert={hasResults}
          >
            <div className={`${prefix}__clip`}>
              <p className={`${prefix}__empty`} dir="auto">
                {memories.length === 0
                  ? "Nothing remembered yet"
                  : search
                    ? `No memory mentions “${query.trim()}”`
                    : "No memories here"}
              </p>
            </div>
          </div>
        </div>
        <div className={`${prefix}__bottom`}>
          <div
            className={`${prefix}__fold`}
            data-open={adding ? undefined : ""}
            inert={adding}
          >
            <div className={`${prefix}__clip`}>
              <button
                type="button"
                className={`${prefix}__add`}
                aria-expanded={adding}
                aria-controls={`${id}-new`}
                onClick={startAdd}
              >
                <MemoryIcon name="add" clean={clean} />
                New memory
              </button>
            </div>
          </div>
          <div
            id={`${id}-new`}
            className={`${prefix}__fold`}
            data-open={adding ? "" : undefined}
            inert={!adding}
          >
            <div className={`${prefix}__clip`}>
              <div className={`${prefix}__new`}>
                <textarea
                  className={`${prefix}__edit ${prefix}__edit--new`}
                  value={newText}
                  rows={1}
                  placeholder="Something the assistant should remember…"
                  dir="auto"
                  aria-label="New memory"
                  ref={(element) => focusTextarea(element, adding)}
                  onChange={(event) => {
                    setNewText(event.target.value);
                    fitTextarea(event.target);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      add();
                    } else if (event.key === "Escape") {
                      event.stopPropagation();
                      cancelAdd();
                    }
                  }}
                />
                <div className={`${prefix}__new-row`}>
                  <div
                    ref={categoriesRef}
                    className={`${prefix}__cats`}
                    data-more={clean && categoriesOverflow ? "" : undefined}
                    role="radiogroup"
                    aria-label="Category of the new memory"
                    onKeyDown={moveNewCategory}
                  >
                    {(categories.length ? categories : ["General"]).map((group) => (
                      <button
                        key={group}
                        type="button"
                        role="radio"
                        aria-checked={selectedNewCategory === group}
                        tabIndex={selectedNewCategory === group ? 0 : -1}
                        className={`${prefix}__cat`}
                        title={group || "Other"}
                        onClick={() => setNewCategory(group)}
                      >
                        <span className={`${prefix}__cat-label`} dir="auto">
                          {group || "Other"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <span className={`${prefix}__acts ${prefix}__acts--edit`}>
                    <button
                      type="button"
                      className={`${prefix}__text-btn`}
                      onClick={cancelAdd}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={`${prefix}__text-btn ${prefix}__text-btn--main`}
                      disabled={!newText.trim()}
                      onClick={add}
                    >
                      Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {clean && footer}
      </div>
      {!clean && footer}
    </div>
  );
}
const memoryNumber = new Intl.NumberFormat("en");
const cleanPaths: Record<MemoryIconName, string> = {
  edit: "M9.8 3.7l2.5 2.5M3 13l.6-3 6.9-6.9a1.4 1.4 0 0 1 2 0l.4.4a1.4 1.4 0 0 1 0 2L6 12.4 3 13Z",
  pause:
    "M4.5 3.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-9Zm4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-9Z",
  play: "M4.5 3.4v9.2a.9.9 0 0 0 1.37.77l7.4-4.6a.9.9 0 0 0 0-1.54l-7.4-4.6a.9.9 0 0 0-1.37.77Z",
  forget:
    "M2.5 4.5h11M6.5 4.5V3.2a.7.7 0 0 1 .7-.7h1.6a.7.7 0 0 1 .7.7v1.3M4 4.5l.6 8a1.1 1.1 0 0 0 1.1 1h4.6a1.1 1.1 0 0 0 1.1-1l.6-8M6.8 7.2v3.6M9.2 7.2v3.6",
  undo: "M5.5 3.5 3 6l2.5 2.5M3.2 6h6.3a3.5 3.5 0 0 1 0 7H7",
  add: "M8 3.5v9M3.5 8h9",
  search: "M7.2 11.9a4.7 4.7 0 1 0 0-9.4 4.7 4.7 0 0 0 0 9.4ZM10.6 10.6l2.9 2.9",
  close: "m4.5 4.5 7 7m0-7-7 7",
  info: "M8 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 5.4a.6.6 0 0 0-.6.6v3.6a.6.6 0 0 0 1.2 0V7.5a.6.6 0 0 0-.6-.6Zm0-2.3a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Z",
  arrow: "M3.5 8h9M9 4.5 12.5 8 9 11.5",
};
const defaultPaths: Record<MemoryIconName, string> = {
  edit: "M8.6 3.1 10.9 5.4M2.8 11.2l.5-2.6 6-6a1.2 1.2 0 0 1 1.7 0l.6.6a1.2 1.2 0 0 1 0 1.7l-6 6-2.8.3Z",
  pause: "M5.3 3.8v6.4M8.7 3.8v6.4",
  play: "M4.8 3.6v6.8a.4.4 0 0 0 .6.3l5.2-3.4a.4.4 0 0 0 0-.6L5.4 3.3a.4.4 0 0 0-.6.3Z",
  forget:
    "M2.8 4.2h8.4M5.6 4.2V3a.8.8 0 0 1 .8-.8h1.2a.8.8 0 0 1 .8.8v1.2M3.9 4.2l.5 6.6a1 1 0 0 0 1 .9h3.2a1 1 0 0 0 1-.9l.5-6.6",
  undo: "M4.6 2.8 2.4 5l2.2 2.2M2.6 5h5.6a3.2 3.2 0 0 1 0 6.4H6",
  add: "M7 3v8M3 7h8",
  search: "m8.9 8.9 2.4 2.4",
  close: "m4 4 6 6m0-6-6 6",
  info: "M7 6.4v3M7 4.6v.01",
  arrow: "M2.5 7h8M7.5 4l3 3-3 3",
};
const stroke: Pick<
  SVGProps<SVGPathElement>,
  "stroke" | "strokeWidth" | "strokeLinecap" | "strokeLinejoin"
> = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const MemoryRow_MemoryRow = memo(function MemoryRow({
  memory,
  open,
  leaving,
  hot,
  editing,
  draft,
  actions,
  prefix,
  clean,
}: MemoryRowProps) {
  return (
    <li
      className={`${prefix}__fold ${prefix}__fold--row`}
      data-open={open ? "" : undefined}
      data-leaving={leaving ? "" : undefined}
      inert={!open}
    >
      <div className={`${prefix}__clip`}>
        <div
          className={`${prefix}__item`}
          data-memory={memory.id}
          data-paused={memory.paused ? "" : undefined}
          data-hot={hot ? "" : undefined}
          data-editing={editing ? "" : undefined}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") actions.current.setHot(memory.id);
          }}
          onFocus={() => actions.current.setHot(memory.id)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              actions.current.setHot(null);
          }}
        >
          {editing ? (
            <textarea
              className={`${prefix}__edit`}
              value={draft}
              rows={1}
              dir="auto"
              aria-label="Edit memory"
              ref={(element) => focusTextarea(element, true, true)}
              onChange={(event) => {
                actions.current.setDraft(event.target.value);
                fitTextarea(event.target);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  actions.current.saveEdit();
                } else if (event.key === "Escape") {
                  event.stopPropagation();
                  actions.current.cancelEdit();
                }
              }}
            />
          ) : (
            <p className={`${prefix}__text`} dir="auto">
              {memory.text}
            </p>
          )}
          <div className={`${prefix}__meta`}>
            <span className={`${prefix}__source`}>
              {memory.source && (
                <span
                  className={`${prefix}__source-name`}
                  dir="auto"
                  title={memory.source}
                >
                  {memory.source}
                </span>
              )}
              {memory.source && memory.date && (
                <span className={`${prefix}__dot`}>{" · "}</span>
              )}
              {memory.date && <span className={`${prefix}__date`}>{memory.date}</span>}
            </span>
            <span
              className={`${prefix}__tag`}
              data-on={memory.paused ? "" : undefined}
              aria-hidden={!memory.paused}
            >
              Paused
            </span>
            {editing ? (
              <span className={`${prefix}__acts ${prefix}__acts--edit`}>
                <button
                  type="button"
                  className={`${prefix}__text-btn`}
                  onClick={() => actions.current.cancelEdit()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`${prefix}__text-btn ${prefix}__text-btn--main`}
                  onClick={() => actions.current.saveEdit()}
                >
                  Save
                </button>
              </span>
            ) : (
              <span className={`${prefix}__acts`}>
                <button
                  type="button"
                  className={`${prefix}__icon`}
                  data-act="edit"
                  aria-label={`Edit “${memory.text}”`}
                  title="Edit"
                  onClick={() => actions.current.startEdit(memory)}
                >
                  <MemoryIcon name="edit" clean={clean} />
                </button>
                <button
                  type="button"
                  className={`${prefix}__icon`}
                  data-act="pause"
                  aria-label={`${memory.paused ? "Resume" : "Pause"} “${memory.text}”`}
                  title={memory.paused ? "Resume" : "Pause"}
                  onClick={() => actions.current.togglePause(memory)}
                >
                  <span
                    key={memory.paused ? "play" : "pause"}
                    className={`${prefix}__icon-swap`}
                  >
                    <MemoryIcon name={memory.paused ? "play" : "pause"} clean={clean} />
                  </span>
                </button>
                <button
                  type="button"
                  className={`${prefix}__icon ${prefix}__icon--forget`}
                  data-act="forget"
                  aria-label={`Forget “${memory.text}”`}
                  title="Forget"
                  onClick={() => actions.current.forget(memory)}
                >
                  <MemoryIcon name="forget" clean={clean} />
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
});
export { MemoryPanel };
export type { Memory };
export type { MemoryPanelProps };
