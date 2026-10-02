import { Frame, ink, soft, line, arrowHead } from "./shared";

/* ------------------------------------------------------------------ *
 * Matter and separation diagrams: changes of state, the Tyndall effect,
 * the separating funnel and simple distillation.
 * ------------------------------------------------------------------ */

const cobalt = "hsl(var(--cobalt))";
const viridian = "hsl(var(--viridian))";
const crimson = "hsl(var(--crimson))";
const saffron = "hsl(var(--saffron))";
const copper = "hsl(var(--copper))";
const card = "hsl(var(--card))";
const muted = "hsl(var(--muted))";
const tint = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

/* -------------------- Interconversion of states -------------------- */

export const InterconversionOfStates = () => {
  const states = [
    { x: 100, name: "Solid", kind: "solid" as const, colour: cobalt },
    { x: 320, name: "Liquid", kind: "liquid" as const, colour: viridian },
    { x: 540, name: "Gas", kind: "gas" as const, colour: crimson },
  ];
  const liquidJitter = [
    [0, 2], [3, -2], [-3, 3], [2, 2], [-2, -3], [4, 1], [-1, 4], [3, -3], [0, -2], [-4, 2], [2, 3], [-3, -1],
  ];
  const gasSpots = [
    [-36, 16], [-10, 32], [24, 12], [38, 36], [-26, 52], [8, 58], [34, 66], [-40, 74],
  ];

  const particles = (s: (typeof states)[number]) => {
    const out: JSX.Element[] = [];
    if (s.kind === "solid") {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) out.push(<circle key={`${r}${c}`} cx={s.x - 33 + c * 22} cy={150 + r * 17} r={6.5} fill={s.colour} />);
      }
    } else if (s.kind === "liquid") {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
          const j = liquidJitter[r * 4 + c];
          out.push(<circle key={`${r}${c}`} cx={s.x - 33 + c * 22 + j[0]} cy={152 + r * 17 + j[1]} r={6} fill={s.colour} />);
        }
      }
    } else {
      gasSpots.forEach((g, i) => out.push(<circle key={i} cx={s.x + g[0]} cy={112 + g[1] * 0.95} r={4.5} fill={s.colour} />));
    }
    return out;
  };

  const pair = (x1: number, x2: number, up: string, down: string, upSub: string, downSub: string) => (
    <g>
      <text x={(x1 + x2) / 2} y={116} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={crimson}>{up}</text>
      <text x={(x1 + x2) / 2} y={129} textAnchor="middle" fontSize="9.5" fill={soft}>{upSub}</text>
      <line x1={x1} y1={140} x2={x2 - 2} y2={140} stroke={crimson} strokeWidth="2" />
      {arrowHead(x2, 140, 0, crimson, 8)}
      <line x1={x2} y1={166} x2={x1 + 2} y2={166} stroke={cobalt} strokeWidth="2" />
      {arrowHead(x1, 166, 180, cobalt, 8)}
      <text x={(x1 + x2) / 2} y={184} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={cobalt}>{down}</text>
      <text x={(x1 + x2) / 2} y={197} textAnchor="middle" fontSize="9.5" fill={soft}>{downSub}</text>
    </g>
  );

  return (
    <Frame
      caption="Interconversion of the states of matter — heat absorbed drives changes to the right; heat released drives changes to the left"
      viewBox="0 0 640 330"
    >
      {states.map((s) => (
        <g key={s.name}>
          <rect x={s.x - 52} y={96} width={104} height={104} rx="8" fill={tint(s.colour, 9)} stroke={s.colour} strokeWidth="1.8" />
          <text x={s.x} y={116} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.colour}>{s.name}</text>
          {particles(s)}
        </g>
      ))}

      {pair(152, 268, "Melting", "Freezing", "+ heat", "− heat")}
      {pair(372, 488, "Boiling / evaporation", "Condensation", "+ heat", "− heat")}

      {/* Sublimation (arc above) */}
      <path d="M100 94 C 100 18, 540 18, 540 86" fill="none" stroke={saffron} strokeWidth="1.8" strokeDasharray="6 4" />
      {arrowHead(540, 94, 90, saffron, 9)}
      <text x={320} y={64} textAnchor="middle" fontSize="12" fontWeight="700" fill={saffron}>Sublimation — solid → gas directly</text>
      <text x={320} y={79} textAnchor="middle" fontSize="10" fill={soft}>camphor · naphthalene · ammonium chloride · dry ice</text>

      {/* Deposition (arc below) */}
      <path d="M540 206 C 540 282, 100 282, 100 214" fill="none" stroke={saffron} strokeWidth="1.8" strokeDasharray="6 4" />
      {arrowHead(100, 206, -90, saffron, 9)}
      <text x={320} y={278} textAnchor="middle" fontSize="12" fontWeight="700" fill={saffron}>Deposition — gas → solid directly</text>

      <text x={320} y={318} textAnchor="middle" fontSize="10.5" fill={soft}>Temperature stays constant during every change of state — the heat goes into overcoming the forces between particles</text>
    </Frame>
  );
};

