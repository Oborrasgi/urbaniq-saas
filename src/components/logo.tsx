import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="UrbanIQ Logo"
        width={32}
        height={32}
        priority
      />
      <span className="text-[22px] font-semibold tracking-tight">
        Urban<span className="text-primary">IQ</span>
      </span>
    </Link>
  );
}
