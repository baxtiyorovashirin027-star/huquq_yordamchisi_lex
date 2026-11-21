"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, User } from "lucide-react";

const items = [
  { href: "/", label: "Bosh sahifa", Icon: Home },
  { href: "/murojaatlar", label: "Murojaatlar", Icon: FileText },
  { href: "/profil", label: "Profil", Icon: User },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl">
        {items.map(({ href, label, Icon }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link key={href} href={href} className={`flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-semibold ${active ? "text-brand" : "text-slate-400"}`}>
              <Icon size={22} />{label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
