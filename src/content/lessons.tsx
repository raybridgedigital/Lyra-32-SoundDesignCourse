import type { ReactNode } from "react";
import type { CourseId } from "@/lib/curriculum";
import { LYRA_URL } from "@/lib/curriculum";
import {
  EnvelopePlot,
  FilterPlot,
  GapBox,
  HarmonicPlot,
  LabBox,
  MidiPathPlot,
  MixPlot,
  RoomPlot,
  SignalPathPlot,
  SweepPlot,
  ThreeTracePlot,
  BipolarPlot,
  MatrixPlot,
  ShapePlot,
  ArpPlot,
  GroovePlot,
  VoiceModePlot,
  DualLayerPlot,
  WavetablePlot,
  MergePlot,
  RatePlot,
  SceneMorphPlot,
  VoiceBudgetPlot,
  BouncePathPlot,
  TranslateMapPlot,
} from "@/components/plots";
import { PatchBankList, StackBankList, TranslationNotes } from "@/components/bank-ui";
import { H, Prose } from "@/components/prose";

export const lessonBody: Partial<Record<CourseId, ReactNode>> = {
  C0: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          The USB keyboard in this lab is a controller, not the instrument. It sends note, velocity, and
          sustain. LYRA makes the sound. That split is the first synth fact:{" "}
          <em>MIDI is instructions, not audio</em> — a score, not a guitar cab.
        </Prose>
        <Prose>
          Velocity is how hard: pick, stick, tongue, or hammer. Sustain is one way to keep a note
          ringing — like an open string or a cymbal left to decay. Layers (a duet) and Shape (a drawn
          swell) come later. Do not open those plates today.
        </Prose>
      </section>
      <MidiPathPlot />
      <section className="space-y-3">
        <H>Listening chain</H>
        <Prose>
          Class-compliant USB MIDI (CK88 when that is the board in front of you). Chrome, Edge, or
          Firefox. Safari does not speak Web MIDI. Open LYRA in a full tab. The first MIDI note unlocks
          audio — browsers require a gesture.
        </Prose>
        <Prose>No computer-key fallback in this course. If MIDI is dead, stop and fix the cable / allow-MIDI prompt.</Prose>
      </section>
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Open{" "}
            <a className="text-gold underline-offset-2 hover:underline" href={LYRA_URL} target="_blank" rel="noreferrer">
              LYRA-32
            </a>{" "}
            in a full Chrome / Edge / Firefox tab.
          </li>
          <li>Plug USB MIDI. Allow MIDI when asked.</li>
          <li>
            Load factory <strong className="text-gold">Init Dual Saw</strong>.
          </li>
          <li>Play a single note, then a triad, then hold with sustain. Name what you hear (hard/soft, dry, two slightly chorused saws) — as you would name a guitar, a flute, or a kit.</li>
          <li>
            Save a User patch named <strong>C0 First Touch</strong>. Do not change a knob first. The save is the skill.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core, not today: audio-rate modulation, wavetable, FM, scenes. They exist on the faceplate so
          you are not lost — they are later rooms. LYRA is not Serum. That is not a defect of this hour.
        </p>
      </GapBox>
    </>
  ),
  C1: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Almost every subtractive synth you will meet is this sentence: an oscillator makes a bright
          raw wave, a filter sculpts which harmonics remain, an amplifier (VCA) decides loudness. Effects
          sit after that — like a hall after a dry guitar, or a room mic after a snare.
        </Prose>
        <Prose>
          Guitar translation (the cleanest picture): pickup = oscillator, tone knob = filter, volume
          knob = amp. A flute is the same wire with different manners: air column, embouchure/tube,
          breath. The names are new. The order is not.
        </Prose>
      </section>
      <SignalPathPlot />
      <MixPlot />
      <section className="space-y-3">
        <H>Simple math</H>
        <Prose>
          Two oscillators are added: <code className="text-gold">y = a + b</code>. That is mix, unison,
          and later dual layer. It is not FM. It is not ring. Do not reuse this picture for those.
        </Prose>
      </section>
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Init Dual Saw</strong>.
          </li>
          <li>Find Osc. Mute one oscillator. Play. Unmute. The wire got simpler, then richer — still the same path.</li>
          <li>Find Filter Cut. Close it until the saw becomes a dark flute. Open it. That is sculpt, not volume.</li>
          <li>
            Leave FX alone. Save <strong>C1 Path Only</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core elsewhere: a second filter in series or parallel; 12 dB vs 24 dB slope (“how fast the door
          shuts”). If LYRA is one-filter / one-slope, still learn the idea — it is a candidate plate, not
          a reason to skip the wire.
        </p>
      </GapBox>
    </>
  ),
  C2: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          A held organ note has almost no biography — it is a switch. A snare does: hit, bloom, gone. A
          flute does: breath in, sit on the note, air leaving. A guitar does: pick, ring, mute. An
          envelope is that biography as four numbers: Attack, Decay, Sustain, Release.
        </Prose>
        <Prose>
          Attack is how long until full loudness — not “more sound.” A pick is fast; a flute tongue can
          be slow. Sustain is a level, not a time: how loud it stays while you hold. Release is the
          ring after you stop — open string, cymbal, breath leaving.
        </Prose>
      </section>
      <EnvelopePlot />
      <section className="space-y-3">
        <H>A second envelope</H>
        <Prose>
          Filter EG is the same shape, routed to cutoff instead of amp. Brightness over time — a wah
          that plays itself once per note. Do not deep-dive Filter EG until Amp EG is honest.
        </Prose>
        <Prose>
          Math: <code className="text-gold">amp = osc × env</code>. When env is 0, silence. When env is
          1, the dry voice. The envelope never creates harmonics; it only opens the door of loudness.
        </Prose>
      </section>
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Warm Field</strong>. Play a chord. Name the attack: pick, mallet, or breath?
          </li>
          <li>Open Amp EG. Lengthen Attack until the chord swells like a slow bow. That is the one change.</li>
          <li>Play short vs held. Hear Release as the ring after you stop.</li>
          <li>
            Save <strong>C2 Slow Attack</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core later: an envelope can be a modulation source to anything (matrix). Looping envelopes and
          drawn Shape curves are C8. Delay-to-open (stage delay) is optional architecture — not required
          to have a voice.
        </p>
      </GapBox>
    </>
  ),
  C3: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Tone is harmonics. FX is the room. If a patch only works with reverb, you do not have a voice
          yet — you have a fog machine. Today every gold FX plate is bypassed.
        </Prose>
        <Prose>
          A sine is one harmonic. A saw is all of them, quieter as they go up. A square is the odd ones.
          Subtractive synths start with a bright wave so the filter has something to eat.
        </Prose>
      </section>
      <HarmonicPlot />
      <MixPlot />
      <section className="space-y-3">
        <H>Detune and unison</H>
        <Prose>
          Two close frequencies beat. That slow loud/soft is chorus without a chorus plugin. Unison is
          several slightly detuned copies — it spends polyphony (C19) and fattens the center. Use it as
          orchestration, not default glue.
        </Prose>
      </section>
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Silk Wake</strong>.
          </li>
          <li>Click the gold nameplates on Ring, Delay, and the rest of the FX rack to bypass (restore later by clicking again if LYRA works that way). Hear dry silk.</li>
          <li>Change one oscillator thing only — mix, detune, or unison. Listen for beats.</li>
          <li>
            Save <strong>C3 Dry Silk</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core idea, different instrument: additive synthesis <em>builds</em> a tone from sines instead
          of carving a saw. LYRA is not an additive synth. The harmonic bar graph is still the same
          truth. PWM (moving pulse width) is a core timbre trick — LYRA can modulate it later via the
          matrix; do not hunt it today.
        </p>
      </GapBox>
    </>
  ),
  C4: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          A filter is orchestration. Closing cutoff is palm-mute on a guitar, a covered drum, a flute
          that will not speak the bright partials. Resonance is not “more filter” — it is a peak at the
          door, a honk, a whistle if you push it.
        </Prose>
        <Prose>
          Low-pass (LP) lets the floor through and shuts the ceiling. High-pass (HP) is the opposite —
          useful for thinning a stack. Band-pass (BP) is a window. Slope (12 vs 24 dB/oct) is how fast
          the door shuts. Learn all four pictures even if the lab has one knob.
        </Prose>
      </section>
      <FilterPlot />
      <SweepPlot />
      <section className="space-y-3">
        <H>You are the modulator</H>
        <Prose>
          Sweep Cut by hand while you hold a chord — a wah you ride. That motion is exactly what an LFO
          will do in C6:{" "}
          <code className="text-gold">cutoff = cutoff₀ + depth × motion</code>. Same merge. Today the
          motion is your wrist.
        </Prose>
      </section>
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Warm Field</strong>.
          </li>
          <li>Hold a chord. Sweep Cut slowly, as if riding a wah, then park it. That parked place is the voicing.</li>
          <li>Add a little resonance until the door honks, then back off until it is a colour, not a whistle.</li>
          <li>
            Save <strong>C4 Parked Cut</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: HP / BP / notch; 12 vs 24 dB; serial vs parallel filters. If LYRA is a single LP-ish
          filter, the other types are still worth knowing — and worth a future plate. Audio-rate filter
          FM (oscillator into cutoff at audio speed) is core and usually missing; it is not this lesson.
        </p>
      </GapBox>
    </>
  ),
  C5: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          The instrument is dry. The hall is FX. You can tell a guitar from a room, a flute from a
          bathroom, a snare from a room mic. Keep that distinction or every patch will be the same
          expensive fog.
        </Prose>
        <Prose>
          Delay = audible copies in time. Reverb = so many copies they become a wash. Chorus/phaser =
          motion on pitch/phase — closer to unison than to a hall. Today: one room. Delay <em>or</em>{" "}
          verb, not both.
        </Prose>
      </section>
      <RoomPlot />
      <section className="space-y-3">
        <H>Stacked load — the plus-sign warning</H>
        <Prose>
          <strong className="text-gold">Warm Field + Sub Current</strong> is two instruments. A = both
          layers. B = B half only. The “+” in the name is the warning. Hear each half before you put
          either in a room.
        </Prose>
      </section>
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Silk Wake</strong>. Confirm it is still a voice dry (or load your C3 Dry Silk).
          </li>
          <li>Turn on one room only — Delay or Verb. Short. Mix low enough that dry attack survives.</li>
          <li>
            Then load <strong className="text-gold">Warm Field + Sub Current</strong>. Switch A / B. Name the field and the current. Do not add a second FX.
          </li>
          <li>
            Save the roomed silk as <strong>C5 Small Hall</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core-to-know: convolution reverb is a photographed room (an impulse). LYRA’s verb is not that.
          Sends vs inserts (a hall on an aux, not glued into the patch) is studio architecture — on a
          single web instrument everything is an insert. Compression as sound design is a later colour,
          not a room.
        </p>
      </GapBox>
    </>
  ),
  C6: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          An LFO is a repeating swell. It is not a new note. It is a slow wave that moves a number
          while you play. Flute vibrato, guitar tremolo, a slow wah: same merge — addition to a
          destination, not mix.
        </Prose>
      </section>
      <ThreeTracePlot />
      <BipolarPlot />
      <RatePlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Warm Field</strong>.
          </li>
          <li>Open LFO 1. Route it to cutoff (or use a matrix slot if the plate does it that way). One destination.</li>
          <li>Set a slow rate. Depth until the door breathes — not until it gargles.</li>
          <li>
            Save <strong>C6 Slow Breath</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: audio-rate modulation (osc into cutoff) is a different picture — new harmonics, not a
          gesture. If LYRA’s LFO tops out below audio, still know the distinction. Sample-and-hold as
          an LFO shape is core noise-as-motion.
        </p>
      </GapBox>
    </>
  ),
  C7: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          The matrix is the patchbay. Who is allowed to move whom, and by how much. It does not make
          tone. Empty slots are honest. Velocity, wheel, aftertouch, LFO, filter EG — sources. Cut,
          amp, pitch, pan, PWM, mix — dests.
        </Prose>
      </section>
      <MatrixPlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Init Dual Saw</strong>.
          </li>
          <li>Clear extra motion in your head. Fill slot 1: Vel → Cut, modest amount. Play hard then soft.</li>
          <li>That is the one wire. Do not fill six slots to feel professional.</li>
          <li>
            Save <strong>C7 One Wire</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: unipolar vs bipolar in the same slot; aftertouch (channel and poly). If a dest is
          listed but silent, it is a bug or a display — the course assumes the live matrix actually
          modulates. Audio-rate sources in a matrix is Eurorack-ish, not required.
        </p>
      </GapBox>
    </>
  ),
  C8: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Shape is a hairpin you draw — guitar volume swell, flute crescendo, a conductor’s arm. Env
          plays it once per note (a custom envelope). Loop plays it again (a custom LFO). From is a
          floor under the whole curve so a swell cannot leak delay at zero.
        </Prose>
      </section>
      <ShapePlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Silk Wake</strong> (or C3 Dry Silk).
          </li>
          <li>Open Shape. Draw one simple swell. Dest Amp or Cut — one only. Env, not Loop, first.</li>
          <li>Play a single note. The curve should be the biography, not a second LFO fight.</li>
          <li>
            Save <strong>C8 Drawn Hairpin</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core elsewhere: MSEG with a dozen nodes, or looping envelopes with tempo sync as a first-class
          clock. LYRA’s factory shapes (Silk, Lift, Pluck…) are starting pencils, not the point — you
          draw.
        </p>
      </GapBox>
    </>
  ),
  C9: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Hold a chord; the instrument speaks it as a figure — guitar picking pattern, flute arpeggio,
          not a second player. The arp is time. The patch is still the tone. If you “fix” a dull arp by
          opening reverb, you have not designed either.
        </Prose>
      </section>
      <ArpPlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Init Dual Saw</strong> (or C1 Path Only).
          </li>
          <li>Arm the arp. Hold a triad from USB MIDI. Latch if you need two hands for the plate.</li>
          <li>Change gate (and maybe octave) — not the oscillators.</li>
          <li>
            Save <strong>C9 Held Figure</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: clock source (internal vs MIDI). Phrase vs true arp. Swing lives next door in Groove.
          Step sequencers with per-step patch changes are architecture, not this plate.
        </p>
      </GapBox>
    </>
  ),
  C10: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Groove is a small band sitting on voices you already designed: note takes plus drum lanes.
          This is the drummer’s lesson. Mute a lane and the hole teaches arrangement. It is not a new
          oscillator.
        </Prose>
      </section>
      <GroovePlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Load a factory groove (or a beat from the groove plate).</li>
          <li>Mute one lane. Hear the hole. Unmute. That is the one change.</li>
          <li>Notice per-track sound (Layer A, B, or a patch) — four sounds at once spend voices (C19).</li>
          <li>
            Save a user sequence named <strong>C10 One Lane Out</strong> if the plate stores sequences
            like patches.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: swing as a time feel, not a plugin. DAW-side clip launching is a different instrument.
          LYRA’s groove is enough to practice arrangement without leaving the tab.
        </p>
      </GapBox>
    </>
  ),
  C11: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Poly is a choir — or a guitar chord. Mono is a flute: one line, last note (or legato) wins.
          Glide is slide guitar, or a singer walking between pitches. How many speak at once, and
          whether pitch steps or walks.
        </Prose>
      </section>
      <VoiceModePlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Init Dual Saw</strong>.
          </li>
          <li>Set mono. Play a fifth as two separate keys, overlapping. Hear steal.</li>
          <li>Turn on glide. Play the same fifth legato. The pitch walks — that is the one change.</li>
          <li>
            Save <strong>C11 Spoken Fifth</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: legato vs retrigger envelopes; unison as a polyphony tax (C19). Portamento time as a
          musical parameter, not a default smear. Paraphony (one filter for many oscs) is a different
          architecture — name it, don’t fake it on LYRA.
        </p>
      </GapBox>
    </>
  ),
  C12: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          A duet. Layer A and Layer B are independent patches, levels, pans — flute over guitar, kit
          over bass. Mute that actually silences. Split is geography on the keyboard; stack is two at
          once.
        </Prose>
      </section>
      <DualLayerPlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Warm Field + Sub Current</strong>. The plus-sign is the
            warning.
          </li>
          <li>
            A = both layers. B = B half only. Mute A, then mute B. Name the field and the current as
            two players.
          </li>
          <li>One change: a level or pan so they sit as a duet, not a smear.</li>
          <li>
            Save <strong>C12 Two Voices</strong> (or store the stack if that is how LYRA names it).
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: keyboard split point as orchestration. Three-plus layers is workstation thinking; two
          is enough to learn the idea. Crossfading layers with the wheel is matrix work (C7).
        </p>
      </GapBox>
    </>
  ),
  C13: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          A stacked library is a set list — not a folder of files. Each stack is a piece: two voices
          with a reason to share a controller. You are programming duets.
        </Prose>
      </section>
      <DualLayerPlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>From your User patches, pick a pad and a bass (or Warm Field and Sub Current).</li>
          <li>Build one named stack. Play it as a piece: bass/current under a field, or flute-like line over a pad — or both.</li>
          <li>Write the plus-sign into the name if LYRA doesn’t.</li>
          <li>
            Save <strong>C13 Recital Pair</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Later (C21): eight stacked performances. Today is one honest pair. Multitimbral DAW racks are
          a different bench.
        </p>
      </GapBox>
    </>
  ),
  C14: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          A wavetable is a filmstrip of spectra. Position chooses which frame is speaking. Scanning is
          orchestration over time. Warp (bend, fold, formant) is a different merge from mix — it bends
          the frame, it does not add a second osc.
        </Prose>
      </section>
      <WavetablePlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Load a factory wavetable voice (any table you can hear moving).</li>
          <li>Move Pos by hand while holding a note. Name three frames: dull, mid, fierce.</li>
          <li>Park Pos where the voice is a piece, not a demo sweep. That is the one change.</li>
          <li>
            Save <strong>C14 Frame Walk</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: dropping your own wav as a user table (LYRA can). Spectral editing and 256-frame 3D
          meshes are Serum-shaped flavor — not required. Modulating Pos with LFO/Shape is C6/C8 applied
          here; do it after the hand walk.
        </p>
      </GapBox>
    </>
  ),
  C15: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          These are different merges from mix. If you reuse the additive picture, you will hear worse
          and feel smarter. FM: the modulator wiggles the carrier’s timing/phase, not its volume.
          Sync: the slave resets when the master cycles — a locked growl. Ring: multiply, metallic
          sum-and-difference.
        </Prose>
      </section>
      <MergePlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">Init Dual Saw</strong>.
          </li>
          <li>Enable one hybrid mode only — FM or sync or ring. Play. Name the merge out loud.</li>
          <li>Turn it off. Hear mix again. That contrast is the lesson.</li>
          <li>
            Save <strong>C15 One Merge</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: 2-operator FM is the atomic idea. DX7 6-op algorithms, operator feedback stacks, and
          through-zero FM are architecture — named, not drilled. Hard sync vs soft sync: hard is the
          picture above. Ring vs AM: AM is unipolar multiply (tremolo-ish at audio rate); ring is
          bipolar multiply.
        </p>
      </GapBox>
    </>
  ),
  C16: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          A scene is a snapshot of the whole instrument — sound and groove — not a clever knob. Guitar:
          an amp channel, or a pedalboard preset. Drums: a kit change. Organ: a registration. Store
          two. Morph is a slow walk between them, a hairpin across the whole bench.
        </Prose>
      </section>
      <SceneMorphPlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Start from a User patch you trust (C5 or C12).</li>
          <li>Store scene 1 as the dry-ish registration. Change one plate (filter or FX mix). Store scene 2.</li>
          <li>Recall 1, then 2. Then morph. Keys 1–8; Shift stores on LYRA.</li>
          <li>
            Leave the pair stored. Name the work <strong>C16 Two Registrations</strong> in your head (and
            in a User patch if scenes do not carry a name).
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: morph as interpolation of many parameters at once (not only cutoff). Eight pads is
          enough for a set. Full song-mode clip launching is DAW architecture.
        </p>
      </GapBox>
    </>
  ),
  C17: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          MIDI is instructions. Audio is the wire to the room. USB-C class-compliant into the tab;
          digital out of the machine into a DAC; amp or phones last. CK88 when that is the board —
          velocity, sustain, later CCs. Still no computer keys.
        </Prose>
      </section>
      <MidiPathPlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Load <strong className="text-gold">C5 Small Hall</strong> (or Silk Wake).
          </li>
          <li>Confirm MIDI: a note, a velocity change, sustain. If any is dead, stop and fix the chain.</li>
          <li>Set the listening chain so you can judge rooms (not laptop-speaker fog if you can help it).</li>
          <li>No User save required. The chain is the work.</li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: MIDI learn (CK88 CCs to knobs, saved in the browser). Audio interface clocking and
          round-trip latency are studio facts, not LYRA plates. Safari still does not speak Web MIDI.
        </p>
      </GapBox>
    </>
  ),
  C18: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          A bounce is a recording of a take, not a score. Backup is the notebook: scenes, maps, user
          patches. A DAW may follow MIDI clock or import the wav. LYRA is not a VST — do not hunt a
          plugin folder.
        </Prose>
      </section>
      <BouncePathPlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Load a User patch. Play a short phrase.</li>
          <li>Bounce: Wav in the header records the output. Keep the file somewhere you will find it.</li>
          <li>Library Backup / Restore. Do this before you experiment with a factory dump.</li>
          <li>If you use a DAW: clock follow or the bounced wav — pick one for today.</li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Honest limit: not a plugin, not sample-accurate inside a DAW mixer. That is why bounce
          exists. Stem-export of separate layers is extra architecture; bounce is the stereo take.
        </p>
      </GapBox>
    </>
  ),
  C19: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Thirty-two voices is a choir with a payroll. Unison multiplies. Dual layer multiplies. Leave
          cymbals ringing, or a guitar’s open strings, and the quiet ones get stolen — that is
          orchestration, not a crash. Watch the header count.
        </Prose>
      </section>
      <VoiceBudgetPlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Load a dense stack (Warm Field + Sub Current, or C13).</li>
          <li>Hold a cluster and let it ring. Watch the voice count. Add unison if you have it. Hear steal.</li>
          <li>Lift. Thin the voicing (fewer notes, less unison) until the choir is honest.</li>
          <li>
            Save <strong>C19 Soft Choir</strong>.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Core: voice stealing policy (oldest, quietest). CPU vs voice count on a web synth — the tab
          can also run out of time, not only voices. Oversampling and aliasing are DSP; skip.
        </p>
      </GapBox>
    </>
  ),
  C20: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Ten patches is a book, not a dump. One idea each. A folder of ten pieces in one handwriting —
          guitar, flute, kit, or keys, as the patch demands. Reuse your User saves from C0–C15; rewrite
          any that were only homework.
        </Prose>
      </section>
      <PatchBankList />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>On LYRA, make or rename ten User patches to match the roles. Tick them here as they exist.</li>
          <li>Play the book in order. If two patches are the same idea, kill one and write a new one.</li>
          <li>Backup the library (C18) when the ten are real.</li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          A hundred factory era sounds is not your voice. Ten named decisions are. Expansion packs are
          someone else’s book.
        </p>
      </GapBox>
    </>
  ),
  C21: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Eight stacked performances are a set list. Each stack is a piece: two voices with a reason.
          Plus-sign in the name. A = both, B = B half only. Do not stack to make one patch louder.
        </Prose>
      </section>
      <StackBankList />
      <DualLayerPlot />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Build eight stacks from the ten-patch book. Tick each role when you would actually play it.</li>
          <li>One of them must be “your recital” — the piece, not the demo.</li>
          <li>Backup again.</li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          Nine-layer workstations and Kontakt instruments are different recitals. Two layers is the
          LYRA form. If you need a third voice, that is a gap worth naming, maybe a future plate.
        </p>
      </GapBox>
    </>
  ),
  C22: (
    <>
      <section className="space-y-3">
        <H>Concept</H>
        <Prose>
          Pick a record. Transcribe it onto this bench. Path, envelope, dry tone, room, motion, time,
          architecture. Get seventy percent. Write the thirty percent you cannot clone — that list is
          technique, not failure. Honesty is the last lesson.
        </Prose>
      </section>
      <TranslateMapPlot />
      <TranslationNotes />
      <LabBox>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Choose one record you know in the body. Loop a four-bar phrase.</li>
          <li>Load the closest User patch. Walk the eight questions. Change one plate at a time.</li>
          <li>Stop at 70%. Fill the box with what LYRA (or this hour) cannot do.</li>
          <li>
            Save <strong>C22 Translation</strong>. Keep the 30% list.
          </li>
        </ol>
      </LabBox>
      <GapBox>
        <p>
          You will want Serum, a choir sample, convolution air, a 6-op bell, or a sampled acoustic.
          Name them. Then either add a plate to LYRA later, sit at another tool on purpose, or write
          music with the 70% you have — which is already a voice.
        </p>
      </GapBox>
    </>
  ),
};
