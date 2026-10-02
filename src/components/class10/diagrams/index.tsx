import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Inline SVG diagrams for the Class 10 notes.
 *
 * Every diagram is theme-aware (it reads the design-system CSS variables)
 * and carries a <title> so it is announced properly by screen readers.
 * Colour is used to carry meaning — reaction type, pH, charge — never as
 * decoration.
 * ------------------------------------------------------------------ */

const Frame = ({
  children,
  caption,
  viewBox,
}: {
  children: ReactNode;
  caption: string;
  viewBox: string;
}) => {
  // Never scale a diagram *up* past its drawn size, or its type balloons and
  // the set stops looking like one family. Narrow diagrams simply centre.
  const intrinsicWidth = Number(viewBox.split(/\s+/)[2]) || undefined;

  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-lg border border-border bg-card p-4 sm:p-6">
        <svg
          viewBox={viewBox}
          role="img"
          className="mx-auto h-auto w-full"
          style={intrinsicWidth ? { maxWidth: `${intrinsicWidth}px` } : undefined}
        >
          <title>{caption}</title>
          {children}
        </svg>
      </div>
      <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
};

const ink = "hsl(var(--foreground))";
const soft = "hsl(var(--muted-foreground))";
const line = "hsl(var(--border))";

/**
 * An arrowhead whose tip sits exactly at (x, y) and points along `angle`
 * (0° = right, 90° = down, −90° = up). Computing the rotation explicitly
 * keeps every arrow aimed along its line instead of relying on hand-placed
 * triangle vertices, which is where the earlier diagrams went wrong.
 */
const arrowHead = (x: number, y: number, angle: number, fill: string, size = 9) => (
  <path
    d={`M0 0 L${-size} ${-size * 0.48} L${-size} ${size * 0.48} Z`}
    fill={fill}
    transform={`translate(${x}, ${y}) rotate(${angle})`}
  />
);

/* ---------------------------- pH scale ---------------------------- */

const PH_COLOURS = [
  "#D7263D", "#E4452F", "#EF6C2A", "#F59120", "#F5B921", "#EFD52A", "#C9D92C",
  "#3FAE6B", "#2E9E96", "#2F86B5", "#2F6FC0", "#3A56B8", "#4442A8", "#4F3196", "#5C2483",
];

export const PhScale = () => (
  <Frame caption="The pH scale from 0 to 14 — acidic below 7, neutral at 7, basic above 7" viewBox="0 0 620 150">
    {PH_COLOURS.map((c, i) => (
      <g key={i}>
        <rect x={20 + i * 40} y={38} width={40} height={44} fill={c} />
        <text
          x={40 + i * 40}
          y={98}
          textAnchor="middle"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          fill={soft}
        >
          {i}
        </text>
      </g>
    ))}

    <text x={20} y={26} fontSize="13" fontWeight="600" fill="#D7263D">Acidic</text>
    <text x={320} y={26} textAnchor="middle" fontSize="13" fontWeight="600" fill="#3FAE6B">Neutral</text>
    <text x={600} y={26} textAnchor="end" fontSize="13" fontWeight="600" fill="#5C2483">Basic</text>

    <line x1={320} y1={32} x2={320} y2={88} stroke={ink} strokeWidth="2" />

    <text x={20} y={125} fontSize="12" fill={soft}>More H⁺ ions</text>
    <text x={600} y={125} textAnchor="end" fontSize="12" fill={soft}>More OH⁻ ions</text>
    <line x1={110} y1={121} x2={250} y2={121} stroke={line} strokeWidth="1.5" />
    <line x1={370} y1={121} x2={505} y2={121} stroke={line} strokeWidth="1.5" />

    <text x={300} y={142} textAnchor="middle" fontSize="11" fill={soft}>
      Lemon ≈ 2.2 · Coffee ≈ 5 · Saliva ≈ 7 · Soap ≈ 9.5
    </text>
  </Frame>
);

/* ------------------------ Types of reactions ---------------------- */

const box = (x: number, y: number, w: number, h: number, fill: string, stroke: string) => (
  <rect x={x} y={y} width={w} height={h} rx="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
);

export const ReactionTypes = () => {
  const rows = [
    { label: "Combination", a: "A", b: "B", c: "AB", d: "", colour: "hsl(var(--viridian))" },
    { label: "Decomposition", a: "AB", b: "", c: "A", d: "B", colour: "hsl(var(--saffron))" },
    { label: "Displacement", a: "A", b: "BC", c: "AC", d: "B", colour: "hsl(var(--cobalt))" },
    { label: "Double displacement", a: "AB", b: "CD", c: "AD", d: "CB", colour: "hsl(var(--magenta))" },
  ];

  return (
    <Frame caption="Four of the five reaction types, as rearrangements of A, B, C and D — redox, the fifth, is about electron transfer" viewBox="0 0 620 300">
      {rows.map((r, i) => {
        const y = 20 + i * 70;
        return (
          <g key={r.label}>
            <text x={4} y={y + 26} fontSize="13" fontWeight="600" fill={ink}>
              {r.label}
            </text>

            {box(180, y + 8, 46, 32, `color-mix(in srgb, ${r.colour} 12%, transparent)`, r.colour)}
            <text x={203} y={y + 29} textAnchor="middle" fontSize="14" fill={r.colour} fontWeight="600">{r.a}</text>

            {r.b && (
              <>
                <text x={238} y={y + 30} textAnchor="middle" fontSize="15" fill={soft}>+</text>
                {box(252, y + 8, 46, 32, `color-mix(in srgb, ${r.colour} 12%, transparent)`, r.colour)}
                <text x={275} y={y + 29} textAnchor="middle" fontSize="14" fill={r.colour} fontWeight="600">{r.b}</text>
              </>
            )}

            <line x1={315} y1={y + 24} x2={370} y2={y + 24} stroke={soft} strokeWidth="1.5" />
            {arrowHead(370, y + 24, 0, soft, 8)}

            {box(385, y + 8, 46, 32, `color-mix(in srgb, ${r.colour} 22%, transparent)`, r.colour)}
            <text x={408} y={y + 29} textAnchor="middle" fontSize="14" fill={r.colour} fontWeight="600">{r.c}</text>

            {r.d && (
              <>
                <text x={443} y={y + 30} textAnchor="middle" fontSize="15" fill={soft}>+</text>
                {box(457, y + 8, 46, 32, `color-mix(in srgb, ${r.colour} 22%, transparent)`, r.colour)}
                <text x={480} y={y + 29} textAnchor="middle" fontSize="14" fill={r.colour} fontWeight="600">{r.d}</text>
              </>
            )}

            {i < rows.length - 1 && (
              <line x1={4} y1={y + 56} x2={616} y2={y + 56} stroke={line} strokeWidth="1" />
            )}
          </g>
        );
      })}
    </Frame>
  );
};

/* ------------------------ Reactivity series ----------------------- */

export const ReactivitySeries = () => {
  const metals = [
    "K — Potassium", "Na — Sodium", "Ca — Calcium", "Mg — Magnesium", "Al — Aluminium",
    "Zn — Zinc", "Fe — Iron", "Pb — Lead", "(H) — Hydrogen", "Cu — Copper",
    "Hg — Mercury", "Ag — Silver", "Au — Gold",
  ];

  return (
    <Frame caption="The reactivity series — a metal can displace any metal below it from a salt solution" viewBox="0 0 320 450">
      <defs>
        <linearGradient id="react-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--crimson))" />
          <stop offset="55%" stopColor="hsl(var(--saffron))" />
          <stop offset="100%" stopColor="hsl(var(--cobalt))" />
        </linearGradient>
      </defs>
      <rect x={8} y={30} width={6} height={390} rx="3" fill="url(#react-grad)" />

      <text x={28} y={16} fontSize="11.5" fontWeight="600" fill="hsl(var(--crimson))">Most reactive</text>
      <text x={28} y={444} fontSize="11.5" fontWeight="600" fill="hsl(var(--cobalt))">Least reactive</text>

      {metals.map((m, i) => {
        const y = 44 + i * 27;
        const isH = m.startsWith("(H)");
        return (
          <g key={m}>
            <circle cx={11} cy={y - 4} r="3.5" fill="hsl(var(--background))" stroke={ink} strokeWidth="1.5" />
            <text
              x={28}
              y={y}
              fontSize="12.5"
              fill={isH ? soft : ink}
              fontStyle={isH ? "italic" : "normal"}
              fontFamily="ui-monospace, monospace"
            >
              {m}
            </text>
          </g>
        );
      })}
    </Frame>
  );
};

