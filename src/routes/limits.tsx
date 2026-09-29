import { createFileRoute } from "@tanstack/react-router";
import { GapBox } from "@/components/plots";

export const Route = createFileRoute("/limits")({ component: LimitsPage });

function LimitsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-4xl">Honest limits</h1>
      <p className="text-lg text-muted">
        The subject is sound design. The bench is LYRA. Missing knobs are named, not faked, and not
        treated as the whole art.
      </p>
      <section className="space-y-2">
        <h2 className="font-display text-2xl">LYRA is</h2>
        <p className="leading-relaxed">
          Dual-osc VA, wavetable, filter, envelopes, dual LFO, matrix, Shape, FX rack, dual layer,
          arp, groove, scenes, 32 voices, USB MIDI, bounce. A real instrument in a browser tab.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="font-display text-2xl">LYRA is not</h2>
        <p className="leading-relaxed">
          Serum or Vital depth. DX7 6-operator algorithms. Eurorack. A VST. Additive, granular,
          spectral, or a sampler. Those are named when they are core ideas. They are not drilled until
          the bench has a plate — or you sit at another tool on purpose.
        </p>
      </section>
      <GapBox>
        <p>
          Core even if thin or absent: filter types and slope, PWM, 2-op FM, audio-rate vs control-rate,
          unipolar vs bipolar, serial/parallel filters, noise + S&H, sub osc, waveshaping, voice
          stealing. Flavor (kept off the main map): 6-op stacks, granular, convolution as a design
          method, full modular culture, MPE as a prerequisite, DSP internals.
        </p>
      </GapBox>
      <p className="text-sm text-muted">
        Math stops at mix, multiply-by-envelope, and dest = dest₀ + depth × source. No chip design.
      </p>
    </article>
  );
}
