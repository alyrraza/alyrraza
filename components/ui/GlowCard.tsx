import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-bg-secondary transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent-dim hover:shadow-[0_0_32px_var(--accent-glow)]",
        className
      )}
    >
      {children}
    </div>
  );
}
