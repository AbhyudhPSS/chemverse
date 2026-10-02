import {
  Bubbles,
  Burner,
  CLEAR,
  Cork,
  DeliveryTube,
  Dropper,
  FigureProps,
  GLASS,
  INK,
  Label,
  LINE,
  SOFT,
  TestTube,
} from "@/components/class10/figures/primitives";

/* ------------------------------------------------------------------ *
 * One figure per NCERT activity, drawn as the textbook sets it up and
 * animated so the change you are told to look for actually happens.
 * ------------------------------------------------------------------ */

/* ---- Activity 1.1 — burning magnesium ribbon --------------------- */
export const MgBurning = ({ run }: FigureProps) => (
  <g>
    {/* Tongs */}
    <path d="M12 74 L96 96" stroke={SOFT} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M12 92 L96 104" stroke={SOFT} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <circle cx="14" cy="83" r="4" fill={SOFT} />
    <Label x={10} y={68} anchor="start">Tongs</Label>

    {/* Magnesium ribbon */}
    <rect
      x="96"
      y="96"
      width="30"
      height="5"
      rx="1"
      fill={run ? "hsl(0 0% 100%)" : "hsl(210 8% 76%)"}
      style={{ transition: "fill 500ms ease" }}
    />
    {run && (
      <circle cx="111" cy="98" r="14" fill="hsl(50 100% 92%)" opacity="0.85">
        <animate attributeName="r" values="10;18;10" dur="500ms" repeatCount="indefinite" />
      </circle>
    )}
    <Label x={111} y={84}>{run ? "Dazzling white flame" : "Magnesium ribbon"}</Label>

    <Burner x={111} y={140} lit />

    {/* Watch glass collecting the ash */}
    <path d="M196 176 a34 12 0 0 0 68 0" fill={GLASS} stroke={LINE} strokeWidth="1.6" />
    {run && (
      <ellipse cx="230" cy="176" rx="24" ry="6" fill="hsl(0 0% 99%)">
        <animate attributeName="rx" from="0" to="24" dur="900ms" fill="freeze" />
      </ellipse>
    )}
    <Label x={230} y={200}>{run ? "White ash — MgO" : "Watch glass"}</Label>
  </g>
);

/* ---- Activity 1.2 — lead nitrate + potassium iodide -------------- */
export const PbNO3KI = ({ run }: FigureProps) => (
  <g>
    {/* Pouring tube */}
    <g transform={run ? "rotate(38 118 64)" : "rotate(0 118 64)"} style={{ transition: "transform 700ms ease" }}>
      <TestTube x={100} y={30} w={30} h={74} fill={CLEAR} level={0.55} />
    </g>
    <Label x={92} y={24} anchor="end">Potassium iodide</Label>

    {/* Stream of solution */}
    {run && (
      <path d="M150 88 Q 168 106 178 124" stroke="hsl(var(--cobalt) / 0.35)" strokeWidth="3" fill="none" strokeLinecap="round">
        <animate attributeName="opacity" values="0;1;1" dur="700ms" fill="freeze" />
      </path>
    )}

    {/* Receiving tube */}
    <TestTube x={168} y={104} w={36} h={92} fill={CLEAR} level={0.62} />
    {run && (
      <ellipse cx="186" cy="182" rx="16" ry="10" fill="hsl(48 95% 55%)">
        <animate attributeName="ry" from="0" to="10" dur="900ms" fill="freeze" />
      </ellipse>
    )}
    <Label x={186} y={212}>{run ? "Yellow PbI₂ precipitate" : "Lead nitrate"}</Label>
  </g>
);

/* ---- Activity 1.3 / Ch2 — metal + dilute acid -------------------- */
export const ZincAcid = ({ run }: FigureProps) => (
  <g>
    {/* Conical flask */}
    <path d="M96 58 H124 L150 166 a8 8 0 0 1 -8 10 H78 a8 8 0 0 1 -8 -10 Z" fill={GLASS} stroke={LINE} strokeWidth="1.6" />
    <path d="M74 138 H146 L150 166 a8 8 0 0 1 -8 10 H78 a8 8 0 0 1 -8 -10 Z" fill="hsl(var(--cobalt) / 0.14)" />
    {/* Zinc granules */}
    {[0, 1, 2, 3].map((i) => (
      <circle key={i} cx={86 + i * 16} cy={168} r="4.5" fill="hsl(220 6% 68%)" />
    ))}
    {run && <Bubbles x={110} fromY={166} toY={140} count={5} spread={44} />}
    <Cork x={97} y={50} w={26} />
    <Label x={110} y={198}>Zinc + dilute acid</Label>

    {/* Delivery tube to the flame test */}
    <DeliveryTube d="M110 50 V30 H236" />

    {/* Burning splint */}
    <rect x="236" y="26" width="4" height="30" rx="2" fill={SOFT} />
    {run && (
      <g>
        <ellipse cx="238" cy="18" rx="7" ry="11" fill="hsl(var(--saffron))" opacity="0.9">
          <animate attributeName="ry" values="8;14;8" dur="380ms" repeatCount="indefinite" />
        </ellipse>
        <Label x={238} y={72} fill="hsl(var(--crimson))">Burns with a pop</Label>
      </g>
    )}
    {!run && <Label x={238} y={72}>Burning splint</Label>}
  </g>
);

