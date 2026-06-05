"use client";

import { useState } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/data";
import { FadeIn } from "@/components/motion/FadeIn";

const INITIAL = 4;

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? projects : projects.slice(0, INITIAL);
  const hasMore = projects.length > INITIAL;

  return (
    <section id="projects" className="section below-fold">
      <div className="container">
        <FadeIn>
          <div className="section-head">
            <span className="kicker">Selected work</span>
            <h2>Things I&apos;ve built.</h2>
          </div>
        </FadeIn>

        <div className="projects-grid">
          {shown.map((p, i) => (
            <FadeIn key={p.name} delay={(i % INITIAL) * 0.05}>
              <article
                className="card project-card"
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  el.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <header className="project-head">
                  <h3 className="project-name">{p.name}</h3>
                  {p.link ? (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noopener"
                      className="project-link"
                      aria-label={p.link.label}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <span className="project-private" title={p.note ?? "Internal"}>
                      <Lock size={15} />
                    </span>
                  )}
                </header>
                <p className="project-role mono">{p.role}</p>
                <p className="project-blurb lead">{p.blurb}</p>
                <div className="project-foot">
                  {p.note && <p className="project-note mono">{p.note}</p>}
                  <ul className="tag-row project-stack">
                    {p.stack.map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {hasMore && (
          <div className="more-wrap">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Show less" : `Show ${projects.length - INITIAL} more`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
