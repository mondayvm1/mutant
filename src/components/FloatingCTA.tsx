import React from "react";
import { PreOrderDialog } from "./PreOrderDialog";

export function FloatingCTA() {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <PreOrderDialog>
        <button className="px-4 py-2 bg-primary text-primary-foreground font-display text-sm tracking-widest rounded shadow-md hover:box-glow transition-shadow">
          PRE ORDER NOW
        </button>
      </PreOrderDialog>
    </div>
  );
}
