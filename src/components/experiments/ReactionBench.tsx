import { useEffect, useMemo, useState } from "react";
import { FlaskConical, RotateCcw, Thermometer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  getReagent,
  mix,
  reagents,
  suggestedMixes,
  type MixResult,
  type Reagent,
  type ReagentKind,
} from "@/data/reactions";

const kindLabels: Record<ReagentKind, string> = {
  metal: "Metals",
  acid: "Acids",
  base: "Bases",
  salt: "Salt solutions",
  oxide: "Oxides & water",
  gas: "Gases",
};

const kindOrder: ReagentKind[] = ["metal", "acid", "base", "salt", "oxide", "gas"];

/* ------------------------------------------------------------------ */
/* Test tube                                                           */
/* ------------------------------------------------------------------ */

const TestTube = ({ result, mixing }: { result: MixResult | null; mixing: boolean }) => {
  const reaction = result?.kind === "reaction" ? result.reaction : null;
  const effects = reaction?.effects;

  const liquid = effects?.solutionColour ?? "hsl(40 30% 96%)";
  const hasGas = Boolean(effects?.gas);
  const precipitate = effects?.precipitate;
  const deposit = effects?.deposit;
  const exothermic = effects?.thermal === "exothermic";

  return (
    <div className="relative flex items-end justify-center">
      <svg
        viewBox="0 0 120 230"
        role="img"
        aria-label={
          reaction
            ? `Test tube showing: ${reaction.observation}`
            : "An empty test tube, waiting for two reagents"
        }
        className="h-56 w-auto sm:h-64"
      >
        <defs>
          <clipPath id="tube-inside">
            {/* Inner cavity of the tube — everything liquid is clipped to this. */}
            <path d="M42 22 H78 V178 a18 18 0 0 1 -36 0 Z" />
          </clipPath>
        </defs>

        {/* Glass body */}
        <path
          d="M38 18 H82 V178 a22 22 0 0 1 -44 0 Z"
          fill="hsl(var(--muted))"
          fillOpacity="0.35"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />

        <g clipPath="url(#tube-inside)">
          {/* Liquid */}
          <rect
            x="42"
            y={result ? 78 : 118}
            width="36"
            height="120"
            fill={liquid}
            style={{ transition: "y 500ms cubic-bezier(0.2,0,0,1), fill 700ms ease" }}
          />

          {/* Precipitate settling at the bottom */}
          {precipitate && (
            <ellipse cx="60" cy="182" rx="19" ry="12" fill={precipitate.colour} opacity="0.95">
              <animate attributeName="ry" from="0" to="12" dur="800ms" fill="freeze" />
            </ellipse>
          )}

          {/* Solid reagent / displaced metal deposit */}
          {deposit && (
            <rect x="52" y="140" width="16" height="34" rx="3" fill={deposit.colour}>
              <animate attributeName="opacity" from="0.2" to="1" dur="900ms" fill="freeze" />
            </rect>
          )}

          {/* Gas bubbles */}
          {hasGas &&
            [0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={48 + i * 6} cy="175" r={2 + (i % 3)} fill="hsl(var(--background))" opacity="0.9">
                <animate
                  attributeName="cy"
                  from="175"
                  to="82"
                  dur={`${1.1 + i * 0.25}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.9;0"
                  dur={`${1.1 + i * 0.25}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
        </g>

        {/* Rim */}
        <rect x="34" y="14" width="52" height="7" rx="3.5" fill="hsl(var(--border))" />

        {/* Swirl while mixing */}
        {mixing && (
          <circle cx="60" cy="130" r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6">
            <animate attributeName="r" values="6;20;6" dur="700ms" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur="700ms" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {/* Read-outs beside the tube */}
      <div className="absolute -right-1 top-2 flex flex-col items-start gap-1.5 sm:right-0">
        {hasGas && (
          <span className="rounded border border-cobalt/40 bg-cobalt/10 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-cobalt">
            {effects?.gas} ↑
          </span>
        )}
        {precipitate && (
          <span className="rounded border border-saffron/40 bg-saffron/10 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-saffron">
            Precipitate ↓
          </span>
        )}
        {exothermic && (
          <span className="flex items-center gap-1 rounded border border-crimson/40 bg-crimson/10 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-crimson">
            <Thermometer aria-hidden="true" className="h-3 w-3" />
            Heat
          </span>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Reagent picking                                                     */
/* ------------------------------------------------------------------ */

const ReagentSwatch = ({ reagent }: { reagent: Reagent }) => (
  <span
    aria-hidden="true"
    className="h-4 w-4 shrink-0 rounded-[3px] border border-foreground/15"
    style={{ background: reagent.colour }}
  />
);

const Slot = ({
  label,
  reagent,
  active,
  onClick,
}: {
  label: string;
  reagent?: Reagent;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-expanded={active}
    className={cn(
      "flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors",
      active ? "border-primary bg-accent" : "border-border bg-card hover:border-foreground/25",
    )}
  >
    {reagent ? (
      <>
        <ReagentSwatch reagent={reagent} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">{reagent.name}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {reagent.formula} ({reagent.state})
          </span>
        </span>
      </>
    ) : (
      <>
        <span
          aria-hidden="true"
          className="h-4 w-4 shrink-0 rounded-[3px] border border-dashed border-muted-foreground/50"
        />
        <span className="flex-1 text-sm text-muted-foreground">{label}</span>
      </>
    )}
  </button>
);

/* ------------------------------------------------------------------ */
/* Bench                                                               */
/* ------------------------------------------------------------------ */

const ReactionBench = () => {
  const [a, setA] = useState<string | null>(null);
  const [b, setB] = useState<string | null>(null);
  const [slot, setSlot] = useState<"a" | "b" | null>("a");
  const [result, setResult] = useState<MixResult | null>(null);
  const [mixing, setMixing] = useState(false);

  const reagentA = a ? getReagent(a) : undefined;
  const reagentB = b ? getReagent(b) : undefined;

  const grouped = useMemo(
    () =>
      kindOrder
        .map((kind) => ({ kind, items: reagents.filter((r) => r.kind === kind) }))
        .filter((g) => g.items.length > 0),
    [],
  );

  // Changing a reagent invalidates the previous outcome.
  useEffect(() => {
    setResult(null);
  }, [a, b]);

  const choose = (id: string) => {
    if (slot === "a") {
      setA(id);
      setSlot(b ? null : "b");
    } else if (slot === "b") {
      setB(id);
      setSlot(null);
    }
  };

  const runMix = () => {
    if (!a || !b) return;
    setMixing(true);
    setResult(null);
    window.setTimeout(() => {
      setResult(mix(a, b));
      setMixing(false);
    }, 650);
  };

  const reset = () => {
    setA(null);
    setB(null);
    setResult(null);
    setSlot("a");
  };

  const reaction = result?.kind === "reaction" ? result.reaction : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-10">
      {/* ---- Controls ---- */}
      <div className="min-w-0">
        <h2 className="eyebrow">Choose two reagents</h2>

        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <Slot
            label="Select the first reagent"
            reagent={reagentA}
            active={slot === "a"}
            onClick={() => setSlot(slot === "a" ? null : "a")}
          />
          <span aria-hidden="true" className="hidden text-center font-display text-2xl text-muted-foreground sm:block">
            +
          </span>
          <Slot
            label="Select the second reagent"
            reagent={reagentB}
            active={slot === "b"}
            onClick={() => setSlot(slot === "b" ? null : "b")}
          />
        </div>

        {/* Shelf */}
        {slot && (
          <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">
              Pick the {slot === "a" ? "first" : "second"} reagent:
            </p>
            <div className="mt-4 space-y-4">
              {grouped.map((group) => (
                <div key={group.kind}>
                  <h3 className="eyebrow">{kindLabels[group.kind]}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((r) => {
                      const selected = (slot === "a" ? a : b) === r.id;
                      const takenByOther = (slot === "a" ? b : a) === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          disabled={takenByOther}
                          onClick={() => choose(r.id)}
                          aria-pressed={selected}
                          title={takenByOther ? "Already in the other slot" : r.name}
                          className={cn(
                            "flex items-center gap-2 rounded border px-2.5 py-1.5 text-xs transition-colors",
                            selected
                              ? "border-primary bg-accent text-foreground"
                              : "border-border bg-card text-muted-foreground hover:border-foreground/25 hover:text-foreground",
                            takenByOther && "cursor-not-allowed opacity-40",
                          )}
                        >
                          <ReagentSwatch reagent={r} />
                          <span className="font-mono">{r.formula}</span>
                          <span className="hidden sm:inline">{r.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button onClick={runMix} disabled={!a || !b || mixing}>
            <FlaskConical aria-hidden="true" className="h-4 w-4" />
            {mixing ? "Mixing…" : "Mix them"}
          </Button>
          {(a || b) && (
            <Button variant="ghost" onClick={reset}>
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Reset
            </Button>
          )}
        </div>

        {/* Suggestions */}
        <div className="mt-8 border-t border-border pt-5">
          <h2 className="eyebrow">Try one of these</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {suggestedMixes.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  setA(s.pair[0]);
                  setB(s.pair[1]);
                  setSlot(null);
                  setMixing(true);
                  setResult(null);
                  window.setTimeout(() => {
                    setResult(mix(s.pair[0], s.pair[1]));
                    setMixing(false);
                  }, 650);
                }}
                className="rounded border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Bench read-out ---- */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="glass-panel rounded-lg p-5">
          <TestTube result={result} mixing={mixing} />

          <div aria-live="polite" className="mt-5">
            {!result && !mixing && (
              <p className="text-center text-sm text-muted-foreground">
                {a && b
                  ? "Press “Mix them” to see what happens."
                  : "Choose two reagents to begin."}
              </p>
            )}

            {mixing && <p className="text-center text-sm text-muted-foreground">Mixing…</p>}

            {reaction && (
              <div>
                <Badge variant="outline" className="border-viridian/40 text-viridian">
                  {reaction.type}
                </Badge>
                <p className="mt-3 break-words font-mono text-[0.8125rem] leading-relaxed text-foreground">
                  {reaction.equation}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  <span className="font-medium text-foreground">You see. </span>
                  {reaction.observation}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reaction.explanation}
                </p>
              </div>
            )}

            {result?.kind === "none" && (
              <div>
                <Badge variant="outline" className="border-muted-foreground/40 text-muted-foreground">
                  No reaction
                </Badge>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  {result.explanation}
                </p>
              </div>
            )}

            {result?.kind === "unknown" && (
              <div>
                <Badge variant="outline" className="border-muted-foreground/40 text-muted-foreground">
                  Not in this bench
                </Badge>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  This pair isn't part of the Class 10 syllabus set, so no result is modelled here.
                  Try one of the suggested combinations.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          A simulation for learning. Never mix real reagents outside a supervised lab.
        </p>
      </div>
    </div>
  );
};

export default ReactionBench;
