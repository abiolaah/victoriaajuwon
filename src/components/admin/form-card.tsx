import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

interface FormCardProps {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const FormCard = ({ children, footer, className }: FormCardProps) => {
  return (
    <Card
      className={cn(
        "bg-zinc-900 border-zinc-800 shadow-lg w-full mx-auto",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-white text-2xl font-bold hidden">
          Add
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
      {footer && (
        <CardFooter className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
