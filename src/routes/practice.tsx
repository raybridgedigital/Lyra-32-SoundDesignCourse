import { createFileRoute } from "@tanstack/react-router";
import { LYRA_URL } from "@/lib/curriculum";
import { LabBox } from "@/components/plots";

export const Route = createFileRoute("/practice")({ component: PracticePage });

function PracticePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-4xl">How to practice</h1>
      <p className="text-muted">Two tabs. Course on the left (this). LYRA on the right. USB MIDI into LYRA.</p>
      <ol className="list-decimal space-y-3 pl-5 leading-relaxed">
        <li>Open the lesson. Read concept and move the graph until the caption is obvious.</li>
        <li>
          Open{" "}
          <a className="text-gold underline-offset-2 hover:underline" href={LYRA_URL} target="_blank" rel="noreferrer">
            LYRA
          </a>
          . Full Chrome / Edge / Firefox tab. Allow MIDI.
        </li>
        <li>Load the named factory or stack. Hear it. Name it in musical language before you touch a knob.</li>
        <li>Change one thing — the lesson names it. Nothing else.</li>
        <li>Save a User patch with the given name. That file is your notebook.</li>
        <li>Say the exit check out loud. If you cannot, do the drill again, not the next lesson.</li>
      </ol>
      <LabBox>
        <p>
          Stacked load: <strong>A = both layers</strong>. <strong>B = B half only</strong>. A plus-sign in
          the patch name is the warning that you are hearing two instruments at once.
        </p>
      </LabBox>
      <section className="space-y-3">
        <h2 className="font-display text-2xl">USB MIDI</h2>
        <p className="leading-relaxed">
          Class-compliant keyboard. CK88 when that is the board — sustain, velocity, later CCs. This
          course does not use computer keys. If the browser blocks MIDI, that is the lesson until it
          doesn’t.
        </p>
      </section>
    </article>
  );
}
