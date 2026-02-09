"use client";

import { MotionDiv } from "@/components/motion-elements";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is UrbanIQ?",
    answer:
      "UrbanIQ is an AI-powered real estate intelligence platform that helps property owners and professionals analyze value, legal risk, and sale readiness in minutes."
  },
  {
    question: "Who is UrbanIQ designed for?",
    answer:
      "UrbanIQ is built for property owners, real estate agents, investors, and legal professionals who need fast, reliable insights before selling, buying, or advising."
  },
  {
    question: "Does UrbanIQ provide property valuations?",
    answer:
      "Yes. UrbanIQ generates AI-assisted valuation ranges with confidence scores, market context, and explanatory factors — not just a single opaque number."
  },
  {
    question: "Does UrbanIQ analyze legal and urban planning risks?",
    answer:
      "Absolutely. UrbanIQ flags potential legal, registry, urban-planning, and documentation risks so you can anticipate issues before a transaction."
  },
  {
    question: "Is UrbanIQ a real estate agency?",
    answer:
      "No. UrbanIQ is a neutral intelligence platform. We do not sell properties — we provide analysis, insights, and qualified data that users can act on."
  },
  {
    question: "How long does it take to get results?",
    answer:
      "Most analyses are generated in under 60 seconds once the property data is submitted."
  }
];

export default function FAQ() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <MotionDiv
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl space-y-3 pb-12 text-center md:pb-16"
        >
          <h3 className="text-3xl font-bold sm:text-4xl">UrbanIQ – Frequently Asked Questions</h3>
          <p className="text-muted-foreground text-base">
            Clear answers about UrbanIQ, AI-powered property analysis, valuations, and legal insights.
          </p>
        </MotionDiv>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="space-y-4">
            {faqItems.slice(0, 3).map((item, index) => (
              <MotionDiv
                key={index}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
              >
                <Accordion type="single" collapsible defaultValue="item-0">
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card rounded-2xl border px-6"
                  >
                    <AccordionTrigger className="text-base font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </MotionDiv>
            ))}
          </div>

          <div className="space-y-4">
            {faqItems.slice(3, 6).map((item, index) => (
              <MotionDiv
                key={index + 3}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: (index + 3) * 0.1 }}
              >
                <Accordion type="single" collapsible defaultValue="item-3">
                  <AccordionItem
                    value={`item-${index + 3}`}
                    className="bg-card rounded-2xl border px-6"
                  >
                    <AccordionTrigger className="text-base font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
