import { Zap } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Zap className="text-primary size-5" />
      <span className="text-[22px] font-bold">
        Saas<span className="text-primary">Pilot</span>
      </span>
    </Link>
  );
}
