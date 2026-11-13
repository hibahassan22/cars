import Link from "next/link";
import { DmsShell } from "@/components/dms/DmsShell";
import { StatCard } from "@/components/ui/StatCard";
import { getBranch } from "@/data/branches";
import {
  permissionLabels,
  permissionsList,
  roleLabel,
  roles,
  staffUsers,
  type RoleId,
} from "@/data/users";

export default function UsersPage() {
  const activeCount = staffUsers.filter((u) => u.active).length;
  const roleIds = Object.keys(roles) as RoleId[];

  return (
    <DmsShell title="المستخدمين والصلاحيات" subtitle="إدارة فريق المعرض وأدوار الوصول">
      <div className="mb-5 flex justify-end">
        <Link
          href="/users/new"
          className="rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-ink/90"
        >
          إضافة مستخدم
        </Link>
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <StatCard label="إجمالي المستخدمين" value={String(staffUsers.length)} />
        <StatCard label="حسابات نشطة" value={String(activeCount)} />
        <StatCard label="الأدوار" value={String(roleIds.length)} />
      </div>

      <section className="card overflow-hidden">
        <div className="border-b border-border-soft px-5 py-4">
          <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
            فريق العمل
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] table-fixed text-sm">
            <thead className="bg-surface-low text-muted">
              <tr>
                <th className="w-[28%] px-4 py-3 text-right font-medium">المستخدم</th>
                <th className="w-[18%] px-4 py-3 text-right font-medium">الدور</th>
                <th className="w-[18%] px-4 py-3 text-right font-medium">الفرع</th>
                <th className="w-[14%] px-4 py-3 text-right font-medium">الحالة</th>
                <th className="w-[12%] px-4 py-3 text-right font-medium">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {staffUsers.map((user) => {
                const branch = getBranch(user.branchId);
                return (
                  <tr
                    key={user.id}
                    className="border-t border-border-soft hover:bg-surface-low/70"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                      <p className="text-xs text-muted" dir="ltr">
                        {user.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-surface-mid px-2.5 py-1 text-xs font-medium text-ink">
                        {roleLabel(user.roleId)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {branch ? `${branch.name}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          user.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.active ? "نشط" : "موقوف"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/users/${user.id}/edit`}
                        className="rounded-xl border border-border-soft px-3 py-1.5 text-sm hover:bg-surface-low"
                      >
                        تعديل
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card mt-6 overflow-hidden">
        <div className="border-b border-border-soft px-5 py-4">
          <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
            مصفوفة الصلاحيات
          </h2>
          <p className="mt-1 text-sm text-muted">
            كل دور يحدد ما يمكن للمستخدم الوصول إليه
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-surface-low text-muted">
              <tr>
                <th className="px-4 py-3 text-right font-medium">الصلاحية</th>
                {roleIds.map((roleId) => (
                  <th key={roleId} className="px-4 py-3 text-center font-medium">
                    {roleLabel(roleId)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionsList.map((permission) => (
                <tr key={permission} className="border-t border-border-soft">
                  <td className="px-4 py-3 font-medium">
                    {permissionLabels[permission]}
                  </td>
                  {roleIds.map((roleId) => {
                    const allowed = roles[roleId].permissions.includes(permission);
                    return (
                      <td key={roleId} className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                            allowed
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {allowed ? "✓" : "—"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DmsShell>
  );
}
