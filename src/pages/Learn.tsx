import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Seo from "@/components/seo/Seo";
import { getLessonsByTopic, lessons, units } from "@/data/lessons";

const Learn = () => (
  <>
    <Seo
      title="AP Chemistry"
      description={`Nine AP Chemistry units across ${lessons.length} lessons — video explanations, study notes and a quiz for each topic, from atomic structure to electrochemistry.`}
      path="/learn"
    />

    <header className="border-b border-border bg-grid">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <p className="eyebrow">Introductory university level</p>
        <h1 className="mt-3 font-display text-display-sm sm:text-display-md">AP Chemistry</h1>
        <p className="measure mt-4 text-base leading-relaxed text-muted-foreground">
          Nine units, {lessons.length} lessons. Each one pairs a video explanation with written
          notes and a short quiz so you can check what actually stuck.
        </p>
      </div>
    </header>

    <div className="mx-auto max-w-4xl px-5 py-12">
      <ol className="space-y-10">
        {units.map((unit) => {
          const unitLessons = getLessonsByTopic(unit.id);

          return (
            <li key={unit.id} id={unit.id} className="scroll-mt-32">
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="font-display text-3xl leading-none text-muted-foreground/50"
                >
                  {String(unit.number).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl text-foreground">
                    <span className="sr-only">Unit {unit.number}: </span>
                    {unit.title}
                  </h2>
                  <p className="measure mt-1 text-sm leading-relaxed text-muted-foreground">
                    {unit.description}
                  </p>
                </div>
              </div>

              {unitLessons.length > 0 ? (
                <ul className="mt-5 border-t border-border sm:ml-14">
                  {unitLessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        to={`/learn/${lesson.id}`}
                        className="group flex items-center gap-4 border-b border-border py-3.5 transition-colors hover:bg-muted/50 sm:px-3"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[0.9375rem] font-medium text-foreground">
                            {lesson.title}
                          </span>
                          <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
                            {lesson.duration} · {lesson.quiz.length} questions
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 ease-out group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 rounded-md border border-dashed border-border px-4 py-3 text-sm text-muted-foreground sm:ml-14">
                  Lessons for this unit are still being written.
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-14 border-t border-border pt-6 text-sm text-muted-foreground">
        Studying for CBSE instead?{" "}
        <Link to="/class10" className="text-primary underline underline-offset-4">
          The Class 10 chapters
        </Link>{" "}
        follow the NCERT syllabus directly.
      </p>
    </div>
  </>
);

export default Learn;
