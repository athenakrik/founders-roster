export type Sector =
  | "Research Lab"
  | "Infrastructure"
  | "Data"
  | "Dev Tools"
  | "Healthtech"
  | "Biotech"
  | "Fintech"
  | "Consumer"
  | "Climate"
  | "Defense"
  | "Proptech"
  | "Security"
  | "Space"
  | "Other";

export type Stage =
  | "Pre-Seed"
  | "Seed"
  | "Series A"
  | "Series B"
  | "Series C"
  | "Series D+";

export type FounderStatus = "pending" | "approved" | "rejected";

export interface Founder {
  id: string;
  slug: string;
  name: string;
  headline: string | null;
  bio: string | null;
  education_school: string | null;
  education_degree: string | null;
  city: string | null;
  country: string | null;
  company_name: string | null;
  company_website: string | null;
  sector: Sector | null;
  stage: Stage | null;
  amount_raised: number | null;
  x_url: string | null;
  linkedin_url: string | null;
  cap_table: string[] | null;
  status: FounderStatus;
  manually_added: boolean;
  created_at: string;
}

export const SECTORS: Sector[] = [
  "Research Lab",
  "Infrastructure",
  "Data",
  "Dev Tools",
  "Healthtech",
  "Biotech",
  "Fintech",
  "Consumer",
  "Climate",
  "Defense",
  "Proptech",
  "Security",
  "Space",
  "Other",
];

export const STAGES: Stage[] = [
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Series D+",
];
