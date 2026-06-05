import Image from "next/image";
import { Mail, FileText } from "lucide-react";
import Constellation from "@/components/motion/Constellation";
import { Magnetic } from "@/components/motion/Magnetic";
import { RotatingScramble } from "@/components/motion/RotatingScramble";
import { profile } from "@/data";

const ROLES = ["Software Engineer", "Backend Engineer", "Data Engineer", "System Architect"];

export default function Hero() {
  const first = profile.name.split(" ")[0];

  return (
    <section id="top" className="hero">
      <Constellation />
      <div className="hero-glow" aria-hidden />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow rise" style={{ animationDelay: "0s" }}>
            Hi, {first} here <span aria-hidden>👋</span>
          </p>

          <h1 className="hero-title rise" style={{ animationDelay: "0.07s" }}>
            <span className="light">I&apos;m a</span>
            <br />
            <span className="sr-only">{profile.role}</span>
            <RotatingScramble
              phrases={ROLES}
              className="hero-role-rot mono"
              suffix="."
              suffixClassName="accent"
            />
          </h1>

          <p className="hero-prop lead rise" style={{ animationDelay: "0.14s" }}>
            {profile.valueProp}
          </p>

          <div className="hero-cta rise" style={{ animationDelay: "0.21s" }}>
            <Magnetic>
              <a className="btn btn-primary" href={profile.resumePdf} target="_blank" rel="noopener">
                <FileText size={17} /> Résumé
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="#contact">
                <Mail size={17} /> Contact
              </a>
            </Magnetic>
          </div>

          <div className="hero-avail rise" style={{ animationDelay: "0.28s" }}>
            <span className="dotpulse" aria-hidden />{" "}
            Open to opportunities
            <a className="pill" href={`mailto:${profile.email}`}>
              Let&apos;s talk
            </a>
          </div>
        </div>

        <div className="hero-portrait rise" style={{ animationDelay: "0.18s" }}>
          <div className="portrait-stage">
            <span className="ring-spin" aria-hidden />
            <span className="ring-pulse" aria-hidden />
            <span className="orbit-dot orbit-dot-a" aria-hidden />
            <span className="orbit-dot orbit-dot-b" aria-hidden />
            <div className="portrait-frame">
              <Image
                src="/headshot-cutout.webp"
                alt={`${profile.name}, ${profile.role}`}
                fill
                priority
                sizes="(max-width: 880px) 220px, 330px"
                className="portrait-img"
                style={{ objectPosition: "top center" }}
              />
            </div>
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#about" aria-label="Scroll to content">
        <span className="hero-scroll-mouse" aria-hidden>
          <span className="hero-scroll-wheel" />
        </span>
      </a>
    </section>
  );
}
