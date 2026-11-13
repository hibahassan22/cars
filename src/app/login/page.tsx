import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,81,213,0.16),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(19,27,46,0.12),transparent_35%)]" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-10 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-[0_20px_50px_-20px_rgba(13,28,46,0.25)] lg:grid-cols-2">
          <section className="bg-sidebar p-8 text-white lg:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent font-[family-name:var(--font-cairo)] text-lg font-bold">
                M
              </div>
              <div>
                <p className="font-[family-name:var(--font-cairo)] text-xl font-bold leading-none">
                  محرك DMS
                </p>
                <p className="mt-1.5 text-xs text-sidebar-text">نظام إدارة بيع السيارات</p>
              </div>
            </div>

            <h1 className="mt-10 font-[family-name:var(--font-cairo)] text-3xl font-bold leading-relaxed sm:text-4xl">
              أهلاً بعودتك إلى لوحة المعرض
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-sidebar-text">
              سجّل دخولك لمتابعة المخزون، الطلبات، العملاء، والتقارير من مكان واحد.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-white/85">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
                إدارة السيارات والمبيعات
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
                تتبع الطلبات وتحديث حالتها
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
                صلاحيات المستخدمين حسب الدور
              </li>
            </ul>
          </section>

          <section className="p-8 lg:p-10">
            <h2 className="font-[family-name:var(--font-cairo)] text-2xl font-bold text-ink">
              تسجيل الدخول
            </h2>
            <p className="mt-2 text-sm text-muted">ادخل بيانات حساب فريق المعرض</p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