/* ------------------------- Electrolysis --------------------------- */

export const Electrolysis = () => {
  const tubes = [
    { x: 96, label: "H₂", name: "Hydrogen", gasTop: 62, colour: "hsl(var(--cobalt))", vol: "2 volumes" },
    { x: 262, label: "O₂", name: "Oxygen", gasTop: 106, colour: "hsl(var(--crimson))", vol: "1 volume" },
  ];
  const waterLine = 150;
  const beakerBottom = 268;

  return (
    <Frame
      caption="Electrolysis of water, acidified with a little dilute H₂SO₄ — twice as much hydrogen as oxygen is collected"
      viewBox="0 0 560 350"
    >
      {/* Beaker */}
      <path
        d={`M34 132 H386 V${beakerBottom - 14} a14 14 0 0 1 -14 14 H48 a14 14 0 0 1 -14 -14 Z`}
        fill="hsl(var(--cobalt) / 0.07)"
        stroke={line}
        strokeWidth="2"
      />
      <line x1={34} y1={waterLine} x2={386} y2={waterLine} stroke="hsl(var(--cobalt) / 0.35)" strokeWidth="1.5" />

      {tubes.map((t) => (
        <g key={t.label}>
          {/* Inverted test tube */}
          <path
            d={`M${t.x} 44 H${t.x + 58} V196 a29 29 0 0 1 -58 0 Z`}
            fill="hsl(var(--background))"
            stroke={line}
            strokeWidth="2"
          />
          {/* Collected gas column */}
          <rect
            x={t.x + 4}
            y={t.gasTop}
            width={50}
            height={waterLine - t.gasTop}
            fill={`color-mix(in srgb, ${t.colour} 20%, transparent)`}
          />
          {/* Volume label sits inside its own gas column, so nothing collides */}
          <text x={t.x + 29} y={(t.gasTop + waterLine) / 2 + 4} textAnchor="middle" fontSize="11" fill={soft}>
            {t.vol}
          </text>

          {/* Gas name above the tube */}
          <text x={t.x + 29} y={20} textAnchor="middle" fontSize="11" fill={soft}>{t.name}</text>
          <text x={t.x + 29} y={38} textAnchor="middle" fontSize="15" fontWeight="600" fill={t.colour}>{t.label}</text>

          {/* Electrode: from inside the tube down through the beaker base */}
          <rect x={t.x + 24} y={162} width={10} height={138} rx="2" fill={soft} />
        </g>
      ))}

      {/* Electrode labels sit beside each rod, clear of the wiring below */}
      <text x={112} y={292} textAnchor="end" fontSize="11.5" fill="hsl(var(--cobalt))">Cathode −</text>
      <text x={304} y={292} textAnchor="start" fontSize="11.5" fill="hsl(var(--crimson))">Anode +</text>

      {/* Wiring to the battery, on two levels so the runs never cross */}
      <polyline points="125,300 125,334 452,334 452,262" fill="none" stroke={soft} strokeWidth="1.5" />
      <polyline points="291,300 291,318 490,318 490,262" fill="none" stroke={soft} strokeWidth="1.5" />

      <g transform="translate(424, 216)">
        <rect x={0} y={0} width={100} height={46} rx="5" fill="hsl(var(--muted))" stroke={line} strokeWidth="1.5" />
        <text x={50} y={29} textAnchor="middle" fontSize="14" fill={ink}>6 V</text>
      </g>
    </Frame>
  );
};

/* ---------------------------- Redox ------------------------------- */

export const RedoxDiagram = () => (
  <Frame caption="Oxidation and reduction always happen together — CuO + H₂ → Cu + H₂O" viewBox="0 0 580 210">
    <text x={40} y={110} fontSize="20" fontFamily="ui-monospace, monospace" fill={ink}>CuO</text>
    <text x={100} y={110} fontSize="20" fill={soft}>+</text>
    <text x={128} y={110} fontSize="20" fontFamily="ui-monospace, monospace" fill={ink}>H₂</text>
    <line x1={178} y1={104} x2={240} y2={104} stroke={soft} strokeWidth="1.5" />
    {arrowHead(240, 104, 0, soft)}
    <text x={258} y={110} fontSize="20" fontFamily="ui-monospace, monospace" fill={ink}>Cu</text>
    <text x={310} y={110} fontSize="20" fill={soft}>+</text>
    <text x={338} y={110} fontSize="20" fontFamily="ui-monospace, monospace" fill={ink}>H₂O</text>

    <path d="M58 92 C 100 40, 240 40, 278 92" fill="none" stroke="hsl(var(--cobalt))" strokeWidth="2" />
    {arrowHead(278, 92, 54, "hsl(var(--cobalt))")}
    <text x={168} y={38} textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--cobalt))">
      Reduction — loses oxygen
    </text>

    <path d="M140 122 C 190 178, 320 178, 358 122" fill="none" stroke="hsl(var(--crimson))" strokeWidth="2" />
    {arrowHead(358, 122, -56, "hsl(var(--crimson))")}
    <text x={249} y={196} textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--crimson))">
      Oxidation — gains oxygen
    </text>

    <text x={430} y={86} fontSize="12.5" fill={soft}>
      <tspan fontWeight="600" fill="hsl(var(--cobalt))">CuO</tspan> is the oxidising agent
    </text>
    <text x={430} y={128} fontSize="12.5" fill={soft}>
      <tspan fontWeight="600" fill="hsl(var(--crimson))">H₂</tspan> is the reducing agent
    </text>
  </Frame>
);

/* --------------------------- Rusting ------------------------------ */

export const Rusting = () => (
  <Frame caption="Rusting needs both air and moisture — remove either and iron does not rust" viewBox="0 0 560 190">
    {[
      { x: 0, label: "Water + air", rusts: true, water: true, note: "Rusts" },
      { x: 190, label: "Boiled water,\nno air", rusts: false, water: true, note: "No rust" },
      { x: 380, label: "Dry air\n(CaCl₂)", rusts: false, water: false, note: "No rust" },
    ].map((t, i) => (
      <g key={i} transform={`translate(${t.x + 40}, 0)`}>
        <rect x={0} y={20} width={64} height={104} rx="6" fill="hsl(var(--muted))" stroke={line} strokeWidth="1.5" />
        {t.water && <rect x={6} y={60} width={52} height={58} fill="hsl(var(--cobalt) / 0.16)" />}

        <rect x={27} y={44} width={10} height={64} rx="2" fill={t.rusts ? "hsl(var(--copper))" : soft} />

        <text x={32} y={146} textAnchor="middle" fontSize="12" fill={soft}>
          {t.label.split("\n").map((l, li) => (
            <tspan key={li} x={32} dy={li === 0 ? 0 : 14}>{l}</tspan>
          ))}
        </text>
        <text
          x={32}
          y={14}
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="600"
          fill={t.rusts ? "hsl(var(--copper))" : "hsl(var(--viridian))"}
        >
          {t.note}
        </text>
      </g>
    ))}
  </Frame>
);

/* ------------------- Exothermic vs endothermic -------------------- */

