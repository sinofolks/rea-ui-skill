"use client";

import "./PromptLibrary.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useEffect,
  useRef,
  useState,
  useCallback,
  useId,
  useLayoutEffect,
  type KeyboardEvent,
  type ReactNode,
  Fragment,
  memo,
  type SVGProps,
} from "react";
/** Structural model reconstructed from public preview data; optional fields remain extensible. */
interface PromptVariable {
  description?: string;
  default?: string;
  [field: string]: unknown;
}
type PromptTemplate = {
  id?: string;
  title?: string;
  category?: string;
  body?: string;
  variables?: Record<string, PromptVariable | undefined>;
  [field: string]: unknown;
};
interface PromptLibraryProps {
  templates: PromptTemplate[];
  value?: string;
  defaultValue?: string;
  onSelect?: (id: string) => void;
  onUse?: (
    prompt: string,
    template: PromptTemplate,
    values: Record<string, string>,
  ) => void;
  onCopy?: (prompt: string) => void;
  title?: string;
  useLabel?: string;
  className?: string;
}
type TemplatePart =
  | {
      text: string;
    }
  | {
      name: string;
      tail: string;
    };
type VariableValues = Record<string, string>;
interface Template {
  id: string;
  title: string;
  category?: string;
  body: string;
  tone?: string;
  variables: Record<
    string,
    {
      description?: string;
      default?: string;
    }
  >;
  source: PromptTemplate;
}
interface VariableFlash {
  name: string;
  count: number;
}
interface Notice {
  id: number;
  kind: "copied" | "used";
}
interface OutgoingPanel {
  id: string;
  key: number;
}
interface CaptionProps {
  prefix: string;
  id: string;
  tone?: string;
  children: ReactNode;
}
interface PanelProps {
  prefix: string;
  template: Template;
  tone: string;
  values: VariableValues;
  flash: VariableFlash | null;
  idBase: string;
  onChange?: (name: string, value: string) => void;
  onHint?: (name: string | null) => void;
  onEnter?: (name: string) => void;
  out?: boolean;
}
interface OptionProps {
  prefix: string;
  template: Template;
  tone: string;
  selected: boolean;
  focusable: boolean;
  pick: (id: string) => void;
  register: (id: string, element: HTMLDivElement | null) => void;
}
interface ViewProps extends PromptLibraryProps {
  clean: boolean;
}
function PromptLibrary(props: PromptLibraryProps) {
  return <PromptLibraryView {...props} clean={false} />;
}
function normalizeTemplate(source: PromptTemplate, index: number): Template {
  const variables: Template["variables"] = {};
  for (const [name, value] of Object.entries(source.variables ?? {})) {
    if (!value || typeof value !== "object") continue;
    variables[name] = {
      description:
        "description" in value && typeof value.description === "string"
          ? value.description
          : undefined,
      default:
        "default" in value && typeof value.default === "string"
          ? value.default
          : undefined,
    };
  }
  return {
    id: source.id ?? `template-${index}`,
    title: source.title ?? "",
    category: source.category,
    body: source.body ?? "",
    tone: typeof source.tone === "string" ? source.tone : undefined,
    variables,
    source,
  };
}
function templateParts(body: string): TemplatePart[] {
  const parts: TemplatePart[] = [];
  let position = 0;
  for (const match of body.matchAll(VARIABLE_PATTERN)) {
    if (match.index! > position) parts.push({ text: body.slice(position, match.index) });
    const afterToken = match.index! + match[0].length;
    const punctuation = /^[.,;:!?)\]"'’…]+/.exec(body.slice(afterToken))?.[0] ?? "";
    parts.push({ name: match[1], tail: punctuation });
    position = afterToken + punctuation.length;
  }
  if (position < body.length) parts.push({ text: body.slice(position) });
  return parts;
}
function variableNames(body: string) {
  return [...new Set([...body.matchAll(VARIABLE_PATTERN)].map((match) => match[1]))];
}
function fillTemplate(body: string, values: VariableValues) {
  return body.replace(VARIABLE_PATTERN, (token, name: string) =>
    values[name]?.trim() ? values[name] : token,
  );
}
function defaultValues(template: Template) {
  const values: VariableValues = {};
  for (const name of variableNames(template.body))
    values[name] = template.variables[name]?.default ?? "";
  return values;
}
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function useAnimatedTokenCount(prompt: string) {
  const target = Math.max(1, Math.round(prompt.length / 4));
  const [count, setCount] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    const from = current.current;
    if (prefersReducedMotion() || from === target) {
      current.current = target;
      setCount(target);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 420);
      current.current = from + (target - from) * (1 - (1 - progress) ** 4);
      setCount(current.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return Math.round(count);
}
function usePromptLibrary(
  {
    templates: sourceTemplates,
    value,
    defaultValue,
    onSelect,
    onUse,
    onCopy,
  }: PromptLibraryProps,
  prefix: string,
) {
  const templates = sourceTemplates.map(normalizeTemplate);
  const idBase = useId();
  const [localSelection, setLocalSelection] = useState(defaultValue ?? templates[0]?.id);
  const selectedId = value ?? localSelection;
  const selected =
    templates.find((template) => template.id === selectedId) ?? templates[0];
  const [search, setSearch] = useState("");
  const [drafts, setDrafts] = useState<Record<string, VariableValues>>({});
  const valuesFor = (template: Template) => ({
    ...defaultValues(template),
    ...drafts[template.id],
  });
  const [flash, setFlash] = useState<VariableFlash | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [useHovered, setUseHovered] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const categoryTones = new Map<string, string>();
  for (const template of templates)
    if (template.category && !categoryTones.has(template.category))
      categoryTones.set(
        template.category,
        CATEGORY_TONES[categoryTones.size % CATEGORY_TONES.length],
      );
  const toneFor = (template: Template) =>
    template.tone ?? categoryTones.get(template.category ?? "") ?? "gray";
  const query = search.trim().toLowerCase();
  const filtered = query
    ? templates.filter((template) =>
        [template.title, template.category ?? "", template.body].some((text) =>
          text.toLowerCase().includes(query),
        ),
      )
    : templates;
  const selectTemplate = (id: string) => {
    if (id === selectedId) return;
    if (value === undefined) setLocalSelection(id);
    onSelect?.(id);
  };
  const [outgoing, setOutgoing] = useState<OutgoingPanel | null>(null);
  const [previousId, setPreviousId] = useState(selected?.id);
  if (selected && previousId !== selected.id) {
    if (previousId && !prefersReducedMotion())
      setOutgoing({ id: previousId, key: Date.now() });
    setPreviousId(selected.id);
    setHint(null);
    setFlash(null);
  }
  useEffect(() => {
    if (!outgoing) return;
    const timeout = window.setTimeout(() => setOutgoing(null), 260);
    return () => window.clearTimeout(timeout);
  }, [outgoing]);
  const outgoingTemplate = outgoing
    ? templates.find((template) => template.id === outgoing.id)
    : undefined;
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef(new Map<string, HTMLDivElement>());
  const selectRef = useRef(selectTemplate);
  selectRef.current = selectTemplate;
  const pick = useCallback((id: string) => selectRef.current(id), []);
  const register = useCallback((id: string, element: HTMLDivElement | null) => {
    if (element) optionRefs.current.set(id, element);
    else optionRefs.current.delete(id);
  }, []);
  const [indicator, setIndicator] = useState({
    y: 0,
    height: 0,
    visible: false,
    moved: false,
  });
  const filteredIds = filtered.map((template) => template.id).join("|");
  const selectedVisible = filtered.some((template) => template.id === selected?.id);
  useLayoutEffect(() => {
    const measure = () => {
      const option = selected ? optionRefs.current.get(selected.id) : undefined;
      setIndicator((previous) =>
        option
          ? {
              y: option.offsetTop,
              height: option.offsetHeight,
              visible: true,
              moved: previous.visible,
            }
          : { ...previous, visible: false, moved: false },
      );
    };
    measure();
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [selected?.id, filteredIds]);
  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!filtered.length) return;
    const currentIndex = filtered.findIndex((template) => template.id === selected?.id);
    let nextIndex: number;
    switch (event.key) {
      case "ArrowDown":
        nextIndex =
          currentIndex < 0 ? 0 : Math.min(filtered.length - 1, currentIndex + 1);
        break;
      case "ArrowUp":
        nextIndex =
          currentIndex < 0 ? filtered.length - 1 : Math.max(0, currentIndex - 1);
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = filtered.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectTemplate(filtered[nextIndex].id);
    optionRefs.current.get(filtered[nextIndex].id)?.focus();
  };
  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && filtered.length) {
      event.preventDefault();
      const target =
        filtered.find((template) => template.id === selected?.id) ?? filtered[0];
      selectTemplate(target.id);
      optionRefs.current.get(target.id)?.focus();
    } else if (event.key === "Escape" && search) {
      event.preventDefault();
      setSearch("");
    }
  };
  const values = selected ? valuesFor(selected) : {};
  const names = selected ? variableNames(selected.body) : [];
  const missing = names.filter((name) => !values[name]?.trim());
  const ready = !!selected && missing.length === 0;
  const prompt = selected ? fillTemplate(selected.body, values) : "";
  const tokenCount = useAnimatedTokenCount(prompt);
  const updateVariable = (name: string, text: string) => {
    if (!selected) return;
    const id = selected.id;
    setDrafts((previous) => ({
      ...previous,
      [id]: { ...valuesFor(selected), ...previous[id], [name]: text },
    }));
    setFlash((previous) => ({ name, count: (previous?.count ?? 0) + 1 }));
  };
  const [readyPulse, setReadyPulse] = useState(0);
  const previousReady = useRef(ready);
  const readyTemplateId = useRef(selected?.id);
  useEffect(() => {
    if (ready && !previousReady.current && readyTemplateId.current === selected?.id) {
      setReadyPulse((previous) => previous + 1);
      setAnnouncement("All variables filled");
    }
    previousReady.current = ready;
    readyTemplateId.current = selected?.id;
  }, [ready, selected?.id]);
  const usePrompt = () => {
    if (!ready || !selected) return;
    onUse?.(prompt, selected.source, values);
    setNotice({ id: Date.now(), kind: "used" });
    setAnnouncement(`${selected.title} used`);
  };
  const onVariableEnter = (name: string) => {
    const inputs = [
      ...(rootRef.current?.querySelectorAll<HTMLInputElement>(
        `.${prefix}__panel:not([data-out]) .${prefix}__input`,
      ) ?? []),
    ];
    const currentIndex = inputs.findIndex((input) => input.dataset.var === name);
    const next = [
      ...inputs.slice(currentIndex + 1),
      ...inputs.slice(0, currentIndex),
    ].find((input) => !input.value.trim());
    if (next) next.focus();
    else if (ready) usePrompt();
  };
  const copyPrompt = async () => {
    try {
      await navigator.clipboard?.writeText(prompt);
    } catch {
      /* Copy callbacks still receive the prompt if clipboard permission is unavailable. */
    }
    onCopy?.(prompt);
    setNotice({ id: Date.now(), kind: "copied" });
    setAnnouncement("Prompt copied");
  };
  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [notice]);
  useEffect(() => {
    if (!announcement) return;
    const timeout = window.setTimeout(() => setAnnouncement(""), 2000);
    return () => window.clearTimeout(timeout);
  }, [announcement]);
  let caption: ReactNode = selected ? (
    <>
      ~{formatCount.format(tokenCount)} {tokenCount === 1 ? "token" : "tokens"}
    </>
  ) : null;
  let captionId = "tokens";
  let captionTone: string | undefined;
  const activeHint = hint && names.includes(hint) ? hint : null;
  if (notice) {
    caption = notice.kind === "copied" ? "Copied to clipboard" : "Prompt sent";
    captionId = `${notice.kind}-${notice.id}`;
    captionTone = "ok";
  } else if (activeHint) {
    caption = (
      <>
        <b>{activeHint}</b>
        {" · "}
        {selected?.variables[activeHint]?.description ??
          (values[activeHint]?.trim() ? "filled" : "fill this in")}
      </>
    );
    captionId = `hint-${activeHint}`;
  } else if (useHovered && !ready) {
    caption = `Fill ${missing.length} more to use`;
    captionId = "missing";
  }
  return {
    templates,
    idBase,
    selected,
    search,
    setSearch,
    valuesFor,
    flash,
    setHint,
    setUseHovered,
    notice,
    announcement,
    toneFor,
    filtered,
    outgoing,
    outgoingTemplate,
    rootRef,
    listRef,
    pick,
    register,
    indicator,
    selectedVisible,
    onListKeyDown,
    onSearchKeyDown,
    values,
    ready,
    updateVariable,
    readyPulse,
    usePrompt,
    onVariableEnter,
    copyPrompt,
    caption,
    captionId,
    captionTone,
  };
}
function PromptIcon({
  kind,
  clean,
}: {
  kind: "search" | "copy" | "check" | "arrow";
  clean: boolean;
}) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: clean ? 1.1 : 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } satisfies SVGProps<SVGElement>;
  const size = clean ? 16 : kind === "search" ? 13 : 12;
  return (
    <svg
      width={String(size)}
      height={String(size)}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      {kind === "search" &&
        (clean ? (
          <>
            <circle cx="7.25" cy="7.25" r="4.25" {...stroke} />
            <path d="m10.5 10.5 3 3" {...stroke} />
          </>
        ) : (
          <>
            <circle cx="5.8" cy="5.8" r="3.8" {...stroke} />
            <path d="m8.6 8.6 2.4 2.4" {...stroke} />
          </>
        ))}
      {kind === "copy" &&
        (clean ? (
          <>
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.75" {...stroke} />
            <path
              d="M10.5 5.5V4.25A1.75 1.75 0 0 0 8.75 2.5h-4.5A1.75 1.75 0 0 0 2.5 4.25v4.5c0 .97.78 1.75 1.75 1.75H5.5"
              {...stroke}
            />
          </>
        ) : (
          <>
            <rect x="3.8" y="3.8" width="6.4" height="6.4" rx="1.6" {...stroke} />
            <path
              d="M8.2 3.6V3.2A1.4 1.4 0 0 0 6.8 1.8H3.2a1.4 1.4 0 0 0-1.4 1.4v3.6a1.4 1.4 0 0 0 1.4 1.4h.4"
              {...stroke}
            />
          </>
        ))}
      {kind === "check" && (
        <path
          d={clean ? "m3.5 8.25 3 3 6-6.5" : "m2.6 6.3 2.2 2.2 4.6-5"}
          {...stroke}
          strokeWidth={clean ? 1.4 : 1.6}
        />
      )}
      {kind === "arrow" &&
        (clean ? (
          <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" {...stroke} strokeWidth={1.25} />
        ) : (
          <path d="M2.5 6h7M6.5 3l3 3-3 3" {...stroke} />
        ))}
    </svg>
  );
}
function PromptCaption({ prefix, id, tone, children }: CaptionProps) {
  const previous = useRef({ id, tone, node: children });
  const [shownId, setShownId] = useState(id);
  const [outgoing, setOutgoing] = useState<typeof previous.current | null>(null);
  if (shownId !== id) {
    setShownId(id);
    setOutgoing(previous.current);
  }
  previous.current = { id, tone, node: children };
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
          data-tone={outgoing.tone}
          aria-hidden="true"
          key={`out-${outgoing.id}`}
        >
          {outgoing.node}
        </span>
      )}
      <span className={`${prefix}__swap-item`} data-tone={tone} key={id}>
        {children}
      </span>
    </span>
  );
}
function TemplatePanel({
  prefix,
  template,
  tone,
  values,
  flash,
  idBase,
  onChange,
  onHint,
  onEnter,
  out,
}: PanelProps) {
  const parts = templateParts(template.body);
  const names = variableNames(template.body);
  const filled = names.filter((name) => values[name]?.trim()).length;
  const flashFor = (name: string) =>
    flash?.name === name ? (flash.count % 2 ? "a" : "b") : undefined;
  return (
    <div
      className={`${prefix}__panel`}
      data-out={out ? "" : undefined}
      aria-hidden={out || undefined}
      inert={out}
    >
      <div className={`${prefix}__panel-head`}>
        <span className={`${prefix}__panel-title`} dir="auto" title={template.title}>
          {template.title}
        </span>
        {template.category && (
          <span
            className={`${prefix}__tag`}
            data-tone={tone}
            dir="auto"
            title={template.category}
          >
            {template.category}
          </span>
        )}
        {names.length > 0 && (
          <span className={`${prefix}__count`}>
            {names.length <= 12 && (
              <span className={`${prefix}__bars`} aria-hidden="true">
                {names.map((name) => (
                  <span
                    className={`${prefix}__bar`}
                    data-on={values[name]?.trim() ? "" : undefined}
                    key={name}
                  />
                ))}
              </span>
            )}
            {filled}
            {" of "}
            {names.length}
            {" filled"}
          </span>
        )}
      </div>
      <p className={`${prefix}__body`} dir="auto">
        {parts.map((part, index) =>
          "text" in part ? (
            <Fragment key={index}>{part.text}</Fragment>
          ) : (
            <span className={`${prefix}__glue`} key={index}>
              <span
                className={`${prefix}__token`}
                data-filled={values[part.name]?.trim() ? "" : undefined}
                data-flash={flashFor(part.name)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") onHint?.(part.name);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") onHint?.(null);
                }}
              >
                <span className={`${prefix}__sizer`} aria-hidden="true">
                  {values[part.name] || part.name}
                </span>
                <input
                  className={`${prefix}__input`}
                  data-var={part.name}
                  size={1}
                  value={values[part.name] ?? ""}
                  placeholder={part.name}
                  aria-label={
                    template.variables[part.name]?.description
                      ? `${part.name} – ${template.variables[part.name].description}`
                      : part.name
                  }
                  spellCheck={false}
                  autoComplete="off"
                  onChange={(event) => onChange?.(part.name, event.target.value)}
                  onFocus={() => onHint?.(part.name)}
                  onBlur={() => onHint?.(null)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      onEnter?.(part.name);
                    }
                  }}
                />
              </span>
              {part.tail}
            </span>
          ),
        )}
      </p>
      <div className={`${prefix}__label`} id={`${idBase}-preview`}>
        Preview
      </div>
      <div
        className={`${prefix}__preview`}
        dir="auto"
        aria-labelledby={`${idBase}-preview`}
        role="region"
      >
        {parts.map((part, index) =>
          "text" in part ? (
            <Fragment key={index}>{part.text}</Fragment>
          ) : (
            <span className={`${prefix}__glue`} key={index}>
              {values[part.name]?.trim() ? (
                <span className={`${prefix}__fill`} data-flash={flashFor(part.name)}>
                  {values[part.name]}
                </span>
              ) : (
                <span className={`${prefix}__hole`}>{`{${part.name}}`}</span>
              )}
              {part.tail}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
function PromptLibraryView(props: ViewProps) {
  const { title = "Prompts", useLabel = "Use prompt", className, clean } = props;
  const prefix = clean ? "ui-plic" : "ui-pli";
  const state = usePromptLibrary(props, prefix);
  const sidebar = (
    <div className={`${prefix}__side`}>
      <div className={`${prefix}__side-head`}>
        <span id={`${state.idBase}-title`} className={`${prefix}__title`} title={title}>
          {title}
        </span>
        <span className={`${prefix}__total`}>
          {formatCount.format(state.templates.length)}
        </span>
      </div>
      <label className={`${prefix}__search`}>
        <PromptIcon kind="search" clean={clean} />
        <input
          type="search"
          value={state.search}
          placeholder="Search templates"
          aria-label="Search templates"
          aria-controls={`${state.idBase}-list`}
          onChange={(event) => state.setSearch(event.target.value)}
          onKeyDown={state.onSearchKeyDown}
        />
      </label>
      <div
        ref={state.listRef}
        id={`${state.idBase}-list`}
        className={`${prefix}__list`}
        data-scroll={state.filtered.length > 12 ? "" : undefined}
        role="listbox"
        aria-label="Templates"
        onKeyDown={state.onListKeyDown}
      >
        <span
          className={`${prefix}__glide`}
          aria-hidden="true"
          data-on={state.indicator.visible ? "" : undefined}
          data-moved={state.indicator.moved ? "" : undefined}
          style={{
            transform: `translateY(${state.indicator.y}px)`,
            height: state.indicator.height,
          }}
        />
        {state.filtered.map((template) => {
          const selected = template.id === state.selected?.id;
          const focusable =
            selected || (!state.selectedVisible && template === state.filtered[0]);
          return (
            <TemplateOption_prompt_parts
              prefix={prefix}
              template={template}
              tone={state.toneFor(template)}
              selected={selected}
              focusable={focusable}
              pick={state.pick}
              register={state.register}
              key={template.id}
            />
          );
        })}
        {state.filtered.length === 0 && (
          <div className={`${prefix}__empty`}>
            {state.templates.length ? "No templates match" : "No templates yet"}
          </div>
        )}
      </div>
    </div>
  );
  const panels = (
    <div className={`${prefix}__main`}>
      {state.outgoingTemplate && (
        <TemplatePanel
          prefix={prefix}
          template={state.outgoingTemplate}
          tone={state.toneFor(state.outgoingTemplate)}
          values={state.valuesFor(state.outgoingTemplate)}
          flash={null}
          idBase={`${state.idBase}-out`}
          out
          key={`out-${state.outgoing!.key}`}
        />
      )}
      {state.selected && (
        <TemplatePanel
          prefix={prefix}
          template={state.selected}
          tone={state.toneFor(state.selected)}
          values={state.values}
          flash={state.flash}
          idBase={state.idBase}
          onChange={state.updateVariable}
          onHint={state.setHint}
          onEnter={state.onVariableEnter}
          key={state.selected.id}
        />
      )}
    </div>
  );
  const footer = (
    <div className={`${prefix}__foot`}>
      <span className={`${prefix}__caption`}>
        <PromptCaption prefix={prefix} id={state.captionId} tone={state.captionTone}>
          {state.caption}
        </PromptCaption>
      </span>
      <button
        type="button"
        className={`${prefix}__copy`}
        onClick={state.copyPrompt}
        aria-label="Copy prompt"
        disabled={!state.selected}
      >
        <span
          className={`${prefix}__copy-icon`}
          data-done={clean && state.notice?.kind === "copied" ? "" : undefined}
          key={state.notice?.kind === "copied" ? "done" : "copy"}
        >
          <PromptIcon
            kind={state.notice?.kind === "copied" ? "check" : "copy"}
            clean={clean}
          />
        </span>
        <span className={`${prefix}__copy-text`}>Copy</span>
      </button>
      <button
        type="button"
        className={`${prefix}__use`}
        aria-disabled={!state.ready}
        data-pulse={state.readyPulse ? (state.readyPulse % 2 ? "a" : "b") : undefined}
        onClick={state.usePrompt}
        onPointerEnter={() => state.setUseHovered(true)}
        onPointerLeave={() => state.setUseHovered(false)}
        onFocus={() => state.setUseHovered(true)}
        onBlur={() => state.setUseHovered(false)}
        title={useLabel}
      >
        <span className={`${prefix}__use-label`}>{useLabel}</span>
        <PromptIcon kind="arrow" clean={clean} />
      </button>
    </div>
  );
  return (
    <div
      ref={state.rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      role="group"
      aria-labelledby={`${state.idBase}-title`}
    >
      {clean ? (
        <div className={`${prefix}__card`}>
          <div className={`${prefix}__cols`}>
            {sidebar}
            {panels}
          </div>
          {footer}
        </div>
      ) : (
        <Fragment>
          <div className={`${prefix}__card`}>
            {sidebar}
            {panels}
          </div>
          {footer}
        </Fragment>
      )}
      <span className={`${prefix}__sr`} role="status" aria-live="polite">
        {state.announcement}
      </span>
    </div>
  );
}
const CATEGORY_TONES = ["blue", "violet", "amber", "green", "red", "gray"];
const VARIABLE_PATTERN = /\{([A-Za-z0-9_-]+)\}/g;
const formatCount = new Intl.NumberFormat("en");
const TemplateOption_prompt_parts = memo(function TemplateOption({
  prefix,
  template,
  tone,
  selected,
  focusable,
  pick,
  register,
}: OptionProps) {
  return (
    <div
      ref={(element) => register(template.id, element)}
      className={`${prefix}__option`}
      role="option"
      aria-selected={selected}
      tabIndex={focusable ? 0 : -1}
      onClick={() => pick(template.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          pick(template.id);
        }
      }}
    >
      <span className={`${prefix}__option-title`} dir="auto" title={template.title}>
        {template.title}
      </span>
      {template.category && (
        <span
          className={`${prefix}__tag`}
          data-tone={tone}
          dir="auto"
          title={template.category}
        >
          {template.category}
        </span>
      )}
    </div>
  );
});
export { PromptLibrary };
export type { PromptVariable };
export type { PromptTemplate };
export type { PromptLibraryProps };
