// ==================================================================
// Reaction bench — the reagents and reactions a Class 10 student meets
// in the NCERT lab, modelled so they can be combined in any order.
//
// Colours are the real observed colours of the solutions and solids,
// so the visual read-out teaches something rather than decorating.
// ==================================================================

export type ReagentKind = "metal" | "acid" | "base" | "salt" | "oxide" | "gas";

export interface Reagent {
  id: string;
  name: string;
  formula: string;
  kind: ReagentKind;
  /** Observed colour of the reagent as supplied. */
  colour: string;
  state: "s" | "aq" | "l" | "g";
  note?: string;
}

export interface ReactionEffects {
  /** Colour of the solution after mixing. */
  solutionColour?: string;
  /** Name of any gas evolved. */
  gas?: string;
  /** An insoluble solid that settles out. */
  precipitate?: { name: string; colour: string };
  /** A solid deposited onto the metal (displacement reactions). */
  deposit?: { name: string; colour: string };
  /** Heat change, if noticeable by touch. */
  thermal?: "exothermic" | "endothermic";
}

export interface Reaction {
  /** Unordered pair of reagent ids. */
  pair: [string, string];
  equation: string;
  type: string;
  observation: string;
  explanation: string;
  effects: ReactionEffects;
}

const COLOURLESS = "hsl(40 30% 96%)";

export const reagents: Reagent[] = [
  // --- Metals -------------------------------------------------------
  { id: "zn", name: "Zinc granules", formula: "Zn", kind: "metal", colour: "hsl(220 6% 72%)", state: "s" },
  { id: "fe", name: "Iron filings", formula: "Fe", kind: "metal", colour: "hsl(25 12% 45%)", state: "s" },
  { id: "cu", name: "Copper turnings", formula: "Cu", kind: "metal", colour: "hsl(20 60% 48%)", state: "s" },
  { id: "mg", name: "Magnesium ribbon", formula: "Mg", kind: "metal", colour: "hsl(210 8% 80%)", state: "s" },

  // --- Acids --------------------------------------------------------
  { id: "hcl", name: "Dilute hydrochloric acid", formula: "HCl", kind: "acid", colour: COLOURLESS, state: "aq" },
  { id: "h2so4", name: "Dilute sulphuric acid", formula: "H₂SO₄", kind: "acid", colour: COLOURLESS, state: "aq" },

  // --- Bases --------------------------------------------------------
  { id: "naoh", name: "Sodium hydroxide", formula: "NaOH", kind: "base", colour: COLOURLESS, state: "aq" },
  { id: "limewater", name: "Lime water", formula: "Ca(OH)₂", kind: "base", colour: COLOURLESS, state: "aq" },

  // --- Salt solutions ----------------------------------------------
  { id: "cuso4", name: "Copper sulphate", formula: "CuSO₄", kind: "salt", colour: "hsl(205 75% 48%)", state: "aq" },
  { id: "feso4", name: "Iron(II) sulphate", formula: "FeSO₄", kind: "salt", colour: "hsl(140 45% 55%)", state: "aq" },
  { id: "pbno3", name: "Lead nitrate", formula: "Pb(NO₃)₂", kind: "salt", colour: COLOURLESS, state: "aq" },
  { id: "ki", name: "Potassium iodide", formula: "KI", kind: "salt", colour: COLOURLESS, state: "aq" },
  { id: "bacl2", name: "Barium chloride", formula: "BaCl₂", kind: "salt", colour: COLOURLESS, state: "aq" },
  { id: "na2so4", name: "Sodium sulphate", formula: "Na₂SO₄", kind: "salt", colour: COLOURLESS, state: "aq" },
  { id: "agno3", name: "Silver nitrate", formula: "AgNO₃", kind: "salt", colour: COLOURLESS, state: "aq" },
  { id: "nacl", name: "Sodium chloride", formula: "NaCl", kind: "salt", colour: COLOURLESS, state: "aq" },
  { id: "na2co3", name: "Sodium carbonate", formula: "Na₂CO₃", kind: "salt", colour: COLOURLESS, state: "aq" },
  { id: "nahco3", name: "Sodium hydrogencarbonate", formula: "NaHCO₃", kind: "salt", colour: COLOURLESS, state: "aq" },

  // --- Oxides & gases ----------------------------------------------
  { id: "cao", name: "Quick lime", formula: "CaO", kind: "oxide", colour: "hsl(40 25% 94%)", state: "s" },
  { id: "h2o", name: "Water", formula: "H₂O", kind: "oxide", colour: COLOURLESS, state: "l" },
  { id: "co2", name: "Carbon dioxide", formula: "CO₂", kind: "gas", colour: COLOURLESS, state: "g" },
];

