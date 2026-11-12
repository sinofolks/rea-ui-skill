"use client";

import "./TextReveal.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import {
  type ReactElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/*
 * Text Reveal – a text effect, in component logic and public types.
 * When the text scrolls into view it arrives piece by piece – word by word or letter by letter –
 * each piece fading in out of a soft blur while it rises a little, one after another.
 * Screen readers get the whole sentence at once; the moving pieces are hidden from them.
 * Font, size and color come from the parent.
 */
type TextRevealProps = {
  /** The text to reveal */
  text: string;
  /** Reveal word by word or letter by letter */
  by?: "word" | "char";
  /** Time between two pieces, in ms */
  stagger?: number;
  /** Wait before the first piece, in ms */
  delay?: number;
  /** Time each piece takes to arrive, in ms */
  duration?: number;
  /** Element to render */
  as?: "p" | "h1" | "h2" | "h3" | "span";
  /** Reveal only the first time; otherwise it plays again each time it enters the view */
  once?: boolean;
  className?: string;
};
/** Letters as people see them – a family emoji or a Thai syllable with its marks stays one piece */
const segmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;
const graphemes = (s: string) =>
  segmenter ? Array.from(segmenter.segment(s), (x) => x.segment) : Array.from(s);
function TextReveal({
  text,
  by = "word",
  stagger = 40,
  delay = 0,
  duration = 700,
  as: Tag = "p",
  once = true,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setShown(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      // From the first visible pixel – a long paragraph taller than the screen would never reach 30%
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  // Words and the whitespace between them; whitespace stays plain text so lines wrap normally
  let i = 0;
  const parts = text.split(/(\s+)/).map((part, k) => {
    if (part === "") return null;
    if (/^\s+$/.test(part)) return part;
    if (by === "word") {
      return (
        <span
          key={k}
          className="ui-trv__p"
          style={{ "--ui-trv-i": i++ } as CSSProperties}
        >
          {part}
        </span>
      );
    }
    // Letter by letter: the letters of a word sit in one unbreakable group
    return (
      <span key={k} className="ui-trv__w">
        {graphemes(part).map((ch, c) => (
          <span
            key={c}
            className="ui-trv__p"
            style={{ "--ui-trv-i": i++ } as CSSProperties}
          >
            {ch}
          </span>
        ))}
      </span>
    );
  });
  return (
    <Tag
      ref={ref as never}
      className={["ui-trv", className].filter(Boolean).join(" ")}
      data-shown={shown ? "" : undefined}
      style={
        {
          "--ui-trv-stagger": `${stagger}ms`,
          "--ui-trv-delay": `${delay}ms`,
          "--ui-trv-duration": `${duration}ms`,
        } as CSSProperties
      }
    >
      {/* React 19 hoists this into <head> once, no matter how many instances render */}

      <span className="ui-trv__sr">{text}</span>
      <span aria-hidden="true">{parts}</span>
    </Tag>
  );
}
/** Explicit migration boundary for values whose original types were erased.
 * Keep this alias private. Replace usages with concrete types as internals are refactored.
 * Public component contracts never expose this type. See docs/type-migration.md.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecoveredValue = any;
const t_react_BkAXpnfr: RecoveredValue = (): RecoveredValue => React;
const t_jsx_runtime_CTsRTJUX: RecoveredValue = (): RecoveredValue =>
  React_jsx_runtime_CTsRTJUX;
var n_demo_DU0pIcNJ: RecoveredValue = t_react_BkAXpnfr(),
  r: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_DU0pIcNJ: RecoveredValue =
    typeof Intl < `u` && `Segmenter` in Intl
      ? new Intl.Segmenter(void 0, {
          granularity: `grapheme`,
        })
      : null,
  a: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
    i_demo_DU0pIcNJ
      ? (Array.from(
          i_demo_DU0pIcNJ.segment(e),
          (e?: RecoveredValue): RecoveredValue => e.segment,
        ) as RecoveredValue[])
      : (Array.from(e) as RecoveredValue[]);
function ComponentO({
  text,
  by = `word`,
  stagger = 40,
  delay = 0,
  duration = 700,
  as: ComponentAs = `p`,
  once = !0,
  className,
}: RecoveredValue): RecoveredValue {
  let f: RecoveredValue = (0, n_demo_DU0pIcNJ.useRef)(null),
    [p, m]: RecoveredValue = (0, n_demo_DU0pIcNJ.useState)(!1);
  (0, n_demo_DU0pIcNJ.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = f.current;
    if (!e || typeof IntersectionObserver > `u`) return m(!0);
    let t: RecoveredValue = new IntersectionObserver(
      (e?: RecoveredValue): RecoveredValue => {
        for (let n of e)
          n.isIntersecting ? (m(!0), once && t.disconnect()) : once || m(!1);
      },
      {
        threshold: 0,
      },
    );
    return (t.observe(e), (): RecoveredValue => t.disconnect());
  }, [once]);
  let h: RecoveredValue = 0,
    g: RecoveredValue = text.split(/(\s+)/).map(
      (e?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
        e === `` ? null : /^\s+$/.test(e) ? (
          e
        ) : by === `word` ? (
          <span
            className={`ui-trv__p`}
            style={
              {
                "--ui-trv-i": h++,
              } as RecoveredValue
            }
            children={e}
            key={n}
          />
        ) : (
          <span
            className={`ui-trv__w`}
            children={a(e).map(
              (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue => (
                <span
                  className={`ui-trv__p`}
                  style={
                    {
                      "--ui-trv-i": h++,
                    } as RecoveredValue
                  }
                  children={e}
                  key={t}
                />
              ),
            )}
            key={n}
          />
        ),
    );
  return (
    <ComponentAs
      ref={f as RecoveredValue}
      className={[`ui-trv`, className].filter(Boolean).join(` `)}
      data-shown={p ? `` : void 0}
      style={
        {
          "--ui-trv-stagger": `${stagger}ms`,
          "--ui-trv-delay": `${delay}ms`,
          "--ui-trv-duration": `${duration}ms`,
        } as RecoveredValue
      }
    >
      <span className={`ui-trv__sr`}>{text}</span>
      <span aria-hidden={`true`}>{g}</span>
    </ComponentAs>
  );
}
function Runtime(): RecoveredValue {
  let [e, t]: RecoveredValue = (0, n_demo_DU0pIcNJ.useState)(0);
  return (
    <div className={`text-reveal-demo`}>
      <div className={`text-reveal-demo__copy`} key={e}>
        <ComponentO
          as={`h2`}
          className={`text-reveal-demo__title`}
          text={`Words that arrive one at a time.`}
        />
        <ComponentO
          className={`text-reveal-demo__body`}
          text={`Each word fades in out of a soft blur and rises into place, so a sentence reads like it is being spoken.`}
          delay={260}
          stagger={22}
        />
      </div>
      <button
        type={`button`}
        className={`text-reveal-demo__replay`}
        onClick={(): RecoveredValue => t((e?: RecoveredValue): RecoveredValue => e + 1)}
      >{`Replay`}</button>
    </div>
  );
}
function Preview(): ReactElement {
  return (
    <>
      <Runtime />
    </>
  );
}
export { Preview };
export default Preview;
export { TextReveal };
export type { TextRevealProps };
