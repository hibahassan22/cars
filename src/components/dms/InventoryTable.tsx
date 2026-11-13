"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { carImage, formatMoney } from "@/data/cars";
import type { Car, CarStatus } from "@/data/types";
import { carStatusLabel, carStatusTone } from "@/lib/labels";

const filters: { key: "all" | CarStatus; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "available", label: "جاهزة للبيع" },
  { key: "reserved", label: "محجوزة" },
  { key: "prep", label: "قيد التجهيز" },
  { key: "sold", label: "مباعة" },
];

export function InventoryTable({ cars }: { cars: Car[] }) {
  const [active, setActive] = useState<"all" | CarStatus>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => ({
      all: cars.length,
      available: cars.filter((c) => c.status === "available").length,
      reserved: cars.filter((c) => c.status === "reserved").length,
      prep: cars.filter((c) => c.status === "prep").length,
      sold: cars.filter((c) => c.status === "sold").length,
    }),
    [cars],
  );

  const list = useMemo(() => {
    const byStatus = active === "all" ? cars : cars.filter((car) => car.status === active);
    const q = query.trim();
    if (!q) return byStatus;
    return byStatus.filter(
      (car) => car.name.includes(q) || car.vin.includes(q) || car.brand.includes(q),
    );
  }, [active, cars, query]);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                active === f.key
                  ? "bg-ink text-white"
                  : "border border-border bg-surface text-muted hover:text-ink"
              }`}
            >
              {f.label} ({counts[f.key]})
            </button>
          ))}
        </div>
        <Link
          href="/inventory/new"
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-ink/90"
        >
          <Plus className="h-4 w-4" />
          إضافة سيارة
        </Link>
      </div>

      <div className="card mb-4 grid gap-3 p-4 md:grid-cols-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent md:col-span-2"
          placeholder="بحث بالاسم أو رقم الشاصي..."
        />
        <select className="rounded-lg border border-border px-3 py-2 text-sm">
          <option>كل الماركات</option>
          <option>مرسيدس</option>
          <option>بورش</option>
          <option>تويوتا</option>
        </select>
        <select className="rounded-lg border border-border px-3 py-2 text-sm">
          <option>كل السنوات</option>
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-background text-muted">
              <tr>
                <th className="px-4 py-3 text-right font-medium">السيارة</th>
                <th className="px-4 py-3 text-right font-medium">المواصفات</th>
                <th className="px-4 py-3 text-right font-medium">التسعير</th>
                <th className="px-4 py-3 text-right font-medium">الحالة</th>
                <th className="px-4 py-3 text-right font-medium">أيام المعرض</th>
                <th className="px-4 py-3 text-right font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {list.map((car) => (
                <tr key={car.id} className="border-t border-border hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md">
                        <Image
                          src={carImage(car)}
                          alt={car.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{car.name}</p>
                        <p className="text-xs text-muted">
                          {car.year} · {car.vin}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {car.body} · {car.fuel}
                    <br />
                    {car.mileage.toLocaleString("en-US")} كم
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-accent">{formatMoney(car.price)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={carStatusLabel[car.status]}
                      tone={carStatusTone[car.status]}
                    />
                  </td>
                  <td className="px-4 py-3">{car.daysInStock} يوم</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/inventory/${car.id}`}
                        className="rounded-md border border-border p-2 hover:bg-background"
                        title="عرض"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/inventory/${car.id}/edit`}
                        className="rounded-md border border-border p-2 hover:bg-background"
                        title="تعديل"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
