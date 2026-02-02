"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash, Info } from "lucide-react";
import {
  CldUploadWidget,
  CldUploadWidgetPropsChildren,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

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
  value: string;
  onChange: (url: string, assetId: string, folder: string) => void;
  onRemove: () => void;
  onRemoveError?: (error: string) => void;
  folderType: FolderType;
  className?: string;
}

const ImageUploader: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  onRemoveError,
  folderType,
  className = "",
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
        return "Project Image";
      case "SKILLS":
        return "Skills Icon";
      case "AVATAR":
        return "Profile Avatar";
      case "GIF":
        return "Banner GIFs";
      case "PROFESSIONAL":
        return "Professional Image";
      default:
        return "Image";
    }
  };

  return (
    <div className={className}>
      {/* Image Preview */}
      <div className="mb-4 flex items-center gap-4">
        {value && (
          <div className="relative w-50 h-50">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={onRemove}
                size="sm"
                className="bg-red-500 text-white hover:bg-red-600"
              >
                <Trash className="w-3 h-3" />
              </Button>
            </div>
            <Image
              src={value}
              alt="uploaded image"
              fill
              sizes="100%"
              className="object-cover rounded-lg"
            />
            {/* GIF indicator */}
            {folderType === "GIF" && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                GIF
              </div>
            )}
            <p className="flex flex-row">
              <Info className="w-4 h-4 text-blue-600" />
              <span className="text-white font-italic text-sm">
                Image stored in: {currentFolderPath}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Upload Widget */}
      <CldUploadWidget
        uploadPreset="personal-portfolio"
        options={{
          folder: currentFolderPath,
          resourceType: folderType === "GIF" ? "auto" : "image", // Use 'auto' for GIFs to handle both images and GIFs
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
            <div className="space-y-2">
              <Button
                type="button"
                className="bg-[#e84539] text-white hover:bg-[#d06e6e]"
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
              </Button>
              {isUploading && (
                <div className="text-xs text-gray-500">
                  Upload widget is opening... You can browse files, use camera,
                  or select from cloud storage.
                </div>
              )}
              <p className="flex flex-row gap-2 items-center">
                <Info className="w-3 h-3 text-blue-600" />
                <span className="text-white italic text-xs">
                  Image stored in: {currentFolderPath}
                </span>
              </p>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

// Specialized uploader components
interface BaseUploaderProps {
  value: string;
  onChange: (url: string, assetId: string, folder: string) => void;
  onRemove: () => void;
  onRemoveError?: (error: string) => void;
  className?: string;
}

interface ProjectImageUploaderProps extends BaseUploaderProps {
  multiple?: boolean;
}

export const ProjectImageUploader: React.FC<ProjectImageUploaderProps> = ({
  ...props
}) => {
  return <ImageUploader {...props} folderType="PROJECTS" />;
};

export const SkillImageUploader: React.FC<BaseUploaderProps> = (props) => {
  return <ImageUploader {...props} folderType="SKILLS" />;
};

export const AvatarUploader: React.FC<BaseUploaderProps> = (props) => {
  return <ImageUploader {...props} folderType="AVATAR" />;
};

export const BannerGifUploader: React.FC<BaseUploaderProps> = (props) => {
  return <ImageUploader {...props} folderType="GIF" />;
};

export const ProfessionalUploader: React.FC<BaseUploaderProps> = (props) => {
  return <ImageUploader {...props} folderType="PROFESSIONAL" />;
};

export default ImageUploader;
