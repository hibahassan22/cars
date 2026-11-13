"use client";

import { useState } from "react";
import { getBranch } from "@/data/branches";
import { roleLabel, type StaffUser } from "@/data/users";

export function AccountForm({ user }: { user: StaffUser }) {
  const branch = getBranch(user.branchId);
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaved(true);
  }

  function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!password.next || password.next !== password.confirm) {
      setPasswordError("تأكيد كلمة المرور غير متطابق");
      setPasswordSaved(false);
      return;
    }
    setPasswordError("");
    setPasswordSaved(true);
    setPassword({ current: "", next: "", confirm: "" });
  }

  return (
    <div className="space-y-5">
      <section className="card p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-xl font-bold text-white">
            {profile.name.slice(0, 1)}
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-cairo)] text-xl font-bold">
              {profile.name}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {roleLabel(user.roleId)}
              {branch ? ` · ${branch.name}` : ""}
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={saveProfile} className="card grid gap-4 p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
          بياناتي
        </h2>
        <Field
          label="الاسم"
          value={profile.name}
          onChange={(v) => {
            setProfile((p) => ({ ...p, name: v }));
            setProfileSaved(false);
          }}
        />
        <Field
          label="البريد"
          value={profile.email}
          onChange={(v) => {
            setProfile((p) => ({ ...p, email: v }));
            setProfileSaved(false);
          }}
        />
        <Field
          label="الجوال"
          value={profile.phone}
          onChange={(v) => {
            setProfile((p) => ({ ...p, phone: v }));
            setProfileSaved(false);
          }}
        />
        <div className="rounded-xl border border-border-soft bg-surface-low px-3 py-2.5 text-sm">
          <p className="text-xs text-muted">الدور</p>
          <p className="mt-1 font-medium">{roleLabel(user.roleId)}</p>
        </div>
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            حفظ البيانات
          </button>
          {profileSaved ? (
            <span className="text-sm text-success">تم حفظ بيانات الحساب</span>
          ) : null}
        </div>
      </form>

      <form onSubmit={savePassword} className="card grid gap-4 p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-[family-name:var(--font-cairo)] text-lg font-bold">
          تغيير كلمة المرور
        </h2>
        <Field
          label="كلمة المرور الحالية"
          type="password"
          value={password.current}
          onChange={(v) => {
            setPassword((p) => ({ ...p, current: v }));
            setPasswordSaved(false);
            setPasswordError("");
          }}
        />
        <div className="hidden md:block" />
        <Field
          label="كلمة المرور الجديدة"
          type="password"
          value={password.next}
          onChange={(v) => {
            setPassword((p) => ({ ...p, next: v }));
            setPasswordSaved(false);
            setPasswordError("");
          }}
        />
        <Field
          label="تأكيد كلمة المرور"
          type="password"
          value={password.confirm}
          onChange={(v) => {
            setPassword((p) => ({ ...p, confirm: v }));
            setPasswordSaved(false);
            setPasswordError("");
          }}
        />
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-ink/90"
          >
            تحديث كلمة المرور
          </button>
          {passwordError ? (
            <span className="text-sm text-danger">{passwordError}</span>
          ) : null}
          {passwordSaved ? (
            <span className="text-sm text-success">تم تحديث كلمة المرور</span>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
