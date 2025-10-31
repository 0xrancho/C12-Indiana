import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeroWithChevron from "@/components/sections/HeroWithChevron";
import { useToast } from "@/hooks/use-toast";
import indyMap from "@/assets/indy-map.png";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Thank you!",
      description: "We'll reach out within one business day.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroWithChevron
        title="Get In Touch"
        subtitle="Let's embark on this journey together!"
      />

      {/* Form Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-xl mb-12">
              Every great partnership starts with a conversation. Tell us a little about yourself, and we'll
              connect you with a Chair to explore how C12 can serve you.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Map Image */}
              <div className="hidden md:block">
                <img 
                  src={indyMap} 
                  alt="C12 Indiana service area map" 
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Form */}
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
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
