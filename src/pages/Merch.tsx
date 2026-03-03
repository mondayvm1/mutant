import { useState } from "react";
import { Link } from "react-router-dom";

const PRODUCTS = [
  {
    id: "snapback",
    icon: "🧢",
    label: "MUTANT SNAPBACK",
    tagline: "STRUCTURED. BOLD. UNDENIABLE.",
    price: 34,
    tag: "LIMITED RUN",
    tagColor: "text-primary",
    desc: "6-panel structured fit. 3D puff embroidery. Flat brim. One size — adjustable snapback.",
    details: ["100% cotton twill", "3D puff MUTANT logo", "Flat brim / flat snap", "Sizes: One size fits all"],
    available: true,
  },
  {
    id: "hoodie",
    icon: "🧥",
    label: "MUTANT HOODIE",
    tagline: "HEAVYWEIGHT. OVERSIZED. BUILT DIFFERENT.",
    price: 89,
    tag: "DROP SOON",
    tagColor: "text-muted-foreground",
    desc: "500gsm heavyweight fleece. Oversized silhouette. Kangaroo pocket. MUTANT back print.",
    details: ["500gsm fleece blend", "Unisex oversized fit", "Ribbed cuffs & waistband", "Large back graphic"],
    available: false,
  },
  {
    id: "shades",
    icon: "🕶️",
    label: "MOTO SHADES",
    tagline: "RIDE DIFFERENT. SEE DIFFERENT.",
    price: 55,
    tag: "COMING SOON",
    tagColor: "text-muted-foreground",
    desc: "Wrap-around frame. UV400 polycarbonate lens. Lightweight TR90 frame. Moto-ready.",
    details: ["UV400 protection", "TR90 flexible frame", "Wrap-around fit", "Anti-scratch coating"],
    available: false,
  },
  {
    id: "sticker-pack",
    icon: "📦",
    label: "STICKER PACK — 5PK",
    tagline: "TAG YOUR TERRITORY.",
    price: 0,
    tag: "FREE WITH ORDER",
    tagColor: "text-primary",
    desc: "5 die-cut vinyl designs. Weatherproof & UV resistant. Slap 'em everywhere.",
    details: ["5 unique designs", "Die-cut vinyl", "UV & weather resistant", "2–4 inch sizes"],
    available: true,
  },
  {
    id: "lanyard",
    icon: "🏷️",
    label: "MUTANT LANYARD",
    tagline: "MUTANT — RIDE DIFFERENT.",
    price: 0,
    tag: "FREE — FIRST 100",
    tagColor: "text-primary",
    desc: "Woven polyester. MUTANT – RIDE DIFFERENT. Metal keycard clip. Safety breakaway.",
    details: ["Woven polyester", "Metal keycard clip", "Safety breakaway clasp", '"MUTANT – RIDE DIFFERENT"'],
    available: true,
  },
  {
    id: "jersey",
    icon: "🎽",
    label: "RACE JERSEY",
    tagline: "BUILT FOR THE PUSH.",
    price: 65,
    tag: "PRE-ORDER",
    tagColor: "text-yellow-500",
    desc: "Moisture-wicking polyester. Sublimated full print. Race cut. Mutant colorway.",
    details: ["100% polyester", "Full sublimation print", "Race cut / slim fit", "Sizes: S–XXL"],
    available: false,
  },
];

const GIVEAWAYS = [
  {
    icon: "📦",
    trigger: "EVERY PRE-ORDER",
    reward: "Sticker pack (5 die-cut designs)",
    sub: "Ships with your vehicle — no minimum spend.",
  },
  {
    icon: "🏷️",
    trigger: "FIRST 100 PRE-ORDERS",
    reward: "MUTANT Lanyard — free",
    sub: '"MUTANT – RIDE DIFFERENT" woven lanyard. Gone fast.',
  },
  {
    icon: "🧢",
    trigger: "FOLLOW & TAG US",
    reward: "Monthly snapback giveaway",
    sub: "Tag @mutant and use #RideDifferent for a chance every month.",
  },
  {
    icon: "🧥",
    trigger: "DEMO DAY ATTENDEES",
    reward: "Hoodie — on us at the event",
    sub: "Show up, ride it, rep it. Limited quantities per event.",
  },
];

