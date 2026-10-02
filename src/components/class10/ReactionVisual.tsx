import { useEffect, useState } from "react";
import { Play, RotateCcw, Thermometer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { activityFigures } from "@/components/class10/figures";

export interface VisualSpec {
  /** Id of the NCERT apparatus figure to draw instead of the plain tube. */
  figure?: string;
  /** What the tube looks like before mixing / heating. */
  before: string;
  /** What it looks like afterwards. Omit when only a solid changes. */
  after?: string;
  /** Name of a gas given off — drives the rising bubbles. */
  gas?: string;
  /** An insoluble solid that settles out. */
  precipitate?: { name: string; colour: string };
  /** A solid sitting in the tube throughout (a metal strip, crystals). */
  solid?: { name: string; colourBefore: string; colourAfter?: string };
  /** Noticeable heat change. */
  thermal?: "exothermic" | "endothermic";
  /** The solid burns with a bright flame (magnesium ribbon). */
  flame?: boolean;
  /** Labels for the two states, shown under the tube. */
  labels?: { before: string; after: string };
}

const LIQUID_TOP = 96;
const LIQUID_BOTTOM = 196;

/**
 * A small animated test tube that plays the observable change in an activity:
 * a colour change, a precipitate settling, or a gas bubbling off.
 *
 * It is a teaching aid, so every state it shows is driven by the activity's
 * real observation rather than generic motion.
 */
const ReactionVisual = ({ spec, className }: { spec: VisualSpec; className?: string }) => {
  const [run, setRun] = useState(false);

  // Restart cleanly if the activity changes underneath us.
  useEffect(() => setRun(false), [spec]);

  const figure = spec.figure ? activityFigures[spec.figure] : undefined;
  const liquid = run ? spec.after ?? spec.before : spec.before;
  const solidColour = run ? spec.solid?.colourAfter ?? spec.solid?.colourBefore : spec.solid?.colourBefore;
  const showGas = run && Boolean(spec.gas);
  const showPrecipitate = run && Boolean(spec.precipitate);
  const showFlame = run && Boolean(spec.flame);

  const stateLabel = run
    ? spec.labels?.after ?? "After the reaction"
    : spec.labels?.before ?? "Before mixing";

  return (
    <div className={cn("rounded-lg border border-border bg-muted/30 p-4", className)}>
      <div className="flex items-center gap-5 sm:gap-7">
        {/* ---- Apparatus ---- */}
        <div className="relative shrink-0">
          {figure ? (
            <svg
              viewBox={figure.viewBox}
              className="h-44 w-auto max-w-full"
              role="img"
              aria-label={stateLabel}
            >
              <figure.Component run={run} />
            </svg>
          ) : (
          <svg viewBox="0 0 120 250" className="h-44 w-auto" role="img" aria-label={stateLabel}>
            <defs>
              <clipPath id="rv-inside">
                <path d="M44 26 H76 V196 a16 16 0 0 1 -32 0 Z" />
              </clipPath>
            </defs>

            {/* Flame above the tube mouth */}
            {showFlame && (
              <g>
                <ellipse cx="60" cy="14" rx="9" ry="14" fill="hsl(var(--saffron))" opacity="0.9">
                  <animate attributeName="ry" values="12;16;12" dur="600ms" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="60" cy="16" rx="4.5" ry="8" fill="hsl(40 100% 96%)">
                  <animate attributeName="ry" values="7;10;7" dur="600ms" repeatCount="indefinite" />
                </ellipse>
              </g>
            )}

            {/* Glass */}
            <path
              d="M40 22 H80 V196 a20 20 0 0 1 -40 0 Z"
              fill="hsl(var(--muted))"
              fillOpacity="0.3"
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />

            <g clipPath="url(#rv-inside)">
              {/* Solution */}
              <rect
                x="44"
                y={LIQUID_TOP}
                width="32"
                height={LIQUID_BOTTOM - LIQUID_TOP}
                fill={liquid}
                style={{ transition: "fill 900ms ease" }}
              />

              {/* Precipitate settling out */}
              {showPrecipitate && (
                <ellipse cx="60" cy="190" rx="17" ry="11" fill={spec.precipitate!.colour}>
                  <animate attributeName="ry" from="0" to="11" dur="900ms" fill="freeze" />
                </ellipse>
              )}

              {/* Solid in the tube */}
              {spec.solid && (
                <rect
                  x="54"
                  y="140"
                  width="12"
                  height="44"
                  rx="2"
                  fill={solidColour}
                  style={{ transition: "fill 900ms ease" }}
                />
              )}

              {/* Gas bubbles */}
              {showGas &&
                [0, 1, 2, 3, 4].map((i) => (
                  <circle key={i} cx={49 + i * 6} cy="188" r={1.8 + (i % 3) * 0.9} fill="hsl(var(--background))" opacity="0.92">
                    <animate attributeName="cy" from="188" to={String(LIQUID_TOP - 4)} dur={`${1.1 + i * 0.22}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.92;0" dur={`${1.1 + i * 0.22}s`} repeatCount="indefinite" />
                  </circle>
                ))}
            </g>

            {/* Rim */}
            <rect x="36" y="18" width="48" height="6" rx="3" fill="hsl(var(--border))" />
          </svg>
          )}
        </div>

        {/* ---- Read-out ---- */}
        <div className="min-w-0 flex-1">
          <p className="eyebrow">{stateLabel}</p>

          <ul className="mt-2.5 space-y-1.5" aria-live="polite">
            {spec.after && spec.after !== spec.before && (
              <li className="flex items-center gap-2 text-sm text-foreground/80">
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 rounded-[3px] border border-foreground/15"
                  style={{ background: liquid, transition: "background 900ms ease" }}
                />
                Colour change
              </li>
            )}
            {spec.gas && (
              <li className={cn("flex items-center gap-2 text-sm", showGas ? "text-cobalt" : "text-muted-foreground")}>
                <span aria-hidden="true" className="w-3.5 shrink-0 text-center">↑</span>
                {spec.gas} given off
              </li>
            )}
            {spec.precipitate && (
              <li className={cn("flex items-center gap-2 text-sm", showPrecipitate ? "text-saffron" : "text-muted-foreground")}>
                <span aria-hidden="true" className="w-3.5 shrink-0 text-center">↓</span>
                {spec.precipitate.name} precipitate
              </li>
            )}
            {spec.thermal && (
              <li className={cn("flex items-center gap-2 text-sm", run ? "text-crimson" : "text-muted-foreground")}>
                <Thermometer aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                {spec.thermal === "exothermic" ? "Heat given out" : "Heat absorbed"}
              </li>
            )}
          </ul>

          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={() => setRun(true)} disabled={run}>
              <Play aria-hidden="true" className="h-3.5 w-3.5" />
              Run
            </Button>
            {run && (
              <Button size="sm" variant="ghost" onClick={() => setRun(false)}>
                <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionVisual;
