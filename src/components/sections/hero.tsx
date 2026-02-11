import { BookOpen, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Maker } from "@/components/maker";
import { MotionDiv, MotionH1, MotionParagraph } from "@/components/motion-elements";
import { SectionHeader } from "@/components/section-headers";
import { TypingEffect } from "@/components/typing-effect";
import { Button } from "@/components/ui/button";

import dashboard from "@/public/dashboard.png";

export default function Hero() {
  return (
    <SectionHeader className="pt-16 md:pt-24">
      <SectionHeader.Content className="mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-3 flex justify-center"
        >
          <Link
            className="text-foreground bg-primary/5 border-primary/20 hover:bg-primary/10 flex items-center gap-2 truncate rounded-full border px-1 py-1 pr-3 text-left text-xs transition-colors"
            href="/"
          >
            <span className="bg-primary text-primary-foreground block truncate rounded-full px-1.5 py-0.5 font-medium">
              📣 Announcement
            </span>{" "}
            Introducing UrbanIQ – AI Real Estate Intelligence
          </Link>
        </MotionDiv>

        <MotionH1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-4 text-4xl leading-[1.05] font-light tracking-tight sm:text-5xl md:text-6xl lg:text-[72px]"
        >
          <span className="block font-semibold">
            UrbanIQ
          </span>
          <span className="block text-primary font-light tracking-tight">
            AI-powered real estate intelligence
          </span>
        </MotionH1>

        <MotionParagraph
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-muted-foreground mb-6 max-w-2xl text-base md:text-lg leading-relaxed"
        >
          Analyze property value, detect legal risks, and prioritize high-intent sellers in seconds.
          UrbanIQ combines artificial intelligence, market data, and legal intelligence into one
          decision engine built for real estate professionals.
        </MotionParagraph>

        <MotionDiv
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link target="_blank" href="https://saas-pilot-docs.vercel.app" passHref>
            <Button
              variant="secondary"
              className="group w-full px-8! py-6 text-base font-semibold transition-all duration-300 hover:shadow-lg sm:w-auto"
            >
              <BookOpen
                strokeWidth={2}
                className="size-4 transition-transform duration-300 group-hover:scale-110"
              />
              Platform Overview
            </Button>
          </Link>

          <Link href="#pricing" passHref>
            <Button className="group from-primary hover:from-primary w-full bg-linear-to-r to-purple-600 px-8! py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:to-purple-700 hover:shadow-xl sm:w-auto">
              <Zap
                strokeWidth={2}
                className="size-4 transition-transform duration-300 group-hover:scale-110"
              />
              Request Demo
            </Button>
          </Link>
        </MotionDiv>

        <div className="mt-10 mb-16">
          <Maker />
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-card/50 dark:shadow-foreground/10mx-auto max-w-5xl overflow-hidden rounded-2xl border mask-b-from-3 p-2 shadow-lg"
        >
          <Image
            priority
            width={1200}
            height={1200}
            src={dashboard}
            className="rounded-xl"
            alt="UrbanIQ AI Real Estate Dashboard Preview"
          />
        </MotionDiv>
      </SectionHeader.Content>
    </SectionHeader>
  );
}
