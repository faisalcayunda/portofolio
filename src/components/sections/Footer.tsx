import { profile } from "@/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="mono footer-built">
          Built with Next.js &amp; Tailwind. Designed and coded by {profile.name}.
        </p>
        <p className="mono footer-meta">© {new Date().getFullYear()} · Bandung, ID</p>
      </div>
    </footer>
  );
}
