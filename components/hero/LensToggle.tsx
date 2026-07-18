"use client";

import { motion } from "framer-motion";
import { useLens } from "@/lib/LensContext";
import { cn } from "@/lib/utils";

const OPTIONS: { key: "engineering" | "research"; label: string }[] = [
  { key: "engineering", label: "Engineer" },
  { key: "research", label: "Researcher" },
];

export function LensToggle({ className }: { className?: string }) {
  const { lens, setLens } = useLens();

  return (
    <div
      role="tablist"
      aria-label="Portfolio lens"
      className={cn(
        "relative inline-flex rounded-full border border-border bg-bg-secondary p-1",
        className
      )}
    >
      {OPTIONS.map((option) => {
        const active = lens === option.key;
        return (
          <button
            key={option.key}
            role="tab"
            aria-selected={active}
            onClick={() => setLens(option.key)}
            className={cn(
              "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300",
              active ? "text-bg-primary" : "text-text-secondary hover:text-text-primary"
            )}
          >
            {active && (
              <motion.span
                layoutId="lens-toggle-pill"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 -z-10 rounded-full bg-accent"
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
