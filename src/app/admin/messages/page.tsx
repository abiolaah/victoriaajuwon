// app/admin/messages/page.tsx
import { prisma } from "@/lib/db";
import { deleteMessage, setMessageStatus } from "@/actions/messages";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Contact messages</h1>

      <div className="mt-6 space-y-3">
        {messages.map((message) => {
          const markRead = setMessageStatus.bind(null, message.id, "READ");
          const markArchived = setMessageStatus.bind(
            null,
            message.id,
            "ARCHIVED",
          );
          const markSpam = setMessageStatus.bind(null, message.id, "SPAM");
          const remove = deleteMessage.bind(null, message.id);

          return (
            <div
              key={message.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium">{message.name}</span>{" "}
                  <span className="text-slate-500">
                    &lt;{message.email}&gt;
                  </span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs uppercase tracking-wide ${
                    message.status === "UNREAD"
                      ? "bg-amber-100 text-amber-700"
                      : message.status === "SPAM"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {message.status}
                </span>
              </div>
              {message.subject && (
                <p className="mt-1 text-sm font-medium">{message.subject}</p>
              )}
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                {message.message}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                {message.createdAt.toLocaleString()}
              </p>

              <div className="mt-3 flex gap-3 text-xs">
                <form action={markRead}>
                  <button type="submit" className="underline">
                    Mark read
                  </button>
                </form>
                <form action={markArchived}>
                  <button type="submit" className="underline">
                    Archive
                  </button>
                </form>
                <form action={markSpam}>
                  <button type="submit" className="underline">
                    Mark spam
                  </button>
                </form>
                <form action={remove}>
                  <button type="submit" className="text-red-600 underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <p className="text-sm text-slate-400">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
