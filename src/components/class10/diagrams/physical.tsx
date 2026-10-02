import type { ReactNode } from "react";

import { Frame, ink, soft, line, arrowHead } from "./shared";

/* ------------------------------------------------------------------ *
 * Physical-chemistry diagrams: electrochemistry, equilibrium, kinetics,
 * gases and solutions. Every curve is computed from its equation rather
 * than sketched, so the shapes are chemically correct.
 * ------------------------------------------------------------------ */

const cobalt = "hsl(var(--cobalt))";
const viridian = "hsl(var(--viridian))";
const crimson = "hsl(var(--crimson))";
const saffron = "hsl(var(--saffron))";
const magenta = "hsl(var(--magenta))";
const copper = "hsl(var(--copper))";
const card = "hsl(var(--card))";
const tint = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

interface Pt {
  x: number;
  y: number;
}

const poly = (pts: Pt[]) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

/** Axes with arrow-tips, drawn inside a plot area. */
const Axes = ({ x, y, w, h, xl, yl }: { x: number; y: number; w: number; h: number; xl?: string; yl?: string }) => (
  <g>
    <line x1={x} y1={y + h} x2={x} y2={y - 4} stroke={soft} strokeWidth="1.5" />
    <line x1={x} y1={y + h} x2={x + w + 4} y2={y + h} stroke={soft} strokeWidth="1.5" />
    {arrowHead(x, y - 6, -90, soft, 6)}
    {arrowHead(x + w + 6, y + h, 0, soft, 6)}
    {xl && (
      <text x={x + w / 2} y={y + h + 24} textAnchor="middle" fontSize="11" fill={soft}>
        {xl}
      </text>
    )}
    {yl && (
      <text x={x - 28} y={y + h / 2} textAnchor="middle" fontSize="11" fill={soft} transform={`rotate(-90, ${x - 28}, ${y + h / 2})`}>
        {yl}
      </text>
    )}
  </g>
);

/* ---------------------------- Galvanic cell ---------------------------- */

export const GalvanicCell = () => {
  const half = (x: number, colour: string, metal: string, solution: string, role: string, eq: string) => (
    <g>
      <path d={`M${x} 124 V 262 a 14 14 0 0 0 14 14 H${x + 186} a 14 14 0 0 0 14 -14 V 124`} fill="none" stroke={line} strokeWidth="2.4" />
      <path d={`M${x + 1} 156 H${x + 199} V 262 a 13 13 0 0 1 -13 13 H${x + 14} a 13 13 0 0 1 -13 -13 Z`} fill={tint(colour, 12)} />
      <rect x={x + 90} y={74} width={20} height={166} rx="2.5" fill={tint(colour, 55)} stroke={colour} strokeWidth="2" />
      <text x={x + 122} y={96} fontSize="13" fontWeight="700" fill={colour}>{metal}</text>
      <text x={x + 100} y={262} textAnchor="middle" fontSize="11" fill={soft}>{solution}</text>
      <text x={x + 100} y={296} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={colour}>{role}</text>
      <text x={x + 100} y={314} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill={ink}>{eq}</text>
    </g>
  );

  return (
    <Frame
      caption="A zinc–copper galvanic (Daniell) cell — zinc is oxidised at the anode, copper(II) is reduced at the cathode, and the salt bridge completes the circuit"
      viewBox="0 0 600 350"
    >
      {half(40, saffron, "Zn", "ZnSO₄(aq)", "Anode (−): oxidation", "Zn → Zn²⁺ + 2e⁻")}
      {half(360, copper, "Cu", "CuSO₄(aq)", "Cathode (+): reduction", "Cu²⁺ + 2e⁻ → Cu")}

      {/* salt bridge */}
      <path d="M208 196 V 124 Q208 100 232 100 H 368 Q392 100 392 124 V 196" fill="none" stroke={soft} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M208 196 V 124 Q208 100 232 100 H 368 Q392 100 392 124 V 196" fill="none" stroke={card} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <text x={300} y={92} textAnchor="middle" fontSize="11" fontWeight="600" fill={soft}>Salt bridge (e.g. KNO₃)</text>
      <g fontSize="10" fill={magenta} fontWeight="600">
        <line x1={338} y1={106} x2={262} y2={106} stroke={magenta} strokeWidth="1.5" />
        {arrowHead(260, 106, 180, magenta, 6)}
        <text x={300} y={125} textAnchor="middle">anions → anode side</text>
        <line x1={262} y1={140} x2={338} y2={140} stroke={cobalt} strokeWidth="1.5" />
        {arrowHead(340, 140, 0, cobalt, 6)}
        <text x={300} y={158} textAnchor="middle" fill={cobalt}>cations → cathode side</text>
      </g>

      {/* external circuit */}
      <polyline points="150,74 150,40 470,40 470,74" fill="none" stroke={ink} strokeWidth="2" />
      <circle cx={310} cy={40} r={19} fill={card} stroke={ink} strokeWidth="2" />
      <text x={310} y={45} textAnchor="middle" fontSize="14" fontWeight="700" fill={ink}>V</text>
      <line x1={190} y1={40} x2={274} y2={40} stroke={cobalt} strokeWidth="2.4" />
      {arrowHead(276, 40, 0, cobalt, 8)}
      <text x={226} y={28} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={cobalt}>e⁻ flow</text>
    </Frame>
  );
};

