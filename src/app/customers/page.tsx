import { DmsShell } from "@/components/dms/DmsShell";
import { StatCard } from "@/components/ui/StatCard";
import { formatMoney } from "@/data/cars";
import { customers } from "@/data/customers";

export default function CustomersPage() {
  return (
    <DmsShell title="العملاء" subtitle="عملاء المعرض وطلباتهم">
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <StatCard label="إجمالي العملاء" value={String(customers.length)} />
        <StatCard
          label="طلبات مرتبطة"
          value={String(customers.reduce((sum, c) => sum + c.orders, 0))}
        />
      </div>

      <section className="card overflow-hidden">
        <div className="border-b border-border-soft px-5 py-4">
          <input
            className="w-full max-w-md rounded-xl border border-border-soft bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="بحث بالاسم أو الجوال..."
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-surface-low text-muted">
              <tr>
                <th className="px-4 py-3 text-right font-medium">العميل</th>
                <th className="px-4 py-3 text-right font-medium">المدينة</th>
                <th className="px-4 py-3 text-right font-medium">الطلبات</th>
                <th className="px-4 py-3 text-right font-medium">الإنفاق</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-border-soft hover:bg-surface-low/70"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-xs text-muted">
                      {customer.phone} · {customer.email}
                    </p>
                  </td>
                  <td className="px-4 py-3">{customer.city}</td>
                  <td className="px-4 py-3">{customer.orders}</td>
                  <td className="px-4 py-3">{formatMoney(customer.spend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DmsShell>
  );
}
