"use server";

import { createServiceClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { Sector, Stage } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function approveFounder(id: string) {
  const supabase = await createServiceClient();
  await supabase.from("founders").update({ status: "approved" }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/roster");
}

export async function rejectFounder(id: string) {
  const supabase = await createServiceClient();
  await supabase.from("founders").update({ status: "rejected" }).eq("id", id);
  revalidatePath("/admin");
}

export async function addFounderManually(formData: FormData) {
  const supabase = await createServiceClient();

  const name = (formData.get("name") as string).trim();
  const capTableRaw = (formData.get("cap_table") as string).trim();
  const capTable = capTableRaw
    ? capTableRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const amountRaw = formData.get("amount_raised") as string;

  const payload = {
    slug: slugify(name) + "-" + Math.random().toString(36).slice(2, 7),
    name,
    headline: (formData.get("headline") as string).trim() || null,
    bio: (formData.get("bio") as string).trim() || null,
    education_school: (formData.get("education_school") as string).trim() || null,
    education_degree: (formData.get("education_degree") as string).trim() || null,
    city: (formData.get("city") as string).trim() || null,
    country: (formData.get("country") as string).trim() || null,
    company_name: (formData.get("company_name") as string).trim() || null,
    company_website: (formData.get("company_website") as string).trim() || null,
    sector: (formData.get("sector") as Sector) || null,
    stage: (formData.get("stage") as Stage) || null,
    amount_raised: amountRaw ? Number(amountRaw) : null,
    x_url: (formData.get("x_url") as string).trim() || null,
    linkedin_url: (formData.get("linkedin_url") as string).trim() || null,
    cap_table: capTable.length > 0 ? capTable : null,
    status: "approved",
    manually_added: true,
  };

  const { error } = await supabase.from("founders").insert(payload);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/roster");
}
