import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import strategicPlanningGuide from "@/assets/strategic-planning-guide.webp";
import survivalToSustainability from "@/assets/survival-to-sustainability.webp";
import customerLoyaltyReferrals from "@/assets/customer-loyalty-referrals.png";
import prayerGroupImage from "@/assets/c12-prayer-group.jpeg";

const Resources = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState("");
  const { toast } = useToast();

  const handleDownloadClick = (resourceName: string) => {
    setSelectedResource(resourceName);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        organization: formData.get('organization'),
        resourceDownloaded: selectedResource,
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

      setIsModalOpen(false);
      toast({
        title: "Thank you!",
        description: "Your download will begin shortly.",
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const resources = [
    {
      title: "C12's Strategic Planning Guide",
      description:
        "A comprehensive framework for aligning your business strategy with Kingdom purpose.",
      image: strategicPlanningGuide,
    },
    {
      title: "From Survival to Sustainability",
      description:
        "Practical steps to move your business from reactive management to proactive growth.",
      image: survivalToSustainability,
    },
    {
      title: "Customer Loyalty & Referrals",
      description:
        "Proven strategies for building lasting customer relationships that drive organic growth.",
      image: customerLoyaltyReferrals,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-background pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="mb-6 text-primary">RESOURCES</h1>
          <p className="text-xl text-foreground">
            Take a look at a few of our top resources. Members gain access to a wide range of topical executive curriculum, case studies, videos, ebooks, leadership tools, seminars, and workshops, all in alignment and support to the C12 BaaM (Business-as-a-Ministry) Framework.
          </p>
        </div>
      </section>

      {/* Diagonal Separator - slopes up to the right */}
      <div className="relative h-32 bg-accent bg-grid-overlay-dark" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />

      {/* Resources Section */}
      <section className="relative bg-accent bg-grid-overlay-dark pt-16 pb-40">
        <div className="container mx-auto px-6 max-w-6xl space-y-12 relative z-10">
          {resources.map((resource, index) => (
            <Card key={index} className="bg-primary text-primary-foreground border-0 rounded-xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0 items-center">
                <div className="p-12 order-2 md:order-1">
                  <h3 className="mb-6">{resource.title}</h3>
                  <p className="text-lg mb-8 leading-relaxed">{resource.description}</p>
                  <Button
                    variant="default"
                    size="xl"
                    onClick={() => handleDownloadClick(resource.title)}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Download Now
                  </Button>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-background z-0" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>


      {/* CTA Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={prayerGroupImage} 
              alt="C12 prayer group" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <Card className="relative bg-primary/90 text-primary-foreground border-0 p-12 text-center shadow-2xl">
            <h2 className="mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Join a community of Christian business leaders committed to building businesses that honor God and serve others.
            </p>
            <Link to="/contact">
              <Button
                variant="default"
                size="xl"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Learn More About Membership
              </Button>
            </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Your Free Resource</DialogTitle>
            <DialogDescription>
              Enter your information to download {selectedResource}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="organization">Organization (optional)</Label>
              <Input id="organization" name="organization" />
            </div>
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Download Now
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
