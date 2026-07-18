import Link from "next/link";
import { Mail, Sparkles, LineChart } from "lucide-react";
import { profile } from "@/content/profile";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

const links = [
  { label: "GitHub", href: profile.socials.github, icon: GithubIcon },
  { label: "HuggingFace", href: profile.socials.huggingFace, icon: Sparkles },
  { label: "Kaggle", href: profile.socials.kaggle, icon: LineChart },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex flex-wrap justify-center gap-5">
          {links.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="text-text-secondary transition-colors hover:text-accent"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
        <p className="text-xs text-text-tertiary">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js, deployed on
          Vercel.
        </p>
      </div>
    </footer>
  );
}
