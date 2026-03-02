import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";
import { useState } from "react";

// generate next 5 Saturdays (or next demo days) dynamically and mark the first one as sold out
function generateDemoDays(count = 5) {
  const days: { text: string; soldOut: boolean }[] = [];
  const today = new Date();
  // find next Saturday (0=Sunday, 6=Saturday)
  const offset = (6 - today.getDay() + 7) % 7 || 7; // always move forward at least one
  const nextSat = new Date(today);
  nextSat.setDate(today.getDate() + offset);

  for (let i = 0; i < count; i++) {
    const d = new Date(nextSat);
    days.push(d);
    nextSat.setDate(nextSat.getDate() + 7);
  }

  return days.map((d, idx) => {
    const formatted = d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    let text = `${formatted} · Group Ride #${idx + 1}`;
    const soldOut = idx === 0;
    if (soldOut) text += " (sold out)";
    return { text, soldOut };
  });
}

const DEMO_DAYS = generateDemoDays();

export function CTASection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [demoDay, setDemoDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://formspree.io/f/xykdaqvy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, demoDay: demoDay || undefined }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
            Just your info — and your commitment to riding different.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="px-5 py-4 bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="px-5 py-4 bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <select
                value={demoDay}
                onChange={(e) => setDemoDay(e.target.value)}
                className="px-5 py-4 bg-secondary border border-border text-foreground font-body focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="">Join a Demo Day group ride (optional)</option>
                {DEMO_DAYS.map(({ text, soldOut }) => (
                  <option key={text} value={text} disabled={soldOut}>
                    {text}
                  </option>
                ))}
              </select>

              {error && (
                <p className="text-red-500 font-body text-sm text-left">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-primary text-primary-foreground font-display text-xl tracking-widest hover:box-glow-strong transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "RESERVING..." : "RESERVE"}
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
                Check your inbox — confirmation is on the way. Welcome to the mutation.
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