/* --------------------------- Titration curves --------------------------- */

export const TitrationCurve = () => {
  const x0 = 70;
  const y0 = 36;
  const w = 380;
  const h = 224;
  const vMax = 50;
  const X = (v: number) => x0 + (v / vMax) * w;
  const Y = (ph: number) => y0 + h - (ph / 14) * h;

  // 25.0 mL of 0.100 M acid titrated with 0.100 M NaOH.
  const strong = (v: number) => {
    const n = 2.5 - 0.1 * v; // mmol acid left (+) or base excess (−)
    const total = 25 + v;
    if (Math.abs(n) < 1e-9) return 7;
    return n > 0 ? -Math.log10(n / total) : 14 + Math.log10(-n / total);
  };
  const pKa = 4.74;
  const weak = (v: number) => {
    if (v === 0) return 0.5 * (pKa + 1);
    const a = 0.1 * v;
    const ha = 2.5 - 0.1 * v;
    if (ha > 1e-9) return pKa + Math.log10(a / ha);
    const total = 25 + v;
    if (Math.abs(ha) <= 1e-9) return 14 - 0.5 * ((14 - pKa) + -Math.log10(2.5 / total));
    return 14 + Math.log10(-ha / total);
  };

  const sample = (f: (v: number) => number): Pt[] => {
    const pts: Pt[] = [];
    const push = (v: number) => pts.push({ x: X(v), y: Y(Math.min(13.2, Math.max(0.6, f(v)))) });
    for (let v = 0; v < 23; v += 1) push(v);
    for (let v = 23; v <= 27; v += 0.25) push(v);
    for (let v = 28; v <= vMax; v += 1) push(v);
    return pts;
  };

  return (
    <Frame
      caption="Titration curves for 25 mL of 0.1 M acid with 0.1 M NaOH — a strong acid ends at pH 7, a weak acid at pH above 7 after a buffer region"
      viewBox="0 0 640 330"
    >
      {/* indicator bands */}
      <rect x={x0} y={Y(10)} width={w} height={Y(8.2) - Y(10)} fill={tint(magenta, 12)} />
      <text x={x0 + w + 8} y={Y(9.1) + 4} fontSize="10" fill={magenta}>phenolphthalein</text>
      <text x={x0 + w + 8} y={Y(9.1) + 17} fontSize="10" fill={magenta}>(8.2 – 10)</text>
      <rect x={x0} y={Y(4.4)} width={w} height={Y(3.1) - Y(4.4)} fill={tint(saffron, 14)} />
      <text x={x0 + w + 8} y={Y(3.75) + 4} fontSize="10" fill={saffron}>methyl orange</text>
      <text x={x0 + w + 8} y={Y(3.75) + 17} fontSize="10" fill={saffron}>(3.1 – 4.4)</text>

      <Axes x={x0} y={y0} w={w} h={h} xl="Volume of NaOH added (mL)" yl="pH" />
      {[0, 7, 14].map((p) => (
        <g key={p}>
          <line x1={x0 - 4} y1={Y(p)} x2={x0} y2={Y(p)} stroke={soft} strokeWidth="1.2" />
          <text x={x0 - 8} y={Y(p) + 4} textAnchor="end" fontSize="10.5" fill={soft}>{p}</text>
        </g>
      ))}
      <line x1={x0} y1={Y(7)} x2={x0 + w} y2={Y(7)} stroke={line} strokeWidth="1" strokeDasharray="4 4" />
      {[0, 25, 50].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={y0 + h} x2={X(v)} y2={y0 + h + 4} stroke={soft} strokeWidth="1.2" />
          <text x={X(v)} y={y0 + h + 15} textAnchor="middle" fontSize="10.5" fill={soft}>{v}</text>
        </g>
      ))}

      <polyline points={poly(sample(strong))} fill="none" stroke={cobalt} strokeWidth="2.6" strokeLinejoin="round" />
      <polyline points={poly(sample(weak))} fill="none" stroke={magenta} strokeWidth="2.6" strokeLinejoin="round" />

      {/* equivalence volume */}
      <line x1={X(25)} y1={y0} x2={X(25)} y2={y0 + h} stroke={line} strokeWidth="1.2" strokeDasharray="4 4" />
      <circle cx={X(25)} cy={Y(7)} r={5} fill={cobalt} />
      <circle cx={X(25)} cy={Y(weak(25))} r={5} fill={magenta} />
      <circle cx={X(12.5)} cy={Y(pKa)} r={5} fill={viridian} />

      <text x={X(25) + 9} y={Y(7) + 16} fontSize="10.5" fontWeight="700" fill={cobalt}>strong acid: pH 7</text>
      <text x={X(25) + 9} y={Y(weak(25)) - 8} fontSize="10.5" fontWeight="700" fill={magenta}>weak acid: pH ≈ 8.7</text>
      <text x={X(12.5) - 8} y={Y(pKa) + 22} textAnchor="end" fontSize="10.5" fontWeight="700" fill={viridian}>half-equivalence:</text>
      <text x={X(12.5) - 8} y={Y(pKa) + 35} textAnchor="end" fontSize="10.5" fontWeight="700" fill={viridian}>pH = pKₐ (4.74)</text>
      <text x={X(25) + 4} y={y0 - 6} textAnchor="middle" fontSize="10.5" fill={soft}>equivalence volume, 25 mL</text>

      <g transform="translate(120, 312)" fontSize="11">
        <line x1={0} y1={-4} x2={22} y2={-4} stroke={cobalt} strokeWidth="2.6" />
        <text x={30} y={0} fill={ink}>Strong acid + strong base</text>
        <line x1={190} y1={-4} x2={212} y2={-4} stroke={magenta} strokeWidth="2.6" />
        <text x={220} y={0} fill={ink}>Weak acid + strong base (buffer region before the jump)</text>
      </g>
    </Frame>
  );
};

