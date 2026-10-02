// ==================================================================
// Class 11 — CBSE / NCERT Chemistry
// Chapter 1: Some Basic Concepts of Chemistry
// Chapter 2: Structure of Atom
// Chapter 4: Chemical Bonding and Molecular Structure
// Chapter 7: Equilibrium
//
// Chapter numbers follow the rationalised NCERT Class 11 Chemistry
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
  color: "cobalt" | "iris" | "moss" | "plum";
  readingTime: string;
  videos: Video[];
  notes: string; // markdown-lite
  experiments: Experiment[];
  objectiveQuestions: ObjectiveQuestion[];
  subjectiveQuestions: SubjectiveQuestion[];
}

export const chapters: Chapter[] = [
  // ================================================================
  // CHAPTER 1 — SOME BASIC CONCEPTS OF CHEMISTRY
  // ================================================================
  {
    id: "some-basic-concepts-of-chemistry",
    number: 1,
    title: "Some Basic Concepts of Chemistry",
    subtitle: "Atoms, moles and the arithmetic that underlies every reaction",
    description:
      "Matter and its classification, atomic and molecular masses, the mole concept and Avogadro's number, percentage composition, empirical and molecular formulae, stoichiometry and limiting reagents.",
    icon: "⚖️",
    color: "cobalt",
    readingTime: "26 min read",
    videos: [
      {
        title: "Some Basic Concepts of Chemistry — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/9NXjeVchtqQ",
      },
      {
        title: "Mole Concept Explained",
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
# Some Basic Concepts of Chemistry

## Importance and Nature of Chemistry

Chemistry is the branch of science that deals with the composition, structure and properties of matter, and the changes it undergoes. It touches almost every area of life — the food we eat, the medicines we take, the fabrics we wear and the fuels we use are all products of chemistry.

## Classification of Matter

Matter can be classified on two levels:

**Physical state:** solid, liquid or gas, based on the closeness of particles and the forces between them.

**Composition:**

| | | |
|---|---|---|
| **Mixtures** | Homogeneous (uniform composition, e.g. sugar solution) | Heterogeneous (non-uniform, e.g. sand and water) |
| **Pure substances** | Elements (cannot be broken into simpler substances, e.g. Na, O₂) | Compounds (two or more elements combined in a fixed ratio, e.g. H₂O, NaCl) |

> [!key] A pure substance has a **fixed composition** throughout; a mixture has a **variable composition** and can be separated into its components by physical methods.

## Properties of Matter and Their Measurement

Properties are either **physical** (colour, odour, melting point, density — measured/observed without changing chemical composition) or **chemical** (characteristic reactions of a substance).

### The International System of Units (SI)
Scientific measurements use SI units built from seven base units:

| Physical quantity | SI unit | Symbol |
|---|---|---|
| Mass | kilogram | kg |
| Length | metre | m |
| Time | second | s |
| Temperature | kelvin | K |
| Amount of substance | mole | mol |
| Electric current | ampere | A |
| Luminous intensity | candela | cd |

**Mass and weight:** mass is the amount of matter in a sample (constant everywhere); weight is the force exerted by gravity on that mass (varies with location).

**Volume** has the unit m³, though litres (L) and millilitres (mL, = cm³) are commonly used in the laboratory. **Density** = mass/volume, SI unit kg m⁻³ (often expressed as g cm⁻³ or g mL⁻¹).

**Temperature scales:** Celsius (°C), Fahrenheit (°F) and Kelvin (K), related by K = °C + 273.15, and °F = (9/5)°C + 32.

### Precision and Accuracy
**Accuracy** is how close a measured value is to the true value. **Precision** refers to how close a series of measurements are to one another, regardless of whether they are close to the true value.

### Significant Figures
The reliable digits in a measurement, plus the first uncertain digit, are its **significant figures**. Rules: all non-zero digits are significant; zeros between two non-zero digits are significant; leading zeros are not significant; trailing zeros after a decimal point are significant.

## Laws of Chemical Combination

1. **Law of Conservation of Mass** (Lavoisier) — mass can neither be created nor destroyed in a chemical reaction.
2. **Law of Definite (Constant) Proportions** (Proust) — a given compound always contains exactly the same proportion of elements by mass, irrespective of the source.
3. **Law of Multiple Proportions** (Dalton) — if two elements combine to form more than one compound, the masses of one element that combine with a fixed mass of the other are in a ratio of small whole numbers.
4. **Gay Lussac's Law of Gaseous Volumes** — when gases combine or are produced in a reaction, they do so in a simple ratio by volume, provided all gases are at the same temperature and pressure.
5. **Avogadro's Law** — equal volumes of all gases, at the same temperature and pressure, contain an equal number of molecules.

> [!key] Dalton's atomic theory explained the first three laws by proposing that matter is made of indivisible atoms, and atoms of a given element are identical in mass and properties.

## Atomic and Molecular Masses

**Atomic mass** is expressed in **atomic mass units (u)**, defined so that one atom of the carbon-12 isotope has a mass of exactly 12 u. 1 u = 1/12th the mass of a ¹²C atom = 1.66056 × 10⁻²⁴ g.

**Average atomic mass** accounts for the natural abundance of different isotopes of an element, e.g. carbon has an average atomic mass of 12.011 u due to small amounts of ¹³C and ¹⁴C alongside ¹²C.

**Molecular mass** is the sum of the atomic masses of all atoms in a molecule, e.g. the molecular mass of water (H₂O) = 2(1.008) + 16.00 = 18.02 u.

**Formula mass** is used for ionic compounds, which do not exist as discrete molecules, e.g. the formula mass of NaCl = 23.0 + 35.5 = 58.5 u.

::diagram:mass-spectrometer

## Mole Concept and Molar Masses

Since atoms and molecules are extremely small, chemists count them in bulk using a unit called the **mole**.

> [!key] One **mole** is the amount of a substance that contains as many elementary entities (atoms, molecules, ions) as there are atoms in exactly 12 g of the ¹²C isotope. This number is called the **Avogadro constant**, Nₐ = 6.022 × 10²³ mol⁻¹.

The **molar mass** of a substance is the mass of one mole of it, expressed in g mol⁻¹, and is numerically equal to the atomic/molecular/formula mass in u.
- Molar mass of water = 18.02 g mol⁻¹
- Molar mass of sodium chloride = 58.5 g mol⁻¹

**Number of moles**, n = given mass (m) ÷ molar mass (M) = number of particles ÷ Nₐ.

At **standard temperature and pressure (STP: 273.15 K, 1 bar)**, one mole of any gas occupies **22.7 L** (the value 22.4 L applies at the older STP of 1 atm).

## Percentage Composition

The percentage by mass of each element in a compound:

% of element = (mass of that element in 1 mole of the compound ÷ molar mass of the compound) × 100

**Example:** Percentage composition of water (H₂O), molar mass 18.02 g mol⁻¹:
- %H = (2 × 1.008 / 18.02) × 100 = 11.18%
- %O = (16.00 / 18.02) × 100 = 88.79%

## Empirical and Molecular Formulae

- **Empirical formula** shows the **simplest whole-number ratio** of atoms of each element in a compound.
- **Molecular formula** shows the **actual number** of atoms of each element in one molecule of the compound.

> [!note] Molecular formula = n × empirical formula, where n = molecular mass ÷ empirical formula mass (n is a positive integer).

**Steps to determine the empirical formula from percentage composition:**
1. Divide the percentage of each element by its atomic mass to get mole ratios.
2. Divide each mole value by the smallest one to get the simplest ratio.
3. If needed, multiply through by the smallest whole number that makes all values integers.

## Stoichiometry and Stoichiometric Calculations

**Stoichiometry** is the calculation of the quantities of reactants and products involved in a chemical reaction, based on the balanced chemical equation.

**Example:** For 2H₂(g) + O₂(g) → 2H₂O(l): 2 moles of H₂ react with 1 mole of O₂ to give 2 moles of H₂O — this mole ratio (2:1:2) is used to scale calculations up or down.

### Limiting Reagent
In a reaction, the reactant that is **completely consumed first** limits the amount of product that can be formed, and is called the **limiting reagent**; the reactant left over is called the **excess reagent**.

> [!example] If 5 mol H₂ reacts with 2 mol O₂ (2H₂ + O₂ → 2H₂O), only 4 mol H₂ is needed for 2 mol O₂ — so O₂ is the limiting reagent, and 1 mol H₂ is left unreacted.

### Reactions in Solutions — Concentration Terms
1. **Mass percent** = (mass of solute / mass of solution) × 100
2. **Mole fraction** (x) = moles of the component / total moles of all components
3. **Molarity (M)** = moles of solute / volume of solution in litres (mol L⁻¹); the most commonly used concentration term, though it varies slightly with temperature because volume changes with temperature.
4. **Molality (m)** = moles of solute / mass of solvent in kilograms (mol kg⁻¹); independent of temperature, since it is defined using mass.

M = n(solute) ÷ V(solution, in L)        m = n(solute) ÷ w(solvent, in kg)
    `,
    experiments: [
      {
        id: "conservation-of-mass",
        title: "Verifying the Law of Conservation of Mass",
        aim: "To show that the total mass of reactants equals the total mass of products in a chemical reaction.",
        materials: [
          "A stoppered conical flask or a sealed glass tube",
          "Lead nitrate solution and potassium iodide solution (in separate small tubes inside the flask)",
          "A sensitive balance",
        ],
        procedure: [
          "Take dilute lead nitrate solution in a small tube and potassium iodide solution in another small tube; place both, unmixed, inside a larger stoppered flask.",
          "Weigh the sealed, closed system carefully on a sensitive balance.",
          "Tilt the flask to mix the two solutions, allowing the reaction to occur inside the sealed flask, then weigh again without opening it.",
        ],
        observation:
          "A yellow precipitate of lead iodide forms on mixing, but the total mass of the sealed flask before and after the reaction remains exactly the same.",
        reaction: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
        conclusion:
          "Since the system was sealed (no matter could enter or leave), the unchanged mass confirms the Law of Conservation of Mass — mass is neither created nor destroyed in a chemical reaction.",
        visual: {
          before: "hsl(40 30% 96%)",
          after: "hsl(40 30% 96%)",
          precipitate: { name: "Lead iodide", colour: "hsl(48 95% 55%)" },
          labels: { before: "Sealed flask, reactants unmixed", after: "Mixed — same total mass" },
        },
      },
      {
        id: "empirical-formula-mgo",
        title: "Determining the Empirical Formula of Magnesium Oxide",
        aim: "To calculate the empirical formula of magnesium oxide from the masses of magnesium and oxygen that combine.",
        materials: ["A cleaned magnesium ribbon", "A crucible with lid and pipe-clay triangle", "A sensitive balance", "A burner"],
        procedure: [
          "Weigh a clean, empty crucible with its lid.",
          "Coil a known mass of cleaned magnesium ribbon into the crucible and weigh again.",
          "Heat the crucible strongly, lifting the lid briefly at intervals to let air in, until the magnesium is fully converted to a white ash and the mass becomes constant.",
          "Cool and weigh the crucible with the white product.",
        ],
        observation:
          "The mass of the crucible increases after heating, because the magnesium has combined with oxygen from the air to form a white powder (magnesium oxide).",
        reaction: "2Mg(s) + O₂(g) →[Δ] 2MgO(s)",
        conclusion:
          "From the mass of magnesium taken and the mass of oxygen gained (mass of oxide − mass of magnesium), the mole ratio of Mg : O works out close to 1 : 1, giving the empirical formula MgO.",
        safety: "Never look directly at burning magnesium — the bright white light can damage the eyes.",
        visual: {
          before: "hsl(40 30% 96%)",
          solid: { name: "Magnesium ribbon", colourBefore: "hsl(210 8% 78%)", colourAfter: "hsl(0 0% 99%)" },
          thermal: "exothermic",
          labels: { before: "Weighed magnesium ribbon", after: "White MgO ash — reweighed" },
        },
      },
      {
        id: "molarity-preparation",
        title: "Preparing a Standard Molar Solution",
        aim: "To prepare 250 mL of a 0.1 M solution of sodium carbonate and understand the meaning of molarity.",
        materials: ["Anhydrous sodium carbonate", "A 250 mL volumetric flask", "Distilled water", "A funnel and wash bottle", "A weighing balance"],
        procedure: [
          "Calculate the mass of Na₂CO₃ required: moles needed = 0.1 mol L⁻¹ × 0.250 L = 0.025 mol; mass = 0.025 × 106 g mol⁻¹ = 2.65 g.",
          "Weigh out 2.65 g of anhydrous sodium carbonate accurately.",
          "Dissolve it in a small amount of distilled water in a beaker, then transfer to a 250 mL volumetric flask via a funnel, rinsing the beaker.",
          "Add distilled water up to the calibration mark, stopper and invert several times to mix thoroughly.",
        ],
        observation: "A clear, colourless solution is obtained with the exact volume marked on the flask.",
        conclusion:
          "The molarity of a solution can be precisely controlled by calculating the required mass of solute from the desired molarity, molar mass and volume, then making up to the exact volume with solvent.",
        visual: {
          before: "hsl(40 15% 96%)",
          labels: { before: "Na₂CO₃ dissolved, being made up", after: "Exactly 250 mL of 0.1 M solution" },
        },
      },
      {
        id: "limiting-reagent-demo",
        title: "Demonstrating the Limiting Reagent",
        aim: "To show experimentally that the amount of product formed depends on the limiting reactant.",
        materials: ["Dilute hydrochloric acid (measured volume)", "Marble chips (calcium carbonate, measured mass)", "A conical flask fitted with a delivery tube", "A balance"],
        procedure: [
          "Take a deliberately small, measured volume of dilute HCl and an excess (large, weighed) amount of marble chips in a flask.",
          "Let the reaction go to completion (bubbling stops) and note that unreacted marble chips remain.",
          "Repeat with excess HCl and a small, weighed amount of marble chips; note that all the marble dissolves while acid remains.",
        ],
        observation:
          "In the first case, effervescence stops while solid marble chips are still visible — the acid has run out first. In the second case, all the marble dissolves while acid is still present.",
        reaction: "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)↑",
        conclusion:
          "The reactant that is used up first (the limiting reagent) determines how much product (CO₂ gas) is formed, regardless of how much of the other (excess) reactant is present.",
        visual: {
          before: "hsl(40 30% 96%)",
          after: "hsl(40 30% 96%)",
          gas: "Carbon dioxide",
          labels: { before: "Marble chips + limited acid", after: "Bubbling stops; chips remain" },
        },
      },
      {
        id: "significant-figures-measurement",
        title: "Reading Instruments to the Correct Number of Significant Figures",
        aim: "To practise recording laboratory measurements with the correct precision and significant figures.",
        materials: ["A burette", "A graduated (measuring) cylinder", "A digital weighing balance", "Water"],
        procedure: [
          "Measure the same volume of water using a burette (readable to 0.1 mL) and a beaker (readable only to the nearest 10 mL); record both readings.",
          "Weigh a small object first on a triple-beam balance and then on a digital balance reading to 0.001 g; record both readings.",
          "Compare how many significant figures each instrument allows, and note the uncertainty in the last digit.",
        ],
        observation:
          "The burette and digital balance give more significant figures (e.g. 24.6 mL, 12.482 g) than the beaker and triple-beam balance (e.g. 20 mL, 12.5 g); more precise instruments justify more significant figures.",
        conclusion:
          "The number of significant figures recorded for a measurement should reflect the precision of the instrument used — reporting more digits than an instrument can reliably give is misleading.",
        visual: {
          before: "hsl(200 40% 92%)",
          labels: { before: "Reading a burette meniscus", after: "Recorded to the correct precision" },
        },
      },
      {
        id: "percentage-composition-crystal",
        title: "Finding the Percentage of Water of Crystallisation in Copper Sulphate",
        aim: "To determine the percentage by mass of water of crystallisation in hydrated copper sulphate (CuSO₄·5H₂O) by heating.",
        materials: ["Hydrated copper sulphate crystals (blue)", "A crucible", "A weighing balance", "A burner and tongs"],
        procedure: [
          "Weigh a clean, dry crucible.",
          "Add a known mass of blue hydrated copper sulphate crystals and weigh again.",
          "Heat gently and then strongly until the blue crystals turn to a white/grey anhydrous powder and the mass stops changing; cool in a desiccator and reweigh.",
        ],
        observation:
          "The blue crystals turn white (anhydrous CuSO₄) as the water of crystallisation is driven off as steam, and the mass of the solid decreases.",
        reaction: "CuSO₄·5H₂O(s) →[Δ] CuSO₄(s) + 5H₂O(g)↑",
        conclusion:
          "The mass lost on heating corresponds to the water of crystallisation. Dividing this mass loss by the original mass of hydrated salt and multiplying by 100 gives the experimental percentage of water, which can be compared with the theoretical value calculated from the formula (5 × 18 / 250 × 100 ≈ 36%).",
        visual: {
          before: "hsl(210 55% 60%)",
          after: "hsl(0 0% 92%)",
          gas: "Water vapour",
          thermal: "endothermic",
          labels: { before: "Blue CuSO₄·5H₂O crystals", after: "White anhydrous CuSO₄ powder" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "One mole of any substance contains how many elementary particles?",
        options: ["6.022 × 10²²", "6.022 × 10²³", "3.011 × 10²³", "1.66 × 10⁻²⁴"],
        correctAnswer: 1,
        explanation: "Avogadro's constant, Nₐ = 6.022 × 10²³ mol⁻¹, is the number of particles in one mole of any substance.",
      },
      {
        question: "The law that states 'a compound always contains the same elements in the same proportion by mass' is:",
        options: [
          "Law of Conservation of Mass",
          "Law of Definite Proportions",
          "Law of Multiple Proportions",
          "Avogadro's Law",
        ],
        correctAnswer: 1,
        explanation: "The Law of Definite (Constant) Proportions, given by Proust, states that a given compound always has a fixed composition by mass.",
      },
      {
        question: "The molar mass of water (H₂O) is approximately:",
        options: ["16 g mol⁻¹", "17 g mol⁻¹", "18 g mol⁻¹", "20 g mol⁻¹"],
        correctAnswer: 2,
        explanation: "Molar mass of H₂O = 2(1.008) + 16.00 ≈ 18.02 g mol⁻¹.",
      },
      {
        question: "Molarity of a solution is defined as:",
        options: [
          "Moles of solute per kg of solvent",
          "Moles of solute per litre of solution",
          "Grams of solute per litre of solvent",
          "Moles of solute per mole of solvent",
        ],
        correctAnswer: 1,
        explanation: "Molarity (M) = moles of solute ÷ volume of solution in litres (mol L⁻¹).",
      },
      {
        question: "In the reaction N₂ + 3H₂ → 2NH₃, if 2 mol N₂ reacts with 3 mol H₂, the limiting reagent is:",
        options: ["N₂", "H₂", "Both are used up exactly", "NH₃"],
        correctAnswer: 1,
        explanation: "2 mol N₂ would need 6 mol H₂, but only 3 mol H₂ is available, so H₂ runs out first and is the limiting reagent.",
      },
      {
        question: "Which of the following is NOT an SI base unit?",
        options: ["kilogram", "kelvin", "litre", "mole"],
        correctAnswer: 2,
        explanation: "The litre is a derived (non-SI) unit of volume; the SI base unit for volume-related quantities comes from the metre (m³). Kilogram, kelvin and mole are all SI base units.",
      },
      {
        question: "The empirical formula of a compound with molecular formula C₆H₁₂O₆ is:",
        options: ["C₆H₁₂O₆", "CH₂O", "C₃H₆O₃", "C₂H₄O₂"],
        correctAnswer: 1,
        explanation: "Dividing all subscripts by their common factor 6 gives the simplest ratio C:H:O = 1:2:1, i.e. CH₂O.",
      },
      {
        question: "Which concentration term does NOT change with temperature?",
        options: ["Molarity", "Molality", "Normality", "None of these"],
        correctAnswer: 1,
        explanation: "Molality is defined using the mass of solvent (which doesn't change with temperature), unlike molarity and normality, which use volume (which expands/contracts with temperature).",
      },
      {
        question: "1 u (unified atomic mass unit) is defined as:",
        options: [
          "The mass of one hydrogen atom",
          "1/12th the mass of one ¹²C atom",
          "The mass of one mole of atoms",
          "1/16th the mass of one oxygen atom",
        ],
        correctAnswer: 1,
        explanation: "By international agreement, 1 u = 1/12th of the mass of one atom of the carbon-12 isotope.",
      },
      {
        question: "At STP (273.15 K, 1 bar), one mole of any ideal gas occupies:",
        options: ["11.35 L", "22.7 L", "24.0 L", "44.8 L"],
        correctAnswer: 1,
        explanation: "The molar volume of an ideal gas at the current IUPAC STP (1 bar, 273.15 K) is 22.7 L; the older value of 22.4 L applies at 1 atm.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define a mole.",
        answer:
          "A mole is the amount of a substance that contains as many elementary entities (atoms, molecules or ions) as there are atoms in exactly 12 g of the carbon-12 isotope — this number is Avogadro's constant, 6.022 × 10²³.",
      },
      {
        marks: 1,
        question: "Distinguish between molarity and molality in one line.",
        answer: "Molarity is moles of solute per litre of solution; molality is moles of solute per kilogram of solvent (and does not vary with temperature).",
      },
      {
        marks: 2,
        question: "State the Law of Conservation of Mass and explain why a chemical equation must be balanced.",
        answer:
          "The Law of Conservation of Mass states that mass can neither be created nor destroyed in a chemical reaction — the total mass of reactants equals the total mass of products. A chemical equation must therefore be balanced so that the number of atoms of each element is the same on both sides, in agreement with this law.",
      },
      {
        marks: 2,
        question: "Differentiate between empirical formula and molecular formula, with one example.",
        answer:
          "The empirical formula gives the simplest whole-number ratio of atoms of each element in a compound, while the molecular formula gives the actual number of atoms of each element in one molecule. Example: glucose has the molecular formula C₆H₁₂O₆ but the empirical formula CH₂O.",
      },
      {
        marks: 2,
        question: "Calculate the number of moles in 4.4 g of CO₂ (molar mass 44 g mol⁻¹).",
        answer: "Number of moles = mass ÷ molar mass = 4.4 g ÷ 44 g mol⁻¹ = 0.1 mol.",
      },
      {
        marks: 3,
        question: "What is a limiting reagent? Explain with an example how it determines the amount of product formed.",
        answer:
          "The limiting reagent is the reactant that is completely consumed first in a reaction, thereby limiting the amount of product formed; any other reactant left over is called the excess reagent. For example, in 2H₂ + O₂ → 2H₂O, if 5 mol H₂ is reacted with 2 mol O₂, only 4 mol H₂ is required to react completely with 2 mol O₂ — so O₂ is the limiting reagent, and the amount of water formed (4 mol) is calculated from O₂, not H₂ (of which 1 mol remains unreacted).",
      },
      {
        marks: 3,
        question: "State the Law of Multiple Proportions and illustrate it using the oxides of nitrogen (NO and NO₂).",
        answer:
          "The Law of Multiple Proportions states that when two elements combine to form more than one compound, the masses of one element that combine with a fixed mass of the other element are in a ratio of small whole numbers. For a fixed mass of nitrogen (say 14 g), NO contains 16 g of oxygen while NO₂ contains 32 g of oxygen — the oxygen masses are in the simple ratio 16:32 = 1:2.",
      },
      {
        marks: 3,
        question: "Distinguish between accuracy and precision with an example.",
        answer:
          "Accuracy is how close a measured value is to the true (accepted) value, while precision is how close repeated measurements are to one another, regardless of whether they are close to the true value. Example: if the true mass of an object is 10.00 g and repeated weighings give 9.98, 9.99, 10.00 g, the measurements are both accurate and precise; if they give 8.01, 8.02, 8.00 g, they are precise (consistent) but not accurate.",
      },
      {
        marks: 5,
        question:
          "A compound contains 40% carbon, 6.7% hydrogen and 53.3% oxygen by mass. Its molar mass is 180 g mol⁻¹. Calculate its empirical and molecular formulae.",
        answer:
          "Moles: C = 40/12 = 3.33; H = 6.7/1 = 6.7; O = 53.3/16 = 3.33.\nDividing by the smallest (3.33): C = 1, H = 2, O = 1 → empirical formula **CH₂O** (empirical formula mass = 12 + 2 + 16 = 30 g mol⁻¹).\nn = molar mass ÷ empirical formula mass = 180/30 = 6.\nMolecular formula = (CH₂O)₆ = **C₆H₁₂O₆** (glucose).",
      },
      {
        marks: 5,
        question:
          "(a) Define molarity and molality. (b) 5.85 g of NaCl (molar mass 58.5 g mol⁻¹) is dissolved in water to make 500 mL of solution. Calculate the molarity.",
        answer:
          "(a) **Molarity** is the number of moles of solute dissolved per litre of solution (mol L⁻¹). **Molality** is the number of moles of solute dissolved per kilogram of solvent (mol kg⁻¹).\n(b) Moles of NaCl = 5.85/58.5 = 0.1 mol. Volume of solution = 500 mL = 0.5 L.\nMolarity = 0.1 mol ÷ 0.5 L = **0.2 mol L⁻¹ (0.2 M)**.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 2 — STRUCTURE OF ATOM
  // ================================================================
  {
    id: "structure-of-atom",
    number: 2,
    title: "Structure of Atom",
    subtitle: "From Thomson's pudding to Bohr's orbits to the quantum-mechanical atom",
    description:
      "The discovery of sub-atomic particles, atomic models from Thomson to Bohr, dual nature of matter, the quantum-mechanical model, quantum numbers, shapes of orbitals, and the Aufbau, Pauli and Hund's rules for filling electrons.",
    icon: "⚛️",
    color: "iris",
    readingTime: "29 min read",
    videos: [
      {
        title: "Structure of Atom — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/2xt06e8jV6c",
      },
      {
        title: "Quantum Numbers and Orbitals Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/QT2t-nzYT0M",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/f3wjZBW5-6Y",
      },
    ],
    notes: `
# Structure of Atom

## Discovery of the Electron, Proton and Neutron

### Discovery of the Electron
William Crookes and others studied the passage of electricity through gases at low pressure in a **discharge tube**, producing **cathode rays** — streams of negatively charged particles emitted from the cathode. J. J. Thomson showed these particles (electrons) are present in all atoms, and are identical regardless of the gas used or the electrode material, meaning they are a **universal constituent of matter**.
- Charge on the electron, e = −1.602 × 10⁻¹⁹ C
- Mass of the electron, mₑ = 9.109 × 10⁻³¹ kg (about 1/1837th the mass of a hydrogen atom)

### Discovery of the Proton
Eugen Goldstein discovered **canal rays** (positively charged particles) travelling in the direction opposite to cathode rays, when using a perforated cathode. The lightest of these particles, obtained using hydrogen gas, was named the **proton**.
- Charge on the proton = +1.602 × 10⁻¹⁹ C ; mass ≈ 1.673 × 10⁻²⁷ kg (about 1837 times the mass of an electron)

### Discovery of the Neutron
James Chadwick discovered a neutral particle with a mass slightly greater than that of the proton, by bombarding beryllium with alpha particles. This particle, the **neutron**, has no charge.
- Mass of the neutron ≈ 1.675 × 10⁻²⁷ kg

## Early Atomic Models

::diagram:atomic-models

### Thomson's Model ("Plum Pudding" Model)
An atom is a sphere of uniform positive charge, with electrons embedded in it like plums in a pudding — the positive and negative charges are equal, making the atom electrically neutral overall.

### Rutherford's Nuclear Model
Rutherford directed a beam of **alpha particles** at a thin gold foil (the **gold foil / α-ray scattering experiment**).

**Observations:**
1. Most of the alpha particles passed straight through the foil undeflected.
2. A small fraction were deflected by small angles.
3. A very few (about 1 in 20,000) bounced back almost 180°.

**Conclusions:**
1. Most of the space inside the atom is **empty**, since most particles passed through undeflected.
2. A small, dense, positively charged centre — the **nucleus** — deflects a few particles; almost the entire mass of the atom is concentrated here.
3. The nucleus is surrounded by **electrons** revolving around it in circular paths called **orbits**, at very high speed, held by electrostatic attraction, much like planets orbit the Sun.

**Limitation:** an electron moving in a circular orbit is continuously accelerating, and according to classical electromagnetic theory, an accelerating charged particle should continuously emit radiation, lose energy, and spiral into the nucleus — this would make atoms unstable, which contradicts reality.

::diagram:rutherford-experiment

## Atomic Number, Mass Number and Isotopes

- **Atomic number (Z)** = number of protons in the nucleus (also equals number of electrons in a neutral atom).
- **Mass number (A)** = number of protons + number of neutrons.
- **Isotopes** — atoms of the same element (same Z) with different mass numbers (different number of neutrons), e.g. ¹H, ²H (deuterium), ³H (tritium).
- **Isobars** — atoms of different elements with the same mass number but different atomic numbers, e.g. ⁴⁰Ar and ⁴⁰Ca.

::diagram:atom-structure

::diagram:hydrogen-isotopes

## Bohr's Model of the Atom

Niels Bohr proposed a model that overcame the drawback of Rutherford's model, based on the quantum theory of radiation:

1. Electrons revolve around the nucleus in certain **fixed circular paths of definite energy**, called **stationary states** or **orbits** (numbered n = 1, 2, 3 ...).
2. The energy of an electron in an orbit does not change with time — as long as an electron remains in a given orbit, it does not radiate energy.
3. An electron can move from a lower-energy orbit to a higher-energy orbit by **absorbing** a definite amount of energy, and it emits a definite amount of energy (as a photon) when it falls from a higher to a lower orbit. ΔE = E₂ − E₁ = hν.
4. The angular momentum of an electron in an orbit is **quantised**: mvr = nh/2π, where n = 1, 2, 3 ...

Bohr's model successfully explained the **line spectrum of the hydrogen atom**, where each line corresponds to an electron transitioning between two specific orbits.

**Limitations of Bohr's model:** it could not explain the spectra of multi-electron atoms, the splitting of spectral lines in a magnetic field (Zeeman effect) or electric field (Stark effect), and it did not account for the wave nature of the electron.

::diagram:bohr-model

## Dual Nature of Matter and Light

Louis de Broglie proposed that, like light, all matter has a **dual character** — it behaves as both a particle and a wave. The wavelength associated with a particle is given by the **de Broglie relation**:

λ = h ÷ mv

where h is Planck's constant, m is the mass and v is the velocity of the particle. This is significant only for very small particles like electrons; for macroscopic objects the wavelength is negligibly small.

## Heisenberg's Uncertainty Principle

It is **impossible to determine simultaneously and precisely both the position and the momentum (or velocity) of a microscopic particle** like an electron.

Δx · Δp ≥ h ÷ 4π

This principle rules out the concept of well-defined circular orbits used in Bohr's model, and led to the idea of **probability** — where an electron is most likely to be found — rather than a fixed path.

## Quantum-Mechanical Model of the Atom

Based on the wave nature of the electron, Schrödinger developed an equation whose solutions (called **wave functions, ψ**) describe an electron in an atom. |ψ|² gives the **probability density** of finding the electron at a point — this leads to the concept of an **orbital**.

> [!key] An **orbital** is the three-dimensional region of space around the nucleus where the probability of finding an electron is maximum (typically taken as 90–95%). It is different from an "orbit," which is a fixed, well-defined circular path.

## Quantum Numbers

Four quantum numbers together specify the complete address of an electron in an atom:

| Quantum number | Symbol | What it describes | Allowed values |
|---|---|---|---|
| Principal | n | Size and energy of the shell | 1, 2, 3, ... |
| Azimuthal (orbital angular momentum) | l | Shape of the sub-shell | 0 to (n − 1) |
| Magnetic | mₗ | Orientation of the orbital in space | −l to +l (including 0) |
| Spin | mₛ | Spin direction of the electron | +½ or −½ |

**Sub-shells:** l = 0 (s), l = 1 (p), l = 2 (d), l = 3 (f).

## Shapes of Atomic Orbitals

- **s-orbitals** are spherically symmetric, with size increasing as n increases (1s < 2s < 3s ...).
- **p-orbitals** have a dumb-bell shape, with two lobes on either side of the nucleus; there are 3 p-orbitals per shell (pₓ, p_y, p_z), oriented along the three axes.
- **d-orbitals** have more complex, generally cloverleaf shapes; there are 5 d-orbitals per shell.

::diagram:orbital-shapes

## Rules for Filling Electrons in Orbitals

### Aufbau Principle
In the ground state, orbitals are filled in **order of increasing energy** — lower-energy orbitals are filled before higher-energy ones. The order (from the (n + l) rule) is:
1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s ...

### Pauli Exclusion Principle
No two electrons in an atom can have the **same set of all four quantum numbers**. An orbital can therefore hold a **maximum of 2 electrons**, and they must have opposite spins.

### Hund's Rule of Maximum Multiplicity
Electrons are **not paired in orbitals of the same sub-shell until each orbital of that sub-shell has one electron each** (with parallel spins). Pairing begins only after each degenerate orbital is singly occupied.

> [!example] Nitrogen (Z = 7): 1s² 2s² 2p³, with the three 2p electrons occupying pₓ, p_y and p_z singly (parallel spins), rather than pairing up in one orbital.

## Electronic Configuration

The distribution of electrons among the orbitals of an atom, written as e.g. Na (Z = 11): 1s² 2s² 2p⁶ 3s¹, or in shorthand [Ne] 3s¹.

**Stability of completely filled and half-filled sub-shells:** configurations with fully filled (like p⁶, d¹⁰) or exactly half-filled (like p³, d⁵) sub-shells are especially stable, due to greater symmetry and exchange energy. This explains why chromium (Z = 24) has the configuration [Ar] 3d⁵ 4s¹ (not 3d⁴ 4s²) and copper (Z = 29) has [Ar] 3d¹⁰ 4s¹ (not 3d⁹ 4s²).
    `,
    experiments: [
      {
        id: "flame-test",
        title: "Flame Test for Metal Ions",
        aim: "To identify metal ions by the characteristic colour they impart to a non-luminous flame, and relate it to electron transitions.",
        materials: ["Nichrome/platinum wire", "Concentrated HCl", "Salts of Na, K, Ca, Cu, Sr (e.g. chlorides)", "A Bunsen burner"],
        procedure: [
          "Clean a nichrome wire loop by dipping it in concentrated HCl and heating it in the flame until it imparts no colour.",
          "Dip the clean wire into a sample salt, then hold it in the outer (hottest, non-luminous) part of the flame.",
          "Note the flame colour, clean the wire, and repeat for each salt.",
        ],
        observation:
          "Sodium salts give a persistent golden-yellow flame; potassium gives lilac; calcium gives brick-red; copper gives blue-green; strontium gives crimson-red.",
        conclusion:
          "Heat energy excites outer electrons of the metal ion to a higher energy level; as they fall back to the ground state, they emit energy as visible light of a characteristic wavelength/colour — direct evidence for quantised, fixed energy levels in an atom, as proposed by Bohr.",
        safety: "Keep flammable materials away from the flame and handle the hot wire loop with care.",
        visual: {
          before: "hsl(30 10% 20%)",
          after: "hsl(48 90% 55%)",
          flame: true,
          labels: { before: "Clean wire in flame", after: "Golden-yellow flame — sodium" },
        },
      },
      {
        id: "cathode-ray-demo",
        title: "Observing Cathode Rays in a Discharge Tube",
        aim: "To observe the behaviour of cathode rays and relate it to the discovery of the electron (conceptual/demonstration).",
        materials: ["A discharge tube with a vacuum pump", "A high-voltage induction coil", "A fluorescent screen", "Magnets (optional, for deflection)"],
        procedure: [
          "Evacuate a glass discharge tube to a low pressure and apply a high voltage across the electrodes.",
          "Observe the greenish glow produced on the fluorescent screen opposite the cathode.",
          "Bring a magnet near the tube and observe the deflection of the glowing ray.",
        ],
        observation:
          "A stream of rays travels from the cathode to the anode in a straight line (casting a sharp shadow of an object placed in its path) and is deflected towards the positive plate of an electric field / a particular pole of a magnet, showing the rays are negatively charged.",
        conclusion:
          "Cathode rays consist of negatively charged particles (electrons) that are a universal constituent of matter, since the same rays are produced regardless of the gas in the tube or the material of the electrodes — this was J. J. Thomson's key discovery.",
        visual: {
          before: "hsl(260 40% 15%)",
          after: "hsl(140 70% 55%)",
          labels: { before: "Evacuated discharge tube, no current", after: "Greenish glow from cathode rays" },
        },
      },
      {
        id: "hydrogen-emission-spectrum",
        title: "Observing the Hydrogen Emission Spectrum",
        aim: "To observe the line spectrum produced by excited hydrogen gas and relate the lines to electron transitions between Bohr orbits.",
        materials: ["A hydrogen discharge tube", "A high-voltage power supply", "A direct-vision spectroscope or diffraction grating"],
        procedure: [
          "Pass an electric discharge through hydrogen gas at low pressure in a discharge tube, exciting the hydrogen atoms.",
          "View the emitted light through a spectroscope or diffraction grating.",
          "Note the pattern of bright, coloured lines against a dark background.",
        ],
        observation:
          "A series of discrete, sharp coloured lines (not a continuous rainbow) is seen — a set of lines in the visible region is known as the Balmer series.",
        conclusion:
          "Because only specific lines (specific wavelengths/energies) are observed rather than a continuous spectrum, electrons must jump between fixed, quantised energy levels (orbits) as Bohr proposed — each line corresponds to a particular electron transition.",
        visual: {
          before: "hsl(260 30% 12%)",
          after: "hsl(320 70% 55%)",
          flame: true,
          labels: { before: "Hydrogen gas, discharge off", after: "Discrete emission lines through spectroscope" },
        },
      },
      {
        id: "orbital-shape-models",
        title: "Building Models of s and p Orbital Shapes",
        aim: "To construct and compare physical models of s and p atomic orbitals to understand their shapes and orientation.",
        materials: ["Clay or foam balls (for s-orbitals)", "Balloon/dumb-bell shaped foam pieces (for p-orbitals)", "Wire axes (x, y, z)", "Labels"],
        procedure: [
          "Build a sphere to represent the shape of a 1s orbital, centred on a point representing the nucleus.",
          "Build three dumb-bell shaped models, and mount them along the x, y and z axes respectively to represent pₓ, p_y and p_z orbitals.",
          "Compare the relative sizes of a 1s and a 2s sphere.",
        ],
        observation:
          "The s-orbital model is a single sphere with the nucleus at the centre, while the three p-orbital models are dumb-bell shaped, each oriented along one axis, meeting at the nucleus with zero probability of finding the electron exactly at that centre point (a nodal point).",
        conclusion:
          "s-orbitals are spherically symmetric (no directional preference), while the three p-orbitals of a given shell are equivalent in shape and energy but point in three mutually perpendicular directions — this shape and orientation determines the geometry of bonds these orbitals participate in.",
        visual: {
          before: "hsl(210 15% 90%)",
          labels: { before: "Building the 1s sphere", after: "pₓ, p_y, p_z dumb-bells along the axes" },
        },
      },
      {
        id: "electron-configuration-building",
        title: "Building Up Electronic Configurations (Aufbau Practice)",
        aim: "To practise writing the ground-state electronic configuration of elements using the Aufbau, Pauli and Hund's rules.",
        materials: ["Orbital energy-level chart (the (n+l) filling order)", "Orbital diagram boxes for s, p, d sub-shells", "Periodic table"],
        procedure: [
          "For a given element (e.g. Fe, Z = 26), determine the total number of electrons to place.",
          "Fill orbitals in the Aufbau order (1s, 2s, 2p, 3s, 3p, 4s, 3d ...), placing no more than 2 electrons (opposite spins, Pauli) in a single orbital box.",
          "When reaching a sub-shell with more than one orbital (p, d), fill each orbital singly with parallel spins first (Hund's rule) before pairing any electrons.",
        ],
        observation:
          "For iron (Z = 26): 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ — the five 3d orbitals are first filled singly (5 electrons, Hund's rule) and the sixth electron then pairs up in one of them.",
        conclusion:
          "Following the Aufbau, Pauli exclusion, and Hund's rules together and in order always gives the correct, lowest-energy (ground state) electronic configuration of an atom.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Empty orbital boxes", after: "Filled configuration: 1s²2s²2p⁶3s²3p⁶4s²3d⁶" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Cathode rays were shown by J. J. Thomson to consist of particles that are:",
        options: ["Positively charged and heavy", "Negatively charged and a universal constituent of matter", "Neutral", "Only present in hydrogen gas"],
        correctAnswer: 1,
        explanation: "Thomson found cathode rays consist of negatively charged particles (electrons), identical regardless of the gas or electrode material used — a universal constituent of matter.",
      },
      {
        question: "In Rutherford's alpha-scattering experiment, the fact that most alpha particles passed straight through the gold foil showed that:",
        options: [
          "The atom is a solid sphere",
          "Most of the space in an atom is empty",
          "The nucleus is very large",
          "Electrons are heavier than the nucleus",
        ],
        correctAnswer: 1,
        explanation: "Since most alpha particles passed through undeflected, most of the volume of an atom must be empty space.",
      },
      {
        question: "The main drawback of Bohr's model of the atom was that it:",
        options: [
          "Could not explain the spectrum of hydrogen",
          "Could not explain the spectra of multi-electron atoms",
          "Assumed the nucleus is positively charged",
          "Did not include the proton",
        ],
        correctAnswer: 1,
        explanation: "Bohr's model explained the hydrogen spectrum well but failed to explain the spectra of atoms with more than one electron, among other limitations.",
      },
      {
        question: "The de Broglie wavelength associated with a moving particle is given by:",
        options: ["λ = h/mv", "λ = mv/h", "λ = hν", "λ = h/4π"],
        correctAnswer: 0,
        explanation: "De Broglie's relation is λ = h/mv, relating the wavelength to Planck's constant, mass and velocity.",
      },
      {
        question: "According to Heisenberg's Uncertainty Principle:",
        options: [
          "The energy of an electron can never be known",
          "Position and momentum of a microscopic particle cannot both be known precisely at the same time",
          "Electrons do not exist in atoms",
          "The nucleus has no definite position",
        ],
        correctAnswer: 1,
        explanation: "The uncertainty principle states that it is impossible to simultaneously determine both the exact position and exact momentum of a microscopic particle like an electron.",
      },
      {
        question: "An atomic orbital is best described as:",
        options: [
          "A fixed circular path of the electron",
          "The region of space with maximum probability of finding an electron",
          "The nucleus of the atom",
          "A line spectrum",
        ],
        correctAnswer: 1,
        explanation: "Unlike Bohr's fixed 'orbits', an orbital is the three-dimensional region around the nucleus where an electron is most likely (usually 90-95% probability) to be found.",
      },
      {
        question: "The maximum number of electrons that a single orbital can hold is:",
        options: ["1", "2", "6", "10"],
        correctAnswer: 1,
        explanation: "By the Pauli Exclusion Principle, an orbital can hold at most 2 electrons, and they must have opposite spins.",
      },
      {
        question: "According to Hund's rule, electrons in degenerate orbitals (like the three 2p orbitals) are:",
        options: [
          "Paired up as soon as possible",
          "Distributed singly with parallel spins before any pairing occurs",
          "Always placed in the same orbital",
          "Removed from the atom",
        ],
        correctAnswer: 1,
        explanation: "Hund's rule of maximum multiplicity states that electrons occupy degenerate orbitals singly (with parallel spin) before any pairing takes place.",
      },
      {
        question: "The electronic configuration of chromium (Z = 24) is best written as:",
        options: ["[Ar] 3d⁴ 4s²", "[Ar] 3d⁵ 4s¹", "[Ar] 3d⁶", "[Ar] 4s² 4p⁴"],
        correctAnswer: 1,
        explanation: "Chromium adopts [Ar] 3d⁵ 4s¹ rather than [Ar] 3d⁴ 4s² because a half-filled d sub-shell (d⁵) is more stable due to symmetric distribution and higher exchange energy.",
      },
      {
        question: "Isotopes of an element differ in the number of:",
        options: ["Protons", "Electrons", "Neutrons", "Both protons and electrons"],
        correctAnswer: 2,
        explanation: "Isotopes have the same atomic number (same number of protons/electrons) but different mass numbers, due to a different number of neutrons.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "What is the charge and approximate mass of an electron?",
        answer: "An electron carries a charge of −1.602 × 10⁻¹⁹ C and has a mass of about 9.109 × 10⁻³¹ kg (roughly 1/1837th the mass of a hydrogen atom).",
      },
      {
        marks: 1,
        question: "Define isobars, with one example.",
        answer: "Isobars are atoms of different elements that have the same mass number but different atomic numbers, e.g. ⁴⁰Ar (Z = 18) and ⁴⁰Ca (Z = 20).",
      },
      {
        marks: 2,
        question: "What were the two main observations and conclusions of Rutherford's alpha-scattering experiment (state one of each)?",
        answer:
          "**Observation:** A very small fraction of alpha particles were deflected back at large angles (even close to 180°). **Conclusion:** This showed that a small, dense, positively charged nucleus exists at the centre of the atom, which repels the positively charged alpha particles that come close to it.",
      },
      {
        marks: 2,
        question: "State the Pauli Exclusion Principle and explain what it implies for an orbital.",
        answer:
          "The Pauli Exclusion Principle states that no two electrons in an atom can have the same set of all four quantum numbers. This implies that a single orbital (which fixes n, l and mₗ) can hold a maximum of two electrons, and they must have opposite (paired) spins.",
      },
      {
        marks: 2,
        question: "Why couldn't Bohr's model account for the wave nature of the electron, and what principle exposed this limitation?",
        answer:
          "Bohr's model treated the electron purely as a particle moving in a fixed circular orbit with a definite position and momentum at every instant. De Broglie's proposal that matter has a dual (particle-wave) character, combined with Heisenberg's Uncertainty Principle (which forbids simultaneously knowing exact position and momentum), showed that the idea of a well-defined orbital path is not physically valid for an electron.",
      },
      {
        marks: 3,
        question: "List the four quantum numbers and state what each one describes.",
        answer:
          "1. **Principal quantum number (n)** — describes the size and energy of the shell (n = 1, 2, 3 ...).\n2. **Azimuthal quantum number (l)** — describes the shape of the sub-shell (l = 0 to n − 1; s, p, d, f).\n3. **Magnetic quantum number (mₗ)** — describes the orientation of the orbital in space (mₗ = −l to +l).\n4. **Spin quantum number (mₛ)** — describes the spin of the electron in the orbital (+½ or −½).",
      },
      {
        marks: 3,
        question: "Write the electronic configuration of nitrogen (Z = 7) and explain, using Hund's rule, how its 2p electrons are arranged.",
        answer:
          "Nitrogen (Z = 7): 1s² 2s² 2p³. By Hund's rule of maximum multiplicity, the three 2p electrons are placed singly, one each in the pₓ, p_y and p_z orbitals, with parallel spins, rather than pairing up in fewer orbitals — this arrangement minimises electron-electron repulsion and gives a more stable, lower-energy configuration.",
      },
      {
        marks: 3,
        question: "Explain the terms atomic number and mass number, and use them to describe the composition of the ³⁵Cl₁₇ nucleus.",
        answer:
          "The **atomic number (Z)** is the number of protons in the nucleus of an atom (equal to the number of electrons in a neutral atom). The **mass number (A)** is the total number of protons and neutrons in the nucleus.\nFor ³⁵Cl (Z = 17): number of protons = 17, number of electrons = 17, and number of neutrons = A − Z = 35 − 17 = 18.",
      },
      {
        marks: 5,
        question: "Describe Rutherford's nuclear model of the atom and explain its main limitation.",
        answer:
          "Based on the gold foil experiment, Rutherford proposed that: (i) most of the space in an atom is empty; (ii) a tiny, dense, positively charged nucleus at the centre contains almost the entire mass of the atom; (iii) electrons revolve around the nucleus in circular orbits, held by electrostatic attraction, similar to planets orbiting the Sun.\n**Limitation:** according to classical electromagnetic theory, a charged particle undergoing acceleration (as an electron does while revolving in a circle) must continuously radiate energy. This would cause the electron to lose energy and spiral into the nucleus, making the atom unstable — which contradicts the observed stability of atoms. It also could not explain the discrete line spectrum of hydrogen.",
      },
      {
        marks: 5,
        question:
          "(a) State Bohr's postulates about stationary orbits and the emission/absorption of energy. (b) How does Bohr's model explain the line spectrum of hydrogen?",
        answer:
          "(a) Bohr proposed: (i) electrons move only in certain fixed circular orbits of definite energy (stationary states), without radiating energy while in a given orbit; (ii) the angular momentum of the electron in an orbit is quantised, mvr = nh/2π; (iii) an electron absorbs a definite amount of energy to jump to a higher orbit, and emits a definite amount of energy (as a photon, ΔE = hν) when it falls to a lower orbit.\n(b) Since only specific, quantised orbits (and hence specific energy differences) are allowed, an electron falling from a higher to a lower orbit emits a photon of one particular frequency/wavelength for each possible transition. This produces a set of sharp, discrete spectral lines (rather than a continuous spectrum) — each line in the hydrogen spectrum corresponds to a specific electron transition between two Bohr orbits.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 3 — CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES
  // ================================================================
  {
    id: "classification-of-elements-and-periodicity",
    number: 3,
    title: "Classification of Elements and Periodicity in Properties",
    subtitle: "How arranging elements by atomic number reveals a repeating pattern of properties",
    description:
      "The history of periodic classification, the modern periodic law, the structure of the periodic table, and periodic trends in atomic/ionic radii, ionisation enthalpy, electron gain enthalpy and electronegativity.",
    icon: "🧬",
    color: "cobalt",
    readingTime: "24 min read",
    videos: [
      {
        title: "Classification of Elements and Periodicity — Full Chapter",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/vYVvWk4Uv0A",
      },
      {
        title: "Periodic Trends Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/BS-oXWKF44w",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/3zt6l5vRnKk",
      },
    ],
    notes: `
# Classification of Elements and Periodicity in Properties

## Need for Classification

With more than a hundred elements known, chemists needed a systematic way to organise them so that their properties could be studied and predicted without memorising each one individually.

## Early Attempts at Classification

- **Döbereiner's Triads** — groups of three elements with similar properties, where the atomic mass of the middle element was roughly the average of the other two (e.g. Li, Na, K).
- **Newlands' Law of Octaves** — when elements were arranged in order of increasing atomic mass, every eighth element had properties similar to the first (like musical octaves). This worked reasonably well only up to calcium and broke down for heavier elements.
- **Mendeleev's Periodic Table** — arranged elements in order of increasing atomic mass into rows (periods) and columns (groups), and famously left gaps for undiscovered elements, correctly predicting their properties (e.g. eka-silicon, later found to be germanium).

## Modern Periodic Law

> [!key] The **properties of elements are a periodic function of their atomic number** (not atomic mass, as Mendeleev had proposed) — proposed by Henry Moseley after studying X-ray spectra of elements.

## Structure of the Modern Periodic Table

The long form of the periodic table has:
- **7 periods** (horizontal rows), numbered 1 to 7, corresponding to the value of the principal quantum number (n) of the outermost shell.
- **18 groups** (vertical columns), numbered 1 to 18.
- Elements are further classified into **s-block**, **p-block**, **d-block (transition elements)** and **f-block (inner transition elements — lanthanoids and actinoids)**, based on the sub-shell being filled last.

| Block | Groups | Valence sub-shell |
|---|---|---|
| s-block | 1, 2 | ns¹⁻² |
| p-block | 13-18 | ns² np¹⁻⁶ |
| d-block | 3-12 | (n-1)d¹⁻¹⁰ ns⁰⁻² |
| f-block | Lanthanoids, actinoids | (n-2)f¹⁻¹⁴ |

::diagram:periodic-table-blocks

## Nomenclature of Elements with Atomic Numbers > 100

For newly discovered elements before they are officially named, IUPAC uses a systematic naming method based on numerical roots (0 = nil, 1 = un, 2 = bi, 3 = tri, 4 = quad, 5 = pent, 6 = hex, 7 = sept, 8 = oct, 9 = enn), combined and ending in **-ium**. e.g. element 118 is temporarily "ununoctium" (Uuo) before being officially named Oganesson.

## Periodic Trends in Properties

### 1. Atomic Radius
The distance from the centre of the nucleus to the outermost shell containing electrons.
- **Across a period (left to right):** atomic radius generally **decreases**, because the nuclear charge increases while electrons are added to the same shell, pulling the electron cloud in more tightly (increased effective nuclear charge).
- **Down a group (top to bottom):** atomic radius **increases**, because a new shell is added at each step, and the increased distance/screening outweighs the increase in nuclear charge.

### 2. Ionic Radius
- A **cation** (formed by losing electrons) is always **smaller** than its parent atom, since removing electrons reduces electron-electron repulsion, and often removes an entire shell.
- An **anion** (formed by gaining electrons) is always **larger** than its parent atom, since adding electrons increases electron-electron repulsion, allowing the electron cloud to expand.
- **Isoelectronic species** (same number of electrons) — the radius decreases as nuclear charge (atomic number) increases, e.g. among N³⁻, O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺ (all with 10 electrons), the radius decreases in that order as more protons pull the same number of electrons in more tightly.

### 3. Ionisation Enthalpy (Ionisation Energy)
The minimum energy required to remove the most loosely bound electron from an isolated gaseous atom in its ground state, forming a cation.
- **Across a period:** ionisation enthalpy generally **increases** (electrons are held more tightly as effective nuclear charge increases and atomic radius decreases).
- **Down a group:** ionisation enthalpy generally **decreases** (the outermost electron is farther from the nucleus and more shielded, so it is easier to remove).

> [!note] **Exceptions:** Be has a higher first ionisation enthalpy than B (a filled 2s² sub-shell is more stable), and N has a higher first ionisation enthalpy than O (a half-filled 2p³ sub-shell is more stable).

**Successive ionisation enthalpies** (IE₁ < IE₂ < IE₃ ...) always increase, since it becomes progressively harder to remove an electron from an increasingly positive ion.

### 4. Electron Gain Enthalpy
The enthalpy change when an electron is added to an isolated gaseous atom to form an anion. It is usually **negative** (energy is released) since the atom becomes more stable by gaining an electron, but can be positive for atoms that resist gaining an electron (like noble gases, or when adding a second electron to an already-negative ion, due to repulsion).
- **Across a period:** electron gain enthalpy generally becomes **more negative** (increasing tendency to gain electrons, as effective nuclear charge increases); halogens have the most negative values.
- **Down a group:** electron gain enthalpy generally becomes **less negative** (though there are exceptions — e.g. Cl has a more negative electron gain enthalpy than F, because the very small size of F causes strong electron-electron repulsion in its compact 2p sub-shell).

### 5. Electronegativity
A qualitative measure of the **tendency of an atom to attract the shared pair of electrons towards itself** in a covalent bond (unlike ionisation enthalpy/electron gain enthalpy, it applies to an atom within a bonded molecule, not an isolated atom).
- **Across a period:** electronegativity generally **increases**.
- **Down a group:** electronegativity generally **decreases**.
- **Fluorine is the most electronegative element** in the periodic table (value 4.0 on the Pauling scale).

::diagram:periodic-trends

## Periodic Trends in Chemical Reactivity

- **Metallic character** — the tendency to lose electrons and form cations; **decreases across a period, increases down a group** (opposite trend to non-metallic character/electronegativity).
- **Non-metallic character** — the tendency to gain electrons and form anions; **increases across a period, decreases down a group**.
- Elements on the border between metals and non-metals, showing properties of both, are called **metalloids** (e.g. B, Si, Ge, As, Sb, Te).

### Anomalous Behaviour of the First Element in a Group
The first element of any group (Li, Be, B, C, N, O, F) often shows different properties from the rest of the group, because it has a much smaller size, higher electronegativity, and no d-orbitals available. This is called the **diagonal relationship** when a period-2 element resembles the period-3 element diagonally below-right of it, e.g. Li resembles Mg, Be resembles Al, B resembles Si.
    `,
    experiments: [
      {
        id: "periodic-trend-atomic-radius-models",
        title: "Comparing Atomic Sizes Across a Period and Down a Group",
        aim: "To visualise the periodic trend in atomic radius using scaled models or data plots.",
        materials: ["A data table of atomic radii for Period 2 and Period 3 elements", "A data table of atomic radii for Group 1 elements", "Graph paper", "A compass (to draw circles to scale)"],
        procedure: [
          "Draw circles to scale representing the atomic radii of Li, Be, B, C, N, O, F (Period 2) side by side, in order.",
          "Draw circles to scale representing the atomic radii of Li, Na, K, Rb (Group 1) below each other.",
          "Compare how the circle sizes change in each direction.",
        ],
        observation:
          "The circles representing atomic radius shrink steadily from Li to F across Period 2. The circles representing atomic radius grow steadily from Li to Rb down Group 1.",
        conclusion:
          "Atomic radius decreases across a period (due to increasing effective nuclear charge pulling electrons in) and increases down a group (due to the addition of new electron shells), confirming the expected periodic trend.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Circles for Li → F across Period 2", after: "Radius shrinks steadily left to right" },
        },
      },
      {
        id: "flame-colour-group1-trend",
        title: "Flame Colours of Alkali Metals — A Group 1 Trend",
        aim: "To observe how the characteristic flame colour changes down Group 1, relating it to the decreasing ionisation enthalpy of the outer electron.",
        materials: ["Salts of lithium, sodium, potassium (chlorides)", "A nichrome wire loop", "Concentrated HCl", "A Bunsen burner"],
        procedure: [
          "Clean a nichrome wire in concentrated HCl and heat until it gives no colour in the flame.",
          "Dip the wire in a lithium salt and hold it in the flame, noting the colour; clean and repeat for sodium, then potassium.",
        ],
        observation: "Lithium gives a crimson-red flame, sodium gives a persistent golden-yellow flame, and potassium gives a lilac (pale violet) flame.",
        conclusion:
          "As atomic size increases down Group 1 (Li → Na → K), the outermost electron is held less tightly (lower ionisation enthalpy) and requires less energy to excite; the differing energy gaps between excited and ground states in each element also give each a distinct emission colour.",
        visual: {
          before: "hsl(30 10% 20%)",
          after: "hsl(0 70% 50%)",
          flame: true,
          labels: { before: "Clean wire in flame", after: "Crimson-red — lithium" },
        },
      },
      {
        id: "acid-base-nature-oxides",
        title: "Testing the Acidic/Basic Nature of Oxides Across a Period",
        aim: "To confirm the trend from basic to acidic oxides across Period 3, reflecting increasing non-metallic character.",
        materials: ["Sodium oxide/magnesium oxide (or their solutions)", "Aluminium oxide", "Phosphorus pentoxide / sulphur trioxide (or solutions of the corresponding acids)", "Red and blue litmus paper", "Test tubes and water"],
        procedure: [
          "Prepare aqueous mixtures/solutions of oxides across Period 3 (Na₂O, MgO, Al₂O₃, P₄O₁₀, SO₃) as available or as demonstrations.",
          "Test each solution with red and blue litmus paper.",
          "Note whether each oxide behaves as basic, amphoteric or acidic.",
        ],
        observation:
          "Na₂O and MgO turn red litmus blue (basic). Al₂O₃ shows little effect either way, or reacts with both acids and bases (amphoteric). P₄O₁₀ and SO₃ turn blue litmus red (acidic).",
        conclusion:
          "Moving across Period 3 from left (metals) to right (non-metals), oxides change from basic to amphoteric to acidic — this mirrors the increase in non-metallic character (and electronegativity) across a period.",
        visual: {
          before: "hsl(220 60% 55%)",
          after: "hsl(0 65% 50%)",
          labels: { before: "Basic oxide turns litmus blue", after: "Acidic oxide turns litmus red" },
        },
      },
      {
        id: "reactivity-halogens-group17",
        title: "Comparing the Reactivity of Halogens Down Group 17",
        aim: "To observe the decreasing reactivity (oxidising power) of halogens down the group via displacement reactions.",
        materials: ["Chlorine water", "Bromine water", "Sodium bromide solution", "Sodium iodide solution", "Test tubes", "An organic solvent like hexane (to show colour more clearly, optional)"],
        procedure: [
          "Add chlorine water to a solution of sodium bromide and note any colour change.",
          "Add chlorine water to a solution of sodium iodide and note the colour change.",
          "Add bromine water to a solution of sodium iodide and note the colour change; then try adding iodine solution to sodium chloride solution.",
        ],
        observation:
          "Chlorine water displaces bromine (solution turns orange/brown) from NaBr, and displaces iodine (solution turns brown/violet) from NaI. Bromine water also displaces iodine from NaI. Iodine does not displace chlorine from NaCl (no reaction).",
        reaction: "Cl₂ + 2NaBr → 2NaCl + Br₂ ; Cl₂ + 2NaI → 2NaCl + I₂ ; Br₂ + 2NaI → 2NaBr + I₂",
        conclusion:
          "A more reactive (more electronegative, higher up the group) halogen can displace a less reactive halogen from its salt solution, confirming that oxidising power (reactivity) of halogens decreases down Group 17: F₂ > Cl₂ > Br₂ > I₂.",
        visual: {
          before: "hsl(50 40% 92%)",
          after: "hsl(30 70% 55%)",
          labels: { before: "Colourless NaBr solution + Cl₂ water", after: "Turns orange as Br₂ is displaced" },
        },
      },
      {
        id: "ionisation-energy-data-plot",
        title: "Plotting Ionisation Enthalpy Against Atomic Number",
        aim: "To plot first ionisation enthalpy data for Period 2 and Period 3 elements and identify the periodic pattern, including the exceptions at Be/B and N/O.",
        materials: ["A data table of first ionisation enthalpies for Li to Ne and Na to Ar", "Graph paper"],
        procedure: [
          "Plot atomic number (x-axis) against first ionisation enthalpy (y-axis) for the elements Li through Ne.",
          "Join the points and note the overall trend, paying close attention to the values at Be, B, N and O.",
          "Repeat for Na through Ar and compare the overall shape and magnitude of the two graphs.",
        ],
        observation:
          "The general trend rises from Li to Ne, but there is a small dip at B (lower than Be) and another small dip at O (lower than N). The Period 3 graph shows the same overall rising trend and dips (at Al and S) but at lower absolute values than Period 2.",
        conclusion:
          "Ionisation enthalpy generally increases across a period due to increasing effective nuclear charge, but a half-filled (p³) or fully-filled (s²) sub-shell provides extra stability, causing small dips in the trend at Group 13 and Group 16 elements. The lower overall values in Period 3 compared to Period 2 confirm that ionisation enthalpy decreases down a group.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Plotting Li → Ne", after: "Rising trend with dips at B and O" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "The Modern Periodic Law states that the properties of elements are a periodic function of their:",
        options: ["Atomic mass", "Atomic number", "Number of neutrons", "Valency only"],
        correctAnswer: 1,
        explanation: "Moseley's Modern Periodic Law states that properties of elements repeat periodically when arranged in order of increasing atomic number, not atomic mass as Mendeleev had proposed.",
      },
      {
        question: "Across a period from left to right, atomic radius generally:",
        options: ["Increases", "Decreases", "Remains the same", "Increases then decreases randomly"],
        correctAnswer: 1,
        explanation: "Effective nuclear charge increases across a period while electrons are added to the same shell, pulling the electron cloud in tighter and decreasing atomic radius.",
      },
      {
        question: "Down a group, ionisation enthalpy generally:",
        options: ["Increases", "Decreases", "Stays constant", "Becomes negative"],
        correctAnswer: 1,
        explanation: "Down a group, the outer electron is farther from the nucleus and more shielded by inner shells, so less energy is needed to remove it — ionisation enthalpy decreases.",
      },
      {
        question: "Which element has the highest electronegativity on the Pauling scale?",
        options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"],
        correctAnswer: 2,
        explanation: "Fluorine has the highest electronegativity of all elements, with a Pauling scale value of 4.0.",
      },
      {
        question: "A cation is always _____ than its parent atom.",
        options: ["Larger", "Smaller", "The same size as", "Heavier and larger than"],
        correctAnswer: 1,
        explanation: "Removing electrons to form a cation reduces electron-electron repulsion (and often removes a whole shell), making the cation smaller than the neutral atom.",
      },
      {
        question: "Elements are grouped into the s, p, d and f blocks based on:",
        options: [
          "Their atomic mass",
          "The sub-shell into which the last (differentiating) electron enters",
          "Whether they are metals or non-metals",
          "Their date of discovery",
        ],
        correctAnswer: 1,
        explanation: "The block classification is based on which type of sub-shell (s, p, d or f) receives the last (differentiating) electron in the atom's ground-state configuration.",
      },
      {
        question: "Which pair of elements shows a 'diagonal relationship'?",
        options: ["Li and Mg", "Na and K", "C and Si", "O and S"],
        correctAnswer: 0,
        explanation: "Lithium (Period 2, Group 1) shows a diagonal relationship with magnesium (Period 3, Group 2) due to similar charge density and polarising power.",
      },
      {
        question: "Nitrogen has a higher first ionisation enthalpy than oxygen because:",
        options: [
          "Nitrogen has a larger atomic radius",
          "Nitrogen's half-filled 2p³ configuration is extra stable",
          "Oxygen is a noble gas",
          "Nitrogen has more protons than oxygen",
        ],
        correctAnswer: 1,
        explanation: "Nitrogen's exactly half-filled 2p³ sub-shell is more symmetric and stable, so removing an electron from it requires more energy than removing one from oxygen's 2p⁴ configuration.",
      },
      {
        question: "Across Period 3, the nature of the oxides changes from:",
        options: ["Acidic to basic", "Basic to acidic", "Always neutral", "Amphoteric to basic only"],
        correctAnswer: 1,
        explanation: "Moving left to right across Period 3 (Na to Cl), oxides change from strongly basic (Na₂O) through amphoteric (Al₂O₃) to strongly acidic (Cl₂O₇), reflecting increasing non-metallic character.",
      },
      {
        question: "Metallic character across a period (left to right) generally:",
        options: ["Increases", "Decreases", "Is unaffected", "Increases only for transition metals"],
        correctAnswer: 1,
        explanation: "As non-metallic character (and electronegativity) increases across a period, the tendency to lose electrons (metallic character) correspondingly decreases.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "State the Modern Periodic Law.",
        answer: "The properties of elements are a periodic function of their atomic number.",
      },
      {
        marks: 1,
        question: "Name the element with the highest electronegativity and state its approximate value.",
        answer: "Fluorine has the highest electronegativity, with a value of about 4.0 on the Pauling scale.",
      },
      {
        marks: 2,
        question: "Why does atomic radius decrease across a period but increase down a group?",
        answer:
          "Across a period, electrons are added to the same shell while the nuclear charge also increases, so the effective nuclear charge pulls the electron cloud in more tightly, decreasing radius. Down a group, a new principal shell is added at each step, and the increased distance and shielding from inner electrons outweighs the increase in nuclear charge, so radius increases.",
      },
      {
        marks: 2,
        question: "Explain why the ionic radius of a cation is smaller and that of an anion is larger than the corresponding neutral atom.",
        answer:
          "A cation is formed by removing one or more electrons; this reduces electron-electron repulsion (and can remove an entire outer shell), so the remaining electrons are pulled in more tightly by the same nuclear charge, making the cation smaller. An anion is formed by adding one or more electrons; this increases electron-electron repulsion, causing the electron cloud to expand, making the anion larger than the parent atom.",
      },
      {
        marks: 2,
        question: "What are isoelectronic species? Arrange O²⁻, F⁻, Na⁺ and Mg²⁺ in order of decreasing radius.",
        answer:
          "Isoelectronic species are atoms/ions that have the same number of electrons. All four species (O²⁻, F⁻, Na⁺, Mg²⁺) have 10 electrons each, but differ in nuclear charge (Z = 8, 9, 11, 12 respectively). As nuclear charge increases, the same 10 electrons are pulled in more tightly, so radius decreases in the order: **O²⁻ > F⁻ > Na⁺ > Mg²⁺**.",
      },
      {
        marks: 3,
        question: "Distinguish between ionisation enthalpy and electron gain enthalpy.",
        answer:
          "**Ionisation enthalpy** is the energy required to remove the most loosely bound electron from an isolated gaseous atom, forming a cation; it is always positive (energy must be supplied). **Electron gain enthalpy** is the enthalpy change when an electron is added to an isolated gaseous atom, forming an anion; it is usually negative (energy is released), though it can be positive in some cases (e.g. noble gases, or adding a second electron to an already negative ion).",
      },
      {
        marks: 3,
        question: "State the general trend of metallic and non-metallic character across a period and down a group.",
        answer:
          "**Across a period** (left to right): metallic character decreases and non-metallic character increases, as effective nuclear charge increases and electronegativity rises.\n**Down a group** (top to bottom): metallic character increases and non-metallic character decreases, as atomic size increases and electrons become easier to lose.",
      },
      {
        marks: 3,
        question: "What is the diagonal relationship? Illustrate it with one example.",
        answer:
          "The diagonal relationship refers to the similarity in properties between certain elements in Period 2 and the elements diagonally below-right of them in Period 3, arising from similar size and charge density. Example: lithium (Group 1, Period 2) resembles magnesium (Group 2, Period 3) — both form a normal oxide (not a peroxide) on burning in air, and both form fairly covalent chlorides that are soluble in organic solvents.",
      },
      {
        marks: 5,
        question:
          "(a) State three limitations of Newlands' Law of Octaves. (b) Explain how Mendeleev's periodic table, despite being based on atomic mass, was still a major advance.",
        answer:
          "(a) Limitations of Newlands' Law of Octaves: (i) it worked only up to calcium and failed for heavier elements; (ii) to fit elements into the pattern, sometimes two elements were placed in the same slot, and dissimilar elements ended up grouped together; (iii) it did not leave any room for elements not yet discovered, assuming only 56 elements existed in nature.\n(b) Mendeleev arranged elements by increasing atomic mass into a table where elements with similar properties fell into the same group. Its major advance was that he deliberately left gaps for elements not yet discovered, and successfully predicted the properties of these missing elements (like eka-silicon, later confirmed as germanium) with remarkable accuracy — strong evidence that the underlying periodic pattern was real, even though atomic mass was later replaced by atomic number as the correct basis for the law.",
      },
      {
        marks: 5,
        question:
          "(a) Explain, with the s, p, d, f block classification, how the periodic table is organised. (b) Why do the first element of a group and the noble gases often behave anomalously compared to the general trend?",
        answer:
          "(a) The periodic table is divided into blocks based on the sub-shell receiving the last (differentiating) electron: the **s-block** (Groups 1-2) has valence configuration ns¹⁻²; the **p-block** (Groups 13-18) has valence configuration ns²np¹⁻⁶; the **d-block/transition elements** (Groups 3-12) fill (n-1)d orbitals; and the **f-block/inner transition elements** (lanthanoids and actinoids, shown separately below the main table) fill (n-2)f orbitals.\n(b) The first element of each group (e.g. Li, Be, B, C, N, O, F) tends to be anomalous because it is much smaller, more electronegative, and has no d-orbitals available in its valence shell, unlike heavier members of the same group — this is why elements like Li and Be often more closely resemble a diagonal neighbour (Mg, Al) than the rest of their own group. Noble gases are anomalous because they already have a stable, complete octet (or duplet for He), so properties like ionisation enthalpy are very high and electron gain enthalpy is positive (they resist both losing and gaining electrons), breaking the smooth periodic trends seen in neighbouring groups.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 4 — CHEMICAL BONDING AND MOLECULAR STRUCTURE
  // ================================================================
  {
    id: "chemical-bonding-and-molecular-structure",
    number: 4,
    title: "Chemical Bonding and Molecular Structure",
    subtitle: "Why atoms bond, what shape the result takes, and why some substances conduct and others don't",
    description:
      "The octet rule, ionic and covalent bonding, Lewis structures, VSEPR theory and molecular shapes, polarity and dipole moment, valence bond theory, hybridisation, and an introduction to molecular orbital theory and hydrogen bonding.",
    icon: "🔗",
    color: "moss",
    readingTime: "31 min read",
    videos: [
      {
        title: "Chemical Bonding and Molecular Structure — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/kqCC-6cbwLI",
      },
      {
        title: "VSEPR Theory and Molecular Shapes",
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
# Chemical Bonding and Molecular Structure

## Why Do Atoms Combine?

Atoms of most elements are not usually found isolated in nature (except noble gases); they combine with each other to form **molecules or ions**. Atoms combine because the combined state has **lower energy** (is more stable) than the free, isolated atoms — chemical bonding is nature's way of achieving lower-energy, more stable arrangements.

## Kössel–Lewis Approach and the Octet Rule

Kössel and Lewis, building on the special stability of noble gas configurations, proposed that atoms combine to achieve the electronic configuration of the nearest noble gas — usually **eight electrons in the outermost shell** (an octet), either by transferring electrons (ionic bond) or by sharing them (covalent bond).

**Lewis symbols** represent the valence electrons of an atom as dots around its symbol, e.g. Na• , •Ṅ• (nitrogen with 5 dots), :Ö: (oxygen with 6 dots).

## Ionic (Electrovalent) Bond

An ionic bond is formed by the **complete transfer of electrons** from a metal atom to a non-metal atom, resulting in oppositely charged ions held together by strong **electrostatic force of attraction**.

**Example:** Na (2, 8, 1) loses 1 e⁻ → Na⁺ (2, 8); Cl (2, 8, 7) gains 1 e⁻ → Cl⁻ (2, 8, 8); Na⁺ and Cl⁻ combine to form NaCl.

::diagram:ionic-covalent-formation

### Factors Favouring Ionic Bond Formation
1. **Low ionisation enthalpy** of the metal (easy to lose electrons).
2. **High (negative) electron gain enthalpy** of the non-metal (readily accepts electrons).
3. **High lattice enthalpy** of the compound formed — the energy released when gaseous ions come together to form 1 mole of the solid ionic compound; a higher lattice enthalpy makes the compound more stable.

### General Properties of Ionic Compounds
- Existing as a **crystal lattice** rather than discrete molecules; hard and brittle.
- High melting and boiling points (strong electrostatic forces need lots of energy to overcome).
- Soluble in polar solvents (like water); generally insoluble in non-polar solvents.
- Conduct electricity in the molten state or in aqueous solution (mobile ions); do not conduct as solids.

::diagram:nacl-lattice

## Covalent Bond

A covalent bond is formed by the **mutual sharing of an electron pair** between two atoms, so both attain a stable octet (or duplet, for hydrogen).

**Lewis representation of some molecules:**
- H₂: H:H (one shared pair, a single bond)
- O₂: O::O (two shared pairs, a double bond)
- N₂: N:::N (three shared pairs, a triple bond)

### Bond Parameters
- **Bond length** — the equilibrium distance between the nuclei of two bonded atoms.
- **Bond angle** — the angle between two bonds at a common atom.
- **Bond enthalpy (bond energy)** — the energy needed to break one mole of bonds of a particular type between two atoms in the gaseous state.
- **Bond order** — the number of bonds between two atoms in a molecule (e.g. bond order 1 for a single bond, 2 for a double bond, 3 for a triple bond). A higher bond order generally means a shorter, stronger bond.

## VSEPR Theory (Valence Shell Electron Pair Repulsion)

VSEPR theory predicts the **shape (geometry)** of a covalent molecule by assuming that electron pairs (bonding and lone pairs) around the central atom arrange themselves to be as **far apart as possible**, minimising repulsion.

**Order of repulsion:** lone pair–lone pair > lone pair–bond pair > bond pair–bond pair. This means lone pairs need more space and can distort the ideal bond angles.

| Number of electron pairs around central atom | Shape | Example |
|---|---|---|
| 2 (no lone pair) | Linear (180°) | BeCl₂ |
| 3 (no lone pair) | Trigonal planar (120°) | BF₃ |
| 4 (no lone pair) | Tetrahedral (109.5°) | CH₄ |
| 4 (1 lone pair) | Pyramidal (~107°) | NH₃ |
| 4 (2 lone pairs) | Bent/angular (~104.5°) | H₂O |
| 5 (no lone pair) | Trigonal bipyramidal | PCl₅ |
| 6 (no lone pair) | Octahedral | SF₆ |

> [!example] Water (H₂O) has 4 electron pairs around oxygen (2 bond pairs, 2 lone pairs), so the basic arrangement is tetrahedral, but the shape of the molecule (based only on the atoms) is described as **bent/angular**, with a bond angle of about 104.5° — smaller than the ideal 109.5° because lone pairs repel more strongly than bond pairs.

::diagram:vsepr-shapes

## Polarity of Bonds and Molecules

### Electronegativity and Bond Polarity
When two atoms of **different electronegativity** form a covalent bond, the shared electron pair is pulled more towards the more electronegative atom, creating partial charges — a **polar covalent bond**. If the atoms are identical (same electronegativity), the bond is **non-polar**.

**Example:** in HCl, chlorine is more electronegative than hydrogen, so the bonding pair lies closer to Cl, giving it a partial negative charge (δ⁻) and hydrogen a partial positive charge (δ⁺).

### Dipole Moment
A polar bond has a **dipole moment**, μ = charge (Q) × distance between charges (d), measured in **debye (D)**.

- The dipole moment of a **molecule** is the vector sum of the dipole moments of all its bonds.
- Molecules with a symmetrical shape can have **zero net dipole moment**, even if individual bonds are polar, because the bond dipoles cancel out (e.g. CO₂, BF₃, CCl₄).
- Unsymmetrical molecules with polar bonds have a **non-zero net dipole moment** (e.g. H₂O, NH₃).

> [!key] CO₂ is linear with two identical, oppositely-directed C=O dipoles that cancel, giving μ = 0, whereas H₂O is bent, so its two O–H bond dipoles do not cancel, giving it a net dipole moment (μ ≈ 1.84 D).

## Valence Bond Theory and Hybridisation

**Valence Bond Theory** explains covalent bond formation as the overlap of atomic orbitals of the combining atoms — greater overlap gives a stronger bond.
- **Sigma (σ) bond** — formed by head-on (axial) overlap of orbitals; allows free rotation around the bond axis.
- **Pi (π) bond** — formed by sideways (lateral) overlap of unhybridised p-orbitals; restricts rotation and is generally weaker than a σ bond. A double bond = 1 σ + 1 π; a triple bond = 1 σ + 2 π.

::diagram:sigma-pi-bonds

### Hybridisation
Hybridisation is the **mixing of atomic orbitals of similar energy** on the same atom to form new, equivalent hybrid orbitals with a definite shape and orientation, used for stronger, more directional bonding.

| Hybridisation | Orbitals mixed | Shape | Example |
|---|---|---|---|
| sp | 1 s + 1 p | Linear (180°) | BeCl₂, C₂H₂ |
| sp² | 1 s + 2 p | Trigonal planar (120°) | BF₃, C₂H₄ |
| sp³ | 1 s + 3 p | Tetrahedral (109.5°) | CH₄, NH₃, H₂O |

::diagram:hybridisation

## Molecular Orbital Theory (Brief Introduction)

Molecular Orbital (MO) Theory treats a molecule as a single entity, where atomic orbitals of the combining atoms combine to form new **molecular orbitals** — **bonding molecular orbitals** (lower energy, formed by constructive overlap) and **antibonding molecular orbitals** (higher energy, formed by destructive overlap).

**Bond order** = ½ (number of electrons in bonding MOs − number of electrons in antibonding MOs). A bond order of zero (or negative) means the molecule/ion does not exist. MO theory successfully explains the **paramagnetism of O₂** (it has two unpaired electrons in antibonding π* orbitals), which valence bond theory cannot easily explain.

## Hydrogen Bonding

A **hydrogen bond** is formed when hydrogen, covalently bonded to a highly electronegative atom with a small size (F, O or N), experiences an additional weak electrostatic attraction to a lone pair on another highly electronegative atom nearby.

- **Intermolecular hydrogen bonding** — between two different molecules, e.g. in water, HF, ammonia. This is responsible for the anomalously high boiling points of HF, H₂O and NH₃ compared to the hydrides of other elements in their respective groups.
- **Intramolecular hydrogen bonding** — within the same molecule, e.g. in ortho-nitrophenol.

> [!key] Hydrogen bonding in water explains why ice is less dense than liquid water: in ice, each water molecule forms a rigid, open hydrogen-bonded lattice with 4 neighbours, which occupies more space than the more closely packed arrangement in liquid water — this is why ice floats.

::diagram:hydrogen-bonding

    `,
    experiments: [
      {
        id: "conductivity-ionic-covalent",
        title: "Testing the Electrical Conductivity of Ionic and Covalent Compounds",
        aim: "To compare the electrical conductivity of an ionic compound and a covalent compound, in the solid state and in solution.",
        materials: ["Sodium chloride (solid and dissolved in water)", "Sugar/glucose (solid and dissolved in water)", "A conductivity apparatus (battery, bulb, electrodes)"],
        procedure: [
          "Test the conductivity of solid NaCl and solid sugar separately by connecting each into the circuit.",
          "Dissolve NaCl in distilled water and test the conductivity of the solution.",
          "Dissolve sugar in distilled water and test the conductivity of that solution.",
        ],
        observation:
          "Solid NaCl and solid sugar do not conduct electricity (bulb stays off). The NaCl solution conducts electricity strongly (bulb glows), while the sugar solution does not conduct at all (bulb stays off).",
        conclusion:
          "NaCl is an ionic compound — its ions are locked in a rigid lattice in the solid state (no conduction) but become free to move and carry current once dissolved in water. Sugar is a covalent (molecular) compound that does not ionise in water, so its solution contains only neutral molecules and does not conduct electricity.",
        visual: {
          before: "hsl(200 15% 92%)",
          after: "hsl(48 90% 55%)",
          labels: { before: "NaCl solid — bulb off", after: "NaCl solution — bulb glows" },
        },
      },
      {
        id: "molecular-model-building",
        title: "Building Molecular Models to Verify VSEPR Shapes",
        aim: "To construct ball-and-stick models of CH₄, NH₃, H₂O and CO₂ and verify the shapes predicted by VSEPR theory.",
        materials: ["Molecular model kit (centre atoms and peripheral atoms in different colours)", "Sticks/springs to represent bonds", "A protractor"],
        procedure: [
          "Build a model of methane (CH₄) using a central carbon atom with 4 hydrogen atoms attached.",
          "Build models of ammonia (NH₃, 3 bond pairs + 1 lone pair on N) and water (H₂O, 2 bond pairs + 2 lone pairs on O), representing lone pairs with a labelled empty position.",
          "Build a model of CO₂ (2 double bonds, no lone pairs on C) and measure the bond angles on each model with a protractor.",
        ],
        observation:
          "CH₄ forms a perfect tetrahedron with bond angles of 109.5°. NH₃ is pyramidal with a slightly compressed angle (~107°). H₂O is bent/angular with a still smaller angle (~104.5°). CO₂ is perfectly linear at 180°.",
        conclusion:
          "The measured angles confirm VSEPR predictions: as lone pairs replace bond pairs around a central atom with the same total number of electron pairs (4 in this case), the bond angle decreases progressively, because lone pair-bond pair repulsion is stronger than bond pair-bond pair repulsion.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Assembling CH₄, NH₃, H₂O models", after: "109.5° → 107° → 104.5° as lone pairs increase" },
        },
      },
      {
        id: "polar-solvent-deflection",
        title: "Deflection of a Liquid Stream by a Charged Rod (Testing Polarity)",
        activityRef: "Classic polarity demonstration",
        aim: "To show that a liquid made of polar molecules is attracted to an electrostatically charged rod, while a non-polar liquid is not.",
        materials: ["A burette with a thin stream of water", "A burette with a thin stream of a non-polar liquid (e.g. hexane/CCl₄)", "A charged glass or plastic rod (rubbed with silk/fur)"],
        procedure: [
          "Let a thin, steady stream of water fall from a burette.",
          "Bring a charged rod close to the falling stream (without touching it) and observe.",
          "Repeat the procedure with a stream of a non-polar liquid like hexane.",
        ],
        observation:
          "The stream of water bends noticeably towards the charged rod. The stream of the non-polar liquid shows little to no deflection.",
        conclusion:
          "Water molecules are polar (they possess a permanent dipole moment due to their bent shape and polar O-H bonds), so they are attracted by the electric field of the charged rod. Non-polar molecules lack a permanent dipole and are not significantly attracted.",
        visual: {
          before: "hsl(200 60% 60%)",
          after: "hsl(200 60% 60%)",
          labels: { before: "Straight falling stream, rod approaching", after: "Water stream visibly bends toward the rod" },
        },
      },
      {
        id: "ice-density-hydrogen-bonding",
        title: "Ice Floating on Water — Evidence for Hydrogen Bonding",
        aim: "To relate the fact that ice floats on liquid water to the structure created by hydrogen bonding.",
        materials: ["Ice cubes", "A beaker of water", "A thermometer"],
        procedure: [
          "Place ice cubes in a beaker of liquid water at room temperature.",
          "Observe whether the ice floats or sinks.",
          "Note the approximate fraction of the ice cube that remains above the water surface.",
        ],
        observation: "The ice cubes float, with roughly 90% of their volume submerged and about 10% above the surface.",
        conclusion:
          "In ice, each water molecule is hydrogen-bonded to four neighbouring molecules in a rigid, open, cage-like lattice, which takes up more volume (lower density) than the more closely packed, constantly rearranging network of hydrogen bonds in liquid water. Since ice is less dense than liquid water, it floats — an important consequence of hydrogen bonding that allows aquatic life to survive under frozen lakes in winter.",
        visual: {
          before: "hsl(200 40% 92%)",
          labels: { before: "Ice cube placed in water", after: "Ice floats — about 90% submerged" },
        },
      },
      {
        id: "sigma-pi-bond-models",
        title: "Modelling Sigma and Pi Bond Overlap",
        aim: "To visualise the difference between head-on (σ) and sideways (π) orbital overlap using simple models.",
        materials: ["Two balloons/foam lobes per p-orbital (to represent p-orbital lobes)", "A model of s-orbitals (spheres)", "A central axis rod"],
        procedure: [
          "Align two p-orbital models end-to-end along a common axis and bring them together to overlap head-on — this represents a σ bond.",
          "Align two p-orbital models side by side (parallel to each other, perpendicular to the bond axis) and bring them together to overlap sideways — this represents a π bond.",
          "Try rotating each 'bonded' pair around the bond axis and note what happens to the overlap.",
        ],
        observation:
          "The head-on (σ) overlap model can be rotated around the bond axis without breaking the overlap. The sideways (π) overlap model loses its overlap (the bond would break) if rotated around the axis.",
        conclusion:
          "A sigma bond, formed by head-on overlap, permits free rotation around the bond axis, whereas a pi bond, formed by sideways overlap of parallel p-orbitals, restricts rotation around the bond axis — which is why double bonds (1σ + 1π) show restricted rotation and give rise to cis-trans isomerism, unlike single (σ only) bonds.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Two p-orbitals approaching", after: "σ overlap (end-on) vs π overlap (sideways)" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "An ionic bond is formed by:",
        options: [
          "Sharing of an electron pair",
          "Complete transfer of electrons from one atom to another",
          "Overlap of p-orbitals only",
          "Formation of a metallic lattice",
        ],
        correctAnswer: 1,
        explanation: "An ionic bond forms when electrons are completely transferred from a metal atom to a non-metal atom, producing oppositely charged ions held by electrostatic attraction.",
      },
      {
        question: "According to VSEPR theory, the shape of CH₄ (4 bond pairs, no lone pairs) is:",
        options: ["Linear", "Trigonal planar", "Tetrahedral", "Pyramidal"],
        correctAnswer: 2,
        explanation: "With 4 bond pairs and no lone pairs around the central carbon atom, VSEPR predicts a tetrahedral shape with bond angles of 109.5°.",
      },
      {
        question: "The bond angle in water (H₂O) is slightly less than the ideal tetrahedral angle because:",
        options: [
          "Oxygen has no lone pairs",
          "Lone pair-lone pair repulsion pushes the bond pairs closer together",
          "Water has a triple bond",
          "Hydrogen is more electronegative than oxygen",
        ],
        correctAnswer: 1,
        explanation: "The two lone pairs on oxygen repel each other and the bond pairs more strongly than bond pair-bond pair repulsion, compressing the H-O-H angle to about 104.5° (from the ideal 109.5°).",
      },
      {
        question: "Which of these molecules has a net dipole moment of zero despite having polar bonds?",
        options: ["H₂O", "NH₃", "CO₂", "HCl"],
        correctAnswer: 2,
        explanation: "CO₂ is linear, and its two equal, oppositely directed C=O bond dipoles cancel exactly, giving a net dipole moment of zero.",
      },
      {
        question: "A sigma (σ) bond is formed by:",
        options: [
          "Sideways overlap of p-orbitals",
          "Head-on (axial) overlap of orbitals",
          "Transfer of electrons",
          "Overlap of d-orbitals only",
        ],
        correctAnswer: 1,
        explanation: "A sigma bond is formed by the head-on (axial) overlap of atomic orbitals along the internuclear axis, and permits free rotation.",
      },
      {
        question: "The hybridisation of carbon in methane (CH₄) is:",
        options: ["sp", "sp²", "sp³", "sp³d"],
        correctAnswer: 2,
        explanation: "Carbon in methane forms 4 equivalent bonds arranged tetrahedrally, which requires sp³ hybridisation (mixing 1 s and 3 p orbitals).",
      },
      {
        question: "Molecular orbital theory successfully explains which unusual property of O₂ that valence bond theory cannot?",
        options: ["Its colour", "Its paramagnetism (unpaired electrons)", "Its boiling point", "Its density"],
        correctAnswer: 1,
        explanation: "MO theory shows O₂ has two unpaired electrons in antibonding π* orbitals, correctly explaining its paramagnetic behaviour, which simple valence bond theory (with all electrons paired) cannot.",
      },
      {
        question: "The anomalously high boiling point of water compared to H₂S is due to:",
        options: ["Covalent bonding", "Ionic bonding", "Hydrogen bonding", "Metallic bonding"],
        correctAnswer: 2,
        explanation: "Water molecules are held together by extensive intermolecular hydrogen bonding (O-H...O), which requires extra energy to break, raising the boiling point well above what would be expected from molar mass trends alone.",
      },
      {
        question: "In a double covalent bond (e.g. C=C), the two bonds consist of:",
        options: ["Two sigma bonds", "Two pi bonds", "One sigma and one pi bond", "One ionic and one covalent bond"],
        correctAnswer: 2,
        explanation: "A double bond is always made up of one strong sigma bond (head-on overlap) and one weaker pi bond (sideways overlap).",
      },
      {
        question: "Ice is less dense than liquid water mainly because:",
        options: [
          "Ice contains air bubbles only",
          "Hydrogen bonding creates an open, rigid lattice in ice that occupies more volume",
          "Water molecules are smaller in ice",
          "Ice has fewer hydrogen atoms",
        ],
        correctAnswer: 1,
        explanation: "In ice, hydrogen bonds hold water molecules in a rigid, open hexagonal lattice that occupies more space than the more compactly packed structure of liquid water, so ice is less dense and floats.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define a covalent bond.",
        answer: "A covalent bond is formed by the mutual sharing of an electron pair between two atoms, so that both atoms attain a stable, complete outer shell (octet or duplet).",
      },
      {
        marks: 1,
        question: "What is meant by the dipole moment of a molecule?",
        answer: "The dipole moment is a measure of the polarity of a molecule; it is the vector sum of all the individual bond dipole moments, and is measured in debye (D).",
      },
      {
        marks: 2,
        question: "Distinguish between a sigma (σ) bond and a pi (π) bond.",
        answer:
          "A **sigma bond** is formed by the head-on (axial) overlap of atomic orbitals along the internuclear axis and permits free rotation around the bond. A **pi bond** is formed by the sideways (lateral) overlap of parallel, unhybridised p-orbitals, lies above and below the internuclear axis, and restricts rotation around the bond.",
      },
      {
        marks: 2,
        question: "Why does NH₃ have a pyramidal shape rather than a perfect tetrahedral shape?",
        answer:
          "Nitrogen in NH₃ has 4 electron pairs around it — 3 bond pairs (to H) and 1 lone pair. Although the electron pair arrangement is roughly tetrahedral, the molecular shape (considering only the atoms) is pyramidal, because the lone pair, which occupies more space and repels the bond pairs more strongly, is not counted when describing the shape. This lone pair-bond pair repulsion also compresses the H-N-H angle to about 107° (from the ideal 109.5°).",
      },
      {
        marks: 2,
        question: "Explain why solid NaCl does not conduct electricity, but molten NaCl or an aqueous NaCl solution does.",
        answer:
          "In solid NaCl, the Na⁺ and Cl⁻ ions are held in fixed positions in a rigid crystal lattice, so they cannot move to carry electric current. When NaCl is melted or dissolved in water, the ions become free to move throughout the liquid/solution, and this mobility of charged ions allows the substance to conduct electricity.",
      },
      {
        marks: 3,
        question: "State the main postulates of VSEPR theory and use it to predict the shape of BeCl₂.",
        answer:
          "VSEPR theory states that: (i) the shape of a molecule depends on the number of electron pairs (bonding and lone) around the central atom; (ii) these electron pairs arrange themselves as far apart as possible to minimise repulsion; (iii) the order of repulsion is lone pair-lone pair > lone pair-bond pair > bond pair-bond pair, so lone pairs distort ideal angles.\nIn BeCl₂, beryllium has only 2 bond pairs and no lone pairs, so the two Cl atoms arrange themselves as far apart as possible — giving a **linear** shape with a bond angle of 180°.",
      },
      {
        marks: 3,
        question: "What is hybridisation? Describe sp², sp³ hybridisation with one example each.",
        answer:
          "Hybridisation is the mixing of atomic orbitals of similar energy on the same atom to form new, equivalent hybrid orbitals with definite shapes, used for stronger, more directional covalent bonding.\n**sp² hybridisation** mixes 1 s and 2 p orbitals to give 3 hybrid orbitals arranged in a trigonal planar shape (120° apart), e.g. in BF₃.\n**sp³ hybridisation** mixes 1 s and 3 p orbitals to give 4 hybrid orbitals arranged tetrahedrally (109.5° apart), e.g. in CH₄.",
      },
      {
        marks: 3,
        question: "What is a hydrogen bond? State the conditions necessary for its formation and give one example of intermolecular hydrogen bonding.",
        answer:
          "A hydrogen bond is a weak electrostatic attraction between a hydrogen atom (already covalently bonded to a highly electronegative atom) and a lone pair on another highly electronegative atom nearby.\n**Conditions:** hydrogen must be bonded to a small, highly electronegative atom — usually F, O or N.\n**Example:** in liquid water, the H atom of one water molecule (bonded to O) is attracted to a lone pair on the O atom of a neighbouring water molecule — O-H...O hydrogen bonding, which is why water has an unusually high boiling point.",
      },
      {
        marks: 5,
        question:
          "(a) Explain, using Lewis structures/electron transfer, how the ionic bond in MgCl₂ is formed. (b) List three general properties of ionic compounds.",
        answer:
          "(a) Magnesium (2, 8, 2) loses its two valence electrons to attain the stable configuration of neon (2, 8), forming Mg²⁺. Each of two chlorine atoms (2, 8, 7) gains one electron to attain the stable configuration of argon (2, 8, 8), forming Cl⁻. The resulting Mg²⁺ ion and two Cl⁻ ions are held together by strong electrostatic attraction, forming the ionic compound MgCl₂.\n(b) Ionic compounds: (i) exist as a rigid crystal lattice and are hard and brittle; (ii) have high melting and boiling points, since a large amount of energy is needed to overcome the strong electrostatic forces between ions; (iii) conduct electricity in the molten state or in aqueous solution (where ions are free to move), but not in the solid state.",
      },
      {
        marks: 5,
        question:
          "(a) Explain why CO₂ is non-polar while H₂O is polar, even though both contain polar bonds. (b) Sketch/describe the shape of each molecule to justify your answer.",
        answer:
          "(a) Although both C=O bonds in CO₂ and both O-H bonds in H₂O are individually polar (oxygen being more electronegative in each case), the overall (net) dipole moment of a molecule depends on both bond polarity and molecular shape/symmetry. In CO₂, the two identical C=O bond dipoles point in exactly opposite directions and cancel each other out, giving a net dipole moment of zero (non-polar). In H₂O, the two O-H bond dipoles do not point in opposite directions (they are at an angle of ~104.5° to each other because of the bent shape), so they do not cancel, giving H₂O a net dipole moment (μ ≈ 1.84 D) and making it polar.\n(b) CO₂: **linear** shape, O=C=O, 180° bond angle — dipoles cancel. H₂O: **bent/angular** shape, with two lone pairs on oxygen forcing a ~104.5° H-O-H angle — dipoles do not cancel.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 5 — STATES OF MATTER
  // ================================================================
  {
    id: "states-of-matter",
    number: 5,
    title: "States of Matter",
    subtitle: "The gas laws, kinetic theory, and why real gases don't quite behave ideally",
    description:
      "The gas laws (Boyle's, Charles's, Gay-Lussac's and Avogadro's), the ideal gas equation, kinetic molecular theory, real gas behaviour and deviations, critical phenomena, and liquid state properties like viscosity and surface tension.",
    icon: "💨",
    color: "iris",
    readingTime: "26 min read",
    videos: [
      {
        title: "States of Matter — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/hlIiuh4EIgk",
      },
      {
        title: "Gas Laws Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/4dsanCJZQ7k",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/O9GkPQyBIUU",
      },
    ],
    notes: `
# States of Matter

## Intermolecular Forces

Matter exists in three common physical states — solid, liquid and gas — depending on the balance between the **intermolecular forces of attraction** (which hold particles together) and the **thermal energy** of the particles (which makes them move apart).

**Van der Waals forces** include dipole-dipole forces (between polar molecules), dipole-induced dipole forces, and London dispersion forces (temporary, induced dipoles present in all molecules, including non-polar ones). **Hydrogen bonding** is a special, stronger case of dipole-dipole attraction seen when H is bonded to F, O or N.

## The Gaseous State

Gases are characterised by having **no fixed shape or volume**, being highly compressible, exerting pressure equally in all directions, and mixing completely with one another (diffusion).

### The Gas Laws

**Boyle's Law:** at constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure.
p₁V₁ = p₂V₂  (at constant T, n)

**Charles's Law:** at constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute (Kelvin) temperature.
V₁/T₁ = V₂/T₂  (at constant p, n)

> [!key] **Absolute zero** (0 K = −273.15 °C) is the theoretical temperature at which the volume of an ideal gas would become zero — all molecular motion is thought to cease. This is why the Kelvin scale is used in all gas law calculations.

**Gay Lussac's Law:** at constant volume, the pressure of a fixed mass of gas is directly proportional to its absolute temperature.
p₁/T₁ = p₂/T₂  (at constant V, n)

**Avogadro's Law:** equal volumes of all gases, under the same conditions of temperature and pressure, contain an equal number of molecules; V ∝ n (at constant T, p).

::diagram:gas-law-graphs

### The Ideal Gas Equation
Combining the four gas laws gives the **ideal gas equation**:

pV = nRT

where R is the universal gas constant (0.0821 L atm K⁻¹ mol⁻¹, or 8.314 J K⁻¹ mol⁻¹). This equation is also called the **equation of state**, since it relates all four variables (p, V, n, T) that define the state of a gas.

**Dalton's Law of Partial Pressures:** the total pressure of a mixture of non-reacting gases is the sum of the partial pressures of the individual gases: p(total) = p₁ + p₂ + p₃ + ...

p₁ = x₁ × p(total)

where x₁ is the mole fraction of gas 1.

## Kinetic Molecular Theory of Gases

1. Gases consist of a large number of tiny particles (atoms/molecules) that are far apart, so the actual volume of the molecules is negligible compared to the total volume of the gas.
2. There is **no force of attraction** between the particles of an ideal gas.
3. Particles are in **constant, random motion**, colliding with each other and with the walls of the container.
4. Collisions are **perfectly elastic** — there is no net loss of kinetic energy during a collision.
5. At any given temperature, the **average kinetic energy** of gas molecules is the same for all gases and is directly proportional to the absolute temperature.

**Distribution of molecular speeds.** At any temperature the molecules of a gas do not all move at the same speed: collisions constantly redistribute energy, so there is a spread of speeds described by the Maxwell–Boltzmann distribution. Raising the temperature moves the peak (the most probable speed) to a higher value and flattens and widens the curve, while the total area — the number of molecules — stays the same.

::diagram:maxwell-boltzmann

## Real Gases and Deviation from Ideal Behaviour

Real gases deviate from ideal behaviour, especially at **high pressure and low temperature**, because the kinetic theory's assumptions (no intermolecular forces, negligible molecular volume) break down under these conditions — at high pressure molecules are pushed close together (volume is no longer negligible) and at low temperature the reduced kinetic energy allows intermolecular attractions to become significant.

**Compressibility factor,** Z = pV/nRT. For an ideal gas, Z = 1 at all conditions. For real gases, Z deviates from 1 (Z < 1 indicates attractive forces dominate, making the gas more compressible than ideal; Z > 1 indicates the finite molecular volume dominates, at very high pressure).

**Van der Waals equation** corrects the ideal gas equation for the finite volume of molecules and the intermolecular forces of attraction:

(p + an²/V²)(V − nb) = nRT

where 'a' accounts for intermolecular attraction and 'b' accounts for the finite volume of the molecules.

## Liquefaction of Gases and Critical Phenomena

Every gas has a **critical temperature (Tc)**, above which it cannot be liquefied no matter how much pressure is applied. The pressure required to liquefy a gas exactly at its critical temperature is called the **critical pressure (Pc)**.

## Liquid State

Liquids have a **definite volume but no fixed shape** (they take the shape of their container), are much less compressible than gases, and diffuse more slowly.

- **Vapour pressure** — the pressure exerted by the vapour in equilibrium with its liquid at a given temperature; it increases with temperature.
- **Boiling point** — the temperature at which the vapour pressure of a liquid becomes equal to the external (atmospheric) pressure.
- **Surface tension** — the force acting per unit length perpendicular to a line drawn on the surface of a liquid, arising because surface molecules experience a net inward pull (they have fewer neighbours than molecules in the bulk); this is why liquid droplets tend to be spherical (minimising surface area), and why surface tension decreases as temperature increases.
- **Viscosity** — a measure of a liquid's resistance to flow, arising from intermolecular forces between adjacent layers of the liquid moving at different velocities; viscosity generally decreases as temperature increases (molecules move faster, weakening the effect of intermolecular forces).
    `,
    experiments: [
      {
        id: "boyles-law-syringe",
        title: "Verifying Boyle's Law with a Syringe",
        aim: "To verify that the volume of a fixed mass of gas is inversely proportional to pressure at constant temperature.",
        materials: ["A sealed gas-tight syringe with a pressure gauge (or a simple syringe with a sealed nozzle)", "A stand to hold weights on the plunger", "A set of known weights"],
        procedure: [
          "Trap a fixed volume of air in the syringe by sealing the nozzle, and record the initial volume at atmospheric pressure.",
          "Add known weights on top of the plunger to increase the pressure on the trapped gas, and record the new (reduced) volume for each added weight.",
          "Plot the recorded pressure (p) against 1/volume (1/V).",
        ],
        observation: "As pressure increases, the volume of the trapped air decreases. A plot of p versus 1/V gives a straight line passing through the origin.",
        conclusion:
          "Since p is directly proportional to 1/V (a straight line through the origin), the product pV remains constant at constant temperature — confirming Boyle's Law.",
        visual: {
          before: "hsl(200 20% 90%)",
          after: "hsl(200 20% 90%)",
          labels: { before: "Larger trapped volume, low pressure", after: "Smaller volume under added weight" },
        },
      },
      {
        id: "charles-law-balloon",
        title: "Demonstrating Charles's Law with a Balloon",
        aim: "To show that the volume of a fixed mass of gas increases with temperature at constant pressure.",
        materials: ["A partially inflated balloon", "A container of hot water", "A container of ice-cold water", "A ruler or measuring tape"],
        procedure: [
          "Measure and record the circumference/diameter of a partially inflated balloon at room temperature.",
          "Place the balloon in a container of hot water for a few minutes and measure its new size.",
          "Then place the same balloon in ice-cold water and measure its size again.",
        ],
        observation: "The balloon visibly expands in hot water (larger diameter) and shrinks/contracts in ice-cold water (smaller diameter).",
        conclusion:
          "The volume of the trapped gas (air) inside the balloon increases as its absolute temperature increases and decreases as temperature decreases, at roughly constant (atmospheric) pressure — a direct demonstration of Charles's Law, V ∝ T.",
        safety: "Handle hot water carefully to avoid burns.",
        visual: {
          before: "hsl(200 40% 88%)",
          after: "hsl(0 55% 60%)",
          thermal: "exothermic",
          labels: { before: "Balloon at room temperature", after: "Expanded after warming in hot water" },
        },
      },
      {
        id: "gay-lussac-pressure-cooker",
        title: "Observing Gay Lussac's Law in a Pressure Cooker",
        aim: "To relate the rise in pressure inside a sealed container on heating (at constant volume) to Gay Lussac's Law (conceptual/observational, using a pressure cooker's whistle as the indicator).",
        materials: ["A pressure cooker with a weighted whistle valve (kitchen demonstration, or a diagram/video if not practical in a lab)", "A stove/heat source"],
        procedure: [
          "Seal a fixed amount of air and steam inside the pressure cooker (constant volume) and place it on a heat source.",
          "Observe as the temperature rises: note when the whistle valve first lifts and releases gas (indicating the internal pressure has reached the valve's threshold).",
          "Note that removing the cooker from heat and letting it cool causes the pressure to drop again, without the valve lifting.",
        ],
        observation: "As the sealed cooker is heated, pressure builds up steadily until it is high enough to lift the whistle valve and release gas with a whistling sound; pressure drops again on cooling.",
        conclusion:
          "At constant volume, the pressure of a fixed mass of gas increases directly with its absolute temperature, exactly as predicted by Gay Lussac's Law (p ∝ T) — this is also the safety principle behind the pressure-release whistle valve.",
        safety: "This should only be observed as a normal kitchen/demonstration use of a pressure cooker under supervision — never seal a rigid container without a pressure-release mechanism.",
        visual: {
          before: "hsl(210 10% 60%)",
          after: "hsl(210 10% 60%)",
          gas: "Steam",
          thermal: "endothermic",
          labels: { before: "Sealed cooker, heating begins", after: "Whistle lifts as pressure rises" },
        },
      },
      {
        id: "diffusion-of-gases",
        title: "Comparing the Rate of Diffusion of Two Gases",
        aim: "To observe that lighter gas molecules diffuse faster than heavier ones, illustrating Graham's law of diffusion (related to kinetic theory).",
        materials: ["A long glass tube", "Cotton wool plugs", "Concentrated ammonia solution (NH₃, lighter gas)", "Concentrated hydrochloric acid (HCl, heavier gas)"],
        procedure: [
          "Soak one cotton plug in concentrated ammonia solution and another in concentrated hydrochloric acid.",
          "Simultaneously insert the ammonia-soaked plug at one end of a long dry glass tube and the HCl-soaked plug at the other end.",
          "Observe where a white ring (ammonium chloride smoke) first forms inside the tube.",
        ],
        observation: "A white ring of ammonium chloride (NH₄Cl) smoke forms closer to the hydrochloric acid end of the tube, not at the midpoint.",
        reaction: "NH₃(g) + HCl(g) → NH₄Cl(s) (white smoke)",
        conclusion:
          "Since ammonia (M = 17 g/mol) is lighter than hydrogen chloride (M = 36.5 g/mol), it diffuses faster and travels a greater distance in the same time, so the two gases meet closer to the HCl end — consistent with the kinetic theory prediction that lighter molecules move faster at a given temperature.",
        visual: {
          before: "hsl(40 15% 96%)",
          after: "hsl(40 15% 96%)",
          gas: "Ammonium chloride smoke",
          labels: { before: "NH₃ and HCl vapours released", after: "White ring forms nearer the HCl end" },
        },
      },
      {
        id: "surface-tension-needle-float",
        title: "Floating a Needle on Water — Demonstrating Surface Tension",
        aim: "To demonstrate surface tension by floating a denser-than-water object on the surface of water.",
        materials: ["A steel sewing needle", "A shallow dish of water", "A small piece of tissue paper", "Liquid soap (optional, to break the effect)"],
        procedure: [
          "Carefully place a small piece of tissue paper flat on the surface of water in the dish.",
          "Gently place the needle on top of the floating tissue paper.",
          "Using another needle or a pin, carefully push the tissue paper down and away from under the needle until it sinks, leaving the needle floating alone.",
          "Add a drop of liquid soap to the water surface at the edge of the dish and observe what happens to the floating needle.",
        ],
        observation:
          "The steel needle, despite being much denser than water, floats on the surface, slightly depressing it without breaking through. Adding soap reduces the surface tension, and the needle promptly sinks.",
        conclusion:
          "The surface of water behaves like a stretched elastic membrane due to surface tension (the net inward pull on surface molecules from unbalanced intermolecular forces), which can support the weight of a small, dense object if it is not broken through. Soap molecules disrupt hydrogen bonding at the surface, lowering the surface tension and causing the needle to sink.",
        visual: {
          before: "hsl(200 45% 85%)",
          after: "hsl(200 45% 85%)",
          labels: { before: "Needle resting on the water surface", after: "Sinks once soap lowers surface tension" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Boyle's Law states that, at constant temperature:",
        options: [
          "Volume is directly proportional to pressure",
          "Volume is inversely proportional to pressure",
          "Pressure is directly proportional to temperature",
          "Volume is independent of pressure",
        ],
        correctAnswer: 1,
        explanation: "Boyle's Law: at constant temperature and amount of gas, V ∝ 1/p, so p₁V₁ = p₂V₂.",
      },
      {
        question: "Absolute zero on the Kelvin scale corresponds to which Celsius temperature?",
        options: ["0 °C", "100 °C", "−273.15 °C", "−100 °C"],
        correctAnswer: 2,
        explanation: "Absolute zero, 0 K, is equal to −273.15 °C — the theoretical temperature at which an ideal gas's volume would become zero.",
      },
      {
        question: "The ideal gas equation is:",
        options: ["pV = nRT", "pT = nRV", "nV = pRT", "p/V = nRT"],
        correctAnswer: 0,
        explanation: "The ideal gas equation, combining Boyle's, Charles's, Gay Lussac's and Avogadro's laws, is pV = nRT.",
      },
      {
        question: "According to kinetic molecular theory, collisions between ideal gas molecules are assumed to be:",
        options: ["Perfectly inelastic", "Perfectly elastic", "Always attractive", "Non-existent"],
        correctAnswer: 1,
        explanation: "Kinetic theory assumes collisions between gas molecules (and with the container walls) are perfectly elastic, meaning there is no net loss of kinetic energy.",
      },
      {
        question: "Real gases deviate most from ideal behaviour under conditions of:",
        options: ["Low pressure and high temperature", "High pressure and low temperature", "Standard temperature and pressure only", "Any pressure, at absolute zero"],
        correctAnswer: 1,
        explanation: "At high pressure, molecular volume is no longer negligible, and at low temperature, intermolecular attractions become significant — both cause real gases to deviate from ideal behaviour.",
      },
      {
        question: "In the van der Waals equation, the constant 'b' accounts for:",
        options: ["Intermolecular attraction", "The finite volume occupied by gas molecules", "The temperature of the gas", "The number of moles"],
        correctAnswer: 1,
        explanation: "The constant 'b' in the van der Waals equation corrects for the actual (finite) volume occupied by the gas molecules themselves, which ideal gas theory assumes to be negligible.",
      },
      {
        question: "The compressibility factor Z for an ideal gas is always:",
        options: ["0", "1", "Greater than 1", "Less than 1"],
        correctAnswer: 1,
        explanation: "For an ideal gas, Z = pV/nRT = 1 under all conditions of temperature and pressure; deviations from 1 indicate non-ideal (real gas) behaviour.",
      },
      {
        question: "The critical temperature of a gas is defined as the temperature:",
        options: [
          "Below which the gas cannot exist",
          "Above which the gas cannot be liquefied by pressure alone",
          "At which the gas becomes an ideal gas",
          "At which surface tension becomes zero",
        ],
        correctAnswer: 1,
        explanation: "The critical temperature is the temperature above which a gas cannot be liquefied, no matter how much pressure is applied.",
      },
      {
        question: "Surface tension of a liquid generally _____ as temperature increases.",
        options: ["Increases", "Decreases", "Stays exactly constant", "Becomes negative"],
        correctAnswer: 1,
        explanation: "As temperature rises, increased kinetic energy of molecules weakens the net inward intermolecular attraction at the surface, so surface tension decreases.",
      },
      {
        question: "Which gas law explains why a balloon shrinks when placed in liquid nitrogen (very cold)?",
        options: ["Boyle's Law", "Charles's Law", "Avogadro's Law", "Dalton's Law"],
        correctAnswer: 1,
        explanation: "Charles's Law (V ∝ T at constant pressure) predicts that the volume of trapped gas decreases sharply as temperature drops, causing the balloon to shrink.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "State Avogadro's Law.",
        answer: "Equal volumes of all gases, at the same temperature and pressure, contain an equal number of molecules.",
      },
      {
        marks: 1,
        question: "Define vapour pressure.",
        answer: "Vapour pressure is the pressure exerted by the vapour of a liquid when it is in dynamic equilibrium with the liquid, at a given temperature.",
      },
      {
        marks: 2,
        question: "Write the ideal gas equation and name each term.",
        answer:
          "pV = nRT, where p = pressure, V = volume, n = number of moles of gas, R = universal gas constant, and T = absolute (Kelvin) temperature.",
      },
      {
        marks: 2,
        question: "State Dalton's Law of Partial Pressures with its mathematical expression.",
        answer:
          "Dalton's Law states that the total pressure exerted by a mixture of non-reacting gases is equal to the sum of the partial pressures of the individual gases: p(total) = p₁ + p₂ + p₃ + ... The partial pressure of a component can also be found using its mole fraction: p₁ = x₁ × p(total).",
      },
      {
        marks: 2,
        question: "Why do real gases deviate from ideal gas behaviour?",
        answer:
          "The kinetic theory assumes gas molecules have negligible volume and no intermolecular forces of attraction — assumptions that break down for real gases, especially at high pressure (where molecular volume is no longer negligible) and low temperature (where intermolecular attractions become significant relative to the reduced kinetic energy), causing real gases to deviate from the ideal gas equation.",
      },
      {
        marks: 3,
        question: "State the postulates of the kinetic molecular theory of gases (any three).",
        answer:
          "1. Gases consist of tiny particles that are far apart, so the actual volume of molecules is negligible compared to the total gas volume.\n2. There is no force of attraction between the particles of an ideal gas.\n3. Gas particles are in constant, random motion, and collisions between them (and with the container walls) are perfectly elastic (no net loss of kinetic energy).",
      },
      {
        marks: 3,
        question: "Explain the terms viscosity and surface tension, and state how each changes with temperature.",
        answer:
          "**Viscosity** is a measure of a liquid's resistance to flow, arising from intermolecular forces between adjacent layers of liquid moving past each other; it generally decreases as temperature increases, since molecules gain kinetic energy and intermolecular attractions have less effect. **Surface tension** is the force per unit length acting on the surface of a liquid, arising because surface molecules experience a net inward pull; it also generally decreases as temperature increases, for the same reason.",
      },
      {
        marks: 3,
        question: "Write the van der Waals equation for n moles of a real gas and explain what the constants 'a' and 'b' represent.",
        answer:
          "The van der Waals equation is: (p + an²/V²)(V − nb) = nRT.\nThe constant **'a'** corrects the pressure term for the intermolecular forces of attraction between gas molecules (which reduce the pressure the gas actually exerts compared to an ideal gas). The constant **'b'** corrects the volume term for the finite volume actually occupied by the gas molecules themselves (the volume available for the gas to move in is less than the total container volume).",
      },
      {
        marks: 5,
        question:
          "(a) State Boyle's Law, Charles's Law and Gay Lussac's Law with their mathematical expressions. (b) Show how these three laws combine to give the ideal gas equation.",
        answer:
          "(a) **Boyle's Law** (constant T, n): V ∝ 1/p, i.e. pV = constant.\n**Charles's Law** (constant p, n): V ∝ T, i.e. V/T = constant.\n**Gay Lussac's Law** (constant V, n): p ∝ T, i.e. p/T = constant.\n(b) Combining Boyle's Law (V ∝ 1/p) and Charles's Law (V ∝ T) gives V ∝ T/p. Including Avogadro's Law (V ∝ n at constant T, p) gives V ∝ nT/p, or V = R(nT/p) for some proportionality constant R (the universal gas constant). Rearranging gives the ideal gas equation, **pV = nRT**, which combines all four gas laws into one equation of state.",
      },
      {
        marks: 5,
        question:
          "(a) Explain what is meant by the compressibility factor, Z, and how its value indicates the nature of deviation from ideal behaviour. (b) Briefly explain why gases like H₂ and He show very little deviation from ideal behaviour even at moderately high pressures.",
        answer:
          "(a) The compressibility factor is Z = pV/nRT. For an ideal gas, Z = 1 under all conditions. For a real gas, Z ≠ 1: if **Z < 1**, the gas is more compressible than an ideal gas, meaning intermolecular attractive forces dominate (this is typically seen at low to moderate pressures). If **Z > 1**, the gas is less compressible than ideal, meaning the finite volume of the molecules dominates (this is typically seen at very high pressures).\n(b) H₂ and He have very small molecular size and extremely weak intermolecular forces of attraction (very small van der Waals 'a' values), so even under conditions where other gases show significant deviation, these two gases remain close to ideal behaviour across a wide pressure range.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 6 — THERMODYNAMICS
  // ================================================================
  {
    id: "thermodynamics",
    number: 6,
    title: "Thermodynamics",
    subtitle: "Energy, heat and why some reactions happen on their own and others don't",
    description:
      "System and surroundings, the first law of thermodynamics, internal energy and enthalpy, heat capacity, Hess's law, enthalpies of reaction, spontaneity, entropy, Gibbs energy, and the criteria for equilibrium.",
    icon: "🔥",
    color: "moss",
    readingTime: "29 min read",
    videos: [
      {
        title: "Thermodynamics — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/0h1WQGdOatI",
      },
      {
        title: "Enthalpy, Entropy and Gibbs Energy Explained",
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
# Thermodynamics

## Basic Concepts

**Thermodynamics** deals with the study of energy changes accompanying physical and chemical processes, and predicting whether a process can occur under a given set of conditions.

- **System** — the part of the universe under study. **Surroundings** — everything else. Together, system + surroundings = the **universe**.
- **Types of systems:** an **open system** exchanges both matter and energy with the surroundings; a **closed system** exchanges only energy (not matter); an **isolated system** exchanges neither matter nor energy.
- **State functions** — properties that depend only on the current state of the system, not on the path taken to reach that state (e.g. internal energy, enthalpy, entropy). **Path functions** depend on the path taken (e.g. heat, work).

## The First Law of Thermodynamics

> [!key] Energy can neither be created nor destroyed, although it can be converted from one form to another — this is the **Law of Conservation of Energy**, applied to thermodynamics as the First Law.

ΔU = q + w

where ΔU is the change in internal energy of the system, q is the heat absorbed by the system, and w is the work done on the system (using the convention where both heat absorbed and work done ON the system are positive).

**Work done in expansion against a constant external pressure:** w = −pₑₓₜΔV.

## Enthalpy (H)

Most chemical reactions occur at constant pressure (not constant volume), so a new state function, **enthalpy**, is defined: H = U + pV.

ΔH = ΔU + pΔV  (at constant pressure)

- **Exothermic reaction** — ΔH is **negative** (heat is released to the surroundings; the products have lower enthalpy than the reactants).
- **Endothermic reaction** — ΔH is **positive** (heat is absorbed from the surroundings; the products have higher enthalpy than the reactants).

### Heat Capacity
The amount of heat required to raise the temperature of a system by 1 K (or 1 °C).
- **Specific heat capacity (c)** — heat required to raise the temperature of 1 g of a substance by 1 K.
- **Molar heat capacity** — heat required to raise the temperature of 1 mole of a substance by 1 K. Cp (at constant pressure) is always greater than Cv (at constant volume), since some of the heat supplied at constant pressure also does expansion work.

### Enthalpy Changes of Reactions
- **Standard enthalpy of reaction (ΔrH°)** — the enthalpy change when reactants in their standard states are converted to products in their standard states.
- **Enthalpy of formation (ΔfH°)** — the enthalpy change when 1 mole of a compound is formed from its constituent elements in their standard states. By convention, the standard enthalpy of formation of any element in its most stable form is taken as **zero**.
- **Enthalpy of combustion (ΔcH°)** — the enthalpy change when 1 mole of a substance is completely burnt (combusted) in oxygen.
- **Enthalpy of neutralisation** — the enthalpy change when 1 mole of H⁺ (from an acid) reacts with 1 mole of OH⁻ (from a base) to form water. For all strong acid–strong base reactions, this value is nearly constant, about **−57.3 kJ mol⁻¹**, since the reaction is essentially the same: H⁺(aq) + OH⁻(aq) → H₂O(l).
- **Bond enthalpy** — the average energy required to break one mole of a particular type of bond in the gaseous state.

### Hess's Law of Constant Heat Summation
> [!key] If a reaction takes place in several steps, its standard enthalpy change is the **sum of the standard enthalpy changes of the individual steps**, regardless of the actual path taken — because enthalpy is a state function.

This allows the enthalpy of a reaction that is difficult to measure directly (e.g. C(s) + ½O₂(g) → CO(g)) to be calculated indirectly by combining the enthalpies of other, easily measured reactions.

## Spontaneity

A **spontaneous process** is one that occurs on its own, without any external influence (though it may need to be given an initial push, like activation energy). Not every exothermic process is spontaneous, and not every spontaneous process is exothermic — spontaneity depends on both enthalpy AND entropy.

### Entropy (S)
**Entropy** is a measure of the **degree of randomness or disorder** of a system. The **Second Law of Thermodynamics** states that the entropy of the universe always increases for a spontaneous process: ΔS(universe) = ΔS(system) + ΔS(surroundings) > 0.

- Entropy generally increases: solid → liquid → gas (increasing disorder).
- Dissolving a solute, or a reaction that produces more moles of gas, generally increases entropy.

### Gibbs Free Energy (G)
Since it's inconvenient to always calculate the entropy change of the surroundings, **Gibbs free energy** combines enthalpy and entropy changes of the system alone into a single criterion for spontaneity, at constant temperature and pressure:

ΔG = ΔH − TΔS

| ΔG | Spontaneity |
|---|---|
| ΔG < 0 | Spontaneous (in the forward direction) |
| ΔG > 0 | Non-spontaneous (spontaneous in the reverse direction) |
| ΔG = 0 | System is at equilibrium |

**Effect of temperature on spontaneity**, based on the signs of ΔH and ΔS:

| ΔH | ΔS | ΔG = ΔH − TΔS | Spontaneity |
|---|---|---|---|
| − | + | Always negative | Always spontaneous |
| + | − | Always positive | Never spontaneous |
| − | − | Negative at low T | Spontaneous only at low temperature |
| + | + | Negative at high T | Spontaneous only at high temperature |

### Third Law of Thermodynamics
The entropy of a perfectly crystalline substance at absolute zero (0 K) is taken as **zero**, providing a reference point for calculating absolute entropy values at other temperatures.
    `,
    experiments: [
      {
        id: "exothermic-endothermic-classification",
        title: "Classifying Reactions as Exothermic or Endothermic",
        aim: "To classify a set of common reactions/processes as exothermic or endothermic by measuring temperature change.",
        materials: ["A thermometer", "Test tubes", "Dilute NaOH and dilute HCl", "Ammonium chloride (or ammonium nitrate) solid", "Water", "Calcium oxide (quick lime)"],
        procedure: [
          "Record the initial temperature of water in a test tube, then dissolve ammonium chloride in it and record the temperature again.",
          "In a separate test tube, mix dilute NaOH and dilute HCl, recording the temperature before and after mixing.",
          "Add a small amount of calcium oxide to water in another test tube and record the temperature before and after.",
        ],
        observation:
          "The temperature drops when ammonium chloride dissolves in water. The temperature rises noticeably when NaOH and HCl are mixed, and rises sharply when CaO is added to water.",
        reaction: "NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l) ; CaO(s) + H₂O(l) → Ca(OH)₂(aq) + heat",
        conclusion:
          "Dissolving ammonium chloride is an endothermic process (heat is absorbed from the surroundings, lowering temperature). Neutralisation of NaOH with HCl, and the reaction of CaO with water (slaking of lime), are both exothermic processes (heat is released, raising temperature) — direct calorimetric evidence for classifying processes by the sign of ΔH.",
        visual: {
          before: "hsl(200 30% 88%)",
          after: "hsl(0 55% 60%)",
          thermal: "exothermic",
          labels: { before: "NaOH and HCl before mixing", after: "Temperature rises on mixing" },
        },
      },
      {
        id: "calorimetry-heat-of-neutralisation",
        title: "Measuring the Enthalpy of Neutralisation Using a Simple Calorimeter",
        aim: "To determine the approximate enthalpy of neutralisation of a strong acid with a strong base.",
        materials: ["A simple calorimeter (an insulated cup, e.g. a polystyrene cup)", "A thermometer", "Dilute HCl (1 M)", "Dilute NaOH (1 M)", "A measuring cylinder"],
        procedure: [
          "Measure a known volume of 1 M HCl into the calorimeter and record its initial temperature.",
          "Measure an equal volume of 1 M NaOH and record its initial temperature (should be close to the acid's).",
          "Quickly add the NaOH to the HCl in the calorimeter, stir gently, and record the maximum (highest) temperature reached.",
        ],
        observation: "The temperature of the mixture rises noticeably above the average initial temperature of the two solutions, then gradually falls back towards room temperature.",
        reaction: "H⁺(aq) + OH⁻(aq) → H₂O(l), ΔH ≈ −57.3 kJ mol⁻¹",
        conclusion:
          "Using the temperature rise, the mass of solution and its specific heat capacity, the heat released can be calculated (q = mcΔT) and used to estimate the molar enthalpy of neutralisation, which should be close to the accepted value of about −57.3 kJ per mole of water formed — since neutralisation of any strong acid with any strong base is essentially the same net ionic reaction.",
        visual: {
          before: "hsl(200 30% 90%)",
          after: "hsl(0 50% 65%)",
          thermal: "exothermic",
          labels: { before: "Acid and base, room temperature", after: "Temperature peaks after mixing" },
        },
      },
      {
        id: "hess-law-verification",
        title: "Verifying Hess's Law with an Indirect Enthalpy Measurement",
        aim: "To verify Hess's Law by measuring the enthalpy of a reaction via two different paths and comparing the results.",
        materials: ["Solid NaOH", "Solid/pellets of NaOH pre-dissolved solution", "Dilute HCl", "A calorimeter and thermometer"],
        procedure: [
          "Path 1 (direct): dissolve solid NaOH directly in dilute HCl in the calorimeter, and measure the total temperature rise.",
          "Path 2 (indirect, two steps): first dissolve the same mass of solid NaOH in water alone, recording the temperature rise (enthalpy of solution); then add dilute HCl to this NaOH solution, recording the further temperature rise (enthalpy of neutralisation).",
          "Add together the two temperature-rise-derived enthalpies from Path 2, and compare the total to the single value measured in Path 1.",
        ],
        observation:
          "The total enthalpy change calculated by adding the two steps of Path 2 (dissolution + neutralisation) is found to be very close to the enthalpy change measured directly in Path 1 (solid NaOH + HCl in one step).",
        conclusion:
          "Since the overall enthalpy change is the same whether solid NaOH reacts with HCl directly, or NaOH is first dissolved and then neutralised, this confirms Hess's Law — the total enthalpy change of a reaction depends only on the initial and final states, not on the path or number of steps taken.",
        visual: {
          before: "hsl(200 30% 90%)",
          after: "hsl(0 50% 65%)",
          thermal: "exothermic",
          labels: { before: "Two different reaction paths set up", after: "Both paths give the same total ΔH" },
        },
      },
      {
        id: "entropy-dissolution-demo",
        title: "Observing an Increase in Entropy — Spontaneous Dissolution and Mixing",
        aim: "To relate the spontaneous mixing/dissolution of substances to an increase in entropy (disorder).",
        materials: ["A crystal of potassium permanganate (KMnO₄)", "A beaker of water (undisturbed, no stirring)", "Two gas jars (one with a coloured gas like bromine vapour, one empty, separated by a cover)"],
        procedure: [
          "Drop a single crystal of KMnO₄ into a large beaker of still water without stirring, and observe over several minutes.",
          "Separately, describe/observe (or view a video of) two gas jars — one containing bromine vapour, the other empty — placed mouth to mouth with the separating cover removed.",
        ],
        observation:
          "The purple colour from the KMnO₄ crystal slowly spreads outward through the water on its own, without any stirring, until the whole beaker becomes uniformly (faintly) coloured. Similarly, bromine vapour spontaneously spreads into the empty jar until both jars have a uniform colour.",
        conclusion:
          "Both processes occur spontaneously in the direction of greater disorder (dissolved ions/molecules spread randomly through a larger volume) rather than the reverse (which would require the dye or gas to spontaneously concentrate back into one region) — this illustrates that entropy (disorder) of an isolated/closed system tends to increase spontaneously, consistent with the Second Law of Thermodynamics.",
        visual: {
          before: "hsl(300 60% 30%)",
          after: "hsl(300 30% 85%)",
          labels: { before: "Concentrated KMnO₄ crystal", after: "Colour spreads through, becomes uniform" },
        },
      },
      {
        id: "spontaneity-temperature-dependence",
        title: "Demonstrating Temperature-Dependent Spontaneity",
        aim: "To show, using the melting of ice, that spontaneity can depend on temperature (ΔG = ΔH − TΔS changing sign with T).",
        materials: ["Ice cubes", "Two beakers of water — one warm, one near 0 °C (ice-cold)", "A thermometer"],
        procedure: [
          "Place an ice cube in a beaker of warm water and observe how quickly it melts.",
          "Place a similar ice cube in a beaker of ice-cold water (close to 0 °C) and observe over the same time period.",
          "Note the surrounding temperature and the presence/behaviour of ice in each case.",
        ],
        observation:
          "The ice cube melts rapidly and completely in warm water. In the ice-cold water (below or near 0 °C), the ice melts extremely slowly or not at all — sometimes the liquid water even begins to freeze around it, if the surroundings are cold enough.",
        conclusion:
          "Melting of ice (ΔH > 0, endothermic, and ΔS > 0, since liquid is more disordered than solid) is spontaneous only above 0 °C, where the TΔS term outweighs the positive ΔH, making ΔG negative. Below 0 °C, TΔS is too small to outweigh ΔH, so ΔG becomes positive, and melting is not spontaneous (instead, freezing — the reverse process — becomes spontaneous). This shows directly how the sign of ΔG, and hence spontaneity, can depend on temperature.",
        visual: {
          before: "hsl(200 30% 90%)",
          after: "hsl(200 20% 96%)",
          thermal: "endothermic",
          labels: { before: "Ice cube added to warm water", after: "Melts rapidly (spontaneous above 0 °C)" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "A system that can exchange both matter and energy with its surroundings is called:",
        options: ["A closed system", "An open system", "An isolated system", "A state function"],
        correctAnswer: 1,
        explanation: "An open system can exchange both matter and energy with its surroundings, unlike a closed system (energy only) or an isolated system (neither).",
      },
      {
        question: "The First Law of Thermodynamics is a statement of:",
        options: [
          "The law of conservation of mass",
          "The law of conservation of energy",
          "The second law of motion",
          "Le Chatelier's principle",
        ],
        correctAnswer: 1,
        explanation: "The First Law of Thermodynamics states that energy can neither be created nor destroyed, only converted from one form to another — this is the law of conservation of energy applied to thermodynamic systems.",
      },
      {
        question: "For an exothermic reaction, the sign of ΔH is:",
        options: ["Positive", "Negative", "Zero", "Cannot be determined"],
        correctAnswer: 1,
        explanation: "In an exothermic reaction, heat is released to the surroundings, so the enthalpy of the products is lower than that of the reactants, making ΔH negative.",
      },
      {
        question: "Hess's Law states that the enthalpy change of a reaction:",
        options: [
          "Depends only on the initial and final states, not the path taken",
          "Depends on the number of steps in the reaction",
          "Is always zero for a multi-step reaction",
          "Cannot be calculated indirectly",
        ],
        correctAnswer: 0,
        explanation: "Hess's Law states that since enthalpy is a state function, the total enthalpy change for a reaction is the same regardless of the number of steps or path taken to go from reactants to products.",
      },
      {
        question: "By convention, the standard enthalpy of formation of an element in its most stable state is taken as:",
        options: ["Infinity", "Negative", "Zero", "Positive and large"],
        correctAnswer: 2,
        explanation: "The standard enthalpy of formation of any element in its most stable physical state (the reference state) is defined as zero.",
      },
      {
        question: "The Second Law of Thermodynamics states that, for a spontaneous process:",
        options: [
          "The entropy of the system always decreases",
          "The entropy of the universe always increases",
          "Enthalpy always decreases",
          "Gibbs energy always increases",
        ],
        correctAnswer: 1,
        explanation: "The Second Law of Thermodynamics states that the total entropy of the universe (system + surroundings) increases for any spontaneous process.",
      },
      {
        question: "Gibbs free energy change (ΔG) is related to enthalpy and entropy by:",
        options: ["ΔG = ΔH + TΔS", "ΔG = ΔH − TΔS", "ΔG = TΔH − ΔS", "ΔG = ΔH × ΔS"],
        correctAnswer: 1,
        explanation: "The Gibbs-Helmholtz equation is ΔG = ΔH − TΔS, combining enthalpy and entropy changes of the system into a single criterion for spontaneity.",
      },
      {
        question: "A reaction with ΔH > 0 and ΔS > 0 will be spontaneous:",
        options: ["At all temperatures", "Never", "Only at high temperature", "Only at low temperature"],
        correctAnswer: 2,
        explanation: "When both ΔH and ΔS are positive, ΔG = ΔH − TΔS becomes negative (favourable) only when T is large enough for the TΔS term to outweigh ΔH — so the reaction is spontaneous only at high temperature.",
      },
      {
        question: "At equilibrium, the value of ΔG for a process is:",
        options: ["Positive", "Negative", "Zero", "Infinite"],
        correctAnswer: 2,
        explanation: "At equilibrium, there is no net driving force for change in either direction, so ΔG = 0.",
      },
      {
        question: "According to the Third Law of Thermodynamics, the entropy of a perfectly crystalline substance at 0 K is:",
        options: ["Infinite", "Negative", "Zero", "Equal to its enthalpy"],
        correctAnswer: 2,
        explanation: "The Third Law of Thermodynamics states that the entropy of a perfectly ordered, crystalline substance at absolute zero (0 K) is taken as zero.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define a state function, and name one example.",
        answer: "A state function is a property whose value depends only on the current state of the system, not on the path taken to reach it. Example: internal energy (U), enthalpy (H), or entropy (S).",
      },
      {
        marks: 1,
        question: "What is the approximate standard enthalpy of neutralisation of a strong acid with a strong base?",
        answer: "About −57.3 kJ per mole of water formed, since the reaction is essentially the same net ionic reaction, H⁺(aq) + OH⁻(aq) → H₂O(l), for any strong acid-strong base pair.",
      },
      {
        marks: 2,
        question: "State the First Law of Thermodynamics and write its mathematical expression.",
        answer:
          "The First Law of Thermodynamics states that energy can neither be created nor destroyed, only converted from one form to another (the law of conservation of energy). Mathematically, ΔU = q + w, where ΔU is the change in internal energy, q is heat absorbed by the system, and w is work done on the system.",
      },
      {
        marks: 2,
        question: "Distinguish between an exothermic and an endothermic reaction, with the sign of ΔH for each.",
        answer:
          "An **exothermic reaction** releases heat to the surroundings; its products have lower enthalpy than the reactants, so ΔH is **negative**. An **endothermic reaction** absorbs heat from the surroundings; its products have higher enthalpy than the reactants, so ΔH is **positive**.",
      },
      {
        marks: 2,
        question: "What is entropy? How does it generally change when a solid melts into a liquid?",
        answer:
          "Entropy is a measure of the degree of randomness or disorder in a system. When a solid melts into a liquid, the particles become less ordered and can move more freely, so entropy **increases** (ΔS is positive).",
      },
      {
        marks: 3,
        question: "State Hess's Law and explain its usefulness with one example.",
        answer:
          "Hess's Law states that if a reaction takes place in several steps, its overall standard enthalpy change equals the sum of the standard enthalpy changes of the individual steps, since enthalpy is a state function that depends only on initial and final states. It is useful because it allows the enthalpy of a reaction that is difficult or impossible to measure directly to be calculated indirectly. Example: the enthalpy of formation of CO(g) from C(s) and O₂(g) is hard to measure directly (since some CO₂ always also forms), but it can be found by combining the easily measurable enthalpies of combustion of C(s) to CO₂(g), and of CO(g) to CO₂(g).",
      },
      {
        marks: 3,
        question: "Explain the criteria for spontaneity of a process in terms of ΔG, with the three possible cases.",
        answer:
          "The spontaneity of a process at constant temperature and pressure is determined by the sign of ΔG = ΔH − TΔS:\n1. If **ΔG < 0**, the process is spontaneous in the forward direction.\n2. If **ΔG > 0**, the process is non-spontaneous in the forward direction (but spontaneous in the reverse direction).\n3. If **ΔG = 0**, the system is at equilibrium, with no net driving force in either direction.",
      },
      {
        marks: 3,
        question: "Why is enthalpy (H) defined, and how is it related to internal energy (U)?",
        answer:
          "Most chemical reactions and physical processes occur at constant (atmospheric) pressure rather than constant volume, and some of the energy exchanged at constant pressure goes into pΔV expansion/compression work rather than changing internal energy. Enthalpy, H = U + pV, is defined so that the heat exchanged at constant pressure equals ΔH directly (qₚ = ΔH), making it more convenient than internal energy for describing most real chemical processes.",
      },
      {
        marks: 5,
        question:
          "(a) Define standard enthalpy of formation. (b) Using Hess's Law, explain how the standard enthalpy of a reaction can be calculated from the standard enthalpies of formation of reactants and products.",
        answer:
          "(a) The standard enthalpy of formation (ΔfH°) is the enthalpy change when 1 mole of a compound is formed from its constituent elements, each in their most stable standard state, under standard conditions. By convention, the enthalpy of formation of an element in its most stable form is taken as zero.\n(b) By Hess's Law, the standard enthalpy of a reaction can be calculated as: ΔrH° = Σ ΔfH°(products) − Σ ΔfH°(reactants), i.e. the sum of the enthalpies of formation of all products (weighted by their stoichiometric coefficients) minus the sum of the enthalpies of formation of all reactants. This works because we can imagine the reaction proceeding via a hypothetical path where all reactants first decompose into their elements, and then those elements recombine to form the products — the overall ΔH is the same regardless of path.",
      },
      {
        marks: 5,
        question:
          "(a) Explain, with reasons, why a reaction with ΔH < 0 and ΔS < 0 is spontaneous only at low temperature. (b) Give one real chemical example of such a reaction.",
        answer:
          "(a) For such a reaction, ΔG = ΔH − TΔS. Since ΔH is negative and ΔS is negative, −TΔS is a positive quantity that grows larger as T increases. At **low temperature**, this positive −TΔS term is small, so ΔG (= negative ΔH + small positive term) remains negative overall, and the reaction is spontaneous. At **high temperature**, the −TΔS term becomes large enough to outweigh the negative ΔH, making ΔG positive overall, so the reaction becomes non-spontaneous.\n(b) Example: the formation of ammonia in the Haber process, N₂(g) + 3H₂(g) ⇌ 2NH₃(g), is exothermic (ΔH < 0) but decreases the number of gas moles from 4 to 2, decreasing disorder (ΔS < 0) — this is why the forward reaction (formation of ammonia) is favoured at lower temperatures, and industrially a compromise (moderate) temperature is chosen to balance this thermodynamic preference against a practical reaction rate.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 7 — EQUILIBRIUM
  // ================================================================
  {
    id: "equilibrium",
    number: 7,
    title: "Equilibrium",
    subtitle: "The dynamic balance behind every reversible reaction — from soda water to your stomach's pH",
    description:
      "Reversible reactions and dynamic equilibrium, the equilibrium constant and Le Chatelier's principle, ionic equilibrium in solutions, acids and bases, the pH scale, buffer solutions, and solubility equilibrium.",
    icon: "⚖️",
    color: "plum",
    readingTime: "30 min read",
    videos: [
      {
        title: "Equilibrium — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/2AtvsvjWX3Q",
      },
      {
        title: "Le Chatelier's Principle Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/5NBoY5jyEfw",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/mvIQjuHXbTU",
      },
    ],
    notes: `
# Equilibrium

## Equilibrium in Physical and Chemical Processes

Many processes are **reversible** — they can proceed in both the forward and backward direction. When the rates of the forward and backward processes become equal, the system reaches a state of **equilibrium**, where measurable properties (like concentration, colour, pressure) no longer change with time — but the underlying forward and backward processes have not stopped.

> [!key] Equilibrium is **dynamic**, not static — both the forward and reverse processes continue to occur at the molecular level, but at exactly equal rates, so there is no net (observable) change.

### Physical Equilibrium
- **Solid ⇌ Liquid** — e.g. ice and water in a stoppered flask at 273 K.
- **Liquid ⇌ Vapour** — e.g. water and water vapour in a closed container (vapour pressure becomes constant).
- **Solute ⇌ Solution** — e.g. a saturated sugar solution with undissolved sugar at the bottom.
- **Gas dissolved in liquid ⇌ Gas** — e.g. CO₂ dissolved in soda water, which is why a bottle of soda water fizzes when opened (equilibrium is disturbed as the pressure drops).

## Chemical Equilibrium and the Law of Chemical Equilibrium

Chemical equilibrium is reached in a reversible chemical reaction when the rate of the forward reaction equals the rate of the reverse reaction, and the concentrations of reactants and products remain constant with time.

**General reaction:** aA + bB ⇌ cC + dD

The **Law of Chemical Equilibrium (Law of Mass Action)** states that at a given temperature, the ratio of the product of concentrations of products (raised to their stoichiometric powers) to the product of concentrations of reactants (raised to their stoichiometric powers) is a constant, called the **equilibrium constant, Kc**:

K꟤ = [C]ᶜ[D]ᵈ ÷ ([A]ᵃ[B]ᵇ)

For reactions involving gases, the equilibrium constant may also be expressed in terms of partial pressures, **Kp**.

Kₚ = K꟤ × (RT)^Δng

where Δn_g = (moles of gaseous products) − (moles of gaseous reactants).

::diagram:equilibrium-graph

### Characteristics of the Equilibrium Constant
1. The value of K is **constant at a given temperature**, regardless of the initial concentrations.
2. K changes if the **temperature** changes.
3. A **large K** (K >> 1) means the equilibrium favours products (the reaction proceeds nearly to completion); a **small K** (K << 1) means the equilibrium favours reactants (the reaction barely proceeds).
4. K for the reverse reaction is the reciprocal of K for the forward reaction: K(reverse) = 1/K(forward).

### Reaction Quotient (Q)
The **reaction quotient, Q**, has the same expression as K but is calculated using concentrations at any point in time (not necessarily at equilibrium).
- If Q < K, the reaction proceeds in the **forward** direction to reach equilibrium.
- If Q > K, the reaction proceeds in the **reverse** direction.
- If Q = K, the system is **already at equilibrium**.

## Le Chatelier's Principle

> [!key] If a system at equilibrium is subjected to a change in concentration, pressure, volume or temperature, the equilibrium shifts in the direction that tends to **counteract (partially oppose) the effect of that change**.

| Change applied | Effect on equilibrium position |
|---|---|
| Increase concentration of a reactant | Shifts forward (towards products) |
| Remove a product as it forms | Shifts forward (towards products) |
| Increase pressure (decrease volume) | Shifts towards the side with fewer moles of gas |
| Increase temperature | Shifts in the endothermic direction |
| Add a catalyst | No shift — equilibrium is reached faster, but K is unchanged |
| Add an inert gas at constant volume | No effect on equilibrium position |

**Example — the Haber process:** N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH < 0 (exothermic). High pressure favours the forward reaction (fewer moles of gas on the product side); low temperature favours the forward reaction (since it's exothermic), though in practice a moderate temperature (~700 K) is used to keep the reaction rate acceptably fast.

## Ionic Equilibrium — Acids, Bases and Salts

### Arrhenius, Brønsted-Lowry and Lewis Concepts
- **Arrhenius:** an acid gives H⁺ ions in water; a base gives OH⁻ ions.
- **Brønsted-Lowry:** an acid is a **proton (H⁺) donor**; a base is a **proton acceptor**. A **conjugate acid-base pair** differs by a single proton (e.g. HCl and Cl⁻; NH₃ and NH₄⁺).
- **Lewis:** an acid is an **electron-pair acceptor**; a base is an **electron-pair donor** — the broadest definition, covering species without H⁺ at all (e.g. BF₃ is a Lewis acid).

### Ionisation of Acids and Bases
- **Strong acids/bases** ionise almost completely in water (e.g. HCl, HNO₃, NaOH, KOH).
- **Weak acids/bases** ionise only partially, establishing an equilibrium (e.g. CH₃COOH, NH₄OH).

For a weak acid HA ⇌ H⁺ + A⁻, the **acid dissociation constant**:
Ka = [H⁺][A⁻] ÷ [HA]
A larger Ka means a stronger (more ionised) weak acid. Similarly, **Kb** is defined for weak bases.

### Ionic Product of Water
Water undergoes self-ionisation: H₂O ⇌ H⁺ + OH⁻ (more precisely, 2H₂O ⇌ H₃O⁺ + OH⁻).

Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 298 K

In pure water, [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ mol L⁻¹.

### The pH Scale
pH = −log₁₀[H⁺]

| pH | Nature |
|---|---|
| pH < 7 | Acidic |
| pH = 7 | Neutral |
| pH > 7 | Basic |

**pOH** is similarly defined as pOH = −log₁₀[OH⁻], and at 298 K, **pH + pOH = 14** (since Kw = 10⁻¹⁴, pKw = 14).

::diagram:ph-scale

### Common Ion Effect
The **common ion effect** is the suppression of the ionisation of a weak electrolyte by adding a strong electrolyte that shares a common ion. For example, adding sodium acetate (CH₃COONa, a strong electrolyte) to a solution of acetic acid (a weak acid) increases the concentration of the common acetate ion (CH₃COO⁻), which shifts the acetic acid's equilibrium backwards (by Le Chatelier's principle), suppressing its ionisation.

### Buffer Solutions
A **buffer solution** resists changes in pH when small amounts of acid or base are added to it.
- **Acidic buffer** — a weak acid and its salt with a strong base, e.g. CH₃COOH + CH₃COONa.
- **Basic buffer** — a weak base and its salt with a strong acid, e.g. NH₄OH + NH₄Cl.

The pH of an acidic buffer is given by the **Henderson-Hasselbalch equation**:
pH = pKa + log₁₀([salt] ÷ [acid])

::diagram:titration-curve

## Solubility Equilibrium (Ksp)

For a sparingly soluble salt like AgCl, an equilibrium exists between the undissolved solid and its ions in a saturated solution: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq).

Ksp = [Ag⁺][Cl⁻]

**Ksp** is called the **solubility product**. If the ionic product (calculated from the actual concentrations present) exceeds Ksp, **precipitation occurs**; if it is less than Ksp, the solution is unsaturated and no precipitate forms; if equal, the solution is exactly saturated.
    `,
    experiments: [
      {
        id: "fecl3-kscn-equilibrium",
        title: "Reversible Colour Change — Iron(III) Thiocyanate Equilibrium",
        activityRef: "Classic dynamic equilibrium demonstration",
        aim: "To demonstrate a dynamic chemical equilibrium and shift it using Le Chatelier's principle.",
        materials: ["Dilute iron(III) chloride (FeCl₃) solution", "Dilute potassium thiocyanate (KSCN) solution", "Solid KSCN or FeCl₃", "Several test tubes"],
        procedure: [
          "Mix dilute FeCl₃ solution with dilute KSCN solution in a test tube to produce a deep red-coloured solution, and divide it equally into several test tubes.",
          "To one tube, add a little more concentrated FeCl₃ solution; to another, add more KSCN solution.",
          "Keep one tube as a control for colour comparison.",
        ],
        observation:
          "Adding extra FeCl₃ or KSCN to the equilibrium mixture makes the red colour noticeably deeper/more intense compared to the control.",
        reaction: "Fe³⁺(aq) [pale yellow] + SCN⁻(aq) [colourless] ⇌ [FeSCN]²⁺(aq) [deep red]",
        conclusion:
          "Increasing the concentration of a reactant (Fe³⁺ or SCN⁻) shifts the equilibrium in the forward direction (by Le Chatelier's principle), producing more of the red [FeSCN]²⁺ complex and deepening the colour — direct visual evidence that a chemical equilibrium responds to a change in concentration.",
        visual: {
          before: "hsl(0 65% 45%)",
          after: "hsl(0 75% 30%)",
          labels: { before: "Red equilibrium mixture", after: "Deeper red after adding more Fe³⁺" },
        },
      },
      {
        id: "cobalt-chloride-equilibrium",
        title: "Effect of Temperature on the Cobalt Chloride Equilibrium",
        aim: "To observe the effect of temperature on a reversible reaction, illustrating Le Chatelier's principle for an endothermic/exothermic equilibrium.",
        materials: ["Cobalt(II) chloride solution (pink, hydrated)", "Concentrated hydrochloric acid", "Test tubes", "A water bath / ice bath"],
        procedure: [
          "Take a pink solution of cobalt(II) chloride and add concentrated HCl until it turns blue (forming the chloro-complex).",
          "Warm the blue solution gently in a water bath.",
          "Cool the warmed solution in an ice bath and observe again.",
        ],
        observation:
          "On adding HCl the solution turns blue; warming intensifies/maintains the blue colour, while cooling in ice turns the solution back towards pink.",
        reaction: "[Co(H₂O)₆]²⁺(aq) [pink] + 4Cl⁻(aq) ⇌ [CoCl₄]²⁻(aq) [blue] + 6H₂O(l) — forward reaction endothermic",
        conclusion:
          "Since the forward (blue-forming) reaction is endothermic, increasing the temperature shifts the equilibrium forward (towards blue), while decreasing the temperature shifts it backward (towards pink) — exactly as Le Chatelier's principle predicts for a change in temperature.",
        visual: {
          before: "hsl(330 55% 70%)",
          after: "hsl(220 60% 45%)",
          thermal: "endothermic",
          labels: { before: "Pink cobalt(II) solution", after: "Blue on warming; pink again on cooling" },
        },
      },
      {
        id: "dichromate-chromate-equilibrium",
        title: "The Chromate–Dichromate Equilibrium",
        aim: "To study a pH-dependent equilibrium between chromate and dichromate ions.",
        materials: ["Potassium dichromate (K₂Cr₂O₇) solution (orange)", "Dilute NaOH solution", "Dilute H₂SO₄", "Test tubes"],
        procedure: [
          "Take orange potassium dichromate solution in a test tube.",
          "Add dilute NaOH solution drop by drop and observe the colour change.",
          "To the resulting solution, add dilute H₂SO₄ drop by drop and observe again.",
        ],
        observation: "The orange dichromate solution turns yellow on adding NaOH; adding acid to the yellow solution turns it back to orange.",
        reaction: "Cr₂O₇²⁻(aq) [orange] + 2OH⁻ ⇌ 2CrO₄²⁻(aq) [yellow] + H₂O(l)",
        conclusion:
          "The dichromate-chromate equilibrium is pH-dependent: adding a base (OH⁻) shifts the equilibrium forward (towards yellow chromate), while adding acid (H⁺, which reacts with OH⁻ and effectively removes it) shifts the equilibrium backward (towards orange dichromate) — another clear illustration of Le Chatelier's principle in action.",
        visual: {
          before: "hsl(25 85% 55%)",
          after: "hsl(50 90% 55%)",
          labels: { before: "Orange dichromate solution", after: "Yellow chromate on adding base" },
        },
      },
      {
        id: "buffer-ph-resistance",
        title: "Testing the pH Resistance of a Buffer Solution",
        aim: "To show that a buffer solution resists changes in pH when a small amount of acid or base is added, unlike pure water.",
        materials: ["A prepared acetate buffer (CH₃COOH + CH₃COONa)", "Distilled water", "Dilute HCl", "Dilute NaOH", "pH paper or a pH meter"],
        procedure: [
          "Measure and record the initial pH of a sample of buffer solution and a sample of distilled water.",
          "Add a few drops of dilute HCl to each sample separately and record the new pH.",
          "Repeat with fresh samples, adding a few drops of dilute NaOH instead, and record the new pH.",
        ],
        observation:
          "The pH of distilled water changes sharply on adding even a few drops of acid or base. The pH of the buffer solution changes only very slightly under the same additions.",
        conclusion:
          "A buffer solution, containing a weak acid and its conjugate base (or a weak base and its conjugate acid) in significant amounts, can neutralise small additions of H⁺ or OH⁻ without a large pH change, because the added ions react with the reserve of weak acid/conjugate base present — this buffering capacity is essential in biological systems like blood, which must maintain a nearly constant pH.",
        visual: {
          before: "hsl(150 40% 88%)",
          after: "hsl(150 45% 82%)",
          labels: { before: "Buffer at pH ≈ 4.7", after: "Still ≈ 4.7-4.8 after adding acid/base" },
        },
      },
      {
        id: "solubility-product-precipitation",
        title: "Common Ion Effect on the Solubility of a Sparingly Soluble Salt",
        aim: "To show how adding a common ion decreases the solubility of a sparingly soluble salt (common ion effect on Ksp).",
        materials: ["A nearly saturated solution of lead chloride (PbCl₂) or silver acetate", "Concentrated hydrochloric acid (source of a common Cl⁻ ion)", "Test tubes"],
        procedure: [
          "Prepare (or start with) a nearly saturated solution of a sparingly soluble chloride salt, such as PbCl₂, at room temperature.",
          "Add a few drops of concentrated HCl (which supplies extra Cl⁻ ions) to the solution.",
          "Observe whether any additional solid forms.",
        ],
        observation: "A fresh white precipitate appears/increases immediately after adding the concentrated HCl.",
        reaction: "PbCl₂(s) ⇌ Pb²⁺(aq) + 2Cl⁻(aq) ; Ksp = [Pb²⁺][Cl⁻]²",
        conclusion:
          "Adding extra Cl⁻ ions (a common ion already present in the equilibrium) increases the ionic product beyond Ksp, so by Le Chatelier's principle the equilibrium shifts to the left, and more solid PbCl₂ precipitates out of solution — this is the common ion effect reducing the salt's solubility.",
        visual: {
          before: "hsl(40 20% 95%)",
          after: "hsl(40 15% 92%)",
          precipitate: { name: "Lead chloride", colour: "hsl(0 0% 95%)" },
          labels: { before: "Nearly saturated PbCl₂ solution", after: "More precipitate after adding HCl" },
        },
      },
      {
        id: "vapour-pressure-equilibrium",
        title: "Establishing Liquid–Vapour Equilibrium in a Closed Container",
        aim: "To demonstrate that a physical equilibrium (liquid ⇌ vapour) is dynamic, using volatile and non-volatile liquids for comparison.",
        materials: ["A volatile liquid (e.g. a small amount of ether or acetone in a sealed flask)", "A closed flask/container with a pressure gauge or manometer (if available)", "A stopwatch"],
        procedure: [
          "Place a small amount of a volatile liquid in a flask and immediately seal it, noting the initial pressure/appearance.",
          "Observe the flask over several minutes without opening it.",
          "Note when the amount of visible liquid and any pressure reading stop changing.",
        ],
        observation:
          "Initially the liquid appears to evaporate (level drops slightly, vapour/mist may be visible or pressure rises), but after some time the liquid level and pressure stop changing noticeably, even though the container remains sealed.",
        conclusion:
          "Evaporation does not stop; rather, the rate of evaporation (liquid → vapour) becomes exactly equal to the rate of condensation (vapour → liquid) in the closed system, so the amounts of liquid and vapour become constant — this constant, unchanging state, reached without either process actually stopping, is the defining feature of a dynamic physical equilibrium.",
        visual: {
          before: "hsl(200 30% 90%)",
          after: "hsl(200 30% 90%)",
          gas: "Vapour",
          labels: { before: "Liquid added, flask just sealed", after: "Liquid level constant — equilibrium reached" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "At chemical equilibrium:",
        options: [
          "The forward and reverse reactions have both stopped",
          "The rate of the forward reaction equals the rate of the reverse reaction",
          "Only the forward reaction continues",
          "The concentration of reactants becomes zero",
        ],
        correctAnswer: 1,
        explanation: "Chemical equilibrium is dynamic — both forward and reverse reactions continue, but at exactly equal rates, so concentrations stop changing.",
      },
      {
        question: "If the equilibrium constant Kc for a reaction is very large (Kc >> 1), it means:",
        options: [
          "The reaction does not occur at all",
          "The equilibrium mixture contains mostly reactants",
          "The equilibrium mixture contains mostly products",
          "The reaction is instantaneous",
        ],
        correctAnswer: 2,
        explanation: "A large Kc means the numerator (products) is much larger than the denominator (reactants) at equilibrium, so the reaction proceeds nearly to completion, favouring products.",
      },
      {
        question: "According to Le Chatelier's principle, increasing the pressure on an equilibrium system shifts it towards:",
        options: [
          "The side with more moles of gas",
          "The side with fewer moles of gas",
          "No change occurs",
          "The exothermic direction always",
        ],
        correctAnswer: 1,
        explanation: "Increasing pressure (or decreasing volume) shifts the equilibrium towards the side with fewer moles of gas, which partially counteracts the increase in pressure.",
      },
      {
        question: "Adding a catalyst to a reaction at equilibrium:",
        options: [
          "Shifts the equilibrium towards products",
          "Shifts the equilibrium towards reactants",
          "Has no effect on the position of equilibrium, only the rate of reaching it",
          "Increases the value of Kc",
        ],
        correctAnswer: 2,
        explanation: "A catalyst speeds up both the forward and reverse reactions equally, so equilibrium is reached faster, but the equilibrium constant and position are unchanged.",
      },
      {
        question: "According to the Brønsted-Lowry concept, an acid is defined as a substance that:",
        options: ["Accepts a proton", "Donates a proton", "Gives OH⁻ ions in water", "Accepts an electron pair"],
        correctAnswer: 1,
        explanation: "Brønsted-Lowry theory defines an acid as a proton (H⁺) donor and a base as a proton acceptor.",
      },
      {
        question: "The ionic product of water, Kw, at 298 K has the value:",
        options: ["1.0 × 10⁻⁷", "1.0 × 10⁻¹⁴", "1.0 × 10⁷", "1.0 × 10¹⁴"],
        correctAnswer: 1,
        explanation: "Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 298 K, giving [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ mol L⁻¹ in pure water.",
      },
      {
        question: "A buffer solution can be prepared by mixing:",
        options: [
          "A strong acid and a strong base",
          "A weak acid and its salt with a strong base",
          "Two strong acids",
          "Pure water and a strong acid",
        ],
        correctAnswer: 1,
        explanation: "A typical acidic buffer consists of a weak acid together with the salt of that acid with a strong base (e.g. CH₃COOH + CH₃COONa), which together resist changes in pH.",
      },
      {
        question: "The common ion effect on the ionisation of a weak acid results in:",
        options: [
          "Increased ionisation of the weak acid",
          "Suppressed (decreased) ionisation of the weak acid",
          "No change in ionisation",
          "Complete ionisation of the weak acid",
        ],
        correctAnswer: 1,
        explanation: "Adding a strong electrolyte with an ion common to the weak acid's equilibrium shifts the equilibrium backwards (Le Chatelier's principle), suppressing the weak acid's own ionisation.",
      },
      {
        question: "The solubility product, Ksp, of a sparingly soluble salt applies to:",
        options: [
          "Any solution of the salt",
          "Only a saturated solution in equilibrium with the undissolved solid",
          "Only a dilute, unsaturated solution",
          "Only molten salts",
        ],
        correctAnswer: 1,
        explanation: "Ksp is the equilibrium constant for the dissolution equilibrium between a solid salt and its ions, and strictly applies to a saturated solution in contact with the undissolved solid.",
      },
      {
        question: "A solution with pH = 3 is how many times more acidic (in terms of [H⁺]) than a solution with pH = 5?",
        options: ["2 times", "20 times", "100 times", "1000 times"],
        correctAnswer: 2,
        explanation: "Since pH is a negative log scale, each unit decrease in pH means a 10-fold increase in [H⁺]; a difference of 2 pH units means [H⁺] is 10² = 100 times greater.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "What is meant by dynamic equilibrium?",
        answer:
          "Dynamic equilibrium is a state in a reversible process where the rates of the forward and backward reactions are equal, so there is no net change in the concentrations of reactants and products, even though both reactions continue to occur.",
      },
      {
        marks: 1,
        question: "Write the expression for the ionic product of water and its value at 298 K.",
        answer: "Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 298 K.",
      },
      {
        marks: 2,
        question: "State Le Chatelier's principle and give one example of its application.",
        answer:
          "Le Chatelier's principle states that if a system at equilibrium is subjected to a change in concentration, pressure, volume or temperature, the equilibrium shifts in the direction that tends to counteract the effect of that change. Example: in the Haber process, N₂(g) + 3H₂(g) ⇌ 2NH₃(g), increasing the pressure shifts the equilibrium towards the side with fewer moles of gas (the product side), increasing the yield of ammonia.",
      },
      {
        marks: 2,
        question: "Differentiate between the equilibrium constant (K) and the reaction quotient (Q).",
        answer:
          "The equilibrium constant (K) has a fixed value at a given temperature, calculated from concentrations only when the system is exactly at equilibrium. The reaction quotient (Q) has the same mathematical form as K, but is calculated using the concentrations at any point in time, not necessarily at equilibrium; comparing Q to K tells us in which direction the reaction must proceed to reach equilibrium.",
      },
      {
        marks: 2,
        question: "What is a buffer solution? Give one example of an acidic buffer.",
        answer:
          "A buffer solution is one that resists a significant change in pH when small amounts of acid or base are added to it. Example of an acidic buffer: a mixture of acetic acid (CH₃COOH) and sodium acetate (CH₃COONa).",
      },
      {
        marks: 3,
        question: "Distinguish between strong and weak acids in terms of their ionisation, with one example of each.",
        answer:
          "A **strong acid** ionises almost completely in water, so the equilibrium lies almost entirely towards the products — e.g. HCl(aq) → H⁺(aq) + Cl⁻(aq) (essentially 100% ionised). A **weak acid** ionises only partially in water, establishing a true equilibrium with a measurable Ka — e.g. CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq), where most of the acid remains un-ionised at any given time.",
      },
      {
        marks: 3,
        question: "Explain the common ion effect with the example of adding sodium acetate to acetic acid solution.",
        answer:
          "Acetic acid ionises in water in a reversible reaction: CH₃COOH ⇌ H⁺ + CH₃COO⁻. Adding sodium acetate (CH₃COONa), a strong electrolyte that fully dissociates and supplies a large amount of the common ion CH₃COO⁻, increases [CH₃COO⁻] in the solution. By Le Chatelier's principle, the acetic acid equilibrium shifts backward (to the left) to partially counteract this increase, which suppresses (decreases) the ionisation of the acetic acid itself — this is called the common ion effect.",
      },
      {
        marks: 3,
        question: "Calculate the pH of a solution whose [H⁺] = 1 × 10⁻⁵ mol L⁻¹. Is the solution acidic, basic or neutral?",
        answer:
          "pH = −log₁₀[H⁺] = −log₁₀(1 × 10⁻⁵) = 5. Since pH = 5 is less than 7, the solution is **acidic**.",
      },
      {
        marks: 5,
        question:
          "(a) Write the general form of the Law of Chemical Equilibrium for the reaction aA + bB ⇌ cC + dD. (b) State three important characteristics of the equilibrium constant K.",
        answer:
          "(a) K꜀ = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ), where the square brackets denote equilibrium molar concentrations.\n(b) (i) K has a fixed, constant value at a given temperature, regardless of the starting concentrations of reactants and products. (ii) The value of K changes only if the temperature changes. (iii) The equilibrium constant for the reverse reaction is the reciprocal of that for the forward reaction (K꜀(reverse) = 1/K꜀(forward)); if a chemical equation is multiplied by a factor n, the new K is the old K raised to the power n.",
      },
      {
        marks: 5,
        question:
          "(a) Explain, using an example, what is meant by physical equilibrium. (b) Describe, with an example, how a change in temperature shifts a chemical equilibrium according to Le Chatelier's principle.",
        answer:
          "(a) Physical equilibrium is a dynamic balance reached in a reversible physical (not chemical) change, where a measurable property stops changing even though the underlying process continues in both directions. Example: in a stoppered bottle of soda water, dissolved CO₂ gas is in equilibrium with CO₂ gas in the space above the liquid — CO₂(g) ⇌ CO₂(dissolved) — the rate at which CO₂ dissolves equals the rate at which it escapes from solution, so the amount of dissolved gas stays constant as long as the bottle remains sealed (which is why the drink fizzes only after the seal, and the equilibrium, is broken).\n(b) According to Le Chatelier's principle, increasing the temperature of a system at equilibrium shifts the equilibrium in the endothermic direction (the direction that absorbs the added heat), and decreasing the temperature shifts it in the exothermic direction. Example: for the exothermic formation of ammonia, N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH < 0, increasing the temperature shifts the equilibrium backward (favouring the reverse, endothermic decomposition of NH₃ back into N₂ and H₂), reducing the yield of ammonia — this is why the industrial Haber process uses only a moderate temperature, balancing yield against an acceptable reaction rate.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 8 — REDOX REACTIONS
  // ================================================================
  {
    id: "redox-reactions",
    number: 8,
    title: "Redox Reactions",
    subtitle: "Electron transfer, oxidation numbers, and balancing tricky equations",
    description:
      "The classical and electronic concepts of oxidation and reduction, oxidation number rules, identifying oxidising and reducing agents, balancing redox equations by the oxidation number and ion-electron (half-reaction) methods, and electrode processes.",
    icon: "🔋",
    color: "plum",
    readingTime: "23 min read",
    videos: [
      {
        title: "Redox Reactions — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/3s3sHcQ_Wc4",
      },
      {
        title: "Balancing Redox Equations — Ion-Electron Method",
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
# Redox Reactions

## Classical Idea of Oxidation and Reduction

Originally, **oxidation** was understood as the addition of oxygen (or removal of hydrogen) to a substance, and **reduction** as the addition of hydrogen (or removal of oxygen).
- Oxidation: 2Mg + O₂ → 2MgO (magnesium is oxidised)
- Reduction: CuO + H₂ → Cu + H₂O (CuO is reduced)

## Electronic Concept of Oxidation and Reduction

A more general definition, applicable to reactions that don't involve oxygen or hydrogen at all:
- **Oxidation** is the **loss of electrons** by a species.
- **Reduction** is the **gain of electrons** by a species.

**Example:** 2Na + Cl₂ → 2NaCl. Sodium loses an electron (Na → Na⁺ + e⁻, oxidised); chlorine gains an electron (Cl₂ + 2e⁻ → 2Cl⁻, reduced).

> [!key] A **redox reaction** is one in which oxidation and reduction occur simultaneously — electrons lost by one species are exactly gained by another.

- **Oxidising agent (oxidant)** — the species that gets reduced (it removes electrons from another substance).
- **Reducing agent (reductant)** — the species that gets oxidised (it donates electrons to another substance).

::diagram:redox

## Oxidation Number

Since a purely electron-transfer view doesn't easily apply to covalent compounds, the concept of **oxidation number (oxidation state)** was introduced — an imaginary charge that an atom would have if all bonds to atoms of different elements were considered fully ionic.

### Rules for Assigning Oxidation Numbers
1. The oxidation number of an atom in its **elemental (free) state** is always **zero** (e.g. Na, O₂, P₄).
2. The oxidation number of a **monoatomic ion** equals the charge on the ion (e.g. Na⁺ is +1, Cl⁻ is −1).
3. The oxidation number of **hydrogen** is usually **+1** (except in metal hydrides, like NaH, where it is −1).
4. The oxidation number of **oxygen** is usually **−2** (except in peroxides like H₂O₂, where it is −1, and in OF₂, where it is +2).
5. The **algebraic sum** of oxidation numbers of all atoms in a neutral molecule is **zero**; in a polyatomic ion, it equals the charge on the ion.
6. Group 1 metals are always **+1**; Group 2 metals are always **+2** in their compounds.

> [!example] In K₂Cr₂O₇: let the oxidation number of Cr be x. 2(+1) + 2(x) + 7(−2) = 0 → 2 + 2x − 14 = 0 → x = **+6**.

**Oxidation** = increase in oxidation number; **reduction** = decrease in oxidation number.

## Types of Redox Reactions

1. **Combination reactions** — e.g. C(s) + O₂(g) → CO₂(g) (if the reactants are elements or the reaction involves electron transfer).
2. **Decomposition reactions** — e.g. 2H₂O(l) →[electricity] 2H₂(g) + O₂(g).
3. **Displacement reactions** — e.g. Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s).
4. **Disproportionation reactions** — a special type of redox reaction in which the **same element is simultaneously oxidised and reduced**, i.e. it is present in an intermediate oxidation state that can go both up and down. e.g. 2H₂O₂ → 2H₂O + O₂ (oxygen in H₂O₂ is −1, going to −2 in H₂O and 0 in O₂).

## Balancing Redox Equations

### Oxidation Number Method
1. Identify the atoms undergoing a change in oxidation number.
2. Calculate the increase/decrease in oxidation number per atom, and multiply by the number of such atoms in the formula.
3. Equalise the total increase and total decrease in oxidation number by multiplying the appropriate formulae with suitable coefficients.
4. Balance the remaining atoms (other than O and H), then balance O and H (often by adding H₂O and H⁺/OH⁻).

### Ion-Electron (Half-Reaction) Method
1. Split the overall reaction into two half-reactions — one for oxidation, one for reduction.
2. Balance each half-reaction separately for atoms other than O and H.
3. Balance O by adding H₂O; balance H by adding H⁺ (in acidic medium) or convert appropriately for basic medium (add OH⁻ / H₂O as needed).
4. Balance the charge on each side by adding electrons.
5. Multiply each half-reaction by a suitable integer so the number of electrons lost equals the number of electrons gained, then add the two half-reactions and cancel common terms.

> [!example] Half-reactions for MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ (acidic medium):
> - Reduction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O
> - Oxidation: Fe²⁺ → Fe³⁺ + e⁻ (multiplied by 5 to balance electrons)
> - Overall: MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺

## Redox Reactions as the Basis of Electrode Processes

Redox reactions form the basis of **electrochemical cells**, where the oxidation and reduction half-reactions are physically separated at two electrodes, and electrons flow through an external circuit (producing electrical energy from a spontaneous chemical reaction) — this principle underlies batteries and electroplating, and is developed further in Electrochemistry.

::diagram:galvanic-cell

    `,
    experiments: [
      {
        id: "kmno4-fe2-titration",
        title: "Redox Titration — Standardising with Potassium Permanganate",
        aim: "To perform a redox titration between acidified potassium permanganate and a ferrous salt solution, identifying the equivalence point by a colour change.",
        materials: ["Standard potassium permanganate (KMnO₄) solution", "Ferrous ammonium sulphate solution", "Dilute sulphuric acid", "A burette, pipette and conical flask"],
        procedure: [
          "Pipette a known volume of ferrous ammonium sulphate solution into a conical flask and acidify it with dilute H₂SO₄.",
          "Fill a burette with standard KMnO₄ solution.",
          "Titrate by adding KMnO₄ dropwise to the flask, swirling constantly, until a permanent faint pink colour persists.",
        ],
        observation:
          "The purple KMnO₄ decolourises as it is added and reacts, until the Fe²⁺ is completely consumed; at the endpoint, a single extra drop of KMnO₄ turns the solution a persistent faint pink, since there is no more Fe²⁺ left to reduce it.",
        reaction: "MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺",
        conclusion:
          "KMnO₄ acts as a self-indicating oxidising agent in acidic medium — the reaction endpoint is signalled by the first permanent appearance of its own purple/pink colour, once all the reducing agent (Fe²⁺) has been oxidised to Fe³⁺.",
        visual: {
          before: "hsl(60 40% 92%)",
          after: "hsl(320 55% 75%)",
          labels: { before: "Colourless Fe²⁺ solution + acid", after: "Persistent faint pink at endpoint" },
        },
      },
      {
        id: "displacement-oxidation-number",
        title: "Tracking Oxidation Number Changes in a Displacement Reaction",
        aim: "To confirm that a metal displacement reaction is a redox reaction by tracking the oxidation number of each species before and after.",
        materials: ["Zinc granules", "Copper sulphate solution", "A test tube"],
        procedure: [
          "Add zinc granules to blue copper sulphate solution in a test tube.",
          "Observe the colour change and the deposit forming on the zinc.",
          "Assign oxidation numbers to Zn, Cu, and the sulphate ion before and after the reaction.",
        ],
        observation: "The blue colour of the copper sulphate solution fades, and a reddish-brown deposit of copper forms on the zinc granules.",
        reaction: "Zn(0) + Cu²⁺(+2) → Zn²⁺(+2) + Cu(0)",
        conclusion:
          "Zinc's oxidation number increases from 0 to +2 (oxidation — loss of electrons), while copper's oxidation number decreases from +2 to 0 (reduction — gain of electrons). Since one species is oxidised and another simultaneously reduced, this displacement reaction is confirmed to be a redox reaction, with zinc as the reducing agent and Cu²⁺ as the oxidising agent.",
        visual: {
          before: "hsl(210 70% 55%)",
          after: "hsl(20 55% 40%)",
          solid: { name: "Zinc granules", colourBefore: "hsl(210 8% 55%)", colourAfter: "hsl(20 55% 40%)" },
          labels: { before: "Blue CuSO₄ solution", after: "Fades; copper deposits on zinc" },
        },
      },
      {
        id: "disproportionation-h2o2",
        title: "Disproportionation of Hydrogen Peroxide",
        aim: "To demonstrate disproportionation, where the same element (oxygen) is both oxidised and reduced simultaneously.",
        materials: ["Hydrogen peroxide solution (dilute)", "Manganese dioxide (as a catalyst) or a small piece of raw potato/liver (natural catalase source)", "A test tube", "A glowing splinter"],
        procedure: [
          "Take dilute hydrogen peroxide solution in a test tube.",
          "Add a pinch of manganese dioxide (catalyst) to speed up its decomposition.",
          "Bring a glowing splinter near the mouth of the test tube to test the gas evolved.",
        ],
        observation: "Vigorous effervescence (bubbling) occurs, and the glowing splinter relights/rekindles into a flame, confirming the gas is oxygen.",
        reaction: "2H₂O₂(aq) → 2H₂O(l) + O₂(g) [oxygen goes from −1 in H₂O₂ to −2 in H₂O (reduced) and to 0 in O₂ (oxidised)]",
        conclusion:
          "Since oxygen atoms in H₂O₂ (oxidation number −1, an intermediate state) end up partly as −2 (in water, reduced) and partly as 0 (in O₂ gas, oxidised) in the same reaction, this is a disproportionation reaction — the same element is simultaneously oxidised and reduced.",
        visual: {
          before: "hsl(200 20% 95%)",
          after: "hsl(200 20% 95%)",
          gas: "Oxygen",
          labels: { before: "H₂O₂ with MnO₂ catalyst added", after: "Bubbling; splinter relights" },
        },
      },
      {
        id: "iodine-clock-reaction",
        title: "The Iodine Clock Reaction — A Visual Redox Timer",
        aim: "To observe a classic redox 'clock reaction' where a sudden colour change signals the completion of an intermediate redox step.",
        materials: ["Solution A: potassium iodate (KIO₃) in dilute acid", "Solution B: sodium metabisulphite/starch mixture", "Two beakers", "A stopwatch"],
        procedure: [
          "Prepare Solution A (acidified potassium iodate) and Solution B (containing sodium metabisulphite and starch indicator) separately.",
          "Mix the two solutions together in a single beaker and start a stopwatch immediately.",
          "Watch closely and note the time at which the mixture suddenly changes colour.",
        ],
        observation:
          "The mixed solution remains colourless (or pale) for a reproducible, fixed period of time, and then suddenly turns a deep blue-black almost instantaneously.",
        reaction: "IO₃⁻ is progressively reduced to I⁻ by the sulphite; once the sulphite (reducing agent) is fully consumed, any further I⁻ produced is oxidised to I₂ by remaining IO₃⁻, and I₂ immediately forms a blue-black complex with starch",
        conclusion:
          "This reaction demonstrates that redox reactions proceed through a defined sequence of steps at a measurable rate — the sudden appearance of the starch-iodine colour marks the exact point at which the limiting reagent (the reducing agent) is used up, after which free iodine can accumulate and react with starch.",
        visual: {
          before: "hsl(200 15% 96%)",
          after: "hsl(240 60% 20%)",
          labels: { before: "Colourless mixture, timer started", after: "Sudden blue-black colour appears" },
        },
      },
      {
        id: "half-reaction-electrode-demo",
        title: "Separating Oxidation and Reduction — A Simple Voltaic Cell",
        aim: "To physically separate the oxidation and reduction half-reactions of a redox process using a simple galvanic cell.",
        materials: ["A strip of zinc metal", "A strip of copper metal", "Zinc sulphate solution", "Copper sulphate solution", "A salt bridge (filter paper soaked in KCl/KNO₃ solution)", "Connecting wires and a voltmeter/galvanometer", "Two beakers"],
        procedure: [
          "Set up a zinc strip dipped in zinc sulphate solution in one beaker, and a copper strip dipped in copper sulphate solution in another.",
          "Connect the two metal strips externally through a voltmeter/galvanometer using wires.",
          "Connect the two solutions internally with a salt bridge, and observe the meter reading.",
        ],
        observation: "The voltmeter shows a steady deflection/reading (a measurable voltage), and over time the zinc strip loses mass while the copper strip gains a reddish deposit.",
        reaction: "Oxidation (at zinc electrode): Zn → Zn²⁺ + 2e⁻ ; Reduction (at copper electrode): Cu²⁺ + 2e⁻ → Cu",
        conclusion:
          "By physically separating the oxidation half-reaction (at the zinc electrode) from the reduction half-reaction (at the copper electrode), electrons are forced to travel through the external wire (producing a measurable current) rather than transferring directly — this is the basic working principle of a galvanic (voltaic) cell, built entirely on the redox reaction Zn + Cu²⁺ → Zn²⁺ + Cu.",
        visual: {
          before: "hsl(210 60% 60%)",
          after: "hsl(210 45% 55%)",
          labels: { before: "Two half-cells connected by a salt bridge", after: "Steady current flows; Cu deposits" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "In the electronic concept, oxidation is defined as:",
        options: ["Gain of electrons", "Loss of electrons", "Gain of oxygen only", "Loss of hydrogen only"],
        correctAnswer: 1,
        explanation: "In the electronic (modern) concept, oxidation is the loss of one or more electrons by a species, while reduction is the gain of electrons.",
      },
      {
        question: "The oxidation number of oxygen in H₂O₂ is:",
        options: ["0", "−2", "−1", "+1"],
        correctAnswer: 2,
        explanation: "In peroxides like H₂O₂, oxygen has an oxidation number of −1, unlike its usual value of −2 in most other compounds.",
      },
      {
        question: "The species that gets reduced in a redox reaction is called the:",
        options: ["Reducing agent", "Oxidising agent", "Catalyst", "Spectator ion"],
        correctAnswer: 1,
        explanation: "The oxidising agent is the species that is itself reduced (gains electrons) while oxidising (removing electrons from) another substance.",
      },
      {
        question: "In the reaction 2H₂O₂ → 2H₂O + O₂, the reaction is classified as:",
        options: ["A combination reaction", "A displacement reaction", "A disproportionation reaction", "A neutralisation reaction"],
        correctAnswer: 2,
        explanation: "Since oxygen in H₂O₂ is simultaneously reduced (to −2 in H₂O) and oxidised (to 0 in O₂), this is a disproportionation reaction.",
      },
      {
        question: "The oxidation number of chromium in K₂Cr₂O₇ is:",
        options: ["+3", "+6", "+7", "+2"],
        correctAnswer: 1,
        explanation: "Let Cr = x: 2(+1) + 2x + 7(−2) = 0 → 2 + 2x − 14 = 0 → x = +6.",
      },
      {
        question: "In the ion-electron (half-reaction) method of balancing redox equations, the first step is to:",
        options: [
          "Balance oxygen atoms",
          "Split the reaction into separate oxidation and reduction half-reactions",
          "Add electrons to both sides equally",
          "Balance hydrogen atoms",
        ],
        correctAnswer: 1,
        explanation: "The ion-electron method begins by splitting the overall redox reaction into two separate half-reactions — one representing oxidation, one representing reduction — before balancing each separately.",
      },
      {
        question: "In an acidic medium, oxygen atoms in a half-reaction are typically balanced by adding:",
        options: ["OH⁻ ions", "H₂O molecules", "O₂ gas", "H⁺ ions only"],
        correctAnswer: 1,
        explanation: "In acidic medium, oxygen is balanced by adding H₂O molecules to the side that needs oxygen, and then hydrogen is balanced separately using H⁺ ions.",
      },
      {
        question: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s) is an example of which type of redox reaction?",
        options: ["Combination", "Decomposition", "Displacement", "Disproportionation"],
        correctAnswer: 2,
        explanation: "A more reactive metal (Zn) displaces a less reactive one (Cu) from its salt solution — a displacement reaction, and also a redox reaction since electrons are transferred.",
      },
      {
        question: "The algebraic sum of oxidation numbers of all atoms in a neutral molecule is always:",
        options: ["+1", "−1", "Zero", "Equal to its molar mass"],
        correctAnswer: 2,
        explanation: "For any neutral molecule, the oxidation numbers of all constituent atoms must sum to zero, since the molecule carries no overall charge.",
      },
      {
        question: "In a galvanic (voltaic) cell, the oxidation and reduction half-reactions occur:",
        options: [
          "At the same electrode simultaneously",
          "At physically separated electrodes, connected externally",
          "Only in the salt bridge",
          "Only when the cell is short-circuited",
        ],
        correctAnswer: 1,
        explanation: "In a galvanic cell, oxidation occurs at one electrode and reduction at the other, physically separated but connected by an external wire (for electron flow) and a salt bridge (for ion flow).",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define oxidation and reduction according to the electronic concept.",
        answer: "Oxidation is the loss of one or more electrons by a species; reduction is the gain of one or more electrons by a species.",
      },
      {
        marks: 1,
        question: "What is a disproportionation reaction?",
        answer: "A disproportionation reaction is a redox reaction in which the same element, present in an intermediate oxidation state, is simultaneously oxidised and reduced.",
      },
      {
        marks: 2,
        question: "Define oxidising agent and reducing agent, with one example of each.",
        answer:
          "An **oxidising agent** is a substance that oxidises another substance (removes electrons from it) and is itself reduced in the process, e.g. KMnO₄. A **reducing agent** is a substance that reduces another substance (donates electrons to it) and is itself oxidised in the process, e.g. H₂ (as in CuO + H₂ → Cu + H₂O).",
      },
      {
        marks: 2,
        question: "Calculate the oxidation number of sulphur in Na₂S₂O₃ (sodium thiosulphate).",
        answer:
          "Let the oxidation number of S be x. 2(+1) + 2x + 3(−2) = 0 → 2 + 2x − 6 = 0 → 2x = 4 → x = +2. So the average oxidation number of sulphur in Na₂S₂O₃ is **+2**.",
      },
      {
        marks: 2,
        question: "Identify the oxidising agent and reducing agent in the reaction: Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s).",
        answer:
          "Zinc's oxidation number increases from 0 to +2 (it is oxidised), so **zinc is the reducing agent**. Copper's oxidation number decreases from +2 to 0 (it is reduced), so **Cu²⁺ (from CuSO₄) is the oxidising agent**.",
      },
      {
        marks: 3,
        question: "State the rules used to assign oxidation numbers to hydrogen and oxygen, with the exceptions to each.",
        answer:
          "**Hydrogen** is usually assigned an oxidation number of **+1**, except in metal hydrides (e.g. NaH, CaH₂), where it is **−1**, since the metal is more electropositive.\n**Oxygen** is usually assigned an oxidation number of **−2**, except in peroxides (e.g. H₂O₂), where it is **−1**, and in OF₂ (where fluorine, being more electronegative than oxygen, forces oxygen to a **+2** oxidation state.",
      },
      {
        marks: 3,
        question: "Balance the following redox equation using the oxidation number method: Fe²⁺ + Cr₂O₇²⁻ + H⁺ → Fe³⁺ + Cr³⁺ + H₂O (acidic medium).",
        answer:
          "Fe²⁺ → Fe³⁺: oxidation number increases by 1 per Fe atom.\nCr in Cr₂O₇²⁻ (+6) → Cr³⁺ (+3): decrease of 3 per Cr atom, and there are 2 Cr atoms, so total decrease = 6 per formula unit.\nTo balance the total increase and decrease, 6 Fe²⁺ are needed for every 1 Cr₂O₇²⁻.\nBalancing charge and oxygen with H⁺ and H₂O gives the balanced equation:\n**6Fe²⁺ + Cr₂O₇²⁻ + 14H⁺ → 6Fe³⁺ + 2Cr³⁺ + 7H₂O**.",
      },
      {
        marks: 3,
        question: "Explain, with the help of oxidation numbers, why 2Na + Cl₂ → 2NaCl is a redox reaction.",
        answer:
          "In the reactants, sodium (Na) and chlorine (Cl₂) are both in the elemental state, so their oxidation numbers are 0. In the product NaCl, sodium has an oxidation number of +1 (it has lost one electron — oxidation) and chlorine has an oxidation number of −1 (it has gained one electron — reduction). Since one species (Na) is oxidised (oxidation number increases from 0 to +1) while another (Cl) is simultaneously reduced (oxidation number decreases from 0 to −1), this confirms the reaction is a redox reaction.",
      },
      {
        marks: 5,
        question:
          "(a) Describe the steps of the ion-electron (half-reaction) method for balancing redox equations in acidic medium. (b) Use it to balance: MnO₄⁻ + Fe²⁺ + H⁺ → Mn²⁺ + Fe³⁺ + H₂O.",
        answer:
          "(a) Steps: (i) split the reaction into an oxidation half-reaction and a reduction half-reaction; (ii) balance atoms other than O and H in each half-reaction; (iii) balance O by adding H₂O, then balance H by adding H⁺; (iv) balance the charge on each side by adding electrons; (v) multiply each half-reaction by a suitable factor so the electrons lost equal the electrons gained, then add the two half-reactions and cancel common terms.\n(b) Reduction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O.\nOxidation: Fe²⁺ → Fe³⁺ + e⁻ (multiply by 5 to match electrons: 5Fe²⁺ → 5Fe³⁺ + 5e⁻).\nAdding and cancelling the 5 electrons on each side gives the balanced equation:\n**MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺**.",
      },
      {
        marks: 5,
        question:
          "(a) Explain the classical (oxygen/hydrogen-based) definitions of oxidation and reduction and state one limitation of this approach. (b) How does the modern (electronic) concept overcome this limitation?",
        answer:
          "(a) Classically, **oxidation** was defined as the addition of oxygen or removal of hydrogen from a substance, and **reduction** as the addition of hydrogen or removal of oxygen. A key limitation is that many redox reactions do not involve oxygen or hydrogen at all — for example, 2Na + Cl₂ → 2NaCl clearly involves electron transfer and should be classified as a redox reaction, but the classical oxygen/hydrogen-based definitions cannot describe or classify it at all.\n(b) The modern electronic concept defines oxidation as the loss of electrons and reduction as the gain of electrons, which applies to every redox reaction regardless of whether oxygen or hydrogen is involved. This broader definition (further generalised using oxidation numbers, for reactions in covalent compounds where explicit electron transfer is less obvious) correctly classifies reactions like 2Na + Cl₂ → 2NaCl as redox reactions, since Na loses an electron (oxidised) and Cl gains an electron (reduced).",
      },
    ],
  },

  // ================================================================
  // CHAPTER 9 — HYDROGEN
  // ================================================================
  {
    id: "hydrogen",
    number: 9,
    title: "Hydrogen",
    subtitle: "The simplest, most abundant element — and a candidate for tomorrow's clean fuel",
    description:
      "Position of hydrogen in the periodic table, isotopes, preparation and properties of dihydrogen, hydrides (ionic, covalent, metallic), water — its structure, hardness and importance, and hydrogen peroxide.",
    icon: "💧",
    color: "cobalt",
    readingTime: "21 min read",
    videos: [
      {
        title: "Hydrogen — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/uPQVjxE6tw0",
      },
      {
        title: "Hydrogen and Its Compounds Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/qDzfoOASsO0",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/kR2XyPwlM5o",
      },
    ],
    notes: `
# Hydrogen

## Position of Hydrogen in the Periodic Table

Hydrogen has a single electron (1s¹) and can either lose it to form H⁺ (like alkali metals, which also have one valence electron) or gain one electron to form H⁻ (like halogens, which need one electron to complete their octet). Because of this dual behaviour, hydrogen's position in the periodic table is somewhat **ambiguous** — it is sometimes placed with Group 1 and sometimes shown separately.

## Isotopes of Hydrogen

Hydrogen has three isotopes: **protium (¹H)**, **deuterium (²H or D)** and **tritium (³H or T, radioactive)**. All three have identical chemical properties (since chemical behaviour depends on electron configuration) but differ in physical properties due to the mass difference.

::diagram:hydrogen-isotopes

## Preparation of Dihydrogen (H₂)

**Laboratory preparation:** by the reaction of dilute acids with active metals like zinc.
Zn + 2HCl → ZnCl₂ + H₂↑

**Commercial (industrial) preparation:**
- **Electrolysis of acidified water:** 2H₂O(l) →[electricity] 2H₂(g) + O₂(g).
- **From natural gas/coal (steam reforming):** CH₄(g) + H₂O(g) →[Ni catalyst, 1270 K] CO(g) + 3H₂(g), producing a mixture called **syn gas** (synthesis gas), used to make methanol and other hydrocarbons.
- **Bosch process:** the water-gas shift reaction, CO(g) + H₂O(g) →[catalyst] CO₂(g) + H₂(g), used to increase the yield of hydrogen from syn gas.

## Properties of Dihydrogen

Hydrogen is a colourless, odourless, highly flammable gas, insoluble in water, and the lightest of all gases.

### Chemical Reactions
1. **Reaction with halogens:** H₂(g) + X₂(g) → 2HX(g) (X = F, Cl, Br, I).
2. **Reaction with oxygen (combustion):** 2H₂(g) + O₂(g) → 2H₂O(l), highly exothermic — used as a clean rocket fuel (with liquid oxygen).
3. **Reaction with dinitrogen (Haber process):** N₂(g) + 3H₂(g) ⇌[Fe catalyst, high p, T] 2NH₃(g).
4. **Reaction with metals to form hydrides:** 2Na(s) + H₂(g) → 2NaH(s).
5. **Reduction of metal oxides:** H₂ can reduce oxides of metals lower in the reactivity series, e.g. CuO(s) + H₂(g) → Cu(s) + H₂O(l).
6. **Hydrogenation of oils:** unsaturated vegetable oils are hydrogenated using Ni catalyst to produce solid fats (vegetable ghee).

## Hydrides

Binary compounds of hydrogen with other elements are classified into three main types:

| Type | Formed with | Nature | Example |
|---|---|---|---|
| **Ionic (saline) hydrides** | Highly electropositive s-block metals (Group 1, 2) | Contain the hydride ion, H⁻; react violently with water | NaH, CaH₂ |
| **Covalent (molecular) hydrides** | Non-metals (p-block) | Molecular compounds held by covalent bonds | CH₄, NH₃, H₂O, HF |
| **Metallic (interstitial) hydrides** | d-block and f-block transition metals | Hydrogen atoms occupy interstitial sites in the metal lattice; usually non-stoichiometric | TiH₁.₇, PdH₀.₆ |

**Ionic hydrides react vigorously with water**, releasing hydrogen gas: NaH(s) + H₂O(l) → NaOH(aq) + H₂(g)↑.

## Water

Water is the most abundant and essential compound on Earth, and shows several unique properties due to its **bent molecular shape and extensive hydrogen bonding** (covered in Chemical Bonding).

### Structure of Water
The water molecule has a bent (angular) shape with an H-O-H bond angle of about 104.5°, due to the oxygen atom's sp³ hybridisation with two lone pairs. This bent shape, together with the electronegativity difference between O and H, gives water molecules a permanent dipole moment, allowing extensive intermolecular hydrogen bonding.

::diagram:hydrogen-bonding

### Physical Properties
Because of hydrogen bonding, water has an unusually high melting point, boiling point, specific heat capacity, and surface tension compared to hydrides of other Group 16 elements (like H₂S, which is a gas at room temperature despite S being heavier than O).

### Hardness of Water
**Hard water** contains dissolved calcium and magnesium salts (bicarbonates, chlorides, sulphates), which do not lather easily with soap (they form an insoluble scum).
- **Temporary hardness** — caused by dissolved bicarbonates of Ca and Mg; can be removed by simply **boiling** the water (which decomposes the bicarbonate to insoluble carbonate): Ca(HCO₃)₂ →[Δ] CaCO₃↓ + H₂O + CO₂.
- **Permanent hardness** — caused by dissolved chlorides and sulphates of Ca and Mg; cannot be removed by boiling. Removed instead by adding washing soda (Na₂CO₃, which precipitates the Ca²⁺/Mg²⁺ ions as insoluble carbonates), or by ion-exchange methods using synthetic resins.

## Hydrogen Peroxide (H₂O₂)

Hydrogen peroxide is prepared industrially by the auto-oxidation of 2-ethylanthraquinol, and can be prepared in the laboratory from barium peroxide and dilute sulphuric acid: BaO₂ + H₂SO₄ → BaSO₄↓ + H₂O₂.

**Structure:** H₂O₂ has an open, non-planar 'book' structure with an O-O single (peroxide) bond.

**Properties:**
- H₂O₂ acts as **both an oxidising agent and a reducing agent**, depending on the other species involved.
  - As an oxidising agent: 2Fe²⁺ + 2H⁺ + H₂O₂ → 2Fe³⁺ + 2H₂O.
  - As a reducing agent: 2KMnO₄ + 3H₂SO₄ + 5H₂O₂ → K₂SO₄ + 2MnSO₄ + 8H₂O + 5O₂ (H₂O₂ is oxidised to O₂).
- It **decomposes** on exposure to light, or in the presence of trace metal ions/catalysts, into water and oxygen: 2H₂O₂ → 2H₂O + O₂ (a disproportionation reaction). It is therefore stored in dark-coloured (opaque) bottles.

**Uses:** as a mild antiseptic and bleaching agent (for hair, textiles, paper pulp), and in rocket fuel systems (as an oxidiser).

## Hydrogen as a Fuel

Hydrogen has the potential to be used as a clean fuel because burning it produces only water as a by-product, with no carbon emissions — this is a major reason for ongoing research into hydrogen fuel cells, particularly for vehicles.
    `,
    experiments: [
      {
        id: "prep-hydrogen-zinc-acid",
        title: "Laboratory Preparation of Hydrogen Gas",
        aim: "To prepare hydrogen gas in the laboratory by the reaction of zinc with dilute hydrochloric acid, and confirm its identity.",
        materials: ["Zinc granules", "Dilute hydrochloric acid", "A flask fitted with a thistle funnel and delivery tube", "A gas jar / test tube for collection", "A burning splinter"],
        procedure: [
          "Place zinc granules in the flask and add dilute HCl through the thistle funnel.",
          "Collect the gas evolved by downward displacement of water in an inverted gas jar/test tube.",
          "Bring a burning splinter near the mouth of the collected gas jar.",
        ],
        observation: "Brisk effervescence occurs at the zinc surface, and the collected gas burns with a pale blue flame and a characteristic 'pop' sound.",
        reaction: "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
        conclusion:
          "Hydrogen gas, being lighter than air and insoluble in water, can be collected by downward displacement of water; the pop test with a burning splinter is the standard confirmatory test for hydrogen gas.",
        safety: "Hydrogen is highly flammable — perform the pop test carefully, away from the main gas supply/flask.",
        visual: {
          before: "hsl(40 30% 96%)",
          after: "hsl(40 30% 96%)",
          gas: "Hydrogen",
          labels: { before: "Zinc + dilute HCl reacting", after: "Gas collected; pops when tested" },
        },
      },
      {
        id: "ionic-hydride-water-reaction",
        title: "Reaction of an Ionic Hydride (Calcium Hydride) with Water",
        aim: "To show that ionic hydrides react vigorously with water to release hydrogen gas.",
        materials: ["Calcium hydride (CaH₂) or sodium hydride (small quantity, handled with care)", "Water", "A test tube", "A burning splinter"],
        procedure: [
          "Take a small amount of calcium hydride in a dry test tube.",
          "Carefully add a few drops of water.",
          "Test the gas evolved with a burning splinter.",
        ],
        observation: "Vigorous effervescence occurs immediately on contact with water, and the evolved gas gives a 'pop' sound with a burning splinter.",
        reaction: "CaH₂(s) + 2H₂O(l) → Ca(OH)₂(aq) + 2H₂(g)↑",
        conclusion:
          "Since CaH₂ contains the hydride ion (H⁻), which is a very strong base/reducing agent, it reacts vigorously with the H⁺ available from water to liberate hydrogen gas — a defining reaction of ionic (saline) hydrides, unlike covalent or metallic hydrides.",
        safety: "Ionic hydrides can react violently; use only a small quantity and add water carefully, from a distance if possible.",
        visual: {
          before: "hsl(40 15% 90%)",
          after: "hsl(40 15% 90%)",
          gas: "Hydrogen",
          thermal: "exothermic",
          labels: { before: "Solid CaH₂, water about to be added", after: "Vigorous bubbling on contact with water" },
        },
      },
      {
        id: "temporary-permanent-hardness",
        title: "Distinguishing Temporary and Permanent Hardness of Water",
        aim: "To show that boiling removes temporary hardness but not permanent hardness, using soap lather as the test.",
        materials: ["A sample of temporarily hard water (containing Ca/Mg bicarbonate)", "A sample of permanently hard water (containing Ca/Mg sulphate/chloride)", "Soap solution", "Test tubes", "A heat source"],
        procedure: [
          "Test the lathering of soap solution in a sample of temporarily hard water (before boiling).",
          "Boil a fresh sample of the same temporarily hard water for several minutes, cool it, then test its lathering with soap again.",
          "Repeat both steps (before and after boiling) with a sample of permanently hard water.",
        ],
        observation:
          "Temporarily hard water lathers poorly before boiling, but lathers well after boiling (once cooled). Permanently hard water lathers poorly both before and after boiling.",
        reaction: "Ca(HCO₃)₂(aq) →[boiling] CaCO₃(s)↓ + H₂O(l) + CO₂(g)↑ (removes temporary hardness)",
        conclusion:
          "Boiling decomposes the soluble bicarbonates responsible for temporary hardness into insoluble carbonate, which precipitates out and can be filtered off, softening the water. Since permanent hardness is due to soluble chlorides and sulphates (which do not decompose on heating), boiling has no effect on it — a different method (like adding washing soda) is required.",
        visual: {
          before: "hsl(200 20% 92%)",
          after: "hsl(200 20% 96%)",
          precipitate: { name: "Calcium carbonate", colour: "hsl(0 0% 95%)" },
          labels: { before: "Poor lather before boiling", after: "Good lather after boiling (temporary hardness)" },
        },
      },
      {
        id: "h2o2-decomposition-catalyst",
        title: "Catalytic Decomposition of Hydrogen Peroxide",
        aim: "To show that hydrogen peroxide decomposes into water and oxygen, and that this decomposition is sped up by a catalyst (disproportionation reaction).",
        materials: ["Hydrogen peroxide solution", "Manganese dioxide powder (catalyst)", "Two test tubes", "A glowing splinter"],
        procedure: [
          "Take equal amounts of hydrogen peroxide solution in two test tubes.",
          "Leave one tube undisturbed at room temperature (control) and add a pinch of manganese dioxide to the other.",
          "Test the gas evolved from the catalysed tube using a glowing splinter.",
        ],
        observation:
          "The control tube shows little to no visible reaction over a short time. The tube with manganese dioxide fizzes vigorously and immediately, and the glowing splinter relights when brought near it.",
        reaction: "2H₂O₂(aq) →[MnO₂ catalyst] 2H₂O(l) + O₂(g)",
        conclusion:
          "Hydrogen peroxide is thermodynamically unstable and slowly decomposes into water and oxygen even without a catalyst (which is why it is stored in dark bottles and sometimes with a stabiliser); manganese dioxide acts as a catalyst that speeds up this disproportionation reaction dramatically without being consumed itself.",
        visual: {
          before: "hsl(200 15% 96%)",
          after: "hsl(200 15% 96%)",
          gas: "Oxygen",
          labels: { before: "H₂O₂ before catalyst added", after: "Vigorous bubbling; splinter relights" },
        },
      },
      {
        id: "h2o2-oxidising-reducing",
        title: "Hydrogen Peroxide as Both an Oxidising and a Reducing Agent",
        aim: "To demonstrate the dual (oxidising and reducing) behaviour of hydrogen peroxide with two different reagents.",
        materials: ["Hydrogen peroxide solution", "Acidified potassium iodide solution", "Acidified potassium permanganate solution", "Two test tubes"],
        procedure: [
          "Add hydrogen peroxide to acidified potassium iodide solution in one test tube and observe.",
          "Add hydrogen peroxide to acidified, dilute potassium permanganate solution in a separate test tube and observe.",
        ],
        observation:
          "With acidified KI, the colourless solution turns brown/yellow (iodine is liberated). With acidified KMnO₄, the purple colour fades and effervescence (oxygen gas) is seen.",
        reaction: "Oxidising: H₂O₂ + 2KI + H₂SO₄ → K₂SO₄ + 2H₂O + I₂ ; Reducing: 5H₂O₂ + 2KMnO₄ + 3H₂SO₄ → K₂SO₄ + 2MnSO₄ + 8H₂O + 5O₂",
        conclusion:
          "With the weaker reducing agent KI, H₂O₂ acts as an oxidising agent (oxidising I⁻ to I₂, itself being reduced). With the strong oxidising agent KMnO₄, H₂O₂ instead acts as a reducing agent (reducing Mn⁷⁺ to Mn²⁺, itself being oxidised to O₂) — confirming that H₂O₂ can act as either an oxidant or a reductant, depending on what it reacts with.",
        visual: {
          before: "hsl(60 20% 95%)",
          after: "hsl(35 65% 55%)",
          labels: { before: "Colourless KI solution + H₂O₂", after: "Turns brown as I₂ is liberated" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Hydrogen's position in the periodic table is considered ambiguous because it can:",
        options: [
          "Form only H⁺ ions",
          "Form only H⁻ ions",
          "Lose an electron like alkali metals or gain one like halogens",
          "Never form ions",
        ],
        correctAnswer: 2,
        explanation: "Hydrogen can lose its single electron to form H⁺ (like Group 1 metals) or gain one electron to form H⁻ (like halogens), making its placement in the periodic table ambiguous.",
      },
      {
        question: "Which isotope of hydrogen is radioactive?",
        options: ["Protium", "Deuterium", "Tritium", "None of them"],
        correctAnswer: 2,
        explanation: "Tritium (³H), containing one proton and two neutrons, is the radioactive isotope of hydrogen; protium and deuterium are stable.",
      },
      {
        question: "Ionic (saline) hydrides are formed by the reaction of hydrogen with:",
        options: [
          "Non-metals of the p-block",
          "Highly electropositive s-block metals",
          "Transition metals only",
          "Noble gases",
        ],
        correctAnswer: 1,
        explanation: "Ionic hydrides, containing the hydride ion H⁻, are formed by highly electropositive s-block (Group 1 and 2) metals, e.g. NaH, CaH₂.",
      },
      {
        question: "Temporary hardness of water is caused by dissolved:",
        options: ["Calcium and magnesium sulphates", "Calcium and magnesium chlorides", "Calcium and magnesium bicarbonates", "Sodium chloride"],
        correctAnswer: 2,
        explanation: "Temporary hardness is caused by dissolved bicarbonates of calcium and magnesium, which decompose into insoluble carbonates on boiling.",
      },
      {
        question: "Permanent hardness of water can be removed by:",
        options: ["Simply boiling the water", "Adding washing soda (Na₂CO₃)", "Freezing the water", "Adding table salt"],
        correctAnswer: 1,
        explanation: "Since permanent hardness (from dissolved chlorides/sulphates) does not decompose on boiling, it is removed by adding washing soda, which precipitates Ca²⁺/Mg²⁺ as insoluble carbonates.",
      },
      {
        question: "The confirmatory test for hydrogen gas is that it:",
        options: [
          "Turns lime water milky",
          "Relights a glowing splinter",
          "Burns with a 'pop' sound",
          "Turns blue litmus red",
        ],
        correctAnswer: 2,
        explanation: "Hydrogen gas is confirmed by the characteristic 'pop' sound it produces when a burning splinter is brought near it.",
      },
      {
        question: "The industrial process that reacts steam with methane over a nickel catalyst to produce hydrogen is called:",
        options: ["The Bosch process", "The Haber process", "Steam reforming", "The chlor-alkali process"],
        correctAnswer: 2,
        explanation: "Steam reforming reacts methane with steam over a nickel catalyst at high temperature to produce syn gas (CO + H₂), an important industrial source of hydrogen.",
      },
      {
        question: "In H₂O₂, the O-O bond is best described as a:",
        options: ["Double bond", "Single (peroxide) bond", "Triple bond", "Ionic bond"],
        correctAnswer: 1,
        explanation: "Hydrogen peroxide contains an O-O single covalent bond, known as a peroxide linkage, which makes the molecule relatively unstable.",
      },
      {
        question: "Hydrogen peroxide is typically stored in:",
        options: ["Clear glass bottles in sunlight", "Dark-coloured (opaque) bottles", "Open metal containers", "Any container, since it is very stable"],
        correctAnswer: 1,
        explanation: "H₂O₂ decomposes readily in light and in the presence of trace metal catalysts, so it is stored in dark, opaque bottles to slow this decomposition.",
      },
      {
        question: "The bent shape of the water molecule and its consequent hydrogen bonding are responsible for its:",
        options: [
          "Unusually low boiling point",
          "Unusually high boiling point compared to other Group 16 hydrides",
          "Lack of a dipole moment",
          "Inability to dissolve ionic compounds",
        ],
        correctAnswer: 1,
        explanation: "The bent shape gives water a net dipole moment, enabling extensive hydrogen bonding, which is responsible for its unusually high boiling point compared to hydrides like H₂S.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Name the three isotopes of hydrogen.",
        answer: "Protium (¹H), deuterium (²H or D), and tritium (³H or T).",
      },
      {
        marks: 1,
        question: "Write the equation for the laboratory preparation of hydrogen from zinc and dilute hydrochloric acid.",
        answer: "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑.",
      },
      {
        marks: 2,
        question: "What is the difference between temporary and permanent hardness of water?",
        answer:
          "**Temporary hardness** is caused by dissolved calcium and magnesium bicarbonates, and can be removed simply by boiling the water (which converts the bicarbonates to insoluble carbonates). **Permanent hardness** is caused by dissolved calcium and magnesium chlorides/sulphates, and cannot be removed by boiling — it requires a chemical treatment like adding washing soda.",
      },
      {
        marks: 2,
        question: "Classify hydrides into three types based on the element they are formed with, giving one example of each.",
        answer:
          "1. **Ionic (saline) hydrides** — formed with highly electropositive s-block metals, e.g. NaH.\n2. **Covalent (molecular) hydrides** — formed with p-block non-metals, e.g. CH₄.\n3. **Metallic (interstitial) hydrides** — formed with d- and f-block transition metals, e.g. TiH₁.₇.",
      },
      {
        marks: 2,
        question: "Why is hydrogen considered a potential clean fuel for the future?",
        answer:
          "When hydrogen is burnt in oxygen, the only product is water, with no carbon dioxide or other polluting emissions, unlike fossil fuels. This makes hydrogen an attractive clean, high-energy fuel, especially when used in hydrogen fuel cells for vehicles and other applications.",
      },
      {
        marks: 3,
        question: "Explain why hydrogen peroxide can act as both an oxidising agent and a reducing agent, giving one equation for each.",
        answer:
          "In H₂O₂, oxygen has an intermediate oxidation number of −1, which can either decrease further to −2 (as H₂O₂ is reduced, meaning it acts as an oxidising agent towards another substance) or increase to 0 (as H₂O₂ is itself oxidised to O₂, meaning it acts as a reducing agent).\nAs an **oxidising agent**: H₂O₂ + 2KI + H₂SO₄ → K₂SO₄ + 2H₂O + I₂ (H₂O₂ is reduced, oxidising I⁻ to I₂).\nAs a **reducing agent**: 5H₂O₂ + 2KMnO₄ + 3H₂SO₄ → K₂SO₄ + 2MnSO₄ + 8H₂O + 5O₂ (H₂O₂ is oxidised to O₂, reducing Mn⁷⁺ to Mn²⁺).",
      },
      {
        marks: 3,
        question: "Describe two industrial (commercial) methods of preparing dihydrogen.",
        answer:
          "1. **Electrolysis of acidified water:** passing an electric current through water containing a small amount of acid/electrolyte decomposes it into hydrogen (at the cathode) and oxygen (at the anode): 2H₂O(l) → 2H₂(g) + O₂(g).\n2. **Steam reforming of natural gas:** methane is reacted with steam over a nickel catalyst at high temperature to produce a mixture of carbon monoxide and hydrogen (syn gas): CH₄(g) + H₂O(g) → CO(g) + 3H₂(g); this can be followed by the Bosch (water-gas shift) reaction, CO(g) + H₂O(g) → CO₂(g) + H₂(g), to obtain more hydrogen.",
      },
      {
        marks: 3,
        question: "Explain why ionic hydrides react vigorously with water, using calcium hydride as an example.",
        answer:
          "Ionic hydrides contain the hydride ion, H⁻, which is a very strong Brønsted base and a powerful reducing agent. When calcium hydride (CaH₂) is added to water, the hydride ion readily accepts a proton (H⁺) from a water molecule, forming hydrogen gas, while the resulting hydroxide ion combines with the calcium: CaH₂(s) + 2H₂O(l) → Ca(OH)₂(aq) + 2H₂(g)↑. Since this proton-transfer is highly favourable, the reaction is vigorous and exothermic.",
      },
      {
        marks: 5,
        question:
          "(a) Describe the structure of the water molecule and relate it to hydrogen bonding. (b) Explain, using this structure, why water has unusually high melting and boiling points compared to H₂S.",
        answer:
          "(a) In a water molecule, the oxygen atom is sp³ hybridised, with two of the four hybrid orbitals forming O-H bonds and the other two holding lone pairs. This gives water a **bent (angular)** shape, with an H-O-H bond angle of about 104.5°. Since oxygen is significantly more electronegative than hydrogen, and the bent shape means the two O-H bond dipoles do not cancel out, the molecule has a **net dipole moment**. Each hydrogen atom, bonded to the highly electronegative oxygen, can form a hydrogen bond with a lone pair on the oxygen atom of a neighbouring water molecule.\n(b) Because each water molecule can form up to four hydrogen bonds with its neighbours (two through its own H atoms, two through its lone pairs), a large, extensive hydrogen-bonded network exists in liquid water, which requires significant extra energy to break. H₂S, though structurally similar (also bent, from a Group 16 element), does not form significant hydrogen bonds because sulphur is much less electronegative than oxygen — so H₂S is a gas at room temperature, while water, despite its much lower molar mass, is a liquid with unusually high melting and boiling points.",
      },
      {
        marks: 5,
        question:
          "(a) What is meant by hardness of water, and why is hard water unsuitable for washing with soap? (b) Describe, with an equation, how ion-exchange resins can be used to soften hard water.",
        answer:
          "(a) Hardness of water refers to the presence of dissolved calcium and magnesium salts (bicarbonates, chlorides or sulphates) in water. When soap (a sodium/potassium salt of a fatty acid) is used in hard water, the Ca²⁺ and Mg²⁺ ions react with the soap to form an insoluble, sticky scum (calcium/magnesium salts of the fatty acid), wasting soap and reducing its ability to lather and clean effectively.\n(b) An ion-exchange resin (often a synthetic polymer with acidic -SO₃H or -COOH groups) exchanges its own H⁺ ions for the Ca²⁺ and Mg²⁺ ions present in hard water as it passes through: 2R-COOH (resin) + Ca²⁺(aq) → (R-COO)₂Ca (resin) + 2H⁺(aq). Since the hardness-causing ions are trapped on the resin and replaced by H⁺ (which does not cause hardness), the water passing through becomes soft; the resin can later be regenerated by washing it with a strong acid solution.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 10 — THE S-BLOCK ELEMENTS
  // ================================================================
  {
    id: "s-block-elements",
    number: 10,
    title: "The s-Block Elements",
    subtitle: "Alkali and alkaline earth metals — reactive, industrially vital, and biologically essential",
    description:
      "General characteristics of Group 1 (alkali metals) and Group 2 (alkaline earth metals), their trends in reactivity, important compounds like sodium carbonate, sodium hydroxide, calcium oxide and Plaster of Paris, and the biological role of Na, K, Mg and Ca.",
    icon: "🧂",
    color: "iris",
    readingTime: "24 min read",
    videos: [
      {
        title: "s-Block Elements — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/fPYtQ6qgh6E",
      },
      {
        title: "Alkali and Alkaline Earth Metals Explained",
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
# The s-Block Elements

## General Characteristics of s-Block Elements

The s-block consists of **Group 1 (alkali metals: Li, Na, K, Rb, Cs, Fr)** and **Group 2 (alkaline earth metals: Be, Mg, Ca, Sr, Ba, Ra)**, whose valence electrons occupy an s sub-shell (ns¹ for Group 1, ns² for Group 2).

## Group 1 — Alkali Metals

Alkali metals are soft (can be cut with a knife), have low densities, and have low melting and boiling points compared to other metals. They have the **largest atomic and ionic radii** in their respective periods, and the **lowest ionisation enthalpies** among all elements of their periods, making them extremely reactive.

### Chemical Properties
1. **Reaction with water:** vigorous, forming a hydroxide and hydrogen gas, with reactivity increasing down the group (Li reacts calmly, while K, Rb, Cs react explosively). 2Na + 2H₂O → 2NaOH + H₂↑.
2. **Reaction with oxygen:** Li forms only the normal oxide (Li₂O); Na forms the peroxide (Na₂O₂); K, Rb, Cs form the superoxide (KO₂), reflecting the increasing stability of larger anions with larger cations.
3. **Reaction with hydrogen:** form ionic hydrides, e.g. 2Na + H₂ → 2NaH.
4. **Reducing nature:** all alkali metals are strong reducing agents, lithium being the strongest (due to its very high hydration enthalpy, despite having the highest ionisation enthalpy in the group).

### Anomalous Behaviour of Lithium
Lithium differs from the rest of Group 1 due to its exceptionally small size: it forms a largely covalent, unstable carbonate/nitrate, its compounds are more soluble in organic solvents, and it shows a diagonal relationship with magnesium.

## Group 2 — Alkaline Earth Metals

Alkaline earth metals are harder than alkali metals of the same period, and have higher melting points, boiling points and densities, because of their smaller size and two valence electrons contributing to stronger metallic bonding.

### Chemical Properties
1. **Reaction with water:** less vigorous than the corresponding alkali metal; Be does not react with water even on heating, Mg reacts only with steam, while Ca, Sr, Ba react readily with cold water. Ca + 2H₂O → Ca(OH)₂ + H₂↑.
2. **Reaction with oxygen:** all form the normal oxide, MO, on burning in air/oxygen; Ba also forms the peroxide, BaO₂.
3. **Reaction with hydrogen:** all (except Be) form ionic hydrides, e.g. CaH₂.
4. **Solubility trend of hydroxides and sulphates:** the solubility of Group 2 **hydroxides increases down the group** (Mg(OH)₂ is only sparingly soluble, Ba(OH)₂ is quite soluble), while the solubility of Group 2 **sulphates decreases down the group** (MgSO₄ is soluble, BaSO₄ is highly insoluble).

### Anomalous Behaviour of Beryllium
Beryllium, like lithium, is anomalous due to its very small size: it shows more covalent character in its compounds, does not react with water, and shows a diagonal relationship with aluminium.

## Important Compounds of Sodium

### Sodium Carbonate (Washing Soda), Na₂CO₃·10H₂O
Manufactured by the **Solvay process**: brine (concentrated NaCl solution) is saturated with ammonia and then treated with CO₂, precipitating sodium bicarbonate, which is then heated (calcined) to give sodium carbonate. Used in softening hard water, and in the manufacture of glass, soap and paper.

### Sodium Hydroxide (Caustic Soda), NaOH
Manufactured by the **electrolysis of brine** (chlor-alkali process): 2NaCl(aq) + 2H₂O(l) →[electricity] 2NaOH(aq) + Cl₂(g) + H₂(g). Used in the manufacture of soap, paper, artificial fibres (rayon), and in the petroleum industry.

### Sodium Hydrogencarbonate (Baking Soda), NaHCO₃
Prepared by passing CO₂ through a saturated solution of sodium chloride containing ammonia. On heating, it decomposes: 2NaHCO₃ →[Δ] Na₂CO₃ + H₂O + CO₂. Used in baking, as a mild antacid, and in fire extinguishers.

## Important Compounds of Calcium

### Calcium Oxide (Quick Lime), CaO
Prepared by heating (calcining) limestone: CaCO₃ →[Δ, ~1070–1270 K] CaO + CO₂. Reacts vigorously (and exothermically) with water to give slaked lime: CaO + H₂O → Ca(OH)₂. Used in the manufacture of cement and in the purification of sugar.

### Calcium Hydroxide (Slaked Lime), Ca(OH)₂
An aqueous solution of Ca(OH)₂ is called **lime water**, which turns milky when CO₂ is passed through it (a standard test for CO₂) due to insoluble CaCO₃ forming: Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O. Passing excess CO₂ redissolves the precipitate as soluble calcium bicarbonate.

### Calcium Carbonate, CaCO₃
Occurs naturally as limestone, marble and chalk. Used as a building material and in the manufacture of quick lime and cement.

### Calcium Sulphate Hemihydrate (Plaster of Paris), CaSO₄·½H₂O
Obtained by heating gypsum (CaSO₄·2H₂O) at about 393 K. Sets into a hard mass of gypsum on mixing with water, and is used for immobilising fractured bones and making decorative items.

### Cement
A mixture of calcium silicates and aluminates, made by heating a mixture of limestone and clay; the approximate mass composition ratio of CaO : SiO₂ : Al₂O₃ is about 3 : 1 : 0.25. When mixed with water, it undergoes hydration and sets into a hard, strong mass, which is why it is a fundamental construction material.

## Biological Importance of Sodium, Potassium, Magnesium and Calcium

- **Sodium and potassium ions** are essential for the transmission of nerve signals, and for maintaining the balance of fluids and electrolytes inside and outside cells (Na⁺ is the main extracellular cation, K⁺ the main intracellular cation).
- **Magnesium** is present at the centre of the chlorophyll molecule, essential for photosynthesis, and is also required for various enzyme activities.
- **Calcium** is essential for building and maintaining bones and teeth, and plays a key role in blood clotting and muscle contraction.
    `,
    experiments: [
      {
        id: "alkali-metal-water-reactivity",
        title: "Comparing the Reactivity of Alkali Metals with Water",
        aim: "To observe the increasing reactivity of alkali metals with water down Group 1 (typically demonstrated with lithium and sodium; potassium only by teacher demonstration due to its violent reaction).",
        materials: ["Small pieces of lithium and sodium metal", "A large trough of water", "Phenolphthalein indicator", "Tongs and a knife"],
        procedure: [
          "Add a small, freshly cut piece of lithium to a trough of water containing a few drops of phenolphthalein.",
          "In a separate trough, add a small piece of sodium metal and observe closely from a safe distance.",
          "Note the vigour of the reaction (speed of movement/fizzing) and the colour change due to phenolphthalein.",
        ],
        observation:
          "Lithium reacts steadily, floating and fizzing gently, releasing gas bubbles; the solution turns pink. Sodium reacts much more vigorously, moving rapidly across the surface, melting into a small ball from the heat released, and the solution turns pink faster and more intensely.",
        reaction: "2M(s) + 2H₂O(l) → 2MOH(aq) + H₂(g)↑ (M = Li, Na)",
        conclusion:
          "As atomic size increases and ionisation enthalpy decreases down Group 1, the reactivity of alkali metals with water increases — sodium reacts more vigorously than lithium, and this trend continues even more dramatically with potassium, rubidium and caesium (which ignite the hydrogen produced).",
        safety: "Alkali metals react violently with water; use only small pieces and perform this only under teacher supervision, from behind a safety screen.",
        visual: {
          before: "hsl(200 30% 92%)",
          after: "hsl(330 60% 75%)",
          gas: "Hydrogen",
          thermal: "exothermic",
          labels: { before: "Metal added to water + phenolphthalein", after: "Fizzes; solution turns pink" },
        },
      },
      {
        id: "flame-test-group1-group2",
        title: "Flame Tests for Group 1 and Group 2 Metal Ions",
        aim: "To identify alkali and alkaline earth metal ions using their characteristic flame colours.",
        materials: ["Salts of Li, Na, K (Group 1) and Ca, Sr, Ba (Group 2), e.g. chlorides", "A nichrome wire loop", "Concentrated HCl", "A Bunsen burner"],
        procedure: [
          "Clean the nichrome wire in concentrated HCl and heat it in the flame until no colour is seen.",
          "Dip the wire in each salt sample in turn and observe the flame colour, cleaning the wire between tests.",
        ],
        observation:
          "Li gives crimson-red; Na gives golden-yellow; K gives lilac; Ca gives brick-red; Sr gives crimson (slightly different shade from Li); Ba gives apple/pale green.",
        conclusion:
          "Each alkali and alkaline earth metal ion produces a unique flame colour because heat excites its outer electrons to a higher energy level, and the specific energy released as they fall back corresponds to a characteristic wavelength (colour) of visible light — a simple, classic qualitative test used to identify these elements.",
        visual: {
          before: "hsl(30 10% 20%)",
          after: "hsl(120 40% 55%)",
          flame: true,
          labels: { before: "Clean wire in flame", after: "Apple-green flame — barium" },
        },
      },
      {
        id: "solubility-trend-group2-sulphates",
        title: "Testing the Solubility Trend of Group 2 Sulphates",
        aim: "To confirm that the solubility of Group 2 sulphates decreases down the group.",
        materials: ["Solutions of MgCl₂, CaCl₂, SrCl₂ and BaCl₂", "Dilute sulphuric acid or sodium sulphate solution", "Test tubes"],
        procedure: [
          "Add dilute sulphuric acid (or sodium sulphate solution) to separate test tubes each containing MgCl₂, CaCl₂, SrCl₂ and BaCl₂ solutions.",
          "Observe whether a precipitate forms immediately, slowly, or not at all in each case.",
        ],
        observation:
          "MgCl₂ shows no visible precipitate (MgSO₄ is soluble). CaCl₂ gives a faint/slow precipitate. SrCl₂ gives a more noticeable precipitate. BaCl₂ gives an immediate, dense white precipitate.",
        reaction: "BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
        conclusion:
          "The solubility of Group 2 metal sulphates decreases down the group (Mg > Ca > Sr > Ba), because the lattice enthalpy of these sulphates decreases only slightly down the group (the SO₄²⁻ ion is large), while the hydration enthalpy of the cation decreases more sharply as the cation gets larger — making dissolution progressively less favourable for the heavier members.",
        visual: {
          before: "hsl(200 20% 95%)",
          after: "hsl(200 15% 90%)",
          precipitate: { name: "Barium sulphate", colour: "hsl(0 0% 96%)" },
          labels: { before: "BaCl₂ solution, sulphate about to be added", after: "Dense white BaSO₄ precipitate forms" },
        },
      },
      {
        id: "lime-water-co2-test",
        title: "Preparation of Lime Water and the Carbon Dioxide Test",
        aim: "To prepare lime water from calcium oxide, and use it to test for carbon dioxide gas.",
        materials: ["Calcium oxide (quick lime)", "Water", "A source of CO₂ gas (e.g. from marble chips + dilute HCl)", "Test tubes and a delivery tube"],
        procedure: [
          "Add a small amount of calcium oxide to water, stir, and allow the excess (undissolved) solid to settle; decant/filter the clear supernatant liquid — this is lime water.",
          "Pass CO₂ gas (from a separate reaction of marble chips with dilute HCl) through the clear lime water.",
          "Continue passing excess CO₂ and observe further.",
        ],
        observation:
          "The clear lime water turns milky as the gas is passed through initially; passing excess gas for longer eventually clears the milkiness again.",
        reaction: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) ; Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ + H₂O(l) ; CaCO₃(s) + CO₂(g) + H₂O(l) → Ca(HCO₃)₂(aq) (soluble, clears milkiness)",
        conclusion:
          "Lime water turning milky is the standard laboratory test for carbon dioxide, due to the formation of insoluble calcium carbonate; the milkiness disappearing on passing excess CO₂ is due to the further reaction forming soluble calcium bicarbonate.",
        visual: {
          before: "hsl(200 30% 95%)",
          after: "hsl(200 15% 88%)",
          precipitate: { name: "Calcium carbonate", colour: "hsl(0 0% 95%)" },
          labels: { before: "Clear lime water", after: "Turns milky as CO₂ passes through" },
        },
      },
      {
        id: "plaster-of-paris-setting",
        title: "Preparing Plaster of Paris and Observing Its Setting",
        aim: "To prepare Plaster of Paris by heating gypsum, and to observe its setting reaction with water.",
        materials: ["Gypsum powder (CaSO₄·2H₂O)", "A crucible and burner", "Water", "A small mould/container"],
        procedure: [
          "Heat gypsum powder gently in a crucible at a moderate temperature (avoiding overheating, which would produce dead-burnt plaster).",
          "Mix the resulting white Plaster of Paris powder with a small amount of water into a smooth paste.",
          "Pour the paste into a small mould and observe as it sets over several minutes.",
        ],
        observation: "The gypsum loses some of its water of crystallisation on gentle heating, forming a fine white powder; when this powder is mixed with water it becomes warm and sets into a hard solid mass within minutes.",
        reaction: "CaSO₄·2H₂O(s) →[~393 K] CaSO₄·½H₂O(s) + 1½H₂O(g) ; CaSO₄·½H₂O(s) + 1½H₂O(l) → CaSO₄·2H₂O(s) (sets, exothermic)",
        conclusion:
          "Careful, moderate heating of gypsum removes part of its water of crystallisation to give Plaster of Paris; adding water back reverses this reaction, and the resulting interlocking crystals of gypsum that reform give Plaster of Paris its useful property of setting into a hard, dimensionally accurate mass — which is why it is used for casts, moulds and construction.",
        visual: {
          before: "hsl(40 15% 92%)",
          after: "hsl(40 10% 97%)",
          thermal: "exothermic",
          labels: { before: "Plaster of Paris paste, just mixed", after: "Sets into hard gypsum" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Alkali metals belong to which group of the periodic table?",
        options: ["Group 1", "Group 2", "Group 17", "Group 18"],
        correctAnswer: 0,
        explanation: "Alkali metals (Li, Na, K, Rb, Cs, Fr) belong to Group 1, all having a single s-electron in their valence shell (ns¹).",
      },
      {
        question: "Which alkali metal reacts most vigorously with cold water?",
        options: ["Lithium", "Sodium", "Potassium", "Reactivity is the same for all"],
        correctAnswer: 2,
        explanation: "Reactivity with water increases down Group 1, so potassium (further down the group than Li or Na) reacts most vigorously, even igniting the hydrogen produced.",
      },
      {
        question: "The solubility of Group 2 metal hydroxides in water:",
        options: ["Decreases down the group", "Increases down the group", "Stays constant", "Is zero for all of them"],
        correctAnswer: 1,
        explanation: "Group 2 hydroxide solubility increases down the group; Mg(OH)₂ is only sparingly soluble, while Ba(OH)₂ is considerably more soluble.",
      },
      {
        question: "Which Group 2 element does NOT react with water even on heating?",
        options: ["Magnesium", "Calcium", "Beryllium", "Barium"],
        correctAnswer: 2,
        explanation: "Beryllium, due to its very small size and high charge density, does not react with water at all, unlike the other Group 2 metals.",
      },
      {
        question: "Sodium hydroxide is manufactured industrially by:",
        options: ["Roasting sodium chloride", "The electrolysis of brine (chlor-alkali process)", "Heating sodium carbonate", "Reacting sodium with water in a factory"],
        correctAnswer: 1,
        explanation: "NaOH is manufactured by the chlor-alkali process — the electrolysis of concentrated brine (aqueous NaCl) — which also produces chlorine and hydrogen gas.",
      },
      {
        question: "The compound formed when calcium oxide reacts with water is:",
        options: ["Calcium carbonate", "Calcium hydroxide (slaked lime)", "Calcium chloride", "Calcium sulphate"],
        correctAnswer: 1,
        explanation: "CaO + H₂O → Ca(OH)₂, an exothermic reaction producing slaked lime.",
      },
      {
        question: "Sodium carbonate (washing soda) is industrially manufactured by:",
        options: ["The chlor-alkali process", "The Solvay process", "The Haber process", "The Bosch process"],
        correctAnswer: 1,
        explanation: "The Solvay process manufactures sodium carbonate from brine saturated with ammonia and treated with CO₂.",
      },
      {
        question: "Which alkali metal is anomalous compared to the rest of its group, and shows a diagonal relationship with magnesium?",
        options: ["Sodium", "Potassium", "Lithium", "Caesium"],
        correctAnswer: 2,
        explanation: "Lithium, being much smaller than the other alkali metals, behaves anomalously and shows a diagonal relationship with magnesium.",
      },
      {
        question: "Which of these elements is essential at the centre of the chlorophyll molecule?",
        options: ["Sodium", "Potassium", "Calcium", "Magnesium"],
        correctAnswer: 3,
        explanation: "Magnesium is present at the centre of the chlorophyll molecule and is essential for photosynthesis in plants.",
      },
      {
        question: "The formula of Plaster of Paris is:",
        options: ["CaSO₄·2H₂O", "CaSO₄·½H₂O", "CaCO₃", "CaSO₄ (anhydrous)"],
        correctAnswer: 1,
        explanation: "Plaster of Paris is calcium sulphate hemihydrate, CaSO₄·½H₂O, obtained by carefully heating gypsum (CaSO₄·2H₂O).",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Name the elements of Group 2 (alkaline earth metals).",
        answer: "Beryllium, magnesium, calcium, strontium, barium and radium (Be, Mg, Ca, Sr, Ba, Ra).",
      },
      {
        marks: 1,
        question: "Write the formula and common name of the compound used to make lime water.",
        answer: "Calcium hydroxide, Ca(OH)₂, dissolved in water; commonly known as lime water (or, as a paste, slaked lime).",
      },
      {
        marks: 2,
        question: "Why does reactivity with water increase down Group 1?",
        answer:
          "Down Group 1, atomic size increases and ionisation enthalpy decreases, meaning the outermost electron is held less tightly and is easier to lose. Since the reaction with water involves losing this electron to form the metal cation, the reaction becomes progressively more vigorous (faster and more exothermic) down the group.",
      },
      {
        marks: 2,
        question: "State two ways in which lithium behaves differently from the other alkali metals.",
        answer:
          "1. Lithium forms only the normal oxide (Li₂O) on burning in air, unlike sodium (which forms the peroxide, Na₂O₂) or potassium (which forms the superoxide, KO₂).\n2. Lithium's carbonate and nitrate decompose on heating to give the oxide (like Group 2 metals), unlike the other alkali metal carbonates, which are much more thermally stable.",
      },
      {
        marks: 2,
        question: "Write the balanced equation for the Solvay process step that produces sodium bicarbonate.",
        answer: "NaCl + NH₃ + CO₂ + H₂O → NaHCO₃(s)↓ + NH₄Cl(aq); the resulting sodium bicarbonate is then heated (calcined) to give sodium carbonate: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂.",
      },
      {
        marks: 3,
        question: "Explain the trend in solubility of Group 2 sulphates down the group.",
        answer:
          "The solubility of Group 2 sulphates decreases down the group (MgSO₄ soluble, down to BaSO₄ nearly insoluble). This is because the sulphate ion (SO₄²⁻) is large, so the lattice enthalpy of these sulphates changes relatively little down the group, but the hydration enthalpy of the cation decreases significantly as the cation gets larger (Mg²⁺ to Ba²⁺). Since dissolution becomes less energetically favourable as hydration enthalpy falls faster than lattice enthalpy, solubility decreases down the group.",
      },
      {
        marks: 3,
        question: "Describe the biological importance of sodium and potassium ions in the human body.",
        answer:
          "Sodium ions (Na⁺) are the main cation found outside body cells (in extracellular fluid), while potassium ions (K⁺) are the main cation found inside body cells (in intracellular fluid). This concentration difference across the cell membrane is essential for the transmission of nerve impulses (the sodium-potassium pump maintains this gradient), for maintaining osmotic balance and fluid volume in the body, and for the normal functioning of muscles, including the heart.",
      },
      {
        marks: 3,
        question: "What is temporary hardness of water and how does it relate to Group 2 elements?",
        answer:
          "Temporary hardness of water is caused by dissolved bicarbonates of calcium and magnesium (both Group 2 elements). On boiling, these soluble bicarbonates decompose into insoluble carbonates, which precipitate out, removing the hardness: Ca(HCO₃)₂ →[Δ] CaCO₃↓ + H₂O + CO₂.",
      },
      {
        marks: 5,
        question:
          "(a) Describe the manufacture of sodium hydroxide by the chlor-alkali process, including the products formed at each electrode. (b) State two important industrial uses of sodium hydroxide.",
        answer:
          "(a) The chlor-alkali process manufactures sodium hydroxide by the electrolysis of concentrated aqueous sodium chloride (brine): 2NaCl(aq) + 2H₂O(l) →[electricity] 2NaOH(aq) + Cl₂(g) + H₂(g). Chlorine gas is liberated at the **anode**, hydrogen gas is liberated at the **cathode**, and sodium hydroxide accumulates in solution near the cathode.\n(b) Sodium hydroxide is used in the manufacture of soaps and detergents, and in the manufacture of paper and artificial fibres like rayon (it is also used in petroleum refining and to de-grease metal surfaces).",
      },
      {
        marks: 5,
        question:
          "(a) Explain why beryllium and lithium show anomalous behaviour compared to the rest of their respective groups. (b) Give one example of the diagonal relationship shown by each.",
        answer:
          "(a) Both lithium (Group 1) and beryllium (Group 2) are the first (smallest) members of their groups. Their exceptionally small atomic size gives them a very high charge density (charge-to-size ratio), which causes them to polarise nearby ions strongly and form bonds with significantly more covalent character than the rest of their group. They also lack low-lying d-orbitals available for bonding, unlike heavier members of their groups.\n(b) **Lithium** shows a diagonal relationship with **magnesium** — for example, both Li and Mg form a normal oxide (not a peroxide) on combustion in air, and both form fairly covalent chlorides that dissolve in organic solvents like ethanol. **Beryllium** shows a diagonal relationship with **aluminium** — for example, both Be and Al are amphoteric (their oxides/hydroxides react with both acids and bases), and both form covalent chlorides that exist as dimers in the vapour phase.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 11 — SOME P-BLOCK ELEMENTS
  // ================================================================
  {
    id: "some-p-block-elements",
    number: 11,
    title: "Some p-Block Elements",
    subtitle: "Boron and carbon families — from borax to diamond to dry ice",
    description:
      "General characteristics of Group 13 (boron family) and Group 14 (carbon family), important trends and compounds — borax, boric acid, aluminium, the allotropes of carbon, silicates and silicones.",
    icon: "💎",
    color: "moss",
    readingTime: "25 min read",
    videos: [
      {
        title: "The p-Block Elements (Groups 13 & 14) — Full Chapter",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/3zt6l5vRnKk",
      },
      {
        title: "Boron and Carbon Family Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/2mQhw6yKMdE",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/BS-oXWKF44w",
      },
    ],
    notes: `
# Some p-Block Elements

## General Introduction to the p-Block

The p-block consists of elements in Groups 13 to 18, whose valence electron configuration is ns²np¹⁻⁶. This chapter focuses on **Group 13 (the boron family)** and **Group 14 (the carbon family)**.

## Group 13 — The Boron Family

**Members:** B, Al, Ga, In, Tl. Valence configuration ns²np¹.

### General Trends
- **Electronic configuration:** all have 3 valence electrons, giving a common oxidation state of **+3**; however, heavier members (especially Tl) increasingly show a stable **+1** oxidation state too, due to the **inert pair effect** (the reluctance of the ns² electron pair to participate in bonding, which becomes more pronounced down the group).
- **Boron** is a non-metal/metalloid, while the rest of the group are metals.
- **Atomic size** increases down the group (with an unusually small jump between Al and Ga, since Ga follows the d-block contraction).
- **Ionisation enthalpy** generally decreases down the group (with some irregularity), and boron has an unusually high ionisation enthalpy due to its very small size.

### Boron and Its Compounds

**Borax (Na₂B₄O₇·10H₂O)** is the most important compound of boron, used in the borax bead test (used to identify coloured metal ions), in the glass and ceramics industry, and as a mild antiseptic.

**Boric acid (H₃BO₃)** is a weak, monobasic acid — but unusually, it does not ionise by donating a proton itself; instead it acts as a **Lewis acid**, accepting a hydroxide ion from water: B(OH)₃ + H₂O ⇌ [B(OH)₄]⁻ + H⁺.

**Diborane (B₂H₆)** is the simplest boron hydride, with an unusual bonging structure containing two **three-centre two-electron (banana) bonds** bridging the boron atoms via hydrogen — this is because boron does not have enough valence electrons to form conventional two-centre two-electron bonds to all its neighbouring atoms (it is described as **electron-deficient**).

### Uses of Aluminium
Aluminium, the most abundant metal in the Earth's crust, is widely used because of its low density, good electrical conductivity, resistance to corrosion (due to a thin, tough, self-protecting oxide layer) and malleability — used in aircraft, packaging (foil), electrical cables and construction.

## Group 14 — The Carbon Family

**Members:** C, Si, Ge, Sn, Pb. Valence configuration ns²np².

### General Trends
- **Common oxidation states:** +4 and +2, with the **+2 state becoming increasingly stable down the group** (again due to the inert pair effect) — carbon and silicon mostly show +4, while lead is more stable as Pb²⁺ than Pb⁴⁺.
- **Nature:** carbon is a non-metal, silicon and germanium are metalloids, and tin and lead are metals.
- **Catenation** (self-linking to form chains) is most pronounced in carbon (due to its small size and strong C-C bonds), and decreases sharply down the group.

### Allotropes of Carbon

- **Diamond** — each carbon atom is sp³ hybridised and bonded to four other carbon atoms in a rigid, three-dimensional tetrahedral network, making it the hardest known natural substance, with a very high melting point; it does not conduct electricity, since all valence electrons are used in strong, localised covalent bonds.
- **Graphite** — each carbon atom is sp² hybridised and bonded to three others in flat, hexagonal layers; the layers are held together by weak van der Waals forces, allowing them to slide over one another, making graphite soft and slippery (used as a lubricant and in pencils); the delocalised electron in the unhybridised p-orbital allows graphite to conduct electricity.
- **Fullerenes** — a form of carbon consisting of discrete, cage-like molecules (like C₆₀, "buckminsterfullerene," shaped like a football/soccer ball), the only pure, crystalline allotrope of carbon apart from diamond and graphite; each carbon is sp² hybridised.

::diagram:carbon-allotropes

::diagram:diamond-structure

::diagram:graphite-structure

::diagram:fullerene-c60

### Important Compounds

**Carbon monoxide (CO)** is formed by the incomplete combustion of carbon/carbon compounds; it is highly toxic because it binds to haemoglobin nearly 300 times more strongly than oxygen does, preventing oxygen transport in blood.

**Carbon dioxide (CO₂)** is a linear molecule, prepared industrially by heating limestone, and is essential for photosynthesis; solid CO₂ (dry ice) is used as a refrigerant, since it sublimes directly from solid to gas without leaving any liquid residue.

**Silicon dioxide (silica, SiO₂)** exists as a covalent, three-dimensional network solid (unlike CO₂, which is a simple molecular gas), because silicon (being larger than carbon) cannot easily form strong π bonds with oxygen — instead each silicon atom is bonded to four oxygen atoms via single (σ) bonds, and each oxygen bridges two silicon atoms, giving quartz its very high melting point and hardness.

**Silicones** are synthetic organosilicon polymers containing repeating R₂SiO units, used as sealants, lubricants, and in water-proofing fabrics, due to their high thermal stability and water-repellent nature.

**Silicates** are a large class of minerals built from SiO₄⁴⁻ tetrahedral units, which can share corners to form chains, sheets or three-dimensional frameworks — the basis of minerals like feldspar, mica, asbestos and zeolites (which are used as molecular sieves and ion-exchangers, for example in water softening).
    `,
    experiments: [
      {
        id: "borax-bead-test",
        title: "The Borax Bead Test for Metal Ions",
        aim: "To identify a coloured metal ion using the classic borax bead test.",
        materials: ["Borax powder", "A nichrome/platinum wire loop", "Samples of coloured metal salts (e.g. copper sulphate, nickel sulphate, cobalt chloride)", "A Bunsen burner"],
        procedure: [
          "Heat a small amount of borax on a nichrome wire loop until it swells and then collapses into a clear, colourless glassy bead.",
          "Touch the hot bead to a small amount of a coloured metal salt, then reheat it in the flame.",
          "Observe the colour of the bead, both in the oxidising (outer) and reducing (inner) parts of the flame if possible.",
        ],
        observation:
          "A copper salt gives a blue bead in the oxidising flame; a cobalt salt gives a deep blue bead; a nickel salt gives a brown/yellow bead — each metal produces a characteristic bead colour.",
        reaction: "Na₂B₄O₇ →[Δ] 2NaBO₂ + B₂O₃ (glassy); B₂O₃ + metal oxide → coloured metal borate",
        conclusion:
          "On strong heating, borax loses water and decomposes to a mixture of sodium metaborate and boric anhydride, which combines with the metal oxide to form a characteristically coloured metal borate glass — a classic qualitative test that helped identify certain transition metal ions before modern instrumental methods.",
        visual: {
          before: "hsl(200 10% 90%)",
          after: "hsl(220 60% 45%)",
          flame: true,
          labels: { before: "Clear borax bead formed", after: "Blue bead — confirms copper" },
        },
      },
      {
        id: "aluminium-passivation",
        title: "The Protective Oxide Layer on Aluminium",
        aim: "To show that aluminium is protected from further corrosion by a thin, self-forming oxide layer, unlike iron.",
        materials: ["A clean strip of aluminium foil/sheet", "A clean strip of iron", "Dilute copper sulphate solution (or exposure to moist air over time)", "Sandpaper"],
        procedure: [
          "Expose freshly sanded strips of aluminium and iron to air (or dip briefly in dilute CuSO₄ solution) and observe them over several minutes and again after a day.",
          "Note any surface changes on each strip.",
          "Scratch the surface of the aluminium strip deeply and observe if it continues to corrode further at the scratch over the next day.",
        ],
        observation:
          "The iron strip visibly rusts (develops a reddish-brown coating) and continues to corrode further with exposure over time. The aluminium strip develops only a very thin, invisible layer and otherwise remains bright and unchanged, even at the scratch after a day.",
        reaction: "4Al(s) + 3O₂(g) → 2Al₂O₃(s) (thin, dense, adherent oxide layer)",
        conclusion:
          "Aluminium reacts with atmospheric oxygen to form an extremely thin, dense, and tightly adherent layer of aluminium oxide (Al₂O₃) that completely seals the metal surface from further attack, preventing continued corrosion — unlike the porous, flaky rust layer formed on iron, which does not protect the metal underneath. This natural passivation is why aluminium is so widely used in construction and packaging despite being a reactive metal.",
        visual: {
          before: "hsl(210 8% 78%)",
          after: "hsl(210 8% 78%)",
          labels: { before: "Freshly sanded aluminium", after: "Stays bright — thin oxide layer protects it" },
        },
      },
      {
        id: "co2-generation-limewater-dryice",
        title: "Generating and Testing Carbon Dioxide, and Observing Dry Ice",
        aim: "To generate CO₂ from limestone, confirm it with lime water, and observe the sublimation of solid CO₂ (dry ice).",
        materials: ["Marble chips (CaCO₃)", "Dilute hydrochloric acid", "A flask with delivery tube", "Lime water", "A small piece of dry ice (if available) or a description/video demonstration"],
        procedure: [
          "React marble chips with dilute HCl in a flask fitted with a delivery tube, and pass the evolved gas into lime water.",
          "Note the change in the lime water.",
          "If available, observe a small piece of solid CO₂ (dry ice) left in open air at room temperature, noting whether any liquid forms.",
        ],
        observation:
          "Brisk effervescence occurs and the gas turns lime water milky. The dry ice gradually shrinks and disappears directly into a white gas/mist (which is actually condensed water vapour in the surrounding air, not the CO₂ itself), with no liquid puddle forming.",
        reaction: "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)↑ ; Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ + H₂O(l)",
        conclusion:
          "CO₂ generated from a carbonate and an acid is confirmed by the lime water test. Solid CO₂ (dry ice) sublimes directly from solid to gas at atmospheric pressure without passing through a liquid phase, which is exactly why it is so useful as a mess-free refrigerant.",
        safety: "Do not touch dry ice with bare skin — it is extremely cold and can cause frostbite-like burns; handle only with insulated gloves or tongs.",
        visual: {
          before: "hsl(200 30% 95%)",
          after: "hsl(200 15% 88%)",
          gas: "Carbon dioxide",
          precipitate: { name: "Calcium carbonate", colour: "hsl(0 0% 95%)" },
          labels: { before: "Clear lime water", after: "Turns milky as CO₂ passes through" },
        },
      },
      {
        id: "graphite-conductivity",
        title: "Testing the Electrical Conductivity of Graphite Versus Diamond",
        aim: "To show that graphite conducts electricity while diamond does not, and relate this to their bonding structures.",
        materials: ["A pencil 'lead' (graphite) or graphite rod", "A small diamond sample (or a description if unavailable)", "A simple conductivity circuit (battery, bulb, wires, crocodile clips)"],
        procedure: [
          "Connect a graphite rod (or pencil lead) into the conductivity circuit and note whether the bulb lights up.",
          "If available, test a diamond sample the same way (or discuss the known result if a sample is unavailable).",
        ],
        observation: "The bulb lights up brightly when graphite is connected into the circuit, showing it conducts electricity. Diamond does not conduct electricity at all.",
        conclusion:
          "In graphite, each carbon atom is sp² hybridised and bonded to only three other carbons within a flat hexagonal layer, leaving one electron per atom delocalised in an unhybridised p-orbital that is free to move along the layer, allowing conduction. In diamond, each carbon is sp³ hybridised and forms four strong, localised covalent bonds to other carbons in a rigid 3D network, leaving no free/delocalised electrons, so diamond does not conduct electricity.",
        visual: {
          before: "hsl(0 0% 20%)",
          after: "hsl(48 90% 55%)",
          labels: { before: "Graphite rod in circuit", after: "Bulb lights — graphite conducts" },
        },
      },
      {
        id: "silica-silicate-model",
        title: "Building a Model of the Silicate (SiO₄) Tetrahedron",
        aim: "To construct a model of the basic SiO₄⁴⁻ tetrahedral unit and understand how silicates form chains and sheets.",
        materials: ["A model kit or clay/foam balls (one central Si, four peripheral O)", "Sticks to represent Si-O bonds", "Multiple tetrahedra to link together"],
        procedure: [
          "Build a single tetrahedral unit with a silicon atom at the centre, bonded to four oxygen atoms at the corners.",
          "Link two tetrahedra by sharing a single corner oxygen atom, representing a simple chain silicate.",
          "Try linking several tetrahedra sharing multiple corners to represent a sheet silicate structure.",
        ],
        observation:
          "A single SiO₄ tetrahedron has 4 oxygen 'corners' available for bonding. Linking tetrahedra by sharing one corner oxygen each builds up a chain; sharing more corners (three out of four) builds up a flat, sheet-like arrangement.",
        conclusion:
          "The basic building block of all silicate minerals is the SiO₄⁴⁻ tetrahedron; depending on how many corner oxygen atoms are shared between adjacent tetrahedra, silicates can form simple discrete units, chains, sheets, or fully three-dimensional framework structures (like in quartz, where every oxygen is shared, giving the formula SiO₂) — explaining the huge structural variety of silicate minerals like mica, asbestos and feldspar found in nature.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "A single SiO₄ tetrahedron", after: "Linked tetrahedra forming a chain" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "The general valence electron configuration of Group 13 elements is:",
        options: ["ns¹", "ns²np¹", "ns²np²", "ns²np⁶"],
        correctAnswer: 1,
        explanation: "Group 13 (boron family) elements have the valence configuration ns²np¹, giving them a common oxidation state of +3.",
      },
      {
        question: "The 'inert pair effect' explains why heavier Group 13/14 elements show a stable lower oxidation state. This effect refers to:",
        options: [
          "The reluctance of the ns² electron pair to participate in bonding",
          "The complete loss of all valence electrons",
          "An increase in atomic radius only",
          "A decrease in nuclear charge",
        ],
        correctAnswer: 0,
        explanation: "The inert pair effect is the increasing reluctance of the outermost ns² electron pair to take part in bonding as you go down a p-block group, becoming more prominent for heavier elements like Tl and Pb.",
      },
      {
        question: "Boric acid, H₃BO₃, behaves as a weak acid by:",
        options: [
          "Donating a proton directly to water",
          "Acting as a Lewis acid, accepting OH⁻ from water",
          "Being a strong triprotic acid",
          "Reacting only with bases, never water",
        ],
        correctAnswer: 1,
        explanation: "Boric acid is unusual — rather than donating a proton itself, it acts as a Lewis acid by accepting a hydroxide ion from water, releasing H⁺ in the process.",
      },
      {
        question: "Diborane (B₂H₆) contains which unusual type of bond?",
        options: ["A double covalent bond only", "A three-centre two-electron (banana) bond", "An ionic bond between two borons", "A metallic bond"],
        correctAnswer: 1,
        explanation: "Diborane's bridging B-H-B bonds are three-centre two-electron bonds, since boron does not have enough electrons to form conventional bonds to all its neighbours.",
      },
      {
        question: "Which allotrope of carbon conducts electricity?",
        options: ["Diamond", "Graphite", "Both diamond and graphite equally", "Neither"],
        correctAnswer: 1,
        explanation: "Graphite conducts electricity because each sp² carbon leaves one electron delocalised in an unhybridised p-orbital, free to move along the layers; diamond's electrons are all localised in sp³ bonds.",
      },
      {
        question: "Carbon monoxide is toxic mainly because it:",
        options: [
          "Reacts explosively with water in the lungs",
          "Binds to haemoglobin much more strongly than oxygen does",
          "Is a strong acid in the blood",
          "Destroys red blood cells directly",
        ],
        correctAnswer: 1,
        explanation: "CO binds to haemoglobin nearly 300 times more strongly than O₂, blocking oxygen transport and starving the body's tissues of oxygen.",
      },
      {
        question: "Why is CO₂ a gas (a simple molecule) while SiO₂ is a hard, high-melting solid, even though carbon and silicon are in the same group?",
        options: [
          "Silicon cannot bond with oxygen at all",
          "Silicon, being larger, cannot easily form strong π bonds with oxygen, so SiO₂ forms an extended 3D network instead",
          "CO₂ has ionic bonds while SiO₂ has covalent bonds",
          "SiO₂ has a lower molar mass than CO₂",
        ],
        correctAnswer: 1,
        explanation: "Silicon's larger size prevents effective p-orbital overlap needed for strong π bonding with oxygen (unlike carbon), so instead of discrete O=Si=O molecules, silicon forms an extended three-dimensional network of Si-O single bonds, giving SiO₂ its high melting point and hardness.",
      },
      {
        question: "Zeolites, a class of silicate minerals, are commonly used as:",
        options: ["Fuels", "Molecular sieves and ion-exchangers (e.g. in water softening)", "Explosives", "Conductors of electricity"],
        correctAnswer: 1,
        explanation: "Zeolites have a porous, cage-like aluminosilicate framework that makes them useful as molecular sieves (separating molecules by size) and as ion-exchangers, notably in water softening.",
      },
      {
        question: "Aluminium resists corrosion in air mainly because:",
        options: [
          "It does not react with oxygen at all",
          "It forms a thin, dense, protective layer of Al₂O₃ on its surface",
          "It is coated with zinc naturally",
          "It reacts only with nitrogen, not oxygen",
        ],
        correctAnswer: 1,
        explanation: "Aluminium reacts with oxygen to form a very thin, tough, tightly adherent layer of Al₂O₃ that seals the surface and prevents further corrosion (passivation).",
      },
      {
        question: "Catenation (the ability to form long chains via self-linking) is strongest in which Group 14 element?",
        options: ["Lead", "Tin", "Silicon", "Carbon"],
        correctAnswer: 3,
        explanation: "Carbon shows the strongest catenation of all elements, due to its small size and very strong C-C bonds, which decreases sharply for the heavier members of Group 14.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Name the three main allotropes of carbon discussed in this chapter.",
        answer: "Diamond, graphite and fullerenes.",
      },
      {
        marks: 1,
        question: "What is the inert pair effect?",
        answer: "The inert pair effect is the increasing tendency of the outermost ns² electron pair to remain non-bonding (inert), rather than participating in bond formation, as you move down a group in the p-block — most noticeable for the heavier elements of Groups 13 and 14.",
      },
      {
        marks: 2,
        question: "Why does diamond not conduct electricity while graphite does?",
        answer:
          "In diamond, every carbon atom is sp³ hybridised and uses all four valence electrons to form strong, localised covalent bonds to four other carbon atoms, leaving no free electrons to carry current. In graphite, each carbon atom is sp² hybridised, bonded to only three neighbours within a flat layer, leaving one electron per atom delocalised across the layer — these delocalised electrons are free to move and conduct electricity.",
      },
      {
        marks: 2,
        question: "Explain why boric acid is considered a Lewis acid rather than a typical Brønsted acid.",
        answer:
          "Boric acid, B(OH)₃, does not ionise in water by donating a proton (H⁺) directly, as a typical Brønsted acid would. Instead, the boron atom (which is electron-deficient, having only 6 electrons around it) acts as a Lewis acid by accepting a hydroxide ion (a lone pair) from a water molecule: B(OH)₃ + H₂O ⇌ [B(OH)₄]⁻ + H⁺. The H⁺ released this way makes the solution acidic.",
      },
      {
        marks: 2,
        question: "Why is dry ice (solid CO₂) a useful refrigerant?",
        answer:
          "Solid CO₂ (dry ice) sublimes directly from the solid to the gaseous state at ordinary atmospheric pressure, without passing through a liquid phase. This means it can be used to keep things cold without leaving behind any liquid residue or mess, making it especially useful for transporting perishable or frozen goods.",
      },
      {
        marks: 3,
        question: "Describe the structure of diborane (B₂H₆) and explain why boron needs to form 'banana bonds'.",
        answer:
          "Diborane has the structure H₂B(μ-H)₂BH₂, with two terminal hydrogen atoms on each boron atom (bonded by normal 2-centre 2-electron bonds) and two bridging hydrogen atoms connecting the two boron atoms. Since each boron atom has only 3 valence electrons and would need to form 4 bonds (to 2 terminal H and to bridge to the other boron via 2 H atoms) if bonded conventionally, there simply aren't enough electrons available for normal two-centre bonds to every neighbouring atom. Instead, each B-H-B bridge is held together by a single pair of electrons shared among three atoms (boron, hydrogen, boron) — a three-centre two-electron ('banana') bond — which allows boron's compound to be stable despite being electron-deficient.",
      },
      {
        marks: 3,
        question: "Compare the structures of diamond and graphite, and explain why graphite is soft and slippery while diamond is extremely hard.",
        answer:
          "In **diamond**, each carbon atom is sp³ hybridised and covalently bonded to four other carbon atoms in a rigid, three-dimensional tetrahedral network; this strong, fully interlocked structure makes diamond exceptionally hard. In **graphite**, each carbon atom is sp² hybridised and bonded to only three neighbouring carbons within a flat, two-dimensional hexagonal layer; the layers themselves are held together only by weak van der Waals forces. Since these layers can easily slide over one another (there is nothing strongly holding adjacent layers together), graphite is soft and slippery, unlike the rigidly interconnected diamond.",
      },
      {
        marks: 3,
        question: "Give three important industrial uses of aluminium, relating each to one of its properties.",
        answer:
          "1. **Aircraft manufacture** — aluminium's low density (light weight) combined with reasonable strength (especially in alloys) makes it ideal for aircraft bodies.\n2. **Food packaging (aluminium foil)** — its resistance to corrosion (due to the protective oxide layer) and malleability (can be rolled into very thin sheets) make it safe and practical for wrapping food.\n3. **Electrical cables/wiring** — aluminium is a good conductor of electricity and is much lighter (and often cheaper) than copper for long-distance power transmission cables.",
      },
      {
        marks: 5,
        question:
          "(a) Explain why silicon dioxide (SiO₂) exists as a giant covalent (network) solid while carbon dioxide (CO₂) exists as a simple molecular gas, even though carbon and silicon are both in Group 14. (b) State one important use of silica.",
        answer:
          "(a) Carbon, being small, can form strong π bonds with oxygen (through effective sideways overlap of 2p orbitals), so each carbon atom forms two strong C=O double bonds, giving the small, discrete, linear O=C=O molecule. Silicon, being a much larger atom, cannot achieve effective π-orbital overlap with oxygen's smaller 2p orbitals, so it cannot form strong Si=O double bonds in the same way. Instead, each silicon atom forms four single (σ) Si-O bonds to four different oxygen atoms, and each oxygen atom bridges two silicon atoms, building up an extended, three-dimensional network of alternating Si and O atoms (empirical formula SiO₂) rather than discrete molecules — this giant covalent network requires breaking many strong bonds to melt or vaporise, giving silica its very high melting point and hardness compared to CO₂.\n(b) Silica (as quartz/sand) is widely used in the manufacture of glass, and also as a component in the manufacture of silicon chips/semiconductors after purification.",
      },
      {
        marks: 5,
        question:
          "(a) What are silicates? Describe, with reference to the SiO₄ tetrahedron, how they can form different structures (chains, sheets, and 3D frameworks). (b) What are silicones, and state one use.",
        answer:
          "(a) Silicates are a large class of minerals built from the basic SiO₄⁴⁻ tetrahedral unit, in which a central silicon atom is bonded to four surrounding oxygen atoms. Depending on how many of the four oxygen 'corners' of a tetrahedron are shared with neighbouring tetrahedra, different silicate structures result: if tetrahedra share two corners each, long **chain silicates** (like pyroxenes) form; if they share three corners each, flat **sheet silicates** (like mica) form; and if all four corners are shared, a fully three-dimensional **framework silicate** (like quartz, SiO₂, or feldspar) forms. This variety in linking explains the huge range of silicate minerals found in nature.\n(b) Silicones are synthetic polymers made of repeating -O-Si(R)₂-O- units (where R is typically an organic group like methyl), giving them a backbone similar to silicates but with organic side groups. They are chemically inert, water-repellent and thermally stable, so they are widely used as sealants (e.g. around bathroom fittings), lubricants, and for waterproofing fabrics and other surfaces.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 12 — ORGANIC CHEMISTRY: SOME BASIC PRINCIPLES AND TECHNIQUES
  // ================================================================
  {
    id: "organic-chemistry-basic-principles-and-techniques",
    number: 12,
    title: "Organic Chemistry — Some Basic Principles and Techniques",
    subtitle: "The vocabulary, structures and lab methods that every organic reaction builds on",
    description:
      "Classification and IUPAC nomenclature of organic compounds, isomerism, electronic effects (inductive, resonance, hyperconjugation), types of organic reactions and reactive intermediates, and methods of purification and qualitative/quantitative analysis.",
    icon: "🧫",
    color: "plum",
    readingTime: "28 min read",
    videos: [
      {
        title: "Basic Principles and Techniques — Full Chapter",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/f7-CMMmvfSY",
      },
      {
        title: "IUPAC Nomenclature and Isomerism Explained",
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
# Organic Chemistry — Some Basic Principles and Techniques

## Classification of Organic Compounds

Organic compounds are broadly classified as **acyclic (open-chain)** or **cyclic (closed-chain/ring)** compounds. Cyclic compounds are further divided into **homocyclic** (rings made only of carbon, e.g. cyclohexane, benzene) and **heterocyclic** (rings containing at least one atom other than carbon, e.g. furan, pyridine). Aromatic homocyclic compounds like benzene are called **carbocyclic aromatic**, while cyclic compounds without the special aromatic stability are called **alicyclic**.

## IUPAC Nomenclature

A systematic organic name has three parts: **word root** (indicates the number of carbons in the longest chain), **primary suffix** (indicates saturation/unsaturation: -ane, -ene, -yne), and **secondary suffix** (indicates the principal functional group, e.g. -ol for alcohol, -al for aldehyde).

**General rules:**
1. Identify the **longest continuous carbon chain**, which becomes the parent chain.
2. Number the chain to give the **lowest possible locants** to the principal characteristic group, then to multiple bonds/substituents.
3. Name substituents alphabetically, with their locants, as prefixes to the parent name.

| Functional group | Suffix |
|---|---|
| -COOH | -oic acid |
| -CHO | -al |
| >C=O | -one |
| -OH | -ol |
| -NH₂ | -amine |

## Isomerism

**Isomers** are compounds with the same molecular formula but different structures/properties.

### Structural Isomerism
- **Chain isomerism** — differ in the arrangement of the carbon skeleton, e.g. n-butane and isobutane (both C₄H₁₀).
- **Position isomerism** — differ in the position of a functional group/substituent/double bond on an identical carbon skeleton, e.g. propan-1-ol and propan-2-ol.
- **Functional isomerism** — differ in the functional group present, e.g. ethanol (C₂H₅OH, an alcohol) and dimethyl ether (CH₃OCH₃, an ether), both C₂H₆O.
- **Metamerism** — differ in the distribution of carbon atoms on either side of the same functional group, e.g. diethyl ether and methyl propyl ether.

### Stereoisomerism (briefly introduced)
Isomers with the same structural connectivity but different spatial (3D) arrangement of atoms, e.g. **geometrical (cis-trans) isomerism** in compounds with restricted rotation (like a C=C double bond).

## Fundamental Concepts in Organic Reaction Mechanisms

### Electronic Displacement Effects
- **Inductive effect** — the permanent displacement of a σ-bonded electron pair towards a more electronegative atom, transmitted along a chain of atoms (weakening with distance). Groups that donate electrons (like alkyl groups) show a **+I effect**; groups that withdraw electrons (like -NO₂, -COOH, halogens) show a **−I effect**.
- **Resonance (mesomeric) effect** — occurs when a molecule can be represented by two or more valid Lewis structures (resonance/canonical structures) differing only in the position of electrons (not atoms); the true structure is a hybrid of these, more stable than any single contributing structure. e.g. benzene, in which the six π electrons are delocalised over the entire ring.
- **Electromeric effect** — a temporary effect, seen only in the presence of an attacking reagent, where a π-bonded electron pair is completely transferred to one atom.
- **Hyperconjugation** — the delocalisation of electrons from a C-H σ-bond (adjacent to a positively charged carbon, a radical, or a multiple bond) into an empty or partially empty p-orbital/π-system, providing extra stability; this explains why more substituted carbocations and alkenes tend to be more stable.

### Reactive Intermediates
- **Carbocation** — a species with a positively charged, electron-deficient carbon atom (sp² hybridised, planar); stability order: 3° > 2° > 1° > methyl (more alkyl groups stabilise the positive charge via +I and hyperconjugation).
- **Carbanion** — a species with a negatively charged carbon atom bearing a lone pair (sp³ hybridised, pyramidal); stability order is the reverse: methyl > 1° > 2° > 3°.
- **Free radical** — a species with an unpaired electron, formed by homolytic bond cleavage.

## Types of Organic Reactions

1. **Substitution reactions** — an atom/group in a molecule is replaced by another, e.g. CH₄ + Cl₂ →[hv] CH₃Cl + HCl.
2. **Addition reactions** — atoms/groups are added across a multiple bond, e.g. CH₂=CH₂ + H₂ → CH₃CH₃.
3. **Elimination reactions** — atoms/groups are removed from adjacent carbon atoms to form a multiple bond, e.g. dehydration of an alcohol to an alkene.
4. **Rearrangement reactions** — atoms/groups migrate within the same molecule to give a structural isomer.

## Purification of Organic Compounds

- **Crystallisation** — purifies a solid based on differing solubility of the compound and impurities in a solvent (the compound is dissolved when hot, and crystallises out as pure crystals on cooling, leaving soluble impurities in the mother liquor).
- **Sublimation** — purifies a solid that can pass directly from solid to vapour (and back) on heating/cooling, separating it from non-volatile impurities.
- **Distillation** — separates a volatile liquid from a non-volatile (or less volatile) substance, based on differences in boiling point.
- **Fractional distillation** — separates a mixture of two or more miscible liquids with close (but different) boiling points, using a fractionating column.
- **Steam distillation** — used to separate a substance that is steam-volatile (and immiscible with water) from non-volatile impurities, at a temperature below its normal boiling point.
- **Chromatography** — separates a mixture of compounds based on differential adsorption/partition between a stationary phase and a mobile phase (e.g. column chromatography, thin-layer chromatography).

## Qualitative Analysis (Detection of Elements)

- **Detection of nitrogen, sulphur, halogens** — Lassaigne's test: the organic compound is fused with sodium metal (converting these elements into water-soluble sodium salts — NaCN, Na₂S, NaX), and the resulting extract is tested with specific reagents (e.g. FeCl₃ + FeSO₄ for nitrogen, forming Prussian blue; sodium nitroprusside for sulphur; AgNO₃ for halogens).

## Quantitative Analysis (Estimation of Elements)

- **Carbon and hydrogen** — estimated by combustion; the CO₂ and H₂O produced are absorbed and weighed (Liebig's method).
- **Nitrogen** — estimated by Dumas' method (measuring the volume of N₂ gas liberated) or Kjeldahl's method (converting nitrogen to ammonium sulphate, then measuring the ammonia liberated by titration).
- **Halogens** — estimated by Carius method (the compound is heated with fuming nitric acid and silver nitrate; the precipitated silver halide is weighed).
    `,
    experiments: [
      {
        id: "lassaigne-test-nitrogen",
        title: "Lassaigne's Test — Detecting Nitrogen in an Organic Compound",
        aim: "To detect the presence of nitrogen in an organic compound using Lassaigne's sodium fusion test.",
        materials: ["Organic compound sample (e.g. urea)", "Sodium metal", "A fusion (ignition) tube", "FeSO₄ and FeCl₃ solutions", "Dilute sulphuric acid", "A Bunsen burner"],
        procedure: [
          "Fuse a small piece of sodium metal with the organic compound sample in a dry ignition tube, heating strongly (teacher-supervised, due to reactive sodium).",
          "Plunge the red-hot tube into distilled water to extract the sodium fusion extract, then filter.",
          "To the filtrate, add freshly prepared FeSO₄ solution, boil, cool, then acidify with dilute sulphuric acid, and finally add a few drops of FeCl₃ solution.",
        ],
        observation: "A Prussian blue precipitate or colouration appears in the test tube.",
        reaction: "Na + C + N (from compound) → NaCN (in fusion) ; 6NaCN + FeSO₄ → Na₄[Fe(CN)₆] + Na₂SO₄ ; 3Na₄[Fe(CN)₆] + 4FeCl₃ → Fe₄[Fe(CN)₆]₃ (Prussian blue)↓ + 12NaCl",
        conclusion:
          "The formation of a Prussian blue precipitate confirms the presence of nitrogen in the original organic compound — the sodium fusion converts covalently bound nitrogen into water-soluble sodium cyanide, which is then detected by its characteristic reaction with iron salts.",
        safety: "Sodium fusion must be performed only under strict teacher supervision behind a safety screen — sodium reacts violently, and the fusion tube can crack from thermal shock.",
        visual: {
          before: "hsl(60 20% 95%)",
          after: "hsl(220 70% 30%)",
          labels: { before: "Filtrate + FeSO₄, before acidifying", after: "Prussian blue precipitate — nitrogen confirmed" },
        },
      },
      {
        id: "lassaigne-test-halogen",
        title: "Lassaigne's Test — Detecting Halogens in an Organic Compound",
        aim: "To detect the presence of a halogen in an organic compound using the sodium fusion extract.",
        materials: ["Sodium fusion extract (prepared as above, from a halogen-containing compound)", "Dilute nitric acid", "Silver nitrate solution"],
        procedure: [
          "Take a portion of the sodium fusion extract and boil it with dilute nitric acid (to decompose any cyanide/sulphide present, which would otherwise interfere).",
          "Cool, then add silver nitrate solution and observe the colour of any precipitate formed.",
        ],
        observation: "A precipitate forms — white (curdy, soluble in ammonia) if chlorine is present; pale yellow if bromine; and deep yellow (insoluble in ammonia) if iodine is present.",
        reaction: "NaX (X = Cl, Br, I) + AgNO₃ → AgX↓ + NaNO₃",
        conclusion:
          "The colour and solubility (in ammonia) of the silver halide precipitate formed distinguishes which halogen (if any) is present in the original organic compound, since each halide has a distinct silver salt colour and solubility behaviour.",
        visual: {
          before: "hsl(40 15% 95%)",
          after: "hsl(0 0% 96%)",
          precipitate: { name: "Silver chloride", colour: "hsl(0 0% 97%)" },
          labels: { before: "Fusion extract + dilute HNO₃", after: "White curdy AgCl precipitate — chlorine confirmed" },
        },
      },
      {
        id: "recrystallisation-purification",
        title: "Purifying a Solid Organic Compound by Recrystallisation",
        aim: "To purify an impure sample of a solid organic compound (e.g. impure benzoic acid) by recrystallisation.",
        materials: ["Impure benzoic acid (or a similar solid)", "Hot water (or a suitable solvent)", "A beaker", "A funnel and filter paper", "A Bunsen burner", "An ice bath"],
        procedure: [
          "Dissolve the impure solid in a minimum amount of hot solvent, adding just enough to dissolve it completely.",
          "Filter the hot solution quickly (to remove insoluble impurities) into a clean beaker.",
          "Allow the filtrate to cool slowly to room temperature (and then in an ice bath), and observe the crystals that form; filter and dry these crystals.",
        ],
        observation: "As the hot, saturated solution cools, well-formed crystals of the pure compound separate out, leaving coloured/soluble impurities dissolved in the remaining liquid (mother liquor).",
        conclusion:
          "Recrystallisation works because the solubility of most solids increases with temperature; by dissolving the impure solid in the minimum volume of hot solvent and then cooling slowly, the pure compound (present in a much larger amount than the impurities) becomes supersaturated first and crystallises out in a purer form, while soluble impurities (present in smaller amounts) remain dissolved in the mother liquor.",
        visual: {
          before: "hsl(40 15% 95%)",
          after: "hsl(40 15% 95%)",
          labels: { before: "Hot, saturated solution, filtered", after: "Pure crystals form on cooling" },
        },
      },
      {
        id: "simple-distillation-separation",
        title: "Separating a Volatile Liquid by Simple Distillation",
        aim: "To separate a volatile liquid (e.g. dilute alcohol solution, or coloured water) from a non-volatile dissolved substance by simple distillation.",
        materials: ["A mixture of a volatile liquid and a non-volatile solute (e.g. salt water, or dilute ethanol)", "A distillation flask with a thermometer", "A condenser", "A receiving flask", "A heat source"],
        procedure: [
          "Set up a simple distillation apparatus: distillation flask connected to a condenser leading to a receiving flask, with a thermometer bulb positioned at the side-arm outlet.",
          "Heat the mixture gently and monitor the thermometer reading as vapour begins to distil over.",
          "Collect the distillate in the receiving flask and note what remains in the original flask.",
        ],
        observation:
          "The thermometer reading rises to and then stabilises near the boiling point of the volatile liquid as it distils over into the receiving flask, condensing back to a liquid; the non-volatile solute remains behind in the original distillation flask.",
        conclusion:
          "Simple distillation successfully separates a volatile liquid from dissolved non-volatile impurities, since only the liquid vaporises (at its boiling point) and is then condensed and collected separately, while the non-volatile solute is left behind.",
        visual: {
          before: "hsl(200 30% 90%)",
          after: "hsl(200 15% 96%)",
          gas: "Vapour",
          labels: { before: "Heating the mixture", after: "Pure liquid collected in receiver" },
        },
      },
      {
        id: "thin-layer-chromatography",
        title: "Separating a Mixture of Dyes by Thin-Layer Chromatography",
        aim: "To separate the components of a mixture (e.g. a mixture of ink dyes) using thin-layer chromatography, and to identify each by its Rf value.",
        materials: ["A TLC plate (silica-coated)", "A mixture of coloured dyes/ink", "A suitable developing solvent", "A capillary tube", "A covered developing chamber/jar"],
        procedure: [
          "Using a capillary tube, apply a small, concentrated spot of the dye mixture near the bottom of the TLC plate, above the solvent line.",
          "Place the plate upright in a developing chamber containing a shallow layer of solvent (below the spot), and cover the chamber.",
          "Allow the solvent to rise up the plate by capillary action until it nears the top, then remove and mark the solvent front; measure the distance travelled by each separated spot and by the solvent front.",
        ],
        observation:
          "The original mixed spot separates into several distinct spots of different colours, each travelling a different distance up the plate as the solvent rises.",
        conclusion:
          "Each component of the mixture has a different affinity for the stationary phase (the silica coating) versus the mobile phase (the solvent), causing them to travel at different rates and separate into distinct spots. The retardation factor, Rf = (distance travelled by the spot) / (distance travelled by the solvent front), is a useful, reproducible value for identifying each compound under a given set of conditions.",
        visual: {
          before: "hsl(200 20% 95%)",
          after: "hsl(200 20% 95%)",
          labels: { before: "Single mixed spot applied", after: "Separated into distinct coloured spots" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "A cyclic organic compound whose ring contains only carbon atoms is called:",
        options: ["Heterocyclic", "Homocyclic", "Acyclic", "Aromatic only"],
        correctAnswer: 1,
        explanation: "Homocyclic compounds have rings made up entirely of carbon atoms (e.g. cyclohexane, benzene); heterocyclic compounds contain at least one non-carbon atom in the ring.",
      },
      {
        question: "Ethanol (C₂H₅OH) and dimethyl ether (CH₃OCH₃) are examples of:",
        options: ["Chain isomerism", "Position isomerism", "Functional isomerism", "Metamerism"],
        correctAnswer: 2,
        explanation: "Ethanol and dimethyl ether have the same molecular formula (C₂H₆O) but different functional groups (alcohol vs ether), making them functional isomers.",
      },
      {
        question: "The inductive effect is best described as:",
        options: [
          "A temporary effect seen only with an attacking reagent",
          "The permanent displacement of a σ-bonded electron pair towards a more electronegative atom",
          "The complete transfer of a π-bonded pair of electrons",
          "Delocalisation of electrons through resonance structures",
        ],
        correctAnswer: 1,
        explanation: "The inductive effect is a permanent polarisation of a sigma bond, with the electron pair displaced towards the more electronegative atom, weakening with distance along the chain.",
      },
      {
        question: "The stability order of carbocations is:",
        options: ["1° > 2° > 3°", "3° > 2° > 1° > methyl", "Methyl > 1° > 2° > 3°", "All carbocations are equally stable"],
        correctAnswer: 1,
        explanation: "Tertiary carbocations are the most stable, because more alkyl groups donate electron density via the +I effect and hyperconjugation, stabilising the positive charge.",
      },
      {
        question: "Which purification technique is used to separate a mixture of two miscible liquids with close boiling points?",
        options: ["Simple distillation", "Fractional distillation", "Sublimation", "Crystallisation"],
        correctAnswer: 1,
        explanation: "Fractional distillation, using a fractionating column, separates miscible liquids with close boiling points more effectively than simple distillation.",
      },
      {
        question: "Lassaigne's test converts nitrogen in an organic compound into a water-soluble form by:",
        options: [
          "Burning the compound in oxygen",
          "Fusing the compound with sodium metal",
          "Boiling with dilute nitric acid alone",
          "Dissolving the compound in water directly",
        ],
        correctAnswer: 1,
        explanation: "Lassaigne's test fuses the organic compound with sodium metal, converting covalently bound nitrogen, sulphur and halogens into water-soluble sodium salts (NaCN, Na₂S, NaX).",
      },
      {
        question: "The Prussian blue colouration in Lassaigne's test confirms the presence of:",
        options: ["Sulphur", "A halogen", "Nitrogen", "Phosphorus"],
        correctAnswer: 2,
        explanation: "The formation of Prussian blue (from the reaction of sodium cyanide extract with iron salts) confirms the presence of nitrogen in the original organic compound.",
      },
      {
        question: "In an elimination reaction:",
        options: [
          "An atom/group is replaced by another",
          "Atoms/groups are added across a multiple bond",
          "Atoms/groups are removed from adjacent carbons, forming a multiple bond",
          "Two molecules combine without loss of atoms",
        ],
        correctAnswer: 2,
        explanation: "An elimination reaction removes atoms or groups from adjacent carbon atoms, resulting in the formation of a multiple (double or triple) bond.",
      },
      {
        question: "In thin-layer chromatography, the retardation factor (Rf) is defined as:",
        options: [
          "Distance travelled by the solvent front only",
          "Distance travelled by the spot ÷ distance travelled by the solvent front",
          "Time taken for the solvent to travel up the plate",
          "The mass of the compound spotted",
        ],
        correctAnswer: 1,
        explanation: "Rf = (distance travelled by a component spot) ÷ (distance travelled by the solvent front) — a reproducible value used to help identify compounds under given conditions.",
      },
      {
        question: "Which method is used to estimate the amount of nitrogen in an organic compound by measuring the volume of nitrogen gas liberated?",
        options: ["Carius method", "Liebig's method", "Dumas' method", "Kjeldahl's method"],
        correctAnswer: 2,
        explanation: "Dumas' method estimates nitrogen by converting it entirely into nitrogen gas and directly measuring its volume; Kjeldahl's method instead converts nitrogen to ammonium sulphate and estimates it by titration.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define isomers.",
        answer: "Isomers are compounds that have the same molecular formula but differ in their structure (arrangement of atoms) or spatial configuration, and consequently in their properties.",
      },
      {
        marks: 1,
        question: "What is sublimation, and when is it used as a purification method?",
        answer: "Sublimation is the direct conversion of a solid to vapour (and back to solid on cooling) without passing through a liquid state. It is used to purify solids that sublime, separating them from non-volatile impurities that do not sublime.",
      },
      {
        marks: 2,
        question: "Distinguish between chain isomerism and position isomerism, with one example each.",
        answer:
          "**Chain isomerism** arises from a different arrangement of the carbon skeleton itself, e.g. n-butane and isobutane (2-methylpropane), both C₄H₁₀. **Position isomerism** arises from the same carbon skeleton but a different position of a substituent/functional group/double bond, e.g. propan-1-ol and propan-2-ol, both C₃H₈O.",
      },
      {
        marks: 2,
        question: "What is hyperconjugation? Why does it make more substituted carbocations more stable?",
        answer:
          "Hyperconjugation is the delocalisation of electrons from a C-H sigma bond adjacent to an electron-deficient carbon (or a multiple bond) into an empty p-orbital. A more substituted carbocation (e.g. tertiary) has more adjacent C-H bonds available for this kind of donation than a less substituted one, so more hyperconjugation structures can be drawn, spreading out (delocalising) the positive charge and making the carbocation more stable.",
      },
      {
        marks: 2,
        question: "Differentiate between a carbocation and a carbanion.",
        answer:
          "A **carbocation** is a reactive intermediate with a positively charged, electron-deficient carbon atom (only 6 valence electrons, sp² hybridised, planar geometry); more alkyl substitution makes it more stable. A **carbanion** is a reactive intermediate with a negatively charged carbon atom bearing a lone pair (8 valence electrons, sp³ hybridised, pyramidal geometry); LESS alkyl substitution makes it more stable, since alkyl groups (being electron-donating) destabilise the already electron-rich carbanion.",
      },
      {
        marks: 3,
        question: "Explain the resonance (mesomeric) effect using benzene as an example.",
        answer:
          "The resonance effect occurs when a molecule's true structure cannot be represented by a single Lewis structure, and is instead better described as a hybrid of two or more valid canonical (resonance) structures that differ only in the arrangement of electrons (not atoms). In benzene, the six π electrons are not localised in three fixed alternating double bonds, but are delocalised equally over all six carbon atoms of the ring; this delocalisation can be represented by two equivalent Kekulé structures (with the double bonds in different positions), and the actual molecule is a resonance hybrid of both, which is significantly more stable than either individual structure would suggest — this extra stability is called resonance (delocalisation) energy.",
      },
      {
        marks: 3,
        question: "Describe the technique of steam distillation and explain when it is useful.",
        answer:
          "Steam distillation is used to separate a substance that is volatile in steam (i.e. it has an appreciable vapour pressure at the boiling point of water) and immiscible with water, from other non-volatile impurities. Steam is passed through the heated mixture; the volatile compound co-distils with the steam at a temperature below its own normal boiling point (since the mixture boils when the sum of the partial vapour pressures of water and the compound equals atmospheric pressure). The resulting vapour mixture is condensed and collected, and the compound (being immiscible with water) can then be separated from the water layer. This is useful for purifying heat-sensitive compounds that might decompose at their normal (much higher) boiling point.",
      },
      {
        marks: 3,
        question: "List and briefly describe the four main types of organic reactions.",
        answer:
          "1. **Substitution reactions** — an atom or group in a molecule is replaced by another atom or group, e.g. CH₄ + Cl₂ → CH₃Cl + HCl.\n2. **Addition reactions** — atoms or groups are added across a multiple (double/triple) bond, converting it to a single bond, e.g. CH₂=CH₂ + H₂ → CH₃CH₃.\n3. **Elimination reactions** — atoms or groups are removed from adjacent carbon atoms, forming a new multiple bond, e.g. dehydration of ethanol to ethene.\n4. **Rearrangement reactions** — atoms or groups migrate from one position to another within the same molecule, producing a structural isomer of the original compound.",
      },
      {
        marks: 5,
        question:
          "(a) Describe, step by step, how Lassaigne's test is carried out and why it works (in terms of what happens to nitrogen, sulphur and halogens during sodium fusion). (b) Name the reagent used to individually test for each of nitrogen, sulphur and a halogen in the Lassaigne extract.",
        answer:
          "(a) In Lassaigne's test, a small amount of the organic compound is fused (strongly heated) with a piece of sodium metal in an ignition tube. During this fusion, any nitrogen, sulphur or halogens covalently bound within the organic compound are converted into water-soluble inorganic sodium salts: nitrogen (with carbon, if present) is converted to sodium cyanide (NaCN); sulphur is converted to sodium sulphide (Na₂S); and halogens are converted to the corresponding sodium halide (NaX). The hot fusion tube is then plunged into distilled water to extract these salts into solution (the sodium fusion extract), which is filtered and then tested separately for each element using specific inorganic reagents.\n(b) **Nitrogen** is tested by boiling the extract with FeSO₄, acidifying, then adding FeCl₃ — a Prussian blue colour/precipitate confirms nitrogen. **Sulphur** is tested by adding a few drops of freshly prepared sodium nitroprusside solution — a violet/purple colouration confirms sulphur. **Halogens** are tested by acidifying a portion of the extract with dilute nitric acid (to remove interference from cyanide/sulphide) and then adding silver nitrate solution — a white, pale yellow, or deep yellow precipitate confirms chlorine, bromine or iodine respectively.",
      },
      {
        marks: 5,
        question:
          "(a) Explain the general rules used for the IUPAC nomenclature of a simple organic compound. (b) Using these rules, name the compound CH₃-CH(CH₃)-CH₂-OH.",
        answer:
          "(a) The general rules for IUPAC naming are: (i) identify the **longest continuous chain of carbon atoms** containing the principal characteristic group (if present) — this becomes the parent chain, and its length gives the word root (meth-, eth-, prop- etc.); (ii) number the carbon atoms of the parent chain so as to give the **lowest possible locants** first to the principal characteristic group, and then to any double/triple bonds and substituents; (iii) identify and name all substituent groups attached to the parent chain, and cite them as prefixes **in alphabetical order**, each with its locant number; (iv) combine the word root with the appropriate primary suffix (indicating saturation: -ane, or unsaturation: -ene/-yne) and secondary suffix (indicating the principal functional group, e.g. -ol for an alcohol).\n(b) The compound CH₃-CH(CH₃)-CH₂-OH has a 3-carbon parent chain (propane) bearing a -CH₂OH group (an alcohol, so the suffix is -ol) at one end, and a methyl substituent on the middle carbon. Numbering from the end nearer the -OH group (to give it the lowest locant, position 1) gives the methyl group position 2. The IUPAC name is **2-methylpropan-1-ol**.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 13 — HYDROCARBONS
  // ================================================================
  {
    id: "hydrocarbons",
    number: 13,
    title: "Hydrocarbons",
    subtitle: "Alkanes, alkenes, alkynes and aromatics — the fuels and feedstocks of organic chemistry",
    description:
      "Classification, nomenclature, preparation and properties of alkanes, alkenes and alkynes; mechanisms of free-radical substitution, electrophilic and nucleophilic addition; aromaticity and electrophilic substitution reactions of benzene; and carcinogenicity/toxicity of aromatic hydrocarbons.",
    icon: "⛽",
    color: "cobalt",
    readingTime: "30 min read",
    videos: [
      {
        title: "Hydrocarbons — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/Vv8KcSN0YlM",
      },
      {
        title: "Alkanes, Alkenes and Alkynes Explained",
        channel: "Concept revision",
        url: "https://www.youtube.com/embed/f7-CMMmvfSY",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/2mQhw6yKMdE",
      },
    ],
    notes: `
# Hydrocarbons

## Classification of Hydrocarbons

Hydrocarbons (compounds of only carbon and hydrogen) are classified as:
- **Saturated hydrocarbons (alkanes)** — contain only C-C single bonds.
- **Unsaturated hydrocarbons (alkenes, alkynes)** — contain at least one C=C or C≡C multiple bond.
- **Aromatic hydrocarbons (arenes)** — cyclic compounds showing special stability due to delocalised π electrons (e.g. benzene and its derivatives).

## Alkanes

Alkanes, general formula CₙH₂ₙ₊₂, are relatively unreactive ("paraffins" — meaning "little affinity") due to their strong, non-polar C-C and C-H sigma bonds.

### Preparation
- From **alkyl halides**, by reduction with Zn/HCl or by the **Wurtz reaction**: 2R-X + 2Na →[dry ether] R-R + 2NaX (used to prepare symmetrical alkanes with an even number of carbons).
- From **unsaturated hydrocarbons**, by catalytic hydrogenation: CH₂=CH₂ + H₂ →[Ni/Pt/Pd] CH₃-CH₃.
- **Kolbe's electrolysis:** electrolysis of an aqueous solution of a sodium/potassium salt of a carboxylic acid, giving an alkane at the anode.

### Chemical Properties
1. **Free-radical halogenation (substitution)** — occurs in the presence of sunlight/UV light, via a chain mechanism:
   - **Initiation:** Cl₂ →[hv] 2Cl• (homolytic cleavage produces radicals)
   - **Propagation:** CH₄ + Cl• → •CH₃ + HCl ; •CH₃ + Cl₂ → CH₃Cl + Cl• (the chain continues)
   - **Termination:** two radicals combine, e.g. Cl• + Cl• → Cl₂, ending the chain.
2. **Combustion:** CH₄ + 2O₂ → CO₂ + 2H₂O + heat (complete combustion in excess oxygen).
3. **Isomerisation and aromatisation** are industrially important reactions of alkanes, used to upgrade the quality of petroleum fractions.

## Alkenes

Alkenes, general formula CₙH₂ₙ, contain one C=C double bond (sp² hybridised carbons); their characteristic reactions are **addition reactions**, since the π bond can be readily broken.

::diagram:sigma-pi-bonds

### Preparation
- **Dehydrohalogenation** of alkyl halides with alcoholic KOH (elimination of HX).
- **Dehydration** of alcohols with conc. H₂SO₄ (elimination of H₂O).
- **Partial hydrogenation** of alkynes using a Lindlar's catalyst (Pd poisoned with BaSO₄/quinoline), which stops the reaction at the alkene stage and gives the **cis** alkene selectively.

### Chemical Properties — Addition Reactions
1. **Addition of hydrogen (hydrogenation):** CH₂=CH₂ + H₂ →[Ni] CH₃CH₃.
2. **Addition of halogens:** CH₂=CH₂ + Br₂ → CH₂Br-CH₂Br (decolourises bromine water/CCl₄ solution — a test for unsaturation).
3. **Addition of hydrogen halides (Markovnikov's rule):** for an unsymmetrical alkene reacting with HX, the **negative part (halide) adds to the carbon with fewer hydrogen atoms** (i.e. H adds to the carbon already bearing more hydrogens), since this gives the more stable (more substituted) carbocation intermediate. In the presence of peroxides, HBr instead adds by the **anti-Markovnikov (peroxide/Kharasch) effect**, following a free-radical mechanism.
4. **Addition of water (Markovnikov hydration):** in the presence of an acid catalyst, following Markovnikov's rule.
5. **Ozonolysis:** an alkene reacts with ozone to form an ozonide, which is then cleaved (usually with zinc dust and water) to give two carbonyl compounds — a very useful method for locating the position of a double bond in an unknown alkene.
6. **Oxidation with cold, dilute alkaline KMnO₄ (Baeyer's reagent):** decolourises to give a **vicinal diol** (two -OH groups on adjacent carbons) — this decolourisation is another standard test for unsaturation.

## Alkynes

Alkynes, general formula CₙH₂ₙ₋₂, contain one C≡C triple bond (sp hybridised carbons), and are even more reactive towards addition than alkenes.

### Preparation
- **From calcium carbide:** CaC₂ + 2H₂O → Ca(OH)₂ + C₂H₂ (this is the standard laboratory/industrial preparation of ethyne, acetylene).
- **Dehydrohalogenation** of a vicinal or geminal dihalide with excess alcoholic KOH.

### Chemical Properties
- **Acidic character:** terminal alkynes (with a ≡C-H bond) show weak acidity, since the sp-hybridised C-H bond has more s-character, holding the bonding electrons closer to carbon; they react with strong bases like sodamide (NaNH₂) or with ammoniacal AgNO₃/Cu₂Cl₂ to give characteristic precipitates (used to distinguish terminal from internal/non-terminal alkynes).
- Undergoes similar **addition reactions** to alkenes (with H₂, X₂, HX, H₂O), but can add reagents twice (across both π bonds) if in excess.

## Aromatic Hydrocarbons (Arenes)

### Structure and Aromaticity of Benzene
Benzene (C₆H₆) is a planar, hexagonal ring of six sp² hybridised carbon atoms, each bonded to one hydrogen; the six unhybridised p-orbitals (one per carbon, each with one electron) overlap sideways to form a continuous, delocalised π electron cloud above and below the plane of the ring.

**Hückel's rule** for aromaticity: a cyclic, planar, fully conjugated compound is aromatic if it contains (4n + 2) π electrons, where n = 0, 1, 2 ... Benzene has 6 π electrons (n = 1), satisfying this rule, which is a major reason for its exceptional stability (resonance/delocalisation energy).

::diagram:benzene-structure

### Chemical Properties — Electrophilic Substitution
Despite containing multiple bonds, benzene characteristically undergoes **substitution** reactions (not addition), since substitution preserves the highly stable aromatic ring system, whereas addition would destroy it.

1. **Nitration:** C₆H₆ + HNO₃ →[conc. H₂SO₄] C₆H₅NO₂ + H₂O.
2. **Halogenation:** C₆H₆ + Cl₂ →[anhydrous FeCl₃] C₆H₅Cl + HCl.
3. **Friedel-Crafts alkylation:** C₆H₆ + R-X →[anhydrous AlCl₃] C₆H₅-R + HX.
4. **Friedel-Crafts acylation:** C₆H₆ + RCOCl →[anhydrous AlCl₃] C₆H₅COR + HCl.

**Directive influence of substituents:** groups already present on the benzene ring influence where a new substituent is added. **Ortho/para-directing groups** (e.g. -OH, -NH₂, -CH₃, halogens) are usually electron-donating (activating, except halogens, which are deactivating but still o,p-directing); **meta-directing groups** (e.g. -NO₂, -COOH, -CN) are electron-withdrawing (deactivating).

### Carcinogenicity and Toxicity
Certain polycyclic aromatic hydrocarbons (e.g. benzo[a]pyrene, found in coal tar, cigarette smoke and incompletely burnt fuel/food) are known **carcinogens** — a reason why exposure to coal tar, vehicle exhaust and tobacco smoke is a significant health hazard. Benzene itself is also toxic and can cause bone marrow damage on prolonged exposure.
    `,
    experiments: [
      {
        id: "acetylene-preparation-calcium-carbide",
        title: "Preparation of Acetylene (Ethyne) from Calcium Carbide",
        aim: "To prepare ethyne gas from calcium carbide and water, and test its properties.",
        materials: ["Calcium carbide (CaC₂)", "Water", "A gas generator flask with delivery tube", "Bromine water", "Ammoniacal silver nitrate/cuprous chloride solution"],
        procedure: [
          "Add water dropwise to calcium carbide in a flask fitted with a delivery tube, and collect the gas evolved.",
          "Pass the gas through bromine water and note the colour change.",
          "Pass a separate sample of the gas into ammoniacal silver nitrate (or cuprous chloride) solution.",
        ],
        observation:
          "Gas is evolved with a characteristic garlic-like odour (due to impurities). It rapidly decolourises the orange bromine water. It also produces a white precipitate with ammoniacal silver nitrate (or a red precipitate with cuprous chloride).",
        reaction: "CaC₂(s) + 2H₂O(l) → Ca(OH)₂(aq) + C₂H₂(g)↑ ; HC≡CH + 2AgNO₃ + 2NH₄OH → AgC≡CAg↓ (white) + 2NH₄NO₃ + 2H₂O",
        conclusion:
          "The rapid decolourisation of bromine water confirms ethyne is highly unsaturated. The formation of a precipitate with ammoniacal silver nitrate confirms the presence of an acidic, terminal ≡C-H bond, characteristic of terminal alkynes (this test distinguishes terminal alkynes from alkenes and from non-terminal alkynes, neither of which give this precipitate).",
        safety: "Ethyne (acetylene) is highly flammable; keep it away from open flames during collection and testing.",
        visual: {
          before: "hsl(200 20% 92%)",
          after: "hsl(40 10% 95%)",
          gas: "Ethyne",
          precipitate: { name: "Silver acetylide", colour: "hsl(0 0% 92%)" },
          labels: { before: "Orange bromine water", after: "Decolourised as ethyne passes through" },
        },
      },
      {
        id: "unsaturation-test-bromine-baeyer",
        title: "Distinguishing Saturated and Unsaturated Hydrocarbons (Bromine Water and Baeyer's Test)",
        aim: "To use bromine water and Baeyer's reagent (cold, dilute alkaline KMnO₄) to distinguish an alkane from an alkene.",
        materials: ["A sample of a saturated hydrocarbon (e.g. hexane/paraffin)", "A sample of an unsaturated hydrocarbon (e.g. cyclohexene, or an alkene source)", "Bromine water", "Dilute, cold alkaline KMnO₄ solution", "Test tubes"],
        procedure: [
          "Add a few drops of bromine water to separate samples of the saturated and unsaturated hydrocarbon, and shake; observe any colour change.",
          "Repeat using cold, dilute alkaline KMnO₄ (Baeyer's reagent) instead of bromine water.",
        ],
        observation:
          "The unsaturated hydrocarbon rapidly decolourises both the orange bromine water and the purple/pink Baeyer's reagent. The saturated hydrocarbon does not decolourise either reagent under the same conditions (in the absence of light/catalyst).",
        reaction: "CH₂=CH₂ + Br₂ → CH₂Br-CH₂Br (addition, decolourises bromine water) ; 3CH₂=CH₂ + 2KMnO₄ + 4H₂O → 3CH₂(OH)-CH₂(OH) + 2MnO₂↓ + 2KOH",
        conclusion:
          "Both bromine water and Baeyer's reagent undergo addition across a carbon-carbon double/triple bond, losing their characteristic colour; since alkanes have no multiple bond available for addition (under these mild conditions, without light), they do not decolourise either reagent — these are two standard, simple laboratory tests to distinguish saturated from unsaturated hydrocarbons.",
        visual: {
          before: "hsl(25 85% 55%)",
          after: "hsl(40 10% 96%)",
          labels: { before: "Orange bromine water added to alkene", after: "Rapidly decolourised" },
        },
      },
      {
        id: "wurtz-reaction-demo",
        title: "Preparing an Alkane by the Wurtz Reaction (Conceptual/Small-Scale Demonstration)",
        aim: "To prepare a higher alkane (e.g. butane from bromoethane) using the Wurtz reaction, and understand its mechanism/limitations.",
        materials: ["Bromoethane (ethyl bromide)", "Sodium metal (small pieces)", "Dry diethyl ether (solvent)", "A dry, sealed reaction flask with reflux condenser"],
        procedure: [
          "Add small pieces of sodium metal to dry bromoethane dissolved in dry ether, under anhydrous conditions, in a flask fitted with a reflux condenser.",
          "Heat the mixture gently under reflux and observe the reaction.",
          "Note the observation that this method is only practical for making symmetrical products.",
        ],
        observation: "A vigorous reaction occurs (with sodium bromide forming as a white solid byproduct), and butane (a higher, symmetrical alkane) is produced along with the sodium bromide.",
        reaction: "2C₂H₅Br + 2Na →[dry ether] C₂H₅-C₂H₅ (butane, C₄H₁₀) + 2NaBr",
        conclusion:
          "The Wurtz reaction couples two alkyl halide molecules using sodium metal in dry ether, forming a new C-C bond and a symmetrical alkane with double the number of carbons of the starting alkyl halide. Its main limitation is that it can only be used to prepare symmetrical alkanes cleanly (reacting two different alkyl halides together gives a mixture of three different alkane products, which is much less useful synthetically).",
        safety: "Sodium metal and dry ether are both hazardous — sodium reacts vigorously with any moisture, and ether is highly flammable; this reaction must be carried out under strict supervision with anhydrous technique.",
        visual: {
          before: "hsl(200 15% 92%)",
          after: "hsl(200 15% 92%)",
          precipitate: { name: "Sodium bromide", colour: "hsl(0 0% 95%)" },
          labels: { before: "Sodium added to bromoethane in ether", after: "NaBr forms; alkane produced" },
        },
      },
      {
        id: "friedel-crafts-benzene",
        title: "Friedel-Crafts Alkylation of Benzene (Conceptual/Demonstration)",
        aim: "To understand the electrophilic substitution mechanism of the Friedel-Crafts alkylation reaction on benzene.",
        materials: ["Benzene (or a description/diagram, given safety concerns with handling benzene directly)", "An alkyl halide (e.g. chloromethane)", "Anhydrous aluminium chloride (catalyst)", "Reaction apparatus with reflux condenser"],
        procedure: [
          "Combine benzene, the alkyl halide, and anhydrous AlCl₃ catalyst under anhydrous conditions with reflux (or study the mechanism via a diagram, since benzene handling has serious health and safety implications and is often demonstrated only conceptually in schools).",
          "Trace the mechanism: AlCl₃ (a Lewis acid) polarises the C-Cl bond of the alkyl halide, generating a carbocation-like electrophile; this electrophile attacks the electron-rich benzene ring, forming an arenium (Wheland) intermediate; a proton is then lost to restore the aromatic ring.",
        ],
        observation: "An alkylbenzene product (e.g. toluene, if methyl chloride is used) and HCl gas are formed; the reaction requires the anhydrous AlCl₃ catalyst to proceed at a reasonable rate.",
        reaction: "C₆H₆ + CH₃Cl →[anhydrous AlCl₃] C₆H₅CH₃ + HCl",
        conclusion:
          "This is a classic example of electrophilic aromatic substitution: the Lewis acid catalyst generates a strong electrophile from the alkyl halide, which attacks the delocalised π electron cloud of benzene; crucially, the aromatic ring is restored (not destroyed) by loss of a proton at the end, which is why benzene undergoes substitution rather than addition under these conditions, preserving its exceptional aromatic stability.",
        safety: "Benzene is a known carcinogen — this reaction should only be studied conceptually/via diagrams in a school setting, never handled directly without proper fume-hood and safety controls.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Benzene + alkyl halide + AlCl₃", after: "Alkylbenzene + HCl formed" },
        },
      },
      {
        id: "markovnikov-rule-demo",
        title: "Illustrating Markovnikov's Rule with Propene and HBr",
        aim: "To predict and rationalise the major product of HBr addition to an unsymmetrical alkene (propene) using Markovnikov's rule.",
        materials: ["Molecular model kit (or diagrams) of propene", "Diagram/model showing possible carbocation intermediates"],
        procedure: [
          "Draw/model the structure of propene, CH₃-CH=CH₂.",
          "Consider the two possible ways H-Br could add across the double bond, and draw the carbocation intermediate that would form in each case.",
          "Compare the stability of the two possible carbocation intermediates (secondary vs primary) to predict which pathway is favoured.",
        ],
        observation:
          "Addition of H to the terminal (less substituted) carbon leads to a more stable secondary carbocation on the middle carbon; addition of H to the middle carbon would instead leave an unstable primary carbocation on the terminal carbon.",
        reaction: "CH₃-CH=CH₂ + HBr → CH₃-CHBr-CH₃ (major product, 2-bromopropane) [not CH₃-CH₂-CH₂Br]",
        conclusion:
          "Since the reaction proceeds through the more stable (secondary) carbocation intermediate, the major product has bromine on the middle (more substituted) carbon, with hydrogen having added to the terminal carbon that already had more hydrogens — exactly as predicted by Markovnikov's rule: the negative part of the reagent adds to the carbon with fewer hydrogen atoms.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Propene + HBr, two possible pathways", after: "Major product via the more stable carbocation" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "The general formula of an alkyne is:",
        options: ["CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₂", "CₙH₂ₙ₋₆"],
        correctAnswer: 2,
        explanation: "Alkynes, containing one C≡C triple bond, follow the general formula CₙH₂ₙ₋₂.",
      },
      {
        question: "The free-radical halogenation of alkanes proceeds via which type of bond cleavage in the initiation step?",
        options: ["Heterolytic cleavage", "Homolytic cleavage", "Ionic cleavage", "No bond cleavage occurs"],
        correctAnswer: 1,
        explanation: "In the initiation step, the halogen molecule (e.g. Cl₂) undergoes homolytic cleavage under UV light/sunlight, producing two free radicals.",
      },
      {
        question: "According to Markovnikov's rule, when HBr adds to an unsymmetrical alkene, the hydrogen atom adds to the carbon:",
        options: [
          "With more hydrogen atoms already attached",
          "With fewer hydrogen atoms already attached",
          "In the middle of the chain only",
          "That is part of a ring",
        ],
        correctAnswer: 0,
        explanation: "Markovnikov's rule states that the H of HX adds to the carbon already bearing more hydrogen atoms, while the halide adds to the carbon with fewer hydrogens (forming the more stable carbocation intermediate).",
      },
      {
        question: "Ozonolysis of an alkene, followed by workup with Zn/H₂O, is primarily used to:",
        options: [
          "Convert the alkene into an alkane",
          "Locate the position of the double bond by identifying the carbonyl products",
          "Add bromine across the double bond",
          "Polymerise the alkene",
        ],
        correctAnswer: 1,
        explanation: "Ozonolysis cleaves the C=C double bond to give two carbonyl compounds, whose identity reveals exactly where the double bond was located in the original alkene.",
      },
      {
        question: "Terminal alkynes (with a ≡C-H bond) show weak acidity mainly because:",
        options: [
          "They contain oxygen atoms",
          "The sp-hybridised carbon holds the C-H bonding electrons closer, making the H more easily removed as H⁺",
          "They are unsaturated",
          "They react with water directly",
        ],
        correctAnswer: 1,
        explanation: "The sp-hybridised carbon of a terminal alkyne has more s-character, holding electron density closer to the carbon nucleus and making the C-H bond more polarised and the hydrogen more acidic than in alkanes or alkenes.",
      },
      {
        question: "The chemical test used to distinguish a terminal alkyne from an alkene is its reaction with:",
        options: ["Bromine water", "Ammoniacal silver nitrate (giving a white precipitate)", "Cold dilute KMnO₄", "Dilute sulphuric acid"],
        correctAnswer: 1,
        explanation: "Terminal alkynes form a white precipitate with ammoniacal silver nitrate (due to their acidic ≡C-H), a reaction that alkenes and internal alkynes do not give.",
      },
      {
        question: "Hückel's rule for aromaticity states that a cyclic, planar, fully conjugated compound is aromatic if it has:",
        options: ["4n π electrons", "(4n + 2) π electrons", "Exactly 6 carbon atoms", "No π electrons at all"],
        correctAnswer: 1,
        explanation: "Hückel's rule states that a compound is aromatic if it is cyclic, planar, fully conjugated, and has (4n + 2) π electrons, where n = 0, 1, 2 ...",
      },
      {
        question: "Benzene reacts with bromine (in the presence of anhydrous FeCl₃) mainly by:",
        options: ["Addition, forming a dibromide", "Substitution, forming bromobenzene and HBr", "No reaction at all", "Combustion"],
        correctAnswer: 1,
        explanation: "Benzene undergoes electrophilic substitution (not addition) with bromine in the presence of a Lewis acid catalyst like FeCl₃, since substitution preserves the highly stable aromatic ring, giving bromobenzene and HBr.",
      },
      {
        question: "Which functional group is classified as a meta-directing group in electrophilic aromatic substitution?",
        options: ["-OH", "-CH₃", "-NO₂", "-NH₂"],
        correctAnswer: 2,
        explanation: "The nitro group (-NO₂) is strongly electron-withdrawing (deactivating) and directs an incoming electrophile to the meta position, unlike -OH, -CH₃ and -NH₂, which are o,p-directing.",
      },
      {
        question: "The standard laboratory preparation of ethyne (acetylene) uses:",
        options: ["The Wurtz reaction", "Calcium carbide and water", "Dehydrogenation of ethane", "Combustion of methane"],
        correctAnswer: 1,
        explanation: "Ethyne is prepared in the laboratory by reacting calcium carbide with water: CaC₂ + 2H₂O → Ca(OH)₂ + C₂H₂.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Write the general formula of alkanes, alkenes and alkynes.",
        answer: "Alkanes: CₙH₂ₙ₊₂. Alkenes: CₙH₂ₙ. Alkynes: CₙH₂ₙ₋₂.",
      },
      {
        marks: 1,
        question: "State Markovnikov's rule in one sentence.",
        answer: "When an unsymmetrical reagent (like HX) adds to an unsymmetrical alkene, the negative part (X) attaches to the carbon atom with fewer hydrogen atoms already attached.",
      },
      {
        marks: 2,
        question: "Write the balanced equation for the Wurtz reaction preparation of butane from bromoethane, and state one limitation of this method.",
        answer:
          "2CH₃CH₂Br + 2Na →[dry ether] CH₃CH₂-CH₂CH₃ (butane) + 2NaBr.\nLimitation: the Wurtz reaction is suitable only for preparing symmetrical alkanes cleanly, since using two different alkyl halides together would give a mixture of three different alkane products (difficult to separate), rather than one pure compound.",
      },
      {
        marks: 2,
        question: "Explain why benzene undergoes electrophilic substitution reactions rather than the addition reactions typical of simple alkenes.",
        answer:
          "Although benzene contains formal C=C double bonds, its six π electrons are delocalised equally around the entire ring, giving it substantial extra stability (aromatic/resonance stabilisation). An addition reaction would destroy this delocalised aromatic system, converting it to a less stable, non-aromatic product. A substitution reaction, on the other hand, replaces a hydrogen atom on the ring while restoring/preserving the aromatic system in the product, so it is energetically far more favourable, and benzene characteristically undergoes substitution rather than addition.",
      },
      {
        marks: 2,
        question: "Give the chemical test (with observation) used to distinguish an alkane from an alkene.",
        answer:
          "Add bromine water to a sample of each: the alkene rapidly decolourises the orange bromine water (an addition reaction across the C=C double bond), while the alkane shows no such decolourisation under the same (mild, non-UV) conditions.",
      },
      {
        marks: 3,
        question: "Describe the three steps of the free-radical mechanism for the chlorination of methane (initiation, propagation, termination).",
        answer:
          "1. **Initiation:** Cl₂ absorbs UV light/sunlight and undergoes homolytic cleavage to form two chlorine free radicals: Cl₂ →[hv] 2Cl•.\n2. **Propagation:** a chlorine radical abstracts a hydrogen atom from methane, forming a methyl radical and HCl (CH₄ + Cl• → •CH₃ + HCl); the methyl radical then reacts with another Cl₂ molecule to form chloromethane and regenerate a chlorine radical (•CH₃ + Cl₂ → CH₃Cl + Cl•), which continues the chain.\n3. **Termination:** two radicals combine to form a stable, non-radical product, ending the chain (e.g. Cl• + Cl• → Cl₂, or •CH₃ + Cl• → CH₃Cl, or •CH₃ + •CH₃ → CH₃CH₃).",
      },
      {
        marks: 3,
        question: "Explain, with a suitable example, the directive influence of substituents in electrophilic aromatic substitution.",
        answer:
          "A substituent already present on a benzene ring influences the position at which a new electrophile is added. **Ortho/para-directing groups**, like -OH, -NH₂ and -CH₃ (electron-donating, generally activating the ring), direct new substituents to the ortho and para positions relative to themselves, by increasing electron density most strongly at those positions. **Meta-directing groups**, like -NO₂ and -COOH (electron-withdrawing, deactivating the ring), direct new substituents to the meta position, since they decrease electron density more at the ortho and para positions than at the meta position. For example, nitration of nitrobenzene (which already has a meta-directing -NO₂ group) gives predominantly meta-dinitrobenzene.",
      },
      {
        marks: 3,
        question: "Compare the acidity of a terminal alkyne, an alkene, and an alkane, explaining the trend in terms of hybridisation.",
        answer:
          "The acidity order is **alkyne > alkene > alkane** (for the corresponding C-H bond). This is explained by the percentage of s-character in the hybrid orbital used to form the C-H bond: sp-hybridised carbon (in alkynes) has 50% s-character, sp²-hybridised carbon (in alkenes) has 33% s-character, and sp³-hybridised carbon (in alkanes) has only 25% s-character. Higher s-character means the bonding electrons are held closer to (and more tightly by) the carbon nucleus, which stabilises the resulting carbanion if the hydrogen is removed as H⁺ — making the C-H bond of a terminal alkyne the most acidic of the three.",
      },
      {
        marks: 5,
        question:
          "(a) Describe, with equations, how ethene can be converted into ethane, 1,2-dibromoethane and ethanol via addition reactions. (b) Name the reagent/conditions used in each case.",
        answer:
          "(a)/(b) **Hydrogenation (to ethane):** CH₂=CH₂ + H₂ →[Ni catalyst] CH₃-CH₃.\n**Halogenation (to 1,2-dibromoethane):** CH₂=CH₂ + Br₂ → CH₂Br-CH₂Br (bromine, usually as bromine water or in CCl₄, at room temperature — no catalyst needed).\n**Hydration (to ethanol):** CH₂=CH₂ + H₂O →[dilute H₂SO₄ catalyst] CH₃CH₂OH, following Markovnikov's rule (though for this symmetrical alkene, only one product is possible).\nEach of these is an addition reaction across the C=C double bond of ethene, converting the alkene into a saturated (or partially substituted) product.",
      },
      {
        marks: 5,
        question:
          "(a) Explain the structure of benzene, including its bond lengths and the concept of resonance/delocalisation. (b) State Hückel's rule and show that benzene satisfies it.",
        answer:
          "(a) Benzene (C₆H₆) is a planar, hexagonal ring of six carbon atoms, each sp² hybridised and bonded to one hydrogen atom and two neighbouring ring carbons via sigma bonds. Each carbon also has one unhybridised p-orbital, perpendicular to the plane of the ring, each containing one electron; these six p-orbitals overlap sideways with each other around the entire ring, forming a continuous, delocalised π electron cloud above and below the ring plane (rather than three fixed, alternating double bonds). Because of this delocalisation, all six carbon-carbon bonds in benzene are found to have the same length (about 139 pm), intermediate between a typical single bond (154 pm) and a typical double bond (134 pm) — direct experimental evidence that the electrons are shared equally around the ring rather than fixed as three separate double bonds, as a simple Kekulé structure alone would suggest.\n(b) Hückel's rule states that a cyclic, planar, fully conjugated molecule is aromatic (and therefore unusually stable) if it possesses (4n + 2) π electrons, where n is a non-negative integer (0, 1, 2, ...). Benzene has 6 delocalised π electrons (one from each of the six p-orbitals); setting 4n + 2 = 6 gives n = 1, an integer, so benzene satisfies Hückel's rule and is aromatic.",
      },
    ],
  },
];

export const getChapter = (id: string): Chapter | undefined =>
  chapters.find((c) => c.id === id);
