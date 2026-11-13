"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  ChartColumn,
  LayoutDashboard,
  PlusCircle,
  Settings,
  ShoppingCart,
  UserCog,
  Users,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";

const mainLinks = [
  { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/inventory", label: "المخزون", icon: Car },
  { href: "/inventory/new", label: "إضافة سيارة", icon: PlusCircle },
  { href: "/sales", label: "المبيعات", icon: ShoppingCart },
  { href: "/customers", label: "العملاء", icon: Users },
];

const systemLinks = [
  { href: "/users", label: "المستخدمين", icon: UserCog },
  { href: "/reports", label: "التقارير", icon: ChartColumn },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/inventory") {
    return (
      pathname === "/inventory" ||
      (pathname.startsWith("/inventory/") && !pathname.startsWith("/inventory/new"))
    );
  }
  if (href === "/dashboard" || href === "/inventory/new") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavGroup({
  title,
  links,
  pathname,
}: {
  title: string;
  links: typeof mainLinks;
  pathname: string;
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.14em] text-white/35 uppercase">
        {title}
      </p>
      <div className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-accent text-white shadow-[0_8px_20px_-8px_rgba(0,81,213,0.8)]"
                  : "text-sidebar-text hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "opacity-100" : "opacity-80"}`} />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 flex w-[272px] flex-col border-l border-white/5 bg-sidebar text-white">
      <div className="border-b border-white/8 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-bright to-accent font-[family-name:var(--font-cairo)] text-lg font-bold shadow-lg shadow-accent/30">
            M
          </div>
          <div>
            <p className="font-[family-name:var(--font-cairo)] text-lg font-bold leading-none">
              محرك DMS
            </p>
            <p className="mt-1.5 text-[11px] text-sidebar-text">إدارة بيع السيارات</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <NavGroup title="التشغيل" links={mainLinks} pathname={pathname} />
        <NavGroup title="الإدارة" links={systemLinks} pathname={pathname} />
      </nav>

      <div className="border-t border-white/8 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/25 text-sm font-bold text-white">
            م
          </div>
          <Link href="/account" className="min-w-0 flex-1 hover:opacity-90">
            <p className="truncate text-sm font-medium">راشد العتيبي</p>
            <p className="truncate text-xs text-sidebar-text">مدير النظام</p>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
