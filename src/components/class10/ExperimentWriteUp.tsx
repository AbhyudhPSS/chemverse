import { Badge } from "@/components/ui/badge";
import ReactionVisual from "@/components/class10/ReactionVisual";
import type { Experiment } from "@/data/class10";

interface Props {
  experiment: Experiment;
  /** Heading level to render the title at, so it fits the host page's outline. */
  as?: "h2" | "h3";
  showTitle?: boolean;
}

/**
 * The standard lab write-up for an NCERT activity. Shared by the chapter page
 * and the Lab so the two never drift apart.
 */
const ExperimentWriteUp = ({ experiment: exp, as: Heading = "h2", showTitle = true }: Props) => (
  <div>
    {showTitle && (
      <div className="flex flex-wrap items-start justify-between gap-3">
        <Heading className="font-display text-2xl text-foreground">{exp.title}</Heading>
        {exp.activityRef && <Badge variant="outline">{exp.activityRef}</Badge>}
      </div>
    )}

    <p className="mt-3 text-[0.9375rem] leading-relaxed text-foreground/80">
      <span className="font-medium text-foreground">Aim. </span>
      {exp.aim}
    </p>

    {/* What you should actually see happen */}
    {exp.visual && <ReactionVisual spec={exp.visual} className="mt-5" />}

    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      <div>
        <h4 className="eyebrow">Apparatus</h4>
        <ul className="mt-3 space-y-1.5">
          {exp.materials.map((m, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
              <span
                aria-hidden="true"
                className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-muted-foreground"
              />
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="eyebrow">Method</h4>
        <ol className="mt-3 space-y-1.5">
          {exp.procedure.map((step, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
              <span className="w-5 shrink-0 font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>

    <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
      <div className="bg-card p-4">
        <dt className="eyebrow text-saffron">Observation</dt>
        <dd className="mt-2 text-sm leading-relaxed text-foreground/80">{exp.observation}</dd>
      </div>
      <div className="bg-card p-4">
        <dt className="eyebrow text-viridian">Conclusion</dt>
        <dd className="mt-2 text-sm leading-relaxed text-foreground/80">{exp.conclusion}</dd>
      </div>
    </dl>

    {exp.reaction && (
      <div className="mt-4 rounded-md border-l-2 border-cobalt bg-cobalt/5 px-4 py-3">
        <h4 className="eyebrow text-cobalt">Reaction</h4>
        <p className="mt-1.5 break-words font-mono text-sm text-foreground">{exp.reaction}</p>
      </div>
    )}

    {exp.safety && (
      <p className="mt-4 border-l-2 border-crimson bg-crimson/5 px-4 py-2.5 text-sm text-foreground/80">
        <span className="font-medium text-crimson">Safety. </span>
        {exp.safety}
      </p>
    )}
  </div>
);

export default ExperimentWriteUp;
