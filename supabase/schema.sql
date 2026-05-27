-- Founders Roster — Supabase schema
-- Run this in the Supabase SQL editor to set up your database.

create extension if not exists "pgcrypto";

create table if not exists founders (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,

  -- Personal
  name              text not null,
  headline          text,
  bio               text,
  education_school  text,
  education_degree  text,
  city              text,
  country           text,

  -- Company
  company_name      text,
  company_website   text,
  sector            text check (sector in (
    'AI Labs', 'Infrastructure', 'Data', 'Healthtech',
    'Robotics', 'Fintech', 'Consumer', 'Climate', 'Other'
  )),
  stage             text check (stage in (
    'Pre-Seed', 'Seed', 'Series A', 'Series B',
    'Series C', 'Series D+'
  )),
  amount_raised     bigint,

  -- Links
  x_url             text,
  linkedin_url      text,

  -- Cap table
  cap_table         text[],

  -- Admin
  status            text not null default 'pending'
                    check (status in ('pending', 'approved', 'rejected')),
  manually_added    boolean not null default false,
  created_at        timestamptz not null default now()
);

-- Index for fast filtering
create index if not exists founders_status_idx on founders(status);
create index if not exists founders_sector_idx on founders(sector);
create index if not exists founders_stage_idx on founders(stage);

-- Row-level security
alter table founders enable row level security;

-- Anyone can read approved founders
create policy "Public can read approved founders"
  on founders for select
  using (status = 'approved');

-- Anyone can insert (submit form) — inserts always land as pending
create policy "Public can submit founders"
  on founders for insert
  with check (status = 'pending' and manually_added = false);

-- Service role key bypasses RLS (used by admin actions)
