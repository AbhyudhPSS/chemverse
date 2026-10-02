import { Frame, ink, soft, line, arrowHead } from "./shared";

/* ------------------------------------------------------------------ *
 * Carbon structure diagrams — allotropes and bonding.
 * ------------------------------------------------------------------ */

const cobalt = "hsl(var(--cobalt))";
const viridian = "hsl(var(--viridian))";
const crimson = "hsl(var(--crimson))";
const saffron = "hsl(var(--saffron))";
const tint = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

interface Pt {
  x: number;
  y: number;
}

/**
 * A flat-topped honeycomb lattice of `cols` x `rows` hexagons with circumradius r.
 * Returns the unique atom positions, bonds and hexagon centres.
 */
const hexLattice = (ox: number, oy: number, r: number, cols: number, rows: number) => {
  const atoms = new Map<string, Pt>();
  const bonds = new Map<string, [Pt, Pt]>();
  const centres: Pt[] = [];
  const key = (p: Pt) => `${Math.round(p.x)},${Math.round(p.y)}`;
  const dx = 1.5 * r;
  const dy = Math.sqrt(3) * r;

  for (let c = 0; c < cols; c++) {
    for (let row = 0; row < rows; row++) {
      const hx = ox + c * dx;
      const hy = oy + row * dy + (c % 2 ? dy / 2 : 0);
      centres.push({ x: hx, y: hy });
      const ring = Array.from({ length: 6 }, (_, k) => ({
        x: hx + r * Math.cos((k * Math.PI) / 3),
        y: hy + r * Math.sin((k * Math.PI) / 3),
      }));
      ring.forEach((p) => atoms.set(key(p), p));
      ring.forEach((p, k) => {
        const q = ring[(k + 1) % 6];
        bonds.set([key(p), key(q)].sort().join("|"), [p, q]);
      });
    }
  }
  return { atoms: [...atoms.values()], bonds: [...bonds.values()], centres };
};

/* ------------------------------ Diamond ------------------------------ */

type V3 = [number, number, number];

