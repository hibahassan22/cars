import { DmsShell } from "@/components/dms/DmsShell";
import { OrdersTable } from "@/components/dms/OrdersTable";
import { StatCard } from "@/components/ui/StatCard";
import { orders } from "@/data/orders";

export default function SalesPage() {
  const partial = orders.filter((o) => o.status === "partial").length;
  const completed = orders.filter((o) => o.status === "completed").length;
  const cash = orders.filter((o) => o.payment === "cash").length;

  return (
    <DmsShell title="المبيعات والطلبات" subtitle="متابعة طلبات البيع وحالة كل معاملة">
      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="طلبات جزئية" value={String(partial)} />
        <StatCard label="طلبات مكتملة" value={String(completed)} />
        <StatCard label="دفع نقدي" value={String(cash)} />
        <StatCard label="مبيعات الشهر" value="14,850,000 ر.س" dark hint="85% من هدف الربع" />
      </div>

      <section className="card overflow-hidden">
        <div className="border-b border-border-soft px-5 py-4">
          <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
            قائمة الطلبات
          </h2>
          <p className="mt-1 text-sm text-muted">اضغط على أي طلب لعرض التفاصيل</p>
        </div>
        <OrdersTable orders={orders} />
      </section>
    </DmsShell>
  );
}
