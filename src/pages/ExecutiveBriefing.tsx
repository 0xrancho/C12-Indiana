import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeroWithChevron from "@/components/sections/HeroWithChevron";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import outcome96 from "@/assets/96-outcome.png";
import outcome78 from "@/assets/78-outcome.png";
import outcome73 from "@/assets/73-outcome.png";
import metric4000 from "@/assets/metric-4000.png";
import metric175 from "@/assets/metric-175.png";
import metric5 from "@/assets/metric-5.png";
import metric1 from "@/assets/metric-1.png";
import c12Discussion from "@/assets/c12-forums-discussion.png";

const ExecutiveBriefing = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Request Received!",
      description: "We'll contact you shortly about the next Executive Briefing.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroWithChevron
        title="Executive Briefing"
        subtitle="Explore a 2 Hour Executive Briefing to see if C12 is right for you."
      />

      {/* Stats Block */}
      <section className="py-20 md:pt-20 pt-8 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="mb-4">It Is Lonely At The Top</h2>
            <p className="text-3xl font-heading mb-6">But, it doesn't have to be…</p>
            <p className="text-xl mb-12">
              C12 Business Forums is an invitation-only peer group for Christian CEOs.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div>
                <img src={outcome96} alt="96% outcome" className="w-full h-auto" />
              </div>
              <div>
                <img src={outcome78} alt="78% outcome" className="w-full h-auto" />
              </div>
              <div>
                <img src={outcome73} alt="73% outcome" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Stacked metrics - right aligned */}
              <div className="space-y-6 flex flex-col items-end">
                <img src={metric4000} alt="4000+ Christian CEOs and Business Leaders" className="border-2 border-accent shadow-lg rounded" />
                <img src={metric175} alt="175+ Cities" className="border-2 border-accent shadow-lg rounded" />
                <img src={metric5} alt="5 Continents" className="border-2 border-accent shadow-lg rounded" />
                <img src={metric1} alt="1 Mission" className="border-2 border-accent shadow-lg rounded" />
              </div>

              {/* Right: Forum discussion image */}
              <div className="hidden md:block">
                <img src={c12Discussion} alt="C12 forum discussion" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Includes */}
      <section className="py-20 bg-accent bg-grid-overlay-dark relative">
        {/* Top slope triangle - muted gray overlapping */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-muted pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />

        {/* Bottom slope triangle - muted gray overlapping */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-muted pointer-events-none" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12 text-primary">C12 Membership Includes:</h2>
            <div className="space-y-6">
              {[
                "One-on-One Coaching",
                "CEO and Key Player Forums",
                "World-Class Curriculum and Resources",
                "Global Conferences Industry Forums",
                "Annual 360-Degree Business Evaluations",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-white" size={20} />
                  </div>
                  <p className="text-xl text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-xl mb-12">
              Every great partnership starts with a conversation. Tell us a little about yourself, and we'll
              connect you with a Chair to see if you qualify to attend the next Executive Briefing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" required />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required />
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" type="tel" required />
              </div>

              <div>
                <Label htmlFor="organization">Organization *</Label>
                <Input id="organization" required />
              </div>

              <div>
                <Label htmlFor="orgSize">How many people are in your organization? *</Label>
                <Select required>
                  <SelectTrigger id="orgSize">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-10">0-10</SelectItem>
                    <SelectItem value="11-25">11-25</SelectItem>
                    <SelectItem value="26-50">26-50</SelectItem>
                    <SelectItem value="51-100">51-100</SelectItem>
                    <SelectItem value="101-250">101-250</SelectItem>
                    <SelectItem value="251-500">251-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience">
                  How many years have you been stewarding the business as
                  Owner/Founder/CEO/President/General Manager? *
                </Label>
                <Select required>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="4-7">4-7 years</SelectItem>
                    <SelectItem value="8-15">8-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" size="xl" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Request Executive Briefing"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutiveBriefing;
