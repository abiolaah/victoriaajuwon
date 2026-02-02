"use client";

import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

const TagInput = ({
  value,
  onChange,
  placeholder = "Add tags...",
  className,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="achievement-list space-y-2">
        {value.map((tag) => (
          <div key={tag} className="achievement-item">
            <div className="achievement-bullet">•</div>
            <span className="achievement-text">{tag}</span>
            <button
              aria-label="Close"
              type="button"
              onClick={() => removeTag(tag)}
              className="text-zinc-400 hover:text-white ml-auto"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="border-zinc-700 bg-zinc-800/50 text-white focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/70 mt-2"
      />
      <p className="text-xs text-zinc-400">Press Enter to add a tag</p>
    </div>
  );
};
export default TagInput;
