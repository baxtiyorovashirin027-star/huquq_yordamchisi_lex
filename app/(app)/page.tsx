import Link from "next/link";
import { Bell, Bot, ChevronRight, MessageSquare, Sparkles } from "lucide-react";
import { currentUser } from "@/lib/auth";
import { services } from "@/lib/services";
import Logo from "@/components/Logo";
import SearchBox from "@/components/SearchBox";
import ServiceIcon from "@/components/ServiceIcon";
import OpenChatButton from "@/components/OpenChatButton";

export default async function Home() {
  const user = await currentUser();
  return (
    <>
      <header className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <div className="text-right text-xs text-slate-500">Xush kelibsiz,<div className="text-sm font-bold text-ink">{user?.firstName}</div></div>
          <Link href="/murojaatlar" aria-label="Bildirishnomalar" className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
            <Bell size={20} /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
          </Link>
        </div>
      </header>

      <section className="mt-5 rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-6 text-white shadow-lg">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold"><Bot size={14} />Aqlli huquqiy ko&apos;makchi</span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight">Qanday masalada yordam kerak?</h1>
        <p className="mt-2 text-sm text-sky-100">Muammoingizni oddiy so&apos;zlar bilan yozing — biz sizga to&apos;g&apos;ri yo&apos;lni ko&apos;rsatamiz.</p>
        <div className="mt-5"><SearchBox /></div>
        <p className="mt-3 text-center text-xs text-sky-100">Masalan: &quot;Ishdan noqonuniy bo&apos;shatildim&quot;</p>
      </section>

      <div className="mt-7 text-xs font-bold text-brand">KERAKLI XIZMATNI TANLANG</div>
      <h2 className="mt-1 text-xl font-extrabold text-ink">Ko&apos;p foydalaniladigan xizmatlar</h2>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {services.map((s) => (
          <Link key={s.slug} href={`/xizmat/${s.slug}`} className="flex min-h-[130px] flex-col justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition active:scale-95">
            <div className={`grid h-11 w-11 place-items-center rounded-xl ${s.tone}`}><ServiceIcon name={s.icon} /></div>
            <div className="mt-3 flex items-end justify-between">
              <div><div className="text-sm font-bold text-ink">{s.title}</div><div className="mt-0.5 text-[11px] leading-tight text-slate-400">{s.short}</div></div>
              <ChevronRight size={16} className="shrink-0 text-slate-300" />
            </div>
          </Link>
        ))}
      </div>

      <OpenChatButton className="mt-5 flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-ink to-brand-dark p-4 text-left text-white">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/20"><MessageSquare size={22} /></div>
        <div className="flex-1"><div className="font-bold">Savolingiz bormi?</div><div className="text-xs text-sky-100">AI yordamchi bilan suhbatlashing</div></div>
        <Sparkles size={18} />
      </OpenChatButton>
    </>
  );
}
