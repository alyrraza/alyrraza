import { GraduationCap, FileText, Users } from "lucide-react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Chip } from "@/components/ui/Chip";
import { ProfilePhoto } from "./ProfilePhoto";

export function About() {
  return (
    <section id="about" className="perspective-section mx-auto max-w-5xl px-6 py-12 sm:py-14">
      <SectionHeading eyebrow="About" title="A short version" />
      <ScrollReveal y={40} z={160}>
        <div className="mt-8 flex flex-col items-center gap-10 md:flex-row md:items-start">
          <div className="shrink-0">
            <ProfilePhoto />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            {profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal y={40} z={160}>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-bg-secondary p-6">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-accent">
              <GraduationCap size={16} aria-hidden />
              Education
            </h3>
            {profile.education.map((edu) => (
              <div key={edu.degree} className="space-y-1">
                <p className="font-bold text-text-primary">{edu.degree}</p>
                <p className="text-sm text-text-secondary">{edu.school}</p>
                <p className="font-mono text-xs text-text-tertiary">{edu.period}</p>
                <p className="pt-2 text-sm text-text-secondary">{edu.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-bg-secondary p-6">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-accent">
              <FileText size={16} aria-hidden />
              Publications
            </h3>
            <div className="space-y-4">
              {profile.publications.map((pub) => (
                <div key={pub.citation} className="space-y-1.5">
                  <p className="text-sm text-text-secondary">{pub.citation}</p>
                  <p className="text-xs text-text-tertiary">{pub.venue}</p>
                  <Chip className={pub.status === "Accepted" ? "text-accent" : undefined}>
                    {pub.status}
                  </Chip>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-bg-secondary p-6">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-accent">
              <Users size={16} aria-hidden />
              Service & Activities
            </h3>
            <ul className="space-y-3">
              {profile.service.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
