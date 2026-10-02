import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AtomVisualizationProps {
  speed: number;
  zoom: number;
  showLabels: boolean;
  onSelectComponent: (component: string | null) => void;
  selectedComponent: string | null;
}

const AtomVisualization = ({
  speed,
  zoom,
  showLabels,
  onSelectComponent,
  selectedComponent,
}: AtomVisualizationProps) => {
  const baseSize = 300 * zoom;
  const nucleusSize = 60 * zoom;
  const electronSize = 12 * zoom;
  const innerOrbitRadius = 80 * zoom;
  const outerOrbitRadius = 140 * zoom;

  // Animation duration based on speed (lower = faster)
  const animationDuration = 4 / speed;

  const handleClick = (component: string) => {
    onSelectComponent(selectedComponent === component ? null : component);
  };

  // Generate electron positions for inner shell (2 electrons)
  const innerElectrons = [0, 180];
  
  // Generate electron positions for outer shell (6 electrons)
  const outerElectrons = [0, 60, 120, 180, 240, 300];

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: baseSize, height: baseSize }}
    >
      {/* Outer Orbit Ring (L-shell) */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`absolute rounded-full border-2 border-dashed cursor-pointer transition-all duration-200 ${
              selectedComponent === "l-shell" 
                ? "border-atom-electron shadow-[0_0_20px_hsl(var(--atom-electron))]" 
                : "border-atom-orbit hover:border-atom-electron/70"
            }`}
            style={{
              width: outerOrbitRadius * 2,
              height: outerOrbitRadius * 2,
            }}
            onClick={() => handleClick("l-shell")}
          />
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-card border-border">
          <p className="font-medium">L-Shell (n=2)</p>
          <p className="text-sm text-muted-foreground">Contains 6 of 8 possible electrons</p>
        </TooltipContent>
      </Tooltip>

      {/* L-shell Label */}
      {showLabels && (
        <div 
          className="absolute text-xs font-medium text-atom-electron pointer-events-none"
          style={{ 
            top: `calc(50% - ${outerOrbitRadius}px - 20px)`,
            left: "50%",
            transform: "translateX(-50%)"
          }}
        >
          L-shell (2s² 2p⁴)
        </div>
      )}

      {/* Inner Orbit Ring (K-shell) */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`absolute rounded-full border-2 border-dashed cursor-pointer transition-all duration-200 ${
              selectedComponent === "k-shell" 
                ? "border-atom-electron shadow-[0_0_20px_hsl(var(--atom-electron))]" 
                : "border-atom-orbit hover:border-atom-electron/70"
            }`}
            style={{
              width: innerOrbitRadius * 2,
              height: innerOrbitRadius * 2,
            }}
            onClick={() => handleClick("k-shell")}
          />
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-card border-border">
          <p className="font-medium">K-Shell (n=1)</p>
          <p className="text-sm text-muted-foreground">Contains 2 of 2 possible electrons</p>
        </TooltipContent>
      </Tooltip>

      {/* K-shell Label */}
      {showLabels && (
        <div 
          className="absolute text-xs font-medium text-atom-electron pointer-events-none"
          style={{ 
            top: `calc(50% - ${innerOrbitRadius}px - 20px)`,
            left: "50%",
            transform: "translateX(-50%)"
          }}
        >
          K-shell (1s²)
        </div>
      )}

      {/* Nucleus */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`absolute rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center animate-pulse ${
              selectedComponent === "nucleus" 
                ? "shadow-[0_0_30px_hsl(var(--atom-proton))]" 
                : "hover:shadow-[0_0_20px_hsl(var(--atom-proton)/0.5)]"
            }`}
            style={{
              width: nucleusSize,
              height: nucleusSize,
              background: `radial-gradient(circle at 30% 30%, hsl(var(--atom-proton)), hsl(var(--atom-neutron)))`,
            }}
            onClick={() => handleClick("nucleus")}
          >
            {/* Proton/Neutron visual representation */}
            <div className="relative w-full h-full">
              {/* Protons (red circles) */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={`proton-${i}`}
                  className="absolute rounded-full bg-atom-proton border border-atom-proton-foreground"
                  style={{
                    width: nucleusSize * 0.25,
                    height: nucleusSize * 0.25,
                    top: `${20 + (i < 2 ? 0 : 35)}%`,
                    left: `${15 + (i % 2) * 40}%`,
                  }}
                />
              ))}
              {/* Neutrons (blue circles) */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={`neutron-${i}`}
                  className="absolute rounded-full bg-atom-neutron border border-atom-neutron-foreground"
                  style={{
                    width: nucleusSize * 0.25,
                    height: nucleusSize * 0.25,
                    top: `${30 + (i < 2 ? 0 : 25)}%`,
                    left: `${25 + (i % 2) * 30}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-card border-border">
          <p className="font-medium">Nucleus</p>
          <p className="text-sm text-muted-foreground">8 protons + 8 neutrons</p>
        </TooltipContent>
      </Tooltip>

      {/* Nucleus Label */}
      {showLabels && (
        <div 
          className="absolute text-xs font-medium text-foreground pointer-events-none bg-background/80 px-2 py-0.5 rounded"
          style={{ 
            top: `calc(50% + ${nucleusSize / 2}px + 8px)`,
            left: "50%",
            transform: "translateX(-50%)"
          }}
        >
          Nucleus (8p⁺ + 8n⁰)
        </div>
      )}

      {/* Inner Shell Electrons (2 electrons) */}
      {innerElectrons.map((angle, i) => (
        <div
          key={`inner-electron-${i}`}
          className="absolute"
          style={{
            width: innerOrbitRadius * 2,
            height: innerOrbitRadius * 2,
            animation: `orbit ${animationDuration}s linear infinite`,
            animationDelay: `${(angle / 360) * animationDuration}s`,
          }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`absolute rounded-full cursor-pointer transition-all duration-200 ${
                  selectedComponent === "electron" 
                    ? "shadow-[0_0_15px_hsl(var(--atom-electron))]" 
                    : "hover:shadow-[0_0_10px_hsl(var(--atom-electron))]"
                }`}
                style={{
                  width: electronSize,
                  height: electronSize,
                  background: `radial-gradient(circle at 30% 30%, hsl(var(--atom-electron-glow)), hsl(var(--atom-electron)))`,
                  top: -electronSize / 2,
                  left: `calc(50% - ${electronSize / 2}px)`,
                }}
                onClick={() => handleClick("electron")}
              />
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-card border-border">
              <p className="font-medium">Electron</p>
              <p className="text-sm text-muted-foreground">Charge: -1, Mass: ~0</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}

      {/* Outer Shell Electrons (6 electrons) */}
      {outerElectrons.map((angle, i) => (
        <div
          key={`outer-electron-${i}`}
          className="absolute"
          style={{
            width: outerOrbitRadius * 2,
            height: outerOrbitRadius * 2,
            animation: `orbit ${animationDuration * 1.5}s linear infinite reverse`,
            animationDelay: `${(angle / 360) * animationDuration * 1.5}s`,
          }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`absolute rounded-full cursor-pointer transition-all duration-200 ${
                  selectedComponent === "electron" 
                    ? "shadow-[0_0_15px_hsl(var(--atom-electron))]" 
                    : "hover:shadow-[0_0_10px_hsl(var(--atom-electron))]"
                }`}
                style={{
                  width: electronSize,
                  height: electronSize,
                  background: `radial-gradient(circle at 30% 30%, hsl(var(--atom-electron-glow)), hsl(var(--atom-electron)))`,
                  top: -electronSize / 2,
                  left: `calc(50% - ${electronSize / 2}px)`,
                }}
                onClick={() => handleClick("electron")}
              />
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-card border-border">
              <p className="font-medium">Electron</p>
              <p className="text-sm text-muted-foreground">Charge: -1, Mass: ~0</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}

      {/* Electron Label */}
      {showLabels && (
        <div 
          className="absolute text-xs font-medium text-atom-electron pointer-events-none"
          style={{ 
            bottom: `calc(50% - ${outerOrbitRadius}px - 25px)`,
            right: "10%",
          }}
        >
          Electrons (8 total)
        </div>
      )}
    </div>
  );
};

export default AtomVisualization;
