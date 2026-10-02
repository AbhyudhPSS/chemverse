import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Seo from "@/components/seo/Seo";
import { cn } from "@/lib/utils";
import { experiments, experimentTypes, type ExperimentType } from "@/data/experiments";

const difficultyStyle: Record<string, string> = {
  beginner: "border-viridian/40 text-viridian",
  intermediate: "border-saffron/40 text-saffron",
  advanced: "border-magenta/40 text-magenta",
};

const levels = ["all", "beginner", "intermediate", "advanced"] as const;

/** A single filter chip — shared by both filter rows so they behave identically. */
const Chip = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "rounded border px-3 py-1.5 text-sm font-medium transition-colors",
      active
        ? "border-foreground bg-foreground text-background"
        : "border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground",
    )}
  >
    {children}
  </button>
);

const Experiments = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<ExperimentType | "all">("all");
  const [level, setLevel] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return experiments.filter((exp) => {
      const matchesType = type === "all" || exp.type === type;
      const matchesLevel = level === "all" || exp.difficulty === level;
      const matchesSearch =
        !q ||
        exp.title.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q) ||
        exp.unit.toLowerCase().includes(q) ||
        exp.tags.some((t) => t.toLowerCase().includes(q));
      return matchesType && matchesLevel && matchesSearch;
    });
  }, [search, type, level]);

  const isFiltered = search.trim() !== "" || type !== "all" || level !== "all";

  const reset = () => {
    setSearch("");
    setType("all");
    setLevel("all");
  };

  return (
    <>
      <Seo
        title="Lab & calculators"
        description={`${experiments.length} interactive chemistry tools — titration curves, gas law simulations, pH and molar mass calculators, equation balancing and more.`}
        path="/experiments"
      />

      <header className="border-b border-border bg-grid">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <p className="eyebrow">Interactive</p>
          <h1 className="mt-3 font-display text-display-sm sm:text-display-md">Lab & calculators</h1>
          <p className="measure mt-4 text-base leading-relaxed text-muted-foreground">
            {experiments.length} simulations, calculators and activities you can run in the
            browser — from titration curves to balancing equations.
          </p>

          <div className="relative mt-8 max-w-md">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <label htmlFor="experiment-search" className="sr-only">
              Search experiments by name, topic or keyword
            </label>
            <Input
              id="experiment-search"
              type="search"
              placeholder="Search — e.g. pH, gas law, titration"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-10"
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">
        {/* Filters */}
        <div className="space-y-4">
          <div>
            <h2 className="eyebrow" id="filter-type">
              Type
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-labelledby="filter-type">
              <Chip active={type === "all"} onClick={() => setType("all")}>
                All
              </Chip>
              {experimentTypes.map((t) => (
                <Chip key={t.value} active={type === t.value} onClick={() => setType(t.value)}>
                  {t.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h2 className="eyebrow" id="filter-level">
              Level
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-labelledby="filter-level">
              {levels.map((l) => (
                <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                  <span className="capitalize">{l === "all" ? "All" : l}</span>
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {filtered.length} of {experiments.length} experiment{experiments.length === 1 ? "" : "s"}
          </p>
          {isFiltered && (
            <Button variant="ghost" size="sm" onClick={reset}>
              Clear filters
            </Button>
          )}
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((exp) => (
              <li key={exp.id}>
                <Link
                  to={`/experiments/${exp.id}`}
                  className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/25"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span aria-hidden="true" className="text-2xl">
                      {exp.icon}
                    </span>
                    <Badge variant="outline" className={cn(difficultyStyle[exp.difficulty])}>
                      {exp.difficulty}
                    </Badge>
                  </div>

                  <h3 className="mt-3 text-base font-semibold leading-snug text-foreground">
                    {exp.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
                      {exp.unit}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 text-muted-foreground transition-transform duration-150 ease-out group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-border px-6 py-16 text-center">
            <p className="font-display text-2xl text-foreground">Nothing matches those filters</p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Try a different keyword, or clear the filters to see all {experiments.length}{" "}
              experiments.
            </p>
            <Button variant="outline" onClick={reset} className="mt-6">
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default Experiments;
