import { Frame, ink, soft, line, arrowHead } from "./shared";

/* ------------------------------------------------------------------ *
 * Bonding and molecular-shape diagrams.
 * ------------------------------------------------------------------ */

const cobalt = "hsl(var(--cobalt))";
const viridian = "hsl(var(--viridian))";
const crimson = "hsl(var(--crimson))";
const saffron = "hsl(var(--saffron))";
const magenta = "hsl(var(--magenta))";
const bg = "hsl(var(--background))";
const card = "hsl(var(--card))";
const tint = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

interface Pt {
  x: number;
  y: number;
}

/* ---------------------------- VSEPR shapes ---------------------------- */

interface ShapeSpec {
  name: string;
  example: string;
  angle: string;
  /** Bonded atoms: position, and whether the bond is behind the page. */
  atoms: { x: number; y: number; back?: boolean }[];
  /** Lone-pair lobes. */
  lone?: { x: number; y: number; rot: number }[];
}

const SHAPES: ShapeSpec[] = [
  {
    name: "Linear",
    example: "BeCl₂",
    angle: "180°",
    atoms: [
      { x: -66, y: 0 },
      { x: 66, y: 0 },
    ],
  },
  {
    name: "Trigonal planar",
    example: "BF₃",
    angle: "120°",
    atoms: [
      { x: 0, y: -62 },
      { x: 54, y: 31 },
      { x: -54, y: 31 },
    ],
  },
  {
    name: "Tetrahedral",
    example: "CH₄",
    angle: "109.5°",
    atoms: [
      { x: 0, y: -62 },
      { x: -58, y: 44 },
      { x: 58, y: 44 },
      { x: 42, y: -26, back: true },
    ],
  },
  {
    name: "Trigonal pyramidal",
    example: "NH₃ (1 lone pair)",
    angle: "107°",
    atoms: [
      { x: -58, y: 44 },
      { x: 58, y: 44 },
      { x: 42, y: -26, back: true },
    ],
    lone: [{ x: -6, y: -42, rot: 90 }],
  },
  {
    name: "Bent",
    example: "H₂O (2 lone pairs)",
    angle: "104.5°",
    atoms: [
      { x: -47, y: 37 },
      { x: 47, y: 37 },
    ],
    lone: [
      { x: -32, y: -34, rot: -40 },
      { x: 32, y: -34, rot: 40 },
    ],
  },
  {
    name: "Octahedral",
    example: "SF₆",
    angle: "90°",
    atoms: [
      { x: 0, y: -64 },
      { x: 0, y: 64 },
      { x: -64, y: 0 },
      { x: 64, y: 0 },
      { x: -40, y: 40 },
      { x: 40, y: -40, back: true },
    ],
  },
];

export const VseprShapes = () => (
  <Frame
    caption="VSEPR shapes — electron pairs spread as far apart as possible, and lone pairs squeeze the bond angle"
    viewBox="0 0 690 482"
  >
    {SHAPES.map((sh, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const ox = 115 + col * 230;
      const oy = 84 + row * 232;
      return (
        <g key={sh.name} transform={`translate(${ox}, ${oy})`}>
          {sh.lone?.map((l, k) => (
            <ellipse
              key={k}
              cx={l.x}
              cy={l.y}
              rx={22}
              ry={11}
              transform={`rotate(${l.rot}, ${l.x}, ${l.y})`}
              fill={tint(crimson, 22)}
              stroke={crimson}
              strokeWidth="1.3"
              strokeDasharray="3 2"
            />
          ))}
          {sh.atoms.map((a, k) => (
            <line
              key={k}
              x1={0}
              y1={0}
              x2={a.x}
              y2={a.y}
              stroke={a.back ? soft : ink}
              strokeWidth={a.back ? 2 : 3}
              strokeDasharray={a.back ? "5 4" : undefined}
            />
          ))}
          {sh.atoms.map((a, k) => (
            <g key={`a${k}`}>
              <circle cx={a.x} cy={a.y} r={11} fill={card} />
              <circle cx={a.x} cy={a.y} r={11} fill={tint(saffron, a.back ? 14 : 30)} stroke={saffron} strokeWidth="1.5" strokeDasharray={a.back ? "3 2" : undefined} />
            </g>
          ))}
          <circle cx={0} cy={0} r={14} fill={cobalt} />
          <text x={0} y={92} textAnchor="middle" fontSize="13" fontWeight="700" fill={ink}>{sh.name}</text>
          <text x={0} y={109} textAnchor="middle" fontSize="11" fill={soft}>{sh.example}</text>
          <text x={0} y={125} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={cobalt}>{sh.angle}</text>
        </g>
      );
    })}
    <g transform="translate(22, 472)" fontSize="10.5" fill={soft}>
      <circle cx={5} cy={-4} r={5} fill={cobalt} />
      <text x={15} y={0}>central atom</text>
      <line x1={100} y1={-4} x2={124} y2={-4} stroke={soft} strokeWidth="2" strokeDasharray="5 4" />
      <text x={130} y={0}>bond behind the page</text>
      <ellipse cx={268} cy={-4} rx={9} ry={5} fill={tint(crimson, 22)} stroke={crimson} strokeWidth="1.2" strokeDasharray="3 2" />
      <text x={282} y={0}>lone pair</text>
    </g>
  </Frame>
);

