import { RefObject } from "react";

export const useExpandedPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getPosition = () => {
    if (!ref.current) {
      return {
        top: 0,
        left: 0,
      };
    }
    const rect = ref.current.getBoundingClientRect();
    let left = rect.left + window.scrollX;
    const top = rect.top + window.scrollY;

    if (left + rect.width > window.innerWidth) {
      left = rect.right + window.scrollX - rect.width;

      if (left < 0) {
        left = window.innerWidth;
      }
    }

    if (left < 0) {
      left = 16;
    }

    return {
      top,
      left,
    };
  };

  return { getPosition };
};
