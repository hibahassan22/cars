import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,81,213,0.12),transparent_40%)]" />
      <main className="relative mx-auto flex min-h-screen max-w-lg items-center px-5 py-12">
        <div className="card w-full p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-[family-name:var(--font-cairo)] font-bold text-white">
              M
            </div>
            <p className="font-[family-name:var(--font-cairo)] text-lg font-bold">محرك DMS</p>
          </div>
          <h1 className="font-[family-name:var(--font-cairo)] text-2xl font-bold">
            استعادة كلمة المرور
          </h1>
          <p className="mt-2 text-sm text-muted">
            أدخل البريد المسجّل وسنرسل رابط إعادة التعيين.
          </p>
          <form className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">البريد الإلكتروني</span>
              <input
                type="email"
                className="w-full rounded-xl border border-border-soft px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="admin@moharrek.sa"
              />
            </label>
            <button
              type="button"
              className="w-full rounded-xl bg-accent py-3 text-sm font-medium text-white hover:bg-accent-hover"
            >
              إرسال رابط الاستعادة
            </button>
            <Link
              href="/login"
              className="block text-center text-sm text-accent hover:underline"
            >
              العودة لتسجيل الدخول
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
}
