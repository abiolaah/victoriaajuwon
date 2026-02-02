"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface TimelineCardProps {
  id?: string;
  title: string;
  subtitle: string;
  technologies?: string;
  imageUrl?: string;
  achievements: string[];
  startDate?: string;
  endDate?: string;
  icon: ReactNode;
  type: "work" | "education";
  isAdmin?: boolean;
  onEdit?: (id: string, type: "work" | "education") => void;
  onDelete?: (id: string, type: "work" | "education") => void;
}

export const TimelineCard = ({
  id,
  title,
  subtitle,
  technologies,
  imageUrl,
  achievements,
  startDate,
  endDate,
  type,
  isAdmin,
  onEdit,
  onDelete,
}: TimelineCardProps) => {
  const bgColor = type === "work" ? "bg-blue-500" : "bg-pink-200";
  const textColor =
    type === "work" && !title.includes("I") ? "text-black" : "text-black";

  return (
    <div
      className={`rounded-lg p-5 ${bgColor} ${textColor} shadow-md w-full flex flex-row justify-between`}
    >
      {/* Action buttons for admin only - visible on hover */}
      {isAdmin && id && onEdit && onDelete && (
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={() => onEdit(id, type)}
            title="Edit"
          >
            <Pencil className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="h-8 w-8 rounded-full bg-red-500 text-white"
            onClick={() => onDelete(id, type)}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">
            {title} {type === "work" ? "🚀" : "🎓"}
          </h3>
          <p className="font-medium">{subtitle}</p>
        </div>

        {technologies && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm">🛠️</span>
            <p className="text-sm">{technologies}</p>
          </div>
        )}

        <div className="mt-2 space-y-1">
          {achievements.map((achievement, index) => (
            <p key={index} className="flex items-start gap-2">
              <span className="text-sm">⭐</span>
              <span className="text-sm">{achievement}</span>
            </p>
          ))}
        </div>

        {startDate && endDate && (
          <p className="text-sm mt-2 opacity-80">
            <span className="font-bold mr-2">{startDate || ""}</span>
            <span>-</span>
            <span className="font-bold ml-2">{endDate || ""}</span>
          </p>
        )}
      </div>
      <div className="rounded-3xl">
        <Image
          src={
            imageUrl ||
            "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg"
          }
          alt="Man on a street"
          width={100}
          height={100}
          className="object-fill rounded-full"
        />
      </div>
    </div>
  );
};
