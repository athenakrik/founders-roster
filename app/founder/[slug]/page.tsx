import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import { Founder } from "@/lib/types";
import { formatRaised, formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("founders")
    .select("name, headline, company_name")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (!data) return { title: "Founder — Founders Roster" };

  return {
    title: `${data.name} — Founders Roster`,
    description: data.headline ?? `${data.name} on Founders Roster`,
  };
}

export default async function FounderPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("founders")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error || !data) notFound();

  const founder = data as Founder;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 px-6 py-12 max-w-3xl mx-auto w-full">
        <div className="mb-2">
          <Link href="/roster" className="text-xs text-gray-500 hover:underline">
            Back to Roster
          </Link>
        </div>

        {/* Name + headline */}
        <div className="border-b border-black pb-8 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">{founder.name}</h1>
          {founder.headline && (
            <p className="text-base text-gray-700">{founder.headline}</p>
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          {/* Left: bio + cap table */}
          <div>
            {founder.bio && (
              <section className="mb-8">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">About</h2>
                <p className="text-sm leading-relaxed text-gray-800">{founder.bio}</p>
              </section>
            )}

            {founder.cap_table && founder.cap_table.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Investors</h2>
                <ul className="space-y-1">
                  {founder.cap_table.map((investor, i) => (
                    <li key={i} className="text-sm">{investor}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right: meta */}
          <div className="space-y-6">
            {founder.company_name && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Company</p>
                {founder.company_website ? (
                  <a
                    href={founder.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline"
                  >
                    {founder.company_name}
                  </a>
                ) : (
                  <p className="text-sm">{founder.company_name}</p>
                )}
              </div>
            )}

            {founder.sector && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Sector</p>
                <p className="text-sm">{founder.sector}</p>
              </div>
            )}

            {founder.stage && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Stage</p>
                <p className="text-sm">{founder.stage}</p>
              </div>
            )}

            {founder.amount_raised != null && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Raised</p>
                <p className="text-sm">{formatRaised(founder.amount_raised)}</p>
              </div>
            )}

            {(founder.city || founder.country) && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Location</p>
                <p className="text-sm">
                  {[founder.city, founder.country].filter(Boolean).join(", ")}
                </p>
              </div>
            )}

            {(founder.education_school || founder.education_degree) && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Education</p>
                <p className="text-sm">
                  {[founder.education_degree, founder.education_school].filter(Boolean).join(", ")}
                </p>
              </div>
            )}

            {(founder.x_url || founder.linkedin_url) && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Links</p>
                <div className="space-y-1">
                  {founder.x_url && (
                    <a
                      href={founder.x_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm underline"
                    >
                      X / Twitter
                    </a>
                  )}
                  {founder.linkedin_url && (
                    <a
                      href={founder.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm underline"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Added</p>
              <p className="text-sm">{formatDate(founder.created_at)}</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-black px-6 py-4 text-xs text-gray-500 flex justify-between">
        <Link href="/roster">Back to Roster</Link>
        <span>Founders Roster</span>
      </footer>
    </div>
  );
}
