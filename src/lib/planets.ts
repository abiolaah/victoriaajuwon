export type Planet = {
  slug: string;
  title: string;
  subtitle: string;
  /** Short line shown under the label when the planet is active */
  tagline: string;
  description: string;
  /** Planet artwork (square PNG with transparent background) */
  image: string;
  /**
   * Desktop layout only. size: planet width in vw. offset: top offset in vh,
   * which staggers the planets like the reference design.
   */
  display: { size: number; offset: number };
  theme: string;
  accent: string;
  environment: string;
  objects: {
    id: string;
    title: string;
    type: string;
    x: number;
    y: number;
    content: string;
  }[];
};

export const planets: Planet[] = [
  {
    slug: "about",
    title: "Origin",
    subtitle: "About",
    tagline: "The person behind the work",
    description:
      "The starting point of the mission: background, education, experience and the story behind the work.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790564662/planet-1_zvhudw.png",
    display: { size: 5, offset: 0 },
    theme: "from-orange-950 via-orange-700 to-amber-400",
    accent: "amber",
    environment:
      "A rocky sunrise world with an observatory and mission beacon.",
    objects: [
      {
        id: "beacon",
        title: "Mission Beacon",
        type: "beacon",
        x: 20,
        y: 62,
        content: "A concise professional introduction and current mission.",
      },
      {
        id: "timeline",
        title: "Career Timeline",
        type: "timeline",
        x: 68,
        y: 42,
        content: "Product, support, development and QA milestones.",
      },
      {
        id: "observatory",
        title: "Education Observatory",
        type: "education",
        x: 82,
        y: 68,
        content: "Education, certifications and continuous learning.",
      },
    ],
  },
  {
    slug: "product",
    title: "Discovery",
    subtitle: "Product",
    tagline: "Ideas shaped into experiences",
    description:
      "A futuristic product city showing discovery, requirements, roadmaps and measurable outcomes.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790564729/planet-2_jyv2gz.png",
    display: { size: 5.5, offset: 3 },
    theme: "from-cyan-950 via-sky-700 to-cyan-300",
    accent: "cyan",
    environment:
      "A futuristic city with a research tower and floating roadmap displays.",
    objects: [
      {
        id: "research",
        title: "User Research Lab",
        type: "lab",
        x: 23,
        y: 55,
        content: "Personas, surveys, interviews and user needs.",
      },
      {
        id: "roadmap",
        title: "Roadmap Tower",
        type: "tower",
        x: 56,
        y: 34,
        content: "Prioritization, roadmaps and product planning.",
      },
      {
        id: "requirements",
        title: "Requirements Console",
        type: "console",
        x: 79,
        y: 58,
        content:
          "User stories, acceptance criteria and delivery collaboration.",
      },
    ],
  },
  {
    slug: "development",
    title: "Forge",
    subtitle: "Development",
    tagline: "Interfaces built with precision",
    description:
      "A technical world for software engineering, architecture, APIs, data and deployment.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790564729/planet-3_pettnj.png",
    display: { size: 6.5, offset: 6 },
    theme: "from-blue-950 via-blue-800 to-indigo-400",
    accent: "blue",
    environment:
      "A blue technology planet with code structures and deployment pads.",
    objects: [
      {
        id: "terminal",
        title: "Code Terminal",
        type: "terminal",
        x: 20,
        y: 55,
        content:
          "TypeScript, JavaScript, Java, Python and modern web development.",
      },
      {
        id: "architecture",
        title: "Architecture Core",
        type: "core",
        x: 52,
        y: 34,
        content: "Application architecture, APIs and data flows.",
      },
      {
        id: "deployment",
        title: "Deployment Pad",
        type: "pad",
        x: 80,
        y: 62,
        content: "Docker, CI/CD and cloud deployment concepts.",
      },
    ],
  },
  {
    slug: "testing",
    title: "Validation",
    subtitle: "Testing",
    tagline: "Quality in every step",
    description:
      "A QA research facility where automation, API, performance, accessibility and database testing become interactive labs.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790564730/planet-4_qyrtzs.png",
    display: { size: 13, offset: 5 },
    theme: "from-violet-950 via-purple-800 to-fuchsia-500",
    accent: "violet",
    environment:
      "A purple alien QA facility surrounded by testing laboratories.",
    objects: [
      {
        id: "ui",
        title: "UI Automation Lab",
        type: "lab",
        x: 18,
        y: 53,
        content: "Selenium, Playwright, JUnit, TestNG and pytest.",
      },
      {
        id: "api",
        title: "API Lab",
        type: "lab",
        x: 43,
        y: 34,
        content: "Postman, Newman and RestAssured.",
      },
      {
        id: "performance",
        title: "Performance Lab",
        type: "lab",
        x: 68,
        y: 53,
        content: "JMeter, load models, metrics and reporting.",
      },
      {
        id: "accessibility",
        title: "Accessibility Lab",
        type: "lab",
        x: 83,
        y: 33,
        content: "Keyboard, semantics, contrast and WCAG-oriented checks.",
      },
    ],
  },
  {
    slug: "projects",
    title: "Expedition",
    subtitle: "Projects",
    tagline: "Selected missions and outcomes",
    description:
      "A project world where each island is a build, case study or testing expedition.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790564731/planet-5_a49qh3.png",
    display: { size: 6.5, offset: 7 },
    theme: "from-emerald-950 via-teal-800 to-lime-400",
    accent: "emerald",
    environment: "A world of islands connected by paths and project stations.",
    objects: [
      {
        id: "parking",
        title: "Parking Spot Finder",
        type: "project",
        x: 22,
        y: 60,
        content: "Maps, parking availability, operators and payments.",
      },
      {
        id: "villedishes",
        title: "VilleDishes",
        type: "project",
        x: 52,
        y: 39,
        content: "Nigerian food commerce, cart and order workflows.",
      },
      {
        id: "lms",
        title: "Learning Platform",
        type: "project",
        x: 78,
        y: 61,
        content: "A Duolingo-inspired learning experience.",
      },
    ],
  },
  {
    slug: "skills",
    title: "Constellation",
    subtitle: "Skills",
    tagline: "Tools for complex problems",
    description:
      "A connected constellation where technical and product skills show their relationships and evidence.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790564732/planet-6_owqrg9.png",
    display: { size: 6, offset: 9 },
    theme: "from-slate-950 via-indigo-950 to-sky-500",
    accent: "sky",
    environment:
      "Deep space with skill clusters connected like constellations.",
    objects: [
      {
        id: "development",
        title: "Development Cluster",
        type: "constellation",
        x: 24,
        y: 40,
        content: "Next.js, React, TypeScript, JavaScript, Java and Python.",
      },
      {
        id: "qa",
        title: "QA/SDET Cluster",
        type: "constellation",
        x: 52,
        y: 60,
        content: "Selenium, Playwright, API testing, JUnit, pytest and TestNG.",
      },
      {
        id: "product",
        title: "Product Cluster",
        type: "constellation",
        x: 78,
        y: 38,
        content:
          "Requirements, user stories, acceptance criteria and roadmaps.",
      },
    ],
  },
  {
    slug: "contact",
    title: "Transmission",
    subtitle: "Contact",
    tagline: "Start a new expedition",
    description:
      "A quiet communications station for messages, resume access and professional links.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790564732/planet-7_w3e2xj.png",
    display: { size: 5, offset: 13 },
    theme: "from-slate-950 via-slate-800 to-cyan-300",
    accent: "cyan",
    environment:
      "A quiet moon with a communications station and satellite dishes.",
    objects: [
      {
        id: "console",
        title: "Transmission Console",
        type: "contact",
        x: 50,
        y: 52,
        content: "Send a message through the contact form.",
      },
      {
        id: "resume",
        title: "Resume Capsule",
        type: "resume",
        x: 23,
        y: 38,
        content: "Download the latest resume.",
      },
      {
        id: "github",
        title: "GitHub Satellite",
        type: "link",
        x: 77,
        y: 38,
        content: "Explore source code and testing projects.",
      },
    ],
  },
];

