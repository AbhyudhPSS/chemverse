import { useState } from "react";
import { Input } from "@/components/ui/input";

const PhCalculator = () => {
  const [mode, setMode] = useState<"pH" | "pOH" | "H" | "OH">("pH");
  const [inputVal, setInputVal] = useState("7");

  const parse = () => {
    const v = parseFloat(inputVal);
    if (isNaN(v)) return null;
    let pH: number, pOH: number, H: number, OH: number;
    switch (mode) {
      case "pH":
        pH = v; pOH = 14 - v; H = Math.pow(10, -v); OH = Math.pow(10, -(14 - v)); break;
      case "pOH":
        pOH = v; pH = 14 - v; OH = Math.pow(10, -v); H = Math.pow(10, -(14 - v)); break;
      case "H":
        H = v; pH = -Math.log10(v); pOH = 14 - pH; OH = Math.pow(10, -pOH); break;
      case "OH":
        OH = v; pOH = -Math.log10(v); pH = 14 - pOH; H = Math.pow(10, -pH); break;
      default: return null;
    }
    return { pH, pOH, H, OH };
  };

  const results = parse();
  const safeResults = results && isFinite(results.pH) ? results : null;

  const getLabel = (ph: number) => {
    if (ph < 3) return "Strongly Acidic";
    if (ph < 6) return "Weakly Acidic";
    if (ph < 8) return "Neutral";
    if (ph < 11) return "Weakly Basic";
    return "Strongly Basic";
  };

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Calculate from:</span>
        {(["pH", "pOH", "H", "OH"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              mode === m ? "bg-viridian/20 text-viridian" : "bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            {m === "H" ? "[H⁺]" : m === "OH" ? "[OH⁻]" : m}
          </button>
        ))}
      </div>

      {/* Input */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">
          Enter {mode === "H" ? "[H⁺] concentration" : mode === "OH" ? "[OH⁻] concentration" : mode} value
        </label>
        <Input
          type="number"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={mode === "H" || mode === "OH" ? "e.g. 0.001" : "e.g. 7"}
          className="bg-white/5 border-white/10"
          step="any"
        />
      </div>

      {/* Results */}
      {safeResults && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">pH</p>
              <p className="text-2xl font-bold text-foreground">{safeResults.pH.toFixed(2)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">pOH</p>
              <p className="text-2xl font-bold text-foreground">{safeResults.pOH.toFixed(2)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">[H⁺]</p>
              <p className="text-lg font-bold text-foreground">{safeResults.H.toExponential(2)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">[OH⁻]</p>
              <p className="text-lg font-bold text-foreground">{safeResults.OH.toExponential(2)}</p>
            </div>
          </div>

          {/* Visual pH bar */}
          <div className="space-y-2">
            <div className="h-6 rounded-full overflow-hidden flex">
              {Array.from({ length: 14 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 transition-all"
                  style={{
                    backgroundColor: `hsl(${(i / 14) * 270}, 80%, ${Math.round(safeResults.pH) === i ? 60 : 40}%)`,
                    opacity: Math.round(safeResults.pH) === i ? 1 : 0.4,
                    transform: Math.round(safeResults.pH) === i ? "scaleY(1.3)" : "scaleY(1)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 (Acid)</span>
              <span>7 (Neutral)</span>
              <span>14 (Base)</span>
            </div>
          </div>

          <div className="bg-viridian/10 border border-viridian/20 rounded-xl p-4 text-center">
            <p className="text-lg font-semibold text-viridian">{getLabel(safeResults.pH)}</p>
            <p className="text-sm text-muted-foreground">pH + pOH = {(safeResults.pH + safeResults.pOH).toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PhCalculator;
