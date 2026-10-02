import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import GlobalSearch from "@/components/search/GlobalSearch";

const navItems = [
  { path: "/explore", label: "Periodic Table" },
  { path: "/class9", label: "Class 9" },
  { path: "/class10", label: "Class 10" },
  { path: "/class11", label: "Class 11" },
  { path: "/class12", label: "Class 12" },
  { path: "/learn", label: "AP Chemistry" },
  { path: "/experiments", label: "Lab" },
  { path: "/quiz", label: "Quiz" },
];

interface Indicator {
  left: number;
  width: number;
  visible: boolean;
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0, visible: false });
  const { pathname } = useLocation();

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());

  // Keep the parent item lit while browsing a nested route (e.g. /class10/acids).
  const isSectionActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);
  const activePath = navItems.find((i) => isSectionActive(i.path))?.path;

  /** Slide the island behind a given nav item, or hide it if there is none. */
  const moveTo = useCallback((path?: string) => {
    const list = listRef.current;
    const el = path ? itemRefs.current.get(path) : undefined;
    if (!list || !el) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const listBox = list.getBoundingClientRect();
    const itemBox = el.getBoundingClientRect();
    setIndicator({ left: itemBox.left - listBox.left, width: itemBox.width, visible: true });
  }, []);

  // Park the island on the active item, and keep it there through route and
  // viewport changes. Layout effect so it never paints in the wrong place.
  useLayoutEffect(() => {
    moveTo(activePath);
    const onResize = () => moveTo(activePath);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activePath, moveTo]);

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 py-2.5">
      <nav
        aria-label="Primary"
        className="glass-panel flex h-11 items-center gap-1.5 rounded-full pl-3 pr-1.5 sm:gap-3 sm:pl-4"
      >
        <Link to="/" className="rounded-full" aria-label="ChemVerse — home">
          <Logo compact />
        </Link>

        <span aria-hidden="true" className="hidden h-5 w-px bg-border md:block" />

        {/* Desktop navigation with a sliding island behind the current item */}
        <ul
          ref={listRef}
          onMouseLeave={() => moveTo(activePath)}
          className="relative hidden items-center md:flex"
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 rounded-full bg-foreground/[0.07]",
              "transition-[transform,width,opacity] duration-300 ease-out",
              indicator.visible ? "opacity-100" : "opacity-0",
            )}
            style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
          />

          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.path, el);
                  else itemRefs.current.delete(item.path);
                }}
                onMouseEnter={() => moveTo(item.path)}
                onFocus={() => moveTo(item.path)}
                onBlur={() => moveTo(activePath)}
                className={cn(
                  "relative block whitespace-nowrap rounded-full px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200",
                  isSectionActive(item.path)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <span aria-hidden="true" className="hidden h-5 w-px bg-border md:block" />

        <GlobalSearch />

        <ThemeToggle />

        {/* Mobile navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[17rem] p-0">
            <SheetTitle className="sr-only">Site navigation</SheetTitle>
            <div className="flex h-16 items-center border-b border-border px-5">
              <Logo />
            </div>
            <ul className="flex flex-col p-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center rounded-md px-3 py-3 text-[0.9375rem] font-medium transition-colors",
                      isSectionActive(item.path)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