/* ------------------------ Maxwell–Boltzmann curves ----------------------- */

export const MaxwellBoltzmann = () => {
  const x0 = 70;
  const y0 = 30;
  const w = 400;
  const h = 210;
  const eMax = 8;
  const X = (e: number) => x0 + (e / eMax) * w;
  const Y = (f: number) => y0 + h - f * 400;
  const f = (e: number, kT: number) => ((2 / Math.sqrt(Math.PI)) * Math.sqrt(e) * Math.pow(kT, -1.5)) * Math.exp(-e / kT);
  const Ea = 3.6;

  const curve = (kT: number, from = 0, to = eMax): Pt[] => {
    const pts: Pt[] = [];
    for (let e = from; e <= to + 1e-9; e += 0.1) pts.push({ x: X(e), y: Y(f(e, kT)) });
    return pts;
  };
  const tail = (kT: number): Pt[] => {
    const c = curve(kT, Ea);
    return [{ x: X(Ea), y: y0 + h }, ...c, { x: X(eMax), y: y0 + h }];
  };

  return (
    <Frame
      caption="Maxwell–Boltzmann distribution — raising the temperature flattens and shifts the curve, so many more molecules exceed the activation energy"
      viewBox="0 0 600 300"
    >
      <Axes x={x0} y={y0} w={w} h={h} xl="Kinetic energy of molecules" yl="Fraction of molecules" />

      <polygon points={poly(tail(1.0))} fill={tint(cobalt, 35)} />
      <polygon points={poly(tail(1.8))} fill={tint(crimson, 30)} />
      <polyline points={poly(curve(1.0))} fill="none" stroke={cobalt} strokeWidth="2.6" />
      <polyline points={poly(curve(1.8))} fill="none" stroke={crimson} strokeWidth="2.6" />

      <line x1={X(Ea)} y1={y0 - 4} x2={X(Ea)} y2={y0 + h} stroke={saffron} strokeWidth="2" strokeDasharray="5 4" />
      <text x={X(Ea)} y={y0 - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill={saffron}>Eₐ</text>

      <text x={X(0.9)} y={Y(f(0.5, 1.0)) - 8} fontSize="11.5" fontWeight="700" fill={cobalt}>Lower T</text>
      <text x={X(0.9)} y={Y(f(0.5, 1.0)) + 6} fontSize="10" fill={soft}>taller, narrower</text>
      <text x={X(4.7)} y={Y(f(2.6, 1.8)) - 10} fontSize="11.5" fontWeight="700" fill={crimson}>Higher T</text>
      <text x={X(4.7)} y={Y(f(2.6, 1.8)) + 4} fontSize="10" fill={soft}>lower, broader</text>

      <g transform="translate(486, 90)" fontSize="10.5" fill={soft}>
        <text x={0} y={0} fontWeight="700" fill={ink}>Shaded area =</text>
        <text x={0} y={14}>molecules with</text>
        <text x={0} y={28}>E ≥ Eₐ (able</text>
        <text x={0} y={42}>to react)</text>
        <text x={0} y={66} fill={crimson} fontWeight="600">Much larger at</text>
        <text x={0} y={80} fill={crimson} fontWeight="600">higher T</text>
      </g>
    </Frame>
  );
};

/* ----------------------- Mechanism energy profile ----------------------- */

export const MechanismEnergyDiagram = () => {
  const reactants = 196;
  const peak1 = 58;
  const dip = 136;
  const peak2 = 98;
  const products = 168;

  const level = (y: number, x1: number, x2: number, colour: string) => (
    <line x1={x1} y1={y} x2={x2} y2={y} stroke={colour} strokeWidth="1.2" strokeDasharray="4 4" />
  );

  return (
    <Frame
      caption="Energy profile of a two-step mechanism — the step with the higher activation energy is slow and rate-determining"
      viewBox="0 0 600 270"
    >
      <Axes x={50} y={24} w={510} h={216} xl="Reaction progress" yl="Energy" />

      {level(reactants, 70, 196, soft)}
      {level(dip, 190, 300, soft)}
      {level(products, 440, 520, soft)}
      {level(reactants, 200, 540, soft)}

      <path
        d="M70 196 L110 196 C 142 196, 150 58, 196 58 C 240 58, 242 136, 282 136 C 320 136, 330 98, 376 98 C 424 98, 424 168, 470 168 L 520 168"
        fill="none"
        stroke={cobalt}
        strokeWidth="3"
      />

      {/* Ea1 */}
      <line x1={96} y1={reactants} x2={96} y2={peak1} stroke={crimson} strokeWidth="1.6" />
      {arrowHead(96, peak1, -90, crimson, 7)}
      {arrowHead(96, reactants, 90, crimson, 7)}
      <text x={88} y={128} textAnchor="end" fontSize="12" fontWeight="700" fill={crimson}>Eₐ₁</text>
      <text x={88} y={142} textAnchor="end" fontSize="10" fill={crimson}>large</text>

      {/* Ea2 */}
      <line x1={330} y1={dip} x2={330} y2={peak2} stroke={viridian} strokeWidth="1.6" />
      {arrowHead(330, peak2, -90, viridian, 7)}
      {arrowHead(330, dip, 90, viridian, 7)}
      <text x={338} y={158} fontSize="12" fontWeight="700" fill={viridian}>Eₐ₂ (small)</text>

      {/* overall delta H */}
      <line x1={540} y1={reactants} x2={540} y2={products} stroke={magenta} strokeWidth="1.6" />
      {arrowHead(540, products, -90, magenta, 7)}
      <text x={556} y={214} textAnchor="end" fontSize="11" fontWeight="700" fill={magenta}>ΔH (overall) &gt; 0</text>

      <text x={196} y={44} textAnchor="middle" fontSize="11" fontWeight="700" fill={crimson}>Transition state 1</text>
      <text x={196} y={30} textAnchor="middle" fontSize="10.5" fill={crimson}>slow · rate-determining step</text>
      <text x={376} y={84} textAnchor="middle" fontSize="11" fontWeight="700" fill={viridian}>Transition state 2</text>
      <text x={376} y={70} textAnchor="middle" fontSize="10.5" fill={viridian}>fast step</text>
      <text x={282} y={156} textAnchor="middle" fontSize="11" fill={soft}>Intermediate</text>
      <text x={84} y={214} fontSize="11" fill={soft}>Reactants</text>
      <text x={482} y={160} fontSize="11" fill={soft}>Products</text>
    </Frame>
  );
};

/* --------------------------- Approach to equilibrium --------------------------- */

export const EquilibriumGraph = () => {
  const tau = 1;
  const tMax = 6;
  const panel = (ox: number, children: (X: (t: number) => number, Y: (v: number) => number) => ReactNode, yMax: number, yl: string) => {
    const w = 220;
    const h = 170;
    const X = (t: number) => ox + (t / tMax) * w;
    const Y = (v: number) => 56 + h - (v / yMax) * h;
    return (
      <g>
        <Axes x={ox} y={56} w={w} h={h} xl="Time" yl={yl} />
        <line x1={X(3.2)} y1={52} x2={X(3.2)} y2={56 + h} stroke={saffron} strokeWidth="1.5" strokeDasharray="5 4" />
        <text x={X(3.2)} y={46} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={saffron}>equilibrium reached</text>
        {children(X, Y)}
      </g>
    );
  };
  const pts = (fn: (t: number) => number, X: (t: number) => number, Y: (v: number) => number) => {
    const out: Pt[] = [];
    for (let t = 0; t <= tMax + 1e-9; t += 0.1) out.push({ x: X(t), y: Y(fn(t)) });
    return out;
  };

  return (
    <Frame
      caption="Approaching equilibrium for H₂ + I₂ ⇌ 2HI — concentrations level off exactly when the forward and reverse rates become equal"
      viewBox="0 0 600 290"
    >
      <text x={160} y={24} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>Concentrations</text>
      {panel(60, (X, Y) => (
        <g>
          <polyline points={poly(pts((t) => 0.213 + 0.787 * Math.exp(-t / tau), X, Y))} fill="none" stroke={cobalt} strokeWidth="2.6" />
          <polyline points={poly(pts((t) => 1.574 * (1 - Math.exp(-t / tau)), X, Y))} fill="none" stroke={crimson} strokeWidth="2.6" />
          <text x={X(5.9)} y={Y(1.574) - 6} textAnchor="end" fontSize="10.5" fontWeight="700" fill={crimson}>[HI] = 1.57 M</text>
          <text x={X(5.9)} y={Y(0.213) - 8} textAnchor="end" fontSize="10.5" fontWeight="700" fill={cobalt}>[H₂] = [I₂] = 0.21 M</text>
        </g>
      ), 1.8, "Concentration (M)")}

      <text x={440} y={24} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ink}>Reaction rates</text>
      {panel(340, (X, Y) => (
        <g>
          <polyline points={poly(pts((t) => 0.4 + 0.6 * Math.exp(-t / tau), X, Y))} fill="none" stroke={cobalt} strokeWidth="2.6" />
          <polyline points={poly(pts((t) => 0.4 * (1 - Math.exp(-t / tau)), X, Y))} fill="none" stroke={crimson} strokeWidth="2.6" />
          <text x={X(0.5)} y={Y(0.97)} fontSize="10.5" fontWeight="700" fill={cobalt}>forward rate falls</text>
          <text x={X(0.7)} y={Y(0.1)} fontSize="10.5" fontWeight="700" fill={crimson}>reverse rate rises</text>
          <text x={X(5.9)} y={Y(0.4) - 8} textAnchor="end" fontSize="10.5" fill={soft}>rates equal</text>
        </g>
      ), 1.05, "Rate")}
    </Frame>
  );
};

