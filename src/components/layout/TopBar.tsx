import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function TopBar({ trail }: { trail?: React.ReactNode }) {
  return (
    <header className="nav-bar">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-3 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="inline-block h-6 w-6 rounded-lg bg-lime" />
            <span className="text-[14.5px] font-bold tracking-tight">Atlas</span>
          </Link>
          {trail && (
            <div className="ml-3 flex min-w-0 items-center gap-2 text-[13px] text-ink-3">
              {trail}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