/* ---- Activity 1.5 — heating ferrous sulphate --------------------- */
export const FeSO4Heating = ({ run }: FigureProps) => (
  <g>
    <path d="M14 66 L92 92" stroke={SOFT} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M14 84 L92 100" stroke={SOFT} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="75" r="4" fill={SOFT} />

    <g transform="rotate(-22 150 100)">
      <TestTube x={116} y={56} w={38} h={104} fill="transparent" level={0} />
      {/* Crystals change colour as they decompose */}
      <ellipse
        cx={135}
        cy={148}
        rx="15"
        ry="9"
        fill={run ? "hsl(20 55% 38%)" : "hsl(140 45% 52%)"}
        style={{ transition: "fill 900ms ease" }}
      />
    </g>

    {/* Fumes leaving the mouth */}
    {run &&
      [0, 1, 2].map((i) => (
        <circle key={i} cx={176 + i * 7} cy={46} r={4 + i} fill={SOFT} opacity="0.35">
          <animate attributeName="cy" from="46" to="10" dur={`${1.3 + i * 0.3}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.4;0" dur={`${1.3 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
    {run && <Label x={198} y={30} anchor="start" fill="hsl(var(--saffron))">SO₂ + SO₃</Label>}

    <Burner x={132} y={168} lit />
    <Label x={132} y={214}>{run ? "Green crystals turn brown" : "Ferrous sulphate crystals"}</Label>
  </g>
);

/* ---- Activity 1.7 — electrolysis of water ------------------------ */
export const ElectrolysisFig = ({ run }: FigureProps) => {
  const h2 = run ? 52 : 6;
  const o2 = run ? 26 : 6;
  return (
    <g>
      {/* Beaker */}
      <path d="M40 92 H240 V176 a10 10 0 0 1 -10 10 H50 a10 10 0 0 1 -10 -10 Z" fill="hsl(var(--cobalt) / 0.10)" stroke={LINE} strokeWidth="1.6" />
      <line x1="40" y1="104" x2="240" y2="104" stroke="hsl(var(--cobalt) / 0.35)" strokeWidth="1.2" />

      {[
        { x: 84, gas: "H₂", colour: "hsl(var(--cobalt))", fill: h2 },
        { x: 168, gas: "O₂", colour: "hsl(var(--crimson))", fill: o2 },
      ].map((t) => (
        <g key={t.gas}>
          <path d={`M${t.x} 34 H${t.x + 32} V128 a16 16 0 0 1 -32 0 Z`} fill={GLASS} stroke={LINE} strokeWidth="1.5" />
          <rect
            x={t.x + 2}
            y={36}
            width="28"
            height={t.fill}
            fill={`color-mix(in srgb, ${t.colour} 22%, transparent)`}
            style={{ transition: "height 1200ms ease" }}
          />
          <Label x={t.x + 16} y={26} fill={t.colour} size={11}>{t.gas}</Label>
          <rect x={t.x + 12} y="100" width="8" height="78" rx="2" fill={SOFT} />
          {run && <Bubbles x={t.x + 16} fromY={120} toY={40} count={3} spread={12} />}
        </g>
      ))}

      <Label x={100} y={200}>Cathode −</Label>
      <Label x={184} y={200}>Anode +</Label>
      <rect x="112" y="210" width="56" height="20" rx="4" fill={GLASS} stroke={LINE} strokeWidth="1.4" />
      <Label x={140} y={224} fill={INK}>6 V</Label>
      <path d="M100 178 V218 H112" fill="none" stroke={SOFT} strokeWidth="1.5" />
      <path d="M184 178 V218 H168" fill="none" stroke={SOFT} strokeWidth="1.5" />
    </g>
  );
};

/* ---- Activity 1.8 — silver chloride in sunlight ------------------ */
export const AgClSunlight = ({ run }: FigureProps) => (
  <g>
    {/* Sun */}
    <circle cx="56" cy="46" r="18" fill="hsl(var(--saffron) / 0.9)" />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4;
      return (
        <line
          key={i}
          x1={56 + Math.cos(a) * 24}
          y1={46 + Math.sin(a) * 24}
          x2={56 + Math.cos(a) * 32}
          y2={46 + Math.sin(a) * 32}
          stroke="hsl(var(--saffron))"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    })}

    {/* Light reaching the dish */}
    {run &&
      [0, 1, 2].map((i) => (
        <line key={i} x1={78 + i * 10} y1={64 + i * 4} x2={150 + i * 10} y2={132 + i * 4} stroke="hsl(var(--saffron))" strokeWidth="1.6" strokeDasharray="5 4" opacity="0.8">
          <animate attributeName="opacity" values="0.25;0.9;0.25" dur="1.4s" repeatCount="indefinite" />
        </line>
      ))}

    {/* Watch glass with silver chloride */}
    <path d="M150 150 a50 16 0 0 0 100 0" fill={GLASS} stroke={LINE} strokeWidth="1.6" />
    <ellipse
      cx="200"
      cy="150"
      rx="38"
      ry="8"
      fill={run ? "hsl(30 4% 55%)" : "hsl(40 20% 97%)"}
      style={{ transition: "fill 1100ms ease" }}
    />
    <Label x={200} y={188}>{run ? "Turns grey — silver is set free" : "White silver chloride"}</Label>
  </g>
);

/* ---- Ch2 — litmus test ------------------------------------------- */
export const LitmusTest = ({ run }: FigureProps) => (
  <g>
    {/* Tile */}
    <rect x="40" y="110" width="240" height="70" rx="6" fill={GLASS} stroke={LINE} strokeWidth="1.5" />

    {[
      { x: 92, base: "hsl(215 70% 55%)", acid: "hsl(0 70% 52%)", name: "Blue litmus" },
      { x: 208, base: "hsl(0 70% 52%)", acid: "hsl(0 70% 52%)", name: "Red litmus" },
    ].map((s) => (
      <g key={s.name}>
        <rect
          x={s.x - 22}
          y="132"
          width="44"
          height="26"
          rx="2"
          fill={run ? s.acid : s.base}
          style={{ transition: "fill 800ms ease" }}
        />
        <Label x={s.x} y={174}>{s.name}</Label>
      </g>
    ))}

    <Dropper x={92} y={96} active={run} dropTo={128} />
    <Dropper x={208} y={96} active={run} dropTo={128} />
    <Label x={150} y={50}>{run ? "Acid added — blue litmus turns red" : "Add a drop of dilute acid"}</Label>
  </g>
);

/* ---- Ch2 — acid + carbonate, lime water test --------------------- */
export const AcidCarbonate = ({ run }: FigureProps) => (
  <g>
    {/* Reaction tube */}
    <TestTube x={54} y={62} w={38} h={104} fill="hsl(var(--cobalt) / 0.10)" level={0.55} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={64 + i * 10} cy={158} r="3.5" fill="hsl(0 0% 96%)" />
    ))}
    {run && <Bubbles x={73} fromY={156} toY={112} count={4} spread={22} />}
    <Cork x={60} y={54} w={26} />
    <Label x={73} y={188}>Na₂CO₃ + dilute HCl</Label>

    {/* Delivery tube carrying CO₂ across */}
    <DeliveryTube d="M73 54 V30 H214 V92" />
    {run && (
      <circle r="3" fill="hsl(var(--cobalt))" opacity="0.8">
        <animateMotion path="M73 54 V30 H214 V92" dur="1.5s" repeatCount="indefinite" />
      </circle>
    )}

    {/* Lime water */}
    <TestTube
      x={196}
      y={92}
      w={38}
      h={98}
      fill={run ? "hsl(40 14% 88%)" : "hsl(var(--cobalt) / 0.08)"}
      level={0.6}
    />
    {run && <Bubbles x={215} fromY={180} toY={140} count={3} spread={16} />}
    <Label x={215} y={210}>{run ? "Lime water turns milky" : "Clear lime water"}</Label>
  </g>
);

