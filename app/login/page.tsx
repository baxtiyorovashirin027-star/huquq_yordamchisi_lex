"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"register" | "login">("register");
  const [step, setStep] = useState<"form" | "code">("form");
  const [f, setF] = useState({ firstName: "", lastName: "", phone: "" });
  const [code, setCode] = useState(["", "", "", ""]);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function next(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    if (mode === "register" && (!f.firstName.trim() || !f.lastName.trim())) return setErr("Ism va familiyani kiriting");
    if (f.phone.length !== 9) return setErr("Telefon raqami 9 ta raqamdan iborat bo'lishi kerak");
    setStep("code");
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    if (code.join("").length !== 4) return setErr("4 xonali kodni kiriting");
    setBusy(true);
    const res = await fetch("/api/auth/verify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, mode, code: code.join("") }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setErr(data.error || "Xatolik");
    router.push("/"); router.refresh();
  }

  function setDigit(i: number, v: string) {
    const d = v.replace(/\D/g, "").slice(-1);
    const c = [...code]; c[i] = d; setCode(c);
    if (d && i < 3) refs.current[i + 1]?.focus();
  }

  const input = "w-full rounded-xl bg-brand-soft px-4 py-3.5 text-sm outline-none ring-1 ring-slate-200 focus:ring-brand";

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-sky-100 to-white p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <Logo sub />
          {step === "code" && (
            <button type="button" aria-label="Orqaga" onClick={() => { setStep("form"); setErr(""); setInfo(""); }} className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-slate-500"><ArrowLeft size={18} /></button>
          )}
        </div>

        {step === "form" ? (
          <form onSubmit={next} className="mt-8">
            <div className="text-xs font-bold text-brand">XUSH KELIBSIZ</div>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink">Huquqiy yordam doimo yoningizda</h1>
            <p className="mt-3 text-sm text-slate-500">Davlat va huquqiy xizmatlardan sodda, tez va ishonchli foydalaning.</p>

            <div className="mt-6 grid grid-cols-2 rounded-2xl bg-brand-soft p-1 text-sm font-bold">
              {(["register", "login"] as const).map((m) => (
                <button key={m} type="button" onClick={() => { setMode(m); setErr(""); }}
                  className={`rounded-xl py-3 ${mode === m ? "bg-white text-brand shadow" : "text-slate-400"}`}>
                  {m === "register" ? "Ro'yxatdan o'tish" : "Kirish"}
                </button>
              ))}
            </div>

            {mode === "register" && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <label className="text-xs font-semibold">Ism
                  <input className={`${input} mt-1`} placeholder="Ismingiz" value={f.firstName} onChange={(e) => setF({ ...f, firstName: e.target.value })} /></label>
                <label className="text-xs font-semibold">Familiya
                  <input className={`${input} mt-1`} placeholder="Familiyangiz" value={f.lastName} onChange={(e) => setF({ ...f, lastName: e.target.value })} /></label>
              </div>
            )}

            <label className="mt-4 block text-xs font-semibold">Telefon raqami
              <div className="mt-1 flex items-center rounded-xl bg-brand-soft ring-1 ring-slate-200 focus-within:ring-brand">
                <span className="border-r border-slate-200 px-4 text-sm font-bold">+998</span>
                <input inputMode="numeric" className="w-full bg-transparent px-4 py-3.5 text-sm outline-none" placeholder="90 123 45 67"
                  value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 9) })} />
              </div>
            </label>

            {err && <p className="mt-3 text-sm font-semibold text-red-500">{err}</p>}
            <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-brand-dark py-4 text-sm font-bold text-white shadow-lg">
              Davom etish <ChevronRight size={18} />
            </button>
            <p className="mt-4 text-center text-[11px] text-slate-400">Davom etish orqali foydalanish shartlari va maxfiylik siyosatiga rozilik bildirasiz.</p>
          </form>
        ) : (
          <form onSubmit={verify} className="mt-8">
            <div className="text-xs font-bold text-brand">TELEFONNI TASDIQLASH</div>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink">Tasdiqlash kodini kiriting</h1>
            <p className="mt-3 text-sm text-slate-500">+998 {f.phone} raqamiga yuborilgan 4 xonali kodni kiriting.</p>
            <div className="mt-6 flex gap-3">
              {code.map((d, i) => (
                <input key={i} ref={(el) => { refs.current[i] = el; }} inputMode="numeric" value={d} autoFocus={i === 0}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => e.key === "Backspace" && !code[i] && i > 0 && refs.current[i - 1]?.focus()}
                  className="h-16 w-full rounded-2xl bg-brand-soft text-center text-2xl font-bold outline-none ring-1 ring-slate-200 focus:ring-brand" />
              ))}
            </div>
            {err && <p className="mt-3 text-sm font-semibold text-red-500">{err}</p>}
            {info && <p className="mt-3 text-sm font-semibold text-emerald-600">{info}</p>}
            <button type="submit" disabled={busy} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-brand-dark py-4 text-sm font-bold text-white shadow-lg disabled:opacity-60">
              {busy ? "Tekshirilmoqda..." : "Tasdiqlash"}
            </button>
            <p className="mt-5 text-center text-xs text-slate-500">Kod kelmadimi?{" "}
              <button type="button" className="font-bold text-brand" onClick={() => { setCode(["", "", "", ""]); setInfo("Kod qayta yuborildi (demo)"); }}>Qayta yuborish</button></p>
            <p className="mt-2 text-center text-[11px] text-slate-400">Prototip uchun istalgan 4 xonali kodni kiriting.</p>
          </form>
        )}
      </div>
    </main>
  );
}
