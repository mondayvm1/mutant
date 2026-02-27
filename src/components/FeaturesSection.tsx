import { ScrollReveal } from "./ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import detailImg from "@/assets/mutant-detail.jpg";

const features = [
  {
    stat: "40%",
    label: "LOWER CENTER OF GRAVITY",
    desc: "Hugs the ground like nothing before it. Physics isn't a suggestion — it's an advantage.",
  },
  {
    stat: "2.4×",
    label: "WIDER STANCE RATIO",
    desc: "Stability that lets you push harder, turn sharper, ride longer.",
  },
  {
    stat: "0",
    label: "ROLLOVER INCIDENTS IN TESTING",
    desc: "Thousands of hours. Zero rollovers. The geometry simply doesn't allow it.",
  },
  {
    stat: "45+",
    label: "MPH TOP SPEED",
    desc: "When the platform is stable, you can unlock real performance.",
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative py-32 gradient-section overflow-hidden">
      {/* Floating detail image */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 pointer-events-none hidden lg:block"
        style={{ y }}
      >
        <img src={detailImg} alt="" className="w-full" />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            By the Numbers
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] text-foreground mb-16">
            ENGINEERED TO
            <br />
            <span className="gradient-text">DOMINATE</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feat, i) => (
            <ScrollReveal key={feat.label} delay={200 + i * 150} direction="up">
              <div className="group border-l-2 border-primary/30 pl-6 hover:border-primary transition-colors duration-500">
                <span className="font-display text-6xl md:text-7xl gradient-text">
                  {feat.stat}
                </span>
                <h3 className="font-display text-xl text-foreground mt-2 tracking-wider">
                  {feat.label}
                </h3>
                <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
