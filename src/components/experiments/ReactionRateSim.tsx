import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  reacted: boolean;
  color: string;
}

const ReactionRateSim = () => {
  const [temperature, setTemperature] = useState(300);
  const [concentration, setConcentration] = useState(20);
  const [hasCatalyst, setHasCatalyst] = useState(false);
  const [collisions, setCollisions] = useState(0);
  const [reactions, setReactions] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>();
  const statsRef = useRef({ collisions: 0, reactions: 0 });

  const activationEnergy = hasCatalyst ? 150 : 300;
  const speedFactor = temperature / 300;

  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < concentration; i++) {
      particles.push({
        x: Math.random() * 400,
        y: Math.random() * 250,
        vx: (Math.random() - 0.5) * 3 * speedFactor,
        vy: (Math.random() - 0.5) * 3 * speedFactor,
        reacted: false,
        color: i % 2 === 0 ? "#06b6d4" : "#f472b6",
      });
    }
    particlesRef.current = particles;
    statsRef.current = { collisions: 0, reactions: 0 };
    setCollisions(0);
    setReactions(0);
  }, [concentration, temperature, hasCatalyst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, 400, 250);
      const particles = particlesRef.current;

      particles.forEach((p) => {
        p.x += p.vx * speedFactor;
        p.y += p.vy * speedFactor;
        if (p.x <= 0 || p.x >= 400) p.vx *= -1;
        if (p.y <= 0 || p.y >= 250) p.vy *= -1;
        p.x = Math.max(0, Math.min(400, p.x));
        p.y = Math.max(0, Math.min(250, p.y));
      });

      // Check collisions
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 8 && !particles[i].reacted && !particles[j].reacted) {
            statsRef.current.collisions++;
            const energy = Math.sqrt(
              particles[i].vx ** 2 + particles[i].vy ** 2 + particles[j].vx ** 2 + particles[j].vy ** 2
            ) * 100;
            if (energy > activationEnergy / speedFactor) {
              particles[i].reacted = true;
              particles[j].reacted = true;
              statsRef.current.reactions++;
            } else {
              // Elastic bounce
              [particles[i].vx, particles[j].vx] = [particles[j].vx, particles[i].vx];
              [particles[i].vy, particles[j].vy] = [particles[j].vy, particles[i].vy];
            }
          }
        }
      }

      // Draw
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = p.reacted ? "#22c55e" : p.color;
        ctx.fill();
        if (p.reacted) {
          ctx.strokeStyle = "#22c55e";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      setCollisions(statsRef.current.collisions);
      setReactions(statsRef.current.reactions);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [speedFactor, activationEnergy, concentration]);

  return (
    <div className="space-y-6">
      {/* Canvas */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={250}
          className="h-auto w-full max-w-[400px] rounded-xl border border-white/10 bg-white/5"
        />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#06b6d4]" /> Reactant A</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#f472b6]" /> Reactant B</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#22c55e]" /> Product</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Collisions</p>
          <p className="text-xl font-bold text-foreground">{collisions}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Reactions</p>
          <p className="text-xl font-bold text-viridian">{reactions}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-xs text-muted-foreground">Ea</p>
          <p className="text-xl font-bold text-foreground">{activationEnergy}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Temperature</span>
            <span className="text-foreground">{temperature} K</span>
          </div>
          <Slider value={[temperature]} onValueChange={([v]) => setTemperature(v)} min={100} max={800} step={10} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Particles</span>
            <span className="text-foreground">{concentration}</span>
          </div>
          <Slider value={[concentration]} onValueChange={([v]) => setConcentration(v)} min={5} max={50} step={1} />
        </div>
        <Button
          variant={hasCatalyst ? "default" : "outline"}
          onClick={() => setHasCatalyst(!hasCatalyst)}
          className="w-full"
        >
          {hasCatalyst ? "🧬 Catalyst Active (Lower Ea)" : "Add Catalyst"}
        </Button>
      </div>
    </div>
  );
};

export default ReactionRateSim;
