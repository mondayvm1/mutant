import { useState } from "react";
import { Link } from "react-router-dom";

const TIERS = [
  {
    id: "rider",
    icon: "🏎️",
    label: "RIDER SPONSORSHIP",
    price: "APPLY FREE",
    featured: false,
    desc: "Athletes, creators, and off-road influencers who live in the dirt and share every second of it.",
    perks: [
      "Sticker pack & lanyard — on us",
      "25–50% gear discount",
      "Social media features & reposts",
      "Priority event invites",
      "Direct line to the team",
    ],
    cta: "APPLY AS A RIDER",
    href: "mailto:sponsorship@mutant.com?subject=Rider Sponsorship Application",
  },
  {
    id: "event",
    icon: "🏁",
    label: "EVENT SPONSORSHIP",
    price: "CONTACT US",
    featured: true,
    desc: "Race series, off-road rallies, adventure events, and community rides. Bring Mutant to the masses.",
    perks: [
      "Branded activation & booth presence",
      "Demo vehicles on-site",
      "Co-marketing assets & signage",
      "Full social media coverage",
      "Revenue-share opportunities",
    ],
    cta: "PARTNER ON AN EVENT",
    href: "mailto:sponsorship@mutant.com?subject=Event Sponsorship Inquiry",
  },
  {
    id: "brand",
    icon: "🤝",
    label: "BRAND PARTNERSHIP",
    price: "LET'S TALK",
    featured: false,
    desc: "Companies seeking deep co-branding, product integration, or distribution alignment with Mutant.",
    perks: [
      "Full logo & brand integration",
      "Co-branded gear drops",
      "Custom sponsorship packages",
      "Revenue share options",
      "Exclusive deal structures",
    ],
    cta: "START A CONVERSATION",
    href: "mailto:sponsorship@mutant.com?subject=Brand Partnership Inquiry",
  },
];

const STATS = [
  { value: "100", label: "UNITS — YEAR 1" },
  { value: "35+", label: "MPH BASE SPEED" },
  { value: "0", label: "ROLLOVER INCIDENTS" },
  { value: "2026", label: "LAUNCH YEAR" },
];

export default function Sponsorship() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img
            src="/images/mutant-logo.png"
            alt="MUTANT"
            className="h-14 w-auto object-contain transition-all"
            style={{ filter: "invert(1) brightness(0.5) sepia(1) saturate(12) hue-rotate(50deg) brightness(1.3) drop-shadow(0 0 12px hsl(82,85%,50%/0.85))" }}
          />
        </Link>
        <Link to="/" className="font-display text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors">
          ← BACK
        </Link>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <p className="font-display text-xs tracking-[0.4em] text-primary mb-4">PARTNERSHIPS</p>
        <h1 className="font-ghastly text-8xl leading-none mb-6">
          PARTNER WITH
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, hsl(82,85%,50%), hsl(82,85%,72%))" }}
          >
            THE MUTANT.
          </span>
        </h1>
        <p className="font-body text-muted-foreground max-w-2xl text-lg leading-relaxed mb-4">
          We're not looking for logos on a banner. We're building a movement. If your brand thrives on speed,
          adventure, and unapologetic energy — let's build something that actually hits.
        </p>
        <p className="font-body text-muted-foreground max-w-xl text-sm">
          Think Red Bull. Think Monster. Think Raptor — but lower, faster, and built for a new species.
        </p>

        <div className="h-px mt-12 mb-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-5xl text-primary">{s.value}</p>
              <p className="font-display text-xs tracking-widest text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tiers */}
        <p className="font-display text-xs tracking-[0.35em] text-muted-foreground mb-6">SPONSORSHIP TIERS</p>
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-sm border p-6 flex flex-col transition-all cursor-pointer ${
                tier.featured
                  ? "border-primary bg-primary/8 shadow-[0_0_40px_hsl(82,85%,50%/0.15)]"
                  : "border-border bg-card hover:border-muted-foreground"
              } ${selected === tier.id ? "ring-1 ring-primary" : ""}`}
              onClick={() => setSelected(tier.id === selected ? null : tier.id)}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground font-display text-[9px] tracking-widest px-3 py-1 rounded-sm whitespace-nowrap">
                    MOST SOUGHT AFTER
                  </span>
                </div>
              )}

              <div className="text-3xl mb-4">{tier.icon}</div>
              <p className="font-display text-lg tracking-widest text-foreground mb-1">{tier.label}</p>
              <p className={`font-display text-sm mb-4 ${tier.featured ? "text-primary" : "text-muted-foreground"}`}>
                {tier.price}
              </p>
              <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed flex-1">{tier.desc}</p>

              <ul className="space-y-2 mb-6">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-0.5 shrink-0">✓</span>
                    <span className="font-body text-xs text-muted-foreground">{perk}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className={`block text-center py-3 rounded-sm font-display text-xs tracking-widest transition-all ${
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(82,85%,50%/0.4)]"
                    : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* What we bring */}
        <div className="bg-card border border-border rounded-sm p-8 mb-12">
          <p className="font-display text-xs tracking-[0.35em] text-muted-foreground mb-6">WHAT WE BRING TO THE TABLE</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: "📸", title: "CONTENT-READY", body: "Every Mutant is a content machine. Low stance, aggressive look, actual speed. Your brand looks elite next to it." },
              { icon: "🎯", title: "TARGETED REACH", body: "Off-road enthusiasts, motorsport fans, and adrenaline-first communities. High intent, high engagement." },
              { icon: "📦", title: "CO-BRANDED DROPS", body: "We can build custom gear runs with your branding — hats, hoodies, stickers, lanyards. Real product in real hands." },
              { icon: "🚀", title: "GROUND FLOOR ENTRY", body: "100-unit year one. Get in before Mutant goes mainstream. The brands that showed up early get the best positioning." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-display text-sm tracking-widest text-foreground mb-1">{item.title}</p>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-display text-xs tracking-[0.35em] text-muted-foreground mb-4">READY TO MUTATE?</p>
          <a
            href="mailto:sponsorship@mutant.com"
            className="inline-block px-10 py-5 bg-primary text-primary-foreground font-display text-lg tracking-widest rounded-sm hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(82,85%,50%/0.5)] transition-all"
          >
            EMAIL US NOW →
          </a>
          <p className="font-body text-xs text-muted-foreground mt-4">sponsorship@mutant.com · Response within 24 hours</p>
        </div>
      </div>
    </div>
  );
}
