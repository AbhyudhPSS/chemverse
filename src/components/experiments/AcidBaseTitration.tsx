import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const AcidBaseTitration = () => {
  const [volumeAdded, setVolumeAdded] = useState(0);
  const [acidConc] = useState(0.1);
  const [baseConc] = useState(0.1);
  const [acidVolume] = useState(50);

  const equivalenceVolume = (acidConc * acidVolume) / baseConc;

  const calculatePH = (vol: number): number => {
    if (vol === 0) return -Math.log10(acidConc);
    const molesAcid = acidConc * acidVolume / 1000;
    const molesBase = baseConc * vol / 1000;

    if (molesBase < molesAcid) {
      const remaining = molesAcid - molesBase;
      const totalVol = (acidVolume + vol) / 1000;
      return -Math.log10(remaining / totalVol);
    } else if (Math.abs(molesBase - molesAcid) < 0.0001) {
      return 7;
    } else {
      const excess = molesBase - molesAcid;
      const totalVol = (acidVolume + vol) / 1000;
      const pOH = -Math.log10(excess / totalVol);
      return 14 - pOH;
    }
  };

  const currentPH = calculatePH(volumeAdded);

  const getColor = (ph: number) => {
    if (ph < 3) return "bg-red-500";
    if (ph < 5) return "bg-orange-500";
    if (ph < 6.5) return "bg-yellow-400";
    if (ph < 7.5) return "bg-green-400";
    if (ph < 9) return "bg-cyan-400";
    if (ph < 11) return "bg-blue-500";
    return "bg-purple-500";
  };

  // Generate curve points
  const curvePoints = Array.from({ length: 101 }, (_, i) => ({
    x: i,
    y: calculatePH(i),
  }));

  const maxVol = 100;
  const chartW = 100;
  const chartH = 60;
  const scaleX = (v: number) => (v / maxVol) * chartW;
  const scaleY = (ph: number) => chartH - (Math.min(14, Math.max(0, ph)) / 14) * chartH;

  const pathD = curvePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`)
    .join(" ");

  return (
    <div className="space-y-6">
      {/* Beaker visualization */}
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-muted-foreground">Solution</p>
          <div className="relative w-32 h-40 border-2 border-white/20 rounded-b-2xl overflow-hidden">
            <div
              className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${getColor(currentPH)}`}
              style={{ height: `${60 + volumeAdded * 0.3}%`, opacity: 0.7 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground drop-shadow-lg">
                {currentPH.toFixed(2)}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">pH</p>
        </div>

        {/* pH scale */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">pH Scale</p>
          <div className="flex flex-col gap-0.5">
            {Array.from({ length: 15 }, (_, i) => 14 - i).map((val) => (
              <div key={val} className="flex items-center gap-2">
                <div
                  className={`w-8 h-4 rounded-sm transition-all ${
                    Math.round(currentPH) === val ? "ring-2 ring-foreground scale-110" : "opacity-60"
                  }`}
                  style={{
                    backgroundColor: `hsl(${(val / 14) * 270}, 80%, 50%)`,
                  }}
                />
                <span className="text-xs text-muted-foreground w-4">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Titration curve */}
      <div className="bg-white/5 rounded-xl p-4">
        <p className="text-sm font-medium text-muted-foreground mb-3">Titration Curve</p>
        <svg viewBox={`-8 -4 ${chartW + 16} ${chartH + 12}`} className="w-full h-48">
          {/* Grid lines */}
          {[0, 7, 14].map((ph) => (
            <g key={ph}>
              <line x1={0} y1={scaleY(ph)} x2={chartW} y2={scaleY(ph)} stroke="white" strokeOpacity={0.1} />
              <text x={-6} y={scaleY(ph) + 3} fill="white" fillOpacity={0.4} fontSize={3}>{ph}</text>
            </g>
          ))}
          {/* Equivalence line */}
          <line x1={scaleX(equivalenceVolume)} y1={0} x2={scaleX(equivalenceVolume)} y2={chartH} stroke="white" strokeOpacity={0.15} strokeDasharray="2 2" />
          <text x={scaleX(equivalenceVolume)} y={chartH + 6} fill="white" fillOpacity={0.4} fontSize={2.5} textAnchor="middle">eq pt</text>
          {/* Curve */}
          <path d={pathD} fill="none" stroke="hsl(var(--cyanine))" strokeWidth={0.8} />
          {/* Current point */}
          <circle cx={scaleX(volumeAdded)} cy={scaleY(currentPH)} r={1.5} fill="hsl(var(--magenta))" />
          {/* Axis labels */}
          <text x={chartW / 2} y={chartH + 9} fill="white" fillOpacity={0.4} fontSize={3} textAnchor="middle">Volume NaOH (mL)</text>
        </svg>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Volume of NaOH added</span>
            <span className="text-foreground font-medium">{volumeAdded.toFixed(1)} mL</span>
          </div>
          <Slider
            value={[volumeAdded]}
            onValueChange={([v]) => setVolumeAdded(v)}
            min={0}
            max={100}
            step={0.5}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => setVolumeAdded(0)}>Reset</Button>
          <Button variant="outline" size="sm" onClick={() => setVolumeAdded(equivalenceVolume)}>
            Jump to Equivalence
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-muted-foreground">Acid</p>
            <p className="font-medium text-foreground">{acidConc} M HCl • {acidVolume} mL</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-muted-foreground">Base</p>
            <p className="font-medium text-foreground">{baseConc} M NaOH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcidBaseTitration;
