import Link from "next/link";
import { notFound } from "next/navigation";
import { DmsShell } from "@/components/dms/DmsShell";
import { UserForm } from "@/components/dms/UserForm";
import { getStaffUser, staffUsers } from "@/data/users";

export function generateStaticParams() {
  return staffUsers.map((user) => ({ id: user.id }));
}

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getStaffUser(id);
  if (!user) notFound();

  return (
    <DmsShell title="تعديل مستخدم" subtitle={user.name}>
      <div className="mb-5">
        <Link
          href="/users"
          className="rounded-xl border border-border-soft px-4 py-2 text-sm hover:bg-surface"
        >
          رجوع للمستخدمين
        </Link>
      </div>
      <UserForm mode="edit" user={user} />
    </DmsShell>
  );
}
