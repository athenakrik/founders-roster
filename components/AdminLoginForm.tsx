"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-black px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
      {error && <p className="text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="border border-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors disabled:opacity-50"
      >
        {loading ? "Checking..." : "Login"}
      </button>
    </form>
  );
}
