import Image from "next/image";
import { MotionDiv } from "./motion-elements";

interface MakerUser {
  id: number;
  name: string;
  avatar: string;
}

const makers: MakerUser[] = [
  { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/100?img=7" },
  { id: 2, name: "Jane Doe", avatar: "https://i.pravatar.cc/100?img=8" },
  { id: 3, name: "John Smith", avatar: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Jane Smith", avatar: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Maya Johnson", avatar: "https://i.pravatar.cc/100?img=5" }
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { y: 6, opacity: 0 },
  animate: { y: 0, opacity: 1 }
};

export function Maker() {
  return (
    <MotionDiv
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex items-center gap-4"
    >
      {/* Avatar stack */}
      <div className="flex -space-x-3">
        {makers.map((maker) => (
          <MotionDiv
            key={maker.id}
            variants={itemVariants}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative size-10 overflow-hidden rounded-full border-2 border-background shadow-sm ring-1 ring-border/40"
          >
            <Image
              fill
              src={maker.avatar}
              alt={maker.name}
              sizes="40px"
              className="object-cover"
            />
          </MotionDiv>
        ))}

        {/* + indicator */}
        <MotionDiv
          variants={itemVariants}
          transition={{ duration: 0.25 }}
          className="relative flex size-10 items-center justify-center rounded-full border-2 border-dashed border-border bg-muted text-xs font-semibold text-muted-foreground"
        >
          +15
        </MotionDiv>
      </div>

      {/* Rating + text */}
      <MotionDiv
        variants={itemVariants}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-1"
      >
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-amber-500"
            >
              <path d="M12 17.75l-5.193 2.73 1-5.823-4.235-4.128 5.854-.85L12 4.5l2.574 5.179 5.854.85-4.235 4.128 1 5.823z" />
            </svg>
          ))}
          <span className="text-sm font-semibold">4.9/5</span>
        </div>

        <p className="text-muted-foreground text-sm">
          Trusted by <span className="font-semibold text-foreground">20+ property owners</span>
        </p>
      </MotionDiv>
    </MotionDiv>
  );
}
