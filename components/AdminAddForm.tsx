"use client";

import { useState, useTransition, useRef } from "react";
import { addFounderManually } from "@/app/admin/actions";
import { SECTORS, STAGES } from "@/lib/types";

const inputClass =
  "w-full border border-black px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400";
const labelClass = "block text-xs uppercase tracking-widest text-gray-500 mb-1";
const selectClass =
  "w-full border border-black px-3 py-2 text-sm bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-black";

export default function AdminAddForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await addFounderManually(formData);
        setSuccess(true);
        formRef.current?.reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add founder.");
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="add-name">Name *</label>
          <input id="add-name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-headline">Headline</label>
          <input id="add-headline" name="headline" type="text" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-company">Company name</label>
          <input id="add-company" name="company_name" type="text" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-website">Company website</label>
          <input id="add-website" name="company_website" type="url" placeholder="https://" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-sector">Sector</label>
          <select id="add-sector" name="sector" className={selectClass}>
            <option value="">Select a sector</option>
            {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="add-stage">Stage</label>
          <select id="add-stage" name="stage" className={selectClass}>
            <option value="">Select a stage</option>
            {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="add-amount">Amount raised (USD)</label>
          <input id="add-amount" name="amount_raised" type="number" min="0" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-city">City</label>
          <input id="add-city" name="city" type="text" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-country">Country</label>
          <input id="add-country" name="country" type="text" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-school">School</label>
          <input id="add-school" name="education_school" type="text" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-degree">Degree</label>
          <input id="add-degree" name="education_degree" type="text" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-x">X / Twitter URL</label>
          <input id="add-x" name="x_url" type="url" placeholder="https://x.com/username" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="add-linkedin">LinkedIn URL</label>
          <input id="add-linkedin" name="linkedin_url" type="url" placeholder="https://linkedin.com/in/username" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="add-bio">Bio</label>
        <textarea id="add-bio" name="bio" rows={3} className={inputClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="add-cap-table">Investors (comma-separated)</label>
        <input id="add-cap-table" name="cap_table" type="text" className={inputClass} />
      </div>

      {error && (
        <p className="text-sm border border-black px-3 py-2">Error: {error}</p>
      )}
      {success && (
        <p className="text-sm border border-black px-3 py-2">Founder added and published.</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="border border-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors disabled:opacity-50"
      >
        {isPending ? "Adding..." : "Add founder"}
      </button>
    </form>
  );
}
