// app/admin/projects/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/db";
import { createProject, deleteProject } from "@/actions/projects";

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400";
const labelClass =
  "block text-xs font-medium uppercase tracking-wide text-slate-500";

export default async function ProjectsPage() {
  const [projects, planets] = await Promise.all([
    prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.planet.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects</h1>

      <table className="mt-6 w-full overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Slug</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-medium">{project.name}</td>
              <td className="px-4 py-3 text-slate-500">{project.slug}</td>
              <td className="px-4 py-3">{project.status}</td>
              <td className="px-4 py-3">{project.featured ? "Yes" : ""}</td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-slate-700 underline"
                >
                  Edit
                </Link>
                <form
                  action={deleteProject.bind(null, project.id)}
                  className="inline"
                >
                  <button type="submit" className="ml-3 text-red-600 underline">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                No projects yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">New project</h2>
        <form action={createProject} className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Slug</label>
            <input
              name="slug"
              required
              className={inputClass}
              placeholder="parking-spot-finder"
            />
          </div>
          <div>
            <label className={labelClass}>Name</label>
            <input
              name="name"
              required
              className={inputClass}
              placeholder="Parking Spot Finder"
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>
              Short description (card summary)
            </label>
            <textarea
              name="shortDescription"
              className={`${inputClass} min-h-16`}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Full description (hologram)</label>
            <textarea name="description" className={`${inputClass} min-h-20`} />
          </div>
          <div>
            <label className={labelClass}>Technologies (comma separated)</label>
            <input
              name="technologies"
              className={inputClass}
              placeholder="React Native, Expo, TypeScript"
            />
          </div>
          <div>
            <label className={labelClass}>Planet</label>
            <select name="planetId" className={inputClass} defaultValue="">
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
              className={inputClass}
              placeholder="https://github.com/…"
            />
          </div>
          <div>
            <label className={labelClass}>Live demo URL</label>
            <input name="liveUrl" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Cover image URL</label>
            <input name="coverUrl" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Sort order</label>
            <input
              name="sortOrder"
              type="number"
              defaultValue={0}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" defaultValue="DRAFT" className={inputClass}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input id="featured" name="featured" type="checkbox" />
            <label htmlFor="featured" className="text-sm">
              Featured
            </label>
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
              Create project
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
