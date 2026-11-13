import Link from "next/link";
import { DmsShell } from "@/components/dms/DmsShell";
import { branches } from "@/data/branches";
import { ImagePlus } from "lucide-react";

const weekDays = [
  { day: "السبت", from: "10:00", to: "22:00", closed: false },
  { day: "الأحد", from: "10:00", to: "22:00", closed: false },
  { day: "الاثنين", from: "10:00", to: "22:00", closed: false },
  { day: "الثلاثاء", from: "10:00", to: "22:00", closed: false },
  { day: "الأربعاء", from: "10:00", to: "22:00", closed: false },
  { day: "الخميس", from: "10:00", to: "23:00", closed: false },
  { day: "الجمعة", from: "16:00", to: "23:00", closed: false },
];

const socialLinks = [
  { label: "إنستغرام", placeholder: "https://instagram.com/moharrek", value: "https://instagram.com/moharrek" },
  { label: "تويتر / X", placeholder: "https://x.com/moharrek", value: "https://x.com/moharrek" },
  { label: "سناب شات", placeholder: "https://snapchat.com/add/moharrek", value: "" },
  { label: "تيك توك", placeholder: "https://tiktok.com/@moharrek", value: "" },
  { label: "يوتيوب", placeholder: "https://youtube.com/@moharrek", value: "" },
  { label: "واتساب", placeholder: "https://wa.me/966500000000", value: "https://wa.me/966500000000" },
];

export default function SettingsPage() {
  return (
    <DmsShell title="إعدادات المعرض" subtitle="هوية المتجر، التواصل، وأوقات العمل">
      <div className="mb-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
        >
          حفظ التغييرات
        </button>
        <button
          type="button"
          className="rounded-xl border border-border-soft bg-surface px-4 py-2.5 text-sm font-medium"
        >
          إلغاء
        </button>
      </div>

      <section className="card p-5">
        <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
          بيانات المعرض
        </h2>

        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-surface-low">
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
                <ImagePlus className="h-7 w-7 text-accent" />
                <span className="text-xs">اللوجو</span>
              </div>
            </div>
            <button
              type="button"
              className="rounded-xl border border-border-soft px-3 py-1.5 text-sm hover:bg-surface-low"
            >
              تغيير اللوجو
            </button>
          </div>

          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <Field label="اسم المتجر" defaultValue="محرك لبيع السيارات" />
            <Field label="رقم التواصل" defaultValue="920000000" />
          </div>
        </div>
      </section>

      <section className="card mt-5 overflow-hidden">
        <div className="border-b border-border-soft px-5 py-4">
          <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
            أوقات العمل بالأيام
          </h2>
          <p className="mt-1 text-sm text-muted">حدد ساعات الفتح والإغلاق لكل يوم</p>
        </div>
        <ul className="divide-y divide-border-soft">
          {weekDays.map((item) => (
            <li
              key={item.day}
              className="grid grid-cols-1 items-center gap-3 px-5 py-3 sm:grid-cols-[7rem_1fr_1fr_auto]"
            >
              <p className="font-medium text-ink">{item.day}</p>
              <label className="block text-sm">
                <span className="mb-1 block text-xs text-muted">من</span>
                <input
                  type="time"
                  defaultValue={item.from}
                  className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-xs text-muted">إلى</span>
                <input
                  type="time"
                  defaultValue={item.to}
                  className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-muted sm:justify-end">
                <input type="checkbox" defaultChecked={item.closed} className="rounded border-border" />
                مغلق
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="card mt-5 p-5">
        <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">
          روابط وسائل التواصل
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {socialLinks.map((link) => (
            <Field
              key={link.label}
              label={link.label}
              defaultValue={link.value}
              placeholder={link.placeholder}
            />
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-cairo)] text-lg font-bold">الفروع</h2>
          <Link
            href="/settings/branches/new"
            className="rounded-xl bg-ink px-3 py-2 text-sm font-medium text-white hover:bg-ink/90"
          >
            إضافة فرع
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {branches.map((branch) => (
            <article key={branch.id} className="card p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">{branch.name}</h3>
                  <p className="mt-1 text-sm text-muted">{branch.city}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    branch.active
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {branch.active ? "نشط" : "متوقف"}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted">المدير: {branch.manager}</p>
              <p className="mt-1 text-sm text-muted">السعة: {branch.capacity} سيارة</p>
              <p className="mt-1 text-sm text-muted" dir="ltr">
                {branch.phone}
              </p>
              <Link
                href={`/settings/branches/${branch.id}/edit`}
                className="mt-4 inline-flex rounded-xl border border-border-soft px-3 py-1.5 text-sm hover:bg-surface-low"
              >
                تعديل
              </Link>
            </article>
          ))}
        </div>
      </section>
    </DmsShell>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
