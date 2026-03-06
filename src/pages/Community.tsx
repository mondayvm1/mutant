import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-mutant.jpg";
import actionImg from "@/assets/mutant-action.jpg";
import detailImg from "@/assets/mutant-detail.jpg";
import sideImg from "@/assets/mutant-side.jpg";
import communityImg from "@/assets/join-community.jpg";
import { PreOrderDialog } from "@/components/PreOrderDialog";

const GALLERY = [
  { src: heroImg, label: "BUILT FOR THE TERRAIN", span: "col-span-2 row-span-2" },
  { src: actionImg, label: "FULL SEND", span: "col-span-1 row-span-1" },
  { src: sideImg, label: "EVERY ANGLE", span: "col-span-1 row-span-1" },
  { src: detailImg, label: "THE DETAILS", span: "col-span-2 row-span-1" },
];

const RATINGS = [
  { icon: "🏁", label: "ALL AGES" },
  { icon: "🏔️", label: "ALL TERRAIN" },
  { icon: "⚡", label: "ALL BUILDS" },
  { icon: "🌎", label: "EVERYWHERE" },
];

const STATS = [
  { value: "100", label: "PRE-ORDERS — YEAR ONE" },
  { value: "$0", label: "DOWN TO RESERVE" },
  { value: "4", label: "CUSTOM COLORWAYS" },
  { value: "∞", label: "THE COMMUNITY" },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <span
            className="font-ghastly text-3xl text-primary"
            style={{ textShadow: "0 0 20px hsl(82,85%,50%/0.6)" }}
          >
            MUTANT
          </span>
        </Link>
        <Link to="/" className="font-display text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors">
          ← BACK
        </Link>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-xs tracking-[0.4em] text-primary mb-4">JOIN THE MOVEMENT</p>
          <h1 className="font-ghastly text-8xl leading-none mb-6">
            NOT JUST
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(82,85%,50%), hsl(82,85%,72%))" }}
            >
              A VEHICLE.
            </span>
          </h1>
          <p className="font-body text-muted-foreground max-w-2xl leading-relaxed mb-2">
            The Mutant is built for everyone who rides different. Young guns, seasoned shredders,
            weekend warriors, and full-time adventurers — if you feel the pull of the dirt, you belong here.
          </p>
        </motion.div>

        {/* Rated badge strip */}
        <motion.div
          className="flex flex-wrap gap-3 mt-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {RATINGS.map((r, i) => (
            <motion.div
              key={r.label}
              className="flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-sm bg-primary/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
            >
              <span className="text-base">{r.icon}</span>
              <span className="font-display text-[10px] tracking-[0.3em] text-primary">{r.label}</span>
            </motion.div>
          ))}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm bg-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.58, duration: 0.5 }}
          >
            <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">RATED</span>
            <span className="font-ghastly text-xl text-primary leading-none" style={{ textShadow: "0 0 12px hsl(82,85%,50%/0.5)" }}>M</span>
            <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">FOR MUTANT</span>
          </motion.div>
        </motion.div>

        <div className="h-px mb-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Gallery */}
        <div className="mb-16">
          <p className="font-display text-xs tracking-[0.35em] text-muted-foreground mb-6">THE MUTANT IN THE WILD</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[220px] sm:auto-rows-[260px] gap-3">
            {GALLERY.map((item, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden rounded-sm group cursor-pointer ${item.span}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-display text-xs tracking-[0.3em] text-primary">{item.label}</p>
                </div>
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community split section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Image */}
          <motion.div
            className="relative overflow-hidden rounded-sm"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={communityImg}
              alt="Join the Mutant community"
              className="w-full h-[420px] sm:h-[520px] object-cover object-center"
            />
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/60" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-xs tracking-[0.4em] text-primary mb-4">THE WHOLE CREW</p>
            <h2 className="font-ghastly text-6xl sm:text-7xl leading-none mb-6">
              RIDE
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(82,85%,50%), hsl(82,85%,72%))" }}
              >
                DIFFERENT.
              </span>
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-4">
              Zero rollover record. Low-slung stance. Intuitive controls. This is the ride
              that brings the whole crew together — no experience required, no limits implied.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              From first-timers to full-time off-road heads — the Mutant is built to grow
              with you. Every age, every skill level, every terrain.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 py-6 border-y border-border">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl text-primary">{s.value}</p>
                  <p className="font-display text-[9px] tracking-widest text-muted-foreground mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            <PreOrderDialog>
              <button className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground font-display text-sm tracking-widest hover:bg-primary/90 hover:shadow-[0_0_40px_hsl(82,85%,50%/0.4)] transition-all">
                PRE-ORDER + JOIN THE MOVEMENT →
              </button>
            </PreOrderDialog>
          </motion.div>
        </div>

        {/* Social / tag us */}
        <div className="bg-[hsl(82,85%,50%,0.06)] border border-[hsl(82,85%,50%,0.2)] rounded-sm p-8 text-center">
          <p className="font-display text-xs tracking-[0.4em] text-primary mb-3">TAG US</p>
          <p className="font-ghastly text-5xl text-foreground mb-3">#RIDEDIFFERENT</p>
          <p className="font-body text-muted-foreground text-sm">
            Tag <span className="text-primary">@mutant</span> and use <span className="text-primary">#RideDifferent</span> — best shots get featured and entered for a monthly snapback giveaway.
          </p>
        </div>
      </div>
    </div>
  );
}
