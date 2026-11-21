import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sampleDraft } from "@/lib/ai";

// Standart PDF shrifti o'zbek maxsus belgilarini bilmaydi, shuning uchun ularni oddiy belgiga almashtiramiz.
const clean = (s: string) => s.replace(/[‘’ʻʼ`´]/g, "'").replace(/[•]/g, "-").replace(/[^\x20-\x7E\n]/g, "");

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
  const { title, body } = await req.json();
  const text = (body && String(body).trim()) || sampleDraft(`${user.firstName} ${user.lastName}`);
  const docTitle = String(title || "Ariza");

  await prisma.application.create({
    data: { number: String(Math.floor(10000 + Math.random() * 90000)), title: docTitle, body: text, userId: user.id },
  });

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const size = 12, margin = 56, lh = 18;
  let page = pdf.addPage([595, 842]);
  let y = 842 - margin;
  for (const para of clean(text).split("\n")) {
    let line = "";
    for (const word of para.split(" ")) {
      const test = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) > 595 - margin * 2) {
        if (y < margin) { page = pdf.addPage([595, 842]); y = 842 - margin; }
        page.drawText(line, { x: margin, y, size, font }); y -= lh; line = word;
      } else line = test;
    }
    if (y < margin) { page = pdf.addPage([595, 842]); y = 842 - margin; }
    page.drawText(line, { x: margin, y, size, font }); y -= lh;
  }

  const bytes = await pdf.save();
  return new NextResponse(Buffer.from(bytes), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": 'attachment; filename="ariza.pdf"' },
  });
}
