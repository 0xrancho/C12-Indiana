import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroWithChevron from "@/components/sections/HeroWithChevron";
import { CheckCircle2 } from "lucide-react";
import indySkyline from "@/assets/indy-skyline.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import c12Discussion from "@/assets/c12-forums-discussion.png";

const WhyC12 = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroWithChevron
        backgroundImage={indySkyline}
        title="Why C12 Indianapolis?"
        subtitle="Great Businesses. Greater Purpose."
        description={
          <>
            <p className="mb-6">
              C12 isn't just another business group—it's a movement of Christian CEOs and business owners
              pursuing excellence in leadership and eternal impact in the marketplace. We believe your
              business is a platform entrusted by God for transformation—of people, communities, and the
              world.
            </p>
            <p>
              At C12 Indianapolis, we bring together top business leaders in confidential peer advisory
              forums—guided by experienced Chairs who provide one-on-one coaching and world-class business
              and spiritual development curriculum.
            </p>
          </>
        }
      />

      {/* What We Do */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-8">What We Do</h2>
            <p className="text-center text-xl leading-relaxed">
              C12 is the world's leading network of Christian CEOs and business owners who are building great
              businesses for a greater purpose. We bring together top business leaders in confidential peer
              advisory forums—guided by experienced Chairs who provide one-on-one coaching and world-class
              business and spiritual development curriculum. Every month, members sharpen each other through
              transparent discussion, strategic insight, and biblical wisdom—so they can grow stronger in
              leadership, profitability, and Kingdom impact.
            </p>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-8">What Sets Us Apart</h2>
          <p className="text-center text-xl mb-16 max-w-4xl mx-auto">
            While other CEO peer groups focus on performance or networking, C12 Indianapolis is built on
            purpose. Our model blends best-in-class business strategy with biblical truth—equipping you to
            lead with eternal perspective and tangible results.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: "1",
                title: "Proven Business Excellence",
                description:
                  "We don't compromise on quality. C12's curriculum is world-class, covering strategy, operations, finance, leadership, and culture—grounded in proven frameworks that drive profitability and growth.",
              },
              {
                number: "2",
                title: "Peer Accountability with Kingdom Perspective",
                description:
                  "You'll be challenged by leaders who understand the tension between profit and purpose. Our forums create a space for honest conversation about business decisions, spiritual growth, and lasting impact.",
              },
              {
                number: "3",
                title: "Christ-Centered Foundation",
                description:
                  "Faith isn't an add-on—it's our foundation. Every meeting, every discussion, and every coaching session is rooted in biblical truth and designed to help you lead your business as an act of worship.",
              },
              {
                number: "4",
                title: "Transformation, Not Just Information",
                description:
                  "We don't just teach principles—we drive action. You'll leave every forum with clear next steps and the accountability to follow through. Real change happens here.",
              },
              {
                number: "5",
                title: "A Coach Who Walks With You",
                description:
                  "Your C12 Chair isn't just a facilitator—they're a seasoned business leader who understands your challenges and is committed to your success. Monthly one-on-one coaching ensures you stay on track.",
              },
            ].map((item, index) => (
              <Card key={index} className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-accent-foreground">
                    {item.number}
                  </span>
                </div>
                <h3 className="text-2xl mb-4">{item.title}</h3>
                <p>{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact and Benefits */}
      <section className="py-20 bg-secondary relative">
        {/* Top slope triangle - white overlapping */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-background pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }} />
        
        {/* Bottom slope triangle - white overlapping */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-background pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
          <div className="container mx-auto px-6">
          <h2 className="text-center mb-16 text-white">Impact and Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            <div>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="focus-60" className="bg-white rounded-lg border-none">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="text-xl font-heading">Focus 60 Meetings</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Between each monthly forum, receive monthly 1:1 mentorship and coaching from our Principal Chair.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="personal-professional" className="bg-white rounded-lg border-none">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="text-xl font-heading">Personal and Professional</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    From actionable business insights to spiritual enrichment, our members experience comprehensive growth.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="peer-advisory" className="bg-white rounded-lg border-none">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="text-xl font-heading">Exclusive Peer Advisory</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Engage in candid, faith-based discussions with peers who understand the unique challenges of integrating faith and business.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="action-learning" className="bg-white rounded-lg border-none">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="text-xl font-heading">Action-Oriented Learning</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Leave every meeting with concrete steps to improve both your business operations and personal life.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="community" className="bg-white rounded-lg border-none">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="text-xl font-heading">Community and Support</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    Connect with a diverse group of Christian leaders who are committed to helping each other succeed.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="hidden md:block">
              <img 
                src={c12Discussion} 
                alt="C12 forum discussion" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Is C12 Right for You? */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-8">Is C12 Right for You?</h2>
            <p className="text-center text-2xl mb-12">You might be ready for C12 if:</p>

            <div className="space-y-6">
              {[
                "You lead people and feel the weight of your decisions.",
                "You want your faith to shape how you lead, not just what you believe.",
                "You seek to grow your business while honoring God.",
                "You desire accountability, wisdom, and eternal impact.",
                "You're ready to move from success to significance.",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={28} />
                  <p className="text-xl">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Executive Leadership */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-8">Meet Our Executive Leadership</h2>
          <p className="text-center text-xl mb-16 max-w-4xl mx-auto">
            C12 Indy–Fort Wayne is led by a team of marketplace veterans passionate about helping Christian
            CEOs thrive:
          </p>

          <div className="max-w-4xl mx-auto">
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground italic">
                [Insert team headshots and bios - content TBD from client]
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8">Your Next Chapter Starts Here</h2>
            <p className="text-xl mb-10 opacity-95">
              Interested? Schedule a discovery call with one of our Chairs, and see if you meet membership
              requirements.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outlined" size="xl">
                  Request a Meeting
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outlined" size="xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyC12;
