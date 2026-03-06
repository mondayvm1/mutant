import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-mutant.jpg";
import { PreOrderDialog } from "./PreOrderDialog";

const LETTERS = "MUTANT".split("");

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // scroll-driven horizontal drift: letters slide further right as you scroll down
  const lettersX = useTransform(scrollYProgress, [0, 1], [0, 120]);

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
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-16 md:pt-0"
        style={{ opacity }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Introducing a New Species
        </motion.p>

        {/* THE — same size as MUTANT, drives in from left */}
        <div className="overflow-hidden mb-0">
          <motion.div
            className="font-ghastly text-[clamp(3.8rem,12.5vw,13.5rem)] leading-none text-foreground"
            style={{ WebkitTextStroke: "2px currentColor" }}
            initial={{ x: -600, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            THE
          </motion.div>
        </div>

        {/* MUTANT — each letter drives in left→right with stagger, then drifts right on scroll */}
        <motion.div
          className="flex justify-center items-end leading-none overflow-visible"
          style={{ x: lettersX }}
        >
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              className="font-ghastly text-primary inline-block text-[clamp(3.8rem,12.5vw,13.5rem)] leading-none"
              style={{
                textShadow: "0 0 50px hsl(82,85%,50%/0.55), 0 0 100px hsl(82,85%,50%/0.2)",
                WebkitTextStroke: "2px hsl(82,85%,50%)",
              }}
              initial={{ x: -400 - i * 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.45 + i * 0.07,
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mt-6 mb-8 sm:mb-10 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Speeds starting at 35 MPH and beyond — customized to your build. The 4-wheeler reinvented from the ground up.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <PreOrderDialog>
            <button className="inline-block px-8 sm:px-10 py-4 bg-primary text-primary-foreground font-display text-xl sm:text-2xl tracking-widest hover:box-glow-strong transition-shadow duration-300 text-center">
              PRE ORDER NOW
            </button>
          </PreOrderDialog>
          <a
            href="#community"
            className="inline-block px-8 sm:px-10 py-4 border border-foreground/20 text-foreground font-display text-xl sm:text-2xl tracking-widest hover:border-primary/50 transition-colors duration-300 text-center"
          >
            JOIN THE COMMUNITY
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
