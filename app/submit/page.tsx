import Nav from "@/components/Nav";
import SubmitForm from "@/components/SubmitForm";

export const metadata = {
  title: "Submit a Profile — Founders Roster",
  description: "Submit your founder profile to appear on the roster.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 px-6 py-12 max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">Submit Your Profile</h1>
          <p className="text-sm text-gray-600">
            Submit your information to be considered for the roster. All submissions are reviewed
            before being published.
          </p>
        </div>

        <SubmitForm />
      </main>

      <footer className="border-t border-black px-6 py-4 text-xs text-gray-500">
        <span>Founders Roster</span>
      </footer>
    </div>
  );
}