export const EnergyDiagram = () => (
  <Frame caption="Energy change in exothermic and endothermic reactions" viewBox="0 0 620 230">
    {[
      { x: 0, title: "Exothermic", colour: "hsl(var(--crimson))", from: 62, to: 140, note: "Heat given out" },
      { x: 330, title: "Endothermic", colour: "hsl(var(--cobalt))", from: 140, to: 62, note: "Heat taken in" },
    ].map((d) => (
      <g key={d.title} transform={`translate(${d.x}, 0)`}>
        <text x={34} y={18} fontSize="13.5" fontWeight="600" fill={d.colour}>{d.title}</text>

        {/* Axes — kept inside the panel so the two never collide */}
        <line x1={34} y1={32} x2={34} y2={172} stroke={line} strokeWidth="1.5" />
        <line x1={34} y1={172} x2={252} y2={172} stroke={line} strokeWidth="1.5" />
        <text
          x={16}
          y={102}
          fontSize="11"
          fill={soft}
          textAnchor="middle"
          transform="rotate(-90, 16, 102)"
        >
          Energy
        </text>

        {/* Levels */}
        <line x1={50} y1={d.from} x2={118} y2={d.from} stroke={d.colour} strokeWidth="2.5" />
        <text x={50} y={d.from - 9} fontSize="11.5" fill={soft}>Reactants</text>

        <line x1={166} y1={d.to} x2={234} y2={d.to} stroke={d.colour} strokeWidth="2.5" />
        <text x={166} y={d.to - 9} fontSize="11.5" fill={soft}>Products</text>

        <path
          d={`M118 ${d.from} C 136 ${d.from}, 148 ${d.to}, 166 ${d.to}`}
          fill="none"
          stroke={d.colour}
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* ΔH arrow, inside the panel */}
        <line x1={258} y1={d.from} x2={258} y2={d.to} stroke={d.colour} strokeWidth="1.5" />
        {arrowHead(258, d.to, d.to > d.from ? 90 : -90, d.colour, 8)}

        {/* Caption below the axis — never overlaps the plot or the other panel */}
        <text x={143} y={196} textAnchor="middle" fontSize="12" fontWeight="600" fill={d.colour}>
          {d.note}
        </text>
      </g>
    ))}
  </Frame>
);

/* ------------------------ Periodic trends -------------------------- */

/** Shared by the Class 11 "Classification & Periodicity" notes. */
export const PeriodicTrends = () => {
  const rows: { label: string; note?: string; period: "up" | "down"; group: "up" | "down" }[] = [
    { label: "Atomic radius", period: "down", group: "up" },
    { label: "Ionisation enthalpy", period: "up", group: "down" },
    { label: "Electron gain enthalpy", note: "(more negative)", period: "up", group: "down" },
    { label: "Electronegativity", period: "up", group: "down" },
  ];

  const upColour = "hsl(var(--crimson))";
  const downColour = "hsl(var(--cobalt))";

  const trendArrow = (cx: number, cy: number, direction: "up" | "down") => {
    const colour = direction === "up" ? upColour : downColour;
    const tipY = direction === "up" ? cy - 16 : cy + 16;
    return (
      <g>
        <line x1={cx} y1={direction === "up" ? cy + 16 : cy - 16} x2={cx} y2={tipY} stroke={colour} strokeWidth="2.5" />
        {arrowHead(cx, tipY, direction === "up" ? -90 : 90, colour, 7)}
      </g>
    );
  };

  return (
    <Frame caption="How four periodic properties change across a period and down a group" viewBox="0 0 480 320">
      <text x={255} y={22} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={ink}>Across a period →</text>
      <text x={400} y={22} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={ink}>Down a group ↓</text>

      {rows.map((r, i) => {
        const y = 62 + i * 62;
        return (
          <g key={r.label}>
            <text x={4} y={y + 4} fontSize="13" fontWeight="600" fill={ink}>{r.label}</text>
            {r.note && (
              <text x={4} y={y + 19} fontSize="10.5" fill={soft}>{r.note}</text>
            )}

            {trendArrow(255, y, r.period)}
            <text x={255} y={y + 36} textAnchor="middle" fontSize="11" fill={r.period === "up" ? upColour : downColour}>
              {r.period === "up" ? "increases" : "decreases"}
            </text>

            {trendArrow(400, y, r.group)}
            <text x={400} y={y + 36} textAnchor="middle" fontSize="11" fill={r.group === "up" ? upColour : downColour}>
              {r.group === "up" ? "increases" : "decreases"}
            </text>

            {i < rows.length - 1 && (
              <line x1={4} y1={y + 46} x2={476} y2={y + 46} stroke={line} strokeWidth="1" />
            )}
          </g>
        );
      })}
    </Frame>
  );
};

/* ------------------------- Neutralisation ------------------------- */

export const Neutralisation = () => (
  <Frame caption="Neutralisation — an acid and a base give a salt and water" viewBox="0 0 580 160">
    {[
      { x: 10, label: "Acid", sub: "HCl", colour: "hsl(var(--crimson))" },
      { x: 160, label: "Base", sub: "NaOH", colour: "hsl(var(--cobalt))" },
    ].map((d) => (
      <g key={d.label}>
        <rect x={d.x} y={40} width={110} height={62} rx="6" fill={`color-mix(in srgb, ${d.colour} 12%, transparent)`} stroke={d.colour} strokeWidth="1.5" />
        <text x={d.x + 55} y={66} textAnchor="middle" fontSize="13" fontWeight="600" fill={d.colour}>{d.label}</text>
        <text x={d.x + 55} y={88} textAnchor="middle" fontSize="14" fontFamily="ui-monospace, monospace" fill={ink}>{d.sub}</text>
      </g>
    ))}
    <text x={140} y={78} textAnchor="middle" fontSize="20" fill={soft}>+</text>

    <line x1={285} y1={71} x2={345} y2={71} stroke={soft} strokeWidth="1.5" />
    {arrowHead(345, 71, 0, soft)}

    {[
      { x: 360, label: "Salt", sub: "NaCl", colour: "hsl(var(--viridian))" },
      { x: 485, label: "Water", sub: "H₂O", colour: "hsl(var(--cyanine))" },
    ].map((d) => (
      <g key={d.label}>
        <rect x={d.x} y={40} width={85} height={62} rx="6" fill={`color-mix(in srgb, ${d.colour} 14%, transparent)`} stroke={d.colour} strokeWidth="1.5" />
        <text x={d.x + 42} y={66} textAnchor="middle" fontSize="13" fontWeight="600" fill={d.colour}>{d.label}</text>
        <text x={d.x + 42} y={88} textAnchor="middle" fontSize="14" fontFamily="ui-monospace, monospace" fill={ink}>{d.sub}</text>
      </g>
    ))}
    <text x={455} y={78} textAnchor="middle" fontSize="20" fill={soft}>+</text>

    <text x={290} y={135} textAnchor="middle" fontSize="12" fill={soft}>
      H⁺ from the acid joins OH⁻ from the base to make water
    </text>
  </Frame>
);

/* ------------------------- Chlor-alkali --------------------------- */

export const ChlorAlkali = () => (
  <Frame caption="The chlor-alkali process — electrolysis of brine gives three useful products" viewBox="-34 0 594 280">
    <rect x={120} y={72} width={260} height={122} rx="8" fill="hsl(var(--cyanine) / 0.08)" stroke={line} strokeWidth="2" />

    {/* Electrodes stop short of the base so the labels below stay clear */}
    <rect x={176} y={92} width={11} height={84} fill={soft} />
    <rect x={313} y={92} width={11} height={84} fill={soft} />

    {/* Labels sit below the tank, not on its edge */}
    <text x={181} y={216} textAnchor="middle" fontSize="11.5" fill="hsl(var(--cobalt))">Cathode −</text>
    <text x={318} y={216} textAnchor="middle" fontSize="11.5" fill="hsl(var(--crimson))">Anode +</text>
    <text x={250} y={244} textAnchor="middle" fontSize="12.5" fill={soft}>Brine — concentrated NaCl(aq)</text>

    {[
      { x: 181, label: "H₂", colour: "hsl(var(--cobalt))", note: "Hydrogen" },
      { x: 318, label: "Cl₂", colour: "hsl(var(--viridian))", note: "Chlorine" },
    ].map((p) => (
      <g key={p.label}>
        <line x1={p.x} y1={90} x2={p.x} y2={52} stroke={p.colour} strokeWidth="1.5" strokeDasharray="3 3" />
        {arrowHead(p.x, 46, -90, p.colour)}
        <text x={p.x} y={36} textAnchor="middle" fontSize="15" fontWeight="600" fill={p.colour}>{p.label}</text>
        <text x={p.x} y={19} textAnchor="middle" fontSize="11" fill={soft}>{p.note}</text>
      </g>
    ))}

    <line x1={118} y1={133} x2={74} y2={133} stroke="hsl(var(--magenta))" strokeWidth="1.5" strokeDasharray="3 3" />
    {arrowHead(68, 133, 180, "hsl(var(--magenta))")}
    <text x={60} y={129} textAnchor="end" fontSize="14" fontWeight="600" fill="hsl(var(--magenta))">NaOH</text>
    <text x={60} y={146} textAnchor="end" fontSize="11" fill={soft}>Caustic soda</text>
  </Frame>
);

