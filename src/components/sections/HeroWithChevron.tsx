import { ReactNode } from "react";

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
      {/* Background Image Section (Left ~22%) */}
      {backgroundImage && (
        <div
          className="absolute left-0 top-0 bottom-0 w-full md:w-[22%] bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Arrow Divider - Navy and Gold Stripes */}
      <svg
        className="hidden md:block absolute top-0 h-full z-[1]"
        style={{ left: "22%", width: "10%" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Dark Navy Stripe - Thin */}
        <polygon
          points="0,0 20,0 50,50 20,100 0,100 30,50"
          fill="hsl(195, 45%, 20%)"
        />
        {/* Gold/Yellow Stripe - Wider */}
        <polygon
          points="20,0 100,0 100,100 20,100 50,50"
          fill="hsl(var(--accent))"
        />
      </svg>

      {/* Teal Background for Content Area (Right ~68%) */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[68%] bg-primary z-0" />

      {/* Content Section */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="md:ml-[35%] md:pl-12 py-20">
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
