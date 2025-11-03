import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroWithChevron from "@/components/sections/HeroWithChevron";
import heroBanner5 from "@/assets/hero-banner5.png";
import outcome93 from "@/assets/93-outcome.png";
import outcome79 from "@/assets/79-outcome.png";
import outcome82 from "@/assets/82-outcome.png";
import outcome87 from "@/assets/87-outcome.png";
import outcome85 from "@/assets/85-outcome.png";
import outcome78 from "@/assets/78-outcome.png";
import outcome96 from "@/assets/96-outcome.png";
import { Scale, Handshake, Target, ArrowRight, CheckCircle2 } from "lucide-react";

const Home = () => {
  const [highlightedStep, setHighlightedStep] = useState<number>(-1);
  const journeyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation sequence when section comes into view
            setHighlightedStep(0);
            setTimeout(() => setHighlightedStep(1), 800);
            setTimeout(() => setHighlightedStep(2), 1600);
            setTimeout(() => setHighlightedStep(-1), 2400); // Reset after all are shown
          }
        });
      },
      { threshold: 0.3 }
    );

    if (journeyRef.current) {
      observer.observe(journeyRef.current);
    }

    return () => {
      if (journeyRef.current) {
        observer.unobserve(journeyRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroWithChevron
        backgroundImage={heroBanner5}
        title="Don't Lead Alone."
        subtitle="Join a community of Christian CEOs and Business Owners who lead with faith and excellence."
        description={
          <p>
            C12 Indianapolis brings together business leaders who want to grow strong companies while
            pursuing a greater impact.
          </p>
        }
      >
        <Link to="/executive-briefing">
          <Button variant="outlined" size="xl">
            Request a Meeting
          </Button>
        </Link>
        <Link to="/why-c12">
          <Button variant="outlined" size="xl">
            Learn More
          </Button>
        </Link>
      </HeroWithChevron>

      {/* What is C12 Section */}
      <section className="relative py-20 bg-background overflow-visible">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8">Great Businesses. Greater Purpose.</h2>
            <p className="mb-12">
              C12 is the world's largest network of Christian CEOs, owners, and executives who meet monthly
              in peer advisory groups. Together, we sharpen one another through business excellence, biblical
              leadership, and eternal perspective—so we can build companies that bless people and honor God.
            </p>

            {/* YouTube Video */}
            <div className="aspect-video w-full max-w-3xl mx-auto mb-8 rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/wnqwY6nbneg"
                title="Power of Peers"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <Link to="/why-c12" className="inline-flex items-center text-accent hover:text-accent/80 font-heading text-lg">
              Learn More About C12 <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>

        {/* White Triangle hanging off bottom - overlaps into next section */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[38px] z-20">
          <div
            className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-t-[40px] border-t-background"
          />
        </div>
      </section>

      {/* Experience Summary Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Proven Practices Card */}
            <div className="group h-64 cursor-pointer [perspective:1000px]">
              <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Face */}
                <Card className="absolute inset-0 bg-card/10 border-accent/20 p-8 flex flex-col items-center justify-center [backface-visibility:hidden]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <Scale className="text-accent" size={32} />
                  </div>
                  <h3 className="text-2xl text-primary-foreground">Proven Practices</h3>
                </Card>
                {/* Back Face */}
                <Card className="absolute inset-0 bg-accent border-accent p-8 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-accent-foreground text-center">
                    Monthly facilitated curriculum centered on the five points of business alignment: Ministry,
                    Revenue, Finances, Operations, and People.
                  </p>
                </Card>
              </div>
            </div>

            {/* Prudent Counsel Card */}
            <div className="group h-64 cursor-pointer [perspective:1000px]">
              <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Face */}
                <Card className="absolute inset-0 bg-card/10 border-accent/20 p-8 flex flex-col items-center justify-center [backface-visibility:hidden]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <Handshake className="text-accent" size={32} />
                  </div>
                  <h3 className="text-2xl text-primary-foreground">Prudent Counsel</h3>
                </Card>
                {/* Back Face */}
                <Card className="absolute inset-0 bg-accent border-accent p-8 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-accent-foreground text-center">
                    Unbiased counsel from non-competing peers in a confidential, facilitated forum with
                    personalized business coaching to promote accountability.
                  </p>
                </Card>
              </div>
            </div>

            {/* Purposed Action Card */}
            <div className="group h-64 cursor-pointer [perspective:1000px]">
              <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Face */}
                <Card className="absolute inset-0 bg-card/10 border-accent/20 p-8 flex flex-col items-center justify-center [backface-visibility:hidden]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <Target className="text-accent" size={32} />
                  </div>
                  <h3 className="text-2xl text-primary-foreground">Purposed Action</h3>
                </Card>
                {/* Back Face */}
                <Card className="absolute inset-0 bg-accent border-accent p-8 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-accent-foreground text-center">
                    The C12 Experience offers an annual business review and monthly action-oriented sessions that
                    foster personal, spiritual, and professional transformation.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-16">Member Outcomes</h2>

          {/* Top row - 4 circles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-6">
            <div className="flex items-center justify-center p-1 rounded-full bg-primary">
              <img src={outcome93} alt="93% outcome" className="w-full h-auto" />
            </div>
            <div className="flex items-center justify-center p-1 rounded-full bg-accent">
              <img src={outcome79} alt="79% outcome" className="w-full h-auto" />
            </div>
            <div className="flex items-center justify-center p-1 rounded-full bg-primary">
              <img src={outcome82} alt="82% outcome" className="w-full h-auto" />
            </div>
            <div className="flex items-center justify-center p-1 rounded-full bg-accent">
              <img src={outcome87} alt="87% outcome" className="w-full h-auto" />
            </div>
          </div>

          {/* Bottom row - 3 circles */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center p-1 rounded-full bg-primary">
              <img src={outcome85} alt="85% outcome" className="w-full h-auto" />
            </div>
            <div className="flex items-center justify-center p-1 rounded-full bg-accent">
              <img src={outcome78} alt="78% outcome" className="w-full h-auto" />
            </div>
            <div className="flex items-center justify-center p-1 rounded-full bg-primary">
              <img src={outcome96} alt="96% outcome" className="w-full h-auto" />
            </div>
          </div>

          <p className="text-center text-2xl font-heading mt-12 max-w-3xl mx-auto">
            At C12, results matter—because what's good for the leader is great for the business.
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-16">Real Leaders. Real Transformation.</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Finding Purpose Beyond Profit",
                videoId: "H5lme3tqx0U",
              },
              {
                title: "Redefining Success",
                videoId: "eWE6GSYRLPk",
              },
              {
                title: "Building Ministry Into Business",
                videoId: "DrCJzeiZy_Q",
              },
            ].map((video, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl">{video.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section ref={journeyRef} className="relative py-20 bg-muted overflow-visible">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-16">Start Your Journey</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                number: "1",
                title: "Contact Us",
                description: "Tell us more about yourself and your organization.",
              },
              {
                number: "2",
                title: "Connect & Learn",
                description: "Schedule a discovery call with a Chair to discuss requirements and steps.",
              },
              {
                number: "3",
                title: "Apply",
                description: "Discuss membership requirements, next steps, and apply!",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center transition-all duration-500 ${
                    highlightedStep === index
                      ? 'scale-125 shadow-2xl shadow-accent/80 ring-4 ring-accent/50'
                      : ''
                  }`}
                >
                  <span className="text-4xl font-heading font-bold text-accent-foreground">
                    {step.number}
                  </span>
                </div>
                <h3
                  className={`text-2xl mb-4 transition-all duration-500 ${
                    highlightedStep === index
                      ? 'text-accent scale-110 font-bold'
                      : ''
                  }`}
                >
                  {step.title}
                </h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* White Triangle hanging off bottom - overlaps into next section */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[38px] z-20">
          <div
            className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-t-[40px] border-t-muted"
          />
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8">An investment in transformation that pays dividends.</h2>
            <div className="space-y-4 mb-8 text-2xl">
              <p className="flex items-center justify-center gap-3">
                <CheckCircle2 className="text-accent" size={28} />
                From isolation to insight.
              </p>
              <p className="flex items-center justify-center gap-3">
                <CheckCircle2 className="text-accent" size={28} />
                From pressure to peace.
              </p>
              <p className="flex items-center justify-center gap-3">
                <CheckCircle2 className="text-accent" size={28} />
                From busy leadership to intentional stewardship.
              </p>
            </div>
            <p className="text-xl mb-10 opacity-95">
              You don't have to navigate business alone. Let's start a conversation about how C12 can equip
              you to lead with clarity, conviction, and impact.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outlined" size="xl">
                  Request a Meeting
                </Button>
              </Link>
              <Link to="/why-c12">
                <Button variant="outlined" size="xl">
                  Learn More About C12
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
