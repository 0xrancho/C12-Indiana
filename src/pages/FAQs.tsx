import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeroWithChevron from "@/components/sections/HeroWithChevron";
import prayerGroupImage from "@/assets/c12-prayer-group.jpeg";
import forumsDiscussionImage from "@/assets/c12-forums-discussion.png";
import faqBanner from "@/assets/FAQ-banner.png";

const FAQs = () => {
  const faqSections = [
    {
      title: "Basic Information",
      questions: [
        {
          q: "What is C12?",
          a: "C12 is a Christian CEO peer advisory organization that brings together business leaders in confidential forums for mutual support, accountability, and growth—guided by biblical principles and world-class business curriculum.",
        },
        {
          q: "What is the mission of C12?",
          a: "To change the world by bringing forth the Kingdom of God in the marketplace through the companies and lives of those He calls to run businesses for Him.",
        },
        {
          q: "Is C12 a ministry or a business?",
          a: "C12 is a for-profit business that operates with a ministry mindset. We believe business can be a powerful platform for Kingdom impact.",
        },
        {
          q: "Is C12 a local or national organization?",
          a: "C12 is a national organization with chapters across the United States and internationally. C12 Indianapolis is part of this larger network.",
        },
        {
          q: "How long has C12 operated in Indianapolis?",
          a: "C12 Indianapolis has been serving Christian business leaders in the Indianapolis area for several years, building strong community and impact.",
        },
        {
          q: "What are the qualifications for membership?",
          a: "Members must be CEOs, business owners, or senior executives with decision-making authority, profess faith in Jesus Christ, and be committed to personal and business growth through biblical principles.",
        },
      ],
    },
    {
      title: "Benefits",
      questions: [
        {
          q: "What are the benefits of membership?",
          a: "Members receive monthly peer advisory forums, one-on-one coaching, world-class curriculum, accountability, spiritual growth resources, annual business reviews, and access to a national network of Christian CEOs.",
        },
        {
          q: "What initially attracts most C12 members?",
          a: "Most members are attracted by the combination of business excellence and biblical wisdom, the opportunity for peer accountability, and the desire to integrate faith with their leadership.",
        },
        {
          q: "How does C12 help me work 'on' rather than 'in' my business?",
          a: "Through monthly forums and coaching, C12 provides structured time to step back from daily operations and focus on strategic thinking, long-term planning, and leadership development.",
        },
        {
          q: "How does the member forum serve as a board of advisors?",
          a: "Your forum consists of non-competing peers who bring diverse perspectives and expertise. They provide objective counsel on your business challenges and hold you accountable to your goals.",
        },
        {
          q: "How will a Core Business Presentation (CBP) help me?",
          a: "The CBP is an annual deep-dive review where you present your business strategy, financials, and challenges to your forum. Members provide strategic feedback and actionable recommendations.",
        },
        {
          q: "How does C12 hold members accountable?",
          a: "Through monthly forums where you report on commitments, one-on-one coaching sessions with your Chair, and peer relationships built on trust and transparency.",
        },
        {
          q: "What is a FOCUS60 and how does it help me?",
          a: "FOCUS60 is a monthly one-hour coaching session with your Chair between forums. It provides personalized guidance, accountability, and support for your specific challenges and goals.",
        },
        {
          q: "How does business-as-a-ministry (BaaM) apply to me?",
          a: "BaaM is the foundational principle that your business is a platform for ministry and Kingdom impact—through how you lead, serve employees, treat customers, and steward resources.",
        },
        {
          q: "How does the group pray together?",
          a: "Prayer is integral to every forum meeting. Members share prayer requests related to business and personal life, and the group prays together for wisdom, guidance, and breakthrough.",
        },
      ],
    },
    {
      title: "Format",
      questions: [
        {
          q: "How often does a C12 Business Forum meet?",
          a: "Forums meet monthly for a full-day session, typically from 8:00 AM to 3:00 PM.",
        },
        {
          q: "How long does a forum last?",
          a: "Each monthly forum is approximately 7 hours, including breaks and lunch.",
        },
        {
          q: "What are the elements of our forums?",
          a: "Forums include prayer, peer sharing and accountability, C12 curriculum teaching, a member Core Business Presentation, strategic discussion, and action planning.",
        },
        {
          q: "Do members ever meet outside the monthly business forums?",
          a: "Yes! Many groups develop strong relationships and meet informally for breakfast, lunch, or social gatherings. There are also regional and national C12 events.",
        },
        {
          q: "What are the attendance expectations for the meetings?",
          a: "Members are expected to attend all monthly forums and FOCUS60 sessions. Consistent attendance is essential for building trust and maintaining group dynamics.",
        },
        {
          q: "How does member accountability work?",
          a: "At each forum, members report on commitments made at the previous meeting. This creates a culture of follow-through and continuous improvement.",
        },
        {
          q: "Will any of my competitors be in my C12 Business Forum?",
          a: "No. C12 forums are intentionally structured to avoid direct competition, creating a safe environment for transparent sharing.",
        },
      ],
    },
    {
      title: "Key Players",
      questions: [
        {
          q: "What is the purpose of the C12 Key Players Program?",
          a: "Key Players is a parallel program for second-tier leaders in your organization (COOs, VPs, department heads). It provides them with peer support and development opportunities.",
        },
        {
          q: "How are Key Player meetings different from C12 group meetings?",
          a: "Key Player forums focus on issues relevant to non-owner executives, such as managing up, leading without ultimate authority, and career development.",
        },
        {
          q: "How can my leader benefit from being in a Key Players group?",
          a: "Your leader will gain fresh perspectives, accountability, biblical leadership principles, and support from peers facing similar challenges.",
        },
        {
          q: "Does a Key Player get one-on-one coaching like a C12 member?",
          a: "Key Players receive group coaching within their forums but typically do not have individual FOCUS60 sessions like CEO members.",
        },
        {
          q: "Is information from the group meetings shared between members and Key Players?",
          a: "No. Both forums maintain strict confidentiality. Information is only shared with explicit permission from the member.",
        },
      ],
    },
    {
      title: "Next Steps",
      questions: [
        {
          q: "How can I determine if C12 is a fit for me?",
          a: "Schedule a discovery call with one of our Chairs. They'll learn about your business, explain the C12 experience, and help you determine if it's the right fit.",
        },
        {
          q: "What are the normal investigation steps?",
          a: "1) Initial conversation with a Chair, 2) Visit a forum meeting as a guest, 3) Complete application and interview, 4) Membership approval and onboarding.",
        },
        {
          q: "Can you connect me with an existing member?",
          a: "Yes! We're happy to connect prospective members with current members for authentic conversations about their C12 experience.",
        },
        {
          q: "Is there a 'try before you buy' option?",
          a: "Yes. Qualified prospects are invited to attend a forum meeting as a guest to experience the format and community firsthand.",
        },
        {
          q: "What happens on the day of my visit?",
          a: "You'll join a full forum meeting, participate in discussions, experience the curriculum, and meet the members. Afterwards, you'll debrief with the Chair.",
        },
        {
          q: "What are the investments required for C12 participation?",
          a: "C12 membership requires both financial investment (monthly dues) and time commitment (monthly forum and FOCUS60). Contact us for specific pricing details.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroWithChevron
        backgroundImage={faqBanner}
        title="FAQ"
        subtitle="Clarity builds confidence."
      />

      {/* FAQ Sections with Alternating Backgrounds */}
      {faqSections.map((section, sectionIndex) => {
        const isEven = sectionIndex % 2 === 0;
        const showBenefitsBackground = section.title === "Benefits";
        const showKeyPlayersBackground = section.title === "Key Players";

        return (
          <div key={sectionIndex}>
            {/* FAQ Section */}
            <section
              className={`py-20 relative ${sectionIndex === 0 ? 'md:pt-20 pt-0' : ''} ${
                isEven ? "bg-background" : "bg-accent bg-grid-overlay-dark"
              }`}
            >
              {/* Background images */}
              {showBenefitsBackground && (
                <div className="absolute inset-0 opacity-10">
                  <img
                    src={prayerGroupImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {showKeyPlayersBackground && (
                <div className="absolute inset-0 opacity-10">
                  <img
                    src={forumsDiscussionImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                  <h2 className="mb-8 text-primary">{section.title}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {section.questions.map((item, questionIndex) => (
                      <AccordionItem
                        key={questionIndex}
                        value={`${sectionIndex}-${questionIndex}`}
                        className="bg-card rounded-lg px-6 border-none shadow-sm hover:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-6 group">
                          <span className="font-heading text-xl group-hover:text-primary transition-colors">
                            {item.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-xl pb-6 text-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>

            {/* Diagonal Separator (except after last section) */}
            {sectionIndex < faqSections.length - 1 && (
              <div className="relative h-24 overflow-hidden">
                <div
                  className={`absolute inset-0 ${
                    sectionIndex === 0
                      ? "bg-grid-overlay-dark"  // Triangle over Benefits - custom color with grid
                      : sectionIndex === 2
                        ? "bg-grid-overlay-dark"  // Triangle over Key Players - custom color with grid
                        : isEven ? "bg-accent" : "bg-background"
                  }`}
                  style={{
                    backgroundColor: sectionIndex === 0
                      ? "#CEAB74"  // Match Benefits section appearance
                      : sectionIndex === 2
                        ? "#D2AE75"  // Match Key Players section appearance
                        : undefined,
                    clipPath: sectionIndex === 3
                      ? "polygon(0 0, 100% 0, 100% 100%)"  // Key Players: slope up-right
                      : sectionIndex % 2 === 0
                        ? "polygon(0 0, 100% 100%, 0 100%)"  // Slope down-right
                        : "polygon(0 100%, 100% 0, 100% 100%)", // Slope down-left
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom CTA */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="mb-6">Ready to learn more?</h3>
            <Link to="/contact">
              <Button size="xl">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
