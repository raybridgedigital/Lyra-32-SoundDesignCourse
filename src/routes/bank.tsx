import { createFileRoute, Link } from "@tanstack/react-router";
import { PatchBankList, StackBankList, TranslationNotes } from "@/components/bank-ui";

export const Route = createFileRoute("/bank")({ component: BankPage });

function BankPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-4xl">Your bank</h1>
        <p className="mt-2 text-muted">
          The notebook for L7. Tick roles as User patches and stacks exist on LYRA. Notes stay in this
          browser.
        </p>
      </div>
      <PatchBankList />
      <StackBankList />
      <section className="space-y-3">
        <h2 className="font-display text-2xl">C22 — the 30%</h2>
        <TranslationNotes />
      </section>
      <p className="text-sm text-muted">
        Lessons:{" "}
        <Link to="/c/$id" params={{ id: "C20" }} className="text-gold">
          C20
        </Link>
        ,{" "}
        <Link to="/c/$id" params={{ id: "C21" }} className="text-gold">
          C21
        </Link>
        ,{" "}
        <Link to="/c/$id" params={{ id: "C22" }} className="text-gold">
          C22
        </Link>
        .
      </p>
    </article>
  );
}
