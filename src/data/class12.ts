// ==================================================================
// Class 12 — CBSE / NCERT Chemistry
// Chapter 1: Solutions
// Chapter 2: Electrochemistry
// Chapter 3: Chemical Kinetics
// Chapter 4: d and f Block Elements
// Chapter 5: Coordination Compounds
// Chapter 6: Haloalkanes and Haloarenes
// Chapter 7: Alcohols, Phenols and Ethers
// Chapter 8: Aldehydes, Ketones and Carboxylic Acids
// Chapter 9: Amines
// Chapter 10: Biomolecules
//
// Chapter numbers follow the rationalised NCERT Class 12 Chemistry
// textbook. Chemical formulae use Unicode sub/superscripts so they
// render correctly without a special parser.
// ==================================================================

export interface Video {
  title: string;
  channel: string;
  url: string; // YouTube embed URL
}

export interface Experiment {
  id: string;
  title: string;
  activityRef?: string; // e.g. "NCERT Activity 1.1"
  aim: string;
  materials: string[];
  procedure: string[];
  observation: string;
  reaction?: string; // balanced equation, if any
  conclusion: string;
  safety?: string;
  /** Drives the animated figure shown with the activity. */
  visual?: {
    /** Id of the NCERT apparatus figure to draw, if one exists. */
    figure?: string;
    before: string;
    after?: string;
    gas?: string;
    precipitate?: { name: string; colour: string };
    solid?: { name: string; colourBefore: string; colourAfter?: string };
    thermal?: "exothermic" | "endothermic";
    flame?: boolean;
    labels?: { before: string; after: string };
  };
}

export interface ObjectiveQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index into options
  explanation: string;
}

export interface SubjectiveQuestion {
  marks: 1 | 2 | 3 | 5;
  question: string;
  answer: string; // model answer (markdown-lite)
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // emoji
  /** Pigment token from the design system, used for the chapter accent. */
  color: "cobalt" | "iris" | "moss" | "plum" | "copper" | "cyanine";
  readingTime: string;
  videos: Video[];
  notes: string; // markdown-lite
  experiments: Experiment[];
  objectiveQuestions: ObjectiveQuestion[];
  subjectiveQuestions: SubjectiveQuestion[];
}

