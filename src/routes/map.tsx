import { createFileRoute, Link } from "@tanstack/react-router";
import { COURSES, LEVELS } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/map")({ component: MapPage });

function MapPage() {
  const done = useProgress((s) => s.done);
  return (
    <div>
      <h1 className="font-display text-4xl">Map</h1>
      <p className="mt-2 max-w-2xl text-muted">
        C0–C22. The path is locked; the pictures are not — use whichever instrument makes the idea obvious.
      </p>
      <div className="mt-10 space-y-10">
        {LEVELS.map((lvl) => (
          <section key={lvl.id}>
            <h2 className="font-display text-2xl">
              {lvl.id} {lvl.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{lvl.intent}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {COURSES.filter((c) => c.level === lvl.id).map((c) => (
                <Link
                  key={c.id}
                  to="/c/$id"
                  params={{ id: c.id }}
                  className={cn(
                    "rounded-lg border p-4 transition-colors",
                    c.status === "ready" ? "border-gold/35 bg-panel hover:border-gold" : "border-line bg-surface hover:border-muted",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-gold">{c.id}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                      {done[c.id] ? "done" : c.status}
                    </span>
                  </div>
                  <div className="mt-1 font-display text-xl">{c.title}</div>
                  <div className="mt-1 text-xs text-muted">{c.plate}</div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
