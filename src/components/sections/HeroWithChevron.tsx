import { ReactNode } from "react";
import heroBanner from "@/assets/hero-banner5.png";

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
  const bgImage = backgroundImage || heroBanner;

  return (
    <section className={`relative overflow-visible ${className}`}>
      {/* Mobile Layout - stacked vertically */}
      <div className="md:hidden">
        {/* Image section with chevron overlay */}
        <div className="relative w-full min-h-[400px]">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Chevron overlay on mobile */}
          <div className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-end">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M 0,0 L 100,50 L 0,100 Z"
                fill="hsl(var(--primary))"
                opacity="0.9"
              />
              <path
                d="M 15,0 L 100,50 L 15,100 Z"
                fill="hsl(var(--accent))"
                opacity="0.9"
              />
            </svg>
          </div>
        </div>

        {/* Text content section - below image on teal background */}
        <div className="bg-primary text-primary-foreground py-12 px-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="mb-6">{title}</h1>
            {subtitle && <p className="text-2xl font-heading mb-6">{subtitle}</p>}
            {description && <div className="mb-8 opacity-95">{description}</div>}
            {children && <div className="flex flex-wrap gap-4">{children}</div>}
          </div>
        </div>
      </div>

      {/* Desktop Layout - original side-by-side design */}
      <div className="hidden md:flex relative min-h-[600px] items-center">
        {/* Full Banner Background */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgImage})` }}
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
      </div>

      {/* Triangle hanging off bottom of banner - overlaps slightly for seamless connection */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[38px] z-20">
        <div
          className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-t-[40px] border-t-primary"
        />
      </div>
    </section>
  );
};

export default HeroWithChevron;
