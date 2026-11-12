"use client";

import "./CommandMenu.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useId,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  memo,
  type RefObject,
  type SyntheticEvent,
} from "react";
interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon?: ReactNode;
  logo?: ReactNode;
  keys?: string[];
}
interface CommandGroup {
  id: string;
  label: string;
  commands: CommandItem[];
}
interface CommandMenuProps {
  groups?: CommandGroup[];
  placeholder?: string;
  /** For the generated ask command, id is "ask" and query is the search text. */
  onRun?: (id: string, query?: string) => void;
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
}
interface CommandRow extends CommandItem {
  key: string;
  shortcut: number;
}
interface SearchCommand {
  row: CommandRow;
  searchText: string;
}
interface IndexedGroup {
  key: string;
  id: string;
  label: string;
  commands: SearchCommand[];
}
interface VisibleGroup {
  key: string;
  id: string;
  label: string;
  commands: CommandRow[];
}
interface CommandHandlers {
  move: (command: CommandRow) => void;
  run: (command: CommandRow) => void;
}
interface CommandOptionProps {
  command: CommandRow;
  domId: string;
  selected: boolean;
  ran: boolean;
  modifier: string;
  query: string;
  handlers: RefObject<CommandHandlers>;
  prefix: string;
}
function CommandMenu(props: CommandMenuProps) {
  return <CommandMenuView {...props} />;
}
function CommandGlyph({ d, prefix }: { d: string; prefix: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${prefix}__glyph`} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
function AssistantIcon({ prefix }: { prefix: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={`${prefix}-spark`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7C5CFF" />
          <stop offset="1" stopColor="#2F9BFF" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${prefix}-spark)`}
        d="M12 2.5c.6 3.9 2.1 6.4 4.4 7.6 1.1.6 2.4.9 4.1 1.1v1.6c-4.6.6-7.3 3-8.5 8.7h-1.6c-.6-3.9-2.1-6.4-4.4-7.6-1.1-.6-2.4-.9-4.1-1.1v-1.6c4.6-.6 7.3-3 8.5-8.7z"
      />
    </svg>
  );
}
function useLogoId() {
  return "lg" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
}
function createDefaultGroups(prefix: string): CommandGroup[] {
  return [
    {
      id: `suggestions`,
      label: `Suggestions`,
      commands: [
        {
          id: `email`,
          label: `Write an email`,
          hint: `Gmail`,
          logo: <GmailLogo />,
          keywords: `mail send compose`,
        },
        {
          id: `ask`,
          label: `Ask assistant`,
          hint: `Summaries, drafts, answers`,
          logo: <AssistantIcon prefix={prefix} />,
          keywords: `ai chat question`,
        },
        {
          id: `task`,
          label: `Create a task`,
          hint: `ClickUp`,
          logo: <ClickUpLogo />,
          keywords: `todo issue`,
        },
        {
          id: `crm`,
          label: `Add contact to CRM`,
          hint: `HubSpot`,
          logo: <HubSpotLogo />,
          keywords: `lead deal company`,
        },
        {
          id: `meet`,
          label: `Schedule a meeting`,
          hint: `Google Calendar`,
          logo: <CalendarLogo />,
          keywords: `call invite event`,
        },
      ],
    },
    {
      id: `share`,
      label: `Share`,
      commands: [
        {
          id: `slack`,
          label: `Post an update`,
          hint: `#team-updates`,
          logo: <SlackLogo />,
          keywords: `message channel`,
        },
        {
          id: `notion`,
          label: `Save as page`,
          hint: `Notion · Meeting notes`,
          logo: <NotionLogo />,
          keywords: `doc wiki`,
        },
      ],
    },
    {
      id: `general`,
      label: `General`,
      commands: [
        {
          id: `new-doc`,
          label: `New document`,
          icon: <CommandGlyph d={glyphPaths.doc} prefix={prefix} />,
          keys: [`N`],
        },
        {
          id: `invite`,
          label: `Invite teammates`,
          icon: <CommandGlyph d={glyphPaths.person} prefix={prefix} />,
          keys: [`I`],
        },
        {
          id: `upload`,
          label: `Upload files`,
          icon: <CommandGlyph d={glyphPaths.upload} prefix={prefix} />,
          keys: [`U`],
        },
        {
          id: `theme`,
          label: `Switch to dark mode`,
          icon: <CommandGlyph d={glyphPaths.moon} prefix={prefix} />,
          keywords: `theme appearance light`,
          keys: [`⇧`, `D`],
        },
      ],
    },
    {
      id: `go`,
      label: `Go to`,
      commands: [
        {
          id: `home`,
          label: `Home`,
          icon: <CommandGlyph d={glyphPaths.home} prefix={prefix} />,
          keys: [`G`, `H`],
        },
        {
          id: `inbox`,
          label: `Inbox`,
          icon: <CommandGlyph d={glyphPaths.inbox} prefix={prefix} />,
          keys: [`G`, `I`],
        },
        {
          id: `reports`,
          label: `Reports`,
          icon: <CommandGlyph d={glyphPaths.chart} prefix={prefix} />,
          keys: [`G`, `R`],
        },
        {
          id: `settings`,
          label: `Settings`,
          icon: <CommandGlyph d={glyphPaths.gear} prefix={prefix} />,
          keys: [`G`, `S`],
        },
        {
          id: `help`,
          label: `Help & feedback`,
          icon: <CommandGlyph d={glyphPaths.help} prefix={prefix} />,
          keys: [`?`],
        },
      ],
    },
  ];
}
function normalizeSearch(text: string): string {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}
function commandInitial(label: string): string {
  return (label.match(/[\p{L}\p{N}]/u)?.[0] ?? "").toUpperCase();
}
function indexGroups(groups: CommandGroup[]): IndexedGroup[] {
  return (groups ?? []).filter(Boolean).map((group, groupIndex) => ({
    key: `g${groupIndex}`,
    id: group.id,
    label: String(group.label ?? ""),
    commands: (Array.isArray(group.commands) ? group.commands : [])
      .filter(Boolean)
      .map((command, commandIndex) => {
        const label = String(command.label ?? "");
        const hint =
          command.hint == null || command.hint === "" ? undefined : String(command.hint);
        return {
          row: {
            ...command,
            label,
            hint,
            key: `${groupIndex}-${commandIndex}`,
            shortcut: 0,
          },
          searchText: normalizeSearch(`${label} ${hint ?? ""} ${command.keywords ?? ""}`),
        };
      }),
  }));
}
function useCommandMenu(
  groups: CommandGroup[],
  { onRun, onClose, autoFocus }: CommandMenuProps,
  prefix: string,
) {
  const id = `${prefix}${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [lastRun, setLastRun] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [selectionBounds, setSelectionBounds] = useState<{
    y: number;
    height: number;
  } | null>(null);
  const [highlighted, setHighlighted] = useState(true);
  const modifier =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform)
      ? "⌘"
      : "Ctrl";
  const indexed = useMemo(() => indexGroups(groups), [groups]);
  const trimmedQuery = query.trim();
  const visibleGroups = useMemo(() => {
    const search = normalizeSearch(trimmedQuery);
    const filtered: VisibleGroup[] = indexed
      .map((group) => ({
        ...group,
        commands: group.commands
          .filter((command) => !search || command.searchText.includes(search))
          .map((command, index) =>
            group.id === "suggestions" && index < 5
              ? { ...command.row, shortcut: index + 1 }
              : command.row,
          ),
      }))
      .filter((group) => group.commands.length);
    if (search)
      filtered.unshift({
        key: "ask",
        id: "ask-about",
        label: "Assistant",
        commands: [
          {
            key: "ask",
            shortcut: 0,
            id: "ask-about",
            label: `Ask assistant about “${trimmedQuery}”`,
            logo: <AssistantIcon prefix={prefix} />,
          },
        ],
      });
    return filtered;
  }, [indexed, trimmedQuery, prefix]);
  const rows = useMemo(
    () => visibleGroups.flatMap((group) => group.commands),
    [visibleGroups],
  );
  const shortcuts = rows.filter((row) => row.shortcut);
  const selected = rows.find((row) => row.key === selectedKey) ?? rows[0];
  const scrollSelectionRef = useRef(false);
  useLayoutEffect(() => {
    const list = listRef.current;
    const option = list?.querySelector<HTMLButtonElement>(
      `[data-key="${selected?.key}"]`,
    );
    if (!list || !option) {
      setSelectionBounds(null);
      return;
    }
    setSelectionBounds({ y: option.offsetTop, height: option.offsetHeight });
    if (!scrollSelectionRef.current) return;
    scrollSelectionRef.current = false;
    const sibling = option.previousElementSibling;
    const headingHeight =
      sibling instanceof HTMLElement && sibling.classList.contains(`${prefix}__label`)
        ? sibling.offsetHeight
        : 0;
    const top = option.offsetTop - 8 - headingHeight;
    const bottom = option.offsetTop + option.offsetHeight + 8;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight)
      list.scrollTop = bottom - list.clientHeight;
  }, [selected?.key, rows.length, prefix]);
  useLayoutEffect(() => {
    const list = listRef.current;
    const inner = innerRef.current;
    if (!list || !inner) return;
    function measure() {
      if (!list || !inner) return;
      const style = getComputedStyle(list);
      const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const maxHeight = parseFloat(style.maxHeight) || Infinity;
      setListHeight(Math.min(inner.offsetHeight + padding, maxHeight));
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function focusSearch(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);
  useEffect(() => {
    if (!lastRun) return;
    const timeout = window.setTimeout(() => setLastRun(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [lastRun]);
  function runCommand(command: CommandRow) {
    setSelectedKey(command.key);
    setLastRun({
      id: command.key,
      label:
        command.key === "ask"
          ? `Asked the assistant about “${trimmedQuery}”`
          : command.label,
    });
    if (command.key === "ask") onRun?.("ask", trimmedQuery);
    else onRun?.(command.id);
  }
  const handlers = useRef({
    move: (_command: CommandRow) => {},
    run: (_command: CommandRow) => {},
  });
  handlers.current = {
    move: (command) => {
      setHighlighted(true);
      if (command.key !== selected?.key) setSelectedKey(command.key);
    },
    run: (command) => {
      runCommand(command);
      inputRef.current?.focus({ preventScroll: true });
    },
  };
  function moveSelection(direction: number) {
    if (!rows.length || !selected) return;
    scrollSelectionRef.current = true;
    setHighlighted(true);
    const index = rows.findIndex((row) => row.key === selected.key);
    setSelectedKey(rows[(index + direction + rows.length) % rows.length].key);
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setSelectedKey(null);
  }
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveSelection(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && selected) {
      event.preventDefault();
      runCommand(selected);
    } else if (event.key === "Tab" && visibleGroups.length > 1) {
      event.preventDefault();
      const index = visibleGroups.findIndex((group) =>
        group.commands.some((row) => row.key === selected?.key),
      );
      const next = event.shiftKey
        ? index <= 0
          ? visibleGroups.length - 1
          : index - 1
        : (index + 1) % visibleGroups.length;
      scrollSelectionRef.current = true;
      setHighlighted(true);
      setSelectedKey(visibleGroups[next].commands[0].key);
    } else if (event.key === "Escape") {
      if (query) setQuery("");
      else onClose?.();
    } else if ((event.metaKey || event.ctrlKey) && /^[1-5]$/.test(event.key)) {
      const command = shortcuts[Number(event.key) - 1];
      if (command) {
        event.preventDefault();
        runCommand(command);
      }
    }
  }
  return {
    id,
    inputRef,
    listRef,
    innerRef,
    listHeight,
    query,
    trimmedQuery,
    lastRun,
    selectionBounds,
    highlighted,
    setHighlighted,
    modifier,
    visibleGroups,
    selected,
    handlers,
    handleChange,
    handleKeyDown,
  };
}
function HighlightedText({ text, query }: { text: string; query: string }) {
  const normalizedText = normalizeSearch(text);
  const normalizedQuery = normalizeSearch(query);
  const start =
    normalizedQuery && normalizedText.length === text.length
      ? normalizedText.indexOf(normalizedQuery)
      : -1;
  if (start < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, start)}
      <mark>{text.slice(start, start + normalizedQuery.length)}</mark>
      {text.slice(start + normalizedQuery.length)}
    </>
  );
}
function handleImageError(event: SyntheticEvent<HTMLSpanElement>) {
  event.currentTarget.dataset.broken = "";
}
function CommandMenuView({
  clean = false,
  ...props
}: CommandMenuProps & {
  clean?: boolean;
}) {
  const {
    groups = clean ? cleanGroups : defaultGroups,
    placeholder = "Type a command or search…",
    className,
  } = props;
  const prefix = clean ? "ui-cmc" : "ui-cm";
  const menu = useCommandMenu(groups, props, prefix);
  const footer = (
    <footer className={`${prefix}__foot`} aria-live="polite">
      {menu.lastRun ? (
        <span className={`${prefix}__done`} key={menu.lastRun.label}>
          <svg viewBox={clean ? "0 0 16 16" : "0 0 24 24"} aria-hidden="true">
            <path d={clean ? "m3.5 8.5 3 3 6-7" : "m5 12.5 4.5 4.5L19 7.5"} />
          </svg>
          <span className={`${prefix}__done-text`}>{menu.lastRun.label}</span>
        </span>
      ) : (
        <span className={`${prefix}__tip`}>
          <kbd>Tab</kbd>
          {" to jump between sections"}
        </span>
      )}
      <span className={`${prefix}__foot-right`}>
        <span className={`${prefix}__keys`}>
          <kbd>{menu.modifier}</kbd>
          <kbd>K</kbd>
        </span>
        {"to open"}
      </span>
    </footer>
  );
  return (
    <div className={[prefix, className].filter(Boolean).join(" ")}>
      <div className={`${prefix}__card`}>
        <label className={`${prefix}__search`}>
          <svg viewBox={clean ? "0 0 16 16" : "0 0 24 24"} aria-hidden="true">
            <circle
              cx={clean ? "7.25" : "11"}
              cy={clean ? "7.25" : "11"}
              r={clean ? "4.75" : "7"}
            />
            <path d={clean ? "m13.5 13.5-2.9-2.9" : "m20 20-3.5-3.5"} />
          </svg>
          <input
            ref={menu.inputRef}
            value={menu.query}
            dir="auto"
            placeholder={placeholder}
            aria-label="Command"
            role="combobox"
            aria-expanded="true"
            aria-controls={`${menu.id}-list`}
            aria-activedescendant={
              menu.selected ? `${menu.id}-${menu.selected.key}` : undefined
            }
            onChange={menu.handleChange}
            onKeyDown={menu.handleKeyDown}
          />
          {clean ? (
            <kbd className={`${prefix}__enter`} aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M12.5 4v3a2 2 0 0 1-2 2h-7M6 6.5 3.5 9 6 11.5" />
              </svg>
            </kbd>
          ) : (
            <span className={`${prefix}__enter`} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M19 6v5a3 3 0 0 1-3 3H6m4-4-4 4 4 4" />
              </svg>
              Enter
            </span>
          )}
        </label>
        <div
          ref={menu.listRef}
          id={`${menu.id}-list`}
          className={`${prefix}__list`}
          role="listbox"
          aria-label="Commands"
          style={menu.listHeight ? { height: menu.listHeight } : undefined}
          onMouseLeave={clean ? () => menu.setHighlighted(false) : undefined}
        >
          {menu.selectionBounds && (
            <span
              className={`${prefix}__pill`}
              data-lit={clean ? menu.highlighted || undefined : undefined}
              style={{
                transform: `translateY(${menu.selectionBounds.y}px)`,
                height: menu.selectionBounds.height,
              }}
              aria-hidden="true"
            />
          )}
          <div ref={menu.innerRef} className={`${prefix}__inner`}>
            {menu.visibleGroups.map((group) => (
              <div
                role="group"
                aria-label={group.label}
                className={`${prefix}__group`}
                key={group.key}
              >
                {group.key !== "ask" && group.label && (
                  <span className={`${prefix}__label`} dir="auto">
                    {group.label}
                  </span>
                )}
                {group.commands.map((command) => (
                  <CommandOption_CommandOption
                    command={command}
                    domId={`${menu.id}-${command.key}`}
                    selected={command.key === menu.selected?.key}
                    ran={menu.lastRun?.id === command.key}
                    modifier={menu.modifier}
                    query={menu.trimmedQuery}
                    handlers={menu.handlers}
                    prefix={prefix}
                    key={command.key}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {clean && footer}
      </div>
      {!clean && footer}
    </div>
  );
}
const glyphPaths = {
  doc: `M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4`,
  person: `M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0M19 8v4M17 10h4`,
  inbox: `M4 13l2.5-8h11L20 13v6H4zM4 13h4.5a3.5 3.5 0 0 0 7 0H20`,
  home: `M4 11l8-7 8 7v9h-5v-6H9v6H4z`,
  gear: `M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13.5l1.6 1.2-2 3.4-1.9-.7a7 7 0 0 1-1.7 1L15 20.5h-4l-.4-2.1a7 7 0 0 1-1.7-1l-1.9.7-2-3.4 1.6-1.2a7 7 0 0 1 0-3l-1.6-1.2 2-3.4 1.9.7a7 7 0 0 1 1.7-1L11 3.5h4l.4 2.1a7 7 0 0 1 1.7 1l1.9-.7 2 3.4-1.6 1.2a7 7 0 0 1 0 3z`,
  moon: `M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z`,
  help: `M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01`,
  upload: `M12 16V4M7 9l5-5 5 5M5 20h14`,
  chart: `M5 20V10M12 20V4M19 20v-7`,
};
const GmailLogo = () => {
  let gradientId = useLogoId();
  return (
    <svg viewBox={`0 0 56.4108 44.8722`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M44.2255 5.76727H56.4051V41.0239C56.4051 43.148 54.683 44.8701 52.5589 44.8701H46.1486C45.8961 44.8701 45.646 44.8204 45.4127 44.7237C45.1794 44.6271 44.9674 44.4854 44.7888 44.3069C44.6102 44.1283 44.4686 43.9163 44.3719 43.683C44.2753 43.4497 44.2255 43.1996 44.2255 42.947V5.76727Z`}
        fill={`url(#${gradientId}-0)`}
      />
      <path
        d={`M12.1796 5.76727H0V41.0239C0 43.148 1.72213 44.8701 3.84618 44.8701H10.2565C10.509 44.8701 10.7591 44.8204 10.9924 44.7237C11.2257 44.6271 11.4377 44.4854 11.6163 44.3069C11.7949 44.1283 11.9365 43.9163 12.0332 43.683C12.1298 43.4497 12.1796 43.1996 12.1796 42.947V5.76727Z`}
        fill={`#FC413D`}
      />
      <path
        d={`M10.0085 1.42778C7.43377 -0.736342 3.5924 -0.403647 1.42828 2.17105C-0.735843 4.74543 -0.403148 8.58681 2.17155 10.7512L26.5557 31.2479C27.0178 31.6362 27.602 31.8492 28.2056 31.8492C28.8091 31.8492 29.3934 31.6362 29.8554 31.2479L54.2396 10.7509C56.814 8.58681 57.1467 4.74543 54.9825 2.17073C52.8184 -0.403648 48.977 -0.736342 46.4027 1.42778L28.2054 16.724L10.0085 1.42778Z`}
        fill={`url(#${gradientId}-1)`}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-0`}
          x1={`50.3153`}
          y1={`5.76727`}
          x2={`50.3153`}
          y2={`44.8701`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#60D673`} />
          <stop offset={`0.17`} stopColor={`#42C868`} />
          <stop offset={`0.39`} stopColor={`#0EBC5F`} />
          <stop offset={`0.62`} stopColor={`#00A9BB`} />
          <stop offset={`0.86`} stopColor={`#3C90FF`} />
          <stop offset={`1`} stopColor={`#3186FF`} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-1`}
          x1={`6.04194e-05`}
          y1={`6.45153`}
          x2={`56.4107`}
          y2={`6.45153`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop offset={`0.08`} stopColor={`#FF63A0`} />
          <stop offset={`0.3`} stopColor={`#FC413D`} />
          <stop offset={`0.5`} stopColor={`#FC413D`} />
          <stop offset={`0.65`} stopColor={`#FC413D`} />
          <stop offset={`0.72`} stopColor={`#FC5C30`} />
          <stop offset={`0.86`} stopColor={`#FEB10C`} />
          <stop offset={`0.91`} stopColor={`#FEC700`} />
          <stop offset={`0.96`} stopColor={`#FFDB0F`} />
        </linearGradient>
      </defs>
    </svg>
  );
};
const ClickUpLogo = () => {
  let gradientId = useLogoId();
  return (
    <svg viewBox={`0 0 49.7096 59.6884`} fill={`none`} aria-hidden={`true`}>
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M0 45.9002L9.1618 38.8247C14.0602 45.1745 19.2307 48.1679 24.9455 48.1679C30.6603 48.1679 35.7401 45.2652 40.3663 38.9154L49.7096 45.8094C42.997 54.8805 34.6516 59.6882 24.9455 59.6882C15.3301 59.6882 6.89403 54.8805 0 45.9002Z`}
        fill={`url(#${gradientId}-0)`}
      />
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M24.9535 15.3301L8.62558 29.3903L1.09657 20.5914L25.0442 0L48.8105 20.5914L41.1908 29.2996L24.9535 15.3301Z`}
        fill={`url(#${gradientId}-1)`}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-0`}
          x1={`0`}
          y1={`49.2666`}
          x2={`49.75`}
          y2={`49.2666`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#8930FD`} />
          <stop offset={`1`} stopColor={`#49CCF9`} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-1`}
          x1={`1.09231`}
          y1={`14.6901`}
          x2={`48.7603`}
          y2={`14.6901`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#FF02F0`} />
          <stop offset={`1`} stopColor={`#FFC800`} />
        </linearGradient>
      </defs>
    </svg>
  );
};
const HubSpotLogo = () => (
  <svg viewBox={`0 0 24 24`} fill={`#FF7A59`} aria-hidden={`true`}>
    <path
      d={`M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`}
    />
  </svg>
);
const CalendarLogo = () => (
  <svg viewBox={`0 0 24 24`} fill={`#4285F4`} aria-hidden={`true`}>
    <path
      d={`M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zm-7.207 6.25v-.065c.272-.144.5-.349.687-.617s.279-.595.279-.982c0-.379-.099-.72-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.703 2.703 0 0 0-1.197-.257c-.6 0-1.094.156-1.481.467-.386.311-.65.671-.793 1.078l1.085.452c.086-.249.224-.461.413-.633.189-.172.445-.257.767-.257.33 0 .602.088.816.264a.86.86 0 0 1 .322.703c0 .33-.12.589-.36.778-.24.19-.535.284-.886.284h-.567v1.085h.633c.407 0 .748.109 1.02.327.272.218.407.499.407.843 0 .336-.129.614-.387.832s-.565.327-.924.327c-.351 0-.651-.103-.897-.311-.248-.208-.422-.502-.521-.881l-1.096.452c.178.616.505 1.082.977 1.401.472.319.984.478 1.538.477a2.84 2.84 0 0 0 1.293-.291c.382-.193.684-.458.902-.794.218-.336.327-.72.327-1.149 0-.429-.115-.797-.344-1.105a2.067 2.067 0 0 0-.881-.689zm2.093-1.931l.602.913L15 10.045v5.744h1.187V8.446h-.827l-2.158 1.557zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z`}
    />
  </svg>
);
const SlackLogo = () => (
  <svg viewBox={`0 0 49.883 49.877`} fill={`none`} aria-hidden={`true`}>
    <g transform={`translate(0 0)`}>
      <path
        d={`M18.3549 10.4784C15.4713 10.4784 13.1157 8.12279 13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V10.4784H18.3549Z`}
        fill={`#36C5F0`}
      />
      <path
        d={`M18.3575 13.12C21.2411 13.12 23.5967 15.4756 23.5967 18.3592C23.5967 21.2428 21.2411 23.5984 18.3575 23.5984H5.2392C2.35561 23.5984 0 21.2428 0 18.3592C0 15.4756 2.35561 13.12 5.2392 13.12H18.3575Z`}
        fill={`#36C5F0`}
      />
    </g>
    <g transform={`translate(26.28 0)`}>
      <path
        d={`M13.1244 18.3592C13.1244 15.4756 15.48 13.12 18.3636 13.12C21.2472 13.12 23.6028 15.4756 23.6028 18.3592C23.6028 21.2428 21.2472 23.5984 18.3636 23.5984H13.1244V18.3592Z`}
        fill={`#2EB67D`}
      />
      <path
        d={`M10.4785 18.3575C10.4785 21.2411 8.12286 23.5967 5.23927 23.5967C2.35568 23.5967 7.4362e-05 21.2411 7.4362e-05 18.3575V5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0C8.12286 0 10.4785 2.35561 10.4785 5.2392V18.3575Z`}
        fill={`#2EB67D`}
      />
    </g>
    <g transform={`translate(0 26.28)`}>
      <path
        d={`M10.4784 5.2392C10.4784 8.12279 8.12279 10.4784 5.2392 10.4784C2.35561 10.4784 0 8.12279 0 5.2392C0 2.35561 2.35561 0 5.2392 0H10.4784V5.2392Z`}
        fill={`#E01E5A`}
      />
      <path
        d={`M13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V18.3575C23.5941 21.2411 21.2385 23.5967 18.3549 23.5967C15.4713 23.5967 13.1157 21.2411 13.1157 18.3575V5.2392Z`}
        fill={`#E01E5A`}
      />
    </g>
    <g transform={`translate(26.28 26.28)`}>
      <path
        d={`M5.23927 13.1157C8.12286 13.1157 10.4785 15.4713 10.4785 18.3549C10.4785 21.2385 8.12286 23.5941 5.23927 23.5941C2.35568 23.5941 7.4362e-05 21.2385 7.4362e-05 18.3549V13.1157H5.23927Z`}
        fill={`#ECB22E`}
      />
      <path
        d={`M5.23927 10.4784C2.35568 10.4784 7.4362e-05 8.12279 7.4362e-05 5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0H18.3576C21.2412 0 23.5968 2.35561 23.5968 5.2392C23.5968 8.12279 21.2412 10.4784 18.3576 10.4784H5.23927Z`}
        fill={`#ECB22E`}
      />
    </g>
  </svg>
);
const NotionLogo = () => (
  <svg viewBox={`0 0 24 24`} fill={`currentColor`} aria-hidden={`true`}>
    <path
      d={`M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z`}
    />
  </svg>
);
const defaultGroups = createDefaultGroups("ui-cm");
const cleanGroups = createDefaultGroups("ui-cmc");
const CommandOption_CommandOption = memo(function CommandOption({
  command,
  domId,
  selected,
  ran,
  modifier,
  query,
  handlers,
  prefix,
}: CommandOptionProps) {
  const keys = command.shortcut ? [modifier, String(command.shortcut)] : command.keys;
  return (
    <button
      id={domId}
      data-key={command.key}
      type="button"
      role="option"
      aria-selected={selected}
      data-ran={ran || undefined}
      className={`${prefix}__item`}
      tabIndex={-1}
      onMouseMove={() => handlers.current.move(command)}
      onClick={() => handlers.current.run(command)}
    >
      {command.logo ? (
        <span
          className={`${prefix}__logo`}
          data-letter={commandInitial(command.label)}
          onErrorCapture={handleImageError}
        >
          {command.logo}
        </span>
      ) : (
        <span
          className={`${prefix}__icon`}
          data-letter={commandInitial(command.label)}
          onErrorCapture={handleImageError}
        >
          {command.icon}
        </span>
      )}
      <span className={`${prefix}__text`}>
        <span className={`${prefix}__name`} dir="auto" title={command.label}>
          <HighlightedText text={command.label} query={query} />
        </span>
        {command.hint && (
          <span className={`${prefix}__hint`} dir="auto" title={command.hint}>
            <HighlightedText text={command.hint} query={query} />
          </span>
        )}
      </span>
      {keys && (
        <span className={`${prefix}__keys`} aria-hidden="true">
          {keys.map((key, index) => (
            <kbd key={index}>{key}</kbd>
          ))}
        </span>
      )}
    </button>
  );
});
export { CommandMenu };
export type { CommandItem };
export type { CommandGroup };
export type { CommandMenuProps };
