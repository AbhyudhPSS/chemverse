import { useMemo, useState } from "react";

import {
  elements,
  periodicTablePositions,
  categoryColors,
  categoryLabels,
  type ElementCategory,
} from "@/data/elements";
import { cn } from "@/lib/utils";
import ElementTile from "@/components/periodic-table/ElementTile";

interface PeriodicTableProps {
  searchQuery?: string;
}

const CATEGORIES = Object.keys(categoryLabels) as ElementCategory[];
const MAX_ROW = 9;
const MAX_COL = 18;

const PeriodicTable = ({ searchQuery = "" }: PeriodicTableProps) => {
  const [activeCategory, setActiveCategory] = useState<ElementCategory | null>(null);

  const matches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return null;
    return new Set(
      elements
        .filter(
          (el) =>
            el.name.toLowerCase().includes(query) ||
            el.symbol.toLowerCase().startsWith(query) ||
            el.atomicNumber.toString() === query,
        )
        .map((el) => el.atomicNumber),
    );
  }, [searchQuery]);

  const positioned = useMemo(
    () =>
      elements
        .filter((el) => periodicTablePositions[el.atomicNumber])
        .map((el) => ({ el, pos: periodicTablePositions[el.atomicNumber] })),
    [],
  );

  const resultCount = matches?.size ?? 0;

  return (
    <div>
      {/* Category filter — doubles as the table's legend. */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          aria-pressed={activeCategory === null}
          className={cn(
            "rounded border px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors",
            activeCategory === null
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground",
          )}
        >
          All
        </button>

        {CATEGORIES.map((category) => {
          const colors = categoryColors[category];
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(isActive ? null : category)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-1.5 rounded border px-2.5 py-1 text-[0.6875rem] font-medium transition-colors",
                isActive
                  ? cn(colors.border, colors.bg, colors.text)
                  : "border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground",
              )}
            >
              <span aria-hidden="true" className={cn("h-2 w-2 rounded-[2px] border", colors.bg, colors.border)} />
              {categoryLabels[category]}
            </button>
          );
        })}
      </div>

      {searchQuery.trim() && (
        <p aria-live="polite" className="mb-4 text-sm text-muted-foreground">
          {resultCount === 0
            ? `No element matches “${searchQuery.trim()}”.`
            : `${resultCount} element${resultCount === 1 ? "" : "s"} match “${searchQuery.trim()}”.`}
        </p>
      )}

      {/* Scrolls horizontally on small screens rather than shrinking tiles
          below a legible size. */}
      <div className="relative">
        <div className="-mx-5 overflow-x-auto px-5 pb-3">
          <div
            className="mx-auto grid min-w-[46rem] gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${MAX_COL}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${MAX_ROW}, minmax(0, 1fr))`,
            }}
          >
            {positioned.map(({ el, pos }) => {
              const isMatch = matches ? matches.has(el.atomicNumber) : null;
              const inCategory = activeCategory === null || activeCategory === el.category;
              const dimmed = isMatch !== null ? !isMatch : !inCategory;

              return (
                <div key={el.atomicNumber} style={{ gridRow: pos.row, gridColumn: pos.col }}>
                  <ElementTile element={el} dimmed={dimmed} highlighted={Boolean(isMatch)} />
                </div>
              );
            })}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent md:hidden"
        />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Rows 8–9 show representative lanthanides and actinides. Select a tile to open the element.
      </p>
    </div>
  );
};

export default PeriodicTable;
