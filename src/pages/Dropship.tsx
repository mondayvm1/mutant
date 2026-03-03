import { useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  icon: string;
  name: string;
  category: string;
  source: "Amazon" | "eBay";
  costPrice: number;
  rating: number;
  reviews: number;
}

const PRODUCTS: Product[] = [
  { id: 1, icon: "🪖", name: "Full-Face Off-Road Helmet", category: "SAFETY", source: "Amazon", costPrice: 49.99, rating: 4.6, reviews: 1240 },
  { id: 2, icon: "🧤", name: "Motocross Gloves — Pro", category: "SAFETY", source: "eBay", costPrice: 24.99, rating: 4.4, reviews: 876 },
  { id: 3, icon: "🦵", name: "Knee & Shin Guard Set", category: "SAFETY", source: "Amazon", costPrice: 39.99, rating: 4.5, reviews: 632 },
  { id: 4, icon: "🔗", name: "Recovery Tow Strap 20ft", category: "RECOVERY", source: "Amazon", costPrice: 18.99, rating: 4.7, reviews: 2100 },
  { id: 5, icon: "💨", name: "12V Portable Tire Inflator", category: "TOOLS", source: "Amazon", costPrice: 34.99, rating: 4.8, reviews: 5400 },
  { id: 6, icon: "📷", name: "Action Cam Roll Bar Mount", category: "ACCESSORIES", source: "eBay", costPrice: 14.99, rating: 4.3, reviews: 445 },
  { id: 7, icon: "🔦", name: "LED Rock Lights — 8pk", category: "LIGHTING", source: "Amazon", costPrice: 29.99, rating: 4.5, reviews: 890 },
  { id: 8, icon: "🧰", name: "Multipurpose Trail Tool Kit", category: "TOOLS", source: "eBay", costPrice: 44.99, rating: 4.6, reviews: 321 },
  { id: 9, icon: "🛡️", name: "Skid Plate — Universal", category: "PROTECTION", source: "Amazon", costPrice: 59.99, rating: 4.4, reviews: 178 },
  { id: 10, icon: "🎒", name: "Hydration Pack 3L", category: "GEAR", source: "Amazon", costPrice: 32.99, rating: 4.7, reviews: 3200 },
  { id: 11, icon: "🏁", name: "Checkered Flag Antenna Topper", category: "ACCESSORIES", source: "eBay", costPrice: 5.99, rating: 4.2, reviews: 200 },
  { id: 12, icon: "⚡", name: "USB-C Dual Port Car Charger", category: "ACCESSORIES", source: "Amazon", costPrice: 12.99, rating: 4.8, reviews: 7800 },
];