export const DiamondStructure = () => {
  // Conventional cubic unit cell of diamond, in units of the cell edge.
  const corners: V3[] = [];
  for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) corners.push([x, y, z]);
  const faces: V3[] = [
    [0.5, 0.5, 0], [0.5, 0.5, 1], [0.5, 0, 0.5], [0.5, 1, 0.5], [0, 0.5, 0.5], [1, 0.5, 0.5],
  ];
  const inner: { at: V3; bonded: V3[] }[] = [
    { at: [0.25, 0.25, 0.25], bonded: [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]] },
    { at: [0.75, 0.75, 0.25], bonded: [[1, 1, 0], [0.5, 0.5, 0], [1, 0.5, 0.5], [0.5, 1, 0.5]] },
    { at: [0.75, 0.25, 0.75], bonded: [[1, 0, 1], [0.5, 0, 0.5], [0.5, 0.5, 1], [1, 0.5, 0.5]] },
    { at: [0.25, 0.75, 0.75], bonded: [[0, 1, 1], [0.5, 1, 0.5], [0, 0.5, 0.5], [0.5, 0.5, 1]] },
  ];

  // Oblique projection: depth (y) shifts points right and up.
  const a = 150;
  const ox = 318;
  const oy = 262;
  const proj = ([x, y, z]: V3): Pt => ({ x: ox + a * (x + 0.5 * y), y: oy - a * (z + 0.35 * y) });

  const cube: [V3, V3][] = [];
  for (const [p, q] of [
    [[0, 0, 0], [1, 0, 0]], [[0, 1, 0], [1, 1, 0]], [[0, 0, 1], [1, 0, 1]], [[0, 1, 1], [1, 1, 1]],
    [[0, 0, 0], [0, 1, 0]], [[1, 0, 0], [1, 1, 0]], [[0, 0, 1], [0, 1, 1]], [[1, 0, 1], [1, 1, 1]],
    [[0, 0, 0], [0, 0, 1]], [[1, 0, 0], [1, 0, 1]], [[0, 1, 0], [0, 1, 1]], [[1, 1, 0], [1, 1, 1]],
  ] as [V3, V3][]) cube.push([p, q]);

  const centre = { x: 118, y: 168 };
  const front = [
    { x: 118, y: 50 },
    { x: 40, y: 248 },
    { x: 196, y: 248 },
  ];
  const back = { x: 188, y: 110 };

  const outer = [...corners, ...faces].sort((p, q) => q[1] - p[1]);

  return (
    <Frame
      caption="Diamond — each carbon makes four sp³ bonds, so the whole crystal is one rigid three-dimensional network"
      viewBox="0 0 560 340"
    >
      <text x={118} y={22} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={ink}>
        One carbon atom (sp³)
      </text>
      <line x1={centre.x} y1={centre.y} x2={back.x} y2={back.y} stroke={soft} strokeWidth="2" strokeDasharray="5 4" />
      <circle cx={back.x} cy={back.y} r={13} fill="hsl(var(--card))" />
      <circle cx={back.x} cy={back.y} r={13} fill={tint(cobalt, 14)} stroke={cobalt} strokeWidth="1.5" strokeDasharray="3 3" />
      <text x={back.x} y={back.y + 4} textAnchor="middle" fontSize="11" fill={cobalt}>C</text>
      {front.map((p, i) => (
        <g key={i}>
          <line x1={centre.x} y1={centre.y} x2={p.x} y2={p.y} stroke={ink} strokeWidth="2.5" />
          <circle cx={p.x} cy={p.y} r={14} fill="hsl(var(--card))" />
          <circle cx={p.x} cy={p.y} r={14} fill={tint(cobalt, 22)} stroke={cobalt} strokeWidth="1.5" />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={cobalt}>C</text>
        </g>
      ))}
      <circle cx={centre.x} cy={centre.y} r={17} fill={cobalt} />
      <text x={centre.x} y={centre.y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(var(--background))">C</text>
      <text x={centre.x - 8} y={104} textAnchor="end" fontSize="11" fill={soft}>154 pm</text>
      <text x={118} y={284} textAnchor="middle" fontSize="11.5" fill={ink}>Bond angle 109.5° (tetrahedral)</text>

      <line x1={250} y1={30} x2={250} y2={296} stroke={line} strokeWidth="1" />

      <text x={405} y={22} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={ink}>
        Unit cell of the diamond lattice
      </text>
      {cube.map(([p, q], i) => {
        const P = proj(p);
        const Q = proj(q);
        return <line key={i} x1={P.x} y1={P.y} x2={Q.x} y2={Q.y} stroke={line} strokeWidth="1.4" strokeDasharray="4 3" />;
      })}
      {inner.flatMap((n, i) =>
        n.bonded.map((t, j) => {
          const P = proj(n.at);
          const Q = proj(t);
          return <line key={`${i}-${j}`} x1={P.x} y1={P.y} x2={Q.x} y2={Q.y} stroke={ink} strokeWidth="2" />;
        }),
      )}
      {outer.map((v, i) => {
        const P = proj(v);
        return <circle key={i} cx={P.x} cy={P.y} r={6.5} fill={tint(cobalt, 40)} stroke={cobalt} strokeWidth="1.5" />;
      })}
      {inner.map((n, i) => {
        const P = proj(n.at);
        return <circle key={i} cx={P.x} cy={P.y} r={8} fill={cobalt} />;
      })}
      <text x={405} y={296} textAnchor="middle" fontSize="10.5" fill={soft}>
        Dark atoms sit inside the cell; each is bonded to four neighbours
      </text>

      <text x={280} y={326} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={ink}>
        Hardest natural substance · melts above 3500 °C · no free electrons, so it does not conduct
      </text>
    </Frame>
  );
};

/* ------------------------------ Graphite ----------------------------- */

