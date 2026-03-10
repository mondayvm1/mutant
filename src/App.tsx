import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BuildRide from "./pages/BuildRide";
import Sponsorship from "./pages/Sponsorship";
import Merch from "./pages/Merch";
import Dropship from "./pages/Dropship";
import Community from "./pages/Community";
import MutantPDP from "./pages/MutantPDP";
import Store from "./pages/Store";
import StoreCategory from "./pages/StoreCategory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mutant" element={<MutantPDP />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/mutant" element={<StoreCategory category="mutant" />} />
          <Route path="/store/accessories" element={<StoreCategory category="accessories" />} />
          <Route path="/store/parts" element={<StoreCategory category="parts" />} />
          <Route path="/store/merch" element={<StoreCategory category="merch" />} />
          <Route path="/build" element={<BuildRide />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/dropship" element={<Dropship />} />
          <Route path="/community" element={<Community />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
