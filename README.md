# Faisal Nugraha Cayunda — Portfolio

Personal portfolio site. Next.js 16 (App Router) + TypeScript + Tailwind v4.
Design direction: **Calm Terminal** — dark navy + muted teal, with a light mode.

## Run

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
```

## Editing content

All copy lives in one place — never touch JSX to change wording:

- `src/data/index.ts` — profile, nav, about, skills, experience, projects.

> ⚠️ Replace the GitHub placeholder in `src/data/index.ts`:
> `github: "https://github.com/your-handle"` → your real handle.

## Assets (in `public/`)

- `headshot.webp` — circular hero photo (background removed from the formal shot)
- `headshot-cutout.webp` — transparent full cutout (spare)
- `resume.pdf`, `resume.docx`, `resume.md` — downloadable resume

To regenerate the headshot from a new source photo, edit and run
`../process_photo.py`, then re-export the webp into `public/`.

## Structure

```
src/
  app/        layout.tsx (fonts, theme script), page.tsx, globals.css
  components/
    sections/ Hero, About, Skills, Experience, Projects, Contact, Footer
    ui/       Nav, ThemeToggle, BrandIcons
    motion/   FadeIn (IntersectionObserver scroll reveal + failsafe)
  data/       index.ts (single source of content)
```

## Notes

- Theme is set before paint by an inline script (no flash), honors saved choice
  then OS preference; toggle persists to `localStorage`.
- Reveals use a custom IntersectionObserver with a failsafe timeout and a no-JS
  fallback, so content can never get stuck hidden.
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels) via `next/font`.

## Deploy

Vercel is the easiest path: push to GitHub, import the repo, deploy.
The site is fully static (all routes prerendered), so GitHub Pages or any static
host works too.
