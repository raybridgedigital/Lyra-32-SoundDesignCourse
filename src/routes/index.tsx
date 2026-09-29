import { createFileRoute, Link } from "@tanstack/react-router";
import { COURSES, LEVELS, LYRA_URL } from "@/lib/curriculum";
import { Button } from "@/components/ui/button";
import { SignalPathPlot } from "@/components/plots";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const ready = COURSES.filter((c) => c.status === "ready");
  return (
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Ray Bridge Digital</p>
      <h1 className="mt-3 font-display text-5xl leading-[1.05] text-fg sm:text-6xl">Sound Design on Lyra-32</h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        A course in synthesizer sound design for a musician. Piano, guitar, flute, drums — pick the
        picture that makes the idea obvious. LYRA-32 is the lab bench, not the subject. If LYRA can
        test a claim, you test it there. If it cannot, the page says so.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/c/$id" params={{ id: "C0" }}>
            Start C0 — First hour
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={LYRA_URL} target="_blank" rel="noreferrer">
            Open the lab
          </a>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link to="/map">Full map</Link>
        </Button>
      </div>

      <div className="mt-12">
        <SignalPathPlot />
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="font-display text-3xl">How a lesson works</h2>
        <ol className="space-y-3 text-sm leading-relaxed text-fg/90">
          <li>
            <strong className="text-gold">Concept.</strong> A musical picture first — whichever instrument
            teaches it — then the synth name. One new plate on the bench.
          </li>
          <li>
            <strong className="text-gold">Picture.</strong> A graph you can move. Mix is add. Envelope is
            multiply. Modulation is add-to-a-number. We do not reuse those pictures.
          </li>
          <li>
            <strong className="text-gold">Lab.</strong> USB MIDI only. Load a named factory or stack. Change
            one thing. Save a User patch.
          </li>
          <li>
            <strong className="text-gold">Gap.</strong> If the idea is core and LYRA is thin, it is named —
            not faked, not skipped.
          </li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl">The map</h2>
        <p className="mt-2 text-sm text-muted">C0–C22 is written. L7 is your bank, not more plates.</p>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {ready.map((c) => (
            <li key={c.id}>
              <Link to="/c/$id" params={{ id: c.id }} className="flex items-baseline justify-between gap-4 py-3 hover:text-gold">
                <span>
                  <span className="font-mono text-xs text-subtle">{c.id}</span>{" "}
                  <span className="ml-2">{c.title}</span>
                </span>
                <span className="text-xs text-muted">{LEVELS.find((l) => l.id === c.level)?.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
