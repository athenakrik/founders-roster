import Link from "next/link";

function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <line x1="13" y1="16" x2="19" y2="16" stroke="black" strokeWidth="2"/>
      <circle cx="8" cy="16" r="4" fill="none" stroke="black" strokeWidth="2"/>
      <circle cx="24" cy="16" r="5" fill="black"/>
    </svg>
  );
}

export default function Nav() {
  return (
    <header className="border-b border-black px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5 hover:no-underline">
        <Logo />
        <span className="text-sm font-semibold tracking-tight">Founders Roster</span>
      </Link>
      <nav className="flex gap-6 text-sm">
        <Link href="/roster" className="hover:underline">Browse</Link>
        <Link href="/submit" className="hover:underline">Submit Profile</Link>
      </nav>
    </header>
  );
}
