"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

export default function SearchBox({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/natija?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 rounded-2xl bg-white p-2 pl-4 shadow-lg">
      <Search size={20} className="text-slate-400" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Muammoingizni kiriting..."
        className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400" />
      <button type="submit" aria-label="Qidirish" className="grid h-11 w-11 place-items-center rounded-xl bg-orange-400 text-white active:scale-95">
        <ArrowRight size={20} />
      </button>
    </form>
  );
}
