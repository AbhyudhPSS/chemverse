import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Equation {
  reactants: { formula: string; coeff: number }[];
  products: { formula: string; coeff: number }[];
}

const equations: Equation[] = [
  { reactants: [{ formula: "H₂", coeff: 2 }, { formula: "O₂", coeff: 1 }], products: [{ formula: "H₂O", coeff: 2 }] },
  { reactants: [{ formula: "N₂", coeff: 1 }, { formula: "H₂", coeff: 3 }], products: [{ formula: "NH₃", coeff: 2 }] },
  { reactants: [{ formula: "Fe", coeff: 4 }, { formula: "O₂", coeff: 3 }], products: [{ formula: "Fe₂O₃", coeff: 2 }] },
  { reactants: [{ formula: "CH₄", coeff: 1 }, { formula: "O₂", coeff: 2 }], products: [{ formula: "CO₂", coeff: 1 }, { formula: "H₂O", coeff: 2 }] },
  { reactants: [{ formula: "Na", coeff: 2 }, { formula: "Cl₂", coeff: 1 }], products: [{ formula: "NaCl", coeff: 2 }] },
  { reactants: [{ formula: "Al", coeff: 4 }, { formula: "O₂", coeff: 3 }], products: [{ formula: "Al₂O₃", coeff: 2 }] },
  { reactants: [{ formula: "C₃H₈", coeff: 1 }, { formula: "O₂", coeff: 5 }], products: [{ formula: "CO₂", coeff: 3 }, { formula: "H₂O", coeff: 4 }] },
  { reactants: [{ formula: "Mg", coeff: 1 }, { formula: "HCl", coeff: 2 }], products: [{ formula: "MgCl₂", coeff: 1 }, { formula: "H₂", coeff: 1 }] },
];

const EquationBalancer = () => {
  const [eqIdx, setEqIdx] = useState(0);
  const [userCoeffs, setUserCoeffs] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  const eq = equations[eqIdx];
  const allCompounds = [...eq.reactants, ...eq.products];

  const initCoeffs = useCallback(() => {
    setUserCoeffs(allCompounds.map(() => "1"));
    setChecked(false);
    setCorrect(false);
  }, [eqIdx]);

  if (userCoeffs.length === 0 || userCoeffs.length !== allCompounds.length) {
    initCoeffs();
  }

  const checkAnswer = () => {
    const userNums = userCoeffs.map((c) => parseInt(c) || 0);
    const correctCoeffs = allCompounds.map((c) => c.coeff);
    
    // Check if proportional
    const ratio = userNums[0] / correctCoeffs[0];
    const isCorrect = ratio > 0 && correctCoeffs.every((c, i) => Math.abs(userNums[i] / c - ratio) < 0.001);
    
    // Also check simplest form
    const gcd = userNums.reduce((a, b) => {
      while (b) { [a, b] = [b, a % b]; } return a;
    });
    const isSimplest = gcd === 1;

    setChecked(true);
    setCorrect(isCorrect && isSimplest);
    if (isCorrect && isSimplest) setStreak(streak + 1);
    else setStreak(0);
  };

  const nextEquation = () => {
    setEqIdx((eqIdx + 1) % equations.length);
    setUserCoeffs([]);
  };

  const setCoeff = (idx: number, val: string) => {
    const next = [...userCoeffs];
    next[idx] = val;
    setUserCoeffs(next);
    setChecked(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Balance the equation by entering coefficients:</p>
        <p className="text-sm text-saffron font-medium">🔥 Streak: {streak}</p>
      </div>

      {/* Equation display */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-lg">
        {eq.reactants.map((r, i) => (
          <div key={`r${i}`} className="flex items-center gap-1">
            {i > 0 && <span className="text-muted-foreground mx-1">+</span>}
            <Input
              type="number"
              min={1}
              max={20}
              value={userCoeffs[i] || "1"}
              onChange={(e) => setCoeff(i, e.target.value)}
              className={`w-14 h-10 text-center bg-white/5 border-white/10 text-lg font-bold ${
                checked ? (correct ? "border-viridian" : "border-magenta") : ""
              }`}
            />
            <span className="font-mono text-foreground">{r.formula}</span>
          </div>
        ))}

        <span className="text-muted-foreground mx-2">→</span>

        {eq.products.map((p, i) => {
          const idx = eq.reactants.length + i;
          return (
            <div key={`p${i}`} className="flex items-center gap-1">
              {i > 0 && <span className="text-muted-foreground mx-1">+</span>}
              <Input
                type="number"
                min={1}
                max={20}
                value={userCoeffs[idx] || "1"}
                onChange={(e) => setCoeff(idx, e.target.value)}
                className={`w-14 h-10 text-center bg-white/5 border-white/10 text-lg font-bold ${
                  checked ? (correct ? "border-viridian" : "border-magenta") : ""
                }`}
              />
              <span className="font-mono text-foreground">{p.formula}</span>
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {checked && (
        <div className={`rounded-xl p-4 text-center border ${correct ? "bg-viridian/10 border-viridian/20" : "bg-magenta/10 border-magenta/20"}`}>
          {correct ? (
            <p className="text-viridian font-semibold">✅ Correct! The equation is balanced.</p>
          ) : (
            <div>
              <p className="text-magenta font-semibold">❌ Not quite — check your coefficients.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Hint: Answer is {allCompounds.map((c) => c.coeff).join(", ")} (use the lowest whole numbers)
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <Button onClick={checkAnswer} disabled={checked && correct}>Check Answer</Button>
        <Button variant="outline" onClick={nextEquation}>Next Equation →</Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Equation {eqIdx + 1} of {equations.length} • Use the lowest whole-number coefficients
      </p>
    </div>
  );
};

export default EquationBalancer;
