import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Car,
  CircleDollarSign,
  ClipboardList,
  FileDown,
  Package,
} from "lucide-react";
import { DmsShell } from "@/components/dms/DmsShell";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { carImage, cars, formatMoney, getCar } from "@/data/cars";
import { orders } from "@/data/orders";
import { orderStatusLabel, orderStatusTone, paymentLabel } from "@/lib/labels";

const chartMonths = [
  { name: "مايو", a: 42, b: 28, c: 18 },
  { name: "يونيو", a: 50, b: 32, c: 22 },
  { name: "يوليو", a: 68, b: 40, c: 30 },
  { name: "أغسطس", a: 55, b: 36, c: 24 },
  { name: "سبتمبر", a: 72, b: 44, c: 28 },
  { name: "أكتوبر", a: 80, b: 50, c: 34 },
];

export default function DashboardPage() {
  const available = cars.filter((c) => c.status === "available").length;
  const soldMonth = 42;
  const pending = orders.filter((o) => o.status === "partial").length;
  const inventoryValue = cars
    .filter((c) => c.status !== "sold")
    .reduce((sum, c) => sum + c.price, 0);
  const stagnant = cars.filter((c) => c.daysInStock > 40 && c.status !== "sold");

  return (
    <DmsShell>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            لوحة التحكم
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-cairo)] text-3xl font-bold text-ink">
            مرحباً بك، المهندس راشد
          </h1>
          <p className="mt-1.5 text-sm text-muted">ملخص أداء المعرض لآخر 30 يومًا</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="field-input w-auto min-w-[10rem]">
            <option>آخر 30 يومًا</option>
            <option>هذا الشهر</option>
            <option>هذا الربع</option>
          </select>
          <button type="button" className="btn-dark">
            <FileDown className="h-4 w-4" />
            تصدير التقارير
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="إجمالي إيرادات المبيعات"
          value="18,450,000 ر.س"
          trend="+14.2% عن الشهر السابق"
          icon={<CircleDollarSign className="h-4 w-4" />}
        />
        <StatCard
          label="سيارات مباعة هذا الشهر"
          value={`${soldMonth} / 60`}
          hint="نسبة الإنجاز 70%"
          icon={<Car className="h-4 w-4" />}
        >
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-mid">
            <div className="h-full w-[70%] rounded-full bg-gradient-to-l from-accent to-accent-bright" />
          </div>
        </StatCard>
        <StatCard
          label="طلبات معلّقة"
          value={String(pending)}
          hint="تحتاج متابعة عاجلة"
          icon={<ClipboardList className="h-4 w-4" />}
        />
        <StatCard
          label="المخزون المتاح"
          value={`${available} سيارة`}
          hint={`قيمة ${formatMoney(inventoryValue)}`}
          icon={<Package className="h-4 w-4" />}
        />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.55fr_0.85fr_0.9fr]">
        <section className="card p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="section-title">حجم المبيعات والإيرادات</h2>
              <p className="mt-1 text-xs text-muted">تصنيف حسب فئة السيارة</p>
            </div>
            <div className="flex gap-1 rounded-xl bg-surface-low p-1 text-xs font-medium">
              {["أسبوعي", "شهري", "ربع سنوي"].map((tab, i) => (
                <span
                  key={tab}
                  className={`rounded-lg px-3 py-1.5 ${
                    i === 1 ? "bg-accent text-white shadow-sm" : "text-muted"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex h-52 items-end gap-3">
            {chartMonths.map((m) => (
              <div key={m.name} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end justify-center gap-1">
                  <div
                    className="w-2.5 rounded-t-md bg-accent"
                    style={{ height: `${m.a}%` }}
                  />
                  <div
                    className="w-2.5 rounded-t-md bg-accent-bright/75"
                    style={{ height: `${m.b}%` }}
                  />
                  <div
                    className="w-2.5 rounded-t-md bg-surface-mid"
                    style={{ height: `${m.c}%` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-muted">{m.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-4 border-t border-border-soft pt-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 rounded-sm bg-accent" /> SUV فاخرة
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 rounded-sm bg-accent-bright/75" /> سيدان
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 rounded-sm bg-surface-mid" /> كهرباء/هجين
            </span>
          </div>
        </section>

        <section className="card flex flex-col items-center justify-center p-6 text-center">
          <h2 className="section-title">هدف الربع الحالي</h2>
          <div className="relative mt-7 flex h-40 w-40 items-center justify-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                className="text-surface-mid"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#goalGradient)"
                strokeWidth="9"
                strokeDasharray={`${2 * Math.PI * 50 * 0.84} ${2 * Math.PI * 50}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#316bf3" />
                  <stop offset="100%" stopColor="#0051d5" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <p className="font-[family-name:var(--font-cairo)] text-3xl font-bold text-accent">
                84%
              </p>
              <p className="text-xs text-muted">مكتمل</p>
            </div>
          </div>
          <p className="mt-5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-success">
            أداء ممتاز
          </p>
        </section>

        <section className="card p-5">
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-amber-50 p-2 text-warning">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <h2 className="section-title">تنبيهات المخزون</h2>
          </div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {stagnant.length ? (
              stagnant.map((c) => (
                <li
                  key={c.id}
                  className="rounded-2xl border border-amber-200/80 bg-amber-50/80 px-3.5 py-3 text-amber-950"
                >
                  <p className="font-medium">{c.name}</p>
                  <p className="mt-1 text-xs text-amber-800/80">{c.daysInStock} يوم بالمعرض</p>
                </li>
              ))
            ) : (
              <li className="rounded-2xl bg-surface-low px-3 py-3 text-muted">
                لا توجد سيارات راكدة.
              </li>
            )}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border-soft px-5 py-4">
            <div>
              <h2 className="section-title">أحدث الطلبات</h2>
              <p className="mt-1 text-xs text-muted">اضغط عرض الكل لمتابعة كل المبيعات</p>
            </div>
            <Link href="/sales" className="btn-secondary !py-2 text-xs">
              عرض الكل
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table min-w-[760px]">
              <thead>
                <tr>
                  <th>الطلب</th>
                  <th>العميل</th>
                  <th>السيارة</th>
                  <th>الدفع</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => {
                  const car = getCar(order.carId);
                  return (
                    <tr key={order.id}>
                      <td>
                        <Link
                          href={`/sales/${order.id}`}
                          className="font-semibold text-accent hover:underline"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted">{order.phone}</p>
                      </td>
                      <td>
                        {car ? (
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-14 overflow-hidden rounded-xl">
                              <Image
                                src={carImage(car)}
                                alt={car.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <span className="line-clamp-1 font-medium">{car.name}</span>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>{paymentLabel[order.payment]}</td>
                      <td className="font-semibold tabular-nums">
                        {formatMoney(order.amount)}
                      </td>
                      <td>
                        <StatusBadge
                          label={orderStatusLabel[order.status]}
                          tone={orderStatusTone[order.status]}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="section-title">الأكثر مبيعًا هذا الشهر</h2>
          <ul className="mt-5 space-y-5 text-sm">
            {[
              { name: "تويوتا", pct: 33 },
              { name: "مرسيدس", pct: 26 },
              { name: "بي إم دبليو", pct: 19 },
              { name: "لكزس", pct: 14 },
            ].map((item, index) => (
              <li key={item.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-surface-low text-[11px] font-bold text-accent">
                      {index + 1}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="tabular-nums text-muted">{item.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-mid">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-accent to-accent-bright"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DmsShell>
  );
}
