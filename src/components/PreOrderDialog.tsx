import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

interface PreOrderDialogProps {
  children: React.ReactNode; // element that will act as the trigger
}

export function PreOrderDialog({ children }: PreOrderDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Build Your Mutant Ride</DialogTitle>
          <DialogDescription>
            Customize your ride with the performance parts and style you
            crave. Gain exclusive access to support channels, coveted
            sponsorship opportunities, and branded merch drops (hats,
            hoodies, glasses, stickers, lanyards) with a true "mutant"
            vibe. You can even dropship gear from eBay or Amazon and
            adjust mark‑ups on the fly—all from a single clean interface.
          </DialogDescription>
        </DialogHeader>

        {/* actions list */}
        <div className="grid gap-3 mt-4">
          <a
            href="/build"
            className="px-6 py-3 bg-primary text-primary-foreground font-display text-sm text-center rounded hover:box-glow-strong transition-shadow"
          >
            Create Your Ride
          </a>
          <a
            href="mailto:support@mutant.com"
            className="px-6 py-3 border border-border text-foreground font-display text-sm text-center rounded hover:bg-secondary/80 transition-colors"
          >
            Contact Support
          </a>
          <a
            href="/sponsorship"
            className="px-6 py-3 border border-border text-foreground font-display text-sm text-center rounded hover:bg-secondary/80 transition-colors"
          >
            Sponsorship Opportunities
          </a>
          <a
            href="/merch"
            className="px-6 py-3 border border-border text-foreground font-display text-sm text-center rounded hover:bg-secondary/80 transition-colors"
          >
            Merch & Giveaways
          </a>
          <a
            href="/dropship"
            className="px-6 py-3 border border-border text-foreground font-display text-sm text-center rounded hover:bg-secondary/80 transition-colors"
          >
            Dropship Gear
          </a>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="mt-6 px-6 py-3 bg-muted-foreground text-foreground font-display text-sm rounded">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
