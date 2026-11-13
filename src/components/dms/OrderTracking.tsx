"use client";

import { Download, Printer } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Order, OrderStatus } from "@/data/types";
import { orderStatusLabel, orderStatusTone, paymentLabel } from "@/lib/labels";

const trackSteps = [
  {
    id: "received",
    label: "استلام الطلب",
    detail: "تم تسجيل الطلب في النظام",
  },
  {
    id: "partial",
    label: "دفعة جزئية",
    detail: "العميل بدأ الدفع",
  },
  {
    id: "paid",
    label: "اكتمال الدفع",
    detail: "تم سداد كامل المبلغ",
  },
  {
    id: "delivered",
    label: "تسليم السيارة",
    detail: "الطلب مكتمل وتم التسليم",
  },
] as const;

function stepState(status: OrderStatus, stepId: (typeof trackSteps)[number]["id"]) {
  if (status === "completed") {
    return "done";
  }
  // partial
  if (stepId === "received" || stepId === "partial") return stepId === "partial" ? "current" : "done";
  return "todo";
}

export function OrderTracking({
  order,
  carName,
}: {
  order: Order;
  carName?: string;
}) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [saved, setSaved] = useState(false);

  const currentLabel = useMemo(() => {
    if (status === "completed") return "الطلب واصل لمرحلة التسليم واكتمل";
    return "الطلب واصل لمرحلة الدفعة الجزئية";
  }, [status]);

  function saveStatus() {
    setSaved(true);
  }

  function handlePrint() {
    window.print();
  }

  function handleExport() {
    const lines = [
      `رقم الطلب: ${order.id}`,
      `التاريخ: ${order.date}`,
      `العميل: ${order.customer}`,
      `الجوال: ${order.phone}`,
      `السيارة: ${carName ?? order.carId}`,
      `الدفع: ${paymentLabel[order.payment]}`,
      `المبلغ: ${order.amount} ر.س`,
      `الحالة: ${orderStatusLabel[status]}`,
      `تتبع: ${currentLabel}`,
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4 print:space-y-3">
      <div className="flex flex-wrap gap-2 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-xl border border-border-soft bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface-low"
        >
          <Printer className="h-4 w-4" />
          طباعة
        </button>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-ink/90"
        >
          <Download className="h-4 w-4" />
          تصدير
        </button>
      </div>

      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
              تتبع الطلب
            </h2>
            <p className="mt-1 text-sm text-muted">{currentLabel}</p>
          </div>
          <StatusBadge
            label={orderStatusLabel[status]}
            tone={orderStatusTone[status]}
          />
        </div>

        <ol className="mt-6 space-y-0">
          {trackSteps.map((step, index) => {
            const state = stepState(status, step.id);
            const isLast = index === trackSteps.length - 1;
            return (
              <li key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      state === "done"
                        ? "bg-accent text-white"
                        : state === "current"
                          ? "bg-warning text-white"
                          : "bg-surface-mid text-muted"
                    }`}
                  >
                    {state === "done" ? "✓" : index + 1}
                  </span>
                  {!isLast ? (
                    <span
                      className={`my-1 w-0.5 flex-1 min-h-8 ${
                        state === "done" ? "bg-accent" : "bg-border-soft"
                      }`}
                    />
                  ) : null}
                </div>
                <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                  <p
                    className={`text-sm font-medium ${
                      state === "todo" ? "text-muted" : "text-ink"
                    }`}
                  >
                    {step.label}
                    {state === "current" ? (
                      <span className="mr-2 text-xs text-warning">الحالي</span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="card p-5 print:hidden">
        <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
          تحديث الحالة
        </h2>
        <p className="mt-1 text-sm text-muted">غيّر حالة الطلب حسب تقدّم الدفع والتسليم</p>
        <label className="mt-4 block text-sm">
          <span className="mb-1.5 block text-muted">الحالة</span>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as OrderStatus);
              setSaved(false);
            }}
            className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option value="partial">جزئي</option>
            <option value="completed">مكتمل</option>
          </select>
        </label>
        <button
          type="button"
          onClick={saveStatus}
          className="mt-4 w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
        >
          حفظ الحالة
        </button>
        {saved ? (
          <p className="mt-2 text-sm text-success">تم تحديث حالة الطلب</p>
        ) : null}
      </div>
    </div>
  );
}
