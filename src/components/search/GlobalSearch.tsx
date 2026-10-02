import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchIndex, searchItemValue, type SearchItem } from "@/lib/searchIndex";

/** The order results are grouped in, regardless of how they're indexed. */
const GROUP_ORDER = [
  "Class 9 · NCERT",
  "Class 10 · NCERT",
  "Class 11 · NCERT",
  "Class 12 · NCERT",
  "AP Chemistry",
  "Periodic Table",
  "Lab & Tools",
];

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const grouped = useMemo(() => {
    const byGroup = new Map<string, SearchItem[]>();
    for (const item of searchIndex) {
      const list = byGroup.get(item.group) ?? [];
      list.push(item);
      byGroup.set(item.group, list);
    }
    return GROUP_ORDER.map((group) => [group, byGroup.get(group) ?? []] as const).filter(
      ([, items]) => items.length > 0,
    );
  }, []);

  const select = (item: SearchItem) => {
    setOpen(false);
    navigate(item.path);
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Search ChemVerse"
        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
      >
        <Search className="h-4 w-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search any topic, chapter, class or unit…" />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>No matches. Try a different word or topic.</CommandEmpty>
          {grouped.map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={searchItemValue(item)}
                  onSelect={() => select(item)}
                  className="flex-col items-start gap-0.5"
                >
                  <span className="flex w-full items-center justify-between gap-3">
                    <span className="truncate font-medium text-foreground">{item.title}</span>
                    {item.badge && (
                      <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-muted-foreground">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default GlobalSearch;
