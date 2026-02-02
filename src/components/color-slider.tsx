"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

function getTrackColor(value: number): string {
  if (value < 50) {
    return "bg-red-500";
  } else if (value < 80) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
}

function ColorSlider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onValueChange,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const [internalValue, setInternalValue] = React.useState<number[]>(
    Array.isArray(value)
      ? value
      : Array.isArray(defaultValue)
        ? defaultValue
        : [min],
  );

  const currentValue = Array.isArray(value) ? value[0] : internalValue[0];

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  const trackColor = getTrackColor(currentValue);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onValueChange={handleValueChange}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full transition-colors duration-200",
            trackColor,
          )}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className={cn(
          "ring-ring/50 block size-5 shrink-0 rounded-full border-2 bg-white shadow-md transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
          currentValue < 50
            ? "border-red-500"
            : currentValue < 80
              ? "border-yellow-500"
              : "border-green-500",
        )}
      />
    </SliderPrimitive.Root>
  );
}

export { ColorSlider };
