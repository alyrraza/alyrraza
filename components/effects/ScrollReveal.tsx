"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  index?: number;
  y?: number;
  z?: number;
}

export function ScrollReveal({
  children,
  className,
  index = 0,
  y = 60,
  z = 200,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(el, { opacity: 1 });
        gsap.from(el, {
          opacity: 0,
          duration: 0.5,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
        return;
      }

      gsap.set(el, {
        opacity: 0,
        y,
        z: -z,
        scale: 0.9,
      });

      gsap.to(el, {
        opacity: 1,
        y: 0,
        z: 0,
        scale: 1,
        duration: 0.9,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [index, y, z]);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
