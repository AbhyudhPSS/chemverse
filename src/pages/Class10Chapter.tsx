import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ChevronDown, X } from "lucide-react";

import Seo from "@/components/seo/Seo";
import NotesRenderer, { extractHeadings, extractSpeechText } from "@/components/class10/NotesRenderer";
import NotesPlayer from "@/components/class10/NotesPlayer";
import ExperimentWriteUp from "@/components/class10/ExperimentWriteUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  getChapter,
  type Chapter,
  type ObjectiveQuestion,
  type SubjectiveQuestion,
} from "@/data/class10";

const chapterAccent: Record<Chapter["color"], string> = {
  copper: "bg-copper/10 border-copper/30",
  cyanine: "bg-cyanine/10 border-cyanine/30",
  viridian: "bg-viridian/10 border-viridian/30",
  saffron: "bg-saffron/10 border-saffron/30",
};

const markStyle: Record<number, string> = {
  1: "border-viridian/40 text-viridian",
  2: "border-cyanine/40 text-cyanine",
  3: "border-saffron/40 text-saffron",
  5: "border-magenta/40 text-magenta",
};

/* ------------------------------------------------------------------ */
/* Table of contents                                                    */
/* ------------------------------------------------------------------ */

const TableOfContents = ({ notes }: { notes: string }) => {
  const headings = useMemo(() => extractHeadings(notes), [notes]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Watch the band just below the sticky header.
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
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
              aria-current={activeId === h.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors",
                h.level === 3 ? "pl-6 text-[0.8125rem]" : "pl-4",
                activeId === h.id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/* ------------------------------------------------------------------ */
/* Objective quiz                                                       */
/* ------------------------------------------------------------------ */

const ObjectiveQuiz = ({ questions }: { questions: ObjectiveQuestion[] }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const question = questions[index];

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
    if (index < questions.length - 1) {
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

  if (done) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="eyebrow">Result</p>
        <p className="mt-3 font-display text-display-sm text-foreground">
          {score}
          <span className="text-muted-foreground">/{questions.length}</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {Math.round((score / questions.length) * 100)}% correct
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

        <Button onClick={restart} variant="outline" className="mt-7">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
          Question {index + 1} / {questions.length}
        </span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
          Score {score}
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={index + (revealed ? 1 : 0)}
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-label="Quiz progress"
        className="h-0.5 bg-muted"
      >
        <div
          className="h-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-base font-medium leading-relaxed text-foreground">{question.question}</p>

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
                {revealed && isChosen && !isCorrect && <X className="h-4 w-4 shrink-0 text-crimson" />}
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
              {index < questions.length - 1 ? "Next question" : "See result"}
            </Button>
          ) : (
            <Button onClick={submit} disabled={selected === null}>
              Check answer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Subjective question                                                  */
/* ------------------------------------------------------------------ */

const SubjectiveCard = ({ q, index }: { q: SubjectiveQuestion; index: number }) => {
  const [open, setOpen] = useState(false);
  const panelId = `answer-${index}`;

  return (
    <li className="border-b border-border py-6 first:pt-0 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <p className="flex-1 text-[0.9375rem] font-medium leading-relaxed text-foreground">
          <span className="mr-2 font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          {q.question}
        </p>
        <Badge variant="outline" className={cn("shrink-0", markStyle[q.marks])}>
          {q.marks} {q.marks === 1 ? "mark" : "marks"}
        </Badge>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        {open ? "Hide model answer" : "Show model answer"}
        <ChevronDown
          aria-hidden="true"
          className={cn("h-4 w-4 transition-transform duration-200 ease-out", open && "rotate-180")}
        />
      </button>

      {open && (
        <div id={panelId} className="mt-3 border-l-2 border-border bg-muted/50 px-4 py-3">
          {q.answer.split("\n").map((line, li) =>
            line.trim() === "" ? (
              <div key={li} className="h-2" />
            ) : (
              <p
                key={li}
                className="text-sm leading-[1.7] text-foreground/80"
                dangerouslySetInnerHTML={{
                  __html: line.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="font-semibold text-foreground">$1</strong>',
                  ),
                }}
              />
            ),
          )}
        </div>
      )}
    </li>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

const Class10Chapter = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const chapter = getChapter(chapterId || "");

  if (!chapter) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24">
        <Seo title="Chapter not found" description="That Class 10 chapter does not exist." />
        <h1 className="font-display text-display-sm">Chapter not found</h1>
        <p className="mt-3 text-muted-foreground">
          That chapter isn't part of the Class 10 section.
        </p>
        <Button asChild className="mt-6">
          <Link to="/class10">
            <ArrowLeft className="h-4 w-4" />
            Back to Class 10
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${chapter.title} — Class 10`}
        description={chapter.description}
        path={`/class10/${chapter.id}`}
      />

      {/* Masthead */}
      <header className="border-b border-border bg-grid">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
          <Link
            to="/class10"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Class 10 Chemistry
          </Link>

          <div className="mt-6 flex items-start gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded border text-3xl",
                chapterAccent[chapter.color],
              )}
            >
              {chapter.icon}
            </span>
            <div>
              <p className="eyebrow">Chapter {chapter.number}</p>
              <h1 className="mt-1.5 font-display text-display-sm sm:text-display-md">
                {chapter.title}
              </h1>
              <p className="mt-2 text-base italic text-muted-foreground">{chapter.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5">
        <Tabs defaultValue="notes">
          <div className="glass-bar sticky top-16 z-30 -mx-5 px-5">
            <TabsList>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="experiments">
                Experiments
                <span className="font-mono text-[0.6875rem] text-muted-foreground">
                  {chapter.experiments.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="videos">
                Videos
                <span className="font-mono text-[0.6875rem] text-muted-foreground">
                  {chapter.videos.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>
          </div>

          {/* ---- Notes ---- */}
          <TabsContent value="notes" className="pb-16">
            <div className="grid gap-12 lg:grid-cols-[1fr_15rem] lg:gap-14">
              <article className="min-w-0 max-w-[44rem]">
                <NotesPlayer text={extractSpeechText(chapter.notes)} className="mb-8" />
                <NotesRenderer notes={chapter.notes} />
              </article>
              <TableOfContents notes={chapter.notes} />
            </div>
          </TabsContent>

          {/* ---- Experiments ---- */}
          <TabsContent value="experiments" className="pb-16">
            <p className="measure text-sm leading-relaxed text-muted-foreground">
              The chapter's activities written up as experiments — aim, apparatus, method, what you
              should observe, and the reaction behind it.
            </p>

            <div className="mt-8 space-y-5">
              {chapter.experiments.map((exp) => (
                <article key={exp.id} className="rounded-lg border border-border bg-card p-6">
                  <ExperimentWriteUp experiment={exp} />
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-border bg-muted/40 p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Want to try these without the apparatus?{" "}
                <Link
                  to="/experiments/reaction-bench"
                  className="text-primary underline underline-offset-4"
                >
                  The Reaction Bench
                </Link>{" "}
                lets you mix these reagents and watch what happens.
              </p>
            </div>
          </TabsContent>

          {/* ---- Videos ---- */}
          <TabsContent value="videos" className="pb-16">
            <p className="measure text-sm leading-relaxed text-muted-foreground">
              Full-chapter explanations from different teachers — pick whichever style suits you.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {chapter.videos.map((video) => (
                <figure
                  key={video.url}
                  className="overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="aspect-video bg-muted">
                    <iframe
                      src={video.url}
                      title={video.title}
                      loading="lazy"
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <figcaption className="p-4">
                    <p className="font-medium leading-snug text-foreground">{video.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{video.channel}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </TabsContent>

          {/* ---- Questions ---- */}
          <TabsContent value="questions" className="pb-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
              <section>
                <h2 className="font-display text-3xl text-foreground">Objective</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  One-mark multiple choice. Answers are explained as you go.
                </p>
                <div className="mt-6">
                  <ObjectiveQuiz questions={chapter.objectiveQuestions} />
                </div>
              </section>

              <section>
                <h2 className="font-display text-3xl text-foreground">Subjective</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  One to five marks. Write your own answer first, then compare.
                </p>
                <ul className="mt-6 border-t border-border pt-6">
                  {chapter.subjectiveQuestions.map((q, i) => (
                    <SubjectiveCard key={i} q={q} index={i} />
                  ))}
                </ul>
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Class10Chapter;
