import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
    >
      <Image
        src="/logo.png"
        alt="UrbanIQ Logo"
        width={26}
        height={26}
        priority
        className="object-contain"
      />
      <span className="text-[20px] font-medium tracking-[-0.02em]">
        Urban<span className="text-primary font-semibold">IQ</span>
      </span>
    </Link>
  );
}
