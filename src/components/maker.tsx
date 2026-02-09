import Image from "next/image";
import { MotionDiv } from "./motion-elements";

const makers = [
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
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: {
    x: 10,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1
  }
};

export function Maker() {
  return (
    <MotionDiv
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex items-center space-x-3"
    >
      <div className="flex -space-x-3">
        {makers.map((maker) => (
          <MotionDiv
            variants={itemVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative size-9 overflow-hidden rounded-full border-2 bg-transparent"
            key={maker.id}
          >
            <Image fill src={maker.avatar} alt={maker.name} />
          </MotionDiv>
        ))}
      </div>

      <MotionDiv
        variants={itemVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col gap-1"
      >
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-yellow-500"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
            </svg>
          ))}
        </div>

        <p className="text-muted-foreground/80 text-sm font-semibold">
          Loved by <span className="text-muted-foreground font-bold">20+</span> makers
        </p>
      </MotionDiv>
    </MotionDiv>
  );
}
