"use client";

import { useMemo } from "react";
import { Project } from "@/types";
import { useLens } from "@/lib/LensContext";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({
  projects,
  featuredOnly = false,
}: {
  projects: Project[];
  featuredOnly?: boolean;
}) {
  const { lens } = useLens();

  const filtered = useMemo(() => {
    return projects
      .filter((p) => p.lenses.includes(lens))
      .filter((p) => (featuredOnly ? p.featured : true))
      .sort((a, b) => a.order - b.order);
  }, [projects, lens, featuredOnly]);

  return (
    <div className="perspective-section">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => (
          <ScrollReveal key={project.slug} index={index}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-16 text-center text-text-tertiary">
          No projects in this lens yet.
        </p>
      )}
    </div>
  );
}
