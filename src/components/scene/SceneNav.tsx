// components/scene/SceneNav.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

export function SceneNav() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/80">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 hover:bg-white/10"
      >
        <ArrowLeft size={13} /> Back
      </button>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-white no-underline hover:bg-white/10"
      >
        <Home size={13} /> Home
      </Link>
    </div>
  );
}
