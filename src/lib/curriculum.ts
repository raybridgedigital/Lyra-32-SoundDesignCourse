export type LevelId = "L0" | "L1" | "L2" | "L3" | "L4" | "L5" | "L6" | "L7";
export type CourseId =
  | "C0"
  | "C1"
  | "C2"
  | "C3"
  | "C4"
  | "C5"
  | "C6"
  | "C7"
  | "C8"
  | "C9"
  | "C10"
  | "C11"
  | "C12"
  | "C13"
  | "C14"
  | "C15"
  | "C16"
  | "C17"
  | "C18"
  | "C19"
  | "C20"
  | "C21"
  | "C22";

export type CourseStatus = "ready" | "stub";

export type CourseMeta = {
  id: CourseId;
  level: LevelId;
  title: string;
  plate: string;
  status: CourseStatus;
  hearFirst: string;
  load: string;
  change: string;
  save: string;
  exitCheck: string;
  blurb: string;
};

export const LYRA_URL = "https://raybridgedigital.github.io/lyra-32/";

export const LEVELS: { id: LevelId; title: string; intent: string }[] = [
  { id: "L0", title: "Orientation", intent: "Sit down. MIDI in. Hear one sound. Save it." },
  { id: "L1", title: "Foundation", intent: "The wire: oscillator, filter, amp, time-shape, dry tone." },
  { id: "L2", title: "Core design", intent: "Filter as voicing. FX as the room — not the instrument." },
  { id: "L3", title: "Motion", intent: "LFO, matrix, Shape — repeating and drawn hairpins." },
  { id: "L4", title: "Time", intent: "Arp, groove, poly / mono / glide." },
  { id: "L5", title: "Architecture", intent: "Dual layer, stacked library, wavetable, hybrid (FM, sync, ring)." },
  { id: "L6", title: "Stage", intent: "Scenes, MIDI + CK88 audio path, bounce, 32 voices." },
  { id: "L7", title: "Original bank", intent: "Ten patches, eight stacks, translate a record, name what you cannot clone." },
];

