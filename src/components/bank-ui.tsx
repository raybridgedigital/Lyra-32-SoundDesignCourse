import { PATCH_ROLES, STACK_ROLES, useBank } from "@/lib/bank";
import { cn } from "@/lib/utils";

export function PatchBankList() {
  const patches = useBank((s) => s.patches);
  const toggle = useBank((s) => s.togglePatch);
  const n = PATCH_ROLES.filter((r) => patches[r.id]).length;
  return (
    <div className="rounded-lg border border-line bg-panel">
      <div className="flex items-baseline justify-between border-b border-line px-4 py-2.5">
        <h3 className="font-display text-lg">Ten-patch book</h3>
        <span className="font-mono text-xs tabular-nums text-gold">{n} / 10</span>
      </div>
      <ul>
        {PATCH_ROLES.map((r) => (
          <li key={r.id} className="border-b border-line last:border-0">
            <label className="flex cursor-pointer items-start gap-3 px-4 py-3">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-gold"
                checked={!!patches[r.id]}
                onChange={() => toggle(r.id)}
              />
              <span>
                <span className={cn("block text-sm", patches[r.id] ? "text-gold" : "text-fg")}>{r.name}</span>
                <span className="text-xs text-muted">{r.hint}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StackBankList() {
  const stacks = useBank((s) => s.stacks);
  const toggle = useBank((s) => s.toggleStack);
  const n = STACK_ROLES.filter((r) => stacks[r.id]).length;
  return (
    <div className="rounded-lg border border-line bg-panel">
      <div className="flex items-baseline justify-between border-b border-line px-4 py-2.5">
        <h3 className="font-display text-lg">Eight recitals</h3>
        <span className="font-mono text-xs tabular-nums text-gold">{n} / 8</span>
      </div>
      <ul>
        {STACK_ROLES.map((r) => (
          <li key={r.id} className="border-b border-line last:border-0">
            <label className="flex cursor-pointer items-start gap-3 px-4 py-3">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-gold"
                checked={!!stacks[r.id]}
                onChange={() => toggle(r.id)}
              />
              <span>
                <span className={cn("block text-sm", stacks[r.id] ? "text-gold" : "text-fg")}>{r.name}</span>
                <span className="text-xs text-muted">{r.hint} · “+” in the name</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TranslationNotes() {
  const value = useBank((s) => s.translation);
  const set = useBank((s) => s.setTranslation);
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">What you cannot clone</span>
      <textarea
        value={value}
        onChange={(e) => set(e.target.value)}
        rows={6}
        placeholder="The 30%: convolution air, a vocal, a 6-op bell, a sampled acoustic, a real drum room…"
        className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-fg placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
      />
    </label>
  );
}
