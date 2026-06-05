# Faisal Nugraha Cayunda, S.Kom.

Bandung, Indonesia (open to Jakarta / hybrid)
+62 821-1683-7950 | faisal.nugraha.c@gmail.com | linkedin.com/in/faisal-nugraha-cayunda-7b459324b

## Summary

Backend engineer with seven years building government data platforms at provincial and national scale, now leading backend architecture at a national data ecosystem company. I work mainly in Go and Python: REST APIs that let separate government agencies exchange data, plus the services behind open-data portals, executive dashboards, and payment gateways. Most of it runs on-premise under SPBE and Satu Data Indonesia rules, so I have spent a lot of time on LDAP/Active Directory integration, database-level encryption, and per-endpoint authorization. I take systems end to end, from schema and API contract design through search, caching, containerization, deployment, and the documentation that ships at go-live. Working knowledge of the data engineering stack (Airflow, dbt, PySpark, Trino) on top of a long backend track record.

## Skills

**Languages:** Go and Python primarily; also Java, C#, PHP, SQL
**Backend:** REST API design, microservices, distributed systems, service interoperability, message queues and brokers, asynchronous event-driven ingestion; FastAPI, Flask, Django, Echo, Fiber, Gin, Node.js/Express, Laravel, CodeIgniter, Spring Boot
**Databases and data:** PostgreSQL, MySQL, MongoDB, Redis (caching), MeiliSearch (full-text search); data pipelines (ETL/ELT), data warehousing; Airflow, dbt, PySpark, Trino
**Infrastructure:** Docker, Nginx, Ubuntu, S3 object storage, Git, GitHub Actions, CI/CD, Terraform/CDK, on-premise deployment
**Security:** LDAP / Active Directory authentication, token-based authentication, authorization and access control (RBAC, per-endpoint), database-level encryption, payment-gateway security
**Standards and docs:** SPBE, Satu Data Indonesia, government national application-development standards; API documentation

## Experience

### Lead Backend Engineer, IDEAS Data Ecosystem (PT Indonesian Data Ecosystem)
Jakarta, Indonesia (Hybrid) | Jan 2026 - Present

- Own the architecture for DataHub, a national government data platform built as microservices to Indonesia's national application-development standards. Personally designed the REST APIs, the LDAP/Active Directory authentication layer, and the database-level encryption that integrating agencies now consume.
- Architected real-time ingestion across multiple government and partner sources. Different agencies send the same data in different schemas, so reconciling those into one contract is the bulk of the work.
- Deployed the whole platform on-premise to meet government hosting requirements, with encryption for data at rest and documented APIs that other teams integrate against.
- Lead a cross-functional Go and Python team, and run architecture and performance reviews on PRs so problems get caught before release. Mentor engineers from junior to senior.

### Backend Engineer, Jabar Digital Service / Diskominfo Provinsi Jawa Barat (UPTD PLDDIG)
Bandung | Jun 2022 - Dec 2025

- Built and maintained the backends for West Java's main government data products under SPBE policy: Satu Data Jabar, Open Data Jabar, the APBD regional-budget Executive Dashboard, and the Portal Data Kabupaten/Kota.
- Designed the REST APIs that let regional agencies (OPD) publish and consume each other's datasets under a shared Satu Data contract, standardizing schemas and field naming so a dataset published once meant the same thing across agencies.
- Implemented per-endpoint access control so each agency reached only the datasets it was cleared for, with token-based authentication and data encryption across the platform.
- Ran the data layer on PostgreSQL and MongoDB, added MeiliSearch for dataset search, Redis for caching, and S3 for object storage. Containerized services with Docker and served them through Nginx on Ubuntu.
- Wrote the architecture docs, API specs, and deployment guides, and supported each platform through go-live.

### Backend Developer (Contract), PT Reka Cipta Solusi
Bandung | Jun 2021 - Jun 2022

- Developed and maintained payment-gateway backends in Java, mostly on a custom in-house framework, with Spring Boot where it fit.
- Built the integrations connecting client systems to the gateway over APIs, with security testing on the transaction path before every release.
- Applied strict information-security controls on payment processing, including input validation and tight handling of every path that touched live transactions.

### Backend Developer (Contract), PT Trikintech Inteligensi Bisnis
Kabupaten Bandung | Oct 2018 - Jun 2021

- Built on-premise government web apps for collecting both structured and unstructured data, with internal authentication since the systems ran air-gapped with no external identity provider.
- Built a real-time validation engine that rejected malformed and out-of-range records at ingest, and put a message broker and queue in front of it so traffic spikes did not drop data.
- Designed databases for cross-unit interoperability, with database-level encryption throughout.

### Senior Educator, Coding Bee Academy
Bandung | Feb 2020 - Jun 2022 (part-time, concurrent with contract work)

- Taught backend, frontend, and game development (JavaScript, Python, Node.js, C#, MySQL), which kept my fundamentals sharp and made me better at explaining systems to non-experts.

### Full-stack Developer, PT JAPINDO
Karawang | Oct 2018 - Jan 2020

- Built and maintained web applications end to end with Laravel, PHP, Bootstrap, and HTML.

Note: the contract and teaching engagements from 2018 to 2022 ran concurrently with full-time roles.

## Projects

- **Portal Data Kabupaten/Kota:** District and city data platform with MeiliSearch full-text search, Redis caching, and S3 object storage. Python, FastAPI, PostgreSQL, Docker.
- **Satu Data Jabar / Open Data Jabar:** Province-wide public dataset platforms. Python, Flask, MeiliSearch, PostgreSQL; Docker, Nginx, Ubuntu.
- **Executive Dashboard Jabar:** APBD, tax, and key-metric monitoring for government decision-makers. Python, Flask.
- **SIPS Forestry System:** Centralized forestry data platform with analytics for sustainable resource management.
- **Sapta Portal Job:** Internal LinkedIn-style job platform. React front end, Express.js back end.
- **Earlier work:** Finance web app in Laravel; JavaFX parking-management desktop app; freelance web apps in Laravel and CodeIgniter.

## Education

**Bachelor's Degree (S1), Computer Science**
Universitas Langlangbuana, Bandung, Indonesia
