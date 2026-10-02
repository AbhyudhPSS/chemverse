import { useState } from "react";
import { Button } from "@/components/ui/button";

const subshells = [
  { name: "1s", max: 2, shell: 1 },
  { name: "2s", max: 2, shell: 2 },
  { name: "2p", max: 6, shell: 2 },
  { name: "3s", max: 2, shell: 3 },
  { name: "3p", max: 6, shell: 3 },
  { name: "4s", max: 2, shell: 4 },
  { name: "3d", max: 10, shell: 3 },
  { name: "4p", max: 6, shell: 4 },
  { name: "5s", max: 2, shell: 5 },
  { name: "4d", max: 10, shell: 4 },
  { name: "5p", max: 6, shell: 5 },
  { name: "6s", max: 2, shell: 6 },
  { name: "4f", max: 14, shell: 4 },
  { name: "5d", max: 10, shell: 5 },
];

const elements: Record<number, string> = {
  1: "H", 2: "He", 3: "Li", 4: "Be", 5: "B", 6: "C", 7: "N", 8: "O", 9: "F", 10: "Ne",
  11: "Na", 12: "Mg", 13: "Al", 14: "Si", 15: "P", 16: "S", 17: "Cl", 18: "Ar",
  19: "K", 20: "Ca", 21: "Sc", 22: "Ti", 23: "V", 24: "Cr", 25: "Mn", 26: "Fe",
  27: "Co", 28: "Ni", 29: "Cu", 30: "Zn", 31: "Ga", 32: "Ge", 33: "As", 34: "Se", 35: "Br", 36: "Kr",
};

const ElectronConfigBuilder = () => {
  const [filling, setFilling] = useState<number[]>(subshells.map(() => 0));
  const totalElectrons = filling.reduce((a, b) => a + b, 0);
  const element = elements[totalElectrons] || (totalElectrons > 36 ? `Z=${totalElectrons}` : "");

  const addElectron = (idx: number) => {
    if (filling[idx] < subshells[idx].max) {
      const next = [...filling];
      next[idx]++;
      setFilling(next);
    }
  };

  const removeElectron = (idx: number) => {
    if (filling[idx] > 0) {
      const next = [...filling];
      next[idx]--;
      setFilling(next);
    }
  };

  // Classic Aufbau exceptions: a filled or half-filled 3d subshell is extra stable,
  // so Cr and Cu promote one 4s electron into 3d rather than filling 4s first.
  const aufbauExceptions: Record<number, number> = { 24: 1, 29: 1 };

  const autoFill = (targetZ: number) => {
    const result = subshells.map(() => 0);
    let remaining = targetZ;
    const s4sCap = aufbauExceptions[targetZ];
    for (let i = 0; i < subshells.length && remaining > 0; i++) {
      const max = s4sCap !== undefined && subshells[i].name === "4s" ? Math.min(subshells[i].max, s4sCap) : subshells[i].max;
      const fill = Math.min(remaining, max);
      result[i] = fill;
      remaining -= fill;
    }
    setFilling(result);
  };

  const configString = subshells
    .map((s, i) => (filling[i] > 0 ? `${s.name}${superscript(filling[i])}` : ""))
    .filter(Boolean)
    .join(" ");

  const quickElements = [1, 6, 8, 11, 17, 26, 29, 36];

  return (
    <div className="space-y-6">
      {/* Current element */}
      <div className="text-center">
        <p className="text-4xl font-bold text-cyanine">{element || "?"}</p>
        <p className="text-sm text-muted-foreground">{totalElectrons} electrons</p>
        <p className="text-sm font-mono text-muted-foreground mt-1">{configString || "Empty"}</p>
      </div>

      {/* Quick fill */}
      <div className="flex flex-wrap gap-2 justify-center">
        {quickElements.map((z) => (
          <Button key={z} variant="outline" size="sm" onClick={() => autoFill(z)} className="text-xs">
            {elements[z]} (Z={z})
          </Button>
        ))}
        <Button variant="outline" size="sm" onClick={() => setFilling(subshells.map(() => 0))} className="text-xs">
          Clear
        </Button>
      </div>

      {/* Orbital diagram */}
      <div className="space-y-2">
        {subshells.map((sub, idx) => {
          const orbitalCount = sub.max / 2;
          const orbitals: number[] = [];
          let remaining = filling[idx];
          // Hund's rule: fill each orbital with 1 first, then pair
          for (let o = 0; o < orbitalCount; o++) {
            orbitals.push(remaining > 0 ? 1 : 0);
            remaining--;
          }
          remaining = filling[idx] - orbitalCount;
          if (remaining > 0) {
            for (let o = 0; o < orbitalCount && remaining > 0; o++) {
              orbitals[o] = 2;
              remaining--;
            }
          }

          return (
            <div key={idx} className="flex items-center gap-2 sm:gap-3">
              <span className="w-6 shrink-0 text-sm font-mono text-muted-foreground sm:w-8">{sub.name}</span>
              <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto py-0.5">
                {orbitals.map((electrons, o) => (
                  <div
                    key={o}
                    className="flex h-8 w-10 shrink-0 items-center justify-center gap-0.5 rounded border border-white/20 bg-white/5"
                  >
                    {electrons >= 1 && <span className="text-cyanine text-xs">↑</span>}
                    {electrons >= 2 && <span className="text-magenta text-xs">↓</span>}
                  </div>
                ))}
              </div>
              <span className="w-8 shrink-0 text-xs text-muted-foreground">{filling[idx]}/{sub.max}</span>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => addElectron(idx)}
                  disabled={filling[idx] >= sub.max}
                  className="w-6 h-6 rounded bg-white/10 text-xs text-foreground hover:bg-white/20 disabled:opacity-30"
                >+</button>
                <button
                  onClick={() => removeElectron(idx)}
                  disabled={filling[idx] <= 0}
                  className="w-6 h-6 rounded bg-white/10 text-xs text-foreground hover:bg-white/20 disabled:opacity-30"
                >−</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function superscript(n: number): string {
  const chars: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  return String(n).split("").map(c => chars[c] || c).join("");
}

export default ElectronConfigBuilder;
