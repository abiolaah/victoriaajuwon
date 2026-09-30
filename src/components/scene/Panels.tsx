// components/scene/panels.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Hexagon, Mail, ExternalLink } from "lucide-react";
import { FaLinkedin as Linkedin } from "react-icons/fa";
import { IoLogoGithub as Github } from "react-icons/io";

import {
  aboutContent,
  projectDetails,
  sceneExtras,
  type Hotspot,
  type Planet,
} from "@/lib/planets";
import { Button } from "../ui/button";

const glass = "rounded-2xl border border-white/15 bg-slate-950/55";

/** Glass hologram panel used inline (no overlay) on every scene below. */
// function Hologram({
//   eyebrow,
//   title,
//   className = "",
//   children,
// }: {
//   eyebrow?: string;
//   title?: string;
//   className?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className={`relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-slate-950/55 p-6 shadow-[0_0_60px_rgba(34,211,238,0.2)] backdrop-blur-xl ${className}`}
//     >
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.06)_50%)] bg-size-[100%_4px]"
//       />
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300 to-transparent"
//       />
//       {eyebrow && (
//         <p className="relative text-[0.65rem] uppercase tracking-[0.3em] text-cyan-300/80">
//           {eyebrow}
//         </p>
//       )}
//       {title && (
//         <h2 className="relative mt-1 text-xl font-semibold">{title}</h2>
//       )}
//       <div className="relative mt-4">{children}</div>
//     </div>
//   );
// }

/**
 * Glass hologram panel used inline (no overlay) on every scene below.
 * "Liquid glass": a glassmorphic blur + translucency, layered with
 * neumorphic inset highlights/shadows so the edge catches light like a
 * curved pane, plus a soft ambient glow and a top specular streak.
 */
function Hologram({
  eyebrow,
  title,
  className = "",
  children,
}: {
  eyebrow?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-[28px] border border-white/25 bg-white/8 p-6 backdrop-blur-2xl backdrop-saturate-150 [box-shadow:0_20px_50px_-12px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.04)] ${className}`}
    >
      {/* Ambient colour glow, as if light is passing through the glass */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-cyan-300/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-12 h-32 w-32 rounded-full bg-white/10 blur-3xl"
      />
      {/* Top specular highlight, the curved-edge "liquid" catch-light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent"
      />
      {/* Soft diagonal sheen across the glass */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/15 via-white/0 to-white/0"
      />

      {eyebrow && (
        <p className="relative text-[0.65rem] uppercase tracking-[0.3em] text-cyan-100/80">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="relative mt-1 text-xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
          {title}
        </h2>
      )}
      <div className="relative mt-4">{children}</div>
    </div>
  );
}

function ItemList({
  items,
  selected,
  onSelect,
}: {
  items: Hotspot[];
  selected: Hotspot | null;
  onSelect: (item: Hotspot) => void;
}) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.title}>
          <button
            type="button"
            onClick={() => onSelect(item)}
            className={`${glass} flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:border-cyan-300/60 hover:bg-slate-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
              selected?.title === item.title
                ? "border-cyan-300/70 bg-slate-900/70"
                : ""
            }`}
          >
            <Hexagon size={16} className="text-cyan-300" />
            {item.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------- About ---------------------------- */

function About() {
  const [mode, setMode] = useState<"intro" | "story">("intro");

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[20rem_1fr]">
      <div className={`${glass} p-6`}>
        <h2 className="text-2xl font-semibold">Hi, I&apos;m Victoria Ajuwon</h2>
        <p className="mt-4 text-sm leading-6 text-white/80">
          A software engineer with a passion for building reliable, user-focused
          solutions. I bring together product thinking, quality mindset and
          technical skills to create meaningful impact.
        </p>
        <button
          type="button"
          onClick={() => setMode(mode === "intro" ? "story" : "intro")}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/10"
        >
          {mode === "intro" ? "Explore my story" : "Back to profile"}{" "}
          <ArrowRight size={14} />
        </button>
      </div>

      {mode === "intro" ? (
        <Hologram eyebrow="Profile" title="Snapshot" className="lg:min-h-112">
          <div className="space-y-5 text-sm leading-6 text-white/80">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-300/70">
                Who am I?
              </p>
              <p className="mt-1">{aboutContent.whoAmI}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-300/70">
                How I work
              </p>
              <p className="mt-1">{aboutContent.howIWork}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-300/70">
                Beyond work
              </p>
              <p className="mt-1">{aboutContent.beyondWork}</p>
            </div>
          </div>
        </Hologram>
      ) : (
        <Hologram
          eyebrow="Profile"
          title="Education & Experience"
          className="lg:min-h-112"
        >
          <div className="space-y-5 text-sm leading-6 text-white/80">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-300/70">
                Education
              </p>
              <ul className="mt-2 space-y-3">
                {aboutContent.education.map((entry) => (
                  <li key={entry.title}>
                    <p className="font-medium text-white">{entry.title}</p>
                    <p className="text-xs text-white/55">{entry.period}</p>
                    <p className="mt-1">{entry.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-300/70">
                Experience
              </p>
              <ul className="mt-2 space-y-3">
                {aboutContent.experience.map((entry) => (
                  <li key={entry.title}>
                    <p className="font-medium text-white">{entry.title}</p>
                    <p className="text-xs text-white/55">{entry.period}</p>
                    <p className="mt-1">{entry.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Hologram>
      )}
    </div>
  );
}

/* --------------------------- Product ---------------------------- */

function Product({ items, intro }: { items: Hotspot[]; intro: string }) {
  const [selected, setSelected] = useState<Hotspot | null>(null);
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[13rem_1fr]">
      <div className="lg:self-center">
        <ItemList items={items} selected={selected} onSelect={setSelected} />
      </div>
      <Hologram
        eyebrow="Product"
        title={selected?.title ?? "Product Strategy"}
        className="lg:min-h-96"
      >
        <p className="text-sm leading-6 text-white/80">
          {selected?.content ?? intro}
        </p>
      </Hologram>
    </div>
  );
}

/* ------------------------- Development --------------------------- */

function Development({ items, intro }: { items: Hotspot[]; intro: string }) {
  const [selected, setSelected] = useState<Hotspot | null>(null);
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr]">
      <Hologram eyebrow="Development" title={selected?.title ?? "Stack"}>
        <p className="text-sm leading-6 text-white/80">
          {selected?.content ?? intro}
        </p>
      </Hologram>

      <div className="flex flex-col gap-4">
        <div className={`${glass} flex-1 overflow-hidden`}>
          <div className="flex gap-6 border-b border-white/10 px-5 py-3 text-xs">
            <span className="border-b border-cyan-300 pb-2 text-white">
              Code
            </span>
            <span className="text-white/50">Live Preview</span>
          </div>
          <pre className="overflow-x-auto p-5 text-xs leading-6 text-cyan-100">{`const app = express();
 
