"use client";

import "./IntegrationSettings.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
  useMemo,
} from "react";
interface IntegrationValues {
  id?: string;
  name?: string;
  label?: string;
  enabled?: boolean;
  siteUrl?: string;
  timeZone?: string;
  apiKey?: string | null;
  [field: string]: unknown;
}
interface IntegrationSettingsProps {
  name?: string;
  logo?: ReactNode;
  count?: number;
  meta?: string;
  defaultValues?: Partial<IntegrationValues>;
  siteHint?: string;
  timeZones?: string[];
  onGenerateKey?: () => string | Promise<string>;
  onSave?: (values: IntegrationValues) => void | Promise<void>;
  onToggle?: (enabled: boolean) => void;
  className?: string;
}
interface SettingsDraft extends IntegrationValues {
  enabled: boolean;
  siteUrl: string;
  apiKey: string | null;
}
interface TimeZonePickerProps {
  zones: string[];
  value?: string;
  onChange: (zone: string) => void;
  labelledBy: string;
  prefix: string;
  clockIcon: ReactNode;
  checkIcon: ReactNode;
}
function IntegrationSettings({
  name,
  logo,
  count,
  meta,
  defaultValues,
  siteHint = "Your store's primary domain, without https://",
  timeZones = DEFAULT_TIME_ZONES,
  onGenerateKey,
  onSave,
  onToggle,
  className,
}: IntegrationSettingsProps) {
  const {
    draft,
    savedValues,
    setDraft,
    updateDraft,
    toggleEnabled,
    keyStatus,
    keyVisible,
    setKeyVisible,
    copied,
    saving,
    logoFailed,
    setLogoFailed,
    fieldId,
    hintId,
    domain,
    domainValid,
    dirty,
    generateKey,
    copyKey,
    save,
    maskedKey,
  } = useIntegrationSettings({
    defaultValues,
    timeZones,
    onGenerateKey,
    onSave,
    onToggle,
  });
  return (
    <>
      <section
        className={[`ui-is`, className].filter(Boolean).join(` `)}
        aria-label={`${name} settings`}
        data-off={!draft.enabled || undefined}
      >
        <header className="ui-is__head">
          <span className="ui-is__logo" onErrorCapture={() => setLogoFailed(true)}>
            {logo == null || logo === false || logoFailed ? (
              <span className="ui-is__initial">{integrationInitial(name)}</span>
            ) : (
              logo
            )}
          </span>
          <span className="ui-is__who">
            <span className="ui-is__name">
              <span className="ui-is__name-text" dir="auto">
                {name}
              </span>
              {count !== undefined && Number.isFinite(count) && (
                <span className="ui-is__count">{count.toLocaleString(`en-US`)}</span>
              )}
            </span>
            <span
              className="ui-is__meta"
              dir="auto"
              title={draft.enabled ? meta : undefined}
            >
              {draft.enabled ? meta : `Paused – no data is synced`}
            </span>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={draft.enabled}
            aria-label={`${name} sync`}
            className="ui-is__switch"
            onClick={toggleEnabled}
          >
            <span />
          </button>
        </header>
        <div
          className="ui-is__fold"
          data-open={draft.enabled || undefined}
          inert={!draft.enabled}
        >
          <div className="ui-is__fold-inner">
            <div className="ui-is__card">
              <div className="ui-is__section">
                {draft.apiKey ? (
                  <div className="ui-is__key" data-new={keyVisible || undefined}>
                    <code>{keyVisible ? draft.apiKey : maskedKey}</code>
                    <button
                      type="button"
                      className="ui-is__mini"
                      aria-label={keyVisible ? `Hide key` : `Show key`}
                      onClick={() => setKeyVisible((value) => !value)}
                    >
                      <StrokeIcon
                        d={
                          keyVisible
                            ? `M2 8s2.2-4.5 6-4.5S14 8 14 8s-2.2 4.5-6 4.5S2 8 2 8ZM2.5 2.5l11 11`
                            : `M2 8s2.2-4.5 6-4.5S14 8 14 8s-2.2 4.5-6 4.5S2 8 2 8ZM8 9.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z`
                        }
                        size={15}
                      />
                    </button>
                    <button
                      type="button"
                      className="ui-is__mini"
                      aria-label="Copy key"
                      onClick={copyKey}
                    >
                      <StrokeIcon
                        d={
                          copied
                            ? `m3.5 8.5 3 3 6-7`
                            : `M5.5 5.5V3.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M3.5 5.5h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z`
                        }
                        size={15}
                      />
                    </button>
                    <button
                      type="button"
                      className="ui-is__regen"
                      onClick={generateKey}
                      disabled={keyStatus === `busy`}
                    >
                      {keyStatus === `busy` ? (
                        <span className="ui-is__spinner" aria-hidden="true" />
                      ) : (
                        `Regenerate`
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="ui-is__generate"
                    onClick={generateKey}
                    disabled={keyStatus === `busy`}
                  >
                    <span>
                      {keyStatus === `busy` ? `Generating…` : `Generate a new API key`}
                    </span>
                    {keyStatus === `busy` ? (
                      <span className="ui-is__spinner" aria-hidden="true" />
                    ) : (
                      <KeyIcon />
                    )}
                  </button>
                )}
                {draft.apiKey && keyVisible && (
                  <p className="ui-is__note" role="status">
                    {copied
                      ? `Copied to the clipboard.`
                      : `Copy it now – it is shown in full only once.`}
                  </p>
                )}
              </div>
              <div className="ui-is__section">
                <label className="ui-is__label" htmlFor={fieldId}>{`Site address`}</label>
                <div className="ui-is__field" data-invalid={!domainValid || undefined}>
                  <span className="ui-is__prefix">{`https://`}</span>
                  <input
                    id={fieldId}
                    value={draft.siteUrl}
                    onChange={(value) =>
                      updateDraft({
                        siteUrl: value.target.value.replace(/^https:\/\//i, ``),
                      })
                    }
                    placeholder="yourstore.com"
                    inputMode="url"
                    autoComplete="off"
                    spellCheck={false}
                    aria-invalid={!domainValid}
                    aria-describedby={hintId}
                  />
                  {domain && domainValid && (
                    <span className="ui-is__ok" aria-hidden="true">
                      <StrokeIcon d="m3.5 8.5 3 3 6-7" size={14} />
                    </span>
                  )}
                </div>
                <p
                  className="ui-is__hint"
                  dir="auto"
                  id={hintId}
                  data-error={!domainValid || undefined}
                >
                  {domainValid
                    ? siteHint
                    : `That doesn't look like a domain – try something like yourstore.com`}
                </p>
              </div>
              <div className="ui-is__section">
                <span className="ui-is__label" id={`${fieldId}-tz`}>{`Time zone`}</span>
                <TimeZonePicker
                  prefix="ui-is"
                  clockIcon={<TimeZoneIcon />}
                  checkIcon={<StrokeIcon d="m3.5 8.5 3 3 6-7" size={14} />}
                  zones={timeZones}
                  value={draft.timeZone}
                  onChange={(value) =>
                    updateDraft({
                      timeZone: value,
                    })
                  }
                  labelledBy={`${fieldId}-tz`}
                />
              </div>
            </div>
            <div className="ui-is__save" data-open={dirty || undefined} inert={!dirty}>
              <div className="ui-is__save-inner">
                <span>{`Unsaved changes`}</span>
                <div className="ui-is__save-actions">
                  <button
                    type="button"
                    className="ui-is__btn"
                    onClick={() => setDraft(savedValues)}
                  >{`Discard`}</button>
                  <button
                    type="button"
                    className="ui-is__btn ui-is__btn--primary"
                    onClick={save}
                    disabled={!domainValid || saving}
                  >
                    {saving ? `Saving…` : `Save`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function integrationInitial(name = "") {
  return name.match(/[\p{L}\p{N}]/u)?.[0]?.toUpperCase() ?? "";
}
function normalizeDomain(value: string) {
  return value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}
function useIntegrationSettings({
  defaultValues,
  timeZones = DEFAULT_TIME_ZONES,
  onGenerateKey,
  onSave,
  onToggle,
}: IntegrationSettingsProps) {
  const initialValues: SettingsDraft = {
    ...defaultValues,
    enabled: defaultValues?.enabled ?? true,
    siteUrl: defaultValues?.siteUrl ?? "",
    timeZone: defaultValues?.timeZone ?? timeZones[0],
    apiKey: defaultValues?.apiKey ?? null,
  };
  const [savedValues, setSavedValues] = useState(initialValues);
  const [draft, setDraft] = useState(initialValues);
  const [keyStatus, setKeyStatus] = useState<"idle" | "busy">("idle");
  const [keyVisible, setKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const fieldId = useId();
  const hintId = useId();
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const domain = normalizeDomain(draft.siteUrl);
  const domainValid = domain === "" || DOMAIN_PATTERN.test(domain);
  const dirty =
    draft.siteUrl !== savedValues.siteUrl ||
    draft.timeZone !== savedValues.timeZone ||
    draft.apiKey !== savedValues.apiKey;
  function updateDraft(values: Partial<SettingsDraft>) {
    setDraft((current) => ({ ...current, ...values }));
  }
  function toggleEnabled() {
    const enabled = !draft.enabled;
    updateDraft({ enabled });
    setSavedValues((current) => ({ ...current, enabled }));
    onToggle?.(enabled);
  }
  async function generateKey() {
    if (keyStatus === "busy") return;
    setKeyStatus("busy");
    try {
      const key = await (onGenerateKey
        ? onGenerateKey()
        : new Promise<string>((resolve) =>
            setTimeout(() => {
              const bytes = crypto.getRandomValues(new Uint8Array(16));
              resolve(
                `sk_live_${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`,
              );
            }, 700),
          ));
      updateDraft({ apiKey: key });
      setKeyVisible(true);
    } finally {
      setKeyStatus("idle");
    }
  }
  async function copyKey() {
    if (!draft.apiKey) return;
    try {
      await navigator.clipboard.writeText(draft.apiKey);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1400);
    } catch {
      /* Clipboard access may be unavailable; the visible key remains selectable. */
    }
  }
  async function save() {
    if (!domainValid || saving) return;
    setSaving(true);
    const values = { ...draft, siteUrl: domain };
    try {
      await onSave?.(values);
      setDraft(values);
      setSavedValues(values);
    } finally {
      setSaving(false);
    }
  }
  const maskedKey = draft.apiKey
    ? draft.apiKey.length < 16
      ? "•".repeat(14)
      : `${draft.apiKey.slice(0, 8)}${"•".repeat(14)}${draft.apiKey.slice(-4)}`
    : "";
  return {
    draft,
    savedValues,
    setDraft,
    updateDraft,
    toggleEnabled,
    keyStatus,
    keyVisible,
    setKeyVisible,
    copied,
    saving,
    logoFailed,
    setLogoFailed,
    fieldId,
    hintId,
    domain,
    domainValid,
    dirty,
    generateKey,
    copyKey,
    save,
    maskedKey,
  };
}
function TimeZonePicker({
  zones,
  value,
  onChange,
  labelledBy,
  prefix,
  clockIcon,
  checkIcon,
}: TimeZonePickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target))
        setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", closeOnOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeOnOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  const matchingZones = useMemo(
    () =>
      zones.filter((zone) => zone.toLowerCase().includes(search.trim().toLowerCase())),
    [zones, search],
  );
  return (
    <div className={`${prefix}__zone`} ref={rootRef}>
      <button
        type="button"
        className={`${prefix}__field ${prefix}__zone-btn`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelledBy}
        onClick={() => {
          setOpen((value) => !value);
          setSearch("");
        }}
      >
        <span className={`${prefix}__zone-value`} dir="auto" title={value}>
          {value}
        </span>
        {clockIcon}
      </button>
      {open && (
        <div className={`${prefix}__menu`}>
          <input
            className={`${prefix}__menu-search`}
            autoFocus
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search city or offset"
            aria-label="Search time zones"
          />
          <div
            className={`${prefix}__menu-list`}
            role="listbox"
            aria-labelledby={labelledBy}
          >
            {matchingZones.length === 0 && (
              <p className={`${prefix}__menu-empty`}>No time zone matches.</p>
            )}
            {matchingZones.map((zone, index) => (
              <button
                dir="auto"
                type="button"
                role="option"
                aria-selected={zone === value}
                className={`${prefix}__option`}
                onClick={() => {
                  onChange(zone);
                  setOpen(false);
                }}
                key={`${index}-${zone}`}
              >
                {zone}
                {zone === value && checkIcon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
const DEFAULT_TIME_ZONES = [
  "(GMT −08:00) Los Angeles",
  "(GMT −05:00) New York",
  "(GMT −03:00) São Paulo",
  "(GMT +00:00) London",
  "(GMT +01:00) Berlin",
  "(GMT +01:00) Amsterdam",
  "(GMT +01:00) Warsaw",
  "(GMT +02:00) Athens",
  "(GMT +04:00) Dubai",
  "(GMT +05:30) Mumbai",
  "(GMT +08:00) Singapore",
  "(GMT +09:00) Tokyo",
  "(GMT +10:00) Sydney",
];
const DOMAIN_PATTERN = /^(?!-)[\p{L}\p{N}-]+(\.[\p{L}\p{N}-]+)*\.\p{L}{2,}$/iu;
const KeyIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    width={`16`}
    height={`16`}
    fill={`currentColor`}
    aria-hidden={`true`}
  >
    <path
      d={`M10.5 1.5a4 4 0 0 0-3.86 5.05L1.8 11.4a1 1 0 0 0-.3.7v1.9a.5.5 0 0 0 .5.5h1.9a.5.5 0 0 0 .5-.5V13h1v-1h1v-1l.95-.95A4 4 0 1 0 10.5 1.5Zm1 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z`}
    />
  </svg>
);
const TimeZoneIcon = () => (
  <svg viewBox={`0 0 16 16`} width={`16`} height={`16`} aria-hidden={`true`}>
    <circle cx={`8`} cy={`8`} r={`6.5`} fill={`var(--ui-is-muted)`} />
    <path
      d={`M8 4.5V8h3`}
      fill={`none`}
      stroke={`var(--ui-is-field)`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
const StrokeIcon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg
    viewBox={`0 0 16 16`}
    width={size}
    height={size}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.4`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={d} />
  </svg>
);
export { IntegrationSettings };
export type { IntegrationValues };
export type { IntegrationSettingsProps };
