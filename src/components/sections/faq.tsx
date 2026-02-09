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
    question: "What’s included when I purchase SaasPilot?",
    answer: (
      <>
        <p>
          When you purchase SaasPilot get a complete Next.js foundation for your online business. It
          includes essential boilerplate like:
        </p>
        <ul className="mt-2 list-disc space-y-1 ps-6">
          <li>Payment system integration (Stripe)</li>
          <li>Database setup (Prisma)</li>
          <li>Authentication (NextAuth.js)</li>
          <li>Essential UI components (Shadcn UI)</li>
          <li>Email system integration (Resend)</li>
          <li>And much more...</li>
        </ul>
      </>
    )
  },
  {
    question: "Do I get updates?",
    answer: <p>Yes, you get updates for the core dependencies and the project structure.</p>
  },
  {
    question: "Can I use SaasPilot tech stack is different?",
    answer: (
      <p>
        Absolutely! While SaasPilot built with a modern Next.js/TypeScript/Prisma/Stripe stack, you
        can adapt many of its patterns, UI components, and architectural ideas to other frameworks
        or technologies. However, out of the box, SaasPilot optimized for the provided stack. If you
        use a different backend, database, or payment provider, you may need to modify or replace
        certain integrations to fit your needs.
      </p>
    )
  },
  {
    question: "Is there a refund policy?",
    answer: (
      <p>
        SaasPilot digital product. All sales are final and non-refundable. Once you receive access
        to the SaasPilot codebase, it is yours to keep permanently.
      </p>
    )
  },
  {
    question: "What support and assistance do I receive?",
    answer: (
      <p>
        SaasPilot provides clear, comprehensive documentation and responsive email support to assist
        you with setup, understanding the codebase, and resolving any SaasPilot-related questions or
        issues.
      </p>
    )
  }
];

export default function FAQ() {
  return (
    <SectionHeader id="faq" className="bg-muted/30 mx-auto">
      <SectionHeader.HeaderContent>
        <SectionHeader.Heading>Frequently asked questions</SectionHeader.Heading>
        <SectionHeader.Text>
          Have questions? We've got answers. Find information about features, licensing, support,
          and more.
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
