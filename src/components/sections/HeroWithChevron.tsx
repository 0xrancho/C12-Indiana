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
      {/* Background Image Section (Left 40%) */}
      {backgroundImage && (
        <div
          className="absolute left-0 top-0 bottom-0 w-full md:w-[40%] bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Arrow Divider - Navy and Gold Stripes */}
      <svg
        className="hidden md:block absolute top-0 h-full z-[1]"
        style={{ left: "32%", width: "28%" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Dark Navy Stripe */}
        <polygon
          points="0,0 40,0 70,50 40,100 0,100 30,50"
          fill="hsl(195, 45%, 20%)"
        />
        {/* Gold/Yellow Stripe */}
        <polygon
          points="40,0 80,0 100,50 80,100 40,100 70,50"
          fill="hsl(var(--accent))"
        />
      </svg>

      {/* Teal Background for Content Area (Right 60%) */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] bg-primary z-0" />

      {/* Content Section (Right 60%) */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="md:ml-[55%] md:pl-12 py-20">
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
