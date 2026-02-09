import Link from "next/link";

import { MotionAnchor, MotionDiv, MotionLi, MotionParagraph } from "@/components/motion-elements";
import { socialIcons } from "@/components/social-icons";

const LINKS = {
  product: [
    { name: "Features", url: "#features" },
    { name: "Pricing", url: "#pricing" },
    { name: "API & Integrations", url: "#api" },
    { name: "Roadmap", url: "#roadmap" }
  ],
  company: [
    { name: "About UrbanIQ", url: "#about" },
    { name: "Blog", url: "/blogs" },
    { name: "Partners", url: "#partners" },
    { name: "Contact", url: "/contact" }
  ],
  support: [
    { name: "Help Center", url: "#help" },
    { name: "Documentation", url: "#docs" },
    { name: "System Status", url: "#status" },
    { name: "Security & RGPD", url: "#security" }
  ]
};

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 pt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <MotionDiv
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
          >
            <h3 className="text-foreground mb-4 text-2xl font-bold">UrbanIQ</h3>
            <p className="text-foreground/70 mb-6 max-w-md text-sm">
              UrbanIQ is an AI-powered real estate intelligence platform for property valuation,
              legal analysis, lead qualification, and decision automation — built revealed for
              professionals, agencies, and investors.
            </p>

            <div className="flex gap-2">
              <SocialLink id={1} title="X" href="https://x.com" icon={socialIcons.x("size-4")} />
              <SocialLink
                id={2}
                title="LinkedIn"
                href="https://linkedin.com"
                icon={socialIcons.linkedin("size-4")}
              />
              <SocialLink
                id={3}
                title="GitHub"
                href="https://github.com"
                icon={socialIcons.github("size-4")} />
            </div>
          </MotionDiv>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:max-w-2xl">
            <LinksWidget id={1} title="Product" links={LINKS.product} />
            <LinksWidget id={2} title="Company" links={LINKS.company} />
            <LinksWidget id={3} title="Support" links={LINKS.support} />
          </div>
        </div>

        <div className="border-border mt-10 border-t py-6 text-center">
          <MotionParagraph
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
            className="text-foreground/60 text-sm"
          >
            © {new Date().getFullYear()} UrbanIQ. All rights reserved.
          </MotionParagraph>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  id,
  href,
  icon,
  title
}: {
  id: number;
  href: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <MotionAnchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary flex size-8 items-center justify-center rounded-md text-white transition-colors"
      viewport={{ once: true }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: id * 0.1 }}
    >
      {icon}
      <span className="sr-only">{title}</span>
    </MotionAnchor>
  );
}

function LinksWidget({
  id,
  title,
  links
}: {
  id: number;
  title: string;
  links: { name: string; url: string }[];
}) {
  return (
    <MotionDiv
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: id * 0.15 }}
    >
      <h4 className="mb-4 text-sm font-medium tracking-wide">{title}</h4>

      <ul className="space-y-3">
        {links.map((link) => (
          <MotionLi
            key={link.name}
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: id * 0.15 + 0.1 }}
          >
            <Link
              href={link.url}
              className="text-foreground/70 text-sm underline-offset-2 hover:underline"
            >
              {link.name}
            </Link>
          </MotionLi>
        ))}
      </ul>
    </MotionDiv>
  );
}