// APPEND THIS TO lib/planets.ts (replaces any earlier scene-additions version)
// Everything the planet pages need beyond the nav data lives here, so there
// is still just one file to edit.

export type Hotspot = { title: string; content: string };

export type ProjectDetail = {
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
};

export type SceneExtras = {
  /** Line under the page title */
  strapline: string;
  /** Full-bleed astronaut background for the planet page (no UI text baked in) */
  image: string;
  /** Hotspots for the page (empty on About, Projects and Contact) */
  items: Hotspot[];
  /** Statement shown in the hologram before any hotspot is picked */
  intro: string;
};

export const sceneExtras: Record<string, SceneExtras> = {
  about: {
    strapline: "Meet the person behind the code.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790678615/aboutScreen_p4rrzw.jpg",
    items: [],
    intro: "",
  },
  product: {
    strapline: "Ideas, strategy, users, impact.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790678610/productScreen_hkagww.jpg",
    intro:
      "Product management is turning ambiguity into a plan a team can build: understanding the user, defining what matters, and shipping the smallest thing that proves it.",
    items: [
      {
        title: "Research",
        content:
          "Discovery starts with the user: interviews, surveys and competitor review to find the real problem before any feature is scoped.",
      },
      {
        title: "User Needs",
        content:
          "Findings become personas and user stories with clear acceptance criteria, such as the stories written for the portfolio contact form.",
      },
      {
        title: "Roadmaps",
        content:
          "Work is prioritised by value and effort, then laid out as a roadmap the whole team can follow and adjust.",
      },
      {
        title: "Stakeholders",
        content:
          "Requirements are kept aligned with designers, developers and testers through regular check-ins and shared documentation.",
      },
      {
        title: "Impact",
        content:
          "Every feature is tied to a measurable outcome, so success is judged by what changed for users, not by what shipped.",
      },
    ],
  },
  development: {
    strapline: "Build. Integrate. Deploy.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790678610/devScreen_w4xsmk.jpg",
    intro:
      "A typed, tested stack from the database to the UI: Next.js on the front end, tRPC and Prisma on the back end, with Zod keeping the two in sync.",
    items: [
      {
        title: "React",
        content:
          "Component-driven interfaces built with React Hook Form, TanStack Query and shadcn/ui, with a focus on accessible, reusable pieces.",
      },
      {
        title: "Next.js",
        content:
          "App Router applications with server actions, dynamic routes and static generation, used for this portfolio and an admin dashboard.",
      },
      {
        title: "Node.js",
        content:
          "Server-side logic with tRPC procedures and Prisma on PostgreSQL, including a Nodemailer-backed contact form.",
      },
      {
        title: "Java",
        content:
          "The language behind test automation work with JUnit and TestNG, and a solid base for object-oriented design.",
      },
      {
        title: "TypeScript",
        content:
          "End-to-end type safety, from Zod-validated inputs through tRPC to the UI, so mistakes surface at build time.",
      },
    ],
  },
  testing: {
    strapline: "Find issues. Improve quality.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790679098/testScreen_jtlhas.jpg",
    intro:
      "Quality is built in, not bolted on: automated coverage across the UI, API, performance and accessibility, so regressions are caught before a user sees them.",
    items: [
      {
        title: "Automation",
        content:
          "UI automation with Selenium and Playwright, backed by JUnit, TestNG and pytest, run from CI to catch regressions early.",
      },
      {
        title: "API Testing",
        content:
          "Postman, Newman and RestAssured suites, including ReqRes API tests that run on a scheduled GitHub Actions workflow.",
      },
      {
        title: "Performance",
        content:
          "JMeter load models with response-time and throughput metrics reported back in plain language.",
      },
      {
        title: "Accessibility",
        content:
          "Keyboard, semantics and contrast checks aligned with WCAG, built into test design rather than added at the end.",
      },
      {
        title: "Database",
        content:
          "SQL checks that data written by the app and its APIs is stored correctly and stays consistent.",
      },
      {
        title: "Security",
        content:
          "Input validation, error handling and authentication paths are covered by test cases, including Zod validation cases for the contact form.",
      },
    ],
  },
  projects: {
    strapline: "Real solutions. Tangible impact.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790678611/projScreen_kfgrba.jpg",
    items: [],
    intro: "",
  },
  skills: {
    strapline: "Tools for the journey.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790678612/skillScreen_kaab2x.jpg",
    intro:
      "A combination of technical and soft skills to deliver great solutions.",
    items: [
      {
        title: "Python",
        content:
          "Used with pytest for automated checks and for small scripts that remove repetitive work.",
      },
      {
        title: "Java",
        content:
          "Test automation with JUnit and TestNG, and object-oriented design.",
      },
      {
        title: "JavaScript",
        content:
          "The foundation for front-end behaviour, Playwright tests and Node tooling.",
      },
      {
        title: "React",
        content:
          "Composable, accessible UI with hooks, forms and server-state management.",
      },
      {
        title: "Selenium",
        content: "Browser automation for end-to-end regression suites.",
      },
      {
        title: "SQL",
        content:
          "Querying and validating data, and reasoning about schemas and relations.",
      },
      {
        title: "JMeter",
        content: "Load and performance testing with clear metrics and reports.",
      },
      {
        title: "MongoDB",
        content: "Document modelling for flexible, fast-moving data.",
      },
      {
        title: "AWS",
        content:
          "Cloud deployment concepts: hosting, storage and delivery of web apps.",
      },
      {
        title: "Node.js",
        content:
          "Server-side JavaScript for APIs, tRPC procedures and tooling.",
      },
    ],
  },
  contact: {
    strapline: "Let's connect.",
    image:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1790678616/contactScreen_qy1szp.jpg",
    items: [],
    intro: "",
  },
};

