"use client";

import { Check, Star, X } from "lucide-react";

import { PurchaseButton } from "@/components/billing";
import { MotionDiv } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";
import { appConfig } from "@/config";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  isIncluded?: boolean;
}

interface Plan {
  title: string;
  price: number;
  priceId: string;
  description: string;
  priceTagline: string;
  recommended: boolean;
  features: Feature[];
}

const plans: Plan[] = [
  {
    recommended: false,
    description: "Perfect for small projects",
    priceTagline: "lifetime deal",
    ...appConfig.stripe.plans[0],
    features: [
      { title: "NextJS boilerplate" },
      { title: "Resend email service" },
      { title: "Stripe payment service" },
      { title: "Social Login / Magic Link" },
      { title: "Open AI integration" },
      { title: "Cloudinary image service" },
      { title: "Other Ui tailwind library", isIncluded: false },
      { title: "No updates", isIncluded: false },
      { title: "Early access to features", isIncluded: false },
      { title: "Migration assistance", isIncluded: false }
    ]
  },

  {
    recommended: true,
    description: "Perfect for teams",
    priceTagline: "per month",
    ...appConfig.stripe.plans[1],
    features: [
      { title: "NextJS boilerplate" },
      { title: "Resend email service" },
      { title: "Stripe payment service" },
      { title: "Social Login / Magic Link" },
      { title: "Open AI integration" },
      { title: "Cloudinary image service" },
      { title: "Other Ui tailwind library", isIncluded: true },
      { title: "1 year free updates", isIncluded: true },
      { title: "Early access to features", isIncluded: false },
      { title: "Migration assistance", isIncluded: false }
    ]
  },

  {
    recommended: false,
    description: "Buy once, use forever",
    priceTagline: "once",
    ...appConfig.stripe.plans[2],
    features: [
      { title: "NextJS boilerplate" },
      { title: "Resend email service" },
      { title: "Stripe payment service" },
      { title: "Social Login / Magic Link" },
      { title: "Open AI integration" },
      { title: "Cloudinary image service" },
      { title: "Other Ui tailwind library" },
      { title: "Lifetime updates" },
      { title: "Early access to features" },
      { title: "Migration assistance" }
    ]
  }
];

const planVariants = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 30 }
};

export default function Pricing() {
  return (
    <div id="pricing">
      <SectionHeader>
        <SectionHeader.HeaderContent>
          <SectionHeader.Heading>Simple, transparent pricing</SectionHeader.Heading>
          <SectionHeader.Text>
            Start building your SaaS today with our flexible pricing options designed to scale with
            your business.
          </SectionHeader.Text>
        </SectionHeader.HeaderContent>

        <SectionHeader.Content>
          <section className="flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
            <Plans />
          </section>
        </SectionHeader.Content>
      </SectionHeader>
    </div>
  );
}

export function Plans() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
      {plans.map((plan: Plan, index) => (
        <MotionDiv
          key={index}
          initial="initial"
          whileInView="animate"
          variants={planVariants}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 }}
        >
          <PlanCard plan={plan} />
        </MotionDiv>
      ))}
    </div>
  );
}

export function DashboardPlans() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {plans.map((plan: Plan, index) => (
        <PlanCard key={index} plan={plan} />
      ))}
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex h-full flex-col justify-between rounded-2xl",
        plan.recommended ? "ring-primary relative ring-2" : "border"
      )}
    >
      {plan.recommended && (
        <div className="absolute top-[-13px] left-1/2 -translate-x-1/2 transform">
          <div className="bg-primary text-primary-foreground flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium tracking-wide">
            <Star size={14} />
            <span>Recommended</span>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className={cn("text-lg font-bold lg:text-2xl", plan.recommended && "text-primary")}>
          {plan.title}
        </h3>

        <p className="text-muted-foreground text-sm">{plan.description}</p>

        <div className="my-4">
          <div className="flex gap-1">
            <p className="text-5xl font-extrabold tracking-tight">${plan.price}</p>
            <div className="mb-[4px] flex flex-col justify-end">
              <p className="text-muted-foreground text-sm font-medium capitalize">
                / {plan.priceTagline}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          {plan.features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>

      <div className="px-6 pb-6">
        <PurchaseButton priceId={plan.priceId} />
      </div>
    </div>
  );
}

function FeatureItem({ title, isIncluded }: Feature) {
  const getIconAndStyle = () => {
    if (isIncluded === undefined) {
      return {
        icon: <Check className="text-primary mt-1" size={16} />,
        textClass: "text-foreground"
      };
    }

    if (isIncluded) {
      return {
        icon: <Check className="mt-1 text-green-600 dark:text-green-400" size={16} />,
        textClass: "text-green-600 dark:text-green-400"
      };
    }

    return {
      icon: <X className="mt-1 text-red-600 dark:text-red-400" size={16} />,
      textClass: "text-red-600 dark:text-red-400"
    };
  };

  const { icon, textClass } = getIconAndStyle();

  return (
    <div className="flex items-center gap-2 space-y-1 text-base leading-relaxed">
      {icon}
      <p className={cn("text-sm font-medium", textClass)}>{title}</p>
    </div>
  );
}
