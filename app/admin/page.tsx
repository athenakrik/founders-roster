import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase/server";
import { Founder } from "@/lib/types";
import AdminClient from "@/components/AdminClient";
import AdminAddForm from "@/components/AdminAddForm";
import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata = {
  title: "Admin — Founders Roster",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("admin_authed")?.value === "1";

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b border-black px-6 py-4">
          <span className="text-sm font-semibold tracking-tight">Founders Roster — Admin</span>
        </header>
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <h1 className="text-xl font-semibold mb-6">Admin Login</h1>
            <AdminLoginForm />
          </div>
        </main>
      </div>
    );
  }

  const supabase = await createServiceClient();

  const { data: pending } = await supabase
    .from("founders")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  const founders: Founder[] = pending ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-black px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight">Founders Roster — Admin</span>
        <form action="/admin/logout" method="POST">
          <button type="submit" className="text-xs underline">
            Logout
          </button>
        </form>
      </header>

      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">
        <section className="mb-12">
          <h2 className="text-lg font-semibold tracking-tight mb-1">
            Pending Submissions
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            {founders.length} pending {founders.length === 1 ? "submission" : "submissions"}
          </p>
          <AdminClient founders={founders} />
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight mb-1">Add Founder Manually</h2>
          <p className="text-xs text-gray-500 mb-6">
            Added founders are published immediately with status Approved.
          </p>
          <AdminAddForm />
        </section>
      </main>
    </div>
  );
}
