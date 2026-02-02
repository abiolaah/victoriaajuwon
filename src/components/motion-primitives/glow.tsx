"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlowBgProps {
  children: ReactNode;
  className?: string;
}

export function GlowBg({ children, className }: GlowBgProps) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-0.5 bg-linear-to-r from-red-600 to-red-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      <div className="relative">{children}</div>
    </div>
  );
}

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlowButton({ children, className, onClick }: GlowButtonProps) {
  return (
    <div
      className={cn("relative group cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="absolute -inset-0.5 bg-linear-to-r from-red-600 to-red-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative">{children}</div>
    </div>
  );
}
