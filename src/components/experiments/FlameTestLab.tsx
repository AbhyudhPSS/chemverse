import { useState } from "react";
import { Button } from "@/components/ui/button";

const metalSalts = [
  { name: "Lithium (Li)", color: "#FF0040", hue: "Crimson Red", glow: "rgba(255,0,64,0.6)" },
  { name: "Sodium (Na)", color: "#FFB800", hue: "Bright Yellow", glow: "rgba(255,184,0,0.6)" },
  { name: "Potassium (K)", color: "#C084FC", hue: "Lilac/Violet", glow: "rgba(192,132,252,0.6)" },
  { name: "Calcium (Ca)", color: "#B7410E", hue: "Brick Red", glow: "rgba(183,65,14,0.6)" },
  { name: "Barium (Ba)", color: "#22C55E", hue: "Apple Green", glow: "rgba(34,197,94,0.6)" },
  { name: "Copper (Cu)", color: "#06B6D4", hue: "Blue-Green", glow: "rgba(6,182,212,0.6)" },
  { name: "Strontium (Sr)", color: "#EF4444", hue: "Red", glow: "rgba(239,68,68,0.6)" },
];

const FlameTestLab = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [randomIdx, setRandomIdx] = useState(Math.floor(Math.random() * metalSalts.length));

  const current = selected !== null ? metalSalts[selected] : null;
  const quizSalt = metalSalts[randomIdx];

  const handleQuizGuess = (idx: number) => {
    setTotal(total + 1);
    if (idx === randomIdx) {
      setScore(score + 1);
    }
    setRevealed(true);
  };

  const nextQuiz = () => {
    setRevealed(false);
    setRandomIdx(Math.floor(Math.random() * metalSalts.length));
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3 justify-center">
        <Button
          variant={!quizMode ? "default" : "outline"}
          size="sm"
          onClick={() => setQuizMode(false)}
        >
          🔬 Explore
        </Button>
        <Button
          variant={quizMode ? "default" : "outline"}
          size="sm"
          onClick={() => { setQuizMode(true); setScore(0); setTotal(0); setRevealed(false); nextQuiz(); }}
        >
          🎯 Quiz Mode
        </Button>
      </div>

      {!quizMode ? (
        <>
          {/* Flame visualization */}
          <div className="flex justify-center">
            <div className="relative w-40 h-52">
              {/* Burner base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/10 rounded-t-lg" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-16 bg-white/5 rounded-t-lg" />
              {/* Flame */}
              <div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-16 h-28 rounded-full transition-all duration-500"
                style={{
                  background: current
                    ? `radial-gradient(ellipse at bottom, ${current.color}, ${current.glow}, transparent 70%)`
                    : "radial-gradient(ellipse at bottom, #FF8C00, #FFD700, transparent 70%)",
                  filter: `blur(${current ? 4 : 3}px)`,
                  boxShadow: current ? `0 0 40px ${current.glow}` : "0 0 30px rgba(255,140,0,0.4)",
                }}
              />
              {/* Inner flame */}
              <div
                className="absolute bottom-22 left-1/2 -translate-x-1/2 w-8 h-16 rounded-full transition-all duration-500"
                style={{
                  background: current
                    ? `radial-gradient(ellipse at bottom, white, ${current.color}80, transparent 80%)`
                    : "radial-gradient(ellipse at bottom, white, #FF8C0080, transparent 80%)",
                  filter: "blur(2px)",
                }}
              />
            </div>
          </div>

          {current && (
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{current.name}</p>
              <p className="text-sm text-muted-foreground">
                Flame color: <span style={{ color: current.color }} className="font-bold">{current.hue}</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {metalSalts.map((salt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                  selected === i ? "border-white/30 bg-white/10" : "border-white/5 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: salt.color }} />
                {salt.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Quiz flame */}
          <div className="flex justify-center">
            <div className="relative w-40 h-52">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/10 rounded-t-lg" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-16 bg-white/5 rounded-t-lg" />
              <div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-16 h-28 rounded-full"
                style={{
                  background: `radial-gradient(ellipse at bottom, ${quizSalt.color}, ${quizSalt.glow}, transparent 70%)`,
                  filter: "blur(4px)",
                  boxShadow: `0 0 40px ${quizSalt.glow}`,
                }}
              />
            </div>
          </div>

          <p className="text-center text-muted-foreground">Which metal produces this flame?</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {metalSalts.map((salt, i) => (
              <button
                key={i}
                onClick={() => !revealed && handleQuizGuess(i)}
                disabled={revealed}
                className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                  revealed && i === randomIdx ? "border-viridian bg-viridian/10" :
                  revealed ? "opacity-40" :
                  "border-white/5 bg-white/5 hover:bg-white/10"
                }`}
              >
                {salt.name}
              </button>
            ))}
          </div>

          {revealed && (
            <div className="text-center space-y-3">
              <p className="text-foreground font-medium">
                The answer is <span style={{ color: quizSalt.color }}>{quizSalt.name}</span> ({quizSalt.hue})
              </p>
              <Button onClick={nextQuiz}>Next Question →</Button>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            Score: {score}/{total}
          </div>
        </>
      )}
    </div>
  );
};

export default FlameTestLab;
