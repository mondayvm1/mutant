import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import actionImg from "@/assets/mutant-action.jpg";

export function ActionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="relative py-16">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        style={{ scale, opacity }}
      >
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={actionImg}
            alt="Mutant in action"
            className="w-full h-[60vh] md:h-[80vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-xl">
            <h2 className="font-display text-[clamp(2rem,5vw,5rem)] leading-[0.9] text-foreground mb-4">
              BUILT FOR
              <br />
              <span className="gradient-text">THE WILD</span>
            </h2>
            <p className="text-foreground/70 font-body text-sm md:text-base leading-relaxed">
              From desert dunes to mountain trails — the Mutant doesn't just survive the terrain. 
              It owns it.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
