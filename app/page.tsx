import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-black px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight">Founders Roster</span>
        <nav className="flex gap-6 text-sm">
          <Link href="/roster" className="hover:underline">Browse</Link>
          <Link href="/submit" className="hover:underline">Submit Profile</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 py-24 max-w-2xl mx-auto w-full">
        <p className="text-xs uppercase tracking-widest mb-8 text-gray-500">
          foundersroster.com
        </p>
        <h1 className="text-4xl font-semibold tracking-tight leading-tight mb-6">
          Founders Roster
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 mb-12 max-w-xl">
          A discovery database of founders building before they&apos;re on
          everyone&apos;s radar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/roster"
            className="inline-block border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors text-center"
          >
            Browse the Roster
          </Link>
          <Link
            href="/submit"
            className="inline-block border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors text-center"
          >
            Submit Your Profile
          </Link>
        </div>
      </main>

      <footer className="border-t border-black px-6 py-4 flex items-center justify-between text-xs text-gray-500">
        <span>Founders Roster</span>
        <span>foundersroster.com</span>
      </footer>
    </div>
  );
}
