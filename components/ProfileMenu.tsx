"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, FileText, Bell, ShieldCheck, ChevronRight, ChevronDown, type LucideIcon } from "lucide-react";

export default function ProfileMenu({ name, phone, count }: { name: string; phone: string; count: number }) {
  const router = useRouter();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (k: string) => setOpenKey(openKey === k ? null : k);

  const items = [
    { key: "info", Icon: User, title: "Shaxsiy ma'lumotlar", sub: "Ism va telefon raqami", body: `${name}\n+998 ${phone}` },
    { key: "notif", Icon: Bell, title: "Bildirishnomalar", sub: "Muhim yangiliklar va javoblar", body: "Hozircha yangi bildirishnoma yo'q." },
    { key: "privacy", Icon: ShieldCheck, title: "Maxfiylik va xavfsizlik", sub: "Hisob himoyasi", body: "Ma'lumotlaringiz faqat sizning hisobingizda saqlanadi va uchinchi shaxslarga berilmaydi." },
  ];

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login"); router.refresh();
  }

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
        {items.slice(0, 1).map((it) => <Item key={it.key} it={it} open={openKey === it.key} onClick={() => toggle(it.key)} />)}
        <Link href="/murojaatlar" className="flex items-center gap-3 border-t border-slate-100 p-4">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand"><FileText size={20} /></div>
          <div className="flex-1"><div className="text-sm font-bold text-ink">Mening hujjatlarim</div><div className="text-xs text-slate-400">{count} ta ariza saqlangan</div></div>
          <ChevronRight size={18} className="text-slate-300" />
        </Link>
        {items.slice(1).map((it) => <Item key={it.key} it={it} open={openKey === it.key} onClick={() => toggle(it.key)} />)}
      </div>
      <button type="button" onClick={logout} className="mt-5 w-full rounded-2xl bg-red-50 py-4 text-sm font-bold text-red-500">Hisobdan chiqish</button>
    </>
  );
}

function Item({ it, open, onClick }: { it: { Icon: LucideIcon; title: string; sub: string; body: string }; open: boolean; onClick: () => void }) {
  return (
    <div className="border-t border-slate-100 first:border-0">
      <button type="button" onClick={onClick} className="flex w-full items-center gap-3 p-4 text-left">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand"><it.Icon size={20} /></div>
        <div className="flex-1"><div className="text-sm font-bold text-ink">{it.title}</div><div className="text-xs text-slate-400">{it.sub}</div></div>
        {open ? <ChevronDown size={18} className="text-slate-300" /> : <ChevronRight size={18} className="text-slate-300" />}
      </button>
      {open && <div className="whitespace-pre-line bg-brand-soft px-5 py-3 text-sm text-slate-600">{it.body}</div>}
    </div>
  );
}
