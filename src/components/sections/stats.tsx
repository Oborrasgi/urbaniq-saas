import { MotionDiv } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";
import { Award, Globe, TrendingUp, Users } from "lucide-react";

const statVariants = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 30 }
};

const stats = [
  {
    id: 1,
    name: "Qualified Seller Leads",
    value: "+37%",
    icon: Users,
    description: "Increase in qualified owner leads in 90 days",
    trend: "+8%"
  },
  {
    id: 2,
    name: "AVM Accuracy",
    value: "92%",
    icon: TrendingUp,
    description: "Median valuation confidence range",
    trend: "+3%"
  },
  {
    id: 3,
    name: "Time Saved",
    value: "15h / week",
    icon: Globe,
    description: "Automation & AI-driven workflows",
    trend: "+5h"
  },
  {
    id: 4,
    name: "Conversion Rate",
    value: "2.4x",
    icon: Award,
    description: "Higher closing rate vs traditional funnel",
    trend: "+18%"
  }
];

export default function Stats() {
  return (
    <SectionHeader className="md:pb-36">
      <SectionHeader.HeaderContent>
        <SectionHeader.Heading>Real estate intelligence, measured in results</SectionHeader.Heading>
        <SectionHeader.Text>
          UrbanIQ transforms anonymous traffic into exclusive, qualified seller leads. Our AI scoring, legal validation and predictive intent models deliver measurable impact — not vanity metrics.
        </SectionHeader.Text>
      </SectionHeader.HeaderContent>

      <SectionHeader.Content>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;

            return (
              <MotionDiv
                key={stat.id}
                initial="initial"
                whileInView="animate"
                variants={statVariants}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 }}
              >
                <div className="group bg-card relative overflow-hidden rounded-lg border p-6 transition-all">
                  <div className="mb-6">
                    <div className="font-mono text-3xl font-bold tracking-tight">{stat.value}</div>
                    <p className="text-muted-foreground mt-1 text-sm">{stat.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="text-primary size-5" />
                      <span className="text-muted-foreground text-sm font-medium">{stat.name}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-green-600">
                      <TrendingUp className="size-3" />
                      <span>{stat.trend}</span>
                    </div>
                  </div>

                  {/* Decorative gradient */}
                  <div className="absolute inset-x-0 top-0 flex w-full justify-center">
                    <div className="w-3/4">
                      <div className="via-primary h-[2px] w-full bg-gradient-to-r from-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </SectionHeader.Content>
    </SectionHeader>
  );
}
