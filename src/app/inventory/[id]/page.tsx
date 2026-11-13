import Link from "next/link";
import { notFound } from "next/navigation";
import { CarGallery } from "@/components/dms/CarGallery";
import { DmsShell } from "@/components/dms/DmsShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/ui/StatCard";
import { cars, formatMoney, getCar } from "@/data/cars";
import { carStatusLabel, carStatusTone } from "@/lib/labels";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export default async function InventoryCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  return (
    <DmsShell title={car.name} subtitle={`${car.year} · ${car.location}`}>
      <div className="mb-5 flex flex-wrap gap-3">
        <Link
          href="/inventory"
          className="rounded-xl border border-border-soft px-4 py-2 text-sm hover:bg-surface"
        >
          رجوع للمخزون
        </Link>
        <Link
          href={`/inventory/${car.id}/edit`}
          className="rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
        >
          تعديل السيارة
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <section className="space-y-5">
          <CarGallery images={car.images} name={car.name} />

          <div className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-muted">سعر البيع</p>
                <p className="mt-1 text-3xl font-bold text-accent">
                  {formatMoney(car.price)}
                </p>
              </div>
              <StatusBadge
                label={carStatusLabel[car.status]}
                tone={carStatusTone[car.status]}
              />
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
              المواصفات
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Spec label="VIN" value={car.vin} />
              <Spec label="الماركة" value={car.brand} />
              <Spec label="السنة" value={String(car.year)} />
              <Spec label="الهيكل" value={car.body} />
              <Spec label="اللون" value={car.color} />
              <Spec label="الممشى" value={`${car.mileage.toLocaleString("en-US")} كم`} />
              <Spec label="الوقود" value={car.fuel} />
              <Spec label="المحرك" value={car.engine} />
              <Spec label="القوة" value={car.power} />
              <Spec label="ناقل الحركة" value={car.transmission} />
              <Spec label="الموقع" value={car.location} />
              <Spec label="أيام المعرض" value={`${car.daysInStock} يوم`} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <StatCard label="سعر البيع" value={formatMoney(car.price)} />
          <div className="card p-5">
            <p className="text-xs text-muted">الحالة</p>
            <div className="mt-3">
              <StatusBadge
                label={carStatusLabel[car.status]}
                tone={carStatusTone[car.status]}
              />
            </div>
          </div>
          <StatCard label="مدة البقاء بالمعرض" value={`${car.daysInStock} يوم`} />
        </section>
      </div>
    </DmsShell>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-soft bg-surface-low p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
