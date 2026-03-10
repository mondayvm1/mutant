import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { MUTANT_TRIMS, COMPARE_ROWS } from "@/data/trims";
import { ACCESSORIES } from "@/data/products";
import { TrimId } from "@/types/product";
import heroImg from "@/assets/gallery/hero-mutant.jpg";
import actionImg from "@/assets/gallery/mutant-action.jpg";
import sideImg from "@/assets/gallery/mutant-side.jpg";
import detailImg from "@/assets/gallery/mutant-detail.jpg";

const COLORWAYS = [
  { id: "stealth", label: "Stealth Black", hex: "#0a0a0a", border: "#333" },
  { id: "desert", label: "Desert Tan", hex: "#b8946a", border: "#b8946a" },
  { id: "mutant", label: "Mutant Green", hex: "hsl(82,85%,40%)", border: "hsl(82,85%,50%)" },
  { id: "blood", label: "Blood Moon", hex: "#8b1a1a", border: "#c0392b" },
];

const FAQS = [
  {
    q: "What is the deposit and is it refundable?",
    a: "Your deposit secures your place in the production queue. Deposits are fully refundable within 30 days of placing your reservation. After 30 days, deposits are transferable but non-refundable.",
  },
  {
    q: "When will my Mutant ship?",
    a: "Year one production is limited to 100 units. Estimated delivery begins Q3 2026 for early reservations. You will receive production updates via email as your build slot approaches.",
  },
  {
    q: "Can I upgrade my trim after reserving?",
    a: "Yes. You can upgrade your reserved trim up to 60 days before your production slot. Contact support to initiate an upgrade.",
  },
  {
    q: "What is included in the warranty?",
    a: "All trims include a full frame and chassis warranty. The Meta includes a 3-year drivetrain warranty. The Pro includes a 5-year full system warranty including electronics and motors.",
  },
  {
    q: "Is financing available?",
    a: "Financing options are in development for launch. Reserve now with a deposit and we will confirm financing availability before your production slot.",
  },
];

function formatPrice(n: number) {
  return n === 0 ? "FREE" : `$${n.toLocaleString()}`;
}

