import { DmsShell } from "@/components/dms/DmsShell";
import { StatCard } from "@/components/ui/StatCard";
import { formatMoney } from "@/data/cars";
import { customers } from "@/data/customers";

const months = [
  { name: "مايو", sales: 2.1 },
  { name: "يونيو", sales: 2.4 },
  { name: "يوليو", sales: 3.1 },
  { name: "أغسطس", sales: 2.8 },
  { name: "سبتمبر", sales: 3.4 },
  { name: "أكتوبر", sales: 3.9 },
];

export default function ReportsPage() {
  const max = Math.max(...months.map((m) => m.sales));
  const totalSpend = customers.reduce((sum, c) => sum + c.spend, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);

  return (
    <DmsShell title="التقارير" subtitle="ملخص المبيعات وتقرير العملاء">
      <div className="mb-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white"
        >
          تصدير Excel
        </button>
        <button
          type="button"
          className="rounded-lg border border-border-soft bg-surface px-4 py-2.5 text-sm font-medium"
        >
          تصدير PDF
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="إيرادات الربع" value="18.4M ر.س" trend="+14.2%" />
        <StatCard label="سيارات مباعة" value="42" hint="من أصل هدف 60" />
        <StatCard label="عدد العملاء" value={String(customers.length)} />
        <StatCard label="طلبات العملاء" value={String(totalOrders)} />
      </div>

      <section className="card mt-6 p-5">
        <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
          المبيعات الشهرية (مليون ر.س)
        </h2>
        <div className="mt-6 flex h-56 items-end gap-3">
          {months.map((month) => (
            <div key={month.name} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-accent/90"
                style={{ height: `${(month.sales / max) * 100}%` }}
                title={`${month.sales}M`}
              />
              <span className="text-xs text-muted">{month.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-soft bg-surface px-5 py-4">
          <div>
            <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
              تقرير العملاء
            </h2>
            <p className="mt-1 text-sm text-muted">مرتّب حسب أعلى إنفاق</p>
          </div>
          <div className="rounded-xl bg-surface-low px-4 py-2 text-sm">
            <span className="text-muted">إجمالي الإنفاق</span>
            <span className="mr-2 font-bold text-accent">{formatMoney(totalSpend)}</span>
          </div>
        </div>

        <div className="hidden grid-cols-[minmax(0,2.2fr)_7rem_8.5rem_5rem_8.5rem] gap-3 border-b border-border-soft bg-surface-low px-5 py-3 text-xs font-medium text-muted sm:grid">
          <span>العميل</span>
          <span>المدينة</span>
          <span>الجوال</span>
          <span className="text-center">الطلبات</span>
          <span className="text-left">الإنفاق</span>
        </div>

        <ul className="divide-y divide-border-soft">
          {[...customers]
            .sort((a, b) => b.spend - a.spend)
            .map((customer, index) => (
              <li
                key={customer.id}
                className="grid grid-cols-1 items-center gap-3 px-5 py-4 transition hover:bg-surface-low/60 sm:grid-cols-[minmax(0,2.2fr)_7rem_8.5rem_5rem_8.5rem]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{customer.name}</p>
                    <p className="truncate text-xs text-muted">{customer.email}</p>
                  </div>
                </div>
                <p className="text-sm text-ink">
                  <span className="ml-1 text-xs text-muted sm:hidden">المدينة:</span>
                  {customer.city}
                </p>
                <p className="text-sm tabular-nums text-ink" dir="ltr">
                  <span className="ml-1 text-xs text-muted sm:hidden">الجوال:</span>
                  {customer.phone}
                </p>
                <p className="text-sm sm:text-center">
                  <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-surface-mid px-2.5 py-1 text-xs font-semibold text-ink">
                    {customer.orders}
                  </span>
                </p>
                <p className="text-sm font-bold tabular-nums text-accent sm:text-left">
                  {formatMoney(customer.spend)}
                </p>
              </li>
            ))}
        </ul>
      </section>
    </DmsShell>
  );
}
