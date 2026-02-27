import { ScrollReveal } from "./ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import sideImg from "@/assets/mutant-side.jpg";

export function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgX = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            style={{ x: imgX, opacity: imgOpacity }}
          >
            <img
              src={sideImg}
              alt="Mutant side profile"
              className="w-full rounded-sm"
            />
            <div className="absolute inset-0 border border-primary/20 rounded-sm" />
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/10 rounded-sm -z-10" />
          </motion.div>

          {/* Text */}
          <div>
            <ScrollReveal direction="right">
              <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
                The Solution
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100}>
              <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] text-foreground mb-8">
                LOW TO THE
                <br />
                <span className="gradient-text">GROUND</span>
                <br />
                HARD TO KILL
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                The Mutant flips the script on everything you know about four-wheelers. 
                By dropping the center of gravity dramatically, we've created a machine that 
                hugs the earth — making it both faster and safer than anything on the market.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <p className="text-muted-foreground font-body leading-relaxed">
                This isn't an upgrade. It's a whole new vertical. A category of one. 
                The Mutant doesn't compete — it makes the competition irrelevant.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
