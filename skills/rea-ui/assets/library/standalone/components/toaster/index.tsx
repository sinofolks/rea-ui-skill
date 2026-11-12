"use client";

import "./Toaster.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type FocusEvent,
  type PointerEvent,
  type RefObject,
  useLayoutEffect,
  type CSSProperties,
} from "react";
type ToastId = string | number;
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
interface ToastMessage {
  title: ReactNode;
  description?: ReactNode;
}
interface ToastAction {
  label: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
interface ToastOptions {
  id?: ToastId;
  toaster?: string;
  description?: ReactNode;
  icon?: ReactNode;
  duration?: number;
  action?: ToastAction;
  onDismiss?: (id: ToastId) => void;
}
interface ToastPromiseMessages<T> {
  loading: ReactNode | ToastMessage;
  success: ReactNode | ToastMessage | ((value: T) => ReactNode | ToastMessage);
  error: ReactNode | ToastMessage | ((error: unknown) => ReactNode | ToastMessage);
}
interface ToastAPI {
  (message: ReactNode | ToastMessage, options?: ToastOptions): ToastId;
  success(message: ReactNode | ToastMessage, options?: ToastOptions): ToastId;
  error(message: ReactNode | ToastMessage, options?: ToastOptions): ToastId;
  info(message: ReactNode | ToastMessage, options?: ToastOptions): ToastId;
  loading(message: ReactNode | ToastMessage, options?: ToastOptions): ToastId;
  promise<T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: ToastPromiseMessages<T>,
    options?: ToastOptions,
  ): Promise<T>;
  dismiss(id?: ToastId): void;
}
interface ToasterProps {
  position?: ToastPosition;
  inline?: boolean;
  id?: string;
  duration?: number;
  visibleToasts?: number;
  expand?: boolean;
  offset?: number;
  gap?: number;
  hotkey?: string | false;
  hairline?: boolean;
  closeButton?: boolean;
  label?: string;
  className?: string;
}
type ToastKind = "default" | "success" | "error" | "info" | "loading";
interface ToastRecord extends Omit<ToastOptions, "id"> {
  id: ToastId;
  type: ToastKind;
  title: ReactNode;
  version: number;
  removing?: boolean;
}
type ToastStore = ReturnType<typeof createToastStore>;
interface ToastLayout {
  y: number;
  scale: number;
  height: number;
  z: number;
  behind: boolean;
  hidden: boolean;
}
interface PointerSample {
  value: number;
  time: number;
}
interface SwipeGesture {
  pointer: number;
  x: number;
  y: number;
  axis: "x" | "y" | null;
  samples: PointerSample[];
}
type ToastCopy = Pick<ToastRecord, "title" | "description" | "version">;
interface ToastCardProps {
  toast: ToastRecord;
  store: ToastStore;
  layout: ToastLayout;
  direction: 1 | -1;
  paused: boolean;
  defaultDuration: number;
  hairline: boolean;
  closeButton: boolean;
  onHeight: (id: string, height: number) => void;
  prefix: string;
}
/** Render notifications from this skin's shared toast API. */
function Toaster(props: ToasterProps) {
  return <ToasterView {...props} store={store_default_store} clean={false} />;
}
function isMessage(value: ReactNode | ToastMessage): value is ToastMessage {
  return (
    typeof value === "object" &&
    !!value &&
    !isValidElement(value) &&
    !Array.isArray(value) &&
    "title" in value
  );
}
function messageParts(value: ReactNode | ToastMessage): ToastMessage {
  return isMessage(value) ? value : { title: value, description: undefined };
}
/** One store per skin; root and subpath exports import the same store instance. */
function createToastStore() {
  let records: ToastRecord[] = [];
  const serverSnapshot: ToastRecord[] = [];
  const subscribers = new Set<() => void>();
  let nextId = 0;
  function publish(next: ToastRecord[]) {
    records = next;
    subscribers.forEach((listener) => listener());
  }
  function subscribe(listener: () => void) {
    subscribers.add(listener);
    return () => {
      subscribers.delete(listener);
    };
  }
  function notify(
    type: ToastKind,
    message: ReactNode | ToastMessage,
    options: ToastOptions = {},
    updateOnly = false,
  ): ToastId {
    if (isMessage(message)) {
      options = { description: message.description, ...options };
      message = message.title;
    }
    const { id, ...details } = options;
    const existing =
      id === undefined
        ? undefined
        : records.find((record) => sameId(record.id, id) && !record.removing);
    if (existing) {
      publish(
        records.map((record) =>
          record === existing
            ? {
                ...record,
                ...details,
                type,
                title: message,
                version: record.version + 1,
              }
            : record,
        ),
      );
      return existing.id;
    }
    const assignedId = id ?? `toast-${++nextId}`;
    if (!updateOnly)
      publish([
        ...records.filter((record) => !sameId(record.id, assignedId)),
        { ...details, id: assignedId, type, title: message, version: 0 },
      ]);
    return assignedId;
  }
  function dismiss(id?: ToastId) {
    const removing = records.filter(
      (record) => !record.removing && (id === undefined || sameId(record.id, id)),
    );
    if (!removing.length) return;
    publish(
      records.map((record) =>
        removing.includes(record) ? { ...record, removing: true } : record,
      ),
    );
    removing.forEach((record) => record.onDismiss?.(record.id));
    window.setTimeout(
      () =>
        publish(
          records.filter(
            (record) =>
              !(
                record.removing && removing.some((previous) => previous.id === record.id)
              ),
          ),
        ),
      420,
    );
  }
  function promise<T>(
    input: Promise<T> | (() => Promise<T>),
    messages: ToastPromiseMessages<T>,
    options: ToastOptions = {},
  ): Promise<T> {
    const pending = typeof input === "function" ? input() : input;
    const loading = messageParts(messages.loading);
    const id = notify("loading", loading.title, {
      ...options,
      description: loading.description,
    });
    const settle = (type: ToastKind, message: ReactNode | ToastMessage) => {
      const parts = messageParts(message);
      notify(type, parts.title, { ...options, id, description: parts.description }, true);
    };
    void pending.then(
      (value) =>
        settle(
          "success",
          typeof messages.success === "function"
            ? messages.success(value)
            : messages.success,
        ),
      (error: unknown) =>
        settle(
          "error",
          typeof messages.error === "function" ? messages.error(error) : messages.error,
        ),
    );
    return pending;
  }
  const api: ToastAPI = Object.assign(
    (message: ReactNode | ToastMessage, options?: ToastOptions) =>
      notify("default", message, options),
    {
      success: (message: ReactNode | ToastMessage, options?: ToastOptions) =>
        notify("success", message, options),
      error: (message: ReactNode | ToastMessage, options?: ToastOptions) =>
        notify("error", message, options),
      info: (message: ReactNode | ToastMessage, options?: ToastOptions) =>
        notify("info", message, options),
      loading: (message: ReactNode | ToastMessage, options?: ToastOptions) =>
        notify("loading", message, options),
      promise,
      dismiss,
    },
  );
  return {
    api,
    subscribe,
    getSnapshot: () => records,
    getServerSnapshot: () => serverSnapshot,
    dismiss,
  };
}
function validDuration(value: number | undefined): number | undefined {
  return typeof value === "number" &&
    (value === Infinity || (Number.isFinite(value) && value >= 0))
    ? value
    : undefined;
}
function toastEdges(position: ToastPosition): {
  vertical: string;
  horizontal: string;
  direction: 1 | -1;
} {
  const [vertical, horizontal] = (
    positions.includes(position) ? position : "bottom-right"
  ).split("-");
  return { vertical, horizontal, direction: vertical === "bottom" ? 1 : -1 };
}
/** Stack behind the newest toast, or lay out each measured card when expanded. */
function layoutToasts(
  active: ToastRecord[],
  heights: Record<string, number>,
  frontHeight: number,
  expanded: boolean,
  visibleToasts: number,
  gap: number,
) {
  const limit = Number.isFinite(visibleToasts)
    ? Math.max(1, Math.floor(visibleToasts))
    : 3;
  const spacing = Number.isFinite(gap) ? gap : 10;
  const layouts = new Map<string, ToastLayout>();
  let offset = 0;
  active.forEach((toast, index) => {
    const height = heights[toastKey(toast)] ?? 0;
    const depth = Math.min(index, limit - 1);
    const common = { z: active.length - index, hidden: index >= limit };
    const layout: ToastLayout = expanded
      ? { ...common, y: offset, scale: 1, height, behind: false }
      : {
          ...common,
          y: depth * 10,
          scale: 1 - depth * 0.05,
          height: index === 0 ? height : frontHeight,
          behind: index > 0,
        };
    if (index < limit) offset += height + spacing;
    layouts.set(toastKey(toast), layout);
  });
  const visible = Math.min(active.length, limit);
  const height = active.length
    ? expanded
      ? Math.max(0, offset - spacing)
      : frontHeight + 10 * (visible - 1)
    : 0;
  return { layouts, height };
}
function useToaster(props: ToasterProps, store: ToastStore, prefix: string) {
  const {
    position = "bottom-right",
    id,
    visibleToasts = 3,
    expand = false,
    gap = 10,
    hotkey = "F8",
  } = props;
  const records = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false),
    [touchExpanded, setTouchExpanded] = useState(false),
    [documentHidden, setDocumentHidden] = useState(false);
  const [status, setStatus] = useState(""),
    [alert, setAlert] = useState("");
  const rootRef = useRef<HTMLElement>(null);
  const previousLayouts = useRef(new Map<string, ToastLayout>());
  const previousFrontHeight = useRef(0);
  const returnFocus = useRef<HTMLElement | null>(null);
  const pointerType = useRef("mouse");
  const announcedVersions = useRef(new Map<string, number>());
  const { vertical, horizontal, direction } = toastEdges(position);
  const toasts = records
    .filter((toast) => (toast.toaster ?? null) === (id ?? null))
    .reverse();
  const active = toasts.filter((toast) => !toast.removing);
  const expanded = expand || hovered || focused || touchExpanded;
  const paused = hovered || focused || touchExpanded || documentHidden;
  const onHeight = useCallback(
    (key: string, height: number) =>
      setHeights((previous) =>
        previous[key] === height ? previous : { ...previous, [key]: height },
      ),
    [],
  );
  const frontHeight =
    (active[0] && heights[toastKey(active[0])]) || previousFrontHeight.current;
  if (frontHeight) previousFrontHeight.current = frontHeight;
  const { layouts, height } = layoutToasts(
    active,
    heights,
    frontHeight,
    expanded,
    visibleToasts,
    gap,
  );
  layouts.forEach((layout, key) => previousLayouts.current.set(key, layout));
  useEffect(() => {
    const present = new Set(toasts.map(toastKey));
    setHeights((previous) => {
      const stale = Object.keys(previous).filter((key) => !present.has(key));
      if (!stale.length) return previous;
      const next = { ...previous };
      stale.forEach((key) => delete next[key]);
      return next;
    });
    previousLayouts.current.forEach((_, key) => {
      if (!present.has(key)) previousLayouts.current.delete(key);
    });
    if (!active.length) setTouchExpanded(false);
  }, [records]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    active.forEach((toast) => {
      const key = toastKey(toast);
      if (announcedVersions.current.get(key) === toast.version) return;
      announcedVersions.current.set(key, toast.version);
      const text = [...root.querySelectorAll<HTMLElement>("[data-toast-id]")]
        .find((element) => element.dataset.toastId === key)
        ?.querySelector(`.${prefix}__copy:not(.${prefix}__ghost)`)
        ?.textContent?.trim();
      if (text)
        (toast.type === "error" ? setAlert : setStatus)((previous) =>
          previous === text ? `${text}\u00a0` : text,
        );
    });
    announcedVersions.current.forEach((_, key) => {
      if (!toasts.some((toast) => toastKey(toast) === key))
        announcedVersions.current.delete(key);
    });
  }, [records]);
  useEffect(() => {
    const onVisibility = () => setDocumentHidden(document.visibilityState === "hidden");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (!touchExpanded) return;
    const onOutside = (event: globalThis.PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target))
        setTouchExpanded(false);
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, [touchExpanded]);
  function toastElements() {
    return [
      ...(rootRef.current?.querySelectorAll<HTMLElement>(
        "[data-toast-id]:not([data-removing])",
      ) ?? []),
    ];
  }
  useEffect(() => {
    if (!hotkey) return;
    const onHotkey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== hotkey && event.code !== hotkey) return;
      const first = toastElements().find((element) => !element.inert);
      if (!first) return;
      event.preventDefault();
      if (
        !rootRef.current?.contains(document.activeElement) &&
        document.activeElement instanceof HTMLElement
      )
        returnFocus.current = document.activeElement;
      first.focus();
    };
    window.addEventListener("keydown", onHotkey);
    return () => window.removeEventListener("keydown", onHotkey);
  }, [hotkey]);
  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape" || !active.length) return;
    event.preventDefault();
    event.stopPropagation();
    const element =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-toast-id]")
        : null;
    const toast =
      active.find((toast) => toastKey(toast) === element?.dataset.toastId) ?? active[0];
    const index = active.indexOf(toast);
    store.dismiss(toast.id);
    const next = active.filter((candidate) => candidate !== toast)[
      Math.min(index, active.length - 2)
    ];
    const nextElement =
      next &&
      toastElements().find((element) => element.dataset.toastId === toastKey(next));
    if (nextElement) nextElement.focus();
    else if (returnFocus.current?.isConnected) returnFocus.current.focus();
    else if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }
  function onFocus(event: FocusEvent<HTMLElement>) {
    if (event.target.matches(":focus-visible")) setFocused(true);
  }
  function onBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  }
  function layoutFor(key: string) {
    return layouts.get(key) ?? previousLayouts.current.get(key) ?? hiddenToastLayout;
  }
  return {
    rootRef,
    toasts,
    active,
    vertical,
    horizontal,
    direction,
    expanded,
    paused,
    height,
    layouts,
    layoutFor,
    onHeight,
    status,
    alert,
    onKeyDown,
    onFocus,
    onBlur,
    pointerType,
    setHovered,
    setTouchExpanded,
  };
}
function useToastSwipe(
  element: RefObject<HTMLDivElement | null>,
  removing: boolean,
  direction: 1 | -1,
  dismiss: () => void,
) {
  const gesture = useRef<SwipeGesture | null>(null);
  const suppressClick = useRef(false);
  const [swiping, setSwiping] = useState(false);
  function onPointerDown(event: PointerEvent<HTMLLIElement>) {
    if (
      event.button !== 0 ||
      removing ||
      (event.target instanceof Element &&
        event.target.closest("button, a, input, textarea, select"))
    )
      return;
    gesture.current = {
      pointer: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      axis: null,
      samples: [],
    };
    suppressClick.current = false;
  }
  function onPointerMove(event: PointerEvent<HTMLLIElement>) {
    const swipe = gesture.current,
      card = element.current;
    if (!swipe || swipe.pointer !== event.pointerId || !card) return;
    const dx = event.clientX - swipe.x,
      dy = event.clientY - swipe.y;
    if (!swipe.axis) {
      if (Math.hypot(dx, dy) < 6) return;
      swipe.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      event.currentTarget.setPointerCapture(event.pointerId);
      suppressClick.current = true;
      setSwiping(true);
      card.style.transition = "none";
    }
    let distance = swipe.axis === "x" ? dx : dy;
    const outward = swipe.axis === "x" || distance * direction > 0;
    if (!outward) distance = Math.sign(distance) * Math.abs(distance) ** 0.7 * 0.6;
    const size = swipe.axis === "x" ? card.offsetWidth : card.offsetHeight * 2;
    card.style.transform =
      swipe.axis === "x" ? `translateX(${distance}px)` : `translateY(${distance}px)`;
    card.style.opacity = outward
      ? String(Math.max(0.25, 1 - Math.abs(distance) / (size * 1.1)))
      : "";
    swipe.samples.push({ value: distance, time: event.timeStamp });
    if (swipe.samples.length > 6) swipe.samples.shift();
  }
  function onPointerEnd(event: PointerEvent<HTMLLIElement>) {
    const swipe = gesture.current,
      card = element.current;
    if (!swipe || swipe.pointer !== event.pointerId) return;
    gesture.current = null;
    if (!swipe.axis || !card) return;
    setSwiping(false);
    const last = swipe.samples.at(-1) ?? { value: 0, time: 0 },
      first = swipe.samples[0] ?? last;
    const velocity =
      last.time > first.time ? (last.value - first.value) / (last.time - first.time) : 0;
    const outward = swipe.axis === "x" || last.value * direction > 0;
    const flick =
      Math.abs(velocity) > 0.45 && Math.sign(velocity) === Math.sign(last.value);
    if (event.type === "pointerup" && outward && (Math.abs(last.value) > 64 || flick)) {
      const size = (swipe.axis === "x" ? card.offsetWidth : card.offsetHeight) + 48;
      card.style.transition =
        "transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease";
      card.style.transform = `${swipe.axis === "x" ? "translateX" : "translateY"}(${Math.sign(last.value) * size}px)`;
      card.style.opacity = "0";
      dismiss();
    } else {
      card.style.transition = "";
      card.style.transform = "";
      card.style.opacity = "";
    }
  }
  function onClickCapture(event: MouseEvent<HTMLLIElement>) {
    if (suppressClick.current) {
      suppressClick.current = false;
      event.stopPropagation();
      event.preventDefault();
    }
  }
  return {
    swiping,
    onPointerDown,
    onPointerMove,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
    onClickCapture,
  };
}
function useToastCard(
  toast: ToastRecord,
  store: ToastStore,
  paused: boolean,
  defaultDuration: number,
  direction: 1 | -1,
  onHeight: (id: string, height: number) => void,
) {
  const [mounted, setMounted] = useState(false),
    [ghost, setGhost] = useState<ToastCopy | null>(null),
    [brokenIcon, setBrokenIcon] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null),
    swipeRef = useRef<HTMLDivElement>(null),
    previousCopy = useRef<ToastCopy>({
      title: toast.title,
      description: toast.description,
      version: toast.version,
    }),
    ghostTimer = useRef(0);
  const countdown = useRef({ version: -1, remaining: 0 });
  const removing = !!toast.removing;
  const swipe = useToastSwipe(swipeRef, removing, direction, () =>
    store.dismiss(toast.id),
  );
  useEffect(() => setBrokenIcon(false), [toast.icon]);
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setMounted(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);
  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const id = toastKey(toast);
    const measure = () => onHeight(id, element.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    const previous = previousCopy.current;
    if (previous.version !== toast.version) {
      previousCopy.current = {
        title: toast.title,
        description: toast.description,
        version: toast.version,
      };
      if (previous.title !== toast.title || previous.description !== toast.description) {
        setGhost(previous);
        window.clearTimeout(ghostTimer.current);
        ghostTimer.current = window.setTimeout(() => setGhost(null), 320);
      }
    }
  }, [toast.version]);
  useEffect(() => () => window.clearTimeout(ghostTimer.current), []);
  const duration =
    validDuration(toast.duration) ?? validDuration(defaultDuration) ?? 4000;
  const finite = toast.type !== "loading" && Number.isFinite(duration);
  const running = finite && !paused && !swipe.swiping && !removing;
  useEffect(() => {
    if (countdown.current.version !== toast.version)
      countdown.current = { version: toast.version, remaining: duration };
    if (!running) return;
    const version = toast.version,
      startedAt = Date.now();
    const timer = window.setTimeout(
      () => store.dismiss(toast.id),
      Math.max(0, countdown.current.remaining),
    );
    return () => {
      window.clearTimeout(timer);
      if (countdown.current.version === version)
        countdown.current.remaining -= Date.now() - startedAt;
    };
  }, [running, toast.version, duration, toast.id, store]);
  return {
    mounted,
    ghost,
    brokenIcon,
    setBrokenIcon,
    contentRef,
    swipeRef,
    removing,
    duration,
    finite,
    running,
    swipe,
  };
}
function ToastCard({
  toast,
  store,
  layout,
  direction,
  paused,
  defaultDuration,
  hairline,
  closeButton,
  onHeight,
  prefix,
}: ToastCardProps) {
  const card = useToastCard(toast, store, paused, defaultDuration, direction, onHeight);
  const {
    mounted,
    ghost,
    brokenIcon,
    setBrokenIcon,
    contentRef,
    swipeRef,
    removing,
    duration,
    finite,
    running,
    swipe,
  } = card;
  let transform = `translateY(${-direction * layout.y}px) scale(${layout.scale})`;
  if (!mounted) transform = `translateY(${direction * 100}%) scale(${layout.scale})`;
  if (removing)
    transform = `translateY(${-direction * layout.y + direction * 10}px) scale(${layout.scale * 0.96})`;
  const customIcon = !brokenIcon && toast.icon != null && toast.type !== "loading";
  const icon = customIcon ? (
    toast.icon
  ) : toast.type === "default" ? null : (
    <ToastStatusIcon prefix={prefix} />
  );
  return (
    <li
      className={`${prefix}__toast`}
      data-toast-id={toastKey(toast)}
      data-type={toast.type}
      data-behind={layout.behind || undefined}
      data-removing={removing || undefined}
      data-swiping={swipe.swiping || undefined}
      tabIndex={0}
      inert={layout.hidden || removing}
      style={{
        transform,
        opacity: !mounted || removing || layout.hidden ? 0 : 1,
        height: layout.height ? `${layout.height}px` : undefined,
        zIndex: layout.z,
      }}
      onPointerDown={swipe.onPointerDown}
      onPointerMove={swipe.onPointerMove}
      onPointerUp={swipe.onPointerUp}
      onPointerCancel={swipe.onPointerCancel}
      onClickCapture={swipe.onClickCapture}
    >
      <div ref={swipeRef} className={`${prefix}__swipe`}>
        <div className={`${prefix}__card`}>
          <div
            ref={contentRef}
            className={`${prefix}__content`}
            data-action={toast.action ? "" : undefined}
          >
            {icon && (
              <span
                className={`${prefix}__icon`}
                data-type={customIcon ? "custom" : toast.type}
                onErrorCapture={() => setBrokenIcon(true)}
              >
                {icon}
              </span>
            )}
            <div className={`${prefix}__text`}>
              <div
                key={toast.version}
                className={`${prefix}__copy`}
                data-changed={toast.version > 0 || undefined}
              >
                {hasContent(toast.title) && (
                  <div className={`${prefix}__title`} dir="auto">
                    {toast.title}
                  </div>
                )}
                {hasContent(toast.description) && (
                  <div className={`${prefix}__desc`} dir="auto">
                    {toast.description}
                  </div>
                )}
              </div>
              {ghost && (
                <div
                  key={`ghost-${ghost.version}`}
                  className={`${prefix}__copy ${prefix}__ghost`}
                  aria-hidden="true"
                >
                  {hasContent(ghost.title) && (
                    <div className={`${prefix}__title`} dir="auto">
                      {ghost.title}
                    </div>
                  )}
                  {hasContent(ghost.description) && (
                    <div className={`${prefix}__desc`} dir="auto">
                      {ghost.description}
                    </div>
                  )}
                </div>
              )}
            </div>
            {toast.action && (
              <button
                type="button"
                className={`${prefix}__action`}
                title={
                  typeof toast.action.label === "string" ? toast.action.label : undefined
                }
                onClick={(event) => {
                  toast.action!.onClick(event);
                  if (!event.defaultPrevented) store.dismiss(toast.id);
                }}
              >
                <span className={`${prefix}__action-label`} dir="auto">
                  {toast.action.label}
                </span>
              </button>
            )}
          </div>
          {hairline && finite && (
            <span
              key={toast.version}
              className={`${prefix}__timer`}
              aria-hidden="true"
              style={{
                animationDuration: `${duration}ms`,
                animationPlayState: running ? "running" : "paused",
              }}
            />
          )}
        </div>
        {closeButton && (
          <button
            type="button"
            className={`${prefix}__close`}
            aria-label="Dismiss notification"
            onClick={() => store.dismiss(toast.id)}
          >
            <svg viewBox="0 0 24 24" className={`${prefix}__glyph`} aria-hidden="true">
              <path d="M7.5 7.5l9 9M16.5 7.5l-9 9" />
            </svg>
          </button>
        )}
      </div>
    </li>
  );
}
function ToastStatusIcon({ prefix }: { prefix: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${prefix}__status`} aria-hidden="true">
      <g className={`${prefix}__spin`}>
        <circle className={`${prefix}__ring`} cx="12" cy="12" r="9.25" pathLength={1} />
      </g>
      <path
        className={`${prefix}__mark ${prefix}__check`}
        d="M8.3 12.4l2.5 2.5 4.9-5.3"
        pathLength={1}
      />
      <path className={`${prefix}__mark ${prefix}__x1`} d="M9.5 9.5l5 5" pathLength={1} />
      <path
        className={`${prefix}__mark ${prefix}__x2`}
        d="M14.5 9.5l-5 5"
        pathLength={1}
      />
      <path className={`${prefix}__info`} d="M12 11.2v4.6M12 8.2h.01" />
    </svg>
  );
}
function ToasterView(
  props: ToasterProps & {
    store: ToastStore;
    clean: boolean;
  },
) {
  const {
    store,
    clean,
    inline = false,
    duration = 4000,
    offset,
    hotkey = "F8",
    hairline = true,
    closeButton = true,
    label = "Notifications",
    className,
  } = props;
  const prefix = clean ? "ui-tsc" : "ui-ts";
  const toaster = useToaster(props, store, prefix);
  const {
    rootRef,
    toasts,
    active,
    vertical,
    horizontal,
    direction,
    expanded,
    paused,
    height,
    layouts,
    layoutFor,
    onHeight,
    status,
    alert,
    onKeyDown,
    onFocus,
    onBlur,
    pointerType,
    setHovered,
    setTouchExpanded,
  } = toaster;
  const style: CSSProperties & Record<string, string | undefined> = {
    [`--${prefix}-offset`]:
      offset !== undefined && Number.isFinite(offset) ? `${offset}px` : undefined,
  };
  return (
    <section
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-y={vertical}
      data-x={horizontal}
      data-inline={inline || undefined}
      data-expanded={expanded || undefined}
      data-empty={!active.length || undefined}
      aria-label={hotkey ? `${label} (${hotkey})` : label}
      tabIndex={-1}
      style={style}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onPointerDownCapture={(event) => {
        pointerType.current = event.pointerType;
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovered(false);
      }}
      onClick={() => {
        if (pointerType.current !== "mouse" && active.length > 1) setTouchExpanded(true);
      }}
    >
      <ol className={`${prefix}__list`} style={{ height: `${height}px` }}>
        {toasts.map((toast) => (
          <ToastCard
            key={toastKey(toast)}
            toast={toast}
            store={store}
            prefix={prefix}
            layout={layoutFor(toastKey(toast))}
            direction={direction}
            paused={paused || (layouts.get(toastKey(toast))?.hidden ?? false)}
            defaultDuration={duration}
            hairline={hairline}
            closeButton={closeButton}
            onHeight={onHeight}
          />
        ))}
      </ol>
      <div className={`${prefix}__sr`} role="status" aria-live="polite">
        {status}
      </div>
      <div className={`${prefix}__sr`} role="alert">
        {alert}
      </div>
    </section>
  );
}
declare const toast_contract: ToastAPI;
const sameId = (left: ToastId, right: ToastId) => String(left) === String(right);
const hiddenToastLayout: ToastLayout = {
  y: 0,
  scale: 1,
  height: 0,
  z: 0,
  behind: false,
  hidden: true,
};
const toastKey = (toast: ToastRecord) => String(toast.id);
const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
const hasContent = (content: ReactNode) =>
  content != null && content !== "" && content !== false;
const store_default_store = createToastStore();
const toast_default_store = store_default_store.api;
export { Toaster };
export { toast_default_store as toast };
export type { ToastId };
export type { ToastPosition };
export type { ToastMessage };
export type { ToastAction };
export type { ToastOptions };
export type { ToastPromiseMessages };
export type { ToastAPI };
export type { ToasterProps };
