import { Link } from "@tanstack/react-router";
import { COURSES, LEVELS, LYRA_URL, neighbors, type CourseMeta } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { GapBox, LabBox, OkNote } from "@/components/plots";
import { lessonBody } from "@/content/lessons";

export function LessonPage({ id }: { id: string }) {
  const meta = COURSES.find((c) => c.id === id);
  if (!meta) {
    return (
      <div>
        <h1 className="text-3xl">Unknown lesson</h1>
        <Link to="/map" className="mt-4 inline-block text-gold">
          Back to map
        </Link>
      </div>
    );
  }
  const level = LEVELS.find((l) => l.id === meta.level);
  const { prev, next } = neighbors(meta.id);
  const done = useProgress((s) => s.done[meta.id]);
  const mark = useProgress((s) => s.mark);
  const unmark = useProgress((s) => s.unmark);
  const body = lessonBody[meta.id];

  return (
    <article className="mx-auto max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
        {meta.level} {level?.title} · {meta.id}
        {meta.status === "stub" ? " · not written yet" : ""}
      </p>
      <h1 className="mt-2 font-display text-4xl text-fg sm:text-5xl">{meta.title}</h1>
      <p className="mt-3 text-muted">{meta.blurb}</p>

      <dl className="mt-6 grid grid-cols-1 gap-3 rounded-lg border border-line bg-surface p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">New plate</dt>
          <dd className="mt-1">{meta.plate}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">Hear first</dt>
          <dd className="mt-1">{meta.hearFirst}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">Load</dt>
          <dd className="mt-1 text-gold">{meta.load}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">Save as</dt>
          <dd className="mt-1">{meta.save}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild>
          <a href={LYRA_URL} target="_blank" rel="noreferrer">
            Open LYRA
          </a>
        </Button>
        <Button
          type="button"
          variant={done ? "outline" : "outline"}
          onClick={() => (done ? unmark(meta.id) : mark(meta.id))}
        >
          {done ? "Marked done" : "Mark lesson done"}
        </Button>
      </div>

      <div className="mt-10 space-y-8">{body ?? <StubBody meta={meta} />}</div>

      <div className="mt-10">
        <OkNote>{meta.exitCheck}</OkNote>
      </div>

      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6 text-sm">
        {prev ? (
          <Link to="/c/$id" params={{ id: prev.id }} className="text-muted hover:text-gold">
            ← {prev.id} {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to="/c/$id" params={{ id: next.id }} className="text-gold">
            {next.id} {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

function StubBody({ meta }: { meta: CourseMeta }) {
  return (
    <>
      <section>
        <h2 className="text-2xl">Coming in the next slice</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The map is locked. This lesson exists so you can see where the idea sits. Do not skip ahead on the
          bench until C0–C5 are in the fingers.
        </p>
      </section>
      <LabBox>
        <p>
          Later drill: load <strong className="text-gold">{meta.load}</strong>, change one thing (
          {meta.change}), save <strong>{meta.save}</strong>.
        </p>
      </LabBox>
    </>
  );
}
