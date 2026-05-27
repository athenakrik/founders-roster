"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Founder, Sector, Stage, SECTORS, STAGES } from "@/lib/types";
import { formatRaised } from "@/lib/utils";

interface Props {
  founders: Founder[];
}

export default function RosterClient({ founders }: Props) {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState<Sector | "">("");
  const [stage, setStage] = useState<Stage | "">("");
  const [minRaised, setMinRaised] = useState("");
  const [maxRaised, setMaxRaised] = useState("");

  const filtered = useMemo(() => {
    return founders.filter((f) => {
      if (search) {
        const q = search.toLowerCase();
        const nameMatch = f.name.toLowerCase().includes(q);
        const companyMatch = f.company_name?.toLowerCase().includes(q);
        if (!nameMatch && !companyMatch) return false;
      }
      if (sector && f.sector !== sector) return false;
      if (stage && f.stage !== stage) return false;
      if (minRaised && (f.amount_raised ?? 0) < Number(minRaised) * 1_000_000) return false;
      if (maxRaised && (f.amount_raised ?? 0) > Number(maxRaised) * 1_000_000) return false;
      return true;
    });
  }, [founders, search, sector, stage, minRaised, maxRaised]);

  const selectClass =
    "border border-black px-3 py-2 text-sm bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-black";
  const inputClass =
    "border border-black px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black";

  return (
    <div>
      {/* Filters */}
      <div className="border-b border-black px-6 py-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} w-full sm:w-64`}
        />
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value as Sector | "")}
          className={selectClass}
        >
          <option value="">All sectors</option>
          {SECTORS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value as Stage | "")}
          className={selectClass}
        >
          <option value="">All stages</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Raised ($M):</span>
          <input
            type="number"
            placeholder="Min"
            value={minRaised}
            onChange={(e) => setMinRaised(e.target.value)}
            className={`${inputClass} w-20`}
          />
          <span className="text-sm text-gray-500">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxRaised}
            onChange={(e) => setMaxRaised(e.target.value)}
            className={`${inputClass} w-20`}
          />
        </div>
        {(search || sector || stage || minRaised || maxRaised) && (
          <button
            onClick={() => {
              setSearch("");
              setSector("");
              setStage("");
              setMinRaised("");
              setMaxRaised("");
            }}
            className="text-sm underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="px-6 py-3 border-b border-black">
        <p className="text-xs text-gray-500">
          {filtered.length} {filtered.length === 1 ? "founder" : "founders"}
        </p>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm text-gray-500">No founders match your filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1.5fr_1.5fr] px-6 py-3 border-b border-black bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
            <span>Founder</span>
            <span>Company</span>
            <span>Sector</span>
            <span>Stage</span>
            <span>Location</span>
            <span>Raised</span>
          </div>
          {filtered.map((founder) => (
            <Link
              key={founder.id}
              href={`/founder/${founder.slug}`}
              className="block border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="px-6 py-4 md:grid md:grid-cols-[2fr_2fr_1.5fr_1.5fr_1.5fr_1.5fr] flex flex-col gap-1">
                <div>
                  <p className="text-sm font-medium">{founder.name}</p>
                  {founder.headline && (
                    <p className="text-xs text-gray-500 mt-0.5 md:hidden">{founder.headline}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm">{founder.company_name ?? "—"}</p>
                </div>
                <p className="text-sm text-gray-700">{founder.sector ?? "—"}</p>
                <p className="text-sm text-gray-700">{founder.stage ?? "—"}</p>
                <p className="text-sm text-gray-700">
                  {[founder.city, founder.country].filter(Boolean).join(", ") || "—"}
                </p>
                <p className="text-sm text-gray-700">{formatRaised(founder.amount_raised)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
