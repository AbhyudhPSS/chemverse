import { useState } from "react";
import { Input } from "@/components/ui/input";

const DilutionCalculator = () => {
  const [m1, setM1] = useState("2");
  const [v1, setV1] = useState("25");
  const [m2, setM2] = useState("");
  const [v2, setV2] = useState("100");
  const [solveFor, setSolveFor] = useState<"M1" | "V1" | "M2" | "V2">("M2");

  const calc = () => {
    const a = parseFloat(m1), b = parseFloat(v1), c = parseFloat(m2), d = parseFloat(v2);
    switch (solveFor) {
      case "M1": return (b && c && d) ? { result: (c * d) / b, unit: "M" } : null;
      case "V1": return (a && c && d) ? { result: (c * d) / a, unit: "mL" } : null;
      case "M2": return (a && b && d) ? { result: (a * b) / d, unit: "M" } : null;
      case "V2": return (a && b && c) ? { result: (a * b) / c, unit: "mL" } : null;
      default: return null;
    }
  };

  const result = calc();

  const fields = [
    { key: "M1", label: "M₁ (initial concentration)", value: m1, set: setM1, unit: "M" },
    { key: "V1", label: "V₁ (initial volume)", value: v1, set: setV1, unit: "mL" },
    { key: "M2", label: "M₂ (final concentration)", value: m2, set: setM2, unit: "M" },
    { key: "V2", label: "V₂ (final volume)", value: v2, set: setV2, unit: "mL" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-4 text-center">
        <p className="text-2xl font-bold text-foreground font-mono">M₁V₁ = M₂V₂</p>
        <p className="text-sm text-muted-foreground mt-1">The dilution equation</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Solve for:</span>
        {(["M1", "V1", "M2", "V2"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setSolveFor(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              solveFor === f ? "bg-iris/20 text-iris" : "bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            {f.replace("1", "₁").replace("2", "₂")}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className={solveFor === f.key ? "opacity-40 pointer-events-none" : ""}>
            <label className="text-sm text-muted-foreground mb-1 block">{f.label}</label>
            <div className="relative">
              <Input
                type="number"
                value={solveFor === f.key ? "" : f.value}
                onChange={(e) => f.set(e.target.value)}
                placeholder={solveFor === f.key ? "Calculated" : "Enter value"}
                className="bg-white/5 border-white/10 pr-10"
                step="any"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{f.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {result && isFinite(result.result) && result.result > 0 && (
        <div className="bg-iris/10 border border-iris/20 rounded-xl p-5 text-center">
          <p className="text-sm text-muted-foreground mb-1">
            {solveFor.replace("1", "₁").replace("2", "₂")}
          </p>
          <p className="text-4xl font-bold text-iris">
            {result.result.toFixed(3)} <span className="text-lg">{result.unit}</span>
          </p>
        </div>
      )}

      {/* Visual */}
      <div className="flex items-end justify-center gap-8">
        <div className="text-center">
          <div className="w-16 h-24 border-2 border-white/20 rounded-b-lg mx-auto relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-iris/40" style={{ height: "80%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Concentrated</p>
        </div>
        <span className="text-2xl text-muted-foreground mb-8">→</span>
        <div className="text-center">
          <div className="w-24 h-24 border-2 border-white/20 rounded-b-lg mx-auto relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-iris/15" style={{ height: "80%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Diluted</p>
        </div>
      </div>
    </div>
  );
};

export default DilutionCalculator;
