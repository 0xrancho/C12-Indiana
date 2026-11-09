import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import WhyC12 from "./pages/WhyC12";
import FAQs from "./pages/FAQs";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import ExecutiveBriefing from "./pages/ExecutiveBriefing";
import BannerTest from "./pages/BannerTest";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why-c12" element={<WhyC12 />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/executive-briefing" element={<ExecutiveBriefing />} />
            <Route path="/banner-test" element={<BannerTest />} />
            <Route path="/members" element={<Members />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
