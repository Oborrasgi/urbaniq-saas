import { CheckCircle, Sparkles } from "lucide-react";
import Image from "next/image";

import { MotionDiv, MotionLi, MotionSpan, MotionUl } from "@/components/motion-elements";
import { Rotate } from "@/components/rotate";
import { SectionHeader } from "@/components/section-headers";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Discover What Inspires Engagement",
    description:
      "Don’t waste time guessing what content will work. Use real data and AI-curated insights to identify what your audience wants — before your competitors do.",
    Icon: Sparkles,
    tag: "Inspiration",
    image: "/dashboard.png",
    features: [
      "Instant Trend Discovery",
      "Access Millions of Proven Examples",
      "Engagement Pattern Analysis"
    ]
  },
  {
    id: 2,
    title: "Automate Repetitive Workflows",
    description:
      "Eliminate the busywork. Automate tasks like scheduling, publishing, and reporting so your team can focus on what really matters — creating value.",
    Icon: Sparkles,
    tag: "Automation",
    image: "/dashboard.png",
    features: ["Build once, automate forever", "Save hours every week", "Smart notifications"]
  },
  {
    id: 3,
    title: "Plan Smarter, Ship Faster",
    description:
      "Organize your content or product roadmap with clarity. Plan, prioritize, and track everything — from ideas to deadlines — all in one place.",
    Icon: Sparkles,
    tag: "Planning",
    image: "/dashboard.png",
    features: [
      "Visual drag-and-drop calendar",
      "Real-time team collaboration",
      "Move from plan to publish faster"
    ]
  }
];

const listVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2
      // delayChildren: 1
    }
  },
  initial: {
    transition: {
      staggerChildren: 0.2
      // delayChildren: -1
    }
  }
};

const listItemVariants = {
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  },
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export default function Features() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader>
        <SectionHeader.HeaderContent className="pb-6">
          <SectionHeader.Heading>Built for teams that scale</SectionHeader.Heading>
          <SectionHeader.Text>
            A growing team doesn&apos;t need to mean growing pains. <br /> We provide privacy-first
            solutions and the right tools for every step of your journey.
          </SectionHeader.Text>
        </SectionHeader.HeaderContent>

        <SectionHeader.Content>
          {steps.map((step, index) => (
            <Card key={step.id} className="mt-10 border-none bg-transparent shadow-none">
              <CardContent className="p-0">
                <div
                  className={cn(
                    "flex flex-col items-center",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="p-6 md:w-1/2 md:p-14">
                    <MotionDiv
                      viewport={{ once: true }}
                      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mb-4 flex items-center gap-3"
                    >
                      <step.Icon className="text-primary size-5" />

                      <p className="text-md text-muted-foreground font-semibold tracking-wider">
                        {step.tag}
                      </p>
                    </MotionDiv>

                    <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                      {step.title.split(" ").map((word, index) => (
                        <MotionSpan
                          key={index}
                          viewport={{ once: true }}
                          className="inline-block pr-2"
                          initial={{ opacity: 0, y: 20, rotate: 6, filter: "blur(10px)" }}
                          whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                          transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 }}
                        >
                          {word}
                        </MotionSpan>
                      ))}
                    </h2>

                    <p className="text-muted-foreground mb-8">{step.description}</p>

                    <MotionUl variants={listVariants} className="mb-8 space-y-4">
                      {step.features.map((feature, index) => (
                        <MotionLi
                          key={index}
                          initial="initial"
                          whileInView="animate"
                          variants={listItemVariants}
                          viewport={{ once: true }}
                          className="flex items-center gap-3"
                        >
                          <span className="bg-primary/10 rounded-md p-2">
                            <CheckCircle className="text-primary size-4" />
                          </span>

                          <span className="text-muted-foreground font-medium">{feature}</span>
                        </MotionLi>
                      ))}
                    </MotionUl>
                  </div>

                  <div className="p-6 md:w-1/2">
                    <Rotate>
                      <div className="before:border-border after:border-border relative p-1 before:absolute before:inset-0 before:scale-x-110 before:border-y after:absolute after:inset-0 after:scale-y-110 after:border-x">
                        <Image src={step.image} alt={step.title} width={1203} height={753} />
                      </div>
                    </Rotate>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </SectionHeader.Content>
      </SectionHeader>
    </MotionDiv>
  );
}
