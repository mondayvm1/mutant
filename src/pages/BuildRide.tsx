import { useState } from "react";
import { Link } from "react-router-dom";

const POWERTRAIN = [
  {
    id: "sport",
    label: "ELECTRIC SPORT",
    speed: "35+ MPH",
    range: "60 mi",
    time: "—",
    price: 0,
    tag: "BASE",
    desc: "Silent. Smooth. The everyday rip.",
  },
  {
    id: "performance",
    label: "ELECTRIC PERFORMANCE",
    speed: "TBD",
    range: "80 mi",
    time: "TBD",
    price: 2000,
    tag: "POPULAR",
    desc: "Zero to savage. Performance tuned to your spec.",
  },
  {
    id: "beast",
    label: "HYBRID BEAST",
    speed: "YOUR CALL",
    range: "150 mi",
    time: "TBD",
    price: 5000,
    tag: "TOP SPEC",
    desc: "The full mutation. Top end is yours to define.",
  },
];

const SUSPENSION = [
  { id: "street", label: "STREET", price: 0, desc: "Tuned for pavement grip and daily ripping." },
  { id: "offroad", label: "OFF-ROAD", price: 800, desc: "Long-travel coilovers. Any terrain." },
  { id: "track", label: "TRACK", price: 1200, desc: "Stiff. Precise. Built to carve corners." },
];

const COLORS = [
  { id: "stealth", label: "STEALTH BLACK", hex: "#0d0d0d", border: "#333", price: 0 },
  { id: "desert", label: "DESERT TAN", hex: "#c4a882", border: "#c4a882", price: 200 },
  { id: "mutant", label: "MUTANT GREEN", hex: "#8BC934", border: "#8BC934", price: 200 },
  { id: "bloodmoon", label: "BLOOD MOON", hex: "#8B1a1a", border: "#8B1a1a", price: 300 },
];

const ACCESSORIES = [
  { id: "roll-cage", label: "ROLL CAGE", price: 600, desc: "Full chromoly protection." },
  { id: "light-bar", label: "LED LIGHT BAR 40\"", price: 350, desc: "Dual-row. Night mode unlocked." },
  { id: "winch", label: "WINCH 5,000LB", price: 400, desc: "Self-rescue. Always ready." },
  { id: "tow-hitch", label: "TOW HITCH", price: 150, desc: '2" receiver. 1,500lb rated.' },
];

const BASE_PRICE = 8999;

