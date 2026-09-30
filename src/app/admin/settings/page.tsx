// app/admin/settings/page.tsx
import { prisma } from "@/lib/db";
import { deleteSiteSetting, upsertSiteSetting } from "@/actions/site-settings";

const inputClass =
  "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400";

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany({
    orderBy: { key: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Site settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Free-form key/value pairs for site-wide content, e.g.{" "}
        <code>home.hero_background</code>, <code>home.intro_heading</code>,{" "}
        <code>contact.email</code>. Value accepts plain text or JSON.
      </p>

      <div className="mt-6 space-y-3">
        {settings.map((setting) => (
          <form
            key={setting.id}
            action={upsertSiteSetting}
            className="grid grid-cols-12 gap-3 rounded-lg border border-slate-200 bg-white p-4"
          >
            <input
              name="key"
              defaultValue={setting.key}
              required
              className={`${inputClass} col-span-3`}
            />
            <input
              name="value"
              defaultValue={
                typeof setting.value === "string"
                  ? setting.value
                  : JSON.stringify(setting.value)
              }
              className={`${inputClass} col-span-5`}
            />
            <input
              name="description"
              defaultValue={setting.description ?? ""}
              placeholder="Description"
              className={`${inputClass} col-span-3`}
            />
            <div className="col-span-1 flex items-center gap-2">
              <button
                type="submit"
                className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white"
              >
                Save
              </button>
            </div>
            <div className="col-span-12">
              <button
                type="submit"
                formAction={deleteSiteSetting.bind(null, setting.id)}
                className="text-xs text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>

      <section className="mt-8 rounded-lg border border-dashed border-slate-300 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Add setting
        </h2>
        <form
          action={upsertSiteSetting}
          className="mt-3 grid grid-cols-12 gap-3"
        >
          <input
            name="key"
            required
            placeholder="key.name"
            className={`${inputClass} col-span-3`}
          />
          <input
            name="value"
            required
            placeholder="value"
            className={`${inputClass} col-span-5`}
          />
          <input
            name="description"
            placeholder="Description"
            className={`${inputClass} col-span-3`}
          />
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
