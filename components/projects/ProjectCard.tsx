"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import { useLens } from "@/lib/LensContext";
import { TiltCard } from "@/components/effects/TiltCard";
import { GlowCard } from "@/components/ui/GlowCard";
import { Chip } from "@/components/ui/Chip";
import { ProjectMediaBlock } from "./ProjectMediaBlock";

const MotionLink = motion.create(Link);

export function ProjectCard({ project }: { project: Project }) {
  const { lens } = useLens();
  const description = project.descriptions[lens];

  return (
    <TiltCard>
      <MotionLink
        href={`/projects/${project.slug}?lens=${lens}`}
        className="block h-full"
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        <GlowCard className="flex h-full flex-col overflow-hidden">
          <div className="relative aspect-[16/10] w-full">
            <ProjectMediaBlock media={project.thumbnail} className="h-full w-full" />
          </div>

          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-text-primary">
                {project.title}
              </h3>
              <ArrowUpRight
                size={18}
                className="mt-1 shrink-0 text-text-tertiary transition-colors group-hover:text-accent"
                aria-hidden
              />
            </div>

            <p className="text-sm text-text-secondary">{description}</p>

            <div className="mt-auto flex flex-wrap gap-2 pt-3">
              {project.tags.slice(0, 4).map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </div>
        </GlowCard>
      </MotionLink>
    </TiltCard>
  );
}