app.get("/", (req, res) => {
  res.json({
    message: "Building great things!",
  });
});`}</pre>
        </div>
        <div className="flex-1">
          <ItemList items={items} selected={selected} onSelect={setSelected} />
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Testing ------------------------------ */

function Testing({ items, intro }: { items: Hotspot[]; intro: string }) {
  const [selected, setSelected] = useState<Hotspot | null>(null);
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[13rem_1fr_16rem]">
      <ItemList items={items} selected={selected} onSelect={setSelected} />

      <Hologram
        eyebrow="Testing"
        title={selected?.title ?? "Quality Approach"}
        className="lg:min-h-94"
      >
        <p className="text-sm leading-6 text-white/80">
          {selected?.content ?? intro}
        </p>
      </Hologram>

      <div className={`${glass} p-5`}>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">
          Test Results
        </h2>
        <div className="mt-4 flex items-center gap-5">
          <div className="relative h-24 w-24 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255,255,255,.15)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#34d399"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="258.6 263.9"
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-xl font-semibold">
              98%
            </span>
          </div>
          <dl className="flex-1 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-emerald-300">Passed</dt>
              <dd>247</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-red-400">Failed</dt>
              <dd>3</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-amber-300">Skipped</dt>
              <dd>5</dd>
            </div>
          </dl>
        </div>
        <div className="mt-4">
          <p className="rounded-lg bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300 text-center">
            All tests passed
          </p>
          <Button className="mt-3 w-full rounded-lg border border-white/50 py-2 text-xs bg-white/50">
            View Results
          </Button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Projects ------------------------------ */

function Projects({ objects }: { objects: Planet["objects"] }) {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const selected = objects.find((o) => o.title === selectedTitle) ?? null;
  const detail = selectedTitle ? projectDetails[selectedTitle] : undefined;
  const others = objects.filter((o) => o.title !== selectedTitle);

  if (!selected || !detail) {
    return (
      <div className="grid gap-4 md:grid-cols-3 lg:ml-auto lg:max-w-3xl">
        {objects.map((project) => (
          <article key={project.id} className={`${glass} flex flex-col p-5`}>
            <h2 className="text-base font-semibold">{project.title}</h2>
            <p className="mt-2 flex-1 text-xs leading-5 text-white/75">
              {project.content}
            </p>
            <button
              type="button"
              onClick={() => setSelectedTitle(project.title)}
              className="mt-4 inline-flex items-center gap-2 self-start rounded-lg border border-white/25 px-3 py-2 text-xs hover:bg-white/10"
            >
              View Project <ArrowRight size={12} />
            </button>
          </article>
        ))}
      </div>
    );
  }

  return (
    <>
      <Hologram eyebrow="Project" title={selected.title} className="max-w-xl">
        <p className="text-sm leading-6 text-white/80">{detail.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {detail.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-cyan-300/40 px-3 py-1 text-xs text-cyan-100"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={detail.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-3 py-2 text-xs hover:bg-white/10"
          >
            <Github size={14} /> GitHub
          </a>
          {detail.demoUrl && (
            <a
              href={detail.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 px-3 py-2 text-xs text-cyan-100 hover:bg-cyan-400/10"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
        <button
          type="button"
          onClick={() => setSelectedTitle(null)}
          className="mt-5 text-xs text-white/60 underline underline-offset-4 hover:text-white"
        >
          ← All projects
        </button>
      </Hologram>

      {/* Other projects, tucked as icons at the right edge of the scene */}
      <div className="fixed right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 md:right-8">
        {others.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setSelectedTitle(project.title)}
            title={project.title}
            aria-label={`View ${project.title}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-slate-950/70 text-[0.6rem] font-semibold uppercase text-white/85 backdrop-blur-sm transition hover:border-cyan-300/60 hover:text-white"
          >
            {project.title.slice(0, 2)}
          </button>
        ))}
      </div>
    </>
  );
}

