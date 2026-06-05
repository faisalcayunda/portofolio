import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data";
import { FadeIn } from "@/components/motion/FadeIn";

export default function Contact() {
  return (
    <section id="contact" className="section below-fold">
      <div className="container">
        <FadeIn>
          <div className="section-head">
            <span className="kicker">Contact</span>
            <h2>Let&apos;s talk.</h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="contact-card card">
            <div>
              <h3 className="contact-title">Let&apos;s talk</h3>
              <p className="lead contact-text">
                I&apos;m open to backend and data-platform roles, and happy to talk through a
                problem even if you&apos;re just scoping one. The fastest way to reach me is email.
              </p>
              <div className="hero-cta">
                <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                  <Mail size={17} /> {profile.email}
                </a>
                <a className="btn btn-ghost" href={profile.resumePdf} target="_blank" rel="noopener">
                  <FileText size={17} /> Download resume
                </a>
              </div>
            </div>
            <div className="contact-links">
              <a href={profile.linkedin} target="_blank" rel="noopener">
                <LinkedinIcon size={18} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener">
                <GithubIcon size={18} /> GitHub
              </a>
              <a href={`mailto:${profile.email}`}>
                <Mail size={18} /> Email
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
