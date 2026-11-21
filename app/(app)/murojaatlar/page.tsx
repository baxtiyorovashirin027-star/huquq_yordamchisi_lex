import { FileText, ShieldCheck } from "lucide-react";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import OpenChatButton from "@/components/OpenChatButton";

export default async function Murojaatlar() {
  const user = await currentUser();
  const apps = await prisma.application.findMany({ where: { userId: user!.id }, orderBy: { createdAt: "desc" } });
  return (
    <>
      <div className="text-xs font-bold text-brand">MENING ARIZALARIM</div>
      <h1 className="mt-1 text-3xl font-extrabold text-ink">Murojaatlar</h1>
      <div className="mt-5 space-y-4">
        {apps.map((a) => (
          <div key={a.id} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">{a.status}</span>
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand"><FileText size={20} /></div>
              <div><div className="font-bold text-ink">{a.title}</div>
                <div className="text-xs text-slate-400">№ {a.number} · {a.createdAt.toLocaleDateString("uz-UZ")}</div></div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-slate-100"><div className="h-full w-2/3 rounded-full bg-orange-400" /></div>
            <div className="mt-2 text-xs text-slate-400">Javob berish muddati: 7 ish kuni</div>
          </div>
        ))}
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
          <ShieldCheck size={32} className="mx-auto text-slate-400" />
          <div className="mt-3 text-sm font-bold text-ink">Arizalaringiz shu yerda saqlanadi</div>
          <div className="mt-1 text-xs text-slate-400">AI yordamchi orqali yangi ariza tayyorlashingiz mumkin.</div>
          <OpenChatButton prompt="Ariza yozishga yordam bering" className="mt-4 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white">Yangi ariza tayyorlash</OpenChatButton>
        </div>
      </div>
    </>
  );
}