/* ---------------------------- Tyndall effect ---------------------------- */

export const TyndallEffect = () => {
  const bx = 84;
  const by = 74;
  const bw = 190;
  const bh = 130;
  const beamY = 136;

  const torch = (
    <g>
      <rect x={6} y={beamY - 13} width={34} height={26} rx="3" fill={soft} />
      <path d={`M40 ${beamY - 13} L56 ${beamY - 20} L56 ${beamY + 20} L40 ${beamY + 13} Z`} fill={saffron} opacity="0.85" />
      <text x={30} y={beamY + 40} textAnchor="middle" fontSize="10" fill={soft}>Torch</text>
    </g>
  );

  const beaker = (colour: string) => (
    <g>
      <path d={`M${bx} ${by} V${by + bh - 8} a8 8 0 0 0 8 8 H${bx + bw - 8} a8 8 0 0 0 8 -8 V${by}`} fill="none" stroke={soft} strokeWidth="2" />
      <path d={`M${bx + 1} ${by + 24} H${bx + bw - 1} V${by + bh - 8} a7 7 0 0 1 -7 7 H${bx + 8} a7 7 0 0 1 -7 -7 Z`} fill={tint(colour, 14)} />
    </g>
  );

  // Fixed particle positions so the SVG never changes between renders.
  const colloid = [
    [24, 58], [58, 40], [94, 66], [128, 36], [160, 60], [40, 86], [76, 94], [112, 82], [148, 96], [168, 80], [20, 104], [64, 62], [100, 100], [136, 70],
  ];
  const solute = [
    [22, 50], [46, 78], [70, 56], [90, 100], [110, 48], [132, 90], [152, 56], [170, 98], [34, 100], [120, 106], [60, 40], [160, 76],
  ];

  return (
    <Frame
      caption="The Tyndall effect — colloidal particles are large enough to scatter light, so the beam shows up; the tiny particles of a true solution do not"
      viewBox="0 0 680 270"
    >
      {/* True solution */}
      <g>
        <text x={bx + bw / 2} y={26} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={cobalt}>True solution</text>
        <text x={bx + bw / 2} y={43} textAnchor="middle" fontSize="10.5" fill={soft}>e.g. salt or sugar in water</text>
        {torch}
        {beaker(cobalt)}
        <line x1={56} y1={beamY} x2={bx} y2={beamY} stroke={saffron} strokeWidth="3" opacity="0.7" />
        <line x1={bx} y1={beamY} x2={bx + bw} y2={beamY} stroke={saffron} strokeWidth="1.2" strokeDasharray="3 4" opacity="0.5" />
        {solute.map((p, i) => (
          <circle key={i} cx={bx + p[0]} cy={by + 20 + p[1] * 0.9} r={1.4} fill={cobalt} />
        ))}
        <text x={bx + bw / 2} y={226} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={cobalt}>Light path is not visible</text>
        <text x={bx + bw / 2} y={242} textAnchor="middle" fontSize="10" fill={soft}>particles under 1 nm — too small to scatter light</text>
      </g>

      {/* Colloid */}
      <g transform="translate(340, 0)">
        <text x={bx + bw / 2} y={26} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={copper}>Colloid</text>
        <text x={bx + bw / 2} y={43} textAnchor="middle" fontSize="10.5" fill={soft}>e.g. milk, starch sol, fog</text>
        {torch}
        {beaker(copper)}
        <line x1={56} y1={beamY} x2={bx} y2={beamY} stroke={saffron} strokeWidth="3" opacity="0.7" />
        <rect x={bx} y={beamY - 9} width={bw} height={18} fill={saffron} opacity="0.26" />
        <line x1={bx} y1={beamY} x2={bx + bw} y2={beamY} stroke={saffron} strokeWidth="2.4" />
        {colloid.map((p, i) => (
          <circle key={i} cx={bx + p[0]} cy={by + 20 + p[1] * 0.9} r={3.2} fill={copper} />
        ))}
        {[30, 66, 102, 138, 170].map((x) => (
          <g key={x} stroke={saffron} strokeWidth="1.3" strokeLinecap="round">
            <line x1={bx + x + 4} y1={beamY - 4} x2={bx + x + 12} y2={beamY - 14} />
            <line x1={bx + x - 4} y1={beamY - 4} x2={bx + x - 12} y2={beamY - 14} />
            <line x1={bx + x + 4} y1={beamY + 4} x2={bx + x + 12} y2={beamY + 14} />
            <line x1={bx + x - 4} y1={beamY + 4} x2={bx + x - 12} y2={beamY + 14} />
          </g>
        ))}
        <text x={bx + bw / 2} y={226} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={copper}>Light path is visible</text>
        <text x={bx + bw / 2} y={242} textAnchor="middle" fontSize="10" fill={soft}>particles 1–1000 nm — scatter light in all directions</text>
      </g>
    </Frame>
  );
};

