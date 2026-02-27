import { ScrollReveal } from "./ScrollReveal";

export function ProblemSection() {
  return (
    <section id="discover" className="relative py-32 gradient-section">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            The Problem
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] text-foreground mb-8">
            4-WHEELERS HAVEN'T
            <br />
            <span className="text-muted-foreground">EVOLVED IN DECADES</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              number: "01",
              title: "TOO HIGH",
              desc: "Traditional ATVs sit dangerously high with a center of gravity that begs to roll. Every year, thousands of riders pay the price.",
            },
            {
              number: "02",
              title: "TOO SLOW",
              desc: "High ride height means instability at speed. Manufacturers limit performance because the platform can't handle it.",
            },
            {
              number: "03",
              title: "TOO DANGEROUS",
              desc: "Over 100,000 ATV injuries per year in the US alone. The fundamental design is the problem — not the rider.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.number} delay={200 + i * 150} direction="up">
              <div className="border-t border-border pt-6">
                <span className="text-primary font-display text-4xl">{item.number}</span>
                <h3 className="font-display text-3xl text-foreground mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
