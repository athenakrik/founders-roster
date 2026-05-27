"use client";

import { useTransition } from "react";
import { Founder } from "@/lib/types";
import { approveFounder, rejectFounder } from "@/app/admin/actions";
import { formatRaised, formatDate } from "@/lib/utils";

interface Props {
  founders: Founder[];
}

export default function AdminClient({ founders }: Props) {
  const [isPending, startTransition] = useTransition();

  if (founders.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-8">No pending submissions.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_auto] px-4 py-3 border-b border-black bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
        <span>Founder</span>
        <span>Company</span>
        <span>Sector</span>
        <span>Stage</span>
        <span>Raised</span>
        <span>Submitted</span>
        <span>Actions</span>
      </div>
      {founders.map((founder) => (
        <div
          key={founder.id}
          className="border-b border-gray-200 px-4 py-4 md:grid md:grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_auto] flex flex-col gap-2 items-start"
        >
          <div>
            <p className="text-sm font-medium">{founder.name}</p>
            {founder.headline && (
              <p className="text-xs text-gray-500 mt-0.5">{founder.headline}</p>
            )}
          </div>
          <p className="text-sm">{founder.company_name ?? "—"}</p>
          <p className="text-sm text-gray-700">{founder.sector ?? "—"}</p>
          <p className="text-sm text-gray-700">{founder.stage ?? "—"}</p>
          <p className="text-sm text-gray-700">{formatRaised(founder.amount_raised)}</p>
          <p className="text-sm text-gray-700">{formatDate(founder.created_at)}</p>
          <div className="flex gap-2">
            <button
              disabled={isPending}
              onClick={() => startTransition(() => approveFounder(founder.id))}
              className="text-xs border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
            >
              Approve
            </button>
            <button
              disabled={isPending}
              onClick={() => startTransition(() => rejectFounder(founder.id))}
              className="text-xs border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