/* ---------------------- Extraction by reactivity -------------------- */

export const ActivitySeriesExtraction = () => {
  const tiers = [
    { label: "Top of the series", metals: "K, Na, Ca, Mg, Al", method: "Electrolytic reduction of molten ore", colour: "hsl(var(--crimson))" },
    { label: "Middle of the series", metals: "Fe, Zn, Pb, Cu", method: "Roast/calcine to oxide, reduce with carbon", colour: "hsl(var(--saffron))" },
    { label: "Bottom of the series", metals: "Hg, Ag", method: "Heating the ore in air is enough", colour: "hsl(var(--cobalt))" },
  ];

  return (
    <Frame caption="Extraction method depends on where the metal sits in the reactivity series" viewBox="0 0 580 230">
      {tiers.map((t, i) => {
        const y = 20 + i * 68;
        return (
          <g key={t.label}>
            {box(4, y, 150, 46, `color-mix(in srgb, ${t.colour} 12%, transparent)`, t.colour)}
            <text x={79} y={y + 20} textAnchor="middle" fontSize="12" fontWeight="600" fill={t.colour}>{t.label}</text>
            <text x={79} y={y + 36} textAnchor="middle" fontSize="10.5" fill={soft}>{t.metals}</text>

            <line x1={158} y1={y + 23} x2={196} y2={y + 23} stroke={soft} strokeWidth="1.5" />
            {arrowHead(196, y + 23, 0, soft, 7)}

            <text x={208} y={y + 27} fontSize="12" fill={ink}>{t.method}</text>

            {i < tiers.length - 1 && <line x1={4} y1={y + 58} x2={576} y2={y + 58} stroke={line} strokeWidth="1" />}
          </g>
        );
      })}
    </Frame>
  );
};

/* ----------------------- Electrolytic refining ----------------------- */

export const ElectrolyticRefining = () => (
  <Frame caption="Electrolytic refining — the impure anode dissolves and pure metal deposits on the cathode, leaving anode mud behind" viewBox="0 0 480 250">
    {/* Cell */}
    <path
      d="M40 70 H440 V196 a14 14 0 0 1 -14 14 H54 a14 14 0 0 1 -14 -14 Z"
      fill="hsl(var(--cobalt) / 0.07)"
      stroke={line}
      strokeWidth="2"
    />

    {/* Anode (impure) */}
    <rect x={120} y={54} width={22} height={130} rx="2" fill="hsl(var(--saffron) / 0.35)" stroke="hsl(var(--saffron))" strokeWidth="2" />
    <text x={131} y={40} textAnchor="middle" fontSize="11.5" fill="hsl(var(--saffron))" fontWeight="600">Anode +</text>
    <text x={131} y={202} textAnchor="middle" fontSize="10.5" fill={soft}>Impure metal</text>

    {/* Cathode (pure) */}
    <rect x={338} y={54} width={22} height={130} rx="2" fill="hsl(var(--cobalt) / 0.35)" stroke="hsl(var(--cobalt))" strokeWidth="2" />
    <text x={349} y={40} textAnchor="middle" fontSize="11.5" fill="hsl(var(--cobalt))" fontWeight="600">Cathode −</text>
    <text x={349} y={202} textAnchor="middle" fontSize="10.5" fill={soft}>Pure metal</text>

    {/* Anode mud, settled beneath the anode */}
    <ellipse cx={131} cy={190} rx={16} ry={5} fill="hsl(var(--muted-foreground) / 0.6)" />
    <text x={131} y={222} textAnchor="middle" fontSize="9.5" fill={soft}>Anode mud</text>

    {/* Wiring + battery */}
    <polyline points="131,54 131,20 349,20 349,54" fill="none" stroke={soft} strokeWidth="1.5" />
    <g transform="translate(190, 2)">
      <rect x={0} y={2} width={100} height={30} rx="5" fill="hsl(var(--muted))" stroke={line} strokeWidth="1.5" />
      <text x={50} y={23} textAnchor="middle" fontSize="12" fill={ink}>Battery</text>
    </g>
  </Frame>
);

/* ------------------------- Esterification --------------------------- */

export const Esterification = () => {
  const c = "hsl(var(--viridian))";
  return (
    <Frame caption="Esterification — a carboxylic acid and an alcohol condense, with an acid catalyst, into a sweet-smelling ester and water" viewBox="0 0 640 110">
      {box(10, 30, 140, 44, `color-mix(in srgb, ${c} 12%, transparent)`, c)}
      <text x={80} y={57} textAnchor="middle" fontSize="13" fontWeight="600" fill={c}>Carboxylic acid</text>

      <text x={162} y={58} textAnchor="middle" fontSize="16" fill={soft}>+</text>

      {box(176, 30, 110, 44, `color-mix(in srgb, ${c} 12%, transparent)`, c)}
      <text x={231} y={57} textAnchor="middle" fontSize="13" fontWeight="600" fill={c}>Alcohol</text>

      <line x1={296} y1={52} x2={366} y2={52} stroke={soft} strokeWidth="1.5" />
      {arrowHead(366, 52, 0, soft, 8)}
      <text x={331} y={38} textAnchor="middle" fontSize="10.5" fill={soft}>conc. H₂SO₄</text>

      {box(380, 30, 100, 44, `color-mix(in srgb, ${c} 24%, transparent)`, c)}
      <text x={430} y={57} textAnchor="middle" fontSize="13" fontWeight="600" fill={c}>Ester</text>

      <text x={490} y={58} textAnchor="middle" fontSize="16" fill={soft}>+</text>

      {box(504, 30, 90, 44, `color-mix(in srgb, ${c} 24%, transparent)`, c)}
      <text x={549} y={57} textAnchor="middle" fontSize="13" fontWeight="600" fill={c}>Water</text>

      <text x={320} y={92} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill={soft}>
        CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O
      </text>
    </Frame>
  );
};

/* ----------------------------- Micelle -------------------------------- */

export const Micelle = () => {
  const n = 10;
  const cx = 150;
  const cy = 140;
  const innerR = 34;
  const tailLen = 30;
  const soapMolecules = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI;
    return {
      tailStartX: cx + innerR * Math.cos(angle),
      tailStartY: cy + innerR * Math.sin(angle),
      headX: cx + (innerR + tailLen) * Math.cos(angle),
      headY: cy + (innerR + tailLen) * Math.sin(angle),
    };
  });

  return (
    <Frame caption="A micelle — hydrophobic tails point inward to trap oily dirt, hydrophilic heads face outward into the water" viewBox="0 0 300 300">
      <circle cx={cx} cy={cy} r={30} fill="hsl(var(--saffron) / 0.35)" stroke="hsl(var(--saffron))" strokeWidth="1.5" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill="hsl(var(--saffron))">Oil / dirt</text>

      {soapMolecules.map((s, i) => (
        <g key={i}>
          <line x1={s.tailStartX} y1={s.tailStartY} x2={s.headX} y2={s.headY} stroke={soft} strokeWidth="2" />
          <circle cx={s.headX} cy={s.headY} r={7} fill="hsl(var(--cobalt))" />
        </g>
      ))}

      <circle cx={70} cy={264} r={5} fill="hsl(var(--cobalt))" />
      <text x={82} y={268} fontSize="10.5" fill={soft}>Hydrophilic head (water-loving)</text>
      <line x1={64} y1={286} x2={76} y2={286} stroke={soft} strokeWidth="2" />
      <text x={82} y={290} fontSize="10.5" fill={soft}>Hydrophobic tail (oil-loving)</text>
    </Frame>
  );
};

