// app/admin/projects/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateProject } from "@/actions/projects";

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400";
const labelClass =
  "block text-xs font-medium uppercase tracking-wide text-slate-500";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, planets] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: {
        coverMedia: true,
        technologies: {
          include: { technology: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    }),
    prisma.planet.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, project.id);
  const techList = project.technologies
    .map((t) => t.technology.name)
    .join(", ");

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit project — {project.name}</h1>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
        <form action={boundUpdate} className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Slug</label>
            <input
              name="slug"
              required
              defaultValue={project.slug}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Name</label>
            <input
              name="name"
              required
              defaultValue={project.name}
              className={inputClass}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>
              Short description (card summary)
            </label>
            <textarea
              name="shortDescription"
              defaultValue={project.shortDescription ?? ""}
              className={`${inputClass} min-h-16`}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Full description (hologram)</label>
            <textarea
              name="description"
              defaultValue={project.description ?? ""}
              className={`${inputClass} min-h-20`}
            />
          </div>
          <div>
            <label className={labelClass}>Technologies (comma separated)</label>
            <input
              name="technologies"
              defaultValue={techList}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Planet</label>
            <select
              name="planetId"
              defaultValue={project.planetId ?? ""}
              className={inputClass}
            >
              <option value="">— none —</option>
              {planets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input
              name="githubUrl"
              defaultValue={project.githubUrl ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Live demo URL</label>
            <input
              name="liveUrl"
              defaultValue={project.liveUrl ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Cover image URL</label>
            <input
              name="coverUrl"
              defaultValue={project.coverMedia?.url ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Sort order</label>
            <input
              name="sortOrder"
              type="number"
              defaultValue={project.sortOrder}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              defaultValue={project.status}
              className={inputClass}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              defaultChecked={project.featured}
            />
            <label htmlFor="featured" className="text-sm">
              Featured
            </label>
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
