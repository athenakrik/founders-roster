import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-black px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-sm font-semibold tracking-tight hover:no-underline">
        Founders Roster
      </Link>
      <nav className="flex gap-6 text-sm">
        <Link href="/roster" className="hover:underline">Browse</Link>
        <Link href="/submit" className="hover:underline">Submit Profile</Link>
      </nav>
    </header>
  );
}
