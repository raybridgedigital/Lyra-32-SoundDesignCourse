import { create } from "zustand";
import { persist } from "zustand/middleware";

export const THEMES = [
  {
    id: "score" as const,
    label: "Score",
    hint: "Warm paper. Daytime reading.",
  },
  {
    id: "night" as const,
    label: "Night",
    hint: "Low-glare charcoal. Evening study.",
  },
  {
    id: "faceplate" as const,
    label: "Faceplate",
    hint: "LYRA gold on dark.",
  },
];

export type ThemeId = (typeof THEMES)[number]["id"];

type ThemeState = {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
};

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "score",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "lyra-course-theme" },
  ),
);

export function applyTheme(theme: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}

export type PlotPalette = {
  accent: string;
  fg: string;
  muted: string;
  line: string;
  warn: string;
};

export function readPlotPalette(): PlotPalette {
  if (typeof document === "undefined") {
    return { accent: "#2f6f5e", fg: "#2a2620", muted: "#6b6458", line: "#d7cfc3", warn: "#b54a32" };
  }
  const s = getComputedStyle(document.documentElement);
  const v = (n: string, fb: string) => s.getPropertyValue(n).trim() || fb;
  return {
    accent: v("--color-gold", "#2f6f5e"),
    fg: v("--color-fg", "#2a2620"),
    muted: v("--color-muted", "#6b6458"),
    line: v("--color-line", "#d7cfc3"),
    warn: v("--color-warn", "#b54a32"),
  };
}
