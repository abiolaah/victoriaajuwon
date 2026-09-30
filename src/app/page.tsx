"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, Menu, Orbit, X } from "lucide-react";
// import cosmicHero from "@/assets/cosmic-portfolio-background.jpg";
import { Planet } from "@/components/Planet";
import { planets } from "@/lib/planets";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function HomePage() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  // const activePlanet = planets[active] ?? planets[0];

  // if (!activePlanet) return null;

  const exploreNext = () => setActive((active + 1) % planets.length);

  const cosmicHero =
    "https://res.cloudinary.com/dixwarqdb/image/upload/v1790565098/home-bg_xed0xv.jpg";

  const astronaut =
    "https://res.cloudinary.com/dixwarqdb/image/upload/v1790567763/astronaut_aztolc.png";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* Background art + readability veil */}
      <Image
        src={cosmicHero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/50"
      />

      {/* Astronaut stands on the rocks, bottom-left (large screens only) */}
      <Image
        src={astronaut}
        alt="An astronaut looking out over deep space"
        width={800}
        height={1200}
        className="pointer-events-none absolute bottom-0 left-[4%] hidden h-[58%] w-auto lg:block"
      />

      <div className="relative z-10 flex min-h-screen flex-col px-6 py-6 md:px-10 lg:block lg:min-h-screen lg:p-0">
        <header className="flex items-start justify-between lg:absolute lg:inset-x-0 lg:top-0 lg:px-[4%] lg:pt-8">
          <a
            href="#home"
            aria-label="Victoria Ajuwon, home"
            className="flex flex-col gap-1 no-underline text-white"
          >
            <span className="text-sm font-medium uppercase tracking-[0.3em]">
              Victoria Ajuwon
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/70">
              Software engineer · QA / SDET · Product
            </span>
          </a>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              onClick={exploreNext}
              className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.2em]"
            >
              Explore
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/70">
                <ArrowDown size={13} strokeWidth={1.6} />
              </span>
            </Button>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                >
                  <Menu size={22} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full gap-0 border-0 bg-[#05070d]/95 p-0 text-white backdrop-blur-md sm:max-w-none [&>button.absolute]:hidden"
              >
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Jump to a section of the portfolio
                </SheetDescription>

                {/* Explore + close, above the menu list */}
                <div className="flex items-center justify-end gap-4 px-6 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      exploreNext();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.2em]"
                  >
                    Explore
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/60">
                      <ArrowDown size={14} strokeWidth={1.6} />
                    </span>
                  </button>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Close navigation"
                      className="text-white hover:bg-white/10 hover:text-white"
                    >
                      <X size={22} />
                    </Button>
                  </SheetClose>
                </div>

                <nav
                  aria-label="Portfolio sections"
                  className="flex flex-1 flex-col justify-center px-9 pb-24"
                >
                  <Orbit size={26} className="mb-8 text-orange-400" />
                  <ul className="flex flex-col">
                    {planets.map((planet, index) => (
                      <li
                        key={planet.slug}
                        className="border-b border-white/15"
                      >
                        <SheetClose asChild>
                          <a
                            href={`#${planet.slug}`}
                            onClick={() => setActive(index)}
                            className="flex items-center gap-5 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white/90 no-underline"
                          >
                            <span className="w-4 text-[0.6rem] tracking-widest text-orange-400">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {planet.subtitle}
                          </a>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <nav
          aria-label="Portfolio sections"
          className="mt-2 flex flex-col items-center gap-4 lg:absolute lg:left-[22%] lg:right-[4%] lg:top-[20%] lg:mt-0 lg:flex-row lg:items-start lg:justify-between lg:gap-0"
        >
          {planets.map((planet, index) => (
            <Planet
              key={planet.slug}
              planet={planet}
              active={active === index}
              onClick={() => setActive(index)}
            />
          ))}
        </nav>

        <section
          id="home"
          aria-labelledby="intro-title"
          className="mt-10 pb-10 text-center lg:absolute lg:bottom-[12%] lg:left-[21%] lg:mt-0 lg:pb-0 lg:text-left"
        >
          <h1
            id="intro-title"
            className="text-2xl font-normal leading-snug tracking-wide md:text-3xl lg:text-[1.6vw]"
          >
            Different planets.
            <br />
            Same mission.
          </h1>
          <p className="mt-3 text-xs text-white/70">Explore my journey</p>
        </section>
      </div>
    </main>
  );
}
