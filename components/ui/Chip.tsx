import { cn } from "@/lib/utils";

export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-bg-tertiary px-3 py-1 font-mono text-xs text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