export const GraphiteStructure = () => {
  const lattice = hexLattice(64, 96, 24, 4, 3);

  const layerY = [112, 192, 272];
  const zigzag = (offset: number) => {
    const pts: Pt[] = [];
    for (let i = 0; i < 9; i++) pts.push({ x: 352 + offset + i * 24, y: 0 });
    return pts;
  };

  return (
    <Frame
      caption="Graphite — flat sp² layers of hexagons, stacked and held together only by weak forces"
      viewBox="0 0 600 350"
    >
      <text x={150} y={24} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={ink}>
        Top view of one layer
      </text>
      {lattice.centres.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={12} fill="none" stroke={saffron} strokeWidth="1.4" strokeDasharray="3 3" />
      ))}
      {lattice.bonds.map(([a, b], i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={soft} strokeWidth="2" />
      ))}
      {lattice.atoms.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5.5} fill={viridian} />
      ))}
      <text x={150} y={308} textAnchor="middle" fontSize="11" fill={ink}>sp² · 120° · C–C 142 pm</text>
      <text x={150} y={324} textAnchor="middle" fontSize="10.5" fill={saffron}>dashed rings = delocalised π electrons</text>

      <line x1={290} y1={34} x2={290} y2={310} stroke={line} strokeWidth="1" />

      <text x={450} y={24} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={ink}>
        Side view: stacked layers
      </text>
      {layerY.map((y, li) => {
        const pts = zigzag(li % 2 ? 12 : 0).map((p, i) => ({ x: p.x, y: y + (i % 2 ? 9 : -9) }));
        return (
          <g key={li}>
            <polyline points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke={soft} strokeWidth="2" />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={5} fill={viridian} />
            ))}
            <text x={338} y={y + 4} textAnchor="end" fontSize="10.5" fill={soft}>layer {li + 1}</text>
          </g>
        );
      })}

      {[0, 1].map((i) => {
        const y1 = layerY[i] + 10;
        const y2 = layerY[i + 1] - 10;
        return (
          <g key={i}>
            <line x1={580} y1={y1} x2={580} y2={y2} stroke={crimson} strokeWidth="1.5" />
            {arrowHead(580, y1, -90, crimson, 6)}
            {arrowHead(580, y2, 90, crimson, 6)}
          </g>
        );
      })}
      <text x={452} y={152} textAnchor="middle" fontSize="10.5" fill={crimson}>335 pm — weak van der Waals forces</text>
      <text x={452} y={232} textAnchor="middle" fontSize="10.5" fill={crimson}>layers slide over one another</text>

      <text x={300} y={344} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={ink}>
        Soft and slippery · conducts electricity along the layers · used in pencils and lubricants
      </text>
    </Frame>
  );
};

/* ---------------------------- Fullerene C60 --------------------------- */

/** The 60 vertices of a truncated icosahedron (edge length 2) — the carbon skeleton of C60. */
const c60Vertices = (): V3[] => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const signs = (v: number[]): number[][] => {
    let out: number[][] = [[]];
    for (const c of v) out = out.flatMap((p) => (c === 0 ? [[...p, 0]] : [[...p, c], [...p, -c]]));
    return out;
  };
  const cyclic = ([x, y, z]: number[]): V3[] => [[x, y, z], [y, z, x], [z, x, y]];
  const bases = [
    [0, 1, 3 * phi],
    [1, 2 + phi, 2 * phi],
    [phi, 2, 2 * phi + 1],
  ];
  return bases.flatMap((b) => signs(b).flatMap(cyclic));
};

