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
import indyMap from "@/assets/contact-Indiana3.png";
import contactBanner from "@/assets/Contact-banner.png";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        organization: formData.get('organization'),
        industry: formData.get('industry'),
        experience: formData.get('experience'),
      };

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      toast({
        title: "Thank you!",
        description: "We'll reach out within one business day.",
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroWithChevron
        backgroundImage={contactBanner}
        title="Get In Touch"
        subtitle="Let's embark on this journey together!"
      />

      {/* Form Section */}
      <section className="py-20 md:py-20 pt-8 bg-muted bg-grid-overlay-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-xl mb-12">
              Every great partnership starts with a conversation. Tell us a little about yourself, and we'll
              connect you with a Chair to explore how C12 can serve you.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Map Image */}
              <div className="hidden md:flex">
                <img
                  src={indyMap}
                  alt="C12 Indiana service area map"
                  className="w-full object-cover rounded-tl-[2rem]"
                />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-4 md:p-8 rounded-lg shadow-lg flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>

              <div>
                <Label htmlFor="organization">Organization *</Label>
                <Input id="organization" name="organization" required />
              </div>

              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select name="industry" required>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Professional Services">Professional Services</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience" className="block">
                  How many years have you been stewarding the business as Owner/Founder/CEO/President/General Manager? *
                </Label>
                <Select name="experience" required>
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
