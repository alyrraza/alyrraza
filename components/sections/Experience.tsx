import { Briefcase } from "lucide-react";
import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="perspective-section mx-auto max-w-5xl px-6 py-12 sm:py-14"
    >
      <SectionHeading eyebrow="Career" title="Experience" />

      <div className="mt-10 space-y-6">
        {experience.map((entry, index) => (
          <ScrollReveal key={entry.role} index={index} y={40} z={160}>
            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="mt-1 rounded-lg bg-bg-tertiary p-2 text-accent">
                    <Briefcase size={18} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold text-text-primary">{entry.role}</h3>
                    <p className="text-sm text-text-secondary">
                      {entry.org} &middot; {entry.location}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs uppercase tracking-wide text-text-tertiary">
                  {entry.period}
                </span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {entry.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm text-text-secondary sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
