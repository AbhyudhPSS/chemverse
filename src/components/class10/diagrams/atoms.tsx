import { Frame, ink, soft, line, arrowHead, box } from "./shared";

/* ------------------------------------------------------------------ *
 * Atomic structure diagrams.
 * ------------------------------------------------------------------ */

const cobalt = "hsl(var(--cobalt))";
const viridian = "hsl(var(--viridian))";
const crimson = "hsl(var(--crimson))";
const saffron = "hsl(var(--saffron))";
const magenta = "hsl(var(--magenta))";
const tint = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;
const bg = "hsl(var(--background))";

const onRing = (cx: number, cy: number, r: number, count: number, startDeg = -90) =>
  Array.from({ length: count }, (_, i) => {
    const a = ((startDeg + (360 / count) * i) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

/** A packed cluster of nucleons — alternating protons and neutrons. */
const nucleons = (cx: number, cy: number, p: number, n: number, size: number) => {
  const total = p + n;
  const pts = Array.from({ length: total }, (_, i) => {
    const r = size * 0.95 * Math.sqrt(i + 0.5);
    const a = i * 2.39996;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  // Interleave so both particle types are visible throughout the nucleus.
  let pLeft = p;
  let nLeft = n;
  return pts.map((pt, i) => {
    const isProton = pLeft > 0 && (nLeft === 0 || i % 2 === 0);
    if (isProton) pLeft--;
    else nLeft--;
    return { ...pt, proton: isProton };
  });
};

/* ---------------------------- Carbon atom ---------------------------- */

export const AtomStructure = () => {
  const cx = 160;
  const cy = 160;
  const nuc = nucleons(cx, cy, 6, 6, 8.4);
  const k = onRing(cx, cy, 62, 2, -60);
  const l = onRing(cx, cy, 104, 4, -45);

  return (
    <Frame
      caption="Structure of an atom, shown for carbon-12 — protons and neutrons in the nucleus, electrons in shells around it"
      viewBox="0 0 600 320"
    >
      <circle cx={cx} cy={cy} r={62} fill="none" stroke={cobalt} strokeWidth="1.4" strokeDasharray="3 3" />
      <circle cx={cx} cy={cy} r={104} fill="none" stroke={viridian} strokeWidth="1.4" strokeDasharray="3 3" />

      {k.map((e, i) => (
        <g key={`k${i}`}>
          <circle cx={e.x} cy={e.y} r={7.5} fill={cobalt} />
          <text x={e.x} y={e.y + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill={bg}>−</text>
        </g>
      ))}
      {l.map((e, i) => (
        <g key={`l${i}`}>
          <circle cx={e.x} cy={e.y} r={7.5} fill={viridian} />
          <text x={e.x} y={e.y + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill={bg}>−</text>
        </g>
      ))}

      {nuc.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={6.8} fill={n.proton ? crimson : "hsl(var(--muted-foreground))"} stroke={bg} strokeWidth="1" />
      ))}


      <g transform="translate(340, 38)">
        <text x={0} y={0} fontSize="40" fontWeight="700" fill={ink}>¹²₆C</text>
        <text x={78} y={-6} fontSize="12" fill={soft}>mass number 12</text>
        <text x={78} y={12} fontSize="12" fill={soft}>atomic number 6</text>

        <circle cx={6} cy={50} r={7} fill={crimson} />
        <text x={22} y={54} fontSize="12" fill={ink}>
          <tspan fontWeight="700">6 protons</tspan> — positive, in the nucleus
        </text>
        <circle cx={6} cy={78} r={7} fill="hsl(var(--muted-foreground))" />
        <text x={22} y={82} fontSize="12" fill={ink}>
          <tspan fontWeight="700">6 neutrons</tspan> (12 − 6) — no charge
        </text>
        <circle cx={6} cy={106} r={7} fill={cobalt} />
        <text x={22} y={110} fontSize="12" fill={ink}>
          <tspan fontWeight="700">2 electrons</tspan> in the K shell (inner)
        </text>
        <circle cx={6} cy={134} r={7} fill={viridian} />
        <text x={22} y={138} fontSize="12" fill={ink}>
          <tspan fontWeight="700">4 electrons</tspan> in the L shell (outer)
        </text>

        <text x={0} y={180} fontSize="11.5" fill={soft}>• Atomic number Z = number of protons</text>
        <text x={0} y={200} fontSize="11.5" fill={soft}>• Mass number A = protons + neutrons</text>
        <text x={0} y={220} fontSize="11.5" fill={soft}>• Nucleus holds nearly all the mass</text>
        <text x={0} y={240} fontSize="11.5" fill={soft}>• Neutral atom: electrons = protons</text>
      </g>
    </Frame>
  );
};

/* -------------------------- Hydrogen isotopes -------------------------- */

export const HydrogenIsotopes = () => {
  const items = [
    { x: 100, name: "Protium", sym: "¹H", p: 1, n: 0, note: "1 proton, 0 neutrons" },
    { x: 300, name: "Deuterium", sym: "²H  (D)", p: 1, n: 1, note: "1 proton, 1 neutron" },
    { x: 500, name: "Tritium", sym: "³H  (T)", p: 1, n: 2, note: "1 proton, 2 neutrons · radioactive" },
  ];
  return (
    <Frame
      caption="The three isotopes of hydrogen — the same number of protons, a different number of neutrons"
      viewBox="0 0 600 256"
    >
      {items.map((it, idx) => {
        const nuc = nucleons(it.x, 100, it.p, it.n, 12);
        const e = onRing(it.x, 100, 50, 1, -45)[0];
        return (
          <g key={it.name}>
            <circle cx={it.x} cy={100} r={50} fill="none" stroke={cobalt} strokeWidth="1.4" strokeDasharray="3 3" />
            <circle cx={e.x} cy={e.y} r={7.5} fill={cobalt} />
            <text x={e.x} y={e.y + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill={bg}>−</text>
            {nuc.map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r={9} fill={n.proton ? crimson : "hsl(var(--muted-foreground))"} stroke={bg} strokeWidth="1" />
            ))}
            <text x={it.x} y={186} textAnchor="middle" fontSize="14" fontWeight="700" fill={ink}>{it.name}</text>
            <text x={it.x} y={206} textAnchor="middle" fontSize="13" fill={cobalt} fontWeight="600">{it.sym}</text>
            <text x={it.x} y={224} textAnchor="middle" fontSize="11" fill={soft}>{it.note}</text>
            {idx < 2 && <line x1={it.x + 100} y1={30} x2={it.x + 100} y2={230} stroke={line} strokeWidth="1" />}
          </g>
        );
      })}
      <g transform="translate(206, 246)" fontSize="10.5" fill={soft}>
        <circle cx={5} cy={-4} r={4.5} fill={crimson} />
        <text x={14} y={0}>proton</text>
        <circle cx={70} cy={-4} r={4.5} fill="hsl(var(--muted-foreground))" />
        <text x={79} y={0}>neutron</text>
        <circle cx={140} cy={-4} r={4.5} fill={cobalt} />
        <text x={149} y={0}>electron</text>
      </g>
    </Frame>
  );
};

/* --------------------------- Atomic models ---------------------------- */

export const AtomicModels = () => {
  const cy = 108;
  const cols = [
    { x: 90, title: "Thomson", year: "1904", note: "Electrons embedded in a positive sphere" },
    { x: 270, title: "Rutherford", year: "1911", note: "Tiny dense nucleus, electrons around it" },
    { x: 450, title: "Bohr", year: "1913", note: "Electrons in fixed energy shells" },
    { x: 630, title: "Quantum model", year: "1926", note: "Orbitals: clouds of probability" },
  ];

  return (
    <Frame
      caption="How the model of the atom changed as new experiments revealed more"
      viewBox="0 0 720 250"
    >
      <defs>
        <radialGradient id="qm-cloud" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={cobalt} stopOpacity="0.75" />
          <stop offset="55%" stopColor={cobalt} stopOpacity="0.3" />
          <stop offset="100%" stopColor={cobalt} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Thomson */}
      <circle cx={cols[0].x} cy={cy} r={56} fill={tint(crimson, 18)} stroke={crimson} strokeWidth="1.8" />
      {[
        [-26, -20], [8, -34], [30, -6], [-10, 6], [20, 32], [-34, 22], [-4, 36], [34, 24],
      ].map(([dx, dy], i) => (
        <circle key={i} cx={cols[0].x + dx} cy={cy + dy} r={5.5} fill={cobalt} />
      ))}
      <text x={cols[0].x - 38} y={cy - 30} fontSize="13" fill={crimson} fontWeight="700">+</text>

      {/* Rutherford */}
      <circle cx={cols[1].x} cy={cy} r={56} fill="none" stroke={soft} strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx={cols[1].x} cy={cy} r={5} fill={crimson} />
      {onRing(cols[1].x, cy, 56, 2, -30).map((e, i) => (
        <circle key={i} cx={e.x} cy={e.y} r={5.5} fill={cobalt} />
      ))}
      <text x={cols[1].x} y={cy + 22} textAnchor="middle" fontSize="10" fill={soft}>mostly empty space</text>

      {/* Bohr */}
      {[22, 40, 58].map((r, i) => (
        <circle key={r} cx={cols[2].x} cy={cy} r={r} fill="none" stroke={cobalt} strokeWidth="1.3" strokeDasharray="3 3" opacity={0.85 - i * 0.1} />
      ))}
      <circle cx={cols[2].x} cy={cy} r={8} fill={crimson} />
      {[...onRing(cols[2].x, cy, 22, 2, -60), ...onRing(cols[2].x, cy, 40, 4, -45), ...onRing(cols[2].x, cy, 58, 3, -90)].map((e, i) => (
        <circle key={i} cx={e.x} cy={e.y} r={4.5} fill={cobalt} />
      ))}

      {/* Quantum */}
      <circle cx={cols[3].x} cy={cy} r={60} fill="url(#qm-cloud)" />
      <circle cx={cols[3].x} cy={cy} r={4} fill={crimson} />

      {cols.map((c, i) => (
        <g key={c.title}>
          <text x={c.x} y={192} textAnchor="middle" fontSize="14" fontWeight="700" fill={ink}>{c.title}</text>
          <text x={c.x} y={209} textAnchor="middle" fontSize="11" fill={magenta} fontWeight="600">{c.year}</text>
          <text x={c.x} y={226} textAnchor="middle" fontSize="10.5" fill={soft}>{c.note}</text>
          {i < cols.length - 1 && (
            <>
              <line x1={c.x + 72} y1={cy} x2={c.x + 106} y2={cy} stroke={soft} strokeWidth="1.5" />
              {arrowHead(c.x + 108, cy, 0, soft, 7)}
            </>
          )}
        </g>
      ))}
    </Frame>
  );
};

/* ------------------------ Rutherford's experiment ----------------------- */

export const RutherfordExperiment = () => {
  const foilX = 310;
  const atoms = Array.from({ length: 11 }, (_, i) => 44 + i * 22);

  return (
    <Frame
      caption="Rutherford's alpha-scattering experiment — most particles pass through, a few are deflected, very few bounce back"
      viewBox="0 0 640 320"
    >
      {/* Source */}
      <rect x={8} y={126} width={54} height={48} rx="5" fill="hsl(var(--muted))" stroke={line} strokeWidth="1.5" />
      <text x={35} y={147} textAnchor="middle" fontSize="11" fontWeight="600" fill={ink}>α source</text>
      <text x={35} y={162} textAnchor="middle" fontSize="10" fill={soft}>(He²⁺)</text>

      {/* Screen */}
      <path d="M560 14 A 270 270 0 0 1 560 306" fill="none" stroke={viridian} strokeWidth="5" opacity="0.55" strokeLinecap="round" />
      <text x={622} y={160} textAnchor="middle" fontSize="10.5" fill={viridian} fontWeight="600" transform="rotate(90, 622, 160)">ZnS screen — flashes on impact</text>

      {/* Gold foil */}
      {atoms.map((y) => (
        <circle key={y} cx={foilX} cy={y} r={7} fill={tint(saffron, 35)} stroke={saffron} strokeWidth="1.3" />
      ))}
      <text x={foilX} y={300} textAnchor="middle" fontSize="11" fontWeight="600" fill={saffron}>Thin gold foil</text>

      {/* nucleus */}
      <circle cx={foilX} cy={154} r={2.8} fill={crimson} />
      <line x1={foilX + 6} y1={156} x2={foilX + 30} y2={176} stroke={soft} strokeWidth="1" />
      <text x={foilX + 34} y={182} fontSize="10" fill={soft}>tiny, dense nucleus</text>

      {/* 1: straight through */}
      <line x1={62} y1={96} x2={548} y2={96} stroke={cobalt} strokeWidth="2" />
      {arrowHead(548, 96, 0, cobalt, 8)}
      <text x={470} y={86} textAnchor="end" fontSize="10.5" fill={cobalt} fontWeight="600">1. Most pass straight through</text>

      {/* 2: small deflection */}
      <polyline points="62,196 296,196 322,204 536,262" fill="none" stroke={cobalt} strokeWidth="2" />
      {arrowHead(536, 262, 15, cobalt, 8)}
      <text x={470} y={278} textAnchor="end" fontSize="10.5" fill={cobalt} fontWeight="600">2. Some deflect slightly</text>

      {/* 3: head-on, repelled by the nucleus */}
      <path d="M62 160 L268 160 Q 314 160 300 118 L 172 42" fill="none" stroke={crimson} strokeWidth="2" />
      {arrowHead(172, 42, -148, crimson, 8)}
      <text x={180} y={30} fontSize="10.5" fill={crimson} fontWeight="700">3. Very few bounce back (≈ 1 in 8000)</text>


    </Frame>
  );
};

/* --------------------------- Orbital shapes --------------------------- */

export const OrbitalShapes = () => {
  const pos = tint(cobalt, 45);
  const neg = tint(crimson, 45);

  const lobe = (cx: number, cy: number, rx: number, ry: number, rot: number, fill: string, stroke: string) => (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot}, ${cx}, ${cy})`} fill={fill} stroke={stroke} strokeWidth="1.6" />
  );

  return (
    <Frame
      caption="Shapes of atomic orbitals — s is a sphere, p is a dumb-bell, d is mostly a cloverleaf; blue and red mark opposite wave signs"
      viewBox="0 0 660 270"
    >
      <defs>
        <radialGradient id="s-cloud" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={cobalt} stopOpacity="0.7" />
          <stop offset="100%" stopColor={cobalt} stopOpacity="0.12" />
        </radialGradient>
      </defs>

      {/* s */}
      <g transform="translate(90, 112)">
        <circle cx={0} cy={0} r={46} fill="url(#s-cloud)" stroke={cobalt} strokeWidth="1.6" />
        <circle cx={0} cy={0} r={3} fill={ink} />
        <text x={0} y={92} textAnchor="middle" fontSize="14" fontWeight="700" fill={ink}>s orbital</text>
        <text x={0} y={110} textAnchor="middle" fontSize="11" fill={soft}>spherical · 1 per sub-shell</text>
        <text x={0} y={126} textAnchor="middle" fontSize="11" fill={soft}>holds 2 electrons</text>
      </g>

      <line x1={170} y1={20} x2={170} y2={250} stroke={line} strokeWidth="1" />

      {/* p — three dumb-bells on x, y, z axes */}
      <g transform="translate(300, 112)">
        <line x1={-78} y1={0} x2={78} y2={0} stroke={line} strokeWidth="1" />
        <line x1={0} y1={-70} x2={0} y2={70} stroke={line} strokeWidth="1" />
        <line x1={-52} y1={44} x2={52} y2={-44} stroke={line} strokeWidth="1" />
        {lobe(-30, 0, 30, 14, 0, neg, crimson)}
        {lobe(30, 0, 30, 14, 0, pos, cobalt)}
        {lobe(0, -30, 30, 14, 90, pos, cobalt)}
        {lobe(0, 30, 30, 14, 90, neg, crimson)}
        {lobe(-24, 19, 30, 14, -40, neg, crimson)}
        {lobe(24, -19, 30, 14, -40, pos, cobalt)}
        <circle cx={0} cy={0} r={3} fill={ink} />
        <text x={86} y={4} fontSize="11" fontWeight="600" fill={ink}>x</text>
        <text x={6} y={-72} fontSize="11" fontWeight="600" fill={ink}>z</text>
        <text x={-62} y={52} fontSize="11" fontWeight="600" fill={ink}>y</text>
        <text x={0} y={92} textAnchor="middle" fontSize="14" fontWeight="700" fill={ink}>p orbitals</text>
        <text x={0} y={110} textAnchor="middle" fontSize="11" fill={soft}>dumb-bell · three at 90° (px, py, pz)</text>
        <text x={0} y={126} textAnchor="middle" fontSize="11" fill={soft}>3 per sub-shell, 6 electrons</text>
      </g>

      <line x1={430} y1={20} x2={430} y2={250} stroke={line} strokeWidth="1" />

      {/* d — cloverleaf */}
      <g transform="translate(545, 112)">
        <line x1={-72} y1={0} x2={72} y2={0} stroke={line} strokeWidth="1" />
        <line x1={0} y1={-72} x2={0} y2={72} stroke={line} strokeWidth="1" />
        {lobe(24, -24, 30, 12, -45, pos, cobalt)}
        {lobe(-24, 24, 30, 12, -45, pos, cobalt)}
        {lobe(-24, -24, 30, 12, 45, neg, crimson)}
        {lobe(24, 24, 30, 12, 45, neg, crimson)}
        <circle cx={0} cy={0} r={3} fill={ink} />
        <text x={78} y={4} fontSize="11" fontWeight="600" fill={ink}>x</text>
        <text x={6} y={-74} fontSize="11" fontWeight="600" fill={ink}>y</text>
        <text x={0} y={92} textAnchor="middle" fontSize="14" fontWeight="700" fill={ink}>d orbitals</text>
        <text x={0} y={110} textAnchor="middle" fontSize="11" fill={soft}>cloverleaf (dxy shown)</text>
        <text x={0} y={126} textAnchor="middle" fontSize="11" fill={soft}>5 per sub-shell, 10 electrons</text>
      </g>
    </Frame>
  );
};

/* -------------------------- Mass spectrometer -------------------------- */

export const MassSpectrometer = () => {
  const dots: { x: number; y: number }[] = [];
  for (let gx = 0; gx < 6; gx++) for (let gy = 0; gy < 5; gy++) dots.push({ x: 346 + gx * 40, y: 112 + gy * 40 });

  return (
    <Frame
      caption="A mass spectrometer — ions are accelerated, then bent by a magnetic field; lighter ions bend more and land closer to the entry point"
      viewBox="0 0 640 326"
    >
      {/* Ionisation */}
      <text x={72} y={26} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={cobalt}>1 · Ionise</text>
      <rect x={34} y={52} width={76} height={56} rx="5" fill={tint(cobalt, 8)} stroke={cobalt} strokeWidth="1.6" />
      <line x1={46} y1={66} x2={98} y2={66} stroke={saffron} strokeWidth="1.6" strokeDasharray="4 3" />
      <line x1={46} y1={94} x2={98} y2={94} stroke={saffron} strokeWidth="1.6" strokeDasharray="4 3" />
      <text x={72} y={84} textAnchor="middle" fontSize="10" fill={soft}>e⁻ beam</text>
      <text x={72} y={124} textAnchor="middle" fontSize="10" fill={soft}>X → X⁺ + 2e⁻</text>
      <line x1={8} y1={80} x2={32} y2={80} stroke={ink} strokeWidth="1.6" />
      {arrowHead(32, 80, 0, ink, 6)}
      <text x={10} y={70} fontSize="9.5" fill={soft}>sample</text>

      {/* Accelerating plates */}
      <text x={176} y={26} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={cobalt}>2 · Accelerate</text>
      <rect x={150} y={44} width={8} height={30} fill={crimson} />
      <rect x={150} y={86} width={8} height={30} fill={crimson} />
      <rect x={196} y={44} width={8} height={30} fill={cobalt} />
      <rect x={196} y={86} width={8} height={30} fill={cobalt} />
      <text x={154} y={38} textAnchor="middle" fontSize="12" fontWeight="700" fill={crimson}>+</text>
      <text x={200} y={38} textAnchor="middle" fontSize="12" fontWeight="700" fill={cobalt}>−</text>
      <text x={177} y={134} textAnchor="middle" fontSize="10" fill={soft}>electric field</text>

      {/* Beam */}
      <line x1={110} y1={80} x2={326} y2={80} stroke={ink} strokeWidth="2" />
      {arrowHead(326, 80, 0, ink, 7)}

      {/* Magnetic field */}
      <text x={430} y={26} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={cobalt}>3 · Deflect</text>
      <rect x={324} y={44} width={260} height={266} rx="8" fill={tint(magenta, 5)} stroke={tint(magenta, 45)} strokeWidth="1.5" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={2.2} fill={tint(magenta, 60)} />
      ))}
      <text x={574} y={302} textAnchor="end" fontSize="10" fill={magenta}>magnetic field out of the page</text>

      {/* Ion paths */}
      <path d="M326 80 A 52 52 0 0 1 326 184" fill="none" stroke={crimson} strokeWidth="2.4" />
      <path d="M326 80 A 106 106 0 0 1 326 292" fill="none" stroke={cobalt} strokeWidth="2.4" />
      <text x={398} y={128} fontSize="10.5" fill={crimson} fontWeight="700">light ion</text>
      <text x={448} y={200} fontSize="10.5" fill={cobalt} fontWeight="700">heavy ion</text>

      {/* Detector */}
      <rect x={316} y={170} width={10} height={130} fill={tint(viridian, 45)} stroke={viridian} strokeWidth="1.4" />
      <text x={298} y={236} textAnchor="end" fontSize="11.5" fontWeight="700" fill={viridian}>4 · Detect</text>
      <text x={298} y={252} textAnchor="end" fontSize="10" fill={soft}>position → m/z</text>
      <text x={298} y={266} textAnchor="end" fontSize="10" fill={soft}>signal → abundance</text>
      <circle cx={326} cy={184} r={4} fill={crimson} />
      <circle cx={326} cy={292} r={4} fill={cobalt} />
    </Frame>
  );
};

/* ------------------- Ionic vs covalent bond formation ------------------ */

export const IonicCovalentFormation = () => {
  const shell = (cx: number, cy: number, radii: number[], counts: number[], colour: string, extra?: (number | null)[]) => (
    <g>
      {radii.map((r, i) => (
        <circle key={`r${i}`} cx={cx} cy={cy} r={r} fill="none" stroke={colour} strokeWidth="1.1" strokeDasharray="2 3" opacity="0.8" />
      ))}
      {radii.flatMap((r, i) =>
        onRing(cx, cy, r, counts[i] || 0, -90 + (extra?.[i] ?? 0) * 0).map((p, j) => (
          <circle key={`e${i}-${j}`} cx={p.x} cy={p.y} r={2.8} fill={colour} />
        )),
      )}
    </g>
  );

  return (
    <Frame
      caption="Forming a bond — ionic bonds transfer an electron to complete a shell; covalent bonds share a pair so both atoms complete theirs"
      viewBox="0 0 700 358"
    >
      <text x={185} y={20} textAnchor="middle" fontSize="13" fontWeight="700" fill={saffron}>Ionic bond — electron transfer</text>

      {/* before */}
      <text x={20} y={44} fontSize="10.5" fill={soft}>Before</text>
      {shell(80, 100, [16, 29, 42], [2, 8, 1], saffron)}
      <circle cx={80} cy={100} r={9} fill={saffron} />
      <text x={80} y={160} textAnchor="middle" fontSize="12" fontWeight="700" fill={saffron}>Na</text>
      <text x={80} y={174} textAnchor="middle" fontSize="10" fill={soft}>2, 8, 1</text>

      {shell(280, 100, [16, 29, 42], [2, 8, 7], cobalt)}
      <circle cx={280} cy={100} r={9} fill={cobalt} />
      <text x={280} y={160} textAnchor="middle" fontSize="12" fontWeight="700" fill={cobalt}>Cl</text>
      <text x={280} y={174} textAnchor="middle" fontSize="10" fill={soft}>2, 8, 7</text>

      <path d="M122 100 C 170 62, 232 62, 244 78" fill="none" stroke={crimson} strokeWidth="2" />
      {arrowHead(244, 80, 55, crimson, 8)}
      <text x={180} y={58} textAnchor="middle" fontSize="10.5" fill={crimson} fontWeight="700">1 e⁻ transferred</text>

      {/* after */}
      <text x={20} y={204} fontSize="10.5" fill={soft}>After</text>
      {shell(80, 270, [16, 29], [2, 8], saffron)}
      <circle cx={80} cy={270} r={9} fill={saffron} />
      <text x={108} y={234} fontSize="13" fontWeight="700" fill={saffron}>+</text>
      <text x={80} y={330} textAnchor="middle" fontSize="12" fontWeight="700" fill={saffron}>Na⁺</text>
      <text x={80} y={344} textAnchor="middle" fontSize="10" fill={soft}>2, 8 (like neon)</text>

      {shell(280, 270, [16, 29, 42], [2, 8, 8], cobalt)}
      <circle cx={280} cy={270} r={9} fill={cobalt} />
      <text x={324} y={234} fontSize="13" fontWeight="700" fill={cobalt}>−</text>
      <text x={280} y={330} textAnchor="middle" fontSize="12" fontWeight="700" fill={cobalt}>Cl⁻</text>
      <text x={280} y={344} textAnchor="middle" fontSize="10" fill={soft}>2, 8, 8 (like argon)</text>

      <line x1={116} y1={270} x2={236} y2={270} stroke={crimson} strokeWidth="1.4" strokeDasharray="3 3" />
      <text x={178} y={262} textAnchor="middle" fontSize="10" fill={crimson}>electrostatic attraction</text>

      <line x1={372} y1={14} x2={372} y2={346} stroke={line} strokeWidth="1" />

      <text x={536} y={20} textAnchor="middle" fontSize="13" fontWeight="700" fill={viridian}>Covalent bond — electron sharing</text>
      {(() => {
        const a = { x: 490, y: 130 };
        const b = { x: 548, y: 130 };
        const r = 40;
        const aDots = [70, 115, 160, 205, 250, 295].map((d) => ({ x: a.x + r * Math.cos((d * Math.PI) / 180), y: a.y + r * Math.sin((d * Math.PI) / 180) }));
        const bDots = [110, 65, 20, -25, -70, -115].map((d) => ({ x: b.x + r * Math.cos((d * Math.PI) / 180), y: b.y + r * Math.sin((d * Math.PI) / 180) }));
        return (
          <g>
            <circle cx={a.x} cy={a.y} r={r} fill={tint(viridian, 8)} stroke={viridian} strokeWidth="1.6" />
            <circle cx={b.x} cy={b.y} r={r} fill={tint(viridian, 8)} stroke={viridian} strokeWidth="1.6" />
            <text x={a.x - 14} y={a.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={viridian}>Cl</text>
            <text x={b.x + 14} y={b.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={viridian}>Cl</text>
            {aDots.map((p, i) => (
              <circle key={`a${i}`} cx={p.x} cy={p.y} r={2.8} fill={viridian} />
            ))}
            {bDots.map((p, i) => (
              <circle key={`b${i}`} cx={p.x} cy={p.y} r={2.8} fill={viridian} />
            ))}
            <circle cx={(a.x + b.x) / 2} cy={a.y - 6} r={3.4} fill={crimson} />
            <circle cx={(a.x + b.x) / 2} cy={a.y + 6} r={3.4} fill={cobalt} />
          </g>
        );
      })()}
      <text x={519} y={198} textAnchor="middle" fontSize="11" fill={ink}>Cl – Cl</text>
      <text x={519} y={216} textAnchor="middle" fontSize="10.5" fill={soft}>one shared pair = one single bond</text>
      <text x={519} y={232} textAnchor="middle" fontSize="10.5" fill={soft}>6 + 2 shared = 8 electrons around each Cl</text>

      {box(402, 260, 268, 52, tint(viridian, 6), tint(viridian, 40))}
      <text x={536} y={282} textAnchor="middle" fontSize="11" fill={ink}>Ionic: metal + non-metal, high melting point</text>
      <text x={536} y={300} textAnchor="middle" fontSize="11" fill={ink}>Covalent: non-metal + non-metal, molecules</text>
    </Frame>
  );
};

/* ------------------------- Periodic table blocks ------------------------ */

export const PeriodicTableBlocks = () => {
  const w = 29;
  const h = 25;
  const x0 = 52;
  const y0 = 38;

  type Block = "s" | "p" | "d" | "f";
  const colours: Record<Block, string> = { s: crimson, p: cobalt, d: viridian, f: saffron };

  const cells: { col: number; row: number; block: Block }[] = [];
  const add = (row: number, cols: number[], block: (c: number) => Block) => cols.forEach((c) => cells.push({ col: c, row, block: block(c) }));
  const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

  add(0, [1, 18], (c) => (c === 1 ? "s" : "s"));
  [1, 2].forEach((r) => add(r, [1, 2, ...range(13, 18)], (c) => (c <= 2 ? "s" : "p")));
  [3, 4].forEach((r) => add(r, range(1, 18), (c) => (c <= 2 ? "s" : c <= 12 ? "d" : "p")));
  [5, 6].forEach((r) => add(r, range(1, 18), (c) => (c <= 2 ? "s" : c === 3 ? "f" : c <= 12 ? "d" : "p")));

  const fRows = [
    { label: "Lanthanoids", row: 8 },
    { label: "Actinoids", row: 9 },
  ];

  return (
    <Frame
      caption="The periodic table by block — the block tells you which sub-shell holds the last electron added"
      viewBox="0 0 640 360"
    >
      {range(1, 18).map((g) => (
        <text key={g} x={x0 + (g - 1) * w + w / 2} y={y0 - 8} textAnchor="middle" fontSize="9" fill={soft}>{g}</text>
      ))}
      <text x={x0 - 8} y={y0 - 22} textAnchor="end" fontSize="9.5" fill={soft}>Group →</text>
      {range(1, 7).map((p) => (
        <text key={p} x={x0 - 8} y={y0 + (p - 1) * h + h / 2 + 3} textAnchor="end" fontSize="9" fill={soft}>{p}</text>
      ))}

      {cells.map((c, i) => (
        <rect
          key={i}
          x={x0 + (c.col - 1) * w + 1}
          y={y0 + c.row * h + 1}
          width={w - 2}
          height={h - 2}
          rx="3"
          fill={tint(colours[c.block], 30)}
          stroke={colours[c.block]}
          strokeWidth="1.2"
        />
      ))}
      <text x={x0 + 2 * w + w / 2} y={y0 + 5 * h + h / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={colours.f}>*</text>
      <text x={x0 + 2 * w + w / 2} y={y0 + 6 * h + h / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={colours.f}>**</text>

      {fRows.map((fr, k) => (
        <g key={fr.label}>
          {range(1, 14).map((i) => (
            <rect
              key={i}
              x={x0 + (i + 1) * w + 1}
              y={y0 + fr.row * h + 1}
              width={w - 2}
              height={h - 2}
              rx="3"
              fill={tint(colours.f, 30)}
              stroke={colours.f}
              strokeWidth="1.2"
            />
          ))}
          <text x={x0 + 1.5 * w} y={y0 + fr.row * h + h / 2 + 4} textAnchor="end" fontSize="9.5" fill={soft}>
            {k === 0 ? "* " : "** "}
            {fr.label}
          </text>
        </g>
      ))}

      <g transform="translate(52, 306)" fontSize="11">
        {(
          [
            ["s", "s-block · groups 1–2 and He"],
            ["p", "p-block · groups 13–18"],
            ["d", "d-block · groups 3–12"],
            ["f", "f-block · inner transition"],
          ] as [Block, string][]
        ).map(([b, label], i) => (
          <g key={b} transform={`translate(${(i % 2) * 270}, ${Math.floor(i / 2) * 22})`}>
            <rect x={0} y={-11} width={16} height={14} rx="3" fill={tint(colours[b], 30)} stroke={colours[b]} strokeWidth="1.2" />
            <text x={24} y={0} fill={ink}>{label}</text>
          </g>
        ))}
      </g>
    </Frame>
  );
};

export const atomDiagrams: Record<string, () => JSX.Element> = {
  "atom-structure": AtomStructure,
  "hydrogen-isotopes": HydrogenIsotopes,
  "atomic-models": AtomicModels,
  "rutherford-experiment": RutherfordExperiment,
  "orbital-shapes": OrbitalShapes,
  "mass-spectrometer": MassSpectrometer,
  "ionic-covalent-formation": IonicCovalentFormation,
  "periodic-table-blocks": PeriodicTableBlocks,
};