export const FullereneC60 = () => {
  const cx = 150;
  const cy = 150;
  const scale = 24;
  const verts = c60Vertices();

  // Tilt the molecule so a pentagon and its hexagon neighbours face the viewer.
  const rot = (v: V3, ax: number, ay: number): V3 => {
    const [x, y, z] = v;
    const y1 = y * Math.cos(ax) - z * Math.sin(ax);
    const z1 = y * Math.sin(ax) + z * Math.cos(ax);
    const x2 = x * Math.cos(ay) + z1 * Math.sin(ay);
    const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
    return [x2, y1, z2];
  };
  const pts = verts.map((v) => rot(v, 0.62, 0.35));

  const edges: [number, number][] = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const d = Math.hypot(verts[i][0] - verts[j][0], verts[i][1] - verts[j][1], verts[i][2] - verts[j][2]);
      if (Math.abs(d - 2) < 0.02) edges.push([i, j]);
    }
  }
  const P = (i: number): Pt => ({ x: cx + pts[i][0] * scale, y: cy + pts[i][1] * scale });
  const front = (i: number) => pts[i][2] > 0;

  return (
    <Frame
      caption="Buckminsterfullerene, C₆₀ — 60 carbon atoms joined into a hollow cage of 12 pentagons and 20 hexagons, like a football"
      viewBox="0 0 560 300"
    >
      <defs>
        <radialGradient id="c60-shade" cx="38%" cy="34%" r="75%">
          <stop offset="0%" stopColor="hsl(var(--card))" />
          <stop offset="100%" stopColor="hsl(var(--muted))" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={124} fill="url(#c60-shade)" stroke={line} strokeWidth="1.5" />

      {edges
        .filter(([i, j]) => !(front(i) && front(j)))
        .map(([i, j], k) => (
          <line key={`b${k}`} x1={P(i).x} y1={P(i).y} x2={P(j).x} y2={P(j).y} stroke={soft} strokeWidth="1.2" opacity="0.35" />
        ))}
      {pts.map((_, i) => (!front(i) ? <circle key={`bv${i}`} cx={P(i).x} cy={P(i).y} r={3} fill={soft} opacity="0.4" /> : null))}

      {edges
        .filter(([i, j]) => front(i) && front(j))
        .map(([i, j], k) => (
          <line key={`f${k}`} x1={P(i).x} y1={P(i).y} x2={P(j).x} y2={P(j).y} stroke={viridian} strokeWidth="2.2" strokeLinecap="round" />
        ))}
      {pts.map((_, i) => (front(i) ? <circle key={`fv${i}`} cx={P(i).x} cy={P(i).y} r={4.6} fill={viridian} /> : null))}

      <g transform="translate(296, 70)">
        <polygon points="0,-9 8.6,-2.8 5.3,7.3 -5.3,7.3 -8.6,-2.8" fill={tint(crimson, 38)} stroke={crimson} strokeWidth="1.5" transform="translate(10,0)" />
        <text x={30} y={4} fontSize="12" fill={ink}>12 pentagons (they curve the surface)</text>
        <polygon points="8,0 4,6.9 -4,6.9 -8,0 -4,-6.9 4,-6.9" fill={tint(viridian, 28)} stroke={viridian} strokeWidth="1.5" transform="translate(10,30)" />
        <text x={30} y={34} fontSize="12" fill={ink}>20 hexagons</text>
        <circle cx={10} cy={62} r={5} fill={viridian} />
        <text x={30} y={66} fontSize="12" fill={ink}>Each vertex is a carbon atom (60 in all)</text>
        <text x={30} y={86} fontSize="10.5" fill={soft}>Faint = far side of the cage</text>
      </g>

      <g transform="translate(296, 180)" fontSize="11.5" fill={soft}>
        <text x={0} y={0}>• Each carbon is sp² bonded to 3 others</text>
        <text x={0} y={20}>• Discrete molecules, not a giant network</text>
        <text x={0} y={40}>• Poor conductor, dissolves in benzene</text>
        <text x={0} y={60}>• Used in nanotechnology and drug delivery</text>
      </g>
    </Frame>
  );
};

/* ------------------------ Allotropes at a glance ------------------------ */

export const CarbonAllotropes = () => {
  const cols = [
    {
      x: 0,
      name: "Diamond",
      colour: cobalt,
      rows: ["sp³ · 4 bonds per C", "Extremely hard", "Insulator", "Rigid 3-D network"],
    },
    {
      x: 215,
      name: "Graphite",
      colour: viridian,
      rows: ["sp² · 3 bonds per C", "Soft, slippery", "Conducts electricity", "Stacked flat layers"],
    },
    {
      x: 430,
      name: "Fullerene C₆₀",
      colour: crimson,
      rows: ["sp² · 3 bonds per C", "Brittle solid", "Poor conductor", "Hollow cage molecule"],
    },
  ];

  const hex = (c: Pt, r: number, rot: number) =>
    Array.from({ length: 6 }, (_, k) => {
      const a = ((rot + 60 * k) * Math.PI) / 180;
      return `${c.x + r * Math.cos(a)},${c.y + r * Math.sin(a)}`;
    }).join(" ");

  return (
    <Frame
      caption="The allotropes of carbon — the same element, arranged three ways, with very different properties"
      viewBox="0 0 640 290"
    >
      {cols.map((c, i) => (
        <g key={c.name} transform={`translate(${c.x}, 0)`}>
          <rect x={6} y={8} width={198} height={272} rx="8" fill={tint(c.colour, 6)} stroke={tint(c.colour, 40)} strokeWidth="1.5" />

          {/* icon */}
          {i === 0 && (
            <g>
              {[
                [105, 40],
                [58, 108],
                [152, 108],
              ].map(([x, y], k) => (
                <line key={k} x1={105} y1={74} x2={x} y2={y} stroke={ink} strokeWidth="2.5" />
              ))}
              <line x1={105} y1={74} x2={150} y2={52} stroke={soft} strokeWidth="2" strokeDasharray="4 3" />
              {[
                [105, 40],
                [58, 108],
                [152, 108],
                [150, 52],
              ].map(([x, y], k) => (
                <circle key={k} cx={x} cy={y} r={8} fill={tint(c.colour, 30)} stroke={c.colour} strokeWidth="1.5" />
              ))}
              <circle cx={105} cy={74} r={10} fill={c.colour} />
            </g>
          )}
          {i === 1 && (
            <g>
              <polygon points={hex({ x: 86, y: 72 }, 26, 0)} fill={tint(c.colour, 14)} stroke={c.colour} strokeWidth="2" strokeLinejoin="round" />
              <polygon points={hex({ x: 125, y: 94.5 }, 26, 0)} fill={tint(c.colour, 14)} stroke={c.colour} strokeWidth="2" strokeLinejoin="round" />
              <polygon points={hex({ x: 125, y: 49.5 }, 26, 0)} fill={tint(c.colour, 14)} stroke={c.colour} strokeWidth="2" strokeLinejoin="round" />
            </g>
          )}
          {i === 2 && (
            <g>
              <circle cx={105} cy={76} r={40} fill={tint(c.colour, 10)} stroke={c.colour} strokeWidth="2" />
              <polygon
                points={Array.from({ length: 5 }, (_, k) => {
                  const a = ((72 * k - 90) * Math.PI) / 180;
                  return `${105 + 15 * Math.cos(a)},${76 + 15 * Math.sin(a)}`;
                }).join(" ")}
                fill={tint(c.colour, 34)}
                stroke={c.colour}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </g>
          )}

          <text x={105} y={142} textAnchor="middle" fontSize="14" fontWeight="700" fill={c.colour}>{c.name}</text>
          {c.rows.map((row, ri) => (
            <text key={ri} x={105} y={170 + ri * 28} textAnchor="middle" fontSize="11.5" fill={ri === 0 ? ink : soft} fontWeight={ri === 0 ? 600 : 400}>
              {row}
            </text>
          ))}
        </g>
      ))}
    </Frame>
  );
};

