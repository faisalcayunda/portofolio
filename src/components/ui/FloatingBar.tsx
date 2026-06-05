"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/data";

export default function FloatingBar() {
  return (
    <>
      <div className="floatbar">
        <span className="dotpulse" aria-hidden />
        Open to opportunities
        <a className="fb-cta" href={`mailto:${profile.email}`}>
          Let&apos;s talk
        </a>
      </div>
      <button
        type="button"
        className="to-top"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
