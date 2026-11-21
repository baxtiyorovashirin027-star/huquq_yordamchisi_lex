// DEMO MA'LUMOTLAR: haqiqiy davlat tizimlariga ulanmagan. Manzil/telefonlar namunaviy.
export type Service = {
  slug: string; title: string; short: string; icon: string; tone: string;
  org: string; docs: string[]; help: string; address: string; phone: string;
  link: string; keywords: string[];
};

const MYGOV = "https://my.gov.uz/uz";
const MUROJAAT = "https://murojaat.gov.uz";

export const services: Service[] = [
  { slug: "ijtimoiy-yordam", title: "Ijtimoiy yordam", short: "Ijtimoiy yordam olish tartibi", icon: "heart", tone: "bg-emerald-50 text-emerald-600",
    org: "Mahalla va oilani qo'llab-quvvatlash bo'limi", docs: ["Pasport yoki ID-karta nusxasi", "Oila tarkibi haqida ma'lumotnoma", "Daromadlar haqida ma'lumotnoma"],
    help: "Muhtoj oilalarga ijtimoiy nafaqa va moddiy yordam olish bo'yicha ariza tayyorlashda yordam ko'rsatiladi.",
    address: "Toshkent sh., Mirobod tumani, Nukus ko'chasi, 8-uy", phone: "1176", link: MYGOV,
    keywords: ["ijtimoiy", "yordam", "nafaqa", "kam taminlangan", "muhtoj", "moddiy"] },
  { slug: "ish-va-bandlik", title: "Ish va bandlik", short: "Ishsizlik va ishga joylashish", icon: "briefcase", tone: "bg-sky-50 text-sky-600",
    org: "Bandlik va mehnat munosabatlari agentligi", docs: ["Pasport yoki ID-karta nusxasi", "Mehnat daftarchasi", "Ma'lumoti haqida hujjat (diplom)"],
    help: "Ishsiz sifatida ro'yxatdan o'tish, ish topish va kasbga o'qitish xizmatlari bo'yicha maslahat beriladi.",
    address: "Toshkent sh., Yunusobod tumani, Amir Temur shoh ko'chasi, 15-uy", phone: "1155", link: MYGOV,
    keywords: ["ishsiz", "ish topish", "bandlik", "ishga joylash", "vakansiya", "ish qidir"] },
  { slug: "aliment", title: "Aliment", short: "Aliment undirish", icon: "users", tone: "bg-orange-50 text-orange-500",
    org: "Sud va Majburiy ijro byurosi", docs: ["Pasport nusxasi", "Farzandning tug'ilganlik guvohnomasi", "Nikoh yoki ajrashish guvohnomasi", "Alimentchining ish joyi haqida ma'lumot"],
    help: "Aliment undirish to'g'risida sudga ariza yozish va ijro hujjatini olishda yordam ko'rsatiladi.",
    address: "Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko'chasi, 21-uy", phone: "1006", link: MUROJAAT,
    keywords: ["aliment", "bola nafaqasi", "farzand", "bolalar uchun pul", "to'lamayapti"] },
  { slug: "nikoh-va-ajrashish", title: "Nikoh masalalari", short: "Nikoh va ajrashish", icon: "calendar", tone: "bg-violet-50 text-violet-600",
    org: "FHDYo (ZAGS) bo'limi", docs: ["Ikkala tomonning pasporti", "Nikoh to'g'risidagi ariza", "Davlat bojini to'langanlik cheki", "Ajrashish uchun: nikoh guvohnomasi"],
    help: "Nikohdan o'tish va ajrashish tartibi, kelishuv yoki sud orqali ajrashish bo'yicha maslahat beriladi.",
    address: "Toshkent sh., Shayxontohur tumani, Navoiy ko'chasi, 4-uy", phone: "1009", link: MYGOV,
    keywords: ["nikoh", "ajrash", "ajrim", "turmush", "zags", "fhdyo", "er", "xotin"] },
  { slug: "meros", title: "Meros", short: "Meros masalalari", icon: "file", tone: "bg-cyan-50 text-cyan-600",
    org: "Notarial idora", docs: ["Vafot etganlik guvohnomasi", "Merosxo'rning pasporti", "Qarindoshlikni tasdiqlovchi hujjat", "Mulkka egalik hujjatlari"],
    help: "Meros huquqini rasmiylashtirish va merosxo'rlar o'rtasidagi nizolar bo'yicha maslahat beriladi.",
    address: "Toshkent sh., Mirzo Ulug'bek tumani, Mustaqillik ko'chasi, 12-uy", phone: "1004", link: MYGOV,
    keywords: ["meros", "vasiyat", "vafot", "merosxo'r", "notarius"] },
  { slug: "uy-joy-va-mulk", title: "Uy-joy va mulk", short: "Uy-joy va mulk huquqi", icon: "building", tone: "bg-teal-50 text-teal-600",
    org: "Kadastr agentligi", docs: ["Pasport nusxasi", "Mulkka egalik hujjati", "Oldi-sotdi yoki hadya shartnomasi", "Kadastr pasporti"],
    help: "Uy-joyni ro'yxatdan o'tkazish, oldi-sotdi va ijara bo'yicha nizolarda huquqiy yordam ko'rsatiladi.",
    address: "Toshkent sh., Olmazor tumani, Beruniy ko'chasi, 30-uy", phone: "1155", link: MYGOV,
    keywords: ["uy", "kvartira", "mulk", "kadastr", "ijara", "yer", "uy-joy", "propiska"] },
  { slug: "mehnat-huquqi", title: "Mehnat huquqi", short: "Mehnat huquqlarini himoya qilish", icon: "shield", tone: "bg-amber-50 text-amber-600",
    org: "Hududiy Bandlik va mehnat munosabatlari boshqarmasi", docs: ["Pasport yoki ID-karta nusxasi", "Mehnat shartnomasi nusxasi", "Ishdan bo'shatish to'g'risidagi buyruq"],
    help: "Mehnat huquqlaringiz tiklanishi, ishga qayta tiklash yoki kompensatsiya olish bo'yicha arizangiz ko'rib chiqiladi.",
    address: "Toshkent sh., Mirobod tumani, Nukus ko'chasi, 8-uy", phone: "1176", link: MUROJAAT,
    keywords: ["ishdan", "bo'shat", "noqonuniy", "maosh", "oylik", "ish haqi", "mehnat", "ta'til", "ish beruvchi", "ishdan haydal"] },
  { slug: "pensiya", title: "Pensiya", short: "Pensiya va nafaqalar", icon: "wallet", tone: "bg-indigo-50 text-indigo-600",
    org: "Pensiya jamg'armasi", docs: ["Pasport yoki ID-karta nusxasi", "Mehnat daftarchasi", "Ish staji haqida ma'lumotnoma", "Bank hisob raqami"],
    help: "Pensiya tayinlash, qayta hisoblash va nafaqalar olish tartibi bo'yicha maslahat beriladi.",
    address: "Toshkent sh., Yakkasaroy tumani, Shota Rustaveli ko'chasi, 9-uy", phone: "1145", link: MYGOV,
    keywords: ["pensiya", "nafaqa", "nogironlik", "staj", "keksa"] },
  { slug: "ariza-yuborish", title: "Ariza yuborish", short: "Davlat tashkilotlariga ariza va shikoyat", icon: "send", tone: "bg-blue-50 text-blue-600",
    org: "Murojaat.gov.uz — yagona murojaatlar portali", docs: ["Pasport yoki ID-karta nusxasi", "Muammoni tasdiqlovchi hujjatlar", "Ariza matni"],
    help: "Davlat tashkilotlariga ariza yoki shikoyat yuborish va javob muddatini kuzatish mumkin.",
    address: "Toshkent sh., Mirobod tumani, Nukus ko'chasi, 8-uy", phone: "1176", link: MUROJAAT,
    keywords: ["shikoyat", "ariza", "murojaat", "tashkilot"] },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

const norm = (s: string) => s.toLowerCase().replace(/[‘’ʻʼ`´]/g, "'");

export function findService(q: string) {
  const t = norm(q);
  let best = services[services.length - 1];
  let score = 0;
  for (const s of services) {
    const sc = s.keywords.filter((k) => t.includes(k)).length;
    if (sc > score) { score = sc; best = s; }
  }
  return { service: best, matched: score > 0 };
}
