"use client";

import "./Combobox.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  Fragment,
  memo,
  type RefObject,
} from "react";
interface ComboboxOption {
  value: string;
  label: string;
  hint?: string;
  group?: string;
  keywords?: string;
  icon?: ReactNode;
  avatar?: string | boolean;
  color?: string;
  disabled?: boolean;
}
interface ComboboxProps {
  options: ComboboxOption[];
  multiple?: boolean;
  /** Values are arrays even when multiple is false. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[], options: ComboboxOption[]) => void;
  placeholder?: string;
  creatable?: boolean;
  onCreate?: (query: string) => ComboboxOption | void;
  createLabel?: (query: string) => string;
  maxVisibleTags?: number;
  label?: string;
  defaultOpen?: boolean;
  emptyText?: string;
  className?: string;
}
interface OptionGroup {
  name: string;
  options: ComboboxOption[];
}
interface AnimatedChip {
  value: string;
  leaving?: boolean;
}
interface OptionEvents {
  hover: (value: string) => void;
  choose: (option: ComboboxOption) => void;
}
interface ChipProps {
  prefix: string;
  animate: boolean;
  leaving?: boolean;
  armed: boolean;
  plain: boolean;
  children: ReactNode;
}
interface OptionRowProps {
  prefix: string;
  option: ComboboxOption;
  id: string;
  selected: boolean;
  active: boolean;
  query: string;
  events: RefObject<OptionEvents>;
}
interface ViewProps extends ComboboxProps {
  clean: boolean;
}
function Combobox(props: ComboboxProps) {
  return <ComboboxView {...props} clean={false} />;
}
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}
function initials(label: string) {
  const words = label
    .trim()
    .split(/\s+/)
    .map((word) => word.match(/[\p{L}\p{N}]/u)?.[0] ?? "")
    .filter(Boolean);
  return (
    (words[0] ?? "") + (words.length > 1 ? words[words.length - 1] : "")
  ).toUpperCase();
}
function stringValue(value: unknown) {
  return value == null ? "" : String(value);
}
function searchText(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}
function normalizeOptions(options: ComboboxOption[]) {
  const seen = new Set<string>();
  const normalized: ComboboxOption[] = [];
  for (const option of options ?? []) {
    if (!option || option.value == null) continue;
    const value = String(option.value);
    if (seen.has(value)) continue;
    seen.add(value);
    normalized.push({
      ...option,
      value,
      label: stringValue(option.label) || value,
      hint: option.hint == null ? undefined : stringValue(option.hint),
    });
  }
  return normalized;
}
function useCombobox(
  {
    options,
    multiple = true,
    value,
    defaultValue,
    onChange,
    creatable = false,
    onCreate,
    maxVisibleTags,
    defaultOpen = false,
  }: ComboboxProps,
  clean: boolean,
  prefix: string,
) {
  const idBase = prefix + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [localValue, setLocalValue] = useState(defaultValue ?? []);
  const selected = [...new Set(value ?? localValue)];
  const selectedSet = new Set(selected);
  const tagLimit =
    typeof maxVisibleTags === "number" && Number.isFinite(maxVisibleTags)
      ? Math.max(0, maxVisibleTags)
      : undefined;
  const [createdOptions, setCreatedOptions] = useState<ComboboxOption[]>([]);
  const [open, setOpen] = useState(defaultOpen);
  const [search, setSearch] = useState("");
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [indicatorVisible, setIndicatorVisible] = useState(true);
  const [armed, setArmed] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const fieldInnerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listInnerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const scrollToActive = useRef(false);
  const normalized = useMemo(() => normalizeOptions(options), [options]);
  const allOptions = useMemo(() => {
    const provided = new Set(normalized.map((option) => option.value));
    return [
      ...normalized,
      ...createdOptions.filter((option) => !provided.has(option.value)),
    ];
  }, [normalized, createdOptions]);
  const searchIndex = useMemo(
    () =>
      new Map(
        allOptions.map((option) => [
          option.value,
          {
            label: searchText(option.label),
            haystack: searchText(
              `${option.label} ${option.hint ?? ""} ${stringValue(option.keywords)}`,
            ),
          },
        ]),
      ),
    [allOptions],
  );
  const optionByValue = useMemo(
    () => new Map(allOptions.map((option) => [option.value, option])),
    [allOptions],
  );
  const findOption = (id: string): ComboboxOption =>
    optionByValue.get(id) ?? { value: id, label: id };
  const query = search.trim();
  const normalizedQuery = searchText(query);
  const groups = useMemo(() => {
    const result: OptionGroup[] = [];
    const groupByName = new Map<string, OptionGroup>();
    for (const option of allOptions) {
      if (
        normalizedQuery &&
        !searchIndex.get(option.value)!.haystack.includes(normalizedQuery)
      )
        continue;
      const name = stringValue(option.group);
      let group = groupByName.get(name);
      if (!group) {
        group = { name, options: [] };
        groupByName.set(name, group);
        result.push(group);
      }
      group.options.push(option);
    }
    return result;
  }, [allOptions, searchIndex, normalizedQuery]);
  const canCreate =
    creatable &&
    !!query &&
    !allOptions.some(
      (option) => searchIndex.get(option.value)!.label === normalizedQuery,
    );
  const navigableValues = [
    ...groups.flatMap((group) => group.options.map((option) => option.value)),
    ...(canCreate ? [CREATE_OPTION] : []),
  ];
  const optionIndex = new Map(navigableValues.map((id, index) => [id, index]));
  const active =
    highlighted !== null && optionIndex.has(highlighted)
      ? highlighted
      : navigableValues[0];
  const optionId = (id: string) => `${idBase}-o${optionIndex.get(id)}`;
  const [chips, setChips] = useState<AnimatedChip[]>(() =>
    selected.map((id) => ({ value: id })),
  );
  const chipsRef = useRef(chips);
  chipsRef.current = chips;
  const removalTimers = useRef(new Map<string, number>());
  const animateChips = useRef(false);
  const selectedKey = selected.join("\u0001");
  useEffect(() => {
    let changed = false;
    const next = chipsRef.current.map((chip) => {
      const stillSelected = selectedSet.has(chip.value);
      if (stillSelected && chip.leaving) {
        changed = true;
        window.clearTimeout(removalTimers.current.get(chip.value));
        removalTimers.current.delete(chip.value);
        return { value: chip.value };
      }
      if (!stillSelected && !chip.leaving) {
        changed = true;
        removalTimers.current.set(
          chip.value,
          window.setTimeout(() => {
            removalTimers.current.delete(chip.value);
            setChips((previous) =>
              previous.filter((item) => !(item.value === chip.value && item.leaving)),
            );
          }, 420),
        );
        return { value: chip.value, leaving: true };
      }
      return chip;
    });
    for (const id of selected)
      if (!next.some((chip) => chip.value === id)) {
        next.push({ value: id });
        changed = true;
      }
    if (changed) setChips(next);
  }, [selectedKey]);
  useEffect(() => {
    animateChips.current = true;
    const timers = removalTimers.current;
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);
  const measureRef = useRef<HTMLUListElement>(null);
  const [fittingTags, setFittingTags] = useState(Infinity);
  const currentChipKey = chips
    .filter((chip) => !chip.leaving)
    .map((chip) => chip.value)
    .join("|");
  useLayoutEffect(() => {
    if (!clean) return;
    const inner = fieldInnerRef.current;
    const measureList = measureRef.current;
    if (!inner || !measureList) return;
    const measure = () => {
      const widths = Array.from(
        measureList.children,
        (element) => (element as HTMLElement).offsetWidth + 4,
      );
      const moreWidth = widths.pop() ?? 0;
      const style = getComputedStyle(inner);
      const available =
        inner.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight) -
        72;
      let used = 0;
      let count = 0;
      for (; count < widths.length; count++) {
        const remainingIndicator = count + 1 < widths.length ? moreWidth : 0;
        if (used + widths[count] + remainingIndicator > available) break;
        used += widths[count];
      }
      setFittingTags(count);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [clean, currentChipKey]);
  const visibleLimit = clean
    ? Math.min(tagLimit ?? Infinity, fittingTags)
    : (tagLimit ?? Infinity);
  let seenVisible = 0;
  const visibleChips = chips.filter((chip) =>
    chip.leaving ? seenVisible < visibleLimit : seenVisible++ < visibleLimit,
  );
  const overflow = Math.max(
    0,
    chips.filter((chip) => !chip.leaving).length - visibleLimit,
  );
  const previousOverflow = useRef(overflow);
  const overflowDirection = useRef("up");
  if (overflow !== previousOverflow.current && overflow > 0)
    overflowDirection.current = overflow > previousOverflow.current ? "up" : "down";
  if (overflow > 0) previousOverflow.current = overflow;
  const displayedOverflow = overflow || previousOverflow.current;
  const overflowArmed =
    !!armed && overflow > 0 && !visibleChips.some((chip) => chip.value === armed);
  const previousCount = useRef(selected.length);
  const countDirection = useRef("up");
  if (selected.length !== previousCount.current) {
    countDirection.current = selected.length > previousCount.current ? "up" : "down";
    previousCount.current = selected.length;
  }
  const changeSelection = (next: string[], changedOption?: ComboboxOption) => {
    if (value === undefined) setLocalValue(next);
    onChange?.(
      next,
      next.map((id) => (changedOption?.value === id ? changedOption : findOption(id))),
    );
  };
  const announceSelection = (text: string, count: number) =>
    setAnnouncement(multiple ? `${text}. ${count} selected` : text);
  const choose = (option: ComboboxOption) => {
    const alreadySelected = selectedSet.has(option.value);
    const next = multiple
      ? alreadySelected
        ? selected.filter((id) => id !== option.value)
        : [...selected, option.value]
      : [option.value];
    changeSelection(next, option);
    announceSelection(
      `${option.label} ${alreadySelected && multiple ? "removed" : "selected"}`,
      next.length,
    );
    setArmed(null);
    if (search) setSearch("");
    if (!multiple) setOpen(false);
  };
  const createOption = () => {
    const created = onCreate?.(query) || { value: query, label: query };
    setCreatedOptions((previous) => [
      ...previous.filter((option) => option.value !== created.value),
      created,
    ]);
    setHighlighted(created.value);
    choose(created);
  };
  const remove = (id: string) => {
    const next = selected.filter((value) => value !== id);
    changeSelection(next);
    announceSelection(`${findOption(id).label} removed`, next.length);
    setArmed(null);
  };
  useLayoutEffect(() => {
    const field = fieldRef.current;
    const inner = fieldInnerRef.current;
    if (!field || !inner) return;
    const measure = () => {
      field.style.height = `${inner.offsetHeight}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    const list = listRef.current;
    const inner = listInnerRef.current;
    if (!open || !list || !inner) return;
    const measure = () => {
      const style = getComputedStyle(list);
      const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const maxHeight = parseFloat(style.maxHeight) || Infinity;
      list.style.height = `${Math.min(inner.offsetHeight + padding, maxHeight)}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [open]);
  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!open || !list || !indicator) return;
    const row = list.querySelector<HTMLElement>("[data-active]");
    if (!row) {
      indicator.style.opacity = "0";
      return;
    }
    const firstPosition = !indicator.dataset.ready;
    if (firstPosition) indicator.style.transition = "none";
    indicator.style.opacity = !clean || indicatorVisible ? "1" : "0";
    indicator.style.height = `${row.offsetHeight}px`;
    indicator.style.transform = `translateY(${row.offsetTop}px)`;
    if (firstPosition) {
      indicator.dataset.ready = "1";
      void indicator.offsetWidth;
      indicator.style.transition = "";
    }
    if (!scrollToActive.current) return;
    scrollToActive.current = false;
    const previous = row.previousElementSibling;
    const groupHeight =
      previous instanceof HTMLElement &&
      previous.classList.contains(`${prefix}__group-label`)
        ? previous.offsetHeight
        : 0;
    const top = row.offsetTop - 6 - groupHeight;
    const bottom = row.offsetTop + row.offsetHeight + 6;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight)
      list.scrollTop = bottom - list.clientHeight;
  });
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setOpen(false);
        setArmed(null);
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  const moveActive = (offset: number) => {
    if (!navigableValues.length) return;
    scrollToActive.current = true;
    if (clean) setIndicatorVisible(true);
    const current = optionIndex.get(active) ?? 0;
    setHighlighted(
      navigableValues[
        (current + offset + navigableValues.length) % navigableValues.length
      ],
    );
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace") setArmed(null);
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (!open) setOpen(true);
        else moveActive(event.key === "ArrowDown" ? 1 : -1);
        break;
      case "Enter":
        if (!open || !active) return;
        event.preventDefault();
        if (active === CREATE_OPTION) createOption();
        else choose(findOption(active));
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
        } else if (search) setSearch("");
        break;
      case "Tab":
        setOpen(false);
        break;
      case "Backspace":
        if (search || !selected.length) return;
        event.preventDefault();
        const last = selected[selected.length - 1];
        if (armed === last) remove(last);
        else {
          setArmed(last);
          setAnnouncement(`${findOption(last).label} – press Backspace again to remove`);
        }
        break;
    }
  };
  const onFieldMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("button")) return;
    if (event.target !== inputRef.current) event.preventDefault();
    inputRef.current?.focus();
    setArmed(null);
    setOpen(true);
  };
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget)) {
      setOpen(false);
      setArmed(null);
    }
  };
  const preventMouseFocus = (event: MouseEvent) => event.preventDefault();
  const optionEvents = useRef<OptionEvents>({
    hover: () => {},
    choose: () => {},
  });
  optionEvents.current = {
    hover: (id) => {
      if (clean) setIndicatorVisible(true);
      if (active !== id) setHighlighted(id);
    },
    choose: (option) => {
      setHighlighted(option.value);
      choose(option);
    },
  };
  const updateSearch = (text: string) => {
    setSearch(text);
    setHighlighted(null);
    setArmed(null);
    setOpen(true);
  };
  const toggle = () => {
    inputRef.current?.focus();
    setOpen((previous) => !previous);
  };
  return {
    idBase,
    selected,
    selectedSet,
    tagLimit,
    open,
    search,
    armed,
    announcement,
    rootRef,
    fieldRef,
    fieldInnerRef,
    inputRef,
    listRef,
    listInnerRef,
    indicatorRef,
    query,
    groups,
    canCreate,
    active,
    optionId,
    chips,
    animateChips,
    measureRef,
    visibleChips,
    overflow,
    displayedOverflow,
    overflowArmed,
    overflowDirection,
    countDirection,
    findOption,
    remove,
    createOption,
    setIndicatorVisible,
    onKeyDown,
    onFieldMouseDown,
    onBlur,
    preventMouseFocus,
    optionEvents,
    updateSearch,
    toggle,
  };
}
function ComboboxGlyph({
  prefix,
  kind,
  className,
}: {
  prefix: string;
  kind: keyof typeof GLYPHS;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={[`${prefix}__glyph`, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <path d={GLYPHS[kind]} />
    </svg>
  );
}
function HighlightedText({ text, query }: { text: string; query: string }) {
  const normalized = searchText(text);
  const search = searchText(query);
  const start =
    search && normalized.length === text.length ? normalized.indexOf(search) : -1;
  return start < 0 ? (
    <Fragment>{text}</Fragment>
  ) : (
    <Fragment>
      {text.slice(0, start)}
      <mark>{text.slice(start, start + search.length)}</mark>
      {text.slice(start + search.length)}
    </Fragment>
  );
}
function OptionLeading({ prefix, option }: { prefix: string; option: ComboboxOption }) {
  const [imageFailed, setImageFailed] = useState(false);
  if (option.icon) return <span className={`${prefix}__icon`}>{option.icon}</span>;
  if (typeof option.avatar === "string" && !imageFailed)
    return (
      <img
        className={`${prefix}__avatar`}
        src={option.avatar}
        alt=""
        onError={() => setImageFailed(true)}
      />
    );
  if (option.avatar)
    return (
      <span className={`${prefix}__avatar`} aria-hidden="true">
        {initials(option.label)}
      </span>
    );
  if (option.color)
    return (
      <span
        className={`${prefix}__dot`}
        style={{ background: option.color }}
        aria-hidden="true"
      />
    );
  return null;
}
function SelectedChip({ prefix, animate, leaving, armed, plain, children }: ChipProps) {
  const rootRef = useRef<HTMLLIElement>(null);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!animate || !root || prefersReducedMotion()) return;
    root.animate(
      [
        { gridTemplateColumns: "0fr", marginRight: "0px" },
        { gridTemplateColumns: "1fr", marginRight: "4px" },
      ],
      { duration: 260, easing: CHIP_EASING },
    );
    root.firstElementChild?.animate(
      [
        { opacity: 0, transform: "scale(0.6)" },
        { opacity: 1, transform: "scale(1.05)", offset: 0.6 },
        { opacity: 1, transform: "none" },
      ],
      { duration: 340, easing: CHIP_EASING },
    );
  }, []);
  return (
    <li
      ref={rootRef}
      className={`${prefix}__chip`}
      data-leaving={leaving || undefined}
      data-armed={armed || undefined}
      data-plain={plain || undefined}
    >
      {children}
    </li>
  );
}
function ComboboxView(props: ViewProps) {
  const {
    multiple = true,
    placeholder = "Search…",
    createLabel = (query) => `Create “${query}”`,
    label,
    emptyText = "No results",
    className,
    clean,
  } = props;
  const prefix = clean ? "ui-cbxc" : "ui-cbx";
  const state = useCombobox(props, clean, prefix);
  const list = (
    <div
      ref={state.listRef}
      id={`${state.idBase}-list`}
      className={`${prefix}__list`}
      role="listbox"
      aria-multiselectable={multiple || undefined}
      aria-labelledby={label ? `${state.idBase}-label` : undefined}
      aria-label={label ? undefined : "Options"}
      onMouseLeave={clean ? () => state.setIndicatorVisible(false) : undefined}
    >
      <span ref={state.indicatorRef} className={`${prefix}__pill`} aria-hidden="true" />
      <div ref={state.listInnerRef} className={`${prefix}__list-inner`}>
        {state.groups.map((group, index) => (
          <div
            role="group"
            aria-labelledby={group.name ? `${state.idBase}-g${index}` : undefined}
            className={`${prefix}__group`}
            key={group.name || "_"}
          >
            {group.name && (
              <div
                className={`${prefix}__group-label`}
                dir="auto"
                id={`${state.idBase}-g${index}`}
              >
                {group.name}
              </div>
            )}
            {group.options.map((option) => (
              <OptionRow_combobox_parts
                prefix={prefix}
                option={option}
                id={state.optionId(option.value)}
                selected={state.selectedSet.has(option.value)}
                active={state.active === option.value}
                query={state.query}
                events={state.optionEvents}
                key={option.value}
              />
            ))}
          </div>
        ))}
        {!state.groups.length && (
          <div className={`${prefix}__empty`} key={state.query}>
            {emptyText}
            {state.query && (
              <Fragment>
                {" for “"}
                {state.query}
                {"”"}
              </Fragment>
            )}
          </div>
        )}
        {state.canCreate && (
          <div
            id={state.optionId(CREATE_OPTION)}
            role="option"
            aria-selected={false}
            data-active={state.active === CREATE_OPTION || undefined}
            className={`${prefix}__option ${prefix}__create`}
            onMouseDown={state.preventMouseFocus}
            onMouseMove={() => state.optionEvents.current.hover(CREATE_OPTION)}
            onClick={state.createOption}
          >
            <span className={`${prefix}__plus`} aria-hidden="true">
              <ComboboxGlyph prefix={prefix} kind="plus" />
            </span>
            <span
              className={`${prefix}__name`}
              dir="auto"
              title={createLabel(state.query)}
            >
              {createLabel(state.query)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div
      ref={state.rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-open={state.open || undefined}
      onBlur={state.onBlur}
    >
      {label && (
        <label
          className={`${prefix}__label`}
          id={`${state.idBase}-label`}
          htmlFor={`${state.idBase}-input`}
        >
          {label}
        </label>
      )}
      <div
        ref={state.fieldRef}
        className={`${prefix}__field`}
        onMouseDown={state.onFieldMouseDown}
      >
        <div ref={state.fieldInnerRef} className={`${prefix}__field-inner`}>
          {clean && (
            <ul
              ref={state.measureRef}
              className={`${prefix}__measure`}
              aria-hidden="true"
            >
              {state.chips
                .filter((chip) => !chip.leaving)
                .map((chip) => {
                  const option = state.findOption(chip.value);
                  const plain = !option.icon && !option.avatar && !option.color;
                  return (
                    <li
                      className={`${prefix}__chip`}
                      data-plain={plain || undefined}
                      key={chip.value}
                    >
                      <span className={`${prefix}__chip-body`}>
                        <OptionLeading prefix={prefix} option={option} />
                        <span className={`${prefix}__chip-label`}>{option.label}</span>
                        <span className={`${prefix}__chip-x`} />
                      </span>
                    </li>
                  );
                })}
              <li className={`${prefix}__chip ${prefix}__more`}>
                <span className={`${prefix}__chip-body`}>+99</span>
              </li>
            </ul>
          )}
          {(clean
            ? state.chips.length > 0
            : state.visibleChips.length > 0 || state.tagLimit !== undefined) && (
            <ul className={`${prefix}__chips`} role="list" aria-label="Selected">
              {state.visibleChips.map((chip) => {
                const option = state.findOption(chip.value);
                const plain = !option.icon && !option.avatar && !option.color;
                return (
                  <SelectedChip
                    prefix={prefix}
                    animate={state.animateChips.current}
                    leaving={chip.leaving}
                    armed={state.armed === chip.value}
                    plain={plain}
                    key={chip.value}
                  >
                    <span className={`${prefix}__chip-body`}>
                      <OptionLeading prefix={prefix} option={option} />
                      <span
                        className={`${prefix}__chip-label`}
                        dir="auto"
                        title={option.label}
                      >
                        {option.label}
                      </span>
                      <button
                        type="button"
                        className={`${prefix}__chip-x`}
                        tabIndex={-1}
                        aria-label={`Remove ${option.label}`}
                        onMouseDown={state.preventMouseFocus}
                        onClick={() => state.remove(chip.value)}
                      >
                        <ComboboxGlyph prefix={prefix} kind="close" />
                      </button>
                    </span>
                  </SelectedChip>
                );
              })}
              {(clean || state.tagLimit !== undefined) && (
                <li
                  className={`${prefix}__chip ${prefix}__more`}
                  data-hidden={!state.overflow || undefined}
                  data-armed={state.overflowArmed || undefined}
                  aria-hidden={!state.overflow || undefined}
                >
                  <span className={`${prefix}__chip-body`}>
                    {"+"}
                    <span className={`${prefix}__roll`}>
                      <span
                        data-dir={state.overflowDirection.current}
                        key={state.displayedOverflow}
                      >
                        {state.displayedOverflow.toLocaleString("en-US")}
                      </span>
                    </span>
                  </span>
                </li>
              )}
            </ul>
          )}
          <input
            ref={state.inputRef}
            id={`${state.idBase}-input`}
            className={`${prefix}__input`}
            dir="auto"
            value={state.search}
            placeholder={state.selected.length ? undefined : placeholder}
            autoComplete="off"
            spellCheck={false}
            role="combobox"
            aria-expanded={state.open}
            aria-controls={`${state.idBase}-list`}
            aria-autocomplete="list"
            aria-activedescendant={
              state.open && state.active ? state.optionId(state.active) : undefined
            }
            aria-label={label ? undefined : placeholder}
            onChange={(event) => state.updateSearch(event.target.value)}
            onKeyDown={state.onKeyDown}
          />
        </div>
        <button
          type="button"
          className={`${prefix}__toggle`}
          tabIndex={-1}
          aria-label={state.open ? "Close list" : "Open list"}
          onMouseDown={state.preventMouseFocus}
          onClick={state.toggle}
        >
          <ComboboxGlyph prefix={prefix} kind="chevron" />
        </button>
      </div>
      {state.open && (
        <div className={`${prefix}__pop`} onMouseDown={state.preventMouseFocus}>
          {clean ? list : <div className={`${prefix}__card`}>{list}</div>}
          <div className={`${prefix}__foot`} aria-hidden="true">
            <span className={`${prefix}__count`}>
              <span className={`${prefix}__roll`}>
                <span data-dir={state.countDirection.current} key={state.selected.length}>
                  {state.selected.length.toLocaleString("en-US")}
                </span>
              </span>
              {"\u00a0selected"}
            </span>
            <span className={`${prefix}__keys`}>
              <kbd>↑</kbd>
              <kbd>↓</kbd>
              <span>to move</span>
              <kbd>↵</kbd>
              <span>
                {"to "}
                {multiple ? "toggle" : "pick"}
              </span>
            </span>
          </div>
        </div>
      )}
      <span className={`${prefix}__live`} aria-live="polite">
        {state.announcement}
      </span>
    </div>
  );
}
const CREATE_OPTION = "\0create";
const CHIP_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const GLYPHS = {
  close: "M7 7l10 10M17 7 7 17",
  check: "M5.5 12.5l4 4L18.5 8",
  chevron: "M8 10l4 4 4-4",
  plus: "M12 6v12M6 12h12",
};
const OptionRow_combobox_parts = memo(function OptionRow({
  prefix,
  option,
  id,
  selected,
  active,
  query,
  events,
}: OptionRowProps) {
  return (
    <div
      id={id}
      role="option"
      aria-selected={selected}
      data-active={active || undefined}
      className={`${prefix}__option`}
      onMouseDown={(event) => event.preventDefault()}
      onMouseMove={() => events.current.hover(option.value)}
      onClick={() => events.current.choose(option)}
    >
      <OptionLeading prefix={prefix} option={option} />
      <span className={`${prefix}__text`}>
        <span className={`${prefix}__name`} dir="auto" title={option.label}>
          <HighlightedText text={option.label} query={query} />
        </span>
        {option.hint && (
          <span className={`${prefix}__hint`} dir="auto" title={option.hint}>
            <HighlightedText text={option.hint} query={query} />
          </span>
        )}
      </span>
      <ComboboxGlyph prefix={prefix} kind="check" className={`${prefix}__check`} />
    </div>
  );
});
export { Combobox };
export type { ComboboxOption };
export type { ComboboxProps };
