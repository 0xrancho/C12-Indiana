import { ReactNode } from "react";
import heroBanner from "@/assets/hero-banner-screencap.png";

interface HeroWithChevronProps {
  backgroundImage?: string;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const HeroWithChevron = ({
  backgroundImage,
  title,
  subtitle,
  description,
  children,
  className = "",
}: HeroWithChevronProps) => {
  return (
    <section className={`relative min-h-[600px] flex items-center overflow-hidden ${className}`}>
      {/* Full Banner Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />

      {/* Content Section - positioned in teal area on right */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="md:ml-[55%] py-20">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="mb-6">{title}</h1>
            {subtitle && <p className="text-2xl md:text-3xl font-heading mb-6">{subtitle}</p>}
            {description && <div className="mb-8 opacity-95">{description}</div>}
            {children && <div className="flex flex-wrap gap-4">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWithChevron;
