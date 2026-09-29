import type { ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed text-fg/90">{children}</p>;
}

export function H({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-2xl text-fg">{children}</h2>;
}
