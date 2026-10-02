import { useLayoutEffect, useRef, useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type Element, categoryColors, getRepresentativeMassNumber } from "@/data/elements";

interface DynamicAtomVisualizationProps {
  element: Element;
  speed: number;
  zoom: number;
  showLabels: boolean;
  onSelectComponent: (component: string | null) => void;
  selectedComponent: string | null;
}

const DynamicAtomVisualization = ({
  element,
  speed,
  zoom,
  showLabels,
  onSelectComponent,
  selectedComponent,
}: DynamicAtomVisualizationProps) => {
  const colors = categoryColors[element.category];

  // Fit the visualization to whatever width its container actually has,
  // so heavier elements (more shells → a wider box) don't get clipped on
  // narrow screens.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(400);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      setContainerSize(Math.max(1, el.getBoundingClientRect().width));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Calculate sizes based on zoom and number of shells
  const numShells = element.electronShells.length;
  const rawSize = Math.min(400, 200 + numShells * 50) * zoom;
  const baseSize = Math.min(rawSize, containerSize);
  const nucleusSize = Math.max(40, Math.min(80, 30 + element.atomicNumber * 0.5)) * zoom;
  const electronSize = 10 * zoom;
  
  // Calculate orbit radii
  const getOrbitRadius = (shellIndex: number) => {
    const minRadius = nucleusSize + 30;
    const maxRadius = baseSize / 2 - 20;
    const step = (maxRadius - minRadius) / Math.max(numShells - 1, 1);
    return (minRadius + step * shellIndex) * zoom;
  };

  // Animation duration based on speed
  const getAnimationDuration = (shellIndex: number) => {
    const baseDuration = 4 / speed;
    return baseDuration * (1 + shellIndex * 0.5);
  };

  const handleClick = (component: string) => {
    onSelectComponent(selectedComponent === component ? null : component);
  };

  // Shell names
  const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
  
  // Calculate protons and neutrons in nucleus
  const numProtons = element.atomicNumber;
  const numNeutrons = getRepresentativeMassNumber(element) - numProtons;

  // Get hue for the element category
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
    <div ref={wrapperRef} className="flex w-full items-center justify-center">
    <div
      className="relative flex items-center justify-center"
      style={{ width: baseSize, height: baseSize }}
    >
      {/* Orbital rings */}
      {element.electronShells.map((electrons, shellIndex) => {
        const orbitRadius = getOrbitRadius(shellIndex);
        const shellName = shellNames[shellIndex] || `Shell ${shellIndex + 1}`;
        
        return (
          <div key={`orbit-${shellIndex}`}>
            {/* Orbit Ring */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`absolute rounded-full border-2 border-dashed cursor-pointer transition-all duration-200 ${
                    selectedComponent === `shell-${shellIndex}` 
                      ? "border-cyanine shadow-[0_0_20px_hsl(var(--cyanine))]" 
                      : "border-white/20 hover:border-cyanine/50"
                  }`}
                  style={{
                    width: orbitRadius * 2,
                    height: orbitRadius * 2,
                    left: `calc(50% - ${orbitRadius}px)`,
                    top: `calc(50% - ${orbitRadius}px)`,
                  }}
                  onClick={() => handleClick(`shell-${shellIndex}`)}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-card border-border">
                <p className="font-medium">{shellName}-Shell (n={shellIndex + 1})</p>
                <p className="text-sm text-muted-foreground">
                  Contains {electrons} of {2 * Math.pow(shellIndex + 1, 2)} possible electrons
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Shell Label */}
            {showLabels && (
              <div 
                className="absolute text-xs font-medium text-cyanine pointer-events-none font-mono"
                style={{ 
                  top: `calc(50% - ${orbitRadius}px - 18px)`,
                  left: "50%",
                  transform: "translateX(-50%)"
                }}
              >
                {shellName}-shell ({electrons}e⁻)
              </div>
            )}

            {/* Electrons in this shell */}
            {Array.from({ length: electrons }).map((_, electronIndex) => {
              const angle = (360 / electrons) * electronIndex;
              const animationDuration = getAnimationDuration(shellIndex);
              const reverse = shellIndex % 2 === 1;
              
              return (
                <div
                  key={`electron-${shellIndex}-${electronIndex}`}
                  className="absolute"
                  style={{
                    width: orbitRadius * 2,
                    height: orbitRadius * 2,
                    left: `calc(50% - ${orbitRadius}px)`,
                    top: `calc(50% - ${orbitRadius}px)`,
                    animation: `orbit ${animationDuration}s linear infinite ${reverse ? 'reverse' : ''}`,
                    animationDelay: `${(angle / 360) * animationDuration}s`,
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`absolute rounded-full cursor-pointer transition-all duration-200 ${
                          selectedComponent === "electron" 
                            ? "shadow-[0_0_15px_hsl(var(--saffron))]" 
                            : "hover:shadow-[0_0_10px_hsl(var(--saffron))]"
                        }`}
                        style={{
                          width: electronSize,
                          height: electronSize,
                          background: `radial-gradient(circle at 30% 30%, hsl(var(--saffron)), hsl(55 100% 45%))`,
                          boxShadow: `0 0 10px hsl(var(--saffron) / 0.5)`,
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
              );
            })}
          </div>
        );
      })}

      {/* Nucleus */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`absolute rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center ${
              selectedComponent === "nucleus" 
                ? `shadow-[0_0_30px_hsl(${hue}_100%_50%/0.7)]` 
                : `hover:shadow-[0_0_20px_hsl(${hue}_100%_50%/0.4)]`
            }`}
            style={{
              width: nucleusSize,
              height: nucleusSize,
              left: `calc(50% - ${nucleusSize / 2}px)`,
              top: `calc(50% - ${nucleusSize / 2}px)`,
              background: `radial-gradient(circle at 30% 30%, 
                hsl(var(--magenta)), 
                hsl(var(--iris)) 50%, 
                hsl(var(--cobalt)))`,
              animation: 'nucleus-pulse 3s ease-in-out infinite',
            }}
            onClick={() => handleClick("nucleus")}
          >
            {/* Element symbol in nucleus */}
            <span 
              className="font-bold text-white relative z-10"
              style={{ 
                fontSize: nucleusSize * 0.4,
                textShadow: '0 0 10px rgba(255,255,255,0.5)'
              }}
            >
              {element.symbol}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-card border-border">
          <p className="font-medium">Nucleus</p>
          <p className="text-sm text-muted-foreground">
            {numProtons} protons + {numNeutrons} neutrons
          </p>
        </TooltipContent>
      </Tooltip>

      {/* Nucleus Label */}
      {showLabels && (
        <div 
          className="absolute text-xs font-medium text-foreground pointer-events-none bg-background/80 px-2 py-0.5 rounded font-mono"
          style={{ 
            top: `calc(50% + ${nucleusSize / 2}px + 8px)`,
            left: "50%",
            transform: "translateX(-50%)"
          }}
        >
          {numProtons}p⁺ + {numNeutrons}n⁰
        </div>
      )}

      {/* Total electrons label */}
      {showLabels && (
        <div 
          className="absolute text-xs font-medium text-saffron pointer-events-none font-mono"
          style={{ 
            bottom: 10,
            right: 10,
          }}
        >
          Total: {element.atomicNumber}e⁻
        </div>
      )}
    </div>
    </div>
  );
};

export default DynamicAtomVisualization;
