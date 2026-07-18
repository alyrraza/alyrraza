import { skillGroups } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Skills() {
  return (
    <section id="skills" className="perspective-section mx-auto max-w-6xl px-6 py-12 sm:py-14">
      <SectionHeading eyebrow="Toolbox" title="Skills" />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <ScrollReveal key={group.category} index={index} y={40} z={160}>
            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <h3 className="mb-4 font-mono text-sm uppercase tracking-wide text-accent">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
