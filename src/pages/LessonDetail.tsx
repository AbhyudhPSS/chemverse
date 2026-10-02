import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";

import { getLesson } from "@/data/lessons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Seo from "@/components/seo/Seo";
import NotesRenderer, { extractHeadings } from "@/components/class10/NotesRenderer";
import { cn } from "@/lib/utils";

const LessonDetail = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = getLesson(lessonId || "");

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24">
        <Seo title="Lesson not found" description="That AP Chemistry lesson does not exist." />
        <h1 className="font-display text-display-sm">Lesson not found</h1>
        <p className="mt-3 text-muted-foreground">That lesson isn't part of the AP Chemistry set.</p>
        <Button asChild className="mt-6">
          <Link to="/learn">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to AP Chemistry
          </Link>
        </Button>
      </div>
    );
  }

  const question = lesson.quiz[index];
  const headings = extractHeadings(lesson.notes);

  const submit = () => {
    if (selected === null) return;
    const correct = selected === question.correctAnswer;
    if (correct) setScore((s) => s + 1);
    setResults((r) => {
      const next = [...r];
      next[index] = correct;
      return next;
    });
    setRevealed(true);
  };

  const next = () => {
    if (index < lesson.quiz.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setResults([]);
    setDone(false);
  };

  return (
    <>
      <Seo
        title={lesson.title}
        description={lesson.description}
        path={`/learn/${lesson.id}`}
      />

      <header className="border-b border-border bg-grid">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
          <Link
            to="/learn"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            AP Chemistry
          </Link>

          <h1 className="mt-6 max-w-3xl font-display text-display-sm sm:text-display-md">
            {lesson.title}
          </h1>
          <p className="measure mt-3 text-base leading-relaxed text-muted-foreground">
            {lesson.description}
          </p>
          <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
            {lesson.duration} video · {lesson.quiz.length} questions
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5">
        <Tabs defaultValue="notes">
          <div className="glass-bar sticky top-16 z-30 -mx-5 px-5">
            <TabsList>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>
          </div>

          {/* Notes */}
          <TabsContent value="notes" className="pb-16">
            <div className="grid gap-12 lg:grid-cols-[1fr_15rem] lg:gap-14">
              <article className="min-w-0 max-w-[44rem]">
                <NotesRenderer notes={lesson.notes} />
              </article>

              {headings.length > 0 && (
                <nav
                  aria-label="On this page"
                  className="sticky top-32 hidden max-h-[calc(100vh-10rem)] overflow-y-auto lg:block"
                >
                  <h2 className="eyebrow">On this page</h2>
                  <ul className="mt-4 space-y-0.5 border-l border-border">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className={cn(
                            "-ml-px block border-l-2 border-transparent py-1.5 text-sm leading-snug text-muted-foreground transition-colors hover:border-border hover:text-foreground",
                            h.level === 3 ? "pl-6 text-[0.8125rem]" : "pl-4",
                          )}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </TabsContent>

          {/* Video */}
          <TabsContent value="video" className="pb-16">
            <figure className="max-w-4xl overflow-hidden rounded-lg border border-border bg-card">
              <div className="aspect-video bg-muted">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  loading="lazy"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <figcaption className="p-4 text-sm text-muted-foreground">
                {lesson.title} — {lesson.duration}
              </figcaption>
            </figure>
          </TabsContent>

          {/* Quiz */}
          <TabsContent value="quiz" className="pb-16">
            <div className="max-w-2xl">
              {done ? (
                <div className="rounded-lg border border-border bg-card p-8 text-center">
                  <p className="eyebrow">Result</p>
                  <p className="mt-3 font-display text-display-sm text-foreground">
                    {score}
                    <span className="text-muted-foreground">/{lesson.quiz.length}</span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {Math.round((score / lesson.quiz.length) * 100)}% correct
                  </p>

                  <ol className="mt-6 flex flex-wrap justify-center gap-1.5">
                    {results.map((ok, i) => (
                      <li
                        key={i}
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded border font-mono text-xs",
                          ok
                            ? "border-viridian/40 bg-viridian/10 text-viridian"
                            : "border-crimson/40 bg-crimson/10 text-crimson",
                        )}
                      >
                        <span className="sr-only">{`Question ${i + 1}: ${ok ? "correct" : "incorrect"}`}</span>
                        <span aria-hidden="true">{i + 1}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-7 flex justify-center gap-3">
                    <Button onClick={restart} variant="outline">
                      Try again
                    </Button>
                    <Button asChild>
                      <Link to="/learn">Next lesson</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
                      Question {index + 1} / {lesson.quiz.length}
                    </span>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
                      Score {score}
                    </span>
                  </div>

                  <div
                    role="progressbar"
                    aria-valuenow={index + (revealed ? 1 : 0)}
                    aria-valuemin={0}
                    aria-valuemax={lesson.quiz.length}
                    aria-label="Quiz progress"
                    className="h-0.5 bg-muted"
                  >
                    <div
                      className="h-full bg-primary transition-[width] duration-300 ease-out"
                      style={{
                        width: `${((index + (revealed ? 1 : 0)) / lesson.quiz.length) * 100}%`,
                      }}
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-base font-medium leading-relaxed text-foreground">
                      {question.question}
                    </p>

                    <div className="mt-5 space-y-2">
                      {question.options.map((option, i) => {
                        const isCorrect = i === question.correctAnswer;
                        const isChosen = selected === i;

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => !revealed && setSelected(i)}
                            disabled={revealed}
                            aria-pressed={isChosen}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition-colors",
                              revealed && isCorrect && "border-viridian/50 bg-viridian/10 text-foreground",
                              revealed && isChosen && !isCorrect && "border-crimson/50 bg-crimson/10 text-foreground",
                              revealed && !isCorrect && !isChosen && "border-border text-muted-foreground opacity-60",
                              !revealed && isChosen && "border-primary bg-accent",
                              !revealed && !isChosen && "border-border hover:border-foreground/25 hover:bg-muted",
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-current font-mono text-[0.6875rem] text-muted-foreground"
                            >
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {revealed && isCorrect && <Check className="h-4 w-4 shrink-0 text-viridian" />}
                            {revealed && isChosen && !isCorrect && (
                              <X className="h-4 w-4 shrink-0 text-crimson" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {revealed && (
                      <p
                        role="status"
                        className="mt-5 border-l-2 border-primary bg-accent/60 px-4 py-3 text-sm leading-relaxed text-foreground/85"
                      >
                        <span className="font-medium text-foreground">Why: </span>
                        {question.explanation}
                      </p>
                    )}

                    <div className="mt-6 flex justify-end">
                      {revealed ? (
                        <Button onClick={next}>
                          {index < lesson.quiz.length - 1 ? "Next question" : "See result"}
                        </Button>
                      ) : (
                        <Button onClick={submit} disabled={selected === null}>
                          Check answer
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default LessonDetail;
