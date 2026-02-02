import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
      <DialogContent
        className={cn(
          "bg-zinc-900 border border-zinc-800 text-white min-w-250 h-[90vh] overflow-x-hidden overflow-y-auto p-0 fixed",
          className
        )}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="p-6 border-b border-zinc-800">
          <DialogTitle className="text-2xl font-bold text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Modal Display
          </DialogDescription>
        </DialogHeader>
        <div className="min-w-125 max-w-6xl p-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
