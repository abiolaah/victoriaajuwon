// app/admin/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminOverview() {
  const [planets, projects, skills, experience, unreadMessages] =
    await Promise.all([
      prisma.planet.count(),
      prisma.project.count(),
      prisma.skill.count(),
      prisma.experience.count(),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    ]);

  const cards = [
    { label: "Planets", value: planets, href: "/admin/planets" },
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Skills", value: skills, href: "/admin/skills" },
    {
      label: "Experience entries",
      value: experience,
      href: "/admin/experience",
    },
    {
      label: "Unread messages",
      value: unreadMessages,
      href: "/admin/messages",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-slate-200 bg-white p-5 no-underline text-slate-900 hover:border-slate-300"
          >
            <p className="text-3xl font-semibold">{card.value}</p>
            <p className="mt-1 text-sm text-slate-500">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
