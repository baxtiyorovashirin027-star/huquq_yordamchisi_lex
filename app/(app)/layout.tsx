import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";
import AiChat from "@/components/AiChat";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/login");
  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 pb-28 pt-4">
      {children}
      <AiChat />
      <BottomNav />
    </div>
  );
}
