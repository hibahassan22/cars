import Link from "next/link";
import { DmsShell } from "@/components/dms/DmsShell";

const steps = ["بيانات أساسية", "مواصفات", "تسعير", "صور"];

export default function NewCarPage() {
  return (
    <DmsShell title="إضافة سيارة" subtitle="أدخل بيانات السيارة ثم انشرها في المخزون">
      <div className="mb-6 flex flex-wrap gap-2">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`rounded-full px-3 py-1.5 text-sm ${
              index === 0 ? "bg-accent text-white" : "border border-border bg-surface text-muted"
            }`}
          >
            {index + 1}. {step}
          </div>
        ))}
      </div>

      <form className="space-y-5">
        <section className="card grid gap-4 p-5 md:grid-cols-2">
          <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
            1. البيانات الأساسية
          </h2>
          <Field label="رقم الشاصي (VIN)" placeholder="W1K..." />
          <Field label="الماركة" placeholder="مرسيدس-بنز" />
          <Field label="الموديل" placeholder="S500 4MATIC" />
          <Field label="سنة الصنع" placeholder="2024" />
          <Field label="الفئة" placeholder="AMG Line" />
          <Field label="نوع الهيكل" placeholder="سيدان / SUV" />
          <Field label="الممشى (كم)" placeholder="4000" />
          <Field label="اللون" placeholder="أسود أوبسيديان" />
        </section>

        <section className="card grid gap-4 p-5 md:grid-cols-2">
          <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
            2. المواصفات
          </h2>
          <Field label="المحرك" placeholder="3.0L Twin-Turbo" />
          <Field label="القوة" placeholder="429 حصان" />
          <Field label="ناقل الحركة" placeholder="أوتوماتيك" />
          <Field label="الوقود" placeholder="بنزين / كهرباء" />
        </section>

        <section className="card grid gap-4 p-5 md:grid-cols-2">
          <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
            3. التسعير
          </h2>
          <Field label="سعر البيع" placeholder="595000" />
        </section>

        <section className="card p-5">
          <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">4. الصور</h2>
          <div className="mt-4 rounded-lg border border-dashed border-border bg-background px-4 py-10 text-center text-sm text-muted">
            اسحب صور السيارة هنا أو اختر من الجهاز
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-hover"
          >
            حفظ ونشر
          </button>
          <button
            type="button"
            className="rounded-lg border border-border bg-surface px-5 py-3 text-sm font-medium"
          >
            حفظ كمسودة
          </button>
          <Link
            href="/inventory"
            className="rounded-lg px-5 py-3 text-sm font-medium text-muted hover:text-ink"
          >
            إلغاء
          </Link>
        </div>
      </form>
    </DmsShell>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        className="w-full rounded-lg border border-border px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        placeholder={placeholder}
      />
    </label>
  );
}
