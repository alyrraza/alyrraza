"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, Layers } from "lucide-react";
import { useLens } from "@/lib/LensContext";
import { profile } from "@/content/profile";
import { LensToggle } from "./LensToggle";

function FloatCard({
  icon: Icon,
  value,
  label,
  side,
  delay = 0,
}: {
  icon: typeof Briefcase;
  value: string;
  label: string;
  side: "left" | "right";
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.7, delay },
        x: { duration: 0.7, delay },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute top-1/2 ${
        side === "left" ? "left-4 xl:left-16" : "right-4 xl:right-16"
      } hidden -translate-y-1/2 lg:block`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-bg-secondary/70 px-4 py-3 shadow-[0_0_30px_var(--accent-glow)] backdrop-blur">
        <span className="rounded-lg bg-bg-tertiary p-2 text-accent">
          <Icon size={18} aria-hidden />
        </span>
        <div className="text-left">
          <p className="font-mono text-lg font-bold text-text-primary">{value}</p>
          <p className="text-xs text-text-tertiary">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { lens } = useLens();

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, var(--accent-glow), transparent 65%)",
        }}
      />

      <FloatCard icon={Briefcase} value="3+ Years" label="Production ML Engineering" side="left" />
      <FloatCard icon={Layers} value="17 Projects" label="Shipped & Documented" side="right" delay={0.15} />

      <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent">
        {profile.monogram} / Portfolio
      </p>

      <h1 className="text-4xl font-bold text-text-primary sm:text-6xl md:text-7xl">
        {profile.name}
      </h1>

      <div className="mt-6 h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={lens}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-base text-text-secondary sm:text-lg"
          >
            {profile.taglines[lens]}
          </motion.p>
        </AnimatePresence>
      </div>

      <LensToggle className="mt-10" />

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 text-text-tertiary"
      >
        <ChevronDown size={22} />
      </motion.div>
    </section>
  );
}
