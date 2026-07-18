"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { profile } from "@/content/profile";
import { useLens } from "@/lib/LensContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const { lens } = useLens();
  const [cvOpen, setCvOpen] = useState(false);

  const cvOptions = [
    { label: "AI Engineer CV", href: profile.cvs.aiEngineer, highlight: lens === "engineering" },
    { label: "ML Engineer CV", href: profile.cvs.mlEngineer, highlight: false },
    { label: "Research CV", href: profile.cvs.research, highlight: lens === "research" },
  ].sort((a, b) => Number(b.highlight) - Number(a.highlight));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg-primary/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-lg font-bold text-accent">
          {profile.monogram}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              <GithubIcon size={18} />
            </Link>
            <Link
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              <LinkedinIcon size={18} />
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={() => setCvOpen((v) => !v)}
              aria-expanded={cvOpen}
              className="flex items-center gap-1 rounded-full border border-border px-4 py-1.5 text-sm text-text-primary transition-colors hover:border-accent-dim"
            >
              CV
              <ChevronDown
                size={14}
                className={cn("transition-transform", cvOpen && "rotate-180")}
              />
            </button>

            <AnimatePresence>
              {cvOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-bg-secondary shadow-xl"
                >
                  {cvOptions.map((cv) => (
                    <a
                      key={cv.label}
                      href={cv.href}
                      download
                      onClick={() => setCvOpen(false)}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors hover:bg-bg-tertiary",
                        cv.highlight ? "text-accent" : "text-text-secondary"
                      )}
                    >
                      {cv.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
}