const CATEGORIES = ["ALL", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

function sourceColor(source: "Amazon" | "eBay") {
  return source === "Amazon" ? "text-orange-400" : "text-blue-400";
}

export default function Dropship() {
  const [markupPct, setMarkupPct] = useState(100);
  const [filter, setFilter] = useState("ALL");
  const [addedToStore, setAddedToStore] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = PRODUCTS.filter(
    (p) =>
      (filter === "ALL" || p.category === filter) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sellPrice = (cost: number) => cost * (1 + markupPct / 100);
  const profit = (cost: number) => sellPrice(cost) - cost;

  const toggleStore = (id: number) => {
    setAddedToStore((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const totalProfit = addedToStore.reduce((sum, id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return product ? sum + profit(product.costPrice) : sum;
  }, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img
            src="/images/mutant-logo.png"
            alt="MUTANT"
            className="h-9 w-auto object-contain transition-all hover:drop-shadow-[0_0_8px_hsl(82,85%,50%/0.7)]"
            style={{ filter: "invert(1) drop-shadow(0 0 5px hsl(82,85%,50%/0.4))" }}
          />
        </Link>
        <Link to="/" className="font-display text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors">
          ← BACK
        </Link>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <p className="font-display text-xs tracking-[0.4em] text-primary mb-4">DROPSHIP GEAR</p>
        <h1 className="font-display text-7xl leading-none mb-6">
          SOURCE IT.
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, hsl(82,85%,50%), hsl(82,85%,72%))" }}
          >
            MARK IT UP.
          </span>
        </h1>
        <p className="font-body text-muted-foreground max-w-2xl leading-relaxed mb-2">
          Pull gear from Amazon and eBay, set your own price on the fly, and bundle it with Mutant pre-orders.
          Build your own revenue stream — zero inventory, zero risk.
        </p>

        <div className="h-px mt-10 mb-10 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* How it works */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { step: "01", label: "BROWSE & SOURCE", desc: "Find gear from Amazon & eBay that riders actually want." },
            { step: "02", label: "SET YOUR MARKUP", desc: "Slide the markup to your margin. We show you profit in real‑time." },
            { step: "03", label: "SELL & COLLECT", desc: "Bundle with pre-orders or sell standalone. You keep the margin." },
          ].map((item) => (
            <div key={item.step} className="bg-card border border-border rounded-sm p-5">
              <p className="font-display text-3xl text-primary/30 mb-2">{item.step}</p>
              <p className="font-display text-sm tracking-widest text-foreground mb-2">{item.label}</p>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Markup control + store summary */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 mb-10">
          {/* Markup slider */}
          <div className="bg-card border border-border rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-display text-xs tracking-[0.35em] text-muted-foreground">GLOBAL MARKUP</p>
              <span className="font-display text-2xl text-primary">{markupPct}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={300}
              step={5}
              value={markupPct}
              onChange={(e) => setMarkupPct(Number(e.target.value))}
              className="w-full accent-[hsl(82,85%,50%)] cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="font-body text-xs text-muted-foreground">10% — thin margin</span>
              <span className="font-body text-xs text-muted-foreground">300% — premium</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[25, 50, 100, 150, 200, 250].map((val) => (
                <button
                  key={val}
                  onClick={() => setMarkupPct(val)}
                  className={`py-2 font-display text-xs tracking-widest rounded-sm border transition-all ${
                    markupPct === val
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:border-muted-foreground"
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* My store summary */}
          <div className="bg-[hsl(82,85%,50%,0.06)] border border-[hsl(82,85%,50%,0.2)] rounded-sm p-6">
            <p className="font-display text-xs tracking-[0.35em] text-muted-foreground mb-4">MY STORE</p>
            {addedToStore.length === 0 ? (
              <p className="font-body text-xs text-muted-foreground">Add products below to build your store.</p>
            ) : (
              <>
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto scrollbar-hide">
                  {addedToStore.map((id) => {
                    const p = PRODUCTS.find((prod) => prod.id === id)!;
                    return (
                      <div key={id} className="flex justify-between text-xs">
                        <span className="font-body text-muted-foreground truncate mr-2">{p.icon} {p.name}</span>
                        <span className="font-display text-primary shrink-0">+${profit(p.costPrice).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="h-px bg-border mb-3" />
                <div className="flex justify-between mb-4">
                  <span className="font-display text-xs tracking-widest text-muted-foreground">MARGIN / ITEM AVG</span>
                  <span className="font-display text-sm text-primary">
                    ${(totalProfit / addedToStore.length).toFixed(2)}
                  </span>
                </div>
                <button className="w-full py-3 bg-primary text-primary-foreground font-display text-xs tracking-widest rounded-sm hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(82,85%,50%/0.4)] transition-all">
                  LAUNCH MY STORE ({addedToStore.length})
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search + filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gear..."
            className="flex-1 min-w-[200px] bg-card border border-border rounded-sm px-4 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-2 font-display text-[10px] tracking-widest rounded-sm border transition-all ${
                  filter === cat
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => {
            const sell = sellPrice(product.costPrice);
            const margin = profit(product.costPrice);
            const isAdded = addedToStore.includes(product.id);

            return (
              <div
                key={product.id}
                className={`bg-card border rounded-sm flex flex-col transition-all ${
                  isAdded ? "border-primary shadow-[0_0_20px_hsl(82,85%,50%/0.15)]" : "border-border hover:border-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-center h-28 bg-[hsl(0,0%,7%)] rounded-t-sm border-b border-border text-4xl">
                  {product.icon}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-[9px] tracking-widest text-muted-foreground">{product.category}</span>
                    <span className={`font-body text-[9px] ${sourceColor(product.source)}`}>via {product.source}</span>
                  </div>

                  <p className="font-display text-sm tracking-wide text-foreground mb-1 leading-tight">{product.name}</p>
                  <p className="font-body text-[10px] text-muted-foreground mb-3">
                    ★ {product.rating} · {product.reviews.toLocaleString()} reviews
                  </p>

                  <div className="mt-auto space-y-1 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="font-body text-muted-foreground">Cost</span>
                      <span className="font-body text-foreground">${product.costPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-body text-muted-foreground">Your price ({markupPct}%)</span>
                      <span className="font-display text-foreground">${sell.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-body text-muted-foreground">Profit</span>
                      <span className="font-display text-primary">+${margin.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStore(product.id)}
                    className={`w-full py-2.5 font-display text-[10px] tracking-widest rounded-sm border transition-all ${
                      isAdded
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    {isAdded ? "✓ IN MY STORE" : "ADD TO STORE"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-muted-foreground tracking-widest">NO PRODUCTS MATCH</p>
          </div>
        )}
      </div>
    </div>
  );
}
