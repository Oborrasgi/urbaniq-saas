import Link from "next/link";

export function AuthFooter() {
  return (
    <footer className="text-muted-foreground container max-w-6xl py-6 text-center text-xs">
      <Link href="/">© {new Date().getFullYear()} UrbanIQ</Link>
      <span className="mx-1 opacity-50"> | </span>
      <Link href="/privacy-policy">Privacy Policy</Link>
      <span className="mx-1 opacity-50"> | </span>
      <Link href="/terms">Terms & Conditions</Link>
    </footer>
  );
}
