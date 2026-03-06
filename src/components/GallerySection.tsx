import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-mutant.jpg";
import actionImg from "@/assets/mutant-action.jpg";
import detailImg from "@/assets/mutant-detail.jpg";
import sideImg from "@/assets/mutant-side.jpg";

const GALLERY = [
  { src: heroImg, label: "BUILT FOR THE TERRAIN", span: "col-span-2 row-span-2" },
  { src: actionImg, label: "FULL SEND", span: "col-span-1 row-span-1" },
  { src: sideImg, label: "EVERY ANGLE", span: "col-span-1 row-span-1" },
  { src: detailImg, label: "THE DETAILS", span: "col-span-2 row-span-1" },
];

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="mb-10">
          <p className="font-display text-xs tracking-[0.4em] text-primary mb-3">THE MUTANT IN THE WILD</p>
          <h2 className="font-ghastly text-6xl sm:text-7xl leading-none text-foreground mb-4">
            SEE IT.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(82,85%,50%), hsl(82,85%,72%))" }}
            >
              FEEL IT.
            </span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg">
            One look and you'll understand. Every angle is aggressive. Every detail intentional.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[220px] sm:auto-rows-[260px] gap-3">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-sm group cursor-pointer ${item.span}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-display text-xs tracking-[0.3em] text-primary">{item.label}</p>
              </div>
              {/* Corner accent */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
