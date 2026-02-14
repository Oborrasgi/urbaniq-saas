import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  showText = true,
  className = ""
}: LogoProps) {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64
  };

  const textSizeMap = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-[28px]"
  };

  return (
    <Link
      href="/"
      className={`flex items-center gap-3 transition-all duration-200 hover:opacity-80 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="UrbanIQ Logo"
        width={sizeMap[size]}
        height={sizeMap[size]}
        priority
        className="object-contain"
      />

      {showText && (
        <span className={`${textSizeMap[size]} font-semibold tracking-[-0.02em]`}>
          Urban<span className="text-primary font-bold">IQ</span>
        </span>
      )}
    </Link>
  );
}