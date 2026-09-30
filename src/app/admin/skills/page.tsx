// app/admin/skills/page.tsx
import { prisma } from "@/lib/db";
import { createSkill, deleteSkill, updateSkill } from "@/actions/skills";

const inputClass =
  "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400";
const labelClass =
  "block text-xs font-medium uppercase tracking-wide text-slate-500";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Skills</h1>

      <div className="mt-6 space-y-3">
        {skills.map((skill) => {
          const boundUpdate = updateSkill.bind(null, skill.id);
          const boundDelete = deleteSkill.bind(null, skill.id);
          return (
            <form
              key={skill.id}
              action={boundUpdate}
              className="grid grid-cols-12 gap-3 rounded-lg border border-slate-200 bg-white p-4"
            >
              <input
                name="name"
                defaultValue={skill.name}
                required
                placeholder="Name"
                className={`${inputClass} col-span-2`}
              />
              <input
                name="category"
                defaultValue={skill.category}
                required
                placeholder="Category"
                className={`${inputClass} col-span-2`}
              />
              <textarea
                name="description"
                defaultValue={skill.description ?? ""}
                placeholder="Content shown in the hologram"
                className={`${inputClass} col-span-4 min-h-10`}
              />
              <input
                name="icon"
                defaultValue={skill.icon ?? ""}
                placeholder="Icon"
                className={`${inputClass} col-span-1`}
              />
              <input
                name="proficiency"
                type="number"
                min={0}
                max={100}
                defaultValue={skill.proficiency ?? ""}
                placeholder="0-100"
                className={`${inputClass} col-span-1`}
              />
              <input
                name="sortOrder"
                type="number"
                defaultValue={skill.sortOrder}
                className={`${inputClass} col-span-1`}
              />
              <select
                name="status"
                defaultValue={skill.status}
                className={`${inputClass} col-span-1`}
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
          Add skill
        </h2>
        <form action={createSkill} className="mt-3 grid grid-cols-12 gap-3">
          <input
            name="name"
            required
            placeholder="Name"
            className={`${inputClass} col-span-2`}
          />
          <input
            name="category"
            required
            placeholder="Category"
            className={`${inputClass} col-span-2`}
          />
          <textarea
            name="description"
            placeholder="Content shown in the hologram"
            className={`${inputClass} col-span-4 min-h-10`}
          />
          <input
            name="icon"
            placeholder="Icon"
            className={`${inputClass} col-span-1`}
          />
          <input
            name="proficiency"
            type="number"
            min={0}
            max={100}
            placeholder="0-100"
            className={`${inputClass} col-span-1`}
          />
          <input
            name="sortOrder"
            type="number"
            defaultValue={skills.length}
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
          <div className="col-span-12">
            <button
              type="submit"
              className="rounded-md border border-slate-400 px-3 py-1.5 text-xs"
            >
              Add skill
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
