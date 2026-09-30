// app/admin/experience/page.tsx
import { prisma } from "@/lib/db";
import {
  createExperience,
  deleteExperience,
  updateExperience,
} from "@/actions/experience";

const inputClass =
  "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400";

function toDateInputValue(d: Date | null) {
  return d ? d.toISOString().slice(0, 10) : "";
}

export default async function ExperiencePage() {
  const entries = await prisma.experience.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Education & experience</h1>
      <p className="mt-1 text-sm text-slate-500">
        Feeds the About page&apos;s Education and Experience hologram
        (WORK/VOLUNTEER → Experience, EDUCATION/CERTIFICATION → Education).
      </p>

      <div className="mt-6 space-y-3">
        {entries.map((entry) => {
          const boundUpdate = updateExperience.bind(null, entry.id);
          const boundDelete = deleteExperience.bind(null, entry.id);
          return (
            <form
              key={entry.id}
              action={boundUpdate}
              className="grid grid-cols-12 gap-3 rounded-lg border border-slate-200 bg-white p-4"
            >
              <select
                name="type"
                defaultValue={entry.type}
                className={`${inputClass} col-span-2`}
              >
                <option value="WORK">Work</option>
                <option value="EDUCATION">Education</option>
                <option value="CERTIFICATION">Certification</option>
                <option value="VOLUNTEER">Volunteer</option>
              </select>
              <input
                name="organization"
                defaultValue={entry.organization}
                required
                placeholder="Organization / school"
                className={`${inputClass} col-span-3`}
              />
              <input
                name="title"
                defaultValue={entry.title ?? ""}
                placeholder="Role / degree"
                className={`${inputClass} col-span-3`}
              />
              <input
                name="startDate"
                type="date"
                defaultValue={toDateInputValue(entry.startDate)}
                className={`${inputClass} col-span-2`}
              />
              <input
                name="endDate"
                type="date"
                defaultValue={toDateInputValue(entry.endDate)}
                className={`${inputClass} col-span-2`}
              />
              <textarea
                name="description"
                defaultValue={entry.description ?? ""}
                placeholder="One line for the hologram"
                className={`${inputClass} col-span-9 min-h-10`}
              />
              <div className="col-span-3 flex items-center gap-2">
                <input
                  id={`current-${entry.id}`}
                  name="current"
                  type="checkbox"
                  defaultChecked={entry.current}
                />
                <label htmlFor={`current-${entry.id}`} className="text-xs">
                  Current
                </label>
              </div>
              <input
                name="sortOrder"
                type="number"
                defaultValue={entry.sortOrder}
                className={`${inputClass} col-span-2`}
              />
              <select
                name="status"
                defaultValue={entry.status}
                className={`${inputClass} col-span-2`}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              <div className="col-span-12 flex justify-end gap-4">
                <button
                  type="submit"
                  className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white"
                >
                  Save
                </button>
                <button
                  type="submit"
                  formAction={boundDelete}
                  className="text-xs text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </form>
          );
        })}
      </div>

      <section className="mt-8 rounded-lg border border-dashed border-slate-300 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Add entry
        </h2>
        <form
          action={createExperience}
          className="mt-3 grid grid-cols-12 gap-3"
        >
          <select
            name="type"
            defaultValue="WORK"
            className={`${inputClass} col-span-2`}
          >
            <option value="WORK">Work</option>
            <option value="EDUCATION">Education</option>
            <option value="CERTIFICATION">Certification</option>
            <option value="VOLUNTEER">Volunteer</option>
          </select>
          <input
            name="organization"
            required
            placeholder="Organization / school"
            className={`${inputClass} col-span-3`}
          />
          <input
            name="title"
            placeholder="Role / degree"
            className={`${inputClass} col-span-3`}
          />
          <input
            name="startDate"
            type="date"
            className={`${inputClass} col-span-2`}
          />
          <input
            name="endDate"
            type="date"
            className={`${inputClass} col-span-2`}
          />
          <textarea
            name="description"
            placeholder="One line for the hologram"
            className={`${inputClass} col-span-9 min-h-10`}
          />
          <div className="col-span-3 flex items-center gap-2">
            <input id="current-new" name="current" type="checkbox" />
            <label htmlFor="current-new" className="text-xs">
              Current
            </label>
          </div>
          <input
            name="sortOrder"
            type="number"
            defaultValue={entries.length}
            className={`${inputClass} col-span-2`}
          />
          <select
            name="status"
            defaultValue="PUBLISHED"
            className={`${inputClass} col-span-2`}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <div className="col-span-12">
            <button
              type="submit"
              className="rounded-md border border-slate-400 px-3 py-1.5 text-xs"
            >
              Add entry
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
