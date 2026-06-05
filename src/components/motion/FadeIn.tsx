"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal that can never get stuck hidden:
 * - reveals when it scrolls into view (IntersectionObserver)
 * - reveals anyway after a short failsafe timeout
 * - reveals immediately if IO is unavailable
 * - no-JS users get visible content via a <noscript> rule in layout
 */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );
    obs.observe(el);
    const failsafe = setTimeout(() => setShown(true), 1100);
    return () => {
      obs.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? " is-visible" : ""}${className ? " " + className : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
