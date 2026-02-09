"use client";

import Image from "next/image";

import { Marquee } from "@/components/marquee";
import { SectionHeader } from "@/components/section-headers";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  img?: string;
  username: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    id: "1",
    text: "This product has completely transformed our workflow. **The efficiency gains are remarkable** and our team productivity has increased by 30%.",
    name: "Sarah Chen",
    username: "@sarah_chen"
  },
  {
    id: "2",
    text: "I was skeptical at first, but after implementing this solution, our conversion rates doubled within the first month.",
    name: "Alex Rivera",
    username: "@alex_rivera",
    img: "/avatars/avatar-1.jpg"
  },
  {
    id: "3",
    text: "The customer support team is exceptional. They helped us **customize everything to our specific needs.**",
    name: "Michael Chen",
    username: "@michael_chen",
    img: "/avatars/avatar-2.jpg"
  },
  {
    id: "4",
    text: "We've tried many similar products, but this one stands out for its **intuitive interface and powerful features**.",
    name: "Sophia Martinez",
    username: "@sophia_martinez",
    img: "/avatars/avatar-3.jpg"
  },
  {
    id: "5",
    text: "The ROI we've seen is incredible. This product paid for itself within the first quarter of use.",
    name: "David Williams",
    username: "@david_williams",
    img: "/avatars/avatar-4.jpg"
  },
  {
    id: "6",
    text: "Implementation was seamless and the **learning curve was minimal**. Our entire team was up and running in days.",
    name: "Emma Rodriguez",
    username: "@emma_rodriguez",
    img: "/avatars/avatar-6.jpg"
  }
];

const testimonialsRow2: Testimonial[] = [
  {
    id: "7",
    text: "This solution has helped us reduce errors by **45% and streamline our entire approval process**.",
    name: "James Wilson",
    username: "@james_wilson"
  },
  {
    id: "8",
    text: "**The analytics capabilities have given us insights we never had before**, helping us make data-driven decisions.",
    name: "Olivia Garcia",
    username: "@olivia_garcia",
    img: "/avatars/avatar-5.jpg"
  },
  {
    id: "9",
    text: "We've been able to scale our operations without adding headcount thanks to the automation features.",
    name: "Robert Kim",
    username: "@robert_kim",
    img: "/avatars/avatar-2.jpg"
  },
  {
    id: "10",
    text: "The customization options are extensive. We've been able to tailor everything to match our exact requirements.",
    name: "Jennifer Patel",
    username: "@jennifer_patel",
    img: "/avatars/avatar-7.jpg"
  },
  {
    id: "11",
    text: "Our clients have noticed the **improvement in our service delivery** since we implemented this product.",
    name: "Thomas Brown",
    username: "@thomas_brown",
    img: "/avatars/avatar-1.jpg"
  },
  {
    id: "12",
    text: "The security features give us peace of mind when **handling sensitive customer information**.",
    name: "Sarah Martinez",
    username: "@sarah_martinez",
    img: "/avatars/avatar-3.jpg"
  }
];

export default function WallOfLove() {
  return (
    <SectionHeader id="wall-of-love">
      <SectionHeader.HeaderContent>
        <SectionHeader.Heading>What our customers are saying</SectionHeader.Heading>
        <SectionHeader.Text>
          We're proud to have a community of happy customers who love using our product.
        </SectionHeader.Text>
      </SectionHeader.HeaderContent>

      <SectionHeader.Content>
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-lg">
          <Marquee pauseOnHover>
            {testimonialsRow1.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover>
            {testimonialsRow2.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>

          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l" />
        </div>
      </SectionHeader.Content>
    </SectionHeader>
  );
}

interface AvatarProps {
  img?: string;
  alt: string;
}

function Avatar({ img, alt }: AvatarProps) {
  if (img) {
    return (
      <div className="size-9">
        <Image
          src={img}
          alt={alt}
          width={40}
          height={40}
          loading="lazy"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-lg font-bold">
      {alt.charAt(0).toUpperCase()}
    </div>
  );
}

function formatHighlightedText(text: string) {
  if (!text.includes("**")) {
    return <p className="text-muted-foreground">{text}</p>;
  }

  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <p className="text-muted-foreground">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={i} className="bg-primary/90 px-1 font-medium text-white">
              {part.slice(2, -2)}
            </span>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

interface ReviewCardProps extends Testimonial {}

function ReviewCard({ img, name, username, text }: ReviewCardProps) {
  return (
    <figure className="bg-card text-card-foreground relative w-72 cursor-pointer overflow-hidden rounded-xl border p-4">
      <div className="flex flex-row items-center gap-2">
        <Avatar img={img} alt={name} />

        <div className="flex flex-col">
          <h3 className="text-foreground font-bold">{name}</h3>
          <span className="text-muted-foreground block text-sm">{username}</span>
        </div>
      </div>

      <blockquote className="mt-2 text-sm">{formatHighlightedText(text)}</blockquote>
    </figure>
  );
}
