import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { categoryColors, type Element } from "@/data/elements";

interface ElementTileProps {
  element: Element;
  /** Dim the tile when it falls outside the current filter or search. */
  dimmed?: boolean;
  /** Emphasise a search hit. */
  highlighted?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { symbol: "text-base", number: "text-[0.5rem]", name: "hidden" },
  md: { symbol: "text-lg sm:text-xl", number: "text-[0.5rem] sm:text-[0.5625rem]", name: "hidden sm:block" },
  lg: { symbol: "text-3xl", number: "text-[0.625rem]", name: "block" },
} as const;

/**
 * A single periodic-table tile. Colour encodes element category and is the
 * only decorative variable — everything else stays constant so the grid
 * reads as one continuous table rather than a wall of separate cards.
 */
const ElementTile = ({ element, dimmed, highlighted, size = "md", className }: ElementTileProps) => {
  const colors = categoryColors[element.category];
  const s = sizes[size];

  return (
    <Link
      to={`/element/${element.atomicNumber}`}
      aria-label={`${element.name}, symbol ${element.symbol}, atomic number ${element.atomicNumber}`}
      className={cn(
        "group relative flex aspect-square flex-col items-center justify-center rounded-[5px] border px-0.5",
        "transition-[transform,background-color,border-color,opacity] duration-150 ease-out",
        "hover:z-10 hover:-translate-y-0.5 hover:shadow-sm",
        colors.bg,
        colors.border,
        dimmed ? "opacity-25" : "opacity-100",
        highlighted && "z-10 ring-2 ring-primary ring-offset-2 ring-offset-background",
        className,
      )}
    >
      <span className={cn("absolute left-1 top-0.5 font-mono tabular-nums text-muted-foreground", s.number)}>
        {element.atomicNumber}
      </span>

      <span className={cn("font-display leading-none", colors.text, s.symbol)}>{element.symbol}</span>

      <span
        className={cn(
          "w-full truncate px-0.5 text-center text-[0.5rem] leading-tight text-muted-foreground",
          s.name,
        )}
      >
        {element.name}
      </span>
    </Link>
  );
};

export default ElementTile;
