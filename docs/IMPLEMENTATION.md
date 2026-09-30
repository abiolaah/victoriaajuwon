# Home + Planet Implementation

## Home page

The home page is the solar-system mission selector.

### Sequence

1. Star field loads.
2. Mission title fades in.
3. Astronaut appears.
4. Planetary orbit nodes become visible.
5. User selects a planet or starts the mission.
6. Camera/scene transition leads to the selected planet.

### MVP structure

```text
Home
├── Navigation
├── Starfield
├── Solar System
│   ├── Sun
│   ├── Planet nodes
│   └── Astronaut
├── Mission introduction
└── Start Mission CTA
```

## Planet page

A reusable dynamic route:

```text
/planet/[slug]
```

The page fetches a planet and its scene objects. Content is data-driven, so adding a new scene does not require creating another page component.

## Animation responsibilities

- GSAP: scene transitions, scroll sequences, astronaut movement.
- Motion: buttons, dialogs, UI micro-interactions.
- CSS: responsive layout and basic transitions.
- React Three Fiber: post-MVP 3D.

## Performance

Load:

- current scene first
- next scene second
- remaining scenes on demand

Use AVIF/WebP for raster art and compressed SVG for icons.

## Mobile

Do not scale the desktop scene directly. Use a simplified composition with:

- fewer objects
- larger tap targets
- shorter animation
- optional static fallback
