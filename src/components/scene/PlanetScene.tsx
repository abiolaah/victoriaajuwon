// components/scene/PlanetScene.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { planets, sceneExtras, type Planet } from "@/lib/planets";
import { PlanetPanel } from "@/components/scene/Panels";
import { SceneNav } from "@/components/scene/SceneNav";

export function PlanetScene({ planet }: { planet: Planet }) {
  const index = planets.findIndex((p) => p.slug === planet.slug);
  const next = planets[index + 1];
  const extras = sceneExtras[planet.slug];
  const num = String(index + 1).padStart(2, "0");
  const total = String(planets.length).padStart(2, "0");

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-linear-to-br ${planet.theme} text-white`}
    >
      <Image
        src={extras.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/50"
      />

      <div className="relative z-10 flex min-h-screen flex-col px-6 py-6 md:px-12 md:py-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label="Back to solar system"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/50 text-xs text-white no-underline hover:bg-white/10"
            >
              {num}
            </Link>
            <div>
              <h1 className="text-lg font-medium uppercase tracking-[0.3em]">
                {planet.subtitle}
              </h1>
              <p className="text-sm text-white/75">{extras.strapline}</p>
            </div>
          </div>

          <SceneNav />
        </header>

        <div className="flex flex-1 items-center py-8">
          <div className="w-full">
            <PlanetPanel planet={planet} />
          </div>
        </div>

        <footer className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.2em]">
          <span>
            {num} / {total}
          </span>
          <Link
            href={next ? `/planet/${next.slug}` : "/"}
            className="flex items-center gap-3 text-white no-underline"
          >
            {next ? "Scroll to next" : "The next chapter is ahead…"}
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/60">
              {next ? <ArrowDown size={14} /> : <ArrowRight size={14} />}
            </span>
          </Link>
        </footer>
      </div>
    </main>
  );
}
