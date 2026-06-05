"use client";

import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data";

const items = [
  { id: "top", label: "Home" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="nav-inner container">
        <a href="#top" className="nav-logo">
          {profile.shortName}
          <span className="nav-logo-dot">.</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {items.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={`nav-link${active === n.id ? " active" : ""}`}>
              {n.label}
            </a>
          ))}
          <a className="nav-social" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a className="nav-social" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </a>
          <a className="btn btn-primary nav-cta" href={profile.resumePdf} target="_blank" rel="noopener">
            <FileText size={15} /> Résumé
          </a>
        </nav>

        <div className="nav-mobile-actions">
          <a className="btn btn-primary nav-cta" href={profile.resumePdf} target="_blank" rel="noopener">
            Résumé
          </a>
          <button
            type="button"
            className="icon-btn"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          {items.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
