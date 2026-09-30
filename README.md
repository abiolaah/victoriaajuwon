# Astronaut Portfolio — MVP Starter

A cinematic, data-driven portfolio where each portfolio section is represented as a planet.
The MVP uses accessible HTML/CSS with layered scene artwork and GSAP-ready animation hooks.
3D with React Three Fiber is intentionally deferred to post-MVP.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Zod
- GSAP
- Motion
- Playwright
- Vitest

## Included

- Seven-planet content specification
- Full Prisma database schema
- Cinematic home page
- Reusable full planet page
- Example About planet route
- Responsive and reduced-motion behavior

## Suggested setup

```bash
npx create-next-app@latest astronaut-portfolio --typescript --tailwind --eslint --app --src-dir
cd astronaut-portfolio
npm install prisma @prisma/client zod gsap motion
npm install -D vitest playwright
```

Then copy the `src`, `prisma`, and `docs` directories from this package into the generated project.

Create `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/astronaut_portfolio"
```

Initialize Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
```