/* --------------------------- Separating funnel --------------------------- */

export const SeparatingFunnel = () => {
  const body =
    "M190 44 V76 C 148 96, 138 128, 138 164 C 138 224, 196 256, 200 296 V 336 H 220 V 296 C 224 256, 282 224, 282 164 C 282 128, 272 96, 230 76 V44 Z";

  return (
    <Frame
      caption="A separating funnel — two immiscible liquids settle in layers, and the denser one is run off through the stopcock"
      viewBox="0 0 520 420"
    >
      <defs>
        <clipPath id="sf-body">
          <path d={body} />
        </clipPath>
      </defs>

      {/* Stand */}
      <line x1={50} y1={50} x2={50} y2={398} stroke={soft} strokeWidth="5" strokeLinecap="round" />
      <line x1={20} y1={398} x2={120} y2={398} stroke={soft} strokeWidth="6" strokeLinecap="round" />
      <line x1={50} y1={96} x2={140} y2={96} stroke={soft} strokeWidth="4" />
      <ellipse cx={210} cy={96} rx={72} ry={7} fill="none" stroke={soft} strokeWidth="3.5" />

      {/* Liquids, clipped to the funnel */}
      <g clipPath="url(#sf-body)">
        <rect x={130} y={118} width={160} height={78} fill={tint(saffron, 45)} />
        <rect x={130} y={196} width={160} height={150} fill={tint(cobalt, 40)} />
        <line x1={130} y1={196} x2={290} y2={196} stroke={ink} strokeWidth="1" strokeDasharray="4 3" />
      </g>
      <path d={body} fill="none" stroke={ink} strokeWidth="2.2" strokeLinejoin="round" />

      {/* Stopper */}
      <path d="M192 44 L198 22 H222 L228 44 Z" fill={muted} stroke={ink} strokeWidth="1.8" />

      {/* Stopcock */}
      <rect x={193} y={304} width={34} height={14} rx="3" fill={muted} stroke={ink} strokeWidth="1.8" />
      <line x1={227} y1={311} x2={250} y2={311} stroke={ink} strokeWidth="3" strokeLinecap="round" />

      {/* Falling drop + receiving beaker */}
      <circle cx={210} cy={347} r={3.2} fill={cobalt} />
      <path d="M168 358 V404 a6 6 0 0 0 6 6 H246 a6 6 0 0 0 6 -6 V358" fill="none" stroke={ink} strokeWidth="2" />
      <path d="M169 392 H251 V404 a5 5 0 0 1 -5 5 H174 a5 5 0 0 1 -5 -5 Z" fill={tint(cobalt, 40)} />

      {/* Labels */}
      <g fontSize="11.5">
        <line x1={285} y1={150} x2={330} y2={150} stroke={soft} strokeWidth="1" />
        <text x={336} y={146} fontWeight="700" fill={saffron}>Upper layer — oil</text>
        <text x={336} y={161} fontSize="10.5" fill={soft}>less dense, floats on top</text>

        <line x1={280} y1={196} x2={330} y2={196} stroke={soft} strokeWidth="1" />
        <text x={336} y={192} fontWeight="700" fill={ink}>Interface</text>
        <text x={336} y={207} fontSize="10.5" fill={soft}>the layers do not mix</text>

        <line x1={270} y1={236} x2={330} y2={236} stroke={soft} strokeWidth="1" />
        <text x={336} y={232} fontWeight="700" fill={cobalt}>Lower layer — water</text>
        <text x={336} y={247} fontSize="10.5" fill={soft}>denser, drained off first</text>

        <line x1={252} y1={311} x2={330} y2={311} stroke={soft} strokeWidth="1" />
        <text x={336} y={307} fontWeight="700" fill={ink}>Stopcock</text>
        <text x={336} y={322} fontSize="10.5" fill={soft}>closed once the lower layer is out</text>

        <line x1={228} y1={32} x2={330} y2={32} stroke={soft} strokeWidth="1" />
        <text x={336} y={36} fontWeight="700" fill={ink}>Stopper</text>
        <text x={336} y={51} fontSize="10.5" fill={soft}>removed before draining</text>
      </g>
    </Frame>
  );
};

