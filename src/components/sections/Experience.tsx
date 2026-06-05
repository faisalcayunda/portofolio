import { experience, earlier } from "@/data";
import { FadeIn } from "@/components/motion/FadeIn";

export default function Experience() {
  return (
    <section id="experience" className="section below-fold">
      <div className="container">
        <FadeIn>
          <div className="section-head">
            <span className="kicker">Experience</span>
            <h2>Where I&apos;ve worked.</h2>
          </div>
        </FadeIn>

        <div className="exp-list">
          {experience.map((job, i) => (
            <FadeIn key={job.company + job.period} delay={i * 0.05}>
              <article className="exp-item">
                <div className="exp-meta">
                  <span className="exp-period mono">{job.period}</span>
                  <span className="exp-loc mono">{job.location}</span>
                </div>
                <div className="exp-body">
                  <h3 className="exp-role">
                    {job.title}
                    {job.contract && <span className="exp-chip">Contract</span>}
                  </h3>
                  <p className="exp-company accent">{job.company}</p>
                  <ul className="exp-bullets">
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <ul className="tag-row exp-stack">
                    {job.stack.map((s) => (
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

        <FadeIn delay={0.05}>
          <p className="earlier lead">{earlier}</p>
        </FadeIn>
      </div>
    </section>
  );
}