/* ---------------------------- Hybridisation ---------------------------- */

export const Hybridisation = () => {
  const lobe = (cx: number, cy: number, angleDeg: number, colour: string, faded = false) => {
    const a = (angleDeg * Math.PI) / 180;
    const d = 30;
    const big = { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) };
    const small = { x: cx - 7 * Math.cos(a), y: cy - 7 * Math.sin(a) };
    return (
      <g opacity={faded ? 0.5 : 1}>
        <ellipse cx={big.x} cy={big.y} rx={31} ry={14} transform={`rotate(${angleDeg}, ${big.x}, ${big.y})`} fill={tint(colour, 38)} stroke={colour} strokeWidth="1.6" />
        <ellipse cx={small.x} cy={small.y} rx={9} ry={6} transform={`rotate(${angleDeg}, ${small.x}, ${small.y})`} fill={tint(colour, 20)} stroke={colour} strokeWidth="1.2" />
      </g>
    );
  };

  const panels = [
    { cx: 110, title: "sp", mix: "1 s + 1 p → 2 sp", shape: "Linear · 180°", ex: "BeCl₂, C₂H₂", angles: [0, 180], colour: cobalt },
    { cx: 330, title: "sp²", mix: "1 s + 2 p → 3 sp²", shape: "Trigonal planar · 120°", ex: "BF₃, C₂H₄", angles: [-90, 30, 150], colour: viridian },
    { cx: 550, title: "sp³", mix: "1 s + 3 p → 4 sp³", shape: "Tetrahedral · 109.5°", ex: "CH₄, NH₃, H₂O", angles: [-90, 150, 30, -30], colour: magenta },
  ];

  return (
    <Frame
      caption="Hybridisation — atomic orbitals mix into equal hybrid orbitals that point to the corners of a regular shape"
      viewBox="0 0 660 270"
    >
      {panels.map((p, i) => (
        <g key={p.title}>
          <text x={p.cx} y={24} textAnchor="middle" fontSize="16" fontWeight="700" fill={p.colour}>{p.title}</text>
          <text x={p.cx} y={42} textAnchor="middle" fontSize="11" fill={soft}>{p.mix}</text>
          {p.angles.map((a, k) => (
            <g key={k}>{lobe(p.cx, 112, a, p.colour, p.title === "sp³" && k === 3)}</g>
          ))}
          <circle cx={p.cx} cy={112} r={4.5} fill={ink} />
          <text x={p.cx} y={214} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={ink}>{p.shape}</text>
          <text x={p.cx} y={232} textAnchor="middle" fontSize="11" fill={soft}>{p.ex}</text>
          {i < panels.length - 1 && <line x1={p.cx + 110} y1={20} x2={p.cx + 110} y2={250} stroke={line} strokeWidth="1" />}
        </g>
      ))}
    </Frame>
  );
};

/* ---------------------------- Sigma and pi ----------------------------- */

