"use client";

import { ArrowUpRight, Brain, CircleGauge, CodeXml, Rocket, Sparkles } from "lucide-react";

import { MotionDiv } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";
import { Card, CardContent } from "@/components/ui/card";

const featureItemVariants = {
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.1 }
  }),
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export default function BentoGrid() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader>
        <SectionHeader.HeaderContent>
          <SectionHeader.Heading>The best way to build your SaaS</SectionHeader.Heading>
          <SectionHeader.Text>
            We&apos;ve built a suite of products for some of the world&apos;s largest companies.
          </SectionHeader.Text>
        </SectionHeader.HeaderContent>

        <SectionHeader.Content>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 - Main Feature */}
            <MotionDiv
              custom={1}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
              className="col-span-1 lg:col-span-2"
            >
              <Card className="group border-primary/10 bg-background/60 hover:shadow-primary/5 h-full overflow-visible transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-primary text-primary-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <Rocket className="size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex flex-col pt-6">
                    <h3 className="group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                      Edge-Powered Performance
                    </h3>

                    <p className="text-muted-foreground mb-10">
                      Supercharge your app's performance with edge computing and real-time data
                      syncing. Deploy globally with
                      <span className="font-semibold"> blazing speed</span> and minimal latency —
                      built for scale from day one. Our proprietary quantum optimization algorithms
                      ensure
                      <span className="font-semibold"> 99.99% uptime</span> even during peak
                      traffic. Experience
                      <span className="font-semibold"> sub-100ms response times</span> across all
                      continents with our intelligent edge caching.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-muted-foreground text-sm font-medium">01</span>
                      <ArrowUpRight className="text-primary size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Feature 2 - Different from Feature 1 and Feature 3 */}
            <MotionDiv
              custom={2}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
            >
              <Card className="group from-primary/80 to-primary text-primary-foreground hover:shadow-primary/20 border-0 bg-linear-to-br transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-background text-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <Brain className="text-primary size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex h-full flex-col pt-6">
                    <h3 className="mb-3 text-2xl font-bold">AI-Driven Insights</h3>
                    <p className="text-primary-foreground/90 mb-6">
                      Make smarter product decisions using AI-powered dashboards. Track user
                      behavior, churn prediction, and feature adoption without complex setup or
                      third-party tools.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-primary-foreground/70 text-sm font-medium">02</span>
                      <ArrowUpRight className="text-background size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Feature 3 */}
            <MotionDiv
              custom={3}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <Card className="group border-primary/10 bg-background/60 hover:shadow-primary/5 h-full overflow-visible transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-primary text-primary-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <Sparkles className="size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex flex-col pt-6">
                    <h3 className="group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                      Polished UI Components
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      Deliver a frictionless, modern UI with pre-built, accessible components. Built
                      on top of Tailwind and React, so your design system stays consistent and easy
                      to extend.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-muted-foreground text-sm font-medium">03</span>
                      <ArrowUpRight className="text-primary size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Feature 4 - Different from Feature 3 */}
            <MotionDiv
              custom={4}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <Card className="group from-secondary/90 to-secondary text-secondary-foreground hover:shadow-secondary/20 h-full bg-linear-to-br transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-primary text-primary-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <CircleGauge className="size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex flex-col pt-6">
                    <h3 className="group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                      Launch Velocity Toolkit
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      Launch faster with boilerplates, CI/CD pipelines, and built-in testing. Focus
                      on features, not configuration — get your MVP to market in days, not weeks.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-muted-foreground text-sm font-medium">04</span>
                      <ArrowUpRight className="text-primary size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            {/* Feature 5 */}
            <MotionDiv
              custom={5}
              initial="initial"
              whileInView="animate"
              variants={featureItemVariants}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <Card className="group border-primary/10 bg-background/60 hover:shadow-primary/5 h-full overflow-visible transition-all duration-300 hover:shadow-lg">
                <CardContent className="h-full px-8 py-2">
                  <div className="bg-primary text-primary-foreground grid size-14 place-items-center rounded-xl p-3 shadow-lg">
                    <CodeXml className="size-6 transition-transform group-hover:scale-110" />
                  </div>

                  <div className="flex flex-col pt-6">
                    <h3 className="group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                      Secure by Design
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      Bank-grade security out of the box — with role-based access, encrypted data,
                      and seamless auth integrations (OAuth, SSO, JWT). Your users' trust, protected
                      by default.
                    </p>

                    <div className="flex items-end justify-between">
                      <span className="text-muted-foreground text-sm font-medium">05</span>
                      <ArrowUpRight className="text-primary size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          </div>
        </SectionHeader.Content>
      </SectionHeader>
    </MotionDiv>
  );
}