/* --------------------------- Combustion ------------------------------- */

const flame = (colour: string) => (
  <path
    d="M0 45 C 18 30, 20 8, 6 -45 C 2 -20, -10 -8, -10 12 C -10 26, -6 34, 0 45 Z"
    fill={`color-mix(in srgb, ${colour} 45%, transparent)`}
    stroke={colour}
    strokeWidth="1.5"
  />
);

export const Combustion = () => {
  const panels = [
    { x: 0, title: "Saturated hydrocarbons", note: "Clean, blue flame", colour: "hsl(var(--cobalt))" },
    { x: 300, title: "Unsaturated / carbon-rich", note: "Sooty, yellow flame", colour: "hsl(var(--saffron))" },
  ];

  return (
    <Frame caption="Saturated hydrocarbons burn with a clean blue flame; unsaturated or carbon-rich compounds burn with a sooty yellow flame" viewBox="0 0 600 220">
      <line x1={300} y1={16} x2={300} y2={204} stroke={line} strokeWidth="1" />
      {panels.map((p) => (
        <g key={p.title} transform={`translate(${p.x}, 0)`}>
          <text x={150} y={26} textAnchor="middle" fontSize="13" fontWeight="600" fill={ink}>{p.title}</text>
          <g transform="translate(150, 130)">{flame(p.colour)}</g>
          <text x={150} y={205} textAnchor="middle" fontSize="12" fontWeight="600" fill={p.colour}>{p.note}</text>
        </g>
      ))}
    </Frame>
  );
};

/* ------------------------- States of matter ------------------------- */

export const StatesOfMatter = () => {
  const panels: { title: string; note: string; colour: string; kind: "solid" | "liquid" | "gas" }[] = [
    { title: "Solid", note: "Fixed shape & volume", colour: "hsl(var(--cobalt))", kind: "solid" },
    { title: "Liquid", note: "Fixed volume, no fixed shape", colour: "hsl(var(--viridian))", kind: "liquid" },
    { title: "Gas", note: "No fixed shape or volume", colour: "hsl(var(--crimson))", kind: "gas" },
  ];

  // Deterministic "random" offsets for the liquid/gas panels, so particles
  // look natural without the SVG changing on every render.
  const jitter = (seed: number) => ((seed * 47) % 23) - 11;

  return (
    <Frame caption="Particle arrangement in a solid, a liquid and a gas" viewBox="0 0 600 240">
      {panels.map((p, pi) => {
        const ox = pi * 200;
        const dots: { x: number; y: number }[] = [];
        if (p.kind === "solid") {
          for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) dots.push({ x: 30 + c * 30, y: 60 + r * 30 });
          }
        } else if (p.kind === "liquid") {
          for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
              const i = r * 4 + c;
              dots.push({ x: 30 + c * 30 + jitter(i), y: 60 + r * 30 + jitter(i + 5) });
            }
          }
        } else {
          for (let i = 0; i < 10; i++) {
            dots.push({ x: 20 + ((i * 53) % 140), y: 45 + ((i * 37) % 130) });
          }
        }
        return (
          <g key={p.title} transform={`translate(${ox}, 0)`}>
            <text x={100} y={20} textAnchor="middle" fontSize="14" fontWeight="600" fill={p.colour}>
              {p.title}
            </text>
            <rect x={10} y={34} width={180} height={168} rx="6" fill="hsl(var(--muted) / 0.4)" stroke={line} strokeWidth="1.5" />
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={p.kind === "solid" ? 7 : 6} fill={p.colour} />
            ))}
            <text x={100} y={222} textAnchor="middle" fontSize="11" fill={soft}>{p.note}</text>
            {pi < panels.length - 1 && (
              <line x1={200} y1={20} x2={200} y2={220} stroke={line} strokeWidth="1" />
            )}
          </g>
        );
      })}
    </Frame>
  );
};

/* -------------------- Interconversion of states --------------------- */

export const InterconversionOfStates = () => {
  const stateColour = "hsl(var(--cobalt))";
  const nodes = [
    { x: 80, label: "Solid" },
    { x: 300, label: "Liquid" },
    { x: 520, label: "Gas" },
  ];

  return (
    <Frame caption="How matter changes state — the name of each change depends on its direction" viewBox="0 0 600 220">
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={110} r={44} fill={`color-mix(in srgb, ${stateColour} 12%, transparent)`} stroke={stateColour} strokeWidth="2" />
          <text x={n.x} y={116} textAnchor="middle" fontSize="15" fontWeight="600" fill={stateColour}>{n.label}</text>
        </g>
      ))}

      {/* Solid <-> Liquid */}
      <line x1={128} y1={98} x2={252} y2={98} stroke={soft} strokeWidth="1.5" />
      {arrowHead(252, 98, 0, soft, 7)}
      <text x={190} y={86} textAnchor="middle" fontSize="11" fill={soft}>Melting</text>
      <line x1={252} y1={122} x2={128} y2={122} stroke={soft} strokeWidth="1.5" />
      {arrowHead(128, 122, 180, soft, 7)}
      <text x={190} y={142} textAnchor="middle" fontSize="11" fill={soft}>Freezing</text>

      {/* Liquid <-> Gas */}
      <line x1={348} y1={98} x2={472} y2={98} stroke={soft} strokeWidth="1.5" />
      {arrowHead(472, 98, 0, soft, 7)}
      <text x={410} y={86} textAnchor="middle" fontSize="11" fill={soft}>Boiling / evaporation</text>
      <line x1={472} y1={122} x2={348} y2={122} stroke={soft} strokeWidth="1.5" />
      {arrowHead(348, 122, 180, soft, 7)}
      <text x={410} y={142} textAnchor="middle" fontSize="11" fill={soft}>Condensation</text>

      {/* Solid <-> Gas, arcing above */}
      <path d="M96 68 C 220 -10, 380 -10, 504 68" fill="none" stroke="hsl(var(--saffron))" strokeWidth="1.5" strokeDasharray="4 3" />
      {arrowHead(504, 68, 42, "hsl(var(--saffron))", 7)}
      <path d="M504 68 C 380 -10, 220 -10, 96 68" fill="none" stroke="hsl(var(--saffron))" strokeWidth="1.5" strokeDasharray="4 3" transform="translate(0, 18)" />
      {arrowHead(96, 86, -138, "hsl(var(--saffron))", 7)}
      <text x={300} y={20} textAnchor="middle" fontSize="11" fontWeight="600" fill="hsl(var(--saffron))">
        Sublimation (solid → gas) · Deposition (gas → solid)
      </text>

      <text x={300} y={200} textAnchor="middle" fontSize="11" fill={soft}>
        Heating drives changes to the right; cooling drives changes to the left
      </text>
    </Frame>
  );
};

/* ---------------------------- Tyndall effect -------------------------- */