export default function BuildRide() {
  const [powertrain, setPowertrain] = useState("sport");
  const [suspension, setSuspension] = useState("street");
  const [color, setColor] = useState("stealth");
  const [accessories, setAccessories] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const selectedPowertrain = POWERTRAIN.find((p) => p.id === powertrain)!;
  const selectedSuspension = SUSPENSION.find((s) => s.id === suspension)!;
  const selectedColor = COLORS.find((c) => c.id === color)!;
  const accessoryTotal = ACCESSORIES.filter((a) => accessories.includes(a.id)).reduce(
    (sum, a) => sum + a.price,
    0
  );
  const total = BASE_PRICE + selectedPowertrain.price + selectedSuspension.price + selectedColor.price + accessoryTotal;

  const toggleAccessory = (id: string) => {
    setAccessories((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
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
        <Link
          to="/"
          className="font-display text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          ← BACK
        </Link>
      </nav>

      <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-display text-xs tracking-[0.4em] text-primary mb-3">CONFIGURATOR</p>
          <h1 className="font-ghastly text-8xl leading-none text-foreground mb-4">
            CREATE YOUR
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(82,85%,50%), hsl(82,85%,72%))" }}
            >
              RIDE.
            </span>
          </h1>
          <p className="font-body text-muted-foreground max-w-xl">
            Every Mutant is built to your spec. Lock in your configuration with zero down — final pricing confirmed at delivery.
          </p>
          <div className="h-px mt-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Left — options */}
          <div className="space-y-10">

            {/* POWERTRAIN */}
            <Section label="01 — POWERTRAIN">
              <div className="grid sm:grid-cols-3 gap-3">
                {POWERTRAIN.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPowertrain(p.id)}
                    className={`relative text-left p-5 rounded-sm border transition-all ${
                      powertrain === p.id
                        ? "border-primary bg-primary/10 shadow-[0_0_30px_hsl(82,85%,50%/0.2)]"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    {p.tag && (
                      <span
                        className={`absolute top-3 right-3 font-display text-[9px] tracking-widest px-1.5 py-0.5 rounded-sm ${
                          p.tag === "POPULAR" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {p.tag}
                      </span>
                    )}
                    <p className="font-display text-sm tracking-widest text-foreground mb-2">{p.label}</p>
                    <p className="font-body text-xs text-muted-foreground mb-3">{p.desc}</p>
                    <div className="space-y-1">
                      <Stat label="TOP SPEED" value={p.speed} />
                      <Stat label="RANGE" value={p.range} />
                      {p.time !== "—" && <Stat label="0–60" value={p.time} />}
                    </div>
                    <p className="font-display text-sm text-primary mt-3">
                      {p.price === 0 ? "INCLUDED" : `+$${p.price.toLocaleString()}`}
                    </p>
                  </button>
                ))}
              </div>
            </Section>

            {/* SUSPENSION */}
            <Section label="02 — SUSPENSION">
              <div className="grid sm:grid-cols-3 gap-3">
                {SUSPENSION.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSuspension(s.id)}
                    className={`text-left p-4 rounded-sm border transition-all ${
                      suspension === s.id
                        ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(82,85%,50%/0.15)]"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <p className="font-display text-sm tracking-widest text-foreground mb-1">{s.label}</p>
                    <p className="font-body text-xs text-muted-foreground mb-2">{s.desc}</p>
                    <p className="font-display text-sm text-primary">
                      {s.price === 0 ? "INCLUDED" : `+$${s.price.toLocaleString()}`}
                    </p>
                  </button>
                ))}
              </div>
            </Section>

            {/* COLOR */}
            <Section label="03 — COLORWAY">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setColor(c.id)}
                    className={`p-4 rounded-sm border transition-all ${
                      color === c.id
                        ? "border-primary shadow-[0_0_20px_hsl(82,85%,50%/0.2)]"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <div
                      className="w-full h-10 rounded-sm mb-3 border border-white/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <p className="font-display text-xs tracking-widest text-foreground">{c.label}</p>
                    <p className="font-display text-xs text-primary mt-1">
                      {c.price === 0 ? "INCLUDED" : `+$${c.price}`}
                    </p>
                  </button>
                ))}
              </div>
            </Section>

            {/* ACCESSORIES */}
            <Section label="04 — ACCESSORIES">
              <div className="grid sm:grid-cols-2 gap-3">
                {ACCESSORIES.map((a) => {
                  const selected = accessories.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAccessory(a.id)}
                      className={`flex items-start gap-4 text-left p-4 rounded-sm border transition-all ${
                        selected
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(82,85%,50%/0.15)]"
                          : "border-border bg-card hover:border-muted-foreground"
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-sm border-2 shrink-0 flex items-center justify-center transition-colors ${
                          selected ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}
                      >
                        {selected && <span className="text-primary-foreground text-[10px] font-bold">✓</span>}
                      </div>
                      <div>
                        <p className="font-display text-sm tracking-widest text-foreground">{a.label}</p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                        <p className="font-display text-xs text-primary mt-1">+${a.price.toLocaleString()}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Section>
          </div>

          {/* Right — sticky summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-card border border-border rounded-sm p-6 space-y-5">
              <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">YOUR BUILD</p>

              <div className="space-y-3 text-sm font-body">
                <SummaryLine label="Base price" value={`$${BASE_PRICE.toLocaleString()}`} />
                <SummaryLine label={selectedPowertrain.label} value={selectedPowertrain.price === 0 ? "INC" : `+$${selectedPowertrain.price.toLocaleString()}`} />
                <SummaryLine label={`Suspension — ${selectedSuspension.label}`} value={selectedSuspension.price === 0 ? "INC" : `+$${selectedSuspension.price.toLocaleString()}`} />
                <SummaryLine label={`Color — ${selectedColor.label}`} value={selectedColor.price === 0 ? "INC" : `+$${selectedColor.price}`} />
                {ACCESSORIES.filter((a) => accessories.includes(a.id)).map((a) => (
                  <SummaryLine key={a.id} label={a.label} value={`+$${a.price.toLocaleString()}`} />
                ))}
              </div>

              <div className="h-px bg-border" />

              <div className="flex justify-between items-center">
                <span className="font-display text-sm tracking-widest text-muted-foreground">ESTIMATED TOTAL</span>
                <span className="font-display text-2xl text-primary">${total.toLocaleString()}</span>
              </div>

              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                $0 down to lock in your build. Final price confirmed before delivery. 100 unit limit.
              </p>

              {submitted ? (
                <div className="text-center py-4">
                  <p className="font-display text-xl tracking-widest text-primary">BUILD LOCKED IN.</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">We'll reach out to confirm your spec.</p>
                </div>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full py-4 bg-primary text-primary-foreground font-display text-sm tracking-widest rounded-sm hover:bg-primary/90 hover:shadow-[0_0_40px_hsl(82,85%,50%/0.4)] transition-all"
                >
                  LOCK IN MY BUILD
                </button>
              )}

              <Link
                to="/#preorder"
                className="block text-center font-display text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                JUST PRE-ORDER INSTEAD →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-xs tracking-[0.35em] text-muted-foreground mb-4">{label}</p>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-body text-[10px] tracking-widest text-muted-foreground">{label}</span>
      <span className="font-display text-xs text-foreground">{value}</span>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-muted-foreground text-xs leading-relaxed">{label}</span>
      <span className="text-foreground text-xs shrink-0">{value}</span>
    </div>
  );
}
