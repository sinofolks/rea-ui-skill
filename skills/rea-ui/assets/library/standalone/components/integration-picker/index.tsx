"use client";

import "./IntegrationPicker.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
  useId,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type KeyboardEvent,
} from "react";
interface Integration {
  id?: string;
  name?: string;
  label?: string;
  domain?: string;
  category?: string;
  description?: string;
  features?: string[];
  path?: string;
  color?: string;
  tile?: string;
  connected?: boolean;
  icon?: ReactNode;
  [field: string]: unknown;
}
interface IntegrationPickerProps {
  integrations?: Integration[];
  appName?: string;
  appIcon?: ReactNode;
  defaultSelected?: string;
  onToggle?: (id: string, connected: boolean) => void;
  onExplore?: (id: string) => void;
  onBack?: () => void;
  onClose?: () => void;
  className?: string;
}
type BrandStyle = CSSProperties & {
  "--ui-ip-brand"?: string;
  "--ui-ipc-brand"?: string;
};
interface IntegrationOptionProps {
  item: Integration;
  picked: boolean;
  optionId: string;
  onPick: (id: string | undefined) => void;
  prefix: string;
  clean: boolean;
}
function IntegrationPicker(props: IntegrationPickerProps) {
  return <IntegrationPickerView {...props} />;
}
function ClickUpIcon({ prefix }: { prefix: string }) {
  const id = `${prefix}-cu${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#8930FD" />
          <stop offset="1" stopColor="#49CCF9" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#FF02F0" />
          <stop offset="1" stopColor="#FFC800" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id}-a)`}
        d="M2 18.439l3.69-2.828c1.961 2.56 4.044 3.739 6.363 3.739 2.307 0 4.33-1.166 6.203-3.704L22 18.405C19.298 22.065 15.941 24 12.053 24 8.178 24 4.788 22.078 2 18.439z"
      />
      <path
        fill={`url(#${id}-b)`}
        d="M12.04 6.15l-6.568 5.66-3.036-3.52L12.055 0l9.543 8.296-3.05 3.509z"
      />
    </svg>
  );
}
function logoAttributes(
  item: Integration,
  clean: boolean,
): {
  "data-tone": "ink" | "light" | "brand";
  style?: BrandStyle;
} {
  const tile = (item.tile ?? "").toLowerCase();
  const tone =
    !tile || tile === "#000" || tile === "#000000"
      ? "ink"
      : tile === "#fff" || tile === "#ffffff"
        ? "light"
        : "brand";
  return {
    "data-tone": tone,
    style:
      tone === "brand"
        ? clean
          ? { "--ui-ipc-brand": item.tile }
          : { "--ui-ip-brand": item.tile }
        : undefined,
  };
}
function IntegrationLogo({ item, prefix }: { item: Integration; prefix: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  const initial = (item.name?.match(/[\p{L}\p{N}]/u)?.[0] ?? "?").toUpperCase();
  const fallback = <span className={`${prefix}__letter`}>{initial}</span>;
  if (imageFailed) return fallback;
  if (item.icon) {
    if (
      isValidElement<ImgHTMLAttributes<HTMLImageElement>>(item.icon) &&
      item.icon.type === "img"
    ) {
      const icon = item.icon;
      return cloneElement(icon, {
        onError: (event) => {
          icon.props.onError?.(event);
          setImageFailed(true);
        },
      });
    }
    return <>{item.icon}</>;
  }
  if (!item.path) {
    if (item.id === "figma") return <FigmaIcon />;
    if (item.id === "clickup") return <ClickUpIcon prefix={prefix} />;
    if (item.id === "airtable") return <AirtableIcon />;
    return fallback;
  }
  return (
    <svg viewBox="0 0 24 24" fill={item.color ?? "#fff"} aria-hidden="true">
      <path d={item.path} />
    </svg>
  );
}
function useIntegrationPicker(
  integrations: Integration[],
  { defaultSelected, onToggle, onBack, onClose }: IntegrationPickerProps,
  prefix: string,
) {
  const id = `${prefix}${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(defaultSelected ?? integrations[0]?.id);
  const [connected, setConnected] = useState(
    () => new Set(integrations.filter((item) => item.connected).map((item) => item.id)),
  );
  // Keep list groups stable while toggling; regroup when the search query changes.
  const [groupedConnections, setGroupedConnections] = useState(connected);
  const [selectionBounds, setSelectionBounds] = useState<{
    y: number;
    height: number;
  } | null>(null);
  const [swapped, setSwapped] = useState(false);
  const initialSelectionRef = useRef<string | undefined>(undefined);
  const normalizedQuery = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      integrations.filter(
        (item) =>
          !normalizedQuery ||
          `${item.name} ${item.domain} ${item.category}`
            .toLowerCase()
            .includes(normalizedQuery),
      ),
    [integrations, normalizedQuery],
  );
  const groups = [
    {
      label: "Connected",
      items: matches.filter((item) => groupedConnections.has(item.id)),
    },
    {
      label: "Available",
      items: matches.filter((item) => !groupedConnections.has(item.id)),
    },
  ].filter((group) => group.items.length);
  const orderedItems = groups.flatMap((group) => group.items);
  const selectedItem =
    orderedItems.find((item) => item.id === selectedId) ?? orderedItems[0];
  const isConnected = selectedItem ? connected.has(selectedItem.id) : false;
  useLayoutEffect(() => {
    if (initialSelectionRef.current === undefined)
      initialSelectionRef.current = selectedItem?.id;
    else if (selectedItem?.id !== initialSelectionRef.current) setSwapped(true);
  }, [selectedItem?.id]);
  useEffect(() => {
    setGroupedConnections(new Set(connected));
  }, [normalizedQuery]);
  const scrollSelectionRef = useRef(false);
  useLayoutEffect(() => {
    const list = listRef.current;
    const option = list?.querySelector<HTMLButtonElement>(
      `[data-id="${selectedItem?.id}"]`,
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
  }, [selectedItem?.id, orderedItems.length, groups.length, prefix]);
  useEffect(() => {
    function focusSearch(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "/") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      root.toggleAttribute("data-paused", !entry.isIntersecting),
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  const selectItem = useCallback((nextId: string | undefined) => {
    setSelectedId(nextId);
    searchRef.current?.focus({ preventScroll: true });
  }, []);
  function toggleItem(item: Integration) {
    const nextConnected = !connected.has(item.id);
    setConnected((previous) => {
      const next = new Set(previous);
      if (nextConnected) next.add(item.id);
      else next.delete(item.id);
      return next;
    });
    if (item.id !== undefined) onToggle?.(item.id, nextConnected);
  }
  function moveSelection(direction: number) {
    if (!orderedItems.length || !selectedItem) return;
    scrollSelectionRef.current = true;
    const index = orderedItems.findIndex((item) => item.id === selectedItem.id);
    setSelectedId(
      orderedItems[(index + direction + orderedItems.length) % orderedItems.length].id,
    );
  }
  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveSelection(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && selectedItem) {
      event.preventDefault();
      toggleItem(selectedItem);
    } else if (event.key === "Escape") {
      if (query) setQuery("");
      else onClose?.();
    } else if (event.key === "ArrowLeft" && !query && onBack) {
      event.preventDefault();
      onBack();
    }
  }
  return {
    id,
    rootRef,
    searchRef,
    listRef,
    query,
    setQuery,
    connected,
    selectionBounds,
    swapped,
    groups,
    selectedItem,
    isConnected,
    selectItem,
    toggleItem,
    handleSearchKeyDown,
  };
}
function IntegrationPickerView({
  clean = false,
  ...props
}: IntegrationPickerProps & {
  clean?: boolean;
}) {
  const {
    integrations = defaultIntegrations,
    appName = "rea/ui",
    appIcon,
    onExplore,
    onBack,
    className,
  } = props;
  const prefix = clean ? "ui-ipc" : "ui-ip";
  const {
    id,
    rootRef,
    searchRef,
    listRef,
    query,
    setQuery,
    connected,
    selectionBounds,
    swapped,
    groups,
    selectedItem,
    isConnected,
    selectItem,
    toggleItem,
    handleSearchKeyDown,
  } = useIntegrationPicker(integrations, props, prefix);
  const searchInput = (
    <input
      ref={searchRef}
      value={query}
      placeholder="Search integrations"
      aria-label="Search integrations"
      aria-controls={`${id}-list`}
      aria-activedescendant={selectedItem ? `${id}-${selectedItem.id}` : undefined}
      role="combobox"
      aria-expanded="true"
      onChange={(event) => setQuery(event.target.value)}
      onKeyDown={handleSearchKeyDown}
    />
  );
  const count = (
    <>
      {numberFormat.format(connected.size)}
      {" of "}
      {numberFormat.format(integrations.length)}
      {" connected"}
    </>
  );
  return (
    <div
      ref={rootRef}
      className={[prefix, className].filter(Boolean).join(" ")}
      data-on={isConnected || undefined}
      data-swapped={swapped || undefined}
    >
      {!clean && (
        <header className={`${prefix}__head`}>
          {onBack && (
            <button
              type="button"
              className={`${prefix}__back`}
              aria-label="Back"
              onClick={onBack}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          )}
          <span className={`${prefix}__crumb`}>Integrations</span>
          <span className={`${prefix}__count`}>{count}</span>
        </header>
      )}
      <div className={`${prefix}__card`}>
        {clean ? (
          <div className={`${prefix}__top`}>
            {onBack ? (
              <button
                type="button"
                className={`${prefix}__back`}
                aria-label="Back"
                onClick={onBack}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3.5 5.5 8l4.5 4.5" />
                </svg>
              </button>
            ) : (
              <svg viewBox="0 0 16 16" className={`${prefix}__lens`} aria-hidden="true">
                <circle cx="7.25" cy="7.25" r="4.75" />
                <path d="m13.5 13.5-2.9-2.9" />
              </svg>
            )}
            <label className={`${prefix}__search`}>
              <span className={`${prefix}__crumb`}>Integrations</span>
              {searchInput}
              <kbd className={`${prefix}__kbd`}>⌘/</kbd>
            </label>
          </div>
        ) : (
          <label className={`${prefix}__search`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            {searchInput}
            <kbd>⌘/</kbd>
          </label>
        )}
        <div className={`${prefix}__body`}>
          <div
            ref={listRef}
            id={`${id}-list`}
            className={`${prefix}__list`}
            role="listbox"
            aria-label="Integrations"
          >
            {selectionBounds && (
              <span
                className={`${prefix}__pill`}
                style={{
                  transform: `translateY(${selectionBounds.y}px)`,
                  height: selectionBounds.height,
                }}
                aria-hidden="true"
              />
            )}
            {groups.map((group) => (
              <div
                role="group"
                aria-label={group.label}
                className={`${prefix}__group`}
                key={group.label}
              >
                <span className={`${prefix}__label`}>{group.label}</span>
                {group.items.map((item) => (
                  <IntegrationOption_IntegrationOption
                    item={item}
                    picked={item.id === selectedItem?.id}
                    optionId={`${id}-${item.id}`}
                    onPick={selectItem}
                    prefix={prefix}
                    clean={clean}
                    key={item.id}
                  />
                ))}
              </div>
            ))}
            {!groups.length && (
              <p className={`${prefix}__empty`}>
                {"No integrations match "}
                <b>
                  {"“"}
                  {query}
                  {"”"}
                </b>
              </p>
            )}
          </div>
          <section className={`${prefix}__detail`} aria-live="polite">
            {selectedItem ? (
              <>
                <div className={`${prefix}__art`} aria-hidden="true">
                  <span className={`${prefix}__rings`}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={`${prefix}__tile ${prefix}__tile--app`}>
                    {appIcon ?? (
                      <svg
                        viewBox="0 0 107 107"
                        className={`${prefix}__mark`}
                        fill="currentColor"
                      >
                        <path d={appMarkPath} />
                      </svg>
                    )}
                  </span>
                  <span className={`${prefix}__link`}>
                    <svg viewBox={clean ? "0 0 16 16" : "0 0 24 24"}>
                      <path
                        d={
                          clean
                            ? "M2.5 6h10.5M10.5 3.5 13 6l-2.5 2.5M13.5 10H3M5.5 7.5 3 10l2.5 2.5"
                            : "M4 9h15m-4-4 4 4-4 4M20 15H5m4 4-4-4 4-4"
                        }
                      />
                    </svg>
                  </span>
                  <span
                    className={`${prefix}__tile ${prefix}__tile--brand`}
                    {...logoAttributes(selectedItem, clean)}
                    key={selectedItem.id}
                  >
                    <IntegrationLogo item={selectedItem} prefix={prefix} />
                  </span>
                </div>
                <div className={`${prefix}__info`} key={`info-${selectedItem.id}`}>
                  <div className={`${prefix}__title`}>
                    <div>
                      <h3 dir="auto" title={`${appName} + ${selectedItem.name}`}>
                        {appName}
                        {" + "}
                        {selectedItem.name}
                      </h3>
                      <span className={`${prefix}__domain`}>
                        {clean ? (
                          <>
                            <span className={`${prefix}__host`}>
                              {selectedItem.domain}
                            </span>
                            {isConnected && (
                              <span className={`${prefix}__state`}>Connected</span>
                            )}
                          </>
                        ) : (
                          selectedItem.domain
                        )}
                      </span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isConnected}
                      aria-label={`${isConnected ? "Disconnect" : "Connect"} ${selectedItem.name}`}
                      className={`${prefix}__switch`}
                      onClick={() => toggleItem(selectedItem)}
                    />
                  </div>
                  <p
                    className={`${prefix}__desc`}
                    dir="auto"
                    title={selectedItem.description}
                  >
                    {selectedItem.description}
                  </p>
                  {selectedItem.features?.length ? (
                    <ul className={`${prefix}__features`}>
                      {selectedItem.features.slice(0, 3).map((feature, index) => (
                        <li dir="auto" key={index}>
                          <svg
                            viewBox={clean ? "0 0 16 16" : "0 0 24 24"}
                            aria-hidden="true"
                          >
                            <path
                              d={clean ? "m3.5 8.5 3 3 6-7" : "m5 12.5 4.5 4.5L19 7.5"}
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <button
                    type="button"
                    className={`${prefix}__explore`}
                    onClick={() => {
                      if (selectedItem.id !== undefined) onExplore?.(selectedItem.id);
                    }}
                  >
                    Explore integration
                    <svg viewBox={clean ? "0 0 16 16" : "0 0 24 24"} aria-hidden="true">
                      <path d={clean ? "M6.5 4 10.5 8l-4 4" : "M9 6l6 6-6 6"} />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <p className={`${prefix}__empty ${prefix}__empty--detail`}>
                Pick an integration to see what it does
              </p>
            )}
          </section>
        </div>
        {clean && (
          <footer className={`${prefix}__foot`}>
            <span className={`${prefix}__count`}>
              <i aria-hidden="true" />
              {count}
            </span>
            <span className={`${prefix}__hints`} aria-hidden="true">
              <kbd>↑</kbd>
              <kbd>↓</kbd>
              <span>to move</span>
              <kbd>↵</kbd>
              <span>to switch</span>
            </span>
          </footer>
        )}
      </div>
    </div>
  );
}
const defaultIntegrations: Integration[] = [
  {
    id: `linear`,
    name: `Linear`,
    domain: `linear.app`,
    category: `Project management`,
    description: `Turn requests from chat into issues and keep their status in sync both ways.`,
    features: [
      `Create issues from any message`,
      `Two-way status sync`,
      `Link issues to customers`,
    ],
    path: `M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z`,
    color: `#ffffff`,
    tile: `#5E6AD2`,
    connected: true,
  },
  {
    id: `figma`,
    tile: `#ffffff`,
    name: `Figma`,
    domain: `figma.com`,
    category: `Design`,
    description: `Preview frames where you talk about them and link designs to their tasks.`,
    features: [
      `Live frame previews`,
      `Comment threads in one place`,
      `Link frames to tasks`,
    ],
    connected: false,
  },
  {
    id: `notion`,
    name: `Notion`,
    domain: `notion.so`,
    category: `Docs & wiki`,
    description: `Search your workspace while you write and save answers as pages.`,
    features: [
      `Search pages and databases`,
      `Save answers as pages`,
      `Keep docs in sync`,
    ],
    path: `M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z`,
    color: `currentColor`,
    tile: `#ffffff`,
    connected: true,
  },
  {
    id: `stripe`,
    name: `Stripe`,
    domain: `stripe.com`,
    category: `Payments`,
    description: `See customers, invoices and subscriptions next to every conversation.`,
    features: [
      `Customer and invoice lookup`,
      `Subscription changes as events`,
      `Revenue per account`,
    ],
    path: `M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z`,
    color: `#ffffff`,
    tile: `#635BFF`,
    connected: true,
  },
  {
    id: `hubspot`,
    name: `HubSpot`,
    domain: `hubspot.com`,
    category: `CRM`,
    description: `Keep contacts and deals current – notes and calls are logged for you.`,
    features: [
      `Sync contacts and companies`,
      `Log activity on deals`,
      `Trigger workflows`,
    ],
    path: `M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`,
    color: `#ffffff`,
    tile: `#FF7A59`,
    connected: false,
  },
  {
    id: `shopify`,
    name: `Shopify`,
    domain: `shopify.com`,
    category: `Commerce`,
    description: `Answer customer questions with the real order, product and stock in view.`,
    features: [`Order and refund lookup`, `Low-stock alerts`, `Product catalog search`],
    path: `M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z`,
    color: `#ffffff`,
    tile: `#95BF47`,
    connected: false,
  },
  {
    id: `airtable`,
    name: `Airtable`,
    domain: `airtable.com`,
    category: `Databases`,
    description: `Read and update any base – rows and fields stay linked to your projects.`,
    features: [
      `Read and write records`,
      `Watch views for changes`,
      `Map fields to properties`,
    ],
    tile: `#ffffff`,
    connected: false,
  },
  {
    id: `webflow`,
    name: `Webflow`,
    domain: `webflow.com`,
    category: `Website`,
    description: `Publish CMS items and collect form submissions right from your workspace.`,
    features: [`Publish CMS items`, `Collect form submissions`, `Schedule site updates`],
    path: `m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z`,
    color: `#ffffff`,
    tile: `#146EF5`,
    connected: false,
  },
  {
    id: `vercel`,
    name: `Vercel`,
    domain: `vercel.com`,
    category: `Developer tools`,
    description: `Follow deployments, previews and failed builds without switching tabs.`,
    features: [`Deployment status`, `Preview links in threads`, `Build failure alerts`],
    path: `m12 1.608 12 20.784H0Z`,
    color: `currentColor`,
    tile: `#000000`,
    connected: false,
  },
  {
    id: `clickup`,
    tile: `#ffffff`,
    name: `ClickUp`,
    domain: `clickup.com`,
    category: `Project management`,
    description: `Create tasks, assign owners and track due dates across your spaces.`,
    features: [`Create and assign tasks`, `Due date reminders`, `Sync across spaces`],
    connected: false,
  },
];
const appMarkPath = `M106.447 67.3367C106.447 69.7104 104.523 71.6348 102.149 71.6348H75.928C73.5542 71.6348 71.6299 73.5591 71.6299 75.9329V102.16C71.6299 104.534 69.7056 106.458 67.3318 106.458H35.8198C35.8185 106.458 35.8174 106.459 35.8174 106.46C35.8174 106.462 35.8163 106.463 35.8149 106.463H4.29811C1.92433 106.463 0 104.539 0 102.165V39.1262C0 36.7525 1.92433 34.8281 4.29811 34.8281H30.5193C32.8931 34.8281 34.8174 32.9038 34.8174 30.53V4.29812C34.8174 1.92433 36.7417 0 39.1155 0H102.149C104.523 0 106.447 1.92433 106.447 4.29811V67.3367ZM35.8174 66.3425C35.8174 68.7163 37.7417 70.6406 40.1155 70.6406H66.3318C68.7056 70.6406 70.6299 68.7163 70.6299 66.3425V40.1155C70.6299 37.7417 68.7056 35.8174 66.3318 35.8174H40.1155C37.7417 35.8174 35.8174 37.7417 35.8174 40.1155V66.3425Z`;
const FigmaIcon = () => (
  <svg viewBox={`0 0 38 57`} aria-hidden={`true`}>
    <path d={`M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z`} fill={`#1ABCFE`} />
    <path
      d={`M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z`}
      fill={`#0ACF83`}
    />
    <path d={`M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z`} fill={`#FF7262`} />
    <path
      d={`M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z`}
      fill={`#F24E1E`}
    />
    <path
      d={`M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z`}
      fill={`#A259FF`}
    />
  </svg>
);
const AirtableIcon = () => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <path
      fill={`#FCB400`}
      d={`M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.266 3.266 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.255 3.255 0 0 0-1.272-.257z`}
    />
    <path
      fill={`#18BFFF`}
      d={`M23.4 8.056a.589.589 0 0 0-.222.045l-10.012 3.877a.612.612 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.583.583 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596z`}
    />
    <path
      fill={`#F82B60`}
      d={`M.676 8.095a.644.644 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006.307-.147 2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.57.57 0 0 0-.207-.044z`}
    />
  </svg>
);
const IntegrationOption_IntegrationOption = memo(function IntegrationOption({
  item,
  picked,
  optionId,
  onPick,
  prefix,
  clean,
}: IntegrationOptionProps) {
  return (
    <button
      id={optionId}
      data-id={item.id}
      type="button"
      role="option"
      aria-selected={picked}
      className={`${prefix}__item`}
      tabIndex={-1}
      onClick={() => onPick(item.id)}
    >
      <span className={`${prefix}__logo`} {...logoAttributes(item, clean)}>
        <IntegrationLogo item={item} prefix={prefix} />
      </span>
      <span className={`${prefix}__name`}>
        <b dir="auto" title={item.name}>
          {item.name}
        </b>
        {item.category && (
          <small dir="auto" title={item.category}>
            {item.category}
          </small>
        )}
      </span>
    </button>
  );
});
const numberFormat = new Intl.NumberFormat("en");
export { IntegrationPicker };
export type { IntegrationPickerProps };
export type { Integration };