export default function Merch() {
  const [added, setAdded] = useState<string[]>([]);

  const handleAdd = (id: string, available: boolean, price: number) => {
    if (!available || price === 0) return;
    setAdded((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

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

      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <p className="font-display text-xs tracking-[0.4em] text-primary mb-4">MERCH & GIVEAWAYS</p>
        <h1 className="font-ghastly text-8xl leading-none mb-6">
          REPRESENT
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, hsl(82,85%,50%), hsl(82,85%,72%))" }}
          >
            THE MUTATION.
          </span>
        </h1>
        <p className="font-body text-muted-foreground max-w-xl leading-relaxed mb-3">
          Limited drops. Free giveaways. Red Bull energy — Mutant DNA. Wear it, stick it, live it.
        </p>
        <p className="font-body text-xs text-muted-foreground">
          Every pre-order ships with a free sticker pack. First 100 get the lanyard too.
        </p>

        <div className="h-px mt-12 mb-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Giveaways banner */}
        <div className="mb-12">
          <p className="font-display text-xs tracking-[0.35em] text-muted-foreground mb-4">FREE GIVEAWAYS</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {GIVEAWAYS.map((g) => (
              <div
                key={g.trigger}
                className="flex items-start gap-4 bg-[hsl(82,85%,50%,0.06)] border border-[hsl(82,85%,50%,0.2)] rounded-sm px-5 py-4"
              >
                <span className="text-2xl shrink-0">{g.icon}</span>
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] text-primary">{g.trigger}</p>
                  <p className="font-display text-sm tracking-widest text-foreground mt-0.5">{g.reward}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed">{g.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <p className="font-display text-xs tracking-[0.35em] text-muted-foreground mb-6">THE COLLECTION</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((product) => {
            const isAdded = added.includes(product.id);
            const isFree = product.price === 0;
            const isUnavailable = !product.available && !isFree;

            return (
              <div
                key={product.id}
                className={`relative rounded-sm border flex flex-col transition-all ${
                  isUnavailable
                    ? "border-border bg-card opacity-60"
                    : "border-border bg-card hover:border-muted-foreground"
                }`}
              >
                {/* Tag */}
                <div className="absolute top-3 right-3">
                  <span className={`font-display text-[9px] tracking-widest px-2 py-1 bg-background/80 rounded-sm ${product.tagColor}`}>
                    {product.tag}
                  </span>
                </div>

                {/* Icon / image placeholder */}
                <div className="flex items-center justify-center h-40 bg-[hsl(0,0%,7%)] rounded-t-sm border-b border-border text-6xl">
                  {product.icon}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <p className="font-display text-xs tracking-[0.3em] text-muted-foreground mb-1">{product.tagline}</p>
                  <p className="font-display text-lg tracking-widest text-foreground mb-2">{product.label}</p>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">{product.desc}</p>

                  <ul className="space-y-1 mb-5">
                    {product.details.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <span className="text-primary text-[10px]">·</span>
                        <span className="font-body text-xs text-muted-foreground">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="font-display text-xl text-primary">
                      {isFree ? "FREE" : `$${product.price}`}
                    </span>

                    <button
                      onClick={() => handleAdd(product.id, product.available, product.price)}
                      disabled={isUnavailable}
                      className={`px-4 py-2 font-display text-xs tracking-widest rounded-sm transition-all ${
                        isFree
                          ? "bg-primary/20 text-primary border border-primary/30 cursor-default"
                          : isUnavailable
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : isAdded
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {isFree ? "AUTO-INCLUDED" : isUnavailable ? "COMING SOON" : isAdded ? "✓ ADDED" : "ADD TO ORDER"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-display text-xs tracking-[0.35em] text-muted-foreground mb-4">GET YOUR GEAR</p>
          <Link
            to="/#preorder"
            className="inline-block px-10 py-5 bg-primary text-primary-foreground font-display text-lg tracking-widest rounded-sm hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(82,85%,50%/0.5)] transition-all"
          >
            PRE-ORDER + GET FREE SWAG →
          </Link>
          <p className="font-body text-xs text-muted-foreground mt-4">$0 down · 100 units · Swag ships with vehicle</p>
        </div>
      </div>
    </div>
  );
}
