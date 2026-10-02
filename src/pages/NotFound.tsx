import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Seo from "@/components/seo/Seo";

const suggestions = [
  { to: "/explore", label: "Periodic table" },
  { to: "/class10", label: "Class 10 chemistry" },
  { to: "/learn", label: "AP Chemistry" },
  { to: "/experiments", label: "Lab & calculators" },
];

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Seo
        title="Page not found"
        description="That page doesn't exist on ChemVerse. Jump to the periodic table, the Class 10 chapters or the lab tools instead."
      />

      <div className="mx-auto flex max-w-2xl flex-col items-start px-5 py-20 sm:py-28">
        {/* An unknown element — the product's own visual language. */}
        <span
          aria-hidden="true"
          className="flex h-20 w-20 flex-col justify-center rounded border border-dashed border-border bg-card px-3"
        >
          <span className="font-mono text-[0.625rem] text-muted-foreground">404</span>
          <span className="font-display text-4xl leading-none text-muted-foreground">?</span>
        </span>

        <h1 className="mt-8 font-display text-display-sm">This page isn't in the table.</h1>
        <p className="measure mt-4 text-base leading-relaxed text-muted-foreground">
          There's nothing at <code className="text-foreground">{pathname}</code>. It may have moved,
          or the link may be wrong.
        </p>

        <div className="mt-8">
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </div>

        <nav aria-label="Suggested pages" className="mt-12 w-full border-t border-border pt-6">
          <h2 className="eyebrow">Try one of these</h2>
          <ul className="mt-4 grid gap-1 sm:grid-cols-2">
            {suggestions.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="block rounded-md py-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NotFound;
