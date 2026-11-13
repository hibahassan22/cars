"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Car, CarStatus } from "@/data/types";
import { carStatusLabel } from "@/lib/labels";

const statuses = Object.keys(carStatusLabel) as CarStatus[];

export function CarEditForm({ car }: { car: Car }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: car.name,
    brand: car.brand,
    year: String(car.year),
    vin: car.vin,
    body: car.body,
    fuel: car.fuel,
    mileage: String(car.mileage),
    price: String(car.price),
    status: car.status,
    color: car.color,
    power: car.power,
    engine: car.engine,
    transmission: car.transmission,
    location: car.location,
    image1: car.images[0],
    image2: car.images[1],
    image3: car.images[2],
  });

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    router.push(`/inventory/${car.id}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <section className="card grid gap-4 p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
          البيانات الأساسية
        </h2>
        <Field label="اسم السيارة" value={form.name} onChange={(v) => update("name", v)} />
        <Field label="الماركة" value={form.brand} onChange={(v) => update("brand", v)} />
        <Field label="السنة" value={form.year} onChange={(v) => update("year", v)} />
        <Field label="رقم الشاصي" value={form.vin} onChange={(v) => update("vin", v)} />
        <Field label="الموقع" value={form.location} onChange={(v) => update("location", v)} />
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">الحالة</span>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
            className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {carStatusLabel[status]}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="card grid gap-4 p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
          المواصفات
        </h2>
        <Field label="الهيكل" value={form.body} onChange={(v) => update("body", v)} />
        <Field label="اللون" value={form.color} onChange={(v) => update("color", v)} />
        <Field label="الممشى (كم)" value={form.mileage} onChange={(v) => update("mileage", v)} />
        <Field label="الوقود" value={form.fuel} onChange={(v) => update("fuel", v)} />
        <Field label="المحرك" value={form.engine} onChange={(v) => update("engine", v)} />
        <Field label="القوة" value={form.power} onChange={(v) => update("power", v)} />
        <Field
          label="ناقل الحركة"
          value={form.transmission}
          onChange={(v) => update("transmission", v)}
        />
      </section>

      <section className="card grid gap-4 p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
          التسعير
        </h2>
        <Field label="سعر البيع (ر.س)" value={form.price} onChange={(v) => update("price", v)} />
      </section>

      <section className="card grid gap-4 p-5">
        <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
          الصور (3)
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Field
            label="صورة الواجهة"
            value={form.image1}
            onChange={(v) => update("image1", v)}
          />
          <Field
            label="صورة الجانب"
            value={form.image2}
            onChange={(v) => update("image2", v)}
          />
          <Field
            label="صورة المقصورة"
            value={form.image3}
            onChange={(v) => update("image3", v)}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[form.image1, form.image2, form.image3].map((src, i) => (
            <div
              key={i}
              className="aspect-[16/10] overflow-hidden rounded-xl border border-border-soft bg-surface-low"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-hover"
        >
          حفظ التعديلات
        </button>
        <Link
          href={`/inventory/${car.id}`}
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
