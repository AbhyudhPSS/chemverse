import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Seo from "@/components/seo/Seo";
import { chapters, type Chapter } from "@/data/class12";
import { cn } from "@/lib/utils";

/** Literal class strings so Tailwind emits exactly the variants used. */
const chapterAccent: Record<Chapter["color"], { tile: string; rule: string }> = {
  cobalt: { tile: "bg-cobalt/10 border-cobalt/30", rule: "bg-cobalt" },
  iris: { tile: "bg-iris/10 border-iris/30", rule: "bg-iris" },
  moss: { tile: "bg-moss/10 border-moss/30", rule: "bg-moss" },
  plum: { tile: "bg-plum/10 border-plum/30", rule: "bg-plum" },
  copper: { tile: "bg-copper/10 border-copper/30", rule: "bg-copper" },
  cyanine: { tile: "bg-cyanine/10 border-cyanine/30", rule: "bg-cyanine" },
};

const Class12 = () => (
  <>
    <Seo
      title="Class 12 Chemistry"
      description="NCERT Class 12 Chemistry: chapter notes, experiments, video lessons and practice questions for Solutions, Electrochemistry, Chemical Kinetics, d and f Block Elements, Coordination Compounds, Haloalkanes and Haloarenes, Alcohols Phenols and Ethers, Aldehydes Ketones and Carboxylic Acids, Amines, and Biomolecules."
      path="/class12"
    />

    <header className="border-b border-border bg-grid">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <p className="eyebrow">CBSE · NCERT syllabus</p>
        <h1 className="mt-3 font-display text-display-sm sm:text-display-md">Class 12 Chemistry</h1>
        <p className="measure mt-4 text-base leading-relaxed text-muted-foreground">
          Every chapter written out in full — physical, inorganic and organic chemistry — with
          worked experiments, video explanations, and questions from one to five marks with model
          answers.
        </p>
      </div>
    </header>

    <div className="mx-auto max-w-4xl px-5 py-12">
      <ol className="space-y-4">
        {chapters.map((chapter) => {
          const accent = chapterAccent[chapter.color];
          const questionCount =
            chapter.objectiveQuestions.length + chapter.subjectiveQuestions.length;

          return (
            <li key={chapter.id}>
              <Link
                to={`/class12/${chapter.id}`}
                className="group relative block overflow-hidden rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/25 sm:p-7"
              >
                <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-1", accent.rule)} />

                <div className="flex items-start gap-4 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded border text-2xl",
                      accent.tile,
                    )}
                  >
                    {chapter.icon}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="eyebrow">Chapter {chapter.number}</p>
                    <h2 className="mt-1.5 font-display text-2xl text-foreground sm:text-3xl">
                      {chapter.title}
                    </h2>
                    <p className="measure mt-3 text-sm leading-relaxed text-muted-foreground">
                      {chapter.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
                      <li>{chapter.videos.length} videos</li>
                      <li>{chapter.experiments.length} experiments</li>
                      <li>{questionCount} questions</li>
                      <li>{chapter.readingTime}</li>
                    </ul>
                  </div>

                  <ArrowRight className="mt-1 hidden h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-150 ease-out group-hover:translate-x-1 sm:block" />
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      <p className="mt-10 text-sm text-muted-foreground">
        Looking for the earlier chemistry syllabus?{" "}
        <Link to="/class11" className="text-primary underline underline-offset-4">
          Class 11 chemistry
        </Link>{" "}
        covers the foundations this builds on.
      </p>
    </div>
  </>
);

export default Class12;
