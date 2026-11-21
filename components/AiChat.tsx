"use client";
import { useEffect, useRef, useState } from "react";
import { Bot, X, Send, FileText, FileCheck2, Check, PenLine } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string; draft?: boolean };
const HELLO: Msg = { role: "assistant", content: "Assalomu alaykum! Men sizga huquqiy masalalarda yordam beraman. Nimadan boshlaymiz?" };

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([HELLO]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  async function send(content: string) {
    if (!content.trim() || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(next); setText(""); setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json();
      setMsgs([...next, { role: "assistant", content: data.reply ?? data.error ?? "Xatolik yuz berdi.", draft: data.draft }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Aloqa xatosi. Qaytadan urinib ko'ring." }]);
    }
    setBusy(false);
  }

  async function downloadPdf() {
    const draft = [...msgs].reverse().find((m) => m.draft);
    const res = await fetch("/api/pdf", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Ariza", body: draft?.content ?? "" }),
    });
    if (!res.ok) return alert("PDF yaratib bo'lmadi");
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = url; a.download = "ariza.pdf"; a.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    const h = (e: Event) => {
      setOpen(true);
      const p = (e as CustomEvent).detail?.prompt;
      if (p) setTimeout(() => send(p), 100);
    };
    window.addEventListener("open-chat", h);
    return () => window.removeEventListener("open-chat", h);
  });

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  const chips = [
    { Icon: FileText, label: "Kerakli hujjatlarni aniqlash", q: "Menga kerakli hujjatlarni aniqlashga yordam bering" },
    { Icon: Check, label: "Hujjatlarimni tekshirish", q: "Hujjatlarimni tekshirishga yordam bering" },
    { Icon: PenLine, label: "Ariza yozishga yordam", q: "Ariza yozishga yordam bering" },
  ];

  return (
    <>
      <button type="button" aria-label="AI yordamchi" onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-xl ring-4 ring-white active:scale-95">
        <Bot size={26} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="flex h-[88vh] w-full max-w-lg flex-col rounded-t-3xl bg-white sm:h-[80vh] sm:rounded-3xl">
            <div className="flex items-center gap-3 border-b border-slate-100 p-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white"><Bot size={24} /></div>
              <div className="flex-1">
                <div className="font-extrabold text-ink">Huquqiy AI yordamchi</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500" />Onlayn · yordam berishga tayyor</div>
              </div>
              <button type="button" aria-label="Yopish" onClick={() => setOpen(false)} className="p-2 text-slate-400"><X size={22} /></button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-brand-soft p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm shadow-sm ${m.role === "user" ? "ml-auto bg-brand text-white" : "bg-white text-ink"}`}>{m.content}</div>
              ))}
              {busy && <div className="text-xs text-slate-400">Yozmoqda...</div>}
              {msgs.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {chips.map(({ Icon, label, q }) => (
                    <button key={label} type="button" onClick={() => send(q)}
                      className="flex items-center gap-2 rounded-full border border-sky-200 bg-brand-light px-3 py-2 text-xs font-bold text-brand">
                      <Icon size={14} />{label}
                    </button>
                  ))}
                </div>
              )}
              <button type="button" onClick={downloadPdf}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sky-300 bg-brand-light py-4 text-xs font-bold text-brand">
                <FileCheck2 size={18} />
                {msgs.some((m) => m.draft) ? "Tayyor arizani PDF shaklida olish" : "Namunaviy arizani PDF shaklida olish"}
              </button>
              <div ref={bottom} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex items-center gap-2 border-t border-slate-100 p-3">
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Xabaringizni yozing..."
                className="min-w-0 flex-1 rounded-xl bg-brand-soft px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:ring-brand" />
              <button type="submit" aria-label="Yuborish" disabled={busy} className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white disabled:opacity-50"><Send size={20} /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