/* ---------------------------- Skills -------------------------------- */

function Skills({ items, intro }: { items: Hotspot[]; intro: string }) {
  const [selected, setSelected] = useState<Hotspot | null>(null);

  const nodes = items.map((item, i) => {
    const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
    return { item, x: 50 + 38 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) };
  });

  return (
    <div className="grid items-center gap-8 lg:-ml-8 lg:grid-cols-[1fr_18rem]">
      <div className="relative mx-auto aspect-square w-full max-w-sm">
        {/* Web/network lines from the centre to each skill */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {nodes.map(({ item, x, y }) => (
            <line
              key={item.title}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke={
                selected?.title === item.title
                  ? "rgba(34,211,238,0.8)"
                  : "rgba(255,255,255,0.2)"
              }
              strokeWidth="0.4"
            />
          ))}
          {nodes.map((a, i) =>
            nodes
              .slice(i + 1)
              .map((b) => (
                <line
                  key={`${a.item.title}-${b.item.title}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.25"
                />
              )),
          )}
        </svg>

        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />

        {nodes.map(({ item, x, y }) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setSelected(item)}
            style={{ left: `${x}%`, top: `${y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-[0.65rem] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
              selected?.title === item.title
                ? "border-cyan-300 bg-slate-900 text-white"
                : "border-white/25 bg-slate-950/85 text-white/85 hover:border-cyan-300/70"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <Hologram
        eyebrow="Skills"
        title={selected?.title ?? "Always learning. Always building."}
      >
        <p className="text-sm leading-6 text-white/80">
          {selected?.content ?? intro}
        </p>
      </Hologram>
    </div>
  );
}

/* --------------------------- Contact --------------------------------- */

function Contact() {
  const inputClass =
    "w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300";
  return (
    <div className={`${glass} mx-auto grid max-w-3xl gap-8 p-6 md:grid-cols-2`}>
      <div>
        <h2 className="text-xl font-semibold">Get in touch</h2>
        <p className="mt-2 text-xs leading-5 text-white/70">
          Have a project in mind, an opportunity, or just want to say hello?
          I&apos;d love to hear from you.
        </p>
        <ul className="mt-5 space-y-3 text-xs">
          <li className="flex items-center gap-3">victoria.ajuwon@gmail.com</li>
          <li className="flex items-center gap-3">
            linkedin.com/in/victoria-ajuwon
          </li>
          <li className="flex items-center gap-3">github.com/abiolash</li>
        </ul>
      </div>
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          // TODO: call your sendEmail server action here
        }}
      >
        <input
          className={inputClass}
          name="name"
          placeholder="Name"
          aria-label="Name"
          required
        />
        <input
          className={inputClass}
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          required
        />
        <textarea
          className={`${inputClass} min-h-24`}
          name="message"
          placeholder="Message"
          aria-label="Message"
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg border border-cyan-300/50 bg-cyan-400/10 py-2.5 text-sm hover:bg-cyan-400/20"
        >
          Send Message →
        </button>
      </form>
    </div>
  );
}

/* ----------------------------- Router --------------------------------- */

export function PlanetPanel({ planet }: { planet: Planet }) {
  const extras = sceneExtras[planet.slug];
  const items = extras?.items ?? [];
  const intro = extras?.intro ?? "";

  switch (planet.slug) {
    case "about":
      return <About />;
    case "product":
      return <Product items={items} intro={intro} />;
    case "development":
      return <Development items={items} intro={intro} />;
    case "testing":
      return <Testing items={items} intro={intro} />;
    case "projects":
      return <Projects objects={planet.objects} />;
    case "skills":
      return <Skills items={items} intro={intro} />;
    case "contact":
      return <Contact />;
    default:
      return null;
  }
}