/* ----------------------- Bonding in carbon compounds ----------------------- */

export const CarbonCovalentBonds = () => {
  const atom = (x: number, y: number, label: "C" | "H") => (
    <g>
      <circle cx={x} cy={y} r={label === "C" ? 13 : 9} fill="hsl(var(--card))" />
      <circle
        cx={x}
        cy={y}
        r={label === "C" ? 13 : 9}
        fill={label === "C" ? tint(cobalt, 22) : "hsl(var(--background))"}
        stroke={label === "C" ? cobalt : soft}
        strokeWidth="1.5"
      />
      <text x={x} y={y + (label === "C" ? 4.5 : 3.5)} textAnchor="middle" fontSize={label === "C" ? 12 : 10} fontWeight="600" fill={label === "C" ? cobalt : ink}>
        {label}
      </text>
    </g>
  );
  const bond = (x1: number, y1: number, x2: number, y2: number, order = 1, dashed = false) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const nx = -(y2 - y1) / len;
    const ny = (x2 - x1) / len;
    const offsets = order === 1 ? [0] : order === 2 ? [-3, 3] : [-4.5, 0, 4.5];
    return offsets.map((o, i) => (
      <line key={i} x1={x1 + nx * o} y1={y1 + ny * o} x2={x2 + nx * o} y2={y2 + ny * o} stroke={ink} strokeWidth="2" strokeDasharray={dashed ? "4 3" : undefined} />
    ));
  };

  return (
    <Frame
      caption="Covalent bonds in carbon compounds — single, double and triple bonds give different shapes"
      viewBox="0 0 660 250"
    >
      {/* Methane */}
      <g>
        {bond(110, 100, 110, 36)}
        {bond(110, 100, 56, 144)}
        {bond(110, 100, 164, 144)}
        {bond(110, 100, 152, 62, 1, true)}
        {atom(110, 36, "H")}
        {atom(56, 144, "H")}
        {atom(164, 144, "H")}
        {atom(152, 62, "H")}
        {atom(110, 100, "C")}
        <text x={110} y={184} textAnchor="middle" fontSize="13" fontWeight="700" fill={ink}>Methane, CH₄</text>
        <text x={110} y={202} textAnchor="middle" fontSize="11" fill={soft}>4 single bonds · 109.5°</text>
        <text x={110} y={218} textAnchor="middle" fontSize="11" fill={soft}>tetrahedral</text>
      </g>

      <line x1={220} y1={20} x2={220} y2={230} stroke={line} strokeWidth="1" />

      {/* Ethene */}
      <g>
        {bond(300, 100, 380, 100, 2)}
        {bond(300, 100, 258, 62)}
        {bond(300, 100, 258, 138)}
        {bond(380, 100, 422, 62)}
        {bond(380, 100, 422, 138)}
        {[
          [258, 62],
          [258, 138],
          [422, 62],
          [422, 138],
        ].map(([x, y], i) => (
          <g key={i}>{atom(x, y, "H")}</g>
        ))}
        {atom(300, 100, "C")}
        {atom(380, 100, "C")}
        <text x={340} y={184} textAnchor="middle" fontSize="13" fontWeight="700" fill={ink}>Ethene, C₂H₄</text>
        <text x={340} y={202} textAnchor="middle" fontSize="11" fill={soft}>1 double bond · 120°</text>
        <text x={340} y={218} textAnchor="middle" fontSize="11" fill={soft}>flat (planar)</text>
      </g>

      <line x1={450} y1={20} x2={450} y2={230} stroke={line} strokeWidth="1" />

      {/* Ethyne */}
      <g>
        {bond(480, 100, 512, 100)}
        {bond(512, 100, 572, 100, 3)}
        {bond(572, 100, 604, 100)}
        {atom(480, 100, "H")}
        {atom(512, 100, "C")}
        {atom(572, 100, "C")}
        {atom(604, 100, "H")}
        <text x={542} y={184} textAnchor="middle" fontSize="13" fontWeight="700" fill={ink}>Ethyne, C₂H₂</text>
        <text x={542} y={202} textAnchor="middle" fontSize="11" fill={soft}>1 triple bond · 180°</text>
        <text x={542} y={218} textAnchor="middle" fontSize="11" fill={soft}>linear</text>
      </g>
    </Frame>
  );
};

