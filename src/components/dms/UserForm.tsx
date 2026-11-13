"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { branches } from "@/data/branches";
import {
  permissionLabels,
  permissionsList,
  roleLabel,
  roles,
  type RoleId,
  type StaffUser,
} from "@/data/users";

type FormState = {
  name: string;
  email: string;
  phone: string;
  roleId: RoleId;
  branchId: string;
  active: boolean;
};

export function UserForm({
  user,
  mode,
}: {
  user?: StaffUser;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<FormState>(
    user
      ? {
          name: user.name,
          email: user.email,
          phone: user.phone,
          roleId: user.roleId,
          branchId: user.branchId,
          active: user.active,
        }
      : {
          name: "",
          email: "",
          phone: "",
          roleId: "sales",
          branchId: branches[0]?.id ?? "b1",
          active: true,
        },
  );

  const selectedRole = roles[form.roleId];

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    router.push("/users");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <section className="card grid gap-4 p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
          {mode === "create" ? "بيانات المستخدم" : "تعديل المستخدم"}
        </h2>
        <Field
          label="الاسم"
          value={form.name}
          onChange={(v) => update("name", v)}
          required
        />
        <Field
          label="البريد"
          value={form.email}
          onChange={(v) => update("email", v)}
          required
        />
        <Field
          label="الجوال"
          value={form.phone}
          onChange={(v) => update("phone", v)}
          required
        />
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">الفرع</span>
          <select
            value={form.branchId}
            onChange={(e) => update("branchId", e.target.value)}
            className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name} — {branch.city}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">الصلاحية / الدور</span>
          <select
            value={form.roleId}
            onChange={(e) => update("roleId", e.target.value as RoleId)}
            className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            {(Object.keys(roles) as RoleId[]).map((roleId) => (
              <option key={roleId} value={roleId}>
                {roleLabel(roleId)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => update("active", e.target.checked)}
            className="rounded border-border"
          />
          الحساب نشط
        </label>
      </section>

      <section className="card p-5">
        <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
          صلاحيات الدور: {selectedRole.label}
        </h2>
        <p className="mt-1 text-sm text-muted">{selectedRole.description}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {permissionsList.map((permission) => {
            const allowed = selectedRole.permissions.includes(permission);
            return (
              <div
                key={permission}
                className={`rounded-xl border px-3 py-2.5 text-sm ${
                  allowed
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-border-soft bg-surface-low text-muted"
                }`}
              >
                {permissionLabels[permission]}
                <span className="mr-2 text-xs">{allowed ? "مفعّل" : "غير متاح"}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-hover"
        >
          {mode === "create" ? "إضافة المستخدم" : "حفظ التعديلات"}
        </button>
        <Link
          href="/users"
          className="rounded-xl border border-border-soft px-5 py-3 text-sm font-medium hover:bg-surface"
        >
          إلغاء
        </Link>
        {saved ? <span className="text-sm text-success">تم الحفظ</span> : null}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
