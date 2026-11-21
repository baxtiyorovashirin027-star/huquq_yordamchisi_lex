import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { findService } from "@/lib/services";
import SearchBox from "@/components/SearchBox";
import ServiceDetail from "@/components/ServiceDetail";

export default function Natija({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? "";
  const { service, matched } = findService(q);
  return (
    <>
      <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-brand"><ArrowLeft size={16} />Bosh sahifa</Link>
      <SearchBox initial={q} />
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-100">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500 text-white"><CheckCircle2 size={22} /></div>
        <div className="text-sm"><div className="text-xs font-bold text-emerald-600">AI TAHLILI TAYYOR</div>
          <div className="font-extrabold text-ink">{q || "So'rov kiritilmagan"}</div>
          {!matched && q && <div className="text-xs text-slate-400">Aniq mos xizmat topilmadi — umumiy yo&apos;nalish ko&apos;rsatildi.</div>}</div>
      </div>
      <div className="mt-4"><ServiceDetail s={service} /></div>
    </>
  );
}
