"use client";

import "./ModelPicker.clean.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type SVGProps,
  memo,
  type CSSProperties,
} from "react";
type ThinkingEffort = "low" | "medium" | "high";
interface PickerModel {
  id?: string;
  name?: string;
  description?: string;
  speed?: number;
  quality?: number;
  cost?: number;
  latencyMs?: number;
  pricePerM?: number;
  icon?: ReactNode;
  [field: string]: unknown;
}
interface ModelPickerProps {
  models: PickerModel[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  thinking?: boolean;
  defaultThinking?: boolean;
  onThinkingChange?: (on: boolean) => void;
  webSearch?: boolean;
  defaultWebSearch?: boolean;
  onWebSearchChange?: (on: boolean) => void;
  effort?: ThinkingEffort;
  defaultEffort?: ThinkingEffort;
  onEffortChange?: (effort: ThinkingEffort) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end";
  side?: "bottom" | "top";
  className?: string;
}
interface Metrics {
  latency: number;
  price: number;
}
interface ContentSnapshot {
  id: string;
  node: ReactNode;
}
interface IconProps {
  clean: boolean;
  prefix: string;
}
interface ModelOptionProps {
  model: PickerModel;
  index: number;
  optionId: string;
  selected: boolean;
  active: boolean;
  lit: boolean;
  onPoint: (index: number) => void;
  onPick: (index: number) => void;
  prefix: string;
  clean: boolean;
}
type MeterStyle = CSSProperties & {
  "--c"?: number;
  "--s"?: number;
};
type EffortStyle = CSSProperties & {
  "--i"?: number;
  "--x"?: string;
  "--w"?: string;
};
function ModelPicker(props: ModelPickerProps) {
  return <ModelPickerView {...props} clean />;
}
function clampRating(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(5, Math.round(value))) : 0;
}
function finiteMetric(value: number | undefined): number | undefined {
  return value !== undefined && Number.isFinite(value) ? value : undefined;
}
function modelInitial(name = ""): string {
  return (name.match(/[\p{L}\p{N}]/u)?.[0] ?? "").toUpperCase();
}
function formatLatency(milliseconds: number): string {
  const seconds = Math.max(0, milliseconds) / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const pad = (value: number) => String(value).padStart(2, "0");
  return minutes < 60
    ? `${minutes}m ${pad(Math.floor(seconds % 60))}s`
    : `${Math.floor(minutes / 60)}h ${pad(minutes % 60)}m`;
}
function formatPrice(value: number, target: number): string {
  if (target > 0 && target < 0.01) return "<$0.01";
  const digits = Number.isInteger(target) ? 0 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
function useModelPicker(
  {
    models,
    value,
    defaultValue,
    onChange,
    thinking,
    defaultThinking = false,
    onThinkingChange,
    webSearch,
    defaultWebSearch = false,
    onWebSearchChange,
    effort,
    defaultEffort = "medium",
    onEffortChange,
    open,
    defaultOpen = false,
    onOpenChange,
    align = "start",
  }: ModelPickerProps,
  clean: boolean,
) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [localValue, setLocalValue] = useState(defaultValue ?? models[0]?.id);
  const [localThinking, setLocalThinking] = useState(defaultThinking);
  const [localSearch, setLocalSearch] = useState(defaultWebSearch);
  const [localEffort, setLocalEffort] = useState(defaultEffort);
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const selectedValue = value ?? localValue;
  const thinkingEnabled = thinking ?? localThinking;
  const searchEnabled = webSearch ?? localSearch;
  const selectedEffort = effort ?? localEffort;
  const isOpen = open ?? localOpen;
  const selectedIndex = Math.max(
    0,
    models.findIndex((model) => model.id === selectedValue),
  );
  const selectedModel = models[selectedIndex];
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const [pointing, setPointing] = useState(false);
  const [searchPreview, setSearchPreview] = useState(false);
  const previewModel = models[pointing ? activeIndex : selectedIndex] ?? selectedModel;
  function setOpen(nextOpen: boolean, focus?: "list" | "trigger") {
    if (nextOpen !== isOpen) {
      if (nextOpen) {
        setActiveIndex(selectedIndex);
        setPointing(false);
      } else setSearchPreview(false);
      setLocalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    }
    if (focus === "list")
      requestAnimationFrame(() => listRef.current?.focus({ preventScroll: true }));
    if (focus === "trigger") triggerRef.current?.focus({ preventScroll: true });
  }
  const wasOpenRef = useRef(isOpen);
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setActiveIndex(selectedIndex);
      setPointing(false);
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, selectedIndex]);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  useLayoutEffect(() => {
    if (!isOpen) return;
    function positionPanel() {
      const bounds = triggerRef.current?.getBoundingClientRect();
      const width = panelRef.current?.offsetWidth ?? 0;
      if (!bounds || !width) return;
      const viewportWidth = document.documentElement.clientWidth;
      const left = align === "end" ? bounds.right - width : bounds.left;
      setHorizontalOffset(
        left < 12
          ? 12 - left
          : left + width > viewportWidth - 12
            ? Math.min(0, viewportWidth - 12 - (left + width))
            : 0,
      );
    }
    positionPanel();
    window.addEventListener("resize", positionPanel);
    return () => window.removeEventListener("resize", positionPanel);
  }, [isOpen, align]);
  useEffect(() => {
    if (!isOpen) return;
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target))
        setOpen(false);
    }
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  });
  function pickModel(index: number) {
    const model = models[index];
    if (!model) return;
    setLocalValue(model.id);
    if (model.id !== selectedValue && model.id !== undefined) onChange?.(model.id);
    setOpen(
      false,
      rootRef.current?.contains(document.activeElement) ? "trigger" : undefined,
    );
  }
  function toggleThinking() {
    setLocalThinking(!thinkingEnabled);
    onThinkingChange?.(!thinkingEnabled);
  }
  function toggleSearch() {
    setLocalSearch(!searchEnabled);
    onWebSearchChange?.(!searchEnabled);
  }
  function chooseEffort(next: ThinkingEffort) {
    setLocalEffort(next);
    if (next !== selectedEffort) onEffortChange?.(next);
  }
  const optionHandlersRef = useRef({
    point: (_index: number) => {},
    pick: (_index: number) => {},
  });
  optionHandlersRef.current.point = (index) => {
    setActiveIndex(index);
    setPointing(true);
  };
  optionHandlersRef.current.pick = pickModel;
  const pointOption = useCallback(
    (index: number) => optionHandlersRef.current.point(index),
    [],
  );
  const pickOption = useCallback(
    (index: number) => optionHandlersRef.current.pick(index),
    [],
  );
  useEffect(() => {
    const list = listRef.current;
    const option = list?.children[activeIndex];
    if (!isOpen || !list || !(option instanceof HTMLElement)) return;
    if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight)
      list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight;
  }, [activeIndex, isOpen]);
  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    setOpen(true, "list");
  }
  function handleListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const count = models.length;
    if (!count) return;
    function moveTo(index: number) {
      event.preventDefault();
      setActiveIndex(((index % count) + count) % count);
      setPointing(true);
    }
    if (event.key === "ArrowDown") moveTo(activeIndex + 1);
    else if (event.key === "ArrowUp") moveTo(activeIndex - 1);
    else if (event.key === "Home") moveTo(0);
    else if (event.key === "End") moveTo(count - 1);
    else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pickModel(activeIndex);
    }
  }
  const effortRef = useRef<HTMLDivElement>(null);
  const [effortBounds, setEffortBounds] = useState<{
    x: number;
    width: number;
  } | null>(null);
  useLayoutEffect(() => {
    if (!clean) return;
    const button = effortRef.current?.querySelector<HTMLButtonElement>(
      `[data-effort="${selectedEffort}"]`,
    );
    if (button) setEffortBounds({ x: button.offsetLeft, width: button.offsetWidth });
  }, [clean, selectedEffort, isOpen, thinkingEnabled]);
  function handleEffortKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = effortOptions.findIndex((option) => option.id === selectedEffort);
    const direction =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!direction) return;
    event.preventDefault();
    const next =
      effortOptions[(index + direction + effortOptions.length) % effortOptions.length];
    chooseEffort(next.id);
    rootRef.current
      ?.querySelector<HTMLButtonElement>(`[data-effort="${next.id}"]`)
      ?.focus();
  }
  function handleRootKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !isOpen) return;
    event.stopPropagation();
    setOpen(false, "trigger");
  }
  return {
    id,
    rootRef,
    triggerRef,
    listRef,
    panelRef,
    selectedModel,
    selectedIndex,
    thinkingEnabled,
    searchEnabled,
    selectedEffort,
    isOpen,
    activeIndex,
    pointing,
    setPointing,
    searchPreview,
    setSearchPreview,
    previewModel,
    setOpen,
    horizontalOffset,
    toggleThinking,
    toggleSearch,
    chooseEffort,
    pointOption,
    pickOption,
    handleTriggerKeyDown,
    handleListKeyDown,
    effortRef,
    effortBounds,
    handleEffortKeyDown,
    handleRootKeyDown,
  };
}
function useAnimatedMetrics(target: Metrics, duration = 560): Metrics {
  const [metrics, setMetrics] = useState(target);
  const currentRef = useRef(target);
  const { latency, price } = target;
  useEffect(() => {
    const next = { latency, price };
    const previous = { ...currentRef.current };
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || (previous.latency === latency && previous.price === price)) {
      currentRef.current = next;
      setMetrics(next);
      return;
    }
    const startedAt = performance.now();
    let frame = 0;
    function tick(now: number) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const easedProgress = 1 - (1 - progress) ** 4;
      const animated = {
        latency: previous.latency + (latency - previous.latency) * easedProgress,
        price: previous.price + (price - previous.price) * easedProgress,
      };
      currentRef.current = animated;
      setMetrics(animated);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [latency, price, duration]);
  return metrics;
}
function useModelCaption(
  model: PickerModel | undefined,
  thinking: boolean,
  effort: ThinkingEffort,
  searchPreview: boolean,
  searchEnabled: boolean,
  prefix: string,
): {
  content: ReactNode;
  id: string;
  announcement: string;
} {
  const latency = finiteMetric(model?.latencyMs);
  const price = finiteMetric(model?.pricePerM);
  const targetLatency = (latency ?? 0) * (thinking ? effortMultiplier[effort] : 1);
  const targetPrice = price ?? 0;
  const animated = useAnimatedMetrics({
    latency: targetLatency,
    price: targetPrice,
  });
  if (searchPreview) {
    const text = searchEnabled
      ? "Looks things up on the web when it helps"
      : "Answers from what it already knows";
    return { content: text, id: `search-${searchEnabled}`, announcement: text };
  }
  if (latency === undefined && price === undefined) {
    const text = model?.description ?? model?.name ?? "";
    return {
      content: text,
      id: `plain-${model?.id}`,
      announcement: `${model?.name ?? ""}: ${text}`,
    };
  }
  const parts: ReactNode[] = [];
  const announcements: string[] = [];
  if (latency !== undefined) {
    parts.push(
      <span key="l">
        {"~"}
        <b>{formatLatency(animated.latency)}</b>
        {" first token"}
      </span>,
    );
    announcements.push(`about ${formatLatency(targetLatency)} to the first token`);
  }
  if (price !== undefined) {
    parts.push(
      <span key="p">
        <b>{formatPrice(animated.price, targetPrice)}</b>
        {" / M tokens"}
      </span>,
    );
    announcements.push(`${formatPrice(targetPrice, targetPrice)} per million tokens`);
  }
  return {
    content: parts.flatMap((part, index) =>
      index
        ? [
            <span className={`${prefix}__dot`} key={`d${index}`}>
              {" · "}
            </span>,
            part,
          ]
        : [part],
    ),
    id: "stats",
    announcement: `${model?.name}: ${announcements.join(", ")}`,
  };
}
function SwappingContent({
  id,
  children,
  prefix,
}: {
  id: string;
  children: ReactNode;
  prefix: string;
}) {
  const previousRef = useRef<ContentSnapshot>({ id, node: children });
  const [currentId, setCurrentId] = useState(id);
  const [outgoing, setOutgoing] = useState<ContentSnapshot | null>(null);
  if (currentId !== id) {
    setCurrentId(id);
    setOutgoing(previousRef.current);
  }
  previousRef.current = { id, node: children };
  useEffect(() => {
    if (!outgoing) return;
    const timeout = window.setTimeout(() => setOutgoing(null), 260);
    return () => window.clearTimeout(timeout);
  }, [outgoing]);
  return (
    <span className={`${prefix}__swap`}>
      {outgoing && (
        <span
          className={`${prefix}__swap-item`}
          data-out=""
          aria-hidden="true"
          key={`out-${outgoing.id}`}
        >
          {outgoing.node}
        </span>
      )}
      <span className={`${prefix}__swap-item`} dir="auto" key={id}>
        {children}
      </span>
    </span>
  );
}
function ChevronIcon({ clean, prefix }: IconProps) {
  return (
    <svg
      className={`${prefix}__chevron`}
      width={clean ? "14" : "12"}
      height={clean ? "14" : "12"}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="m3 4.5 3 3 3-3" {...strokeProps(clean)} />
    </svg>
  );
}
function CheckIcon({ clean, prefix }: IconProps) {
  return (
    <svg
      className={`${prefix}__check`}
      width={clean ? "16" : "14"}
      height={clean ? "16" : "14"}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3.4 7.3 2.4 2.4 4.8-5.2"
        {...strokeProps(clean)}
        strokeWidth={clean ? 1.3 : 1.6}
      />
    </svg>
  );
}
function ThinkingIcon({ clean }: Pick<IconProps, "clean">) {
  return (
    <svg
      width={clean ? "16" : "14"}
      height={clean ? "16" : "14"}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.3 10.6h3.4M5.8 12.3h2.4M7 1.7a3.9 3.9 0 0 0-2.3 7c.4.3.6.7.6 1.1v.1h3.4v-.1c0-.4.2-.8.6-1.1A3.9 3.9 0 0 0 7 1.7Z"
        {...strokeProps(clean)}
      />
    </svg>
  );
}
function SearchIcon({ clean }: Pick<IconProps, "clean">) {
  return (
    <svg
      width={clean ? "16" : "14"}
      height={clean ? "16" : "14"}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="7"
        cy="7"
        r="5.3"
        stroke="currentColor"
        strokeWidth={clean ? 1.2 : 1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.9 7h10.2M7 1.7c1.4 1.5 2 3.3 2 5.3s-.6 3.8-2 5.3c-1.4-1.5-2-3.3-2-5.3s.6-3.8 2-5.3Z"
        {...strokeProps(clean)}
      />
    </svg>
  );
}
function ModelGlyph({ model, prefix }: { model: PickerModel; prefix: string }) {
  return (
    <span className={`${prefix}__glyph`} aria-hidden="true">
      {model.icon ?? modelInitial(model.name)}
    </span>
  );
}
function ModelPickerView({
  clean = false,
  ...props
}: ModelPickerProps & {
  clean?: boolean;
}) {
  const { models, align = "start", side = "bottom", className } = props;
  const prefix = clean ? "ui-mdpc" : "ui-mdp";
  const {
    id,
    rootRef,
    triggerRef,
    listRef,
    panelRef,
    selectedModel,
    selectedIndex,
    thinkingEnabled,
    searchEnabled,
    selectedEffort,
    isOpen,
    activeIndex,
    pointing,
    setPointing,
    searchPreview,
    setSearchPreview,
    previewModel,
    setOpen,
    horizontalOffset,
    toggleThinking,
    toggleSearch,
    chooseEffort,
    pointOption,
    pickOption,
    handleTriggerKeyDown,
    handleListKeyDown,
    effortRef,
    effortBounds,
    handleEffortKeyDown,
    handleRootKeyDown,
  } = useModelPicker(props, clean);
  const caption = useModelCaption(
    previewModel,
    thinkingEnabled,
    selectedEffort,
    searchPreview,
    searchEnabled,
    prefix,
  );
  const activeOptionId = models[activeIndex] ? `${id}-opt-${activeIndex}` : undefined;
  const effortStyle: EffortStyle | undefined = clean
    ? effortBounds
      ? { "--x": `${effortBounds.x}px`, "--w": `${effortBounds.width}px` }
      : undefined
    : {
        "--i": effortOptions.findIndex((option) => option.id === selectedEffort),
      };
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-open={isOpen ? "" : undefined}
      data-align={align}
      data-side={side}
      onKeyDown={handleRootKeyDown}
      onBlur={(event) => {
        if (
          isOpen &&
          event.relatedTarget &&
          !rootRef.current?.contains(event.relatedTarget)
        )
          setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${prefix}__trigger`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={`${id}-menu`}
        aria-label={`Model: ${selectedModel?.name ?? "none"}${thinkingEnabled ? ", extended thinking" : ""}`}
        onClick={() => setOpen(!isOpen, isOpen ? undefined : "list")}
        onKeyDown={handleTriggerKeyDown}
      >
        {selectedModel && <ModelGlyph model={selectedModel} prefix={prefix} />}
        <span className={`${prefix}__name`} title={selectedModel?.name}>
          <SwappingContent id={selectedModel?.id ?? "none"} prefix={prefix}>
            {selectedModel?.name ?? "Choose a model"}
          </SwappingContent>
        </span>
        <span
          className={`${prefix}__flag`}
          data-on={thinkingEnabled ? "" : undefined}
          aria-hidden="true"
        >
          <span>
            <ThinkingIcon clean={clean} />
          </span>
        </span>
        <ChevronIcon clean={clean} prefix={prefix} />
      </button>
      <div
        id={`${id}-menu`}
        ref={panelRef}
        className={`${prefix}__pop`}
        style={horizontalOffset ? { translate: `${horizontalOffset}px 0` } : undefined}
        role="dialog"
        aria-label="Model settings"
        inert={!isOpen}
      >
        <div className={`${prefix}__card`}>
          <div className={`${prefix}__head`} aria-hidden="true">
            <span>Model</span>
            <span className={`${prefix}__cols`}>
              {ratingColumns.map((column) => (
                <span key={column.key}>{column.label}</span>
              ))}
            </span>
          </div>
          {models.length === 0 && (
            <div className={`${prefix}__empty`}>No models available</div>
          )}
          <div
            ref={listRef}
            className={`${prefix}__list`}
            role="listbox"
            aria-label="Model"
            tabIndex={0}
            aria-activedescendant={isOpen ? activeOptionId : undefined}
            data-pointing={pointing ? "" : undefined}
            onKeyDown={handleListKeyDown}
            onPointerLeave={() => setPointing(false)}
          >
            {models.map((model, index) => (
              <ModelOption_ModelOption
                model={model}
                index={index}
                optionId={`${id}-opt-${index}`}
                selected={index === selectedIndex}
                active={index === activeIndex}
                lit={model.id === previewModel?.id}
                onPoint={pointOption}
                onPick={pickOption}
                prefix={prefix}
                clean={clean}
                key={model.id}
              />
            ))}
          </div>
          <div className={`${prefix}__settings`}>
            <button
              type="button"
              role="switch"
              aria-checked={thinkingEnabled}
              className={`${prefix}__toggle`}
              onClick={toggleThinking}
            >
              <span className={`${prefix}__toggle-icon`}>
                <ThinkingIcon clean={clean} />
              </span>
              <span className={`${prefix}__toggle-label`}>Extended thinking</span>
              <span className={`${prefix}__switch`} aria-hidden="true" />
            </button>
            <div
              className={`${prefix}__fold`}
              data-open={thinkingEnabled ? "" : undefined}
              inert={!thinkingEnabled}
            >
              <div className={`${prefix}__clip`}>
                <div className={`${prefix}__effort`}>
                  <span className={`${prefix}__effort-label`} id={`${id}-effort`}>
                    Effort
                  </span>
                  <div
                    ref={clean ? effortRef : undefined}
                    className={`${prefix}__segmented`}
                    role="radiogroup"
                    aria-labelledby={`${id}-effort`}
                    style={effortStyle}
                    onKeyDown={handleEffortKeyDown}
                  >
                    <span className={`${prefix}__thumb`} aria-hidden="true" />
                    {effortOptions.map((option) => (
                      <button
                        type="button"
                        role="radio"
                        aria-checked={option.id === selectedEffort}
                        tabIndex={option.id === selectedEffort ? 0 : -1}
                        data-effort={option.id}
                        className={`${prefix}__seg-btn`}
                        onClick={() => chooseEffort(option.id)}
                        key={option.id}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={searchEnabled}
              className={`${prefix}__toggle`}
              onClick={toggleSearch}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setSearchPreview(true);
              }}
              onPointerLeave={() => setSearchPreview(false)}
              onFocus={() => setSearchPreview(true)}
              onBlur={() => setSearchPreview(false)}
            >
              <span className={`${prefix}__toggle-icon`}>
                <SearchIcon clean={clean} />
              </span>
              <span className={`${prefix}__toggle-label`}>Web search</span>
              <span className={`${prefix}__switch`} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className={`${prefix}__foot`}>
          <span className={`${prefix}__caption`} aria-hidden="true">
            <SwappingContent id={caption.id} prefix={prefix}>
              {caption.content}
            </SwappingContent>
          </span>
          <span className={`${prefix}__keys`} aria-hidden="true">
            <kbd>↑↓</kbd>
            <kbd>↵</kbd>
          </span>
          <span className={`${prefix}__sr`} aria-live="polite">
            {isOpen ? caption.announcement : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
const effortOptions = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
] as const;
const effortMultiplier = { low: 1.6, medium: 2.5, high: 4 };
const ratingColumns = [
  { key: "speed", label: "Speed" },
  { key: "quality", label: "Quality" },
  { key: "cost", label: "Cost" },
] as const;
const strokeProps = (clean: boolean): SVGProps<SVGPathElement> => ({
  stroke: "currentColor",
  strokeWidth: clean ? 1.2 : 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});
const ModelOption_ModelOption = memo(function ModelOption({
  model,
  index,
  optionId,
  selected,
  active,
  lit,
  onPoint,
  onPick,
  prefix,
  clean,
}: ModelOptionProps) {
  const hasRatings =
    model.speed !== undefined || model.quality !== undefined || model.cost !== undefined;
  const label = `${model.name}${model.description ? `, ${model.description}` : ""}${hasRatings ? `. Speed ${clampRating(model.speed ?? 0)}, quality ${clampRating(model.quality ?? 0)}, cost ${clampRating(model.cost ?? 0)} of 5` : ""}`;
  return (
    <div
      id={optionId}
      role="option"
      aria-selected={selected}
      aria-label={label}
      className={`${prefix}__option`}
      data-active={active ? "" : undefined}
      data-lit={lit ? "" : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onPoint(index);
      }}
      onClick={() => onPick(index)}
    >
      <ModelGlyph model={model} prefix={prefix} />
      <span className={`${prefix}__text`}>
        <span className={`${prefix}__title`}>
          <span className={`${prefix}__title-name`} dir="auto" title={model.name}>
            {model.name}
          </span>
          {selected && <CheckIcon clean={clean} prefix={prefix} />}
        </span>
        {model.description && (
          <span className={`${prefix}__desc`} dir="auto" title={model.description}>
            {model.description}
          </span>
        )}
      </span>
      {hasRatings ? (
        <span className={`${prefix}__bars`} aria-hidden="true">
          {ratingColumns.map((column, columnIndex) => {
            const rating = clampRating(model[column.key] ?? 0);
            return (
              <span
                className={`${prefix}__meter`}
                style={{ "--c": columnIndex } as MeterStyle}
                key={column.key}
              >
                {[0, 1, 2, 3, 4].map((segment) => (
                  <span
                    className={`${prefix}__seg`}
                    data-on={segment < rating ? "" : undefined}
                    style={{ "--s": segment } as MeterStyle}
                    key={segment}
                  />
                ))}
              </span>
            );
          })}
        </span>
      ) : (
        <span className={`${prefix}__varies`} aria-hidden="true">
          Varies
        </span>
      )}
    </div>
  );
});
export { ModelPicker };
export type { ModelPickerProps };
export type { PickerModel };
