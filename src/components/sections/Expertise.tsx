import { CheckCheck, Shield, Box, Plug, Activity, FileText } from "lucide-react";
import { principles } from "@/data";
import { stack } from "@/data/stack";
import { FadeIn } from "@/components/motion/FadeIn";

const ICONS: Record<string, typeof Box> = {
  checkcheck: CheckCheck,
  shield: Shield,
  box: Box,
  plug: Plug,
  activity: Activity,
  filetext: FileText,
};

export default function Expertise() {
  return (
    <section id="expertise" className="section below-fold">
      <div className="container">
        <FadeIn>
          <div className="section-head">
            <span className="kicker">Expertise</span>
            <h2>My stack.</h2>
          </div>
        </FadeIn>

        <div className="stack-cats">
          {stack.map((cat, ci) => (
            <FadeIn key={cat.label} delay={(ci % 2) * 0.06}>
              <div className="stack-cat">
                <div className="stack-cat-label">{cat.label}</div>
                <div className="tech-grid">
                  {cat.items.map((t) => (
                    <div className="tech" key={t.name}>
                      <span className="tech-ic">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.icon} alt={t.name} loading="lazy" />
                      </span>
                      <span className="tech-name">{t.name}</span>
                      <span className="tech-bar" style={{ background: t.color }} />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="section-sub">
            <span className="kicker">Principles</span>
            <h3 className="sub-h">How I build software.</h3>
          </div>
        </FadeIn>
        <div className="principles-grid">
          {principles.map((p, i) => {
            const Ic = ICONS[p.icon] ?? Box;
            return (
              <FadeIn key={p.title} delay={(i % 3) * 0.05}>
                <article className="card principle">
                  <span className="p-ic">
                    <Ic size={20} />
                  </span>
                  <h3>{p.title}</h3>
                  <p className="lead">{p.desc}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