export const reactions: Reaction[] = [
  // --- Displacement: metal + salt -----------------------------------
  {
    pair: ["zn", "feso4"],
    equation: "Zn(s) + FeSO₄(aq) → ZnSO₄(aq) + Fe(s)",
    type: "Displacement",
    observation:
      "The pale green colour of the iron(II) sulphate fades to colourless and a greyish deposit of iron collects on the zinc.",
    explanation:
      "Zinc sits above iron in the reactivity series, so zinc displaces iron from its salt. Zinc goes into solution as Zn²⁺ while Fe²⁺ is reduced to iron metal.",
    effects: {
      solutionColour: COLOURLESS,
      deposit: { name: "Iron", colour: "hsl(25 12% 45%)" },
    },
  },
  {
    pair: ["zn", "cuso4"],
    equation: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)",
    type: "Displacement",
    observation:
      "The blue colour of the copper sulphate fades to colourless and a reddish-brown deposit of copper forms on the zinc.",
    explanation:
      "Zinc is more reactive than copper, so it displaces copper from copper sulphate. This is also a redox reaction: Zn is oxidised and Cu²⁺ is reduced.",
    effects: {
      solutionColour: COLOURLESS,
      deposit: { name: "Copper", colour: "hsl(20 60% 48%)" },
    },
  },
  {
    pair: ["fe", "cuso4"],
    equation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
    type: "Displacement",
    observation:
      "The blue solution turns pale green and the iron becomes coated with reddish-brown copper.",
    explanation:
      "Iron is above copper in the reactivity series. This is NCERT Activity 1.9 — the iron nail dipped in copper sulphate.",
    effects: {
      solutionColour: "hsl(140 45% 55%)",
      deposit: { name: "Copper", colour: "hsl(20 60% 48%)" },
    },
  },
  {
    pair: ["mg", "cuso4"],
    equation: "Mg(s) + CuSO₄(aq) → MgSO₄(aq) + Cu(s)",
    type: "Displacement",
    observation: "The blue colour fades quickly and copper is deposited on the magnesium.",
    explanation:
      "Magnesium is well above copper in the reactivity series, so the displacement is fast.",
    effects: {
      solutionColour: COLOURLESS,
      deposit: { name: "Copper", colour: "hsl(20 60% 48%)" },
      thermal: "exothermic",
    },
  },

  // --- Metal + acid --------------------------------------------------
  {
    pair: ["zn", "hcl"],
    equation: "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
    type: "Displacement",
    observation:
      "Brisk effervescence — bubbles of a colourless gas that burns with a pop sound.",
    explanation:
      "Zinc is above hydrogen in the reactivity series, so it displaces hydrogen from the acid. This is NCERT Activity 1.3.",
    effects: { solutionColour: COLOURLESS, gas: "Hydrogen", thermal: "exothermic" },
  },
  {
    pair: ["mg", "hcl"],
    equation: "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑",
    type: "Displacement",
    observation: "Very rapid effervescence; the tube becomes noticeably warm.",
    explanation:
      "Magnesium is more reactive than zinc, so hydrogen is released faster and more heat is given out.",
    effects: { solutionColour: COLOURLESS, gas: "Hydrogen", thermal: "exothermic" },
  },
  {
    pair: ["fe", "hcl"],
    equation: "Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)↑",
    type: "Displacement",
    observation: "Slow effervescence and the solution slowly turns pale green.",
    explanation: "Iron is above hydrogen, but below zinc, so the reaction is slower.",
    effects: { solutionColour: "hsl(140 45% 55%)", gas: "Hydrogen" },
  },
  {
    pair: ["mg", "h2so4"],
    equation: "Mg(s) + H₂SO₄(aq) → MgSO₄(aq) + H₂(g)↑",
    type: "Displacement",
    observation: "Steady effervescence of hydrogen; the magnesium dissolves.",
    explanation: "Dilute sulphuric acid behaves like hydrochloric acid with reactive metals.",
    effects: { solutionColour: COLOURLESS, gas: "Hydrogen", thermal: "exothermic" },
  },
  {
    pair: ["zn", "naoh"],
    equation: "Zn(s) + 2NaOH(aq) → Na₂ZnO₂(aq) + H₂(g)↑",
    type: "Displacement (metal + alkali)",
    observation: "With hot, concentrated sodium hydroxide solution, bubbles of hydrogen are slowly given off.",
    explanation:
      "Zinc is one of the few metals that reacts with a strong alkali as well as with acids, displacing hydrogen to form sodium zincate. Note it is zinc oxide, ZnO, that is amphoteric — not the metal itself.",
    effects: { solutionColour: COLOURLESS, gas: "Hydrogen" },
  },

  // --- Double displacement / precipitation ---------------------------
  {
    pair: ["pbno3", "ki"],
    equation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
    type: "Double displacement (precipitation)",
    observation: "A bright yellow precipitate of lead iodide forms immediately.",
    explanation:
      "The ions swap partners. Lead iodide is insoluble, so it drops out of solution — NCERT Activity 1.2.",
    effects: {
      solutionColour: COLOURLESS,
      precipitate: { name: "Lead iodide", colour: "hsl(48 95% 55%)" },
    },
  },
  {
    pair: ["na2so4", "bacl2"],
    equation: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
    type: "Double displacement (precipitation)",
    observation: "A dense white precipitate of barium sulphate forms.",
    explanation:
      "Barium sulphate is insoluble in water. This is the standard test for a sulphate — NCERT Activity 1.10.",
    effects: {
      solutionColour: COLOURLESS,
      precipitate: { name: "Barium sulphate", colour: "hsl(0 0% 98%)" },
    },
  },
  {
    pair: ["agno3", "nacl"],
    equation: "AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)",
    type: "Double displacement (precipitation)",
    observation: "A white precipitate of silver chloride forms, which greys in sunlight.",
    explanation:
      "Silver chloride is insoluble. Left in light it decomposes to silver and chlorine, which is why it turns grey.",
    effects: {
      solutionColour: COLOURLESS,
      precipitate: { name: "Silver chloride", colour: "hsl(0 0% 96%)" },
    },
  },

  // --- Neutralisation -------------------------------------------------
  {
    pair: ["hcl", "naoh"],
    equation: "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)",
    type: "Neutralisation",
    observation: "No visible change, but the tube becomes warm. The mixture ends up neutral.",
    explanation:
      "H⁺ from the acid and OH⁻ from the base combine to form water, leaving sodium chloride in solution. A special case of double displacement.",
    effects: { solutionColour: COLOURLESS, thermal: "exothermic" },
  },

  // --- Acid + carbonate ------------------------------------------------
  {
    pair: ["na2co3", "hcl"],
    equation: "Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + CO₂(g)↑ + H₂O(l)",
    type: "Double displacement",
    observation: "Brisk effervescence of a gas that turns lime water milky.",
    explanation:
      "Acids release carbon dioxide from carbonates. Passing the gas through lime water is the confirmatory test for CO₂.",
    effects: { solutionColour: COLOURLESS, gas: "Carbon dioxide" },
  },
  {
    pair: ["nahco3", "hcl"],
    equation: "NaHCO₃(aq) + HCl(aq) → NaCl(aq) + CO₂(g)↑ + H₂O(l)",
    type: "Double displacement",
    observation: "Immediate fizzing as carbon dioxide is released.",
    explanation:
      "The same reaction that makes baking soda useful in fire extinguishers and in baking.",
    effects: { solutionColour: COLOURLESS, gas: "Carbon dioxide" },
  },

  // --- Combination ------------------------------------------------------
  {
    pair: ["cao", "h2o"],
    equation: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + heat",
    type: "Combination",
    observation:
      "The solid hisses and crumbles, the mixture becomes very hot, and a milky suspension of slaked lime forms.",
    explanation:
      "Quick lime combines with water to give slaked lime. It is strongly exothermic — NCERT Activity 1.4.",
    effects: {
      solutionColour: "hsl(40 15% 92%)",
      thermal: "exothermic",
    },
  },
  {
    pair: ["limewater", "co2"],
    equation: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ + H₂O(l)",
    type: "Neutralisation (base + non-metal oxide)",
    observation: "The clear lime water turns milky white.",
    explanation:
      "Carbon dioxide is an acidic oxide, so the alkali neutralises it to give a salt and water. The milkiness is insoluble calcium carbonate — the confirmatory test for CO₂.",
    effects: {
      solutionColour: "hsl(40 12% 90%)",
      precipitate: { name: "Calcium carbonate", colour: "hsl(0 0% 97%)" },
    },
  },
];

