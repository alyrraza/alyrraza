import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsStrip />

        <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading eyebrow="Selected work" title="Featured Projects" />
          <div className="mt-12">
            <ProjectGrid projects={projects} />
          </div>
        </section>

        <Skills />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
