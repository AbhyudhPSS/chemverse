import { useState } from "react";
import AtomVisualization from "./AtomVisualization";
import ControlPanel from "./ControlPanel";
import InfoPanel from "./InfoPanel";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Info, Settings } from "lucide-react";

const OxygenAtom = () => {
  const [speed, setSpeed] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-atom-background flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-atom-proton/20 flex items-center justify-center">
              <span className="text-lg font-bold text-atom-proton">O</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Oxygen Atom</h1>
              <p className="text-sm text-muted-foreground">Interactive Bohr Model</p>
            </div>
          </div>
          
          {/* Mobile Controls */}
          <div className="flex gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Controls</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ControlPanel
                    speed={speed}
                    onSpeedChange={setSpeed}
                    zoom={zoom}
                    onZoomChange={setZoom}
                    showLabels={showLabels}
                    onShowLabelsChange={setShowLabels}
                  />
                </div>
              </SheetContent>
            </Sheet>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Information</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <InfoPanel selectedComponent={selectedComponent} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Controls (Desktop) */}
        <aside className="hidden lg:block w-72 p-4 border-r border-border bg-card/30">
          <ControlPanel
            speed={speed}
            onSpeedChange={setSpeed}
            zoom={zoom}
            onZoomChange={setZoom}
            showLabels={showLabels}
            onShowLabelsChange={setShowLabels}
          />
        </aside>

        {/* Center - Atom Visualization */}
        <main className="flex-1 flex items-center justify-center p-4 overflow-hidden">
          <div className="relative">
            {/* Glow effect behind atom */}
            <div 
              className="absolute inset-0 blur-3xl opacity-20"
              style={{
                background: `radial-gradient(circle, hsl(var(--atom-electron)) 0%, transparent 70%)`,
              }}
            />
            <AtomVisualization
              speed={speed}
              zoom={zoom}
              showLabels={showLabels}
              onSelectComponent={setSelectedComponent}
              selectedComponent={selectedComponent}
            />
          </div>
        </main>

        {/* Right Sidebar - Info Panel (Desktop) */}
        <aside className="hidden lg:block w-80 p-4 border-l border-border bg-card/30 overflow-y-auto">
          <InfoPanel selectedComponent={selectedComponent} />
        </aside>
      </div>
    </div>
  );
};

export default OxygenAtom;
