import Link from "next/link";
import { notFound } from "next/navigation";
import { BranchForm } from "@/components/dms/BranchForm";
import { DmsShell } from "@/components/dms/DmsShell";
import { branches, getBranch } from "@/data/branches";

export function generateStaticParams() {
  return branches.map((branch) => ({ id: branch.id }));
}

export default async function EditBranchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const branch = getBranch(id);
  if (!branch) notFound();

  return (
    <DmsShell title="تعديل فرع" subtitle={branch.name}>
      <div className="mb-5">
        <Link
          href="/settings"
          className="rounded-xl border border-border-soft px-4 py-2 text-sm hover:bg-surface"
        >
          رجوع للإعدادات
        </Link>
      </div>
      <BranchForm mode="edit" branch={branch} />
    </DmsShell>
  );
}