/* ---- Ch2 — neutralisation with phenolphthalein ------------------- */
export const NeutralisationFig = ({ run }: FigureProps) => (
  <g>
    {/* Burette */}
    <rect x="142" y="14" width="18" height="80" rx="3" fill={GLASS} stroke={LINE} strokeWidth="1.5" />
    <rect x="144" y="20" width="14" height="60" fill="hsl(var(--cobalt) / 0.16)" />
    <path d="M147 94 H155 L151 108 Z" fill={GLASS} stroke={LINE} strokeWidth="1.2" />
    <Label x={176} y={44} anchor="start">Dilute HCl</Label>

    {run && (
      <circle cx="151" cy="112" r="3" fill="hsl(var(--cobalt))">
        <animate attributeName="cy" from="112" to="150" dur="700ms" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;1;0" dur="700ms" repeatCount="indefinite" />
      </circle>
    )}

    {/* Conical flask */}
    <path d="M138 150 H164 L192 208 a8 8 0 0 1 -8 10 H118 a8 8 0 0 1 -8 -10 Z" fill={GLASS} stroke={LINE} strokeWidth="1.6" />
    <path
      d="M124 182 H178 L192 208 a8 8 0 0 1 -8 10 H118 a8 8 0 0 1 -8 -10 Z"
      fill={run ? "hsl(40 30% 96%)" : "hsl(330 70% 72%)"}
      style={{ transition: "fill 1000ms ease" }}
    />
    <Label x={151} y={238}>
      {run ? "Pink just disappears — neutral" : "Alkali + phenolphthalein"}
    </Label>
  </g>
);

