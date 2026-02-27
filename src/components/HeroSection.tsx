import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-mutant.jpg";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100svh] md:h-[120vh] overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroImg}
          alt="The Mutant 4-Wheeler"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-16 md:pt-0" style={{ opacity }}>
        <motion.p
          className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Introducing a New Species
        </motion.p>

        <motion.h1
          className="font-display text-[clamp(3.5rem,11vw,12rem)] leading-[0.85] tracking-wider text-foreground mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          THE
          <br />
          <span className="gradient-text">MUTANT</span>
        </motion.h1>

        <motion.p
          className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Top speeds from 45 to 100 MPH based on customization and desired model. The 4-wheeler reinvented from the ground up.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            href="#reserve"
            className="inline-block px-8 sm:px-10 py-4 bg-primary text-primary-foreground font-display text-xl sm:text-2xl tracking-widest hover:box-glow-strong transition-shadow duration-300 text-center"
          >
            RESERVE YOURS
          </a>
          <a
            href="#discover"
            className="inline-block px-8 sm:px-10 py-4 border border-foreground/20 text-foreground font-display text-xl sm:text-2xl tracking-widest hover:border-primary/50 transition-colors duration-300 text-center"
          >
            DISCOVER
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
}
