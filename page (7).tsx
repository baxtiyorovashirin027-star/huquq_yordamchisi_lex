import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ProfileMenu from "@/components/ProfileMenu";

export default async function Profil() {
  const user = (await currentUser())!;
  const count = await prisma.application.count({ where: { userId: user.id } });
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-sky-500 to-brand-dark text-3xl font-extrabold text-white shadow-lg">{user.firstName[0]?.toLowerCase()}</div>
        <div><div className="text-xs font-bold text-brand">FOYDALANUVCHI</div>
          <div className="text-2xl font-extrabold text-ink">{user.firstName} {user.lastName}</div>
          <div className="text-sm text-slate-400">+998 {user.phone}</div></div>
      </div>
      <ProfileMenu name={`${user.firstName} ${user.lastName}`} phone={user.phone} count={count} />
    </>
  );
}
