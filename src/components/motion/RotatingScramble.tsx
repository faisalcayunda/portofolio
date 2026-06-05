"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#·:;";

/**
 * Cycles through `phrases`, scrambling each character on transition
 * (cyntax.dev-style decode effect). Pure rAF — plays regardless of the
 * OS "reduce motion" setting, which is the point: the hero must visibly move.
 *
 * Layout is width-stable: a hidden sizer reserves the width of the LONGEST
 * phrase (+ optional suffix) and the animated text is absolutely positioned
 * over it. So the surrounding layout (e.g. the photo column) never shifts as
 * the role changes length. The real role lives in an sr-only label for a11y.
 */
export function RotatingScramble({
  phrases,
  className,
  suffix = "",
  suffixClassName,
  hold = 2400,
}: {
  phrases: string[];
  className?: string;
  suffix?: string;
  suffixClassName?: string;
  hold?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    let idx = 0;
    let cur = phrases[0] ?? "";

    const suffixHtml = suffix
      ? `<span class="${suffixClassName ?? ""}">${suffix}</span>`
      : "";

    type Q = { from: string; to: string; start: number; end: number; ch?: string };

    function scrambleTo(next: string): Promise<void> {
      const length = Math.max(cur.length, next.length);
      const queue: Q[] = [];
      for (let i = 0; i < length; i++) {
        const from = cur[i] || "";
        const to = next[i] || "";
        const start = Math.floor(Math.random() * 30);
        const end = start + Math.floor(Math.random() * 30) + 12;
        queue.push({ from, to, start, end });
      }
      cur = next;

      return new Promise((resolve) => {
        let frame = 0;
        const tick = () => {
          let out = "";
          let done = 0;
          for (const q of queue) {
            if (frame >= q.end) {
              done++;
              out += q.to;
            } else if (frame >= q.start) {
              if (!q.ch || Math.random() < 0.3) {
                q.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              }
              out += `<span class="scramble-dim">${q.ch}</span>`;
            } else {
              out += q.from;
            }
          }
          if (el) el.innerHTML = out + suffixHtml;
          if (done === queue.length) {
            resolve();
          } else {
            frame++;
            raf = requestAnimationFrame(tick);
          }
        };
        tick();
      });
    }

    const cycle = async () => {
      idx = (idx + 1) % phrases.length;
      await scrambleTo(phrases[idx]);
      timer = setTimeout(cycle, hold);
    };
    timer = setTimeout(cycle, hold);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [phrases, hold, suffix, suffixClassName]);

  return (
    <span className={`scramble-wrap${className ? " " + className : ""}`}>
      <span className="scramble-sizer" aria-hidden>
        {longest}
        {suffix}
      </span>
      <span ref={ref} className="scramble-live" aria-hidden>
        {phrases[0]}
        {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
      </span>
    </span>
  );
}
