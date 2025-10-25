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

      {/* Teal Background for Content Area (Right 60%) */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] bg-primary z-0" />

      {/* Double-Angle Gold Chevron Overlay (Greater-than shape) - positioned at 35-50% */}
      <div
        className="absolute top-0 bottom-0 bg-accent z-10 hidden md:block"
        style={{
          left: "35%",
          width: "20%",
          clipPath: "polygon(0 0, 100% 0, 75% 50%, 100% 100%, 0 100%, 25% 50%)",
        }}
      />

      {/* Mobile: Full gold background with photo */}
      <div className="absolute left-0 top-0 bottom-0 w-full bg-accent md:hidden z-0" />

      {/* Content Section (Right 60%) */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="md:ml-[45%] md:pl-12 py-20">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="mb-6">{title}</h1>
            {subtitle && <p className="text-2xl md:text-3xl font-heading mb-6">{subtitle}</p>}
            {description && <div className="mb-8 opacity-95">{description}</div>}
            {children && <div className="flex flex-wrap gap-4">{children}</div>}
          </div>
        </div>
      </div>

      {/* Bottom Chevron Pointer */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[60px] border-r-[60px] border-t-[40px] border-transparent z-20"
        style={{ borderTopColor: "hsl(var(--accent))" }}
      />
    </section>
  );
};

export default HeroWithChevron;
