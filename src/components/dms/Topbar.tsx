import Link from "next/link";
import { Bell, Search, UserRound } from "lucide-react";
import { unreadCount } from "@/data/notifications";

export function Topbar({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  const unread = unreadCount();

  return (
    <header className="sticky top-0 z-30 border-b border-border-soft/80 bg-surface/80 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3 px-5 py-3.5 lg:px-8">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            className="w-full rounded-2xl border border-transparent bg-surface-low py-2.5 pr-10 pl-4 text-sm outline-none transition focus:border-accent/30 focus:bg-surface focus:ring-4 focus:ring-accent/10"
            placeholder="ابحث برقم الشاصي، العميل أو المعاملة..."
          />
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="relative rounded-2xl border border-border-soft bg-surface p-2.5 text-muted shadow-sm transition hover:border-accent/20 hover:text-accent"
            aria-label="الإشعارات"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 ? (
              <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white shadow">
                {unread}
              </span>
            ) : null}
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 rounded-2xl border border-border-soft bg-surface px-3 py-2 text-sm font-medium text-ink shadow-sm transition hover:border-accent/20"
            aria-label="حسابي"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-surface-low text-accent">
              <UserRound className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">حسابي</span>
          </Link>
        </div>
      </div>
      {(title || subtitle) && (
        <div className="border-t border-border-soft/80 px-5 py-4 lg:px-8">
          {title ? (
            <h1 className="font-[family-name:var(--font-cairo)] text-2xl font-bold text-ink">
              {title}
            </h1>
          ) : null}
          {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
        </div>
      )}
    </header>
  );
}
