"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Branch } from "@/data/branches";

type BranchFormValues = {
  name: string;
  city: string;
  address: string;
  manager: string;
  phone: string;
  capacity: string;
  active: boolean;
};

const emptyValues: BranchFormValues = {
  name: "",
  city: "",
  address: "",
  manager: "",
  phone: "",
  capacity: "40",
  active: true,
};

export function BranchForm({
  branch,
  mode,
}: {
  branch?: Branch;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<BranchFormValues>(
    branch
      ? {
          name: branch.name,
          city: branch.city,
          address: branch.address,
          manager: branch.manager,
          phone: branch.phone,
          capacity: String(branch.capacity),
          active: branch.active,
        }
      : emptyValues,
  );

  function update<K extends keyof BranchFormValues>(
    key: K,
    value: BranchFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    router.push("/settings");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <section className="card grid gap-4 p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
          {mode === "create" ? "بيانات الفرع الجديد" : "تعديل بيانات الفرع"}
        </h2>
        <Field
          label="اسم الفرع"
          value={form.name}
          onChange={(v) => update("name", v)}
          placeholder="الفرع الرئيسي"
          required
        />
        <Field
          label="المدينة"
          value={form.city}
          onChange={(v) => update("city", v)}
          placeholder="الرياض"
          required
        />
        <label className="block text-sm md:col-span-2">
          <span className="mb-1.5 block text-muted">العنوان</span>
          <input
            required
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="الحي، الشارع..."
            className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
        <Field
          label="مدير الفرع"
          value={form.manager}
          onChange={(v) => update("manager", v)}
          placeholder="اسم المدير"
          required
        />
        <Field
          label="رقم التواصل"
          value={form.phone}
          onChange={(v) => update("phone", v)}
          placeholder="01xxxxxxxx"
          required
        />
        <Field
          label="السعة (عدد السيارات)"
          value={form.capacity}
          onChange={(v) => update("capacity", v)}
          placeholder="40"
          required
        />
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => update("active", e.target.checked)}
            className="rounded border-border"
          />
          الفرع نشط
        </label>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-hover"
        >
          {mode === "create" ? "إضافة الفرع" : "حفظ التعديلات"}
        </button>
        <Link
          href="/settings"
          className="rounded-xl border border-border-soft px-5 py-3 text-sm font-medium hover:bg-surface"
        >
          إلغاء
        </Link>
        {saved ? (
          <span className="text-sm text-success">
            {mode === "create" ? "تمت الإضافة" : "تم الحفظ"}
          </span>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
