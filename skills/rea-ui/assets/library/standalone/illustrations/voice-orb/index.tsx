"use client";

import "./VoiceOrb.css";
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
var n_demo_DbX9tDU_: RecoveredValue = t_react_BkAXpnfr(),
  r_demo_DbX9tDU_: RecoveredValue = t_jsx_runtime_CTsRTJUX(),
  i_demo_DbX9tDU_: RecoveredValue = {
    idle: `Tap to speak`,
    listening: `Listening`,
    thinking: `Thinking`,
    speaking: `Speaking`,
  },
  a_demo_DbX9tDU_: RecoveredValue = [`idle`, `listening`, `thinking`, `speaking`],
  o_demo_DbX9tDU_: RecoveredValue = {
    idle: 0.16,
    listening: 0.3,
    thinking: 1.9,
    speaking: 0.42,
  },
  s: RecoveredValue = (
    e?: RecoveredValue,
    t: RecoveredValue = 0,
    n: RecoveredValue = 1,
  ): RecoveredValue => Math.min(n, Math.max(t, e)),
  c_demo_DbX9tDU_: RecoveredValue = (): RecoveredValue =>
    typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function l_demo_DbX9tDU_(e?: RecoveredValue, t?: RecoveredValue): RecoveredValue {
  t.style.color = e;
  let n: RecoveredValue = getComputedStyle(t).color.match(/[\d.]+/g);
  return n ? [Number(n[0]), Number(n[1]), Number(n[2])] : [23, 23, 23];
}
function ComponentU({
  state = `idle`,
  level,
  size = 220,
  dots = 520,
  accent,
  label = !0,
  interactive = !0,
  onPress,
  className,
  style,
}: RecoveredValue): RecoveredValue {
  let y: RecoveredValue = (0, n_demo_DbX9tDU_.useRef)(null),
    b: RecoveredValue = (0, n_demo_DbX9tDU_.useRef)({
      state: state,
      level: level,
      interactive: interactive,
    });
  b.current = {
    state: state,
    level: level,
    interactive: interactive,
  };
  let x: RecoveredValue = (0, n_demo_DbX9tDU_.useRef)((): RecoveredValue => {});
  ((0, n_demo_DbX9tDU_.useEffect)((): RecoveredValue => {
    let e: RecoveredValue = y.current,
      t: RecoveredValue = e?.getContext(`2d`);
    if (!e || !t) return;
    let n: RecoveredValue = Math.max(60, Math.round(dots)),
      r: RecoveredValue = new Float32Array(n * 3),
      i: RecoveredValue = Math.PI * (3 - Math.sqrt(5));
    for (let e: RecoveredValue = 0; e < n; e++) {
      let t: RecoveredValue = 1 - (e / (n - 1)) * 2,
        a: RecoveredValue = Math.sqrt(1 - t * t);
      ((r[e * 3] = Math.cos(i * e) * a),
        (r[e * 3 + 1] = t),
        (r[e * 3 + 2] = Math.sin(i * e) * a));
    }
    let d: RecoveredValue = Math.min(window.devicePixelRatio || 1, 2.5);
    ((e.width = Math.round(size * d)), (e.height = Math.round(size * d)));
    let p: RecoveredValue = document.createElement(`span`);
    ((p.style.display = `none`), e.parentElement?.appendChild(p));
    let m: RecoveredValue = [23, 23, 23],
      h: RecoveredValue = [47, 107, 255],
      g: RecoveredValue = (): RecoveredValue => {
        let t: RecoveredValue = getComputedStyle(e);
        ((m = l_demo_DbX9tDU_(t.color, p)),
          (h = l_demo_DbX9tDU_(
            t.getPropertyValue(`--ui-vo-accent`).trim() || `#2f6bff`,
            p,
          )));
      };
    g();
    let _: RecoveredValue = {
      idle: 0,
      listening: 0,
      thinking: 0,
      speaking: 0,
    };
    _[b.current.state] = 1;
    let v: RecoveredValue = 0,
      S: RecoveredValue = 0,
      C: RecoveredValue = {
        x: 0,
        y: 0,
        on: !1,
        strength: 0,
      },
      w: RecoveredValue = performance.now(),
      T: RecoveredValue = 0,
      E: RecoveredValue = 0,
      D: RecoveredValue = !0,
      O: RecoveredValue = c_demo_DbX9tDU_(),
      k: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
        let i: RecoveredValue = Math.min(0.05, (e - w) / 1e3);
        w = e;
        let c: RecoveredValue = e / 1e3,
          l: RecoveredValue = b.current;
        ++E % 30 == 0 && g();
        let f: RecoveredValue = 0;
        for (let e of a_demo_DbX9tDU_)
          ((_[e] += (+(e === l.state) - _[e]) * Math.min(1, i * 5)),
            (f += _[e] * o_demo_DbX9tDU_[e]));
        v += f * i;
        let p: RecoveredValue =
            l.state === `listening`
              ? s(
                  0.35 +
                    0.35 * Math.sin(c * 2.1) * Math.sin(c * 5.3) +
                    0.3 * Math.sin(c * 9.7 + 1) * Math.sin(c * 0.9),
                )
              : s(
                  0.3 +
                    0.7 *
                      Math.abs(Math.sin(c * 4.1)) *
                      (0.5 + 0.5 * Math.sin(c * 1.3 + 2)),
                ),
          y: RecoveredValue =
            l.level !== void 0 && Number.isFinite(l.level) ? s(l.level) : p;
        ((S += (y - S) * Math.min(1, i * 12)),
          (C.strength +=
            ((C.on && l.interactive ? 1 : 0) - C.strength) * Math.min(1, i * 8)));
        let x: RecoveredValue = size,
          A: RecoveredValue = x / 2,
          j: RecoveredValue = x * 0.32,
          M: RecoveredValue = 0.32 + _.thinking * 0.55,
          N: RecoveredValue = Math.sin(M),
          P: RecoveredValue = Math.cos(M),
          F: RecoveredValue = Math.sin(v),
          I: RecoveredValue = Math.cos(v),
          L: RecoveredValue = x * 0.2,
          R: RecoveredValue = Math.max(0.9, x / 190);
        (t.setTransform(d, 0, 0, d, 0, 0), t.clearRect(0, 0, x, x));
        let z: RecoveredValue = (_.listening + _.speaking) * S * 0.16 + _.thinking * 0.05;
        if (z > 0.004) {
          let e: RecoveredValue = t.createRadialGradient(A, A, j * 0.2, A, A, j * 1.55);
          (e.addColorStop(0, `rgba(${h[0]}, ${h[1]}, ${h[2]}, ${z})`),
            e.addColorStop(1, `rgba(${h[0]}, ${h[1]}, ${h[2]}, 0)`),
            (t.fillStyle = e),
            t.fillRect(0, 0, x, x));
        }
        for (let e: RecoveredValue = 0; e < n; e++) {
          let n: RecoveredValue = r[e * 3],
            i: RecoveredValue = r[e * 3 + 1],
            a: RecoveredValue = r[e * 3 + 2],
            o: RecoveredValue =
              (Math.sin(n * 3.1 + c * 2.3) +
                Math.sin(i * 4.3 - c * 1.7) +
                Math.sin(a * 5.2 + c * 2.9)) /
              3,
            l: RecoveredValue = _.idle * 0.022 * Math.sin(c * 1.3 + i * 2),
            u: RecoveredValue = _.listening * S * 0.3 * Math.max(0, o) ** 1.4,
            d: RecoveredValue = _.speaking * S * 0.13 * Math.sin(i * 7.5 - c * 7),
            f: RecoveredValue = l + u + d,
            p: RecoveredValue = n * (1 + f),
            g: RecoveredValue = i * (1 + f),
            y: RecoveredValue = a * (1 + f),
            b: RecoveredValue = 0,
            w: RecoveredValue = 1;
          if (_.thinking > 0.001) {
            let t: RecoveredValue = Math.hypot(n, a) || 1,
              r: RecoveredValue = 1 + 0.035 * Math.sin(c * 3 + e * 0.7),
              o: RecoveredValue = _.thinking;
            ((p += ((n / t) * r - p) * o),
              (g += (i * 0.2 - g) * o),
              (w = 1 - o * (1 - s((Math.hypot(n, a) - 0.25) * 2.2))),
              (y += ((a / t) * r - y) * o));
            let l: RecoveredValue = Math.atan2(a, n) + v;
            b = o * Math.max(0, Math.cos(l - c * 2.2)) ** 6;
          }
          let T: RecoveredValue = p * I + y * F,
            E: RecoveredValue = -p * F + y * I,
            D: RecoveredValue = g * P - E * N,
            O: RecoveredValue = g * N + E * P,
            k: RecoveredValue = 3.4 / (3.4 - O),
            M: RecoveredValue = A + T * j * k,
            z: RecoveredValue = A + D * j * k;
          if (C.strength > 0.01) {
            let e: RecoveredValue = M - C.x,
              t: RecoveredValue = z - C.y,
              n: RecoveredValue = Math.hypot(e, t) || 1;
            if (n < L) {
              let r: RecoveredValue = (1 - n / L) ** 2 * x * 0.07 * C.strength;
              ((M += (e / n) * r), (z += (t / n) * r));
            }
          }
          let B: RecoveredValue = (O + 1.3) / 2.6,
            V: RecoveredValue = s(Math.abs(u + d) * 9 + b),
            H: RecoveredValue = R * (0.55 + 0.75 * B) * k * (1 + V * 0.5),
            U: RecoveredValue = s(0.12 + 0.88 * B ** 1.6 + V * 0.3) * w;
          if (U < 0.01) continue;
          let W: RecoveredValue = Math.round(m[0] + (h[0] - m[0]) * V),
            G: RecoveredValue = Math.round(m[1] + (h[1] - m[1]) * V),
            K: RecoveredValue = Math.round(m[2] + (h[2] - m[2]) * V);
          ((t.fillStyle = `rgba(${W}, ${G}, ${K}, ${U.toFixed(3)})`),
            t.beginPath(),
            t.arc(M, z, H, 0, Math.PI * 2),
            t.fill());
        }
        !O && D && (T = requestAnimationFrame(k));
      };
    x.current = (): RecoveredValue => {
      if (O) {
        for (let e of a_demo_DbX9tDU_) _[e] = +(e === b.current.state);
        ((S = b.current.level ?? 0.6), (w = performance.now()), k(w));
      }
    };
    let A: RecoveredValue = (): RecoveredValue => {
        (cancelAnimationFrame(T),
          (w = performance.now()),
          (T = requestAnimationFrame(k)));
      },
      j: RecoveredValue =
        `IntersectionObserver` in window
          ? new IntersectionObserver(([e]: RecoveredValue): RecoveredValue => {
              ((D = e.isIntersecting && !document.hidden), D && A());
            })
          : null;
    j?.observe(e);
    let M: RecoveredValue = (): RecoveredValue => {
      ((D = !document.hidden), D && A());
    };
    (document.addEventListener(`visibilitychange`, M), A());
    let N: RecoveredValue = (t?: RecoveredValue): RecoveredValue => {
        let n: RecoveredValue = e.getBoundingClientRect(),
          r: RecoveredValue = size / (n.width || size);
        ((C.x = (t.clientX - n.left) * r),
          (C.y = (t.clientY - n.top) * r),
          (C.on = t.pointerType === `mouse`));
      },
      P: RecoveredValue = (): RecoveredValue => (C.on = !1);
    return (
      e.addEventListener(`pointermove`, N),
      e.addEventListener(`pointerleave`, P),
      (): RecoveredValue => {
        (cancelAnimationFrame(T),
          j?.disconnect(),
          document.removeEventListener(`visibilitychange`, M),
          e.removeEventListener(`pointermove`, N),
          e.removeEventListener(`pointerleave`, P),
          p.remove());
      }
    );
  }, [size, dots]),
    (0, n_demo_DbX9tDU_.useEffect)((): RecoveredValue => x.current(), [state, level]));
  let S: RecoveredValue =
      label === !1
        ? null
        : (
            {
              ...i_demo_DbX9tDU_,
              ...(typeof label == `object` ? label : {}),
            } as Record<string, RecoveredValue>
          )[state],
    C: RecoveredValue = {
      ...style,
      "--ui-vo-size": `${size}px`,
      ...(accent
        ? {
            "--ui-vo-accent": accent,
          }
        : {}),
    },
    w: RecoveredValue = (
      <r_demo_DbX9tDU_.Fragment>
        <canvas
          ref={y as RecoveredValue}
          className={`ui-vo__canvas`}
          aria-hidden={`true`}
        />
        {S !== null && (
          <span className={`ui-vo__label`} aria-live={`polite`}>
            <span key={state}>
              {S}
              {state !== `idle` && (
                <span className={`ui-vo__dots`} aria-hidden={`true`}>
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </span>
          </span>
        )}
      </r_demo_DbX9tDU_.Fragment>
    );
  return (
    <r_demo_DbX9tDU_.Fragment>
      {onPress ? (
        <button
          type={`button`}
          className={[`ui-vo`, className].filter(Boolean).join(` `)}
          data-state={state}
          style={C as RecoveredValue}
          aria-label={S ? void 0 : `Voice assistant: ${i_demo_DbX9tDU_[state]}`}
          onClick={onPress}
        >
          {w}
        </button>
      ) : (
        <div
          className={[`ui-vo`, className].filter(Boolean).join(` `)}
          data-state={state}
          style={C as RecoveredValue}
          role={`img`}
          aria-label={`Voice assistant: ${S ?? i_demo_DbX9tDU_[state]}`}
        >
          {w}
        </div>
      )}
    </r_demo_DbX9tDU_.Fragment>
  );
}
var f_demo_DbX9tDU_: RecoveredValue = [
  {
    state: `idle`,
    label: `Idle`,
    ms: 2e3,
  },
  {
    state: `listening`,
    label: `Listening`,
    ms: 3200,
  },
  {
    state: `thinking`,
    label: `Thinking`,
    ms: 2600,
  },
  {
    state: `speaking`,
    label: `Speaking`,
    ms: 3600,
  },
];
function Runtime(): RecoveredValue {
  let [e, t]: RecoveredValue = (0, n_demo_DbX9tDU_.useState)(0),
    i: RecoveredValue = (0, n_demo_DbX9tDU_.useRef)(!1);
  (0, n_demo_DbX9tDU_.useEffect)((): RecoveredValue => {
    if (i.current) return;
    let n: RecoveredValue = window.setTimeout(
      (): RecoveredValue =>
        t((e?: RecoveredValue): RecoveredValue => (e + 1) % f_demo_DbX9tDU_.length),
      f_demo_DbX9tDU_[e].ms,
    );
    return (): RecoveredValue => window.clearTimeout(n);
  }, [e]);
  let a: RecoveredValue = (e?: RecoveredValue): RecoveredValue => {
    ((i.current = !0), t(e));
  };
  return (
    <div className={`vo-demo`}>
      <ComponentU
        state={f_demo_DbX9tDU_[e].state}
        onPress={(): RecoveredValue => a((e + 1) % f_demo_DbX9tDU_.length)}
      />
      <div
        className={`segmented vo-demo__states`}
        role={`radiogroup`}
        aria-label={`State`}
      >
        {f_demo_DbX9tDU_.map(
          (t?: RecoveredValue, n?: RecoveredValue): RecoveredValue => (
            <button
              type={`button`}
              role={`radio`}
              aria-checked={n === e}
              onClick={(): RecoveredValue => a(n)}
              children={t.label}
              key={t.state}
            />
          ),
        )}
      </div>
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
