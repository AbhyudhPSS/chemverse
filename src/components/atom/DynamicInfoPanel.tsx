import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Atom, Zap, CircleDot, Circle, FlaskConical, Thermometer, Lightbulb, History, Beaker } from "lucide-react";
import { useState } from "react";
import { type Element, categoryColors, categoryLabels, getRepresentativeMassNumber } from "@/data/elements";
import { getElementDetails } from "@/data/elementDetails";

interface DynamicInfoPanelProps {
  element: Element;
  selectedComponent: string | null;
}

const DynamicInfoPanel = ({ element, selectedComponent }: DynamicInfoPanelProps) => {
  const [openSections, setOpenSections] = useState<string[]>(["config", "facts"]);
  const colors = categoryColors[element.category];
  const extendedDetails = getElementDetails(element.atomicNumber);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const numProtons = element.atomicNumber;
  const numNeutrons = getRepresentativeMassNumber(element) - numProtons;
  const valenceElectrons = element.electronShells[element.electronShells.length - 1];
  
  // Shell names
  const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

  // Get component info based on selection
  const getComponentInfo = () => {
    if (!selectedComponent) return null;

    if (selectedComponent === "nucleus") {
      return {
        title: "Nucleus",
        description: "The dense central core of the atom containing protons and neutrons.",
        facts: [
          `Contains ${numProtons} protons (positive charge)`,
          `Contains ${numNeutrons} neutrons (no charge)`,
          "Makes up 99.9% of the atom's mass",
          "Diameter is about 1/10,000 of the atom",
          "Held together by the strong nuclear force",
        ],
        icon: <CircleDot className="w-5 h-5" />,
      };
    }

    if (selectedComponent === "electron") {
      return {
        title: "Electrons",
        description: "Negatively charged particles that orbit the nucleus in energy shells.",
        facts: [
          `${element.name} has ${element.atomicNumber} electrons total`,
          "Each electron has a charge of -1",
          "Mass is ~1/1836 of a proton",
          `${valenceElectrons} valence electron${valenceElectrons !== 1 ? 's' : ''} in outer shell`,
          `Configuration: ${element.electronConfiguration}`,
        ],
        icon: <Zap className="w-5 h-5" />,
      };
    }

    if (selectedComponent.startsWith("shell-")) {
      const shellIndex = parseInt(selectedComponent.split("-")[1]);
      const shellName = shellNames[shellIndex] || `Shell ${shellIndex + 1}`;
      const electrons = element.electronShells[shellIndex];
      const maxElectrons = 2 * Math.pow(shellIndex + 1, 2);
      
      return {
        title: `${shellName}-Shell (n=${shellIndex + 1})`,
        description: `Energy level ${shellIndex + 1} of the atom.`,
        facts: [
          `Principal quantum number n = ${shellIndex + 1}`,
          `Maximum capacity: ${maxElectrons} electrons`,
          `Contains ${electrons} electron${electrons !== 1 ? 's' : ''} in ${element.name}`,
          shellIndex === element.electronShells.length - 1 
            ? "This is the valence shell - determines chemical properties"
            : "Inner shell - electrons are tightly bound",
        ],
        icon: <Circle className="w-5 h-5" />,
      };
    }

    return null;
  };

  const componentInfo = getComponentInfo();

  // Get hue for styling
  const getCategoryHue = (): number => {
    const hues: Record<string, number> = {
      "alkali-metal": 330,
      "alkaline-earth": 25,
      "transition-metal": 200,
      "post-transition-metal": 170,
      "metalloid": 120,
      "nonmetal": 55,
      "halogen": 290,
      "noble-gas": 260,
      "lanthanide": 340,
      "actinide": 0,
    };
    return hues[element.category] || 280;
  };

  const hue = getCategoryHue();

  return (
    <div className="flex flex-col gap-4">
      {/* Element Overview Card */}
      <Card className="bg-card border-border overflow-hidden">
        <div 
          className="h-2"
          style={{ background: `linear-gradient(90deg, hsl(${hue} 100% 60%), hsl(${hue + 40} 100% 60%))` }}
        />
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl"
              style={{
                background: `linear-gradient(135deg, hsl(${hue} 80% 30%), hsl(${hue} 60% 15%))`,
                color: `hsl(${hue} 100% 70%)`,
                boxShadow: `0 0 20px hsl(${hue} 100% 50% / 0.3)`,
              }}
            >
              {element.symbol}
            </div>
            <div>
              <CardTitle className="text-xl">{element.name}</CardTitle>
              <CardDescription className={colors.text}>
                {categoryLabels[element.category]}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Atomic Number</p>
              <p className="text-2xl font-bold font-mono text-foreground">{element.atomicNumber}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Atomic Mass</p>
              <p className="text-2xl font-bold font-mono text-foreground">{element.atomicMass}</p>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="font-mono">
              {numProtons}p⁺
            </Badge>
            <Badge variant="secondary" className="font-mono">
              {numNeutrons}n⁰
            </Badge>
            <Badge variant="secondary" className="font-mono">
              {element.atomicNumber}e⁻
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Selected Component Info */}
      {componentInfo ? (
        <Card 
          className="bg-card border-border"
          style={{ borderColor: `hsl(${hue} 100% 50% / 0.3)` }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div style={{ color: `hsl(${hue} 100% 60%)` }}>{componentInfo.icon}</div>
              <CardTitle className="text-lg">{componentInfo.title}</CardTitle>
            </div>
            <CardDescription>{componentInfo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {componentInfo.facts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span style={{ color: `hsl(${hue} 100% 60%)` }}>•</span>
                  <span className="text-muted-foreground">{fact}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card border-border border-dashed">
          <CardContent className="py-8 text-center">
            <Atom className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click on any part of the atom to learn more
            </p>
          </CardContent>
        </Card>
      )}

      {/* Educational Sections */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Collapsible
            open={openSections.includes("config")}
            onOpenChange={() => toggleSection("config")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-secondary/50 transition-colors">
              <span className="font-medium">Electron Configuration</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openSections.includes("config") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-mono text-lg text-foreground">{element.electronConfiguration}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {element.electronShells.map((electrons, i) => (
                    <div 
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{
                        background: `hsl(${hue} 50% 15%)`,
                        color: `hsl(${hue} 100% 70%)`,
                      }}
                    >
                      {shellNames[i]}: {electrons}e⁻
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={openSections.includes("facts")}
            onOpenChange={() => toggleSection("facts")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-secondary/50 transition-colors border-t border-border">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Fun Facts</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openSections.includes("facts") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <ul className="space-y-2">
                {element.facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span style={{ color: `hsl(${hue} 100% 60%)` }}>✦</span>
                    <span className="text-muted-foreground">{fact}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          {(element.meltingPoint !== undefined || element.boilingPoint !== undefined) && (
            <Collapsible
              open={openSections.includes("properties")}
              onOpenChange={() => toggleSection("properties")}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-secondary/50 transition-colors border-t border-border">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Physical Properties</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSections.includes("properties") ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  {element.meltingPoint !== undefined && (
                    <div className="bg-secondary/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground">Melting Point</p>
                      <p className="text-lg font-bold font-mono text-foreground">{element.meltingPoint}°C</p>
                    </div>
                  )}
                  {element.boilingPoint !== undefined && (
                    <div className="bg-secondary/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground">Boiling Point</p>
                      <p className="text-lg font-bold font-mono text-foreground">{element.boilingPoint}°C</p>
                    </div>
                  )}
                </div>
                {element.discoveredBy && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    <strong className="text-foreground">Discovered by:</strong> {element.discoveredBy}
                    {element.discoveryYear && ` (${element.discoveryYear})`}
                  </p>
                )}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Extended Details - Uses */}
          {extendedDetails?.uses && (
            <Collapsible
              open={openSections.includes("uses")}
              onOpenChange={() => toggleSection("uses")}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-secondary/50 transition-colors border-t border-border">
                <div className="flex items-center gap-2">
                  <Beaker className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Uses & Applications</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSections.includes("uses") ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <ul className="space-y-2">
                  {extendedDetails.uses.map((use, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span style={{ color: `hsl(${hue} 100% 60%)` }}>•</span>
                      <span className="text-muted-foreground">{use}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Extended Details - History */}
          {extendedDetails?.history && (
            <Collapsible
              open={openSections.includes("history")}
              onOpenChange={() => toggleSection("history")}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-secondary/50 transition-colors border-t border-border">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Discovery & History</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSections.includes("history") ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <p className="text-sm text-muted-foreground">{extendedDetails.history}</p>
                {extendedDetails.abundance && (
                  <p className="text-sm text-muted-foreground mt-3">
                    <strong className="text-foreground">Abundance:</strong> {extendedDetails.abundance}
                  </p>
                )}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Extended Details - Fun Facts */}
          {extendedDetails?.funFacts && (
            <Collapsible
              open={openSections.includes("funfacts")}
              onOpenChange={() => toggleSection("funfacts")}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-secondary/50 transition-colors border-t border-border">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Did You Know?</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSections.includes("funfacts") ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <ul className="space-y-2">
                  {extendedDetails.funFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span style={{ color: `hsl(${hue} 100% 60%)` }}>💡</span>
                      <span className="text-muted-foreground">{fact}</span>
                    </li>
                  ))}
                </ul>
                {extendedDetails.environmentalRole && (
                  <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                    <strong className="text-foreground">Environmental Role:</strong> {extendedDetails.environmentalRole}
                  </p>
                )}
                {extendedDetails.healthEffects && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong className="text-foreground">Health Effects:</strong> {extendedDetails.healthEffects}
                  </p>
                )}
              </CollapsibleContent>
            </Collapsible>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicInfoPanel;
