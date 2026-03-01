import React from "react";
import { cn } from "@/app/lib/utils";

export function Progress({
  value = 0,
  className = "",
  indicatorColor = "bg-[var(--primary)]",
}: {
  value?: number;
  className?: string;
  indicatorColor?: string;
}) {
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-[width]", indicatorColor)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
