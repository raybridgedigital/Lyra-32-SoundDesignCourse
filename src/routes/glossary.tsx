import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/glossary")({ component: GlossaryPage });

const ROWS = [
  ["How hard (pick, stick, tongue, hammer)", "Velocity", "Often routed to amp and cutoff."],
  ["Ring after you stop (open string, cymbal, breath leaving)", "Amp release", "Sustain pedal is one way to hold note-on. Not the only one."],
  ["Tone knob / wah parked", "Filter cutoff", "How much spectrum is allowed to speak."],
  ["Honk at the door", "Resonance / Q", "A peak at cutoff. Colour, then whistle."],
  ["A duet (two players)", "Layer A / B", "A = both. B = B half. Plus-sign names are stacks."],
  ["Hairpin / volume swell", "Shape", "A curve you draw. C8."],
  ["Vibrato / tremolo", "LFO", "dest = dest₀ + depth × lfo. C6."],
  ["Pedalboard / patchbay", "Matrix", "Who is allowed to move whom. C7."],
  ["Choir vs flute vs slide", "Poly / mono / glide", "How many speak, and whether pitch walks. C11."],
  ["Hall / room mic", "Reverb / delay mix", "The room, not the instrument. C5."],
  ["Bright string, overblown flute", "Saw / wavetable pos", "Harmonics to carve. C3, C14."],
  ["Palm mute / covered drum", "Low-pass closed", "Orchestration. C4."],
  ["The score, not the sound", "USB MIDI", "Instructions. Class-compliant keyboard into the tab."],
  ["A take on tape", "Bounce to wav", "LYRA is not a VST. C18."],
];

function GlossaryPage() {
  return (
    <article>
      <h1 className="font-display text-4xl">Glossary</h1>
      <p className="mt-2 max-w-2xl text-muted">A musical picture, then the bench name. Use the instrument that makes the idea obvious.</p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line font-mono text-[10px] uppercase tracking-wider text-subtle">
              <th className="py-2 pr-4">You already know</th>
              <th className="py-2 pr-4">Synth</th>
              <th className="py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]} className="border-b border-line/70">
                <td className="py-3 pr-4 text-gold">{r[0]}</td>
                <td className="py-3 pr-4">{r[1]}</td>
                <td className="py-3 text-muted">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
