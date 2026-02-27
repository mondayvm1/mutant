import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ActionSection } from "@/components/ActionSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50">
        <span className="font-display text-2xl tracking-widest text-foreground">
          MUTANT<span className="text-primary">.</span>
        </span>
        <a
          href="#reserve"
          className="px-6 py-2 bg-primary text-primary-foreground font-display text-sm tracking-widest hover:box-glow transition-shadow duration-300"
        >
          RESERVE
        </a>
      </nav>

      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ActionSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
