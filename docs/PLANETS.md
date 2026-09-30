# Astronaut Portfolio — Planet Design & Content Specification

## Experience principle

The visitor is an astronaut exploring a portfolio solar system. Every planet is a complete visual scene rather than a conventional page with a text column.

Each planet contains:

1. A distinctive environment.
2. The astronaut.
3. 3–7 interactive scene objects.
4. Content revealed through those objects.
5. A clear next-planet navigation path.
6. A visual story that communicates the section before the user reads it.

The public journey is:

HOME → ABOUT → PRODUCT → DEVELOPMENT → TESTING → PROJECTS → SKILLS → CONTACT

---

# 1. About Planet — “Origin”

### Purpose
Introduce the person behind the portfolio: background, education, career journey, values, and current direction.

### Visual world
A warm rocky orange planet at sunrise. A landing site sits near an ancient observatory. Mountains and a distant orbital station create depth.

### Astronaut
The astronaut lands beside a mission beacon, then walks toward the observatory.

### Scene objects

| Object | Content | Interaction |
|---|---|---|
| Mission Beacon | Short personal introduction | Expand hologram |
| Career Timeline | Product, support, development and QA journey | Scroll/step timeline |
| Education Observatory | Degrees, diploma and certifications | Open credential panel |
| Mission Log | Current professional direction | Open narrative |
| Origin Map | Places/projects that shaped the journey | Reveal milestones |

### Content
- Professional introduction
- Education
- Career history
- Current role/direction
- Certifications
- Short personal working philosophy

### CTA
“Continue Mission → Product Planet”

### Accessibility
Every scene object has an HTML button equivalent and descriptive label.

---

# 2. Product Planet — “Discovery”

### Purpose
Show product thinking, requirements analysis, user research, stakeholder collaboration, prioritization and delivery.

### Visual world
A futuristic neon city with a central research tower. Floating screens show product roadmaps and user journeys.

### Astronaut
The astronaut walks through the city and activates the research tower.

### Scene objects

| Object | Content | Interaction |
|---|---|---|
| User Research Lab | Personas, interviews, surveys | Open case study |
| Roadmap Tower | Prioritization and roadmap examples | Timeline |
| Requirements Console | User stories and acceptance criteria | Expand examples |
| Stakeholder Hub | Collaboration and communication | Open workflow |
| Impact Dashboard | Product outcomes and metrics | Metric cards |

### Content
- Product management experience
- Product discovery
- User stories
- Acceptance criteria
- Wireframes/prototypes
- Stakeholder communication
- Product metrics

### CTA
“Enter Development Planet →”

---

# 3. Development Planet — “Forge”

### Purpose
Show software development capability and engineering practices.

### Visual world
A blue technological planet with floating code structures, an architecture core and deployment launch pads.

### Astronaut
The astronaut stands at a developer terminal while a spacecraft deploys in the background.

### Scene objects

| Object | Content | Interaction |
|---|---|---|
| Code Terminal | Languages and frameworks | Open skill matrix |
| Architecture Core | System architecture examples | Diagram modal |
| GitHub Station | Repositories and source code | External links |
| Deployment Pad | CI/CD, Docker and cloud work | Pipeline animation |
| Data Core | PostgreSQL, MongoDB and APIs | Data architecture |

### Content
- JavaScript/TypeScript
- Java/Python fundamentals
- React/Next.js
- Node/Express
- REST APIs
- PostgreSQL/MongoDB
- Docker/Azure/cloud concepts
- CI/CD

### CTA
“Enter Testing Planet →”

---

# 4. Testing Planet — “Validation”

### Purpose
Make QA/SDET capability a major visual feature rather than a list of tools.

### Visual world
A purple alien QA research environment. A large testing facility contains several labs.

### Astronaut
The astronaut operates a holographic QA console.

### Scene objects

