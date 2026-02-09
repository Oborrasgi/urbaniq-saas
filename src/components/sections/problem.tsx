import { MotionDiv } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";
import { Accessibility, Lightbulb, Zap, ZoomIn } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "Blazing Performance",
    description:
      "We help you deliver lightning-fast load times, optimized APIs, and edge-first deployments."
  },
  {
    icon: Lightbulb,
    title: "Built-In Innovation",
    description: "Stay ahead with AI scaffolding, rapid prototyping that evolve with your SaaS."
  },
  {
    title: "Quality First",
    description: "Scale code quality with automated tests, type safety, and monitoring",
    icon: ZoomIn
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description:
      "Accessible UI components with WCAG compliance and semantic best practices built-in."
  }
];

export default function Problem() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader>
        <SectionHeader.HeaderContent>
          <SectionHeader.Heading>Challenges we address</SectionHeader.Heading>
          <SectionHeader.Text>
            We understand the challenges you face when building a SaaS product. <br /> We've built a
            platform that helps you build your SaaS product faster and easier.
          </SectionHeader.Text>
        </SectionHeader.HeaderContent>

        <SectionHeader.Content>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {problems.map((feature, index) => (
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: true }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 * index }}
                key={index}
                className="relative flex items-center gap-4 rounded-lg border-dashed md:block md:border-l md:p-5"
              >
                <span className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-md md:mb-8 md:size-12">
                  <feature.icon className="text-primary size-5 md:size-6" />
                </span>

                <div>
                  <h3 className="text-lg font-semibold md:text-xl">
                    {feature.title}
                    <span className="bg-primary absolute -left-px hidden h-6 w-px md:inline-block" />
                  </h3>

                  <p className="text-muted-foreground mt-2 text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </SectionHeader.Content>
      </SectionHeader>
    </MotionDiv>
  );
}
