"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener("resize", callback);
    media.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  return !isMobile && !prefersReducedMotion;
}

function getServerSnapshot() {
  return false;
}

export function use3DEnabled() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
