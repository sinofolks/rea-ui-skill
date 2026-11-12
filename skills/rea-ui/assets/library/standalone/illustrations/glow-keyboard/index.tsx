"use client";

import "./GlowKeyboard.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import * as React from "react";
import type { ReactElement } from "react";
import * as React_jsx_runtime_CTsRTJUX from "react/jsx-runtime";
/** Explicit migration boundary for values whose original types were erased.
 * Keep this alias private. Replace usages with concrete types as internals are refactored.
 * Public component contracts never expose this type. See docs/type-migration.md.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecoveredValue = any;
const t_react_BkAXpnfr: RecoveredValue = (): RecoveredValue => React;
const t_jsx_runtime_CTsRTJUX: RecoveredValue = (): RecoveredValue =>
  React_jsx_runtime_CTsRTJUX;
var n_demo_HT_hqV3e: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_HT_hqV3e: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_HT_hqV3e: RecoveredValue = [
    [`Escape`, `esc`, 24, 24, 149, 56, `mod sm`],
    [`F1`, `F1`, 183, 24, 96, 56, `fkey`],
    [`F2`, `F2`, 289, 24, 96, 56, `fkey`],
    [`F3`, `F3`, 395, 24, 96, 56, `fkey`],
    [`F4`, `F4`, 501, 24, 96, 56, `fkey`],
    [`F5`, `F5`, 607, 24, 96, 56, `fkey`],
    [`F6`, `F6`, 713, 24, 96, 56, `fkey`],
    [`F7`, `F7`, 819, 24, 96, 56, `fkey`],
    [`F8`, `F8`, 925, 24, 96, 56, `fkey`],
    [`F9`, `F9`, 1031, 24, 96, 56, `fkey`],
    [`F10`, `F10`, 1137, 24, 96, 56, `fkey`],
    [`F11`, `F11`, 1243, 24, 96, 56, `fkey`],
    [`F12`, `F12`, 1349, 24, 96, 56, `fkey`],
    [``, ``, 1455, 24, 96, 56, `touchid`],
    [`^`, `^`, 24, 90, 96, 96, ``],
    [`1`, `1`, 130, 90, 96, 96, ``],
    [`2`, `2`, 236, 90, 96, 96, ``],
    [`3`, `3`, 342, 90, 96, 96, ``],
    [`4`, `4`, 448, 90, 96, 96, ``],
    [`5`, `5`, 554, 90, 96, 96, ``],
    [`6`, `6`, 660, 90, 96, 96, ``],
    [`7`, `7`, 766, 90, 96, 96, ``],
    [`8`, `8`, 872, 90, 96, 96, ``],
    [`9`, `9`, 978, 90, 96, 96, ``],
    [`0`, `0`, 1084, 90, 96, 96, ``],
    [`ß`, `ß`, 1190, 90, 96, 96, ``],
    [`´`, `´`, 1296, 90, 96, 96, ``],
    [`Backspace`, `⌫`, 1402, 90, 149, 96, `mod`],
    [`Tab`, `⇥`, 24, 196, 149, 96, `mod`],
    [`q`, `q`, 183, 196, 96, 96, ``],
    [`w`, `w`, 289, 196, 96, 96, ``],
    [`e`, `e`, 395, 196, 96, 96, ``],
    [`r`, `r`, 501, 196, 96, 96, ``],
    [`t`, `t`, 607, 196, 96, 96, ``],
    [`z`, `z`, 713, 196, 96, 96, ``],
    [`u`, `u`, 819, 196, 96, 96, ``],
    [`i`, `i`, 925, 196, 96, 96, ``],
    [`o`, `o`, 1031, 196, 96, 96, ``],
    [`p`, `p`, 1137, 196, 96, 96, ``],
    [`ü`, `ü`, 1243, 196, 96, 96, ``],
    [`+`, `+`, 1349, 196, 96, 96, ``],
    [`Enter`, `↩`, 1455, 196, 96, 202, `mod enter`],
    [`CapsLock`, `⇪`, 24, 302, 149, 96, `mod`],
    [`a`, `a`, 183, 302, 96, 96, ``],
    [`s`, `s`, 289, 302, 96, 96, ``],
    [`d`, `d`, 395, 302, 96, 96, ``],
    [`f`, `f`, 501, 302, 96, 96, ``],
    [`g`, `g`, 607, 302, 96, 96, ``],
    [`h`, `h`, 713, 302, 96, 96, ``],
    [`j`, `j`, 819, 302, 96, 96, ``],
    [`k`, `k`, 925, 302, 96, 96, ``],
    [`l`, `l`, 1031, 302, 96, 96, ``],
    [`ö`, `ö`, 1137, 302, 96, 96, ``],
    [`ä`, `ä`, 1243, 302, 96, 96, ``],
    [`#`, `#`, 1349, 302, 96, 96, ``],
    [`ShiftLeft`, `⇧`, 24, 408, 122.5, 96, `mod`],
    [``, `<`, 156.5, 408, 96, 96, ``],
    [`y`, `y`, 262.5, 408, 96, 96, ``],
    [`x`, `x`, 368.5, 408, 96, 96, ``],
    [`c`, `c`, 474.5, 408, 96, 96, ``],
    [`v`, `v`, 580.5, 408, 96, 96, ``],
    [`b`, `b`, 686.5, 408, 96, 96, ``],
    [`n`, `n`, 792.5, 408, 96, 96, ``],
    [`m`, `m`, 898.5, 408, 96, 96, ``],
    [`,`, `,`, 1004.5, 408, 96, 96, ``],
    [`.`, `.`, 1110.5, 408, 96, 96, ``],
    [`-`, `-`, 1216.5, 408, 96, 96, ``],
    [`ShiftRight`, `⇧`, 1322.5, 408, 228.5, 96, `mod`],
    [`Fn`, `fn`, 24, 514, 96, 96, `mod sm`],
    [`ControlLeft`, `⌃`, 130, 514, 96, 96, `mod`],
    [`AltLeft`, `⌥`, 236, 514, 96, 96, `mod`],
    [`MetaLeft`, `⌘`, 342, 514, 122.5, 96, `mod`],
    [`Space`, ``, 474.5, 514, 520, 96, `space`],
    [`MetaRight`, `⌘`, 1004.5, 514, 122.5, 96, `mod`],
    [`AltRight`, `⌥`, 1137, 514, 96, 96, `mod`],
    [`ArrowLeft`, `←`, 1243, 514, 96, 96, `mod arrow`],
    [`ArrowUp`, `↑`, 1349, 514, 96, 45.5, `mod arrow half`],
    [`ArrowDown`, `↓`, 1349, 564.5, 96, 45.5, `mod arrow half`],
    [`ArrowRight`, `→`, 1455, 514, 96, 96, `mod arrow`],
  ],
  a_demo_HT_hqV3e: RecoveredValue = {
    k: 1,
    v1: [926.8, 565.8],
    c: [302.1, 297.3],
    l: [291.3, 291.3],
    bottom: 1222.8,
    r: [3155.8, 361.3],
    v4: [2493.8, 565.8],
    v3: [2189.3, 565.8],
    m2: [1898.8, 428.8],
    m1: [1510.8, 428.8],
    v2: [1230.8, 565.8],
  },
  o_demo_HT_hqV3e: RecoveredValue = {
    k: 0.8427,
    v1: [781.039, 476.815],
    c: [254.588, 250.543],
    l: [245.486, 245.486],
    bottom: 1030.49,
    r: [2659.48, 304.477],
    v4: [2101.59, 476.815],
    v3: [1844.98, 476.815],
    m2: [1600.17, 361.361],
    m1: [1273.19, 361.361],
    v2: [1037.23, 476.815],
  },
  s_demo_HT_hqV3e: RecoveredValue = 6e3,
  c_demo_HT_hqV3e: RecoveredValue = 60,
  l_demo_HT_hqV3e: RecoveredValue = 45,
  u: RecoveredValue = {
    x: 581.3,
    y: 461.7,
  },
  d: RecoveredValue = {
    x: 310.5,
    y: 676.5,
  },
  f: RecoveredValue = {
    left: 312.5,
    width: 1575,
  };
function p(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
  let n: RecoveredValue = {
      l: c_demo_HT_hqV3e * Math.sin(t),
      m: -60 * Math.sin(t + 0.5),
      r: c_demo_HT_hqV3e * Math.sin(t + 1),
      vL: l_demo_HT_hqV3e * Math.sin(t + Math.PI / 2 + 0.25),
      vR: l_demo_HT_hqV3e * Math.sin(t - Math.PI / 2 + 0.75),
    },
    r: RecoveredValue = (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue =>
      (t[1] + n * e.k).toFixed(1);
  return `M${e.v1[0]} ${r(e.v1, n.vL)}C${e.v1[0]} ${r(e.v1, n.vL)} ${e.c[0]} ${r(e.c, n.l)} ${e.l[0]} ${r(e.l, n.l)}V${e.bottom}H${e.r[0]}V${r(e.r, n.r)}L${e.v4[0]} ${r(e.v4, n.vR)}H${e.v3[0]}V${r(e.v3, n.vR)}L${e.m2[0]} ${r(e.m2, n.m)}H${e.m1[0]}V${r(e.m1, n.m)}L${e.v2[0]} ${r(e.v2, n.vL)}H${e.v1[0]}V${r(e.v1, n.vL)}Z`;
}
function ee(e?: RecoveredValue): RecoveredValue {
  return e < 160
    ? Math.sin((Math.PI / 2) * (e / 160))
    : e < 1360
      ? 0.5 * (1 + Math.cos((Math.PI * (e - 160)) / 1200))
      : -1;
}
var m_demo_HT_hqV3e: RecoveredValue = {
    ShiftLeft: `ShiftLeft`,
    ShiftRight: `ShiftRight`,
    ControlLeft: `ControlLeft`,
    ControlRight: `ControlLeft`,
    AltLeft: `AltLeft`,
    AltRight: `AltRight`,
    MetaLeft: `MetaLeft`,
    MetaRight: `MetaRight`,
    OSLeft: `MetaLeft`,
    OSRight: `MetaRight`,
    Space: `Space`,
    Backspace: `Backspace`,
    Delete: `Backspace`,
    Tab: `Tab`,
    Enter: `Enter`,
    NumpadEnter: `Enter`,
    CapsLock: `CapsLock`,
    Escape: `Escape`,
    ArrowLeft: `ArrowLeft`,
    ArrowRight: `ArrowRight`,
    ArrowUp: `ArrowUp`,
    ArrowDown: `ArrowDown`,
  },
  h_demo_HT_hqV3e: RecoveredValue = {
    Minus: `ß`,
    Equal: `´`,
    BracketLeft: `ü`,
    BracketRight: `+`,
    Semicolon: `ö`,
    Quote: `ä`,
    Backslash: `#`,
    Comma: `,`,
    Period: `.`,
    Slash: `-`,
    Backquote: `^`,
    IntlBackslash: `^`,
    KeyY: `z`,
    KeyZ: `y`,
  },
  g: RecoveredValue = new Set(
    i_demo_HT_hqV3e.map((e?: RecoveredValue): RecoveredValue => e[0]).filter(Boolean),
  );
function _(e?: RecoveredValue): RecoveredValue {
  return m_demo_HT_hqV3e[e.code]
    ? m_demo_HT_hqV3e[e.code]
    : /^F([1-9]|1[0-2])$/.test(e.code)
      ? e.code
      : e.key.length === 1 && g.has(e.key.toLowerCase())
        ? e.key.toLowerCase()
        : /^Digit\d$/.test(e.code)
          ? e.code.slice(5)
          : h_demo_HT_hqV3e[e.code]
            ? h_demo_HT_hqV3e[e.code]
            : /^Key[A-Z]$/.test(e.code)
              ? e.code.slice(3).toLowerCase()
              : null;
}
var v_demo_HT_hqV3e: RecoveredValue = [
  `Find a quiet hike near Zermatt`,
  `Plan a sunrise climb for Saturday`,
  `What should I pack for two days?`,
];
function ComponentY({
  prompts = v_demo_HT_hqV3e,
  placeholder = `Ask AI anything...`,
  onSubmit,
  className,
  label = `AI chat input above a glass keyboard and a moving colour gradient`,
}: RecoveredValue): RecoveredValue {
  let h: RecoveredValue =
      `ui-gk` + (0, n_demo_HT_hqV3e.useId)().replace(/[^a-zA-Z0-9_-]/g, ``),
    y: RecoveredValue = (0, n_demo_HT_hqV3e.useRef)(null),
    S: RecoveredValue = (0, n_demo_HT_hqV3e.useRef)(null),
    C: RecoveredValue = (0, n_demo_HT_hqV3e.useRef)(null),
    w: RecoveredValue = (0, n_demo_HT_hqV3e.useRef)(null),
    T: RecoveredValue = (0, n_demo_HT_hqV3e.useRef)({
      prompts: prompts,
      onSubmit: onSubmit,
    });
  return (
    (T.current = {
      prompts: prompts,
      onSubmit: onSubmit,
    }),
    (0, n_demo_HT_hqV3e.useEffect)((): RecoveredValue => {
      let e: RecoveredValue = y.current,
        t: RecoveredValue = S.current,
        n: RecoveredValue = C.current,
        r: RecoveredValue = w.current;
      if (!e || !t || !n || !r) return;
      let i: RecoveredValue = window.matchMedia(
          `(prefers-reduced-motion: reduce)`,
        ).matches,
        c: RecoveredValue = n.ownerSVGElement,
        l: RecoveredValue = r.ownerSVGElement,
        m: RecoveredValue = e.querySelector(`.ui-gk-composer`),
        v: RecoveredValue = e.querySelector(`.ui-gk-glow--hard`),
        b: RecoveredValue = new Map();
      e.querySelectorAll(`[data-k]`).forEach(
        (e?: RecoveredValue): RecoveredValue => b.set(e.dataset.k, e),
      );
      let x: RecoveredValue = (): RecoveredValue => e.clientWidth / 2200,
        E: RecoveredValue = `http://www.w3.org/2000/svg`,
        D: RecoveredValue = [],
        O: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          if (i) return;
          let t: RecoveredValue = document.createElementNS(E, `ellipse`);
          (t.setAttribute(`fill`, `url(#${h}-floor)`),
            t.setAttribute(`rx`, `230`),
            t.setAttribute(`ry`, `320`),
            t.setAttribute(`cx`, String(e + u.x)),
            t.setAttribute(`cy`, String(1361.7 - u.y)));
          let n: RecoveredValue = document.createElementNS(E, `ellipse`);
          if (
            (n.setAttribute(`fill`, `#fff`),
            n.setAttribute(`fill-opacity`, `0.8`),
            n.setAttribute(`rx`, `200`),
            n.setAttribute(`ry`, `260`),
            n.setAttribute(`cx`, String(e + d.x)),
            n.setAttribute(`cy`, String(1401.7 - d.y)),
            c.appendChild(t),
            l.appendChild(n),
            D.push({
              c: t,
              l: n,
              t0: performance.now(),
            }),
            D.length > 14)
          ) {
            let e: RecoveredValue = D.shift();
            (e.c.remove(), e.l.remove());
          }
        },
        k: RecoveredValue = 0,
        A: RecoveredValue = !1,
        j: RecoveredValue = 0,
        M: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          if (((k = requestAnimationFrame(M)), e - j < 32)) return;
          j = e;
          let t: RecoveredValue = (e / s_demo_HT_hqV3e) * Math.PI * 2;
          (n.setAttribute(`d`, p(a_demo_HT_hqV3e, t)),
            r.setAttribute(`d`, p(o_demo_HT_hqV3e, t)));
          for (let t: RecoveredValue = D.length - 1; t >= 0; t--) {
            let n: RecoveredValue = D[t],
              r: RecoveredValue = ee(e - n.t0);
            if (r < 0) {
              (n.c.remove(), n.l.remove(), D.splice(t, 1));
              continue;
            }
            (n.c.setAttribute(`cy`, (1361.7 - r * 470 - u.y).toFixed(1)),
              n.l.setAttribute(`cy`, (1401.7 - r * 330 - d.y).toFixed(1)));
          }
        },
        N: RecoveredValue = (): RecoveredValue => {
          let e: RecoveredValue = v
              .getAnimations({
                subtree: !0,
              })
              .find(
                (e?: RecoveredValue): RecoveredValue => e.animationName === `ui-gk-swap`,
              ),
            t: RecoveredValue = Number(e?.currentTime ?? 0);
          return (1 - Math.cos((2 * Math.PI * (t % 6e3)) / 6e3)) / 2;
        },
        te: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          if (i) return;
          let t: RecoveredValue = N(),
            n: RecoveredValue = e * (1 - t) + (1 - e) * t,
            r: RecoveredValue = Math.round(119 * (1 - n)),
            a: RecoveredValue = Math.round(85 * n),
            o: RecoveredValue = x(),
            s: RecoveredValue = document.createElement(`div`);
          ((s.className = `ui-gk-hit`),
            (s.style.left = `${(578.36 + e * 1037.79 - 170) * o}px`),
            (s.style.background = `radial-gradient(closest-side, rgba(255,${r},${a},.95), rgba(255,${r},${a},0))`),
            m.insertBefore(s, v),
            (s.animate(
              [
                {
                  opacity: 0,
                  transform: `scale(.8, 1)`,
                  filter: `blur(${14 * o}px)`,
                },
                {
                  opacity: 0.6,
                  transform: `translateY(${-2 * o}px) scale(1.1, 1.35)`,
                  filter: `blur(${22 * o}px)`,
                  offset: 0.15,
                },
                {
                  opacity: 0,
                  transform: `scale(1.2, 1.15)`,
                  filter: `blur(${30 * o}px)`,
                },
              ],
              {
                duration: 1100,
                easing: `ease-out`,
              },
            ).onfinish = (): RecoveredValue => s.remove()));
        },
        P: RecoveredValue = new Map(),
        F: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = b.get(e);
          t && (t.setAttribute(`data-down`, ``), P.set(e, performance.now()));
        },
        I: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = b.get(e);
          if (!t) return;
          let n: RecoveredValue = Math.max(
            0,
            150 - (performance.now() - (P.get(e) ?? 0)),
          );
          (P.delete(e),
            window.setTimeout((): RecoveredValue => {
              P.has(e) || t.removeAttribute(`data-down`);
            }, n));
        },
        L: RecoveredValue = (): RecoveredValue => [...P.keys()].forEach(I),
        R: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = b.get(e);
          if (!t || !A) return;
          let n: RecoveredValue = Math.min(
            1,
            Math.max(0, (t.offsetLeft + t.offsetWidth / 2) / (f.width * x())),
          );
          (O(120 + n * 1960), te(n));
        },
        z: RecoveredValue = (): RecoveredValue => {
          let e: RecoveredValue = t.value.trim();
          (e && T.current.onSubmit?.(e),
            (t.value = ``),
            t.dispatchEvent(
              new Event(`input`, {
                bubbles: !0,
              }),
            ));
        },
        B: RecoveredValue = !1,
        V: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          e.isTrusted && (B = !0);
          let t: RecoveredValue = _(e);
          (t && F(t),
            t && !e.repeat && R(t),
            e.key === `Enter` && (e.preventDefault(), z()));
        },
        H: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          let t: RecoveredValue = _(e);
          (t && I(t), (t === `MetaLeft` || t === `MetaRight`) && L());
        },
        U: RecoveredValue = (): RecoveredValue => {
          B = !0;
        };
      (t.addEventListener(`keydown`, V),
        t.addEventListener(`keyup`, H),
        t.addEventListener(`blur`, L),
        t.addEventListener(`focus`, U));
      let W: RecoveredValue = !0,
        G: RecoveredValue = (e?: RecoveredValue): RecoveredValue =>
          new Promise((t?: RecoveredValue): RecoveredValue => window.setTimeout(t, e)),
        K: RecoveredValue = (e?: RecoveredValue, t?: RecoveredValue): RecoveredValue =>
          e + Math.random() * (t - e),
        q: RecoveredValue = (): RecoveredValue => !W || B,
        J: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
          ((t.value = e),
            (t.scrollLeft = t.scrollWidth),
            t.dispatchEvent(
              new Event(`input`, {
                bubbles: !0,
              }),
            ));
        },
        Y: RecoveredValue = async (
          e?: RecoveredValue,
          t: RecoveredValue = K(130, 180),
        ): Promise<RecoveredValue> => {
          (F(e), R(e), await G(t), I(e));
        },
        X: RecoveredValue = async (e?: RecoveredValue): Promise<RecoveredValue> => {
          if (e === ` `) {
            (await Y(`Space`), J(t.value + ` `));
            return;
          }
          let n: RecoveredValue = e.toLowerCase();
          if (!g.has(n)) {
            J(t.value + e);
            return;
          }
          if (e !== n) {
            (F(`ShiftLeft`),
              await G(K(60, 90)),
              F(n),
              R(n),
              J(t.value + e),
              await G(K(130, 170)),
              I(n),
              await G(60),
              I(`ShiftLeft`));
            return;
          }
          (F(n), R(n), J(t.value + e), await G(K(130, 180)), I(n));
        },
        ne: RecoveredValue = async (): Promise<RecoveredValue> => {
          await G(1700);
          for (let e: RecoveredValue = 0; !q(); e++) {
            let n: RecoveredValue = T.current.prompts;
            if (!n.length) return;
            let r: RecoveredValue = n[e % n.length],
              i: RecoveredValue =
                e === 0 ? Math.min(r.length - 1, r.indexOf(` `) + 4 || 4) : -1;
            for (let e: RecoveredValue = 0; e < r.length; e++) {
              if (q()) return;
              (e === i &&
                (await X(`w`),
                await G(K(320, 420)),
                await Y(`Backspace`),
                J(t.value.slice(0, -1)),
                await G(K(160, 220))),
                await X(r[e]),
                await G(r[e] === ` ` ? K(220, 380) : K(110, 260)));
            }
            if ((await G(1600), q())) return;
            (await Y(`Enter`), z(), await G(1100));
          }
        },
        Z: RecoveredValue = (): RecoveredValue => {
          (e.setAttribute(`data-in`, ``), i || ne());
        },
        Q: RecoveredValue = !1,
        $: RecoveredValue =
          typeof IntersectionObserver > `u`
            ? null
            : new IntersectionObserver(([t]: RecoveredValue): RecoveredValue => {
                ((A = t.isIntersecting),
                  cancelAnimationFrame(k),
                  e.toggleAttribute(`data-paused`, !A),
                  A && (Q || ((Q = !0), Z()), i || (k = requestAnimationFrame(M))));
              });
      return (
        $ ? $.observe(e) : ((A = !0), (Q = !0), Z(), i || (k = requestAnimationFrame(M))),
        (): RecoveredValue => {
          ((W = !1),
            $?.disconnect(),
            cancelAnimationFrame(k),
            t.removeEventListener(`keydown`, V),
            t.removeEventListener(`keyup`, H),
            t.removeEventListener(`blur`, L),
            t.removeEventListener(`focus`, U),
            D.forEach((e?: RecoveredValue): RecoveredValue => {
              (e.c.remove(), e.l.remove());
            }));
        }
      );
    }, [h]),
    (
      <div
        ref={y as RecoveredValue}
        className={[`ui-gk`, className].filter(Boolean).join(` `)}
        role={`group`}
        aria-label={label}
        onPointerDown={(e?: RecoveredValue): RecoveredValue => {
          e.target !== S.current && (e.preventDefault(), S.current?.focus());
        }}
      >
        <div className={`ui-gk-frame`}>
          <div className={`ui-gk-floor ui-gk-floor--color`} aria-hidden={`true`}>
            <div className={`ui-gk-bleed`}>
              <svg viewBox={`0 0 3447.1 1514.1`} preserveAspectRatio={`none`}>
                <defs>
                  <linearGradient
                    id={`${h}-floor`}
                    x1={`1723.8`}
                    y1={`423.3`}
                    x2={`1723.8`}
                    y2={`894.3`}
                    gradientUnits={`userSpaceOnUse`}
                  >
                    <stop stopColor={`#FF7700`} />
                    <stop offset={`0.302885`} stopColor={`#FF0055`} />
                    <stop offset={`0.673077`} stopColor={`#0073FF`} />
                  </linearGradient>
                </defs>
                <path
                  ref={C as RecoveredValue}
                  d={p(a_demo_HT_hqV3e, 0)}
                  fill={`url(#${h}-floor)`}
                />
              </svg>
            </div>
          </div>
          <div className={`ui-gk-floor ui-gk-floor--light`} aria-hidden={`true`}>
            <div className={`ui-gk-bleed`}>
              <svg viewBox={`0 0 2904.96 1275.97`} preserveAspectRatio={`none`}>
                <path
                  ref={w as RecoveredValue}
                  d={p(o_demo_HT_hqV3e, 0)}
                  fill={`#fff`}
                  fillOpacity={`0.8`}
                />
              </svg>
            </div>
          </div>
          <div className={`ui-gk-composer`}>
            <div className={`ui-gk-glow ui-gk-glow--soft`} aria-hidden={`true`} />
            <div className={`ui-gk-glow-mid`} aria-hidden={`true`} />
            <div className={`ui-gk-glow ui-gk-glow--hard`} aria-hidden={`true`} />
            <div className={`ui-gk-ring`} aria-hidden={`true`} />
            <div className={`ui-gk-input`}>
              <div className={`ui-gk-glass`} aria-hidden={`true`} />
              <svg
                className={`ui-gk-orb`}
                viewBox={`0 0 95.5862 95.5862`}
                aria-hidden={`true`}
              >
                <defs>
                  <radialGradient
                    id={`${h}-orb`}
                    cx={`0`}
                    cy={`0`}
                    r={`1`}
                    gradientUnits={`userSpaceOnUse`}
                    gradientTransform={`translate(47.7931 9.55862) rotate(90) scale(86.0276)`}
                  >
                    <stop offset={`0.221154`} stopColor={`#FF7700`} />
                    <stop offset={`1`} stopColor={`#FF2A91`} />
                  </radialGradient>
                  <filter
                    id={`${h}-orb-glow`}
                    x={`0`}
                    y={`0`}
                    width={`95.5862`}
                    height={`95.5862`}
                    filterUnits={`userSpaceOnUse`}
                    colorInterpolationFilters={`sRGB`}
                  >
                    <feColorMatrix
                      in={`SourceAlpha`}
                      type={`matrix`}
                      values={`0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0`}
                      result={`alpha`}
                    />
                    <feGaussianBlur stdDeviation={`21.3703`} />
                    <feComposite
                      in2={`alpha`}
                      operator={`arithmetic`}
                      k2={`-1`}
                      k3={`1`}
                    />
                    <feColorMatrix
                      type={`matrix`}
                      values={`0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0`}
                    />
                    <feBlend mode={`normal`} in2={`SourceGraphic`} />
                  </filter>
                </defs>
                <circle
                  cx={`47.7931`}
                  cy={`47.7931`}
                  r={`47.7931`}
                  fill={`url(#${h}-orb)`}
                  filter={`url(#${h}-orb-glow)`}
                />
              </svg>
              <span className={`ui-gk-field`}>
                <span className={`ui-gk-caret`} aria-hidden={`true`} />
                <input
                  ref={S as RecoveredValue}
                  className={`ui-gk-prompt`}
                  type={`text`}
                  placeholder={placeholder}
                  aria-label={placeholder}
                  autoComplete={`off`}
                  spellCheck={!1}
                />
              </span>
              <div className={`ui-gk-glass ui-gk-glass--inner`} aria-hidden={`true`} />
            </div>
          </div>
          <div className={`ui-gk-keyboard`} aria-hidden={`true`}>
            {i_demo_HT_hqV3e.map(
              (
                [e, t, n, i, a, o, s]: RecoveredValue,
                c?: RecoveredValue,
              ): RecoveredValue => (
                <span
                  className={[
                    `ui-gk-key`,
                    ...s
                      .split(` `)
                      .filter(Boolean)
                      .map((e?: RecoveredValue): RecoveredValue => `ui-gk-key--${e}`),
                  ].join(` `)}
                  data-k={e || void 0}
                  style={
                    {
                      left: b_demo_HT_hqV3e(n),
                      top: b_demo_HT_hqV3e(i),
                      width: b_demo_HT_hqV3e(a),
                      height: b_demo_HT_hqV3e(o),
                    } as RecoveredValue
                  }
                  children={t}
                  key={c}
                />
              ),
            )}
          </div>
        </div>
      </div>
    )
  );
}
function b_demo_HT_hqV3e(e?: RecoveredValue): RecoveredValue {
  return `calc(${e} * var(--ui-gk-u))`;
}
function Runtime(): RecoveredValue {
  return (
    <div className={`glow-keyboard-demo`}>
      <ComponentY />
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
