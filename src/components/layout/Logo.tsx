import { cn } from "@/lib/utils";

/**
 * The mark is a periodic-table tile: the same object the product is built
 * around, so the identity and the content share one visual language.
 */
const Logo = ({ className, compact = false }: { className?: string; compact?: boolean }) => (
  <span className={cn("flex items-center gap-2", className)}>
    <span
      aria-hidden="true"
      className={cn(
        "relative flex shrink-0 flex-col justify-center rounded border border-foreground/15 bg-card leading-none",
        compact ? "h-7 w-7 px-1" : "h-9 w-9 px-1.5 shadow-xs",
      )}
    >
      <span className={cn("font-mono text-muted-foreground", compact ? "text-[0.375rem]" : "text-[0.5rem]")}>
        06
      </span>
      <span className={cn("font-display leading-none text-foreground", compact ? "text-[0.8125rem]" : "text-[1.0625rem]")}>
        Cv
      </span>
    </span>
    <span
      className={cn(
        "hidden font-semibold tracking-tight text-foreground sm:block",
        compact ? "text-[0.9375rem]" : "text-[1.0625rem]",
      )}
    >
      ChemVerse
    </span>
  </span>
);

export default Logo;
