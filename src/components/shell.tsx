import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, AudioLines } from "lucide-react";
import { useState, type ReactNode } from "react";
import { COURSES, LEVELS, LYRA_URL } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemePicker } from "@/components/theme-picker";
import { ThemeSync } from "@/components/theme-sync";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/map", label: "Map" },
  { to: "/practice", label: "Practice" },
  { to: "/patches", label: "Patches" },
  { to: "/bank", label: "Bank" },
  { to: "/glossary", label: "Glossary" },
  { to: "/limits", label: "Limits" },
];

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <ThemeSync />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2 text-gold">
            <AudioLines className="size-5" strokeWidth={1.75} />
            <span className="font-display text-lg leading-none">Sound Design on Lyra-32</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-sm px-3 py-2 text-sm",
                  pathname === n.to ? "text-gold" : "text-muted hover:text-fg",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemePicker />
            </div>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={LYRA_URL} target="_blank" rel="noreferrer">
                Open LYRA
              </a>
            </Button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md border border-line lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-line px-4 py-3 lg:hidden">
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center text-sm text-fg"
                >
                  {n.label}
                </Link>
              ))}
              <a href={LYRA_URL} target="_blank" rel="noreferrer" className="flex h-11 items-center text-sm text-gold">
                Open LYRA
              </a>
              <div className="py-2">
                <ThemePicker />
              </div>
            </nav>
          </div>
        ) : null}
      </header>
      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
        <aside className="sticky top-24 hidden w-52 shrink-0 self-start lg:block">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Curriculum</p>
          <ol className="mt-3 space-y-4">
            {LEVELS.map((lvl) => (
              <li key={lvl.id}>
                <div className="text-xs text-muted">
                  {lvl.id} {lvl.title}
                </div>
                <ul className="mt-1 space-y-0.5">
                  {COURSES.filter((c) => c.level === lvl.id).map((c) => (
                    <li key={c.id}>
                      <CourseLink id={c.id} active={pathname === `/c/${c.id}`} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </aside>
        <div id="main" className="min-w-0 flex-1 pb-16">
          {children}
        </div>
      </div>
      <footer className="border-t border-line py-8 text-center text-xs text-subtle">
        Ray Bridge Digital · lab instrument LYRA-32 · not a VST
      </footer>
    </div>
  );
}

function CourseLink({ id, active }: { id: string; active: boolean }) {
  const done = useProgress((s) => s.done[id as never]);
  const meta = COURSES.find((c) => c.id === id);
  return (
    <Link
      to="/c/$id"
      params={{ id }}
      className={cn("flex items-center gap-2 rounded-sm px-1 py-1 text-sm", active ? "text-gold" : "text-fg/80 hover:text-gold")}
    >
      <span
        className={cn("size-1.5 rounded-full", done ? "bg-ok" : meta?.status === "stub" ? "bg-line" : "bg-gold/50")}
      />
      <span className="font-mono text-[11px] text-subtle">{id}</span>
      <span className="truncate">{meta?.title}</span>
    </Link>
  );
}
