import Link from "next/link";
import { notFound } from "next/navigation";
import { CarGallery } from "@/components/dms/CarGallery";
import { DmsShell } from "@/components/dms/DmsShell";
import { OrderTracking } from "@/components/dms/OrderTracking";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/ui/StatCard";
import { formatMoney, getCar } from "@/data/cars";
import { getOrder, orders } from "@/data/orders";
import {
  carStatusLabel,
  carStatusTone,
  orderStatusLabel,
  orderStatusTone,
  paymentLabel,
} from "@/lib/labels";

export function generateStaticParams() {
  return orders.map((order) => ({ id: order.id }));
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();

  const car = getCar(order.carId);

  return (
    <DmsShell title={`تفاصيل الطلب ${order.id}`} subtitle={order.date}>
      <div className="mb-5 flex flex-wrap items-center gap-3 print:hidden">
        <Link
          href="/sales"
          className="rounded-xl border border-border-soft px-4 py-2 text-sm hover:bg-surface"
        >
          رجوع للمبيعات
        </Link>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <StatusBadge
          label={orderStatusLabel[order.status]}
          tone={orderStatusTone[order.status]}
        />
        <span className="rounded-full border border-border-soft bg-surface px-3 py-1 text-sm">
          {paymentLabel[order.payment]}
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <section className="space-y-5">
          {car ? (
            <>
              <div className="print:hidden">
                <CarGallery images={car.images} name={car.name} />
              </div>
              <div className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-[family-name:var(--font-cairo)] text-xl font-bold">
                      {car.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {car.year} · {car.location}
                    </p>
                  </div>
                  <StatusBadge
                    label={carStatusLabel[car.status]}
                    tone={carStatusTone[car.status]}
                  />
                </div>
              </div>
              <div className="card p-5 print:hidden">
                <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
                  مواصفات السيارة
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Spec label="VIN" value={car.vin} />
                  <Spec label="اللون" value={car.color} />
                  <Spec label="الهيكل" value={car.body} />
                  <Spec label="الممشى" value={`${car.mileage.toLocaleString("en-US")} كم`} />
                  <Spec label="الوقود" value={car.fuel} />
                  <Spec label="المحرك" value={car.engine} />
                  <Spec label="القوة" value={car.power} />
                  <Spec label="ناقل الحركة" value={car.transmission} />
                </div>
              </div>
            </>
          ) : (
            <div className="card p-5 text-muted">السيارة غير موجودة في المخزون.</div>
          )}
        </section>

        <section className="space-y-4">
          <OrderTracking order={order} carName={car?.name} />

          <StatCard label="مبلغ الطلب" value={formatMoney(order.amount)} />

          <div className="card p-5">
            <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
              بيانات العميل
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">الاسم</dt>
                <dd className="font-medium">{order.customer}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">الجوال</dt>
                <dd className="font-medium" dir="ltr">
                  {order.phone}
                </dd>
              </div>
            </dl>
          </div>

          <div className="card p-5">
            <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
              بيانات الطلب
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">رقم الطلب</dt>
                <dd className="font-medium">{order.id}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">التاريخ</dt>
                <dd className="font-medium">{order.date}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">الدفع</dt>
                <dd className="font-medium">{paymentLabel[order.payment]}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">الحالة</dt>
                <dd>
                  <StatusBadge
                    label={orderStatusLabel[order.status]}
                    tone={orderStatusTone[order.status]}
                  />
                </dd>
              </div>
            </dl>
          </div>

          {car ? (
            <Link
              href={`/inventory/${car.id}`}
              className="flex w-full items-center justify-center rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm font-medium hover:bg-surface-low print:hidden"
            >
              عرض السيارة في المخزون
            </Link>
          ) : null}
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
