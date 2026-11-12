"use client";

import "./TagInput.css";
import {
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from "react";
/*
 * Tag Input – component logic and public types.
 * Several values in one field, as chips: Enter, comma or Tab adds what you typed, a pasted list becomes many chips at
 * once, a value that doesn't pass the check stays in the field with a message, and a duplicate flashes the chip it
 * repeats. Backspace on an empty field takes the last chip back into the text; ← and → walk the chips.
 * The field has the Text Field's look. Styles are provided by the sibling CSS import.
 */
export type TagInputProps = {
  /** The chips – makes it controlled */
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  /** Shown above the field and tied to it */
  label?: ReactNode;
  /** A quiet line under the field – a message takes its place while there is one */
  hint?: ReactNode;
  /** Marks the field invalid and shows this under it */
  error?: ReactNode;
  /** "Optional" next to the label */
  optional?: boolean;
  placeholder?: string;
  /** Checks a value before it becomes a chip: true to accept, or a message that says what's wrong */
  validate?: (tag: string) => true | string;
  /** Cleans a value before it's checked, e.g. trims and lowercases an email (default: trim) */
  normalize?: (tag: string) => string;
  /** Also split on spaces – right for emails and single words, wrong for names with spaces */
  splitOnSpace?: boolean;
  /** At most this many chips */
  max?: number;
  /** A small circle with the first letter on every chip, e.g. for people */
  avatar?: boolean;
  disabled?: boolean;
  /** Sends the chips with a form, as one hidden input per chip */
  name?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
  ref?: Ref<HTMLInputElement>;
};
export function TagInput({
  value,
  defaultValue = [],
  onChange,
  label,
  hint,
  error,
  optional = false,
  placeholder = "Add…",
  validate,
  normalize = (t) => t.trim(),
  splitOnSpace = false,
  max,
  avatar = false,
  disabled = false,
  name,
  id,
  className,
  "aria-label": ariaLabel,
  ref,
}: TagInputProps) {
  const autoId = useId();
  const inputId = id ?? `${autoId}-input`;
  const labelId = `${autoId}-label`;
  const messageId = `${autoId}-message`;
  const liveId = `${autoId}-live`;
  const [own, setOwn] = useState<string[]>(defaultValue);
  const tags = value ?? own;
  const [draft, setDraft] = useState("");
  const [problem, setProblem] = useState("");
  const [armed, setArmed] = useState(false);
  const [flash, setFlash] = useState<{
    tag: string;
    n: number;
  } | null>(null);
  const [said, setSaid] = useState("");
  const input = useRef<HTMLInputElement | null>(null);
  const box = useRef<HTMLDivElement | null>(null);
  const full = max != null && tags.length >= max;
  const shownError =
    error != null && typeof error !== "boolean" && error !== "" ? error : problem || null;
  const invalid = Boolean(error) || Boolean(problem);
  const message =
    shownError ??
    (hint != null && typeof hint !== "boolean" && hint !== "" ? hint : null);
  const split = splitOnSpace ? /[\s,;]+/ : /[,;\n]+/;
  const set = (next: string[]) => {
    if (value === undefined) setOwn(next);
    onChange?.(next);
  };
  // Adds every good value in the text; whatever doesn't pass stays in the field with a message, ahead of `rest`
  const commit = (text: string, rest = "") => {
    const parts = text.split(split).map(normalize).filter(Boolean);
    if (!parts.length) {
      setDraft(rest);
      return;
    }
    const added: string[] = [];
    const left: string[] = [];
    let why = "";
    for (const p of parts) {
      const check = validate ? validate(p) : true;
      if (check !== true) {
        left.push(p);
        why ||= check;
      } else if (tags.includes(p) || added.includes(p)) {
        setFlash({ tag: p, n: Date.now() });
      } else if (max != null && tags.length + added.length >= max) {
        left.push(p);
        why ||= `Up to ${max} at a time.`;
      } else added.push(p);
    }
    if (added.length) {
      set([...tags, ...added]);
      setSaid(added.length === 1 ? `${added[0]} added` : `${added.length} added`);
    }
    setDraft(
      [left.join(splitOnSpace ? " " : ", "), rest]
        .filter(Boolean)
        .join(splitOnSpace ? " " : ", "),
    );
    setProblem(why);
  };
  const remove = (tag: string, focusInput = true) => {
    set(tags.filter((t) => t !== tag));
    setSaid(`${tag} removed`);
    if (focusInput) input.current?.focus();
  };
  const chips = () => [
    ...(box.current?.querySelectorAll<HTMLElement>(".ui-tag__chip") ?? []),
  ];
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    const sep = e.key === "," || e.key === ";" || (splitOnSpace && e.key === " ");
    if ((e.key === "Enter" || e.key === "Tab" || sep) && draft.trim()) {
      e.preventDefault();
      commit(draft);
      return;
    }
    if (sep) {
      e.preventDefault();
      return;
    }
    if (e.key === "Backspace" && !draft && tags.length) {
      // First press marks the last chip, the second takes it out
      e.preventDefault();
      if (armed) {
        remove(tags[tags.length - 1]);
        setArmed(false);
      } else setArmed(true);
      return;
    }
    if (e.key === "ArrowLeft" && e.currentTarget.selectionStart === 0 && tags.length) {
      e.preventDefault();
      chips().at(-1)?.focus();
      return;
    }
    if (e.key === "Escape" && draft) {
      e.preventDefault();
      setDraft("");
      setProblem("");
    }
    setArmed(false);
  };
  const onChipKey = (e: KeyboardEvent<HTMLElement>, i: number) => {
    const list = chips();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      list[Math.max(0, i - 1)]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (i + 1 < list.length) list[i + 1].focus();
      else input.current?.focus();
    } else if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const next = list[i + 1] ?? null;
      remove(tags[i], false);
      // Focus moves on to the next chip, or back to the field
      window.setTimeout(() =>
        next && next.isConnected ? next.focus() : input.current?.focus(),
      );
    }
  };
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    if (!split.test(text.trim())) return;
    e.preventDefault();
    commit(draft + (draft ? (splitOnSpace ? " " : ",") : "") + text);
  };
  return (
    <div
      className={["ui-tag", className].filter(Boolean).join(" ")}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
    >
      {/* React 19 hoists this into <head> once, no matter how many fields render */}

      {label != null && (
        <div className="ui-tag__head">
          <label className="ui-tag__label" id={labelId} htmlFor={inputId}>
            {label}
          </label>
          {optional && <span className="ui-tag__optional">Optional</span>}
        </div>
      )}
      {/* A click on the box's empty space puts the caret in the field */}
      <div
        ref={box}
        className="ui-tag__box"
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            e.preventDefault();
            input.current?.focus();
          }
        }}
      >
        {tags.map((t, i) => (
          <span
            key={t}
            className="ui-tag__chip"
            tabIndex={-1}
            title={t}
            data-armed={(armed && i === tags.length - 1) || undefined}
            data-flash={flash?.tag === t ? flash.n : undefined}
            onKeyDown={(e) => onChipKey(e, i)}
            onAnimationEnd={(e) => e.animationName === "ui-tag-flash" && setFlash(null)}
          >
            {avatar && (
              <span className="ui-tag__avatar" aria-hidden="true">
                {(Array.from(t)[0] ?? "").toUpperCase()}
              </span>
            )}
            <span className="ui-tag__text">{t}</span>
            {!disabled && (
              <button
                type="button"
                className="ui-tag__remove"
                tabIndex={-1}
                aria-label={`Remove ${t}`}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => remove(t)}
              >
                <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" />
                </svg>
              </button>
            )}
          </span>
        ))}
        <input
          ref={(el) => {
            input.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          id={inputId}
          className="ui-tag__input"
          value={draft}
          placeholder={full ? "" : tags.length ? "Add more…" : placeholder}
          disabled={disabled || full}
          dir="auto"
          autoComplete="off"
          spellCheck={false}
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
          aria-describedby={[message ? messageId : null, liveId]
            .filter(Boolean)
            .join(" ")}
          onChange={(e) => {
            const v = e.target.value;
            setArmed(false);
            if (problem) setProblem("");
            // A separator typed anywhere – also by phone keyboards that don't report the key – turns what's before it into chips
            const parts = v.split(split);
            if (parts.length > 1)
              commit(parts.slice(0, -1).join(","), parts[parts.length - 1]);
            else setDraft(v);
          }}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onBlur={() => {
            setArmed(false);
            if (draft.trim()) commit(draft);
          }}
        />
      </div>
      {name && tags.map((t) => <input key={t} type="hidden" name={name} value={t} />)}
      {(message || max != null) && (
        <div className="ui-tag__foot">
          {message && (
            <p
              className="ui-tag__message"
              id={messageId}
              key={shownError ? "error" : "hint"}
              aria-live={shownError ? "polite" : undefined}
            >
              {message}
            </p>
          )}
          {max != null && (
            <span className="ui-tag__count" data-full={full || undefined}>
              {tags.length}/{max}
            </span>
          )}
        </div>
      )}
      <span className="ui-tag__sr" id={liveId} role="status">
        {said}
      </span>
    </div>
  );
}
