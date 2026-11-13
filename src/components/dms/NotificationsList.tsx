"use client";

import Link from "next/link";
import { useState } from "react";
import {
  notifications as initialNotifications,
  type NotificationItem,
} from "@/data/notifications";

const typeLabel: Record<NotificationItem["type"], string> = {
  order: "طلب",
  inventory: "مخزون",
  system: "نظام",
};

export function NotificationsList() {
  const [items, setItems] = useState(initialNotifications);

  function markAllRead() {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  }

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  }

  const unread = items.filter((item) => !item.read).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {unread > 0 ? `${unread} إشعار غير مقروء` : "لا توجد إشعارات جديدة"}
        </p>
        <button
          type="button"
          onClick={markAllRead}
          className="rounded-xl border border-border-soft px-3 py-2 text-sm hover:bg-surface-low"
          disabled={unread === 0}
        >
          تعليم الكل كمقروء
        </button>
      </div>

      <ul className="card divide-y divide-border-soft overflow-hidden">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              onClick={() => markRead(item.id)}
              className={`block px-5 py-4 transition hover:bg-surface-low/70 ${
                item.read ? "bg-surface" : "bg-surface-low/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {!item.read ? (
                      <span className="h-2 w-2 rounded-full bg-accent" />
                    ) : null}
                    <p className="font-medium text-ink">{item.title}</p>
                    <span className="rounded-full bg-surface-mid px-2 py-0.5 text-[11px] text-muted">
                      {typeLabel[item.type]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">{item.time}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
