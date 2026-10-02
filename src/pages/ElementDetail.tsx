import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Info, SlidersHorizontal } from "lucide-react";

import { getElementByAtomicNumber, categoryColors, categoryLabels } from "@/data/elements";
import DynamicAtomVisualization from "@/components/atom/DynamicAtomVisualization";
import DynamicInfoPanel from "@/components/atom/DynamicInfoPanel";
import ControlPanel from "@/components/oxygen-atom/ControlPanel";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Seo from "@/components/seo/Seo";
import { cn } from "@/lib/utils";

const ElementDetail = () => {
  const { atomicNumber } = useParams();
  const [speed, setSpeed] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const element = getElementByAtomicNumber(Number(atomicNumber));

  if (!element) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24">
        <Seo
          title="Element not found"
          description="There is no element at that atomic number."
        />
        <h1 className="font-display text-display-sm">Element not found</h1>
        <p className="mt-3 text-muted-foreground">
          Atomic numbers run from 1 to 118. Try picking one from the table instead.
        </p>
        <Button asChild className="mt-6">
          <Link to="/explore">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to the periodic table
          </Link>
        </Button>
      </div>
    );
  }

  const colors = categoryColors[element.category];
  const prevElement = getElementByAtomicNumber(element.atomicNumber - 1);
  const nextElement = getElementByAtomicNumber(element.atomicNumber + 1);

  const controls = (
    <ControlPanel
      speed={speed}
      onSpeedChange={setSpeed}
      zoom={zoom}
      onZoomChange={setZoom}
      showLabels={showLabels}
      onShowLabelsChange={setShowLabels}
    />
  );

  return (
    <>
      <Seo
        title={`${element.name} (${element.symbol})`}
        description={`${element.name}, element ${element.atomicNumber} — ${categoryLabels[element.category]}. Electron configuration ${element.electronConfiguration}, atomic mass ${element.atomicMass}.`}
        path={`/element/${element.atomicNumber}`}
      />

      {/* Element masthead */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-14 w-14 shrink-0 flex-col justify-center rounded border px-2",
                colors.bg,
                colors.border,
              )}
            >
              <span className="font-mono text-[0.5625rem] text-muted-foreground">
                {element.atomicNumber}
              </span>
              <span className={cn("font-display text-2xl leading-none", colors.text)}>
                {element.symbol}
              </span>
            </span>

            <div>
              <h1 className="font-display text-3xl leading-tight text-foreground">{element.name}</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {categoryLabels[element.category]} · Element {element.atomicNumber} ·{" "}
                {element.atomicMass}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Element-to-element navigation */}
            <nav aria-label="Adjacent elements" className="hidden items-center gap-2 md:flex">
              {prevElement && (
                <Button asChild variant="outline" size="sm">
                  <Link to={`/element/${prevElement.atomicNumber}`}>
                    <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                    <span className="sr-only">Previous element: </span>
                    {prevElement.symbol}
                  </Link>
                </Button>
              )}
              {nextElement && (
                <Button asChild variant="outline" size="sm">
                  <Link to={`/element/${nextElement.atomicNumber}`}>
                    <span className="sr-only">Next element: </span>
                    {nextElement.symbol}
                    <ChevronRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </nav>

            {/* Compact controls */}
            <div className="flex gap-2 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Visualisation controls">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Controls</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">{controls}</div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label={`Details for ${element.name}`}>
                    <Info className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{element.name}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <DynamicInfoPanel element={element} selectedComponent={selectedComponent} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Three-pane workspace */}
      <div className="mx-auto flex max-w-7xl">
        <aside
          aria-label="Visualisation controls"
          className="hidden w-72 shrink-0 border-r border-border p-5 lg:block"
        >
          {controls}

          <nav aria-label="Adjacent elements" className="mt-6 rounded-lg border border-border p-4">
            <h2 className="eyebrow">Navigate</h2>
            <div className="mt-3 flex gap-2">
              {prevElement && (
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to={`/element/${prevElement.atomicNumber}`}>
                    <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                    <span className="sr-only">Previous element: </span>
                    {prevElement.symbol}
                  </Link>
                </Button>
              )}
              {nextElement && (
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to={`/element/${nextElement.atomicNumber}`}>
                    <span className="sr-only">Next element: </span>
                    {nextElement.symbol}
                    <ChevronRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </aside>

        <section
          aria-label={`Atomic structure of ${element.name}`}
          className="flex min-h-[26rem] flex-1 items-center justify-center overflow-hidden bg-atom-background p-4"
        >
          <DynamicAtomVisualization
            element={element}
            speed={speed}
            zoom={zoom}
            showLabels={showLabels}
            onSelectComponent={setSelectedComponent}
            selectedComponent={selectedComponent}
          />
        </section>

        <aside
          aria-label={`Details for ${element.name}`}
          className="hidden w-80 shrink-0 overflow-y-auto border-l border-border p-5 lg:block"
        >
          <DynamicInfoPanel element={element} selectedComponent={selectedComponent} />
        </aside>
      </div>
    </>
  );
};

export default ElementDetail;
