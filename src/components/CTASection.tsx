import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";
import { useState } from "react";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="reserve" className="relative py-32 gradient-section overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Limited First Run
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.85] text-foreground mb-6">
            BE FIRST
            <br />
            <span className="gradient-text">TO MUTATE</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-muted-foreground font-body text-lg mb-10 max-w-lg mx-auto">
            Only 100 units in the first production run. Reserve your spot with $0 down. 
            Just your email — and your commitment to riding different.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-primary-foreground font-display text-xl tracking-widest hover:box-glow-strong transition-shadow duration-300"
              >
                RESERVE
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 border border-primary/30 rounded-sm"
            >
              <p className="font-display text-3xl text-primary mb-2">YOU'RE IN</p>
              <p className="text-muted-foreground font-body">
                We'll reach out when it's time. Welcome to the mutation.
              </p>
            </motion.div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-4">
            {["$0 DOWN", "100 UNITS", "2026 DELIVERY"].map((item) => (
              <span key={item} className="font-display text-lg text-muted-foreground tracking-wider">
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
