import { Mail, Sparkles, LineChart } from "lucide-react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

const socialLinks = [
  { label: "GitHub", href: profile.socials.github, icon: GithubIcon },
  { label: "HuggingFace", href: profile.socials.huggingFace, icon: Sparkles },
  { label: "Kaggle", href: profile.socials.kaggle, icon: LineChart },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon },
];

export function Contact() {
  return (
    <section id="contact" className="perspective-section mx-auto max-w-4xl px-6 py-12 sm:py-14 text-center">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        description="Open to AI/ML engineering roles, research collaborations, and PhD opportunities."
        className="mx-auto items-center text-center"
      />

      <ScrollReveal y={40} z={160}>
        <div className="mt-10 flex flex-col items-center gap-8">
          <Button href={`mailto:${profile.email}`} variant="primary" className="text-base">
            <Mail size={18} />
            {profile.email}
          </Button>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Button key={label} href={href} variant="secondary" external>
                <Icon size={16} />
                {label}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 border-t border-border pt-8">
            <Button href={profile.cvs.aiEngineer} variant="ghost">
              CV: AI Engineer
            </Button>
            <Button href={profile.cvs.mlEngineer} variant="ghost">
              CV: ML Engineer
            </Button>
            <Button href={profile.cvs.research} variant="ghost">
              CV: Research
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
