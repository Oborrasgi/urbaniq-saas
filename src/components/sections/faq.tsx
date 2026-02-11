"use client";

import { useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

import { SectionHeader } from "@/components/section-headers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What is UrbanIQ?",
    answer: (
      <p>
        UrbanIQ is an AI-powered real estate intelligence platform that helps property owners,
        agents, investors, and legal professionals analyze property value, detect legal risks,
        and qualify opportunities before making strategic decisions.
      </p>
    )
  },
  {
    question: "Does UrbanIQ provide property valuations?",
    answer: (
      <p>
        Yes. UrbanIQ generates AI-assisted valuation ranges (AVM) with confidence scores and
        explanatory factors based on market data, comparables, and contextual signals — not just
        a single opaque number.
      </p>
    )
  },
  {
    question: "Does UrbanIQ analyze legal and urban planning risks?",
    answer: (
      <p>
        Absolutely. The platform flags potential registry issues, urban planning constraints,
        documentation gaps, and legal risks so you can anticipate problems before listing,
        investing, or closing a transaction.
      </p>
    )
  },
  {
    question: "Is UrbanIQ a real estate agency?",
    answer: (
      <p>
        No. UrbanIQ is a neutral intelligence platform. We do not sell properties — we provide
        structured analysis, scoring, and decision-support tools that professionals can act on.
      </p>
    )
  },
  {
    question: "How long does it take to generate an analysis?",
    answer: (
      <p>
        Most property analyses are generated in under 60 seconds once the required data is
        submitted. Advanced modules may take slightly longer depending on complexity.
      </p>
    )
  },
  {
    question: "Is UrbanIQ compliant with RGPD/GDPR?",
    answer: (
      <p>
        Yes. UrbanIQ is designed with data protection and privacy by default. User data is
        processed securely, with consent-based flows and compliance-ready architecture.
      </p>
    )
  }
];

export default function FAQ() {
  return (
    <SectionHeader id="faq" className="bg-muted/30 mx-auto">
      <SectionHeader.HeaderContent>
        <SectionHeader.Heading>UrbanIQ – Frequently Asked Questions</SectionHeader.Heading>
        <SectionHeader.Text>
          Have questions about AI-powered property valuation, legal analysis, compliance, or platform capabilities? Here are clear answers.
        </SectionHeader.Text>
      </SectionHeader.HeaderContent>

      <SectionHeader.Content className="mx-auto md:max-w-4xl">
        <div className="mx-auto mb-12">
          <Accordion type="multiple" className="w-full" aria-label="FAQ List">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </Accordion>
        </div>
      </SectionHeader.Content>
    </SectionHeader>
  );
}

function FAQItem({ faq, index }: { faq: FAQItem; index: number }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(
        scope.current,
        { opacity: 1, y: 0 },
        { duration: 0.3, ease: "easeInOut", delay: index * 0.1 }
      );
    } else {
      animate(
        scope.current,
        { opacity: 0, y: 20 },
        { duration: 0.3, ease: "easeInOut", delay: index * 0.1 }
      );
    }
  }, [isInView, animate, index, scope]);

  return (
    <AccordionItem
      ref={scope}
      key={index}
      value={`item-${index}`}
      aria-label={`FAQ item: ${faq.question}`}
      className={cn(
        "my-2 rounded-lg border px-4 opacity-0",
        index === faqs.length - 1 && "!border-b"
      )}
    >
      <AccordionTrigger className="hover:text-primary text-foreground/90 data-[state=open]:text-primary items-center text-left text-lg hover:no-underline">
        {faq.question}
      </AccordionTrigger>

      <AccordionContent className="text-foreground/80 dark:text-foreground/70 space-y-2 pt-2 text-base">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
}
