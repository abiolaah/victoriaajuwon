"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Plus, Trash, Info } from "lucide-react";
import {
  CldUploadWidget,
  type CldUploadWidgetPropsChildren,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Define your folder structure
const PORTFOLIO_FOLDERS = {
  PROJECTS: "Portfolio/Projects",
  SKILLS: "Portfolio/Skills",
  AVATAR: "Portfolio",
  GIF: "Portfolio/Gifs",
  PROFESSIONAL: "Portfolio/Professional",
} as const;

type FolderType = keyof typeof PORTFOLIO_FOLDERS;

interface ImageUploadProps {
  value: string[];
  onChange: (url: string, assetId: string, folder: string) => void;
  onRemove: (url: string) => void;
  onRemoveError?: (error: string) => void;
  folderType?: FolderType;
  multiple?: boolean;
  className?: string;
  maxImages?: number;
}

const MultipleImageUpload: React.FC<ImageUploadProps> = ({
  value = [],
  onChange,
  onRemove,
  onRemoveError,
  folderType = "PROJECTS",
  multiple = true,
  className = "",
  maxImages = 10,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  // Get the actual folder path
  const currentFolderPath = PORTFOLIO_FOLDERS[folderType];

  const onUpload = async (result: CloudinaryUploadWidgetResults) => {
    setIsUploading(false);
    const info = result.info;

    // Check if 'info' is of type CloudinaryUploadWidgetInfo and has 'secure_url'
    if (info && typeof info !== "string" && "secure_url" in info) {
      onChange(info.secure_url, info.asset_id, currentFolderPath);
      if (onRemoveError) {
        onRemoveError("");
      }
    } else {
      console.error("Secure URL not found in upload result:", result);
      if (onRemoveError) {
        onRemoveError("Upload failed: Secure URL not found.");
      }
    }
  };

  const getFolderDisplayName = (type: FolderType): string => {
    switch (type) {
      case "PROJECTS":
        return "Project Images";
      case "SKILLS":
        return "Skills Icons";
      case "AVATAR":
        return "Profile Avatar";
      case "GIF":
        return "Banner GIFs";
      case "PROFESSIONAL":
        return "Professional Images";
      default:
        return "Images";
    }
  };

  const canUploadMore = value.length < maxImages;

  return (
    <div className={cn("w-full", className)}>
      {/* Images Grid */}
      {value.length > 0 && (
        <div className="mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-zinc-700 bg-zinc-800/50 group"
            >
              <Image
                src={url || "/placeholder.svg"}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Delete button overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  onClick={() => onRemove(url)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              {/* GIF indicator */}
              {folderType === "GIF" && (
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  GIF
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Upload Button Alternative */}
      <div className="mt-4 space-y-2">
        {canUploadMore && (
          <CldUploadWidget
            uploadPreset="personal-portfolio"
            options={{
              folder: currentFolderPath,
              resourceType: folderType === "GIF" ? "auto" : "image",
              multiple,
              clientAllowedFormats: ["png", "jpg", "jpeg", "gif", "webp"],
              maxFileSize: 5000000,
            }}
            onOpen={() => setIsUploading(true)}
            onClose={() => setIsUploading(false)}
            onSuccess={onUpload}
            onError={(error) => {
              console.error("Error uploading to cloudinary:", error);
              setIsUploading(false);
              if (onRemoveError) {
                onRemoveError(`Upload failed: ${error || "Unknown error"}`);
              }
            }}
          >
            {({ open }: CldUploadWidgetPropsChildren) => {
              return (
                <Button
                  type="button"
                  className="bg-[#e84539] text-white hover:bg-[#d06e6e] w-full"
                  onClick={() => {
                    try {
                      if (open) {
                        setIsUploading(true);
                        open();
                      }
                    } catch (error) {
                      console.error("Error opening upload widget:", error);
                      if (onRemoveError) {
                        onRemoveError("Failed to open upload dialog");
                      }
                    }
                  }}
                  disabled={isUploading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isUploading
                    ? "Opening..."
                    : `Upload ${getFolderDisplayName(folderType)}`}
                  {multiple && ` (${value.length}/${maxImages})`}
                </Button>
              );
            }}
          </CldUploadWidget>
        )}

        {/* Info about storage location */}
        <div className="flex items-center gap-2">
          <Info className="w-3 h-3 text-blue-600" />
          <span className="text-zinc-400 italic text-xs">
            Images stored in: {currentFolderPath}
          </span>
        </div>

        {/* Upload instructions */}
        {isUploading && (
          <div className="text-xs text-zinc-500">
            Upload widget is opening... You can browse files, use camera, or
            select from cloud storage.
          </div>
        )}
      </div>
    </div>
  );
};
export default MultipleImageUpload;