/* -------------------------------- Reaction order -------------------------------- */

export const ReactionOrderGraphs = () => {
  const cols = [
    { title: "Zero order", rate: "rate = k", half: "t½ = [A]₀ / 2k", colour: cobalt },
    { title: "First order", rate: "rate = k[A]", half: "t½ = 0.693 / k  (constant)", colour: viridian },
    { title: "Second order", rate: "rate = k[A]²", half: "t½ = 1 / k[A]₀", colour: magenta },
  ];
  const w = 150;
  const h = 70;

  const mini = (ox: number, oy: number, fn: (t: number) => number, yl: string, colour: string, slope: string) => {
    const pts: Pt[] = [];
    for (let t = 0; t <= 1.0001; t += 0.02) pts.push({ x: ox + t * w, y: oy + h - fn(t) * h });
    return (
      <g>
        <Axes x={ox} y={oy} w={w} h={h} />
        <text x={ox - 10} y={oy + h / 2} textAnchor="end" fontSize="10.5" fill={soft} transform={`rotate(-90, ${ox - 10}, ${oy + h / 2})`}>{yl}</text>
        <polyline points={poly(pts)} fill="none" stroke={colour} strokeWidth="2.6" />
        <text x={ox + w} y={oy + h + 14} textAnchor="end" fontSize="10.5" fill={soft}>time</text>
        {slope && <text x={ox + w - 4} y={slope.includes("+") ? oy + h - 8 : oy + 12} textAnchor="end" fontSize="11" fontWeight="700" fill={colour}>{slope}</text>}
      </g>
    );
  };

  return (
    <Frame
      caption="Concentration–time graphs by reaction order — plot the right quantity and the line goes straight, revealing the order and the rate constant k"
      viewBox="0 0 660 330"
    >
      {cols.map((c, i) => {
        const ox = 62 + i * 214;
        return (
          <g key={c.title}>
            <text x={ox + w / 2} y={20} textAnchor="middle" fontSize="13" fontWeight="700" fill={c.colour}>{c.title}</text>
            <text x={ox + w / 2} y={36} textAnchor="middle" fontSize="11" fill={ink}>{c.rate}</text>
            {i === 0 && mini(ox, 52, (t) => 1 - t * 0.9, "[A]", c.colour, "slope = −k")}
            {i === 1 && mini(ox, 52, (t) => Math.exp(-3 * t), "[A]", c.colour, "")}
            {i === 2 && mini(ox, 52, (t) => 1 / (1 + 7 * t), "[A]", c.colour, "")}

            <text x={ox + w / 2} y={160} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={soft}>Straight-line plot</text>
            {i === 0 && mini(ox, 178, (t) => 1 - t * 0.9, "[A]", c.colour, "slope = −k")}
            {i === 1 && mini(ox, 178, (t) => 1 - t * 0.9, "ln[A]", c.colour, "slope = −k")}
            {i === 2 && mini(ox, 178, (t) => 0.08 + t * 0.9, "1/[A]", c.colour, "slope = +k")}
            <text x={ox + w / 2} y={286} textAnchor="middle" fontSize="11" fill={soft}>{c.half}</text>
          </g>
        );
      })}
      <line x1={226} y1={44} x2={226} y2={270} stroke={line} strokeWidth="1" />
      <line x1={440} y1={44} x2={440} y2={270} stroke={line} strokeWidth="1" />
      <text x={330} y={316} textAnchor="middle" fontSize="11" fill={soft}>Top row: [A] against time · bottom row: the quantity that gives a straight line</text>
    </Frame>
  );
};

