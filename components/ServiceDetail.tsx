import { Building2, FileText, ShieldCheck, MapPin, ArrowRight, PenLine } from "lucide-react";
import type { Service } from "@/lib/services";
import OpenChatButton from "./OpenChatButton";

function Row({ icon, tone, title, children }: { icon: React.ReactNode; tone: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 border-b border-slate-100 py-4 last:border-0">
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tone}`}>{icon}</div>
      <div className="min-w-0 text-sm">
        <div className="font-bold text-ink">{title}</div>
        <div className="mt-1 text-slate-500">{children}</div>
      </div>
    </div>
  );
}

export default function ServiceDetail({ s }: { s: Service }) {
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`;
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-extrabold text-ink">{s.title}</h2>
      <Row icon={<Building2 size={20} />} tone="bg-sky-50 text-sky-600" title="Qayerga murojaat qilish kerak?">{s.org}</Row>
      <Row icon={<FileText size={20} />} tone="bg-violet-50 text-violet-600" title="Kerakli hujjatlar">
        <ul className="list-disc space-y-1 pl-4">{s.docs.map((d) => <li key={d}>{d}</li>)}</ul>
      </Row>
      <Row icon={<ShieldCheck size={20} />} tone="bg-emerald-50 text-emerald-600" title="Huquqiy yordam">{s.help}</Row>
      <Row icon={<MapPin size={20} />} tone="bg-orange-50 text-orange-500" title="Manzil va aloqa">
        {s.address}
        <div className="mt-2 flex gap-4 font-bold text-brand">
          <a href={`tel:${s.phone}`}>{s.phone}</a>
          <a href={map} target="_blank" rel="noreferrer">Xaritada ko&apos;rish</a>
        </div>
      </Row>
      <a href={s.link} target="_blank" rel="noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-brand py-4 text-sm font-bold text-white active:scale-[.99]">
        Onlayn murojaat qilish <ArrowRight size={18} />
      </a>
      <OpenChatButton prompt={`${s.title} bo'yicha ariza yozishga yordam bering`}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-light py-4 text-sm font-bold text-brand">
        <PenLine size={18} /> AI bilan ariza tayyorlash
      </OpenChatButton>
      <p className="mt-3 text-center text-[11px] text-slate-400">Demo ma&apos;lumot: manzil, telefon va havolalar namunaviy.</p>
    </div>
  );
}
