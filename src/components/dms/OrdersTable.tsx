"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { carImage, formatMoney, getCar } from "@/data/cars";
import type { Order } from "@/data/types";
import { orderStatusLabel, orderStatusTone, paymentLabel } from "@/lib/labels";

export function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();

  return (
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
          {orders.map((order) => {
            const car = getCar(order.carId);
            return (
              <tr
                key={order.id}
                role="link"
                tabIndex={0}
                onClick={() => router.push(`/sales/${order.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/sales/${order.id}`);
                  }
                }}
                className="cursor-pointer"
              >
                <td>
                  <p className="font-semibold text-accent">{order.id}</p>
                  <p className="text-xs text-muted">{order.date}</p>
                </td>
                <td>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-xs text-muted">{order.phone}</p>
                </td>
                <td>
                  {car ? (
                    <div className="flex items-center gap-2">
                      <div className="relative h-9 w-12 overflow-hidden rounded-xl">
                        <Image
                          src={carImage(car)}
                          alt={car.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <span className="line-clamp-1 font-medium">{car.name}</span>
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td>{paymentLabel[order.payment]}</td>
                <td className="font-semibold tabular-nums">{formatMoney(order.amount)}</td>
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
  );
}