// About page: the two constant hologram statements, and the "Explore my
// story" swap-in content.
export const aboutContent = {
  whoAmI:
    "I am a product-minded engineer who loves shipping polished, user-centered software — from first sketch to production rollout.",
  howIWork:
    "I pair strong design sensibility with rigorous engineering: rapid prototyping, tight feedback loops, and tests that let teams move fast safely.",
  beyondWork:
    "When I am not building, I am stargazing, mentoring junior developers, and contributing to open-source testing tools.",
  education: [
    {
      title: "Degree / Programme name",
      period: "Year – Year",
      detail: "One line on focus or achievements.",
    },
  ],
  experience: [
    {
      title: "Role, Company",
      period: "Year – Present",
      detail: "One line on scope or impact.",
    },
  ],
};

// Projects page: technical detail for the hologram, keyed by the project's
// title in the `objects` list above.
export const projectDetails: Record<string, ProjectDetail> = {
  "Parking Spot Finder": {
    description:
      "A React Native and Expo app for finding and booking parking in real time, covering map search, live availability, multiple operators and in-app payments.",
    techStack: ["React Native", "Expo", "TypeScript", "Maps API"],
    githubUrl: "https://github.com/abiolash/parking-spot-finder",
    demoUrl: undefined,
  },
  VilleDishes: {
    description:
      "Nigerian food commerce built around cart and order workflows, paired with a Next.js admin dashboard for tracking income and expense transactions.",
    techStack: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/abiolash/villedishes-store",
    demoUrl: undefined,
  },
  "Learning Platform": {
    description:
      "A Duolingo-inspired learning experience with short lessons, progress tracking and spaced-repetition style practice loops.",
    techStack: ["React Native", "Expo", "TypeScript"],
    githubUrl: "https://github.com/abiolash/learning-platform",
    demoUrl: undefined,
  },
};
