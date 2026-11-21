import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getService } from "@/lib/services";
import ServiceDetail from "@/components/ServiceDetail";

export default function XizmatPage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();
  return (
    <>
      <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-brand"><ArrowLeft size={16} />Bosh sahifa</Link>
      <ServiceDetail s={s} />
    </>
  );
}
