import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { signSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { mode, firstName, lastName, phone, code } = await req.json();
  if (!/^\d{9}$/.test(phone ?? "")) return NextResponse.json({ error: "Telefon raqami noto'g'ri" }, { status: 400 });
  // DEMO: istalgan 4 xonali kod qabul qilinadi. Haqiqiy SMS xizmatini shu yerga ulang.
  if (!/^\d{4}$/.test(code ?? "")) return NextResponse.json({ error: "Kod noto'g'ri" }, { status: 400 });

  let user = await prisma.user.findUnique({ where: { phone } });
  if (mode === "register") {
    if (!firstName?.trim() || !lastName?.trim()) return NextResponse.json({ error: "Ism va familiyani kiriting" }, { status: 400 });
    user = user ?? (await prisma.user.create({ data: { phone, firstName: firstName.trim(), lastName: lastName.trim() } }));
  } else if (!user) {
    return NextResponse.json({ error: "Bu raqam ro'yxatdan o'tmagan. Avval ro'yxatdan o'ting." }, { status: 404 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("session", signSession(user.id), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30, secure: process.env.NODE_ENV === "production" });
  return res;
}