export const COURSES: CourseMeta[] = [
  {
    id: "C0",
    level: "L0",
    title: "First hour",
    plate: "Header, library, USB MIDI",
    status: "ready",
    hearFirst: "MIDI is a score. LYRA is the instrument that plays it. Velocity is how hard — pick, stick, tongue, or hammer.",
    load: "Init Dual Saw",
    change: "Play. Find Save. Do not touch any other plate.",
    save: "C0 First Touch",
    exitCheck: "I can get sound from USB MIDI, load a factory patch, and save a User patch.",
    blurb: "Plug in. Allow MIDI. Load Init Dual Saw. Hear it. Save it.",
  },
  {
    id: "C1",
    level: "L1",
    title: "Signal path",
    plate: "Osc → Filter → Amp",
    status: "ready",
    hearFirst: "Guitar: pickup makes the raw wave, tone knob sculpts it, volume is loudness. Same wire as osc → filter → amp.",
    load: "Init Dual Saw",
    change: "Mute one oscillator, then open Cut.",
    save: "C1 Path Only",
    exitCheck: "Sound is made, then sculpted, then loud — in that order.",
    blurb: "Everything later is a decoration on this wire.",
  },
  {
    id: "C2",
    level: "L1",
    title: "Envelopes",
    plate: "Amp EG (Filter EG as a second shape)",
    status: "ready",
    hearFirst: "A snare has a biography: hit, bloom, gone. A flute has another: breath in, hold, air leaving. ADSR writes that shape.",
    load: "Warm Field",
    change: "Slow the Amp attack until the note swells instead of clicking.",
    save: "C2 Slow Attack",
    exitCheck: "Loudness over time is a shape I can draw with four numbers.",
    blurb: "ADSR is the note’s biography, not a second oscillator.",
  },
  {
    id: "C3",
    level: "L1",
    title: "Tone without FX",
    plate: "Oscillators, mix, unison — FX bypassed",
    status: "ready",
    hearFirst: "The guitar unplugged, the flute in a dry room, the drum with no hall — that is the voice. FX comes after.",
    load: "Silk Wake",
    change: "Bypass every FX gold plate. Listen to what is left.",
    save: "C3 Dry Silk",
    exitCheck: "If it only sounds good with reverb, it is not a voice yet.",
    blurb: "Harmonics, detune, unison. Dry.",
  },
  {
    id: "C4",
    level: "L2",
    title: "Filter as orchestration",
    plate: "Filter",
    status: "ready",
    hearFirst: "Cutoff is the guitar tone knob, or a wah you park. How much spectrum you allow to speak.",
    load: "Warm Field",
    change: "Sweep Cut by hand as if riding a wah, then park it.",
    save: "C4 Parked Cut",
    exitCheck: "The filter is orchestration, not a ‘synth effect’.",
    blurb: "The door on the spectrum. Resonance is the honk at the door.",
  },
  {
    id: "C5",
    level: "L2",
    title: "FX is the room",
    plate: "FX rack",
    status: "ready",
    hearFirst: "Reverb and delay are the hall. They are not the guitar, the flute, or the kit.",
    load: "Silk Wake, then Warm Field + Sub Current",
    change: "One room only — Delay or Verb, not both.",
    save: "C5 Small Hall",
    exitCheck: "I can name the dry instrument and the room as two different decisions.",
    blurb: "One space. The plus in a stacked name is a warning.",
  },
  {
    id: "C6",
    level: "L3",
    title: "LFO",
    plate: "LFO 1 / LFO 2",
    status: "ready",
    hearFirst: "Flute vibrato, guitar tremolo: a repeating wave that moves a number. Not a new note.",
    load: "Warm Field",
    change: "One destination. Hear source / dest / result.",
    save: "C6 Slow Breath",
    exitCheck: "An LFO is dest = dest₀ + depth × lfo.",
    blurb: "Control-rate motion. Three-trace picture.",
  },
  {
    id: "C7",
    level: "L3",
    title: "Matrix",
    plate: "Modulation matrix",
    status: "ready",
    hearFirst: "A pedalboard, a mixing desk: who is allowed to move whom.",
    load: "Init Dual Saw",
    change: "One slot. One source. One dest.",
    save: "C7 One Wire",
    exitCheck: "The matrix is routing, not a sound.",
    blurb: "Six slots. Unipolar vs bipolar.",
  },
  {
    id: "C8",
    level: "L3",
    title: "Shape (drawn hairpin)",
    plate: "Shape",
    status: "ready",
    hearFirst: "A volume swell you draw. Guitar: the volume knob as a bow. Flute: a written crescendo.",
    load: "Silk Wake",
    change: "Draw one curve. One destination.",
    save: "C8 Drawn Hairpin",
    exitCheck: "Shape is a custom envelope I drew.",
    blurb: "Not an LFO factory wave — a line you author.",
  },
  {
    id: "C9",
    level: "L4",
    title: "Arpeggiator",
    plate: "Arp / Pattern",
    status: "ready",
    hearFirst: "A guitar picking pattern, or a flute arpeggio: a held chord spoken as a figure.",
    load: "Init Dual Saw",
    change: "Hold a triad. Change gate, not the voice.",
    save: "C9 Held Figure",
    exitCheck: "The arp plays time. The patch is still the tone.",
    blurb: "Latch, octave, accent.",
  },
  {
    id: "C10",
    level: "L4",
    title: "Groovebox",
    plate: "Groove",
    status: "ready",
    hearFirst: "Four takes and a kit — a small band, not a new synth.",
    load: "Factory groove",
    change: "Mute one lane. Hear the hole.",
    save: "C10 One Lane Out",
    exitCheck: "Groove is arrangement sitting on voices I already designed.",
    blurb: "MIDI takes, drum lanes, four sounds at once.",
  },
  {
    id: "C11",
    level: "L4",
    title: "Poly / mono / glide",
    plate: "Voice mode",
    status: "ready",
    hearFirst: "Choir vs flute (one line) vs slide guitar (pitch walks).",
    load: "Init Dual Saw",
    change: "Mono + glide a fifth.",
    save: "C11 Spoken Fifth",
    exitCheck: "Polyphony is a performance decision that changes the instrument.",
    blurb: "Legato, glide, unison vs chords.",
  },
  {
    id: "C12",
    level: "L5",
    title: "Dual layer",
    plate: "Layer A / B",
    status: "ready",
    hearFirst: "A duet. Flute over guitar, kit over bass. A = both. B = B half only.",
    load: "Warm Field + Sub Current",
    change: "Mute A, then mute B. Name each half.",
    save: "C12 Two Voices",
    exitCheck: "A plus-sign in the name means two instruments stacked.",
    blurb: "Stack / split. Level, pan, mute that silences.",
  },
  {
    id: "C13",
    level: "L5",
    title: "Stacked library as repertoire",
    plate: "Library (stacked)",
    status: "ready",
    hearFirst: "A set list of duets, not a folder of files.",
    load: "Warm Field + Sub Current",
    change: "Build one stack from two User patches.",
    save: "C13 Recital Pair",
    exitCheck: "I can program a two-voice piece as a stack.",
    blurb: "Named stacks are repertoire.",
  },
  {
    id: "C14",
    level: "L5",
    title: "Wavetable",
    plate: "Wavetable",
    status: "ready",
    hearFirst: "A stack of frames. Position is which frame is speaking.",
    load: "Factory wavetable patch",
    change: "Move Pos by hand. Then later, modulate it.",
    save: "C14 Frame Walk",
    exitCheck: "A wavetable is a filmstrip of spectra, not a second analog osc.",
    blurb: "Scan, warp, drop a wav later.",
  },
  {
    id: "C15",
    level: "L5",
    title: "Hybrid (FM, sync, ring)",
    plate: "Osc extras",
    status: "ready",
    hearFirst: "These are different merges from mix. Do not reuse the additive picture.",
    load: "Init Dual Saw",
    change: "One hybrid mode at a time.",
    save: "C15 One Merge",
    exitCheck: "FM bends timing. Sync resets. Ring multiplies. Mix adds.",
    blurb: "2-op FM is core. DX7 6-op is architecture (gap).",
  },
  {
    id: "C16",
    level: "L6",
    title: "Scenes / morph",
    plate: "Scene pads",
    status: "ready",
    hearFirst: "Guitar amp channel, drum kit change, organ stop: a snapshot of the whole instrument.",
    load: "A stored scene",
    change: "Store two scenes. Morph between them.",
    save: "C16 Two Registrations",
    exitCheck: "A scene is a snapshot of the whole instrument, not a patch trick.",
    blurb: "Eight pads. A/B. Morph slider.",
  },
  {
    id: "C17",
    level: "L6",
    title: "MIDI + CK88 audio",
    plate: "USB digital → DAC → amp",
    status: "ready",
    hearFirst: "A guitar is silent until the amp. So is this.",
    load: "C5 Small Hall",
    change: "Play from CK88 (or class-compliant USB). Set the listening chain.",
    save: "—",
    exitCheck: "MIDI is instructions. Audio is the wire to the room.",
    blurb: "Class-compliant USB. CK88 when named. No computer keys.",
  },
  {
    id: "C18",
    level: "L6",
    title: "Bounce / backup / DAW",
    plate: "Wav bounce, library backup",
    status: "ready",
    hearFirst: "A recording of the performance, not a score.",
    load: "A User patch",
    change: "Bounce a phrase. Backup the library.",
    save: "—",
    exitCheck: "LYRA is not a VST. Bounce is how it leaves the tab.",
    blurb: "Honest limit: not a plugin.",
  },
  {
    id: "C19",
    level: "L6",
    title: "CPU and 32 voices",
    plate: "Voice count",
    status: "ready",
    hearFirst: "Thirty-two voices. Cymbals left ringing, open strings — the quiet ones get stolen.",
    load: "A dense stack",
    change: "Hold a cluster. Watch the count. Lift.",
    save: "C19 Soft Choir",
    exitCheck: "Polyphony is a budget. Unison and layers spend it.",
    blurb: "Voice stealing is orchestration too.",
  },
  {
    id: "C20",
    level: "L7",
    title: "Design a 10-patch bank",
    plate: "User library",
    status: "ready",
    hearFirst: "A book of ten pieces in one voice family.",
    load: "Init Dual Saw",
    change: "Ten named User patches. One idea each.",
    save: "Bank of 10",
    exitCheck: "I can point at ten sounds and say what each one is for.",
    blurb: "Original voice, not a factory tour.",
  },
  {
    id: "C21",
    level: "L7",
    title: "Design 8 stacked performances",
    plate: "Stacks",
    status: "ready",
    hearFirst: "Eight duets. Plus-sign is the warning.",
    load: "Your bank",
    change: "Eight named stacks. Plus-sign is the warning.",
    save: "8 performances",
    exitCheck: "A stack is a piece, not a louder patch.",
    blurb: "Repertoire from your bank.",
  },
  {
    id: "C22",
    level: "L7",
    title: "Translate a record",
    plate: "Whole instrument",
    status: "ready",
    hearFirst: "Transcribe the record into this bench. Name what you cannot clone.",
    load: "Your closest User patch",
    change: "Get 70%. Write the 30% you cannot.",
    save: "C22 Translation",
    exitCheck: "I can hear a record as path + envelope + room + motion, and I can name the gap.",
    blurb: "Honesty is the last technique.",
  },
];

