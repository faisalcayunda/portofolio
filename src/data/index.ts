// Single source of content for the site. Edit here, never in JSX.

export const profile = {
  name: "Faisal Nugraha Cayunda",
  shortName: "FNC",
  role: "Software Engineer",
  focus: "backend & data platforms",
  location: "Bandung, Indonesia",
  email: "faisal.nugraha.c@gmail.com",
  phone: "+62 821-1683-7950",
  linkedin: "https://linkedin.com/in/faisal-nugraha-cayunda-7b459324b",
  github: "https://github.com/faisalcayunda",
  resumePdf: "/resume.pdf?v=3", // bump when resume.pdf is regenerated to bust browser cache
  valueProp:
    "I build the backends and data pipelines behind Indonesian government data platforms: the APIs that move data between agencies, the auth that locks it down, the parts nobody sees. Seven years of it, mostly in Go and Python.",
} as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  paragraphs: [
    "Most of my work is the part of government tech nobody photographs: the APIs that let agencies actually exchange data, the auth keeping it locked down, and deployments that have to survive an on-premise data center with no managed services to fall back on.",
    "Right now I lead backend architecture at a national data-ecosystem company. Before that I built the services behind West Java's open-data and dashboard platforms. Same habit each time: get it correct, then make it fast, then write it down so the next person isn't reverse-engineering my code at midnight.",
    "I care about data being right, services staying up, and code a teammate can still follow six months later. I taught for a couple of years too, which is probably why I'll keep reworking an explanation until it finally sounds obvious.",
  ],
  highlights: [
    "7 years on government & national-scale data platforms",
    "Go and Python backends; Trino and Postgres for data",
    "Built for SPBE / Satu Data Indonesia interoperability",
  ],
} as const;

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  { title: "Languages", items: ["Go", "Python", "Java", "SQL", "C#", "PHP"] },
  {
    title: "APIs & services",
    items: ["FastAPI", "Flask", "Django", "REST", "Microservices", "Message queues"],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "Trino", "MongoDB", "Redis", "MeiliSearch", "Airflow", "dbt", "PySpark"],
  },
  {
    title: "Infrastructure",
    items: ["Docker", "CI/CD", "GitHub Actions", "Nginx", "Ubuntu", "S3", "On-premise"],
  },
  {
    title: "Security",
    items: ["LDAP / Active Directory", "Token auth", "RBAC", "DB-level encryption"],
  },
];

export type Job = {
  company: string;
  title: string;
  period: string;
  location: string;
  contract?: boolean;
  bullets: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    company: "IDEAS Data Ecosystem",
    title: "Lead Backend Engineer",
    period: "Jan 2026 — Present",
    location: "Jakarta · Hybrid",
    bullets: [
      "Own the architecture for DataHub, a national government data platform built as microservices. I designed the REST APIs, the LDAP/Active Directory auth, and the database-level encryption that integrating agencies build against.",
      "Built the real-time ingestion across several agency and partner sources. Everyone sends the same data in a different shape, so most of the work is reconciling it into one contract.",
      "Lead a small Go and Python team, review architecture and performance on PRs, and mentor engineers from junior up to senior.",
    ],
    stack: ["Go", "Python", "REST", "LDAP/AD", "Docker", "On-prem"],
  },
  {
    company: "Jabar Digital Service · Diskominfo Jawa Barat",
    title: "Backend Engineer",
    period: "Jun 2022 — Dec 2025",
    location: "Bandung",
    bullets: [
      "Built and ran the backends for West Java's main government data products under SPBE: Satu Data Jabar, Open Data Jabar, the APBD Executive Dashboard, and the district/city portal.",
      "Designed the REST APIs that let regional agencies publish and consume each other's datasets on one shared contract, so a dataset published once meant the same thing everywhere.",
      "Added per-endpoint access control with token auth and encryption, and ran the data layer on PostgreSQL and MongoDB with MeiliSearch, Redis, and S3.",
    ],
    stack: ["Python", "FastAPI", "Flask", "PostgreSQL", "MongoDB", "Redis", "MeiliSearch", "Docker"],
  },
  {
    company: "PT Reka Cipta Solusi",
    title: "Backend Developer",
    period: "Jun 2021 — Jun 2022",
    location: "Bandung",
    contract: true,
    bullets: [
      "Built and maintained payment-gateway backends in Java, mostly on an in-house framework with Spring Boot where it fit.",
      "Wrote the integrations between client systems and the gateway, and ran security testing on the transaction path before every release.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "SQL"],
  },
  {
    company: "PT Trikintech Inteligensi Bisnis",
    title: "Backend Developer",
    period: "Oct 2018 — Jun 2021",
    location: "Kabupaten Bandung",
    contract: true,
    bullets: [
      "Built on-premise government web apps for collecting structured and unstructured data, with internal auth since the systems ran air-gapped.",
      "Wrote a real-time validation engine that rejected bad records at ingest, with a message broker in front so a traffic spike couldn't drop data.",
    ],
    stack: ["Backend", "Message broker", "On-prem", "RDBMS"],
  },
];

export const earlier =
  "Earlier: Senior Educator at Coding Bee Academy (2020–2022, taught backend, frontend, and game dev) and Full-stack Developer at PT JAPINDO (2018–2020, Laravel/PHP).";

