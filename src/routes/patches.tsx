import { createFileRoute } from "@tanstack/react-router";
import { NAMED_PATCHES } from "@/lib/curriculum";
import { GapBox } from "@/components/plots";

export const Route = createFileRoute("/patches")({ component: PatchesPage });

function PatchesPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="font-display text-4xl">Named patches</h1>
      <p className="mt-2 text-muted">
        Only these names are assigned in the first slice. If a name is missing on the live instrument,
        load the closest analog and write the real name in your User save.
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {NAMED_PATCHES.map((p) => (
          <li key={p.name} className="py-4">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl text-gold">{p.name}</h2>
              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">{p.kind}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{p.use}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <GapBox>
          <p>
            Factory names can move as LYRA updates. The course cares about the role (dry init, warm pad,
            sub layer, silk, stack), not a frozen bank index.
          </p>
        </GapBox>
      </div>
    </article>
  );
}