/* ---------------------------- Simple distillation ---------------------------- */

export const SimpleDistillation = () => {
  const angle = 18;
  const rad = (angle * Math.PI) / 180;
  const cx = 120;
  const cy = 206;
  const r = 50;

  return (
    <Frame
      caption="Simple distillation — the liquid with the lower boiling point vaporises first, is cooled in the condenser and is collected as the distillate"
      viewBox="0 0 640 330"
    >
      <defs>
        <clipPath id="dist-flask">
          <circle cx={cx} cy={cy} r={r - 1.5} />
        </clipPath>
      </defs>

      {/* Burner */}
      <path d={`M${cx - 9} 284 Q${cx - 14} 272 ${cx} 258 Q${cx + 14} 272 ${cx + 9} 284 Z`} fill={saffron} opacity="0.85" />
      <path d={`M${cx - 4} 284 Q${cx - 6} 276 ${cx} 268 Q${cx + 6} 276 ${cx + 4} 284 Z`} fill={crimson} />
      <rect x={cx - 11} y={284} width={22} height={30} rx="2" fill={soft} />
      <line x1={cx - 34} y1={314} x2={cx + 34} y2={314} stroke={soft} strokeWidth="5" strokeLinecap="round" />
      <text x={cx + 40} y={302} fontSize="10.5" fill={soft}>Burner (heat)</text>

      {/* Flask */}
      <g clipPath="url(#dist-flask)">
        <rect x={cx - r} y={cy - 6} width={2 * r} height={r + 8} fill={tint(cobalt, 30)} />
      </g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={ink} strokeWidth="2.2" />
      <path d={`M${cx - 10} ${cy - r + 4} V96 M${cx + 10} ${cy - r + 4} V108 M${cx + 10} 100 V96`} stroke={ink} strokeWidth="2.2" fill="none" />
      {[[-18, 6], [4, 14], [20, 4], [-4, 26], [14, 28]].map((p, i) => (
        <circle key={i} cx={cx + p[0]} cy={cy + p[1]} r={2.6} fill="none" stroke={cobalt} strokeWidth="1" />
      ))}

      {/* Neck, stopper and thermometer */}
      <rect x={cx - 14} y={84} width={28} height={12} rx="2" fill={muted} stroke={ink} strokeWidth="1.8" />
      <rect x={cx - 3} y={40} width={6} height={64} fill={card} stroke={ink} strokeWidth="1.4" />
      <circle cx={cx} cy={106} r={5.5} fill={crimson} />
      <rect x={cx - 1.6} y={74} width={3.2} height={32} fill={crimson} />
      <text x={cx + 16} y={48} fontSize="11" fontWeight="700" fill={ink}>Thermometer</text>
      <text x={cx + 16} y={62} fontSize="10" fill={soft}>bulb level with the side arm</text>

      {/* Side arm to the condenser */}
      <path d={`M${cx + 10} 100 H190`} stroke={ink} strokeWidth="2.2" fill="none" />
      <path d={`M${cx + 10} 108 H190`} stroke={ink} strokeWidth="2.2" fill="none" />

      {/* Condenser (rotated) */}
      <g transform={`translate(190, 104) rotate(${angle})`}>
        <rect x={0} y={-15} width={250} height={30} fill={tint(cobalt, 14)} stroke={ink} strokeWidth="2" />
        <rect x={-6} y={-5} width={290} height={10} fill={card} stroke={ink} strokeWidth="1.6" />
        <rect x={30} y={-29} width={9} height={14} fill={card} stroke={ink} strokeWidth="1.6" />
        <rect x={210} y={15} width={9} height={14} fill={card} stroke={ink} strokeWidth="1.6" />
      </g>

      {/* Water in / out */}
      <text x={238} y={72} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={cobalt}>cold water OUT</text>
      {arrowHead(232, 84, -90, cobalt, 7)}
      <text x={392} y={226} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={cobalt}>cold water IN</text>
      {arrowHead(386, 198, -90, cobalt, 7)}
      <text x={316} y={118 + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill={ink} transform="rotate(18, 316, 126)">Liebig condenser</text>

      {/* Vapour arrows */}
      <path d={`M${cx} 90 L${cx} 82`} stroke="none" />
      {arrowHead(176, 104, 0, crimson, 7)}
      <text x={156} y={92} textAnchor="middle" fontSize="10" fill={crimson}>vapour</text>

      {/* Receiver */}
      {(() => {
        const ex = 190 + 284 * Math.cos(rad);
        const ey = 104 + 284 * Math.sin(rad);
        return (
          <g>
            <circle cx={ex - 4} cy={ey + 22} r={2.8} fill={cobalt} />
            <path d={`M${ex - 38} ${ey + 34} V${ey + 90} a6 6 0 0 0 6 6 H${ex + 26} a6 6 0 0 0 6 -6 V${ey + 34}`} fill="none" stroke={ink} strokeWidth="2" />
            <path d={`M${ex - 37} ${ey + 70} H${ex + 31} V${ey + 90} a5 5 0 0 1 -5 5 H${ex - 32} a5 5 0 0 1 -5 -5 Z`} fill={tint(cobalt, 40)} />
            <text x={ex + 44} y={ey + 74} fontSize="11" fontWeight="700" fill={ink}>Distillate</text>
            <text x={ex + 44} y={ey + 88} fontSize="10" fill={soft}>pure liquid</text>
          </g>
        );
      })()}

      <text x={cx - 58} y={cy + 2} textAnchor="end" fontSize="11" fontWeight="700" fill={ink}>Mixture</text>
      <text x={cx - 58} y={cy + 16} textAnchor="end" fontSize="10" fill={soft}>boils here</text>
      <line x1={cx - 54} y1={cy + 4} x2={cx - 24} y2={cy + 12} stroke={line} strokeWidth="1" />
    </Frame>
  );
};

export const matterDiagrams: Record<string, () => JSX.Element> = {
  "interconversion-of-states": InterconversionOfStates,
  "tyndall-effect": TyndallEffect,
  "separating-funnel": SeparatingFunnel,
  "simple-distillation": SimpleDistillation,
};
