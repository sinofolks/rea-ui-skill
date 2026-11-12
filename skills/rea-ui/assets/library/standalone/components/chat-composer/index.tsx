"use client";

import "./ChatComposer.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type CSSProperties,
  type ComponentType,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useId,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from "react";
interface ComposerModel {
  id: string;
  name: string;
  description?: string;
  Logo?: ComponentType;
}
interface ComposerApp {
  id: string;
  name: string;
  Logo: ComponentType;
}
type ComposerApproval = "ask" | "auto" | "full";
/** Classic and Clean share data structures. Style-specific options are documented below. */
interface ChatComposerProps {
  placeholder?: string;
  models?: ComposerModel[];
  dictation?: string;
  onSend?: (
    text: string,
    context: {
      model: string;
    },
  ) => void;
  onModelChange?: (model: ComposerModel) => void;
  /** Classic passes the click event. Clean passes an action name. */
  onAttach?: (action: MouseEvent<HTMLButtonElement> | string) => void;
  folders?: string[];
  folder?: string | null;
  onFolderChange?: (folder: string | null) => void;
  apps?: ComposerApp[];
  connectedApps?: string[];
  onAppsChange?: (ids: string[]) => void;
  /** Classic only. */
  loadMs?: number;
  /** Classic only. */
  onRequestApproval?: () => void;
  /** Clean only. */
  approval?: ComposerApproval;
  /** Clean only. */
  onApprovalChange?: (approval: ComposerApproval) => void;
  /** Clean only. */
  onLearnMore?: () => void;
  /** Clean only. */
  foot?: ReactNode;
  /** Clean only. */
  tray?: boolean;
}
interface MenuRow {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  checked?: boolean;
  tone?: string;
}
interface MenuSection {
  title?: string;
  rows: MenuRow[];
}
interface ApprovalOption {
  id: ComposerApproval;
  label: string;
  description: string;
  Icon: ComponentType;
  tone?: string;
}
interface AddOption {
  id: string;
  label: string;
  description?: string;
  Icon: ComponentType;
}
type MenuName = "model" | "folder" | "apps" | "approval" | "add";
interface ComposerMenuProps {
  open: boolean;
  role?: "listbox" | "menu";
  label: string;
  title?: string;
  rows?: MenuRow[];
  sections?: MenuSection[];
  head?: ReactNode;
  anchor: RefObject<HTMLButtonElement | null>;
  container: RefObject<HTMLElement | null>;
  align?: "start" | "end";
  width?: number;
  wide?: boolean;
  inline?: boolean;
  onPick: (id: string) => void;
  onClose: (restoreFocus: boolean) => void;
}
function ChatComposer({
  placeholder = "Start by typing...",
  models = defaultModels,
  folders = defaultFolders,
  apps = defaultApps,
  onAttach,
  onLearnMore,
  foot,
  tray = true,
  ...props
}: ChatComposerProps) {
  const {
    approvalState,
    text,
    setText,
    selectedFolder,
    selectedApps,
    selectedModel,
    openMenu,
    toggleMenu,
    menuKeyDown,
    recording,
    transcript,
    waveform,
    announcement,
    containerRef,
    inputRef,
    lines,
    modelButtonRef,
    folderButtonRef,
    appsButtonRef,
    modelMorph,
    requestApproval,
    selectModel,
    selectFolder,
    toggleApp,
    startRecording,
    finishRecording,
    canSend,
    sendMessage,
    inputKeyDown,
    composerKeyDown,
    closeMenu,
    focusInput,
  } = useChatComposer(
    { ...props, models, folders, apps, onAttach, onLearnMore, foot, tray },
    false,
  );
  return (
    <div className={`ui-chat-composer`}>
      <section
        ref={containerRef}
        className={`ui-chat-composer__body`}
        data-approval={approvalState}
        data-recording={recording}
        style={
          {
            "--ui-cc-grow": (lines - 1) * 106.424,
          } as CSSProperties
        }
        aria-label={`Message composer`}
        onKeyDown={composerKeyDown}
      >
        <div className={`ui-chat-composer__tray`}>
          <div className={`ui-chat-composer__foot`}>
            {folders.length > 0 && (
              <button
                ref={folderButtonRef}
                type={`button`}
                className={`ui-chat-composer__row ui-chat-composer__row--folder`}
                aria-haspopup={`listbox`}
                aria-expanded={openMenu === `folder`}
                onClick={() => toggleMenu(`folder`)}
                onKeyDown={menuKeyDown(`folder`)}
              >
                <span
                  className={`ui-chat-composer__icon ui-chat-composer__icon--folder`}
                  aria-hidden={`true`}
                >
                  <ColoredFolderIcon_default_graphics />
                </span>
                <span
                  className={`ui-chat-composer__label ui-chat-composer__folder-name`}
                  title={selectedFolder ?? undefined}
                  dir={`auto`}
                >
                  {selectedFolder ?? `Work in a folder`}
                </span>
              </button>
            )}
            {apps.length > 0 && (
              <button
                ref={appsButtonRef}
                type={`button`}
                className={`ui-chat-composer__row ui-chat-composer__row--apps`}
                aria-haspopup={`menu`}
                aria-expanded={openMenu === `apps`}
                onClick={() => toggleMenu(`apps`)}
                onKeyDown={menuKeyDown(`apps`)}
              >
                <span className={`ui-chat-composer__label`}>{`Connect apps`}</span>
                <span className={`ui-chat-composer__logos`} aria-hidden={`true`}>
                  {apps.slice(0, 3).map((option) => (
                    <span
                      className={`ui-chat-composer__logo`}
                      children={<option.Logo />}
                      key={option.id}
                    />
                  ))}
                </span>
              </button>
            )}
          </div>
        </div>
        <div className={`ui-chat-composer__card`} onPointerDown={focusInput}>
          <textarea
            ref={inputRef}
            className={`ui-chat-composer__message`}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={inputKeyDown}
            placeholder={placeholder}
            aria-label={`Message`}
            spellCheck={false}
            readOnly={recording}
            dir={`auto`}
          />
          <div className={`ui-chat-composer__draft`} aria-hidden={`true`} dir={`auto`}>
            {text}
            {text && transcript && !/\s$/.test(text) ? ` ` : ``}
            <span className={`ui-chat-composer__heard`}>{transcript}</span>
          </div>
          <div className={`ui-chat-composer__toolbar`}>
            <button
              type={`button`}
              className={`ui-chat-composer__icon-btn`}
              aria-label={`Add attachment`}
              onClick={onAttach}
            >
              <span className={`ui-chat-composer__icon`}>
                <AddIcon_default_graphics />
              </span>
            </button>
            <button
              type={`button`}
              className={`ui-chat-composer__approval`}
              onClick={requestApproval}
              aria-busy={approvalState === `loading`}
              aria-disabled={approvalState !== `idle`}
            >
              <span className={`ui-chat-composer__wash`} aria-hidden={`true`} />
              <span className={`ui-chat-composer__icon`} aria-hidden={`true`}>
                <ApprovalHandIcon_default_graphics />
                <FullAccessShieldIcon_default_graphics />
              </span>
              <span className={`ui-chat-composer__approval-text`}>
                <span
                  className={`ui-chat-composer__request ui-chat-composer__shimmer`}
                  data-text={`Request approval`}
                  aria-hidden={approvalState === `done`}
                >{`Request approval`}</span>
                <span
                  className={`ui-chat-composer__granted`}
                  aria-hidden={approvalState !== `done`}
                >{`Unrestricted access`}</span>
              </span>
            </button>
          </div>
          <div
            className={`ui-chat-composer__toolbar ui-chat-composer__toolbar--end`}
            inert={recording}
          >
            {selectedModel && (
              <button
                ref={modelButtonRef}
                type={`button`}
                className={`ui-chat-composer__model`}
                aria-haspopup={`listbox`}
                aria-expanded={openMenu === `model`}
                onClick={() => toggleMenu(`model`)}
                onKeyDown={menuKeyDown(`model`)}
              >
                <span
                  className={`ui-chat-composer__model-face`}
                  data-morph={modelMorph || undefined}
                  key={selectedModel.id}
                >
                  {selectedModel.Logo && selectedModel.id !== `auto` && (
                    <span className={`ui-chat-composer__model-logo`} aria-hidden={`true`}>
                      <selectedModel.Logo />
                    </span>
                  )}
                  <span
                    className={`ui-chat-composer__label ui-chat-composer__model-name`}
                    title={selectedModel.name}
                    dir={`auto`}
                  >
                    {selectedModel.name}
                  </span>
                </span>
                <span
                  className={`ui-chat-composer__icon ui-chat-composer__icon--chevron`}
                  aria-hidden={`true`}
                >
                  <ChevronIcon_default_graphics />
                </span>
              </button>
            )}
            <button
              type={`button`}
              className={`ui-chat-composer__icon-btn`}
              aria-label={`Voice input`}
              onClick={startRecording}
            >
              <span className={`ui-chat-composer__icon`}>
                <MicrophoneIcon_default_graphics />
              </span>
            </button>
            <button
              type={`button`}
              className={`ui-chat-composer__send`}
              aria-label={`Send message`}
              disabled={!canSend}
              onClick={sendMessage}
            >
              <SendIcon_default_graphics />
            </button>
          </div>
          <div
            className={`ui-chat-composer__toolbar ui-chat-composer__toolbar--end ui-chat-composer__toolbar--voice`}
            inert={!recording}
          >
            <span className={`ui-chat-composer__trace`} aria-hidden={`true`}>
              {waveform.map((amplitude, index) => (
                <span
                  style={
                    {
                      height: `calc(${Math.max(8, amplitude * 64)} * var(--u))`,
                    } as CSSProperties
                  }
                  key={index}
                />
              ))}
            </span>
            <button
              type={`button`}
              className={`ui-chat-composer__square`}
              aria-label={`Discard recording`}
              onClick={() => finishRecording(false)}
            >
              <CloseIcon_default_graphics />
            </button>
            <button
              type={`button`}
              className={`ui-chat-composer__square`}
              aria-label={`Use recording`}
              onClick={() => finishRecording(true)}
            >
              <CheckIcon_default_graphics />
            </button>
          </div>
        </div>
        {selectedModel && (
          <ComposerMenu
            open={openMenu === `model`}
            label={`Select a model`}
            rows={models.map((model) => ({
              id: model.id,
              label: model.name,
              description: model.description,
              icon: model.Logo && <model.Logo />,
              checked: model.id === selectedModel.id,
            }))}
            anchor={modelButtonRef}
            container={containerRef}
            onPick={(id) =>
              selectModel(models.find((model) => model.id === id) ?? selectedModel)
            }
            onClose={closeMenu(modelButtonRef)}
          />
        )}
        {folders.length > 0 && (
          <ComposerMenu
            open={openMenu === `folder`}
            label={`Work in a folder`}
            title={`Work in a folder`}
            align={`start`}
            rows={folders.map((folder) => ({
              id: folder,
              label: folder,
              icon: <FolderIcon_default_graphics />,
              checked: folder === selectedFolder,
            }))}
            anchor={folderButtonRef}
            container={containerRef}
            onPick={selectFolder}
            onClose={closeMenu(folderButtonRef)}
          />
        )}
        {apps.length > 0 && (
          <ComposerMenu
            open={openMenu === `apps`}
            role={`menu`}
            label={`Apps`}
            title={`Apps`}
            rows={apps.map((app) => ({
              id: app.id,
              label: app.name,
              icon: <app.Logo />,
              checked: selectedApps.includes(app.id),
            }))}
            anchor={appsButtonRef}
            container={containerRef}
            onPick={toggleApp}
            onClose={closeMenu(appsButtonRef)}
          />
        )}
      </section>
      <p className={`ui-chat-composer__sr-only`} aria-live={`polite`}>
        {announcement}
      </p>
    </div>
  );
}
function useChatComposer(props: ChatComposerProps, clean: boolean) {
  const {
    models = [],
    apps = [],
    connectedApps = ["gmail"],
    folder,
    approval = "ask",
    dictation = defaultDictation,
    folders = defaultFolders,
    foot,
    tray = true,
    loadMs = 1300,
    onSend,
    onModelChange,
    onFolderChange,
    onAppsChange,
    onApprovalChange,
    onAttach,
    onRequestApproval,
  } = props;
  const [approvalState, setApprovalState] = useState<"idle" | "loading" | "done">("idle");
  const [approvalMode, setApprovalMode] = useState(approval);
  const [approvalMorph, setApprovalMorph] = useState(false);
  const [planMode, setPlanMode] = useState(false);
  const [text, setText] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(folder ?? null);
  const [selectedApps, setSelectedApps] = useState(connectedApps);
  const [selectedModel, setSelectedModel] = useState<ComposerModel | undefined>(
    models[0],
  );
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [waveform, setWaveform] = useState(emptyWaveform);
  const [announcement, setAnnouncement] = useState("");
  const containerRef = useRef<HTMLElement>(null),
    inputRef = useRef<HTMLTextAreaElement>(null),
    draftRef = useRef<HTMLDivElement>(null);
  const modelButtonRef = useRef<HTMLButtonElement>(null),
    approvalButtonRef = useRef<HTMLButtonElement>(null),
    addButtonRef = useRef<HTMLButtonElement>(null),
    folderButtonRef = useRef<HTMLButtonElement>(null),
    appsButtonRef = useRef<HTMLButtonElement>(null);
  const [lines, setLines] = useState(clean ? 2 : 1);
  const previousModelWidth = useRef(0);
  const [modelMorph, setModelMorph] = useState(false);
  const approvalTimers = useRef<number[]>([]);
  useEffect(() => () => approvalTimers.current.forEach(clearTimeout), []);
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const oldHeight = input.style.height;
    input.style.height = "0px";
    const contentHeight = Math.max(
      input.scrollHeight,
      clean && transcript ? (draftRef.current?.scrollHeight ?? 0) : 0,
    );
    input.style.height = oldHeight;
    const lineHeight = parseFloat(getComputedStyle(input).lineHeight) || 1;
    setLines(
      Math.min(
        clean ? 4 : 2,
        Math.max(clean ? 2 : 1, Math.round(contentHeight / lineHeight)),
      ),
    );
  }, [text, clean ? transcript : undefined]);
  useLayoutEffect(() => {
    const button = modelButtonRef.current;
    if (!button) return;
    const width = clean ? button.offsetWidth : button.getBoundingClientRect().width;
    const previous = previousModelWidth.current;
    previousModelWidth.current = width;
    if (!modelMorph || !previous || Math.abs(previous - width) < 0.5) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      button.animate([{ width: `${previous}px` }, { width: `${width}px` }], {
        duration: 460,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      });
  }, [selectedModel?.id]);
  useEffect(() => {
    if (!recording) return;
    const words = dictation.split(/\s+/).filter(Boolean);
    let heard = 0;
    const transcriptTimer = window.setInterval(() => {
      heard = Math.min(words.length, heard + 1);
      setTranscript(words.slice(0, heard).join(" "));
    }, 320);
    const waveformTimer = window.setInterval(() => {
      const amplitude =
        heard < words.length && Math.random() > 0.3 ? 0.3 + Math.random() * 0.7 : 0;
      setWaveform((previous) => [...previous.slice(1), amplitude]);
    }, 120);
    return () => {
      clearInterval(transcriptTimer);
      clearInterval(waveformTimer);
    };
  }, [recording, dictation]);
  function toggleMenu(menu: MenuName) {
    setOpenMenu((current) => (current === menu ? null : menu));
  }
  function menuKeyDown(menu: MenuName) {
    return (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setOpenMenu(menu);
      }
    };
  }
  function closeMenu(anchor: RefObject<HTMLButtonElement | null>) {
    return (restoreFocus: boolean) => {
      setOpenMenu(null);
      if (restoreFocus) anchor.current?.focus();
    };
  }
  function selectModel(model: ComposerModel) {
    if (model.id !== selectedModel?.id) setModelMorph(true);
    setSelectedModel(model);
    setOpenMenu(null);
    setAnnouncement(`${model.name} selected.`);
    onModelChange?.(model);
    modelButtonRef.current?.focus();
  }
  function selectFolder(next: string) {
    const selected = next === selectedFolder ? null : next;
    setSelectedFolder(selected);
    setOpenMenu(null);
    setAnnouncement(selected ? `Working in ${selected}.` : "No folder selected.");
    onFolderChange?.(selected);
    folderButtonRef.current?.focus();
  }
  function toggleApp(id: string) {
    const connect = !selectedApps.includes(id),
      next = connect ? [...selectedApps, id] : selectedApps.filter((app) => app !== id);
    setSelectedApps(next);
    setOpenMenu(null);
    setAnnouncement(
      `${apps.find((app) => app.id === id)?.name} ${connect ? "connected" : "disconnected"}.`,
    );
    onAppsChange?.(next);
    (clean && !tray ? addButtonRef : appsButtonRef).current?.focus();
  }
  function selectApproval(mode: ComposerApproval) {
    if (mode !== approvalMode) setApprovalMorph(true);
    setApprovalMode(mode);
    setOpenMenu(null);
    setAnnouncement(
      `${approvalOptions.find((option) => option.id === mode)?.label} selected.`,
    );
    onApprovalChange?.(mode);
    approvalButtonRef.current?.focus();
  }
  function selectAddOption(id: string) {
    if (id === "apps") {
      setOpenMenu("apps");
      return;
    }
    setOpenMenu(null);
    if (id === "plan") {
      setAnnouncement(planMode ? "Plan mode off." : "Plan mode on.");
      setPlanMode(!planMode);
    }
    onAttach?.(id);
    if (id === "folder" && folders.length > 0 && !foot) {
      setOpenMenu("folder");
      return;
    }
    addButtonRef.current?.focus();
  }
  function requestApproval() {
    if (approvalState !== "idle") return;
    setApprovalState("loading");
    setAnnouncement("Requesting approval…");
    onRequestApproval?.();
    approvalTimers.current.push(
      window.setTimeout(() => {
        setApprovalState("done");
        setAnnouncement("Unrestricted access granted.");
      }, loadMs),
    );
  }
  function startRecording() {
    setOpenMenu(null);
    setTranscript("");
    setWaveform(emptyWaveform());
    setRecording(true);
    setAnnouncement("Recording. Press Escape to discard.");
  }
  function finishRecording(useRecording: boolean) {
    setRecording(false);
    if (useRecording && transcript) {
      setText((previous) =>
        previous.trim() ? `${previous.trimEnd()} ${transcript}` : transcript,
      );
      setAnnouncement("Recording added to your message.");
    } else setAnnouncement("Recording discarded.");
    setTranscript("");
    inputRef.current?.focus();
  }
  const canSend = text.trim().length > 0;
  function sendMessage() {
    if (!canSend) return;
    onSend?.(text.trim(), { model: selectedModel?.id ?? "" });
    setText("");
    setAnnouncement("Message sent.");
    inputRef.current?.focus();
  }
  function inputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      sendMessage();
    }
  }
  function composerKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && recording) {
      event.preventDefault();
      finishRecording(false);
    }
  }
  function focusInput(event: PointerEvent<HTMLDivElement>) {
    if (
      event.target instanceof Element &&
      !event.target.closest("button, textarea, input")
    ) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  }
  const selectedApproval =
    approvalOptions.find((option) => option.id === approvalMode) ?? approvalOptions[0];
  return {
    approvalState,
    approvalMode,
    approvalMorph,
    planMode,
    text,
    setText,
    selectedFolder,
    selectedApps,
    selectedModel,
    openMenu,
    recording,
    transcript,
    waveform,
    announcement,
    containerRef,
    inputRef,
    draftRef,
    lines,
    modelButtonRef,
    approvalButtonRef,
    addButtonRef,
    folderButtonRef,
    appsButtonRef,
    modelMorph,
    toggleMenu,
    menuKeyDown,
    closeMenu,
    selectModel,
    selectFolder,
    toggleApp,
    selectApproval,
    selectAddOption,
    requestApproval,
    startRecording,
    finishRecording,
    canSend,
    sendMessage,
    inputKeyDown,
    composerKeyDown,
    focusInput,
    selectedApproval,
  };
}
function clippingRect(element: HTMLElement, clampToViewport: boolean) {
  for (
    let parent = element.parentElement;
    parent && parent !== document.body;
    parent = parent.parentElement
  ) {
    const { overflowX, overflowY } = getComputedStyle(parent);
    if (overflowX !== "visible" || overflowY !== "visible") {
      const bounds = parent.getBoundingClientRect();
      return clampToViewport
        ? {
            top: Math.max(bounds.top, 0),
            left: Math.max(bounds.left, 0),
            right: Math.min(bounds.right, window.innerWidth),
            bottom: Math.min(bounds.bottom, window.innerHeight),
          }
        : bounds;
    }
  }
  return {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };
}
function useComposerMenu(props: ComposerMenuProps, clean: boolean) {
  const {
    open,
    anchor,
    container,
    align = "end",
    width = 260,
    wide = false,
    onPick,
    onClose,
  } = props;
  const rows = props.rows ?? props.sections?.flatMap((section) => section.rows) ?? [];
  const menuId = useId(),
    panelRef = useRef<HTMLDivElement>(null),
    rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width,
    up: true,
    fromTop: 0,
    fromLeft: 0,
    fromRadius: 0,
  });
  const [pill, setPill] = useState({ y: 0, h: 0, glide: false });
  const [lit, setLit] = useState(false),
    wasLit = useRef(false);
  const [visible, setVisible] = useState(false),
    [placing, setPlacing] = useState(false),
    [hasMore, setHasMore] = useState(false),
    [hidden, setHidden] = useState(true);
  function measureScroll() {
    const panel = panelRef.current;
    if (panel) setHasMore(panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2);
  }
  useLayoutEffect(() => {
    if (!open) {
      setVisible(false);
      if (clean) {
        const timer = window.setTimeout(() => setHidden(true), 320);
        return () => clearTimeout(timer);
      }
      return;
    }
    if (clean && hidden) {
      setHidden(false);
      return;
    }
    const button = anchor.current,
      body = container.current,
      panel = panelRef.current;
    if (!button || !body || !panel) return;
    const buttonRect = button.getBoundingClientRect(),
      bodyRect = body.getBoundingClientRect(),
      clip = clippingRect(body, clean);
    if (clean) {
      const scale = bodyRect.width / (body.offsetWidth || bodyRect.width) || 1;
      const menuWidth = Math.min(
        wide ? body.offsetWidth : width,
        (clip.right - clip.left) / scale - 16,
      );
      panel.style.width = `${menuWidth}px`;
      panel.style.maxHeight = "";
      const screenWidth = menuWidth * scale,
        fullHeight = panel.offsetHeight * scale,
        gap = 8 * scale,
        topOffset = wide ? -6 * scale : 0,
        margin = 8 * scale,
        base = wide ? bodyRect : buttonRect;
      const above = base.top + topOffset - (clip.top + margin),
        below = clip.bottom - margin - (base.bottom + gap);
      const up = wide
        ? above >= Math.min(fullHeight, 160 * scale) || above >= below
        : above >= fullHeight || above >= below;
      const height = Math.min(fullHeight, Math.max(0, up ? above : below));
      const top = clamp(
        up ? base.top + topOffset - height : base.bottom + gap,
        clip.top + margin,
        clip.bottom - margin - height,
      );
      const left = clamp(
        wide
          ? bodyRect.left
          : align === "start"
            ? buttonRect.left
            : buttonRect.right - screenWidth,
        clip.left + margin,
        clip.right - margin - screenWidth,
      );
      panel.style.maxHeight = `${height / scale}px`;
      setPosition({
        top: (top - bodyRect.top) / scale,
        left: (left - bodyRect.left) / scale,
        width: menuWidth,
        up,
        fromTop: (up ? clamp(height - buttonRect.height, 0, height - 1) : 0) / scale,
        fromLeft: clamp(buttonRect.left - left, 0, screenWidth - 1) / scale,
        fromRadius: 6,
      });
    } else {
      const menuWidth = panel.offsetWidth,
        height = panel.offsetHeight,
        above = buttonRect.top - 8 - (clip.top + 8),
        below = clip.bottom - 8 - (buttonRect.bottom + 8),
        up = above >= height || above >= below;
      const top = clamp(
          up ? buttonRect.top - 8 - height : buttonRect.bottom + 8,
          clip.top + 8,
          clip.bottom - 8 - height,
        ),
        left = clamp(
          align === "start" ? buttonRect.left : buttonRect.right - menuWidth,
          clip.left + 8,
          clip.right - 8 - menuWidth,
        );
      setPosition({
        top: top - bodyRect.top,
        left: left - bodyRect.left,
        width,
        up,
        fromTop: up ? clamp(height - buttonRect.height, 0, height - 1) : 0,
        fromLeft: clamp(buttonRect.left - left, 0, menuWidth - 1),
        fromRadius: buttonRect.height / 2,
      });
    }
    setActiveIndex(
      Math.max(
        0,
        rows.findIndex((row) => row.checked),
      ),
    );
    setLit(false);
    setPlacing(true);
  }, [open, clean ? hidden : undefined]);
  useLayoutEffect(() => {
    if (open && !visible && panelRef.current) {
      getComputedStyle(panelRef.current).clipPath;
      setPlacing(false);
      setVisible(true);
    }
  }, [position]);
  useEffect(() => {
    if (visible) {
      panelRef.current?.focus({ preventScroll: true });
      if (clean && panelRef.current?.matches(":focus-visible")) setLit(true);
    }
    if (clean) measureScroll();
  }, [visible]);
  useLayoutEffect(() => {
    const row = rowRefs.current[activeIndex],
      panel = panelRef.current;
    if (row)
      setPill({
        y: row.offsetTop,
        h: row.offsetHeight,
        glide: wasLit.current && lit,
      });
    if (row && panel && open) {
      if (row.offsetTop < panel.scrollTop) panel.scrollTop = row.offsetTop - 4;
      else if (row.offsetTop + row.offsetHeight > panel.scrollTop + panel.clientHeight)
        panel.scrollTop = row.offsetTop + row.offsetHeight - panel.clientHeight + 4;
    }
    wasLit.current = lit;
  }, [activeIndex, open, lit]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: globalThis.PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !panelRef.current?.contains(target) &&
        !anchor.current?.contains(target)
      )
        onClose(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, onClose, anchor]);
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (clean) {
      const targetIsPanel = event.target === panelRef.current,
        headerAction = panelRef.current?.querySelector<HTMLElement>(
          ".ui-ccc__menu-head :is(a, button)",
        );
      if (event.key === "Tab" && headerAction && targetIsPanel !== event.shiftKey) {
        event.preventDefault();
        (targetIsPanel ? headerAction : panelRef.current)?.focus({
          preventScroll: true,
        });
        return;
      }
      if (!targetIsPanel && event.key !== "Tab" && event.key !== "Escape") return;
    }
    const last = rows.length - 1,
      indices: Record<string, number> = {
        ArrowDown: Math.min(last, activeIndex + 1),
        ArrowUp: Math.max(0, activeIndex - 1),
        Home: 0,
        End: last,
      };
    if (event.key in indices) {
      event.preventDefault();
      setActiveIndex(indices[event.key]);
      setLit(true);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const row = rows[activeIndex];
      if (row) onPick(row.id);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose(true);
    } else if (event.key === "Tab") {
      anchor.current?.focus({ preventScroll: true });
      onClose(false);
    }
  }
  return {
    menuId,
    panelRef,
    rowRefs,
    activeIndex,
    setActiveIndex,
    position,
    pill,
    lit,
    setLit,
    visible,
    placing,
    hasMore,
    hidden,
    measureScroll,
    handleKeyDown,
  };
}
function ComposerMenu({
  clean = false,
  ...props
}: ComposerMenuProps & {
  clean?: boolean;
}) {
  const {
    role = "listbox",
    label,
    title,
    head,
    sections = [],
    rows = [],
    wide = false,
    inline = false,
    onPick,
  } = props;
  const menu = useComposerMenu(props, clean),
    prefix = clean ? "ui-ccc" : "ui-chat-composer";
  const { position, pill } = menu,
    CheckIcon = clean ? CheckIcon_clean_graphics : CheckIcon_default_graphics;
  function renderRow(row: MenuRow, index: number) {
    return (
      <div
        ref={(element) => {
          menu.rowRefs.current[index] = element;
        }}
        id={`${menu.menuId}-${index}`}
        role={
          role === "listbox"
            ? "option"
            : row.checked === undefined
              ? "menuitem"
              : "menuitemcheckbox"
        }
        aria-selected={role === "listbox" ? !!row.checked : undefined}
        aria-checked={
          role === "menu" && row.checked !== undefined ? row.checked : undefined
        }
        data-checked={row.checked || undefined}
        data-tone={clean ? row.tone : undefined}
        className={`${prefix}__option`}
        onPointerEnter={() => {
          menu.setActiveIndex(index);
          menu.setLit(true);
        }}
        onClick={() => onPick(row.id)}
        key={row.id}
      >
        <span className={`${prefix}__option-logo`} aria-hidden="true">
          {row.icon}
        </span>
        <span className={`${prefix}__option-text`}>
          <span
            className={`${prefix}__option-name`}
            title={clean ? row.label : undefined}
            dir="auto"
          >
            {row.label}
          </span>
          {row.description && (
            <span
              className={`${prefix}__option-desc`}
              title={clean ? undefined : row.description}
              dir="auto"
            >
              {row.description}
            </span>
          )}
        </span>
        <span className={`${prefix}__option-check`} aria-hidden="true">
          <CheckIcon />
        </span>
      </div>
    );
  }
  let rowIndex = 0;
  return (
    <div
      className={`${prefix}__menu`}
      data-open={menu.visible}
      data-placing={menu.placing}
      data-up={position.up}
      data-inline={(clean && inline) || undefined}
      data-above={(clean && wide && position.up) || undefined}
      style={
        {
          display: clean && menu.hidden ? "none" : undefined,
          top: position.top,
          left: position.left,
          width: clean ? position.width : undefined,
          "--from-top": `${position.fromTop}px`,
          "--from-left": `${position.fromLeft}px`,
          "--from-bottom": position.up
            ? "0px"
            : `calc(100% - ${position.fromRadius * 2}px)`,
          "--from-radius": `${position.fromRadius}px`,
        } as CSSProperties
      }
      inert={!menu.visible}
    >
      <div
        ref={menu.panelRef}
        className={`${prefix}__menu-panel`}
        role={role}
        tabIndex={-1}
        aria-label={label}
        aria-activedescendant={`${menu.menuId}-${menu.activeIndex}`}
        onKeyDown={menu.handleKeyDown}
        onPointerLeave={() => menu.setLit(false)}
        onScroll={clean ? menu.measureScroll : undefined}
        data-more={(clean && menu.hasMore) || undefined}
      >
        <span
          className={`${prefix}__menu-fill`}
          aria-hidden="true"
          data-glide={pill.glide}
          style={{
            transform: `translateY(${pill.y}px)`,
            height: pill.h,
            opacity: +!!menu.lit,
          }}
        />
        {clean ? (
          <>
            {head && <div className={`${prefix}__menu-head`}>{head}</div>}
            {sections.map((section, index) => (
              <div
                className={`${prefix}__menu-section`}
                role="group"
                aria-label={section.title}
                key={index}
              >
                {section.title && (
                  <div className={`${prefix}__menu-title`} aria-hidden="true">
                    {section.title}
                  </div>
                )}
                {section.rows.map((row) => renderRow(row, rowIndex++))}
              </div>
            ))}
          </>
        ) : (
          <>
            {title && (
              <div className={`${prefix}__menu-title`} aria-hidden="true">
                {title}
              </div>
            )}
            {rows.map(renderRow)}
          </>
        )}
      </div>
    </div>
  );
}
function CleanComposerMenu(props: ComposerMenuProps) {
  return <ComposerMenu {...props} clean />;
}
const AddIcon = () => (
  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
    <path
      d={`M8 2.5c.28 0 .5.22.5.5v4.5H13a.5.5 0 0 1 0 1H8.5V13a.5.5 0 0 1-1 0V8.5H3a.5.5 0 0 1 0-1h4.5V3c0-.28.22-.5.5-.5Z`}
    />
  </svg>
);
const AutoApprovalIcon = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps} aria-hidden={`true`}>
    <circle cx={`12`} cy={`12`} r={`9`} />
    <path d={`M8.5 12.5L10.8 14.8L15.5 9.8`} />
  </svg>
);
const FilesIcon = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps} aria-hidden={`true`}>
    <path
      d={`M19.5 12.5L12.6 19.4C10.6 21.4 7.4 21.4 5.4 19.4C3.4 17.4 3.4 14.2 5.4 12.2L12.8 4.8C14.1 3.5 16.2 3.5 17.6 4.8C18.9 6.2 18.9 8.3 17.6 9.6L10.4 16.8C9.7 17.5 8.6 17.5 7.9 16.8C7.2 16.1 7.2 15 7.9 14.3L14.5 7.7`}
    />
  </svg>
);
const FolderIcon = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps} aria-hidden={`true`}>
    <path
      d={`M3 7.5C3 6.1 4.1 5 5.5 5H9.2C9.9 5 10.5 5.3 11 5.8L12.2 7H18.5C19.9 7 21 8.1 21 9.5V16.5C21 17.9 19.9 19 18.5 19H5.5C4.1 19 3 17.9 3 16.5V7.5Z`}
    />
    <path d={`M3 10H21`} />
  </svg>
);
const GoalIcon = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps} aria-hidden={`true`}>
    <path d={`M21 12A9 9 0 1 1 12 3`} />
    <path d={`M17 12A5 5 0 1 1 12 7`} />
    <path d={`M12 12L19 5M16 4.5V8H19.5`} />
  </svg>
);
const PlanIcon = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps} aria-hidden={`true`}>
    <path
      d={`M9 18H15M10 21H14M12 3C8.7 3 6 5.6 6 8.9C6 11.1 7.2 12.6 8.4 13.8C9 14.4 9.4 15.2 9.4 16V16.5H14.6V16C14.6 15.2 15 14.4 15.6 13.8C16.8 12.6 18 11.1 18 8.9C18 5.6 15.3 3 12 3Z`}
    />
  </svg>
);
const RecordSkillIcon = () => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <circle
      cx={`12`}
      cy={`12`}
      r={`8.2`}
      fill={`none`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
    />
    <circle cx={`12`} cy={`12`} r={`4.6`} fill={`currentColor`} />
  </svg>
);
const DrawIcon = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps} stroke={`#14b8a6`} aria-hidden={`true`}>
    <path
      d={`M4 15C6 10 8.5 6 10 6.5C12 7.2 6 15 8 16C10 17 13.5 9 15.5 10C17.3 10.9 13 16 14.8 16.8C16 17.3 18 15 20 13`}
    />
    <path d={`M4 20H12`} />
  </svg>
);
const DocumentIcon = ({ color }: { color: string }) => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <path
      d={`M6.5 2.5H14L19.5 8V19.5C19.5 20.6 18.6 21.5 17.5 21.5H6.5C5.4 21.5 4.5 20.6 4.5 19.5V4.5C4.5 3.4 5.4 2.5 6.5 2.5Z`}
      fill={color}
    />
    <path
      d={`M14 2.5V6.5C14 7.3 14.7 8 15.5 8H19.5`}
      fill={`#fff`}
      fillOpacity={`0.45`}
    />
    <path
      d={`M8 13H16M8 16.5H13.5`}
      stroke={`#fff`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
    />
  </svg>
);
const ApprovalHandIcon = () => (
  <svg viewBox={`0 0 68.155 68.155`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M52.5305 32.6557V24.8463C52.5305 22.1016 54.7555 19.8766 57.5001 19.8766C60.2448 19.8766 62.4698 22.1016 62.4698 24.8463V42.027C62.4698 53.3194 53.3154 62.4735 42.0233 62.4735H34.2388M22.7127 39.7552L15.94 31.8537C14.8314 30.5602 13.2129 29.8159 11.5094 29.8159H11.1235C8.11379 29.8159 5.67395 32.2558 5.67395 35.2655C5.67395 36.3412 5.99241 37.393 6.58919 38.2881L16.4118 53.0221C20.3482 58.9269 26.9753 62.4735 34.0719 62.4735`}
      stroke={`currentColor`}
      strokeWidth={`4.7`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M52.534 24.1378V16.3284C52.534 13.5837 50.3091 11.3588 47.5644 11.3588C44.8197 11.3588 42.5948 13.5837 42.5948 16.3284V29.8174`}
      stroke={`currentColor`}
      strokeWidth={`4.7`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M42.5958 29.8198V10.6513C42.5958 7.90661 40.3708 5.68163 37.6262 5.68163C34.8815 5.68163 32.6565 7.90661 32.6565 10.6513V28.4`}
      stroke={`currentColor`}
      strokeWidth={`4.7`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M32.6576 28.3975V16.3284C32.6576 13.5837 30.4326 11.3588 27.6879 11.3588C24.9433 11.3588 22.7183 13.5837 22.7183 16.3284V39.7567`}
      stroke={`currentColor`}
      strokeWidth={`4.7`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const FullAccessShieldIcon = () => (
  <svg viewBox={`0 0 66.543 66.543`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M33.2482 22.1795V33.27`}
      stroke={`currentColor`}
      strokeWidth={`4.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M33.5966 43.67H33.2501M33.9432 43.67C33.9432 44.0529 33.633 44.3631 33.2501 44.3631C32.8672 44.3631 32.5569 44.0529 32.5569 43.67C32.5569 43.2871 32.8672 42.9768 33.2501 42.9768C33.633 42.9768 33.9432 43.2871 33.9432 43.67Z`}
      stroke={`currentColor`}
      strokeWidth={`4.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M58.202 31.0087V22.9595C58.202 18.4124 58.202 16.1389 57.0816 14.6555C55.9612 13.1722 53.4278 12.452 48.3612 11.0118C44.8995 10.0278 41.848 8.84228 39.41 7.76002C36.0859 6.28445 34.4237 5.54666 33.2484 5.54666C32.0728 5.54666 30.4109 6.28445 27.0868 7.76002C24.6487 8.84228 21.5973 10.0278 18.1357 11.0118C13.069 12.452 10.5356 13.1722 9.4152 14.6555C8.29475 16.1389 8.29475 18.4124 8.29475 22.9595V31.0087C8.29475 46.605 22.3319 55.9626 29.3498 59.6666C31.0331 60.5549 31.8748 60.9991 33.2484 60.9991C34.622 60.9991 35.4635 60.5549 37.1467 59.6666C44.1648 55.9626 58.202 46.605 58.202 31.0087Z`}
      stroke={`currentColor`}
      strokeWidth={`4.6`}
      strokeLinecap={`round`}
    />
  </svg>
);
const MicrophoneIcon = () => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const ChevronIcon = () => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`}
      stroke={`currentColor`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const SendIcon = () => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M12 5.5V19`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11`}
      stroke={`currentColor`}
      strokeWidth={`1.8`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const ColoredFolderIcon = () => (
  <svg viewBox={`0 0 67 67`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M11.17 15.35v15.36h44.67v-6.98c0-3.86-3.13-6.98-6.98-6.98H33.5l-3.93-5.89a5.58 5.58 0 0 0-4.64-2.49h-6.78c-3.86 0-6.98 3.13-6.98 6.98Z`}
      fill={`#00A1FF`}
    />
    <path
      d={`M33.5 16.75l-3.93-5.89a5.58 5.58 0 0 0-4.64-2.49h-6.78c-3.86 0-6.98 3.13-6.98 6.98v15.36h44.67v-6.98c0-3.86-3.13-6.98-6.98-6.98H33.5Zm0 0h-9.77`}
      stroke={`#00A1FF`}
      strokeWidth={`4.19`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M6.59 42.38c-1.05-5.26-1.57-7.89-.08-9.67l.31-.34c1.66-1.66 4.59-1.66 10.45-1.66h32.46c5.86 0 8.79 0 10.45 1.66l.31.34c1.49 1.78.97 4.41-.08 9.67-1.51 7.56-2.26 11.34-5.1 13.66l-.6.46c-3.01 2.13-7.23 2.13-15.66 2.13h-11.1c-8.43 0-12.64 0-15.66-2.13l-.6-.46c-2.84-2.32-3.6-6.1-5.1-13.66Z`}
      fill={`#3CC7FF`}
      stroke={`#3CC7FF`}
      strokeWidth={`4.19`}
    />
  </svg>
);
const useLogoId = () => `ui-ccc` + useId().replace(/[^a-zA-Z0-9_-]/g, ``);
const GmailLogo = () => {
  let logoId = useLogoId();
  return (
    <svg viewBox={`0 0 56.4108 44.8722`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M44.2255 5.76727H56.4051V41.0239C56.4051 43.148 54.683 44.8701 52.5589 44.8701H46.1486C45.8961 44.8701 45.646 44.8204 45.4127 44.7237C45.1794 44.6271 44.9674 44.4854 44.7888 44.3069C44.6102 44.1283 44.4686 43.9163 44.3719 43.683C44.2753 43.4497 44.2255 43.1996 44.2255 42.947V5.76727Z`}
        fill={`url(#${logoId}-0)`}
      />
      <path
        d={`M12.1796 5.76727H0V41.0239C0 43.148 1.72213 44.8701 3.84618 44.8701H10.2565C10.509 44.8701 10.7591 44.8204 10.9924 44.7237C11.2257 44.6271 11.4377 44.4854 11.6163 44.3069C11.7949 44.1283 11.9365 43.9163 12.0332 43.683C12.1298 43.4497 12.1796 43.1996 12.1796 42.947V5.76727Z`}
        fill={`#FC413D`}
      />
      <path
        d={`M10.0085 1.42778C7.43377 -0.736342 3.5924 -0.403647 1.42828 2.17105C-0.735843 4.74543 -0.403148 8.58681 2.17155 10.7512L26.5557 31.2479C27.0178 31.6362 27.602 31.8492 28.2056 31.8492C28.8091 31.8492 29.3934 31.6362 29.8554 31.2479L54.2396 10.7509C56.814 8.58681 57.1467 4.74543 54.9825 2.17073C52.8184 -0.403648 48.977 -0.736342 46.4027 1.42778L28.2054 16.724L10.0085 1.42778Z`}
        fill={`url(#${logoId}-1)`}
      />
      <defs>
        <linearGradient
          id={`${logoId}-0`}
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
          id={`${logoId}-1`}
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
const ClickUpLogo = () => {
  let logoId = useLogoId();
  return (
    <svg viewBox={`0 0 49.7096 59.6884`} fill={`none`} aria-hidden={`true`}>
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M0 45.9002L9.1618 38.8247C14.0602 45.1745 19.2307 48.1679 24.9455 48.1679C30.6603 48.1679 35.7401 45.2652 40.3663 38.9154L49.7096 45.8094C42.997 54.8805 34.6516 59.6882 24.9455 59.6882C15.3301 59.6882 6.89403 54.8805 0 45.9002Z`}
        fill={`url(#${logoId}-0)`}
      />
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M24.9535 15.3301L8.62558 29.3903L1.09657 20.5914L25.0442 0L48.8105 20.5914L41.1908 29.2996L24.9535 15.3301Z`}
        fill={`url(#${logoId}-1)`}
      />
      <defs>
        <linearGradient
          id={`${logoId}-0`}
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
          id={`${logoId}-1`}
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
const strokeProps = {
  fill: `none`,
  stroke: `currentColor`,
  strokeWidth: 1.6,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
} as const;
const AutoLogo = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps} aria-hidden={`true`}>
    <path
      d={`M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z`}
    />
    <path
      d={`M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z`}
    />
  </svg>
);
const CheckIcon_clean_graphics = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps} strokeWidth={2} aria-hidden={`true`}>
    <path d={`M5 14L8.5 17.5L19 6.5`} />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps} aria-hidden={`true`}>
    <path d={`M18 6L6.00081 17.9992M17.9992 18L6 6.00085`} />
  </svg>
);
const ClaudeLogo = () => (
  <svg viewBox={`0 0 1200 1200`} aria-hidden={`true`}>
    <path
      fill={`#D97757`}
      d={`M 233.959793 800.214905 L 468.644287 668.536987 L 472.590637 657.100647 L 468.644287 650.738403 L 457.208069 650.738403 L 417.986633 648.322144 L 283.892639 644.69812 L 167.597321 639.865845 L 54.926208 633.825623 L 26.577238 627.785339 L 3.3e-05 592.751709 L 2.73832 575.27533 L 26.577238 559.248352 L 60.724873 562.228149 L 136.187973 567.382629 L 249.422867 575.194763 L 331.570496 580.026978 L 453.261841 592.671082 L 472.590637 592.671082 L 475.328857 584.859009 L 468.724915 580.026978 L 463.570557 575.194763 L 346.389313 495.785217 L 219.543671 411.865906 L 153.100723 363.543762 L 117.181267 339.060425 L 99.060455 316.107361 L 91.248367 266.01355 L 123.865784 230.093994 L 167.677887 233.073853 L 178.872513 236.053772 L 223.248367 270.201477 L 318.040283 343.570496 L 441.825592 434.738342 L 459.946411 449.798706 L 467.194672 444.64447 L 468.080597 441.020203 L 459.946411 427.409485 L 392.617493 305.718323 L 320.778564 181.932983 L 288.80542 130.630859 L 280.348999 99.865845 C 277.369171 87.221436 275.194641 76.590698 275.194641 63.624268 L 312.322174 13.20813 L 332.8591 6.604126 L 382.389313 13.20813 L 403.248352 31.328979 L 434.013519 101.71814 L 483.865753 212.537048 L 561.181274 363.221497 L 583.812134 407.919434 L 595.892639 449.315491 L 600.40271 461.959839 L 608.214783 461.959839 L 608.214783 454.711609 L 614.577271 369.825623 L 626.335632 265.61084 L 637.771851 131.516846 L 641.718201 93.745117 L 660.402832 48.483276 L 697.530334 24.000122 L 726.52356 37.852417 L 750.362549 72 L 747.060486 94.067139 L 732.886047 186.201416 L 705.100708 330.52356 L 686.979919 427.167847 L 697.530334 427.167847 L 709.61084 415.087341 L 758.496704 350.174561 L 840.644348 247.490051 L 876.885925 206.738342 L 919.167847 161.71814 L 946.308838 140.29541 L 997.61084 140.29541 L 1035.38269 196.429626 L 1018.469849 254.416199 L 965.637634 321.422852 L 921.825562 378.201538 L 859.006714 462.765259 L 819.785278 530.41626 L 823.409424 535.812073 L 832.75177 534.92627 L 974.657776 504.724915 L 1051.328979 490.872559 L 1142.818848 475.167786 L 1184.214844 494.496582 L 1188.724854 514.147644 L 1172.456421 554.335693 L 1074.604126 578.496765 L 959.838989 601.449829 L 788.939636 641.879272 L 786.845764 643.409485 L 789.261841 646.389343 L 866.255127 653.637634 L 899.194702 655.409424 L 979.812134 655.409424 L 1129.932861 666.604187 L 1169.154419 692.537109 L 1192.671265 724.268677 L 1188.724854 748.429688 L 1128.322144 779.194641 L 1046.818848 759.865845 L 856.590759 714.604126 L 791.355774 698.335754 L 782.335693 698.335754 L 782.335693 703.731567 L 836.69812 756.885986 L 936.322205 846.845581 L 1061.073975 962.81897 L 1067.436279 991.490112 L 1051.409424 1014.120911 L 1034.496704 1011.704712 L 924.885986 929.234924 L 882.604126 892.107544 L 786.845764 811.48999 L 780.483276 811.48999 L 780.483276 819.946289 L 802.550415 852.241699 L 919.087341 1027.409424 L 925.127625 1081.127686 L 916.671204 1098.604126 L 886.469849 1109.154419 L 853.288696 1103.114136 L 785.073914 1007.355835 L 714.684631 899.516785 L 657.906067 802.872498 L 650.979858 806.81897 L 617.476624 1167.704834 L 601.771851 1186.147705 L 565.530212 1200 L 535.328857 1177.046997 L 519.302124 1139.919556 L 535.328857 1066.550537 L 554.657776 970.792053 L 570.362488 894.68457 L 584.536926 800.134277 L 592.993347 768.724976 L 592.429626 766.630859 L 585.503479 767.516968 L 514.22821 865.369263 L 405.825531 1011.865906 L 320.053711 1103.677979 L 299.516815 1111.812256 L 263.919525 1093.369263 L 267.221497 1060.429688 L 287.114136 1031.114136 L 405.825531 880.107361 L 477.422913 786.52356 L 523.651062 732.483276 L 523.328918 724.671265 L 520.590698 724.671265 L 205.288605 929.395935 L 149.154434 936.644409 L 124.993355 914.01355 L 127.973183 876.885986 L 139.409409 864.80542 L 234.201385 799.570435 L 233.879227 799.8927 Z`}
    />
  </svg>
);
const ChatGptLogo = () => (
  <svg viewBox={`0 0 68.614 68.002`} aria-hidden={`true`}>
    <path
      fill={`currentColor`}
      d={`M26.3166 24.7525V18.2923C26.3166 17.7482 26.5208 17.3401 26.9966 17.0684L39.9853 9.5882C41.7533 8.56821 43.8615 8.09244 46.0372 8.09244C54.1973 8.09244 59.3658 14.4167 59.3658 21.1486C59.3658 21.6245 59.3658 22.1686 59.2976 22.7127L45.8331 14.8243C45.0172 14.3486 44.2009 14.3486 43.385 14.8243L26.3166 24.7525ZM56.6454 49.9134V34.4766C56.6454 33.5244 56.2371 32.8444 55.4213 32.3685L38.3529 22.4403L43.9291 19.244C44.405 18.9723 44.8131 18.9723 45.289 19.244L58.2776 26.7242C62.018 28.9005 64.5338 33.5244 64.5338 38.0122C64.5338 43.1802 61.4739 47.9406 56.6454 49.9128V49.9134ZM22.3045 36.3131L16.7284 33.0492C16.2526 32.7775 16.0484 32.3692 16.0484 31.8251V16.8649C16.0484 9.58891 21.6245 4.08038 29.1729 4.08038C32.0293 4.08038 34.6809 5.03262 36.9255 6.7326L23.5292 14.485C22.7134 14.9608 22.3052 15.6408 22.3052 16.5932V36.3137L22.3045 36.3131ZM34.307 43.2491L26.3166 38.7611V29.2412L34.307 24.7532L42.2968 29.2412V38.7611L34.307 43.2491ZM39.4411 63.9219C36.5848 63.9219 33.9333 62.9697 31.6886 61.2699L45.0848 53.5173C45.9007 53.0415 46.3089 52.3615 46.3089 51.4091V31.6886L51.9533 34.9525C52.4291 35.2242 52.6333 35.6324 52.6333 36.1766V51.1369C52.6333 58.4128 46.9889 63.9214 39.4411 63.9214V63.9219ZM23.3245 48.7576L10.3358 41.2775C6.59541 39.1011 4.07967 34.4773 4.07967 29.9894C4.07967 24.7532 7.2078 20.0612 12.0356 18.0889V33.5933C12.0356 34.5455 12.4439 35.2255 13.2597 35.7014L30.2605 45.5613L24.6844 48.7576C24.2086 49.0293 23.8003 49.0293 23.3245 48.7576ZM22.5769 59.9099C14.8926 59.9099 9.24834 54.1297 9.24834 46.9895C9.24834 46.4454 9.31651 45.9013 9.38411 45.3572L22.7804 53.1097C23.5962 53.5856 24.4127 53.5856 25.2284 53.1097L42.2968 43.2498V49.71C42.2968 50.2541 42.0927 50.6622 41.6168 50.9339L28.6283 58.4141C26.8601 59.4341 24.752 59.9099 22.5762 59.9099H22.5769ZM39.4411 68.0017C47.6694 68.0017 54.5372 62.1538 56.1019 54.4013C63.718 52.4291 68.6141 45.2889 68.6141 38.0129C68.6141 33.2526 66.5743 28.6288 62.9021 25.2966C63.2421 23.8685 63.4462 22.4403 63.4462 21.0129C63.4462 11.2887 55.5578 4.01207 46.4454 4.01207C44.6098 4.01207 42.8416 4.28375 41.0735 4.89614C38.0129 1.90392 33.7968 0 29.1729 0C20.9447 0 14.0769 5.84782 12.5122 13.6003C4.89614 15.5725 0 22.7127 0 29.9887C0 34.749 2.03983 39.3728 5.71204 42.705C5.37205 44.1331 5.16797 45.5613 5.16797 46.9889C5.16797 56.713 13.0563 63.9895 22.1686 63.9895C24.0044 63.9895 25.7725 63.7179 27.5407 63.1055C30.6005 66.0977 34.8166 68.0017 39.4411 68.0017Z`}
    />
  </svg>
);
const defaultFolders = ["Q3 Campaign", "Brand assets", "Hiring", "Research"];
const defaultDictation = "Draft a short update for the team about this week's progress";
const emptyWaveform = () => Array.from({ length: 16 }, () => 0);
const approvalOptions: ApprovalOption[] = [
  {
    id: "ask",
    label: "Request approval",
    description: "Always ask before editing outside files or using the internet",
    Icon: ApprovalHandIcon,
  },
  {
    id: "auto",
    label: "Approve for me",
    description: "Only ask for potentially unsafe actions",
    Icon: AutoApprovalIcon,
  },
  {
    id: "full",
    label: "Full access",
    description: "Unrestricted access to the internet and all files on your computer",
    Icon: FullAccessShieldIcon,
    tone: "alert",
  },
];
const addSections: {
  title: string;
  rows: AddOption[];
}[] = [
  {
    title: "Add",
    rows: [
      { id: "files", label: "Files and folders", Icon: FilesIcon },
      { id: "claude", label: "Attach Claude", Icon: ClaudeLogo },
      {
        id: "folder",
        label: "Work in a folder",
        description: "Choose a folder for this chat",
        Icon: FolderIcon,
      },
      {
        id: "goal",
        label: "Goal",
        description: "Set a goal to keep working toward",
        Icon: GoalIcon,
      },
      {
        id: "plan",
        label: "Plan mode",
        description: "Turn on plan mode",
        Icon: PlanIcon,
      },
      { id: "skill", label: "Record a skill", Icon: RecordSkillIcon },
      {
        id: "draw",
        label: "Draw",
        description: "Sketch a drawing",
        Icon: DrawIcon,
      },
    ],
  },
  {
    title: "Plugins",
    rows: [
      {
        id: "documents",
        label: "Documents",
        description: "Create and edit documents",
        Icon: () => <DocumentIcon color="#3e7bfa" />,
      },
      {
        id: "pdf",
        label: "PDF",
        description: "Read, create and verify PDFs",
        Icon: () => <DocumentIcon color="#e5484d" />,
      },
    ],
  },
];
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));
const AddIcon_default_graphics = () => (
  <svg viewBox={`0 0 68.155 68.155`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M34.0812 11.3588V56.7954M56.7995 34.0771H11.3629`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const ApprovalHandIcon_default_graphics = () => (
  <svg
    viewBox={`0 0 68.155 68.155`}
    fill={`none`}
    className={`ui-chat-composer__hand`}
    aria-hidden={`true`}
  >
    <path
      d={`M52.5305 32.6557V24.8463C52.5305 22.1016 54.7555 19.8766 57.5001 19.8766C60.2448 19.8766 62.4698 22.1016 62.4698 24.8463V42.027C62.4698 53.3194 53.3154 62.4735 42.0233 62.4735H34.2388M22.7127 39.7552L15.94 31.8537C14.8314 30.5602 13.2129 29.8159 11.5094 29.8159H11.1235C8.11379 29.8159 5.67395 32.2558 5.67395 35.2655C5.67395 36.3412 5.99241 37.393 6.58919 38.2881L16.4118 53.0221C20.3482 58.9269 26.9753 62.4735 34.0719 62.4735`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M52.534 24.1378V16.3284C52.534 13.5837 50.3091 11.3588 47.5644 11.3588C44.8197 11.3588 42.5948 13.5837 42.5948 16.3284V29.8174`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M42.5958 29.8198V10.6513C42.5958 7.90661 40.3708 5.68163 37.6262 5.68163C34.8815 5.68163 32.6565 7.90661 32.6565 10.6513V28.4`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M32.6576 28.3975V16.3284C32.6576 13.5837 30.4326 11.3588 27.6879 11.3588C24.9433 11.3588 22.7183 13.5837 22.7183 16.3284V39.7567`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const FullAccessShieldIcon_default_graphics = () => (
  <svg
    viewBox={`0 0 66.543 66.543`}
    fill={`none`}
    className={`ui-chat-composer__shield`}
    aria-hidden={`true`}
  >
    <path
      d={`M33.2482 22.1795V33.27`}
      stroke={`#F44900`}
      strokeWidth={`4.15894`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M33.5966 43.67H33.2501M33.9432 43.67C33.9432 44.0529 33.633 44.3631 33.2501 44.3631C32.8672 44.3631 32.5569 44.0529 32.5569 43.67C32.5569 43.2871 32.8672 42.9768 33.2501 42.9768C33.633 42.9768 33.9432 43.2871 33.9432 43.67Z`}
      stroke={`#F44900`}
      strokeWidth={`4.15894`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M58.202 31.0087V22.9595C58.202 18.4124 58.202 16.1389 57.0816 14.6555C55.9612 13.1722 53.4278 12.452 48.3612 11.0118C44.8995 10.0278 41.848 8.84228 39.41 7.76002C36.0859 6.28445 34.4237 5.54666 33.2484 5.54666C32.0728 5.54666 30.4109 6.28445 27.0868 7.76002C24.6487 8.84228 21.5973 10.0278 18.1357 11.0118C13.069 12.452 10.5356 13.1722 9.4152 14.6555C8.29475 16.1389 8.29475 18.4124 8.29475 22.9595V31.0087C8.29475 46.605 22.3319 55.9626 29.3498 59.6666C31.0331 60.5549 31.8748 60.9991 33.2484 60.9991C34.622 60.9991 35.4635 60.5549 37.1467 59.6666C44.1648 55.9626 58.202 46.605 58.202 31.0087Z`}
      stroke={`#F44900`}
      strokeWidth={`4.15894`}
      strokeLinecap={`round`}
    />
  </svg>
);
const MicrophoneIcon_default_graphics = () => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z`}
      stroke={`currentColor`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22`}
      stroke={`currentColor`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const ChevronIcon_default_graphics = () => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`}
      stroke={`currentColor`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const SendIcon_default_graphics = () => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M12 5.5V19`}
      stroke={`currentColor`}
      strokeWidth={`1.75`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11`}
      stroke={`currentColor`}
      strokeWidth={`1.75`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const ColoredFolderIcon_default_graphics = () => (
  <svg viewBox={`0 0 67 67`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M11.1704 15.3527V30.7069H55.837V23.7277C55.837 19.8732 52.7123 16.7485 48.8578 16.7485H33.5037L29.5778 10.8598C28.5423 9.30649 26.799 8.37352 24.9322 8.37352H18.1495C14.295 8.37352 11.1704 11.4982 11.1704 15.3527Z`}
      fill={`#00A1FF`}
    />
    <path
      d={`M33.5037 16.7485L29.5778 10.8598C28.5423 9.30649 26.799 8.37352 24.9322 8.37352H18.1495C14.295 8.37352 11.1704 11.4982 11.1704 15.3527V30.7068H55.837V23.7277C55.837 19.8732 52.7123 16.7485 48.8578 16.7485H33.5037ZM33.5037 16.7485H23.7328`}
      stroke={`#00A1FF`}
      strokeWidth={`4.1875`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      opacity={`0.4`}
      d={`M6.59197 42.3758C5.54336 37.1185 5.01906 34.4899 6.50878 32.7085C6.6081 32.5899 6.71315 32.4751 6.82359 32.3646C8.47975 30.71 11.4107 30.71 17.2725 30.71H49.7312C55.5931 30.71 58.5238 30.71 60.1801 32.3646C60.2904 32.4751 60.3957 32.5899 60.495 32.7085C61.9847 34.4899 61.4604 37.1185 60.4118 42.3758C58.9041 49.9348 58.15 53.7144 55.3073 56.0363C55.1133 56.1945 54.9134 56.3467 54.7076 56.4921C51.6932 58.6266 47.4792 58.6266 39.0506 58.6266H27.9531C19.5246 58.6266 15.3104 58.6266 12.296 56.4921C12.0904 56.3467 11.8904 56.1945 11.6965 56.0363C8.85353 53.7144 8.09969 49.9348 6.59197 42.3758Z`}
      fill={`#929292`}
    />
    <path
      d={`M6.59197 42.3758C5.54336 37.1185 5.01906 34.4899 6.50878 32.7085C6.6081 32.5899 6.71315 32.4751 6.82359 32.3646C8.47975 30.71 11.4107 30.71 17.2725 30.71H49.7312C55.5931 30.71 58.5238 30.71 60.1801 32.3646C60.2904 32.4751 60.3957 32.5899 60.495 32.7085C61.9847 34.4899 61.4604 37.1185 60.4118 42.3758C58.9041 49.9348 58.15 53.7144 55.3073 56.0363C55.1133 56.1945 54.9134 56.3467 54.7076 56.4921C51.6932 58.6266 47.4792 58.6266 39.0506 58.6266H27.9531C19.5246 58.6266 15.3104 58.6266 12.296 56.4921C12.0904 56.3467 11.8904 56.1945 11.6965 56.0363C8.85353 53.7144 8.09969 49.9348 6.59197 42.3758Z`}
      fill={`#3CC7FF`}
      stroke={`#3CC7FF`}
      strokeWidth={`4.1875`}
    />
  </svg>
);
const FolderIcon_default_graphics = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps_default_graphics} aria-hidden={`true`}>
    <path
      d={`M3 7.5C3 6.1 4.1 5 5.5 5H9.2C9.9 5 10.5 5.3 11 5.8L12.2 7H18.5C19.9 7 21 8.1 21 9.5V16.5C21 17.9 19.9 19 18.5 19H5.5C4.1 19 3 17.9 3 16.5V7.5Z`}
    />
    <path d={`M3 10H21`} />
  </svg>
);
const useLogoId_default_graphics = () => `ui-cc` + useId().replace(/[^a-zA-Z0-9_-]/g, ``);
const GmailLogo_default_graphics = () => {
  let logoId = useLogoId_default_graphics();
  return (
    <svg viewBox={`0 0 56.4108 44.8722`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M44.2255 5.76727H56.4051V41.0239C56.4051 43.148 54.683 44.8701 52.5589 44.8701H46.1486C45.8961 44.8701 45.646 44.8204 45.4127 44.7237C45.1794 44.6271 44.9674 44.4854 44.7888 44.3069C44.6102 44.1283 44.4686 43.9163 44.3719 43.683C44.2753 43.4497 44.2255 43.1996 44.2255 42.947V5.76727Z`}
        fill={`url(#${logoId}-0)`}
      />
      <path
        d={`M12.1796 5.76727H0V41.0239C0 43.148 1.72213 44.8701 3.84618 44.8701H10.2565C10.509 44.8701 10.7591 44.8204 10.9924 44.7237C11.2257 44.6271 11.4377 44.4854 11.6163 44.3069C11.7949 44.1283 11.9365 43.9163 12.0332 43.683C12.1298 43.4497 12.1796 43.1996 12.1796 42.947V5.76727Z`}
        fill={`#FC413D`}
      />
      <path
        d={`M10.0085 1.42778C7.43377 -0.736342 3.5924 -0.403647 1.42828 2.17105C-0.735843 4.74543 -0.403148 8.58681 2.17155 10.7512L26.5557 31.2479C27.0178 31.6362 27.602 31.8492 28.2056 31.8492C28.8091 31.8492 29.3934 31.6362 29.8554 31.2479L54.2396 10.7509C56.814 8.58681 57.1467 4.74543 54.9825 2.17073C52.8184 -0.403648 48.977 -0.736342 46.4027 1.42778L28.2054 16.724L10.0085 1.42778Z`}
        fill={`url(#${logoId}-1)`}
      />
      <defs>
        <linearGradient
          id={`${logoId}-0`}
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
          id={`${logoId}-1`}
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
const SlackLogo_default_graphics = () => (
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
const ClickUpLogo_default_graphics = () => {
  let logoId = useLogoId_default_graphics();
  return (
    <svg viewBox={`0 0 49.7096 59.6884`} fill={`none`} aria-hidden={`true`}>
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M0 45.9002L9.1618 38.8247C14.0602 45.1745 19.2307 48.1679 24.9455 48.1679C30.6603 48.1679 35.7401 45.2652 40.3663 38.9154L49.7096 45.8094C42.997 54.8805 34.6516 59.6882 24.9455 59.6882C15.3301 59.6882 6.89403 54.8805 0 45.9002Z`}
        fill={`url(#${logoId}-0)`}
      />
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M24.9535 15.3301L8.62558 29.3903L1.09657 20.5914L25.0442 0L48.8105 20.5914L41.1908 29.2996L24.9535 15.3301Z`}
        fill={`url(#${logoId}-1)`}
      />
      <defs>
        <linearGradient
          id={`${logoId}-0`}
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
          id={`${logoId}-1`}
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
const strokeProps_default_graphics = {
  fill: `none`,
  stroke: `currentColor`,
  strokeWidth: 1.5,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
} as const;
const AutoLogo_default_graphics = () => (
  <svg viewBox={`0 0 24 24`} {...strokeProps_default_graphics} aria-hidden={`true`}>
    <path
      d={`M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z`}
    />
    <path
      d={`M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z`}
    />
  </svg>
);
const CheckIcon_default_graphics = () => (
  <svg
    viewBox={`0 0 24 24`}
    {...strokeProps_default_graphics}
    strokeWidth={1.75}
    aria-hidden={`true`}
  >
    <path d={`M5 14L8.5 17.5L19 6.5`} />
  </svg>
);
const CloseIcon_default_graphics = () => (
  <svg
    viewBox={`0 0 24 24`}
    {...strokeProps_default_graphics}
    color={`#737373`}
    aria-hidden={`true`}
  >
    <path d={`M18 6L6.00081 17.9992M17.9992 18L6 6.00085`} />
  </svg>
);
const ClaudeLogo_default_graphics = () => (
  <svg viewBox={`0 0 1200 1200`} aria-hidden={`true`}>
    <path
      fill={`#D97757`}
      d={`M 233.959793 800.214905 L 468.644287 668.536987 L 472.590637 657.100647 L 468.644287 650.738403 L 457.208069 650.738403 L 417.986633 648.322144 L 283.892639 644.69812 L 167.597321 639.865845 L 54.926208 633.825623 L 26.577238 627.785339 L 3.3e-05 592.751709 L 2.73832 575.27533 L 26.577238 559.248352 L 60.724873 562.228149 L 136.187973 567.382629 L 249.422867 575.194763 L 331.570496 580.026978 L 453.261841 592.671082 L 472.590637 592.671082 L 475.328857 584.859009 L 468.724915 580.026978 L 463.570557 575.194763 L 346.389313 495.785217 L 219.543671 411.865906 L 153.100723 363.543762 L 117.181267 339.060425 L 99.060455 316.107361 L 91.248367 266.01355 L 123.865784 230.093994 L 167.677887 233.073853 L 178.872513 236.053772 L 223.248367 270.201477 L 318.040283 343.570496 L 441.825592 434.738342 L 459.946411 449.798706 L 467.194672 444.64447 L 468.080597 441.020203 L 459.946411 427.409485 L 392.617493 305.718323 L 320.778564 181.932983 L 288.80542 130.630859 L 280.348999 99.865845 C 277.369171 87.221436 275.194641 76.590698 275.194641 63.624268 L 312.322174 13.20813 L 332.8591 6.604126 L 382.389313 13.20813 L 403.248352 31.328979 L 434.013519 101.71814 L 483.865753 212.537048 L 561.181274 363.221497 L 583.812134 407.919434 L 595.892639 449.315491 L 600.40271 461.959839 L 608.214783 461.959839 L 608.214783 454.711609 L 614.577271 369.825623 L 626.335632 265.61084 L 637.771851 131.516846 L 641.718201 93.745117 L 660.402832 48.483276 L 697.530334 24.000122 L 726.52356 37.852417 L 750.362549 72 L 747.060486 94.067139 L 732.886047 186.201416 L 705.100708 330.52356 L 686.979919 427.167847 L 697.530334 427.167847 L 709.61084 415.087341 L 758.496704 350.174561 L 840.644348 247.490051 L 876.885925 206.738342 L 919.167847 161.71814 L 946.308838 140.29541 L 997.61084 140.29541 L 1035.38269 196.429626 L 1018.469849 254.416199 L 965.637634 321.422852 L 921.825562 378.201538 L 859.006714 462.765259 L 819.785278 530.41626 L 823.409424 535.812073 L 832.75177 534.92627 L 974.657776 504.724915 L 1051.328979 490.872559 L 1142.818848 475.167786 L 1184.214844 494.496582 L 1188.724854 514.147644 L 1172.456421 554.335693 L 1074.604126 578.496765 L 959.838989 601.449829 L 788.939636 641.879272 L 786.845764 643.409485 L 789.261841 646.389343 L 866.255127 653.637634 L 899.194702 655.409424 L 979.812134 655.409424 L 1129.932861 666.604187 L 1169.154419 692.537109 L 1192.671265 724.268677 L 1188.724854 748.429688 L 1128.322144 779.194641 L 1046.818848 759.865845 L 856.590759 714.604126 L 791.355774 698.335754 L 782.335693 698.335754 L 782.335693 703.731567 L 836.69812 756.885986 L 936.322205 846.845581 L 1061.073975 962.81897 L 1067.436279 991.490112 L 1051.409424 1014.120911 L 1034.496704 1011.704712 L 924.885986 929.234924 L 882.604126 892.107544 L 786.845764 811.48999 L 780.483276 811.48999 L 780.483276 819.946289 L 802.550415 852.241699 L 919.087341 1027.409424 L 925.127625 1081.127686 L 916.671204 1098.604126 L 886.469849 1109.154419 L 853.288696 1103.114136 L 785.073914 1007.355835 L 714.684631 899.516785 L 657.906067 802.872498 L 650.979858 806.81897 L 617.476624 1167.704834 L 601.771851 1186.147705 L 565.530212 1200 L 535.328857 1177.046997 L 519.302124 1139.919556 L 535.328857 1066.550537 L 554.657776 970.792053 L 570.362488 894.68457 L 584.536926 800.134277 L 592.993347 768.724976 L 592.429626 766.630859 L 585.503479 767.516968 L 514.22821 865.369263 L 405.825531 1011.865906 L 320.053711 1103.677979 L 299.516815 1111.812256 L 263.919525 1093.369263 L 267.221497 1060.429688 L 287.114136 1031.114136 L 405.825531 880.107361 L 477.422913 786.52356 L 523.651062 732.483276 L 523.328918 724.671265 L 520.590698 724.671265 L 205.288605 929.395935 L 149.154434 936.644409 L 124.993355 914.01355 L 127.973183 876.885986 L 139.409409 864.80542 L 234.201385 799.570435 L 233.879227 799.8927 Z`}
    />
  </svg>
);
const ChatGptLogo_default_graphics = () => (
  <svg viewBox={`0 0 68.614 68.002`} aria-hidden={`true`}>
    <path
      fill={`currentColor`}
      d={`M26.3166 24.7525V18.2923C26.3166 17.7482 26.5208 17.3401 26.9966 17.0684L39.9853 9.5882C41.7533 8.56821 43.8615 8.09244 46.0372 8.09244C54.1973 8.09244 59.3658 14.4167 59.3658 21.1486C59.3658 21.6245 59.3658 22.1686 59.2976 22.7127L45.8331 14.8243C45.0172 14.3486 44.2009 14.3486 43.385 14.8243L26.3166 24.7525ZM56.6454 49.9134V34.4766C56.6454 33.5244 56.2371 32.8444 55.4213 32.3685L38.3529 22.4403L43.9291 19.244C44.405 18.9723 44.8131 18.9723 45.289 19.244L58.2776 26.7242C62.018 28.9005 64.5338 33.5244 64.5338 38.0122C64.5338 43.1802 61.4739 47.9406 56.6454 49.9128V49.9134ZM22.3045 36.3131L16.7284 33.0492C16.2526 32.7775 16.0484 32.3692 16.0484 31.8251V16.8649C16.0484 9.58891 21.6245 4.08038 29.1729 4.08038C32.0293 4.08038 34.6809 5.03262 36.9255 6.7326L23.5292 14.485C22.7134 14.9608 22.3052 15.6408 22.3052 16.5932V36.3137L22.3045 36.3131ZM34.307 43.2491L26.3166 38.7611V29.2412L34.307 24.7532L42.2968 29.2412V38.7611L34.307 43.2491ZM39.4411 63.9219C36.5848 63.9219 33.9333 62.9697 31.6886 61.2699L45.0848 53.5173C45.9007 53.0415 46.3089 52.3615 46.3089 51.4091V31.6886L51.9533 34.9525C52.4291 35.2242 52.6333 35.6324 52.6333 36.1766V51.1369C52.6333 58.4128 46.9889 63.9214 39.4411 63.9214V63.9219ZM23.3245 48.7576L10.3358 41.2775C6.59541 39.1011 4.07967 34.4773 4.07967 29.9894C4.07967 24.7532 7.2078 20.0612 12.0356 18.0889V33.5933C12.0356 34.5455 12.4439 35.2255 13.2597 35.7014L30.2605 45.5613L24.6844 48.7576C24.2086 49.0293 23.8003 49.0293 23.3245 48.7576ZM22.5769 59.9099C14.8926 59.9099 9.24834 54.1297 9.24834 46.9895C9.24834 46.4454 9.31651 45.9013 9.38411 45.3572L22.7804 53.1097C23.5962 53.5856 24.4127 53.5856 25.2284 53.1097L42.2968 43.2498V49.71C42.2968 50.2541 42.0927 50.6622 41.6168 50.9339L28.6283 58.4141C26.8601 59.4341 24.752 59.9099 22.5762 59.9099H22.5769ZM39.4411 68.0017C47.6694 68.0017 54.5372 62.1538 56.1019 54.4013C63.718 52.4291 68.6141 45.2889 68.6141 38.0129C68.6141 33.2526 66.5743 28.6288 62.9021 25.2966C63.2421 23.8685 63.4462 22.4403 63.4462 21.0129C63.4462 11.2887 55.5578 4.01207 46.4454 4.01207C44.6098 4.01207 42.8416 4.28375 41.0735 4.89614C38.0129 1.90392 33.7968 0 29.1729 0C20.9447 0 14.0769 5.84782 12.5122 13.6003C4.89614 15.5725 0 22.7127 0 29.9887C0 34.749 2.03983 39.3728 5.71204 42.705C5.37205 44.1331 5.16797 45.5613 5.16797 46.9889C5.16797 56.713 13.0563 63.9895 22.1686 63.9895C24.0044 63.9895 25.7725 63.7179 27.5407 63.1055C30.6005 66.0977 34.8166 68.0017 39.4411 68.0017Z`}
    />
  </svg>
);
const defaultModels: ComposerModel[] = [
  {
    id: "auto",
    name: "Auto",
    description: "Picks the best model for each task",
    Logo: AutoLogo_default_graphics,
  },
  {
    id: "claude",
    name: "Claude",
    description: "Thoughtful writing and code",
    Logo: ClaudeLogo_default_graphics,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Quick answers for everyday tasks",
    Logo: ChatGptLogo_default_graphics,
  },
];
const defaultApps: ComposerApp[] = [
  { id: "gmail", name: "Gmail", Logo: GmailLogo_default_graphics },
  { id: "slack", name: "Slack", Logo: SlackLogo_default_graphics },
  { id: "clickup", name: "ClickUp", Logo: ClickUpLogo_default_graphics },
];
export { ChatComposer };
export type { ComposerModel };
export type { ComposerApp };
export type { ComposerApproval };
export type { ChatComposerProps };
