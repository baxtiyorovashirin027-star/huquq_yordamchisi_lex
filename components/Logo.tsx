import { ShieldCheck } from "lucide-react";

export default function Logo({ sub }: { sub?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-brand-dark text-white shadow-lg">
        <ShieldCheck size={24} />
      </div>
      <div className="leading-tight">
        <div className="text-xl font-extrabold text-ink">Huquq<span className="text-brand">Yordam</span></div>
        {sub && <div className="text-[11px] text-slate-500">Huquqingiz — ishonchli himoyada</div>}
      </div>
    </div>
  );
}
