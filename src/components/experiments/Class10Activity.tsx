import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import ExperimentWriteUp from "@/components/class10/ExperimentWriteUp";
import { chapters } from "@/data/class10";

/**
 * Renders an NCERT Class 10 activity inside the Lab. The Lab registry maps
 * ids of the form `c10-<activity-id>`, so the chapter is resolved from the id
 * rather than duplicating the content here.
 */
const Class10Activity = () => {
  const { experimentId } = useParams();
  const activityId = experimentId?.replace(/^c10-/, "");

  const found = chapters
    .flatMap((chapter) => chapter.experiments.map((experiment) => ({ chapter, experiment })))
    .find(({ experiment }) => experiment.id === activityId);

  if (!found) {
    return (
      <p className="text-sm text-muted-foreground">
        This activity could not be found. Browse the{" "}
        <Link to="/class10" className="text-primary underline underline-offset-4">
          Class 10 chapters
        </Link>{" "}
        instead.
      </p>
    );
  }

  const { chapter, experiment } = found;

  return (
    <div>
      <ExperimentWriteUp experiment={experiment} showTitle={false} />

      <Link
        to={`/class10/${chapter.id}`}
        className="group mt-8 flex items-center justify-between gap-4 rounded-md border border-border bg-muted/40 px-4 py-3 transition-colors hover:border-foreground/25"
      >
        <span className="text-sm text-muted-foreground">
          From <span className="text-foreground">Chapter {chapter.number} — {chapter.title}</span>.
          Read the full notes for the theory behind it.
        </span>
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 ease-out group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
};

export default Class10Activity;