export const NAMED_PATCHES = [
  {
    name: "Init Dual Saw",
    kind: "factory" as const,
    use: "C0, C1 — two saws, the starting wire.",
  },
  {
    name: "Warm Field",
    kind: "factory" as const,
    use: "C2, C4 — a pad that already has a slow body.",
  },
  {
    name: "Sub Current",
    kind: "factory" as const,
    use: "The B-half under a stack. Bass / current, not the field.",
  },
  {
    name: "Silk Wake",
    kind: "factory" as const,
    use: "C3, C5 — silk that must be heard dry before it gets a room.",
  },
  {
    name: "Warm Field + Sub Current",
    kind: "stacked" as const,
    use: "C5 — plus-sign warning: two layers. A = both, B = B half only.",
  },
];

export function courseById(id: string): CourseMeta | undefined {
  return COURSES.find((c) => c.id === id);
}

export function coursesForLevel(level: LevelId): CourseMeta[] {
  return COURSES.filter((c) => c.level === level);
}

export function neighbors(id: CourseId): { prev?: CourseMeta; next?: CourseMeta } {
  const i = COURSES.findIndex((c) => c.id === id);
  return {
    prev: i > 0 ? COURSES[i - 1] : undefined,
    next: i >= 0 && i < COURSES.length - 1 ? COURSES[i + 1] : undefined,
  };
}
