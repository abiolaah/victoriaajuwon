# Portfolio

A personal portfolio and admin dashboard built with Next.js. The site showcases projects, skills, work experience, and education—filterable by role (Product Manager, Web Developer, QA Engineer)—and includes a contact form and a full admin area for managing content.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Learn More](#learn-more)

---

## Overview

This is a **Next.js 16** application that serves two main areas:

1. **Public site** — A portfolio for Oluwapelumi Victoria Ajuwon with a hero banner, role-based filtering (Product Manager, Web Developer, QA Engineer), project and skill cards, experience/history, and a contact form that sends email via a server action.
2. **Admin dashboard** — A protected area to manage summary, professional history (work experience and education), skills, and projects. Admin views use modals and forms (with validation via Zod and React Hook Form) and support image uploads via Cloudinary.

---

## Features

- **Home** — Animated banner with role selector and typewriter-style intro; projects and skills filtered by selected role (Product Manager, Web Developer, QA Engineer, or All).
- **History (Experience)** — Public experience page; admin can add/edit/delete work experience and education with date ranges, descriptions, and images.
- **Contact** — Contact form with validation; submissions are sent via Nodemailer (server action) and use React Email templates.
- **Admin dashboard** — Overview with key metrics, charts, recent activity, and breakdowns for projects and skills.
- **Admin Summary** — Edit profile/summary content.
- **Admin History** — Manage work experience and education (CRUD) with modals, form validation, and optional image uploads.
- **Admin Skills** — Manage skills (categories, types, images) with add/edit flows.
- **Admin Projects** — Manage projects (title, description, links, images, roles with skills/tech stack, status, dates) via a multi-step form and modals.

Image uploads use **Next Cloudinary** (Cloudinary) for projects, skills, and professional/education assets.

---

## Tech Stack

| Category           | Technologies                                                     |
| ------------------ | ---------------------------------------------------------------- |
| Framework          | Next.js 16 (App Router), React 19                                |
| Styling            | Tailwind CSS 4                                                   |
| UI components      | Radix UI (Dialog, Select, Tabs, Slider, etc.), custom components |
| Forms & validation | React Hook Form, Zod, `@hookform/resolvers`                      |
| Animation          | Motion (Framer Motion fork)                                      |
| Images             | Next.js Image, Next Cloudinary                                   |
| Email              | Nodemailer, React Email                                          |
| State              | Zustand (optional), React state                                  |
| Icons              | Lucide React, React Icons                                        |
| Utilities          | date-fns, clsx, tailwind-merge, CUID2                            |

---

## Project Structure

```
portfolio/
├── src/
│   ├── action/           # Server actions (e.g. sendEmail)
│   ├── app/               # Next.js App Router
│   │   └── (main)/
│   │       ├── admin/     # Admin dashboard routes
│   │       │   ├── (dashboard)/  # /admin
│   │       │   ├── history/      # /admin/history
│   │       │   ├── projects/    # /admin/projects
│   │       │   ├── skills/      # /admin/skills
│   │       │   └── summary/      # /admin/summary
│   │   ├── contact/      # /contact
│   │   └── experience/    # /experience (History)
│   ├── components/
│   │   ├── admin/         # Admin forms, views, modals, dashboard
│   │   ├── ui/            # Reusable UI primitives
│   │   ├── banner.tsx     # Home hero
│   │   ├── header.tsx     # Nav (public vs admin)
│   │   ├── home-view.tsx  # Home layout
│   │   ├── role-section.tsx # Role-filtered projects/skills
│   │   └── ...
│   ├── emails/            # React Email templates
│   ├── hooks/
│   ├── lib/               # Constants, data, utils, types
│   └── types/             # Zod schemas and TS types
├── public/
├── package.json
└── README.md
```

---

## Getting Started

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd portfolio
   npm install
   ```

2. **Configure environment** (see [Environment Variables](#environment-variables)).

3. **Run the dev server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
   - **Public:** Home, History (`/experience`), Contact (`/contact`).
   - **Admin:** Go to `/admin` for the dashboard; use the header links for Summary, History, Skills, and Projects.

---

## Environment Variables

For the contact form and email sending, configure SMTP (e.g. in `.env.local`):

| Variable        | Description                  | Example              |
| --------------- | ---------------------------- | -------------------- |
| `SMTP_HOST`     | SMTP server                  | `smtp.gmail.com`     |
| `SMTP_PORT`     | SMTP port                    | `465`                |
| `SMTP_USER`     | SMTP user / email            | your-email@gmail.com |
| `SMTP_PASSWORD` | SMTP password / app password | your-app-password    |

For Cloudinary uploads, ensure Next Cloudinary is configured (e.g. `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and any required env vars per `next-cloudinary` docs).

---

## Scripts

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Start dev server        |
| `npm run build` | Production build        |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint              |

---

## Deployment

The app can be deployed anywhere that supports Next.js (e.g. **Vercel**). Set the same environment variables in your deployment platform. For static-friendly routes, Next.js will optimize as per your config.

- [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel](https://vercel.com/new) — straightforward option for Next.js

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub repository](https://github.com/vercel/next.js)