/* ---------------------------------- Gas laws ---------------------------------- */

export const GasLawGraphs = () => {
  const w = 160;
  const h = 130;
  const oy = 52;

  return (
    <Frame
      caption="The gas laws as graphs — Boyle (pressure falls as volume rises), Charles (volume rises with temperature) and Gay-Lussac (pressure rises with temperature)"
      viewBox="0 0 700 270"
    >
      {/* Boyle */}
      {(() => {
        const ox = 50;
        const curve = (k: number): Pt[] => {
          const pts: Pt[] = [];
          for (let v = 0.3; v <= 1.0001; v += 0.02) pts.push({ x: ox + v * w, y: oy + h - Math.min(1, k / v / 3.4) * h });
          return pts;
        };
        return (
          <g>
            <text x={ox + w / 2} y={22} textAnchor="middle" fontSize="13" fontWeight="700" fill={cobalt}>Boyle's law</text>
            <text x={ox + w / 2} y={38} textAnchor="middle" fontSize="11" fill={soft}>P ∝ 1/V at constant T</text>
            <Axes x={ox} y={oy} w={w} h={h} xl="Volume" yl="Pressure" />
            <polyline points={poly(curve(0.55))} fill="none" stroke={cobalt} strokeWidth="2.6" />
            <polyline points={poly(curve(1.0))} fill="none" stroke={crimson} strokeWidth="2.6" />
            <text x={ox + w + 4} y={oy + h - 34} fontSize="10.5" fontWeight="700" fill={crimson}>higher T</text>
            <text x={ox + w + 4} y={oy + h - 17} fontSize="10.5" fontWeight="700" fill={cobalt}>lower T</text>
          </g>
        );
      })()}

      {/* Charles */}
      {(() => {
        const ox = 276;
        const T = (c: number) => ox + ((c + 300) / 420) * w;
        const V = (v: number) => oy + h - v * h;
        return (
          <g>
            <text x={ox + w / 2} y={22} textAnchor="middle" fontSize="13" fontWeight="700" fill={viridian}>Charles's law</text>
            <text x={ox + w / 2} y={38} textAnchor="middle" fontSize="11" fill={soft}>V ∝ T at constant P</text>
            <Axes x={ox} y={oy} w={w} h={h} xl="Temperature (°C)" yl="Volume" />
            <line x1={T(-120)} y1={V(0.34)} x2={T(100)} y2={V(0.83)} stroke={viridian} strokeWidth="2.6" />
            <line x1={T(-273.15)} y1={V(0)} x2={T(-120)} y2={V(0.34)} stroke={viridian} strokeWidth="2.6" strokeDasharray="4 3" />
            <circle cx={T(-273.15)} cy={V(0)} r={4} fill={crimson} />
            <text x={T(-273.15) + 34} y={V(0) - 6} fontSize="10" fontWeight="700" fill={crimson}>absolute zero</text>
            <text x={T(-273.15)} y={V(0) + 14} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={crimson}>−273.15</text>
            <line x1={T(0)} y1={V(0)} x2={T(0)} y2={V(0) + 4} stroke={soft} strokeWidth="1.2" />
            <text x={T(0)} y={V(0) + 14} textAnchor="middle" fontSize="9.5" fill={soft}>0</text>
          </g>
        );
      })()}

      {/* Gay-Lussac */}
      {(() => {
        const ox = 502;
        return (
          <g>
            <text x={ox + w / 2} y={22} textAnchor="middle" fontSize="13" fontWeight="700" fill={magenta}>Gay-Lussac's law</text>
            <text x={ox + w / 2} y={38} textAnchor="middle" fontSize="11" fill={soft}>P ∝ T at constant V</text>
            <Axes x={ox} y={oy} w={w} h={h} xl="Temperature (K)" yl="Pressure" />
            <line x1={ox} y1={oy + h} x2={ox + w - 4} y2={oy + 8} stroke={magenta} strokeWidth="2.6" />
            <circle cx={ox} cy={oy + h} r={4} fill={crimson} />
            <text x={ox} y={oy + h + 14} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={crimson}>0</text>
          </g>
        );
      })()}
      <text x={350} y={258} textAnchor="middle" fontSize="11" fill={soft}>Combined: PV = nRT</text>
    </Frame>
  );
};

