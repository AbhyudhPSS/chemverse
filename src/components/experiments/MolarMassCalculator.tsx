import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const elementMasses: Record<string, number> = {
  H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.81, C: 12.011, N: 14.007,
  O: 15.999, F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.305, Al: 26.982,
  Si: 28.086, P: 30.974, S: 32.065, Cl: 35.453, Ar: 39.948, K: 39.098,
  Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.38, Br: 79.904, Ag: 107.868,
  I: 126.904, Au: 196.967, Pb: 207.2, Mn: 54.938, Cr: 51.996, Co: 58.933,
  Ni: 58.693, Sn: 118.71, Ti: 47.867, Ba: 137.327, Sr: 87.62,
};

interface ParsedElement {
  symbol: string;
  count: number;
  mass: number;
}

const parseFormula = (formula: string): ParsedElement[] | null => {
  const regex = /([A-Z][a-z]?)(\d*)/g;
  const elements: ParsedElement[] = [];
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(formula)) !== null) {
    if (match.index !== lastIndex && lastIndex !== 0) break;
    lastIndex = match.index + match[0].length;
    const symbol = match[1];
    const count = match[2] ? parseInt(match[2]) : 1;
    const mass = elementMasses[symbol];
    if (!mass) return null;
    elements.push({ symbol, count, mass });
  }

  return elements.length > 0 ? elements : null;
};

const MolarMassCalculator = () => {
  const [formula, setFormula] = useState("H2O");
  const parsed = parseFormula(formula);
  const totalMass = parsed?.reduce((sum, e) => sum + e.mass * e.count, 0);

  const examples = ["H2O", "NaCl", "C6H12O6", "H2SO4", "CaCO3", "Fe2O3"];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Chemical Formula</label>
        <Input
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="e.g. H2O, NaCl, C6H12O6"
          className="bg-white/5 border-white/10 text-lg font-mono"
        />
      </div>

      {/* Quick examples */}
      <div className="flex flex-wrap gap-2">
        {examples.map((ex) => (
          <Button key={ex} variant="outline" size="sm" onClick={() => setFormula(ex)} className="font-mono text-xs">
            {ex}
          </Button>
        ))}
      </div>

      {parsed && totalMass ? (
        <>
          {/* Breakdown */}
          <div className="bg-white/5 rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-px text-sm font-medium text-muted-foreground bg-white/10 p-3">
              <span>Element</span>
              <span>Count</span>
              <span>Atomic Mass</span>
              <span>Subtotal</span>
            </div>
            {parsed.map((el, i) => (
              <div key={i} className="grid grid-cols-4 gap-px text-sm p-3 border-t border-white/5">
                <span className="font-mono text-foreground">{el.symbol}</span>
                <span className="text-muted-foreground">×{el.count}</span>
                <span className="text-muted-foreground">{el.mass.toFixed(3)}</span>
                <span className="text-foreground font-medium">{(el.mass * el.count).toFixed(3)}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-cyanine/10 border border-cyanine/20 rounded-xl p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Molar Mass of {formula}</p>
            <p className="text-4xl font-bold text-cyanine">{totalMass.toFixed(3)} <span className="text-lg">g/mol</span></p>
          </div>

          {/* Percent composition */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Percent Composition</p>
            {parsed.map((el, i) => {
              const pct = ((el.mass * el.count) / totalMass) * 100;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-mono w-8 text-foreground">{el.symbol}</span>
                  <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyanine/60 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-16 text-right">{pct.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </>
      ) : formula.length > 0 ? (
        <p className="text-sm text-magenta">Couldn't parse that formula. Use proper capitalization (e.g. NaCl not nacl).</p>
      ) : null}
    </div>
  );
};

export default MolarMassCalculator;
