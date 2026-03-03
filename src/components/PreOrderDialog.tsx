import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "./ui/dialog";
import { X } from "lucide-react";

interface PreOrderDialogProps {
  children: React.ReactNode;
}

const MERCH_ITEMS = [
  { icon: "🧢", label: "SNAPBACK", desc: "3D puff embroidery. Structured fit.", tag: "LIMITED", free: false },
  { icon: "🧥", label: "HOODIE", desc: "500gsm fleece. Oversized cut.", tag: "DROP SOON", free: false },
  { icon: "🕶️", label: "MOTO SHADES", desc: "Wrap-around UV400. Ride ready.", tag: "COMING", free: false },
  { icon: "📦", label: "STICKER PACK", desc: "Die-cut vinyl. 5 designs.", tag: "FREE W/ ORDER", free: true },
  { icon: "🏷️", label: "LANYARD", desc: "MUTANT – RIDE DIFFERENT", tag: "FREE", free: true },
  { icon: "🎽", label: "RACE JERSEY", desc: "Moisture-wicking. Sublimated.", tag: "PRE-ORDER", free: false },
];

export function PreOrderDialog({ children }: PreOrderDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[hsl(0,0%,4%)] border border-[hsl(82,85%,50%,0.25)] max-w-2xl p-0 overflow-hidden gap-0 shadow-[0_0_80px_hsl(82,85%,50%/0.12)] [&>button.absolute]:hidden">

        {/* ── Header ── */}
        <div className="relative bg-gradient-to-br from-[hsl(0,0%,7%)] to-[hsl(0,0%,4%)] px-8 pt-8 pb-7 border-b border-[hsl(82,85%,50%,0.12)]">
          <DialogClose className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors z-10">
            <X size={16} />
          </DialogClose>

          {/* Logo row */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/mutant-logo.png"
              alt="MUTANT"
              className="h-10 w-auto object-contain"
              style={{ filter: "invert(1) drop-shadow(0 0 8px hsl(82,85%,50%/0.55))" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <span className="font-display text-2xl tracking-[0.2em] text-foreground">
              MUTANT<span className="text-primary">.</span>
            </span>
          </div>

          <h2 className="font-display text-5xl leading-[0.95] text-foreground">
            A NEW SPECIES.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(82,85%,50%), hsl(82,85%,72%))" }}
            >
              YOUR RULES.
            </span>
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
            Exclusive pre‑order access — configure, represent, and collaborate. Zero down. 100 units. 2026 delivery.
          </p>
        </div>

        {/* ── Scrollable body ── */}
        <div className="px-8 py-6 space-y-6 max-h-[62vh] overflow-y-auto scrollbar-hide">

          {/* CREATE YOUR RIDE — Primary CTA */}
          <a
            href="/build"
            className="group flex items-center justify-between w-full px-7 py-5 bg-primary text-primary-foreground rounded-sm transition-all hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(82,85%,50%/0.45)]"
          >
            <div>
              <p className="font-display text-2xl tracking-widest leading-none">CREATE YOUR RIDE</p>
              <p className="font-body text-xs mt-1 opacity-70">Powertrain · Suspension · Bodywork · Accessories</p>
            </div>
            <span className="font-display text-3xl group-hover:translate-x-1.5 transition-transform">→</span>
          </a>

          {/* ── Merch & Giveaways ── */}
          <div>
            <SectionDivider label="MERCH & GIVEAWAYS" />

            <div className="grid grid-cols-3 gap-2 mb-3">
              {MERCH_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href="/merch"
                  className="group relative bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,14%)] hover:border-[hsl(82,85%,50%,0.45)] rounded-sm p-3 flex flex-col gap-1.5 transition-all hover:bg-[hsl(0,0%,9%)]"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-display text-xs tracking-widest text-foreground leading-tight">{item.label}</span>
                  <span className="font-body text-[10px] text-muted-foreground leading-tight">{item.desc}</span>
                  <span
                    className={`mt-auto font-display text-[9px] tracking-widest ${
                      item.free ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.tag}
                  </span>
                </a>
              ))}
            </div>

            {/* Giveaway callout */}
            <div className="flex items-center gap-3 bg-[hsl(82,85%,50%,0.07)] border border-[hsl(82,85%,50%,0.22)] rounded-sm px-4 py-3">
              <span className="text-xl shrink-0">🎁</span>
              <div>
                <p className="font-display text-sm tracking-widest text-primary leading-none">FREE STICKER PACK + LANYARD</p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Red Bull–style swag ships with every pre‑order. First 100 get the lanyard — <em>MUTANT – RIDE DIFFERENT.</em>
                </p>
              </div>
            </div>
          </div>

          {/* ── Sponsorship ── */}
          <div>
            <SectionDivider label="SPONSORSHIP" />
            <a
              href="/sponsorship"
              className="group flex items-center justify-between w-full px-5 py-4 bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,14%)] hover:border-[hsl(82,85%,50%,0.4)] rounded-sm transition-all"
            >
              <div>
                <p className="font-display text-lg tracking-widest text-foreground leading-none">PARTNER WITH MUTANT</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Athletes · Events · Brands · Media · Red Bull vibes</p>
              </div>
              <span className="text-primary font-display text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* ── Dropship Gear ── */}
          <div>
            <SectionDivider label="DROPSHIP GEAR" />
            <a
              href="/dropship"
              className="group flex items-center justify-between w-full px-5 py-4 bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,14%)] hover:border-[hsl(82,85%,50%,0.4)] rounded-sm transition-all"
            >
              <div>
                <p className="font-display text-lg tracking-widest text-foreground leading-none">SOURCE & MARK UP ON THE FLY</p>
                <p className="font-body text-xs text-muted-foreground mt-1">eBay · Amazon · Set your own price in real‑time</p>
              </div>
              <span className="text-primary font-display text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* ── Support ── */}
          <a
            href="mailto:support@mutant.com"
            className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-[hsl(0,0%,14%)] hover:border-[hsl(82,85%,50%,0.3)] text-muted-foreground hover:text-foreground font-display text-sm tracking-widest rounded-sm transition-all"
          >
            CONTACT SUPPORT
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(82,85%,50%,0.35)] to-transparent" />
      <span className="font-display text-[10px] tracking-[0.35em] text-muted-foreground shrink-0">{label}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(82,85%,50%,0.35)] to-transparent" />
    </div>
  );
}
