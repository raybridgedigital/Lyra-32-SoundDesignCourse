import { THEMES, type ThemeId, useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemePicker() {
  const theme = useTheme((s) => s.theme);
  const setTheme = useTheme((s) => s.setTheme);
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Color profile">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          title={`${t.label} — ${t.hint}`}
          aria-pressed={theme === t.id}
          onClick={() => setTheme(t.id as ThemeId)}
          className={cn(
            "h-9 rounded-sm border px-2.5 text-[11px] uppercase tracking-wider",
            theme === t.id ? "border-gold bg-gold/12 text-gold" : "border-line text-muted hover:text-fg",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
