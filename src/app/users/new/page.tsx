import Link from "next/link";
import { DmsShell } from "@/components/dms/DmsShell";
import { UserForm } from "@/components/dms/UserForm";

export default function NewUserPage() {
  return (
    <DmsShell title="إضافة مستخدم" subtitle="إنشاء حساب جديد وتحديد الدور">
      <div className="mb-5">
        <Link
          href="/users"
          className="rounded-xl border border-border-soft px-4 py-2 text-sm hover:bg-surface"
        >
          رجوع للمستخدمين
        </Link>
      </div>
      <UserForm mode="create" />
    </DmsShell>
  );
}
