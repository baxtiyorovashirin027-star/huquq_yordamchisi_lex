import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./db";

const secret = () => process.env.AUTH_SECRET || "dev-secret-o'zgartiring";

export function signSession(id: string) {
  const sig = crypto.createHmac("sha256", secret()).update(id).digest("hex");
  return `${id}.${sig}`;
}

export async function currentUser() {
  const value = cookies().get("session")?.value;
  if (!value) return null;
  const id = value.split(".")[0];
  if (signSession(id) !== value) return null;
  return prisma.user.findUnique({ where: { id } });
}