export const chapters: Chapter[] = [
  // ================================================================
  // CHAPTER 1 — SOLUTIONS
  // ================================================================
  {
    id: "solutions",
    number: 1,
    title: "Solutions",
    subtitle: "Concentration, Raoult's law, and the properties that depend only on how many particles are dissolved",
    description:
      "Types of solutions and concentration terms, Raoult's law and ideal/non-ideal solutions, colligative properties (relative lowering of vapour pressure, boiling point elevation, freezing point depression, osmotic pressure), and abnormal molar mass with the van't Hoff factor.",
    icon: "🧴",
    color: "cobalt",
    readingTime: "27 min read",
    videos: [
      {
        title: "Solutions — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/9NXjeVchtqQ",
      },
      {
        title: "Colligative Properties Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/AVvyfWn2sOI",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/8x0nlwFzXHE",
      },
    ],
    notes: `
# Solutions

## Types of Solutions

A **solution** is a homogeneous mixture of two or more components. The component present in the largest quantity is the **solvent**; the other component(s) are the **solute(s)**. Solutions can be solid, liquid or gaseous, depending on the physical state of the solvent (e.g. alloys are solid solutions; air is a gaseous solution; salt water is a liquid solution).

## Concentration Terms

1. **Mass percentage** = (mass of solute / mass of solution) × 100.
2. **Mole fraction (x)** = moles of a component / total moles of all components; the mole fractions of all components in a solution always sum to 1.
3. **Molarity (M)** = moles of solute / volume of solution in litres (mol L⁻¹); varies slightly with temperature (since volume changes with temperature).
4. **Molality (m)** = moles of solute / mass of solvent in kilograms (mol kg⁻¹); does NOT vary with temperature, since it is defined using mass.
5. **Parts per million (ppm)** — used for very dilute solutions, e.g. trace pollutants in water.

## Solubility

The maximum amount of a solute that can be dissolved in a given amount of solvent at a given temperature is its **solubility**.
- **Solid in liquid:** solubility generally increases with temperature for an endothermic dissolution process (most solids), and decreases for an exothermic one.
- **Gas in liquid (Henry's Law):** the partial pressure of a gas in the vapour phase is directly proportional to the mole fraction of the gas dissolved in the liquid: p = KH·x. A higher value of KH at a given mole fraction indicates lower solubility. Gas solubility in liquids **decreases with increasing temperature** (which is why aquatic life is stressed by warm water, and why soda water loses its fizz faster when warm).

> [!key] **Applications of Henry's Law:** carbonated drinks are bottled at high pressure to increase CO₂ solubility; deep-sea divers use air diluted with helium (rather than nitrogen) to avoid painful nitrogen bubble formation (the 'bends') when ascending, since N₂ is more soluble in blood at high pressure than He.

## Vapour Pressure of Liquid Solutions and Raoult's Law

For a solution of two volatile liquids, **Raoult's Law** states that the partial vapour pressure of each component is directly proportional to its mole fraction in the solution:

p₁ = x₁p₁°        p₂ = x₂p₂°        p(total) = p₁ + p₂

where p₁° and p₂° are the vapour pressures of the pure components.

### Ideal and Non-Ideal Solutions
- **Ideal solutions** obey Raoult's Law over the entire range of concentration; ΔH(mixing) = 0 and ΔV(mixing) = 0 (e.g. benzene + toluene).
- **Non-ideal solutions showing positive deviation** — the intermolecular forces between unlike molecules (A-B) are weaker than between like molecules (A-A, B-B), so the solution has a higher vapour pressure than predicted (e.g. ethanol + acetone).
- **Non-ideal solutions showing negative deviation** — A-B forces are stronger than A-A/B-B forces, so the solution has a lower vapour pressure than predicted (e.g. chloroform + acetone, due to hydrogen bonding between them).

### Raoult's Law as a Special Case of Henry's Law
For a solution of a solute (non-volatile) in a solvent, Raoult's Law becomes a special case of Henry's Law, where the constant KH becomes equal to p°(solvent).

## Colligative Properties

**Colligative properties** depend only on the **number of solute particles** present in a solution, not on their identity/nature.

### 1. Relative Lowering of Vapour Pressure
When a non-volatile solute is dissolved in a solvent, the vapour pressure of the solution is lower than that of the pure solvent:

(p₁° − p₁) ÷ p₁° = x₂

where x₂ is the mole fraction of the solute.

### 2. Elevation of Boiling Point (ΔTb)
The boiling point of a solution containing a non-volatile solute is always higher than that of the pure solvent, since the vapour pressure is lowered.

ΔTb = Kb · m

where Kb is the **molal boiling point elevation constant (ebullioscopic constant)** of the solvent, and m is the molality of the solution.

### 3. Depression of Freezing Point (ΔTf)
The freezing point of a solution is always lower than that of the pure solvent.

ΔTf = Kf · m

where Kf is the **molal freezing point depression constant (cryoscopic constant)** of the solvent.

> [!example] Ethylene glycol is added to car radiators in cold climates as 'antifreeze', lowering the freezing point of the coolant so it doesn't freeze in winter; salt is spread on icy roads for the same reason (freezing point depression).

### 4. Osmotic Pressure (π)
**Osmosis** is the spontaneous flow of solvent molecules through a semi-permeable membrane, from a region of lower solute concentration (or pure solvent) to a region of higher solute concentration. **Osmotic pressure** is the excess pressure that must be applied to the solution side to just stop this net flow of solvent.

πV = nRT  ⇒  π = CRT

where C is the molar concentration of the solution.

- **Isotonic solutions** have the same osmotic pressure (e.g. 0.9% saline is isotonic with blood plasma, which is why it's used in IV drips).
- **Reverse osmosis** — if a pressure greater than the osmotic pressure is applied to the solution side, solvent flows from the solution into the pure solvent instead, against the natural osmotic gradient; this principle is used in modern water purification/desalination systems.

Osmotic pressure is the preferred colligative property for determining the molar mass of large molecules like polymers and proteins, since even a small concentration gives a conveniently measurable osmotic pressure (unlike the very small freezing point/boiling point changes such dilute solutions would produce).

## Abnormal Molar Mass and the van't Hoff Factor

If a solute **dissociates** in solution (e.g. an electrolyte like NaCl), the number of particles increases, and colligative properties are found to be **greater** than expected from the formula mass. If a solute **associates** (e.g. forms dimers, like acetic acid in benzene), the number of particles decreases, and colligative properties are found to be **smaller** than expected.

The **van't Hoff factor (i)** accounts for this:

i = (observed colligative property ÷ calculated/normal colligative property) = (normal molar mass ÷ observed/abnormal molar mass)

- For a solute that dissociates into n ions, i approaches n as dissociation becomes complete (e.g. i ≈ 2 for NaCl, i ≈ 3 for a salt like CaCl₂).
- For a solute that associates (e.g. dimerises), i < 1 (approaching 0.5 for complete dimerisation).
- For a non-electrolyte that neither associates nor dissociates, i = 1.

All colligative property equations are modified to include i, e.g. ΔTf = i·Kf·m, and π = i·CRT.
    `,
    experiments: [
      {
        id: "molarity-molality-preparation",
        title: "Preparing Solutions of a Given Molarity and Molality",
        aim: "To prepare a solution of a given molarity and compare it with an equivalent molality, understanding the practical difference between the two.",
        materials: ["Anhydrous sodium chloride", "A weighing balance", "A 100 mL volumetric flask", "Distilled water"],
        procedure: [
          "Calculate the mass of NaCl needed to prepare 100 mL of a 1 M NaCl solution (moles = 0.1 mol × 58.5 g/mol = 5.85 g).",
          "Weigh out 5.85 g of NaCl, dissolve it in a small volume of water, then make up to exactly 100 mL in the volumetric flask.",
          "Separately, calculate and prepare a 1 molal solution by dissolving the same mass of NaCl in exactly 100 g of water (not made up to a fixed final volume).",
        ],
        observation: "The molar solution is made up to a precise final volume (100 mL) regardless of the exact volume of water used, while the molal solution uses a precise mass of solvent (100 g) regardless of the final total volume.",
        conclusion:
          "Molarity is defined by the volume of the final solution and can change slightly with temperature (as the solution expands/contracts), while molality is defined by the mass of solvent used and remains constant regardless of temperature — this is why molality is preferred for precise scientific work involving significant temperature changes.",
        visual: {
          before: "hsl(200 15% 95%)",
          labels: { before: "NaCl dissolving in water", after: "Made up to exact volume (molar) vs mass (molal)" },
        },
      },
      {
        id: "freezing-point-depression",
        title: "Depression of Freezing Point Using Common Salt",
        aim: "To demonstrate that dissolving a solute lowers the freezing point of a solvent, using the classic ice-salt freezing mixture.",
        materials: ["Crushed ice", "Common salt (NaCl)", "A thermometer", "Two beakers"],
        procedure: [
          "Record the temperature of crushed ice alone (pure solvent) in one beaker.",
          "In a second beaker, mix crushed ice thoroughly with a generous amount of common salt, and record the lowest temperature reached.",
        ],
        observation: "Pure crushed ice stays close to 0 °C. The ice-salt mixture drops to a much lower temperature (often around −10 °C to −20 °C, depending on the salt concentration).",
        conclusion:
          "Dissolving salt in the thin film of water on the surface of the ice lowers its freezing point (ΔTf = Kf·m), so the ice must absorb more heat from its surroundings before it can refreeze at the new, lower freezing point — this continuous melting-and-cooling cycle is what allows salt-ice mixtures to reach temperatures well below 0 °C, useful for old-fashioned ice-cream making and for de-icing roads.",
        safety: "Very cold ice-salt mixtures can cause skin damage similar to frostbite if handled directly for too long.",
        visual: {
          before: "hsl(200 30% 90%)",
          after: "hsl(200 40% 80%)",
          thermal: "endothermic",
          labels: { before: "Pure ice at 0 °C", after: "Ice + salt drops well below 0 °C" },
        },
      },
      {
        id: "osmosis-egg-membrane",
        title: "Demonstrating Osmosis Using a Semi-Permeable Membrane (Egg Model)",
        aim: "To observe osmosis using a de-shelled egg (whose membrane acts as a natural semi-permeable membrane).",
        materials: ["A raw egg with the hard shell dissolved away in vinegar (leaving only the membrane)", "A concentrated sugar/salt solution", "Distilled water", "Two beakers"],
        procedure: [
          "Prepare a de-shelled egg (soak a raw egg in vinegar for 24-48 hours until the calcium carbonate shell fully dissolves, leaving the membrane intact).",
          "Place the de-shelled egg in a beaker of concentrated sugar/salt solution and observe over several hours.",
          "Transfer the same egg to a beaker of distilled water and observe again over several hours.",
        ],
        observation: "In the concentrated solution, the egg visibly shrinks/shrivels (loses volume). In distilled water, the same egg visibly swells and becomes larger/firmer than its original size.",
        conclusion:
          "The egg's membrane acts as a semi-permeable membrane, allowing water molecules (but not larger solute molecules) to pass through. In the concentrated external solution, water moves out of the egg (from lower to higher solute concentration, i.e. from inside the egg, which is now relatively more dilute, to the concentrated solution outside), causing it to shrink. In pure water, water moves into the egg (since the egg's contents are more concentrated than pure water), causing it to swell — a direct demonstration of osmosis.",
        visual: {
          before: "hsl(45 40% 88%)",
          after: "hsl(45 40% 88%)",
          labels: { before: "Egg in concentrated solution — shrinks", after: "Egg in pure water — swells" },
        },
      },
      {
        id: "positive-negative-deviation-mixing",
        title: "Observing Volume/Temperature Changes on Mixing Non-Ideal Liquid Pairs",
        aim: "To relate the heat and volume change on mixing two liquids to whether the resulting solution shows positive or negative deviation from Raoult's Law.",
        materials: ["Ethanol and water (or acetone and carbon disulfide, for positive deviation)", "Chloroform and acetone (for negative deviation)", "A thermometer", "Two measuring cylinders per pair"],
        procedure: [
          "Measure equal volumes of ethanol and water separately, note their combined expected volume, then mix them and measure the actual final volume and any temperature change.",
          "Repeat with chloroform and acetone, again noting the temperature change on mixing.",
        ],
        observation: "Mixing ethanol and water often shows a slight volume contraction (or in some solvent pairs, an absorption of heat) suggesting weaker interactions, while mixing chloroform and acetone releases heat noticeably (the mixture becomes warm) and the final volume is slightly less than the sum of the two separate volumes.",
        conclusion:
          "A solution that releases heat on mixing and contracts in volume (like chloroform + acetone) indicates that the unlike molecules (A-B) attract each other more strongly than like molecules do (A-A, B-B) — this is a **negative deviation** from Raoult's Law, since the escaping tendency (vapour pressure) of each component is reduced below the ideal prediction. A solution that absorbs heat and expands slightly on mixing indicates weaker A-B interactions than A-A/B-B — a **positive deviation**, with a higher-than-ideal vapour pressure.",
        visual: {
          before: "hsl(200 15% 95%)",
          after: "hsl(200 15% 95%)",
          thermal: "exothermic",
          labels: { before: "Chloroform and acetone, separate", after: "Mixture warms — negative deviation" },
        },
      },
      {
        id: "henry-law-soda-water",
        title: "Henry's Law and the Fizz of Soda Water",
        aim: "To relate the fizzing of a soda water bottle upon opening to Henry's Law and the solubility of CO₂ under pressure.",
        materials: ["A sealed bottle of soda water (carbonated drink)", "A glass"],
        procedure: [
          "Observe a freshly opened, sealed bottle of soda water immediately after removing the cap — listen and watch for fizzing/bubbling.",
          "Pour a portion into a glass and leave it exposed to air for an hour, then observe again.",
        ],
        observation: "Vigorous fizzing and bubbling occur the instant the cap is removed. The soda water left standing exposed to air loses its fizz (goes 'flat') within an hour or so.",
        conclusion:
          "Soda water is bottled with CO₂ dissolved at high pressure, which (by Henry's Law, p = KH·x) allows a much higher concentration of CO₂ to dissolve than would be possible at normal atmospheric pressure. When the bottle is opened, the pressure above the liquid suddenly drops to atmospheric pressure, so the solubility of CO₂ drops sharply and the excess dissolved gas escapes rapidly as bubbles (fizzing); left open to air, the dissolved gas continues to slowly escape until the drink goes flat.",
        visual: {
          before: "hsl(35 20% 88%)",
          after: "hsl(35 20% 88%)",
          gas: "Carbon dioxide",
          labels: { before: "Sealed bottle, high pressure", after: "Cap removed — vigorous fizzing" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Molality of a solution is defined as:",
        options: [
          "Moles of solute per litre of solution",
          "Moles of solute per kilogram of solvent",
          "Grams of solute per 100 g of solution",
          "Moles of solute per mole of solvent",
        ],
        correctAnswer: 1,
        explanation: "Molality (m) is the number of moles of solute dissolved per kilogram of solvent, and unlike molarity, does not change with temperature.",
      },
      {
        question: "According to Henry's Law, the solubility of a gas in a liquid:",
        options: [
          "Is independent of pressure",
          "Is directly proportional to the partial pressure of the gas",
          "Decreases with increasing pressure",
          "Depends only on temperature, never pressure",
        ],
        correctAnswer: 1,
        explanation: "Henry's Law states p = KH·x, meaning the partial pressure of a gas above a liquid is directly proportional to its mole fraction (solubility) in the liquid.",
      },
      {
        question: "A solution that shows negative deviation from Raoult's Law has:",
        options: [
          "Weaker A-B interactions than A-A/B-B interactions",
          "Stronger A-B interactions than A-A/B-B interactions",
          "Zero interactions between all molecules",
          "The same interactions in all cases (it is ideal)",
        ],
        correctAnswer: 1,
        explanation: "Negative deviation occurs when the attractive forces between unlike molecules (A-B) are stronger than between like molecules (A-A or B-B), lowering the vapour pressure below the ideal prediction.",
      },
      {
        question: "Which of the following is NOT a colligative property?",
        options: ["Elevation of boiling point", "Depression of freezing point", "Colour of the solution", "Osmotic pressure"],
        correctAnswer: 2,
        explanation: "Colour depends on the specific identity of the solute, not just the number of particles, so it is not a colligative property; the other three depend only on particle count.",
      },
      {
        question: "Osmotic pressure of a solution is given by the formula:",
        options: ["π = CRT", "π = C/RT", "π = RT/C", "π = C + RT"],
        correctAnswer: 0,
        explanation: "Osmotic pressure π = CRT (analogous to the ideal gas equation), where C is the molar concentration of the solution.",
      },
      {
        question: "For a solute like NaCl that dissociates completely into 2 ions in solution, the van't Hoff factor (i) approaches:",
        options: ["0.5", "1", "2", "4"],
        correctAnswer: 2,
        explanation: "Since NaCl dissociates completely into Na⁺ and Cl⁻ (2 particles per formula unit), the van't Hoff factor i approaches 2.",
      },
      {
        question: "A solute that associates (e.g. forms dimers) in solution will show a van't Hoff factor:",
        options: ["Greater than 1", "Equal to 1", "Less than 1", "Equal to 0"],
        correctAnswer: 2,
        explanation: "Association reduces the effective number of particles in solution, so the van't Hoff factor is less than 1 (approaching 0.5 for complete dimerisation).",
      },
      {
        question: "Ethylene glycol is added to car radiators mainly to:",
        options: [
          "Increase the boiling point only",
          "Lower the freezing point of the coolant (antifreeze effect)",
          "Increase the density of water",
          "Make the water a better conductor",
        ],
        correctAnswer: 1,
        explanation: "Ethylene glycol, a non-volatile solute, lowers the freezing point of the water-based coolant (freezing point depression), preventing it from freezing in cold weather.",
      },
      {
        question: "Reverse osmosis is used in water purification because:",
        options: [
          "It removes only coloured impurities",
          "Applying pressure greater than osmotic pressure forces pure solvent out of the impure solution, through a semi-permeable membrane",
          "It boils away all impurities",
          "It adds more salt to purify water",
        ],
        correctAnswer: 1,
        explanation: "In reverse osmosis, applying a pressure greater than the osmotic pressure to the impure (concentrated) side reverses the natural flow of solvent, forcing pure water through the semi-permeable membrane, leaving impurities behind.",
      },
      {
        question: "Deep-sea divers use a helium-oxygen mixture instead of compressed air mainly to avoid:",
        options: [
          "Running out of oxygen",
          "Painful nitrogen bubble formation ('the bends') caused by high nitrogen solubility at high pressure",
          "Freezing underwater",
          "Excess carbon dioxide buildup",
        ],
        correctAnswer: 1,
        explanation: "At high underwater pressure, nitrogen becomes more soluble in blood (Henry's Law); rapid ascent can cause it to come out of solution as bubbles ('the bends'). Helium is far less soluble, reducing this risk.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define mole fraction.",
        answer: "Mole fraction is the ratio of the number of moles of a particular component to the total number of moles of all components present in the solution.",
      },
      {
        marks: 1,
        question: "State Henry's Law.",
        answer: "Henry's Law states that the partial pressure of a gas in the vapour phase above a solution is directly proportional to the mole fraction of the gas dissolved in the solution: p = KH·x.",
      },
      {
        marks: 2,
        question: "Define colligative properties, and name any two.",
        answer:
          "Colligative properties are properties of a solution that depend only on the number of solute particles present, not on their chemical identity. Examples: relative lowering of vapour pressure, and elevation of boiling point (or depression of freezing point, or osmotic pressure).",
      },
      {
        marks: 2,
        question: "What is the van't Hoff factor? What value does it take for a non-electrolyte solute?",
        answer:
          "The van't Hoff factor (i) is the ratio of the observed colligative property to the theoretically calculated (normal) colligative property, and accounts for the dissociation or association of a solute in solution. For a non-electrolyte solute (which neither dissociates nor associates), i = 1.",
      },
      {
        marks: 2,
        question: "Why does molality remain constant with a change in temperature, while molarity does not?",
        answer:
          "Molarity is defined in terms of the volume of the solution, and the volume of a liquid changes (usually expanding) with temperature, so molarity changes slightly with temperature. Molality is defined in terms of the mass of the solvent, and mass does not change with temperature, so molality remains constant regardless of temperature.",
      },
      {
        marks: 3,
        question: "State Raoult's Law for a solution of two volatile liquids, and explain what is meant by an ideal solution.",
        answer:
          "Raoult's Law states that, for a solution of two volatile liquids, the partial vapour pressure of each component is directly proportional to its mole fraction in the solution: p₁ = x₁p₁° and p₂ = x₂p₂°, where p₁° and p₂° are the vapour pressures of the pure components. An **ideal solution** is one that obeys Raoult's Law over the entire range of concentration, with zero enthalpy of mixing (ΔH_mix = 0) and zero volume change on mixing (ΔV_mix = 0), meaning the intermolecular forces between unlike molecules (A-B) are essentially the same as between like molecules (A-A and B-B).",
      },
      {
        marks: 3,
        question: "Explain the elevation of boiling point of a solution containing a non-volatile solute, and write the formula relating it to molality.",
        answer:
          "When a non-volatile solute is dissolved in a solvent, the vapour pressure of the resulting solution is lower than that of the pure solvent at any given temperature (relative lowering of vapour pressure). Since a liquid boils when its vapour pressure equals the external (atmospheric) pressure, the solution — having a lower vapour pressure at any given temperature — must be heated to a higher temperature than the pure solvent before its vapour pressure reaches atmospheric pressure; hence its boiling point is elevated. The elevation is given by ΔTb = Kb·m, where Kb is the solvent's molal boiling point elevation constant and m is the molality of the solution.",
      },
      {
        marks: 3,
        question: "Explain osmosis and osmotic pressure, and state one important application of reverse osmosis.",
        answer:
          "**Osmosis** is the spontaneous net movement of solvent molecules from a region of lower solute concentration (or pure solvent) to a region of higher solute concentration, through a semi-permeable membrane that allows only solvent molecules to pass. **Osmotic pressure** is the minimum external pressure that must be applied to the more concentrated solution to just stop (balance) this net flow of solvent. One application of **reverse osmosis** — applying a pressure greater than the osmotic pressure to force solvent to flow in the reverse direction, from the concentrated solution to the pure solvent side — is desalination, where reverse osmosis is used to purify seawater into drinkable fresh water by forcing water through a membrane that rejects the dissolved salts.",
      },
      {
        marks: 5,
        question:
          "(a) Derive/state the relationship between the relative lowering of vapour pressure and the mole fraction of the solute. (b) Calculate the vapour pressure of a solution made by dissolving a non-volatile solute such that its mole fraction is 0.2, given the vapour pressure of the pure solvent is 100 mm Hg.",
        answer:
          "(a) By Raoult's Law, the vapour pressure of the solution, p₁ = x₁p₁° (where x₁ is the mole fraction of the solvent). Since x₁ + x₂ = 1 (x₂ being the mole fraction of the solute), we get x₁ = 1 − x₂, so p₁ = (1 − x₂)p₁° = p₁° − x₂p₁°. Rearranging: (p₁° − p₁)/p₁° = x₂ — the relative lowering of vapour pressure equals the mole fraction of the (non-volatile) solute.\n(b) Given x₂ (solute) = 0.2, so x₁ (solvent) = 1 − 0.2 = 0.8. p₁ = x₁ × p₁° = 0.8 × 100 = **80 mm Hg**.",
      },
      {
        marks: 5,
        question:
          "(a) Explain why the observed molar mass of a solute like acetic acid, when dissolved in benzene, is found to be almost double its normal (formula) molar mass. (b) Define the van't Hoff factor and give its general formula.",
        answer:
          "(a) Acetic acid molecules can form a hydrogen-bonded dimer in a non-polar solvent like benzene, where two acetic acid molecules associate together via two hydrogen bonds (each -COOH group hydrogen bonding to the other), effectively behaving as a single larger particle. Since colligative properties depend on the number of particles present (not their formula mass), this association roughly halves the effective number of particles in solution. Because the observed molar mass is inversely related to the observed colligative property (and the colligative property is halved due to association), the calculated (observed) molar mass comes out to be almost double the true (normal) formula mass of acetic acid.\n(b) The van't Hoff factor, i, is the ratio of the observed value of a colligative property to the value calculated assuming no dissociation or association: i = (observed colligative property) / (calculated/normal colligative property) = (normal molar mass) / (observed/abnormal molar mass). For acetic acid dimerising in benzene, i approaches 0.5 as association becomes complete.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 2 — ELECTROCHEMISTRY
  // ================================================================
  {
    id: "electrochemistry",
    number: 2,
    title: "Electrochemistry",
    subtitle: "Turning chemical reactions into electricity, and electricity back into chemical change",
    description:
      "Electrochemical (galvanic) cells and electrolytic cells, standard electrode potentials, the Nernst equation, EMF and Gibbs energy, conductance of electrolytic solutions, Kohlrausch's law, electrolysis, and batteries and fuel cells.",
    icon: "🔋",
    color: "iris",
    readingTime: "29 min read",
    videos: [
      {
        title: "Electrochemistry — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/3s3sHcQ_Wc4",
      },
      {
        title: "The Nernst Equation Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/gOx6QicRIfE",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/GRV_C7QsE2M",
      },
    ],
    notes: `
# Electrochemistry

## Electrochemical Cells

An **electrochemical (galvanic/voltaic) cell** converts the chemical energy of a spontaneous redox reaction directly into electrical energy. It consists of two **half-cells** (electrodes dipped in electrolyte solutions), connected externally by a wire and internally by a **salt bridge**.

- **Anode** — the electrode where **oxidation** occurs (in a galvanic cell, this is the negative terminal).
- **Cathode** — the electrode where **reduction** occurs (in a galvanic cell, this is the positive terminal).

**Cell representation (Daniell cell):** Zn(s) | ZnSO₄(aq) || CuSO₄(aq) | Cu(s), where a single vertical line represents a phase boundary and the double line represents the salt bridge.

**Function of the salt bridge:** it completes the internal circuit, maintains electrical neutrality in both half-cells by allowing ion flow, and minimises the **liquid junction potential**.

## Electrode Potential and the Standard Hydrogen Electrode

The tendency of an electrode to lose or gain electrons is its **electrode potential**. Since only the difference in potential between two electrodes can be measured, a reference electrode is needed: the **Standard Hydrogen Electrode (SHE)** is arbitrarily assigned a potential of **exactly 0 V** under standard conditions (1 bar H₂ gas, 1 M H⁺, 298 K), and all other **standard electrode potentials (E°)** are measured relative to it, as standard **reduction** potentials.

### Electrochemical Series
Elements are arranged in order of their standard reduction potentials. A more positive E° indicates a **stronger oxidising agent** (greater tendency to be reduced); a more negative E° indicates a **stronger reducing agent** (greater tendency to be oxidised).

## Cell EMF (E°cell)

E°cell = E°cathode − E°anode

For a spontaneous reaction (a galvanic cell that will work), **E°cell must be positive**.

### Relation to Gibbs Energy
ΔG° = −nFE°cell

where n is the number of electrons transferred and F is the Faraday constant (96,500 C mol⁻¹). This confirms that a positive E°cell corresponds to a negative ΔG° (spontaneous reaction).

### The Nernst Equation
Since electrode potentials depend on concentration (not just standard conditions), the **Nernst equation** relates the actual cell EMF to the concentrations of the reacting species:

Ecell = E°cell − (RT ÷ nF)lnQ = E°cell − (0.0591 ÷ n)log₁₀Q  (at 298 K)

where Q is the reaction quotient.

### Relation to the Equilibrium Constant
At equilibrium, Ecell = 0, so the Nernst equation gives:
E°cell = (0.0591 ÷ n)log₁₀K꟤  (at 298 K)

## Conductance of Electrolytic Solutions

- **Conductivity (κ, specific conductance)** — the conductance of a solution of unit length and unit cross-sectional area; decreases with dilution for both strong and weak electrolytes (since the number of ions per unit volume decreases).
- **Molar conductivity (Λm)** — conductivity divided by molar concentration: Λm = κ × 1000/C; INCREASES with dilution for both strong and weak electrolytes (since ionic interactions decrease, or, for weak electrolytes, since dissociation increases with dilution).
- **Limiting molar conductivity (Λm°)** — the molar conductivity at infinite dilution (zero concentration).

### Kohlrausch's Law of Independent Migration of Ions
At infinite dilution, each ion contributes a fixed, definite value to the total molar conductivity of an electrolyte, independent of the nature of the other ion it is associated with:

Λm° = ν₊λ₊° + ν₋λ₋°

This is especially useful for calculating Λm° for a **weak electrolyte** (like acetic acid), which cannot be measured directly by extrapolation (since a weak electrolyte's conductivity rises sharply and non-linearly at very low concentrations), by combining the known Λm° values of strong electrolytes containing the same ions.

**Degree of dissociation (α) of a weak electrolyte:** α = Λm / Λm° at a given concentration.

## Electrolytic Cells and Electrolysis

Unlike a galvanic cell, an **electrolytic cell** uses electrical energy to drive a **non-spontaneous** redox reaction (electrolysis). In electrolysis, oxidation still occurs at the anode and reduction at the cathode, but here the anode is the **positive** terminal (connected to the external power source) and the cathode is the **negative** terminal.

### Faraday's Laws of Electrolysis
1. **First Law:** the amount of a substance deposited/liberated at an electrode is directly proportional to the quantity of electric charge passed through the electrolyte: w ∝ Q (where Q = It, current × time).
2. **Second Law:** when the same quantity of electricity is passed through different electrolytes, the masses of the substances deposited/liberated are proportional to their equivalent masses.

## Batteries and Fuel Cells

- **Primary batteries** (e.g. the dry cell/Leclanché cell) cannot be recharged, as the electrode reactions are not reversible once the reactants are used up.
- **Secondary batteries** (e.g. the lead storage/lead-acid battery used in cars) can be recharged by passing current in the reverse direction, reversing the cell reaction.
- **Fuel cells** (e.g. the hydrogen-oxygen fuel cell) convert the energy of combustion of a fuel (like H₂) directly into electrical energy, continuously, as long as fuel is supplied; they are more efficient and less polluting than conventional combustion engines, producing only water as a by-product in the case of the H₂-O₂ fuel cell.

## Corrosion (an Electrochemical Process)

Corrosion (like the rusting of iron) is fundamentally an electrochemical phenomenon: it involves oxidation of the metal at one spot (acting as the anode), reduction of dissolved oxygen at another spot (acting as the cathode), and the flow of electrons through the metal and ions through the surrounding moisture film — essentially forming a tiny galvanic cell on the metal's own surface.
    `,
    experiments: [
      {
        id: "daniell-cell-construction",
        title: "Constructing and Measuring the EMF of a Daniell Cell",
        aim: "To construct a Daniell cell and measure its EMF, comparing it with the theoretical standard cell potential.",
        materials: ["Zinc electrode and ZnSO₄ solution", "Copper electrode and CuSO₄ solution", "A salt bridge (KCl/KNO₃ soaked filter paper or agar-agar tube)", "A voltmeter", "Connecting wires"],
        procedure: [
          "Set up a zinc rod in ZnSO₄ solution in one beaker, and a copper rod in CuSO₄ solution in another.",
          "Connect the two electrodes externally to a voltmeter, and connect the two solutions internally with a salt bridge.",
          "Record the voltmeter reading (the cell EMF).",
        ],
        observation: "The voltmeter shows a steady reading of approximately 1.1 V, close to the theoretical standard EMF of the Daniell cell (E°cell = E°(Cu²⁺/Cu) − E°(Zn²⁺/Zn) = 0.34 − (−0.76) = 1.10 V).",
        reaction: "Anode (oxidation): Zn → Zn²⁺ + 2e⁻ ; Cathode (reduction): Cu²⁺ + 2e⁻ → Cu ; Overall: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)",
        conclusion:
          "The measured EMF closely matches the theoretical value calculated from standard reduction potentials, confirming that E°cell = E°cathode − E°anode, and demonstrating that a spontaneous redox reaction can be harnessed to produce a steady, measurable electrical potential.",
        visual: {
          before: "hsl(210 60% 60%)",
          after: "hsl(210 45% 55%)",
          labels: { before: "Zn and Cu half-cells connected by salt bridge", after: "Voltmeter reads ~1.1 V" },
        },
      },
      {
        id: "electrolysis-copper-sulphate",
        title: "Electrolysis of Copper Sulphate Solution with Copper Electrodes",
        aim: "To observe electrolysis and Faraday's laws using copper electrodes in copper sulphate solution (a model for electroplating/refining).",
        materials: ["Copper sulphate solution", "Two clean, pre-weighed copper electrodes", "A DC power source", "An ammeter and a stopwatch"],
        procedure: [
          "Weigh both copper electrodes accurately before starting.",
          "Set up the electrodes in CuSO₄ solution, connect to a DC power source through an ammeter, and pass a measured, constant current for a fixed time.",
          "Remove, dry and reweigh both electrodes after the experiment.",
        ],
        observation: "The anode (connected to the positive terminal) loses mass, while the cathode (connected to the negative terminal) gains mass, roughly matching the mass predicted by Faraday's first law (w = ZIt, where Z is the electrochemical equivalent).",
        reaction: "At anode: Cu(s) → Cu²⁺(aq) + 2e⁻ ; At cathode: Cu²⁺(aq) + 2e⁻ → Cu(s)",
        conclusion:
          "The mass of copper deposited at the cathode (and dissolved from the anode) is directly proportional to the quantity of charge passed (Q = It), confirming Faraday's first law of electrolysis, and demonstrating the basic principle behind electroplating and electrolytic refining.",
        visual: {
          before: "hsl(195 60% 60%)",
          after: "hsl(195 60% 60%)",
          labels: { before: "Cu electrodes, before current passed", after: "Cathode gains mass, anode loses mass" },
        },
      },
      {
        id: "conductivity-strong-weak-electrolyte",
        title: "Comparing Conductivity of Strong and Weak Electrolytes",
        aim: "To compare the electrical conductivity of a strong electrolyte and a weak electrolyte at the same concentration.",
        materials: ["Dilute hydrochloric acid (strong electrolyte)", "Dilute acetic acid (weak electrolyte, same molar concentration)", "A conductivity meter or simple bulb-and-electrode circuit", "Two beakers"],
        procedure: [
          "Prepare solutions of HCl and acetic acid at the same molar concentration.",
          "Test the conductivity of each using a conductivity meter (or observe the relative brightness of a bulb in a simple circuit).",
        ],
        observation: "The HCl solution shows significantly higher conductivity (or a much brighter bulb) than the acetic acid solution of the same concentration.",
        conclusion:
          "HCl, a strong electrolyte, ionises almost completely in water, producing a high concentration of mobile H⁺ and Cl⁻ ions. Acetic acid, a weak electrolyte, ionises only partially, so at the same overall concentration it produces far fewer ions in solution, giving it much lower conductivity — this directly illustrates the difference between strong and weak electrolytes in terms of their degree of dissociation.",
        visual: {
          before: "hsl(0 0% 20%)",
          after: "hsl(48 90% 55%)",
          labels: { before: "Weak electrolyte — dim bulb", after: "Strong electrolyte — bulb glows brightly" },
        },
      },
      {
        id: "electroplating-demo",
        title: "Electroplating a Metal Object with Copper",
        aim: "To electroplate a small metal object (e.g. a key or a coin) with a thin layer of copper, applying the principles of electrolysis.",
        materials: ["A small metal object to be plated (cathode)", "A pure copper rod/strip (anode)", "Copper sulphate solution (electrolyte)", "A DC power source", "Sandpaper (to clean the object first)"],
        procedure: [
          "Clean the surface of the object to be plated with sandpaper to remove any grease/oxide layer.",
          "Connect the object as the cathode (negative terminal) and a pure copper strip as the anode (positive terminal), both dipped in copper sulphate solution.",
          "Pass a small, steady current for several minutes and observe the object's surface.",
        ],
        observation: "A shiny, reddish-brown, even layer of copper gradually builds up on the surface of the object connected as the cathode.",
        reaction: "At cathode (object): Cu²⁺(aq) + 2e⁻ → Cu(s) (deposits on object) ; At anode (pure Cu strip): Cu(s) → Cu²⁺(aq) + 2e⁻ (dissolves, replenishing the solution)",
        conclusion:
          "Electroplating works by making the object to be coated the cathode of an electrolytic cell; Cu²⁺ ions from solution are reduced and deposit as metallic copper on its surface, while the copper anode continuously dissolves to replace the Cu²⁺ ions used up — keeping the concentration of the electrolyte roughly constant throughout the process.",
        visual: {
          before: "hsl(210 8% 60%)",
          after: "hsl(20 55% 40%)",
          labels: { before: "Clean object before plating", after: "Coated with a layer of copper" },
        },
      },
      {
        id: "rusting-electrochemical-cell",
        title: "Demonstrating that Rusting Is an Electrochemical Process",
        aim: "To show that rusting requires both oxygen and water, consistent with its electrochemical mechanism.",
        materials: ["Three iron nails", "Three test tubes", "Boiled, cooled water with a layer of oil on top (to exclude air)", "Dry calcium chloride (a drying agent, to exclude moisture)", "Ordinary tap water (with air present)"],
        procedure: [
          "Place a clean iron nail in a test tube of ordinary water exposed to air (control).",
          "Place a second nail in a test tube of boiled, cooled water with a layer of oil floating on top (to exclude dissolved air/oxygen).",
          "Place a third nail in a test tube containing anhydrous calcium chloride (which keeps the air inside completely dry).",
          "Leave all three for several days and observe.",
        ],
        observation: "The nail in ordinary water exposed to air rusts noticeably. The nail in oxygen-free (boiled) water shows little to no rusting. The nail kept in dry air (over calcium chloride) also shows little to no rusting.",
        conclusion:
          "Since rusting occurs only when both moisture and dissolved oxygen are present together (and not when either is absent), this confirms that rusting is an electrochemical process, requiring water to act as the electrolyte (allowing ion movement) and oxygen to be reduced at cathodic regions on the iron surface, while iron is oxidised at anodic regions elsewhere on the same metal surface.",
        visual: {
          before: "hsl(210 8% 55%)",
          after: "hsl(20 55% 40%)",
          labels: { before: "Iron nail in ordinary water + air", after: "Rusts; nails without O₂ or water do not" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "In a galvanic cell, oxidation occurs at the:",
        options: ["Cathode", "Anode", "Salt bridge", "Neither electrode"],
        correctAnswer: 1,
        explanation: "In any electrochemical cell (galvanic or electrolytic), oxidation always occurs at the anode, and reduction always occurs at the cathode.",
      },
      {
        question: "The Standard Hydrogen Electrode (SHE) is assigned a standard reduction potential of:",
        options: ["+1 V", "−1 V", "0 V exactly", "It varies with temperature"],
        correctAnswer: 2,
        explanation: "The SHE is arbitrarily assigned a standard reduction potential of exactly 0 V, serving as the reference point against which all other standard electrode potentials are measured.",
      },
      {
        question: "For a spontaneous galvanic cell reaction, the standard cell EMF (E°cell) must be:",
        options: ["Negative", "Zero", "Positive", "Undefined"],
        correctAnswer: 2,
        explanation: "A positive E°cell corresponds to a negative ΔG° (since ΔG° = −nFE°cell), meaning the reaction is thermodynamically spontaneous.",
      },
      {
        question: "The Nernst equation relates cell EMF to:",
        options: [
          "Only the standard cell potential",
          "The concentrations of the species involved in the cell reaction",
          "The mass of the electrodes only",
          "The colour of the solution",
        ],
        correctAnswer: 1,
        explanation: "The Nernst equation, Ecell = E°cell − (0.0591/n)log Q, relates the actual (non-standard) cell EMF to the concentrations (via the reaction quotient Q) of the species involved.",
      },
      {
        question: "Molar conductivity of both strong and weak electrolytes:",
        options: [
          "Decreases with dilution",
          "Increases with dilution",
          "Remains constant with dilution",
          "Is always zero at infinite dilution",
        ],
        correctAnswer: 1,
        explanation: "Molar conductivity increases with dilution for both strong electrolytes (due to decreasing inter-ionic attraction) and weak electrolytes (due to increasing degree of dissociation).",
      },
      {
        question: "Kohlrausch's law of independent migration of ions is especially useful for calculating:",
        options: [
          "The conductivity of pure water",
          "The limiting molar conductivity of a weak electrolyte",
          "The mass of metal deposited during electrolysis",
          "The standard hydrogen electrode potential",
        ],
        correctAnswer: 1,
        explanation: "Since weak electrolytes cannot be extrapolated directly to infinite dilution, Kohlrausch's law allows their limiting molar conductivity to be calculated by combining known values from strong electrolytes sharing the same ions.",
      },
      {
        question: "In an electrolytic cell, the anode is connected to the:",
        options: ["Negative terminal of the external power source", "Positive terminal of the external power source", "Salt bridge directly", "Nothing — it floats freely"],
        correctAnswer: 1,
        explanation: "In an electrolytic cell, the anode (where oxidation occurs) is connected to the positive terminal of the external DC power source, unlike in a galvanic cell where the anode is the negative terminal.",
      },
      {
        question: "According to Faraday's First Law of Electrolysis, the mass of substance deposited at an electrode is directly proportional to:",
        options: [
          "The temperature of the electrolyte only",
          "The quantity of electric charge passed",
          "The colour of the electrolyte",
          "The distance between the electrodes",
        ],
        correctAnswer: 1,
        explanation: "Faraday's First Law states that the mass of a substance liberated/deposited at an electrode is directly proportional to the quantity of electricity (charge, Q = It) passed through the electrolyte.",
      },
      {
        question: "A secondary battery, unlike a primary battery, can be:",
        options: ["Used only once", "Recharged by reversing the current", "Used without any electrolyte", "Used only as a fuel cell"],
        correctAnswer: 1,
        explanation: "Secondary batteries (like the lead storage battery) have reversible electrode reactions and can be recharged by passing current in the reverse direction, unlike primary batteries.",
      },
      {
        question: "Corrosion of iron (rusting) is best described as:",
        options: ["A purely physical process", "An electrochemical process involving oxidation and reduction on the metal surface", "A nuclear process", "A process that requires no water at all"],
        correctAnswer: 1,
        explanation: "Rusting is an electrochemical process: iron is oxidised at anodic regions, dissolved oxygen is reduced at cathodic regions, and moisture on the metal surface acts as the electrolyte connecting them.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "What is the function of a salt bridge in a galvanic cell?",
        answer: "A salt bridge completes the internal circuit of the cell, maintains electrical neutrality in both half-cells by allowing the flow of ions, and minimises the liquid junction potential.",
      },
      {
        marks: 1,
        question: "Write the relationship between standard Gibbs energy change and standard cell EMF.",
        answer: "ΔG° = −nFE°cell, where n is the number of electrons transferred in the balanced cell reaction and F is the Faraday constant (96,500 C mol⁻¹).",
      },
      {
        marks: 2,
        question: "Distinguish between a galvanic cell and an electrolytic cell.",
        answer:
          "A **galvanic (voltaic) cell** converts the chemical energy of a spontaneous redox reaction into electrical energy; the anode is the negative terminal. An **electrolytic cell** uses electrical energy (from an external source) to drive a non-spontaneous redox reaction; the anode is the positive terminal (connected to the source). In both, oxidation occurs at the anode and reduction at the cathode.",
      },
      {
        marks: 2,
        question: "State Kohlrausch's law of independent migration of ions.",
        answer: "Kohlrausch's law states that, at infinite dilution, each ion migrates independently and contributes a fixed, definite value to the total molar conductivity of an electrolyte, regardless of the nature of the other ion it is associated with: Λm° = ν₊λ₊° + ν₋λ₋°.",
      },
      {
        marks: 2,
        question: "Why does molar conductivity increase with dilution for a weak electrolyte more sharply than for a strong electrolyte?",
        answer:
          "For a strong electrolyte (already fully dissociated), molar conductivity increases with dilution only modestly, due to decreasing inter-ionic attraction as ions move further apart. For a weak electrolyte, dilution significantly increases its **degree of dissociation** (by Le Chatelier's principle, since dilution favours the side with more particles), producing many more ions per mole of electrolyte as concentration decreases — so molar conductivity rises much more sharply with dilution for a weak electrolyte.",
      },
      {
        marks: 3,
        question: "Explain the relationship between E°cell and the equilibrium constant of a cell reaction.",
        answer:
          "At equilibrium, the cell EMF, Ecell, becomes zero (since there is no longer any net driving force for the reaction). Substituting Ecell = 0 into the Nernst equation, Ecell = E°cell − (0.0591/n)log₁₀Q, and noting that Q = Kc at equilibrium, gives: E°cell = (0.0591/n)log₁₀Kc. This shows that a larger, more positive E°cell corresponds to a larger equilibrium constant, meaning the reaction proceeds further towards completion.",
      },
      {
        marks: 3,
        question: "Describe the working of a hydrogen-oxygen fuel cell, and state one advantage it has over a conventional combustion engine.",
        answer:
          "In a hydrogen-oxygen fuel cell, hydrogen gas is continuously supplied to the anode, where it is oxidised (losing electrons): H₂ + 2OH⁻ → 2H₂O + 2e⁻ (in alkaline medium). Oxygen gas is continuously supplied to the cathode, where it is reduced (gaining electrons): O₂ + 2H₂O + 4e⁻ → 4OH⁻. The overall reaction is 2H₂ + O₂ → 2H₂O, and the electrons flow through an external circuit as useful electrical current, as long as fuel is continuously supplied.\nAdvantage: a fuel cell converts chemical energy directly and efficiently into electrical energy (without the intermediate step of generating heat, unlike a combustion engine), and the hydrogen-oxygen fuel cell produces only water as a by-product, making it far less polluting than a conventional fossil-fuel combustion engine.",
      },
      {
        marks: 3,
        question: "State Faraday's two laws of electrolysis.",
        answer:
          "**First Law:** the mass of a substance deposited or liberated at an electrode during electrolysis is directly proportional to the quantity of electric charge (Q = It) passed through the electrolyte.\n**Second Law:** when the same quantity of electric charge is passed through different electrolytes connected in series, the masses of different substances deposited or liberated at their respective electrodes are directly proportional to their equivalent masses (chemical equivalent weights).",
      },
      {
        marks: 5,
        question:
          "(a) Write the cell representation and the Nernst equation for the Daniell cell, Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s). (b) Calculate the cell EMF if E°(Zn²⁺/Zn) = −0.76 V and E°(Cu²⁺/Cu) = +0.34 V, [Zn²⁺] = 0.1 M and [Cu²⁺] = 1 M, at 298 K (n = 2 for this reaction).",
        answer:
          "(a) Cell representation: **Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)**, with overall reaction Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s). The Nernst equation for this cell: Ecell = E°cell − (0.0591/2)log₁₀([Zn²⁺]/[Cu²⁺]).\n(b) E°cell = E°cathode − E°anode = 0.34 − (−0.76) = **1.10 V**. Substituting into the Nernst equation: Ecell = 1.10 − (0.0591/2)log₁₀(0.1/1) = 1.10 − (0.02955)(−1) = 1.10 + 0.02955 ≈ **1.13 V**.",
      },
      {
        marks: 5,
        question:
          "(a) Explain why electrode potential values are always reported as reduction potentials, using the standard hydrogen electrode as reference. (b) Describe how the standard hydrogen electrode is constructed.",
        answer:
          "(a) Since it is impossible to measure the absolute potential of a single, isolated electrode (any measurement necessarily involves connecting it to a second electrode, forming a complete circuit), electrode potentials are always defined relative to a common, universally agreed reference electrode. By convention, IUPAC reports all standard electrode potentials as **standard reduction potentials** (the potential associated with the reduction half-reaction), with the standard hydrogen electrode (SHE) arbitrarily fixed at exactly 0 V; this allows every other electrode's tendency to be reduced (or, if its potential is negative, its tendency to instead be oxidised) to be compared on a single, consistent numerical scale.\n(b) The standard hydrogen electrode consists of a platinum electrode (coated with finely divided platinum black, to increase surface area and catalyse the reaction) immersed in a 1 M solution of H⁺ ions, over which pure hydrogen gas is continuously bubbled at a pressure of 1 bar, all maintained at 298 K. The electrode reaction is H⁺(aq) + e⁻ ⇌ ½H₂(g), and this entire assembly is assigned a standard potential of exactly 0 V.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 3 — CHEMICAL KINETICS
  // ================================================================
  {
    id: "chemical-kinetics",
    number: 3,
    title: "Chemical Kinetics",
    subtitle: "How fast reactions go, and why — rate laws, order, and the Arrhenius equation",
    description:
      "Rate of a reaction and factors affecting it, rate laws and order of reaction, integrated rate equations for zero- and first-order reactions, half-life, the effect of temperature (Arrhenius equation and activation energy), and an introduction to collision theory.",
    icon: "⏱️",
    color: "moss",
    readingTime: "26 min read",
    videos: [
      {
        title: "Chemical Kinetics — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/0h1WQGdOatI",
      },
      {
        title: "Order of Reaction and Rate Laws Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/8N1BxHgsoOw",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/JW-8fWlH0Xw",
      },
    ],
    notes: `
# Chemical Kinetics

## Rate of a Chemical Reaction

**Chemical kinetics** is the branch of chemistry that studies the **speed (rate)** of chemical reactions, and the factors that affect it. The **rate of reaction** is the change in concentration of a reactant or product per unit time.

Average rate = Δ[concentration] ÷ Δt

**Instantaneous rate** is the rate at a particular instant of time, found as the slope of the concentration-vs-time curve at that point (i.e. the derivative, −d[R]/dt for a reactant R, or +d[P]/dt for a product P).

## Factors Affecting Rate of Reaction

1. **Concentration of reactants** — rate generally increases with increasing concentration (more frequent collisions).
2. **Temperature** — rate generally increases with increasing temperature (more frequent AND more energetic collisions).
3. **Catalyst** — a catalyst increases the rate by providing an alternative pathway with lower activation energy, without being consumed itself.
4. **Surface area** — for heterogeneous reactions (e.g. involving a solid), rate increases with increasing surface area (e.g. powdered solid reacts faster than a lump).
5. **Nature of reactants** — some reactants are inherently more reactive than others.

## Rate Law and Order of Reaction

For a reaction aA + bB → products, the **rate law** (determined experimentally, NOT from the stoichiometric equation) is:

Rate = k[A]ˣ[B]ʸ

where k is the **rate constant**, and x and y are the individual **orders** with respect to A and B (which may or may not equal the stoichiometric coefficients a and b).

- **Order of reaction** = sum of the powers (x + y) to which concentration terms are raised in the rate law; it can be zero, a positive/negative integer, or even a fraction, and must be determined experimentally.
- **Molecularity** — the number of reacting species (atoms/ions/molecules) that must collide simultaneously to bring about a chemical reaction in an elementary (single-step) reaction; molecularity is always a whole number and applies only to elementary reactions/steps, whereas order can apply to overall (possibly multi-step) reactions.
- The slowest step of a multi-step reaction mechanism is called the **rate-determining step**, and the overall rate law of the reaction is governed by this step.

## Integrated Rate Equations

### Zero-Order Reactions
Rate is independent of the concentration of the reactant(s): Rate = k[A]⁰ = k.

[A] = [A]₀ − kt

A plot of [A] versus t gives a straight line with slope −k. (e.g. certain enzyme-catalysed, or heterogeneous surface-catalysed, reactions.)

### First-Order Reactions
Rate depends on the concentration of one reactant, raised to the power 1: Rate = k[A].

k = (2.303 ÷ t)log₁₀([A]₀ ÷ [A])

A plot of ln[A] (or log₁₀[A]) versus t gives a straight line with slope −k (or −k/2.303).

### Half-Life (t½)
The time required for the concentration of a reactant to reduce to half of its initial value.
- **Zero-order:** t½ = [A]₀/2k (depends on initial concentration).
- **First-order:** t½ = 0.693/k (**independent of initial concentration** — a defining characteristic of first-order kinetics, e.g. radioactive decay).

## Pseudo First-Order Reactions

A reaction that is intrinsically of higher order but behaves like a first-order reaction because one reactant is present in large excess (so its concentration barely changes and can be treated as approximately constant). Example: the acid-catalysed hydrolysis of an ester, where water is the solvent and present in huge excess: CH₃COOC₂H₅ + H₂O →[H⁺] CH₃COOH + C₂H₅OH, rate = k'[ester][water] ≈ k[ester] (since [water] is essentially constant).

## Temperature Dependence of Rate — The Arrhenius Equation

Rate of reaction typically increases roughly two- to three-fold for every 10 °C rise in temperature (temperature coefficient). This dependence is quantified by the **Arrhenius equation**:

k = Ae^(−Ea/RT)

where A is the **Arrhenius (pre-exponential/frequency) factor**, Ea is the **activation energy**, R is the gas constant, and T is the absolute temperature.

Taking the natural log gives a linear form: ln k = ln A − Ea/RT, so a graph of ln k versus 1/T gives a straight line with slope −Ea/R, allowing Ea to be determined experimentally.

### Activation Energy
The minimum extra energy that reacting molecules must possess (above their average energy) for a collision to result in a successful reaction, forming an unstable, high-energy intermediate state called the **activated complex (transition state)**.

::diagram:energy-diagram

## Collision Theory of Chemical Reactions

Collision theory states that a chemical reaction occurs as a result of collisions between reacting molecules, but **not every collision leads to a reaction** — only those collisions that satisfy two conditions:
1. The colliding molecules must have **sufficient kinetic energy** (equal to or greater than the activation energy).
2. The molecules must be **correctly oriented** relative to each other at the moment of collision (proper orientation for the necessary bonds to break and form).

A catalyst works by providing an alternative reaction pathway with a **lower activation energy**, so that a much larger fraction of collisions become successful, increasing the rate, without altering the overall thermodynamics (ΔH or ΔG) of the reaction, or the position of equilibrium.
    `,
    experiments: [
      {
        id: "sodium-thiosulphate-acid-rate",
        title: "The 'Disappearing Cross' — Rate of Reaction Between Sodium Thiosulphate and Hydrochloric Acid",
        aim: "To measure how the rate of a reaction changes with the concentration of a reactant, using the classic thiosulphate-acid clock reaction.",
        materials: ["Sodium thiosulphate solution (several different concentrations)", "Dilute hydrochloric acid", "A conical flask", "A piece of paper marked with a black cross", "A stopwatch"],
        procedure: [
          "Place the conical flask over the paper marked with a cross, and add a fixed volume of sodium thiosulphate solution at a chosen concentration.",
          "Add a fixed volume of dilute HCl, start the stopwatch immediately, and swirl to mix.",
          "Note the time taken for the cross (viewed from above, through the solution) to become obscured by the sulphur precipitate that forms; repeat with different thiosulphate concentrations (keeping HCl volume/concentration fixed).",
        ],
        observation:
          "The solution gradually turns cloudy/milky as a pale yellow precipitate of sulphur forms, eventually completely obscuring the cross. The time taken for the cross to disappear is shorter when a more concentrated thiosulphate solution is used.",
        reaction: "Na₂S₂O₃(aq) + 2HCl(aq) → 2NaCl(aq) + S(s)↓ + SO₂(g) + H₂O(l)",
        conclusion:
          "Since the time taken for a fixed amount of sulphur (enough to obscure the cross) to form decreases as thiosulphate concentration increases, the rate of reaction (∝ 1/time) increases with increasing reactant concentration — confirming the general dependence of reaction rate on concentration.",
        visual: {
          before: "hsl(60 20% 96%)",
          after: "hsl(50 15% 88%)",
          precipitate: { name: "Sulphur", colour: "hsl(50 60% 80%)" },
          labels: { before: "Clear solution, cross visible", after: "Cloudy — cross obscured" },
        },
      },
      {
        id: "magnesium-acid-surface-area",
        title: "Effect of Surface Area on Reaction Rate",
        aim: "To show that increasing the surface area of a solid reactant increases the rate of reaction, using magnesium ribbon versus magnesium powder.",
        materials: ["A strip of magnesium ribbon", "Magnesium powder (same total mass as the ribbon)", "Dilute hydrochloric acid (same concentration and volume for both trials)", "Two test tubes", "A stopwatch"],
        procedure: [
          "Add a fixed volume of dilute HCl to a test tube containing the magnesium ribbon, and immediately start timing.",
          "Repeat with an equal mass of magnesium powder in a fresh sample of the same acid, timing again.",
          "Compare how quickly each sample completely dissolves/stops bubbling.",
        ],
        observation: "Magnesium powder reacts much faster (finishes bubbling/dissolving in a much shorter time) than the magnesium ribbon of the same total mass.",
        reaction: "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑",
        conclusion:
          "Powdered magnesium has a much larger total surface area exposed to the acid than the same mass of ribbon, so more magnesium atoms are available for collision with acid molecules at any given moment, resulting in a much faster reaction rate — confirming that increasing surface area increases reaction rate for heterogeneous (solid-liquid) reactions.",
        visual: {
          before: "hsl(210 8% 78%)",
          after: "hsl(40 30% 96%)",
          gas: "Hydrogen",
          labels: { before: "Mg powder added to acid", after: "Reacts and finishes much faster than ribbon" },
        },
      },
      {
        id: "h2o2-decomposition-temperature",
        title: "Effect of Temperature on the Rate of Decomposition of Hydrogen Peroxide",
        aim: "To study how increasing temperature affects the rate of the catalysed decomposition of hydrogen peroxide.",
        materials: ["Hydrogen peroxide solution", "Manganese dioxide (catalyst)", "Two test tubes", "A water bath for heating", "A stopwatch and a way to measure gas volume (e.g. an inverted measuring cylinder)"],
        procedure: [
          "Add a fixed amount of MnO₂ to a fixed volume of H₂O₂ at room temperature, and measure the volume of oxygen gas collected in a fixed time.",
          "Repeat the exact same procedure, but first warm the H₂O₂ solution in a water bath to a higher, controlled temperature before adding the catalyst.",
          "Compare the volumes of gas collected in the same fixed time interval for both trials.",
        ],
        observation: "A noticeably larger volume of oxygen gas is collected in the same time period from the warmed sample compared to the room-temperature sample.",
        reaction: "2H₂O₂(aq) →[MnO₂, warmer] 2H₂O(l) + O₂(g) (faster at higher temperature)",
        conclusion:
          "Increasing temperature increases the reaction rate, since a larger fraction of the reacting molecules possess kinetic energy equal to or greater than the activation energy at higher temperatures (as described by the Arrhenius equation and the Maxwell-Boltzmann distribution of molecular energies), resulting in more frequent successful collisions.",
        visual: {
          before: "hsl(200 15% 96%)",
          after: "hsl(200 15% 96%)",
          gas: "Oxygen",
          thermal: "endothermic",
          labels: { before: "Warmed H₂O₂ + catalyst", after: "Faster, more vigorous bubbling" },
        },
      },
      {
        id: "catalyst-effect-h2o2-rate",
        title: "Effect of a Catalyst on Reaction Rate",
        aim: "To demonstrate that a catalyst increases the rate of decomposition of hydrogen peroxide without being consumed.",
        materials: ["Hydrogen peroxide solution (two equal samples)", "Manganese dioxide powder", "Two test tubes", "A glowing splinter"],
        procedure: [
          "Leave one sample of hydrogen peroxide solution undisturbed at room temperature (control).",
          "Add a pinch of manganese dioxide to the second sample and observe immediately.",
          "Test the gas evolved from the catalysed sample with a glowing splinter, and note that the MnO₂ can be recovered (filtered out) unchanged in mass and appearance after the reaction.",
        ],
        observation: "The control sample shows very little visible reaction over the observation period. The catalysed sample fizzes vigorously immediately, and the glowing splinter relights, confirming oxygen. The MnO₂ powder, once filtered and dried, appears unchanged.",
        reaction: "2H₂O₂(aq) →[MnO₂ catalyst] 2H₂O(l) + O₂(g)",
        conclusion:
          "Manganese dioxide dramatically increases the rate of decomposition of hydrogen peroxide by providing an alternative reaction pathway with lower activation energy, without being consumed or permanently altered in the process — the defining characteristics of a catalyst.",
        visual: {
          before: "hsl(200 15% 96%)",
          after: "hsl(200 15% 96%)",
          gas: "Oxygen",
          labels: { before: "Without catalyst — slow", after: "With catalyst — rapid bubbling" },
        },
      },
      {
        id: "iodine-clock-order-determination",
        title: "Using the Iodine Clock Reaction to Study Order of Reaction",
        aim: "To use a clock reaction (measuring the time for a fixed, small change to occur) to investigate how reaction rate depends on the concentration of one reactant, illustrating the concept of order.",
        materials: ["Potassium iodate solution (variable concentrations)", "Sodium metabisulphite/starch solution (fixed concentration)", "Beakers", "A stopwatch"],
        procedure: [
          "Mix a fixed volume of sodium metabisulphite/starch solution with potassium iodate solution at a chosen concentration, starting the stopwatch immediately upon mixing.",
          "Record the time taken for the solution to suddenly turn blue-black.",
          "Repeat with several different (known) concentrations of potassium iodate, keeping all other conditions constant, and record each corresponding time.",
        ],
        observation:
          "As the concentration of potassium iodate is increased, the time taken for the blue-black colour to appear decreases (the reaction speeds up); plotting rate (∝ 1/time) against iodate concentration typically shows an approximately proportional (straight-line) relationship.",
        conclusion:
          "Since rate is found to be directly proportional to the concentration of iodate (rate ∝ [IO₃⁻]¹), this experimental result establishes that the reaction is first order with respect to potassium iodate under these conditions — demonstrating how the order of a reaction with respect to a given reactant is determined experimentally by observing how rate changes as concentration is systematically varied, rather than being assumed from the balanced equation.",
        visual: {
          before: "hsl(200 15% 96%)",
          after: "hsl(240 60% 20%)",
          labels: { before: "Higher iodate concentration mixed", after: "Blue-black colour appears sooner" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "The order of a chemical reaction is determined:",
        options: [
          "From the stoichiometric coefficients of the balanced equation",
          "Experimentally, from the rate law",
          "By counting the number of reactant molecules only",
          "It is always equal to the molecularity",
        ],
        correctAnswer: 1,
        explanation: "Unlike molecularity, the order of a reaction cannot be predicted from the balanced equation alone — it must be determined experimentally from the observed rate law.",
      },
      {
        question: "For a first-order reaction, the half-life (t½):",
        options: [
          "Depends on the initial concentration",
          "Is independent of the initial concentration",
          "Is always equal to zero",
          "Increases with time",
        ],
        correctAnswer: 1,
        explanation: "The half-life of a first-order reaction, t½ = 0.693/k, is a constant that does not depend on the initial concentration of the reactant — a defining feature of first-order kinetics.",
      },
      {
        question: "A pseudo first-order reaction is one that:",
        options: [
          "Is truly zero order",
          "Behaves like a first-order reaction because one reactant is present in large excess",
          "Has no rate-determining step",
          "Cannot be studied experimentally",
        ],
        correctAnswer: 1,
        explanation: "A pseudo first-order reaction is intrinsically higher order, but appears first order because one reactant (often the solvent) is present in such large excess that its concentration barely changes during the reaction.",
      },
      {
        question: "According to the Arrhenius equation, the rate constant k increases with:",
        options: ["Decreasing temperature only", "Increasing temperature", "Decreasing activation energy only, never temperature", "Neither temperature nor activation energy"],
        correctAnswer: 1,
        explanation: "The Arrhenius equation, k = Ae^(−Ea/RT), shows that k increases as temperature (T) increases, since a larger fraction of molecules then possess energy ≥ Ea.",
      },
      {
        question: "Activation energy is best described as:",
        options: [
          "The total energy released in a reaction",
          "The minimum extra energy needed for colliding molecules to react successfully",
          "The energy of the products only",
          "Always equal to zero for exothermic reactions",
        ],
        correctAnswer: 1,
        explanation: "Activation energy is the minimum energy that colliding reactant molecules must possess (over and above their average energy) for a collision to successfully lead to product formation.",
      },
      {
        question: "A catalyst increases the rate of a reaction by:",
        options: [
          "Increasing the concentration of reactants",
          "Providing an alternative pathway with lower activation energy",
          "Increasing the temperature of the reaction",
          "Shifting the equilibrium position towards products",
        ],
        correctAnswer: 1,
        explanation: "A catalyst speeds up a reaction by providing an alternative mechanism/pathway with a lower activation energy, allowing more collisions to be successful, without changing the reaction's thermodynamics or equilibrium position.",
      },
      {
        question: "According to collision theory, a collision between reactant molecules leads to a successful reaction only if:",
        options: [
          "The molecules collide at all, regardless of energy",
          "The molecules have sufficient energy and correct orientation",
          "The temperature is exactly 298 K",
          "A catalyst is always present",
        ],
        correctAnswer: 1,
        explanation: "Collision theory states that only collisions with sufficient kinetic energy (≥ activation energy) AND proper molecular orientation lead to a successful reaction.",
      },
      {
        question: "For a zero-order reaction, a plot of reactant concentration [A] versus time gives:",
        options: ["A straight line with a positive slope", "A straight line with a negative slope", "An exponential curve", "A horizontal line"],
        correctAnswer: 1,
        explanation: "For a zero-order reaction, [A] = [A]₀ − kt, so a plot of [A] versus t is a straight line with a negative slope equal to −k.",
      },
      {
        question: "Increasing the surface area of a solid reactant generally:",
        options: ["Decreases the reaction rate", "Increases the reaction rate", "Has no effect on rate", "Only affects gaseous reactions"],
        correctAnswer: 1,
        explanation: "A larger surface area exposes more reactant particles to collision with the other reactant, increasing the frequency of effective collisions and thus the reaction rate.",
      },
      {
        question: "The molecularity of an elementary reaction is:",
        options: [
          "Always a fraction",
          "The number of reacting species that must collide simultaneously in that step",
          "The same thing as the order of the overall reaction",
          "Always greater than 3",
        ],
        correctAnswer: 1,
        explanation: "Molecularity is a theoretical concept applying only to elementary (single-step) reactions — it is the number of reacting species (atoms, ions, or molecules) that must collide simultaneously in that step, and is always a whole number (usually 1, 2, or rarely 3).",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define the rate of a chemical reaction.",
        answer: "The rate of a chemical reaction is the change in concentration of a reactant or product per unit time.",
      },
      {
        marks: 1,
        question: "What is activation energy?",
        answer: "Activation energy is the minimum extra energy that reacting molecules must possess, above their average energy, for a collision between them to successfully result in a chemical reaction.",
      },
      {
        marks: 2,
        question: "Distinguish between order of reaction and molecularity of a reaction.",
        answer:
          "**Order of reaction** is the sum of the powers to which the concentration terms are raised in the experimentally determined rate law; it applies to the overall reaction (which may involve several steps), can be zero, fractional, or a whole number, and must be found experimentally. **Molecularity** is the number of reacting species that must collide simultaneously in a single elementary step of a reaction mechanism; it is always a whole number and applies only to a single elementary step, not necessarily the overall reaction.",
      },
      {
        marks: 2,
        question: "Write the integrated rate equation for a first-order reaction, and state the formula for its half-life.",
        answer: "k = (2.303/t) log₁₀([A]₀/[A]), where [A]₀ is the initial concentration and [A] is the concentration at time t. The half-life of a first-order reaction is t½ = 0.693/k, independent of the initial concentration.",
      },
      {
        marks: 2,
        question: "What is a pseudo first-order reaction? Give one example.",
        answer:
          "A pseudo first-order reaction is a reaction that is intrinsically of higher order, but experimentally behaves as first order because one of the reactants is present in a very large excess, so its concentration remains effectively constant throughout the reaction. Example: the acid-catalysed hydrolysis of an ester (like ethyl acetate) in water, where water is present in such large excess (as the solvent) that the reaction appears first order with respect to the ester alone, even though the true rate law involves both the ester and water.",
      },
      {
        marks: 3,
        question: "State the Arrhenius equation and explain the significance of each term.",
        answer:
          "The Arrhenius equation is k = Ae^(−Ea/RT), where **k** is the rate constant, **A** is the pre-exponential (frequency) factor, representing the frequency of collisions with proper orientation, **Ea** is the activation energy, **R** is the universal gas constant, and **T** is the absolute temperature. The equation shows that the rate constant increases exponentially as temperature increases (since more molecules then have energy ≥ Ea) and decreases as activation energy increases (since a higher energy barrier means fewer molecules can surmount it at a given temperature).",
      },
      {
        marks: 3,
        question: "Explain, using collision theory, why increasing temperature increases the rate of a reaction.",
        answer:
          "According to collision theory, a reaction occurs only when reactant molecules collide with both sufficient energy (at least equal to the activation energy) and proper orientation. As temperature increases, the average kinetic energy of the molecules increases, and — more importantly — the fraction of molecules possessing energy equal to or greater than the activation energy increases sharply (following the Maxwell-Boltzmann distribution of molecular energies). This means a much larger proportion of collisions become 'successful' (energetic enough to react) at higher temperatures, even though the total collision frequency itself only increases modestly with temperature — so reaction rate increases significantly with rising temperature.",
      },
      {
        marks: 3,
        question: "List three factors that affect the rate of a chemical reaction and briefly explain how each one influences rate.",
        answer:
          "1. **Concentration of reactants** — increasing concentration increases the frequency of collisions between reacting particles, generally increasing rate.\n2. **Temperature** — increasing temperature increases both the frequency of collisions and, more significantly, the fraction of molecules with energy ≥ the activation energy, increasing rate.\n3. **Catalyst** — a catalyst provides an alternative reaction pathway with a lower activation energy, allowing a much larger fraction of collisions to be successful, thereby increasing rate without being consumed.",
      },
      {
        marks: 5,
        question:
          "(a) Derive/state the integrated rate law for a zero-order reaction. (b) A reaction is found to have a constant rate, independent of the concentration of the only reactant. If the initial concentration is 0.5 mol L⁻¹ and the rate constant is 0.05 mol L⁻¹ s⁻¹, calculate the time taken for the concentration to fall to 0.2 mol L⁻¹.",
        answer:
          "(a) For a zero-order reaction, rate = −d[A]/dt = k (a constant, independent of [A]). Rearranging and integrating between the limits [A]₀ at t = 0 and [A] at time t gives: [A] = [A]₀ − kt.\n(b) Using [A] = [A]₀ − kt: 0.2 = 0.5 − (0.05)t → (0.05)t = 0.5 − 0.2 = 0.3 → t = 0.3/0.05 = **6 seconds**.",
      },
      {
        marks: 5,
        question:
          "(a) Explain what is meant by the rate-determining step of a multi-step reaction mechanism, with a simple example. (b) Explain why the rate law of a reaction cannot always be predicted from its overall balanced equation.",
        answer:
          "(a) Many reactions proceed through a sequence of elementary steps (a mechanism) rather than in a single step, as the overall balanced equation might suggest. The **rate-determining step** is the slowest step in this sequence, and since the overall reaction can proceed no faster than its slowest step, the rate law of the overall reaction is governed by (matches) the rate law of this rate-determining step. Example: for the reaction NO₂(g) + CO(g) → NO(g) + CO₂(g), the experimentally observed rate law is rate = k[NO₂]², not rate = k[NO₂][CO] as the balanced equation alone might suggest. This is explained by a two-step mechanism: Step 1 (slow, rate-determining): 2NO₂ → NO₃ + NO; Step 2 (fast): NO₃ + CO → NO₂ + CO₂. Since only NO₂ molecules are involved in the slow, rate-determining first step (and two of them are required), the overall rate law depends only on [NO₂]², matching the experimental result.\n(b) The overall balanced equation for a reaction shows only the net stoichiometry — the overall relationship between the amounts of reactants consumed and products formed — but says nothing about the actual step-by-step molecular pathway (mechanism) by which the reaction proceeds. Since the rate law is governed specifically by the slowest (rate-determining) step of this mechanism, which may involve only some of the reactants, or fewer/more molecules than the overall equation suggests, the rate law must be determined experimentally rather than assumed from the stoichiometric coefficients of the overall balanced equation.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 4 — THE D AND F BLOCK ELEMENTS
  // ================================================================
  {
    id: "d-and-f-block-elements",
    number: 4,
    title: "The d- and f-Block Elements",
    subtitle: "Transition metals — coloured, catalytic, and full of variable oxidation states",
    description:
      "General characteristics of the d-block (transition) elements — electronic configuration, variable oxidation states, colour, magnetic properties, catalytic activity, alloy formation — and a brief introduction to the f-block lanthanoids and actinoids, including the lanthanoid contraction.",
    icon: "🔬",
    color: "plum",
    readingTime: "25 min read",
    videos: [
      {
        title: "d and f Block Elements — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/fPYtQ6qgh6E",
      },
      {
        title: "Transition Metals: Colour, Oxidation States, Catalysis",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/5MDgY1Y0PBA",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/vYVvWk4Uv0A",
      },
    ],
    notes: `
# The d- and f-Block Elements

## Position and Electronic Configuration

**Transition elements** (d-block) are defined as elements whose atoms (in the ground state or in a common oxidation state) have an **incompletely filled d sub-shell**. They lie between the s-block and p-block, in Groups 3-12, and their general valence configuration is (n-1)d¹⁻¹⁰ns⁰⁻².

**Inner transition elements (f-block)** are the **lanthanoids** (Ce to Lu, filling the 4f sub-shell) and **actinoids** (Th to Lr, filling the 5f sub-shell), shown separately below the main body of the periodic table.

## General Characteristics of Transition Elements

1. **Metallic character** — all transition elements are metals, typically hard, with high melting and boiling points (due to strong metallic bonding involving both ns and (n-1)d electrons) and high densities.
2. **Variable oxidation states** — transition elements characteristically show multiple oxidation states in their compounds, since both the ns and (n-1)d electrons are of comparable energy and can be involved in bonding; the difference in successive oxidation states is often just 1 unit (e.g. Fe²⁺/Fe³⁺, Cu⁺/Cu²⁺), unlike the typical jump of 2 seen in p-block elements.
3. **Formation of coloured compounds/ions** — many transition metal ions are coloured (in the solid state and in aqueous solution), due to **d-d electronic transitions** — an electron in a lower-energy d-orbital absorbs light of a particular (visible) wavelength and is excited to a higher-energy d-orbital, and the complementary colour of the absorbed light is observed. (Sc³⁺ with a d⁰ configuration, and Zn²⁺ with a d¹⁰ configuration, have no d-d transitions available and are colourless.)
4. **Catalytic activity** — many transition metals and their compounds are effective catalysts (e.g. Fe in the Haber process, Ni in hydrogenation, V₂O₅ in the Contact process), largely because of their ability to show variable oxidation states and to form intermediate complexes with reactants, providing an alternative, lower-energy reaction pathway.
5. **Formation of alloys** — since transition metal atoms have similar atomic sizes, they can readily substitute for one another in a crystal lattice, forming alloys (e.g. stainless steel — Fe, Cr, Ni).
6. **Formation of complex compounds** — transition metal ions readily form coordination complexes with various ligands (Lewis bases), due to their small size, high charge density, and the availability of empty d-orbitals to accept electron pairs (developed further in Coordination Compounds).
7. **Magnetic properties** — many transition metal compounds are **paramagnetic** (weakly attracted into a magnetic field) due to the presence of unpaired electrons in their d-orbitals; the magnetic moment increases with the number of unpaired electrons.

## Some Important Compounds of Transition Elements

### Potassium Dichromate (K₂Cr₂O₇)
Prepared industrially from chromite ore (FeCr₂O₄); it is a strong **oxidising agent** in acidic medium.
Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O

It exists as the orange dichromate ion (Cr₂O₇²⁻) in acidic solution, but converts to the yellow chromate ion (CrO₄²⁻) in basic solution — an equilibrium that is reversed by adding acid (covered in Equilibrium).

### Potassium Permanganate (KMnO₄)
Prepared industrially from pyrolusite ore (MnO₂); it is a very strong **oxidising agent** in acidic medium, and acts as its own indicator (self-indicating) in redox titrations, since the intense purple colour disappears sharply at the endpoint.
MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O

## The Lanthanoids

The **lanthanoids** are the 14 elements from cerium (Ce, Z = 58) to lutetium (Lu, Z = 71), in which the 4f sub-shell is progressively filled. Together with lanthanum (La), they are often loosely called the "rare earth" elements.

### Lanthanoid Contraction
As you move across the lanthanoid series, there is a **steady, gradual decrease in atomic and ionic radii**, called the lanthanoid contraction. This happens because, as electrons are added to the deeply buried, poorly-shielding 4f sub-shell, the increasing nuclear charge is not effectively screened, so the outer electrons are pulled progressively closer to the nucleus.

**Consequences of the lanthanoid contraction:** the elements immediately following the lanthanoids (like Zr and Hf, or Nb and Ta) have almost identical atomic radii to their d-block counterparts one period above them, making these pairs of elements very difficult to separate chemically.

## The Actinoids

The **actinoids** are the 14 elements from thorium (Th, Z = 90) to lawrencium (Lr, Z = 103), in which the 5f sub-shell is progressively filled. Unlike the lanthanoids, most actinoids are **radioactive**, and only the first few (up to uranium) occur naturally in appreciable amounts; the rest are synthetically produced.
    `,
    experiments: [
      {
        id: "coloured-transition-metal-solutions",
        title: "Observing the Colours of Transition Metal Ion Solutions",
        aim: "To observe and compare the characteristic colours of several transition metal ion solutions, and relate them to d-d electronic transitions.",
        materials: ["Solutions of CuSO₄ (blue), NiSO₄ (green), CoCl₂ (pink), KMnO₄ (purple), K₂Cr₂O₇ (orange)", "A solution of ZnSO₄ (colourless, for comparison)", "Test tubes"],
        procedure: [
          "Prepare or observe solutions of each transition metal salt in separate, labelled test tubes.",
          "Note the distinct colour of each solution and compare them side by side.",
          "Include zinc sulphate as a comparison, since Zn²⁺ has a completely filled d¹⁰ configuration.",
        ],
        observation: "Cu²⁺ is blue, Ni²⁺ is green, Co²⁺ is pink, MnO₄⁻ is intense purple, and Cr₂O₇²⁻ is orange. In contrast, the Zn²⁺ solution is colourless.",
        conclusion:
          "Most transition metal ions are coloured because they have partially filled d-orbitals, allowing electrons to absorb specific wavelengths of visible light and jump to a higher-energy d-orbital (a d-d transition); the colour observed is complementary to the wavelength absorbed. Zn²⁺, having a completely filled 3d¹⁰ configuration, has no available d-d transitions (there is no vacant d-orbital of the same sub-shell to jump to), so its solutions are colourless — confirming the direct link between partially filled d-orbitals and colour in transition metal compounds.",
        visual: {
          before: "hsl(200 20% 95%)",
          after: "hsl(210 65% 55%)",
          labels: { before: "Colourless Zn²⁺ solution", after: "Blue Cu²⁺, green Ni²⁺, pink Co²⁺ (side by side)" },
        },
      },
      {
        id: "kmno4-self-indicating-titration",
        title: "Potassium Permanganate as a Self-Indicating Oxidising Agent",
        aim: "To demonstrate the strong oxidising nature of KMnO₄ in acidic medium and its self-indicating property in a redox titration.",
        materials: ["Standard potassium permanganate solution", "A solution of oxalic acid or a ferrous salt (reducing agent)", "Dilute sulphuric acid", "A burette and conical flask"],
        procedure: [
          "Acidify a known volume of the reducing agent (e.g. oxalic acid) with dilute H₂SO₄ in a conical flask.",
          "Titrate by adding KMnO₄ from a burette, swirling constantly, and noting the colour after each addition.",
          "Identify the endpoint as the point where a single drop causes a permanent, faint pink colour to persist.",
        ],
        observation: "The purple KMnO₄ is decolourised as it is added and reacts, right up until the endpoint, where the next drop causes the solution to turn a persistent pale pink, since no more reducing agent remains to decolourise it.",
        reaction: "2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O",
        conclusion:
          "Since KMnO₄'s own intense purple colour disappears while it is being consumed by the reducing agent, and only reappears (as a persistent colour) once the reducing agent is exhausted, KMnO₄ acts as its own indicator in this titration — no separate indicator is needed, which is one of the practical advantages of using this strong transition metal oxidising agent.",
        visual: {
          before: "hsl(60 30% 92%)",
          after: "hsl(320 55% 80%)",
          labels: { before: "Colourless reducing agent + acid", after: "Persistent faint pink — endpoint" },
        },
      },
      {
        id: "variable-oxidation-state-manganese",
        title: "Demonstrating the Variable Oxidation States of Manganese",
        aim: "To observe several different oxidation states of manganese by changing the oxidising/reducing conditions.",
        materials: ["Potassium permanganate solution (Mn⁷⁺)", "Dilute sulphuric acid", "A reducing agent (e.g. sodium sulphite or oxalic acid, in controlled, small amounts)", "Sodium hydroxide", "Test tubes"],
        procedure: [
          "Add a small, controlled amount of reducing agent to a dilute, acidified KMnO₄ solution and note the colour changes as more reducing agent is added stepwise.",
          "Separately, add a reducing agent to a dilute, neutral or slightly alkaline KMnO₄ solution and observe.",
        ],
        observation:
          "In strongly acidic medium, the purple MnO₄⁻ (Mn in +7 state) is reduced through a series of colour changes, ultimately to the very pale pink/colourless Mn²⁺ (Mn in +2 state) with excess reducing agent. In neutral/faintly alkaline medium, MnO₄⁻ is instead reduced to a brown precipitate of MnO₂ (Mn in +4 state).",
        reaction: "MnO₄⁻(+7) + 5e⁻ + 8H⁺ → Mn²⁺(+2) + 4H₂O (acidic medium) ; MnO₄⁻(+7) + 3e⁻ + 2H₂O → MnO₂(+4)↓ + 4OH⁻ (neutral medium)",
        conclusion:
          "Manganese, a transition element, readily shows multiple oxidation states (+7, +4, +2, among others) depending on the reaction conditions (particularly pH and the strength/amount of the reducing agent present) — a hallmark characteristic of transition metals, made possible by the comparable energies of their ns and (n-1)d electrons.",
        visual: {
          before: "hsl(320 55% 45%)",
          after: "hsl(330 20% 90%)",
          labels: { before: "Purple MnO₄⁻ (Mn⁷⁺)", after: "Pale pink/colourless Mn²⁺ after full reduction" },
        },
      },
      {
        id: "magnetic-attraction-paramagnetic-salts",
        title: "Testing Paramagnetism of a Transition Metal Salt",
        aim: "To relate the presence of unpaired electrons in a transition metal ion to weak attraction by a strong magnet (paramagnetism).",
        materials: ["Powdered anhydrous copper(II) sulphate or iron(III) chloride (paramagnetic, unpaired d-electrons)", "Powdered zinc sulphate (diamagnetic, d¹⁰, no unpaired electrons)", "A strong magnet", "A fine balance/sensitive suspension if available (or simple qualitative comparison)"],
        procedure: [
          "Bring a strong magnet close to a small pile of powdered CuSO₄ (or FeCl₃) and observe any movement/response.",
          "Repeat with a small pile of powdered ZnSO₄ under identical conditions.",
        ],
        observation: "The copper(II) or iron(III) salt shows a faint but noticeable attraction/response to the magnet. The zinc sulphate shows no such response.",
        conclusion:
          "Cu²⁺ (d⁹ configuration) and Fe³⁺ (d⁵ configuration) both have unpaired electrons in their d-orbitals, making their compounds paramagnetic (weakly attracted by an external magnetic field). Zn²⁺ has a completely filled d¹⁰ configuration with no unpaired electrons, making its compounds diamagnetic (not attracted, in fact very weakly repelled). This confirms the direct relationship between the number of unpaired d-electrons in a transition metal ion and its magnetic behaviour.",
        visual: {
          before: "hsl(210 60% 55%)",
          labels: { before: "Powdered paramagnetic salt near magnet", after: "Weak attraction observed" },
        },
      },
      {
        id: "alloy-hardness-comparison",
        title: "Comparing the Hardness of a Pure Transition Metal and Its Alloy",
        aim: "To compare the hardness/scratch resistance of a pure transition metal with an alloy made from it, illustrating why transition metals readily form useful alloys.",
        materials: ["A sample of pure iron", "A sample of stainless steel (Fe-Cr-Ni alloy)", "A hardened steel scribe/file", "Or, as an alternative, a comparison of pure copper vs. bronze/brass"],
        procedure: [
          "Attempt to scratch the surface of pure iron with the scribe/file and note the ease with which it scratches.",
          "Repeat with the sample of stainless steel under the same conditions and compare.",
        ],
        observation: "Pure iron scratches relatively easily. Stainless steel is noticeably more resistant to scratching and generally harder.",
        conclusion:
          "Since transition metal atoms are similar in size, atoms of one transition metal (like Cr or Ni) can readily substitute for atoms of another (like Fe) within the same crystal lattice, without significantly distorting its structure — this ready formation of substitutional alloys, combined with the disruption caused by having a mixture of different-sized atoms in the lattice (making it harder for layers of atoms to slide past each other), generally increases the hardness and strength of the alloy compared to the pure parent metal.",
        visual: {
          before: "hsl(210 8% 60%)",
          after: "hsl(210 8% 70%)",
          labels: { before: "Scribing pure iron — scratches easily", after: "Scribing stainless steel — more resistant" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Transition elements are defined as elements whose atoms (or common ions) have:",
        options: [
          "A completely filled d sub-shell always",
          "An incompletely filled d sub-shell",
          "No d electrons at all",
          "Only s and p electrons",
        ],
        correctAnswer: 1,
        explanation: "Transition (d-block) elements are defined as those having an incompletely filled d sub-shell in the ground state or in a commonly-occurring oxidation state.",
      },
      {
        question: "Transition metals characteristically show:",
        options: ["Only one oxidation state", "Variable oxidation states", "Negative oxidation states only", "No oxidation states"],
        correctAnswer: 1,
        explanation: "Transition metals typically show variable (multiple) oxidation states in their compounds, since both ns and (n-1)d electrons are of comparable energy and can participate in bonding.",
      },
      {
        question: "Colour in transition metal compounds is mainly due to:",
        options: [
          "s-s electronic transitions",
          "d-d electronic transitions",
          "Radioactive decay",
          "The presence of oxygen only",
        ],
        correctAnswer: 1,
        explanation: "Colour arises from d-d transitions, where an electron absorbs visible light and jumps from a lower-energy to a higher-energy d-orbital within the partially filled d sub-shell.",
      },
      {
        question: "Which of the following ions is expected to be colourless?",
        options: ["Cu²⁺ (d⁹)", "Fe³⁺ (d⁵)", "Zn²⁺ (d¹⁰)", "Mn²⁺ (d⁵)"],
        correctAnswer: 2,
        explanation: "Zn²⁺ has a completely filled d¹⁰ configuration, so no d-d transition is possible, making its compounds colourless.",
      },
      {
        question: "The 'lanthanoid contraction' refers to the:",
        options: [
          "Sudden increase in atomic radius across the lanthanoid series",
          "Steady decrease in atomic/ionic radii across the lanthanoid series",
          "Loss of all electrons by lanthanoid atoms",
          "Contraction of the periodic table itself",
        ],
        correctAnswer: 1,
        explanation: "The lanthanoid contraction is the gradual, steady decrease in atomic and ionic radii across the lanthanoid series, due to poor shielding by the deeply buried 4f electrons.",
      },
      {
        question: "One important consequence of the lanthanoid contraction is that:",
        options: [
          "All lanthanoids become radioactive",
          "Zirconium and hafnium have almost identical atomic radii and are difficult to separate",
          "Lanthanoids lose their colour",
          "The d-block disappears entirely",
        ],
        correctAnswer: 1,
        explanation: "Because of the lanthanoid contraction, pairs of elements like Zr/Hf (and Nb/Ta) end up with nearly identical atomic radii, making their chemical separation especially difficult.",
      },
      {
        question: "K₂Cr₂O₇ acts as a strong:",
        options: ["Reducing agent in all conditions", "Oxidising agent in acidic medium", "Base", "Indicator only, with no reactivity"],
        correctAnswer: 1,
        explanation: "Potassium dichromate is a strong oxidising agent in acidic medium, being reduced from Cr(+6) to Cr(+3).",
      },
      {
        question: "Most transition metal compounds with unpaired d-electrons are:",
        options: ["Diamagnetic", "Paramagnetic", "Radioactive", "Colourless"],
        correctAnswer: 1,
        explanation: "Compounds with unpaired electrons in their d-orbitals are paramagnetic (weakly attracted by a magnetic field); the magnetic moment increases with the number of unpaired electrons.",
      },
      {
        question: "Actinoids differ from lanthanoids in that most actinoids are:",
        options: ["Non-metals", "Radioactive", "Found only as gases", "Never used in any application"],
        correctAnswer: 1,
        explanation: "Unlike lanthanoids, most actinoids are radioactive, and only the lighter members (up to uranium) occur naturally in significant amounts; the rest are synthetically produced.",
      },
      {
        question: "Transition metals are good catalysts largely because of their:",
        options: [
          "Inability to form complexes",
          "Ability to show variable oxidation states and form intermediate complexes with reactants",
          "Complete absence of d-electrons",
          "Very low melting points",
        ],
        correctAnswer: 1,
        explanation: "The catalytic activity of transition metals largely arises from their ability to adopt variable oxidation states and form temporary complexes with reactants, providing an alternative, lower-energy reaction pathway.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define a transition element.",
        answer: "A transition element is one whose atom (in the ground state or in a commonly-occurring oxidation state) has an incompletely filled d sub-shell.",
      },
      {
        marks: 1,
        question: "Why is Zn²⁺ colourless while Cu²⁺ is blue?",
        answer: "Zn²⁺ has a completely filled 3d¹⁰ configuration, so no d-d electronic transition is possible, making it colourless. Cu²⁺ has a 3d⁹ (incompletely filled) configuration, allowing d-d transitions that absorb visible light, giving it a blue colour.",
      },
      {
        marks: 2,
        question: "Why do transition metals commonly show variable oxidation states, unlike most p-block elements?",
        answer:
          "In transition metal atoms, the energies of the (n-1)d and ns orbitals are very close to each other, so electrons from both sub-shells can be involved in bonding with similar ease. This allows transition metals to lose different numbers of electrons under different conditions, giving rise to several stable oxidation states differing typically by just one unit, unlike most p-block elements (whose oxidation states usually differ by two units, since only np electrons are typically lost/shared beyond a stable octet).",
      },
      {
        marks: 2,
        question: "What is the lanthanoid contraction, and name one of its consequences.",
        answer:
          "The lanthanoid contraction is the steady, gradual decrease in atomic and ionic radii observed across the lanthanoid series, caused by the poor shielding provided by the deeply buried 4f electrons as nuclear charge increases across the series. One consequence: the d-block elements immediately following the lanthanoids (like zirconium and hafnium) have almost identical atomic radii to their counterparts one period above, making them very difficult to separate chemically.",
      },
      {
        marks: 2,
        question: "Write the balanced half-equation for potassium permanganate acting as an oxidising agent in acidic medium.",
        answer: "MnO₄⁻(aq) + 8H⁺(aq) + 5e⁻ → Mn²⁺(aq) + 4H₂O(l).",
      },
      {
        marks: 3,
        question: "Explain why transition metals commonly act as catalysts, with one example.",
        answer:
          "Transition metals commonly act as catalysts because of their ability to show variable oxidation states (allowing them to temporarily accept and donate electrons during a reaction cycle) and their ability to form intermediate complexes with reactant molecules on their surface or in solution, providing an alternative reaction pathway with lower activation energy. Example: finely divided iron acts as a catalyst in the Haber process (N₂ + 3H₂ ⇌ 2NH₃), by adsorbing and weakening the strong N≡N and H-H bonds on its surface, allowing the reaction to proceed faster than it would uncatalysed.",
      },
      {
        marks: 3,
        question: "Explain why most transition metal compounds are coloured, using the concept of d-d transitions.",
        answer:
          "In transition metal ions with a partially filled d sub-shell, the d-orbitals are not all of exactly the same energy when the ion is surrounded by other atoms/ligands (their energies split slightly). An electron in a lower-energy d-orbital can absorb a photon of visible light with exactly the right energy to be excited (promoted) to a higher-energy d-orbital within the same sub-shell — this is called a d-d transition. Since only certain wavelengths of visible light are absorbed (to match this specific energy gap), the light that is transmitted or reflected (the wavelengths NOT absorbed) reaches our eyes, and we perceive the complementary colour, giving most transition metal compounds their characteristic colours.",
      },
      {
        marks: 3,
        question: "Distinguish between lanthanoids and actinoids, stating one similarity and one difference.",
        answer:
          "**Similarity:** both lanthanoids (Ce to Lu, filling the 4f sub-shell) and actinoids (Th to Lr, filling the 5f sub-shell) are f-block (inner transition) elements, both commonly show a stable +3 oxidation state, and both show a steady contraction in atomic/ionic radii across their respective series (lanthanoid contraction and actinoid contraction).\n**Difference:** most lanthanoids are stable, non-radioactive elements that occur naturally in reasonable amounts, while most actinoids are radioactive, and only the lighter members (up to uranium) occur naturally in appreciable quantities — the heavier actinoids are synthetically produced in nuclear reactors/accelerators.",
      },
      {
        marks: 5,
        question:
          "(a) List five general characteristic properties of transition elements. (b) Briefly explain, for each property, why it arises from the electronic structure of transition metals.",
        answer:
          "1. **Metallic character and high melting/boiling points** — arises from strong metallic bonding involving both ns and (n-1)d electrons.\n2. **Variable oxidation states** — arises since ns and (n-1)d electrons are of comparable energy and can both participate in bonding.\n3. **Formation of coloured compounds** — arises from d-d electronic transitions possible in ions with a partially filled d sub-shell.\n4. **Catalytic activity** — arises from the ability to adopt variable oxidation states and form intermediate complexes with reactants.\n5. **Paramagnetism** — arises from the presence of unpaired electrons in partially filled d-orbitals.\n(All of these properties trace back to the same underlying feature: transition metals have partially filled, similar-energy (n-1)d and ns orbitals available for bonding and electronic transitions.)",
      },
      {
        marks: 5,
        question:
          "(a) Describe how potassium dichromate is used as an oxidising agent, including its half-reaction in acidic medium. (b) Explain the colour change observed when an acidified dichromate solution is made alkaline, and relate it to the underlying equilibrium.",
        answer:
          "(a) Potassium dichromate (K₂Cr₂O₇) is a powerful oxidising agent in acidic medium, used, for instance, in redox titrations and organic oxidations (such as oxidising primary alcohols to aldehydes/carboxylic acids). Its half-reaction is: Cr₂O₇²⁻(aq) + 14H⁺(aq) + 6e⁻ → 2Cr³⁺(aq) + 7H₂O(l), with chromium being reduced from the +6 to the +3 oxidation state.\n(b) In acidic solution, chromium exists predominantly as the orange dichromate ion, Cr₂O₇²⁻. When the solution is made alkaline (by adding a base, which removes H⁺ ions/adds OH⁻), the equilibrium Cr₂O₇²⁻(aq) + 2OH⁻(aq) ⇌ 2CrO₄²⁻(aq) + H₂O(l) shifts to the right (by Le Chatelier's principle, since OH⁻ is being added/H⁺ removed), converting the dichromate ion into the yellow chromate ion, CrO₄²⁻. This colour change (orange to yellow) is fully reversible — re-acidifying the yellow solution shifts the equilibrium back to the left, regenerating the orange dichromate ion.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 5 — COORDINATION COMPOUNDS
  // ================================================================
  {
    id: "coordination-compounds",
    number: 5,
    title: "Coordination Compounds",
    subtitle: "Ligands, coordination numbers, and why some complexes are coloured and others aren't",
    description:
      "Werner's theory and key terms (ligands, coordination number, coordination sphere), IUPAC nomenclature of coordination compounds, isomerism, valence bond theory and crystal field theory for bonding, and the importance of coordination compounds in biology, industry and analysis.",
    icon: "⚗️",
    color: "cyanine",
    readingTime: "27 min read",
    videos: [
      {
        title: "Coordination Compounds — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/kqCC-6cbwLI",
      },
      {
        title: "Crystal Field Theory Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/1WQ9Ov1L978",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/L9Qft2X6Ggw",
      },
    ],
    notes: `
# Coordination Compounds

## Werner's Theory of Coordination Compounds

Alfred Werner proposed that metal atoms/ions show two types of valency: **primary (ionisable) valency**, satisfied by negative ions and equal to the oxidation state of the metal, and **secondary (non-ionisable) valency**, satisfied by neutral molecules or negative ions arranged around the metal in a fixed, definite spatial geometry — this secondary valency corresponds to what we now call the **coordination number**.

## Key Terms

- **Coordination entity/complex** — an ion or neutral molecule composed of a central metal atom/ion bonded to a fixed number of surrounding ions/molecules, e.g. [Co(NH₃)₆]³⁺.
- **Central atom/ion** — the atom/ion to which a fixed number of ligands are directly bonded, e.g. Co³⁺ in [Co(NH₃)₆]³⁺.
- **Ligand** — an ion or molecule bound directly to the central metal atom/ion, that donates a pair (or pairs) of electrons to the metal, e.g. NH₃, Cl⁻, H₂O, CN⁻. Ligands are Lewis bases.
  - **Monodentate** ligands donate through only one donor atom (e.g. NH₃, Cl⁻).
  - **Bidentate** ligands donate through two donor atoms (e.g. ethylenediamine, en).
  - **Polydentate/chelating** ligands donate through several donor atoms simultaneously, forming a ring structure (a chelate) with the metal (e.g. EDTA, a hexadentate ligand).
- **Coordination number (CN)** — the number of ligand donor atoms directly bonded to the central metal atom/ion.
- **Coordination sphere** — the central atom and the ligands directly attached to it, enclosed in square brackets, e.g. [Co(NH₃)₆]³⁺; ions outside the square brackets (counter ions) are called ionisation sphere ions.
- **Homoleptic complex** — a complex in which the metal is bonded to only one kind of ligand (e.g. [Co(NH₃)₆]³⁺). **Heteroleptic complex** — a complex bonded to more than one kind of ligand (e.g. [Co(NH₃)₄Cl₂]⁺).

## IUPAC Nomenclature of Coordination Compounds

**General rules:**
1. Name the **cation first**, then the anion (as with simple ionic compounds).
2. Within the coordination sphere, name ligands in **alphabetical order** before the central metal atom, regardless of their charge.
3. Use **numerical prefixes** (di-, tri-, tetra- for simple ligands; bis-, tris-, tetrakis- for more complex/multi-syllable ligand names, to avoid ambiguity) to indicate the number of each type of ligand.
4. **Anionic ligands** end in **-o** (e.g. chloro for Cl⁻, cyano for CN⁻); neutral ligands generally keep their usual name (with a few exceptions: aqua for H₂O, ammine for NH₃, carbonyl for CO).
5. If the complex ion is an **anion**, the metal name ends in **-ate** (e.g. ferrate for iron, cobaltate for cobalt).
6. The **oxidation state** of the central metal is indicated by a Roman numeral in brackets immediately after the metal's name.

> [!example] [Co(NH₃)₄Cl₂]Cl is named **tetraamminedichlorocobalt(III) chloride**.

## Isomerism in Coordination Compounds

### Structural Isomerism
- **Ionisation isomerism** — differ in which ion is inside vs. outside the coordination sphere, giving different ions in solution, e.g. [Co(NH₃)₅Br]SO₄ and [Co(NH₃)₅SO₄]Br.
- **Linkage isomerism** — occurs with ambidentate ligands (which can bind through either of two different donor atoms), e.g. -NO₂ (nitrito, bonded through N) vs -ONO (nitrito-O, bonded through O).
- **Coordination isomerism** — occurs in compounds with both a complex cation and a complex anion, where the distribution of ligands between the two metal centres differs.

### Stereoisomerism
- **Geometrical (cis-trans) isomerism** — occurs in square planar and octahedral complexes, where two identical ligands can be positioned adjacent (**cis**) or opposite (**trans**) to each other.
- **Optical isomerism** — occurs when a complex and its mirror image are non-superimposable (chiral), common in octahedral complexes with bidentate ligands.

## Bonding in Coordination Compounds

### Valence Bond Theory (VBT)
VBT explains bonding by assuming the central metal ion provides suitable empty hybrid orbitals (formed by hybridisation of vacant (n-1)d, ns and np orbitals) to accept electron pairs donated by the ligands.
- **Octahedral complexes** may be **inner orbital (using (n-1)d orbitals, d²sp³ hybridisation, typically low-spin/diamagnetic or fewer unpaired electrons)** or **outer orbital (using nd orbitals, sp³d² hybridisation, typically high-spin, with more unpaired electrons)**, depending on whether the ligand is strong-field or weak-field.
- **Tetrahedral complexes** use sp³ hybridisation.
- **Square planar complexes** use dsp² hybridisation.

VBT can explain shape and (to some extent) magnetic properties, but it fails to explain the colour of complexes, and gives no quantitative treatment of relative ligand strength.

### Crystal Field Theory (CFT)
CFT treats the bonding between the metal and ligands as purely **electrostatic (ionic)**, and considers the effect of the approaching ligands' negative charge (or dipole) on the energies of the metal's five d-orbitals, which are normally degenerate (of equal energy) in a free ion.

In an **octahedral field**, the five d-orbitals split into two energy levels: a lower-energy set of three orbitals (**t2g**) and a higher-energy set of two orbitals (**eg**); the energy difference between them is called the **crystal field splitting energy, Δo**.

- **Strong field ligands** (e.g. CN⁻, CO) cause a large splitting (large Δo), favouring **low-spin** complexes (electrons pair up in the lower t2g set before occupying the higher eg set).
- **Weak field ligands** (e.g. halides, H₂O) cause a small splitting (small Δo), favouring **high-spin** complexes (electrons occupy all five orbitals singly, following Hund's rule, before any pairing occurs).

The relative strength of common ligands is summarised by the **spectrochemical series**: I⁻ < Br⁻ < Cl⁻ < F⁻ < H₂O < NH₃ < en < CN⁻ ≈ CO (weak field to strong field).

CFT successfully explains the **colour** of complexes (as light is absorbed to promote an electron from t2g to eg, a d-d transition) and their **magnetic properties**, based on the number of unpaired electrons remaining after splitting.

## Importance and Applications of Coordination Compounds

1. **Biological systems** — haemoglobin (an iron-porphyrin coordination complex, essential for oxygen transport in blood) and chlorophyll (a magnesium coordination complex, essential for photosynthesis) are both coordination compounds.
2. **Extraction/purification of metals** — e.g. silver and gold are extracted from their ores as soluble cyanide complexes: Ag₂S + 4NaCN → 2Na[Ag(CN)₂] + Na₂S, and the metal is later recovered from this complex.
3. **Analytical chemistry** — coordination compounds are used to detect and estimate metal ions, e.g. Ni²⁺ is detected using dimethylglyoxime (DMG), forming a characteristic red precipitate.
4. **Softening of hard water** — EDTA, a hexadentate chelating ligand, forms stable, soluble complexes with Ca²⁺ and Mg²⁺, and is used to estimate/remove hardness in water.
5. **Medicine** — cisplatin, [Pt(NH₃)₂Cl₂] (the cis isomer specifically), is a well-known anticancer drug.
    `,
    experiments: [
      {
        id: "ligand-color-change-ammine-complex",
        title: "Formation of the Tetraamminecopper(II) Complex",
        aim: "To observe the formation of a deep blue coordination complex when excess ammonia is added to a copper(II) salt solution.",
        materials: ["Copper sulphate solution", "Dilute ammonia solution (added in excess)", "Test tubes"],
        procedure: [
          "Take a small amount of pale blue copper sulphate solution in a test tube.",
          "Add dilute ammonia solution dropwise, noting any initial change, and then continue adding until a large excess is present.",
        ],
        observation: "Initially, a pale blue precipitate of copper(II) hydroxide forms; on continuing to add excess ammonia, this precipitate dissolves, giving a deep, intense royal-blue solution.",
        reaction: "Cu²⁺(aq) + 2NH₃(aq) + 2H₂O(l) → Cu(OH)₂(s)↓ + 2NH₄⁺(aq) ; Cu(OH)₂(s) + 4NH₃(aq) → [Cu(NH₃)₄]²⁺(aq) + 2OH⁻(aq)",
        conclusion:
          "With excess ammonia, the initially formed copper(II) hydroxide dissolves as ammonia molecules act as ligands, coordinating directly to the Cu²⁺ ion via their lone pairs on nitrogen, forming the deep blue tetraamminecopper(II) complex ion, [Cu(NH₃)₄]²⁺ — a coordination number of 4, with a colour distinctly different from and more intense than the simple aqua complex, [Cu(H₂O)₄]²⁺.",
        visual: {
          before: "hsl(210 55% 75%)",
          after: "hsl(230 70% 40%)",
          precipitate: { name: "Copper hydroxide (transient)", colour: "hsl(200 30% 85%)" },
          labels: { before: "Pale blue CuSO₄ solution", after: "Deep blue complex after excess NH₃" },
        },
      },
      {
        id: "nickel-dmg-test",
        title: "Detecting Nickel(II) Ions Using Dimethylglyoxime (DMG)",
        aim: "To identify nickel(II) ions using the classic dimethylglyoxime complexation test.",
        materials: ["Nickel(II) sulphate/chloride solution", "Dimethylglyoxime (DMG) solution", "Dilute ammonia solution", "A test tube"],
        procedure: [
          "Take a small volume of a nickel(II) salt solution in a test tube.",
          "Make the solution slightly alkaline by adding a few drops of dilute ammonia solution.",
          "Add alcoholic dimethylglyoxime solution and observe.",
        ],
        observation: "A bright, rosy-red (scarlet) precipitate forms almost immediately.",
        reaction: "Ni²⁺(aq) + 2(DMG)(aq) → [Ni(DMG)₂](s)↓ (bright red, a square planar chelate complex)",
        conclusion:
          "Dimethylglyoxime acts as a bidentate chelating ligand, binding to the nickel(II) ion through two nitrogen donor atoms per DMG molecule, forming an insoluble, characteristically bright red square planar complex — this specific colour and precipitate formation makes it a standard, highly selective qualitative test for the presence of nickel(II) ions.",
        visual: {
          before: "hsl(140 25% 85%)",
          after: "hsl(0 65% 55%)",
          precipitate: { name: "Nickel dimethylglyoxime complex", colour: "hsl(0 65% 55%)" },
          labels: { before: "Nickel solution + ammonia", after: "Bright red precipitate — nickel confirmed" },
        },
      },
      {
        id: "edta-hard-water-titration",
        title: "Estimating Water Hardness Using an EDTA Titration",
        aim: "To estimate the total hardness of a water sample using a complexometric titration with EDTA.",
        materials: ["A sample of hard water", "Standard EDTA solution", "A buffer solution (to maintain pH ~10)", "Eriochrome Black T indicator", "A burette and conical flask"],
        procedure: [
          "Take a known volume of the hard water sample in a conical flask, add buffer solution to maintain pH around 10, and add a few drops of Eriochrome Black T indicator (which turns wine-red in the presence of free Ca²⁺/Mg²⁺).",
          "Titrate with standard EDTA solution from a burette, swirling constantly, until the colour changes sharply from wine-red to a clear blue.",
          "Record the volume of EDTA used at the endpoint.",
        ],
        observation: "As EDTA is added, it progressively binds up the free Ca²⁺ and Mg²⁺ ions; at the endpoint, the last trace of free metal ion is complexed, and the indicator's colour shifts sharply from wine-red to blue.",
        reaction: "Ca²⁺(aq)/Mg²⁺(aq) + EDTA⁴⁻(aq) → [M-EDTA]²⁻(aq) (a very stable, hexadentate chelate complex)",
        conclusion:
          "EDTA, a hexadentate (six-donor-atom) chelating ligand, forms extremely stable 1:1 complexes with Ca²⁺ and Mg²⁺ ions; the volume of standard EDTA needed to complex all the free metal ions in a water sample is directly related to the total hardness of the water, making this a standard, quantitative analytical method for determining water hardness.",
        visual: {
          before: "hsl(340 45% 55%)",
          after: "hsl(220 55% 55%)",
          labels: { before: "Wine-red — free Ca²⁺/Mg²⁺ present", after: "Blue — endpoint, all metal complexed" },
        },
      },
      {
        id: "cis-trans-geometric-isomer-models",
        title: "Modelling Cis and Trans Geometrical Isomers of a Square Planar Complex",
        aim: "To construct models of the cis and trans isomers of a square planar complex, [Pt(NH₃)₂Cl₂], and understand geometrical isomerism.",
        materials: ["A molecular model kit (or coloured balls/sticks)", "Central Pt atom model", "Two NH₃ ligand models", "Two Cl ligand models"],
        procedure: [
          "Build a square planar arrangement with a central platinum atom and four positions around it.",
          "In one model, place the two NH₃ ligands adjacent to each other (at 90° to one another) and the two Cl ligands adjacent to each other (the cis arrangement).",
          "In a second model, place the two NH₃ ligands directly opposite each other (at 180°) and the two Cl ligands directly opposite each other (the trans arrangement).",
        ],
        observation: "Two distinct, non-interconvertible (without breaking bonds) spatial arrangements are obtained: one with identical ligands adjacent to each other, and one with identical ligands opposite each other.",
        conclusion:
          "Since [Pt(NH₃)₂Cl₂] has two different pairs of ligands around a square planar centre, two distinct geometric (cis-trans) isomers are possible, differing only in the spatial arrangement of the ligands (not their connectivity). This distinction is chemically and medically significant — only the **cis** isomer of this type of platinum complex (cisplatin) is an effective anticancer drug; the trans isomer is far less effective.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Cis isomer — ligands adjacent", after: "Trans isomer — ligands opposite" },
        },
      },
      {
        id: "silver-cyanide-extraction-demo",
        title: "Dissolving Silver Chloride Using Complex Formation (Cyanide/Thiosulphate)",
        aim: "To demonstrate how complex ion formation can dissolve an otherwise insoluble silver salt, illustrating the principle used in silver/gold extraction.",
        materials: ["Freshly precipitated silver chloride", "Sodium thiosulphate solution (a safer laboratory alternative to cyanide)", "A test tube"],
        procedure: [
          "Prepare a small amount of white silver chloride precipitate (e.g. by mixing dilute AgNO₃ and NaCl solutions) in a test tube.",
          "Add sodium thiosulphate solution to the precipitate and shake/stir.",
        ],
        observation: "The white, insoluble silver chloride precipitate dissolves completely, giving a clear, colourless solution.",
        reaction: "AgCl(s) + 2S₂O₃²⁻(aq) → [Ag(S₂O₃)₂]³⁻(aq) + Cl⁻(aq)",
        conclusion:
          "Thiosulphate ions act as ligands, forming a very stable, soluble complex ion with Ag⁺, which pulls Ag⁺ out of the insoluble AgCl lattice as the complex forms (shifting the dissolution equilibrium of AgCl forward). This is the same underlying principle (formation of a stable soluble complex, [Ag(CN)₂]⁻ in that industrial process) used to extract silver from its ores using cyanide leaching.",
        safety: "This experiment uses thiosulphate as a safer classroom substitute; industrial cyanide-based extraction (using CN⁻ as the ligand) is highly toxic and handled only under strict industrial safety controls.",
        visual: {
          before: "hsl(0 0% 95%)",
          after: "hsl(200 10% 96%)",
          precipitate: { name: "Silver chloride", colour: "hsl(0 0% 96%)" },
          labels: { before: "White AgCl precipitate", after: "Dissolves as soluble complex forms" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "According to Werner's theory, the secondary valency of a metal in a coordination compound corresponds to its:",
        options: ["Oxidation state", "Coordination number", "Atomic number", "Group number"],
        correctAnswer: 1,
        explanation: "Werner's secondary (non-ionisable) valency, satisfied by ligands in a fixed spatial arrangement around the metal, corresponds to what is now called the coordination number.",
      },
      {
        question: "A ligand that binds to the central metal atom through only one donor atom is called:",
        options: ["Bidentate", "Polydentate", "Monodentate", "Ambidentate"],
        correctAnswer: 2,
        explanation: "A monodentate ligand donates only a single electron pair through one donor atom, e.g. NH₃, Cl⁻, H₂O.",
      },
      {
        question: "In the IUPAC name of a coordination compound, ligands within the coordination sphere are named:",
        options: [
          "In order of decreasing charge",
          "In alphabetical order, regardless of charge",
          "Randomly",
          "Only if they are anionic",
        ],
        correctAnswer: 1,
        explanation: "IUPAC rules require ligands to be cited in alphabetical order within the coordination sphere name, regardless of their charge or type.",
      },
      {
        question: "According to crystal field theory, in an octahedral complex the d-orbitals split into:",
        options: ["A single energy level", "Two sets: a lower t2g and a higher eg set", "Five completely separate energy levels always", "Three sets of equal energy"],
        correctAnswer: 1,
        explanation: "In an octahedral crystal field, the five d-orbitals split into a lower-energy t2g set (three orbitals) and a higher-energy eg set (two orbitals), separated by the crystal field splitting energy Δo.",
      },
      {
        question: "A strong field ligand like CN⁻ typically favours the formation of:",
        options: ["High-spin complexes only", "Low-spin complexes (with a large Δo)", "No complex at all", "Only tetrahedral complexes"],
        correctAnswer: 1,
        explanation: "Strong field ligands cause a large crystal field splitting (large Δo), making it more favourable for electrons to pair up in the lower t2g set rather than occupy the higher eg set — giving a low-spin complex.",
      },
      {
        question: "Crystal field theory successfully explains which property of coordination compounds, unlike simple valence bond theory?",
        options: ["Their molecular formula", "Their colour", "Their overall charge", "Their molar mass"],
        correctAnswer: 1,
        explanation: "CFT explains colour as arising from d-d transitions (electrons absorbing light to move from the t2g to the eg set), a property that simple valence bond theory cannot adequately explain.",
      },
      {
        question: "Haemoglobin, essential for oxygen transport in blood, is a coordination complex of which metal?",
        options: ["Magnesium", "Iron", "Copper", "Zinc"],
        correctAnswer: 1,
        explanation: "Haemoglobin is an iron-containing coordination complex (an iron-porphyrin structure), essential for binding and transporting oxygen in the blood.",
      },
      {
        question: "EDTA is classified as which type of ligand?",
        options: ["Monodentate", "Bidentate", "Hexadentate (chelating)", "Ambidentate only"],
        correctAnswer: 2,
        explanation: "EDTA is a hexadentate ligand, capable of binding to a metal ion through six donor atoms simultaneously, forming a very stable chelate complex — widely used to estimate/remove water hardness.",
      },
      {
        question: "Cisplatin, an anticancer drug, is an example of a:",
        options: ["Simple ionic salt", "Coordination compound of platinum", "Purely organic compound with no metal", "Radioactive isotope"],
        correctAnswer: 1,
        explanation: "Cisplatin, [Pt(NH₃)₂Cl₂] (specifically the cis geometric isomer), is a square planar coordination compound of platinum, used as an important anticancer drug.",
      },
      {
        question: "Ionisation isomers of a coordination compound differ in:",
        options: [
          "The central metal atom",
          "Which ion is inside versus outside the coordination sphere",
          "Their overall molecular formula",
          "The number of electrons on the metal",
        ],
        correctAnswer: 1,
        explanation: "Ionisation isomers have the same overall formula but differ in which ion is bound within the coordination sphere (as a ligand) versus which is a free counter-ion outside it, e.g. [Co(NH₃)₅Br]SO₄ vs [Co(NH₃)₅SO₄]Br.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define a ligand.",
        answer: "A ligand is an ion or molecule that is directly bonded to the central metal atom/ion in a coordination compound, donating a lone pair (or pairs) of electrons to it; ligands act as Lewis bases.",
      },
      {
        marks: 1,
        question: "What is the coordination number of the central metal in [Co(NH₃)₆]³⁺?",
        answer: "6 — the cobalt ion is bonded to six ammonia ligands, each a monodentate donor.",
      },
      {
        marks: 2,
        question: "Distinguish between a homoleptic and a heteroleptic complex, with one example of each.",
        answer:
          "A **homoleptic complex** has the central metal bonded to only one kind of ligand, e.g. [Co(NH₃)₆]³⁺ (only ammonia ligands). A **heteroleptic complex** has the central metal bonded to more than one kind of ligand, e.g. [Co(NH₃)₄Cl₂]⁺ (both ammonia and chloride ligands).",
      },
      {
        marks: 2,
        question: "Explain what is meant by a chelating ligand, with one example.",
        answer:
          "A chelating ligand is a polydentate ligand that can bind to a single metal ion through two or more donor atoms simultaneously, forming a ring structure (a chelate) with the metal. Example: ethylenediamine (en), a bidentate ligand that binds through both of its nitrogen atoms.",
      },
      {
        marks: 2,
        question: "State the spectrochemical series trend, and explain what a 'strong field' ligand does to the crystal field splitting energy.",
        answer:
          "The spectrochemical series arranges common ligands roughly in order of increasing crystal field splitting strength: I⁻ < Br⁻ < Cl⁻ < F⁻ < H₂O < NH₃ < en < CN⁻ ≈ CO. A strong field ligand (like CN⁻) causes a large crystal field splitting energy (Δo), separating the t2g and eg orbital sets by a large energy gap, and favours low-spin complexes (with fewer unpaired electrons, as electrons preferentially pair up in the lower set rather than occupy the higher-energy set).",
      },
      {
        marks: 3,
        question: "Explain, with an example, geometrical (cis-trans) isomerism in coordination compounds.",
        answer:
          "Geometrical isomerism arises in square planar and octahedral complexes when two identical ligands can occupy either adjacent (cis) or opposite (trans) positions relative to each other around the central metal, giving two distinct, non-interconvertible spatial arrangements with the same molecular formula and connectivity. Example: the square planar complex [Pt(NH₃)₂Cl₂] exists as two geometric isomers — the **cis** isomer (both Cl atoms adjacent to each other, at 90°) and the **trans** isomer (both Cl atoms opposite each other, at 180°). Notably, only the cis isomer (cisplatin) shows significant anticancer activity.",
      },
      {
        marks: 3,
        question: "Briefly describe Werner's postulates regarding primary and secondary valency.",
        answer:
          "Werner proposed that metal ions in coordination compounds exhibit two types of valency: **primary (ionisable) valency**, which is satisfied by negative ions and is numerically equal to the oxidation state of the metal (these ions can be precipitated out of solution, e.g. by adding a suitable reagent); and **secondary (non-ionisable) valency**, which is satisfied by a fixed number of neutral molecules or negative ions arranged around the metal ion in a definite geometrical (spatial) arrangement (this fixed number is what is now called the coordination number, and these ligands cannot be precipitated out, since they are directly and tightly bound to the metal).",
      },
      {
        marks: 3,
        question: "Explain why [Ni(DMG)₂] forms as a characteristic precipitate in the test for nickel(II) ions.",
        answer:
          "Dimethylglyoxime (DMG) is a bidentate ligand that binds to a nickel(II) ion through two nitrogen donor atoms per DMG molecule; two DMG molecules bind to each Ni²⁺ ion, forming a neutral, square planar chelate complex, [Ni(DMG)₂]. This complex is insoluble in water and has a distinctive, intense red/rosy colour, making its formation (as a precipitate) an easily observable and highly selective qualitative test that confirms the presence of nickel(II) ions in a solution.",
      },
      {
        marks: 5,
        question:
          "(a) Explain how crystal field theory accounts for the colour of transition metal complexes. (b) Why is [Ti(H₂O)₆]³⁺ coloured, while [Sc(H₂O)₆]³⁺ (also a d-block complex) is colourless?",
        answer:
          "(a) In crystal field theory, the approach of ligands to a central metal ion causes the five originally degenerate d-orbitals to split into two sets of different energy (e.g. a lower t2g set and a higher eg set, in an octahedral complex). If the metal ion has a partially filled d sub-shell, an electron in the lower-energy set can absorb a photon of visible light with exactly the energy needed to be promoted to the higher-energy set (a d-d transition). Since the compound absorbs specific wavelengths corresponding to this energy gap, the colour we observe is the complementary colour of the wavelengths that are absorbed.\n(b) Ti³⁺ has a 3d¹ configuration — a single electron in the lower t2g set, which can be promoted to the eg set by absorbing a photon of visible light, making [Ti(H₂O)₆]³⁺ coloured (pale violet/purple in this case). Sc³⁺ has a 3d⁰ configuration (no d electrons at all), so there is no electron available to undergo a d-d transition, and [Sc(H₂O)₆]³⁺ is colourless.",
      },
      {
        marks: 5,
        question:
          "(a) Explain the difference between an inner orbital complex and an outer orbital complex according to valence bond theory. (b) State one important limitation of valence bond theory in explaining the properties of coordination compounds.",
        answer:
          "(a) In an **inner orbital complex**, the central metal ion uses its inner (n-1)d orbitals (along with ns and np orbitals) for hybridisation (e.g. d²sp³ hybridisation in an octahedral complex); this typically occurs with strong field ligands, and requires the metal's d electrons to pair up first to free the necessary inner d orbitals, generally giving fewer unpaired electrons (low-spin). In an **outer orbital complex**, the central metal ion instead uses its outer nd orbitals (along with ns and np orbitals) for hybridisation (e.g. sp³d² hybridisation); this typically occurs with weak field ligands, does not require the metal's original d electrons to pair up, and generally gives more unpaired electrons (high-spin).\n(b) A key limitation of valence bond theory is that it cannot satisfactorily explain the **colour** of coordination compounds (since it does not describe any energy difference between different d-orbitals that could correspond to visible light absorption), and it also does not provide a quantitative measure of the relative strength of different ligands (unlike crystal field theory, via the spectrochemical series and the crystal field splitting energy, Δo).",
      },
    ],
  },

  // ================================================================
  // CHAPTER 6 — HALOALKANES AND HALOARENES
  // ================================================================
  {
    id: "haloalkanes-and-haloarenes",
    number: 6,
    title: "Haloalkanes and Haloarenes",
    subtitle: "Nucleophilic substitution, elimination, and why aryl halides refuse to play along",
    description:
      "Classification and nomenclature of organic halogen compounds, SN1 and SN2 nucleophilic substitution mechanisms, elimination reactions, optical activity, and the special unreactivity of haloarenes towards nucleophilic substitution.",
    icon: "🧪",
    color: "copper",
    readingTime: "26 min read",
    videos: [
      {
        title: "Haloalkanes and Haloarenes — Full Chapter",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/f7-CMMmvfSY",
      },
      {
        title: "SN1 vs SN2 Mechanism Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/Vv8KcSN0YlM",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/2mQhw6yKMdE",
      },
    ],
    notes: `
# Haloalkanes and Haloarenes

## Classification

Organic halogen compounds are classified as **haloalkanes (alkyl halides)** — a halogen bonded to an sp³ carbon of an alkyl group — and **haloarenes (aryl halides)** — a halogen bonded directly to an sp² carbon of an aromatic ring. Haloalkanes are further classified as primary (1°), secondary (2°) or tertiary (3°), based on the nature of the carbon bearing the halogen.

## Nature of the C-X Bond

Since halogens are more electronegative than carbon, the C-X bond is **polar**, with carbon bearing a partial positive charge (δ+) and the halogen a partial negative charge (δ−). This polarisation makes the carbon atom susceptible to attack by electron-rich species (**nucleophiles**).

## Preparation of Haloalkanes

- From **alcohols**, by reaction with HX (in the presence of ZnCl₂, the Lucas reagent, for HCl) or with PCl₅/PCl₃/SOCl₂ (thionyl chloride, the preferred method since the by-products, SO₂ and HCl, are gases and escape, giving a purer product).
- From **hydrocarbons**, by free-radical halogenation (for alkanes) or by addition of HX/X₂ to alkenes.
- From **silver salts of carboxylic acids** (the Hunsdiecker reaction): R-COOAg + Br₂ → R-Br + CO₂ + AgBr.

## Nucleophilic Substitution Reactions of Haloalkanes

A **nucleophile** (electron-rich species) attacks the electrophilic (δ+) carbon bearing the halogen, displacing the halogen (a good **leaving group**) as a halide ion.

### SN2 Mechanism (Substitution, Nucleophilic, Bimolecular)
- A **single-step** mechanism: the nucleophile attacks the carbon from the side **opposite** to the leaving halogen (backside attack), while the C-X bond is simultaneously breaking as the new C-Nu bond forms.
- Rate depends on the concentration of **both** the substrate and the nucleophile: rate = k[R-X][Nu⁻].
- Results in **inversion of configuration** (Walden inversion) at the carbon centre, like an umbrella turning inside-out.
- **Favoured by:** primary (1°) halides (least steric hindrance to backside attack); reactivity order: methyl > 1° > 2° > 3°.

### SN1 Mechanism (Substitution, Nucleophilic, Unimolecular)
- A **two-step** mechanism: (i) the C-X bond breaks first (slow, rate-determining step) to form a planar **carbocation** intermediate; (ii) the nucleophile then attacks the carbocation rapidly from either face.
- Rate depends only on the concentration of the substrate: rate = k[R-X].
- Since the carbocation is planar and can be attacked from either face, the product is generally a **racemic mixture** (partial or complete loss of stereochemical configuration).
- **Favoured by:** tertiary (3°) halides (form the most stable carbocation); reactivity order: 3° > 2° > 1° > methyl.

## Elimination (Dehydrohalogenation) Reactions

When a haloalkane is heated with **alcoholic KOH** (rather than aqueous KOH, which favours substitution), a hydrogen atom from a β-carbon (adjacent to the C-X carbon) is eliminated along with the halogen, forming an alkene.

> [!key] **Saytzeff's rule:** in an elimination reaction, the more highly substituted (more stable) alkene is generally formed as the major product, i.e. the preferred product is the alkene with the greater number of alkyl groups attached to the doubly bonded carbon atoms.

## Polyhalogen Compounds

- **Chloroform (CHCl₃)** — was once used as an anaesthetic, now largely replaced by safer alternatives; it slowly oxidises in air/light to form the highly poisonous gas **phosgene (COCl₂)**, which is why chloroform bottles are stored in dark-coloured containers, completely filled, with a small amount of ethanol added (to convert any phosgene formed into a harmless product).
- **Freons (chlorofluorocarbons, CFCs)**, e.g. CCl₂F₂ (Freon-12), were widely used as refrigerants and aerosol propellants, but are now heavily regulated since they cause depletion of the stratospheric **ozone layer**.
- **DDT** (dichlorodiphenyltrichloroethane) was widely used as an insecticide, but its use is now restricted in many countries because it is highly stable (non-biodegradable) and bioaccumulates in the fatty tissue of animals, disrupting ecosystems and food chains.

## Haloarenes

In haloarenes (e.g. chlorobenzene), the halogen atom is bonded directly to the sp² carbon of the aromatic ring, and a lone pair on the halogen can be **delocalised into the ring** via resonance, giving the C-X bond partial double-bond character and making it much **shorter and stronger** than the C-X bond in a haloalkane.

### Unreactivity of Haloarenes Towards Nucleophilic Substitution
Haloarenes are far less reactive than haloalkanes towards nucleophilic substitution, for several reasons:
1. **Resonance stabilisation** gives the C-Cl bond significant double-bond character, making it stronger and harder to break.
2. The sp² hybridised carbon holds the bonding electrons more tightly (compared to sp³), making the halogen more difficult to displace.
3. Any nucleophile attempting to attack would have to attack an already electron-rich aromatic ring (due to the halogen's electron-donating resonance effect), which is unfavourable.
4. If an intermediate carbocation-like species were to form (as in an SN1-type pathway), it would not be stabilised by the ring the way it would be by ordinary alkyl substituents.

**Electrophilic substitution of haloarenes:** despite their resistance to nucleophilic substitution, haloarenes readily undergo the usual electrophilic aromatic substitution reactions of arenes (nitration, halogenation, sulphonation, Friedel-Crafts reactions); since halogens are (weakly) electron-donating by resonance, though electron-withdrawing overall by induction, they direct incoming electrophiles predominantly to the **ortho and para positions**.

## Optical Activity and Chirality

A carbon atom bonded to four different groups is called a **chiral (asymmetric) carbon**, and compounds containing such a carbon usually exist as a pair of non-superimposable mirror-image isomers called **enantiomers**, which rotate the plane of plane-polarised light in opposite directions (one clockwise, dextrorotatory, and the other anticlockwise, laevorotatory) — this property is called **optical activity**.
    `,
    experiments: [
      {
        id: "sn1-vs-sn2-reactivity-comparison",
        title: "Comparing SN1 and SN2 Reactivity Using the Lucas Test",
        aim: "To distinguish primary, secondary and tertiary alcohols (a related test to SN1/SN2 mechanisms) using the Lucas reagent, and relate the results to carbocation stability.",
        materials: ["A primary alcohol (e.g. n-butanol)", "A secondary alcohol (e.g. sec-butanol)", "A tertiary alcohol (e.g. tert-butanol)", "Lucas reagent (conc. HCl + anhydrous ZnCl₂)", "Test tubes"],
        procedure: [
          "Add a small, equal amount of the Lucas reagent to separate samples of the primary, secondary and tertiary alcohols in test tubes at room temperature.",
          "Note the time taken for each to become cloudy/turbid, indicating the formation of an insoluble alkyl chloride.",
        ],
        observation:
          "The tertiary alcohol turns cloudy almost immediately. The secondary alcohol takes a few minutes to turn cloudy. The primary alcohol shows no visible reaction/cloudiness at room temperature (it requires heating to react).",
        reaction: "R-OH + HCl →[ZnCl₂] R-Cl + H₂O",
        conclusion:
          "This reactivity order (3° fastest, then 2°, then 1° slowest) directly parallels the SN1 mechanism: the reaction proceeds via a carbocation intermediate, and tertiary alcohols form the most stable (tertiary) carbocation most readily, reacting fastest, while primary alcohols would form the least stable (primary) carbocation and so react far more slowly, if at all, via this mechanism at room temperature.",
        visual: {
          before: "hsl(200 15% 95%)",
          after: "hsl(200 10% 88%)",
          labels: { before: "Alcohol + Lucas reagent, clear", after: "Tertiary alcohol — turns cloudy instantly" },
        },
      },
      {
        id: "elimination-alcoholic-koh",
        title: "Dehydrohalogenation of an Alkyl Halide with Alcoholic KOH",
        aim: "To prepare an alkene from an alkyl halide by elimination, and confirm the product using the bromine water test for unsaturation.",
        materials: ["An alkyl halide (e.g. bromoethane)", "Alcoholic potassium hydroxide (KOH in ethanol)", "A reflux apparatus", "Bromine water"],
        procedure: [
          "Heat the alkyl halide with alcoholic KOH under reflux for a period of time.",
          "Collect the gas/volatile product evolved and pass it through bromine water.",
          "Observe any colour change in the bromine water.",
        ],
        observation: "The orange bromine water is rapidly decolourised by the gas/vapour evolved from the reaction mixture.",
        reaction: "CH₃CH₂Br + KOH(alc) →[Δ] CH₂=CH₂ + KBr + H₂O",
        conclusion:
          "Heating an alkyl halide with alcoholic (not aqueous) KOH favours elimination (rather than substitution), removing a hydrogen from the adjacent (β) carbon along with the halogen to form an alkene — confirmed by the rapid decolourisation of bromine water, a standard test for the unsaturation (C=C double bond) present in the product.",
        visual: {
          before: "hsl(25 85% 55%)",
          after: "hsl(40 10% 96%)",
          gas: "Ethene",
          labels: { before: "Orange bromine water", after: "Decolourised by evolved alkene gas" },
        },
      },
      {
        id: "haloarene-vs-haloalkane-hydrolysis",
        title: "Comparing the Hydrolysis Reactivity of a Haloalkane and a Haloarene",
        aim: "To demonstrate that haloalkanes readily undergo nucleophilic substitution (hydrolysis) while haloarenes do not, under the same mild conditions.",
        materials: ["A haloalkane sample (e.g. chloroethane, or a description if handling is impractical)", "A haloarene sample (e.g. chlorobenzene)", "Aqueous sodium hydroxide solution", "Dilute nitric acid", "Silver nitrate solution", "Two test tubes with reflux"],
        procedure: [
          "Heat the haloalkane with aqueous NaOH under reflux for a period, then cool, acidify with dilute nitric acid, and add silver nitrate solution.",
          "Repeat the exact same procedure (heating with aqueous NaOH, then testing with AgNO₃) using the haloarene sample instead.",
        ],
        observation: "The haloalkane sample gives a distinct white precipitate with silver nitrate (confirming free chloride ions in solution). The haloarene sample gives little to no precipitate under the same conditions, even after extended heating.",
        reaction: "CH₃CH₂Cl + NaOH(aq) →[Δ] CH₃CH₂OH + NaCl (readily hydrolysed) ; C₆H₅Cl + NaOH(aq) →[Δ, mild conditions] no significant reaction",
        conclusion:
          "The haloalkane undergoes ready nucleophilic substitution (hydrolysis) under mild aqueous conditions, releasing free Cl⁻ ions (detected by the white AgCl precipitate). The haloarene, however, shows negligible reaction under the same mild conditions, since the C-Cl bond in chlorobenzene has partial double-bond character (from resonance with the aromatic ring) and is much stronger, making the chlorine far more difficult to displace than in a simple haloalkane — this confirms the characteristic unreactivity of haloarenes towards nucleophilic substitution under ordinary conditions.",
        visual: {
          before: "hsl(200 15% 95%)",
          after: "hsl(0 0% 96%)",
          precipitate: { name: "Silver chloride", colour: "hsl(0 0% 96%)" },
          labels: { before: "Haloalkane hydrolysed, tested with AgNO₃", after: "White AgCl precipitate confirms Cl⁻" },
        },
      },
      {
        id: "chloroform-oxidation-safety",
        title: "Understanding the Storage of Chloroform — Oxidation to Phosgene",
        aim: "To understand (conceptually, given the toxicity of phosgene, this is discussed rather than performed directly) why chloroform is stored in dark bottles filled with ethanol.",
        materials: ["A bottle of chloroform, correctly stored (dark glass, filled completely, containing a small amount of ethanol as a stabiliser)", "Reference material/diagram explaining the reaction"],
        procedure: [
          "Examine (or discuss, via diagram) how chloroform is properly stored: in a dark-coloured (amber) bottle, filled as completely as possible (minimising air space), with a small amount of ethanol added as a stabiliser.",
          "Trace the reaction that would occur if chloroform were instead exposed to light and air over time.",
        ],
        observation: "Chloroform exposed to light and air slowly oxidises to form phosgene gas (COCl₂), a highly toxic compound; when stored correctly (dark, full, with ethanol), this oxidation is prevented/minimised.",
        reaction: "2CHCl₃ + O₂ →[light] 2COCl₂(phosgene, highly toxic) + 2HCl ; COCl₂ + C₂H₅OH → C₂H₅OCOCl (a harmless ester) + HCl (the role of the added ethanol, converting any phosgene formed into a safe product)",
        conclusion:
          "Chloroform slowly undergoes air oxidation in the presence of light to form the extremely toxic gas phosgene; storing it in dark (light-excluding) bottles slows this photochemical oxidation, and adding a small amount of ethanol provides a safety mechanism, since any small amount of phosgene that does form is immediately converted by the ethanol into a harmless ester rather than accumulating as a dangerous gas.",
        safety: "Phosgene is extremely toxic; chloroform must always be stored according to the correct protocol (dark, full, with ethanol stabiliser) and never left exposed to light and air.",
        visual: {
          before: "hsl(200 10% 95%)",
          labels: { before: "Chloroform in dark, sealed, stabilised bottle", after: "Safely prevents phosgene buildup" },
        },
      },
      {
        id: "optical-activity-polarimeter-demo",
        title: "Demonstrating Optical Activity Using a Polarimeter (Conceptual Demonstration)",
        aim: "To understand how a polarimeter detects the optical activity of a chiral compound, using a simple sugar solution as an example.",
        materials: ["A polarimeter (if available) or a description/diagram of one", "A solution of an optically active compound (e.g. sucrose or glucose solution)", "Distilled water (for comparison, as an inactive control)"],
        procedure: [
          "Set the polarimeter to zero using distilled water (an optically inactive control) in the sample tube, aligning the polariser and analyser so no light passes at the crossed (zero) position.",
          "Replace the water with a solution of the optically active compound (e.g. sucrose) in the same sample tube.",
          "Rotate the analyser until light is again seen passing through, and record the angle through which it had to be rotated (the angle of optical rotation).",
        ],
        observation: "With water, no rotation of the analyser is needed to reach the dark (zero light) position. With the sucrose solution in place, the analyser must be rotated by a specific angle (in a specific direction) to restore the dark position.",
        conclusion:
          "An optically active compound, containing a chiral (asymmetric) centre, rotates the plane of plane-polarised light passing through it by a specific, measurable angle — this angle of rotation (and its direction, clockwise/dextrorotatory or anticlockwise/laevorotatory) is a characteristic physical property that a polarimeter is specifically designed to measure and use to identify/characterise chiral compounds and mixtures (such as detecting racemic mixtures, which show no net rotation, since equal amounts of both enantiomers cancel each other's rotation).",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Polarimeter zeroed with water", after: "Analyser rotated for chiral sugar solution" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "In an SN2 reaction, the nucleophile attacks the substrate carbon from:",
        options: [
          "The same side as the leaving group",
          "The side opposite to the leaving group (backside attack)",
          "Either side randomly",
          "It does not attack the carbon at all",
        ],
        correctAnswer: 1,
        explanation: "SN2 reactions proceed via backside attack, with the nucleophile approaching from the side directly opposite the leaving group, resulting in inversion of configuration.",
      },
      {
        question: "The rate law for an SN1 reaction depends on the concentration of:",
        options: ["Only the nucleophile", "Only the substrate (alkyl halide)", "Both the substrate and the nucleophile equally", "Neither"],
        correctAnswer: 1,
        explanation: "SN1 reactions are unimolecular in their rate-determining step (formation of the carbocation), so the rate depends only on the concentration of the substrate: rate = k[R-X].",
      },
      {
        question: "Which type of alkyl halide reacts fastest via the SN1 mechanism?",
        options: ["Methyl halide", "Primary halide", "Secondary halide", "Tertiary halide"],
        correctAnswer: 3,
        explanation: "Tertiary halides form the most stable carbocation intermediate, making them react fastest via the SN1 mechanism.",
      },
      {
        question: "According to Saytzeff's rule, the major product of an elimination reaction is usually:",
        options: [
          "The least substituted (least stable) alkene",
          "The more highly substituted (more stable) alkene",
          "A haloalkane, not an alkene",
          "An alcohol",
        ],
        correctAnswer: 1,
        explanation: "Saytzeff's rule states that elimination reactions generally favour the formation of the more substituted, more stable alkene as the major product.",
      },
      {
        question: "The C-X bond in a haloarene (like chlorobenzene) is shorter and stronger than in a haloalkane because:",
        options: [
          "Haloarenes have no carbon atoms",
          "The halogen's lone pair is delocalised into the ring, giving the C-X bond partial double-bond character",
          "Haloarenes contain more hydrogen atoms",
          "Aromatic rings repel halogens",
        ],
        correctAnswer: 1,
        explanation: "Resonance donation of a lone pair from the halogen into the aromatic ring gives the C-X bond in haloarenes partial double-bond character, making it shorter and stronger than a simple C-X single bond in a haloalkane.",
      },
      {
        question: "Haloarenes are generally _____ reactive than haloalkanes towards nucleophilic substitution.",
        options: ["More", "Less", "Equally", "Infinitely more"],
        correctAnswer: 1,
        explanation: "Due to resonance stabilisation of the C-X bond and the sp² hybridisation of the ring carbon, haloarenes are far less reactive than haloalkanes towards nucleophilic substitution.",
      },
      {
        question: "Chloroform slowly oxidises in air and light to form which toxic gas?",
        options: ["Carbon monoxide", "Phosgene (COCl₂)", "Chlorine gas", "Hydrogen cyanide"],
        correctAnswer: 1,
        explanation: "Chloroform undergoes slow aerial oxidation in the presence of light to form phosgene (COCl₂), a highly toxic gas, which is why it must be stored in dark bottles.",
      },
      {
        question: "CFCs (Freons) are of environmental concern mainly because they:",
        options: [
          "Cause acid rain",
          "Deplete the stratospheric ozone layer",
          "Increase soil salinity",
          "Cause eutrophication of water bodies",
        ],
        correctAnswer: 1,
        explanation: "Chlorofluorocarbons (CFCs/Freons) release chlorine radicals in the stratosphere under UV light, which catalytically destroy ozone molecules, depleting the protective ozone layer.",
      },
      {
        question: "A carbon atom bonded to four different groups is called a:",
        options: ["Anomeric carbon", "Chiral (asymmetric) carbon", "Quaternary carbon only", "Bridgehead carbon"],
        correctAnswer: 1,
        explanation: "A carbon bonded to four different groups/atoms is a chiral (asymmetric) centre, giving rise to non-superimposable mirror-image isomers (enantiomers).",
      },
      {
        question: "The SN1 mechanism, proceeding through a planar carbocation intermediate, typically results in:",
        options: [
          "Complete retention of configuration",
          "A racemic mixture (loss of stereochemical purity)",
          "No reaction at all",
          "Formation of only the starting material",
        ],
        correctAnswer: 1,
        explanation: "Since the planar carbocation intermediate can be attacked by the nucleophile from either face with roughly equal probability, the SN1 mechanism generally gives a racemic (or nearly racemic) mixture of products.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "What is a nucleophile?",
        answer: "A nucleophile is an electron-rich species (a Lewis base) that donates a pair of electrons to an electrophilic (electron-deficient) centre, such as the carbon bearing a leaving group in a substitution reaction.",
      },
      {
        marks: 1,
        question: "Give one reason why haloarenes resist nucleophilic substitution more than haloalkanes.",
        answer: "The C-X bond in a haloarene has partial double-bond character (from resonance delocalisation of the halogen's lone pair into the aromatic ring), making it shorter and stronger, and much harder to break than the simple C-X single bond in a haloalkane.",
      },
      {
        marks: 2,
        question: "Distinguish between the SN1 and SN2 mechanisms in terms of the number of steps and the rate law.",
        answer:
          "**SN1** is a two-step mechanism (slow formation of a carbocation, followed by fast attack of the nucleophile), and its rate law depends only on the substrate concentration: rate = k[R-X]. **SN2** is a single-step (concerted) mechanism, with the nucleophile attacking as the leaving group departs, and its rate law depends on both the substrate and nucleophile concentrations: rate = k[R-X][Nu⁻].",
      },
      {
        marks: 2,
        question: "State Saytzeff's rule and give one example of its application.",
        answer:
          "Saytzeff's rule states that, in an elimination reaction, the more highly substituted (more stable) alkene is generally formed as the major product. Example: dehydrohalogenation of 2-bromobutane with alcoholic KOH gives predominantly but-2-ene (a more substituted, disubstituted alkene) as the major product, rather than but-1-ene (a less substituted, monosubstituted alkene).",
      },
      {
        marks: 2,
        question: "Why is thionyl chloride (SOCl₂) preferred over HCl/ZnCl₂ for converting an alcohol into an alkyl chloride?",
        answer:
          "When an alcohol reacts with thionyl chloride, the by-products (SO₂ and HCl) are both gases that escape from the reaction mixture, leaving behind a much purer alkyl chloride product without the need for extensive further purification — unlike the reaction with HCl/ZnCl₂, whose other by-product (water) remains in the reaction mixture and can complicate isolation of the pure product.",
      },
      {
        marks: 3,
        question: "Explain, with the help of resonance structures (described in words), why the C-Cl bond in chlorobenzene has partial double-bond character.",
        answer:
          "In chlorobenzene, the chlorine atom has a lone pair of electrons in a p-orbital that can align with (and delocalise into) the π electron system of the aromatic ring. This allows one of the resonance structures to be drawn with a formal double bond between the ring carbon and the chlorine atom (and a corresponding negative charge shifted onto the ring, at the ortho and para positions), meaning the true structure is a hybrid, with the actual C-Cl bond having some double-bond character rather than being a pure single bond. This partial double-bond character makes the C-Cl bond in chlorobenzene shorter and stronger than a typical C-Cl single bond found in an alkyl chloride.",
      },
      {
        marks: 3,
        question: "Describe the SN2 mechanism for the reaction of bromomethane with hydroxide ion, and explain why it leads to inversion of configuration.",
        answer:
          "In the SN2 reaction of CH₃Br with OH⁻, the hydroxide ion (nucleophile) approaches the carbon atom from the side directly opposite the C-Br bond (backside attack), since this position offers the least steric/electronic interference from the departing bromide. As the new C-OH bond begins to form, the C-Br bond simultaneously begins to break, passing through a transition state in which the carbon is partially bonded to both the incoming OH⁻ and the departing Br⁻, with the other three substituents on carbon flattened into (or near) a single plane. Once the reaction is complete, the three original substituents have been pushed through to the opposite side, like an umbrella turning inside out in a strong wind — this is why the SN2 mechanism results in a complete inversion of configuration at the carbon centre (Walden inversion), and (for a chiral substrate) can convert one enantiomer into the other.",
      },
      {
        marks: 3,
        question: "What is DDT? Explain why its use as an insecticide is now restricted in many countries.",
        answer:
          "DDT (dichlorodiphenyltrichloroethane) is a chlorinated organic compound that was widely and effectively used as an insecticide, particularly to control disease-carrying insects like mosquitoes. Its use is now restricted in many countries because it is chemically very stable and does not readily break down (biodegrade) in the environment; as a result, it persists in soil and water for very long periods and **bioaccumulates** — becoming increasingly concentrated as it passes up the food chain (e.g. from insects to fish to birds), ultimately reaching harmful levels in top predators and disrupting reproduction and ecosystems (most famously causing eggshell thinning in birds of prey).",
      },
      {
        marks: 5,
        question:
          "(a) Compare the SN1 and SN2 mechanisms in terms of the effect of the substrate's structure (1°, 2°, 3°) on reaction rate, and explain the underlying reason for each trend. (b) State the overall stereochemical outcome of each mechanism.",
        answer:
          "(a) In the **SN2** mechanism, reactivity decreases as substitution increases: methyl > 1° > 2° > 3°. This is because SN2 requires the nucleophile to directly approach and attack the carbon from the backside; increasing the number and size of alkyl groups attached to that carbon creates more steric hindrance, making backside attack progressively more difficult, so bulkier (more substituted) substrates react more slowly (tertiary halides essentially do not react via SN2 at all). In the **SN1** mechanism, reactivity instead increases as substitution increases: 3° > 2° > 1° > methyl. This is because the rate-determining step is the formation of a carbocation intermediate, and more substituted carbocations are more stable (due to the electron-donating inductive effect and hyperconjugation from more surrounding alkyl groups), so tertiary substrates form their carbocation intermediate more readily and react fastest via SN1.\n(b) **SN2** results in complete **inversion of configuration** at the reacting carbon (Walden inversion), since the nucleophile always attacks from the side opposite the leaving group. **SN1** generally results in **racemisation** (a mixture of both possible configurations, ideally in equal amounts, though often not perfectly 50:50 in practice), since the flat, planar carbocation intermediate can be attacked by the nucleophile from either face with similar probability.",
      },
      {
        marks: 5,
        question:
          "(a) Explain why nucleophilic substitution of a haloarene is much more difficult than that of a haloalkane, listing at least three distinct reasons. (b) Despite this, state one type of reaction that haloarenes readily undergo, and briefly explain why.",
        answer:
          "(a) 1. **Resonance stabilisation:** the halogen's lone pair delocalises into the aromatic ring, giving the C-X bond partial double-bond character, making it stronger and shorter than the corresponding bond in a haloalkane, and therefore more difficult to break.\n2. **Hybridisation of the carbon:** the ring carbon bonded to the halogen is sp² hybridised (rather than sp³, as in a haloalkane); sp² carbons hold their bonding electrons more tightly (due to greater s-character), so the C-X bond is inherently stronger.\n3. **Instability of a potential phenyl cation:** if an SN1-type pathway were attempted, the resulting phenyl cation intermediate would be extremely unstable (it would be formed on an sp² carbon, in the plane of the ring, and would not be stabilised by conjugation with the ring π system), making this pathway highly unfavourable.\n4. **Electron-rich ring repels nucleophiles:** because of the halogen's electron-donating resonance effect, the aromatic ring (particularly at the ortho and para positions) is electron-rich, which would repel an incoming, similarly electron-rich nucleophile, making direct nucleophilic attack unfavourable.\n(b) Despite their resistance to nucleophilic substitution, haloarenes readily undergo **electrophilic aromatic substitution** reactions (like nitration, sulphonation, halogenation and Friedel-Crafts reactions), because the aromatic ring itself remains an excellent target for electrophiles — since the halogen substituent, though it withdraws electron density inductively overall, still donates electron density into the ring by resonance at the ortho and para positions specifically, it directs new electrophiles predominantly to those positions.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 7 — ALCOHOLS, PHENOLS AND ETHERS
  // ================================================================
  {
    id: "alcohols-phenols-and-ethers",
    number: 7,
    title: "Alcohols, Phenols and Ethers",
    subtitle: "The chemistry built around the -OH group — and the ether linkage next door",
    description:
      "Classification and nomenclature, preparation and physical/chemical properties of alcohols, phenols and ethers, hydrogen bonding effects, acidity of phenols compared to alcohols, electrophilic substitution in phenols, and important reactions like esterification, oxidation and the Williamson synthesis.",
    icon: "🍷",
    color: "cyanine",
    readingTime: "28 min read",
    videos: [
      {
        title: "Alcohols, Phenols and Ethers — Full Chapter",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/2mQhw6yKMdE",
      },
      {
        title: "Acidity of Alcohols and Phenols Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/f7-CMMmvfSY",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/Vv8KcSN0YlM",
      },
    ],
    notes: `
# Alcohols, Phenols and Ethers

## Classification

**Alcohols** (R-OH) have the -OH group bonded to an sp³ hybridised carbon of an alkyl group, and are classified as primary (1°), secondary (2°) or tertiary (3°) based on the carbon bearing -OH. **Phenols** (Ar-OH) have the -OH group bonded directly to an sp² carbon of an aromatic ring. **Ethers** (R-O-R') have an oxygen atom bonded to two carbon groups (alkyl and/or aryl).

## Preparation of Alcohols

- **From alkenes:** acid-catalysed hydration, following Markovnikov's rule (CH₂=CH₂ + H₂O →[H⁺] CH₃CH₂OH), or by hydroboration-oxidation (giving the anti-Markovnikov product).
- **From carbonyl compounds:** reduction of aldehydes/ketones with LiAlH₄ or NaBH₄ gives 1°/2° alcohols; reduction of carboxylic acids/esters with LiAlH₄ gives 1° alcohols.
- **From Grignard reagents:** reaction of R-MgX with formaldehyde gives a 1° alcohol; with other aldehydes gives a 2° alcohol; with a ketone gives a 3° alcohol.

## Preparation of Phenols

- **From haloarenes:** fusion with NaOH at high temperature and pressure (an exception to the general unreactivity of haloarenes, since it requires very forcing conditions).
- **From diazonium salts:** hydrolysis of a benzenediazonium salt with water.
- **From cumene (the industrial/commercial method):** cumene (isopropylbenzene) is oxidised by air to cumene hydroperoxide, which is then treated with dilute acid to give phenol and acetone as a valuable by-product.

## Physical Properties — Hydrogen Bonding

Alcohols and phenols can form **intermolecular hydrogen bonds** with each other (via their -OH groups) and with water, giving them unusually high boiling points compared to hydrocarbons or ethers of similar molecular mass, and reasonable solubility in water for the smaller members.

## Chemical Properties of Alcohols and Phenols

### 1. Acidity
Both alcohols and phenols can lose the -OH proton (act as weak Brønsted acids), reacting with active metals (e.g. Na) to release hydrogen: 2R-OH + 2Na → 2R-ONa + H₂↑.

> [!key] **Phenols are significantly more acidic than alcohols** (and even react with aqueous NaOH, unlike alcohols, which do not). This is because the phenoxide ion (formed after losing H⁺) is stabilised by resonance delocalisation of the negative charge into the aromatic ring, spreading the charge over several atoms; the alkoxide ion (from an alcohol) has no such resonance stabilisation, so it is a much stronger, more reactive (less stable) base, and correspondingly the parent alcohol is a much weaker acid.

**Effect of substituents on the acidity of phenols:** electron-withdrawing groups (like -NO₂) on the ring, especially at the ortho/para positions, increase acidity (by further stabilising the phenoxide ion through additional resonance/induction); electron-donating groups (like -CH₃, -OCH₃) decrease acidity.

### 2. Esterification
Alcohols (and phenols, though less readily) react with carboxylic acids (in the presence of an acid catalyst) or acid chlorides/anhydrides to form esters: R-OH + R'COOH →[H⁺] R'COOR + H₂O.

### 3. Reaction with Hydrogen Halides
Alcohols react with HX (via SN1 for 3°/2° alcohols, SN2 for 1° alcohols) to form alkyl halides — the basis of the Lucas test used to distinguish 1°, 2° and 3° alcohols (see Haloalkanes and Haloarenes chapter).

### 4. Dehydration
Alcohols undergo acid-catalysed dehydration (elimination of water) to form alkenes, typically using conc. H₂SO₄ or H₃PO₄ at elevated temperature: CH₃CH₂OH →[conc. H₂SO₄, 443 K] CH₂=CH₂ + H₂O. This also follows Saytzeff's rule, favouring the more substituted alkene.

### 5. Oxidation
- **Primary alcohols** are oxidised first to aldehydes, then further to carboxylic acids (using a strong oxidising agent like acidified KMnO₄ or K₂Cr₂O₇); using a milder, controlled oxidant (like pyridinium chlorochromate, PCC) stops the oxidation cleanly at the aldehyde stage.
- **Secondary alcohols** are oxidised to ketones.
- **Tertiary alcohols** resist oxidation under normal conditions (they have no hydrogen atom on the carbon bearing -OH available to be removed).

### 6. Electrophilic Aromatic Substitution in Phenols
The -OH group is strongly **activating and ortho/para-directing** (a powerful electron donor by resonance), so phenol undergoes electrophilic substitution reactions (nitration, halogenation, sulphonation) much more readily than benzene itself, and predominantly at the ortho/para positions. Phenol reacts with bromine water at room temperature (without any catalyst needed) to give a white precipitate of 2,4,6-tribromophenol — a classic, sensitive qualitative test for phenol.

### 7. Kolbe's Reaction and Reimer-Tiemann Reaction
- **Kolbe's reaction:** sodium phenoxide reacts with CO₂ under pressure, followed by acidification, to give salicylic acid (the precursor to aspirin).
- **Reimer-Tiemann reaction:** phenol reacts with chloroform and NaOH to introduce a -CHO group, giving salicylaldehyde.

## Preparation and Properties of Ethers

**Williamson's synthesis** is the most important method for preparing ethers: an alkyl halide reacts with a sodium alkoxide/phenoxide via an SN2 mechanism: R-X + R'-ONa → R-O-R' + NaX. (Since this is SN2, the halide should ideally be primary, to avoid competing elimination.)

Ethers are relatively unreactive due to the strong C-O bond, but can be **cleaved** by concentrated hydrohalic acids (like HI) at high temperature, breaking the C-O bond.
    `,
    experiments: [
      {
        id: "acidity-phenol-vs-alcohol",
        title: "Comparing the Acidity of Phenol and Ethanol",
        aim: "To show that phenol is more acidic than a simple alcohol like ethanol, by testing reactivity with sodium hydroxide.",
        materials: ["Phenol (crystals or solution)", "Ethanol", "Dilute sodium hydroxide solution", "Two test tubes", "Litmus/universal indicator"],
        procedure: [
          "Add dilute NaOH solution to a sample of phenol in a test tube and observe whether it dissolves/reacts.",
          "Repeat with ethanol in a separate test tube under the same conditions.",
          "Test the pH of an aqueous phenol solution with universal indicator, and compare with the pH of an ethanol-water mixture.",
        ],
        observation: "Phenol readily dissolves in (reacts with) the NaOH solution, forming a clear solution of sodium phenoxide. Ethanol shows no visible reaction with dilute NaOH. A phenol solution shows a mildly acidic pH; an ethanol-water mixture shows an essentially neutral pH.",
        reaction: "C₆H₅OH + NaOH → C₆H₅ONa + H₂O (phenol reacts) ; C₂H₅OH + NaOH → no significant reaction",
        conclusion:
          "Phenol is acidic enough to react with a moderately strong base like aqueous sodium hydroxide, while ethanol (a much weaker acid) does not react with NaOH under normal conditions — this confirms that phenol is significantly more acidic than a simple alcohol, due to resonance stabilisation of the phenoxide ion formed.",
        visual: {
          before: "hsl(40 10% 95%)",
          after: "hsl(200 15% 96%)",
          labels: { before: "Phenol crystals + NaOH", after: "Dissolves — sodium phenoxide forms" },
        },
      },
      {
        id: "bromine-water-phenol-test",
        title: "The Bromine Water Test for Phenol",
        aim: "To identify phenol using its characteristic reaction with bromine water, without any catalyst.",
        materials: ["A dilute aqueous phenol solution", "Bromine water", "A test tube"],
        procedure: [
          "Take a small amount of dilute phenol solution in a test tube.",
          "Add bromine water dropwise, with shaking, and observe.",
        ],
        observation: "A white precipitate forms immediately, and the orange colour of the bromine water fades/disappears.",
        reaction: "C₆H₅OH + 3Br₂(aq) → C₆H₂Br₃OH(s)↓ (2,4,6-tribromophenol, white) + 3HBr",
        conclusion:
          "The -OH group of phenol strongly activates the aromatic ring towards electrophilic substitution (by resonance donation of electron density, especially at the ortho and para positions), allowing phenol to react readily with bromine water at room temperature, without needing a catalyst (unlike benzene, which requires a Lewis acid catalyst like FeCl₃ to react with bromine at all). The immediate formation of a white precipitate of 2,4,6-tribromophenol is a simple, sensitive, and characteristic test for the presence of phenol.",
        visual: {
          before: "hsl(25 85% 55%)",
          after: "hsl(0 0% 96%)",
          precipitate: { name: "2,4,6-Tribromophenol", colour: "hsl(0 0% 96%)" },
          labels: { before: "Orange bromine water + phenol", after: "White precipitate; colour fades" },
        },
      },
      {
        id: "oxidation-primary-secondary-alcohol",
        title: "Distinguishing Primary and Secondary Alcohols by Oxidation",
        aim: "To use oxidation with acidified potassium dichromate to distinguish a primary alcohol (giving an aldehyde/acid) from a secondary alcohol (giving a ketone), and a tertiary alcohol (resisting oxidation).",
        materials: ["A primary alcohol (e.g. ethanol)", "A secondary alcohol (e.g. propan-2-ol)", "A tertiary alcohol (e.g. tert-butanol)", "Acidified potassium dichromate solution", "Three test tubes"],
        procedure: [
          "Add acidified K₂Cr₂O₇ solution to separate samples of the primary, secondary and tertiary alcohols in test tubes.",
          "Warm each gently and observe any colour change over a few minutes.",
        ],
        observation:
          "The primary and secondary alcohol samples both cause the orange dichromate solution to turn green (as Cr⁶⁺ is reduced to Cr³⁺). The tertiary alcohol sample shows little to no colour change, even on warming.",
        reaction: "3CH₃CH₂OH + Cr₂O₇²⁻ + 8H⁺ → 3CH₃CHO (further to CH₃COOH with excess) + 2Cr³⁺ + 7H₂O",
        conclusion:
          "Primary and secondary alcohols are readily oxidised by acidified dichromate (turning it from orange to green, as Cr(VI) is reduced to Cr(III)) — primary alcohols to aldehydes and then carboxylic acids, secondary alcohols to ketones. Tertiary alcohols have no hydrogen atom on the carbon bearing the -OH group, so there is no hydrogen available for the oxidising agent to remove, and they resist oxidation under these conditions — this colour-change test is a simple way to identify a tertiary alcohol by its lack of reaction.",
        visual: {
          before: "hsl(25 85% 50%)",
          after: "hsl(140 40% 45%)",
          labels: { before: "Orange dichromate + primary alcohol", after: "Turns green — alcohol oxidised" },
        },
      },
      {
        id: "esterification-alcohol-acid",
        title: "Ester Formation from an Alcohol and a Carboxylic Acid",
        aim: "To prepare a fragrant ester from an alcohol and a carboxylic acid, illustrating the esterification reaction of alcohols.",
        materials: ["Ethanol (or another small alcohol)", "Glacial acetic acid (or another carboxylic acid)", "Concentrated sulphuric acid", "A test tube", "A water bath"],
        procedure: [
          "Mix approximately equal small volumes of the alcohol and the carboxylic acid in a test tube.",
          "Add a few drops of concentrated sulphuric acid (catalyst).",
          "Warm the mixture gently in a water bath for several minutes, then carefully waft the smell towards you.",
        ],
        observation: "A pleasant, fruity, sweet smell develops, quite distinct from the pungent smell of the starting acid.",
        reaction: "CH₃COOH + C₂H₅OH →[conc. H₂SO₄] CH₃COOC₂H₅ (ethyl acetate) + H₂O",
        conclusion:
          "Alcohols react with carboxylic acids in the presence of an acid catalyst (esterification) to form sweet-smelling esters and water — this reaction is reversible, and the concentrated sulphuric acid also serves to absorb the water produced, helping to drive the equilibrium towards the ester product.",
        safety: "Handle concentrated sulphuric acid with care; never smell a test tube directly — waft vapours gently towards you.",
        visual: {
          before: "hsl(40 15% 96%)",
          after: "hsl(40 15% 96%)",
          thermal: "exothermic",
          labels: { before: "Alcohol + acid + catalyst, warming", after: "Sweet, fruity ester smell develops" },
        },
      },
      {
        id: "williamson-ether-synthesis-demo",
        title: "Understanding the Williamson Ether Synthesis",
        aim: "To understand the mechanism and use of the Williamson synthesis for preparing an unsymmetrical ether.",
        materials: ["Sodium ethoxide (prepared from ethanol + sodium)", "A primary alkyl halide (e.g. bromomethane, or a description/diagram)", "Reaction apparatus"],
        procedure: [
          "Prepare sodium ethoxide by carefully reacting a small piece of sodium metal with dry ethanol.",
          "Combine the resulting sodium ethoxide with a primary alkyl halide (e.g. bromomethane) and allow the reaction to proceed (or trace the mechanism via a diagram, given the practical hazards of handling small, volatile alkyl halides directly in a school setting).",
          "Identify the nucleophile, electrophile, and leaving group in this SN2 reaction.",
        ],
        observation: "The alkoxide ion (nucleophile) attacks the carbon of the alkyl halide from the backside, displacing the halide ion (leaving group) and forming a new C-O bond, giving the unsymmetrical ether and sodium halide as products.",
        reaction: "C₂H₅ONa + CH₃Br → C₂H₅-O-CH₃ (methoxyethane, an ether) + NaBr",
        conclusion:
          "The Williamson synthesis is a reliable SN2 reaction between an alkoxide (or phenoxide) ion and a primary alkyl halide, forming a new C-O-C ether linkage; since the mechanism is SN2, using a primary halide (which favours SN2 over competing elimination or SN1 pathways) generally gives the best yield of the desired ether.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Sodium ethoxide + alkyl halide", after: "New C-O-C ether bond forms" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Phenol is more acidic than a simple alcohol like ethanol mainly because:",
        options: [
          "Phenol has more carbon atoms",
          "The phenoxide ion is stabilised by resonance delocalisation into the aromatic ring",
          "Ethanol has a stronger O-H bond",
          "Phenol does not dissolve in water at all",
        ],
        correctAnswer: 1,
        explanation: "The negative charge on the phenoxide ion can be delocalised (spread out) by resonance into the aromatic ring, stabilising it and making phenol a much stronger acid than an alcohol, whose alkoxide ion has no such stabilisation.",
      },
      {
        question: "Which of the following alcohols resists oxidation with acidified potassium dichromate?",
        options: ["A primary alcohol", "A secondary alcohol", "A tertiary alcohol", "All alcohols oxidise equally"],
        correctAnswer: 2,
        explanation: "Tertiary alcohols lack a hydrogen atom on the carbon bearing the -OH group, so there is no hydrogen for the oxidising agent to remove, and they resist oxidation under normal conditions.",
      },
      {
        question: "The industrial (cumene) process for preparing phenol also produces which valuable by-product?",
        options: ["Ethanol", "Acetone", "Formaldehyde", "Benzaldehyde"],
        correctAnswer: 1,
        explanation: "The cumene process oxidises cumene to cumene hydroperoxide, which is then cleaved with dilute acid to give both phenol and acetone as a valuable co-product.",
      },
      {
        question: "The Williamson synthesis prepares ethers by the reaction of:",
        options: [
          "Two alcohols directly",
          "An alkoxide ion with a primary alkyl halide (SN2)",
          "An alkene with water",
          "A carboxylic acid with an alcohol",
        ],
        correctAnswer: 1,
        explanation: "The Williamson synthesis is an SN2 reaction between an alkoxide (or phenoxide) ion and a primary alkyl halide, forming a new C-O-C ether linkage.",
      },
      {
        question: "Phenol reacts with bromine water (without any catalyst) to give:",
        options: ["Monobromophenol only", "2,4,6-Tribromophenol as a white precipitate", "No reaction at all", "Benzene"],
        correctAnswer: 1,
        explanation: "The strongly activating -OH group makes phenol react readily with bromine water at room temperature, giving a white precipitate of 2,4,6-tribromophenol, without needing a catalyst.",
      },
      {
        question: "Acid-catalysed dehydration of an alcohol to form an alkene follows which rule for the major product?",
        options: ["Markovnikov's rule", "Saytzeff's rule", "Hückel's rule", "The octet rule"],
        correctAnswer: 1,
        explanation: "Dehydration of alcohols is an elimination reaction, and follows Saytzeff's rule, favouring the more substituted, more stable alkene as the major product.",
      },
      {
        question: "Which reagent is used in the Lucas test to distinguish primary, secondary and tertiary alcohols?",
        options: ["Bromine water", "Conc. HCl + anhydrous ZnCl₂", "Dilute NaOH", "Sodium metal"],
        correctAnswer: 1,
        explanation: "The Lucas reagent (concentrated HCl with anhydrous ZnCl₂) reacts with alcohols at different rates depending on their class, since it proceeds via a carbocation-forming SN1-type mechanism favoured by more substituted alcohols.",
      },
      {
        question: "The -OH group on a phenol ring is described as:",
        options: [
          "Deactivating and meta-directing",
          "Activating and ortho/para-directing",
          "Having no effect on the ring at all",
          "A strong meta-director only",
        ],
        correctAnswer: 1,
        explanation: "The -OH group donates electron density into the ring by resonance, strongly activating it towards electrophilic substitution and directing new substituents to the ortho and para positions.",
      },
      {
        question: "Which method is used to reduce an aldehyde/ketone into an alcohol?",
        options: ["Oxidation with KMnO₄", "Reduction with LiAlH₄/NaBH₄", "Reaction with bromine water", "Esterification"],
        correctAnswer: 1,
        explanation: "Reducing agents like lithium aluminium hydride (LiAlH₄) or sodium borohydride (NaBH₄) convert aldehydes to primary alcohols and ketones to secondary alcohols.",
      },
      {
        question: "Ethers are relatively unreactive, but can be cleaved by:",
        options: ["Cold, dilute NaOH", "Concentrated hydrohalic acids (like HI) at high temperature", "Water alone at room temperature", "Bromine water"],
        correctAnswer: 1,
        explanation: "The strong C-O bond in ethers is generally unreactive, but can be broken (cleaved) by treatment with concentrated hydrohalic acids like HI at elevated temperature.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Give the general formula/structure that distinguishes an alcohol from a phenol.",
        answer: "In an alcohol, the -OH group is bonded to an sp³ hybridised (alkyl) carbon; in a phenol, the -OH group is bonded directly to an sp² hybridised carbon of an aromatic ring.",
      },
      {
        marks: 1,
        question: "Name the reagent used in the Williamson ether synthesis reaction with an alkoxide ion.",
        answer: "A primary alkyl halide (R-X), which reacts with the alkoxide (or phenoxide) ion via an SN2 mechanism to form an ether.",
      },
      {
        marks: 2,
        question: "Why is phenol acidic enough to react with aqueous NaOH, while ethanol is not?",
        answer:
          "The phenoxide ion, formed when phenol loses its -OH proton, is stabilised by resonance delocalisation of the negative charge into the aromatic ring, making phenol a comparatively strong (though still weak overall) acid, strong enough to be fully neutralised by aqueous NaOH. The ethoxide ion, formed from ethanol, has no such resonance stabilisation (localising the full negative charge on oxygen), making ethanol a much weaker acid that does not react appreciably with NaOH.",
      },
      {
        marks: 2,
        question: "Distinguish between the oxidation products of a primary alcohol and a secondary alcohol.",
        answer:
          "A **primary alcohol** is oxidised first to an aldehyde, and then further (with excess oxidising agent) to a carboxylic acid. A **secondary alcohol** is oxidised to a ketone, which generally resists further oxidation under the same mild conditions (since it would require breaking a C-C bond).",
      },
      {
        marks: 2,
        question: "What is the cumene process, and name its two main products.",
        answer: "The cumene process is the industrial method for preparing phenol: cumene (isopropylbenzene) is first oxidised by air to cumene hydroperoxide, which is then treated with dilute acid to give phenol and acetone (a valuable by-product).",
      },
      {
        marks: 3,
        question: "Explain, with an equation, the Kolbe reaction, and state its industrial significance.",
        answer:
          "In the Kolbe reaction, sodium phenoxide reacts with carbon dioxide under pressure at an elevated temperature, followed by acidification, to give salicylic acid: C₆H₅ONa + CO₂ →[pressure, heat] then H⁺ → C₆H₄(OH)(COOH) (salicylic acid). This reaction is industrially significant because salicylic acid is the key precursor used in the manufacture of aspirin (acetylsalicylic acid), one of the most widely used medicines in the world.",
      },
      {
        marks: 3,
        question: "Explain how electron-withdrawing and electron-donating substituents affect the acidity of substituted phenols.",
        answer:
          "**Electron-withdrawing groups** (like -NO₂), especially at the ortho or para position, increase the acidity of a phenol, because they help further stabilise the negative charge on the resulting phenoxide ion (by additional resonance and/or inductive withdrawal of electron density), making the phenoxide ion form more readily and making the parent phenol more acidic. **Electron-donating groups** (like -CH₃ or -OCH₃) decrease acidity, because they push additional electron density onto the ring/oxygen, destabilising the negative charge on the phenoxide ion (making it a stronger, less stable base), and so make the parent phenol a weaker acid than phenol itself.",
      },
      {
        marks: 3,
        question: "Describe, with an equation, how a tertiary alcohol can be prepared using a Grignard reagent.",
        answer:
          "A Grignard reagent (R-MgX) reacts with a ketone to give a tertiary alcohol after aqueous acidic workup, since the ketone's two other substituents plus the new group from the Grignard reagent are all attached to the resulting alcohol's carbon. Example: reaction of methylmagnesium bromide (CH₃MgBr) with acetone (CH₃COCH₃), followed by hydrolysis: CH₃MgBr + (CH₃)₂C=O → then H₃O⁺ → (CH₃)₃C-OH (tert-butanol), a tertiary alcohol, since the carbonyl carbon of acetone already bears two methyl groups, and gains a third (from the Grignard reagent) plus the new -OH group.",
      },
      {
        marks: 5,
        question:
          "(a) Compare the boiling points of an alcohol and an ether of similar molecular mass, and explain the reason for the difference. (b) State one reason ethers, despite lacking an -OH group, are still somewhat soluble in water.",
        answer:
          "(a) An alcohol of a given molecular mass has a significantly **higher boiling point** than an ether of similar molecular mass. This is because alcohol molecules possess an -OH group, which can form strong intermolecular hydrogen bonds with neighbouring alcohol molecules; breaking these hydrogen bonds during boiling requires significant extra energy. Ether molecules, in contrast, lack any O-H bond (their oxygen is bonded to two carbon groups, not hydrogen), so they cannot hydrogen bond with each other, relying only on weaker dipole-dipole and van der Waals forces between molecules — giving them a much lower boiling point at a comparable molecular mass.\n(b) Although ether molecules cannot hydrogen bond with each other (lacking an O-H bond of their own), the oxygen atom of an ether still has lone pairs of electrons and can act as a hydrogen bond acceptor, forming hydrogen bonds with the -OH hydrogens of surrounding water molecules — this gives smaller ethers (like diethyl ether) a modest but noticeable solubility in water, though generally less than that of a corresponding alcohol.",
      },
      {
        marks: 5,
        question:
          "(a) Explain the mechanism (SN1 vs SN2) by which primary and tertiary alcohols react with HX to give alkyl halides, and how this relates to the Lucas test. (b) Why does a primary alcohol require heating with the Lucas reagent to react, while a tertiary alcohol reacts almost instantly at room temperature?",
        answer:
          "(a) Tertiary alcohols react with HX primarily via an **SN1** mechanism: the acid first protonates the -OH group (making it a much better leaving group, water), which then leaves to form a relatively stable tertiary carbocation; the halide ion then rapidly attacks this carbocation to give the tertiary alkyl halide. Primary alcohols, unable to form a stable primary carbocation, instead react (when they do react) via an **SN2**-like mechanism, where the halide ion attacks the protonated alcohol's carbon directly as the water leaving group departs, in a single concerted step — this requires more forcing conditions (like heating) since it depends on a less favourable, more hindered backside attack.\n(b) Because tertiary alcohols react via SN1, forming a comparatively stable, readily-formed tertiary carbocation, they react with the Lucas reagent very rapidly, even at room temperature (visible as immediate cloudiness). Primary alcohols cannot form a stable carbocation at all (a primary carbocation is highly unstable), so they must instead react via the much slower, more hindered SN2 pathway, which proceeds far too slowly to observe any reaction at room temperature — heating is required to supply enough energy for this less favourable pathway to proceed at a noticeable rate.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 8 — ALDEHYDES, KETONES AND CARBOXYLIC ACIDS
  // ================================================================
  {
    id: "aldehydes-ketones-and-carboxylic-acids",
    number: 8,
    title: "Aldehydes, Ketones and Carboxylic Acids",
    subtitle: "The carbonyl group at the centre of organic synthesis — and the acid it oxidises into",
    description:
      "Nomenclature and structure of the carbonyl group, preparation and nucleophilic addition reactions of aldehydes and ketones, characteristic tests (Tollens', Fehling's, iodoform), the acidity of carboxylic acids and the effect of substituents, and important name reactions like the aldol and Cannizzaro reactions.",
    icon: "🧴",
    color: "moss",
    readingTime: "30 min read",
    videos: [
      {
        title: "Aldehydes, Ketones and Carboxylic Acids — Full Chapter",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/Vv8KcSN0YlM",
      },
      {
        title: "Tollens', Fehling's and Iodoform Tests Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/2mQhw6yKMdE",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/f7-CMMmvfSY",
      },
    ],
    notes: `
# Aldehydes, Ketones and Carboxylic Acids

## The Carbonyl Group

**Aldehydes** (R-CHO) have the carbonyl group (>C=O) bonded to at least one hydrogen atom; **ketones** (R-CO-R') have the carbonyl group bonded to two carbon groups. The carbon-oxygen double bond is **polar** (carbon δ+, oxygen δ−), since oxygen is more electronegative, making the carbonyl carbon susceptible to attack by nucleophiles.

## Preparation of Aldehydes and Ketones

- **Oxidation of alcohols:** primary alcohols to aldehydes (using PCC, a mild oxidant, to avoid over-oxidation), secondary alcohols to ketones (using acidified KMnO₄/K₂Cr₂O₇).
- **Ozonolysis of alkenes:** cleaves the C=C bond to give two carbonyl compounds.
- **Rosenmund reduction:** acyl chlorides are selectively reduced to aldehydes using H₂ over a Pd catalyst poisoned with BaSO₄ (which prevents over-reduction to the alcohol).
- **From nitriles/Grignard reagents:** controlled hydrolysis of nitriles, or reaction of a Grignard reagent with a nitrile, gives a ketone after workup.

## Physical Properties

Aldehydes and ketones have higher boiling points than hydrocarbons of similar mass (due to the polar carbonyl group causing dipole-dipole attractions), but lower boiling points than alcohols of similar mass (since they cannot hydrogen bond with each other, lacking an O-H group); the smaller members are reasonably soluble in water due to hydrogen bonding with water molecules.

## Nucleophilic Addition Reactions

Because of the polar C=O bond, aldehydes and ketones readily undergo **nucleophilic addition** reactions. **Aldehydes are generally more reactive than ketones** towards nucleophilic addition, due to: (i) less steric hindrance (fewer/smaller groups around the carbonyl carbon), and (ii) a weaker +I (electron-donating) effect from only one alkyl group (in aldehydes) compared to two (in ketones), leaving the carbonyl carbon of an aldehyde more electrophilic.

1. **Addition of HCN:** gives a cyanohydrin.
2. **Addition of NaHSO₃ (sodium bisulphite):** gives a bisulphite addition compound (useful for purification of aldehydes/methyl ketones).
3. **Addition of Grignard reagents:** followed by acidic hydrolysis, gives alcohols (see Alcohols, Phenols and Ethers).
4. **Addition of alcohols:** gives hemiacetals/acetals (with an aldehyde) — an important protecting group strategy in organic synthesis.
5. **Addition of ammonia derivatives** (hydroxylamine, hydrazine, phenylhydrazine, semicarbazide): gives oximes, hydrazones, phenylhydrazones and semicarbazones respectively, which are often solid, sharply-melting crystalline derivatives useful for identifying/characterising an unknown carbonyl compound.

## Characteristic Tests

### Tollens' Test (Silver Mirror Test)
Distinguishes an **aldehyde** from a ketone. Tollens' reagent (ammoniacal silver nitrate) oxidises an aldehyde to a carboxylate, while Ag⁺ is reduced to metallic silver, which deposits as a shiny **silver mirror** on the inner wall of the test tube.
RCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → RCOO⁻ + 2Ag↓ + 4NH₃ + 2H₂O

### Fehling's Test
Also distinguishes **aliphatic aldehydes** from ketones (aromatic aldehydes like benzaldehyde do not respond). Fehling's reagent (an alkaline solution of Cu²⁺ complexed with tartrate) is reduced by an aliphatic aldehyde to give a characteristic **brick-red precipitate of Cu₂O**.

### Iodoform Test
Identifies compounds containing a **methyl ketone group** (CH₃-CO-), or a secondary alcohol group that can be oxidised to one (CH₃-CH(OH)-), such as ethanol. The compound is treated with iodine and NaOH (or sodium hypoiodite), giving a **yellow precipitate of iodoform (CHI₃)** with a distinctive antiseptic smell.

## Reactivity of the α-Hydrogen — Aldol Condensation

Hydrogen atoms on the carbon **adjacent** to a carbonyl group (the α-carbon) are acidic (though weakly so) because the resulting carbanion is stabilised by resonance/delocalisation into the carbonyl group. Aldehydes/ketones with an α-hydrogen undergo **aldol condensation** in the presence of a dilute base: two molecules combine to form a β-hydroxy aldehyde/ketone (the aldol), which readily loses water on heating to give an α,β-unsaturated carbonyl compound.

## Cannizzaro Reaction

Aldehydes **without** any α-hydrogen (e.g. formaldehyde, benzaldehyde) undergo the **Cannizzaro reaction** in the presence of concentrated alkali: one molecule is oxidised to a carboxylate ion while another is simultaneously reduced to the corresponding alcohol (a disproportionation reaction, since no aldol condensation is possible without an α-hydrogen).

## Carboxylic Acids

### Acidity
Carboxylic acids (R-COOH) are considerably more acidic than alcohols and phenols, since the resulting **carboxylate ion (RCOO⁻)** is stabilised by resonance across BOTH C-O bonds equally (making the two C-O bonds in the carboxylate ion identical in length, intermediate between a single and double bond), giving much stronger stabilisation than the resonance stabilisation available to a phenoxide ion.

**Effect of substituents on acidity:** electron-withdrawing groups (like -Cl, -NO₂) near the -COOH group **increase** acidity (by further stabilising the carboxylate ion through the inductive effect); electron-donating groups (like alkyl groups) **decrease** acidity. This effect diminishes rapidly with distance from the -COOH group.

### Preparation
- **Oxidation of primary alcohols or aldehydes** with strong oxidising agents (KMnO₄, K₂Cr₂O₇).
- **Hydrolysis of nitriles or amides.**
- **Grignard reagent with CO₂**, followed by acidic workup.

### Chemical Reactions
1. **Reaction with active metals/carbonates:** gives the metal salt and hydrogen/CO₂ (standard acid-base chemistry).
2. **Esterification** with alcohols (as covered in the Alcohols chapter).
3. **Conversion to acyl chlorides** using PCl₅, SOCl₂ or PCl₃.
4. **Decarboxylation:** sodium salts of carboxylic acids, when heated with soda lime (NaOH + CaO), lose CO₂ to give an alkane with one fewer carbon.
5. **Hell-Volhard-Zelinsky (HVZ) reaction:** carboxylic acids with an α-hydrogen react with Cl₂/Br₂ in the presence of red phosphorus to give an α-halo acid, used to introduce a substituent at the alpha position for further synthesis.
    `,
    experiments: [
      {
        id: "tollens-silver-mirror-test",
        title: "Tollens' Test — The Silver Mirror Test for Aldehydes",
        aim: "To distinguish an aldehyde from a ketone using Tollens' reagent, and observe the characteristic silver mirror.",
        materials: ["A clean, grease-free test tube", "Freshly prepared Tollens' reagent (silver nitrate + ammonia solution)", "A sample aldehyde (e.g. acetaldehyde or glucose solution)", "A sample ketone (e.g. acetone, for comparison)", "A warm water bath"],
        procedure: [
          "Add the aldehyde sample to Tollens' reagent in a very clean test tube and warm gently in a water bath, without shaking.",
          "Repeat separately with the ketone sample under identical conditions.",
          "Observe the inner wall of each test tube after a few minutes.",
        ],
        observation: "The test tube containing the aldehyde develops a bright, shiny silver deposit (mirror) coating the inner glass wall. The ketone sample shows no such deposit — the solution remains largely unchanged.",
        reaction: "RCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → RCOO⁻ + 2Ag(s)↓ + 4NH₃ + 2H₂O",
        conclusion:
          "Aldehydes are readily oxidised by the mild oxidising agent in Tollens' reagent (the diamminesilver(I) complex ion), reducing Ag⁺ to metallic silver, which deposits as a smooth mirror on a clean glass surface. Ketones, lacking a hydrogen directly on the carbonyl carbon, are not oxidised under these mild conditions and give no reaction — making this a reliable, classic test for distinguishing aldehydes from ketones.",
        safety: "Tollens' reagent should be freshly prepared and not stored, as it can form explosive silver compounds (silver fulminate/azide) on standing.",
        visual: {
          before: "hsl(200 15% 95%)",
          after: "hsl(210 8% 78%)",
          labels: { before: "Colourless Tollens' reagent + aldehyde", after: "Bright silver mirror deposits" },
        },
      },
      {
        id: "fehlings-test-aldehyde",
        title: "Fehling's Test for Aliphatic Aldehydes",
        aim: "To identify an aliphatic aldehyde using Fehling's solution and observe the characteristic brick-red precipitate.",
        materials: ["Fehling's solution A and B (mixed just before use)", "An aliphatic aldehyde sample (e.g. acetaldehyde or glucose solution)", "A test tube", "A water bath"],
        procedure: [
          "Mix equal volumes of Fehling's solution A and B to obtain the deep blue working reagent.",
          "Add the aldehyde sample and heat gently in a water bath.",
          "Observe the colour change over a few minutes.",
        ],
        observation: "The deep blue solution gradually forms a yellow, then a distinctive brick-red precipitate.",
        reaction: "RCHO + 2Cu²⁺(complexed) + 5OH⁻ → RCOO⁻ + Cu₂O(s)↓ (brick-red) + 3H₂O",
        conclusion:
          "The aliphatic aldehyde reduces the deep blue Cu²⁺ complex in Fehling's solution to insoluble, brick-red copper(I) oxide (Cu₂O), while the aldehyde itself is oxidised to a carboxylate ion — this colour change is a classic test used to detect aliphatic aldehydes and reducing sugars (like glucose, which contains an aldehyde group in its open-chain form); note that aromatic aldehydes like benzaldehyde do not give a positive Fehling's test.",
        visual: {
          before: "hsl(220 60% 40%)",
          after: "hsl(15 60% 40%)",
          precipitate: { name: "Copper(I) oxide", colour: "hsl(15 60% 40%)" },
          labels: { before: "Deep blue Fehling's solution", after: "Brick-red precipitate forms" },
        },
      },
      {
        id: "iodoform-test-methyl-ketone",
        title: "The Iodoform Test for Methyl Ketones and Ethanol",
        aim: "To identify compounds containing a methyl ketone group (or ethanol) using the iodoform test.",
        materials: ["A methyl ketone sample (e.g. acetone)", "Ethanol (as a second positive-test sample)", "A non-methyl-ketone control (e.g. formaldehyde or a different alcohol, for comparison)", "Iodine solution", "Sodium hydroxide solution", "Test tubes"],
        procedure: [
          "Add iodine solution followed by sodium hydroxide solution (added dropwise until the brown iodine colour just disappears, then a slight excess) to the acetone sample, and warm gently if needed.",
          "Repeat with ethanol and with the control sample.",
          "Note any precipitate that forms and its odour in each case.",
        ],
        observation: "Both the acetone and ethanol samples produce a pale yellow precipitate with a distinctive, sweetish (antiseptic-like) smell. The control sample (lacking a methyl ketone or equivalent -CH(OH)CH₃ group) shows no such precipitate.",
        reaction: "CH₃COCH₃ + 3I₂ + 4NaOH → CHI₃(s)↓ (iodoform, yellow) + CH₃COONa + 3NaI + 3H₂O",
        conclusion:
          "The iodoform test is a positive, characteristic reaction for any compound containing a methyl ketone group (CH₃-CO-) directly, or a group that can be oxidised to one under the reaction conditions (like the CH₃-CH(OH)- group in ethanol, which is first oxidised by the iodine/NaOH to acetaldehyde-like intermediates before undergoing the same iodoform-forming sequence) — the formation of yellow, distinctively-smelling iodoform crystals is a reliable, classic qualitative test for these specific structural features.",
        visual: {
          before: "hsl(30 60% 55%)",
          after: "hsl(50 70% 80%)",
          precipitate: { name: "Iodoform", colour: "hsl(50 70% 80%)" },
          labels: { before: "Iodine + NaOH added to sample", after: "Yellow iodoform precipitate forms" },
        },
      },
      {
        id: "carboxylic-acid-carbonate-test",
        title: "Testing the Acidity of a Carboxylic Acid with Sodium Bicarbonate",
        aim: "To confirm the acidic nature of a carboxylic acid and distinguish it from a phenol, using the sodium bicarbonate test.",
        materials: ["A carboxylic acid sample (e.g. acetic acid)", "Phenol (for comparison)", "Sodium bicarbonate solution", "Two test tubes", "Lime water (optional, to confirm CO₂)"],
        procedure: [
          "Add sodium bicarbonate solution to a sample of the carboxylic acid and observe.",
          "Repeat with a phenol sample under identical conditions.",
          "If effervescence is seen, pass the gas evolved through lime water to confirm CO₂.",
        ],
        observation: "Brisk effervescence (bubbling) occurs immediately with the carboxylic acid, and the gas turns lime water milky. Phenol shows little to no effervescence with sodium bicarbonate under the same conditions.",
        reaction: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑ ; C₆H₅OH + NaHCO₃ → no significant reaction",
        conclusion:
          "Carboxylic acids are strong enough acids to react with the weak base sodium bicarbonate, releasing carbon dioxide gas (confirmed by the lime water test); phenol, though acidic enough to react with the stronger base NaOH, is not a strong enough acid to react with the much weaker base NaHCO₃ — this simple test distinguishes carboxylic acids from phenols based on their relative acid strength.",
        visual: {
          before: "hsl(40 30% 96%)",
          after: "hsl(40 12% 90%)",
          gas: "Carbon dioxide",
          labels: { before: "Carboxylic acid + NaHCO₃", after: "Brisk effervescence; gas turns lime water milky" },
        },
      },
      {
        id: "hvz-alpha-halogenation-demo",
        title: "Understanding the Hell-Volhard-Zelinsky (HVZ) Reaction",
        aim: "To trace the mechanism/outcome of the HVZ reaction, which introduces a halogen at the alpha-carbon of a carboxylic acid.",
        materials: ["A carboxylic acid with an alpha-hydrogen (e.g. acetic/propanoic acid, or a description/diagram)", "Bromine or chlorine (as reagent)", "Red phosphorus (catalyst)", "Reaction apparatus/diagram"],
        procedure: [
          "Combine the carboxylic acid with red phosphorus and bromine (or chlorine), typically under reflux (or trace the reaction via a diagram, given the corrosive/hazardous nature of handling bromine directly).",
          "Identify the role of red phosphorus (it reacts with the halogen to generate the corresponding phosphorus trihalide/pentahalide in situ, which converts a small amount of the acid to the more reactive acyl halide).",
          "Trace how the resulting acyl halide (more reactive at the alpha-carbon, in its enol-like form) undergoes halogenation there, and how the product then exchanges with more starting acid to continue the cycle.",
        ],
        observation: "The alpha-hydrogen of the carboxylic acid is selectively replaced by a halogen atom, giving an alpha-halo carboxylic acid as the product.",
        reaction: "CH₃COOH + Br₂ →[red P, catalytic] CH₂BrCOOH (alpha-bromoacetic acid) + HBr",
        conclusion:
          "The HVZ reaction is a useful method for selectively introducing a halogen at the alpha-position of a carboxylic acid (a position that would not normally react readily with the halogen alone), by first converting a portion of the acid to a much more reactive acyl halide (via the red phosphorus catalyst), which readily halogenates at the alpha-carbon; the resulting alpha-halo acyl halide then exchanges with fresh starting acid, regenerating the acyl halide catalyst and releasing the alpha-halo acid product — this alpha-halo acid is a useful synthetic intermediate for further substitution reactions.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Carboxylic acid + Br₂ + red P", after: "Alpha-bromo acid formed" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "The carbonyl group (>C=O) is polar because:",
        options: [
          "Carbon is more electronegative than oxygen",
          "Oxygen is more electronegative than carbon, giving carbon a partial positive charge",
          "Both atoms have equal electronegativity",
          "It contains a triple bond",
        ],
        correctAnswer: 1,
        explanation: "Since oxygen is more electronegative than carbon, the shared electrons in the C=O bond are pulled towards oxygen, leaving carbon with a partial positive charge (δ+), making it electrophilic.",
      },
      {
        question: "Aldehydes are generally more reactive than ketones towards nucleophilic addition because:",
        options: [
          "Aldehydes have less steric hindrance and a weaker +I effect at the carbonyl carbon",
          "Ketones have a triple bond",
          "Aldehydes contain nitrogen",
          "Ketones are always more polar",
        ],
        correctAnswer: 0,
        explanation: "Aldehydes have only one alkyl group (less steric hindrance, weaker electron donation) compared to a ketone's two alkyl groups, leaving the carbonyl carbon of an aldehyde more exposed and more electrophilic.",
      },
      {
        question: "Tollens' test distinguishes an aldehyde from a ketone by producing:",
        options: ["A yellow precipitate", "A brick-red precipitate", "A shiny silver mirror deposit", "No visible change ever"],
        correctAnswer: 2,
        explanation: "Tollens' reagent (ammoniacal AgNO₃) is reduced by an aldehyde, depositing metallic silver as a bright mirror on the test tube wall; ketones give no such reaction.",
      },
      {
        question: "Fehling's test gives a positive result (brick-red precipitate) with:",
        options: [
          "All aldehydes, including aromatic ones",
          "Aliphatic aldehydes only (not aromatic aldehydes)",
          "Ketones only",
          "Alcohols only",
        ],
        correctAnswer: 1,
        explanation: "Fehling's test is positive for aliphatic aldehydes, giving a brick-red Cu₂O precipitate; aromatic aldehydes like benzaldehyde do not give a positive Fehling's test.",
      },
      {
        question: "The iodoform test gives a positive result with:",
        options: [
          "Any alcohol",
          "Compounds containing a methyl ketone group, or a -CH(OH)CH₃ group",
          "Only carboxylic acids",
          "Only aromatic compounds",
        ],
        correctAnswer: 1,
        explanation: "The iodoform test is positive for methyl ketones (CH₃-CO-) and for compounds like ethanol, which are oxidised under the reaction conditions to give an equivalent group, forming yellow iodoform (CHI₃).",
      },
      {
        question: "Which of the following aldehydes would undergo the Cannizzaro reaction rather than aldol condensation?",
        options: ["Acetaldehyde (has an α-hydrogen)", "Propanal (has an α-hydrogen)", "Benzaldehyde (has no α-hydrogen)", "Butanal (has an α-hydrogen)"],
        correctAnswer: 2,
        explanation: "Benzaldehyde has no α-hydrogen (its carbonyl carbon is attached to the aromatic ring, not another carbon with hydrogens), so it cannot undergo aldol condensation and instead undergoes the Cannizzaro reaction in concentrated alkali.",
      },
      {
        question: "Carboxylic acids are more acidic than phenols mainly because:",
        options: [
          "The carboxylate ion is stabilised by resonance across both C-O bonds equally",
          "Carboxylic acids have more carbon atoms",
          "Phenols do not ionise in water at all",
          "Carboxylic acids have no oxygen atoms",
        ],
        correctAnswer: 0,
        explanation: "The negative charge in a carboxylate ion is delocalised equally over both oxygen atoms (making both C-O bonds identical in length), providing stronger resonance stabilisation than the phenoxide ion gets from the aromatic ring, making carboxylic acids more acidic than phenols.",
      },
      {
        question: "An electron-withdrawing group (like -Cl) near the -COOH group generally:",
        options: ["Decreases the acidity of the carboxylic acid", "Increases the acidity of the carboxylic acid", "Has no effect on acidity", "Converts the acid into a base"],
        correctAnswer: 1,
        explanation: "Electron-withdrawing groups stabilise the negative charge on the carboxylate ion further (via the inductive effect), making the acid easier to ionise and therefore more acidic.",
      },
      {
        question: "The Rosenmund reduction converts an acyl chloride selectively into:",
        options: ["A carboxylic acid", "An alcohol", "An aldehyde", "A ketone"],
        correctAnswer: 2,
        explanation: "The Rosenmund reduction uses H₂ over a Pd catalyst poisoned with BaSO₄ to selectively reduce an acyl chloride to an aldehyde, stopping the reduction before it proceeds further to the alcohol.",
      },
      {
        question: "Decarboxylation of the sodium salt of a carboxylic acid, when heated with soda lime, gives:",
        options: ["A carboxylic acid with one more carbon", "An alkane with one fewer carbon than the original acid", "An alcohol", "An aldehyde"],
        correctAnswer: 1,
        explanation: "Heating the sodium salt of a carboxylic acid with soda lime (NaOH + CaO) causes decarboxylation, releasing CO₂ and giving an alkane with one fewer carbon atom than the original acid.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define nucleophilic addition, giving one example of a reagent that adds to a carbonyl group this way.",
        answer: "Nucleophilic addition is the addition of a nucleophile (electron-rich species) across a polar multiple bond, such as the C=O of a carbonyl group. Example: HCN adds to an aldehyde/ketone to give a cyanohydrin.",
      },
      {
        marks: 1,
        question: "Which characteristic test distinguishes an aliphatic aldehyde from an aromatic aldehyde like benzaldehyde?",
        answer: "Fehling's test — aliphatic aldehydes give a positive result (brick-red Cu₂O precipitate), while aromatic aldehydes like benzaldehyde do not react and give a negative result.",
      },
      {
        marks: 2,
        question: "Why do aldehydes generally show more reactivity than ketones towards nucleophilic addition?",
        answer:
          "Aldehydes are generally more reactive than ketones for two reasons: (i) **steric factors** — an aldehyde has only one bulky alkyl/aryl group attached to the carbonyl carbon (the other position is a small hydrogen atom), leaving more room for a nucleophile to approach, compared to a ketone's two bulkier groups; (ii) **electronic factors** — a ketone's two electron-donating alkyl groups reduce the partial positive charge on the carbonyl carbon more than an aldehyde's single alkyl group does, making the ketone's carbonyl carbon less electrophilic and therefore less attractive to an incoming nucleophile.",
      },
      {
        marks: 2,
        question: "Explain what happens in the Cannizzaro reaction, using formaldehyde as an example.",
        answer:
          "In the Cannizzaro reaction, an aldehyde lacking an α-hydrogen (like formaldehyde or benzaldehyde) undergoes a self-oxidation-reduction (disproportionation) reaction when treated with concentrated alkali: one molecule of the aldehyde is oxidised to a carboxylate ion, while a second molecule is simultaneously reduced to the corresponding alcohol. For formaldehyde: 2HCHO + NaOH → HCOONa (sodium formate) + CH₃OH (methanol).",
      },
      {
        marks: 2,
        question: "How does the acidity of chloroacetic acid (ClCH₂COOH) compare with that of acetic acid (CH₃COOH)? Explain why.",
        answer:
          "Chloroacetic acid is significantly more acidic than acetic acid. The electronegative chlorine atom withdraws electron density from the carboxylate group through the inductive effect, further stabilising the negative charge on the resulting carboxylate ion once the acid ionises; this greater stabilisation of the conjugate base makes chloroacetic acid ionise more readily (and thus be more acidic) than the unsubstituted acetic acid.",
      },
      {
        marks: 3,
        question: "Explain the aldol condensation reaction, using acetaldehyde as an example, and state the role of the α-hydrogen.",
        answer:
          "In the aldol condensation, a dilute base removes an acidic α-hydrogen from one molecule of a carbonyl compound (possible because the resulting carbanion is stabilised by resonance/delocalisation into the carbonyl group), forming an enolate ion. This enolate ion then acts as a nucleophile, attacking the electrophilic carbonyl carbon of a second molecule of the same (or a different) carbonyl compound, forming a new C-C bond and a β-hydroxy carbonyl compound (the 'aldol'). For acetaldehyde: 2CH₃CHO →[dilute NaOH] CH₃CH(OH)CH₂CHO (3-hydroxybutanal, the aldol product), which can then be dehydrated on heating to give the α,β-unsaturated aldehyde, CH₃CH=CHCHO (crotonaldehyde). The presence of at least one α-hydrogen is essential for this reaction, since it is the removal of this hydrogen that generates the key nucleophilic enolate intermediate.",
      },
      {
        marks: 3,
        question: "Describe the iodoform test, including the reagents used and the chemical significance of a positive result.",
        answer:
          "The iodoform test is carried out by treating a sample with iodine solution and sodium hydroxide solution (or, equivalently, sodium hypoiodite). If the sample contains a methyl ketone group (CH₃-CO-R) — or a group that can be oxidised to one under these conditions, such as the -CH(OH)CH₃ group in ethanol or other secondary alcohols with a terminal methyl-carbinol group — a pale yellow precipitate of iodoform (CHI₃), with a distinctive sweetish/antiseptic smell, is formed. A positive iodoform test is chemically significant because it specifically confirms the presence of one of these structural features (a methyl ketone, or a convertible equivalent), helping to identify or distinguish unknown carbonyl compounds and alcohols.",
      },
      {
        marks: 3,
        question: "Compare the relative acid strengths of a carboxylic acid, a phenol and an alcohol, and explain the order in terms of resonance stabilisation of their conjugate bases.",
        answer:
          "The order of acidity is: **carboxylic acid > phenol > alcohol**. In a carboxylic acid, the conjugate base (carboxylate ion) has its negative charge delocalised equally over both oxygen atoms via resonance, giving strong stabilisation (and identical, intermediate-length C-O bonds). In a phenol, the conjugate base (phenoxide ion) has its negative charge delocalised into the aromatic ring via resonance, but this stabilisation is comparatively weaker than in the carboxylate ion (and places some negative charge, less favourably, on carbon atoms of the ring rather than solely on oxygen). In an alcohol, the conjugate base (alkoxide ion) has no resonance stabilisation at all — the full negative charge remains localised on the single oxygen atom, making it the least stable conjugate base and the alcohol the weakest acid of the three.",
      },
      {
        marks: 5,
        question:
          "(a) Describe how Tollens' and Fehling's tests can together be used to distinguish between an aliphatic aldehyde, an aromatic aldehyde, and a ketone. (b) Write the ionic equation for the reaction occurring in Tollens' test.",
        answer:
          "(a) **Tollens' test** (ammoniacal silver nitrate) is positive (gives a silver mirror) for BOTH aliphatic and aromatic aldehydes, but negative for ketones — so it distinguishes any aldehyde from any ketone. **Fehling's test**, however, is positive (gives a brick-red Cu₂O precipitate) only for **aliphatic** aldehydes, and gives a negative result for both aromatic aldehydes and ketones. Combining the two tests: a sample that is positive with both Tollens' and Fehling's tests is an **aliphatic aldehyde**; a sample positive with Tollens' but negative with Fehling's is an **aromatic aldehyde**; and a sample negative with both tests is a **ketone**.\n(b) RCHO(aq) + 2[Ag(NH₃)₂]⁺(aq) + 3OH⁻(aq) → RCOO⁻(aq) + 2Ag(s)↓ + 4NH₃(aq) + 2H₂O(l).",
      },
      {
        marks: 5,
        question:
          "(a) Explain the Hell-Volhard-Zelinsky (HVZ) reaction, describing the role of red phosphorus. (b) Explain why this reaction specifically halogenates the α-carbon of a carboxylic acid, rather than another position.",
        answer:
          "(a) The Hell-Volhard-Zelinsky reaction converts a carboxylic acid possessing at least one α-hydrogen into the corresponding α-halo carboxylic acid, using chlorine or bromine in the presence of a catalytic amount of red phosphorus. Red phosphorus first reacts with a small amount of the halogen to generate phosphorus trihalide (PX₃) in situ; this PX₃ then reacts with a portion of the starting carboxylic acid to convert it into the far more reactive corresponding acyl halide. This acyl halide readily halogenates at its α-carbon (via its more reactive enol-like tautomer), and the resulting α-halo acyl halide then exchanges its halide with a fresh molecule of the starting carboxylic acid, regenerating the PX₃/acyl halide catalyst cycle while releasing the desired α-halo carboxylic acid as the isolated product. Example: CH₃COOH + Br₂ →[red P, catalytic] CH₂BrCOOH + HBr.\n(b) The reaction specifically targets the α-carbon because the crucial reactive intermediate is the **enol form of the acyl halide**, in which the C=C double bond (between the carbonyl carbon and the α-carbon) makes the α-carbon significantly more nucleophilic/reactive towards the electrophilic halogen than any other position in the molecule — this enol-halogen reactivity, characteristic of carbonyl compounds generally, is what channels the substitution specifically to the α-position rather than elsewhere along the carbon chain.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 9 — AMINES
  // ================================================================
  {
    id: "amines",
    number: 9,
    title: "Amines",
    subtitle: "Nitrogen's organic side — basicity, classification, and the chemistry of diazonium salts",
    description:
      "Classification and nomenclature of amines, preparation methods, basicity and the factors affecting it, distinguishing 1°/2°/3° amines, and diazonium salts as versatile synthetic intermediates.",
    icon: "🧬",
    color: "cobalt",
    readingTime: "24 min read",
    videos: [
      {
        title: "Amines — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/f7-CMMmvfSY",
      },
      {
        title: "Basicity of Amines Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/Vv8KcSN0YlM",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/2mQhw6yKMdE",
      },
    ],
    notes: `
# Amines

## Classification of Amines

Amines are derivatives of ammonia (NH₃), in which one or more hydrogen atoms are replaced by an alkyl or aryl group. They are classified as **primary (1°, R-NH₂)**, **secondary (2°, R₂NH)** or **tertiary (3°, R₃N)**, based on the number of alkyl/aryl groups directly attached to the nitrogen atom (this classification is different from the 1°/2°/3° system used for alcohols and halides, which is based on the carbon skeleton, not the nitrogen substitution).

## Preparation of Amines

- **Reduction of nitro compounds:** Ar-NO₂ →[H₂/Pd, or Fe/HCl] Ar-NH₂ — the main method for preparing aromatic primary amines like aniline.
- **Ammonolysis of alkyl halides:** R-X + excess NH₃ → R-NH₂ + HX (though this tends to give a mixture of 1°, 2°, 3° amines and even a quaternary ammonium salt, since the product amine can itself act as a nucleophile and react further).
- **Reduction of nitriles:** R-C≡N →[H₂/Ni, or LiAlH₄] R-CH₂-NH₂ (this increases the carbon chain length by one carbon).
- **Gabriel phthalimide synthesis:** a method that gives a **pure primary amine** (without over-alkylation), by reacting phthalimide (as its potassium salt) with an alkyl halide, then hydrolysing the resulting product. (Note: this method does not work for preparing aromatic primary amines, since aryl halides do not readily undergo the required nucleophilic substitution.)
- **Hofmann bromamide degradation:** converts an amide into a primary amine with **one fewer carbon atom**: R-CONH₂ + Br₂ + 4NaOH → R-NH₂ + Na₂CO₃ + 2NaBr + 2H₂O.

## Physical Properties

Primary and secondary amines can form intermolecular hydrogen bonds (via their N-H bonds), giving them higher boiling points than hydrocarbons of similar mass, but lower boiling points than corresponding alcohols (since N-H hydrogen bonds are weaker than O-H hydrogen bonds, as nitrogen is less electronegative than oxygen). Tertiary amines, lacking any N-H bond, cannot hydrogen bond with each other and have correspondingly lower boiling points than isomeric primary/secondary amines.

## Basicity of Amines

Amines are basic because the **lone pair of electrons on nitrogen** can accept a proton (Brønsted base) or donate to an electrophile (Lewis base).

### Factors Affecting Basicity
1. **Electron-donating alkyl groups** increase basicity (by increasing the electron density on nitrogen, making the lone pair more available/more strongly basic) — so alkylamines are generally more basic than ammonia.
2. **Steric hindrance** can reduce basicity in solution, if bulky groups around nitrogen make it harder for the lone pair to interact effectively with a proton, or hinder solvation of the resulting protonated ammonium ion.
3. **Aromatic (aniline-type) amines are considerably LESS basic than ammonia or alkylamines**, because the lone pair on nitrogen is partly **delocalised into the aromatic ring** by resonance, making it less available for protonation; correspondingly, electron-withdrawing groups on the ring (like -NO₂) further decrease the basicity of aniline (by further reducing electron density available on the nitrogen through resonance/induction), while electron-donating groups (like -CH₃) increase it.

> [!key] In aqueous solution, the general basicity order for simple alkylamines is: **secondary > primary > tertiary** (in water) — a somewhat counterintuitive order arising from a balance between the electron-donating inductive effect (favouring more alkyl substitution) and steric hindrance/solvation effects (which become significant for the bulkier tertiary amine, since the resulting protonated ammonium ion is less well solvated by water).

## Distinguishing Primary, Secondary and Tertiary Amines — The Hinsberg Test

Amines react with **benzenesulphonyl chloride** (Hinsberg's reagent) in the presence of KOH:
- A **primary amine** forms a sulphonamide product that is **soluble in KOH** (since the remaining N-H hydrogen is acidic enough, due to the adjacent electron-withdrawing sulphonyl group, to be removed by the base, forming a soluble salt).
- A **secondary amine** forms a sulphonamide product that is **insoluble in KOH** (since there is no remaining N-H hydrogen left to be removed).
- A **tertiary amine** does not react at all with benzenesulphonyl chloride (since there is no N-H hydrogen available to be substituted in the first place), and simply remains as an insoluble oily layer/liquid.

## Diazonium Salts

**Diazotisation:** primary aromatic amines react with nitrous acid (generated in situ from NaNO₂ and a mineral acid like HCl, at low temperature, 273-278 K) to form a **diazonium salt**: Ar-NH₂ + NaNO₂ + 2HCl →[273-278 K] Ar-N₂⁺Cl⁻ + NaCl + 2H₂O. (Aliphatic primary amines instead give unstable diazonium salts that decompose immediately, releasing N₂ gas and a mixture of other products, so this reaction is not synthetically useful for aliphatic amines.)

Diazonium salts are extremely versatile synthetic intermediates, since the -N₂⁺ group can be readily replaced by a wide variety of other groups:
- **Sandmeyer reaction:** Ar-N₂⁺ + CuCl/CuBr/CuCN → Ar-Cl / Ar-Br / Ar-CN (introduces a halogen or a nitrile group onto the ring, at a position that would otherwise be difficult to functionalise directly).
- **Reaction with KI:** Ar-N₂⁺ + KI → Ar-I + N₂ + KCl (introduces iodine, without needing a copper catalyst).
- **Reaction with H₃PO₂ (hypophosphorous acid) or ethanol:** replaces -N₂⁺ with -H (deamination — a way to remove an -NH₂ group entirely from a synthesis, after having used it earlier to direct/control a substitution).
- **Reaction with water (on warming):** Ar-N₂⁺ + H₂O →[Δ] Ar-OH + N₂ + H⁺ (gives a phenol).
- **Coupling reaction:** diazonium salts react with phenols or aromatic amines (which are strongly activated, electron-rich rings) to give brightly coloured **azo compounds** (containing a -N=N- linkage), which form the basis of many synthetic azo dyes.
    `,
    experiments: [
      {
        id: "basicity-amines-litmus",
        title: "Testing the Basic Nature of Amines",
        aim: "To confirm that amines are basic, using litmus paper and by comparing an alkylamine with aniline.",
        materials: ["A sample of an alkylamine (or a strongly ammoniacal solution as an accessible substitute)", "Aniline (if available; otherwise discussed conceptually given handling hazards)", "Red litmus paper", "Test tubes"],
        procedure: [
          "Hold a piece of moist red litmus paper near/over the vapour of the alkylamine sample (or ammonia solution, as an accessible substitute) and observe.",
          "Compare with the effect of aniline vapour on red litmus paper, if available, or discuss its expected (weaker) effect.",
        ],
        observation: "The alkylamine (or ammonia) vapour turns moist red litmus paper distinctly blue, indicating a basic solution. Aniline, if tested, shows a much weaker (or negligible under mild conditions) effect on red litmus.",
        conclusion:
          "Amines are basic due to the lone pair of electrons on nitrogen, which can accept a proton; alkylamines are comparatively strong bases (turning litmus clearly blue), while aromatic amines like aniline are much weaker bases, since the nitrogen lone pair is delocalised into the aromatic ring by resonance, making it far less available to accept a proton.",
        visual: {
          before: "hsl(0 65% 45%)",
          after: "hsl(220 60% 45%)",
          labels: { before: "Moist red litmus paper", after: "Turns blue in amine vapour" },
        },
      },
      {
        id: "hinsberg-test-amine-classification",
        title: "The Hinsberg Test — Distinguishing Primary, Secondary and Tertiary Amines",
        aim: "To classify an unknown amine as primary, secondary or tertiary using the Hinsberg test.",
        materials: ["Samples of a primary, a secondary and a tertiary amine (or descriptions/diagrams, given handling considerations for some amines)", "Benzenesulphonyl chloride", "Potassium hydroxide solution", "Test tubes"],
        procedure: [
          "Add benzenesulphonyl chloride to each amine sample together with KOH solution, and shake well.",
          "Observe whether a solid/product forms, and if so, whether it dissolves upon adding excess KOH.",
        ],
        observation:
          "The primary amine sample initially forms a solid that dissolves completely upon adding excess KOH (giving a clear solution). The secondary amine sample forms a solid/precipitate that remains insoluble even in excess KOH. The tertiary amine sample shows no reaction with benzenesulphonyl chloride at all, remaining as a separate oily layer.",
        reaction: "R-NH₂ + C₆H₅SO₂Cl → C₆H₅SO₂NHR (soluble in excess KOH, as C₆H₅SO₂NR⁻ K⁺) ; R₂NH + C₆H₅SO₂Cl → C₆H₅SO₂NR₂ (insoluble in KOH, no acidic N-H left) ; R₃N + C₆H₅SO₂Cl → no reaction",
        conclusion:
          "The differing outcomes arise from the number of N-H bonds remaining in the product: a primary amine's sulphonamide product still has one acidic N-H (made acidic by the adjacent electron-withdrawing sulphonyl group), which is removed by KOH to give a soluble salt; a secondary amine's sulphonamide product has no N-H left, so it remains insoluble; and a tertiary amine has no N-H to begin with, so it cannot react with benzenesulphonyl chloride at all — this distinct pattern of behaviour makes the Hinsberg test a reliable way to classify an unknown amine.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Amine + benzenesulphonyl chloride + KOH", after: "Soluble (1°) / insoluble (2°) / no reaction (3°)" },
        },
      },
      {
        id: "diazonium-salt-coupling-dye",
        title: "Preparing an Azo Dye by Diazonium Coupling",
        aim: "To prepare a coloured azo dye by coupling a diazonium salt with a phenol, illustrating a key application of diazonium chemistry.",
        materials: ["Aniline (or a description/diagram, given handling considerations)", "Sodium nitrite solution", "Dilute hydrochloric acid", "Phenol (or beta-naphthol) dissolved in dilute NaOH", "An ice bath"],
        procedure: [
          "Prepare a cold (0-5 °C) solution of the diazonium salt by adding sodium nitrite solution to aniline dissolved in excess dilute HCl, keeping the mixture in an ice bath throughout.",
          "Separately prepare a cold, alkaline solution of phenol (or beta-naphthol) in dilute NaOH.",
          "Slowly add the cold diazonium salt solution to the cold phenol solution, with stirring, and observe.",
        ],
        observation: "An intensely coloured (often orange-red) precipitate/dye forms immediately upon mixing the two cold solutions.",
        reaction: "C₆H₅N₂⁺Cl⁻ + C₆H₅OH →[cold, alkaline] C₆H₅-N=N-C₆H₄-OH (an azo dye) + HCl",
        conclusion:
          "The electron-rich diazonium salt (an electrophile) couples with the electron-rich phenol/phenoxide ring (para position preferred) to form a new N=N (azo) linkage, producing a highly coloured azo compound; this coupling reaction, performed at low temperature (since diazonium salts decompose readily on warming), is the basis of the industrial manufacture of many synthetic azo dyes used in textiles and other applications.",
        safety: "This reaction must be kept cold throughout, as diazonium salts are unstable and can decompose explosively if allowed to warm significantly; aniline itself is toxic and should be handled with appropriate care and ventilation.",
        visual: {
          before: "hsl(200 15% 95%)",
          after: "hsl(25 75% 50%)",
          precipitate: { name: "Azo dye", colour: "hsl(25 75% 50%)" },
          labels: { before: "Cold diazonium salt + cold phenoxide", after: "Intensely coloured azo dye forms" },
        },
      },
      {
        id: "sandmeyer-reaction-demo",
        title: "Understanding the Sandmeyer Reaction",
        aim: "To trace how the Sandmeyer reaction introduces a chlorine (or other group) onto an aromatic ring via a diazonium salt intermediate, at a position otherwise hard to functionalise directly.",
        materials: ["A prepared/described diazonium salt solution", "Cuprous chloride (CuCl)", "Reaction apparatus/diagram"],
        procedure: [
          "Add the freshly prepared, cold diazonium salt solution to a solution/suspension of cuprous chloride, and gently warm.",
          "Observe the effervescence (N₂ gas evolved) as the reaction proceeds.",
        ],
        observation: "Vigorous effervescence (N₂ gas) is observed as the reaction mixture is gently warmed, and the corresponding aryl chloride is obtained as the product.",
        reaction: "Ar-N₂⁺Cl⁻ + CuCl → Ar-Cl + N₂↑ + CuCl (catalytic)",
        conclusion:
          "The Sandmeyer reaction replaces the diazonium group (-N₂⁺) with a chlorine atom (or bromine/cyanide, using the corresponding copper(I) salt), with nitrogen gas released as a clean, easily-removed by-product. This is synthetically very useful, since it allows a chlorine (or other) substituent to be introduced at a specific position on an aromatic ring where it might be difficult to introduce directly by ordinary electrophilic aromatic substitution — the position is instead controlled indirectly, via the original position of the -NH₂ group used to form the diazonium salt.",
        visual: {
          before: "hsl(200 15% 95%)",
          after: "hsl(200 15% 95%)",
          gas: "Nitrogen",
          labels: { before: "Diazonium salt + CuCl, warming", after: "N₂ evolved; aryl chloride formed" },
        },
      },
      {
        id: "amine-vs-amide-basicity-comparison",
        title: "Comparing the Basicity of an Amine and an Amide",
        aim: "To show that amines are basic while amides are essentially neutral, relating this to the delocalisation of the nitrogen lone pair in amides.",
        materials: ["A liquid amine sample (or ammonia solution, as an accessible substitute)", "A solid amide sample (e.g. urea, dissolved in water)", "Universal indicator or pH paper", "Test tubes"],
        procedure: [
          "Test the pH of an aqueous solution of the amine (or ammonia solution) using universal indicator/pH paper.",
          "Test the pH of an aqueous solution of the amide (e.g. urea) under the same conditions.",
          "Compare the two pH readings.",
        ],
        observation: "The amine (or ammonia) solution shows a clearly basic pH (well above 7). The amide solution shows a pH close to neutral (close to 7), despite also containing a nitrogen atom with a lone pair.",
        conclusion:
          "In an amine, the lone pair on nitrogen is largely localised and readily available to accept a proton, making it distinctly basic. In an amide, however, the nitrogen lone pair is strongly delocalised by resonance into the adjacent carbonyl group (forming a partial C=N double bond character and spreading electron density onto the oxygen), making this lone pair far less available to accept a proton — as a result, amides are only extremely weakly basic (essentially neutral in practice), quite unlike simple amines despite the structural similarity of having a nitrogen atom bonded to carbon and hydrogen.",
        visual: {
          before: "hsl(120 30% 60%)",
          after: "hsl(60 20% 70%)",
          labels: { before: "Amine solution — clearly basic", after: "Amide solution — nearly neutral" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Amines are classified as primary, secondary or tertiary based on:",
        options: [
          "The carbon atom bearing the amine group",
          "The number of alkyl/aryl groups directly attached to the nitrogen atom",
          "Their molecular mass",
          "Whether they are liquid or solid",
        ],
        correctAnswer: 1,
        explanation: "Unlike alcohols/halides (classified by the carbon), amines are classified based on the number of carbon groups directly bonded to the nitrogen atom itself.",
      },
      {
        question: "Aniline is a much weaker base than a simple alkylamine mainly because:",
        options: [
          "It has a higher molecular mass",
          "The nitrogen lone pair is delocalised into the aromatic ring by resonance",
          "It contains no nitrogen atom",
          "It is a solid at room temperature",
        ],
        correctAnswer: 1,
        explanation: "In aniline, the lone pair on nitrogen is partly delocalised into the benzene ring via resonance, making it less available to accept a proton, significantly reducing its basicity compared to alkylamines.",
      },
      {
        question: "In the Hinsberg test, a secondary amine's product with benzenesulphonyl chloride is:",
        options: ["Soluble in KOH", "Insoluble in KOH", "It does not react at all", "It explodes"],
        correctAnswer: 1,
        explanation: "A secondary amine's sulphonamide product has no remaining acidic N-H (both original N-H bonds are replaced), so it cannot form a soluble salt with KOH and remains insoluble.",
      },
      {
        question: "Diazotisation of an aromatic primary amine is carried out:",
        options: ["At high temperature, above 350 K", "At low temperature, 273-278 K", "In the complete absence of acid", "Only in organic solvents"],
        correctAnswer: 1,
        explanation: "Diazotisation must be carried out at low temperature (273-278 K, using an ice bath) because diazonium salts are unstable and decompose readily if the temperature rises.",
      },
      {
        question: "The Sandmeyer reaction converts a diazonium salt into an:",
        options: ["Amine, using ammonia", "Aryl halide or nitrile, using a copper(I) salt", "Alcohol, using water alone", "Ester"],
        correctAnswer: 1,
        explanation: "The Sandmeyer reaction uses copper(I) salts (like CuCl, CuBr, CuCN) to replace the -N₂⁺ group of a diazonium salt with a halogen or a nitrile group.",
      },
      {
        question: "The Gabriel phthalimide synthesis is a preferred method for preparing:",
        options: ["Pure tertiary amines", "Pure secondary amines", "Pure primary amines, without over-alkylation", "Aromatic amines specifically"],
        correctAnswer: 2,
        explanation: "The Gabriel synthesis gives a pure primary amine, avoiding the mixture of products (1°, 2°, 3°, quaternary) that typically results from direct ammonolysis of an alkyl halide with ammonia.",
      },
      {
        question: "Reaction of a diazonium salt with water on warming produces:",
        options: ["An aryl halide", "A phenol", "An amine again", "An azo dye"],
        correctAnswer: 1,
        explanation: "Warming a diazonium salt with water hydrolyses it, replacing the -N₂⁺ group with -OH and releasing N₂ gas, giving a phenol as the product.",
      },
      {
        question: "The Hofmann bromamide degradation converts an amide into a primary amine with:",
        options: ["One more carbon atom", "One fewer carbon atom", "The same number of carbon atoms", "No nitrogen atom at all"],
        correctAnswer: 1,
        explanation: "In the Hofmann bromamide degradation, R-CONH₂ is converted into R-NH₂, losing the carbonyl carbon (as CO₂/carbonate) and resulting in a primary amine with one fewer carbon atom than the starting amide.",
      },
      {
        question: "Which of these substituents on the aniline ring would decrease its basicity even further?",
        options: ["-CH₃ (electron-donating)", "-NO₂ (electron-withdrawing)", "Neither would have any effect", "Both would increase basicity"],
        correctAnswer: 1,
        explanation: "Electron-withdrawing groups like -NO₂ further reduce the electron density available on the nitrogen lone pair (through both induction and resonance), decreasing basicity even further compared to unsubstituted aniline.",
      },
      {
        question: "Coupling of a diazonium salt with phenol typically gives:",
        options: ["A colourless, non-aromatic product", "A brightly coloured azo compound", "A simple alkane", "Carbon dioxide gas only"],
        correctAnswer: 1,
        explanation: "Diazonium salts couple with electron-rich rings like phenols to form azo compounds (containing an -N=N- linkage), which are typically intensely and characteristically coloured, forming the basis of many synthetic dyes.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define a primary amine.",
        answer: "A primary amine is a derivative of ammonia in which exactly one hydrogen atom is replaced by an alkyl or aryl group, i.e. R-NH₂.",
      },
      {
        marks: 1,
        question: "What is diazotisation?",
        answer: "Diazotisation is the reaction of a primary aromatic amine with nitrous acid (generated in situ from NaNO₂ and a mineral acid) at low temperature (273-278 K), forming a diazonium salt.",
      },
      {
        marks: 2,
        question: "Why is aniline a weaker base than methylamine?",
        answer:
          "In aniline, the lone pair of electrons on the nitrogen atom is delocalised into the aromatic ring via resonance, making it less available to accept a proton, and reducing the basicity of the nitrogen. In methylamine, the electron-donating methyl group increases electron density on nitrogen (with no such delocalisation into a ring, since there is none), making the lone pair more available and methylamine a stronger base than aniline.",
      },
      {
        marks: 2,
        question: "Describe the Hinsberg test result for a tertiary amine and explain why it behaves this way.",
        answer:
          "A tertiary amine shows no reaction with benzenesulphonyl chloride in the Hinsberg test, and simply remains unreacted (often visible as a separate oily layer). This is because a tertiary amine has no hydrogen atom bonded to its nitrogen (all three positions are already occupied by alkyl/aryl groups), so there is no N-H available for benzenesulphonyl chloride to substitute in the first place.",
      },
      {
        marks: 2,
        question: "Write the equation for the Sandmeyer reaction converting benzenediazonium chloride into chlorobenzene.",
        answer: "C₆H₅N₂⁺Cl⁻ + CuCl → C₆H₅Cl + N₂↑ (with CuCl acting catalytically, regenerated in the cycle).",
      },
      {
        marks: 3,
        question: "Explain why the basicity order of simple alkylamines in aqueous solution is often found to be secondary > primary > tertiary, rather than a simple increasing order with substitution.",
        answer:
          "Two opposing factors are at play: the **inductive effect** of alkyl groups (electron-donating) would predict basicity should increase steadily as more alkyl groups are added (tertiary > secondary > primary), by increasing electron density on nitrogen. However, **steric hindrance and solvation effects** become increasingly significant as more bulky alkyl groups surround the nitrogen: a more heavily substituted (bulkier) amine's protonated ammonium ion is less effectively stabilised (solvated) by surrounding water molecules via hydrogen bonding, particularly for tertiary amines. Because both effects act in opposition, and the solvation/steric penalty becomes dominant for the bulkiest (tertiary) amine, the observed order in aqueous solution ends up as secondary > primary > tertiary for many simple alkylamines, rather than the order predicted by the inductive effect alone.",
      },
      {
        marks: 3,
        question: "Explain the Gabriel phthalimide synthesis and state why it does not work for preparing aromatic amines.",
        answer:
          "In the Gabriel phthalimide synthesis, phthalimide is first converted to its potassium salt (using KOH), which then reacts with an alkyl halide via nucleophilic substitution (SN2) to give N-alkylphthalimide. This intermediate is then hydrolysed (typically with aqueous acid or base, or with hydrazine in the Ing-Manske modification) to release the pure primary amine and phthalic acid/hydrazide as a by-product. This method reliably gives a pure primary amine, without the over-alkylation problem seen in direct ammonolysis of alkyl halides.\nIt does not work for preparing aromatic amines because the key first step requires nucleophilic substitution (SN2) at the carbon bearing the halide, and aryl halides (where the halogen is attached directly to an sp² aromatic ring carbon) are essentially unreactive towards this type of nucleophilic substitution under normal conditions (as discussed in Haloalkanes and Haloarenes).",
      },
      {
        marks: 3,
        question: "Describe the coupling reaction of a diazonium salt with a phenol, and state its practical significance.",
        answer:
          "A diazonium salt, kept cold, reacts with an electron-rich aromatic ring (such as phenol, or more specifically its phenoxide ion in slightly alkaline solution) in a coupling reaction: the diazonium salt acts as a weak electrophile, and attacks the phenol ring predominantly at the para position (or ortho, if para is blocked), forming a new N=N (azo) linkage between the two aromatic rings, and releasing H⁺. For example: C₆H₅N₂⁺Cl⁻ + C₆H₅OH → C₆H₅-N=N-C₆H₄-OH + HCl. This reaction is of great practical significance in the dye industry, since the extended conjugation created by the new azo linkage, combined with the two aromatic rings, typically produces an intensely and usefully coloured product — this is the basis for manufacturing many synthetic 'azo dyes' used to colour textiles, food and other materials.",
      },
      {
        marks: 5,
        question:
          "(a) Compare the preparation of amines by ammonolysis of alkyl halides versus the Gabriel synthesis, explaining the main advantage of the Gabriel method. (b) Explain why reduction of a nitrile (R-CN) to a primary amine increases the carbon chain length by one carbon compared to the starting alkyl halide used to make that nitrile.",
        answer:
          "(a) **Ammonolysis** of an alkyl halide with excess ammonia (R-X + NH₃ → R-NH₂ + HX) suffers from a major practical problem: the primary amine product is itself a good nucleophile, and can react further with unreacted alkyl halide to give a secondary amine, which can react again to give a tertiary amine, and even again to give a quaternary ammonium salt — so the reaction typically gives a difficult-to-separate mixture of all these products rather than a single pure amine. The **Gabriel phthalimide synthesis**, in contrast, uses phthalimide (attached to only one nitrogen position, with no remaining N-H once alkylated) as an intermediate carrier for the nitrogen, so only a single alkylation can occur at that nitrogen before hydrolysis releases the pure primary amine — this avoids the over-alkylation problem entirely, and is the main practical advantage of the Gabriel method for preparing pure primary amines.\n(b) A nitrile is typically prepared from an alkyl halide by reaction with a cyanide ion (R-X + CN⁻ → R-CN + X⁻), which itself already adds one extra carbon (from the cyanide group) to the original alkyl halide's carbon skeleton. When this nitrile is subsequently reduced (R-C≡N + 4[H] → R-CH₂-NH₂), the nitrile's carbon (originally from the cyanide ion) is retained and becomes the new -CH₂-NH₂ carbon of the product amine — so, overall, converting an alkyl halide (R-X) via its nitrile into the corresponding primary amine (R-CH₂-NH₂) results in a product with one more carbon atom than the original alkyl halide, since the carbon of the added cyanide group is preserved throughout the sequence.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 10 — BIOMOLECULES
  // ================================================================
  {
    id: "biomolecules",
    number: 10,
    title: "Biomolecules",
    subtitle: "Carbohydrates, proteins, nucleic acids and vitamins — the chemistry that runs a living cell",
    description:
      "Classification and structure of carbohydrates (monosaccharides, oligosaccharides, polysaccharides), amino acids and protein structure, enzymes, vitamins and their deficiency diseases, and the structure and function of DNA and RNA.",
    icon: "🧬",
    color: "iris",
    readingTime: "29 min read",
    videos: [
      {
        title: "Biomolecules — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/2mQhw6yKMdE",
      },
      {
        title: "Protein Structure and DNA Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/f7-CMMmvfSY",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/Vv8KcSN0YlM",
      },
    ],
    notes: `
# Biomolecules

## Carbohydrates

Carbohydrates (also called saccharides) are polyhydroxy aldehydes or ketones, or compounds that yield such units on hydrolysis, with the general formula roughly Cₓ(H₂O)ᵧ (though not all carbohydrates strictly fit this formula, and not all compounds fitting it are carbohydrates).

### Classification
- **Monosaccharides** — cannot be hydrolysed into simpler units, e.g. glucose (an aldohexose), fructose (a ketohexose).
- **Oligosaccharides** — yield 2-10 monosaccharide units on hydrolysis; **disaccharides** (2 units) are the most common, e.g. sucrose (glucose + fructose), maltose (glucose + glucose), lactose (glucose + galactose).
- **Polysaccharides** — yield a large number of monosaccharide units on hydrolysis, e.g. starch, cellulose, glycogen; generally not sweet-tasting, and often called **non-reducing** sugars since their free aldehyde/ketone groups are mostly tied up in glycosidic linkages.

### Reducing and Non-Reducing Sugars
A sugar is called **reducing** if it can reduce Tollens'/Fehling's reagent, which requires a free aldehyde (or a group that can tautomerise to one) — all monosaccharides and most disaccharides (like maltose, lactose) are reducing sugars. **Sucrose is a non-reducing sugar**, since both its anomeric carbons (from glucose and fructose) are involved in forming the glycosidic bond, leaving no free reactive aldehyde/ketone group.

### Structure of Glucose
Glucose exists predominantly in a cyclic (ring) form in solution, in equilibrium with a small amount of the open-chain form; the cyclic structure (a six-membered ring, similar to pyran, called a **pyranose** form) arises from the intramolecular reaction between the -CHO group at C1 and the -OH group at C5, creating a new stereocentre at C1 (the **anomeric carbon**), giving rise to two anomers, **α-glucose and β-glucose**, which differ only in the spatial orientation of the -OH group at this new stereocentre.

### Starch and Cellulose
**Starch**, the storage polysaccharide in plants, consists of two components: **amylose** (a long, unbranched chain of glucose units linked by α-1,4-glycosidic bonds, water-soluble) and **amylopectin** (a branched-chain polysaccharide, with additional α-1,6-glycosidic branch points, water-insoluble).

**Cellulose**, the structural polysaccharide that makes up plant cell walls, is also a polymer of glucose, but the glucose units are linked by **β-1,4-glycosidic bonds** (rather than the α-linkages of starch); this seemingly small structural difference is highly significant — humans lack the enzyme (cellulase) needed to hydrolyse β-glycosidic linkages, so we cannot digest cellulose as a food source, unlike starch.

**Glycogen** is the storage polysaccharide in animals, structurally similar to amylopectin but more highly branched.

## Proteins

Proteins are polymers of **α-amino acids**, linked together by **peptide bonds** (amide linkages, -CO-NH-, formed between the -COOH group of one amino acid and the -NH₂ group of the next, with loss of water).

### Amino Acids
An α-amino acid has both an amino group (-NH₂) and a carboxylic acid group (-COOH) attached to the same (α) carbon atom. In their solid state and in solution near neutral pH, amino acids exist predominantly as **zwitterions** (dipolar ions, with the -COOH group deprotonated to -COO⁻ and the -NH₂ group protonated to -NH₃⁺), which explains their characteristic high melting points and good solubility in water (properties typical of ionic compounds).

Of the 20 or so amino acids commonly found in proteins, some cannot be synthesised by the human body and must be obtained from the diet — these are called **essential amino acids**.

### Levels of Protein Structure
- **Primary structure** — the specific, linear sequence of amino acids in a polypeptide chain.
- **Secondary structure** — the regular, repeating local folding pattern of the polypeptide backbone, stabilised by hydrogen bonding between the backbone -C=O and -N-H groups; the two most common secondary structures are the **α-helix** (a coiled, spring-like structure) and the **β-pleated sheet** (an extended, folded, sheet-like structure).
- **Tertiary structure** — the overall three-dimensional shape of a single polypeptide chain, arising from the further folding of the secondary structure, stabilised by interactions between the amino acid side chains (hydrogen bonds, disulphide bridges, ionic and hydrophobic interactions); this overall 3D shape is essential for the protein's biological function.
- **Quaternary structure** — the spatial arrangement of two or more separate polypeptide chains (subunits) relative to each other, in proteins made of more than one chain (e.g. haemoglobin, made of four subunits).

### Denaturation of Proteins
When a protein's native, biologically active structure is disrupted by heat, changes in pH, or certain chemicals, its secondary and tertiary structure unfolds (while the primary structure, the sequence of amino acids, usually remains intact), causing the protein to lose its biological activity — this process is called **denaturation**. e.g. the coagulation of egg white on boiling, or the curdling of milk with acid.

## Enzymes

**Enzymes** are biological catalysts, almost all of which are globular proteins; they dramatically increase the rate of biochemical reactions by lowering the activation energy, and are highly **specific** for a particular substrate or type of reaction (often explained by a lock-and-key or induced-fit model, where the enzyme's active site has a shape complementary to its substrate).

## Vitamins

**Vitamins** are organic compounds required in small amounts in the diet, essential for the normal functioning of the body, that (with a few exceptions) the body cannot synthesise on its own.

- **Fat-soluble vitamins** (A, D, E, K) — can be stored in the body's fatty tissue.
- **Water-soluble vitamins** (B-complex, C) — cannot generally be stored (with the notable exception of vitamin B₁₂) and must be regularly supplied through the diet, since any excess is usually excreted.

| Vitamin | Deficiency disease |
|---|---|
| A | Night blindness (xerophthalmia) |
| B₁ (thiamine) | Beriberi |
| C (ascorbic acid) | Scurvy |
| D | Rickets (in children) / osteomalacia (in adults) |
| K | Increased blood clotting time |

## Nucleic Acids

Nucleic acids (**DNA**, deoxyribonucleic acid, and **RNA**, ribonucleic acid) are polymers of repeating units called **nucleotides**, each consisting of three components: a **nitrogenous base**, a **pentose sugar** (deoxyribose in DNA, ribose in RNA), and a **phosphate group**.

**Nitrogenous bases:** DNA contains adenine (A), guanine (G), cytosine (C) and thymine (T); RNA contains adenine, guanine, cytosine and **uracil (U) instead of thymine**.

### Structure of DNA
DNA typically exists as a **double helix**, with two complementary polynucleotide strands wound around each other, held together by **hydrogen bonding between specific, complementary base pairs**: adenine always pairs with thymine (A-T, via 2 hydrogen bonds), and guanine always pairs with cytosine (G-C, via 3 hydrogen bonds) — this specific, complementary base-pairing is the molecular basis for the accurate replication of genetic information and its faithful transmission from one generation to the next.

### Biological Functions
DNA is the primary repository of genetic information (the hereditary material) in most organisms. RNA plays several key roles in reading this information and using it to synthesise proteins — messenger RNA (mRNA) carries the genetic code from DNA to the site of protein synthesis (the ribosome), transfer RNA (tRNA) brings the correct amino acid to the ribosome during translation, and ribosomal RNA (rRNA) is a structural and catalytic component of the ribosome itself.
    `,
    experiments: [
      {
        id: "benedicts-test-reducing-sugar",
        title: "Benedict's Test for Reducing Sugars",
        aim: "To test a sample for the presence of a reducing sugar (like glucose) using Benedict's solution.",
        materials: ["Benedict's solution (a blue solution, similar in principle to Fehling's)", "A glucose solution", "A sucrose solution (a non-reducing sugar, for comparison)", "Two test tubes", "A water bath"],
        procedure: [
          "Add Benedict's solution to the glucose sample and heat gently in a water bath for a few minutes.",
          "Repeat with the sucrose sample under identical conditions.",
          "Compare the colour changes after heating.",
        ],
        observation: "The glucose sample changes colour progressively from blue through green, yellow, to a brick-red/orange precipitate. The sucrose sample shows little to no colour change, remaining blue.",
        reaction: "Glucose (with a free aldehyde group) + Cu²⁺(complexed, blue) →[heat] gluconic acid + Cu₂O(s)↓ (brick-red)",
        conclusion:
          "Glucose, having a free aldehyde group in its open-chain form, is a reducing sugar and reduces the copper(II) ions in Benedict's solution to insoluble, brick-red copper(I) oxide. Sucrose is a non-reducing sugar (its anomeric carbons are both tied up in the glycosidic bond between glucose and fructose, leaving no free aldehyde/ketone group), so it gives no significant colour change with Benedict's solution — this test is widely used, for instance, to detect glucose in urine as a simple screening test related to diabetes.",
        visual: {
          before: "hsl(220 60% 45%)",
          after: "hsl(15 60% 45%)",
          precipitate: { name: "Copper(I) oxide", colour: "hsl(15 60% 45%)" },
          labels: { before: "Blue Benedict's solution + glucose", after: "Brick-red precipitate on heating" },
        },
      },
      {
        id: "iodine-starch-test",
        title: "The Iodine Test for Starch",
        aim: "To identify the presence of starch using iodine solution, and understand the origin of the characteristic colour.",
        materials: ["Starch solution/suspension", "Iodine solution (iodine dissolved in potassium iodide)", "A test tube or a piece of starchy food (e.g. potato/bread)"],
        procedure: [
          "Add a few drops of iodine solution to the starch sample (in solution, or directly onto a starchy food surface).",
          "Observe the colour change.",
        ],
        observation: "The sample turns a deep blue-black colour immediately upon contact with iodine.",
        conclusion:
          "The amylose component of starch coils into a helical structure, and iodine molecules can slot into the centre of this helix, forming a starch-iodine inclusion complex; this specific arrangement produces a characteristic, intense blue-black colour through charge-transfer interactions, making the iodine test a simple, sensitive, and classic qualitative test for the presence of starch.",
        visual: {
          before: "hsl(30 15% 90%)",
          after: "hsl(240 60% 20%)",
          labels: { before: "Starch sample + iodine", after: "Deep blue-black colour develops" },
        },
      },
      {
        id: "biuret-test-protein",
        title: "The Biuret Test for Proteins",
        aim: "To identify the presence of protein (specifically, the peptide bond) using the biuret test.",
        materials: ["A protein solution (e.g. egg albumin diluted in water)", "Dilute sodium hydroxide solution", "Dilute copper sulphate solution (a few drops)", "A starch/sugar solution (for comparison, expected negative)", "Test tubes"],
        procedure: [
          "Add dilute NaOH solution to the protein sample, followed by a few drops of dilute copper sulphate solution, and mix gently.",
          "Repeat with the starch/sugar solution as a comparison.",
          "Observe the colour of each mixture.",
        ],
        observation: "The protein sample turns a distinctive violet/purple colour. The starch/sugar sample (a comparison lacking peptide bonds) shows only the pale blue colour of the dilute copper sulphate reagent itself, with no violet colour.",
        conclusion:
          "The biuret test detects the presence of peptide bonds (two or more), which form a coloured coordination complex with Cu²⁺ ions in alkaline solution, producing a characteristic violet colour. Since only compounds containing multiple peptide (or similar amide) linkages give this positive result, the biuret test is a reliable, general test for the presence of protein (or peptides of a sufficient length), distinguishing it from substances (like simple sugars) that lack this structural feature.",
        visual: {
          before: "hsl(200 15% 92%)",
          after: "hsl(270 45% 50%)",
          labels: { before: "Protein + NaOH + dilute CuSO₄", after: "Violet colour confirms protein" },
        },
      },
      {
        id: "protein-denaturation-heat-acid",
        title: "Denaturing a Protein Using Heat and Acid",
        aim: "To observe the denaturation of a protein by heat and by acid, and relate the physical change to disruption of secondary/tertiary structure.",
        materials: ["Fresh egg white (a convenient, accessible protein source, diluted with water)", "Two test tubes", "A source of heat (water bath)", "Dilute acid (e.g. dilute HCl or vinegar)"],
        procedure: [
          "Heat one sample of diluted egg white gently in a water bath and observe any change in appearance/texture.",
          "Add a few drops of dilute acid to a fresh, unheated sample of diluted egg white and observe.",
        ],
        observation: "The heated egg white turns from a clear, runny liquid into an opaque, solid, coagulated mass. The acid-treated sample also becomes cloudy/curdled, forming a similar coagulated precipitate.",
        conclusion:
          "Both heat and changes in pH (from added acid) disrupt the weak, non-covalent interactions (hydrogen bonds, ionic interactions, hydrophobic interactions) that hold a protein's specific secondary and tertiary structure together, without breaking the covalent peptide bonds of the primary structure (the amino acid sequence) itself. This unfolding, called denaturation, causes the protein to lose its normal, soluble, biologically functional shape, often becoming insoluble and visibly coagulating — exactly as observed when cooking an egg (heat denaturation) or curdling milk with an acid like lemon juice (acid denaturation).",
        visual: {
          before: "hsl(45 20% 92%)",
          after: "hsl(45 5% 96%)",
          thermal: "endothermic",
          labels: { before: "Clear, liquid egg white", after: "Opaque, coagulated (denatured)" },
        },
      },
      {
        id: "dna-extraction-demo",
        title: "Extracting DNA from a Fruit (Simple Demonstration)",
        aim: "To extract visible strands of DNA from a fruit (e.g. banana or strawberry), demonstrating a simplified version of the biochemical extraction process.",
        materials: ["A ripe banana or strawberry", "Salt", "Dish soap/detergent", "Water", "Cold ethanol/isopropanol", "A cheesecloth/fine strainer", "A test tube or narrow glass"],
        procedure: [
          "Mash the fruit thoroughly with a small amount of salt water in a plastic bag or bowl.",
          "Add a small amount of dish soap/detergent to the mashed mixture, mix gently (avoiding excess foaming), and let it sit for a few minutes.",
          "Filter the mixture through cheesecloth into a test tube or narrow glass, then slowly and carefully pour cold ethanol down the side of the tube to form a distinct layer on top of the filtered liquid.",
        ],
        observation: "White, stringy, mucus-like strands appear at the interface between the two liquid layers, and float up into the ethanol layer.",
        conclusion:
          "The salt and detergent work together to break open the fruit's cells and cell membranes and disrupt the proteins normally associated with the DNA, releasing DNA into solution; DNA is not soluble in cold alcohol (unlike in the aqueous layer below), so adding cold ethanol causes the DNA to precipitate out of solution as visible, stringy, white strands at the interface between the two layers — a simple, hands-on demonstration that DNA is a real, physical, extractable substance, made of long polymer strands, rather than an abstract concept.",
        visual: {
          before: "hsl(45 30% 88%)",
          after: "hsl(45 10% 96%)",
          precipitate: { name: "DNA strands", colour: "hsl(0 0% 96%)" },
          labels: { before: "Filtered fruit extract + salt/detergent", after: "White DNA strands precipitate in alcohol layer" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Sucrose is classified as a non-reducing sugar because:",
        options: [
          "It has no oxygen atoms",
          "Both anomeric carbons are involved in the glycosidic bond, leaving no free aldehyde/ketone group",
          "It is a monosaccharide",
          "It does not dissolve in water",
        ],
        correctAnswer: 1,
        explanation: "In sucrose, both the anomeric carbons of glucose and fructose are joined in the glycosidic bond, so there is no free reactive aldehyde or ketone group left to reduce Tollens'/Fehling's reagent.",
      },
      {
        question: "Starch and cellulose are both polymers of glucose, but differ mainly in:",
        options: [
          "The type of monomer used",
          "The type of glycosidic linkage (α vs β) between glucose units",
          "Cellulose containing fructose instead of glucose",
          "Starch containing no oxygen atoms",
        ],
        correctAnswer: 1,
        explanation: "Starch is linked by α-1,4-glycosidic bonds, while cellulose is linked by β-1,4-glycosidic bonds; this difference in linkage type is why humans can digest starch but not cellulose.",
      },
      {
        question: "In solid or aqueous form near neutral pH, amino acids exist predominantly as:",
        options: ["Neutral molecules with no charge", "Zwitterions (dipolar ions)", "Purely negative ions only", "Purely positive ions only"],
        correctAnswer: 1,
        explanation: "Amino acids exist as zwitterions, with the -COOH group deprotonated (-COO⁻) and the -NH₂ group protonated (-NH₃⁺), giving them ionic-compound-like properties (high melting point, water solubility).",
      },
      {
        question: "The secondary structure of a protein, such as the α-helix, is primarily stabilised by:",
        options: [
          "Ionic bonds between distant side chains",
          "Hydrogen bonding between backbone -C=O and -N-H groups",
          "Covalent disulphide bridges only",
          "Van der Waals forces alone",
        ],
        correctAnswer: 1,
        explanation: "The regular, repeating secondary structures of proteins (α-helix, β-pleated sheet) are held together mainly by hydrogen bonds between the carbonyl oxygen and amide hydrogen of the polypeptide backbone.",
      },
      {
        question: "Denaturation of a protein typically disrupts its:",
        options: [
          "Primary structure (amino acid sequence)",
          "Secondary and tertiary structure, while usually leaving the primary structure intact",
          "Nothing at all — denaturation has no structural effect",
          "Only its molecular formula",
        ],
        correctAnswer: 1,
        explanation: "Denaturation (by heat, pH change, etc.) disrupts the weaker interactions maintaining secondary and tertiary structure, usually without breaking the covalent peptide bonds that define the primary structure.",
      },
      {
        question: "Enzymes increase the rate of biochemical reactions mainly by:",
        options: [
          "Increasing the temperature of the reaction",
          "Lowering the activation energy via an alternative reaction pathway",
          "Changing the equilibrium constant of the reaction",
          "Adding extra reactant molecules",
        ],
        correctAnswer: 1,
        explanation: "Like other catalysts, enzymes speed up reactions by providing an alternative pathway with lower activation energy, without altering the reaction's overall thermodynamics or equilibrium position.",
      },
      {
        question: "A deficiency of vitamin C causes which disease?",
        options: ["Rickets", "Scurvy", "Beriberi", "Night blindness"],
        correctAnswer: 1,
        explanation: "Vitamin C (ascorbic acid) deficiency causes scurvy, characterised by bleeding gums, joint pain and poor wound healing.",
      },
      {
        question: "In DNA, adenine always pairs specifically with:",
        options: ["Guanine", "Cytosine", "Thymine", "Uracil"],
        correctAnswer: 2,
        explanation: "In DNA's double helix, adenine (A) pairs specifically with thymine (T) via two hydrogen bonds, while guanine (G) pairs with cytosine (C) via three hydrogen bonds.",
      },
      {
        question: "RNA differs from DNA in that RNA contains:",
        options: [
          "Deoxyribose sugar instead of ribose",
          "Uracil instead of thymine, and ribose instead of deoxyribose",
          "No nitrogenous bases at all",
          "No phosphate group",
        ],
        correctAnswer: 1,
        explanation: "RNA contains the sugar ribose (instead of DNA's deoxyribose) and uses the base uracil in place of DNA's thymine.",
      },
      {
        question: "Fat-soluble vitamins (like A, D, E, K), unlike most water-soluble vitamins:",
        options: [
          "Are immediately excreted from the body if in excess",
          "Can be stored in the body's fatty tissue",
          "Are never required in the diet",
          "Cannot cause any deficiency disease",
        ],
        correctAnswer: 1,
        explanation: "Fat-soluble vitamins can be stored in the body's fatty tissues for later use, unlike most water-soluble vitamins (except B₁₂), which are not significantly stored and must be regularly replenished through diet.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define a monosaccharide, with one example.",
        answer: "A monosaccharide is a carbohydrate that cannot be hydrolysed into simpler carbohydrate units, e.g. glucose or fructose.",
      },
      {
        marks: 1,
        question: "What is a peptide bond?",
        answer: "A peptide bond is the amide linkage (-CO-NH-) formed between the -COOH group of one amino acid and the -NH₂ group of another, with the loss of a water molecule, linking amino acids together into a polypeptide chain.",
      },
      {
        marks: 2,
        question: "Distinguish between a reducing sugar and a non-reducing sugar, with one example of each.",
        answer:
          "A **reducing sugar** has a free aldehyde or ketone group (or one that can be exposed by tautomerisation) able to reduce Tollens'/Fehling's reagent, e.g. glucose. A **non-reducing sugar** has no such free reactive group available, since it is tied up in a glycosidic bond, e.g. sucrose (where both anomeric carbons of its component monosaccharides are involved in the glycosidic linkage).",
      },
      {
        marks: 2,
        question: "What is denaturation of a protein? Give one everyday example.",
        answer:
          "Denaturation is the loss of a protein's native (biologically active) secondary and tertiary structure, caused by factors like heat, extreme pH, or certain chemicals, usually without breaking the primary structure (sequence of amino acids); this results in the protein losing its biological function. Example: the coagulation and solidification of egg white when an egg is boiled.",
      },
      {
        marks: 2,
        question: "Name the four nitrogenous bases found in DNA, and state the one that is replaced (and by what) in RNA.",
        answer: "DNA contains adenine, guanine, cytosine and thymine. In RNA, thymine is replaced by uracil.",
      },
      {
        marks: 3,
        question: "Explain the difference between the primary, secondary, and tertiary structure of a protein.",
        answer:
          "The **primary structure** is the specific linear sequence of amino acids in the polypeptide chain, held together by covalent peptide bonds. The **secondary structure** is the regular, local folding pattern of this chain (such as the α-helix or β-pleated sheet), stabilised by hydrogen bonding between the backbone -C=O and -N-H groups. The **tertiary structure** is the overall three-dimensional shape adopted by the entire folded polypeptide chain, arising from further folding of the secondary structure and stabilised by interactions (hydrogen bonds, disulphide bridges, ionic and hydrophobic interactions) between the various amino acid side chains, which is essential for the protein's specific biological function.",
      },
      {
        marks: 3,
        question: "Explain, in terms of glycosidic linkages, why humans can digest starch but not cellulose, even though both are polymers of glucose.",
        answer:
          "Although both starch and cellulose are polymers built entirely of glucose units, they differ in the specific type of glycosidic bond linking those units: starch (specifically its amylose component) is linked by **α-1,4-glycosidic bonds**, while cellulose is linked by **β-1,4-glycosidic bonds**. The human digestive system produces enzymes (like amylase) that can specifically recognise and hydrolyse the α-glycosidic linkage found in starch, but humans lack the enzyme (cellulase) needed to hydrolyse the differently-oriented β-glycosidic linkage found in cellulose — so while starch can be broken down into glucose and absorbed as a food source, cellulose passes through the human digestive system largely undigested (though it still serves a useful role as dietary fibre).",
      },
      {
        marks: 3,
        question: "Briefly describe the roles of mRNA, tRNA, and rRNA in protein synthesis.",
        answer:
          "**mRNA (messenger RNA)** carries the genetic code copied from a specific gene in DNA to the site of protein synthesis (the ribosome), serving as the template that specifies the order in which amino acids should be joined together. **tRNA (transfer RNA)** recognises specific three-base codons on the mRNA and brings the correspondingly correct amino acid to the ribosome to be added to the growing polypeptide chain. **rRNA (ribosomal RNA)** is a key structural and catalytic component of the ribosome itself, the molecular machine where protein synthesis actually takes place.",
      },
      {
        marks: 5,
        question:
          "(a) Explain the base-pairing rule in DNA's double helix, stating the number of hydrogen bonds in each pair. (b) Explain why this specific, complementary base-pairing is essential for DNA's biological role in heredity.",
        answer:
          "(a) In DNA's double helix, the two polynucleotide strands are held together by hydrogen bonding between specific, complementary pairs of nitrogenous bases: **adenine always pairs with thymine (A-T)**, connected by **2 hydrogen bonds**, and **guanine always pairs with cytosine (G-C)**, connected by **3 hydrogen bonds** (making the G-C pair somewhat stronger/more stable than the A-T pair).\n(b) This complementary base-pairing means that the sequence of bases on one strand of DNA completely determines the sequence of bases on the other strand (since A only pairs with T, and G only pairs with C). This has two essential biological consequences: first, it allows DNA to be **accurately replicated** — when the double helix unwinds, each original strand can serve as a template to build a new complementary strand, producing two identical copies of the original double helix, essential for passing genetic information faithfully from one generation of cells (or organisms) to the next; second, it provides a reliable, self-correcting structural mechanism (since a mismatched base pair distorts the helix and can often be detected and repaired) that helps preserve the accuracy and stability of the genetic code over time.",
      },
      {
        marks: 5,
        question:
          "(a) Explain the biuret test for proteins, including what structural feature it detects. (b) Explain, using the concept of an enzyme's active site, why enzymes are highly specific catalysts, unlike many simple inorganic catalysts.",
        answer:
          "(a) The biuret test detects the presence of the **peptide bond** (specifically, requiring at least two peptide bonds in a row). When a sample containing multiple peptide linkages is treated with dilute NaOH and a small amount of dilute copper sulphate solution, the Cu²⁺ ions form a coloured coordination complex with the nitrogen atoms of the peptide backbone in alkaline conditions, producing a characteristic violet/purple colour. Since only proteins and peptides (of a sufficient length) contain multiple peptide bonds in this specific arrangement, a positive biuret test (violet colour) reliably confirms the presence of protein/peptide material in a sample, while substances lacking peptide bonds (like simple sugars) give a negative result.\n(b) An enzyme's biological activity depends on a specific, precisely-shaped region called the **active site**, formed by the enzyme's particular three-dimensional (tertiary) structure. This active site has a shape, size, and arrangement of chemical groups (via its constituent amino acid side chains) that is complementary to one specific substrate (or a closely related family of substrates) — much like a key fitting a specific lock, or, more accurately, like the active site subtly adjusting its shape to better fit the substrate as it binds (the 'induced fit' model). Because this three-dimensional fit is so specific, an enzyme will generally only bind to, and catalyse a reaction with, its intended substrate, and not with other molecules that don't fit the active site properly — this is why enzymes show remarkably high specificity, unlike many simple inorganic catalysts (like platinum or iron), which typically catalyse a broad range of different reactions and substrates without such fine molecular discrimination.",
      },
    ],
  },
];

export const getChapter = (id: string): Chapter | undefined =>
  chapters.find((c) => c.id === id);
