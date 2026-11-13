import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  trend,
  dark,
  icon,
  children,
}: {
  label: string;
  value: string;
  hint?: string;
  trend?: string;
  dark?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div
      className={`card relative overflow-hidden p-5 ${
        dark ? "border-transparent bg-sidebar text-white" : "bg-surface"
      }`}
    >
      {dark ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(49,107,243,0.35),transparent_45%)]" />
      ) : null}
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p
            className={`text-[11px] font-semibold tracking-wide uppercase ${
              dark ? "text-sidebar-text" : "text-muted"
            }`}
          >
            {label}
          </p>
          {icon ? (
            <span
              className={`rounded-xl p-2 ${
                dark ? "bg-white/10 text-white" : "bg-surface-low text-accent"
              }`}
            >
              {icon}
            </span>
          ) : null}
        </div>
        <p className="mt-3 font-[family-name:var(--font-cairo)] text-[1.65rem] font-bold leading-none tracking-tight tabular-nums">
          {value}
        </p>
        {trend ? (
          <p
            className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
              dark ? "bg-emerald-400/15 text-emerald-300" : "bg-emerald-50 text-success"
            }`}
          >
            {trend}
          </p>
        ) : null}
        {hint ? (
          <p className={`mt-2 text-sm ${dark ? "text-white/55" : "text-muted"}`}>{hint}</p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
