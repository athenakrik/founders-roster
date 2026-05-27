import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import RosterClient from "@/components/RosterClient";
import { Founder } from "@/lib/types";

export const metadata = {
  title: "Roster — Founders Roster",
  description: "Browse founders building before they're on everyone's radar.",
};

export default async function RosterPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("founders")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching founders:", error.message);
  }

  const founders: Founder[] = data ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="border-b border-black px-6 py-6">
        <h1 className="text-2xl font-semibold tracking-tight">The Roster</h1>
        <p className="text-sm text-gray-500 mt-1">
          Founders building before they&apos;re on everyone&apos;s radar.
        </p>
      </div>

      <main className="flex-1">
        <RosterClient founders={founders} />
      </main>

      <footer className="border-t border-black px-6 py-4 text-xs text-gray-500 flex justify-between">
        <span>Founders Roster</span>
        <Link href="/submit">Submit a profile</Link>
      </footer>
    </div>
  );
}
