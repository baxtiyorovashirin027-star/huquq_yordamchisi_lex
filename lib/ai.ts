import { findService } from "./services";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `Sen O'zbekiston fuqarolariga yordam beruvchi huquqiy yordamchisan. Faqat o'zbek lotin yozuvida, sodda va punktlar bilan javob ber. Kerakli hujjatlar, qayerga murojaat qilish va ariza loyihalarini yoz. Aniq bilmasang, mutaxassisga murojaat qilishni maslahat ber.`;

export function sampleDraft(name: string, topic = "Murojaat") {
  return `${topic} bo'yicha ariza\n\nKimga: Tegishli davlat organi rahbariga\nKimdan: ${name}\n\nHurmatli rahbar!\n\nMen quyidagi masala yuzasidan murojaat qilaman: [muammoingizni qisqacha yozing].\n\nIltimos, arizamni qonunchilikda belgilangan muddatda ko'rib chiqib, yozma javob berishingizni so'rayman.\n\nIlova: kerakli hujjatlar nusxalari.\n\nSana: ____________    Imzo: ____________`;
}

function demoReply(text: string, name: string, draftAsked: boolean) {
  const { service } = findService(text);
  if (draftAsked) return sampleDraft(name, service.title);
  const t = text.toLowerCase();
  if (t.includes("tekshir")) return `Hujjatlaringizni tekshiraman. "${service.title}" uchun quyidagilar kerak:\n• ${service.docs.join("\n• ")}\n\nQaysilari sizda bor? Yozib yuboring, yetishmayotganlarini aytaman.`;
  return `"${service.title}" bo'yicha:\n\nQayerga murojaat qilish kerak?\n• ${service.org}\n\nKerakli hujjatlar:\n• ${service.docs.join("\n• ")}\n\nManzil: ${service.address}\nTelefon: ${service.phone}\n\n(Demo rejim: haqiqiy AI ulash uchun .env ga OPENAI_API_KEY yozing.)`;
}

export async function aiReply(messages: Msg[], name: string) {
  const last = messages[messages.length - 1]?.content ?? "";
  const draft = /ariza|shikoyat/i.test(last) && /yoz|tayyorla|loyiha|yordam/i.test(last);
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { reply: demoReply(last, name, draft), draft };
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [{ role: "system", content: `${SYSTEM} Foydalanuvchi ismi: ${name}.` }, ...messages.slice(-10)],
      }),
    });
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) throw new Error("bo'sh javob");
    return { reply: reply as string, draft };
  } catch {
    return { reply: demoReply(last, name, draft), draft };
  }
}