/** Pairs that deliberately do nothing — the teaching point is *why*. */
export const nonReactions: { pair: [string, string]; explanation: string }[] = [
  {
    pair: ["cu", "feso4"],
    explanation:
      "Copper is below iron in the reactivity series, so it cannot displace iron from its salt. Nothing happens.",
  },
  {
    pair: ["cu", "hcl"],
    explanation:
      "Copper sits below hydrogen in the reactivity series, so it cannot displace hydrogen from a dilute acid. No gas is produced.",
  },
  {
    pair: ["cu", "h2so4"],
    explanation:
      "Dilute sulphuric acid does not react with copper — copper is less reactive than hydrogen.",
  },
  {
    pair: ["cu", "zn"],
    explanation: "Two metals placed together do not react with each other.",
  },
  {
    pair: ["nacl", "hcl"],
    explanation:
      "Sodium chloride is already the salt of hydrochloric acid, so there is nothing left to exchange.",
  },
];

const key = (a: string, b: string) => [a, b].sort().join("+");

const reactionIndex = new Map(reactions.map((r) => [key(...r.pair), r]));
const nonReactionIndex = new Map(nonReactions.map((n) => [key(...n.pair), n.explanation]));

export type MixResult =
  | { kind: "reaction"; reaction: Reaction }
  | { kind: "none"; explanation: string }
  | { kind: "unknown" };

/** Look up what happens when two reagents are combined, in either order. */
export const mix = (a: string, b: string): MixResult => {
  const k = key(a, b);
  const reaction = reactionIndex.get(k);
  if (reaction) return { kind: "reaction", reaction };

  const explanation = nonReactionIndex.get(k);
  if (explanation) return { kind: "none", explanation };

  return { kind: "unknown" };
};

export const getReagent = (id: string) => reagents.find((r) => r.id === id);

/** Combinations worth trying first, surfaced as shortcuts in the UI. */
export const suggestedMixes: { pair: [string, string]; label: string }[] = [
  { pair: ["zn", "feso4"], label: "Zinc + iron sulphate" },
  { pair: ["fe", "cuso4"], label: "Iron + copper sulphate" },
  { pair: ["pbno3", "ki"], label: "Lead nitrate + potassium iodide" },
  { pair: ["zn", "hcl"], label: "Zinc + dilute acid" },
  { pair: ["cao", "h2o"], label: "Quick lime + water" },
  { pair: ["cu", "feso4"], label: "Copper + iron sulphate" },
];