| Object | Content | Interaction |
|---|---|---|
| UI Automation Lab | Selenium, Playwright, JUnit/TestNG/pytest | Open automation examples |
| API Lab | Postman, Newman, RestAssured | Open API test report |
| Performance Lab | JMeter | Open performance dashboard |
| Accessibility Lab | WCAG/testing practices | Open accessibility checklist |
| Database Lab | SQL/NoSQL testing | Open examples |
| Security Lab | Security testing fundamentals | Open lab notes |

### Content
- STLC
- Test planning
- Test cases
- Regression testing
- UI automation
- API testing
- Performance testing
- Database testing
- Accessibility testing
- Security testing

### CTA
“Explore Projects →”

---

# 5. Projects Planet — “Expedition”

### Purpose
Turn the portfolio into a collection of explorable project environments.

### Visual world
A planet made of islands, each island representing a project.

### Astronaut
The astronaut travels between project islands using a small rover or spacecraft.

### Primary projects

#### Parking Spot Finder
Parking discovery, maps, availability, payments and operator integrations.

#### VilleDishes
Nigerian food-store experience with cart/order workflows and authentication.

#### Learning Management System
Duolingo-inspired learning platform using Next.js, PostgreSQL/Drizzle and authentication.

#### Automation Exercise
Java/Selenium end-to-end testing project with JUnit, POM and CI.

#### API Testing Dashboard
Postman/Newman collection with HTML reporting and GitHub Pages.

### Scene objects
Each project island contains:
- project thumbnail
- problem
- solution
- technology stack
- testing strategy
- architecture
- live demo
- GitHub link

### CTA
“Map the Skills →”

---

# 6. Skills Planet — “Constellation”

### Purpose
Show technical and professional skills as relationships instead of a flat list.

### Visual world
A dark space environment with connected stars and constellations.

### Astronaut
The astronaut floats between skill clusters.

### Constellations

#### Development
Next.js, React, TypeScript, JavaScript, Java, Python, Node.js.

#### QA/SDET
Selenium, Playwright, JUnit, TestNG, pytest, Postman, RestAssured, Newman.

#### Performance
JMeter, performance test design, reporting.

#### Data
PostgreSQL, SQL, MongoDB, Prisma, Drizzle.

#### DevOps/Cloud
GitHub Actions, Docker, Azure, cloud fundamentals.

#### Product
User stories, requirements, acceptance criteria, roadmaps, stakeholder communication.

### Interaction
Clicking a star opens:
- proficiency context
- projects where it was used
- tools around it
- GitHub/project evidence

### CTA
“Open Communication Station →”

---

# 7. Contact Planet — “Transmission”

### Purpose
Give recruiters, hiring managers and collaborators a simple way to make contact.

### Visual world
A quiet moon with a communications station, satellite dishes and an Earth-like horizon.

### Astronaut
The astronaut stands at a communication console.

### Scene objects

| Object | Content | Interaction |
|---|---|---|
| Transmission Console | Contact form | Open form |
| GitHub Satellite | GitHub | External link |
| LinkedIn Satellite | LinkedIn | External link |
| Resume Capsule | Resume | Download |
| Mission Status | Availability/current focus | Status panel |

### Contact form
- Name
- Email
- Subject
- Message
- Honeypot/rate-limit protection
- Validation
- Success/error states

### CTA
“Return to Solar System →”

---

# Common Planet UX

Every planet should provide:

- Planet title
- Short subtitle
- Astronaut
- Scene environment
- Interactive objects
- Progress indicator
- Previous/next planet
- Skip-to-content link
- Keyboard-accessible object controls
- Reduced-motion mode
- Mobile fallback
- SEO metadata

## Scene hierarchy

```text
PlanetPage
└── PlanetScene
    ├── Background
    ├── Atmosphere
    ├── PlanetSurface
    ├── Astronaut
    ├── SceneObjects
    ├── ContentOverlay
    ├── PlanetNavigation
    └── ProgressIndicator
```

## Visual implementation strategy

MVP:
- CSS/HTML
- layered WebP/AVIF artwork
- SVG scene objects
- PNG/WebP astronaut
- GSAP transitions

Post-MVP:
- React Three Fiber
- Three.js
- GLB astronaut
- 3D planets
- particles
- lighting/fog
- interactive environments
