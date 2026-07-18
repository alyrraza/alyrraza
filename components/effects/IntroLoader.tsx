"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/content/profile";

const SESSION_KEY = "portfolio-intro-seen";
const STATUS_LINES = ["booting_models", "loading_weights", "ready"];
const WIPE_ORIGIN = "50% 42%";

type Phase = "loading" | "wiping" | "skip";

function getInitialPhase(): Phase {
  // Always replay in dev so it's easy to iterate on; only gate to
  // once-per-session in production builds.
  const alreadySeen =
    process.env.NODE_ENV === "production" &&
    window.sessionStorage.getItem(SESSION_KEY);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  return alreadySeen || prefersReducedMotion ? "skip" : "loading";
}

function statusForPercent(percent: number) {
  if (percent < 40) return STATUS_LINES[0];
  if (percent < 90) return STATUS_LINES[1];
  return STATUS_LINES[2];
}

export function IntroLoader() {
  const [phase, setPhase] = useState<Phase>(() => getInitialPhase());
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (phase !== "loading") return;
    window.sessionStorage.setItem(SESSION_KEY, "1");

    const interval = window.setInterval(() => {
      setPercent((p) => Math.min(100, p + Math.round(6 + Math.random() * 10)));
    }, 90);

    return () => window.clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading" || percent < 100) return;
    const timeout = window.setTimeout(() => setPhase("wiping"), 300);
    return () => window.clearTimeout(timeout);
  }, [phase, percent]);

  if (phase === "skip") return null;

  const wiping = phase === "wiping";

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg-primary"
      style={{ clipPath: `circle(150% at ${WIPE_ORIGIN})` }}
      animate={wiping ? { clipPath: `circle(0% at ${WIPE_ORIGIN})` } : undefined}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (wiping) setPhase("skip");
      }}
    >
      <motion.div
        animate={{ opacity: wiping ? 0 : 1, scale: wiping ? 0.85 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <p className="font-mono text-6xl font-bold text-accent sm:text-7xl">
          {profile.monogram}
        </p>
        <div className="mt-6 h-px w-40 overflow-hidden bg-border">
          <div
            className="h-full bg-accent transition-[width] duration-150 ease-linear"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          {statusForPercent(percent)} / {percent}%
        </p>
      </motion.div>
    </motion.div>
  );
}
