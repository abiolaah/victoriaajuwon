// aap/planet/[slug]/page.tsx

import { notFound } from "next/navigation";
import { PlanetScene } from "@/components/scene/PlanetScene";
import { planets } from "@/lib/planets";

export function generateStaticParams() {
  return planets.map((planet) => ({ slug: planet.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const planet = planets.find((item) => item.slug === slug);

  return {
    title: planet ? `${planet.title} — ${planet.subtitle}` : "Planet",
    description: planet?.description,
  };
}

export default async function PlanetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const planet = planets.find((item) => item.slug === slug);

  if (!planet) notFound();

  return <PlanetScene planet={planet} />;
}
