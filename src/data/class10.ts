// ==================================================================
// Class 10 — CBSE / NCERT Chemistry
// Chapter 1: Chemical Reactions and Equations
// Chapter 2: Acids, Bases and Salts
// Chapter 3: Metals and Non-metals
// Chapter 4: Carbon and Its Compounds
//
// Content is built from the student's handwritten notes and the NCERT
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
  color: "copper" | "cyanine" | "viridian" | "saffron";
  readingTime: string;
  videos: Video[];
  notes: string; // markdown-lite
  experiments: Experiment[];
  objectiveQuestions: ObjectiveQuestion[];
  subjectiveQuestions: SubjectiveQuestion[];
}

export const chapters: Chapter[] = [
  // ================================================================
  // CHAPTER 1 — CHEMICAL REACTIONS AND EQUATIONS
  // ================================================================
  {
    id: "chemical-reactions-and-equations",
    number: 1,
    title: "Chemical Reactions and Equations",
    subtitle: "How substances change and how we write those changes",
    description:
      "Physical vs chemical changes, writing and balancing equations, and the five main types of reactions — combination, decomposition, displacement, double displacement and redox — plus corrosion and rancidity.",
    icon: "⚗️",
    color: "copper",
    readingTime: "25 min read",
    videos: [
      {
        title: "Chemical Reactions & Equations — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/B55_UADPl40",
      },
      {
        title: "Chemical Reactions and Equations — One Shot",
        channel: "Green Board",
        url: "https://www.youtube.com/embed/zHe-DJNBVHw",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/gQ-X9wV8TXQ",
      },
    ],
    notes: `
# Chemical Reactions and Equations

## Introduction

Everything around us changes with time. Some of these are **physical changes** and some are **chemical changes**.

| Physical Change | Chemical Change |
|---|---|
| A change in the physical properties of a substance in which **no new substance** is formed. | A change in which the original substances lose their nature and identity and **form new substances** with different properties. |
| Usually easily reversible. | Usually not easily reversible. |
| e.g. Melting of ice, boiling of water, breaking of an object, cutting of wood, tearing of paper, mixing sand and water. | e.g. Burning of paper, rusting of iron, boiling an egg, digestion of food, curdling of milk, photosynthesis. |

> [!key] A **chemical reaction** is a process in which one or more substances (reactants) are changed into one or more new substances (products) with new properties.

## How do we know a chemical reaction has happened?

The important characteristics (signs) of a chemical reaction are:

1. **Change in colour** — e.g. Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s); the blue colour of copper sulphate fades to colourless.
2. **Change in state** — e.g. 2H₂(g) + O₂(g) → 2H₂O(l).
3. **Change in temperature** — heat is given out or absorbed.
4. **Evolution of a gas** — e.g. Zn + dilute H₂SO₄ → ZnSO₄ + H₂↑.
5. **Formation of a precipitate** — an insoluble substance that settles down.

## Chemical Equations

A **chemical equation** is the representation of a chemical reaction in terms of words, symbols and formulae of the substances involved in it.

### Types of chemical equations
- **Word equation** — Magnesium + Oxygen → Magnesium oxide
- **Skeleton (symbol) equation** — Mg(s) + O₂(g) → MgO(s)  *(unbalanced)*

### State symbols
| Symbol | Meaning |
|---|---|
| (s) | Solid state |
| (l) | Liquid state |
| (g) | Gaseous state |
| (aq) | Aqueous — substance dissolved in water |
| ↑ | Gas evolved |
| ↓ | Precipitate (settles down) |

## Balanced Chemical Equations

A chemical equation is **balanced** when the number of atoms of each element on the reactant side is equal to the number of atoms of that element on the product side.

> [!note] Equations must always be balanced to satisfy the **Law of Conservation of Mass**, which states that mass can neither be created nor destroyed in a chemical reaction.

**Example:** Mg + O₂ → MgO becomes **2Mg + O₂ → 2MgO**.

Other balanced examples:
- N₂ + 3H₂ → 2NH₃
- 2H₂ + O₂ → 2H₂O
- BaCl₂ + Na₂SO₄ → 2NaCl + BaSO₄
- C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O

## Types of Chemical Reactions

::diagram:reaction-types

### 1. Combination Reaction
A reaction in which **two or more reactants combine to form a single product**.
- CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat  *(quick lime → slaked lime; this reaction is highly exothermic)*
- 2Mg + O₂ → 2MgO
- C + O₂ → CO₂

### 2. Decomposition Reaction
A reaction in which a **single substance breaks down into two or more simpler products**. It is the opposite of combination.

**Types of decomposition:**
- **Thermal decomposition** (by heat)
  - CaCO₃(s) →[Δ] CaO(s) + CO₂(g)  *(limestone → quick lime)*
  - 2FeSO₄(s) →[Δ] Fe₂O₃(s) + SO₂(g) + SO₃(g)
  - 2Pb(NO₃)₂(s) →[Δ] 2PbO(s) + 4NO₂(g) + O₂(g)  *(brown fumes)*
- **Electrolytic decomposition** (by electricity)
  - 2H₂O(l) →[electricity] 2H₂(g) + O₂(g)

::diagram:electrolysis
- **Photochemical decomposition** (by light)
  - 2AgCl(s) →[sunlight] 2Ag(s) + Cl₂(g)  *(used in black-and-white photography)*
  - 2AgBr(s) →[sunlight] 2Ag(s) + Br₂(g)

### 3. Displacement (Single Displacement) Reaction
A reaction in which a **more reactive element displaces a less reactive element** from its compound.
- Fe + CuSO₄ → FeSO₄ + Cu
- Zn + CuSO₄ → ZnSO₄ + Cu

A **more reactive metal A** can displace a **less reactive metal B**: A + BC → AC + B (only possible when A > B).

**Reactivity (Activity) Series** — arranged in decreasing order of reactivity:

> [!key] K > Na > Ca > Mg > Al > Zn > Fe > Pb > **(H)** > Cu > Hg > Ag > Au

*(Hydrogen is a non-metal but is placed in the series because, like metals, it can lose an electron to form H⁺.)*

::diagram:reactivity-series

### 4. Double Displacement Reaction
A reaction in which **two compounds react by the exchange of ions** to form two new compounds. General form: AB + CD → AD + CB.
- AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)  *(white precipitate)*
- BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)

**Precipitation reaction** — a double displacement reaction in which one of the products is an insoluble solid (precipitate) that settles down.

**Neutralisation reaction** — a reaction in which an acid reacts with a base to give a salt and water. It is a special double displacement reaction.
- HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)
- H₂SO₄(aq) + 2NaOH(aq) → Na₂SO₄(aq) + 2H₂O(l)

### 5. Oxidation–Reduction (Redox) Reaction
A reaction in which **oxidation and reduction take place simultaneously**.

| Oxidation | Reduction |
|---|---|
| Addition of oxygen | Removal of oxygen |
| Removal of hydrogen | Addition of hydrogen |
| **Loss of electrons** | **Gain of electrons** |
| Increase in oxidation number | Decrease in oxidation number |

**Example:** CuO + H₂ → Cu + H₂O
- Cu²⁺ → Cu⁰ : copper is **reduced** (CuO is the oxidising agent)
- H₂ → H₂O : hydrogen is **oxidised** (H₂ is the reducing agent)

- **Oxidising agent** — the substance which oxidises others and itself gets reduced.
- **Reducing agent** — the substance which reduces others and itself gets oxidised.

::diagram:redox

### Exothermic vs Endothermic
- **Exothermic reaction** — a reaction in which heat is evolved (given out). e.g. burning of natural gas, respiration, C + O₂ → CO₂ + heat.
- **Endothermic reaction** — a reaction in which heat is absorbed. e.g. photosynthesis, decomposition of calcium carbonate.

> [!example] Respiration is an exothermic reaction: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy.

::diagram:energy-diagram

## Effects of Oxidation in Everyday Life

### Corrosion
The **slow degradation of metal surfaces by the action of air, moisture or chemicals** on their surface is called corrosion.
- **Rusting of iron** — the reddish-brown powder (hydrated ferric oxide) formed is called rust. 4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O.
- **Corrosion of copper** — a green coating (basic copper carbonate) forms on copper exposed to humid air.
- **Tarnishing of silver** — silver articles lose their lustre and develop a black coating of silver sulphide (Ag₂S) in the presence of hydrogen sulphide in air.

::diagram:rusting

**Prevention of corrosion:** painting, oiling/greasing, galvanisation (coating iron with a layer of the more reactive metal zinc), and making alloys.

### Rancidity
When **fats and oils are oxidised** (on exposure to air), they become rancid and their smell and taste change. This is called **rancidity**.

**Prevention:** adding antioxidants, refrigeration, flushing packets of food (like chips) with an unreactive gas such as **nitrogen**, and storing food in air-tight containers.
    `,
    experiments: [
      {
        id: "mg-ribbon-burning",
        title: "Burning of Magnesium Ribbon in Air",
        activityRef: "NCERT Activity 1.1",
        aim: "To observe a combination reaction and the properties of the product formed.",
        materials: [
          "A small piece of magnesium ribbon (~2 cm)",
          "Sandpaper",
          "A pair of tongs",
          "Burner / spirit lamp",
          "A watch glass",
        ],
        procedure: [
          "Clean a magnesium ribbon with sandpaper to remove the protective oxide layer.",
          "Hold it with a pair of tongs and bring it near the flame.",
          "Collect the white ash formed on a watch glass.",
        ],
        observation:
          "Magnesium ribbon burns with a dazzling white flame and forms a white powder (ash) of magnesium oxide.",
        reaction: "2Mg(s) + O₂(g) →[Δ] 2MgO(s)",
        conclusion:
          "The reaction is a combination reaction. Magnesium combines with oxygen to form a single product, magnesium oxide (a basic oxide).",
        safety:
          "Never look directly at the burning magnesium — the intense UV/white light can damage the eyes.",
        visual: {
          figure: "mg-burning",
          before: "hsl(40 30% 96%)",
          solid: { name: "Magnesium ribbon", colourBefore: "hsl(210 8% 78%)", colourAfter: "hsl(0 0% 99%)" },
          precipitate: { name: "White magnesium oxide ash", colour: "hsl(0 0% 99%)" },
          thermal: "exothermic",
          flame: true,
          labels: { before: "Clean magnesium ribbon", after: "Burns with a dazzling white flame" },
        },
      },
      {
        id: "lead-nitrate-pottassium-iodide",
        title: "Reaction of Lead Nitrate with Potassium Iodide",
        activityRef: "NCERT Activity 1.2",
        aim: "To observe a double displacement (precipitation) reaction.",
        materials: [
          "Lead nitrate solution",
          "Potassium iodide solution",
          "Two test tubes",
        ],
        procedure: [
          "Take lead nitrate solution in a test tube.",
          "Add potassium iodide solution to it.",
          "Observe the colour of the product formed.",
        ],
        observation: "A yellow precipitate of lead iodide (PbI₂) is formed.",
        reaction: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
        conclusion:
          "This is a double displacement reaction as well as a precipitation reaction — the insoluble yellow solid PbI₂ is the precipitate.",
        visual: {
          figure: "pbno3-ki",
          before: "hsl(40 30% 96%)",
          after: "hsl(40 30% 96%)",
          precipitate: { name: "Lead iodide", colour: "hsl(48 95% 55%)" },
          labels: { before: "Two colourless solutions", after: "Yellow precipitate of PbI₂" },
        },
      },
      {
        id: "zinc-and-acid",
        title: "Reaction of Zinc Granules with Dilute Acid",
        activityRef: "NCERT Activity 1.3",
        aim: "To show evolution of hydrogen gas as a sign of a chemical reaction.",
        materials: [
          "Zinc granules",
          "Dilute hydrochloric acid (or dilute sulphuric acid)",
          "A conical flask and delivery tube",
          "A soap solution",
        ],
        procedure: [
          "Place a few zinc granules in a conical flask.",
          "Add dilute HCl (or H₂SO₄).",
          "Pass the gas produced through a soap solution and bring a burning candle near a gas-filled bubble.",
        ],
        observation:
          "Bubbles of gas are evolved; the gas burns with a 'pop' sound, confirming it is hydrogen.",
        reaction: "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
        conclusion:
          "Evolution of a gas is a characteristic of a chemical reaction. The gas evolved is hydrogen (it burns with a pop sound).",
        visual: {
          figure: "zinc-acid",
          before: "hsl(40 30% 96%)",
          after: "hsl(40 30% 96%)",
          gas: "Hydrogen",
          solid: { name: "Zinc granules", colourBefore: "hsl(220 6% 72%)" },
          thermal: "exothermic",
          labels: { before: "Zinc in dilute acid", after: "Hydrogen bubbles off" },
        },
      },
      {
        id: "ferrous-sulphate-heating",
        title: "Heating of Ferrous Sulphate Crystals",
        activityRef: "NCERT Activity 1.5",
        aim: "To observe a thermal decomposition reaction.",
        materials: ["Ferrous sulphate crystals (FeSO₄·7H₂O)", "A dry boiling tube", "Burner"],
        procedure: [
          "Take a few ferrous sulphate crystals in a dry boiling tube.",
          "Note the colour of the crystals.",
          "Heat the boiling tube strongly and observe.",
        ],
        observation:
          "The green colour of ferrous sulphate crystals fades (water of crystallisation is lost) and a brown solid is formed with a smell of burning sulphur.",
        reaction: "2FeSO₄(s) →[Δ] Fe₂O₃(s) + SO₂(g) + SO₃(g)",
        conclusion:
          "Ferrous sulphate decomposes on heating to give ferric oxide, sulphur dioxide and sulphur trioxide — a thermal decomposition reaction.",
        visual: {
          figure: "feso4-heating",
          before: "hsl(140 45% 60%)",
          after: "hsl(20 55% 40%)",
          gas: "Sulphur dioxide and trioxide",
          labels: { before: "Green ferrous sulphate crystals", after: "Brown ferric oxide remains" },
        },
      },
      {
        id: "electrolysis-of-water",
        title: "Electrolysis of Water",
        activityRef: "NCERT Activity 1.7",
        aim: "To decompose water into hydrogen and oxygen using electricity.",
        materials: [
          "A plastic mug / electrolysis apparatus",
          "Two graphite electrodes",
          "Dilute sulphuric acid (a few drops, to make water conducting)",
          "A 6-volt battery",
          "Two test tubes / graduated tubes",
        ],
        procedure: [
          "Fill the apparatus with water and add a few drops of dilute sulphuric acid.",
          "Immerse two graphite electrodes and connect them to a battery.",
          "Invert a water-filled test tube over each electrode and switch on the current.",
        ],
        observation:
          "Bubbles form at both electrodes. The volume of gas collected at the cathode (hydrogen) is double that at the anode (oxygen). The hydrogen bubble burns with a pop; the oxygen relights a glowing splinter.",
        reaction: "2H₂O(l) →[electricity] 2H₂(g) + O₂(g)",
        conclusion:
          "Water is decomposed by electricity into hydrogen and oxygen in a 2:1 volume ratio — an electrolytic decomposition reaction.",
        visual: {
          figure: "electrolysis",
          before: "hsl(40 30% 96%)",
          after: "hsl(40 30% 96%)",
          gas: "Hydrogen and oxygen",
          labels: { before: "Acidified water, current off", after: "Gases collect at both electrodes" },
        },
      },
      {
        id: "silver-chloride-sunlight",
        title: "Effect of Sunlight on Silver Chloride",
        activityRef: "NCERT Activity 1.8",
        aim: "To observe a photochemical decomposition reaction.",
        materials: ["Silver chloride (white)", "A watch glass", "Sunlight"],
        procedure: [
          "Take a small amount of white silver chloride in a watch glass.",
          "Place it in sunlight for some time.",
          "Observe the change in colour.",
        ],
        observation: "White silver chloride turns grey in sunlight.",
        reaction: "2AgCl(s) →[sunlight] 2Ag(s) + Cl₂(g)",
        conclusion:
          "Silver chloride decomposes in the presence of sunlight into silver and chlorine — a photochemical decomposition reaction. This reaction is used in black-and-white photography.",
        visual: {
          figure: "agcl-sunlight",
          before: "hsl(40 20% 97%)",
          after: "hsl(30 4% 55%)",
          labels: { before: "White silver chloride", after: "Turns grey in sunlight" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Which of the following is a physical change?",
        options: ["Rusting of iron", "Melting of ice", "Burning of paper", "Curdling of milk"],
        correctAnswer: 1,
        explanation:
          "Melting of ice only changes the physical state (solid → liquid); no new substance is formed. The others are chemical changes.",
      },
      {
        question: "The equation Mg + O₂ → MgO is balanced correctly as:",
        options: ["Mg + O₂ → MgO", "2Mg + O₂ → 2MgO", "Mg + 2O₂ → MgO", "2Mg + 2O₂ → 2MgO"],
        correctAnswer: 1,
        explanation:
          "2Mg + O₂ → 2MgO balances 2 Mg and 2 O atoms on both sides, satisfying the law of conservation of mass.",
      },
      {
        question: "CaCO₃ → CaO + CO₂ (on heating) is an example of a:",
        options: [
          "Combination reaction",
          "Displacement reaction",
          "Thermal decomposition reaction",
          "Double displacement reaction",
        ],
        correctAnswer: 2,
        explanation:
          "A single compound (CaCO₃) breaks down into simpler substances (CaO and CO₂) on heating — thermal decomposition.",
      },
      {
        question:
          "In the reaction Zn + CuSO₄ → ZnSO₄ + Cu, zinc displaces copper because:",
        options: [
          "Copper is more reactive than zinc",
          "Zinc is more reactive than copper",
          "Both have equal reactivity",
          "Copper is a non-metal",
        ],
        correctAnswer: 1,
        explanation:
          "In the activity series Zn is placed above Cu, so the more reactive zinc displaces the less reactive copper from its salt.",
      },
      {
        question:
          "The white precipitate formed when silver nitrate reacts with sodium chloride is:",
        options: ["NaNO₃", "AgCl", "AgNO₃", "NaCl"],
        correctAnswer: 1,
        explanation:
          "AgNO₃ + NaCl → AgCl↓ + NaNO₃. Silver chloride (AgCl) is the insoluble white precipitate.",
      },
      {
        question: "In the reaction CuO + H₂ → Cu + H₂O, hydrogen is:",
        options: ["Oxidised", "Reduced", "Neither oxidised nor reduced", "A catalyst"],
        correctAnswer: 0,
        explanation:
          "Hydrogen gains oxygen to form water, so it is oxidised. CuO loses oxygen and is reduced (CuO is the oxidising agent).",
      },
      {
        question: "Which gas is used to flush packets of chips to prevent rancidity?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: 2,
        explanation:
          "Nitrogen is an unreactive gas, so flushing packets with it keeps oxygen out and prevents the oxidation of fats and oils (rancidity).",
      },
      {
        question:
          "The reddish-brown coating formed on iron objects in humid air is chemically:",
        options: [
          "Iron sulphide",
          "Hydrated ferric oxide (rust)",
          "Iron carbonate",
          "Ferrous chloride",
        ],
        correctAnswer: 1,
        explanation:
          "Rust is hydrated ferric oxide, Fe₂O₃·xH₂O, formed by the corrosion of iron in the presence of air and moisture.",
      },
      {
        question: "2AgCl → 2Ag + Cl₂ in the presence of sunlight is a:",
        options: [
          "Photochemical decomposition reaction",
          "Combination reaction",
          "Exothermic reaction",
          "Neutralisation reaction",
        ],
        correctAnswer: 0,
        explanation:
          "Silver chloride decomposes when exposed to light — a photochemical decomposition, used in black-and-white photography.",
      },
      {
        question: "Respiration is an example of which type of reaction?",
        options: [
          "Endothermic reaction",
          "Exothermic reaction",
          "Photochemical reaction",
          "Displacement reaction",
        ],
        correctAnswer: 1,
        explanation:
          "During respiration, glucose is oxidised and energy (heat) is released, making it an exothermic reaction.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define a chemical reaction.",
        answer:
          "A chemical reaction is a process in which one or more substances (reactants) are converted into one or more new substances (products) with different properties.",
      },
      {
        marks: 1,
        question: "Why should a magnesium ribbon be cleaned before burning in air?",
        answer:
          "Magnesium reacts with oxygen in air to form a protective layer of magnesium oxide (MgO) on its surface. Cleaning with sandpaper removes this layer so the metal can burn freely.",
      },
      {
        marks: 2,
        question: "Distinguish between a physical change and a chemical change with one example each.",
        answer:
          "In a **physical change** no new substance is formed and it is usually reversible (e.g. melting of ice). In a **chemical change** the original substance loses its identity and a new substance with new properties is formed, and it is usually not easily reversible (e.g. rusting of iron).",
      },
      {
        marks: 2,
        question: "What is a balanced chemical equation? Why must equations be balanced?",
        answer:
          "A balanced chemical equation has an equal number of atoms of each element on the reactant and the product side. Equations must be balanced to obey the **law of conservation of mass**, which states that mass can neither be created nor destroyed in a chemical reaction.",
      },
      {
        marks: 2,
        question:
          "Translate into a balanced chemical equation: Barium chloride reacts with sodium sulphate to give barium sulphate and sodium chloride.",
        answer: "BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
      },
      {
        marks: 3,
        question:
          "Identify the type of reaction and balance: (a) N₂ + H₂ → NH₃  (b) Pb(NO₃)₂ → PbO + NO₂ + O₂  (c) Fe + CuSO₄ → FeSO₄ + Cu",
        answer:
          "(a) N₂ + 3H₂ → 2NH₃ — **combination reaction**.\n(b) 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂ — **thermal decomposition reaction**.\n(c) Fe + CuSO₄ → FeSO₄ + Cu — **displacement reaction** (iron is more reactive than copper).",
      },
      {
        marks: 3,
        question:
          "What is meant by oxidation and reduction? In the reaction CuO + H₂ → Cu + H₂O, name the substance oxidised, reduced, the oxidising agent and the reducing agent.",
        answer:
          "**Oxidation** is the gain of oxygen / loss of hydrogen / loss of electrons. **Reduction** is the loss of oxygen / gain of hydrogen / gain of electrons.\nIn CuO + H₂ → Cu + H₂O:\n- Substance oxidised: H₂ (gains oxygen to form H₂O)\n- Substance reduced: CuO (loses oxygen to form Cu)\n- Oxidising agent: CuO\n- Reducing agent: H₂",
      },
      {
        marks: 3,
        question: "What is corrosion? Give two methods to prevent the corrosion of iron.",
        answer:
          "Corrosion is the slow degradation of a metal surface by the action of air, moisture or chemicals; for iron it is called rusting and forms hydrated ferric oxide (Fe₂O₃·xH₂O).\nPrevention methods: (i) **Painting / oiling / greasing** the surface to keep out air and moisture; (ii) **Galvanisation** — coating iron with a layer of the more reactive metal zinc. (Making alloys such as stainless steel also works.)",
      },
      {
        marks: 5,
        question:
          "Explain, with one balanced example each, the following types of chemical reactions: combination, decomposition, displacement, double displacement and redox.",
        answer:
          "1. **Combination** — two or more reactants form a single product. CaO + H₂O → Ca(OH)₂.\n2. **Decomposition** — a single reactant breaks into simpler products. CaCO₃ →[Δ] CaO + CO₂.\n3. **Displacement** — a more reactive element displaces a less reactive one. Fe + CuSO₄ → FeSO₄ + Cu.\n4. **Double displacement** — two compounds exchange ions. AgNO₃ + NaCl → AgCl↓ + NaNO₃.\n5. **Redox** — oxidation and reduction occur together. CuO + H₂ → Cu + H₂O (CuO reduced, H₂ oxidised).",
      },
      {
        marks: 5,
        question:
          "(a) Define rancidity. (b) State two methods to prevent it. (c) Why is respiration considered an exothermic reaction? (d) Write the balanced equation for the burning of natural gas (methane).",
        answer:
          "(a) **Rancidity** is the spoiling of fats and oils by oxidation on exposure to air, which changes their smell and taste.\n(b) Prevention: adding **antioxidants**, refrigeration, flushing packets with **nitrogen** (an unreactive gas), and using air-tight containers.\n(c) Respiration is exothermic because glucose is oxidised and **energy (heat) is released**: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy.\n(d) CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) — an exothermic combustion reaction.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 2 — ACIDS, BASES AND SALTS
  // ================================================================
  {
    id: "acids-bases-and-salts",
    number: 2,
    title: "Acids, Bases and Salts",
    subtitle: "Sour, bitter and everything the pH scale measures",
    description:
      "Theories of acids and bases, indicators, chemical properties of acids and bases, the pH scale and its importance in daily life, and important salts like common salt, baking soda, washing soda, bleaching powder and Plaster of Paris.",
    icon: "🧫",
    color: "cyanine",
    readingTime: "28 min read",
    videos: [
      {
        title: "Acids, Bases and Salts — Full Chapter in Animation",
        channel: "One-shot (Animated)",
        url: "https://www.youtube.com/embed/zv1-ZuLSskQ",
      },
      {
        title: "Acids, Bases and Salts — Full Chapter One Shot",
        channel: "One-shot revision",
        url: "https://www.youtube.com/embed/X6HHtlepDlo",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/qKl4mieovu0",
      },
    ],
    notes: `
# Acids, Bases and Salts

## Introduction

Compounds can be classified as **acids**, **bases** and **salts**.
- **Acids** taste **sour** (e.g. lemon, vinegar).
- **Bases** taste **bitter** and feel soapy.
- **Salts** are formed when an acid reacts with a base.

## Three Theories of Acids and Bases

| Theory | Acid | Base |
|---|---|---|
| **Arrhenius** | Gives H⁺ (H₃O⁺) ions in water. HCl + H₂O → H₃O⁺ + Cl⁻ | Gives OH⁻ ions in water. NaOH → Na⁺(aq) + OH⁻(aq) |
| **Brønsted–Lowry** | Proton (H⁺) donor | Proton (H⁺) acceptor |
| **Lewis** | Electron-pair acceptor | Electron-pair donor |

> [!example] NH₃ + HCl → NH₄Cl. Here HCl donates a proton (so it is the acid) and NH₃ accepts it (so it is the base).

## Indicators

An **indicator** is a substance that gives a visible signal (usually a colour change) in the presence of an acid or a base.

### 1. Natural indicators
Extracted from natural sources — e.g. litmus (from lichen), turmeric, red cabbage juice.

### 2. Synthetic indicators
Made in the laboratory — e.g. methyl orange, phenolphthalein.

### 3. Olfactory indicators
Substances whose **smell (odour) changes** in acidic or basic media — e.g. onion, vanilla essence, clove oil.

| Indicator | In acid | In base | Neutral |
|---|---|---|---|
| Red litmus | Red | Blue | Red |
| Blue litmus | Red | Blue | Blue |
| Turmeric | Yellow | Reddish-brown | Yellow |
| Red cabbage juice | Red | Green | Purple |
| Methyl orange | Red | Yellow | Yellow |
| Phenolphthalein | Colourless | Pink | Colourless |

## Classification of Acids

### On the basis of source
- **Organic acids** — obtained from natural sources (plants and animals). e.g. acetic acid (vinegar), citric acid (lemon/orange), tartaric acid (tamarind), malic acid (apple), oxalic acid (tomato), lactic acid (sour milk), formic acid (ant sting).
- **Inorganic (mineral) acids** — obtained from minerals of the earth. e.g. H₂SO₄, HCl, HNO₃.

### On the basis of strength
- **Strong acids** — dissociate almost completely in water. e.g. HCl, H₂SO₄, HNO₃.
- **Weak acids** — dissociate only partially in water. e.g. acetic acid (CH₃COOH), carbonic acid. *(All organic acids are weak.)*

Similarly, **strong bases** (all mineral/alkali bases like NaOH, KOH) dissociate completely, while **weak bases** (e.g. NH₄OH) dissociate partially.

## Chemical Properties of Acids

### 1. Acid + Metal → Salt + Hydrogen gas
- Zn + 2HCl → ZnCl₂ + H₂↑
- Ca + H₂SO₄ → CaSO₄ + H₂↑

> [!tip] **Confirmation of hydrogen:** the gas evolved burns with a 'pop' sound when a burning candle is brought near it.
>
> **Note:** metals do not usually give hydrogen with nitric acid because HNO₃ is a strong oxidising agent and oxidises the H₂ formed to water. (Very dilute HNO₃ with Mg or Mn is an exception.)

### 2. Acid + Metal carbonate / bicarbonate → Salt + CO₂ + Water
- 2HCl + Na₂CO₃ → 2NaCl + CO₂ + H₂O
- HCl + NaHCO₃ → NaCl + CO₂ + H₂O

> [!tip] **Confirmation of CO₂:** the gas turns lime water milky. Ca(OH)₂ + CO₂ → CaCO₃(white) + H₂O. On passing excess CO₂ the milkiness disappears due to the formation of soluble calcium bicarbonate: CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂.

### 3. Acid + Metal oxide → Salt + Water
Metal oxides are **basic**, so they neutralise acids.
- CuO + 2HCl → CuCl₂ + H₂O

## Chemical Properties of Bases

### 1. Base + Metal → Salt + Hydrogen gas
- 2NaOH + Zn → Na₂ZnO₂ + H₂↑  *(sodium zincate)*

### 2. Base + Non-metal oxide → Salt + Water
Non-metal oxides are **acidic**, so they are neutralised by bases.
- 2NaOH + CO₂ → Na₂CO₃ + H₂O

### Amphoteric oxides
Metal oxides like **ZnO** and **Al₂O₃** show both acidic and basic behaviour — they react with both acids and bases.
- ZnO + 2HCl → ZnCl₂ + H₂O  *(acts as a base)*
- ZnO + 2NaOH → Na₂ZnO₂ + H₂O  *(acts as an acid)*

## Neutralisation Reaction

A reaction in which an acid reacts with a base to give a **salt and water**.
Acid + Base → Salt + Water
- HCl + NaOH → NaCl + H₂O
- H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O

::diagram:neutralisation

## The pH Scale

**pH** is a scale used to measure the strength (acidity or basicity) of a solution. "**p**" stands for *potenz* (power) and "**H**" stands for hydrogen — so pH means the power of hydrogen. It ranges from **0 to 14**.

| pH value | Nature |
|---|---|
| pH < 7 | Acidic solution |
| pH = 7 | Neutral |
| pH > 7 | Basic (alkaline) solution |

::diagram:ph-scale

> [!key] - The **lower** the pH, the **more acidic** the solution — higher H⁺ ion concentration.
> - The **higher** the pH, the **more basic** the solution — lower H⁺ ion concentration.

**pH colour scale:** Red → Orange → Yellow → Green (neutral, ~7) → Blue → Indigo → Violet, from acidic (0) to basic (14).

## Importance of pH in Everyday Life

1. **pH in the body / digestion** — our stomach produces HCl for digestion. Excess acid causes indigestion and pain; it is neutralised using antacids (mild bases like magnesium hydroxide, "milk of magnesia").
2. **Tooth decay** — starts when the pH in the mouth falls **below 5.5**. Bacteria produce acids that dissolve the enamel. Toothpastes are basic and neutralise the excess acid, preventing decay.
3. **pH of soil** — plants grow best in a specific pH range. If the soil is too acidic it is treated with bases like quick lime (CaO) or slaked lime (Ca(OH)₂); if too basic, with organic matter/gypsum.
4. **Survival of aquatic life** — aquatic organisms survive in a narrow pH range. Acid rain (pH < 5.6) lowers the pH of river water and can kill aquatic plants and animals.
5. **Self-defence by animals & plants** — bee and ant stings inject **formic (methanoic) acid**, causing pain; it can be neutralised with a mild base like baking soda. Stinging nettle leaves also inject acid.

## Salts

A **salt** is formed from the cation of a base and the anion of an acid.

| Salt type | From | Nature |
|---|---|---|
| HCl + NaOH → NaCl + H₂O | Strong acid + Strong base | Neutral |
| HCl + NH₄OH → NH₄Cl + H₂O | Strong acid + Weak base | Acidic |
| CH₃COOH + NaOH → CH₃COONa + H₂O | Weak acid + Strong base | Basic |

## Some Important Salts (Chemical Compounds)

### 1. Common Salt — Sodium Chloride (NaCl)
- Prepared by neutralisation: HCl + NaOH → NaCl + H₂O.
- It is the raw material for making many chemicals (caustic soda, baking soda, washing soda, bleaching powder).

### 2. Caustic Soda — Sodium Hydroxide (NaOH)
- Made by the **chlor-alkali process**: passing electricity through brine (aqueous NaCl).
- 2NaCl(aq) + 2H₂O(l) →[electricity] 2NaOH(aq) + Cl₂(g) + H₂(g)
- Products: NaOH at the cathode, Cl₂ at the anode, H₂ at the cathode.

::diagram:chlor-alkali
- **Uses:** making soap and detergents, paper, artificial fibres; de-greasing metals.

### 3. Bleaching Powder — Calcium Oxychloride (CaOCl₂)
- Made by the action of chlorine on dry slaked lime: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O.
- **Uses:** bleaching cotton and linen in textile industries and wood pulp in paper factories; disinfecting drinking water; as an oxidising agent.

### 4. Baking Soda — Sodium Hydrogencarbonate (NaHCO₃)
- Prepared by: NaCl + H₂O + CO₂ + NH₃ → NaHCO₃ + NH₄Cl.
- On heating: 2NaHCO₃ →[Δ] Na₂CO₃ + CO₂ + H₂O. The CO₂ released makes cakes and bread soft and spongy.
- **Uses:** baking (with tartaric acid as baking powder), as an antacid, and in soda-acid fire extinguishers.

### 5. Washing Soda — Sodium Carbonate Decahydrate (Na₂CO₃·10H₂O)
- Recrystallising sodium carbonate: Na₂CO₃ + 10H₂O → Na₂CO₃·10H₂O.
- **Uses:** softening hard water, cleaning, and manufacturing glass, soap and paper.

### 6. Plaster of Paris — Calcium Sulphate Hemihydrate (CaSO₄·½H₂O)
- Made by heating gypsum at ~373 K: CaSO₄·2H₂O →[373 K] CaSO₄·½H₂O + 1½H₂O.
- On adding water it sets into a hard solid mass of gypsum again.
- **Uses:** in hospitals to support fractured bones, for making toys and decorative items, and in construction.

## Water of Crystallisation

The fixed number of water molecules present in one formula unit of a salt is called its **water of crystallisation** — e.g. the 10 water molecules in washing soda (Na₂CO₃·10H₂O) and the 5 in blue copper sulphate (CuSO₄·5H₂O).
    `,
    experiments: [
      {
        id: "litmus-test",
        title: "Testing Acids and Bases with Litmus",
        aim: "To distinguish acids and bases using litmus paper.",
        materials: [
          "Dilute HCl and dilute NaOH",
          "Red and blue litmus paper",
          "Droppers and a tile",
        ],
        procedure: [
          "Place a drop of dilute HCl on both red and blue litmus paper.",
          "Repeat with dilute NaOH on fresh strips.",
          "Note the colour changes.",
        ],
        observation:
          "Acid (HCl) turns blue litmus red. Base (NaOH) turns red litmus blue. Litmus is unchanged in a neutral solution.",
        conclusion:
          "Litmus is a natural indicator: acids turn blue litmus red, bases turn red litmus blue.",
        safety: "Handle dilute acids and bases carefully; wash off any splashes with plenty of water.",
        visual: {
          figure: "litmus",
          before: "hsl(215 70% 55%)",
          after: "hsl(0 70% 52%)",
          labels: { before: "Blue litmus solution", after: "Turns red in acid" },
        },
      },
      {
        id: "acid-metal-hydrogen",
        title: "Reaction of a Dilute Acid with a Metal",
        aim: "To show that acids react with metals to give hydrogen gas.",
        materials: ["Zinc granules", "Dilute HCl", "A test tube with delivery tube", "Soap solution / candle"],
        procedure: [
          "Take a few zinc granules in a test tube.",
          "Add dilute hydrochloric acid.",
          "Bring a burning candle near the mouth of the tube (or test the gas passed through soap solution).",
        ],
        observation: "Bubbles of gas are produced; the gas burns with a characteristic 'pop' sound.",
        reaction: "Zn + 2HCl → ZnCl₂ + H₂↑",
        conclusion:
          "Acids react with active metals to form a salt and liberate hydrogen gas (confirmed by the pop test).",
        visual: {
          figure: "zinc-acid",
          before: "hsl(40 30% 96%)",
          after: "hsl(40 30% 96%)",
          gas: "Hydrogen",
          solid: { name: "Zinc granules", colourBefore: "hsl(220 6% 72%)" },
          labels: { before: "Zinc in dilute HCl", after: "Gas burns with a pop" },
        },
      },
      {
        id: "acid-carbonate-limewater",
        title: "Acid + Carbonate and the Lime Water Test",
        aim: "To show that acids react with carbonates to give CO₂, and to test CO₂ with lime water.",
        materials: [
          "Sodium carbonate / sodium bicarbonate",
          "Dilute HCl",
          "Freshly prepared lime water",
          "Test tube with delivery tube",
        ],
        procedure: [
          "Add dilute HCl to sodium carbonate in a test tube.",
          "Pass the gas evolved through lime water.",
          "Continue passing the gas (excess) and observe.",
        ],
        observation:
          "Brisk effervescence occurs; the gas turns lime water milky. On passing excess gas, the milkiness disappears.",
        reaction:
          "Na₂CO₃ + 2HCl → 2NaCl + CO₂ + H₂O ; Ca(OH)₂ + CO₂ → CaCO₃(milky) + H₂O ; CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂ (soluble)",
        conclusion:
          "Acids react with carbonates/bicarbonates to release CO₂, which turns lime water milky — a standard test for carbon dioxide.",
        visual: {
          figure: "acid-carbonate",
          before: "hsl(40 30% 96%)",
          after: "hsl(40 12% 90%)",
          gas: "Carbon dioxide",
          precipitate: { name: "Calcium carbonate", colour: "hsl(0 0% 97%)" },
          labels: { before: "Clear lime water", after: "Turns milky as CO₂ passes through" },
        },
      },
      {
        id: "neutralisation-reaction",
        title: "Neutralisation of an Acid by a Base",
        aim: "To observe a neutralisation reaction using phenolphthalein.",
        materials: [
          "Dilute NaOH",
          "Dilute HCl",
          "Phenolphthalein indicator",
          "A conical flask and dropper",
        ],
        procedure: [
          "Take dilute NaOH in a flask and add 2–3 drops of phenolphthalein — the solution turns pink.",
          "Add dilute HCl drop by drop with swirling.",
          "Continue until the pink colour just disappears.",
        ],
        observation:
          "The pink colour of the basic solution fades and finally disappears when enough acid has been added.",
        reaction: "HCl + NaOH → NaCl + H₂O",
        conclusion:
          "An acid neutralises a base to give a salt and water. The disappearance of the pink colour marks the neutral (end) point.",
        visual: {
          figure: "neutralisation",
          before: "hsl(330 70% 72%)",
          after: "hsl(40 30% 96%)",
          thermal: "exothermic",
          labels: { before: "Alkali with phenolphthalein — pink", after: "Acid added — colour just disappears" },
        },
      },
      {
        id: "ph-of-substances",
        title: "Finding the pH of Common Substances",
        aim: "To measure the pH of everyday substances using pH paper.",
        materials: [
          "Universal indicator / pH paper and colour chart",
          "Samples: lemon juice, saliva, coffee, tap water, soap solution",
          "A clean tile and dropper",
        ],
        procedure: [
          "Place a drop of each sample on a strip of pH paper.",
          "Match the colour produced with the standard pH colour chart.",
          "Record the pH value.",
        ],
        observation:
          "Approximate values: lemon juice ≈ 2.2, coffee ≈ 5, saliva ≈ 6.5–7.5, tap water ≈ 7, soap solution ≈ 9.5 (basic).",
        conclusion:
          "The pH scale (0–14) tells us whether a substance is acidic (pH < 7), neutral (pH = 7) or basic (pH > 7).",
        visual: {
          figure: "ph-paper",
          before: "hsl(95 55% 55%)",
          after: "hsl(8 80% 55%)",
          labels: { before: "Universal indicator in water (pH 7)", after: "Lemon juice added (pH ≈ 2.2)" },
        },
      },
      {
        id: "pop-setting",
        title: "Setting of Plaster of Paris",
        aim: "To show that Plaster of Paris sets into a hard mass on adding water.",
        materials: ["Plaster of Paris powder", "Water", "A small mould / container"],
        procedure: [
          "Take some Plaster of Paris powder in a container.",
          "Add a little water and mix into a paste.",
          "Leave it undisturbed for a few minutes and touch it.",
        ],
        observation: "The paste becomes warm and sets into a hard, solid mass within a few minutes.",
        reaction: "CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O (gypsum)",
        conclusion:
          "Plaster of Paris reacts with water and sets into a hard solid mass of gypsum — which is why it is used to support fractured bones and make casts.",
        visual: {
          figure: "pop-setting",
          before: "hsl(40 18% 92%)",
          after: "hsl(40 10% 97%)",
          thermal: "exothermic",
          labels: { before: "Plaster of Paris paste", after: "Sets into hard gypsum" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "According to Arrhenius, an acid is a substance that gives which ion in water?",
        options: ["OH⁻", "H⁺ (H₃O⁺)", "Cl⁻", "Na⁺"],
        correctAnswer: 1,
        explanation:
          "An Arrhenius acid produces hydrogen ions (H⁺, existing as H₃O⁺) in aqueous solution; a base produces OH⁻ ions.",
      },
      {
        question: "Phenolphthalein in a basic solution turns:",
        options: ["Red", "Colourless", "Pink", "Yellow"],
        correctAnswer: 2,
        explanation:
          "Phenolphthalein is colourless in acidic/neutral solutions and turns pink in basic solutions.",
      },
      {
        question: "Which of the following is an olfactory indicator?",
        options: ["Litmus", "Methyl orange", "Onion", "Phenolphthalein"],
        correctAnswer: 2,
        explanation:
          "Olfactory indicators change their smell in acids/bases — onion, vanilla essence and clove oil are examples.",
      },
      {
        question: "The gas evolved when a dilute acid reacts with a metal is confirmed by:",
        options: [
          "Turning lime water milky",
          "A 'pop' sound with a burning candle",
          "A pungent smell",
          "Turning starch blue",
        ],
        correctAnswer: 1,
        explanation:
          "Acids + metals give hydrogen gas, which burns with a characteristic 'pop' sound.",
      },
      {
        question: "When an acid reacts with a metal carbonate, the gas released turns lime water:",
        options: ["Blue", "Milky", "Yellow", "Pink"],
        correctAnswer: 1,
        explanation:
          "CO₂ is released, which turns lime water milky due to the formation of insoluble calcium carbonate.",
      },
      {
        question: "Which oxides are amphoteric (react with both acids and bases)?",
        options: ["Na₂O and CaO", "CO₂ and SO₂", "ZnO and Al₂O₃", "CuO and MgO"],
        correctAnswer: 2,
        explanation:
          "ZnO and Al₂O₃ are amphoteric oxides — they behave as bases with acids and as acids with bases.",
      },
      {
        question: "A solution has a pH of 2. It is:",
        options: ["Strongly basic", "Weakly basic", "Neutral", "Strongly acidic"],
        correctAnswer: 3,
        explanation: "A pH well below 7 (like 2) means a high H⁺ concentration — a strongly acidic solution.",
      },
      {
        question: "Tooth decay begins when the pH of the mouth falls below:",
        options: ["7.0", "6.5", "5.5", "4.0"],
        correctAnswer: 2,
        explanation:
          "Below pH 5.5 the acids produced by bacteria start dissolving the tooth enamel, causing decay.",
      },
      {
        question: "The chemical name of baking soda is:",
        options: [
          "Sodium carbonate",
          "Sodium hydrogencarbonate",
          "Sodium hydroxide",
          "Calcium carbonate",
        ],
        correctAnswer: 1,
        explanation: "Baking soda is sodium hydrogencarbonate (NaHCO₃).",
      },
      {
        question: "Plaster of Paris is obtained by heating gypsum at about:",
        options: ["100 K", "373 K", "573 K", "1000 K"],
        correctAnswer: 1,
        explanation:
          "Gypsum (CaSO₄·2H₂O) is heated to ~373 K to form Plaster of Paris (CaSO₄·½H₂O). Higher temperatures give anhydrous CaSO₄.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "What is an indicator?",
        answer:
          "An indicator is a substance that gives a visible signal (usually a colour or smell change) in the presence of an acid or a base.",
      },
      {
        marks: 1,
        question: "What does the 'p' and 'H' in pH stand for?",
        answer:
          "'p' stands for potenz (meaning power) and 'H' stands for hydrogen — so pH is the 'power of hydrogen', a measure of the H⁺ ion concentration of a solution.",
      },
      {
        marks: 2,
        question: "Define an acid and a base according to the Arrhenius theory, with one example each.",
        answer:
          "According to Arrhenius, an **acid** is a substance that dissociates in water to give H⁺ (H₃O⁺) ions, e.g. HCl → H⁺ + Cl⁻. A **base** is a substance that dissociates in water to give OH⁻ ions, e.g. NaOH → Na⁺ + OH⁻.",
      },
      {
        marks: 2,
        question:
          "Why does dilute hydrochloric acid produce hydrogen gas with zinc, but dilute nitric acid usually does not?",
        answer:
          "Zn + 2HCl → ZnCl₂ + H₂↑, so HCl gives hydrogen. Nitric acid (HNO₃) is a strong **oxidising agent**; it oxidises the hydrogen produced to water, so hydrogen gas is normally not evolved with HNO₃.",
      },
      {
        marks: 2,
        question: "How does the pH of a solution change as its acidity increases? Relate this to H⁺ ion concentration.",
        answer:
          "As acidity increases, the pH value **decreases** (moves toward 0). This is because a more acidic solution has a **higher concentration of H⁺ ions**. Conversely, a more basic solution has a higher pH and a lower H⁺ concentration.",
      },
      {
        marks: 3,
        question:
          "State what happens (with a balanced equation) when: (a) an acid reacts with a metal carbonate; (b) an acid reacts with a metal oxide; (c) a base reacts with a non-metal oxide.",
        answer:
          "(a) Salt + carbon dioxide + water are formed: Na₂CO₃ + 2HCl → 2NaCl + CO₂ + H₂O.\n(b) A metal oxide (basic) is neutralised to give salt + water: CuO + 2HCl → CuCl₂ + H₂O.\n(c) A non-metal oxide (acidic) is neutralised by the base: 2NaOH + CO₂ → Na₂CO₃ + H₂O.",
      },
      {
        marks: 3,
        question:
          "Explain three ways in which pH is important in everyday life.",
        answer:
          "1. **Digestion:** the stomach makes HCl; excess acid causes acidity and is neutralised by antacids (mild bases like milk of magnesia).\n2. **Tooth decay:** it begins when mouth pH falls below 5.5; basic toothpaste neutralises the acid and protects enamel.\n3. **Soil / plants:** plants grow best at a particular pH; acidic soil is treated with lime (CaO/Ca(OH)₂). (Also: self-defence — a bee sting injects formic acid, neutralised by baking soda.)",
      },
      {
        marks: 3,
        question:
          "What is bleaching powder? Write the equation for its preparation and state two of its uses.",
        answer:
          "Bleaching powder is calcium oxychloride (CaOCl₂), a pale-yellow powder with a strong smell of chlorine.\nPreparation: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O.\nUses: (i) bleaching cotton, linen and wood pulp; (ii) disinfecting drinking water; (iii) as an oxidising agent in industries.",
      },
      {
        marks: 5,
        question:
          "(a) What is the chlor-alkali process? Write its balanced equation and name the products formed at each electrode. (b) List two important uses of caustic soda.",
        answer:
          "(a) The **chlor-alkali process** is the electrolysis of concentrated aqueous sodium chloride (brine) to manufacture sodium hydroxide.\n2NaCl(aq) + 2H₂O(l) →[electricity] 2NaOH(aq) + Cl₂(g) + H₂(g).\nProducts: **chlorine (Cl₂)** at the anode, **hydrogen (H₂)** at the cathode, and **sodium hydroxide (NaOH)** in the solution near the cathode.\n(b) Caustic soda is used to make **soap and detergents**, **paper and artificial fibres**, and to de-grease metals.",
      },
      {
        marks: 5,
        question:
          "Write the chemical name, formula, one method of preparation and one use of: (a) baking soda, (b) washing soda, (c) Plaster of Paris.",
        answer:
          "(a) **Baking soda** — sodium hydrogencarbonate, NaHCO₃. Prepared by NaCl + H₂O + CO₂ + NH₃ → NaHCO₃ + NH₄Cl. Used in baking (baking powder) and as an antacid.\n(b) **Washing soda** — sodium carbonate decahydrate, Na₂CO₃·10H₂O. Obtained by recrystallising sodium carbonate with water. Used to soften hard water and to make glass, soap and paper.\n(c) **Plaster of Paris** — calcium sulphate hemihydrate, CaSO₄·½H₂O. Prepared by heating gypsum at ~373 K: CaSO₄·2H₂O →[373 K] CaSO₄·½H₂O + 1½H₂O. Used to support fractured bones and make casts and decorative items.",
      },
    ],
  },
  // ================================================================
  // CHAPTER 3 — METALS AND NON-METALS
  // ================================================================
  {
    id: "metals-and-non-metals",
    number: 3,
    title: "Metals and Non-metals",
    subtitle: "Why metals shine, why some react and some don't, and how we get them out of the ground",
    description:
      "Physical and chemical properties that separate metals from non-metals, the reactivity series, ionic bonding, the extraction of metals from ores, and corrosion and its prevention.",
    icon: "🔩",
    color: "viridian",
    readingTime: "27 min read",
    videos: [
      {
        title: "Metals and Non-metals — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/5MDgY1Y0PBA",
      },
      {
        title: "Metals and Non-metals — Animated One Shot",
        channel: "One-shot (Animated)",
        url: "https://www.youtube.com/embed/kfLxlheYVQQ",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/T7VWk9nD5C8",
      },
    ],
    notes: `
# Metals and Non-metals

## Introduction

Out of about 118 known elements, most are **metals**, a smaller number are **non-metals**, and a handful of elements (called **metalloids**) show properties of both — e.g. boron, silicon, germanium, arsenic, antimony, tellurium.

## Physical Properties of Metals

1. **Metallic lustre** — metals have a shine on their freshly cut surface.
2. **Malleability** — can be beaten into thin sheets (gold and silver are the most malleable).
3. **Ductility** — can be drawn into thin wires (gold is the most ductile).
4. **Good conductors** of heat and electricity (silver and copper are the best conductors).
5. **Sonorous** — produce a ringing sound when struck (used for making bells).
6. **High melting and boiling points** (usually), and high density.
7. Solid at room temperature, **except mercury (Hg)**, which is liquid.

> [!note] **Exceptions to note:** Sodium and potassium are soft metals that can be cut with a knife and have low melting points. Mercury is a liquid metal. Lead and mercury are poor conductors compared to other metals.

## Physical Properties of Non-metals

1. **No lustre** (except iodine, which is lustrous, and graphite, which is shiny).
2. **Not malleable or ductile** — non-metallic solids are brittle and break into pieces when hammered.
3. **Poor conductors** of heat and electricity (except graphite, which conducts electricity).
4. Low melting and boiling points (usually), and low density.
5. May be solids, liquids or gases at room temperature — e.g. carbon, sulphur, phosphorus (solids); bromine (liquid); oxygen, nitrogen, chlorine (gases).

| Property | Metals | Non-metals |
|---|---|---|
| Lustre | Shiny | Dull (except iodine) |
| Malleability / Ductility | Malleable and ductile | Brittle |
| Conduction | Good conductors | Poor conductors (except graphite) |
| Sonority | Sonorous | Not sonorous |
| Density, melting point | Generally high | Generally low |
| State at room temperature | Usually solid (Hg is liquid) | Solid, liquid or gas |

## Chemical Properties of Metals

### 1. Reaction with Oxygen — Metal Oxides
Most metals combine with oxygen to form **metal oxides**, which are usually **basic** in nature (a few, like aluminium oxide and zinc oxide, are **amphoteric**).

4Na + O₂ → 2Na₂O ; 2Mg + O₂ → 2MgO ; 4Al + 3O₂ → 2Al₂O₃

- **Sodium and potassium** react so vigorously with oxygen at room temperature that they are kept immersed in **kerosene oil** to prevent accidental fires.
- **Magnesium** burns in air with a dazzling white flame.
- **Iron** does not burn in air, but rusts slowly (iron filings burn only when sprinkled in a flame).
- **Copper** does not burn but the shining brown surface turns black as copper(II) oxide forms: 2Cu + O₂ →[Δ] 2CuO.
- **Gold, silver and platinum** are the most unreactive metals and do not react with oxygen even at high temperatures — a reason they occur free (native) in nature.

**Amphoteric oxides:** Al₂O₃ and ZnO react with both acids and bases.
- Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O
- Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O

Most metal oxides are insoluble in water, but a few dissolve to form **alkalis**: Na₂O + H₂O → 2NaOH ; K₂O + H₂O → 2KOH.

### 2. Reaction with Water
Metals react with water (differently, depending on reactivity) to give a metal oxide/hydroxide and hydrogen gas.

| Metal | Reaction with water |
|---|---|
| K, Na | React violently with cold water; the reaction is so exothermic that the evolved hydrogen catches fire. 2K + 2H₂O → 2KOH + H₂ + heat |
| Ca | Reacts with cold water, but less violently — floats because the H₂ bubbles cling to its surface. Ca + 2H₂O → Ca(OH)₂ + H₂ |
| Mg | Reacts very slowly with cold water; reacts with hot water. Mg + 2H₂O → Mg(OH)₂ + H₂ |
| Al, Zn, Fe | Do not react with cold or hot water, but react with **steam** to give the metal oxide. 2Al + 3H₂O(steam) → Al₂O₃ + 3H₂ |
| Pb, Cu, Ag, Au | Do not react with water at all |

### 3. Reaction with Dilute Acids
Metals react with dilute acids to give a **salt and hydrogen gas**.
- Mg + 2HCl → MgCl₂ + H₂↑
- Zn + H₂SO₄ → ZnSO₄ + H₂↑

**Copper, silver and gold** do not react with dilute HCl or H₂SO₄ since they lie below hydrogen in the reactivity series.

> [!note] Metals do not usually liberate hydrogen with **nitric acid** because HNO₃ is a strong oxidising agent that oxidises the H₂ formed to water (except very dilute HNO₃ with Mg and Mn).

### 4. Reaction with Solutions of Other Metal Salts (Displacement Reaction)
A **more reactive metal displaces a less reactive metal** from its salt solution.
- Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)
- Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)
- Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s) — this happens because Cu lies above Ag in the reactivity series

::diagram:reactivity-series

## The Reactivity Series

The reactivity series arranges metals in **decreasing order of reactivity**:

> [!key] K > Na > Ca > Mg > Al > Zn > Fe > Pb > **(H)** > Cu > Hg > Ag > Au

*(Mnemonic: "**P**lease **S**end **C**ats, **M**onkeys **A**nd **Z**ebras **I**n **L**arge **H**erds, **C**arry **M**ore **S**ilver, **G**old.")*

## How Do Metals and Non-metals React? — Ionic Bonds

Atoms react to attain a **stable (noble gas) electronic configuration**, usually a complete octet.

- **Metals** have 1, 2 or 3 electrons in the outermost shell and tend to **lose electrons** to form **positively charged cations**.
- **Non-metals** have 4 to 8 (often 5, 6, 7) electrons in the outermost shell and tend to **gain electrons** to form **negatively charged anions**.

When a metal reacts with a non-metal, electrons are **transferred** from the metal atom to the non-metal atom. The oppositely charged ions formed are held together by strong electrostatic forces of attraction — this is called an **ionic bond** (or electrovalent bond), and the resulting compound is an **ionic compound**.

**Example: Formation of NaCl**
- Na (2, 8, 1) loses 1 electron → Na⁺ (2, 8), a stable configuration.
- Cl (2, 8, 7) gains 1 electron → Cl⁻ (2, 8, 8), a stable configuration.
- Na⁺ and Cl⁻ ions are held together by strong electrostatic forces of attraction to form NaCl.

**Example: Formation of MgCl₂**
- Mg (2, 8, 2) loses 2 electrons → Mg²⁺.
- Each Cl (2, 8, 7) gains 1 electron → Cl⁻. Two chlorine atoms are needed to accept the two electrons lost by magnesium.

::diagram:ionic-covalent-formation

### Properties of Ionic Compounds
1. **Physical nature** — solid and generally hard and brittle (due to strong forces of attraction between ions).
2. **Melting and boiling points** — high, because a considerable amount of energy is required to break the strong inter-ionic attraction.
3. **Solubility** — generally soluble in water, insoluble in solvents like kerosene and petrol.
4. **Conduction of electricity** — ionic compounds conduct electricity in the **molten state or in aqueous solution** (the ions become free to move), but **not in the solid state** (the ions are held in a rigid lattice and cannot move).

::diagram:nacl-lattice

## Occurrence of Metals

A naturally occurring substance in which a metal or its compound is found is called a **mineral**. Minerals from which a metal can be profitably extracted are called **ores**.

- **Reactive metals (K, Na, Ca, Mg, Al)** — found in the earth's crust mostly as **compounds** (oxides, carbonates, sulphides, etc.), since they are too reactive to occur free.
- **Moderately reactive metals (Zn, Fe, Pb, Cu)** — found mainly as **sulphides or carbonates**.
- **Least reactive metals (Au, Ag, Pt)** — often found in the **free (native) state**, since they do not react easily with moisture, oxygen, carbon dioxide, etc., in the atmosphere.

## Extraction of Metals

The process of extracting a metal from its ore is called **metallurgy**. The steps depend on the metal's position in the reactivity series.

::diagram:activity-series-extraction

### 1. Enrichment of Ore
The ore is first crushed and powdered (**pulverisation**), and the impurities (gangue) are removed — e.g. by **hydraulic washing** (differential gravity) or **froth flotation** (for sulphide ores, using the differing wettability of ore and gangue by oil and water).

### 2. Extracting Metals Low in the Reactivity Series
Metals like **Hg and Ag** are very unreactive; their oxides can be reduced to the metal by heating alone.
- 2HgS + 3O₂ →[Δ] 2HgO + 2SO₂
- 2HgO →[Δ] 2Hg + O₂

### 3. Extracting Metals in the Middle of the Reactivity Series
Metals like **Fe, Zn, Pb and Cu** are moderately reactive and are usually found as **sulphides or carbonates**. It is easier to obtain a metal from its **oxide**, so before reduction the ore is converted into the metal oxide:

- **Roasting** — heating a **sulphide ore** strongly in the presence of excess air (converts sulphide to oxide). 2ZnS + 3O₂ →[Δ] 2ZnO + 2SO₂
- **Calcination** — heating a **carbonate ore** strongly in the absence (or limited supply) of air (converts carbonate to oxide). ZnCO₃ →[Δ] ZnO + CO₂

The metal oxide is then **reduced** to the metal, usually using carbon:
- ZnO + C → Zn + CO

If a more reactive metal is used to displace a less reactive one from its compound, the reaction is highly exothermic — a **thermit reaction**:
- Fe₂O₃ + 2Al → 2Fe + Al₂O₃ + Heat *(used to join railway tracks or cracked machine parts)*

### 4. Extracting Metals Towards the Top of the Reactivity Series
Highly reactive metals — **K, Na, Ca, Mg and Al** — cannot be obtained by reduction with carbon (carbon cannot displace them). They are obtained by the **electrolytic reduction** of their molten ores (**electrolytic reduction**).
- At the cathode: metal ions gain electrons to form the metal atom (reduction).
- At the anode: e.g. molten NaCl → Na⁺ + Cl⁻; at cathode Na⁺ + e⁻ → Na; at anode 2Cl⁻ → Cl₂ + 2e⁻.

### Refining of Metals
Metals produced by extraction are generally not very pure, and are purified by **electrolytic refining**.
- The impure metal is made the **anode**, a strip of pure metal the **cathode**, and a solution of the metal's salt the electrolyte.
- On passing current, the impure metal dissolves at the anode and pure metal deposits on the cathode. Soluble impurities go into solution and insoluble impurities settle at the bottom as **anode mud**.

::diagram:electrolytic-refining

## Corrosion

When a metal is attacked by substances around it — such as moisture, acids and gases in the air — it is slowly eaten away. This is called **corrosion**.
- **Iron** corrodes to form **rust** (hydrated iron(III) oxide, Fe₂O₃·xH₂O).
- **Silver** develops a black coating of **silver sulphide** on exposure to air containing sulphur.
- **Copper** develops a green coating of **basic copper carbonate** when exposed to moist air.

**Prevention:** painting, oiling, greasing, galvanisation (coating iron with zinc), tin plating, chrome plating, and making alloys.

## Alloys

A homogeneous mixture of two or more metals (or a metal and a non-metal), that cannot be separated into its components by physical methods, is called an **alloy**. Alloys are made to improve properties such as hardness, resistance to corrosion, or to lower the melting point.

| Alloy | Composition | Property gained |
|---|---|---|
| Brass | Copper + Zinc | Harder than copper, resists corrosion |
| Bronze | Copper + Tin | Harder, used for statues and utensils |
| Stainless steel | Iron + Carbon + Chromium + Nickel | Resists rusting |
| Solder | Lead + Tin | Low melting point — used for welding electrical wires |
| Amalgam | Any alloy containing mercury | — |

> [!key] If one of the metals in the alloy is mercury, the alloy is known as an **amalgam**.
    `,
    experiments: [
      {
        id: "iron-copper-sulphate",
        title: "Reaction of Iron Nails with Copper Sulphate Solution",
        activityRef: "NCERT Activity 3.10",
        aim: "To show that iron is more reactive than copper (a displacement reaction).",
        materials: ["Two iron nails", "Copper sulphate solution", "Two test tubes", "Thread"],
        procedure: [
          "Take two clean iron nails and tie them with a thread.",
          "Set up two test tubes — A with copper sulphate solution and B with water (control).",
          "Suspend an iron nail in each and leave for 20 minutes; compare with a fresh iron nail.",
        ],
        observation:
          "The nail in the copper sulphate solution gets coated with a reddish-brown deposit of copper, and the blue colour of the solution fades.",
        reaction: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
        conclusion:
          "Iron displaces copper from copper sulphate solution because iron is more reactive than copper. This is a displacement reaction.",
        visual: {
          figure: "iron-cuso4",
          before: "hsl(210 70% 55%)",
          after: "hsl(120 20% 85%)",
          solid: { name: "Iron nail", colourBefore: "hsl(210 8% 55%)", colourAfter: "hsl(20 55% 40%)" },
          labels: { before: "Blue copper sulphate solution", after: "Fades; nail turns copper-coloured" },
        },
      },
      {
        id: "metal-reactivity-comparison",
        title: "Comparing the Reactivity of Metals with Water and Dilute Acids",
        activityRef: "NCERT Activity 3.6 & 3.7",
        aim: "To arrange metals — Mg, Al, Zn, Fe, Cu — in order of their reactivity with water and dilute acids.",
        materials: ["Samples of Mg, Al, Zn, Fe, Cu", "Test tubes", "Dilute HCl", "Water/steam apparatus"],
        procedure: [
          "Place a small piece of each metal in a separate test tube of water; note which react.",
          "Repeat with dilute hydrochloric acid in fresh test tubes.",
          "Note the vigour of the reaction (rate of bubbling) for each metal.",
        ],
        observation:
          "Magnesium reacts fastest with dilute acid, evolving hydrogen rapidly; aluminium, zinc and iron react at decreasing rates; copper does not react at all.",
        reaction: "Mg + 2HCl → MgCl₂ + H₂↑ (fastest); Cu + HCl → no reaction",
        conclusion:
          "The order of reactivity observed is Mg > Al > Zn > Fe > Cu, consistent with the reactivity (activity) series.",
        visual: {
          figure: "metal-acid-series",
          before: "hsl(40 30% 96%)",
          after: "hsl(40 30% 96%)",
          gas: "Hydrogen",
          labels: { before: "Metals in dilute acid", after: "Mg bubbles fastest, Cu does not react" },
        },
      },
      {
        id: "ionic-bond-formation",
        title: "Formation of an Ionic Compound (Sodium and Chlorine)",
        aim: "To understand how electron transfer between a metal and a non-metal forms an ionic bond.",
        materials: ["Electronic configuration charts of Na and Cl", "Model/diagram of electron transfer"],
        procedure: [
          "Write the electronic configuration of sodium (2, 8, 1) and chlorine (2, 8, 7).",
          "Show sodium losing one electron from its outer shell.",
          "Show chlorine gaining that electron to complete its octet.",
        ],
        observation:
          "Sodium becomes a stable Na⁺ ion (2, 8) and chlorine becomes a stable Cl⁻ ion (2, 8, 8); both now have a full outer shell.",
        reaction: "Na → Na⁺ + e⁻ ; Cl + e⁻ → Cl⁻ ; Na⁺ + Cl⁻ → NaCl",
        conclusion:
          "The oppositely charged Na⁺ and Cl⁻ ions attract each other electrostatically, forming the ionic compound sodium chloride.",
        visual: {
          figure: "nacl-ionic-bond",
          before: "hsl(40 30% 96%)",
          labels: { before: "Neutral Na and Cl atoms", after: "Na⁺ and Cl⁻ ions held by an ionic bond" },
        },
      },
      {
        id: "sodium-in-kerosene",
        title: "Storing Sodium and Potassium in Kerosene",
        aim: "To understand why sodium and potassium are stored under kerosene oil.",
        materials: ["A small piece of sodium metal (teacher demonstration)", "Kerosene oil", "A knife"],
        procedure: [
          "Observe a piece of sodium metal stored in kerosene — it is cut with a knife to expose a shiny surface.",
          "Note how quickly the freshly cut, shiny surface tarnishes when briefly exposed to air.",
          "Note that sodium is never touched with bare hands or exposed to water.",
        ],
        observation:
          "Freshly cut sodium is soft and shiny but tarnishes (turns dull) within seconds of exposure to air, as it reacts with oxygen and moisture.",
        reaction: "4Na + O₂ → 2Na₂O ; Na₂O + H₂O → 2NaOH",
        conclusion:
          "Sodium and potassium react so vigorously with the oxygen and moisture in air (and violently with water) that they must be stored immersed in kerosene oil to prevent accidental fires.",
        safety: "Never handle sodium/potassium metal with bare hands or bring it near water — the reaction can be violent and cause fire.",
        visual: {
          figure: "sodium-kerosene",
          before: "hsl(210 8% 78%)",
          after: "hsl(40 8% 55%)",
          thermal: "exothermic",
          labels: { before: "Freshly cut, shiny sodium", after: "Surface dulls rapidly in air" },
        },
      },
      {
        id: "thermit-reaction",
        title: "The Thermit Reaction",
        aim: "To observe a highly exothermic displacement reaction used to join railway tracks.",
        materials: ["Iron(III) oxide powder (Fe₂O₃)", "Aluminium powder", "A magnesium ribbon fuse", "A heat-proof tray (demonstration only)"],
        procedure: [
          "Mix iron(III) oxide powder and aluminium powder in the correct ratio (teacher demonstration, done with full safety precautions).",
          "Ignite the mixture using a burning magnesium ribbon as a fuse.",
          "Observe the reaction from a safe distance.",
        ],
        observation:
          "The reaction is extremely exothermic, releasing enough heat to produce molten iron along with a shower of sparks.",
        reaction: "Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s) + Heat",
        conclusion:
          "Aluminium, being more reactive than iron, displaces it from Fe₂O₃ in a highly exothermic displacement reaction. The molten iron produced is used industrially to join railway tracks or cracked machine parts.",
        safety: "This is a high-temperature demonstration only performed by a trained teacher with full safety equipment — never attempt it yourself.",
        visual: {
          figure: "thermit",
          before: "hsl(20 20% 40%)",
          after: "hsl(20 90% 55%)",
          thermal: "exothermic",
          flame: true,
          labels: { before: "Fe₂O₃ and Al powder mixture", after: "Molten iron and sparks" },
        },
      },
      {
        id: "electrolytic-refining-copper",
        title: "Electrolytic Refining of Copper",
        aim: "To demonstrate how impure copper is purified using electrolysis.",
        materials: [
          "Impure copper rod (anode)",
          "Pure copper strip (cathode)",
          "Copper sulphate solution (electrolyte)",
          "A battery/DC power source",
        ],
        procedure: [
          "Set up an electrolytic cell with an impure copper rod as the anode and a thin strip of pure copper as the cathode, in acidified copper sulphate solution.",
          "Pass a direct current through the cell for some time.",
          "Observe the electrodes after the current has flowed for a while.",
        ],
        observation:
          "The impure anode gradually becomes thinner/dissolves; pure copper deposits on the cathode; a mud-like insoluble residue (anode mud) collects below the anode.",
        reaction: "At anode: Cu → Cu²⁺ + 2e⁻ ; At cathode: Cu²⁺ + 2e⁻ → Cu",
        conclusion:
          "Impure copper dissolves at the anode and pure copper is deposited at the cathode; soluble impurities remain in solution and insoluble ones settle as anode mud. This is how metals like copper are refined to a high purity.",
        visual: {
          figure: "electrolytic-refining",
          before: "hsl(195 60% 60%)",
          after: "hsl(195 60% 60%)",
          labels: { before: "Impure Cu anode, pure Cu cathode", after: "Cu deposits on cathode; anode mud settles" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Which of the following properties is generally shown by non-metals?",
        options: ["Malleability", "Ductility", "Brittleness", "Sonority"],
        correctAnswer: 2,
        explanation:
          "Non-metallic solids are brittle — they break into pieces when hammered, unlike malleable and ductile metals.",
      },
      {
        question: "Sodium and potassium are stored in kerosene oil because:",
        options: [
          "They are very heavy",
          "They react vigorously with air and water",
          "They dissolve in kerosene",
          "They are radioactive",
        ],
        correctAnswer: 1,
        explanation:
          "Na and K react so vigorously with the oxygen and moisture in air (and violently with water) that storing them under kerosene prevents contact and accidental fires.",
      },
      {
        question: "Which gas is evolved when a metal reacts with a dilute acid?",
        options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
        correctAnswer: 2,
        explanation: "Metal + dilute acid → salt + hydrogen gas, e.g. Zn + H₂SO₄ → ZnSO₄ + H₂↑.",
      },
      {
        question: "In the formation of NaCl, sodium:",
        options: ["Gains one electron", "Loses one electron", "Gains two electrons", "Shares one electron"],
        correctAnswer: 1,
        explanation:
          "Sodium (2, 8, 1) loses its single outer electron to become the stable Na⁺ ion (2, 8), which is then attracted to Cl⁻.",
      },
      {
        question: "Ionic compounds conduct electricity when:",
        options: [
          "In the solid state only",
          "Never",
          "In the molten state or dissolved in water",
          "Only when heated below the melting point",
        ],
        correctAnswer: 2,
        explanation:
          "Ions are locked in a rigid lattice in the solid state and cannot move, but become free to move (and so conduct) in the molten state or in aqueous solution.",
      },
      {
        question: "Roasting is the process of:",
        options: [
          "Heating a carbonate ore in absence of air",
          "Heating a sulphide ore strongly in excess of air",
          "Crushing the ore into powder",
          "Purifying a metal by electrolysis",
        ],
        correctAnswer: 1,
        explanation: "Roasting converts a sulphide ore into the metal oxide by heating it strongly in the presence of excess air.",
      },
      {
        question: "Highly reactive metals like sodium and calcium are extracted from their molten ores by:",
        options: ["Heating with carbon", "Roasting", "Electrolytic reduction", "Calcination"],
        correctAnswer: 2,
        explanation:
          "Metals high in the reactivity series (K, Na, Ca, Mg, Al) cannot be reduced by carbon; they are obtained by electrolytic reduction of their molten ores/compounds.",
      },
      {
        question: "The green coating that forms on copper articles exposed to moist air is:",
        options: ["Copper oxide", "Basic copper carbonate", "Copper sulphide", "Copper chloride"],
        correctAnswer: 1,
        explanation:
          "Copper reacts with moist carbon dioxide in air to form a green coating of basic copper carbonate.",
      },
      {
        question: "Brass is an alloy of:",
        options: ["Copper and tin", "Copper and zinc", "Lead and tin", "Iron and carbon"],
        correctAnswer: 1,
        explanation: "Brass is an alloy of copper and zinc — it is harder than pure copper and resists corrosion better.",
      },
      {
        question: "Which pair of metal oxides is amphoteric?",
        options: ["Na₂O and K₂O", "CuO and FeO", "Al₂O₃ and ZnO", "MgO and CaO"],
        correctAnswer: 2,
        explanation: "Al₂O₃ and ZnO react with both acids and bases, so they are classified as amphoteric oxides.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Name two metals that are found in nature in the free (native) state.",
        answer: "Gold and silver (also platinum) are usually found in the free state, since they are very unreactive.",
      },
      {
        marks: 1,
        question: "What is an amalgam?",
        answer: "An amalgam is an alloy in which one of the metals is mercury, e.g. dental amalgam (silver-mercury alloy).",
      },
      {
        marks: 2,
        question: "Why does copper not react with dilute hydrochloric acid, while zinc does?",
        answer:
          "Zinc is more reactive than hydrogen and lies above it in the reactivity series, so it can displace hydrogen from dilute HCl: Zn + 2HCl → ZnCl₂ + H₂↑. Copper lies below hydrogen in the reactivity series, so it cannot displace hydrogen and does not react with dilute HCl.",
      },
      {
        marks: 2,
        question: "Define an ionic (electrovalent) bond with one example.",
        answer:
          "An ionic bond is the strong electrostatic force of attraction between oppositely charged ions, formed when one atom (usually a metal) transfers electrons to another atom (usually a non-metal). Example: in NaCl, Na loses one electron to become Na⁺ and Cl gains that electron to become Cl⁻; Na⁺ and Cl⁻ are held together by an ionic bond.",
      },
      {
        marks: 2,
        question: "What is the difference between roasting and calcination?",
        answer:
          "**Roasting** is heating a sulphide ore strongly in the presence of excess air to convert it into the metal oxide (2ZnS + 3O₂ → 2ZnO + 2SO₂). **Calcination** is heating a carbonate ore strongly in the absence (or limited supply) of air to convert it into the metal oxide (ZnCO₃ → ZnO + CO₂).",
      },
      {
        marks: 3,
        question: "List three physical properties that distinguish metals from non-metals, with one example each.",
        answer:
          "1. **Malleability** — metals can be beaten into thin sheets (e.g. gold foil); non-metals are brittle.\n2. **Conductivity** — metals are good conductors of heat and electricity (e.g. copper wires); non-metals are generally poor conductors (except graphite).\n3. **Lustre** — metals have a shine on a freshly cut surface (e.g. sodium); most non-metals are dull (except iodine).",
      },
      {
        marks: 3,
        question:
          "Explain why sodium chloride conducts electricity in the molten state and in aqueous solution, but not in the solid state.",
        answer:
          "In solid sodium chloride, the Na⁺ and Cl⁻ ions are locked in a rigid crystal lattice held together by strong electrostatic forces, so they cannot move and cannot carry charge. When NaCl is melted or dissolved in water, the ions become free to move, and this movement of charged ions allows the substance to conduct electricity.",
      },
      {
        marks: 3,
        question: "What is galvanisation? Why is it used to protect iron objects?",
        answer:
          "Galvanisation is the process of coating iron (or steel) objects with a thin layer of zinc. Even if the zinc coating gets scratched, zinc (being more reactive than iron) corrodes preferentially and protects the iron underneath from rusting — this is called sacrificial protection.",
      },
      {
        marks: 5,
        question:
          "Describe the steps involved in the extraction of a metal (like zinc) that is moderately reactive and found as a sulphide ore.",
        answer:
          "1. **Concentration/enrichment** of the ore — removing gangue by methods like froth flotation.\n2. **Roasting** — heating the sulphide ore strongly in excess air to convert it to the oxide: 2ZnS + 3O₂ → 2ZnO + 2SO₂.\n3. **Reduction** — the metal oxide is reduced to the metal using carbon: ZnO + C → Zn + CO.\n4. **Refining** — the impure metal is purified, usually by electrolytic refining, where the impure metal is the anode and a strip of pure metal the cathode in a solution of the metal's salt.",
      },
      {
        marks: 5,
        question:
          "(a) Explain, with the help of electronic configurations, how MgCl₂ is formed. (b) List three properties of ionic compounds.",
        answer:
          "(a) Magnesium (2, 8, 2) loses its 2 outer electrons to form Mg²⁺ (2, 8), a stable configuration. Two chlorine atoms (2, 8, 7 each) each gain one electron to form two Cl⁻ ions (2, 8, 8). The Mg²⁺ ion and two Cl⁻ ions attract each other electrostatically to form MgCl₂.\n(b) Ionic compounds: (i) are solids that are generally hard and brittle; (ii) have high melting and boiling points because of the strong inter-ionic forces; (iii) are usually soluble in water but insoluble in solvents like kerosene, and conduct electricity only in the molten state or in solution.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 4 — CARBON AND ITS COMPOUNDS
  // ================================================================
  {
    id: "carbon-and-its-compounds",
    number: 4,
    title: "Carbon and Its Compounds",
    subtitle: "How one element builds millions of compounds — from methane to soap",
    description:
      "Covalent bonding and the versatile nature of carbon, catenation, homologous series and functional groups, nomenclature, chemical properties like combustion and oxidation, and everyday chemistry of ethanol, ethanoic acid, soaps and detergents.",
    icon: "🧪",
    color: "saffron",
    readingTime: "30 min read",
    videos: [
      {
        title: "Carbon and Its Compounds — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/2mQhw6yKMdE",
      },
      {
        title: "Carbon and Its Compounds — Animated One Shot",
        channel: "One-shot (Animated)",
        url: "https://www.youtube.com/embed/Vv8KcSN0YlM",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/f7-CMMmvfSY",
      },
    ],
    notes: `
# Carbon and Its Compounds

## Introduction

All living structures are carbon-based, and the number of carbon compounds runs into millions — far more than compounds formed by all the other elements put together. This is because of two special properties of carbon: **catenation** and **tetravalency**.

## Covalent Bonding

Carbon has **4 electrons** in its outermost shell (electronic configuration 2, 4). To achieve a stable octet it would need to either gain or lose 4 electrons, both of which require too much energy. Instead, carbon **shares** its electrons with other atoms of carbon or of other elements, forming **covalent bonds**.

> [!key] A **covalent bond** is formed by the mutual sharing of electrons between two atoms, so that both atoms attain a stable, complete outer shell.

- **Single covalent bond** — one shared electron pair, e.g. H–H in H₂, or C–H bonds in CH₄.
- **Double covalent bond** — two shared electron pairs, e.g. O=O in O₂, or C=C in ethene.
- **Triple covalent bond** — three shared electron pairs, e.g. N≡N in N₂, or C≡C in ethyne.

**Examples:**
- **Hydrogen molecule (H₂):** each H atom has 1 electron; sharing a pair gives both a stable duplet.
- **Methane (CH₄):** carbon shares one electron with each of 4 hydrogen atoms, forming 4 single covalent bonds.
- **Carbon dioxide (CO₂):** carbon forms two double bonds with two oxygen atoms, O=C=O.

::diagram:carbon-covalent-bonds

### Properties of Covalent (Molecular) Compounds
1. Generally have **low melting and boiling points**, because the forces between molecules are weak.
2. Generally **poor conductors** of electricity, since there are no free ions or electrons to carry charge.
3. Many are **not soluble in water** but dissolve in organic solvents.

## Versatile Nature of Carbon

### Allotropes of Carbon
Carbon exists in several **allotropes** — different physical forms of the same element, in which the carbon atoms are bonded to one another in different ways.
- **Diamond** — each carbon atom is bonded to **four** others by strong single covalent bonds, giving a rigid three-dimensional network in which every atom sits at the centre of a tetrahedron. It is the hardest natural substance, has a very high melting point and does not conduct electricity, because there are no free electrons.
- **Graphite** — each carbon atom is bonded to **three** others in flat hexagonal layers. The layers are held together only by weak forces, so they slide over one another: graphite is soft and slippery (used in pencil 'leads' and as a lubricant). The fourth electron of every carbon atom is free to move along the layer, so graphite **conducts electricity**.
- **Fullerenes** — hollow, cage-like molecules of carbon. The first to be discovered, **C-60** (buckminsterfullerene), has 60 carbon atoms arranged in 20 hexagons and 12 pentagons like a football; it is named after the architect Buckminster Fuller, whose geodesic domes have a similar shape.

::diagram:carbon-allotropes

::diagram:diamond-structure

::diagram:graphite-structure

::diagram:fullerene-c60

### 1. Catenation
Carbon atoms can link with other carbon atoms through covalent bonds, forming **long chains, branched chains, or rings** of any length — this unique property is called **catenation**. Carbon–carbon bonds are very strong and stable, which is why so many carbon compounds are possible.

### 2. Tetravalency
Since carbon has a valency of **4**, it can form bonds with atoms of carbon or with atoms of other elements like hydrogen, oxygen, nitrogen, sulphur and chlorine, giving rise to compounds with widely different chemical properties.

### 3. Small Size
Carbon's small atomic size lets it form strong, stable bonds — an important reason for the stability of carbon compounds compared to those of other elements in the same group (like silicon).

## Saturated and Unsaturated Carbon Compounds

- **Saturated hydrocarbons (alkanes)** — carbon atoms are linked by **single bonds only**. General formula CₙH₂ₙ₊₂. e.g. methane (CH₄), ethane (C₂H₆).
- **Unsaturated hydrocarbons** — contain at least one **double or triple bond** between carbon atoms.
  - **Alkenes** (one C=C double bond) — general formula CₙH₂ₙ. e.g. ethene (C₂H₄).
  - **Alkynes** (one C≡C triple bond) — general formula CₙH₂ₙ₋₂. e.g. ethyne (C₂H₂).

## Chains, Branches and Rings

Carbon compounds may form:
- **Straight chain compounds** — e.g. n-butane.
- **Branched chain compounds** — e.g. iso-butane.
- **Cyclic (ring) compounds** — e.g. cyclohexane, benzene.

::diagram:benzene-structure

## Homologous Series

A **homologous series** is a family of compounds having the same general formula and similar chemical properties, in which each member differs from the next by a **–CH₂– unit** (a difference of 14 u in molecular mass).

**Example — the alkane series:** CH₄, C₂H₆, C₃H₈, C₄H₁₀ ...

**Properties of a homologous series:**
1. All members have the same general formula.
2. Each successive member differs from the previous by a CH₂ unit (14 u).
3. Members show a gradual change (gradation) in physical properties such as melting point, boiling point and solubility, as molecular mass increases.
4. All members show similar chemical properties, because they contain the same functional group.

## Functional Groups

A **functional group** is a specific atom or group of atoms attached to a carbon chain that gives a compound its characteristic chemical properties. When one or more hydrogen atoms in a hydrocarbon are replaced by a functional group, a new family of compounds is obtained.

| Functional group | Name | Example |
|---|---|---|
| –OH | Alcohol | Ethanol, C₂H₅OH |
| –CHO | Aldehyde | Ethanal, CH₃CHO |
| >C=O | Ketone | Propanone, CH₃COCH₃ |
| –COOH | Carboxylic acid | Ethanoic acid, CH₃COOH |
| –X (F, Cl, Br, I) | Halide | Chloromethane, CH₃Cl |
| –NH₂ | Amine | Methanamine, CH₃NH₂ |

## Nomenclature of Carbon Compounds

Naming a carbon compound follows this general scheme:
1. Identify the number of carbon atoms in the longest chain — this gives the **stem name** (meth-, eth-, prop-, but-, pent- ...).
2. Identify the presence of a functional group (or a double/triple bond) and modify the name using the appropriate **suffix**.

| Number of carbons | Stem | Alkane | Alkene | Alkyne |
|---|---|---|---|---|
| 1 | Meth | Methane | — | — |
| 2 | Eth | Ethane | Ethene | Ethyne |
| 3 | Prop | Propane | Propene | Propyne |
| 4 | But | Butane | Butene | Butyne |

| Functional group | Suffix | Example |
|---|---|---|
| –OH | -ol | Methanol (CH₃OH) |
| –CHO | -al | Ethanal (CH₃CHO) |
| >C=O | -one | Propanone (CH₃COCH₃) |
| –COOH | -oic acid | Ethanoic acid (CH₃COOH) |

## Chemical Properties of Carbon Compounds

### 1. Combustion
Carbon compounds burn in the presence of oxygen to give carbon dioxide, water and heat/light. Saturated hydrocarbons generally burn with a clean **blue flame**; unsaturated hydrocarbons and carbon-rich compounds burn with a **yellow, sooty flame**.

- CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) + heat + light
- C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O + heat + light

Coal and petroleum, largely made up of carbon compounds, are the two most important carbon fuels used at a domestic and industrial scale.

::diagram:combustion

### 2. Oxidation
Substances that can add oxygen to others are called **oxidising agents**. Alcohols can be oxidised to carboxylic acids by oxidising agents like **alkaline potassium permanganate (KMnO₄)** or **acidified potassium dichromate (K₂Cr₂O₇)**.

CH₃CH₂OH + 2[O] →[alkaline KMnO₄] CH₃COOH + H₂O

### 3. Addition Reaction
Unsaturated hydrocarbons add hydrogen in the presence of catalysts (Ni or Pd) to give saturated hydrocarbons. This process is called **hydrogenation**, and is used to convert vegetable oils (unsaturated) into vegetable ghee (saturated fats).

CH₂=CH₂ + H₂ →[Ni] CH₃–CH₃

### 4. Substitution Reaction
Saturated hydrocarbons are fairly unreactive and generally inert in the presence of most reagents, but in the presence of sunlight, chlorine can substitute hydrogen atoms one by one in a **substitution reaction**.

CH₄ + Cl₂ →[sunlight] CH₃Cl + HCl

## Some Important Carbon Compounds

### Ethanol (C₂H₅OH)
Commonly called alcohol; it is a colourless liquid.
- **Properties:** ethanol reacts with sodium metal to liberate hydrogen: 2Na + 2CH₃CH₂OH → 2CH₃CH₂ONa + H₂↑. It also reacts with hot concentrated sulphuric acid to be dehydrated to ethene: CH₃CH₂OH →[conc. H₂SO₄, 443 K] CH₂=CH₂ + H₂O.
- **Uses:** solvent, in medicines like cough syrups and tonics, in the alcoholic beverage industry.
- **Effect of misuse:** consuming even small quantities of ethanol daily can lead to a slow poisoning process, harming the liver and nervous system.
- **Denatured alcohol:** ethanol meant for industrial use has poisonous substances (like methanol) mixed into it to make it unfit for drinking; this is called denatured alcohol.

> [!warning] **Methanol** is dangerous — if consumed, it is oxidised to methanal (formaldehyde) in the liver, which reacts rapidly with the cells of the body, causing the protoplasm to coagulate; this can cause blindness and even death.

### Ethanoic Acid (Acetic Acid, CH₃COOH)
- Commonly called acetic acid; a 5–8% solution of acetic acid in water is called **vinegar**, used widely as a preservative.
- Melting point 290 K — often freezes in cold climates, hence it is also called **glacial acetic acid**.

**Properties:**
1. **Esterification** — ethanoic acid reacts with alcohols in the presence of an acid catalyst (conc. H₂SO₄) to form a sweet-smelling **ester**. CH₃COOH + C₂H₅OH →[conc. H₂SO₄] CH₃COOC₂H₅ + H₂O. Esters react with sodium hydroxide (in the reverse reaction, called **saponification**) to give back the alcohol and the sodium salt of the acid — this reaction is used to make soap.
2. **Reaction with a base** — CH₃COOH + NaOH → CH₃COONa + H₂O.
3. **Reaction with carbonates and hydrogencarbonates** — brisk effervescence of CO₂ is produced. 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂↑ ; CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑.

::diagram:esterification

## Soaps and Detergents

**Soaps** are sodium or potassium salts of long-chain carboxylic acids (fatty acids), made by **saponification** — heating a fat/oil with an alkali (NaOH). Fat/oil + NaOH →[Δ] Soap + Glycerol.

A soap molecule has two parts:
- A **long hydrocarbon (non-polar) tail**, soluble in oil — the **hydrophobic** end.
- A **short ionic (polar) head** (–COO⁻Na⁺), soluble in water — the **hydrophilic** end.

**Cleansing action of soap:** In water, soap molecules arrange themselves in **micelles**, with their hydrophobic tails pointing towards oily dirt and their hydrophilic heads pointing outward, towards water. This traps the dirt inside the micelle, which can then be washed away with water.

::diagram:micelle

**Soaps in hard water:** Hard water contains calcium and magnesium salts, which react with soap to form an insoluble **scum** (precipitate), wasting soap and reducing its cleansing effect. Ca²⁺/Mg²⁺ + soap → insoluble scum.

**Detergents** are generally ammonium or sulphonate salts of long-chain carboxylic acids. Unlike soaps, detergents work well even in hard water because their calcium and magnesium salts are soluble in water, so no scum forms.
    `,
    experiments: [
      {
        id: "covalent-bond-methane",
        title: "Formation of a Covalent Bond in Methane",
        aim: "To understand how carbon achieves a stable octet by sharing electrons.",
        materials: ["Electronic configuration chart of carbon and hydrogen", "Ball-and-stick model / diagram"],
        procedure: [
          "Write the electronic configuration of carbon (2, 4) and hydrogen (1).",
          "Show carbon sharing one electron each with four hydrogen atoms.",
          "Draw the resulting structure showing four single covalent (C–H) bonds.",
        ],
        observation:
          "Carbon ends up with a share in 8 electrons (a stable octet) and each hydrogen atom ends up with a share in 2 electrons (a stable duplet).",
        reaction: "C + 4H → CH₄ (four single covalent C–H bonds)",
        conclusion:
          "Since carbon cannot easily gain or lose 4 electrons, it shares electrons with other atoms, forming covalent bonds — this is why methane, CH₄, is a stable, tetravalent, covalent compound.",
        visual: {
          figure: "methane-covalent",
          before: "hsl(40 30% 96%)",
          labels: { before: "Separate C and 4 H atoms", after: "CH₄ — four shared electron pairs" },
        },
      },
      {
        id: "saturated-vs-unsaturated",
        title: "Testing Saturation with Bromine Water / Alkaline KMnO₄",
        activityRef: "NCERT Activity 4.6",
        aim: "To distinguish saturated and unsaturated hydrocarbons using bromine water.",
        materials: ["Saturated hydrocarbon sample (e.g. in wax/paraffin)", "Unsaturated hydrocarbon sample (e.g. mustard oil)", "Bromine water", "Test tubes"],
        procedure: [
          "Take small amounts of a saturated fat and an unsaturated oil in separate test tubes.",
          "Add a few drops of bromine water to each and shake.",
          "Observe whether the orange colour of bromine water is decolourised.",
        ],
        observation:
          "The unsaturated oil decolourises the bromine water rapidly (addition across the double bond); the saturated fat does not decolourise it easily.",
        reaction: "CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br (addition reaction, decolourises bromine water)",
        conclusion:
          "Bromine water is a simple test to distinguish unsaturated compounds (which decolourise it by an addition reaction) from saturated ones (which do not react readily).",
        visual: {
          figure: "bromine-water-test",
          before: "hsl(25 85% 55%)",
          after: "hsl(40 10% 96%)",
          labels: { before: "Orange bromine water", after: "Decolourised by unsaturated oil" },
        },
      },
      {
        id: "ethanol-sodium",
        title: "Reaction of Ethanol with Sodium Metal",
        aim: "To show that ethanol reacts with sodium to liberate hydrogen gas.",
        materials: ["Absolute ethanol", "A small piece of sodium metal", "A dry test tube", "A burning splinter"],
        procedure: [
          "Take a small amount of absolute (dry) ethanol in a dry test tube.",
          "Carefully add a small piece of sodium metal to it.",
          "Bring a burning splinter near the mouth of the test tube.",
        ],
        observation:
          "Brisk effervescence (bubbling) is seen; the gas evolved burns with a 'pop' sound, confirming it is hydrogen.",
        reaction: "2Na + 2C₂H₅OH → 2C₂H₅ONa + H₂↑",
        conclusion:
          "Ethanol reacts with sodium metal to form sodium ethoxide and liberate hydrogen gas, confirming the presence of a reactive –OH group.",
        safety: "Sodium metal reacts vigorously; use only a small piece and handle with dry tongs, never with bare hands.",
        visual: {
          figure: "ethanol-sodium",
          before: "hsl(40 15% 96%)",
          after: "hsl(40 15% 96%)",
          gas: "Hydrogen",
          labels: { before: "Sodium added to ethanol", after: "Brisk bubbling; gas pops" },
        },
      },
      {
        id: "ethanoic-acid-carbonate",
        title: "Reaction of Ethanoic Acid with Sodium Carbonate",
        activityRef: "NCERT Activity 4.9",
        aim: "To study the reaction of ethanoic acid (a weak acid) with a carbonate.",
        materials: ["Ethanoic acid (dilute)", "Sodium carbonate / sodium hydrogencarbonate", "Test tube with delivery tube", "Lime water"],
        procedure: [
          "Take a small amount of sodium carbonate (or bicarbonate) in a test tube.",
          "Add dilute ethanoic acid to it and immediately connect a delivery tube to a test tube of lime water.",
          "Observe the effervescence and the effect on lime water.",
        ],
        observation:
          "Brisk effervescence of a colourless, odourless gas is seen, which turns lime water milky, confirming carbon dioxide.",
        reaction: "2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂↑",
        conclusion:
          "Like mineral acids, ethanoic acid reacts with carbonates to liberate carbon dioxide, showing it behaves as an acid despite being a weak, organic acid.",
        visual: {
          figure: "ethanoic-carbonate",
          before: "hsl(40 30% 96%)",
          after: "hsl(40 12% 90%)",
          gas: "Carbon dioxide",
          precipitate: { name: "Calcium carbonate", colour: "hsl(0 0% 97%)" },
          labels: { before: "Sodium carbonate + acid", after: "Lime water turns milky" },
        },
      },
      {
        id: "esterification-reaction",
        title: "Preparation of an Ester (Esterification)",
        activityRef: "NCERT Activity 4.10",
        aim: "To prepare a sweet-smelling ester from ethanoic acid and ethanol.",
        materials: ["Ethanoic acid", "Ethanol", "Concentrated sulphuric acid", "A test tube", "Water bath / beaker of warm water"],
        procedure: [
          "Take about 1 mL ethanol and 1 mL glacial ethanoic acid in a test tube.",
          "Add a few drops of concentrated sulphuric acid.",
          "Warm the test tube gently in a water bath for 5 minutes, then pour into a beaker of water and smell carefully.",
        ],
        observation: "A pleasant, fruity (sweet) smell is produced, distinct from the pungent smell of ethanoic acid.",
        reaction: "CH₃COOH + C₂H₅OH →[conc. H₂SO₄] CH₃COOC₂H₅ + H₂O",
        conclusion:
          "An acid reacts with an alcohol in the presence of a catalyst (conc. H₂SO₄) to form a sweet-smelling ester and water — this reaction is called esterification, and esters are used in making perfumes and as flavouring agents.",
        safety: "Concentrated sulphuric acid is highly corrosive; add it carefully and never smell the test tube directly — waft the smell gently towards you.",
        visual: {
          figure: "esterification",
          before: "hsl(40 15% 96%)",
          after: "hsl(40 15% 96%)",
          thermal: "exothermic",
          labels: { before: "Ethanoic acid + ethanol + catalyst", after: "Sweet, fruity-smelling ester forms" },
        },
      },
      {
        id: "soap-hard-soft-water",
        title: "Cleansing Action of Soap in Hard and Soft Water",
        activityRef: "NCERT Activity 4.13",
        aim: "To compare how soap behaves (lather formation) in soft water and hard water.",
        materials: ["Soap solution", "Soft water (rain/distilled water)", "Hard water (with dissolved Ca/Mg salts)", "Two test tubes"],
        procedure: [
          "Add a few drops of soap solution to a test tube of soft water and shake well.",
          "Repeat with a test tube of hard water.",
          "Compare the amount and stability of the lather (foam) formed in each.",
        ],
        observation:
          "Soft water forms plenty of stable lather easily. Hard water forms very little lather at first, and a white, insoluble scum appears; more soap is needed before lather forms.",
        reaction: "2C₁₇H₃₅COONa (soap) + CaCl₂ (in hard water) → (C₁₇H₃₅COO)₂Ca↓ (scum) + 2NaCl",
        conclusion:
          "Soap reacts with the calcium and magnesium ions in hard water to form an insoluble scum, wasting soap. This is why detergents (whose calcium/magnesium salts are soluble) are preferred for washing in hard water.",
        visual: {
          figure: "soap-hard-water",
          before: "hsl(200 40% 92%)",
          after: "hsl(200 15% 90%)",
          precipitate: { name: "Soap scum", colour: "hsl(0 0% 95%)" },
          labels: { before: "Soap shaken in soft water — good lather", after: "Soap shaken in hard water — scum, little lather" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Why does carbon form covalent compounds rather than ionic compounds?",
        options: [
          "It has too many electrons to lose",
          "Gaining or losing 4 electrons requires too much energy",
          "It is a non-metal only",
          "It does not obey the octet rule",
        ],
        correctAnswer: 1,
        explanation:
          "Carbon has 4 valence electrons; gaining or losing 4 electrons to form ions would require a very large amount of energy, so it shares electrons to form covalent bonds instead.",
      },
      {
        question: "The property of carbon atoms to link with each other to form long chains, branches or rings is called:",
        options: ["Isomerism", "Catenation", "Tetravalency", "Allotropy"],
        correctAnswer: 1,
        explanation: "Catenation is the self-linking property of carbon that allows it to form chains, branched chains and rings.",
      },
      {
        question: "The general formula of an alkane is:",
        options: ["CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₂", "CₙH₂ₙ₊₁"],
        correctAnswer: 2,
        explanation: "Alkanes are saturated hydrocarbons with the general formula CₙH₂ₙ₊₂, e.g. methane CH₄, ethane C₂H₆.",
      },
      {
        question: "Which functional group is present in ethanoic acid?",
        options: ["–OH", "–CHO", "–COOH", ">C=O"],
        correctAnswer: 2,
        explanation: "Ethanoic acid, CH₃COOH, contains the carboxylic acid functional group, –COOH.",
      },
      {
        question: "The reaction CH₄ + Cl₂ →[sunlight] CH₃Cl + HCl is an example of a:",
        options: ["Addition reaction", "Substitution reaction", "Oxidation reaction", "Esterification reaction"],
        correctAnswer: 1,
        explanation:
          "A hydrogen atom of methane is replaced (substituted) by a chlorine atom in the presence of sunlight — a substitution reaction, typical of saturated hydrocarbons.",
      },
      {
        question: "Hydrogenation of vegetable oils in the presence of a nickel catalyst is an example of:",
        options: ["A substitution reaction", "An addition reaction", "A combustion reaction", "An oxidation reaction"],
        correctAnswer: 1,
        explanation:
          "Unsaturated oils add hydrogen across their double bonds in the presence of a Ni catalyst to form saturated fats — an addition reaction.",
      },
      {
        question: "A dilute solution of acetic acid (5-8%) used as a food preservative is commonly known as:",
        options: ["Vinegar", "Alcohol", "Formalin", "Brine"],
        correctAnswer: 0,
        explanation: "A 5-8% solution of acetic acid (ethanoic acid) in water is called vinegar.",
      },
      {
        question: "Soap does not lather well in hard water because it forms:",
        options: ["A soluble complex", "An insoluble scum with Ca²⁺/Mg²⁺ ions", "Carbon dioxide gas", "A coloured precipitate with chloride ions"],
        correctAnswer: 1,
        explanation:
          "Soap reacts with the calcium and magnesium ions present in hard water to form an insoluble scum, reducing its cleansing action.",
      },
      {
        question: "Esters are typically formed by the reaction between:",
        options: ["An acid and a base", "An alcohol and a carboxylic acid", "Two alcohols", "A metal and an acid"],
        correctAnswer: 1,
        explanation:
          "An alcohol reacts with a carboxylic acid in the presence of an acid catalyst (esterification) to give a sweet-smelling ester and water.",
      },
      {
        question: "The 'tail' of a soap molecule that dissolves in oil/grease is:",
        options: ["Hydrophilic and ionic", "Hydrophobic and a long hydrocarbon chain", "Positively charged only", "Water-soluble"],
        correctAnswer: 1,
        explanation:
          "The long hydrocarbon tail of a soap molecule is hydrophobic (water-repelling) and dissolves in oily dirt, while the ionic head is hydrophilic.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "What is a homologous series?",
        answer:
          "A homologous series is a family of compounds with the same general formula and similar chemical properties, where each successive member differs from the one before by a –CH₂– unit.",
      },
      {
        marks: 1,
        question: "Why is glacial acetic acid so named?",
        answer:
          "Pure ethanoic (acetic) acid has a melting point of 290 K and freezes in cold climates to form ice-like flakes, so it is called glacial acetic acid.",
      },
      {
        marks: 2,
        question: "Differentiate between saturated and unsaturated hydrocarbons, with one example each.",
        answer:
          "**Saturated hydrocarbons** contain only single bonds between carbon atoms, e.g. ethane (C₂H₆). **Unsaturated hydrocarbons** contain at least one double or triple bond between carbon atoms, e.g. ethene (C₂H₄, one double bond) or ethyne (C₂H₂, one triple bond).",
      },
      {
        marks: 2,
        question: "What happens when ethanol reacts with (a) sodium metal, (b) hot concentrated sulphuric acid?",
        answer:
          "(a) Ethanol reacts with sodium to give sodium ethoxide and hydrogen gas: 2Na + 2C₂H₅OH → 2C₂H₅ONa + H₂↑.\n(b) With hot concentrated H₂SO₄, ethanol is dehydrated to ethene: C₂H₅OH →[conc. H₂SO₄, 443 K] CH₂=CH₂ + H₂O.",
      },
      {
        marks: 2,
        question: "Why is carbon tetravalent, and what does this allow it to do?",
        answer:
          "Carbon has 4 electrons in its outermost shell, so it needs to form 4 bonds to complete its octet — this is called tetravalency. This lets carbon bond with itself and with atoms of many other elements (H, O, N, S, halogens), forming a very large variety of stable compounds.",
      },
      {
        marks: 3,
        question: "Explain the cleansing action of soap.",
        answer:
          "A soap molecule has a hydrophobic (water-repelling) hydrocarbon tail that dissolves in oily dirt, and a hydrophilic (water-attracting) ionic head. In water, soap molecules arrange themselves into clusters called **micelles**, with tails pointing inward (trapping the oily dirt) and heads pointing outward into the water. This lets the trapped dirt be pulled away and washed off with water, which is why soap cleans effectively.",
      },
      {
        marks: 3,
        question: "Write the chemical equations for (a) combustion of methane, (b) oxidation of ethanol to ethanoic acid.",
        answer:
          "(a) CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) + heat and light.\n(b) CH₃CH₂OH + 2[O] →[alkaline KMnO₄] CH₃COOH + H₂O.",
      },
      {
        marks: 3,
        question: "What are functional groups? Name the functional groups present in (a) CH₃CH₂OH, (b) CH₃COCH₃, (c) CH₃COOH.",
        answer:
          "A functional group is a specific atom or group of atoms attached to a carbon chain that decides the characteristic chemical properties of the compound.\n(a) CH₃CH₂OH has the alcohol group, –OH.\n(b) CH₃COCH₃ has the ketone group, >C=O.\n(c) CH₃COOH has the carboxylic acid group, –COOH.",
      },
      {
        marks: 5,
        question:
          "(a) What is esterification? Write the equation for the formation of ethyl ethanoate. (b) What happens when an ester reacts with sodium hydroxide, and what is this reaction called?",
        answer:
          "(a) Esterification is the reaction between a carboxylic acid and an alcohol (in the presence of an acid catalyst like conc. H₂SO₄) to form a sweet-smelling ester and water: CH₃COOH + C₂H₅OH →[conc. H₂SO₄] CH₃COOC₂H₅ + H₂O.\n(b) An ester reacts with sodium hydroxide to give back the alcohol and the sodium salt of the carboxylic acid (essentially the reverse of esterification): CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH. This reaction is called **saponification** and is used industrially to make soap.",
      },
      {
        marks: 5,
        question:
          "(a) Distinguish between soaps and detergents on the basis of their behaviour in hard water. (b) Draw/describe the structure of a soap molecule and explain the two parts.",
        answer:
          "(a) Soaps are sodium/potassium salts of long-chain fatty acids; in hard water, they react with Ca²⁺ and Mg²⁺ ions to form an insoluble scum, wasting soap and reducing lather. Detergents are ammonium or sulphonate salts of long-chain acids; their calcium and magnesium salts remain soluble in water, so they lather well and clean effectively even in hard water.\n(b) A soap molecule has two parts: a long **hydrocarbon (non-polar) tail** that is hydrophobic and dissolves in oil/grease, and a short **ionic (polar) head** (e.g. –COO⁻Na⁺) that is hydrophilic and dissolves in water. This dual nature lets soap molecules form micelles that trap dirt and let it be washed away.",
      },
    ],
  },
];

export const getChapter = (id: string): Chapter | undefined =>
  chapters.find((c) => c.id === id);
