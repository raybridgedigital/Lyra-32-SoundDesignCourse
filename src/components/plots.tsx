import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { readPlotPalette, useTheme, type PlotPalette } from "@/lib/theme";

let PAL: PlotPalette = readPlotPalette();

function PlotFrame({
  title,
  caption,
  math,
  children,
  className,
}: {
  title: string;
  caption?: string;
  math?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-lg border border-line bg-panel", className)}>
      <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5">
        <figcaption className="font-display text-base text-fg">{title}</figcaption>
        {math ? (
          <code className="font-mono text-[11px] tracking-tight text-gold">{math}</code>
        ) : null}
      </div>
      <div className="p-3 sm:p-4">{children}</div>
      {caption ? <p className="border-t border-line px-4 py-2.5 text-xs leading-relaxed text-muted">{caption}</p> : null}
    </figure>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  unit,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
        {label}
        <span className="text-gold tabular-nums">
          {typeof value === "number" && !Number.isInteger(step) ? value.toFixed(2) : value}
          {unit ?? ""}
        </span>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-gold"
      />
    </label>
  );
}

function useCanvas(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, deps: unknown[]) {
  const ref = useRef<HTMLCanvasElement>(null);
  const theme = useTheme((s) => s.theme);
  useEffect(() => {
    PAL = readPlotPalette();
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.clientWidth;
    const h = canvas.clientHeight || 180;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    draw(ctx, w, h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, theme]);
  return ref;
}

function axis(ctx: CanvasRenderingContext2D, w: number, h: number, y0?: number) {
  ctx.strokeStyle = PAL.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, y0 ?? h / 2);
  ctx.lineTo(w, y0 ?? h / 2);
  ctx.stroke();
}

function strokePath(
  ctx: CanvasRenderingContext2D,
  pts: { x: number; y: number }[],
  color: string,
  width = 1.6,
) {
  if (pts.length < 2) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.stroke();
}

export function SignalPathPlot() {
  return (
    <PlotFrame
      title="The subtractive wire"
      math="sound travels left → right"
      caption="Oscillator makes harmonics. Filter removes (or peaks) some of them. Amp is loudness — the damper."
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-7 sm:items-center">
        {["Osc", "→", "Filter", "→", "Amp", "→", "Out"].map((label, i) =>
          label === "→" ? (
            <div key={i} className="hidden text-center font-display text-xl text-gold sm:block" aria-hidden>
              →
            </div>
          ) : (
            <div
              key={label}
              className="rounded-md border border-gold/40 bg-surface px-3 py-4 text-center sm:col-span-1"
            >
              <div className="font-display text-lg text-gold">{label}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-muted">
                {label === "Osc" && "make"}
                {label === "Filter" && "sculpt"}
                {label === "Amp" && "loud"}
                {label === "Out" && "room later"}
              </div>
            </div>
          ),
        )}
      </div>
    </PlotFrame>
  );
}

function sampleWave(kind: "sine" | "saw" | "square", t: number) {
  const ph = ((t % 1) + 1) % 1;
  if (kind === "sine") return Math.sin(ph * Math.PI * 2);
  if (kind === "saw") return 2 * ph - 1;
  return ph < 0.5 ? 1 : -1;
}

