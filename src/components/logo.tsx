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
        width={34}
        height={34}
        priority
        className="object-contain"
      />
      <span className="text-[22px] font-semibold tracking-tight">
        Urban<span className="text-primary">IQ</span>
      </span>
    </Link>
  );
}