export default function MutantPDP() {
  const [activeTrim, setActiveTrim] = useState<TrimId>("meta");
  const [activeColor, setActiveColor] = useState("stealth");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const compareInView = useInView(compareRef, { once: true, amount: 0.1 });

  const trim = MUTANT_TRIMS.find((t) => t.id === activeTrim)!;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link to="/">
          <span className="font-ghastly text-3xl text-primary" style={{ textShadow: "0 0 20px hsl(82,85%,50%/0.6)" }}>
            MUTANT
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/store" className="font-display text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            STORE
          </Link>
          <Link to="/community" className="font-display text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            COMMUNITY
          </Link>
          <button
            onClick={() => compareRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="font-display text-xs tracking-widest px-4 py-2 border border-border hover:border-primary/40 transition-colors"
          >
            COMPARE MODELS
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div ref={heroRef} className="relative pt-16 min-h-[90vh] flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImg} alt="Mutant" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex-1 flex items-center px-5 sm:px-8 max-w-6xl mx-auto w-full py-16">
          <div className="max-w-xl">
            <motion.p
              className="font-display text-xs tracking-[0.4em] text-primary mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              2026 PRODUCTION · LIMITED TO 100 UNITS
            </motion.p>

            <motion.h1
              className="font-ghastly leading-none mb-3"
              style={{ fontSize: "clamp(3.5rem,9vw,10rem)" }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-foreground" style={{ WebkitTextStroke: "1px currentColor" }}>THE</span>
              <br />
              <span className="text-primary" style={{ textShadow: "0 0 40px hsl(82,85%,50%/0.5)", WebkitTextStroke: "1px hsl(82,85%,50%)" }}>MUTANT</span>
            </motion.h1>

            <motion.p
              className="font-body text-muted-foreground text-lg mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              The 4-wheeler reinvented from the ground up. Lowest center of gravity on the market.
              Three trims. One species.
            </motion.p>

            {/* Trim quick-select */}
            <motion.div
              className="flex gap-2 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {MUTANT_TRIMS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTrim(t.id)}
                  className={`px-4 py-2 font-display text-xs tracking-widest transition-all border ${
                    activeTrim === t.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {t.id.toUpperCase()}
                </button>
              ))}
            </motion.div>

            {/* Price */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTrim}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-display text-4xl text-foreground">{formatPrice(trim.price)}</span>
                  <span className="font-body text-muted-foreground text-sm ml-3">
                    or {formatPrice(trim.depositAmount)} to reserve
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button className="px-8 py-4 bg-primary text-primary-foreground font-display text-sm tracking-widest hover:bg-primary/90 hover:shadow-[0_0_40px_hsl(82,85%,50%/0.4)] transition-all">
                RESERVE {trim.id.toUpperCase()} — {formatPrice(trim.depositAmount)}
              </button>
              <button
                onClick={() => compareRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border border-border text-muted-foreground font-display text-sm tracking-widest hover:border-primary/40 hover:text-foreground transition-colors"
              >
                COMPARE MODELS
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── TRIM DETAIL ── */}
      <section className="py-20 px-5 sm:px-8 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="font-display text-xs tracking-[0.4em] text-primary mb-3">SELECT YOUR TRIM</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {MUTANT_TRIMS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTrim(t.id)}
                className={`relative text-left p-6 border transition-all ${
                  activeTrim === t.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {t.badge && (
                  <span
                    className="absolute top-3 right-3 font-display text-[9px] tracking-widest px-2 py-0.5"
                    style={{ background: t.accentColor, color: t.id === "meta" ? "#000" : "#fff" }}
                  >
                    {t.badge}
                  </span>
                )}
                <p className="font-display text-xs tracking-widest text-muted-foreground mb-1">
                  {t.id.toUpperCase()}
                </p>
                <p className="font-ghastly text-3xl leading-none mb-2" style={{ color: t.id === activeTrim ? t.accentColor : "inherit" }}>
                  {t.name.replace("Mutant ", "")}
                </p>
                <p className="font-body text-sm text-muted-foreground mb-4">{t.tagline}</p>
                <p className="font-display text-2xl text-foreground mb-1">{formatPrice(t.price)}</p>
                <p className="font-display text-xs text-muted-foreground tracking-widest">
                  {formatPrice(t.depositAmount)} DEPOSIT
                </p>

                {activeTrim === t.id && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <ul className="space-y-1.5">
                      {t.includes.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-start gap-2 font-body text-xs text-muted-foreground">
                          <Check size={12} className="mt-0.5 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                      {t.includes.length > 4 && (
                        <li className="font-display text-[10px] tracking-widest text-primary">
                          +{t.includes.length - 4} MORE INCLUDED
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected trim full specs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrim}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-card border border-border"
          >
            {[
              { label: "POWER", val: trim.power },
              { label: "TOP SPEED", val: trim.topSpeed },
              { label: "RANGE", val: trim.range },
              { label: "SUSPENSION", val: trim.suspension },
              { label: "BRAKES", val: trim.brakes },
              { label: "TIRES", val: trim.tires },
              { label: "WEIGHT", val: trim.weight },
            ].map(({ label, val }) => (
              <div key={label} className="py-3 border-b border-border/40 last:border-0">
                <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground mb-1">{label}</p>
                <p className="font-body text-sm text-foreground">{val}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── COMPARE TABLE ── */}
      <section ref={compareRef} className="py-20 px-5 sm:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={compareInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-xs tracking-[0.4em] text-primary mb-3">COMPARE</p>
            <h2 className="font-ghastly text-5xl sm:text-6xl leading-none mb-10 flex gap-6 sm:gap-12">
              <span>BASE</span><span>META</span><span>PRO</span>
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-left py-3 pr-6 font-display text-[10px] tracking-widest text-muted-foreground w-1/4"></th>
                  {MUTANT_TRIMS.map((t) => (
                    <th key={t.id} className="text-left py-3 px-4">
                      <div className="font-ghastly text-xl leading-none mb-0.5" style={{ color: t.accentColor }}>
                        {t.id.charAt(0).toUpperCase() + t.id.slice(1)}
                      </div>
                      {t.badge && (
                        <span className="font-display text-[8px] tracking-widest text-muted-foreground">{t.badge}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(({ label, key }, i) => (
                  <tr key={label} className={i % 2 === 0 ? "bg-background/30" : ""}>
                    <td className="py-3 pr-6 font-display text-[10px] tracking-[0.25em] text-muted-foreground">{label}</td>
                    {MUTANT_TRIMS.map((t) => {
                      const val = t[key];
                      const display = key === "price" ? formatPrice(val as number)
                        : key === "depositAmount" ? formatPrice(val as number)
                        : String(val);
                      return (
                        <td key={t.id} className="py-3 px-4 font-body text-sm text-foreground">{display}</td>
                      );
                    })}
                  </tr>
                ))}
                {/* Includes row */}
                <tr className="border-t border-border">
                  <td className="py-4 pr-6 font-display text-[10px] tracking-[0.25em] text-muted-foreground align-top">INCLUDES</td>
                  {MUTANT_TRIMS.map((t) => (
                    <td key={t.id} className="py-4 px-4 align-top">
                      <ul className="space-y-1.5">
                        {t.includes.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 font-body text-xs text-muted-foreground">
                            <Check size={10} className="mt-0.5 shrink-0" style={{ color: t.accentColor }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                {/* CTA row */}
                <tr className="border-t border-border">
                  <td className="py-4 pr-6"></td>
                  {MUTANT_TRIMS.map((t) => (
                    <td key={t.id} className="py-4 px-4">
                      <button
                        onClick={() => { setActiveTrim(t.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="w-full py-3 font-display text-xs tracking-widest transition-all border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                        style={{ borderColor: t.accentColor, color: t.accentColor }}
                      >
                        SELECT {t.id.toUpperCase()}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── COLOR SELECTOR ── */}
      <section className="py-20 px-5 sm:px-8 max-w-6xl mx-auto">
        <p className="font-display text-xs tracking-[0.4em] text-primary mb-3">COLORWAY</p>
        <h2 className="font-ghastly text-5xl leading-none mb-8">PICK YOUR COLOR.</h2>
        <div className="flex flex-wrap gap-4">
          {COLORWAYS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveColor(c.id)}
              className="flex items-center gap-3 px-4 py-3 border transition-all"
              style={{ borderColor: activeColor === c.id ? c.border : "hsl(0,0%,15%)" }}
            >
              <span
                className="w-5 h-5 rounded-full border border-white/10 shrink-0"
                style={{ background: c.hex }}
              />
              <span className="font-display text-xs tracking-widest text-foreground">{c.label}</span>
              {activeColor === c.id && <Check size={12} className="text-primary" />}
            </button>
          ))}
        </div>
        <p className="font-body text-xs text-muted-foreground mt-4">
          Final colorway availability confirmed at production. All colors available across all trims.
        </p>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-16 px-5 sm:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[heroImg, actionImg, sideImg, detailImg].map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-sm aspect-square group">
              <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/community" className="font-display text-xs tracking-widest text-primary hover:text-primary/80 transition-colors">
            SEE MORE IN THE GALLERY →
          </Link>
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="py-20 px-5 sm:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <p className="font-display text-xs tracking-[0.4em] text-primary mb-3">RECOMMENDED ADD-ONS</p>
          <h2 className="font-ghastly text-5xl leading-none mb-8">BUILD IT OUT.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCESSORIES.map((item) => (
              <div key={item.id} className="bg-background border border-border p-5 flex flex-col">
                {item.badge && (
                  <span className="self-start font-display text-[9px] tracking-widest text-primary border border-primary/30 px-2 py-0.5 mb-3">
                    {item.badge}
                  </span>
                )}
                <p className="font-display text-xs tracking-widest text-muted-foreground mb-1">
                  {item.subcategory?.toUpperCase()}
                </p>
                <p className="font-body font-semibold text-foreground mb-2">{item.name}</p>
                <p className="font-body text-sm text-muted-foreground flex-1 mb-4">{item.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-foreground">{formatPrice(item.price)}</span>
                  <button className="font-display text-[10px] tracking-widest px-3 py-1.5 border border-border hover:border-primary/40 hover:text-primary transition-colors">
                    ADD +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/store/accessories"
              className="font-display text-xs tracking-widest px-8 py-3 border border-border hover:border-primary/40 hover:text-primary transition-colors inline-block"
            >
              VIEW ALL ACCESSORIES →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-5 sm:px-8 max-w-3xl mx-auto">
        <p className="font-display text-xs tracking-[0.4em] text-primary mb-3">FAQ</p>
        <h2 className="font-ghastly text-5xl leading-none mb-10">GOOD QUESTIONS.</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-border">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-body text-sm text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-sm text-muted-foreground px-5 pb-5 leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESERVE CTA ── */}
      <section className="py-24 px-5 sm:px-8 bg-primary/5 border-y border-primary/20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-xs tracking-[0.4em] text-primary mb-4">YEAR ONE · 100 UNITS</p>
          <h2 className="font-ghastly text-6xl sm:text-7xl leading-none mb-4">
            LOCK IN YOUR SPOT.
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            Reserve with a fully refundable deposit. No commitment beyond your deposit window. First come, first built.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {MUTANT_TRIMS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTrim(t.id)}
                className="px-6 py-4 font-display text-xs tracking-widest transition-all border"
                style={{
                  borderColor: activeTrim === t.id ? t.accentColor : "hsl(0,0%,20%)",
                  color: activeTrim === t.id ? t.accentColor : "inherit",
                  background: activeTrim === t.id ? `${t.accentColor}12` : "transparent",
                }}
              >
                {t.name.toUpperCase()}
                <span className="block font-body text-sm mt-0.5 text-muted-foreground">
                  {formatPrice(t.depositAmount)} deposit
                </span>
              </button>
            ))}
          </div>
          <button className="mt-6 px-12 py-5 bg-primary text-primary-foreground font-display text-base tracking-widest hover:bg-primary/90 hover:shadow-[0_0_60px_hsl(82,85%,50%/0.4)] transition-all block w-full sm:w-auto sm:inline-block">
            RESERVE YOUR MUTANT → {formatPrice(trim.depositAmount)}
          </button>
          <p className="font-body text-xs text-muted-foreground mt-4">
            Fully refundable within 30 days · No financing required at reservation · Production updates via email
          </p>
        </div>
      </section>

      {/* ── STICKY BUY BAR ── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border px-5 sm:px-8 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-display text-[10px] tracking-widest text-muted-foreground">SELECTED</p>
                <p className="font-ghastly text-xl leading-none" style={{ color: trim.accentColor }}>
                  {trim.name}
                </p>
              </div>
              <div className="hidden sm:flex gap-2">
                {MUTANT_TRIMS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTrim(t.id)}
                    className={`px-3 py-1.5 font-display text-[10px] tracking-widest border transition-all ${
                      activeTrim === t.id ? "border-primary text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    {t.id.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-display text-xs text-muted-foreground tracking-widest">STARTING AT</p>
                <p className="font-display text-xl text-foreground">{formatPrice(trim.price)}</p>
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground font-display text-xs tracking-widest hover:bg-primary/90 transition-colors whitespace-nowrap">
                RESERVE — {formatPrice(trim.depositAmount)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