export function MixPlot() {
  const [detune, setDetune] = useState(0.04);
  const [mixB, setMixB] = useState(0.5);
  const [kind, setKind] = useState<"sine" | "saw">("saw");
  const ref = useCanvas(
    (ctx, w, h) => {
      const mid = h / 2;
      axis(ctx, w, h);
      const n = Math.floor(w);
      const a: { x: number; y: number }[] = [];
      const b: { x: number; y: number }[] = [];
      const s: { x: number; y: number }[] = [];
      const cycles = 4;
      for (let i = 0; i < n; i++) {
        const t = (i / n) * cycles;
        const va = sampleWave(kind, t);
        const vb = sampleWave(kind, t * (1 + detune));
        const vs = va * (1 - mixB * 0.5) + vb * mixB;
        const x = i;
        a.push({ x, y: mid - va * h * 0.16 });
        b.push({ x, y: mid - vb * h * 0.16 });
        s.push({ x, y: mid - vs * h * 0.28 });
      }
      strokePath(ctx, a, PAL.muted, 1);
      strokePath(ctx, b, PAL.muted, 1);
      strokePath(ctx, s, PAL.accent, 2);
    },
    [detune, mixB, kind],
  );

  return (
    <PlotFrame
      title="Two oscillators added"
      math="y = a + b"
      caption="The bright line is the sum. Slight detune makes beats — the slow loud/soft pulse. That is unison’s secret, not ‘more voices’ as magic."
    >
      <canvas ref={ref} className="h-44 w-full" />
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex gap-2">
          {(["saw", "sine"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={cn(
                "h-9 rounded-sm border px-3 text-xs uppercase tracking-wider",
                kind === k ? "border-gold text-gold" : "border-line text-muted",
              )}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Slider label="Detune" min={0} max={0.12} step={0.002} value={detune} onChange={setDetune} />
          <Slider label="Osc B mix" min={0} max={1} step={0.01} value={mixB} onChange={setMixB} />
        </div>
      </div>
    </PlotFrame>
  );
}

export function EnvelopePlot() {
  const [a, setA] = useState(0.18);
  const [d, setD] = useState(0.22);
  const [s, setS] = useState(0.55);
  const [r, setR] = useState(0.28);
  const ref = useCanvas(
    (ctx, w, h) => {
      const pad = 8;
      const usable = w - pad * 2;
      const hold = 0.22;
      const total = a + d + hold + r;
      const xOf = (t: number) => pad + (t / total) * usable;
      const yOf = (lvl: number) => h - 16 - lvl * (h - 28);
      axis(ctx, w, h, yOf(0));
      const pts = [
        { x: xOf(0), y: yOf(0) },
        { x: xOf(a), y: yOf(1) },
        { x: xOf(a + d), y: yOf(s) },
        { x: xOf(a + d + hold), y: yOf(s) },
        { x: xOf(total), y: yOf(0) },
      ];
      strokePath(ctx, pts, PAL.accent, 2.2);
      ctx.fillStyle = PAL.accent;
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = PAL.muted;
      ctx.font = "11px IBM Plex Mono, monospace";
      ctx.fillText("A", xOf(a * 0.4), yOf(0.55));
      ctx.fillText("D", xOf(a + d * 0.4), yOf(0.85));
      ctx.fillText("S", xOf(a + d + hold * 0.4), yOf(s) - 8);
      ctx.fillText("R", xOf(a + d + hold + r * 0.45), yOf(0.35));
    },
    [a, d, s, r],
  );

  return (
    <PlotFrame
      title="Amp envelope — the note’s biography"
      math="amp = osc × env"
      caption="Attack = how the note arrives (pick, breath, stick). Decay + sustain = how it sits. Release = the ring after you stop."
    >
      <canvas ref={ref} className="h-40 w-full" />
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Slider label="Attack" min={0.02} max={0.8} step={0.01} value={a} onChange={setA} />
        <Slider label="Decay" min={0.02} max={0.8} step={0.01} value={d} onChange={setD} />
        <Slider label="Sustain" min={0} max={1} step={0.01} value={s} onChange={setS} />
        <Slider label="Release" min={0.02} max={1} step={0.01} value={r} onChange={setR} />
      </div>
    </PlotFrame>
  );
}

export function HarmonicPlot() {
  const [which, setWhich] = useState<"saw" | "square" | "sine">("saw");
  const ref = useCanvas(
    (ctx, w, h) => {
      const n = 12;
      const gap = w / n;
      for (let k = 1; k <= n; k++) {
        let mag = 0;
        if (which === "sine") mag = k === 1 ? 1 : 0;
        else if (which === "saw") mag = 1 / k;
        else mag = k % 2 === 1 ? 1 / k : 0;
        const bh = mag * (h - 24);
        const x = (k - 0.7) * gap;
        ctx.fillStyle = mag > 0 ? PAL.accent : PAL.line;
        ctx.globalAlpha = 0.25 + mag * 0.75;
        ctx.fillRect(x, h - 14 - bh, gap * 0.55, bh);
        ctx.globalAlpha = 1;
        ctx.fillStyle = PAL.muted;
        ctx.font = "10px IBM Plex Mono, monospace";
        ctx.fillText(String(k), x, h - 2);
      }
    },
    [which],
  );

  return (
    <PlotFrame
      title="Harmonics — why saw is brighter than sine"
      math="saw: all 1/n · square: odd 1/n · sine: 1"
      caption="A guitar string and a flute overtone series are both richer than a sine. Subtractive synthesis starts bright, then the filter takes away."
    >
      <canvas ref={ref} className="h-40 w-full" />
      <div className="mt-3 flex gap-2">
        {(["sine", "saw", "square"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setWhich(k)}
            className={cn(
              "h-9 rounded-sm border px-3 text-xs uppercase tracking-wider",
              which === k ? "border-gold text-gold" : "border-line text-muted",
            )}
          >
            {k}
          </button>
        ))}
      </div>
    </PlotFrame>
  );
}

export function FilterPlot() {
  const [cut, setCut] = useState(0.45);
  const [res, setRes] = useState(0.25);
  const [type, setType] = useState<"lp" | "hp" | "bp">("lp");
  const ref = useCanvas(
    (ctx, w, h) => {
      const pts: { x: number; y: number }[] = [];
      const fc = 0.08 + cut * 0.84;
      const Q = 0.6 + res * 8;
      for (let i = 0; i < w; i++) {
        const f = (i + 1) / w;
        const x = f / fc;
        let mag: number;
        if (type === "lp") {
          mag = 1 / Math.sqrt((1 - x * x) ** 2 + (x / Q) ** 2);
        } else if (type === "hp") {
          mag = (x * x) / Math.sqrt((1 - x * x) ** 2 + (x / Q) ** 2);
        } else {
          mag = (x / Q) / Math.sqrt((1 - x * x) ** 2 + (x / Q) ** 2);
        }
        const y = h - 12 - Math.min(mag, 3.2) * (h * 0.28);
        pts.push({ x: i, y });
      }
      const doorX = fc * w;
      ctx.fillStyle = "rgba(201,162,39,0.08)";
      if (type === "lp") ctx.fillRect(0, 0, doorX, h);
      else if (type === "hp") ctx.fillRect(doorX, 0, w - doorX, h);
      strokePath(ctx, pts, PAL.accent, 2);
      ctx.strokeStyle = PAL.warn;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(doorX, 8);
      ctx.lineTo(doorX, h - 8);
      ctx.stroke();
      ctx.setLineDash([]);
    },
    [cut, res, type],
  );

  return (
    <PlotFrame
      title="Filter as a door on the spectrum"
      math="not a volume knob — a frequency door"
      caption="Bright curve = what gets through. Dashed line = cutoff. Resonance is the honk at the door, not ‘more filter’. HP/BP are core ideas; LYRA may be thin here — still learn the picture."
    >
      <canvas ref={ref} className="h-40 w-full" />
      <div className="mt-3 flex gap-2">
        {(["lp", "hp", "bp"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setType(k)}
            className={cn(
              "h-9 rounded-sm border px-3 text-xs uppercase tracking-wider",
              type === k ? "border-gold text-gold" : "border-line text-muted",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <Slider label="Cutoff" min={0.05} max={0.95} step={0.01} value={cut} onChange={setCut} />
        <Slider label="Resonance" min={0} max={1} step={0.01} value={res} onChange={setRes} />
      </div>
    </PlotFrame>
  );
}

export function SweepPlot() {
  const [depth, setDepth] = useState(0.35);
  const [rate, setRate] = useState(0.4);
  const tRef = useRef(0);
  const [, bump] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      tRef.current += (now - last) / 1000;
      last = now;
      bump((n) => n + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const t = tRef.current;
  const ref = useCanvas(
    (ctx, w, h) => {
      const pts: { x: number; y: number }[] = [];
      const base = 0.55;
      for (let i = 0; i < w; i++) {
        const u = i / w;
        const lfo = Math.sin((u * 8 + t * rate * 3) * Math.PI * 2);
        const cut = base + lfo * depth * 0.35;
        pts.push({ x: i, y: h * (1 - cut) * 0.85 + 10 });
      }
      axis(ctx, w, h, h * (1 - base) * 0.85 + 10);
      strokePath(ctx, pts, PAL.accent, 2);
      ctx.fillStyle = PAL.muted;
      ctx.font = "11px IBM Plex Mono, monospace";
      ctx.fillText("cutoff", 8, 16);
      ctx.fillText("hand / later LFO", w - 120, 16);
    },
    [depth, rate, t],
  );

  return (
    <PlotFrame
      title="Hand on cutoff — a human LFO"
      math="dest = dest₀ + depth × motion"
      caption="This is not C6. You are the modulator. Same merge as an LFO: a number is added to cutoff. Later the LFO does this while you play."
    >
      <canvas ref={ref} className="h-36 w-full" />
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <Slider label="Depth" min={0} max={1} step={0.01} value={depth} onChange={setDepth} />
        <Slider label="Rate" min={0.1} max={1.2} step={0.01} value={rate} onChange={setRate} />
      </div>
    </PlotFrame>
  );
}

export function RoomPlot() {
  const [delay, setDelay] = useState(0.22);
  const [fb, setFb] = useState(0.45);
  const [mix, setMix] = useState(0.35);
  const [mode, setMode] = useState<"delay" | "verb">("delay");
  const ref = useCanvas(
    (ctx, w, h) => {
      const baseY = h - 18;
      const dryH = h * 0.62 * (1 - mix * 0.4);
      ctx.fillStyle = PAL.fg;
      ctx.globalAlpha = 0.9;
      ctx.fillRect(12, baseY - dryH, 6, dryH);
      ctx.globalAlpha = 1;
      if (mode === "delay") {
        let amp = mix;
        for (let k = 1; k <= 8; k++) {
          amp *= fb;
          const x = 12 + k * (delay * w * 0.55 + 18);
          if (x > w - 10) break;
          const hh = dryH * amp * 1.4;
          ctx.fillStyle = PAL.accent;
          ctx.globalAlpha = 0.35 + amp;
          ctx.fillRect(x, baseY - hh, 5, hh);
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(20, baseY);
        for (let i = 20; i < w; i++) {
          const t = (i - 20) / (w * (0.35 + delay));
          const env = Math.exp(-t * (1.4 - fb)) * mix;
          const noise = (Math.sin(i * 12.9898) * 43758.5453) % 1;
          const y = baseY - env * (h * 0.55) * (0.7 + Math.abs(noise) * 0.3);
          ctx.lineTo(i, y);
        }
        ctx.strokeStyle = PAL.accent;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = PAL.muted;
      ctx.font = "11px IBM Plex Mono, monospace";
      ctx.fillText("dry hit", 8, 16);
    },
    [delay, fb, mix, mode],
  );

  return (
    <PlotFrame
      title="The room after the instrument"
      math="out = dry × (1 − mix) + room × mix"
      caption="Delay is copies in time. Reverb is a wash of copies too dense to count. One room. If both are on, you no longer know which decision you made."
    >
      <canvas ref={ref} className="h-40 w-full" />
      <div className="mt-3 flex gap-2">
        {(["delay", "verb"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setMode(k)}
            className={cn(
              "h-9 rounded-sm border px-3 text-xs uppercase tracking-wider",
              mode === k ? "border-gold text-gold" : "border-line text-muted",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Slider label="Time" min={0.08} max={0.6} step={0.01} value={delay} onChange={setDelay} />
        <Slider label="Feedback" min={0.05} max={0.85} step={0.01} value={fb} onChange={setFb} />
        <Slider label="Mix" min={0} max={1} step={0.01} value={mix} onChange={setMix} />
      </div>
    </PlotFrame>
  );
}

export function MidiPathPlot() {
  return (
    <PlotFrame
      title="Instructions, then sound"
      caption="USB MIDI is not audio. The controller sends notes. LYRA makes the wave. Your DAC and amp are the last loudness — like a guitar cab."
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
        {["CK88 / USB MIDI", "LYRA tab", "DAC", "Amp / phones"].map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex-1 rounded-md border border-line bg-surface px-3 py-3 text-center text-sm">
              {label}
            </div>
            {i < 3 ? <span className="hidden px-2 text-gold sm:inline">→</span> : null}
          </div>
        ))}
      </div>
    </PlotFrame>
  );
}

export function ThreeTracePlot() {
  const [depth, setDepth] = useState(0.55);
  const [rate, setRate] = useState(0.45);
  const [dest0, setDest0] = useState(0.55);
  const tRef = useRef(0);
  const [, bump] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      tRef.current += (now - last) / 1000;
      last = now;
      bump((n) => n + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const t = tRef.current;
  const ref = useCanvas(
    (ctx, w, h) => {
      const row = h / 3;
      const traces: { label: string; color: string; fn: (u: number) => number }[] = [
        { label: "1. LFO (source)", color: PAL.muted, fn: (u) => Math.sin((u * 3 + t * rate * 2) * Math.PI * 2) },
        { label: "2. Cutoff sitting still", color: PAL.fg, fn: () => dest0 * 2 - 1 },
        {
          label: "3. Result = dest₀ + depth × lfo",
          color: PAL.accent,
          fn: (u) => dest0 * 2 - 1 + depth * Math.sin((u * 3 + t * rate * 2) * Math.PI * 2),
        },
      ];
      traces.forEach((tr, i) => {
        const y0 = row * i + row / 2;
        ctx.strokeStyle = PAL.line;
        ctx.beginPath();
        ctx.moveTo(0, y0);
        ctx.lineTo(w, y0);
        ctx.stroke();
        const pts = [];
        for (let x = 0; x < w; x++) {
          const u = x / w;
          pts.push({ x, y: y0 - tr.fn(u) * (row * 0.38) });
        }
        strokePath(ctx, pts, tr.color, i === 2 ? 2 : 1.3);
        ctx.fillStyle = tr.color;
        ctx.font = "11px IBM Plex Mono, monospace";
        ctx.fillText(tr.label, 8, row * i + 14);
      });
    },
    [depth, rate, dest0, t],
  );
  return (
    <PlotFrame
      title="Three traces — how an LFO actually merges"
      math="dest = dest₀ + depth × lfo"
      caption="Do not add two waveforms like mix. The LFO is a slow number that is added to another number (here, cutoff). Trace 3 is the door breathing."
    >
      <canvas ref={ref} className="h-56 w-full" />
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Slider label="Depth" min={0} max={1} step={0.01} value={depth} onChange={setDepth} />
        <Slider label="Rate" min={0.1} max={1.4} step={0.01} value={rate} onChange={setRate} />
        <Slider label="Cutoff floor" min={0.15} max={0.9} step={0.01} value={dest0} onChange={setDest0} />
      </div>
    </PlotFrame>
  );
}

export function BipolarPlot() {
  const ref = useCanvas((ctx, w, h) => {
    const mid = w / 2;
    const drawEnv = (x0: number, x1: number, uni: boolean) => {
      const pts = [];
      const span = x1 - x0;
      for (let i = 0; i <= span; i++) {
        const u = i / span;
        let y: number;
        if (u < 0.2) y = u / 0.2;
        else if (u < 0.8) y = 1;
        else y = (1 - u) / 0.2;
        if (!uni) y = y * 2 - 1;
        const y0 = uni ? h - 20 : h / 2;
        const scale = uni ? h - 36 : (h - 36) / 2;
        pts.push({ x: x0 + i, y: y0 - y * scale });
      }
      strokePath(ctx, pts, PAL.accent, 2);
      ctx.strokeStyle = PAL.line;
      ctx.beginPath();
      ctx.moveTo(x0, uni ? h - 20 : h / 2);
      ctx.lineTo(x1, uni ? h - 20 : h / 2);
      ctx.stroke();
    };
    drawEnv(8, mid - 12, true);
    drawEnv(mid + 12, w - 8, false);
    ctx.fillStyle = PAL.muted;
    ctx.font = "11px IBM Plex Mono, monospace";
    ctx.fillText("Envelope — unipolar 0…1", 12, 16);
    ctx.fillText("LFO — bipolar −1…+1", mid + 16, 16);
  }, []);
  return (
    <PlotFrame
      title="Unipolar vs bipolar"
      caption="An envelope only goes up from silence. An LFO sits around zero, so it can push a dest both ways. Same matrix slot, different manners."
    >
      <canvas ref={ref} className="h-36 w-full" />
    </PlotFrame>
  );
}

export function MatrixPlot() {
  const slots = [
    { src: "LFO 1", dest: "Cut", amt: 0.4 },
    { src: "Vel", dest: "Amp", amt: 0.7 },
    { src: "FEG", dest: "Cut", amt: 0.3 },
    { src: "Wheel", dest: "LFO dpt", amt: 0.5 },
    { src: "—", dest: "—", amt: 0 },
    { src: "—", dest: "—", amt: 0 },
  ];
  return (
    <PlotFrame
      title="Matrix is a patchbay, not a sound"
      math="one wire = source → dest × amount"
      caption="Empty slots are silence in the patchbay. Fill one. Hear one. Then fill another."
    >
      <div className="grid grid-cols-3 gap-2 text-xs sm:grid-cols-6">
        {slots.map((s, i) => (
          <div key={i} className="rounded-md border border-line bg-surface px-2 py-3">
            <div className="font-mono text-[10px] text-subtle">slot {i + 1}</div>
            <div className="mt-1 text-gold">{s.src}</div>
            <div className="text-muted">→ {s.dest}</div>
            <div className="mt-2 h-1 rounded-full bg-line">
              <div className="h-1 rounded-full bg-gold" style={{ width: `${s.amt * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </PlotFrame>
  );
}

export function ShapePlot() {
  const [from, setFrom] = useState(0.1);
  const [kind, setKind] = useState<"silk" | "pluck" | "gate">("silk");
  const ref = useCanvas(
    (ctx, w, h) => {
      const pts = [];
      for (let i = 0; i < w; i++) {
        const u = i / w;
        let y = 0;
        if (kind === "silk") y = Math.sin(u * Math.PI);
        else if (kind === "pluck") y = Math.exp(-u * 5);
        else y = u % 0.25 < 0.12 ? 1 : 0.05;
        y = from + (1 - from) * y;
        pts.push({ x: i, y: h - 12 - y * (h - 24) });
      }
      strokePath(ctx, pts, PAL.accent, 2);
      ctx.strokeStyle = PAL.line;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(0, h - 12 - from * (h - 24));
      ctx.lineTo(w, h - 12 - from * (h - 24));
      ctx.stroke();
      ctx.setLineDash([]);
    },
    [from, kind],
  );
  return (
    <PlotFrame
      title="Shape — a hairpin you draw"
      math="once (Env) or again (Loop)"
      caption="From is a floor under the whole curve. This is not an LFO factory wave — it is a line you author. One destination."
    >
      <canvas ref={ref} className="h-36 w-full" />
      <div className="mt-3 flex gap-2">
        {(["silk", "pluck", "gate"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={cn(
              "h-9 rounded-sm border px-3 text-xs uppercase tracking-wider",
              kind === k ? "border-gold text-gold" : "border-line text-muted",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <Slider label="From (floor)" min={0} max={0.6} step={0.01} value={from} onChange={setFrom} />
      </div>
    </PlotFrame>
  );
}

export function ArpPlot() {
  const [gate, setGate] = useState(0.55);
  const steps = [0, 1, 0, 2, 0, 1, 0, -1, 0, 1, 2, 1, 0, 1, 0, 2];
  const ref = useCanvas(
    (ctx, w, h) => {
      const n = 16;
      const bw = w / n;
      for (let i = 0; i < n; i++) {
        const oct = steps[i];
        const hh = (0.35 + oct * 0.12) * h * gate;
        ctx.fillStyle = PAL.accent;
        ctx.globalAlpha = 0.35 + gate * 0.5;
        ctx.fillRect(i * bw + 3, h - 16 - hh, bw - 6, hh);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = PAL.muted;
      ctx.font = "10px IBM Plex Mono, monospace";
      ctx.fillText("16 steps · gate / accent / octave", 8, 14);
    },
    [gate],
  );
  return (
    <PlotFrame
      title="Arp — a held chord spoken as a figure"
      caption="The patch is still the tone. The arp is time. Change gate, not the oscillators."
    >
      <canvas ref={ref} className="h-32 w-full" />
      <div className="mt-3">
        <Slider label="Gate" min={0.15} max={1} step={0.01} value={gate} onChange={setGate} />
      </div>
    </PlotFrame>
  );
}

export function GroovePlot() {
  const lanes = ["kick", "snr", "hat", "perc"];
  const pattern = [
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  ];
  return (
    <PlotFrame
      title="Groove — arrangement sitting on voices"
      caption="Four note takes + drum lanes. Mute a lane: the hole is the lesson. Groove is not a new synth."
    >
      <div className="space-y-2">
        {lanes.map((name, r) => (
          <div key={name} className="flex items-center gap-2">
            <span className="w-10 font-mono text-[10px] uppercase text-muted">{name}</span>
            <div className="grid flex-1 grid-cols-16 gap-0.5" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
              {pattern[r].map((v, i) => (
                <div
                  key={i}
                  className={cn("h-6 rounded-sm", v ? "bg-gold/80" : "bg-line", i % 4 === 0 && v ? "bg-gold" : "")}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PlotFrame>
  );
}

export function VoiceModePlot() {
  const [mode, setMode] = useState<"poly" | "mono" | "glide">("poly");
  const ref = useCanvas(
    (ctx, w, h) => {
      const notes = [
        { t0: 0.05, t1: 0.55, p: 0.3 },
        { t0: 0.18, t1: 0.7, p: 0.55 },
        { t0: 0.32, t1: 0.85, p: 0.78 },
      ];
      const yOf = (p: number) => h - 16 - p * (h - 32);
      if (mode === "poly") {
        for (const n of notes) {
          ctx.strokeStyle = PAL.accent;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(n.t0 * w, yOf(n.p));
          ctx.lineTo(n.t1 * w, yOf(n.p));
          ctx.stroke();
        }
      } else {
        ctx.strokeStyle = PAL.accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        let last = notes[0];
        ctx.moveTo(last.t0 * w, yOf(last.p));
        for (let i = 1; i < notes.length; i++) {
          const n = notes[i];
          if (mode === "glide") {
            ctx.lineTo(n.t0 * w, yOf(last.p));
            ctx.lineTo(n.t0 * w + 18, yOf(n.p));
          } else {
            ctx.lineTo(n.t0 * w, yOf(last.p));
            ctx.moveTo(n.t0 * w, yOf(n.p));
          }
          ctx.lineTo(n.t1 * w, yOf(n.p));
          last = n;
        }
        ctx.stroke();
      }
      ctx.fillStyle = PAL.muted;
      ctx.font = "11px IBM Plex Mono, monospace";
      ctx.fillText(mode === "poly" ? "choir" : mode === "mono" ? "one singer" : "portamento", 8, 16);
    },
    [mode],
  );
  return (
    <PlotFrame
      title="Poly, mono, glide"
      caption="Poly = simultaneous pitches. Mono = last note wins. Glide = the pitch walks. A performance decision that changes the instrument."
    >
      <canvas ref={ref} className="h-32 w-full" />
      <div className="mt-3 flex gap-2">
        {(["poly", "mono", "glide"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setMode(k)}
            className={cn(
              "h-9 rounded-sm border px-3 text-xs uppercase tracking-wider",
              mode === k ? "border-gold text-gold" : "border-line text-muted",
            )}
          >
            {k}
          </button>
        ))}
      </div>
    </PlotFrame>
  );
}

export function DualLayerPlot() {
  const [view, setView] = useState<"A" | "B" | "both">("both");
  return (
    <PlotFrame
      title="A duet"
      math="A = both · B = B half only"
      caption="A plus-sign in the name is the warning. Mute to name each half before you mix a room onto them."
    >
      <div className="grid grid-cols-2 gap-3">
        <div
          className={cn(
            "rounded-md border px-3 py-6 text-center",
            view === "B" ? "border-line opacity-30" : "border-gold/50 bg-gold/8",
          )}
        >
          <div className="font-display text-xl text-gold">Layer A</div>
          <div className="mt-1 text-xs text-muted">Warm Field</div>
        </div>
        <div
          className={cn(
            "rounded-md border px-3 py-6 text-center",
            view === "A" ? "border-line opacity-30" : "border-gold/50 bg-gold/8",
          )}
        >
          <div className="font-display text-xl text-gold">Layer B</div>
          <div className="mt-1 text-xs text-muted">Sub Current</div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {(["both", "A", "B"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setView(k)}
            className={cn(
              "h-9 rounded-sm border px-3 text-xs uppercase tracking-wider",
              view === k ? "border-gold text-gold" : "border-line text-muted",
            )}
          >
            {k === "both" ? "A both" : k === "A" ? "A half" : "B half"}
          </button>
        ))}
      </div>
    </PlotFrame>
  );
}

export function WavetablePlot() {
  const [pos, setPos] = useState(0.35);
  const ref = useCanvas(
    (ctx, w, h) => {
      const frames = 8;
      const fw = w / frames;
      for (let f = 0; f < frames; f++) {
        const pts = [];
        const bright = f / (frames - 1);
        for (let i = 0; i < fw - 6; i++) {
          const u = i / fw;
          const y =
            Math.sin(u * Math.PI * 2) * (1 - bright) +
            (2 * ((u * 3) % 1) - 1) * bright * 0.6 +
            Math.sin(u * Math.PI * 8) * bright * 0.3;
          pts.push({ x: f * fw + 4 + i, y: h / 2 - y * (h * 0.28) });
        }
        strokePath(ctx, pts, PAL.muted, 1);
      }
      const fi = pos * (frames - 1);
      ctx.strokeStyle = PAL.accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(fi * fw + 1, 8, fw - 2, h - 16);
      ctx.fillStyle = PAL.muted;
      ctx.font = "11px IBM Plex Mono, monospace";
      ctx.fillText("position = which frame speaks", 8, 18);
    },
    [pos],
  );
  return (
    <PlotFrame
      title="Wavetable is a filmstrip of spectra"
      math="scan position, then (later) modulate it"
      caption="Not a second analog osc. Each frame is a different harmonic recipe. Walk Pos by hand before you LFOs it."
    >
      <canvas ref={ref} className="h-36 w-full" />
      <div className="mt-3">
        <Slider label="Position" min={0} max={1} step={0.01} value={pos} onChange={setPos} />
      </div>
    </PlotFrame>
  );
}

export function MergePlot() {
  const [kind, setKind] = useState<"mix" | "fm" | "sync" | "ring">("mix");
  const tRef = useRef(0);
  const [, bump] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      tRef.current += (now - last) / 1000;
      last = now;
      bump((n) => n + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const t = tRef.current;
  const ref = useCanvas(
    (ctx, w, h) => {
      const ptsA = [];
      const ptsB = [];
      const ptsR = [];
      const mid = h / 2;
      for (let i = 0; i < w; i++) {
        const u = (i / w) * 6 + t * 0.4;
        const a = Math.sin(u * Math.PI * 2);
        const b = Math.sin(u * Math.PI * 2 * 2.02);
        let r = a;
        if (kind === "mix") r = (a + b) * 0.5;
        if (kind === "fm") r = Math.sin(u * Math.PI * 2 + b * 2.2);
        if (kind === "sync") {
          const ph = (u * 2) % 1;
          r = Math.sin(ph * Math.PI * 8);
        }
        if (kind === "ring") r = a * b;
        ptsA.push({ x: i, y: mid - a * 18 });
        ptsB.push({ x: i, y: mid - b * 18 });
        ptsR.push({ x: i, y: mid - r * 40 });
      }
      strokePath(ctx, ptsA, PAL.muted, 1);
      strokePath(ctx, ptsB, PAL.muted, 1);
      strokePath(ctx, ptsR, PAL.accent, 2);
    },
    [kind, t],
  );
  const math =
    kind === "mix"
      ? "y = a + b"
      : kind === "fm"
        ? "carrier phase bent by b"
        : kind === "sync"
          ? "slave resets on master's cycle"
          : "y = a × b";
  return (
    <PlotFrame
      title="Four different merges — do not reuse the mix picture"
      math={math}
      caption="Mix adds. FM bends timing/phase (not volume — that would be tremolo). Sync resets the slave. Ring multiplies. One mode at a time on the bench."
    >
      <canvas ref={ref} className="h-40 w-full" />
      <div className="mt-3 flex flex-wrap gap-2">
        {(["mix", "fm", "sync", "ring"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={cn(
              "h-9 rounded-sm border px-3 text-xs uppercase tracking-wider",
              kind === k ? "border-gold text-gold" : "border-line text-muted",
            )}
          >
            {k}
          </button>
        ))}
      </div>
    </PlotFrame>
  );
}

export function RatePlot() {
  return (
    <PlotFrame
      title="Control-rate vs audio-rate"
      caption="LFO is slow enough to be a gesture. Oscillator-into-filter at audio speed is FM of cutoff — a different timbre, often missing on a VA. Core idea. Not this plate."
    >
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md border border-line bg-surface px-3 py-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-subtle">Control-rate</div>
          <div className="mt-1 font-display text-xl text-gold">LFO, env, wheel</div>
          <p className="mt-2 text-xs text-muted">Moves a number. You can tap along.</p>
        </div>
        <div className="rounded-md border border-line bg-surface px-3 py-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-subtle">Audio-rate</div>
          <div className="mt-1 font-display text-xl text-gold">osc → dest</div>
          <p className="mt-2 text-xs text-muted">Fast enough to become new harmonics.</p>
        </div>
      </div>
    </PlotFrame>
  );
}

export function SceneMorphPlot() {
  const [morph, setMorph] = useState(0);
  const ref = useCanvas(
    (ctx, w, h) => {
      const cutA = 0.28;
      const cutB = 0.78;
      const cut = cutA + (cutB - cutA) * morph;
      const res = 0.15 + morph * 0.35;
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < w; i++) {
        const f = (i + 1) / w;
        const x = f / (0.1 + cut * 0.8);
        const mag = 1 / Math.sqrt((1 - x * x) ** 2 + (x / (0.7 + res * 6)) ** 2);
        pts.push({ x: i, y: h - 12 - Math.min(mag, 2.6) * (h * 0.32) });
      }
      strokePath(ctx, pts, PAL.accent, 2);
      ctx.fillStyle = PAL.muted;
      ctx.font = "11px IBM Plex Mono, monospace";
      ctx.fillText("scene A  registration", 8, 16);
      ctx.fillText("scene B  registration", w - 148, 16);
    },
    [morph],
  );
  return (
    <PlotFrame
      title="Morph is a slow stop change"
      math="scene A → scene B"
      caption="A scene is the whole instrument: sound + groove. Morph walks between two stored snapshots — amp channel, kit change, organ stop."
    >
      <canvas ref={ref} className="h-36 w-full" />
      <div className="mt-3">
        <Slider label="Morph" min={0} max={1} step={0.01} value={morph} onChange={setMorph} />
      </div>
    </PlotFrame>
  );
}

export function VoiceBudgetPlot() {
  const [held, setHeld] = useState(8);
  const [unison, setUnison] = useState(1);
  const [layers, setLayers] = useState(1);
  const spent = Math.min(32, held * unison * layers);
  const steal = held * unison * layers > 32;
  return (
    <PlotFrame
      title="32 voices is a choir with a payroll"
      math="spent ≈ notes × unison × layers"
      caption="Leave cymbals or open strings ringing and the quiet ones get stolen. Unison and dual layer multiply the bill. Watch the header count; lift when it saturates."
    >
      <div className="flex items-end gap-1" aria-hidden>
        {Array.from({ length: 32 }, (_, i) => (
          <div
            key={i}
            className={cn("h-16 flex-1 rounded-sm", i < spent ? (steal ? "bg-warn" : "bg-gold") : "bg-line")}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-xs tabular-nums text-muted">
        {spent} / 32 {steal ? "· stealing" : ""}
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Slider label="Held notes" min={1} max={16} step={1} value={held} onChange={setHeld} />
        <Slider label="Unison" min={1} max={7} step={1} value={unison} onChange={setUnison} />
        <Slider label="Layers" min={1} max={2} step={1} value={layers} onChange={setLayers} />
      </div>
    </PlotFrame>
  );
}

export function BouncePathPlot() {
  return (
    <PlotFrame
      title="Leaving the tab"
      caption="LYRA is not a VST. Bounce writes a wav of the output. Backup writes the library (scenes, maps, user patches). A DAW receives MIDI clock or a bounced file — not a plugin instance."
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {[
          ["Bounce", "a take, as audio"],
          ["Backup", "the notebook"],
          ["DAW", "clock, or the wav"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-md border border-line bg-surface px-3 py-4">
            <div className="font-display text-xl text-gold">{t}</div>
            <p className="mt-1 text-xs text-muted">{d}</p>
          </div>
        ))}
      </div>
    </PlotFrame>
  );
}

export function TranslateMapPlot() {
  const cells = [
    ["Path", "osc → filter → amp"],
    ["Envelope", "pick / breath / ring after"],
    ["Tone dry", "harmonics, no hall"],
    ["Room", "one space"],
    ["Motion", "LFO / shape / matrix"],
    ["Time", "arp, groove, glide"],
    ["Architecture", "layer, table, merge"],
    ["Gap", "name what you cannot"],
  ];
  return (
    <PlotFrame
      title="Hear a record as eight questions"
      caption="Transcription, not cloning. Get seventy percent on this bench. The last thirty percent is the honest list."
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cells.map(([t, d]) => (
          <div key={t} className="rounded-md border border-line bg-surface px-3 py-3">
            <div className="font-display text-lg text-gold">{t}</div>
            <p className="mt-1 text-[11px] text-muted">{d}</p>
          </div>
        ))}
      </div>
    </PlotFrame>
  );
}

export function GapBox({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-warn/50 bg-warn/8 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-warn">Not on LYRA / thin — still core</p>
      <div className="mt-2 text-sm leading-relaxed text-fg/90">{children}</div>
    </aside>
  );
}

export function LabBox({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-gold/40 bg-gold/8 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Lab — open LYRA</p>
      <div className="mt-2 text-sm leading-relaxed text-fg/90">{children}</div>
    </aside>
  );
}

export function OkNote({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-ok pl-3 text-sm text-muted">
      <span className="text-ok">Exit check. </span>
      {children}
    </p>
  );
}
