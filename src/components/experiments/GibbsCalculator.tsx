import { useState } from "react";
import { Input } from "@/components/ui/input";

const GibbsCalculator = () => {
  const [dH, setDH] = useState("-100");
  const [dS, setDS] = useState("0.05");
  const [temp, setTemp] = useState("298");

  const deltaH = parseFloat(dH); // kJ
  const deltaS = parseFloat(dS); // kJ/K
  const T = parseFloat(temp); // K

  const valid = !isNaN(deltaH) && !isNaN(deltaS) && !isNaN(T) && T > 0;
  const deltaG = valid ? deltaH - T * deltaS : NaN;
  const spontaneous = valid ? (deltaG < 0 ? "Spontaneous ✅" : deltaG === 0 ? "At Equilibrium ⚖️" : "Non-spontaneous ❌") : "";

  const getAlwaysLabel = () => {
    if (deltaH < 0 && deltaS > 0) return "Always spontaneous at all temperatures";
    if (deltaH > 0 && deltaS < 0) return "Never spontaneous at any temperature";
    if (deltaH < 0 && deltaS < 0) return "Spontaneous at low temperatures";
    if (deltaH > 0 && deltaS > 0) return "Spontaneous at high temperatures";
    return "";
  };

  const crossoverT = valid && deltaS !== 0 ? deltaH / deltaS : null;

  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-4 text-center">
        <p className="text-2xl font-bold text-foreground font-mono">ΔG = ΔH − TΔS</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">ΔH (kJ)</label>
          <Input type="number" value={dH} onChange={(e) => setDH(e.target.value)} className="bg-white/5 border-white/10" step="any" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">ΔS (kJ/K)</label>
          <Input type="number" value={dS} onChange={(e) => setDS(e.target.value)} className="bg-white/5 border-white/10" step="any" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">T (K)</label>
          <Input type="number" value={temp} onChange={(e) => setTemp(e.target.value)} className="bg-white/5 border-white/10" step="1" />
        </div>
      </div>

      {valid && (
        <>
          <div className={`rounded-xl p-5 text-center border ${deltaG < 0 ? "bg-viridian/10 border-viridian/20" : deltaG === 0 ? "bg-saffron/10 border-saffron/20" : "bg-magenta/10 border-magenta/20"}`}>
            <p className="text-sm text-muted-foreground mb-1">ΔG</p>
            <p className={`text-4xl font-bold ${deltaG < 0 ? "text-viridian" : deltaG === 0 ? "text-saffron" : "text-magenta"}`}>
              {deltaG.toFixed(2)} <span className="text-lg">kJ</span>
            </p>
            <p className="text-sm mt-2 text-foreground font-medium">{spontaneous}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">ΔH = {deltaH > 0 ? "+" : ""}{deltaH} kJ</strong> → {deltaH < 0 ? "Exothermic" : "Endothermic"}
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">ΔS = {deltaS > 0 ? "+" : ""}{deltaS} kJ/K</strong> → Entropy {deltaS > 0 ? "increases" : "decreases"}
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">TΔS = {(T * deltaS).toFixed(2)} kJ</strong>
            </p>
            {getAlwaysLabel() && (
              <p className="text-saffron font-medium pt-2">{getAlwaysLabel()}</p>
            )}
            {crossoverT && crossoverT > 0 && isFinite(crossoverT) && (
              <p className="text-muted-foreground">
                Crossover temperature: <strong className="text-foreground">{crossoverT.toFixed(0)} K ({(crossoverT - 273.15).toFixed(0)}°C)</strong>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GibbsCalculator;
