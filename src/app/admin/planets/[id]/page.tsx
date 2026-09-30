// app/admin/planets/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updatePlanet } from "@/actions/planets";
import {
  createSceneObject,
  deleteSceneObject,
  updateSceneObject,
} from "@/actions/scene-objects";

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400";
const labelClass =
  "block text-xs font-medium uppercase tracking-wide text-slate-500";

export default async function EditPlanetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const planet = await prisma.planet.findUnique({
    where: { id },
    include: {
      backgroundMedia: true,
      navIcon: true,
      sceneObjects: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!planet) notFound();

  const boundUpdate = updatePlanet.bind(null, planet.id);
  const boundCreateHotspot = createSceneObject.bind(null, planet.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit planet — {planet.title}</h1>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
        <form action={boundUpdate} className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Slug</label>
            <input
              name="slug"
              required
              defaultValue={planet.slug}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Order</label>
            <input
              name="order"
              type="number"
              required
              defaultValue={planet.order}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Title</label>
            <input
              name="title"
              required
              defaultValue={planet.title}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Subtitle (nav label)</label>
            <input
              name="subtitle"
              defaultValue={planet.subtitle ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Tagline</label>
            <input
              name="tagline"
              defaultValue={planet.tagline ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Theme (gradient classes)</label>
            <input
              name="theme"
              defaultValue={planet.theme ?? ""}
              className={inputClass}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Default hologram statement</label>
            <textarea
              name="description"
              defaultValue={planet.description ?? ""}
              className={`${inputClass} min-h-20`}
            />
          </div>
          <div>
            <label className={labelClass}>Background image URL</label>
            <input
              name="backgroundUrl"
              defaultValue={planet.backgroundMedia?.url ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Nav icon URL</label>
            <input
              name="navIconUrl"
              defaultValue={planet.navIcon?.url ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Nav size (vw)</label>
            <input
              name="navSize"
              type="number"
              step="0.1"
              defaultValue={planet.navSize ?? 5}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Nav offset (vh)</label>
            <input
              name="navOffset"
              type="number"
              step="0.1"
              defaultValue={planet.navOffset ?? 0}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              defaultValue={planet.status}
              className={inputClass}
            >
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
              Save changes
            </button>
          </div>
        </form>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">
          Hotspots{" "}
          {planet.slug === "about" &&
            "(use slugs who-am-i / how-i-work / beyond-work)"}
        </h2>

        <div className="mt-4 space-y-4">
          {planet.sceneObjects.map((obj) => {
            const boundUpdateHotspot = updateSceneObject.bind(
              null,
              planet.id,
              obj.id,
            );
            const boundDeleteHotspot = deleteSceneObject.bind(
              null,
              planet.id,
              obj.id,
            );
            return (
              <form
                key={obj.id}
                action={boundUpdateHotspot}
                className="grid grid-cols-12 gap-3 rounded-lg border border-slate-200 bg-white p-4"
              >
                <input
                  name="name"
                  defaultValue={obj.name}
                  required
                  placeholder="Title"
                  className={`${inputClass} col-span-3`}
                />
                <input
                  name="slug"
                  defaultValue={obj.slug}
                  required
                  placeholder="slug"
                  className={`${inputClass} col-span-2`}
                />
                <textarea
                  name="description"
                  defaultValue={obj.description ?? ""}
                  placeholder="Content shown in the hologram"
                  className={`${inputClass} col-span-4 min-h-10`}
                />
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={obj.sortOrder}
                  className={`${inputClass} col-span-1`}
                />
                <select
                  name="status"
                  defaultValue={obj.status}
                  className={`${inputClass} col-span-1`}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
                <input type="hidden" name="type" value={obj.type} />
                <input
                  type="hidden"
                  name="interactionType"
                  value={obj.interactionType}
                />
                <div className="col-span-1 flex items-center gap-2">
                  <button
                    type="submit"
                    className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white"
                  >
                    Save
                  </button>
                </div>
                <div className="col-span-12 -mt-2">
                  <button
                    type="submit"
                    formAction={boundDeleteHotspot}
                    className="text-xs text-red-600 underline"
                  >
                    Delete hotspot
                  </button>
                </div>
              </form>
            );
          })}
        </div>

        <form
          action={boundCreateHotspot}
          className="mt-6 grid grid-cols-12 gap-3 rounded-lg border border-dashed border-slate-300 p-4"
        >
          <input
            name="name"
            required
            placeholder="Title (e.g. Research)"
            className={`${inputClass} col-span-3`}
          />
          <input
            name="slug"
            required
            placeholder="slug (e.g. research)"
            className={`${inputClass} col-span-2`}
          />
          <textarea
            name="description"
            placeholder="Content shown in the hologram"
            className={`${inputClass} col-span-4 min-h-10`}
          />
          <input
            name="sortOrder"
            type="number"
            defaultValue={planet.sceneObjects.length}
            className={`${inputClass} col-span-1`}
          />
          <select
            name="status"
            defaultValue="PUBLISHED"
            className={`${inputClass} col-span-1`}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <input type="hidden" name="type" value="HOLOGRAM" />
          <input type="hidden" name="interactionType" value="PANEL" />
          <div className="col-span-1">
            <button
              type="submit"
              className="rounded-md border border-slate-400 px-3 py-1.5 text-xs"
            >
              Add
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
