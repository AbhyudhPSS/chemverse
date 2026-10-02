import { Frame, ink, soft, line, arrowHead } from "./shared";

/* ------------------------------------------------------------------ *
 * Biomolecule diagrams: the DNA double helix and protein structure.
 * Helices are drawn from their parametric equations (x = r·cos t, with
 * depth = sin t) so the over-and-under crossings are geometrically right.
 * ------------------------------------------------------------------ */

const cobalt = "hsl(var(--cobalt))";
const viridian = "hsl(var(--viridian))";
const crimson = "hsl(var(--crimson))";
const saffron = "hsl(var(--saffron))";
const magenta = "hsl(var(--magenta))";
const iris = "hsl(var(--iris))";
const card = "hsl(var(--card))";
const tint = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

interface Pt {
  x: number;
  y: number;
}
interface Seg {
  pts: Pt[];
  front: boolean;
}

const poly = (pts: Pt[]) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

/** One strand of a helix with a vertical axis, split into front and back runs. */
const helixStrand = (cx: number, y0: number, y1: number, r: number, pitch: number, phase: number): Seg[] => {
  const segs: Seg[] = [];
  let cur: Seg | null = null;
  for (let y = y0; y <= y1 + 1e-9; y += 2) {
    const t = ((y - y0) / pitch) * 2 * Math.PI + phase;
    const p = { x: cx + r * Math.cos(t), y };
    const front = Math.sin(t) > 0;
    if (!cur || cur.front !== front) {
      const prev: Pt | undefined = cur?.pts[cur.pts.length - 1];
      cur = { pts: prev ? [prev, p] : [p], front };
      segs.push(cur);
    } else {
      cur.pts.push(p);
    }
  }
  return segs;
};

const baseColour: Record<string, string> = { A: crimson, T: cobalt, G: viridian, C: saffron };
const partner: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };

/* ------------------------------ DNA double helix ------------------------------ */

