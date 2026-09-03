import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { projects } from "@/content/projects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ProjectMediaBlock } from "@/components/projects/ProjectMediaBlock";
import { PageEnter } from "@/components/effects/PageEnter";
import { Lens } from "@/types";

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

function resolveLens(lensParam: string | string[] | undefined): Lens {
  return lensParam === "research" ? "research" : "engineering";
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title}: Ali Raza`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lens?: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const lens = resolveLens((await searchParams).lens);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageEnter>
        <section className="mx-auto max-w-5xl px-6 pt-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-text-primary sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 text-lg text-text-secondary">{project.tagline}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.github && (
                <Button href={project.links.github} variant="secondary" external>
                  <GithubIcon size={16} />
                  GitHub
                </Button>
              )}
              {project.links.liveDemo && (
                <Button href={project.links.liveDemo} variant="primary" external>
                  <ExternalLink size={16} />
                  Live demo
                </Button>
              )}
              {project.links.huggingFace && (
                <Button href={project.links.huggingFace} variant="secondary" external>
                  <Sparkles size={16} />
                  HuggingFace
                </Button>
              )}
              {project.links.paper && (
                <Button href={project.links.paper} variant="secondary" external>
                  <FileText size={16} />
                  Paper
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-12">
          <p className="max-w-2xl text-base text-text-secondary sm:text-lg">
            {project.descriptions[lens]}
          </p>
        </section>

        {project.media.length > 0 && (
          <section className="mx-auto max-w-5xl px-6 pb-12">
            <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto">
              {project.media.map((media, i) => (
                <div
                  key={i}
                  className="relative aspect-video w-[85%] shrink-0 snap-center overflow-hidden rounded-2xl bg-bg-tertiary sm:w-[70%]"
                >
                  <ProjectMediaBlock media={media} className="h-full w-full" fit="contain" />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.details[lens].length > 0 && (
          <section className="mx-auto max-w-5xl px-6 py-12">
            <h2 className="text-2xl font-bold text-text-primary">What I built</h2>
            <ul className="mt-6 space-y-3">
              {project.details[lens].map((detail, i) => (
                <li key={i} className="flex gap-3 text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text-primary">Tech stack</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Chip key={tag} className="text-sm">
                {tag}
              </Chip>
            ))}
          </div>
        </section>

        {project.results.length > 0 && (
          <section className="mx-auto max-w-5xl px-6 py-12">
            <h2 className="text-2xl font-bold text-text-primary">Key results</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {project.results.map((result) => (
                <div key={result.label}>
                  <p className="font-mono text-2xl font-bold text-accent sm:text-3xl">
                    {result.value}
                  </p>
                  <p className="mt-1 text-xs text-text-tertiary sm:text-sm">
                    {result.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-5xl px-6 py-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            Back to all projects
          </Link>
        </section>
        </PageEnter>
      </main>
      <Footer />
    </>
  );
}
