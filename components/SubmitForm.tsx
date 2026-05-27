"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SECTORS, STAGES, Sector, Stage } from "@/lib/types";
import { slugify } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-black px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400";
const labelClass = "block text-xs uppercase tracking-widest text-gray-500 mb-1";
const selectClass =
  "w-full border border-black px-3 py-2 text-sm bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-black";

export default function SubmitForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string).trim();
    const capTableRaw = (data.get("cap_table") as string).trim();
    const capTable = capTableRaw
      ? capTableRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const amountRaw = data.get("amount_raised") as string;

    const payload = {
      slug: slugify(name) + "-" + Math.random().toString(36).slice(2, 7),
      name,
      headline: (data.get("headline") as string).trim() || null,
      bio: (data.get("bio") as string).trim() || null,
      education_school: (data.get("education_school") as string).trim() || null,
      education_degree: (data.get("education_degree") as string).trim() || null,
      city: (data.get("city") as string).trim() || null,
      country: (data.get("country") as string).trim() || null,
      company_name: (data.get("company_name") as string).trim() || null,
      company_website: (data.get("company_website") as string).trim() || null,
      sector: (data.get("sector") as Sector) || null,
      stage: (data.get("stage") as Stage) || null,
      amount_raised: amountRaw ? Number(amountRaw) : null,
      x_url: (data.get("x_url") as string).trim() || null,
      linkedin_url: (data.get("linkedin_url") as string).trim() || null,
      cap_table: capTable.length > 0 ? capTable : null,
      status: "pending",
      manually_added: false,
    };

    const supabase = createClient();
    const { error } = await supabase.from("founders").insert(payload);

    if (error) {
      setFormState("error");
      setErrorMessage(error.message);
      return;
    }

    setFormState("success");
    form.reset();
  }

  if (formState === "success") {
    return (
      <div className="py-16 text-center">
        <p className="text-base font-medium mb-2">Submission received.</p>
        <p className="text-sm text-gray-600">
          We got your submission. If approved, your profile will appear on the roster.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal */}
      <fieldset>
        <legend className="text-xs uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-200 pb-2 w-full">
          Personal
        </legend>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="name">Name *</label>
            <input id="name" name="name" type="text" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="headline">Headline</label>
            <input
              id="headline"
              name="headline"
              type="text"
              placeholder="e.g. Building AI infrastructure for biotech"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="city">City</label>
            <input id="city" name="city" type="text" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="country">Country</label>
            <input id="country" name="country" type="text" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="education_school">School</label>
            <input id="education_school" name="education_school" type="text" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="education_degree">Degree</label>
            <input id="education_degree" name="education_degree" type="text" className={inputClass} />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClass} htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            placeholder="A brief description of your background and what you're building."
            className={inputClass}
          />
        </div>
      </fieldset>

      {/* Company */}
      <fieldset>
        <legend className="text-xs uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-200 pb-2 w-full">
          Company
        </legend>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="company_name">Company name</label>
            <input id="company_name" name="company_name" type="text" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="company_website">Company website</label>
            <input
              id="company_website"
              name="company_website"
              type="url"
              placeholder="https://"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="sector">Sector</label>
            <select id="sector" name="sector" className={selectClass}>
              <option value="">Select a sector</option>
              {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="stage">Stage</label>
            <select id="stage" name="stage" className={selectClass}>
              <option value="">Select a stage</option>
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="amount_raised">Amount raised (USD)</label>
            <input
              id="amount_raised"
              name="amount_raised"
              type="number"
              min="0"
              placeholder="e.g. 2500000"
              className={inputClass}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClass} htmlFor="cap_table">
            Investors / Cap table
          </label>
          <input
            id="cap_table"
            name="cap_table"
            type="text"
            placeholder="Comma-separated: Sequoia, Y Combinator, Founders Fund"
            className={inputClass}
          />
        </div>
      </fieldset>

      {/* Links */}
      <fieldset>
        <legend className="text-xs uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-200 pb-2 w-full">
          Links
        </legend>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="x_url">X / Twitter URL</label>
            <input
              id="x_url"
              name="x_url"
              type="url"
              placeholder="https://x.com/username"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="linkedin_url">LinkedIn URL</label>
            <input
              id="linkedin_url"
              name="linkedin_url"
              type="url"
              placeholder="https://linkedin.com/in/username"
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

      {formState === "error" && (
        <p className="text-sm border border-black px-3 py-2">
          Submission failed: {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? "Submitting..." : "Submit profile"}
      </button>
    </form>
  );
}
