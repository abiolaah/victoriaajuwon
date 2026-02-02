import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Card from "./card";
import { Button } from "./ui/button";
import { Role } from "@/types/role";
import { ProjectsProps, SkillsProps } from "@/lib/types";

interface ListProps {
  title: string;
  data: (SkillsProps | ProjectsProps)[];
  dataType: "skill" | "project";
  skills?: SkillsProps[]; // Add skills prop
  role?: Role;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const List = ({
  title,
  data,
  dataType,
  skills,
  role,
  onScrollLeft,
  onScrollRight,
  containerRef,
}: ListProps) => {
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  // Calculate card width to fit exactly 5 cards
  const getCardWidth = () => {
    if (typeof window === "undefined") return 18;

    // Get container width (accounting for padding)
    const containerPadding = 96; // 48px on each side (md:px-12)
    const availableWidth = window.innerWidth - containerPadding;

    // Calculate width for 5 cards with gaps
    const numCards = 5;
    const totalGaps = (numCards - 1) * 8; // 8px gap between cards
    const cardWidth = (availableWidth - totalGaps) / numCards;

    // Convert to vw
    return (cardWidth / window.innerWidth) * 100;
  };

  const cardWidthVw = getCardWidth();

  // Initialize scroll position to the middle set on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container || data.length === 0 || isInitializedRef.current) return;

    // Calculate initial positon (middle of the tripled data)
    const cardWidth = cardWidthVw * (window.innerWidth / 100); // 18vw
    const gap = 8; // 2 * 0.5rem (gap-2)
    const itemWidth = cardWidth + gap;
    const originalLength = data.length / 3;
    const initialPosition = originalLength * itemWidth;

    // Set initial scroll position without animation
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      if (container) {
        container.scrollLeft = initialPosition;
        isInitializedRef.current = true;
      }
    }, 0);
    container.scrollLeft = initialPosition;
  }, [data.length, containerRef, cardWidthVw]);

  // Handle infinite scroll repositioning
  useEffect(() => {
    const container = containerRef.current;
    if (!container || data.length === 0) return;

    let isRepositioning = false;

    const handleScroll = () => {
      if (isRepositioning || !isInitializedRef.current) return;

      const cardWidth = cardWidthVw * (window.innerWidth / 100);
      const gap = 8;
      const itemWidth = cardWidth + gap;
      const originalLength = data.length / 3;
      const oneSetWidth = originalLength * itemWidth;
      const scrollLeft = container.scrollLeft;

      // Update left chevron visibility
      const initialPosition = oneSetWidth;
      setShowLeftChevron(scrollLeft > initialPosition + 50);

      // Check boundaries and reposition if needed
      const maxScroll = oneSetWidth * 2.5; // Before reaching end of third set
      const minScroll = oneSetWidth * 0.5; // Before reaching start of first set

      if (scrollLeft >= maxScroll) {
        // Scrolled too far right, jump back one set
        isRepositioning = true;
        const offset = scrollLeft - oneSetWidth;
        container.scrollLeft = offset;

        setTimeout(() => {
          isRepositioning = false;
        }, 50);
      } else if (scrollLeft <= minScroll) {
        // Scrolled too far left, jump forward one set
        isRepositioning = true;
        const offset = scrollLeft + oneSetWidth;
        container.scrollLeft = offset;

        setTimeout(() => {
          isRepositioning = false;
        }, 50);
      }
    };

    // Use scroll event with debouncing
    const debouncedScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(handleScroll, 10);
    };

    container.addEventListener("scroll", debouncedScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", debouncedScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [containerRef, data.length, cardWidthVw]);

  // Wrap scroll handlers to update chevron visibility
  const handleScrollLeftClick = () => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = cardWidthVw * (window.innerWidth / 100);
    const gap = 8;
    const scrollAmount = (cardWidth + gap) * 5; // Scroll 5 cards

    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });

    setShowLeftChevron(true);
    onScrollLeft();
  };

  const handleScrollRightClick = () => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = cardWidthVw * (window.innerWidth / 100);
    const gap = 8;
    const scrollAmount = (cardWidth + gap) * 5; // Scroll 5 cards

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setShowLeftChevron(true);
    onScrollRight();
  };

  if (data.length === 0) return null;

  return (
    <div className="mb-12 group">
      <div className="flex flex-row items-center justify-between mb-4 px-4 md:px-12">
        <h2 className="text-white text-xl md:text-2xl font-semibold">
          {title}
        </h2>
      </div>

      <div className="relative px-4 md:px-12">
        {/* Left Navigation Button */}
        <Button
          onClick={handleScrollLeftClick}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-2 rounded-r-md transition-all duration-300 ml-4 ${
            showLeftChevron
              ? "opacity-0 group-hover:opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={32} />
        </Button>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="flex gap-2 overflow-x-hidden scroll-smooth no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {data.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="shrink-0"
              style={{ width: `${cardWidthVw}vw` }}
            >
              <Card
                data={item}
                dataType={dataType}
                role={role}
                skills={dataType === "project" ? skills : undefined}
              />
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <Button
          onClick={handleScrollRightClick}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-2 rounded-l-md opacity-100 group-hover:opacity-100 transition-all duration-300 mr-4"
          aria-label="Scroll right"
        >
          <ChevronRight size={32} />
        </Button>
      </div>

      {/* Hide scrollbar with CSS */}
      <style jsx>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};