export const SigmaPiBonds = () => (
  <Frame
    caption="Sigma bonds overlap head-on along the bond axis; pi bonds overlap sideways, above and below the axis"
    viewBox="0 0 640 290"
  >
    {/* sigma */}
    <text x={160} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill={cobalt}>σ (sigma) bond</text>
    <line x1={20} y1={130} x2={300} y2={130} stroke={line} strokeWidth="1" strokeDasharray="3 3" />
    <ellipse cx={116} cy={130} rx={52} ry={26} fill={tint(cobalt, 32)} stroke={cobalt} strokeWidth="1.8" />
    <ellipse cx={204} cy={130} rx={52} ry={26} fill={tint(crimson, 32)} stroke={crimson} strokeWidth="1.8" />
    <ellipse cx={176} cy={130} rx={14} ry={20} fill={tint(magenta, 24)} />
    <circle cx={102} cy={130} r={4} fill={ink} />
    <circle cx={218} cy={130} r={4} fill={ink} />
    <text x={160} y={196} textAnchor="middle" fontSize="12" fontWeight="600" fill={ink}>Head-on (end-to-end) overlap</text>
    <text x={160} y={214} textAnchor="middle" fontSize="11" fill={soft}>electron density lies along the bond axis</text>
    <text x={160} y={232} textAnchor="middle" fontSize="11" fill={soft}>strong · atoms can rotate around it</text>

    <line x1={320} y1={20} x2={320} y2={270} stroke={line} strokeWidth="1" />

    {/* pi */}
    <text x={480} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill={viridian}>π (pi) bond</text>
    <line x1={350} y1={150} x2={610} y2={150} stroke={line} strokeWidth="1" strokeDasharray="3 3" />
    {[
      { x: 452, c: cobalt },
      { x: 508, c: crimson },
    ].map((a) => (
      <g key={a.x}>
        <ellipse cx={a.x} cy={104} rx={28} ry={32} fill={tint(a.c, 30)} stroke={a.c} strokeWidth="1.8" />
        <ellipse cx={a.x} cy={196} rx={28} ry={32} fill={tint(a.c, 30)} stroke={a.c} strokeWidth="1.8" />
        <circle cx={a.x} cy={150} r={4} fill={ink} />
      </g>
    ))}
    <ellipse cx={480} cy={104} rx={14} ry={24} fill={tint(magenta, 26)} />
    <ellipse cx={480} cy={196} rx={14} ry={24} fill={tint(magenta, 26)} />
    <text x={480} y={246} textAnchor="middle" fontSize="12" fontWeight="600" fill={ink}>Sideways overlap of parallel p orbitals</text>
    <text x={480} y={264} textAnchor="middle" fontSize="11" fill={soft}>electron density above and below the axis</text>
    <text x={480} y={280} textAnchor="middle" fontSize="11" fill={soft}>weaker · blocks rotation</text>
  </Frame>
);

/* ----------------------------- NaCl lattice ----------------------------- */

export const NaClLattice = () => {
  const s = 60;
  const ox = 60;
  const oy = 262;
  const proj = (x: number, y: number, z: number): Pt => ({ x: ox + s * (x + 0.42 * y), y: oy - s * (z + 0.3 * y) });

  const ions: { x: number; y: number; z: number }[] = [];
  for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 3; z++) ions.push({ x, y, z });
  ions.sort((a, b) => b.y - a.y || a.z - b.z || a.x - b.x);

  const links: [Pt, Pt][] = [];
  for (const a of ions) {
    for (const [dx, dy, dz] of [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) {
      const bx = a.x + dx;
      const by = a.y + dy;
      const bz = a.z + dz;
      if (bx < 3 && by < 3 && bz < 3) links.push([proj(a.x, a.y, a.z), proj(bx, by, bz)]);
    }
  }

  return (
    <Frame
      caption="Sodium chloride crystal — every Na⁺ is surrounded by six Cl⁻ and every Cl⁻ by six Na⁺, so the ions lock into a rigid lattice"
      viewBox="0 0 680 330"
    >
      {links.map(([p, q], i) => (
        <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={line} strokeWidth="2" />
      ))}
      {ions.map((n, i) => {
        const p = proj(n.x, n.y, n.z);
        const isNa = (n.x + n.y + n.z) % 2 === 0;
        return isNa ? (
          <circle key={i} cx={p.x} cy={p.y} r={6.5} fill={cobalt} />
        ) : (
          <circle key={i} cx={p.x} cy={p.y} r={10.5} fill={tint(viridian, 55)} stroke={viridian} strokeWidth="1.4" />
        );
      })}

      <g transform="translate(360, 60)">
        <circle cx={8} cy={0} r={7} fill={cobalt} />
        <text x={26} y={4} fontSize="12.5" fill={ink}><tspan fontWeight="700">Na⁺</tspan> — smaller ion</text>
        <circle cx={8} cy={30} r={11.5} fill={tint(viridian, 55)} stroke={viridian} strokeWidth="1.4" />
        <text x={26} y={34} fontSize="12.5" fill={ink}><tspan fontWeight="700">Cl⁻</tspan> — larger ion</text>

        <text x={0} y={80} fontSize="11.5" fill={soft}>• Coordination number 6 for both ions</text>
        <text x={0} y={100} fontSize="11.5" fill={soft}>• Strong electrostatic forces in every direction</text>
        <text x={0} y={120} fontSize="11.5" fill={soft}>• High melting point (801 °C), hard but brittle</text>
        <text x={0} y={140} fontSize="11.5" fill={soft}>• Conducts only when molten or dissolved,</text>
        <text x={0} y={156} fontSize="11.5" fill={soft}>  when the ions are free to move</text>
      </g>
    </Frame>
  );
};

