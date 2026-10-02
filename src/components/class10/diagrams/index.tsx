import { Frame, ink, soft, line, arrowHead, box } from "./shared";
import { carbonDiagrams } from "./carbon";
import { atomDiagrams } from "./atoms";
import { bondingDiagrams } from "./bonding";
import { physicalDiagrams } from "./physical";
import { matterDiagrams } from "./matter";
import { biomoleculeDiagrams } from "./biomolecules";

/* ------------------------------------------------------------------ *
 * Inline SVG diagrams for the Class 10 notes.
 *
 * Every diagram is theme-aware (it reads the design-system CSS variables)
 * and carries a <title> so it is announced properly by screen readers.
 * Colour is used to carry meaning — reaction type, pH, charge — never as
 * decoration.
 * ------------------------------------------------------------------ */

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

/* --------------------------- Registry ----------------------------- */

export const diagrams: Record<string, () => JSX.Element> = {
  ...carbonDiagrams,
  ...atomDiagrams,
  ...bondingDiagrams,
  ...physicalDiagrams,
  ...matterDiagrams,
  ...biomoleculeDiagrams,
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
  "bohr-model": BohrModel,
  "heating-curve": HeatingCurve,
  "orbital-diagram": OrbitalDiagram,
};