export type Project = {
  name: string;
  blurb: string;
  role: string;
  stack: string[];
  note?: string;
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    name: "DataHub",
    blurb:
      "A national data platform, built as a set of microservices. I own the architecture, the REST APIs, the LDAP auth, and the encryption other agencies build against.",
    role: "Lead · architecture & APIs",
    stack: ["Go", "Python", "REST", "LDAP/AD", "Docker"],
    note: "Government platform · confidential",
  },
  {
    name: "Master Data Service",
    blurb:
      "The read API for master data, rewritten from Rust to Go. I split the read and write paths into clean interfaces, hardened the auth, and kept it quick.",
    role: "Backend · lead migration",
    stack: ["Go", "chi", "pgx", "PostgreSQL", "OpenTelemetry"],
    note: "Government platform · confidential",
  },
  {
    name: "One-Map Geospatial Platform",
    blurb:
      "A geospatial mapset API: PostGIS queries, choropleths built on the fly, and access control that goes down to the data's classification level.",
    role: "Backend",
    stack: ["Python", "FastAPI", "PostGIS", "Shapely", "MinIO"],
    note: "Government platform · confidential",
  },
  {
    name: "Column & Row-Level Security",
    blurb:
      "Each consumer sees only the columns and rows they're cleared for. The tricky part was masking that stays type-correct, so a masked date doesn't break the query.",
    role: "Data engineering",
    stack: ["Trino", "SQL", "Access policies"],
    note: "Sensitive citizen data · confidential",
  },
  {
    name: "City & District Data Portal",
    blurb:
      "Backend for a district and city open-data portal. Search, caching, and object storage so publishing a dataset stays a quick job, not a project.",
    role: "Backend",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "S3", "Docker"],
    note: "Government platform · internal",
  },
  {
    name: "Pesona Hub Digi",
    blurb:
      "A digital data-hub platform built as a feature-sliced FastAPI monolith: clean module boundaries, dependency injection, and object storage, with a Nuxt/Vue front end on top.",
    role: "Backend · architecture",
    stack: ["Python", "FastAPI", "SQLModel", "MySQL", "Redis", "MinIO", "Nuxt"],
    note: "Data-hub platform",
  },
  {
    name: "Satu Data Jabar & Open Data Jabar",
    blurb:
      "West Java's two public open-data platforms, both running on one shared interoperability contract.",
    role: "Backend",
    stack: ["Python", "Flask", "MeiliSearch", "PostgreSQL", "Nginx"],
    note: "Public government platform",
  },
  {
    name: "Cirebon Open-Data Portal",
    blurb:
      "The public front end for a city's open-data portal: interactive data visualizations, animated sections, and server-state caching, built on Next.js and React.",
    role: "Frontend",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "TanStack Query"],
    note: "Public government portal",
  },
  {
    name: "Regional Open-Data Portals",
    blurb:
      "One modular backend that several regional portals reuse, so standing up a new region is mostly config instead of a rewrite.",
    role: "Backend",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "MinIO", "Docker"],
    note: "Government platforms · multiple regions",
  },
  {
    name: "Data Sync Pipeline",
    blurb:
      "An Airflow pipeline that keeps master records in sync across systems: idempotent runs, conflict rules, and staged loads so one bad batch can't corrupt the rest.",
    role: "Data engineering",
    stack: ["Airflow", "Python", "PostgreSQL", "ETL"],
    note: "Government platform · confidential",
  },
  {
    name: "Executive Dashboard",
    blurb:
      "A live read on regional budget, tax, and the handful of metrics decision-makers actually ask about.",
    role: "Backend",
    stack: ["Python", "Flask", "PostgreSQL"],
    note: "Government platform · internal",
  },
  {
    name: "Modular ERP",
    blurb:
      "An ERP where feature modules load at runtime, so adding one doesn't mean a redeploy. FastAPI underneath, React for the admin side.",
    role: "Solo · architecture",
    stack: ["Python", "FastAPI", "React", "Plugin loader"],
    note: "Personal project",
  },
  {
    name: "Reporting Telegram Bot",
    blurb:
      "Turns Google Sheets into reports on demand, inside Telegram. Fully async, with retries and a small SQLite store so it remembers state across restarts.",
    role: "Backend · solo",
    stack: ["Python", "python-telegram-bot", "SQLite", "httpx"],
    note: "Internal tool",
  },
  {
    name: "Email Scheduling Service",
    blurb:
      "A background job service that queues and sends emails at scheduled times: Celery workers behind a Redis broker, with Flask and Postgres for the API and state.",
    role: "Backend · solo",
    stack: ["Python", "Flask", "Celery", "Redis", "PostgreSQL", "Docker"],
    note: "Personal project",
  },
  {
    name: "Sapta Job Portal",
    blurb: "An internal, LinkedIn-style job board for one company. React on the front, Express behind it.",
    role: "Backend",
    stack: ["React", "Express.js"],
  },
  {
    name: "SIPS Forestry System",
    blurb: "Pulls forestry data into one place and adds the analytics for managing it sustainably.",
    role: "Full-stack",
    stack: ["Web", "Analytics"],
  },
];

export type Principle = { icon: string; title: string; desc: string };

export const principles: Principle[] = [
  {
    icon: "checkcheck",
    title: "Correctness first",
    desc: "Get the data right before making it fast. A wrong number that loads in 50ms is still wrong.",
  },
  {
    icon: "shield",
    title: "Secure by default",
    desc: "Auth, encryption, and least privilege from day one, not bolted on after a review fails.",
  },
  {
    icon: "box",
    title: "Boring on purpose",
    desc: "Proven patterns over clever code. The next engineer should read it without me in the room.",
  },
  {
    icon: "plug",
    title: "Built to interoperate",
    desc: "Clean REST contracts and shared schemas so separate agencies' systems actually talk.",
  },
  {
    icon: "activity",
    title: "Observable",
    desc: "Logs, metrics, and traces so a production issue is something I can diagnose, not guess at.",
  },
  {
    icon: "filetext",
    title: "Written down",
    desc: "The architecture notes and deploy guide ship with the code, not six months later.",
  },
];