/* ---- Ch2 — pH paper ---------------------------------------------- */
export const PhPaper = ({ run }: FigureProps) => {
  const chart = ["#D7263D", "#EF6C2A", "#F5B921", "#C9D92C", "#3FAE6B", "#2F86B5", "#4A2F92"];
  return (
    <g>
      <rect x="34" y="104" width="150" height="62" rx="6" fill={GLASS} stroke={LINE} strokeWidth="1.5" />
      <rect
        x="86"
        y="122"
        width="46"
        height="26"
        rx="2"
        fill={run ? "#D7263D" : "#3FAE6B"}
        style={{ transition: "fill 800ms ease" }}
      />
      <Label x={109} y={182}>pH paper</Label>
      <Dropper x={109} y={88} active={run} dropTo={118} colour="hsl(50 90% 60%)" />
      <Label x={109} y={44}>{run ? "Lemon juice added" : "Place a drop on the paper"}</Label>

      {/* Standard colour chart */}
      {chart.map((c, i) => (
        <rect key={c} x={212 + i * 13} y="122" width="13" height="26" fill={c} />
      ))}
      <rect
        x={run ? 212 : 264}
        y="118"
        width="13"
        height="34"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        style={{ transition: "x 800ms ease" }}
      />
      <Label x={257} y={166}>Colour chart</Label>
      <Label x={218} y={112} anchor="start" size={8}>0</Label>
      <Label x={296} y={112} anchor="end" size={8}>14</Label>
    </g>
  );
};

/* ---- Ch2 — Plaster of Paris setting ------------------------------ */
export const PopSetting = ({ run }: FigureProps) => (
  <g>
    {/* Bowl */}
    <path d="M78 104 H222 L206 178 a10 10 0 0 1 -10 8 H104 a10 10 0 0 1 -10 -8 Z" fill={GLASS} stroke={LINE} strokeWidth="1.6" />
    <path
      d="M88 140 H212 L206 178 a10 10 0 0 1 -10 8 H104 a10 10 0 0 1 -10 -8 Z"
      fill={run ? "hsl(40 8% 97%)" : "hsl(40 18% 90%)"}
      style={{ transition: "fill 1000ms ease" }}
    />
    {/* Surface: slurry ripples before, flat solid after */}
    {!run && (
      <path d="M92 140 q 16 -6 32 0 t 32 0 t 32 0 t 24 0" fill="none" stroke={LINE} strokeWidth="1.4" opacity="0.6" />
    )}
    {run && <line x1="90" y1="140" x2="210" y2="140" stroke={LINE} strokeWidth="1.6" />}

    {/* Heat rising as it sets */}
    {run &&
      [0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${126 + i * 24} 128 q 6 -10 0 -20 q -6 -10 0 -18`}
          fill="none"
          stroke="hsl(var(--crimson))"
          strokeWidth="1.6"
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0;0.6;0" dur={`${1.4 + i * 0.3}s`} repeatCount="indefinite" />
        </path>
      ))}

    <Label x={150} y={208}>{run ? "Sets hard and warms up — gypsum" : "Plaster of Paris + water"}</Label>
  </g>
);

/* ---- Registry ----------------------------------------------------- */

export interface FigureEntry {
  Component: (p: FigureProps) => JSX.Element;
  viewBox: string;
}

export const activityFigures: Record<string, FigureEntry> = {
  "mg-burning": { Component: MgBurning, viewBox: "0 0 300 212" },
  "pbno3-ki": { Component: PbNO3KI, viewBox: "0 0 300 224" },
  "zinc-acid": { Component: ZincAcid, viewBox: "0 0 300 212" },
  "feso4-heating": { Component: FeSO4Heating, viewBox: "0 0 300 226" },
  electrolysis: { Component: ElectrolysisFig, viewBox: "0 0 300 240" },
  "agcl-sunlight": { Component: AgClSunlight, viewBox: "0 0 300 200" },
  litmus: { Component: LitmusTest, viewBox: "0 0 320 190" },
  "acid-carbonate": { Component: AcidCarbonate, viewBox: "0 0 300 222" },
  neutralisation: { Component: NeutralisationFig, viewBox: "0 0 300 250" },
  "ph-paper": { Component: PhPaper, viewBox: "0 0 320 196" },
  "pop-setting": { Component: PopSetting, viewBox: "0 0 300 220" },
};
