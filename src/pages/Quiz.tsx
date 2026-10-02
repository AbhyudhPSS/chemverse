import { useMemo, useState } from "react";
import { Atom, Brain, Layers, Play, Search, Shuffle, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import Seo from "@/components/seo/Seo";
import QuizGame from "@/components/quiz/QuizGame";
import { cn } from "@/lib/utils";
import { elements } from "@/data/elements";

export type QuizDifficulty = "easy" | "medium" | "hard";
export type QuizCategory = "symbols" | "atomic-numbers" | "electron-config" | "categories" | "mixed";

const quizModes: { id: QuizCategory; title: string; description: string; icon: typeof Atom }[] = [
  {
    id: "symbols",
    title: "Element symbols",
    description: "Match element names to their symbols.",
    icon: Atom,
  },
  {
    id: "atomic-numbers",
    title: "Atomic numbers",
    description: "Recall the atomic number of an element.",
    icon: Zap,
  },
  {
    id: "electron-config",
    title: "Electron configuration",
    description: "Identify electron shell configurations.",
    icon: Brain,
  },
  {
    id: "categories",
    title: "Element categories",
    description: "Classify elements into their groups.",
    icon: Layers,
  },
  {
    id: "mixed",
    title: "Mixed",
    description: "A bit of everything, in random order.",
    icon: Shuffle,
  },
];

const difficulties: { id: QuizDifficulty; label: string; questions: number }[] = [
  { id: "easy", label: "Easy", questions: 5 },
  { id: "medium", label: "Medium", questions: 10 },
  { id: "hard", label: "Hard", questions: 15 },
];

const Quiz = () => {
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("medium");
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState("");

  const filteredModes = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return quizModes;
    return quizModes.filter(
      (mode) =>
        mode.title.toLowerCase().includes(term) || mode.description.toLowerCase().includes(term),
    );
  }, [search]);

  const toggleCategory = (id: QuizCategory) => {
    setCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  if (isPlaying && categories.length > 0) {
    return (
      <QuizGame
        categories={categories}
        difficulty={difficulty}
        onEnd={() => {
          setIsPlaying(false);
          setCategories([]);
        }}
      />
    );
  }

  const selectedCount = difficulties.find((d) => d.id === difficulty)?.questions ?? 0;
  const selectedTitles = quizModes
    .filter((m) => categories.includes(m.id))
    .map((m) => m.title.toLowerCase());

  return (
    <>
      <Seo
        title="Quiz"
        description={`Test yourself on element symbols, atomic numbers, electron configuration and element categories — questions generated from all ${elements.length} elements.`}
        path="/quiz"
      />

      <header className="border-b border-border bg-grid">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
          <p className="eyebrow">Practice</p>
          <h1 className="mt-3 font-display text-display-sm sm:text-display-md">Quiz</h1>
          <p className="measure mt-4 text-base leading-relaxed text-muted-foreground">
            Questions are generated from the full table of {elements.length} elements, so you get a
            different set each time. Pick a topic and a length to begin.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-12">
        {/* Length ------------------------------------------------------- */}
        <fieldset>
          <legend className="eyebrow">Length</legend>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {difficulties.map((d) => {
              const checked = difficulty === d.id;
              return (
                <label
                  key={d.id}
                  className={cn(
                    "cursor-pointer rounded-md border px-4 py-3 text-center transition-colors",
                    "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
                    checked
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/25 hover:bg-muted",
                  )}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={d.id}
                    checked={checked}
                    onChange={() => setDifficulty(d.id)}
                    className="sr-only"
                  />
                  <span className="block text-sm font-medium">{d.label}</span>
                  <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-[0.08em]">
                    {d.questions} questions
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Topic -------------------------------------------------------- */}
        <fieldset className="mt-10">
          <div className="flex items-baseline justify-between gap-4">
            <legend className="eyebrow">Topic</legend>
            {categories.length > 0 && (
              <button
                type="button"
                onClick={() => setCategories([])}
                className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Clear selection
              </button>
            )}
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Search for a topic, and pick as many as you like — questions are mixed together.
          </p>

          <div className="relative mt-4">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics — e.g. symbols, atomic numbers…"
              aria-label="Search quiz topics"
              className="w-full rounded-md border border-border bg-card py-2.5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {filteredModes.length > 0 ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {filteredModes.map((mode) => {
                const checked = categories.includes(mode.id);
                return (
                  <label
                    key={mode.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors",
                      "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
                      checked
                        ? "border-primary bg-accent"
                        : "border-border hover:border-foreground/25 hover:bg-muted",
                    )}
                  >
                    <input
                      type="checkbox"
                      name="category"
                      value={mode.id}
                      checked={checked}
                      onChange={() => toggleCategory(mode.id)}
                      className="sr-only"
                    />
                    <mode.icon
                      aria-hidden="true"
                      className={cn("mt-0.5 h-5 w-5 shrink-0", checked ? "text-primary" : "text-muted-foreground")}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-medium text-foreground">
                        {mode.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                        {mode.description}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-transparent",
                      )}
                    >
                      <svg viewBox="0 0 12 10" className="h-2.5 w-2.5" fill="none">
                        <path
                          d="M1 5L4.5 8.5L11 1.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </label>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
              No topics match "{search}".
            </p>
          )}
        </fieldset>

        {/* Start -------------------------------------------------------- */}
        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-6">
          <Button size="lg" onClick={() => setIsPlaying(true)} disabled={categories.length === 0}>
            <Play className="h-4 w-4" />
            Start quiz
          </Button>
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {categories.length > 0
              ? `${selectedCount} questions, mixed from ${selectedTitles.join(", ")}.`
              : "Choose one or more topics to begin."}
          </p>
        </div>
      </div>
    </>
  );
};

export default Quiz;