/* ------------------------------------ Osmosis ------------------------------------ */

export const Osmosis = () => {
  const solute = [
    [352, 140], [380, 130], [398, 160], [362, 178], [390, 196], [348, 200], [410, 130], [372, 150], [304, 232], [350, 246], [388, 246],
  ];
  const water = [
    [112, 184], [150, 172], [128, 200], [160, 196], [104, 160], [140, 228], [110, 248], [180, 250], [200, 238], [160, 160],
  ];

  return (
    <Frame
      caption="Osmosis — solvent moves through a semi-permeable membrane toward the more concentrated solution until the extra pressure of the raised column balances it"
      viewBox="0 0 600 330"
    >
      {/* liquids */}
      <path d="M92 150 H178 V212 H255 V270 H132 a40 40 0 0 1 -40 -40 Z" fill={tint(cobalt, 14)} />
      <path d="M418 108 H332 V212 H255 V270 H378 a40 40 0 0 0 40 -40 Z" fill={tint(saffron, 18)} />

      {water.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill={cobalt} />
      ))}
      {solute.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5} fill={saffron} stroke={card} strokeWidth="1" />
      ))}

      {/* tube */}
      <path d="M90 50 V230 a40 40 0 0 0 40 40 H380 a40 40 0 0 0 40 -40 V50" fill="none" stroke={line} strokeWidth="3" />
      <path d="M180 50 V212 H330 V50" fill="none" stroke={line} strokeWidth="3" />

      {/* membrane */}
      <line x1={255} y1={212} x2={255} y2={270} stroke={crimson} strokeWidth="3" strokeDasharray="4 3" />
      <line x1={226} y1={241} x2={282} y2={241} stroke={cobalt} strokeWidth="2" />
      {arrowHead(284, 241, 0, cobalt, 7)}
      <text x={255} y={292} textAnchor="middle" fontSize="11" fontWeight="700" fill={crimson}>semi-permeable membrane</text>
      <text x={255} y={306} textAnchor="middle" fontSize="10" fill={soft}>solvent passes, solute cannot</text>

      {/* level marks */}
      <line x1={92} y1={150} x2={64} y2={150} stroke={soft} strokeWidth="1" strokeDasharray="3 3" />
      <line x1={418} y1={108} x2={64} y2={108} stroke={soft} strokeWidth="1" strokeDasharray="3 3" />
      <line x1={70} y1={108} x2={70} y2={150} stroke={magenta} strokeWidth="1.6" />
      {arrowHead(70, 108, -90, magenta, 6)}
      {arrowHead(70, 150, 90, magenta, 6)}
      <text x={60} y={134} textAnchor="end" fontSize="12" fontWeight="700" fill={magenta}>h</text>

      <text x={135} y={34} textAnchor="middle" fontSize="12" fontWeight="700" fill={cobalt}>Pure solvent</text>
      <text x={375} y={34} textAnchor="middle" fontSize="12" fontWeight="700" fill={saffron}>Solution</text>
      <text x={375} y={48} textAnchor="middle" fontSize="10" fill={soft}>more concentrated</text>

      <g transform="translate(440, 76)" fontSize="11" fill={soft}>
        <text x={0} y={0} fontWeight="700" fill={ink}>Osmotic pressure</text>
        <text x={0} y={18}>π = CRT</text>
        <text x={0} y={36}>(h is proportional to π)</text>
        <text x={0} y={66} fontWeight="700" fill={ink}>Reverse osmosis</text>
        <text x={0} y={84}>pressure greater than π on</text>
        <text x={0} y={100}>the solution side pushes</text>
        <text x={0} y={116}>pure solvent out — used</text>
        <text x={0} y={132}>to desalinate sea water</text>
      </g>
    </Frame>
  );
};

export const physicalDiagrams: Record<string, () => JSX.Element> = {
  "galvanic-cell": GalvanicCell,
  "titration-curve": TitrationCurve,
  "maxwell-boltzmann": MaxwellBoltzmann,
  "mechanism-energy-diagram": MechanismEnergyDiagram,
  "equilibrium-graph": EquilibriumGraph,
  "reaction-order-graphs": ReactionOrderGraphs,
  "gas-law-graphs": GasLawGraphs,
  osmosis: Osmosis,
};
