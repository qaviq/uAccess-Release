import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface BlockProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Block({ title, children, className }: BlockProps) {
  return (
    <Card className={cn("flex h-full flex-col overflow-hidden rounded-lg border shadow-md", className)}>
      {title && (
        <div className="sticky top-0 z-10 border-b bg-white p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </Card>
  );
}