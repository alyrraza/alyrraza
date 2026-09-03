"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "@/types";
import { useLens } from "@/lib/LensContext";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ProjectMediaBlock } from "./ProjectMediaBlock";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lens } = useLens();

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-bg-secondary p-6"
          >
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-4 top-4 rounded-full p-1.5 text-text-secondary transition-colors hover:text-accent"
            >
              <X size={20} />
            </button>

            <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-xl">
              <ProjectMediaBlock
                media={project.thumbnail}
                className="h-full w-full"
                fit={project.thumbnail?.fit ?? "cover"}
              />
            </div>

            <h3 id="project-modal-title" className="text-xl font-bold text-text-primary">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              {project.descriptions[lens]}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`/projects/${project.slug}?lens=${lens}`} variant="primary">
                View full case study
              </Button>
              {project.links.github && (
                <Button href={project.links.github} variant="secondary" external>
                  GitHub
                </Button>
              )}
              {project.links.liveDemo && (
                <Button href={project.links.liveDemo} variant="secondary" external>
                  Live demo
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
