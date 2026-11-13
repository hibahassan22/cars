import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="shrink-0">
          <p className="font-[family-name:var(--font-cairo)] text-xl font-extrabold text-ink">
            محرك
          </p>
          <p className="text-[10px] font-medium tracking-[0.2em] text-muted uppercase">
            MOHARREK
          </p>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-muted md:flex">
          <Link href="/" className="font-medium text-accent">
            المعرض
          </Link>
          <Link href="/dashboard" className="hover:text-ink">
            لوحة التحكم
          </Link>
          <Link href="/login" className="hover:text-ink">
            حسابي
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              className="w-52 rounded-lg border border-border bg-background py-2 pr-10 pl-3 text-sm outline-none focus:border-accent lg:w-64"
              placeholder="ابحث عن سيارة..."
            />
          </div>
          <button type="button" className="rounded-lg p-2 text-muted hover:bg-background" aria-label="المفضلة">
            <Heart className="h-5 w-5" />
          </button>
          <button type="button" className="rounded-lg p-2 text-muted hover:bg-background" aria-label="الطلبات">
            <ShoppingBag className="h-5 w-5" />
          </button>
          <Link
            href="/login"
            className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </header>
  );
}
