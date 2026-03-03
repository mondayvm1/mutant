import { PreOrderDialog } from "./PreOrderDialog";

export function FloatingCTA() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <PreOrderDialog>
        <button
          className="group relative flex items-center justify-center bg-primary text-primary-foreground font-display tracking-[0.25em] text-sm overflow-hidden transition-all hover:bg-primary/90 hover:shadow-[0_0_40px_hsl(82,85%,50%/0.5)]"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            padding: "28px 13px",
          }}
        >
          {/* pulse ring */}
          <span className="absolute inset-0 bg-primary opacity-0 animate-[pulse_2s_ease-in-out_infinite] group-hover:opacity-20 transition-opacity" />
          <span className="relative z-10 whitespace-nowrap">PRE ORDER NOW</span>
        </button>
      </PreOrderDialog>
    </div>
  );
}
