import { Heart, Briefcase, Users, CalendarCheck, FileText, Building2, ShieldCheck, Wallet, Send, HelpCircle, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  heart: Heart, briefcase: Briefcase, users: Users, calendar: CalendarCheck,
  file: FileText, building: Building2, shield: ShieldCheck, wallet: Wallet, send: Send,
};

export default function ServiceIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = map[name] ?? HelpCircle;
  return <Icon size={size} />;
}