export const DnaDoubleHelix = () => {
  const cx = 150;
  const y0 = 64;
  const y1 = 372;
  const r = 46;
  const pitch = 130;
  const sequence = "AGTCATTGCAGCTAGTCGAATCCG";

  const strands = [0, Math.PI].map((phase) => helixStrand(cx, y0, y1, r, pitch, phase));
  const back = strands.flatMap((s, si) => s.filter((g) => !g.front).map((g, k) => ({ g, si, k })));
  const front = strands.flatMap((s, si) => s.filter((g) => g.front).map((g, k) => ({ g, si, k })));
  const strandColour = [magenta, iris];

  const rungs: JSX.Element[] = [];
  for (let k = 0; k * 13 + y0 <= y1; k++) {
    const y = y0 + k * 13;
    const t = ((y - y0) / pitch) * 2 * Math.PI;
    const c = Math.cos(t);
    if (Math.abs(c) < 0.3) continue;
    const base = sequence[k % sequence.length];
    const xa = cx + r * c;
    const xb = cx - r * c;
    const mid = (xa + xb) / 2;
    rungs.push(
      <g key={k} strokeWidth="3.4" strokeLinecap="round">
        <line x1={xa} y1={y} x2={mid} y2={y} stroke={baseColour[base]} />
        <line x1={mid} y1={y} x2={xb} y2={y} stroke={baseColour[partner[base]]} />
      </g>,
    );
  }

  const endX = (phase: number, y: number) => cx + r * Math.cos(((y - y0) / pitch) * 2 * Math.PI + phase);

  // Right-hand panel: one A–T and one G–C pair with their sugar–phosphate backbone.
  const pairY = [112, 212];
  const pairs: [string, string][] = [["A", "T"], ["G", "C"]];

  return (
    <Frame
      caption="The DNA double helix — two antiparallel sugar–phosphate backbones held together by hydrogen bonds between A–T and G–C base pairs"
      viewBox="0 0 760 410"
    >
      {/* Helix */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {back.map(({ g, si, k }) => (
          <polyline key={`b${si}${k}`} points={poly(g.pts)} stroke={tint(strandColour[si], 40)} strokeWidth="5" />
        ))}
      </g>
      {rungs}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {front.map(({ g, si, k }) => (
          <polyline key={`f${si}${k}`} points={poly(g.pts)} stroke={strandColour[si]} strokeWidth="6" />
        ))}
      </g>

      <text x={endX(0, y0)} y={y0 - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill={magenta}>5′</text>
      <text x={endX(Math.PI, y0)} y={y0 - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill={iris}>3′</text>
      <text x={endX(0, y1)} y={y1 + 18} textAnchor="middle" fontSize="12" fontWeight="700" fill={magenta}>3′</text>
      <text x={endX(Math.PI, y1)} y={y1 + 18} textAnchor="middle" fontSize="12" fontWeight="700" fill={iris}>5′</text>

      {/* Pitch bracket */}
      <g stroke={soft} strokeWidth="1.2" fill="none">
        <line x1={62} y1={y0} x2={62} y2={y0 + pitch} />
        <line x1={56} y1={y0} x2={68} y2={y0} />
        <line x1={56} y1={y0 + pitch} x2={68} y2={y0 + pitch} />
      </g>
      <text x={52} y={y0 + pitch / 2 - 6} textAnchor="end" fontSize="10.5" fontWeight="700" fill={ink}>3.4 nm</text>
      <text x={52} y={y0 + pitch / 2 + 7} textAnchor="end" fontSize="10" fill={soft}>1 turn</text>
      <text x={52} y={y0 + pitch / 2 + 19} textAnchor="end" fontSize="10" fill={soft}>10 bp</text>

      {/* Helix callouts */}
      <g fontSize="11">
        <line x1={cx + r + 8} y1={y0 + 40} x2={cx + r + 34} y2={y0 + 40} stroke={soft} strokeWidth="1" />
        <text x={cx + r + 38} y={y0 + 44} fill={ink} fontWeight="700">sugar–phosphate</text>
        <text x={cx + r + 38} y={y0 + 57} fill={ink} fontWeight="700">backbone</text>
        <line x1={cx + 4} y1={y0 + 143} x2={cx + r + 34} y2={y0 + 143} stroke={soft} strokeWidth="1" />
        <text x={cx + r + 38} y={y0 + 140} fill={ink} fontWeight="700">base pairs</text>
        <text x={cx + r + 38} y={y0 + 153} fill={soft} fontSize="10">joined by H-bonds</text>
        <text x={cx + r + 38} y={y0 + 232} fill={soft} fontSize="10">diameter ≈ 2 nm</text>
      </g>

      {/* Base-pair detail */}
      <g transform="translate(60, 0)">
        <text x={380} y={34} textAnchor="middle" fontSize="13" fontWeight="700" fill={ink}>Base pairing in detail</text>
        {/* backbones */}
        <line x1={312} y1={58} x2={312} y2={268} stroke={magenta} strokeWidth="3.5" />
        <line x1={508} y1={58} x2={508} y2={268} stroke={iris} strokeWidth="3.5" />
        <text x={312} y={52} textAnchor="middle" fontSize="11" fontWeight="700" fill={magenta}>5′</text>
        <text x={508} y={52} textAnchor="middle" fontSize="11" fontWeight="700" fill={iris}>3′</text>
        <text x={312} y={284} textAnchor="middle" fontSize="11" fontWeight="700" fill={magenta}>3′</text>
        <text x={508} y={284} textAnchor="middle" fontSize="11" fontWeight="700" fill={iris}>5′</text>

        {[78, 162, 246].map((y) => (
          <g key={y}>
            <circle cx={312} cy={y} r={9} fill={card} stroke={magenta} strokeWidth="1.8" />
            <text x={312} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill={magenta}>P</text>
            <circle cx={508} cy={y} r={9} fill={card} stroke={iris} strokeWidth="1.8" />
            <text x={508} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill={iris}>P</text>
          </g>
        ))}

        {pairs.map(([a, b], i) => {
          const y = pairY[i];
          const bonds = i === 0 ? 2 : 3;
          const gap = 12;
          const first = y - ((bonds - 1) * gap) / 2;
          return (
            <g key={a + b}>
              {/* sugars */}
              <polygon points={`312,${y - 12} 323,${y - 4} 319,${y + 9} 305,${y + 9} 301,${y - 4}`} fill={card} stroke={magenta} strokeWidth="1.8" />
              <text x={312} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={magenta}>S</text>
              <polygon points={`508,${y - 12} 519,${y - 4} 515,${y + 9} 501,${y + 9} 497,${y - 4}`} fill={card} stroke={iris} strokeWidth="1.8" />
              <text x={508} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={iris}>S</text>
              <line x1={323} y1={y} x2={346} y2={y} stroke={soft} strokeWidth="2" />
              <line x1={497} y1={y} x2={474} y2={y} stroke={soft} strokeWidth="2" />
              {/* bases */}
              <rect x={346} y={y - 20} width={46} height={40} rx="6" fill={tint(baseColour[a], 22)} stroke={baseColour[a]} strokeWidth="1.8" />
              <text x={369} y={y + 7} textAnchor="middle" fontSize="19" fontWeight="700" fill={baseColour[a]}>{a}</text>
              <rect x={428} y={y - 20} width={46} height={40} rx="6" fill={tint(baseColour[b], 22)} stroke={baseColour[b]} strokeWidth="1.8" />
              <text x={451} y={y + 7} textAnchor="middle" fontSize="19" fontWeight="700" fill={baseColour[b]}>{b}</text>
              {Array.from({ length: bonds }, (_, k) => (
                <line key={k} x1={394} y1={first + k * gap} x2={426} y2={first + k * gap} stroke={ink} strokeWidth="1.8" strokeDasharray="3 3" />
              ))}
              <text x={410} y={y + 36} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={ink}>{bonds} H-bonds</text>
            </g>
          );
        })}

        <text x={312} y={312} textAnchor="middle" fontSize="10" fill={soft}>P = phosphate</text>
        <text x={508} y={312} textAnchor="middle" fontSize="10" fill={soft}>S = deoxyribose sugar</text>
      </g>

      {/* Facts */}
      <g fontSize="11" fill={soft}>
        <text x={366} y={346}>• Purines A, G pair with pyrimidines T, C — so [A] = [T] and [G] = [C]</text>
        <text x={366} y={362}>• The two strands run antiparallel (5′→3′ against 3′→5′)</text>
        <text x={366} y={378}>• RNA: ribose sugar, uracil (U) replaces thymine, usually single-stranded</text>
      </g>
      <line x1={344} y1={332} x2={744} y2={332} stroke={line} strokeWidth="1" />
    </Frame>
  );
};

/* ---------------------------- Protein structure ---------------------------- */

export const ProteinStructure = () => {
  const colX = (i: number) => 95 + i * 190;
  const beadColours = [cobalt, crimson, viridian, saffron, magenta, iris, cobalt];

  // Primary
  const primary = (() => {
    const cx = colX(0);
    const pts = beadColours.map((_, k) => ({ x: cx - 63 + k * 21, y: 128 + (k % 2 ? 12 : -12) }));
    return (
      <g>
        <polyline points={poly(pts)} fill="none" stroke={soft} strokeWidth="2.4" />
        {pts.map((p, k) => (
          <circle key={k} cx={p.x} cy={p.y} r={8.5} fill={beadColours[k]} stroke={card} strokeWidth="1.5" />
        ))}
        <text x={pts[0].x - 17} y={pts[0].y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={ink}>N</text>
        <text x={pts[6].x + 16} y={pts[6].y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={ink}>C</text>
        <line x1={(pts[2].x + pts[3].x) / 2} y1={(pts[2].y + pts[3].y) / 2 + 2} x2={(pts[2].x + pts[3].x) / 2} y2={176} stroke={ink} strokeWidth="1" />
        <text x={cx} y={190} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={ink}>peptide bond</text>
        <text x={cx} y={203} textAnchor="middle" fontSize="10" fill={soft}>–CO–NH–</text>
        <text x={cx} y={76} textAnchor="middle" fontSize="10" fill={soft}>each bead = one amino acid</text>
      </g>
    );
  })();

  // Secondary: α-helix and β-sheet
  const secondary = (() => {
    const cx = colX(1);
    const hx = cx - 42;
    const segs = helixStrand(hx, 76, 206, 17, 26, 0.6);
    const sx = cx + 10;
    const rows = [104, 130, 156];
    return (
      <g>
        {segs.filter((s) => !s.front).map((s, k) => (
          <polyline key={`b${k}`} points={poly(s.pts)} fill="none" stroke={tint(cobalt, 35)} strokeWidth="4.5" strokeLinecap="round" />
        ))}
        {segs.filter((s) => s.front).map((s, k) => (
          <polyline key={`f${k}`} points={poly(s.pts)} fill="none" stroke={cobalt} strokeWidth="5" strokeLinecap="round" />
        ))}
        <text x={hx} y={226} textAnchor="middle" fontSize="11" fontWeight="700" fill={cobalt}>α-helix</text>

        {rows.map((y, i) => {
          const rightward = i % 2 === 0;
          const x1 = rightward ? sx : sx + 80;
          const x2 = rightward ? sx + 80 : sx;
          const dir = rightward ? 0 : 180;
          return (
            <g key={y}>
              <line x1={x1} y1={y} x2={x2 + (rightward ? -6 : 6)} y2={y} stroke={crimson} strokeWidth="5" strokeLinecap="round" />
              {arrowHead(x2 + (rightward ? 4 : -4), y, dir, crimson, 12)}
            </g>
          );
        })}
        {[0, 1].map((i) =>
          [sx + 18, sx + 40, sx + 62].map((x) => (
            <line key={`${i}${x}`} x1={x} y1={rows[i] + 5} x2={x} y2={rows[i + 1] - 5} stroke={ink} strokeWidth="1.2" strokeDasharray="2 2.5" />
          )),
        )}
        <text x={sx + 40} y={226} textAnchor="middle" fontSize="11" fontWeight="700" fill={crimson}>β-pleated sheet</text>
        <text x={sx + 40} y={180} textAnchor="middle" fontSize="9.5" fill={soft}>dashes = H-bonds</text>
      </g>
    );
  })();

  // Tertiary
  const tertiary = (() => {
    const cx = colX(2);
    const d = `M${cx - 62} 188 C ${cx - 92} 150, ${cx - 44} 112, ${cx - 12} 132 S ${cx + 34} 82, ${cx + 8} 76 S ${cx + 78} 66, ${cx + 70} 114 S ${cx + 28} 142, ${cx + 56} 172 S ${cx + 12} 214, ${cx - 24} 192`;
    return (
      <g>
        <path d={d} fill="none" stroke={viridian} strokeWidth="6" strokeLinecap="round" />
        <path d={d} fill="none" stroke={card} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1 9" />
        <line x1={cx - 12} y1={132} x2={cx - 24} y2={192} stroke={saffron} strokeWidth="2.4" strokeDasharray="4 3" />
        <circle cx={cx - 12} cy={132} r={4.5} fill={saffron} />
        <circle cx={cx - 24} cy={192} r={4.5} fill={saffron} />
        <text x={cx - 40} y={168} textAnchor="end" fontSize="10.5" fontWeight="700" fill={saffron}>S–S</text>
        <text x={cx} y={232} textAnchor="middle" fontSize="11" fontWeight="700" fill={viridian}>one folded chain</text>
      </g>
    );
  })();

  // Quaternary: haemoglobin
  const quaternary = (() => {
    const cx = colX(3);
    const subunits = [
      { x: cx - 36, y: 112, c: cobalt, l: "α" },
      { x: cx + 36, y: 112, c: crimson, l: "β" },
      { x: cx - 36, y: 184, c: crimson, l: "β" },
      { x: cx + 36, y: 184, c: cobalt, l: "α" },
    ];
    return (
      <g>
        {subunits.map((s, i) => (
          <g key={i}>
            <ellipse cx={s.x} cy={s.y} rx={36} ry={32} fill={tint(s.c, 22)} stroke={s.c} strokeWidth="2.2" />
            <text x={s.x} y={s.y - 8} textAnchor="middle" fontSize="16" fontWeight="700" fill={s.c}>{s.l}</text>
            <circle cx={s.x} cy={s.y + 12} r={6} fill={saffron} stroke={card} strokeWidth="1.2" />
            <text x={s.x} y={s.y + 15.5} textAnchor="middle" fontSize="7" fontWeight="700" fill={card}>Fe</text>
          </g>
        ))}
        <text x={cx} y={232} textAnchor="middle" fontSize="11" fontWeight="700" fill={ink}>haemoglobin = 2α + 2β</text>
      </g>
    );
  })();

  const panels = [
    { title: "Primary", sub: "1° structure", d1: "Sequence of amino acids", d2: "joined by peptide bonds", g: primary, c: cobalt },
    { title: "Secondary", sub: "2° structure", d1: "Regular folding of the chain", d2: "held by H-bonds", g: secondary, c: crimson },
    { title: "Tertiary", sub: "3° structure", d1: "Whole chain folds into 3-D;", d2: "S–S, ionic, H-bonds, hydrophobic", g: tertiary, c: viridian },
    { title: "Quaternary", sub: "4° structure", d1: "Two or more polypeptide", d2: "chains assembled together", g: quaternary, c: iris },
  ];

  return (
    <Frame
      caption="Four levels of protein structure — from the amino-acid sequence to the folded chain to the assembled protein"
      viewBox="0 0 760 310"
    >
      {panels.map((p, i) => (
        <g key={p.title}>
          <text x={colX(i)} y={24} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={p.c}>{p.title}</text>
          <text x={colX(i)} y={40} textAnchor="middle" fontSize="10.5" fill={soft}>{p.sub}</text>
          {p.g}
          <text x={colX(i)} y={264} textAnchor="middle" fontSize="10.5" fill={ink}>{p.d1}</text>
          <text x={colX(i)} y={279} textAnchor="middle" fontSize="10.5" fill={ink}>{p.d2}</text>
          {i < panels.length - 1 && <line x1={colX(i) + 95} y1={52} x2={colX(i) + 95} y2={290} stroke={line} strokeWidth="1" />}
        </g>
      ))}
    </Frame>
  );
};

export const biomoleculeDiagrams: Record<string, () => JSX.Element> = {
  "dna-double-helix": DnaDoubleHelix,
  "protein-structure": ProteinStructure,
};
