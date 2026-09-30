// app/admin/planets/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/db";
import { createPlanet, deletePlanet } from "@/actions/planets";

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400";
const labelClass =
  "block text-xs font-medium uppercase tracking-wide text-slate-500";

export default async function PlanetsPage() {
  const planets = await prisma.planet.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Planets</h1>

      <table className="mt-6 w-full overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Slug</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={planet.id} className="border-t border-slate-100">
              <td className="px-4 py-3">{planet.order}</td>
              <td className="px-4 py-3 font-medium">{planet.title}</td>
              <td className="px-4 py-3 text-slate-500">{planet.slug}</td>
              <td className="px-4 py-3">{planet.status}</td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/admin/planets/${planet.id}`}
                  className="text-slate-700 underline"
                >
                  Edit
                </Link>
                <form
                  action={deletePlanet.bind(null, planet.id)}
                  className="inline"
                >
                  <button type="submit" className="ml-3 text-red-600 underline">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {planets.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                No planets yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">New planet</h2>
        <form action={createPlanet} className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Slug</label>
            <input
              name="slug"
              required
              className={inputClass}
              placeholder="about"
            />
          </div>
          <div>
            <label className={labelClass}>Order</label>
            <input
              name="order"
              type="number"
              required
              className={inputClass}
              defaultValue={0}
            />
          </div>
          <div>
            <label className={labelClass}>Title</label>
            <input
              name="title"
              required
              className={inputClass}
              placeholder="Origin"
            />
          </div>
          <div>
            <label className={labelClass}>Subtitle (nav label)</label>
            <input name="subtitle" className={inputClass} placeholder="About" />
          </div>
          <div>
            <label className={labelClass}>Tagline</label>
            <input
              name="tagline"
              className={inputClass}
              placeholder="Meet the person behind the code."
            />
          </div>
          <div>
            <label className={labelClass}>Theme (gradient classes)</label>
            <input
              name="theme"
              className={inputClass}
              placeholder="from-orange-950 via-orange-700 to-amber-400"
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Default hologram statement</label>
            <textarea name="description" className={`${inputClass} min-h-20`} />
          </div>
          <div>
            <label className={labelClass}>Background image URL</label>
            <input
              name="backgroundUrl"
              className={inputClass}
              placeholder="https://…/scene.jpg"
            />
          </div>
          <div>
            <label className={labelClass}>Nav icon URL</label>
            <input
              name="navIconUrl"
              className={inputClass}
              placeholder="https://…/planet.png"
            />
          </div>
          <div>
            <label className={labelClass}>Nav size (vw)</label>
            <input
              name="navSize"
              type="number"
              step="0.1"
              className={inputClass}
              defaultValue={5}
            />
          </div>
          <div>
            <label className={labelClass}>Nav offset (vh)</label>
            <input
              name="navOffset"
              type="number"
              step="0.1"
              className={inputClass}
              defaultValue={0}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" className={inputClass} defaultValue="DRAFT">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
              Create planet
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
