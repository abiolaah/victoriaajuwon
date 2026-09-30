import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, MouseEventHandler } from "react";
import type { Planet as PlanetData } from "@/lib/planets";

type PlanetProps = {
  planet: PlanetData;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const Planet = ({ planet, active = false, onClick }: PlanetProps) => {
  const { slug, subtitle, tagline, image, display } = planet;

  // Desktop size/offset come from the data file via CSS variables.
  const style = {
    "--planet-size": display.size,
    "--planet-offset": display.offset,
  } as CSSProperties;

  return (
    <Link
      href={`/planet/${slug}`}
      style={style}
      onClick={onClick}
      aria-current={active ? "location" : undefined}
      className="group flex w-full max-w-[16rem] flex-row-reverse items-center justify-center text-white no-underline focus-visible:outline focus-visible:outline-offset-8 focus-visible:outline-white lg:flex-col lg:mt-[calc(var(--planet-offset)*1vh)] lg:w-auto lg:max-w-none lg:justify-start lg:gap-0"
    >
      <span className="relative flex flex-col items-start gap-1 text-left lg:pb-8 lg:items-center lg:text-center">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
          {subtitle}
        </span>
        {active && (
          <span className="text-xs text-white/75 lg:whitespace-nowrap">
            {tagline}
          </span>
        )}
        {/* Thin line with a dot at each end, linking the label to the planet */}
        <span
          aria-hidden="true"
          className=" hidden lg:absolute lg:bottom-0 lg:left-1/2 lg:h-6 w-px -translate-x-1/2 bg-white/60 before:absolute before:-top-1 before:left-1/2 before:h-1.5 before:w-1.5 before:-translate-x-1/2 before:rounded-full before:bg-white before:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-white after:content-[''] lg:block"
        />
      </span>

      <span
        className={`block w-20 shrink-0 transition duration-300 md:w-28 lg:w-[calc(var(--planet-size)*1vw)] ${
          active
            ? "drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
            : "opacity-90 group-hover:opacity-100"
        }`}
      >
        <Image
          src={image}
          alt={`${subtitle} planet`}
          className="block h-auto w-full select-none"
          width={512}
          height={512}
          sizes="(min-width: 1024px) 14vw, 176px"
          draggable={false}
        />
      </span>
    </Link>
  );
};
