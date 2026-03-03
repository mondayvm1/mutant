import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ActionSection } from "@/components/ActionSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { PreOrderDialog } from "@/components/PreOrderDialog";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50">
        <img
          src="/images/mutant-logo.png"
          alt="MUTANT"
          className="h-8 sm:h-10 w-auto object-contain"
          style={{ filter: "invert(1) drop-shadow(0 0 6px hsl(82,85%,50%/0.5))" }}
        />
        {/* nav button now launches pre-order dialog */}
        <PreOrderDialog>
          <button className="px-4 sm:px-6 py-2 bg-primary text-primary-foreground font-display text-xs sm:text-sm tracking-widest hover:box-glow transition-shadow duration-300">
            PRE ORDER
          </button>
        </PreOrderDialog>
      </nav>

      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ActionSection />
      <CTASection />
      <Footer />
      {/* fixed right-side pre-order button */}
      <FloatingCTA />
    </div>
  );
};

export default Index;
