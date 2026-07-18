import { stats } from "@/content/stats";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function StatsStrip() {
  return (
    <section className="perspective-section border-y border-border bg-bg-secondary/40 px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <ScrollReveal key={stat.label} index={index} y={30} z={140}>
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-accent sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wide text-text-tertiary sm:text-sm">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
