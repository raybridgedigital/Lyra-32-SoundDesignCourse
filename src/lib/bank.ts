import { create } from "zustand";
import { persist } from "zustand/middleware";

export const PATCH_ROLES = [
  { id: "p1", name: "Dry wire", hint: "Init-family. Osc → filter → amp. No FX." },
  { id: "p2", name: "Slow attack", hint: "Pad. Attack is breath or bow, not a click." },
  { id: "p3", name: "Dry silk", hint: "Tone only. Bypass the room." },
  { id: "p4", name: "Parked cut", hint: "Filter as voicing. Tone knob, then leave it." },
  { id: "p5", name: "Small hall", hint: "One room. Dry attack still reads." },
  { id: "p6", name: "Slow breath", hint: "LFO on one dest. Gesture, not gargle." },
  { id: "p7", name: "One wire", hint: "Velocity or wheel. Single matrix slot." },
  { id: "p8", name: "Held figure", hint: "Arp or pulse. Tone stays the patch." },
  { id: "p9", name: "Spoken fifth", hint: "Mono + glide. One singer." },
  { id: "p10", name: "One merge", hint: "FM or sync or ring — not mix." },
] as const;

export const STACK_ROLES = [
  { id: "s1", name: "Field + current", hint: "Pad over sub. Plus-sign in the name." },
  { id: "s2", name: "Silk + figure", hint: "Held line under a moving arp." },
  { id: "s3", name: "Choir + solo", hint: "Poly pad, mono flute-like line on B." },
  { id: "s4", name: "Dry + room twin", hint: "Same voice, B is the hall version." },
  { id: "s5", name: "Keys split", hint: "Bass left, silk right — if split exists." },
  { id: "s6", name: "Breath pair", hint: "Two LFOs, two voices, one tempo." },
  { id: "s7", name: "Merge + dry", hint: "Hybrid on A, honest saw on B." },
  { id: "s8", name: "Your recital", hint: "The piece you would actually play." },
] as const;

type BankState = {
  patches: Record<string, boolean>;
  stacks: Record<string, boolean>;
  translation: string;
  togglePatch: (id: string) => void;
  toggleStack: (id: string) => void;
  setTranslation: (v: string) => void;
};

export const useBank = create<BankState>()(
  persist(
    (set) => ({
      patches: {},
      stacks: {},
      translation: "",
      togglePatch: (id) => set((s) => ({ patches: { ...s.patches, [id]: !s.patches[id] } })),
      toggleStack: (id) => set((s) => ({ stacks: { ...s.stacks, [id]: !s.stacks[id] } })),
      setTranslation: (translation) => set({ translation }),
    }),
    { name: "lyra-course-bank" },
  ),
);
