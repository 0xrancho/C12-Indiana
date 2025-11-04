import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import c12FooterLogo from "@/assets/C12_2.png";

const Footer = () => {
  return (
    <footer>
      {/* Bottom Bar */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-75">
              © {new Date().getFullYear()} C12 Indianapolis. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
                <span className="opacity-50">|</span>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy
                </a>
              </div>

              <img src={c12FooterLogo} alt="C12 Logo" className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
