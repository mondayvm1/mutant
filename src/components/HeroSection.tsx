import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-mutant.jpg";
import { Link } from "react-router-dom";

const MUTANT_LETTERS = "MUTANT".split("");

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const lettersX = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      {/* Background — parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroImg}
          alt="The Mutant 4-Wheeler"
          className="w-full h-full object-cover object-center"
        />
        {/* Bottom gradient for CTA legibility */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      {/* Content: title at top · vehicle in middle · CTAs at bottom */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-between px-5 sm:px-8 pt-[72px] pb-10 sm:pb-14"
        style={{ opacity }}
      >
        {/* ── TOP: THE MUTANT ── */}
        <div className="text-center">
          {/* THE MUTANT — single line, centered, per-letter on MUTANT */}
          <motion.div
            className="flex items-end justify-center leading-none"
            style={{ x: lettersX }}
          >
            {/* THE */}
            <motion.span
              className="font-ghastly text-foreground leading-none"
              style={{
                fontSize: "clamp(2.4rem,9.5vw,11rem)",
                WebkitTextStroke: "clamp(1px,0.15vw,2px) currentColor",
              }}
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              THE&nbsp;
            </motion.span>

            {/* MUTANT — each letter staggers in */}
            {MUTANT_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="font-ghastly text-primary inline-block leading-none"
                style={{
                  fontSize: "clamp(2.4rem,9.5vw,11rem)",
                  textShadow: "0 0 40px hsl(82,85%,50%/0.55), 0 0 80px hsl(82,85%,50%/0.2)",
                  WebkitTextStroke: "clamp(1px,0.15vw,2px) hsl(82,85%,50%)",
                }}
                initial={{ x: -200 - i * 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.38 + i * 0.07,
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ── BOTTOM: tagline + CTAs ── */}
        <div className="text-center">
          <motion.p
            className="font-body text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto mb-5 sm:mb-6 px-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            35 MPH and beyond — customized to your build. The 4-wheeler reinvented from the ground up.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <Link
              to="/mutant"
              className="inline-block px-8 sm:px-10 py-4 bg-primary text-primary-foreground font-display text-base sm:text-xl tracking-widest hover:bg-primary/90 hover:shadow-[0_0_40px_hsl(82,85%,50%/0.5)] transition-all text-center"
            >
              BUILD YOUR MUTANT
            </Link>
            <a
              href="/community"
              className="px-8 sm:px-10 py-4 border border-foreground/30 text-foreground font-display text-base sm:text-xl tracking-widest hover:border-primary/50 transition-colors text-center"
            >
              JOIN THE COMMUNITY
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
}