/* ------------------------------- Benzene ------------------------------- */

export const BenzeneStructure = () => {
  const r = 46;
  const hexPts = (c: Pt) =>
    Array.from({ length: 6 }, (_, k) => {
      const a = ((60 * k - 90) * Math.PI) / 180;
      return { x: c.x + r * Math.cos(a), y: c.y + r * Math.sin(a) };
    });
  const lerp = (a: Pt, b: Pt, t: number) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

  const ring = (c: Pt, doubles: number[] | null) => {
    const pts = hexPts(c);
    return (
      <g>
        <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke={ink} strokeWidth="2.2" strokeLinejoin="round" />
        {doubles?.map((k) => {
          const a = pts[k];
          const b = pts[(k + 1) % 6];
          const toCentre = (p: Pt) => lerp(p, c, 0.2);
          const a2 = lerp(toCentre(a), toCentre(b), 0.14);
          const b2 = lerp(toCentre(a), toCentre(b), 0.86);
          return <line key={k} x1={a2.x} y1={a2.y} x2={b2.x} y2={b2.y} stroke={ink} strokeWidth="2.2" />;
        })}
        {doubles === null && <circle cx={c.x} cy={c.y} r={r * 0.55} fill="none" stroke={viridian} strokeWidth="2.4" />}
      </g>
    );
  };

  const centres = [
    { x: 100, y: 100 },
    { x: 300, y: 100 },
    { x: 500, y: 100 },
  ];

  const twoWay = (x: number) => (
    <g>
      <line x1={x - 22} y1={100} x2={x + 22} y2={100} stroke={soft} strokeWidth="1.8" />
      {arrowHead(x + 24, 100, 0, soft, 8)}
      {arrowHead(x - 24, 100, 180, soft, 8)}
    </g>
  );

  return (
    <Frame
      caption="Benzene, C₆H₆ — the real molecule is a resonance hybrid, with π electrons shared evenly around the whole ring"
      viewBox="0 0 600 220"
    >
      {ring(centres[0], [0, 2, 4])}
      {ring(centres[1], [1, 3, 5])}
      {ring(centres[2], null)}
      {twoWay(200)}
      {twoWay(400)}

      <text x={100} y={178} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={ink}>Kekulé structure I</text>
      <text x={300} y={178} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={ink}>Kekulé structure II</text>
      <text x={500} y={178} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={viridian}>Resonance hybrid</text>
      <text x={300} y={206} textAnchor="middle" fontSize="11" fill={soft}>
        All six C–C bonds are 139 pm — between a single (154 pm) and a double (134 pm) bond
      </text>
    </Frame>
  );
};

export const carbonDiagrams: Record<string, () => JSX.Element> = {
  "diamond-structure": DiamondStructure,
  "graphite-structure": GraphiteStructure,
  "fullerene-c60": FullereneC60,
  "carbon-allotropes": CarbonAllotropes,
  "carbon-covalent-bonds": CarbonCovalentBonds,
  "benzene-structure": BenzeneStructure,
};