export const TyndallEffect = () => {
  const panel = (x: number, title: string, scattered: boolean, colour: string) => (
    <g transform={`translate(${x}, 0)`}>
      <text x={120} y={18} textAnchor="middle" fontSize="13.5" fontWeight="600" fill={colour}>{title}</text>
      <rect x={30} y={34} width={180} height={150} rx="6" fill={`color-mix(in srgb, ${colour} 10%, transparent)`} stroke={line} strokeWidth="1.5" />

      {/* Torch */}
      <rect x={-6} y={98} width={26} height={20} rx="2" fill={soft} />
      <text x={7} y={132} textAnchor="middle" fontSize="9.5" fill={soft}>Light</text>

      {scattered ? (
        <>
          <line x1={20} y1={108} x2={210} y2={108} stroke={colour} strokeWidth="3" opacity="0.85" />
          {Array.from({ length: 5 }, (_, i) => {
            const cx = 60 + i * 32;
            return <circle key={i} cx={cx} cy={108} r={16} fill="none" stroke={colour} strokeWidth="1.2" opacity="0.55" />;
          })}
          <text x={120} y={200} textAnchor="middle" fontSize="11" fontWeight="600" fill={colour}>Path of light is visible</text>
        </>
      ) : (
        <>
          <line x1={20} y1={108} x2={210} y2={108} stroke={colour} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <text x={120} y={200} textAnchor="middle" fontSize="11" fontWeight="600" fill={colour}>Path of light is invisible</text>
        </>
      )}
    </g>
  );

  return (
    <Frame caption="The Tyndall effect — colloidal particles scatter light; the particles in a true solution are too small to" viewBox="0 0 480 220">
      {panel(0, "True solution", false, "hsl(var(--cobalt))")}
      {panel(240, "Colloid", true, "hsl(var(--saffron))")}
    </Frame>
  );
};

/* --------------------------- Separating funnel ------------------------ */

export const SeparatingFunnel = () => (
  <Frame caption="A separating funnel — the denser liquid is drained off first, through the stopcock at the bottom" viewBox="0 0 320 340">
    {/* Stand + clamp (simple) */}
    <line x1={20} y1={20} x2={20} y2={320} stroke={soft} strokeWidth="3" />
    <line x1={20} y1={60} x2={70} y2={60} stroke={soft} strokeWidth="3" />

    {/* Funnel body: cylindrical top, conical bottom */}
    <path
      d="M100 30 H220 V150 L160 250 L100 150 Z"
      fill="none"
      stroke={line}
      strokeWidth="2"
    />
    {/* Oil layer (top, less dense) */}
    <path d="M102 60 H218 V150 L163 205 H157 L102 150 Z" fill="hsl(var(--saffron) / 0.4)" />
    {/* Water layer (bottom, denser) */}
    <path d="M102 150 H218 V150 L160 248 L102 150 Z" fill="hsl(var(--cobalt) / 0.4)" />

    <text x={252} y={95} fontSize="12" fill="hsl(var(--saffron))" fontWeight="600">Oil</text>
    <text x={252} y={112} fontSize="10" fill={soft}>(less dense)</text>
    <text x={252} y={190} fontSize="12" fill="hsl(var(--cobalt))" fontWeight="600">Water</text>
    <text x={252} y={207} fontSize="10" fill={soft}>(denser)</text>

    {/* Stopper */}
    <rect x={148} y={16} width={24} height={16} rx="2" fill="hsl(var(--muted))" stroke={line} strokeWidth="1.5" />

    {/* Stem + stopcock */}
    <rect x={152} y={250} width={16} height={40} fill="hsl(var(--background))" stroke={line} strokeWidth="2" />
    <rect x={144} y={262} width={32} height={14} rx="3" fill="hsl(var(--muted))" stroke={soft} strokeWidth="1.5" />
    <text x={200} y={271} fontSize="11" fill={soft}>Stopcock</text>
    <line x1={160} y1={290} x2={160} y2={312} stroke={line} strokeWidth="2" />

    {/* Receiving beaker */}
    <path d="M120 312 H200 V326 a6 6 0 0 1 -6 6 H126 a6 6 0 0 1 -6 -6 Z" fill="none" stroke={line} strokeWidth="2" />
  </Frame>
);

/* ------------------------------ Bohr model ----------------------------- */

export const BohrModel = () => {
  const shells = [
    { r: 40, n: 2, label: "K (n=1)", colour: "hsl(var(--cobalt))" },
    { r: 70, n: 8, label: "L (n=2)", colour: "hsl(var(--viridian))" },
    { r: 100, n: 1, label: "M (n=3)", colour: "hsl(var(--saffron))" },
  ];
  const cx = 150;
  const cy = 150;

  return (
    <Frame caption="Bohr's model — electrons occupy fixed shells around the nucleus; sodium (2, 8, 1) is shown" viewBox="0 0 420 300">
      {shells.map((s) => (
        <g key={`ring-${s.label}`}>
          <circle cx={cx} cy={cy} r={s.r} fill="none" stroke={s.colour} strokeWidth="1.5" strokeDasharray="3 3" />
          {Array.from({ length: s.n }, (_, i) => {
            const angle = (i / s.n) * 2 * Math.PI - Math.PI / 2;
            const ex = cx + s.r * Math.cos(angle);
            const ey = cy + s.r * Math.sin(angle);
            return <circle key={i} cx={ex} cy={ey} r={5} fill={s.colour} />;
          })}
        </g>
      ))}

      {/* Nucleus */}
      <circle cx={cx} cy={cy} r={16} fill="hsl(var(--crimson))" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(var(--background))">
        11p⁺
      </text>

      {/* Legend, placed clear of the rings */}
      <g transform="translate(300, 60)">
        {shells.map((s, i) => (
          <g key={s.label} transform={`translate(0, ${i * 24})`}>
            <circle cx={6} cy={0} r={5} fill={s.colour} />
            <text x={18} y={4} fontSize="11.5" fontWeight="600" fill={s.colour}>{s.label}: {s.n} e⁻</text>
          </g>
        ))}
        <text x={0} y={90} fontSize="11" fill={soft}>Max per shell = 2n²</text>
        <text x={0} y={106} fontSize="11" fill={soft}>Outermost shell ≤ 8</text>
      </g>
    </Frame>
  );
};

/* ---------------------------- Galvanic cell ---------------------------- */

export const GalvanicCell = () => {
  const zincColour = "hsl(var(--saffron))";
  const copperColour = "hsl(var(--copper))";

  return (
    <Frame
      caption="A zinc–copper galvanic (Daniell) cell — oxidation at the zinc anode, reduction at the copper cathode"
      viewBox="0 0 560 300"
    >
      {/* Two beakers */}
      {[
        { x: 30, colour: zincColour, metal: "Zn", solution: "ZnSO₄(aq)", role: "Anode (−)", half: "Zn → Zn²⁺ + 2e⁻" },
        { x: 330, colour: copperColour, metal: "Cu", solution: "CuSO₄(aq)", role: "Cathode (+)", half: "Cu²⁺ + 2e⁻ → Cu" },
      ].map((b) => (
        <g key={b.metal}>
          <path
            d={`M${b.x} 90 H${b.x + 200} V${222} a14 14 0 0 1 -14 14 H${b.x + 14} a14 14 0 0 1 -14 -14 Z`}
            fill={`color-mix(in srgb, ${b.colour} 8%, transparent)`}
            stroke={line}
            strokeWidth="2"
          />
          <line x1={b.x} y1={140} x2={b.x + 200} y2={140} stroke={`color-mix(in srgb, ${b.colour} 35%, transparent)`} strokeWidth="1.5" />
          <rect x={b.x + 90} y={60} width={20} height={130} rx="2" fill={`color-mix(in srgb, ${b.colour} 55%, transparent)`} stroke={b.colour} strokeWidth="2" />
          <text x={b.x + 100} y={50} textAnchor="middle" fontSize="13" fontWeight="600" fill={b.colour}>{b.metal}</text>
          <text x={b.x + 100} y={240} textAnchor="middle" fontSize="11.5" fill={soft}>{b.solution}</text>
          <text x={b.x + 100} y={256} textAnchor="middle" fontSize="11" fontWeight="600" fill={b.colour}>{b.role}</text>
          <text x={b.x + 100} y={280} textAnchor="middle" fontSize="10.5" fontFamily="ui-monospace, monospace" fill={ink}>{b.half}</text>
        </g>
      ))}

      {/* Salt bridge */}
      <path d="M180 100 C 220 40, 340 40, 380 100" fill="none" stroke={soft} strokeWidth="10" strokeLinecap="round" />
      <path d="M180 100 C 220 40, 340 40, 380 100" fill="none" stroke="hsl(var(--background))" strokeWidth="6" strokeLinecap="round" />
      <text x={280} y={34} textAnchor="middle" fontSize="11" fill={soft}>Salt bridge</text>
      <text x={280} y={70} textAnchor="middle" fontSize="10" fill={soft}>Anions ← · → Cations</text>

      {/* External wire + voltmeter */}
      <polyline points="130,60 130,20 430,20 430,60" fill="none" stroke={ink} strokeWidth="1.5" />
      <circle cx={280} cy={20} r={16} fill="hsl(var(--background))" stroke={ink} strokeWidth="1.5" />
      <text x={280} y={25} textAnchor="middle" fontSize="12" fill={ink}>V</text>
      {arrowHead(180, 20, 0, "hsl(var(--cobalt))", 7)}
      <text x={200} y={10} textAnchor="middle" fontSize="10.5" fill="hsl(var(--cobalt))">e⁻ flow (anode → cathode)</text>
    </Frame>
  );
};

