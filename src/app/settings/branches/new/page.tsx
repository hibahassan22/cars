import Link from "next/link";
import { BranchForm } from "@/components/dms/BranchForm";
import { DmsShell } from "@/components/dms/DmsShell";

export default function NewBranchPage() {
  return (
    <DmsShell title="إضافة فرع" subtitle="أدخل بيانات الفرع الجديد">
      <div className="mb-5">
        <Link
          href="/settings"
          className="rounded-xl border border-border-soft px-4 py-2 text-sm hover:bg-surface"
        >
          رجوع للإعدادات
        </Link>
      </div>
      <BranchForm mode="create" />
    </DmsShell>
  );
}
