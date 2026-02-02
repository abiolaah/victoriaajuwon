import { Role } from "@/types/role";
import { create } from "zustand";

export interface ModalStoreInterface {
  itemId?: string;
  role?: Role;
  type: "skill" | "project";
  isOpen: boolean;
  openModal: (itemId: string, type: "skill" | "project", role?: Role) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  itemId: undefined,
  type: "skill",
  isOpen: false,
  openModal: (itemId: string, type: "skill" | "project", role?: Role) => {
    // Force the Type to be exactly "movie" or "tv"
    const validType = type === "project" ? "project" : "skill";
    return set({
      isOpen: true,
      itemId,
      role,
      type: validType,
    });
  },
  closeModal: () =>
    set({
      isOpen: false,
      itemId: undefined,
      role: undefined,
      // Don't reset Type here to maintain it for future uses
    }),
}));

export default useInfoModal;
