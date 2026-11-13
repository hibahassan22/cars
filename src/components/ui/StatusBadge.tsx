const tones = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
} as const;

type Tone = keyof typeof tones;

export function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === "success"
            ? "bg-emerald-500"
            : tone === "warning"
              ? "bg-amber-500"
              : tone === "info"
                ? "bg-blue-500"
                : tone === "danger"
                  ? "bg-red-500"
                  : "bg-slate-400"
        }`}
      />
      {label}
    </span>
  );
}
