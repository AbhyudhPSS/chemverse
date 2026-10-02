import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Atom, Zap, CircleDot, Circle } from "lucide-react";
import { useState } from "react";

interface InfoPanelProps {
  selectedComponent: string | null;
}

const componentInfo: Record<string, {
  title: string;
  description: string;
  facts: string[];
  icon: React.ReactNode;
}> = {
  nucleus: {
    title: "Nucleus",
    description: "The dense central core of the atom containing protons and neutrons.",
    facts: [
      "Contains 8 protons (positive charge)",
      "Contains 8 neutrons (no charge)",
      "Makes up 99.9% of the atom's mass",
      "Diameter is about 1/10,000 of the atom",
      "Held together by the strong nuclear force",
    ],
    icon: <CircleDot className="w-5 h-5" />,
  },
  electron: {
    title: "Electrons",
    description: "Negatively charged particles that orbit the nucleus in energy shells.",
    facts: [
      "Oxygen has 8 electrons total",
      "Each electron has a charge of -1",
      "Mass is ~1/1836 of a proton",
      "Occupy specific energy levels (shells)",
      "6 valence electrons in outer shell",
      "Need 2 more electrons to complete outer shell",
    ],
    icon: <Zap className="w-5 h-5" />,
  },
  "k-shell": {
    title: "K-Shell (First Energy Level)",
    description: "The innermost electron shell, closest to the nucleus.",
    facts: [
      "Principal quantum number n = 1",
      "Maximum capacity: 2 electrons",
      "Contains 2 electrons in oxygen",
      "Configuration: 1s²",
      "Electrons here have lowest energy",
      "Most tightly bound to nucleus",
    ],
    icon: <Circle className="w-5 h-5" />,
  },
  "l-shell": {
    title: "L-Shell (Second Energy Level)",
    description: "The outer electron shell containing the valence electrons.",
    facts: [
      "Principal quantum number n = 2",
      "Maximum capacity: 8 electrons",
      "Contains 6 electrons in oxygen",
      "Configuration: 2s² 2p⁴",
      "Valence shell determines reactivity",
      "Needs 2 more electrons to be stable",
    ],
    icon: <Circle className="w-5 h-5" />,
  },
};

const InfoPanel = ({ selectedComponent }: InfoPanelProps) => {
  const [openSections, setOpenSections] = useState<string[]>(["overview", "facts"]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const info = selectedComponent ? componentInfo[selectedComponent] : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Element Overview Card */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg bg-atom-proton/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-atom-proton">O</span>
            </div>
            <div>
              <CardTitle className="text-xl">Oxygen</CardTitle>
              <CardDescription>Element 8 • Nonmetal</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Atomic Number</p>
              <p className="text-2xl font-bold text-foreground">8</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Mass Number</p>
              <p className="text-2xl font-bold text-foreground">16</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Essential for life</Badge>
            <Badge variant="secondary">21% of atmosphere</Badge>
            <Badge variant="secondary">Highly reactive</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Selected Component Info */}
      {info ? (
        <Card className="bg-card border-border border-atom-electron/30">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="text-atom-electron">{info.icon}</div>
              <CardTitle className="text-lg">{info.title}</CardTitle>
            </div>
            <CardDescription>{info.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {info.facts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-atom-electron mt-1">•</span>
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
              Click on any part of the atom to learn more about it
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
                <p className="font-mono text-lg text-foreground">1s² 2s² 2p⁴</p>
                <p>• 1s²: 2 electrons in the first shell</p>
                <p>• 2s²: 2 electrons in the 2s subshell</p>
                <p>• 2p⁴: 4 electrons in the 2p subshell</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={openSections.includes("bonding")}
            onOpenChange={() => toggleSection("bonding")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-secondary/50 transition-colors border-t border-border">
              <span className="font-medium">Chemical Bonding</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openSections.includes("bonding") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Oxygen needs <strong className="text-foreground">2 more electrons</strong> to complete its outer shell (octet rule).</p>
                <p>This makes oxygen highly reactive and able to form bonds with many elements:</p>
                <p>• <strong className="text-foreground">H₂O</strong> - Water (2 hydrogen atoms)</p>
                <p>• <strong className="text-foreground">CO₂</strong> - Carbon dioxide</p>
                <p>• <strong className="text-foreground">O₂</strong> - Oxygen gas (double bond)</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={openSections.includes("importance")}
            onOpenChange={() => toggleSection("importance")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-secondary/50 transition-colors border-t border-border">
              <span className="font-medium">Importance of Oxygen</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openSections.includes("importance") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Makes up 21% of Earth's atmosphere</p>
                <p>• Essential for cellular respiration</p>
                <p>• Third most abundant element in the universe</p>
                <p>• Makes up about 65% of human body mass</p>
                <p>• Discovered independently by Scheele and Priestley (1770s)</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoPanel;
