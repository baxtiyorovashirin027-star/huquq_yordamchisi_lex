import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { aiReply } from "@/lib/ai";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Avval tizimga kiring" }, { status: 401 });
  const { messages } = await req.json();
  const out = await aiReply(messages, `${user.firstName} ${user.lastName}`);
  return NextResponse.json(out);
}
