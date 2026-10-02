import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const R = 0.0821; // L·atm/(mol·K)

const GasLawSim = () => {
  const [pressure, setPressure] = useState(1); // atm
  const [volume, setVolume] = useState(22.4); // L
  const [temperature, setTemperature] = useState(273.15); // K
  const [moles, setMoles] = useState(1);
  const [locked, setLocked] = useState<"P" | "V" | "T" | "n">("P");

  const recalc = (p: number, v: number, t: number, n: number, lock: string) => {
    switch (lock) {
      case "P": return { P: (n * R * t) / v, V: v, T: t, n };
      case "V": return { P: p, V: (n * R * t) / p, T: t, n };
      case "T": return { P: p, V: v, T: (p * v) / (n * R), n };
      case "n": return { P: p, V: v, T: t, n: (p * v) / (R * t) };
      default: return { P: p, V: v, T: t, n };
    }
  };

  const handleChange = (variable: "P" | "V" | "T" | "n", value: number) => {
    let p = pressure, v = volume, t = temperature, n = moles;
    if (variable === "P") p = value;
    if (variable === "V") v = value;
    if (variable === "T") t = value;
    if (variable === "n") n = value;
    const result = recalc(p, v, t, n, locked);
    setPressure(result.P);
    setVolume(result.V);
    setTemperature(result.T);
    setMoles(result.n);
  };

  const particleCount = Math.min(Math.round(moles * 15), 60);
  const speed = temperature / 273;

  return (
    <div className="space-y-6">
      {/* Container visualization */}
      <div className="flex justify-center">
        <div
          className="relative border-2 border-white/20 rounded-xl overflow-hidden transition-all duration-500 bg-white/5"
          style={{
            width: `${Math.min(300, Math.max(100, volume * 8))}px`,
            height: "200px",
          }}
        >
          {Array.from({ length: particleCount }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-cyanine"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animation: `bounce ${(1.5 / speed).toFixed(1)}s ease-in-out infinite alternate`,
                animationDelay: `${(i * 0.1).toFixed(1)}s`,
                opacity: 0.8,
              }}
            />
          ))}
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {volume.toFixed(1)} L
          </div>
        </div>
      </div>

      {/* Lock selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="shrink-0 text-sm text-muted-foreground">Solve for:</span>
        {(["P", "V", "T", "n"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setLocked(v)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              locked === v
                ? "bg-cyanine/20 text-cyanine"
                : "bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            {v === "P" ? "Pressure" : v === "V" ? "Volume" : v === "T" ? "Temp" : "Moles"}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="grid gap-5">
        {locked !== "P" && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Pressure (atm)</span>
              <span className="text-foreground font-medium">{pressure.toFixed(2)}</span>
            </div>
            <Slider value={[pressure]} onValueChange={([v]) => handleChange("P", v)} min={0.1} max={10} step={0.1} />
          </div>
        )}
        {locked !== "V" && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Volume (L)</span>
              <span className="text-foreground font-medium">{volume.toFixed(1)}</span>
            </div>
            <Slider value={[volume]} onValueChange={([v]) => handleChange("V", v)} min={1} max={50} step={0.5} />
          </div>
        )}
        {locked !== "T" && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Temperature (K)</span>
              <span className="text-foreground font-medium">{temperature.toFixed(0)} K ({(temperature - 273.15).toFixed(0)}°C)</span>
            </div>
            <Slider value={[temperature]} onValueChange={([v]) => handleChange("T", v)} min={100} max={1000} step={5} />
          </div>
        )}
        {locked !== "n" && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Moles (n)</span>
              <span className="text-foreground font-medium">{moles.toFixed(2)}</span>
            </div>
            <Slider value={[moles]} onValueChange={([v]) => handleChange("n", v)} min={0.1} max={5} step={0.1} />
          </div>
        )}
      </div>

      {/* Calculated value */}
      <div className="bg-cyanine/10 border border-cyanine/20 rounded-xl p-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">Calculated {locked === "P" ? "Pressure" : locked === "V" ? "Volume" : locked === "T" ? "Temperature" : "Moles"}</p>
        <p className="text-3xl font-bold text-cyanine">
          {locked === "P" && `${pressure.toFixed(2)} atm`}
          {locked === "V" && `${volume.toFixed(2)} L`}
          {locked === "T" && `${temperature.toFixed(0)} K`}
          {locked === "n" && `${moles.toFixed(3)} mol`}
        </p>
        <p className="text-xs text-muted-foreground mt-2">PV = nRT → ({pressure.toFixed(2)})({volume.toFixed(1)}) = ({moles.toFixed(2)})(0.0821)({temperature.toFixed(0)})</p>
      </div>

      <style>{`@keyframes bounce { 0% { transform: translate(0, 0); } 100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${5 + Math.random() * 10}px, ${Math.random() > 0.5 ? '' : '-'}${5 + Math.random() * 10}px); } }`}</style>
    </div>
  );
};

export default GasLawSim;