/* ---------------------------- Titration curve --------------------------- */

export const TitrationCurve = () => {
  const colour = "hsl(var(--cobalt))";
  return (
    <Frame caption="Titration curve for a strong acid titrated with a strong base — pH rises sharply at the equivalence point" viewBox="0 0 480 300">
      <line x1={50} y1={30} x2={50} y2={250} stroke={line} strokeWidth="1.5" />
      <line x1={50} y1={250} x2={440} y2={250} stroke={line} strokeWidth="1.5" />
      <text x={20} y={140} textAnchor="middle" fontSize="12" fill={soft} transform="rotate(-90, 20, 140)">pH</text>
      <text x={245} y={278} textAnchor="middle" fontSize="12" fill={soft}>Volume of base added (mL)</text>

      <path
        d="M60 232 C 150 226, 210 216, 230 180 C 245 150, 235 70, 240 50 C 250 42, 320 40, 420 38"
        fill="none"
        stroke={colour}
        strokeWidth="2.5"
      />

      {/* Equivalence point */}
      <line x1={238} y1={38} x2={238} y2={250} stroke="hsl(var(--crimson))" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx={238} cy={118} r="4.5" fill="hsl(var(--crimson))" />
      <text x={248} y={122} fontSize="11" fontWeight="600" fill="hsl(var(--crimson))">Equivalence point (pH = 7)</text>

      {/* Half-equivalence */}
      <line x1={150} y1={228} x2={150} y2={250} stroke="hsl(var(--viridian))" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x={150} y={266} textAnchor="middle" fontSize="10.5" fill="hsl(var(--viridian))">Half-equivalence</text>

      <text x={60} y={22} fontSize="11" fill={soft}>Starts acidic</text>
      <text x={420} y={30} textAnchor="end" fontSize="11" fill={soft}>Flattens, excess base</text>
    </Frame>
  );
};

/* ----------------------------- Heating curve ----------------------------- */

export const HeatingCurve = () => {
  const colour = "hsl(var(--crimson))";
  const segs = [
    { x1: 30, x2: 90, y1: 220, y2: 170, label: "Solid warms" },
    { x1: 90, x2: 170, y1: 170, y2: 170, label: "Melting (fusion)" },
    { x1: 170, x2: 250, y1: 170, y2: 90, label: "Liquid warms" },
    { x1: 250, x2: 340, y1: 90, y2: 90, label: "Boiling (vaporisation)" },
    { x1: 340, x2: 420, y1: 90, y2: 40, label: "Gas warms" },
  ];

  return (
    <Frame caption="Heating curve — temperature holds steady while the latent heat of a change of state is absorbed" viewBox="0 0 460 280">
      <line x1={30} y1={20} x2={30} y2={240} stroke={line} strokeWidth="1.5" />
      <line x1={30} y1={240} x2={440} y2={240} stroke={line} strokeWidth="1.5" />
      <text x={12} y={130} textAnchor="middle" fontSize="12" fill={soft} transform="rotate(-90, 12, 130)">Temperature</text>
      <text x={235} y={264} textAnchor="middle" fontSize="12" fill={soft}>Heat added →</text>

      {segs.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={colour} strokeWidth="2.5" />
      ))}

      {segs.map((s, i) => (
        <text
          key={`label-${i}`}
          x={(s.x1 + s.x2) / 2}
          y={Math.min(s.y1, s.y2) - 10}
          textAnchor="middle"
          fontSize="9.5"
          fill={s.y1 === s.y2 ? "hsl(var(--cobalt))" : soft}
          fontWeight={s.y1 === s.y2 ? "600" : "400"}
        >
          {s.label}
        </text>
      ))}
    </Frame>
  );
};

/* -------------------------- Maxwell-Boltzmann -------------------------- */

export const MaxwellBoltzmann = () => {
  const curve = (peak: number, height: number, colour: string) => {
    const pts: string[] = [];
    for (let x = 0; x <= 400; x += 8) {
      const t = x / 400;
      const y = height * Math.pow(t, 2.1) * Math.exp(-((x - peak) * (x - peak)) / (2 * 95 * 95)) * 2.3;
      pts.push(`${30 + x},${220 - y}`);
    }
    return <polyline points={pts.join(" ")} fill="none" stroke={colour} strokeWidth="2.5" />;
  };

  return (
    <Frame caption="Maxwell–Boltzmann distribution — at a higher temperature, more molecules have energy above Ea" viewBox="0 0 470 260">
      <line x1={30} y1={20} x2={30} y2={220} stroke={line} strokeWidth="1.5" />
      <line x1={30} y1={220} x2={440} y2={220} stroke={line} strokeWidth="1.5" />
      <text x={10} y={120} textAnchor="middle" fontSize="12" fill={soft} transform="rotate(-90, 10, 120)">Fraction of molecules</text>
      <text x={235} y={244} textAnchor="middle" fontSize="12" fill={soft}>Kinetic energy →</text>

      {curve(130, 95, "hsl(var(--cobalt))")}
      {curve(190, 70, "hsl(var(--crimson))")}

      <text x={95} y={70} fontSize="11" fontWeight="600" fill="hsl(var(--cobalt))">Lower T</text>
      <text x={270} y={90} fontSize="11" fontWeight="600" fill="hsl(var(--crimson))">Higher T</text>

      <line x1={300} y1={20} x2={300} y2={220} stroke="hsl(var(--saffron))" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={300} y={12} textAnchor="middle" fontSize="11" fontWeight="600" fill="hsl(var(--saffron))">Eₐ</text>
      <text x={370} y={205} textAnchor="middle" fontSize="10" fill={soft}>Molecules past Eₐ can react</text>
    </Frame>
  );
};

/* ---------------------------- Orbital diagram --------------------------- */

