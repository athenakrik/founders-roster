# Founders Roster

A discovery database of founders building before they're on everyone's radar.

**Stack:** Next.js (App Router) · Supabase · Vercel  
**Domain:** foundersroster.com

---

## Local Setup

### 1. Clone and install

```bash
git clone <your-repo>
cd founders-roster
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run the contents of `supabase/schema.sql` to create the `founders` table with row-level security policies.
3. Copy your project credentials from **Project Settings → API**.

### 3. Configure environment variables

Copy `.env.local` and fill in your values:

```bash
cp .env.local .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSWORD=choose_a_strong_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- `NEXT_PUBLIC_SUPABASE_URL` — found in Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — found in Project Settings → API → Project API keys → `anon public`
- `SUPABASE_SERVICE_ROLE_KEY` — found in Project Settings → API → Project API keys → `service_role` (keep this secret — only used server-side)
- `ADMIN_PASSWORD` — a password you choose for the `/admin` page

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/roster` | Browse all approved founders with filters |
| `/founder/[slug]` | Individual founder profile |
| `/submit` | Public submission form |
| `/admin` | Password-protected admin panel |

---

## Admin Panel

Visit `/admin` and enter your `ADMIN_PASSWORD`.

- **Approve** a pending submission to publish it to the roster
- **Reject** a submission to remove it from the queue
- **Add founder manually** to publish directly (bypasses the review queue)

---

## Deploy to Vercel

1. Push your repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add the following environment variables in Vercel Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL` (set to `https://foundersroster.com`)
4. Deploy.

---

## Supabase Row-Level Security

The schema sets up two public policies:

- **Read:** Anyone can read founders with `status = 'approved'`
- **Insert:** Anyone can insert a founder with `status = 'pending'` and `manually_added = false`

Admin operations (approve, reject, manual add) use the `SUPABASE_SERVICE_ROLE_KEY` which bypasses RLS entirely — this key is only used server-side in Server Actions.
