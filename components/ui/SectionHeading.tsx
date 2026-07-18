"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn("max-w-2xl", className)}
    >
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="relative inline-block text-3xl font-bold text-text-primary sm:text-4xl">
        {title}
        <span className="absolute -bottom-2 left-0 h-[2px] w-16 bg-gradient-to-r from-accent to-transparent" />
      </h2>
      {description && (
        <p className="mt-6 text-base text-text-secondary sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
