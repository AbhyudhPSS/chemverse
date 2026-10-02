import { useState } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PeriodicTable from "@/components/periodic-table/PeriodicTable";
import Seo from "@/components/seo/Seo";
import { elements } from "@/data/elements";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Seo
        title="Periodic table"
        description={`Browse all ${elements.length} elements by category, search by name, symbol or atomic number, and open any element for its structure, properties and facts.`}
        path="/explore"
      />

      <header className="border-b border-border bg-grid">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <p className="eyebrow">Reference</p>
          <h1 className="mt-3 font-display text-display-sm sm:text-display-md">Periodic table</h1>
          <p className="measure mt-4 text-base leading-relaxed text-muted-foreground">
            All {elements.length} elements, coloured by category. Filter by a category to see how
            the groups sit in the table, or search for the one you need.
          </p>

          <div className="relative mt-8 max-w-md">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <label htmlFor="element-search" className="sr-only">
              Search elements by name, symbol or atomic number
            </label>
            <Input
              id="element-search"
              type="search"
              placeholder="Search — e.g. sodium, Na, 11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
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
        <PeriodicTable searchQuery={searchQuery} />
      </section>
    </>
  );
};

export default Explore;
