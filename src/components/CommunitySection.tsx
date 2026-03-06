import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import communityImg from "@/assets/join-community.jpg";
import { PreOrderDialog } from "./PreOrderDialog";

const RATINGS = [
  { icon: "🏁", label: "ALL AGES" },
  { icon: "🏔️", label: "ALL TERRAIN" },
  { icon: "⚡", label: "ALL BUILDS" },
  { icon: "🌎", label: "EVERYWHERE" },
];

const STATS = [
  { value: "100", label: "PRE-ORDERS — YEAR ONE" },
  { value: "0$", label: "DOWN TO RESERVE" },
  { value: "4", label: "CUSTOM COLORWAYS" },
  { value: "∞", label: "THE COMMUNITY" },
];

export function CommunitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="community" className="py-24 overflow-hidden">
      <div className="px-4 sm:px-6 max-w-6xl mx-auto" ref={ref}>

        {/* "Rated" badge strip */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {RATINGS.map((r, i) => (
            <motion.div
              key={r.label}
              className="flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-sm bg-primary/5"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
            >
              <span className="text-base">{r.icon}</span>
              <span className="font-display text-[10px] tracking-[0.3em] text-primary">{r.label}</span>
            </motion.div>
          ))}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm bg-card"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.42, duration: 0.5 }}
          >
            <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">RATED</span>
            <span className="font-ghastly text-xl text-primary leading-none" style={{ textShadow: "0 0 12px hsl(82,85%,50%/0.5)" }}>M</span>
            <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">FOR MUTANT</span>
          </motion.div>
        </motion.div>

        {/* Main layout: image left, content right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            className="relative overflow-hidden rounded-sm"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={communityImg}
              alt="Join the Mutant community"
              className="w-full h-[420px] sm:h-[520px] object-cover object-center"
            />
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/60" />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="font-display text-xs tracking-[0.4em] text-primary mb-4">JOIN THE MOVEMENT</p>
            <h2 className="font-ghastly text-6xl sm:text-7xl leading-none mb-6">
              NOT JUST
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(82,85%,50%), hsl(82,85%,72%))" }}
              >
                A VEHICLE.
              </span>
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-4">
              The Mutant is built for everyone who rides different. Young guns, seasoned shredders,
              weekend warriors, and full-time adventurers — if you feel the pull of the dirt,
              you belong here.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Zero rollover record. Low-slung stance. Intuitive controls. This is the ride that
              brings the whole crew together — no experience required, no limits implied.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 py-6 border-y border-border">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl text-primary">{s.value}</p>
                  <p className="font-display text-[9px] tracking-widest text-muted-foreground mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <PreOrderDialog>
                <button className="px-8 py-4 bg-primary text-primary-foreground font-display text-sm tracking-widest hover:bg-primary/90 hover:shadow-[0_0_40px_hsl(82,85%,50%/0.4)] transition-all text-center">
                  JOIN THE COMMUNITY →
                </button>
              </PreOrderDialog>
              <a
                href="#gallery"
                className="px-8 py-4 border border-border text-muted-foreground font-display text-sm tracking-widest hover:border-primary/40 hover:text-foreground transition-colors text-center"
              >
                SEE THE RIDE ↑
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
