"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { staffUsers } from "@/data/users";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@moharrek.sa");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user = staffUsers.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
    );

    window.setTimeout(() => {
      if (!user || !user.active) {
        setError("البريد غير مسجّل أو الحساب موقوف");
        setLoading(false);
        return;
      }
      if (password.trim().length < 4) {
        setError("كلمة المرور غير صحيحة");
        setLoading(false);
        return;
      }

      const session = {
        userId: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
      };
      if (remember) {
        localStorage.setItem("moharrek_session", JSON.stringify(session));
      } else {
        sessionStorage.setItem("moharrek_session", JSON.stringify(session));
        localStorage.removeItem("moharrek_session");
      }

      router.push("/dashboard");
    }, 400);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">البريد الإلكتروني</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          placeholder="admin@moharrek.sa"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 flex items-center justify-between text-muted">
          كلمة المرور
          <Link href="/forgot-password" className="text-accent hover:underline">
            نسيت كلمة المرور؟
          </Link>
        </span>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full rounded-xl border border-border-soft bg-surface px-3 py-2.5 pl-10 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </label>

      <label className="flex items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="rounded border-border"
        />
        تذكرني على هذا الجهاز
      </label>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-accent py-3 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-70"
      >
        {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
      </button>

      <p className="rounded-xl bg-surface-low px-3 py-2 text-xs text-muted">
        للتجربة: <span className="font-medium text-ink">admin@moharrek.sa</span> /{" "}
        <span className="font-medium text-ink">123456</span>
      </p>
    </form>
  );
}