/* --------------------------- Hydrogen bonding --------------------------- */

export const HydrogenBonding = () => {
  const bondLen = 38;
  const half = (52.25 * Math.PI) / 180;
  const rad = (d: number) => (d * Math.PI) / 180;

  const water = (cx: number, cy: number, bisectorDeg: number) => {
    const b = rad(bisectorDeg);
    return {
      o: { x: cx, y: cy },
      h1: { x: cx + bondLen * Math.cos(b + half), y: cy + bondLen * Math.sin(b + half) },
      h2: { x: cx + bondLen * Math.cos(b - half), y: cy + bondLen * Math.sin(b - half) },
    };
  };

  const A = { x: 110, y: 86 };
  const B = { x: 262, y: 170 };
  const C = { x: 414, y: 86 };
  const ang = (p: Pt, q: Pt) => (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
  const molA = water(A.x, A.y, ang(A, B) - 52.25);
  const molB = water(B.x, B.y, ang(B, C) - 52.25);
  const molC = water(C.x, C.y, 35);

  const hb = (h: Pt, o: Pt) => {
    const d = Math.hypot(o.x - h.x, o.y - h.y);
    const t = (d - 17) / d;
    return { x: h.x + (o.x - h.x) * t, y: h.y + (o.y - h.y) * t };
  };

  const mol = (m: ReturnType<typeof water>, key: string) => (
    <g key={key}>
      <line x1={m.o.x} y1={m.o.y} x2={m.h1.x} y2={m.h1.y} stroke={ink} strokeWidth="2.6" />
      <line x1={m.o.x} y1={m.o.y} x2={m.h2.x} y2={m.h2.y} stroke={ink} strokeWidth="2.6" />
      <circle cx={m.h1.x} cy={m.h1.y} r={9} fill={card} />
      <circle cx={m.h1.x} cy={m.h1.y} r={9} fill={tint(cobalt, 20)} stroke={cobalt} strokeWidth="1.5" />
      <circle cx={m.h2.x} cy={m.h2.y} r={9} fill={card} />
      <circle cx={m.h2.x} cy={m.h2.y} r={9} fill={tint(cobalt, 20)} stroke={cobalt} strokeWidth="1.5" />
      <circle cx={m.o.x} cy={m.o.y} r={15} fill={tint(crimson, 55)} stroke={crimson} strokeWidth="1.6" />
      <text x={m.o.x} y={m.o.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={ink}>O</text>
      <text x={m.h1.x} y={m.h1.y + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" fill={ink}>H</text>
      <text x={m.h2.x} y={m.h2.y + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" fill={ink}>H</text>
    </g>
  );

  const bonds: [Pt, Pt][] = [
    [molA.h1, molB.o],
    [molB.h1, molC.o],
  ];

  return (
    <Frame
      caption="Hydrogen bonds in water — the δ+ hydrogen of one molecule is attracted to the δ− oxygen of its neighbour"
      viewBox="0 0 540 290"
    >
      {bonds.map(([h, o], i) => {
        const end = hb(h, o);
        return (
          <g key={i}>
            <line x1={h.x} y1={h.y} x2={end.x} y2={end.y} stroke={magenta} strokeWidth="2.2" strokeDasharray="5 4" />
          </g>
        );
      })}
      {mol(molA, "a")}
      {mol(molB, "b")}
      {mol(molC, "c")}

      <text x={molA.o.x - 4} y={molA.o.y - 24} textAnchor="middle" fontSize="11" fill={crimson} fontWeight="700">δ−</text>
      <text x={molB.o.x + 4} y={molB.o.y + 34} textAnchor="middle" fontSize="11" fill={crimson} fontWeight="700">δ−</text>
      <text x={molC.o.x} y={molC.o.y - 24} textAnchor="middle" fontSize="11" fill={crimson} fontWeight="700">δ−</text>
      <text x={molA.h1.x + 4} y={molA.h1.y + 22} textAnchor="middle" fontSize="11" fill={cobalt} fontWeight="700">δ+</text>
      <text x={molB.h1.x + 6} y={molB.h1.y - 14} textAnchor="middle" fontSize="11" fill={cobalt} fontWeight="700">δ+</text>

      <text x={200} y={110} textAnchor="middle" fontSize="11" fontWeight="600" fill={magenta}>hydrogen bond</text>

      <g transform="translate(24, 252)" fontSize="11" fill={soft}>
        <line x1={0} y1={-4} x2={26} y2={-4} stroke={ink} strokeWidth="2.6" />
        <text x={34} y={0}>covalent O–H bond (≈ 463 kJ/mol)</text>
        <line x1={238} y1={-4} x2={264} y2={-4} stroke={magenta} strokeWidth="2.2" strokeDasharray="5 4" />
        <text x={272} y={0}>hydrogen bond (≈ 20 kJ/mol)</text>
      </g>
      <text x={270} y={278} textAnchor="middle" fontSize="10.5" fill={soft}>
        Many such bonds make water's boiling point unusually high for its size
      </text>
    </Frame>
  );
};

/* ------------------- Octahedral complex + crystal field ------------------- */

export const OctahedralComplex = () => {
  const lig = [
    { x: 0, y: -84, back: false },
    { x: 0, y: 84, back: false },
    { x: -92, y: 0, back: false },
    { x: 92, y: 0, back: false },
    { x: -56, y: 56, back: false },
    { x: 56, y: -56, back: true },
  ];

  return (
    <Frame
      caption="An octahedral complex, [Co(NH₃)₆]³⁺ — six ligands each donate a lone pair to the central metal ion"
      viewBox="0 0 600 300"
    >
      <g transform="translate(170, 142)">
        {lig.map((l, i) => {
          const len = Math.hypot(l.x, l.y);
          const ux = l.x / len;
          const uy = l.y / len;
          const sx = l.x - ux * 22;
          const sy = l.y - uy * 22;
          const ex = ux * 24;
          const ey = uy * 24;
          return (
            <g key={i}>
              <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={l.back ? soft : ink} strokeWidth={l.back ? 2 : 2.6} strokeDasharray={l.back ? "5 4" : undefined} />
              {arrowHead(ex, ey, (Math.atan2(-uy, -ux) * 180) / Math.PI, l.back ? soft : ink, 8)}
            </g>
          );
        })}
        {lig.map((l, i) => (
          <g key={`n${i}`}>
            <circle cx={l.x} cy={l.y} r={20} fill={card} />
            <circle cx={l.x} cy={l.y} r={20} fill={tint(saffron, l.back ? 14 : 30)} stroke={saffron} strokeWidth="1.5" strokeDasharray={l.back ? "3 2" : undefined} />
            <text x={l.x} y={l.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={ink}>NH₃</text>
          </g>
        ))}
        <circle cx={0} cy={0} r={22} fill={cobalt} />
        <text x={0} y={5} textAnchor="middle" fontSize="12" fontWeight="700" fill={bg}>Co³⁺</text>
      </g>

      <g transform="translate(340, 64)" fontSize="12" fill={ink}>
        <text x={0} y={0} fontWeight="700" fill={cobalt}>Terms in this complex</text>
        <text x={0} y={26}><tspan fontWeight="700">Central ion:</tspan> Co³⁺ (accepts electron pairs)</text>
        <text x={0} y={48}><tspan fontWeight="700">Ligands:</tspan> six NH₃ (donate lone pairs)</text>
        <text x={0} y={70}><tspan fontWeight="700">Coordination number:</tspan> 6</text>
        <text x={0} y={92}><tspan fontWeight="700">Geometry:</tspan> octahedral, 90° between ligands</text>
        <text x={0} y={114}><tspan fontWeight="700">Charge:</tspan> +3 (ammonia is neutral)</text>
        <text x={0} y={150} fontSize="11" fill={soft}>Arrows run from ligand to metal:</text>
        <text x={0} y={166} fontSize="11" fill={soft}>a coordinate (dative) bond, where the ligand</text>
        <text x={0} y={182} fontSize="11" fill={soft}>supplies both electrons of the shared pair.</text>
      </g>
    </Frame>
  );
};

export const CrystalFieldSplitting = () => {
  const lv = (x: number, y: number, c: string) => <line x1={x} y1={y} x2={x + 40} y2={y} stroke={c} strokeWidth="3" strokeLinecap="round" />;

  return (
    <Frame
      caption="Crystal field splitting in an octahedral complex — the d orbitals split into a lower t₂g set and a higher e_g set"
      viewBox="0 0 720 300"
    >
      <line x1={50} y1={30} x2={50} y2={270} stroke={line} strokeWidth="1.5" />
      {arrowHead(50, 26, -90, soft, 7)}
      <text x={26} y={150} textAnchor="middle" fontSize="12" fill={soft} transform="rotate(-90, 26, 150)">Energy</text>

      {/* free ion */}
      <text x={110} y={52} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={ink}>Free metal ion</text>
      <text x={110} y={67} textAnchor="middle" fontSize="10" fill={soft}>5 equal d orbitals</text>
      <line x1={72} y1={150} x2={112} y2={150} stroke={soft} strokeWidth="3" strokeLinecap="round" />
      <line x1={72} y1={140} x2={112} y2={140} stroke={soft} strokeWidth="3" strokeLinecap="round" />
      <line x1={72} y1={130} x2={112} y2={130} stroke={soft} strokeWidth="3" strokeLinecap="round" />
      <line x1={72} y1={120} x2={112} y2={120} stroke={soft} strokeWidth="3" strokeLinecap="round" />
      <line x1={72} y1={110} x2={112} y2={110} stroke={soft} strokeWidth="3" strokeLinecap="round" />

      {/* connectors */}
      <line x1={114} y1={130} x2={226} y2={92} stroke={line} strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1={114} y1={130} x2={226} y2={196} stroke={line} strokeWidth="1.2" strokeDasharray="4 3" />

      {/* split */}
      <text x={290} y={52} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={ink}>In an octahedral field</text>
      <text x={290} y={67} textAnchor="middle" fontSize="10" fill={soft}>ligands approach along the axes</text>

      {lv(228, 92, crimson)}
      {lv(278, 92, crimson)}
      <text x={338} y={96} fontSize="12" fontWeight="700" fill={crimson}>e<tspan dy="3" fontSize="9">g</tspan><tspan dy="-3">  (2 orbitals, higher)</tspan></text>

      {lv(228, 196, cobalt)}
      {lv(278, 196, cobalt)}
      {lv(328, 196, cobalt)}
      <text x={378} y={200} fontSize="12" fontWeight="700" fill={cobalt}>t<tspan dy="3" fontSize="9">2g</tspan><tspan dy="-3">  (3 orbitals, lower)</tspan></text>

      {/* delta o */}
      <line x1={218} y1={96} x2={218} y2={192} stroke={magenta} strokeWidth="1.8" />
      {arrowHead(218, 94, -90, magenta, 7)}
      {arrowHead(218, 194, 90, magenta, 7)}
      <text x={210} y={148} textAnchor="end" fontSize="13" fontWeight="700" fill={magenta}>Δ₀</text>

      {/* d-d transition */}
      <path d="M298 190 C 312 160, 312 130, 298 100" fill="none" stroke={saffron} strokeWidth="2" strokeDasharray="4 3" />
      {arrowHead(298, 98, -80, saffron, 8)}
      <text x={500} y={120} fontSize="11" fill={saffron} fontWeight="700">d–d transition:</text>
      <text x={500} y={136} fontSize="10.5" fill={soft}>an electron absorbs visible light</text>
      <text x={500} y={150} fontSize="10.5" fill={soft}>of energy Δ₀ and jumps up — the</text>
      <text x={500} y={164} fontSize="10.5" fill={soft}>complementary colour is seen</text>

      <text x={360} y={250} textAnchor="middle" fontSize="11" fill={soft}>
        Strong-field ligands (CN⁻, CO) → large Δ₀ → electrons pair up (low spin)
      </text>
      <text x={360} y={268} textAnchor="middle" fontSize="11" fill={soft}>
        Weak-field ligands (I⁻, Cl⁻, H₂O) → small Δ₀ → electrons spread out (high spin)
      </text>
    </Frame>
  );
};

export const bondingDiagrams: Record<string, () => JSX.Element> = {
  "vsepr-shapes": VseprShapes,
  hybridisation: Hybridisation,
  "sigma-pi-bonds": SigmaPiBonds,
  "nacl-lattice": NaClLattice,
  "hydrogen-bonding": HydrogenBonding,
  "octahedral-complex": OctahedralComplex,
  "crystal-field-splitting": CrystalFieldSplitting,
};
