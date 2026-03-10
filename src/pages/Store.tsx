import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ACCESSORIES, MERCH_PRODUCTS } from "@/data/products";
import { MUTANT_TRIMS } from "@/data/trims";
import heroImg from "@/assets/gallery/hero-mutant.jpg";

function formatPrice(n: number) {
  return n === 0 ? "FREE" : `$${n.toLocaleString()}`;
}

const CATEGORIES = [
  { label: "MUTANT VEHICLES", sub: "Base · Meta · Pro", href: "/store/mutant", accent: "hsl(82,85%,50%)" },
  { label: "ACCESSORIES", sub: "Lighting · Storage · Mounts", href: "/store/accessories", accent: "hsl(200,80%,55%)" },
  { label: "PARTS", sub: "Brakes · Suspension · Electrical", href: "/store/parts", accent: "hsl(38,100%,55%)" },
  { label: "MERCH", sub: "Apparel · Hats · Stickers", href: "/store/merch", accent: "hsl(300,70%,60%)" },
];

export default function Store() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link to="/">
          <span className="font-ghastly text-3xl text-primary" style={{ textShadow: "0 0 20px hsl(82,85%,50%/0.6)" }}>
            MUTANT
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/mutant" className="font-display text-xs tracking-widest px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            BUILD YOUR MUTANT
          </Link>
        </div>
      </nav>

      {/* Hero banner */}
      <div className="relative pt-16 h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Mutant Store" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="relative z-10 px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-display text-xs tracking-[0.4em] text-primary mb-2">MUTANT STORE</p>
          <h1 className="font-ghastly text-6xl sm:text-8xl leading-none">GEAR UP.</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                to={cat.href}
                className="block p-6 bg-card border border-border hover:border-primary/30 transition-all group h-full"
              >
                <p className="font-ghastly text-3xl leading-none mb-2 group-hover:text-primary transition-colors" style={{ color: cat.accent }}>
                  {cat.label.split(" ")[0]}
                </p>
                <p className="font-display text-xs tracking-widest text-foreground mb-2">{cat.label}</p>
                <p className="font-body text-sm text-muted-foreground mb-4">{cat.sub}</p>
                <span className="font-display text-[10px] tracking-widest text-primary">SHOP →</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured: Mutant trims */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-display text-xs tracking-[0.4em] text-primary mb-2">FEATURED</p>
              <h2 className="font-ghastly text-5xl leading-none">THE MUTANT</h2>
            </div>
            <Link to="/store/mutant" className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors">
              VIEW ALL →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {MUTANT_TRIMS.map((t) => (
              <Link key={t.id} to="/mutant" className="block bg-card border border-border p-6 hover:border-primary/30 transition-all group">
                {t.badge && (
                  <span className="font-display text-[9px] tracking-widest px-2 py-0.5 mb-3 inline-block" style={{ background: t.accentColor, color: t.id === "meta" ? "#000" : "#fff" }}>
                    {t.badge}
                  </span>
                )}
                <p className="font-ghastly text-4xl leading-none mb-1 group-hover:text-primary transition-colors" style={{ color: t.accentColor }}>
                  {t.id.charAt(0).toUpperCase() + t.id.slice(1)}
                </p>
                <p className="font-body text-sm text-muted-foreground mb-4">{t.tagline}</p>
                <p className="font-display text-2xl text-foreground">{formatPrice(t.price)}</p>
                <p className="font-display text-xs text-muted-foreground tracking-widest mt-0.5">
                  {formatPrice(t.depositAmount)} TO RESERVE
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured accessories */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-display text-xs tracking-[0.4em] text-primary mb-2">ACCESSORIES</p>
              <h2 className="font-ghastly text-5xl leading-none">ADD-ONS</h2>
            </div>
            <Link to="/store/accessories" className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors">
              VIEW ALL →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCESSORIES.map((item) => (
              <div key={item.id} className="bg-card border border-border p-5 hover:border-primary/30 transition-all">
                {item.badge && (
                  <span className="font-display text-[9px] tracking-widest text-primary border border-primary/30 px-2 py-0.5 mb-3 inline-block">
                    {item.badge}
                  </span>
                )}
                <p className="font-body font-semibold text-foreground text-sm mb-1">{item.name}</p>
                <p className="font-body text-xs text-muted-foreground mb-3">{item.shortDescription}</p>
                <p className="font-display text-lg text-foreground">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Merch strip */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-display text-xs tracking-[0.4em] text-primary mb-2">MERCH</p>
              <h2 className="font-ghastly text-5xl leading-none">REPRESENT.</h2>
            </div>
            <Link to="/store/merch" className="font-display text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors">
              VIEW ALL →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MERCH_PRODUCTS.map((item) => (
              <div key={item.id} className="bg-card border border-border p-5 hover:border-primary/30 transition-all">
                {item.badge && (
                  <span className="font-display text-[9px] tracking-widest text-primary border border-primary/30 px-2 py-0.5 mb-3 inline-block">
                    {item.badge}
                  </span>
                )}
                <p className="font-body font-semibold text-foreground text-sm mb-1">{item.name}</p>
                <p className="font-body text-xs text-muted-foreground mb-3">{item.shortDescription}</p>
                <p className="font-display text-lg text-foreground">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