export const OrbitalDiagram = () => {
  const arrow = (x: number, y: number, up: boolean, colour: string) => (
    <g>
      <line x1={x} y1={up ? y + 12 : y - 12} x2={x} y2={up ? y - 12 : y + 12} stroke={colour} strokeWidth="2" />
      {arrowHead(x, up ? y - 12 : y + 12, up ? -90 : 90, colour, 5)}
    </g>
  );

  const orbitalBox = (x: number, y: number, fills: ("up" | "both" | "")[]) => (
    <g>
      {fills.map((f, i) => (
        <rect key={i} x={x + i * 30} y={y} width={28} height={28} fill="hsl(var(--background))" stroke={ink} strokeWidth="1.5" />
      ))}
      {fills.map((f, i) => {
        const cx = x + i * 30 + 14;
        if (f === "up") return <g key={`e-${i}`}>{arrow(cx - 5, y + 14, true, "hsl(var(--cobalt))")}</g>;
        if (f === "both")
          return (
            <g key={`e-${i}`}>
              {arrow(cx - 5, y + 14, true, "hsl(var(--cobalt))")}
              {arrow(cx + 5, y + 14, false, "hsl(var(--crimson))")}
            </g>
          );
        return null;
      })}
    </g>
  );

  return (
    <Frame caption="Orbital filling for nitrogen (1s² 2s² 2p³) — Hund's rule fills the three 2p orbitals singly first" viewBox="0 0 420 200">
      <text x={20} y={30} fontSize="12" fontWeight="600" fill={ink}>1s</text>
      {orbitalBox(60, 16, ["both"])}

      <text x={20} y={90} fontSize="12" fontWeight="600" fill={ink}>2s</text>
      {orbitalBox(60, 76, ["both"])}

      <text x={130} y={90} fontSize="12" fontWeight="600" fill={ink}>2p</text>
      {orbitalBox(170, 76, ["up", "up", "up"])}

      <text x={20} y={160} fontSize="11" fill={soft}>Pauli: 2 electrons per orbital, opposite spin</text>
      <text x={20} y={178} fontSize="11" fill={soft}>Hund: fill singly before pairing in a sub-shell</text>
    </Frame>
  );
};

/* --------------------------- Mass spectrometer --------------------------- */

export const MassSpectrometer = () => {
  const stages = [
    { label: "Vaporise", note: "Sample → gas" },
    { label: "Ionise", note: "Electron knocked off" },
    { label: "Accelerate", note: "Electric field" },
    { label: "Deflect", note: "Magnetic field, by mass" },
    { label: "Detect", note: "Signal ∝ abundance" },
  ];

  return (
    <Frame caption="Mass spectrometer, schematically — lighter ions deflect more and reach the detector sooner" viewBox="0 0 560 160">
      {stages.map((s, i) => {
        const x = 10 + i * 112;
        return (
          <g key={s.label}>
            {box(x, 40, 92, 56, "hsl(var(--cobalt) / 0.08)", "hsl(var(--cobalt))")}
            <text x={x + 46} y={64} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="hsl(var(--cobalt))">{s.label}</text>
            <text x={x + 46} y={82} textAnchor="middle" fontSize="9.5" fill={soft}>{s.note}</text>
            {i < stages.length - 1 && (
              <>
                <line x1={x + 92} y1={68} x2={x + 110} y2={68} stroke={soft} strokeWidth="1.5" />
                {arrowHead(x + 110, 68, 0, soft, 6)}
              </>
            )}
          </g>
        );
      })}
      <text x={280} y={130} textAnchor="middle" fontSize="11" fill={soft}>
        Path curvature depends on the ion's mass-to-charge ratio, m/z
      </text>
    </Frame>
  );
};

/* ------------------------ Reaction mechanism energy ----------------------- */

export const MechanismEnergyDiagram = () => (
  <Frame caption="A two-step mechanism — the higher hump is the rate-determining step" viewBox="0 0 480 240">
    <line x1={30} y1={20} x2={30} y2={200} stroke={line} strokeWidth="1.5" />
    <line x1={30} y1={200} x2={450} y2={200} stroke={line} strokeWidth="1.5" />
    <text x={12} y={110} textAnchor="middle" fontSize="12" fill={soft} transform="rotate(-90, 12, 110)">Energy</text>
    <text x={240} y={224} textAnchor="middle" fontSize="12" fill={soft}>Reaction progress →</text>

    <path
      d="M50 160 C 90 160, 110 60, 150 60 C 180 60, 190 120, 220 120 C 250 120, 270 40, 310 40 C 340 40, 360 100, 420 100"
      fill="none"
      stroke="hsl(var(--cobalt))"
      strokeWidth="2.5"
    />

    <text x={50} y={178} fontSize="10.5" fill={soft}>Reactants</text>
    <text x={220} y={140} textAnchor="middle" fontSize="10.5" fill={soft}>Intermediate</text>
    <text x={400} y={118} textAnchor="middle" fontSize="10.5" fill={soft}>Products</text>

    <text x={150} y={48} textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(var(--crimson))">Eₐ₁ (slow, RDS)</text>
    <text x={310} y={28} textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(var(--viridian))">Eₐ₂ (fast)</text>
  </Frame>
);

/* ----------------------- Ionic vs covalent formation ---------------------- */

export const IonicCovalentFormation = () => (
  <Frame caption="Forming a bond — ionic bonds transfer electrons; covalent bonds share them" viewBox="0 0 560 220">
    {/* Ionic */}
    <g>
      <text x={130} y={20} textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--saffron))">Ionic — electron transfer</text>
      <circle cx={70} cy={100} r={26} fill="hsl(var(--saffron) / 0.18)" stroke="hsl(var(--saffron))" strokeWidth="1.5" />
      <text x={70} y={105} textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--saffron))">Na</text>
      <circle cx={190} cy={100} r={26} fill="hsl(var(--cobalt) / 0.18)" stroke="hsl(var(--cobalt))" strokeWidth="1.5" />
      <text x={190} y={105} textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--cobalt))">Cl</text>
      <path d="M92 90 C 120 70, 150 70, 170 90" fill="none" stroke={soft} strokeWidth="1.5" />
      {arrowHead(170, 90, 42, soft, 6)}
      <text x={40} y={150} fontSize="11" fontWeight="600" fill="hsl(var(--saffron))">Na⁺</text>
      <text x={210} y={150} fontSize="11" fontWeight="600" fill="hsl(var(--cobalt))">Cl⁻</text>
      <text x={130} y={186} textAnchor="middle" fontSize="10.5" fill={soft}>Held by electrostatic attraction</text>
    </g>

    <line x1={280} y1={10} x2={280} y2={210} stroke={line} strokeWidth="1" />

    {/* Covalent */}
    <g transform="translate(300, 0)">
      <text x={130} y={20} textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--viridian))">Covalent — electron sharing</text>
      <circle cx={95} cy={100} r={30} fill="hsl(var(--viridian) / 0.12)" stroke="hsl(var(--viridian))" strokeWidth="1.5" />
      <circle cx={155} cy={100} r={30} fill="hsl(var(--viridian) / 0.12)" stroke="hsl(var(--viridian))" strokeWidth="1.5" />
      <text x={75} y={105} textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--viridian))">Cl</text>
      <text x={175} y={105} textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--viridian))">Cl</text>
      <circle cx={119} cy={96} r={3} fill={ink} />
      <circle cx={131} cy={96} r={3} fill={ink} />
      <text x={125} y={150} textAnchor="middle" fontSize="10.5" fill={soft}>Shared pair completes both octets</text>
    </g>
  </Frame>
);

/* --------------------------- Registry ----------------------------- */

export const diagrams: Record<string, () => JSX.Element> = {
  "ph-scale": PhScale,
  "reaction-types": ReactionTypes,
  "reactivity-series": ReactivitySeries,
  electrolysis: Electrolysis,
  redox: RedoxDiagram,
  rusting: Rusting,
  "energy-diagram": EnergyDiagram,
  "periodic-trends": PeriodicTrends,
  neutralisation: Neutralisation,
  "chlor-alkali": ChlorAlkali,
  "activity-series-extraction": ActivitySeriesExtraction,
  "electrolytic-refining": ElectrolyticRefining,
  esterification: Esterification,
  micelle: Micelle,
  combustion: Combustion,
  "states-of-matter": StatesOfMatter,
  "interconversion-of-states": InterconversionOfStates,
  "tyndall-effect": TyndallEffect,
  "separating-funnel": SeparatingFunnel,
  "bohr-model": BohrModel,
  "galvanic-cell": GalvanicCell,
  "titration-curve": TitrationCurve,
  "heating-curve": HeatingCurve,
  "maxwell-boltzmann": MaxwellBoltzmann,
  "orbital-diagram": OrbitalDiagram,
  "mass-spectrometer": MassSpectrometer,
  "mechanism-energy-diagram": MechanismEnergyDiagram,
  "ionic-covalent-formation": IonicCovalentFormation,
};
