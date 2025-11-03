import { ReactNode, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { ChevronRight } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navigation />
      <main className="flex-1 pt-20 pb-20 overflow-x-hidden">{children}</main>
      <Footer />

      {/* Stationary Footer - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground py-4 px-6 shadow-lg z-40">
        <div className="container mx-auto">
          <p className="text-center text-base md:text-lg">
            Schedule a discovery call with the Chair and learn more about our next C12 Executive Briefing.
            <Link to="/executive-briefing" className="inline ml-2">
              <span className="font-bold underline decoration-accent decoration-2">Contact</span>
              <ChevronRight className="inline-block text-accent ml-1" size={20} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
