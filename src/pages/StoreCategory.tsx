import { Link } from "react-router-dom";
import { ACCESSORIES, MERCH_PRODUCTS, PARTS } from "@/data/products";
import { MUTANT_TRIMS } from "@/data/trims";
import { Product } from "@/types/product";

function formatPrice(n: number) {
  return n === 0 ? "FREE" : `$${n.toLocaleString()}`;
}

type CategoryConfig = {
  title: string
  subtitle: string
  description: string
  products: Product[]
}

const CONFIG: Record<string, CategoryConfig> = {
  accessories: {
    title: "ACCESSORIES",
    subtitle: "BUILD IT OUT",
    description: "Bolt-on upgrades and add-ons for all Mutant trims.",
    products: ACCESSORIES,
  },
  parts: {
    title: "PARTS",
    subtitle: "KEEP IT RUNNING",
    description: "OEM and upgrade parts for every Mutant trim.",
    products: PARTS,
  },
  merch: {
    title: "MERCH",
    subtitle: "REPRESENT",
    description: "Mutant branded apparel, hats, and accessories.",
    products: MERCH_PRODUCTS,
  },
}

export default function StoreCategory({ category }: { category: string }) {
  const config = CONFIG[category]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link to="/">
          <span className="font-ghastly text-3xl text-primary" style={{ textShadow: "0 0 20px hsl(82,85%,50%/0.6)" }}>
            MUTANT
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/store" className="font-display text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            ← STORE
          </Link>
          <Link to="/mutant" className="font-display text-xs tracking-widest px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            BUILD YOUR MUTANT
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-5 sm:px-8 max-w-6xl mx-auto">
        <p className="font-display text-xs tracking-[0.4em] text-primary mb-3">{config?.subtitle}</p>
        <h1 className="font-ghastly text-7xl sm:text-8xl leading-none mb-4">{config?.title}</h1>
        <p className="font-body text-muted-foreground max-w-lg mb-12">{config?.description}</p>

        {category === "mutant" ? (
          <div className="grid sm:grid-cols-3 gap-6">
            {MUTANT_TRIMS.map((t) => (
              <Link key={t.id} to="/mutant" className="block bg-card border border-border p-8 hover:border-primary/30 transition-all group">
                {t.badge && (
                  <span className="font-display text-[9px] tracking-widest px-2 py-0.5 mb-4 inline-block" style={{ background: t.accentColor, color: t.id === "meta" ? "#000" : "#fff" }}>
                    {t.badge}
                  </span>
                )}
                <p className="font-ghastly text-5xl leading-none mb-2 group-hover:text-primary transition-colors" style={{ color: t.accentColor }}>
                  {t.id.charAt(0).toUpperCase() + t.id.slice(1)}
                </p>
                <p className="font-body text-muted-foreground mb-6">{t.tagline}</p>
                <p className="font-display text-3xl text-foreground mb-1">{formatPrice(t.price)}</p>
                <p className="font-display text-xs text-muted-foreground tracking-widest mb-6">{formatPrice(t.depositAmount)} TO RESERVE</p>
                <span className="font-display text-xs tracking-widest text-primary">VIEW + RESERVE →</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config?.products.map((item) => (
              <div key={item.id} className="bg-card border border-border p-6 hover:border-primary/30 transition-all flex flex-col">
                {item.badge && (
                  <span className="self-start font-display text-[9px] tracking-widest text-primary border border-primary/30 px-2 py-0.5 mb-4">
                    {item.badge}
                  </span>
                )}
                {item.subcategory && (
                  <p className="font-display text-[10px] tracking-widest text-muted-foreground mb-1">{item.subcategory.toUpperCase()}</p>
                )}
                <p className="font-body font-semibold text-foreground mb-2">{item.name}</p>
                <p className="font-body text-sm text-muted-foreground flex-1 mb-4">{item.description}</p>
                {item.specs && (
                  <div className="grid grid-cols-2 gap-2 mb-4 py-3 border-y border-border/40">
                    {Object.entries(item.specs).slice(0, 4).map(([k, v]) => (
                      <div key={k}>
                        <p className="font-display text-[9px] tracking-widest text-muted-foreground">{k}</p>
                        <p className="font-body text-xs text-foreground">{v}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-foreground">{formatPrice(item.price)}</span>
                  <button className="font-display text-[10px] tracking-widest px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
