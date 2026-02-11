import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
    >
      <Image
        src="/logo.png"
        alt="UrbanIQ Logo"
        width={64}
        height={64}
        priority
        className="object-contain"
      />

      <span className="text-[28px] font-semibold tracking-[-0.02em]">
        Urban<span className="text-primary font-bold">IQ</span>
      </span>
    </Link>
  );
}